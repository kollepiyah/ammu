<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div v-if="!isFullAccess" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center">
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Akses terbatas</p>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Halaman Data Kelas hanya untuk admin.</p>
    </div>

    <template v-else>
      <!-- Header + stats -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
              <i class="fas fa-door-open text-teal-500 mr-2"></i>Data Kelas
            </h1>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Kelas/jilid per lembaga pendidikan
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <div class="px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-xs">
              <span class="text-teal-700 dark:text-teal-300 font-bold">{{ stats.total }}</span>
              <span class="text-slate-500 dark:text-slate-400 ml-1">kelas</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-700 text-xs">
              <span class="text-cyan-700 dark:text-cyan-300 font-bold">{{ stats.lembagaCount }}</span>
              <span class="text-slate-500 dark:text-slate-400 ml-1">lembaga</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 text-xs">
              <span class="text-indigo-700 dark:text-indigo-300 font-bold">{{ stats.santriTotal }}</span>
              <span class="text-slate-500 dark:text-slate-400 ml-1">santri aktif</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Search + filter -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div class="md:col-span-2 relative">
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input
              v-model="search"
              type="text"
              placeholder="Cari kelas / lembaga..."
              class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition"
            />
          </div>
          <select
            v-model="filterLembaga"
            class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Semua lembaga</option>
            <option v-for="l in uniqueLembaga" :key="l" :value="l">{{ l }}</option>
          </select>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center border border-slate-200 dark:border-slate-700">
        <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
        <p class="text-sm text-slate-500 font-bold">Memuat data kelas...</p>
      </div>

      <!-- Empty -->
      <div
        v-else-if="kelasItems.length === 0"
        class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center"
      >
        <i class="fas fa-door-closed text-slate-300 text-4xl mb-3"></i>
        <p class="text-sm font-bold text-slate-700 dark:text-slate-300">
          {{ search || filterLembaga ? 'Tidak ada kelas cocok' : 'Belum ada kelas' }}
        </p>
      </div>

      <!-- Grouped list -->
      <div v-else class="space-y-3">
        <div
          v-for="(items, lembagaName) in groupedByLembaga"
          :key="lembagaName"
          class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-black text-teal-700 dark:text-teal-300 uppercase tracking-wide">
              <i class="fas fa-building mr-1"></i>{{ lembagaName }}
            </h3>
            <span class="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-bold">
              {{ items.length }} kelas
            </span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <div
              v-for="it in items"
              :key="`${it.lembaga}__${it.kelas}`"
              class="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-3 border border-slate-200 dark:border-slate-600 text-center hover:bg-teal-50 dark:hover:bg-teal-900/30 transition"
            >
              <i class="fas fa-door-open text-teal-500 text-lg mb-1"></i>
              <p class="text-sm font-black text-slate-800 dark:text-white">{{ it.kelas }}</p>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                {{ getSantriCount(it.lembaga, it.kelas) }} santri
              </p>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-[10px] text-slate-400 pt-2">
        <i class="fas fa-circle-info mr-1"></i>{{ kelasItems.length }} kelas · Vue 3 · Phase 5.8
      </p>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useKelas } from '@/composables/useKelas'

const {
  kelasItems,
  groupedByLembaga,
  lembagaRaw,
  loading,
  search,
  filterLembaga,
  stats,
  isFullAccess,
  getSantriCount
} = useKelas()

const uniqueLembaga = computed(() => {
  const set = new Set()
  for (const l of lembagaRaw.value) {
    if (l?.lembaga) set.add(l.lembaga)
  }
  return [...set].sort()
})
</script>
