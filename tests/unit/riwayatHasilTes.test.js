// Menu Capaian Prestasi santri TPQ s/d Pra PTPT = hasil tes kenaikan (Kyai, 4 Nov 2026).
import { describe, it, expect } from 'vitest'
import { riwayatHasilTes } from '@/utils/tesKenaikan'

const rows = [
  {
    id: 'a1',
    santri_id: 'S1',
    lembaga: 'TPQ Pagi',
    kelas_asal: 'Jilid 2A',
    target: 'Jilid 2B',
    status: 'lulus',
    tgl_hasil: '2026-10-20T00:00:00.000Z',
    penguji: 'Ustdz. Siti',
    catatan_hasil: 'Lancar',
    nilai: { fashohah: 85, tartil: 80, doa_harian: 'x', surat_pendek: 120 },
    riwayat_hasil: [
      {
        status: 'tidak_lulus',
        tgl_hasil: '2026-10-05T00:00:00.000Z',
        penguji: 'Ustdz. Siti',
        catatan_hasil: 'Ulang tajwid'
      }
    ]
  },
  { id: 'a2', santri_id: 'S1', lembaga: 'TPQ Pagi', status: 'diajukan', target: 'Jilid 3A' },
  { id: 'a3', santri_id: 'S1', lembaga: 'TPQ Pagi', status: 'dibatalkan', target: 'Jilid 3A' },
  { id: 'a4', santri_id: 'S2', lembaga: 'PTPT', status: 'lulus', tgl_hasil: '2026-10-01' },
  {
    id: 'a5',
    santri_id: 'S1',
    lembaga: 'PTPT',
    jenis: 'juz',
    juz_asal: 'JUZ 3',
    target: 'Juz 4',
    status: 'tidak_lulus',
    tgl_hasil: '2026-11-01'
  }
]

describe('riwayatHasilTes', () => {
  const r = riwayatHasilTes(rows, 'S1')

  it('hanya hasil milik santri itu yang sudah diputus, terbaru dulu, termasuk hasil sebelum tes ulang', () => {
    expect(r.map((x) => [x.key, x.status])).toEqual([
      ['a5', 'tidak_lulus'],
      ['a1', 'lulus'],
      ['a1#0', 'tidak_lulus']
    ])
  })

  it('nilai berlabel aspek lembaganya; nilai tak sah dibuang, lewat batas dijepit', () => {
    const a1 = r.find((x) => x.key === 'a1')
    expect(a1.nilai).toEqual([
      { key: 'fashohah', label: 'Fashohah', nilai: 85 },
      { key: 'tartil', label: 'Tartil', nilai: 80 },
      { key: 'surat_pendek', label: 'Surat Pendek', nilai: 90 }
    ])
    expect(a1.asal).toBe('Jilid 2A')
    expect(r.find((x) => x.key === 'a5').asal).toBe('Juz 3')
  })
})
