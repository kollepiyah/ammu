<template>
  <!-- Kartu jadwal sholat Beranda publik (blueprint 3.1 butir 3). Ketuk → layar Jadwal Sholat. -->
  <button
    v-haptic
    type="button"
    class="w-full text-left bg-[var(--bg-card)] rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer active:scale-[0.99] transition"
    @click="router.push(tujuan)"
  >
    <div class="flex items-center justify-between gap-2">
      <h3 class="text-sm font-black text-[var(--text-primary)] flex items-center gap-2 min-w-0">
        <i class="fas fa-mosque text-teal-600"></i>
        <span class="truncate">Jadwal Sholat</span>
      </h3>
      <span class="text-[11px] text-[var(--text-secondary)] truncate">
        <i class="fas fa-location-dot mr-1"></i>{{ lokasi.nama }}
      </span>
    </div>
    <p class="text-xs text-[var(--text-secondary)] mt-1">
      Berikutnya:
      <b class="text-teal-700 dark:text-teal-300"
        >{{ NAMA_WAKTU[berikutnya.kunci] }} {{ formatMenit(berikutnya.menit) }}</b
      >
      · dalam {{ formatSisa(berikutnya.sisa) }}
    </p>
    <div class="grid grid-cols-5 gap-1.5 mt-3">
      <div
        v-for="k in WAKTU_WAJIB"
        :key="k"
        class="rounded-xl py-2 text-center"
        :class="
          k === berikutnya.kunci && !berikutnya.besok
            ? 'bg-teal-600 text-white'
            : 'bg-slate-50 dark:bg-slate-800 text-[var(--text-primary)]'
        "
      >
        <p class="text-[10px] font-bold opacity-80 leading-none">{{ NAMA_WAKTU[k] }}</p>
        <p class="text-sm font-black tabular-nums mt-1 leading-none">{{ jadwal.jam[k] }}</p>
      </div>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useIbadah } from '@/composables/useIbadah'
import { NAMA_WAKTU, WAKTU_WAJIB, formatMenit, formatSisa } from '@/utils/waktuSholat'

const router = useRouter()
const route = useRoute()
const { jadwal, berikutnya, lokasi } = useIbadah()
const tujuan = computed(() => (route.path.startsWith('/umum') ? '/umum/sholat' : '/ibadah/sholat'))
</script>
