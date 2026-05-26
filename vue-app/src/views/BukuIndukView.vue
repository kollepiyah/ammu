<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div
      v-if="!isFullAccess"
      class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center"
    >
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Akses Keuangan terbatas</p>
    </div>

    <template v-else>
      <!-- Header + stats + actions -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
              <i class="fas fa-book text-indigo-500 mr-2"></i>Buku Induk (General Ledger)
            </h1>
            <button
              @click="exportBukuIndukExcel"
              :disabled="exportingBI"
              class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold cursor-pointer"
            >
              <i :class="['fas', exportingBI ? 'fa-spinner fa-spin' : 'fa-file-excel', 'mr-1']"></i
              >{{ exportingBI ? '...' : 'Ekspor Excel' }}
            </button>
            <p class="text-xs text-slate-500 mt-0.5">
              Pusat data arus kas keluar/masuk seluruh lembaga · {{ getBulanLabel(selectedMonth) }}
              {{ selectedYear }}
            </p>
          </div>
          <!-- v.72.16.0526: Input Manual + Cetak Laporan match legacy -->
          <div class="flex gap-2 flex-wrap">
            <button
              @click="bukaModalInput()"
              class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 rounded-xl text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <i class="fas fa-plus-circle"></i>Input Manual
            </button>
            <button
              @click="cetakLaporan"
              class="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-2 rounded-xl text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <i class="fas fa-print"></i>Cetak Laporan
            </button>
          </div>
        </div>
        <!-- Stats row -->
        <div class="grid grid-cols-3 gap-2 md:gap-3 mt-3">
          <div class="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-xl">
            <p class="text-[10px] font-bold text-emerald-700 uppercase">Total Masuk</p>
            <p class="text-base md:text-lg font-black text-emerald-800 mt-1">
              {{ fmtRp(stats.pemasukan) }}
            </p>
          </div>
          <div class="bg-rose-50 border-l-4 border-rose-500 p-3 rounded-xl">
            <p class="text-[10px] font-bold text-rose-700 uppercase">Total Keluar</p>
            <p class="text-base md:text-lg font-black text-rose-800 mt-1">
              {{ fmtRp(stats.pengeluaran) }}
            </p>
          </div>
          <div
            :class="[
              'p-3 rounded-xl border-l-4',
              stats.saldo >= 0 ? 'bg-blue-50 border-blue-500' : 'bg-amber-50 border-amber-500'
            ]"
          >
            <p
              :class="[
                'text-[10px] font-bold uppercase',
                stats.saldo >= 0 ? 'text-blue-700' : 'text-amber-700'
              ]"
            >
              Saldo Akhir
            </p>
            <p
              :class="[
                'text-base md:text-lg font-black mt-1',
                stats.saldo >= 0 ? 'text-blue-800' : 'text-amber-800'
              ]"
            >
              {{ fmtRp(stats.saldo) }}
            </p>
          </div>
        </div>
      </div>

      <!-- v.72.16.0526: Input Manual Modal -->
      <Teleport to="body">
        <div
          v-if="modalInputOpen"
          @click.self="modalInputOpen = false"
          class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md">
            <form @submit.prevent="simpanInputManual" class="p-5">
              <h3 class="text-base font-black text-slate-800 dark:text-white mb-4">
                <i class="fas fa-plus-circle text-emerald-600 mr-2"></i>Input Transaksi Manual
              </h3>
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-1">Tanggal *</label>
                  <input
                    v-model="inputForm.tanggal"
                    type="date"
                    required
                    class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-1">Tipe *</label>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      @click="inputForm.tipe = 'masuk'"
                      :class="[
                        'px-3 py-2 text-xs font-black rounded-lg border-2',
                        inputForm.tipe === 'masuk'
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : 'bg-white text-emerald-700 border-emerald-300'
                      ]"
                    >
                      <i class="fas fa-arrow-down mr-1"></i>Pemasukan
                    </button>
                    <button
                      type="button"
                      @click="inputForm.tipe = 'keluar'"
                      :class="[
                        'px-3 py-2 text-xs font-black rounded-lg border-2',
                        inputForm.tipe === 'keluar'
                          ? 'bg-rose-600 text-white border-rose-700'
                          : 'bg-white text-rose-700 border-rose-300'
                      ]"
                    >
                      <i class="fas fa-arrow-up mr-1"></i>Pengeluaran
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-1">Kategori</label>
                  <input
                    v-model="inputForm.kategori"
                    type="text"
                    placeholder="Contoh: Operasional, Donasi, Bantuan..."
                    class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-1">Keterangan *</label>
                  <textarea
                    v-model="inputForm.keterangan"
                    required
                    rows="2"
                    placeholder="Deskripsi transaksi..."
                    class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800 resize-none"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-1">Nominal (Rp) *</label>
                  <input
                    v-model.number="inputForm.nominal"
                    type="number"
                    min="0"
                    required
                    class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800"
                  />
                </div>
              </div>
              <div class="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  @click="modalInputOpen = false"
                  class="text-xs font-bold px-4 py-2 rounded-lg bg-slate-100 text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="savingInput"
                  class="text-xs font-bold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
                >
                  <i :class="['fas', savingInput ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>
                  {{ savingInput ? 'Menyimpan...' : 'Simpan' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>

      <!-- Filter -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <select
            v-model.number="selectedYear"
            class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
          <select
            v-model.number="selectedMonth"
            class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option :value="0">Semua bulan</option>
            <option v-for="(b, i) in BULAN" :key="b" :value="i + 1">{{ b }}</option>
          </select>
          <select
            v-model="filterTipe"
            class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Semua tipe</option>
            <option value="masuk">Pemasukan</option>
            <option value="keluar">Pengeluaran</option>
          </select>
          <input
            v-model="search"
            type="text"
            placeholder="Cari keterangan..."
            class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-indigo-500 text-3xl mb-3"></i>
        <p class="text-sm text-slate-500 font-bold">Memuat buku induk...</p>
      </div>

      <!-- Empty -->
      <div
        v-else-if="filteredBuku.length === 0"
        class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center"
      >
        <i class="fas fa-book-open text-slate-300 text-4xl mb-3"></i>
        <p class="text-sm font-bold text-slate-700">Tidak ada transaksi</p>
      </div>

      <!-- List -->
      <div
        v-else
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
      >
        <!-- Table header (desktop) -->
        <div
          class="hidden md:grid md:grid-cols-[100px_1fr_120px_120px] gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-700 text-[10px] uppercase font-bold text-slate-600 tracking-wider border-b border-slate-200"
        >
          <span>Tanggal</span>
          <span>Keterangan</span>
          <span class="text-right">Masuk</span>
          <span class="text-right">Keluar</span>
        </div>
        <div class="divide-y divide-slate-100 dark:divide-slate-700">
          <div
            v-for="b in filteredBuku"
            :key="b.id"
            class="px-4 py-2.5 md:grid md:grid-cols-[100px_1fr_120px_120px] gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition"
          >
            <span class="text-[11px] text-slate-500 font-bold whitespace-nowrap block md:inline">
              {{ formatTgl(b.tanggal) }}
            </span>
            <div class="md:inline">
              <p class="text-sm font-bold text-slate-800 dark:text-white truncate">
                {{ b.keterangan || '-' }}
              </p>
              <p class="text-[10px] text-slate-500 mt-0.5">
                <span
                  v-if="b.kategori"
                  class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded font-bold"
                >
                  {{ b.kategori }}
                </span>
                <span v-if="b.ref_id" class="ml-1 text-slate-400">· #{{ b.ref_id }}</span>
              </p>
            </div>
            <div class="mt-1 md:mt-0 md:text-right">
              <span
                v-if="b.tipe === 'masuk' || Number(b.masuk) > 0"
                class="text-sm font-black text-emerald-700"
              >
                {{ fmtRp(b.masuk || b.nominal) }}
              </span>
              <span v-else class="text-slate-300">—</span>
            </div>
            <div class="md:text-right">
              <span
                v-if="b.tipe === 'keluar' || Number(b.keluar) > 0"
                class="text-sm font-black text-rose-700"
              >
                {{ fmtRp(b.keluar || b.nominal) }}
              </span>
              <span v-else class="text-slate-300">—</span>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-[10px] text-slate-400 pt-2">
        <i class="fas fa-circle-info mr-1"></i>{{ filteredBuku.length }} transaksi · Vue 3 · Phase
        5.14
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useExcel } from '@/composables/useExcel'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { fmtRp, formatTanggal as formatTgl } from '@/utils/format'
import { buildListPdf } from '@/utils/pdfBuilder'

const toast = useToast()
const auth = useAuthStore()
const settingsStore = useSettingsStore()
const { exportStyled } = useExcel()

const BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

const bukuRaw = ref([])
const loading = ref(true)
let unsub = null

const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth() + 1) // 0 = semua bulan
const filterTipe = ref('')
const search = ref('')

// v.72.16.0526: Input Manual modal
const modalInputOpen = ref(false)
const savingInput = ref(false)
const inputForm = reactive({
  tanggal: new Date().toISOString().slice(0, 10),
  tipe: 'masuk',
  kategori: '',
  keterangan: '',
  nominal: 0
})

function bukaModalInput() {
  inputForm.tanggal = new Date().toISOString().slice(0, 10)
  inputForm.tipe = 'masuk'
  inputForm.kategori = ''
  inputForm.keterangan = ''
  inputForm.nominal = 0
  modalInputOpen.value = true
}

async function simpanInputManual() {
  if (!inputForm.keterangan.trim()) {
    toast.warning('Keterangan wajib diisi')
    return
  }
  if (!inputForm.nominal || inputForm.nominal <= 0) {
    toast.warning('Nominal harus > 0')
    return
  }
  savingInput.value = true
  try {
    const id = `bi_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
    const payload = {
      id,
      tanggal: inputForm.tanggal,
      tipe: inputForm.tipe,
      kategori: inputForm.kategori.trim() || 'Manual',
      keterangan: inputForm.keterangan.trim(),
      nominal: Number(inputForm.nominal) || 0,
      sumber: 'manual',
      operator: auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin',
      createdAt: serverTimestamp()
    }
    if (inputForm.tipe === 'masuk') payload.masuk = payload.nominal
    else payload.keluar = payload.nominal
    await setDoc(doc(db, 'keuangan_buku_induk', id), payload)
    toast.success('Transaksi tersimpan')
    modalInputOpen.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    savingInput.value = false
  }
}

async function cetakLaporan() {
  // v.21.25.0526: jsPDF + autoTable (drop window.print)
  try {
    const settingsObj = settingsStore?.settings || {}
    const kop = {
      logoUrl: settingsObj.kop_logo || settingsObj.kopLogo || '',
      line1: settingsObj.kopLine1 || 'YAYASAN MAMBAUL ULUM',
      line2: settingsObj.kopLine2 || '',
      line3: settingsObj.kopLine3 || '',
      line4: settingsObj.kopLine4 || '',
      line5: settingsObj.kopLine5 || ''
    }
    const rows = (filteredBuku.value || []).map((b, i) => ({
      no: i + 1,
      tanggal: b.tanggal ? formatTgl(b.tanggal) : '',
      keterangan: b.keterangan || b.deskripsi || '',
      tipe: b.tipe || '',
      masuk: b.masuk ? fmtRp(b.masuk) : '',
      keluar: b.keluar ? fmtRp(b.keluar) : ''
    }))
    const periode =
      selectedMonth.value > 0
        ? `${BULAN[selectedMonth.value - 1]} ${selectedYear.value}`
        : `Tahun ${selectedYear.value}`
    await buildListPdf({
      kind: 'umum',
      orientation: 'l',
      format: 'a4',
      kop,
      title: `BUKU INDUK KEUANGAN — ${periode}`,
      columns: [
        { key: 'no', header: 'No', width: 12 },
        { key: 'tanggal', header: 'Tanggal', width: 30 },
        { key: 'keterangan', header: 'Keterangan', width: 90 },
        { key: 'tipe', header: 'Tipe', width: 25 },
        { key: 'masuk', header: 'Masuk', width: 35 },
        { key: 'keluar', header: 'Keluar', width: 35 }
      ],
      rows,
      filename: `buku-induk-${periode.replace(/\s+/g, '_')}.pdf`
    })
    toast.success('PDF buku induk berhasil dibuat')
  } catch (e) {
    toast.error('Gagal cetak: ' + (e?.message || e))
  }
}

const isFullAccess = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return (
    s.role === 'admin' ||
    s.id === 'admin' ||
    ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
  )
})

const filteredBuku = computed(() => {
  let list = [...bukuRaw.value]
  // Filter by year/month
  if (selectedMonth.value > 0) {
    const ym = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`
    list = list.filter((b) => String(b.tanggal || '').substring(0, 7) === ym)
  } else {
    list = list.filter((b) => String(b.tanggal || '').startsWith(String(selectedYear.value)))
  }
  // Tipe
  if (filterTipe.value) {
    list = list.filter((b) => {
      if (filterTipe.value === 'masuk') return b.tipe === 'masuk' || Number(b.masuk) > 0
      if (filterTipe.value === 'keluar') return b.tipe === 'keluar' || Number(b.keluar) > 0
      return true
    })
  }
  // Search
  const kw = search.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(
      (b) =>
        String(b.keterangan || '')
          .toLowerCase()
          .includes(kw) ||
        String(b.kategori || '')
          .toLowerCase()
          .includes(kw) ||
        String(b.ref_id || '')
          .toLowerCase()
          .includes(kw)
    )
  }
  return list.sort(
    (a, b) =>
      (b.tanggal || '').localeCompare(a.tanggal || '') || (b.id || '').localeCompare(a.id || '')
  )
})

const stats = computed(() => {
  let masuk = 0,
    keluar = 0
  for (const b of filteredBuku.value) {
    if (b.tipe === 'masuk' || Number(b.masuk) > 0) {
      masuk += Number(b.masuk || b.nominal) || 0
    }
    if (b.tipe === 'keluar' || Number(b.keluar) > 0) {
      keluar += Number(b.keluar || b.nominal) || 0
    }
  }
  return { pemasukan: masuk, pengeluaran: keluar, saldo: masuk - keluar }
})

const years = computed(() => {
  const now = new Date().getFullYear()
  return [now - 2, now - 1, now, now + 1]
})

function getBulanLabel(m) {
  if (m === 0) return 'Sepanjang tahun'
  return BULAN[m - 1] || '-'
}

onMounted(() => {
  unsub = subscribeColl('keuangan_buku_induk', (docs) => {
    bukuRaw.value = docs
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

// v.21+: Export Excel Buku Induk Keuangan (kolom: no, tanggal, no_struk, keterangan, kategori, tipe, masuk, keluar, saldo)
const exportingBI = ref(false)
async function exportBukuIndukExcel() {
  if (exportingBI.value) return
  exportingBI.value = true
  try {
    const list = filteredBuku.value || bukuRaw.value || []
    const rows = list.map((b, i) => ({
      no: i + 1,
      tanggal: b.tanggal || '',
      no_struk: b.no_struk || '',
      keterangan: b.keterangan || b.deskripsi || '',
      kategori: b.kategori || '',
      tipe: b.tipe || (Number(b.masuk) > 0 ? 'Masuk' : 'Keluar'),
      masuk: b.masuk || (b.tipe === 'masuk' ? b.nominal : 0) || 0,
      keluar: b.keluar || (b.tipe === 'keluar' ? b.nominal : 0) || 0,
      saldo: b.saldo || 0
    }))
    const s = settingsStore.settings || {}
    await exportStyled(rows, {
      filename: `buku_induk_${new Date().toISOString().slice(0, 10)}.xlsx`,
      sheetName: 'Buku Induk',
      kop: [
        s.kopLine1 || '',
        s.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM',
        s.kopLine3 || '',
        s.kopLine4 || ''
      ],
      subtitle: `Buku Induk Keuangan — ${rows.length} transaksi`,
      columns: [
        { key: 'no', header: 'No', width: 5 },
        { key: 'tanggal', header: 'Tanggal', width: 12 },
        { key: 'no_struk', header: 'No Struk', width: 14 },
        { key: 'keterangan', header: 'Keterangan', width: 32 },
        { key: 'kategori', header: 'Kategori', width: 16 },
        { key: 'tipe', header: 'Tipe', width: 10 },
        { key: 'masuk', header: 'Masuk', width: 14 },
        { key: 'keluar', header: 'Keluar', width: 14 },
        { key: 'saldo', header: 'Saldo', width: 14 }
      ]
    })
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    exportingBI.value = false
  }
}
</script>
