<template>
  <!-- v.66.0526: Kalender Kegiatan full Vue (port dari legacy renderKalenderKegiatan) -->
  <div class="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
    <!-- Header: judul + nav bulan + tambah -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
            <i class="fas fa-calendar-alt text-cyan-600 mr-2"></i>{{ namaBulanM }} {{ tahun }}
          </h2>
          <p class="text-xs text-cyan-700 dark:text-cyan-300 font-arabic mt-1">
            {{ hijriRange }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="bulanSebelumnya"
            class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition cursor-pointer"
            title="Bulan sebelumnya"
          >
            <i class="fas fa-chevron-left text-slate-600 dark:text-slate-300 text-xs"></i>
          </button>
          <button
            @click="kembaliHariIni"
            class="text-xs font-bold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 dark:bg-teal-900/30 dark:text-teal-300 dark:hover:bg-teal-900/50 transition cursor-pointer"
            title="Kembali ke bulan ini"
          >
            Hari Ini
          </button>
          <button
            @click="bulanBerikutnya"
            class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition cursor-pointer"
            title="Bulan berikutnya"
          >
            <i class="fas fa-chevron-right text-slate-600 dark:text-slate-300 text-xs"></i>
          </button>
          <button
            v-if="isAdmin"
            @click="bukaModal()"
            class="text-xs font-bold px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white transition cursor-pointer flex items-center gap-1.5"
            title="Tambah kegiatan"
          >
            <i class="fas fa-plus text-[10px]"></i>Tambah
          </button>
        </div>
      </div>
    </div>

    <!-- Grid kalender bulanan -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <!-- Header hari -->
      <div class="grid grid-cols-7 gap-1.5 mb-2">
        <div
          v-for="(d, i) in ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']"
          :key="i"
          :class="[
            'text-center text-[10px] font-black uppercase tracking-widest py-1',
            i === 0 ? 'text-rose-600' : i === 5 ? 'text-emerald-600' : 'text-slate-500 dark:text-slate-400'
          ]"
        >
          {{ d }}
        </div>
      </div>
      <!-- Grid sel -->
      <div class="grid grid-cols-7 gap-1.5">
        <div v-for="i in firstDay" :key="`empty-${i}`" class="aspect-square"></div>
        <!-- v.72.18.0526: Semua teks center (kyai req) -->
        <button
          v-for="cell in cells"
          :key="cell.dateStr"
          @click="klikTanggal(cell.dateStr)"
          :class="[
            'aspect-[3/4] sm:aspect-square p-1.5 rounded-lg border transition cursor-pointer flex flex-col items-center justify-start min-w-0 overflow-hidden text-center',
            cell.isToday
              ? 'bg-cyan-100 border-cyan-500 ring-2 ring-cyan-400 dark:bg-cyan-900/40'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
          ]"
        >
          <p
            :class="[
              'text-[10px] font-bold leading-none text-center w-full',
              cell.isMinggu ? 'text-rose-600' : 'text-slate-500 dark:text-slate-400'
            ]"
          >
            {{ cell.day }} {{ namaBulanM.substring(0, 3) }}
          </p>
          <p
            :class="[
              'text-xl sm:text-2xl font-bold text-center w-full flex-1 flex items-center justify-center font-arabic',
              cell.isMinggu ? 'text-rose-600' : cell.isJumat ? 'text-emerald-600' : 'text-slate-700 dark:text-slate-200'
            ]"
          >
            {{ cell.hijriDay }}
          </p>
          <p class="text-[9px] text-slate-500 dark:text-slate-400 text-center font-medium leading-none w-full">
            {{ cell.pasaran }}
          </p>
          <div v-if="cell.hasEvent" class="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-0.5 mx-auto"></div>
        </button>
      </div>
    </div>

    <!-- List kegiatan bulan ini -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h3 class="text-xs md:text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
        <i class="fas fa-list-ul text-cyan-600 mr-2"></i>Kegiatan Bulan Ini
      </h3>
      <div v-if="eventsThisMonth.length === 0" class="text-xs text-slate-400 italic text-center py-4">
        <i class="fas fa-calendar-times text-2xl text-slate-300 dark:text-slate-600 block mb-2"></i>
        Tidak ada kegiatan bulan ini.
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="k in eventsThisMonth"
          :key="k.id"
          class="bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500 p-3 rounded-r-lg cursor-pointer hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition"
          @click="klikTanggal(k.tgl_mulai)"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <p class="text-xs font-black text-slate-800 dark:text-white">{{ k.judul }}</p>
              <p class="text-[10px] text-slate-600 dark:text-slate-300 mt-0.5">
                {{ formatTglRange(k.tgl_mulai, k.tgl_akhir) }}
              </p>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 italic mt-0.5">
                {{ audienceLabel(k.audience) }}{{ k.deskripsi ? ' · ' + k.deskripsi.substring(0, 80) : '' }}
              </p>
            </div>
            <button
              v-if="isAdmin"
              @click.stop="bukaModal(k)"
              class="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-bold flex-shrink-0"
            >
              edit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Tambah/Edit Kegiatan -->
    <div
      v-if="modalOpen"
      @click.self="modalOpen = false"
      class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <form @submit.prevent="simpan" class="p-5">
          <h3 class="text-base font-black text-slate-800 dark:text-white mb-4">
            <i :class="['fas', form.id ? 'fa-edit' : 'fa-calendar-plus', 'text-cyan-600 mr-2']"></i>
            {{ form.id ? 'Edit Kegiatan' : 'Tambah Kegiatan' }}
          </h3>
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Judul *</label>
              <input
                v-model="form.judul"
                required
                type="text"
                class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                placeholder="Contoh: Upacara Bendera"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Tgl Mulai *</label>
                <input
                  v-model="form.tgl_mulai"
                  required
                  type="date"
                  class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Tgl Akhir</label>
                <input
                  v-model="form.tgl_akhir"
                  type="date"
                  class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Audience</label>
              <select
                v-model="form.audience"
                class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
              >
                <option value="semua">Semua</option>
                <option value="guru">Guru/Pegawai</option>
                <option value="santri">Santri/Wali</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Deskripsi</label>
              <textarea
                v-model="form.deskripsi"
                rows="3"
                class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white resize-none"
                placeholder="Catatan tambahan (opsional)"
              ></textarea>
            </div>
          </div>
          <div class="flex items-center justify-between gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-700">
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
              class="text-xs font-bold px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 transition cursor-pointer"
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
import { ref, computed, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useKegiatan } from '@/composables/useKegiatan'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { masehiToHijri, toArabicDigit, formatHijri, formatMasehi } from '@/utils/hijri'
import { hitungPasaran } from '@/utils/pasaran'

const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()
const confirm = useConfirm()
const { kegiatanRelevan, simpanKegiatan, hapusKegiatan } = useKegiatan()

const isAdmin = computed(() => auth.isAdmin || auth.cekHakAkses?.('post_profil_pesantren'))
const kalibrasi = computed(() => parseInt(settings.settings?.kalibrasiHijri || 0) || 0)

const now = new Date()
const tahun = ref(now.getFullYear())
const bulan = ref(now.getMonth())

const NAMA_BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const namaBulanM = computed(() => NAMA_BULAN[bulan.value])

const firstDay = computed(() => new Date(tahun.value, bulan.value, 1).getDay())
const lastDate = computed(() => new Date(tahun.value, bulan.value + 1, 0).getDate())

function tglIso(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const today = tglIso(new Date())

const eventsThisMonth = computed(() => {
  const target = `${tahun.value}-${String(bulan.value + 1).padStart(2, '0')}`
  return kegiatanRelevan.value
    .filter((k) => {
      const km = (k.tgl_mulai || '').substring(0, 7)
      const ka = ((k.tgl_akhir || k.tgl_mulai) || '').substring(0, 7)
      return km <= target && ka >= target
    })
    .sort((a, b) => (a.tgl_mulai || '').localeCompare(b.tgl_mulai || ''))
})

const cells = computed(() => {
  const result = []
  for (let d = 1; d <= lastDate.value; d++) {
    const dt = new Date(tahun.value, bulan.value, d)
    const dateStr = tglIso(dt)
    const hijri = masehiToHijri(dt, kalibrasi.value)
    const hasEvent = eventsThisMonth.value.some((k) => dateStr >= k.tgl_mulai && dateStr <= (k.tgl_akhir || k.tgl_mulai))
    result.push({
      day: d,
      dateStr,
      isToday: dateStr === today,
      isMinggu: dt.getDay() === 0,
      isJumat: dt.getDay() === 5,
      hijriDay: toArabicDigit(hijri.day),
      pasaran: hitungPasaran(dt),
      hasEvent
    })
  }
  return result
})

const hijriRange = computed(() => {
  const tglAwal = new Date(tahun.value, bulan.value, 1)
  const tglAkhir = new Date(tahun.value, bulan.value + 1, 0)
  return `${formatHijri(tglAwal, kalibrasi.value)} — ${formatHijri(tglAkhir, kalibrasi.value)}`
})

function bulanSebelumnya() {
  if (bulan.value === 0) {
    bulan.value = 11
    tahun.value--
  } else bulan.value--
}
function bulanBerikutnya() {
  if (bulan.value === 11) {
    bulan.value = 0
    tahun.value++
  } else bulan.value++
}
function kembaliHariIni() {
  const n = new Date()
  tahun.value = n.getFullYear()
  bulan.value = n.getMonth()
}

const AUDIENCE_LABEL = { semua: '👥 Semua', guru: '🧑‍🏫 Guru', santri: '🧑‍🎓 Santri' }
function audienceLabel(aud) {
  return AUDIENCE_LABEL[aud || 'semua']
}

function formatTglRange(start, end) {
  const tglM = formatMasehi(new Date(start))
  if (!end || end === start) return tglM
  return `${tglM} s/d ${formatMasehi(new Date(end))}`
}

function klikTanggal(dateStr) {
  const events = kegiatanRelevan.value.filter((k) => dateStr >= k.tgl_mulai && dateStr <= (k.tgl_akhir || k.tgl_mulai))
  const tglM = formatMasehi(new Date(dateStr))
  const tglH = formatHijri(new Date(dateStr), kalibrasi.value)
  if (events.length === 0) {
    toast.info(`${tglM} (${tglH}) — Tidak ada kegiatan.`)
  } else {
    const judulList = events.map((e) => `• ${e.judul}`).join('\n')
    alert(`${tglM}\n${tglH}\n\n${judulList}`)
  }
}

// MODAL form
const modalOpen = ref(false)
const saving = ref(false)
const form = reactive({
  id: '',
  judul: '',
  tgl_mulai: today,
  tgl_akhir: '',
  audience: 'semua',
  deskripsi: ''
})

function bukaModal(kegiatan = null) {
  if (kegiatan) {
    form.id = kegiatan.id
    form.judul = kegiatan.judul || ''
    form.tgl_mulai = kegiatan.tgl_mulai || today
    form.tgl_akhir = kegiatan.tgl_akhir || ''
    form.audience = kegiatan.audience || 'semua'
    form.deskripsi = kegiatan.deskripsi || ''
  } else {
    form.id = ''
    form.judul = ''
    form.tgl_mulai = today
    form.tgl_akhir = ''
    form.audience = 'semua'
    form.deskripsi = ''
  }
  modalOpen.value = true
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
  } catch (err) {
    toast.error('Error: ' + (err.message || err))
  } finally {
    saving.value = false
  }
}

async function hapus() {
  if (!form.id) return
  const ok = await confirm.ask({
    title: 'Hapus kegiatan?',
    text: `"${form.judul}" akan dihapus permanen.`,
    icon: 'warning'
  })
  if (!ok) return
  saving.value = true
  try {
    await hapusKegiatan(form.id)
    toast.success('Dihapus')
    modalOpen.value = false
  } catch (err) {
    toast.error('Error: ' + (err.message || err))
  } finally {
    saving.value = false
  }
}
</script>
