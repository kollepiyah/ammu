<template>
  <div class="p-3 space-y-4 max-w-xl mx-auto">
    <JamRingkas />

    <!-- Kartu jadwal sholat menyusul di F2 (utils/waktuSholat.js + lokasi). -->

    <section>
      <MenuIbadah jenis="beranda" />
    </section>

    <!-- Kartu Channel sama dengan dashboard Portal (Kyai 25 Nov 2026) -->
    <DashboardPosts publik />
  </div>
</template>

<script setup>
import JamRingkas from '@/components/publik/JamRingkas.vue'
import MenuIbadah from '@/components/publik/MenuIbadah.vue'
import DashboardPosts from '@/components/dashboard/DashboardPosts.vue'
</script>
