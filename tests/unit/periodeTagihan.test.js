import { describe, it, expect } from 'vitest'
import { periodeKode, mulaiTagihKode, bolehTerbitPeriode } from '@/utils/periodeTagihan'

// Kyai (5 Agu 2026): "ada santri yg dapat tagihan bulan juli, padahal saya mulanya
// agustus". Gerbang ini menolak tagihan sebelum bulan Mulai Tagih di SEMUA jalur
// penerbitan. Salah arah perbandingan = entah tagihan lama tetap lahir, atau tagihan
// bulan berjalan ikut tertolak dan pesantren tak menagih sama sekali.

describe('periodeKode', () => {
  it('membaca bentuk yang dipakai generate: "Juli 2026"', () => {
    expect(periodeKode('Juli 2026')).toBe('2026-07')
    expect(periodeKode('Agustus 2026')).toBe('2026-08')
    expect(periodeKode('DESEMBER 2026')).toBe('2026-12')
  })

  it('membaca bentuk kode', () => {
    expect(periodeKode('2026-07')).toBe('2026-07')
    expect(periodeKode('2026_7')).toBe('2026-07')
  })

  it('periode TAHUNAN tidak dinilai — gerbang ini soal bulan', () => {
    expect(periodeKode('TA 2026/2027')).toBe('')
  })

  it('bulan mustahil / nama asing / kosong -> tak bisa dinilai', () => {
    expect(periodeKode('2026-13')).toBe('')
    expect(periodeKode('Bulanan 2026')).toBe('')
    expect(periodeKode('')).toBe('')
    expect(periodeKode(null)).toBe('')
  })
})

describe('mulaiTagihKode', () => {
  it('membaca setelan bila bentuknya sah', () => {
    expect(mulaiTagihKode({ keuMulaiTagih: '2026-08' })).toBe('2026-08')
  })

  it('kosong/salah bentuk -> gerbang TIDAK aktif (jangan menebak batas)', () => {
    expect(mulaiTagihKode({})).toBe('')
    expect(mulaiTagihKode({ keuMulaiTagih: 'Agustus' })).toBe('')
    expect(mulaiTagihKode(null)).toBe('')
  })
})

describe('bolehTerbitPeriode', () => {
  it('sebelum bulan mulai -> DITOLAK (kasus Kyai: Juli padahal mulai Agustus)', () => {
    expect(bolehTerbitPeriode('Juli 2026', '2026-08')).toBe(false)
    expect(bolehTerbitPeriode('2026-07', '2026-08')).toBe(false)
    expect(bolehTerbitPeriode('Desember 2025', '2026-08')).toBe(false)
  })

  it('bulan mulai itu sendiri -> BOLEH (batasnya inklusif)', () => {
    expect(bolehTerbitPeriode('Agustus 2026', '2026-08')).toBe(true)
  })

  it('sesudah bulan mulai -> boleh, termasuk lintas tahun', () => {
    expect(bolehTerbitPeriode('September 2026', '2026-08')).toBe(true)
    expect(bolehTerbitPeriode('Januari 2027', '2026-08')).toBe(true)
  })

  it('setelan kosong -> semua boleh (jangan menghentikan penagihan karena setelan lupa diisi)', () => {
    expect(bolehTerbitPeriode('Juli 2026', '')).toBe(true)
    expect(bolehTerbitPeriode('Juli 2026', null)).toBe(true)
  })

  it('periode tahunan & periode tak terbaca -> boleh, jangan ditolak atas tebakan', () => {
    expect(bolehTerbitPeriode('TA 2026/2027', '2026-08')).toBe(true)
    expect(bolehTerbitPeriode('entah apa', '2026-08')).toBe(true)
  })
})
