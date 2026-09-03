// Kyai (3 Sep 2026): "akses edit rekap absen bulanan guru terasa lambat ketika saya edit
// manual." Bagian jaringannya ditutup dengan menarik hanya JENDELA tanggal yang sedang
// hidup di layar, bukan seluruh riwayat absensi.
//
// Yang dijaga tes ini: jendelanya tak boleh MENYEMPIT. Layar Absensi Guru memelihara dua
// periode sekaligus — matriks bulan terpilih dan rekap per-lembaga yang bisa berjalan
// mingguan dengan anchor sendiri — dan minggu itu boleh jatuh di bulan yang sama sekali
// lain. Kalau gabungannya meleset, rekap mingguan diam-diam menampilkan NOL: tak ada
// galat, tak ada baris merah, cuma angka yang salah.
import { describe, it, expect } from 'vitest'
import { gabungRentang, rentangBulan, rentangMinggu } from '@/utils/absensiRekap'

describe('gabungRentang', () => {
  it('mengambil awal paling awal dan akhir paling akhir', () => {
    expect(
      gabungRentang(
        { start: '2026-09-01', end: '2026-09-30' },
        { start: '2026-08-31', end: '2026-09-06' }
      )
    ).toEqual({ start: '2026-08-31', end: '2026-09-30' })
  })

  it('rentang yang saling memuat tidak melebarkan apa pun', () => {
    expect(
      gabungRentang(
        { start: '2026-09-01', end: '2026-09-30' },
        { start: '2026-09-07', end: '2026-09-13' }
      )
    ).toEqual({ start: '2026-09-01', end: '2026-09-30' })
  })

  it('mengabaikan rentang yang tak sah, bukan menganggapnya nol', () => {
    const bulan = { start: '2026-09-01', end: '2026-09-30' }
    expect(gabungRentang(bulan, null)).toEqual(bulan)
    expect(gabungRentang(bulan, undefined)).toEqual(bulan)
    expect(gabungRentang(bulan, { start: '', end: '' })).toEqual(bulan)
    expect(gabungRentang(bulan, { start: '2026-09-01' })).toEqual(bulan)
  })

  it('tanpa satu pun rentang sah → null (= tanpa penyaring, perilaku lama)', () => {
    expect(gabungRentang()).toBeNull()
    expect(gabungRentang(null, undefined, {})).toBeNull()
  })

  it('urutan argumen tak mengubah hasil', () => {
    const a = { start: '2026-07-27', end: '2026-08-02' }
    const b = { start: '2026-08-01', end: '2026-08-31' }
    expect(gabungRentang(a, b)).toEqual(gabungRentang(b, a))
  })
})

describe('jendela absensi — kasus nyata yang gampang menyempit', () => {
  // Ini persis bentuk `jendelaAbsensi` di AbsensiGuruView.
  const jendela = (tahun, bulan, anchor) =>
    gabungRentang(rentangBulan(tahun, bulan), rentangMinggu(anchor))

  it('minggu berjalan di bulan LAIN tetap termuat', () => {
    // Melihat matriks Agustus, sementara rekap mingguan sedang di minggu awal September.
    const w = jendela(2026, 8, '2026-09-03')
    expect(w.start <= '2026-08-01').toBe(true)
    expect(w.end >= '2026-09-06').toBe(true) // Senin 31 Agu – Minggu 6 Sep
  })

  it('minggu yang menyeberangi pergantian bulan termuat utuh dua-duanya', () => {
    // Senin 31 Agu 2026 – Minggu 6 Sep 2026.
    const minggu = rentangMinggu('2026-09-02')
    const w = jendela(2026, 9, '2026-09-02')
    expect(w.start <= minggu.start).toBe(true)
    expect(w.end >= minggu.end).toBe(true)
    expect(w.start).toBe('2026-08-31')
    expect(w.end).toBe('2026-09-30')
  })

  it('Februari tak kehilangan hari terakhirnya', () => {
    expect(jendela(2026, 2, '2026-02-15').end).toBe('2026-02-28')
    expect(jendela(2028, 2, '2028-02-15').end).toBe('2028-02-29') // kabisat
  })

  it('anchor jauh ke belakang melebarkan jendela, bukan memindahkannya', () => {
    const w = jendela(2026, 9, '2026-06-10')
    expect(w.start <= '2026-06-08').toBe(true)
    expect(w.end).toBe('2026-09-30') // bulan terpilih tetap termuat penuh
  })
})
