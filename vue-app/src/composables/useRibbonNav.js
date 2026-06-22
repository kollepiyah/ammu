// useRibbonNav — definisi tab + grup + tombol pita, dipetakan ke RUTE NYATA + filter RBAC.
// Prinsip: TIDAK ada tombol placeholder/dobel/mati. Setiap tombol -> rute nyata, aksi nyata,
// atau halaman fitur yang memang dibangun. Aksi per-halaman (Cetak/Ekspor/Tambah) ada di grup
// kontekstual "Aksi Halaman" (lihat useRibbonContext), bukan di sini.
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { useRibbonPrefs } from './useRibbonPrefs'
import { useUpdater } from './useUpdater'
import { useToast } from './useToast'

const TABS = [
  {
    id: 'home',
    name: 'Home',
    defaultTo: '/beranda',
    groups: [
      {
        label: 'Postingan',
        items: [{ type: 'large', icon: 'broadcast', label: 'Ammu\nChannel', to: '/posts', accent: true }]
      },
      { label: 'Waktu & Kalender', items: [{ type: 'clock' }] },
      {
        label: 'Akses Akademik',
        items: [
          { type: 'large', icon: 'chart-pie', label: 'Dasbor\nStatistik', to: '/statistik', gate: 'noSantri' },
          { type: 'large', icon: 'calendar', label: 'Kalender\nKegiatan', to: '/kalender' },
          { type: 'small', icon: 'user', label: 'Profil Saya', to: '/profil' },
          { type: 'small', icon: 'clipboard', label: 'Data Supervisi', to: '/supervisi', gate: 'supervisi' },
          { type: 'small', icon: 'users', label: 'Data Santri', to: '/santri?kelola=1', gate: 'noSantri' }
        ]
      },
      {
        label: 'Tampilan',
        items: [
          { type: 'toggle', icon: 'theme', label: 'Tema', action: 'theme' },
          { type: 'toggle', icon: 'ribbon', label: 'Ribbon', action: 'ribbon' },
          { type: 'small', icon: 'refresh', label: 'Muat Ulang', action: 'refresh' }
        ]
      }
    ]
  },
  {
    id: 'pendidikan',
    name: 'Pendidikan',
    defaultTo: '/santri?kelola=1',
    gate: 'noSantri',
    groups: [
      {
        label: 'Data Induk',
        items: [
          { type: 'large', icon: 'users', label: 'Data\nSantri', to: '/santri?kelola=1', accent: true },
          { type: 'large', icon: 'user', label: 'Data\nGuru', to: '/guru?kelola=1&tipe=guru', gate: 'admin' },
          { type: 'small', icon: 'user', label: 'Data Pegawai', to: '/guru?kelola=1&tipe=pegawai', gate: 'admin' },
          { type: 'small', icon: 'mosque', label: "Data Ma'had", to: '/santri?kelola=1&tempat=mukim', gate: 'admin' }
        ]
      },
      {
        label: 'Akademik',
        items: [
          { type: 'large', icon: 'users', label: 'Kelas\n(Guru-Santri)', to: '/kelas-guru', gate: 'admin' },
          { type: 'small', icon: 'book', label: 'Mapel', to: '/mapel-lembaga', gate: 'admin' },
          { type: 'small', icon: 'trophy', label: 'Nilai / Rapor', to: '/rapor' },
          { type: 'small', icon: 'check', label: 'Absensi', to: '/absensi-santri' },
          // v.100 Batch14: Absensi Guru (admin-only) sebelumnya yatim di Electron — ada di menu web, tak ada tombol pita
          { type: 'small', icon: 'clipboard', label: 'Absensi Guru', to: '/absensi-guru', gate: 'admin' }
        ]
      },
      {
        label: 'Lembaga & Kenaikan',
        items: [
          { type: 'large', icon: 'mosque', label: 'Master\nLembaga', to: '/master-data?tab=lembaga', gate: 'superadmin' },
          { type: 'large', icon: 'chart-line', label: 'Kenaikan\n/ Mutasi', to: '/naik-kelas' },
          { type: 'small', icon: 'calendar', label: 'Tahun Ajaran', to: '/master-data?tab=tp', gate: 'superadmin' },
          { type: 'small', icon: 'clock', label: 'Semester', to: '/master-data?tab=tp', gate: 'superadmin' },
          // v.100 Batch14: Audit Data (Kesehatan Data/Migrate/Gabung/Generate NIS) sebelumnya yatim di Electron — tab-bar disembunyikan (T22), tak ada tombol pita
          { type: 'small', icon: 'shield', label: 'Audit Data', to: '/master-data?tab=audit', gate: 'superadmin' }
        ]
      },
      {
        label: 'Laporan',
        items: [
          { type: 'large', icon: 'printer', label: 'Cetak\nRapor', to: '/rapor' },
          { type: 'small', icon: 'calendar-days', label: 'Kalender', to: '/kalender' },
          { type: 'small', icon: 'chart-line', label: 'Rekap Nilai', to: '/rekap-prestasi' },
          // v.100 Batch16: Kegiatan Pesantren (agenda pondok) — sebelumnya hanya via Pengaturan Desktop, kini tombol pita langsung
          { type: 'small', icon: 'megaphone', label: 'Kegiatan Pesantren', to: '/kegiatan-pesantren', gate: 'admin' }
        ]
      }
    ]
  },
  {
    id: 'keuangan',
    name: 'Keuangan',
    defaultTo: '/keuangan-desktop',
    gate: 'keuangan',
    groups: [
      {
        label: 'Tagihan & POS',
        items: [
          { type: 'large', icon: 'layers', label: 'POS\nSantri', to: '/pos-santri', accent: true },
          { type: 'large', icon: 'file', label: 'Tagihan\nAktif', to: '/tagihan' },
          // T6: Buat Tagihan → halaman Generate Tagihan Khusus (modal auto-buka via ?gen=1)
          { type: 'small', icon: 'edit', label: 'Buat Tagihan', to: '/keu-pengaturan?section=tagihan&gen=1' },
          { type: 'small', icon: 'bell', label: 'Verifikasi Bayar', to: '/pembayaran-pending' }
        ]
      },
      {
        label: 'Tabungan',
        items: [
          { type: 'large', icon: 'save', label: 'Tabungan\nSantri', to: '/tabungan' },
          { type: 'small', icon: 'wallet', label: 'Uang Saku', to: '/uang-saku' },
          { type: 'small', icon: 'refresh', label: 'Riwayat POS', to: '/pos-riwayat' }
        ]
      },
      {
        label: 'Bisyaroh',
        items: [
          { type: 'large', icon: 'doc', label: 'Slip\nBisyaroh', to: '/bisyaroh' },
          { type: 'small', icon: 'users', label: 'Hutang Piutang', to: '/hutang-piutang' },
          // T7: Pengaturan Bisyaroh → halaman fokus bisyaroh guru/pegawai
          { type: 'small', icon: 'gear', label: 'Pengaturan Bisyaroh', to: '/keu-pengaturan?section=bisyaroh' }
        ]
      },
      {
        label: 'Buku & Laporan',
        items: [
          { type: 'large', icon: 'book', label: 'Buku\nInduk', to: '/buku-induk' },
          { type: 'small', icon: 'chart-line', label: 'Laporan', to: '/laporan-keuangan' },
          { type: 'small', icon: 'download', label: 'Riwayat Santri', to: '/riwayat-santri' }
        ]
      },
      {
        // T14: pengaturan keuangan dipecah jadi tombol terpisah (bukan 1 halaman menyeluruh)
        label: 'Pengaturan',
        items: [
          { type: 'large', icon: 'gear', label: 'Pengaturan\nKeuangan', to: '/keu-pengaturan' },
          // T8: Pengaturan Syahriyah santri → halaman fokus
          { type: 'small', icon: 'file', label: 'Syahriyah Santri', to: '/keu-pengaturan?section=syahriyah' },
          { type: 'small', icon: 'printer', label: 'Tagihan & Struk', to: '/keu-pengaturan?section=tagihan' }
        ]
      }
    ]
  },
  {
    // T16: tab PSB (Pendaftaran Santri Baru) — Electron pita
    id: 'psb',
    name: 'PSB',
    defaultTo: '/psb',
    gate: 'admin',
    groups: [
      {
        label: 'Pendaftaran',
        items: [
          { type: 'large', icon: 'clipboard', label: 'Riwayat\nPendaftaran', to: '/psb?section=riwayat', accent: true },
          { type: 'small', icon: 'send', label: 'Pratinjau Form', to: '/psb-form' }
        ]
      },
      {
        label: 'Berkas & Info',
        items: [
          { type: 'large', icon: 'file', label: 'Upload\nSyarat', to: '/psb?section=syarat' },
          { type: 'large', icon: 'wallet', label: 'Info\nPembayaran', to: '/psb?section=pembayaran' }
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
        label: 'Ammu Channel',
        items: [
          { type: 'large', icon: 'broadcast', label: 'Buka\nChannel', to: '/posts', accent: true },
          { type: 'large', icon: 'edit', label: 'Buat\nPostingan', to: '/posts' }
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
          { type: 'small', icon: 'chart-pie', label: 'Statistik Kelas', to: '/statistik', gate: 'noSantri' }
        ]
      },
      {
        label: 'Aktivitas',
        items: [
          { type: 'large', icon: 'bell', label: 'Notifikasi', to: '/notifikasi' },
          { type: 'small', icon: 'comment', label: 'Kritik & Saran', to: '/kritik-saran' },
          { type: 'small', icon: 'clipboard', label: 'Catatan Supervisi', to: '/supervisi', gate: 'supervisi' }
        ]
      },
      {
        label: 'Preferensi',
        items: [
          { type: 'toggle', icon: 'theme', label: 'Tema', action: 'theme' },
          { type: 'toggle', icon: 'ribbon', label: 'Tata Letak', action: 'ribbon' }
        ]
      },
      {
        label: 'Sistem',
        items: [
          { type: 'large', icon: 'gear', label: 'Pengaturan', to: '/pengaturan-desktop', accent: true, gate: 'admin' },
          { type: 'large', icon: 'logout', label: 'Keluar', action: 'logout' }
        ]
      }
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
        items: [{ type: 'large', icon: 'clipboard', label: 'Data\nSupervisi', to: '/supervisi', accent: true }]
      },
      {
        label: 'Catatan',
        items: [
          { type: 'large', icon: 'edit', label: 'Buat\nCatatan', to: '/supervisi?tab=buat' },
          { type: 'small', icon: 'refresh', label: 'Riwayat', to: '/supervisi?tab=riwayat' },
          { type: 'small', icon: 'chart-line', label: 'Rekap', to: '/supervisi?tab=rekap' }
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
          { type: 'large', icon: 'book', label: 'Panduan\nPengguna', to: '/bantuan?bagian=panduan' }
        ]
      },
      {
        label: 'Informasi',
        items: [
          { type: 'small', icon: 'info', label: 'Tentang Aplikasi', to: '/bantuan?bagian=tentang' },
          { type: 'small', icon: 'file', label: 'Catatan Rilis', to: '/bantuan?bagian=rilis' },
          { type: 'small', icon: 'help', label: 'FAQ', to: '/bantuan?bagian=faq' }
        ]
      },
      {
        label: 'Kontak & Pembaruan',
        items: [
          { type: 'large', icon: 'comment', label: 'Hubungi\nAdmin', action: 'kontak' },
          { type: 'small', icon: 'bell', label: 'Lapor Bug', to: '/kritik-saran' },
          { type: 'small', icon: 'refresh', label: 'Cek Pembaruan', action: 'update' }
        ]
      }
    ]
  }
]

const TAB_PATHS = {
  home: ['/dashboard', '/beranda', '/statistik', '/kalender'],
  pendidikan: [
    '/santri', '/guru', '/kelas', '/kelas-guru', '/mapel-lembaga', '/rapor', '/absensi-santri', '/absensi-guru',
    '/naik-kelas', '/rekap-prestasi', '/rekap-diniyah', '/input-bulanan',
    '/master-data', '/kegiatan-pesantren', '/statistik', '/kalender'
  ],
  psb: ['/psb'],
  keuangan: [
    '/keuangan', '/keuangan-desktop', '/tagihan', '/pembayaran', '/pembayaran-pending', '/tabungan',
    '/uang-saku', '/bisyaroh', '/buku-induk', '/laporan-keuangan', '/hutang-piutang',
    '/keu-pengaturan', '/pos-santri', '/pos-riwayat', '/riwayat-santri'
  ],
  saluran: ['/posts'],
  personal: ['/personal', '/profil', '/notifikasi', '/kritik-saran', '/capaian-prestasi', '/statistik', '/pengaturan-desktop', '/pengaturan-web', '/field-schema', '/supervisi'],
  supervisi: ['/supervisi'],
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
  const updater = useUpdater()
  const toast = useToast()

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
    if (it.type === 'clock' || it.type === 'toggle') return true
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
  const activeTabId = computed(() => {
    const list = tabs.value
    if (list.some((t) => t.id === activeTab.value)) return activeTab.value
    return list[0]?.id || 'home'
  })
  const activeTabObj = computed(() => tabs.value.find((t) => t.id === activeTabId.value) || null)

  function selectTab(id) {
    activeTab.value = id
    const t = TABS.find((x) => x.id === id)
    if (t?.defaultTo && t.defaultTo !== route.fullPath) router.push(t.defaultTo)
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
    if (item.action === 'update') {
      updater.check()
      return
    }
    if (item.action === 'kontak') {
      // v.99: buka POPUP kontak admin di Pusat Bantuan (bukan toast)
      router.push('/bantuan?kontak=1')
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
    if (item.to) {
      if (item.to !== route.fullPath) router.push(item.to)
      else refreshNonce.value++
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
