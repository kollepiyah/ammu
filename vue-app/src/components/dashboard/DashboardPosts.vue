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
    <ul v-else class="daftar-baris space-y-2.5">
      <li
        v-for="p in posts.slice(0, 3)"
        :key="p.id"
        class="p-2 bg-[var(--bg-card-elevated)] rounded-[var(--radius-md)] border border-[var(--border-subtle)] cursor-pointer hover:border-[var(--color-accent)] transition flex gap-3 items-center"
        @click="goToPosts(p.id)"
      >
        <!-- Kyai 25 Nov 2026: tinggi kartu = tinggi foto. Foto selalu 64px (tanpa gambar →
             ikon pengganti), teks dipadatkan ke 3 baris tunggal supaya tak melebihi foto. -->
        <div
          class="w-16 h-16 flex-shrink-0 rounded-[var(--radius-sm)] overflow-hidden bg-[var(--bg-muted)] relative flex items-center justify-center"
        >
          <i v-if="!firstImage(p)" class="fas fa-bullhorn text-[var(--text-tertiary)]"></i>
          <img
            v-else
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
          <!-- Indicator platform link (YouTube / Instagram / TikTok) -->
          <span
            v-if="p.link_platform"
            class="absolute bottom-1 left-1 bg-slate-900/75 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center"
          >
            <i
              :class="
                p.link_platform === 'youtube'
                  ? 'fab fa-youtube text-red-400'
                  : p.link_platform === 'instagram'
                    ? 'fab fa-instagram text-pink-400'
                    : p.link_platform === 'tiktok'
                      ? 'fab fa-tiktok text-teal-300'
                      : 'fas fa-link text-sky-300'
              "
            ></i>
          </span>
        </div>
        <!-- Caption + meta -->
        <div class="flex-1 min-w-0 h-16 flex flex-col justify-center gap-0.5">
          <h4 class="text-sm font-black text-[var(--text-primary)] leading-snug truncate">
            {{ p.judul || p.isi }}
          </h4>
          <p v-if="p.judul && p.isi" class="text-xs text-[var(--text-secondary)] truncate">
            {{ p.isi }}
          </p>
          <div
            class="flex items-center gap-1.5 text-[10px] text-[var(--text-tertiary)] whitespace-nowrap min-w-0"
          >
            <i class="fas fa-clock"></i>
            <span class="truncate">{{ formatTanggalPost(p.tanggal || p.createdAt) }}</span>
          </div>
        </div>
      </li>
    </ul>

    <!-- Lihat semua link -->
    <button
      v-if="posts.length > 0"
      class="w-full mt-3 text-[11px] font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:bg-[var(--color-primary-soft)] py-2 rounded-[var(--radius-md)] transition cursor-pointer"
      @click="goToPosts()"
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
import { pilihBerkas, urlBerkas } from '@/utils/urlBerkas'
import { fmtDateTime } from '@/utils/format'
import { usePostTamu } from '@/composables/usePostTamu'

// Kyai 25 Nov 2026: Beranda publik memakai kartu yang sama dengan dashboard. Mode publik
// menarik sekali tanpa realtime (usePostTamu) dan membuka tab Channel publik.
// Cukup 3 terbaru, di Beranda publik maupun dashboard Portal (Kyai 25 Nov 2026).
const props = defineProps({ publik: { type: Boolean, default: false } })

const settings = useSettingsStore()
const router = useRouter()
const postsLive = ref([])
const loadingLive = ref(true)
const tamu = props.publik ? usePostTamu() : null
const posts = computed(() => (tamu ? tamu.posts.value : postsLive.value))
const loading = computed(() =>
  tamu ? tamu.loading.value && !posts.value.length : loadingLive.value
)
let unsubscribe = null

const channelName = computed(() => settings.settings?.namaChannel || 'Ammu Channel')

// v.1.4.5: gambar di Firebase Storage lama (402) tak dihitung — sama dengan galeri PostsView.
function firstImage(p) {
  if (Array.isArray(p.gambar_urls) && p.gambar_urls.length > 0) {
    const first = p.gambar_urls.map(urlBerkas).find(Boolean)
    if (first) return first
  }
  return pilihBerkas(p.gambar_url, p.gambar, p.foto)
}
function imageCount(p) {
  if (Array.isArray(p.gambar_urls)) return p.gambar_urls.map(urlBerkas).filter(Boolean).length
  return pilihBerkas(p.gambar_url, p.gambar, p.foto) ? 1 : 0
}

function goToPosts(postId) {
  const path = props.publik ? '/umum/channel' : '/posts'
  router.push(postId ? { path, query: { id: postId } } : path)
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
  if (tamu) return
  unsubscribe = subscribeColl('beranda_post', (docs) => {
    postsLive.value = [...docs].sort(sortByDateDesc)
    loadingLive.value = false
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
