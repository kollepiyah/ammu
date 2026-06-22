// v.91.0626: Pull-to-refresh untuk mobile shell (PWA/Capacitor).
// Aktif HANYA saat scroll container di posisi TOP lalu ditarik ke bawah.
// onRefresh = async fn. Mengembalikan { distance, refreshing, ready } untuk indikator.
import { ref, onMounted, onBeforeUnmount } from 'vue'

export function usePullToRefresh(getEl, onRefresh, opts = {}) {
  const threshold = opts.threshold ?? 64
  const maxPull = opts.maxPull ?? 96
  const resist = opts.resist ?? 0.5
  const enabled = opts.enabled ?? (() => true)

  const distance = ref(0)
  const refreshing = ref(false)
  const ready = ref(false)

  let startY = 0
  let tracking = false

  function el() {
    const e = typeof getEl === 'function' ? getEl() : getEl
    return e && e.value !== undefined ? e.value : e
  }

  function reset() {
    distance.value = 0
    ready.value = false
  }

  function onStart(e) {
    if (!enabled() || refreshing.value) return
    const node = el()
    if (!node || node.scrollTop > 0) return
    if (!e.touches || e.touches.length !== 1) return
    startY = e.touches[0].clientY
    tracking = true
  }

  function onMove(e) {
    if (!tracking) return
    const node = el()
    if (!node || node.scrollTop > 0) { tracking = false; reset(); return }
    const dy = e.touches[0].clientY - startY
    if (dy <= 0) { reset(); return }
    const d = Math.min(maxPull, dy * resist)
    distance.value = d
    ready.value = d >= threshold
    // Tahan native overscroll/bounce hanya saat benar2 menarik ke bawah dari atas
    if (d > 2 && e.cancelable) e.preventDefault()
  }

  async function onEnd() {
    if (!tracking) return
    tracking = false
    if (distance.value >= threshold && enabled() && !refreshing.value) {
      refreshing.value = true
      distance.value = threshold
      try {
        await onRefresh()
      } catch (err) {
        // ignore — refresh best-effort
      }
      // min tampil supaya tidak berkedip
      await new Promise((r) => setTimeout(r, 500))
      refreshing.value = false
    }
    reset()
  }

  function bind() {
    const node = el()
    if (!node) return
    node.addEventListener('touchstart', onStart, { passive: true })
    node.addEventListener('touchmove', onMove, { passive: false })
    node.addEventListener('touchend', onEnd, { passive: true })
    node.addEventListener('touchcancel', onEnd, { passive: true })
  }
  function unbind() {
    const node = el()
    if (!node) return
    node.removeEventListener('touchstart', onStart)
    node.removeEventListener('touchmove', onMove)
    node.removeEventListener('touchend', onEnd)
    node.removeEventListener('touchcancel', onEnd)
  }

  onMounted(bind)
  onBeforeUnmount(unbind)

  return { distance, refreshing, ready }
}
