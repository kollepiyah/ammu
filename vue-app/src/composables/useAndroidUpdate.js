// useAndroidUpdate — pemberitahuan pembaruan IN-APP untuk aplikasi ANDROID.
//
// Kenapa ada (Kyai, 5 Agu 2026): "di web ada tautan link download android (apk). jika
// ada update baru, supaya tidak nunggu lama dari playstore ... bisa langsung ada notif
// unduh pembaruan untuk android (seperti di electron)". Peninjauan Play memakan waktu
// berhari-hari, sedang perbaikan yang Kyai minta sering perlu sampai hari itu juga.
//
// ALUR: baca /app-version.json (ikut ter-deploy bersama web, jadi selalu seusia web yang
// tayang) -> bandingkan versionCode di situ dengan versionCode aplikasi ini
// (@capacitor/app) -> kalau lebih besar, tawarkan unduh APK. Yang dibuka adalah URL APK
// di browser sistem; pemasangannya tetap di tangan pengguna (Android meminta izin
// "Instal aplikasi tak dikenal" — itu memang gerbang keamanan OS, bukan bug).
//
// BUKAN auto-update seperti Electron: Android tak mengizinkan aplikasi non-sistem
// memasang APK tanpa persetujuan pengguna. Yang bisa dihilangkan cuma penantiannya.
//
// SYARAT APK-nya (penting): apkUrl HARUS "Signed, universal APK" hasil unduhan dari Play
// Console (App bundle explorer). APK build lokal ditandatangani kunci berbeda dari kunci
// Play, jadi tak bisa memasang menimpa aplikasi dari Play ("App not installed").
import { useUiStore } from '@/stores/ui'

const SUMBER = '/app-version.json'
// Ditanya sekali per versi. Kalau pengguna memilih "Nanti", jangan diganggu lagi untuk
// versi ITU — tapi versi berikutnya tetap ditawarkan.
const KUNCI_TOLAK = 'ammu_lewati_versi_android'

/**
 * Keputusan murni: perlu menawarkan pembaruan atau tidak?
 *   'belum-siap' — app-version.json belum berisi versionCode/apkUrl yang sah
 *   'terbaru'    — versi terpasang sama atau lebih baru
 *   'dilewati'   — versi ini pernah ditolak pengguna (hanya berlaku pada cek OTOMATIS)
 *   'tawarkan'   — tampilkan dialog unduh
 *
 * Dipisah dari `cek()` supaya bisa diuji tanpa Capacitor/fetch/pinia: di sinilah
 * kesalahan paling mahal bersembunyi — salah arah perbandingan = notifikasi muncul
 * terus-terusan (atau tak pernah muncul), dan dua-duanya baru terasa setelah rilis.
 */
export function putusanPembaruan({ kiniCode = 0, baru = {}, dilewatiCode = null, manual = false }) {
  const kode = Number(baru.versionCode ?? baru.code ?? 0)
  if (!kode || !baru.apkUrl) return 'belum-siap'
  if (kode <= Number(kiniCode || 0)) return 'terbaru'
  // Pemeriksaan manual selalu menawarkan: pengguna memang sengaja menekan tombolnya.
  // Pembaruan `wajib` juga tak bisa dibungkam.
  if (!manual && !baru.wajib && dilewatiCode != null && String(dilewatiCode) === String(kode))
    return 'dilewati'
  return 'tawarkan'
}

function nativeAndroid() {
  try {
    const C = window.Capacitor
    if (!C) return false
    const native = typeof C.isNativePlatform === 'function' ? C.isNativePlatform() : !!C.isNative
    if (!native) return false
    const plat = typeof C.getPlatform === 'function' ? C.getPlatform() : ''
    return plat === 'android'
  } catch {
    return false
  }
}

async function versiTerpasang() {
  const { App } = await import('@capacitor/app')
  const info = await App.getInfo()
  return {
    // `build` = versionCode (angka dalam bentuk string di Android).
    code: Number(info?.build || 0),
    name: String(info?.version || '')
  }
}

async function versiTerbaru() {
  // cache-bust: tanpa ini WebView bisa menyajikan salinan lama dari cache HTTP/SW dan
  // pembaruan tak pernah terlihat.
  const url = `${SUMBER}?t=${Date.now()}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`app-version.json: HTTP ${res.status}`)
  const j = await res.json()
  const a = j?.android || {}
  return {
    code: Number(a.versionCode || 0),
    name: String(a.versionName || ''),
    apkUrl: String(a.apkUrl || ''),
    halamanRilis: String(a.halamanRilis || ''),
    wajib: !!a.wajib,
    catatan: String(a.catatan || '')
  }
}

function bukaDiLuar(url) {
  // Capacitor meneruskan URL non-app ke browser sistem, jadi unduhan tak terjebak di
  // dalam WebView (yang tak punya UI unduhan).
  try {
    window.open(url, '_blank')
  } catch {
    window.location.href = url
  }
}

export function useAndroidUpdate() {
  const ui = useUiStore()

  /** Tersedia hanya di aplikasi Android. */
  function tersedia() {
    return nativeAndroid()
  }

  /**
   * Periksa pembaruan.
   * @param {boolean} manual true = dipicu pengguna (selalu beri kabar, termasuk
   *   "sudah terbaru" dan versi yang pernah dilewati). false = otomatis saat app
   *   dibuka: diam kalau tak ada apa-apa, dan hormati pilihan "Nanti".
   */
  async function cek(manual = false) {
    if (!tersedia()) {
      if (manual) ui.toast.info('Cek pembaruan APK hanya tersedia di aplikasi Android')
      return { status: 'tak-berlaku' }
    }
    let kini, baru
    try {
      ;[kini, baru] = await Promise.all([versiTerpasang(), versiTerbaru()])
    } catch (e) {
      if (manual) ui.toast.error('Gagal memeriksa pembaruan: ' + (e?.message || e))
      return { status: 'galat', error: String(e?.message || e) }
    }
    let dilewatiCode = null
    try {
      dilewatiCode = localStorage.getItem(KUNCI_TOLAK)
    } catch {
      /* localStorage bisa diblok — anggap belum pernah dilewati */
    }
    const putusan = putusanPembaruan({ kiniCode: kini.code, baru, dilewatiCode, manual })
    if (putusan === 'belum-siap') {
      if (manual) ui.toast.info('Belum ada berkas pembaruan yang disiapkan')
      return { status: 'belum-siap' }
    }
    if (putusan === 'terbaru') {
      if (manual) ui.toast.success(`Aplikasi sudah versi terbaru (${kini.name || kini.code})`)
      return { status: 'terbaru', kini, baru }
    }
    if (putusan === 'dilewati') return { status: 'dilewati', kini, baru }
    const ok = await ui.confirm({
      title: 'Pembaruan tersedia',
      message:
        `Versi ${baru.name || baru.code} sudah bisa dipasang` +
        (baru.catatan ? `.\n${baru.catatan}` : '.') +
        '\n\nBerkas akan diunduh lewat peramban. Setelah selesai, buka berkasnya untuk memasang.',
      confirmText: 'Unduh',
      cancelText: baru.wajib ? 'Nanti' : 'Lewati versi ini',
      danger: false
    })
    if (ok) {
      bukaDiLuar(baru.apkUrl)
      return { status: 'diunduh', kini, baru }
    }
    if (!baru.wajib) {
      try {
        localStorage.setItem(KUNCI_TOLAK, String(baru.code))
      } catch {
        /* diabaikan */
      }
    }
    return { status: 'ditunda', kini, baru }
  }

  /** Cek otomatis saat app dibuka — sengaja ditunda supaya tak berebut dengan boot. */
  function cekOtomatis(jedaMs = 6000) {
    if (!tersedia()) return
    setTimeout(() => {
      cek(false).catch(() => {
        /* diam: cek otomatis tak boleh mengganggu */
      })
    }, jedaMs)
  }

  return { tersedia, cek, cekOtomatis }
}
