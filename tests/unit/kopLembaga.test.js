// buildKopLembaga — KOP milik LEMBAGA, jatuh ke KOP pondok bila lembaganya belum punya.
//
// Kyai mengeluhkan ini DUA KALI untuk dua ekspor berbeda:
//   5 Agu 2026 — ekspor Top Santri: "KOP PTPT/PPPH tak pernah terpakai";
//   4 Sep 2026 — Rekap Prestasi: "sudah oke, tinggal kopnya saja".
//
// Aturannya sama persis, dan sampai v.1.4.0 tersalin di tiga tempat. Tes ini menjaga
// bentuk tunggalnya, terutama dua hal yang gampang tergelincir saat menulis ulang:
//   1. field lembaga yang KOSONG tidak boleh menimpa kop pondok dengan string kosong —
//      hasilnya kop separuh yang tak pernah kelihatan sebagai galat;
//   2. tanpa nama lembaga (ekspor lintas lembaga), kop pondok yang dipakai apa adanya.
import { describe, it, expect } from 'vitest'
import { buildKopFromSettings, buildKopLembaga } from '@/utils/pdfBuilder'

const SETTINGS = {
  logoKop: 'logo-pondok.png',
  kopLine1: 'YAYASAN MAMBAUL ULUM',
  kopLine2: 'PONDOK PESANTREN MAMBAUL ULUM',
  kopLine3: 'Jl. Contoh No. 1, Jombang',
  kopLine4: '0812-0000-0000',
  kopLine5: 'ammu.id'
}

const LEMBAGA = [
  {
    lembaga: 'PTPT',
    kop_logo: 'logo-ptpt.png',
    kop_line1: 'PONDOK PESANTREN MAMBAUL ULUM',
    kop_line2: 'PENDIDIKAN TAHFIDZ PUTRA PUTRI',
    kop_line3: 'Kompleks PTPT, Jombang',
    kop_line4: '0813-1111-1111'
  },
  { lembaga: 'PPPH', kop_line2: 'PENDIDIKAN PASCA PUTRA HADITS' }, // sengaja separuh
  { lembaga: 'TPQ Pagi' } // sengaja tanpa kop sama sekali
]

describe('buildKopLembaga — lembaga menang bila punya kop sendiri', () => {
  it('KUNCI: PTPT memakai kop PTPT, bukan kop pondok', () => {
    const k = buildKopLembaga(SETTINGS, LEMBAGA, 'PTPT')
    expect(k.logoUrl).toBe('logo-ptpt.png')
    expect(k.line2).toBe('PENDIDIKAN TAHFIDZ PUTRA PUTRI')
    expect(k.line3).toBe('Kompleks PTPT, Jombang')
    expect(k.line4).toBe('0813-1111-1111')
  })

  it('KUNCI: field lembaga yang kosong jatuh ke kop pondok, bukan jadi string kosong', () => {
    // PPPH hanya mengisi kop_line2 — sisanya WAJIB tetap terisi kop pondok, kalau tidak
    // kertasnya keluar tanpa alamat & kontak dan itu tak terlihat sebagai galat.
    const k = buildKopLembaga(SETTINGS, LEMBAGA, 'PPPH')
    expect(k.line2).toBe('PENDIDIKAN PASCA PUTRA HADITS')
    expect(k.line1).toBe('YAYASAN MAMBAUL ULUM')
    expect(k.line3).toBe('Jl. Contoh No. 1, Jombang')
    expect(k.line4).toBe('0812-0000-0000')
    expect(k.logoUrl).toBe('logo-pondok.png')
  })

  it('lembaga tanpa kop sama sekali = kop pondok utuh', () => {
    expect(buildKopLembaga(SETTINGS, LEMBAGA, 'TPQ Pagi')).toEqual(buildKopFromSettings(SETTINGS))
  })

  it('line5 tak bisa di-override lembaga — tak ada field-nya di master', () => {
    expect(buildKopLembaga(SETTINGS, LEMBAGA, 'PTPT').line5).toBe('ammu.id')
  })

  it('nama lembaga tak peka huruf besar/kecil & spasi berlebih', () => {
    expect(buildKopLembaga(SETTINGS, LEMBAGA, '  ptpt ').line2).toBe(
      'PENDIDIKAN TAHFIDZ PUTRA PUTRI'
    )
  })

  it('baris master yang memakai field `nama` (bukan `lembaga`) tetap ketemu', () => {
    const alt = [{ nama: 'PTPT', kop_line2: 'DARI FIELD NAMA' }]
    expect(buildKopLembaga(SETTINGS, alt, 'PTPT').line2).toBe('DARI FIELD NAMA')
  })
})

describe('buildKopLembaga — batas', () => {
  it('KUNCI: tanpa nama lembaga (ekspor lintas lembaga) = kop pondok', () => {
    expect(buildKopLembaga(SETTINGS, LEMBAGA, '')).toEqual(buildKopFromSettings(SETTINGS))
    expect(buildKopLembaga(SETTINGS, LEMBAGA)).toEqual(buildKopFromSettings(SETTINGS))
  })

  it('lembaga tak dikenal → kop pondok, bukan kop kosong', () => {
    expect(buildKopLembaga(SETTINGS, LEMBAGA, 'Entah').line2).toBe('PONDOK PESANTREN MAMBAUL ULUM')
  })

  it('daftar lembaga kosong / bukan larik tak bikin meledak', () => {
    expect(buildKopLembaga(SETTINGS, [], 'PTPT').line2).toBe('PONDOK PESANTREN MAMBAUL ULUM')
    expect(buildKopLembaga(SETTINGS, null, 'PTPT').line2).toBe('PONDOK PESANTREN MAMBAUL ULUM')
  })

  it('settings kosong → teks cadangan buildKopFromSettings, tetap punya bentuk lengkap', () => {
    const k = buildKopLembaga({}, [], '')
    expect(k.line1).toBe('YAYASAN MAMBAUL ULUM')
    expect(k.line2).toBe('PONDOK PESANTREN MAMBAUL ULUM')
    expect(k).toHaveProperty('logoUrl')
    expect(k).toHaveProperty('line5')
  })

  it('tanpa argumen sama sekali tetap mengembalikan objek kop', () => {
    expect(buildKopLembaga()).toEqual(buildKopFromSettings({}))
  })
})
