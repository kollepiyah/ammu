<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-xl md:text-2xl font-black"><i class="fas fa-calendar-check text-purple-500 mr-2"></i>Kegiatan Pesantren</h1>
          <p class="text-xs text-slate-500 mt-0.5">Catatan kegiatan harian santri Ma'had</p>
        </div>
        <button v-if="isAdmin" @click="openModal()" class="bg-purple-600 hover:bg-purple-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow"><i class="fas fa-plus mr-1"></i>Tambah Kegiatan</button>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-2">
      <input v-model="search" type="text" placeholder="Cari nama kegiatan..." class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
      <input v-model="filterTanggal" type="date" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
    </div>

    <div v-if="loading" class="bg-white rounded-2xl p-10 text-center"><i class="fas fa-spinner fa-spin text-purple-500 text-3xl"></i></div>
    <div v-else-if="filteredItems.length === 0" class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center"><i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i><p class="text-sm text-slate-500 italic">Belum ada kegiatan.</p></div>
    <div v-else class="space-y-2">
      <div v-for="k in filteredItems" :key="k.id" class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0"><i class="fas fa-mosque"></i></div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold truncate">{{ k.nama }}</p>
            <p class="text-[10px] text-slate-500">{{ k.tanggal || '-' }} {{ k.waktu ? '· '+k.waktu : '' }} · {{ k.lokasi || '-' }}</p>
            <p v-if="k.deskripsi" class="text-[11px] text-slate-600 mt-1">{{ k.deskripsi }}</p>
          </div>
          <button v-if="isAdmin" @click="deleteItem(k)" class="text-rose-500 hover:bg-rose-50 p-2 rounded"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>

    <div v-if="modalOpen" class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4" @click.self="modalOpen = false">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 space-y-3">
        <h3 class="text-base font-black"><i class="fas fa-calendar-plus text-purple-500 mr-1"></i>Tambah Kegiatan</h3>
        <input v-model="modalNama" type="text" placeholder="Nama kegiatan" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
        <div class="grid grid-cols-2 gap-2">
          <input v-model="modalTanggal" type="date" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
          <input v-model="modalWaktu" type="time" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
        </div>
        <input v-model="modalLokasi" type="text" placeholder="Lokasi" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
        <textarea v-model="modalDeskripsi" rows="3" placeholder="Deskripsi kegiatan" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white resize-none"></textarea>
        <div class="flex gap-2">
          <button @click="modalOpen = false" class="flex-1 px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl text-sm">Batal</button>
          <button @click="simpan" :disabled="saving || !modalNama" class="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm">{{ saving ? 'Menyimpan...' : 'Simpan' }}</button>
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
const items = ref([])
const loading = ref(true)
const search = ref('')
const filterTanggal = ref('')
const modalOpen = ref(false)
const modalNama = ref('')
const modalTanggal = ref('')
const modalWaktu = ref('')
const modalLokasi = ref('')
const modalDeskripsi = ref('')
const saving = ref(false)
let unsub = null

const isAdmin = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return s.role === 'admin' || s.id === 'admin' || ['super_admin', 'admin'].includes(s.role_sistem)
})

const filteredItems = computed(() => {
  let list = [...items.value]
  if (filterTanggal.value) list = list.filter((k) => String(k.tanggal || '') === filterTanggal.value)
  const kw = search.value.trim().toLowerCase()
  if (kw) list = list.filter((k) => String(k.nama || '').toLowerCase().includes(kw))
  return list.sort((a, b) => String(b.tanggal || '').localeCompare(String(a.tanggal || '')))
})

function openModal() {
  modalNama.value = ''; modalTanggal.value = new Date().toISOString().slice(0, 10)
  modalWaktu.value = ''; modalLokasi.value = ''; modalDeskripsi.value = ''
  modalOpen.value = true
}

async function simpan() {
  if (saving.value) return
  saving.value = true
  try {
    const id = `keg_${Date.now()}`
    await setDoc(doc(db, 'kegiatan_pesantren', id), {
      id, nama: modalNama.value, tanggal: modalTanggal.value,
      waktu: modalWaktu.value, lokasi: modalLokasi.value, deskripsi: modalDeskripsi.value,
      created_at: serverTimestamp()
    })
    toast.success('Tersimpan')
    modalOpen.value = false
  } catch (e) { toast.error('Gagal: ' + (e?.message || e)) } finally { saving.value = false }
}

async function deleteItem(k) {
  const ok = await confirmDlg({ title: 'Hapus?', message: `Hapus kegiatan "${k.nama}"?`, confirmText: 'Hapus', danger: true })
  if (!ok) return
  try { await deleteDoc(doc(db, 'kegiatan_pesantren', String(k.id))); toast.success('Dihapus') } catch (e) { toast.error('Gagal: ' + (e?.message || e)) }
}

onMounted(() => { unsub = subscribeColl('kegiatan_pesantren', (docs) => { items.value = docs; loading.value = false }) })
onUnmounted(() => { if (unsub) { try { unsub() } catch (e) {} } })
</script>
