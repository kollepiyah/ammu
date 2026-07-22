// Kyai (22 Jul 2026): "tambahkan sub menu baru untuk rekapan glondongan (penyimak)
// seperti rekap bisyaroh glondongan tapi tanpa nominal tarif dan bisa dilihat oleh
// kordinator, dan ada ekspor pdf serta filter bulan."
//
// Agregasinya diangkat jadi util murni supaya Rekap Bisyaroh (bernominal) dan Rekap
// Penyimak (tanpa nominal) MUSTAHIL berbeda angka blok/juz — dulu hitungannya ada di
// dalam komponen dan bakal tergoda disalin.
import { describe, it, expect } from 'vitest'
import { agregatPenyimakGlondongan, totalPenyimakGlondongan } from '@/utils/glondongan'

const sel = (o) => ({
  tipe: 'glondongan',
  status: 'selesai',
  tgl_nilai: '2026-07-10',
  juz: [1, 2, 3, 4, 5],
  ...o
})
const cari = (agg, key) => agg.find((g) => g.key === key)

describe('agregatPenyimakGlondongan — rekap per penyimak per bulan', () => {
  it('menjumlah blok & juz per penguji', () => {
    const agg = agregatPenyimakGlondongan(
      [
        sel({ penguji_id: 'g1', penguji_nama: 'Ust. A', santri_id: 's1' }),
        sel({ penguji_id: 'g1', penguji_nama: 'Ust. A', santri_id: 's2', juz: [6, 7, 8, 9, 10] }),
        sel({ penguji_id: 'g2', penguji_nama: 'Ust. B', santri_id: 's3' })
      ],
      '2026-07'
    )
    expect(cari(agg, 'g1')).toMatchObject({ nama: 'Ust. A', blok: 2, juz: 10, santri: 2 })
    expect(cari(agg, 'g2')).toMatchObject({ nama: 'Ust. B', blok: 1, juz: 5, santri: 1 })
  })

  it('bulan lain tidak ikut (filter bulan)', () => {
    const rows = [
      sel({ penguji_id: 'g1', penguji_nama: 'Ust. A', santri_id: 's1' }),
      sel({ penguji_id: 'g1', penguji_nama: 'Ust. A', santri_id: 's2', tgl_nilai: '2026-06-28' })
    ]
    expect(cari(agregatPenyimakGlondongan(rows, '2026-07'), 'g1').blok).toBe(1)
    expect(cari(agregatPenyimakGlondongan(rows, '2026-06'), 'g1').blok).toBe(1)
    expect(agregatPenyimakGlondongan(rows, '2026-05')).toEqual([])
  })

  it('hanya baris SELESAI bertipe glondongan yang dihitung', () => {
    const agg = agregatPenyimakGlondongan(
      [
        sel({ penguji_id: 'g1', penguji_nama: 'Ust. A', santri_id: 's1', status: 'ditugaskan' }),
        sel({ penguji_id: 'g1', penguji_nama: 'Ust. A', santri_id: 's1', tipe: 'berjalan' }),
        sel({ penguji_id: 'g1', penguji_nama: 'Ust. A', santri_id: 's1', status: 'menunggu' })
      ],
      '2026-07'
    )
    expect(agg).toEqual([])
  })

  it('santri yang disimak 2 blok oleh penguji sama dihitung 1', () => {
    const agg = agregatPenyimakGlondongan(
      [
        sel({ penguji_id: 'g1', penguji_nama: 'Ust. A', santri_id: 's1' }),
        sel({ penguji_id: 'g1', penguji_nama: 'Ust. A', santri_id: 's1', juz: [6, 7] })
      ],
      '2026-07'
    )
    expect(cari(agg, 'g1')).toMatchObject({ blok: 2, juz: 7, santri: 1 })
  })

  it('baris lama tanpa penguji_id dikelompokkan lewat nama', () => {
    const agg = agregatPenyimakGlondongan(
      [
        sel({ penguji_id: '', penguji_nama: 'Ust. A', santri_id: 's1' }),
        sel({ penguji_id: '', penguji_nama: 'Ust. A', santri_id: 's2' })
      ],
      '2026-07'
    )
    expect(agg).toHaveLength(1)
    expect(agg[0]).toMatchObject({ nama: 'Ust. A', blok: 2, santri: 2 })
  })

  it('tanpa tgl_nilai / juz bukan array → tak bikin NaN', () => {
    const agg = agregatPenyimakGlondongan(
      [
        sel({ penguji_id: 'g1', penguji_nama: 'Ust. A', santri_id: 's1', tgl_nilai: '' }),
        sel({ penguji_id: 'g1', penguji_nama: 'Ust. A', santri_id: 's1', juz: null })
      ],
      '2026-07'
    )
    expect(cari(agg, 'g1')).toMatchObject({ blok: 1, juz: 0 })
  })

  it('input kosong/rusak → [] (bukan lempar)', () => {
    expect(agregatPenyimakGlondongan(null, '2026-07')).toEqual([])
    expect(agregatPenyimakGlondongan([null, {}], '2026-07')).toEqual([])
  })
})

describe('totalPenyimakGlondongan — total lintas penguji', () => {
  it('santri yang disimak DUA penyimak tak terhitung dua kali', () => {
    const agg = agregatPenyimakGlondongan(
      [
        sel({ penguji_id: 'g1', penguji_nama: 'Ust. A', santri_id: 's1' }),
        sel({ penguji_id: 'g2', penguji_nama: 'Ust. B', santri_id: 's1', juz: [6, 7] }),
        sel({ penguji_id: 'g2', penguji_nama: 'Ust. B', santri_id: 's2', juz: [8] })
      ],
      '2026-07'
    )
    expect(totalPenyimakGlondongan(agg)).toEqual({ blok: 3, juz: 8, santri: 2 })
  })

  it('input kosong/rusak → nol (bukan lempar)', () => {
    expect(totalPenyimakGlondongan(null)).toEqual({ blok: 0, juz: 0, santri: 0 })
    expect(totalPenyimakGlondongan([null, {}])).toEqual({ blok: 0, juz: 0, santri: 0 })
  })
})
