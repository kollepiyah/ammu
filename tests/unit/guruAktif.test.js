// Kyai (22 Jul 2026): "nama abdullah musyaffa' dan beberapa nama guru lain (data
// lama) selalu muncul di dropdown pilih guru pengajar."
//
// Dua bug berbeda, satu akar: tak ada sumber tunggal penyaring status guru.
//   1. NaikKelasView.guruOptions & TesKenaikanView.guruOptionsFor menyaring LEMBAGA
//      saja — status tak pernah dicek.
//   2. CeremonialView memakai `status !== 'Non-Aktif'`, padahal string itu TAK PERNAH
//      ditulis siapa pun. Nilai asli: 'Aktif' (form) / 'aktif' (impor) / 'Tidak Aktif'.
import { describe, it, expect } from 'vitest'
import { isGuruAktif, guruAktifSaja, punyaGuruKategori } from '@/utils/guruScope'

describe('isGuruAktif', () => {
  it("'Aktif' (ditulis form guru) = aktif", () => {
    expect(isGuruAktif({ status: 'Aktif' })).toBe(true)
  })

  it("'aktif' huruf kecil (ditulis impor Excel) = aktif", () => {
    // Form dan impor menulis kapitalisasi BERBEDA — perbandingan wajib
    // case-insensitive, kalau tidak separuh guru hasil impor ikut hilang.
    expect(isGuruAktif({ status: 'aktif' })).toBe(true)
  })

  it("'Tidak Aktif' = NONAKTIF (ini nilai asli, bukan 'Non-Aktif')", () => {
    expect(isGuruAktif({ status: 'Tidak Aktif' })).toBe(false)
    expect(isGuruAktif({ status: 'tidak aktif' })).toBe(false)
  })

  it('status kosong/undefined dianggap AKTIF (data lama sebelum ada kolom status)', () => {
    expect(isGuruAktif({})).toBe(true)
    expect(isGuruAktif({ status: '' })).toBe(true)
    expect(isGuruAktif({ status: null })).toBe(true)
    expect(isGuruAktif(null)).toBe(true)
  })

  it('spasi berlebih tetap terbaca', () => {
    expect(isGuruAktif({ status: '  Aktif  ' })).toBe(true)
    expect(isGuruAktif({ status: ' Tidak Aktif ' })).toBe(false)
  })

  it("REGRESI: 'Non-Aktif' TIDAK dianggap aktif", () => {
    // Kalaupun ada data lama yang terlanjur memakai ejaan ini, ia harus tetap
    // tersaring — bukan lolos seperti pada penyaring lama.
    expect(isGuruAktif({ status: 'Non-Aktif' })).toBe(false)
  })
})

describe('guruAktifSaja', () => {
  const list = [
    { id: 'g1', nama: 'Aktif Form', status: 'Aktif' },
    { id: 'g2', nama: 'Aktif Impor', status: 'aktif' },
    { id: 'g3', nama: "Abdullah Musyaffa'", status: 'Tidak Aktif' },
    { id: 'g4', nama: 'Tanpa Status' },
    { id: 'g5', nama: 'Ejaan Lama', status: 'Non-Aktif' }
  ]

  it('SKENARIO KYAI: guru nonaktif tak ikut terbawa', () => {
    const nama = guruAktifSaja(list).map((g) => g.nama)
    expect(nama).not.toContain("Abdullah Musyaffa'")
    expect(nama).not.toContain('Ejaan Lama')
  })

  it('yang aktif & tanpa status tetap ikut', () => {
    expect(guruAktifSaja(list).map((g) => g.id)).toEqual(['g1', 'g2', 'g4'])
  })

  it('daftar kosong / null aman', () => {
    expect(guruAktifSaja([])).toEqual([])
    expect(guruAktifSaja(null)).toEqual([])
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// KONSOLIDASI BisyarohView (22 Jul 2026) — bukti kesetaraan sebelum menyentuh uang.
//
// Tiga penyaring di BisyarohView (filteredGuru, materialisasiGabunganPeriode,
// bulkTargets) memakai pola TANPA `.trim()`:
//     String(g.status || 'Aktif').toLowerCase() === 'aktif'
// Menggantinya dengan isGuruAktif() otomatis MENAMBAH `.trim()`. Ketiganya
// menyetir perhitungan bisyaroh, jadi kesetaraannya wajib DIBUKTIKAN, bukan
// diyakini.
//
// `.trim()` cuma berpengaruh kalau status punya spasi di ujung. Audit SELURUH
// penulis guru.status di aplikasi menunjukkan itu tak terjangkau:
//   useGuruForm.js:33          -> 'Aktif' (default guru baru)
//   GuruFormView.vue:349       -> <select> 'Aktif' / 'Tidak Aktif'
//   GuruView.bulkSetStatus     -> 'Aktif' / 'Non-aktif'
//   GuruView.toggleAktifGuru   -> 'Aktif' / 'Non-aktif'
//   importMap.js:220           -> 'aktif' / 'Tidak Aktif' (literal ternary)
//   GuruView.vue:1305 (impor)  -> String(...).trim() — sudah dipangkas di hulu
// Tes ini mengunci audit tsb: kalau kelak ada penulis baru yang meloloskan spasi,
// daftar di bawah harus bertambah dan kesetaraannya diperiksa ulang.
// ─────────────────────────────────────────────────────────────────────────────
describe('isGuruAktif setara dengan penyaring lama BisyarohView', () => {
  // Salinan PERSIS predikat lama di BisyarohView sebelum konsolidasi.
  const predikatLamaBisyaroh = (g) => String(g.status || 'Aktif').toLowerCase() === 'aktif'

  // Tiap nilai yang benar-benar bisa mendarat di kolom `status` lewat aplikasi.
  // Jalur impor Excel meneruskan isi sel apa adanya (sudah di-trim), jadi string
  // sembarang seperti 'Cuti' ikut mungkin — dan wajib diputus sama oleh keduanya.
  const NILAI_TERTULIS_APP = [
    'Aktif',
    'aktif',
    'AKTIF',
    'Tidak Aktif',
    'tidak aktif',
    'Non-aktif',
    'Non-Aktif',
    'Cuti',
    '',
    null,
    undefined
  ]

  it('putusan lama === putusan helper untuk SEMUA nilai yang bisa ditulis aplikasi', () => {
    for (const status of NILAI_TERTULIS_APP) {
      expect({ status, aktif: isGuruAktif({ status }) }).toEqual({
        status,
        aktif: predikatLamaBisyaroh({ status })
      })
    }
  })

  it('SATU-SATUNYA selisih: status berspasi — dan itu tak terjangkau jalur tulis app', () => {
    // Perilaku lama membuang guru ini dari bisyaroh diam-diam; helper mengikutkannya,
    // sama seperti AbsensiGuruView/GuruView yang memang sudah memangkas spasi.
    expect(predikatLamaBisyaroh({ status: 'Aktif ' })).toBe(false)
    expect(isGuruAktif({ status: 'Aktif ' })).toBe(true)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Kyai (22 Jul 2026): "di assign guru (kelas), jika santri sudah punya guru baik
// sekolah atau ngaji, jangan muncul lagi namanya ketika saya assign untuk guru baru."
//
// Pengecekan WAJIB per-kategori. Kalau dicampur, santri yang punya guru ngaji tak
// akan pernah bisa di-assign guru sekolah — dan karena hampir semua santri punya
// guru ngaji, daftar sekolah bakal kosong melompong.
// ─────────────────────────────────────────────────────────────────────────────
describe('punyaGuruKategori', () => {
  it('ngaji: guru_pagi ATAU guru_sore terisi = sudah punya', () => {
    expect(punyaGuruKategori({ guru_pagi: 'Bu A' }, 'ngaji')).toBe(true)
    expect(punyaGuruKategori({ guru_sore: 'Bu B' }, 'ngaji')).toBe(true)
  })

  it('ngaji: field `guru` lama ikut dihitung', () => {
    expect(punyaGuruKategori({ guru: 'Ust. Lama' }, 'ngaji')).toBe(true)
  })

  it('sekolah: guru_sekolah[] terisi = sudah punya', () => {
    expect(punyaGuruKategori({ guru_sekolah: ['Ust. C'] }, 'sekolah')).toBe(true)
    expect(punyaGuruKategori({ guru_sekolah: 'Ust. C' }, 'sekolah')).toBe(true)
  })

  it('KUNCI: dua kategori tidak saling mempengaruhi', () => {
    const s = { guru_pagi: 'Bu A', guru_sekolah: [] }
    expect(punyaGuruKategori(s, 'ngaji')).toBe(true)
    // Punya guru ngaji TIDAK boleh membuatnya dianggap sudah punya guru sekolah.
    expect(punyaGuruKategori(s, 'sekolah')).toBe(false)
  })

  it('kebalikannya juga', () => {
    const s = { guru_sekolah: ['Ust. C'] }
    expect(punyaGuruKategori(s, 'sekolah')).toBe(true)
    expect(punyaGuruKategori(s, 'ngaji')).toBe(false)
  })

  it('nilai kosong / spasi tidak dianggap punya guru', () => {
    expect(punyaGuruKategori({ guru_pagi: '', guru_sore: '  ' }, 'ngaji')).toBe(false)
    expect(punyaGuruKategori({ guru_sekolah: ['', '  '] }, 'sekolah')).toBe(false)
    expect(punyaGuruKategori({}, 'ngaji')).toBe(false)
    expect(punyaGuruKategori(null, 'sekolah')).toBe(false)
  })
})
