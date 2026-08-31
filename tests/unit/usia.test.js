// Kyai (31 Agu 2026): "perhitungan usia masuk tidak sesuai jika dihitung dari tgl lahir
// (tidak akurat)."
//
// Rumus yang keliru ada di composables/useSantriForm.js — `calcAgeAt` mengisi bulan dengan
// BULAN tanggal acuan apa adanya (`m = r.getMonth()`), bukan selisih bulan, dan tak pernah
// mengoreksi tanggal. Akibatnya "Usia Masuk" nyaris selalu meleset, dan selisihnya berubah-
// ubah tergantung bulan pendaftaran. Berkas ini mengunci utils/usia sebagai satu-satunya
// rumus umur di aplikasi, termasuk kasus-kasus yang dulu salah.
import { describe, it, expect } from 'vitest'
import { usiaKini, usiaPada } from '@/utils/usia'

describe('usiaPada — umur pada tanggal acuan', () => {
  it('KUNCI keluhan Kyai: lahir 20 Nov 2015, masuk 5 Jul 2020 = 4th 7bln', () => {
    // Rumus lama menjawab "5 thn 6 bln" (5 = selisih tahun mentah, 6 = indeks bulan Juli).
    expect(usiaPada('2015-11-20', '2020-07-05')).toBe('4th 7bln')
  })

  it('tanggal acuan sama persis dengan ulang tahun → bulan pas 0', () => {
    expect(usiaPada('2010-06-15', '2025-06-15')).toBe('15th 0bln')
    expect(usiaPada('2020-05-10', '2020-05-10')).toBe('0th 0bln')
  })

  it('sehari sebelum ulang tahun belum menambah tahun', () => {
    expect(usiaPada('2010-06-15', '2025-06-14')).toBe('14th 11bln')
  })

  it('ulang tahun sudah lewat di tahun yang sama', () => {
    expect(usiaPada('2010-06-15', '2025-09-15')).toBe('15th 3bln')
    expect(usiaPada('2010-06-15', '2025-09-14')).toBe('15th 2bln')
  })

  it('tanggal masuk bulan Januari tak lagi menghasilkan "0 bln" palsu', () => {
    // Ini gejala paling kentara rumus lama: acuan Januari → getMonth() 0 → selalu "0 bln".
    expect(usiaPada('2016-03-10', '2024-01-05')).toBe('7th 9bln')
  })

  it('menerima format lama DD/MM/YYYY di kedua sisi', () => {
    expect(usiaPada('20/11/2015', '05/07/2020')).toBe('4th 7bln')
    expect(usiaPada('2015-11-20', '05/07/2020')).toBe('4th 7bln')
  })

  it('masukan kosong / tak sah / terbalik urutannya → string kosong', () => {
    expect(usiaPada('', '2025-01-01')).toBe('')
    expect(usiaPada('2015-11-20', '')).toBe('')
    expect(usiaPada('bukan-tanggal', '2025-01-01')).toBe('')
    // tgl masuk mendahului tgl lahir = data keliru, jangan menerbitkan angka negatif
    expect(usiaPada('2020-01-01', '2015-01-01')).toBe('')
  })

  it('tahun kabisat: lahir 29 Feb, acuan 28 Feb tahun biasa', () => {
    expect(usiaPada('2000-02-29', '2025-02-28')).toBe('24th 11bln')
  })
})

describe('usiaKini — umur sekarang', () => {
  it('bentuk hasilnya sama dengan usiaPada', () => {
    expect(usiaKini('2010-01-01')).toMatch(/^\d+th \d+bln$/)
  })

  it('tanggal lahir di masa depan → kosong, bukan angka negatif', () => {
    const tahunDepan = new Date().getFullYear() + 5
    expect(usiaKini(`${tahunDepan}-01-01`)).toBe('')
  })

  it('masukan kosong / tak sah → kosong', () => {
    expect(usiaKini('')).toBe('')
    expect(usiaKini(null)).toBe('')
    expect(usiaKini('31-31-31')).toBe('')
  })
})
