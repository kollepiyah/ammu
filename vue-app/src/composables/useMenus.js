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
  // v.21.19.0526: Dashboard Statistik tersedia untuk semua role — santri lihat statistik prestasinya, guru lihat statistik kelasnya, admin full
  { group: 'Menu', name: 'Dashboard Statistik', path: '/statistik', icon: 'fa-chart-pie', roles: ['admin', 'guru', 'santri'], available: true },
  { group: 'Menu', name: 'Kalender Kegiatan', path: '/kalender', icon: 'fa-calendar-alt', roles: ['admin', 'guru', 'santri'], available: true, featureFlag: 'fiturKalender' },
  // v.20.14.0526: Capaian Prestasi santri — pindah ke group Menu (di bawah Kalender, tanpa label Pendidikan)
  { group: 'Menu', name: 'Capaian Prestasi', path: '/capaian-prestasi', icon: 'fa-trophy', roles: ['santri'], available: true },
  { group: 'Menu', name: 'Profil', path: '/profil', icon: 'fa-user-circle', roles: ['admin', 'guru', 'santri'], available: true },
  // v.20.18.0526: Personal page admin/superadmin/admin_keuangan — statistik kehadiran + slip bisyaroh personal
  { group: 'Menu', name: 'Personal', path: '/personal', icon: 'fa-id-badge', roles: ['admin'], available: true },

  // GROUP: PENDIDIKAN
  // ADMIN/GURU menu
  { group: 'Pendidikan', name: 'Data Santri', path: '/santri', icon: 'fa-users', roles: ['admin', 'guru'], available: true },
  { group: 'Pendidikan', name: 'Data Guru', path: '/guru', icon: 'fa-chalkboard-teacher', roles: ['admin'], available: true },
  { group: 'Pendidikan', name: 'Kenaikan/Mutasi', path: '/naik-kelas', icon: 'fa-level-up-alt', roles: ['admin', 'guru'], available: true },
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
  { group: 'Keuangan', name: 'Bisyaroh Guru/Pegawai', path: '/bisyaroh', icon: 'fa-hand-holding-usd', roles: ['admin'], available: true },
  { group: 'Keuangan', name: 'Slip Bisyaroh', path: '/bisyaroh', icon: 'fa-hand-holding-usd', roles: ['guru'], available: true },
  // v.20.14.0526: Pembayaran PALING ATAS di group Keuangan santri (kyai req)
  { group: 'Keuangan', name: 'Pembayaran', path: '/pembayaran', icon: 'fa-credit-card', roles: ['santri'], available: true },
  // v.20.12.0526: santri-only nama match legacy (suffix "Saya")
  { group: 'Keuangan', name: 'Tabungan Saya', path: '/tabungan', icon: 'fa-piggy-bank', roles: ['santri'], available: true },
  // v.20.14.0526: Tunggakan & Riwayat digabung jadi 1 menu (sudah ada tab filter Belum Lunas / Lunas di dalam page)
  { group: 'Keuangan', name: 'Tagihan Saya', path: '/tagihan', icon: 'fa-receipt', roles: ['santri'], available: true },
  // v.20.12.0526: Tabungan untuk admin (label tanpa "Saya")
  { group: 'Keuangan', name: 'Tabungan', path: '/tabungan', icon: 'fa-piggy-bank', roles: ['admin'], available: true },
  { group: 'Keuangan', name: 'Buku Induk', path: '/buku-induk', icon: 'fa-book', roles: ['admin'], available: true, perm: 'akses_keuangan' },
  { group: 'Keuangan', name: 'Hutang Piutang', path: '/hutang-piutang', icon: 'fa-handshake', roles: ['admin'], available: true, perm: 'akses_keuangan' },
  { group: 'Keuangan', name: 'Pengaturan Keuangan', path: '/keu-pengaturan', icon: 'fa-sliders-h', roles: ['admin'], available: true, perm: 'akses_keuangan' },
  // v.69.0526: "Laporan & Chart" digabung ke Dashboard Keuangan (akses via link di dalam page Dashboard Keuangan). Tidak perlu menu sidebar terpisah.

  // GROUP: KOMUNIKASI (semua role)
  // v.65.4: Mading tetap (kyai minta — supaya tambah postingan tidak langsung dari beranda)
  { group: 'Komunikasi', name: 'Ammu Channel', path: '/posts', icon: 'fa-bullhorn', roles: ['admin', 'guru', 'santri'], available: true },
  { group: 'Komunikasi', name: 'Kritik & Saran', path: '/kritik-saran', icon: 'fa-comment-dots', roles: ['admin', 'guru', 'santri'], available: true, featureFlag: 'fiturKritikSaran' },

  // GROUP: SISTEM (admin only)
  { group: 'Sistem', name: 'Pengaturan Sistem', path: '/pengaturan-web', icon: 'fa-cog', roles: ['admin'], available: true }
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
      if (!m.roles.includes(role)) return false
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
