// Tes penyaring Kelas Data Santri (label kanonik per lembaga) & bentuk simpan juz.
// Sapuan 15 Nov 2026: data PTPT memuat '1' dan 'Kelas 1' (penyaring memisahnya), dan
// form/Edit Kelas/impor Excel menyimpan juz telanjang ('5') di samping 'JUZ 5'.
import { describe, it, expect } from 'vitest'
import { labelKelasDuaSisi, cocokKelasSantri } from '@/utils/kelompokRombel'
import { juzSimpan, labelJuz } from '@/utils/format'

describe('labelKelasDuaSisi / cocokKelasSantri', () => {
  const a = { lembaga: 'PTPT', kelas: '1' }
  const b = { lembaga: 'PTPT', kelas: 'Kelas 1' }
  const tpq = { lembaga: 'TPQ Sore', kelas: 'Jilid 1A' }

  it("'1' dan 'Kelas 1' PTPT berlabel sama", () => {
    expect(labelKelasDuaSisi(a)).toEqual(['Kelas 1'])
    expect(labelKelasDuaSisi(b)).toEqual(['Kelas 1'])
  })
  it('memilih Kelas 1 memuat kedua ejaan, bukan jilid TPQ', () => {
    expect(cocokKelasSantri(a, 'Kelas 1')).toBe(true)
    expect(cocokKelasSantri(b, 'Kelas 1')).toBe(true)
    expect(cocokKelasSantri(tpq, 'Kelas 1')).toBe(false)
  })
  it('nilai mentah dari tautan lama tetap cocok', () => {
    expect(cocokKelasSantri(a, '1')).toBe(true)
  })
  it('sisi sekolah ikut, tanpa duplikat', () => {
    const s = { lembaga: 'PTPT', kelas: '2', lembaga_sekolah: 'SDI', kelas_sekolah: 'IV' }
    expect(labelKelasDuaSisi(s)).toEqual(['Kelas 2', 'IV'])
    expect(cocokKelasSantri(s, 'IV')).toBe(true)
  })
  it('master lembaga dihormati', () => {
    const L = [{ lembaga: 'Pra PTPT', kelas_list: ['Level ½ Juz', 'Level 1 Juz', 'Level 3 Juz'] }]
    expect(labelKelasDuaSisi({ lembaga: 'Pra PTPT', kelas: 'Level 3' }, L)).toEqual(['Level 3 Juz'])
  })
})

describe('juzSimpan', () => {
  it('angka telanjang & huruf besar/kecil → Juz n (v.1.5.0: huruf awal saja)', () => {
    expect(juzSimpan('5')).toBe('Juz 5')
    expect(juzSimpan(' juz 12 ')).toBe('Juz 12')
    expect(juzSimpan('JUZ 04')).toBe('Juz 4')
    expect(juzSimpan(30)).toBe('Juz 30')
  })
  it('kosong & strip dibiarkan', () => {
    expect(juzSimpan('')).toBe('')
    expect(juzSimpan(null)).toBe('')
    expect(juzSimpan('-')).toBe('-')
  })
  it('tanpa angka → huruf awal kapital', () => {
    expect(juzSimpan('khotam')).toBe('Khotam')
  })
  it('labelJuz: tampilan seragam dari nilai mentah', () => {
    expect(labelJuz('JUZ 5')).toBe('Juz 5')
    expect(labelJuz('05')).toBe('Juz 5')
    expect(labelJuz('-')).toBe('')
    expect(labelJuz('')).toBe('')
  })
})
