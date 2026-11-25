import { describe, it, expect } from 'vitest'
import {
  hitungWaktuSholat,
  waktuBerikutnya,
  formatSisa,
  formatMenit,
  jarakKm,
  LOKASI_PESANTREN
} from '@/utils/waktuSholat'
import { arahKiblat, jarakKeKabah, selisihSudut, formatDerajat } from '@/utils/kiblat'

// Jadwal resmi Kemenag Kab. Sidoarjo (api.myquran.com v2, id 1624 — salinan data Bimas Islam),
// diambil 25 Nov 2026. Kolom: subuh terbit dhuha dzuhur ashar maghrib isya (+ imsak).
const KEMENAG_SIDOARJO = [
  ['2026-03-01', '04:08 04:18 05:31 05:58 11:45 14:46 17:52 19:01'],
  ['2026-03-15', '04:09 04:19 05:30 05:58 11:42 14:50 17:46 18:54'],
  ['2026-03-31', '04:07 04:17 05:29 05:56 11:37 14:52 17:38 18:46'],
  ['2026-06-01', '04:05 04:15 05:32 06:01 11:30 14:51 17:22 18:35'],
  ['2026-06-15', '04:08 04:18 05:36 06:05 11:33 14:53 17:24 18:38'],
  ['2026-06-30', '04:11 04:21 05:39 06:08 11:36 14:56 17:27 18:41'],
  ['2026-09-01', '04:05 04:15 05:27 05:55 11:33 14:51 17:31 18:41'],
  ['2026-09-15', '03:58 04:08 05:20 05:47 11:28 14:42 17:29 18:38'],
  ['2026-09-30', '03:50 04:00 05:11 05:39 11:23 14:31 17:27 18:36'],
  ['2026-12-01', '03:30 03:40 04:59 05:28 11:22 14:46 17:37 18:52'],
  ['2026-12-15', '03:34 03:44 05:04 05:33 11:28 14:54 17:44 19:00'],
  ['2026-12-31', '03:42 03:52 05:12 05:41 11:35 15:02 17:52 19:08']
]
const KOLOM = ['imsak', 'subuh', 'terbit', 'dhuha', 'dzuhur', 'ashar', 'maghrib', 'isya']
// Titik acuan kabupaten (kota Sidoarjo). Jadwal Kemenag per kabupaten memakai satu titik.
const SIDOARJO = { lat: -7.45, lon: 112.717 }
const keMenit = (s) => {
  const [h, m] = s.split(':').map(Number)
  return h * 60 + m
}

describe('hitungWaktuSholat — metode Kemenag vs jadwal resmi Sidoarjo', () => {
  it('semua waktu dalam 4 musim selisih ≤ 1 menit, dan sebagian besar persis', () => {
    let persis = 0
    let total = 0
    for (const [tanggal, baris] of KEMENAG_SIDOARJO) {
      const ref = baris.split(' ')
      const { menit } = hitungWaktuSholat({ tanggal, ...SIDOARJO, tz: 7, metode: 'kemenag' })
      KOLOM.forEach((k, i) => {
        const selisih = menit[k] - keMenit(ref[i])
        expect(Math.abs(selisih), `${tanggal} ${k}`).toBeLessThanOrEqual(1)
        total++
        if (selisih === 0) persis++
      })
    }
    expect(persis / total).toBeGreaterThan(0.8)
  })

  it('imsak = subuh − 10 menit, urutan waktu masuk akal', () => {
    const { menit, jam } = hitungWaktuSholat({ tanggal: '2026-11-25', ...LOKASI_PESANTREN })
    expect(menit.subuh - menit.imsak).toBe(10)
    const urut = KOLOM.map((k) => menit[k])
    expect([...urut].sort((a, b) => a - b)).toEqual(urut)
    expect(jam.dzuhur).toMatch(/^11:\d\d$/)
  })
})

// jadwalsholat.nu.or.id/kab-sidoarjo, dibaca 25 Nov 2026 (bulan lalu tak tersedia di situsnya).
// Kolom sama dengan Kemenag di atas. 2027-03-01 jatuh di Ramadhan (Maghrib +1).
const NU_SIDOARJO = [
  ['2026-11-01', '03:32 03:42 05:01 05:24 11:14 14:28 17:25 18:37'],
  ['2026-11-08', '03:29 03:39 05:00 05:23 11:14 14:32 17:26 18:39'],
  ['2026-11-15', '03:28 03:38 05:00 05:23 11:15 14:35 17:28 18:42'],
  ['2026-11-25', '03:28 03:38 05:01 05:25 11:18 14:41 17:32 18:47'],
  ['2026-11-30', '03:28 03:38 05:02 05:26 11:19 14:43 17:34 18:49'],
  ['2026-12-01', '03:28 03:38 05:02 05:26 11:20 14:44 17:35 18:50'],
  ['2026-12-15', '03:32 03:42 05:07 05:31 11:26 14:52 17:42 18:58'],
  ['2026-12-31', '03:40 03:50 05:15 05:39 11:33 15:00 17:49 19:06'],
  ['2027-03-01', '04:06 04:16 05:34 05:56 11:43 14:44 17:51 18:59'],
  ['2027-03-15', '04:07 04:17 05:33 05:56 11:40 14:48 17:43 18:52'],
  ['2027-03-31', '04:05 04:15 05:32 05:54 11:35 14:50 17:35 18:44'],
  ['2027-06-01', '04:03 04:13 05:35 05:59 11:28 14:49 17:19 18:33'],
  ['2027-06-15', '04:06 04:16 05:38 06:03 11:31 14:51 17:21 18:36'],
  ['2027-06-30', '04:09 04:19 05:42 06:06 11:34 14:54 17:24 18:39'],
  ['2027-09-01', '04:03 04:13 05:30 05:53 11:31 14:49 17:29 18:39'],
  ['2027-09-15', '03:56 04:06 05:23 05:45 11:26 14:41 17:27 18:36'],
  ['2027-09-30', '03:48 03:58 05:14 05:37 11:21 14:29 17:25 18:34']
]
// Koordinat yang tertulis di situs NU untuk Kab. Sidoarjo: 7°27'1" LS 112°42'45" BT.
const NU_TITIK = { lat: -(7 + 27 / 60 + 1 / 3600), lon: 112 + 42 / 60 + 45 / 3600 }

describe('hitungWaktuSholat — Falakiyah NU vs jadwalsholat.nu.or.id', () => {
  it('17 tanggal 4 musim: semua ≤ 1 menit, ≥ 95% persis (termasuk Maghrib Ramadhan)', () => {
    let persis = 0
    let total = 0
    for (const [tanggal, baris] of NU_SIDOARJO) {
      const ref = baris.split(' ')
      const { menit } = hitungWaktuSholat({ tanggal, ...NU_TITIK, tz: 7, metode: 'nu' })
      KOLOM.forEach((k, i) => {
        const selisih = menit[k] - keMenit(ref[i])
        expect(Math.abs(selisih), `${tanggal} ${k}`).toBeLessThanOrEqual(1)
        total++
        if (selisih === 0) persis++
      })
    }
    expect(persis / total).toBeGreaterThan(0.95)
  })
})

describe('hitungWaktuSholat — Umm al-Qura', () => {
  it('Isya tepat 90 menit sesudah Maghrib, Subuh lebih siang dari Kemenag (18,5° < 20°)', () => {
    const o = { tanggal: '2026-06-15', ...SIDOARJO }
    const uq = hitungWaktuSholat({ ...o, metode: 'ummulqura' })
    const kmg = hitungWaktuSholat({ ...o, metode: 'kemenag' })
    expect(uq.menit.isya - uq.menit.maghrib).toBe(90)
    expect(uq.menit.subuh).toBeGreaterThan(kmg.menit.subuh)
  })
  it('metode tak dikenal jatuh ke bawaan (Falakiyah NU)', () => {
    const o = { tanggal: '2026-06-15', ...SIDOARJO }
    expect(hitungWaktuSholat({ ...o, metode: 'ngawur' }).metode).toBe('nu')
  })
})

describe('waktuBerikutnya & format', () => {
  const j = hitungWaktuSholat({ tanggal: '2026-06-15', ...SIDOARJO })
  it('sebelum Dzuhur → Dzuhur', () => {
    const b = waktuBerikutnya(j, keMenit('10:00'))
    expect(b.kunci).toBe('dzuhur')
    expect(b.sisa).toBe(j.menit.dzuhur - 600)
  })
  it('tepat masuk waktu → waktu sesudahnya', () => {
    expect(waktuBerikutnya(j, j.menit.ashar).kunci).toBe('maghrib')
  })
  it('sesudah Isya → Subuh esok', () => {
    const b = waktuBerikutnya(j, keMenit('21:00'))
    expect(b).toMatchObject({ kunci: 'subuh', besok: true })
    expect(b.sisa).toBe(j.menit.subuh + 1440 - 1260)
  })
  it('format', () => {
    expect(formatSisa(90)).toBe('1 j 30 m')
    expect(formatSisa(7)).toBe('7 m')
    expect(formatMenit(1442)).toBe('00:02')
  })
  it('jarak Waru–Sidoarjo kota ± 11 km', () => {
    const km = jarakKm(LOKASI_PESANTREN, SIDOARJO)
    expect(km).toBeGreaterThan(9)
    expect(km).toBeLessThan(13)
  })
})

describe('kiblat', () => {
  it('arah kiblat Jakarta ±295° (nilai Kemenag 295° 09′)', () => {
    expect(arahKiblat(-6.1754, 106.8272)).toBeCloseTo(295.15, 0)
  })
  it('arah kiblat pesantren di Sidoarjo ±294°, jarak ±8.800 km', () => {
    const az = arahKiblat(LOKASI_PESANTREN.lat, LOKASI_PESANTREN.lon)
    expect(az).toBeGreaterThan(293.5)
    expect(az).toBeLessThan(295)
    const km = jarakKeKabah(LOKASI_PESANTREN.lat, LOKASI_PESANTREN.lon)
    expect(km).toBeGreaterThan(8500)
    expect(km).toBeLessThan(9200)
  })
  it('selisih sudut terpendek & format derajat', () => {
    expect(selisihSudut(350, 10)).toBe(20)
    expect(selisihSudut(10, 350)).toBe(-20)
    expect(formatDerajat(294.5)).toBe('294° 30′')
  })
})
