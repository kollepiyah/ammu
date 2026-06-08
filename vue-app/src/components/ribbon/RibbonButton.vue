<template>
  <!-- TOGGLE (Tema / Ribbon) -->
  <button v-if="item.type === 'toggle'" class="rb-toggle" :data-on="toggleOn" type="button" @click="act(item)">
    <span class="ic"><RibbonIcon :name="item.icon" :size="16" /></span>
    <span class="lab">{{ item.label }}</span>
    <span class="sw" aria-hidden="true"></span>
  </button>

  <!-- LARGE -->
  <button
    v-else-if="item.type === 'large'"
    class="rb-btn-lg"
    :class="{ accent: item.accent }"
    type="button"
    :title="flatLabel"
    @click="act(item)"
  >
    <span class="ic"><RibbonIcon :name="item.icon" :size="item.accent ? 22 : 26" :stroke="1.6" /></span>
    <span class="lab">{{ item.label }}</span>
  </button>

  <!-- SMALL -->
  <button v-else class="rb-btn-sm" type="button" :title="flatLabel" @click="act(item)">
    <span class="ic"><RibbonIcon :name="item.icon" :size="16" /></span>
    <span class="lab">{{ item.label }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import RibbonIcon from './RibbonIcon.vue'
import { useUiStore } from '@/stores/ui'
import { useRibbonPrefs } from '@/composables/useRibbonPrefs'

const props = defineProps({
  item: { type: Object, required: true },
  act: { type: Function, required: true }
})

const ui = useUiStore()
const { density } = useRibbonPrefs()

const flatLabel = computed(() => String(props.item.label || '').replace(/\n/g, ' '))
const toggleOn = computed(() => {
  if (props.item.action === 'theme') return ui.isDark
  if (props.item.action === 'ribbon') return density.value === 'simple'
  return false
})
</script>
