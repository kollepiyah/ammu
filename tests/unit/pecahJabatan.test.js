// `pecahJabatan` — Kyai 7 Agu 2026: "ada yg punya 3 jabatan".
// Kolom `jabatan_tambahan` bertipe TEKS dan formnya dulu satu <select>, jadi maksimal 2
// jabatan. Beberapa jabatan kini disimpan dipisah koma di kolom yang sama: nilai lama yang
// cuma satu nama tetap terbaca apa adanya, jadi tak ada data yang perlu dimigrasi.
import { describe, it, expect } from 'vitest'
import { pecahJabatan, unitsOfGuru, jabatanUntukUnit } from '../../vue-app/src/utils/jabatanUnit.js'

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

// Kyai 7 Agu 2026: "siti churiyah Kepala PKBM tapi di simulasi terbacanya sebagai guru".
// Tempat tugas di lembaga SEKOLAH dulu diberi `g.jabatan_sekolah || 'Guru'`, dan
// `jabatan_sekolah` TIDAK PERNAH diisi di mana pun — jadi semua kepala sekolah terbaca
// "Guru" di lembaganya sendiri, dan jenis/tunjangan ber-scope jabatan Kepala tak mengenainya.
describe('jabatanUntukUnit', () => {
  const items = [
    { nama: 'Kepala PKBM', units: ['PKBM'] },
    { nama: 'Kepala SDI', units: ['SDI'] },
    { nama: 'Kepala TPQ', units: ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT'] },
    { nama: 'Guru', units: [] }
  ]

  it('jabatan yang memangku unit itu yang dipakai', () => {
    expect(jabatanUntukUnit(items, ['Kepala PKBM'], 'PKBM')).toBe('Kepala PKBM')
  })

  it('cocok tanpa memandang besar-kecil huruf & spasi', () => {
    expect(jabatanUntukUnit(items, ['Kepala TPQ'], '  tpq sore ')).toBe('Kepala TPQ')
  })

  it('jabatan yang TIDAK memangku unit itu -> kosong (pemanggil pakai fallback)', () => {
    // Kepala SDI yang kebetulan mengajar di PKBM bukan kepala DI SANA.
    expect(jabatanUntukUnit(items, ['Kepala SDI'], 'PKBM')).toBe('')
    expect(jabatanUntukUnit(items, ['Guru'], 'PKBM')).toBe('')
  })

  it('jabatan tambahan ikut diperiksa — yang pertama memangku unit yang menang', () => {
    expect(jabatanUntukUnit(items, ['Guru', 'Kepala PKBM'], 'PKBM')).toBe('Kepala PKBM')
  })

  it('masukan kosong/ngawur aman', () => {
    expect(jabatanUntukUnit(items, [], 'PKBM')).toBe('')
    expect(jabatanUntukUnit(items, ['Kepala PKBM'], '')).toBe('')
    expect(jabatanUntukUnit(null, null, null)).toBe('')
  })
})
