// v.75.0526 — useLocalNotif
//
// Wrapper Capacitor LocalNotifications untuk trigger native notifikasi di status bar.
// Akses plugin via window.Capacitor.Plugins.LocalNotifications (auto-register oleh Capacitor)
// supaya tidak butuh import package — build web tetap OK tanpa plugin installed.

function getPlugin() {
  try {
    return window.Capacitor?.Plugins?.LocalNotifications || null
  } catch { return null }
}

function isNative() {
  try { return !!(window.Capacitor?.isNativePlatform?.()) } catch { return false }
}

let _granted = false
let _seenIds = new Set()

export async function requestPermission() {
  const plugin = getPlugin()
  if (!plugin || !isNative()) return false
  try {
    const status = await plugin.checkPermissions()
    if (status.display === 'granted') {
      _granted = true
      return true
    }
    const req = await plugin.requestPermissions()
    _granted = req.display === 'granted'
    return _granted
  } catch (e) {
    console.warn('[useLocalNotif] permission gagal:', e?.message || e)
    return false
  }
}

export async function showLocal(opts) {
  const plugin = getPlugin()
  if (!plugin || !_granted) return
  try {
    const id = Number(opts.id) || Math.floor(Math.random() * 1e6)
    await plugin.schedule({
      notifications: [{
        id,
        title: String(opts.title || 'Ammu Online'),
        body: String(opts.body || ''),
        smallIcon: 'ic_stat_icon',
        largeIcon: 'ic_launcher',
        iconColor: '#0F766E',
        autoCancel: true,
        ongoing: false,
        extra: { link: opts.link || '' }
      }]
    })
  } catch (e) {
    console.warn('[useLocalNotif] schedule gagal:', e?.message || e)
  }
}

export async function listenForNotificationAction(routerInstance) {
  const plugin = getPlugin()
  if (!plugin) return
  try {
    await plugin.addListener('localNotificationActionPerformed', (action) => {
      const link = action?.notification?.extra?.link
      if (link && routerInstance) {
        try { routerInstance.push(link) } catch { /* ignore */ }
      }
    })
  } catch (e) {
    console.warn('[useLocalNotif] addListener gagal:', e?.message || e)
  }
}

export async function setupLocalNotif(routerInstance) {
  if (!isNative()) return
  const granted = await requestPermission()
  if (granted) {
    await listenForNotificationAction(routerInstance)
  }
}

export async function pushFromItems(items) {
  if (!_granted || !Array.isArray(items)) return
  if (_seenIds.size === 0) {
    items.forEach((it) => _seenIds.add(`${it.id}-${it.jenis}`))
    return
  }
  const newItems = items.filter((it) => !_seenIds.has(`${it.id}-${it.jenis}`))
  for (const it of newItems) {
    _seenIds.add(`${it.id}-${it.jenis}`)
    await showLocal({
      id: Math.abs(hashCode(it.id + it.jenis)) % 1e6,
      title: it.judul || 'Ammu Online',
      body: it.body || '',
      link: it.link || ''
    })
  }
  if (_seenIds.size > 200) {
    const arr = Array.from(_seenIds)
    _seenIds = new Set(arr.slice(arr.length - 200))
  }
}

function hashCode(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i)
    h |= 0
  }
  return h
}

export default {
  requestPermission,
  showLocal,
  listenForNotificationAction,
  setupLocalNotif,
  pushFromItems
}
