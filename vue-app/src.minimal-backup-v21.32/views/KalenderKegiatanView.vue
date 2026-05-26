<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h1 class="text-xl md:text-2xl font-black">
        <i class="fas fa-calendar-alt text-cyan-500 mr-2"></i>Kalender Kegiatan
      </h1>
      <p class="text-xs text-slate-500 mt-0.5">
        {{ NAMA_BULAN[selectedMonth - 1] }} {{ selectedYear }} — {{ kegiatanBulan.length }} kegiatan
      </p>
    </div>

    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2"
    >
      <button @click="prevMonth" class="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg">
        <i class="fas fa-chevron-left"></i>
      </button>
      <select
        v-model.number="selectedMonth"
        class="flex-1 px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
      >
        <option v-for="(b, i) in NAMA_BULAN" :key="b" :value="i + 1">{{ b }}</option>
      </select>
      <select
        v-model.number="selectedYear"
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
      >
        <option v-for="y in [2024, 2025, 2026, 2027]" :key="y" :value="y">{{ y }}</option>
      </select>
      <button @click="nextMonth" class="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <!-- Grid kalender simple -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div
        class="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-slate-500 uppercase mb-2"
      >
        <div v-for="d in HARI" :key="d">{{ d }}</div>
      </div>
      <div class="grid grid-cols-7 gap-1">
        <div
          v-for="(cell, i) in calendarCells"
          :key="i"
          :class="[
            'min-h-[60px] rounded-lg p-1 text-xs',
            cell.day
              ? cell.isToday
                ? 'bg-cyan-100 border-2 border-cyan-400'
                : 'bg-slate-50 border border-slate-200'
              : ''
          ]"
        >
          <p v-if="cell.day" class="font-bold text-slate-700 text-[11px]">{{ cell.day }}</p>
          <div v-if="cell.events.length > 0" class="space-y-0.5 mt-0.5">
            <div
              v-for="ev in cell.events"
              :key="ev.id"
              class="text-[9px] bg-cyan-200 text-cyan-900 px-1 rounded truncate"
              :title="ev.nama"
            >
              {{ ev.nama }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- List kegiatan bulan ini -->
    <div
      v-if="kegiatanBulan.length > 0"
      class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
      <div class="px-4 py-3 border-b border-slate-100">
        <h3 class="text-sm font-black">Daftar Kegiatan {{ NAMA_BULAN[selectedMonth - 1] }}</h3>
      </div>
      <div class="divide-y divide-slate-100">
        <div v-for="k in kegiatanBulan" :key="k.id" class="p-3 flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-calendar-check"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold truncate">{{ k.nama }}</p>
            <p class="text-[10px] text-slate-500">
              {{ k.tanggal || '-' }} {{ k.waktu ? '· ' + k.waktu : '' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'

const NAMA_BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]
const HARI = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const _now = new Date()
const selectedYear = ref(_now.getFullYear())
const selectedMonth = ref(_now.getMonth() + 1)
const kegiatanRaw = ref([])
let unsub = null

const kegiatanBulan = computed(() => {
  return kegiatanRaw.value
    .filter((k) => {
      const d = new Date(k.tanggal || '')
      if (isNaN(d.getTime())) return false
      return d.getFullYear() === selectedYear.value && d.getMonth() + 1 === selectedMonth.value
    })
    .sort((a, b) => String(a.tanggal || '').localeCompare(String(b.tanggal || '')))
})

const calendarCells = computed(() => {
  const firstDay = new Date(selectedYear.value, selectedMonth.value - 1, 1).getDay()
  const daysInMonth = new Date(selectedYear.value, selectedMonth.value, 0).getDate()
  const today = new Date()
  const isCurrentMonth =
    today.getFullYear() === selectedYear.value && today.getMonth() + 1 === selectedMonth.value
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push({ day: null, events: [] })
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const events = kegiatanBulan.value.filter((k) => String(k.tanggal || '') === dateStr)
    cells.push({ day: d, events, isToday: isCurrentMonth && today.getDate() === d })
  }
  return cells
})

function prevMonth() {
  if (selectedMonth.value === 1) {
    selectedMonth.value = 12
    selectedYear.value--
  } else {
    selectedMonth.value--
  }
}
function nextMonth() {
  if (selectedMonth.value === 12) {
    selectedMonth.value = 1
    selectedYear.value++
  } else {
    selectedMonth.value++
  }
}

onMounted(() => {
  unsub = subscribeColl('kegiatan_pesantren', (docs) => {
    kegiatanRaw.value = docs
  })
})
onUnmounted(() => {
  if (unsub) {
    try {
      unsub()
    } catch (e) {}
  }
})
</script>
