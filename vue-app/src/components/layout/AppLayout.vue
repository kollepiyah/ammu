<template>
  <!-- v.21.80.0526: Pesantren Modern (Olive + Gold). Page bg pakai CSS var. -->
  <div class="h-screen flex overflow-hidden bg-[var(--bg-page)] text-[var(--text-primary)]">
    <AppSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <AppHeader />
      <main class="flex-1 overflow-y-auto custom-scrollbar bg-[var(--bg-page)]">
        <!-- v.21.115.0528: Breadcrumb auto di top main, hide di dashboard -->
        <div class="px-3 md:px-5 pt-2 max-w-6xl mx-auto">
          <AppBreadcrumb />
        </div>
        <router-view />
      </main>
    </div>
    <ConfirmDialog />
  </div>
</template>

<script setup>
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import AppBreadcrumb from './AppBreadcrumb.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
</script>

<style>
/* Scrollbar tipis untuk sidebar + main content (themed via CSS vars di main.css) */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--border-default);
  border-radius: var(--radius-sm);
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-primary);
}
</style>
