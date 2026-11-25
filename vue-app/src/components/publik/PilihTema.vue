<template>
  <!-- Pilihan tema Terang/Gelap/Otomatis — satu komponen untuk Pengaturan publik & tab Pengaturan
       Portal (Kyai 25 Nov 2026: tombol tema di top bar HP pindah ke sini). -->
  <div class="grid grid-cols-3 gap-2">
    <button
      v-for="t in PILIHAN_TEMA"
      :key="t.mode"
      type="button"
      class="py-2 rounded-xl text-xs font-bold border transition cursor-pointer"
      :class="
        ui.temaMode === t.mode
          ? 'bg-teal-600 border-teal-600 text-white'
          : 'border-slate-200 dark:border-slate-700 text-[var(--text-primary)]'
      "
      @click="ui.setTemaMode(t.mode)"
    >
      <i :class="['fas mr-1', t.ikon]"></i>{{ t.label }}
    </button>
  </div>
</template>

<script setup>
import { useUiStore } from '@/stores/ui'

const PILIHAN_TEMA = [
  { mode: 'terang', label: 'Terang', ikon: 'fa-sun' },
  { mode: 'gelap', label: 'Gelap', ikon: 'fa-moon' },
  { mode: 'otomatis', label: 'Otomatis', ikon: 'fa-circle-half-stroke' }
]
const ui = useUiStore()
</script>
