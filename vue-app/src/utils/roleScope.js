// v.21.84.0527: Role scope untuk filter halaman (Rekap/Rapor/Absensi).
// Full filter (pilih lembaga) = admin / super_admin.
// Guru mode (hanya ngaji/sekolah, atau langsung list) = admin_keuangan + guru/user.

export function isFullFilterRole(sesi) {
  if (!sesi) return false
  if (sesi.role === 'admin' || sesi.id === 'admin') return true
  if (['super_admin', 'admin'].includes(sesi.role_sistem)) return true
  return false
}
