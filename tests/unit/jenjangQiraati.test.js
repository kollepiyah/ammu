// Kyai (22 Jul 2026): "jika santri diajukan tes di jenjang/level/jilid/kelas paling
// akhir di lembaga tersebut maka naiknya adalah ke lembaga selanjutnya. urutannya
// lembaga qiraati ini: 1. TPQ Pagi/Sore 2. Pra PTPT 3. PTPT 4. PPPH … misal dia di
// akhir level pra PTPT harusnya naik tujuannya adalah PTPT."
//
// Fixture di bawah = SALINAN bentuk data sungguhan (diambil dari master/lembaga &
// settings.kartuKenaikanSchema): perhatikan label master ('Level 3 Juz') dan label
// kartu ('Level 5 (3 Juz)') memang BEDA BENTUK — itulah kenapa penjodohannya lewat
// index, bukan lewat label.
import { describe, it, expect } from 'vitest'
import {
  lembagaBerikutnya,
  jenjangLembaga,
  indexJenjang,
  isJenjangTerakhir,
  itemJenjang,
  isItemTerakhir,
  menamatkanLembaga,
  tujuanNaikLembaga
} from '@/utils/jenjangQiraati'

const LEMBAGA = [
  { lembaga: 'TPQ Pagi', kelas_list: ['Jilid 1A', 'Jilid 1B', 'KPI', 'Persiapan Khotaman'] },
  { lembaga: 'TPQ Sore', kelas_list: ['Jilid 1A', 'Jilid 1B', 'KPI', 'Persiapan Khotaman'] },
  {
    lembaga: 'Pra PTPT',
    kelas_list: ['Level ½ Juz', 'Level 1 Juz', 'Level 1½ Juz', 'Level 2 Juz', 'Level 3 Juz']
  },
  { lembaga: 'PTPT', kelas_list: ['1', '2', '3', '4', '5', '6'] },
  {
    lembaga: 'PPPH',
    kelas_list: ["Arba'in Nawawi", 'Riyadhus Sholihin', 'Shahih Bukhari', 'Shahih Muslim']
  }
]

const SETTINGS = {
  kartuKenaikanSchema: {
    'Pra PTPT': {
      itemHeader: 'Khotam',
      kelasList: [
        {
          id: 'lvl_1',
          label: 'Level 1 (½ Juz)',
          items: [{ label: 'I' }, { label: 'II' }, { label: 'III' }]
        },
        {
          id: 'lvl_2',
          label: 'Level 2 (1 Juz)',
          items: [{ label: 'I' }, { label: 'II' }, { label: 'III' }]
        },
        {
          id: 'lvl_3',
          label: 'Level 3 (1½ Juz)',
          items: [{ label: 'I' }, { label: 'II' }, { label: 'III' }]
        },
        {
          id: 'lvl_4',
          label: 'Level 4 (2 Juz)',
          items: [{ label: 'I' }, { label: 'II' }, { label: 'III' }]
        },
        {
          id: 'lvl_5',
          label: 'Level 5 (3 Juz)',
          // v.1.2.3 (Kyai 26 Jul 2026): Level 3 Juz khotam I..XI (dulu I..IX).
          items: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'].map((l) => ({
            label: l
          }))
        }
      ]
    },
    PPPH: {
      itemHeader: 'Kitab',
      kelasList: [
        { id: 'lvl_1', label: "Level 1 (Arba'in Nawawi)", items: [{ label: 'Khatam' }] },
        { id: 'lvl_2', label: 'Level 2 (Riyadhus Sholihin)', items: [{ label: 'Khatam' }] },
        { id: 'lvl_3', label: 'Level 3 (Shahih Bukhari)', items: [{ label: 'Khatam' }] },
        { id: 'lvl_4', label: 'Level 4 (Shahih Muslim)', items: [{ label: 'Khatam' }] }
      ]
    }
  }
}
const CTX = { lembagaList: LEMBAGA, settings: SETTINGS }

describe('lembagaBerikutnya — rantai qiraati', () => {
  it('urutan sesuai keputusan Kyai', () => {
    expect(lembagaBerikutnya('TPQ Pagi')).toBe('Pra PTPT')
    expect(lembagaBerikutnya('TPQ Sore')).toBe('Pra PTPT')
    expect(lembagaBerikutnya('Pra PTPT')).toBe('PTPT')
    expect(lembagaBerikutnya('PTPT')).toBe('PPPH')
  })
  it('PPPH ujung rantai; lembaga non-qiraati tak punya lanjutan', () => {
    expect(lembagaBerikutnya('PPPH')).toBe('')
    expect(lembagaBerikutnya('SDI')).toBe('')
    expect(lembagaBerikutnya('')).toBe('')
    expect(lembagaBerikutnya(null)).toBe('')
  })
})

describe('jenjangLembaga — daftar jenjang dari master', () => {
  it('master menang atas daftar hardcoded lama', () => {
    // Daftar lama Pra PTPT = Level 1..5; yang BENAR (dipakai santri) = Level ½ Juz dst.
    expect(jenjangLembaga('Pra PTPT', LEMBAGA)).toEqual([
      'Level ½ Juz',
      'Level 1 Juz',
      'Level 1½ Juz',
      'Level 2 Juz',
      'Level 3 Juz'
    ])
    expect(jenjangLembaga('PTPT', LEMBAGA)).toEqual(['1', '2', '3', '4', '5', '6'])
  })
  it('master kosong → jatuh ke daftar cadangan (perilaku lama)', () => {
    expect(jenjangLembaga('Pra PTPT', [])).toEqual([
      'Level 1',
      'Level 2',
      'Level 3',
      'Level 4',
      'Level 5'
    ])
    expect(jenjangLembaga('PTPT', null)[0]).toBe('Kelas 1')
  })
  it('lembaga tak dikenal → []', () => {
    expect(jenjangLembaga('Entah', LEMBAGA)).toEqual([])
    expect(jenjangLembaga('', LEMBAGA)).toEqual([])
  })
})

describe('indexJenjang — toleran bentuk lama', () => {
  const ptpt = ['1', '2', '3', '4', '5', '6']
  it('cocok persis', () => {
    expect(indexJenjang(ptpt, '3')).toBe(2)
  })
  it('"Kelas 3" ≡ "3" (data PTPT memuat dua-duanya)', () => {
    expect(indexJenjang(ptpt, 'Kelas 3')).toBe(2)
  })
  it('tak ketemu → -1', () => {
    expect(indexJenjang(ptpt, 'Level 9')).toBe(-1)
    expect(indexJenjang(ptpt, '')).toBe(-1)
    expect(indexJenjang(null, '3')).toBe(-1)
  })
})

describe('isJenjangTerakhir', () => {
  it('Pra PTPT: hanya "Level 3 Juz" yang terakhir', () => {
    expect(isJenjangTerakhir('Pra PTPT', 'Level 3 Juz', LEMBAGA)).toBe(true)
    expect(isJenjangTerakhir('Pra PTPT', 'Level 2 Juz', LEMBAGA)).toBe(false)
    expect(isJenjangTerakhir('Pra PTPT', 'Level ½ Juz', LEMBAGA)).toBe(false)
  })
  it('PTPT: kelas 6 (juga bentuk "Kelas 6")', () => {
    expect(isJenjangTerakhir('PTPT', '6', LEMBAGA)).toBe(true)
    expect(isJenjangTerakhir('PTPT', 'Kelas 6', LEMBAGA)).toBe(true)
    expect(isJenjangTerakhir('PTPT', '5', LEMBAGA)).toBe(false)
  })
  it('TPQ: Persiapan Khotaman', () => {
    expect(isJenjangTerakhir('TPQ Pagi', 'Persiapan Khotaman', LEMBAGA)).toBe(true)
    expect(isJenjangTerakhir('TPQ Pagi', 'KPI', LEMBAGA)).toBe(false)
  })
})

describe('itemJenjang — blok kartu dijodohkan lewat INDEX', () => {
  it('label master beda bentuk dari label kartu, tetap ketemu', () => {
    // 'Level 3 Juz' (master, index 4) ↔ 'Level 5 (3 Juz)' (kartu, index 4)
    expect(itemJenjang('Pra PTPT', 'Level 3 Juz', CTX)).toEqual([
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
      'X',
      'XI'
    ])
    expect(itemJenjang('Pra PTPT', 'Level ½ Juz', CTX)).toEqual(['I', 'II', 'III'])
  })
  it('PTPT pakai skema bawaan: kelas 6 → Juz 26..30', () => {
    expect(itemJenjang('PTPT', '6', CTX)).toEqual([
      'Juz 26',
      'Juz 27',
      'Juz 28',
      'Juz 29',
      'Juz 30'
    ])
  })
})

describe('menamatkanLembaga — DUA syarat, bukan satu', () => {
  const ajuan = (o) => ({ lembaga: 'Pra PTPT', kelas_asal: 'Level 3 Juz', jenis: 'khotam', ...o })

  it('KASUS KYAI: Level 3 Juz + Khotam XI → menamatkan Pra PTPT', () => {
    expect(menamatkanLembaga(ajuan({ target: 'Khotam XI' }), CTX)).toBe(true)
    expect(tujuanNaikLembaga(ajuan({ target: 'Khotam XI' }), CTX)).toEqual({
      lembaga: 'PTPT',
      kelas: '1'
    })
  })

  it('jenjang terakhir TAPI khotam belum terakhir (IX/V) → tetap di Pra PTPT', () => {
    expect(menamatkanLembaga(ajuan({ target: 'Khotam IX' }), CTX)).toBe(false)
    expect(menamatkanLembaga(ajuan({ target: 'Khotam V' }), CTX)).toBe(false)
    expect(tujuanNaikLembaga(ajuan({ target: 'Khotam V' }), CTX)).toBe(null)
  })

  it('khotam terakhir TAPI belum jenjang terakhir → tetap di Pra PTPT', () => {
    const a = ajuan({ kelas_asal: 'Level 2 Juz', target: 'Khotam III' })
    expect(menamatkanLembaga(a, CTX)).toBe(false)
  })

  it('PTPT: kelas 6 + Juz 30 → PPPH', () => {
    const a = { lembaga: 'PTPT', kelas_asal: '6', jenis: 'juz', target: 'Juz 30' }
    expect(menamatkanLembaga(a, CTX)).toBe(true)
    expect(tujuanNaikLembaga(a, CTX)).toEqual({ lembaga: 'PPPH', kelas: "Arba'in Nawawi" })
  })

  it('PTPT: kelas 6 tapi baru Juz 27 → belum tamat', () => {
    expect(
      menamatkanLembaga({ lembaga: 'PTPT', kelas_asal: '6', jenis: 'juz', target: 'Juz 27' }, CTX)
    ).toBe(false)
  })

  it('TPQ tanpa rincian item: Persiapan Khotaman → Pra PTPT', () => {
    const a = { lembaga: 'TPQ Sore', kelas_asal: 'Persiapan Khotaman', target: 'Khotaman' }
    expect(menamatkanLembaga(a, CTX)).toBe(true)
    expect(tujuanNaikLembaga(a, CTX)).toEqual({ lembaga: 'Pra PTPT', kelas: 'Level ½ Juz' })
  })

  it('PPPH ujung rantai — tak pernah pindah lembaga', () => {
    const a = { lembaga: 'PPPH', kelas_asal: 'Shahih Muslim', target: 'Khatam' }
    expect(menamatkanLembaga(a, CTX)).toBe(false)
    expect(tujuanNaikLembaga(a, CTX)).toBe(null)
  })

  it('input kosong/rusak → false / null (bukan lempar)', () => {
    expect(menamatkanLembaga(null, CTX)).toBe(false)
    expect(menamatkanLembaga({}, CTX)).toBe(false)
    expect(tujuanNaikLembaga({ lembaga: 'Pra PTPT' }, CTX)).toBe(null)
    expect(isItemTerakhir('Pra PTPT', 'Level 3 Juz', '', CTX)).toBe(false)
  })
})
