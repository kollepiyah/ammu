<template>
  <!-- Layar baca Kitab & Wirid (blueprint §3.5): Arab besar (Scheherazade New), A−/A+, sakelar
       Latin & Arti. Isi disimpan di HP 24 jam — dibaca ulang tanpa internet. -->
  <!-- Layar penuh (useModeBaca): akar jadi lapisan fixed yang menutupi header & menu bawah;
       ketuk tengah layar = sembunyikan/tampilkan kontrol. -->
  <div :class="aktif ? 'baca-penuh' : 'max-w-xl mx-auto pb-6'" @click="ketuk">
    <div
      v-show="!aktif || kontrol"
      class="kepala-baca sticky top-0 z-10 flex items-center gap-2 px-3 py-2 bg-[var(--bg-page)] border-b border-slate-100 dark:border-slate-800"
    >
      <h2 class="flex-1 min-w-0 text-sm font-black text-[var(--text-primary)] truncate">
        {{ amalan?.judul || 'Memuat…' }}
      </h2>
      <button
        type="button"
        class="w-9 h-9 rounded-full text-sm font-black text-[var(--text-primary)] cursor-pointer"
        aria-label="Perkecil huruf Arab"
        @click="ubahUkuran(-1)"
      >
        A−
      </button>
      <button
        type="button"
        class="w-9 h-9 rounded-full text-base font-black text-[var(--text-primary)] cursor-pointer"
        aria-label="Perbesar huruf Arab"
        @click="ubahUkuran(1)"
      >
        A+
      </button>
      <button
        type="button"
        class="w-9 h-9 rounded-full text-base text-[var(--text-primary)] cursor-pointer"
        :aria-label="aktif ? 'Keluar dari layar penuh' : 'Layar penuh'"
        @click.stop="alihkanLayar"
      >
        <i :class="['fas', aktif ? 'fa-compress' : 'fa-expand']"></i>
      </button>
    </div>
    <div v-show="!aktif || kontrol" class="flex gap-2 px-4 py-2.5">
      <button
        v-for="s in SAKELAR"
        :key="s.kunci"
        type="button"
        class="px-3 py-1 rounded-full text-xs font-bold border transition cursor-pointer"
        :class="
          tampil[s.kunci]
            ? 'bg-teal-600 border-teal-600 text-white'
            : 'border-slate-200 dark:border-slate-700 text-[var(--text-secondary)]'
        "
        @click="alihkan(s.kunci)"
      >
        {{ s.label }}
      </button>
    </div>

    <p v-if="loading && !amalan" class="text-center text-sm text-[var(--text-secondary)] py-10">
      <i class="fas fa-spinner fa-spin mr-1.5"></i>Memuat bacaan…
    </p>
    <p v-else-if="!amalan" class="text-center text-sm text-[var(--text-secondary)] py-10">
      Bacaan tidak ditemukan atau belum bisa dimuat.
    </p>

    <template v-else>
      <p
        v-if="amalan.keterangan"
        class="px-4 text-xs text-[var(--text-secondary)] leading-relaxed whitespace-pre-line"
      >
        {{ amalan.keterangan }}
      </p>
      <section
        v-for="(b, i) in amalan.bagian || []"
        :key="i"
        class="px-4 py-5 border-b border-slate-100 dark:border-slate-800"
      >
        <div v-if="b.judul || b.ulang" class="flex items-center justify-between gap-2 mb-3">
          <p class="text-xs font-black text-teal-700 dark:text-teal-300">{{ b.judul }}</p>
          <span
            v-if="b.ulang"
            class="shrink-0 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
            >{{ b.ulang }}×</span
          >
        </div>
        <p
          class="font-arabic text-right text-[var(--text-primary)] whitespace-pre-line"
          dir="rtl"
          lang="ar"
          :style="{ fontSize: ukuran + 'px', lineHeight: 2 }"
        >
          {{ b.arab }}
        </p>
        <p
          v-if="tampil.latin && b.latin"
          class="mt-3 text-sm italic text-teal-800 dark:text-teal-200 leading-relaxed whitespace-pre-line"
        >
          {{ b.latin }}
        </p>
        <p
          v-if="tampil.arti && b.arti"
          class="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line"
        >
          {{ b.arti }}
        </p>
      </section>
    </template>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDataTamu } from '@/composables/useDataTamu'
import { ambilAmalan } from '@/services/amalan'
import { ukuranArab } from '@/utils/amalan'
import { useModeBaca } from '@/composables/useModeBaca'

const KUNCI_SETELAN = 'ammu_baca_amalan'
const SAKELAR = [
  { kunci: 'latin', label: 'Latin' },
  { kunci: 'arti', label: 'Arti' }
]

const route = useRoute()
const { aktif, kontrol, ketuk, alihkan: alihkanLayar } = useModeBaca()
const id = String(route.params.id || '')
const { data, loading } = useDataTamu(`amalan_${id}`, () => ambilAmalan(id), {
  umurMs: 24 * 60 * 60 * 1000
})
const amalan = computed(() => data.value || null)

// Setelan baca (ukuran huruf, Latin, Arti) diingat di HP untuk semua bacaan.
let awal = {}
try {
  awal = JSON.parse(localStorage.getItem(KUNCI_SETELAN) || '{}') || {}
} catch {
  awal = {}
}
const ukuran = ref(Number(awal.ukuran) || 28)
const tampil = reactive({ latin: awal.latin !== false, arti: awal.arti !== false })
function simpan() {
  try {
    localStorage.setItem(KUNCI_SETELAN, JSON.stringify({ ukuran: ukuran.value, ...tampil }))
  } catch {
    /* noop */
  }
}
function ubahUkuran(arah) {
  ukuran.value = ukuranArab(ukuran.value, arah)
  simpan()
}
function alihkan(k) {
  tampil[k] = !tampil[k]
  simpan()
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
  padding-bottom: calc(env(safe-area-inset-bottom) + 1.5rem);
}
.baca-penuh > * {
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
}
.baca-penuh .kepala-baca {
  padding-top: calc(env(safe-area-inset-top) + 0.5rem);
}
</style>
