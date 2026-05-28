<template>
  <div class="p-3 md:p-5 max-w-4xl mx-auto space-y-4">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <div class="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 class="text-xl md:text-2xl font-black">
            <i class="fas fa-file-export text-cyan-500 mr-2"></i>Ekspor Riwayat Santri
          </h1>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">
            Cetak PDF riwayat 1 tahun (Tagihan + Pembayaran + Tabungan)
          </p>
        </div>
      </div>
    </div>

    <!-- Guard -->
    <div
      v-if="!isFullAccess"
      class="bg-[var(--bg-card)] rounded-2xl p-10 text-center border border-dashed border-[var(--border-default)]"
    >
      <i class="fas fa-lock text-rose-500 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-[var(--text-primary)]">Akses terbatas</p>
      <p class="text-xs text-[var(--text-secondary)] mt-1">
        Hanya admin / admin keuangan yang bisa mengakses ekspor ini.
      </p>
    </div>

    <template v-else>
      <!-- Filter -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm space-y-3">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
          <select
            v-model="selectedLembaga"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="">Semua lembaga</option>
            <option v-for="l in lembagaOptions" :key="l" :value="l">{{ l }}</option>
          </select>
          <select
            v-model.number="selectedTahun"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option v-for="y in tahunOptions" :key="y" :value="y">Tahun {{ y }}</option>
          </select>
          <input
            v-model="search"
            type="text"
            placeholder="Cari nama santri..."
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">
            {{ filteredSantri.length }} santri ditemukan
          </span>
        </div>
      </div>

      <!-- List santri -->
      <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-cyan-500 text-3xl mb-2"></i>
        <p class="text-xs text-[var(--text-secondary)] font-bold">Memuat data...</p>
      </div>
      <div
        v-else-if="filteredSantri.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-search text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">Tidak ada santri yang cocok</p>
      </div>
      <div
        v-else
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <div class="max-h-[60vh] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
          <div
            v-for="s in filteredSantri"
            :key="s.id"
            class="p-3 md:p-4 hover:bg-slate-50 dark:hover:bg-slate-900/30 flex items-center gap-3"
          >
            <div
              class="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center"
            >
              <i class="fas fa-user"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</p>
              <p class="text-[10px] text-[var(--text-secondary)] truncate">
                NIS {{ s.nis || s.id }} · {{ s.lembaga || '-' }} · {{ s.kelas || '-' }}
              </p>
            </div>
            <button
              type="button"
              :disabled="busyId === s.id"
              @click="cetakRiwayat(s)"
              class="text-[11px] font-black bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg"
            >
              <i
                :class="['fas mr-1', busyId === s.id ? 'fa-spinner fa-spin' : 'fa-file-pdf']"
              ></i>
              {{ busyId === s.id ? 'Memproses...' : 'Cetak PDF' }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
// v.21.101.0527 — Ekspor riwayat per santri 1 tahun: Tagihan + Pembayaran + Tabungan
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { subscribeColl } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { sortSantri } from '@/utils/santriSort'
import { cetakRiwayatSantriPdf, buildKopFromSettings } from '@/utils/riwayatSantriPdf'

const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()

const isFullAccess = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return (
    s.role === 'admin' ||
    s.id === 'admin' ||
    ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
  )
})

const santriRaw = ref([])
const loading = ref(true)
let unsubSantri = null

const selectedLembaga = ref('')
const selectedTahun = ref(new Date().getFullYear())
const search = ref('')
const busyId = ref('')

const lembagaOptions = computed(() => {
  const set = new Set()
  for (const s of santriRaw.value) {
    if (s.lembaga) set.add(s.lembaga)
    if (s.lembaga_sekolah) set.add(s.lembaga_sekolah)
  }
  return Array.from(set).filter(Boolean).sort()
})

const tahunOptions = computed(() => {
  const now = new Date().getFullYear()
  const out = []
  for (let y = now + 1; y >= now - 5; y--) out.push(y)
  return out
})

const filteredSantri = computed(() => {
  let list = santriRaw.value.filter((s) => s.aktif !== false)
  if (selectedLembaga.value) {
    list = list.filter(
      (s) => s.lembaga === selectedLembaga.value || s.lembaga_sekolah === selectedLembaga.value
    )
  }
  const kw = search.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(
      (s) =>
        String(s.nama || '').toLowerCase().includes(kw) ||
        String(s.nis || '').toLowerCase().includes(kw)
    )
  }
  return sortSantri(list)
})

onMounted(() => {
  unsubSantri = subscribeColl('santri', (docs) => {
    santriRaw.value = docs
    loading.value = false
  })
})

onUnmounted(() => {
  if (unsubSantri) {
    try {
      unsubSantri()
    } catch {
      /* ignore */
    }
  }
})

async function cetakRiwayat(s) {
  if (!s || busyId.value) return
  busyId.value = s.id
  try {
    const sid = String(s.id)
    // Fetch tagihan + pembayaran (buku_induk sumber pos_santri) + tabungan
    const [tgSnap, biSnap, tbSnap] = await Promise.all([
      getDocs(query(collection(db, 'keuangan_tagihan'), where('santri_id', '==', sid))),
      getDocs(query(collection(db, 'keuangan_buku_induk'), where('santri_id', '==', sid))),
      getDocs(query(collection(db, 'keuangan_tabungan_santri'), where('santri_id', '==', sid)))
    ])
    const tagihan = tgSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
    const pembayaran = biSnap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((r) => r.sumber === 'pos_santri')
    const tabungan = tbSnap.docs.map((d) => ({ id: d.id, ...d.data() }))

    const kop = buildKopFromSettings(settings.settings || {})
    await cetakRiwayatSantriPdf({
      santri: s,
      tahun: Number(selectedTahun.value) || new Date().getFullYear(),
      tagihan,
      pembayaran,
      tabungan,
      kop
    })
    toast.success(`PDF riwayat ${s.nama} (${selectedTahun.value}) berhasil dibuat`)
  } catch (e) {
    console.error('[cetakRiwayatSantri]', e)
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    busyId.value = ''
  }
}
</script>
