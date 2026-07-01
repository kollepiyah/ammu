<script setup>
// v.111: Glondongan PTPT — 1 layar, tab per-peran (scope halus di dalam view).
//   - Penugasan   : koordinator kelas asal / PJ PTPT / super_admin tunjuk guru penguji blok 'menunggu'.
//   - Tugas Menilai: guru yang ditugaskan input nilai per juz + catatan (Task #5).
//   - Catatan     : guru kelas + PJ lihat catatan evaluasi (Task #6).
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/db'
import { useGlondongan } from '@/composables/useGlondongan'
import { useToast } from '@/composables/useToast'

const { loaded, antrianTugas, canAssignAny, myKoordinatorKelas, isPjPtpt, isSuper, tugaskan } =
  useGlondongan()
const toast = useToast()

// Tab awal: koordinator/PJ/super -> Penugasan; selain itu -> Tugas Menilai.
const tab = ref(canAssignAny.value ? 'penugasan' : 'nilai')

// ── Guru PTPT aktif (kandidat penguji) ──
const guruRaw = ref([])
let unsubG = null
onMounted(() => {
  unsubG = subscribeColl('guru', (docs) => (guruRaw.value = docs || []))
})
onUnmounted(() => {
  if (unsubG) unsubG()
})
const guruPtpt = computed(() =>
  (guruRaw.value || [])
    .filter(
      (g) =>
        String(g.status || 'Aktif')
          .toLowerCase()
          .trim() === 'aktif' &&
        String(g.lembaga || '')
          .trim()
          .toUpperCase() === 'PTPT'
    )
    .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
)

// Konteks peran (ditampilkan di header Penugasan).
const scopeLabel = computed(() => {
  if (isSuper.value) return 'Super Admin — semua kelas'
  if (isPjPtpt.value) return 'PJ PTPT — semua kelas'
  const ks = myKoordinatorKelas.value
  return ks.length ? `Koordinator Kelas ${ks.join(', ')}` : 'Tanpa scope penugasan'
})

// ── Aksi tugaskan ──
const pick = ref({}) // { [rowId]: guruId }
const savingId = ref('')
async function assign(row) {
  const guruId = pick.value[row.id]
  if (!guruId) {
    toast.warning('Pilih guru penguji dulu')
    return
  }
  const g = guruPtpt.value.find((x) => String(x.id) === String(guruId))
  if (!g) {
    toast.warning('Guru tidak ditemukan')
    return
  }
  savingId.value = row.id
  try {
    await tugaskan(row.id, { id: g.id, nama: g.nama })
    toast.success(`Blok ${juzLabel(row)} ditugaskan ke ${g.nama}`)
    delete pick.value[row.id]
  } catch (e) {
    toast.error('Gagal menugaskan: ' + (e.message || e))
  } finally {
    savingId.value = ''
  }
}

function juzLabel(row) {
  return row.juz_dari === row.juz_sampai
    ? `Juz ${row.juz_dari}`
    : `Juz ${row.juz_dari}–${row.juz_sampai}`
}
</script>

<template>
  <div class="p-3 md:p-5 space-y-4">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <h1 class="text-lg md:text-xl font-black text-[var(--text-primary)]">
        <i class="fas fa-people-arrows text-teal-500 mr-2"></i>Glondongan PTPT
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        Muroja'ah kumulatif sebelum tes kenaikan juz. Nilai di sini
        <b>tidak masuk rapor</b> — catatan evaluasi saja.
      </p>
    </div>

    <!-- Tab bar -->
    <div class="flex gap-2 flex-wrap">
      <button
        v-if="canAssignAny"
        type="button"
        @click="tab = 'penugasan'"
        :class="[
          'px-3 py-2 text-xs font-bold rounded-lg border transition',
          tab === 'penugasan'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-default)]'
        ]"
      >
        <i class="fas fa-user-plus mr-1"></i>Penugasan
        <span
          v-if="antrianTugas.length"
          class="ml-1 px-1.5 rounded-full bg-amber-500 text-white text-[10px]"
          >{{ antrianTugas.length }}</span
        >
      </button>
      <button
        type="button"
        @click="tab = 'nilai'"
        :class="[
          'px-3 py-2 text-xs font-bold rounded-lg border transition',
          tab === 'nilai'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-default)]'
        ]"
      >
        <i class="fas fa-pen-to-square mr-1"></i>Tugas Menilai
      </button>
      <button
        type="button"
        @click="tab = 'catatan'"
        :class="[
          'px-3 py-2 text-xs font-bold rounded-lg border transition',
          tab === 'catatan'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-default)]'
        ]"
      >
        <i class="fas fa-clipboard-list mr-1"></i>Catatan
      </button>
    </div>

    <!-- ── TAB: PENUGASAN ── -->
    <div
      v-if="tab === 'penugasan'"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-list-check text-teal-600 mr-1"></i>Antrian Penugasan
        </h3>
        <span class="text-[11px] font-bold text-teal-700 dark:text-teal-300">{{ scopeLabel }}</span>
      </div>

      <div v-if="!loaded" class="text-xs italic text-[var(--text-tertiary)] py-6 text-center">
        <i class="fas fa-spinner fa-spin mr-1"></i>Memuat…
      </div>
      <div
        v-else-if="!canAssignAny"
        class="text-xs italic text-[var(--text-tertiary)] py-6 text-center"
      >
        <i class="fas fa-lock text-2xl block mb-2 text-[var(--border-default)]"></i>
        Anda bukan koordinator kelas / PJ PTPT.
      </div>
      <div
        v-else-if="antrianTugas.length === 0"
        class="text-xs italic text-[var(--text-tertiary)] py-6 text-center"
      >
        <i class="fas fa-inbox text-2xl block mb-2 text-[var(--border-default)]"></i>
        Tidak ada blok yang menunggu penugasan.
      </div>

      <ul v-else class="space-y-2">
        <li
          v-for="row in antrianTugas"
          :key="row.id"
          class="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)]"
        >
          <div class="flex items-start justify-between gap-2 flex-wrap">
            <div class="min-w-0">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">
                {{ row.nama_cache || '—' }}
              </p>
              <p class="text-[11px] text-[var(--text-secondary)]">
                Blok <b class="text-teal-700 dark:text-teal-300">Kelas {{ row.kelas_asal }}</b> ·
                {{ juzLabel(row) }}
                <span class="text-[var(--text-tertiary)]">· utk tes Juz {{ row.juz_target }}</span>
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <select
              v-model="pick[row.id]"
              class="flex-1 min-w-0 px-2.5 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)] cursor-pointer"
            >
              <option value="">— pilih guru penguji —</option>
              <option v-for="g in guruPtpt" :key="g.id" :value="g.id">{{ g.nama }}</option>
            </select>
            <button
              type="button"
              @click="assign(row)"
              :disabled="savingId === row.id || !pick[row.id]"
              class="px-3 py-2 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 whitespace-nowrap"
            >
              <i :class="['fas mr-1', savingId === row.id ? 'fa-spinner fa-spin' : 'fa-check']"></i
              >Tugaskan
            </button>
          </div>
        </li>
      </ul>
      <p
        v-if="guruPtpt.length === 0 && canAssignAny"
        class="text-[10px] text-amber-600 dark:text-amber-400 mt-3"
      >
        <i class="fas fa-triangle-exclamation mr-1"></i>Belum ada guru PTPT aktif untuk dipilih.
      </p>
    </div>

    <!-- ── TAB: TUGAS MENILAI (Task #5) ── -->
    <div
      v-else-if="tab === 'nilai'"
      class="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)] shadow-sm text-center"
    >
      <i class="fas fa-pen-to-square text-3xl text-[var(--border-default)] block mb-2"></i>
      <p class="text-xs italic text-[var(--text-tertiary)]">Panel input nilai sedang disiapkan.</p>
    </div>

    <!-- ── TAB: CATATAN (Task #6) ── -->
    <div
      v-else
      class="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)] shadow-sm text-center"
    >
      <i class="fas fa-clipboard-list text-3xl text-[var(--border-default)] block mb-2"></i>
      <p class="text-xs italic text-[var(--text-tertiary)]">
        Panel catatan evaluasi sedang disiapkan.
      </p>
    </div>
  </div>
</template>
