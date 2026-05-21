<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-xl md:text-2xl font-black"><i class="fas fa-money-check-alt text-blue-500 mr-2"></i>Pembayaran</h1>
          <p class="text-xs text-slate-500 mt-0.5">{{ isSantriOnly ? 'Riwayat pembayaran Anda' : 'Log pembayaran semua santri' }}</p>
        </div>
        <div class="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs">
          <span class="text-blue-700 font-bold">{{ fmtRp(totalPembayaran) }}</span>
          <span class="text-slate-500 ml-1">total</span>
        </div>
      </div>
    </div>

    <!-- Filter (admin) -->
    <div v-if="!isSantriOnly" class="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2">
      <input v-model="search" type="text" placeholder="Cari nama santri..." class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
      <select v-model.number="filterBulan" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
        <option :value="0">Semua bulan</option>
        <option v-for="(b, i) in NAMA_BULAN" :key="b" :value="i+1">{{ b }}</option>
      </select>
      <select v-model.number="filterTahun" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white">
        <option v-for="y in [2024,2025,2026,2027]" :key="y" :value="y">{{ y }}</option>
      </select>
    </div>

    <!-- List -->
    <div v-if="loading" class="bg-white rounded-2xl p-10 text-center"><i class="fas fa-spinner fa-spin text-blue-500 text-3xl"></i></div>
    <div v-else-if="filteredItems.length === 0" class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center"><i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i><p class="text-sm text-slate-500 italic">Belum ada pembayaran.</p></div>
    <div v-else class="space-y-2">
      <div v-for="p in filteredItems" :key="p.id" class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0"><i class="fas fa-check"></i></div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold truncate">{{ p.santri_nama || getNamaSantri(p.santri_id) }}</p>
            <p class="text-[10px] text-slate-500">{{ fmtTgl(p.tanggal) }} · {{ p.catatan || '-' }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-black text-emerald-700">{{ fmtRp(p.nominal) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { fmtRp, fmtTgl } from '@/utils/format'

const NAMA_BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const auth = useAuthStore()
const pembayaranRaw = ref([])
const santriList = ref([])
const loading = ref(true)
const search = ref('')
const filterBulan = ref(0)
const filterTahun = ref(new Date().getFullYear())
let unsubBayar = null
let unsubSantri = null

const isSantriOnly = computed(() => auth.sesiAktif?.role === 'santri')
function getNamaSantri(id) { const s = santriList.value.find((x) => String(x.id) === String(id)); return s?.nama || '(unknown)' }

const filteredItems = computed(() => {
  let list = [...pembayaranRaw.value]
  if (isSantriOnly.value) list = list.filter((p) => String(p.santri_id) === String(auth.sesiAktif?.id))
  if (filterBulan.value && filterBulan.value > 0) {
    list = list.filter((p) => {
      const d = new Date(p.tanggal || p.created_at)
      return !isNaN(d.getTime()) && d.getFullYear() === filterTahun.value && (d.getMonth() + 1) === filterBulan.value
    })
  } else if (filterTahun.value) {
    list = list.filter((p) => {
      const d = new Date(p.tanggal || p.created_at)
      return !isNaN(d.getTime()) && d.getFullYear() === filterTahun.value
    })
  }
  const kw = search.value.trim().toLowerCase()
  if (kw) list = list.filter((p) => String(p.santri_nama || getNamaSantri(p.santri_id)).toLowerCase().includes(kw))
  return list.sort((a, b) => String(b.tanggal || '').localeCompare(String(a.tanggal || '')))
})

const totalPembayaran = computed(() => filteredItems.value.reduce((s, p) => s + (Number(p.nominal) || 0), 0))

onMounted(() => {
  unsubBayar = subscribeColl('keuangan_pembayaran', (docs) => { pembayaranRaw.value = docs; loading.value = false })
  unsubSantri = subscribeColl('santri', (docs) => { santriList.value = docs })
})
onUnmounted(() => {
  if (unsubBayar) { try { unsubBayar() } catch (e) {} }
  if (unsubSantri) { try { unsubSantri() } catch (e) {} }
})
</script>
