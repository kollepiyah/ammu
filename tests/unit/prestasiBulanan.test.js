// v.1.3.7 (Kyai, 31 Agu 2026): "untuk rekap prestasi bulanan, kenapa tidak tereset setiap
// bulan, bulan agustus masih terinput rekapan bulan lalu. harusnya kosong."
//
// Inti aturannya cuma satu kalimat, tapi kalimat itu punya dua sisi yang gampang tertukar:
//   • awal/akhir/total = UKURAN BULANAN → kosong bila bulan itu belum diisi;
//   • juz/kelas        = KEADAAN BERJALAN → justru salah kalau dikosongkan (santri tak
//                        kembali ke Juz 1 tiap tanggal 1).
// Dua layar menulis angka yang sama (RekapPrestasiView & InputBulananView), jadi aturannya
// diangkat jadi util murni — bukan disalin ke dalam kedua view.
import { describe, it, expect } from 'vitest'
import {
  periodePrestasi,
  periodeSebelumnya,
  idRiwayatPrestasi,
  petaPrestasiPeriode,
  nilaiPrestasiBulan,
  petunjukBulanLalu,
  payloadRiwayatPrestasi,
  sudahDinilaiBulan
} from '@/utils/prestasiBulanan'

const santri = { id: 's1', nama: 'Ahmad', lembaga: 'PTPT', kelas: 'Kelas 3', juz: 'JUZ 11' }
const snapJuli = {
  id: 'rp_s1_2026-07',
  santri_id: 's1',
  periode: '2026-07',
  awal: '100',
  akhir: '140',
  total: '40 Hal',
  juz: 'JUZ 11',
  updatedAt: '2026-07-30T00:00:00.000Z'
}

describe('periode', () => {
  it('membentuk YYYY-MM & menolak yang tak masuk akal', () => {
    expect(periodePrestasi(8, 2026)).toBe('2026-08')
    expect(periodePrestasi(12, 2026)).toBe('2026-12')
    expect(periodePrestasi(13, 2026)).toBe('')
    expect(periodePrestasi(0, 2026)).toBe('')
  })

  it('mundur satu bulan, termasuk lintas tahun', () => {
    expect(periodeSebelumnya('2026-08')).toBe('2026-07')
    expect(periodeSebelumnya('2026-01')).toBe('2025-12')
    expect(periodeSebelumnya('bukan-periode')).toBe('')
  })

  it('id snapshot berbentuk tetap (dua penulis harus menghasilkan id yang sama)', () => {
    expect(idRiwayatPrestasi('s1', '2026-08')).toBe('rp_s1_2026-08')
    expect(payloadRiwayatPrestasi({ santri, periode: '2026-08' }).id).toBe('rp_s1_2026-08')
  })
})

describe('petaPrestasiPeriode', () => {
  it('hanya mengambil baris periode yang diminta', () => {
    const peta = petaPrestasiPeriode([snapJuli, { ...snapJuli, periode: '2026-08' }], '2026-08')
    expect(peta.size).toBe(1)
    expect(peta.get('s1').periode).toBe('2026-08')
  })

  it('baris kembar → yang paling akhir diperbarui yang menang', () => {
    const lama = { ...snapJuli, total: '10 Hal', updatedAt: '2026-07-01T00:00:00.000Z' }
    const baru = { ...snapJuli, total: '40 Hal', updatedAt: '2026-07-30T00:00:00.000Z' }
    expect(petaPrestasiPeriode([baru, lama], '2026-07').get('s1').total).toBe('40 Hal')
    expect(petaPrestasiPeriode([lama, baru], '2026-07').get('s1').total).toBe('40 Hal')
  })
})

describe('nilaiPrestasiBulan — inti keluhan Kyai', () => {
  it('bulan yang belum diisi = KOSONG, bukan angka bulan lalu', () => {
    // Baris santri sengaja masih memegang angka Juli — persis keadaan nyatanya.
    const s = { ...santri, prestasi_awal: '100', prestasi_akhir: '140', prestasi_total: '40 Hal' }
    const nb = nilaiPrestasiBulan(null, s)
    expect(nb.awal).toBe('')
    expect(nb.akhir).toBe('')
    expect(nb.total).toBe('')
  })

  it('juz & kelas TIDAK dikosongkan — itu keadaan berjalan, bukan ukuran bulanan', () => {
    const nb = nilaiPrestasiBulan(null, santri)
    expect(nb.juz).toBe('JUZ 11')
    expect(nb.kelas).toBe('Kelas 3')
  })

  it('bulan yang sudah bersnapshot menampilkan angka bulan itu', () => {
    const nb = nilaiPrestasiBulan(snapJuli, santri)
    expect(nb).toMatchObject({ awal: '100', akhir: '140', total: '40 Hal' })
  })

  it('snapshot yang juz-nya kosong tetap memakai juz santri sekarang', () => {
    expect(nilaiPrestasiBulan({ ...snapJuli, juz: '' }, santri).juz).toBe('JUZ 11')
  })
})

describe('petunjukBulanLalu — placeholder, bukan isian', () => {
  it('petunjuk "Awal" mengambil AKHIR bulan lalu (awal bulan ini = akhir bulan lalu)', () => {
    const p = petunjukBulanLalu(snapJuli, santri)
    expect(p.awal).toBe('140')
    expect(p.total).toBe('40 Hal')
  })

  it('bulan lalu belum bersnapshot → jatuh ke angka terakhir di baris santri', () => {
    const s = { ...santri, prestasi_akhir: '90', prestasi_total: '12 Hal' }
    expect(petunjukBulanLalu(null, s)).toMatchObject({ awal: '90', total: '12 Hal' })
  })
})

describe('sudahDinilaiBulan', () => {
  it('juz/kelas yang selalu terisi TIDAK membuat bulan kosong terhitung sudah dinilai', () => {
    expect(sudahDinilaiBulan(nilaiPrestasiBulan(null, santri))).toBe(false)
  })

  it('satu kolom terisi sudah cukup', () => {
    expect(sudahDinilaiBulan({ awal: '', akhir: '', total: '8 Hal' })).toBe(true)
    expect(sudahDinilaiBulan(nilaiPrestasiBulan(snapJuli, santri))).toBe(true)
  })
})

describe('payloadRiwayatPrestasi', () => {
  it('membawa identitas santri + periode, dan tak mengarang nilai', () => {
    const p = payloadRiwayatPrestasi({
      santri,
      periode: '2026-08',
      bulanLabel: 'Agustus 2026',
      awal: '140',
      akhir: '175',
      total: '35 Hal',
      juz: 'JUZ 12'
    })
    expect(p).toMatchObject({
      id: 'rp_s1_2026-08',
      santri_id: 's1',
      santri_nama: 'Ahmad',
      lembaga: 'PTPT',
      periode: '2026-08',
      bulan_label: 'Agustus 2026',
      awal: '140',
      akhir: '175',
      total: '35 Hal',
      juz: 'JUZ 12'
    })
  })

  it('nilai yang tak diberikan jadi string kosong, bukan undefined', () => {
    const p = payloadRiwayatPrestasi({ santri, periode: '2026-08' })
    expect(p.awal).toBe('')
    expect(p.akhir).toBe('')
    expect(p.total).toBe('')
    expect(p.juz).toBe('')
  })
})
