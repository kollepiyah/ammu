<template>
  <div class="rb-statusbar">
    <span :class="online ? 'dot-online' : 'dot-offline'" aria-hidden="true"></span>
    <span>{{ online ? 'Tersambung' : 'Luring' }} · {{ lembagaName }}</span>
    <span class="font-arabic" style="opacity: 0.8">{{ hijri }}</span>
    <div class="sb-r">
      <span style="opacity: 0.85"
        >{{ santriCount.toLocaleString('id-ID') }} santri · {{ guruCount }} guru</span
      >
      <span style="opacity: 0.7">{{ version }}</span>
      <span class="zoom"><RibbonIcon name="search" :size="13" /> 100%</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import RibbonIcon from './RibbonIcon.vue'
import { useCollectionsStore } from '@/stores/collections'
import { useSettingsStore } from '@/stores/settings'

const collections = useCollectionsStore()
collections.ensure('santri', 'guru') // langganan tunggal (sudah dipakai dashboard) — tak menambah beban
const { santri, guru } = storeToRefs(collections)
const settings = useSettingsStore()

const santriCount = computed(() => (santri.value || []).length)
const guruCount = computed(() => (guru.value || []).length)
const lembagaName = computed(
  () => settings.settings?.namaLembaga || settings.settings?.appTitle || 'Mambaul Ulum'
)
// versi tampil: ambil dari settings bila ada supaya tak menambah titik bump baru di kode
const version = computed(() => settings.settings?.appVersion || 'v.106.0626')

const hijri = computed(() => {
  try {
    return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      month: 'long',
      year: 'numeric'
    }).format(new Date())
  } catch (e) {
    return ''
  }
})

const online = ref(typeof navigator !== 'undefined' ? navigator.onLine : true)
function setOnline() {
  online.value = true
}
function setOffline() {
  online.value = false
}
onMounted(() => {
  window.addEventListener('online', setOnline)
  window.addEventListener('offline', setOffline)
})
onBeforeUnmount(() => {
  window.removeEventListener('online', setOnline)
  window.removeEventListener('offline', setOffline)
})
</script>
