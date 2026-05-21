<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h1 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
        <i class="fas fa-list-ol text-teal-500 mr-2"></i>Kelola Field Master Data
      </h1>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Atur urutan field + tambah custom field (ACF) untuk form Santri / Guru / Lembaga.
        Field default tidak bisa dihapus, hanya bisa di-reorder.
      </p>
    </div>

    <!-- Entity tabs -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-2 border border-slate-200 dark:border-slate-700 shadow-sm flex gap-1">
      <button
        v-for="e in ENTITIES"
        :key="e.key"
        type="button"
        @click="activeEntity = e.key"
        :class="[
          'flex-1 px-3 py-2 text-sm rounded-xl font-bold transition',
          activeEntity === e.key
            ? 'bg-teal-600 text-white shadow'
            : 'text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-700'
        ]"
      >
        {{ e.label }}
        <span class="ml-1 text-[10px] opacity-70">({{ countEntityFields(e.key) }})</span>
      </button>
    </div>

    <!-- Field list with drag-drop -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide">
          <i class="fas fa-sort mr-1 text-teal-500"></i>Urutan Field
        </h3>
        <p class="text-[10px] text-slate-500 dark:text-slate-400 italic">
          Tarik & lepas untuk reorder
        </p>
      </div>

      <div class="space-y-1.5">
        <div
          v-for="(f, idx) in editFields"
          :key="f.key || f.id"
          :draggable="true"
          @dragstart="onDragStart($event, idx)"
          @dragend="onDragEnd"
          @dragover.prevent="onDragOver($event, idx)"
          @drop.prevent="onDrop($event, idx)"
          :class="[
            'flex items-center gap-2 p-2.5 rounded-xl border-2 cursor-grab active:cursor-grabbing transition',
            dragOverIdx === idx ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30' : '',
            f._isDefault
              ? 'bg-emerald-50/40 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700'
              : 'bg-purple-50/40 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700'
          ]"
        >
          <i class="fas fa-grip-vertical text-slate-400 flex-shrink-0"></i>
          <span
            :class="[
              'text-[10px] font-black px-2 py-0.5 rounded flex-shrink-0',
              f._isDefault
                ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200'
                : 'bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200'
            ]"
          >
            #{{ idx + 1 }}
          </span>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 dark:text-white truncate">
              {{ f.label || f.id }}
            </p>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              <code>{{ f.key || f.id }}</code> · {{ f.type || 'text' }}
              <span v-if="f.required" class="ml-1 text-rose-600 dark:text-rose-400 font-bold">WAJIB</span>
              <span v-if="!f._isDefault" class="ml-1 text-purple-600 dark:text-purple-400 font-bold">CUSTOM</span>
            </p>
          </div>
          <button
            v-if="!f._isDefault"
            type="button"
            @click.stop="onDeleteCustomField(idx)"
            class="flex-shrink-0 w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300 hover:bg-rose-200 transition"
            title="Hapus field custom"
          >
            <i class="fas fa-trash text-xs"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Add custom field form -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-purple-200 dark:border-purple-700 shadow-sm">
      <h3 class="text-sm font-black text-purple-700 dark:text-purple-300 uppercase tracking-wide mb-3">
        <i class="fas fa-puzzle-piece mr-1"></i>Tambah Field Custom Baru
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">ID Field (snake_case)</label>
          <input
            v-model="newField.id"
            type="text"
            placeholder="cth: nisn, alamat_rumah"
            class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <p class="text-[10px] text-slate-400 mt-0.5">Hanya huruf kecil + angka + underscore</p>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Label Display</label>
          <input
            v-model="newField.label"
            type="text"
            placeholder="cth: NISN, Alamat Rumah"
            class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Tipe</label>
          <select
            v-model="newField.type"
            class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option v-for="t in FIELD_TYPES" :key="t.value" :value="t.value">{{ t.label }}</option>
          </select>
        </div>
        <div class="flex items-end">
          <label class="flex items-center gap-2 text-sm">
            <input v-model="newField.required" type="checkbox" class="w-4 h-4 accent-purple-600" />
            <span class="text-slate-700 dark:text-slate-300 font-bold">Wajib diisi</span>
          </label>
        </div>
        <div v-if="newField.type === 'select'" class="md:col-span-2">
          <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">
            Options (pisah dengan baris baru)
          </label>
          <textarea
            v-model="newFieldOptionsText"
            rows="3"
            placeholder="Opsi 1\nOpsi 2\nOpsi 3"
            class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-purple-500 outline-none"
          ></textarea>
        </div>
      </div>
      <button
        type="button"
        @click="onAddCustomField"
        class="mt-3 w-full md:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm transition"
      >
        <i class="fas fa-plus mr-1"></i>Tambah Field Custom
      </button>
    </div>

    <!-- Action buttons -->
    <div class="flex gap-2 sticky bottom-3">
      <button
        type="button"
        @click="onReset"
        :disabled="isSaving"
        class="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-sm shadow-md transition disabled:opacity-50"
      >
        <i class="fas fa-rotate-left mr-1"></i>Reset Urutan Default
      </button>
      <button
        type="button"
        @click="onSave"
        :disabled="isSaving"
        class="flex-1 px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-md transition disabled:opacity-50"
      >
        <i class="fas fa-save mr-1"></i>{{ isSaving ? 'Menyimpan...' : 'Simpan Urutan + Custom Fields' }}
      </button>
    </div>

    <p class="text-center text-[10px] text-slate-400 pt-2">
      <i class="fas fa-circle-info mr-1"></i>Vue 3 · Phase 5.10 + 5.11
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useConfirm } from '@/composables/useConfirm'
import {
  useFieldSchema,
  DEFAULT_FIELDS,
  FIELD_TYPES,
  ENTITIES
} from '@/composables/useFieldSchema'

const confirm = useConfirm()
const {
  activeEntity,
  editFields,
  isSaving,
  moveField,
  addCustomField,
  deleteCustomField,
  saveSchema,
  resetToDefault
} = useFieldSchema()

const newField = ref({ id: '', label: '', type: 'text', required: false, options: [] })
const newFieldOptionsText = ref('')

// Drag-drop state
const dragFromIdx = ref(null)
const dragOverIdx = ref(null)

function onDragStart(e, idx) {
  dragFromIdx.value = idx
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', String(idx))
}
function onDragEnd() {
  dragFromIdx.value = null
  dragOverIdx.value = null
}
function onDragOver(e, idx) {
  e.dataTransfer.dropEffect = 'move'
  dragOverIdx.value = idx
}
function onDrop(e, toIdx) {
  const fromIdx = dragFromIdx.value
  if (fromIdx !== null && fromIdx !== toIdx) {
    moveField(fromIdx, toIdx)
  }
  dragFromIdx.value = null
  dragOverIdx.value = null
}

function onAddCustomField() {
  // Parse options jika type=select
  if (newField.value.type === 'select') {
    newField.value.options = newFieldOptionsText.value
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  const ok = addCustomField({ ...newField.value })
  if (ok) {
    newField.value = { id: '', label: '', type: 'text', required: false, options: [] }
    newFieldOptionsText.value = ''
  }
}

async function onDeleteCustomField(idx) {
  const f = editFields.value[idx]
  if (!f) return
  const ok = await confirm({
    title: 'Hapus field custom?',
    text: `Field "${f.label || f.id}" akan dihapus dari semua data santri/guru/lembaga existing. Aksi ini tidak bisa di-undo.`,
    confirmText: 'Hapus',
    danger: true
  })
  if (ok) deleteCustomField(idx)
}

async function onSave() {
  await saveSchema()
}

async function onReset() {
  const ok = await confirm({
    title: 'Reset urutan ke default?',
    text: `Urutan field ${activeEntity.value} akan kembali ke default schema. Custom fields tidak dihapus, hanya urutannya yang reset.`,
    confirmText: 'Reset',
    danger: false
  })
  if (ok) await resetToDefault()
}

function countEntityFields(entity) {
  const defaultCount = (DEFAULT_FIELDS[entity] || []).length
  // Custom count nggak bisa diakses tanpa load schema dulu — simplifies to default only
  return defaultCount
}
</script>
