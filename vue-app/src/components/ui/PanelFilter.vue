<template>
  <!-- Kyai 25 Nov 2026: deretan penyaring memenuhi layar HP. Di HP penyaring dilipat di balik
       tombol (lencana = jumlah penyaring aktif); di layar lebar tetap terbuka seperti dulu.
       Dipasang DI DALAM kartu milik halaman, jadi isi lain (sub-tab dll.) tetap tampil. -->
  <div>
    <div class="flex gap-2">
      <div class="relative flex-1 min-w-0"><slot name="cari"></slot></div>
      <button
        v-if="$slots.default"
        type="button"
        class="md:hidden relative shrink-0 w-11 rounded-xl border transition cursor-pointer"
        :class="
          terbuka || jumlahAktif
            ? 'border-teal-500 text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30'
            : 'border-[var(--border-default)] text-[var(--text-secondary)]'
        "
        :aria-label="terbuka ? 'Tutup penyaring' : 'Buka penyaring'"
        :aria-expanded="terbuka"
        @click="terbuka = !terbuka"
      >
        <i class="fas fa-sliders"></i>
        <span
          v-if="jumlahAktif"
          class="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-teal-600 text-white text-[10px] font-black flex items-center justify-center"
          >{{ jumlahAktif }}</span
        >
      </button>
    </div>
    <div v-if="$slots.default" class="panel-filter" :class="terbuka ? 'block' : 'hidden md:block'">
      <slot></slot>
      <div v-if="jumlahAktif" class="md:hidden flex justify-end mt-2">
        <button
          type="button"
          class="text-xs font-bold text-rose-600 dark:text-rose-300 px-2 py-1 cursor-pointer"
          @click="$emit('reset')"
        >
          <i class="fas fa-rotate-left mr-1"></i>Hapus penyaring
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  // Banyaknya penyaring yang tidak bernilai bawaan (tanpa kotak cari).
  jumlahAktif: { type: Number, default: 0 }
})
defineEmits(['reset'])
const terbuka = ref(false)
</script>

<style>
/* Di HP penyaring berjejer dua kolom: huruf & ruang tepi dirapatkan supaya label tak terpotong. */
@media (max-width: 767px) {
  .panel-filter select {
    font-size: 12px;
    padding-left: 0.65rem;
    padding-right: 1.75rem;
  }
}
</style>
