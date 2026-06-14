// Firebase v10 modular — init satu kali, export instances
// Migrasi dari `firebase.firestore()` (compat) di legacy ke modular SDK
import { initializeApp, getApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

// v.20.3.0526: ROOT CAUSE FIX — sebelumnya Vue connect ke project `qiraati-rapor` (defunct),
// data + akun real ada di `portal-mambaul-ulum`. Itu sebabnya:
// - Login guru/santri gagal (auth/api-key-not-valid pada project qiraati-rapor)
// - Data tidak terbaca (Firestore project beda → empty)
// - Hanya admin built-in yang masuk (validasi password lokal, gak butuh Firebase Auth)
// Config sekarang exact match legacy public/index.html line 14082
const firebaseConfig = {
  apiKey: 'AIzaSyBdZexExhs-vCnAOXRK6DSj4uUUTMGWlEE',
  authDomain: 'portal-mambaul-ulum.firebaseapp.com',
  projectId: 'portal-mambaul-ulum',
  storageBucket: 'portal-mambaul-ulum.firebasestorage.app',
  messagingSenderId: '289365012301',
  appId: '1:289365012301:web:c5b2655559043783221104',
  measurementId: 'G-59LNXJ9MVH'
}

export const firebaseApp = initializeApp(firebaseConfig)
// === App Check (audit 08Jun2026, v.96.0626) — blokir klien non-app ==========================
// Init SINKRON, tepat setelah initializeApp & SEBELUM getFirestore/getAuth dipakai, supaya
// SEMUA request Firestore/Auth/Storage App Check-aware sejak awal (penting agar aman saat
// Console di-Enforce: request awal tak ditolak karena token belum siap).
// AMAN/non-breaking: hanya aktif bila VITE_APPCHECK_RECAPTCHA_KEY di-set. Key kosong = OFF.
// Web/PWA: reCAPTCHA v3. Native (Capacitor/Electron): set VITE_APPCHECK_DEBUG_TOKEN (token
// terdaftar di Console) atau exempt dulu. try/catch -> gagal init TIDAK memblok app.
try {
  const _acKey = import.meta.env.VITE_APPCHECK_RECAPTCHA_KEY
  const _acDebug = import.meta.env.VITE_APPCHECK_DEBUG_TOKEN
  // v.97.0626: reCAPTCHA v3 HANYA jalan di origin web http(s). Di Electron (file://) & Capacitor
  // native (localhost/capacitor scheme) reCAPTCHA gagal terus -> spam "appCheck/recaptcha-error".
  const _isNative =
    (typeof navigator !== 'undefined' && /Electron/i.test(navigator.userAgent)) ||
    (typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform())
  const _isWebOrigin =
    typeof location !== 'undefined' && /^https?:$/.test(location.protocol) && !_isNative

  if (_isNative) {
    // v.100f: NATIVE (Capacitor/Electron) — App Check via DEBUG TOKEN.
    //   reCAPTCHA tak bisa jalan di WebView/file://; JS SDK juga tak bisa pakai Play Integrity
    //   native tanpa plugin. Debug token (VITE_APPCHECK_DEBUG_TOKEN, didaftarkan di Console
    //   App Check > app Android > Manage debug tokens) membuat request native ter-verifikasi.
    //   Token HANYA diterapkan di native -> web tetap reCAPTCHA murni (tak ikut melemah).
    //   COCOK utk fase INTERNAL TESTING. PRODUKSI: ganti ke Play Integrity via
    //   @capacitor-firebase/app-check + CustomProvider (butuh upgrade firebase JS ke v12).
    if (_acDebug && typeof self !== 'undefined') {
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = _acDebug === 'true' ? true : _acDebug
      initializeAppCheck(firebaseApp, {
        provider: new ReCaptchaV3Provider(_acKey || 'appcheck-native-debug'),
        isTokenAutoRefreshEnabled: true
      })
    }
  } else if (_isWebOrigin && _acKey) {
    // Web/PWA: reCAPTCHA v3 asli.
    initializeAppCheck(firebaseApp, {
      provider: new ReCaptchaV3Provider(_acKey),
      isTokenAutoRefreshEnabled: true
    })
  }
} catch (e) { /* non-blocking */ }
// ==========================================================================================
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp)

// v.53.0526: Secondary Firebase app untuk provisioning Auth user baru tanpa swap session admin.
// Port dari legacy _getSecondaryAuth() — saat lazy-create Auth user untuk guru/santri legacy,
// createUserWithEmailAndPassword auto-signIn user baru di app utama → kebuang session admin.
// Pakai secondary app: createUser di sana, lalu signOut, main app session tidak terganggu.
let _secondaryAuth = null
export function getSecondaryAuth() {
  if (_secondaryAuth) return _secondaryAuth
  try {
    const secondaryApp = initializeApp(firebaseConfig, '_auth_provisioning')
    _secondaryAuth = getAuth(secondaryApp)
    return _secondaryAuth
  } catch (e) {
    try {
      const existingApp = getApp('_auth_provisioning')
      _secondaryAuth = getAuth(existingApp)
      return _secondaryAuth
    } catch (e2) {
      // eslint-disable-next-line no-console
      console.warn('[firebase] Secondary auth init fail:', e2.message)
      return null
    }
  }
}

// Emulator opt-in: set VITE_USE_FIREBASE_EMULATOR=1 di .env.local
if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === '1') {
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectStorageEmulator(storage, 'localhost', 9199)
  // eslint-disable-next-line no-console
  console.info('[firebase] Connected to local emulators')
}
