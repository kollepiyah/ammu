<template>
  <!-- v.1.5.0 (Kyai 15 Nov 2026): "klik kartu itu, tampilkan semuanya dari top 1 sampai akhir".
       Satu jendela untuk Rekap Prestasi (Ranking) dan kartu Top Santri di Laporan. -->
  <div
    class="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4"
    @click.self="$emit('close')"
  >
    <div
      class="bg-[var(--bg-card)] rounded-2xl shadow-xl border border-[var(--border-subtle)] w-full max-w-lg max-h-[85vh] flex flex-col"
    >
      <div
        class="p-4 border-b border-[var(--border-subtle)] flex items-start justify-between gap-2"
      >
        <div class="min-w-0">
          <h3 class="text-sm font-black text-[var(--text-primary)] uppercase tracking-wider">
            <i class="fas fa-list-ol text-cyan-600 mr-1"></i>{{ judul }}
          </h3>
          <p v-if="subjudul" class="text-[11px] text-[var(--text-secondary)] mt-0.5">
            {{ subjudul }}
          </p>
        </div>
        <button
          aria-label="Tutup daftar"
          class="text-[var(--text-tertiary)] hover:text-rose-600 text-lg cursor-pointer"
          @click="$emit('close')"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <ol class="overflow-y-auto p-3 space-y-1">
        <li
          v-for="(r, idx) in rows"
          :key="r.id || idx"
          :class="[
            'flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs border border-[var(--border-subtle)]',
            idx < batasTop ? 'bg-cyan-50/60 dark:bg-cyan-900/20' : 'bg-[var(--bg-card-elevated)]',
            bisaDipilih ? 'cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/20' : ''
          ]"
          @click="bisaDipilih && $emit('pilih', r)"
        >
          <span class="w-7 text-right font-black text-cyan-700 dark:text-cyan-300 flex-shrink-0"
            >{{ idx + 1 }}.</span
          >
          <span class="flex-1 min-w-0">
            <span class="block font-bold text-[var(--text-primary)] truncate">{{ r.nama }}</span>
            <span v-if="r.kelas" class="block text-[10px] text-[var(--text-secondary)] truncate">{{
              r.kelas
            }}</span>
          </span>
          <span class="font-black whitespace-nowrap text-[var(--text-primary)]">{{
            r.total || '-'
          }}</span>
        </li>
        <li v-if="!rows.length" class="text-xs text-[var(--text-tertiary)] italic text-center py-6">
          Belum ada santri yang dinilai.
        </li>
      </ol>
      <p
        v-if="catatan"
        class="px-4 py-2 border-t border-[var(--border-subtle)] text-[10px] text-[var(--text-secondary)] italic"
      >
        {{ catatan }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { BATAS_TOP_PRESTASI } from '@/utils/rekapPrestasiTabel'

defineProps({
  judul: { type: String, default: '' },
  subjudul: { type: String, default: '' },
  // [{ id, nama, kelas, total }] — sudah terurut (utils/rekapPrestasiTabel.peringkatPrestasi).
  rows: { type: Array, default: () => [] },
  catatan: { type: String, default: '' },
  bisaDipilih: { type: Boolean, default: false },
  batasTop: { type: Number, default: BATAS_TOP_PRESTASI }
})
defineEmits(['close', 'pilih'])
</script>
