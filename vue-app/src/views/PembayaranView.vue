<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-base md:text-lg font-black"><i class="fas fa-money-check-alt text-cyan-500 mr-2"></i>Pembayaran</h1>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">{{ isSantriOnly ? 'Riwayat pembayaran Anda' : 'Log pembayaran semua santri' }}</p>
        </div>
        <div class="px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-xs">
          <span class="text-cyan-700 font-bold">{{ fmtRp(totalPembayaran) }}</span>
          <span class="text-[var(--text-secondary)] ml-1">total</span>
        </div>
      </div>
    </div>

    <!-- v.86.0526: Cara Pembayaran (2 jalur) — hanya santri/wali -->
    <div v-if="isSantriOnly" class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center gap-2 mb-1.5">
          <span class="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0"><i class="fas fa-hand-holding-usd"></i></span>
          <h3 class="font-black text-sm flex-1">Bayar Manual (Kantor)</h3>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Tersedia</span>
        </div>
        <p class="text-xs text-[var(--text-secondary)]">Pembayaran tunai langsung di kantor admin pondok. Admin mencatat &amp; memberi bukti pembayaran.</p>
      </div>
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center gap-2 mb-1.5">
          <span class="w-9 h-9 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center flex-shrink-0"><i class="fas fa-building-columns"></i></span>
          <h3 class="font-black text-sm flex-1">Transfer / VA</h3>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Segera</span>
        </div>
        <p class="text-xs text-[var(--text-secondary)]">Transfer ke rekening pondok; pembayaran dibaca otomatis lewat KSPP BMT PETA lalu diverifikasi admin. <span class="italic">(dalam pengembangan)</span></p>
        <div class="mt-2 p-2.5 rounded-lg bg-[var(--bg-card-elevated)] border border-[var(--border-subtle)] text-xs">
          <p class="font-bold text-[var(--text-primary)] mb-0.5"><i class="fas fa-university mr-1 text-cyan-500"></i>Rekening Pondok</p>
          <p class="text-[var(--text-secondary)] whitespace-pre-line">{{ rekeningInfo }}</p>
        </div>
        <p class="text-[10px] text-[var(--text-tertiary)] mt-1.5">Alur: Transfer &rarr; dibaca KSPP &rarr; dibaca aplikasi &rarr; admin verifikasi &rarr; lunas.</p>
      </div>
    </div>

    <!-- Filter (admin) -->
    <div v-if="!isSantriOnly" class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2">
      <input v-model="search" type="text" placeholder="Cari nama santri..." class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]" />
      <select v-model.number="filterBulan" class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]">
        <option :value="0">Semua bulan</option>
        <option v-for="(b, i) in NAMA_BULAN" :key="b" :value="i+1">{{ b }}</option>
      </select>
      <select v-model.number="filterTahun" class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]">
        <option v-for="y in [2024,2025,2026,2027]" :key="y" :value="y">{{ y }}</option>
      </select>
    </div>

    <!-- List -->
    <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center"><i class="fas fa-spinner fa-spin text-cyan-500 text-3xl"></i></div>
    <div v-else-if="filteredItems.length === 0" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"><i class="fas fa-inbox text-[var(--text-tertiary)] text-3xl mb-2"></i><p class="text-sm text-[var(--text-secondary)] italic">Belum ada pembayaran.</p></div>
    <div v-else class="space-y-2">
      <div v-for="p in filteredItems" :key="p.id" class="bg-[var(--bg-card)] rounded-xl p-3 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0"><i class="fas fa-check"></i></div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold truncate">{{ p.santri_nama || getNamaSantri(p.santri_id) }}</p>
            <p class="text-[10px] text-[var(--text-secondary)]">{{ fmtTgl(p.tanggal) }} · {{ p.catatan || '-' }}</p>
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
import { useSettingsStore } from '@/stores/settings'
import { fmtRp, fmtTgl } from '@/utils/format'

const NAMA_BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const auth = useAuthStore()
const settingsStore = useSettingsStore()
// v.86.0526: info rekening pondok utk jalur Transfer/VA (coming soon — kerjasama KSPP BMT PETA)
const rekeningInfo = computed(() => {
  const s = settingsStore.settings || {}
  return s.rekeningPondok || s.noRekening || s.rekening || 'Akan diumumkan (menyusul kerja sama KSPP BMT PETA).'
})
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
  // v.21.104.0527: source of truth = keuangan_buku_induk sumber=pos_santri.
  // Sebelumnya baca keuangan_pembayaran yg tidak ditulis POS → selalu kosong.
  unsubBayar = subscribeColl('keuangan_buku_induk', (docs) => {
    pembayaranRaw.value = (docs || []).filter((r) => r.sumber === 'pos_santri')
    loading.value = false
  })
  unsubSantri = subscribeColl('santri', (docs) => { santriList.value = docs })
})
onUnmounted(() => {
  if (unsubBayar) { try { unsubBayar() } catch (e) {} }
  if (unsubSantri) { try { unsubSantri() } catch (e) {} }
})
</script>
