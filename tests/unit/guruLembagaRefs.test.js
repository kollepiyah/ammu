// Penurunan TEMPAT TUGAS guru — menyetir siapa yang kena jenis bisyaroh & tunjangan mana.
//
// Kyai 7 Agu 2026, tiga keluhan berurutan yang semuanya bermuara ke sini:
//   (a) "Kepala PKBM tapi di simulasi terbacanya sebagai guru"
//   (b) "kepala yg juga guru ngaji, bisyaroh ngajinya tidak terbaca"
//   (c) "kok tambah rancu, bisyaroh pokok yg tadinya ada sekarang gk ada"  ← akibat (a)+(b)
//       diperbaiki dengan MENGGANTI bacaan jabatan; kepala berhenti terbaca "Guru" di
//       sekolahnya sehingga "Bisyaroh Pokok Guru SDI" (flat) ikut lenyap.
//
// ATURAN yang lahir dari situ: bacaan jabatan di sebuah lembaga hanya boleh DITAMBAH,
// tak pernah DIGANTI. Aman karena satu jenis menerbitkan paling banyak SATU baris betapa
// pun banyak ref yang cocok.
import { describe, it, expect } from 'vitest'
import { deriveGuruLembagaRefs } from '../../vue-app/src/composables/useGuru.js'

// Sesuai master jabatan Kyai (14 dari 15 terikat unit; hanya "Guru" yang global).
const JABATAN = [
  { nama: 'Guru', units: [] },
  { nama: 'Kepala TPQ', units: ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT'] },
  { nama: 'Kepala SDI', units: ['SDI'] },
  { nama: 'Kepala PKBM', units: ['PKBM'] },
  { nama: 'Wali Kelas', units: ['SDI', 'PKBM'] },
  { nama: 'Pengasuh', units: ['Yayasan'] }
]
const refs = (g) => deriveGuruLembagaRefs(g, { jabatanItems: JABATAN, lembagaList: [] })
const punya = (rs, lembaga, jabatan) =>
  rs.some((r) => r.lembaga === lembaga && r.jabatan_di_sini === jabatan)

describe('deriveGuruLembagaRefs', () => {
  it('guru biasa: satu tempat tugas, apa adanya', () => {
    const rs = refs({ jabatan: 'Guru', lembaga: 'PTPT' })
    expect(punya(rs, 'PTPT', 'Guru')).toBe(true)
  })

  it('(a) Kepala PKBM terbaca KEPALA di PKBM — bukan cuma "Guru"', () => {
    const rs = refs({ jabatan: 'Kepala PKBM', lembaga: 'PTPT', lembaga_sekolah: 'PKBM' })
    expect(punya(rs, 'PKBM', 'Kepala PKBM')).toBe(true)
  })

  it('(d) di lembaga yang ia PIMPIN: HANYA Kepala — pokok guru tak boleh ikut terbit', () => {
    // Kyai: "kalau kepala kenapa masih dapat bisyaroh pokok guru. harusnya kan hanya pokok
    //   kepala dan JPnya". Jam mengajarnya tetap dibayar lewat per-JP (lembaganya dari
    //   Beban Mengajar), jadi bacaan 'Guru' di sini memang tak diperlukan.
    const rs = refs({ jabatan: 'Kepala PKBM', lembaga: 'PTPT', lembaga_sekolah: 'PKBM' })
    expect(punya(rs, 'PKBM', 'Kepala PKBM')).toBe(true)
    expect(punya(rs, 'PKBM', 'Guru')).toBe(false)
  })

  it('WALI KELAS ber-unit TIDAK mencabut bacaan Guru — pokok gurunya harus utuh', () => {
    // Di master Kyai "Wali Kelas" terikat unit SDI & PKBM. Kalau aturan kepala dipukul rata
    //   ke semua gelar ber-unit, tiap wali kelas kehilangan pokok gurunya.
    const rs = refs({ jabatan: 'Guru', jabatan_tambahan: 'Wali Kelas', lembaga_sekolah: 'SDI' })
    expect(punya(rs, 'SDI', 'Guru')).toBe(true)
    expect(punya(rs, 'SDI', 'Wali Kelas')).toBe(true)
  })

  it('kepala di lembaga LAIN tetap dapat bacaan Guru — pokok guru ngajinya terbit', () => {
    const rs = refs({ jabatan: 'Kepala PKBM', lembaga: 'PTPT', lembaga_sekolah: 'PKBM' })
    expect(punya(rs, 'PTPT', 'Guru')).toBe(true)
  })

  it('(b) kepala yang juga guru ngaji: dapat bacaan "Guru" di lembaga ngajinya', () => {
    const rs = refs({ jabatan: 'Kepala PKBM', lembaga: 'PTPT' })
    expect(punya(rs, 'PTPT', 'Guru')).toBe(true) // jenis ngaji ber-scope Guru kena
    expect(punya(rs, 'PTPT', 'Kepala PKBM')).toBe(true) // bacaan lama tak diambil
  })

  it('kepala DI lembaganya sendiri TIDAK ditambahi bacaan "Guru"', () => {
    // Kalau ditambahi, pokok kepala & pokok guru bisa sama-sama terbit untuk orang yang sama.
    const rs = refs({ jabatan: 'Kepala TPQ', lembaga: 'TPQ Pagi' })
    expect(punya(rs, 'TPQ Pagi', 'Kepala TPQ')).toBe(true)
    expect(punya(rs, 'TPQ Pagi', 'Guru')).toBe(false)
  })

  it('gelar tetap berjangkar di unitnya walau lembaga sekolah kosong', () => {
    // Tanpa jangkar ini, tunjangan ber-scope jabatan Kepala lenyap untuk orang seperti ini.
    const rs = refs({ jabatan: 'Kepala PKBM', lembaga: 'PTPT' })
    expect(punya(rs, 'PKBM', 'Kepala PKBM')).toBe(true)
  })

  it('jabatan tambahan BANYAK: tiap gelar berjangkar di unitnya masing-masing', () => {
    const rs = refs({
      jabatan: 'Guru',
      jabatan_tambahan: 'Kepala PKBM, Pengasuh',
      lembaga: 'PTPT'
    })
    expect(punya(rs, 'PKBM', 'Kepala PKBM')).toBe(true)
    expect(punya(rs, 'Yayasan', 'Pengasuh')).toBe(true)
    expect(punya(rs, 'PTPT', 'Guru')).toBe(true)
  })

  it('kepala yang jabatannya TAMBAHAN pun tak dapat pokok guru di lembaganya', () => {
    const rs = refs({ jabatan: 'Guru', jabatan_tambahan: 'Kepala SDI', lembaga_sekolah: 'SDI' })
    expect(punya(rs, 'SDI', 'Kepala SDI')).toBe(true)
    expect(punya(rs, 'SDI', 'Guru')).toBe(false)
  })

  it('tak ada ref kembar (lembaga+jabatan sama) walau datangnya dari dua jalur', () => {
    const rs = refs({ jabatan: 'Kepala SDI', lembaga: 'SDI', lembaga_sekolah: 'SDI' })
    const kunci = rs.map((r) => `${r.lembaga}|${r.jabatan_di_sini}`)
    expect(new Set(kunci).size).toBe(kunci.length)
  })

  it('lembaga_refs yang sudah tersimpan dihormati apa adanya', () => {
    const sudah = [{ lembaga: 'X', jabatan_di_sini: 'Y' }]
    expect(refs({ lembaga_refs: sudah, jabatan: 'Guru', lembaga: 'PTPT' })).toBe(sudah)
  })

  it('tanpa lembaga & tanpa jabatan ber-unit -> tak melempar', () => {
    expect(refs({ jabatan: 'Guru' })).toEqual([])
  })
})
