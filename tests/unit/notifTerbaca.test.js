// "Tandai dibaca" harus mengosongkan daftar Belum dibaca — termasuk jenis yang dulu
// terlupa di daftar tulisan tangan (glondongan) dan notif ber-ts di depan jam HP.
import { describe, it, expect } from 'vitest'
import { batasTerbaca, JENIS_NOTIF } from '@/utils/notifTerbaca'

const belumDibaca = (items, batas) => items.filter((it) => it.ts > Number(batas[it.jenis] || 0))

describe('batasTerbaca', () => {
  const now = 1_800_000_000_000

  it('semua jenis yang dikenal mendapat batas = sekarang', () => {
    const b = batasTerbaca([], now)
    for (const j of JENIS_NOTIF) expect(b[j]).toBe(now)
  })

  it('notif glondongan ikut terbaca (dulu tersisa)', () => {
    const items = [
      { id: 'glondwait_1', jenis: 'glondongan', ts: now - 5000 },
      { id: 'tesreq_1', jenis: 'tes', ts: now - 1000 }
    ]
    expect(belumDibaca(items, batasTerbaca(items, now))).toEqual([])
  })

  it('ts di depan jam perangkat tetap terbaca', () => {
    const items = [{ id: 'tesres_1', jenis: 'tes', ts: now + 7 * 3600_000 }]
    const b = batasTerbaca(items, now)
    expect(b.tes).toBe(now + 7 * 3600_000)
    expect(belumDibaca(items, b)).toEqual([])
  })

  it('jenis baru yang belum dikenal tetap ditandai', () => {
    const items = [{ id: 'x', jenis: 'jenis_baru', ts: now - 1 }]
    expect(belumDibaca(items, batasTerbaca(items, now))).toEqual([])
  })

  it('notif yang datang SESUDAH ditandai tetap belum dibaca', () => {
    const b = batasTerbaca([{ id: 'a', jenis: 'post', ts: now - 10 }], now)
    expect(belumDibaca([{ id: 'b', jenis: 'post', ts: now + 60_000 }], b)).toHaveLength(1)
  })
})
