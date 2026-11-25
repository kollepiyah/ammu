import { describe, it, expect } from 'vitest'
import { muatanWidgetSholat, jadwalBeberapaHari } from '@/utils/widgetSholat'
import { rencanaAdzan, idAdzan, rapikanSetelanAdzan } from '@/utils/adzan'
import { LOKASI_PESANTREN } from '@/utils/waktuSholat'

const MULAI = new Date(2026, 10, 25, 9, 0)

describe('muatan widget jadwal sholat', () => {
  const m = muatanWidgetSholat({
    lokasi: LOKASI_PESANTREN,
    metode: 'nu',
    mulai: MULAI,
    agenda: [
      { id: 'x', judul: 'Lewat', tgl_mulai: '2026-11-02', tipe: 'kegiatan' },
      { id: 'a', judul: 'PAS 1', tgl_mulai: '2026-11-26', tgl_akhir: '2026-12-02', tipe: 'ujian' },
      { id: 'b', judul: 'Natal', tgl_mulai: '2026-12-25', tipe: 'libur_nasional' },
      { id: 'c', judul: 'Ketiga', tgl_mulai: '2026-12-28', tipe: 'kegiatan' }
    ]
  })
  it('7 hari, lima waktu dalam menit, label & hijriah', () => {
    expect(m.hari).toHaveLength(7)
    expect(m.hari[0]).toMatchObject({ t: '2026-11-25', label: 'Rabu, 25 Nov' })
    expect(m.hari[0].hijri).toMatch(/1448$/)
    expect(m.hari[0].w).toHaveLength(5)
    expect(m.hari[6].t).toBe('2026-12-01')
    expect(m.tempat).toBe('Panjunan')
  })
  it('agenda: 2 terdekat yang belum lewat, libur ditandai', () => {
    expect(m.agenda).toEqual([
      { tgl: '26 Nov', judul: 'PAS 1', libur: false },
      { tgl: '25 Des', judul: 'Natal', libur: true }
    ])
  })
})

describe('rencana adzan', () => {
  const hari = jadwalBeberapaHari({ lokasi: LOKASI_PESANTREN, metode: 'nu', mulai: MULAI, hari: 2 })
  it('hanya waktu yang masih di depan & aktif (Imsak mati bawaan)', () => {
    const r = rencanaAdzan({ hari, setelan: {}, sekarangMs: MULAI.getTime() })
    // hari ini sesudah 09:00: Dzuhur, Ashar, Maghrib, Isya; besok: Subuh..Isya (5)
    expect(r).toHaveLength(9)
    expect(r[0].judul).toBe('Waktu Dzuhur telah tiba')
    expect(r.every((x, i) => i === 0 || x.at > r[i - 1].at)).toBe(true)
    expect(r.some((x) => x.judul.includes('Imsak'))).toBe(false)
  })
  it('pengingat sebelum waktu & sakelar per waktu', () => {
    const r = rencanaAdzan({
      hari,
      setelan: { aktif: { dzuhur: false }, sebelum: 10 },
      sekarangMs: MULAI.getTime(),
      tempat: 'Panjunan'
    })
    expect(r[0].judul).toBe('10 menit lagi waktu Ashar')
    expect(r[0].isi).toMatch(/^Ashar \d\d:\d\d · Panjunan$/)
    const asharMenit = hari[0].menit.ashar
    expect(r[0].at).toBe(new Date(2026, 10, 25).getTime() + (asharMenit - 10) * 60000)
  })
  it('id stabil, unik, muat int32; setelan dirapikan', () => {
    expect(idAdzan('2026-11-25', 'subuh')).not.toBe(idAdzan('2026-11-25', 'isya'))
    expect(idAdzan('2026-11-26', 'imsak')).toBeLessThan(2 ** 31)
    expect(rapikanSetelanAdzan({ sebelum: 7, aktif: { subuh: 'ya' } })).toMatchObject({
      sebelum: 0,
      aktif: { subuh: true, imsak: false }
    })
  })
})
