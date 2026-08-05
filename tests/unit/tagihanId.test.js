import { describe, it, expect } from 'vitest'
import { kodeBulan, idTagihanAuto } from '@/utils/tagihanId'

// Id tagihan otomatis adalah KONTRAK antara tombol Generate (app) dan cron bulanan (edge
// function, yang menyusunnya inline dengan pola sama). Kalau salah satu sisi berubah
// bentuk, baris "yang sama" jadi ber-id berbeda -> satu santri menerima DUA tagihan untuk
// bulan yang sama. Tes ini mengunci bentuknya, bukan sekadar memanggil fungsinya.

describe('kodeBulan', () => {
  it('YYYYMM dengan bulan selalu dua digit', () => {
    expect(kodeBulan(new Date(2026, 7, 5))).toBe('202608') // Agustus
    expect(kodeBulan(new Date(2026, 0, 31))).toBe('202601')
    expect(kodeBulan(new Date(2026, 11, 1))).toBe('202612')
  })

  it('tanggal tak valid -> string kosong, bukan "NaNNaN"', () => {
    expect(kodeBulan(new Date('bukan-tanggal'))).toBe('')
  })
})

describe('idTagihanAuto', () => {
  it('bentuknya persis seperti yang ditulis cron: tagihan_<santri>_<jenis>_<periode>', () => {
    expect(idTagihanAuto('s1', 'syahriyah_sekolah', '202608')).toBe(
      'tagihan_s1_syahriyah_sekolah_202608'
    )
  })

  it('periode tahunan memakai awalan TA', () => {
    expect(idTagihanAuto('s1', 'daftar_ulang', 'TA2026')).toBe('tagihan_s1_daftar_ulang_TA2026')
  })

  it('bulan yang berbeda menghasilkan id berbeda — dedup per bulan bergantung pada ini', () => {
    const a = idTagihanAuto('s1', 'j1', kodeBulan(new Date(2026, 6, 1)))
    const b = idTagihanAuto('s1', 'j1', kodeBulan(new Date(2026, 7, 1)))
    expect(a).not.toBe(b)
  })

  it('santri berbeda / jenis berbeda tak pernah bertabrakan', () => {
    const ids = new Set([
      idTagihanAuto('s1', 'j1', '202608'),
      idTagihanAuto('s2', 'j1', '202608'),
      idTagihanAuto('s1', 'j2', '202608')
    ])
    expect(ids.size).toBe(3)
  })
})
