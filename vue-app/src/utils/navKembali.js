// navKembali — alamat "kembali ke daftar" yang dibawa form Santri/Guru.
//
// Kyai, 4 Sep 2026: *"di data santri/guru, jika setelah tulis nama kemudian cari, lalu edit
// data, setelah simpan selalu reset halamannya. maksudnya namanya tadi hilang, dan tergeser
// ke bawah, jadi kalau ingin ketik nama lain masih perlu scroll keatas."*
//
// SEBABNYA. Daftar Santri/Guru sudah menyimpan penyaringnya di query URL sejak v.107
// (`?q=ahmad&lembaga=PTPT`), tapi tombol Simpan di formnya memanggil
// `router.push('/master-data?tab=santri')` — alamat yang DIKARANG ULANG, tanpa satu pun
// penyaring tadi. Jadi bukan filternya yang gagal bertahan; alamat yang dituju memang
// alamat kosong. Form membawa `?kembali=<fullPath daftar>` dan memakainya kembali.
//
// KENAPA DIVALIDASI. `kembali` datang dari URL dan URL bisa ditempel siapa saja. Tanpa
// penjagaan, `?kembali=https://situs-lain/...` akan membuat tombol Simpan di aplikasi ini
// melempar penggunanya ke situs orang — dan yang menekan tombolnya justru percaya ia masih
// di dalam aplikasi. Karena itu hanya jalur INTERNAL yang diterima.

/** Kunci query yang dipakai membawa alamat daftar. Satu tempat supaya tak salah eja. */
export const KEY_KEMBALI = 'kembali'

/**
 * Jalur internal yang aman? Harus mulai dengan SATU '/'.
 *
 * Yang ditolak dan alasannya:
 *   '//situs-lain/x'  → protocol-relative: browser membacanya sebagai host LAIN.
 *   '/\\situs-lain'   → sebagian browser memperlakukan '\' seperti '/', jadi ini juga lolos
 *                       jadi host lain kalau cuma memeriksa '//'.
 *   'https://…', 'javascript:…' → jelas bukan jalur internal.
 */
export function jalurInternal(v) {
  const s = String(v ?? '').trim()
  if (!s || s[0] !== '/') return false
  if (s[1] === '/' || s[1] === '\\') return false
  return !s.includes('\\')
}

/**
 * Alamat yang harus dituju sesudah Simpan/Batal.
 *
 * @param {object} query   route.query form (membawa `kembali` bila daftarnya mengirimnya).
 * @param {string|object} fallback alamat lama — dipakai apa adanya bila `kembali` tak ada
 *   atau tak sah. Perilaku tanpa `kembali` sengaja TIDAK berubah: tautan lama (dan yang
 *   di-bookmark) tetap mendarat di tempat yang sama seperti sebelumnya.
 */
export function targetKembali(query, fallback) {
  const raw = query ? query[KEY_KEMBALI] : ''
  const v = Array.isArray(raw) ? raw[0] : raw
  return jalurInternal(v) ? String(v) : fallback
}

/**
 * Query untuk tautan Tambah/Edit dari sebuah daftar: `from` lama + alamat daftar sekarang.
 * `fullPath` sudah memuat seluruh penyaring karena daftar menuliskannya ke URL sejak v.107.
 */
export function queryDariDaftar(fullPath, from = 'master') {
  const q = { from }
  if (jalurInternal(fullPath)) q[KEY_KEMBALI] = String(fullPath)
  return q
}
