// Kyai (21 Jul 2026): "Pemilihan kordinator glondongan pakai dropdown saja, dan ada
// beberapa guru yg dipilih hanya menyimak glondongan santri mukim dan tidak mukim"
// + "yg menyimak glondongan juga harus dipilih, untuk ma'had atau selainnya. jadi
// bukan hanya kordinator."
//
// UI jadi baris [pilih guru ▾][cakupan ▾], tapi bentuk SIMPAN di DB tetap map per
// kategori — supaya data koordinator yang sudah ada tetap terbaca tanpa migrasi.
import { describe, it, expect } from 'vitest'
import {
  peranKeBaris,
  barisKePeran,
  getKoordinatorGlondongan,
  getPenyimakGlondongan,
  isPenyimakKategori
} from '@/utils/glondongan'

describe('peranKeBaris — map DB → baris UI', () => {
  it('guru di dua kategori jadi satu baris "Keduanya"', () => {
    const baris = peranKeBaris({ mahad: ['g1'], nonmahad: ['g1'] })
    expect(baris).toEqual([{ guru_id: 'g1', cakupan: 'both' }])
  })

  it('guru di satu kategori saja', () => {
    const baris = peranKeBaris({ mahad: ['g1'], nonmahad: ['g2'] })
    expect(baris).toEqual([
      { guru_id: 'g1', cakupan: 'mahad' },
      { guru_id: 'g2', cakupan: 'nonmahad' }
    ])
  })

  it('map kosong / rusak → [] (bukan lempar)', () => {
    expect(peranKeBaris({})).toEqual([])
    expect(peranKeBaris(null)).toEqual([])
    expect(peranKeBaris({ mahad: 'bukan array' })).toEqual([])
  })
})

describe('barisKePeran — baris UI → map DB', () => {
  it('"Keduanya" masuk ke dua kategori', () => {
    expect(barisKePeran([{ guru_id: 'g1', cakupan: 'both' }])).toEqual({
      mahad: ['g1'],
      nonmahad: ['g1']
    })
  })

  it('baris tanpa guru terpilih diabaikan (baris kosong hasil klik Tambah)', () => {
    const map = barisKePeran([
      { guru_id: '', cakupan: 'both' },
      { guru_id: '   ', cakupan: 'mahad' },
      { guru_id: 'g1', cakupan: 'mahad' }
    ])
    expect(map).toEqual({ mahad: ['g1'], nonmahad: [] })
  })

  it('guru tercantum dua kali digabung, bukan jadi duplikat', () => {
    const map = barisKePeran([
      { guru_id: 'g1', cakupan: 'mahad' },
      { guru_id: 'g1', cakupan: 'nonmahad' }
    ])
    expect(map).toEqual({ mahad: ['g1'], nonmahad: ['g1'] })
  })

  it('bolak-balik map → baris → map tetap sama (tak ada data hilang)', () => {
    const asli = { mahad: ['g1', 'g2'], nonmahad: ['g2', 'g3'] }
    expect(barisKePeran(peranKeBaris(asli))).toEqual(asli)
  })
})

describe('koordinator & penyimak = dua daftar terpisah', () => {
  const lembagaList = [
    {
      lembaga: 'PTPT',
      koordinator_glondongan: { mahad: ['k1'], nonmahad: [] },
      penyimak_glondongan: { mahad: ['p1'], nonmahad: ['p2'] }
    }
  ]

  it('dibaca dari field masing-masing, tidak tercampur', () => {
    expect(getKoordinatorGlondongan(lembagaList)).toEqual({ mahad: ['k1'], nonmahad: [] })
    expect(getPenyimakGlondongan(lembagaList)).toEqual({ mahad: ['p1'], nonmahad: ['p2'] })
  })

  it('koordinator TIDAK otomatis jadi penyimak', () => {
    // Kalau ini true, saringan dropdown penguji bocor.
    expect(isPenyimakKategori('k1', 'mahad', lembagaList)).toBe(false)
  })

  it('penyimak dicek per kategori', () => {
    expect(isPenyimakKategori('p1', 'mahad', lembagaList)).toBe(true)
    expect(isPenyimakKategori('p1', 'nonmahad', lembagaList)).toBe(false)
    expect(isPenyimakKategori('p2', 'nonmahad', lembagaList)).toBe(true)
  })

  it('PTPT belum punya field penyimak → map kosong, bukan error', () => {
    const lama = [{ lembaga: 'PTPT', koordinator_glondongan: { mahad: ['k1'] } }]
    expect(getPenyimakGlondongan(lama)).toEqual({ mahad: [], nonmahad: [] })
    expect(isPenyimakKategori('k1', 'mahad', lama)).toBe(false)
  })

  it('guru id kosong → bukan penyimak', () => {
    expect(isPenyimakKategori('', 'mahad', lembagaList)).toBe(false)
    expect(isPenyimakKategori(null, 'mahad', lembagaList)).toBe(false)
  })
})
