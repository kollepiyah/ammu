<template>
  <div class="p-3 md:p-5 max-w-3xl mx-auto space-y-3">
    <BackButton />
    <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border-subtle)] text-center text-sm text-[var(--text-secondary)]">
      <i class="fas fa-spinner fa-spin mr-2"></i>Memuat profil…
    </div>
    <div v-else-if="!rec" class="bg-[var(--bg-card)] rounded-2xl p-8 border border-dashed border-[var(--border-default)] text-center">
      <i class="fas fa-user-slash text-3xl text-[var(--text-tertiary)] block mb-2"></i>
      <p class="text-sm text-[var(--text-secondary)]">Data tidak ditemukan.</p>
    </div>
    <template v-else>
      <ProfilGuru v-if="tipe === 'guru'" :guru="rec" readonly />
      <ProfilSantri v-else :santri="rec" readonly />

      <!-- Prestasi (santri) -->
      <div v-if="tipe === 'santri'" class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black uppercase tracking-widest text-[var(--text-primary)] mb-3 pb-2 border-b border-[var(--border-subtle)] flex items-center gap-2">
          <i class="fas fa-trophy text-amber-500"></i>Capaian Prestasi
        </h3>
        <div class="grid grid-cols-3 gap-2 text-center">
          <div class="bg-[var(--bg-card-elevated)] rounded-xl p-3">
            <div class="text-[10px] text-[var(--text-secondary)] uppercase font-bold">Awal</div>
            <div class="text-lg font-black text-[var(--text-primary)]">{{ rec.prestasi_awal || '-' }}</div>
          </div>
          <div class="bg-[var(--bg-card-elevated)] rounded-xl p-3">
            <div class="text-[10px] text-[var(--text-secondary)] uppercase font-bold">Akhir</div>
            <div class="text-lg font-black text-[var(--text-primary)]">{{ rec.prestasi_akhir || '-' }}</div>
          </div>
          <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3">
            <div class="text-[10px] text-emerald-700 dark:text-emerald-300 uppercase font-bold">Total</div>
            <div class="text-lg font-black text-emerald-700 dark:text-emerald-300">{{ rec.prestasi_total || '-' }}</div>
          </div>
        </div>
        <p v-if="!rec.prestasi_awal && !rec.prestasi_akhir && !rec.prestasi_total" class="text-[11px] text-[var(--text-tertiary)] italic mt-3 text-center">
          Belum ada data prestasi.
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getOne } from '@/services/firestore'
import BackButton from '@/components/layout/BackButton.vue'
import ProfilSantri from '@/views/profil/ProfilSantri.vue'
import ProfilGuru from '@/views/profil/ProfilGuru.vue'

const route = useRoute()
const tipe = computed(() => (route.params.tipe === 'guru' ? 'guru' : 'santri'))
const id = computed(() => String(route.params.id || ''))
const rec = ref(null)
const loading = ref(true)

async function load() {
  loading.value = true
  rec.value = null
  try {
    rec.value = await getOne(tipe.value, id.value)
  } catch (e) {
    rec.value = null
  }
  loading.value = false
}
watch([tipe, id], load, { immediate: true })
</script>
