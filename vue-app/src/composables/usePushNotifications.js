// v.95.0626: FCM Push Notifications (Capacitor) — registrasi + simpan fcm_token ke doc user,
//   handle notif diterima (foreground) & di-tap (navigasi). Akses plugin via
//   window.Capacitor.Plugins.PushNotifications (auto-register native; AMAN di web/desktop = no-op).
//   Token disimpan ke santri/{id}.fcm_token (role santri) atau guru/{id}.fcm_token (guru/admin).
//   Server (functions kirimNotifikasiMassal) yang resolve token dari `target` & kirim.
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging'
import { db, firebaseApp } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'

const CHANNEL_ID = 'ammu_default'
// v.95.0626: VAPID public key (Firebase Console > Cloud Messaging > Web Push certificates)
const VAPID_KEY = 'BFcAMob-CjQqT2pIK7T9O89Qzm7C_7hDdBuIgw-HsdWO4N-YcbK4rvGkKZvTvyOkUa1DprmE6KabIIn7DMY0VEI'

function isElectron() {
  return /electron/i.test((typeof navigator !== 'undefined' && navigator.userAgent) || '')
}

function pushPlugin() {
  return (typeof window !== 'undefined' && window.Capacitor?.Plugins?.PushNotifications) || null
}
function localNotifPlugin() {
  return (typeof window !== 'undefined' && window.Capacitor?.Plugins?.LocalNotifications) || null
}
function isNative() {
  return !!(typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.())
}

let _wired = false

export function usePushNotifications() {
  const auth = useAuthStore()

  // collection + id doc tempat simpan token (admin built-in 'admin' di-skip — tak punya doc)
  function targetDoc() {
    const s = auth.sesiAktif
    if (!s || !s.id || String(s.id) === 'admin') return null
    const coll = s.role === 'santri' ? 'santri' : 'guru'
    return { coll, id: String(s.id) }
  }

  async function saveToken(token) {
    const t = String(token || '').trim()
    const td = targetDoc()
    if (!t || !td) return
    try {
      await setDoc(
        doc(db, td.coll, td.id),
        { fcm_token: t, fcm_token_at: serverTimestamp() },
        { merge: true }
      )
    } catch (e) {
      console.warn('[push] saveToken gagal:', e?.message || e)
    }
  }

  async function clearToken() {
    const td = targetDoc()
    if (!td) return
    try {
      await setDoc(doc(db, td.coll, td.id), { fcm_token: null }, { merge: true })
    } catch (e) {
      /* ignore */
    }
  }

  // WEB push (PWA/browser) via firebase/messaging + VAPID. SW: /firebase-messaging-sw.js
  async function registerWeb() {
    try {
      if (isElectron()) return // desktop Electron: tak ada web push
      if (!(typeof window !== 'undefined' && 'Notification' in window)) return
      if (!(await isSupported().catch(() => false))) return
      let perm = Notification.permission
      if (perm === 'default') perm = await Notification.requestPermission()
      if (perm !== 'granted') return
      const messaging = getMessaging(firebaseApp)
      const token = await getToken(messaging, { vapidKey: VAPID_KEY })
      if (token) await saveToken(token)
      onMessage(messaging, (payload) => {
        const n = (payload && payload.notification) || {}
        try {
          // eslint-disable-next-line no-new
          new Notification(n.title || 'Mambaul Ulum', { body: n.body || '', icon: '/icon-192.png' })
        } catch (e) {
          /* ignore */
        }
      })
    } catch (e) {
      console.warn('[push-web] gagal:', e?.message || e)
    }
  }

  // Daftarkan device ke FCM + pasang listener. Native (Capacitor) ATAU Web (PWA). Idempotent.
  async function register() {
    const p = pushPlugin()
    if (!isNative()) {
      await registerWeb()
      return
    }
    if (!p) return
    try {
      let perm = await p.checkPermissions()
      if (perm.receive === 'prompt' || perm.receive === 'prompt-with-rationale') {
        perm = await p.requestPermissions()
      }
      if (perm.receive !== 'granted') return

      // Channel default (Android 8+). importance 5 = HIGH, visibility 1 = PUBLIC.
      try {
        await p.createChannel?.({
          id: CHANNEL_ID,
          name: 'Notifikasi Ammu',
          description: 'Pengumuman & event penting',
          importance: 5,
          visibility: 1
        })
      } catch (e) {
        /* channel opsional */
      }

      if (!_wired) {
        _wired = true
        // FCM token (Android: nilai = FCM registration token)
        p.addListener('registration', (tok) => saveToken(tok?.value))
        p.addListener('registrationError', (err) =>
          console.warn('[push] registrationError:', err?.error || err)
        )
        // Foreground: app aktif -> munculkan di status bar via LocalNotifications
        p.addListener('pushNotificationReceived', (notif) => {
          try {
            const ln = localNotifPlugin()
            ln?.schedule?.({
              notifications: [
                {
                  id: Date.now() % 2147483000,
                  title: notif?.title || 'Mambaul Ulum',
                  body: notif?.body || '',
                  channelId: CHANNEL_ID
                }
              ]
            })
          } catch (e) {
            /* ignore */
          }
        })
        // Di-tap: navigasi ke link (router hash mode)
        p.addListener('pushNotificationActionPerformed', (action) => {
          const link = action?.notification?.data?.link
          if (link && typeof window !== 'undefined') {
            try {
              window.location.hash = String(link).startsWith('#') ? link : '#' + link
            } catch (e) {
              /* ignore */
            }
          }
        })
      }

      await p.register()
    } catch (e) {
      console.warn('[push] register gagal:', e?.message || e)
    }
  }

  return { register, clearToken, saveToken, isNative }
}
