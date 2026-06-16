<template>
  <!-- ============================================================
       Alert operasional (admin/kepala) — dipindah dari StatistikView (v.103).
       Guru Belum Input bulan ini + Kelas Overload (rasio guru:santri).
       Sumber: Firestore-realtime (useStatistikScope). Tujuan: Laporan tab Pegawai.
       ============================================================ -->
  <div v-if="isAdminMode" class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <!-- Guru belum input bulan ini (klik -> halaman detail) -->
    <button
      type="button"
      @click="goGuruBelumInput"
      class="text-left bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer flex items-center gap-4"
    >
      <div class="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
        <i class="fas fa-user-clock text-amber-600 dark:text-amber-300 text-xl"></i>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">
          Guru Belum Input &middot; {{ periodeLabel }}
        </p>
        <p class="text-2xl font-black text-[var(--text-primary)] mt-0.5">
          {{ guruBelumInput.length }}
          <span class="text-sm font-bold text-[var(--text-secondary)]">guru</span>
        </p>
        <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
          {{ totalSantriBelumInput }} santri belum diinput &middot; klik untuk detail
        </p>
      </div>
      <i class="fas fa-chevron-right text-[var(--text-tertiary)]"></i>
    </button>

    <!-- Kelas Overload (rasio guru:santri) -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center flex-shrink-0">
          <i class="fas fa-triangle-exclamation text-rose-600 dark:text-rose-300"></i>
        </div>
        <div class="min-w-0">
          <p class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Kelas Overload</p>
          <p class="text-xs font-bold text-[var(--text-primary)]">
            {{ kelasOverload.length }} kelas melebihi rasio guru:santri
          </p>
        </div>
      </div>
      <div v-if="kelasOverload.length === 0" class="text-xs text-[var(--text-tertiary)] italic py-3 text-center">
        Semua kelas dalam rasio ideal.
      </div>
      <div v-else class="space-y-1 max-h-52 overflow-auto">
        <div
          v-for="(k, i) in kelasOverload"
          :key="i"
          class="flex items-center justify-between gap-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-700 rounded-lg px-3 py-1.5"
        >
          <span class="text-xs truncate">
            <b class="text-[var(--text-primary)]">{{ k.lembaga }}</b> &middot; {{ k.kelas }} &middot; {{ k.guru }}
          </span>
          <span class="text-[10px] font-black text-rose-700 dark:text-rose-300 whitespace-nowrap">
            {{ k.jml }}/{{ k.ratio }} <span class="opacity-70">(+{{ k.lebih }})</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ============================================================================
// OperasionalGuru.vue — alert operasional admin/kepala. Dipindah dari
// StatistikView.vue (v.103, "rapikan dashboard") → Laporan tab Pegawai.
// Guru Belum Input bulan ini + Kelas Overload (rasio guru:santri). Logic identik.
// ============================================================================
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { isFullFilterRole } from '@/utils/roleScope'
import { useStatistikScope } from '@/composables/useStatistikScope'

const router = useRouter()
const auth = useAuthStore()
const isAdminMode = computed(() => isFullFilterRole(auth.sesiAktif))

// v.95.0626: kartu Guru Belum Input + Kelas Overload (data ter-scope)
const { guruBelumInput, kelasOverload, periodeKeyNow } = useStatistikScope()

const _NAMA_BULAN_STAT = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const periodeLabel = computed(() => {
  const m = String(periodeKeyNow.value).match(/^(\d{4})_(\d{2})$/)
  return m ? `${_NAMA_BULAN_STAT[parseInt(m[2]) - 1]} ${m[1]}` : periodeKeyNow.value
})
const totalSantriBelumInput = computed(() =>
  guruBelumInput.value.reduce((sum, g) => sum + g.jml, 0)
)
function goGuruBelumInput() {
  router.push('/statistik/guru-belum-input')
}
</script>
