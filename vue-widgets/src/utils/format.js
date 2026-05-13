/**
 * Format angka ke Rupiah: 1500000 → "Rp 1.500.000"
 */
export function formatRupiah(amount, opts = {}) {
  if (amount == null || isNaN(amount)) return opts.fallback || 'Rp 0'
  const formatted = new Intl.NumberFormat('id-ID').format(Math.round(amount))
  return opts.noPrefix ? formatted : `Rp ${formatted}`
}

/**
 * Format angka biasa: 1500000 → "1.500.000"
 */
export function formatNumber(num) {
  if (num == null || isNaN(num)) return '0'
  return new Intl.NumberFormat('id-ID').format(num)
}

/**
 * Truncate text + ellipsis
 */
export function truncate(text, max = 50) {
  if (!text) return ''
  if (text.length <= max) return text
  return text.substring(0, max).trim() + '…'
}

/**
 * Capitalize first letter
 */
export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Slugify: "Halo Dunia" → "halo-dunia"
 */
export function slugify(str) {
  if (!str) return ''
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Initial: "Rahman Fanani" → "RF"
 */
export function initials(name, max = 2) {
  if (!name) return '?'
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, max)
    .join('')
    .toUpperCase()
}
