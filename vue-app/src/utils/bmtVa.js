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
