<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-xl md:text-2xl font-black"><i class="fas fa-file-invoice-dollar text-amber-500 mr-2"></i>Tagihan Santri</h1>
          <p class="text-xs text-slate-500 mt-0.5">Daftar tagihan + status bayar</p>
        </div>
        <div class="flex gap-2">
          <div class="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs"><span class="text-amber-700 font-bold">{{ stats.totalTagihan }}</span> <span class="text-slate-500">tagihan</span></div>
          <div class="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs"><span class="text-rose-700 font-bold">{{ fmtRp(stats.totalTunggakan) }}</span> <span class="text-slate-500">tunggakan</span></div>
          <button v-if="isFullAccess" @click="openModalNew" class="bg-amber-600 hover:bg-amber-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow"><i class="fas fa-plus mr-1"></i>Tambah Tagihan</button>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2">
      <input v-model="search" type="text" placeholder="Cari nama / kategori..." class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
      <select v-model="filterStatus" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
        <option value="">Semua status</option>
        <option value="lunas">Lunas</option>
        <option value="belum">Belum bayar</option>
        <option value="cicil">Cicilan</option>
      </select>
      <select v-model="filterKategori" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
        <option value="">Semua kategori</option>
        <option v-for="k in uniqueKategori" :key="k" :value="k">{{ k }}</option>
      </select>
    </div>

    <div v-if="loading" class="bg-white rounded-2xl p-10 text-center"><i class="fas fa-spinner fa-spin text-amber-500 text-3xl"></i></div>
    <div v-else-if="filteredItems.length === 0" class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center"><i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i><p class="text-sm text-slate-500 italic">Belum ada tagihan.</p></div>
    <div v-else class="space-y-2">
      <div v-for="t in filteredItems" :key="t.id" class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div :class="['w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', statusBg(t)]"><i class="fas fa-file-invoice text-white"></i></div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold truncate">{{ t.santri_nama || getNamaSantri(t.santri_id) }}</p>
            <p class="text-[10px] text-slate-500">{{ t.kategori || '-' }} · {{ t.periode || '-' }} · {{ fmtTgl(t.jatuh_tempo) }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-black" :class="statusText(t)">{{ fmtRp(getSisa(t)) }}</p>
            <p class="text-[9px] uppercase text-slate-500">{{ statusLabel(t) }}</p>
          </div>
          <button v-if="isFullAccess" @click="openBayar(t)" class="text-emerald-500 hover:bg-emerald-50 p-2 rounded" title="Bayar"><i class="fas fa-money-bill-wave"></i></button>
          <button v-if="isFullAccess" @click="deleteTagihan(t)" class="text-rose-500 hover:bg-rose-50 p-2 rounded" title="Hapus"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>

    <!-- Modal Input -->
    <div v-if="modalOpen" class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4" @click.self="modalOpen = false">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5">
        <h3 class="text-base font-black mb-3"><i class="fas fa-file-invoice text-amber-500 mr-1"></i>{{ modalMode === 'bayar' ? 'Bayar Tagihan' : 'Tambah Tagihan' }}</h3>
        <div v-if="modalMode === 'new'" class="space-y-2">
          <select v-model="modalSantriId" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
            <option value="">-- Pilih santri --</option>
            <option v-for="s in santriList" :key="s.id" :value="s.id">{{ s.nama }}</option>
          </select>
          <input v-model="modalKategori" type="text" placeholder="Kategori (SPP, Pendaftaran, dll)" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
          <input v-model="modalPeriode" type="text" placeholder="Periode (cth: April 2026)" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
          <input v-model.number="modalNominal" type="number" min="0" placeholder="Nominal" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white text-right font-bold" />
          <input v-model="modalJatuhTempo" type="date" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
        </div>
        <div v-else class="space-y-2">
          <p class="text-xs">Tagihan: <b>{{ modalTagihan?.santri_nama }}</b> ({{ modalTagihan?.kategori }})</p>
          <p class="text-xs">Sisa: <b class="text-rose-700">{{ fmtRp(getSisa(modalTagihan || {})) }}</b></p>
          <input v-model.number="modalBayarNominal" type="number" min="0" placeholder="Nominal bayar" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white text-right font-bold" />
          <input v-model="modalCatatan" type="text" placeholder="Catatan" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
        </div>
        <div class="mt-4 flex gap-2">
          <button @click="modalOpen = false" class="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-sm">Batal</button>
          <button @click="simpanModal" :disabled="saving" class="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm">{{ saving ? 'Menyimpan...' : 'Simpan' }}</button>
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
import { fmtRp, fmtTgl } from '@/utils/format'

const auth = useAuthStore()
const toast = useToast()
const confirmDlg = useConfirm()
const tagihanRaw = ref([])
const santriList = ref([])
const loading = ref(true)
const search = ref('')
const filterStatus = ref('')
const filterKategori = ref('')
let unsubTagihan = null
let unsubSantri = null

const isFullAccess = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return s.role === 'admin' || s.id === 'admin' || ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
})

function getNamaSantri(id) {
  const s = santriList.value.find((x) => String(x.id) === String(id))
  return s?.nama || '(unknown)'
}

function getSisa(t) {
  const total = Number(t.nominal || 0)
  const bayar = Number(t.bayar || 0)
  return Math.max(0, total - bayar)
}

function statusBg(t) {
  const s = getSisa(t)
  if (s === 0) return 'bg-emerald-500'
  if (Number(t.bayar || 0) > 0) return 'bg-amber-500'
  return 'bg-rose-500'
}
function statusText(t) {
  const s = getSisa(t)
  if (s === 0) return 'text-emerald-700'
  if (Number(t.bayar || 0) > 0) return 'text-amber-700'
  return 'text-rose-700'
}
function statusLabel(t) {
  const s = getSisa(t)
  if (s === 0) return 'Lunas'
  if (Number(t.bayar || 0) > 0) return 'Cicilan'
  return 'Belum bayar'
}

const filteredItems = computed(() => {
  let list = tagihanRaw.value.filter(Boolean)
  if (filterStatus.value === 'lunas') list = list.filter((t) => getSisa(t) === 0)
  else if (filterStatus.value === 'belum') list = list.filter((t) => getSisa(t) > 0 && Number(t.bayar || 0) === 0)
  else if (filterStatus.value === 'cicil') list = list.filter((t) => Number(t.bayar || 0) > 0 && getSisa(t) > 0)
  if (filterKategori.value) list = list.filter((t) => String(t.kategori || '') === filterKategori.value)
  const kw = search.value.trim().toLowerCase()
  if (kw) list = list.filter((t) => String(t.santri_nama || getNamaSantri(t.santri_id) || '').toLowerCase().includes(kw) || String(t.kategori || '').toLowerCase().includes(kw))
  return list.sort((a, b) => String(b.jatuh_tempo || '').localeCompare(String(a.jatuh_tempo || '')))
})

const uniqueKategori = computed(() => [...new Set(tagihanRaw.value.map((t) => t.kategori).filter(Boolean))].sort())

const stats = computed(() => ({
  totalTagihan: tagihanRaw.value.length,
  totalTunggakan: tagihanRaw.value.reduce((s, t) => s + getSisa(t), 0)
}))

const modalOpen = ref(false)
const modalMode = ref('new')
const modalTagihan = ref(null)
const modalSantriId = ref('')
const modalKategori = ref('')
const modalPeriode = ref('')
const modalNominal = ref(0)
const modalJatuhTempo = ref('')
const modalBayarNominal = ref(0)
const modalCatatan = ref('')
const saving = ref(false)

function openModalNew() {
  modalMode.value = 'new'
  modalSantriId.value = ''; modalKategori.value = ''; modalPeriode.value = ''; modalNominal.value = 0
  modalJatuhTempo.value = new Date().toISOString().slice(0, 10)
  modalOpen.value = true
}
function openBayar(t) {
  modalMode.value = 'bayar'
  modalTagihan.value = t
  modalBayarNominal.value = getSisa(t)
  modalCatatan.value = ''
  modalOpen.value = true
}

async function simpanModal() {
  saving.value = true
  try {
    if (modalMode.value === 'new') {
      if (!modalSantriId.value || !modalNominal.value) { toast.warning('Lengkapi data'); return }
      const id = `tagihan_${modalSantriId.value}_${Date.now()}`
      const santri = santriList.value.find((s) => String(s.id) === String(modalSantriId.value))
      await setDoc(doc(db, 'keuangan_tagihan', id), {
        id, santri_id: modalSantriId.value, santri_nama: santri?.nama || '',
        kategori: modalKategori.value, periode: modalPeriode.value,
        nominal: Number(modalNominal.value), bayar: 0,
        jatuh_tempo: modalJatuhTempo.value,
        created_at: serverTimestamp()
      })
      toast.success('Tagihan tersimpan')
    } else {
      const t = modalTagihan.value
      const newBayar = Number(t.bayar || 0) + Number(modalBayarNominal.value || 0)
      await setDoc(doc(db, 'keuangan_tagihan', String(t.id)), { bayar: newBayar, _last_bayar_at: serverTimestamp() }, { merge: true })
      // Tulis ke keuangan_pembayaran log
      await setDoc(doc(db, 'keuangan_pembayaran', `pay_${t.id}_${Date.now()}`), {
        tagihan_id: t.id, santri_id: t.santri_id, santri_nama: t.santri_nama,
        nominal: Number(modalBayarNominal.value), catatan: modalCatatan.value,
        tanggal: new Date().toISOString().slice(0, 10),
        created_at: serverTimestamp()
      })
      toast.success('Pembayaran tersimpan')
    }
    modalOpen.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}

async function deleteTagihan(t) {
  const ok = await confirmDlg({ title: 'Hapus tagihan?', message: `Hapus tagihan ${t.santri_nama}?`, confirmText: 'Hapus', danger: true })
  if (!ok) return
  try { await deleteDoc(doc(db, 'keuangan_tagihan', String(t.id))); toast.success('Tagihan dihapus') } catch (e) { toast.error('Gagal: ' + (e?.message || e)) }
}

onMounted(() => {
  unsubTagihan = subscribeColl('keuangan_tagihan', (docs) => { tagihanRaw.value = docs; loading.value = false })
  unsubSantri = subscribeColl('santri', (docs) => { santriList.value = docs })
})
onUnmounted(() => {
  if (unsubTagihan) { try { unsubTagihan() } catch (e) {} }
  if (unsubSantri) { try { unsubSantri() } catch (e) {} }
})
</script>
