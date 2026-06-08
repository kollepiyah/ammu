// useRibbonNav — definisi tab + grup + tombol pita (port dari design ammu-data.js),
// dipetakan ke RUTE NYATA app + di-filter RBAC (pakai auth store yang sama dgn useMenus).
// Tombol pita = navigasi router.push (bukan state internal) -> semua view & guard lama dipakai ulang.
//
// item: { type:'large'|'small'|'toggle'|'clock'|'greeting', icon, label, accent?,
//         to?:'/route' | action?:'theme'|'ribbon'|'refresh'|'logout' | modul?:'Judul' , gate? }
// gate: 'admin' | 'keuangan' | 'supervisi' | 'noSantri' | 'superadmin'
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { useRibbonPrefs } from './useRibbonPrefs'

const TABS = [
  {
    id: 'home',
    name: 'Home',
    defaultTo: '/dashboard',
    groups: [
      {
        label: 'Postingan',
        items: [
          { type: 'large', icon: 'edit', label: 'Buat\nPostingan', to: '/posts', accent: true },
          { type: 'large', icon: 'broadcast', label: 'Kelola\nSaluran', to: '/posts' }
        ]
      },
      { label: 'Waktu & Kalender', items: [{ type: 'clock' }] },
      {
        label: 'Akses Akademik',
        items: [
          { type: 'large', icon: 'chart-pie', label: 'Dasbor\nStatistik', to: '/statistik', gate: 'noSantri' },
          { type: 'large', icon: 'calendar', label: 'Kalender\nKegiatan', to: '/kalender' },
          { type: 'small', icon: 'user', label: 'Profil Saya', to: '/profil' },
          { type: 'small', icon: 'clipboard', label: 'Data Supervisi', to: '/supervisi', gate: 'supervisi' },
          { type: 'small', icon: 'users', label: 'Data Santri', to: '/santri', gate: 'noSantri' }
        ]
      },
      {
        label: 'Tampilan',
        items: [
          { type: 'toggle', icon: 'theme', label: 'Tema', action: 'theme' },
          { type: 'toggle', icon: 'ribbon', label: 'Ribbon', action: 'ribbon' },
          { type: 'small', icon: 'refresh', label: 'Muat Ulang', action: 'refresh' }
        ]
      },
      { label: 'Profil & Data', items: [{ type: 'greeting' }] }
    ]
  },
  {
    id: 'pendidikan',
    name: 'Pendidikan',
    defaultTo: '/santri',
    gate: 'noSantri',
    groups: [
      {
        label: 'Data Induk',
        items: [
          { type: 'large', icon: 'users', label: 'Data\nSantri', to: '/santri', accent: true },
          { type: 'large', icon: 'user', label: 'Data\nGuru', to: '/guru', gate: 'admin' },
          { type: 'small', icon: 'user', label: 'Data Staf', modul: 'Data Staf', gate: 'admin' },
          { type: 'small', icon: 'shield', label: 'Asrama', modul: 'Data Asrama', gate: 'admin' }
        ]
      },
      {
        label: 'Akademik',
        items: [
          { type: 'large', icon: 'book', label: 'Kelas &\nMapel', to: '/kelas', gate: 'admin' },
          { type: 'small', icon: 'calendar', label: 'Jadwal Pelajaran', modul: 'Jadwal Pelajaran' },
          { type: 'small', icon: 'trophy', label: 'Nilai / Rapor', to: '/rapor' },
          { type: 'small', icon: 'check', label: 'Absensi', to: '/absensi-santri' }
        ]
      },
      {
        label: 'Kalender',
        items: [
          { type: 'large', icon: 'calendar-days', label: 'Kalender\nPendidikan', to: '/kalender' },
          { type: 'small', icon: 'calendar', label: 'Tahun Ajaran', modul: 'Tahun Ajaran', gate: 'admin' },
          { type: 'small', icon: 'clock', label: 'Semester', modul: 'Pengaturan Semester', gate: 'admin' }
        ]
      },
      {
        label: 'Laporan',
        items: [
          { type: 'large', icon: 'printer', label: 'Cetak\nRapor', to: '/rapor' },
          { type: 'small', icon: 'chart-line', label: 'Rekap Nilai', to: '/rekap-prestasi' },
          { type: 'small', icon: 'download', label: 'Ekspor Data', modul: 'Ekspor Data', gate: 'admin' }
        ]
      }
    ]
  },
  {
    id: 'keuangan',
    name: 'Keuangan',
    defaultTo: '/keuangan',
    gate: 'keuangan',
    groups: [
      {
        label: 'Tagihan & SPP',
        items: [
          { type: 'large', icon: 'file', label: 'Tagihan\nAktif', to: '/tagihan', accent: true },
          { type: 'large', icon: 'edit', label: 'Buat\nTagihan', to: '/tagihan' },
          { type: 'small', icon: 'download', label: 'Pembayaran SPP', to: '/pembayaran' },
          { type: 'small', icon: 'bell', label: 'Verifikasi Bayar', to: '/pembayaran-pending' }
        ]
      },
      {
        label: 'Tabungan',
        items: [
          { type: 'large', icon: 'save', label: 'Tabungan\nSantri', to: '/tabungan' },
          { type: 'small', icon: 'wallet', label: 'Uang Saku', to: '/uang-saku' },
          { type: 'small', icon: 'layers', label: 'POS Santri', to: '/pos-santri' },
          { type: 'small', icon: 'refresh', label: 'Riwayat POS', to: '/pos-riwayat' }
        ]
      },
      {
        label: 'Bisyaroh',
        items: [
          { type: 'large', icon: 'doc', label: 'Slip\nBisyaroh', to: '/bisyaroh' },
          { type: 'small', icon: 'users', label: 'Hutang Piutang', to: '/hutang-piutang' },
          { type: 'small', icon: 'gear', label: 'Pengaturan', to: '/keu-pengaturan' }
        ]
      },
      {
        label: 'Buku & Laporan',
        items: [
          { type: 'large', icon: 'book', label: 'Buku\nInduk', to: '/buku-induk' },
          { type: 'small', icon: 'chart-line', label: 'Laporan Keuangan', to: '/laporan-keuangan' },
          { type: 'small', icon: 'download', label: 'Riwayat Santri', to: '/riwayat-santri' },
          { type: 'small', icon: 'chart-pie', label: 'Dashboard', to: '/keuangan' }
        ]
      }
    ]
  },
  {
    id: 'saluran',
    name: 'Saluran',
    defaultTo: '/posts',
    groups: [
      {
        label: 'Postingan',
        items: [
          { type: 'large', icon: 'edit', label: 'Buat\nPostingan', to: '/posts', accent: true },
          { type: 'large', icon: 'broadcast', label: 'Kelola\nSaluran', to: '/posts' }
        ]
      },
      {
        label: 'Jenis Konten',
        items: [
          { type: 'small', icon: 'megaphone', label: 'Pengumuman', to: '/posts' },
          { type: 'small', icon: 'image', label: 'Dokumentasi', to: '/posts' },
          { type: 'small', icon: 'book', label: 'Kajian', to: '/posts' },
          { type: 'small', icon: 'file', label: 'Dokumen', to: '/posts' }
        ]
      },
      {
        label: 'Kanal',
        items: [
          { type: 'large', icon: 'broadcast', label: 'Ammu\nChannel', to: '/posts' },
          { type: 'small', icon: 'archive', label: 'Arsip', modul: 'Arsip Saluran' },
          { type: 'small', icon: 'users', label: 'Anggota', modul: 'Anggota Saluran' }
        ]
      },
      {
        label: 'Moderasi',
        items: [
          { type: 'small', icon: 'comment', label: 'Komentar', modul: 'Moderasi Komentar', gate: 'admin' },
          { type: 'small', icon: 'bell', label: 'Laporan', modul: 'Laporan Konten', gate: 'admin' },
          { type: 'small', icon: 'shield', label: 'Izin Posting', modul: 'Hak Akses Posting', gate: 'admin' }
        ]
      }
    ]
  },
  {
    id: 'personal',
    name: 'Personal',
    defaultTo: '/profil',
    groups: [
      {
        label: 'Akun',
        items: [
          { type: 'large', icon: 'user', label: 'Profil\nSaya', to: '/profil', accent: true },
          { type: 'small', icon: 'layers', label: 'Personal', to: '/personal', gate: 'noSantri' },
          { type: 'small', icon: 'trophy', label: 'Capaian', to: '/capaian-prestasi' }
        ]
      },
      {
        label: 'Aktivitas',
        items: [
          { type: 'large', icon: 'bell', label: 'Notifikasi', to: '/notifikasi' },
          { type: 'small', icon: 'comment', label: 'Kritik & Saran', to: '/kritik-saran' },
          { type: 'small', icon: 'check', label: 'Tugas Saya', modul: 'Tugas Saya' }
        ]
      },
      {
        label: 'Preferensi',
        items: [
          { type: 'toggle', icon: 'theme', label: 'Tema', action: 'theme' },
          { type: 'toggle', icon: 'ribbon', label: 'Tata Letak', action: 'ribbon' },
          { type: 'small', icon: 'language', label: 'Bahasa', modul: 'Bahasa' }
        ]
      },
      { label: 'Sesi', items: [{ type: 'large', icon: 'logout', label: 'Keluar', action: 'logout' }] }
    ]
  },
  {
    id: 'supervisi',
    name: 'Supervisi',
    defaultTo: '/supervisi',
    gate: 'supervisi',
    groups: [
      {
        label: 'Supervisi',
        items: [
          { type: 'large', icon: 'clipboard', label: 'Data\nSupervisi', to: '/supervisi', accent: true },
          { type: 'large', icon: 'edit', label: 'Buat\nLaporan', to: '/supervisi' }
        ]
      },
      {
        label: 'Evaluasi',
        items: [
          { type: 'small', icon: 'calendar', label: 'Jadwal', modul: 'Jadwal Supervisi' },
          { type: 'small', icon: 'trophy', label: 'Penilaian', to: '/supervisi' },
          { type: 'small', icon: 'comment', label: 'Catatan', to: '/supervisi' }
        ]
      },
      {
        label: 'Analitik',
        items: [
          { type: 'large', icon: 'chart-line', label: 'Statistik\nSupervisi', to: '/statistik' },
          { type: 'small', icon: 'chart-pie', label: 'Distribusi', to: '/statistik' },
          { type: 'small', icon: 'download', label: 'Ekspor', modul: 'Ekspor Supervisi' }
        ]
      }
    ]
  },
  {
    id: 'bantuan',
    name: 'Bantuan',
    defaultTo: '/bantuan',
    groups: [
      {
        label: 'Bantuan',
        items: [
          { type: 'large', icon: 'help', label: 'Pusat\nBantuan', to: '/bantuan', accent: true },
          { type: 'large', icon: 'book', label: 'Panduan\nPengguna', to: '/bantuan' }
        ]
      },
      {
        label: 'Informasi',
        items: [
          { type: 'small', icon: 'info', label: 'Tentang Aplikasi', to: '/bantuan' },
          { type: 'small', icon: 'file', label: 'Catatan Rilis', to: '/bantuan' },
          { type: 'small', icon: 'shield', label: 'Lisensi', to: '/bantuan' }
        ]
      },
      {
        label: 'Kontak',
        items: [
          { type: 'large', icon: 'comment', label: 'Hubungi\nAdmin', to: '/kritik-saran' },
          { type: 'small', icon: 'bell', label: 'Lapor Bug', to: '/kritik-saran' }
        ]
      },
      { label: 'Pembaruan', items: [{ type: 'large', icon: 'refresh', label: 'Cek\nPembaruan', modul: 'Pembaruan Aplikasi' }] }
    ]
  }
]

// Path yang "dimiliki" tiap tab — untuk menurunkan tab aktif dari rute saat ini.
const TAB_PATHS = {
  home: ['/dashboard', '/beranda', '/statistik', '/kalender'],
  pendidikan: [
    '/santri', '/guru', '/kelas', '/rapor', '/absensi-santri', '/absensi-guru',
    '/naik-kelas', '/rekap-prestasi', '/rekap-diniyah', '/input-bulanan',
    '/master-data', '/psb', '/kegiatan-pesantren', '/statistik', '/kalender'
  ],
  keuangan: [
    '/keuangan', '/tagihan', '/pembayaran', '/pembayaran-pending', '/tabungan',
    '/uang-saku', '/bisyaroh', '/buku-induk', '/laporan-keuangan', '/hutang-piutang',
    '/keu-pengaturan', '/pos-santri', '/pos-riwayat', '/riwayat-santri'
  ],
  saluran: ['/posts'],
  personal: ['/personal', '/profil', '/notifikasi', '/kritik-saran', '/capaian-prestasi'],
  supervisi: ['/supervisi', '/statistik'],
  bantuan: ['/bantuan']
}

function pathOwnedBy(tabId, path) {
  const arr = TAB_PATHS[tabId] || []
  return arr.some((p) => path === p || path.startsWith(p + '/'))
}
function primaryTabFor(path) {
  for (const t of TABS) {
    if (pathOwnedBy(t.id, path)) return t.id
  }
  return null
}

export function useRibbonNav() {
  const route = useRoute()
  const router = useRouter()
  const auth = useAuthStore()
  const ui = useUiStore()
  const prefs = useRibbonPrefs()

  function passGate(gate) {
    if (!gate) return true
    const role = auth.sesiAktif?.role
    const roleSistem = auth.sesiAktif?.role_sistem
    if (gate === 'admin') return auth.isAdmin
    if (gate === 'keuangan') return auth.cekHakAkses('akses_keuangan')
    if (gate === 'supervisi') return auth.cekHakAkses('akses_supervisi')
    if (gate === 'noSantri') return role !== 'santri'
    if (gate === 'superadmin') return roleSistem === 'super_admin'
    return true
  }
  function itemVisible(it) {
    if (it.type === 'clock' || it.type === 'greeting' || it.type === 'toggle') return true
    return passGate(it.gate)
  }

  const tabs = computed(() => {
    if (!auth.sesiAktif?.role) return []
    return TABS.filter((t) => passGate(t.gate))
      .map((t) => ({
        ...t,
        groups: t.groups
          .map((g) => ({ ...g, items: g.items.filter(itemVisible) }))
          .filter((g) => g.items.length > 0)
      }))
      .filter((t) => t.groups.length > 0)
  })

  // Tab aktif: tetap di tab sekarang kalau rute masih "dimiliki"-nya; selain itu ikut rute.
  const activeTab = ref('home')
  watch(
    () => route.path,
    (p) => {
      if (pathOwnedBy(activeTab.value, p)) return
      const t = primaryTabFor(p)
      if (t) activeTab.value = t
    },
    { immediate: true }
  )
  // kalau tab aktif hasil derivasi ternyata tak terlihat (RBAC), jatuhkan ke tab pertama yg ada
  const activeTabId = computed(() => {
    const list = tabs.value
    if (list.some((t) => t.id === activeTab.value)) return activeTab.value
    return list[0]?.id || 'home'
  })
  const activeTabObj = computed(() => tabs.value.find((t) => t.id === activeTabId.value) || null)

  function selectTab(id) {
    activeTab.value = id
    const t = TABS.find((x) => x.id === id)
    if (t?.defaultTo && t.defaultTo !== route.path) router.push(t.defaultTo)
  }

  const refreshNonce = ref(0)
  async function onItem(item, tabId) {
    if (tabId) activeTab.value = tabId
    if (item.action === 'theme') {
      ui.toggleDark()
      try {
        window.electronAPI?.setTheme?.(ui.isDark)
      } catch (e) {
        /* ignore */
      }
      return
    }
    if (item.action === 'ribbon') return prefs.toggleDensity()
    if (item.action === 'refresh') {
      refreshNonce.value++
      return
    }
    if (item.action === 'logout') {
      try {
        await auth.logout()
      } catch (e) {
        /* ignore */
      }
      router.push('/login')
      return
    }
    if (item.modul) {
      router.push({ name: 'ribbon-modul', params: { judul: item.modul } })
      return
    }
    if (item.to) {
      if (item.to !== route.path) router.push(item.to)
      else refreshNonce.value++ // klik view yang sedang aktif -> muat ulang
    }
  }

  return {
    tabs,
    activeTabId,
    activeTabObj,
    selectTab,
    onItem,
    refreshNonce,
    density: prefs.density
  }
}
