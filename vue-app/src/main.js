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

// Init dark mode dari storage SEBELUM mount supaya tidak flash
const ui = useUiStore(pinia)
ui.initDarkFromStorage()

// v.21.24.0526: Init auth SEBELUM mount supaya authReady promise tersedia di router guard
const auth = useAuthStore(pinia)
auth.initAuth()

// v.21.24c.0526: STATIC import settings — fix race dengan view init.
import { useSettingsStore } from './stores/settings'
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

// v.20.4.0526: Defensive mount + splash auto-hide (web/PWA)
function hideSplash() {
  const splash = document.getElementById('splash-screen')
  if (splash && !splash.classList.contains('fade-out')) {
    splash.classList.add('fade-out')
    setTimeout(() => {
      document.body.classList.add('app-running')
    }, 600)
  } else if (!document.body.classList.contains('app-running')) {
    document.body.classList.add('app-running')
  }
}

// v.91.0626: picu animasi "muncul" logo (class .reveal di #splash-screen). Idempotent.
function revealSplash() {
  const s = document.getElementById('splash-screen')
  if (s) s.classList.add('reveal')
}

try {
  app.mount('#app')
} catch (mountErr) {
  // eslint-disable-next-line no-console
  console.error('[main.js] Vue app.mount FAIL:', mountErr)
}

if (IS_NATIVE) {
  // v.91.0626 IN-APP ANIM (final): splash native = jembatan LATAR mint singkat. Tutup overlay
  // Capacitor ASAP -> web splash terlihat -> MAINKAN animasi logo (reveal, ~2s ala Netflix) +
  // footer (gambar HTML, anti-gepeng). Tak dobel: splash sistem tak menampilkan logo.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      import('@capacitor/splash-screen')
        .then(({ SplashScreen }) => SplashScreen.hide({ fadeOutDuration: 200 }))
        .catch(() => {})
        .then(() => {
          revealSplash()
          setTimeout(hideSplash, 2400)
        })
    })
  )
  // FALLBACK: kalau plugin tak tersedia/gagal -> tetap reveal + fade-out
  setTimeout(revealSplash, 900)
  setTimeout(() => {
    if (!document.body.classList.contains('app-running')) hideSplash()
  }, 6000)
} else {
  // v.91.0626: Web/PWA — logo di-reveal (animasi Netflix ~2 detik), lalu fade-out.
  requestAnimationFrame(revealSplash)
  const SPLASH_MIN_MS = 2400
  const splashStart = performance.now()
  requestAnimationFrame(() => {
    const elapsed = performance.now() - splashStart
    const remaining = Math.max(0, SPLASH_MIN_MS - elapsed)
    setTimeout(hideSplash, remaining)
  })
  // FALLBACK: kalau ada apa-apa yg block, force-hide splash max 6 detik
  setTimeout(() => {
    if (!document.body.classList.contains('app-running')) {
      // eslint-disable-next-line no-console
      console.warn('[main.js] Splash fallback hide @ 6s — Vue mount mungkin stuck')
      hideSplash()
    }
  }, 6000)
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
    // 3) Override dari Firestore bila admin set (opsional, non-blocking).
    try {
      const { db } = await import('@/services/firebase')
      const { doc, getDoc } = await import('firebase/firestore')
      const snap = await getDoc(doc(db, 'settings', 'general'))
      const fsDsn = snap.exists() ? (snap.data()?.sentryDsn || '').trim() : ''
      if (fsDsn) dsn = fsDsn
    } catch {
      /* abaikan — pakai env/default */
    }
    if (!dsn) return
    window.Sentry.init({
      dsn,
      tracesSampleRate: 0.1,
      release: 'portal-mu@108.0626',
      environment: window.location.hostname.includes('localhost') ? 'dev' : 'prod'
    })
    // eslint-disable-next-line no-console
    console.log('[main.js] Sentry initialized')
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[main.js] Sentry init skipped:', e.message)
  }
}
initSentry()
