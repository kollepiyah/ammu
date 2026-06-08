// useDesktopShell — apakah app berjalan di Electron Desktop.
// Ribbon shell HANYA aktif di Electron (keputusan kyai: "Electron saja").
// Browser desktop biasa + Capacitor (HP/PWA) tetap pakai shell lama (AppLayout).
import { ref } from 'vue'

function detectElectron() {
  try {
    // 1) bridge preload (paling andal) — window.electronAPI.isElectron = true
    if (typeof window !== 'undefined' && window.electronAPI?.isElectron) return true
    // 2) userAgent mengandung 'Electron'
    if (typeof navigator !== 'undefined' && /Electron/i.test(navigator.userAgent || '')) return true
    // 3) di-load via file:// (production Electron loadFile) DAN bukan Capacitor
    if (
      typeof location !== 'undefined' &&
      location.protocol === 'file:' &&
      !(typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.())
    ) {
      return true
    }
  } catch (e) {
    /* ignore */
  }
  return false
}

// Singleton — dihitung sekali (status Electron tidak berubah saat runtime).
const _isElectron = ref(detectElectron())

export function useDesktopShell() {
  return {
    isElectron: _isElectron,
    // alias semantik untuk template AppShell
    useRibbon: _isElectron
  }
}
