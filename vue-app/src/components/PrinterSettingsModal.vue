<template>
  <div v-if="open" class="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/50 p-4" @click.self="open = false">
    <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl w-full max-w-md p-5 border border-[var(--border-subtle)]">
      <h3 class="text-base font-black text-[var(--text-primary)] mb-1"><i class="fas fa-print text-teal-500 mr-2"></i>Pengaturan Printer</h3>
      <p class="text-xs text-[var(--text-secondary)] mb-3">Pilih printer default untuk tombol "Cetak Langsung" struk POS. Daftar diambil dari printer yang terhubung ke Windows.</p>
      <div class="flex items-center justify-between mb-1">
        <label class="block text-xs font-bold text-[var(--text-secondary)] uppercase">Printer Default</label>
        <button type="button" @click="refresh" :disabled="loading" class="text-[11px] font-bold text-teal-600 hover:text-teal-700 disabled:opacity-50">
          <i :class="loading ? 'fas fa-spinner fa-spin' : 'fas fa-sync'" class="mr-1"></i>{{ loading ? 'Mendeteksi…' : 'Deteksi ulang' }}
        </button>
      </div>
      <select v-model="selected" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none">
        <option value="">(Printer default sistem)</option>
        <option v-for="p in printers" :key="p.name" :value="p.name">{{ p.name }}{{ p.isDefault ? ' — default Windows' : '' }}</option>
      </select>
      <p v-if="isDesktop && printers.length > 0" class="text-[11px] text-[var(--text-secondary)] mt-2">
        <i class="fas fa-check-circle text-emerald-500 mr-1"></i>{{ printers.length }} printer terdeteksi di Windows.
      </p>
      <p v-else-if="isDesktop && !loading" class="text-[11px] text-amber-600 mt-2">
        Tidak ada printer terdeteksi. Pastikan printer menyala &amp; terpasang di Windows, lalu klik "Deteksi ulang".
      </p>
      <p v-else-if="!isDesktop" class="text-[11px] text-amber-600 mt-2">
        Deteksi printer hanya tersedia di aplikasi Desktop (Windows). Di web/HP, struk dicetak lewat dialog browser.
      </p>
      <button
        v-if="isDesktop"
        type="button"
        @click="tesCetak"
        :disabled="testing"
        class="w-full mt-3 px-3 py-2 text-xs font-bold rounded-xl border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)] disabled:opacity-50"
      >
        <i :class="testing ? 'fas fa-spinner fa-spin' : 'fas fa-print'" class="mr-1"></i>{{ testing ? 'Mengirim…' : 'Tes Cetak' }}
      </button>
      <div class="flex justify-end gap-2 mt-4">
        <button type="button" @click="open = false" class="px-4 py-2 text-sm font-bold rounded-xl bg-slate-200 dark:bg-slate-700 text-[var(--text-primary)]">Batal</button>
        <button type="button" @click="simpan" class="px-4 py-2 text-sm font-bold rounded-xl bg-teal-600 hover:bg-teal-700 text-white">Simpan</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  listPrinters,
  getDefaultPrinter,
  setDefaultPrinter,
  onOpenPrinterSettings,
  isElectron,
  printRaw
} from '@/composables/useDesktopPrint'
import { useToast } from '@/composables/useToast'
const toast = useToast()
const open = ref(false)
const printers = ref([])
const selected = ref('')
const loading = ref(false)
const testing = ref(false)
const isDesktop = isElectron()

// v.94.0626: deteksi printer Windows (getPrintersAsync via Electron)
async function refresh() {
  loading.value = true
  try {
    printers.value = (await listPrinters()) || []
  } catch (e) {
    printers.value = []
  } finally {
    loading.value = false
  }
}

async function show() {
  selected.value = getDefaultPrinter()
  open.value = true
  await refresh()
}

function simpan() {
  setDefaultPrinter(selected.value)
  toast.success(selected.value ? 'Printer default: ' + selected.value : 'Pakai printer default sistem')
  open.value = false
}

// v.94.0626: tes cetak ke printer terpilih utk verifikasi koneksi Windows
async function tesCetak() {
  testing.value = true
  try {
    // v.95.0626: tes via ESC/P raw (jalur sama dgn struk dot-matrix)
    const ESC = '\x1B'
    const txt =
      'AMMU ONLINE - TES CETAK (ESC/P)\r\n' +
      '================================\r\n' +
      'Printer: ' + (selected.value || '(default Windows)') + '\r\n' +
      'Waktu  : ' + new Date().toLocaleString('id-ID') + '\r\n\r\n' +
      'Jika teks ini tercetak rapi, printer dot-matrix siap dipakai.\r\n'
    const raw = ESC + '@' + ESC + 'G' + ESC + '2' + ESC + 'P' + txt + '\x0C'
    const base64 = typeof btoa === 'function' ? btoa(raw) : raw
    const res = await printRaw({ base64, deviceName: selected.value || undefined })
    if (res && res.ok === false) throw new Error(res.error || 'Print gagal')
    toast.success('Tes cetak terkirim ke printer')
  } catch (e) {
    toast.error('Gagal tes cetak: ' + (e?.message || e))
  } finally {
    testing.value = false
  }
}

// Buka dari menu Electron (Printer -> Pengaturan Printer) ATAU event in-app (tombol di modal POS / pengaturan)
onOpenPrinterSettings(show)
function onWinOpen() { show() }
onMounted(() => window.addEventListener('ammu:open-printer-settings', onWinOpen))
onBeforeUnmount(() => window.removeEventListener('ammu:open-printer-settings', onWinOpen))
</script>
