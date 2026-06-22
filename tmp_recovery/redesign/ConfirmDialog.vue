<script setup>
import { computed } from 'vue'
import { useUiStore } from '@/stores/ui'
import { AlertTriangle } from 'lucide-vue-next'
import UiButton from './UiButton.vue'

const ui = useUiStore()
const state = computed(() => ui.confirmState)

function close(result) {
  ui.confirmResolve(result)
}

function onBackdrop(e) {
  if (e.target === e.currentTarget) close(false)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="state.open"
        class="fixed inset-0 z-[9998] bg-[var(--bg-overlay)] backdrop-blur-sm flex items-center justify-center p-4"
        @click="onBackdrop"
      >
        <div
          class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] max-w-md w-full p-6"
        >
          <div class="flex items-center gap-3 mb-3">
            <div
              v-if="state.danger"
              class="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--color-danger-soft)] flex items-center justify-center text-[var(--color-danger-text)] shrink-0"
            >
              <AlertTriangle class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-bold text-[var(--text-primary)] leading-tight">
              {{ state.title }}
            </h3>
          </div>
          <div
            class="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed"
            v-html="state.message"
          ></div>
          <div class="flex justify-end gap-2">
            <UiButton
              variant="ghost"
              size="md"
              @click="close(false)"
            >
              {{ state.cancelText }}
            </UiButton>
            <UiButton
              :variant="state.danger ? 'danger' : 'primary'"
              size="md"
              @click="close(true)"
            >
              {{ state.confirmText }}
            </UiButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
