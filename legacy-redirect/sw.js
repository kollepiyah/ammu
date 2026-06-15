/* Self-destruct service worker — pengganti /sw.js app legacy.
 * Saat browser cek-update SW (periodik / saat navigasi), versi ini menggantikan SW
 * cache lama: hapus semua cache, unregister diri, lalu reload tab supaya ambil
 * halaman redirect terbaru. Mematikan app legacy yang masih nyangkut di PWA penguji. */
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys()
        await Promise.all(keys.map((k) => caches.delete(k)))
      } catch (e) {
        /* abaikan */
      }
      try {
        await self.registration.unregister()
      } catch (e) {
        /* abaikan */
      }
      try {
        const clients = await self.clients.matchAll({ type: 'window' })
        clients.forEach((c) => c.navigate(c.url))
      } catch (e) {
        /* abaikan */
      }
    })()
  )
})

// Jangan pernah layani dari cache — selalu lewat ke jaringan (halaman redirect).
self.addEventListener('fetch', () => {})
