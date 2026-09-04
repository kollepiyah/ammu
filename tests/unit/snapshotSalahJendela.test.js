// snapshotSalahJendela — melacak isian rekap yang mendarat di bucket bulan sebelah.
//
// Kyai (4 Sep 2026): "guru2 katanya banyak yg sudah isi, tapi di rekap kok banyak yg belum
// diisi."
//
// Sampai v.1.4.0 dropdown bulan Rekap Prestasi terbuka pada BULAN KALENDER, padahal jendela
// pengisian menyeberangi pergantian bulan. Guru yang mengisi 29–31 Agustus menyimpan ke
// '2026-08'; rekannya yang mengisi 1–5 September menyimpan ke '2026-09'. Satu pekerjaan,
// dua bucket.
//
// Yang dijaga tes ini, dan yang PALING penting yang kedua:
//   1. baris siklus ini yang tersangkut di bucket sebelumnya memang terhitung;
//   2. baris siklus SEBELUMNYA yang sah TIDAK ikut terhitung. Tanpa pembeda waktu-tulis,
//      angkanya cuma "berapa santri yang bulan lalu terisi" — nyaris semuanya — dan itu
//      akan mengusulkan pemindahan yang menimpa pekerjaan yang benar.
import { describe, it, expect } from 'vitest'
import { snapshotSalahJendela } from '@/utils/prestasiBulanan'

const baris = (santri_id, periode, updatedAt, isi = { akhir: '30' }) => ({
  santri_id,
  periode,
  updatedAt,
  ...isi
})

describe('snapshotSalahJendela — jendela rekap September dibuka 29 Agustus', () => {
  it('KUNCI: baris Agustus yang ditulis 29–31 Agustus = isian siklus September', () => {
    const rows = [
      baris('s1', '2026-08', '2026-08-29T10:00:00Z'),
      baris('s2', '2026-08', '2026-08-31T23:00:00Z')
    ]
    const h = snapshotSalahJendela(rows, '2026-09')
    expect(h.jumlah).toBe(2)
    expect(h.santriIds.sort()).toEqual(['s1', 's2'])
    expect(h.periodeSebelum).toBe('2026-08')
    expect(h.sejak).toBe('2026-08-29')
  })

  it('KUNCI: rekap Agustus yang SAH (diisi 29 Jul–5 Agu) tidak ikut terhitung', () => {
    const rows = [
      baris('s1', '2026-08', '2026-07-30T10:00:00Z'),
      baris('s2', '2026-08', '2026-08-03T10:00:00Z'),
      baris('s3', '2026-08', '2026-08-05T10:00:00Z')
    ]
    expect(snapshotSalahJendela(rows, '2026-09').jumlah).toBe(0)
  })

  it('tanggal 28 Agustus masih di siklus lama — jendela belum dibuka', () => {
    const rows = [baris('s1', '2026-08', '2026-08-28T23:59:00Z')]
    expect(snapshotSalahJendela(rows, '2026-09').jumlah).toBe(0)
  })

  it('baris periode lain tak ikut disentuh', () => {
    const rows = [
      baris('s1', '2026-09', '2026-09-02T10:00:00Z'), // sudah di bucket yang benar
      baris('s2', '2026-07', '2026-08-30T10:00:00Z') // dua periode ke belakang
    ]
    expect(snapshotSalahJendela(rows, '2026-09').jumlah).toBe(0)
  })

  it('baris kosong (belum dinilai) tak dihitung walau waktunya cocok', () => {
    const rows = [
      baris('s1', '2026-08', '2026-08-30T10:00:00Z', { awal: '', akhir: '', total: '' })
    ]
    expect(snapshotSalahJendela(rows, '2026-09').jumlah).toBe(0)
  })

  it('tanpa updatedAt TIDAK dituduh — tak ada dasar mengusulkan pemindahan', () => {
    const rows = [baris('s1', '2026-08', ''), baris('s2', '2026-08', 'bukan-tanggal')]
    expect(snapshotSalahJendela(rows, '2026-09').jumlah).toBe(0)
  })

  it('satu santri dengan beberapa baris dihitung SEKALI', () => {
    const rows = [
      baris('s1', '2026-08', '2026-08-29T10:00:00Z'),
      baris('s1', '2026-08', '2026-08-30T10:00:00Z')
    ]
    expect(snapshotSalahJendela(rows, '2026-09').jumlah).toBe(1)
  })

  it('bisa dibatasi ke santri yang sedang tampil saja', () => {
    const rows = [
      baris('s1', '2026-08', '2026-08-29T10:00:00Z'),
      baris('s2', '2026-08', '2026-08-29T10:00:00Z')
    ]
    expect(snapshotSalahJendela(rows, '2026-09', ['s1']).jumlah).toBe(1)
    expect(snapshotSalahJendela(rows, '2026-09', new Set(['s2'])).santriIds).toEqual(['s2'])
    expect(snapshotSalahJendela(rows, '2026-09', []).jumlah).toBe(0)
  })

  it('menyeberang tahun: rekap Januari dibuka 29 Desember', () => {
    const rows = [baris('s1', '2026-12', '2026-12-29T10:00:00Z')]
    const h = snapshotSalahJendela(rows, '2027-01')
    expect(h.sejak).toBe('2026-12-29')
    expect(h.jumlah).toBe(1)
  })

  it('bulan pendek: rekap Maret dibuka 28 Februari di tahun biasa', () => {
    const rows = [baris('s1', '2027-02', '2027-02-28T10:00:00Z')]
    expect(snapshotSalahJendela(rows, '2027-03').jumlah).toBe(1)
  })

  it('masukan sampah aman', () => {
    expect(snapshotSalahJendela(null, '2026-09').jumlah).toBe(0)
    expect(snapshotSalahJendela([], '').jumlah).toBe(0)
    expect(snapshotSalahJendela([], 'bukan-periode').jumlah).toBe(0)
  })
})
