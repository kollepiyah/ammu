// Jenis Tunjangan ber-scope (Kyai, 7 Agu 2026) — empat kategori yang diminta:
//   1. tunjangan jabatan   : "Tunjangan Kepala Lembaga"      -> flat + scope.jabatan
//   2. tunjangan pengabdian: per tahun, KELIPATAN, tiap bulan -> per_tahun_pengabdian
//   3. tunjangan khusus    : hanya yang mengabdi >5 tahun     -> syarat.masa_min_tahun
//   4. tunjangan berprestasi: 100% tepat waktu                -> flat_prestasi
// Plus keputusan Kyai: bonus tepat waktu MASUK TUNJANGAN, bukan pos bonus sendiri.
import { describe, it, expect } from 'vitest'
import {
  tahunPengabdian,
  persenTepatWaktu,
  barisTunjangan,
  jenisTunjanganList,
  normalizeJenisTunjangan
} from '../../vue-app/src/utils/bisyarohScope.js'

const jenis = (o) => normalizeJenisTunjangan(o)

// Guru: Kepala di PTPT, shift pagi. 26 hari efektif, semuanya hadir tepat waktu.
const ctx = (o = {}) => ({
  guruId: 'g1',
  refs: [{ jabatan_di_sini: 'Kepala Lembaga', lembaga: 'PTPT', group: '' }],
  shiftIds: new Set(['pagi']),
  hadirPerShift: { pagi: 26 },
  hadirTepatPerShift: { pagi: 26 },
  efektifPerShift: { pagi: 26 },
  tahunPengabdian: 7,
  bebanJPByLembaga: {},
  jpDiajarByLembaga: {},
  ...o
})

describe('tahunPengabdian', () => {
  it('tahun PENUH — ulang tahun tugas yang belum lewat tidak dihitung', () => {
    expect(tahunPengabdian('2019-08-01', '2026-08-31')).toBe(7)
    expect(tahunPengabdian('2019-09-01', '2026-08-31')).toBe(6) // kurang sebulan
    expect(tahunPengabdian('2019-08-31', '2026-08-31')).toBe(7) // tepat di hari-H
    expect(tahunPengabdian('2019-08-31', '2026-08-30')).toBe(6) // kurang sehari
  })

  it('tanpa Tanggal Tugas -> null, BUKAN 0 — nol berarti "baru masuk", null berarti tak diketahui', () => {
    for (const kosong of ['', null, undefined, '-', '01/08/2019', '2019-8-1']) {
      expect(tahunPengabdian(kosong, '2026-08-31')).toBeNull()
    }
  })

  it('tanggal tugas di masa depan = data keliru -> null, jangan dibayar', () => {
    expect(tahunPengabdian('2027-01-01', '2026-08-31')).toBeNull()
  })

  it('dihitung dari komponen tanggal, tak bergeser di WIB', () => {
    // Tanggal batas persis: kalau lewat Date lokal, ini kelas bug yang mundur sehari.
    expect(tahunPengabdian('2020-01-01', '2026-01-01')).toBe(6)
    expect(tahunPengabdian('2020-01-02', '2026-01-01')).toBe(5)
  })

  it('berekor jam tetap terbaca', () => {
    expect(tahunPengabdian('2019-08-01T00:00:00.000Z', '2026-08-31')).toBe(7)
  })
})

describe('persenTepatWaktu', () => {
  const j = jenis({ label: 'X' })

  it('tepat ÷ hari efektif', () => {
    expect(persenTepatWaktu(j, ctx())).toBe(100)
    expect(persenTepatWaktu(j, ctx({ hadirTepatPerShift: { pagi: 13 } }))).toBe(50)
  })

  it('tanpa hari efektif -> null (tak bisa dinilai), bukan 0 atau 100', () => {
    expect(persenTepatWaktu(j, ctx({ efektifPerShift: {} }))).toBeNull()
  })

  it('hanya shift yang cocok scope yang dinilai', () => {
    const sore = jenis({ label: 'Sore', scope: { shift: ['sore'] } })
    const c = ctx({
      shiftIds: new Set(['pagi', 'sore']),
      efektifPerShift: { pagi: 26, sore: 26 },
      hadirTepatPerShift: { pagi: 0, sore: 26 }
    })
    expect(persenTepatWaktu(sore, c)).toBe(100)
    expect(persenTepatWaktu(jenis({ label: 'Semua' }), c)).toBe(50)
  })
})

describe('barisTunjangan — 4 kategori permintaan Kyai', () => {
  it('1. tunjangan jabatan: kena Kepala Lembaga, tak kena guru biasa', () => {
    const j = [
      jenis({
        label: 'Tunjangan Kepala Lembaga',
        nominal: 300000,
        scope: { jabatan: ['Kepala Lembaga'] }
      })
    ]
    expect(barisTunjangan(j, ctx())[0]).toMatchObject({
      kategori: 'tunjangan',
      nominal: 300000,
      lembaga: 'PTPT'
    })
    const guruBiasa = ctx({ refs: [{ jabatan_di_sini: 'Guru', lembaga: 'PTPT' }] })
    expect(barisTunjangan(j, guruBiasa)).toEqual([])
  })

  it('2. tunjangan pengabdian: KELIPATAN tahun, terbit tiap bulan', () => {
    const j = [jenis({ label: 'Pengabdian', hitungan: 'per_tahun_pengabdian', nominal: 10000 })]
    expect(barisTunjangan(j, ctx())[0]).toMatchObject({ qty: 7, tarif: 10000, nominal: 70000 })
    // Tahun bertambah -> nominal ikut naik tanpa disunting.
    expect(barisTunjangan(j, ctx({ tahunPengabdian: 8 }))[0].nominal).toBe(80000)
  })

  it('2b. pengabdian tanpa Tanggal Tugas: TIDAK terbit — jangan menebak masa kerja', () => {
    const j = [jenis({ label: 'Pengabdian', hitungan: 'per_tahun_pengabdian', nominal: 10000 })]
    expect(barisTunjangan(j, ctx({ tahunPengabdian: null }))).toEqual([])
  })

  it('3. tunjangan khusus di atas 5 tahun: 7 th dapat, 4 th tidak, tak diketahui tidak', () => {
    const j = [jenis({ label: 'Loyalitas', nominal: 150000, syarat: { masa_min_tahun: 5 } })]
    expect(barisTunjangan(j, ctx())).toHaveLength(1)
    expect(barisTunjangan(j, ctx({ tahunPengabdian: 4 }))).toEqual([])
    expect(barisTunjangan(j, ctx({ tahunPengabdian: null }))).toEqual([])
    // Tepat di ambang = "di atas 5 tahun" versi Kyai: 5 tahun penuh sudah dapat.
    expect(barisTunjangan(j, ctx({ tahunPengabdian: 5 }))).toHaveLength(1)
  })

  it('3b. syarat masa kerja berlaku untuk cara hitung APA PUN, bukan cuma kelipatan', () => {
    const j = [
      jenis({
        label: 'Bonus senior',
        hitungan: 'per_tepat',
        nominal: 5000,
        syarat: { masa_min_tahun: 5 }
      })
    ]
    expect(barisTunjangan(j, ctx())[0].nominal).toBe(130000) // 26 × 5.000
    expect(barisTunjangan(j, ctx({ tahunPengabdian: 2 }))).toEqual([])
  })

  it('4. tunjangan berprestasi: 100% tepat waktu dapat, 1× terlambat gugur', () => {
    const j = [jenis({ label: 'Berprestasi', hitungan: 'flat_prestasi', nominal: 200000 })]
    expect(barisTunjangan(j, ctx())[0]).toMatchObject({ nominal: 200000, persen: 100, ambang: 100 })
    // Satu hari terlambat -> 25/26 = 96,2% -> gugur di ambang 100.
    expect(barisTunjangan(j, ctx({ hadirTepatPerShift: { pagi: 25 } }))).toEqual([])
  })

  it('4b. ambang boleh diturunkan Kyai', () => {
    const j = [
      jenis({
        label: 'Berprestasi 95',
        hitungan: 'flat_prestasi',
        nominal: 200000,
        syarat: { persen_tepat_min: 95 }
      })
    ]
    expect(barisTunjangan(j, ctx({ hadirTepatPerShift: { pagi: 25 } }))).toHaveLength(1)
    expect(barisTunjangan(j, ctx({ hadirTepatPerShift: { pagi: 24 } }))).toEqual([]) // 92,3%
  })

  it('4c. izin/sakit ikut memotong — hadir penuh yang dinilai, bukan sekadar tak telat', () => {
    const j = [jenis({ label: 'Berprestasi', hitungan: 'flat_prestasi', nominal: 200000 })]
    // Tak pernah terlambat, tapi 6 hari izin: 20 tepat dari 26 hari efektif -> gugur.
    expect(barisTunjangan(j, ctx({ hadirTepatPerShift: { pagi: 20 } }))).toEqual([])
  })

  it('bonus tepat waktu di daftar ini berkategori tunjangan, bukan bonus', () => {
    const j = [jenis({ label: 'Bonus Tepat Waktu', hitungan: 'per_tepat', nominal: 3000 })]
    expect(barisTunjangan(j, ctx())[0]).toMatchObject({ kategori: 'tunjangan', nominal: 78000 })
  })

  it('jenis non-aktif & daftar kosong aman', () => {
    expect(barisTunjangan([jenis({ label: 'X', nominal: 1000, aktif: false })], ctx())).toEqual([])
    expect(barisTunjangan(null, ctx())).toEqual([])
  })
})

describe('jenisTunjanganList — migrasi dari master_tunjangan lama', () => {
  it('kunci baru BELUM ada -> turunkan dari master_tunjangan (slip tak berubah)', () => {
    const out = jenisTunjanganList({
      master_tunjangan: [{ nama: 'Transport', nominal: 50000, guru_ids: ['g1', 'g2'] }]
    })
    expect(out).toHaveLength(1)
    expect(out[0]).toMatchObject({ label: 'Transport', nominal: 50000, hitungan: 'flat' })
    expect(out[0].scope.guru_ids).toEqual(['g1', 'g2'])
  })

  it('kunci baru ADA tapi kosong -> dihormati, JANGAN jatuh ke daftar lama', () => {
    expect(
      jenisTunjanganList({
        keuTunjanganJenis: [],
        master_tunjangan: [{ nama: 'Transport', nominal: 50000 }]
      })
    ).toEqual([])
  })

  it('kunci baru dipakai apa adanya', () => {
    const out = jenisTunjanganList({
      keuTunjanganJenis: [
        { label: 'Pengabdian', hitungan: 'per_tahun_pengabdian', nominal: 10000 }
      ],
      master_tunjangan: [{ nama: 'Transport', nominal: 50000 }]
    })
    expect(out.map((j) => j.label)).toEqual(['Pengabdian'])
  })

  it('settings kosong -> [] tanpa melempar', () => {
    expect(jenisTunjanganList(null)).toEqual([])
    expect(jenisTunjanganList({})).toEqual([])
  })
})

describe('normalizeJenisTunjangan', () => {
  it('cara hitung asing jatuh ke flat; syarat dijinakkan', () => {
    const j = jenis({
      label: 'X',
      hitungan: 'per_bulan_purnama',
      syarat: { masa_min_tahun: -3, persen_tepat_min: 999 }
    })
    expect(j.hitungan).toBe('flat')
    expect(j.syarat).toEqual({ masa_min_tahun: 0, persen_tepat_min: 100 })
  })

  it('id diturunkan dari label bila kosong', () => {
    expect(jenis({ label: 'Tunjangan Kepala Lembaga' }).id).toBe('tunjangan_kepala_lembaga')
  })
})
