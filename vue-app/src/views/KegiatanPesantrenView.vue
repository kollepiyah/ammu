<template>
  <!-- v.72.1.0526: Kegiatan Pesantren full Vue (port dari legacy kegiatan-pesantren) -->
  <div class="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
    <!-- Header gradient -->
    <div class="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-5 md:p-6 text-white shadow-lg">
      <p class="text-[10px] font-black uppercase tracking-widest opacity-90">
        <i class="fas fa-calendar-check mr-1"></i>Kegiatan Pesantren
      </p>
      <h2 class="text-lg md:text-2xl font-black mt-1">Master Kegiatan &amp; Absensi Santri Mukim</h2>
      <p class="text-xs md:text-sm font-medium mt-1 opacity-90">
        Kelola jadwal kegiatan harian, rekap absensi, dan impor fingerprint.
      </p>
    </div>

    <!-- v.72.7.0526: Tab cards compact -->
    <div class="grid grid-cols-3 gap-2 md:gap-3">
      <button
        v-for="t in TABS"
        :key="t.id"
        @click="activeTab = t.id"
        :class="[
          'group relative overflow-hidden bg-gradient-to-br rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer flex flex-col gap-1',
          t.gradient,
          activeTab === t.id ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-amber-50' : ''
        ]"
      >
        <i :class="['fas', t.icon, 'text-base md:text-lg drop-shadow']"></i>
        <h3 class="text-[11px] md:text-xs font-black leading-tight drop-shadow-sm">{{ t.name }}</h3>
        <p class="hidden md:block text-[10px] text-white/85 font-medium leading-snug">{{ t.subtitle }}</p>
      </button>
    </div>

    <!-- TAB 1: Master Kegiatan -->
    <div v-if="activeTab === 'master'" class="space-y-4">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div>
            <h3 class="text-sm md:text-base font-black text-slate-800 dark:text-white">
              <i class="fas fa-list-ul text-cyan-600 mr-2"></i>Master Kegiatan Harian
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Daftar kegiatan rutin santri mukim. Atur nama &amp; jam pelaksanaan.
            </p>
          </div>
          <button
            @click="bukaModalKegiatan()"
            class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-3 py-2 rounded-lg text-xs"
          >
            <i class="fas fa-plus mr-1"></i>Tambah Kegiatan
          </button>
        </div>
        <div v-if="masterKegiatan.length === 0" class="text-xs text-slate-400 italic text-center py-8">
          <i class="fas fa-inbox text-3xl text-slate-300 dark:text-slate-600 block mb-2"></i>
          Belum ada master kegiatan. Tambah kegiatan pertama via tombol di atas.
        </div>
        <div v-else class="space-y-2">
          <div
            v-for="(k, idx) in masterKegiatan"
            :key="idx"
            class="flex items-center gap-3 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500 px-3 py-2.5 rounded-r-lg"
          >
            <i class="fas fa-bell text-cyan-600 dark:text-cyan-400"></i>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-black text-slate-800 dark:text-white truncate">{{ k.nama }}</p>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">
                <i class="far fa-clock mr-1"></i>{{ k.jam || '—' }}
                <span v-if="k.deskripsi" class="ml-2">· {{ k.deskripsi }}</span>
              </p>
            </div>
            <button
              @click="bukaModalKegiatan(k, idx)"
              class="text-[10px] text-blue-600 hover:underline font-bold"
            >
              edit
            </button>
            <button
              @click="hapusKegiatan(idx)"
              class="text-[10px] text-rose-600 hover:underline font-bold"
            >
              hapus
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: Rekap Absensi -->
    <div v-else-if="activeTab === 'absen'" class="space-y-4">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 class="text-sm md:text-base font-black text-slate-800 dark:text-white">
            <i class="fas fa-fingerprint text-purple-600 mr-2"></i>Rekap Absensi Bulanan
          </h3>
          <div class="flex gap-2">
            <select
              v-model.number="absenBulan"
              class="text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              <option v-for="(b, i) in NAMA_BULAN" :key="i" :value="i">{{ b }}</option>
            </select>
            <select
              v-model.number="absenTahun"
              class="text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              <option v-for="t in [now.getFullYear() - 1, now.getFullYear(), now.getFullYear() + 1]" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
        </div>
        <p class="text-[11px] text-slate-500 dark:text-slate-400 italic mb-3">
          Rekap kehadiran santri mukim per kegiatan untuk periode {{ NAMA_BULAN[absenBulan] }} {{ absenTahun }}.
          Data absensi terhubung dengan fingerprint device yang di-impor pada tab Impor Fingerprint.
        </p>
        <div v-if="santriMukim.length === 0" class="text-xs text-slate-400 italic text-center py-8">
          <i class="fas fa-users text-3xl text-slate-300 dark:text-slate-600 block mb-2"></i>
          Belum ada santri mukim terdaftar. Daftarkan santri sebagai mukim via Data Santri.
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead class="bg-slate-100 dark:bg-slate-700">
              <tr>
                <th class="p-2 text-left font-black text-slate-700 dark:text-slate-200 uppercase text-[10px] tracking-widest">Nama Santri</th>
                <th class="p-2 text-center font-black text-slate-700 dark:text-slate-200 uppercase text-[10px] tracking-widest w-24">Lembaga</th>
                <th v-for="k in masterKegiatan" :key="k.nama" class="p-2 text-center font-black text-cyan-700 dark:text-cyan-300 uppercase text-[10px] tracking-widest">{{ k.nama }}</th>
                <th class="p-2 text-center font-black text-emerald-700 dark:text-emerald-300 uppercase text-[10px] tracking-widest w-16">Hadir</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in santriMukim" :key="s.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/30 border-b border-slate-100 dark:border-slate-700">
                <td class="p-2 font-bold text-slate-800 dark:text-white">{{ s.nama }}</td>
                <td class="p-2 text-center text-slate-600 dark:text-slate-300">{{ s.lembaga }}</td>
                <td v-for="k in masterKegiatan" :key="k.nama" class="p-2 text-center text-slate-400">
                  —
                </td>
                <td class="p-2 text-center font-black text-emerald-700 dark:text-emerald-300">0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-[10px] text-slate-400 italic mt-3 text-center">
          <i class="fas fa-info-circle mr-1"></i>
          Detail per-tanggal &amp; sinkronisasi fingerprint memerlukan integrasi device — coming v.73.
        </p>
      </div>
    </div>

    <!-- TAB 3: Impor Fingerprint -->
    <div v-else-if="activeTab === 'impor'" class="space-y-4">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 class="text-sm md:text-base font-black text-slate-800 dark:text-white mb-3">
          <i class="fas fa-file-import text-blue-600 mr-2"></i>Impor Fingerprint
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Upload file rekap fingerprint device (.xlsx atau .csv) untuk mengimpor data kehadiran santri mukim.
        </p>

        <div class="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 text-center">
          <i class="fas fa-cloud-upload-alt text-4xl text-slate-400 dark:text-slate-500 mb-3"></i>
          <p class="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Drag &amp; drop file di sini</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">atau klik untuk pilih file</p>
          <input
            ref="fileInput"
            type="file"
            accept=".xlsx,.csv"
            @change="handleFileUpload"
            class="hidden"
          />
          <button
            @click="$refs.fileInput.click()"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs"
          >
            <i class="fas fa-folder-open mr-1"></i>Pilih File
          </button>
          <p v-if="fileName" class="text-[11px] text-emerald-600 dark:text-emerald-400 mt-3 font-bold">
            <i class="fas fa-check-circle mr-1"></i>{{ fileName }}
            <span v-if="importParsing" class="ml-2 text-blue-600"><i class="fas fa-spinner fa-spin"></i> Parsing…</span>
          </p>
          <div v-if="!importParsing && (importStats.ok > 0 || importStats.error > 0)" class="mt-3 text-left text-[11px] bg-white dark:bg-slate-800 rounded-lg p-2 border border-slate-200 dark:border-slate-700">
            <div class="font-bold mb-1">
              <span class="text-emerald-600">OK: {{ importStats.ok }}</span>
              <span class="text-rose-600 ml-3">Error: {{ importStats.error }}</span>
            </div>
            <ul v-if="importStats.errors.length" class="list-disc list-inside text-rose-600 dark:text-rose-400">
              <li v-for="(er, i) in importStats.errors" :key="i">{{ er }}</li>
              <li v-if="importStats.error > importStats.errors.length" class="italic text-slate-500">… (+{{ importStats.error - importStats.errors.length }} lainnya)</li>
            </ul>
          </div>
        </div>

        <div class="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-3">
          <p class="text-[11px] text-amber-800 dark:text-amber-200">
            <i class="fas fa-exclamation-triangle mr-1"></i>
            <strong>Format CSV/XLSX:</strong> kolom <code>tanggal, jam, fingerprint_id (atau nama), kegiatan</code>.
            Tanggal: <code>YYYY-MM-DD</code> atau <code>DD-MM-YYYY</code>. Hanya santri <strong>mukim</strong> yang masuk; nama kegiatan match (case-insensitive) ke Master Kegiatan.
          </p>
        </div>
      </div>
    </div>

    <!-- Modal Tambah/Edit Kegiatan -->
    <div
      v-if="modalOpen"
      @click.self="modalOpen = false"
      class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md">
        <form @submit.prevent="simpanKegiatan" class="p-5">
          <h3 class="text-base font-black text-slate-800 dark:text-white mb-4">
            <i :class="['fas', form.idx !== null ? 'fa-edit' : 'fa-plus-circle', 'text-cyan-600 mr-2']"></i>
            {{ form.idx !== null ? 'Edit Kegiatan' : 'Tambah Kegiatan' }}
          </h3>
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Nama Kegiatan *</label>
              <input
                v-model="form.nama"
                required
                type="text"
                placeholder="Contoh: Sholat Shubuh Jamaah"
                class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Jam Pelaksanaan</label>
              <input
                v-model="form.jam"
                type="text"
                placeholder="04:00 - 04:30"
                class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Deskripsi (opsional)</label>
              <textarea
                v-model="form.deskripsi"
                rows="2"
                class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white resize-none"
              ></textarea>
            </div>
          </div>
          <div class="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-700">
            <button
              type="button"
              @click="modalOpen = false"
              class="text-xs font-bold px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="text-xs font-bold px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50"
            >
              {{ saving ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useSantri } from '@/composables/useSantri'
import { useToast } from '@/composables/useToast'
import { useExcel } from '@/composables/useExcel'
import { doc, setDoc, writeBatch } from 'firebase/firestore'
import { db } from '@/services/firebase'

const { importFile } = useExcel()

const settings = useSettingsStore()
const { santriRaw } = useSantri()
const toast = useToast()

// v.72.2.0526: gradient cards
const TABS = [
  { id: 'master', name: 'Master Kegiatan', subtitle: 'Atur daftar kegiatan harian', icon: 'fa-list-ul', gradient: 'from-cyan-500 to-cyan-700' },
  { id: 'absen', name: 'Rekap Absensi', subtitle: 'Lihat kehadiran santri mukim', icon: 'fa-fingerprint', gradient: 'from-purple-500 to-purple-700' },
  { id: 'impor', name: 'Impor Fingerprint', subtitle: 'Upload data device .xlsx/.csv', icon: 'fa-file-import', gradient: 'from-blue-500 to-blue-700' }
]
const activeTab = ref('master')

const NAMA_BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const now = new Date()
const absenBulan = ref(now.getMonth())
const absenTahun = ref(now.getFullYear())

const masterKegiatan = computed(() => {
  const arr = settings.settings?.master_kegiatan
  return Array.isArray(arr) ? arr : []
})

const santriMukim = computed(() =>
  santriRaw.value.filter((s) => s.aktif !== false && s.is_mukim === true).sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || '')))
)

const modalOpen = ref(false)
const saving = ref(false)
const form = reactive({
  idx: null,
  nama: '',
  jam: '',
  deskripsi: ''
})

function bukaModalKegiatan(k = null, idx = null) {
  if (k) {
    form.idx = idx
    form.nama = k.nama || ''
    form.jam = k.jam || ''
    form.deskripsi = k.deskripsi || ''
  } else {
    form.idx = null
    form.nama = ''
    form.jam = ''
    form.deskripsi = ''
  }
  modalOpen.value = true
}

async function simpanKegiatan() {
  if (!form.nama.trim()) {
    toast.warning('Nama kegiatan wajib diisi')
    return
  }
  saving.value = true
  try {
    const arr = [...masterKegiatan.value]
    const payload = {
      nama: form.nama.trim(),
      jam: form.jam.trim(),
      deskripsi: form.deskripsi.trim()
    }
    if (form.idx !== null) {
      arr[form.idx] = payload
    } else {
      arr.push(payload)
    }
    await setDoc(doc(db, 'settings', 'general'), { master_kegiatan: arr }, { merge: true })
    await setDoc(doc(db, 'settings', 'web'), { master_kegiatan: arr }, { merge: true })
    toast.success(form.idx !== null ? 'Diperbarui' : 'Tersimpan')
    modalOpen.value = false
  } catch (err) {
    toast.error('Error: ' + (err.message || err))
  } finally {
    saving.value = false
  }
}

async function hapusKegiatan(idx) {
  if (!confirm(`Hapus kegiatan "${masterKegiatan.value[idx].nama}"?`)) return
  try {
    const arr = [...masterKegiatan.value]
    arr.splice(idx, 1)
    await setDoc(doc(db, 'settings', 'general'), { master_kegiatan: arr }, { merge: true })
    await setDoc(doc(db, 'settings', 'web'), { master_kegiatan: arr }, { merge: true })
    toast.success('Dihapus')
  } catch (err) {
    toast.error('Error: ' + (err.message || err))
  }
}

// v.20.46.0526: Impor Fingerprint santri REAL parser
const fileName = ref('')
const importParsing = ref(false)
const importStats = ref({ ok: 0, error: 0, errors: [] })
async function handleFileUpload(e) {
  const file = e.target.files?.[0]
  if (!file) return
  fileName.value = file.name
  importParsing.value = true
  importStats.value = { ok: 0, error: 0, errors: [] }
  try {
    const rows = await importFile(file)
    if (!rows.length) {
      toast.warning('File kosong / tidak ada data')
      return
    }
    const batch = writeBatch(db)
    let ok = 0
    let err = 0
    const errMsgs = []
    const allSantri = santriRaw.value
    const kegList = masterKegiatan.value
    for (const row of rows) {
      try {
        const tanggalRaw = row.tanggal || row.Tanggal || row.tgl || row.Tgl || row.TANGGAL || ''
        const fpId = row.fingerprint_id || row.fingerprint || row.fp_id || row.FP || row.santri_id || row.id || ''
        const namaSantri = row.nama || row.Nama || row.santri || row.Santri || ''
        const kegRaw = row.kegiatan || row.Kegiatan || row.KEGIATAN || row.activity || ''
        const jam = row.jam || row.Jam || row.JAM || ''
        if (!tanggalRaw || (!fpId && !namaSantri)) { err++; errMsgs.push(`Row ${ok+err}: tanggal/santri kosong`); continue }
        let tgl = String(tanggalRaw)
        const dmy = tgl.match(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/)
        if (dmy) tgl = `${dmy[3]}-${dmy[2]}-${dmy[1]}`
        let santri = null
        if (fpId) santri = allSantri.find((s) => String(s.fingerprint_id || s.fp_id || '') === String(fpId))
        if (!santri && namaSantri) santri = allSantri.find((s) => String(s.nama || '').toLowerCase().trim() === String(namaSantri).toLowerCase().trim())
        if (!santri) { err++; errMsgs.push(`Row: santri ${fpId || namaSantri} tidak ditemukan`); continue }
        if (santri.is_mukim !== true) { err++; errMsgs.push(`Row: ${santri.nama} bukan mukim, skip`); continue }
        let kegNama = String(kegRaw || '').trim()
        if (kegNama && kegList.length) {
          const matched = kegList.find((k) => String(k.nama || '').toLowerCase().trim() === kegNama.toLowerCase())
          if (matched) kegNama = matched.nama
        }
        if (!kegNama) kegNama = (kegList[0] && kegList[0].nama) || 'Kegiatan'
        const kegSlug = kegNama.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'keg'
        const docId = `keg_${santri.id}_${tgl}_${kegSlug}`
        batch.set(doc(db, 'absensi_kegiatan', docId), {
          id: docId,
          santri_id: santri.id,
          santri_nama: santri.nama,
          tanggal: tgl,
          jam: jam || '',
          kegiatan: kegNama,
          status: 'hadir',
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
    importStats.value = { ok, error: err, errors: errMsgs.slice(0, 5) }
    if (ok > 0) toast.success(`Impor selesai: ${ok} OK, ${err} error`)
    else toast.error(`Impor gagal: 0 OK, ${err} error. Cek format kolom.`)
  } catch (er) {
    toast.error('Parse gagal: ' + (er.message || er))
  } finally {
    importParsing.value = false
    e.target.value = ''
  }
}
</script>
