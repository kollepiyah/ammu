// SIKLUS REKAP PRESTASI — jendela pengisian MENYEBERANGI pergantian bulan.
//
// Kyai (1 Sep 2026): "rekap prestasi itu adalah hasil dari bulan lalu, dan mengisinya adalah
// bulan lalu … maksimal pengisian paling lambat tgl 5 setiap awal bulan."
// Kyai (2 Sep 2026), memperjelas awalnya: "guru mengisi rekap mulai tgl 29 agustus-5 sept,
// isinya data dari agustus."
// Kyai (4 Sep 2026), menutup ambiguitas PENAMAANNYA: "rekap prestasi bulanan, Bulan
// September. Isinya adalah rekapan dari awal agustus sampai akhir agustus … di filter saya
// membukanya di September, bukan di agustus. di agustus harusnya data bulan lalu (bulan
// agustus, rekap dari Juli)."
//
// Jadi `periode` = BULAN LAPORAN, isinya capaian bulan SEBELUMNYA. v.1.3.8 memakai
// penamaan kebalikannya, dan itulah yang membuat kartu dasbor "Guru Belum Input" mencari
// bucket ('2026-08') yang berbeda dari yang ditulis RekapPrestasiView ('2026-09') — guru
// yang sudah mengisi tetap tercantum belum input.
//
// Yang dijaga tes ini: batas jendela di kedua ujungnya (buka tgl 29, tutup tgl 5), bahwa
// sasaran tak berpindah saat terlambat, bulan pendek (Februari), penamaan periode ↔ bulan
// data, dan cakupan lembaga.
import { describe, it, expect } from 'vitest'
import {
  periodeRekapBerjalan,
  periodeBerikutnya,
  periodeDataRekap,
  batasRekap,
  rekapTerlambat,
  punyaPrestasiBulanan,
  LEMBAGA_PRESTASI_BULANAN,
  TGL_BATAS_REKAP,
  TGL_BUKA_REKAP,
  tglBukaRekap,
  tglBukaRekapPeriode,
  labelBulanPeriode,
  labelPeriodeRekap,
  periodeSebelumnya
} from '@/utils/prestasiBulanan'

describe('periodeRekapBerjalan — periode = BULAN LAPORAN (jendela 29 s/d 5)', () => {
  it('KUNCI (contoh persis Kyai): 2 September → yang dikerjakan rekap SEPTEMBER', () => {
    // Isinya capaian Agustus, tapi namanya September — inilah yang dulu terbalik.
    expect(periodeRekapBerjalan('2026-09-02')).toBe('2026-09')
    expect(periodeDataRekap(periodeRekapBerjalan('2026-09-02'))).toBe('2026-08')
  })

  it('29 Agustus → jendela rekap SEPTEMBER sudah dibuka', () => {
    expect(periodeRekapBerjalan('2026-08-29')).toBe('2026-09')
    expect(periodeRekapBerjalan('2026-08-31')).toBe('2026-09')
  })

  it('28 Agustus → jendela belum buka, yang tertagih masih rekap Agustus', () => {
    expect(periodeRekapBerjalan('2026-08-28')).toBe('2026-08')
  })

  it('sasaran TIDAK berpindah setelah lewat tanggal 5 — hanya jadi terlambat', () => {
    // 10 September masih rekap September yang ditagih. Memindahkan sasaran di tanggal 6
    // justru menyembunyikan pekerjaan yang belum selesai.
    expect(periodeRekapBerjalan('2026-09-06')).toBe('2026-09')
    expect(periodeRekapBerjalan('2026-09-10')).toBe('2026-09')
    expect(periodeRekapBerjalan('2026-09-28')).toBe('2026-09')
  })

  it('29 September → giliran rekap Oktober, siklus berikutnya dimulai', () => {
    expect(periodeRekapBerjalan('2026-09-29')).toBe('2026-10')
  })

  it('akhir Desember menyeberang tahun', () => {
    expect(periodeRekapBerjalan('2026-12-29')).toBe('2027-01')
    expect(periodeRekapBerjalan('2027-01-03')).toBe('2027-01')
    expect(periodeDataRekap('2027-01')).toBe('2026-12')
  })

  it('KUNCI: Februari 28 hari tetap punya jendela — dijepit ke hari terakhir', () => {
    // Tanpa penjepitan, bulan tanpa tanggal 29 tak pernah membuka jendelanya dan
    // rekapnya diam-diam terlewat setahun sekali.
    expect(TGL_BUKA_REKAP).toBe(29)
    expect(tglBukaRekap(2027, 2)).toBe(28) // 2027 bukan kabisat
    expect(periodeRekapBerjalan('2027-02-28')).toBe('2027-03')
    expect(tglBukaRekap(2028, 2)).toBe(29) // 2028 kabisat → tanggal 29 ada
    expect(periodeRekapBerjalan('2028-02-28')).toBe('2028-02')
    expect(periodeRekapBerjalan('2028-02-29')).toBe('2028-03')
  })

  it('tanggal sampah → kosong, bukan menebak bulan', () => {
    expect(periodeRekapBerjalan('')).toBe('')
    expect(periodeRekapBerjalan('bukan-tanggal')).toBe('')
    expect(periodeRekapBerjalan(null)).toBe('')
    expect(periodeRekapBerjalan('2026-13-02')).toBe('')
  })

  it('sesudah jendela buka, hasilnya sama dengan periodeBerikutnya (satu aturan)', () => {
    expect(periodeRekapBerjalan('2026-08-29')).toBe(periodeBerikutnya('2026-08'))
  })
})

describe('periodeBerikutnya / periodeDataRekap — arah waktunya harus berlawanan', () => {
  it('maju satu bulan, menyeberang tahun', () => {
    expect(periodeBerikutnya('2026-01')).toBe('2026-02')
    expect(periodeBerikutnya('2026-12')).toBe('2027-01')
  })

  it('bulan data = kebalikan persis dari bulan laporan', () => {
    expect(periodeDataRekap('2026-09')).toBe('2026-08')
    expect(periodeDataRekap('2027-01')).toBe('2026-12')
    // Dua nama untuk satu aritmetika — sengaja, supaya artinya terbaca di pemanggil.
    expect(periodeDataRekap('2026-09')).toBe(periodeSebelumnya('2026-09'))
  })

  it('periode tak sah → kosong di kedua arah', () => {
    expect(periodeBerikutnya('2026-13')).toBe('')
    expect(periodeBerikutnya('')).toBe('')
    expect(periodeDataRekap('bukan')).toBe('')
  })
})

describe('tglBukaRekapPeriode — jendela dibuka di bulan SEBELUM bulan laporan', () => {
  it('rekap September dibuka 29 Agustus', () => {
    expect(tglBukaRekapPeriode('2026-09')).toBe('2026-08-29')
  })

  it('rekap Januari dibuka 29 Desember tahun sebelumnya', () => {
    expect(tglBukaRekapPeriode('2027-01')).toBe('2026-12-29')
  })

  it('rekap Maret dibuka 28 Februari di tahun biasa (dijepit)', () => {
    expect(tglBukaRekapPeriode('2027-03')).toBe('2027-02-28')
    expect(tglBukaRekapPeriode('2028-03')).toBe('2028-02-29') // kabisat
  })

  it('periode tak sah → kosong', () => {
    expect(tglBukaRekapPeriode('2026-13')).toBe('')
    expect(tglBukaRekapPeriode('')).toBe('')
  })
})

describe('batasRekap — paling lambat tanggal 5 di BULAN LAPORAN itu sendiri', () => {
  it('rekap September jatuh tempo 5 September', () => {
    expect(batasRekap('2026-09')).toBe('2026-09-05')
    expect(TGL_BATAS_REKAP).toBe(5)
  })

  it('rekap Januari jatuh tempo 5 Januari (tak lagi menyeberang tahun)', () => {
    expect(batasRekap('2027-01')).toBe('2027-01-05')
  })

  it('batasnya selalu jatuh SESUDAH jendelanya dibuka', () => {
    for (const p of ['2026-09', '2027-01', '2027-03']) {
      expect(batasRekap(p) > tglBukaRekapPeriode(p)).toBe(true)
    }
  })

  it('periode tak sah → kosong', () => {
    expect(batasRekap('2026-13')).toBe('')
    expect(batasRekap('2026')).toBe('')
    expect(batasRekap('')).toBe('')
  })
})

describe('rekapTerlambat', () => {
  it('tanggal 5 masih SEMPAT — batasnya "paling lambat tgl 5", bukan sebelum tgl 5', () => {
    expect(rekapTerlambat('2026-09', '2026-09-05')).toBe(false)
  })

  it('tanggal 1–4 jelas belum terlambat', () => {
    expect(rekapTerlambat('2026-09', '2026-09-01')).toBe(false)
    expect(rekapTerlambat('2026-09', '2026-09-04')).toBe(false)
  })

  it('sepanjang jendela sebelum pergantian bulan juga belum terlambat', () => {
    expect(rekapTerlambat('2026-09', '2026-08-29')).toBe(false)
  })

  it('tanggal 6 sudah terlambat', () => {
    expect(rekapTerlambat('2026-09', '2026-09-06')).toBe(true)
  })

  it('periode / tanggal tak sah → tidak menuduh terlambat', () => {
    expect(rekapTerlambat('', '2026-09-30')).toBe(false)
    expect(rekapTerlambat('2026-09', '')).toBe(false)
  })
})

describe('label periode — nama bulan tak boleh muncul tanpa bulan datanya', () => {
  it('labelBulanPeriode = nama bulan laporan saja', () => {
    expect(labelBulanPeriode('2026-09')).toBe('September 2026')
    expect(labelBulanPeriode('2027-01')).toBe('Januari 2027')
  })

  it('KUNCI: labelPeriodeRekap selalu menyebut bulan datanya', () => {
    expect(labelPeriodeRekap('2026-09')).toBe('September 2026 (data Agustus 2026)')
    expect(labelPeriodeRekap('2027-01')).toBe('Januari 2027 (data Desember 2026)')
  })

  it('periode sampah dikembalikan apa adanya, tak mengarang bulan', () => {
    expect(labelBulanPeriode('2026-13')).toBe('2026-13')
    expect(labelPeriodeRekap('bukan-periode')).toBe('bukan-periode')
    expect(labelPeriodeRekap('')).toBe('')
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
