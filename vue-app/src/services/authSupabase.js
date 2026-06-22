// authSupabase.js — F5 (migrasi Supabase): jalur auth PARALEL ke auth.js (Firebase),
// DORMANT sampai cutover (F6). Tak diimpor view/store mana pun sekarang.
//
// Alur (keputusan final): login username/WA/NIS -> resolve_login RPC (canonical
// auth_key, tanpa PII) -> email `<auth_key>@ammu.local` -> signIn; bila akun belum
// ada -> signUp (lazy-create, sandi default '1234'). Peran dipetakan server-side
// oleh trigger handle_new_user (lihat migration 07). Client lalu baca profiles +
// guru/santri -> bangun sesiAktif (bentuk IDENTIK stores/auth.js).
//
// Tak ada hashing/token sendiri. Sandi user dipad 'mu_auth_'+sandi (min 6 char
// Supabase; mirror Firebase toAuthPassword) — user tetap ketik '1234'.
import { supabase } from './supabase'
import { getOne } from './db'

function _ensure() {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi (.env.local).')
}

export const AUTH_EMAIL_DOMAIN = '@ammu.local'

/** Padding sandi -> >= 6 char (mirror Firebase). User tak tahu prefix. */
export function toAuthPassword(pass) {
  return 'mu_auth_' + String(pass || '')
}

function sanitizeAuthLocalPart(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '')
}

/** Bangun email Auth internal dari auth_key kanonik (hasil resolve_login). */
export function buildAuthEmail(authKey) {
  const clean = sanitizeAuthLocalPart(authKey)
  return clean ? clean + AUTH_EMAIL_DOMAIN : null
}

/** Resolusi login pra-auth via RPC. Return { source, auth_key, active } | null. */
export async function resolveLogin(input) {
  _ensure()
  const { data, error } = await supabase.rpc('resolve_login', {
    p_input: String(input || '').trim()
  })
  if (error) throw error
  return data || null
}

function _isInvalidCred(error) {
  const c = error?.code || ''
  const m = String(error?.message || '').toLowerCase()
  return c === 'invalid_credentials' || m.includes('invalid login credentials')
}

/**
 * loginUnified — resolve -> signIn -> (lazy) signUp. Return { source, user, session }.
 * Lempar error kode 'auth/not-found' | 'auth/inactive' | 'auth/wrong-password'.
 */
export async function loginUnified(input, password) {
  _ensure()
  const info = await resolveLogin(input)
  if (!info) {
    const e = new Error('Username tidak ditemukan.')
    e.code = 'auth/not-found'
    throw e
  }
  if (info.active === false) {
    const e = new Error('Akun tidak aktif. Hubungi administrator.')
    e.code = 'auth/inactive'
    throw e
  }
  const email = buildAuthEmail(info.auth_key)
  const pass = toAuthPassword(password)

  let { data, error } = await supabase.auth.signInWithPassword({ email, password: pass })
  if (error) {
    if (!_isInvalidCred(error)) throw error
    // Akun belum ada -> lazy-create.
    const up = await supabase.auth.signUp({ email, password: pass })
    if (up.error) {
      // Akun SUDAH ada tapi kredensial salah tadi -> sandi salah (bukan akun baru).
      if (/already|registered|exists/i.test(up.error.message || '')) {
        const e = new Error('Kata sandi salah')
        e.code = 'auth/wrong-password'
        throw e
      }
      throw up.error
    }
    // Bila "Confirm email" OFF -> signUp langsung punya session; jika tidak, signIn lagi.
    if (up.data?.session) {
      data = up.data
    } else {
      const re = await supabase.auth.signInWithPassword({ email, password: pass })
      if (re.error) throw re.error
      data = re.data
    }
  }
  return { source: info.source, user: data.user, session: data.session }
}

const _ADMIN_AKSES = {
  kelola_guru: true,
  akses_keuangan: true,
  kelola_santri: true,
  kelola_lembaga: true,
  kelola_kelas: true
}

/**
 * buildSesi — sesudah auth, baca profiles + guru/santri -> sesiAktif (bentuk
 * IDENTIK stores/auth.js). Return null bila tak terdaftar.
 */
export async function buildSesi() {
  _ensure()
  const { data: ures } = await supabase.auth.getUser()
  const user = ures?.user
  if (!user) return null
  const uid = user.id
  const email = user.email || ''

  // profiles dibaca LANGSUNG (bukan db.getOne) supaya `akses` tetap objek bersarang.
  const { data: prof, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', uid)
    .maybeSingle()
  if (error) throw error
  if (!prof) return null

  // Admin built-in (super_admin tanpa guru_id/santri_id, login_key admin).
  if (!prof.guru_id && !prof.santri_id && prof.role_sistem === 'super_admin') {
    return {
      id: 'admin',
      role: 'admin',
      role_sistem: 'super_admin',
      nama: 'Administrator',
      guru: 'Admin Utama',
      jk: 'L',
      jabatan: 'Administrator',
      lembaga: 'Semua Data',
      akses: { ..._ADMIN_AKSES },
      auth_method: 'supabase',
      supabase_uid: uid,
      supabase_email: email
    }
  }

  if (prof.guru_id) {
    const g = await getOne('guru', prof.guru_id)
    if (!g) return null
    if (g.status === 'Tidak Aktif') {
      await signOut()
      const e = new Error('Akun guru tidak aktif')
      e.code = 'auth/inactive'
      throw e
    }
    const rs = prof.role_sistem || 'guru'
    const isPengurus = ['admin', 'admin_keuangan', 'super_admin'].includes(rs)
    return {
      id: g.id,
      role: isPengurus ? 'admin' : 'guru',
      role_sistem: rs,
      nama: g.nama,
      guru: g.nama,
      lembaga: isPengurus ? 'Semua Data' : g.lembaga || '',
      jk: g.jk || '',
      jabatan: g.jabatan || '',
      jabatan_tambahan: g.jabatan_tambahan || '',
      username: g.username || '',
      wa: g.wa || '',
      foto: g.foto || '',
      akses: g.akses || {},
      auth_method: 'supabase',
      supabase_uid: uid,
      supabase_email: email
    }
  }

  if (prof.santri_id) {
    const s = await getOne('santri', prof.santri_id)
    if (!s) return null
    if (s.aktif === false) {
      await signOut()
      const e = new Error('Akun santri tidak aktif')
      e.code = 'auth/inactive'
      throw e
    }
    return {
      id: s.id,
      role: 'santri',
      role_sistem: 'santri',
      nama: s.nama,
      nis: s.nis || '',
      username: s.username || '',
      wa: s.wa || '',
      foto: s.foto || '',
      lembaga: s.lembaga || '',
      kelas: s.kelas || '',
      wali: s.wali || '',
      is_mukim: s.is_mukim === true,
      auth_method: 'supabase',
      supabase_uid: uid,
      supabase_email: email
    }
  }

  return null
}

/** Logout Supabase. */
export async function signOut() {
  _ensure()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/** Subscribe perubahan auth state. Return unsubscribe function. */
export function onAuthChange(callback) {
  _ensure()
  const { data } = supabase.auth.onAuthStateChange((_event, session) =>
    callback(session?.user || null)
  )
  return () => {
    try {
      data.subscription.unsubscribe()
    } catch {
      /* noop */
    }
  }
}

/** Sesi saat ini (async). */
export async function currentSession() {
  _ensure()
  const { data } = await supabase.auth.getSession()
  return data?.session || null
}

/**
 * resetUserPassword — admin (WAJIB super_admin) reset sandi guru/santri ke '1234'.
 * Pengganti Cloud Function resetUserPassword: panggil Edge Function reset-user-password
 * (service-role; guard super_admin via RPC admin_target_auth_uid). Lempar error bila gagal.
 */
export async function resetUserPassword(collection, docId) {
  _ensure()
  const { data, error } = await supabase.functions.invoke('reset-user-password', {
    body: { collection, docId: String(docId) }
  })
  if (error) {
    // FunctionsHttpError (non-2xx): coba ambil pesan dari body respons.
    let msg = error.message || 'reset-gagal'
    try {
      const j = await error.context?.json?.()
      if (j?.error) msg = j.error
    } catch {
      /* noop */
    }
    throw new Error(msg)
  }
  if (!data?.ok) throw new Error(data?.error || 'reset-gagal')
  return data
}

// --- Google OAuth: DITUNDA ke Supabase OAuth (jalur lanjutan). Stub jelas supaya
//     UI tak lagi memanggil Firebase Auth (auth.js dihapus di F8). loginWithGoogle/
//     linkGoogleAccount/unlinkGoogleAccount semua lempar pesan ramah; caller sudah
//     bungkus toast. Implementasi via supabase.auth.signInWithOAuth menyusul. ---
function _googleDisabled() {
  const e = new Error('Login Google sementara nonaktif (sedang dimigrasikan ke Supabase).')
  e.code = 'auth/google-disabled'
  return e
}
export async function loginWithGoogle() {
  throw _googleDisabled()
}
export async function linkGoogleAccount() {
  throw _googleDisabled()
}
export async function unlinkGoogleAccount() {
  throw _googleDisabled()
}
