<template>
  <div class="rb-rgroup">
    <div class="rb-rgroup-items">
      <!-- item besar / widget -->
      <template v-for="(it, i) in bigs" :key="'b' + i">
        <RibbonClock v-if="it.type === 'clock'" />
        <RibbonButton v-else :item="it" :act="act" />
      </template>
      <!-- item kecil/toggle ditumpuk per 3 -->
      <div v-for="(st, i) in stacks" :key="'s' + i" class="rb-rgroup-stack">
        <RibbonButton v-for="(it, j) in st" :key="j" :item="it" :act="act" />
      </div>
    </div>
    <div class="rb-rgroup-label">{{ group.label }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RibbonButton from './RibbonButton.vue'
import RibbonClock from './RibbonClock.vue'

const props = defineProps({
  group: { type: Object, required: true },
  act: { type: Function, required: true }
})

const bigs = computed(() => props.group.items.filter((i) => ['large', 'clock'].includes(i.type)))
const stacks = computed(() => {
  const smalls = props.group.items.filter((i) => ['small', 'toggle'].includes(i.type))
  const out = []
  for (let i = 0; i < smalls.length; i += 3) out.push(smalls.slice(i, i + 3))
  return out
})
</script>
