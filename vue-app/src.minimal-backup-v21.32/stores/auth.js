// Auth store — sesiAktif (replace legacy global `sesiAktif`)
// v.53.0526: Full port loginUnified — findUserByLoginInput + padded password + lazy migration
// v.53.1: Persist admin built-in sesiAktif via localStorage (Firebase Auth user only untuk guru/santri)
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  indexedDBLocalPersistence
} from 'firebase/auth'
import { auth as fbAuth } from '@/services/firebase'
import * as authService from '@/services/auth'
import { queryColl } from '@/services/firestore'

const ADMIN_EMAIL_SUFFIX = '@portal-mu.local'
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

export const useAuthStore = defineStore('auth', () => {
  // State
  const sesiAktif = ref(null) // { id, role, role_sistem, nama, jk, lembaga, guru, akses, ... }
  const fbUser = ref(null) // Firebase Auth user
  const isLoading = ref(false)
  const error = ref(null)
  // v.20.4.0526: authReady Promise — resolve setelah Firebase Auth + admin storage restore done.
  // Router guard await ini sebelum check isLoggedIn → fix refresh = logout
  let _authReadyResolve = null
  const authReady = new Promise((resolve) => {
    _authReadyResolve = resolve
  })

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
    // Granular per-user akses map
    return s.akses?.[perm] === true
  }

  // ============== ACTIONS ==============

  /**
   * login(input, password, persistent)
   * v.53.0526: Full port loginUnified dari legacy.
   * input bisa: username, WA digits, NIS, atau 'adminmu' / 'admin'
   * Flow:
   *   1. findUserByLoginInput → match guru/santri/admin
   *   2. Status check (aktif/nonaktif)
   *   3. loginUnified → padded password → raw fallback → lazy migration
   *   4. Build sesiAktif dari userInfo
   */
  async function login(input, password, persistent = true) {
    isLoading.value = true
    error.value = null
    try {
      // 1) Lookup user di Firestore data
      const userInfo = await authService.findUserByLoginInput(input)
      if (!userInfo) {
        // v.20.2.0526: Hapus bocoran admin username dari error. Hint umum saja.
        const err = new Error(
          'Username tidak ditemukan. Pastikan ketik dengan benar — Guru/Pegawai bisa pakai username atau no WA, Santri pakai NIS atau no WA wali.'
        )
        err.code = 'auth/not-found'
        throw err
      }

      // 2) Status check
      if (userInfo.source === 'guru' && userInfo.data.status === 'Tidak Aktif') {
        throw new Error('Akun guru berstatus tidak aktif. Hubungi administrator.')
      }
      if (userInfo.source === 'santri' && userInfo.data.aktif === false) {
        throw new Error('Akun santri tidak aktif. Hubungi administrator.')
      }

      // 3) Auth via Firebase (padded → raw → lazy migration)
      const result = await authService.loginUnified(userInfo, password, persistent)

      // 4) Build sesiAktif sesuai source
      if (userInfo.source === 'admin') {
        sesiAktif.value = {
          id: 'admin',
          role: 'admin',
          role_sistem: 'super_admin',
          nama: 'Administrator',
          guru: 'Admin Utama',
          jk: 'L',
          jabatan: 'Administrator',
          lembaga: 'Semua Data',
          akses: {
            kelola_guru: true,
            akses_keuangan: true,
            kelola_santri: true,
            kelola_lembaga: true,
            kelola_kelas: true
          },
          auth_method: 'admin-builtin'
        }
        _persistAdminSesi(sesiAktif.value)
        return
      }

      // v.20.5.0526: clear admin built-in localStorage saat login non-admin
      // supaya refresh tidak restore admin session yang overwrite guru/santri
      if (userInfo.source !== 'admin') {
        _persistAdminSesi(null)
      }

      if (userInfo.source === 'guru') {
        const g = userInfo.data
        const rs = g.role_sistem || 'user'
        const isPengurus = ['admin', 'admin_keuangan', 'super_admin'].includes(rs)
        sesiAktif.value = {
          id: g.id,
          role: isPengurus ? 'admin' : 'guru',
          role_sistem: rs,
          nama: g.nama,
          guru: g.nama,
          lembaga: isPengurus ? 'Semua Data' : g.lembaga || '',
          jk: g.jk || '',
          jabatan: g.jabatan || '',
          username: g.username || '',
          wa: g.wa || '',
          foto: g.foto || '',
          akses: g.akses || {},
          auth_method: result.authMethod,
          firebase_uid: result.user?.uid,
          firebase_email: result.user?.email
        }
        fbUser.value = result.user
        return
      }

      if (userInfo.source === 'santri') {
        const s = userInfo.data
        sesiAktif.value = {
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
          auth_method: result.authMethod,
          firebase_uid: result.user?.uid,
          firebase_email: result.user?.email
        }
        fbUser.value = result.user
        return
      }
    } catch (e) {
      const code = e.code || ''
      let msg = e.message || String(e)
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        msg = 'Kata sandi salah'
      } else if (code === 'auth/too-many-requests') {
        msg = 'Terlalu banyak percobaan. Coba lagi dalam beberapa menit.'
      } else if (code === 'auth/network-request-failed') {
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
   * loadSesiFromUser — port lengkap dari legacy index.html _handleGoogleAuthResult.
   * Strategy:
   *   1. Cek linked_uid → match guru/santri yang sudah link Google Sign-In
   *   2. Fallback: cek linked_email
   *   3. Fallback: ambil wa dari email pattern (`{wa}@portal-mu.local`)
   *      → lookup guru/santri dengan field wa match
   *   4. Set sesiAktif sesuai role + role_sistem (admin/guru/santri)
   */
  async function loadSesiFromUser(user) {
    if (!user) return
    const uid = user.uid
    const emailLower = (user.email || '').toLowerCase()

    // Step 1: lookup by linked_uid (Google linking)
    let matchGuru = await queryColl('guru', [['linked_uid', '==', uid]], [], 1)
    let matchSantri = []
    if (matchGuru.length === 0) {
      matchSantri = await queryColl('santri', [['linked_uid', '==', uid]], [], 1)
    }

    // Step 2: fallback by linked_email
    if (matchGuru.length === 0 && matchSantri.length === 0 && emailLower) {
      matchGuru = await queryColl('guru', [['linked_email', '==', emailLower]], [], 1)
      if (matchGuru.length === 0) {
        matchSantri = await queryColl('santri', [['linked_email', '==', emailLower]], [], 1)
      }
    }

    // Step 3: fallback by WA dari email pattern (`{wa}@portal-mu.local`)
    if (
      matchGuru.length === 0 &&
      matchSantri.length === 0 &&
      emailLower.endsWith(ADMIN_EMAIL_SUFFIX)
    ) {
      const wa = emailLower.replace(ADMIN_EMAIL_SUFFIX, '')
      if (wa && wa !== 'admin') {
        // Coba match field wa (number atau string)
        matchGuru = await queryColl('guru', [['wa', '==', wa]], [], 1)
        if (matchGuru.length === 0) {
          matchSantri = await queryColl('santri', [['wa', '==', wa]], [], 1)
        }
      }
    }

    // Step 4: Set sesiAktif berdasar match
    if (matchGuru.length > 0) {
      const g = matchGuru[0]
      if (g.status === 'Tidak Aktif') {
        await authService.logout()
        throw new Error('Akun guru berstatus tidak aktif')
      }
      const rs = g.role_sistem || 'user'
      const isPengurus = ['admin', 'admin_keuangan', 'super_admin'].includes(rs)
      sesiAktif.value = {
        id: g.id,
        role: isPengurus ? 'admin' : 'guru',
        role_sistem: rs,
        nama: g.nama,
        guru: g.nama,
        lembaga: isPengurus ? 'Semua Data' : g.lembaga || '',
        jk: g.jk || '',
        jabatan: g.jabatan || '',
        username: g.username || '',
        wa: g.wa || '',
        foto: g.foto || '',
        akses: g.akses || {},
        auth_method: 'firebase',
        firebase_uid: uid,
        firebase_email: user.email
      }
      return
    }

    if (matchSantri.length > 0) {
      const s = matchSantri[0]
      if (s.aktif === false) {
        await authService.logout()
        throw new Error('Akun santri tidak aktif')
      }
      sesiAktif.value = {
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
        auth_method: 'firebase',
        firebase_uid: uid,
        firebase_email: user.email
      }
      return
    }

    // Step 5: No match — user terotentikasi tapi tidak terdaftar di DB
    // eslint-disable-next-line no-console
    console.warn(
      '[auth.loadSesiFromUser] Firebase user authenticated tapi tidak match guru/santri:',
      emailLower
    )
    sesiAktif.value = null
    throw new Error('Akun terautentikasi tapi belum terdaftar sebagai guru/santri di sistem.')
  }

  async function logout() {
    await authService.logout()
    sesiAktif.value = null
    fbUser.value = null
    _persistAdminSesi(null) // clear localStorage
  }

  function setSesiAktif(sesi) {
    sesiAktif.value = sesi
  }

  /**
   * Restore sesi admin built-in dari localStorage saat App init.
   * Dipanggil di App.vue onMounted setelah Firebase Auth check selesai.
   * Kalau Firebase user null TAPI admin sesi tersimpan → restore.
   */
  function restoreAdminSesiFromStorage() {
    if (sesiAktif.value) return // sudah ada sesi (kemungkinan dari Firebase Auth)
    // v.20.5.0526: kalau Firebase Auth user ada → ini sesi guru/santri.
    // Skip restore admin built-in supaya tidak overwrite sesi non-admin
    if (fbAuth.currentUser) return
    const stored = _loadAdminSesi()
    if (stored) {
      sesiAktif.value = stored
    }
  }

  /**
   * v.20.4.0526: initAuth — dipanggil sekali dari main.js sebelum router siap.
   * Restore admin (sync) + subscribe Firebase Auth (async), resolve authReady setelah
   * first onAuthStateChanged fire supaya router guard tidak redirect ke /login saat refresh.
   */
  function initAuth() {
    // Step 1: Admin built-in instant restore (sync localStorage)
    restoreAdminSesiFromStorage()

    // v.21.24c.0526: Force persist Firebase Auth ke IndexedDB (lebih reliable di PWA standalone)
    // Sebelumnya: persistence dipasang hanya saat loginUnified. Di PWA refresh, kalau ada race
    // di onAuthStateChanged sebelum persistence di-set → state hilang.
    // Try indexedDBLocalPersistence dulu (PWA-friendly), fallback ke browserLocalPersistence (localStorage).
    setPersistence(fbAuth, indexedDBLocalPersistence)
      .catch(() => setPersistence(fbAuth, browserLocalPersistence))
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.warn('[auth.initAuth] setPersistence fail:', e?.message)
      })

    // Step 2: Subscribe Firebase Auth — first callback resolves authReady
    let resolved = false
    onAuthStateChanged(fbAuth, async (user) => {
      if (user) {
        fbUser.value = user
        try {
          await loadSesiFromUser(user)
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('[auth.initAuth] loadSesiFromUser fail:', e.message)
        }
      }
      if (!resolved && _authReadyResolve) {
        resolved = true
        _authReadyResolve()
      }
    })

    // Safety timeout 3s
    setTimeout(() => {
      if (!resolved && _authReadyResolve) {
        resolved = true
        _authReadyResolve()
      }
    }, 3000)
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
    restoreAdminSesiFromStorage,
    initAuth,
    loadSesiFromUser
  }
})
