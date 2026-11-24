// Sinkron tanggal Hijriah ke widget Android dari App.vue — dulu menempel di kartu jam
// dashboard, sehingga widget berhenti diperbarui begitu kartu itu dihapus (F1, 25 Nov 2026)
// atau bila pengguna tak pernah login.
import { watch, onMounted, onUnmounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { formatHijri, getKalibrasi } from '@/utils/hijri'
import { pushWidgetData, isNativeAndroid } from '@/composables/useWidgetSync'

function kunciHari(d) {
  return (
    d.getFullYear() +
    '-' +
    String(d.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(d.getDate()).padStart(2, '0')
  )
}

export function useSinkronWidgetHijri() {
  if (!isNativeAndroid()) return
  const settings = useSettingsStore()
  let terakhir = ''
  let timer = null

  function sinkron() {
    const now = new Date()
    const kal = getKalibrasi(settings.settings) || 0
    const hijri = formatHijri(now, kal) || ''
    const jejak = hijri + '|' + kal
    if (jejak === terakhir) return // hanya kirim saat berubah (ganti hari / kalibrasi)
    terakhir = jejak
    pushWidgetData({ hijri, hijriKey: kunciHari(now), kalibrasi: String(kal) })
  }

  onMounted(() => {
    sinkron()
    timer = setInterval(sinkron, 60 * 1000)
  })
  onUnmounted(() => timer && clearInterval(timer))
  watch(() => getKalibrasi(settings.settings), sinkron)
}
