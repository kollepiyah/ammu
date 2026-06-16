<template>
  <!-- v.102 A3: Laporan/Analitik (sumber: BigQuery via Cloud Function analyticsQuery) -->
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div>
      <h1 class="text-xl md:text-2xl font-black text-[var(--text-primary)]">
        <i class="fas fa-chart-bar text-teal-600 mr-2"></i>Laporan &amp; Analitik
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        Ringkasan data lintas waktu — sumber analitik (BigQuery). Memperbarui beberapa saat setelah data berubah.
      </p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2">
      <button
        v-for="t in tabs"
        :key="t.id"
        @click="setTab(t.id)"
        class="px-4 py-2 rounded-xl text-sm font-bold transition"
        :class="tab === t.id
          ? 'bg-teal-600 text-white shadow'
          : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'"
      >
        <i :class="['fas', t.icon, 'mr-1']"></i>{{ t.label }}
      </button>
    </div>

    <!-- Error -->
    <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-sm text-red-700 dark:text-red-300">
      <i class="fas fa-triangle-exclamation mr-1"></i>{{ error }}
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-16 text-[var(--text-tertiary)] text-sm">
      <i class="fas fa-spinner fa-spin mr-2"></i>Memuat laporan…
    </div>

    <!-- ===== TAB SANTRI ===== -->
    <div v-show="!loading && tab === 'santri'" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black uppercase tracking-wider text-[var(--text-primary)] mb-3">
          <i class="fas fa-users text-teal-600 mr-1"></i>Santri Aktif per Lembaga
        </h3>
        <div class="relative h-72">
          <Bar v-if="chartLembaga" :data="chartLembaga" :options="optBar" />
          <div v-else class="absolute inset-0 flex items-center justify-center text-xs text-[var(--text-tertiary)] italic">Belum ada data</div>
        </div>
      </div>
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black uppercase tracking-wider text-[var(--text-primary)] mb-3">
          <i class="fas fa-house text-teal-600 mr-1"></i>Mukim vs Non-mukim
        </h3>
        <div class="relative h-72">
          <Doughnut v-if="chartMukim" :data="chartMukim" :options="optDoughnut" />
          <div v-else class="absolute inset-0 flex items-center justify-center text-xs text-[var(--text-tertiary)] italic">Belum ada data</div>
        </div>
      </div>
    </div>

    <!-- ===== TAB KEUANGAN ===== -->
    <div v-show="!loading && tab === 'keuangan'" class="space-y-4">
      <!-- Year selector -->
      <div class="flex items-center gap-2">
        <label class="text-xs font-bold text-[var(--text-secondary)]">Tahun</label>
        <select v-model.number="year" @change="loadKeuangan" class="px-3 py-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] text-sm">
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>

      <!-- KPI cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20">
          <div class="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Total Masuk</div>
          <div class="text-lg font-black text-emerald-700 dark:text-emerald-300 mt-1">{{ rupiah(ringkas.masuk) }}</div>
        </div>
        <div class="rounded-2xl p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <div class="text-[10px] font-black uppercase tracking-wider text-red-700 dark:text-red-400">Total Keluar</div>
          <div class="text-lg font-black text-red-700 dark:text-red-300 mt-1">{{ rupiah(ringkas.keluar) }}</div>
        </div>
        <div class="rounded-2xl p-4 border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20">
          <div class="text-[10px] font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-400">Saldo</div>
          <div class="text-lg font-black text-cyan-700 dark:text-cyan-300 mt-1">{{ rupiah(ringkas.masuk - ringkas.keluar) }}</div>
        </div>
      </div>

      <!-- Monthly chart -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black uppercase tracking-wider text-[var(--text-primary)] mb-3">
          <i class="fas fa-coins text-cyan-600 mr-1"></i>Arus Kas per Bulan ({{ year }})
        </h3>
        <div class="relative h-80">
          <Bar v-if="chartBulanan" :data="chartBulanan" :options="optCurrency" />
          <div v-else class="absolute inset-0 flex items-center justify-center text-xs text-[var(--text-tertiary)] italic">Belum ada transaksi tahun ini</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bar, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { analyticsQuery } from '@/services/analytics'

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale)

const tabs = [
  { id: 'santri', label: 'Santri', icon: 'fa-users' },
  { id: 'keuangan', label: 'Keuangan', icon: 'fa-coins' }
]
const tab = ref('santri')
const loading = ref(false)
const error = ref('')

const COLORS = ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444', '#84cc16']
const num = (v) => Number(v) || 0
const rupiah = (v) => 'Rp ' + new Intl.NumberFormat('id-ID').format(num(v))

// ---- Santri ----
const chartLembaga = ref(null)
const chartMukim = ref(null)

async function loadSantri() {
  loading.value = true
  error.value = ''
  try {
    const [perLembaga, mukim] = await Promise.all([
      analyticsQuery('santri_per_lembaga'),
      analyticsQuery('santri_mukim')
    ])
    chartLembaga.value = perLembaga.length
      ? {
          labels: perLembaga.map((r) => r.label),
          datasets: [{ label: 'Santri', data: perLembaga.map((r) => num(r.value)), backgroundColor: perLembaga.map((_, i) => COLORS[i % COLORS.length]) }]
        }
      : null
    chartMukim.value = mukim.length
      ? {
          labels: mukim.map((r) => r.label),
          datasets: [{ data: mukim.map((r) => num(r.value)), backgroundColor: ['#10b981', '#94a3b8'] }]
        }
      : null
  } catch (e) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
}

// ---- Keuangan ----
const nowYear = new Date().getFullYear()
const year = ref(nowYear)
const years = Array.from({ length: 5 }, (_, i) => nowYear - i)
const ringkas = ref({ masuk: 0, keluar: 0 })
const chartBulanan = ref(null)
const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

async function loadKeuangan() {
  loading.value = true
  error.value = ''
  try {
    const [ringkasRows, bulananRows] = await Promise.all([
      analyticsQuery('keuangan_ringkas'),
      analyticsQuery('keuangan_bulanan', { year: year.value })
    ])
    const r = ringkasRows[0] || {}
    ringkas.value = { masuk: num(r.masuk), keluar: num(r.keluar) }
    chartBulanan.value = bulananRows.length
      ? {
          labels: bulananRows.map((b) => {
            const m = String(b.bulan || '').match(/-(\d{2})$/)
            return m ? BULAN[parseInt(m[1], 10) - 1] : b.bulan
          }),
          datasets: [
            { label: 'Masuk', data: bulananRows.map((b) => num(b.masuk)), backgroundColor: '#10b981' },
            { label: 'Keluar', data: bulananRows.map((b) => num(b.keluar)), backgroundColor: '#ef4444' }
          ]
        }
      : null
  } catch (e) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
}

function setTab(id) {
  tab.value = id
  if (id === 'santri') loadSantri()
  else loadKeuangan()
}

onMounted(loadSantri)

// ---- Chart options ----
const optBar = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { x: { ticks: { font: { size: 9 } } }, y: { beginAtZero: true, ticks: { font: { size: 9 }, precision: 0 } } }
}
const optDoughnut = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, boxWidth: 12 } } }
}
const optCurrency = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 10 } },
    tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: Rp ${new Intl.NumberFormat('id-ID').format(ctx.parsed.y)}` } }
  },
  scales: {
    x: { ticks: { font: { size: 9 } } },
    y: { beginAtZero: true, ticks: { font: { size: 9 }, callback: (v) => 'Rp ' + new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(v) } }
  }
}
</script>
