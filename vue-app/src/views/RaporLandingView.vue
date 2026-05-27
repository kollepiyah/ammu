<template>
  <div class="p-3 md:p-5 max-w-4xl mx-auto space-y-4">
    <!-- Header gradient (style match StatistikView) -->
    <div
      class="bg-gradient-to-br from-teal-600 dark:from-teal-800 to-teal-600 dark:to-teal-800 rounded-2xl p-5 md:p-6 text-white shadow-lg"
    >
      <p class="text-[11px] uppercase font-black tracking-widest opacity-90">
        <i class="fas fa-graduation-cap mr-1"></i>Menu Rapor
      </p>
      <h1 class="text-2xl md:text-3xl font-black mt-1">Rapor Semester</h1>
      <p class="text-xs opacity-90 mt-1">Pilih kategori rapor untuk input nilai semester</p>
    </div>

    <!-- 2 cards: Qiraati vs Diniyah -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        @click="router.push('/rapor-qiraati')"
        class="bg-gradient-to-br from-emerald-500 dark:from-emerald-700 to-teal-600 dark:to-teal-800 hover:shadow-lg hover:scale-[1.02] text-white p-8 rounded-2xl shadow-md cursor-pointer transition text-left"
      >
        <i class="fas fa-mosque text-3xl opacity-80"></i>
        <h3 class="text-2xl font-black mt-3 uppercase tracking-tight">Rapor Qiraati</h3>
        <p class="text-[11px] opacity-90 mt-1">
          Rapor semester ngaji (TPQ Pagi/Sore, Pra PTPT, PTPT, PPPH)
        </p>
      </button>
      <button
        @click="router.push('/rapor-diniyah')"
        class="bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-600 dark:to-cyan-800 hover:shadow-lg hover:scale-[1.02] text-white p-8 rounded-2xl shadow-md cursor-pointer transition text-left"
      >
        <i class="fas fa-book-open text-3xl opacity-80"></i>
        <h3 class="text-2xl font-black mt-3 uppercase tracking-tight">Rapor Diniyah</h3>
        <p class="text-[11px] opacity-90 mt-1">
          Rapor semester diniyah (santri SDI / PKBM / kelas sekolah)
        </p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
