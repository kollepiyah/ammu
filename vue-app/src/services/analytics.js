// v.102 A3: client analitik — panggil Cloud Function analyticsQuery (jembatan BigQuery).
//   App TAK akses BigQuery langsung. Token Firebase Auth dikirim; server cek role admin/super.
import { getAuth } from 'firebase/auth'

const FUNCTIONS_BASE = 'https://us-central1-portal-mambaul-ulum.cloudfunctions.net'

/**
 * Ambil hasil laporan analitik dari BigQuery (via Cloud Function).
 * @param {string} report nama laporan whitelist (mis. 'santri_per_lembaga')
 * @param {object} params filter opsional (mis. { year: 2026 })
 * @returns {Promise<Array>} array baris hasil query
 */
export async function analyticsQuery(report, params = {}) {
  const u = getAuth().currentUser
  if (!u) throw new Error('Sesi tidak ditemukan. Login ulang.')
  const token = await u.getIdToken()
  const qs = new URLSearchParams({ report, ...params }).toString()
  const resp = await fetch(`${FUNCTIONS_BASE}/analyticsQuery?${qs}`, {
    headers: { Authorization: 'Bearer ' + token }
  })
  let j = {}
  try {
    j = await resp.json()
  } catch (e) {
    /* non-json */
  }
  if (!resp.ok || !j.ok) {
    const err = new Error(j.error || `Gagal memuat laporan (${resp.status})`)
    err.code = j.error
    throw err
  }
  return j.rows || []
}
