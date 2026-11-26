// Bootstrap Vue 3 SPA
// v.20.0526: Import Tailwind CSS entry — auto-bundle ke dist/assets/index-*.css
import './assets/main.css'
// v.98: token + style shell Ribbon desktop (Electron). Semua selector di-scope .ammu-ribbon-app -> aman utk web/HP.
import './assets/ribbon.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useUiStore } from './stores/ui'
// v.21.24.0526: STATIC import auth store — fix race condition dengan router guard.
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// F4 (migrasi Supabase): SWR cache utk view yang sudah cutover ke db.js (F6).
// Additif — tak memengaruhi store/firestore yang masih jalan.
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './services/queryClient'
app.use(VueQueryPlugin, { queryClient })

// v.71.0526: register v-haptic directive globally untuk tombol native feel
import { vHaptic } from './composables/useHaptic'
app.directive('haptic', vHaptic)

// Kyai 25 Nov 2026: keterangan panjang dilipat seragam di semua halaman (components/ui/InfoLipat).
import InfoLipat from './components/ui/InfoLipat.vue'
app.component('InfoLipat', InfoLipat)

// Init dark mode dari storage SEBELUM mount supaya tidak flash
const ui = useUiStore(pinia)
ui.initDarkFromStorage()

// v.21.24.0526: Init auth SEBELUM mount supaya authReady promise tersedia di router guard
const auth = useAuthStore(pinia)
auth.initAuth()

// v.21.24c.0526: STATIC import settings — fix race dengan view init.
import { useSettingsStore } from './stores/settings'
import { APP_VERSION_RAW } from '@/utils/appVersion'
const settingsStore = useSettingsStore(pinia)
settingsStore
  .load()
  .then(() => settingsStore.subscribe())
  .catch(() => {})

// v.91.0626: deteksi Capacitor native — untuk ANTI-DOBEL splash.
const IS_NATIVE = (() => {
  try {
    const C = window.Capacitor
    if (!C) return false
    return typeof C.isNativePlatform === 'function' ? C.isNativePlatform() : !!C.isNative
  } catch {
    return false
  }
})()

// Batch 2 (26 Nov 2026): kembalikan warna status bar / theme-color ke hijau brand tepat saat
// splash mulai menghilang (sebelumnya selalu #0f766e sehingga status bar PWA iOS bocor hijau).
function aktifkanTemaBarHijau() {
  try {
    document.body.classList.add('splash-selesai')
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', '#0f766e')
  } catch {
    /* noop */
  }
}

// v.20.4.0526: Defensive mount + splash auto-hide (web/PWA/native)
function hideSplash() {
  aktifkanTemaBarHijau()
  const splash = document.getElementById('splash-screen')
  if (splash && !splash.classList.contains('fade-out')) {
    splash.classList.add('fade-out')
    setTimeout(() => {
      document.body.classList.add('app-running')
    }, 400)
  } else if (!document.body.classList.contains('app-running')) {
    document.body.classList.add('app-running')
  }
}

try {
  app.mount('#app')
} catch (mountErr) {
  console.error('[main.js] Vue app.mount FAIL:', mountErr)
}

if (IS_NATIVE) {
  // Batch 2 (26 Nov 2026): splash native Android sudah menampilkan logo sejak detik 0 saat
  // WebView & Vue loading. Begitu app.mount selesai, tutup splash native & fade-out splash HTML
  // singkat tanpa menahan 2,4 detik lagi seperti dulu.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      import('@capacitor/splash-screen')
        .then(({ SplashScreen }) => SplashScreen.hide({ fadeOutDuration: 180 }))
        .catch(() => {})
        .then(() => {
          setTimeout(hideSplash, 350)
        })
    })
  )
  // FALLBACK: kalau plugin tak tersedia/gagal -> tetap tutup splash
  setTimeout(() => {
    if (!document.body.classList.contains('app-running')) hideSplash()
  }, 4000)
} else {
  // Web/PWA — logo sudah langsung tampil dari HTML; begitu app siap, tahan singkat agar mulus.
  const SPLASH_MIN_MS = 700
  const splashStart = performance.now()
  requestAnimationFrame(() => {
    const elapsed = performance.now() - splashStart
    const remaining = Math.max(0, SPLASH_MIN_MS - elapsed)
    setTimeout(hideSplash, remaining)
  })
  // FALLBACK: kalau ada apa-apa yg block, force-hide splash max 5 detik
  setTimeout(() => {
    if (!document.body.classList.contains('app-running')) {
      console.warn('[main.js] Splash fallback hide @ 5s — Vue mount mungkin stuck')
      hideSplash()
    }
  }, 5000)
}

// v.100h: Init Sentry — DSN dari build-time env (VITE_SENTRY_DSN) ATAU default project,
//   dengan Firestore settings/general.sentryDsn sbg OVERRIDE opsional (backward-compat).
//   AKAR FIX (#5 audit): dulu DSN HANYA dari Firestore; field itu KOSONG utk app Vue ->
//   Sentry tak pernah init -> hanya site legacy (DSN hardcoded + masih hidup) yg muncul di
//   dashboard. DSN browser BUKAN rahasia (selalu terekspos di bundle klien) — sama project
//   dgn legacy, dibedakan via release/environment.
const DEFAULT_SENTRY_DSN =
  'https://1bd853a93f9f5d495dcf3e0db5cfe635@o4511390323834880.ingest.us.sentry.io/4511398644088832'
async function initSentry() {
  try {
    // 1) Resolusi DSN dulu (env > default) supaya tak gugur saat field Firestore kosong.
    let dsn = (import.meta.env.VITE_SENTRY_DSN || '').trim() || DEFAULT_SENTRY_DSN
    // 2) Tunggu SDK CDN (window.Sentry) siap — maks 5 dtk (toleran koneksi lambat).
    const t0 = Date.now()
    while (!window.Sentry && Date.now() - t0 < 5000) {
      await new Promise((r) => setTimeout(r, 100))
    }
    if (!window.Sentry) return
    // v.110: override DSN dari Firestore DIBUANG (migrasi Supabase). Dulu import('firebase/
    //   firestore') di sini menyeret SELURUH SDK Firestore ke vendor-firebase (~+300KB) PADAHAL
    //   db tak lagi di-ekspor firebase.js -> blok selalu gagal (di-catch). DSN cukup env/default.
    if (!dsn) return
    window.Sentry.init({
      dsn,
      tracesSampleRate: 0.1,
      // v.1.4.2: dari __APP_VERSION__ (package.json), bukan diketik ulang. Tag rilis Sentry
      //   yang salah tak pernah kelihatan di layar — ia cuma membuat galat produksi
      //   dikelompokkan ke versi yang keliru, dan baru ketahuan saat ditelusuri.
      release: `portal-mu@${APP_VERSION_RAW || 'dev'}`,
      environment: window.location.hostname.includes('localhost') ? 'dev' : 'prod'
    })

    console.log('[main.js] Sentry initialized')
  } catch (e) {
    console.warn('[main.js] Sentry init skipped:', e.message)
  }
}
initSentry()
