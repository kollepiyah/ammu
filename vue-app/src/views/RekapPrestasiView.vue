<template>
  <!-- v.69.0526: Rekap Prestasi sebagai category picker (match legacy) -->
  <div class="p-4 md:p-6 max-w-5xl mx-auto">
    <div class="bg-emerald-50/40 dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-emerald-100 dark:border-slate-700 shadow-sm">
      <div class="flex items-start gap-3 mb-4">
        <i class="fas fa-book-open text-emerald-700 dark:text-emerald-300 text-2xl"></i>
        <div>
          <h2 class="text-lg md:text-xl font-black text-slate-800 dark:text-white leading-tight">Rekap Prestasi</h2>
          <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Pilih kategori untuk input rekap prestasi bulanan.
          </p>
        </div>
      </div>

      <!-- v.72.7.0526: 2 cards compact (kyai minta kecilin) -->
      <div class="grid grid-cols-2 gap-2 md:gap-3">
        <button
          @click="goQiraati"
          class="group relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 rounded-xl p-3 md:p-4 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer flex flex-col gap-1"
        >
          <i class="fas fa-mosque text-lg md:text-xl drop-shadow"></i>
          <h3 class="text-sm md:text-base font-black leading-tight drop-shadow-sm">Rekap Qiraati</h3>
          <p class="text-[10px] md:text-xs text-white/90 font-medium leading-snug">
            TPQ Pagi · TPQ Sore · Pra PTPT · PTPT · PPPH
          </p>
        </button>

        <button
          @click="goDiniyah"
          class="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-700 hover:from-blue-600 hover:to-indigo-800 rounded-xl p-3 md:p-4 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer flex flex-col gap-1"
        >
          <i class="fas fa-book-open text-lg md:text-xl drop-shadow"></i>
          <h3 class="text-sm md:text-base font-black leading-tight drop-shadow-sm">Rekap Diniyah</h3>
          <p class="text-[10px] md:text-xs text-white/90 font-medium leading-snug">
            Mata pelajaran diniyah
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goQiraati() {
  router.push({ path: '/input-bulanan', query: { kategori: 'qiraati' } })
}
function goDiniyah() {
  router.push({ path: '/rekap-diniyah' })
}
</script>
