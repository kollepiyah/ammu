// v.1.2.9 — URL berkas rilis (GitHub Releases). Sumber tunggal, murni & teruji.
//
// LAPORAN KYAI (6 Agu 2026): tombol unduh Desktop di layar login membuka halaman
//   GitHub 404.
//
// AKAR: `8d8acbe` SENGAJA menambahkan `${version}` ke `nsis.artifactName`
//   (nama berkas yang sama untuk semua versi membuat cache updater & blockmap
//   differential rilis sebelumnya bertabrakan). Nama aset berubah jadi
//   `AmmuOnline-Setup-1.2.8.exe`, tapi URL di LoginView masih menunjuk
//   `AmmuOnline-Setup.exe` yang sejak itu tak pernah ada lagi.
//
//   Ironisnya justru inilah jalan keluar yang dijanjikan commit itu sendiri:
//   tiap PC perlu SATU KALI pasang manual sesudah `publisherName` dibuang
//   ([[gotcha_electron_publishername]]) — dan pintu itulah yang mati.
//
// ⚠️ NAMA BERKAS DI SINI TERIKAT pada `vue-app/electron/package.json`:
//   - Windows 10/11 : `build.nsis.artifactName`
//   - Windows 7     : argumen `--config.nsis.artifactName` di skrip
//                     `electron:make:win7` / `electron:publish:win7`
//   Kalau salah satu diubah, `tests/unit/unduhanRilis.test.js` GAGAL — itu memang
//   tujuannya. Jangan diselaraskan dengan menumpulkan tesnya; perbarui fungsi di
//   bawah supaya cocok lagi.
//
// Kenapa versi ikut di URL, bukan sekadar menunjuk halaman rilis: menu Kyai punya
//   dua pilihan berbeda (Windows 10/11 vs Windows 7) dan keduanya harus sekali klik.
//   Kalau versinya belum dirilis di GitHub, pemanggil WAJIB punya cadangan
//   `HALAMAN_RILIS` — dan setelan `downloadDesktop`/`downloadDesktopWin7` di
//   Pengaturan Web tetap menang, jadi Kyai bisa membetulkan tanpa rilis ulang.

const REPO = 'https://github.com/kollepiyah/ammu'

/** Halaman rilis terbaru — SELALU sah, dipakai sebagai cadangan terakhir. */
export const HALAMAN_RILIS = `${REPO}/releases/latest`

/** Buang awalan gaya tampilan ('v.1.2.8' / 'v1.2.8') -> '1.2.8'. '' kalau tak masuk akal. */
function normalVersi(versi) {
  const v = String(versi ?? '')
    .trim()
    .replace(/^v\.?/i, '')
  return /^\d+\.\d+\.\d+$/.test(v) ? v : ''
}

function unduhanRilis(namaBerkas) {
  return `${REPO}/releases/latest/download/${namaBerkas}`
}

// v.1.4.0 (Kyai, 3 Sep 2026): "matikan notif pembaruan untuk android, cukup update via
//   playstore saja." Sejak itu Play Store adalah SATU-SATUNYA jalur pembaruan Android;
//   `app.ammu.id` = applicationId di vue-app/android/app/build.gradle & capacitor.config.
//   Ditaruh di sini, bukan di dalam view, supaya id aplikasi tak tersalin ke banyak tempat.
export const URL_PLAYSTORE = 'https://play.google.com/store/apps/details?id=app.ammu.id'

/** APK Android — namanya TANPA versi (Kyai unggah manual dari Play Console).
 *  ⚠ Sejak v.1.4.0 ini BUKAN lagi jalur pembaruan — hanya tautan pasang di layar
 *  login (yang masih bisa Kyai timpa lewat setelan `downloadAndroid`). Pembaruan
 *  aplikasi yang sudah terpasang: Play Store, lihat URL_PLAYSTORE. */
export function urlApk() {
  return unduhanRilis('AmmuOnline.apk')
}

/** Installer Windows 10/11. `null` bila versi tak terbaca -> pemanggil pakai HALAMAN_RILIS. */
export function urlInstallerDesktop(versi) {
  const v = normalVersi(versi)
  return v ? unduhanRilis(`AmmuOnline-Setup-${v}.exe`) : null
}

/** Installer Windows 7 (Electron 22). `null` bila versi tak terbaca. */
export function urlInstallerWin7(versi) {
  const v = normalVersi(versi)
  return v ? unduhanRilis(`AmmuOnline-Setup-Win7-${v}.exe`) : null
}
