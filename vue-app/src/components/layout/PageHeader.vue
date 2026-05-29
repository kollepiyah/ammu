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
  <div
    class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
  >
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
      <div v-if="$slots.stats || $slots.actions" class="flex flex-wrap gap-2 items-center">
        <slot name="stats"></slot>
        <slot name="actions"></slot>
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
