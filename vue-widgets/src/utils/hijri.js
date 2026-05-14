const NAMA_PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon']
const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

export function getKalibrasi() {
  // Baca dari window.savedSettings.kalibrasiHijri kalau ada (set oleh legacy)
  try {
    return parseInt(window.savedSettings?.kalibrasiHijri || 0) || 0
  } catch {
    return 0
  }
}

export function hitungPasaran(date) {
  const d = date instanceof Date ? date : new Date(date)
  if (isNaN(d)) return ''
  const ref = new Date(1900, 0, 1)
  const diff = Math.floor((d - ref) / 86400000)
  return NAMA_PASARAN[((diff % 5) + 5 + 1) % 5]
}

export function toArabicDigit(num) {
  return String(num ?? '').replace(/\d/g, (d) => ARABIC_DIGITS[parseInt(d, 10)] || d)
}

// BUGFIX v.109.13: formatHijri pakai Arabic script + Arabic numerals
// Sebelumnya Intl.DateTimeFormat('id-ID-u-ca-islamic') return Latin transliteration
// ('28 Zulkaidah 1447 H'). Kyai expect Arabic native: '٢٨ ذُو ٱلْقَعْدَة ١٤٤٧'.
const NAMA_BULAN_ARAB = [
  'ٱلْمُحَرَّم',
  'صَفَر',
  'رَبِيع ٱلْأَوَّل',
  'رَبِيع ٱلثَّانِي',
  'جُمَادَىٰ ٱلْأُولَىٰ',
  'جُمَادَىٰ ٱلثَّانِيَة',
  'رَجَب',
  'شَعْبَان',
  'رَمَضَان',
  'شَوَّال',
  'ذُو ٱلْقَعْدَة',
  'ذُو ٱلْحِجَّة'
]

export function formatHijri(date = new Date()) {
  try {
    const d = new Date(date)
    const h = masehiToHijri(d)
    if (!h.day || !h.month || !h.year) return ''
    const bulanArab = NAMA_BULAN_ARAB[h.month - 1] || ''
    return `${toArabicDigit(h.day)} ${bulanArab} ${toArabicDigit(h.year)}`
  } catch {
    return ''
  }
}

export function masehiToHijri(date) {
  const d = new Date(date)
  d.setDate(d.getDate() + getKalibrasi())
  try {
    const parts = new Intl.DateTimeFormat('en-u-ca-islamic', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).formatToParts(d)
    return {
      day: parseInt(parts.find((p) => p.type === 'day').value),
      month: parseInt(parts.find((p) => p.type === 'month').value),
      year: parseInt(parts.find((p) => p.type === 'year').value)
    }
  } catch {
    return { day: 0, month: 0, year: 0 }
  }
}

export function formatMasehi(date = new Date()) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
