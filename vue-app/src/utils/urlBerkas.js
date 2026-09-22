// urlBerkas.js — penyaring URL berkas yang PASTI mati, dipakai di titik tampil & cetak.
//
// v.1.4.5 (22 Sep 2026): Firebase Storage proyek lama (portal-mambaul-ulum) menjawab
// HTTP 402 "billing account … disabled in state delinquent" untuk SETIAP berkasnya.
// Migrasi Juni 2026 ke Supabase Storage tak menulis ulang semua baris: `kop_logo`
// kedelapan lembaga masih menunjuk ke sana, dan foto/tanda tangan/gambar post yang
// diunggah sebelum cutover kemungkinan besar bernasib sama.
//
// Akibatnya bukan sekadar gambar kosong. Rantai cadangan yang sudah ada di kode —
// `kop_logo || logoKop || '/logo.png'`, `v-if="foto"` lalu ikon — berhenti di nilai
// pertama yang TIDAK KOSONG, bukan yang HIDUP. Jadi URL mati tak pernah jatuh ke
// cadangannya: ikon gambar rusak di avatar dan kop rapor, logo lembaga lenyap dari PDF.
// Menyaringnya di sini membuat rantai itu melompat ke cadangannya sendiri.
//
// Datanya SENGAJA tidak disentuh: URL lama adalah satu-satunya jejak nama berkas
// untuk pemulihan. Karena itu penyaring ini dipasang di titik pakai, BUKAN di
// services/db.js — di sana ia akan ikut tersimpan ulang oleh form yang memuat lalu
// menyimpan barisnya, dan jejak itu hilang diam-diam.

// Kedua bentuk bucket bawaan proyek itu: `.firebasestorage.app` (sekarang) dan
// `.appspot.com` (lama). URL Firebase proyek LAIN tidak dianggap mati.
const FIREBASE_MATI = /^https?:\/\/firebasestorage\.googleapis\.com\/v0\/b\/portal-mambaul-ulum\./i

/** true bila `url` menunjuk berkas Firebase Storage proyek lama — pasti gagal (402). */
export function berkasMati(url) {
  return typeof url === 'string' && FIREBASE_MATI.test(url.trim())
}

/** URL apa adanya bila masih bisa dipakai; '' bila kosong, bukan teks, atau pasti mati. */
export function urlBerkas(url) {
  const s = typeof url === 'string' ? url.trim() : ''
  return s && !FIREBASE_MATI.test(s) ? s : ''
}

/** Kandidat pertama yang masih bisa dipakai (urut prioritas); '' bila tak satu pun. */
export function pilihBerkas(...kandidat) {
  for (const u of kandidat) {
    const s = urlBerkas(u)
    if (s) return s
  }
  return ''
}
