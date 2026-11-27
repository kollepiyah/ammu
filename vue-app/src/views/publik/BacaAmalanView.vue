<template>
  <!-- Layar baca Kitab & Wirid (blueprint §3.5; bab & halaman Kyai 26 Nov 2026, pola NU Online):
       bacaan "berbab" dibuka di daftar bab, bacaan "tunggal" langsung di halaman 1; halaman digeser
       kiri-kanan. Halaman disimpan di ?hal= sehingga tombol kembali HP menuju daftar bab.
       Isi disimpan di HP 24 jam — dibaca ulang tanpa internet. -->
  <!-- Layar penuh otomatis (Kyai 27 Nov 2026): top bar master & navigasi bawah disembunyikan
       otomatis lewat meta.layarBacaPenuh + useModeBaca({ otomatis: true }). Ketuk tengah layar
       menyembunyikan/menampilkan bilah bacaan tipis (kepala + pager). -->
  <div
    ref="akarRef"
    class="baca-penuh"
    @click="klikAkar"
    @touchstart.passive="mulaiGeser"
    @touchend.passive="akhirGeser"
  >
    <div v-if="hal >= 0 && !kontrol" class="aman-atas-baca" aria-hidden="true"></div>
    <div
      v-show="hal < 0 || kontrol"
      class="kepala-baca sticky top-0 z-10 flex items-center gap-1 px-2 py-2 bg-[var(--bg-page)] border-b border-slate-100 dark:border-slate-800"
    >
      <button
        type="button"
        class="w-9 h-9 shrink-0 rounded-full text-[var(--text-primary)] cursor-pointer"
        :aria-label="berbab && hal >= 0 ? 'Ke daftar bab' : 'Kembali ke daftar bacaan'"
        @click.stop="berbab && hal >= 0 ? keDaftar() : kembaliKeDaftar()"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <h2 class="flex-1 min-w-0 px-1 text-sm font-black text-teal-700 dark:text-teal-300 truncate">
        {{ judulKepala }}
      </h2>
      <button
        type="button"
        class="w-9 h-9 shrink-0 rounded-full text-sm font-black text-[var(--text-primary)] cursor-pointer"
        :title="LABEL_MODE[mode]"
        aria-label="Ganti tampilan Arab, Latin, dan arti"
        @click.stop="gantiMode"
      >
        ع/A
      </button>
      <button
        v-if="hal >= 0"
        type="button"
        class="w-9 h-9 shrink-0 rounded-full cursor-pointer"
        :class="
          ditandai ? 'text-teal-600 dark:text-teal-300' : 'text-slate-300 dark:text-slate-600'
        "
        :aria-label="ditandai ? 'Hapus penanda' : 'Tandai halaman ini'"
        @click.stop="alihkanPenanda"
      >
        <i class="fas fa-bookmark"></i>
      </button>
      <!-- Kyai 26 Nov: ukuran huruf & setelan baca disatukan di menu titik tiga agar kepala rapi. -->
      <div class="relative shrink-0">
        <button
          type="button"
          class="w-9 h-9 rounded-full text-base text-[var(--text-primary)] cursor-pointer"
          aria-label="Pengaturan baca"
          :aria-expanded="menuBuka"
          @click.stop="menuBuka = !menuBuka"
        >
          <i class="fas fa-ellipsis-vertical"></i>
        </button>
        <div
          v-if="menuBuka"
          class="absolute right-0 top-full mt-1 w-60 rounded-xl bg-[var(--bg-card)] border border-slate-200 dark:border-slate-700 shadow-lg py-1 z-20"
          @click.stop
        >
          <div class="flex items-center gap-2 px-3 py-2">
            <span class="flex-1 text-xs font-bold text-[var(--text-secondary)]">Huruf Arab</span>
            <button
              type="button"
              class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-black text-[var(--text-primary)] cursor-pointer"
              aria-label="Perkecil huruf Arab"
              @click="ubahUkuran(-1)"
            >
              A−
            </button>
            <span class="w-7 text-center text-xs font-bold text-[var(--text-primary)]">{{
              ukuran
            }}</span>
            <button
              type="button"
              class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 text-base font-black text-[var(--text-primary)] cursor-pointer"
              aria-label="Perbesar huruf Arab"
              @click="ubahUkuran(1)"
            >
              A+
            </button>
          </div>
          <button
            type="button"
            class="w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-xs font-bold text-[var(--text-primary)] cursor-pointer border-t border-slate-100 dark:border-slate-800"
            @click="setTetapMenyala(!setelanBaca.tetapMenyala)"
          >
            <i class="fas fa-sun w-4 text-teal-600"></i>
            <span class="flex-1">Layar tetap menyala</span>
            <span
              class="text-[11px] font-black"
              :class="
                setelanBaca.tetapMenyala ? 'text-teal-600 dark:text-teal-300' : 'text-slate-400'
              "
              >{{ setelanBaca.tetapMenyala ? 'Aktif' : 'Mati' }}</span
            >
          </button>
          <button
            v-if="hal >= 0"
            type="button"
            class="w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-xs font-bold text-[var(--text-primary)] cursor-pointer border-t border-slate-100 dark:border-slate-800"
            @click="sembunyikanBilah"
          >
            <i class="fas fa-eye-slash w-4 text-teal-600"></i>
            Sembunyikan bilah atas
          </button>
        </div>
      </div>
    </div>
    <p
      v-if="labelMode"
      class="text-center text-[11px] font-bold text-teal-700 dark:text-teal-300 py-1 bg-teal-50 dark:bg-teal-900/30"
    >
      {{ labelMode }}
    </p>

    <p v-if="loading && !amalan" class="text-center text-sm text-[var(--text-secondary)] py-10">
      <i class="fas fa-spinner fa-spin mr-1.5"></i>Memuat bacaan…
    </p>
    <p v-else-if="!amalan" class="text-center text-sm text-[var(--text-secondary)] py-10">
      Bacaan tidak ditemukan atau belum bisa dimuat.
    </p>

    <!-- Daftar bab (bacaan berbab) -->
    <template v-else-if="hal < 0">
      <div class="px-4 sm:px-6 py-5 text-center border-b border-slate-100 dark:border-slate-800">
        <p class="text-lg font-black text-teal-700 dark:text-teal-300">{{ amalan.judul }}</p>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">{{ bab.length }} bab</p>
        <p
          v-if="amalan.keterangan"
          class="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed whitespace-pre-line max-w-2xl mx-auto"
        >
          {{ amalan.keterangan }}
        </p>
        <button
          v-if="penanda"
          v-haptic
          type="button"
          class="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-teal-50 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200 cursor-pointer"
          @click="bukaBab(penanda.hal)"
        >
          <i class="fas fa-bookmark mr-1.5"></i>Lanjutkan · {{ labelBab(penanda.hal) }}
        </button>
      </div>
      <button
        v-for="(b, i) in bab"
        :key="i"
        v-haptic
        type="button"
        class="w-full flex items-center gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 text-left cursor-pointer"
        :class="
          penanda?.hal === i ? 'text-teal-700 dark:text-teal-300' : 'text-[var(--text-primary)]'
        "
        @click="bukaBab(i)"
      >
        <span class="w-7 shrink-0 text-xs font-bold text-teal-700 dark:text-teal-300">{{
          i + 1
        }}</span>
        <span class="min-w-0 flex-1 text-sm font-bold truncate">{{
          b.judul || `Bab ${i + 1}`
        }}</span>
        <i v-if="penanda?.hal === i" class="fas fa-bookmark text-xs"></i>
        <i v-else class="fas fa-chevron-right text-xs text-[var(--text-secondary)]"></i>
      </button>
    </template>

    <!-- Halaman bacaan -->
    <template v-else>
      <div class="baca-kolom">
        <p
          v-if="hal === 0 && amalan.keterangan && !berbab"
          class="px-4 sm:px-6 pt-3 text-xs text-[var(--text-secondary)] leading-relaxed whitespace-pre-line"
        >
          {{ amalan.keterangan }}
        </p>
        <button
          v-if="!berbab && hal === 0 && penanda?.hal > 0"
          type="button"
          class="mx-4 sm:mx-6 mt-3 px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200 cursor-pointer"
          @click.stop="pindah(penanda.hal)"
        >
          <i class="fas fa-bookmark mr-1.5"></i>Lanjutkan ke {{ labelBab(penanda.hal) }}
        </button>
        <p
          v-if="berbab && babKini?.judul"
          class="px-4 sm:px-6 pt-5 pb-1 text-center text-base font-black"
          :class="kelasWarna(babKini.warna, KELAS_HIJAU)"
        >
          {{ babKini.judul }}
        </p>

        <!-- Kyai 26 Nov 2026: isi teks kaya dari editor (bentuk lama dikonversi htmlBab). Disaring
             saringHtmlAmalan SEBELUM v-html; ع/A menyembunyikan baris Latin/Arti lewat kelas mode-*. -->
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="isi-amalan px-4 sm:px-6 py-3 text-[var(--text-primary)]"
          :class="'mode-' + mode"
          :style="{ '--ukuran-arab': ukuran + 'px' }"
          v-html="htmlTampil"
        ></div>
        <!-- eslint-enable vue/no-v-html -->
      </div>

      <div
        v-if="bab.length > 1"
        v-show="!aktif || kontrol"
        class="pager-baca sticky bottom-0 mt-4 flex items-center gap-2 px-3 py-2 bg-[var(--bg-page)] border-t border-slate-100 dark:border-slate-800"
      >
        <button
          type="button"
          class="w-10 h-10 rounded-full text-teal-700 dark:text-teal-300 cursor-pointer disabled:opacity-30"
          :disabled="hal <= 0"
          aria-label="Sebelumnya"
          @click.stop="pindah(hal - 1)"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <p class="flex-1 text-center text-xs font-bold text-teal-700 dark:text-teal-300">
          {{ labelHalaman(bentuk, hal, bab.length) }}
        </p>
        <button
          type="button"
          class="w-10 h-10 rounded-full text-teal-700 dark:text-teal-300 cursor-pointer disabled:opacity-30"
          :disabled="hal >= bab.length - 1"
          aria-label="Berikutnya"
          @click.stop="pindah(hal + 1)"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div v-else class="ujung-baca h-6"></div>
    </template>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { ambilAmalan } from '@/services/amalan'
import {
  ukuranArab,
  babAmalan,
  labelHalaman,
  halamanAwal,
  modeBerikut,
  LABEL_MODE,
  kelasWarna
} from '@/utils/amalan'
import { htmlBab, rapikanTampilan, saringHtmlAmalan } from '@/utils/isiAmalan'
import { useModeBaca, setelanBaca, setTetapMenyala } from '@/composables/useModeBaca'

const KUNCI_SETELAN = 'ammu_baca_amalan'
const KUNCI_PENANDA = 'ammu_penanda_amalan'
const KUNCI_CACHE_AWALAN = 'ammu_tamu_amalan_'
const UMUR_CACHE_MS = 24 * 60 * 60 * 1000
const KELAS_HIJAU = 'text-teal-700 dark:text-teal-300' // warna bawaan judul

const route = useRoute()
const router = useRouter()
const ui = useUiStore()
const akarRef = ref(null)
const { aktif, kontrol, ketuk } = useModeBaca({ otomatis: true })
const menuBuka = ref(false)
// Ketukan di luar menu menutup menu dulu (tanpa ikut menyembunyikan kontrol layar penuh).
function klikAkar(e) {
  if (menuBuka.value) {
    menuBuka.value = false
    return
  }
  if (hal.value >= 0) ketuk(e)
}
function sembunyikanBilah() {
  menuBuka.value = false
  kontrol.value = false
}
function tutupMenuSaatKembali(ev) {
  if (menuBuka.value) {
    ev.preventDefault()
    menuBuka.value = false
  }
}
onMounted(() => window.addEventListener('android-back', tutupMenuSaatKembali))
onUnmounted(() => window.removeEventListener('android-back', tutupMenuSaatKembali))

// Reaktif terhadap perubahan parameter :id (mis. pindah antar kitab tanpa unmount komponen).
const id = computed(() => String(route.params.id || ''))
const data = ref(null)
const loading = ref(true)
async function muatBacaan(targetId) {
  data.value = null
  loading.value = true
  if (!targetId) {
    loading.value = false
    return
  }
  let diambilPada = 0
  try {
    const simpan = JSON.parse(localStorage.getItem(KUNCI_CACHE_AWALAN + targetId) || 'null')
    if (simpan && simpan.isi) {
      data.value = simpan.isi
      diambilPada = simpan.waktu || 0
      loading.value = false
    }
  } catch {
    /* salinan rusak -> muat ulang */
  }
  if (data.value != null && Date.now() - diambilPada < UMUR_CACHE_MS) return
  try {
    const isi = await ambilAmalan(targetId)
    if (id.value !== targetId) return
    data.value = isi
    try {
      localStorage.setItem(
        KUNCI_CACHE_AWALAN + targetId,
        JSON.stringify({ isi, waktu: Date.now() })
      )
    } catch {
      /* kuota penuh */
    }
  } catch {
    /* tetap tampilkan salinan lokal bila ada */
  } finally {
    if (id.value === targetId) loading.value = false
  }
}
watch(id, (v) => muatBacaan(v), { immediate: true })

const amalan = computed(() => data.value || null)
const bab = computed(() => babAmalan(amalan.value))
const bentuk = computed(() => (amalan.value?.bentuk === 'berbab' ? 'berbab' : 'tunggal'))
const berbab = computed(() => bentuk.value === 'berbab' && bab.value.length > 1)
const hal = computed(() => halamanAwal(bentuk.value, bab.value.length, route.query.hal))
const babKini = computed(() => (hal.value >= 0 ? bab.value[hal.value] : null))
const htmlTampil = computed(() =>
  babKini.value ? rapikanTampilan(saringHtmlAmalan(htmlBab(babKini.value))) : ''
)
const judulKepala = computed(() => {
  if (!amalan.value) return 'Memuat…'
  return berbab.value && babKini.value?.judul ? babKini.value.judul : amalan.value.judul
})
watch(
  () => amalan.value?.judul,
  (j) => ui.setJudulTopBar(j || ''),
  { immediate: true }
)
onUnmounted(() => ui.setJudulTopBar(''))

function labelBab(i) {
  return berbab.value ? bab.value[i]?.judul || `Bab ${i + 1}` : `Halaman ${i + 1}`
}

// Membuka bab = push (tombol kembali HP kembali ke daftar); geser halaman = replace.
function bukaBab(i) {
  kontrol.value = true
  router.push({ query: { ...route.query, hal: String(i) } })
}
function pindah(i) {
  if (i < 0 || i >= bab.value.length) return
  router.replace({ query: { ...route.query, hal: String(i) } })
}
function keDaftar() {
  kontrol.value = true
  const back = String(window.history.state?.back || '')
  if (back && back.startsWith(route.path) && !back.includes('hal=')) {
    router.back()
    return
  }
  const q = { ...route.query }
  delete q.hal
  router.replace({ query: q })
}
function kembaliKeDaftar() {
  const tujuan = route.path.startsWith('/umum') ? '/umum/wirid' : '/ibadah/wirid'
  const back = String(window.history.state?.back || '')
  if (back && back.startsWith(tujuan)) {
    router.back()
    return
  }
  router.replace(tujuan)
}
watch(hal, async (v) => {
  if (v < 0) kontrol.value = true
  await nextTick()
  const wadah = document.getElementById('app-scroll') || akarRef.value
  wadah?.scrollTo?.({ top: 0 })
})

// Geser kiri = halaman berikutnya. Hanya gerak mendatar yang jelas (bukan menggulir).
let sentuh = null
function mulaiGeser(e) {
  const t = e.touches?.[0]
  sentuh = t ? { x: t.clientX, y: t.clientY } : null
}
function akhirGeser(e) {
  const t = e.changedTouches?.[0]
  if (!sentuh || !t || hal.value < 0) return
  const dx = t.clientX - sentuh.x
  const dy = t.clientY - sentuh.y
  sentuh = null
  if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5) return
  pindah(hal.value + (dx < 0 ? 1 : -1))
}

// Penanda per bacaan, disimpan di HP.
function muatPenanda() {
  try {
    return JSON.parse(localStorage.getItem(KUNCI_PENANDA) || '{}') || {}
  } catch {
    return {}
  }
}
const penanda = ref(muatPenanda()[id.value] || null)
watch(id, (v) => {
  penanda.value = muatPenanda()[v] || null
})
const ditandai = computed(() => penanda.value?.hal === hal.value)
function alihkanPenanda() {
  const peta = muatPenanda()
  if (ditandai.value) delete peta[id.value]
  else peta[id.value] = { hal: hal.value, waktu: Date.now() }
  penanda.value = peta[id.value] || null
  try {
    localStorage.setItem(KUNCI_PENANDA, JSON.stringify(peta))
  } catch {
    /* noop */
  }
}

// Setelan baca (ukuran huruf, mode tampil) diingat di HP untuk semua bacaan. Setelan lama
// {latin, arti} diterjemahkan ke mode.
let awal = {}
try {
  awal = JSON.parse(localStorage.getItem(KUNCI_SETELAN) || '{}') || {}
} catch {
  awal = {}
}
const ukuran = ref(Number(awal.ukuran) || 28)
const mode = ref(
  LABEL_MODE[awal.mode]
    ? awal.mode
    : awal.latin === false && awal.arti === false
      ? 'arab'
      : awal.arti === false
        ? 'latin'
        : 'lengkap'
)
function simpan() {
  try {
    localStorage.setItem(KUNCI_SETELAN, JSON.stringify({ ukuran: ukuran.value, mode: mode.value }))
  } catch {
    /* noop */
  }
}
function ubahUkuran(arah) {
  ukuran.value = ukuranArab(ukuran.value, arah)
  simpan()
}
const labelMode = ref('')
let jedaLabel = null
function gantiMode() {
  mode.value = modeBerikut(mode.value)
  simpan()
  labelMode.value = LABEL_MODE[mode.value]
  clearTimeout(jedaLabel)
  jedaLabel = setTimeout(() => (labelMode.value = ''), 1500)
}
</script>

<style scoped>
/* Mode layar penuh otomatis: mengalir normal di dalam #app-scroll (satu-satunya scroller)
   supaya gulir vertikal selalu mulus di iOS PWA maupun Android tanpa jebakan fixed-in-scroll.
   Top bar master, navigasi bawah, & strip status bar hijau sudah disembunyikan lewat
   meta.layarBacaPenuh + html.layar-baca-penuh. */
.baca-penuh {
  min-height: 100%;
  background: var(--bg-page);
  touch-action: pan-y;
}
/* Kepala bacaan, daftar bab, & pager melebar penuh seperti NU Online (termasuk di tablet
   landscape); hanya kolom teks bacaan (.baca-kolom) yang diberi lebar baca nyaman (48rem). */
.baca-penuh .baca-kolom {
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
}
.baca-penuh .aman-atas-baca {
  height: env(safe-area-inset-top, 0px);
}
.baca-penuh .kepala-baca {
  padding-top: calc(env(safe-area-inset-top, 0px) + 0.5rem);
  padding-left: max(0.5rem, env(safe-area-inset-left, 0px));
  padding-right: max(0.5rem, env(safe-area-inset-right, 0px));
}
.baca-penuh .ujung-baca {
  height: calc(env(safe-area-inset-bottom, 0px) + 1.5rem);
}
.baca-penuh .pager-baca {
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 0.5rem);
  padding-left: max(0.75rem, env(safe-area-inset-left, 0px));
  padding-right: max(0.75rem, env(safe-area-inset-right, 0px));
}
</style>
