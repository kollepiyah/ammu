// Sinkron latar ibadah (Android, dipasang sekali di App.vue): mendorong jadwal sholat 7 hari +
// agenda terdekat ke widget "Jadwal Sholat", dan menjadwalkan ulang notifikasi waktu sholat.
// Berjalan saat aplikasi dibuka, kembali dari latar (paling sering 10 menit sekali), dan setiap
// kali lokasi / metode / setelan notifikasi berubah. Tanpa realtime; agenda ditarik ≤ 2× sehari.
import { watch, onMounted, onUnmounted } from 'vue'
import { useIbadah } from '@/composables/useIbadah'
import { useAdzan } from '@/composables/useAdzan'
import { pushWidgetData, isNativeAndroid } from '@/composables/useWidgetSync'
import { useSettingsStore } from '@/stores/settings'
import { queryColl } from '@/services/db'
import { muatanWidgetSholat, jadwalBeberapaHari } from '@/utils/widgetSholat'
import { namaTempatPendek } from '@/utils/waktuSholat'
import { getKalibrasi } from '@/utils/hijri'

const KUNCI_AGENDA = 'ammu_widget_agenda'
const UMUR_AGENDA_MS = 12 * 60 * 60 * 1000
const JEDA_MS = 10 * 60 * 1000

/** Agenda publik untuk widget (disimpan di HP; gagal = pakai salinan terakhir). */
async function ambilAgenda() {
  let simpanan = null
  try {
    simpanan = JSON.parse(localStorage.getItem(KUNCI_AGENDA) || 'null')
  } catch {
    simpanan = null
  }
  if (simpanan && Date.now() - simpanan.waktu < UMUR_AGENDA_MS) return simpanan.isi
  try {
    const isi = await queryColl('kegiatan', [['publik', '==', true]])
    localStorage.setItem(KUNCI_AGENDA, JSON.stringify({ waktu: Date.now(), isi }))
    return isi
  } catch {
    return simpanan?.isi || []
  }
}

export function useSinkronIbadah() {
  if (!isNativeAndroid()) return
  const { lokasi, metode } = useIbadah()
  const { setelan, jadwalkanAdzan } = useAdzan()
  const settings = useSettingsStore()
  let terakhir = 0
  let jalan = null

  async function sinkron() {
    if (jalan) return jalan
    jalan = (async () => {
      terakhir = Date.now()
      const mulai = new Date()
      const agenda = await ambilAgenda()
      const muatan = muatanWidgetSholat({
        lokasi: lokasi.value,
        metode: metode.value,
        mulai,
        kalibrasi: getKalibrasi(settings.settings),
        agenda
      })
      pushWidgetData({ sholat: JSON.stringify(muatan) })
      const hari = jadwalBeberapaHari({ lokasi: lokasi.value, metode: metode.value, mulai })
      await jadwalkanAdzan(hari, namaTempatPendek(lokasi.value)).catch((e) =>
        console.warn('[sinkronIbadah] jadwal adzan gagal:', e?.message || e)
      )
    })().finally(() => (jalan = null))
    return jalan
  }

  const saatTampil = () => {
    if (!document.hidden && Date.now() - terakhir >= JEDA_MS) sinkron()
  }
  onMounted(() => {
    sinkron()
    document.addEventListener('visibilitychange', saatTampil)
  })
  onUnmounted(() => document.removeEventListener('visibilitychange', saatTampil))
  watch(
    () => [
      lokasi.value.lat,
      lokasi.value.lon,
      lokasi.value.desa,
      metode.value,
      JSON.stringify(setelan)
    ],
    () => sinkron()
  )
}
