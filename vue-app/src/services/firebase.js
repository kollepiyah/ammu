// Firebase v10 modular — init satu kali, export instances
// Migrasi dari `firebase.firestore()` (compat) di legacy ke modular SDK
import { initializeApp, getApp } from 'firebase/app'
import { initializeFirestore, getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { initializeAppCheck, ReCaptchaV3Provider, CustomProvider } from 'firebase/app-check'

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

// v.105 (S5): loader Play Integrity native (memoized) untuk CustomProvider App Check.
//   Hanya dipakai di Capacitor Android. Plugin + FirebaseAppCheck.initialize() di-load
//   LAZY saat token pertama diminta; di-cache supaya initialize native sekali saja.
let _nativeAppCheckReady = null
function _ensureNativeAppCheck() {
  if (!_nativeAppCheckReady) {
    _nativeAppCheckReady = import('@capacitor-firebase/app-check').then(async (mod) => {
      const FAC = mod.FirebaseAppCheck
      // Android: provider Play Integrity otomatis (sesuai google-services.json).
      await FAC.initialize({ isTokenAutoRefreshEnabled: true })
      // v.109 FIX: FAC = Capacitor plugin proxy yang merespons SEMUA akses properti
      // (termasuk `.then`) dengan sebuah fungsi → bila `return FAC` di dalam .then/async,
      // mesin Promise menyangka FAC thenable lalu memanggil FAC.then(resolve,reject) →
      // native "FirebaseAppCheck.then() is not implemented on android". Bungkus objek
      // biasa agar nilai resolve BUKAN thenable.
      return { FAC }
    })
  }
  return _nativeAppCheckReady
}
async function _getNativeAppCheckToken() {
  const { FAC } = await _ensureNativeAppCheck()
  const r = await FAC.getToken()
  return { token: r.token, expireTimeMillis: r.expireTimeMillis }
}

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
  const _isElectron = typeof navigator !== 'undefined' && /Electron/i.test(navigator.userAgent)
  const _isCapacitorNative =
    typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()
  const _isNative = _isElectron || _isCapacitorNative
  const _isWebOrigin =
    typeof location !== 'undefined' && /^https?:$/.test(location.protocol) && !_isNative

  if (_isCapacitorNative) {
    // v.105 (S5): NATIVE Android (Capacitor) — App Check PRODUKSI via PLAY INTEGRITY.
    //   @capacitor-firebase/app-check meng-attest device di sisi native; CustomProvider
    //   menyalurkan token native ke JS SDK (WebView). initializeAppCheck dipanggil SINKRON
    //   (registrasi awal) — plugin di-load + getToken LAZY (memoized) saat request pertama.
    //   Menggantikan DEBUG TOKEN lama (dev-only, tak valid utk user produksi).
    //   PRASYARAT enforce: daftarkan Play Integrity di Firebase Console (App Check > app
    //   Android) + SHA-256 (upload & app-signing) + `npx cap sync android` + rebuild AAB.
    initializeAppCheck(firebaseApp, {
      provider: new CustomProvider({ getToken: _getNativeAppCheckToken }),
      isTokenAutoRefreshEnabled: true
    })
  } else if (_isElectron) {
    // Electron (desktop) — TAK ada Play Integrity → tetap DEBUG TOKEN (fase testing).
    //   VITE_APPCHECK_DEBUG_TOKEN didaftarkan di Console App Check > app Web > Manage debug tokens.
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
// v.109 FIX: Firestore transport. Default WebChannel streaming GAGAL di Android WebView
// (Capacitor) → "Could not reach Cloud Firestore backend within 10 seconds" → offline mode
// → data macet "Memuat…" selamanya. Force long-polling KHUSUS native; web tetap WebChannel
// (lebih efisien & sudah jalan). initializeFirestore WAJIB jadi akses Firestore PERTAMA —
// titik ini adalah init Firestore pertama di app, jadi aman.
const _isCapNativeFS =
  typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()
export const db = _isCapNativeFS
  ? initializeFirestore(firebaseApp, { experimentalForceLongPolling: true })
  : getFirestore(firebaseApp)
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
