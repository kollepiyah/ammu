<template>
  <div class="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
    <!-- Header: bulan/tahun + navigasi -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 class="text-base md:text-lg font-black text-[var(--text-primary)]">
            <i class="fas fa-calendar-alt text-cyan-600 mr-2"></i>
            {{ namaBulan }} {{ tahun }}
          </h2>
          <p class="text-xs text-cyan-700 dark:text-cyan-300 font-arabic mt-1">
            {{ hijriRangeLabel }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="prevMonth"
            aria-label="Bulan sebelumnya"
            title="Bulan sebelumnya"
            class="w-8 h-8 rounded-full bg-[var(--bg-muted)] hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition cursor-pointer"
          >
            <i class="fas fa-chevron-left text-[var(--text-secondary)] text-xs"></i>
          </button>
          <button
            @click="goToday"
            class="text-xs font-bold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 dark:bg-teal-900/30 dark:text-teal-300 dark:hover:bg-teal-900/50 transition cursor-pointer"
            title="Kembali ke bulan ini"
          >
            Hari Ini
          </button>
          <button
            @click="nextMonth"
            aria-label="Bulan berikutnya"
            title="Bulan berikutnya"
            class="w-8 h-8 rounded-full bg-[var(--bg-muted)] hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition cursor-pointer"
          >
            <i class="fas fa-chevron-right text-[var(--text-secondary)] text-xs"></i>
          </button>
          <!-- v.21.114.0528: Seed libur nasional Indonesia untuk tahun yg ditampilkan -->
          <button
            v-if="bisaEdit"
            @click="seedLiburNasional"
            class="text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition cursor-pointer flex items-center gap-1.5"
            title="Tambahkan libur nasional Indonesia untuk tahun ini"
          >
            <i class="fas fa-flag text-[10px]"></i>Libur Nasional
          </button>
          <button
            v-if="bisaEdit"
            @click="openModal()"
            class="text-xs font-bold px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white transition cursor-pointer flex items-center gap-1.5"
            title="Tambah kegiatan"
          >
            <i class="fas fa-plus text-[10px]"></i>Tambah
          </button>
        </div>
      </div>
    </div>

    <!-- Grid kalender -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="grid grid-cols-7 gap-1.5 mb-2">
        <div
          v-for="(hari, idx) in HARI"
          :key="idx"
          :class="[
            'text-center text-[10px] font-black uppercase tracking-widest py-1',
            idx === 0
              ? 'text-rose-600'
              : idx === 5
                ? 'text-emerald-600'
                : 'text-[var(--text-secondary)]'
          ]"
        >
          {{ hari }}
        </div>
      </div>
      <div class="grid grid-cols-7 gap-1.5">
        <div v-for="n in firstDayOffset" :key="`empty-${n}`" class="aspect-square"></div>
        <button
          v-for="cell in cells"
          :key="cell.dateStr"
          @click="onClickCell(cell.dateStr)"
          :class="[
            'aspect-[3/4] sm:aspect-square p-1.5 rounded-lg border transition cursor-pointer flex flex-col items-center justify-start min-w-0 overflow-hidden text-center',
            cell.isToday
              ? 'bg-cyan-100 border-cyan-500 ring-2 ring-cyan-400 dark:bg-cyan-900/40'
              : cell.isLibur
                ? 'bg-rose-50 border-rose-300 hover:bg-rose-100 dark:bg-rose-900/30 dark:border-rose-700'
                : 'bg-[var(--bg-card)] border-[var(--border-subtle)] hover:bg-slate-50 dark:hover:bg-slate-700/50'
          ]"
        >
          <p
            :class="[
              'text-[10px] font-bold leading-none text-center w-full',
              cell.isMinggu ? 'text-rose-600' : 'text-[var(--text-secondary)]'
            ]"
          >
            {{ cell.day }} {{ namaBulan.substring(0, 3) }}
          </p>
          <p
            :class="[
              'text-xl sm:text-2xl font-bold text-center w-full flex-1 flex items-center justify-center font-arabic',
              cell.isMinggu
                ? 'text-rose-600'
                : cell.isJumat
                  ? 'text-emerald-600'
                  : 'text-[var(--text-primary)]'
            ]"
          >
            {{ cell.hijriDay }}
          </p>
          <p
            class="text-[9px] text-[var(--text-secondary)] text-center font-medium leading-none w-full"
          >
            {{ cell.pasaran }}
          </p>
          <div
            v-if="cell.hasEvent"
            class="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-0.5 mx-auto"
          ></div>
        </button>
      </div>
    </div>

    <!-- Daftar kegiatan bulan ini -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3
        class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <i class="fas fa-list-ul text-cyan-600 mr-2"></i>Kegiatan Bulan Ini
      </h3>
      <div v-if="kegiatanBulan.length === 0" class="text-xs text-[var(--text-tertiary)] italic text-center py-4">
        <i class="fas fa-calendar-times text-2xl text-slate-300 dark:text-[var(--text-secondary)] block mb-2"></i>
        Tidak ada kegiatan bulan ini.
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="k in kegiatanBulan"
          :key="k.id"
          :class="[
            'border-l-4 p-3 rounded-r-lg cursor-pointer transition',
            k.tipe === 'libur_nasional'
              ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/30'
              : k.tipe === 'libur'
                ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 hover:bg-amber-100 dark:hover:bg-amber-900/30'
                : 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-500 hover:bg-cyan-100 dark:hover:bg-cyan-900/30'
          ]"
          @click="onClickCell(k.tgl_mulai)"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <p class="text-xs font-black text-[var(--text-primary)] flex items-center gap-1.5 flex-wrap">
                {{ k.judul }}
                <span v-if="k.tipe === 'libur_nasional'" class="text-[9px] font-black bg-rose-200 text-rose-700 px-1.5 py-0.5 rounded uppercase tracking-wider">Libur Nasional</span>
                <span v-else-if="k.tipe === 'libur'" class="text-[9px] font-black bg-amber-200 text-amber-700 px-1.5 py-0.5 rounded uppercase tracking-wider">Libur</span>
              </p>
              <p class="text-[10px] text-[var(--text-secondary)] mt-0.5">
                {{ formatRangeTanggal(k.tgl_mulai, k.tgl_akhir) }}
              </p>
              <p class="text-[10px] text-[var(--text-secondary)] italic mt-0.5">
                {{ labelAudience(k.audience)
                }}{{ k.deskripsi ? ' · ' + k.deskripsi.substring(0, 80) : '' }}
              </p>
            </div>
            <button
              v-if="bisaEdit"
              @click.stop="openModal(k)"
              class="text-[10px] text-cyan-600 dark:text-cyan-400 hover:underline font-bold flex-shrink-0"
            >
              edit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal tambah/edit -->
    <div
      v-if="modalOpen"
      @click.self="modalOpen = false"
      class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <form @submit.prevent="simpan" class="p-5">
          <h3 class="text-base font-black text-[var(--text-primary)] mb-4">
            <i :class="['fas', form.id ? 'fa-edit' : 'fa-calendar-plus', 'text-cyan-600 mr-2']"></i>
            {{ form.id ? 'Edit Kegiatan' : 'Tambah Kegiatan' }}
          </h3>
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                >Judul *</label
              >
              <input
                v-model="form.judul"
                required
                type="text"
                class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)] focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                placeholder="Contoh: Upacara Bendera"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                  >Tgl Mulai *</label
                >
                <input
                  v-model="form.tgl_mulai"
                  required
                  type="date"
                  class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                  >Tgl Akhir</label
                >
                <input
                  v-model="form.tgl_akhir"
                  type="date"
                  class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                  >Tipe</label
                >
                <select
                  v-model="form.tipe"
                  class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                >
                  <option value="kegiatan">Kegiatan</option>
                  <option value="libur">Libur</option>
                  <option value="libur_nasional">Libur Nasional</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                  >Audience</label
                >
                <select
                  v-model="form.audience"
                  class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                >
                  <option value="semua">Semua</option>
                  <option value="guru">Guru/Pegawai</option>
                  <option value="santri">Santri/Wali</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                >Deskripsi</label
              >
              <textarea
                v-model="form.deskripsi"
                rows="3"
                class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)] resize-none"
                placeholder="Catatan tambahan (opsional)"
              ></textarea>
            </div>
          </div>
          <div
            class="flex items-center justify-between gap-2 mt-5 pt-4 border-t border-[var(--border-subtle)]"
          >
            <button
              v-if="form.id"
              type="button"
              @click="hapus"
              class="text-xs font-bold px-3 py-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300 transition cursor-pointer"
            >
              <i class="fas fa-trash mr-1"></i>Hapus
            </button>
            <div class="flex-1"></div>
            <button
              type="button"
              @click="modalOpen = false"
              class="text-xs font-bold px-4 py-2 rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="text-xs font-bold px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white transition cursor-pointer disabled:opacity-50"
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
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useKegiatan } from '@/composables/useKegiatan'
import { formatMasehi, formatHijri, masehiToHijri, toArabicDigit } from '@/utils/hijri'
import { hitungPasaran } from '@/utils/pasaran'
// v.21.114.0528: libur nasional seed util
import { getLiburNasional } from '@/utils/liburNasional'

const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()
const confirmDlg = useConfirm()
const { kegiatanRelevan, simpanKegiatan, hapusKegiatan } = useKegiatan()

const bisaEdit = computed(() => {
  return auth.isAdmin || auth.cekHakAkses?.call(auth, 'post_profil_pesantren')
})

const kalibrasiHijri = computed(() => {
  return parseInt(settings.settings?.kalibrasiHijri || 0) || 0
})

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
const HARI = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']
const LABEL_AUDIENCE = {
  semua: 'Semua',
  guru: 'Guru',
  santri: 'Santri'
}

const now = new Date()
const tahun = ref(now.getFullYear())
const bulan = ref(now.getMonth())

const namaBulan = computed(() => NAMA_BULAN[bulan.value])
const firstDayOffset = computed(() => new Date(tahun.value, bulan.value, 1).getDay())
const daysInMonth = computed(() => new Date(tahun.value, bulan.value + 1, 0).getDate())

function toDateStr(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const todayStr = toDateStr(new Date())

const kegiatanBulan = computed(() => {
  const key = `${tahun.value}-${String(bulan.value + 1).padStart(2, '0')}`
  return kegiatanRelevan.value
    .filter((k) => {
      const a = (k.tgl_mulai || '').substring(0, 7)
      const b = (k.tgl_akhir || k.tgl_mulai || '').substring(0, 7)
      return a <= key && b >= key
    })
    .sort((a, b) => (a.tgl_mulai || '').localeCompare(b.tgl_mulai || ''))
})

const cells = computed(() => {
  const arr = []
  for (let d = 1; d <= daysInMonth.value; d++) {
    const dateObj = new Date(tahun.value, bulan.value, d)
    const dateStr = toDateStr(dateObj)
    const hijri = masehiToHijri(dateObj, kalibrasiHijri.value)
    const eventsHere = kegiatanBulan.value.filter(
      (k) => dateStr >= k.tgl_mulai && dateStr <= (k.tgl_akhir || k.tgl_mulai)
    )
    // v.21.114.0528: deteksi libur (manual atau nasional) di cell ini
    const isLibur = eventsHere.some((k) => k.tipe === 'libur' || k.tipe === 'libur_nasional')
    arr.push({
      day: d,
      dateStr,
      isToday: dateStr === todayStr,
      isMinggu: dateObj.getDay() === 0,
      isJumat: dateObj.getDay() === 5,
      isLibur,
      hijriDay: toArabicDigit(hijri.day),
      pasaran: hitungPasaran(dateObj),
      hasEvent: eventsHere.length > 0
    })
  }
  return arr
})

const hijriRangeLabel = computed(() => {
  const start = new Date(tahun.value, bulan.value, 1)
  const end = new Date(tahun.value, bulan.value + 1, 0)
  return `${formatHijri(start, kalibrasiHijri.value)} — ${formatHijri(end, kalibrasiHijri.value)}`
})

function prevMonth() {
  if (bulan.value === 0) {
    bulan.value = 11
    tahun.value--
  } else {
    bulan.value--
  }
}

function nextMonth() {
  if (bulan.value === 11) {
    bulan.value = 0
    tahun.value++
  } else {
    bulan.value++
  }
}

function goToday() {
  const d = new Date()
  tahun.value = d.getFullYear()
  bulan.value = d.getMonth()
}

function labelAudience(aud) {
  return LABEL_AUDIENCE[aud || 'semua']
}

function formatRangeTanggal(mulai, akhir) {
  const m = formatMasehi(new Date(mulai))
  if (!akhir || akhir === mulai) return m
  return `${m} s/d ${formatMasehi(new Date(akhir))}`
}

function onClickCell(dateStr) {
  const list = kegiatanRelevan.value.filter(
    (k) => dateStr >= k.tgl_mulai && dateStr <= (k.tgl_akhir || k.tgl_mulai)
  )
  const m = formatMasehi(new Date(dateStr))
  const h = formatHijri(new Date(dateStr), kalibrasiHijri.value)
  if (list.length === 0) {
    toast.info(`${m} (${h}) — Tidak ada kegiatan.`)
  } else {
    const lines = list.map((k) => `• ${k.judul}`).join('\n')
    alert(`${m}\n${h}\n\n${lines}`)
  }
}

const modalOpen = ref(false)
const saving = ref(false)
const form = reactive({
  id: '',
  judul: '',
  tgl_mulai: todayStr,
  tgl_akhir: '',
  audience: 'semua',
  deskripsi: '',
  tipe: 'kegiatan'
})

function openModal(k = null) {
  if (k) {
    form.id = k.id
    form.judul = k.judul || ''
    form.tgl_mulai = k.tgl_mulai || todayStr
    form.tgl_akhir = k.tgl_akhir || ''
    form.audience = k.audience || 'semua'
    form.deskripsi = k.deskripsi || ''
    form.tipe = k.tipe || 'kegiatan'
  } else {
    form.id = ''
    form.judul = ''
    form.tgl_mulai = todayStr
    form.tgl_akhir = ''
    form.audience = 'semua'
    form.deskripsi = ''
    form.tipe = 'kegiatan'
  }
  modalOpen.value = true
}

// v.21.114.0528: Seed libur nasional Indonesia untuk tahun yang sedang ditampilkan
// v.21.115.0528: useConfirm API = function call, bukan .ask()
async function seedLiburNasional() {
  const list = getLiburNasional(tahun.value)
  const ok = await confirmDlg({
    title: `Tambahkan ${list.length} libur nasional ${tahun.value}?`,
    message: 'Akan men-duplikat jika sudah ada — Anda bisa hapus manual setelahnya. Tanggal Hijriyah-based merupakan estimasi, mohon verifikasi dengan SKB 3 Menteri resmi.',
    confirmText: 'Tambahkan',
    cancelText: 'Batal',
    danger: false
  })
  if (!ok) return
  let count = 0
  for (const l of list) {
    try {
      await simpanKegiatan({
        judul: l.judul,
        tgl_mulai: l.tgl_mulai,
        tgl_akhir: l.tgl_akhir,
        audience: l.audience,
        deskripsi: l.deskripsi,
        tipe: l.tipe
      })
      count++
    } catch (e) {
      console.warn('Seed libur gagal:', l.judul, e?.message || e)
    }
  }
  toast.success(`${count} libur nasional ditambahkan`)
}

async function simpan() {
  if (form.tgl_akhir && form.tgl_akhir < form.tgl_mulai) {
    toast.warning('Tanggal akhir harus setelah tanggal mulai.')
    return
  }
  saving.value = true
  try {
    await simpanKegiatan({ ...form })
    toast.success(form.id ? 'Diperbarui' : 'Tersimpan')
    modalOpen.value = false
  } catch (e) {
    toast.error('Error: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

async function hapus() {
  if (!form.id) return
  // v.21.115.0528: useConfirm API = function call, bukan .ask()
  const ok = await confirmDlg({
    title: 'Hapus kegiatan?',
    message: `"${form.judul}" akan dihapus permanen.`,
    confirmText: 'Hapus',
    cancelText: 'Batal',
    danger: true
  })
  if (!ok) return
  savin