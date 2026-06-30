// Auth store — sesiAktif (Supabase Auth). F6a (migrasi Supabase): cutover auth.
// login/logout/initAuth pindah dari Firebase (services/auth) -> services/authSupabase.
//
// sesiAktif bentuk IDENTIK seperti sebelumnya. Kompat:
//   - field `firebase_uid`/`firebase_email` tetap diisi (dari user Supabase) supaya
//     useWaliChildren/ProfilView/localStorage tak perlu diubah.
//   - admin built-in tetap `auth_method:'admin-builtin'` (deteksi admin + persist).
//   - guru/santri `auth_method:'supabase'`.
// Google login (loadSesiFromUser) DITUNDA ke F6c/F7 (akan via Supabase OAuth, bukan
//   Firebase) — di-stub dgn error jelas selama migrasi.
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as authSupabase from '@/services/authSupabase'
import { mergeOne, setAuditSesi } from '@/services/db'
import { useCollectionsStore } from '@/stores/collections'
import { useToast } from '@/composables/useToast'

const SESI_STORAGE_KEY = 'portalMu_sesiAdminBuiltIn'

function _persistAdminSesi(sesi) {
  try {
    if (sesi && sesi.auth_method === 'admin-builtin') {
      localStorage.setItem(SESI_STORAGE_KEY, JSON.stringify(sesi))
    } else {
      localStorage.removeItem(SESI_STORAGE_KEY)
    }
  } catch (e) {
    // ignore storage errors
  }
}

function _loadAdminSesi() {
  try {
    const raw = localStorage.getItem(SESI_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && parsed.auth_method === 'admin-builtin' && parsed.role === 'admin') return parsed
    return null
  } catch (e) {
    return null
  }
}

// v.84.0526: Persist FULL sesi (admin/guru/santri) — fix Android logout setiap close app.
// Capacitor WebView restart bisa clear IndexedDB → user terlogout. localStorage lebih persistent.
const SESI_FULL_KEY = 'portalMu_sesiAktif'
function _persistFullSesi(sesi) {
  // v.91.0626: set sesi utk atribusi audit_log (backup-sebelum-hapus di deleteOne)
  try {
    setAuditSesi(sesi && sesi.role ? sesi : null)
  } catch (e) {}
  try {
    if (sesi && sesi.role) {
      localStorage.setItem(SESI_FULL_KEY, JSON.stringify({ ...sesi, _persisted_at: Date.now() }))
    } else {
      localStorage.removeItem(SESI_FULL_KEY)
    }
  } catch (e) {}
}
function _loadFullSesi() {
  try {
    const raw = localStorage.getItem(SESI_FULL_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && parsed.role && parsed.id) {
      // Expire setelah 30 hari (safety)
      const age = Date.now() - (parsed._persisted_at || 0)
      if (age > 30 * 24 * 60 * 60 * 1000) {
        localStorage.removeItem(SESI_FULL_KEY)
        return null
      }
      return parsed
    }
    return null
  } catch (e) {
    return null
  }
}

// Kompat: app lama baca firebase_uid/firebase_email; admin pakai auth_method
// 'admin-builtin'. Petakan output buildSesi() (supabase_uid/email + auth_method
// 'supabase') ke bentuk yang dipakai komponen lama TANPA mengubah komponen itu.
function _finalizeSesi(sesi) {
  if (!sesi) return sesi
  sesi.firebase_uid = sesi.supabase_uid
  sesi.firebase_email = sesi.supabase_email
  if (sesi.id === 'admin') sesi.auth_method = 'admin-builtin'
  return sesi
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const sesiAktif = ref(null) // { id, role, role_sistem, nama, jk, lembaga, guru, akses, ... }
  const fbUser = ref(null) // user Supabase Auth (nama dipertahankan utk kompat internal)
  const isLoading = ref(false)
  const error = ref(null)
  // v.20.4.0526: authReady Promise — resolve setelah auth state pertama selesai.
  // Router guard await ini sebelum check isLoggedIn → fix refresh = logout
  let _authReadyResolve = null
  const authReady = new Promise((resolve) => {
    _authReadyResolve = resolve
  })
  // v.111: dedupe reload koleksi terpusat (santri/guru/bukuInduk) per-uid supaya
  // TOKEN_REFRESHED berkala tak memicu refetch tiap kali.
  let _lastCollUid = null
  // v.111b: auto-recovery sesi "zombie" (refresh_token mati → onAuthChange user=null
  //   padahal sesiAktif terisi dari localStorage = "login tapi data kosong").
  let _loggingOut = false // tekan deteksi zombie selama logout DISENGAJA
  let _zombieHandled = false // one-shot supaya recover sekali per sesi-mati

  // Getters
  const isLoggedIn = computed(() => sesiAktif.value !== null)
  const isAdmin = computed(() => sesiAktif.value?.role === 'admin')
  const isGuru = computed(() => sesiAktif.value?.role === 'guru')
  const isSantri = computed(() => sesiAktif.value?.role === 'santri')

  /**
   * cekHakAkses — periksa permission user di legacy granular access map.
   * Built-in admin (id='admin') = full access selalu.
   * role_sistem super_admin / admin / admin_keuangan punya privilege tinggi.
   */
  function cekHakAkses(perm) {
    if (!sesiAktif.value) return false
    const s = sesiAktif.value
    // Built-in admin
    if (s.id === 'admin') return true
    // Super admin role_sistem
    if (s.role_sistem === 'super_admin') return true
    // Admin keuangan: akses keuangan only
    if (s.role_sistem === 'admin_keuangan' && perm === 'akses_keuangan') return true
    // Admin biasa: most non-finance perms
    if (s.role_sistem === 'admin' && perm !== 'akses_keuangan') return true
    // v.21.110.0527: akses_supervisi via jabatan/jabatan_tambahan Direktur/Supervisor
    if (perm === 'akses_supervisi') {
      const a = String(s.jabatan || '').toLowerCase()
      const b = String(s.jabatan_tambahan || '').toLowerCase()
      if (
        a.includes('direktur') ||
        a.includes('supervisor') ||
        b.includes('direktur') ||
        b.includes('supervisor')
      )
        return true
    }
    // Granular per-user akses map
    return s.akses?.[perm] === true
  }

  // ============== ACTIONS ==============

  /**
   * login(input, password, persistent)
   * F6a: resolve_login (RPC) -> signIn/signUp lazy (Supabase) -> buildSesi.
   * input bisa: username, WA digits, NIS, atau 'adminmu' / 'admin'.
   * Peran dipetakan server-side oleh trigger handle_new_user (migration 07).
   * Catatan: `persistent` (ingat saya) kini no-op — Supabase selalu persistSession.
   */
  async function login(input, password, persistent = true) {
    isLoading.value = true
    error.value = null
    try {
      // 1) Auth Supabase: resolve canonical auth_key -> signIn (lazy signUp bila baru).
      //    Status aktif/nonaktif & sandi salah dilempar di sini (auth/inactive, auth/wrong-password).
      await authSupabase.loginUnified(input, password)

      // 2) Bangun sesiAktif dari profiles + guru/santri (bentuk identik store lama).
      const sesi = _finalizeSesi(await authSupabase.buildSesi())
      if (!sesi) {
        const err = new Error(
          'Akun terautentikasi tapi belum terdaftar sebagai guru/santri/admin di sistem.'
        )
        err.code = 'auth/not-registered'
        throw err
      }

      sesiAktif.value = sesi
      fbUser.value = { id: sesi.supabase_uid, email: sesi.supabase_email }
      _persistAdminSesi(sesi.id === 'admin' ? sesi : null) // clear admin localStorage utk non-admin
      _persistFullSesi(sesi) // v.91.0626: backup sesi -> fix reopen-logout
      // v.111: token sudah menempel pasca-signIn -> refetch koleksi terpusat supaya
      //   santri/guru/bukuInduk tak kosong tanpa hard refresh. Dedupe vs onAuthChange.
      try {
        _lastCollUid = sesi.supabase_uid || sesi.id || null
        useCollectionsStore().reloadActive()
      } catch (e) {
        /* noop */
      }
    } catch (e) {
      const code = e.code || ''
      let msg = e.message || String(e)
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        msg = 'Kata sandi salah'
      } else if (code === 'auth/not-found') {
        msg =
          'Username tidak ditemukan. Pastikan ketik dengan benar — Guru/Pegawai bisa pakai username atau no WA, Santri pakai No. Induk atau no WA wali.'
      } else if (/too many|rate limit/i.test(msg)) {
        msg = 'Terlalu banyak percobaan. Coba lagi dalam beberapa menit.'
      } else if (/network|failed to fetch/i.test(msg)) {
        msg = 'Koneksi bermasalah. Periksa internet Anda.'
      }
      error.value = msg
      const wrappedErr = new Error(msg)
      wrappedErr.code = code
      throw wrappedErr
    } finally {
      isLoading.value = false
    }
  }

  /**
   * loadSesiFromUser — DITUNDA (F6c/F7). Google OAuth akan dipindah ke Supabase
   * (signInWithOAuth), bukan Firebase. Selama migrasi, pakai username/WA/NIS + sandi.
   */
  // eslint-disable-next-line no-unused-vars
  async function loadSesiFromUser(user) {
    const err = new Error(
      'Login Google sementara dinonaktifkan selama migrasi. Silakan masuk dengan username/WA/NIS + kata sandi.'
    )
    err.code = 'auth/google-deferred'
    throw err
  }

  async function logout() {
    _loggingOut = true // v.111b: cegah _recoverZombieSession nyala saat logout disengaja
    // v.100 K1: hapus fcm_token user yang KELUAR sebelum sign-out — cegah notif anak/wali
    //   nyasar ke pengguna berikutnya di HP yang sama. Best-effort (lewat adapter Supabase).
    try {
      const s = sesiAktif.value
      if (s && s.id && String(s.id) !== 'admin') {
        const coll = s.role === 'santri' ? 'santri' : 'guru'
        await mergeOne(coll, String(s.id), { fcm_token: null })
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[auth.logout] clear fcm_token gagal:', e?.message || e)
    }
    try {
      await authSupabase.signOut()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[auth.logout] signOut Supabase gagal:', e?.message || e)
    }
    sesiAktif.value = null
    fbUser.value = null
    _persistAdminSesi(null) // clear localStorage
    _persistFullSesi(null) // v.85.0526: clear backup sesi juga
    // v.111: kosongkan koleksi terpusat (cegah data user lama bocor ke user berikut
    //   di perangkat bersama; santri/guru/bukuInduk fresh saat login baru).
    _lastCollUid = null
    try {
      useCollectionsStore().clear()
    } catch (e) {
      /* noop */
    }
    _zombieHandled = false // v.111b: reset one-shot utk sesi berikutnya
    _loggingOut = false
  }

  function setSesiAktif(sesi) {
    sesiAktif.value = sesi
    _persistFullSesi(sesi) // v.85.0526: auto-persist supaya Android close-app tidak logout
  }

  // v.108: update foto sesi seketika supaya avatar pita/greeting reaktif TANPA refresh
  //   (fotoUrl di useRibbonUser baca sesiAktif.foto duluan). + persist agar tahan reopen.
  function updateSesiFoto(url) {
    if (!sesiAktif.value) return
    sesiAktif.value = { ...sesiAktif.value, foto: url }
    _persistFullSesi(sesiAktif.value)
    if (String(sesiAktif.value.id) === 'admin') _persistAdminSesi(sesiAktif.value)
  }

  /**
   * Restore sesi admin built-in dari localStorage saat App init (sync, instan).
   * Sesi Supabase asli di-restore async oleh onAuthChange (persistSession).
   */
  function restoreAdminSesiFromStorage() {
    if (sesiAktif.value) return // sudah ada sesi
    const stored = _loadAdminSesi()
    if (stored) sesiAktif.value = stored
  }

  /**
   * v.111b: AUTO-RECOVERY sesi "zombie" — sesiAktif terisi dari localStorage tapi Supabase
   *   tak punya sesi valid (refresh_token mati/400). Tanpa ini: koleksi ke-RLS-filter →
   *   "data guru/santri kosong padahal seolah login". Recover: bersihkan sesi basi + koleksi,
   *   beri tahu user, arahkan ke /login (ambil token segar). One-shot per sesi-mati.
   */
  function _recoverZombieSession() {
    if (_zombieHandled) return
    _zombieHandled = true
    // eslint-disable-next-line no-console
    console.warn('[auth] Sesi Supabase zombie (token mati) — auto-logout ke halaman login.')
    sesiAktif.value = null
    fbUser.value = null
    _lastCollUid = null
    _persistAdminSesi(null)
    _persistFullSesi(null)
    try {
      useCollectionsStore().clear()
    } catch (e) {
      /* noop */
    }
    try {
      useToast().warning('Sesi berakhir — silakan masuk kembali.')
    } catch (e) {
      /* noop */
    }
    try {
      if (!String(window.location.hash || '').includes('/login')) {
        window.location.hash = '#/login'
      }
    } catch (e) {
      /* noop */
    }
  }

  /**
   * initAuth — dipanggil sekali dari main.js sebelum router siap.
   * 1) Restore cepat dari localStorage (admin + full sesi) supaya UI tak flash logout.
   * 2) Subscribe Supabase Auth: event pertama resolve authReady. Bila ada sesi Supabase
   *    (di-restore persistSession) tapi sesiAktif kosong/basi -> buildSesi() rekonstruksi.
   */
  async function initAuth() {
    // Step 0: OAuth Google return — tukar ?code jadi sesi (detectSessionInUrl:false → manual).
    try {
      const _code = new URLSearchParams(window.location.search).get('code')
      if (_code) {
        await authSupabase.exchangeOAuthCode(_code)
        const _clean = window.location.origin + window.location.pathname + window.location.hash
        window.history.replaceState({}, '', _clean)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[auth.initAuth] OAuth code exchange gagal:', e?.message || e)
    }
    // Step 1: restore cepat dari localStorage (sync)
    restoreAdminSesiFromStorage()
    if (!sesiAktif.value) {
      const stored = _loadFullSesi()
      if (stored && stored.role) sesiAktif.value = stored
    }
    // set sesi utk atribusi audit_log setelah restore (reopen tetap ter-atribusi)
    try {
      setAuditSesi(sesiAktif.value)
    } catch (e) {}

    // Step 2: subscribe Supabase Auth — first callback resolves authReady.
    let resolved = false
    const done = () => {
      if (!resolved && _authReadyResolve) {
        resolved = true
        _authReadyResolve()
      }
    }
    authSupabase.onAuthChange(async (user) => {
      if (user) {
        _zombieHandled = false // sesi valid lagi → izinkan deteksi zombie berikutnya
        fbUser.value = user
        try {
          // Rekonstruksi sesi bila kosong atau milik user lain (sesi basi dari localStorage).
          if (!sesiAktif.value || sesiAktif.value.supabase_uid !== user.id) {
            const sesi = _finalizeSesi(await authSupabase.buildSesi())
            if (sesi) {
              sesiAktif.value = sesi
              _persistFullSesi(sesi)
              if (sesi.id === 'admin') _persistAdminSesi(sesi)
            }
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('[auth.initAuth] buildSesi fail:', e?.message)
        }
        // v.111: saat token auth siap (INITIAL_SESSION ketika sesi di-restore / SIGNED_IN
        //   ketika login) -> refetch koleksi terpusat. Ini yang memperbaiki "data kosong
        //   sampai hard refresh" di Android/Electron. Dedupe per-uid (TOKEN_REFRESHED skip).
        if (_lastCollUid !== user.id) {
          _lastCollUid = user.id
          try {
            useCollectionsStore().reloadActive()
          } catch (e) {
            /* noop */
          }
        }
      } else {
        // user null. Bedakan: (a) memang belum login (sesiAktif kosong) → biarkan, guard
        //   arahkan ke /login; vs (b) ZOMBIE: sesiAktif terisi dari localStorage tapi
        //   Supabase tak punya sesi (token mati). Recover HANYA bila BUKAN logout sengaja.
        if (!_loggingOut && sesiAktif.value) {
          _recoverZombieSession()
        }
      }
      done()
    })

    // Safety timeout 3s (kalau onAuthChange tak fire)
    setTimeout(done, 3000)
  }

  return {
    sesiAktif,
    fbUser,
    isLoading,
    error,
    authReady,
    isLoggedIn,
    isAdmin,
    isGuru,
    isSantri,
    hasAccess: cekHakAkses,
    cekHakAkses,
    login,
    logout,
    setSesi: setSesiAktif,
    setSesiAktif,
    updateSesiFoto,
    restoreAdminSesiFromStorage,
    initAuth,
    loadSesiFromUser
  }
})
