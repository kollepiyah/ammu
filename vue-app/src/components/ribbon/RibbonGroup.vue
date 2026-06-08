<template>
  <div class="rb-rgroup">
    <div class="rb-rgroup-items">
      <!-- item besar / widget -->
      <template v-for="(it, i) in bigs" :key="'b' + i">
        <RibbonClock v-if="it.type === 'clock'" />
        <div v-else-if="it.type === 'greeting'" class="rb-greet">
          <span class="rb-avatar-lg">{{ initials }}</span>
          <div>
            <div class="g1">Ahlan, {{ userName }}!</div>
            <div class="g2">Masuk sebagai <span class="rb-badge-admin">{{ userRole }}</span></div>
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
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  group: { type: Object, required: true },
  act: { type: Function, required: true }
})

const auth = useAuthStore()
const userName = computed(() => auth.sesiAktif?.nama || auth.sesiAktif?.name || 'Pengguna')
const userRole = computed(() => {
  const s = auth.sesiAktif || {}
  return (s.role_sistem || s.jabatan || s.role || '').toString().toUpperCase() || 'PENGGUNA'
})
const initials = computed(() => {
  const n = userName.value.trim()
  if (!n) return '?'
  const parts = n.split(/\s+/)
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || n[0].toUpperCase()
})

const bigs = computed(() => props.group.items.filter((i) => ['large', 'clock', 'greeting'].includes(i.type)))
const stacks = computed(() => {
  const smalls = props.group.items.filter((i) => ['small', 'toggle'].includes(i.type))
  const out = []
  for (let i = 0; i < smalls.length; i += 3) out.push(smalls.slice(i, i + 3))
  return out
})
</script>
