// Kyai (14 Sep 2026, audit): tagihan yang sudah dibayar tak boleh dihapus langsung — baris
// pembayarannya tetap menunjuk tagihan itu, dan generate berikutnya akan menerbitkannya lagi
// dengan terbayar 0. Penjaganya satu fungsi; tes ini memastikan jalur baca lama (ekor jsonb
// `bayar`) ikut terhitung, karena justru tagihan lama yang paling sering dirapikan.
import { describe, it, expect } from 'vitest'
import { tagihanSudahDibayar } from '@/utils/tagihan'

describe('tagihanSudahDibayar', () => {
  it('kolom terbayar', () => {
    expect(tagihanSudahDibayar({ nominal: 90000, terbayar: 90000 })).toBe(true)
    expect(tagihanSudahDibayar({ nominal: 90000, terbayar: 10000 })).toBe(true)
    expect(tagihanSudahDibayar({ nominal: 90000, terbayar: 0 })).toBe(false)
  })
  it('ekor jsonb lama `bayar`/`dibayar` ikut terhitung', () => {
    expect(tagihanSudahDibayar({ nominal: 90000, terbayar: 0, bayar: 45000 })).toBe(true)
    expect(tagihanSudahDibayar({ nominal: 90000, dibayar: 1 })).toBe(true)
  })
  it('pembulatan dan baris kosong', () => {
    expect(tagihanSudahDibayar({ terbayar: 0.4 })).toBe(false)
    expect(tagihanSudahDibayar(null)).toBe(false)
    expect(tagihanSudahDibayar({})).toBe(false)
  })
})
