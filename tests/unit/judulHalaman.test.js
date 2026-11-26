import { describe, it, expect } from 'vitest'
import { halamanBeranda, judulHalaman } from '@/utils/judulHalaman'

describe('top bar ringkas (Kyai 26 Nov 2026)', () => {
  it('hanya Beranda yang memakai top bar lengkap', () => {
    for (const p of ['/', '/umum', '/umum/', '/dashboard', '/beranda'])
      expect(halamanBeranda(p), p).toBe(true)
    for (const p of ['/umum/kiblat', '/notifikasi', '/keuangan'])
      expect(halamanBeranda(p), p).toBe(false)
  })
  it('judul singkat per jalur, awalan terpanjang menang', () => {
    expect(judulHalaman('/umum/kiblat')).toBe('Kiblat')
    expect(judulHalaman('/ibadah/sholat')).toBe('Jadwal Sholat')
    expect(judulHalaman('/notifikasi')).toBe('Notifikasi')
    expect(judulHalaman('/umum/wirid/am_123')).toBe('Kitab & Wirid')
    expect(judulHalaman('/ibadah/wirid')).toBe('Kitab & Wirid')
    expect(judulHalaman('/master-data/wirid/baru')).toBe('Edit Kitab & Wirid')
    expect(judulHalaman('/pembayaran/kode/dk-1')).toBe('Kode Bayar')
    expect(judulHalaman('/pembayaran')).toBe('Pembayaran')
    expect(judulHalaman('/santri/12/edit')).toBe('Data Santri')
    expect(judulHalaman('/tak-dikenal')).toBe('')
  })
})
