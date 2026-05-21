<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h1 class="text-xl md:text-2xl font-black"><i class="fas fa-edit text-teal-500 mr-2"></i>Input Bulanan</h1>
      <p class="text-xs text-slate-500 mt-0.5">Input prestasi/nilai bulanan santri</p>
    </div>
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-2">
      <select v-model.number="filterTahun" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
        <option v-for="y in [2024,2025,2026,2027]" :key="y" :value="y">{{ y }}</option>
      </select>
      <select v-model.number="filterBulan" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
        <option v-for="(b, i) in NAMA_BULAN" :key="b" :value="i+1">{{ b }}</option>
      </select>
      <select v-model="filterLembaga" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
        <option value="">Semua lembaga</option>
        <option v-for="l in uniqueLembaga" :key="l" :value="l">{{ l }}</option>
      </select>
      <input v-model="search" type="text" placeholder="Cari nama..." class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
    </div>
    <div v-if="loading" class="bg-white rounded-2xl p-10 text-center"><i class="fas fa-spinner fa-spin text-teal-500 text-3xl"></i></div>
    <div v-else-if="filteredSantri.length === 0" class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center"><i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i><p class="text-sm text-slate-500 italic">Tidak ada santri.</p></div>
    <div v-else class="space-y-2">
      <div v-for="s in filteredSantri" :key="s.id" class="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center"><i class="fas fa-user-graduate"></i></div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold truncate">{{ s.nama }}</p>
            <p class="text-[10px] text-slate-500">{{ s.lembaga }} · Kelas {{ s.kelas || '-' }}</p>
          </div>
          <input v-model="prestasiMap[s.id]" type="text" placeholder="Nilai/catatan" class="w-40 px-2 py-1.5 text-xs border border-slate-300 rounded-lg bg-white" />
        </div>
      </div>
      <button v-if="filteredSantri.length > 0" @click="simpanBatch" :disabled="saving" class="w-full px-4 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow"><i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>{{ saving ? 'Menyimpan...' : 'Simpan Semua' }}</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useToast } from '@/composables/useToast'
const NAMA_BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const toast = useToast()
const santriRaw = ref([]); const loading = ref(true)
const filterTahun = ref(new Date().getFullYear()); const filterBulan = ref(new Date().getMonth() + 1)
const filterLembaga = ref(''); const search = ref('')
const prestasiMap = ref({}); const saving = ref(false)
let unsub = null
const uniqueLembaga = computed(() => [...new Set(santriRaw.value.map((s) => s.lembaga).filter(Boolean))].sort())
const filteredSantri = computed(() => {
  let list = santriRaw.value.filter((s) => s.aktif !== false)
  if (filterLembaga.value) list = list.filter((s) => s.lembaga === filterLembaga.value)
  const kw = search.value.trim().toLowerCase()
  if (kw) list = list.filter((s) => String(s.nama || '').toLowerCase().includes(kw))
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
})
async function simpanBatch() {
  saving.value = true
  let ok = 0
  try {
    const periode = `${filterTahun.value}-${String(filterBulan.value).padStart(2, '0')}`
    for (const sid of Object.keys(prestasiMap.value)) {
      const nilai = prestasiMap.value[sid]
      if (!nilai) continue
      try { await setDoc(doc(db, 'prestasi_bulanan', `${periode}_${sid}`), { santri_id: sid, periode, nilai, updated_at: serverTimestamp() }, { merge: true }); ok++ } catch (e) { console.warn(e?.message) }
    }
    toast.success(`${ok} prestasi tersimpan`)
  } catch (e) { toast.error('Gagal: ' + (e?.message || e)) } finally { saving.value = false }
}
onMounted(() => { unsub = subscribeColl('santri', (docs) => { santriRaw.value = docs; loading.value = false }) })
onUnmounted(() => { if (unsub) { try { unsub() } catch (e) {} } })
</script>
