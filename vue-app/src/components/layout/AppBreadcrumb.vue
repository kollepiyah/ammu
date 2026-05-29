<template>
  <!-- v.21.115.0528: AppBreadcrumb — auto-derive dari route.path, level >=2 saja.
       Hide di Beranda dan halaman login.
  -->
  <nav v-if="crumbs.length > 1" class="text-[11px] font-bold text-[var(--text-secondary)] mb-1 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
    <template v-for="(c, i) in crumbs" :key="c.path">
      <RouterLink
        v-if="i < crumbs.length - 1"
        :to="c.path"
        class="hover:text-teal-600 dark:hover:text-teal-300 transition"
      >
        <i v-if="i === 0" class="fas fa-home text-[10px] mr-0.5"></i>{{ c.label }}
      </RouterLink>
      <span v-else class="text-[var(--text-primary)] font-black">{{ c.label }}</span>
      <i v-if="i < crumbs.length - 1" class="fas fa-chevron-right text-[8px] text-[var(--text-tertiary)]"></i>
    </template>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Label map untuk segment URL → human-readable
const LABEL_MAP = {
  '': 'Beranda',
  'dashboard': 'Beranda',
  'profil': 'Profil',
  'santri': 'Data Santri',
  'guru': 'Data Guru',
  'lembaga': 'Data Lembaga',
  'kelas': 'Data Kelas',
  'master-data': 'Master Data',
  'kalender': 'Kalender Kegiatan',
  'statistik': 'Dashboard Statistik',
  'naik-kelas': 'Kenaikan / Mutasi',
  'rekap-prestasi': 'Rekap Prestasi',
  'rekap-diniyah': 'Rekap Diniyah',
  'rapor': 'Rapor Semester',
  'input-bulanan': 'Input Bulanan',
  'capaian-prestasi': 'Capaian Prestasi',
  'absensi-guru': 'Absensi Guru',
  'absensi-santri': 'Absensi Santri',
  'posts': 'Ammu Channel',
  'kritik-saran': 'Kritik & Saran',
  'pengaturan-web': 'Pengaturan Web',
  'keu-pengaturan': 'Pengaturan Keuangan',
  'kegiatan-pesantren': 'Kegiatan Pesantren',
  'keuangan': 'Dashboard Keuangan',
  'pos-santri': 'POS Santri',
  'pos-riwayat': 'Riwayat POS',
  'pembayaran': 'Pembayaran',
  'tagihan': 'Tagihan',
  'tabungan': 'Tabungan',
  'bisyaroh': 'Bisyaroh',
  'buku-induk': 'Buku Induk',
  'hutang-piutang': 'Hutang Piutang',
  'laporan-keuangan': 'Laporan Keuangan',
  'riwayat-santri': 'Riwayat Santri',
  'psb': 'PSB Admin',
  'psb-form': 'Form PSB',
  'personal': 'Personal',
  'supervisi': 'Data Supervisi',
  'field-schema': 'Field Schema',
  'master-form': 'Master Form',
  'new': 'Tambah Baru',
  'edit': 'Edit'
}

function labelFor(segment) {
  if (LABEL_MAP[segment]) return LABEL_MAP[segment]
  // Cek apakah numeric/UUID — anggap ID
  if (/^[a-f0-9-]{8,}$/i.test(segment) || /^\d+$/.test(segment)) return 'Detail'
  // Fallback: title case
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const crumbs = computed(() => {
  const path = route.path
  // Hide untuk halaman public/login
  if (path === '/' || path === '/login' || path === '/dashboard' || path === '/psb-form') return []
  const segments = path.split('/').filter(Boolean)
  const list = [{ path: '/dashboard', label: 'Beranda' }]
  let cumulative = ''
  for (const seg of segments) {
    cumulative += '/' + seg
    list.push({ path: cumulative, label: labelFor(seg) })
  }
  return list
})
</script>
