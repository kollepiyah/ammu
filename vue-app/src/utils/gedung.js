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

// ---- scope (dipakai Fase 3 keuangan + Fase 4 akademik) --------------------
// Kas (= gedung) yang menampung keuangan seorang santri. '' bila belum di-assign.
export function kasForSantri(s) {
  return String((s && s.gedung) || '').trim()
}

// Gedung yang dikelola/ditempati seorang user (sesiAktif). '' bila tak ada.
export function gedungOf(sesi) {
  return String((sesi && sesi.gedung) || '').trim()
}

// Apakah user terikat scope gedung. super_admin / admin built-in (id 'admin') =
// lihat SEMUA → tidak ter-scope. User lain ter-scope HANYA bila punya gedung.
export function isGedungScoped(sesi) {
  if (!sesi) return false
  if (sesi.id === 'admin' || sesi.role_sistem === 'super_admin') return false
  return !!gedungOf(sesi)
}

// Apakah user berhak atas santri ini menurut scope gedung.
// User tak ter-scope (super_admin / tanpa gedung) → true (lihat semua).
export function gedungScopeMatches(sesi, santri) {
  if (!isGedungScoped(sesi)) return true
  return kasForSantri(santri) === gedungOf(sesi)
}
