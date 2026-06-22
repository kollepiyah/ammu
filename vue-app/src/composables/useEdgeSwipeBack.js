// v.91.0626: Gesture "back" universal (PWA/Capacitor/iOS/Android) — swipe dari TEPI KIRI ke kanan.
// Platform-agnostic (tak bergantung native), supaya semua halaman bisa back di mobile.
// router.back() hanya kalau ada history. Abaikan kalau ada overlay/dialog terbuka.
import { onMounted, onBeforeUnmount } from 'vue'

export function useEdgeSwipeBack(router, enabled = () => true, opts = {}) {
  const edge = opts.edge ?? 28 // px dari tepi kiri sebagai zona mulai
  const minDX = opts.minDX ?? 72 // jarak horizontal minimal
  const maxDuration = opts.maxDuration ?? 600 // ms

  let startX = 0
  let startY = 0
  let t0 = 0
  let tracking = false

  function blockedByOverlay() {
    // Jangan back kalau ada overlay full-screen / dialog terbuka (biar back nutup itu dulu via handler lain)
    try {
      return !!document.querySelector(
        '[data-global-search] .fixed.inset-0, .modal-overlay, .confirm-dialog-overlay'
      )
    } catch {
      return false
    }
  }

  function onStart(e) {
    if (!enabled()) { tracking = false; return }
    const t = e.touches && e.touches[0]
    if (!t) return
    if (t.clientX > edge) { tracking = false; return } // harus mulai dari tepi kiri
    startX = t.clientX
    startY = t.clientY
    t0 = Date.now()
    tracking = true
  }

  function onEnd(e) {
    if (!tracking) return
    tracking = false
    const t = e.changedTouches && e.changedTouches[0]
    if (!t) return
    const dx = t.clientX - startX
    const dy = t.clientY - startY
    const dt = Date.now() - t0
    // swipe ke kanan, dominan horizontal, cukup cepat
    if (dx >= minDX && Math.abs(dx) > Math.abs(dy) * 2 && dt <= maxDuration) {
      if (blockedByOverlay()) return
      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back()
      }
    }
  }

  onMounted(() => {
    document.addEventListener('touchstart', onStart, { passive: true })
    document.addEventListener('touchend', onEnd, { passive: true })
  })
  onBeforeUnmount(() => {
    document.removeEventListener('touchstart', onStart)
    document.removeEventListener('touchend', onEnd)
  })
}
