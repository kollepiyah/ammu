// ====================================================================
// FIREBASE MESSAGING SERVICE WORKER
// File ini WAJIB ditaruh di ROOT website (sejajar dengan index.html)
// Path: /firebase-messaging-sw.js
// ====================================================================

importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyBdZexExhs-vCnAOXRK6DSj4uUUTMGWlEE',
  authDomain: 'portal-mambaul-ulum.firebaseapp.com',
  projectId: 'portal-mambaul-ulum',
  storageBucket: 'portal-mambaul-ulum.firebasestorage.app',
  messagingSenderId: '289365012301',
  appId: '1:289365012301:web:c5b2655559043783221104'
})

const messaging = firebase.messaging()

// Handler notifikasi saat app di background
messaging.onBackgroundMessage((payload) => {
  const notif = payload.notification || {}
  const data = payload.data || {}
  const title = notif.title || data.title || 'Mambaul Ulum'
  const options = {
    body: notif.body || data.body || '',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    tag: data.tag || 'mambaul-ulum-notif',
    renotify: true,
    requireInteraction: false,
    data: data,
    vibrate: [200, 100, 200]
  }
  return self.registration.showNotification(title, options)
})

// Handler klik notifikasi: buka tab aplikasi
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url =
    event.notification.data && event.notification.data.url ? event.notification.data.url : '/'
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) return clients.openWindow(url)
    })
  )
})
