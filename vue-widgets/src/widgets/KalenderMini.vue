<script setup>
import { ref, computed, onMounted } from 'vue'
import { hitungPasaran, toArabicDigit, masehiToHijri } from '../utils/hijri'

const FONT_ARAB =
  "'Droid Arabic Naskh','Noto Naskh Arabic','Scheherazade New','Amiri','Traditional Arabic',serif"

const props = defineProps({
  kegiatan: { type: Array, default: () => [] }
})

const today = new Date()
const tahun = ref(today.getFullYear())
const bulan = ref(today.getMonth())

const namaBulan = [
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
const namaHari = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']

function prev() {
  if (bulan.value === 0) {
    bulan.value = 11
    tahun.value--
  } else bulan.value--
}
function next() {
  if (bulan.value === 11) {
    bulan.value = 0
    tahun.value++
  } else bulan.value++
}
function hariIni() {
  const n = new Date()
  tahun.value = n.getFullYear()
  bulan.value = n.getMonth()
}

const grid = computed(() => {
  const first = new Date(tahun.value, bulan.value, 1)
  const last = new Date(tahun.value, bulan.value + 1, 0)
  const cells = []
  for (let i = 0; i < first.getDay(); i++) cells.push(null)
  for (let d = 1; d <= last.getDate(); d++) cells.push(new Date(tahun.value, bulan.value, d))
  return cells
})

function isToday(d) {
  if (!d) return false
  const n = new Date()
  return (
    d.getDate() === n.getDate() &&
    d.getMonth() === n.getMonth() &&
    d.getFullYear() === n.getFullYear()
  )
}
function iso(d) {
  return d
    ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    : ''
}
function hijriArab(d) {
  return d ? toArabicDigit(masehiToHijri(d).day) : ''
}
function hasEvent(d) {
  if (!d) return false
  const dateStr = iso(d)
  return props.kegiatan.some(
    (k) => dateStr >= k.tgl_mulai && dateStr <= (k.tgl_akhir || k.tgl_mulai)
  )
}
function cellClass(d) {
  if (!d) return ''
  const classes = ['cell']
  if (isToday(d)) classes.push('cell-today')
  if (d.getDay() === 0) classes.push('cell-min')
  else if (d.getDay() === 5) classes.push('cell-jum')
  return classes.join(' ')
}

const judulBulan = computed(() => `${namaBulan[bulan.value]} ${tahun.value}`)
</script>

<template>
  <div class="ammu-kal">
    <div class="hdr">
      <div class="hdr-l">
        <button type="button" class="btn-nav" @click="prev">
          <i class="fas fa-chevron-left"></i>
        </button>
        <h3 class="judul">{{ judulBulan }}</h3>
        <button type="button" class="btn-nav" @click="next">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <button type="button" class="btn-today" @click="hariIni">Hari Ini</button>
    </div>
    <div class="grid-hari">
      <div
        v-for="(h, i) in namaHari"
        :key="h"
        :class="['hari', i === 0 ? 'min' : i === 5 ? 'jum' : '']"
      >
        {{ h }}
      </div>
    </div>
    <div class="grid-cell">
      <div v-for="(cell, i) in grid" :key="i" class="cell-wrap">
        <div v-if="cell" :class="cellClass(cell)">
          <p class="tgl">{{ cell.getDate() }}</p>
          <p :style="{ fontFamily: FONT_ARAB }" class="hijri">{{ hijriArab(cell) }}</p>
          <p class="psr">{{ hitungPasaran(cell) }}</p>
          <div v-if="hasEvent(cell)" class="dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ammu-kal {
  font-family: 'Inter', system-ui, sans-serif;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  color: #0f172a;
}
:global(.dark) .ammu-kal,
.dark-mode .ammu-kal {
  background: #18181b;
  border-color: #27272a;
  color: #fafafa;
}
.hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}
.hdr-l {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.btn-nav {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #475569;
  transition: background 150ms;
}
.btn-nav:hover {
  background: #f1f5f9;
}
:global(.dark) .btn-nav,
.dark-mode .btn-nav {
  color: #d4d4d8;
}
:global(.dark) .btn-nav:hover,
.dark-mode .btn-nav:hover {
  background: #27272a;
}
.judul {
  font-size: 1rem;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
  margin: 0 0.25rem;
}
.btn-today {
  font-size: 0.75rem;
  font-weight: 700;
  color: #0f766e;
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: none;
}
.btn-today:hover {
  text-decoration: underline;
}
:global(.dark) .btn-today,
.dark-mode .btn-today {
  color: #2dd4bf;
}
.grid-hari {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 4px;
}
.hari {
  text-align: center;
  font-size: 9px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  padding: 4px 0;
  color: #64748b;
}
:global(.dark) .hari,
.dark-mode .hari {
  color: #a1a1aa;
}
.hari.min {
  color: #e11d48;
}
.hari.jum {
  color: #10b981;
}
.grid-cell {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
.cell-wrap {
  aspect-ratio: 1;
}
.cell {
  width: 100%;
  height: 100%;
  padding: 4px;
  border-radius: 6px;
  background: white;
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: background 150ms;
  color: #334155;
}
.cell:hover {
  background: #f8fafc;
}
:global(.dark) .cell,
.dark-mode .cell {
  background: #27272a;
  border-color: #3f3f46;
  color: #d4d4d8;
}
:global(.dark) .cell:hover,
.dark-mode .cell:hover {
  background: #3f3f46;
}
.cell.cell-today {
  background: #ccfbf1;
  border-color: #14b8a6;
  box-shadow: 0 0 0 1px #2dd4bf;
}
:global(.dark) .cell.cell-today,
.dark-mode .cell.cell-today {
  background: rgba(15, 118, 110, 0.3);
  border-color: #14b8a6;
}
.cell.cell-min .tgl,
.cell.cell-min .hijri {
  color: #e11d48;
}
.cell.cell-jum .hijri {
  color: #10b981;
}
.tgl {
  font-size: 8px;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  color: #64748b;
}
.hijri {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 900;
  line-height: 1;
  margin: 0;
  color: inherit;
}
.psr {
  font-size: 7px;
  font-weight: 500;
  line-height: 1;
  margin: 0;
  color: #94a3b8;
}
:global(.dark) .psr,
.dark-mode .psr {
  color: #71717a;
}
.dot {
  width: 4px;
  height: 4px;
  border-radius: 9999px;
  background: #14b8a6;
  margin-top: 2px;
}
</style>
