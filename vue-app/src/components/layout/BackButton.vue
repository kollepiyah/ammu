<template>
  <!-- v.21.115.0528: BackButton — consistent navigation back button.
       Props:
         - to: target route (default '..' history.back)
         - label: optional override label
  -->
  <button
    type="button"
    @click="onClick"
    aria-label="Kembali"
    class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-[var(--text-primary)] text-xs font-bold transition cursor-pointer"
  >
    <i class="fas fa-arrow-left"></i>{{ label }}
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  to: { type: [String, Object], default: '' },
  label: { type: String, default: 'Kembali' }
})

const router = useRouter()

function onClick() {
  if (props.to) {
    router.push(props.to)
  } else if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/dashboard')
  }
}
</script>
