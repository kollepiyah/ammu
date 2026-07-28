// dispatch-push — pengganti Cloud Function `kirimNotifikasiMassal`.
// Baca antrian notif_queue (status 'pending'), resolve token FCM dari `target`,
// kirim via FCM HTTP v1, tandai 'sent', bersihkan token invalid. FCM tetap di
// Firebase (transport push) — fungsi ini "pipa" Supabase->FCM.
//
// Dipicu pg_cron tiap menit (lihat migration push_and_cron) via net.http_post.
// notif_queue server-only (RLS tanpa SELECT) -> WAJIB service-role.
//
// Secret: FCM_SERVICE_ACCOUNT = isi JSON service-account Firebase (1 baris).
// DEPLOY: supabase functions deploy dispatch-push --no-verify-jwt
//   supabase secrets set FCM_SERVICE_ACCOUNT="$(cat service-account.json)"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handlePreflight, json } from '../_shared/cors.ts'

type Row = { id: string; judul: string | null; pesan: string | null; data: Record<string, unknown> }

// G1 (audit 29 Jul): --no-verify-jwt (dipanggil pg_cron/menit) → PUBLIK. Secret
// OPSIONAL: bila CRON_SECRET di-set, WAJIB cocok; bila belum → izinkan (jangan
// patahkan cron lama). Aktifkan dgn set secret + header di job pg_cron.
const CRON_SECRET = Deno.env.get('CRON_SECRET') || ''
function cronAuthorized(req: Request): boolean {
  if (!CRON_SECRET) return true
  try {
    if (new URL(req.url).searchParams.get('k') === CRON_SECRET) return true
  } catch { /* ignore */ }
  const h = req.headers.get('authorization') || ''
  if (h === `Bearer ${CRON_SECRET}` || h === CRON_SECRET) return true
  return (req.headers.get('x-cron-secret') || '') === CRON_SECRET
}

const normNama = (s: unknown) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
const digits = (s: unknown) => String(s || '').replace(/\D/g, '')
// v.1.2.0: satu akun boleh punya BANYAK perangkat (HP + PWA + tablet).
//   `fcm_tokens` = daftar semua token hidup; `fcm_token` = yang terbaru (invarian
//   dijaga RPC save_push_token & pembersihan token invalid di bawah, supaya filter
//   `data->>fcm_token is not null` tetap menjaring setiap baris yang punya token).
const tokensOf = (r: { data?: Record<string, unknown> }): string[] => {
  const d = (r.data || {}) as Record<string, unknown>
  const out: string[] = []
  const arr = Array.isArray(d.fcm_tokens) ? (d.fcm_tokens as unknown[]) : []
  for (const t of arr) {
    const s = String(t || '').trim()
    if (s) out.push(s)
  }
  const single = String(d.fcm_token || '').trim()
  if (single && !out.includes(single)) out.push(single)
  return out
}

// ---- FCM HTTP v1: OAuth access token dari service-account (RS256 JWT) ----------
function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '')
  const bin = atob(b64)
  const buf = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i)
  return buf.buffer
}
function b64url(data: Uint8Array | string): string {
  const bin = typeof data === 'string' ? data : String.fromCharCode(...data)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
async function getAccessToken(sa: { client_email: string; private_key: string }): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/firebase.messaging',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600
    })
  )
  const unsigned = `${header}.${claim}`
  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(sa.private_key),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = new Uint8Array(
    await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(unsigned))
  )
  const jwt = `${unsigned}.${b64url(sig)}`
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`
  })
  const j = await r.json()
  if (!j.access_token) throw new Error('FCM OAuth gagal: ' + JSON.stringify(j))
  return j.access_token
}

// deno-lint-ignore no-explicit-any
async function resolveTokens(db: any, target: any): Promise<string[]> {
  const tokens = new Set<string>()
  const add = (rows: Array<{ data?: Record<string, unknown> }> | null) =>
    (rows || []).forEach((r) => {
      for (const t of tokensOf(r)) tokens.add(t)
    })
  const withTok = (tbl: string) => db.from(tbl).select('id, data').not('data->>fcm_token', 'is', null)

  try {
    const t = target || 'semua'
    if (t === 'semua' || t === 'all' || t?.type === 'all') {
      add((await withTok('santri')).data)
      add((await withTok('guru')).data)
    } else if (t === 'admin' || t?.type === 'admin') {
      add(
        (await withTok('guru').in('role_sistem', ['admin', 'admin_keuangan', 'super_admin'])).data
      )
    } else if (t === 'santri_semua' || t?.type === 'santri_all') {
      add((await withTok('santri')).data)
    } else if (t?.type === 'santri' && t.id) {
      const { data: sdoc } = await db.from('santri').select('id, wa, data').eq('id', String(t.id)).maybeSingle()
      if (sdoc) {
        for (const tk of tokensOf(sdoc)) tokens.add(tk)
        const ayah = (sdoc.data?.ayah || {}) as Record<string, unknown>
        const nikAyah = digits(sdoc.data?.nik_ayah ?? ayah.nik)
        const namaAyah = normNama(sdoc.data?.nama_ayah ?? ayah.nama)
        if (sdoc.wa && String(sdoc.wa).trim().length >= 8 && (nikAyah || namaAyah)) {
          const { data: sib } = await withTok('santri').eq('wa', sdoc.wa)
          ;(sib || []).forEach((x: { data?: Record<string, unknown> }) => {
            const xa = (x.data?.ayah || {}) as Record<string, unknown>
            const xnik = digits(x.data?.nik_ayah ?? xa.nik)
            const xnama = normNama(x.data?.nama_ayah ?? xa.nama)
            if ((nikAyah && xnik === nikAyah) || (namaAyah && xnama === namaAyah)) {
              for (const tt of tokensOf(x)) tokens.add(tt)
            }
          })
        }
      }
    } else if (t?.type === 'wa' && t.wa && String(t.wa).trim().length >= 8) {
      add((await withTok('santri').eq('wa', t.wa)).data)
    } else if (t?.type === 'lembaga' && t.lembaga) {
      add((await withTok('santri').eq('lembaga', t.lembaga)).data)
      add((await withTok('santri').eq('lembaga_sekolah', t.lembaga)).data)
      add((await withTok('guru').eq('lembaga', t.lembaga)).data)
    } else if (t?.type === 'guru' && (t.nama || t.id)) {
      // v.1.1.9: dulu HANYA `nama` yang dikenal. Pemanggil yang mengirim
      //   { type:'guru', id } (mis. penugasan glondongan) tidak cocok cabang mana pun
      //   -> tokens kosong -> baris ditandai 'failed: No tokens' TANPA ada yang tahu.
      //   Sekarang dua-duanya diterima; klien mengirim keduanya sekaligus.
      if (t.nama) add((await withTok('guru').eq('nama', t.nama)).data)
      if (t.id) add((await withTok('guru').eq('id', String(t.id))).data)
    }
  } catch (e) {
    console.warn('resolveTokens:', (e as Error)?.message || e)
  }
  return [...tokens]
}

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre
  if (!cronAuthorized(req)) return json({ ok: false, error: 'unauthorized' }, 401)

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const db = createClient(SUPABASE_URL, SERVICE_KEY)

  let sa: { client_email: string; private_key: string; project_id: string }
  try {
    sa = JSON.parse(Deno.env.get('FCM_SERVICE_ACCOUNT') || '{}')
    if (!sa.private_key || !sa.project_id) throw new Error('service-account tak lengkap')
  } catch (e) {
    return json({ ok: false, error: 'FCM_SERVICE_ACCOUNT invalid: ' + String((e as Error)?.message || e) }, 500)
  }

  // Ambil antrian pending (batch). status di data jsonb.
  const { data: rows, error } = await db
    .from('notif_queue')
    .select('id, judul, pesan, data')
    .eq('data->>status', 'pending')
    .limit(50)
  if (error) return json({ ok: false, error: error.message }, 500)
  if (!rows || rows.length === 0) return json({ ok: true, processed: 0 })

  let accessToken: string
  try {
    accessToken = await getAccessToken(sa)
  } catch (e) {
    return json({ ok: false, error: String((e as Error)?.message || e) }, 500)
  }
  const sendUrl = `https://fcm.googleapis.com/v1/projects/${sa.project_id}/messages:send`

  let processed = 0
  for (const row of rows as Row[]) {
    const d = row.data || {}
    let tokens = Array.isArray(d.tokens) ? (d.tokens as string[]).filter(Boolean) : []
    if (tokens.length === 0) tokens = await resolveTokens(db, d.target)
    if (tokens.length === 0) {
      await db.from('notif_queue').update({ data: { ...d, status: 'failed', error: 'No tokens' } }).eq('id', row.id)
      continue
    }

    const link = String(d.link || '/')
    const hashLink = '/#' + (link.startsWith('#') ? link.slice(1) : link)
    const base = {
      notification: { title: row.judul || 'Mambaul Ulum', body: row.pesan || '' },
      data: {
        target: typeof d.target === 'string' ? d.target : JSON.stringify(d.target || 'semua'),
        sender: String(d.sender || 'Admin'),
        timestamp: String(d.timestamp || new Date().toISOString()),
        link
      },
      webpush: {
        notification: { icon: '/icon-192.png', badge: '/icon-192.png' },
        fcm_options: { link: hashLink }
      }
    }

    let sukses = 0
    let gagal = 0
    const invalid: string[] = []
    // FCM v1 = 1 token/request. Konkuren ringan (chunk 20).
    for (let i = 0; i < tokens.length; i += 20) {
      const chunk = tokens.slice(i, i + 20)
      const results = await Promise.all(
        chunk.map(async (tok) => {
          try {
            const r = await fetch(sendUrl, {
              method: 'POST',
              headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: { token: tok, ...base } })
            })
            if (r.ok) return { ok: true, tok }
            const err = await r.json().catch(() => ({}))
            const status = err?.error?.details?.[0]?.errorCode || err?.error?.status || ''
            const bad = /UNREGISTERED|INVALID_ARGUMENT|NOT_FOUND/i.test(String(status))
            return { ok: false, tok, invalid: bad }
          } catch {
            return { ok: false, tok, invalid: false }
          }
        })
      )
      results.forEach((x) => {
        if (x.ok) sukses++
        else {
          gagal++
          if (x.invalid) invalid.push(x.tok)
        }
      })
    }

    // Bersihkan token invalid dari santri/guru.
    //   v.1.2.0 multi-perangkat: buang dari `fcm_tokens` DAN dari `fcm_token`.
    //   Invarian yang WAJIB dijaga: `fcm_token` = token hidup terbaru. Kalau hanya
    //   `fcm_token` yang dihapus sementara daftar masih berisi, baris itu lolos dari
    //   filter `data->>fcm_token is not null` di resolveTokens dan perangkat yang
    //   masih sah ikut berhenti menerima push.
    for (const bad of invalid) {
      for (const tbl of ['santri', 'guru']) {
        const { data: hit } = await db
          .from(tbl)
          .select('id, data')
          .or(`data->>fcm_token.eq.${bad},data->fcm_tokens.cs.["${bad}"]`)
          .limit(20)
        for (const h of hit || []) {
          const nd = { ...(h.data || {}) } as Record<string, unknown>
          const sisa = (Array.isArray(nd.fcm_tokens) ? (nd.fcm_tokens as unknown[]) : [])
            .map((x) => String(x || '').trim())
            .filter((x) => x && x !== bad)
          nd.fcm_tokens = sisa
          if (String(nd.fcm_token || '').trim() === bad) {
            // token terbaru yang mati -> promosikan sisa paling belakang (terbaru).
            if (sisa.length) nd.fcm_token = sisa[sisa.length - 1]
            else delete nd.fcm_token
          }
          await db.from(tbl).update({ data: nd }).eq('id', h.id)
        }
      }
    }

    await db
      .from('notif_queue')
      .update({
        data: {
          ...d,
          status: 'sent',
          sent_at: new Date().toISOString(),
          sukses_count: sukses,
          gagal_count: gagal,
          invalid_tokens_removed: invalid.length
        }
      })
      .eq('id', row.id)
    processed++
  }

  return json({ ok: true, processed })
})
