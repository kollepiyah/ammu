import { describe, it, expect } from 'vitest'
import { caraBayar, sisaWaktu, batasKode, statusKode, kodeUji } from '@/utils/caraBayarMidtrans'
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

  it('batas waktu kode: expiry_at Core API; Snap/kode lama dari created_at (VA sehari, QR sejam)', () => {
    expect(batasKode({ expiry_at: '2026-11-04T11:00:00Z' })).toBe(Date.parse('2026-11-04T11:00:00Z'))
    const dibuat = '2026-11-04T10:00:00Z'
    expect(batasKode({ sumber: 'midtrans', kanal: 'bsi', jenis: 'va', created_at: dibuat })).toBe(
      Date.parse('2026-11-05T10:00:00Z')
    )
    expect(batasKode({ sumber: 'midtrans', kanal: 'qris', created_at: dibuat })).toBe(
      Date.parse('2026-11-04T11:00:00Z')
    )
    // VA BMT: nomor tetap, tak punya masa berlaku
    expect(batasKode({ created_at: dibuat })).toBeNaN()
  })

  it('kode pending yang lewat batas tampil kedaluwarsa (kode sandbox lama sesudah pindah production)', () => {
    const now = Date.parse('2026-11-09T08:00:00Z')
    const lama = { sumber: 'midtrans', status: 'pending', jenis: 'va', expiry_at: '2026-11-05T14:00:00Z' }
    expect(statusKode(lama, now)).toBe('kadaluarsa')
    expect(statusKode({ ...lama, expiry_at: '2026-11-10T08:00:00Z' }, now)).toBe('pending')
    expect(statusKode({ ...lama, status: 'terbayar' }, now)).toBe('terbayar')
    expect(statusKode({ status: 'pending', created_at: '2026-07-01T00:00:00Z' }, now)).toBe('pending') // BMT
  })

  it('kode uji = dibuat dengan kunci sandbox', () => {
    expect(kodeUji({ sumber: 'midtrans', sandbox: true })).toBe(true)
    expect(kodeUji({ sandbox: 'true' })).toBe(true)
    expect(kodeUji({ sumber: 'midtrans', sandbox: false })).toBe(false)
    expect(kodeUji({ sumber: 'bmt' })).toBe(false)
    expect(kodeUji(null)).toBe(false)
  })
})
