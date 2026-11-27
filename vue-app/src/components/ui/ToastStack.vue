<script setup>
// ToastStack — notifikasi ringkas semi-transparan di pojok kanan bawah (Kyai 27 Nov 2026).
// Dirender langsung dari ui.toasts via Teleport ke body agar selalu muncul instan & andal
// di Android WebView, iOS PWA, maupun desktop, dan tidak terhalang menu bawah.
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useMobileShell } from '@/composables/useMobileShell'

const ui = useUiStore()
const route = useRoute()
const { showBottomNav } = useMobileShell()

// Saat bottom nav tampil (bukan login / bukan layar baca penuh), angkat sedikit di atas nav bawah.
const adaBottomNav = computed(
  () =>
    !route.meta?.layarBacaPenuh &&
    route.path !== '/login' &&
    route.path !== '/psb-form' &&
    (showBottomNav.value || route.path.startsWith('/umum'))
)

const gayaPosisi = computed(() => ({
  right: 'max(12px, env(safe-area-inset-right, 0px))',
  bottom: adaBottomNav.value
    ? 'calc(4.75rem + env(safe-area-inset-bottom, 0px))'
    : 'calc(1rem + env(safe-area-inset-bottom, 0px))'
}))

const IKON = {
  success: { cls: 'fa-circle-check text-emerald-300' },
  error: { cls: 'fa-circle-xmark text-rose-300' },
  warning: { cls: 'fa-triangle-exclamation text-amber-300' },
  info: { cls: 'fa-circle-info text-teal-300' }
}
</script>

<template>
  <Teleport to="body">
    <div
      class="ToastStack fixed z-[9999] flex flex-col items-end gap-1.5 pointer-events-none"
      :style="gayaPosisi"
      role="status"
      aria-live="polite"
    >
      <TransitionGroup name="toast-pop">
        <div
          v-for="t in ui.toasts"
          :key="t.id"
          class="toast-item pointer-events-auto flex items-center gap-2 max-w-[min(270px,calc(100vw-24px))] px-3 py-2 rounded-xl text-xs font-semibold leading-snug text-white bg-slate-900/75 dark:bg-slate-900/80 border border-white/15 shadow-lg cursor-pointer"
          @click="ui.dismissToast(t.id)"
        >
          <i
            :class="['fas text-[13px] shrink-0', (IKON[t.type] || IKON.info).cls]"
            aria-hidden="true"
          ></i>
          <span class="min-w-0 break-words">{{ t.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-item {
  -webkit-backdrop-filter: blur(12px) saturate(1.4);
  backdrop-filter: blur(12px) saturate(1.4);
}
.toast-pop-enter-active,
.toast-pop-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}
.toast-pop-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.96);
}
.toast-pop-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.96);
}
</style>
