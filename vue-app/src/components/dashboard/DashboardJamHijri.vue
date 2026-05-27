<template>
  <div class="ammu-jam relative overflow-hidden rounded-[var(--radius-xl)] text-white p-4 md:p-5 shadow-[var(--shadow-md)]">
    <!-- Background pattern decoration (gold subtle) -->
    <svg class="pattern absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="bp-dash" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M16 0 L32 16 L16 32 L0 16 Z" fill="none" stroke="#5EEAD4" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-dash)" />
    </svg>

    <div class="relative grid grid-cols-2 gap-3 items-center">
      <!-- Kiri: Hari + Hijri + Masehi -->
      <div class="text-left">
        <p class="text-[10px] font-bold uppercase tracking-widest bg-[#5EEAD4]/25 text-[#CCFBF1] inline-block px-2 py-0.5 rounded mb-2 border border-[#5EEAD4]/40">
          {{ hari }}
        </p>
        <p class="hijri-text text-xl md:text-2xl font-bold leading-tight text-[#CCFBF1]" dir="rtl">
          {{ hijri }}
        </p>
        <p class="text-xs italic mt-1 text-white/85">{{ masehi }}</p>
      </div>

      <!-- Kanan: Jam digital -->
      <div class="text-right">
        <p class="text-[10px] font-bold uppercase tracking-widest text-[#5EEAD4] mb-1">
          <i class="far fa-clock mr-1"></i>WIB
        </p>
        <div class="jam-wrap leading-none">
          <span class="text-3xl md:text-4xl font-black tabular-nums text-white">{{ jam }}:{{ menit }}</span>
        </div>
        <p class="text-xs font-mono mt-1 text-white/85">: {{ detik }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useClock } from '@/composables/useClock'

const { jam, menit, detik, hari, hijri, masehi } = useClock()
</script>

<style scoped>
.ammu-jam {
  /* v.21.80.0526: Olive deep gradient + subtle gold accent (Pesantren Modern) */
  background: linear-gradient(135deg, #0F766E 0%, #134E4A 100%);
}
:global(.dark) .ammu-jam,
.dark-mode .ammu-jam {
  background: linear-gradient(135deg, #0F172A 0%, #0F172A 100%);
}
.hijri-text {
  font-family: 'Scheherazade New', 'El Messiri', 'Noto Naskh Arabic', 'Amiri', 'Traditional Arabic', serif;
}
</style>
