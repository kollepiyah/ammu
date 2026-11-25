<template>
  <div class="p-3 space-y-4 max-w-xl mx-auto">
    <JamRingkas />

    <KartuSholat />

    <MenuIbadah jenis="beranda" />

    <!-- Kartu Channel sama dengan dashboard Portal (Kyai 25 Nov 2026) -->
    <DashboardPosts publik />
  </div>
</template>

<script setup>
import JamRingkas from '@/components/publik/JamRingkas.vue'
import MenuIbadah from '@/components/publik/MenuIbadah.vue'
import KartuSholat from '@/components/publik/KartuSholat.vue'
import DashboardPosts from '@/components/dashboard/DashboardPosts.vue'
</script>
