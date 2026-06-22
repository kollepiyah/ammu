<script setup>
// v.21.80.0526: Quick Actions Pesantren Modern — unified olive bg + gold accent untuk icon.
// Hilangkan per-path rainbow gradient → satu palette konsisten.
// Desktop: row penuh (no empty space), mobile: scroll horizontal.
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMenus } from '@/composables/useMenus'

const router = useRouter()
const { menus } = useMenus()

// Skip Beranda (sudah dilihat sekarang) + Profil (di dropdown header)
const SKIP_PATHS = ['/dashboard', '/profil']

const actions = computed(() => {
  return menus.value
    .filter((m) => m.available && !SKIP_PATHS.includes(m.path))
    .map((m) => ({
      icon: m.icon,
      label: m.name,
      to: m.path
    }))
})

function go(to) {
  if (to.startsWith('/legacy/')) {
    window.location.href = to
    return
  }
  router.push(to)
}
</script>

<template>
  <!-- v.21.80.0526: Quick Actions Pesantren Modern slider horizontal — olive primary + gold icon -->
  <div class="flex gap-2 md:gap-2.5 overflow-x-auto pb-1 justify-start snap-x snap-mandatory scrollbar-thin">
    <button
      v-for="act in actions"
      :key="act.to"
      @click="go(act.to)"
      :class="[
        'group flex items-center justify-center snap-start',
        'w-10 h-10 md:w-11 md:h-11',
        'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]',
        'border border-[var(--color-accent)]/40',
        'rounded-[var(--radius-full)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 hover:scale-105 active:translate-y-0',
        'transition-all duration-200 ease-out cursor-pointer flex-shrink-0'
      ]"
      :title="act.label"
      :aria-label="act.label"
    >
      <i :class="['fas', act.icon, 'text-sm text-[var(--color-accent)] drop-shadow']"></i>
    </button>
  </div>
</template>
