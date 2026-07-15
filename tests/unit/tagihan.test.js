import { describe, it, expect } from 'vitest'
import { terbayarDari, sisaTagihan, statusTagihan } from '../../vue-app/src/utils/tagihan.js'

describe('terbayarDari — kolom riil `terbayar` = sumber kebenaran', () => {
  it('pakai kolom terbayar bila terisi', () => {
    expect(terbayarDari({ nominal: 500000, terbayar: 300000 })).toBe(300000)
  })

  it('FALLBACK ke jsonb bayar bila kolom belum di-backfill (terbayar=0)', () => {
    // Baris lama: migrasi backfill belum jalan / ditulis klien lama. Tanpa fallback baris ini
    // tampak "belum bayar" padahal sudah bayar 300rb.
    expect(terbayarDari({ nominal: 500000, terbayar: 0, bayar: 300000 })).toBe(300000)
  })

  it('FALLBACK ke jsonb dibayar bila `bayar` tak ada', () => {
    expect(terbayarDari({ nominal: 500000, dibayar: 250000 })).toBe(250000)
  })

  it('kolom terbayar MENANG atas jsonb bila dua-duanya ada', () => {
    // sesudah backfill + tulis baru: kolom = kebenaran, jsonb = sisa peninggalan
    expect(terbayarDari({ terbayar: 400000, bayar: 300000 })).toBe(400000)
  })

  it('belum bayar sama sekali -> 0 (bukan NaN/undefined)', () => {
    expect(terbayarDari({ nominal: 500000, terbayar: 0 })).toBe(0)
    expect(terbayarDari({ nominal: 500000 })).toBe(0)
    expect(terbayarDari(null)).toBe(0)
    expect(terbayarDari({})).toBe(0)
  })

  it('nilai sampah jangan bocor jadi NaN', () => {
    expect(terbayarDari({ terbayar: 'xx', bayar: 'yy' })).toBe(0)
    expect(terbayarDari({ terbayar: null, bayar: undefined })).toBe(0)
  })

  it('string angka (dari jsonb) tetap terbaca', () => {
    expect(terbayarDari({ bayar: '300000' })).toBe(300000)
  })
})

describe('sisaTagihan', () => {
  it('nominal - terbayar', () => {
    expect(sisaTagihan({ nominal: 500000, terbayar: 300000 })).toBe(200000)
  })
  it('lunas -> 0', () => {
    expect(sisaTagihan({ nominal: 500000, terbayar: 500000 })).toBe(0)
  })
  it('lebih bayar TIDAK negatif', () => {
    expect(sisaTagihan({ nominal: 500000, terbayar: 600000 })).toBe(0)
  })
  it('ikut fallback jsonb', () => {
    expect(sisaTagihan({ nominal: 500000, bayar: 200000 })).toBe(300000)
  })
})

describe('statusTagihan', () => {
  it('belum / partial / lunas', () => {
    expect(statusTagihan(500000, 0)).toBe('belum')
    expect(statusTagihan(500000, 300000)).toBe('partial')
    expect(statusTagihan(500000, 500000)).toBe('lunas')
  })
  it('toleransi 0.5 (cermin ambang lama POS)', () => {
    expect(statusTagihan(500000, 499999.6)).toBe('lunas')
    expect(statusTagihan(500000, 499999)).toBe('partial')
  })
  it('nominal 0 + bayar 0 -> belum (jangan lunas palsu)', () => {
    expect(statusTagihan(0, 0)).toBe('belum')
  })
})
