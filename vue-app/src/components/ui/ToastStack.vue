<script setup>
import { computed } from 'vue'
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
import { useUiStore } from '@/stores/ui'
import { useMobileShell } from '@/composables/useMobileShell'

const ui = useUiStore()
const { isMobile } = useMobileShell()

const toasterTheme = computed(() => (ui.isDark ? 'dark' : 'light'))
const toasterPosition = computed(() => (isMobile.value ? 'top-center' : 'bottom-right'))
</script>

<template>
  <!-- vue-sonner: notifikasi stackable, swipe-to-dismiss di HP, sinkron Light/Dark -->
  <Toaster
    class="ToastStack"
    :theme="toasterTheme"
    :position="toasterPosition"
    :rich-colors="true"
    :close-button="true"
    close-button-position="top-right"
    :expand="false"
    :visible-toasts="4"
    :offset="isMobile ? 'max(16px, env(safe-area-inset-top))' : '20px'"
    :toast-options="{
      style: {
        fontFamily: `'Plus Jakarta Sans', 'Inter', system-ui, sans-serif`,
        borderRadius: '14px',
        padding: '13px 16px',
        boxShadow: '0 10px 28px -6px rgba(15, 23, 42, 0.18)'
      }
    }"
  />
</template>
