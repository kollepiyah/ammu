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
              <i class="fas fa-clipboard-check text-cyan-500 mr-2"></i>Rekap Absensi Santri
            </h1>
            <p class="text-xs text-slate-500 mt-0.5">
              {{ getBulanLabel(selectedMonth) }} {{ selectedYear }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <div class="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 text-xs">
              <span class="text-emerald-700 dark:text-emerald-300 font-bold">{{ stats.hadir }}</span>
              <span class="text-slate-500 ml-1">hadir</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-900/30 border border-rose-200 text-xs">
              <span class="text-rose-700 dark:text-rose-300 font-bold">{{ stats.alfa }}</span>
              <span class="text-slate-500 ml-1">alfa</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 border border-amber-200 text-xs">
              <span class="text-amber-700 dark:text-amber-300 font-bold">{{ stats.sakit }}</span>
              <span class="text-slate-500 ml-1">sakit</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 text-xs">
              <span class="text-purple-700 dark:text-purple-300 font-bold">{{ stats.izin }}</span>
              <span class="text-slate-500 ml-1">izin</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          <select v-model.number="selectedYear" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-cyan-500 outline-none">
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
          <select v-model.number="selectedMonth" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-cyan-500 outline-none">
            <option v-for="(b, i) in BULAN" :key="b" :value="i + 1">{{ b }}</option>
          </select>
          <select v-model="filterLembaga" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-cyan-500 outline-none">
            <option value="">Semua lembaga</option>
            <option v-for="l in uniqueLembaga" :key="l" :value="l">{{ l }}</option>
          </select>
          <select v-model="filterKelas" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-cyan-500 outline-none">
            <option value="">Semua kelas</option>
            <option v-for="k in uniqueKelas" :key="k" :value="k">{{ k }}</option>
          </select>
          <select v-model="filterStatus" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-cyan-500 outline-none">
            <option value="">Semua status</option>
            <option value="hadir">Hadir</option>
            <option value="alfa">Alfa</option>
            <option value="sakit">Sakit</option>
            <option value="izin">Izin</option>
          </select>
        </div>
      </div>

      <!-- View mode -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-2 border border-slate-200 shadow-sm flex gap-1">
        <button @click="viewMode = 'rekap'" :class="[
          'flex-1 px-3 py-2 text-sm rounded-xl font-bold transition',
          viewMode === 'rekap' ? 'bg-cyan-600 text-white shadow' : 'text-slate-600 hover:bg-cyan-50'
        ]">Rekap per Santri</button>
        <button @click="viewMode = 'detail'" :class="[
          'flex-1 px-3 py-2 text-sm rounded-xl font-bold transition',
          viewMode === 'detail' ? 'bg-cyan-600 text-white shadow' : 'text-slate-600 hover:bg-cyan-50'
        ]">Detail per Hari</button>
      </div>

      <!-- v.21.25.0526: Action toolbar — Generate Rapor + Export Excel/PDF (issue #49) -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 shadow-sm flex flex-wrap gap-2">
        <button @click="generateKeRapor" :disabled="generating" class="px-3 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 inline-flex items-center gap-1">
          <i class="fas fa-file-export"></i>
          {{ generating ? 'Memproses...' : 'Generate ke Rapor' }}
        </button>
        <button @click="exportExcel" :disabled="exporting" class="px-3 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 inline-flex items-center gap-1">
          <i class="fas fa-file-excel"></i>Export Excel
        </button>
        <button @click="exportPdf" :disabled="exporting" class="px-3 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50 inline-flex items-center gap-1">
          <i class="fas fa-file-pdf"></i>Export PDF
        </button>
        <span class="text-[10px] text-slate-400 italic ml-auto self-center">
          <i class="fas fa-info-circle mr-1"></i>Filter santri: non-mukim (PP/Fullday) only
        </span>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-cyan-500 text-3xl mb-3"></i>
        <p class="text-sm text-slate-500 font-bold">Memuat absensi...</p>
      </div>

      <!-- Rekap mode -->
      <div v-else-if="viewMode === 'rekap'" class="space-y-2">
        <div v-if="rekapPerSantri.length === 0" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center">
          <i class="fas fa-calendar-times text-slate-300 text-4xl mb-3"></i>
          <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Tidak ada absensi</p>
        </div>
        <div v-for="r in rekapPerSantri" :key="r.santri_id" class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center">
              <i class="fas fa-user-graduate"></i>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-black text-slate-800 truncate">
                {{ getNamaSantri(r.santri_id) }}
              </h3>
              <div class="flex gap-1.5 mt-1 text-[10px]">
                <span class="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">H: {{ r.hadir }}</span>
                <span class="bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-bold">A: {{ r.alfa }}</span>
                <span class="bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold">S: {{ r.sakit }}</span>
                <span class="bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold">I: {{ r.izin }}</span>
              </div>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="text-2xl font-black text-cyan-700">{{ r.hadir }}</p>
              <button @click="hapusAbsensiSantri(r.santri_id)" class="text-[10px] text-rose-600 hover:text-rose-800 font-bold mt-1" title="Hapus semua absensi santri ini">
                <i class="fas fa-trash mr-1"></i>Hapus
              </button>
              <p class="text-[10px] text-slate-500 uppercase font-bold">hari hadir</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail mode -->
      <div v-else class="space-y-1.5">
        <div v-if="filteredAbsensi.length === 0" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center">
          <i class="fas fa-calendar-times text-slate-300 text-4xl mb-3"></i>
          <p class="text-sm font-bold text-slate-700">Tidak ada absensi</p>
        </div>
        <div v-for="a in filteredAbsensi" :key="a.id" class="bg-white dark:bg-slate-800 rounded-xl p-2.5 border border-slate-200 shadow-sm">
          <div class="flex items-center gap-3">
            <div :class="[
              'flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs',
              statusColor(a.status)
            ]">
              {{ statusLabel(a.status) }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-800 truncate">
                {{ getNamaSantri(a.santri_id || a.santriId) }}
              </p>
              <p class="text-[11px] text-slate-500">
                {{ a.tanggal }} · <span class="capitalize">{{ a.status }}</span>
                <span v-if="a.keterangan" class="ml-1">· {{ a.keterangan }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-[10px] text-slate-400 pt-2">
        <i class="fas fa-circle-info mr-1"></i>{{ filteredAbsensi.length }} absensi · Vue 3 · Phase 5.17
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAbsensiSantri } from '@/composables/useAbsensiSantri'

const {
  filteredAbsensi,
  rekapPerSantri,
  santriRaw,
  loading,
  selectedYear,
  selectedMonth,
  filterLembaga,
  filterKelas,
  filterStatus,
  stats,
  isFullAccess,
  getNamaSantri,
  getSantriInfo,
  getBulanLabel,
  BULAN
} = useAbsensiSantri()

// v.21.25.0526: Generate ke Rapor + Export Excel/PDF (issue #49)
import { setDoc, doc as fbDoc2 } from 'firebase/firestore'
import { useExcel } from '@/composables/useExcel'
import { buildListPdf } from '@/utils/pdfBuilder'
import { useSettingsStore } from '@/stores/settings'
const { exportStyled } = useExcel()
const settingsStoreAS = useSettingsStore()
const generating = ref(false)
const exporting = ref(false)

async function generateKeRapor() {
  if (generating.value) return
  if (!filteredAbsensi.value.length) {
    toast.error('Tidak ada absensi di filter saat ini')
    return
  }
  generating.value = true
  try {
    // Determine semester: bulan 7-12 = Ganjil, bulan 1-6 = Genap
    const m = selectedMonth.value
    const y = selectedYear.value
    const semester = m >= 7 ? 'Ganjil' : 'Genap'
    const tahunAjaran = m >= 7 ? `${y}-${y + 1}` : `${y - 1}-${y}`
    const periodKey = `${tahunAjaran}_${semester}`.replace(/[^a-zA-Z0-9_]/g, '_')
    let updated = 0
    for (const rek of rekapList.value) {
      try {
        const docId = `${periodKey}_${rek.santri_id}`
        await setDoc(doc(db, 'rapor_semester', docId), {
          santri_id: rek.santri_id,
          nama: rek.nama,
          periode: periodKey,
          semester,
          tahunAjaran,
          absensi: {
            hadir: rek.hadir,
            alfa: rek.alfa,
            sakit: rek.sakit,
            izin: rek.izin
          },
          generated_at: new Date().toISOString()
        }, { merge: true })
        updated++
      } catch (e) {
        console.warn('[Generate rapor] gagal:', rek.santri_id, e?.message)
      }
    }
    toast.success(`Berhasil generate ${updated} rapor untuk periode ${tahunAjaran} ${semester}`)
  } catch (e) {
    toast.error('Gagal generate ke rapor: ' + (e?.message || e))
  } finally {
    generating.value = false
  }
}
</script>
