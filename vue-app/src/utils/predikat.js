// vue-app/src/utils/predikat.js
// Sumber tunggal predikat rapor — skala EDITABLE (settings.predikatScale) v.97.0626.
// Default: Mumtaz / Jayyid / Maqbul / Rasib (aksara Arab). Admin bisa ubah label & ambang.

export const PREDIKAT_AR = {
  mumtaz: 'ممتاز',
  jayyid: 'جيّد',
  maqbul: 'مقبول',
  rasib: 'راسب'
}
export const PREDIKAT_LATIN = {
  mumtaz: 'Mumtaz',
  jayyid: 'Jayyid',
  maqbul: 'Maqbul',
  rasib: 'Rasib'
}

// Skala default (urut menurun). min = nilai minimum utk dapat predikat itu.
export const DEFAULT_PREDIKAT_SCALE = [
  { key: 'mumtaz', label: 'Mumtaz', ar: PREDIKAT_AR.mumtaz, min: 81 },
  { key: 'jayyid', label: 'Jayyid', ar: PREDIKAT_AR.jayyid, min: 71 },
  { key: 'maqbul', label: 'Maqbul', ar: PREDIKAT_AR.maqbul, min: 61 },
  { key: 'rasib', label: 'Rasib', ar: PREDIKAT_AR.rasib, min: 0 }
]

function _slug(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
}

// Hitung predikat dari nilai memakai skala (editable). Nilai <=0/kosong -> kosong.
export function predikatNilai(nilai, scale) {
  const n = Number(nilai)
  if (!isFinite(n) || n <= 0) return { key: '', ar: '', latin: '' }
  const sc = (Array.isArray(scale) && scale.length ? scale : DEFAULT_PREDIKAT_SCALE)
    .slice()
    .sort((a, b) => Number(b.min) - Number(a.min))
  for (const r of sc) {
    if (n >= Number(r.min)) {
      const key = r.key || _slug(r.label)
      return { key, ar: r.ar || PREDIKAT_AR[key] || r.label || '', latin: r.label || PREDIKAT_LATIN[key] || '' }
    }
  }
  return { key: '', ar: '', latin: '' }
}

// Qiraati & Diniyah pakai skala yang sama (editable). kkm diabaikan (kompat tanda tangan lama).
export function predikatQiraati(nilai, scale) {
  return predikatNilai(nilai, scale)
}
export function predikatDiniyah(nilai, kkm, scale) {
  return predikatNilai(nilai, scale)
}
export function predikatRapor(nilai, { scale } = {}) {
  return predikatNilai(nilai, scale)
}
export function hitungPredikat(nilai, settings) {
  return predikatNilai(nilai, settings?.predikatScale).latin || '-'
}
export const DEFAULT_PREDIKAT_RULES = DEFAULT_PREDIKAT_SCALE
