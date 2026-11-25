import { describe, it, expect } from 'vitest'
import { kunciJk, saringJk } from '@/utils/jenisKelamin'

describe('kunciJk', () => {
  it('mengenali kode dan kata lengkap', () => {
    expect(kunciJk('L')).toBe('L')
    expect(kunciJk('laki-laki')).toBe('L')
    expect(kunciJk('P')).toBe('P')
    expect(kunciJk(' Perempuan ')).toBe('P')
    expect(kunciJk('Wanita')).toBe('P')
  })
  it('kosong/tak dikenal = kosong', () => {
    expect(kunciJk('')).toBe('')
    expect(kunciJk(null)).toBe('')
    expect(kunciJk('-')).toBe('')
  })
})

describe('saringJk', () => {
  const daftar = [{ jk: 'L' }, { jk: 'P' }, { jk: 'Perempuan' }, { jk: '' }]
  it('tanpa pilihan = semua', () => {
    expect(saringJk(daftar, '')).toHaveLength(4)
  })
  it('menyaring per jenis kelamin, data kosong tak ikut', () => {
    expect(saringJk(daftar, 'L')).toHaveLength(1)
    expect(saringJk(daftar, 'P')).toHaveLength(2)
  })
})
