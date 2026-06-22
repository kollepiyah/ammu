// v.71.0526 — useHaptic
//
// Haptic feedback wrapper untuk Capacitor native (Android/iOS).
// Safe untuk web — kalau plugin tidak tersedia, no-op silent.
//
// Usage:
//   import { hapticLight, hapticMedium, hapticHeavy, hapticSuccess, hapticError } from '@/composables/useHaptic'
//
//   <button @click="onSave">
//   async function onSave() {
//     await doSave()
//     await hapticSuccess()
//   }

const NOOP = () => Promise.resolve()

async function trigger(style) {
  try {
    if (!window.Capacitor?.isNativePlatform?.()) return
    const { Haptics, ImpactStyle, NotificationType } = await import('@capacitor/haptics')
    if (style === 'success' || style === 'warning' || style === 'error') {
      await Haptics.notification({ type: NotificationType[style.charAt(0).toUpperCase() + style.slice(1)] })
    } else {
      await Haptics.impact({ style: ImpactStyle[style.charAt(0).toUpperCase() + style.slice(1)] })
    }
  } catch {
    /* silent — plugin tidak tersedia atau web mode */
  }
}

export const hapticLight = () => trigger('Light')
export const hapticMedium = () => trigger('Medium')
export const hapticHeavy = () => trigger('Heavy')
export const hapticSuccess = () => trigger('success')
export const hapticWarning = () => trigger('warning')
export const hapticError = () => trigger('error')

// v-haptic directive — auto-trigger light haptic saat element diklik.
// Usage: <button v-haptic="'medium'">Save</button>
export const vHaptic = {
  mounted(el, binding) {
    const style = binding.value || 'light'
    el._hapticHandler = () => {
      switch (style) {
        case 'light': return hapticLight()
        case 'medium': return hapticMedium()
        case 'heavy': return hapticHeavy()
        case 'success': return hapticSuccess()
        case 'warning': return hapticWarning()
        case 'error': return hapticError()
        default: return hapticLight()
      }
    }
    el.addEventListener('click', el._hapticHandler, { passive: true })
  },
  unmounted(el) {
    if (el._hapticHandler) {
      el.removeEventListener('click', el._hapticHandler)
    }
  }
}

export default {
  hapticLight,
  hapticMedium,
  hapticHeavy,
  hapticSuccess,
  hapticWarning,
  hapticError,
  vHaptic
}
