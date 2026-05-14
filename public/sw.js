// ====================================================================
// PWA SERVICE WORKER — Mambaul Ulum
// Tujuan: cache shell aplikasi untuk speed up loading
// Path deploy: /sw.js (sejajar dengan index.html)
// ====================================================================

// Bump versi setiap deploy update besar supaya cache di-refresh
const SW_VERSION = 'v263-0514-dashboard-count'
const CACHE_SHELL = `mu-shell-${SW_VERSION}`
const CACHE_RUNTIME = `mu-runtime-${SW_VERSION}`

const SHELL_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/exceljs.min.js',
  '/bg-pesantren.jpg',
  '/manifest.json',
  '/logo.png',
  '/favicon.ico',
  '/favicon-32.png',
  '/favicon-192.png',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon-180.png'
]

const CACHE_FIRST_DOMAINS = [
  'cdnjs.cloudflare.com',
  'cdn.jsdelivr.net',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
]

const NETWORK_FIRST_DOMAINS = [
  'firestore.googleapis.com',
  'firebasestorage.googleapis.com',
  'identitytoolkit.googleapis.com',
  'cloudfunctions.net'
]

self.addEventListener('install', (event) => {
  console.log(`[SW ${SW_VERSION}] Installing...`)
  event.waitUntil(
    caches
      .open(CACHE_SHELL)
      .then((cache) => {
        return Promise.all(
          SHELL_URLS.map((url) =>
            cache.add(url).catch((err) => console.warn(`[SW] Skip ${url}:`, err.message))
          )
        )
      })
      .then(() => {
        console.log(`[SW ${SW_VERSION}] Shell cached — skipWaiting() activated`)
        return self.skipWaiting()
      })
  )
})

self.addEventListener('activate', (event) => {
  console.log(`[SW ${SW_VERSION}] Activating...`)
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key.startsWith('mu-') && !key.endsWith(SW_VERSION))
            .map((key) => {
              console.log(`[SW] Hapus cache lama: ${key}`)
              return caches.delete(key)
            })
        )
      })
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== 'GET') return

  if (NETWORK_FIRST_DOMAINS.some((d) => url.hostname.includes(d))) {
    return
  }

  if (CACHE_FIRST_DOMAINS.some((d) => url.hostname.includes(d))) {
    event.respondWith(cacheFirst(request))
    return
  }

  if (url.origin === self.location.origin) {
    if (request.mode === 'navigate' || request.destination === 'document') {
      event.respondWith(networkFirst(request))
      return
    }
    event.respondWith(cacheFirst(request))
    return
  }

  event.respondWith(networkFirst(request))
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(CACHE_RUNTIME)
      cache.put(request, response.clone())
    }
    return response
  } catch (err) {
    console.warn('[SW] cache-first fetch fail:', request.url)
    return cached || new Response('Offline', { status: 503 })
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(CACHE_RUNTIME)
      cache.put(request, response.clone())
    }
    return response
  } catch (err) {
    const cached = await caches.match(request)
    if (cached) {
      console.log('[SW] Offline, serve from cache:', request.url)
      return cached
    }
    return new Response('Offline', { status: 503 })
  }
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
