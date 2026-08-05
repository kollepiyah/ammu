import { describe, it, expect } from 'vitest'
import {
  normalisasiPotongan,
  potonganAktif,
  hitungPotongan,
  terapkanPotongan,
  lunasDenganPotongan
} from '@/utils/potonganPos'

// Potongan POS menyentuh uang riil: salah tanda atau salah batas langsung mengubah
// jumlah yang diterima kasir dan status lunas tagihan santri.

describe('normalisasiPotongan', () => {
  it('membuang baris tanpa label atau bernilai 0 — pilihan yang tak melakukan apa-apa', () => {
    const out = normalisasiPotongan([
      { label: 'Anak Guru', tipe: 'persen', nilai: 50 },
      { label: '', tipe: 'persen', nilai: 50 },
      { label: 'Nol', tipe: 'nominal', nilai: 0 },
      null
    ])
    expect(out.map((p) => p.label)).toEqual(['Anak Guru'])
  })

  it('persen dibatasi 100 — potongan tak boleh melebihi tagihannya', () => {
    expect(normalisasiPotongan([{ label: 'X', tipe: 'persen', nilai: 250 }])[0].nilai).toBe(100)
  })

  it('tipe tak dikenal dianggap persen, dan id dibuatkan bila kosong', () => {
    const p = normalisasiPotongan([{ label: 'Y', tipe: 'entah', nilai: 10 }])[0]
    expect(p.tipe).toBe('persen')
    expect(p.id).toBeTruthy()
  })

  it('id kembar dibuat unik — POS memilih potongan lewat id', () => {
    const out = normalisasiPotongan([
      { id: 'x', label: 'A', tipe: 'persen', nilai: 10 },
      { id: 'x', label: 'B', tipe: 'persen', nilai: 20 },
      { id: 'x', label: 'C', tipe: 'persen', nilai: 30 }
    ])
    expect(new Set(out.map((p) => p.id)).size).toBe(3)
    expect(out.map((p) => p.label)).toEqual(['A', 'B', 'C']) // tak ada yang dibuang
  })

  it('bukan array -> daftar kosong, bukan galat', () => {
    expect(normalisasiPotongan(null)).toEqual([])
    expect(normalisasiPotongan('bukan array')).toEqual([])
  })
})

describe('potonganAktif', () => {
  it('hanya yang aktif yang ditawarkan ke kasir', () => {
    const out = potonganAktif([
      { label: 'Aktif', tipe: 'persen', nilai: 10 },
      { label: 'Nonaktif', tipe: 'persen', nilai: 10, aktif: false }
    ])
    expect(out.map((p) => p.label)).toEqual(['Aktif'])
  })
})

describe('hitungPotongan', () => {
  it('persen dihitung dari nominal baris ITU (per jenis, bukan total keranjang)', () => {
    expect(hitungPotongan({ tipe: 'persen', nilai: 50 }, 300000)).toBe(150000)
    expect(hitungPotongan({ tipe: 'persen', nilai: 25 }, 300000)).toBe(75000)
  })

  it('nominal tetap dipakai apa adanya', () => {
    expect(hitungPotongan({ tipe: 'nominal', nilai: 50000 }, 300000)).toBe(50000)
  })

  it('tak pernah melebihi nominal baris — baris negatif = kas mengeluarkan uang', () => {
    expect(hitungPotongan({ tipe: 'nominal', nilai: 500000 }, 300000)).toBe(300000)
    expect(hitungPotongan({ tipe: 'persen', nilai: 100 }, 300000)).toBe(300000)
  })

  it('nilai negatif / bruto 0 / potongan kosong -> 0', () => {
    expect(hitungPotongan({ tipe: 'nominal', nilai: -5000 }, 300000)).toBe(0)
    expect(hitungPotongan({ tipe: 'persen', nilai: 50 }, 0)).toBe(0)
    expect(hitungPotongan(null, 300000)).toBe(0)
  })

  it('persen pecahan dibulatkan ke rupiah utuh', () => {
    expect(hitungPotongan({ tipe: 'persen', nilai: 33 }, 100000)).toBe(33000)
    expect(hitungPotongan({ tipe: 'persen', nilai: 15 }, 33333)).toBe(5000)
  })
})

describe('terapkanPotongan', () => {
  it('neto = bruto - potongan, label ikut hanya kalau memang memotong', () => {
    expect(terapkanPotongan(300000, { label: 'Anak Guru', tipe: 'persen', nilai: 50 })).toEqual({
      bruto: 300000,
      potongan: 150000,
      neto: 150000,
      label: 'Anak Guru'
    })
    expect(terapkanPotongan(300000, null)).toEqual({
      bruto: 300000,
      potongan: 0,
      neto: 300000,
      label: ''
    })
  })
})

describe('lunasDenganPotongan', () => {
  it('potongan IKUT menutup tagihan — tak meninggalkan tunggakan palsu', () => {
    // Tagihan 300rb, potongan 150rb, wali menyerahkan 150rb.
    expect(lunasDenganPotongan(300000, 0, 150000, 150000)).toBe(true)
  })

  it('kurang bayar tetap BELUM lunas walau ada potongan', () => {
    expect(lunasDenganPotongan(300000, 0, 100000, 150000)).toBe(false)
  })

  it('cicilan sebelumnya ikut dihitung', () => {
    expect(lunasDenganPotongan(300000, 100000, 50000, 150000)).toBe(true)
  })

  it('potongan penuh tanpa uang sama sekali = lunas (pembebasan)', () => {
    expect(lunasDenganPotongan(300000, 0, 0, 300000)).toBe(true)
  })

  it('baris tanpa tagihan (penuh 0) selalu tuntas', () => {
    expect(lunasDenganPotongan(0, 0, 50000, 0)).toBe(true)
  })

  it('toleransi pembulatan setengah rupiah tetap dianggap lunas', () => {
    expect(lunasDenganPotongan(300000, 0, 149999.6, 150000)).toBe(true)
  })
})
