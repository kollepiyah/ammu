<template>
  <!-- v.21.80.0526: Posts feed Pesantren Modern — olive title + gold count badge -->
  <div
    class="bg-[var(--bg-card)] rounded-[var(--radius-lg)] p-4 md:p-5 border border-[var(--border-subtle)] shadow-[var(--shadow-sm)]"
  >
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">
        <i class="fas fa-bullhorn text-[var(--color-primary)] mr-2"></i>{{ channelName }}
      </h3>
      <span
        v-if="posts.length > 0"
        class="text-[10px] text-[var(--color-accent)] font-bold uppercase tracking-wider"
      >
        {{ posts.length }} POSTINGAN
      </span>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="py-6 text-center">
      <i class="fas fa-spinner fa-spin text-[var(--color-primary)] text-2xl mb-2"></i>
      <p class="text-xs text-[var(--text-secondary)] font-bold">Memuat postingan...</p>
    </div>

    <!-- Empty -->
    <div
      v-else-if="posts.length === 0"
      class="py-6 text-center bg-[var(--bg-muted)] rounded-[var(--radius-md)] border border-dashed border-[var(--border-default)]"
    >
      <i class="fas fa-inbox text-[var(--text-tertiary)] text-3xl mb-2"></i>
      <p class="text-xs text-[var(--text-secondary)] font-bold">Belum ada postingan baru</p>
    </div>

    <!-- Post list — preview only, click utk ke detail Ammu Channel -->
    <ul v-else class="space-y-2.5">
      <li
        v-for="p in posts.slice(0, 5)"
        :key="p.id"
        @click="goToPosts(p.id)"
        class="p-3 bg-[var(--bg-card-elevated)] rounded-[var(--radius-md)] border border-[var(--border-subtle)] cursor-pointer hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-md)] transition flex gap-3 items-start"
      >
        <!-- Thumbnail (kalau ada gambar) -->
        <div
          v-if="firstImage(p)"
          class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-[var(--radius-sm)] overflow-hidden bg-[var(--bg-muted)] relative"
        >
          <img
            :src="firstImage(p)"
            :alt="p.judul"
            class="w-full h-full object-cover"
            loading="lazy"
            @error="(e) => (e.target.style.display = 'none')"
          />
          <!-- Indicator multi-gambar (IG-style stack icon) -->
          <span
            v-if="imageCount(p) > 1"
            class="absolute top-1 right-1 bg-[var(--bg-overlay)] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5"
          >
            <i class="fas fa-images text-[8px]"></i>{{ imageCount(p) }}
          </span>
        </div>
        <!-- Caption + meta -->
        <div class="flex-1 min-w-0">
          <h4
            v-if="p.judul"
            class="text-sm font-black text-[var(--text-primary)] leading-snug truncate"
          >
            {{ p.judul }}
          </h4>
          <p class="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2 whitespace-pre-line">
            {{ p.isi }}
          </p>
          <div class="flex items-center gap-2 mt-1.5 text-[10px] text-[var(--text-tertiary)]">
            <i class="fas fa-clock"></i>
            <span>{{ formatTanggalPost(p.tanggal || p.createdAt) }}</span>
            <span v-if="p.pengirim_nama" class="ml-2 truncate">
              <i class="fas fa-user mr-1"></i>{{ p.pengirim_nama }}
            </span>
          </div>
        </div>
      </li>
    </ul>

    <!-- Lihat semua link -->
    <button
      v-if="posts.length > 0"
      @click="goToPosts()"
      class="w-full mt-3 text-[11px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:bg-[var(--color-primary-soft)] py-2 rounded-[var(--radius-md)] transition cursor-pointer"
    >
      <i class="fas fa-arrow-right mr-1"></i>Lihat semua di {{ channelName }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { subscribeColl } from '@/services/db'
import { useSettingsStore } from '@/stores/settings'
import { fmtDateTime } from '@/utils/format'

const settings = useSettingsStore()
const router = useRouter()
const posts = ref([])
const loading = ref(true)
let unsubscribe = null

const channelName = computed(() => settings.settings?.namaChannel || 'Ammu Channel')

function firstImage(p) {
  if (Array.isArray(p.gambar_urls) && p.gambar_urls.length > 0) {
    const first = p.gambar_urls.find(Boolean)
    if (first) return first
  }
  if (p.gambar_url) return p.gambar_url
  if (p.gambar) return p.gambar
  if (p.foto) return p.foto
  return ''
}
function imageCount(p) {
  if (Array.isArray(p.gambar_urls)) return p.gambar_urls.filter(Boolean).length
  if (p.gambar_url || p.gambar || p.foto) return 1
  return 0
}

function goToPosts(postId) {
  if (postId) {
    router.push({ path: '/posts', query: { id: postId } })
  } else {
    router.push('/posts')
  }
}

function formatTanggalPost(t) {
  if (!t) return '-'
  try {
    const d = t.toDate ? t.toDate() : new Date(t)
    if (isNaN(d)) return '-'
    return fmtDateTime(d)
  } catch {
    return '-'
  }
}

function sortByDateDesc(a, b) {
  const ta = new Date(a.tanggal || a.createdAt || 0).getTime()
  const tb = new Date(b.tanggal || b.createdAt || 0).getTime()
  return tb - ta
}

onMounted(() => {
  unsubscribe = subscribeColl('beranda_post', (docs) => {
    posts.value = [...docs].sort(sortByDateDesc)
    loading.value = false
  })
})

onUnmounted(() => {
  if (unsubscribe) {
    try {
      unsubscribe()
    } catch (e) {}
    unsubscribe = null
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
