import { describe, it, expect } from 'vitest'
import {
  hariEfektif,
  tanggalBulanPenuh,
  simulasiBisyaroh,
  simulasiPerGuru,
  terapkanNominal,
  GLONDONGAN_JENIS_ID,
  GLONDONGAN_BLOK_DEFAULT
} from '../../vue-app/src/utils/simulasiBisyaroh.js'
import { PTPT_JUZ_PER_KELAS } from '../../vue-app/src/utils/glondongan.js'

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

describe('simulasiPerGuru', () => {
  const namai = (guruId, nama, hadir) => ({ ...ctx(guruId, hadir), nama })

  it('memerinci tiap orang + total per orang', () => {
    const r = simulasiPerGuru(JENIS, [namai('g1', 'Ahmad', 26)])
    expect(r).toHaveLength(1)
    expect(r[0]).toMatchObject({ guruId: 'g1', nama: 'Ahmad', total: 578000 })
    expect(r[0].baris.map((b) => b.jenis_id)).toEqual(['pokok', 'bonus'])
    expect(r[0].baris[1]).toMatchObject({ hitungan: 'per_tepat', qty: 26, tarif: 3000 })
  })

  it('jumlah semua orang PERSIS sama dengan total per jenis — dua tampilan satu angka', () => {
    const ctxs = [namai('g1', 'Ahmad', 26), namai('g2', 'Budi', 20), namai('g3', 'Cak', 0)]
    const perOrang = simulasiPerGuru(JENIS, ctxs).reduce((a, g) => a + g.total, 0)
    expect(perOrang).toBe(simulasiBisyaroh(JENIS, ctxs).total)
  })

  it('terurut dari penerima terbesar', () => {
    const r = simulasiPerGuru(JENIS, [namai('g1', 'Ahmad', 10), namai('g2', 'Budi', 26)])
    expect(r.map((g) => g.guruId)).toEqual(['g2', 'g1'])
  })

  it('guru yang tak kena jenis apa pun tetap muncul dengan total 0', () => {
    const r = simulasiPerGuru(JENIS, [
      namai('g1', 'Ahmad', 26),
      { ...namai('g2', 'Budi', 26), refs: [] } // tanpa ref -> tak kena jenis mana pun
    ])
    expect(r.at(-1)).toMatchObject({ guruId: 'g2', total: 0, baris: [] })
  })

  it('tanpa guru -> array kosong, bukan melempar', () => {
    expect(simulasiPerGuru(JENIS, [])).toEqual([])
    expect(simulasiPerGuru(JENIS, null)).toEqual([])
  })

  it('ikut nominal coba-coba, bukan nominal tersimpan', () => {
    const jenis = terapkanNominal(JENIS, { pokok: 600000 })
    expect(simulasiPerGuru(jenis, [namai('g1', 'Ahmad', 0)])[0].total).toBe(600000)
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

// Kyai 7 Agu 2026: "tunjangan kok gak masuk di simulasi ya?" — plafon yang tak menghitung
// tunjangan MENGECILKAN anggaran, padahal alat ini dipakai untuk memutuskan nominal.
describe('simulasi ikut menghitung Jenis Tunjangan', () => {
  const TUNJANGAN = [
    { id: 'kepala', label: 'Tunjangan Kepala', aktif: true, hitungan: 'flat', nominal: 300000 },
    {
      id: 'pengabdian',
      label: 'Pengabdian',
      aktif: true,
      hitungan: 'per_tahun_pengabdian',
      nominal: 10000
    }
  ]
  const ctxT = (guruId, hadir, th) => ({
    ...ctx(guruId, hadir),
    nama: guruId,
    efektifPerShift: { pagi: hadir },
    tahunPengabdian: th
  })

  it('per jenis: baris tunjangan ikut, bertanda kategori', () => {
    const r = simulasiBisyaroh(JENIS, [ctxT('g1', 26, 7)], TUNJANGAN)
    const kepala = r.perJenis.find((x) => x.jenis_id === 'kepala')
    const pengabdian = r.perJenis.find((x) => x.jenis_id === 'pengabdian')
    expect(kepala).toMatchObject({ kategori: 'tunjangan', subtotal: 300000 })
    expect(pengabdian).toMatchObject({ qty: 7, subtotal: 70000 })
    // 500.000 pokok + 78.000 bonus + 300.000 + 70.000
    expect(r.total).toBe(948000)
  })

  it('daftar tunjangan dihilangkan -> hasil kembali seperti sebelum fitur ini', () => {
    expect(simulasiBisyaroh(JENIS, [ctxT('g1', 26, 7)]).total).toBe(578000)
  })

  it('per orang: tunjangan masuk & totalnya tetap sama dengan per jenis', () => {
    const list = [ctxT('g1', 26, 7), ctxT('g2', 20, 3)]
    const perOrang = simulasiPerGuru(JENIS, list, TUNJANGAN)
    expect(perOrang[0].baris.some((b) => b.kategori === 'tunjangan')).toBe(true)
    expect(perOrang.reduce((a, g) => a + g.total, 0)).toBe(
      simulasiBisyaroh(JENIS, list, TUNJANGAN).total
    )
  })

  // Kyai 12 Agu 2026: "kenapa bisyaroh glondongan tidak masuk di simulasi?"
  // Glondongan lahir dari peristiwa, bukan andaian hadir-penuh, jadi kuantitasnya
  // harus diandaikan terang-terangan: N blok/bulan tiap PENYIMAK TERDAFTAR.
  describe('glondongan PTPT', () => {
    const OPSI = (over = {}) => ({
      tarifPerJuz: 10000,
      blokPerGuru: GLONDONGAN_BLOK_DEFAULT,
      penyimakIds: new Set(['g1']),
      ...over
    })

    it('hanya kena PENYIMAK terdaftar, bukan semua guru', () => {
      const r = simulasiBisyaroh(JENIS, [ctxT('g1', 26, 7), ctxT('g2', 26, 7)], null, OPSI())
      const g = r.perJenis.find((x) => x.jenis_id === GLONDONGAN_JENIS_ID)
      expect(g.guru).toBe(1)
    })

    it('1 blok = PTPT_JUZ_PER_KELAS juz, dibayar per juz', () => {
      const r = simulasiBisyaroh(JENIS, [ctxT('g1', 26, 7)], null, OPSI())
      const g = r.perJenis.find((x) => x.jenis_id === GLONDONGAN_JENIS_ID)
      const juz = GLONDONGAN_BLOK_DEFAULT * PTPT_JUZ_PER_KELAS
      expect(g).toMatchObject({ kategori: 'bisyaroh', hitungan: 'per_juz', qty: juz })
      expect(g.subtotal).toBe(juz * 10000)
    })

    it('tarif 0 / blok 0 / tanpa opsi -> tak ada baris sama sekali', () => {
      const ctxs = [ctxT('g1', 26, 7)]
      const adaBaris = (opsi) =>
        simulasiBisyaroh(JENIS, ctxs, null, opsi).perJenis.some(
          (x) => x.jenis_id === GLONDONGAN_JENIS_ID
        )
      expect(adaBaris(OPSI({ tarifPerJuz: 0 }))).toBe(false)
      expect(adaBaris(OPSI({ blokPerGuru: 0 }))).toBe(false)
      expect(adaBaris(OPSI({ penyimakIds: new Set() }))).toBe(false)
      expect(adaBaris(undefined)).toBe(false)
    })

    it('penyimakIds boleh array, dan id dicocokkan sebagai TEKS', () => {
      // id Supabase = teks; ctx.guruId bisa datang sebagai angka dari baris guru lama.
      const r = simulasiBisyaroh(JENIS, [ctxT(7, 26, 7)], null, OPSI({ penyimakIds: ['7'] }))
      expect(r.perJenis.some((x) => x.jenis_id === GLONDONGAN_JENIS_ID)).toBe(true)
    })

    it('per orang tetap sejumlah per jenis sesudah glondongan ikut', () => {
      const list = [ctxT('g1', 26, 7), ctxT('g2', 20, 3)]
      const perOrang = simulasiPerGuru(JENIS, list, TUNJANGAN, OPSI())
      expect(perOrang.reduce((a, g) => a + g.total, 0)).toBe(
        simulasiBisyaroh(JENIS, list, TUNJANGAN, OPSI()).total
      )
    })

    it('tanpa opsi, hasilnya PERSIS seperti sebelum fitur ini', () => {
      const list = [ctxT('g1', 26, 7)]
      expect(simulasiBisyaroh(JENIS, list, TUNJANGAN).total).toBe(
        simulasiBisyaroh(JENIS, list, TUNJANGAN, undefined).total
      )
    })
  })

  it('id kembar di dua daftar TIDAK menyatu jadi satu baris', () => {
    const sama = [
      { id: 'pokok', label: 'Tunjangan Pokok', aktif: true, hitungan: 'flat', nominal: 1000 }
    ]
    const r = simulasiBisyaroh(JENIS, [ctxT('g1', 26, 7)], sama)
    const pokok = r.perJenis.filter((x) => x.jenis_id === 'pokok')
    expect(pokok).toHaveLength(2)
    expect(pokok.map((x) => x.kategori).sort()).toEqual(['bisyaroh', 'tunjangan'])
  })
})
