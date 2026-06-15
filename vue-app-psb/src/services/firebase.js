// Firebase v10 modular — sama project dengan vue-app utama (portal-mambaul-ulum)
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

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

// v.100g: App Check (reCAPTCHA v3) — supaya upload PSB (KK/akta → Storage `psb/`) + tulis
//   `psb_pendaftaran` ter-VERIFIKASI App Check. Syarat agar Storage/Firestore bisa di-Enforce
//   tanpa memutus pendaftaran publik (sebelumnya PSB tak init App Check → semua unverified).
//   PSB selalu web (https). Init SEBELUM getFirestore/getStorage supaya request App Check-aware
//   sejak awal. Non-breaking (try/catch). Site key reCAPTCHA = PUBLIC (sama dgn app utama);
//   ⚠️ WAJIB domain `ammuonline-psb.web.app` didaftarkan di allowlist key (Console reCAPTCHA),
//   kalau tidak token gagal terbit → tetap unverified.
try {
  const _acKey =
    import.meta.env.VITE_APPCHECK_RECAPTCHA_KEY || '6Ld1GRMtAAAAAB50imwqPEJ7hEMf4LlZaTY8cFAk'
  if (_acKey && typeof location !== 'undefined' && /^https?:$/.test(location.protocol)) {
    initializeAppCheck(firebaseApp, {
      provider: new ReCaptchaV3Provider(_acKey),
      isTokenAutoRefreshEnabled: true
    })
  }
} catch (e) {
  /* non-blocking */
}

export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
