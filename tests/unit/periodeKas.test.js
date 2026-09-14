// Kyai (14 Sep 2026): "di buku induk, saya ingin filter tanggal bisa difilter dari tanggal
// ini ke tanggal itu".
//
// Yang WAJIB dijaga:
//   1. Pilihan LAMA (tahun / bulan / satu tanggal) menyaring baris yang PERSIS sama seperti
//      sebelum rentang ada — laporan yang sudah pernah dicetak tak boleh berubah isinya.
//   2. Saldo kas sebelum periode untuk pilihan lama tak bergeser satu rupiah pun.
//   3. Rentang inklusif di KEDUA ujung, tahan urutan terbalik dan ujung yang kosong.
//   4. Label & nama berkas mengikuti rentang, bukan bulan yang kebetulan terpilih.
import { describe, it, expect } from 'vitest'
import {
  periodeKas,
  dalamPeriode,
  labelRentang,
  tanggalSah,
  hariTerakhir,
  tanggalPanjang
} from '@/utils/periodeKas'
import { saldoAwalSebelum } from '@/utils/bukuIndukLaporan'

const TANGGAL = [
  '2025-12-31',
  '2026-01-01',
  '2026-02-28',
  '2026-08-01',
  '2026-08-03',
  '2026-08-03T07:00',
  '2026-08-31',
  '2026-09-01',
  '2026-12-31',
  '2027-01-01'
]

describe('periodeKas — pilihan lama tak berubah isinya', () => {
  it('bulan: sama dengan penyaring lama substring(0,7) === YYYY-MM', () => {
    const p = periodeKas({ tahun: 2026, bulan: 8 })
    for (const t of TANGGAL) {
      expect(dalamPeriode(t, p)).toBe(t.substring(0, 7) === '2026-08')
    }
    expect(p).toMatchObject({ dari: '2026-08-01', sampai: '2026-08-31', awal: '2026-08' })
    expect(p.label).toBe('Agustus 2026')
    expect(p.slug).toBe('2026-08')
    expect(p.harian).toBe(false)
  })

  it('satu tanggal: sama dengan penyaring lama substring(0,10) === tanggal', () => {
    const p = periodeKas({ tahun: 2026, bulan: 8, hari: 3 })
    for (const t of TANGGAL) {
      expect(dalamPeriode(t, p)).toBe(t.substring(0, 10) === '2026-08-03')
    }
    expect(p).toMatchObject({ awal: '2026-08-03', label: '3 Agustus 2026', harian: true })
  })

  it('tahun: sama dengan penyaring lama startsWith(tahun)', () => {
    const p = periodeKas({ tahun: 2026, bulan: 0, hari: 12 })
    for (const t of TANGGAL) expect(dalamPeriode(t, p)).toBe(t.startsWith('2026'))
    expect(p).toMatchObject({ awal: '2026', label: 'Tahun 2026', slug: '2026', harian: false })
  })

  it('saldo awal pilihan lama = saldo awal yang dulu dihitung dari slug periode', () => {
    const ledger = [
      { id: 'a', tanggal: '2026-07-31', tipe: 'masuk', nominal: 100 },
      { id: 'b', tanggal: '2026-08-01', tipe: 'masuk', nominal: 50 },
      { id: 'c', tanggal: '2026-08-03', tipe: 'keluar', nominal: 30 },
      { id: 'd', tanggal: '2025-12-31', tipe: 'masuk', nominal: 7 }
    ]
    const kasus = [
      [{ tahun: 2026, bulan: 8 }, '2026-08'],
      [{ tahun: 2026, bulan: 8, hari: 3 }, '2026-08-03'],
      [{ tahun: 2026, bulan: 0 }, '2026']
    ]
    for (const [opsi, slugLama] of kasus) {
      expect(saldoAwalSebelum(ledger, periodeKas(opsi).awal)).toBe(
        saldoAwalSebelum(ledger, slugLama)
      )
    }
  })

  it('tanggal 31 di bulan 30 hari tetap tak cocok apa pun, seperti dulu', () => {
    const p = periodeKas({ tahun: 2026, bulan: 9, hari: 31 })
    expect(dalamPeriode('2026-09-30', p)).toBe(false)
    expect(dalamPeriode('2026-10-01', p)).toBe(false)
  })

  it('akhir bulan memakai jumlah hari sebenarnya (kabisat)', () => {
    expect(periodeKas({ tahun: 2028, bulan: 2 }).sampai).toBe('2028-02-29')
    expect(periodeKas({ tahun: 2026, bulan: 9 }).sampai).toBe('2026-09-30')
  })
})

describe('periodeKas — rentang tanggal', () => {
  it('inklusif di kedua ujung', () => {
    const p = periodeKas({ mode: 'rentang', dari: '2026-08-25', sampai: '2026-09-10' })
    expect(dalamPeriode('2026-08-24', p)).toBe(false)
    expect(dalamPeriode('2026-08-25', p)).toBe(true)
    expect(dalamPeriode('2026-09-10T23:59', p)).toBe(true)
    expect(dalamPeriode('2026-09-11', p)).toBe(false)
    expect(p).toMatchObject({
      mode: 'rentang',
      awal: '2026-08-25',
      label: '25 Agustus – 10 September 2026',
      slug: '2026-08-25_sd_2026-09-10',
      harian: false
    })
  })

  it('urutan terbalik ditukar, bukan layar kosong', () => {
    const p = periodeKas({ mode: 'rentang', dari: '2026-09-10', sampai: '2026-08-25' })
    expect([p.dari, p.sampai]).toEqual(['2026-08-25', '2026-09-10'])
  })

  it('satu ujung kosong = satu tanggal itu saja (laporan harian)', () => {
    const p = periodeKas({ mode: 'rentang', dari: '2026-08-03', sampai: '' })
    expect(p).toMatchObject({ dari: '2026-08-03', sampai: '2026-08-03', harian: true })
    expect(p.slug).toBe('2026-08-03')
  })

  it('rentang yang belum diisi (atau tak sah) jatuh ke pilihan bulanan', () => {
    const p = periodeKas({ mode: 'rentang', dari: '2026-02-30', sampai: '', tahun: 2026, bulan: 8 })
    expect(p).toMatchObject({ mode: 'bulan', label: 'Agustus 2026' })
  })

  it('baris tanpa tanggal terbaca tak pernah masuk periode', () => {
    const p = periodeKas({ mode: 'rentang', dari: '2026-01-01', sampai: '2026-12-31' })
    expect(dalamPeriode('', p)).toBe(false)
    expect(dalamPeriode('kemarin', p)).toBe(false)
    expect(dalamPeriode(null, p)).toBe(false)
    expect(dalamPeriode('2026-08-03', null)).toBe(false)
  })
})

describe('label & tanggal', () => {
  it('labelRentang tak mengulang bulan/tahun yang sama', () => {
    expect(labelRentang('2026-08-01', '2026-08-15')).toBe('1–15 Agustus 2026')
    expect(labelRentang('2026-08-25', '2026-09-10')).toBe('25 Agustus – 10 September 2026')
    expect(labelRentang('2025-12-20', '2026-01-05')).toBe('20 Desember 2025 – 5 Januari 2026')
    expect(labelRentang('2026-08-03', '2026-08-03')).toBe('3 Agustus 2026')
  })
  it('tanggalSah menolak tanggal yang tak ada di kalender', () => {
    expect(tanggalSah('2026-02-30')).toBe(false)
    expect(tanggalSah('2028-02-29')).toBe(true)
    expect(tanggalSah('2026-13-01')).toBe(false)
    expect(tanggalSah('3/8/2026')).toBe(false)
  })
  it('hariTerakhir & tanggalPanjang', () => {
    expect(hariTerakhir(2026, 2)).toBe(28)
    expect(hariTerakhir(2026, 12)).toBe(31)
    expect(tanggalPanjang('2026-01-09')).toBe('9 Januari 2026')
  })
})
