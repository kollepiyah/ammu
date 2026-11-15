// PAGAR ANTI-MENYIMPANG (v.1.5.0, Kyai 16 Nov 2026): shift Pondok Laju yang aktif per guru per
// tanggal — utils/shiftLaju.js (app, sinkron Desktop, tambal, matriks) ⇄ hiview-absen/shiftLaju.ts
// (mesin HiView). Guru yang sama harus tercatat sama di mesin mana pun ia scan.
import { describe, it, expect } from 'vitest'
import * as js from '../../vue-app/src/utils/shiftLaju.js'
import * as ts from '../../supabase/functions/hiview-absen/shiftLaju.ts'
import * as dJs from '../../vue-app/src/utils/shiftDerive.js'
import * as dTs from '../../supabase/functions/hiview-absen/shiftDerive.ts'

const S = {
  pondokLajuShift: { tadarus: 'tadarus_pagi', laju1: 'laju_1', laju2: 'laju_2' },
  shiftMaster: [
    {
      id: 'tadarus_pagi',
      label: 'Tadarus Pagi',
      untuk: 'guru',
      urutan: 1,
      mulai: '06:30',
      terlambat: '06:45',
      selesai: '07:15'
    },
    {
      id: 'sdi_pkbm',
      label: 'SDI - PKBM',
      untuk: 'guru',
      urutan: 2,
      mulai: '07:00',
      terlambat: '07:15',
      selesai: '13:00'
    },
    {
      id: 'laju_1',
      label: 'Laju 1',
      untuk: 'guru',
      urutan: 3,
      mulai: '13:00',
      terlambat: '13:15',
      selesai: '14:00'
    },
    {
      id: 'laju_2',
      label: 'Laju 2',
      untuk: 'guru',
      urutan: 4,
      mulai: '14:00',
      terlambat: '14:15',
      selesai: '15:00'
    }
  ]
}
const SANTRI = [
  { id: 's1', is_pondok_laju: true, guru_pagi: 'Ust.  Laju ' },
  { id: 's2', is_pondok_laju: true, is_mukim: true, guru_pagi: 'Ust. Mukim' },
  { id: 's3', is_pondok_laju: false, guru_pagi: 'Ust. Biasa' },
  { id: 's4', is_pondok_laju: true, aktif: false, guru_pagi: 'Ust. Keluar' },
  { id: 's5', is_pondok_laju: true, guru: 'Ust. Lama' }
]

describe('shiftLaju JS ⇄ Deno', () => {
  it('guru kelas Pondok Laju identik', () => {
    expect([...js.guruKelasLajuSet(SANTRI)].sort()).toEqual(['ust. laju', 'ust. lama'])
    expect([...ts.guruKelasLajuSet(SANTRI)].sort()).toEqual([...js.guruKelasLajuSet(SANTRI)].sort())
  })
  it('shift aktif per tanggal identik di semua kombinasi', () => {
    const kasus = []
    for (const tanggal of ['2026-11-15', '2026-11-16', '2026-11-17']) // 15 = Ahad
      for (const sesiTerjadwal of [[], ['laju1'], ['laju2'], ['laju1', 'laju2'], ['tadarus']])
        for (const guruKelas of [true, false])
          for (const settings of [
            S,
            {},
            { pondokLajuShift: { laju1: 'laju_1' } },
            { ...S, pondokLajuShift: { ...S.pondokLajuShift, mulai: '2026-11-17' } }
          ])
            kasus.push({ settings, tanggal, sesiTerjadwal, guruKelas })
    for (const k of kasus) {
      expect([...ts.shiftLajuAktif(k)].sort()).toEqual([...js.shiftLajuAktif(k)].sort())
    }
    expect(
      [
        ...js.shiftLajuAktif({
          settings: S,
          tanggal: '2026-11-16',
          sesiTerjadwal: ['laju1'],
          guruKelas: true
        })
      ].sort()
    ).toEqual(['laju_1', 'tadarus_pagi'])
    // Ahad: Tadarus Pagi tak aktif; jadwal Laju tetap berlaku bila memang dijadwalkan
    expect([
      ...js.shiftLajuAktif({
        settings: S,
        tanggal: '2026-11-15',
        sesiTerjadwal: ['laju2'],
        guruKelas: true
      })
    ]).toEqual(['laju_2'])
    // berlaku mulai: Tadarus Pagi tak aktif sebelum tanggal mulai (cegah alpa massal)
    const M = { ...S, pondokLajuShift: { ...S.pondokLajuShift, mulai: '2026-11-17' } }
    expect(js.shiftLajuAktif({ settings: M, tanggal: '2026-11-16', guruKelas: true }).size).toBe(0)
    expect([...js.shiftLajuAktif({ settings: M, tanggal: '2026-11-17', guruKelas: true })]).toEqual(
      ['tadarus_pagi']
    )
    // belum dipilih Kyai → tak ada apa-apa
    expect(
      js.shiftLajuAktif({
        settings: {},
        tanggal: '2026-11-16',
        sesiTerjadwal: ['laju1'],
        guruKelas: true
      }).size
    ).toBe(0)
  })
})

describe('deriveShift dengan shift harian (tambahan) — JS ⇄ Deno', () => {
  const guruSdi = { id: 'g1', nama: 'Guru SDI', shift_ids: ['sdi_pkbm'] }
  it('tanpa tambahan: scan jam Laju tak masuk shift mana pun (perilaku lama)', () => {
    expect(dJs.deriveShift('13:30', guruSdi, S)).toBeNull()
    expect(dTs.deriveShift('13:30', guruSdi, S)).toBeNull()
  })
  it('dengan tambahan: jatuh ke shift Laju; window inti menang menurut urutan', () => {
    const tambah = new Set(['laju_1', 'laju_2'])
    for (const [jam, harap] of [
      ['13:30', 'laju_1'],
      ['14:30', 'laju_2'],
      ['13:00', 'sdi_pkbm'], // 13:00 masih window inti SDI (urutan lebih kecil)
      ['07:00', 'sdi_pkbm'],
      ['15:30', null]
    ]) {
      expect(dJs.deriveShift(jam, guruSdi, S, tambah)).toBe(harap)
      expect(dTs.deriveShift(jam, guruSdi, S, tambah)).toBe(harap)
    }
  })
  it('sapuan 00:00–23:59 identik dengan tambahan', () => {
    const tambah = ['tadarus_pagi', 'laju_2']
    for (let m = 0; m < 1440; m++) {
      const p = (n) => String(n).padStart(2, '0')
      const t = p(Math.floor(m / 60)) + ':' + p(m % 60)
      expect(dTs.deriveShift(t, guruSdi, S, tambah)).toBe(dJs.deriveShift(t, guruSdi, S, tambah))
    }
  })
  it('penentu banyak guru: jadwal per guru per tanggal + Tadarus Pagi guru kelas', () => {
    const tentukan = js.penentuShiftLaju({
      settings: S,
      jadwal: [
        { guru_id: 'g1', tanggal: '2026-11-17', sesi: 'laju1' },
        { guru_id: 'g9', tanggal: '2026-11-17', sesi: 'laju2' }
      ],
      santriList: SANTRI
    })
    expect([...tentukan({ id: 'g1', nama: 'Guru SDI' }, '2026-11-17')]).toEqual(['laju_1'])
    expect([...tentukan({ id: 'g1', nama: 'Guru SDI' }, '2026-11-18')]).toEqual([])
    expect([...tentukan({ id: 'gk', nama: 'Ust. Laju' }, '2026-11-18')]).toEqual(['tadarus_pagi'])
    expect(
      js.penentuShiftLaju({ settings: {}, jadwal: [], santriList: SANTRI })(
        { id: 'gk', nama: 'Ust. Laju' },
        '2026-11-18'
      ).size
    ).toBe(0)
  })
})

describe('scan mesin dengan shift harian Pondok Laju (sinkron Revo & tambal HiView)', () => {
  it('scan jam Laju masuk shift Laju hanya pada tanggal guru dijadwalkan; pulang menempel ke sana', async () => {
    const { kelompokkanScan, rencanaTambalScan } =
      await import('../../vue-app/src/utils/scanMesin.js')
    const guru = [{ id: 'g1', nama: 'Guru SDI', id_fingerprint: '7', shift_ids: ['sdi_pkbm'] }]
    const tentukan = js.penentuShiftLaju({
      settings: S,
      jadwal: [{ guru_id: 'g1', tanggal: '2026-11-17', sesi: 'laju1' }],
      santriList: []
    })
    const scans = [
      { device_pin: '7', timestamp: '2026-11-17 13:20:00' }, // dijadwalkan → Laju 1
      { device_pin: '7', timestamp: '2026-11-17 13:58:00' }, // pulang Laju 1
      { device_pin: '7', timestamp: '2026-11-18 13:20:00' } // tak dijadwalkan → luar window
    ]
    const k = kelompokkanScan(scans, guru, S, tentukan)
    expect(Object.keys(k.agg)).toEqual(['7|2026-11-17|laju_1'])
    expect(k.luar).toBe(1)
    const r = rencanaTambalScan({
      kelompok: k,
      ada: [],
      guruAktif: guru,
      settings: S,
      sumber: 'uji',
      waktu: ''
    })
    expect(r.baru.map((b) => [b.tanggal, b.shift, b.jam, b.jam_pulang])).toEqual([
      ['2026-11-17', 'laju_1', '13:20', '13:58']
    ])
    // tanpa shift harian: perilaku lama, tak ada baris
    expect(Object.keys(kelompokkanScan(scans, guru, S).agg)).toEqual([])
  })
})
