import { describe, it, expect } from 'vitest'
import {
  susunDaftarAmalan,
  bersihkanAmalan,
  pecahTeksAmalan,
  ukuranArab,
  labelKategori
} from '@/utils/amalan'

describe('susunDaftarAmalan', () => {
  const L = [
    { id: '1', judul: 'Doa makan', kategori: 'doa', urutan: 2 },
    { id: '2', judul: 'Wirid pagi', kategori: 'wirid', urutan: 2 },
    { id: '3', judul: 'Wirid ba’da sholat', kategori: 'wirid', urutan: 1 },
    { id: '4', judul: 'Doa tidur', kategori: 'doa', urutan: 1 },
    { id: '5', judul: 'Tanpa kategori' }
  ]
  it('urut kategori (Wirid, Doa, …) lalu urutan', () => {
    expect(susunDaftarAmalan(L).map((a) => a.id)).toEqual(['3', '2', '4', '1', '5'])
  })
  it('saring per kategori', () => {
    expect(susunDaftarAmalan(L, 'doa').map((a) => a.id)).toEqual(['4', '1'])
    expect(susunDaftarAmalan(L, 'lainnya').map((a) => a.id)).toEqual(['5'])
  })
  it('label kategori', () => {
    expect(labelKategori('maulid')).toBe('Maulid')
    expect(labelKategori('aneh')).toBe('Lainnya')
  })
})

describe('bersihkanAmalan', () => {
  it('membuang bagian tanpa Arab, merapikan spasi, ulang hanya 2..1000', () => {
    const r = bersihkanAmalan({
      judul: '  Wirid  ',
      kategori: 'wirid',
      urutan: '3',
      bagian: [
        { arab: ' أَسْتَغْفِرُ اللهَ ', latin: 'Astaghfirullah ', arti: '', ulang: '3' },
        { arab: '   ', latin: 'kosong' },
        { arab: 'سُبْحَانَ اللهِ', ulang: '1' }
      ]
    })
    expect(r.ok).toBe(true)
    expect(r.nilai.judul).toBe('Wirid')
    expect(r.nilai.urutan).toBe(3)
    expect(r.nilai.aktif).toBe(true)
    expect(r.nilai.bagian).toEqual([
      { arab: 'أَسْتَغْفِرُ اللهَ', latin: 'Astaghfirullah', ulang: 3 },
      { arab: 'سُبْحَانَ اللهِ' }
    ])
  })
  it('judul & minimal satu bagian Arab wajib; kategori tak dikenal → lainnya', () => {
    expect(bersihkanAmalan({ judul: '', bagian: [{ arab: 'ا' }] }).ok).toBe(false)
    expect(bersihkanAmalan({ judul: 'X', bagian: [{ latin: 'a' }] }).ok).toBe(false)
    expect(
      bersihkanAmalan({ judul: 'X', kategori: '??', bagian: [{ arab: 'ا' }] }).nilai.kategori
    ).toBe('lainnya')
    expect(bersihkanAmalan({ judul: 'X', aktif: false, bagian: [{ arab: 'ا' }] }).nilai.aktif).toBe(
      false
    )
  })
})

describe('pecahTeksAmalan (tempel massal)', () => {
  it('pecah di baris kosong; Arab / Latin / arti dipisah otomatis', () => {
    const teks = [
      'أَسْتَغْفِرُ اللهَ الْعَظِيْمَ',
      'Astaghfirullahal ’adzim',
      'Aku memohon ampun kepada Allah Yang Maha Agung',
      '',
      'سُبْحَانَ اللهِ',
      'Maha Suci Allah',
      '',
      'catatan tanpa arab'
    ].join('\r\n')
    expect(pecahTeksAmalan(teks)).toEqual([
      {
        arab: 'أَسْتَغْفِرُ اللهَ الْعَظِيْمَ',
        latin: 'Astaghfirullahal ’adzim',
        arti: 'Aku memohon ampun kepada Allah Yang Maha Agung'
      },
      { arab: 'سُبْحَانَ اللهِ', arti: 'Maha Suci Allah' }
    ])
  })
})

describe('ukuranArab', () => {
  it('naik/turun 2 px dalam batas 20–48', () => {
    expect(ukuranArab(28, 1)).toBe(30)
    expect(ukuranArab(20, -1)).toBe(20)
    expect(ukuranArab(48, 1)).toBe(48)
  })
})
