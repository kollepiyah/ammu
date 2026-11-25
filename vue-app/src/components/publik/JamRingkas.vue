<template>
  <!-- Kartu Hijriah + sholat berikutnya (Kyai 25 Nov 2026). Menyambung top bar hijau: motif
       berlian satu lembar dari status bar (.lanjut-topbar di main.css), sudut bawah membulat.
       Jam digital dihapus — jam sudah ada di bilah HP. Ketuk → layar Jadwal Sholat. -->
  <button
    v-haptic
    type="button"
    class="jam-ringkas lanjut-topbar selebar-layar relative w-full overflow-hidden rounded-b-3xl text-white text-left px-4 pt-3 pb-4 flex items-start justify-between gap-3 cursor-pointer"
    @click="router.push(tujuan)"
  >
    <div class="relative min-w-0 pt-0.5">
      <p class="font-arabic text-xl leading-tight text-teal-100 truncate" dir="rtl">{{ hijri }}</p>
      <p class="text-xs text-white/85 mt-1 truncate">{{ hariTampil }}, {{ masehi }}</p>
    </div>
    <div class="relative text-right shrink-0 leading-none">
      <p class="text-[11px] text-white/90 truncate max-w-[9rem] ml-auto">
        <i class="fas fa-location-dot text-red-400 mr-1"></i>{{ tempat }}
      </p>
      <!-- Huruf lebih ringan dari font-black (Kyai: "kaku"). -->
      <p class="jam-sholat text-[2rem] font-semibold tabular-nums mt-1">
        {{ formatMenit(berikutnya.menit) }}
      </p>
      <!-- Nama waktu sebaris dengan sisa waktunya (Kyai), bukan di samping jam. -->
      <p class="text-[11px] text-white/80 mt-1">
        <b class="font-bold text-white">{{ NAMA_WAKTU[berikutnya.kunci] }}</b> · dalam
        {{ formatSisa(berikutnya.sisa) }}
      </p>
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
// formatHari menghasilkan "RABU" (dipakai kartu jam lama); di sini "Rabu".
const hariTampil = computed(() => hari.value.charAt(0) + hari.value.slice(1).toLowerCase())
</script>

<style scoped>
.jam-sholat {
  letter-spacing: -0.02em;
  line-height: 1;
}
</style>
