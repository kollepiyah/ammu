// useRibbonPrefs — preferensi shell Ribbon (kepadatan pita classic/simple).
// Tema gelap/terang TIDAK di sini (pakai useUiStore — satu sumber kebenaran app).
// Warna aksen ikut settings.themeColor (--theme-color), bukan disimpan di sini.
import { ref, watch } from 'vue'

const KEY = 'ammu_ribbon_density'

function _initialDensity() {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'simple' || v === 'classic') return v
  } catch (e) {
    /* ignore */
  }
  return 'classic'
}

// Singleton — dibagi semua pemakai.
const density = ref(_initialDensity())

watch(density, (v) => {
  try {
    localStorage.setItem(KEY, v)
  } catch (e) {
    /* ignore */
  }
})

function toggleDensity() {
  density.value = density.value === 'simple' ? 'classic' : 'simple'
}
function setDensity(v) {
  if (v === 'simple' || v === 'classic') density.value = v
}

export function useRibbonPrefs() {
  return { density, toggleDensity, setDensity }
}
