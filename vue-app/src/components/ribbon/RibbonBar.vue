<template>
  <div class="rb-ribbon" role="toolbar" :aria-label="'Pita ' + (tab?.name || '')">
    <RibbonGroup v-for="(g, i) in tab?.groups || []" :key="i" :group="g" :act="act" />

    <!-- v.98 full-native: grup kontekstual aksi halaman (Cetak/Ekspor/Tambah/dll) di ujung pita -->
    <div v-if="pageActions.length" class="rb-rgroup rb-rgroup-context">
      <div class="rb-rgroup-items">
        <div v-for="(st, si) in actionStacks" :key="si" class="rb-rgroup-stack">
          <button
            v-for="(a, j) in st"
            :key="j"
            type="button"
            class="rb-btn-sm"
            :class="{ 'rb-act-primary': a.primary }"
            :disabled="a.disabled"
            :title="a.label"
            @click="a.on && a.on()"
          >
            <span class="ic"><RibbonIcon :name="a.icon || 'grid'" :size="16" /></span>
            <span class="lab">{{ a.label }}</span>
          </button>
        </div>
      </div>
      <div class="rb-rgroup-label">Aksi Halaman</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RibbonGroup from './RibbonGroup.vue'
import RibbonIcon from './RibbonIcon.vue'
import { useRibbonContext } from '@/composables/useRibbonContext'

const props = defineProps({
  tab: { type: Object, default: null },
  onItem: { type: Function, required: true }
})

function act(item) {
  props.onItem(item, props.tab?.id)
}

const { pageActions } = useRibbonContext()
const actionStacks = computed(() => {
  const arr = pageActions.value || []
  const out = []
  for (let i = 0; i < arr.length; i += 3) out.push(arr.slice(i, i + 3))
  return out
})
</script>
