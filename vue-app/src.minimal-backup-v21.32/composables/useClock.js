// useClock — reactive clock dengan tick interval, format Hijri + Masehi
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { formatHijri, formatMasehi, formatHari, getKalibrasi } from '@/utils/hijri'

export function useClock(intervalMs = 1000) {
  const now = ref(new Date())
  let timer = null

  const settings = useSettingsStore()
  const kalibrasi = computed(() => getKalibrasi(settings.settings))

  const jam = computed(() => String(now.value.getHours()).padStart(2, '0'))
  const menit = computed(() => String(now.value.getMinutes()).padStart(2, '0'))
  const detik = computed(() => String(now.value.getSeconds()).padStart(2, '0'))
  const hari = computed(() => formatHari(now.value))
  const hijri = computed(() => formatHijri(now.value, kalibrasi.value))
  const masehi = computed(() => formatMasehi(now.value))

  function tick() {
    now.value = new Date()
  }

  onMounted(() => {
    tick()
    timer = setInterval(tick, intervalMs)
  })

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  })

  return { now, jam, menit, detik, hari, hijri, masehi }
}
