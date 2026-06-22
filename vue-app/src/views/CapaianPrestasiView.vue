<template>
  <div class="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
    <!-- Loading state when santri belum tersedia -->
    <div
      v-if="!santri"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
    >
      <i class="fas fa-spinner fa-spin text-2xl text-emerald-500 mb-2"></i>
      <p class="text-sm text-[var(--text-secondary)]">Memuat data santri...</p>
    </div>

    <template v-else>
      <!-- Header card: foto + nama + lembaga + badges -->
      <div
        class="bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-hover)] to-[var(--color-primary-hover)] rounded-2xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden"
      >
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          class="absolute -right-4 -top-4 w-44 h-44 object-contain opacity-10 pointer-events-none"
        />
        <div class="relative flex items-center gap-4">
          <div
            class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[var(--bg-card)]/20 border-4 border-white/80 flex items-center justify-center overflow-hidden shadow-2xl flex-shrink-0 backdrop-blur-sm"
          >
            <img
              v-if="santri.foto"
              :src="santri.foto"
              class="w-full h-full object-cover"
              alt="Foto"
            />
            <i v-else class="fas fa-user-graduate text-white/70 text-3xl"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-[10px] font-black uppercase tracking-widest opacity-90">
              <i class="fas fa-trophy mr-1"></i>Capaian Prestasi
            </p>
            <h2 class="text-2xl md:text-3xl font-black mt-1 drop-shadow">
              {{ santri.nama }}
            </h2>
            <p class="text-xs md:text-sm font-bold text-emerald-50/90 mt-1">
              {{ santri.lembaga || '-' }}{{ santri.kelas ? ' · Kelas ' + santri.kelas : '' }}
            </p>
            <div class="flex gap-2 flex-wrap mt-3">
              <span
                v-if="santri.nis"
                class="bg-[var(--bg-card)]/25 text-white text-[11px] font-black px-3 py-1 rounded-full backdrop-blur-sm"
                >No. Induk: {{ santri.nis }}</span
              >
              <span
                class="bg-[var(--color-accent)]/90 text-[var(--text-on-accent)] text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider"
                >Periode: {{ periodeAktif }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Grid 2 kolom: Data Saat Ini + Capaian Bulan Ini -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <!-- Data Saat Ini -->
        <div
          class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
        >
          <h3
            class="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 pb-2 border-b border-[var(--border-subtle)]"
          >
            <i class="fas fa-id-card text-teal-600 mr-2"></i>Data Saat Ini
          </h3>
          <div class="space-y-2.5 text-sm">
            <div class="flex justify-between">
              <span class="text-[var(--text-secondary)] font-bold">Kelas Sekolah:</span>
              <span class="font-black text-[var(--text-primary)]">
                {{ santri.kelas_sekolah || '-' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-[var(--text-secondary)] font-bold">Lembaga Qiraati:</span>
              <span class="font-black text-teal-700 dark:text-teal-300">
                {{ santri.lembaga || '-' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-[var(--text-secondary)] font-bold">Jilid / Kelas:</span>
              <span class="font-black text-[var(--text-primary)]">
                {{ santri.kelas || '-'
                }}{{ santri.juz && santri.juz !== '-' ? ' (Juz ' + juzNum(santri.juz) + ')' : '' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-[var(--text-secondary)] font-bold">Guru Kelas:</span>
              <span class="font-black text-[var(--text-primary)] text-right">
                {{ santri.guru || santri.guru_pagi || santri.guru_sore || '-' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Capaian Bulan Ini -->
        <div
          class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
        >
          <h3
            class="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 pb-2 border-b border-[var(--border-subtle)]"
          >
            <i class="fas fa-trophy text-cyan-600 mr-2"></i>Capaian Bulan Ini
          </h3>
          <div class="grid grid-cols-3 gap-2">
            <div
              class="bg-teal-50 dark:bg-teal-900/20 rounded-xl py-3 text-center border border-teal-100"
            >
              <p class="text-[9px] font-black text-teal-700 uppercase tracking-wider">Awal</p>
              <p class="text-lg md:text-xl font-black text-[var(--text-primary)] mt-1">
                {{ santri.prestasi_awal || '-' }}
              </p>
            </div>
            <div
              class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl py-3 text-center border border-emerald-100"
            >
              <p class="text-[9px] font-black text-emerald-700 uppercase tracking-wider">Akhir</p>
              <p class="text-lg md:text-xl font-black text-[var(--text-primary)] mt-1">
                {{ santri.prestasi_akhir || '-' }}
              </p>
            </div>
            <div
              class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl py-3 text-center border border-cyan-100"
            >
              <p class="text-[9px] font-black text-cyan-700 uppercase tracking-wider">Total</p>
              <p class="text-lg md:text-xl font-black text-[var(--text-primary)] mt-1">
                {{ santri.prestasi_total || '-' }}
              </p>
            </div>
          </div>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <div class="bg-teal-50 rounded-xl p-2.5 text-center border border-teal-100">
              <p class="text-[9px] font-black text-teal-700 uppercase">
                {{ isPTPT ? 'Selisih Capaian' : 'Total Capaian' }}
              </p>
              <p class="text-base font-black text-teal-800 mt-0.5">{{ totalCapaian }} hal</p>
            </div>
            <div
              class="bg-[var(--bg-card-elevated)] rounded-xl p-2.5 text-center border border-[var(--border-subtle)]"
            >
              <p class="text-[9px] font-black text-[var(--text-secondary)] uppercase">Status</p>
              <p class="text-base font-black text-[var(--text-primary)] mt-0.5">
                {{ statusLabel }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- v.100c: Tren perkembangan capaian (Opsi A) -->
      <TrenCapaianChart
        v-if="santriId"
        :santri-ids="santriIdsTren"
        title="Tren Capaian Saya"
        subtitle="Halaman yang bertambah tiap bulan."
      />

      <!-- Catatan Prestasi -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3
          class="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 pb-2 border-b border-[var(--border-subtle)] flex items-center gap-2"
        >
          <i class="fas fa-comment-dots text-emerald-600"></i>Catatan Prestasi
        </h3>
        <div v-if="catatanList.length === 0" class="py-6 text-center">
          <i class="fas fa-inbox text-[var(--text-tertiary)] text-2xl mb-2"></i>
          <p class="text-xs text-[var(--text-secondary)] italic">
            Belum ada catatan prestasi untuk santri ini.
          </p>
        </div>
        <div v-else class="space-y-2.5">
          <div
            v-for="(item, i) in catatanList"
            :key="i"
            :class="[
              'rounded-xl p-3 border-l-4',
              item.kategori === 'diniyah'
                ? 'bg-teal-50 border-teal-500'
                : 'bg-emerald-50 border-emerald-500'
            ]"
          >
            <div class="flex items-center justify-between gap-2 mb-1">
              <p class="text-xs font-black text-[var(--text-primary)]">
                <i
                  :class="[
                    'fas mr-1',
                    item.kategori === 'diniyah'
                      ? 'fa-book-open text-teal-600'
                      : 'fa-mosque text-emerald-600'
                  ]"
                ></i>
                {{ item.bulan || '-' }} · {{ item.kategori === 'diniyah' ? 'Diniyah' : 'Qiraati' }}
              </p>
            </div>
            <p class="text-xs text-[var(--text-primary)] whitespace-pre-line leading-relaxed">
              {{ item.catatan }}
            </p>
          </div>
        </div>
      </div>

      <!-- Kartu Kenaikan -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3
          class="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 pb-2 border-b border-[var(--border-subtle)] flex items-center gap-2"
        >
          <i class="fas fa-id-card text-teal-600"></i>Kartu Kenaikan
        </h3>
        <div v-if="kartuKenaikanList.length === 0" class="py-6 text-center">
          <i class="fas fa-inbox text-[var(--text-tertiary)] text-2xl mb-2"></i>
          <p class="text-xs text-[var(--text-secondary)] italic">
            Belum ada riwayat kenaikan jilid.
          </p>
        </div>
        <div v-else class="space-y-2.5">
          <div
            v-for="(item, i) in kartuKenaikanList"
            :key="i"
            :class="[
              'rounded-xl p-3 border-l-4',
              item.tipe === 'rekomendasi'
                ? 'bg-emerald-50 border-emerald-500'
                : 'bg-cyan-50 border-cyan-500'
            ]"
          >
            <div class="flex items-center justify-between gap-2 mb-1">
              <p class="text-xs font-black text-[var(--text-primary)]">
                {{ item.itemLabel || item.lembaga + ' · ' + item.kelasLabel }}
              </p>
              <span class="text-[10px] text-[var(--text-secondary)] font-bold whitespace-nowrap">
                {{ formatTanggal(item.tanggal) }}
              </span>
            </div>
            <p class="text-xs text-[var(--text-primary)] whitespace-pre-line">
              {{ item.text || '-' }}
            </p>
            <span
              :class="[
                'inline-block mt-1.5 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded',
                item.tipe === 'rekomendasi'
                  ? 'bg-emerald-200 text-emerald-800'
                  : 'bg-cyan-200 text-cyan-800'
              ]"
            >
              {{ item.tipe || 'catatan' }}
            </span>
          </div>
        </div>
      </div>

      <!-- v.91.0626: section "Lihat Rapor" dihapus untuk akun santri (kyai req) -->
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { subscribeColl } from '@/services/db'
import { useSantri } from '@/composables/useSantri'
import TrenCapaianChart from '@/components/charts/TrenCapaianChart.vue' // v.100c: Opsi A — tren capaian
import { juzNum } from '@/utils/format' // v.100e: normalisasi tampilan juz (anti dobel "Juz JUZ n")

const auth = useAuthStore()
const settings = useSettingsStore()
const { santriRaw } = useSantri()

// Santri ID dari sesi aktif (santri yang login)
const santriId = computed(() => String(auth.sesiAktif?.id || ''))

// Santri object dari santriRaw real-time list
const santri = computed(() => santriRaw.value.find((s) => String(s.id) === santriId.value) || null)

// v.100c: id santri (stabil) untuk TrenCapaianChart — tren capaian diri/anak.
const santriIdsTren = computed(() => (santriId.value ? [santriId.value] : []))

// Periode aktif dari settings
// v.100e: sumber periode = settings.txtPeriode (diisi admin di Pengaturan "Periode Aktif").
//   Sebelumnya baca `periodeAktif` (field hantu, tak pernah diisi) + fallback hardcoded → header macet.
const periodeAktif = computed(
  () => settings.settings?.periodeAktif || settings.settings?.txtPeriode || '-'
)

// Helper: parse angka dari string yang mungkin mengandung non-digit
function parseHal(v) {
  const m = String(v || '').match(/\d+/)
  return m ? parseInt(m[0]) : 0
}

// PTPT pakai selisih akhir-awal, lembaga lain pakai prestasi_total langsung
const isPTPT = computed(() => String(santri.value?.lembaga || '').toUpperCase() === 'PTPT')

const totalCapaian = computed(() => {
  if (!santri.value) return 0
  if (isPTPT.value) {
    return Math.max(0, parseHal(santri.value.prestasi_akhir) - parseHal(santri.value.prestasi_awal))
  }
  return parseHal(santri.value.prestasi_total) || 0
})

// Status label berdasar total prestasi
const statusLabel = computed(() => {
  if (!santri.value) return '-'
  const total = parseHal(santri.value.prestasi_total)
  if (total === 0) return 'BELUM DINILAI'
  if (total < 5) return 'KURANG'
  if (total <= 9) return 'CUKUP'
  return 'BAGUS'
})

// Rekap prestasi real-time
const rekapPrestasi = ref([])
let unsubRekap = null

// Filter rekap_prestasi untuk santri saat ini, sort desc per bulan
const rekapSantri = computed(() => {
  const id = santriId.value
  return rekapPrestasi.value
    .filter((r) => String(r.santri_id || r.santriId) === id)
    .sort((a, b) => {
      const aB = a.bulan || ''
      const bB = b.bulan || ''
      return bB.localeCompare(aB)
    })
})

// Hanya rekap yang punya catatan non-kosong
const catatanList = computed(() =>
  rekapSantri.value.filter((r) => r.catatan && String(r.catatan).trim().length > 0)
)

// Kartu kenaikan: flatten dari santri.kartu_kenaikan[lembaga][kelasId].entries
const kartuKenaikanList = computed(() => {
  const kk = santri.value?.kartu_kenaikan
  if (!kk || typeof kk !== 'object') return []
  const out = []
  for (const lembaga in kk) {
    for (const kelasId in kk[lembaga] || {}) {
      const entries = kk[lembaga][kelasId]?.entries || []
      for (const entry of entries) {
        out.push({
          ...entry,
          lembaga,
          kelasId,
          kelasLabel: kk[lembaga][kelasId]?.kelasLabel || kelasId
        })
      }
    }
  }
  return out.sort((a, b) => String(b.tanggal || '').localeCompare(String(a.tanggal || '')))
})

// Format tanggal id-ID singkat
function formatTanggal(t) {
  if (!t) return '-'
  try {
    return new Date(t).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    })
  } catch {
    return t
  }
}

onMounted(() => {
  unsubRekap = subscribeColl('rekap_prestasi', (data) => {
    rekapPrestasi.value = data
  })
})

onUnmounted(() => {
  if (unsubRekap) {
    try {
      unsubRekap()
    } catch {
      /* noop */
    }
  }
})
</script>
