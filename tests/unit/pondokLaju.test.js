// Pondok Laju tahap 2 (Kyai 16 Nov 2026): tes satu kelas, glondongan langsung ke guru kelas
// satu kartu per blok per kelas, tak ada "Belum Lulus", dan bisyaroh glondongan PER BLOK.
import { describe, it, expect } from 'vitest'
import {
  isSantriPondokLaju,
  kunciKelompokLaju,
  bolehBelumLulus,
  kelasLajuDiajukan,
  kartuGlondongan
} from '@/utils/pondokLaju'
import {
  agregatPenyimakGlondongan,
  unitBisyarohGlondongan,
  hitungTugasAktif
} from '@/utils/glondongan'

const S = (o) => ({
  lembaga: 'PTPT',
  juz: 'Juz 7',
  guru_pagi: 'Ust. Siti',
  guru_sore: 'Ust. Siti',
  is_pondok_laju: true,
  ...o
})

describe('penanda & kunci kelas', () => {
  it("Pondok Laju hanya bila ditandai dan bukan Ma'had", () => {
    expect(isSantriPondokLaju(S())).toBe(true)
    expect(isSantriPondokLaju(S({ is_pondok_laju: false }))).toBe(false)
    expect(isSantriPondokLaju(S({ is_mukim: true }))).toBe(false)
  })
  it('kunci kelas = batch + guru kelas + juz (tak peka huruf besar/spasi)', () => {
    expect(kunciKelompokLaju('tes_1', S())).toBe(
      kunciKelompokLaju('tes_1', S({ guru_pagi: ' ust.  siti ', juz: '7' }))
    )
    expect(kunciKelompokLaju('tes_1', S())).not.toBe(
      kunciKelompokLaju('tes_1', S({ juz: 'Juz 8' }))
    )
    expect(kunciKelompokLaju('tes_1', S())).not.toBe(kunciKelompokLaju('tes_2', S()))
  })
  it('PJ tak boleh memberi Belum Lulus untuk ajuan Pondok Laju', () => {
    expect(bolehBelumLulus({ pondok_laju: true })).toBe(false)
    expect(bolehBelumLulus({})).toBe(true)
    expect(bolehBelumLulus(null)).toBe(true)
  })
})

describe('kelasLajuDiajukan — tombol "centang satu kelas"', () => {
  it('mengelompokkan per guru kelas + juz, santri non-Laju dilewati', () => {
    const out = kelasLajuDiajukan([
      S({ id: 'a' }),
      S({ id: 'b' }),
      S({ id: 'c', juz: 'Juz 12', guru_pagi: 'Ust. Budi', guru_sore: 'Ust. Budi' }),
      S({ id: 'd', is_pondok_laju: false })
    ])
    expect(out.map((g) => [g.guru, g.juz, g.santri.map((s) => s.id)])).toEqual([
      ['Ust. Budi', '12', ['c']],
      ['Ust. Siti', '7', ['a', 'b']]
    ])
  })
})

describe('kartuGlondongan — satu kartu per blok per kelas', () => {
  it('baris Pondok Laju digabung per kelompok+tipe+kelas asal, baris biasa tetap tunggal', () => {
    const rows = [
      { id: 1, kelompok_laju: 'k1', tipe: 'glondongan', kelas_asal: 1, nama_cache: 'Zaid' },
      { id: 2, kelompok_laju: 'k1', tipe: 'glondongan', kelas_asal: 1, nama_cache: 'Ali' },
      { id: 3, kelompok_laju: 'k1', tipe: 'berjalan', kelas_asal: 2, nama_cache: 'Ali' },
      { id: 4, tipe: 'glondongan', kelas_asal: 1, nama_cache: 'Umar' }
    ]
    const { tunggal, kelompok } = kartuGlondongan(rows)
    expect(tunggal.map((r) => r.id)).toEqual([4])
    expect(kelompok).toHaveLength(2)
    expect(kelompok[0].rows.map((r) => r.nama_cache)).toEqual(['Ali', 'Zaid'])
  })
})

describe('bisyaroh glondongan Pondok Laju — per blok, bukan per anak', () => {
  const L = (o) => ({
    tipe: 'glondongan',
    status: 'selesai',
    tgl_nilai: '2026-11-10',
    juz: [1, 2, 3, 4, 5],
    kelas_asal: 1,
    kelompok_laju: 'k1',
    penguji_id: 'g1',
    penguji_nama: 'Ust. Siti',
    ...o
  })
  it('5 anak satu blok = 1 blok / 5 juz', () => {
    const rows = ['s1', 's2', 's3', 's4', 's5'].map((sid, i) => L({ id: 'r' + i, santri_id: sid }))
    const [g] = agregatPenyimakGlondongan(rows, '2026-11')
    expect(g).toMatchObject({ key: 'g1', blok: 1, juz: 5, santri: 5 })
  })
  it('blok berbeda (kelas asal lain) tetap terhitung sendiri', () => {
    const rows = [
      L({ id: 'a', santri_id: 's1' }),
      L({ id: 'b', santri_id: 's2' }),
      L({ id: 'c', santri_id: 's1', kelas_asal: 2, juz: [6, 7, 8, 9, 10] })
    ]
    expect(agregatPenyimakGlondongan(rows, '2026-11')[0]).toMatchObject({ blok: 2, juz: 10 })
  })
  it('blok yang selesai melintasi akhir bulan dibayar sekali, di bulan pertama', () => {
    const rows = [
      L({ id: 'a', santri_id: 's1', tgl_nilai: '2026-10-31T09:00:00Z' }),
      L({ id: 'b', santri_id: 's2', tgl_nilai: '2026-11-01T09:00:00Z' })
    ]
    expect(unitBisyarohGlondongan(rows, '2026-10')).toHaveLength(1)
    expect(unitBisyarohGlondongan(rows, '2026-11')).toHaveLength(0)
  })
  it('baris biasa (bukan Pondok Laju) tetap per anak', () => {
    const rows = [
      L({ id: 'a', santri_id: 's1', kelompok_laju: '' }),
      L({ id: 'b', santri_id: 's2', kelompok_laju: '' })
    ]
    expect(agregatPenyimakGlondongan(rows, '2026-11')[0]).toMatchObject({ blok: 2, juz: 10 })
  })
})

describe('penyimak sibuk', () => {
  it('blok Pondok Laju guru kelas tak membuatnya tampak sibuk untuk penugasan biasa', () => {
    const peta = hitungTugasAktif([
      { tipe: 'glondongan', status: 'ditugaskan', penguji_id: 'g1', kelompok_laju: 'k1' },
      { tipe: 'glondongan', status: 'ditugaskan', penguji_id: 'g2' }
    ])
    expect(peta.byId.get('g1')).toBeUndefined()
    expect(peta.byId.get('g2')).toBe(1)
  })
})
