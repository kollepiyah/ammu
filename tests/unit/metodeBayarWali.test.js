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
