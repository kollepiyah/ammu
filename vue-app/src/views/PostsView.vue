<template>
  <!-- v.21.84.0527: Ammu Channel — Instagram-style pakai PostCard widget existing -->
  <div class="p-3 md:p-5 space-y-4">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm flex justify-between items-center gap-3">
      <div class="flex-1 min-w-0">
        <h1 class="text-lg md:text-xl font-black truncate">
          <i class="fas fa-bullhorn text-teal-600 mr-2"></i>{{ channelName }}
        </h1>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">{{ posts.length }} postingan</p>
      </div>
      <button
        v-if="isAdmin"
        @click="openModal()"
        class="bg-teal-600 hover:bg-teal-700 text-white text-xs font-black px-3 py-2 rounded-full shadow flex items-center gap-1.5 transition cursor-pointer"
      >
        <i class="fas fa-plus"></i>
        <span class="hidden sm:inline">Post Baru</span>
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center border border-[var(--border-subtle)]">
      <i class="fas fa-spinner fa-spin text-teal-500 text-3xl"></i>
      <p class="text-xs text-[var(--text-secondary)] mt-2">Memuat...</p>
    </div>

    <!-- Empty -->
    <div
      v-else-if="posts.length === 0"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
    >
      <i class="fas fa-camera text-[var(--text-tertiary)] text-4xl mb-3"></i>
      <p class="text-sm text-[var(--text-secondary)] italic">Belum ada postingan.</p>
      <p v-if="isAdmin" class="text-xs text-[var(--text-tertiary)] mt-2">
        Klik "Post Baru" untuk membuat postingan pertama.
      </p>
    </div>

    <!-- Feed: PostCard widget + ReactionBar (likes only) -->
    <div v-for="p in posts" :key="p.id" class="space-y-0">
      <PostCard
        :judul="p.judul || ''"
        :isi="p.isi || ''"
        :tanggal="p.tanggal || ''"
        :author="p.pengirim_nama || channelName"
        :gambar_urls="imgsOf(p)"
        :post-id="isAdmin ? p.id : ''"
        @edit="editPost(p)"
        @delete="deletePost(p)"
      />
      <!-- Reactions bar di bawah card (likes only, no comments, no share) -->
      <div class="bg-[var(--bg-card)] -mt-2 px-4 pb-3 rounded-b-2xl border border-t-0 border-[var(--border-subtle)]">
        <ReactionBar :postId="p.id" />
      </div>
    </div>

    <!-- Modal: Create / Edit Post (style: legacy ammu) -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4 backdrop-blur-sm"
      @click.self="closeModal()"
    >
      <div class="bg-teal-50 dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border-t-4 border-teal-500">
        <div class="p-6 space-y-4">
          <!-- JUDUL POST -->
          <div>
            <label class="block text-[11px] font-black text-[var(--text-primary)] uppercase tracking-wider mb-2">
              Judul Post
            </label>
            <input
              v-model="modalJudul"
              type="text"
              placeholder="Mis: Pengumuman Libur Idul Fitri..."
              class="w-full px-4 py-3 text-sm rounded-xl border border-teal-200 dark:border-teal-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none placeholder:text-slate-400"
            />
          </div>

          <!-- ISI PESAN -->
          <div>
            <label class="block text-[11px] font-black text-[var(--text-primary)] uppercase tracking-wider mb-2">
              Isi Pesan
            </label>
            <textarea
              v-model="modalIsi"
              rows="5"
              placeholder="Detail pengumuman..."
              class="w-full px-4 py-3 text-sm rounded-xl border border-teal-200 dark:border-teal-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none placeholder:text-slate-400"
            ></textarea>
            <p class="text-[11px] text-[var(--text-secondary)] italic mt-1.5 flex items-start gap-1.5">
              <i class="fas fa-info-circle text-cyan-500 mt-0.5"></i>
              <span>Tip: Paste link (https://...) di teks. Preview akan otomatis muncul setelah Anda klik di luar field.</span>
            </p>
          </div>

          <!-- GAMBAR -->
          <div>
            <label class="block text-[11px] font-black text-[var(--text-primary)] uppercase tracking-wider mb-2">
              Gambar (opsional, max {{ MAX_IMAGES }} gambar, total max {{ (MAX_TOTAL_BYTES / 1024 / 1024).toFixed(MAX_TOTAL_BYTES < 1048576 ? 1 : 0) }} MB)
            </label>
            <div class="flex items-center gap-3">
              <label class="bg-teal-100 hover:bg-teal-200 dark:bg-teal-900/40 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 font-bold px-4 py-2 rounded-lg text-sm cursor-pointer transition border border-teal-200 dark:border-teal-700">
                Pilih File
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  class="hidden"
                  @change="onFileSelect"
                />
              </label>
              <span class="text-xs text-[var(--text-secondary)] italic">
                {{ modalImages.length === 0 ? 'Tidak ada file yang dipilih' : `${modalImages.length} file dipilih` }}
              </span>
            </div>
            <p class="text-[11px] text-[var(--text-secondary)] italic mt-1.5 flex items-start gap-1.5">
              <i class="fas fa-info-circle text-cyan-500 mt-0.5"></i>
              <span>Pilih sampai {{ MAX_IMAGES }} gambar sekaligus. Gambar besar (&gt;1MB) otomatis dikompres.</span>
            </p>

            <!-- Thumbnail previews -->
            <div v-if="modalImages.length > 0" class="grid grid-cols-5 gap-2 mt-3">
              <div
                v-for="(img, idx) in modalImages"
                :key="idx"
                class="relative aspect-square rounded-lg overflow-hidden bg-[var(--bg-muted)] border border-teal-200 dark:border-teal-700"
              >
                <img :src="img.preview || img.url" class="w-full h-full object-cover" />
                <button
                  @click="removeImage(idx)"
                  type="button"
                  class="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-slate-900/70 hover:bg-rose-600 text-white text-[10px] flex items-center justify-center transition cursor-pointer"
                  title="Hapus gambar"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-2 pt-2">
            <button
              @click="closeModal()"
              class="px-5 py-2.5 bg-[var(--bg-muted)] hover:bg-slate-300 dark:hover:bg-slate-600 text-[var(--text-primary)] font-bold rounded-xl text-sm transition cursor-pointer"
            >
              Batal
            </button>
            <button
              @click="simpan"
              :disabled="saving || (!modalIsi && !modalJudul && modalImages.length === 0)"
              class="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <i v-if="saving" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-save"></i>
              {{ saving ? 'Memposting...' : 'Publikasikan' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { uploadFile } from '@/services/storage'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import PostCard from '@/components/posts/PostCard.vue'
import ReactionBar from '@/components/posts/ReactionBar.vue'

const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()
const confirmDlg = useConfirm()

const channelName = computed(() => settings.settings?.namaChannel || 'Ammu Channel')

const isAdmin = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return s.role === 'admin' || s.id === 'admin' || ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
})

// Posts data
const postsRaw = ref([])
const loading = ref(true)
let unsub = null

const posts = computed(() => {
  return [...postsRaw.value].sort((a, b) => {
    const ta = new Date(a.tanggal || a.created_at?.toDate?.() || 0).getTime()
    const tb = new Date(b.tanggal || b.created_at?.toDate?.() || 0).getTime()
    return tb - ta
  })
})

// Backward compat: ambil array gambar dari post (mendukung gambar_urls/gambar_url/gambar/foto)
function imgsOf(p) {
  if (Array.isArray(p.gambar_urls) && p.gambar_urls.length > 0) {
    return p.gambar_urls.filter(Boolean)
  }
  if (p.gambar_url) return [p.gambar_url]
  if (p.gambar) return [p.gambar]
  if (p.foto) return [p.foto]
  return []
}

// === Modal Create/Edit Post ===
const modalOpen = ref(false)
const editing = ref(null) // null = create, else post object
const modalJudul = ref('')
const modalKategori = ref('Umum')
const modalIsi = ref('')
const modalImages = ref([]) // [{ file?, preview?, url? }]
const saving = ref(false)

function openModal() {
  editing.value = null
  modalJudul.value = ''
  modalKategori.value = 'Umum'
  modalIsi.value = ''
  modalImages.value = []
  modalOpen.value = true
}

function editPost(p) {
  editing.value = p
  modalJudul.value = p.judul || ''
  modalKategori.value = p.kategori || 'Umum'
  modalIsi.value = p.isi || ''
  modalImages.value = imgsOf(p).map((url) => ({ url, preview: url }))
  modalOpen.value = true
}

function closeModal() {
  if (saving.value) return
  modalOpen.value = false
}

// v.21.106.0527: wire Pengaturan Web > Postingan settings.
// postinganMaxImages (default 5), postinganMaxSizeKb (default 16384 KB = 16MB).
// v.72.0526: minimum 5 images & 16 MB supaya tidak fragmentasi small limit (admin set 0/small yang bikin user stuck).
const MAX_IMAGES = computed(() => {
  const v = Number(settings.settings?.postinganMaxImages)
  return v > 0 ? v : 10
})
const MAX_TOTAL_BYTES = computed(() => {
  const kb = Number(settings.settings?.postinganMaxSizeKb)
  return (kb > 0 ? kb : 16384) * 1024
})
const COMPRESS_THRESHOLD = 1024 * 1024   // 1 MB (compress per-file > 1MB, hardcoded)

async function compressImage(file) {
  // Kompres pakai canvas, target ~1MB, max dimension 1600px
  return new Promise((resolve) => {
    const img = new Image()
    const reader = new FileReader()
    reader.onload = (ev) => {
      img.onload = () => {
        const maxDim = 1600
        let w = img.width
        let h = img.height
        if (w > maxDim || h > maxDim) {
          const scale = Math.min(maxDim / w, maxDim / h)
          w = Math.round(w * scale)
          h = Math.round(h * scale)
        }
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file)
            const compressed = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
              type: 'image/jpeg'
            })
            resolve(compressed)
          },
          'image/jpeg',
          0.8
        )
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  })
}

async function onFileSelect(e) {
  const files = Array.from(e.target.files || [])
  e.target.value = ''
  for (let file of files) {
    if (!file.type.startsWith('image/')) continue
    if (modalImages.value.length >= MAX_IMAGES.value) {
      toast.warning(`Maksimal ${MAX_IMAGES.value} gambar.`)
      break
    }
    // Compress kalau >1MB
    if (file.size > COMPRESS_THRESHOLD) {
      try {
        file = await compressImage(file)
      } catch (err) {
        // fallback: pakai file asli
      }
    }
    // Check total size
    const currentTotal = modalImages.value.reduce((s, it) => s + (it.file?.size || 0), 0)
    if (currentTotal + file.size > MAX_TOTAL_BYTES.value) {
      toast.warning(`Total ukuran gambar melebihi ${Math.round(MAX_TOTAL_BYTES.value / 1024 / 1024)} MB.`)
      break
    }
    // Read preview
    const reader = new FileReader()
    await new Promise((resolve) => {
      reader.onload = (ev) => {
        modalImages.value.push({ file, preview: ev.target.result })
        resolve()
      }
      reader.readAsDataURL(file)
    })
  }
}

function removeImage(idx) {
  modalImages.value.splice(idx, 1)
}

async function simpan() {
  if (saving.value) return
  if (!modalIsi.value && !modalJudul.value && modalImages.value.length === 0) {
    toast.warning('Caption, judul, atau gambar harus diisi.')
    return
  }
  saving.value = true
  try {
    const id = editing.value?.id || `post_${Date.now()}`
    // Upload new images (yang baru — yang punya .file)
    const gambar_urls = []
    for (let i = 0; i < modalImages.value.length; i++) {
      const item = modalImages.value[i]
      if (item.url && !item.file) {
        // Existing image — keep URL
        gambar_urls.push(item.url)
      } else if (item.file) {
        const path = `beranda_post/${id}/${Date.now()}_${i}_${item.file.name}`
        const url = await uploadFile(path, item.file)
        gambar_urls.push(url)
      }
    }
    const sesi = auth.sesiAktif
    const payload = {
      id,
      judul: modalJudul.value || '',
      kategori: modalKategori.value || 'Umum',
      isi: modalIsi.value || '',
      gambar_urls,
      pengirim_id: editing.value?.pengirim_id || String(sesi?.id || ''),
      pengirim_nama: editing.value?.pengirim_nama || sesi?.nama || 'Administrator',
      foto_pengirim: editing.value?.foto_pengirim || sesi?.foto || '',
      tanggal: editing.value?.tanggal || new Date().toISOString()
    }
    if (!editing.value) {
      payload.created_at = serverTimestamp()
    } else {
      payload.updated_at = serverTimestamp()
    }
    await setDoc(doc(db, 'beranda_post', id), payload, { merge: !!editing.value })
    toast.success(editing.value ? 'Post diupdate' : 'Postingan tersimpan')
    modalOpen.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}

async function deletePost(p) {
  const post = typeof p === 'string' ? posts.value.find((x) => x.id === p) : p
  if (!post) return
  const ok = await confirmDlg({
    title: 'Hapus postingan?',
    message: `Postingan ${post.judul ? '"' + post.judul + '"' : 'ini'} akan dihapus permanen.`,
    confirmText: 'Hapus',
    cancelText: 'Batal',
    danger: true
  })
  if (!ok) return
  try {
    await deleteDoc(doc(db, 'beranda_post', String(post.id)))
    toast.success('Postingan dihapus')
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  }
}

onMounted(() => {
  unsub = subscribeColl('beranda_post', (docs) => {
    postsRaw.value = docs
    loading.value = false
  })
})

onUnmounted(() => {
  if (unsub) { try { unsub() } catch (e) {} }
})
</script>
