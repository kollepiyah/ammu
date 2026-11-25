<template>
  <div
    class="h-screen flex flex-col overflow-hidden bg-[var(--bg-page)] text-[var(--text-primary)]"
  >
    <!-- Wilayah publik (F1 blueprint Ammu publik): header ringkas + 5 tab bawah. Komentar
         sengaja DI DALAM akar: di luar, mode dev menjadikannya fragment dan <transition> App
         macet saat meninggalkan layar ini. -->
    <!-- Kyai 25 Nov 2026: top bar hijau tetap (terang & gelap), menyambung kartu Hijriah -->
    <header class="topbar-hijau shrink-0 flex items-center justify-between gap-3 px-4 text-white">
      <!-- Kyai 25 Nov 2026: cukup tulisan nama aplikasi seperti header Portal, tanpa logo -->
      <h2 class="text-base font-black text-white tracking-tight truncate">
        {{ namaApp }}
      </h2>
      <button
        v-haptic
        type="button"
        class="shrink-0 flex items-center gap-1.5 text-sm font-bold px-1 py-1 text-white hover:opacity-80 transition cursor-pointer max-w-[45%]"
        @click="bukaPortal"
      >
        <i :class="['fas', auth.isLoggedIn ? 'fa-user' : 'fa-right-to-bracket']"></i>
        <span class="truncate">{{ auth.isLoggedIn ? namaSingkat : 'Masuk' }}</span>
      </button>
    </header>

    <main id="app-scroll" class="flex-1 overflow-y-auto custom-scrollbar">
      <div class="akar-halaman"><router-view /></div>
    </main>

    <nav
      class="app-bottom-nav shrink-0 flex items-stretch border-t border-[var(--border-subtle)] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-[0_-4px_18px_rgba(15,23,42,0.07)]"
      style="padding-bottom: env(safe-area-inset-bottom)"
      aria-label="Navigasi bawah"
    >
      <component
        :is="tab.to ? RouterLink : 'button'"
        v-for="tab in TABS"
        :key="tab.nama"
        v-bind="tab.to ? { to: tab.to } : { type: 'button' }"
        class="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-all duration-150 cursor-pointer"
        :class="
          aktif(tab) ? 'text-teal-600 dark:text-teal-300' : 'text-slate-500 dark:text-slate-400'
        "
        :aria-label="tab.nama"
        @click="!tab.to && bukaPortal()"
      >
        <i :class="['fas text-lg', tab.ikon]"></i>
        <span class="text-[10px] font-bold leading-none">{{ tab.nama }}</span>
      </component>
    </nav>
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'

const TABS = [
  { nama: 'Beranda', to: '/umum', ikon: 'fa-house' },
  { nama: 'Channel', to: '/umum/channel', ikon: 'fa-play' },
  { nama: 'Kalender', to: '/umum/kalender', ikon: 'fa-calendar-days' },
  // Portal: sudah login -> aplikasi lama (dashboard); belum -> layar masuk.
  { nama: 'Portal', ikon: 'fa-building-columns' },
  { nama: 'Pengaturan', to: '/umum/pengaturan', ikon: 'fa-gear' }
]

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const settings = useSettingsStore()

// Sama dengan AppHeader: Teks Header Bar > Nama Aplikasi > bawaan.
const namaApp = computed(
  () => settings.settings?.txtHeaderBar || settings.settings?.txtAppName || 'Ammu Online'
)
const namaSingkat = computed(() => String(auth.sesiAktif?.nama || 'Portal').split(/[\s,]+/)[0])

function aktif(tab) {
  if (!tab.to) return false
  return tab.to === '/umum' ? route.path === '/umum' : route.path.startsWith(tab.to)
}
function bukaPortal() {
  router.push(auth.isLoggedIn ? '/dashboard' : '/login')
}
</script>
