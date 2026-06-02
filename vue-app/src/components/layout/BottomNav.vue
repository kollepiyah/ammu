<template>
  <!-- v.91.0626: bottom nav mobile (Android/PWA). 5 tab role-adaptif; Notifikasi = halaman penuh -->
  <nav
    class="app-bottom-nav shrink-0 flex items-stretch border-t border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-[0_-2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_-2px_12px_rgba(0,0,0,0.4)]"
    style="padding-bottom: env(safe-area-inset-bottom)"
    aria-label="Navigasi bawah"
  >
    <RouterLink
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
      class="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition cursor-pointer"
      :class="isActive(tab) ? 'text-teal-600 dark:text-teal-300' : 'text-[var(--text-tertiary)]'"
      :aria-label="tab.name"
    >
      <span class="relative">
        <i :class="['fas text-lg', tab.icon]"></i>
        <span
          v-if="tab.notif && unreadCount > 0"
          class="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center"
        >{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
      </span>
      <span class="text-[10px] font-bold leading-none">{{ tab.name }}</span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotifications } from '@/composables/useNotifications'

const route = useRoute()
const auth = useAuthStore()
const { unreadCount } = useNotifications()

const TABS = {
  santri: [
    { name: 'Beranda', path: '/dashboard', icon: 'fa-home' },
    { name: 'Pendidikan', path: '/capaian-prestasi', icon: 'fa-graduation-cap' },
    { name: 'Keuangan', path: '/tagihan', icon: 'fa-wallet' },
    { name: 'Notifikasi', path: '/notifikasi', icon: 'fa-bell', notif: true },
    { name: 'Profil', path: '/profil', icon: 'fa-user' }
  ],
  guru: [
    { name: 'Beranda', path: '/dashboard', icon: 'fa-home' },
    { name: 'Pendidikan', path: '/santri', icon: 'fa-users' },
    { name: 'Keuangan', path: '/personal', icon: 'fa-wallet' },
    { name: 'Notifikasi', path: '/notifikasi', icon: 'fa-bell', notif: true },
    { name: 'Profil', path: '/profil', icon: 'fa-user' }
  ],
  admin: [
    { name: 'Beranda', path: '/dashboard', icon: 'fa-home' },
    { name: 'Pendidikan', path: '/santri', icon: 'fa-users' },
    { name: 'Keuangan', path: '/keuangan', icon: 'fa-wallet' },
    { name: 'Notifikasi', path: '/notifikasi', icon: 'fa-bell', notif: true },
    { name: 'Profil', path: '/profil', icon: 'fa-user' }
  ]
}

const tabs = computed(() => TABS[auth.sesiAktif?.role] || TABS.santri)
function isActive(tab) {
  return route.path === tab.path || route.path.startsWith(tab.path + '/')
}
</script>
