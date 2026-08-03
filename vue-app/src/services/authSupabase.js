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
import { getOne, mergeOne } from './db'

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

/** Resolusi login pra-auth via RPC. `source` opsional: 'guru' | 'santri' | null
 *  (memisahkan jalur login guru/pegawai vs santri/wali saat 1 WA dipakai keduanya).
 *  Return { source, auth_key, active } | null. */
export async function resolveLogin(input, source = null) {
  _ensure()
  const { data, error } = await supabase.rpc('resolve_login', {
    p_input: String(input || '').trim(),
    p_source: source || null
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
export async function loginUnified(input, password, source = null) {
  _ensure()
  const info = await resolveLogin(input, source)
  if (!info) {
    const e = new Error(
      source === 'santri'
        ? 'Santri/wali tidak ditemukan. Coba No. Induk atau WA wali.'
        : source === 'guru'
          ? 'Guru/pegawai tidak ditemukan. Coba username atau WA.'
          : 'Username tidak ditemukan.'
    )
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
    const linkedEmail = await _syncGoogleEmail('guru', g.id, g.linked_email)
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
      // v.111: gedung yang dikelola admin keuangan (scope Buku Kas + akademik)
      gedung: g.gedung || '',
      username: g.username || '',
      wa: g.wa || '',
      foto: g.foto || '',
      linked_email: linkedEmail || g.linked_email || '',
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
    const linkedEmailS = await _syncGoogleEmail('santri', s.id, s.linked_email)
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
      linked_email: linkedEmailS || s.linked_email || '',
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

/**
 * provisionAkun — buat akun login untuk guru/santri yang BELUM punya (K1-b).
 * Permintaan Kyai: akun lahir bersama datanya, supaya tak perlu dibuat satu per
 * satu dan pendaftaran mandiri boleh dimatikan tanpa ada yang terkunci.
 *
 * HANYA MEMBUAT yang belum ada — sandi akun yang sudah ada tak pernah disentuh
 * (dijaga di sisi server: RPC mengecualikan yang sudah punya baris auth.users,
 * dan Edge Function memakai createUser, bukan update).
 *
 * @param {{collection?:'guru'|'santri', docId?:string|number}} target kosong = sweep semua
 * @returns {Promise<{dibuat:number, dilewati:number, gagal:Array, kandidat:number, sisa:number}>}
 */
export async function provisionAkun(target = {}) {
  _ensure()
  const body = target?.docId
    ? { mode: 'one', collection: target.collection, docId: String(target.docId) }
    : { mode: 'sweep' }
  const { data, error } = await supabase.functions.invoke('provision-akun', { body })
  if (error) {
    let msg = error.message || 'provision-gagal'
    try {
      const j = await error.context?.json?.()
      if (j?.error) msg = j.error
    } catch {
      /* noop */
    }
    throw new Error(msg)
  }
  if (!data?.ok) throw new Error(data?.error || 'provision-gagal')
  return data
}

/**
 * provisionAkunSemua — sweep berulang sampai habis (Edge Function membatasi 100
 * akun per panggilan). Dipakai tombol "Buat akun yang belum ada" + sesudah impor.
 * @param {(p:{dibuat:number,sisa:number})=>void} [onProgress]
 */
export async function provisionAkunSemua(onProgress) {
  let dibuat = 0
  let dilewati = 0
  let kandidat = 0
  // Di-dedup per id: yang gagal tetap jadi kandidat di putaran berikutnya, jadi
  // orang yang sama muncul sekali per putaran. Tanpa ini laporannya menyesatkan —
  // 3 Agu 2026 tampil "18 gagal" padahal 3 orang x 6 putaran.
  const gagalMap = new Map()
  // Batas putaran = jaring pengaman; 20 x 100 = 2.000 akun, jauh di atas kebutuhan.
  for (let i = 0; i < 20; i++) {
    const r = await provisionAkun()
    dibuat += r.dibuat || 0
    dilewati += r.dilewati || 0
    kandidat = Math.max(kandidat, r.kandidat || 0)
    for (const g of r.gagal || []) gagalMap.set(String(g?.id ?? g?.nama ?? Math.random()), g)
    if (onProgress) onProgress({ dibuat, sisa: r.sisa || 0 })
    // Berhenti bila tak ada sisa ATAU putaran ini tak membuat apa pun (cegah
    // loop abadi kalau semua kandidat justru gagal dibuat).
    if (!r.sisa || (r.dibuat || 0) + (r.dilewati || 0) === 0) break
  }
  return { dibuat, dilewati, kandidat, gagal: [...gagalMap.values()] }
}

/**
 * provisionAkunSenyap — versi best-effort untuk dipasang di jalur impor/simpan.
 * TIDAK pernah melempar & tidak menampilkan galat: kalau Edge Function belum
 * ter-deploy atau pemanggilnya bukan admin, penyimpanan datanya TIDAK boleh
 * gagal gara-gara pembuatan akun. Kekurangannya disapu tombol manual / panggilan
 * berikutnya (fungsinya idempoten).
 */
export async function provisionAkunSenyap(target = {}) {
  try {
    const r = target?.docId ? await provisionAkun(target) : await provisionAkunSemua()
    if (r?.dibuat) console.log(`[provision-akun] ${r.dibuat} akun login dibuat`)
    return r
  } catch (e) {
    console.warn('[provision-akun] dilewati:', e?.message || e)
    return null
  }
}

// --- Google OAuth via Supabase (provider Google diaktifkan di Supabase Auth). ---
// Alur PKCE: signInWithOAuth/linkIdentity REDIRECT ke Google, balik dgn `?code=` →
// detectSessionInUrl:FALSE (supabase.js) → ditukar MANUAL via exchangeOAuthCode di initAuth
// (stores/auth.js Step 0) → onAuthChange bangun sesi.
// CATATAN: login via Google HANYA berhasil untuk user yang sudah MENAUTKAN Google
//   (akun Supabase-nya punya guru_id/santri_id di profiles). Google fresh tanpa tautan
//   → buildSesi null → gagal (memang by design: tautkan dulu dari Profil).
function _googleRedirect() {
  try {
    return window.location.origin + window.location.pathname
  } catch {
    return undefined
  }
}

// Sync email Google tertaut → row guru/santri (badge "tertaut" baca row, bukan identitas
// Supabase). Dipanggil di buildSesi (titik balik OAuth). Best-effort, tak ganggu login.
async function _syncGoogleEmail(coll, id, current) {
  try {
    const { data } = await supabase.auth.getUserIdentities()
    const gi = (data?.identities || []).find((i) => i.provider === 'google')
    const em = gi?.identity_data?.email || (gi ? 'google' : '')
    if (em && em !== current) await mergeOne(coll, String(id), { linked_email: em })
    return em
  } catch {
    return current || ''
  }
}

/** Tukar kode OAuth (PKCE) jadi sesi — dipanggil initAuth saat balik dari Google.
 *  Perlu krn detectSessionInUrl:false (auto-detect dimatikan supaya login biasa tak hang). */
export async function exchangeOAuthCode(code) {
  _ensure()
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) throw error
}

export async function loginWithGoogle() {
  _ensure()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: _googleRedirect() }
  })
  if (error) throw error
  // Browser redirect ke Google; tak ada nilai balik (sesi dibangun saat kembali).
}

export async function linkGoogleAccount() {
  _ensure()
  // Manual linking — WAJIB diaktifkan di Supabase: Auth → (Advanced) Allow manual linking.
  const { error } = await supabase.auth.linkIdentity({
    provider: 'google',
    options: { redirectTo: _googleRedirect() }
  })
  if (error) throw error
  return {} // redirect; tautan aktif saat kembali.
}

export async function unlinkGoogleAccount(coll, id) {
  _ensure()
  const { data, error } = await supabase.auth.getUserIdentities()
  if (error) throw error
  const g = (data?.identities || []).find((i) => i.provider === 'google')
  if (!g) throw new Error('Tidak ada akun Google tertaut.')
  const { error: e2 } = await supabase.auth.unlinkIdentity(g)
  if (e2) throw e2
  // Bersihkan badge "tertaut" di row guru/santri (best-effort).
  try {
    if (coll && id) await mergeOne(coll, String(id), { linked_email: null, google_email: null })
  } catch {
    /* ignore */
  }
  return {}
}
