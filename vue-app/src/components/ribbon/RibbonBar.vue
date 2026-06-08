<template>
  <div class="rb-ribbon" role="toolbar" :aria-label="'Pita ' + (tab?.name || '')">
    <RibbonGroup v-for="(g, i) in tab?.groups || []" :key="i" :group="g" :act="act" />
  </div>
</template>

<script setup>
import RibbonGroup from './RibbonGroup.vue'

const props = defineProps({
  tab: { type: Object, default: null },
  onItem: { type: Function, required: true }
})

function act(item) {
  props.onItem(item, props.tab?.id)
}
</script>
