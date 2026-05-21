<script setup>
import { computed } from 'vue'
import { useUiStore } from '@/stores/ui'
import { AlertTriangle } from 'lucide-vue-next'

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
        class="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        @click="onBackdrop"
      >
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full p-5">
          <div class="flex items-center gap-3 mb-3">
            <div
              v-if="state.danger"
              class="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600"
            >
              <AlertTriangle class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-bold">{{ state.title }}</h3>
          </div>
          <div class="text-sm text-slate-600 dark:text-slate-300 mb-5" v-html="state.message"></div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm hover:bg-slate-300 dark:hover:bg-slate-600"
              @click="close(false)"
            >
              {{ state.cancelText }}
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded-lg text-white font-medium text-sm"
              :class="state.danger ? 'bg-rose-600 hover:bg-rose-700' : 'bg-teal-600 hover:bg-teal-700'"
              @click="close(true)"
            >
              {{ state.confirmText }}
            </button>
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
