<template>
  <div class="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
    <!-- Loading state when santri belum tersedia -->
    <div
      v-if="!santri"
      class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center"
    >
      <i class="fas fa-spinner fa-spin text-2xl text-emerald-500 mb-2"></i>
      <p class="text-sm text-slate-500">Memuat data santri...</p>
    </div>

    <template v-else>
      <!-- Header card: foto + nama + lembaga + badges -->
      <div
        class="bg-gradient-to-br from-emerald-500 via-teal-600 to-teal-700 rounded-2xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden"
      >
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          class="absolute -right-4 -top-4 w-44 h-44 object-contain opacity-10 pointer-events-none"
        />
        <div class="relative flex items-center gap-4">
          <div
            class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 border-4 border-white/80 flex items-center justify-center overflow-hidden shadow-2xl flex-shrink-0 backdrop-blur-sm"
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
                class="bg-white/25 text-white text-[11px] font-black px-3 py-1 rounded-full backdrop-blur-sm"
                >NIS: {{ santri.nis }}</span
              >
              <span
                class="bg-amber-400/90 text-amber-900 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider"
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
          class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <h3
            class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 pb-2 border-b border-slate-100 dark:border-slate-700"
          >
            <i class="fas fa-id-card text-teal-600 mr-2"></i>Data Saat Ini
          </h3>
          <div class="space-y-2.5 text-sm">
            <div class="flex justify-between">
              <span class="text-slate-500 font-bold">Kelas Sekolah:</span>
              <span class="font-black text-slate-800 dark:text-white">
                {{ santri.kelas_sekolah || '-' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500 font-bold">Lembaga Qiraati:</span>
              <span class="font-black text-teal-700 dark:text-teal-300">
                {{ santri.lembaga || '-' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500 font-bold">Jilid / Kelas:</span>
              <span class="font-black text-slate-800 dark:text-white">
                {{ santri.kelas || '-'
                }}{{ santri.juz && santri.juz !== '-' ? ' (Juz ' + santri.juz + ')' : '' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500 font-bold">Guru Kelas:</span>
              <span class="font-black text-slate-800 dark:text-white text-right">
                {{ santri.guru || santri.guru_pagi || santri.guru_sore || '-' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Capaian Bulan Ini -->
        <div
          class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <h3
            class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 pb-2 border-b border-slate-100 dark:border-slate-700"
          >
            <i class="fas fa-trophy text-amber-600 mr-2"></i>Capaian Bulan Ini
          </h3>
          <div class="grid grid-cols-3 gap-2">
            <div
              class="bg-teal-50 dark:bg-teal-900/20 rounded-xl py-3 text-center border border-teal-100"
            >
              <p class="text-[9px] font-black text-teal-700 uppercase tracking-wider">Awal</p>
              <p class="text-lg md:text-xl font-black text-slate-800 dark:text-white mt-1">
                {{ santri.prestasi_awal || '-' }}
              </p>
            </div>
            <div
              class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl py-3 text-center border border-emerald-100"
            >
              <p class="text-[9px] font-black text-emerald-700 uppercase tracking-wider">Akhir</p>
              <p class="text-lg md:text-xl font-black text-slate-800 dark:text-white mt-1">
                {{ santri.prestasi_akhir || '-' }}
              </p>
            </div>
            <div
              class="bg-amber-50 dark:bg-amber-900/20 rounded-xl py-3 text-center border border-amber-100"
            >
              <p class="text-[9px] font-black text-amber-700 uppercase tracking-wider">Total</p>
              <p class="text-lg md:text-xl font-black text-slate-800 dark:text-white mt-1">
                {{ santri.prestasi_total || '-' }}
              </p>
            </div>
          </div>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <div class="bg-purple-50 rounded-xl p-2.5 text-center border border-purple-100">
              <p class="text-[9px] font-black text-purple-700 uppercase">
                {{ isPTPT ? 'Selisih Capaian' : 'Total Capaian' }}
              </p>
              <p class="text-base font-black text-purple-800 mt-0.5">{{ totalCapaian }} hal</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-200">
              <p class="text-[9px] font-black text-slate-600 uppercase">Status</p>
              <p class="text-base font-black text-slate-800 mt-0.5">
                {{ statusLabel }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Catatan Prestasi -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <h3
          class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 pb-2 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2"
        >
          <i class="fas fa-comment-dots text-emerald-600"></i>Catatan Prestasi
        </h3>
        <div v-if="catatanList.length === 0" class="py-6 text-center">
          <i class="fas fa-inbox text-slate-300 text-2xl mb-2"></i>
          <p class="text-xs text-slate-500 italic">Belum ada catatan prestasi untuk santri ini.</p>
        </div>
        <div v-else class="space-y-2.5">
          <div
            v-for="(item, i) in catatanList"
            :key="i"
            :class="[
              'rounded-xl p-3 border-l-4',
              item.kategori === 'diniyah'
                ? 'bg-purple-50 border-purple-500'
                : 'bg-emerald-50 border-emerald-500'
            ]"
          >
            <div class="flex items-center justify-between gap-2 mb-1">
              <p class="text-xs font-black text-slate-800">
                <i
                  :class="[
                    'fas mr-1',
                    item.kategori === 'diniyah'
                      ? 'fa-book-open text-purple-600'
                      : 'fa-mosque text-emerald-600'
                  ]"
                ></i>
                {{ item.bulan || '-' }} · {{ item.kategori === 'diniyah' ? 'Diniyah' : 'Qiraati' }}
              </p>
            </div>
            <p class="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
              {{ item.catatan }}
            </p>
          </div>
        </div>
      </div>

      <!-- Kartu Kenaikan -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <h3
          class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 pb-2 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2"
        >
          <i class="fas fa-id-card text-teal-600"></i>Kartu Kenaikan
        </h3>
        <div v-if="kartuKenaikanList.length === 0" class="py-6 text-center">
          <i class="fas fa-inbox text-slate-300 text-2xl mb-2"></i>
          <p class="text-xs text-slate-500 italic">Belum ada riwayat kenaikan jilid.</p>
        </div>
        <div v-else class="space-y-2.5">
          <div
            v-for="(item, i) in kartuKenaikanList"
            :key="i"
            :class="[
              'rounded-xl p-3 border-l-4',
              item.tipe === 'rekomendasi'
                ? 'bg-emerald-50 border-emerald-500'
                : 'bg-blue-50 border-blue-500'
            ]"
          >
            <div class="flex items-center justify-between gap-2 mb-1">
              <p class="text-xs font-black text-slate-800">
                {{ item.itemLabel || item.lembaga + ' · ' + item.kelasLabel }}
              </p>
              <span class="text-[10px] text-slate-500 font-bold whitespace-nowrap">
                {{ formatTanggal(item.tanggal) }}
              </span>
            </div>
            <p class="text-xs text-slate-700 whitespace-pre-line">
              {{ item.text || '-' }}
            </p>
            <span
              :class="[
                'inline-block mt-1.5 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded',
                item.tipe === 'rekomendasi'
                  ? 'bg-emerald-200 text-emerald-800'
                  : 'bg-blue-200 text-blue-800'
              ]"
            >
              {{ item.tipe || 'catatan' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Lihat Rapor -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <h3
          class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 pb-2 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2"
        >
          <i class="fas fa-graduation-cap text-purple-600"></i>Lihat Rapor
        </h3>
        <div class="space-y-2">
          <router-link
            to="/rapor?kategori=qiraati"
            class="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 transition cursor-pointer"
          >
            <div
              class="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-eye text-sm"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-black text-slate-800 dark:text-white">Rapor Qiraati</p>
              <p class="text-[10px] text-slate-500 dark:text-slate-400">
                TPQ · Pra PTPT · PTPT · PPPH
              </p>
            </div>
            <i class="fas fa-chevron-right text-slate-400"></i>
          </router-link>
          <router-link
            to="/rapor?kategori=diniyah"
            class="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 transition cursor-pointer"
          >
            <div
              class="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-eye text-sm"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-black text-slate-800 dark:text-white">Rapor Diniyah</p>
              <p class="text-[10px] text-slate-500 dark:text-slate-400">Mata pelajaran agama</p>
            </div>
            <i class="fas fa-chevron-right text-slate-400"></i>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { subscribeColl } from '@/services/firestore'
import { useSantri } from '@/composables/useSantri'

const auth = useAuthStore()
const settings = useSettingsStore()
const { santriRaw } = useSantri()

// Santri ID dari sesi aktif (santri yang login)
const santriId = computed(() => String(auth.sesiAktif?.id || ''))

// Santri object dari santriRaw real-time list
const santri = computed(() => santriRaw.value.find((s) => String(s.id) === santriId.value) || null)

// Periode aktif dari settings
const periodeAktif = computed(() => settings.settings?.periodeAktif || "Dzulqo'dah 1447")

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
