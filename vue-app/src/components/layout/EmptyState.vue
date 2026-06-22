<template>
  <!-- v.21.115.0528: EmptyState — consistent empty list illustration + message.
       Props:
         - icon: FA icon class (default fa-inbox)
         - title: judul utama (e.g. "Belum ada santri")
         - description: keterangan (optional)
         - actionLabel: label tombol aksi (optional, with @action emit)
         - actionIcon: icon untuk tombol aksi (optional)
  -->
  <div class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center">
    <i :class="['fas', icon, 'text-slate-300 dark:text-slate-600 text-4xl mb-3 block']"></i>
    <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">{{ title }}</p>
    <p v-if="description" class="text-xs text-[var(--text-secondary)] mt-1">{{ description }}</p>
    <button
      v-if="actionLabel"
      type="button"
      @click="$emit('action')"
      class="h-9 px-3 mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition cursor-pointer"
    >
      <i v-if="actionIcon" :class="['fas', actionIcon]"></i>{{ actionLabel }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, default: 'fa-inbox' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  actionLabel: { type: String, default: '' },
  actionIcon: { type: String, default: '' }
})
defineEmits(['action'])
</script>
