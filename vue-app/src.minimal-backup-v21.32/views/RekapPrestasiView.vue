<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h1 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
        <i class="fas fa-trophy text-amber-500 mr-1"></i>Rekap Prestasi Qiraati
      </h1>
      <p class="text-[11px] text-slate-500 dark:text-slate-400">
        Rekap pencapaian santri Qiraati per kelas/lembaga · Total:
        {{ filteredSantri.length }} santri
      </p>
    </div>

    <!-- Filters -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2"
    >
      <select
        v-model="filterLembaga"
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
      >
        <option value="">Semua lembaga Qiraati</option>
        <option v-for="l in LEMBAGA_QIRAATI" :key="l" :value="l">{{ l }}</option>
      </select>
      <select
        v-model="filterKelas"
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
      >
        <option value="">Semua kelas</option>
        <option v-for="k in uniqueKelas" :key="k" :value="k">{{ k }}</option>
      </select>
      <input
        v-model="search"
        type="text"
        placeholder="Cari nama..."
        class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
      />
    </div>

    <!-- Stats badges -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-2 text-center"
    >
      <div class="bg-amber-50 rounded-lg p-2">
        <p class="text-2xl font-black text-amber-700">{{ stats.totalKenaikan }}</p>
        <p class="text-[10px] uppercase text-slate-500">Total Kenaikan</p>
      </div>
      <div class="bg-emerald-50 rounded-lg p-2">
        <p class="text-2xl font-black text-emerald-700">{{ stats.santriDgnRiwayat }}</p>
        <p class="text-[10px] uppercase text-slate-500">Santri Aktif Naik</p>
      </div>
      <div class="bg-blue-50 rounded-lg p-2">
        <p class="text-2xl font-black text-blue-700">{{ stats.avgKenaikan }}</p>
        <p class="text-[10px] uppercase text-slate-500">Avg Naik/Santri</p>
      </div>
      <div class="bg-purple-50 rounded-lg p-2">
        <p class="text-2xl font-black text-purple-700">{{ filteredSantri.length }}</p>
        <p class="text-[10px] uppercase text-slate-500">Santri</p>
      </div>
    </div>

    <!-- List santri dengan prestasi -->
    <div v-if="loading" class="bg-white rounded-2xl p-10 text-center">
      <i class="fas fa-spinner fa-spin text-amber-500 text-3xl mb-2"></i>
      <p class="text-sm text-slate-500">Memuat...</p>
    </div>
    <div
      v-else-if="filteredSantri.length === 0"
      class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center"
    >
      <i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i>
      <p class="text-sm text-slate-500 italic">Tidak ada santri Qiraati yang cocok.</p>
    </div>
    <div v-else class="space-y-2">
      <div
        v-for="s in filteredSantri"
        :key="s.id"
        class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 shadow-sm"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-user-graduate"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 truncate">{{ s.nama }}</p>
            <p class="text-[10px] text-slate-500">
              {{ s.lembaga }} {{ s.shift ? '· ' + s.shift : '' }} · Kelas {{ s.kelas || '-'
              }}{{ s.juz ? ' · Juz ' + s.juz : '' }}
            </p>
            <div class="flex flex-wrap gap-1 mt-1">
              <span class="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold"
                >{{ countRiwayat(s) }} kenaikan</span
              >
              <span
                v-if="s.prestasi_awal"
                class="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold"
                >Awal: {{ s.prestasi_awal }}</span
              >
              <span
                v-if="s.prestasi_akhir"
                class="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold"
                >Akhir: {{ s.prestasi_akhir }}</span
              >
            </div>
          </div>
          <button
            @click="toggleExpand(s.id)"
            class="text-amber-500 hover:bg-amber-50 px-2 py-1 rounded"
          >
            <i :class="['fas', expandedId === s.id ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
          </button>
        </div>
        <!-- Expanded riwayat -->
        <div
          v-if="expandedId === s.id && Array.isArray(s.riwayat) && s.riwayat.length > 0"
          class="mt-2 pt-2 border-t border-amber-100"
        >
          <p class="text-[10px] font-bold text-amber-700 uppercase mb-1">
            Riwayat Kenaikan ({{ s.riwayat.length }})
          </p>
          <div class="space-y-1">
            <div
              v-for="(r, i) in s.riwayat"
              :key="i"
              class="text-[11px] bg-amber-50 rounded px-2 py-1 flex justify-between gap-2"
            >
              <span
                ><b>{{ r.tgl_naik || '-' }}</b
                >: {{ r.kelas_from || '?' }} → {{ r.kelas_to || '?' }}</span
              >
              <span v-if="r.catatan" class="text-slate-500 italic truncate">{{ r.catatan }}</span>
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

const LEMBAGA_QIRAATI = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH']

const santriRaw = ref([])
const loading = ref(true)
const search = ref('')
const filterLembaga = ref('')
const filterKelas = ref('')
const expandedId = ref(null)
let unsub = null

// v.21.28.0526: Filter santri Qiraati ONLY (TPQ + Pra PTPT + PTPT + PPPH), exclude TK/SDI/PKBM/Yayasan
const santriQiraati = computed(() => {
  return santriRaw.value.filter((s) => {
    if (s.aktif === false) return false
    const lmb = String(s.lembaga || '')
      .trim()
      .toLowerCase()
    return LEMBAGA_QIRAATI.some((q) => q.toLowerCase() === lmb) || lmb === 'tpq'
  })
})

const filteredSantri = computed(() => {
  let list = santriQiraati.value
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
    list = list.filter((s) =>
      String(s.nama || '')
        .toLowerCase()
        .includes(kw)
    )
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
})

const uniqueKelas = computed(() => {
  const set = new Set()
  for (const s of santriQiraati.value) if (s.kelas) set.add(s.kelas)
  return [...set].sort()
})

const stats = computed(() => {
  let totalKenaikan = 0
  let santriDgnRiwayat = 0
  for (const s of filteredSantri.value) {
    const n = Array.isArray(s.riwayat) ? s.riwayat.length : 0
    totalKenaikan += n
    if (n > 0) santriDgnRiwayat++
  }
  const avg =
    filteredSantri.value.length > 0 ? (totalKenaikan / filteredSantri.value.length).toFixed(1) : '0'
  return { totalKenaikan, santriDgnRiwayat, avgKenaikan: avg }
})

function countRiwayat(s) {
  return Array.isArray(s.riwayat) ? s.riwayat.length : 0
}
function toggleExpand(id) {
  expandedId.value = expandedId.value === id ? null : id
}

onMounted(() => {
  unsub = subscribeColl('santri', (docs) => {
    santriRaw.value = docs
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
