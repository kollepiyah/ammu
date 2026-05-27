<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="block">
    <span
      v-if="label"
      class="block text-xs font-semibold mb-1 text-[var(--text-secondary)]"
    >
      {{ label }}<span
        v-if="required"
        class="text-[var(--color-danger)] ml-0.5"
      >*</span>
    </span>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full px-3 py-2 rounded-[var(--radius-md)] border bg-[var(--bg-input)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-sm transition-all duration-150 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-40 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--bg-muted)]"
      :class="error ? 'border-[var(--color-danger)]' : 'border-[var(--border-default)]'"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p
      v-if="error"
      class="mt-1 text-xs text-[var(--color-danger-text)] font-medium"
    >
      {{ error }}
    </p>
    <p
      v-else-if="hint"
      class="mt-1 text-xs text-[var(--text-tertiary)]"
    >
      {{ hint }}
    </p>
  </label>
</template>
