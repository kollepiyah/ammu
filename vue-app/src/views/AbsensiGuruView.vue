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
              <i class="fas fa-fingerprint text-teal-500 mr-2"></i>Rekap Absensi Guru
            </h1>
            <p class="text-xs text-slate-500 mt-0.5">
              Bulan {{ getBulanLabel(selectedMonth) }} {{ selectedYear }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <div class="px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-xs">
              <span class="text-teal-700 dark:text-teal-300 font-bold">{{ stats.total }}</span>
              <span class="text-slate-500 ml-1">total</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 text-xs">
              <span class="text-amber-700 dark:text-amber-300 font-bold">{{ stats.pagi }}</span>
              <span class="text-slate-500 ml-1">pagi</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 text-xs">
              <span class="text-purple-700 dark:text-purple-300 font-bold">{{ stats.sore }}</span>
              <span class="text-slate-500 ml-1">sore</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 text-xs">
              <span class="text-indigo-700 dark:text-indigo-300 font-bold">{{ stats.guruActiveCount }}</span>
              <span class="text-slate-500 ml-1">guru</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Period filter -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <select v-model.number="selectedYear" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none">
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
          <select v-model.number="selectedMonth" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none">
            <option v-for="(b, i) in BULAN" :key="b" :value="i + 1">{{ b }}</option>
          </select>
          <select v-model="filterGuru" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none">
            <option value="">Semua guru</option>
            <option v-for="g in activeGurus" :key="g.id" :value="g.id">{{ g.nama }}</option>
          </select>
          <select v-model="filterShift" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none">
            <option value="">Semua shift</option>
            <option value="pagi">Pagi saja</option>
            <option value="sore">Sore saja</option>
          </select>
        </div>
      </div>

      <!-- v.72.13.0526: 3 mode — Input Harian + Rekap Bulanan + Impor (kyai spec: hapus Rekap per Guru + Detail Tanggal) -->
      <div class="grid grid-cols-3 gap-2 md:gap-3">
        <button
          @click="viewMode = 'harian'"
          :class="[
            'group relative overflow-hidden bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-1 cursor-pointer',
            viewMode === 'harian' ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-amber-50' : ''
          ]"
        >
          <i class="fas fa-calendar-check text-base md:text-lg drop-shadow"></i>
          <h3 class="text-[11px] md:text-xs font-black leading-tight drop-shadow-sm">Input Harian</h3>
          <p class="hidden md:block text-[10px] text-white/85 font-medium leading-snug">Absen hari ini per shift</p>
        </button>
        <button
          @click="viewMode = 'bulanan'"
          :class="[
            'group relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-1 cursor-pointer',
            viewMode === 'bulanan' ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-amber-50' : ''
          ]"
        >
          <i class="fas fa-calendar-alt text-base md:text-lg drop-shadow"></i>
          <h3 class="text-[11px] md:text-xs font-black leading-tight drop-shadow-sm">Rekap Bulanan</h3>
          <p class="hidden md:block text-[10px] text-white/85 font-medium leading-snug">Matrix per guru × tanggal</p>
        </button>
        <button
          @click="viewMode = 'impor'"
          :class="[
            'group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-1 cursor-pointer',
            viewMode === 'impor' ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-amber-50' : ''
          ]"
        >
          <i class="fas fa-fingerprint text-base md:text-lg drop-shadow"></i>
          <h3 class="text-[11px] md:text-xs font-black leading-tight drop-shadow-sm">Impor Fingerprint</h3>
          <p class="hidden md:block text-[10px] text-white/85 font-medium leading-snug">Upload .xlsx/.csv device</p>
        </button>
      </div>

      <!-- Impor Fingerprint content (v.72.5) -->
      <div v-if="viewMode === 'impor'" class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 class="text-sm md:text-base font-black text-slate-800 dark:text-white mb-3">
          <i class="fas fa-file-import text-blue-600 mr-2"></i>Impor Data Fingerprint Guru
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Upload file rekap fingerprint device (.xlsx atau .csv) untuk mengimpor data kehadiran guru per shift Pagi/Sore.
        </p>
        <div class="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 text-center">
          <i class="fas fa-cloud-upload-alt text-4xl text-slate-400 dark:text-slate-500 mb-3"></i>
          <p class="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Drag &amp; drop file di sini</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">atau klik untuk pilih file</p>
          <input
            ref="fileInputAbsen"
            type="file"
            accept=".xlsx,.csv"
            @change="handleImporFingerprint"
            class="hidden"
          />
          <button
            @click="$refs.fileInputAbsen.click()"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs"
          >
            <i class="fas fa-folder-open mr-1"></i>Pilih File
          </button>
          <p v-if="fingerFileName" class="text-[11px] text-emerald-600 dark:text-emerald-400 mt-3 font-bold">
            <i class="fas fa-check-circle mr-1"></i>{{ fingerFileName }}
          </p>
        </div>
        <div class="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-3">
          <p class="text-[11px] text-amber-800 dark:text-amber-200">
            <i class="fas fa-exclamation-triangle mr-1"></i>
            <strong>Format kolom:</strong> <code>tanggal</code> (YYYY-MM-DD or DD-MM-YYYY), <code>jam</code> (HH:MM), <code>fingerprint_id</code> atau <code>nama</code> guru, <code>shift</code> (pagi/sore). Excel XLSX atau CSV diterima.
          </p>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
        <p class="text-sm text-slate-500 font-bold">Memuat absensi...</p>
      </div>

      <!-- v.20.70.0526: Rekap Bulanan = grid kalender per guru × tanggal (match legacy) -->
      <div v-else-if="viewMode === 'bulanan' || viewMode === 'rekap'" class="space-y-3">
        <!-- Action toolbar -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center gap-2 justify-between">
          <!-- Legend -->
          <div class="flex flex-wrap items-center gap-2 text-[11px]">
            <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">■ Tepat Waktu</span>
            <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">■ Terlambat</span>
            <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">■ Izin/Sakit</span>
            <span class="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">■ Alpha</span>
            <span class="px-2 py-0.5 rounded bg-pink-100 text-pink-800 font-bold">■ Libur</span>
          </div>
          <div class="flex gap-2">
            <button @click="showLiburModal = true" class="bg-pink-500 hover:bg-pink-600 text-white text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <i class="fas fa-calendar-plus"></i> Kelola Libur
            </button>
            <button @click="exportRekapExcel" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <i class="fas fa-file-excel"></i> Excel
            </button>
            <button @click="exportRekapPDF" class="bg-rose-600 hover:bg-rose-700 text-white text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <i class="fas fa-file-pdf"></i> PDF
            </button>
          </div>
        </div>

        <!-- Calendar grid -->
        <div v-if="activeGurus.length === 0" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center">
          <i class="fas fa-calendar-times text-slate-300 text-4xl mb-3"></i>
          <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Tidak ada guru aktif</p>
        </div>
        <div v-else class="bg-white dark:bg-slate-800 rounded-2xl p-2 md:p-3 border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto">
          <table class="w-full text-[10px] md:text-[11px] border-collapse">
            <thead>
              <tr class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 sticky top-0">
                <th class="p-1.5 text-left font-black uppercase tracking-wider sticky left-0 bg-slate-100 dark:bg-slate-700 z-10 min-w-[180px]">Nama Guru</th>
                <th class="p-1.5 text-center font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-700 z-10 min-w-[70px]">FP ID</th>
                <th v-for="d in daysInMonth" :key="'h'+d" class="p-1 text-center font-bold w-7 border-l border-slate-200 dark:border-slate-600" :class="{ 'bg-pink-50 text-pink-700': isLibur(d) }">{{ d }}</th>
                <th class="p-1 text-center font-black text-emerald-700 bg-emerald-50 border-l border-slate-200">H</th>
                <th class="p-1 text-center font-black text-amber-700 bg-amber-50">T</th>
                <th class="p-1 text-center font-black text-blue-700 bg-blue-50">I/S</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="g in activeGurus" :key="'r'+g.id" class="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                <td class="p-1.5 sticky left-0 bg-white dark:bg-slate-800 z-[1]">
                  <div class="font-black text-slate-800 dark:text-white text-[11px] md:text-xs truncate">{{ g.nama }}</div>
                  <div class="text-[9px] text-slate-500 truncate">{{ g.lembaga || g.unit || '-' }}</div>
                </td>
                <td class="p-1.5 text-center text-[10px] font-bold text-slate-600 dark:text-slate-300 border-l border-slate-200 dark:border-slate-700">{{ g.fingerprint_id || g.fp_id || g.id_fingerprint || '-' }}</td>
                <td v-for="d in daysInMonth" :key="g.id+'_'+d" class="p-0.5 text-center border-l border-slate-200 dark:border-slate-700">
                  <span :class="cellClass(g.id, d)" :title="cellTitle(g.id, d)" class="inline-block w-5 h-5 leading-5 rounded text-[9px] font-bold">{{ cellLabel(g.id, d) }}</span>
                </td>
                <td class="p-1 text-center font-black text-emerald-700 bg-emerald-50/50">{{ countStatus(g.id, ['hadir']) }}</td>
                <td class="p-1 text-center font-black text-amber-700 bg-amber-50/50">{{ countStatus(g.id, ['terlambat']) }}</td>
                <td class="p-1 text-center font-black text-blue-700 bg-blue-50/50">{{ countStatus(g.id, ['izin','sakit']) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal Kelola Libur -->
      <div v-if="showLiburModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3" @click.self="showLiburModal = false">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 max-w-md w-full max-h-[80vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-black text-slate-800 dark:text-white">
              <i class="fas fa-calendar-plus text-pink-500 mr-2"></i>Kelola Hari Libur — {{ getBulanLabel(selectedMonth) }} {{ selectedYear }}
            </h3>
            <button @click="showLiburModal = false" class="text-slate-400 hover:text-slate-700"><i class="fas fa-times"></i></button>
          </div>
          <p class="text-xs text-slate-500 mb-3">Klik tanggal untuk toggle libur. Tersimpan di Pengaturan global.</p>
          <div class="grid grid-cols-7 gap-1.5">
            <button v-for="d in daysInMonth" :key="'l'+d" @click="toggleLibur(d)" :class="[
              'p-2 rounded-lg text-xs font-bold border',
              isLibur(d) ? 'bg-pink-500 text-white border-pink-600' : 'bg-white border-slate-300 text-slate-700 hover:bg-pink-50'
            ]">{{ d }}</button>
          </div>
          <div class="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
            <button @click="showLiburModal = false" class="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg">Tutup</button>
            <button @click="saveLibur" :disabled="liburSaving" class="bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white text-xs font-black px-3 py-1.5 rounded-lg">
              <i :class="['fas', liburSaving ? 'fa-spinner fa-spin' : 'fa-save']" class="mr-1"></i>{{ liburSaving ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Input Harian mode (active guru today checkbox per shift) - simplified UI -->
      <div v-else-if="viewMode === 'harian'" class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 class="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">
          <i class="fas fa-calendar-check text-teal-600 mr-2"></i>Input Absensi Harian — {{ new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) }}
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Centang guru yang hadir per shift (Pagi/Sore). Submit untuk simpan ke koleksi <code>absensi_guru</code>.
        </p>
        <!-- v.20.63.0526: Full editor input harian — checkbox per guru × shift (Pagi/Sore/Sekolah) + jam + status -->
        <div class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
              <tr>
                <th class="p-2 text-left font-black uppercase text-[10px] tracking-wider sticky left-0 bg-slate-100 dark:bg-slate-700">Nama Guru</th>
                <th class="p-2 text-center font-black text-amber-700 dark:text-amber-300 uppercase text-[10px] tracking-wider" colspan="2">Pagi</th>
                <th class="p-2 text-center font-black text-indigo-700 dark:text-indigo-300 uppercase text-[10px] tracking-wider" colspan="2">Sore</th>
                <th class="p-2 text-center font-black text-teal-700 dark:text-teal-300 uppercase text-[10px] tracking-wider" colspan="2">Sekolah</th>
              </tr>
              <tr class="bg-slate-50 dark:bg-slate-800">
                <th></th>
                <th class="p-1 text-[10px] font-bold">Hadir</th>
                <th class="p-1 text-[10px] font-bold">Jam</th>
                <th class="p-1 text-[10px] font-bold">Hadir</th>
                <th class="p-1 text-[10px] font-bold">Jam</th>
                <th class="p-1 text-[10px] font-bold">Hadir</th>
                <th class="p-1 text-[10px] font-bold">Jam</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="g in activeGurus" :key="g.id" class="border-b border-slate-100 dark:border-slate-700">
                <td class="p-2 font-bold text-slate-800 dark:text-white sticky left-0 bg-white dark:bg-slate-800">{{ g.nama }}</td>
                <td v-for="shift in ['pagi','sore','sekolah']" :key="shift+g.id" colspan="2" class="p-1">
                  <div class="flex items-center gap-1 justify-center">
                    <input type="checkbox" v-model="harianForm[g.id+'_'+shift+'_hadir']" class="w-4 h-4 accent-teal-600 cursor-pointer" />
                    <input v-if="harianForm[g.id+'_'+shift+'_hadir']" v-model="harianForm[g.id+'_'+shift+'_jam']" type="time" class="text-[10px] px-1 py-0.5 border border-slate-300 rounded bg-white" />
                  </div>
                </td>
              </tr>
              <tr v-if="activeGurus.length === 0">
                <td colspan="7" class="text-center text-slate-400 italic py-6">Tidak ada guru aktif</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
          <p class="text-[11px] text-slate-500 italic">
            <i class="fas fa-info-circle mr-1"></i>Auto-status: jam > batas terlambat (Pengaturan Web → Jam Shift) = "terlambat".
          </p>
          <button @click="simpanHarian" :disabled="harianSaving || !hasHarianChanges" class="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black px-4 py-2 rounded-lg cursor-pointer flex items-center gap-1.5">
            <i :class="['fas', harianSaving ? 'fa-spinner fa-spin' : 'fa-save']"></i>
            {{ harianSaving ? 'Menyimpan…' : 'Simpan Absensi Hari Ini' }}
          </button>
        </div>
      </div>

      <!-- Detail mode legacy fallback -->
      <div v-else class="space-y-2">
        <div v-if="filteredAbsensi.length === 0" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center">
          <i class="fas fa-calendar-times text-slate-300 text-4xl mb-3"></i>
          <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Tidak ada absensi</p>
        </div>
        <div v-for="a in filteredAbsensi" :key="a.id" class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="flex items-center gap-3">
            <div :class="[
              'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs',
              a.shift === 'pagi' ? 'bg-amber-500' : 'bg-purple-500'
            ]">
              {{ a.shift === 'pagi' ? 'P' : 'S' }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-800 dark:text-white truncate">
                {{ getNamaGuru(a.guru_id || a.guruId) }}
              </p>
              <p class="text-[11px] text-slate-500">
                {{ a.tanggal }} · Shift {{ a.shift }}
                <span v-if="a.jam_masuk" class="ml-1">· {{ a.jam_masuk }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-[10px] text-slate-400 pt-2">
        <i class="fas fa-circle-info mr-1"></i>{{ filteredAbsensi.length }} absensi · Vue 3 · Phase 5.16
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAbsensi } from '@/composables/useAbsensi'

const {
  filteredAbsensi,
  rekapPerGuru,
  guruRaw,
  loading,
  selectedYear,
  selectedMonth,
  filterGuru,
  filterShift,
  stats,
  isFullAccess,
  getNamaGuru,
  getBulanLabel,
  BULAN
} = useAbsensi()
import { useExcel } from '@/composables/useExcel'
import { useToast } from '@/composables/useToast'
import { useSettingsStore } from '@/stores/settings'
import { doc, writeBatch } from 'firebase/firestore'
import { db } from '@/services/firebase'
const { importFile } = useExcel()
const settingsStore = useSettingsStore()
const _toastAbsen = useToast()

const viewMode = ref('harian') // v.72.13.0526: default Input Harian

// v.20.45.0526: Impor Fingerprint REAL parser (kyai req replace placeholder)
const fingerFileName = ref('')
const fingerParsing = ref(false)
const fingerStats = ref({ ok: 0, error: 0, errors: [] })
async function handleImporFingerprint(e) {
  const file = e.target.files?.[0]
  if (!file) return
  fingerFileName.value = file.name
  fingerParsing.value = true
  fingerStats.value = { ok: 0, error: 0, errors: [] }
  try {
    const rows = await importFile(file)
    if (rows.length === 0) {
      _toastAbsen.warning('File kosong / tidak ada data')
      return
    }
    // Expected columns: tanggal (YYYY-MM-DD or DD-MM-YYYY), jam, fingerprint_id (or guru_id/nama), shift (pagi|sore)
    const batch = writeBatch(db)
    let ok = 0
    let err = 0
    const errMsgs = []
    for (const row of rows) {
      try {
        const tanggalRaw = row.tanggal || row.Tanggal || row.tgl || row.Tgl || row.TANGGAL || ''
        const fpId = row.fingerprint_id || row.fingerprint || row.fp_id || row.FP || row.guru_id || row.id || ''
        const namaGuru = row.nama || row.Nama || row.guru || row.Guru || ''
        const shift = String(row.shift || row.Shift || 'pagi').toLowerCase().trim()
        const jam = row.jam || row.Jam || row.JAM || ''
        if (!tanggalRaw || (!fpId && !namaGuru)) { err++; errMsgs.push(`Row ${ok+err}: tanggal/guru kosong`); continue }
        let tgl = String(tanggalRaw)
        const dmy = tgl.match(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/)
        if (dmy) tgl = `${dmy[3]}-${dmy[2]}-${dmy[1]}`
        let guru = null
        if (fpId) guru = guruRaw.value.find((g) => String(g.fingerprint_id || g.fp_id || '') === String(fpId))
        if (!guru && namaGuru) guru = guruRaw.value.find((g) => String(g.nama || '').toLowerCase().trim() === String(namaGuru).toLowerCase().trim())
        if (!guru) { err++; errMsgs.push(`Row: guru ${fpId || namaGuru} tidak ditemukan`); continue }
        // v.20.62.0526: cek batas terlambat dari settings (fallback ke shift mulai)
        const cutoffKey = shift === 'sore' ? 'shiftSoreTerlambat' : (shift === 'sekolah' ? 'shiftSekolahTerlambat' : 'shiftPagiTerlambat')
        const startKey = shift === 'sore' ? 'shiftSoreMulai' : (shift === 'sekolah' ? 'shiftSekolahMulai' : 'shiftPagiMulai')
        const shiftCutoff = String(settingsStore.settings?.[cutoffKey] || settingsStore.settings?.[startKey] || '').trim()
        let statusVal = 'hadir'
        if (jam && shiftCutoff && jam > shiftCutoff) statusVal = 'terlambat'
        const docId = `shift_${guru.id}_${tgl}_${shift}`
        batch.set(doc(db, 'absensi_shift_guru', docId), {
          id: docId,
          guru_id: guru.id,
          guru_nama: guru.nama,
          tanggal: tgl,
          jam: jam || '',
          shift,
          status: statusVal,
          source: 'fingerprint_import',
          imported_at: new Date().toISOString()
        })
        ok++
      } catch (rowErr) {
        err++
        errMsgs.push(`Row error: ${rowErr.message}`)
      }
    }
    if (ok > 0) await batch.commit()
    fingerStats.value = { ok, error: err, errors: errMsgs.slice(0, 5) }
    if (ok > 0) _toastAbsen.success(`Impor selesai: ${ok} OK, ${err} error`)
    else _toastAbsen.error(`Impor gagal: 0 OK, ${err} error. Cek format kolom.`)
  } catch (er) {
    _toastAbsen.error('Parse gagal: ' + (er.message || er))
  } finally {
    fingerParsing.value = false
    e.target.value = ''
  }
}

const years = computed(() => {
  const now = new Date().getFullYear()
  return [now - 1, now, now + 1]
})

const activeGurus = computed(() =>
  guruRaw.value
    .filter((g) => String(g.status || 'Aktif').toLowerCase().trim() === 'aktif')
    .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
)

// v.20.63.0526: Input Absensi Harian editor (centang per guru × shift Pagi/Sore/Sekolah)
const harianForm = ref({})
const harianSaving = ref(false)
const hasHarianChanges = computed(() => Object.keys(harianForm.value).some((k) => harianForm.value[k]))

async function simpanHarian() {
  const today = new Date().toISOString().slice(0, 10)
  const batch = writeBatch(db)
  let count = 0
  for (const g of activeGurus.value) {
    for (const shift of ['pagi', 'sore', 'sekolah']) {
      const hadir = harianForm.value[g.id + '_' + shift + '_hadir']
      if (!hadir) continue
      const jam = String(harianForm.value[g.id + '_' + shift + '_jam'] || '').trim()
      const cutoffKey = shift === 'sore' ? 'shiftSoreTerlambat' : (shift === 'sekolah' ? 'shiftSekolahTerlambat' : 'shiftPagiTerlambat')
      const startKey = shift === 'sore' ? 'shiftSoreMulai' : (shift === 'sekolah' ? 'shiftSekolahMulai' : 'shiftPagiMulai')
      const shiftCutoff = String(settingsStore.settings?.[cutoffKey] || settingsStore.settings?.[startKey] || '').trim()
      let statusVal = 'hadir'
      if (jam && shiftCutoff && jam > shiftCutoff) statusVal = 'terlambat'
      const docId = `shift_${g.id}_${today}_${shift}`
      batch.set(doc(db, 'absensi_shift_guru', docId), {
        id: docId,
        guru_id: g.id,
        guru_nama: g.nama,
        tanggal: today,
        jam: jam || '',
        shift,
        status: statusVal,
        source: 'manual_harian',
        imported_at: new Date().toISOString()
      })
      count++
    }
  }
  if (count === 0) { _toastAbsen.warning('Tidak ada centang hadir — tidak ada yg disimpan'); return }
  harianSaving.value = true
  try {
    await batch.commit()
    _toastAbsen.success(`${count} absensi tersimpan untuk ${today}`)
    harianForm.value = {}
  } catch (er) {
    _toastAbsen.error('Gagal: ' + (er.message || er))
  } finally {
    harianSaving.value = false
  }
}


// v.20.70.0526: Calendar grid helpers
import { jsPDFFromCDN } from '@/services/pdf'
import { setOne } from '@/services/firestore'
import { useExcel as useExcelAlt } from '@/composables/useExcel'

const showLiburModal = ref(false)
const liburSaving = ref(false)
const liburLocal = ref([]) // local clone, save on demand

// Sync local libur from store on mount + on settings change
import { watch } from 'vue'
watch(() => settingsStore.settings?.hariLibur, (v) => {
  liburLocal.value = Array.isArray(v) ? [...v] : []
}, { immediate: true })

const daysInMonth = computed(() => {
  const y = selectedYear.value
  const m = selectedMonth.value
  return new Date(y, m, 0).getDate()
})

function ymd(d) {
  const y = selectedYear.value
  const m = String(selectedMonth.value).padStart(2, '0')
  return `${y}-${m}-${String(d).padStart(2, '0')}`
}

function isLibur(day) {
  const date = ymd(day)
  const dow = new Date(selectedYear.value, selectedMonth.value - 1, day).getDay()
  // Default: Jumat = libur lembaga (sesuaikan setting)
  if (dow === 5 && (settingsStore.settings?.liburJumat !== false)) return true
  return liburLocal.value.includes(date)
}

function toggleLibur(day) {
  const date = ymd(day)
  const idx = liburLocal.value.indexOf(date)
  if (idx >= 0) liburLocal.value.splice(idx, 1)
  else liburLocal.value.push(date)
}

async function saveLibur() {
  liburSaving.value = true
  try {
    const merged = { ...settingsStore.settings, hariLibur: [...liburLocal.value] }
    await setOne('settings', 'general', merged, true)
    _toastAbsen.success('Hari libur tersimpan')
    showLiburModal.value = false
  } catch (e) {
    _toastAbsen.error('Gagal simpan: ' + (e.message || e))
  } finally {
    liburSaving.value = false
  }
}

// Build cell index: gId+day → first record (prefer non-empty status)
const cellMap = computed(() => {
  const map = {}
  for (const a of filteredAbsensi.value) {
    const tgl = String(a.tanggal || '')
    const day = parseInt(tgl.slice(8, 10), 10)
    if (!day) continue
    const gid = String(a.guru_id || a.guruId || '')
    const key = gid + '_' + day
    if (!map[key]) map[key] = a
    else {
      // priority: terlambat > hadir > izin/sakit
      const prio = (s) => s === 'terlambat' ? 3 : (s === 'hadir' ? 2 : 1)
      if (prio(String(a.status || 'hadir')) > prio(String(map[key].status || 'hadir'))) map[key] = a
    }
  }
  return map
})

function getCell(gId, day) {
  return cellMap.value[gId + '_' + day] || null
}

function cellLabel(gId, day) {
  if (isLibur(day)) return 'L'
  const c = getCell(gId, day)
  if (!c) return ''
  const s = String(c.status || 'hadir').toLowerCase()
  if (s === 'terlambat') return 'T'
  if (s === 'izin') return 'I'
  if (s === 'sakit') return 'S'
  return 'H'
}

function cellClass(gId, day) {
  if (isLibur(day)) return 'bg-pink-200 text-pink-800'
  const c = getCell(gId, day)
  if (!c) {
    // hari sudah lewat tapi tidak ada record = alpha (red)
    const today = new Date().toISOString().slice(0, 10)
    const dayDate = ymd(day)
    if (dayDate <= today) return 'bg-rose-100 text-rose-700'
    return 'bg-slate-50 text-slate-300'
  }
  const s = String(c.status || 'hadir').toLowerCase()
  if (s === 'terlambat') return 'bg-amber-200 text-amber-800'
  if (s === 'izin' || s === 'sakit') return 'bg-blue-200 text-blue-800'
  return 'bg-emerald-200 text-emerald-800'
}

function cellTitle(gId, day) {
  const date = ymd(day)
  if (isLibur(day)) return date + ' — Libur'
  const c = getCell(gId, day)
  if (!c) return date + ' — (kosong)'
  return `${date} — ${c.status || 'hadir'}${c.jam ? ' (' + c.jam + ')' : ''}${c.shift ? ' [' + c.shift + ']' : ''}`
}

function countStatus(gId, statuses) {
  let n = 0
  for (let d = 1; d <= daysInMonth.value; d++) {
    if (isLibur(d)) continue
    const c = getCell(gId, d)
    if (!c) continue
    if (statuses.includes(String(c.status || 'hadir').toLowerCase())) n++
  }
  return n
}

// Excel export
const excelTool = useExcelAlt()
async function exportRekapExcel() {
  try {
    const days = daysInMonth.value
    const columns = [
      { key: 'nama', header: 'Nama Guru', width: 28 },
      { key: 'lembaga', header: 'Lembaga', width: 16 }
    ]
    for (let d = 1; d <= days; d++) columns.push({ key: 'd' + d, header: String(d), width: 4 })
    columns.push({ key: 'H', header: 'H', width: 5 })
    columns.push({ key: 'T', header: 'T', width: 5 })
    columns.push({ key: 'IS', header: 'I/S', width: 5 })
    const rows = activeGurus.value.map((g) => {
      const row = { nama: g.nama, lembaga: g.lembaga || g.unit || '-' }
      for (let d = 1; d <= days; d++) row['d' + d] = cellLabel(g.id, d)
      row.H = countStatus(g.id, ['hadir'])
      row.T = countStatus(g.id, ['terlambat'])
      row.IS = countStatus(g.id, ['izin', 'sakit'])
      return row
    })
    await excelTool.exportSimple(rows, {
      filename: `Rekap_Absensi_Guru_${selectedYear.value}_${String(selectedMonth.value).padStart(2,'0')}.xlsx`,
      sheetName: 'Rekap',
      columns,
      title: `REKAP ABSENSI GURU — ${getBulanLabel(selectedMonth.value).toUpperCase()} ${selectedYear.value}`
    })
    _toastAbsen.success('Excel berhasil di-ekspor')
  } catch (e) {
    _toastAbsen.error('Gagal ekspor Excel: ' + (e.message || e))
  }
}

// PDF export — jsPDF + autoTable
async function exportRekapPDF() {
  try {
    const jsPDF = await jsPDFFromCDN()
    const doc2 = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
    const days = daysInMonth.value
    const head = [['Nama Guru', 'Lembaga', ...Array.from({ length: days }, (_, i) => String(i + 1)), 'H', 'T', 'I/S']]
    const body = activeGurus.value.map((g) => {
      const row = [g.nama, g.lembaga || g.unit || '-']
      for (let d = 1; d <= days; d++) row.push(cellLabel(g.id, d))
      row.push(countStatus(g.id, ['hadir']))
      row.push(countStatus(g.id, ['terlambat']))
      row.push(countStatus(g.id, ['izin', 'sakit']))
      return row
    })
    doc2.setFontSize(11)
    doc2.text(`REKAP ABSENSI GURU — ${getBulanLabel(selectedMonth.value).toUpperCase()} ${selectedYear.value}`, 40, 28)
    doc2.autoTable({
      head, body,
      startY: 40,
      styles: { fontSize: 6, cellPadding: 1.5, halign: 'center' },
      columnStyles: { 0: { halign: 'left', cellPadding: { left: 6, top: 1.5, bottom: 1.5, right: 1.5 } }, 1: { halign: 'left' } },
      headStyles: { fillColor: [16, 185, 129], textColor: 255, fontStyle: 'bold' }
    })
    doc2.save(`Rekap_Absensi_Guru_${selectedYear.value}_${String(selectedMonth.value).padStart(2,'0')}.pdf`)
    _toastAbsen.success('PDF berhasil di-ekspor')
  } catch (e) {
    _toastAbsen.error('Gagal ekspor PDF: ' + (e.message || e))
  }
}

</script>
