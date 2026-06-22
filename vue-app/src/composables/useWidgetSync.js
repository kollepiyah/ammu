// v.94.0626 — Jembatan ke widget home screen Android (Hijri + Kalender).
//
// Mengirim nilai yang SAMA dengan kartu beranda ke native (plugin WidgetBridge),
// disimpan ke SharedPreferences "ammu_widget" lalu widget di-refresh.
// Aman dipanggil di web/Electron (no-op kalau bukan Android native).
import { Capacitor, registerPlugin } from '@capacitor/core'

let _bridge = null
function bridge() {
  if (_bridge) return _bridge
  try {
    _bridge = registerPlugin('WidgetBridge')
  } catch (e) {
    _bridge = null
  }
  return _bridge
}

export function isNativeAndroid() {
  try {
    return !!Capacitor?.isNativePlatform?.() && Capacitor.getPlatform() === 'android'
  } catch (e) {
    return false
  }
}

/**
 * Kirim data ke widget. Hanya field yang disertakan yang ditimpa.
 * @param {{hijri?:string, hijriKey?:string, kalibrasi?:string, events?:string}} data
 */
export function pushWidgetData(data) {
  try {
    if (!isNativeAndroid()) return
    const b = bridge()
    if (b && typeof b.update === 'function') {
      b.update(data).catch(() => {})
    }
  } catch (e) {
    /* ignore */
  }
}
