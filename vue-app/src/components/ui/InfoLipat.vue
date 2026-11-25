<template>
  <div>
    <!-- Kyai 25 Nov 2026: keterangan panjang memenuhi layar. Dilipat jadi satu baris "ⓘ";
         isinya tetap ada saat dibutuhkan. Kelas asli paragraf dipakai untuk isinya. -->
    <button
      v-if="!buka"
      type="button"
      class="info-lipat inline-flex items-center gap-1 text-[11px] font-bold text-[var(--text-tertiary)] hover:text-teal-600 cursor-pointer"
      @click="buka = true"
    >
      <i class="fas fa-circle-info"></i>Keterangan
    </button>
    <div v-else v-bind="$attrs" @click="buka = false">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ inheritAttrs: false })
const buka = ref(false)
</script>

<style scoped>
.info-lipat {
  min-height: 0;
}
</style>
