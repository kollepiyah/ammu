// ====================================================================
// PWA SERVICE WORKER — Mambaul Ulum
// Tujuan: cache shell aplikasi untuk speed up loading
// Path deploy: /sw.js (sejajar dengan index.html)
// ====================================================================

// Bump versi setiap deploy update besar supaya cache di-refresh
const SW_VERSION = 'v9-0526-1';
const CACHE_SHELL = `mu-shell-${SW_VERSION}`;
const CACHE_RUNTIME = `mu-runtime-${SW_VERSION}`;

// Files yang di-cache saat install (shell aplikasi)
const SHELL_URLS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/logo.png',
    '/favicon.ico',
    '/favicon-32.png',
    '/favicon-192.png',
    '/icon-192.png',
    '/icon-512.png',
    '/apple-touch-icon-180.png'
];

// CDN domains yang cache-first (jarang berubah)
const CACHE_FIRST_DOMAINS = [
    'cdn.tailwindcss.com',
    'cdnjs.cloudflare.com',
    'cdn.jsdelivr.net',
    'fonts.googleapis.com',
    'fonts.gstatic.com'
];

// Domain network-first (data dinamis)
const NETWORK_FIRST_DOMAINS = [
    'firestore.googleapis.com',
    'firebasestorage.googleapis.com',
    'identitytoolkit.googleapis.com',
    'cloudfunctions.net'
];

// === INSTALL: cache shell ===
self.addEventListener('install', (event) => {
    console.log(`[SW ${SW_VERSION}] Installing...`);
    event.waitUntil(
        caches.open(CACHE_SHELL).then((cache) => {
            // addAll() akan reject kalau salah satu file gagal — pakai loop tolerant
            return Promise.all(
                SHELL_URLS.map(url =>
                    cache.add(url).catch(err => console.warn(`[SW] Skip ${url}:`, err.message))
                )
            );
        }).then(() => {
            console.log(`[SW ${SW_VERSION}] Shell cached`);
            // TIDAK skipWaiting — biar update dipakai saat user buka berikutnya
        })
    );
});

// === ACTIVATE: hapus cache lama ===
self.addEventListener('activate', (event) => {
    console.log(`[SW ${SW_VERSION}] Activating...`);
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter(key => key.startsWith('mu-') && !key.endsWith(SW_VERSION))
                    .map(key => {
                        console.log(`[SW] Hapus cache lama: ${key}`);
                        return caches.delete(key);
                    })
            );
        }).then(() => self.clients.claim()) // ambil alih semua tab
    );
});

// === FETCH: routing strategy ===
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET (POST, PUT, dll harus selalu network)
    if (request.method !== 'GET') return;
    
    // Skip Firebase data — selalu network (jangan stale data)
    if (NETWORK_FIRST_DOMAINS.some(d => url.hostname.includes(d))) {
        return; // browser default network behavior
    }
    
    // Cache-first untuk CDN libraries
    if (CACHE_FIRST_DOMAINS.some(d => url.hostname.includes(d))) {
        event.respondWith(cacheFirst(request));
        return;
    }
    
    // Cache-first untuk same-origin shell + assets
    if (url.origin === self.location.origin) {
        // HTML: network-first (supaya update versi cepat ter-detect)
        if (request.mode === 'navigate' || request.destination === 'document') {
            event.respondWith(networkFirst(request));
            return;
        }
        // Static assets (CSS, JS, images, fonts) di same-origin: cache-first
        event.respondWith(cacheFirst(request));
        return;
    }
    
    // Default: network with cache fallback
    event.respondWith(networkFirst(request));
});

// === STRATEGI 1: Cache-first ===
// Cek cache dulu, kalau ada langsung return. Kalau tidak, fetch lalu cache.
async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;
    
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(CACHE_RUNTIME);
            cache.put(request, response.clone());
        }
        return response;
    } catch (err) {
        // Offline fallback
        console.warn('[SW] cache-first fetch fail:', request.url);
        return cached || new Response('Offline', { status: 503 });
    }
}

// === STRATEGI 2: Network-first ===
// Coba network dulu, kalau gagal pakai cache.
async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(CACHE_RUNTIME);
            cache.put(request, response.clone());
        }
        return response;
    } catch (err) {
        const cached = await caches.match(request);
        if (cached) {
            console.log('[SW] Offline, serve from cache:', request.url);
            return cached;
        }
        return new Response('Offline', { status: 503 });
    }
}

// === MESSAGE: skip waiting trigger dari client ===
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
