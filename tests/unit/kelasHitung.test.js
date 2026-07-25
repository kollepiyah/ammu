// v.1.2.4 (Kyai 25 Jul 2026): "kalau guru pagi/sore berbeda maka sesuaikan dg data
// santri tapi yg dihitung tetap 1 kelas dari guru pasangan." + "santri ngaji pagi saja
// (guru sore dikosongkan) jangan jadi kelas sendiri."
//
// Aturan yang dijaga di sini: 1 kelas = pasangan guru (pagi+sore). Santri PAGI-SAJA /
// SORE-SAJA ditempelkan ke kelas pasangan yang berbagi guru shift-nya, jadi tak
// terhitung/terpisah sebagai kelas sendiri. shift_ngaji ('pagi'|'sore'|'pagi_sore')
// otoritatif atas kolom guru yang terisi.
import { describe, it, expect } from 'vitest'
import {
  shiftNgajiOf,
  kelasKeyQiraati,
  buildResolverQiraati,
  hitungKelas,
  hitungKelasLembaga
} from '@/utils/kelasHitung'

const S = (o) => ({ aktif: true, lembaga: 'TPQ', ...o })

describe('shiftNgajiOf', () => {
  it('field eksplisit menang', () => {
    expect(shiftNgajiOf({ shift_ngaji: 'pagi', guru_pagi: 'A', guru_sore: 'B' })).toBe('pagi')
    expect(shiftNgajiOf({ shift_ngaji: 'sore' })).toBe('sore')
  })
  it('tanpa field → disimpulkan dari guru terisi', () => {
    expect(shiftNgajiOf({ guru_pagi: 'A', guru_sore: 'B' })).toBe('pagi_sore')
    expect(shiftNgajiOf({ guru_pagi: 'A' })).toBe('pagi')
    expect(shiftNgajiOf({ guru_sore: 'B' })).toBe('sore')
  })
  it('legacy field `guru` → pagi; kosong total → ""', () => {
    expect(shiftNgajiOf({ guru: 'Ust. Lama' })).toBe('pagi')
    expect(shiftNgajiOf({})).toBe('')
  })
})

describe('kelasKeyQiraati menghormati shift', () => {
  it('shift=pagi membuang guru sore dari kunci', () => {
    expect(kelasKeyQiraati({ guru_pagi: 'A', guru_sore: 'B', shift_ngaji: 'pagi' })).toBe('a||')
  })
  it('pasangan penuh = pagi||sore', () => {
    expect(kelasKeyQiraati({ guru_pagi: 'A', guru_sore: 'B' })).toBe('a||b')
  })
})

describe('buildResolverQiraati — pagi-saja nempel ke pasangan', () => {
  it('SKENARIO KYAI: santri pagi-saja gabung ke kelas pasangan yg guru paginya sama', () => {
    const list = [
      S({ guru_pagi: 'Lailatul', guru_sore: 'Azuma' }), // pasangan penuh
      S({ guru_pagi: 'Lailatul', guru_sore: 'Azuma' }),
      S({ guru_pagi: 'Lailatul', guru_sore: '' }) // pagi-saja → harus nempel
    ]
    const keyOf = buildResolverQiraati(list)
    expect(keyOf(list[2])).toBe('lailatul||azuma')
    // → 1 kelas, bukan 2
    expect(hitungKelasLembaga(list, 'qiraati')).toBe(1)
  })

  it('sore-saja nempel ke pasangan yg guru sorenya sama', () => {
    const list = [
      S({ guru_pagi: 'A', guru_sore: 'B' }),
      S({ guru_sore: 'B' }) // sore-saja
    ]
    expect(hitungKelasLembaga(list, 'qiraati')).toBe(1)
  })

  it('pagi-saja TANPA pasangan cocok → tetap kelas sendiri (tak dipaksa)', () => {
    const list = [S({ guru_pagi: 'Solo', guru_sore: '' })]
    const keyOf = buildResolverQiraati(list)
    expect(keyOf(list[0])).toBe('solo||')
    expect(hitungKelasLembaga(list, 'qiraati')).toBe(1)
  })

  it('nama guru sama di 2 lembaga TIDAK salah gabung', () => {
    const list = [
      S({ lembaga: 'TPQ Pagi', guru_pagi: 'X', guru_sore: 'Y' }),
      S({ lembaga: 'TPQ Sore', guru_pagi: 'X', guru_sore: '' }) // beda lembaga
    ]
    const keyOf = buildResolverQiraati(list)
    // santri lembaga TPQ Sore tak boleh menyerap pasangan lembaga TPQ Pagi
    expect(keyOf(list[1])).toBe('x||')
  })
})

describe('hitungKelas (KPI lintas lembaga)', () => {
  it('pasangan pagi+sore = 1; jenjang beda tak memecah; pagi-saja ikut nempel', () => {
    const list = [
      S({ kelas: '1', guru_pagi: 'Muin', guru_sore: 'Muin' }),
      S({ kelas: '2', guru_pagi: 'Muin', guru_sore: 'Muin' }), // jenjang beda, 1 kelas
      S({ lembaga: 'PTPT', guru_pagi: 'A', guru_sore: 'B' }),
      S({ lembaga: 'PTPT', guru_pagi: 'A', guru_sore: '' }) // pagi-saja → nempel
    ]
    expect(hitungKelas(list)).toBe(2) // TPQ(Muin) + PTPT(A&B)
  })

  it('santri non-aktif diabaikan', () => {
    const list = [S({ aktif: false, guru_pagi: 'A', guru_sore: 'B' })]
    expect(hitungKelas(list)).toBe(0)
  })
})
