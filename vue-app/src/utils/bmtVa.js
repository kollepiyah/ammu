// v.97.0626: Util Virtual Account BMT PETA — VA TETAP per santri.
// Pola contoh: prefix institusi BMT + NIS/ID santri. Format final mengikuti standar BMT PETA.
// Util MURNI (tanpa efek samping) — aman dipakai di view/komposabel mana pun.

/** Ambil NIS/ID identitas santri sebagai dasar nomor VA. */
export function santriVaKey(santri) {
  if (!santri || typeof santri !== 'object') return ''
  return String(santri.nis || santri.NIS || santri.nis_lokal || santri.id || '').replace(/\s+/g, '')
}

/**
 * Bentuk nomor VA tetap per santri.
 * Prioritas: nomor VA yang sudah diterbitkan BMT & tersimpan di santri (`va_bmt`),
 * jika belum ada → bentuk dari prefix BMT (settings.bmt_va_prefix) + NIS/ID.
 * @param {object} santri  dokumen santri
 * @param {object} settings  settings keuangan (bmt_va_prefix, bmt_aktif)
 * @returns {string} nomor VA, atau '' bila belum bisa dibentuk
 */
export function computeVaSantri(santri, settings) {
  const s = settings || {}
  if (santri && santri.va_bmt) return String(santri.va_bmt).replace(/\s+/g, '')
  const prefix = String(s.bmt_va_prefix || '').replace(/\s+/g, '')
  const key = santriVaKey(santri)
  if (!prefix || !key) return ''
  return prefix + key
}

/** Format tampilan VA: dikelompokkan tiap 4 digit agar mudah dibaca. */
export function formatVa(va) {
  const clean = String(va || '').replace(/\s+/g, '')
  if (!clean) return ''
  return clean.replace(/(.{4})/g, '$1 ').trim()
}

/** Apakah fitur VA BMT diaktifkan (dari settings). Default: false. */
export function isBmtAktif(settings) {
  return !!(settings && settings.bmt_aktif === true)
}

/**
 * Reverse-lookup VA -> santri (kebalikan computeVaSantri). Dipakai webhook/simulasi
 * & UI rekonsiliasi admin untuk memetakan laporan BMT ("VA X bayar N") ke santri.
 * Prioritas: cocok `santri.va_bmt` eksplisit, lalu prefix + NIS/ID (santriVaKey).
 * @param {string} va           nomor VA dari laporan BMT
 * @param {Array}  santriList   daftar dokumen santri
 * @param {object} settings     settings keuangan (bmt_va_prefix)
 * @returns {object|null} santri cocok, atau null
 */
export function findSantriByVa(va, santriList, settings) {
  const clean = String(va || '').replace(/\s+/g, '')
  if (!clean || !Array.isArray(santriList)) return null
  // 1) VA eksplisit tersimpan di santri
  const explicit = santriList.find(
    (s) => s && s.va_bmt && String(s.va_bmt).replace(/\s+/g, '') === clean
  )
  if (explicit) return explicit
  // 2) prefix + NIS/ID
  const prefix = String((settings || {}).bmt_va_prefix || '').replace(/\s+/g, '')
  if (!prefix || !clean.startsWith(prefix)) return null
  const key = clean.slice(prefix.length)
  if (!key) return null
  return santriList.find((s) => santriVaKey(s) === key) || null
}
