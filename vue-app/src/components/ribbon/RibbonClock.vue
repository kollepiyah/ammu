<template>
  <div class="rb-clock">
    <span class="ic"><RibbonIcon name="clock" :size="26" :stroke="1.5" /></span>
    <div class="rb-clock-main">
      <div class="day">{{ hariUpper }} · WIB</div>
      <div class="time">{{ jam }}:{{ menit }}<span style="font-size: 0.5em; opacity: 0.8">:{{ detik }}</span></div>
    </div>
    <div class="rb-clock-sep"></div>
    <div class="rb-clock-date">
      <div class="ar font-arabic" dir="rtl">{{ hijri }}</div>
      <div class="dm">{{ masehi }}</div>
    </div>
  </div>
</template>

<script setup>
// Jam + tanggal hijriah PERSIS web (pakai composable useClock yg sama dgn DashboardJamHijri,
// termasuk kalibrasi hijri dari settings) supaya nilainya identik.
import { computed } from 'vue'
import RibbonIcon from './RibbonIcon.vue'
import { useClock } from '@/composables/useClock'

const { jam, menit, detik, hari, hijri, masehi } = useClock()
const hariUpper = computed(() => String(hari.value || '').toUpperCase())
</script>
