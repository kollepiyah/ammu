// Kyai 17 Nov 2026: "kalau santri sore saja, begitu saya pilih guru harusnya langsung ke slot
// Sore, bukan saya klik Sore dulu." Aturan pemilihan slotnya ditulis sekali di sini.
import { describe, it, expect } from 'vitest'
import { slotGuruUntukShift } from '@/utils/kelasHitung'

describe('slotGuruUntukShift', () => {
  it('santri sore saja langsung mengisi slot sore, walau pagi masih kosong', () => {
    expect(slotGuruUntukShift('sore', {})).toBe('sore')
    expect(slotGuruUntukShift('sore', { guruPagi: '' })).toBe('sore')
  })

  it('santri pagi saja langsung mengisi slot pagi', () => {
    expect(slotGuruUntukShift('pagi', {})).toBe('pagi')
  })

  it('santri satu shift TIDAK tumpah ke slot sebelah saat slotnya sudah terisi', () => {
    expect(slotGuruUntukShift('sore', { guruSore: 'Indah' })).toBeNull()
    expect(slotGuruUntukShift('pagi', { guruPagi: 'Siti' })).toBeNull()
  })

  it('santri pagi-sore tetap berurutan: pagi dulu, lalu sore', () => {
    expect(slotGuruUntukShift('pagi_sore', {})).toBe('pagi')
    expect(slotGuruUntukShift('pagi_sore', { guruPagi: 'Siti' })).toBe('sore')
    expect(slotGuruUntukShift('pagi_sore', { guruPagi: 'Siti', guruSore: 'Indah' })).toBeNull()
  })

  it('shift kosong diperlakukan seperti pagi-sore (data lama)', () => {
    expect(slotGuruUntukShift('', {})).toBe('pagi')
    expect(slotGuruUntukShift(undefined, { guruPagi: 'Siti' })).toBe('sore')
  })

  it('nilai shift tak dikenal tidak membuatnya macet', () => {
    expect(slotGuruUntukShift('entah', {})).toBe('pagi')
  })

  it('spasi dan huruf besar tak mengubah hasil', () => {
    expect(slotGuruUntukShift('  SORE ', {})).toBe('sore')
    expect(slotGuruUntukShift('sore', { guruSore: '  Indah  ' })).toBeNull()
  })
})
