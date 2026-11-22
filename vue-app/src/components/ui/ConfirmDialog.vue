<script setup>
import { computed } from 'vue'
import { useUiStore } from '@/stores/ui'
import { AlertTriangle, HelpCircle } from 'lucide-vue-next'
import UiButton from './UiButton.vue'
import UiSheetModal from './UiSheetModal.vue'

const ui = useUiStore()
const state = computed(() => ui.confirmState)

function close(result) {
  ui.confirmResolve(result)
}
</script>

<template>
  <UiSheetModal
    :open="state.open"
    max-width="md"
    @close="close(false)"
  >
    <div class="p-5 sm:p-6">
      <div class="flex items-center gap-3 mb-3">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          :class="
            state.danger
              ? 'bg-[var(--color-danger-soft)] text-[var(--color-danger-text)]'
              : 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
          "
        >
          <AlertTriangle v-if="state.danger" class="w-5 h-5" />
          <HelpCircle v-else class="w-5 h-5" />
        </div>
        <h3 class="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-tight">
          {{ state.title }}
        </h3>
      </div>
      <div
        class="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed"
        v-html="state.message"
      ></div>
      <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
        <UiButton
          variant="ghost"
          size="md"
          class="w-full sm:w-auto"
          @click="close(false)"
        >
          {{ state.cancelText }}
        </UiButton>
        <UiButton
          :variant="state.danger ? 'danger' : 'primary'"
          size="md"
          class="w-full sm:w-auto"
          @click="close(true)"
        >
          {{ state.confirmText }}
        </UiButton>
      </div>
    </div>
  </UiSheetModal>
</template>
