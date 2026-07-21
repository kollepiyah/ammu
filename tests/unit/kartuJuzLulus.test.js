// Regresi: KARTU KENAIKAN PTPT DICAP SATU KOLOM TERLALU KANAN.
//
// Laporan Kyai (21 Jul 2026) atas kartu Shofia: "kemarin didaftarkan tes juz 10
// (akan naik juz 11 setelah ceremonial) tapi kenapa juz 11 sudah terisi tglnya?"
//
// Sebabnya `opts.juz` = juz TUJUAN (tes juz 10 -> target juz 11) dan itu yang dipakai
// mencap kartu. Keputusan Kyai: tanggal di kolom "Juz N" = TANGGAL LULUS TES JUZ N.
// Jadi yang dicap = opts.juz - 1, DAN blok kelasnya ikut juz itu — kalau kelasnya tak
// ikut digeser, item juz_10 tak ada di blok Kelas 3 sehingga capnya hilang senyap.
import { describe, it, expect } from 'vitest'
import { buildKenaikanQiraatiPayload } from '@/utils/promosiKenaikan'

const ctx = { settings: {}, lembagaList: [] }
const santri = { lembaga: 'PTPT', kelas: 'Kelas 2', juz: 'JUZ 10' }
const hariIni = new Date().toISOString().slice(0, 10)

// Ambil semua cap juz dari kartu: { 'kelas_2': { juz_10: '2026-07-21' } } -> daftar datar.
function capJuz(kk) {
  const out = {}
  for (const [kelasId, blok] of Object.entries(kk?.PTPT || {})) {
    for (const [itemId, v] of Object.entries(blok || {})) {
      if (itemId.startsWith('juz_')) out[`${kelasId}.${itemId}`] = v
    }
  }
  return out
}

describe('kartu kenaikan PTPT — cap di juz yang LULUS', () => {
  it('SKENARIO SHOFIA: lulus tes juz 10 (target 11) mencap juz 10, BUKAN juz 11', () => {
    const { payload } = buildKenaikanQiraatiPayload(
      santri,
      { lembaga: 'PTPT', kelas: 'Kelas 3', juz: '11' },
      ctx
    )
    const cap = capJuz(payload.kartu_kenaikan)
    expect(cap['kelas_2.juz_10']).toBe(hariIni)
    expect(cap['kelas_3.juz_11']).toBeUndefined()
  })

  it('cap masuk blok kelas JUZ YANG LULUS, bukan kelas tujuan', () => {
    // juz 10 milik Kelas 2; kalau dicap ke blok Kelas 3 item-nya tak ketemu -> hilang.
    const { payload } = buildKenaikanQiraatiPayload(
      santri,
      { lembaga: 'PTPT', kelas: 'Kelas 3', juz: '11' },
      ctx
    )
    expect(Object.keys(payload.kartu_kenaikan.PTPT)).toContain('kelas_2')
  })

  it('lintas kelas: lulus juz 5 (target 6) mencap kelas_1.juz_5', () => {
    const { payload } = buildKenaikanQiraatiPayload(
      { lembaga: 'PTPT', kelas: 'Kelas 1', juz: 'JUZ 5' },
      { lembaga: 'PTPT', kelas: 'Kelas 2', juz: '6' },
      ctx
    )
    expect(capJuz(payload.kartu_kenaikan)['kelas_1.juz_5']).toBe(hariIni)
  })

  it('lulus juz 30 (target 30 = juz terakhir) tetap tercap', () => {
    const { payload } = buildKenaikanQiraatiPayload(
      { lembaga: 'PTPT', kelas: 'Kelas 6', juz: 'JUZ 29' },
      { lembaga: 'PTPT', kelas: 'Kelas 6', juz: '30' },
      ctx
    )
    expect(capJuz(payload.kartu_kenaikan)['kelas_6.juz_29']).toBe(hariIni)
  })

  it('juz tujuan 1 (belum pernah lulus juz apa pun) TIDAK mencap apa-apa', () => {
    const { payload } = buildKenaikanQiraatiPayload(
      { lembaga: 'PTPT', kelas: 'Kelas 1' },
      { lembaga: 'PTPT', kelas: 'Kelas 1', juz: '1' },
      ctx
    )
    expect(capJuz(payload.kartu_kenaikan || {})).toEqual({})
  })

  it('santri tetap DIPINDAH ke juz tujuan — yang digeser hanya CAP kartunya', () => {
    const { payload } = buildKenaikanQiraatiPayload(
      santri,
      { lembaga: 'PTPT', kelas: 'Kelas 3', juz: '11' },
      ctx
    )
    expect(payload.juz).toBe('JUZ 11')
    expect(payload.kelas).toBe('Kelas 3')
  })

  it('lembaga NON-PTPT tak terpengaruh pergeseran ini', () => {
    const { payload } = buildKenaikanQiraatiPayload(
      { lembaga: 'TPQ', kelas: 'Jilid 1A' },
      { lembaga: 'TPQ', kelas: 'Jilid 1B' },
      ctx
    )
    expect(payload.kelas).toBe('Jilid 1B')
    expect(payload.lembaga).toBe('TPQ')
  })
})
