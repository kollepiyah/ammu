<template>
  <!-- v.65.3.0526: Page bg CREAM (match legacy), sidebar MINT (di AppSidebar.vue) -->
  <div class="h-screen flex overflow-hidden bg-amber-50/40 dark:bg-slate-900">
    <AppSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <AppHeader />
      <main class="flex-1 overflow-y-auto custom-scrollbar">
        <router-view />
      </main>
    </div>
    <!-- v.20.74.5.0526: BUGFIX — mount ConfirmDialog (sebelumnya tidak ke-render → tombol Logout stuck) -->
    <ConfirmDialog />
  </div>
</template>

<script setup>
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
</script>

<style>
/* Scrollbar tipis untuk sidebar + main content */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(100, 116, 139, 0.3);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(100, 116, 139, 0.5);
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(148, 163, 184, 0.25);
}
</style>
