import { describe, it, expect } from 'vitest'
import { susunAgenda, jenisAgenda, labelRentang } from '@/utils/agenda'
import { kegiatanUntukTamu, publikBawaan } from '@/utils/wilayahPublik'

const DATA = [
  { id: 'a', judul: 'PAS 1', tgl_mulai: '2026-11-26', tgl_akhir: '2026-12-02', tipe: 'ujian' },
  { id: 'b', judul: 'Haflah', tgl_mulai: '2026-12-20', tipe: 'kegiatan' },
  { id: 'c', judul: 'Maulid lalu', tgl_mulai: '2026-08-20', tipe: 'kegiatan' },
  {
    id: 'd',
    judul: 'Libur semester',
    tgl_mulai: '2026-12-22',
    tgl_akhir: '2027-01-03',
    tipe: 'libur'
  },
  { id: 'e', judul: 'Rapat awal bulan', tgl_mulai: '2026-11-02', tipe: 'kegiatan' }
]
const HARI_INI = '2026-11-25'

describe('susunAgenda', () => {
  it('akan datang: yang belum selesai, urut naik, dikelompokkan per bulan', () => {
    const g = susunAgenda(DATA, { saring: 'akan', hariIni: HARI_INI })
    expect(g.map((x) => x.label)).toEqual(['November 2026', 'Desember 2026'])
    expect(g.flatMap((x) => x.item.map((i) => i.id))).toEqual(['a', 'b', 'd'])
  })
  it('bulan ini: yang berlangsung di bulan berjalan (termasuk yang sudah lewat tanggalnya)', () => {
    const ids = susunAgenda(DATA, { saring: 'bulan', hariIni: HARI_INI }).flatMap((x) =>
      x.item.map((i) => i.id)
    )
    expect(ids).toEqual(['e', 'a'])
  })
  it('semua: terbaru dulu', () => {
    const ids = susunAgenda(DATA, { saring: 'semua', hariIni: HARI_INI }).flatMap((x) =>
      x.item.map((i) => i.id)
    )
    expect(ids).toEqual(['d', 'b', 'a', 'e', 'c'])
  })
  it('blok tanggal, jenis lencana, rentang', () => {
    const a = susunAgenda(DATA, { saring: 'akan', hariIni: HARI_INI })[0].item[0]
    expect(a).toMatchObject({ hari: 26, bulanPendek: 'NOV', jenis: 'ujian' })
    expect(a.rentang).toBe('26 Nov – 2 Des 2026')
    expect(jenisAgenda('libur_nasional')).toBe('libur')
    expect(jenisAgenda('rapot')).toBe('kegiatan')
    expect(labelRentang('2026-12-22', '2027-01-03')).toBe('22 Des 2026 – 3 Jan 2027')
  })
})

describe('penanda publik', () => {
  it('pilihan admin menang atas aturan bawaan', () => {
    expect(kegiatanUntukTamu({ audience: 'guru', publik: true })).toBe(true)
    expect(kegiatanUntukTamu({ audience: 'semua', tipe: 'libur', publik: false })).toBe(false)
  })
  it('bawaan (cermin migrasi 20261125150000): semua & bukan agenda khusus lembaga; libur selalu', () => {
    expect(publikBawaan({ audience: 'semua', tipe: 'kegiatan' })).toBe(true)
    expect(publikBawaan({ audience: 'semua', tipe: 'kegiatan', lembaga: ['SDI'] })).toBe(false)
    expect(publikBawaan({ audience: 'semua', tipe: 'libur', lembaga: ['SDI'] })).toBe(true)
    expect(publikBawaan({ audience: 'guru', tipe: 'libur' })).toBe(false)
    expect(publikBawaan({})).toBe(true)
  })
})
