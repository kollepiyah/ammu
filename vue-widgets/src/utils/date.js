/**
 * Format Date ke string Indonesia: "12 Mei 2026"
 */
export function formatDate(date, opts = {}) {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date.seconds ? date.seconds * 1000 : date)
  if (isNaN(d)) return ''

  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]

  const day = d.getDate()
  const month = months[d.getMonth()]
  const year = d.getFullYear()

  if (opts.withTime) {
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    return `${day} ${month} ${year}, ${hh}:${mm}`
  }

  if (opts.short) {
    const shortMonths = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agt',
      'Sep',
      'Okt',
      'Nov',
      'Des'
    ]
    return `${day} ${shortMonths[d.getMonth()]} ${year}`
  }

  return `${day} ${month} ${year}`
}

/**
 * Format relative time: "2 jam yang lalu"
 */
export function formatRelativeTime(date) {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date.seconds ? date.seconds * 1000 : date)
  const diff = Date.now() - d.getTime()
  const seconds = Math.floor(diff / 1000)

  if (seconds < 60) return 'baru saja'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} menit yang lalu`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} jam yang lalu`
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} hari yang lalu`
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} bulan yang lalu`
  return `${Math.floor(seconds / 31536000)} tahun yang lalu`
}

/**
 * ISO date string: "2026-05-12"
 */
export function toISODate(date) {
  const d = date instanceof Date ? date : new Date(date)
  if (isNaN(d)) return ''
  return d.toISOString().split('T')[0]
}
