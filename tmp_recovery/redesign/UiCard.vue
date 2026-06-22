<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  padded: { type: Boolean, default: true },
  elevated: { type: Boolean, default: false }
})
</script>

<template>
  <div
    class="rounded-[var(--radius-lg)] bg-[var(--bg-card)] border border-[var(--border-subtle)] transition-shadow duration-150"
    :class="[
      padded ? 'p-4' : '',
      elevated ? 'shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]' : 'shadow-[var(--shadow-sm)]'
    ]"
  >
    <div
      v-if="title || subtitle || $slots.header"
      class="mb-3"
    >
      <slot name="header">
        <h2
          v-if="title"
          class="text-base font-bold text-[var(--text-primary)] leading-tight"
        >
          {{ title }}
        </h2>
        <p
          v-if="subtitle"
          class="text-sm text-[var(--text-secondary)] mt-0.5"
        >
          {{ subtitle }}
        </p>
      </slot>
    </div>
    <slot />
    <div
      v-if="$slots.footer"
      class="mt-4 pt-3 border-t border-[var(--border-subtle)]"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
