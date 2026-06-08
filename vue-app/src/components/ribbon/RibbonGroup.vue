<template>
  <div class="rb-rgroup">
    <div class="rb-rgroup-items">
      <!-- item besar / widget -->
      <template v-for="(it, i) in bigs" :key="'b' + i">
        <RibbonClock v-if="it.type === 'clock'" />
        <div v-else-if="it.type === 'greeting'" class="rb-greet">
          <span class="rb-avatar-lg">
            <img v-if="fotoUrl" :src="fotoUrl" alt="" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover" />
            <template v-else>{{ initials }}</template>
          </span>
          <div>
            <div class="g1">{{ welcomeWord }}, {{ namaUser }}!</div>
            <div class="g2">Masuk sebagai <span class="rb-badge-admin">{{ roleLabel }}</span></div>
          </div>
        </div>
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
import { useRibbonUser } from '@/composables/useRibbonUser'

const props = defineProps({
  group: { type: Object, required: true },
  act: { type: Function, required: true }
})

const { welcomeWord, namaUser, roleLabel, fotoUrl, initials } = useRibbonUser()

const bigs = computed(() => props.group.items.filter((i) => ['large', 'clock', 'greeting'].includes(i.type)))
const stacks = computed(() => {
  const smalls = props.group.items.filter((i) => ['small', 'toggle'].includes(i.type))
  const out = []
  for (let i = 0; i < smalls.length; i += 3) out.push(smalls.slice(i, i + 3))
  return out
})
</script>
