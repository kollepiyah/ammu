// Arah kiblat (blueprint Ammu publik F2) — fungsi murni + tes. Azimut lingkaran besar dari
// lokasi ke Ka'bah, diukur searah jarum jam dari utara sejati.
import { jarakKm } from '@/utils/waktuSholat'

export const KABAH = Object.freeze({ lat: 21.422487, lon: 39.826206 })

const D2R = Math.PI / 180

/** Azimut kiblat (derajat 0–360 dari utara sejati). */
export function arahKiblat(lat, lon) {
  const p1 = lat * D2R
  const p2 = KABAH.lat * D2R
  const dL = (KABAH.lon - lon) * D2R
  const y = Math.sin(dL)
  const x = Math.cos(p1) * Math.tan(p2) - Math.sin(p1) * Math.cos(dL)
  const az = (Math.atan2(y, x) * 180) / Math.PI
  return (az + 360) % 360
}

export function jarakKeKabah(lat, lon) {
  return jarakKm({ lat, lon }, KABAH)
}

/** Selisih sudut terpendek b − a, rentang −180..180 (untuk jarum & "putar ke kanan/kiri"). */
export function selisihSudut(a, b) {
  return ((((b - a) % 360) + 540) % 360) - 180
}

/** 294.5 → "294° 30′" (tampilan derajat-menit busur). */
export function formatDerajat(d) {
  const total = Math.round(d * 60)
  return `${Math.floor(total / 60)}° ${String(total % 60).padStart(2, '0')}′`
}
