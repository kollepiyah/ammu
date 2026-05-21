<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- Header -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
            <i class="fas fa-hand-holding-usd text-rose-600 mr-2"></i>Hutang Piutang
          </h1>
          <p class="text-xs text-slate-500 mt-0.5">Pencatatan hutang pondok ke pihak luar atau personil.</p>
        </div>
        <div class="flex gap-2 flex-wrap">
          <button @click="exportHutangExcel" :disabled="exportingHP" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold cursor-pointer">
            <i :class="['fas', exportingHP ? 'fa-spinner fa-spin' : 'fa-file-excel', 'mr-1']"></i>{{ exportingHP ? '...' : 'Ekspor Excel' }}
          </button>
          <button v-if="isFullAccess" @click="bukaModal()" class="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer">
            <i class="fas fa-plus mr-1"></i>Tambah Hutang
          </button>
        </div>
      </div>
    </div>

    <!-- Lock -->
    <div v-if="!isFullAccess" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center">
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Akses Keuangan terbatas</p>
    </div>

    <template v-else>
      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-4 border border-rose-200 dark:border-rose-700">
          <p class="text-[10px] font-black text-rose-700 dark:text-rose-300 uppercase tracking-wider">Total Belum Lunas</p>
          <p class="text-lg font-black text-rose-800 dark:text-rose-200 mt-1">{{ fmtRp(totalBelum) }}</p>
        </div>
        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <p class="text-[10px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-wider">Jatuh Tempo &lt;7 Hari</p>
          <p class="text-lg font-black text-amber-800 dark:text-amber-200 mt-1">{{ fmtRp(totalJatuhTempo7) }}</p>
        </div>
        <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700">
          <p class="text-[10px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Total Lunas</p>
          <p class="text-lg font-black text-emerald-800 dark:text-emerald-200 mt-1">{{ fmtRp(totalLunas) }}</p>
        </div>
      </div>

      <!-- Filter bar -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input v-model="search" type="search" placeholder="Cari kepada / keterangan..." class="px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white" />
          <select v-model="filterStatus" class="px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
            <option value="">Semua status</option>
            <option value="belum">Belum Lunas</option>
            <option value="lunas">Lunas</option>
          </select>
        </div>
      </div>

      <!-- List -->
      <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-rose-500 text-2xl"></i>
      </div>
      <div v-else-if="filtered.length === 0" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center">
        <i class="fas fa-inbox text-slate-300 text-4xl mb-2"></i>
        <p class="text-sm text-slate-500 italic">Belum ada catatan hutang.</p>
      </div>
      <div v-else class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <table class="w-full text-xs">
          <thead class="bg-slate-100 dark:bg-slate-900/40 text-[10px] font-black uppercase tracking-widest">
            <tr>
              <th class="px-3 py-2.5 text-left">Tgl Hutang</th>
              <th class="px-3 py-2.5 text-left">Kepada</th>
              <th class="px-3 py-2.5 text-left">Keterangan</th>
              <th class="px-3 py-2.5 text-right">Nominal</th>
              <th class="px-3 py-2.5 text-center">Jatuh Tempo</th>
              <th class="px-3 py-2.5 text-center">Status</th>
              <th class="px-3 py-2.5 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in filtered" :key="h.id" :class="['border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/30', isTempoDekat(h) ? 'bg-amber-50/40' : '']">
              <td class="px-3 py-2 whitespace-nowrap">{{ fmtTgl(h.tanggal) }}</td>
              <td class="px-3 py-2 font-bold text-slate-800 dark:text-white">{{ h.kepada }}</td>
              <td class="px-3 py-2 text-slate-600 dark:text-slate-300">{{ h.keterangan }}</td>
              <td class="px-3 py-2 text-right font-black text-rose-700 dark:text-rose-400 whitespace-nowrap">{{ fmtRp(h.nominal) }}</td>
              <td class="px-3 py-2 text-center text-[11px]">{{ h.jatuh_tempo ? fmtTgl(h.jatuh_tempo) : '-' }}</td>
              <td class="px-3 py-2 text-center">
                <span :class="['text-[10px] font-black px-2 py-0.5 rounded uppercase', h.status === 'lunas' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700']">{{ h.status === 'lunas' ? 'Lunas' : 'Belum Lunas' }}</span>
              </td>
              <td class="px-3 py-2 text-center">
                <div class="flex gap-1 justify-center">
                  <button v-if="h.status !== 'lunas'" @click="markLunas(h)" class="text-[10px] font-bold px-2 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-700"><i class="fas fa-check mr-0.5"></i>Lunas</button>
                  <button @click="bukaModal(h)" class="text-[10px] font-bold px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-700"><i class="fas fa-edit"></i></button>
                  <button @click="hapus(h)" class="text-[10px] font-bold px-2 py-1 rounded bg-rose-100 hover:bg-rose-200 text-rose-700"><i class="fas fa-trash"></i></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- Modal Add/Edit -->
    <Teleport to="body">
      <div v-if="modalOpen" class="fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3" @click.self="tutupModal">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border-t-8 border-rose-500">
          <header class="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 px-5 py-4">
            <h3 class="text-base font-black text-slate-800 dark:text-white">
              <i class="fas fa-hand-holding-usd mr-2 text-rose-600"></i>{{ form.id ? 'Edit Hutang' : 'Tambah Hutang' }}
            </h3>
            <button @click="tutupModal" class="text-slate-400 hover:text-red-500 text-2xl font-bold w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center cursor-pointer">&times;</button>
          </header>
          <div class="p-5 space-y-3">
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Tanggal</label>
              <input v-model="form.tanggal" type="date" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white" />
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Kepada *</label>
              <input v-model="form.kepada" type="text" placeholder="Nama pihak / personil" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white" />
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Keterangan</label>
              <textarea v-model="form.keterangan" rows="2" placeholder="Untuk apa..." class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white resize-none"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Nominal *</label>
                <input v-model.number="form.nominal" type="number" min="0" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white" />
              </div>
              <div>
                <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Jatuh Tempo</label>
                <input v-model="form.jatuh_tempo" type="date" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white" />
              </div>
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Status</label>
              <select v-model="form.status" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white">
                <option value="belum">Belum Lunas</option>
                <option value="lunas">Lunas</option>
              </select>
            </div>
          </div>
          <footer class="px-5 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-2 rounded-b-2xl">
            <button @click="tutupModal" class="px-4 py-2 text-sm font-bold rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700">Batal</button>
            <button @click="simpan" :disabled="saving" class="px-5 py-2 text-sm font-black rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-md disabled:opacity-50">
              <i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>{{ saving ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </footer>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { useExcel as _useExcelHP } from '@/composables/useExcel'
import { useSettingsStore as _useSettingsHP } from '@/stores/settings'

// v.72.15.0526: Hutang Piutang full Vue port (kyai req — fitur baru, belum ada di Vue)
// Legacy: page-section "keu-hutang" — koleksi keuangan_hutang
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { subscribeColl } from '@/services/firestore'
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { fmtRp, fmtTgl } from '@/utils/format'

const auth = useAuthStore()
const toast = useToast()

const list = ref([])
const loading = ref(true)
let unsub = null

const filterStatus = ref('') // '' | 'belum' | 'lunas'
const search = ref('')

const isFullAccess = computed(() => {
  const s = auth.sesiAktif
  const rs = s?.role_sistem || ''
  return s?.role === 'admin' || ['admin', 'admin_keuangan', 'super_admin'].includes(rs)
})

const filtered = computed(() => {
  let arr = [...list.value]
  if (filterStatus.value === 'belum') arr = arr.filter((h) => h.status !== 'lunas')
  if (filterStatus.value === 'lunas') arr = arr.filter((h) => h.status === 'lunas')
  const kw = search.value.trim().toLowerCase()
  if (kw) {
    arr = arr.filter((h) =>
      String(h.kepada || '').toLowerCase().includes(kw) ||
      String(h.keterangan || '').toLowerCase().includes(kw)
    )
  }
  return arr.sort((a, b) => (b.tanggal || '').localeCompare(a.tanggal || ''))
})

const totalBelum = computed(() =>
  list.value.filter((h) => h.status !== 'lunas').reduce((s, h) => s + (Number(h.nominal) || 0), 0)
)
const totalLunas = computed(() =>
  list.value.filter((h) => h.status === 'lunas').reduce((s, h) => s + (Number(h.nominal) || 0), 0)
)
const totalJatuhTempo7 = computed(() => {
  const now = new Date()
  const limit = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  return list.value
    .filter((h) => h.status !== 'lunas' && h.jatuh_tempo && new Date(h.jatuh_tempo) <= limit)
    .reduce((s, h) => s + (Number(h.nominal) || 0), 0)
})

// MODAL
const modalOpen = ref(false)
const saving = ref(false)
const form = reactive({
  id: null,
  tanggal: '',
  kepada: '',
  keterangan: '',
  nominal: 0,
  jatuh_tempo: '',
  status: 'belum'
})

function resetForm() {
  form.id = null
  form.tanggal = new Date().toISOString().slice(0, 10)
  form.kepada = ''
  form.keterangan = ''
  form.nominal = 0
  form.jatuh_tempo = ''
  form.status = 'belum'
}

function bukaModal(h = null) {
  if (h) {
    form.id = h.id
    form.tanggal = h.tanggal || ''
    form.kepada = h.kepada || ''
    form.keterangan = h.keterangan || ''
    form.nominal = Number(h.nominal) || 0
    form.jatuh_tempo = h.jatuh_tempo || ''
    form.status = h.status || 'belum'
  } else {
    resetForm()
  }
  modalOpen.value = true
}

function tutupModal() {
  modalOpen.value = false
  resetForm()
}

async function simpan() {
  if (!form.kepada.trim()) {
    toast.warning('Kepada wajib diisi')
    return
  }
  if (!form.nominal || form.nominal <= 0) {
    toast.warning('Nominal harus > 0')
    return
  }
  saving.value = true
  try {
    const payload = {
      tanggal: form.tanggal || new Date().toISOString().slice(0, 10),
      kepada: form.kepada.trim(),
      keterangan: form.keterangan.trim(),
      nominal: Number(form.nominal) || 0,
      jatuh_tempo: form.jatuh_tempo || '',
      status: form.status || 'belum'
    }
    if (form.id) {
      await updateDoc(doc(db, 'keuangan_hutang', String(form.id)), payload)
      toast.success('Diperbarui')
    } else {
      const id = `htg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
      await setDoc(doc(db, 'keuangan_hutang', id), { id, ...payload, createdAt: new Date().toISOString() })
      toast.success('Hutang baru tersimpan')
    }
    tutupModal()
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

async function markLunas(h) {
  if (!confirm(`Tandai LUNAS hutang ke ${h.kepada} sebesar ${fmtRp(h.nominal)}?`)) return
  try {
    await updateDoc(doc(db, 'keuangan_hutang', String(h.id)), { status: 'lunas', tanggal_lunas: new Date().toISOString().slice(0, 10) })
    toast.success('Ditandai lunas')
  } catch (e) {
    toast.error('Gagal: ' + e.message)
  }
}

async function hapus(h) {
  if (!confirm(`Hapus hutang ke ${h.kepada}?`)) return
  try {
    await deleteDoc(doc(db, 'keuangan_hutang', String(h.id)))
    toast.success('Dihapus')
  } catch (e) {
    toast.error('Gagal: ' + e.message)
  }
}

function isTempoDekat(h) {
  if (h.status === 'lunas' || !h.jatuh_tempo) return false
  const limit = Date.now() + 7 * 24 * 60 * 60 * 1000
  return new Date(h.jatuh_tempo).getTime() <= limit
}

onMounted(() => {
  if (!isFullAccess.value) {
    loading.value = false
    return
  }
  unsub = subscribeColl('keuangan_hutang', (docs) => {
    list.value = docs
    loading.value = false
  })
})

onUnmounted(() => {
  if (unsub) try { unsub() } catch (e) {}
})
// v.20.42.0526: Export Excel Hutang Piutang
const exportingHP = ref(false)
const { exportStyled: _exportStyledHP } = _useExcelHP()
const _settingsHPExp = _useSettingsHP()
async function exportHutangExcel() {
  if (exportingHP.value) return
  exportingHP.value = true
  try {
    const list = (typeof filteredHutang !== 'undefined' && filteredHutang.value) ||
                 (typeof hutangRaw !== 'undefined' && hutangRaw.value) || []
    const rows = list.map((h, i) => ({
      no: i + 1,
      tgl_hutang: h.tanggal || h.tgl_hutang || '',
      kepada: h.kepada || '',
      keterangan: h.keterangan || '',
      nominal: h.nominal || 0,
      jatuh_tempo: h.jatuh_tempo || '',
      status: h.status || 'Belum Lunas',
      tanggal_lunas: h.tanggal_lunas || ''
    }))
    const ss = _settingsHPExp.settings || {}
    await _exportStyledHP(rows, {
      filename: `hutang_piutang_${new Date().toISOString().slice(0,10)}.xlsx`,
      sheetName: 'Hutang Piutang',
      kop: [ss.kopLine1 || '', ss.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM', ss.kopLine3 || '', ss.kopLine4 || ''],
      subtitle: `Hutang Piutang — ${rows.length} item`,
      columns: [
        { key: 'no', header: 'No', width: 5 },
        { key: 'tgl_hutang', header: 'Tgl Hutang', width: 12 },
        { key: 'kepada', header: 'Kepada', width: 24 },
        { key: 'keterangan', header: 'Keterangan', width: 32 },
        { key: 'nominal', header: 'Nominal', width: 14 },
        { key: 'jatuh_tempo', header: 'Jatuh Tempo', width: 12 },
        { key: 'status', header: 'Status', width: 12 },
        { key: 'tanggal_lunas', header: 'Tgl Lunas', width: 12 }
      ]
    })
  } catch (e) {
    if (typeof toast !== 'undefined') toast.error('Gagal: ' + (e.message || e))
  } finally {
    exportingHP.value = false
  }
}
</script>