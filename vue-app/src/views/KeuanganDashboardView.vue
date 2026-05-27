<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div v-if="!isFullAccess" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-rose-300 text-center">
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">Akses Keuangan terbatas</p>
      <p class="text-xs text-[var(--text-secondary)] mt-1">Hanya admin keuangan atau super admin.</p>
    </div>

    <template v-else>
      <!-- Header -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h1 class="text-xl md:text-2xl font-black text-[var(--text-primary)]">
          <i class="fas fa-chart-line text-teal-500 mr-2"></i>Dashboard Keuangan
        </h1>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">Overview keuangan pondok realtime + tren 12 bulan</p>
      </div>

      <!-- v.72.15.0526: 7 Quick Actions (+ Hutang Piutang baru) -->
      <div class="grid grid-cols-4 md:grid-cols-7 gap-2 md:gap-3">
        <router-link to="/pos-santri" class="group relative overflow-hidden bg-gradient-to-br from-rose-500 dark:from-rose-700 to-rose-700 dark:to-rose-900 rounded-xl p-2.5 md:p-3 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center gap-1 text-center">
          <i class="fas fa-cash-register text-base md:text-lg drop-shadow"></i>
          <p class="text-[10px] md:text-xs font-black leading-tight drop-shadow-sm">POS Santri</p>
        </router-link>
        <router-link to="/tabungan" class="group relative overflow-hidden bg-gradient-to-br from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900 rounded-xl p-2.5 md:p-3 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center gap-1 text-center">
          <i class="fas fa-piggy-bank text-base md:text-lg drop-shadow"></i>
          <p class="text-[10px] md:text-xs font-black leading-tight drop-shadow-sm">Tabungan</p>
        </router-link>
        <router-link to="/bisyaroh" class="group relative overflow-hidden bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 rounded-xl p-2.5 md:p-3 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center gap-1 text-center">
          <i class="fas fa-hand-holding-usd text-base md:text-lg drop-shadow"></i>
          <p class="text-[10px] md:text-xs font-black leading-tight drop-shadow-sm">Bisyaroh Guru</p>
        </router-link>
        <router-link to="/buku-induk" class="group relative overflow-hidden bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 rounded-xl p-2.5 md:p-3 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center gap-1 text-center">
          <i class="fas fa-book text-base md:text-lg drop-shadow"></i>
          <p class="text-[10px] md:text-xs font-black leading-tight drop-shadow-sm">Buku Induk</p>
        </router-link>
        <router-link to="/laporan-keuangan" class="group relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] rounded-xl p-2.5 md:p-3 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center gap-1 text-center">
          <i class="fas fa-chart-bar text-base md:text-lg drop-shadow"></i>
          <p class="text-[10px] md:text-xs font-black leading-tight drop-shadow-sm">Laporan & Chart</p>
        </router-link>
        <router-link to="/hutang-piutang" class="group relative overflow-hidden bg-gradient-to-br from-rose-500 dark:from-rose-700 to-rose-700 dark:to-rose-900 rounded-xl p-2.5 md:p-3 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center gap-1 text-center">
          <i class="fas fa-handshake text-base md:text-lg drop-shadow"></i>
          <p class="text-[10px] md:text-xs font-black leading-tight drop-shadow-sm">Hutang Piutang</p>
        </router-link>
        <router-link to="/keu-pengaturan" class="group relative overflow-hidden bg-gradient-to-br from-slate-500 to-slate-700 rounded-xl p-2.5 md:p-3 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center gap-1 text-center">
          <i class="fas fa-sliders-h text-base md:text-lg drop-shadow"></i>
          <p class="text-[10px] md:text-xs font-black leading-tight drop-shadow-sm">Pengaturan</p>
        </router-link>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <router-link to="/tagihan" class="block bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition">
          <p class="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider">Tagihan Aktif</p>
          <p class="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{{ stats.tagihanCount }}</p>
          <p class="text-[11px] text-[var(--text-secondary)] mt-1 font-bold">{{ fmtRp(stats.totalTagihan) }}</p>
        </router-link>
        <router-link to="/tabungan" class="block bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition">
          <p class="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider">Tabungan Santri</p>
          <p class="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{{ tabunganSantri.length }}</p>
          <p class="text-[11px] text-[var(--text-secondary)] mt-1 font-bold">{{ fmtRp(stats.totalTabunganSantri) }}</p>
        </router-link>
        <router-link to="/bisyaroh" class="block bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition">
          <p class="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider">Slip Bisyaroh</p>
          <p class="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-1">{{ gaji.length }}</p>
          <p class="text-[11px] text-[var(--text-secondary)] mt-1 font-bold">{{ fmtRp(stats.totalBisyarohBulan) }}</p>
        </router-link>
        <router-link to="/buku-induk" class="block bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition">
          <p class="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider">Buku Induk</p>
          <p class="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-1">{{ bukuInduk.length }}</p>
          <p class="text-[11px] text-[var(--text-secondary)] mt-1 font-bold">entries</p>
        </router-link>
      </div>

      <!-- v.72.5: Charts row — Pemasukan vs Pengeluaran 12 bulan + Saldo Berjalan -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Bar chart Pemasukan vs Pengeluaran 12 bulan -->
        <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
          <h3 class="text-sm font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-2">
            <i class="fas fa-chart-column text-emerald-500 mr-1"></i>Pemasukan vs Pengeluaran (12 Bulan)
          </h3>
          <div class="flex gap-3 text-[10px] font-bold mb-1">
            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-emerald-500 inline-block"></span>Pemasukan</span>
            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-rose-500 inline-block"></span>Pengeluaran</span>
          </div>
          <svg width="100%" height="220" viewBox="0 0 600 220" preserveAspectRatio="none" class="block">
            <g v-for="(line, i) in barGrid" :key="`g-${i}`">
              <line :x1="40" :y1="line.y" x2="595" :y2="line.y" stroke="#e2e8f0" stroke-dasharray="3,3" />
              <text :x="35" :y="line.y + 4" text-anchor="end" font-size="9" fill="#64748b">{{ line.label }}</text>
            </g>
            <g v-for="(b, i) in bar12" :key="`b-${i}`">
              <rect :x="b.x" :y="b.yMasuk" :width="b.w / 2 - 1" :height="b.hMasuk" fill="#10b981" rx="2" />
              <rect :x="b.x + b.w / 2 + 1" :y="b.yKeluar" :width="b.w / 2 - 1" :height="b.hKeluar" fill="#f43f5e" rx="2" />
              <text :x="b.x + b.w / 2" y="215" text-anchor="middle" font-size="9" fill="#64748b">{{ b.label }}</text>
            </g>
          </svg>
        </div>

        <!-- Line chart Saldo Berjalan -->
        <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
          <h3 class="text-sm font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-2">
            <i class="fas fa-chart-line text-cyan-500 mr-1"></i>Saldo Berjalan Bulanan
          </h3>
          <p class="text-[10px] text-[var(--text-secondary)] mb-1">Saldo: {{ fmtRp(saldoData.last) }}</p>
          <svg width="100%" height="220" viewBox="0 0 600 220" preserveAspectRatio="none" class="block">
            <g v-for="(line, i) in saldoGrid" :key="`sg-${i}`">
              <line :x1="50" :y1="line.y" x2="595" :y2="line.y" stroke="#e2e8f0" stroke-dasharray="3,3" />
              <text :x="45" :y="line.y + 4" text-anchor="end" font-size="9" fill="#64748b">{{ line.label }}</text>
            </g>
            <polyline :points="saldoData.pathPoints" fill="none" stroke="#3b82f6" stroke-width="2" />
            <polyline :points="saldoData.fillPoints" fill="#3b82f6" fill-opacity="0.1" stroke="none" />
            <g v-for="(p, i) in saldoData.points" :key="`sp-${i}`">
              <circle :cx="p.x" :cy="p.y" r="3" fill="#3b82f6" />
              <text :x="p.x" y="215" text-anchor="middle" font-size="9" fill="#64748b">{{ p.label }}</text>
            </g>
          </svg>
        </div>
      </div>

      <!-- v.72.5: Breakdown Kategori Pengeluaran (Bulan Ini) -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-sm font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3">
          <i class="fas fa-chart-pie text-rose-500 mr-1"></i>Breakdown Kategori Pengeluaran (Bulan Ini)
        </h3>
        <div v-if="kategoriBulanIni.length === 0" class="text-center py-6 text-xs text-[var(--text-tertiary)] italic">
          Belum ada pengeluaran bulan ini.
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <!-- Donut chart SVG -->
          <div class="flex justify-center">
            <svg viewBox="0 0 220 220" width="220" height="220" class="block">
              <g v-for="(slice, i) in donutSlices" :key="`d-${i}`">
                <path :d="slice.path" :fill="slice.color" />
              </g>
              <circle cx="110" cy="110" r="50" fill="white" class="dark:fill-slate-800" />
              <text x="110" y="105" text-anchor="middle" font-size="10" fill="#64748b">Total</text>
              <text x="110" y="120" text-anchor="middle" font-size="14" font-weight="bold" fill="#0f172a">{{ fmtRp(totalKategori) }}</text>
            </svg>
          </div>
          <!-- Legend -->
          <div class="space-y-1.5">
            <div v-for="(k, i) in kategoriBulanIni" :key="k.nama" class="flex items-center gap-2">
              <span :style="{ background: PALETTE[i % PALETTE.length] }" class="w-3 h-3 rounded inline-block flex-shrink-0"></span>
              <p class="text-xs font-bold text-[var(--text-primary)] flex-1 truncate">{{ k.nama }}</p>
              <p class="text-xs font-black text-[var(--text-primary)]">{{ fmtRp(k.total) }}</p>
              <p class="text-[10px] text-[var(--text-secondary)] w-10 text-right">{{ k.pct }}%</p>
            </div>
          </div>
        </div>
      </div>

    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useKeuangan } from '@/composables/useKeuangan'
import { fmtRp } from '@/utils/format'
const { tabunganSantri, gaji, bukuInduk, stats, isFullAccess } = useKeuangan()

const NAMA_BULAN_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const PALETTE = ['#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#06b6d4', '#84cc16', '#f97316']

// 12 month range ending current month
const months12 = computed(() => {
  const now = new Date()
  const arr = []
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    arr.push({
      year: d.getFullYear(),
      month: d.getMonth(),
      label: NAMA_BULAN_SHORT[d.getMonth()] + ' ' + String(d.getFullYear()).slice(-2)
    })
  }
  return arr
})

const monthlyData = computed(() => {
  return months12.value.map((m) => {
    let masuk = 0
    let keluar = 0
    for (const t of bukuInduk.value) {
      const td = t.tanggal ? new Date(t.tanggal) : null
      if (!td || td.getFullYear() !== m.year || td.getMonth() !== m.month) continue
      const n = Number(t.nominal) || 0
      if (t.tipe === 'masuk' || t.type === 'masuk') masuk += n
      else if (t.tipe === 'keluar' || t.type === 'keluar') keluar += n
    }
    return { ...m, masuk, keluar }
  })
})

const bar12 = computed(() => {
  const data = monthlyData.value
  const max = Math.max(1, ...data.map((d) => Math.max(d.masuk, d.keluar)))
  const w = 600 - 50
  const bw = w / data.length
  return data.map((d, i) => {
    const hMasuk = (d.masuk / max) * 180
    const hKeluar = (d.keluar / max) * 180
    return {
      x: 45 + i * bw,
      w: bw - 4,
      yMasuk: 195 - hMasuk,
      hMasuk,
      yKeluar: 195 - hKeluar,
      hKeluar,
      label: d.label
    }
  })
})

const barGrid = computed(() => {
  const max = Math.max(1, ...monthlyData.value.map((d) => Math.max(d.masuk, d.keluar)))
  const steps = 4
  const arr = []
  for (let i = 0; i <= steps; i++) {
    const v = (max / steps) * (steps - i)
    arr.push({ y: 15 + i * 45, label: 'Rp ' + Math.round(v / 1000) + 'k' })
  }
  return arr
})

const saldoData = computed(() => {
  let cum = 0
  const data = monthlyData.value.map((m) => {
    cum += m.masuk - m.keluar
    return { ...m, saldo: cum }
  })
  const min = Math.min(0, ...data.map((d) => d.saldo))
  const max = Math.max(0, ...data.map((d) => d.saldo))
  const range = max - min || 1
  const w = 600 - 60
  const step = data.length > 1 ? w / (data.length - 1) : w
  const yZero = 195 - ((-min) / range) * 180
  const points = data.map((d, i) => ({
    x: 55 + i * step,
    y: 195 - ((d.saldo - min) / range) * 180,
    label: d.label
  }))
  const pathPoints = points.map((p) => `${p.x},${p.y}`).join(' ')
  const fillPoints = `${points[0]?.x || 55},${yZero} ${pathPoints} ${points[points.length - 1]?.x || 595},${yZero}`
  return {
    points,
    pathPoints,
    fillPoints,
    last: data[data.length - 1]?.saldo || 0,
    yZero
  }
})

const saldoGrid = computed(() => {
  const min = Math.min(0, ...monthlyData.value.reduce((acc, m) => { acc.push(acc[acc.length - 1] + m.masuk - m.keluar); return acc }, [0]))
  const max = Math.max(0, ...monthlyData.value.reduce((acc, m) => { acc.push(acc[acc.length - 1] + m.masuk - m.keluar); return acc }, [0]))
  const range = max - min || 1
  const steps = 4
  const arr = []
  for (let i = 0; i <= steps; i++) {
    const v = max - (range / steps) * i
    arr.push({ y: 15 + i * 45, label: 'Rp ' + Math.round(v / 1000) + 'k' })
  }
  return arr
})

const kategoriBulanIni = computed(() => {
  const now = new Date()
  const groups = {}
  let total = 0
  for (const t of bukuInduk.value) {
    const td = t.tanggal ? new Date(t.tanggal) : null
    if (!td || td.getFullYear() !== now.getFullYear() || td.getMonth() !== now.getMonth()) continue
    if (t.tipe !== 'keluar' && t.type !== 'keluar') continue
    const kat = t.kategori || '(Tanpa Kategori)'
    const n = Number(t.nominal) || 0
    groups[kat] = (groups[kat] || 0) + n
    total += n
  }
  return Object.entries(groups)
    .map(([nama, val]) => ({ nama, total: val, pct: total > 0 ? Math.round((val / total) * 100) : 0 }))
    .sort((a, b) => b.total - a.total)
})

const totalKategori = computed(() => kategoriBulanIni.value.reduce((s, k) => s + k.total, 0))

const donutSlices = computed(() => {
  const data = kategoriBulanIni.value
  if (data.length === 0) return []
  const total = totalKategori.value || 1
  const cx = 110
  const cy = 110
  const r = 90
  let startAngle = -Math.PI / 2
  return data.map((k, i) => {
    const angle = (k.total / total) * Math.PI * 2
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(startAngle + angle)
    const y2 = cy + r * Math.sin(startAngle + angle)
    const large = angle > Math.PI ? 1 : 0
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
    startAngle += angle
    return { path, color: PALETTE[i % PALETTE.length] }
  })
})
</script>
