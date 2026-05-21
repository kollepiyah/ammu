<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- v.21.14.0526: Header refactor — title + subtitle inline, stats+buttons wrap -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div class="flex items-baseline gap-2 flex-wrap">
          <h1 class="text-base md:text-lg font-black text-slate-800 dark:text-white whitespace-nowrap">
            <i class="fas fa-users text-teal-500 mr-1"></i>Data Santri
          </h1>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">— {{ isFullAccess ? 'Semua santri pondok' : 'Santri yang Anda ampu' }}</p>
        </div>
        <div class="flex flex-wrap gap-2 items-center">
          <div class="px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-xs">
            <span class="text-teal-700 dark:text-teal-300 font-bold">{{ stats.total }}</span>
            <span class="text-slate-500 dark:text-slate-400 ml-1">total</span>
          </div>
          <!-- v.21.12.0526: label "Mukim" → "Ma'had", hide non-mukim label -->
          <div class="px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 text-xs">
            <span class="text-purple-700 dark:text-purple-300 font-bold">{{ stats.mukim }}</span>
            <span class="text-slate-500 dark:text-slate-400 ml-1">Ma'had</span>
          </div>
          <!-- v.21.17c.0526: View mode actions (sidebar) vs Master mode actions (Master Data) -->
          <button v-if="isFullAccess" @click="cetakPdf" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition cursor-pointer">
            <i class="fas fa-print"></i>Cetak PDF
          </button>
          <button v-if="isFullAccess" @click="exportSantriExcel" :disabled="exporting" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer">
            <i :class="['fas', exporting ? 'fa-spinner fa-spin' : 'fa-file-excel']"></i>{{ exporting ? 'Ekspor...' : 'Ekspor Excel' }}
          </button>
          <!-- View mode: tombol Kelola -->
          <router-link v-if="isFullAccess && !isMasterMode" to="/master-data?tab=santri" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition" title="CRUD santri di Master Data">
            <i class="fas fa-edit"></i>Kelola
          </router-link>
          <!-- Master mode: full CRUD buttons -->
          <template v-if="isFullAccess && isMasterMode">
            <button @click="downloadTemplateSantri" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer">
              <i class="fas fa-download"></i>Template
            </button>
            <label class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition cursor-pointer">
              <i :class="['fas', importing ? 'fa-spinner fa-spin' : 'fa-upload']"></i>{{ importing ? 'Impor...' : 'Impor XLSX' }}
              <input type="file" accept=".xlsx,.xls" class="hidden" @change="onImportSantri" :disabled="importing" />
            </label>
            <router-link to="/santri/new?from=master" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition">
              <i class="fas fa-plus"></i>Tambah Santri
            </router-link>
          </template>
        </div>
      </div>
    </div>

    <!-- v.21.22c.0526: Bulk action bar (Master mode only) -->
    <div v-if="isMasterMode && isFullAccess && selectedCount > 0" class="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-2xl p-3 border border-teal-300 dark:border-teal-700 shadow-sm flex flex-wrap items-center gap-2">
      <span class="text-xs font-black text-teal-800 dark:text-teal-200"><i class="fas fa-check-square mr-1"></i>{{ selectedCount }} terpilih</span>
      <button @click="bulkSetStatusSantri('aktif')" :disabled="bulkSaving" class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-[11px] font-bold transition cursor-pointer"><i class="fas fa-check"></i>Set Aktif</button>
      <button @click="bulkSetStatusSantri('tidak_aktif')" :disabled="bulkSaving" class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-[11px] font-bold transition cursor-pointer"><i class="fas fa-user-slash"></i>Set Non-aktif</button>
      <button @click="bulkDelete" :disabled="bulkSaving" class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-[11px] font-bold transition cursor-pointer"><i class="fas fa-trash"></i>Hapus</button>
      <button @click="clearSelection" class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] font-bold transition cursor-pointer ml-auto"><i class="fas fa-times"></i>Batal</button>
    </div>


    <!-- Import preview modal -->
    <div v-if="importPreview" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col">
        <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h3 class="text-base font-black text-slate-800 dark:text-white">
            <i class="fas fa-file-import text-blue-600 mr-2"></i>Preview Impor — {{ importPreview.rows.length }} baris
          </h3>
          <button @click="importPreview = null" class="text-slate-400 hover:text-rose-600 text-xl"><i class="fas fa-times"></i></button>
        </div>
        <div class="p-4 overflow-auto flex-1 text-xs">
          <div class="grid grid-cols-3 gap-2 mb-3">
            <div class="bg-emerald-50 rounded p-2 border border-emerald-200">
              <p class="text-[10px] text-emerald-700 font-bold uppercase">Baru</p>
              <p class="text-2xl font-black text-emerald-700">{{ importPreview.newCount }}</p>
            </div>
            <div class="bg-amber-50 rounded p-2 border border-amber-200">
              <p class="text-[10px] text-amber-700 font-bold uppercase">Update</p>
              <p class="text-2xl font-black text-amber-700">{{ importPreview.updateCount }}</p>
            </div>
            <div class="bg-rose-50 rounded p-2 border border-rose-200">
              <p class="text-[10px] text-rose-700 font-bold uppercase">Skip (no nama)</p>
              <p class="text-2xl font-black text-rose-700">{{ importPreview.skipCount }}</p>
            </div>
          </div>
          <table class="w-full border border-slate-200">
            <thead class="bg-slate-100">
              <tr>
                <th class="px-2 py-1 text-left">#</th>
                <th class="px-2 py-1 text-left">Aksi</th>
                <th class="px-2 py-1 text-left">Nama</th>
                <th class="px-2 py-1 text-left">NIS</th>
                <th class="px-2 py-1 text-left">Lembaga</th>
                <th class="px-2 py-1 text-left">Kelas</th>
                <th class="px-2 py-1 text-left">Wali</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in importPreview.preview" :key="i" class="border-t border-slate-100">
                <td class="px-2 py-1">{{ i + 1 }}</td>
                <td class="px-2 py-1"><span :class="r.action === 'new' ? 'text-emerald-700' : 'text-amber-700'" class="font-bold">{{ r.action.toUpperCase() }}</span></td>
                <td class="px-2 py-1">{{ r.nama }}</td>
                <td class="px-2 py-1">{{ r.nis }}</td>
                <td class="px-2 py-1">{{ r.lembaga }}</td>
                <td class="px-2 py-1">{{ r.kelas }}</td>
                <td class="px-2 py-1">{{ r.wali }}</td>
              </tr>
            </tbody>
          </table>
          <p v-if="importPreview.rows.length > importPreview.preview.length" class="text-[10px] italic text-slate-500 mt-2">
            ...dan {{ importPreview.rows.length - importPreview.preview.length }} baris lagi
          </p>
        </div>
        <div class="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
          <button @click="importPreview = null" class="px-4 py-2 text-xs font-bold rounded-lg bg-slate-200 hover:bg-slate-300">Batal</button>
          <button @click="confirmImportSantri" :disabled="importing" class="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50">
            <i :class="['fas', importing ? 'fa-spinner fa-spin' : 'fa-check', 'mr-1']"></i>{{ importing ? 'Importing...' : `Konfirmasi (${importPreview.newCount + importPreview.updateCount})` }}
          </button>
        </div>
      </div>
    </div>

    <!-- Search + filter bar -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div class="md:col-span-2 relative">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input v-model="search" type="text" placeholder="Cari nama, NIS, atau wali..." class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition" />
        </div>
        <select v-model="filterLembaga" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none">
          <option value="">Semua lembaga</option>
          <option v-for="l in uniqueLembaga" :key="l" :value="l">{{ l }}</option>
        </select>
        <!-- v.21.12.0526: label Ma'had/Pulang Pergi/Fullday -->
        <select v-model="filterMukim" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none">
          <option value="">Semua status tempat</option>
          <option value="mukim">Ma'had</option>
          <option value="fullday">Fullday</option>
          <option value="non-mukim">Pulang Pergi</option>
        </select>
        <select v-model="filterStatus" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none">
          <option value="aktif">Hanya aktif</option>
          <option value="">Semua status</option>
          <option value="tidak_aktif">Tidak aktif / Keluar</option>
        </select>
      </div>
      <!-- v.21.22c.0526: Select-all (Master mode only) -->
      <div v-if="isMasterMode && isFullAccess && santri.length > 0" class="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2">
        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" :checked="isAllVisibleSelected" :indeterminate.prop="isSomeVisibleSelected" @change="toggleSelectAllVisible" class="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
          <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300">Pilih semua ({{ santri.length }})</span>
        </label>
        <span v-if="selectedCount > 0" class="text-[10px] text-teal-700 dark:text-teal-300 font-bold">— {{ selectedCount }} terpilih</span>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-slate-200 dark:border-slate-700 text-center">
      <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
      <p class="text-sm text-slate-500 font-bold">Memuat data santri...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="santri.length === 0" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 dark:border-slate-600 text-center">
      <i class="fas fa-user-slash text-slate-300 dark:text-slate-600 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-slate-300">
        {{ search || filterLembaga || filterMukim ? 'Tidak ada santri yang cocok' : 'Belum ada santri' }}
      </p>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {{ search || filterLembaga || filterMukim ? 'Coba ubah filter atau kata kunci pencarian' : isFullAccess ? 'Tambah santri pertama di Master Data' : 'Belum ada santri yang Anda ampu di sistem' }}
      </p>
    </div>

    <!-- Santri list -->
    <div v-else class="space-y-2">
      <div v-for="s in santri" :key="s.id" class="bg-white dark:bg-slate-800 rounded-xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition">
        <div class="flex items-start gap-3">
          <!-- v.21.22c.0526: Checkbox (Master mode only) -->
          <input v-if="isMasterMode && isFullAccess" type="checkbox" :checked="selected.has(String(s.id))" @change="toggleSelect(s.id)" class="flex-shrink-0 mt-2 w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
          <div class="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-700 dark:to-blue-700 border-2 border-white dark:border-slate-700 flex items-center justify-center overflow-hidden">
            <img v-if="s.foto" :src="s.foto" alt="Foto" class="w-full h-full object-cover" />
            <i v-else class="fas fa-user-graduate text-cyan-500 dark:text-cyan-200"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <h3 class="text-sm md:text-base font-black text-slate-800 dark:text-white truncate">{{ s.nama }}</h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  NIS: {{ s.nis || '-' }} · {{ s.jk === 'L' ? 'Laki-laki' : 'Perempuan' }}
                </p>
              </div>
              <!-- v.21.12.0526: Ma'had / Fullday / Tidak Aktif / (PP tanpa label) -->
              <span v-if="s.is_mukim" class="text-[9px] bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 px-2 py-0.5 rounded font-black uppercase tracking-wider flex-shrink-0">Ma'had</span>
              <span v-else-if="s.is_fullday" class="text-[9px] bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700 px-2 py-0.5 rounded font-black uppercase tracking-wider flex-shrink-0">Fullday</span>
              <span v-if="s.aktif === false" class="text-[9px] bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700 px-2 py-0.5 rounded font-black uppercase tracking-wider flex-shrink-0">Tidak Aktif</span>
            </div>
            <div class="flex flex-wrap gap-1 mt-1.5">
              <span v-if="s.lembaga" class="text-[10px] bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700 px-2 py-0.5 rounded font-bold">{{ s.lembaga }} · {{ s.kelas || '-' }}</span>
              <span v-if="s.kelas_sekolah" class="text-[10px] bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700 px-2 py-0.5 rounded font-bold">Sekolah: {{ s.kelas_sekolah }}</span>
              <span v-if="s.juz" class="text-[10px] bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700 px-2 py-0.5 rounded font-bold">Juz {{ s.juz }}</span>
            </div>
            <div class="flex flex-wrap gap-1 mt-1">
              <span v-for="(label, k) in formatGuru(s)" :key="k" class="text-[10px] bg-slate-50 dark:bg-slate-700/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 rounded">{{ label }}</span>
            </div>
            <div class="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <i class="fas fa-user-friends"></i>
              <span class="truncate">{{ s.wali || '—' }}</span>
              <a v-if="s.wa" :href="`https://wa.me/${cleanWa(s.wa)}`" target="_blank" class="ml-auto text-green-600 dark:text-green-400 hover:text-green-700 flex items-center gap-1 flex-shrink-0">
                <i class="fab fa-whatsapp"></i>{{ s.wa }}
              </a>
            </div>
            <!-- v.21.24.0526: Edit/Reset Sandi/Toggle Aktif/Delete (Master mode only) -->
            <div v-if="isFullAccess && isMasterMode" class="mt-2 flex justify-end gap-2 flex-wrap">
              <button @click="resetSandiSantri(s)" class="text-[10px] text-blue-700 dark:text-blue-300 hover:underline font-bold" title="Reset sandi ke 1234">
                <i class="fas fa-key mr-1"></i>Reset Sandi
              </button>
              <button @click="toggleAktifSantri(s)" :class="['text-[10px] font-bold hover:underline', s.aktif === false ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300']">
                <i :class="['fas', s.aktif === false ? 'fa-toggle-on' : 'fa-toggle-off', 'mr-1']"></i>{{ s.aktif === false ? 'Aktifkan' : 'Non-aktifkan' }}
              </button>
              <router-link :to="`/santri/${s.id}/edit?from=master`" class="text-[10px] text-teal-700 dark:text-teal-300 hover:underline font-bold">
                <i class="fas fa-edit mr-1"></i>Edit
              </router-link>
              <button @click="deleteSantri(s)" class="text-[10px] text-rose-700 dark:text-rose-300 hover:underline font-bold">
                <i class="fas fa-trash mr-1"></i>Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="text-center text-[10px] text-slate-400 dark:text-slate-600 pt-2">
      <i class="fas fa-circle-info mr-1"></i>Menampilkan {{ santri.length }} santri · v.21.11.0526
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useSantri } from '@/composables/useSantri'
import { canSee } from '@/composables/useLembaga'
import { useAuthStore } from '@/stores/auth'

// v.21.17c.0526: mode prop — 'view' (sidebar, default) atau 'master' (di Master Data tab, full CRUD)
const props = defineProps({ mode: { type: String, default: 'view' } })
const isMasterMode = computed(() => props.mode === 'master')
// v.21.13b.0526: + toTitleCase + normalizeWA + parseMultipleWA (v.21.22b dual WA)
import { getNamaGuruGelar, toTitleCase, normalizeWA, parseMultipleWA } from '@/utils/format'
import { useExcel } from '@/composables/useExcel'
import { buildListPdf } from '@/utils/pdfBuilder'
import { useToast } from '@/composables/useToast'
import { useSettingsStore } from '@/stores/settings'
import { useConfirm } from '@/composables/useConfirm'
import { setDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'

const exporting = ref(false)
const importing = ref(false)
const importPreview = ref(null)
const { exportStyled, importFile } = useExcel()
const toast = useToast()
const confirmDlg = useConfirm()
const settingsStore = useSettingsStore()

const {
  santri, santriRaw, guruRaw, loading, search,
  filterLembaga, filterMukim, filterStatus, stats, isFullAccess
} = useSantri()

// v.21.11.0526: Bulk selection state
const selected = ref(new Set())
const bulkSaving = ref(false)
const selectedCount = computed(() => selected.value.size)
const isAllVisibleSelected = computed(() => santri.value.length > 0 && santri.value.every((s) => selected.value.has(String(s.id))))
const isSomeVisibleSelected = computed(() => {
  if (santri.value.length === 0) return false
  const c = santri.value.filter((s) => selected.value.has(String(s.id))).length
  return c > 0 && c < santri.value.length
})

function toggleSelect(id) {
  const s = String(id)
  const next = new Set(selected.value)
  if (next.has(s)) next.delete(s)
  else next.add(s)
  selected.value = next
}

function toggleSelectAllVisible() {
  if (isAllVisibleSelected.value) {
    const next = new Set(selected.value)
    for (const s of santri.value) next.delete(String(s.id))
    selected.value = next
  } else {
    const next = new Set(selected.value)
    for (const s of santri.value) next.add(String(s.id))
    selected.value = next
  }
}

function clearSelection() { selected.value = new Set() }

async function deleteSantri(s) {
  const ok = await confirmDlg({
    title: `Hapus ${s.nama}?`,
    message: `Santri "${s.nama}" (NIS: ${s.nis || '-'}) akan dihapus permanen dari Firestore. Aksi ini tidak bisa di-undo.`,
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    await deleteDoc(doc(db, 'santri', String(s.id)))
    toast.success(`Santri "${s.nama}" dihapus`)
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}

async function resetSandiSantri(s) {
  const ok = await confirmDlg({
    title: `Reset sandi ${s.nama}?`,
    message: `Sandi santri "${s.nama}" akan direset ke default: 1234. Santri perlu ganti sandi sendiri setelah login.`,
    confirmText: 'Reset',
    danger: true
  })
  if (!ok) return
  try {
    await setDoc(doc(db, 'santri', String(s.id)), { password: '1234' }, { merge: true })
    toast.success(`Sandi ${s.nama} direset ke 1234`)
  } catch (e) {
    toast.error('Gagal reset: ' + (e.message || e))
  }
}

async function toggleAktifSantri(s) {
  const newStatus = s.aktif === false ? true : false
  const ok = await confirmDlg({
    title: `${newStatus ? 'Aktifkan' : 'Non-aktifkan'} ${s.nama}?`,
    message: `Status santri "${s.nama}" akan di-set ${newStatus ? 'AKTIF' : 'TIDAK AKTIF'}.`,
    confirmText: newStatus ? 'Aktifkan' : 'Non-aktifkan',
    danger: !newStatus
  })
  if (!ok) return
  try {
    await setDoc(doc(db, 'santri', String(s.id)), { aktif: newStatus }, { merge: true })
    toast.success(`${s.nama} di-set ${newStatus ? 'AKTIF' : 'TIDAK AKTIF'}`)
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}

async function bulkDelete() {
  const ids = [...selected.value]
  if (ids.length === 0) return
  const ok = await confirmDlg({
    title: `Hapus ${ids.length} santri?`,
    message: `${ids.length} santri akan dihapus PERMANEN dari Firestore. Aksi ini tidak bisa di-undo. Lanjutkan?`,
    confirmText: 'Hapus Semua',
    danger: true
  })
  if (!ok) return
  bulkSaving.value = true
  let okCount = 0, failCount = 0
  for (const id of ids) {
    try {
      await deleteDoc(doc(db, 'santri', String(id)))
      okCount++
    } catch (e) {
      failCount++
      console.warn(`[bulkDelete] santri ${id} gagal:`, e.message)
    }
  }
  bulkSaving.value = false
  if (failCount > 0) toast.warning(`Selesai: ${okCount} hapus, ${failCount} gagal`)
  else toast.success(`${okCount} santri dihapus`)
  clearSelection()
}

async function bulkSetStatusSantri(status) {
  const ids = [...selected.value]
  if (ids.length === 0) return
  const ok = await confirmDlg({
    title: `Set status ${status}?`,
    message: `${ids.length} santri akan di-set status: ${status === 'aktif' ? 'AKTIF' : 'NON-AKTIF'}.`,
    confirmText: 'Terapkan',
    danger: status !== 'aktif'
  })
  if (!ok) return
  bulkSaving.value = true
  let okCount = 0, failCount = 0
  for (const id of ids) {
    try {
      await setDoc(doc(db, 'santri', String(id)), { aktif: status === 'aktif' }, { merge: true })
      okCount++
    } catch (e) {
      failCount++
    }
  }
  bulkSaving.value = false
  toast.success(`${okCount} santri di-set ${status}${failCount > 0 ? ` (${failCount} gagal)` : ''}`)
  clearSelection()
}

const uniqueLembaga = computed(() => {
  const set = new Set()
  for (const s of santriRaw.value) {
    if (s.lembaga) set.add(s.lembaga)
  }
  return [...set].sort()
})

function formatGuru(s) {
  const labels = []
  const gPagi = s.guru_pagi
  const gSore = s.guru_sore
  const gOld = s.guru
  if (gPagi) {
    const g = guruRaw.value.find((x) => x.nama === gPagi)
    labels.push(`Pagi: ${g ? getNamaGuruGelar(g.nama, g.jk) : gPagi}`)
  }
  if (gSore) {
    const g = guruRaw.value.find((x) => x.nama === gSore)
    labels.push(`Sore: ${g ? getNamaGuruGelar(g.nama, g.jk) : gSore}`)
  }
  if (!gPagi && !gSore && gOld) {
    const g = guruRaw.value.find((x) => x.nama === gOld)
    labels.push(g ? getNamaGuruGelar(g.nama, g.jk) : gOld)
  }
  if (labels.length === 0) labels.push('— Belum ada guru —')
  return labels
}

function cleanWa(wa) {
  return String(wa || '').replace(/[^0-9]/g, '').replace(/^0/, '62')
}

// v.21.25.0526: Cetak PDF code-based jsPDF + autoTable (font helvetica untuk umum)
async function cetakPdf() {
  try {
    const settingsObj = settings.settings || {}
    const kop = {
      logoUrl: settingsObj.kop_logo || settingsObj.kopLogo || '',
      line1: settingsObj.kopLine1 || 'YAYASAN MAMBAUL ULUM',
      line2: settingsObj.kopLine2 || '',
      line3: settingsObj.kopLine3 || '',
      line4: settingsObj.kopLine4 || '',
      line5: settingsObj.kopLine5 || ''
    }
    const rows = (santri.value || []).map((s, i) => ({
      no: i + 1,
      nama: s.nama || '',
      nis: s.nis || '',
      jk: s.jk || '',
      lembaga: s.lembaga || '',
      kelas: s.kelas || '',
      wa: s.wa || ''
    }))
    await buildListPdf({
      kind: 'umum',
      orientation: 'l',
      format: 'a4',
      kop,
      title: 'DAFTAR SANTRI',
      columns: [
        { key: 'no', header: 'No', width: 12 },
        { key: 'nama', header: 'Nama Santri', width: 60 },
        { key: 'nis', header: 'NIS', width: 25 },
        { key: 'jk', header: 'JK', width: 12 },
        { key: 'lembaga', header: 'Lembaga', width: 35 },
        { key: 'kelas', header: 'Kelas', width: 25 },
        { key: 'wa', header: 'No. WA', width: 35 }
      ],
      rows,
      filename: `daftar-santri-${new Date().toISOString().slice(0, 10)}.pdf`
    })
    toast?.success?.('PDF santri berhasil dibuat')
  } catch (e) {
    toast?.error?.('Gagal cetak PDF: ' + (e?.message || e))
  }
}

async function exportSantriExcel() {
  if (exporting.value) return
  exporting.value = true
  try {
    const rows = (santri.value || []).map((s, i) => ({
      no: i + 1, nama: s.nama || '', nis: s.nis || '', jk: s.jk || '',
      tgl_lahir: s.tgl_lahir || '', lembaga: s.lembaga || '', kelas: s.kelas || '',
      // v.21.19.0526: + juz column (PTPT)
      juz: s.juz || '',
      kelas_sekolah: s.kelas_sekolah || '', lembaga_sekolah: s.lembaga_sekolah || '',
      wali: s.nama_wali || s.wali || '', alamat: s.alamat || '',
      mukim: s.is_mukim ? 'Mukim' : 'Non-mukim',
      status: s.aktif === false ? 'Non-aktif' : 'Aktif'
    }))
    const ss = settingsStore.settings || {}
    await exportStyled(rows, {
      filename: `data_santri_${new Date().toISOString().slice(0, 10)}.xlsx`,
      sheetName: 'Data Santri',
      kop: [ss.kopLine1 || '', ss.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM', ss.kopLine3 || '', ss.kopLine4 || ''],
      subtitle: `Data Santri — ${rows.length} santri (${new Date().toLocaleDateString('id-ID')})`,
      columns: [
        { key: 'no', header: 'No', width: 5 },
        { key: 'nama', header: 'Nama', width: 28 },
        { key: 'nis', header: 'NIS', width: 12 },
        { key: 'jk', header: 'L/P', width: 5 },
        { key: 'tgl_lahir', header: 'Tgl Lahir', width: 12 },
        { key: 'lembaga', header: 'Lembaga', width: 14 },
        { key: 'kelas', header: 'Kelas', width: 10 },
        { key: 'juz', header: 'Juz', width: 8 },
        { key: 'kelas_sekolah', header: 'Kls Sekolah', width: 12 },
        { key: 'lembaga_sekolah', header: 'Sekolah', width: 16 },
        { key: 'wali', header: 'Wali', width: 22 },
        { key: 'alamat', header: 'Alamat', width: 30 },
        { key: 'mukim', header: 'Status Tinggal', width: 12 },
        { key: 'status', header: 'Status', width: 10 }
      ]
    })
    toast.success(`Ekspor ${rows.length} santri ke Excel`)
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    exporting.value = false
  }
}

// v.21.13b.0526: Template TANPA KOP supaya importFile auto-detect headers di row 1
async function downloadTemplateSantri() {
  try {
    const headers = [
      'NIS', 'Nama Santri', 'L/P', 'Tgl Lahir (DD/MM/YYYY)', 'Tgl Masuk (DD/MM/YYYY)',
      'Nama Wali', 'No WA Wali', 'Lembaga Qiraati', 'Kelas Qiraati',
      'Guru Pagi', 'Guru Sore', 'Juz (PTPT)', 'Lembaga Sekolah', 'Kelas Sekolah',
      'Guru Sekolah (pisah |)', 'Status Aktif (true/false)', 'Mukim (true/false)', 'Fullday (true/false)',
      'Catatan Riwayat Pribadi (Mukim)', 'Alamat'
    ]
    await exportStyled([], {
      filename: 'Template_Data_Santri.xlsx',
      sheetName: 'Template_Santri',
      // No KOP — headers at row 1
      columns: headers.map((h) => ({ key: h, header: h, width: Math.max(12, h.length + 2) }))
    })
    toast.success('Template santri ter-download. Nama=TitleCase, Lembaga=UPPERCASE saat impor.')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}

function parseTglDDMMYYYY(v) {
  if (!v) return ''
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  const s = String(v).trim()
  const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/)
  if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`
  return s
}

// v.21.22b.0526: parseBool — broader matching. Note: untuk field aktif, default true di call site.
function parseBool(v) {
  if (v === true) return true
  if (v === false) return false
  const s = String(v || '').toLowerCase().trim()
  if (['true', 'ya', 'y', '1', 'aktif', 'mukim', 'fullday'].includes(s)) return true
  return false
}
// Khusus aktif — terima lebih flexible, default true kalau ambigu
function parseAktif(v) {
  if (v === true) return true
  if (v === false) return false
  const s = String(v || '').toLowerCase().trim()
  if (['false', 'tidak', 'no', 'n', '0', 'tidak aktif', 'non-aktif', 'nonaktif', 'keluar', 'non aktif'].includes(s)) return false
  return true // default: aktif (kalau "Aktif" / "TRUE" / "1" / kosong / unknown)
}

async function onImportSantri(e) {
  const file = e.target?.files?.[0]
  if (!file) return
  importing.value = true
  try {
    const rows = await importFile(file)
    if (!rows.length) {
      toast.warning('File kosong atau format tidak sesuai')
      importing.value = false
      e.target.value = ''
      return
    }
    const existing = santriRaw.value || []
    let newCount = 0, updateCount = 0, skipCount = 0
    const allMapped = []
    function _pick(row, ...aliases) {
      for (const alias of aliases) {
        if (row[alias] !== undefined && row[alias] !== null && row[alias] !== '') return row[alias]
      }
      const lowerMap = {}
      for (const k of Object.keys(row)) lowerMap[k.toLowerCase().trim()] = row[k]
      for (const alias of aliases) {
        const v = lowerMap[String(alias).toLowerCase().trim()]
        if (v !== undefined && v !== null && v !== '') return v
      }
      return ''
    }
    for (const r of rows) {
      const namaRaw = String(_pick(r, 'Nama Santri', 'Nama', 'NAMA', 'nama') || '').trim()
      if (!namaRaw) { skipCount++; continue }
      const nama = toTitleCase(namaRaw)
      const nis = String(_pick(r, 'NIS', 'nis') || '').trim()
      const lembaga = String(_pick(r, 'Lembaga Qiraati', 'Lembaga', 'lembaga') || '').trim().toUpperCase()
      const kelas = String(_pick(r, 'Kelas Qiraati', 'Kelas', 'kelas') || '').trim()
      const idx = existing.findIndex((s) =>
        (nis && String(s.nis || '') === nis) ||
        String(s.nama || '').toLowerCase().trim() === nama.toLowerCase()
      )
      const action = idx >= 0 ? 'update' : 'new'
      if (action === 'new') newCount++; else updateCount++
      const aktifVal = _pick(r, 'Status Aktif (true/false)', 'Status Aktif', 'Aktif', 'aktif')
      const waList = parseMultipleWA(_pick(r, 'No WA Wali', 'No WA', 'WA Wali', 'WA', 'wa'))
      allMapped.push({
        existingId: idx >= 0 ? existing[idx].id : null,
        action,
        nama, nis, lembaga, kelas,
        wali: toTitleCase(_pick(r, 'Nama Wali', 'Wali', 'wali') || ''),
        data: {
          nis, nama,
          jk: String(_pick(r, 'L/P', 'JK', 'Jenis Kelamin', 'jk') || 'L').trim().toUpperCase().charAt(0),
          tgl_lahir: parseTglDDMMYYYY(_pick(r, 'Tgl Lahir (DD/MM/YYYY)', 'Tgl Lahir', 'Tanggal Lahir', 'tgl_lahir')),
          tgl_masuk: parseTglDDMMYYYY(_pick(r, 'Tgl Masuk (DD/MM/YYYY)', 'Tgl Masuk', 'Tanggal Masuk', 'tgl_masuk')),
          wali: toTitleCase(_pick(r, 'Nama Wali', 'Wali', 'wali') || ''),
          wa: waList[0] || '',
          wa_2: waList[1] || '',
          lembaga, kelas,
          guru_pagi: toTitleCase(_pick(r, 'Guru Pagi', 'Guru Kelas Pagi', 'guru_pagi') || ''),
          guru_sore: toTitleCase(_pick(r, 'Guru Sore', 'Guru Kelas Sore', 'guru_sore') || ''),
          juz: String(_pick(r, 'Juz (PTPT)', 'Juz', 'juz') || '').trim().toUpperCase(),
          lembaga_sekolah: String(_pick(r, 'Lembaga Sekolah', 'lembaga_sekolah') || '').trim().toUpperCase(),
          kelas_sekolah: String(_pick(r, 'Kelas Sekolah', 'kelas_sekolah') || '').trim(),
          guru_sekolah: String(_pick(r, 'Guru Sekolah (pisah |)', 'Guru Sekolah', 'guru_sekolah') || '').split('|').map((s) => s.trim()).filter(Boolean),
          aktif: parseAktif(aktifVal),
          is_mukim: parseBool(_pick(r, 'Mukim (true/false)', 'Mukim', "Ma'had", 'is_mukim')),
          is_fullday: parseBool(_pick(r, 'Fullday (true/false)', 'Fullday', 'is_fullday')),
          catatan_riwayat_pribadi: String(_pick(r, 'Catatan Riwayat Pribadi (Mukim)', 'Catatan Riwayat Pribadi', 'catatan_riwayat_pribadi') || '').trim(),
          alamat: String(_pick(r, 'Alamat', 'alamat') || '').trim(),
          custom_fields: {}
        }
      })
    }
    importPreview.value = { rows: allMapped, preview: allMapped.slice(0, 50), newCount, updateCount, skipCount }
  } catch (e) {
    toast.error('Gagal baca file: ' + (e.message || e))
  } finally {
    importing.value = false
    e.target.value = ''
  }
}

async function confirmImportSantri() {
  if (!importPreview.value) return
  importing.value = true
  let ok = 0, fail = 0
  try {
    for (const item of importPreview.value.rows) {
      try {
        const numId = item.existingId
          ? (Number(item.existingId) || Number(String(item.existingId).replace(/\D/g, '')) || Date.now() + ok)
          : (Date.now() + ok)
        await setDoc(doc(db, 'santri', String(numId)), {
          id: numId,
          ...item.data,
          _imported_v21_26_at: serverTimestamp()
        }, { merge: true })
        ok++
      } catch (e) {
        fail++
        console.error('Import row failed:', e)
      }
    }
    toast.success(`Impor selesai: ${ok} OK, ${fail} gagal`)
    importPreview.value = null
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    importing.value = false
  }
}
</script>
