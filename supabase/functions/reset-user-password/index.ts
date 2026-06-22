// reset-user-password — pengganti Cloud Function `resetUserPassword`.
// Admin (WAJIB super_admin) reset sandi guru/santri ke '1234' (= 'mu_auth_1234'
// setelah padding client). Single-tenant, tanpa hashing sendiri.
//
// Alur:
//   1. JWT pemanggil -> RPC admin_target_auth_uid(collection, docId) yang
//      (a) GUARD auth_is_super() pakai auth.uid() pemanggil (raise bila bukan),
//      (b) hitung auth_key kanonik dari record -> cari auth.users.id.
//   2. Bila uid ketemu -> admin.updateUserById(uid, { password }) via service-role.
//      Bila belum ada akun (lazy-create) -> no-op (akun lahir sandi '1234' saat login).
//
// DEPLOY: supabase functions deploy reset-user-password
// (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY di-inject otomatis oleh platform.)
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handlePreflight, json } from '../_shared/cors.ts'

const RESET_PASSWORD = 'mu_auth_1234' // = toAuthPassword('1234') di client

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre

  try {
    const authHeader = req.headers.get('Authorization') || ''
    if (!/^Bearer\s+.+/i.test(authHeader)) return json({ ok: false, error: 'no-token' }, 401)

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    // Client ber-konteks JWT pemanggil -> auth.uid() = pemanggil (utk guard RPC).
    const asCaller = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } }
    })
    // Client service-role -> admin API (update password user lain).
    const admin = createClient(SUPABASE_URL, SERVICE_KEY)

    const body = await req.json().catch(() => ({}))
    const collection = String(body.collection || '')
    const docId = String(body.docId || '')
    if (!['guru', 'santri'].includes(collection) || !docId) {
      return json({ ok: false, error: 'bad-input' }, 400)
    }

    // RPC GUARD super_admin + resolve uid target (raise 'forbidden' bila bukan super).
    const { data: targetUid, error: rpcErr } = await asCaller.rpc('admin_target_auth_uid', {
      p_collection: collection,
      p_doc_id: docId
    })
    if (rpcErr) {
      const msg = String(rpcErr.message || '')
      if (/forbidden/i.test(msg)) return json({ ok: false, error: 'forbidden' }, 403)
      if (/not-found/i.test(msg)) return json({ ok: false, error: 'not-found' }, 404)
      return json({ ok: false, error: msg }, 400)
    }

    let didReset = false
    if (targetUid) {
      const { error: updErr } = await admin.auth.admin.updateUserById(String(targetUid), {
        password: RESET_PASSWORD
      })
      if (updErr) {
        // Akun belum ada / gagal -> lazy-create default '1234' saat login pertama.
        console.warn('[reset-user-password] updateUserById:', updErr.message)
      } else {
        didReset = true
      }
    }

    return json({ ok: true, didReset })
  } catch (e) {
    console.error('[reset-user-password]', e)
    return json({ ok: false, error: String((e as Error)?.message || e) }, 500)
  }
})
