<template>
  <div class="rb-clock">
    <span class="ic"><RibbonIcon name="clock" :size="26" :stroke="1.5" /></span>
    <div class="rb-clock-main">
      <div class="day">{{ dayLabel }}</div>
      <div class="time">{{ hh }}:{{ mm }}<span style="font-size: 0.5em; opacity: 0.8">:{{ ss }}</span></div>
    </div>
    <div class="rb-clock-sep"></div>
    <div class="rb-clock-date">
      <div class="ar font-arabic">{{ hijri }}</div>
      <div class="dm">{{ gregorian }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import RibbonIcon from './RibbonIcon.vue'

const now = ref(new Date())
let timer = null
onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const pad = (n) => String(n).padStart(2, '0')
const hh = computed(() => pad(now.value.getHours()))
const mm = computed(() => pad(now.value.getMinutes()))
const ss = computed(() => pad(now.value.getSeconds()))

const dayLabel = computed(() => {
  try {
    const d = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(now.value)
    return d.toUpperCase() + ' · WIB'
  } catch (e) {
    return 'WIB'
  }
})
const gregorian = computed(() => {
  try {
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(now.value)
  } catch (e) {
    return ''
  }
})
const hijri = computed(() => {
  try {
    return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(now.value)
  } catch (e) {
    return ''
  }
})
</script>
