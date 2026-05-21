<script setup>
// v.63.0526: Naik Kelas / Kenaikan bridge view — link ke legacy untuk implementasi lengkap
// Full Vue port di-defer karena schema-based matrix kelas × items × ceremonial dates kompleks
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const isAdmin = computed(() => {
  const s = auth.sesiAktif
  const rs = s?.role_sistem || ''
  return s?.role === 'admin' || ['admin', 'super_admin'].includes(rs)
})

function bukaLegacy() {
  // Hard navigate ke legacy + auto-show page kenaikan
  window.location.href = '/legacy/#kenaikan'
}
</script>

<template>
  <div class="p-3 md:p-5 max-w-3xl mx-auto space-y-4">
    <!-- Header -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h2 class="text-lg md:text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
        <i class="fas fa-graduation-cap text-amber-600"></i>Naik Kelas / Kenaikan Jilid
      </h2>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
        Kontrol kenaikan kelas, jilid, dan mutasi santri per lembaga
      </p>
    </div>

    <!-- Access guard -->
    <div v-if="!isAdmin" class="bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700 rounded-2xl p-5 text-center">
      <i class="fas fa-lock text-3xl text-rose-600 mb-2"></i>
      <p class="text-sm font-bold text-rose-700 dark:text-rose-300">Akses Ditolak</p>
      <p class="text-xs text-rose-600 dark:text-rose-400 mt-1">
        Hanya admin / super admin yang bisa memproses kenaikan kelas.
      </p>
    </div>

    <!-- Bridge card to legacy -->
    <div v-if="isAdmin" class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-5 md:p-6 border-2 border-amber-200 dark:border-amber-700 shadow-sm">
      <div class="flex items-start gap-3 mb-4">
        <div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-800 flex items-center justify-center">
          <i class="fas fa-info-circle text-2xl text-amber-700 dark:text-amber-300"></i>
        </div>
        <div class="flex-1">
          <h3 class="text-base md:text-lg font-black text-slate-800 dark:text-white">Fitur Lengkap di Versi Lama</h3>
          <p class="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            Kartu Kenaikan dengan matrix kelas × items × ceremonial dates masih live di sistem lama. Vue migration di-defer karena schema kompleks (Qiraati: jilid 1-6 + Al-Qur'an, Sekolah: kelas 1-6 + cawu, dll).
          </p>
        </div>
      </div>

      <ul class="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 ml-1 mb-5">
        <li class="flex items-start gap-2">
          <i class="fas fa-check text-emerald-600 mt-0.5"></i>
          <span>Kartu Kenaikan per santri (matrix kelas)</span>
        </li>
        <li class="flex items-start gap-2">
          <i class="fas fa-check text-emerald-600 mt-0.5"></i>
          <span>Riwayat kenaikan + cetak laporan</span>
        </li>
        <li class="flex items-start gap-2">
          <i class="fas fa-check text-emerald-600 mt-0.5"></i>
          <span>Pengaturan schema kelas + items per lembaga</span>
        </li>
        <li class="flex items-start gap-2">
          <i class="fas fa-check text-emerald-600 mt-0.5"></i>
          <span>Mutasi antar lembaga / kelas</span>
        </li>
      </ul>

      <button
        @click="bukaLegacy"
        class="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black py-3 rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2 transition"
      >
        <i class="fas fa-external-link-alt"></i>
        <span>Buka di Sistem Lama</span>
      </button>
      <p class="text-center text-[10px] text-slate-500 dark:text-slate-400 mt-3">
        Vue 3 · Phase 5.22 bridge — full migration v.65+
      </p>
    </div>
  </div>
</template>
