<template>
  <!-- v.102 A3: Laporan/Analitik (sumber: Supabase RPC analytics_query, F9).
       v.110: bisa di-embed di Dasbor Statistik (prop embedded → sembunyikan header & tab
       internal; tab dikontrol parent via activeTab). -->
  <div :class="['max-w-6xl mx-auto space-y-4', embedded ? 'px-3 md:px-5 pb-5' : 'p-3 md:p-5']">
    <div v-if="!embedded">
      <h1 class="text-xl md:text-2xl font-black text-[var(--text-primary)]">
        <i class="fas fa-chart-bar text-teal-600 mr-2"></i>Laporan &amp; Analitik
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        Ringkasan data lintas waktu — diperbarui beberapa saat setelah data berubah.
      </p>
    </div>

    <!-- Tabs (disembunyikan saat embedded — tab dikontrol Dasbor Statistik) -->
    <div v-if="!embedded" class="flex gap-2 flex-wrap">
      <button
        v-for="t in tabs"
        :key="t.id"
        @click="setTab(t.id)"
        class="px-4 py-2 rounded-xl text-sm font-bold transition"
        :class="
          tab === t.id
            ? 'bg-teal-600 text-white shadow'
            : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
        "
      >
        <i :class="['fas', t.icon, 'mr-1']"></i>{{ t.label }}
      </button>
    </div>

    <!-- Year selector (tab yang pakai periode) -->
    <div v-if="usesYear" class="flex items-center gap-2">
      <label class="text-xs font-bold text-[var(--text-secondary)]">Tahun</label>
      <select
        v-model.number="year"
        @change="reloadActive"
        class="px-3 py-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] text-sm"
      >
        <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
      </select>
    </div>

    <div
      v-if="error"
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-sm text-red-700 dark:text-red-300"
    >
      <i class="fas fa-triangle-exclamation mr-1"></i>{{ error }}
    </div>
    <div
      v-if="loading"
      class="flex items-center justify-center py-16 text-[var(--text-tertiary)] text-sm"
    >
      <i class="fas fa-spinner fa-spin mr-2"></i>Memuat laporan…
    </div>

    <!-- ===== SANTRI ===== -->
    <!-- v.103: KPI ringkas dipindah ke dasbor (/statistik). Di sini chart BigQuery + breakdown lembaga. -->
    <div v-show="!loading && tab === 'santri'" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div :class="cardCls">
        <h3 :class="titleCls">
          <i class="fas fa-users text-teal-600 mr-1"></i>Santri Aktif per Lembaga
        </h3>
        <div class="relative h-72">
          <Bar v-if="cSantriLembaga" :data="cSantriLembaga" :options="optBar" />
          <div v-else :class="emptyCls">Belum ada data</div>
        </div>
      </div>
      <div :class="cardCls">
        <h3 :class="titleCls"><i class="fas fa-house text-teal-600 mr-1"></i>Mukim vs Non-mukim</h3>
        <div class="relative h-72">
          <Doughnut v-if="cSantriMukim" :data="cSantriMukim" :options="optDoughnut" />
          <div v-else :class="emptyCls">Belum ada data</div>
        </div>
      </div>
    </div>
    <!-- v.103: breakdown per-lembaga (grid + distribusi bar) di BAWAH chart -->
    <RingkasanSantriLembaga section="lembaga" v-show="tab === 'santri'" />

    <!-- ===== KEUANGAN ===== -->
    <div v-show="!loading && tab === 'keuangan'" class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div
          class="rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20"
        >
          <div
            class="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400"
          >
            Total Masuk
          </div>
          <div class="text-lg font-black text-emerald-700 dark:text-emerald-300 mt-1">
            {{ rupiah(ringkas.masuk) }}
          </div>
        </div>
        <div
          class="rounded-2xl p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
        >
          <div
            class="text-[10px] font-black uppercase tracking-wider text-red-700 dark:text-red-400"
          >
            Total Keluar
          </div>
          <div class="text-lg font-black text-red-700 dark:text-red-300 mt-1">
            {{ rupiah(ringkas.keluar) }}
          </div>
        </div>
        <div
          class="rounded-2xl p-4 border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20"
        >
          <div
            class="text-[10px] font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-400"
          >
            Saldo
          </div>
          <div class="text-lg font-black text-cyan-700 dark:text-cyan-300 mt-1">
            {{ rupiah(ringkas.masuk - ringkas.keluar) }}
          </div>
        </div>
      </div>
      <div :class="cardCls">
        <h3 :class="titleCls">
          <i class="fas fa-coins text-cyan-600 mr-1"></i>Arus Kas per Bulan ({{ year }})
        </h3>
        <div class="relative h-80">
          <Line v-if="cKeuBulanan" :data="cKeuBulanan" :options="optCurrency" />
          <div v-else :class="emptyCls">Belum ada transaksi tahun ini</div>
        </div>
      </div>
    </div>

    <!-- ===== AKADEMIK ===== -->
    <div v-show="!loading && tab === 'akademik'" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div :class="cardCls">
        <h3 :class="titleCls">
          <i class="fas fa-clipboard-check text-teal-600 mr-1"></i>Status Tes Kenaikan
        </h3>
        <div class="relative h-72">
          <Doughnut v-if="cTesStatus" :data="cTesStatus" :options="optDoughnut" />
          <div v-else :class="emptyCls">Belum ada data</div>
        </div>
      </div>
    </div>
    <!-- v.103: distribusi capaian prestasi (PTPT & PPPH) realtime + ekspor -->
    <DistribusiPrestasi v-show="tab === 'akademik'" />

    <!-- ===== ABSENSI ===== -->
    <div v-show="!loading && tab === 'absensi'" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div :class="cardCls">
        <h3 :class="titleCls">
          <i class="fas fa-book-quran text-teal-600 mr-1"></i>Absensi Ngaji per Bulan ({{ year }})
        </h3>
        <div class="relative h-80">
          <Line v-if="cAbsNgaji" :data="cAbsNgaji" :options="optLineCount" />
          <div v-else :class="emptyCls">Belum ada data</div>
        </div>
      </div>
      <div :class="cardCls">
        <h3 :class="titleCls">
          <i class="fas fa-school text-teal-600 mr-1"></i>Absensi Sekolah per Bulan ({{ year }})
        </h3>
        <div class="relative h-80">
          <Line v-if="cAbsSekolah" :data="cAbsSekolah" :options="optLineCount" />
          <div v-else :class="emptyCls">Belum ada data</div>
        </div>
      </div>
    </div>

    <!-- ===== PEGAWAI ===== -->
    <!-- v.103: alert operasional realtime (Guru Belum Input + Kelas Overload) di ATAS chart -->
    <OperasionalGuru v-show="tab === 'pegawai'" />
    <div v-show="!loading && tab === 'pegawai'" class="space-y-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div :class="cardCls">
          <h3 :class="titleCls">
            <i class="fas fa-chalkboard-teacher text-teal-600 mr-1"></i>Pegawai per Lembaga
          </h3>
          <div class="relative h-72">
            <Bar v-if="cPegLembaga" :data="cPegLembaga" :options="optBar" />
            <div v-else :class="emptyCls">Belum ada data</div>
          </div>
        </div>
      </div>
      <div :class="cardCls">
        <h3 :class="titleCls">
          <i class="fas fa-hand-holding-usd text-teal-600 mr-1"></i>Bisyaroh Bersih per Bulan ({{
            year
          }})
        </h3>
        <div class="relative h-72">
          <Line v-if="cGajiBulanan" :data="cGajiBulanan" :options="optCurrency" />
          <div v-else :class="emptyCls">Belum ada data</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Bar, Doughnut, Line } from 'vue-chartjs'
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
import { analyticsQuery } from '@/services/analytics'
// v.103 "rapikan dashboard": section non-grafik admin dari StatistikView dilebur ke
// tab terkait (Firestore-realtime, terpisah dari gate loading BigQuery di bawah).
import RingkasanSantriLembaga from '@/components/statistik/RingkasanSantriLembaga.vue'
import DistribusiPrestasi from '@/components/statistik/DistribusiPrestasi.vue'
import OperasionalGuru from '@/components/statistik/OperasionalGuru.vue'

ChartJS.register(
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
)

// v.110: bisa di-embed di Dasbor Statistik (tab dikontrol parent via activeTab).
const props = defineProps({
  embedded: { type: Boolean, default: false },
  activeTab: { type: String, default: '' }
})

const tabs = [
  { id: 'santri', label: 'Santri', icon: 'fa-users' },
  { id: 'keuangan', label: 'Keuangan', icon: 'fa-coins' },
  { id: 'akademik', label: 'Akademik', icon: 'fa-graduation-cap' },
  { id: 'absensi', label: 'Absensi', icon: 'fa-clipboard-user' },
  { id: 'pegawai', label: 'Pegawai', icon: 'fa-chalkboard-teacher' }
]
const tab = ref(props.embedded && props.activeTab ? props.activeTab : 'santri')
const loading = ref(false)
const error = ref('')
const usesYear = computed(() => ['keuangan', 'absensi', 'pegawai'].includes(tab.value))

const nowYear = new Date().getFullYear()
const year = ref(nowYear)
const years = Array.from({ length: 5 }, (_, i) => nowYear - i)

// styling helpers
const cardCls = 'bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm'
const titleCls = 'text-xs font-black uppercase tracking-wider text-[var(--text-primary)] mb-3'
const emptyCls =
  'absolute inset-0 flex items-center justify-center text-xs text-[var(--text-tertiary)] italic'

const COLORS = [
  '#10b981',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#f59e0b',
  '#ef4444',
  '#84cc16'
]
const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const num = (v) => Number(v) || 0
const rupiah = (v) => 'Rp ' + new Intl.NumberFormat('id-ID').format(num(v))
const monthLabel = (p) => {
  const m = String(p || '').match(/-(\d{2})$/)
  return m ? BULAN[parseInt(m[1], 10) - 1] : p
}
const catChart = (rows, colorOne) =>
  rows.length
    ? {
        labels: rows.map((r) => r.label),
        datasets: [
          {
            label: 'Jumlah',
            data: rows.map((r) => num(r.value)),
            backgroundColor: colorOne || rows.map((_, i) => COLORS[i % COLORS.length])
          }
        ]
      }
    : null
// v.103: dataset bergaya LINE (chart per-bulan di Laporan jadi line, sesuai req kyai)
const lineDs = (label, data, color, fill = false) => ({
  label,
  data,
  borderColor: color,
  backgroundColor: fill ? color + '26' : color, // 26 = ~15% alpha (8-digit hex)
  tension: 0.3,
  fill,
  borderWidth: 2,
  pointRadius: 2,
  pointBackgroundColor: color
})
const absChart = (rows) =>
  rows.length
    ? {
        labels: rows.map((r) => monthLabel(r.bulan)),
        datasets: [
          lineDs(
            'Hadir',
            rows.map((r) => num(r.hadir)),
            '#10b981'
          ),
          lineDs(
            'Sakit',
            rows.map((r) => num(r.sakit)),
            '#f59e0b'
          ),
          lineDs(
            'Izin',
            rows.map((r) => num(r.izin)),
            '#3b82f6'
          ),
          lineDs(
            'Alpa',
            rows.map((r) => num(r.alpa)),
            '#ef4444'
          )
        ]
      }
    : null

// chart refs
const cSantriLembaga = ref(null),
  cSantriMukim = ref(null)
const ringkas = ref({ masuk: 0, keluar: 0 }),
  cKeuBulanan = ref(null)
const cTesStatus = ref(null)
const cAbsNgaji = ref(null),
  cAbsSekolah = ref(null)
const cPegLembaga = ref(null),
  cGajiBulanan = ref(null)

async function run(fn) {
  loading.value = true
  error.value = ''
  try {
    await fn()
  } catch (e) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
}

const loadSantri = () =>
  run(async () => {
    const [a, b] = await Promise.all([
      analyticsQuery('santri_per_lembaga'),
      analyticsQuery('santri_mukim')
    ])
    cSantriLembaga.value = catChart(a)
    cSantriMukim.value = b.length
      ? {
          labels: b.map((r) => r.label),
          datasets: [{ data: b.map((r) => num(r.value)), backgroundColor: ['#10b981', '#94a3b8'] }]
        }
      : null
  })
const loadKeuangan = () =>
  run(async () => {
    const [r, m] = await Promise.all([
      analyticsQuery('keuangan_ringkas'),
      analyticsQuery('keuangan_bulanan', { year: year.value })
    ])
    const x = r[0] || {}
    ringkas.value = { masuk: num(x.masuk), keluar: num(x.keluar) }
    cKeuBulanan.value = m.length
      ? {
          labels: m.map((b) => monthLabel(b.bulan)),
          datasets: [
            lineDs(
              'Masuk',
              m.map((b) => num(b.masuk)),
              '#10b981',
              true
            ),
            lineDs(
              'Keluar',
              m.map((b) => num(b.keluar)),
              '#ef4444',
              true
            )
          ]
        }
      : null
  })
const loadAkademik = () =>
  run(async () => {
    const t = await analyticsQuery('akademik_tes_status')
    cTesStatus.value = t.length
      ? {
          labels: t.map((x) => x.label),
          datasets: [{ data: t.map((x) => num(x.value)), backgroundColor: COLORS }]
        }
      : null
  })
const loadAbsensi = () =>
  run(async () => {
    const [n, s] = await Promise.all([
      analyticsQuery('absensi_ngaji_bulanan', { year: year.value }),
      analyticsQuery('absensi_sekolah_bulanan', { year: year.value })
    ])
    cAbsNgaji.value = absChart(n)
    cAbsSekolah.value = absChart(s)
  })
const loadPegawai = () =>
  run(async () => {
    const [l, g] = await Promise.all([
      analyticsQuery('pegawai_per_lembaga'),
      analyticsQuery('pegawai_gaji_bulanan', { year: year.value })
    ])
    cPegLembaga.value = catChart(l)
    cGajiBulanan.value = g.length
      ? {
          labels: g.map((b) => monthLabel(b.bulan)),
          datasets: [
            lineDs(
              'Bisyaroh Bersih',
              g.map((b) => num(b.bersih)),
              '#06b6d4',
              true
            )
          ]
        }
      : null
  })

const LOADERS = {
  santri: loadSantri,
  keuangan: loadKeuangan,
  akademik: loadAkademik,
  absensi: loadAbsensi,
  pegawai: loadPegawai
}
function setTab(id) {
  tab.value = id
  LOADERS[id]()
}
function reloadActive() {
  LOADERS[tab.value]()
}
onMounted(() => {
  if (props.embedded) {
    if (props.activeTab) setTab(props.activeTab)
  } else {
    loadSantri()
  }
})
// Parent (Dasbor Statistik) ganti tab → muat ulang data tab itu.
watch(
  () => props.activeTab,
  (v) => {
    if (props.embedded && v && v !== tab.value) setTab(v)
  }
)

// chart options
const optBar = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { font: { size: 9 } } },
    y: { beginAtZero: true, ticks: { font: { size: 9 }, precision: 0 } }
  }
}
const optDoughnut = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, boxWidth: 12 } } }
}
// v.103: absensi per-bulan jadi multi-line (bukan stacked bar lagi)
const optLineCount = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 10 } } },
  scales: {
    x: { ticks: { font: { size: 9 } }, grid: { display: false } },
    y: {
      beginAtZero: true,
      ticks: { font: { size: 9 }, precision: 0 },
      grid: { color: 'rgba(136,135,128,0.15)' }
    }
  }
}
const optCurrency = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 10 } },
    tooltip: {
      callbacks: {
        label: (ctx) =>
          `${ctx.dataset.label}: Rp ${new Intl.NumberFormat('id-ID').format(ctx.parsed.y)}`
      }
    }
  },
  scales: {
    x: { ticks: { font: { size: 9 } } },
    y: {
      beginAtZero: true,
      ticks: {
        font: { size: 9 },
        callback: (v) => 'Rp ' + new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(v)
      }
    }
  }
}
</script>
