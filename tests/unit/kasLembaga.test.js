// Kyai (4 Agu 2026): "pencatatan kas per lembaga itu sendiri-sendiri sesuai LABEL
// PEMBAYARAN" — untuk transaksi Buku Induk / Uang Buku / Uang Kegiatan / Tabungan.
//
// Penentunya jenis pembayaran, BUKAN tempat santri sekolah: satu santri bisa
// membayar syahriyah SDI dan uang buku TPQ dalam satu transaksi, dan uangnya harus
// jatuh ke dua kas berbeda. Tagihan gabungan sudah dipecah per komponen di Buku
// Induk (K1) sehingga kategori tiap BARIS = jenis pembayarannya sendiri.
//
// Uang riil sejak 1 Agu 2026 → baris lama TIDAK ditulis ulang; lembaganya
// diturunkan saat dibaca. Karena itu resolver ini yang dijaga, bukan migrasi data.
import { describe, it, expect } from 'vitest'
import {
  kunciLembaga,
  petaKasLembaga,
  kasLembagaBaris,
  kasLembagaTabungan,
  petaLembagaSantri
} from '@/utils/kasLembaga'

const JENIS = [
  { id: 'syah_sdi', label: 'Syahriyah SDI', kas_lembaga: 'SDI' },
  { id: 'syah_tpq', label: 'Syahriyah TPQ Pagi', kas_lembaga: 'TPQ Pagi' },
  // kas_lembaga kosong, whitelist tepat satu → jatuh ke whitelist itu
  { id: 'buku_kb', label: 'Uang Buku Kelas Baca', lembaga_only: ['Kelas Baca'] },
  // whitelist lebih dari satu & tanpa kas_lembaga → tak bisa ditentukan
  { id: 'kegiatan', label: 'Uang Kegiatan', lembaga_only: ['SDI', 'TK'] },
  // tanpa penanda apa pun
  { id: 'infaq', label: 'Infaq' }
]

describe('kunciLembaga — perbandingan nama lembaga', () => {
  it('abai huruf besar/kecil, spasi tepi, dan spasi ganda', () => {
    expect(kunciLembaga('  Kelas   Baca ')).toBe('kelas baca')
    expect(kunciLembaga('KELAS BACA')).toBe(kunciLembaga('kelas baca'))
  })

  it('null/undefined → string kosong, tidak melempar', () => {
    expect(kunciLembaga(null)).toBe('')
    expect(kunciLembaga(undefined)).toBe('')
  })
})

describe('petaKasLembaga', () => {
  it('membaca kas_lembaga apa adanya', () => {
    const p = petaKasLembaga(JENIS)
    expect(p.get('syahriyah sdi')).toBe('SDI')
    expect(p.get('syahriyah tpq pagi')).toBe('TPQ Pagi')
  })

  it('kas_lembaga kosong + whitelist TEPAT SATU → pakai whitelist itu', () => {
    expect(petaKasLembaga(JENIS).get('uang buku kelas baca')).toBe('Kelas Baca')
  })

  it('whitelist >1 atau tanpa penanda → tidak masuk peta (jadi Kas Induk)', () => {
    const p = petaKasLembaga(JENIS)
    expect(p.has('uang kegiatan')).toBe(false)
    expect(p.has('infaq')).toBe(false)
  })

  it('kas_lembaga MENANG atas whitelist kalau keduanya ada', () => {
    const p = petaKasLembaga([{ label: 'X', kas_lembaga: 'TK', lembaga_only: ['SDI'] }])
    expect(p.get('x')).toBe('TK')
  })

  it('masukan aneh tidak melempar', () => {
    expect(petaKasLembaga(null).size).toBe(0)
    expect(petaKasLembaga([null, {}, { label: '   ' }]).size).toBe(0)
  })
})

describe('kasLembagaBaris — baris keuangan_buku_induk', () => {
  const peta = petaKasLembaga(JENIS)

  it('tag `lembaga` di baris MENANG (fakta saat uang diterima)', () => {
    // Laporan bulan lalu tak boleh bergeser hanya karena konfigurasi jenis diubah.
    const r = { lembaga: 'TK', kategori: 'Syahriyah SDI' }
    expect(kasLembagaBaris(r, peta)).toBe('TK')
  })

  it('tanpa tag → diturunkan dari kategori (baris LAMA tetap terbaca)', () => {
    expect(kasLembagaBaris({ kategori: 'Syahriyah SDI' }, peta)).toBe('SDI')
  })

  it('KUNCI K1: dua komponen satu tagihan gabungan pergi ke kas MASING-MASING', () => {
    const barisSekolah = { kategori: 'Syahriyah SDI', induk_jenis: 'Syahriyah SDI' }
    const barisNgaji = { kategori: 'Syahriyah TPQ Pagi', induk_jenis: 'Syahriyah SDI' }
    expect(kasLembagaBaris(barisSekolah, peta)).toBe('SDI')
    expect(kasLembagaBaris(barisNgaji, peta)).toBe('TPQ Pagi')
  })

  it('kategori tak terdaftar → jatuh ke induk_jenis', () => {
    const r = { kategori: 'Potongan Ngaji', induk_jenis: 'Syahriyah SDI' }
    expect(kasLembagaBaris(r, peta)).toBe('SDI')
  })

  it('kategori diketik beda huruf besar/kecil tetap cocok', () => {
    expect(kasLembagaBaris({ kategori: 'syahriyah  sdi' }, peta)).toBe('SDI')
  })

  it('tak bisa ditentukan → "" (Kas Induk), bukan menebak', () => {
    expect(kasLembagaBaris({ kategori: 'Infaq' }, peta)).toBe('')
    expect(kasLembagaBaris({ kategori: 'Uang Kegiatan' }, peta)).toBe('')
    expect(kasLembagaBaris({}, peta)).toBe('')
    expect(kasLembagaBaris(null, peta)).toBe('')
  })

  it('peta hilang/bukan Map tidak melempar', () => {
    expect(kasLembagaBaris({ kategori: 'Syahriyah SDI' })).toBe('')
    expect(kasLembagaBaris({ lembaga: 'SDI' }, undefined)).toBe('SDI')
  })
})

describe('kasLembagaTabungan — ikut lembaga santri', () => {
  const santri = [
    { id: 's1', lembaga: 'TPQ Pagi', lembaga_sekolah: 'SDI' },
    { id: 's2', lembaga: '', lembaga_sekolah: 'Kelas Baca' }, // hanya sekolah
    { id: 's3', lembaga: '', lembaga_sekolah: '' }
  ]
  const peta = petaLembagaSantri(santri)

  it('lembaga ngaji dipakai lebih dulu', () => {
    expect(kasLembagaTabungan({ santri_id: 's1' }, peta)).toBe('TPQ Pagi')
  })

  it('ngaji kosong → jatuh ke lembaga sekolah', () => {
    expect(kasLembagaTabungan({ santri_id: 's2' }, peta)).toBe('Kelas Baca')
  })

  it('dua-duanya kosong / santri tak dikenal → "" (Kas Induk)', () => {
    expect(kasLembagaTabungan({ santri_id: 's3' }, peta)).toBe('')
    expect(kasLembagaTabungan({ santri_id: 'entah' }, peta)).toBe('')
    expect(kasLembagaTabungan({}, peta)).toBe('')
  })

  it('id angka vs teks tetap cocok (id Supabase = TEKS)', () => {
    const p = petaLembagaSantri([{ id: 7, lembaga: 'PTPT' }])
    expect(kasLembagaTabungan({ santri_id: 7 }, p)).toBe('PTPT')
    expect(kasLembagaTabungan({ santri_id: '7' }, p)).toBe('PTPT')
  })

  it('masukan aneh tidak melempar', () => {
    expect(petaLembagaSantri(null).size).toBe(0)
    expect(kasLembagaTabungan(null, peta)).toBe('')
    expect(kasLembagaTabungan({ santri_id: 's1' })).toBe('')
  })
})
