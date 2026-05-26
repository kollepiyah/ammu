<template>
  <div class="p-4 md:p-6 max-w-7xl mx-auto space-y-4">
    <!-- Header + Filters -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="flex items-center justify-between gap-3 flex-wrap mb-3">
        <h2 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
          <i class="fas fa-mosque text-indigo-600 mr-2"></i>Rekap Diniyah
        </h2>
        <p class="text-[10px] text-slate-500 dark:text-slate-400">
          {{ filteredSantri.length }} santri &middot; {{ BULAN_ID[bulan - 1] }} {{ tahun }}
        </p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
        <select
          v-model.number="bulan"
          class="text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
        >
          <option v-for="(b, i) in BULAN_ID" :key="b" :value="i + 1">{{ b }}</option>
        </select>
        <input
          v-model.number="tahun"
          type="number"
          min="2024"
          max="2030"
          class="text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
        />
        <select
          v-model="filterLembaga"
          class="text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
        >
          <option value="">Semua Lembaga</option>
          <option v-for="l in lembagaOptions" :key="l" :value="l">{{ l }}</option>
        </select>
        <select
          v-model="filterKelas"
          class="text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
        >
          <option value="">Semua Kelas</option>
          <option v-for="k in kelasOptions" :key="k" :value="k">{{ k }}</option>
        </select>
        <input
          v-model="search"
          type="search"
          placeholder="Cari santri..."
          class="text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
        />
      </div>
    </div>

    <!-- Table -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
    >
      <div v-if="filteredSantri.length === 0" class="py-10 text-center">
        <i class="fas fa-users-slash text-slate-300 text-3xl block mb-2"></i>
        <p class="text-sm text-slate-500 italic">Tidak ada santri di filter ini.</p>
        <p class="text-[10px] text-slate-400">
          Pilih lembaga/kelas lain atau pastikan santri punya lembaga_sekolah.
        </p>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-xs border-collapse">
          <thead class="bg-slate-100 dark:bg-slate-900/40 sticky top-0">
            <tr>
              <th
                class="py-2 px-2 border border-slate-300 text-left font-black uppercase text-[10px] sticky left-0 bg-slate-100 z-10"
              >
                Nama
              </th>
              <th
                class="py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px]"
              >
                Lembaga
              </th>
              <th
                class="py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px]"
              >
                Kelas
              </th>
              <th
                v-for="m in mapelList"
                :key="m"
                class="py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px] bg-blue-100 text-blue-900 dark:bg-blue-900/50 dark:text-blue-200"
              >
                {{ m }}
              </th>
              <th
                class="py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px] bg-amber-50 text-amber-800"
              >
                Rata2
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="s in filteredSantri"
              :key="s.id"
              class="hover:bg-slate-50 dark:hover:bg-slate-700/30"
            >
              <td
                class="py-1.5 px-2 border border-slate-300 font-bold text-slate-800 dark:text-white sticky left-0 bg-white dark:bg-slate-800"
              >
                {{ s.nama }}
              </td>
              <td
                class="py-1.5 px-2 border border-slate-300 text-center text-[11px] text-slate-600"
              >
                {{ s.lembaga_sekolah || '-' }}
              </td>
              <td
                class="py-1.5 px-2 border border-slate-300 text-center text-[11px] text-slate-600"
              >
                {{ s.kelas_sekolah || '-' }}
              </td>
              <td v-for="m in mapelList" :key="m" class="py-0.5 px-1 border border-slate-300">
                <input
                  type="text"
                  inputmode="numeric"
                  :value="getCell(s.id, m)"
                  @change="(ev) => saveCell(s.id, m, ev.target.value)"
                  class="w-full text-center text-[11px] py-1 px-1 border-0 outline-none bg-transparent focus:bg-yellow-50 dark:focus:bg-yellow-900/30 dark:text-white"
                  placeholder="-"
                />
              </td>
              <td
                :class="[
                  'py-1.5 px-2 border border-slate-300 text-center font-black bg-amber-50 dark:bg-amber-900/20',
                  rataColor(rataNilai(s.id))
                ]"
              >
                {{ rataNilai(s.id) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <p class="text-[10px] text-slate-400 italic text-center">
      <i class="fas fa-info-circle mr-1"></i>
      Nilai per cell auto-save ke koleksi <code>rekap_diniyah</code> (doc id:
      <code>diniyah_{santri_id}_{periodKey}</code>).
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useSantri } from '@/composables/useSantri'
import { useLembaga } from '@/composables/useLembaga'

const { santriRaw } = useSantri()
const { lembagaRaw } = useLembaga()
const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()

// Default mapel diniyah (fallback bila settings belum diisi)
const DEFAULT_MAPEL = ['Aqidah Akhlak', 'Fiqh', 'Tarikh', 'Bahasa Arab']

// Filter state
const filterLembaga = ref('')
const filterKelas = ref('')
const search = ref('')

// Periode bulan/tahun
const BULAN_ID = [
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
const bulan = ref(now.getMonth() + 1)
const tahun = ref(now.getFullYear())

// Data rekap
const rekapDocs = ref([])
let unsubRekap = null

onMounted(() => {
  unsubRekap = subscribeColl('rekap_diniyah', (docs) => {
    rekapDocs.value = docs || []
  })
})
onUnmounted(() => {
  if (unsubRekap) {
    try {
      unsubRekap()
    } catch (e) {}
  }
})

// Schema mapel per kelas (settings.rekapSchemaDiniyahPerKelas[kelas])
// fallback ke settings.rekapSchemaDiniyah, fallback DEFAULT_MAPEL.
function getMapelSchema(kelas) {
  const perKelas = settings.settings?.rekapSchemaDiniyahPerKelas
  if (perKelas && typeof perKelas === 'object') {
    const key = String(kelas || '').trim()
    if (Array.isArray(perKelas[key]) && perKelas[key].length > 0) return perKelas[key]
  }
  const flat = settings.settings?.rekapSchemaDiniyah
  return Array.isArray(flat) && flat.length > 0 ? flat : DEFAULT_MAPEL
}

const mapelList = computed(() => {
  // Jika filter kelas dipilih, ambil schema khusus kelas itu
  if (filterKelas.value) return getMapelSchema(filterKelas.value)
  // Otherwise union semua mapel dari santri yang ditampilkan
  const set = new Set()
  for (const s of filteredSantri.value) {
    for (const m of getMapelSchema(s.kelas_sekolah)) set.add(m)
  }
  if (set.size === 0) {
    const flat = settings.settings?.rekapSchemaDiniyah
    return Array.isArray(flat) && flat.length > 0 ? flat : DEFAULT_MAPEL
  }
  return [...set]
})

// Lembaga formal yang bisa diniyah: SDI, PKBM
const DINIYAH_LEMBAGA = ['SDI', 'PKBM']

const lembagaOptions = computed(() => {
  const fromMaster = (lembagaRaw.value || [])
    .filter((l) => DINIYAH_LEMBAGA.includes(l.lembaga))
    .map((l) => l.lembaga)
    .filter(Boolean)
  return fromMaster.length > 0 ? fromMaster : DINIYAH_LEMBAGA
})

const kelasOptions = computed(() => {
  const set = new Set()
  santriRaw.value.forEach((s) => {
    if (s.kelas_sekolah) set.add(s.kelas_sekolah)
  })
  return [...set].sort()
})

// Role-based: guru biasa hanya lihat santri yang dia ajar (guru_sekolah)
const isGuruBiasa = computed(() => {
  const s = auth.sesiAktif
  return s?.role === 'guru' && s?.role_sistem !== 'super_admin' && s?.id !== 'admin'
})
const myNama = computed(() => auth.sesiAktif?.nama || '')

const filteredSantri = computed(() => {
  let list = santriRaw.value.filter(
    (s) => s.aktif !== false && s.lembaga_sekolah && DINIYAH_LEMBAGA.includes(s.lembaga_sekolah)
  )
  if (isGuruBiasa.value) {
    list = list.filter(
      (s) => Array.isArray(s.guru_sekolah) && s.guru_sekolah.includes(myNama.value)
    )
  }
  if (filterLembaga.value) list = list.filter((s) => s.lembaga_sekolah === filterLembaga.value)
  if (filterKelas.value) list = list.filter((s) => s.kelas_sekolah === filterKelas.value)
  const kw = search.value.trim().toLowerCase()
  if (kw)
    list = list.filter((s) =>
      String(s.nama || '')
        .toLowerCase()
        .includes(kw)
    )
  return list.sort(
    (a, b) =>
      String(a.lembaga_sekolah).localeCompare(String(b.lembaga_sekolah)) ||
      String(a.kelas_sekolah).localeCompare(String(b.kelas_sekolah)) ||
      String(a.nama).localeCompare(String(b.nama))
  )
})

// Period key: "YYYY_MM"
const periodKey = computed(() => `${tahun.value}_${String(bulan.value).padStart(2, '0')}`)

// Helper: normalisasi nama mapel jadi key field
function mapelKey(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
}

function findRekap(santriId) {
  const docId = `diniyah_${santriId}_${periodKey.value}`
  return rekapDocs.value.find((d) => d.id === docId) || null
}

function getCell(santriId, mapel) {
  const r = findRekap(santriId)
  return r?.data?.[mapelKey(mapel)] || ''
}

function rataNilai(santriId) {
  const r = findRekap(santriId)
  if (!r?.data) return '-'
  const vals = Object.values(r.data)
    .map((v) => parseFloat(v))
    .filter((v) => !isNaN(v))
  if (vals.length === 0) return '-'
  return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)
}

function rataColor(v) {
  if (v === '-') return 'text-slate-400'
  const n = parseFloat(v)
  if (n >= 85) return 'text-emerald-700 dark:text-emerald-400'
  if (n >= 70) return 'text-blue-700 dark:text-blue-400'
  if (n >= 60) return 'text-amber-700 dark:text-amber-400'
  return 'text-rose-700 dark:text-rose-400'
}

async function saveCell(santriId, mapel, value) {
  const docId = `diniyah_${santriId}_${periodKey.value}`
  const key = mapelKey(mapel)
  try {
    const existing = findRekap(santriId)
    const newData = { ...(existing?.data || {}), [key]: value }
    if (existing) {
      await updateDoc(doc(db, 'rekap_diniyah', docId), {
        data: newData,
        updated_at: serverTimestamp()
      })
    } else {
      await setDoc(doc(db, 'rekap_diniyah', docId), {
        id: docId,
        santri_id: santriId,
        periode: periodKey.value,
        data: newData,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      })
    }
    toast.success(`Tersimpan: ${mapel}`)
  } catch (e) {
    toast.error(`Gagal simpan: ${e.message || e}`)
    console.error('[RekapDiniyah] saveCell error:', e)
  }
}
</script>
