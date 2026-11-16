// Kyai 16 Nov 2026: "barangkali guru yang mengaku absennya tidak terbaca itu fingerprint ID-nya
// salah". Satu ID mesin = satu guru; ID ganda dulu membuat scan HiView ditolak diam-diam.
import { describe, it, expect } from 'vitest'
import {
  normIdMesin,
  pilihGuruDariId,
  petaPemilikId,
  idGanda,
  pemakaiLainId
} from '@/utils/idMesin'
import * as ts from '../../supabase/functions/hiview-absen/idMesin.ts'
import { kelompokkanScan } from '@/utils/scanMesin'

const ahmad = { id: 'g1', nama: 'Ahmad', status: 'Aktif', id_fingerprint: '12' }
const dewi = { id: 'g4', nama: 'Dewi', status: 'Nonaktif', id_fingerprint: '12' }
const eko = { id: 'g5', nama: 'Eko', status: 'Aktif', id_fingerprint: ' 7 ' }
const gita = { id: 'g7', nama: 'Gita', status: '', id_fingerprint: '7' }
const budi = { id: 'g2', nama: 'Budi', status: 'Aktif', id_fingerprint: '' }

describe('aturan ID mesin', () => {
  it('ID lama guru Nonaktif tak merebut scan guru Aktif', () => {
    expect(pilihGuruDariId([dewi, ahmad])).toEqual({ guru: ahmad, ganda: [] })
    expect(pilihGuruDariId([dewi])).toEqual({ guru: dewi, ganda: [] }) // pemegang tunggal: perilaku lama
    expect(pilihGuruDariId([])).toEqual({ guru: null, ganda: [] })
  })
  it('dua guru Aktif memegang ID sama → tak menebak orang', () => {
    expect(pilihGuruDariId([eko, gita])).toEqual({ guru: null, ganda: [eko, gita] }) // status kosong = Aktif
    const nonaktif2 = [dewi, { ...dewi, id: 'g9', nama: 'Fajar' }]
    expect(pilihGuruDariId(nonaktif2).guru).toBe(null)
  })
  it('peta pemilik, daftar ganda, penjaga formulir', () => {
    const semua = [ahmad, dewi, eko, gita, budi]
    const { pemilik, ganda } = petaPemilikId(semua)
    expect(pemilik.get('12')).toBe(ahmad)
    expect([...ganda.keys()]).toEqual(['7'])
    expect([...idGanda(semua).keys()]).toEqual(['12', '7'])
    expect(pemakaiLainId(semua, ' 12', 'g1')).toEqual({ aktif: [], nonaktif: [dewi] })
    expect(pemakaiLainId(semua, '7', 'g5')).toEqual({ aktif: [gita], nonaktif: [] })
    expect(pemakaiLainId(semua, '', 'g2')).toEqual({ aktif: [], nonaktif: [] })
    expect(normIdMesin(null)).toBe('')
  })
  it('cermin webhook HiView memilih sama dengan app', () => {
    const kasus = [[dewi, ahmad], [dewi], [], [eko, gita], [ahmad], [dewi, { ...dewi, id: 'x' }]]
    for (const k of kasus) expect(ts.pilihGuruDariId(k)).toEqual(pilihGuruDariId(k))
  })
})

describe('sinkron Fingerspot / tambal log memakai aturan yang sama', () => {
  const settings = {
    shiftMaster: [
      {
        id: 'pagi',
        label: 'Pagi',
        untuk: 'guru',
        urutan: 1,
        mulai: '06:30',
        terlambat: '06:45',
        selesai: '12:00'
      }
    ]
  }
  const g = (o) => ({ shift_ids: ['pagi'], ...o })
  it('PIN milik guru Aktif tercatat walau guru Nonaktif memegang PIN yang sama', () => {
    const k = kelompokkanScan(
      [{ device_pin: '12', timestamp: '2026-11-16 06:35:00' }],
      [g(ahmad), g(dewi)],
      settings
    )
    expect(Object.values(k.agg).map((a) => a.g.nama)).toEqual(['Ahmad'])
    expect(k.takKenal.size).toBe(0)
  })
  it('PIN yang dipegang dua guru Aktif dilewati & dilaporkan', () => {
    const k = kelompokkanScan(
      [{ device_pin: '7', timestamp: '2026-11-16 06:35:00' }],
      [g(eko), g(gita)],
      settings
    )
    expect(Object.keys(k.agg)).toEqual([])
    expect([...k.takKenal]).toEqual(['7'])
    expect(k.ganda.get('7').map((x) => x.nama)).toEqual(['Eko', 'Gita'])
  })
})
