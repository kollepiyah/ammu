<template>
  <div class="rb-tabbar">
    <button class="rb-tab-file" type="button" @click="$emit('file')">File</button>
    <button
      v-for="t in tabs"
      :key="t.id"
      class="rb-tab"
      :class="{ active: t.id === activeTabId }"
      type="button"
      @click="$emit('select', t.id)"
    >
      {{ t.name }}
    </button>
    <div class="rb-tabbar-spacer"></div>
    <button class="rb-tab-share" type="button" @click="$emit('share')">
      <RibbonIcon name="broadcast" :size="15" /> Bagikan
    </button>
  </div>
</template>

<script setup>
import RibbonIcon from './RibbonIcon.vue'

defineProps({
  tabs: { type: Array, default: () => [] },
  activeTabId: { type: String, default: 'home' }
})
defineEmits(['select', 'file', 'share'])
</script>
