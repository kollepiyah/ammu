<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- Header + rekap totals -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
            <i class="fas fa-clipboard-check text-teal-500 mr-1"></i>Rekap Absensi Santri
          </h1>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">
            {{ NAMA_BULAN[selectedMonth - 1] }} {{ selectedYear }} · Non-Mukim only
          </p>
        </div>
        <div class="flex flex-wrap gap-2 items-center">
          <div class="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs">
            <span class="text-emerald-700 font-bold">{{ hadirCount }}</span>
            <span class="text-slate-500">hadir</span>
          </div>
          <div class="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs">
            <span class="text-rose-700 font-bold">{{ alfaCount }}</span>
            <span class="text-slate-500">alfa</span>
          </div>
          <div class="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs">
            <span class="text-amber-700 font-bold">{{ sakitCount }}</span>
            <span class="text-slate-500">sakit</span>
          </div>
          <div class="px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs">
            <span class="text-purple-700 font-bold">{{ izinCount }}</span>
            <span class="text-slate-500">izin</span>
          </div>
        </div>
      </div>
      <!-- Action buttons -->
      <div class="mt-3 flex flex-wrap gap-2">
        <button
          @click="generateKeRapor"
          :disabled="generating"
          class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
        >
          <i :class="['fas', generating ? 'fa-spinner fa-spin' : 'fa-database']"></i
          >{{ generating ? 'Generating...' : 'Generate ke Rapor' }}
        </button>
        <button
          @click="exportExcel"
          :disabled="exporting"
          class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
        >
          <i :class="['fas', exporting ? 'fa-spinner fa-spin' : 'fa-file-excel']"></i
          >{{ exporting ? 'Ekspor...' : 'Ekspor Excel' }}
        </button>
        <button
          @click="exportPdf"
          :disabled="exporting"
          class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
        >
          <i class="fas fa-file-pdf"></i>Ekspor PDF
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-2 md:grid-cols-5 gap-2"
    >
      <select
        v-model.number="selectedYear"
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
      >
        <option v-for="y in YEAR_OPTIONS" :key="y" :value="y">{{ y }}</option>
      </select>
      <select
        v-model.number="selectedMonth"
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
      >
        <option v-for="(b, i) in NAMA_BULAN" :key="b" :value="i + 1">{{ b }}</option>
      </select>
      <select
        v-model="selectedLembaga"
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
      >
        <option value="">Semua lembaga</option>
        <option v-for="l in uniqueLembaga" :key="l" :value="l">{{ l }}</option>
      </select>
      <select
        v-model="selectedKelas"
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
      >
        <option value="">Semua kelas</option>
        <option v-for="k in uniqueKelas" :key="k" :value="k">{{ k }}</option>
      </select>
      <select
        v-model="selectedStatus"
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
      >
        <option value="">Semua status</option>
        <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
      </select>
    </div>

    <!-- Tabs -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-2 border border-slate-200 dark:border-slate-700 shadow-sm flex gap-1"
    >
      <button
        @click="activeTab = 'rekap'"
        :class="[
          'flex-1 px-4 py-2 text-sm font-bold uppercase tracking-wide rounded-lg transition cursor-pointer',
          activeTab === 'rekap'
            ? 'bg-teal-600 text-white shadow-md'
            : 'text-slate-500 hover:bg-teal-50'
        ]"
      >
        Rekap per Santri
      </button>
      <button
        @click="activeTab = 'detail'"
        :class="[
          'flex-1 px-4 py-2 text-sm font-bold uppercase tracking-wide rounded-lg transition cursor-pointer',
          activeTab === 'detail'
            ? 'bg-teal-600 text-white shadow-md'
            : 'text-slate-500 hover:bg-teal-50'
        ]"
      >
        Detail per Hari
      </button>
    </div>

    <!-- Tab: Rekap per Santri -->
    <div v-if="activeTab === 'rekap'">
      <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-2"></i>
        <p class="text-sm text-slate-500 font-bold">Memuat...</p>
      </div>
      <div
        v-else-if="rekapList.length === 0"
        class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center"
      >
        <i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i>
        <p class="text-sm text-slate-500 italic">
          Belum ada data santri non-mukim untuk filter ini.
        </p>
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="r in rekapList"
          :key="r.santri_id"
          class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3"
        >
          <div
            class="w-10 h-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-user-graduate"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 dark:text-white truncate">{{ r.nama }}</p>
            <div class="flex flex-wrap gap-1 mt-1">
              <span
                class="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold"
                >H: {{ r.hadir }}</span
              >
              <span class="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-bold"
                >A: {{ r.alfa }}</span
              >
              <span class="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold"
                >S: {{ r.sakit }}</span
              >
              <span
                class="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold"
                >I: {{ r.izin }}</span
              >
            </div>
          </div>
          <div class="text-right">
            <p class="text-2xl font-black text-teal-700">{{ r.total }}</p>
            <p class="text-[9px] text-slate-500 uppercase">Total</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Detail per Hari -->
    <div v-else>
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
      >
        <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-sm font-black text-slate-800 dark:text-white">
            Detail Absensi · {{ filteredAbsensi.length }} entry
          </h3>
        </div>
        <div v-if="filteredAbsensi.length === 0" class="p-10 text-center">
          <i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i>
          <p class="text-sm text-slate-500 italic">Belum ada absen.</p>
        </div>
        <div v-else class="divide-y divide-slate-100">
          <div
            v-for="a in filteredAbsensi"
            :key="a.id"
            class="p-3 hover:bg-slate-50 flex items-center gap-3"
          >
            <span
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center font-black text-white text-xs',
                statusBg(a.status)
              ]"
              >{{ String(a.status || '').toUpperCase() }}</span
            >
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-800 truncate">
                {{ getNamaSantri(a.santri_id) }}
              </p>
              <p class="text-[10px] text-slate-500">
                {{ fmtTgl(a.tanggal) }} · {{ a.lembaga || '-' }} · {{ a.kelas || '-' }}
              </p>
            </div>
            <button
              @click="deleteAbsensi(a)"
              class="text-rose-500 hover:bg-rose-50 p-2 rounded-lg cursor-pointer"
              title="Hapus"
            >
              <i class="fas fa-trash text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAbsensiSantri } from '@/composables/useAbsensiSantri'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { fmtTgl, fmtRp } from '@/utils/format'

const NAMA_BULAN = [
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
const YEAR_OPTIONS = (() => {
  const y = new Date().getFullYear()
  return [y - 2, y - 1, y, y + 1]
})()

const toast = useToast()
const confirmDlg = useConfirm()

const {
  santriList,
  filteredAbsensi,
  rekapList,
  loading,
  selectedYear,
  selectedMonth,
  selectedLembaga,
  selectedKelas,
  selectedStatus,
  statusOptions,
  hadirCount,
  alfaCount,
  sakitCount,
  izinCount,
  uniqueLembaga,
  uniqueKelas,
  getNamaSantri
} = useAbsensiSantri()

const activeTab = ref('rekap')
const generating = ref(false)
const exporting = ref(false)

function statusBg(s) {
  const st = String(s || '').toUpperCase()
  if (st === 'H') return 'bg-emerald-500'
  if (st === 'A') return 'bg-rose-500'
  if (st === 'S') return 'bg-amber-500'
  if (st === 'I') return 'bg-purple-500'
  return 'bg-slate-400'
}

async function deleteAbsensi(a) {
  const ok = await confirmDlg({
    title: 'Hapus absensi?',
    message: `Hapus absensi ${getNamaSantri(a.santri_id)}?`,
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    await deleteDoc(doc(db, 'absensi_bulanan', String(a.id)))
    toast.success('Absensi dihapus')
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  }
}

// Generate ke Rapor — aggregate per santri per semester, simpan ke rapor_semester
async function generateKeRapor() {
  if (generating.value) return
  const ok = await confirmDlg({
    title: 'Generate absensi ke Rapor?',
    message: `Rekap ${NAMA_BULAN[selectedMonth.value - 1]} ${selectedYear.value} akan di-tulis ke rapor_semester per santri. Lanjutkan?`,
    confirmText: 'Generate'
  })
  if (!ok) return
  generating.value = true
  try {
    const m = selectedMonth.value
    const y = selectedYear.value
    const semester = m >= 7 ? 'Ganjil' : 'Genap'
    const tahunAjaran = m >= 7 ? `${y}-${y + 1}` : `${y - 1}-${y}`
    const periodKey = `${tahunAjaran}_${semester}`.replace(/[^a-zA-Z0-9_]/g, '_')
    let updated = 0
    for (const rek of rekapList.value) {
      try {
        const docId = `${periodKey}_${rek.santri_id}`
        await setDoc(
          doc(db, 'rapor_semester', docId),
          {
            santri_id: rek.santri_id,
            nama: rek.nama,
            periode: periodKey,
            semester,
            tahunAjaran,
            absensi: { hadir: rek.hadir, alfa: rek.alfa, sakit: rek.sakit, izin: rek.izin },
            generated_at: serverTimestamp()
          },
          { merge: true }
        )
        updated++
      } catch (e) {
        console.warn('[gen rapor]', rek.santri_id, e?.message)
      }
    }
    toast.success(`Generate ${updated} rapor periode ${tahunAjaran} ${semester}`)
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    generating.value = false
  }
}

async function exportExcel() {
  if (exporting.value) return
  exporting.value = true
  try {
    const { useExcel } = await import('@/composables/useExcel')
    const { exportStyled } = useExcel()
    const rows = rekapList.value.map((r, i) => ({
      no: i + 1,
      nama: r.nama,
      lembaga: r.lembaga,
      kelas: r.kelas,
      hadir: r.hadir,
      alfa: r.alfa,
      sakit: r.sakit,
      izin: r.izin,
      total: r.total
    }))
    await exportStyled(rows, {
      filename: `absensi_santri_${selectedYear.value}_${String(selectedMonth.value).padStart(2, '0')}.xlsx`,
      sheetName: 'Absensi',
      subtitle: `Rekap Absensi Santri Non-Mukim · ${NAMA_BULAN[selectedMonth.value - 1]} ${selectedYear.value}`,
      columns: [
        { key: 'no', header: 'No', width: 5 },
        { key: 'nama', header: 'Nama', width: 25 },
        { key: 'lembaga', header: 'Lembaga', width: 14 },
        { key: 'kelas', header: 'Kelas', width: 10 },
        { key: 'hadir', header: 'H', width: 6 },
        { key: 'alfa', header: 'A', width: 6 },
        { key: 'sakit', header: 'S', width: 6 },
        { key: 'izin', header: 'I', width: 6 },
        { key: 'total', header: 'Total', width: 8 }
      ]
    })
    toast.success(`Ekspor ${rows.length} baris ke Excel`)
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    exporting.value = false
  }
}

async function exportPdf() {
  try {
    const { createPdf } = await import('@/utils/pdfBuilder').catch(() => ({ createPdf: null }))
    if (!createPdf) {
      toast.warning('PDF builder belum tersedia — pakai Excel dulu')
      return
    }
    const doc = createPdf({ orientation: 'portrait' })
    doc.setFontSize(14)
    doc.text(
      `Rekap Absensi Santri · ${NAMA_BULAN[selectedMonth.value - 1]} ${selectedYear.value}`,
      105,
      15,
      { align: 'center' }
    )
    doc.autoTable({
      startY: 25,
      head: [['No', 'Nama', 'Lembaga', 'Kelas', 'H', 'A', 'S', 'I', 'Total']],
      body: rekapList.value.map((r, i) => [
        i + 1,
        r.nama,
        r.lembaga,
        r.kelas,
        r.hadir,
        r.alfa,
        r.sakit,
        r.izin,
        r.total
      ]),
      styles: { font: 'times', fontSize: 9 },
      headStyles: { fillColor: [13, 148, 136] }
    })
    doc.save(
      `absensi_santri_${selectedYear.value}_${String(selectedMonth.value).padStart(2, '0')}.pdf`
    )
    toast.success('PDF ter-generate')
  } catch (e) {
    toast.error('Gagal PDF: ' + (e?.message || e))
  }
}
</script>
