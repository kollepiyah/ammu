<template>
  <div class="p-4 md:p-6 max-w-3xl mx-auto space-y-4">
    <!-- Back -->
    <button
      @click="goBack"
      class="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-teal-600 transition cursor-pointer"
    >
      <i class="fas fa-arrow-left"></i>Kembali
    </button>

    <div v-if="!santri" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center border border-dashed border-[var(--border-default)]">
      <i class="fas fa-user-slash text-[var(--text-tertiary)] text-3xl mb-2"></i>
      <p class="text-sm text-[var(--text-secondary)] italic">Data santri tidak ditemukan.</p>
    </div>

    <template v-else>
      <!-- Header -->
      <div class="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl p-5 md:p-6 text-white shadow-lg">
        <p class="text-[10px] font-black uppercase tracking-widest opacity-90">
          <i class="fas fa-trophy mr-1"></i>Detail Santri Berprestasi
        </p>
        <h2 class="text-xl md:text-2xl font-black mt-1">{{ santri.nama }}</h2>
        <div class="flex flex-wrap gap-2 mt-3">
          <span v-if="santri.nis" class="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black px-3 py-1 rounded-full">NIS: {{ santri.nis }}</span>
          <span class="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black px-3 py-1 rounded-full">{{ santri.lembaga || '-' }}</span>
          <span v-if="statusBadge" :class="['text-[11px] font-black px-3 py-1 rounded-full', statusBadge.cls]">{{ statusBadge.label }}</span>
        </div>
      </div>

      <!-- Capaian utama -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm text-center">
          <p class="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Awal Bulan</p>
          <p class="text-2xl font-black text-[var(--text-primary)] mt-1">{{ parseNum(santri.prestasi_awal) || '-' }}</p>
        </div>
        <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm text-center">
          <p class="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Akhir Bulan</p>
          <p class="text-2xl font-black text-[var(--text-primary)] mt-1">{{ parseNum(santri.prestasi_akhir) || '-' }}</p>
        </div>
        <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-700 shadow-sm text-center">
          <p class="text-[9px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">Total Capaian</p>
          <p class="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">{{ totalDisplay }}</p>
        </div>
        <div class="bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl p-4 border border-cyan-200 dark:border-cyan-700 shadow-sm text-center">
          <p class="text-[9px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-widest">Juz</p>
          <p class="text-2xl font-black text-cyan-700 dark:text-cyan-300 mt-1">{{ juzDisplay }}</p>
        </div>
      </div>

      <!-- Data diri ringkas -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 pb-2 border-b border-[var(--border-subtle)]">
          <i class="fas fa-id-card text-teal-600 mr-1"></i>Data Santri
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div v-for="row in dataRows" :key="row.label">
            <p class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">{{ row.label }}</p>
            <p class="text-sm font-bold text-[var(--text-primary)] mt-0.5">{{ row.value || '-' }}</p>
          </div>
        </div>
      </div>

      <!-- Riwayat catatan bulanan -->
      <div v-if="catatanList.length" class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 pb-2 border-b border-[var(--border-subtle)]">
          <i class="fas fa-clipboard-list text-cyan-600 mr-1"></i>Catatan Bulanan
        </h3>
        <div class="space-y-2">
          <div v-for="c in catatanList" :key="c.key" class="bg-slate-50 dark:bg-slate-700/30 rounded-lg px-3 py-2">
            <p class="text-[10px] font-black text-teal-700 dark:text-teal-300 uppercase tracking-wider">{{ c.label }}</p>
            <p class="text-xs text-[var(--text-primary)] mt-0.5 whitespace-pre-line">{{ c.text }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSantri } from '@/composables/useSantri'
import { useLembaga, formatKelasLabel } from '@/composables/useLembaga'
import { statusFromSelisih } from '@/composables/useStatistikScope'

const route = useRoute()
const router = useRouter()
const { santriRaw } = useSantri()
useLembaga()

const santriId = computed(() => String(route.params.id || ''))
const santri = computed(() => santriRaw.value.find((s) => String(s.id) === santriId.value) || null)

function parseNum(v) {
  const m = String(v || '').match(/\d+/)
  return m ? parseInt(m[0]) : 0
}

const selisih = computed(() => {
  if (!santri.value) return 0
  return parseNum(santri.value.prestasi_akhir) - parseNum(santri.value.prestasi_awal)
})

const isPPPH = computed(() => String(santri.value?.lembaga || '').trim().toLowerCase() === 'ppph')
const isPTPT = computed(() => String(santri.value?.lembaga || '').trim().toLowerCase() === 'ptpt')

const totalDisplay = computed(() => {
  if (!santri.value) return '-'
  if (isPPPH.value) return selisih.value > 0 ? `${selisih.value} Hadits` : '-'
  if (isPTPT.value) return selisih.value > 0 ? `${selisih.value} Hal` : '-'
  return santri.value.prestasi_total || parseNum(santri.value.prestasi_akhir) || '-'
})

const juzDisplay = computed(() => {
  const j = String(santri.value?.juz || '').replace(/[^0-9]/g, '')
  return j ? j : '-'
})

const statusBadge = computed(() => {
  if (!santri.value) return null
  const st = statusFromSelisih(selisih.value, santri.value.lembaga)
  if (!st) return null
  if (st === 'bagus') return { label: 'Bagus', cls: 'bg-emerald-400/90 text-emerald-950' }
  if (st === 'cukup') return { label: 'Cukup', cls: 'bg-cyan-300/90 text-cyan-950' }
  return { label: 'Kurang', cls: 'bg-rose-300/90 text-rose-950' }
})

const dataRows = computed(() => {
  const s = santri.value || {}
  return [
    { label: 'Lembaga Qiraati', value: s.lembaga },
    { label: 'Jilid / Kelas', value: s.kelas },
    {
      label: 'Kelas Sekolah',
      value: s.kelas_sekolah ? formatKelasLabel(s.lembaga_sekolah, s.kelas_sekolah) : ''
    },
    { label: 'Guru Pengampu', value: s.guru || s.guru_pagi || s.guru_sore || '' },
    { label: 'Wali', value: s.wali || s.nama_wali || (s.ayah && s.ayah.nama) || '' },
    { label: 'No. WA Wali', value: s.wa || '' }
  ]
})

const NAMA_BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const catatanList = computed(() => {
  const cb = santri.value?.catatan_bulanan
  if (!cb || typeof cb !== 'object') return []
  return Object.entries(cb)
    .filter(([, v]) => String(v || '').trim().length > 0)
    .map(([key, text]) => {
      const m = String(key).match(/^(\d{4})_(\d{2})$/)
      const label = m ? `${NAMA_BULAN[parseInt(m[2]) - 1]} ${m[1]}` : key
      return { key, label, text }
    })
    .sort((a, b) => String(b.key).localeCompare(String(a.key)))
})

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/statistik')
}
</script>
