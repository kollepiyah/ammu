// Hijri date utilities — port dari vue-widgets/src/utils/hijri.js
const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

const NAMA_BULAN_ARAB = [
  'ٱلمحرم',
  'صفر',
  'ربيع ٱلأول',
  'ربيع ٱلثاني',
  'جمادى ٱلأولى',
  'جمادى ٱلثانية',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو ٱلقعدة',
  'ذو ٱلحجة'
]

/** Baca kalibrasi offset Hijri dari settings (settings.kalibrasiHijri). */
export function getKalibrasi(settings) {
  try {
    return parseInt(settings?.kalibrasiHijri || 0) || 0
  } catch {
    return 0
  }
}

/** Convert angka latin → arab. */
export function toArabicDigit(num) {
  return String(num ?? '').replace(/\d/g, (d) => ARABIC_DIGITS[parseInt(d, 10)] || d)
}

/** Convert Date → { day, month, year } Hijri. */
export function masehiToHijri(date, kalibrasiOffset = 0) {
  const d = new Date(date)
  d.setDate(d.getDate() + kalibrasiOffset)
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

/** Format Hijri lengkap: "٢٩ ذو ٱلقعدة ١٤٤٧" */
export function formatHijri(date = new Date(), kalibrasiOffset = 0) {
  try {
    const h = masehiToHijri(date, kalibrasiOffset)
    if (!h.day || !h.month || !h.year) return ''
    const bulanArab = NAMA_BULAN_ARAB[h.month - 1] || ''
    return `${toArabicDigit(h.day)} ${bulanArab} ${toArabicDigit(h.year)}`
  } catch {
    return ''
  }
}

/** Format Masehi: "16 Mei 2026" */
export function formatMasehi(date = new Date()) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

/** Format hari pekan: "SABTU" */
export function formatHari(date = new Date()) {
  return new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date).toUpperCase()
}
