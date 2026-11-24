<template>
  <!-- Baris ikon ibadah — satu komponen untuk Beranda publik & dashboard Portal (blueprint 3.7) -->
  <div class="grid grid-cols-4 gap-2">
    <button
      v-for="m in daftar"
      :key="m.kunci"
      v-haptic
      type="button"
      class="flex flex-col items-center gap-1.5 py-2.5 rounded-2xl bg-[var(--bg-card)] border border-slate-200 dark:border-slate-700 shadow-sm active:scale-95 transition cursor-pointer"
      @click="buka(m)"
    >
      <span :class="['w-10 h-10 rounded-xl flex items-center justify-center', m.warna]">
        <i :class="['fas text-base', m.ikon]"></i>
      </span>
      <span class="text-[11px] font-bold text-[var(--text-primary)] leading-none">{{
        m.label
      }}</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  // 'beranda' = menu cepat publik; 'portal' = baris ikon dashboard setelah login
  jenis: { type: String, default: 'beranda' }
})

// `to` kosong = layarnya belum dibangun (F2/F6/F7) -> "segera hadir".
const MENU = {
  quran: {
    kunci: 'quran',
    label: "Al-Qur'an",
    ikon: 'fa-book-quran',
    warna: 'bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300'
  },
  wirid: {
    kunci: 'wirid',
    label: 'Wirid',
    ikon: 'fa-book-open',
    warna: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
  },
  kiblat: {
    kunci: 'kiblat',
    label: 'Kiblat',
    ikon: 'fa-compass',
    warna: 'bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
  },
  sholat: {
    kunci: 'sholat',
    label: 'Jadwal Sholat',
    ikon: 'fa-mosque',
    warna: 'bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
  },
  // Sementara ke kalender publik; layar daftar Agenda menyusul di F4.
  agenda: {
    kunci: 'agenda',
    label: 'Agenda',
    ikon: 'fa-calendar-check',
    warna: 'bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    to: '/umum/kalender'
  }
}
const URUTAN = {
  beranda: ['kiblat', 'quran', 'agenda', 'wirid'],
  portal: ['quran', 'wirid', 'kiblat', 'sholat']
}

const router = useRouter()
const toast = useToast()
const daftar = computed(() => (URUTAN[props.jenis] || URUTAN.beranda).map((k) => MENU[k]))

function buka(m) {
  if (m.to) router.push(m.to)
  else toast.info(`${m.label} segera hadir, insyaAllah.`)
}
</script>
