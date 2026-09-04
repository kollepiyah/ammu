// pindahJendelaRekap — rencana memindahkan isian rekap ke bucket bulan yang benar.
//
// Kyai (4 Sep 2026): "guru yg mengisi dari tgl 29 agustus - september itu adalah data
// september."
//
// Yang dijaga tes ini adalah TIGA PENJAGA-nya, karena rencana ini menyentuh riwayat yang
// sudah tersimpan dan salah satu langkahnya menghapus baris:
//   1. pembedanya WAKTU TULIS — rekap bulan lalu yang SAH tak boleh ikut terbawa;
//   2. baris tanpa `updatedAt` tak pernah ikut;
//   3. tujuan yang sudah berangka tak pernah ditimpa — dilaporkan sebagai `bentrok`.
import { describe, it, expect } from 'vitest'
import { rencanaPindahJendela } from '@/utils/pindahJendelaRekap'

const baris = (o) => ({
  id: `rp_${o.santri_id}_${o.periode}`,
  santri_id: o.santri_id,
  santri_nama: o.nama || `Santri ${o.santri_id}`,
  periode: o.periode,
  updatedAt: o.updatedAt,
  awal: o.awal ?? '',
  akhir: o.akhir ?? '',
  total: o.total ?? '',
  juz: o.juz ?? '',
  lembaga: 'PTPT',
  kelas: o.kelas ?? 'Kelas 1'
})

describe('rencanaPindahJendela — Agustus 29–31 → rekap September', () => {
  it('KUNCI: isian 29–31 Agustus masuk daftar pindah, dengan id tujuan yang benar', () => {
    const rows = [
      baris({
        santri_id: 's1',
        periode: '2026-08',
        updatedAt: '2026-08-30T02:00:00Z',
        awal: '20',
        akhir: '35'
      })
    ]
    const r = rencanaPindahJendela(rows, '2026-09')
    expect(r.periodeDari).toBe('2026-08')
    expect(r.periodeKe).toBe('2026-09')
    expect(r.sejak).toBe('2026-08-29')
    expect(r.pindah).toHaveLength(1)
    expect(r.pindah[0]).toMatchObject({
      santriId: 's1',
      dariId: 'rp_s1_2026-08',
      keId: 'rp_s1_2026-09',
      awal: '20',
      akhir: '35'
    })
  })

  it('KUNCI: rekap Agustus yang SAH (diisi 29 Jul–5 Agu) tidak ikut dipindah', () => {
    const rows = [
      baris({
        santri_id: 's1',
        periode: '2026-08',
        updatedAt: '2026-07-30T02:00:00Z',
        akhir: '10'
      }),
      baris({
        santri_id: 's2',
        periode: '2026-08',
        updatedAt: '2026-08-04T02:00:00Z',
        akhir: '11'
      }),
      baris({ santri_id: 's3', periode: '2026-08', updatedAt: '2026-08-28T23:00:00Z', akhir: '12' })
    ]
    expect(rencanaPindahJendela(rows, '2026-09').pindah).toHaveLength(0)
  })

  it('KUNCI: baris tanpa updatedAt tak pernah ikut', () => {
    const rows = [
      baris({ santri_id: 's1', periode: '2026-08', updatedAt: '', akhir: '10' }),
      baris({ santri_id: 's2', periode: '2026-08', updatedAt: 'entah', akhir: '10' })
    ]
    expect(rencanaPindahJendela(rows, '2026-09').pindah).toHaveLength(0)
  })

  it('KUNCI: tujuan yang sudah berangka jadi `bentrok`, bukan ditimpa', () => {
    const rows = [
      baris({
        santri_id: 's1',
        periode: '2026-08',
        updatedAt: '2026-08-30T02:00:00Z',
        awal: '20',
        akhir: '35'
      }),
      baris({
        santri_id: 's1',
        periode: '2026-09',
        updatedAt: '2026-09-02T02:00:00Z',
        awal: '21',
        akhir: '40'
      })
    ]
    const r = rencanaPindahJendela(rows, '2026-09')
    expect(r.pindah).toHaveLength(0)
    expect(r.bentrok).toHaveLength(1)
    expect(r.bentrok[0]).toMatchObject({ santriId: 's1', akhir: '35', tujuanAkhir: '40' })
  })

  it('tujuan yang ADA tapi KOSONG tetap boleh diisi — bukan bentrok', () => {
    const rows = [
      baris({
        santri_id: 's1',
        periode: '2026-08',
        updatedAt: '2026-08-30T02:00:00Z',
        akhir: '35'
      }),
      baris({ santri_id: 's1', periode: '2026-09', updatedAt: '2026-09-02T02:00:00Z' }) // kosong melompong
    ]
    const r = rencanaPindahJendela(rows, '2026-09')
    expect(r.pindah).toHaveLength(1)
    expect(r.bentrok).toHaveLength(0)
  })

  it('baris asal yang kosong tak dipindah (tak ada yang bisa dipindahkan)', () => {
    const rows = [baris({ santri_id: 's1', periode: '2026-08', updatedAt: '2026-08-30T02:00:00Z' })]
    expect(rencanaPindahJendela(rows, '2026-09').pindah).toHaveLength(0)
  })

  it('baris kembar di periode asal: yang TERBARU yang dipindah', () => {
    const rows = [
      baris({
        santri_id: 's1',
        periode: '2026-08',
        updatedAt: '2026-08-29T01:00:00Z',
        akhir: '30'
      }),
      {
        ...baris({
          santri_id: 's1',
          periode: '2026-08',
          updatedAt: '2026-08-31T09:00:00Z',
          akhir: '44'
        }),
        id: 'rp_s1_2026-08'
      }
    ]
    const r = rencanaPindahJendela(rows, '2026-09')
    expect(r.pindah).toHaveLength(1)
    expect(r.pindah[0].akhir).toBe('44')
  })

  it('periode lain tak tersentuh sama sekali', () => {
    const rows = [
      baris({ santri_id: 's1', periode: '2026-07', updatedAt: '2026-08-30T02:00:00Z', akhir: '9' }),
      baris({ santri_id: 's2', periode: '2026-09', updatedAt: '2026-09-02T02:00:00Z', akhir: '9' })
    ]
    expect(rencanaPindahJendela(rows, '2026-09').pindah).toHaveLength(0)
  })

  it('bisa dibatasi ke santri yang sedang tampil', () => {
    const rows = [
      baris({
        santri_id: 's1',
        periode: '2026-08',
        updatedAt: '2026-08-30T02:00:00Z',
        akhir: '30'
      }),
      baris({ santri_id: 's2', periode: '2026-08', updatedAt: '2026-08-30T02:00:00Z', akhir: '31' })
    ]
    expect(rencanaPindahJendela(rows, '2026-09', { idSantri: ['s2'] }).pindah).toHaveLength(1)
    expect(rencanaPindahJendela(rows, '2026-09', { idSantri: [] }).pindah).toHaveLength(0)
  })

  it('nama & kelas diambil dari baris santri bila snapshot-nya kosong', () => {
    const rows = [
      {
        ...baris({
          santri_id: 's1',
          periode: '2026-08',
          updatedAt: '2026-08-30T02:00:00Z',
          akhir: '30'
        }),
        santri_nama: '',
        kelas: ''
      }
    ]
    const r = rencanaPindahJendela(rows, '2026-09', {
      santriList: [{ id: 's1', nama: 'Nur Arsyla', kelas: 'Kelas 2' }]
    })
    expect(r.pindah[0].nama).toBe('Nur Arsyla')
    expect(r.pindah[0].kelas).toBe('Kelas 2')
    expect(r.pindah[0].santri).toMatchObject({ id: 's1' })
  })

  it('hasilnya urut nama, supaya pratinjau kedua sama dengan yang pertama', () => {
    const rows = [
      baris({
        santri_id: 's1',
        nama: 'Zaki',
        periode: '2026-08',
        updatedAt: '2026-08-30T02:00:00Z',
        akhir: '30'
      }),
      baris({
        santri_id: 's2',
        nama: 'Ahmad',
        periode: '2026-08',
        updatedAt: '2026-08-30T02:00:00Z',
        akhir: '31'
      })
    ]
    expect(rencanaPindahJendela(rows, '2026-09').pindah.map((x) => x.nama)).toEqual([
      'Ahmad',
      'Zaki'
    ])
  })

  it('menyeberang tahun: rekap Januari menarik dari Desember, sejak 29 Des', () => {
    const rows = [
      baris({ santri_id: 's1', periode: '2026-12', updatedAt: '2026-12-30T02:00:00Z', akhir: '30' })
    ]
    const r = rencanaPindahJendela(rows, '2027-01')
    expect(r.sejak).toBe('2026-12-29')
    expect(r.pindah[0].keId).toBe('rp_s1_2027-01')
  })

  it('masukan sampah aman', () => {
    expect(rencanaPindahJendela(null, '2026-09').pindah).toEqual([])
    expect(rencanaPindahJendela([], '').pindah).toEqual([])
    expect(rencanaPindahJendela([], 'bukan-periode').bentrok).toEqual([])
  })
})
