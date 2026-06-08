// useRibbonContext — "full native": aksi halaman (Cetak/Ekspor/Tambah/dll) dipindah ke grup
// kontekstual "Aksi Halaman" di ujung pita. View memanggil definePageActions() untuk mendaftarkan
// aksinya (hanya di Electron); header in-page disembunyikan view via v-if="!isElectron".
//
// Pemakaian di view (script setup):
//   import { definePageActions } from '@/composables/useRibbonContext'
//   definePageActions(() => isFullAccess.value ? [
//     { label:'Cetak PDF', icon:'printer', on: cetakPdf },
//     { label:'Tambah', icon:'plus', primary:true, on: () => router.push('/x/new') },
//   ] : [])
import { ref, watchEffect, onUnmounted } from 'vue'
import { useDesktopShell } from './useDesktopShell'

// singleton — dibaca RibbonBar
const pageActions = ref([])

export function useRibbonContext() {
  return { pageActions }
}

// Daftarkan aksi halaman (reaktif). No-op di non-Electron (web/HP pakai header in-page biasa).
export function definePageActions(getActions) {
  const { isElectron } = useDesktopShell()
  if (!isElectron.value) return
  const stop = watchEffect(() => {
    try {
      const a = typeof getActions === 'function' ? getActions() : getActions
      pageActions.value = Array.isArray(a) ? a : []
    } catch (e) {
      pageActions.value = []
    }
  })
  onUnmounted(() => {
    try {
      stop()
    } catch (e) {
      /* ignore */
    }
    pageActions.value = []
  })
}
