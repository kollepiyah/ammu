// Kartu Personal: kehadiran bulan MANA PUN (Kyai, 4 Nov 2026 — riwayat bulan sebelumnya).
import { describe, it, expect } from 'vitest'
import { rekapKehadiranBulan, bulanKehadiranTersedia } from '@/utils/kehadiranPribadi'

const guru = { id: 'g1', shift: 'pagi', lembaga: 'PTPT' }

describe('rekapKehadiranBulan', () => {
  it('bulan lalu dihitung utuh: alpa = hari kerja tanpa baris (Ahad & libur dilewati)', () => {
    // Oktober 2026: 31 hari, Ahad = 4, 11, 18, 25 → 27 hari kerja.
    const rows = [
      { guru_id: 'g1', tanggal: '2026-10-01', shift: 'pagi', status: 'hadir', jam_pulang: '12:00' },
      { guru_id: 'g1', tanggal: '2026-10-02', shift: 'pagi', status: 'terlambat' },
      { guru_id: 'g1', tanggal: '2026-10-03', shift: 'pagi', status: 'izin' },
      { guru_id: 'g2', tanggal: '2026-10-05', shift: 'pagi', status: 'hadir' },
      { guru_id: 'g1', tanggal: '2026-11-02', shift: 'pagi', status: 'hadir' }
    ]
    const r = rekapKehadiranBulan({
      rows,
      guruId: 'g1',
      guru,
      settings: { hariLibur: ['2026-10-06'] },
      kegiatan: [],
      tahun: 2026,
      bulan: 10,
      todayIso: '2026-11-04',
      jamKini: '08:00'
    })
    expect(r).toMatchObject({ tepat: 1, terlambat: 1, izin: 1, hadir: 2, belumPulang: 1 })
    // 27 hari kerja − 1 libur manual − 3 hari berbaris = 23 alpa
    expect(r.alpa).toBe(23)
    expect(r.total).toBe(26)
  })

  it('hari depan bulan berjalan belum dinilai', () => {
    const r = rekapKehadiranBulan({
      rows: [],
      guruId: 'g1',
      guru,
      settings: {},
      kegiatan: [],
      tahun: 2026,
      bulan: 11,
      todayIso: '2026-11-03',
      jamKini: '23:00'
    })
    // 2 Nov (Senin) & 3 Nov (Selasa); 1 Nov Ahad.
    expect(r.alpa).toBe(2)
  })

  it('tanpa data guru, alpa tak dihitung', () => {
    const r = rekapKehadiranBulan({
      rows: [],
      guruId: 'g1',
      guru: null,
      tahun: 2026,
      bulan: 10,
      todayIso: '2026-11-04'
    })
    expect(r.alpa).toBe(0)
    expect(r.total).toBe(0)
  })
})

describe('bulanKehadiranTersedia', () => {
  it('bulan berjalan + bulan berdata milik guru itu, terbaru dulu', () => {
    const rows = [
      { guru_id: 'g1', tanggal: '2026-08-12' },
      { guru_id: 'g1', tanggal: '2026-10-01' },
      { guru_id: 'g2', tanggal: '2026-05-01' },
      { guru_id: 'g1', tanggal: '2026-12-01' }
    ]
    expect(bulanKehadiranTersedia(rows, 'g1', '2026-11-04')).toEqual([
      '2026-12',
      '2026-11',
      '2026-10',
      '2026-08'
    ])
  })
})
