<template>
  <div>
    <div class="rb-kpi-row">
      <div v-for="(k, i) in kpi" :key="i" class="rb-kpi" :class="{ cyan: i >= 2 }">
        <span class="rb-kpi-ic"><RibbonIcon :name="k.icon" :size="20" /></span>
        <div class="rb-kpi-v">{{ k.value }}</div>
        <div class="rb-kpi-l">{{ k.label }}</div>
      </div>
    </div>

    <div v-if="statistikLembaga.length" style="margin-top: 16px">
      <div class="rb-section-title">
        <span class="ic"><RibbonIcon name="mosque" :size="18" /></span>
        <span class="st" style="font-size: 15px">Statistik Lembaga</span>
        <span class="note">Kelas · Santri · Guru per lembaga</span>
      </div>
      <div class="rb-lembaga-grid">
        <div v-for="l in statistikLembaga" :key="l.nama" class="rb-lembaga">
          <div class="rb-lembaga-nm">{{ l.nama }}</div>
          <div class="rb-lembaga-cells">
            <div class="rb-lc"><span>Kelas</span><b>{{ l.kelas }}</b></div>
            <div class="rb-lc"><span>Santri</span><b>{{ l.santri }}</b></div>
            <div class="rb-lc"><span>Guru</span><b>{{ l.guru }}</b></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import RibbonIcon from '@/components/ribbon/RibbonIcon.vue'
import { useStatistikDashboard } from '@/composables/useStatistikDashboard'

const { kpi, statistikLembaga } = useStatistikDashboard()
</script>
