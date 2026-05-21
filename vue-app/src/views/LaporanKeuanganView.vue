<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div v-if="!isFullAccess" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center">
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Akses terbatas</p>
    </div>

    <template v-else>
      <!-- Header -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
              <i class="fas fa-chart-bar text-indigo-500 mr-2"></i>Laporan Keuangan
            </h1>
            <p class="text-xs text-slate-500 mt-0.5">Analisis arus kas tahun {{ selectedYear }}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <select v-model.number="selectedYear" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-emerald-200 shadow-sm">
          <p class="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Total Pemasukan {{ selectedYear }}</p>
          <p class="text-2xl md:text-3xl font-black text-emerald-700 mt-1">{{ fmtRp(yearStats.pemasukan) }}</p>
          <p class="text-[10px] text-slate-500 mt-1">{{ yearStats.countMasuk }} transaksi</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-rose-200 shadow-sm">
          <p class="text-[10px] uppercase font-bold text-rose-600 tracking-wider">Total Pengeluaran {{ selectedYear }}</p>
          <p class="text-2xl md:text-3xl font-black text-rose-700 mt-1">{{ fmtRp(yearStats.pengeluaran) }}</p>
          <p class="text-[10px] text-slate-500 mt-1">{{ yearStats.countKeluar }} transaksi</p>
        </div>
        <div :class="['bg-white dark:bg-slate-800 p-4 rounded-2xl border shadow-sm', yearStats.saldo >= 0 ? 'border-teal-300' : 'border-rose-400']">
          <p :class="['text-[10px] uppercase font-bold tracking-wider', yearStats.saldo >= 0 ? 'text-teal-600' : 'text-rose-600']">
            Saldo Bersih {{ selectedYear }}
          </p>
          <p :class="['text-2xl md:text-3xl font-black mt-1', yearStats.saldo >= 0 ? 'text-teal-700' : 'text-rose-700']">
            {{ fmtRp(yearStats.saldo) }}
          </p>
          <p class="text-[10px] text-slate-500 mt-1">
            <i :class="yearStats.saldo >= 0 ? 'fas fa-arrow-up text-teal-500' : 'fas fa-arrow-down text-rose-500'" class="mr-1"></i>
            {{ yearStats.saldo >= 0 ? 'Surplus' : 'Defisit' }}
          </p>
        </div>
      </div>

      <!-- Monthly trend chart -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 class="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-3">
          <i class="fas fa-chart-line text-indigo-500 mr-1"></i>Tren Bulanan {{ selectedYear }}
        </h3>
        <!-- SVG Bar Chart -->
        <div class="overflow-x-auto">
          <svg :width="chartWidth" height="280" class="block min-w-full">
            <!-- Y-axis grid lines -->
            <g v-for="(line, i) in yGridLines" :key="`grid-${i}`">
              <line :x1="40" :y1="line.y" :x2="chartWidth - 20" :y2="line.y" stroke="#e2e8f0" stroke-dasharray="3,3" />
              <text :x="35" :y="line.y + 4" text-anchor="end" font-size="9" fill="#64748b">{{ line.label }}</text>
            </g>
            <!-- Bars per month -->
            <g v-for="(b, i) in barData" :key="`bar-${i}`">
              <!-- Pemasukan (emerald) -->
              <rect
                :x="b.x"
                :y="b.yMasuk"
                :width="barWidth / 2 - 2"
                :height="b.hMasuk"
                fill="#10b981"
                rx="2"
              />
              <!-- Pengeluaran (rose) -->
              <rect
                :x="b.x + barWidth / 2"
                :y="b.yKeluar"
                :width="barWidth / 2 - 2"
                :height="b.hKeluar"
                fill="#f43f5e"
                rx="2"
              />
              <!-- Month label -->
              <text :x="b.x + barWidth / 2" y="260" text-anchor="middle" font-size="10" fill="#475569" font-weight="bold">
                {{ b.label }}
              </text>
            </g>
            <!-- Legend -->
            <g transform="translate(50, 10)">
              <rect x="0" y="0" width="10" height="10" fill="#10b981" rx="2" />
              <text x="14" y="9" font-size="10" fill="#475569">Masuk</text>
              <rect x="60" y="0" width="10" height="10" fill="#f43f5e" rx="2" />
              <text x="74" y="9" font-size="10" fill="#475569">Keluar</text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Per kategori pie-like horizontal bars -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-emerald-200 shadow-sm">
          <h3 class="text-sm font-black text-emerald-700 uppercase tracking-wide mb-3">
            <i class="fas fa-arrow-down-to-line mr-1"></i>Pemasukan per Kategori
          </h3>
          <div v-if="kategoriMasuk.length === 0" class="text-xs text-slate-400 italic text-center py-4">
            Tidak ada data
          </div>
          <div v-else class="space-y-2">
            <div v-for="k in kategoriMasuk" :key="k.label" class="text-xs">
              <div class="flex justify-between mb-1">
                <span class="font-bold text-slate-700 dark:text-slate-300">{{ k.label }}</span>
                <span class="font-black text-emerald-700">{{ fmtRp(k.total) }}</span>
              </div>
              <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div :style="`width:${k.pct}%`" class="bg-emerald-500 h-full transition-all"></div>
              </div>
              <p class="text-[9px] text-slate-400 mt-0.5">{{ k.pct.toFixed(1) }}% · {{ k.count }} tx</p>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-rose-200 shadow-sm">
          <h3 class="text-sm font-black text-rose-700 uppercase tracking-wide mb-3">
            <i class="fas fa-arrow-up-from-line mr-1"></i>Pengeluaran per Kategori
          </h3>
          <div v-if="kategoriKeluar.length === 0" class="text-xs text-slate-400 italic text-center py-4">
            Tidak ada data
          </div>
          <div v-else class="space-y-2">
            <div v-for="k in kategoriKeluar" :key="k.label" class="text-xs">
              <div class="flex justify-between mb-1">
                <span class="font-bold text-slate-700 dark:text-slate-300">{{ k.label }}</span>
                <span class="font-black text-rose-700">{{ fmtRp(k.total) }}</span>
              </div>
              <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div :style="`width:${k.pct}%`" class="bg-rose-500 h-full transition-all"></div>
              </div>
              <p class="text-[9px] text-slate-400 mt-0.5">{{ k.pct.toFixed(1) }}% · {{ k.count }} tx</p>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-[10px] text-slate-400 pt-2">
        <i class="fas fa-circle-info mr-1"></i>Vue 3 · Phase 5.14b — Laporan Keuangan SVG charts
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { fmtRp } from '@/utils/format'

const BULAN_SHORT = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des']

const auth = useAuthStore()
const bukuRaw = ref([])
let unsub = null

const selectedYear = ref(new Date().getFullYear())

const isFullAccess = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return (
    s.role === 'admin' ||
    s.id === 'admin' ||
    ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
  )
})

const years = computed(() => {
  const now = new Date().getFullYear()
  return [now - 2, now - 1, now, now + 1]
})

// Data per year
const yearData = computed(() =>
  bukuRaw.value.filter((b) => String(b.tanggal || '').startsWith(String(selectedYear.value)))
)

const yearStats = computed(() => {
  let masuk = 0, keluar = 0, countMasuk = 0, countKeluar = 0
  for (const b of yearData.value) {
    if (b.tipe === 'masuk' || Number(b.masuk) > 0) {
      masuk += Number(b.masuk || b.nominal) || 0
      countMasuk++
    }
    if (b.tipe === 'keluar' || Number(b.keluar) > 0) {
      keluar += Number(b.keluar || b.nominal) || 0
      countKeluar++
    }
  }
  return { pemasukan: masuk, pengeluaran: keluar, saldo: masuk - keluar, countMasuk, countKeluar }
})

// Aggregate per month
const monthlyData = computed(() => {
  const months = Array(12).fill(null).map(() => ({ masuk: 0, keluar: 0 }))
  for (const b of yearData.value) {
    const m = Number(String(b.tanggal || '').substring(5, 7)) - 1
    if (m < 0 || m >= 12) continue
    if (b.tipe === 'masuk' || Number(b.masuk) > 0) {
      months[m].masuk += Number(b.masuk || b.nominal) || 0
    }
    if (b.tipe === 'keluar' || Number(b.keluar) > 0) {
      months[m].keluar += Number(b.keluar || b.nominal) || 0
    }
  }
  return months
})

// Chart dimensions
const chartWidth = computed(() => 12 * 50 + 60) // 12 months * 50px + 60px margin
const barWidth = 36 // per month bar group width

const maxValue = computed(() => {
  let max = 0
  for (const m of monthlyData.value) {
    if (m.masuk > max) max = m.masuk
    if (m.keluar > max) max = m.keluar
  }
  return max || 1
})

const yGridLines = computed(() => {
  const max = maxValue.value
  const steps = 4
  const lines = []
  for (let i = 0; i <= steps; i++) {
    const value = (max / steps) * i
    const y = 240 - (i / steps) * 200 // chart area y: 40 to 240
    lines.push({ y, label: fmtRpShort(value) })
  }
  return lines
})

const barData = computed(() => {
  const max = maxValue.value
  return monthlyData.value.map((m, i) => {
    const hMasuk = (m.masuk / max) * 200
    const hKeluar = (m.keluar / max) * 200
    return {
      label: BULAN_SHORT[i],
      x: 50 + i * 50,
      yMasuk: 240 - hMasuk,
      hMasuk,
      yKeluar: 240 - hKeluar,
      hKeluar
    }
  })
})

function fmtRpShort(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'jt'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'rb'
  return Math.round(n).toString()
}

// Aggregate per kategori
function aggregateKategori(data, tipe) {
  const map = {}
  for (const b of data) {
    const isThis =
      (tipe === 'masuk' && (b.tipe === 'masuk' || Number(b.masuk) > 0)) ||
      (tipe === 'keluar' && (b.tipe === 'keluar' || Number(b.keluar) > 0))
    if (!isThis) continue
    const kat = b.kategori || '(tanpa kategori)'
    if (!map[kat]) map[kat] = { label: kat, total: 0, count: 0 }
    map[kat].total += Number(b.masuk || b.keluar || b.nominal) || 0
    map[kat].count++
  }
  const arr = Object.values(map).sort((a, b) => b.total - a.total).slice(0, 8)
  const grand = arr.reduce((s, x) => s + x.total, 0) || 1
  for (const k of arr) k.pct = (k.total / grand) * 100
  return arr
}

const kategoriMasuk = computed(() => aggregateKategori(yearData.value, 'masuk'))
const kategoriKeluar = computed(() => aggregateKategori(yearData.value, 'keluar'))

onMounted(() => {
  unsub = subscribeColl('keuangan_buku_induk', (docs) => { bukuRaw.value = docs })
})
onUnmounted(() => {
  if (unsub) { try { unsub() } catch (e) {} }
})
</script>
