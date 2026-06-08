<template>
  <!-- v.21.80.0526: Pesantren Modern (Olive + Gold). Page bg pakai CSS var. -->
  <!-- v.91.0626 FIX sidebar menggantung: root `relative` jadi containing-block utk drawer
       AppSidebar (absolute inset-y-0). Tanpa ini drawer nempel ke viewport (ICB), tingginya
       tak deterministik vs area app -> mengambang/tak sampai dasar. -->
  <div class="h-screen flex overflow-hidden relative bg-[var(--bg-page)] text-[var(--text-primary)]">
    <AppSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <AppHeader />
      <!-- v.91.0626: saat TANPA bottom-nav (browser/Electron/desktop) main yang own inset bawah
           supaya konten terakhir tak ketutup gesture bar; saat ADA bottom-nav, nav yang own inset. -->
      <main
        ref="mainRef"
        class="flex-1 overflow-y-auto custom-scrollbar bg-[var(--bg-page)]"
        :style="showBottomNav ? null : { paddingBottom: 'env(safe-area-inset-bottom)' }"
      >
        <!-- v.91.0626: pull-to-refresh indikator (mobile shell) — tinggi ikut tarikan, dorong konten -->
        <div
          v-if="showBottomNav"
          class="overflow-hidden flex items-end justify-center"
          :style="{ height: pullDist + 'px' }"
          aria-hidden="true"
        >
          <div class="pb-1.5 transition-opacity" :style="{ opacity: pullDist > 4 || pullBusy ? 1 : 0 }">
            <i v-if="pullBusy" class="fas fa-circle-notch fa-spin text-teal-500"></i>
            <i v-else class="fas fa-arrow-down text-teal-500 transition-transform duration-200" :style="{ transform: pullReady ? 'rotate(180deg)' : 'none' }"></i>
          </div>
        </div>
        <!-- v.91.0626: breadcrumb DIHAPUS total (semua halaman) atas permintaan kyai -> lebih rapi -->
        <!-- v.98.0626 (layout full): cap 1600px DILEPAS (kyai minta full edge-to-edge di SEMUA
             halaman). Wrapper w-full saja; pelepasan cap per-halaman (max-w-Nxl mx-auto -> none)
             + densify kolom grid diatur TERPUSAT di assets/main.css. Form tetap nyaman via .page-narrow. -->
        <div class="w-full">
          <router-view :key="rvKey" />
        </div>
      </main>
      <!-- v.91.0626: bottom nav hanya di Android/PWA + mobile -->
      <BottomNav v-if="showBottomNav" />
    </div>
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import BottomNav from './BottomNav.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
import { useMobileShell } from '@/composables/useMobileShell'
import { usePullToRefresh } from '@/composables/usePullToRefresh'
import { useEdgeSwipeBack } from '@/composables/useEdgeSwipeBack'

const router = useRouter()
const { showBottomNav } = useMobileShell()

// v.91.0626: pull-to-refresh -> re-mount view (re-subscribe data) via nonce key
const mainRef = ref(null)
const refreshNonce = ref(0)
const rvKey = computed(() => 'rv-' + refreshNonce.value)
async function doRefresh() {
  refreshNonce.value++
  await nextTick()
}
// v.91.0626 FIX: destructure ke binding top-level supaya ref AUTO-UNWRAP di template
// (ptr.refreshing sebelumnya = objek Ref -> selalu truthy -> spinner nyangkut).
const { distance: pullDist, refreshing: pullBusy, ready: pullReady } = usePullToRefresh(
  mainRef,
  doRefresh,
  { enabled: () => showBottomNav.value }
)

// v.91.0626: gesture back universal (swipe tepi kiri) — hanya di mobile shell (PWA/Capacitor)
useEdgeSwipeBack(router, () => showBottomNav.value)
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
