// v.21.115.0528 — useFormValidation: simple validation helper untuk inline error display.
//
// Usage:
//   const { errors, validate, clearError, hasError } = useFormValidation({
//     nama: [v => !!v || 'Nama wajib diisi', v => v.length >= 3 || 'Min 3 karakter'],
//     wa: [v => /^[0-9+]/.test(v) || 'WA tidak valid']
//   })
//
//   onSubmit:
//     if (!validate(formData.value)) return
//
//   template:
//     <p v-if="errors.nama" class="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
//       <i class="fas fa-exclamation-circle"></i>{{ errors.nama }}
//     </p>

import { ref } from 'vue'

export function useFormValidation(rules) {
  const errors = ref({})

  function validate(values) {
    const newErrors = {}
    let ok = true
    for (const field in rules) {
      const fieldRules = rules[field] || []
      const val = values?.[field]
      for (const rule of fieldRules) {
        const result = rule(val, values)
        if (result !== true) {
          newErrors[field] = result || 'Field tidak valid'
          ok = false
          break // first error per field
        }
      }
    }
    errors.value = newErrors
    return ok
  }

  function clearError(field) {
    if (errors.value[field]) {
      const next = { ...errors.value }
      delete next[field]
      errors.value = next
    }
  }

  function hasError(field) {
    return !!errors.value[field]
  }

  function resetErrors() {
    errors.value = {}
  }

  return { errors, validate, clearError, hasError, resetErrors }
}

// Common validators
export const required = (msg = 'Field wajib diisi') => (v) => (v !== null && v !== undefined && String(v).trim() !== '') || msg
export const minLength = (n, msg) => (v) => String(v || '').length >= n || msg || `Minimal ${n} karakter`
export const maxLength = (n, msg) => (v) => String(v || '').length <= n || msg || `Maksimal ${n} karakter`
export const numeric = (msg = 'Hanya angka') => (v) => /^[0-9]+$/.test(String(v || '')) || msg
export const phone = (msg = 'Nomor tidak valid') => (v) => {
  const s = String(v || '').replace(/[^0-9]/g, '')
  return (s.length >= 9 && s.length <= 15) || msg
}
export const email = (msg = 'Email tidak valid') => (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v)) || msg
