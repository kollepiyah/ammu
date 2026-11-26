// v.91.0626: deteksi "mobile shell" untuk bottom nav.
// Bottom nav HANYA muncul di: Android (Capacitor native) ATAU PWA terinstal (standalone)
// DAN viewport mobile. Browser desktop / Electron -> pakai sidebar biasa.
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { forceMobileShell } from '@/utils/shellOverride'

function detectNative() {
  try {
    const C = window.Capacitor
    if (!C) return false
    if (typeof C.isNativePlatform === 'function') return C.isNativePlatform()
    return !!C.isNative
  } catch {
    return false
  }
}
const _isNative = detectNative()

export function useMobileShell() {
  const isMobile = ref(false)
  const isCompactLandscape = ref(false)
  const isStandalone = ref(false)
  function sync() {
    try {
      isMobile.value = window.matchMedia('(max-width: 767px)').matches
      // HP diputar landscape: lebar melewati 767px (800-930px), tapi tinggi tetap rendah (<= 540px).
      // isMobile sengaja tetap berbasis lebar agar tabel/kartu layar lebar tak ikut menyempit;
      // showBottomNav tetap aktif di HP landscape supaya shell native tidak pecah ke mode desktop.
      isCompactLandscape.value = window.matchMedia(
        '(max-height: 540px) and (max-width: 1024px)'
      ).matches
    } catch {
      isMobile.value = false
      isCompactLandscape.value = false
    }
    try {
      isStandalone.value =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true
    } catch {
      isStandalone.value = false
    }
  }
  // sync langsung di setup (SPA client) supaya tidak ada flash bell -> bottom nav
  sync()
  onMounted(() => {
    sync()
    window.addEventListener('resize', sync)
    window.addEventListener('orientationchange', sync)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', sync)
    window.removeEventListener('orientationchange', sync)
  })

  // (Android native ATAU PWA standalone) DAN (HP portrait ATAU HP landscape).
  // v.103: ?shell=mobile -> paksa bottom nav di lebar HP (uji UI Android di browser).
  const showBottomNav = computed(
    () =>
      (isMobile.value || isCompactLandscape.value) &&
      (forceMobileShell || _isNative || isStandalone.value)
  )
  return { isMobile, isCompactLandscape, isStandalone, isNative: _isNative, showBottomNav }
}
