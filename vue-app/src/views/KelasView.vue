<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div
      v-if="!isDesktop"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <h1 class="text-base md:text-lg font-black">
        <i class="fas fa-door-open text-teal-500 mr-2"></i>Daftar Kelas per Lembaga
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        Kelola kelas/jilid via Master Lembaga → klik card lembaga → Kelas/Jilid
      </p>
    </div>
    <div class="space-y-3">
      <div
        v-for="l in lembagaList"
        :key="l.lembaga"
        class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-black">{{ l.lembaga }}</h3>
          <router-link :to="`/lembaga/${l.lembaga}`" class="text-xs text-cyan-600 hover:underline"
            >Edit →</router-link
          >
        </div>
        <div
          v-if="!Array.isArray(l.kelas) || l.kelas.length === 0"
          class="text-xs text-[var(--text-tertiary)] italic"
        >
          Belum ada kelas
        </div>
        <div v-else class="flex flex-wrap gap-1">
          <span
            v-for="k in l.kelas"
            :key="k"
            class="text-[10px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded font-bold"
            >{{ formatKelasLabel(l.lembaga, k) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// v.21.71.0526: PKBM SMP/SMA sub-tier label
import { formatKelasLabel } from '@/composables/useLembaga'
import { ref, onMounted, onUnmounted } from 'vue'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useDesktopShell } from '@/composables/useDesktopShell'
const lembagaList = ref([])
const { isElectron: isDesktop } = useDesktopShell()
let unsub = null
onMounted(() => {
  unsub = onSnapshot(doc(db, 'master', 'lembaga'), (snap) => {
    lembagaList.value = Array.isArray(snap.data()?.list) ? snap.data().list : []
  })
})
// v.98: cleanup listener master/lembaga (cegah leak tiap navigasi ke/dari Kelas)
onUnmounted(() => { if (unsub) unsub() })
</script>
