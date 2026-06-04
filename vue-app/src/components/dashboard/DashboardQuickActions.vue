<script setup>
// v.21.84.0527: Quick Actions — gradient warna-warni per icon (match live v.21.10).
// Static class strings agar Tailwind JIT bisa scan & compile.
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMenus } from '@/composables/useMenus'

const router = useRouter()
const { menus } = useMenus()
const SKIP_PATHS = ['/dashboard', '/profil']

// Mapping warna gradient per FA icon — extracted from live ammuonline.web.app v.21.10
// Format: full Tailwind class string (static literal supaya JIT bisa pickup)
const COLOR_BY_ICON = {
  'fa-chart-pie':           'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900',
  'fa-calendar-alt':        'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900',
  'fa-id-badge':            'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900',
  'fa-users':               'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900',
  'fa-chalkboard-teacher':  'from-teal-600 dark:from-teal-800 to-teal-800',
  'fa-level-up-alt':        'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900',
  'fa-book-open':           'from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900',
  'fa-graduation-cap':      'from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900',
  'fa-fingerprint':         'from-cyan-600 dark:from-cyan-800 to-cyan-800',
  'fa-clipboard-user':      'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900',
  'fa-calendar-check':      'from-cyan-500 dark:from-cyan-700 to-teal-700 dark:to-teal-900',
  'fa-database':            'from-teal-700 dark:from-teal-900 to-teal-900',
  'fa-clipboard-list':      'from-emerald-600 dark:from-emerald-800 to-emerald-800',
  'fa-chart-line':          'from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900',
  'fa-cash-register':       'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900',
  'fa-hand-holding-usd':    'from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900',
  'fa-wallet':          'from-emerald-600 dark:from-emerald-800 to-emerald-800',
  'fa-book':                'from-teal-700 dark:from-teal-900 to-teal-900',
  'fa-handshake':           'from-cyan-400 dark:from-cyan-700 to-cyan-600 dark:to-cyan-800',
  'fa-sliders-h':           'from-slate-500 to-slate-700',
  'fa-bullhorn':            'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900',
  'fa-comment-dots':        'from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900',
  'fa-cog':                 'from-slate-500 to-slate-700'
}
const DEFAULT_GRAD = 'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900'

function colorFor(iconClass) {
  // iconClass datang dari menu config (mis. 'fa-users'). Cari di map, default teal.
  if (!iconClass) return DEFAULT_GRAD
  const key = String(iconClass).trim()
  return COLOR_BY_ICON[key] || DEFAULT_GRAD
}

const actions = computed(() => {
  return menus.value
    .filter((m) => m.available && !SKIP_PATHS.includes(m.path))
    .map((m) => ({ icon: m.icon, label: m.name, to: m.path }))
})

function go(to) {
  if (to.startsWith('/legacy/')) { window.location.href = to; return }
  router.push(to)
}
</script>

<template>
  <div class="qa-scroll flex gap-2 md:gap-2.5 overflow-x-auto pb-1 justify-start snap-x">
    <button
      v-for="act in actions"
      :key="act.to"
      @click="go(act.to)"
      :class="[
        'snap-start group flex items-center justify-center',
        'w-11 h-11 md:w-12 md:h-12',
        'bg-gradient-to-br', colorFor(act.icon),
        'rounded-[var(--radius-full)] shadow-[var(--shadow-sm)]',
        'hover:shadow-[var(--shadow-md)] hover:scale-110',
        'transition-all duration-200 ease-out cursor-pointer flex-shrink-0'
      ]"
      :title="act.label"
      :aria-label="act.label"
    >
      <i :class="['fas', act.icon, 'text-base text-white drop-shadow-sm']"></i>
    </button>
  </div>
</template>

<style scoped>
.qa-scroll::-webkit-scrollbar { display: none; }
.qa-scroll { scrollbar-width: none; -ms-overflow-style: none; }
</style>
