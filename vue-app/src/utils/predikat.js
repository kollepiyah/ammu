// vue-app/src/utils/predikat.js
// Sumber tunggal predikat rapor (Qiraati + Diniyah) — skala kyai v.97.0626.
// Skala: Mumtaz / Jayyid / Maqbul / Rasib. Aksara Arab dipakai di tampilan & PDF.

// Aksara Arab tiap predikat (PREDIKAT_LATIN = transliterasi).
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

function _wrap(key) {
  return key
    ? { key, ar: PREDIKAT_AR[key], latin: PREDIKAT_LATIN[key] }
    : { key: '', ar: '', latin: '' }
}

// Predikat Qiraati (band tetap, tanpa KKM):
//   >=81 Mumtaz · 71-80 Jayyid · 61-70 Maqbul · <=60 Rasib.
// Nilai <=0 / kosong -> predikat kosong (sel rapor belum diisi tak jadi "Rasib").
export function predikatQiraati(nilai) {
  const n = Number(nilai)
  if (!isFinite(n) || n <= 0) return _wrap('')
  if (n >= 81) return _wrap('mumtaz')
  if (n >= 71) return _wrap('jayyid')
  if (n >= 61) return _wrap('maqbul')
  return _wrap('rasib')
}

// Predikat Diniyah (relatif KKM):
//   >=81 Mumtaz · di atas KKM Jayyid · 65..KKM Maqbul · <65 Rasib.
export function predikatDiniyah(nilai, kkm = 75) {
  const n = Number(nilai)
  if (!isFinite(n) || n <= 0) return _wrap('')
  const k = Number(kkm) || 75
  if (n >= 81) return _wrap('mumtaz')
  if (n > k) return _wrap('jayyid')
  if (n >= 65) return _wrap('maqbul')
  return _wrap('rasib')
}

// Generik: kategori 'diniyah' butuh KKM, selain itu band Qiraati.
export function predikatRapor(nilai, { kategori = 'qiraati', kkm = 75 } = {}) {
  return kategori === 'diniyah' ? predikatDiniyah(nilai, kkm) : predikatQiraati(nilai)
}

// Backward-compat: hitungPredikat lama (kembalikan label Latin). settings diabaikan.
export function hitungPredikat(nilai, _settings) {
  return predikatQiraati(nilai).latin || '-'
}

// Aturan band default (referensi editor Pengaturan).
export const DEFAULT_PREDIKAT_RULES = [
  { min: 81, max: 100, label: 'Mumtaz' },
  { min: 71, max: 80, label: 'Jayyid' },
  { min: 61, max: 70, label: 'Maqbul' },
  { min: 0, max: 60, label: 'Rasib' }
]
