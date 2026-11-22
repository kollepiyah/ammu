<script setup>
// UiSheetModal.vue — Modal responsif modern:
//   - Mobile (<=767px): Bottom Sheet native-feel (vaul-vue) bisa di-swipe turun dgn jempol
//   - Desktop (>=768px): Dialog terpusat beranimasi halus (reka-ui) + focus trap + Esc
// Mendukung event 'android-back' (Capacitor back button) & prop dismissible.
import { computed, onMounted, onBeforeUnmount } from 'vue'
import {
  DrawerRoot,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerDescription
} from 'vaul-vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription
} from 'reka-ui'
import { X } from 'lucide-vue-next'
import { useMobileShell } from '@/composables/useMobileShell'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  maxWidth: { type: String, default: 'lg' }, // sm | md | lg | xl
  dismissible: { type: Boolean, default: true },
  accentTop: { type: Boolean, default: false },
  showClose: { type: Boolean, default: false },
  contentClass: { type: String, default: '' }
})

const emit = defineEmits(['update:open', 'close'])

const { isMobile } = useMobileShell()

const maxWidthClass = computed(() => ({
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl'
}[props.maxWidth] || 'max-w-lg'))

function requestClose() {
  if (!props.dismissible) return
  emit('update:open', false)
  emit('close')
}

function onOpenChange(val) {
  if (!val) {
    requestClose()
  } else {
    emit('update:open', true)
  }
}

function onInteractOutside(e) {
  if (!props.dismissible) e.preventDefault()
}

function onEscapeKeyDown(e) {
  if (!props.dismissible) e.preventDefault()
}

// Tombol / gesture back Android -> tutup modal, jangan navigasi halaman
function onAndroidBack(e) {
  if (props.open) {
    e.preventDefault()
    requestClose()
  }
}

onMounted(() => window.addEventListener('android-back', onAndroidBack))
onBeforeUnmount(() => window.removeEventListener('android-back', onAndroidBack))
</script>

<template>
  <!-- MOBILE: Native-feel Bottom Sheet (vaul-vue) -->
  <DrawerRoot
    v-if="isMobile"
    :open="open"
    :dismissible="dismissible"
    @update:open="onOpenChange"
  >
    <DrawerPortal>
      <DrawerOverlay
        class="modal-overlay fixed inset-0 z-[9990] bg-slate-950/60 backdrop-blur-[2px]"
      />
      <DrawerContent
        class="fixed inset-x-0 bottom-0 z-[9991] mt-24 flex max-h-[92dvh] flex-col rounded-t-3xl bg-[var(--bg-card)] border-t border-[var(--border-subtle)] shadow-2xl outline-none"
        :class="[
          accentTop ? 'border-t-4 border-t-teal-500' : '',
          contentClass
        ]"
        style="padding-bottom: max(1rem, env(safe-area-inset-bottom))"
      >
        <!-- Drag handle bar -->
        <div class="mx-auto mt-3 mb-1.5 h-1.5 w-11 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600" />

        <!-- Optional visible header (atau sr-only agar aksesibel tanpa warning) -->
        <div
          v-if="title || showClose"
          class="flex items-start justify-between gap-3 px-5 pt-2 pb-1 shrink-0"
        >
          <div class="min-w-0 flex-1">
            <DrawerTitle
              v-if="title"
              class="text-base font-bold text-[var(--text-primary)] leading-snug"
            >
              {{ title }}
            </DrawerTitle>
            <DrawerTitle v-else class="sr-only">Dialog</DrawerTitle>
            <DrawerDescription
              v-if="description"
              class="text-xs text-[var(--text-secondary)] mt-0.5"
            >
              {{ description }}
            </DrawerDescription>
            <DrawerDescription v-else class="sr-only">Konten dialog</DrawerDescription>
          </div>
          <button
            v-if="showClose && dismissible"
            type="button"
            class="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition cursor-pointer shrink-0"
            aria-label="Tutup"
            @click="requestClose"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
        <template v-else>
          <DrawerTitle class="sr-only">Dialog</DrawerTitle>
          <DrawerDescription class="sr-only">Konten dialog</DrawerDescription>
        </template>

        <div class="overflow-y-auto flex-1">
          <slot />
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>

  <!-- DESKTOP: Centered Modern Dialog (reka-ui) -->
  <DialogRoot v-else :open="open" @update:open="onOpenChange">
    <DialogPortal>
      <DialogOverlay
        class="modal-overlay ui-dialog-overlay fixed inset-0 z-[9990] bg-slate-950/60 backdrop-blur-sm"
      />
      <DialogContent
        class="ui-dialog-content fixed left-1/2 top-1/2 z-[9991] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 max-h-[90vh] flex flex-col rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-lg)] outline-none overflow-hidden"
        :class="[
          maxWidthClass,
          accentTop ? 'border-t-4 border-t-teal-500' : '',
          contentClass
        ]"
        @interact-outside="onInteractOutside"
        @escape-key-down="onEscapeKeyDown"
      >
        <div
          v-if="title || showClose"
          class="flex items-start justify-between gap-3 px-6 pt-5 pb-1 shrink-0"
        >
          <div class="min-w-0 flex-1">
            <DialogTitle
              v-if="title"
              class="text-lg font-bold text-[var(--text-primary)] leading-snug"
            >
              {{ title }}
            </DialogTitle>
            <DialogTitle v-else class="sr-only">Dialog</DialogTitle>
            <DialogDescription
              v-if="description"
              class="text-xs text-[var(--text-secondary)] mt-0.5"
            >
              {{ description }}
            </DialogDescription>
            <DialogDescription v-else class="sr-only">Konten dialog</DialogDescription>
          </div>
          <button
            v-if="showClose && dismissible"
            type="button"
            class="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition cursor-pointer shrink-0"
            aria-label="Tutup"
            @click="requestClose"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
        <template v-else>
          <DialogTitle class="sr-only">Dialog</DialogTitle>
          <DialogDescription class="sr-only">Konten dialog</DialogDescription>
        </template>

        <div class="overflow-y-auto flex-1 custom-scrollbar">
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
@keyframes dialogOverlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes dialogContentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -47%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
.ui-dialog-overlay[data-state='open'] {
  animation: dialogOverlayShow 160ms cubic-bezier(0.16, 1, 0.3, 1);
}
.ui-dialog-content[data-state='open'] {
  animation: dialogContentShow 190ms cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
