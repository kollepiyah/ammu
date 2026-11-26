<template>
  <!-- Layar baca Kitab & Wirid (blueprint §3.5; bab & halaman Kyai 26 Nov 2026, pola NU Online):
       bacaan "berbab" dibuka di daftar bab, bacaan "tunggal" langsung di halaman 1; halaman digeser
       kiri-kanan. Halaman disimpan di ?hal= sehingga tombol kembali HP menuju daftar bab.
       Isi disimpan di HP 24 jam — dibaca ulang tanpa internet. -->
  <!-- Layar penuh (useModeBaca): akar jadi lapisan fixed yang menutupi header & menu bawah;
       ketuk tengah layar = sembunyikan/tampilkan kontrol. -->
  <div
    ref="akarRef"
    :class="aktif ? 'baca-penuh' : 'max-w-xl mx-auto'"
    @click="klikAkar"
    @touchstart.passive="mulaiGeser"
    @touchend.passive="akhirGeser"
  >
    <div
      v-show="!aktif || kontrol"
      class="kepala-baca sticky top-0 z-10 flex items-center gap-1 px-2 py-2 bg-[var(--bg-page)] border-b border-slate-100 dark:border-slate-800"
    >
      <button
        v-if="berbab && hal >= 0"
        type="button"
        class="w-9 h-9 shrink-0 rounded-full text-[var(--text-primary)] cursor-pointer"
        aria-label="Ke daftar bab"
        @click.stop="keDaftar"
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
      <!-- Kyai 26 Nov: ukuran huruf & layar penuh disatukan di menu titik tiga agar kepala rapi. -->
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
          class="absolute right-0 top-full mt-1 w-56 rounded-xl bg-[var(--bg-card)] border border-slate-200 dark:border-slate-700 shadow-lg py-1 z-20"
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
            class="w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-sm font-bold text-[var(--text-primary)] cursor-pointer"
            @click="pilihLayarPenuh"
          >
            <i :class="['fas w-4 text-teal-600', aktif ? 'fa-compress' : 'fa-expand']"></i>
            {{ aktif ? 'Keluar dari layar penuh' : 'Layar penuh' }}
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
      <div class="px-4 py-5 text-center border-b border-slate-100 dark:border-slate-800">
        <p class="text-lg font-black text-teal-700 dark:text-teal-300">{{ amalan.judul }}</p>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">{{ bab.length }} bab</p>
        <p
          v-if="amalan.keterangan"
          class="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed whitespace-pre-line"
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
        class="w-full flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 text-left cursor-pointer"
        :class="
          penanda?.hal === i ? 'text-teal-700 dark:text-teal-300' : 'text-[var(--text-primary)]'
        "
        @click="bukaBab(i)"
      >
        <span class="w-6 shrink-0 text-xs font-bold text-[var(--text-secondary)]">{{ i + 1 }}</span>
        <span class="min-w-0 flex-1 text-sm font-bold truncate">{{
          b.judul || `Bab ${i + 1}`
        }}</span>
        <i v-if="penanda?.hal === i" class="fas fa-bookmark text-xs"></i>
        <i v-else class="fas fa-chevron-right text-xs text-[var(--text-secondary)]"></i>
      </button>
    </template>

    <!-- Halaman bacaan -->
    <template v-else>
      <p
        v-if="hal === 0 && amalan.keterangan && !berbab"
        class="px-4 pt-3 text-xs text-[var(--text-secondary)] leading-relaxed whitespace-pre-line"
      >
        {{ amalan.keterangan }}
      </p>
      <button
        v-if="!berbab && hal === 0 && penanda?.hal > 0"
        type="button"
        class="mx-4 mt-3 px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200 cursor-pointer"
        @click.stop="pindah(penanda.hal)"
      >
        <i class="fas fa-bookmark mr-1.5"></i>Lanjutkan ke {{ labelBab(penanda.hal) }}
      </button>
      <p
        v-if="berbab && babKini?.judul"
        class="px-4 pt-4 text-center text-xs font-black text-teal-700 dark:text-teal-300"
      >
        {{ babKini.judul }}
      </p>

      <template v-for="(b, i) in babKini?.bagian || []" :key="`${hal}-${i}`">
        <p v-if="b.jenis === 'pemisah'" class="text-center text-slate-400 tracking-[0.5em] py-3">
          ***
        </p>
        <section v-else-if="b.jenis === 'judul'" class="px-4 pt-5 pb-2 text-center">
          <p
            class="font-arabic text-teal-700 dark:text-teal-300 whitespace-pre-line"
            dir="rtl"
            lang="ar"
            :style="{ fontSize: Math.round(ukuran * 0.85) + 'px', lineHeight: 1.8 }"
          >
            {{ b.arab }}
          </p>
          <p
            v-if="mode !== 'arab' && b.latin"
            class="mt-1 text-sm font-bold text-teal-700 dark:text-teal-300 whitespace-pre-line"
          >
            {{ b.latin }}
          </p>
        </section>
        <section v-else class="px-4 py-4 border-b border-slate-100 dark:border-slate-800">
          <div v-if="b.judul || b.ulang" class="flex items-center justify-between gap-2 mb-3">
            <p class="text-xs font-black text-teal-700 dark:text-teal-300">{{ b.judul }}</p>
            <span
              v-if="b.ulang"
              class="shrink-0 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
              >{{ b.ulang }}×</span
            >
          </div>
          <!-- Syair (Diba', Barzanji): baris bergantian kanan–kiri seperti cetakan kitab. -->
          <div
            v-if="b.jenis === 'syair'"
            class="font-arabic text-[var(--text-primary)]"
            dir="rtl"
            lang="ar"
            :style="{ fontSize: ukuran + 'px', lineHeight: 2.1 }"
          >
            <p
              v-for="(s, j) in barisSyair(b.arab)"
              :key="j"
              :class="s.sisi === 'awal' ? 'text-right pl-[12%]' : 'text-left pr-[12%]'"
            >
              {{ s.teks }}
            </p>
          </div>
          <p
            v-else
            class="font-arabic text-right text-[var(--text-primary)] whitespace-pre-line"
            dir="rtl"
            lang="ar"
            :style="{ fontSize: ukuran + 'px', lineHeight: 2 }"
          >
            {{ b.arab }}
          </p>
          <p
            v-if="mode !== 'arab' && b.latin"
            class="mt-3 text-sm italic text-teal-800 dark:text-teal-200 leading-relaxed whitespace-pre-line"
          >
            {{ b.latin }}
          </p>
          <p
            v-if="mode === 'lengkap' && b.arti"
            class="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line"
          >
            {{ b.arti }}
          </p>
        </section>
      </template>

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
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataTamu } from '@/composables/useDataTamu'
import { ambilAmalan } from '@/services/amalan'
import {
  ukuranArab,
  babAmalan,
  barisSyair,
  labelHalaman,
  halamanAwal,
  modeBerikut,
  LABEL_MODE
} from '@/utils/amalan'
import { useModeBaca } from '@/composables/useModeBaca'

const KUNCI_SETELAN = 'ammu_baca_amalan'
const KUNCI_PENANDA = 'ammu_penanda_amalan'

const route = useRoute()
const router = useRouter()
const akarRef = ref(null)
const { aktif, kontrol, ketuk, alihkan: alihkanLayar } = useModeBaca()
const menuBuka = ref(false)
// Ketukan di luar menu menutup menu dulu (tanpa ikut menyembunyikan kontrol layar penuh).
function klikAkar(e) {
  if (menuBuka.value) {
    menuBuka.value = false
    return
  }
  ketuk(e)
}
function pilihLayarPenuh() {
  menuBuka.value = false
  alihkanLayar()
}
const id = String(route.params.id || '')
const { data, loading } = useDataTamu(`amalan_${id}`, () => ambilAmalan(id), {
  umurMs: 24 * 60 * 60 * 1000
})
const amalan = computed(() => data.value || null)
const bab = computed(() => babAmalan(amalan.value))
const bentuk = computed(() => (amalan.value?.bentuk === 'berbab' ? 'berbab' : 'tunggal'))
const berbab = computed(() => bentuk.value === 'berbab' && bab.value.length > 1)
const hal = computed(() => halamanAwal(bentuk.value, bab.value.length, route.query.hal))
const babKini = computed(() => (hal.value >= 0 ? bab.value[hal.value] : null))
const judulKepala = computed(() => {
  if (!amalan.value) return 'Memuat…'
  return berbab.value && babKini.value?.judul ? babKini.value.judul : amalan.value.judul
})

function labelBab(i) {
  return berbab.value ? bab.value[i]?.judul || `Bab ${i + 1}` : `Halaman ${i + 1}`
}

// Membuka bab = push (tombol kembali HP kembali ke daftar); geser halaman = replace.
function bukaBab(i) {
  router.push({ query: { ...route.query, hal: String(i) } })
}
function pindah(i) {
  if (i < 0 || i >= bab.value.length) return
  router.replace({ query: { ...route.query, hal: String(i) } })
}
function keDaftar() {
  const q = { ...route.query }
  delete q.hal
  router.replace({ query: q })
}
watch(hal, async () => {
  await nextTick()
  const wadah = aktif.value ? akarRef.value : document.getElementById('app-scroll')
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
const penanda = ref(muatPenanda()[id] || null)
const ditandai = computed(() => penanda.value?.hal === hal.value)
function alihkanPenanda() {
  const peta = muatPenanda()
  if (ditandai.value) delete peta[id]
  else peta[id] = { hal: hal.value, waktu: Date.now() }
  penanda.value = peta[id] || null
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
/* Mode layar penuh: lapisan di atas header & menu bawah; isi tak tertutup lubang kamera/garis
   navigasi (safe-area). */
.baca-penuh {
  position: fixed;
  inset: 0;
  /* Turun melewati dasar viewport: menutup celah bug iOS 26 (lihat main.css, html.native-shell). */
  bottom: calc(-1 * env(safe-area-inset-bottom, 0px));
  z-index: 250;
  overflow-y: auto;
  background: var(--bg-page);
}
.baca-penuh > * {
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
}
.baca-penuh .kepala-baca {
  padding-top: calc(env(safe-area-inset-top) + 0.5rem);
}
.baca-penuh .ujung-baca {
  height: calc(env(safe-area-inset-bottom) * 2 + 1.5rem);
}
.baca-penuh .pager-baca {
  padding-bottom: calc(env(safe-area-inset-bottom) * 2 + 0.5rem);
}
</style>
