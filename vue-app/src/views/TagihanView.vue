<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- v.20.14.0526: santri BOLEH lihat tunggakan dirinya (bypass permission lock) -->
    <div v-if="!isFullAccess && !isSantriOnly" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center">
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Akses Keuangan terbatas</p>
    </div>

    <template v-else>
      <!-- Header — v.20.14.0526: judul dinamis sesuai ?tab=riwayat -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
              <i :class="['fas', isRiwayatTab ? 'fa-history text-emerald-500' : 'fa-file-invoice text-rose-500', 'mr-2']"></i>{{ isRiwayatTab ? 'Riwayat Pembayaran' : (isSantriOnly ? 'Tunggakan Saya' : 'Tagihan Santri') }}
            </h1>
      <button @click="exportTagihanExcel" :disabled="exportingTg" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer self-start"><i :class="['fas', exportingTg ? 'fa-spinner fa-spin' : 'fa-file-excel', 'mr-1']"></i>{{ exportingTg ? '...' : 'Ekspor Excel' }}</button>
            <p class="text-xs text-slate-500 mt-0.5">{{ isRiwayatTab ? 'Daftar pembayaran yang sudah lunas' : 'Daftar tagihan aktif (belum lunas)' }}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <div class="px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700 text-xs">
              <span class="text-rose-700 dark:text-rose-300 font-bold">{{ filteredTagihan.length }}</span>
              <span class="text-slate-500 ml-1">aktif</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-xs">
              <span class="text-emerald-700 dark:text-emerald-300 font-bold">{{ totalActive }}</span>
              <span class="text-slate-500 ml-1 truncate">total</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter — v.20.14.0526: santri HIDE search bar (auto-filter ke dirinya) -->
      <div v-if="!isSantriOnly" class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div class="md:col-span-2 relative">
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input
              v-model="search"
              type="text"
              placeholder="Cari nama santri / jenis tagihan..."
              class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
          <select v-model="filterStatus" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-rose-500 outline-none">
            <option value="aktif">Belum lunas saja</option>
            <option value="">Semua status</option>
            <option value="lunas">Sudah lunas saja</option>
          </select>
        </div>
      </div>
      <!-- v.20.14.0526: santri-only tab filter status (Belum lunas / Sudah lunas) -->
      <div v-else class="bg-white dark:bg-slate-800 rounded-2xl p-2 border border-slate-200 dark:border-slate-700 shadow-sm flex gap-1">
        <button
          @click="filterStatus = 'aktif'"
          :class="['flex-1 text-xs font-black px-3 py-2 rounded-lg uppercase tracking-wider transition cursor-pointer',
            filterStatus === 'aktif' ? 'bg-rose-100 text-rose-700' : 'text-slate-500 hover:bg-slate-50']"
        ><i class="fas fa-exclamation-circle mr-1"></i>Belum Lunas</button>
        <button
          @click="filterStatus = 'lunas'"
          :class="['flex-1 text-xs font-black px-3 py-2 rounded-lg uppercase tracking-wider transition cursor-pointer',
            filterStatus === 'lunas' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:bg-slate-50']"
        ><i class="fas fa-check-circle mr-1"></i>Lunas</button>
      </div>

      <!-- Loading / Empty / List -->
      <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center border border-slate-200 dark:border-slate-700">
        <i class="fas fa-spinner fa-spin text-rose-500 text-3xl mb-3"></i>
        <p class="text-sm text-slate-500 font-bold">Memuat tagihan...</p>
      </div>
      <div v-else-if="filteredTagihan.length === 0" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center">
        <i class="fas fa-check-circle text-emerald-300 text-4xl mb-3"></i>
        <p class="text-sm font-bold text-slate-700 dark:text-slate-300">
          {{ search ? 'Tidak ada tagihan cocok' : 'Tidak ada tagihan aktif' }}
        </p>
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="t in filteredTagihan"
          :key="t.id"
          :class="[
            'rounded-xl p-3 md:p-4 border shadow-sm transition',
            t.lunas
              ? 'bg-emerald-50/40 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700'
              : 'bg-white dark:bg-slate-800 border-rose-200 dark:border-rose-700'
          ]"
        >
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
              :class="t.lunas ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600' : 'bg-rose-100 dark:bg-rose-900/40 text-rose-600'">
              <i :class="t.lunas ? 'fas fa-check' : 'fas fa-file-invoice'"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-black text-slate-800 dark:text-white truncate">
                    {{ getNamaSantri(t.santri_id || t.santriId) }}
                  </h3>
                  <p class="text-[11px] text-slate-500 mt-0.5 truncate">
                    {{ t.jenis || 'Tagihan' }}
                    <span v-if="t.periode" class="ml-1 text-slate-400">· {{ t.periode }}</span>
                  </p>
                </div>
                <span :class="[
                  'text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider flex-shrink-0',
                  t.lunas
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300'
                ]">
                  {{ t.lunas ? 'LUNAS' : 'BELUM LUNAS' }}
                </span>
              </div>
              <div class="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                <span class="font-bold" :class="t.lunas ? 'text-emerald-700' : 'text-rose-700'">
                  {{ fmtRp(t.nominal) }}
                </span>
                <span v-if="t.tgl_jatuh_tempo" class="text-amber-700">
                  <i class="fas fa-calendar mr-1"></i>{{ fmtTgl(t.tgl_jatuh_tempo) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-[10px] text-slate-400 pt-2">
        <i class="fas fa-circle-info mr-1"></i>{{ filteredTagihan.length }} tagihan · Vue 3 · Phase 5.12
      </p>
    </template>
  </div>
</template>

<script setup>
import { useExcel } from '@/composables/useExcel'
import { useSettingsStore as _useSettingsTagihanExp } from '@/stores/settings'

import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useKeuangan } from '@/composables/useKeuangan'
import { useAuthStore } from '@/stores/auth'
import { fmtRp, fmtTgl } from '@/utils/format'

const { tagihan, loading, isFullAccess, getNamaSantri } = useKeuangan()
const auth = useAuthStore()
const route = useRoute()
// v.20.14.0526: santri view-only — auto-filter ke santri sendiri, hide search
const isSantriOnly = computed(() => auth.sesiAktif?.role === 'santri')
const myId = computed(() => String(auth.sesiAktif?.id || ''))
// v.20.14.0526: ?tab=riwayat → Riwayat Pembayaran mode (auto filter LUNAS)
const isRiwayatTab = computed(() => route.query.tab === 'riwayat')

const search = ref('')
const filterStatus = ref(isRiwayatTab.value ? 'lunas' : 'aktif')

// react ketika query.tab berubah (klik menu sidebar Tunggakan ↔ Riwayat)
watch(isRiwayatTab, (v) => { filterStatus.value = v ? 'lunas' : 'aktif' })

const filteredTagihan = computed(() => {
  let list = [...tagihan.value]
  // v.20.14.0526: santri — auto-filter ke tagihan dirinya saja
  if (isSantriOnly.value) {
    list = list.filter((t) => String(t.santri_id || t.santriId) === myId.value)
  }
  if (filterStatus.value === 'aktif') list = list.filter((t) => !t.lunas)
  else if (filterStatus.value === 'lunas') list = list.filter((t) => t.lunas)
  const kw = search.value.trim().toLowerCase()
  if (kw) {
    list = list.filter((t) => {
      const nama = getNamaSantri(t.santri_id || t.santriId).toLowerCase()
      const jenis = String(t.jenis || '').toLowerCase()
      const periode = String(t.periode || '').toLowerCase()
      return nama.includes(kw) || jenis.includes(kw) || periode.includes(kw)
    })
  }
  return list.sort((a, b) => (b.tanggal || '').localeCompare(a.tanggal || ''))
})

const totalActive = computed(() =>
  fmtRp(filteredTagihan.value.reduce((sum, t) => sum + (Number(t.nominal) || 0), 0))
)
// v.20.42.0526: Export Excel Tagihan
const exportingTg = ref(false)
const { exportStyled: _exportStyledT } = useExcel()
const _settingsTExp = _useSettingsTagihanExp()
async function exportTagihanExcel() {
  if (exportingTg.value) return
  exportingTg.value = true
  try {
    const list = (typeof filteredTagihan !== 'undefined' && filteredTagihan.value) ||
                 (typeof tagihanRaw !== 'undefined' && tagihanRaw.value) ||
                 (typeof tagihan !== 'undefined' && tagihan.value) || []
    const rows = list.map((t, i) => ({
      no: i + 1,
      santri_nama: t.santri_nama || t.nama || '',
      lembaga: t.lembaga || '',
      kelas: t.kelas || '',
      jenis: t.jenis || t.jenis_tagihan || '',
      periode: t.periode || '',
      nominal: t.nominal || 0,
      dibayar: t.dibayar || 0,
      sisa: (Number(t.nominal) || 0) - (Number(t.dibayar) || 0),
      status: t.status || (t.dibayar >= t.nominal ? 'Lunas' : 'Belum Lunas'),
      jatuh_tempo: t.jatuh_tempo || '',
      tanggal_bayar: t.tanggal_bayar || ''
    }))
    const ss = _settingsTExp.settings || {}
    await _exportStyledT(rows, {
      filename: `tagihan_${new Date().toISOString().slice(0,10)}.xlsx`,
      sheetName: 'Tagihan',
      kop: [ss.kopLine1 || '', ss.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM', ss.kopLine3 || '', ss.kopLine4 || ''],
      subtitle: `Tagihan Santri — ${rows.length} item`,
      columns: [
        { key: 'no', header: 'No', width: 5 },
        { key: 'santri_nama', header: 'Nama Santri', width: 28 },
        { key: 'lembaga', header: 'Lembaga', width: 14 },
        { key: 'kelas', header: 'Kelas', width: 10 },
        { key: 'jenis', header: 'Jenis', width: 14 },
        { key: 'periode', header: 'Periode', width: 12 },
        { key: 'nominal', header: 'Nominal', width: 14 },
        { key: 'dibayar', header: 'Dibayar', width: 14 },
        { key: 'sisa', header: 'Sisa', width: 14 },
        { key: 'status', header: 'Status', width: 12 },
        { key: 'jatuh_tempo', header: 'Jatuh Tempo', width: 12 }
      ]
    })
  } catch (e) {
    if (typeof toast !== 'undefined') toast.error('Gagal: ' + (e.message || e))
  } finally {
    exportingTg.value = false
  }
}
</script>