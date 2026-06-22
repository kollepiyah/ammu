<script setup>
import { computed } from 'vue'
import { useUiStore } from '@/stores/ui'
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-vue-next'

const ui = useUiStore()
const toasts = computed(() => ui.toasts)

const iconFor = (type) => ({
  info: Info,
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle
}[type] || Info)

// Map toast type to CSS-var semantic palette (soft bg + semantic text)
const styleFor = (type) => ({
  info: 'bg-[var(--color-info-soft)] text-[var(--color-info-text)] border-[var(--color-info)]',
  success: 'bg-[var(--color-success-soft)] text-[var(--color-success-text)] border-[var(--color-success)]',
  error: 'bg-[var(--color-danger-soft)] text-[var(--color-danger-text)] border-[var(--color-danger)]',
  warning: 'bg-[var(--color-warning-soft)] text-[var(--color-warning-text)] border-[var(--color-warning)]'
}[type] || 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-default)]')
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <transition-group name="toast">
        <div
          v-for="t in toasts"
          :key="t.id"
          class="pointer-events-auto rounded-[var(--radius-md)] shadow-[var(--shadow-md)] border px-4 py-2.5 flex items-center gap-2 max-w-sm text-sm font-medium backdrop-blur-sm"
          :class="styleFor(t.type)"
        >
          <component
            :is="iconFor(t.type)"
            class="w-4 h-4 shrink-0"
          />
          <span class="flex-1 leading-snug">{{ t.msg }}</span>
        </div>
      </transition-group>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 220ms ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
