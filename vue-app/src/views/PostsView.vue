<template>
  <div class="p-3 md:p-5 max-w-4xl mx-auto space-y-4">
    <!-- Header -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
            <i class="fas fa-bullhorn text-teal-500 mr-2"></i>Ammu Channel
          </h1>
          <p class="text-xs text-slate-500 mt-0.5">Posting dari admin pondok</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 text-xs">
            <span class="text-teal-700 dark:text-teal-300 font-bold">{{ posts.length }}</span>
            <span class="text-slate-500 ml-1">posts</span>
          </div>
          <button
            v-if="canCreatePost"
            @click="openForm()"
            class="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition"
          >
            <i class="fas fa-plus mr-1"></i>Buat Postingan
          </button>
        </div>
      </div>
    </div>

    <!-- Form (admin only, toggle visibility) -->
    <div v-if="showForm" class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border-2 border-teal-300 dark:border-teal-700 shadow-md">
      <h3 class="text-sm font-black text-teal-700 dark:text-teal-300 uppercase tracking-wide mb-3">
        <i :class="form.id ? 'fas fa-edit text-amber-500' : 'fas fa-plus text-teal-500'" class="mr-1"></i>
        {{ form.id ? 'Edit Postingan' : 'Postingan Baru' }}
      </h3>
      <form @submit.prevent="onSubmit" class="space-y-3">
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Judul *</label>
          <input
            v-model="form.judul"
            type="text"
            required
            placeholder="Judul postingan..."
            class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Isi Pesan *</label>
          <textarea
            v-model="form.isi"
            rows="6"
            required
            placeholder="Tulis isi pengumuman..."
            class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none resize-vertical"
          ></textarea>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">
            URL Gambar <span class="normal-case text-[10px] text-slate-400">(opsional, pisah dengan |||)</span>
          </label>
          <input
            v-model="form.gambar_urls_text"
            type="text"
            placeholder="https://...jpg ||| https://...jpg"
            class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <p class="text-[10px] text-slate-400 mt-1">
            <i class="fas fa-info-circle mr-1"></i>Upload gambar via legacy app, paste URL Firebase Storage di sini.
          </p>
        </div>
        <div class="flex gap-2 pt-2">
          <button type="button" @click="cancelForm" class="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm">
            <i class="fas fa-times mr-1"></i>Batal
          </button>
          <button type="submit" :disabled="isSaving" class="flex-1 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm">
            <i class="fas fa-save mr-1"></i>{{ isSaving ? 'Menyimpan...' : (form.id ? 'Update' : 'Posting') }}
          </button>
        </div>
      </form>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center">
      <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
      <p class="text-sm text-slate-500 font-bold">Memuat postingan...</p>
    </div>

    <!-- Empty -->
    <div v-else-if="posts.length === 0" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center">
      <i class="fas fa-bullhorn text-slate-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Belum ada postingan</p>
      <p v-if="isAdmin" class="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Klik "Buat Postingan" di atas untuk publish pengumuman pertama.
      </p>
    </div>

    <!-- Posts list — v.20.10.0526: format match legacy (header avatar+nama+timestamp + judul + slider IG-style + caption) -->
    <div v-else class="space-y-4">
      <article
        v-for="p in posts"
        :key="p.id"
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
      >
        <!-- (1) HEADER: avatar + nama channel + timestamp + lokasi -->
        <header class="flex items-start justify-between gap-2 px-4 md:px-5 pt-4 pb-2">
          <div class="flex items-start gap-3 flex-1 min-w-0">
            <img
              src="/logo.png"
              alt="Logo"
              class="w-10 h-10 md:w-11 md:h-11 rounded-full object-contain bg-slate-100 dark:bg-slate-700 border border-slate-200 flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-black text-slate-800 dark:text-white truncate">
                {{ kopLembaga }}
              </p>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {{ fmtPostMeta(p) }}
              </p>
            </div>
          </div>
          <div v-if="isAdmin" class="flex gap-1 flex-shrink-0">
            <button @click="openForm(p)" class="w-8 h-8 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-700 transition" title="Edit">
              <i class="fas fa-edit text-xs"></i>
            </button>
            <button @click="onDelete(p)" class="w-8 h-8 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 transition" title="Hapus">
              <i class="fas fa-trash text-xs"></i>
            </button>
          </div>
        </header>

        <!-- (2) JUDUL: bold besar -->
        <h2 v-if="p.judul" class="text-lg md:text-xl font-black text-slate-800 dark:text-white px-4 md:px-5 pb-3">
          {{ p.judul }}
        </h2>

        <!-- v.20.11.0526: IMAGE SLIDER SQUARE 1:1 (IG-style). Klik gambar = open lightbox full-screen -->
        <div v-if="getImages(p).length > 0" class="relative bg-slate-100 dark:bg-slate-900 overflow-hidden aspect-square w-full">
          <img
            :src="getImages(p)[getSlideIdx(p.id)]"
            :alt="p.judul"
            @click="openLightbox(getImages(p), getSlideIdx(p.id))"
            class="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
            @error="onImgError"
          />
          <!-- Counter pojok kanan atas -->
          <span
            v-if="getImages(p).length > 1"
            class="absolute top-3 right-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full"
          >
            {{ getSlideIdx(p.id) + 1 }}/{{ getImages(p).length }}
          </span>
          <!-- Arrow kiri -->
          <button
            v-if="getImages(p).length > 1 && getSlideIdx(p.id) > 0"
            @click="prevSlide(p.id)"
            class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Sebelumnya"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <!-- Arrow kanan -->
          <button
            v-if="getImages(p).length > 1 && getSlideIdx(p.id) < getImages(p).length - 1"
            @click="nextSlide(p.id, getImages(p).length)"
            class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Berikutnya"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
          <!-- Dots indicator (max 5 dots) -->
          <div
            v-if="getImages(p).length > 1"
            class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5"
          >
            <span
              v-for="(_, i) in getImages(p)"
              :key="i"
              :class="[
                'w-1.5 h-1.5 rounded-full transition',
                getSlideIdx(p.id) === i ? 'bg-white w-3' : 'bg-white/50'
              ]"
            ></span>
          </div>
        </div>

        <!-- (4) CAPTION body -->
        <div v-if="p.isi" class="px-4 md:px-5 py-4 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
          {{ p.isi }}
        </div>

        <!-- (5) Link preview -->
        <a
          v-if="p.linkPreview?.url"
          :href="p.linkPreview.url"
          target="_blank"
          class="mx-4 md:mx-5 mb-4 block bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600 rounded-xl p-3 hover:bg-slate-100 transition"
        >
          <p class="text-xs font-bold text-teal-700 dark:text-teal-300 truncate">{{ p.linkPreview.title || p.linkPreview.url }}</p>
          <p v-if="p.linkPreview.desc" class="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{{ p.linkPreview.desc }}</p>
        </a>

        <!-- v.20.72.0526: Reactions bar (like-only, no comments per kyai req) -->
        <div class="px-4 md:px-5 pb-3">
          <ReactionBar :post-id="String(p.id)" />
        </div>
      </article>
    </div>

    <p class="text-center text-[10px] text-slate-400 pt-2">
      <i class="fas fa-circle-info mr-1"></i>Vue 3 · Phase 5.18 — Mading
    </p>

    <!-- v.20.10.0526: LIGHTBOX modal full-screen image (klik gambar utk buka) -->
    <Teleport to="body">
      <div
        v-if="lightbox.open"
        @click.self="closeLightbox"
        class="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
      >
        <!-- Close button -->
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer z-10"
          aria-label="Tutup"
        >
          <i class="fas fa-times text-xl"></i>
        </button>
        <!-- Counter -->
        <span
          v-if="lightbox.images.length > 1"
          class="absolute top-4 left-4 bg-white/10 text-white text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-sm"
        >
          {{ lightbox.idx + 1 }} / {{ lightbox.images.length }}
        </span>
        <!-- Image -->
        <img
          :src="lightbox.images[lightbox.idx]"
          :alt="`Gambar ${lightbox.idx + 1}`"
          class="max-w-full max-h-full object-contain select-none"
          @click.stop
        />
        <!-- Arrow kiri -->
        <button
          v-if="lightbox.idx > 0"
          @click.stop="lightbox.idx--"
          class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          aria-label="Sebelumnya"
        >
          <i class="fas fa-chevron-left text-xl"></i>
        </button>
        <!-- Arrow kanan -->
        <button
          v-if="lightbox.idx < lightbox.images.length - 1"
          @click.stop="lightbox.idx++"
          class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          aria-label="Berikutnya"
        >
          <i class="fas fa-chevron-right text-xl"></i>
        </button>
        <!-- Hint bottom -->
        <p class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs font-medium">
          Klik di luar gambar untuk tutup · Esc juga
        </p>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'
import { subscribeColl, setOne, deleteOne } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { fmtDateTime } from '@/utils/format'
import ReactionBar from '@/components/posts/ReactionBar.vue'

const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()
const confirm = useConfirm()

// v.20.10.0526: per-post slide index (multi-image carousel)
const slideIdxMap = reactive({})
function getSlideIdx(postId) {
  return slideIdxMap[postId] || 0
}
function prevSlide(postId) {
  const cur = slideIdxMap[postId] || 0
  if (cur > 0) slideIdxMap[postId] = cur - 1
}
function nextSlide(postId, total) {
  const cur = slideIdxMap[postId] || 0
  if (cur < total - 1) slideIdxMap[postId] = cur + 1
}

// v.20.10.0526: Lightbox full-screen image modal
const lightbox = reactive({
  open: false,
  images: [],
  idx: 0
})
function openLightbox(images, startIdx = 0) {
  lightbox.images = images
  lightbox.idx = startIdx
  lightbox.open = true
  document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lightbox.open = false
  lightbox.images = []
  lightbox.idx = 0
  document.body.style.overflow = ''
}
function handleEsc(e) {
  if (e.key === 'Escape' && lightbox.open) closeLightbox()
  else if (e.key === 'ArrowLeft' && lightbox.open && lightbox.idx > 0) lightbox.idx--
  else if (e.key === 'ArrowRight' && lightbox.open && lightbox.idx < lightbox.images.length - 1) lightbox.idx++
}

// v.20.10.0526: Header info — nama lembaga + timestamp + lokasi
const kopLembaga = computed(() => {
  return settings.settings?.kopLine1 || 'Pondok Pesantren Mambaul Ulum'
})
function fmtPostMeta(p) {
  const t = p.tanggal || p.created_at || p.createdAt
  let timeStr = '-'
  try {
    const d = t?.toDate ? t.toDate() : new Date(t)
    if (!isNaN(d)) {
      const tgl = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      const jam = String(d.getHours()).padStart(2, '0')
      const menit = String(d.getMinutes()).padStart(2, '0')
      timeStr = `${tgl} pukul ${jam}.${menit}`
    }
  } catch (e) {}
  return `${timeStr} · ${kopLembaga.value}`
}

const postsRaw = ref([])
const loading = ref(true)
let unsub = null

const showForm = ref(false)
const isSaving = ref(false)
const form = ref({ id: '', judul: '', isi: '', gambar_urls_text: '', linkPreview: null })

const isAdmin = computed(() => {
  const s = auth.sesiAktif
  return s && (s.role === 'admin' || ['super_admin', 'admin'].includes(s.role_sistem))
})

// v.20.75.0526: Settings wiring (postinganHanyaAdmin/AutoApprove/MaxImages/MaxSizeKb)
const postsConfig = computed(() => ({
  hanyaAdmin: settings.settings?.postinganHanyaAdmin !== false, // default TRUE
  autoApprove: settings.settings?.postinganAutoApprove !== false, // default TRUE (no moderation)
  maxImages: Number(settings.settings?.postinganMaxImages || 6),
  maxSizeKb: Number(settings.settings?.postinganMaxSizeKb || 1024)
}))

// Can user create posts? Default: only admin (postinganHanyaAdmin=true).
// If postinganHanyaAdmin=false → all logged-in users can post.
const canCreatePost = computed(() => {
  if (postsConfig.value.hanyaAdmin) return isAdmin.value
  return !!auth.sesiAktif
})

const posts = computed(() => {
  // v.20.75.0526: hide pending posts dari non-admin (kalau autoApprove=false)
  const filtered = postsRaw.value.filter((p) => {
    if (!p) return false
    if (isAdmin.value) return true
    if (p.status === 'pending') return p.author_id === auth.sesiAktif?.id // pemilik bisa lihat sendiri
    return true
  })
  return [...filtered].sort((a, b) => {
    const ta = a.tanggal || a.created_at || ''
    const tb = b.tanggal || b.created_at || ''
    return tb.localeCompare(ta)
  })
})

function getImages(p) {
  if (Array.isArray(p.gambar_urls)) return p.gambar_urls.filter(Boolean)
  if (p.gambar_url) return [p.gambar_url]
  return []
}
function onImgError(e) { e.target.style.display = 'none' }

function openForm(post = null) {
  if (post) {
    form.value = {
      id: post.id,
      judul: post.judul || '',
      isi: post.isi || '',
      gambar_urls_text: (Array.isArray(post.gambar_urls) ? post.gambar_urls : (post.gambar_url ? [post.gambar_url] : [])).join('|||'),
      linkPreview: post.linkPreview || null
    }
  } else {
    form.value = { id: '', judul: '', isi: '', gambar_urls_text: '', linkPreview: null }
  }
  showForm.value = true
}
function cancelForm() {
  showForm.value = false
  form.value = { id: '', judul: '', isi: '', gambar_urls_text: '', linkPreview: null }
}

async function onSubmit() {
  if (!form.value.judul.trim() || !form.value.isi.trim()) {
    toast.warning('Judul + isi wajib diisi')
    return
  }
  isSaving.value = true
  try {
    const id = form.value.id || 'p_' + Date.now()
    let gambarUrls = form.value.gambar_urls_text
      .split('|||')
      .map((s) => s.trim())
      .filter((u) => u && u.startsWith('http'))
    // v.20.75.0526: enforce postinganMaxImages
    const maxImg = postsConfig.value.maxImages
    if (gambarUrls.length > maxImg) {
      toast.warning(`Maksimal ${maxImg} gambar per postingan — sisanya di-skip`)
      gambarUrls = gambarUrls.slice(0, maxImg)
    }
    // v.20.75.0526: status pending kalau autoApprove=false & bukan admin
    const needsApproval = !postsConfig.value.autoApprove && !isAdmin.value
    const data = {
      id,
      judul: form.value.judul.trim(),
      isi: form.value.isi.trim(),
      gambar_urls: gambarUrls,
      author: auth.sesiAktif?.nama || 'Admin',
      author_id: auth.sesiAktif?.id || '',
      status: needsApproval ? 'pending' : 'approved',
      tanggal: form.value.id ? (posts.value.find((x) => x.id === id)?.tanggal || new Date().toISOString()) : new Date().toISOString()
    }
    if (form.value.linkPreview) data.linkPreview = form.value.linkPreview
    await setOne('beranda_post', id, data)
    toast.success(form.value.id
      ? 'Postingan diupdate'
      : (needsApproval ? 'Postingan dikirim, menunggu approval admin' : 'Postingan dipublish'))
    cancelForm()
  } catch (e) {
    toast.error('Error: ' + (e.message || e))
  } finally {
    isSaving.value = false
  }
}

async function onDelete(p) {
  const ok = await confirm({
    title: 'Hapus postingan?',
    text: `"${p.judul}" akan dihapus permanen.`,
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    await deleteOne('beranda_post', p.id)
    toast.success('Postingan dihapus')
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}

onMounted(() => {
  unsub = subscribeColl('beranda_post', (docs) => {
    postsRaw.value = docs
    loading.value = false
  })
    // v.20.10.0526: Esc + Arrow keys utk lightbox
  document.addEventListener('keydown', handleEsc)
})
onUnmounted(() => {
  if (unsub) { try { unsub() } catch (e) {} }
  document.removeEventListener('keydown', handleEsc)
  document.body.style.overflow = ''
})
</script>
