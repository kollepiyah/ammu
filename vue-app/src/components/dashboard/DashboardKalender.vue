<template>
  <!-- v.21.84.0527: whole widget clickable → /kalender (kyai request) -->
  <div
    @click="$emit('see-all')"
    class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-cyan-300 dark:hover:border-cyan-700 transition cursor-pointer"
    title="Klik untuk lihat kalender penuh"
  >
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest">
        <i class="fas fa-calendar-alt text-cyan-500 mr-2"></i>Kalender Pendidikan
      </h3>
      <span class="text-[11px] font-bold text-teal-600 hover:text-teal-700"> Lihat semua → </span>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="py-6 text-center">
      <i class="fas fa-spinner fa-spin text-cyan-500 text-2xl mb-2"></i>
      <p class="text-xs text-slate-500 font-bold">Memuat agenda...</p>
    </div>

    <!-- Empty -->
    <div
      v-else-if="agenda.length === 0"
      class="py-6 text-center bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-600"
    >
      <i class="fas fa-calendar-times text-slate-300 dark:text-slate-600 text-3xl mb-2"></i>
      <p class="text-xs text-slate-500 dark:text-slate-400 font-bold">
        Belum ada agenda dalam waktu dekat
      </p>
    </div>

    <!-- v.71.0526: max 2 agenda (kyai req — match tinggi widget Hijri di sebelahnya) -->
    <ul v-else class="space-y-2">
      <li
        v-for="item in agenda.slice(0, 2)"
        :key="item.id"
        class="flex gap-3 items-start p-2.5 bg-cyan-50/60 dark:bg-cyan-900/15 rounded-xl border border-cyan-100 dark:border-cyan-800/50"
      >
        <div
          class="flex-shrink-0 w-12 text-center rounded-lg overflow-hidden border-2 border-rose-200 dark:border-rose-700 shadow-sm"
        >
          <p class="text-[9px] font-black bg-rose-500 text-white py-0.5 uppercase tracking-wider">
            {{ formatBulanShort(item.tgl_mulai) }}
          </p>
          <p
            class="text-base font-black text-rose-700 dark:text-rose-300 bg-white dark:bg-slate-800 py-0.5"
          >
            {{ formatHari(item.tgl_mulai) }}
          </p>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-black text-slate-800 dark:text-slate-100 truncate">
            {{ item.judul }}
          </p>
          <p class="text-[10px] text-cyan-700 dark:text-cyan-300 font-bold mt-0.5 tabular-nums">
            <i class="fas fa-clock mr-1"></i>{{ formatRangeText(item) }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/db'
import { BULAN_ID_SHORT } from '@/utils/format'
import { pushWidgetData } from '@/composables/useWidgetSync'

defineEmits(['see-all'])

const agenda = ref([])
const loading = ref(true)
let unsubscribe = null

function isUpcoming(item) {
  // include kegiatan dari H-7 sampai mendatang (untuk kasus event multi-day)
  const now = new Date()
  const start = new Date(item.tgl_mulai)
  const end = item.tgl_selesai ? new Date(item.tgl_selesai) : start
  // Allow event yang masih berjalan atau akan datang
  return end >= new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

function sortByDate(a, b) {
  return new Date(a.tgl_mulai) - new Date(b.tgl_mulai)
}

function formatBulanShort(dateStr) {
  const d = new Date(dateStr)
  if (isNaN(d)) return '-'
  return BULAN_ID_SHORT[d.getMonth()] || '-'
}

function formatHari(dateStr) {
  const d = new Date(dateStr)
  if (isNaN(d)) return '-'
  return String(d.getDate())
}

function formatRangeText(item) {
  const start = new Date(item.tgl_mulai)
  if (isNaN(start)) return '-'
  if (!item.tgl_selesai || item.tgl_selesai === item.tgl_mulai) {
    return `${start.getDate()} ${BULAN_ID_SHORT[start.getMonth()]} ${start.getFullYear()}`
  }
  const end = new Date(item.tgl_selesai)
  if (isNaN(end))
    return `${start.getDate()} ${BULAN_ID_SHORT[start.getMonth()]} ${start.getFullYear()}`
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()}-${end.getDate()} ${BULAN_ID_SHORT[start.getMonth()]} ${start.getFullYear()}`
  }
  return `${start.getDate()} ${BULAN_ID_SHORT[start.getMonth()]} - ${end.getDate()} ${BULAN_ID_SHORT[end.getMonth()]}`
}

onMounted(() => {
  unsubscribe = subscribeColl('kegiatan', (docs) => {
    agenda.value = docs.filter(isUpcoming).sort(sortByDate)
    loading.value = false
    // v.94.0626: dorong agenda terdekat (max 5) ke widget Kalender Android
    try {
      const ev = agenda.value.slice(0, 8).map((it) => ({
        judul: it.judul || '',
        tgl_mulai: it.tgl_mulai || '',
        tgl_selesai: it.tgl_selesai || ''
      }))
      pushWidgetData({ events: JSON.stringify(ev) })
    } catch (e) {
      /* ignore */
    }
  })
})

onUnmounted(() => {
  if (unsubscribe) {
    try {
      unsubscribe()
    } catch (e) {}
    unsubscribe = null
  }
})
</script>
