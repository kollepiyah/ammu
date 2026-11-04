import { describe, it, expect } from 'vitest'
import { caraBayar, sisaWaktu } from '@/utils/caraBayarMidtrans'
import { KANAL_MIDTRANS } from '@/utils/biayaMidtrans'

describe('caraBayarMidtrans', () => {
  it('setiap kanal yang tampil di Ammu (core) punya langkah bayar', () => {
    for (const k of KANAL_MIDTRANS.filter((x) => x.core)) expect(caraBayar(k.id).length).toBeGreaterThan(0)
    expect(caraBayar('bsi')).toEqual([]) // BSI lewat jendela Midtrans
  })

  it('hitung mundur', () => {
    const now = Date.parse('2026-11-04T10:00:00Z')
    expect(sisaWaktu('2026-11-04T10:59:05Z', now)).toEqual({ habis: false, teks: '00:59:05' })
    expect(sisaWaktu('2026-11-06T11:00:00Z', now)).toEqual({ habis: false, teks: '2 hari 01:00:00' })
    expect(sisaWaktu('2026-11-04T09:00:00Z', now)).toEqual({ habis: true, teks: '00:00:00' })
    expect(sisaWaktu('', now)).toEqual({ habis: false, teks: '' })
  })
})
