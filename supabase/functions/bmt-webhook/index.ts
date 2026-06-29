// bmt-webhook — terima laporan pembayaran Virtual Account dari server BMT PETA
// dan terapkan ke keuangan via RPC apply_bmt_payment (alokasi keranjang + waterfall).
//
// Fungsi PUBLIC (--no-verify-jwt): pemanggilnya SERVER BMT (bukan sesi user).
// Auth = secret di query `?k=` ATAU header `x-bmt-secret`. Tulis pakai service-role.
//
// ⚠️ FORMAT PAYLOAD BMT BELUM FINAL (spec menyusul). Semua parsing diisolasi di
// parseBmtPayload() — saat spec turun, sesuaikan HANYA fungsi itu. Sampai live,
// uji E2E lewat mode simulasi:
//   GET  ?mode=simulate&k=<secret>&va=<nomorVA>&nominal=300000[&ref=SIM-1]
//
// Alur: parse {va, nominal, ref} -> petakan VA->santri (va_bmt eksplisit / prefix+NIS)
// -> rpc apply_bmt_payment(santri_id, nominal, ref, payload). Idempoten via ref
// (keuangan_va_inbox PK) -> aman dari laporan dobel/retry.
//
// DEPLOY: supabase functions deploy bmt-webhook --no-verify-jwt
// SECRET: supabase secrets set BMT_WEBHOOK_SECRET="<minimal 12 char>"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handlePreflight, json } from '../_shared/cors.ts'

const SECRET = Deno.env.get('BMT_WEBHOOK_SECRET') || ''

// Authorized bila secret cocok di query `?k=` ATAU header `x-bmt-secret`.
function authorized(req: Request): boolean {
  if (!SECRET) return false
  try {
    if (new URL(req.url).searchParams.get('k') === SECRET) return true
  } catch {
    /* ignore */
  }
  return (req.headers.get('x-bmt-secret') || '') === SECRET
}

// Baca body POST jadi objek (JSON / form-urlencoded / teks-JSON).
// deno-lint-ignore no-explicit-any
async function readBody(req: Request): Promise<any> {
  const ct = (req.headers.get('content-type') || '').toLowerCase()
  try {
    if (ct.includes('application/json')) return await req.json()
    if (ct.includes('application/x-www-form-urlencoded') || ct.includes('multipart/form-data')) {
      const form = await req.formData()
      const o: Record<string, string> = {}
      for (const [k, v] of form.entries()) o[k] = typeof v === 'string' ? v : ''
      return o
    }
    const t = await req.text()
    return t && t.trim().startsWith('{') ? JSON.parse(t) : {}
  } catch {
    return {}
  }
}

// ── ISOLASI FORMAT BMT ──────────────────────────────────────────────────────
// Petakan payload BMT -> { va, nominal, ref }. Toleran beberapa nama field umum;
// SESUAIKAN di sini saat spec/sandbox BMT PETA tersedia.
// deno-lint-ignore no-explicit-any
function parseBmtPayload(b: any): { va: string; nominal: number; ref: string } | null {
  if (!b || typeof b !== 'object') return null
  const va = String(b.va ?? b.virtual_account ?? b.vaNumber ?? b.va_number ?? b.account ?? '').trim()
  const nominal = Number(b.nominal ?? b.amount ?? b.jumlah ?? b.paid_amount ?? b.value ?? 0)
  const ref = String(
    b.ref ?? b.reference_id ?? b.trx_id ?? b.transaction_id ?? b.id ?? ''
  ).trim()
  if (!va || !(nominal > 0) || !ref) return null
  return { va, nominal, ref }
}

// Settings (gabung 'web' < 'general') -> ambil bmt_va_prefix.
// deno-lint-ignore no-explicit-any
async function fetchSettings(db: any): Promise<Record<string, unknown>> {
  const [g, w] = await Promise.all([
    db.from('settings').select('value').eq('key', 'general').maybeSingle(),
    db.from('settings').select('value').eq('key', 'web').maybeSingle()
  ])
  return { ...(w.data?.value || {}), ...(g.data?.value || {}) }
}

// Reverse-lookup VA -> santri (cermin utils/bmtVa.js findSantriByVa, server-side).
// deno-lint-ignore no-explicit-any
function resolveSantri(va: string, rows: any[], prefix: string): any | null {
  const clean = String(va || '').replace(/\s+/g, '')
  if (!clean || !Array.isArray(rows)) return null
  // 1) VA eksplisit tersimpan di santri (data.va_bmt)
  const explicit = rows.find((s) => {
    const v = s?.data?.va_bmt
    return v && String(v).replace(/\s+/g, '') === clean
  })
  if (explicit) return explicit
  // 2) prefix + NIS/ID
  const p = String(prefix || '').replace(/\s+/g, '')
  if (!p || !clean.startsWith(p)) return null
  const key = clean.slice(p.length)
  if (!key) return null
  return (
    rows.find(
      (s) => String(s.nis || s?.data?.nis_lokal || s.id).replace(/\s+/g, '') === key
    ) || null
  )
}

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre

  const url = new URL(req.url)
  const mode = url.searchParams.get('mode') || ''

  // Health/handshake (GET tanpa mode) — uji koneksi.
  if (req.method === 'GET' && mode !== 'simulate') {
    return json({ ok: true, service: 'bmt-webhook', live: !!SECRET })
  }
  if (req.method !== 'GET' && req.method !== 'POST') {
    return json({ ok: false, error: 'method' }, 405)
  }
  if (!authorized(req)) return json({ ok: false, error: 'unauthorized' }, 401)

  // Ambil input: simulasi (query) atau laporan BMT asli (body).
  let parsed: { va: string; nominal: number; ref: string } | null
  // deno-lint-ignore no-explicit-any
  let raw: any = { mode }
  if (mode === 'simulate') {
    parsed = parseBmtPayload({
      va: url.searchParams.get('va'),
      nominal: Number(url.searchParams.get('nominal') || 0),
      ref: url.searchParams.get('ref') || `SIM-${url.searchParams.get('va') || ''}-${url.searchParams.get('nominal') || ''}`
    })
    raw = { mode: 'simulate' }
  } else {
    raw = await readBody(req)
    parsed = parseBmtPayload(raw)
  }
  if (!parsed) {
    return json({ ok: false, error: 'payload tak valid (butuh va + nominal>0 + ref)' }, 400)
  }

  try {
    const db = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )
    const settings = await fetchSettings(db)
    const prefix = String(settings.bmt_va_prefix || '')
    const { data: santriRows } = await db.from('santri').select('id, nis, data')
    const santri = resolveSantri(parsed.va, santriRows || [], prefix)
    if (!santri) {
      console.log(`[bmt] VA ${parsed.va} tak terpetakan ke santri`)
      return json({ ok: false, error: 'va_unmatched', va: parsed.va }, 404)
    }

    const { data: result, error } = await db.rpc('apply_bmt_payment', {
      p_santri_id: String(santri.id),
      p_nominal: Math.round(parsed.nominal),
      p_ref: parsed.ref,
      p_payload: raw
    })
    if (error) throw error
    console.log(`[bmt] ${parsed.ref} santri=${santri.id} nominal=${parsed.nominal} ->`, result)
    return json({ ok: true, santri_id: String(santri.id), result })
  } catch (e) {
    console.error('[bmt] error:', (e as Error)?.message || e)
    return json({ ok: false, error: (e as Error)?.message || 'server' }, 500)
  }
})
