// Merapikan tagihan ngaji yang KINI menempel ke jenis lain (Kyai, 8 Agu 2026):
//   "tagihan qiraati pagi yg sudah digabung ... kenapa masih muncul sebagai belum bayar?"
// Penggabungan hanya mengatur tagihan yang AKAN terbit; yang terlanjur terbit tetap duduk
// sebagai tunggakan. Util ini memilah mana yang aman dihapus dan mana yang HARAM disentuh.
import { describe, it, expect } from 'vitest'
import {
  pilahTagihanGabungan,
  sudahAdaBayar,
  labelTagihan,
  totalNominal
} from '../../vue-app/src/utils/rapikanGabungan.js'

const JENIS = [
  {
    id: 'sd',
    label: 'Syahriyah Sekolah SD',
    frekuensi: 'bulanan',
    nominal_default: 200000,
    lembaga_only: ['SDI']
  },
  {
    id: 'pagi',
    label: 'Syahriyah Qiraati Pagi',
    frekuensi: 'bulanan',
    nominal_default: 90000,
    gabung_ke: ['sd'],
    gabung_syarat: 'punya_sekolah'
  }
]
const SANTRI = [{ id: 's1', lembaga: 'TPQ Pagi', lembaga_sekolah: 'SDI', aktif: true }]

const tag = (o) => ({ id: 't', santri_id: 's1', periode: 'Agustus 2026', status: 'belum', ...o })
const tagPagi = (o = {}) =>
  tag({ id: 'tp', kategori: 'Syahriyah Qiraati Pagi', nominal: 90000, ...o })
const tagSdGabung = (o = {}) =>
  tag({
    id: 'ts',
    kategori: 'Syahriyah Sekolah SD',
    nominal: 200000,
    komponen: [
      { jenis_id: 'sd', label: 'Syahriyah Sekolah SD', nominal: 110000 },
      { jenis_id: 'pagi', label: 'Syahriyah Qiraati Pagi', nominal: 90000 }
    ],
    ...o
  })

describe('helper', () => {
  it('labelTagihan membaca kategori → jenis_label → jenis_id', () => {
    expect(labelTagihan({ kategori: 'Syahriyah  ' })).toBe('syahriyah')
    expect(labelTagihan({ jenis_label: 'Qiraati' })).toBe('qiraati')
    expect(labelTagihan({})).toBe('')
  })

  it('sudahAdaBayar: kolom terbayar sumber kebenaran, jsonb sbg cadangan baris lawas', () => {
    expect(sudahAdaBayar({ terbayar: 50000 })).toBe(true)
    expect(sudahAdaBayar({ terbayar: 0 })).toBe(false)
    expect(sudahAdaBayar({ data: { bayar: [{ nominal: 1000 }] } })).toBe(true)
    expect(sudahAdaBayar({})).toBe(false)
  })
})

describe('pilahTagihanGabungan', () => {
  it('AMAN: belum dibayar & tagihan sekolahnya sudah memuat komponen ngaji', () => {
    const r = pilahTagihanGabungan([tagPagi(), tagSdGabung()], SANTRI, JENIS)
    expect(r.aman.map((e) => e.tagihan.id)).toEqual(['tp'])
    expect(r.aman[0].target.id).toBe('sd')
    expect(totalNominal(r.aman)).toBe(90000)
    // Tagihan sekolahnya sendiri TIDAK ikut terpilah — ia bukan yang menempel.
    expect(r.adaBayar).toEqual([])
    expect(r.targetBelumSiap).toEqual([])
  })

  it('ADA BAYAR: jangan disentuh walau kini menempel', () => {
    const r = pilahTagihanGabungan([tagPagi({ terbayar: 90000 }), tagSdGabung()], SANTRI, JENIS)
    expect(r.aman).toEqual([])
    expect(r.adaBayar.map((e) => e.tagihan.id)).toEqual(['tp'])
  })

  it('TARGET BELUM SIAP: tagihan sekolah terbit sebelum digabung (tanpa komponen)', () => {
    // Menghapus tagihan ngajinya di sini = menghapus pemasukan yang SAH.
    const sdLama = tag({ id: 'ts', kategori: 'Syahriyah Sekolah SD', nominal: 110000 })
    const r = pilahTagihanGabungan([tagPagi(), sdLama], SANTRI, JENIS)
    expect(r.aman).toEqual([])
    expect(r.targetBelumSiap[0].alasan).toMatch(/belum memuat komponen/i)
  })

  it('TARGET BELUM SIAP: tagihan sekolah periode itu belum ada sama sekali', () => {
    const r = pilahTagihanGabungan([tagPagi()], SANTRI, JENIS)
    expect(r.targetBelumSiap[0].alasan).toMatch(/belum ada/i)
  })

  it('periode LAIN tak dipakai sbg pasangan — tiap bulan dinilai sendiri', () => {
    const sdBulanLain = tagSdGabung({ periode: 'Juli 2026' })
    const r = pilahTagihanGabungan([tagPagi(), sdBulanLain], SANTRI, JENIS)
    expect(r.aman).toEqual([])
    expect(r.targetBelumSiap).toHaveLength(1)
  })

  it('santri yang TIDAK memenuhi syarat gabung tak ikut terpilah', () => {
    // Tanpa sekolah → Qiraati Pagi memang ditagih sendiri, bukan tagihan hantu.
    const tanpaSekolah = [{ id: 's1', lembaga: 'TPQ Pagi', aktif: true }]
    const r = pilahTagihanGabungan([tagPagi()], tanpaSekolah, JENIS)
    expect(r.aman).toEqual([])
    expect(r.targetBelumSiap).toEqual([])
  })

  it('gabung_ke belum disetel -> tak ada yang dipilah (jangan menghapus apa pun)', () => {
    const belum = JENIS.map((j) => ({ ...j, gabung_ke: [] }))
    const r = pilahTagihanGabungan([tagPagi(), tagSdGabung()], SANTRI, belum)
    expect(r).toEqual({ aman: [], adaBayar: [], targetBelumSiap: [] })
  })

  it('santri atau jenis tak dikenal dilewati diam-diam, bukan dihapus', () => {
    const asing = tag({ id: 'tx', santri_id: 'entah', kategori: 'Syahriyah Qiraati Pagi' })
    const jenisAsing = tag({ id: 'ty', kategori: 'Iuran Kegiatan' })
    const r = pilahTagihanGabungan([asing, jenisAsing], SANTRI, JENIS)
    expect(r).toEqual({ aman: [], adaBayar: [], targetBelumSiap: [] })
  })

  it('komponen boleh tersimpan di jsonb `data` (baris lawas)', () => {
    const sdJsonb = tag({
      id: 'ts',
      kategori: 'Syahriyah Sekolah SD',
      nominal: 200000,
      data: { komponen: [{ jenis_id: 'sd' }, { jenis_id: 'pagi' }] }
    })
    const r = pilahTagihanGabungan([tagPagi(), sdJsonb], SANTRI, JENIS)
    expect(r.aman).toHaveLength(1)
  })

  it('masukan kosong aman', () => {
    expect(pilahTagihanGabungan(null, null, null)).toEqual({
      aman: [],
      adaBayar: [],
      targetBelumSiap: []
    })
    expect(totalNominal(null)).toBe(0)
  })
})
