/* v.95.0626: Firebase Cloud Messaging service worker — WEB PUSH (PWA/browser).
   Menangani notifikasi saat tab tertutup/background. Wajib di root: /firebase-messaging-sw.js */
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyBdZexExhs-vCnAOXRK6DSj4uUUTMGWlEE',
  authDomain: 'portal-mambaul-ulum.firebaseapp.com',
  projectId: 'portal-mambaul-ulum',
  storageBucket: 'portal-mambaul-ulum.firebasestorage.app',
  messagingSenderId: '289365012301',
  appId: '1:289365012301:web:c5b2655559043783221104'
})

const messaging = firebase.messaging()

// Notifikasi saat app/tab di background
messaging.onBackgroundMessage((payload) => {
  const n = (payload && payload.notification) || {}
  const data = (payload && payload.data) || {}
  self.registration.showNotification(n.title || 'Mambaul Ulum', {
    body: n.body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data
  })
})

// Klik notifikasi -> buka app ke link (router hash mode)
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const link = (event.notification.data && event.notification.data.link) || '/'
  const url = '/#' + (String(link).startsWith('#') ? String(link).slice(1) : link)
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ('focus' in c) {
          try { c.navigate(url) } catch (e) {}
          return c.focus()
        }
      }
      return self.clients.openWindow(url)
    })
  )
})
