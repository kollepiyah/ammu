// Kyai (24 Jul 2026): "no.1 bonus tepat waktu itu sebenarnya untuk guru/pegawai yg
// tidak terlambat." Hitungan '× hadir' (per_hadir) menghitung hadir + terlambat, jadi
// yang telat ikut dapat Bonus Tepat Waktu — salah. Ditambah hitungan baru 'per_tepat'
// (× tepat waktu) yang HANYA menghitung status 'hadir' (buang 'terlambat').
import { describe, it, expect } from 'vitest'
import { barisBisyaroh, normalizeJenisBisyaroh } from '@/utils/bisyarohScope'

const ctx = (extra) => ({
  refs: [{ lembaga: 'PTPT', jabatan_di_sini: 'Guru', group: 'ngaji' }],
  guruId: 'g1',
  shiftIds: new Set(['pagi', 'sore']),
  hadirPerShift: { pagi: 20, sore: 18 }, // hadir + terlambat
  hadirTepatPerShift: { pagi: 15, sore: 12 }, // tepat waktu saja
  ...extra
})

describe('per_tepat (× tepat waktu) vs per_hadir (× kehadiran)', () => {
  it('per_hadir memakai hadirPerShift (hadir + terlambat)', () => {
    const j = normalizeJenisBisyaroh({
      label: 'Bonus Hadir',
      hitungan: 'per_hadir',
      nominal: 10000
    })
    const [b] = barisBisyaroh([j], ctx())
    expect(b.qty).toBe(38) // 20 + 18
    expect(b.nominal).toBe(380000)
    expect(b.kategori).toBe('bonus')
  })

  it('per_tepat memakai hadirTepatPerShift (hadir SAJA, buang terlambat)', () => {
    const j = normalizeJenisBisyaroh({ label: 'Bonus Tepat', hitungan: 'per_tepat', nominal: 3000 })
    const [b] = barisBisyaroh([j], ctx())
    expect(b.qty).toBe(27) // 15 + 12 (bukan 38)
    expect(b.nominal).toBe(81000)
    expect(b.hitungan).toBe('per_tepat')
    expect(b.kategori).toBe('bonus')
  })

  it('scope shift membatasi per_tepat (pagi saja)', () => {
    const j = normalizeJenisBisyaroh({
      label: 'Tepat Pagi',
      hitungan: 'per_tepat',
      nominal: 3000,
      scope: { shift: ['pagi'] }
    })
    const [b] = barisBisyaroh([j], ctx())
    expect(b.qty).toBe(15) // pagi tepat waktu saja
  })

  it('normalizeJenisBisyaroh mengenali per_tepat sbg hitungan sah', () => {
    expect(normalizeJenisBisyaroh({ label: 'x', hitungan: 'per_tepat' }).hitungan).toBe('per_tepat')
    // hitungan tak dikenal → fallback flat
    expect(normalizeJenisBisyaroh({ label: 'x', hitungan: 'ngawur' }).hitungan).toBe('flat')
  })
})
