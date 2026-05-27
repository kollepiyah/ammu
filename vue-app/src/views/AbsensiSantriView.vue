<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- Access guard -->
    <div
      v-if="!isFullAccess"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-rose-300 text-center"
    >
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">Akses terbatas</p>
    </div>

    <template v-else>
      <!-- Header + rekap totals -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 class="text-xl md:text-2xl font-black text-[var(--text-primary)]">
              <i class="fas fa-clipboard-check text-cyan-500 mr-2"></i>Rekap Absensi Santri
            </h1>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">
              {{ getBulanLabel(selectedMonth) }} {{ selectedYear }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <div
              class="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 text-xs"
            >
              <span class="text-emerald-700 dark:text-emerald-300 font-bold">{{
                stats.hadir
              }}</span>
              <span class="text-[var(--text-secondary)] ml-1">hadir</span>
            </div>
            <div
              class="px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-900/30 border border-rose-200 text-xs"
            >
              <span class="text-rose-700 dark:text-rose-300 font-bold">{{ stats.alfa }}</span>
              <span class="text-[var(--text-secondary)] ml-1">alfa</span>
            </div>
            <div
              class="px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 text-xs"
            >
              <span class="text-cyan-700 dark:text-cyan-300 font-bold">{{ stats.sakit }}</span>
              <span class="text-[var(--text-secondary)] ml-1">sakit</span>
            </div>
            <div
              class="px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 text-xs"
            >
              <span class="text-teal-700 dark:text-teal-300 font-bold">{{ stats.izin }}</span>
              <span class="text-[var(--text-secondary)] ml-1">izin</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          <select
            v-model.number="selectedYear"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
          </select>
          <select
            v-model.number="selectedMonth"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option v-for="(b, i) in BULAN" :key="b" :value="i + 1">{{ b }}</option>
          </select>
          <select
            v-model="filterLembaga"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="">Semua lembaga</option>
            <option v-for="l in uniqueLembaga" :key="l" :value="l">{{ l }}</option>
          </select>
          <select
            v-model="filterKelas"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="">Semua kelas</option>
            <option v-for="k in uniqueKelas" :key="k" :value="k">{{ k }}</option>
          </select>
          <select
            v-model="filterStatus"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="">Semua status</option>
            <option value="hadir">Hadir</option>
            <option value="alfa">Alfa</option>
            <option value="sakit">Sakit</option>
            <option value="izin">Izin</option>
          </select>
        </div>
      </div>

      <!-- Tabs -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-2 border border-[var(--border-subtle)] shadow-sm flex gap-1"
      >
        <button
          @click="activeTab = 'rekap'"
          :class="[
            'flex-1 px-3 py-2 text-sm rounded-xl font-bold transition',
            activeTab === 'rekap'
              ? 'bg-cyan-600 text-white shadow'
              : 'text-[var(--text-secondary)] hover:bg-cyan-50'
          ]"
        >
          Rekap per Santri
        </button>
        <button
          @click="activeTab = 'detail'"
          :class="[
            'flex-1 px-3 py-2 text-sm rounded-xl font-bold transition',
            activeTab === 'detail'
              ? 'bg-cyan-600 text-white shadow'
              : 'text-[var(--text-secondary)] hover:bg-cyan-50'
          ]"
        >
          Detail per Hari
        </button>
      </div>

      <!-- Action buttons -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm flex flex-wrap gap-2"
      >
        <button
          @click="generateKeRapor"
          :disabled="generating"
          class="px-3 py-2 text-xs font-bold rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:opacity-50 inline-flex items-center gap-1"
        >
          <i class="fas fa-file-export"></i>
          {{ generating ? 'Memproses...' : 'Generate ke Rapor' }}
        </button>
        <button
          @click="exportExcel"
          :disabled="exporting"
          class="px-3 py-2 text-xs font-bold rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50 inline-flex items-center gap-1"
        >
          <i class="fas fa-file-excel"></i>Export Excel
        </button>
        <button
          @click="exportPdf"
          :disabled="exporting"
          class="px-3 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50 inline-flex items-center gap-1"
        >
          <i class="fas fa-file-pdf"></i>Export PDF
        </button>
        <span class="text-[10px] text-[var(--text-tertiary)] italic ml-auto self-center">
          <i class="fas fa-info-circle mr-1"></i>Filter santri: non-mukim (PP/Fullday) only
        </span>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-cyan-500 text-3xl mb-3"></i>
        <p class="text-sm text-[var(--text-secondary)] font-bold">Memuat absensi...</p>
      </div>

      <!-- Tab: Rekap per Santri -->
      <div v-else-if="activeTab === 'rekap'" class="space-y-2">
        <div
          v-if="rekapPerSantri.length === 0"
          class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
        >
          <i class="fas fa-calendar-times text-[var(--text-tertiary)] text-4xl mb-3"></i>
          <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">Tidak ada absensi</p>
        </div>
        <div
          v-for="r in rekapPerSantri"
          :key="r.santri_id"
          class="bg-[var(--bg-card)] rounded-xl p-3 border border-[var(--border-subtle)] shadow-sm"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center"
            >
              <i class="fas fa-user-graduate"></i>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-black text-[var(--text-primary)] truncate">
                {{ getNamaSantri(r.santri_id) }}
              </h3>
              <div class="flex gap-1.5 mt-1 text-[10px]">
                <span class="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">
                  H: {{ r.hadir }}
                </span>
                <span class="bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-bold">
                  A: {{ r.alfa }}
                </span>
                <span class="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded font-bold">
                  S: {{ r.sakit }}
                </span>
                <span class="bg-teal-100 text-teal-700 px-2 py-0.5 rounded font-bold">
                  I: {{ r.izin }}
                </span>
              </div>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="text-2xl font-black text-cyan-700">{{ r.hadir }}</p>
              <button
                @click="hapusAbsensiSantri(r.santri_id)"
                class="text-[10px] text-rose-600 hover:text-rose-800 font-bold mt-1"
                title="Hapus semua absensi santri ini"
              >
                <i class="fas fa-trash mr-1"></i>Hapus
              </button>
              <p class="text-[10px] text-[var(--text-secondary)] uppercase font-bold">hari hadir</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab: Detail per Hari -->
      <div v-else class="space-y-1.5">
        <div
          v-if="filteredAbsensi.length === 0"
          class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
        >
          <i class="fas fa-calendar-times text-[var(--text-tertiary)] text-4xl mb-3"></i>
          <p class="text-sm font-bold text-[var(--text-primary)]">Tidak ada absensi</p>
        </div>
        <div
          v-for="a in filteredAbsensi"
          :key="a.id"
          class="bg-[var(--bg-card)] rounded-xl p-2.5 border border-[var(--border-subtle)] shadow-sm"
        >
          <div class="flex items-center gap-3">
            <div
              :class="[
                'flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs',
                statusBg(a.status)
              ]"
            >
              {{ statusLabel(a.status) }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">
                {{ getNamaSantri(a.santri_id || a.santriId) }}
              </p>
              <p class="text-[11px] text-[var(--text-secondary)]">
                {{ a.tanggal }} ·
                <span class="capitalize">{{ a.status }}</span>
                <span v-if="a.keterangan" class="ml-1">· {{ a.keterangan }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-[10px] text-[var(--text-tertiary)] pt-2">
        <i class="fas fa-circle-info mr-1"></i>
        {{ filteredAbsensi.length }} absensi · Vue 3 · Phase 5.17
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  doc,
  collection,
  query as fbQuery,
  where,
  getDocs,
  setDoc,
  deleteDoc
} from 'firebase/firestore'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { subscribeColl } from '@/services/firestore'
import { db } from '@/services/firebase'
import { useExcel } from '@/composables/useExcel'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { buildListPdf } from '@/utils/pdfBuilder'

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

// --- Internal data state ---
const auth = useAuthStore()
const settingsStore = useSettingsStore()
const toast = useToast()
const confirmDlg = useConfirm()
const { exportStyled } = useExcel()

const absensi = ref([])
const santriRaw = ref([])
const loading = ref(true)
const unsubs = []

const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth() + 1)
const filterLembaga = ref('')
const filterKelas = ref('')
const filterStatus = ref('')

const isFullAccess = computed(() => {
  const u = auth.sesiAktif
  if (!u) return false
  return (
    u.role === 'admin' ||
    u.id === 'admin' ||
    ['super_admin', 'admin', 'admin_keuangan'].includes(u.role_sistem) ||
    u.role === 'guru'
  )
})

const santriNonMukim = computed(() =>
  santriRaw.value.filter((s) => s.is_mukim === false || s.is_fullday === true)
)

const filteredAbsensi = computed(() => {
  const periode = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`
  let rows = absensi.value.filter((r) => String(r.tanggal || '').substring(0, 7) === periode)
  if (filterStatus.value) {
    rows = rows.filter(
      (r) => String(r.status || '').toLowerCase() === filterStatus.value.toLowerCase()
    )
  }
  rows = rows.filter((r) => {
    const s = santriRaw.value.find((x) => String(x.id) === String(r.santri_id || r.santriId))
    if (!s) return false
    // Skip mukim non-fullday
    if (s.is_mukim === true && s.is_fullday !== true) return false
    if (
      filterLembaga.value &&
      s.lembaga_sekolah !== filterLembaga.value &&
      s.lembaga !== filterLembaga.value
    )
      return false
    if (filterKelas.value && s.kelas_sekolah !== filterKelas.value && s.kelas !== filterKelas.value)
      return false
    return true
  })
  rows.sort((a, b) => (b.tanggal || '').localeCompare(a.tanggal || ''))
  return rows
})

const stats = computed(() => {
  const acc = { hadir: 0, alfa: 0, sakit: 0, izin: 0, total: 0 }
  for (const r of filteredAbsensi.value) {
    const s = String(r.status || '').toLowerCase()
    if (s === 'hadir' || s === 'h') acc.hadir++
    else if (s === 'alfa' || s === 'a') acc.alfa++
    else if (s === 'sakit' || s === 's') acc.sakit++
    else if (s === 'izin' || s === 'i') acc.izin++
    acc.total++
  }
  return acc
})

const rekapPerSantri = computed(() => {
  const map = {}
  for (const r of filteredAbsensi.value) {
    const sid = String(r.santri_id || r.santriId || '')
    if (!map[sid]) {
      map[sid] = { santri_id: sid, hadir: 0, alfa: 0, sakit: 0, izin: 0, total: 0 }
    }
    const s = String(r.status || '').toLowerCase()
    if (s === 'hadir' || s === 'h') map[sid].hadir++
    else if (s === 'alfa' || s === 'a') map[sid].alfa++
    else if (s === 'sakit' || s === 's') map[sid].sakit++
    else if (s === 'izin' || s === 'i') map[sid].izin++
    map[sid].total++
  }
  return Object.values(map).sort((a, b) => b.hadir - a.hadir)
})

function getNamaSantri(id) {
  const s = santriRaw.value.find((x) => String(x.id) === String(id))
  return s ? s.nama : '(unknown)'
}

function getSantriInfo(id) {
  return santriRaw.value.find((x) => String(x.id) === String(id))
}

function getBulanLabel(m) {
  return BULAN[m - 1] || '-'
}

onMounted(() => {
  unsubs.push(
    subscribeColl('absensi_santri_sekolah', (docs) => {
      absensi.value = docs
      loading.value = false
    }),
    subscribeColl('santri', (docs) => {
      santriRaw.value = docs
    })
  )
})

onUnmounted(() => {
  for (const u of unsubs) {
    if (u) {
      try {
        u()
      } catch (e) {
        // noop
      }
    }
  }
})

// --- UI state ---
const activeTab = ref('rekap')
const generating = ref(false)
const exporting = ref(false)

const yearOptions = computed(() => {
  const y = new Date().getFullYear()
  return [y - 1, y, y + 1]
})

const uniqueLembaga = computed(() => {
  const set = new Set()
  for (const s of santriRaw.value) {
    if (s?.lembaga_sekolah) set.add(s.lembaga_sekolah)
    if (s?.lembaga) set.add(s.lembaga)
  }
  return [...set].sort()
})

const uniqueKelas = computed(() => {
  const set = new Set()
  for (const s of santriRaw.value) {
    if (s?.kelas) set.add(s.kelas)
    if (s?.kelas_sekolah) set.add(s.kelas_sekolah)
  }
  return [...set].sort()
})

function statusLabel(status) {
  const s = String(status || '').toLowerCase()
  if (s === 'hadir' || s === 'h') return 'H'
  if (s === 'alfa' || s === 'a') return 'A'
  if (s === 'sakit' || s === 's') return 'S'
  if (s === 'izin' || s === 'i') return 'I'
  return '?'
}

function statusBg(status) {
  const s = String(status || '').toLowerCase()
  if (s === 'hadir' || s === 'h') return 'bg-emerald-500'
  if (s === 'alfa' || s === 'a') return 'bg-rose-500'
  if (s === 'sakit' || s === 's') return 'bg-[var(--color-accent)]'
  if (s === 'izin' || s === 'i') return 'bg-teal-500'
  return 'bg-slate-400'
}

// --- Actions ---
async function generateKeRapor() {
  if (generating.value) return
  if (!filteredAbsensi.value.length) {
    toast.error('Tidak ada absensi di filter saat ini')
    return
  }
  generating.value = true
  try {
    const m = selectedMonth.value
    const y = selectedYear.value
    const semester = m >= 7 ? 'Ganjil' : 'Genap'
    const tahunAjaran = m >= 7 ? `${y}-${y + 1}` : `${y - 1}-${y}`
    const periodKey = `${tahunAjaran}_${semester}`.replace(/[^a-zA-Z0-9_]/g, '_')
    let count = 0
    for (const rek of rekapPerSantri.value) {
      const info = getSantriInfo(rek.santri_id)
      if (!info) continue
      const lembaga = info.lembaga || ''
      const docId = `rapor_${rek.santri_id}_${lembaga}_${periodKey}`
      const payload = {
        santri_id: rek.santri_id,
        santri_nama: info.nama || '',
        lembaga,
        tahunAjaran,
        semester,
        absensi: {
          sakit: rek.sakit,
          izin: rek.izin,
          alpa: rek.alfa,
          hadir: rek.hadir,
          total: rek.total,
          _generatedFrom: 'absensi_santri_sekolah',
          _generatedAt: new Date().toISOString(),
          _periodGenerated: `${BULAN[m - 1]} ${y}`
        }
      }
      await setDoc(doc(db, 'rapor_semester', docId), payload, { merge: true })
      count++
    }
    toast.success(`Absensi ${count} santri ter-generate ke rapor (${semester} ${tahunAjaran})`)
  } catch (e) {
    toast.error('Gagal generate: ' + (e?.message || e))
  } finally {
    generating.value = false
  }
}

async function exportExcel() {
  if (exporting.value) return
  exporting.value = true
  try {
    const rows = rekapPerSantri.value.map((r, i) => {
      const info = getSantriInfo(r.santri_id) || {}
      return {
        no: i + 1,
        nama: info.nama || '(unknown)',
        lembaga: info.lembaga || info.lembaga_sekolah || '',
        kelas: info.kelas || info.kelas_sekolah || '',
        hadir: r.hadir,
        alfa: r.alfa,
        sakit: r.sakit,
        izin: r.izin,
        total: r.total
      }
    })
    await exportStyled(rows, {
      filename: `absensi-santri-${BULAN[selectedMonth.value - 1]}-${selectedYear.value}.xlsx`,
      sheetName: 'Absensi',
      title: `REKAP ABSENSI ${BULAN[selectedMonth.value - 1].toUpperCase()} ${selectedYear.value}`,
      columns: [
        { key: 'no', header: 'No', width: 6 },
        { key: 'nama', header: 'Nama Santri', width: 28 },
        { key: 'lembaga', header: 'Lembaga', width: 18 },
        { key: 'kelas', header: 'Kelas', width: 10 },
        { key: 'hadir', header: 'Hadir', width: 8 },
        { key: 'alfa', header: 'Alfa', width: 8 },
        { key: 'sakit', header: 'Sakit', width: 8 },
        { key: 'izin', header: 'Izin', width: 8 },
        { key: 'total', header: 'Total', width: 8 }
      ]
    })
  } catch (e) {
    toast.error('Gagal export Excel: ' + (e?.message || e))
  } finally {
    exporting.value = false
  }
}

async function exportPdf() {
  if (exporting.value) return
  exporting.value = true
  try {
    const s = settingsStore?.settings || {}
    const kop = {
      logoUrl: s.kop_logo || '',
      line1: s.kopLine1 || 'YAYASAN MAMBAUL ULUM',
      line2: s.kopLine2 || '',
      line3: s.kopLine3 || ''
    }
    const rows = rekapPerSantri.value.map((r, i) => {
      const info = getSantriInfo(r.santri_id) || {}
      return {
        no: i + 1,
        nama: info.nama || '(unknown)',
        lembaga: info.lembaga || info.lembaga_sekolah || '',
        kelas: info.kelas || info.kelas_sekolah || '',
        hadir: r.hadir,
        alfa: r.alfa,
        sakit: r.sakit,
        izin: r.izin,
        total: r.total
      }
    })
    await buildListPdf({
      kind: 'umum',
      orientation: 'l',
      format: 'a4',
      kop,
      title: `REKAP ABSENSI ${BULAN[selectedMonth.value - 1].toUpperCase()} ${selectedYear.value}`,
      columns: [
        { key: 'no', header: 'No', width: 10 },
        { key: 'nama', header: 'Nama', width: 60 },
        { key: 'lembaga', header: 'Lembaga', width: 32 },
        { key: 'kelas', header: 'Kelas', width: 18 },
        { key: 'hadir', header: 'H', width: 15 },
        { key: 'alfa', header: 'A', width: 15 },
        { key: 'sakit', header: 'S', width: 15 },
        { key: 'izin', header: 'I', width: 15 },
        { key: 'total', header: 'Total', width: 18 }
      ],
      rows,
      filename: `absensi-santri-${BULAN[selectedMonth.value - 1]}-${selectedYear.value}.pdf`
    })
  } catch (e) {
    toast.error('Gagal export PDF: ' + (e?.message || e))
  } finally {
    exporting.value = false
  }
}

async function hapusAbsensiSantri(santriId) {
  if (!santriId) return
  const nama = getNamaSantri(santriId)
  const ok = await confirmDlg({
    title: 'Hapus semua absensi santri ini?',
    message: `Akan hapus SEMUA record absensi untuk "${nama}". Tidak bisa di-undo.`,
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    const q = fbQuery(collection(db, 'absensi_santri'), where('santri_id', '==', String(santriId)))
    const snap = await getDocs(q)
    let count = 0
    for (const d of snap.docs) {
      await deleteDoc(doc(db, 'absensi_santri', d.id))
      count++
    }
    toast.success(`${count} record absensi dihapus untuk ${nama}`)
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}
</script>
