import { describe, it, expect, vi, beforeEach } from 'vitest'

// Audit egress 25 Nov 2026: sinkron Fingerspot dulu memanggil getOne('absensi_shift_guru') per
// baris (dua kali per baris, ±760 permintaan tiap 5 menit di PC kantor — 1,14 juta sejak 21 Sep).
// Kini: SATU tarikan borongan untuk rentang yang disentuh, dan sinkron otomatis dilewati total
// bila att_log tak berubah. Tes ini menjaga keduanya, plus perilaku tulisnya tetap sama.

const db = vi.hoisted(() => ({
  getOne: vi.fn(),
  getAll: vi.fn(),
  setOne: vi.fn(),
  mergeOne: vi.fn(),
  queryColl: vi.fn()
}))
vi.mock('@/services/db', () => db)

const SET = {
  shiftMaster: [
    {
      id: 'pagi',
      label: 'Pagi',
      untuk: 'guru',
      urutan: 1,
      mulai: '06:00',
      terlambat: '06:30',
      selesai: '12:00'
    },
    {
      id: 'sore',
      label: 'Sore',
      untuk: 'guru',
      urutan: 4,
      mulai: '15:00',
      terlambat: '15:30',
      selesai: '17:00'
    }
  ]
}
const GURU = [
  { id: 'g1', nama: 'Ahmad', id_fingerprint: '14', shift_ids: ['pagi', 'sore'], aktif: true }
]
vi.mock('@/stores/settings', () => ({ useSettingsStore: () => ({ settings: SET }) }))
vi.mock('@/stores/collections', () => ({
  useCollectionsStore: () => ({ isLoaded: () => true, guru: GURU })
}))

import { useFingerprintSync } from '@/composables/useFingerprintSync'
import { tandaAttLog, tanggalAwalSinkron } from '@/utils/scanMesin'
import { todayJakarta } from '@/utils/format'

function mundur(n) {
  const d = new Date(todayJakarta() + 'T00:00:00Z')
  d.setUTCDate(d.getUTCDate() - n)
  return d.toISOString().slice(0, 10)
}
const H1 = mundur(2)
const H2 = mundur(1)
const SCAN = [
  { device_pin: '14', timestamp: `${H1} 06:10:00` },
  { device_pin: '14', timestamp: `${H1} 11:58:00` }, // pulang pagi
  { device_pin: '14', timestamp: `${H2} 06:45:00` } // terlambat
]

beforeEach(() => {
  Object.values(db).forEach((f) => f.mockReset())
  window.electronAPI = { readAttLog: vi.fn(async () => ({ ok: true, rows: SCAN })) }
})

describe('sinkron Fingerspot — borongan', () => {
  it('membaca baris yang ada SEKALI (bukan getOne per baris) dan tetap menulis yang berubah', async () => {
    // H1 pagi sudah ada & identik; H2 pagi belum ada.
    db.queryColl.mockResolvedValueOnce([
      { id: `shift_g1_${H1}_pagi`, status: 'hadir', jam: '06:10', tanggal: H1 }
    ])
    const res = await useFingerprintSync().sync({ commit: true })

    expect(db.getOne).not.toHaveBeenCalled()
    expect(db.getAll).not.toHaveBeenCalled() // guru dari store koleksi
    expect(db.queryColl).toHaveBeenCalledTimes(1)
    expect(db.queryColl).toHaveBeenCalledWith('absensi_shift_guru', [['tanggal', '>=', H1]])

    expect(res.skipSame).toBe(1)
    expect(res.written).toBe(1)
    expect(db.setOne).toHaveBeenCalledTimes(1)
    expect(db.setOne.mock.calls[0][1]).toBe(`shift_g1_${H2}_pagi`)
    expect(db.setOne.mock.calls[0][2]).toMatchObject({ status: 'terlambat', jam: '06:45' })
    // Pulang H1 ditempel ke baris yang SUDAH ada (dari tarikan borongan).
    expect(db.mergeOne).toHaveBeenCalledWith('absensi_shift_guru', `shift_g1_${H1}_pagi`, {
      jam_pulang: '11:58'
    })
    expect(res.tanda).toBe(
      tandaAttLog({
        jumlah: 3,
        terbaru: SCAN[2].timestamp,
        hariIni: todayJakarta(),
        hariMundur: 14
      })
    )
  })

  it('baris izin/sakit di server tetap tak ditimpa', async () => {
    db.queryColl.mockResolvedValueOnce([
      { id: `shift_g1_${H1}_pagi`, status: 'izin', jam: '', tanggal: H1 },
      { id: `shift_g1_${H2}_pagi`, status: 'sakit', jam: '', tanggal: H2 }
    ])
    const res = await useFingerprintSync().sync({ commit: true })
    expect(res.skipIzin).toBe(2)
    expect(db.setOne).not.toHaveBeenCalled()
  })

  it('att_log tak berubah + tandaLewati cocok → nol permintaan ke server', async () => {
    db.queryColl.mockResolvedValue([])
    const pertama = await useFingerprintSync().sync({ commit: true })
    Object.values(db).forEach((f) => f.mockReset())
    const kedua = await useFingerprintSync().sync({ commit: true, tandaLewati: pertama.tanda })
    expect(kedua.dilewati).toBe(true)
    for (const f of Object.values(db)) expect(f).not.toHaveBeenCalled()
  })

  it('scan baru masuk → tanda berubah → sinkron jalan lagi', async () => {
    db.queryColl.mockResolvedValue([])
    const pertama = await useFingerprintSync().sync({ commit: true })
    window.electronAPI.readAttLog = vi.fn(async () => ({
      ok: true,
      rows: [...SCAN, { device_pin: '14', timestamp: `${H2} 15:05:00` }]
    }))
    const kedua = await useFingerprintSync().sync({ commit: true, tandaLewati: pertama.tanda })
    expect(kedua.dilewati).toBeUndefined()
    expect(db.queryColl).toHaveBeenCalled()
  })
})

describe('tanggalAwalSinkron', () => {
  it('tanggal terkecil dari baris masuk & kandidat pulang', () => {
    expect(tanggalAwalSinkron({ a: { date: '2026-11-20' } }, { b: { date: '2026-11-18' } })).toBe(
      '2026-11-18'
    )
    expect(tanggalAwalSinkron({}, {})).toBe('')
  })
})
