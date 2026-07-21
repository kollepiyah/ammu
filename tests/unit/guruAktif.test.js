// Kyai (22 Jul 2026): "nama abdullah musyaffa' dan beberapa nama guru lain (data
// lama) selalu muncul di dropdown pilih guru pengajar."
//
// Dua bug berbeda, satu akar: tak ada sumber tunggal penyaring status guru.
//   1. NaikKelasView.guruOptions & TesKenaikanView.guruOptionsFor menyaring LEMBAGA
//      saja — status tak pernah dicek.
//   2. CeremonialView memakai `status !== 'Non-Aktif'`, padahal string itu TAK PERNAH
//      ditulis siapa pun. Nilai asli: 'Aktif' (form) / 'aktif' (impor) / 'Tidak Aktif'.
import { describe, it, expect } from 'vitest'
import { isGuruAktif, guruAktifSaja } from '@/utils/guruScope'

describe('isGuruAktif', () => {
  it("'Aktif' (ditulis form guru) = aktif", () => {
    expect(isGuruAktif({ status: 'Aktif' })).toBe(true)
  })

  it("'aktif' huruf kecil (ditulis impor Excel) = aktif", () => {
    // Form dan impor menulis kapitalisasi BERBEDA — perbandingan wajib
    // case-insensitive, kalau tidak separuh guru hasil impor ikut hilang.
    expect(isGuruAktif({ status: 'aktif' })).toBe(true)
  })

  it("'Tidak Aktif' = NONAKTIF (ini nilai asli, bukan 'Non-Aktif')", () => {
    expect(isGuruAktif({ status: 'Tidak Aktif' })).toBe(false)
    expect(isGuruAktif({ status: 'tidak aktif' })).toBe(false)
  })

  it('status kosong/undefined dianggap AKTIF (data lama sebelum ada kolom status)', () => {
    expect(isGuruAktif({})).toBe(true)
    expect(isGuruAktif({ status: '' })).toBe(true)
    expect(isGuruAktif({ status: null })).toBe(true)
    expect(isGuruAktif(null)).toBe(true)
  })

  it('spasi berlebih tetap terbaca', () => {
    expect(isGuruAktif({ status: '  Aktif  ' })).toBe(true)
    expect(isGuruAktif({ status: ' Tidak Aktif ' })).toBe(false)
  })

  it("REGRESI: 'Non-Aktif' TIDAK dianggap aktif", () => {
    // Kalaupun ada data lama yang terlanjur memakai ejaan ini, ia harus tetap
    // tersaring — bukan lolos seperti pada penyaring lama.
    expect(isGuruAktif({ status: 'Non-Aktif' })).toBe(false)
  })
})

describe('guruAktifSaja', () => {
  const list = [
    { id: 'g1', nama: 'Aktif Form', status: 'Aktif' },
    { id: 'g2', nama: 'Aktif Impor', status: 'aktif' },
    { id: 'g3', nama: "Abdullah Musyaffa'", status: 'Tidak Aktif' },
    { id: 'g4', nama: 'Tanpa Status' },
    { id: 'g5', nama: 'Ejaan Lama', status: 'Non-Aktif' }
  ]

  it('SKENARIO KYAI: guru nonaktif tak ikut terbawa', () => {
    const nama = guruAktifSaja(list).map((g) => g.nama)
    expect(nama).not.toContain("Abdullah Musyaffa'")
    expect(nama).not.toContain('Ejaan Lama')
  })

  it('yang aktif & tanpa status tetap ikut', () => {
    expect(guruAktifSaja(list).map((g) => g.id)).toEqual(['g1', 'g2', 'g4'])
  })

  it('daftar kosong / null aman', () => {
    expect(guruAktifSaja([])).toEqual([])
    expect(guruAktifSaja(null)).toEqual([])
  })
})
