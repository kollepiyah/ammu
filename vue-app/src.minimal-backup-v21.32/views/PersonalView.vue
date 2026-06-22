<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h1 class="text-xl md:text-2xl font-black">
        <i class="fas fa-user-circle text-indigo-500 mr-2"></i>Dashboard Personal
      </h1>
      <p class="text-xs text-slate-500 mt-0.5">
        {{ auth.sesiAktif?.nama || '-' }} · {{ auth.sesiAktif?.jabatan || 'Admin' }}
      </p>
    </div>
    <div v-if="guru" class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div class="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-200">
        <p class="text-[10px] uppercase font-black text-emerald-700">Bisyaroh Bulan Ini</p>
        <p class="text-2xl font-black text-emerald-800 mt-1">
          {{ fmtRp(slipBulanIni?.take_home || 0) }}
        </p>
        <p class="text-[10px] text-emerald-600 mt-1">
          {{ slipBulanIni ? 'Sudah diterbitkan' : 'Belum diterbitkan' }}
        </p>
      </div>
      <div class="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
        <p class="text-[10px] uppercase font-black text-blue-700">Total Bisyaroh Tahun Ini</p>
        <p class="text-2xl font-black text-blue-800 mt-1">{{ fmtRp(totalTahunIni) }}</p>
        <p class="text-[10px] text-blue-600 mt-1">{{ slipTahunIni.length }} slip</p>
      </div>
      <div class="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200">
        <p class="text-[10px] uppercase font-black text-amber-700">Lama Mengabdi</p>
        <p class="text-2xl font-black text-amber-800 mt-1">{{ lamaMengajar }}</p>
        <p class="text-[10px] text-amber-600 mt-1">Sejak {{ guru?.tanggal_tugas || '-' }}</p>
      </div>
    </div>
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="px-4 py-3 border-b border-slate-100">
        <h3 class="text-sm font-black">
          <i class="fas fa-history text-indigo-500 mr-1"></i>Riwayat Slip Bisyaroh
        </h3>
      </div>
      <div v-if="slipTahunIni.length === 0" class="p-8 text-center text-sm text-slate-500 italic">
        Belum ada slip.
      </div>
      <div v-else class="divide-y divide-slate-100">
        <div v-for="g in slipTahunIni" :key="g.id" class="p-3 flex items-center justify-between">
          <div>
            <p class="text-sm font-bold">{{ g.periode }}</p>
            <p class="text-[10px] text-slate-500">{{ g.lembaga }} · {{ g.jabatan }}</p>
          </div>
          <p class="text-sm font-black text-emerald-700">{{ fmtRp(g.take_home || 0) }}</p>
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
import { useAuthStore } from '@/stores/auth'
import { fmtRp, hitungLamaMengajar } from '@/utils/format'
const auth = useAuthStore()
const guru = ref(null)
const slipRaw = ref([])
let unsub = null
const lamaMengajar = computed(() => hitungLamaMengajar(guru.value?.tanggal_tugas))
const slipMine = computed(() =>
  slipRaw.value.filter((g) => String(g.guru_id) === String(auth.sesiAktif?.id))
)
const slipTahunIni = computed(() => {
  const y = new Date().getFullYear()
  return slipMine.value
    .filter((g) => String(g.periode || '').startsWith(String(y)))
    .sort((a, b) => String(b.periode || '').localeCompare(String(a.periode || '')))
})
const slipBulanIni = computed(() => {
  const periode = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
  return slipTahunIni.value.find((g) => g.periode === periode)
})
const totalTahunIni = computed(() =>
  slipTahunIni.value.reduce((s, g) => s + (Number(g.take_home) || 0), 0)
)
onMounted(async () => {
  unsub = subscribeColl('keuangan_gaji', (docs) => {
    slipRaw.value = docs
  })
  try {
    const snap = await getDoc(doc(db, 'guru', String(auth.sesiAktif?.id)))
    guru.value = snap.exists() ? snap.data() : null
  } catch (e) {
    console.warn(e?.message)
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
