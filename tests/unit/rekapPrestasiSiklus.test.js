// SIKLUS REKAP PRESTASI — jendela pengisian MENYEBERANGI pergantian bulan.
//
// Kyai (1 Sep 2026): "rekap prestasi itu adalah hasil dari bulan lalu, dan mengisinya adalah
// bulan lalu … maksimal pengisian paling lambat tgl 5 setiap awal bulan."
// Kyai (2 Sep 2026), memperjelas awalnya: "guru mengisi rekap mulai tgl 29 agustus-5 sept,
// isinya data dari agustus."
//
// Kartu dasbor "Guru Belum Input" dulu menagih BULAN BERJALAN, jadi tiap tanggal 1 seluruh
// guru serentak dinyatakan belum input untuk bulan yang belum boleh diisi siapa pun —
// sementara pekerjaan yang benar-benar jatuh tempo (bulan lalu) tak terpantau.
//
// Yang dijaga tes ini: batas jendela di kedua ujungnya (buka tgl 29, tutup tgl 5), bahwa
// sasaran tak berpindah saat terlambat, bulan pendek (Februari), dan cakupan lembaga.
import { describe, it, expect } from 'vitest'
import {
  periodeRekapBerjalan,
  batasRekap,
  rekapTerlambat,
  punyaPrestasiBulanan,
  LEMBAGA_PRESTASI_BULANAN,
  TGL_BATAS_REKAP,
  TGL_BUKA_REKAP,
  tglBukaRekap,
  periodeSebelumnya
} from '@/utils/prestasiBulanan'

// Kyai (2 Sep 2026), yang memperjelas jendelanya: "rekap prestasi itu diisi akhir bulan
// sampai tgl 5 awal bulan. tapi datanya berasal dari bulan sebelumnya. misal sekarang tgl 2
// september, guru mengisi rekap mulai tgl 29 agustus-5 sept, isinya data dari agustus."
describe('periodeRekapBerjalan — jendela 29 s/d 5, isi bulan yang dinilai', () => {
  it('2 September → yang dikerjakan Agustus (contoh persis dari Kyai)', () => {
    expect(periodeRekapBerjalan('2026-09-02')).toBe('2026-08')
  })

  it('29 Agustus → SUDAH mengisi Agustus (jendela buka di bulan itu sendiri)', () => {
    // Inilah yang membedakan aturan ini dari "selalu bulan lalu": tanggal 29-31 Agustus
    // yang dikerjakan Agustus, bukan Juli.
    expect(periodeRekapBerjalan('2026-08-29')).toBe('2026-08')
    expect(periodeRekapBerjalan('2026-08-31')).toBe('2026-08')
  })

  it('28 Agustus → jendela BELUM buka, yang tertagih masih Juli', () => {
    expect(periodeRekapBerjalan('2026-08-28')).toBe('2026-07')
  })

  it('sasaran TIDAK berpindah setelah lewat tanggal 5 — hanya jadi terlambat', () => {
    // 10 September masih Agustus yang ditagih. Memindahkan sasaran di tanggal 6 justru
    // menyembunyikan pekerjaan yang belum selesai.
    expect(periodeRekapBerjalan('2026-09-06')).toBe('2026-08')
    expect(periodeRekapBerjalan('2026-09-10')).toBe('2026-08')
    expect(periodeRekapBerjalan('2026-09-28')).toBe('2026-08')
  })

  it('29 September → giliran September, siklus berikutnya dimulai', () => {
    expect(periodeRekapBerjalan('2026-09-29')).toBe('2026-09')
  })

  it('awal Januari menyeberang tahun', () => {
    expect(periodeRekapBerjalan('2026-01-03')).toBe('2025-12')
  })

  it('KUNCI: Februari 28 hari tetap punya jendela — dijepit ke hari terakhir', () => {
    // Tanpa penjepitan, bulan tanpa tanggal 29 tak pernah membuka jendelanya dan
    // rekapnya diam-diam terlewat setahun sekali.
    expect(TGL_BUKA_REKAP).toBe(29)
    expect(tglBukaRekap(2027, 2)).toBe(28) // 2027 bukan kabisat
    expect(periodeRekapBerjalan('2027-02-28')).toBe('2027-02')
    expect(tglBukaRekap(2028, 2)).toBe(29) // 2028 kabisat → tanggal 29 ada
    expect(periodeRekapBerjalan('2028-02-28')).toBe('2028-01')
  })

  it('tanggal sampah → kosong, bukan menebak bulan', () => {
    expect(periodeRekapBerjalan('')).toBe('')
    expect(periodeRekapBerjalan('bukan-tanggal')).toBe('')
    expect(periodeRekapBerjalan(null)).toBe('')
    expect(periodeRekapBerjalan('2026-13-02')).toBe('')
  })

  it('sebelum jendela buka, hasilnya sama dengan periodeSebelumnya (satu aturan)', () => {
    expect(periodeRekapBerjalan('2026-09-02')).toBe(periodeSebelumnya('2026-09'))
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
