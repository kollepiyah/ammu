import { describe, it, expect } from 'vitest'
import { perluDikunci, tampilkanKunci, kunciSetelan, JEDA_KUNCI_MS } from '@/utils/kunciAplikasi'

describe('kunci aplikasi sidik jari', () => {
  it('dibuka ulang dengan kunci aktif & ada sesi → terkunci', () => {
    expect(perluDikunci({ aktif: true, adaSesi: true, dibukaUlang: true })).toBe(true)
  })
  it('kunci mati atau belum masuk → tak pernah terkunci', () => {
    expect(perluDikunci({ aktif: false, adaSesi: true, dibukaUlang: true })).toBe(false)
    expect(perluDikunci({ aktif: true, adaSesi: false, dibukaUlang: true })).toBe(false)
  })
  it('kembali dari latar: terkunci hanya bila ditinggal ≥ 3 menit', () => {
    const o = { aktif: true, adaSesi: true }
    expect(perluDikunci({ ...o, tersembunyiMs: JEDA_KUNCI_MS - 1 })).toBe(false)
    expect(perluDikunci({ ...o, tersembunyiMs: JEDA_KUNCI_MS })).toBe(true)
  })
  it('layar kunci tak pernah menutupi rute publik', () => {
    expect(tampilkanKunci({ terkunci: true, rutePublik: true })).toBe(false)
    expect(tampilkanKunci({ terkunci: true, rutePublik: false })).toBe(true)
    expect(tampilkanKunci({ terkunci: false, rutePublik: false })).toBe(false)
  })
  it('setelan per pengguna', () => {
    expect(kunciSetelan('g1')).not.toBe(kunciSetelan('g2'))
  })
})
