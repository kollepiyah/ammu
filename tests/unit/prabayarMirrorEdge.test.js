// PAGAR ANTI-MENYIMPANG: `supabase/functions/auto-generate-tagihan/prabayar.ts` adalah cermin
// Deno dari pencocok pembayaran-di-muka di `vue-app/src/utils/cocokBayarTagihan.js` (+
// `periodeTagihan.periodeKode`, `tagihan.statusTagihan`). Tombol Generate memakai yang .js,
// cron harian memakai yang .ts.
//
// Kyai (14 Sep 2026, audit): cron dulu menerbitkan tagihan dengan `terbayar: 0` walau bulan
// itu sudah dibayar di muka — santri ditagih ulang tiap awal bulan, dan "Cek Riwayat vs
// Tagihan" menemukan "kurang tercatat" baru setiap bulan. Kalau dua berkas ini menyimpang,
// cron dan tombol akan kembali menerbitkan angka berbeda untuk santri yang sama.
//
// Yang dijaga:
//   1. Kedua implementasi IDENTIK pada kasus tertulis maupun sapuan acak semi-deterministik.
//   2. Perilakunya sendiri benar — dua cermin yang sama-sama keliru tetap lulus uji identik,
//      jadi ada juga asersi angka yang ditulis tangan.
import { describe, it, expect } from 'vitest'
import * as js from '../../vue-app/src/utils/cocokBayarTagihan.js'
import { periodeKode as periodeKodeJs } from '../../vue-app/src/utils/periodeTagihan.js'
import { statusTagihan as statusTagihanJs } from '../../vue-app/src/utils/tagihan.js'
import * as ts from '../../supabase/functions/auto-generate-tagihan/prabayar.ts'

const petaDatar = (peta) =>
  [...peta.entries()]
    .map(([k, v]) => [k, v.total, v.baris.map((b) => b.id)])
    .sort((a, b) => a[0].localeCompare(b[0]))

const klon = (o) => JSON.parse(JSON.stringify(o))

const BARIS = [
  // bayar di muka biasa
  {
    id: 'p1',
    tipe: 'masuk',
    sumber: 'pos_santri',
    santri_id: 'S1',
    kategori: 'Syahriyah',
    nominal: 90000,
    periode_kode: '2026-10'
  },
  // pecahan tagihan gabungan: induk dari induk_jenis / keterangan lama
  {
    id: 'p2',
    tipe: 'masuk',
    sumber: 'pos_santri',
    santri_id: 'S2',
    kategori: 'SPP Sekolah',
    induk_jenis: 'Syahriyah TK-SDI',
    nominal: 200000,
    periode_kode: '2026-10'
  },
  {
    id: 'p3',
    tipe: 'masuk',
    sumber: 'pos_santri',
    santri_id: 'S2',
    kategori: 'Ngaji',
    keterangan: 'Ngaji — Budi (12) — Oktober 2026 — bagian dari Syahriyah TK-SDI',
    nominal: 90000,
    periode_kode: '2026-10'
  },
  // santri_id angka + di ekor jsonb
  {
    id: 'p4',
    tipe: 'masuk',
    sumber: 'pos_santri',
    data: { santri_id: 7 },
    kategori: 'Syahriyah',
    nominal: 50000,
    periode_kode: '2026-10'
  },
  // DIABAIKAN: sudah tertaut tagihan, alokasi VA, keluar, sumber lain, periode lain
  {
    id: 'x1',
    tipe: 'masuk',
    sumber: 'pos_santri',
    santri_id: 'S1',
    kategori: 'Syahriyah',
    nominal: 90000,
    periode_kode: '2026-10',
    tagihan_id: 'tg_lama'
  },
  {
    id: 'x2',
    tipe: 'masuk',
    sumber: 'bmt_va',
    santri_id: 'S1',
    nominal: 90000,
    alokasi: [{ tagihan_id: 'tg9', nominal: 90000 }]
  },
  {
    id: 'x3',
    tipe: 'keluar',
    sumber: 'pos_santri',
    santri_id: 'S1',
    kategori: 'Syahriyah',
    nominal: 90000,
    periode_kode: '2026-10'
  },
  {
    id: 'x4',
    tipe: 'masuk',
    sumber: 'manual',
    santri_id: 'S1',
    kategori: 'Syahriyah',
    nominal: 90000,
    periode_kode: '2026-10'
  },
  {
    id: 'x5',
    tipe: 'masuk',
    sumber: 'pos_santri',
    santri_id: 'S1',
    kategori: 'Syahriyah',
    nominal: 90000,
    periode_kode: '2026-11'
  },
  // tahunan
  {
    id: 't1',
    tipe: 'masuk',
    sumber: 'pos_santri',
    santri_id: 'S3',
    kategori: 'Daftar Ulang',
    nominal: 300000,
    periode_kode: 'TA2026'
  }
]

describe('prabayar — perilaku yang benar (ditulis tangan)', () => {
  it('tagihan cron bulan yang sudah dibayar di muka lahir LUNAS dengan jejak barisnya', () => {
    const peta = js.petaPrabayarPeriode(BARIS, ['2026-10'])
    const p = js.terapkanPrabayar(
      {
        santri_id: 'S1',
        kategori: 'Syahriyah',
        periode: 'Oktober 2026',
        nominal: 90000,
        terbayar: 0,
        status: 'belum'
      },
      peta
    )
    expect(p).toMatchObject({ terbayar: 90000, status: 'lunas', prabayar_dari: ['p1'] })
  })

  it('pecahan gabungan dijumlahkan ke tagihan induknya', () => {
    const peta = js.petaPrabayarPeriode(BARIS, ['2026-10'])
    const p = js.terapkanPrabayar(
      { santri_id: 'S2', kategori: 'Syahriyah TK-SDI', periode: 'Oktober 2026', nominal: 290000 },
      peta
    )
    expect(p.terbayar).toBe(290000)
    expect(p.prabayar_dari.sort()).toEqual(['p2', 'p3'])
  })

  it('tak pernah melebihi nominal tagihan, dan sebagian → partial', () => {
    const peta = js.petaPrabayarPeriode(BARIS, ['2026-10'])
    expect(
      js.terapkanPrabayar(
        { santri_id: 'S1', kategori: 'Syahriyah', periode: 'Oktober 2026', nominal: 60000 },
        peta
      ).terbayar
    ).toBe(60000)
    expect(
      js.terapkanPrabayar(
        { santri_id: 'S1', kategori: 'Syahriyah', periode: 'Oktober 2026', nominal: 120000 },
        peta
      ).status
    ).toBe('partial')
  })

  it('baris tertaut tagihan, alokasi VA, kas keluar, sumber lain, dan bulan lain tak ikut', () => {
    const peta = js.petaPrabayarPeriode(BARIS, ['2026-10'])
    const ids = petaDatar(peta).flatMap(([, , baris]) => baris)
    for (const x of ['x1', 'x2', 'x3', 'x4', 'x5']) expect(ids).not.toContain(x)
  })

  it('tanpa pembayaran → payload tak berubah sama sekali', () => {
    const payload = {
      santri_id: 'S9',
      kategori: 'Syahriyah',
      periode: 'Oktober 2026',
      nominal: 90000,
      terbayar: 0,
      status: 'belum'
    }
    expect(js.terapkanPrabayar(klon(payload), js.petaPrabayarPeriode(BARIS, ['2026-10']))).toEqual(
      payload
    )
    expect(js.petaPrabayarPeriode(BARIS, [])).toEqual(new Map())
  })
})

describe('prabayar.ts ⇄ cocokBayarTagihan.js — identik', () => {
  it('periodeKode & statusTagihan', () => {
    const periode = [
      'Juli 2026',
      ' agustus 2026 ',
      '2026-07',
      '2026_7',
      '2026-13',
      'TA 2026/2027',
      'Juli',
      'Sept 2026',
      '',
      null,
      undefined,
      202607
    ]
    for (const p of periode) expect(ts.periodeKode(p)).toBe(periodeKodeJs(p))
    const pasangan = [
      [0, 0],
      [90000, 0],
      [90000, 89999.6],
      [90000, 90000],
      [90000, 100000],
      [0, 5000],
      ['90000', '45000']
    ]
    for (const [n, b] of pasangan) expect(ts.statusTagihan(n, b)).toBe(statusTagihanJs(n, b))
  })

  it('kodePeriodeBaris, jenisTagihan, jenisBarisBuku, alokasiEksplisit, kunciSel', () => {
    const rows = [
      ...BARIS,
      { periode: 'Oktober 2026' },
      { periode: 'TA 2026/2027' },
      { periode_kode: 'TA2025' },
      { jatuh_tempo: '2026-10-10' },
      { jenis_label: 'Uang Buku' },
      { jenis: 'INFAQ ' },
      null,
      {}
    ]
    for (const r of rows) {
      expect(ts.kodePeriodeBaris(r)).toBe(js.kodePeriodeBaris(r))
      expect(ts.jenisTagihan(r)).toBe(js.jenisTagihan(r))
      expect(ts.jenisBarisBuku(r)).toBe(js.jenisBarisBuku(r))
      expect(ts.alokasiEksplisit(r)).toEqual(js.alokasiEksplisit(r))
    }
    expect(ts.kunciSel(7, ' Syahriyah ', '2026-10')).toBe(js.kunciSel(7, ' Syahriyah ', '2026-10'))
    expect(ts.SUMBER_BAYAR_SANTRI).toEqual(js.SUMBER_BAYAR_SANTRI)
  })

  it('petaPrabayarPeriode & terapkanPrabayar pada kasus tertulis', () => {
    for (const kodes of [['2026-10'], ['2026-10', 'TA2026'], ['2026-11'], []]) {
      expect(petaDatar(ts.petaPrabayarPeriode(klon(BARIS), kodes))).toEqual(
        petaDatar(js.petaPrabayarPeriode(klon(BARIS), kodes))
      )
    }
    const payloads = [
      {
        santri_id: 'S1',
        kategori: 'Syahriyah',
        periode: 'Oktober 2026',
        nominal: 90000,
        terbayar: 0,
        status: 'belum'
      },
      { santri_id: 'S2', kategori: 'Syahriyah TK-SDI', periode: 'Oktober 2026', nominal: 290000 },
      { santri_id: '7', kategori: 'Syahriyah', periode: '2026-10', nominal: 90000 },
      { santri_id: 'S3', kategori: 'Daftar Ulang', periode: 'TA 2026/2027', nominal: 350000 },
      { santri_id: 'S1', kategori: 'Syahriyah', periode: 'November 2026', nominal: 90000 },
      { santri_id: 'S1', kategori: 'Syahriyah', periode: '', nominal: 90000 }
    ]
    const kodes = ['2026-10', 'TA2026']
    const petaJs = js.petaPrabayarPeriode(klon(BARIS), kodes)
    const petaTs = ts.petaPrabayarPeriode(klon(BARIS), kodes)
    for (const p of payloads) {
      expect(ts.terapkanPrabayar(klon(p), petaTs)).toEqual(js.terapkanPrabayar(klon(p), petaJs))
    }
  })

  it('sapuan acak semi-deterministik', () => {
    let benih = 20260914
    const acak = (n) => {
      benih = (benih * 1103515245 + 12345) % 2147483648
      return benih % n
    }
    const santri = ['S1', 'S2', 'S3', '7', 7, '']
    const jenis = ['Syahriyah', 'syahriyah ', 'Uang Buku', 'SPP Sekolah', 'Ngaji', '']
    const kode = ['2026-10', '2026-9', 'Oktober 2026', 'TA2026', 'TA 2026/2027', '', '2026-13']
    const sumber = ['pos_santri', 'transfer_verified', 'bmt_va', 'manual', 'gaji']
    const rows = []
    for (let i = 0; i < 400; i++) {
      const r = {
        id: `r${i}`,
        tipe: acak(10) ? 'masuk' : 'keluar',
        sumber: sumber[acak(sumber.length)],
        kategori: jenis[acak(jenis.length)],
        nominal: acak(20) * 5000
      }
      const sid = santri[acak(santri.length)]
      if (acak(4)) r.santri_id = sid
      else r.data = { santri_id: sid }
      const k = kode[acak(kode.length)]
      if (acak(3)) r.periode_kode = k
      else r.periode = k
      if (!acak(6)) r.induk_jenis = jenis[acak(jenis.length)]
      if (!acak(9)) r.tagihan_id = `tg${acak(5)}`
      if (!acak(15)) r.alokasi = [{ tagihan_id: `tg${acak(5)}`, nominal: acak(3) * 1000 }]
      rows.push(r)
    }
    const kodes = ['2026-10', 'TA2026', '2026-09']
    const petaJs = js.petaPrabayarPeriode(klon(rows), kodes)
    const petaTs = ts.petaPrabayarPeriode(klon(rows), kodes)
    expect(petaDatar(petaTs)).toEqual(petaDatar(petaJs))
    for (let i = 0; i < 200; i++) {
      const p = {
        santri_id: santri[acak(santri.length)],
        kategori: jenis[acak(jenis.length)],
        periode: kode[acak(kode.length)],
        nominal: acak(30) * 5000,
        terbayar: 0,
        status: 'belum'
      }
      expect(ts.terapkanPrabayar(klon(p), petaTs)).toEqual(js.terapkanPrabayar(klon(p), petaJs))
    }
  })
})
