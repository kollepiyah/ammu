<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-base md:text-lg font-black"><i class="fas fa-hourglass-half text-amber-500 mr-2"></i>Pembayaran Pending</h1>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">{{ isSantriOnly ? 'Konfirmasi pembayaran Anda yang menunggu verifikasi' : 'Konfirmasi pembayaran menunggu verifikasi admin' }}</p>
        </div>
        <div class="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs">
          <span class="text-amber-700 font-bold">{{ pendingItems.length }}</span>
          <span class="text-[var(--text-secondary)] ml-1">pending</span>
        </div>
      </div>
    </div>

    <!-- List -->
    <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center"><i class="fas fa-spinner fa-spin text-amber-500 text-3xl"></i></div>
    <div v-else-if="pendingItems.length === 0" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center">
      <i class="fas fa-check-circle text-emerald-400 text-3xl mb-2"></i>
      <p class="text-sm text-[var(--text-secondary)] italic">Tidak ada pembayaran pending.</p>
    </div>
    <div v-else class="space-y-2">
      <div v-for="p in pendingItems" :key="p.id" class="bg-[var(--bg-card)] rounded-xl p-3 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0"><i class="fas fa-hourglass-half"></i></div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold truncate">{{ p.santri_nama || getNamaSantri(p.santri_id) }}</p>
            <p class="text-[10px] text-[var(--text-secondary)]">Transfer: {{ p.tanggal_transfer || '-' }} · {{ p.catatan || p.metode || 'Transfer' }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-black text-amber-700">{{ fmtRp(p.nominal) }}</p>
            <a v-if="p.bukti_url" :href="p.bukti_url" target="_blank" rel="noopener" class="text-[10px] text-cyan-600 hover:underline"><i class="fas fa-receipt mr-0.5"></i>Lihat bukti</a>
          </div>
        </div>
      </div>
    </div>

    <!-- v.86.0526: list read-only — flow submit/verifikasi 2-jalur difinalkan kyai -->
    <p class="text-[10px] text-center text-[var(--text-tertiary)] italic">Sumber: koleksi pembayaran_konfirmasi (status = pending).</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { fmtRp } from '@/utils/format'

const auth = useAuthStore()
const konfirmasiRaw = ref([])
const santriList = ref([])
const loading = ref(true)
let unsubKonf = null
let unsubSantri = null

const isSantriOnly = computed(() => auth.sesiAktif?.role === 'santri')
function getNamaSantri(id) {
  const s = santriList.value.find((x) => String(x.id) === String(id))
  return s?.nama || '(unknown)'
}

const pendingItems = computed(() => {
  let list = (konfirmasiRaw.value || []).filter((p) => (p.status || 'pending') === 'pending')
  if (isSantriOnly.value) list = list.filter((p) => String(p.santri_id) === String(auth.sesiAktif?.id))
  return list.sort((a, b) => String(b.tanggal_transfer || b.created_at || '').localeCompare(String(a.tanggal_transfer || a.created_at || '')))
})

onMounted(() => {
  unsubKonf = subscribeColl('pembayaran_konfirmasi', (docs) => {
    konfirmasiRaw.value = docs || []
    loading.value = false
  })
  unsubSantri = subscribeColl('santri', (docs) => { santriList.value = docs })
})
onUnmounted(() => {
  if (unsubKonf) { try { unsubKonf() } catch (e) {} }
  if (unsubSantri) { try { unsubSantri() } catch (e) {} }
})
</script>
