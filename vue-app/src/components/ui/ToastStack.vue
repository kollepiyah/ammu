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

const colorFor = (type) => ({
  info: 'bg-sky-500',
  success: 'bg-emerald-500',
  error: 'bg-rose-500',
  warning: 'bg-amber-500'
}[type] || 'bg-slate-500')
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <transition-group name="toast">
        <div
          v-for="t in toasts"
          :key="t.id"
          class="pointer-events-auto rounded-lg shadow-lg text-white px-4 py-2.5 flex items-center gap-2 max-w-sm text-sm font-medium"
          :class="colorFor(t.type)"
        >
          <component :is="iconFor(t.type)" class="w-4 h-4 shrink-0" />
          <span class="flex-1">{{ t.msg }}</span>
        </div>
      </transition-group>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 200ms ease;
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
