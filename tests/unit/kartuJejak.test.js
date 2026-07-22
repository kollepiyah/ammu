// Kyai (22 Jul 2026): "kalau santri pindah lembaga apakah data riwayatnya masih
// tercatat?" — tercatat: `kartu_kenaikan` disimpan PER LEMBAGA dan kunci lama tak
// pernah dihapus. Yang hilang cuma jalan masuknya (daftar Riwayat menyaring santri ke
// lembaga SEKARANG). Util ini yang memunculkan mereka lagi sebagai "alumni".
import { describe, it, expect } from 'vitest'
import {
  kunciKartuLembaga,
  countTanggalKartu,
  countCatatanKartu,
  adaJejakKartu
} from '@/utils/kartuJejak'

// Bentuk nyata: santri yang sudah pindah TPQ Pagi → Pra PTPT, kartunya punya DUA kunci.
const KARTU = {
  'TPQ Pagi': {
    jilid_5: { '5A': '2026-05-02', '5B': '2026-06-11' },
    kpi: { kpi_done: '2026-07-01', entries: [{ tanggal: '2026-07-01', text: 'lancar' }] }
  },
  'Pra PTPT': {
    lvl_1: { kh_I: '2026-07-21' }
  }
}

describe('kunciKartuLembaga — nama alias', () => {
  it('TPQ & PPPH punya alias, lainnya apa adanya', () => {
    expect(kunciKartuLembaga('TPQ')).toEqual(['TPQ Pagi', 'TPQ Sore', 'TPQ'])
    expect(kunciKartuLembaga('PPPH')).toEqual(['PPPH', 'P3H'])
    expect(kunciKartuLembaga('Pra PTPT')).toEqual(['Pra PTPT'])
    expect(kunciKartuLembaga('')).toEqual([])
  })
})

describe('countTanggalKartu / countCatatanKartu', () => {
  it('menghitung tanggal tercap per lembaga', () => {
    // 5A, 5B, kpi_done = 3. `entries` (array catatan) TIDAK ikut — penghitung lama
    // menghitungnya sebagai satu "tanggal" sehingga angkanya kelebihan.
    expect(countTanggalKartu(KARTU, 'TPQ Pagi')).toBe(3)
    expect(countTanggalKartu(KARTU, 'Pra PTPT')).toBe(1)
  })
  it('catatan/rekomendasi bukan tanggal', () => {
    const k = { PTPT: { kelas_1: { juz_1: '2026-01-02', catatan: 'x', rekomendasi: 'y' } } }
    expect(countTanggalKartu(k, 'PTPT')).toBe(1)
  })
  it('menghitung catatan', () => {
    expect(countCatatanKartu(KARTU, 'TPQ Pagi')).toBe(1)
    expect(countCatatanKartu(KARTU, 'Pra PTPT')).toBe(0)
  })
  it('lembaga tanpa kartu → 0, tak melempar', () => {
    expect(countTanggalKartu(KARTU, 'PTPT')).toBe(0)
    expect(countTanggalKartu(null, 'PTPT')).toBe(0)
    expect(countCatatanKartu(undefined, 'PTPT')).toBe(0)
  })
})

describe('adaJejakKartu — penentu "alumni"', () => {
  it('KASUS KYAI: santri sudah di Pra PTPT, jejak TPQ Pagi-nya tetap terbaca', () => {
    expect(adaJejakKartu(KARTU, 'TPQ Pagi')).toBe(true)
    expect(adaJejakKartu(KARTU, 'Pra PTPT')).toBe(true)
  })
  it('lewat nama alias "TPQ" juga ketemu', () => {
    expect(adaJejakKartu(KARTU, 'TPQ')).toBe(true)
  })
  it('lembaga yang belum pernah disinggahi → false', () => {
    expect(adaJejakKartu(KARTU, 'PTPT')).toBe(false)
    expect(adaJejakKartu(KARTU, 'PPPH')).toBe(false)
  })
  it('blok KOSONG tak dianggap jejak (kerap terbentuk saat kenaikan gagal cocok skema)', () => {
    expect(adaJejakKartu({ PTPT: {} }, 'PTPT')).toBe(false)
    expect(adaJejakKartu({ PTPT: { kelas_1: {} } }, 'PTPT')).toBe(false)
    expect(adaJejakKartu({ PTPT: { kelas_1: { entries: [] } } }, 'PTPT')).toBe(false)
  })
  it('catatan saja (tanpa tanggal) tetap dihitung jejak', () => {
    expect(adaJejakKartu({ PTPT: { kelas_1: { catatan: 'perlu muroja’ah' } } }, 'PTPT')).toBe(true)
  })
  it('input kosong/rusak → false (bukan lempar)', () => {
    expect(adaJejakKartu(null, 'PTPT')).toBe(false)
    expect(adaJejakKartu({}, '')).toBe(false)
    expect(adaJejakKartu({ PTPT: 'bukan objek' }, 'PTPT')).toBe(false)
  })
})
