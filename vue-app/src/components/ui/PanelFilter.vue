<template>
  <!-- Kyai 25 Nov 2026: deretan penyaring memenuhi layar HP. Di HP penyaring dilipat di balik
       tombol (lencana = jumlah penyaring aktif); di layar lebar tetap terbuka seperti dulu.
       Dipasang DI DALAM kartu milik halaman, jadi isi lain (sub-tab dll.) tetap tampil. -->
  <div>
    <div class="flex gap-2">
      <div class="relative flex-1 min-w-0"><slot name="cari"></slot></div>
      <button
        v-if="$slots.default && lipat"
        type="button"
        class="relative shrink-0 w-11 rounded-xl border transition cursor-pointer"
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
    <div v-if="$slots.default" class="panel-filter" :class="!lipat || terbuka ? 'block' : 'hidden'">
      <slot></slot>
      <div v-if="lipat && jumlahAktif" class="flex justify-end mt-2">
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
import { computed, ref } from 'vue'
import { useMobileShell } from '@/composables/useMobileShell'

defineProps({
  // Banyaknya penyaring yang tidak bernilai bawaan (tanpa kotak cari).
  jumlahAktif: { type: Number, default: 0 }
})
defineEmits(['reset'])
const { isMobile, isCompactLandscape } = useMobileShell()
// Di HP portrait DAN HP landscape, deretan penyaring tetap dilipat di balik tombol supaya tak
// menghabiskan tinggi layar; di tablet/desktop tetap terbuka.
const lipat = computed(() => isMobile.value || isCompactLandscape.value)
const terbuka = ref(false)
</script>

<style>
/* Di HP penyaring berjejer dua kolom: huruf & ruang tepi dirapatkan supaya label tak terpotong. */
@media (max-width: 767px), (max-height: 540px) and (max-width: 1024px) {
  .panel-filter select {
    font-size: 12px;
    padding-left: 0.65rem;
    padding-right: 1.75rem;
  }
}
</style>
