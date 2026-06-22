<template>
  <div class="relative">
    <!-- Trigger button -->
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="w-full px-3 py-2.5 text-sm rounded-xl border-2 border-teal-300 bg-teal-50 text-left flex items-center justify-between transition hover:bg-teal-100"
    >
      <span class="text-slate-700 truncate">{{ summary }}</span>
      <i :class="['fas text-teal-600 text-xs', isOpen ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
    </button>

    <!-- Dropdown panel -->
    <div
      v-if="isOpen"
      class="absolute z-20 mt-1 w-full bg-white dark:bg-slate-800 border-2 border-teal-300 rounded-xl shadow-lg max-h-72 overflow-hidden flex flex-col"
    >
      <!-- Search -->
      <div class="p-2 border-b border-slate-200">
        <input
          v-model="search"
          type="text"
          placeholder="🔍 Cari nama guru..."
          class="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none"
        />
      </div>
      <!-- List -->
      <div class="flex-1 overflow-y-auto p-2 space-y-1.5">
        <p v-if="filteredGurus.length === 0" class="text-xs text-slate-400 italic text-center py-3">
          {{ search ? 'Tidak ada cocok' : 'Pilih lembaga dulu' }}
        </p>
        <div
          v-for="g in filteredGurus"
          :key="g.nama"
          class="bg-white border border-teal-100 rounded-lg p-2 hover:bg-teal-50"
        >
          <div class="flex items-start justify-between gap-2">
            <label class="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
              <input
                type="checkbox"
                :checked="isSelected(g.nama)"
                @change="onToggle(g.nama, $event.target.checked)"
                class="w-4 h-4 accent-teal-600"
              />
              <span class="text-sm font-bold text-slate-700 truncate">{{ g.nama }}</span>
            </label>
            <div v-if="isSelected(g.nama)" class="flex gap-1 flex-shrink-0">
              <button
                v-for="s in shiftOptions"
                :key="s.value"
                type="button"
                @click="setShift(g.nama, s.value)"
                :class="[
                  'text-[10px] font-bold px-2 py-1 rounded border-2 transition',
                  getShift(g.nama) === s.value
                    ? s.activeClass
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                ]"
              >
                {{ s.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Footer -->
      <div class="p-2 border-t border-slate-200 bg-slate-50">
        <button
          type="button"
          @click="isOpen = false"
          class="w-full text-xs font-bold text-teal-700 hover:text-teal-800"
        >
          Selesai
        </button>
      </div>
    </div>

    <p class="text-[10px] text-slate-500 mt-1">
      <i class="fas fa-info-circle mr-1"></i>Max 2 guru. Klik guru → pilih shift Pagi / Sore /
      Pagi+Sore.
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  guruPagi: { type: String, default: '' },
  guruSore: { type: String, default: '' },
  guruList: { type: Array, default: () => [] } // [{ nama, jk, ... }]
})
const emit = defineEmits(['update:guruPagi', 'update:guruSore'])

const toast = useToast()
const isOpen = ref(false)
const search = ref('')

const shiftOptions = [
  { value: 'pagi', label: 'Pagi', activeClass: 'bg-amber-100 text-amber-800 border-amber-400' },
  { value: 'sore', label: 'Sore', activeClass: 'bg-purple-100 text-purple-800 border-purple-400' },
  { value: 'pagi_sore', label: 'P+S', activeClass: 'bg-teal-100 text-teal-800 border-teal-400' }
]

// Filter list by search
const filteredGurus = computed(() => {
  const kw = search.value.trim().toLowerCase()
  if (!kw) return props.guruList
  return props.guruList.filter((g) =>
    String(g.nama || '')
      .toLowerCase()
      .includes(kw)
  )
})

// Computed: dari guru_pagi + guru_sore di parent, build selectedShift map
function isSelected(nama) {
  return props.guruPagi === nama || props.guruSore === nama
}
function getShift(nama) {
  const p = props.guruPagi === nama
  const s = props.guruSore === nama
  if (p && s) return 'pagi_sore'
  if (p) return 'pagi'
  if (s) return 'sore'
  return ''
}

const summary = computed(() => {
  const selected = []
  if (props.guruPagi) {
    const lbl = props.guruPagi === props.guruSore ? '(P+S)' : '(Pagi)'
    selected.push(`${props.guruPagi} ${lbl}`)
  }
  if (props.guruSore && props.guruSore !== props.guruPagi) {
    selected.push(`${props.guruSore} (Sore)`)
  }
  if (selected.length === 0) return 'Pilih guru pengajar...'
  return selected.join(' · ')
})

function onToggle(nama, checked) {
  if (!checked) {
    // Uncheck: remove dari pagi/sore
    if (props.guruPagi === nama) emit('update:guruPagi', '')
    if (props.guruSore === nama) emit('update:guruSore', '')
    return
  }
  // Check: limit 2 guru
  const totalSelected =
    (props.guruPagi ? 1 : 0) + (props.guruSore && props.guruSore !== props.guruPagi ? 1 : 0)
  if (totalSelected >= 2) {
    toast.warning('Maksimal 2 guru. Uncheck satu dulu.')
    return
  }
  // Auto-pick shift: kalau slot pagi kosong → pagi, kalau sore kosong → sore
  if (!props.guruPagi) {
    emit('update:guruPagi', nama)
  } else if (!props.guruSore) {
    emit('update:guruSore', nama)
  }
}

function setShift(nama, shift) {
  // Hitung slot bukan-nama
  const otherPagi = props.guruPagi !== nama ? props.guruPagi : ''
  const otherSore = props.guruSore !== nama ? props.guruSore : ''
  if (shift === 'pagi') {
    if (otherPagi) {
      toast.warning('Slot Pagi sudah dipakai guru lain.')
      return
    }
    emit('update:guruPagi', nama)
    if (props.guruSore === nama) emit('update:guruSore', '')
  } else if (shift === 'sore') {
    if (otherSore) {
      toast.warning('Slot Sore sudah dipakai guru lain.')
      return
    }
    emit('update:guruSore', nama)
    if (props.guruPagi === nama) emit('update:guruPagi', '')
  } else if (shift === 'pagi_sore') {
    if (otherPagi || otherSore) {
      toast.warning('"Pagi+Sore" hanya kalau tidak ada guru lain.')
      return
    }
    emit('update:guruPagi', nama)
    emit('update:guruSore', nama)
  }
}
</script>
