import { describe, it, expect } from 'vitest'
import {
  POS_UMUM,
  posDari,
  labelPos,
  cocokPos,
  opsiFilterPos,
  labelFilterPos
} from '@/utils/posDana'

// Kyai (5 Agu 2026): pos lain (Tabungan Wajib, Uang Buku, Uang Kegiatan) harus bisa
// dipisahkan dari Buku Induk agar laporan PDF-nya mudah. Filter ini yang memisahkannya,
// jadi salah satu arah saja bocor -> laporan kas umum ikut memuat dana terikat.

describe('posDari', () => {
  it('membaca tag pos, termasuk yang masih tinggal di ekor jsonb', () => {
    expect(posDari({ pos: 'kegiatan' })).toBe('kegiatan')
    expect(posDari({ data: { pos: 'buku' } })).toBe('buku')
  })

  it('baris tanpa tag = kas umum', () => {
    expect(posDari({})).toBe('')
    expect(posDari({ pos: '  ' })).toBe('')
    expect(posDari(null)).toBe('')
  })
})

describe('cocokPos', () => {
  const umum = { kategori: 'Syahriyah' }
  const kegiatan = { pos: 'kegiatan' }
  const buku = { pos: 'buku' }

  it('filter kosong -> semua baris lolos', () => {
    expect(cocokPos(umum, '')).toBe(true)
    expect(cocokPos(kegiatan, '')).toBe(true)
  })

  it('POS_UMUM -> HANYA baris tanpa tag (dana terikat tak boleh ikut kas umum)', () => {
    expect(cocokPos(umum, POS_UMUM)).toBe(true)
    expect(cocokPos(kegiatan, POS_UMUM)).toBe(false)
    expect(cocokPos(buku, POS_UMUM)).toBe(false)
  })

  it('pos tertentu -> hanya baris pos itu, kas umum TIDAK ikut', () => {
    expect(cocokPos(kegiatan, 'kegiatan')).toBe(true)
    expect(cocokPos(buku, 'kegiatan')).toBe(false)
    expect(cocokPos(umum, 'kegiatan')).toBe(false)
  })
})

describe('opsiFilterPos', () => {
  it('selalu memuat Semua + Kas Umum + tiga pos baku, walau datanya kosong', () => {
    const keys = opsiFilterPos([]).map((o) => o.key)
    expect(keys).toEqual(['', POS_UMUM, 'kegiatan', 'buku', 'tabungan_wajib'])
  })

  it('pos asing dari data ikut muncul — jangan sampai barisnya tak terjangkau filter', () => {
    const keys = opsiFilterPos([{ pos: 'wakaf' }, { pos: 'kegiatan' }]).map((o) => o.key)
    expect(keys).toContain('wakaf')
  })

  it('pos asing tidak digandakan walau muncul berkali-kali', () => {
    const keys = opsiFilterPos([{ pos: 'wakaf' }, { pos: 'wakaf' }]).map((o) => o.key)
    expect(keys.filter((k) => k === 'wakaf')).toHaveLength(1)
  })
})

describe('label', () => {
  it('pos baku memakai nama tampilannya', () => {
    expect(labelPos('tabungan_wajib')).toBe('Tabungan Wajib')
    expect(labelPos('')).toBe('Kas Umum')
  })

  it('pos tak dikenal dikembalikan apa adanya, bukan disembunyikan', () => {
    expect(labelPos('wakaf')).toBe('wakaf')
  })

  it('judul laporan tak menyebut pos saat filternya kosong', () => {
    expect(labelFilterPos('')).toBe('')
    expect(labelFilterPos('buku')).toBe('Uang Buku')
  })
})
