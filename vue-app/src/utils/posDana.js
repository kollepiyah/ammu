// posDana — pos dana di atas Buku Induk (Uang Kegiatan, Uang Buku, Tabungan Wajib).
//
// Baris `keuangan_buku_induk` boleh membawa tag `pos`. Baris TANPA tag = kas umum
// (syahriyah, infaq, dsb) — itulah mayoritas isi buku induk.
//
// Kyai (5 Agu 2026): "untuk menu Buku induk saya ingin Pos yg lain (seperti tabungan
// wajib, uang buku, uang kegiatan) itu terpisah pencatatannya dari buku induk. atau
// dibuat filter pos saja, biar ekspor pdf laporannya mudah." Yang diambil = filter,
// bukan pemisahan tabel: memindahkan catatan uang yang sudah berjalan berisiko, sedang
// filter memberi hasil yang sama untuk laporan — dan seluruh ekspor Buku Induk (PDF,
// Excel, Google Sheet) sudah mengalir dari satu daftar tersaring.

export const POS_META = {
  kegiatan: { label: 'Uang Kegiatan', icon: 'fa-calendar-check' },
  buku: { label: 'Uang Buku', icon: 'fa-book-open' },
  // Tabungan Wajib = dana kegiatan kelulusan: TAK bisa ditarik, dibelanjakan pesantren —
  // jadi pos di atas buku induk, BUKAN tabungan santri yang bisa ditarik (itu
  // keuangan_tabungan_santri, lihat TabunganView).
  tabungan_wajib: { label: 'Tabungan Wajib', icon: 'fa-graduation-cap' }
}

/** Sentinel filter: baris yang TIDAK bertag pos sama sekali. */
export const POS_UMUM = '__umum__'

function _teks(v) {
  return String(v ?? '').trim()
}

/** Tag pos satu baris buku induk. '' = kas umum (tak bertag). */
export function posDari(baris) {
  if (!baris) return ''
  return _teks(baris.pos || baris?.data?.pos)
}

/** Label tampilan sebuah pos. Pos tak dikenal dikembalikan apa adanya, bukan disembunyikan. */
export function labelPos(key) {
  const k = _teks(key)
  if (!k) return 'Kas Umum'
  if (k === POS_UMUM) return 'Kas Umum (tanpa pos)'
  return POS_META[k]?.label || k
}

/**
 * Pilihan dropdown filter. Pos yang TIDAK punya satu pun baris tetap ditampilkan supaya
 * daftarnya tak berubah-ubah tiap ganti periode — kecuali pos asing dari data, yang hanya
 * muncul kalau memang ada barisnya.
 */
export function opsiFilterPos(list) {
  const adaAsing = new Set()
  for (const b of list || []) {
    const p = posDari(b)
    if (p && !POS_META[p]) adaAsing.add(p)
  }
  return [
    { key: '', label: 'Semua pos' },
    { key: POS_UMUM, label: labelPos(POS_UMUM) },
    ...Object.keys(POS_META).map((k) => ({ key: k, label: POS_META[k].label })),
    ...[...adaAsing].sort().map((k) => ({ key: k, label: k }))
  ]
}

/**
 * Baris ini lolos filter pos?
 *   ''        -> semua baris
 *   POS_UMUM  -> hanya baris tanpa tag pos
 *   '<pos>'   -> hanya baris pos itu
 */
export function cocokPos(baris, filter) {
  const f = _teks(filter)
  if (!f) return true
  const p = posDari(baris)
  return f === POS_UMUM ? !p : p === f
}

/** Potongan judul & nama berkas laporan. '' = tanpa penyebutan pos. */
export function labelFilterPos(filter) {
  const f = _teks(filter)
  return f ? labelPos(f) : ''
}
