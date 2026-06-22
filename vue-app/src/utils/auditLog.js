// v.21.104.0527 — Audit log helper utk operasi sensitif (bulk delete keuangan).
// Tulis ke tabel 'audit_log' (Supabase via adapter db.js).
//
// Penggunaan:
//   await writeAuditLog({
//     operator: 'Admin Kyai',
//     action: 'bulk_delete',
//     target: 'keuangan_buku_induk',
//     ids: ['bi_123', 'bi_456'],
//     detail: { trx_ids: [...] }   // opsional, free-form
//   })
import { setOne, serverTimestamp } from '@/services/db'

export async function writeAuditLog({
  operator = 'unknown',
  action = '',
  target = '',
  ids = [],
  detail = null
} = {}) {
  try {
    const id = `audit_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
    const payload = {
      id,
      operator: String(operator || '-'),
      action: String(action || '-'),
      target: String(target || '-'),
      ids_count: Array.isArray(ids) ? ids.length : 0,
      ids: Array.isArray(ids) ? ids.slice(0, 200).map(String) : [],
      timestamp: serverTimestamp(),
      detail: detail || null
    }
    await setOne('audit_log', id, payload)
    return true
  } catch (e) {
    // Jangan ganggu UX kalau audit log gagal — cuma log warning
    console.warn('[auditLog] gagal:', e?.message || e)
    return false
  }
}
