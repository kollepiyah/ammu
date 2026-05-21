<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-xl md:text-2xl font-black"><i class="fas fa-hand-holding-usd text-emerald-500 mr-2"></i>Slip Bisyaroh Guru</h1>
          <p class="text-xs text-slate-500 mt-0.5">Bisyaroh / honor guru per periode</p>
        </div>
        <div class="flex gap-2">
          <div class="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs"><span class="text-emerald-700 font-bold">{{ totalTakeFmt }}</span> <span class="text-slate-500">total take home</span></div>
          <button v-if="isFullAccess" @click="openModalNew" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow"><i class="fas fa-plus mr-1"></i>Buat Slip</button>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2">
      <input v-model="search" type="text" placeholder="Cari nama guru..." class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
      <select v-model="filterPeriode" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
        <option value="">Semua periode</option>
        <option v-for="p in uniquePeriode" :key="p" :value="p">{{ p }}</option>
      </select>
      <select v-model.number="filterTahun" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
        <option v-for="y in [2024,2025,2026,2027]" :key="y" :value="y">{{ y }}</option>
      </select>
    </div>

    <div v-if="loading" class="bg-white rounded-2xl p-10 text-center"><i class="fas fa-spinner fa-spin text-emerald-500 text-3xl"></i></div>
    <div v-else-if="filteredGaji.length === 0" class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center"><i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i><p class="text-sm text-slate-500 italic">Belum ada slip.</p></div>
    <div v-else class="space-y-2">
      <div v-for="g in filteredGaji" :key="g.id" class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3 flex-wrap">
          <div class="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0"><i class="fas fa-receipt"></i></div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 truncate">{{ getNamaGuruGelar(g.guru_nama || guruNamaById(g.guru_id)) }}</p>
            <p class="text-[10px] text-slate-500">{{ g.lembaga || '-' }} · {{ g.jabatan || 'Guru' }} · Periode: {{ g.periode }}</p>
          </div>
          <span class="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">{{ g.periode }}</span>
          <div class="text-right">
            <p class="text-lg font-black text-emerald-700">{{ fmtRp(g.take_home || 0) }}</p>
            <p class="text-[9px] uppercase text-slate-500">Take Home</p>
          </div>
          <button v-if="isFullAccess" @click="openEdit(g)" class="text-blue-500 hover:bg-blue-50 p-2 rounded"><i class="fas fa-edit"></i></button>
          <button v-if="isFullAccess" @click="deleteSlip(g)" class="text-rose-500 hover:bg-rose-50 p-2 rounded"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>

    <!-- Modal Input -->
    <div v-if="modalOpen" class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4" @click.self="modalOpen = false">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5">
        <h3 class="text-base font-black mb-3"><i class="fas fa-receipt text-emerald-500 mr-1"></i>{{ modalMode === 'edit' ? 'Edit Slip' : 'Buat Slip Baru' }}</h3>
        <div class="space-y-2">
          <select v-model="modalGuruId" :disabled="modalMode==='edit'" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white disabled:opacity-50">
            <option value="">-- Pilih guru --</option>
            <option v-for="g in guruList" :key="g.id" :value="g.id">{{ getNamaGuruGelar(g.nama) }}</option>
          </select>
          <div class="grid grid-cols-2 gap-2">
            <select v-model.number="modalBulan" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
              <option v-for="(b, i) in NAMA_BULAN" :key="b" :value="i+1">{{ b }}</option>
            </select>
            <input v-model.number="modalTahun" type="number" min="2024" max="2030" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white text-center" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Bisyaroh Pokok</label>
            <input v-model.number="modalPokok" type="number" min="0" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white text-right" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Bisyaroh Sekolah</label>
            <input v-model.number="modalSekolah" type="number" min="0" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white text-right" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Tambahan</label>
            <input v-model.number="modalTambahan" type="number" min="0" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white text-right" />
          </div>
          <div>
            <label class="block text-xs font-bold text-rose-600 mb-1">Potongan</label>
            <input v-model.number="modalPotongan" type="number" min="0" class="w-full px-3 py-2 text-sm rounded-xl border border-rose-300 bg-rose-50 text-right" />
          </div>
          <div class="bg-emerald-50 rounded-lg p-2 text-center">
            <p class="text-[10px] uppercase text-emerald-700 font-bold">Take Home</p>
            <p class="text-xl font-black text-emerald-800">{{ fmtRp(takeHomeCalc) }}</p>
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <button @click="modalOpen = false" class="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-sm">Batal</button>
          <button @click="simpanSlip" :disabled="saving || !modalGuruId" class="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm">
            <i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>{{ saving ? 'Menyimpan...' : 'Simpan' }}
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
import { fmtRp, getNamaGuruGelar } from '@/utils/format'

const NAMA_BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const auth = useAuthStore()
const toast = useToast()
const confirmDlg = useConfirm()

const gaji = ref([])
const guruList = ref([])
const loading = ref(true)
const search = ref('')
const filterPeriode = ref('')
const filterTahun = ref(new Date().getFullYear())
let unsubGaji = null
let unsubGuru = null

const isFullAccess = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return s.role === 'admin' || s.id === 'admin' || ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
})

function guruNamaById(id) {
  const g = guruList.value.find((x) => String(x.id) === String(id))
  return g?.nama || '(unknown)'
}

const filteredGaji = computed(() => {
  let list = [...gaji.value]
  if (filterPeriode.value) list = list.filter((g) => g.periode === filterPeriode.value)
  const kw = search.value.trim().toLowerCase()
  if (kw) list = list.filter((g) => String(g.guru_nama || guruNamaById(g.guru_id)).toLowerCase().includes(kw))
  return list.sort((a, b) => String(b.periode || '').localeCompare(String(a.periode || '')))
})

const uniquePeriode = computed(() => [...new Set(gaji.value.map((g) => g.periode).filter(Boolean))].sort().reverse())
const totalTakeFmt = computed(() => fmtRp(filteredGaji.value.reduce((s, g) => s + (Number(g.take_home) || 0), 0)))

// Modal
const modalOpen = ref(false)
const modalMode = ref('new')
const modalSlip = ref(null)
const modalGuruId = ref('')
const modalBulan = ref(new Date().getMonth() + 1)
const modalTahun = ref(new Date().getFullYear())
const modalPokok = ref(0)
const modalSekolah = ref(0)
const modalTambahan = ref(0)
const modalPotongan = ref(0)
const saving = ref(false)

const takeHomeCalc = computed(() =>
  (Number(modalPokok.value) || 0) + (Number(modalSekolah.value) || 0) + (Number(modalTambahan.value) || 0) - (Number(modalPotongan.value) || 0)
)

function openModalNew() {
  modalMode.value = 'new'
  modalGuruId.value = ''
  modalBulan.value = new Date().getMonth() + 1
  modalTahun.value = new Date().getFullYear()
  modalPokok.value = 0; modalSekolah.value = 0; modalTambahan.value = 0; modalPotongan.value = 0
  modalOpen.value = true
}
function openEdit(g) {
  modalMode.value = 'edit'
  modalSlip.value = g
  modalGuruId.value = g.guru_id
  const [y, m] = String(g.periode || '').split('-')
  modalTahun.value = Number(y) || new Date().getFullYear()
  modalBulan.value = Number(m) || new Date().getMonth() + 1
  modalPokok.value = Number(g.bisyaroh_pokok || 0)
  modalSekolah.value = Number(g.bisyaroh_sekolah || 0)
  modalTambahan.value = Number(g.bisyaroh_tambahan || 0)
  modalPotongan.value = Number(g.total_potongan || 0)
  modalOpen.value = true
}

async function simpanSlip() {
  if (!modalGuruId.value || saving.value) return
  saving.value = true
  try {
    const guru = guruList.value.find((x) => String(x.id) === String(modalGuruId.value))
    const periode = `${modalTahun.value}-${String(modalBulan.value).padStart(2, '0')}`
    const id = `gaji_${modalGuruId.value}_${periode}`
    const pokok = Number(modalPokok.value) || 0
    const sekolah = Number(modalSekolah.value) || 0
    const tambahan = Number(modalTambahan.value) || 0
    const potongan = Number(modalPotongan.value) || 0
    const totalPemasukan = pokok + sekolah + tambahan
    await setDoc(doc(db, 'keuangan_gaji', id), {
      id, guru_id: Number(modalGuruId.value) || modalGuruId.value, guru_nama: guru?.nama || '',
      lembaga: guru?.lembaga || '', jabatan: guru?.jabatan || '',
      periode,
      bisyaroh_pokok: pokok, bisyaroh_sekolah: sekolah, bisyaroh_tambahan: tambahan,
      total_pemasukan: totalPemasukan, total_potongan: potongan,
      take_home: totalPemasukan - potongan,
      updated_at: serverTimestamp()
    }, { merge: true })
    toast.success('Slip tersimpan')
    modalOpen.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}

async function deleteSlip(g) {
  const ok = await confirmDlg({ title: 'Hapus slip?', message: `Hapus slip ${getNamaGuruGelar(g.guru_nama)} periode ${g.periode}?`, confirmText: 'Hapus', danger: true })
  if (!ok) return
  try { await deleteDoc(doc(db, 'keuangan_gaji', String(g.id))); toast.success('Slip dihapus') } catch (e) { toast.error('Gagal: ' + (e?.message || e)) }
}

onMounted(() => {
  unsubGaji = subscribeColl('keuangan_gaji', (docs) => { gaji.value = docs; loading.value = false })
  unsubGuru = subscribeColl('guru', (docs) => { guruList.value = docs })
})
onUnmounted(() => {
  if (unsubGaji) { try { unsubGaji() } catch (e) {} }
  if (unsubGuru) { try { unsubGuru() } catch (e) {} }
})
</script>
