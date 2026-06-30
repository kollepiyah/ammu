// gedung.js — dimensi "Gedung" (penataan administrasi: scope keuangan + akademik).
// SUMBER TUNGGAL daftar gedung default + helper. Field santri `gedung` disimpan di
// kolom ekor jsonb `data` (TANPA migration), diisi MANUAL via form / template impor.
// Lihat memori project_keuangan_gedung. (v.111)

// Seed default — dipakai bila settings.gedung_list belum diisi admin (Master Data > Gedung).
export const DEFAULT_GEDUNG = ['Gedung TPQ Pagi', 'Gedung Induk']

// Daftar gedung aktif dari settings (fallback ke DEFAULT_GEDUNG).
export function gedungList(settings) {
  const arr = settings && settings.gedung_list
  return Array.isArray(arr) && arr.length ? arr.filter(Boolean) : DEFAULT_GEDUNG.slice()
}
