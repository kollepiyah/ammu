<template>
  <div class="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
    <!-- Back -->
    <button
      @click="goBack"
      class="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-teal-600 transition cursor-pointer"
    >
      <i class="fas fa-arrow-left"></i>Kembali
    </button>

    <!-- Header -->
    <div
      class="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl p-5 md:p-6 text-white shadow-lg"
    >
      <p class="text-[10px] font-black uppercase tracking-widest opacity-90">
        <i class="fas fa-chart-pie mr-1"></i>Data Kelas per Lembaga
      </p>
      <h2 class="text-xl md:text-2xl font-black mt-1">{{ namaLembaga }}</h2>
      <div class="flex flex-wrap gap-2 mt-3">
        <span class="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black px-3 py-1 rounded-full">{{ rows.length }} kelas</span>
        <span class="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black px-3 py-1 rounded-full">{{ totalSantri }} santri</span>
        <span class="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black px-3 py-1 rounded-full">{{ totalGuru }} guru</span>
      </div>
    </div>

    <!-- Empty -->
    <div
      v-if="rows.length === 0"
      class="bg-[var(--bg-card)] rounded-2xl p-10 text-center border border-dashed border-[var(--border-default)]"
    >
      <i class="fas fa-inbox text-[var(--text-tertiary)] text-3xl mb-2"></i>
      <p class="text-sm text-[var(--text-secondary)] italic">Belum ada santri aktif di lembaga ini.</p>
    </div>

    <!-- Per-kelas cards -->
    <div
      v-for="row in rows"
      :key="row.kelas"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2 flex-wrap pb-2 mb-3 border-b border-[var(--border-subtle)]">
        <h3 class="text-sm md:text-base font-black text-[var(--text-primary)]">
          <i class="fas fa-door-open text-teal-600 mr-1.5"></i>Kelas {{ row.kelas }}
          <span class="text-[11px] font-bold text-[var(--text-tertiary)] ml-1">· {{ row.santri.length }} santri</span>
        </h3>
        <p class="text-[11px] font-bold text-teal-700 dark:text-teal-300">
          <i class="fas fa-chalkboard-teacher mr-1"></i>{{ row.guru.length ? row.guru.join(', ') : '— belum ada guru —' }}
        </p>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="s in row.santri"
          :key="s.id"
          @click="goSantri(s.id)"
          class="text-xs font-bold px-2.5 py-1 rounded-lg bg-[var(--bg-muted)] hover:bg-teal-50 dark:hover:bg-teal-900/30 text-[var(--text-primary)] border border-[var(--border-subtle)] transition cursor-pointer"
        >
          {{ s.nama }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// v.100 Batch7 (T21): halaman data kelas per lembaga (guru + santri per kelas).
// Dibuka dari kartu "Statistik Lembaga" di Dashboard Statistik.
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGuru } from '@/composables/useGuru'
import { useLembaga, getPkbmSubTier } from '@/composables/useLembaga'
import { useStatistikScope } from '@/composables/useStatistikScope'

const route = useRoute()
const router = useRouter()
const { scopedSantriAll } = useStatistikScope()
useGuru()
useLembaga()

const namaLembaga = computed(() => String(route.params.nama || '').trim())

const _SEKOLAH_NAMA = ['TK', 'SDI', 'SMP', 'SMA', 'PKBM']
const rows = computed(() => {
  const nm = namaLembaga.value
  if (!nm) return []
  const up = nm.toUpperCase()
  const isSek = _SEKOLAH_NAMA.includes(up)
  const list = (scopedSantriAll.value || []).filter((s) => {
    if (s.aktif === false) return false
    if (!isSek) return String(s.lembaga || '').trim().toLowerCase() === nm.toLowerCase()
    if (up === 'SMP' || up === 'SMA') {
      return (
        String(s.lembaga_sekolah || '').trim().toUpperCase() === 'PKBM' &&
        getPkbmSubTier(s.kelas_sekolah || s.kelas) === up
      )
    }
    return String(s.lembaga_sekolah || '').trim().toUpperCase() === up
  })
  const byKelas = new Map()
  for (const s of list) {
    const kls = isSek ? s.kelas_sekolah || s.kelas || '-' : s.kelas || '-'
    if (!byKelas.has(kls)) byKelas.set(kls, { kelas: kls, guruSet: new Set(), santri: [] })
    const e = byKelas.get(kls)
    e.santri.push({ id: String(s.id), nama: s.nama || '-' })
    if (isSek) {
      for (const g of Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []) if (g) e.guruSet.add(g)
    } else {
      if (s.guru_pagi) e.guruSet.add(s.guru_pagi + ' (pagi)')
      if (s.guru_sore) e.guruSet.add(s.guru_sore + ' (sore)')
    }
  }
  return [...byKelas.values()]
    .map((e) => ({
      kelas: e.kelas,
      guru: [...e.guruSet],
      santri: e.santri.sort((a, b) => String(a.nama).localeCompare(String(b.nama), 'id'))
    }))
    .sort((a, b) => String(a.kelas).localeCompare(String(b.kelas), 'id', { numeric: true }))
})

const totalSantri = computed(() => rows.value.reduce((n, r) => n + r.santri.length, 0))
const totalGuru = computed(() => {
  const set = new Set()
  for (const r of rows.value) for (const g of r.guru) set.add(g)
  return set.size
})

function goSantri(id) {
  if (id) router.push(`/profil/santri/${id}`)
}
function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/statistik')
}
</script>
