<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import DashboardGreeting from '@/components/dashboard/DashboardGreeting.vue'
import DashboardJamHijri from '@/components/dashboard/DashboardJamHijri.vue'
import DashboardKalender from '@/components/dashboard/DashboardKalender.vue'
import DashboardPosts from '@/components/dashboard/DashboardPosts.vue'
import DashboardQuickActions from '@/components/dashboard/DashboardQuickActions.vue'
// v.21.17.0526: AdminStatsCharts DIHAPUS dari beranda — sudah ada di menu /statistik (kyai req)

const router = useRouter()
const auth = useAuthStore()

function goKalenderFull() {
  router.push('/kalender')
}
function goPosts() {
  router.push('/posts')
}

const isAdmin = computed(() => auth.isAdmin || auth.sesiAktif?.role === 'admin')
</script>

<template>
  <!-- v.72.6.0526: Beranda 2-col layout match legacy (left: greeting+jam, right: kalender list) -->
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- Row 1: Greeting (left col) + Kalender (right col) — desktop only, stacked di mobile -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="space-y-4">
        <DashboardGreeting />
        <DashboardJamHijri />
      </div>
      <DashboardKalender @see-all="goKalenderFull" />
    </div>

    <!-- Quick Actions per-role (Card Style ala Rapor) -->
    <DashboardQuickActions />

    <!-- v.72.7: Buat Postingan kecilin (admin only) -->
    <button
      v-if="isAdmin"
      @click="goPosts"
      class="w-full bg-gradient-to-br from-teal-600 dark:from-teal-800 to-emerald-700 dark:to-emerald-900 rounded-xl px-4 py-2.5 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition flex items-center justify-between gap-3 cursor-pointer"
    >
      <span class="flex items-center gap-2 text-sm font-bold">
        <i class="fas fa-bullhorn text-white/90"></i>Buat Postingan
      </span>
      <i class="fas fa-arrow-right text-sm text-white/80"></i>
    </button>

    <!-- Ammu Channel: Postingan terbaru -->
    <DashboardPosts />

    <p class="text-center text-[10px] text-slate-400 dark:text-[var(--text-secondary)] pt-2">
      <i class="fas fa-circle-info mr-1"></i>Portal MU · Vue 3 SPA · v.21.15.0526
    </p>
  </div>
</template>
