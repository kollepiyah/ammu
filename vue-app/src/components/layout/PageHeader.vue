<template>
  <!-- v.21.115.0528: PageHeader reusable — consistent layout untuk semua work page.
       Slots:
         - default (left, after title): subtitle/extra info text
         - stats: stat badges (rounded-full chips), wrap di kanan
         - actions: tombol-tombol aksi (h-9 standard), wrap setelah stats
       Props:
         - icon: FA icon class (e.g. 'fa-users')
         - iconColor: tailwind text color (e.g. 'text-teal-500')
         - title: judul page
         - subtitle: opsional, alt jika slot default tidak dipakai
  -->
  <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
      <div class="flex items-baseline gap-2 flex-wrap min-w-0">
        <h1 class="text-base md:text-lg font-black text-[var(--text-primary)] whitespace-nowrap">
          <i v-if="icon" :class="['fas', icon, iconColor, 'mr-1']"></i>{{ title }}
        </h1>
        <p v-if="subtitle || $slots.default" class="text-[11px] text-[var(--text-secondary)]">
          <span v-if="subtitle">— {{ subtitle }}</span>
          <slot></slot>
        </p>
      </div>
      <!-- Kyai 25 Nov 2026: di HP deretan geser lama membuat jumlah & tombol saling tumpuk.
           Kini angka = kotak sejajar di atas, tombol aksi = ikon saja di baris bawahnya
           (gaya .ph-stat/.ph-aksi di bawah). Layar lebar tetap satu baris seperti dulu. -->
      <div
        v-if="$slots.stats || $slots.actions"
        class="flex flex-col md:flex-row md:flex-wrap md:items-center gap-2"
      >
        <div
          v-if="$slots.stats"
          class="ph-stat grid grid-flow-col auto-cols-fr gap-2 md:flex md:flex-wrap md:items-center"
        >
          <slot name="stats"></slot>
        </div>
        <div v-if="$slots.actions" class="ph-aksi flex flex-wrap items-center gap-2">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, default: '' },
  iconColor: { type: String, default: 'text-teal-500' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})
</script>

<style>
/* Tak di-scope: isinya datang lewat slot. Hanya berlaku di HP (< md). */
@media (max-width: 767px) {
  .ph-stat > * {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 0;
    border-radius: 0.75rem !important;
    padding: 0.45rem 0.25rem !important;
  }
  .ph-stat > * > span:first-child {
    font-size: 1.05rem;
    line-height: 1.35rem;
  }
  .ph-stat > * > span:not(:first-child) {
    margin-left: 0 !important;
    font-size: 10px;
    white-space: nowrap;
  }
  /* Tombol berikon -> kotak ikon saja; teksnya disembunyikan (label tetap di aria-label/title). */
  .ph-aksi > :is(button, a, label):has(> i) {
    width: 2.75rem;
    height: 2.75rem;
    padding: 0 !important;
    justify-content: center;
    gap: 0 !important;
    font-size: 0 !important;
  }
  .ph-aksi > :is(button, a, label) > i {
    font-size: 1rem;
    margin: 0 !important;
  }
}
</style>
