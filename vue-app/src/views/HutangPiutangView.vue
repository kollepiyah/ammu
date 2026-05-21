<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-xl md:text-2xl font-black"><i class="fas fa-balance-scale text-rose-500 mr-2"></i>Hutang Piutang</h1>
          <p class="text-xs text-slate-500 mt-0.5">Catatan hutang + piutang pesantren</p>
        </div>
        <button @click="openModal()" class="bg-rose-600 hover:bg-rose-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow"><i class="fas fa-plus mr-1"></i>Tambah</button>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div class="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200">
        <p class="text-[10px] uppercase font-black text-amber-700">Hutang (kewajiban)</p>
        <p class="text-2xl font-black text-amber-800 mt-1">{{ fmtRp(totalHutang) }}</p>
      </div>
      <div class="bg-cyan-50 rounded-2xl p-4 border-2 border-cyan-200">
        <p class="text-[10px] uppercase font-black text-cyan-700">Piutang (klaim)</p>
        <p class="text-2xl font-black text-cyan-800 mt-1">{{ fmtRp(totalPiutang) }}</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="px-4 py-3 border-b border-slate-100 grid grid-cols-2 gap-2">
        <button @click="filterJenis = ''" :class="['py-1.5 text-xs font-bold rounded-lg', filterJenis === '' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600']">Semua ({{ items.length }})</button>
        <select v-model="filterStatus" class="px-2 py-1.5 text-xs rounded-lg border border-slate-300 bg-white">
          <option value="">Semua status</option>
          <option value="open">Belum lunas</option>
          <option value="lunas">Lunas</option>
        </select>
      </div>
      <div v-if="filteredItems.length === 0" class="p-10 text-center"><i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i><p class="text-sm text-slate-500 italic">Belum ada catatan.</p></div>
      <div v-else class="divide-y divide-slate-100">
        <div v-for="h in filteredItems" :key="h.id" class="p-3 flex items-center gap-3">
          <div :class="['w-9 h-9 rounded-full flex items-center justify-center text-white', h.jenis === 'piutang' ? 'bg-cyan-500' : 'bg-amber-500']">
            <i :class="['fas', h.jenis === 'piutang' ? 'fa-hand-holding-usd' : 'fa-receipt']"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold truncate">{{ h.pihak }}</p>
            <p class="text-[10px] text-slate-500">{{ h.jenis === 'piutang' ? 'Piutang' : 'Hutang' }} · {{ h.catatan || '-' }} · {{ h.tanggal || '-' }}</p>
          </div>
          <div class="text-right">
            <p :class="['text-sm font-black', h.jenis === 'piutang' ? 'text-cyan-700' : 'text-amber-700']">{{ fmtRp(h.nominal) }}</p>
            <p class="text-[9px] uppercase" :class="h.lunas ? 'text-emerald-600' : 'text-rose-600'">{{ h.lunas ? 'Lunas' : 'Open' }}</p>
          </div>
          <button @click="toggleLunas(h)" class="text-emerald-500 hover:bg-emerald-50 p-2 rounded" :title="h.lunas ? 'Tandai Open' : 'Tandai Lunas'"><i class="fas fa-check"></i></button>
          <button @click="deleteItem(h)" class="text-rose-500 hover:bg-rose-50 p-2 rounded"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>

    <div v-if="modalOpen" class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4" @click.self="modalOpen = false">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 space-y-3">
        <h3 class="text-base font-black"><i class="fas fa-balance-scale text-rose-500 mr-1"></i>Tambah Hutang/Piutang</h3>
        <select v-model="modalJenis" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
          <option value="hutang">Hutang (pesantren wajib bayar)</option>
          <option value="piutang">Piutang (pesantren klaim ke pihak)</option>
        </select>
        <input v-model="modalPihak" type="text" placeholder="Nama pihak (orang/toko/dll)" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
        <input v-model.number="modalNominal" type="number" min="0" placeholder="Nominal" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white text-right font-bold" />
        <input v-model="modalTanggal" type="date" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
        <textarea v-model="modalCatatan" rows="2" placeholder="Catatan" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white resize-none"></textarea>
        <div class="flex gap-2">
          <button @click="modalOpen = false" class="flex-1 px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl text-sm">Batal</button>
          <button @click="simpan" :disabled="saving" class="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm">{{ saving ? 'Menyimpan...' : 'Simpan' }}</button>
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
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { fmtRp } from '@/utils/format'

const toast = useToast()
const confirmDlg = useConfirm()
const items = ref([])
const filterJenis = ref('')
const filterStatus = ref('')
const modalOpen = ref(false)
const modalJenis = ref('hutang')
const modalPihak = ref('')
const modalNominal = ref(0)
const modalTanggal = ref('')
const modalCatatan = ref('')
const saving = ref(false)
let unsub = null

const filteredItems = computed(() => {
  let list = [...items.value]
  if (filterJenis.value) list = list.filter((h) => h.jenis === filterJenis.value)
  if (filterStatus.value === 'lunas') list = list.filter((h) => h.lunas)
  else if (filterStatus.value === 'open') list = list.filter((h) => !h.lunas)
  return list.sort((a, b) => String(b.tanggal || '').localeCompare(String(a.tanggal || '')))
})

const totalHutang = computed(() => items.value.filter((h) => h.jenis === 'hutang' && !h.lunas).reduce((s, h) => s + Number(h.nominal || 0), 0))
const totalPiutang = computed(() => items.value.filter((h) => h.jenis === 'piutang' && !h.lunas).reduce((s, h) => s + Number(h.nominal || 0), 0))

function openModal() {
  modalJenis.value = 'hutang'; modalPihak.value = ''; modalNominal.value = 0
  modalTanggal.value = new Date().toISOString().slice(0, 10); modalCatatan.value = ''
  modalOpen.value = true
}

async function simpan() {
  if (!modalPihak.value || !modalNominal.value || saving.value) return
  saving.value = true
  try {
    const id = `hp_${modalJenis.value}_${Date.now()}`
    await setDoc(doc(db, 'keuangan_hutang_piutang', id), {
      id, jenis: modalJenis.value, pihak: modalPihak.value,
      nominal: Number(modalNominal.value), tanggal: modalTanggal.value, catatan: modalCatatan.value,
      lunas: false, created_at: serverTimestamp()
    })
    toast.success('Tersimpan')
    modalOpen.value = false
  } catch (e) { toast.error('Gagal: ' + (e?.message || e)) } finally { saving.value = false }
}

async function toggleLunas(h) {
  try { await setDoc(doc(db, 'keuangan_hutang_piutang', String(h.id)), { lunas: !h.lunas, _last_update: serverTimestamp() }, { merge: true }); toast.success(h.lunas ? 'Set ke Open' : 'Set Lunas') } catch (e) { toast.error('Gagal: ' + (e?.message || e)) }
}

async function deleteItem(h) {
  const ok = await confirmDlg({ title: 'Hapus?', message: `Hapus ${h.jenis} dari ${h.pihak}?`, confirmText: 'Hapus', danger: true })
  if (!ok) return
  try { await deleteDoc(doc(db, 'keuangan_hutang_piutang', String(h.id))); toast.success('Dihapus') } catch (e) { toast.error('Gagal: ' + (e?.message || e)) }
}

onMounted(() => { unsub = subscribeColl('keuangan_hutang_piutang', (docs) => { items.value = docs }) })
onUnmounted(() => { if (unsub) { try { unsub() } catch (e) {} } })
</script>
