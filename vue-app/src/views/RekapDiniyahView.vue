<template>
  <!-- v.20.17.0526: Rekap Diniyah FULL PORT match legacy renderRekapDiniyah() — grid input mapel x santri -->
  <div class="p-4 md:p-6 max-w-7xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex items-center justify-between gap-3 flex-wrap mb-3">
        <h2 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
          <i class="fas fa-mosque text-indigo-600 mr-2"></i>Rekap Diniyah
        </h2>
        <p class="text-[10px] text-slate-500 dark:text-slate-400">
          {{ santriFiltered.length }} santri · {{ NAMA_BULAN[filterBulan - 1] }} {{ filterTahun }}
        </p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
        <select v-model.number="filterBulan" class="text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
          <option v-for="(b, i) in NAMA_BULAN" :key="b" :value="i + 1">{{ b }}</option>
        </select>
        <input v-model.number="filterTahun" type="number" min="2024" max="2030" class="text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white" />
        <select v-model="filterLembaga" class="text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
          <option value="">Semua Lembaga</option>
          <option v-for="l in lembagaFormalOpts" :key="l" :value="l">{{ l }}</option>
        </select>
        <select v-model="filterKelasSekolah" class="text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
          <option value="">Semua Kelas</option>
          <option v-for="k in kelasSekolahOpts" :key="k" :value="k">{{ k }}</option>
        </select>
        <input v-model="search" type="search" placeholder="Cari santri..." class="text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white" />
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div v-if="santriFiltered.length === 0" class="py-10 text-center">
        <i class="fas fa-users-slash text-slate-300 text-3xl block mb-2"></i>
        <p class="text-sm text-slate-500 italic">Tidak ada santri di filter ini.</p>
        <p class="text-[10px] text-slate-400">Pilih lembaga/kelas lain atau pastikan santri punya lembaga_sekolah.</p>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-xs border-collapse">
          <thead class="bg-slate-100 dark:bg-slate-900/40 sticky top-0">
            <tr>
              <th class="py-2 px-2 border border-slate-300 text-left font-black uppercase text-[10px] sticky left-0 bg-slate-100 z-10">Nama</th>
              <th class="py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px]">Lembaga</th>
              <th class="py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px]">Kelas</th>
              <th v-for="f in mapelFields" :key="f" class="py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px] bg-blue-100 text-blue-900 dark:bg-blue-900/50 dark:text-blue-200">{{ f }}</th>
              <th class="py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px] bg-amber-50 text-amber-800">Rata2</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in santriFiltered" :key="s.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/30">
              <td class="py-1.5 px-2 border border-slate-300 font-bold text-slate-800 dark:text-white sticky left-0 bg-white dark:bg-slate-800">{{ s.nama }}</td>
              <td class="py-1.5 px-2 border border-slate-300 text-center text-[11px] text-slate-600">{{ s.lembaga_sekolah || '-' }}</td>
              <td class="py-1.5 px-2 border border-slate-300 text-center text-[11px] text-slate-600">{{ s.kelas_sekolah || '-' }}</td>
              <td v-for="f in mapelFields" :key="f" class="py-0.5 px-1 border border-slate-300">
                <input type="text" inputmode="numeric" :value="getCellValue(s.id, f)" @change="saveCell(s.id, f, $event.target.value)" class="w-full text-center text-[11px] py-1 px-1 border-0 outline-none bg-transparent focus:bg-yellow-50 dark:focus:bg-yellow-900/30 dark:text-white" placeholder="-" />
              </td>
              <td class="py-1.5 px-2 border border-slate-300 text-center font-black bg-amber-50 dark:bg-amber-900/20" :class="rataColor(rataNilai(s.id))">
                {{ rataNilai(s.id) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <p class="text-[10px] text-slate-400 italic text-center">
      <i class="fas fa-info-circle mr-1"></i>
      Nilai per cell auto-save ke koleksi <code>rekap_diniyah</code> (doc id: <code>diniyah_&#123;santri_id&#125;_&#123;periodKey&#125;</code>).
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { useSantri } from '@/composables/useSantri'
import { useLembaga } from '@/composables/useLembaga'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { subscribeColl, serverTimestamp } from '@/services/firestore'
import { db } from '@/services/firebase'

const { santriRaw } = useSantri()
const { lembagaRaw } = useLembaga()
const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()

// v.20.17.0526: Default mapel match legacy DEFAULT_REKAP_DINIYAH_FIELDS
const DEFAULT_REKAP_DINIYAH_FIELDS = ['Aqidah Akhlak', 'Fiqh', 'Tarikh', 'Bahasa Arab']

const filterLembaga = ref('')
const filterKelasSekolah = ref('')
const NAMA_BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const _now = new Date()
const filterBulan = ref(_now.getMonth() + 1)
const filterTahun = ref(_now.getFullYear())
const search = ref('')

// Subscribe rekap_diniyah collection (match legacy db_rekap_diniyah)
const rekapRaw = ref([])
let unsubRekap = null
onMounted(() => {
  unsubRekap = subscribeColl('rekap_diniyah', (docs) => { rekapRaw.value = docs || [] })
})
onUnmounted(() => { if (unsubRekap) try { unsubRekap() } catch (e) {} })

// v.20.73.0526: mapel per-kelas (kyai: kelas berbeda → mapel berbeda)
// Schema: settings.rekapSchemaDiniyahPerKelas = { 'TK A': ['Mapel1', ...], 'I': [...], ... }
// Fallback: settings.rekapSchemaDiniyah (legacy global array) → semua kelas pakai mapel sama
function mapelForKelas(kelas) {
  const perKelas = settings.settings?.rekapSchemaDiniyahPerKelas
  if (perKelas && typeof perKelas === 'object') {
    const k = String(kelas || '').trim()
    if (Array.isArray(perKelas[k]) && perKelas[k].length > 0) return perKelas[k]
  }
  const fromSetting = settings.settings?.rekapSchemaDiniyah
  if (Array.isArray(fromSetting) && fromSetting.length > 0) return fromSetting
  return DEFAULT_REKAP_DINIYAH_FIELDS
}
// All mapel keys across filtered kelas — union for table columns when filter campur
const mapelFields = computed(() => {
  if (filterKelasSekolah.value) return mapelForKelas(filterKelasSekolah.value)
  // Union semua mapel dari kelas yg ada di santri filter
  const set = new Set()
  for (const s of santriFiltered.value) {
    for (const m of mapelForKelas(s.kelas_sekolah)) set.add(m)
  }
  if (set.size === 0) {
    const fromSetting = settings.settings?.rekapSchemaDiniyah
    if (Array.isArray(fromSetting) && fromSetting.length > 0) return fromSetting
    return DEFAULT_REKAP_DINIYAH_FIELDS
  }
  return [...set]
})

// v.21.25.0526: SDI/PKBM only (exclude TK — TK tidak punya mapel diniyah)
const DINIYAH_LEMBAGA = ['SDI', 'PKBM']
const lembagaFormalOpts = computed(() => {
  const fromMaster = (lembagaRaw.value || [])
    .filter((l) => DINIYAH_LEMBAGA.includes(l.lembaga))
    .map((l) => l.lembaga)
    .filter(Boolean)
  return fromMaster.length > 0 ? fromMaster : DINIYAH_LEMBAGA
})
const kelasSekolahOpts = computed(() => {
  const set = new Set()
  santriRaw.value.forEach((s) => {
    if (s.kelas_sekolah) set.add(s.kelas_sekolah)
  })
  return [...set].sort()
})

const isGuruOnly = computed(() => auth.sesiAktif?.role === 'guru' &&
  auth.sesiAktif?.role_sistem !== 'super_admin' &&
  auth.sesiAktif?.id !== 'admin')
const myNama = computed(() => auth.sesiAktif?.nama || '')

const santriFiltered = computed(() => {
  // v.21.25.0526: santri di SDI/PKBM only — TK exclude (mapel diniyah tidak applicable)
  let list = santriRaw.value.filter((s) => s.aktif !== false && s.lembaga_sekolah && DINIYAH_LEMBAGA.includes(s.lembaga_sekolah))
  if (isGuruOnly.value) {
    list = list.filter((s) => Array.isArray(s.guru_sekolah) && s.guru_sekolah.includes(myNama.value))
  }
  if (filterLembaga.value) list = list.filter((s) => s.lembaga_sekolah === filterLembaga.value)
  if (filterKelasSekolah.value) list = list.filter((s) => s.kelas_sekolah === filterKelasSekolah.value)
  if (search.value.trim()) {
    const q = search.value.trim().toLowerCase()
    list = list.filter((s) => String(s.nama || '').toLowerCase().includes(q))
  }
  return list.sort((a, b) =>
    String(a.lembaga_sekolah).localeCompare(String(b.lembaga_sekolah)) ||
    String(a.kelas_sekolah).localeCompare(String(b.kelas_sekolah)) ||
    String(a.nama).localeCompare(String(b.nama))
  )
})

const periodKey = computed(() =>
  `${filterTahun.value}_${String(filterBulan.value).padStart(2, '0')}`
)

function slugField(f) {
  return String(f).toLowerCase().replace(/[^a-z0-9]/g, '_')
}

function getRec(sId) {
  const recId = `diniyah_${sId}_${periodKey.value}`
  return rekapRaw.value.find((r) => r.id === recId) || null
}
function getCellValue(sId, field) {
  const rec = getRec(sId)
  return rec?.data?.[slugField(field)] || ''
}
function rataNilai(sId) {
  const rec = getRec(sId)
  if (!rec?.data) return '-'
  const vals = Object.values(rec.data).map((v) => parseFloat(v)).filter((v) => !isNaN(v))
  if (vals.length === 0) return '-'
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length
  return avg.toFixed(1)
}
function rataColor(n) {
  if (n === '-') return 'text-slate-400'
  const v = parseFloat(n)
  if (v >= 85) return 'text-emerald-700 dark:text-emerald-400'
  if (v >= 70) return 'text-blue-700 dark:text-blue-400'
  if (v >= 60) return 'text-amber-700 dark:text-amber-400'
  return 'text-rose-700 dark:text-rose-400'
}

async function saveCell(sId, field, val) {
  const recId = `diniyah_${sId}_${periodKey.value}`
  const fkey = slugField(field)
  try {
    const existing = getRec(sId)
    const newData = { ...(existing?.data || {}), [fkey]: val }
    if (existing) {
      await updateDoc(doc(db, 'rekap_diniyah', recId), {
        data: newData,
        updated_at: serverTimestamp()
      })
    } else {
      await setDoc(doc(db, 'rekap_diniyah', recId), {
        id: recId,
        santri_id: sId,
        periode: periodKey.value,
        data: newData,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      })
    }
    toast.success(`Tersimpan: ${field}`)
  } catch (e) {
    toast.error(`Gagal simpan: ${e.message || e}`)
    console.error('[RekapDiniyah] saveCell error:', e)
  }
}
</script>
