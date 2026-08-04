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
//
// v.1.2.6 — BUG "tombol aksi kadang tidak muncul di Electron".
//   pageActions/pageSave itu SINGLETON, dan tiap view mengosongkannya di onUnmounted.
//   Masalahnya `onUnmounted` Vue dijalankan di POST-render queue, sementara `setup`
//   halaman baru berjalan LEBIH DULU (sinkron). Jadi saat pindah halaman urutannya:
//     unmount(A) dijadwalkan → setup(B) mendaftarkan aksinya → onUnmounted(A) JALAN
//     → pageActions dikosongkan → tombol halaman B lenyap.
//   Terbukti lewat probe: sesudah A→B nilainya `[]`, dan baru muncul kalau ada
//   dependensi reaktif di dalam closure yang berubah SESUDAH mount (store baru
//   hidrasi, flag loading, dsb) — itulah "kadang"-nya. Halaman pertama yang dibuka
//   selalu aman (tak ada yang unmount), pindah antar-halaman yang keduanya punya
//   aksi (Buku Induk ↔ Tabungan ↔ Uang Pos ↔ Tagihan) yang kena.
//   Penawarnya: tanda pemilik (`owner`) — hanya pendaftar TERAKHIR yang boleh
//   mengosongkan singleton, jadi unmount halaman lama tak menimpa halaman baru.
import { ref, watchEffect, onUnmounted } from 'vue'
import { useDesktopShell } from './useDesktopShell'

// singleton — dibaca RibbonBar
const pageActions = ref([])
// Penanda pendaftar terakhir. Naik tiap definePageActions/definePageSave dipanggil.
let ownerActions = 0
let ownerSave = 0
// singleton — handler "Simpan" halaman aktif (T13). null = halaman tak punya aksi simpan
// -> tombol Simpan di title bar (QAT) di-disable.
const pageSave = ref(null)

export function useRibbonContext() {
  return { pageActions, pageSave }
}

// Daftarkan handler "Simpan" untuk halaman aktif (T13). No-op di non-Electron.
// Pemakaian di view (script setup):
//   import { definePageSave } from '@/composables/useRibbonContext'
//   definePageSave(() => simpanForm())   // atau null saat tak relevan
export function definePageSave(fn) {
  const { isElectron } = useDesktopShell()
  if (!isElectron.value) return
  const me = ++ownerSave
  pageSave.value = typeof fn === 'function' ? fn : null
  onUnmounted(() => {
    if (ownerSave === me) pageSave.value = null
  })
}

// Daftarkan aksi halaman (reaktif). No-op di non-Electron (web/HP pakai header in-page biasa).
export function definePageActions(getActions) {
  const { isElectron } = useDesktopShell()
  if (!isElectron.value) return
  const me = ++ownerActions
  const stop = watchEffect(() => {
    // Efek halaman lama yang belum sempat berhenti tak boleh menimpa halaman baru.
    if (ownerActions !== me) return
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
    // Hanya pemilik terakhir yang mengosongkan. Kalau halaman lain sudah mendaftar
    // (kasus normal saat pindah halaman), biarkan punya dia.
    if (ownerActions === me) pageActions.value = []
  })
}
