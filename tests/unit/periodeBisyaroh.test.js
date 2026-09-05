// Kyai (5 Sep 2026): "perhitungan bisyaroh dari absen dihitung dari tgl 25 sebelumnya
// s/d 24 bulan berikutnya (mis: 25 Agustus – 24 September untuk bisyaroh September,
// terbitnya bisyaroh 1–2 Oktober)."
//
// Yang WAJIB dijaga tes ini, berurut dari yang paling mahal bila jebol — semuanya
// menyangkut UANG, karena keempat pembaca absensi di BisyarohView memakai fungsi ini:
//   1. Batas jendela persis 25 (bulan sebelumnya) s/d 24 (bulan periode). Bergeser
//      sehari = satu hari kerja masuk/keluar dari bonus kehadiran RATUSAN guru.
//   2. Pergantian TAHUN. Periode Januari harus mundur ke 25 Desember tahun SEBELUMNYA;
//      salah di sini membuat slip Januari kehilangan sepertiga jendelanya.
//   3. Periode rusak → KOSONG, bukan "semua tanggal". Penyaring yang meloloskan segalanya
//      akan membayar bonus kehadiran bertahun-tahun dalam satu slip.
//   4. Potongan "s/d hari ini" hanya berlaku selama jendelanya masih terbuka — sesudah
//      tanggal 24 lewat, slip yang di-generate ulang harus memberi angka yang SAMA.
import { describe, it, expect } from 'vitest'
import {
  TGL_BUKA_PERIODE,
  rentangPeriodeBisyaroh,
  penyaringPeriodeBisyaroh,
  dalamPeriodeBisyaroh,
  tanggalPeriodeBisyaroh,
  tanggalPeriodeSampai,
  akhirPeriodeBisyaroh,
  labelPeriodeBisyaroh
} from '@/utils/periodeBisyaroh'

describe('rentangPeriodeBisyaroh — jendela 25 → 24', () => {
  it('contoh Kyai: bisyaroh September 2026 = 25 Agu – 24 Sep', () => {
    expect(rentangPeriodeBisyaroh('2026-09')).toEqual({
      start: '2026-08-25',
      end: '2026-09-24'
    })
  })

  it('menyeberang tahun: Januari mundur ke 25 Desember tahun sebelumnya', () => {
    expect(rentangPeriodeBisyaroh('2026-01')).toEqual({
      start: '2025-12-25',
      end: '2026-01-24'
    })
  })

  it('Maret sesudah Februari 28 hari — pembukanya tetap tanggal 25', () => {
    expect(rentangPeriodeBisyaroh('2026-03')).toEqual({
      start: '2026-02-25',
      end: '2026-03-24'
    })
  })

  it('konstanta & akhir jendela selalu bersebelahan (24 = 25 − 1)', () => {
    expect(TGL_BUKA_PERIODE).toBe(25)
    expect(akhirPeriodeBisyaroh('2026-09').slice(-2)).toBe(
      String(TGL_BUKA_PERIODE - 1).padStart(2, '0')
    )
  })

  it('periode tak sah → null (bukan rentang tebakan)', () => {
    for (const buruk of ['', null, undefined, '2026', '2026-13', '2026-00', 'abcd-ef']) {
      expect(rentangPeriodeBisyaroh(buruk)).toBeNull()
    }
  })
})

describe('penyaring tanggal', () => {
  const lolos = penyaringPeriodeBisyaroh('2026-09')

  it('tanggal 25–31 Agustus IKUT bisyaroh September', () => {
    expect(lolos('2026-08-25')).toBe(true)
    expect(lolos('2026-08-31')).toBe(true)
  })

  it('tanggal 24 Agustus TIDAK ikut — itu milik bisyaroh Agustus', () => {
    expect(lolos('2026-08-24')).toBe(false)
  })

  it('tanggal 24 September ikut, tanggal 25 September tidak (sudah bulan berikutnya)', () => {
    expect(lolos('2026-09-24')).toBe(true)
    expect(lolos('2026-09-25')).toBe(false)
    expect(lolos('2026-09-30')).toBe(false)
  })

  it('menerima timestamp panjang — baris absensi kadang membawa jam', () => {
    expect(lolos('2026-09-01T07:12:00Z')).toBe(true)
  })

  it('periode rusak menolak SEMUA tanggal (bukan meloloskan semua)', () => {
    const tolak = penyaringPeriodeBisyaroh('bukan-periode')
    expect(tolak('2026-09-10')).toBe(false)
    expect(dalamPeriodeBisyaroh('2026-09-10', '')).toBe(false)
  })

  it('tanggal kosong/aneh tak pernah lolos', () => {
    for (const buruk of ['', null, undefined, '2026-09', 'kemarin']) {
      expect(lolos(buruk)).toBe(false)
    }
  })
})

describe('daftar tanggal jendela', () => {
  it('September 2026 = 31 hari (25 Agu s/d 24 Sep), berurutan tanpa bolong', () => {
    const t = tanggalPeriodeBisyaroh('2026-09')
    expect(t.length).toBe(31)
    expect(t[0]).toBe('2026-08-25')
    expect(t[t.length - 1]).toBe('2026-09-24')
    // Tak ada tanggal kembar & urut naik — kalau jebol, hari kerja terhitung dua kali.
    expect(new Set(t).size).toBe(t.length)
    expect([...t].sort()).toEqual(t)
  })

  it('Maret 2026 = 28 hari (Februari pendek) — panjang jendela memang tak seragam', () => {
    expect(tanggalPeriodeBisyaroh('2026-03').length).toBe(28)
  })

  it('menyeberang tahun tetap tersambung', () => {
    const t = tanggalPeriodeBisyaroh('2026-01')
    expect(t[0]).toBe('2025-12-25')
    expect(t).toContain('2025-12-31')
    expect(t).toContain('2026-01-01')
    expect(t[t.length - 1]).toBe('2026-01-24')
  })

  it('periode rusak → daftar kosong', () => {
    expect(tanggalPeriodeBisyaroh('2026-13')).toEqual([])
  })
})

describe('tanggalPeriodeSampai — slip bulan berjalan', () => {
  it('dipotong di hari ini selama jendelanya masih terbuka', () => {
    const t = tanggalPeriodeSampai('2026-09', '2026-09-05')
    expect(t[0]).toBe('2026-08-25')
    expect(t[t.length - 1]).toBe('2026-09-05')
  })

  it('sesudah tanggal 24 lewat, hasilnya SAMA dengan jendela penuh — slip yang digenerate ulang bulan depan tak berubah', () => {
    const penuh = tanggalPeriodeBisyaroh('2026-09')
    expect(tanggalPeriodeSampai('2026-09', '2026-10-02')).toEqual(penuh)
    expect(tanggalPeriodeSampai('2026-09', '2027-03-01')).toEqual(penuh)
    expect(tanggalPeriodeSampai('2026-09', '2026-09-24')).toEqual(penuh)
  })

  it('periode yang belum dibuka sama sekali → kosong (bukan seluruh jendela)', () => {
    expect(tanggalPeriodeSampai('2026-12', '2026-09-05')).toEqual([])
  })

  it('hariIni kosong/rusak tidak memotong apa pun', () => {
    expect(tanggalPeriodeSampai('2026-09', '')).toEqual(tanggalPeriodeBisyaroh('2026-09'))
  })
})

describe('labelPeriodeBisyaroh — yang dibaca Kyai di layar', () => {
  it('dalam satu tahun, tahunnya ditulis sekali', () => {
    expect(labelPeriodeBisyaroh('2026-09')).toBe('25 Agu – 24 Sep 2026')
  })

  it('menyeberang tahun, kedua tahunnya ditulis', () => {
    expect(labelPeriodeBisyaroh('2026-01')).toBe('25 Des 2025 – 24 Jan 2026')
  })

  it('periode rusak → string kosong, bukan "NaN"', () => {
    expect(labelPeriodeBisyaroh('xx')).toBe('')
  })
})
