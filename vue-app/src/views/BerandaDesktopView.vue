<template>
  <div class="rb-page">
    <div class="rb-section-title">
      <span class="ic"><RibbonIcon name="chart-pie" :size="22" /></span>
      <span class="st">Dasbor Statistik Pendidikan</span>
      <span class="note">Ringkasan santri, guru, lembaga & kelas</span>
    </div>
    <DasborPendidikan />

    <div class="rb-section-title">
      <span class="ic"><RibbonIcon name="chart-line" :size="22" /></span>
      <span class="st">Dasbor Statistik Keuangan</span>
      <span class="note">Tagihan, tabungan, bisyaroh & arus kas 12 bulan</span>
    </div>
    <DasborKeuangan />
  </div>
</template>

<script setup>
// Home (Ribbon) — HANYA dua dasbor statistik (sesuai handoff desain).
import RibbonIcon from '@/components/ribbon/RibbonIcon.vue'
import DasborPendidikan from '@/components/dashboard/DasborPendidikan.vue'
import DasborKeuangan from '@/components/dashboard/DasborKeuangan.vue'
</script>
