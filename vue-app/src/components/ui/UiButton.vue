<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary, ghost, accent, danger, success
  size: { type: String, default: 'md' }, // sm, md, lg
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' }
})

const variantClass = {
  primary: 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--text-on-primary)] border border-[var(--color-primary)]',
  ghost: 'bg-transparent hover:bg-[var(--bg-hover)] text-[var(--text-primary)] border border-[var(--border-default)]',
  accent: 'bg-[var(--color-accent)] hover:bg-[var(--color-primary-hover)] text-[var(--text-on-accent)] border border-[var(--color-accent)]',
  danger: 'bg-[var(--color-danger-soft)] hover:bg-[var(--color-danger)] hover:text-white text-[var(--color-danger-text)] border border-[var(--color-danger)]',
  success: 'bg-[var(--color-success-soft)] hover:bg-[var(--color-success)] hover:text-white text-[var(--color-success-text)] border border-[var(--color-success)]'
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
    class="rounded-[var(--radius-md)] font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)]"
    :class="[variantClass[variant], sizeClass[size]]"
  >
    <span
      v-if="loading"
      class="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-[var(--radius-full)] animate-spin"
    ></span>
    <slot />
  </button>
</template>
