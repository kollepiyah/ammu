<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' }
})
</script>

<template>
  <div
    class="rounded-xl bg-[#F0FFFF] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm p-4"
  >
    <div v-if="title || subtitle || $slots.header" class="mb-3">
      <slot name="header">
        <h2 v-if="title" class="text-base font-bold text-slate-900 dark:text-slate-100">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-sm text-slate-600 dark:text-slate-400">{{ subtitle }}</p>
      </slot>
    </div>
    <slot />
    <div v-if="$slots.footer" class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
      <slot name="footer" />
    </div>
  </div>
</template>
