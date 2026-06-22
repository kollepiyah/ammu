<template>
  <!-- Electron Desktop -> shell Ribbon (Office/Win11). Selain itu (browser/HP/PWA) -> shell lama. -->
  <RibbonLayout v-if="useRibbon" />
  <AppLayout v-else />
</template>

<script setup>
// AppShell — parent layout di router. Memilih shell sesuai platform:
//  - Electron  -> RibbonLayout (redesign desktop)
//  - lainnya   -> AppLayout (sidebar + header + bottom-nav lama, tak berubah)
import RibbonLayout from '@/components/ribbon/RibbonLayout.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDesktopShell } from '@/composables/useDesktopShell'

const { useRibbon } = useDesktopShell()
</script>
