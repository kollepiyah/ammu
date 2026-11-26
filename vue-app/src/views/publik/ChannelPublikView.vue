<template>
  <div class="p-3 space-y-3 max-w-xl mx-auto">
    <div class="flex items-center justify-between px-1">
      <h2 class="judul-ganda text-base font-black text-[var(--text-primary)]">
        <i class="fas fa-play-circle text-teal-600 mr-1.5"></i>{{ namaChannel }}
      </h2>
      <button
        type="button"
        class="ml-auto text-xs font-bold text-teal-700 dark:text-teal-300 cursor-pointer disabled:opacity-50"
        :disabled="loading"
        @click="segarkan(true)"
      >
        <i :class="['fas fa-rotate-right mr-1', loading && 'fa-spin']"></i>Muat ulang
      </button>
    </div>

    <p v-if="galat && !posts.length" class="text-xs text-rose-600 px-1">
      Gagal memuat postingan. Periksa koneksi lalu muat ulang.
    </p>
    <div v-else-if="loading && !posts.length" class="space-y-3">
      <div
        v-for="i in 2"
        :key="i"
        class="h-72 rounded-2xl bg-slate-200/70 dark:bg-slate-700/50 animate-pulse"
      ></div>
    </div>
    <p
      v-else-if="!posts.length"
      class="text-sm text-[var(--text-secondary)] italic text-center py-10"
    >
      Belum ada postingan.
    </p>

    <div v-for="p in posts" :id="`post-${p.id}`" :key="p.id">
      <PostCard
        :judul="p.judul || ''"
        :isi="p.isi || ''"
        :tanggal="p.tanggal || ''"
        :author="p.pengirim_nama || namaChannel"
        :gambar_urls="daftarGambar(p)"
        :link-url="p.link_url || ''"
        :link-platform="p.link_platform || ''"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import PostCard from '@/components/posts/PostCard.vue'
import { useSettingsStore } from '@/stores/settings'
import { usePostTamu, daftarGambar } from '@/composables/usePostTamu'

const route = useRoute()
const settings = useSettingsStore()
const namaChannel = computed(() => settings.settings?.namaChannel || 'Al Manshur Channel')
const { posts, loading, galat, segarkan } = usePostTamu()

// Dibuka dari kartu di Beranda -> gulir ke postingan itu.
watch(
  () => [route.query.id, posts.value.length],
  async ([id]) => {
    if (!id) return
    await nextTick()
    document.getElementById(`post-${id}`)?.scrollIntoView({ block: 'start' })
  },
  { immediate: true }
)
</script>
