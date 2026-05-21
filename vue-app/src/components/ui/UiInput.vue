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
    <span v-if="label" class="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
      {{ label }}<span v-if="required" class="text-rose-500">*</span>
    </span>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      :class="error ? 'border-rose-500' : 'border-slate-300 dark:border-slate-600'"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="mt-1 text-xs text-rose-600">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-xs text-slate-500">{{ hint }}</p>
  </label>
</template>
