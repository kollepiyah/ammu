<template>
  <div>
    <!-- Satu deret tab menyatu (admin): Ringkasan + analitik. Non-admin: tanpa tab,
         langsung dasbor (StatistikView menangani konten per-peran sendiri). -->
    <div v-if="showTabs" class="max-w-6xl mx-auto px-4 md:px-6 pt-4">
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="t in tabs"
          :key="t.id"
          @click="tab = t.id"
          class="px-4 py-2 rounded-xl text-sm font-bold transition"
          :class="
            tab === t.id
              ? 'bg-teal-600 text-white shadow'
              : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
          "
        >
          <i :class="['fas', t.icon, 'mr-1']"></i>{{ t.label }}
        </button>
      </div>
    </div>

    <!-- Ringkasan = dasbor (StatistikView). Tab lain = Laporan/Analitik (LaporanView embed). -->
    <StatistikView v-if="!showTabs || tab === 'ringkasan'" />
    <LaporanView v-else embedded :active-tab="tab" />
  </div>
</template>

<script setup>
// StatistikHubView (v.110) — SATU menu "Dasbor Statistik" yang menyatukan dasbor (Ringkasan)
// + Laporan/Analitik (Santri/Keuangan/Akademik/Absensi/Pegawai) dalam satu deret tab.
// Gantikan menu Laporan terpisah (dulu dipisah saat BigQuery; kini Supabase RPC). Tab analitik
// hanya admin (RPC analytics_query gate auth_can_manage server-side); non-admin → dasbor saja.
import { ref, computed } from 'vue'
import StatistikView from '@/views/StatistikView.vue'
import LaporanView from '@/views/LaporanView.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const showTabs = computed(() => auth.isAdmin)

const tabs = [
  { id: 'ringkasan', label: 'Ringkasan', icon: 'fa-gauge-high' },
  { id: 'santri', label: 'Santri', icon: 'fa-users' },
  { id: 'keuangan', label: 'Keuangan', icon: 'fa-coins' },
  { id: 'akademik', label: 'Akademik', icon: 'fa-graduation-cap' },
  { id: 'absensi', label: 'Absensi', icon: 'fa-clipboard-user' },
  { id: 'pegawai', label: 'Pegawai', icon: 'fa-chalkboard-teacher' }
]
const tab = ref('ringkasan')
</script>
