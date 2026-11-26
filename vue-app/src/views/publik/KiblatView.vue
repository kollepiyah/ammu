<template>
  <!-- Arah Kiblat (blueprint F2) — kompas dari sensor arah HP. Sama untuk /umum & /ibadah. -->
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
      <h2 class="flex-1 text-base font-black text-[var(--text-primary)]">Arah Kiblat</h2>
    </div>

    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm text-center"
    >
      <p
        class="text-sm font-black"
        :class="pas ? 'text-teal-600 dark:text-teal-300' : 'text-[var(--text-primary)]'"
      >
        {{ pesan }}
      </p>

      <!-- Kompas: piringan berputar mengikuti HP; Ka'bah ditandai di azimut kiblat. -->
      <div class="relative mx-auto my-5 w-64 h-64 max-w-full">
        <div
          class="absolute left-1/2 -top-2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-[14px] z-10"
          :class="pas ? 'border-t-teal-600' : 'border-t-rose-600'"
        ></div>
        <svg
          viewBox="0 0 200 200"
          class="w-full h-full transition-transform duration-150 ease-out"
          :style="{ transform: `rotate(${-arahTampil}deg)` }"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="96" class="fill-slate-50 dark:fill-slate-800" />
          <circle
            cx="100"
            cy="100"
            r="96"
            fill="none"
            :stroke="pas ? '#0d9488' : '#cbd5e1'"
            stroke-width="3"
          />
          <g v-for="i in 72" :key="i" :transform="`rotate(${i * 5} 100 100)`">
            <line
              x1="100"
              y1="8"
              x2="100"
              :y2="i % 6 === 0 ? 20 : 14"
              stroke="#94a3b8"
              :stroke-width="i % 18 === 0 ? 2 : 1"
            />
          </g>
          <text
            v-for="m in MATA_ANGIN"
            :key="m.t"
            :transform="`rotate(${m.d} 100 100)`"
            x="100"
            y="36"
            text-anchor="middle"
            class="text-[13px] font-black"
            :fill="m.t === 'U' ? '#e11d48' : '#64748b'"
          >
            {{ m.t }}
          </text>
          <!-- garis & Ka'bah di azimut kiblat -->
          <g :transform="`rotate(${azimut} 100 100)`">
            <line x1="100" y1="100" x2="100" y2="46" stroke="#0f766e" stroke-width="3" />
            <rect x="89" y="30" width="22" height="20" rx="2" fill="#111827" />
            <rect x="89" y="35" width="22" height="3" fill="#f59e0b" />
          </g>
          <circle cx="100" cy="100" r="5" fill="#0f766e" />
        </svg>
      </div>

      <p class="text-3xl font-black tabular-nums text-[var(--text-primary)]">
        {{ formatDerajat(azimut) }}
      </p>
      <p class="text-xs text-[var(--text-secondary)]">dari arah utara, searah jarum jam</p>
      <p v-if="adaSensor" class="text-xs text-[var(--text-secondary)] mt-1">
        HP menghadap {{ Math.round(arahTampil) }}°
      </p>
      <button
        v-if="perluIzin"
        type="button"
        class="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white cursor-pointer"
        @click="mintaIzinSensor"
      >
        Aktifkan kompas
      </button>
    </div>

    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm text-xs text-[var(--text-secondary)] space-y-1.5"
    >
      <p>
        <i class="fas fa-location-dot mr-1.5 text-teal-600"></i>{{ tempat }} ({{
          lokasi.lat.toFixed(3)
        }}, {{ lokasi.lon.toFixed(3) }})
        <i v-if="memuatLokasi" class="fas fa-spinner fa-spin ml-1"></i>
      </p>
      <p><i class="fas fa-route mr-1.5 text-teal-600"></i>Jarak ke Ka'bah ± {{ jarak }} km</p>
      <p>
        <i class="fas fa-circle-info mr-1.5 text-teal-600"></i>Letakkan HP mendatar, jauh dari benda
        logam/magnet. Bila arah meragukan, gerakkan HP membentuk angka 8 untuk kalibrasi.
      </p>
      <button
        v-if="geolokasiTersedia"
        type="button"
        class="mt-1 text-teal-700 dark:text-teal-300 font-bold cursor-pointer"
        :disabled="memuatLokasi"
        @click="perbaruiLokasi({ paksa: true })"
      >
        <i class="fas fa-location-crosshairs mr-1"></i>Perbarui lokasi
      </button>
      <p v-if="galatLokasi" class="text-rose-600 dark:text-rose-300">{{ galatLokasi }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useIbadah } from '@/composables/useIbadah'
import { arahKiblat, jarakKeKabah, selisihSudut, formatDerajat } from '@/utils/kiblat'
import { namaTempatPanjang } from '@/utils/waktuSholat'

const MATA_ANGIN = [
  { t: 'U', d: 0 },
  { t: 'T', d: 90 },
  { t: 'S', d: 180 },
  { t: 'B', d: 270 }
]
// Dianggap sudah menghadap kiblat bila selisihnya sekecil ini.
const TOLERANSI_DERAJAT = 3

const router = useRouter()
const route = useRoute()
const { lokasi, memuatLokasi, galatLokasi, perbaruiLokasi, geolokasiTersedia } = useIbadah()

const tempat = computed(() => namaTempatPanjang(lokasi.value))
const azimut = computed(() => arahKiblat(lokasi.value.lat, lokasi.value.lon))
const jarak = computed(() =>
  Math.round(jarakKeKabah(lokasi.value.lat, lokasi.value.lon)).toLocaleString('id-ID')
)

const arah = ref(null) // arah HP (derajat dari utara), null = sensor belum/tidak ada
const arahTampil = ref(0) // dihaluskan, kontinu (boleh > 360) supaya piringan tak berputar balik
const perluIzin = ref(false)
const menungguSensor = ref(true) // 1,5 detik pertama: belum tentu tak ada sensor
const adaSensor = computed(() => arah.value !== null)
const selisih = computed(() => (adaSensor.value ? selisihSudut(arah.value, azimut.value) : null))
const pas = computed(() => selisih.value !== null && Math.abs(selisih.value) <= TOLERANSI_DERAJAT)
const pesan = computed(() => {
  if (!adaSensor.value) {
    if (menungguSensor.value) return 'Membaca kompas…'
    return perluIzin.value
      ? 'Ketuk "Aktifkan kompas" untuk memakai sensor arah'
      : 'Kompas HP tidak terbaca — pakai sudut di bawah dengan kompas biasa'
  }
  if (pas.value) return 'Sudah menghadap kiblat'
  return selisih.value > 0
    ? `Putar ke kanan ${Math.round(selisih.value)}°`
    : `Putar ke kiri ${Math.round(-selisih.value)}°`
})

// Getar sekali saat baru pas (bukan terus-menerus).
watch(pas, (v) => {
  if (v) navigator.vibrate?.(40)
})

function terima(e) {
  let h = null
  if (typeof e.webkitCompassHeading === 'number')
    h = e.webkitCompassHeading // iOS
  else if (e.absolute !== false && typeof e.alpha === 'number') {
    // alpha berputar berlawanan jarum jam; arah kompas = 360 − alpha (+ rotasi layar).
    const putarLayar = window.screen?.orientation?.angle || 0
    h = (360 - e.alpha + putarLayar) % 360
  }
  if (h === null || Number.isNaN(h)) return
  arah.value = h
  // Penghalus: geser bertahap lewat selisih terpendek.
  arahTampil.value += selisihSudut(arahTampil.value % 360, h) * 0.25
}

let jenisEvent = ''
function pasang() {
  if (jenisEvent) return
  if ('ondeviceorientationabsolute' in window) jenisEvent = 'deviceorientationabsolute'
  else if ('ondeviceorientation' in window) jenisEvent = 'deviceorientation'
  if (jenisEvent) window.addEventListener(jenisEvent, terima)
}
async function mintaIzinSensor() {
  try {
    const r = await window.DeviceOrientationEvent?.requestPermission?.()
    perluIzin.value = false
    if (r === 'granted') pasang()
  } catch {
    perluIzin.value = false
  }
}

let jedaIzin = null
onMounted(() => {
  // Kyai 26 Nov 2026: kompas langsung jalan tanpa tombol. Android & kebanyakan browser tak
  //   butuh izin. iOS hanya mau meminta izin dari ketukan — tapi bila izin pernah diberikan,
  //   sensor langsung mengalir; tombol baru muncul bila 1,5 detik tak ada data sama sekali.
  pasang()
  const butuhIzin = typeof window.DeviceOrientationEvent?.requestPermission === 'function'
  if (butuhIzin)
    window.DeviceOrientationEvent.requestPermission()
      .then((r) => r === 'granted' && pasang())
      .catch(() => {})
  jedaIzin = setTimeout(() => {
    menungguSensor.value = false
    if (butuhIzin && arah.value === null) perluIzin.value = true
  }, 1500)
  // Kiblat butuh lokasi yang tepat — minta di sini (boleh memunculkan dialog izin).
  perbaruiLokasi({ paksa: lokasi.value.sumber !== 'kota' })
})
onUnmounted(() => {
  clearTimeout(jedaIzin)
  if (jenisEvent) window.removeEventListener(jenisEvent, terima)
})

function kembali() {
  if (window.history.length > 1) router.back()
  else router.push(route.path.startsWith('/umum') ? '/umum' : '/dashboard')
}
</script>
