<template>
  <div class="p-4 md:p-6 max-w-7xl mx-auto space-y-4">
    <!-- Header + Filters -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-3 flex-wrap mb-3">
        <h2 class="text-base md:text-lg font-black text-[var(--text-primary)]">
          <i class="fas fa-mosque text-cyan-600 mr-2"></i>Rekap Diniyah
        </h2>
        <p class="text-[10px] text-[var(--text-secondary)]">
          {{ filteredSantri.length }} santri &middot; {{ BULAN_ID[bulan - 1] }} {{ tahun }}
        </p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
        <select
          v-model.number="bulan"
          class="text-xs px-3 py-2 border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
        >
          <option v-for="(b, i) in BULAN_ID" :key="b" :value="i + 1">{{ b }}</option>
        </select>
        <input
          v-model.number="tahun"
          type="number"
          min="2024"
          max="2030"
          class="text-xs px-3 py-2 border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
        />
        <select
          v-model="filterJenjang"
          class="text-xs px-3 py-2 border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
        >
          <option value="">Semua Jenjang</option>
          <option v-for="j in DINIYAH_JENJANG" :key="j" :value="j">{{ j }}</option>
        </select>
        <select
          v-model="filterKelas"
          class="text-xs px-3 py-2 border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
        >
          <option value="">Semua Kelas</option>
          <option v-for="k in kelasOptions" :key="k" :value="k">{{ k }}</option>
        </select>
        <input
          v-model="search"
          type="search"
          placeholder="Cari santri..."
          class="text-xs px-3 py-2 border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
        />
      </div>
    </div>

    <!-- v.90.0626: Filter Jenjang Diniyah (SDI/SMP/SMA) — hidden kalau dipanggil dari Rekap Prestasi (route query) -->
    <div v-if="!forcedFromRoute" class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm">
      <p class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-2">Filter Jenjang Diniyah</p>
      <div class="grid grid-cols-4 gap-2">
        <button
          @click="filterJenjang = ''"
          :class="[
            'px-3 py-2 text-xs font-black rounded-xl transition cursor-pointer shadow-sm',
            filterJenjang === '' ? 'bg-slate-700 text-white' : 'bg-[var(--bg-muted)] text-[var(--text-primary)] hover:bg-slate-200'
          ]"
        >Semua</button>
        <button
          v-for="j in DINIYAH_JENJANG"
          :key="j"
          @click="filterJenjang = j"
          :class="[
            'px-3 py-2 text-xs font-black rounded-xl transition cursor-pointer shadow-sm',
            filterJenjang === j ? 'bg-cyan-600 text-white' : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100'
          ]"
        >{{ j }}</button>
      </div>
    </div>

    <!-- Table -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
    >
      <div v-if="filteredSantri.length === 0" class="py-10 text-center">
        <i class="fas fa-users-slash text-[var(--text-tertiary)] text-3xl block mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">Tidak ada santri di filter ini.</p>
        <p class="text-[10px] text-[var(--text-tertiary)]">
          Pilih lembaga/kelas lain atau pastikan santri punya lembaga_sekolah.
        </p>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-xs border-collapse">
          <thead class="bg-[var(--bg-muted)] sticky top-0">
            <tr>
              <th
                class="py-2 px-2 border border-[var(--border-default)] text-left font-black uppercase text-[10px] sticky left-0 bg-[var(--bg-muted)] z-10"
              >
                Nama
              </th>
              <th
                class="py-2 px-2 border border-[var(--border-default)] text-center font-black uppercase text-[10px]"
              >
                Lembaga
              </th>
              <th
                class="py-2 px-2 border border-[var(--border-default)] text-center font-black uppercase text-[10px]"
              >
                Kelas
              </th>
              <th
                v-for="m in mapelList"
                :key="m"
                class="py-2 px-2 border border-[var(--border-default)] text-center font-black uppercase text-[10px] bg-cyan-100 text-cyan-900 dark:bg-cyan-900/50 dark:text-cyan-200"
              >
                {{ m }}
              </th>
              <th
                class="py-2 px-2 border border-[var(--border-default)] text-center font-black uppercase text-[10px] bg-cyan-50 text-cyan-800"
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
                class="py-1.5 px-2 border border-[var(--border-default)] font-bold text-[var(--text-primary)] sticky left-0 bg-[var(--bg-card)]"
              >
                {{ s.nama }}
              </td>
              <td
                class="py-1.5 px-2 border border-[var(--border-default)] text-center text-[11px] text-[var(--text-secondary)]"
              >
                {{ s.lembaga_sekolah || '-' }}
              </td>
              <td
                class="py-1.5 px-2 border border-[var(--border-default)] text-center text-[11px] text-[var(--text-secondary)]"
              >
                {{ s.kelas_sekolah || '-' }}
              </td>
              <td v-for="m in mapelList" :key="m" class="py-0.5 px-1 border border-[var(--border-default)]">
                <input
                  type="text"
                  inputmode="numeric"
                  :value="getCell(s.id, m)"
                  @change="(ev) => saveCell(s.id, m, ev.target.value)"
                  class="w-full text-center text-[11px] py-1 px-1 border-0 outline-none bg-transparent focus:bg-cyan-50 dark:focus:bg-cyan-900/30 dark:text-white"
                  placeholder="-"
                />
              </td>
              <td
                :class="[
                  'py-1.5 px-2 border border-[var(--border-default)] text-center font-black bg-cyan-50 dark:bg-cyan-900/20',
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

    <p class="text-[10px] text-[var(--text-tertiary)] italic text-center">
      <i class="fas fa-info-circle mr-1"></i>
      Nilai per cell auto-save ke koleksi <code>rekap_diniyah</code> (doc id:
      <code>diniyah_{santri_id}_{periodKey}</code>).
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { subscribeColl } from '@/services/firestore'
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useSantri } from '@/composables/useSantri'
import { sortSantri } from '@/utils/santriSort'
// v.90.0626: util jenjang Diniyah (SDI/SMP/SMA) — sumber tunggal, samakan dg RaporView
import {
  diniyahJenjang,
  DINIYAH_JENJANG,
  DINIYAH_LEMBAGA,
  DEFAULT_MAPEL_DINIYAH,
  mapelDiniyahFor
} from '@/utils/jenjang'

// v.21.79: Prop forcedLembaga — kompat lama (parent control). v.90.0626: scope utama via route query.
const props = defineProps({
  forcedLembaga: { type: String, default: '' }
})

const route = useRoute()
const { santriRaw } = useSantri()
const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()

// Filter state — v.90.0626: pakai JENJANG Diniyah (SDI/SMP/SMA), bukan lembaga (SDI/PKBM)
const filterJenjang = ref('')
const filterKelas = ref('')
const search = ref('')

// v.90.0626: scope dari Rekap Prestasi -> /rekap-diniyah?lembaga=SDI | lembaga=PKBM&jenjang=SMP|SMA
const forcedFromRoute = ref(false)
function applyScope() {
  if (props.forcedLembaga) {
    const f = String(props.forcedLembaga).toUpperCase()
    filterJenjang.value = f === 'SDI' ? 'SDI' : ''
    forcedFromRoute.value = true
    return
  }
  const lmb = String(route.query.lembaga || '').toUpperCase()
  const jen = String(route.query.jenjang || '').toUpperCase()
  if (lmb === 'SDI') {
    filterJenjang.value = 'SDI'
    forcedFromRoute.value = true
  } else if (jen === 'SMP' || jen === 'SMA') {
    filterJenjang.value = jen
    forcedFromRoute.value = true
  } else {
    forcedFromRoute.value = false
  }
}
watch(() => route.query, applyScope, { immediate: true, deep: true })

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

// v.90.0626: mapel Diniyah per JENJANG (SDI/SMP/SMA) dari settings.rekapDiniyahMapel.
// Sumber tunggal yang sama dengan kotak "Mapel Diniyah" di Pengaturan Lembaga.
function getMapelForSantri(s) {
  const jk = diniyahJenjang(s.lembaga_sekolah, s.kelas_sekolah)
  return mapelDiniyahFor(jk, settings.settings?.rekapDiniyahMapel)
}

const mapelList = computed(() => {
  // Jenjang terpilih -> kolom mapel khusus jenjang itu
  if (filterJenjang.value) {
    return mapelDiniyahFor(filterJenjang.value, settings.settings?.rekapDiniyahMapel)
  }
  // "Semua" -> union mapel dari santri yang ditampilkan
  const set = new Set()
  for (const s of filteredSantri.value) {
    for (const m of getMapelForSantri(s)) set.add(m)
  }
  return set.size ? [...set] : DEFAULT_MAPEL_DINIYAH.slice()
})

const kelasOptions = computed(() => {
  const set = new Set()
  santriRaw.value.forEach((s) => {
    if (!s.kelas_sekolah) return
    if (!DINIYAH_LEMBAGA.includes(s.lembaga_sekolah)) return
    // hormati jenjang aktif (kelas SMP saja saat filter SMP, dst)
    if (
      filterJenjang.value &&
      diniyahJenjang(s.lembaga_sekolah, s.kelas_sekolah) !== filterJenjang.value
    )
      return
    set.add(s.kelas_sekolah)
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
  if (filterJenjang.value) {
    list = list.filter((s) => diniyahJenjang(s.lembaga_sekolah, s.kelas_sekolah) === filterJenjang.value)
  }
  if (filterKelas.value) list = list.filter((s) => s.kelas_sekolah === filterKelas.value)
  const kw = search.value.trim().toLowerCase()
  if (kw)
    list = list.filter((s) =>
      String(s.nama || '')
        .toLowerCase()
        .includes(kw)
    )
  return sortSantri(list, { lembagaField: 'lembaga_sekolah', kelasField: 'kelas_sekolah' })
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
  if (v === '-') return 'text-[var(--text-tertiary)]'
  const n = parseFloat(v)
  if (n >= 85) return 'text-emerald-700 dark:text-emerald-400'
  if (n >= 70) return 'text-cyan-700 dark:text-cyan-400'
  if (n >= 60) return 'text-cyan-700 dark:text-cyan-400'
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
