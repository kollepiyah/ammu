<template>
  <div v-if="open" class="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/50 p-4" @click.self="open = false">
    <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl w-full max-w-md p-5 border border-[var(--border-subtle)]">
      <h3 class="text-base font-black text-[var(--text-primary)] mb-1"><i class="fas fa-print text-teal-500 mr-2"></i>Pengaturan Printer</h3>
      <p class="text-xs text-[var(--text-secondary)] mb-3">Pilih printer default untuk tombol "Cetak Langsung" struk POS.</p>
      <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Printer Default</label>
      <select v-model="selected" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none">
        <option value="">(Printer default sistem)</option>
        <option v-for="p in printers" :key="p.name" :value="p.name">{{ p.name }}{{ p.isDefault ? ' — default sistem' : '' }}</option>
      </select>
      <p v-if="printers.length === 0" class="text-[11px] text-amber-600 mt-2">Tidak ada printer terdeteksi (atau bukan di aplikasi Desktop).</p>
      <div class="flex justify-end gap-2 mt-4">
        <button type="button" @click="open = false" class="px-4 py-2 text-sm font-bold rounded-xl bg-slate-200 dark:bg-slate-700 text-[var(--text-primary)]">Batal</button>
        <button type="button" @click="simpan" class="px-4 py-2 text-sm font-bold rounded-xl bg-teal-600 hover:bg-teal-700 text-white">Simpan</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { listPrinters, getDefaultPrinter, setDefaultPrinter, onOpenPrinterSettings } from '@/composables/useDesktopPrint'
import { useToast } from '@/composables/useToast'
const toast = useToast()
const open = ref(false)
const printers = ref([])
const selected = ref('')
async function show() {
  selected.value = getDefaultPrinter()
  try { printers.value = (await listPrinters()) || [] } catch (e) { printers.value = [] }
  open.value = true
}
function simpan() {
  setDefaultPrinter(selected.value)
  toast.success(selected.value ? ('Printer default: ' + selected.value) : 'Pakai printer default sistem')
  open.value = false
}
onOpenPrinterSettings(show)
</script>
