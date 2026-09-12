// Tes utils/filterQuery — penyaring daftar ⇄ query URL.
//
// Yang dijaga: keluhan Kyai 12 Sep 2026 ("pilih filter … lalu edit dan simpan selalu
// kembali ke semula") tak boleh kambuh lewat dua jalan yang sudah terbukti:
//   1. penyaring yang tak ikut ditulis ke URL, dan
//   2. tulis-balik ke URL yang menghapus kunci milik halaman induk.
import { describe, it, expect } from 'vitest'
import {
  bacaFilterQuery,
  tulisFilterQuery,
  queryBerubah,
  alamatBawaFilter
} from '@/utils/filterQuery'

// Spec Data Santri — sengaja disalin utuh: kalau seseorang menambah penyaring di view
// tanpa mendaftarkannya, tes bolak-balik di bawah tetap hijau, TAPI daftar ini jadi
// dokumentasi hidup tentang apa yang seharusnya bertahan sesudah Simpan.
const SPEC_SANTRI = [
  { kunci: 'q' },
  { kunci: 'lembaga' },
  { kunci: 'tempat' },
  { kunci: 'status', bawaan: 'aktif' },
  { kunci: 'gedung' },
  { kunci: 'pj' },
  { kunci: 'kelasguru' },
  { kunci: 'sisi', bawaan: 'qiraati' }
]

describe('bacaFilterQuery', () => {
  it('mengisi SELURUH kunci spec, termasuk yang tak ada di URL', () => {
    const v = bacaFilterQuery({ q: 'ahmad' }, SPEC_SANTRI)
    expect(Object.keys(v).sort()).toEqual(SPEC_SANTRI.map((f) => f.kunci).sort())
    expect(v.q).toBe('ahmad')
    expect(v.lembaga).toBe('')
  })

  it('kunci yang hilang kembali ke bawaannya, bukan string kosong', () => {
    const v = bacaFilterQuery({}, SPEC_SANTRI)
    expect(v.status).toBe('aktif')
    expect(v.sisi).toBe('qiraati')
  })

  it('nilai kosong dianggap tak ada (?status= tak boleh jadi "tampil semua")', () => {
    expect(bacaFilterQuery({ status: '' }, SPEC_SANTRI).status).toBe('aktif')
  })

  it('kunci ganda (?q=a&q=b) memakai yang pertama, bukan array', () => {
    expect(bacaFilterQuery({ q: ['a', 'b'] }, SPEC_SANTRI).q).toBe('a')
  })
})

describe('tulisFilterQuery', () => {
  it('hanya menulis yang bukan bawaan — URL tetap pendek', () => {
    const q = tulisFilterQuery({ q: 'ahmad', status: 'aktif', sisi: 'qiraati' }, SPEC_SANTRI)
    expect(q).toEqual({ q: 'ahmad' })
  })

  it('menulis penyaring yang DULU hilang: gedung, pj, kelasguru, sisi', () => {
    const q = tulisFilterQuery(
      { gedung: 'Gedung A', pj: 'Ust. Fulan', kelasguru: 'ptpt|r3', sisi: 'sekolah' },
      SPEC_SANTRI
    )
    expect(q).toEqual({
      gedung: 'Gedung A',
      pj: 'Ust. Fulan',
      kelasguru: 'ptpt|r3',
      sisi: 'sekolah'
    })
  })

  it('kunci halaman induk dipertahankan (Master Data tak melompat tab)', () => {
    const q = tulisFilterQuery({ q: 'ahmad' }, SPEC_SANTRI, { tab: 'santri', sub: 'x' }, [
      'tab',
      'sub'
    ])
    expect(q).toEqual({ tab: 'santri', sub: 'x', q: 'ahmad' })
  })

  it('kunci induk yang tak ada tidak dikarang', () => {
    expect(tulisFilterQuery({}, SPEC_SANTRI, {}, ['tab'])).toEqual({})
  })
})

describe('bolak-balik: URL → penyaring → URL harus stabil', () => {
  // Inilah inti keluhan: daftar → Edit → Simpan → daftar. Alamat yang dititipkan ke form
  // adalah hasil tulis; yang dipulihkan adalah hasil baca. Kalau keduanya tak identik,
  // satu putaran saja sudah cukup membuat penyaring "lupa sendiri".
  const kasus = [
    { tab: 'santri', q: 'ahmad' },
    { tab: 'santri', lembaga: 'PTPT', gedung: 'Gedung A' },
    { q: 'siti', pj: 'Ust. Fulan', kelasguru: 'tpq pagi|r1', status: 'tidak_aktif' },
    { sisi: 'sekolah' },
    {}
  ]
  for (const awal of kasus) {
    it(`stabil untuk ${JSON.stringify(awal)}`, () => {
      const nilai = bacaFilterQuery(awal, SPEC_SANTRI)
      const akhir = tulisFilterQuery(nilai, SPEC_SANTRI, awal, ['tab', 'sub'])
      expect(akhir).toEqual(awal)
      expect(queryBerubah(awal, akhir)).toBe(false)
    })
  }
})

describe('penyaring yang boleh dicentang lebih dari satu (`daftar`)', () => {
  // Kyai, 12 Sep 2026: "filter kelas (nama guru) … bisa centang, jadi bisa tampil kelas
  // dari beberapa guru". Nilainya `${lembaga}|${kunciRombel}`, dipisah koma di URL.
  const SPEC = [{ kunci: 'kelasguru', daftar: true }, { kunci: 'q' }]

  it('kosong = larik kosong, bukan [""]', () => {
    expect(bacaFilterQuery({}, SPEC).kelasguru).toEqual([])
    expect(bacaFilterQuery({ kelasguru: '' }, SPEC).kelasguru).toEqual([])
  })

  it('membaca beberapa nilai sekaligus', () => {
    expect(bacaFilterQuery({ kelasguru: 'ptpt|r1,ptpt|r2' }, SPEC).kelasguru).toEqual([
      'ptpt|r1',
      'ptpt|r2'
    ])
  })

  it('potongan kosong dibuang — URL tempelan tak melahirkan penyaring hantu', () => {
    expect(bacaFilterQuery({ kelasguru: ',,ptpt|r1, ,' }, SPEC).kelasguru).toEqual(['ptpt|r1'])
  })

  it('menulis kembali sebagai satu kunci dipisah koma', () => {
    expect(tulisFilterQuery({ kelasguru: ['a|1', 'b|2'] }, SPEC)).toEqual({ kelasguru: 'a|1,b|2' })
  })

  it('larik kosong TIDAK ditulis ke URL', () => {
    expect(tulisFilterQuery({ kelasguru: [] }, SPEC)).toEqual({})
    expect(tulisFilterQuery({}, SPEC)).toEqual({})
  })

  it('bolak-balik tetap stabil — ini yang menjaga penyaring tak lupa sesudah Simpan', () => {
    for (const awal of [{}, { kelasguru: 'a|1' }, { kelasguru: 'a|1,b|2', q: 'siti' }]) {
      const nilai = bacaFilterQuery(awal, SPEC)
      const akhir = tulisFilterQuery(nilai, SPEC, awal)
      expect(akhir).toEqual(awal)
      expect(queryBerubah(awal, akhir)).toBe(false)
    }
  })
})

describe('queryBerubah — pengganti bendera _syncingQuery', () => {
  it('false untuk isi yang sama walau urutan kunci beda', () => {
    expect(queryBerubah({ a: '1', b: '2' }, { b: '2', a: '1' })).toBe(false)
  })

  it('true bila ada kunci yang hilang — ini yang dulu menghapus tab diam-diam', () => {
    expect(queryBerubah({ tab: 'santri', q: 'a' }, { q: 'a' })).toBe(true)
  })

  it('true bila nilainya berubah', () => {
    expect(queryBerubah({ q: 'a' }, { q: 'b' })).toBe(true)
  })

  it('menyamakan angka dengan string (router kadang memberi keduanya)', () => {
    expect(queryBerubah({ hal: 2 }, { hal: '2' })).toBe(false)
  })
})

describe('alamatBawaFilter — tombol "Kelola"', () => {
  it('membawa seluruh penyaring yang sedang aktif, bukan alamat karangan', () => {
    const a = alamatBawaFilter(
      '/master-data',
      { q: 'ahmad', lembaga: 'PTPT', gedung: 'Gedung A' },
      { tab: 'santri' }
    )
    expect(a).toEqual({
      path: '/master-data',
      query: { q: 'ahmad', lembaga: 'PTPT', gedung: 'Gedung A', tab: 'santri' }
    })
  })

  it('tambahan menimpa kunci yang sudah ada', () => {
    expect(alamatBawaFilter('/master-data', { tab: 'guru' }, { tab: 'santri' }).query.tab).toBe(
      'santri'
    )
  })

  it('tambahan bernilai kosong MENGHAPUS kuncinya', () => {
    expect(alamatBawaFilter('/x', { a: '1', b: '2' }, { b: '' }).query).toEqual({ a: '1' })
  })

  it('query kosong/undefined aman', () => {
    expect(alamatBawaFilter('/x', undefined, { tab: 't' })).toEqual({
      path: '/x',
      query: { tab: 't' }
    })
  })
})
