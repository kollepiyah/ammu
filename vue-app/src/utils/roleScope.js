// v.21.84.0527: Role scope untuk filter halaman (Rekap/Rapor/Absensi).
// Full filter (pilih lembaga) = admin / super_admin.
// Guru mode (hanya ngaji/sekolah, atau langsung list) = admin_keuangan + guru/user.

export function isFullFilterRole(sesi) {
  if (!sesi) return false
  if (sesi.id === 'admin') return true
  if (['super_admin', 'admin'].includes(sesi.role_sistem)) return true
  // v.21.115.0528: Kepala Lembaga / PJ / Pengasuh juga full filter scope di lembaganya (kyai req)
  if (isKepalaLembaga(sesi)) return true
  return false
}

// v.21.98.0527: cek role super_admin (utk gating CRUD record keuangan).
// v.21.115.0528: drop `sesi.role === 'admin'` — promoted guru ke role_sistem='admin'
// (admin biasa) tidak boleh super power. Only built-in id='admin' atau role_sistem='super_admin'.
export function isSuperAdmin(sesi) {
  if (!sesi) return false
  return sesi.role_sistem === 'super_admin' || sesi.id === 'admin'
}

// v.21.115.0528: cek admin biasa (admin role_sistem, akses everything except master & keuangan)
export function isAdminBiasa(sesi) {
  if (!sesi) return false
  return sesi.role_sistem === 'admin' && sesi.id !== 'admin'
}

// v.21.115.0528: cek admin keuangan (akses fitur keuangan + data guru)
export function isAdminKeuangan(sesi) {
  if (!sesi) return false
  return sesi.role_sistem === 'admin_keuangan'
}

// v.21.110.0527: cek apakah guru/pegawai punya jabatan "Direktur/Supervisor"
// (lewat jabatan atau jabatan_tambahan) — akses menu Data Supervisi.
export function isSupervisor(sesi) {
  if (!sesi) return false
  // Admin & super_admin selalu dapat akses Supervisi (untuk konfigurasi awal/oversight)
  if (isSuperAdmin(sesi)) return true
  const a = String(sesi.jabatan || '').toLowerCase().trim()
  const b = String(sesi.jabatan_tambahan || '').toLowerCase().trim()
  return a.includes('direktur') || a.includes('supervisor') || b.includes('direktur') || b.includes('supervisor')
}

// v.21.110.0527: cek apakah guru/pegawai adalah Kepala/PJ Lembaga
// (untuk dapat melihat catatan supervisi yang ditujukan ke lembaga).
export function isKepalaLembaga(sesi) {
  if (!sesi) return false
  const j = String(sesi.jabatan || '').toLowerCase().trim()
  const jt = String(sesi.jabatan_tambahan || '').toLowerCase().trim()
  return /(^|\s)(kepala|pj|pengasuh)(\s|$)/i.test(j) || /(^|\s)(kepala|pj|pengasuh)(\s|$)/i.test(jt)
}
