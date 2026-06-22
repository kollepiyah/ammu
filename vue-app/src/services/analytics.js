// Analitik — migrasi Supabase: jembatan BigQuery (Cloud Function analyticsQuery)
//   DINONAKTIFKAN. Sumber data kini Supabase Postgres (stream BigQuery firestore_export
//   = data Firestore lama/stale), dan sesi tak lagi Firebase Auth (token tak tersedia).
//   Port laporan agregat ke SQL Supabase langsung = tugas terpisah.
//   Sengaja TANPA import firebase/auth (F8: copot Firebase dari bundle).

/**
 * @deprecated Migrasi Supabase — laporan analitik (BigQuery) belum diport.
 * Lempar error berkode supaya LaporanView menampilkan pesan, bukan diam-kosong.
 */
// eslint-disable-next-line no-unused-vars
export async function analyticsQuery(report, params = {}) {
  const e = new Error('Laporan analitik sedang dimigrasikan ke Supabase (belum tersedia).')
  e.code = 'analytics/migrating'
  throw e
}
