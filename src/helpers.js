/**
 * Portal MU — Pure Helper Functions
 *
 * Diekstrak dari public/index.html untuk Phase 2 (B2) tujuan unit testing.
 * SEMUA fungsi di file ini adalah PURE (no DOM, no global state).
 *
 * Versi-versi ini HARUS bit-identical dengan implementasi di public/index.html.
 * Kalau berubah di sana, sync di sini dan re-run tests.
 */

// ============================================================================
// Tanggal & Usia
// ============================================================================

/**
 * Hitung usia (years + months) dari tanggal lahir ke tanggal acuan.
 * Returns '-' untuk input invalid atau tanggal acuan < tanggal lahir.
 *
 * @param {string|Date} tglLahir
 * @param {string|Date} tglAcuan
 * @returns {string} format "Yth Mbln" atau "-"
 */
export function hitungUsiaPadaTanggal(tglLahir, tglAcuan) {
  if (!tglLahir || !tglAcuan) return '-'
  const b = new Date(tglLahir),
    t = new Date(tglAcuan)
  if (isNaN(b.getTime()) || isNaN(t.getTime())) return '-'
  let y = t.getFullYear() - b.getFullYear(),
    m = t.getMonth() - b.getMonth()
  if (t.getDate() < b.getDate()) m--
  if (m < 0) {
    y--
    m += 12
  }
  if (y < 0) return '-'
  return `${y}th ${m}bln`
}

/**
 * Format tanggal ISO (YYYY-MM-DD) atau parseable date → DD/MM/YYYY.
 * Returns '-' untuk null/undefined/'-'. Returns input asli kalau tidak parseable.
 *
 * @param {string|Date} tglStr
 * @returns {string}
 */
export function formatTanggal(tglStr) {
  if (!tglStr || tglStr === '-') return '-'
  tglStr = String(tglStr)
  if (tglStr.includes('-') && tglStr.length === 10) {
    let p = tglStr.split('-')
    return `${p[2]}/${p[1]}/${p[0]}`
  }
  const d = new Date(tglStr)
  if (isNaN(d.getTime())) return tglStr
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

// ============================================================================
// String formatting
// ============================================================================

/**
 * Convert string ke Title Case (per-kata first-letter upper).
 *
 * @param {string} str
 * @returns {string}
 */
export function toTitleCase(str) {
  if (!str) return ''
  return String(str)
    .toLowerCase()
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/**
 * Escape karakter HTML-special agar aman dimasukkan ke innerHTML.
 *
 * @param {*} str
 * @returns {string}
 */
export function escapeHtml(str) {
  return String(str || '').replace(
    /[&<>"']/g,
    (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]
  )
}

// ============================================================================
// URL parsing
// ============================================================================

/**
 * Extract URL pertama dari text. Strip trailing punctuation.
 *
 * @param {string} text
 * @returns {string|null}
 */
export function extractFirstLink(text) {
  if (!text) return null
  const m = String(text).match(/https?:\/\/[^\s<>"]+/i)
  return m ? m[0].replace(/[.,;!?)\]}>'"]+$/, '') : null
}

// ============================================================================
// Auth (Firebase Auth email/password adapters)
// ============================================================================

/**
 * Sanitasi input username/WA jadi email Auth (Firebase Auth butuh email format).
 * Strip semua non-[a-z0-9._-] chars.
 *
 * @param {string} input
 * @returns {string|null}
 */
export function buildAuthEmail(input) {
  const clean = String(input || '')
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '')
  if (!clean) return null
  return clean + '@portal-mu.local'
}

/**
 * Tambahkan prefix 'mu_auth_' ke password agar minimal Firebase Auth length (6+).
 *
 * @param {string} pass
 * @returns {string}
 */
export function _toAuthPassword(pass) {
  return 'mu_auth_' + String(pass || '')
}
