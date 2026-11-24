// UI store — dark mode, toast notifications (vue-sonner), confirm dialog
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast as sonnerToast } from 'vue-sonner'
import { bacaModeTema, temaGelapAktif } from '@/utils/tema'

let _toastSeq = 0

export const useUiStore = defineStore('ui', () => {
  // v.20.74.4.0526: Sidebar — desktop ALWAYS default OPEN, mobile ALWAYS default CLOSED.
  // Kyai req: jangan auto-hide. Drop localStorage — refresh selalu reset ke default per viewport.
  // User toggle via hamburger tetap work in-session.
  function _initialSidebar() {
    return typeof window !== 'undefined' && window.innerWidth >= 768
  }
  const sidebarOpen = ref(_initialSidebar())
  function openSidebar() {
    sidebarOpen.value = true
  }
  function closeSidebar() {
    sidebarOpen.value = false
  }
  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }

  // Dark mode. F1: ditambah mode 'otomatis' (ikut sistem HP); portalMu_darkMode tetap
  // menyimpan hasil akhirnya supaya skrip awal index.html tak berkedip.
  const isDark = ref(false)
  const temaMode = ref('terang')
  let _mq = null
  function _sistemGelap() {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return false
    }
  }
  function _pasangPendengarSistem() {
    if (_mq || typeof window === 'undefined' || !window.matchMedia) return
    _mq = window.matchMedia('(prefers-color-scheme: dark)')
    _mq.addEventListener?.('change', () => {
      if (temaMode.value === 'otomatis') _terapkan(temaGelapAktif('otomatis', _sistemGelap()))
    })
  }
  function setTemaMode(mode) {
    temaMode.value = bacaModeTema(mode, null)
    try {
      localStorage.setItem('portalMu_temaMode', temaMode.value)
    } catch (e) {
      // ignore
    }
    if (temaMode.value === 'otomatis') _pasangPendengarSistem()
    _terapkan(temaGelapAktif(temaMode.value, _sistemGelap()))
  }

  // Sakelar lama (header/pita) = pilihan eksplisit terang/gelap.
  function setDark(val) {
    setTemaMode(val ? 'gelap' : 'terang')
  }

  function _terapkan(val) {
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
      // Setelah migration: respect pilihan user (mode baru, atau darkMode lama)
      const m = localStorage.getItem('portalMu_temaMode')
      const v = localStorage.getItem('portalMu_darkMode')
      if (m != null || v != null) {
        setTemaMode(bacaModeTema(m, v))
        return
      }
    } catch (e) {
      // ignore
    }
    // Fallback: default light
    setDark(false)
  }

  // Toast queue (didukung vue-sonner untuk animasi stackable & swipe-to-dismiss di HP)
  const toasts = ref([]) // tetap dipertahankan untuk kompatibilitas pembaca legacy

  function pushToast(type, msg, ttl = 3000) {
    const id = ++_toastSeq
    const text = String(msg ?? '')
    const opts = { duration: ttl }
    if (type === 'success') sonnerToast.success(text, opts)
    else if (type === 'error') sonnerToast.error(text, opts)
    else if (type === 'warning') sonnerToast.warning(text, opts)
    else sonnerToast.info(text, opts)
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

  function confirm({
    title = 'Konfirmasi',
    message = '',
    confirmText = 'Hapus',
    cancelText = 'Batal',
    danger = true
  } = {}) {
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
    temaMode,
    setTemaMode,
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
