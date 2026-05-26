<template>
  <div class="relative">
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 text-left flex items-center justify-between transition hover:bg-slate-100"
    >
      <span class="text-slate-700 truncate">{{ summary }}</span>
      <i :class="['fas text-slate-500 text-xs', isOpen ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
    </button>

    <div
      v-if="isOpen"
      class="absolute z-20 mt-1 w-full bg-white dark:bg-slate-800 border-2 border-slate-300 rounded-xl shadow-lg max-h-72 overflow-hidden flex flex-col"
    >
      <div class="p-2 border-b border-slate-200">
        <input
          v-model="search"
          type="text"
          placeholder="🔍 Cari nama guru sekolah..."
          class="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-cyan-500 outline-none"
        />
      </div>
      <div class="flex-1 overflow-y-auto p-2 space-y-1">
        <p v-if="filteredGurus.length === 0" class="text-xs text-slate-400 italic text-center py-3">
          {{ search ? 'Tidak ada cocok' : 'Pilih lembaga sekolah dulu' }}
        </p>
        <label
          v-for="g in filteredGurus"
          :key="g.nama"
          class="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-blue-50 cursor-pointer"
        >
          <input
            type="checkbox"
            :checked="modelValue.includes(g.nama)"
            @change="onToggle(g.nama, $event.target.checked)"
            class="w-4 h-4 accent-cyan-600"
          />
          <span class="text-sm text-slate-700">{{ g.nama }}</span>
        </label>
      </div>
      <div class="p-2 border-t border-slate-200 bg-slate-50">
        <button
          type="button"
          @click="isOpen = false"
          class="w-full text-xs font-bold text-cyan-700 hover:text-cyan-800"
        >
          Selesai
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  modelValue: { type: Array, default: () => [] }, // array nama guru
  guruList: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:modelValue'])

const toast = useToast()
const isOpen = ref(false)
const search = ref('')

const filteredGurus = computed(() => {
  const kw = search.value.trim().toLowerCase()
  if (!kw) return props.guruList
  return props.guruList.filter((g) =>
    String(g.nama || '')
      .toLowerCase()
      .includes(kw)
  )
})

const summary = computed(() => {
  if (!props.modelValue || props.modelValue.length === 0) return 'Pilih guru sekolah...'
  return props.modelValue.join(' · ')
})

function onToggle(nama, checked) {
  const current = [...(props.modelValue || [])]
  if (checked) {
    if (current.length >= 2) {
      toast.warning('Maksimal 2 guru sekolah.')
      return
    }
    if (!current.includes(nama)) current.push(nama)
  } else {
    const idx = current.indexOf(nama)
    if (idx >= 0) current.splice(idx, 1)
  }
  emit('update:modelValue', current)
}
</script>
