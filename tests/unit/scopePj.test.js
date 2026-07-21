// Kyai (21 Jul 2026): "PJ PTPT sekarang ada 2 orang, dan besok mungkin bisa
// bertambah. harusnya di menu tes/glondongan/ceremonial, PJ hanya bisa melihat
// santri ampuannya, labelnya sudah ada."
//
// Label = `santri.pj_ptpt` (NAMA PJ, teks bebas dari form/impor). Karena teks bebas,
// pencocokan harus tahan beda huruf besar-kecil & spasi berlebih.
import { describe, it, expect } from 'vitest'
import { buatScopePj } from '@/utils/glondongan'

const santri = [
  { id: 's1', pj_ptpt: 'Ust. Fulan' },
  { id: 's2', pj_ptpt: 'Ust. Alan' },
  { id: 's3', pj_ptpt: '  ust.   FULAN ' }, // ketikan berantakan, orang yang sama
  { id: 's4', pj_ptpt: '' }, // belum diisi
  { id: 's5' } // field tak ada
]

describe('buatScopePj', () => {
  it('hanya santri berlabel nama PJ ini', () => {
    const punyaku = buatScopePj(santri, 'Ust. Fulan')
    expect(punyaku('s1')).toBe(true)
    expect(punyaku('s2')).toBe(false)
  })

  it('tahan beda huruf besar-kecil & spasi berlebih (label diketik manual)', () => {
    const punyaku = buatScopePj(santri, 'Ust. Fulan')
    expect(punyaku('s3')).toBe(true)
  })

  it('PJ kedua hanya dapat santrinya sendiri — bukti scope tidak bocor', () => {
    const alan = buatScopePj(santri, 'Ust. Alan')
    expect(alan('s2')).toBe(true)
    expect(alan('s1')).toBe(false)
    expect(alan('s3')).toBe(false)
  })

  it('santri tanpa label PJ tidak masuk ampuan siapa pun', () => {
    const punyaku = buatScopePj(santri, 'Ust. Fulan')
    expect(punyaku('s4')).toBe(false)
    expect(punyaku('s5')).toBe(false)
  })

  it('nama PJ kosong → tidak mengampu siapa pun (bukan malah semua)', () => {
    // Penting: kalau ini `true`, sesi tanpa nama akan melihat SELURUH santri.
    const kosong = buatScopePj(santri, '')
    expect(kosong('s1')).toBe(false)
    expect(kosong('s4')).toBe(false)
    expect(buatScopePj(santri, null)('s1')).toBe(false)
  })

  it('id dicocokkan sebagai TEKS — id Supabase alfanumerik, jangan di-Number()-kan', () => {
    const p = buatScopePj([{ id: 123, pj_ptpt: 'A' }], 'A')
    expect(p('123')).toBe(true)
    expect(p(123)).toBe(true)
  })

  it('daftar santri kosong / null aman', () => {
    expect(buatScopePj([], 'A')('s1')).toBe(false)
    expect(buatScopePj(null, 'A')('s1')).toBe(false)
  })

  it('santri id tak dikenal → false', () => {
    expect(buatScopePj(santri, 'Ust. Fulan')('s99')).toBe(false)
  })
})
