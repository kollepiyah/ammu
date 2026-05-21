<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h1 class="text-xl md:text-2xl font-black"><i class="fas fa-cog text-emerald-500 mr-2"></i>Pengaturan Keuangan</h1>
      <p class="text-xs text-slate-500 mt-0.5">Set bisyaroh pokok + tambahan per guru</p>
    </div>

    <!-- Save bar -->
    <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between gap-2">
      <p class="text-xs text-emerald-800"><i class="fas fa-info-circle mr-1"></i>Setting bisyaroh pokok/sekolah per guru — dipakai saat generate slip bisyaroh.</p>
      <button @click="simpan" :disabled="saving" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black rounded-lg shadow">
        <i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>{{ saving ? 'Menyimpan...' : 'Simpan Semua' }}
      </button>
    </div>

    <!-- Filter -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-2">
      <input v-model="search" type="text" placeholder="Cari nama guru..." class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
      <select v-model="filterLembaga" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
        <option value="">Semua lembaga</option>
        <option v-for="l in uniqueLembaga" :key="l" :value="l">{{ l }}</option>
      </select>
    </div>

    <!-- List guru dengan input bisyaroh -->
    <div v-if="loading" class="bg-white rounded-2xl p-10 text-center"><i class="fas fa-spinner fa-spin text-emerald-500 text-3xl"></i></div>
    <div v-else class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div class="px-4 py-3 border-b border-slate-100 bg-slate-50 grid grid-cols-[1fr_140px_140px] gap-2 items-center text-xs font-black uppercase tracking-wider text-slate-600">
        <span>Guru</span>
        <span class="text-right">Pokok</span>
        <span class="text-right">Sekolah</span>
      </div>
      <div class="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
        <div v-for="g in filteredGuru" :key="g.id" class="px-4 py-2 grid grid-cols-[1fr_140px_140px] gap-2 items-center hover:bg-slate-50">
          <div class="min-w-0">
            <p class="text-sm font-bold truncate">{{ g.nama }}</p>
            <p class="text-[10px] text-slate-500">{{ g.lembaga || '-' }} · {{ g.jabatan || 'Guru' }}</p>
          </div>
          <input v-model.number="bisyarohPokokMap[g.id]" type="number" min="0" placeholder="0" class="px-2 py-1.5 text-sm rounded-lg border border-slate-300 bg-white text-right font-bold" />
          <input v-model.number="bisyarohSekolahMap[g.id]" type="number" min="0" placeholder="0" class="px-2 py-1.5 text-sm rounded-lg border border-slate-300 bg-white text-right font-bold" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useToast } from '@/composables/useToast'

const toast = useToast()
const guruList = ref([])
const loading = ref(true)
const search = ref('')
const filterLembaga = ref('')
const bisyarohPokokMap = ref({})
const bisyarohSekolahMap = ref({})
const saving = ref(false)
let unsubGuru = null

const uniqueLembaga = computed(() => [...new Set(guruList.value.map((g) => g.lembaga).filter(Boolean))].sort())

const filteredGuru = computed(() => {
  let list = guruList.value.filter((g) => String(g.status || 'Aktif').toLowerCase() === 'aktif')
  if (filterLembaga.value) list = list.filter((g) => g.lembaga === filterLembaga.value)
  const kw = search.value.trim().toLowerCase()
  if (kw) list = list.filter((g) => String(g.nama || '').toLowerCase().includes(kw))
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
})

async function loadSettings() {
  try {
    const snap = await getDoc(doc(db, 'settings', 'web'))
    const d = snap.exists() ? snap.data() : {}
    bisyarohPokokMap.value = { ...(d.keu_bisyaroh_pokok || {}) }
    bisyarohSekolahMap.value = { ...(d.keu_bisyaroh_sekolah || {}) }
  } catch (e) { console.warn(e?.message) }
}

async function simpan() {
  if (saving.value) return
  saving.value = true
  try {
    await setDoc(doc(db, 'settings', 'web'), {
      keu_bisyaroh_pokok: bisyarohPokokMap.value,
      keu_bisyaroh_sekolah: bisyarohSekolahMap.value,
      _updated_at: serverTimestamp()
    }, { merge: true })
    toast.success('Pengaturan tersimpan')
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  unsubGuru = subscribeColl('guru', (docs) => { guruList.value = docs; loading.value = false })
  await loadSettings()
})
onUnmounted(() => { if (unsubGuru) { try { unsubGuru() } catch (e) {} } })
</script>
