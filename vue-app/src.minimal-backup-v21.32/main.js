// Bootstrap Vue 3 SPA
// v.20.0526: Import Tailwind CSS entry — auto-bundle ke dist/assets/index-*.css
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useUiStore } from './stores/ui'
// v.21.24.0526: STATIC import auth store — fix race condition dengan router guard.
// Sebelumnya `import('@/stores/auth').then(...)` async → router beforeEach jalan duluan saat mount,
// `auth.authReady` undefined → skip await → redirect /login walaupun localStorage masih ada sesi.
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Init dark mode dari storage SEBELUM mount supaya tidak flash
const ui = useUiStore(pinia)
ui.initDarkFromStorage()

// v.21.24.0526: Init auth SEBELUM mount supaya authReady promise tersedia di router guard
const auth = useAuthStore(pinia)
auth.initAuth()

// v.21.24c.0526: STATIC import settings — fix race dengan view init.
// Sebelumnya dynamic import → kalau view duluan instantiate store sebelum subscribe attached,
// edit setting tidak sinkron.
import { useSettingsStore } from './stores/settings'
const settingsStore = useSettingsStore(pinia)
settingsStore
  .load()
  .then(() => settingsStore.subscribe())
  .catch(() => {})

// v.20.4.0526: Defensive mount + splash auto-hide
// Capacitor WebView kadang lebih ketat → kalau mount error, splash never hide → stuck
// Strategy: try mount, log error, dan SELALU hide splash setelah 1.5s
function hideSplash() {
  const splash = document.getElementById('splash-screen')
  if (splash && !splash.classList.contains('fade-out')) {
    splash.classList.add('fade-out')
    setTimeout(() => {
      document.body.classList.add('app-running')
    }, 600) // wait fade-out CSS transition
  } else if (!document.body.classList.contains('app-running')) {
    document.body.classList.add('app-running')
  }
}

try {
  app.mount('#app')
} catch (mountErr) {
  // Capture mount error supaya splash tetap hide + user lihat blank page (better than stuck)
  // eslint-disable-next-line no-console
  console.error('[main.js] Vue app.mount FAIL:', mountErr)
}

// Splash min duration 1200ms supaya animasi logo sempat selesai (avoid flash)
const SPLASH_MIN_MS = 1200
const splashStart = performance.now()
requestAnimationFrame(() => {
  const elapsed = performance.now() - splashStart
  const remaining = Math.max(0, SPLASH_MIN_MS - elapsed)
  setTimeout(hideSplash, remaining)
})

// FALLBACK: kalau ada apa-apa yg block (Vue mount fail silently, async route load stuck),
// force-hide splash max 5 detik. Better blank page daripada stuck di splash.
setTimeout(() => {
  if (!document.body.classList.contains('app-running')) {
    // eslint-disable-next-line no-console
    console.warn('[main.js] Splash fallback hide @ 5s — Vue mount mungkin stuck')
    hideSplash()
  }
}, 5000)

// v.20.70.0526: Init Sentry kalau tersedia + DSN dari settings/general.sentryDsn
// Lazy init — wait Sentry CDN + Firestore settings load
async function initSentry() {
  try {
    // Wait for Sentry SDK
    const t0 = Date.now()
    while (!window.Sentry && Date.now() - t0 < 3000) {
      await new Promise((r) => setTimeout(r, 100))
    }
    if (!window.Sentry) return
    // Load DSN from Firestore settings/general
    const { db } = await import('@/services/firebase')
    const { doc, getDoc } = await import('firebase/firestore')
    const snap = await getDoc(doc(db, 'settings', 'general'))
    const dsn = snap.exists() ? snap.data()?.sentryDsn || '' : ''
    if (!dsn) return // tidak di-configure
    window.Sentry.init({
      dsn,
      tracesSampleRate: 0.1,
      release: 'portal-mu@20.70.0526',
      environment: window.location.hostname.includes('localhost') ? 'dev' : 'prod'
    })
    // eslint-disable-next-line no-console
    console.log('[main.js] Sentry initialized')
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[main.js] Sentry init skipped:', e.message)
  }
}
// Fire & forget
initSentry()
