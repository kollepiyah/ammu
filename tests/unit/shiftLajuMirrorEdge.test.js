// PAGAR ANTI-MENYIMPANG (v.1.5.0, Kyai 16 Nov 2026): shift Pondok Laju yang aktif per guru per
// tanggal — utils/shiftLaju.js (app, sinkron Desktop, tambal, matriks) ⇄ hiview-absen/shiftLaju.ts
// (mesin HiView). Guru yang sama harus tercatat sama di mesin mana pun ia scan.
// Tadarus Pagi SENGAJA tak punya shift sendiri — ikut shift pagi guru kelas (Kyai 16 Nov).
import { describe, it, expect } from 'vitest'
import * as js from '../../vue-app/src/utils/shiftLaju.js'
import * as ts from '../../supabase/functions/hiview-absen/shiftLaju.ts'
import * as dJs from '../../vue-app/src/utils/shiftDerive.js'
import * as dTs from '../../supabase/functions/hiview-absen/shiftDerive.ts'

const S = {
  pondokLajuShift: { laju1: 'laju_1', laju2: 'laju_2' },
  shiftMaster: [
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
      selesai: '15:00',
      hadir_ikut: ['sore']
    },
    {
      id: 'sore',
      label: 'Sore',
      untuk: 'guru',
      urutan: 5,
      mulai: '15:00',
      terlambat: '15:20',
      selesai: '17:15'
    }
  ]
}

describe('shiftLaju JS ⇄ Deno', () => {
  it('shift aktif per tanggal identik di semua kombinasi', () => {
    for (const sesiTerjadwal of [[], ['laju1'], ['laju2'], ['laju1', 'laju2'], ['tadarus']])
      for (const settings of [S, {}, { pondokLajuShift: { laju1: 'laju_1' } }]) {
        const k = { settings, sesiTerjadwal }
        expect([...ts.shiftLajuAktif(k)].sort()).toEqual([...js.shiftLajuAktif(k)].sort())
      }
    expect(
      [...js.shiftLajuAktif({ settings: S, sesiTerjadwal: ['laju1', 'laju2'] })].sort()
    ).toEqual(['laju_1', 'laju_2'])
    // Tadarus Pagi tak pernah jadi shift sendiri
    expect(
      js.shiftLajuAktif({
        settings: { pondokLajuShift: { tadarus: 'x' } },
        sesiTerjadwal: ['tadarus']
      }).size
    ).toBe(0)
    expect(js.shiftLajuAktif({ settings: {}, sesiTerjadwal: ['laju1'] }).size).toBe(0)
    expect([...ts.idShiftLaju(S)].sort()).toEqual([...js.idShiftLaju(S)].sort())
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
    const tambah = ['laju_1', 'laju_2']
    for (let m = 0; m < 1440; m++) {
      const p = (n) => String(n).padStart(2, '0')
      const t = p(Math.floor(m / 60)) + ':' + p(m % 60)
      expect(dTs.deriveShift(t, guruSdi, S, tambah)).toBe(dJs.deriveShift(t, guruSdi, S, tambah))
    }
  })
  it('penentu banyak guru: jadwal per guru per tanggal', () => {
    const tentukan = js.penentuShiftLaju({
      settings: S,
      jadwal: [
        { guru_id: 'g1', tanggal: '2026-11-17', sesi: 'laju1' },
        { guru_id: 'g9', tanggal: '2026-11-17', sesi: 'laju2' }
      ]
    })
    expect([...tentukan({ id: 'g1' }, '2026-11-17')]).toEqual(['laju_1'])
    expect([...tentukan({ id: 'g1' }, '2026-11-18')]).toEqual([])
    expect(js.penentuShiftLaju({ settings: {}, jadwal: [] })({ id: 'g1' }, '2026-11-17').size).toBe(
      0
    )
  })
})

describe('scan mesin dengan shift harian Pondok Laju (sinkron Revo & tambal HiView)', () => {
  it('scan jam Laju masuk shift Laju hanya pada tanggal guru dijadwalkan; pulang menempel ke sana', async () => {
    const { kelompokkanScan, rencanaTambalScan } =
      await import('../../vue-app/src/utils/scanMesin.js')
    const guru = [{ id: 'g1', nama: 'Guru SDI', id_fingerprint: '7', shift_ids: ['sdi_pkbm'] }]
    const tentukan = js.penentuShiftLaju({
      settings: S,
      jadwal: [{ guru_id: 'g1', tanggal: '2026-11-17', sesi: 'laju1' }]
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
    expect(Object.keys(kelompokkanScan(scans, guru, S).agg)).toEqual([])
  })
})

describe('Laju 2 hadir ikut shift sore (Kyai 16 Nov: "tidak perlu cek log 2 kali")', () => {
  it('guru terjadwal Laju 2 yang hadir sore otomatis hadir Laju 2 — hanya di tanggal terjadwal', async () => {
    const { hitungBarisAutoGabungan } =
      await import('../../vue-app/src/utils/absensiMaterialize.js')
    const guru = [{ id: 'g1', nama: 'Guru Sore', shift_ids: ['sore'] }]
    const absen = [
      { guru_id: 'g1', tanggal: '2026-11-17', shift: 'sore', status: 'hadir', jam: '15:02' },
      { guru_id: 'g1', tanggal: '2026-11-18', shift: 'sore', status: 'terlambat', jam: '15:30' }
    ]
    const tentukan = js.penentuShiftLaju({
      settings: S,
      jadwal: [{ guru_id: 'g1', tanggal: '2026-11-17', sesi: 'laju2' }]
    })
    const baris = hitungBarisAutoGabungan(guru, absen, S, tentukan)
    expect(baris.map((b) => [b.tanggal, b.shift, b.status, b.source])).toEqual([
      ['2026-11-17', 'laju_2', 'hadir', 'auto_gabungan']
    ])
    // tanpa jadwal: tak ada baris Laju 2 (guru tak memiliki shift itu)
    expect(hitungBarisAutoGabungan(guru, absen, S)).toEqual([])
    // sudah scan sendiri di Laju 2 → tak ditimpa
    const sudah = [
      ...absen,
      { guru_id: 'g1', tanggal: '2026-11-17', shift: 'laju_2', status: 'hadir' }
    ]
    expect(hitungBarisAutoGabungan(guru, sudah, S, tentukan)).toEqual([])
  })
})
