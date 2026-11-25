<template>
  <!-- Kartu Hijriah + sholat berikutnya (Kyai 25 Nov 2026). Menyambung dengan top bar hijau:
       sudut atas lurus, sudut bawah membulat. Jam digital dihapus — jam sudah ada di bilah HP;
       tempatnya kini waktu sholat berikutnya. Ketuk → layar Jadwal Sholat. -->
  <button
    v-haptic
    type="button"
    class="jam-ringkas selebar-layar relative w-full overflow-hidden rounded-b-3xl text-white text-left px-4 pt-3 pb-4 flex items-start justify-between gap-3 cursor-pointer"
    @click="router.push(tujuan)"
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
    <div class="relative min-w-0 pt-0.5">
      <p class="font-arabic text-xl leading-tight text-teal-100 truncate" dir="rtl">{{ hijri }}</p>
      <p class="text-xs text-white/85 mt-1 truncate">{{ hari }}, {{ masehi }}</p>
    </div>
    <div class="relative text-right shrink-0 leading-none">
      <p class="text-[11px] text-white/90 truncate max-w-[9rem] ml-auto">
        <i class="fas fa-location-dot text-red-400 mr-1"></i>{{ tempat }}
      </p>
      <p class="mt-1.5">
        <span class="text-sm font-bold mr-1">{{ NAMA_WAKTU[berikutnya.kunci] }}</span>
        <span class="text-3xl font-black tabular-nums">{{ formatMenit(berikutnya.menit) }}</span>
      </p>
      <p class="text-[11px] text-white/75 mt-1">dalam {{ formatSisa(berikutnya.sisa) }}</p>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClock } from '@/composables/useClock'
import { useIbadah } from '@/composables/useIbadah'
import { NAMA_WAKTU, formatMenit, formatSisa, namaTempatPendek } from '@/utils/waktuSholat'

// Detik tak ditampilkan lagi — cukup berdetak tiap 30 dtk untuk pergantian hari.
const { hari, hijri, masehi } = useClock(30000)
const { berikutnya, lokasi } = useIbadah()
const router = useRouter()
const route = useRoute()
const tempat = computed(() => namaTempatPendek(lokasi.value))
const tujuan = computed(() => (route.path.startsWith('/umum') ? '/umum/sholat' : '/ibadah/sholat'))
</script>

<style scoped>
/* Teal sama dengan top bar (Kyai: menyambung), juga di mode gelap. Tanpa bayangan. */
.jam-ringkas {
  background: linear-gradient(180deg, #0f766e 0%, #134e4a 100%);
}
</style>
