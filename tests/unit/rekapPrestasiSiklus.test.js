// Kyai (1 Sep 2026): "rekap prestasi itu adalah hasil dari bulan lalu, dan mengisinya
// adalah bulan lalu. misal sekarang september yg diisi adalah bulan agustus. nanti akhir
// september mengisi rekap prestasi september, dan maksimal pengisian adalah paling lambat
// tgl 5 setiap awal bulan."
//
// Kartu dasbor "Guru Belum Input" selama ini menagih BULAN BERJALAN, jadi tiap tanggal 1
// seluruh guru serentak dinyatakan belum input untuk bulan yang belum boleh diisi siapa
// pun — sementara pekerjaan yang benar-benar jatuh tempo (bulan lalu) tak terpantau.
//
// Yang dijaga tes ini: sasaran periodenya, batas tanggal 5, dan cakupan lembaga.
import { describe, it, expect } from 'vitest'
import {
  periodeRekapBerjalan,
  batasRekap,
  rekapTerlambat,
  punyaPrestasiBulanan,
  LEMBAGA_PRESTASI_BULANAN,
  TGL_BATAS_REKAP,
  periodeSebelumnya
} from '@/utils/prestasiBulanan'

describe('periodeRekapBerjalan — yang diisi adalah bulan LALU', () => {
  it('1 September → yang dikerjakan Agustus (contoh persis dari Kyai)', () => {
    expect(periodeRekapBerjalan('2026-09-01')).toBe('2026-08')
  })

  it('sasaran TIDAK berpindah setelah lewat tanggal 5 — hanya jadi terlambat', () => {
    // Ini yang membedakan "batas" dari "periode": tanggal 20 September masih Agustus
    // yang ditagih, bukan tiba-tiba September.
    expect(periodeRekapBerjalan('2026-09-06')).toBe('2026-08')
    expect(periodeRekapBerjalan('2026-09-30')).toBe('2026-08')
  })

  it('awal Januari menyeberang tahun', () => {
    expect(periodeRekapBerjalan('2026-01-03')).toBe('2025-12')
  })

  it('tanggal sampah → kosong, bukan menebak bulan', () => {
    expect(periodeRekapBerjalan('')).toBe('')
    expect(periodeRekapBerjalan('bukan-tanggal')).toBe('')
    expect(periodeRekapBerjalan(null)).toBe('')
  })

  it('sejalan dengan periodeSebelumnya (satu aturan, bukan dua)', () => {
    expect(periodeRekapBerjalan('2026-09-01')).toBe(periodeSebelumnya('2026-09'))
  })
})

describe('batasRekap — paling lambat tanggal 5 bulan BERIKUTNYA', () => {
  it('Agustus jatuh tempo 5 September', () => {
    expect(batasRekap('2026-08')).toBe('2026-09-05')
    expect(TGL_BATAS_REKAP).toBe(5)
  })

  it('Desember jatuh tempo 5 Januari tahun berikutnya', () => {
    expect(batasRekap('2026-12')).toBe('2027-01-05')
  })

  it('periode tak sah → kosong', () => {
    expect(batasRekap('2026-13')).toBe('')
    expect(batasRekap('2026')).toBe('')
    expect(batasRekap('')).toBe('')
  })
})

describe('rekapTerlambat', () => {
  it('tanggal 5 masih SEMPAT — batasnya "paling lambat tgl 5", bukan sebelum tgl 5', () => {
    expect(rekapTerlambat('2026-08', '2026-09-05')).toBe(false)
  })

  it('tanggal 1–4 jelas belum terlambat', () => {
    expect(rekapTerlambat('2026-08', '2026-09-01')).toBe(false)
    expect(rekapTerlambat('2026-08', '2026-09-04')).toBe(false)
  })

  it('tanggal 6 sudah terlambat', () => {
    expect(rekapTerlambat('2026-08', '2026-09-06')).toBe(true)
  })

  it('periode / tanggal tak sah → tidak menuduh terlambat', () => {
    expect(rekapTerlambat('', '2026-09-30')).toBe(false)
    expect(rekapTerlambat('2026-08', '')).toBe(false)
  })
})

describe('punyaPrestasiBulanan — hanya PTPT & PPPH', () => {
  it('PTPT & PPPH ikut', () => {
    expect(punyaPrestasiBulanan('PTPT')).toBe(true)
    expect(punyaPrestasiBulanan('PPPH')).toBe(true)
  })

  it('KUNCI: TPQ Pagi/Sore & Pra PTPT TIDAK — inilah yang dulu tertagih tanpa dasar', () => {
    expect(punyaPrestasiBulanan('TPQ Pagi')).toBe(false)
    expect(punyaPrestasiBulanan('TPQ Sore')).toBe(false)
    expect(punyaPrestasiBulanan('Pra PTPT')).toBe(false)
  })

  it('lembaga sekolah & kosong juga tidak', () => {
    expect(punyaPrestasiBulanan('SDI')).toBe(false)
    expect(punyaPrestasiBulanan('')).toBe(false)
    expect(punyaPrestasiBulanan(null)).toBe(false)
  })

  it('tak peduli huruf besar/kecil & spasi berlebih', () => {
    expect(punyaPrestasiBulanan('  ptpt ')).toBe(true)
    expect(punyaPrestasiBulanan('ppph')).toBe(true)
  })

  it('daftarnya tetap dua — kalau bertambah, RekapPrestasiView ikut berubah', () => {
    // Konstanta ini dipakai BERSAMA oleh RekapPrestasiView (tombol lembaga, filter,
    // scope santri, ekspor) dan kartu dasbor. Menambahnya di sini mengubah dua layar.
    expect(LEMBAGA_PRESTASI_BULANAN).toEqual(['PTPT', 'PPPH'])
  })
})
