<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h1 class="text-xl md:text-2xl font-black"><i class="fas fa-chart-pie text-fuchsia-500 mr-2"></i>Dashboard Statistik</h1>
      <p class="text-xs text-slate-500 mt-0.5">Ringkasan data pondok</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200"><p class="text-[10px] uppercase font-black text-blue-700">Total Santri</p><p class="text-2xl font-black text-blue-800 mt-1">{{ santriList.length }}</p><p class="text-[10px] text-blue-600 mt-1">{{ aktifSantri }} aktif · {{ santriList.length - aktifSantri }} non-aktif</p></div>
      <div class="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-200"><p class="text-[10px] uppercase font-black text-emerald-700">Total Guru</p><p class="text-2xl font-black text-emerald-800 mt-1">{{ guruList.length }}</p><p class="text-[10px] text-emerald-600 mt-1">{{ aktifGuru }} aktif</p></div>
      <div class="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200"><p class="text-[10px] uppercase font-black text-amber-700">Mukim (Ma'had)</p><p class="text-2xl font-black text-amber-800 mt-1">{{ mukimCount }}</p><p class="text-[10px] text-amber-600 mt-1">{{ ((mukimCount / Math.max(1, santriList.length)) * 100).toFixed(0) }}% dari total</p></div>
      <div class="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200"><p class="text-[10px] uppercase font-black text-purple-700">Total Lembaga</p><p class="text-2xl font-black text-purple-800 mt-1">{{ lembagaCount }}</p><p class="text-[10px] text-purple-600 mt-1">{{ uniqueLembaga.length }} lembaga aktif</p></div>
    </div>
    <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
      <h3 class="text-sm font-black mb-2"><i class="fas fa-list text-fuchsia-500 mr-1"></i>Distribusi Santri per Lembaga</h3>
      <div class="space-y-2">
        <div v-for="lemb in distribusiLembaga" :key="lemb.nama" class="flex items-center gap-2">
          <p class="w-32 text-xs font-bold truncate">{{ lemb.nama }}</p>
          <div class="flex-1 bg-slate-100 rounded-full h-6 overflow-hidden relative">
            <div class="bg-gradient-to-r from-fuchsia-500 to-purple-500 h-full transition-all" :style="{ width: lemb.pct + '%' }"></div>
            <p class="absolute inset-0 flex items-center justify-end pr-2 text-[10px] font-bold text-slate-700">{{ lemb.count }} ({{ lemb.pct.toFixed(0) }}%)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
const santriList = ref([]); const guruList = ref([])
let unsubS = null, unsubG = null
const aktifSantri = computed(() => santriList.value.filter((s) => s.aktif !== false).length)
const aktifGuru = computed(() => guruList.value.filter((g) => String(g.status || 'Aktif').toLowerCase() === 'aktif').length)
const mukimCount = computed(() => santriList.value.filter((s) => s.is_mukim === true && s.aktif !== false).length)
const uniqueLembaga = computed(() => [...new Set(santriList.value.map((s) => s.lembaga).filter(Boolean))])
const lembagaCount = computed(() => uniqueLembaga.value.length)
const distribusiLembaga = computed(() => {
  const map = {}
  for (const s of santriList.value) { if (s.aktif === false) continue; const l = s.lembaga || 'Lainnya'; map[l] = (map[l] || 0) + 1 }
  const total = Object.values(map).reduce((a, b) => a + b, 0)
  return Object.entries(map).map(([nama, count]) => ({ nama, count, pct: total > 0 ? (count / total) * 100 : 0 })).sort((a, b) => b.count - a.count)
})
onMounted(() => {
  unsubS = subscribeColl('santri', (docs) => { santriList.value = docs })
  unsubG = subscribeColl('guru', (docs) => { guruList.value = docs })
})
onUnmounted(() => { if (unsubS) { try { unsubS() } catch (e) {} } ; if (unsubG) { try { unsubG() } catch (e) {} } })
</script>
