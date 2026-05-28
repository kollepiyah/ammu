<template>
  <!-- v.20.80.0526 M9: 4 Charts admin (chart.js + vue-chartjs) -->
  <div class="space-y-3">
    <h3 class="text-sm md:text-base font-black text-[var(--text-primary)] mb-1">
      <i class="fas fa-chart-line text-teal-600 mr-2"></i>Grafik Statistik
      <span class="text-[10px] font-bold text-[var(--text-secondary)] ml-2 normal-case">12 bulan terakhir</span>
    </h3>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <!-- M9.a: Stat Guru Kehadiran -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">
            <i class="fas fa-user-check text-emerald-600 mr-1"></i>Kehadiran Guru
          </h4>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">{{ absensiGuru.length }} record</span>
        </div>
        <div class="relative h-64">
          <Bar v-if="chartGuruKehadiran" :data="chartGuruKehadiran" :options="chartOptionsStacked" />
          <div v-else class="absolute inset-0 flex items-center justify-center text-xs text-[var(--text-tertiary)] italic">
            <i class="fas fa-spinner fa-spin mr-2"></i>Belum ada data absensi
          </div>
        </div>
      </div>

      <!-- M9.b: Stat Santri Prestasi -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">
            <i class="fas fa-trophy text-cyan-600 mr-1"></i>Prestasi Santri (per lembaga)
          </h4>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">{{ santriList.length || 0 }} santri</span>
        </div>
        <div class="relative h-64">
          <Pie v-if="chartSantriPrestasi" :data="chartSantriPrestasi" :options="chartOptionsPie" />
          <div v-else class="absolute inset-0 flex items-center justify-center text-xs text-[var(--text-tertiary)] italic">
            Belum ada data prestasi
          </div>
        </div>
      </div>

      <!-- M9.c: Chart Keuangan -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">
            <i class="fas fa-coins text-cyan-600 mr-1"></i>Arus Kas (Buku Induk)
          </h4>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">{{ bukuInduk.length }} entri</span>
        </div>
        <div class="relative h-64">
          <Line v-if="chartKeuangan" :data="chartKeuangan" :options="chartOptionsCurrency" />
          <div v-else class="absolute inset-0 flex items-center justify-center text-xs text-[var(--text-tertiary)] italic">
            Belum ada data keuangan
          </div>
        </div>
      </div>

      <!-- M9.d: Rekap Kegiatan -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">
            <i class="fas fa-calendar-check text-cyan-600 mr-1"></i>Rekap Kegiatan
          </h4>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">{{ kegiatanList.length }} kegiatan</span>
        </div>
        <div class="relative h-64">
          <Bar v-if="chartKegiatan" :data="chartKegiatan" :options="chartOptionsSimple" />
          <div v-else class="absolute inset-0 flex items-center justify-center text-xs text-[var(--text-tertiary)] italic">
            Belum ada data kegiatan
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Bar, Pie, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js'
import { subscribeColl } from '@/services/firestore'
// v.21.15.0526: + self-contained santri data (instead of prop)
import { useSantri } from '@/composables/useSantri'

// Register Chart.js components (sekali per app — idempotent)
ChartJS.register(
  Title, Tooltip, Legend,
  BarElement, ArcElement, CategoryScale, LinearScale,
  PointElement, LineElement, Filler
)

// v.21.15.0526: self-contained — gak perlu prop
const { santriRaw: santriList } = useSantri()

const absensiGuru = ref([])
const bukuInduk = ref([])
const kegiatanList = ref([])
const unsubs = []

onMounted(() => {
  unsubs.push(
    subscribeColl('absensi_guru', (docs) => { absensiGuru.value = docs }),
    subscribeColl('keuangan_buku_induk', (docs) => { bukuInduk.value = docs }),
    subscribeColl('kegiatan_pesantren', (docs) => { kegiatanList.value = docs })
  )
})
onUnmounted(() => {
  for (const u of unsubs) { try { u && u() } catch (e) {} }
})

// === Helpers ===
function last12MonthsLabels() {
  const out = []
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = `${['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'][d.getMonth()]}${i >= 10 ? ' ' + String(d.getFullYear()).slice(2) : ''}`
    out.push({ key, label })
  }
  return out
}

function monthKey(dateStr) {
  if (!dateStr) return ''
  const s = String(dateStr)
  const m = s.match(/^(\d{4})-(\d{2})/)
  return m ? `${m[1]}-${m[2]}` : ''
}

const COLORS = ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444', '#84cc16']

// === M9.a: Kehadiran Guru (stacked bar) ===
const chartGuruKehadiran = computed(() => {
  if (!absensiGuru.value.length) return null
  const months = last12MonthsLabels()
  const hadir = new Array(12).fill(0)
  const sakit = new Array(12).fill(0)
  const izin = new Array(12).fill(0)
  const alpa = new Array(12).fill(0)
  for (const a of absensiGuru.value) {
    const mk = monthKey(a.tanggal)
    const idx = months.findIndex((m) => m.key === mk)
    if (idx < 0) continue
    const status = String(a.status || a.keterangan || '').toLowerCase().trim()
    if (status === 'hadir' || status === 'h') hadir[idx]++
    else if (status === 'sakit' || status === 's') sakit[idx]++
    else if (status === 'izin' || status === 'i') izin[idx]++
    else if (status === 'alpa' || status === 'a' || status === 'alpha') alpa[idx]++
  }
  return {
    labels: months.map((m) => m.label),
    datasets: [
      { label: 'Hadir', data: hadir, backgroundColor: '#10b981' },
      { label: 'Sakit', data: sakit, backgroundColor: '#f59e0b' },
      { label: 'Izin', data: izin, backgroundColor: '#3b82f6' },
      { label: 'Alpa', data: alpa, backgroundColor: '#ef4444' }
    ]
  }
})

// === M9.b: Prestasi Santri (pie per lembaga) ===
function extractNum(v) {
  const m = String(v || '').match(/\d+/)
  return m ? parseInt(m[0]) : 0
}

const chartSantriPrestasi = computed(() => {
  const list = (santriList.value || []).filter((s) => s.aktif !== false)
  if (!list.length) return null
  const byLembaga = {}
  for (const s of list) {
    const lmb = String(s.lembaga || '—').trim()
    const akhir = extractNum(s.prestasi_akhir)
    if (akhir > 0) byLembaga[lmb] = (byLembaga[lmb] || 0) + 1
  }
  const entries = Object.entries(byLembaga).sort((a, b) => b[1] - a[1])
  if (entries.length === 0) return null
  return {
    labels: entries.map((e) => e[0]),
    datasets: [{
      data: entries.map((e) => e[1]),
      backgroundColor: entries.map((_, i) => COLORS[i % COLORS.length]),
      borderColor: '#fff',
      borderWidth: 2
    }]
  }
})

// === M9.c: Arus Kas keuangan (line: masuk vs keluar) ===
const chartKeuangan = computed(() => {
  if (!bukuInduk.value.length) return null
  const months = last12MonthsLabels()
  const masuk = new Array(12).fill(0)
  const keluar = new Array(12).fill(0)
  for (const b of bukuInduk.value) {
    // v.21.96.0527: Skip residu tabungan supaya tidak ke-hitung di chart keuangan
    const kat = String(b.kategori || '').toLowerCase()
    const sumber = String(b.sumber || '').toLowerCase()
    if (kat === 'tabungan' || sumber === 'tabungan' || sumber.includes('tabungan')) continue
    const mk = monthKey(b.tanggal)
    const idx = months.findIndex((m) => m.key === mk)
    if (idx < 0) continue
    const nominal = Number(b.nominal) || 0
    const tipe = String(b.tipe || '').toLowerCase()
    if (tipe === 'masuk' || tipe === 'in' || tipe === 'income') masuk[idx] += nominal
    else if (tipe === 'keluar' || tipe === 'out' || tipe === 'expense') keluar[idx] += nominal
  }
  return {
    labels: months.map((m) => m.label),
    datasets: [
      {
        label: 'Pemasukan',
        data: masuk,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16,185,129,0.15)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Pengeluaran',
        data: keluar,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.15)',
        tension: 0.3,
        fill: true
      }
    ]
  }
})

// === M9.d: Rekap Kegiatan (bar per jenis kegiatan) ===
const chartKegiatan = computed(() => {
  if (!kegiatanList.value.length) return null
  const byJenis = {}
  for (const k of kegiatanList.value) {
    const j = String(k.jenis || k.kategori || k.nama || 'Lainnya').trim()
    byJenis[j] = (byJenis[j] || 0) + 1
  }
  const entries = Object.entries(byJenis).sort((a, b) => b[1] - a[1]).slice(0, 10)
  if (entries.length === 0) return null
  return {
    labels: entries.map((e) => e[0]),
    datasets: [{
      label: 'Jumlah Kegiatan',
      data: entries.map((e) => e[1]),
      backgroundColor: entries.map((_, i) => COLORS[i % COLORS.length])
    }]
  }
})

// === Chart options ===
const chartOptionsStacked = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 10 } }
  },
  scales: {
    x: { stacked: true, ticks: { font: { size: 9 } } },
    y: { stacked: true, beginAtZero: true, ticks: { font: { size: 9 } } }
  }
}

const chartOptionsPie = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'right', labels: { font: { size: 10 }, boxWidth: 10 } }
  }
}

const chartOptionsCurrency = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 10 } },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.dataset.label}: Rp ${new Intl.NumberFormat('id-ID').format(ctx.parsed.y)}`
      }
    }
  },
  scales: {
    x: { ticks: { font: { size: 9 } } },
    y: {
      beginAtZero: true,
      ticks: {
        font: { size: 9 },
        callback: (val) => 'Rp ' + new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(val)
      }
    }
  }
}

const chartOptionsSimple = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { font: { size: 9 } } },
    y: { beginAtZero: true, ticks: { font: { size: 9 }, precision: 0 } }
  }
}
</script>
