// Cara bayar wali (Kyai, 4 Nov 2026): transfer manual dihapus, BMT disembunyikan selama
// mati, Midtrans (VA + QRIS) "Segera hadir" sampai tersambung.
import { describe, it, expect } from 'vitest'
import { metodeBayarWali, adaMetodeBayarAktif } from '@/utils/metodeBayarWali'

describe('metodeBayarWali', () => {
  it('BMT mati → tanpa VA BMT, tanpa transfer, tak ada yang aktif', () => {
    const m = metodeBayarWali({ bmt_aktif: false })
    expect(m.map((x) => x.id)).toEqual(['midtrans_va', 'qris'])
    expect(m.some((x) => x.id === 'transfer')).toBe(false)
    expect(adaMetodeBayarAktif({ bmt_aktif: false })).toBe(false)
    expect(adaMetodeBayarAktif(null)).toBe(false)
  })

  it('BMT dinyalakan lagi → VA BMT muncul dan aktif', () => {
    const s = { bmt_aktif: true, bmt_nama: 'BMT PETA' }
    expect(metodeBayarWali(s)[0]).toMatchObject({ id: 'va', active: true })
    expect(adaMetodeBayarAktif(s)).toBe(true)
  })
})

describe('metodeBayarWali — Midtrans', () => {
  it('midtrans_aktif → VA bank & QRIS aktif, mengikuti kanal yang dibuka', () => {
    const semua = metodeBayarWali({ midtrans_aktif: true })
    expect(semua.find((m) => m.id === 'midtrans_va')).toMatchObject({ active: true })
    expect(semua.find((m) => m.id === 'midtrans_va').desc).toMatch(
      /^BRI · BNI · BCA · BSI · Mandiri/
    )
    expect(semua.find((m) => m.id === 'qris').active).toBe(true)
    const hanyaQris = metodeBayarWali({ midtrans_aktif: true, midtrans_kanal: ['qris'] })
    expect(hanyaQris.find((m) => m.id === 'midtrans_va').active).toBe(false)
    expect(adaMetodeBayarAktif({ midtrans_aktif: true, midtrans_kanal: ['qris'] })).toBe(true)
  })

  it('midtrans mati → tetap "segera hadir"', () => {
    expect(adaMetodeBayarAktif({ midtrans_aktif: false, midtrans_kanal: ['bri'] })).toBe(false)
  })
})
