<template>
  <!-- v.21.80.0526: Kalender Pesantren Modern — bg-card, border-subtle, gold accent dots -->
  <div
    @click="$emit('see-all')"
    class="bg-[var(--bg-card)] rounded-[var(--radius-lg)] p-4 md:p-5 border border-[var(--border-subtle)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-[var(--color-accent)] transition cursor-pointer"
    title="Klik untuk lihat kalender penuh"
  >
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">
        <i class="fas fa-calendar-alt text-[var(--color-accent)] mr-2"></i>Kalender Pendidikan
      </h3>
      <span class="text-[11px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
        Lihat semua →
      </span>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="py-6 text-center">
      <i class="fas fa-spinner fa-spin text-[var(--color-primary)] text-2xl mb-2"></i>
      <p class="text-xs text-[var(--text-secondary)] font-bold">Memuat agenda...</p>
    </div>

    <!-- Empty -->
    <div
      v-else-if="agenda.length === 0"
      class="py-6 text-center bg-[var(--bg-muted)] rounded-[var(--radius-md)] border border-dashed border-[var(--border-default)]"
    >
      <i class="fas fa-calendar-times text-[var(--text-tertiary)] text-3xl mb-2"></i>
      <p class="text-xs text-[var(--text-secondary)] font-bold">
        Belum ada agenda dalam waktu dekat
      </p>
    </div>

    <!-- Agenda list (max 3) -->
    <ul v-else class="space-y-2">
      <li
        v-for="item in agenda.slice(0, 3)"
        :key="item.id"
        class="flex gap-3 items-start p-2.5 bg-[var(--color-accent-soft)] rounded-[var(--radius-md)] border border-[var(--border-subtle)]"
      >
        <div
          class="flex-shrink-0 w-12 text-center rounded-[var(--radius-sm)] overflow-hidden border border-[var(--color-accent)] shadow-sm"
        >
          <p class="text-[9px] font-black bg-[var(--color-primary)] text-[var(--text-on-primary)] py-0.5 uppercase tracking-wider">
            {{ formatBulanShort(item.tgl_mulai) }}
          </p>
          <p class="text-base font-black text-[var(--color-primary)] bg-[var(--bg-card)] py-0.5">
            {{ formatHari(item.tgl_mulai) }}
          </p>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-black text-[var(--text-primary)] truncate">
            {{ item.judul }}
          </p>
          <p class="text-[10px] text-[var(--color-accent)] font-bold mt-0.5 tabular-nums">
            <i class="fas fa-clock mr-1"></i>{{ formatRangeText(item) }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { BULAN_ID_SHORT } from '@/utils/format'

defineEmits(['see-all'])

const agenda = ref([])
const loading = ref(true)
let unsubscribe = null

function isUpcoming(item) {
  const now = new Date()
  const start = new Date(item.tgl_mulai)
  const end = item.tgl_selesai ? new Date(item.tgl_selesai) : start
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
  if (isNaN(end)) return `${start.getDate()} ${BULAN_ID_SHORT[start.getMonth()]} ${start.getFullYear()}`
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()}-${end.getDate()} ${BULAN_ID_SHORT[start.getMonth()]} ${start.getFullYear()}`
  }
  return `${start.getDate()} ${BULAN_ID_SHORT[start.getMonth()]} - ${end.getDate()} ${BULAN_ID_SHORT[end.getMonth()]}`
}

onMounted(() => {
  unsubscribe = subscribeColl('kegiatan', (docs) => {
    agenda.value = docs.filter(isUpcoming).sort(sortByDate)
    loading.value = false
  })
})

onUnmounted(() => {
  if (unsubscribe) {
    try { unsubscribe() } catch (e) {}
    unsubscribe = null
  }
})
</script>
