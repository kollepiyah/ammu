// Wilayah publik (Beranda tanpa login, baris ikon ibadah di dashboard) hanya untuk Android
// & PWA terpasang — keputusan Kyai 25 Nov 2026. Web biasa & Electron tetap langsung Portal.
// SATU sumber penentu; komponen lain cukup memanggil pakaiWilayahPublik().
import { forcedShell } from '@/utils/shellOverride'

/** Aturan murni (dites). `paksa` = override dev ?shell=mobile|desktop. */
export function nilaiWilayahPublik({ isNative, isStandalone, isElectron, paksa } = {}) {
  if (paksa === 'mobile') return true
  if (paksa === 'desktop') return false
  if (isElectron) return false
  return !!(isNative || isStandalone)
}

function deteksi() {
  try {
    const C = window.Capacitor
    const isNative =
      !!C && (typeof C.isNativePlatform === 'function' ? C.isNativePlatform() : !!C.isNative)
    const isStandalone =
      window.matchMedia?.('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    const isElectron =
      !!window.electronAPI?.isElectron || /Electron/i.test(navigator.userAgent || '')
    return nilaiWilayahPublik({ isNative, isStandalone, isElectron, paksa: forcedShell })
  } catch {
    return false
  }
}

/** Tamu hanya melihat agenda untuk "semua" tanpa batasan lembaga; libur tetap tampil. */
export function kegiatanUntukTamu(k) {
  if ((k?.audience || 'semua') !== 'semua') return false
  if ((k?.tipe || 'kegiatan') !== 'kegiatan') return true
  return !(Array.isArray(k?.lembaga) && k.lembaga.some((x) => String(x || '').trim()))
}

let _cache = null
export function pakaiWilayahPublik() {
  if (_cache === null) _cache = deteksi()
  return _cache
}
