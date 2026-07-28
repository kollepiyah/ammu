import { describe, it, expect } from 'vitest'
import { todayJakarta } from '@/utils/format'

// Audit B2: tanggal transaksi POS dulu = new Date().toISOString().split('T')[0] (UTC)
// → mundur 1 hari untuk transaksi dini hari WIB. todayJakarta pakai zona Asia/Jakarta.
describe('todayJakarta (tanggal kalender WIB)', () => {
  it('transaksi dini hari WIB TIDAK mundur 1 hari (bug UTC lama)', () => {
    // 2026-07-29T19:00:00Z = 2026-07-30 02:00 WIB
    const d = new Date('2026-07-29T19:00:00Z')
    expect(d.toISOString().slice(0, 10)).toBe('2026-07-29') // bukti perilaku UTC lama
    expect(todayJakarta(d)).toBe('2026-07-30') // WIB benar
  })

  it('siang hari WIB = tanggal UTC sama', () => {
    // 2026-07-29T10:00:00Z = 2026-07-29 17:00 WIB
    expect(todayJakarta(new Date('2026-07-29T10:00:00Z'))).toBe('2026-07-29')
  })

  it('batas tengah malam WIB (17:00 UTC = 00:00 WIB besok)', () => {
    expect(todayJakarta(new Date('2026-07-28T17:00:00Z'))).toBe('2026-07-29')
  })

  it('akhir hari WIB (16:59 UTC = 23:59 WIB, masih hari sama)', () => {
    expect(todayJakarta(new Date('2026-07-29T16:59:59Z'))).toBe('2026-07-29')
  })

  it('tanpa argumen mengembalikan format YYYY-MM-DD', () => {
    expect(todayJakarta()).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('input invalid → string kosong', () => {
    expect(todayJakarta(new Date('bukan-tanggal'))).toBe('')
  })
})
