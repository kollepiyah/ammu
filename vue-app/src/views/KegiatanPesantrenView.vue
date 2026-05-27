<template>
  <div class="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
    <!-- Hero banner -->
    <div
      class="bg-gradient-to-br from-cyan-600 dark:from-cyan-800 to-cyan-700 dark:to-cyan-900 rounded-2xl p-5 md:p-6 text-white shadow-lg"
    >
      <p class="text-[10px] font-black uppercase tracking-widest opacity-90">
        <i class="fas fa-calendar-check mr-1"></i>Kegiatan Pesantren
      </p>
      <h2 class="text-lg md:text-2xl font-black mt-1">
        Master Kegiatan &amp; Absensi Santri Mukim
      </h2>
      <p class="text-xs md:text-sm font-medium mt-1 opacity-90">
        Kelola jadwal kegiatan harian, rekap absensi, dan impor fingerprint.
      </p>
    </div>

    <!-- Tab buttons -->
    <div class="grid grid-cols-3 gap-2 md:gap-3">
      <button
        v-for="tab in TABS"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'group relative overflow-hidden bg-gradient-to-br rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer flex flex-col gap-1',
          tab.gradient,
          activeTab === tab.id ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-cyan-50' : ''
        ]"
      >
        <i :class="['fas', tab.icon, 'text-base md:text-lg drop-shadow']"></i>
        <h3 class="text-[11px] md:text-xs font-black leading-tight drop-shadow-sm">
          {{ tab.name }}
        </h3>
        <p class="hidden md:block text-[10px] text-white/85 font-medium leading-snug">
          {{ tab.subtitle }}
        </p>
      </button>
    </div>

    <!-- TAB: Master Kegiatan -->
    <div v-if="activeTab === 'master'" class="space-y-4">
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div>
            <h3 class="text-sm md:text-base font-black text-[var(--text-primary)]">
              <i class="fas fa-list-ul text-cyan-600 mr-2"></i>Master Kegiatan Harian
            </h3>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">
              Daftar kegiatan rutin santri mukim. Atur nama &amp; jam pelaksanaan.
            </p>
          </div>
          <button
            @click="openModal()"
            class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-3 py-2 rounded-lg text-xs"
          >
            <i class="fas fa-plus mr-1"></i>Tambah Kegiatan
          </button>
        </div>
        <div
          v-if="masterKegiatan.length === 0"
          class="text-xs text-[var(--text-tertiary)] italic text-center py-8"
        >
          <i class="fas fa-inbox text-3xl text-slate-300 dark:text-[var(--text-secondary)] block mb-2"></i>
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
              <p class="text-sm font-black text-[var(--text-primary)] truncate">{{ k.nama }}</p>
              <p class="text-[11px] text-[var(--text-secondary)]">
                <i class="far fa-clock mr-1"></i>{{ k.jam || '—' }}
                <span v-if="k.deskripsi" class="ml-2">· {{ k.deskripsi }}</span>
              </p>
            </div>
            <button
              @click="openModal(k, idx)"
              class="text-[10px] text-cyan-600 hover:underline font-bold"
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

    <!-- TAB: Rekap Absensi -->
    <div v-else-if="activeTab === 'absen'" class="space-y-4">
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 class="text-sm md:text-base font-black text-[var(--text-primary)]">
            <i class="fas fa-fingerprint text-teal-600 mr-2"></i>Rekap Absensi Bulanan
          </h3>
          <div class="flex gap-2">
            <select
              v-model.number="bulanFilter"
              class="text-xs px-3 py-1.5 border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
            >
              <option v-for="(b, i) in NAMA_BULAN" :key="i" :value="i">{{ b }}</option>
            </select>
            <select
              v-model.number="tahunFilter"
              class="text-xs px-3 py-1.5 border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
            >
              <option v-for="y in tahunOptions" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
        </div>
        <p class="text-[11px] text-[var(--text-secondary)] italic mb-3">
          Rekap kehadiran santri mukim per kegiatan untuk periode {{ NAMA_BULAN[bulanFilter] }}
          {{ tahunFilter }}. Data absensi terhubung dengan fingerprint device yang di-impor pada tab
          Impor Fingerprint.
        </p>
        <div v-if="santriMukim.length === 0" class="text-xs text-[var(--text-tertiary)] italic text-center py-8">
          <i class="fas fa-users text-3xl text-slate-300 dark:text-[var(--text-secondary)] block mb-2"></i>
          Belum ada santri mukim terdaftar. Daftarkan santri sebagai mukim via Data Santri.
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead class="bg-[var(--bg-muted)]">
              <tr>
                <th
                  class="p-2 text-left font-black text-[var(--text-primary)] uppercase text-[10px] tracking-widest"
                >
                  Nama Santri
                </th>
                <th
                  class="p-2 text-center font-black text-[var(--text-primary)] uppercase text-[10px] tracking-widest w-24"
                >
                  Lembaga
                </th>
                <th
                  v-for="k in masterKegiatan"
                  :key="k.nama"
                  class="p-2 text-center font-black text-cyan-700 dark:text-cyan-300 uppercase text-[10px] tracking-widest"
                >
                  {{ k.nama }}
                </th>
                <th
                  class="p-2 text-center font-black text-emerald-700 dark:text-emerald-300 uppercase text-[10px] tracking-widest w-16"
                >
                  Hadir
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="s in santriMukim"
                :key="s.id"
                class="hover:bg-slate-50 dark:hover:bg-slate-700/30 border-b border-[var(--border-subtle)]"
              >
                <td class="p-2 font-bold text-[var(--text-primary)]">{{ s.nama }}</td>
                <td class="p-2 text-center text-[var(--text-secondary)]">{{ s.lembaga }}</td>
                <td
                  v-for="k in masterKegiatan"
                  :key="k.nama"
                  class="p-2 text-center text-[var(--text-tertiary)]"
                >
                  —
                </td>
                <td class="p-2 text-center font-black text-emerald-700 dark:text-emerald-300">0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-[10px] text-[var(--text-tertiary)] italic mt-3 text-center">
          <i class="fas fa-info-circle mr-1"></i>
          Detail per-tanggal &amp; sinkronisasi fingerprint memerlukan integrasi device — coming
          v.73.
        </p>
      </div>
    </div>

    <!-- TAB: Impor Fingerprint -->
    <div v-else-if="activeTab === 'impor'" class="space-y-4">
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3 class="text-sm md:text-base font-black text-[var(--text-primary)] mb-3">
          <i class="fas fa-file-import text-cyan-600 mr-2"></i>Impor Fingerprint
        </h3>
        <p class="text-xs text-[var(--text-secondary)] mb-4">
          Upload file rekap fingerprint device (.xlsx atau .csv) untuk mengimpor data kehadiran
          santri mukim.
        </p>
        <div
          class="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 border-2 border-dashed border-[var(--border-default)] text-center"
        >
          <i class="fas fa-cloud-upload-alt text-4xl text-[var(--text-tertiary)] mb-3"></i>
          <p class="text-sm font-bold text-[var(--text-primary)] mb-1">
            Drag &amp; drop file di sini
          </p>
          <p class="text-xs text-[var(--text-secondary)] mb-3">atau klik untuk pilih file</p>
          <input
            ref="fileInput"
            type="file"
            accept=".xlsx,.csv"
            @change="onFileChange"
            class="hidden"
          />
          <button
            @click="$refs.fileInput.click()"
            class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-4 py-2 rounded-lg text-xs"
          >
            <i class="fas fa-folder-open mr-1"></i>Pilih File
          </button>
          <p
            v-if="fileName"
            class="text-[11px] text-emerald-600 dark:text-emerald-400 mt-3 font-bold"
          >
            <i class="fas fa-check-circle mr-1"></i>{{ fileName }}
            <span v-if="isProcessing" class="ml-2 text-cyan-600">
              <i class="fas fa-spinner fa-spin"></i> Parsing…
            </span>
          </p>
          <div
            v-if="!isProcessing && (imporResult.ok > 0 || imporResult.error > 0)"
            class="mt-3 text-left text-[11px] bg-[var(--bg-card)] rounded-lg p-2 border border-[var(--border-subtle)]"
          >
            <div class="font-bold mb-1">
              <span class="text-emerald-600">OK: {{ imporResult.ok }}</span>
              <span class="text-rose-600 ml-3">Error: {{ imporResult.error }}</span>
            </div>
            <ul
              v-if="imporResult.errors.length"
              class="list-disc list-inside text-rose-600 dark:text-rose-400"
            >
              <li v-for="(err, i) in imporResult.errors" :key="i">{{ err }}</li>
              <li
                v-if="imporResult.error > imporResult.errors.length"
                class="italic text-[var(--text-secondary)]"
              >
                … (+{{ imporResult.error - imporResult.errors.length }} lainnya)
              </li>
            </ul>
          </div>
        </div>
        <div
          class="mt-4 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-700 rounded-xl p-3"
        >
          <p class="text-[11px] text-cyan-800 dark:text-cyan-200">
            <i class="fas fa-exclamation-triangle mr-1"></i>
            <strong>Format CSV/XLSX:</strong> kolom
            <code>tanggal, jam, fingerprint_id (atau nama), kegiatan</code>. Tanggal:
            <code>YYYY-MM-DD</code> atau <code>DD-MM-YYYY</code>. Hanya santri
            <strong>mukim</strong> yang masuk; nama kegiatan match (case-insensitive) ke Master
            Kegiatan.
          </p>
        </div>
      </div>
    </div>

    <!-- Modal Tambah/Edit Master Kegiatan -->
    <div
      v-if="modalOpen"
      @click.self="modalOpen = false"
      class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl w-full max-w-md">
        <form @submit.prevent="simpanKegiatan" class="p-5">
          <h3 class="text-base font-black text-[var(--text-primary)] mb-4">
            <i
              :class="[
                'fas',
                form.idx !== null ? 'fa-edit' : 'fa-plus-circle',
                'text-cyan-600 mr-2'
              ]"
            ></i>
            {{ form.idx !== null ? 'Edit Kegiatan' : 'Tambah Kegiatan' }}
          </h3>
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                >Nama Kegiatan *</label
              >
              <input
                v-model="form.nama"
                required
                type="text"
                placeholder="Contoh: Sholat Shubuh Jamaah"
                class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                >Jam Pelaksanaan</label
              >
              <input
                v-model="form.jam"
                type="text"
                placeholder="04:00 - 04:30"
                class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                >Deskripsi (opsional)</label
              >
              <textarea
                v-model="form.deskripsi"
                rows="2"
                class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)] resize-none"
              ></textarea>
            </div>
          </div>
          <div
            class="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-[var(--border-subtle)]"
          >
            <button
              type="button"
              @click="modalOpen = false"
              class="text-xs font-bold px-4 py-2 rounded-lg bg-[var(--bg-muted)] text-slate-600 dark:text-slate-200"
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
import { ref, reactive, computed, unref } from 'vue'
import { doc, setDoc, writeBatch } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useSettingsStore } from '@/stores/settings'
import { useSantri } from '@/composables/useSantri'
import { useToast } from '@/composables/useToast'
import { useExcel } from '@/composables/useExcel'

const { importFile } = useExcel()
const settings = useSettingsStore()
const { santriRaw } = useSantri()
const toast = useToast()

const TABS = [
  {
    id: 'master',
    name: 'Master Kegiatan',
    subtitle: 'Atur daftar kegiatan harian',
    icon: 'fa-list-ul',
    gradient: 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900'
  },
  {
    id: 'absen',
    name: 'Rekap Absensi',
    subtitle: 'Lihat kehadiran santri mukim',
    icon: 'fa-fingerprint',
    gradient: 'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900'
  },
  {
    id: 'impor',
    name: 'Impor Fingerprint',
    subtitle: 'Upload data device .xlsx/.csv',
    icon: 'fa-file-import',
    gradient: 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900'
  }
]
const activeTab = ref('master')

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
const now = new Date()
const bulanFilter = ref(now.getMonth())
const tahunFilter = ref(now.getFullYear())
const tahunOptions = [now.getFullYear() - 1, now.getFullYear(), now.getFullYear() + 1]

const masterKegiatan = computed(() => {
  const list = settings.settings?.master_kegiatan
  return Array.isArray(list) ? list : []
})

const santriMukim = computed(() =>
  santriRaw.value
    .filter((s) => s.aktif !== false && s.is_mukim === true)
    .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || '')))
)

const modalOpen = ref(false)
const saving = ref(false)
const form = reactive({ idx: null, nama: '', jam: '', deskripsi: '' })

function openModal(k = null, idx = null) {
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
    const list = [...masterKegiatan.value]
    const entry = {
      nama: form.nama.trim(),
      jam: form.jam.trim(),
      deskripsi: form.deskripsi.trim()
    }
    if (form.idx !== null) list[form.idx] = entry
    else list.push(entry)
    await setDoc(doc(db, 'settings', 'general'), { master_kegiatan: list }, { merge: true })
    await setDoc(doc(db, 'settings', 'web'), { master_kegiatan: list }, { merge: true })
    toast.success(form.idx !== null ? 'Diperbarui' : 'Tersimpan')
    modalOpen.value = false
  } catch (e) {
    toast.error('Error: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

async function hapusKegiatan(idx) {
  if (!confirm(`Hapus kegiatan "${masterKegiatan.value[idx].nama}"?`)) return
  try {
    const list = [...masterKegiatan.value]
    list.splice(idx, 1)
    await setDoc(doc(db, 'settings', 'general'), { master_kegiatan: list }, { merge: true })
    await setDoc(doc(db, 'settings', 'web'), { master_kegiatan: list }, { merge: true })
    toast.success('Dihapus')
  } catch (e) {
    toast.error('Error: ' + (e.message || e))
  }
}

// IMPOR FINGERPRINT
const fileName = ref('')
const isProcessing = ref(false)
const imporResult = ref({ ok: 0, error: 0, errors: [] })

async function onFileChange(ev) {
  const file = ev.target.files?.[0]
  if (!file) return
  fileName.value = file.name
  isProcessing.value = true
  imporResult.value = { ok: 0, error: 0, errors: [] }
  try {
    const rows = await importFile(file)
    if (!rows.length) {
      toast.warning('File kosong / tidak ada data')
      return
    }
    const batch = writeBatch(db)
    let okCount = 0
    let errCount = 0
    const errors = []
    const santriList = santriRaw.value
    const masterList = masterKegiatan.value
    for (const row of rows) {
      try {
        const rawTanggal = row.tanggal || row.Tanggal || row.tgl || row.Tgl || row.TANGGAL || ''
        const rawFp =
          row.fingerprint_id ||
          row.fingerprint ||
          row.fp_id ||
          row.FP ||
          row.santri_id ||
          row.id ||
          ''
        const rawNama = row.nama || row.Nama || row.santri || row.Santri || ''
        const rawKegiatan = row.kegiatan || row.Kegiatan || row.KEGIATAN || row.activity || ''
        const rawJam = row.jam || row.Jam || row.JAM || ''
        if (!rawTanggal || (!rawFp && !rawNama)) {
          errCount++
          errors.push(`Row ${okCount + errCount}: tanggal/santri kosong`)
          continue
        }
        let tanggal = String(rawTanggal)
        const match = tanggal.match(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/)
        if (match) tanggal = `${match[3]}-${match[2]}-${match[1]}`
        let santri = null
        if (rawFp) {
          santri = santriList.find(
            (s) => String(s.fingerprint_id || s.fp_id || '') === String(rawFp)
          )
        }
        if (!santri && rawNama) {
          santri = santriList.find(
            (s) =>
              String(s.nama || '')
                .toLowerCase()
                .trim() === String(rawNama).toLowerCase().trim()
          )
        }
        if (!santri) {
          errCount++
          errors.push(`Row: santri ${rawFp || rawNama} tidak ditemukan`)
          continue
        }
        if (santri.is_mukim !== true) {
          errCount++
          errors.push(`Row: ${santri.nama} bukan mukim, skip`)
          continue
        }
        let namaKegiatan = String(rawKegiatan || '').trim()
        if (namaKegiatan && masterList.length) {
          const matched = masterList.find(
            (m) =>
              String(m.nama || '')
                .toLowerCase()
                .trim() === namaKegiatan.toLowerCase()
          )
          if (matched) namaKegiatan = matched.nama
        }
        if (!namaKegiatan) {
          namaKegiatan = (masterList[0] && masterList[0].nama) || 'Kegiatan'
        }
        const slug =
          namaKegiatan
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '') || 'keg'
        const docId = `keg_${santri.id}_${tanggal}_${slug}`
        batch.set(doc(db, 'absensi_kegiatan', docId), {
          id: docId,
          santri_id: santri.id,
          santri_nama: santri.nama,
          tanggal,
          jam: rawJam || '',
          kegiatan: namaKegiatan,
          status: 'hadir',
          source: 'fingerprint_import',
          imported_at: new Date().toISOString()
        })
        okCount++
      } catch (rowErr) {
        errCount++
        errors.push(`Row error: ${rowErr.message}`)
      }
    }
    if (okCount > 0) await batch.commit()
    imporResult.value = { ok: okCount, error: errCount, errors: errors.slice(0, 5) }
    if (okCount > 0) {
      toast.success(`Impor selesai: ${okCount} OK, ${errCount} error`)
    } else {
      toast.error(`Impor gagal: 0 OK, ${errCount} error. Cek format kolom.`)
    }
  } catch (e) {
    toast.error('Parse gagal: ' + (e.message || e))
  } finally {
    isProcessing.value = false
    ev.target.value = ''
  }
}
</script>
