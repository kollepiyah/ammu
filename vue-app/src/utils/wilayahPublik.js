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
  // v.1.5.5: admin kini memilih sendiri lewat centang "Tampilkan di publik" (kolom `publik`).
  //   Aturan lama di bawah = bawaan untuk agenda yang belum punya pilihan itu.
  if (typeof k?.publik === 'boolean') return k.publik
  return publikBawaan(k)
}

/** Nilai awal "Tampilkan di publik": untuk semua, dan bukan agenda khusus lembaga (libur selalu).
 *  CERMIN isi awal migrasi 20261125150000_kegiatan_publik.sql — ubah keduanya bersama. */
export function publikBawaan(k) {
  if ((k?.audience || 'semua') !== 'semua') return false
  if ((k?.tipe || 'kegiatan') !== 'kegiatan') return true
  return !(Array.isArray(k?.lembaga) && k.lembaga.some((x) => String(x || '').trim()))
}

let _cache = null
export function pakaiWilayahPublik() {
  if (_cache === null) _cache = deteksi()
  return _cache
}
