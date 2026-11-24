<template>
  <div class="p-3 space-y-4 max-w-xl mx-auto">
    <JamRingkas />

    <!-- Kartu jadwal sholat menyusul di F2 (utils/waktuSholat.js + lokasi). -->

    <section>
      <MenuIbadah jenis="beranda" />
    </section>

    <section>
      <div class="flex items-center justify-between mb-2 px-1">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-play-circle text-teal-600 mr-1.5"></i>{{ namaChannel }}
        </h3>
        <RouterLink to="/umum/channel" class="text-xs font-bold text-teal-700 dark:text-teal-300">
          Lihat semua <i class="fas fa-chevron-right text-[10px]"></i>
        </RouterLink>
      </div>

      <div v-if="loading && !posts.length" class="flex gap-3 overflow-hidden">
        <div
          v-for="i in 3"
          :key="i"
          class="w-44 h-40 shrink-0 rounded-2xl bg-slate-200/70 dark:bg-slate-700/50 animate-pulse"
        ></div>
      </div>
      <p v-else-if="!posts.length" class="text-xs text-[var(--text-secondary)] italic px-1">
        Belum ada postingan.
      </p>
      <div v-else class="flex gap-3 overflow-x-auto pb-1 -mx-3 px-3 snap-x">
        <RouterLink
          v-for="p in posts.slice(0, 8)"
          :key="p.id"
          :to="{ path: '/umum/channel', query: { id: p.id } }"
          class="w-44 shrink-0 snap-start rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div class="h-24 bg-slate-100 dark:bg-slate-800 relative">
            <img
              v-if="gambarPertama(p)"
              :src="gambarPertama(p)"
              alt=""
              loading="lazy"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-teal-600/50">
              <i class="fas fa-newspaper text-2xl"></i>
            </div>
            <span
              v-if="p.link_platform"
              class="absolute top-1.5 left-1.5 text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-black/60 text-white"
              >{{ p.link_platform }}</span
            >
          </div>
          <div class="p-2">
            <p class="text-xs font-bold text-[var(--text-primary)] line-clamp-2 leading-snug">
              {{ p.judul || p.isi || 'Postingan' }}
            </p>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import JamRingkas from '@/components/publik/JamRingkas.vue'
import MenuIbadah from '@/components/publik/MenuIbadah.vue'
import { useSettingsStore } from '@/stores/settings'
import { usePostTamu, gambarPertama } from '@/composables/usePostTamu'

const settings = useSettingsStore()
const namaChannel = computed(() => settings.settings?.namaChannel || 'Al Manshur Channel')
const { posts, loading } = usePostTamu()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
