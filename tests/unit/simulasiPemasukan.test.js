// Simulasi PEMASUKAN bulanan syahriyah (Kyai, 7 Agu 2026):
//   "simulasi pemasukan bulanan syahriyah santri, yg non bulanan jangan dihitung."
// Pasangan dari simulasi plafon bisyaroh — yang itu uang KELUAR, ini uang MASUK.
import { describe, it, expect } from 'vitest'
import {
  simulasiPemasukan,
  jenisBulanan,
  santriAktifSaja,
  frekuensiJenis
} from '../../vue-app/src/utils/simulasiPemasukan.js'

const SANTRI = [
  { id: 's1', nama: 'Ahmad', lembaga: 'PTPT', lembaga_sekolah: 'SDI', aktif: true },
  { id: 's2', nama: 'Zaidun', lembaga: 'PTPT', lembaga_sekolah: 'SDI', aktif: true },
  { id: 's3', nama: 'Alumni', lembaga: 'PTPT', aktif: false }
]
const JENIS = [
  { id: 'syahriyah', label: 'Syahriyah', frekuensi: 'bulanan', nominal_default: 200000 },
  { id: 'daftar_ulang', label: 'Daftar Ulang', frekuensi: 'tahunan', nominal_default: 500000 },
  { id: 'infaq', label: 'Infaq', frekuensi: 'manual', nominal_default: 50000 }
]

describe('frekuensiJenis & jenisBulanan', () => {
  it('membaca bentuk lama `auto_generate` sebagai cadangan', () => {
    expect(frekuensiJenis({ auto_generate: true })).toBe('bulanan')
    expect(frekuensiJenis({ auto_generate: false })).toBe('manual')
    expect(frekuensiJenis({ frekuensi: 'tahunan', auto_generate: true })).toBe('tahunan')
  })

  it('hanya jenis bulanan yang lolos', () => {
    expect(jenisBulanan(JENIS).map((j) => j.id)).toEqual(['syahriyah'])
    expect(jenisBulanan(null)).toEqual([])
  })
})

describe('santriAktifSaja', () => {
  it('aktif !== false — sejalan dengan Generate Tagihan', () => {
    expect(santriAktifSaja(SANTRI).map((s) => s.id)).toEqual(['s1', 's2'])
    // Tanpa field `aktif` dianggap AKTIF, sama seperti generate.
    expect(santriAktifSaja([{ id: 'x' }])).toHaveLength(1)
  })
})

describe('simulasiPemasukan', () => {
  it('menjumlahkan jenis bulanan × santri aktif', () => {
    const r = simulasiPemasukan(JENIS, SANTRI)
    expect(r.total).toBe(400000) // 200.000 × 2 santri aktif
    expect(r.santriKena).toBe(2)
    expect(r.santriTotal).toBe(2)
    expect(r.perJenis[0]).toMatchObject({ jenis_id: 'syahriyah', santri: 2, rata: 200000 })
  })

  it('NON-BULANAN tidak dihitung — inti permintaan Kyai', () => {
    const r = simulasiPemasukan(JENIS, SANTRI)
    expect(r.perJenis.map((x) => x.jenis_id)).toEqual(['syahriyah'])
    // Kalau tahunan ikut, totalnya jadi 1.400.000 dan kas tampak jauh lebih sehat.
    expect(r.total).not.toBe(1400000)
  })

  it('santri non-aktif tidak ikut', () => {
    const r = simulasiPemasukan(JENIS, [{ ...SANTRI[2] }])
    expect(r).toMatchObject({ total: 0, santriKena: 0, santriTotal: 0 })
  })

  it('jenis yang MENEMPEL tak dihitung dua kali', () => {
    // Syahriyah Qiraati menempel ke Syahriyah Sekolah: nominalnya sudah termasuk di sana.
    const jenis = [
      {
        id: 'sekolah',
        label: 'Syahriyah Sekolah',
        frekuensi: 'bulanan',
        nominal_default: 200000
      },
      {
        id: 'qiraati',
        label: 'Syahriyah Qiraati',
        frekuensi: 'bulanan',
        nominal_default: 90000,
        gabung_ke: ['sekolah'],
        gabung_syarat: 'punya_sekolah'
      }
    ]
    const r = simulasiPemasukan(jenis, [SANTRI[0]])
    expect(r.total).toBe(200000) // BUKAN 290.000
    expect(r.perJenis.map((x) => x.jenis_id)).toEqual(['sekolah'])
  })

  it('whitelist lembaga menyaring — santri di luar sasaran tak dihitung', () => {
    const jenis = [
      {
        id: 'khusus_sdi',
        label: 'Syahriyah SDI',
        frekuensi: 'bulanan',
        nominal_default: 150000,
        lembaga_only: ['SDI']
      }
    ]
    const luar = { id: 's9', lembaga: 'TPQ Pagi', aktif: true }
    expect(simulasiPemasukan(jenis, [SANTRI[0]]).total).toBe(150000)
    expect(simulasiPemasukan(jenis, [luar]).total).toBe(0)
  })

  it('tarif per santri menang atas tarif umum', () => {
    const jenis = [
      {
        id: 'syahriyah',
        label: 'Syahriyah',
        frekuensi: 'bulanan',
        nominal_default: 200000,
        nominal_per_santri: { s1: 50000 }
      }
    ]
    const r = simulasiPemasukan(jenis, SANTRI)
    expect(r.total).toBe(250000) // 50.000 (s1) + 200.000 (s2)
  })

  it('jenis bernominal 0 tak muncul — belum diisi bukan berarti gratis', () => {
    const jenis = [{ id: 'x', label: 'X', frekuensi: 'bulanan', nominal_default: 0 }]
    expect(simulasiPemasukan(jenis, SANTRI)).toMatchObject({ total: 0, perJenis: [] })
  })

  it('masukan kosong -> nol bersih, bukan NaN', () => {
    expect(simulasiPemasukan(null, null)).toEqual({
      perJenis: [],
      total: 0,
      santriKena: 0,
      santriTotal: 0,
      tagihanGabungan: 0,
      nilaiMenempel: 0
    })
  })
})

// Kyai 8 Agu 2026: "untuk tagihan santri yg digabung, mis: syahriyah TK-SD-PKBM gabung
// dengan qiraati pagi, Pondok-Fullday gabung qiraati sore. apakah sudah dihitung?"
// Sudah — tapi dari layar tak kelihatan, jadi jumlah tagihan gabungan & nilai komponen yang
// menempel ikut dilaporkan supaya bisa dipastikan dengan mata.
describe('penanda tagihan gabungan', () => {
  const JENIS_GABUNG = [
    {
      id: 'sd',
      label: 'Syahriyah Sekolah SD',
      frekuensi: 'bulanan',
      nominal_default: 200000,
      lembaga_only: ['SDI'] // hanya yang bersekolah di SDI — seperti setelan nyata
    },
    {
      id: 'pagi',
      label: 'Syahriyah Qiraati Pagi',
      frekuensi: 'bulanan',
      nominal_default: 90000,
      gabung_ke: ['sd'],
      gabung_syarat: 'punya_sekolah'
    }
  ]
  const punyaSekolah = { id: 'a', lembaga: 'TPQ Pagi', lembaga_sekolah: 'SDI', aktif: true }
  const tanpaSekolah = { id: 'b', lembaga: 'TPQ Pagi', aktif: true }

  it('santri bersekolah: satu tagihan gabungan, komponen ngaji terlaporkan', () => {
    const r = simulasiPemasukan(JENIS_GABUNG, [punyaSekolah])
    expect(r.total).toBe(200000) // BUKAN 290.000
    expect(r.tagihanGabungan).toBe(1)
    expect(r.nilaiMenempel).toBe(90000) // sudah TERMASUK di 200.000, bukan tambahan
    expect(r.perJenis.map((x) => x.jenis_id)).toEqual(['sd'])
  })

  it('santri tanpa sekolah: ngajinya ditagih sendiri, bukan gabungan', () => {
    const r = simulasiPemasukan(JENIS_GABUNG, [tanpaSekolah])
    expect(r.total).toBe(90000)
    expect(r.tagihanGabungan).toBe(0)
    expect(r.perJenis.map((x) => x.jenis_id)).toEqual(['pagi'])
  })

  it('campuran: dua jenis sama-sama muncul, dan itu WAJAR', () => {
    // Inilah yang Kyai lihat di layar — Qiraati Pagi tetap punya baris sendiri untuk santri
    //   yang tak bersekolah. Munculnya dua baris bukan berarti gabungannya gagal.
    const r = simulasiPemasukan(JENIS_GABUNG, [punyaSekolah, tanpaSekolah])
    expect(r.total).toBe(290000) // 200.000 (gabungan) + 90.000 (berdiri sendiri)
    expect(r.tagihanGabungan).toBe(1)
    expect(r.perJenis.find((x) => x.jenis_id === 'sd')).toMatchObject({
      santri: 1,
      gabungan: 1,
      nilaiMenempel: 90000
    })
    expect(r.perJenis.find((x) => x.jenis_id === 'pagi')).toMatchObject({
      santri: 1,
      gabungan: 0,
      nilaiMenempel: 0
    })
  })

  it('gabung_ke BELUM disetel -> nol gabungan & total membengkak (gejala yang dicari)', () => {
    const belumSetel = JENIS_GABUNG.map((j) => ({ ...j, gabung_ke: [] }))
    const r = simulasiPemasukan(belumSetel, [punyaSekolah])
    expect(r.tagihanGabungan).toBe(0)
    expect(r.total).toBe(290000) // dua jenis ditagih sendiri-sendiri
  })
})
