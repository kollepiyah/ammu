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

export function formatHijri(date = new Date()) {
  try {
    const d = new Date(date)
    d.setDate(d.getDate() + getKalibrasi())
    return new Intl.DateTimeFormat('id-ID-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
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
