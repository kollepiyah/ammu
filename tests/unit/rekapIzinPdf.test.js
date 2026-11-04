// PDF rekap izin per orang membaca kelompok yang sama dengan layar — angka hari harus sama.
import { describe, it, expect } from 'vitest'
import { barisRincianIzin, ringkasanOrang } from '@/utils/rekapIzinPdf'
import { rekapIzinPerOrang } from '@/utils/izinStatus'

const hari = (a) => (a.tgl_selesai === '2026-10-03' ? 3 : 1)
const list = [
  {
    id: 1,
    guru_id: 'g1',
    guru_nama: 'Ust. A',
    lembaga: 'PTPT',
    jenis: 'sakit',
    tgl_mulai: '2026-10-01',
    tgl_selesai: '2026-10-03',
    shifts: ['pagi', 'sore'],
    status: 'disetujui',
    penyetuju: 'Kepala',
    lampiran_url: 'https://x/y.jpg',
    keterangan: 'demam'
  },
  {
    id: 2,
    guru_id: 'g1',
    guru_nama: 'Ust. A',
    jenis: 'cuti',
    kategori: 'k1',
    tgl_mulai: '2026-10-10',
    tgl_selesai: '2026-10-10',
    shifts: ['pagi'],
    status: 'diajukan'
  },
  {
    id: 3,
    guru_id: 'g1',
    guru_nama: 'Ust. A',
    jenis: 'izin',
    tgl_mulai: '2026-09-01',
    status: 'ditolak',
    catatan_putus: 'Dibatalkan pengaju'
  }
]

describe('rekapIzinPdf', () => {
  const [g] = rekapIzinPerOrang(list, { hitungHari: hari })

  it('baris rincian: hari hanya untuk yang disetujui, status & lampiran terbaca', () => {
    const rows = barisRincianIzin(g.items, { cutiKatNama: () => 'Tahunan', hitungHari: hari })
    expect(rows).toHaveLength(3)
    const [cuti, sakit, izin] = rows // urut terbaru dulu
    expect(cuti).toEqual([
      '1',
      'Cuti (Tahunan)',
      '10/10/2026',
      '-',
      'Pagi',
      '-',
      'Menunggu',
      '-',
      '-'
    ])
    expect(sakit[2]).toBe('01/10/2026 – 03/10/2026')
    expect(sakit[3]).toBe('3 hr / 6 sh') // pagi + sore × 3 hari
    expect(sakit[5]).toBe('demam')
    expect(sakit[8]).toBe('Ada')
    expect(izin[6]).toBe('Dibatalkan')
    expect(izin[3]).toBe('-')
  })

  it('ringkasan orang memakai hari disetujui', () => {
    expect(ringkasanOrang(g)).toBe(
      'Izin 1 (0 shift / 0 hari disetujui) · Sakit 1 (6 shift / 3 hari disetujui) · Cuti 1 (0 shift / 0 hari disetujui) · 1 menunggu'
    )
  })
})
