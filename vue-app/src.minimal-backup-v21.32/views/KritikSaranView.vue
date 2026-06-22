<template>
  <div class="p-3 md:p-5 max-w-3xl mx-auto space-y-4">
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h1 class="text-xl md:text-2xl font-black">
        <i class="fas fa-comments text-amber-500 mr-2"></i>Kritik & Saran
      </h1>
      <p class="text-xs text-slate-500 mt-0.5">
        {{ isAdmin ? 'Inbox kritik & saran dari santri/wali' : 'Sampaikan kritik atau saran kamu' }}
      </p>
    </div>
    <div
      v-if="!isAdmin"
      class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2"
    >
      <input
        v-model="form.nama"
        type="text"
        placeholder="Nama (opsional)"
        class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
      />
      <input
        v-model="form.kontak"
        type="text"
        placeholder="WA / Email (opsional)"
        class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
      />
      <select
        v-model="form.kategori"
        class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
      >
        <option value="saran">Saran</option>
        <option value="kritik">Kritik</option>
        <option value="pertanyaan">Pertanyaan</option>
      </select>
      <textarea
        v-model="form.isi"
        rows="4"
        placeholder="Tuliskan kritik / saran / pertanyaan..."
        class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white resize-none"
      ></textarea>
      <button
        @click="kirim"
        :disabled="!form.isi || saving"
        class="w-full px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow"
      >
        {{ saving ? 'Mengirim...' : 'Kirim' }}
      </button>
    </div>
    <div v-if="isAdmin">
      <div v-if="loading" class="bg-white rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-amber-500 text-3xl"></i>
      </div>
      <div
        v-else-if="items.length === 0"
        class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center"
      >
        <i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i>
        <p class="text-sm text-slate-500 italic">Belum ada kritik/saran.</p>
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="k in items"
          :key="k.id"
          class="bg-white rounded-xl p-3 border border-slate-200 shadow-sm"
        >
          <div class="flex items-center justify-between mb-1">
            <p class="text-sm font-bold">
              {{ k.nama || 'Anonim' }} ·
              <span class="text-xs text-amber-700">{{ k.kategori }}</span>
            </p>
            <button @click="deleteItem(k)" class="text-rose-500 hover:bg-rose-50 p-1.5 rounded">
              <i class="fas fa-trash text-xs"></i>
            </button>
          </div>
          <p class="text-[10px] text-slate-500 mb-1">
            {{ k.tanggal || '-' }} · {{ k.kontak || '-' }}
          </p>
          <p class="text-sm text-slate-700">{{ k.isi }}</p>
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
const saving = ref(false)
const form = ref({ nama: '', kontak: '', kategori: 'saran', isi: '' })
let unsub = null
const isAdmin = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return s.role === 'admin' || s.id === 'admin' || ['super_admin', 'admin'].includes(s.role_sistem)
})
async function kirim() {
  if (!form.value.isi || saving.value) return
  saving.value = true
  try {
    const id = `kritik_${Date.now()}`
    await setDoc(doc(db, 'kritik_saran', id), {
      id,
      ...form.value,
      tanggal: new Date().toISOString().slice(0, 10),
      created_at: serverTimestamp()
    })
    toast.success('Terima kasih, kritik/saran tersimpan')
    form.value = { nama: '', kontak: '', kategori: 'saran', isi: '' }
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}
async function deleteItem(k) {
  const ok = await confirmDlg({
    title: 'Hapus?',
    message: 'Hapus pesan ini?',
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    await deleteDoc(doc(db, 'kritik_saran', String(k.id)))
    toast.success('Dihapus')
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  }
}
onMounted(() => {
  unsub = subscribeColl('kritik_saran', (docs) => {
    items.value = docs.sort((a, b) =>
      String(b.tanggal || '').localeCompare(String(a.tanggal || ''))
    )
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
