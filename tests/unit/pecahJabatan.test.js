// `pecahJabatan` — Kyai 7 Agu 2026: "ada yg punya 3 jabatan".
// Kolom `jabatan_tambahan` bertipe TEKS dan formnya dulu satu <select>, jadi maksimal 2
// jabatan. Beberapa jabatan kini disimpan dipisah koma di kolom yang sama: nilai lama yang
// cuma satu nama tetap terbaca apa adanya, jadi tak ada data yang perlu dimigrasi.
import { describe, it, expect } from 'vitest'
import { pecahJabatan, unitsOfGuru } from '../../vue-app/src/utils/jabatanUnit.js'

describe('pecahJabatan', () => {
  it('nilai LAMA (satu nama) terbaca apa adanya', () => {
    expect(pecahJabatan('Kepala Lembaga')).toEqual(['Kepala Lembaga'])
  })

  it('tiga jabatan dipisah koma', () => {
    expect(pecahJabatan('Kepala Lembaga, Guru, Bendahara')).toEqual([
      'Kepala Lembaga',
      'Guru',
      'Bendahara'
    ])
  })

  it('spasi berlebih & entri kosong dibuang', () => {
    expect(pecahJabatan('  Guru ,, ,  Wali Kelas  ')).toEqual(['Guru', 'Wali Kelas'])
  })

  it('kembar dibuang tanpa memandang besar-kecil huruf', () => {
    expect(pecahJabatan('Guru, GURU, guru')).toEqual(['Guru'])
  })

  it('array juga diterima — beberapa pembaca lama mengirimnya begitu', () => {
    expect(pecahJabatan(['Guru', 'Bendahara'])).toEqual(['Guru', 'Bendahara'])
  })

  it('kosong/ngawur -> [] tanpa melempar', () => {
    for (const v of ['', null, undefined, ' , , ', []]) expect(pecahJabatan(v)).toEqual([])
  })
})

describe('unitsOfGuru dengan jabatan tambahan banyak', () => {
  const items = [
    { nama: 'Kepala Lembaga', units: ['SDI'] },
    { nama: 'Guru PKBM', units: ['PKBM'] },
    { nama: 'Bendahara', units: ['Yayasan'] }
  ]

  it('unit dari SEMUA jabatan ikut terkumpul', () => {
    const u = unitsOfGuru(items, 'Kepala Lembaga', 'Guru PKBM, Bendahara')
    expect(u.sort()).toEqual(['PKBM', 'SDI', 'Yayasan'])
  })

  it('satu jabatan global (units kosong) -> hasilnya ikut global', () => {
    expect(unitsOfGuru([...items, { nama: 'Guru', units: [] }], 'Guru', 'Bendahara')).toEqual([])
  })
})
