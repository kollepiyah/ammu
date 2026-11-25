<template>
  <!-- Jadwal Sholat (blueprint F2; tata letak ala NU Online — Kyai 25 Nov 2026): bagian atas hijau
       menyambung top bar, isi rata tengah, tanpa kartu & tanpa tombol kembali (pakai tombol HP).
       Layar yang sama untuk /umum/sholat (tamu) dan /ibadah/sholat (Portal). -->
  <div class="max-w-xl mx-auto">
    <section class="kepala-sholat text-white text-center px-4 pt-4 pb-4 rounded-b-3xl">
      <p class="text-xs text-white/90">
        <i class="fas fa-location-dot text-red-400 mr-1"></i>{{ tempat }}
        <i v-if="memuatLokasi" class="fas fa-spinner fa-spin ml-1"></i>
      </p>
      <p class="text-2xl font-black mt-2">
        {{ berikutnya.besok ? 'Besok · ' : '' }}{{ NAMA_WAKTU[berikutnya.kunci] }}
        {{ formatMenit(berikutnya.menit) }} <span class="text-base font-bold">{{ zona }}</span>
      </p>
      <p class="text-sm tabular-nums text-teal-100 mt-1">{{ hitungMundur }}</p>
      <p v-if="galatLokasi" class="text-[11px] text-amber-200 mt-2">{{ galatLokasi }}</p>
      <div class="flex items-center justify-between mt-4 text-xs font-bold">
        <button
          type="button"
          class="flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          :disabled="memuatLokasi"
          @click="perbaruiLokasi({ paksa: true })"
        >
          <i class="fas fa-location-crosshairs"></i>Perbarui
        </button>
        <button
          type="button"
          class="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
          :class="bukaSetelan ? 'bg-white/20' : ''"
          aria-label="Pengaturan ibadah"
          @click="bukaSetelan = !bukaSetelan"
        >
          <i class="fas fa-gear text-base"></i>
        </button>
        <button
          type="button"
          class="flex items-center gap-1.5 cursor-pointer"
          @click="router.push(awalan + '/kiblat')"
        >
          <i class="fas fa-compass"></i>Arah Kiblat
        </button>
      </div>
    </section>

    <section v-if="bukaSetelan" class="px-4 py-4 border-b border-slate-200 dark:border-slate-700">
      <PengaturanIbadah />
    </section>

    <!-- Pilih hari -->
    <div class="flex items-center justify-between gap-2 px-4 py-3">
      <button
        type="button"
        class="w-9 h-9 rounded-full text-teal-600 dark:text-teal-300 cursor-pointer"
        aria-label="Hari sebelumnya"
        @click="selisihHari--"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <button type="button" class="flex-1 text-center cursor-pointer" @click="selisihHari = 0">
        <p class="text-sm font-black text-[var(--text-primary)]">{{ labelTanggal }}</p>
        <p class="text-xs text-[var(--text-secondary)]">{{ labelHijri }}</p>
      </button>
      <button
        type="button"
        class="w-9 h-9 rounded-full text-teal-600 dark:text-teal-300 cursor-pointer"
        aria-label="Hari berikutnya"
        @click="selisihHari++"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <div class="border-t border-slate-100 dark:border-slate-800">
      <div
        v-for="k in URUTAN"
        :key="k"
        class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800"
        :class="disorot(k) ? 'bg-teal-50 dark:bg-teal-900/30' : ''"
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

    <p class="text-[11px] text-center text-[var(--text-secondary)] px-4 py-4">
      {{ namaMetode }} · perhitungan astronomis; selisih ±1 menit dari jadwal resmi wajar.
    </p>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useIbadah } from '@/composables/useIbadah'
import { useSettingsStore } from '@/stores/settings'
import PengaturanIbadah from '@/components/publik/PengaturanIbadah.vue'
import { formatHijriLatin, getKalibrasi } from '@/utils/hijri'
import {
  METODE,
  NAMA_WAKTU,
  WAKTU_WAJIB,
  formatMenit,
  detikMenuju,
  formatHitungMundur,
  namaTempatPanjang
} from '@/utils/waktuSholat'

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
const BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]
const ZONA = { 7: 'WIB', 8: 'WITA', 9: 'WIT' }

const router = useRouter()
const route = useRoute()
const settings = useSettingsStore()
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

const awalan = computed(() => (route.path.startsWith('/umum') ? '/umum' : '/ibadah'))
const tempat = computed(() => namaTempatPanjang(lokasi.value))
const bukaSetelan = ref(false)
const selisihHari = ref(0)
const zona = computed(() => ZONA[-new Date().getTimezoneOffset() / 60] || '')
const namaMetode = computed(() => METODE[metode.value]?.label || '')

// Hitung mundur berdetik — jam lokal layar ini saja (useIbadah cukup berdetak tiap 20 dtk).
const kini = ref(new Date())
let detak = null
const hitungMundur = computed(() => formatHitungMundur(detikMenuju(berikutnya.value, kini.value)))

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
  return `${HARI[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`
})
const labelHijri = computed(() =>
  formatHijriLatin(tanggalTampil.value, getKalibrasi(settings.settings))
)

function disorot(k) {
  return selisihHari.value === 0 && k === berikutnya.value.kunci && !berikutnya.value.besok
}

onMounted(() => {
  detak = setInterval(() => (kini.value = new Date()), 1000)
  // Pertama kali (masih titik pesantren): di sinilah izin lokasi pantas diminta — pengguna
  // sendiri yang membuka jadwal. Beranda tak pernah memunculkan dialog izin.
  if (otomatis.value && lokasi.value.sumber === 'pesantren') perbaruiLokasi({ paksa: true })
})
onUnmounted(() => clearInterval(detak))
</script>

<style scoped>
/* Teal sama dengan top bar & kartu Hijriah — menyambung, juga di mode gelap. */
.kepala-sholat {
  background: linear-gradient(180deg, #0f766e 0%, #134e4a 100%);
}
</style>
