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

const normNama = (s: unknown) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
const digits = (s: unknown) => String(s || '').replace(/\D/g, '')
const tokenOf = (r: { data?: Record<string, unknown> }) =>
  (r.data && (r.data.fcm_token as string)) || ''

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
      const t = tokenOf(r)
      if (t) tokens.add(t)
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
        const tk = tokenOf(sdoc)
        if (tk) tokens.add(tk)
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
              const tt = tokenOf(x)
              if (tt) tokens.add(tt)
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
    } else if (t?.type === 'guru' && t.nama) {
      add((await withTok('guru').eq('nama', t.nama)).data)
    }
  } catch (e) {
    console.warn('resolveTokens:', (e as Error)?.message || e)
  }
  return [...tokens]
}

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre

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

    // Bersihkan token invalid dari santri/guru (data->>fcm_token).
    for (const bad of invalid) {
      for (const tbl of ['santri', 'guru']) {
        const { data: hit } = await db.from(tbl).select('id, data').eq('data->>fcm_token', bad).limit(5)
        for (const h of hit || []) {
          const nd = { ...(h.data || {}) }
          delete nd.fcm_token
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
