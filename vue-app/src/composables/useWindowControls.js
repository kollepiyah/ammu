// useWindowControls — kontrol jendela frameless Electron (Min / Max / Close).
// Mengakses window.electronAPI (preload). No-op + available=false di web/Capacitor
// supaya tombol jendela bisa disembunyikan saat bukan Electron.
import { ref, onMounted, onBeforeUnmount } from 'vue'

function getAPI() {
  try {
    return window.electronAPI || null
  } catch (e) {
    return null
  }
}

export function useWindowControls() {
  const api = getAPI()
  const available = !!(api && api.minimizeWindow)
  const isMaximized = ref(false)

  async function minimize() {
    try {
      await api?.minimizeWindow?.()
    } catch (e) {
      /* ignore */
    }
  }
  async function toggleMaximize() {
    try {
      const v = await api?.toggleMaximizeWindow?.()
      if (typeof v === 'boolean') isMaximized.value = v
      else await refreshState()
    } catch (e) {
      /* ignore */
    }
  }
  async function close() {
    try {
      await api?.closeWindow?.()
    } catch (e) {
      /* ignore */
    }
  }
  async function refreshState() {
    try {
      const v = await api?.isWindowMaximized?.()
      if (typeof v === 'boolean') isMaximized.value = v
    } catch (e) {
      /* ignore */
    }
  }

  let _off = null
  onMounted(() => {
    if (!available) return
    refreshState()
    try {
      // preload mengirim event tiap window maximize/unmaximize (dari menu/sistem juga)
      if (api.onWindowMaximizeChange) {
        api.onWindowMaximizeChange((v) => {
          isMaximized.value = !!v
        })
      }
    } catch (e) {
      /* ignore */
    }
  })
  onBeforeUnmount(() => {
    if (_off) {
      try {
        _off()
      } catch (e) {
        /* ignore */
      }
    }
  })

  return { available, isMaximized, minimize, toggleMaximize, close, refreshState }
}
