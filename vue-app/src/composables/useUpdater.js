// useUpdater — cek pembaruan IN-APP (Electron autoUpdater), tanpa buka web.
// Alur: check -> ada? konfirm Unduh -> selesai unduh? konfirm Pasang. Tak ada? toast "terbaru".
import { useUiStore } from '@/stores/ui'

let _wired = false

function getApi() {
  try {
    return window.electronAPI || null
  } catch (e) {
    return null
  }
}

export function useUpdater() {
  const ui = useUiStore()
  const api = getApi()

  function wire() {
    if (_wired || !api?.onUpdateStatus) return
    _wired = true
    api.onUpdateStatus(async (s) => {
      if (!s) return
      if (s.status === 'available') {
        const ok = await ui.confirm({
          title: 'Pembaruan tersedia',
          message: `Versi ${s.version || 'baru'} tersedia. Unduh sekarang?`,
          confirmText: 'Unduh',
          cancelText: 'Nanti',
          danger: false
        })
        if (ok) {
          ui.toast.info('Mengunduh pembaruan…')
          try {
            api.downloadUpdate?.()
          } catch (e) {
            /* ignore */
          }
        }
      } else if (s.status === 'none') {
        ui.toast.success('Aplikasi sudah versi terbaru')
      } else if (s.status === 'downloaded') {
        const ok = await ui.confirm({
          title: 'Pembaruan siap',
          message: `Versi ${s.version || ''} siap dipasang. Pasang & mulai ulang sekarang?`,
          confirmText: 'Pasang Sekarang',
          cancelText: 'Nanti',
          danger: false
        })
        if (ok) {
          try {
            api.installUpdate?.()
          } catch (e) {
            /* ignore */
          }
        }
      } else if (s.status === 'error') {
        ui.toast.error('Gagal memeriksa pembaruan')
      }
    })
  }

  function check() {
    if (!api?.checkUpdate) {
      ui.toast.info('Cek pembaruan hanya tersedia di aplikasi desktop')
      return
    }
    ui.toast.info('Memeriksa pembaruan…')
    try {
      api.checkUpdate()
    } catch (e) {
      ui.toast.error('Gagal memeriksa pembaruan')
    }
  }

  return { wire, check }
}
