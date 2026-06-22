<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h1 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
        <i class="fas fa-book text-cyan-500 mr-1"></i>Rekap Diniyah (Sekolah)
      </h1>
      <p class="text-[11px] text-slate-500 dark:text-slate-400">
        Khusus santri SDI / PKBM · Total: {{ filteredSantri.length }} santri
      </p>
    </div>

    <!-- Filters -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2"
    >
      <select
        v-model="filterLembaga"
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-cyan-500 outline-none"
      >
        <option value="">SDI + PKBM</option>
        <option value="SDI">SDI saja</option>
        <option value="PKBM">PKBM saja</option>
      </select>
      <select
        v-model="filterKelas"
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-cyan-500 outline-none"
      >
        <option value="">Semua kelas</option>
        <option v-for="k in uniqueKelas" :key="k" :value="k">{{ k }}</option>
      </select>
      <input
        v-model="search"
        type="text"
        placeholder="Cari nama..."
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-cyan-500 outline-none"
      />
    </div>

    <!-- Info banner: kyai bisa edit mapel per kelas di Master Lembaga -->
    <div
      class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-3 border border-cyan-200 text-xs text-cyan-800"
    >
      <i class="fas fa-info-circle mr-1"></i>Mapel Diniyah berbeda per jenjang kelas (SDI: I-VI,
      PKBM: VII-XII). Setup mapel via <b>Master Lembaga → Pengaturan Schema</b>. TK exclude (tidak
      ada Diniyah).
    </div>

    <!-- List santri -->
    <div v-if="loading" class="bg-white rounded-2xl p-10 text-center">
      <i class="fas fa-spinner fa-spin text-cyan-500 text-3xl mb-2"></i>
      <p class="text-sm text-slate-500">Memuat...</p>
    </div>
    <div
      v-else-if="filteredSantri.length === 0"
      class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center"
    >
      <i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i>
      <p class="text-sm text-slate-500 italic">Tidak ada santri SDI/PKBM yang cocok.</p>
    </div>
    <div v-else class="space-y-2">
      <div
        v-for="s in filteredSantri"
        :key="s.id"
        class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 shadow-sm"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-book-reader"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 truncate">{{ s.nama }}</p>
            <p class="text-[10px] text-slate-500">
              {{ s.lembaga_sekolah || s.lembaga }} · Kelas Sekolah: {{ s.kelas_sekolah || '-' }}
            </p>
            <div class="flex flex-wrap gap-1 mt-1">
              <span class="text-[9px] bg-cyan-100 text-cyan-700 px-1.5 py-0.5 rounded font-bold"
                >{{ getMapelCount(s) }} mapel</span
              >
              <span
                v-if="s.lembaga"
                class="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold"
                >Qiraati: {{ s.lembaga }}</span
              >
            </div>
          </div>
          <button
            @click="toggleExpand(s.id)"
            class="text-cyan-500 hover:bg-cyan-50 px-2 py-1 rounded"
          >
            <i :class="['fas', expandedId === s.id ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
          </button>
        </div>
        <!-- Expanded mapel list -->
        <div v-if="expandedId === s.id" class="mt-2 pt-2 border-t border-cyan-100">
          <p class="text-[10px] font-bold text-cyan-700 uppercase mb-1">
            Mapel Diniyah · Kelas {{ s.kelas_sekolah || '-' }}
          </p>
          <div v-if="getMapelList(s).length === 0" class="text-xs text-slate-400 italic">
            Belum ada mapel diniyah untuk kelas ini. Setup di Master Lembaga.
          </div>
          <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-1">
            <div
              v-for="(m, i) in getMapelList(s)"
              :key="i"
              class="text-[11px] bg-cyan-50 rounded px-2 py-1"
            >
              <p class="font-bold">{{ m.nama || m }}</p>
              <p v-if="m.kkm" class="text-[9px] text-slate-500">KKM: {{ m.kkm }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'

// v.21.28.0526: Strict SDI/PKBM only — TK exclude (tidak ada Diniyah)
const DINIYAH_LEMBAGA = ['SDI', 'PKBM']

const santriRaw = ref([])
const lembagaRaw = ref({})
const loading = ref(true)
const search = ref('')
const filterLembaga = ref('')
const filterKelas = ref('')
const expandedId = ref(null)
let unsub = null

const santriDiniyah = computed(() => {
  return santriRaw.value.filter((s) => {
    if (s.aktif === false) return false
    const ls = String(s.lembaga_sekolah || '')
      .trim()
      .toUpperCase()
    return DINIYAH_LEMBAGA.includes(ls)
  })
})

const filteredSantri = computed(() => {
  let list = santriDiniyah.value
  if (filterLembaga.value) {
    list = list.filter(
      (s) => String(s.lembaga_sekolah || '').toUpperCase() === filterLembaga.value.toUpperCase()
    )
  }
  if (filterKelas.value)
    list = list.filter((s) => String(s.kelas_sekolah || '') === filterKelas.value)
  const kw = search.value.trim().toLowerCase()
  if (kw)
    list = list.filter((s) =>
      String(s.nama || '')
        .toLowerCase()
        .includes(kw)
    )
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
})

const uniqueKelas = computed(() => {
  const set = new Set()
  for (const s of santriDiniyah.value) {
    if (
      filterLembaga.value &&
      String(s.lembaga_sekolah || '').toUpperCase() !== filterLembaga.value.toUpperCase()
    )
      continue
    if (s.kelas_sekolah) set.add(s.kelas_sekolah)
  }
  return [...set].sort()
})

// Get mapel list dari master/lembaga.list[i].raporSchema atau settings/web.raporSchemas[lembagaName]
function getMapelList(s) {
  const ls = s.lembaga_sekolah
  const kls = s.kelas_sekolah
  if (!ls || !kls) return []
  const lembaga = lembagaRaw.value[ls] || lembagaRaw.value[String(ls).toUpperCase()] || null
  if (!lembaga) return []
  // Cek raporSchema per lembaga
  const schema = lembaga.raporSchema || lembaga.diniyahSchema
  if (!schema) return []
  if (Array.isArray(schema.jenjang)) {
    const j = schema.jenjang.find((x) => String(x.kelas || '') === String(kls))
    return j && Array.isArray(j.mapel) ? j.mapel : []
  }
  return []
}

function getMapelCount(s) {
  return getMapelList(s).length
}
function toggleExpand(id) {
  expandedId.value = expandedId.value === id ? null : id
}

onMounted(async () => {
  unsub = subscribeColl('santri', (docs) => {
    santriRaw.value = docs
    loading.value = false
  })
  try {
    const snap = await getDoc(doc(db, 'master', 'lembaga'))
    const list = Array.isArray(snap.data()?.list) ? snap.data().list : []
    const map = {}
    for (const l of list) {
      if (l.lembaga) map[l.lembaga] = l
    }
    lembagaRaw.value = map
  } catch (e) {
    /* ignore */
  }
})
onUnmounted(() => {
  if (unsub) {
    try {
      unsub()
    } catch (e) {}
  }
})
</script>
