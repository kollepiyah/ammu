// labelJenjang — SATU ejaan untuk satu jenjang.
//
// Kyai (4 Sep 2026): "kelas/jilid di PTPT tidak konsisten, ada yg 1-6 ada yg kelas 1-kelas 6.
// yg benar Kelas 1-6."
//
// Yang dijaga tes ini, berurutan dari yang paling gampang terlanggar:
//   1. angka telanjang di master PTPT ('1'..'6') TIDAK boleh sampai ke layar;
//   2. lembaga yang label masternya memang bernama ('Level ½ Juz') TIDAK ikut diganti —
//      kalau aturannya ditulis sebagai "selalu pakai daftar cadangan", Pra PTPT akan
//      mundur ke label lama 'Level 1' dan itu bug yang lebih besar dari yang diperbaiki;
//   3. kelas asing tetap tampil apa adanya, bukan ditebak.
import { describe, it, expect } from 'vitest'
import { labelJenjang, jenjangLembagaLabel, kelasSama } from '@/utils/jenjangQiraati'

// Cermin data sungguhan: PTPT ber-kelas_list ANGKA, Pra PTPT ber-label bernama.
const MASTER = [
  { lembaga: 'PTPT', kelas_list: ['1', '2', '3', '4', '5', '6'] },
  {
    lembaga: 'Pra PTPT',
    kelas_list: ['Level ½ Juz', 'Level 1 Juz', 'Level 2 Juz', 'Level 2½ Juz', 'Level 3 Juz']
  }
]

describe('labelJenjang — PTPT selalu "Kelas N"', () => {
  it('KUNCI: angka telanjang dari master jadi "Kelas N"', () => {
    expect(labelJenjang('PTPT', '1', MASTER)).toBe('Kelas 1')
    expect(labelJenjang('PTPT', '6', MASTER)).toBe('Kelas 6')
  })

  it('yang sudah "Kelas N" tetap "Kelas N" (tak jadi "Kelas Kelas N")', () => {
    expect(labelJenjang('PTPT', 'Kelas 3', MASTER)).toBe('Kelas 3')
  })

  it('ejaan sembarangan dari data lama ikut dirapikan', () => {
    expect(labelJenjang('PTPT', 'kelas 4', MASTER)).toBe('Kelas 4')
    expect(labelJenjang('PTPT', 'KELAS 4', MASTER)).toBe('Kelas 4')
    expect(labelJenjang('PTPT', '  2  ', MASTER)).toBe('Kelas 2')
  })

  it('tanpa master sekalipun hasilnya sama — daftar cadangan sudah "Kelas N"', () => {
    expect(labelJenjang('PTPT', '5', [])).toBe('Kelas 5')
    expect(labelJenjang('PTPT', '5', null)).toBe('Kelas 5')
  })

  it('nama lembaga tak peka huruf besar/kecil', () => {
    expect(labelJenjang('ptpt', '2', MASTER)).toBe('Kelas 2')
  })
})

describe('labelJenjang — lembaga lain TIDAK boleh ikut terseret', () => {
  it('KUNCI: label master Pra PTPT menang, bukan daftar cadangan lama', () => {
    expect(labelJenjang('Pra PTPT', 'Level ½ Juz', MASTER)).toBe('Level ½ Juz')
    // Data lama menyimpan 'Level 5' → dijodohkan lewat INDEX ke label master sekarang.
    expect(labelJenjang('Pra PTPT', 'Level 5', MASTER)).toBe('Level 3 Juz')
    expect(labelJenjang('Pra PTPT', 'Level 1', MASTER)).toBe('Level ½ Juz')
  })

  it('TPQ tetap "Jilid …" apa adanya', () => {
    expect(labelJenjang('TPQ Pagi', 'Jilid 2A', [])).toBe('Jilid 2A')
    expect(labelJenjang('TPQ Sore', 'KPI', [])).toBe('KPI')
  })

  it('PPPH memakai label kitabnya sendiri', () => {
    expect(labelJenjang('PPPH', 'Level 2 (Riyadhus Sholihin)', [])).toBe(
      'Level 2 (Riyadhus Sholihin)'
    )
  })
})

describe('labelJenjang — batas: yang tak dikenali tidak ditebak', () => {
  it('kelas kosong → kosong', () => {
    expect(labelJenjang('PTPT', '', MASTER)).toBe('')
    expect(labelJenjang('PTPT', null, MASTER)).toBe('')
    expect(labelJenjang('PTPT', undefined, MASTER)).toBe('')
  })

  it('kelas di luar daftar tampil apa adanya (cuma dirapikan awalannya)', () => {
    expect(labelJenjang('PTPT', 'Kelas 9', MASTER)).toBe('Kelas 9')
    expect(labelJenjang('PTPT', '9', MASTER)).toBe('9')
    expect(labelJenjang('SDI', 'VII', MASTER)).toBe('VII')
  })

  it('lembaga kosong tak bikin meledak', () => {
    expect(labelJenjang('', 'Kelas 1', MASTER)).toBe('Kelas 1')
    expect(labelJenjang(null, '1', MASTER)).toBe('1')
  })
})

describe('jenjangLembagaLabel — dropdown menampilkan yang tersimpan', () => {
  it('PTPT jadi Kelas 1..Kelas 6', () => {
    expect(jenjangLembagaLabel('PTPT', MASTER)).toEqual([
      'Kelas 1',
      'Kelas 2',
      'Kelas 3',
      'Kelas 4',
      'Kelas 5',
      'Kelas 6'
    ])
  })

  it('Pra PTPT tetap label masternya', () => {
    expect(jenjangLembagaLabel('Pra PTPT', MASTER)[0]).toBe('Level ½ Juz')
  })

  it('lembaga tak dikenal → daftar kosong, bukan error', () => {
    expect(jenjangLembagaLabel('Entah', MASTER)).toEqual([])
  })
})

describe('kelasSama — penyaring tak boleh kehilangan separuh daftar', () => {
  it('dua ejaan satu kelas dianggap sama', () => {
    expect(kelasSama('1', 'Kelas 1')).toBe(true)
    expect(kelasSama('Kelas 1', 'kelas 1')).toBe(true)
    expect(kelasSama('Kelas 1', '  1 ')).toBe(true)
  })

  it('kelas berbeda tetap berbeda', () => {
    expect(kelasSama('Kelas 1', 'Kelas 2')).toBe(false)
    expect(kelasSama('1', '2')).toBe(false)
  })

  it('kosong tak pernah cocok dengan apa pun (termasuk kosong)', () => {
    expect(kelasSama('', '')).toBe(false)
    expect(kelasSama('', 'Kelas 1')).toBe(false)
    expect(kelasSama(null, undefined)).toBe(false)
  })
})
