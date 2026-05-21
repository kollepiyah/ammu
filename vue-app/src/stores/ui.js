// UI store — dark mode, toast notifications, confirm dialog
import { defineStore } from 'pinia'
import { ref } from 'vue'

let _toastSeq = 0

export const useUiStore = defineStore('ui', () => {
  // v.20.74.4.0526: Sidebar — desktop ALWAYS default OPEN, mobile ALWAYS default CLOSED.
  // Kyai req: jangan auto-hide. Drop localStorage — refresh selalu reset ke default per viewport.
  // User toggle via hamburger tetap work in-session.
  function _initialSidebar() {
    return (typeof window !== 'undefined' && window.innerWidth >= 768)
  }
  const sidebarOpen = ref(_initialSidebar())
  function openSidebar() { sidebarOpen.value = true }
  function closeSidebar() { sidebarOpen.value = false }
  function toggleSidebar() { sidebarOpen.value = !sidebarOpen.value }

  // Dark mode
  const isDark = ref(false)

  function setDark(val) {
    isDark.value = !!val
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark.value)
      document.body.classList.toggle('dark-mode', isDark.value)
    }
    try {
      localStorage.setItem('portalMu_darkMode', isDark.value ? '1' : '0')
    } catch (e) {
      // ignore
    }
  }

  function toggleDark() {
    setDark(!isDark.value)
  }

  function initDarkFromStorage() {
    // v.48.0526: Force LIGHT cream theme — migrate user existing yang prev set dark
    // Cek flag migration v48; kalau belum ada, RESET ke light + tandai migrated
    try {
      const migrated = localStorage.getItem('portalMu_themeMigrated_v48')
      if (!migrated) {
        // First load post v.48 — force light + clear dark setting lama
        localStorage.setItem('portalMu_darkMode', '0')
        localStorage.setItem('portalMu_themeMigrated_v48', '1')
        setDark(false)
        return
      }
      // Setelah migration: respect user toggle
      const v = localStorage.getItem('portalMu_darkMode')
      if (v != null) {
        setDark(v === '1')
        return
      }
    } catch (e) {
      // ignore
    }
    // Fallback: default light
    setDark(false)
  }

  // Toast queue
  const toasts = ref([]) // [{ id, type, msg, ttl }]

  function pushToast(type, msg, ttl = 3000) {
    const id = ++_toastSeq
    toasts.value.push({ id, type, msg, ttl })
    setTimeout(() => {
      const idx = toasts.value.findIndex((t) => t.id === id)
      if (idx >= 0) toasts.value.splice(idx, 1)
    }, ttl)
    return id
  }

  const toast = {
    info: (m, ttl) => pushToast('info', m, ttl),
    success: (m, ttl) => pushToast('success', m, ttl),
    error: (m, ttl) => pushToast('error', m, ttl ?? 5000),
    warning: (m, ttl) => pushToast('warning', m, ttl ?? 4000)
  }

  // Confirm dialog
  const confirmState = ref({
    open: false,
    title: '',
    message: '',
    confirmText: 'Hapus',
    cancelText: 'Batal',
    danger: true,
    _resolve: null
  })

  function confirm({ title = 'Konfirmasi', message = '', confirmText = 'Hapus', cancelText = 'Batal', danger = true } = {}) {
    return new Promise((resolve) => {
      confirmState.value = {
        open: true,
        title,
        message,
        confirmText,
        cancelText,
        danger,
        _resolve: resolve
      }
    })
  }

  function confirmResolve(result) {
    const r = confirmState.value._resolve
    confirmState.value.open = false
    confirmState.value._resolve = null
    if (r) r(!!result)
  }

  return {
    // sidebar
    sidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    // dark
    isDark,
    setDark,
    toggleDark,
    initDarkFromStorage,
    // toasts
    toasts,
    toast,
    // confirm
    confirmState,
    confirm,
    confirmResolve
  }
})
