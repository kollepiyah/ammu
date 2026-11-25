<template>
  <!-- Jadwal Sholat (blueprint F2) — layar yang sama untuk wilayah publik (/umum/sholat) dan
       Portal (/ibadah/sholat). Dihitung di HP: tanpa internet, tanpa egress. -->
  <div class="p-3 space-y-4 max-w-xl mx-auto">
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-primary)] hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        aria-label="Kembali"
        @click="kembali"
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <h2 class="flex-1 text-base font-black text-[var(--text-primary)]">Jadwal Sholat</h2>
      <button
        type="button"
        class="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
        :class="
          bukaSetelan
            ? 'bg-teal-600 text-white'
            : 'text-[var(--text-primary)] hover:bg-slate-100 dark:hover:bg-slate-800'
        "
        aria-label="Pengaturan ibadah"
        @click="bukaSetelan = !bukaSetelan"
      >
        <i class="fas fa-gear"></i>
      </button>
    </div>

    <section
      v-if="bukaSetelan"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <PengaturanIbadah />
    </section>

    <!-- Waktu berikutnya -->
    <div class="kartu-berikutnya relative overflow-hidden rounded-2xl text-white px-4 py-4">
      <p class="text-[11px] text-white/80 flex items-center gap-1.5">
        <i class="fas fa-location-dot"></i>{{ lokasi.nama }}
        <span v-if="memuatLokasi" class="ml-1"><i class="fas fa-spinner fa-spin"></i></span>
      </p>
      <p class="text-sm mt-2 text-teal-100">
        {{ berikutnya.besok ? 'Besok, ' : '' }}{{ NAMA_WAKTU[berikutnya.kunci] }}
      </p>
      <p class="text-4xl font-black tabular-nums leading-tight">
        {{ formatMenit(berikutnya.menit) }}
      </p>
      <p class="text-xs text-white/80 mt-1">dalam {{ formatSisa(berikutnya.sisa) }}</p>
      <p class="text-[11px] text-white/70 mt-3">{{ namaMetode }}</p>
      <p v-if="galatLokasi" class="text-[11px] text-amber-200 mt-1">{{ galatLokasi }}</p>
    </div>

    <!-- Pilih hari -->
    <div class="flex items-center justify-between gap-2">
      <button
        type="button"
        class="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 text-[var(--text-primary)] cursor-pointer"
        aria-label="Hari sebelumnya"
        @click="geser(-1)"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <button
        type="button"
        class="flex-1 text-center cursor-pointer"
        :disabled="selisihHari === 0"
        @click="selisihHari = 0"
      >
        <p class="text-sm font-black text-[var(--text-primary)]">{{ labelTanggal }}</p>
        <p v-if="selisihHari !== 0" class="text-[11px] text-teal-700 dark:text-teal-300">
          Kembali ke hari ini
        </p>
      </button>
      <button
        type="button"
        class="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 text-[var(--text-primary)] cursor-pointer"
        aria-label="Hari berikutnya"
        @click="geser(1)"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <div
      class="bg-[var(--bg-card)] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
    >
      <div
        v-for="k in URUTAN"
        :key="k"
        class="flex items-center justify-between px-4 py-3 border-b last:border-b-0 border-slate-100 dark:border-slate-800"
        :class="
          selisihHari === 0 && k === berikutnya.kunci && !berikutnya.besok
            ? 'bg-teal-50 dark:bg-teal-900/30'
            : ''
        "
      >
        <span
          class="text-sm flex items-center gap-3"
          :class="
            WAKTU_WAJIB.includes(k)
              ? 'font-bold text-[var(--text-primary)]'
              : 'text-[var(--text-secondary)]'
          "
        >
          <i :class="['fas w-4 text-center text-teal-600', IKON[k]]"></i>{{ NAMA_WAKTU[k] }}
        </span>
        <span
          class="tabular-nums"
          :class="
            WAKTU_WAJIB.includes(k)
              ? 'text-base font-black text-[var(--text-primary)]'
              : 'text-sm text-[var(--text-secondary)]'
          "
          >{{ tampil.jam[k] }}</span
        >
      </div>
    </div>

    <button
      v-haptic
      type="button"
      class="w-full py-3 rounded-2xl text-sm font-bold border border-teal-600 text-teal-700 dark:text-teal-300 cursor-pointer"
      @click="router.push(awalan + '/kiblat')"
    >
      <i class="fas fa-compass mr-2"></i>Arah Kiblat
    </button>
    <p class="text-[11px] text-center text-[var(--text-secondary)] pb-2">
      Perkiraan perhitungan astronomis; selisih ±1 menit dari jadwal resmi wajar.
    </p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useIbadah } from '@/composables/useIbadah'
import PengaturanIbadah from '@/components/publik/PengaturanIbadah.vue'
import { METODE, NAMA_WAKTU, WAKTU_WAJIB, formatMenit, formatSisa } from '@/utils/waktuSholat'

const URUTAN = ['imsak', 'subuh', 'terbit', 'dhuha', 'dzuhur', 'ashar', 'maghrib', 'isya']
const IKON = {
  imsak: 'fa-moon',
  subuh: 'fa-cloud-moon',
  terbit: 'fa-sun',
  dhuha: 'fa-sun',
  dzuhur: 'fa-sun',
  ashar: 'fa-cloud-sun',
  maghrib: 'fa-cloud-moon',
  isya: 'fa-star-and-crescent'
}
const HARI = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu']
const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

const router = useRouter()
const route = useRoute()
const {
  jadwal,
  berikutnya,
  lokasi,
  memuatLokasi,
  galatLokasi,
  otomatis,
  metode,
  sekarang,
  jadwalTanggal,
  perbaruiLokasi
} = useIbadah()

// Pertama kali (masih memakai titik pesantren): di sinilah izin lokasi pantas diminta —
// pengguna sendiri yang membuka jadwal. Beranda tak pernah memunculkan dialog izin.
onMounted(() => {
  if (otomatis.value && lokasi.value.sumber === 'pesantren') perbaruiLokasi({ paksa: true })
})

const awalan = computed(() => (route.path.startsWith('/umum') ? '/umum' : '/ibadah'))
const bukaSetelan = ref(false)
const selisihHari = ref(0)

const tanggalTampil = computed(() => {
  const d = new Date(sekarang.value)
  d.setDate(d.getDate() + selisihHari.value)
  return d
})
const tampil = computed(() => {
  if (selisihHari.value === 0) return jadwal.value
  const d = tanggalTampil.value
  const p = (n) => String(n).padStart(2, '0')
  return jadwalTanggal(`${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`)
})
const labelTanggal = computed(() => {
  const d = tanggalTampil.value
  const pre = selisihHari.value === 0 ? 'Hari ini · ' : ''
  return `${pre}${HARI[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`
})
const namaMetode = computed(() => METODE[metode.value]?.label || '')

function geser(n) {
  selisihHari.value += n
}
function kembali() {
  if (window.history.length > 1) router.back()
  else router.push(awalan.value === '/umum' ? '/umum' : '/dashboard')
}
</script>

<style scoped>
.kartu-berikutnya {
  background: linear-gradient(135deg, #0f766e 0%, #134e4a 100%);
}
</style>
