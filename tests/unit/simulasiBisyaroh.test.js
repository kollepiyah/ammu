import { describe, it, expect } from 'vitest'
import {
  hariEfektif,
  tanggalBulanPenuh,
  simulasiBisyaroh,
  terapkanNominal
} from '../../vue-app/src/utils/simulasiBisyaroh.js'

describe('tanggalBulanPenuh', () => {
  it('bulan penuh, TIDAK dipotong sampai hari ini', () => {
    expect(tanggalBulanPenuh('2026-08')).toHaveLength(31)
    expect(tanggalBulanPenuh('2026-08')[0]).toBe('2026-08-01')
    expect(tanggalBulanPenuh('2026-08').at(-1)).toBe('2026-08-31')
  })

  it('Februari kabisat & non-kabisat', () => {
    expect(tanggalBulanPenuh('2024-02')).toHaveLength(29)
    expect(tanggalBulanPenuh('2026-02')).toHaveLength(28)
  })

  it('periode ngawur -> kosong, bukan melempar', () => {
    for (const b of ['', null, undefined, '2026', '2026-13', 'agustus']) {
      expect(tanggalBulanPenuh(b)).toEqual([])
    }
  })
})

describe('hariEfektif', () => {
  const AGU = tanggalBulanPenuh('2026-08')

  it('Ahad tidak dihitung — Agustus 2026 punya 5 Ahad', () => {
    expect(hariEfektif(AGU, [])).toBe(31 - 5)
  })

  it('tanggal libur dipotong, Ahad tak dihitung dua kali', () => {
    // 2026-08-02 & 2026-08-09 keduanya Ahad -> sudah terpotong, libur tak menambah.
    expect(hariEfektif(AGU, ['2026-08-02', '2026-08-09'])).toBe(26)
    // 2026-08-17 (Senin) libur -> baru benar-benar mengurangi.
    expect(hariEfektif(AGU, ['2026-08-17'])).toBe(25)
  })

  it('menerima Set maupun array', () => {
    expect(hariEfektif(AGU, new Set(['2026-08-17']))).toBe(hariEfektif(AGU, ['2026-08-17']))
  })

  it('WIB tak menggeser hari — 2026-08-02 tetap Ahad', () => {
    expect(hariEfektif(['2026-08-02'], [])).toBe(0)
    expect(hariEfektif(['2026-08-03'], [])).toBe(1)
  })

  it('masukan ngawur diabaikan diam-diam, tak jadi hari efektif', () => {
    expect(hariEfektif(['', null, '3 Agustus', '2026-8-3'], [])).toBe(0)
  })
})

// Jenis minimal: scope kosong = kena semua guru yang punya ref.
const JENIS = [
  { id: 'pokok', label: 'Pokok', aktif: true, hitungan: 'flat', nominal: 500000, scope: {} },
  {
    id: 'bonus',
    label: 'Bonus Tepat Waktu',
    aktif: true,
    hitungan: 'per_tepat',
    nominal: 3000,
    scope: { shift: ['pagi'] }
  }
]
const ctx = (guruId, hadirTepatPagi) => ({
  guruId,
  refs: [{ jabatan_di_sini: 'Guru', lembaga: 'TPQ Pagi' }],
  shiftIds: new Set(['pagi']),
  hadirPerShift: { pagi: hadirTepatPagi },
  hadirTepatPerShift: { pagi: hadirTepatPagi },
  bebanJPByLembaga: {},
  jpDiajarByLembaga: {}
})

describe('simulasiBisyaroh', () => {
  it('menjumlahkan per jenis + menghitung guru yang kena', () => {
    const r = simulasiBisyaroh(JENIS, [ctx('g1', 26), ctx('g2', 26)])
    expect(r.guruKena).toBe(2)
    const pokok = r.perJenis.find((x) => x.jenis_id === 'pokok')
    const bonus = r.perJenis.find((x) => x.jenis_id === 'bonus')
    expect(pokok.subtotal).toBe(1000000) // 500.000 × 2 guru
    expect(bonus.qty).toBe(52) // 26 hari × 2 guru
    expect(bonus.subtotal).toBe(156000) // 3.000 × 52
    expect(r.total).toBe(1156000)
  })

  it('terurut dari subtotal terbesar — yang paling membebani tampil dulu', () => {
    const r = simulasiBisyaroh(JENIS, [ctx('g1', 26)])
    expect(r.perJenis[0].jenis_id).toBe('pokok')
  })

  it('tanpa guru -> nol bersih, bukan NaN', () => {
    const r = simulasiBisyaroh(JENIS, [])
    expect(r).toEqual({ perJenis: [], total: 0, guruKena: 0 })
  })

  it('jenis bernominal 0 tak muncul — belum diisi bukan berarti gratis', () => {
    const nol = [{ ...JENIS[0], nominal: 0 }]
    expect(simulasiBisyaroh(nol, [ctx('g1', 26)]).perJenis).toEqual([])
  })

  it('jenis non-aktif tidak ikut', () => {
    const mati = [{ ...JENIS[0], aktif: false }]
    expect(simulasiBisyaroh(mati, [ctx('g1', 26)]).total).toBe(0)
  })
})

describe('terapkanNominal', () => {
  it('mengganti nominal sesuai override', () => {
    const out = terapkanNominal(JENIS, { pokok: 750000 })
    expect(out.find((j) => j.id === 'pokok').nominal).toBe(750000)
    expect(out.find((j) => j.id === 'bonus').nominal).toBe(3000)
  })

  it('TIDAK mengubah daftar asli — nominal coba-coba tak boleh bocor ke Pengaturan', () => {
    const asli = JSON.parse(JSON.stringify(JENIS))
    terapkanNominal(JENIS, { pokok: 999999 })
    expect(JENIS).toEqual(asli)
  })

  it('nilai kosong = pakai nominal asli, bukan nol', () => {
    for (const kosong of [undefined, null, '']) {
      expect(terapkanNominal(JENIS, { pokok: kosong })[0].nominal).toBe(500000)
    }
  })

  it('negatif & pecahan dijinakkan (0 ke bawah, dibulatkan)', () => {
    expect(terapkanNominal(JENIS, { pokok: -5000 })[0].nominal).toBe(0)
    expect(terapkanNominal(JENIS, { pokok: 1234.6 })[0].nominal).toBe(1235)
  })
})
