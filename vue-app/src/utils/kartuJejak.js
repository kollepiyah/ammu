// kartuJejak — membaca JEJAK isi `santri.kartu_kenaikan` per lembaga.
//
// Kyai (22 Jul 2026): "kalau santri pindah lembaga apakah data riwayatnya masih
//   tercatat?" Tercatat — `kartu_kenaikan` disimpan PER LEMBAGA (`{ 'TPQ Pagi': …,
//   'Pra PTPT': … }`) dan kunci lama tak pernah dihapus saat santri naik lembaga.
//   Yang dulu hilang cuma JALAN MASUKNYA: daftar Riwayat menyaring santri ke lembaga
//   SEKARANG, jadi kartu lembaga lama tak bisa dibuka lagi. Util ini yang dipakai
//   memunculkan mereka kembali sebagai "alumni".
//
// Semua fungsi PURE — menerima objek `kartu_kenaikan`, bukan dokumen santri.

/** Kunci kartu untuk satu pilihan lembaga (nama alias ikut). */
export function kunciKartuLembaga(lembaga) {
  const l = String(lembaga || '').trim()
  if (l === 'TPQ') return ['TPQ Pagi', 'TPQ Sore', 'TPQ']
  if (l === 'PPPH') return ['PPPH', 'P3H']
  return l ? [l] : []
}

// Kunci di dalam blok kelas yang BUKAN cap tanggal. Penghitung lama menghitung
// "nilai truthy apa pun", sehingga array `entries` (catatan) ikut terhitung sebagai
// satu tanggal — angka "N tanggal terisi" di layar karena itu kelebihan 1 pada blok
// yang punya catatan. Sekarang dikecualikan supaya angkanya benar-benar tanggal.
const BUKAN_TANGGAL = new Set(['entries', 'catatan', 'rekomendasi'])

/** Berapa tanggal yang sudah tercap di kartu lembaga ini. */
export function countTanggalKartu(kartu, lembaga) {
  const block = kartu?.[lembaga]
  if (!block || typeof block !== 'object') return 0
  let n = 0
  for (const kls of Object.values(block)) {
    if (!kls || typeof kls !== 'object') continue
    for (const [k, v] of Object.entries(kls)) {
      if (!BUKAN_TANGGAL.has(k) && v) n++
    }
  }
  return n
}

/** Berapa catatan/rekomendasi di kartu lembaga ini. */
export function countCatatanKartu(kartu, lembaga) {
  const block = kartu?.[lembaga]
  if (!block || typeof block !== 'object') return 0
  let n = 0
  for (const kls of Object.values(block)) {
    if (!kls || typeof kls !== 'object') continue
    if (Array.isArray(kls.entries)) n += kls.entries.filter((e) => e && e.text).length
    if (typeof kls.catatan === 'string' && kls.catatan.trim()) n++
    if (typeof kls.rekomendasi === 'string' && kls.rekomendasi.trim()) n++
  }
  return n
}

/**
 * Ada isi kartu di lembaga ini (tanggal ATAU catatan)?
 * Blok kosong `{}` TIDAK dihitung — blok begitu memang kerap terbentuk saat kenaikan
 * gagal mencocokkan skema, dan kalau ikut dihitung daftar "alumni" akan penuh santri
 * yang sebenarnya tak punya jejak apa pun di sana.
 */
export function adaJejakKartu(kartu, lembaga) {
  return kunciKartuLembaga(lembaga).some(
    (k) => countTanggalKartu(kartu, k) > 0 || countCatatanKartu(kartu, k) > 0
  )
}
