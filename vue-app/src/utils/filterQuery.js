// filterQuery.js — penyaring daftar ⇄ query URL, sebagai fungsi PURE yang bisa ditest.
//
// KENAPA LEWAT URL. State penyaring hidup di dalam composable (`useSantri`/`useGuru`),
// jadi ia MATI setiap kali komponennya di-unmount — dan itu terjadi pada perjalanan yang
// paling sering dipakai: daftar → Edit → Simpan → daftar. URL adalah satu-satunya tempat
// yang selamat dari unmount, back/forward, dan muat ulang halaman.
//
// KELUHAN Kyai, 12 Sep 2026 (ini kedua kalinya, lihat juga utils/navKembali.js yang
// menutup sebagiannya pada 4 Sep):
//   "saat saya pilih filter di data santri, atau ketik nama santri lalu edit dan simpan
//    selalu kembali ke semula (tampil semua), harusnya masih tetap di filter itu."
//
// DUA SEBAB YANG TERSISA sesudah perbaikan 4 Sep, dan keduanya sebab berkas ini ada:
//
//   1. HANYA SEBAGIAN penyaring yang ditulis ke URL. Di Data Santri ada tujuh penyaring
//      plus satu sub-tab, tetapi yang tersimpan cuma empat — Gedung, PJ PTPT, Kelas-Guru,
//      dan sub-tab Qiraati/Sekolah tidak. Penyaring yang tak tersimpan hilang pada
//      perpindahan halaman APA PUN, jadi "pilih filter lalu edit" memang selalu balik
//      ke tampil-semua. Daftar `spec` memaksa keduanya satu daftar: menambah penyaring
//      baru tanpa mendaftarkannya di sini akan ketahuan sebagai penyaring yang "lupa
//      sendiri".
//
//   2. PENJAGA `_syncingQuery` yang tak pernah menjaga. Pola lamanya:
//
//        _syncingQuery = true;  search.value = …;  _syncingQuery = false
//
//      Watcher Vue bawaan ber-`flush: 'pre'` — ia ANTRE, tak berjalan saat itu juga. Saat
//      callback-nya akhirnya jalan, benderanya sudah kembali `false`, jadi tulis-balik
//      yang hendak dicegah tetap terjadi. Di sini penjaganya diganti PERBANDINGAN hasil
//      (`queryBerubah`): menulis ulang query yang isinya sama persis memang tak perlu,
//      tak peduli siapa yang memicunya — dan itu bebas dari balapan waktu.
//
// Nilai penyaring selalu STRING. Kunci yang nilainya = bawaan TIDAK ditulis ke URL, supaya
// alamat daftar tetap pendek dan `?status=aktif` tak memenuhi bilah alamat.

/**
 * Baca nilai penyaring dari query URL.
 *
 * @param {object} query `route.query` (nilainya bisa string ATAU array — vue-router
 *   memberi array bila satu kunci muncul dua kali, mis. `?q=a&q=b`; yang dipakai yang
 *   pertama supaya URL tempelan tak membuat penyaring jadi "[object Object]").
 * @param {Array<{kunci: string, bawaan?: string}>} spec daftar penyaring halaman itu.
 * @returns {Record<string,string>} peta kunci → nilai (selalu lengkap sesuai spec).
 */
export function bacaFilterQuery(query, spec) {
  const out = {}
  for (const f of spec || []) {
    const raw = query ? query[f.kunci] : undefined
    const v = Array.isArray(raw) ? raw[0] : raw
    out[f.kunci] = v != null && v !== '' ? String(v) : String(f.bawaan ?? '')
  }
  return out
}

/**
 * Susun query URL dari nilai penyaring.
 *
 * @param {Record<string,string>} nilai peta kunci → nilai sekarang.
 * @param {Array<{kunci: string, bawaan?: string}>} spec daftar penyaring halaman itu.
 * @param {object} queryLama `route.query` sekarang — sumber nilai `kekal`.
 * @param {string[]} kekal kunci milik HALAMAN INDUK yang wajib dibawa serta. Daftar
 *   Santri/Guru juga tayang di dalam Master Data (`?tab=santri`) dan pita memakai
 *   `?tipe=pegawai`; query ditulis ulang dari nol, jadi tanpa daftar ini Master Data
 *   melompat ke tab lain tiap kali kotak cari diketik.
 * @returns {object} query siap diberikan ke `router.replace`.
 */
export function tulisFilterQuery(nilai, spec, queryLama = {}, kekal = []) {
  const q = {}
  for (const k of kekal || []) {
    const raw = queryLama ? queryLama[k] : undefined
    const v = Array.isArray(raw) ? raw[0] : raw
    if (v != null && v !== '') q[k] = String(v)
  }
  for (const f of spec || []) {
    const v = String(nilai?.[f.kunci] ?? '')
    if (v && v !== String(f.bawaan ?? '')) q[f.kunci] = v
  }
  return q
}

/**
 * Apakah query BENAR-BENAR berubah? Dipakai menggantikan bendera `_syncingQuery`:
 * `router.replace` hanya dipanggil bila hasilnya beda, sehingga membaca-dari-URL lalu
 * menulis-balik-ke-URL berhenti sendiri tanpa bergantung pada urutan watcher.
 *
 * Perbandingan dangkal atas nilai string — semua nilai query memang string.
 */
export function queryBerubah(a, b) {
  const A = a || {}
  const B = b || {}
  const kunci = new Set([...Object.keys(A), ...Object.keys(B)])
  for (const k of kunci) {
    const va = Array.isArray(A[k]) ? A[k][0] : A[k]
    const vb = Array.isArray(B[k]) ? B[k][0] : B[k]
    if (String(va ?? '') !== String(vb ?? '')) return true
  }
  return false
}

/**
 * Alamat halaman LAIN yang membawa serta penyaring yang sedang aktif.
 *
 * Dipakai tombol **Kelola** (daftar mode-lihat → Master Data). Tombol itu dulu menunjuk
 * alamat karangan `/master-data?tab=santri` — tanpa satu pun penyaring. Karena tombol
 * Edit HANYA ada di Master Data, setiap perjalanan "cari → Kelola → edit" pasti melewati
 * daftar kosong; inilah separuh keluhan Kyai yang tak tertutup perbaikan 4 Sep.
 *
 * @param {string} path alamat tujuan, mis. '/master-data'.
 * @param {object} query `route.query` sekarang (seluruh penyaring sudah ada di sini).
 * @param {object} tambahan kunci yang ditimpa/ditambah, mis. `{ tab: 'santri' }`.
 */
export function alamatBawaFilter(path, query, tambahan = {}) {
  const q = {}
  for (const [k, raw] of Object.entries(query || {})) {
    const v = Array.isArray(raw) ? raw[0] : raw
    if (v != null && v !== '') q[k] = String(v)
  }
  for (const [k, v] of Object.entries(tambahan || {})) {
    if (v != null && v !== '') q[k] = String(v)
    else delete q[k]
  }
  return { path, query: q }
}
