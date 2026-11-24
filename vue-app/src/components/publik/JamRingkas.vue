<template>
  <!-- Kartu jam ringkas satu baris (blueprint 3.1) — pindahan kartu jam dashboard -->
  <div
    class="jam-ringkas relative overflow-hidden rounded-2xl text-white px-4 py-3 shadow-sm flex items-center justify-between gap-3"
  >
    <svg
      class="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="pola-jam-ringkas"
          x="0"
          y="0"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path d="M14 0 L28 14 L14 28 L0 14 Z" fill="none" stroke="#5EEAD4" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pola-jam-ringkas)" />
    </svg>
    <div class="relative min-w-0">
      <p class="font-arabic text-lg leading-tight text-teal-100 truncate" dir="rtl">{{ hijri }}</p>
      <p class="text-[11px] text-white/80 mt-0.5 truncate">{{ hari }}, {{ masehi }}</p>
    </div>
    <div class="relative text-right shrink-0 leading-none">
      <span class="text-3xl font-black tabular-nums">{{ jam }}:{{ menit }}</span>
      <span class="text-xs font-mono text-white/75 ml-0.5">{{ detik }}</span>
    </div>
  </div>
</template>

<script setup>
import { useClock } from '@/composables/useClock'

const { jam, menit, detik, hari, hijri, masehi } = useClock()
</script>

<style scoped>
.jam-ringkas {
  background: linear-gradient(135deg, #0f766e 0%, #134e4a 100%);
}
:global(.dark) .jam-ringkas {
  background: linear-gradient(135deg, #134e4a 0%, #0f172a 100%);
}
</style>
