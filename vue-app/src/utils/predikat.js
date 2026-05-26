// vue-app/src/utils/predikat.js
// Port dari public/index.html legacy (line 34910–34922).
// Hitung predikat dari nilai numerik berdasarkan rules di savedSettings.predikatRules.

// Default rules sesuai legacy umum di Portal MU (bisa di-override per pesantren
// via Pengaturan → predikatRules di Firestore settings/general).
export const DEFAULT_PREDIKAT_RULES = [
  { label: 'Sangat Baik', min: 90, max: 100 },
  { label: 'Baik', min: 80, max: 89 },
  { label: 'Cukup', min: 70, max: 79 },
  { label: 'Perlu Bimbingan', min: 0, max: 69 }
]

/**
 * Hitung predikat dari nilai numerik.
 * @param {number|string} nilai
 * @param {Object} settings - settings.value dari useSettingsStore (savedSettings legacy)
 * @returns {string} label predikat, atau '-' kalau nilai invalid / tidak ada rule cocok.
 */
export function hitungPredikat(nilai, settings) {
  const rules =
    settings && Array.isArray(settings.predikatRules) && settings.predikatRules.length > 0
      ? settings.predikatRules
      : DEFAULT_PREDIKAT_RULES
  const n = Number(nilai)
  if (isNaN(n)) return '-'
  const r = rules.find((rr) => n >= Number(rr.min) && n <= Number(rr.max))
  return r ? r.label : '-'
}
