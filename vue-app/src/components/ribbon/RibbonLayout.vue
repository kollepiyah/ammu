<template>
  <div class="ammu-ribbon-app" :data-theme="ui.isDark ? 'dark' : 'light'" :data-ribbon="density">
    <RibbonTitleBar />
    <RibbonTabBar
      :tabs="tabs"
      :active-tab-id="activeTabId"
      @select="selectTab"
      @file="backstage = true"
      @share="onShare"
    />
    <RibbonBar :tab="activeTabObj" :on-item="onItem" />

    <main class="rb-content custom-scrollbar">
      <router-view :key="rvKey" />
    </main>

    <RibbonStatusBar />

    <RibbonBackstage v-if="backstage" @close="backstage = false" />
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RibbonTitleBar from './RibbonTitleBar.vue'
import RibbonTabBar from './RibbonTabBar.vue'
import RibbonBar from './RibbonBar.vue'
import RibbonStatusBar from './RibbonStatusBar.vue'
import RibbonBackstage from './RibbonBackstage.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
import { useUiStore } from '@/stores/ui'
import { useRibbonNav } from '@/composables/useRibbonNav'
import { useUpdater } from '@/composables/useUpdater'
import { useFingerprintStore } from '@/stores/fingerprint'

const ui = useUiStore()
useUpdater().wire() // v.98: dengarkan status auto-update (in-app)
useFingerprintStore().init() // Fase 3: resume scheduler sinkron fingerprint pasca-restart (Electron-only shell)
const route = useRoute()
const router = useRouter()
const { tabs, activeTabId, activeTabObj, selectTab, onItem, refreshNonce, density } = useRibbonNav()

const backstage = ref(false)
const rvKey = computed(() => 'rb-' + refreshNonce.value)

function onShare() {
  router.push('/posts')
}

// v.98: di Electron, Home SELALU = dua-dasbor (/beranda). Cegah DashboardView (/dashboard) tampil —
// kalau tidak, greeting + jam muncul DOBEL (sudah ada widget-nya di pita). Watch (bukan onMounted)
// supaya tiap kali rute jadi /dashboard langsung dialihkan. Web/HP pakai shell lama -> tak terpengaruh.
watch(
  () => route.path,
  (p) => {
    if (p === '/dashboard') router.replace('/beranda')
  },
  { immediate: true }
)
</script>
