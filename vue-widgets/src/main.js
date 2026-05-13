import { createApp, h } from 'vue'
import PostCard from './widgets/PostCard.vue'
import JamHijri from './widgets/JamHijri.vue'
import KalenderMini from './widgets/KalenderMini.vue'
import ModalPOS from './widgets/ModalPOS.vue'
import KalenderPendidikan from './widgets/KalenderPendidikan.vue'

const REGISTRY = { PostCard, JamHijri, KalenderMini, ModalPOS, KalenderPendidikan }
const MOUNTED = new WeakMap() // element → app instance untuk unmount

/**
 * Mount widget ke selector/element.
 * @example AmmuWidgets.mount('PostCard', '#mount-post', { judul, isi, ... })
 */
function mount(widgetName, selectorOrEl, props = {}) {
  const Comp = REGISTRY[widgetName]
  if (!Comp) {
    console.warn(`[AmmuWidgets] Widget '${widgetName}' tidak ditemukan`)
    return null
  }
  const el = typeof selectorOrEl === 'string' ? document.querySelector(selectorOrEl) : selectorOrEl
  if (!el) {
    console.warn(`[AmmuWidgets] Element '${selectorOrEl}' tidak ditemukan`)
    return null
  }
  // Unmount existing kalau ada
  if (MOUNTED.has(el)) {
    try {
      MOUNTED.get(el).unmount()
    } catch (e) {}
  }
  const app = createApp({ render: () => h(Comp, props) })
  app.mount(el)
  MOUNTED.set(el, app)
  return app
}

function unmount(selectorOrEl) {
  const el = typeof selectorOrEl === 'string' ? document.querySelector(selectorOrEl) : selectorOrEl
  if (el && MOUNTED.has(el)) {
    try {
      MOUNTED.get(el).unmount()
    } catch (e) {}
    MOUNTED.delete(el)
    el.innerHTML = ''
  }
}

function register(name, component) {
  REGISTRY[name] = component
}

function listWidgets() {
  return Object.keys(REGISTRY)
}

export { mount, unmount, register, listWidgets }

// Pakai window object (utk akses dari legacy inline script)
if (typeof window !== 'undefined') {
  window.AmmuWidgets = { mount, unmount, register, listWidgets, version: '0.1.0' }
  console.log('[AmmuWidgets] ready —', Object.keys(REGISTRY).join(', '))
}

export default { mount, unmount, register, listWidgets }
