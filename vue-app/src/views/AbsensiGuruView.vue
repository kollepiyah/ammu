<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h1 class="text-xl md:text-2xl font-black"><i class="fas fa-fingerprint text-emerald-500 mr-2"></i>Absensi Guru</h1>
      <p class="text-xs text-slate-500 mt-0.5">{{ NAMA_BULAN[selectedMonth-1] }} {{ selectedYear }}</p>
    </div>
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-2 md:grid-cols-3 gap-2">
      <select v-model.number="selectedMonth" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
        <option v-for="(b, i) in NAMA_BULAN" :key="b" :value="i+1">{{ b }}</option>
      </select>
      <select v-model.number="selectedYear" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
        <option v-for="y in [2024,2025,2026,2027]" :key="y" :value="y">{{ y }}</option>
      </select>
      <input v-model="search" type="text" placeholder="Cari nama guru..." class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
    </div>
    <div v-if="loading" class="bg-white rounded-2xl p-10 text-center"><i class="fas fa-spinner fa-spin text-emerald-500 text-3xl"></i></div>
    <div v-else-if="filteredGuru.length === 0" class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center"><i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i><p class="text-sm text-slate-500 italic">Tidak ada guru.</p></div>
    <div v-else class="space-y-2">
      <div v-for="g in filteredGuru" :key="g.id" class="bg-white rounded-xl p-3 border border-slate-200 shadow-sm flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><i class="fas fa-chalkboard-teacher"></i></div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold truncate">{{ g.nama }}</p>
          <p class="text-[10px] text-slate-500">{{ g.lembaga || '-' }} · {{ g.jabatan || 'Guru' }}</p>
        </div>
        <div class="text-right">
          <p class="text-sm font-bold text-emerald-700">{{ countAbsen(g.id) }} hari</p>
          <p class="text-[9px] text-slate-500">absensi bulan ini</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
const NAMA_BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const guruRaw = ref([]); const absensiRaw = ref([]); const loading = ref(true); const search = ref('')
const selectedMonth = ref(new Date().getMonth() + 1); const selectedYear = ref(new Date().getFullYear())
let unsubG = null, unsubA = null
const filteredGuru = computed(() => {
  let list = guruRaw.value.filter((g) => String(g.status || 'Aktif').toLowerCase() === 'aktif')
  const kw = search.value.trim().toLowerCase()
  if (kw) list = list.filter((g) => String(g.nama || '').toLowerCase().includes(kw))
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
})
function countAbsen(guruId) {
  return absensiRaw.value.filter((a) => {
    if (String(a.guru_id) !== String(guruId)) return false
    const d = new Date(a.tanggal || ''); if (isNaN(d.getTime())) return false
    return d.getFullYear() === selectedYear.value && (d.getMonth() + 1) === selectedMonth.value
  }).length
}
onMounted(() => {
  unsubG = subscribeColl('guru', (docs) => { guruRaw.value = docs; loading.value = false })
  unsubA = subscribeColl('absensi_guru', (docs) => { absensiRaw.value = docs })
})
onUnmounted(() => { if (unsubG) { try { unsubG() } catch (e) {} } ; if (unsubA) { try { unsubA() } catch (e) {} } })
</script>
