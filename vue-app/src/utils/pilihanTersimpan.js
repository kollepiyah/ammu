// pilihanTersimpan — aturan "yang TERSIMPAN harus TERLIHAT" untuk chip & `<select>` yang
// pilihannya diambil dari master (jabatan, lembaga, shift, kelas) atau dari daftar guru aktif.
//
// v.1.4.6 (26 Sep 2026) form guru menolak simpan karena centang jabatan tambahan yang tak
// terlihat — lihat opsiJabatanTambahan / opsiJabatanUtama di utils/jabatanUnit. Sapuan
// sesudahnya menemukan pola yang sama di layar lain: pilihan chip dibangun HANYA dari master,
// jadi nilai tersimpan yang sudah dihapus / diganti nama di master (atau guru yang sudah
// nonaktif) tak punya chip. Tak terlihat, tak bisa dilepas, tapi tetap dibaca mesinnya:
//   · scope Jenis Bisyaroh / Tunjangan / Potongan — deretan chip tampak kosong ("kosongkan =
//     semua") padahal scope-nya terbatas;
//   · unit jabatan — jabatan ber-unit tunggal tetap mengisikan lembaga yang sudah tak ada;
//   · penguji materi tes — syarat "minimal 1 penguji" lolos walau satu-satunya penguji
//     sudah nonaktif.
//
// Tiga keputusan yang harus seragam di semua layar itu, diputuskan sekali di sini:
//   1. Chip = pilihan + tiap nilai tersimpan yang tak ada di pilihan (`luarPilihan: true`),
//      supaya tampak dan bisa dilepas.
//   2. Tercentang atau tidak dinilai dengan PEMBANDING YANG SAMA dengan mesin yang membaca
//      nilai itu — abai huruf untuk nama (cocokKriteria di bisyarohScope, samaTeks di
//      tesSekolah, _key di jabatanUnit), persis untuk id (shift, guru).
//   3. Mengeklik chip melepas SEMUA kembarannya menurut pembanding itu. Kalau cuma ejaan yang
//      persis yang dilepas, chip "PJ PTPT" yang tampak menyala tak bisa dimatikan selama
//      "Pj Ptpt" hasil impor masih tersimpan — dan mengekliknya malah menambah kembaran baru.
//
// Semua fungsi PURE; masukan tak pernah diubah.

/** Pembanding nama: abai huruf besar-kecil & spasi tepi. */
export const abaiHuruf = (v) =>
  String(v == null ? '' : v)
    .trim()
    .toLowerCase()

/** Pembanding id: persis, hanya spasi tepi yang dibuang. */
export const persis = (v) => String(v == null ? '' : v).trim()

const _daftar = (v) => (Array.isArray(v) ? v : [])

/**
 * Chip untuk satu kriteria: pilihan (urutannya dipertahankan, kembaran menurut `kunci`
 * dibuang), DITAMBAH tiap nilai tersimpan yang tak ada di pilihan.
 *
 * @param {Array} opsi pilihan — string, atau objek (lihat `nilaiOf`/`labelOf`)
 * @param {Array} tersimpan nilai yang tersimpan di data
 * @param {object} [cara]
 * @param {(o:any)=>any} [cara.nilaiOf] nilai sebuah pilihan (bawaan: pilihan itu sendiri)
 * @param {(o:any)=>string} [cara.labelOf] label sebuah pilihan (bawaan: nilainya)
 * @param {(v:any)=>string} [cara.kunci] pembanding (bawaan: abaiHuruf)
 * @param {(v:string)=>string} [cara.labelLuar] label nilai tersimpan di luar pilihan
 * @returns {{nilai:string, label:string, luarPilihan:boolean}[]}
 */
export function chipTersimpan(opsi, tersimpan, cara = {}) {
  const {
    nilaiOf = (o) => o,
    labelOf = (o) => nilaiOf(o),
    kunci = abaiHuruf,
    labelLuar = (v) => v
  } = cara
  const out = []
  const ada = new Set()
  for (const o of _daftar(opsi)) {
    const nilai = String(nilaiOf(o) ?? '').trim()
    const k = kunci(nilai)
    if (!k || ada.has(k)) continue
    ada.add(k)
    out.push({ nilai, label: String(labelOf(o) ?? '').trim() || nilai, luarPilihan: false })
  }
  for (const v of _daftar(tersimpan)) {
    const nilai = String(v ?? '').trim()
    const k = kunci(nilai)
    if (!k || ada.has(k)) continue
    ada.add(k)
    out.push({ nilai, label: String(labelLuar(nilai) ?? '').trim() || nilai, luarPilihan: true })
  }
  return out
}

/**
 * Nilai tersimpan yang ADA di pilihan — kebalikan chip `luarPilihan`. Dipakai syarat
 * "minimal satu" yang hanya boleh dihitung dari pilihan yang masih hidup.
 */
export function tersimpanDalamPilihan(opsi, tersimpan, cara = {}) {
  const { nilaiOf = (o) => o, kunci = abaiHuruf } = cara
  const kunciOpsi = new Set(_daftar(opsi).map((o) => kunci(nilaiOf(o))))
  return _daftar(tersimpan).filter((v) => {
    const k = kunci(v)
    return !!k && kunciOpsi.has(k)
  })
}

/** Apakah `nilai` tersimpan (menurut `kunci`)? Sumber tanda tercentang pada chip. */
export function tercentang(tersimpan, nilai, kunci = abaiHuruf) {
  const k = kunci(nilai)
  if (!k) return false
  return _daftar(tersimpan).some((x) => kunci(x) === k)
}

/**
 * Centang/lepas satu chip → daftar BARU. Sudah tersimpan (menurut `kunci`) → SEMUA
 * kembarannya dibuang; belum → `nilai` (ejaan pilihan) ditambahkan di belakang.
 */
export function alihkan(tersimpan, nilai, kunci = abaiHuruf) {
  const daftar = _daftar(tersimpan)
  const k = kunci(nilai)
  if (!k) return [...daftar]
  if (daftar.some((x) => kunci(x) === k)) return daftar.filter((x) => kunci(x) !== k)
  return [...daftar, nilai]
}

/**
 * Pilihan `<select>` + nilai tersimpan bila tak ada di pilihan, ditaruh paling atas. Tanpa
 * itu `<select>` tampil KOSONG sementara v-model tetap memegang nilai lama — layar dan data
 * berselisih, dan `<select required>` menolak simpan dengan balon kecil. Dicocokkan PERSIS
 * karena `<select>` sendiri mencocokkan value secara persis.
 */
export function opsiSelectTersimpan(opsi, nilai) {
  const out = Array.isArray(opsi) ? [...opsi] : []
  const v = nilai == null ? '' : String(nilai)
  if (v.trim() && !out.includes(v)) out.unshift(v)
  return out
}

/**
 * Label guru yang tersimpan tapi tak ada di daftar pilihan (yang hanya berisi guru aktif):
 * "Nama (Nonaktif)" bila orangnya masih ada di data guru, atau id-nya bila sudah terhapus.
 */
export function labelGuruLuar(guruList, id) {
  const sid = persis(id)
  const g = _daftar(guruList).find((x) => persis(x?.id) === sid)
  if (!g) return `${sid} (tak ada di data guru)`
  const status = String(g.status || '').trim() || 'Nonaktif'
  return `${String(g.nama || sid).trim()} (${status})`
}
