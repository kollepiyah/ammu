// Analitik — sumber data Supabase Postgres via RPC `analytics_query` (F9).
//   Menggantikan jembatan BigQuery (Cloud Function analyticsQuery) yang dicopot di F8.
//   RPC = SECURITY DEFINER + gate auth_can_manage() (Laporan admin/super_admin only);
//   balikan jsonb array dgn bentuk row identik konsumen LaporanView.vue.
import { supabase } from '@/services/supabase'

/**
 * Jalankan satu laporan agregat di server (Postgres RPC).
 * @param {string} report  kunci laporan (mis. 'santri_per_lembaga', 'keuangan_bulanan')
 * @param {object} params  parameter opsional (mis. { year: 2026 })
 * @returns {Promise<Array<object>>} array baris (kosong bila tak ada data)
 */
export async function analyticsQuery(report, params = {}) {
  const { data, error } = await supabase.rpc('analytics_query', { report, params })
  if (error) {
    // Pertahankan kode supaya LaporanView bisa bedakan forbidden vs error lain bila perlu.
    const e = new Error(error.message || 'Gagal memuat laporan analitik.')
    e.code = error.code || 'analytics/error'
    throw e
  }
  return Array.isArray(data) ? data : []
}
