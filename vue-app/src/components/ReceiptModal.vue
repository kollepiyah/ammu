<!-- v.95.0626: Modal receipt VIEW-ONLY (preview HTML match desain PDF) + Download PDF.
     Tidak ada tombol cetak — hanya lihat & download. Dipakai utk bukti pembayaran santri
     (PembayaranView) & slip bisyaroh guru (BisyarohView). -->
<template>
  <div
    v-if="open"
    class="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-[var(--bg-card)] rounded-2xl shadow-xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
      <!-- header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-[var(--border-default)]">
        <h3 class="text-sm font-black flex items-center gap-2 text-[var(--text-primary)]">
          <i class="fas fa-receipt text-cyan-600"></i>{{ title }}
        </h3>
        <button
          @click="$emit('close')"
          aria-label="Tutup"
          class="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700/40 flex items-center justify-center text-[var(--text-secondary)] cursor-pointer"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- body: preview receipt (kertas putih di atas bg abu) -->
      <div class="flex-1 overflow-y-auto p-3 md:p-4 bg-slate-100 dark:bg-slate-800/50">
        <div v-if="bodyHtml" class="receipt-paper rounded-lg overflow-hidden shadow-sm" v-html="bodyHtml"></div>
        <div v-else class="py-12 text-center text-[var(--text-tertiary)]">
          <i class="fas fa-spinner fa-spin text-2xl"></i>
        </div>
      </div>

      <!-- footer: hanya tutup + download (TANPA cetak) -->
      <div class="flex items-center justify-end gap-2 px-4 py-3 border-t border-[var(--border-default)]">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-bold rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-[var(--text-primary)] cursor-pointer"
        >
          Tutup
        </button>
        <button
          @click="$emit('download')"
          :disabled="downloading"
          class="px-4 py-2 text-sm font-bold rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white flex items-center gap-2 cursor-pointer"
        >
          <i :class="downloading ? 'fas fa-spinner fa-spin' : 'fas fa-download'"></i>
          {{ downloading ? 'Menyiapkan...' : 'Download PDF' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Bukti Pembayaran' },
  bodyHtml: { type: String, default: '' },
  downloading: { type: Boolean, default: false }
})
defineEmits(['close', 'download'])
</script>
