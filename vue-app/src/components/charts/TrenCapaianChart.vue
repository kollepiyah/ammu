<template>
  <!-- v.100c: Tren perkembangan capaian Qiraati (rata-rata halaman bertambah / bulan).
       Sumber: notif_prestasi (np_{santriId}_{YYYY-MM}, field total + periode). Reusable:
       StatistikView (guru/kepala, agregat) + CapaianPrestasiView (santri/wali, 1 anak). -->
  <div
    class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
  >
    <div class="flex items-center justify-between gap-2 mb-1">
      <h3
        class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest"
      >
        <i class="fas fa-chart-line text-teal-600 mr-2"></i>{{ title }}
      </h3>
      <span
        v-if="deltaLabel"
        :class="['text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0', deltaCls]"
      >
        <i :class="['fas mr-1', deltaIcon]"></i>{{ deltaLabel }}
      </span>
    </div>
    <p v-if="subtitle" class="text-[10px] text-[var(--text-secondary)] mb-2">{{ subtitle }}</p>
    <div class="relative h-56">
      <Line v-if="chartData" :data="chartData" :options="chartOptions" />
      <div
        v-else
        class="absolute inset-0 flex flex-col items-center justify-center text-center text-xs text-[var(--text-tertiary)] italic px-4"
      >
        <template v-if="loading">
          <i class="fas fa-spinner fa-spin mb-2"></i>Memuat tren…
        </template>
        <template v-else>
          <i class="fas fa-chart-line text-2xl mb-2 opacity-40"></i>
          Belum cukup data. Tren muncul setelah rekap prestasi terisi minimal 2 bulan.
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Filler
} from 'chart.js'
import { queryColl } from '@/services/db'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Filler
)

const props = defineProps({
  santriIds: { type: Array, default: () => [] },
  title: { type: String, default: 'Tren Capaian' },
  subtitle: { type: String, default: '' },
  months: { type: Number, default: 12 } // jumlah bulan terakhir yang ditampilkan
})

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

const loading = ref(false)
const rows = ref([]) // notif_prestasi: { santri_id, total, periode }

function parseNum(v) {
  const n = parseFloat(String(v ?? '').replace(/[^0-9.]/g, ''))
  return isNaN(n) ? null : n
}
function chunk(arr, n) {
  const out = []
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n))
  return out
}

async function fetchData() {
  const ids = [...new Set((props.santriIds || []).map((x) => String(x)).filter(Boolean))]
  if (ids.length === 0) {
    rows.value = []
    return
  }
  loading.value = true
  try {
    const all = []
    for (const part of chunk(ids, 10)) {
      const partRows = await queryColl('notif_prestasi', [['santri_id', 'in', part]])
      for (const r of partRows) all.push(r)
    }
    rows.value = all
  } catch (_e) {
    rows.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
watch(() => props.santriIds, fetchData, { deep: true })

// Agregat rata-rata capaian per periode (YYYY-MM), ambil N bulan terakhir.
const series = computed(() => {
  const byPeriode = {}
  for (const r of rows.value) {
    const p = String(r.periode || '')
    if (!/^\d{4}-\d{2}$/.test(p)) continue
    const n = parseNum(r.total)
    if (n == null) continue
    if (!byPeriode[p]) byPeriode[p] = { sum: 0, cnt: 0 }
    byPeriode[p].sum += n
    byPeriode[p].cnt++
  }
  const periods = Object.keys(byPeriode).sort()
  return periods.slice(-props.months).map((p) => {
    const [y, m] = p.split('-')
    return {
      periode: p,
      label: `${MONTHS[Number(m) - 1]} ${y.slice(2)}`,
      avg: Math.round((byPeriode[p].sum / byPeriode[p].cnt) * 10) / 10
    }
  })
})

const single = computed(() => props.santriIds.length === 1)

const chartData = computed(() => {
  if (series.value.length < 2) return null
  return {
    labels: series.value.map((s) => s.label),
    datasets: [
      {
        label: single.value ? 'Capaian / bulan' : 'Rata-rata capaian / bulan',
        data: series.value.map((s) => s.avg),
        borderColor: '#0F6E56',
        backgroundColor: 'rgba(29,158,117,0.14)',
        borderWidth: 2,
        tension: 0.35,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: '#0F6E56'
      }
    ]
  }
})

const delta = computed(() => {
  if (series.value.length < 2) return null
  return Math.round((series.value[series.value.length - 1].avg - series.value[0].avg) * 10) / 10
})
const deltaLabel = computed(() =>
  delta.value == null ? '' : `${delta.value >= 0 ? '+' : ''}${delta.value}`
)
const deltaUp = computed(() => (delta.value ?? 0) >= 0)
const deltaCls = computed(() =>
  deltaUp.value
    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
    : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
)
const deltaIcon = computed(() => (deltaUp.value ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { autoSkip: false, maxRotation: 45, font: { size: 9 } }, grid: { display: false } },
    y: {
      beginAtZero: true,
      ticks: { font: { size: 9 } },
      grid: { color: 'rgba(136,135,128,0.15)' }
    }
  }
}
</script>
