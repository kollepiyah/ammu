<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex justify-between items-center gap-3"
    >
      <div>
        <h1 class="text-xl md:text-2xl font-black">
          <i class="fas fa-bullhorn text-blue-500 mr-2"></i>Mading / Pengumuman
        </h1>
        <p class="text-xs text-slate-500 mt-0.5">{{ posts.length }} pengumuman</p>
      </div>
      <button
        v-if="isAdmin"
        @click="openModal()"
        class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow"
      >
        <i class="fas fa-plus mr-1"></i>Tambah Pengumuman
      </button>
    </div>
    <div v-if="loading" class="bg-white rounded-2xl p-10 text-center">
      <i class="fas fa-spinner fa-spin text-blue-500 text-3xl"></i>
    </div>
    <div
      v-else-if="posts.length === 0"
      class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center"
    >
      <i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i>
      <p class="text-sm text-slate-500 italic">Belum ada pengumuman.</p>
    </div>
    <div v-else class="space-y-3">
      <div
        v-for="p in posts"
        :key="p.id"
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 shadow-sm"
      >
        <div class="flex items-start justify-between gap-3 mb-2">
          <h3 class="text-base font-black">{{ p.judul }}</h3>
          <button
            v-if="isAdmin"
            @click="deletePost(p)"
            class="text-rose-500 hover:bg-rose-50 p-1.5 rounded"
          >
            <i class="fas fa-trash text-xs"></i>
          </button>
        </div>
        <p class="text-[10px] text-slate-500 mb-2">
          {{ p.tanggal || '-' }} · {{ p.kategori || 'Umum' }}
        </p>
        <p class="text-sm text-slate-700 whitespace-pre-line">{{ p.isi }}</p>
      </div>
    </div>
    <div
      v-if="modalOpen"
      class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
      @click.self="modalOpen = false"
    >
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 space-y-3">
        <h3 class="text-base font-black">
          <i class="fas fa-edit text-blue-500 mr-1"></i>Tambah Pengumuman
        </h3>
        <input
          v-model="modalJudul"
          type="text"
          placeholder="Judul"
          class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
        />
        <input
          v-model="modalKategori"
          type="text"
          placeholder="Kategori (Umum/Akademik/Keuangan)"
          class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
        />
        <textarea
          v-model="modalIsi"
          rows="5"
          placeholder="Isi pengumuman..."
          class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white resize-none"
        ></textarea>
        <div class="flex gap-2">
          <button
            @click="modalOpen = false"
            class="flex-1 px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl text-sm"
          >
            Batal
          </button>
          <button
            @click="simpan"
            :disabled="saving || !modalJudul"
            class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm"
          >
            {{ saving ? 'Menyimpan...' : 'Posting' }}
          </button>
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
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
const auth = useAuthStore()
const toast = useToast()
const confirmDlg = useConfirm()
const postsRaw = ref([])
const loading = ref(true)
const modalOpen = ref(false)
const modalJudul = ref('')
const modalKategori = ref('')
const modalIsi = ref('')
const saving = ref(false)
let unsub = null
const isAdmin = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return s.role === 'admin' || s.id === 'admin' || ['super_admin', 'admin'].includes(s.role_sistem)
})
const posts = computed(() =>
  [...postsRaw.value].sort((a, b) => String(b.tanggal || '').localeCompare(String(a.tanggal || '')))
)
function openModal() {
  modalJudul.value = ''
  modalKategori.value = 'Umum'
  modalIsi.value = ''
  modalOpen.value = true
}
async function simpan() {
  if (saving.value) return
  saving.value = true
  try {
    const id = `post_${Date.now()}`
    await setDoc(doc(db, 'posts', id), {
      id,
      judul: modalJudul.value,
      kategori: modalKategori.value,
      isi: modalIsi.value,
      tanggal: new Date().toISOString().slice(0, 10),
      created_at: serverTimestamp()
    })
    toast.success('Tersimpan')
    modalOpen.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}
async function deletePost(p) {
  const ok = await confirmDlg({
    title: 'Hapus?',
    message: `Hapus "${p.judul}"?`,
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    await deleteDoc(doc(db, 'posts', String(p.id)))
    toast.success('Dihapus')
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  }
}
onMounted(() => {
  unsub = subscribeColl('posts', (docs) => {
    postsRaw.value = docs
    loading.value = false
  })
})
onUnmounted(() => {
  if (unsub) {
    try {
      unsub()
    } catch (e) {}
  }
})
</script>
