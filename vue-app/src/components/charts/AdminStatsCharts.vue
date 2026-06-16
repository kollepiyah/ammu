<template>
  <!-- v.103: Dashboard = grafik PERKEMBANGAN (time-series) saja. Rekap/komposisi
       dipindah konsepnya ke Laporan (analitik). Ada selektor rentang 30/90 hari/tahunan. -->
  <div class="space-y-3">
    <div class="flex items-center justify-between flex-wrap gap-2">
      <h3 class="text-sm md:text-base font-black text-[var(--text-primary)]">
        <i class="fas fa-chart-line text-teal-600 mr-2"></i>Grafik Perkembangan
      </h3>
      <div class="flex gap-0.5 bg-[var(--bg-muted)] rounded-lg p-0.5">
        <button
          v-for="r in RANGES"
          :key="r.id"
          type="button"
          @click="range = r.id"
          :class="[
            'px-3 py-1 rounded-md text-[11px] font-bold transition',
            range === r.id ? 'bg-[var(--color-primary)] text-white shadow' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          ]"
        >
          {{ r.label }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <!-- Perkembangan Capaian Prestasi -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">
            <i class="fas fa-trophy text-amber-500 mr-1"></i>Perkembangan Capaian Prestasi
          </h4>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">rata-rata / bulan</span>
        </div>
        <div class="relative h-60">
          <Line v-if="chartCapaian" :data="chartCapaian" :options="optLine" />
          <div v-else class="absolute inset-0 flex items-center justify-center text-center text-xs text-[var(--text-tertiary)] italic px-4">
            Belum cukup data capaian (butuh ≥ 2 bulan terisi)
          </div>
        </div>
      </div>

      <!-- Perkembangan Kehadiran Guru -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">
            <i class="fas fa-user-check text-emerald-600 mr-1"></i>Perkembangan Kehadiran Guru
          </h4>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">hadir / {{ bucketUnit }}</span>
        </div>
        <div class="relative h-60">
          <Line v-if="chartKehadiran" :data="chartKehadiran" :options="optLine" />
          <div v-else class="absolute inset-0 flex items-center justify-center text-xs text-[var(--text-tertiary)] italic">Belum ada data absensi</div>
        </div>
      </div>

      <!-- Perkembangan Arus Kas -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">
            <i class="fas fa-coins text-cyan-600 mr-1"></i>Perkembangan Arus Kas
          </h4>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">per {{ bucketUnit }}</span>
        </div>
        <div class="relative h-60">
          <Line v-if="chartKas" :data="chartKas" :options="optLineCurrency" />
          <div v-else class="absolute inset-0 flex items-center justify-center text-xs text-[var(--text-tertiary)] italic">Belum ada data keuangan</div>
        </div>
      </div>

      <!-- Perkembangan Jumlah Santri Masuk -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">
            <i class="fas fa-user-plus text-teal-600 mr-1"></i>Perkembangan Jumlah Santri
          </h4>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">santri masuk / {{ bucketUnit }}</span>
        </div>
        <div class="relative h-60">
          <Line v-if="chartSantriMasuk" :data="chartSantriMasuk" :options="optLine" />
          <div v-else class="absolute inset-0 flex items-center justify-center text-center text-xs text-[var(--text-tertiary)] italic px-4">Belum ada data tanggal masuk santri</div>
        </div>
      </div>

      <!-- Kenaikan Tes per Lembaga (full width) -->
      <div class="lg:col-span-2 bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">
            <i class="fas fa-arrow-up-right-dots text-[var(--color-primary)] mr-1"></i>Kenaikan Tes per Lembaga
          </h4>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">santri lulus naik · {{ rangeLabel }}</span>
        </div>
        <div class="relative h-64">
          <Bar v-if="chartTesLembaga" :data="chartTesLembaga" :options="optBar" />
          <div v-else class="absolute inset-0 flex items-center justify-center text-xs text-[var(--text-tertiary)] italic">Belum ada kelulusan tes pada rentang ini</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ============================================================================
// AdminStatsCharts.vue — Dashboard /statistik (admin). v.103 "rapikan dashboard":
// HANYA grafik PERKEMBANGAN (time-series). Rekap/komposisi/snapshot dipindah
// konsepnya ke Laporan. Selektor rentang: 30 hari / 90 hari (harian) / tahunan (bulanan).
//   - Capaian Prestasi  : notif_prestasi (periode bulanan) → rata-rata/bulan
//   - Kehadiran Guru     : absensi_guru → hadir per hari/bulan
//   - Arus Kas           : keuangan_buku_induk → masuk/keluar per hari/bulan
//   - Jumlah Santri Masuk: santri.tgl_masuk → santri baru per hari/bulan
//   - Kenaikan Tes/Lembaga: tes_kenaikan (status lulus) → bar per lembaga (dlm rentang)
// ============================================================================
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale, PointElement, LineElement, Filler
} from 'chart.js'
import { subscribeColl } from '@/services/firestore'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/services/firebase'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Filler)

// santriList dari StatistikView (scopedSantriAll) — utk grafik santri masuk
const props = defineProps({ santriList: { type: Array, default: () => [] } })

// ---- Rentang waktu ---------------------------------------------------------
const RANGES = [
  { id: '30d', label: '30 Hari' },
  { id: '90d', label: '90 Hari' },
  { id: '1y', label: 'Tahunan' }
]
const range = ref('90d')
const RANGE_DAYS = { '30d': 30, '90d': 90 }
const isMonthly = computed(() => range.value === '1y')
const bucketUnit = computed(() => (isMonthly.value ? 'bulan' : 'hari'))
const rangeLabel = computed(() => RANGES.find((r) => r.id === range.value)?.label || '')

// ---- Data sources ----------------------------------------------------------
const absensiGuru = ref([])
const bukuInduk = ref([])
const tesList = ref([])
const prestasiRows = ref([]) // notif_prestasi: { santri_id, total, periode }
const unsubs = []

onMounted(async () => {
  unsubs.push(
    subscribeColl('absensi_guru', (docs) => { absensiGuru.value = docs }),
    subscribeColl('keuangan_buku_induk', (docs) => { bukuInduk.value = docs }),
    subscribeColl('tes_kenaikan', (docs) => { tesList.value = docs })
  )
  // notif_prestasi: ambil sekali (agregat bulanan, hemat reads vs subscribe)
  try {
    const snap = await getDocs(collection(db, 'notif_prestasi'))
    const out = []
    snap.forEach((d) => out.push(d.data()))
    prestasiRows.value = out
  } catch (e) { prestasiRows.value = [] }
})
onUnmounted(() => { for (const u of unsubs) { try { u && u() } catch (e) {} } })

// ---- Helpers ---------------------------------------------------------------
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const COLORS = ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444', '#84cc16']
const pad = (n) => String(n).padStart(2, '0')

function toDate(s) {
  if (!s) return null
  if (s && typeof s.toDate === 'function') { try { return s.toDate() } catch (e) {} } // Firestore Timestamp
  const str = String(s).trim()
  let m = str.match(/^(\d{4})-(\d{2})-(\d{2})/) // YYYY-MM-DD
  if (m) return new Date(+m[1], +m[2] - 1, +m[3])
  m = str.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/) // DD/MM/YYYY
  if (m) return new Date(+m[3], +m[2] - 1, +m[1])
  const d = new Date(str)
  return isNaN(d.getTime()) ? null : d
}

// Buckets sesuai rentang (harian utk 30/90 hari, bulanan utk tahunan)
const buckets = computed(() => {
  const out = []
  const now = new Date()
  if (isMonthly.value) {
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      out.push({ key: `${d.getFullYear()}-${pad(d.getMonth() + 1)}`, label: `${MON[d.getMonth()]} ${String(d.getFullYear()).slice(2)}` })
    }
  } else {
    const days = RANGE_DAYS[range.value]
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      out.push({ key: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, label: `${d.getDate()}/${d.getMonth() + 1}` })
    }
  }
  return out
})
function bucketKey(date) {
  if (!date) return null
  return isMonthly.value
    ? `${date.getFullYear()}-${pad(date.getMonth() + 1)}`
    : `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}
const windowStart = computed(() => {
  const now = new Date()
  const d = new Date(now)
  if (isMonthly.value) d.setFullYear(d.getFullYear() - 1)
  else d.setDate(d.getDate() - RANGE_DAYS[range.value])
  return d
})
const bucketIndex = computed(() => Object.fromEntries(buckets.value.map((b, i) => [b.key, i])))
const ptRadius = computed(() => (buckets.value.length > 40 ? 0 : 2))

// ---- Perkembangan Capaian Prestasi (bulanan; jml bulan ikut rentang) -------
const capaianMonths = computed(() => (range.value === '1y' ? 12 : range.value === '90d' ? 6 : 3))
const chartCapaian = computed(() => {
  const byP = {}
  for (const r of prestasiRows.value) {
    const p = String(r.periode || '')
    if (!/^\d{4}-\d{2}$/.test(p)) continue
    const n = parseFloat(String(r.total ?? '').replace(/[^0-9.]/g, ''))
    if (isNaN(n)) continue
    if (!byP[p]) byP[p] = { s: 0, c: 0 }
    byP[p].s += n
    byP[p].c++
  }
  const periods = Object.keys(byP).sort().slice(-capaianMonths.value)
  if (periods.length < 2) return null
  return {
    labels: periods.map((p) => { const [y, m] = p.split('-'); return `${MON[+m - 1]} ${y.slice(2)}` }),
    datasets: [{
      label: 'Rata-rata capaian', data: periods.map((p) => Math.round((byP[p].s / byP[p].c) * 10) / 10),
      borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.14)', tension: 0.35, fill: true, pointRadius: 3, pointBackgroundColor: '#8b5cf6'
    }]
  }
})

// ---- Perkembangan Kehadiran Guru -------------------------------------------
const chartKehadiran = computed(() => {
  const bk = buckets.value
  const idx = bucketIndex.value
  const hadir = new Array(bk.length).fill(0)
  for (const a of absensiGuru.value) {
    const k = bucketKey(toDate(a.tanggal))
    if (k == null || !(k in idx)) continue
    const st = String(a.status || a.keterangan || '').toLowerCase()
    if (st === 'hadir' || st === 'h' || st === 'masuk' || st === 'terlambat') hadir[idx[k]]++
  }
  if (!hadir.some((v) => v)) return null
  return {
    labels: bk.map((b) => b.label),
    datasets: [{ label: 'Kehadiran', data: hadir, borderColor: '#0F6E56', backgroundColor: 'rgba(29,158,117,0.14)', tension: 0.3, fill: true, pointRadius: ptRadius.value, pointBackgroundColor: '#0F6E56' }]
  }
})

// ---- Perkembangan Arus Kas -------------------------------------------------
const chartKas = computed(() => {
  const bk = buckets.value
  const idx = bucketIndex.value
  const masuk = new Array(bk.length).fill(0)
  const keluar = new Array(bk.length).fill(0)
  for (const b of bukuInduk.value) {
    const kat = String(b.kategori || '').toLowerCase()
    const sumber = String(b.sumber || '').toLowerCase()
    if (kat === 'tabungan' || sumber.includes('tabungan')) continue
    const k = bucketKey(toDate(b.tanggal))
    if (k == null || !(k in idx)) continue
    const nominal = Number(b.nominal) || 0
    const tipe = String(b.tipe || '').toLowerCase()
    if (tipe === 'masuk' || tipe === 'in' || tipe === 'income') masuk[idx[k]] += nominal
    else if (tipe === 'keluar' || tipe === 'out' || tipe === 'expense') keluar[idx[k]] += nominal
  }
  if (!masuk.some((v) => v) && !keluar.some((v) => v)) return null
  return {
    labels: bk.map((b) => b.label),
    datasets: [
      { label: 'Pemasukan', data: masuk, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.15)', tension: 0.3, fill: true, pointRadius: ptRadius.value },
      { label: 'Pengeluaran', data: keluar, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.15)', tension: 0.3, fill: true, pointRadius: ptRadius.value }
    ]
  }
})

// ---- Perkembangan Jumlah Santri Masuk --------------------------------------
const chartSantriMasuk = computed(() => {
  const bk = buckets.value
  const idx = bucketIndex.value
  const cnt = new Array(bk.length).fill(0)
  for (const s of (props.santriList || [])) {
    const k = bucketKey(toDate(s.tgl_masuk || s.tanggal_masuk))
    if (k == null || !(k in idx)) continue
    cnt[idx[k]]++
  }
  if (!cnt.some((v) => v)) return null
  return {
    labels: bk.map((b) => b.label),
    datasets: [{ label: 'Santri masuk', data: cnt, borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.15)', tension: 0.3, fill: true, pointRadius: ptRadius.value, pointBackgroundColor: '#06b6d4' }]
  }
})

// ---- Kenaikan Tes per Lembaga (bar, lulus dalam rentang) -------------------
const chartTesLembaga = computed(() => {
  const ws = windowStart.value
  const map = {}
  for (const t of tesList.value) {
    if (String(t.status || '').toLowerCase() !== 'lulus') continue
    const d = toDate(t.tgl_hasil || t.tgl_uji || t.tgl)
    if (d && d < ws) continue // tanpa tanggal = tetap dihitung
    const lemb = String(t.lembaga || '').trim() || '(Lainnya)'
    map[lemb] = (map[lemb] || 0) + 1
  }
  const entries = Object.entries(map).sort((a, b) => b[1] - a[1])
  if (!entries.length) return null
  return {
    labels: entries.map((e) => e[0]),
    datasets: [{ label: 'Santri naik (lulus tes)', data: entries.map((e) => e[1]), backgroundColor: entries.map((_, i) => COLORS[i % COLORS.length]) }]
  }
})

// ---- Chart options ---------------------------------------------------------
const xScale = { ticks: { autoSkip: true, maxTicksLimit: 12, maxRotation: 0, font: { size: 9 } }, grid: { display: false } }
const optLine = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { x: xScale, y: { beginAtZero: true, ticks: { font: { size: 9 }, precision: 0 }, grid: { color: 'rgba(136,135,128,0.15)' } } }
}
const optLineCurrency = {
  responsive: true, maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 10 } },
    tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: Rp ${new Intl.NumberFormat('id-ID').format(ctx.parsed.y)}` } }
  },
  scales: { x: xScale, y: { beginAtZero: true, ticks: { font: { size: 9 }, callback: (v) => 'Rp ' + new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(v) }, grid: { color: 'rgba(136,135,128,0.15)' } } }
}
const optBar = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { x: { ticks: { font: { size: 9 } }, grid: { display: false } }, y: { beginAtZero: true, ticks: { font: { size: 9 }, precision: 0 } } }
}
</script>
