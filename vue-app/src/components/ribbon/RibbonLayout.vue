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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import RibbonTitleBar from './RibbonTitleBar.vue'
import RibbonTabBar from './RibbonTabBar.vue'
import RibbonBar from './RibbonBar.vue'
import RibbonStatusBar from './RibbonStatusBar.vue'
import RibbonBackstage from './RibbonBackstage.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
import { useUiStore } from '@/stores/ui'
import { useRibbonNav } from '@/composables/useRibbonNav'

const ui = useUiStore()
const router = useRouter()
const { tabs, activeTabId, activeTabObj, selectTab, onItem, refreshNonce, density } = useRibbonNav()

const backstage = ref(false)
const rvKey = computed(() => 'rb-' + refreshNonce.value)

function onShare() {
  router.push('/posts')
}
</script>
