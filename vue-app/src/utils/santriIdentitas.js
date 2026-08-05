// santriIdentitas — pembaca field identitas santri yang bentuknya TIDAK seragam.
//
// Satu santri bisa membawa nama wali di empat tempat berbeda, tergantung lewat mana
// datanya masuk:
//   `wali`       — yang SEBENARNYA tersimpan (form: `wali: toTitleCase(f.nama_wali)`,
//                  impor xlsx: `wali`). Ini yang dipakai daftar santri di layar.
//   `nama_wali`  — nama field di FORM, bukan di DB. Nyaris tak pernah ada di baris.
//   `nama_ayah`  — terisi kalau data masuk lewat kolom "Nama Ayah".
//   `ayah.nama`  — bentuk bersarang, selaras blok ortu di form.
//
// Menebak satu saja membuat kolom "Wali/Ayah" kosong padahal datanya ada — persis yang
// terjadi di ekspor Top Santri Prestasi (Kyai, 5 Agu 2026): kodenya membaca
// `nama_ayah || nama_wali`, dua-duanya justru yang paling jarang terisi. Struk POS dan
// slip tabungan sudah memakai rantai lengkap; util ini menjadikannya sumber tunggal
// supaya salinan berikutnya tak lahir lagi dengan urutan yang berbeda.

function _teks(v) {
  return String(v ?? '').trim()
}

/**
 * Nama wali/ayah santri, dari bentuk mana pun datanya tersimpan.
 * Urutannya sengaja: `wali` lebih dulu karena itulah yang ditulis form & impor, dan
 * bagi santri yatim/piatu `wali` bisa sengaja berbeda dari `nama_ayah`.
 */
export function namaWaliSantri(s) {
  if (!s) return ''
  return (
    _teks(s.wali) || _teks(s.nama_wali) || _teks(s.nama_ayah) || _teks(s.ayah && s.ayah.nama) || ''
  )
}

/**
 * Alamat santri sebagai satu baris. `alamat` datar dipakai kalau ada; kalau kosong,
 * dirangkai dari `alamat_detail` (impor mengisi dusun/RT/RW/desa/kecamatan/kabupaten/
 * provinsi terpisah, dan banyak baris HANYA punya bentuk terpisah itu).
 */
export function alamatSantri(s) {
  if (!s) return ''
  const datar = _teks(s.alamat)
  if (datar) return datar
  const d = s.alamat_detail || {}
  const rt = _teks(d.rt)
  const rw = _teks(d.rw)
  let rtrw = ''
  if (rt && rw) rtrw = `RT ${rt}/RW ${rw}`
  else if (rt) rtrw = `RT ${rt}`
  else if (rw) rtrw = `RW ${rw}`
  return [
    _teks(d.dusun),
    rtrw,
    _teks(d.desa),
    _teks(d.kecamatan),
    _teks(d.kabupaten),
    _teks(d.provinsi)
  ]
    .filter(Boolean)
    .join(', ')
}
