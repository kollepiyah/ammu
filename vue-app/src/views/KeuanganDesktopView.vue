<template>
  <div class="rb-page">
    <div class="rb-section-title">
      <span class="ic"><RibbonIcon name="chart-line" :size="22" /></span>
      <span class="st">Dasbor Keuangan</span>
      <span class="note">Ringkasan, arus kas 12 bulan & transaksi terakhir</span>
    </div>
    <DasborKeuangan show-kategori show-transaksi />
  </div>
</template>

<script setup>
// Tab Keuangan (Ribbon) — dasbor keuangan penuh: 4 kartu + bar/line + donut kategori + Transaksi Terakhir.
import RibbonIcon from '@/components/ribbon/RibbonIcon.vue'
import DasborKeuangan from '@/components/dashboard/DasborKeuangan.vue'
</script>
