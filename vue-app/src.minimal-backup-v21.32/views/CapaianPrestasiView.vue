<template>
  <div class="p-3 md:p-5 max-w-3xl mx-auto space-y-4">
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h1 class="text-xl md:text-2xl font-black">
        <i class="fas fa-medal text-amber-500 mr-2"></i>Capaian Prestasi Saya
      </h1>
      <p class="text-xs text-slate-500 mt-0.5">{{ santri?.nama || 'Memuat...' }}</p>
    </div>
    <div v-if="santri" class="space-y-3">
      <div class="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200 text-center">
        <p class="text-[10px] uppercase font-black text-amber-700">Total Kenaikan</p>
        <p class="text-4xl font-black text-amber-800 mt-1">{{ riwayatCount }}</p>
        <p class="text-xs text-amber-600 mt-1">
          {{ santri.lembaga }} · Kelas {{ santri.kelas || '-'
          }}{{ santri.juz ? ' · Juz ' + santri.juz : '' }}
        </p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-slate-100">
          <h3 class="text-sm font-black">
            <i class="fas fa-history text-amber-500 mr-1"></i>Timeline Kenaikan
          </h3>
        </div>
        <div v-if="riwayatCount === 0" class="p-8 text-center text-sm text-slate-500 italic">
          Belum ada kenaikan tercatat.
        </div>
        <div v-else class="divide-y divide-slate-100">
          <div v-for="(r, i) in santri.riwayat" :key="i" class="p-3 flex items-center gap-3">
            <div
              class="w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"
            >
              <i class="fas fa-arrow-up"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold">{{ r.kelas_from || '?' }} → {{ r.kelas_to || '?' }}</p>
              <p class="text-[10px] text-slate-500">
                {{ r.tgl_naik || '-' }}{{ r.catatan ? ' · ' + r.catatan : '' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const santri = ref(null)
const riwayatCount = computed(() =>
  Array.isArray(santri.value?.riwayat) ? santri.value.riwayat.length : 0
)
onMounted(async () => {
  const id = auth.sesiAktif?.id
  if (!id) return
  try {
    const snap = await getDoc(doc(db, 'santri', String(id)))
    santri.value = snap.exists() ? snap.data() : null
  } catch (e) {
    console.warn(e?.message)
  }
})
</script>
