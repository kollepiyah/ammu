<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- Header -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h1 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
        <i class="fas fa-graduation-cap text-purple-500 mr-1"></i>Rapor Semester
      </h1>
      <p class="text-[11px] text-slate-500 dark:text-slate-400">
        Pilih santri lalu cetak/simpan rapor. Absensi auto dari Generate ke Rapor.
      </p>
    </div>

    <!-- Filter periode + lembaga -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-2"
    >
      <select
        v-model="filterTahunAjaran"
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
      >
        <option v-for="t in TAHUN_AJARAN" :key="t" :value="t">{{ t }}</option>
      </select>
      <select
        v-model="filterSemester"
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
      >
        <option value="Ganjil">Ganjil</option>
        <option value="Genap">Genap</option>
      </select>
      <select
        v-model="filterLembaga"
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
      >
        <option value="">Semua lembaga</option>
        <option v-for="l in LEMBAGA_OPTIONS" :key="l" :value="l">{{ l }}</option>
      </select>
      <select
        v-model="filterKelas"
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
      >
        <option value="">Semua kelas</option>
        <option v-for="k in uniqueKelas" :key="k" :value="k">{{ k }}</option>
      </select>
    </div>

    <!-- Search santri -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="relative">
        <i
          class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
        ></i>
        <input
          v-model="search"
          type="text"
          placeholder="Cari nama santri..."
          class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>
    </div>

    <!-- List santri -->
    <div v-if="!selectedSantri" class="space-y-2">
      <div v-if="loading" class="bg-white rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-purple-500 text-3xl mb-2"></i>
        <p class="text-sm text-slate-500">Memuat...</p>
      </div>
      <div
        v-else-if="filteredSantri.length === 0"
        class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center"
      >
        <i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i>
        <p class="text-sm text-slate-500 italic">Tidak ada santri yang cocok.</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <button
          v-for="s in filteredSantri"
          :key="s.id"
          @click="selectSantri(s)"
          class="bg-white hover:bg-purple-50 rounded-xl p-3 border border-slate-200 hover:border-purple-300 shadow-sm transition text-left flex items-center gap-3"
        >
          <div
            class="w-10 h-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-user-graduate"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 truncate">{{ s.nama }}</p>
            <p class="text-[10px] text-slate-500">
              {{ s.lembaga }} · Kelas {{ s.kelas || '-' }} · NIS: {{ s.nis || '-' }}
            </p>
          </div>
          <i class="fas fa-chevron-right text-slate-300"></i>
        </button>
      </div>
    </div>

    <!-- Detail Rapor -->
    <div v-else class="space-y-3">
      <!-- Header rapor + tombol kembali + cetak -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center gap-2"
      >
        <button
          @click="selectedSantri = null"
          class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg"
        >
          <i class="fas fa-arrow-left mr-1"></i>Kembali
        </button>
        <h3 class="text-base font-black text-slate-800 dark:text-white flex-1 min-w-[200px]">
          {{ selectedSantri.nama }} — {{ filterSemester }} {{ filterTahunAjaran }}
        </h3>
        <button
          @click="cetakPdf"
          class="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-lg"
        >
          <i class="fas fa-print mr-1"></i>Cetak PDF
        </button>
        <button
          @click="simpanRapor"
          :disabled="saving"
          class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg"
        >
          <i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>Simpan
        </button>
      </div>

      <!-- Identitas -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <h4 class="text-xs font-black text-slate-700 uppercase tracking-wide mb-2">
          <i class="fas fa-id-card text-blue-500 mr-1"></i>Identitas Santri
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div><b>Nama:</b> {{ selectedSantri.nama }}</div>
          <div><b>NIS:</b> {{ selectedSantri.nis || '-' }}</div>
          <div>
            <b>Lembaga:</b> {{ selectedSantri.lembaga }}
            {{ selectedSantri.shift ? '(' + selectedSantri.shift + ')' : '' }}
          </div>
          <div><b>Kelas:</b> {{ selectedSantri.kelas || '-' }}</div>
          <div v-if="selectedSantri.juz"><b>Juz:</b> {{ selectedSantri.juz }}</div>
          <div><b>Wali:</b> {{ selectedSantri.wali || '-' }}</div>
        </div>
      </div>

      <!-- Absensi auto-rekap -->
      <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border-2 border-emerald-200">
        <h4 class="text-xs font-black text-emerald-800 uppercase tracking-wide mb-2">
          <i class="fas fa-clipboard-check mr-1"></i>Absensi Semester · {{ filterSemester }}
          {{ filterTahunAjaran }}
        </h4>
        <p v-if="!raporCurrent?.absensi" class="text-xs text-emerald-700 italic">
          Belum ada data absensi. Jalankan "Generate ke Rapor" di menu Absensi Santri dulu.
        </p>
        <div v-else class="grid grid-cols-4 gap-2 text-center">
          <div class="bg-white rounded-lg p-2">
            <p class="text-2xl font-black text-emerald-700">
              {{ raporCurrent.absensi.hadir || 0 }}
            </p>
            <p class="text-[10px] uppercase text-slate-500">Hadir</p>
          </div>
          <div class="bg-white rounded-lg p-2">
            <p class="text-2xl font-black text-rose-700">{{ raporCurrent.absensi.alfa || 0 }}</p>
            <p class="text-[10px] uppercase text-slate-500">Alfa</p>
          </div>
          <div class="bg-white rounded-lg p-2">
            <p class="text-2xl font-black text-amber-700">{{ raporCurrent.absensi.sakit || 0 }}</p>
            <p class="text-[10px] uppercase text-slate-500">Sakit</p>
          </div>
          <div class="bg-white rounded-lg p-2">
            <p class="text-2xl font-black text-purple-700">{{ raporCurrent.absensi.izin || 0 }}</p>
            <p class="text-[10px] uppercase text-slate-500">Izin</p>
          </div>
        </div>
      </div>

      <!-- Riwayat Kenaikan (kumulatif) -->
      <div
        v-if="riwayatKenaikan.length > 0"
        class="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 border-2 border-amber-200"
      >
        <h4 class="text-xs font-black text-amber-800 uppercase tracking-wide mb-2">
          <i class="fas fa-history mr-1"></i>Riwayat Kenaikan
        </h4>
        <div class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead class="bg-amber-100">
              <tr>
                <th class="px-2 py-1 text-left font-black">No</th>
                <th class="px-2 py-1 text-left font-black">Tgl Naik</th>
                <th class="px-2 py-1 text-left font-black">Dari</th>
                <th class="px-2 py-1 text-left font-black">Ke</th>
                <th class="px-2 py-1 text-left font-black">Catatan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in riwayatKenaikan" :key="i" class="border-t border-amber-200">
                <td class="px-2 py-1">{{ i + 1 }}</td>
                <td class="px-2 py-1">{{ r.tgl_naik || '-' }}</td>
                <td class="px-2 py-1">{{ r.kelas_from || '-' }}</td>
                <td class="px-2 py-1 font-bold">{{ r.kelas_to || '-' }}</td>
                <td class="px-2 py-1 italic">{{ r.catatan || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Nilai per Mapel (manual) -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-xs font-black text-slate-700 uppercase tracking-wide">
            <i class="fas fa-list-ol text-purple-500 mr-1"></i>Nilai Mapel
          </h4>
          <button
            @click="addMapel"
            class="text-[10px] bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold px-2 py-1 rounded"
          >
            <i class="fas fa-plus mr-1"></i>Tambah Mapel
          </button>
        </div>
        <div v-if="mapelList.length === 0" class="text-center py-4 text-xs text-slate-400 italic">
          Belum ada nilai. Klik Tambah Mapel.
        </div>
        <div v-else class="space-y-1.5">
          <div
            v-for="(m, idx) in mapelList"
            :key="idx"
            class="grid grid-cols-[1fr_100px_100px_30px] gap-2 items-center bg-slate-50 rounded-lg p-2"
          >
            <input
              v-model="m.nama"
              type="text"
              placeholder="Nama mapel"
              class="text-xs px-2 py-1 border border-slate-300 rounded bg-white"
            />
            <input
              v-model.number="m.nilai"
              type="number"
              min="0"
              max="100"
              placeholder="Nilai"
              class="text-xs px-2 py-1 border border-slate-300 rounded bg-white text-center font-bold"
            />
            <input
              v-model="m.predikat"
              type="text"
              placeholder="A/B/C"
              class="text-xs px-2 py-1 border border-slate-300 rounded bg-white text-center"
            />
            <button
              @click="mapelList.splice(idx, 1)"
              class="text-rose-500 hover:bg-rose-50 p-1 rounded"
            >
              <i class="fas fa-trash text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Catatan Wali Kelas -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <h4 class="text-xs font-black text-slate-700 uppercase tracking-wide mb-2">
          <i class="fas fa-comment text-cyan-500 mr-1"></i>Catatan Wali Kelas
        </h4>
        <textarea
          v-model="catatanWali"
          rows="3"
          placeholder="Catatan untuk santri / wali..."
          class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useToast } from '@/composables/useToast'

const toast = useToast()
const LEMBAGA_OPTIONS = [
  'TPQ Pagi',
  'TPQ Sore',
  'Pra PTPT',
  'PTPT',
  'PPPH',
  'TK A',
  'TK B',
  'SDI',
  'PKBM'
]
const TAHUN_AJARAN = (() => {
  const y = new Date().getFullYear()
  return [`${y - 2}-${y - 1}`, `${y - 1}-${y}`, `${y}-${y + 1}`]
})()

const santriList = ref([])
const loading = ref(true)
const search = ref('')
const filterTahunAjaran = ref(TAHUN_AJARAN[1])
const filterSemester = ref('Ganjil')
const filterLembaga = ref('')
const filterKelas = ref('')
const selectedSantri = ref(null)
const raporCurrent = ref(null)
const mapelList = ref([])
const catatanWali = ref('')
const saving = ref(false)
let unsub = null

const filteredSantri = computed(() => {
  let list = santriList.value.filter((s) => s.aktif !== false)
  if (filterLembaga.value) {
    const fl = filterLembaga.value.toLowerCase()
    list = list.filter((s) => {
      const lmb = String(s.lembaga || '').toLowerCase()
      if (fl === 'tpq pagi')
        return (
          lmb === 'tpq pagi' || (lmb === 'tpq' && String(s.shift || '').toLowerCase() === 'pagi')
        )
      if (fl === 'tpq sore')
        return (
          lmb === 'tpq sore' || (lmb === 'tpq' && String(s.shift || '').toLowerCase() === 'sore')
        )
      return lmb === fl
    })
  }
  if (filterKelas.value) list = list.filter((s) => String(s.kelas || '') === filterKelas.value)
  const kw = search.value.trim().toLowerCase()
  if (kw)
    list = list.filter(
      (s) =>
        String(s.nama || '')
          .toLowerCase()
          .includes(kw) ||
        String(s.nis || '')
          .toLowerCase()
          .includes(kw)
    )
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
})

const uniqueKelas = computed(() => {
  const set = new Set()
  for (const s of santriList.value) {
    if (
      filterLembaga.value &&
      String(s.lembaga || '').toLowerCase() !== filterLembaga.value.toLowerCase()
    )
      continue
    if (s.kelas) set.add(s.kelas)
  }
  return [...set].sort()
})

const riwayatKenaikan = computed(() => {
  if (!selectedSantri.value || !Array.isArray(selectedSantri.value.riwayat)) return []
  return selectedSantri.value.riwayat
})

async function selectSantri(s) {
  selectedSantri.value = s
  await loadRapor()
}

async function loadRapor() {
  if (!selectedSantri.value) return
  const periodKey = `${filterTahunAjaran.value}_${filterSemester.value}`.replace(
    /[^a-zA-Z0-9_]/g,
    '_'
  )
  const docId = `${periodKey}_${selectedSantri.value.id}`
  try {
    const snap = await getDoc(doc(db, 'rapor_semester', docId))
    if (snap.exists()) {
      const d = snap.data()
      raporCurrent.value = d
      mapelList.value = Array.isArray(d.mapel) ? [...d.mapel] : []
      catatanWali.value = d.catatan_wali || ''
    } else {
      raporCurrent.value = { absensi: null }
      mapelList.value = []
      catatanWali.value = ''
    }
  } catch (e) {
    console.warn('[loadRapor] fail:', e?.message)
  }
}

watch([filterTahunAjaran, filterSemester], loadRapor)

function addMapel() {
  mapelList.value.push({ nama: '', nilai: 0, predikat: '' })
}

async function simpanRapor() {
  if (!selectedSantri.value || saving.value) return
  saving.value = true
  try {
    const periodKey = `${filterTahunAjaran.value}_${filterSemester.value}`.replace(
      /[^a-zA-Z0-9_]/g,
      '_'
    )
    const docId = `${periodKey}_${selectedSantri.value.id}`
    await setDoc(
      doc(db, 'rapor_semester', docId),
      {
        santri_id: selectedSantri.value.id,
        nama: selectedSantri.value.nama,
        periode: periodKey,
        semester: filterSemester.value,
        tahunAjaran: filterTahunAjaran.value,
        mapel: mapelList.value.filter((m) => m.nama),
        catatan_wali: catatanWali.value,
        updated_at: serverTimestamp()
      },
      { merge: true }
    )
    toast.success('Rapor tersimpan')
    await loadRapor()
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}

async function cetakPdf() {
  try {
    const { createPdf } = await import('@/utils/pdfBuilder').catch(() => ({ createPdf: null }))
    if (!createPdf) {
      toast.warning('PDF builder belum tersedia')
      return
    }
    const doc = createPdf({ orientation: 'portrait' })
    const s = selectedSantri.value
    doc.setFontSize(16)
    doc.setFont('times', 'bold')
    doc.text('RAPOR SEMESTER', 105, 15, { align: 'center' })
    doc.setFontSize(11)
    doc.text(`${filterSemester.value} · ${filterTahunAjaran.value}`, 105, 22, { align: 'center' })
    doc.setFont('times', 'normal')
    doc.setFontSize(10)
    let y = 32
    doc.text(`Nama: ${s.nama}`, 14, y)
    y += 6
    doc.text(`NIS: ${s.nis || '-'}`, 14, y)
    y += 6
    doc.text(`Lembaga: ${s.lembaga || '-'} ${s.shift ? '(' + s.shift + ')' : ''}`, 14, y)
    y += 6
    doc.text(`Kelas: ${s.kelas || '-'}${s.juz ? ' · Juz ' + s.juz : ''}`, 14, y)
    y += 6
    doc.text(`Wali: ${s.wali || '-'}`, 14, y)
    y += 8

    // Absensi
    if (raporCurrent.value?.absensi) {
      doc.setFont('times', 'bold')
      doc.text('ABSENSI SEMESTER', 14, y)
      y += 5
      doc.setFont('times', 'normal')
      const a = raporCurrent.value.absensi
      doc.text(
        `Hadir: ${a.hadir || 0}   Alfa: ${a.alfa || 0}   Sakit: ${a.sakit || 0}   Izin: ${a.izin || 0}`,
        14,
        y
      )
      y += 8
    }

    // Mapel
    if (mapelList.value.length > 0) {
      doc.autoTable({
        startY: y,
        head: [['No', 'Mapel', 'Nilai', 'Predikat']],
        body: mapelList.value
          .filter((m) => m.nama)
          .map((m, i) => [i + 1, m.nama, m.nilai, m.predikat || '-']),
        styles: { font: 'times', fontSize: 10 },
        headStyles: { fillColor: [124, 58, 237] }
      })
      y = doc.lastAutoTable.finalY + 8
    }

    // Riwayat Kenaikan (kumulatif)
    if (riwayatKenaikan.value.length > 0) {
      doc.setFont('times', 'bold')
      doc.text('RIWAYAT KENAIKAN', 14, y)
      y += 5
      doc.autoTable({
        startY: y,
        head: [['No', 'Tgl Naik', 'Dari', 'Ke', 'Catatan']],
        body: riwayatKenaikan.value.map((r, i) => [
          i + 1,
          r.tgl_naik || '-',
          r.kelas_from || '-',
          r.kelas_to || '-',
          r.catatan || '-'
        ]),
        styles: { font: 'times', fontSize: 9 },
        headStyles: { fillColor: [245, 158, 11] }
      })
      y = doc.lastAutoTable.finalY + 8
    }

    // Catatan
    if (catatanWali.value) {
      doc.setFont('times', 'bold')
      doc.text('CATATAN WALI KELAS:', 14, y)
      y += 5
      doc.setFont('times', 'normal')
      const lines = doc.splitTextToSize(catatanWali.value, 180)
      doc.text(lines, 14, y)
    }

    doc.save(
      `rapor_${s.nama.replace(/\s+/g, '_')}_${filterSemester.value}_${filterTahunAjaran.value}.pdf`
    )
    toast.success('Rapor PDF ter-generate')
  } catch (e) {
    toast.error('Gagal PDF: ' + (e?.message || e))
  }
}

onMounted(() => {
  unsub = subscribeColl('santri', (docs) => {
    santriList.value = docs
    loading.value = false
  })
})
onUnmounted(() => {
  if (unsub) {
    try {
      unsub()
    } catch (e) {}
  }
})
</script>
