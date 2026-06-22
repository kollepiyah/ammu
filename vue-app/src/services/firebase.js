// Firebase modular — init SATU KALI untuk FCM (Cloud Messaging) + App Check.
// Migrasi Supabase (F8): Firestore / Auth / Storage Firebase DIHAPUS dari app —
//   data, auth, dan storage kini sepenuhnya Supabase. Firebase menyusut jadi
//   "pipa notifikasi" (firebaseApp dipakai usePushNotifications + SW messaging)
//   plus App Check (defense-in-depth, native Play Integrity).
import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider, CustomProvider } from 'firebase/app-check'

// Config project portal-mambaul-ulum (FCM + App Check). Exact match legacy.
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
    typeof window !== 'undefined' &&
    window.Capacitor &&
    window.Capacitor.isNativePlatform &&
    window.Capacitor.isNativePlatform()
  const _isNative = _isElectron || _isCapacitorNative
  const _isWebOrigin =
    typeof location !== 'undefined' && /^https?:$/.test(location.protocol) && !_isNative

  if (_isCapacitorNative) {
    // v.105 (S5): NATIVE Android (Capacitor) — App Check PRODUKSI via PLAY INTEGRITY.
    //   @capacitor-firebase/app-check meng-attest device di sisi native; CustomProvider
    //   menyalurkan token native ke JS SDK (WebView). initializeAppCheck dipanggil SINKRON
    //   (registrasi awal) — plugin di-load + getToken LAZY (memoized) saat request pertama.
    initializeAppCheck(firebaseApp, {
      provider: new CustomProvider({ getToken: _getNativeAppCheckToken }),
      isTokenAutoRefreshEnabled: true
    })
  } else if (_isElectron) {
    // Electron (desktop) — TAK ada Play Integrity → tetap DEBUG TOKEN (fase testing).
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
} catch (e) {
  /* non-blocking */
}
// ==========================================================================================
