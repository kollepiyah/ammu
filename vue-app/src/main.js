// Bootstrap Vue 3 SPA
// v.20.0526: Import Tailwind CSS entry — auto-bundle ke dist/assets/index-*.css
import './assets/main.css'

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
settingsStore.load().then(() => settingsStore.subscribe()).catch(() => {})

// v.91.0626: deteksi Capacitor native — untuk ANTI-DOBEL splash.
const IS_NATIVE = (() => {
  try {
    const C = window.Capacitor
    if (!C) return false
    return typeof C.isNativePlatform === 'function' ? C.isNativePlatform() : !!C.isNative
  } catch { return false }
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

try {
  app.mount('#app')
} catch (mountErr) {
  // eslint-disable-next-line no-console
  console.error('[main.js] Vue app.mount FAIL:', mountErr)
}

if (IS_NATIVE) {
  // v.91.0626 ANTI-DOBEL: di app native, splash OS (Android/iOS) + plugin Capacitor SUDAH
  // tampil saat cold-start. Splash web (#splash-screen) TIDAK boleh ikut tampil — kalau ikut,
  // user lihat splash 2x. Maka: sembunyikan splash web SEKETIKA (tanpa fade/min-duration),
  // lalu tutup splash plugin native saat app siap (handoff mulus).
  document.body.classList.add('app-running')
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      import('@capacitor/splash-screen')
        .then(({ SplashScreen }) => SplashScreen.hide({ fadeOutDuration: 250 }).catch(() => {}))
        .catch(() => {})
    })
  )
} else {
  // v.91.0626: Web/PWA — splash tampil RINGKAS (1400ms, sebelumnya 3000ms) lalu fade-out.
  const SPLASH_MIN_MS = 1400
  const splashStart = performance.now()
  requestAnimationFrame(() => {
    const elapsed = performance.now() - splashStart
    const remaining = Math.max(0, SPLASH_MIN_MS - elapsed)
    setTimeout(hideSplash, remaining)
  })
  // FALLBACK: kalau ada apa-apa yg block, force-hide splash max 5 detik
  setTimeout(() => {
    if (!document.body.classList.contains('app-running')) {
      // eslint-disable-next-line no-console
      console.warn('[main.js] Splash fallback hide @ 5s — Vue mount mungkin stuck')
      hideSplash()
    }
  }, 5000)
}

// v.20.70.0526: Init Sentry kalau tersedia + DSN dari settings/general.sentryDsn
async function initSentry() {
  try {
    const t0 = Date.now()
    while (!window.Sentry && Date.now() - t0 < 3000) {
      await new Promise((r) => setTimeout(r, 100))
    }
    if (!window.Sentry) return
    const { db } = await import('@/services/firebase')
    const { doc, getDoc } = await import('firebase/firestore')
    const snap = await getDoc(doc(db, 'settings', 'general'))
    const dsn = snap.exists() ? (snap.data()?.sentryDsn || '') : ''
    if (!dsn) return
    window.Sentry.init({
      dsn,
      tracesSampleRate: 0.1,
      release: 'portal-mu@91.0626',
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
