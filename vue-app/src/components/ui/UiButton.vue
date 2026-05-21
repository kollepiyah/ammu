<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary, secondary, danger, ghost
  size: { type: String, default: 'md' }, // sm, md, lg
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' }
})

const variantClass = {
  primary: 'bg-teal-600 hover:bg-teal-700 text-white',
  secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200',
  danger: 'bg-rose-600 hover:bg-rose-700 text-white',
  ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
}
const sizeClass = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base'
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
    :class="[variantClass[variant], sizeClass[size]]"
  >
    <span v-if="loading" class="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
    <slot />
  </button>
</template>
