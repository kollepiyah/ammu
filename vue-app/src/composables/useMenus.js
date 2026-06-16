// Menu navigation config — match legacy sidebar (admin / guru / santri).
// v.65.4.0526: trim ke list legacy + PSB tetap (kyai eksplisit minta keep).
// Removed (vs sebelumnya): Data Lembaga, Data Kelas, Kelola Field, Absensi Santri (admin),
// Mading/Pengumuman, Audit Log → digabung ke "Master Data" entry atau dihapus dari sidebar.
// Routes-nya tetap accessible via deep link.
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'

const ALL_MENUS = [
  // GROUP: MENU UTAMA
  // v.20.55.0526: featureFlag → hide kalau settings.fiturX=false
  { group: 'Menu', name: 'Beranda', path: '/dashboard', icon: 'fa-home', roles: ['admin', 'guru', 'santri'], available: true, featureFlag: 'fiturBeranda' },
  // v.86.0526: Dashboard Statistik HANYA admin/guru. Santri: statistik prestasi pribadi digabung ke Capaian Prestasi (kyai req).
  { group: 'Menu', name: 'Dashboard Statistik', path: '/statistik', icon: 'fa-chart-pie', roles: ['admin', 'guru'], available: true },
  // v.102: Laporan/Analitik (BigQuery) — super_admin + admin biasa saja (bukan admin_keuangan/guru/santri)
  { group: 'Menu', name: 'Laporan', path: '/laporan', icon: 'fa-chart-bar', roles: ['admin'], roleSistem: ['super_admin', 'admin'], available: true },
  { group: 'Menu', name: 'Kalender Kegiatan', path: '/kalender', icon: 'fa-calendar-alt', roles: ['admin', 'guru', 'santri'], available: true, featureFlag: 'fiturKalender' },
  // v.20.14.0526: Capaian Prestasi santri — pindah ke group Menu (di bawah Kalender, tanpa label Pendidikan)
  { group: 'Menu', name: 'Capaian Prestasi', path: '/capaian-prestasi', icon: 'fa-trophy', roles: ['santri'], available: true },
  { group: 'Menu', name: 'Profil', path: '/profil', icon: 'fa-user-circle', roles: ['admin', 'guru', 'santri'], available: true },
  // v.20.18.0526: Personal page admin/superadmin/admin_keuangan — statistik kehadiran + slip bisyaroh personal
  { group: 'Menu', name: 'Personal', path: '/personal', icon: 'fa-id-badge', roles: ['admin', 'guru'], available: true },
  // v.21.110.0527: Data Supervisi (Direktur/Supervisor + admin)
  { group: 'Menu', name: 'Data Supervisi', path: '/supervisi', icon: 'fa-clipboard-check', roles: ['admin', 'guru'], available: true, perm: 'akses_supervisi' },

  // GROUP: PENDIDIKAN
  // ADMIN/GURU menu
  { group: 'Pendidikan', name: 'Data Santri', path: '/santri', icon: 'fa-users', roles: ['admin', 'guru'], available: true },
  { group: 'Pendidikan', name: 'Data Guru', path: '/guru', icon: 'fa-chalkboard-teacher', roles: ['admin'], available: true },
  { group: 'Pendidikan', name: 'Kenaikan/Mutasi', path: '/naik-kelas', icon: 'fa-level-up-alt', roles: ['admin', 'guru'], available: true },
  // v.100: Tes Kenaikan Qiraati — guru ajukan tes santri ke Kepala/PJ; lulus = siap naik. featureFlag default ON.
  { group: 'Pendidikan', name: 'Tes Kenaikan', path: '/tes-kenaikan', icon: 'fa-clipboard-check', roles: ['admin', 'guru'], available: true, featureFlag: 'fiturTesKenaikan' },
  { group: 'Pendidikan', name: 'Rekap Prestasi', path: '/rekap-prestasi', icon: 'fa-book-open', roles: ['admin', 'guru'], available: true },
  { group: 'Pendidikan', name: 'Rapor Semester', path: '/rapor', icon: 'fa-graduation-cap', roles: ['admin', 'guru'], available: true },
  // v.20.5.0526: Absensi Guru — HANYA admin (kyai req — guru jangan lihat absensi guru, itu admin-only)
  { group: 'Pendidikan', name: 'Absensi Guru', path: '/absensi-guru', icon: 'fa-fingerprint', roles: ['admin'], available: true },
  // v.20.72.0526: Absensi Bulanan Santri (general, beyond mukim)
  { group: 'Pendidikan', name: 'Absensi Santri', path: '/absensi-santri', icon: 'fa-clipboard-user', roles: ['admin', 'guru'], available: true },
  { group: 'Pendidikan', name: 'Kegiatan Pesantren', path: '/kegiatan-pesantren', icon: 'fa-calendar-check', roles: ['admin'], available: true },
  // v.21.19.0526: Master Data HANYA super_admin (kyai req — admin/kepala lembaga tidak boleh)
  { group: 'Pendidikan', name: 'Master Data', path: '/master-data', icon: 'fa-database', roles: ['admin'], roleSistem: ['super_admin'], available: true },
  { group: 'Pendidikan', name: 'PSB', path: '/psb', icon: 'fa-clipboard-list', roles: ['admin'], available: true },

  // GROUP: KEUANGAN (admin + admin_keuangan + akses santri/guru ke menu personal)
  { group: 'Keuangan', name: 'Dashboard Keuangan', path: '/keuangan', icon: 'fa-chart-line', roles: ['admin'], available: true, perm: 'akses_keuangan' },
  { group: 'Keuangan', name: 'POS Santri', path: '/pos-santri', icon: 'fa-cash-register', roles: ['admin'], available: true, perm: 'akses_keuangan' },
  // v.20.18.0526: Admin = "Bisyaroh Guru/Pegawai" (mengatur), guru = "Slip Bisyaroh" (lihat slip-nya). Per-role label split.
  // v.21.115.0528: Bisyaroh kelola butuh akses_keuangan (super_admin / admin_keuangan), bukan admin biasa.
  { group: 'Keuangan', name: 'Bisyaroh Guru/Pegawai', path: '/bisyaroh', icon: 'fa-hand-holding-usd', roles: ['admin'], available: true, perm: 'akses_keuangan' },
  { group: 'Keuangan', name: 'Slip Bisyaroh', path: '/bisyaroh', icon: 'fa-hand-holding-usd', roles: ['guru'], available: true },
  // v.87.0526: Menu "Pembayaran" santri DIHAPUS — digabung jadi 1 pintu lewat "Tagihan Saya"
  // (tombol Bayar per-tagihan + tombol Setoran Lain di TagihanView). Route /pembayaran tetap hidup via deep-link.
  // v.20.12.0526: santri-only nama match legacy (suffix "Saya")
  { group: 'Keuangan', name: 'Tabungan Saya', path: '/tabungan', icon: 'fa-wallet', roles: ['santri'], available: true },
  // v.95.0626: Uang Saku santri ma'had (mukim) — konsep = tabungan, koleksi terpisah
  { group: 'Keuangan', name: 'Uang Saku Saya', path: '/uang-saku', icon: 'fa-coins', roles: ['santri'], available: true, santriMukimOnly: true },
  // v.20.14.0526: Tunggakan & Riwayat digabung jadi 1 menu (sudah ada tab filter Belum Lunas / Lunas di dalam page)
  // v.87.0526: rename "Tagihan Saya" -> "Tagihan & Pembayaran" (1 pintu: lihat tagihan + bayar + riwayat).
  { group: 'Keuangan', name: 'Tagihan & Pembayaran', path: '/tagihan', icon: 'fa-receipt', roles: ['santri'], available: true },
  // v.20.12.0526: Tabungan untuk admin (label tanpa "Saya")
  // v.21.115.0528: Tabungan admin butuh akses_keuangan (super_admin / admin_keuangan), bukan admin biasa.
  { group: 'Keuangan', name: 'Tabungan', path: '/tabungan', icon: 'fa-wallet', roles: ['admin'], available: true, perm: 'akses_keuangan' },
  // v.95.0626: Uang Saku santri ma'had (mukim) — kelola seperti Tabungan, koleksi keuangan_uang_saku_santri
  { group: 'Keuangan', name: 'Uang Saku', path: '/uang-saku', icon: 'fa-coins', roles: ['admin'], available: true, perm: 'akses_keuangan' },
  { group: 'Keuangan', name: 'Buku Induk', path: '/buku-induk', icon: 'fa-book', roles: ['admin'], available: true, perm: 'akses_keuangan' },
  // v.86.0526: Verifikasi bukti transfer wali (superadmin/admin_keuangan)
  { group: 'Keuangan', name: 'Verifikasi Pembayaran', path: '/pembayaran-pending', icon: 'fa-clipboard-check', roles: ['admin'], available: true, perm: 'akses_keuangan' },
  // v.21.101.0527: Ekspor riwayat per santri (tagihan+pembayaran+tabungan 1 tahun)
  { group: 'Keuangan', name: 'Riwayat Santri', path: '/riwayat-santri', icon: 'fa-file-export', roles: ['admin'], available: true, perm: 'akses_keuangan' },
  { group: 'Keuangan', name: 'Hutang Piutang', path: '/hutang-piutang', icon: 'fa-handshake', roles: ['admin'], available: true, perm: 'akses_keuangan' },
  { group: 'Keuangan', name: 'Pengaturan Keuangan', path: '/keu-pengaturan', icon: 'fa-sliders-h', roles: ['admin'], available: true, perm: 'akses_keuangan' },
  // v.69.0526: "Laporan & Chart" digabung ke Dashboard Keuangan (akses via link di dalam page Dashboard Keuangan). Tidak perlu menu sidebar terpisah.

  // GROUP: KOMUNIKASI (semua role)
  // v.65.4: Mading tetap (kyai minta — supaya tambah postingan tidak langsung dari beranda)
  { group: 'Komunikasi', name: 'Ammu Channel', path: '/posts', icon: 'fa-bullhorn', roles: ['admin', 'guru', 'santri'], available: true },
  { group: 'Komunikasi', name: 'Kritik & Saran', path: '/kritik-saran', icon: 'fa-comment-dots', roles: ['admin', 'guru', 'santri'], available: true, featureFlag: 'fiturKritikSaran' },

  // GROUP: SISTEM (admin only)
  { group: 'Sistem', name: 'Pengaturan Sistem', path: '/pengaturan-web', icon: 'fa-cog', roles: ['admin'], available: true },

  // GROUP: BANTUAN (semua role) — v.98.0626: Pusat Bantuan kini di web/Android (sebelumnya hanya pita Bantuan di Electron)
  { group: 'Bantuan', name: 'Pusat Bantuan', path: '/bantuan', icon: 'fa-circle-question', roles: ['admin', 'guru', 'santri'], available: true }
]

/**
 * useMenus() — return computed menus filtered by current user's role + permissions.
 * Grouped by .group field.
 */
export function useMenus() {
  const auth = useAuthStore()
  const settings = useSettingsStore()

  const menus = computed(() => {
    const role = auth.sesiAktif?.role
    const roleSistem = auth.sesiAktif?.role_sistem || 'user'
    if (!role) return []
    const s = settings.settings || {}
    return ALL_MENUS.filter((m) => {
      // v.95.0626 (kyai req): admin_keuangan = akses DATA setara guru (Data Santri + kelas, Rekap,
      // Rapor, Absensi Santri, dll) + SEMUA menu Keuangan; sembunyikan menu admin-only non-keuangan
      // (Data Guru, Absensi Guru, Kegiatan Pesantren, PSB, Master Data).
      if (roleSistem === 'admin_keuangan') {
        const isKeuangan = m.perm === 'akses_keuangan'
        const guruLevel = m.roles.includes('guru')
        if (!isKeuangan && !guruLevel) return false
        if (m.perm && !auth.cekHakAkses(m.perm)) return false
        if (m.roleSistem && !m.roleSistem.includes(roleSistem)) return false
        if (m.featureFlag && s[m.featureFlag] === false) return false
        return true
      }
      if (!m.roles.includes(role)) return false
      // v.101: Uang Saku santri HANYA untuk ma'had (mukim) — sembunyikan dari santri non-mukim
      if (m.santriMukimOnly && !auth.sesiAktif?.is_mukim) return false
      // v.21.19.0526: roleSistem gate — kalau menu set roleSistem array, user.role_sistem harus match
      if (m.roleSistem && !m.roleSistem.includes(roleSistem)) return false
      if (m.perm && !auth.cekHakAkses(m.perm)) return false
      if (m.featureFlag && s[m.featureFlag] === false) return false
      return true
    })
  })

  const groupedMenus = computed(() => {
    const groups = {}
    for (const m of menus.value) {
      if (!groups[m.group]) groups[m.group] = []
      groups[m.group].push(m)
    }
    return groups
  })

  return { menus, groupedMenus }
}
