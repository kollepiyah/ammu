// Setelan & penjadwal notifikasi waktu sholat (Kyai 25 Nov 2026) — HANYA Android: iPhone/PWA
// tak bisa menjadwalkan notifikasi secara andal. Rencananya disusun utils/adzan (murni + tes);
// di sini cukup simpan setelan, minta izin, dan serahkan ke @capacitor/local-notifications.
// Bunyi sementara = notifikasi bawaan HP; rekaman adzan menyusul (kanal baru, lihat KANAL).
import { reactive, ref } from 'vue'
import { rencanaAdzan, rapikanSetelanAdzan } from '@/utils/adzan'
import { isNativeAndroid } from '@/composables/useWidgetSync'

const KUNCI = 'ammu_adzan'
const KUNCI_ID = 'ammu_adzan_id' // id notifikasi yang sedang terjadwal (untuk dibatalkan)
// Suara kanal Android tak bisa diubah sesudah dibuat → rekaman adzan nanti = kanal baru.
const KANAL = 'waktu_sholat'

function plugin() {
  try {
    return window.Capacitor?.Plugins?.LocalNotifications || null
  } catch {
    return null
  }
}

function muat() {
  try {
    return JSON.parse(localStorage.getItem(KUNCI) || '{}') || {}
  } catch {
    return {}
  }
}

const awal = muat()
const setelan = reactive({
  nyala: awal.nyala === true, // mati bawaan: tak ada dialog izin tanpa diminta pengguna
  ...rapikanSetelanAdzan(awal)
})
const izinTepat = ref(null) // true/false/null (tak diketahui)

function simpan() {
  try {
    localStorage.setItem(KUNCI, JSON.stringify(setelan))
  } catch {
    /* noop */
  }
}

/** Dukungan platform (dipakai layar untuk menyembunyikan setelan di iPhone/web). */
export const adzanDidukung = () => isNativeAndroid() && !!plugin()

async function cekIzinTepat() {
  const p = plugin()
  try {
    const r = await p?.checkExactNotificationSetting?.()
    izinTepat.value = r ? r.exact_alarm === 'granted' : null
  } catch {
    izinTepat.value = null
  }
  return izinTepat.value
}

/** Buka setelan "Alarm & pengingat" (Android 12+). */
async function bukaIzinTepat() {
  try {
    await plugin()?.changeExactNotificationSetting?.()
  } catch {
    /* noop */
  }
  return cekIzinTepat()
}

let _kanalSiap = false
/**
 * Jadwalkan ulang SELURUH notifikasi dari jadwal `hari` (hasil jadwalBeberapaHari).
 * Aman dipanggil berkali-kali: yang lama dibatalkan dulu.
 */
async function jadwalkanAdzan(hari, tempat = '') {
  const p = plugin()
  if (!adzanDidukung() || !p) return
  let lama = []
  try {
    lama = JSON.parse(localStorage.getItem(KUNCI_ID) || '[]') || []
  } catch {
    lama = []
  }
  try {
    if (lama.length) await p.cancel({ notifications: lama.map((id) => ({ id })) })
  } catch {
    /* sudah lewat / tak ada */
  }
  localStorage.setItem(KUNCI_ID, '[]')
  if (!setelan.nyala) return
  const izin = await p.checkPermissions().catch(() => null)
  if (izin?.display !== 'granted') return
  if (!_kanalSiap) {
    await p
      .createChannel({
        id: KANAL,
        name: 'Waktu sholat',
        description: 'Pengingat masuknya waktu sholat',
        importance: 5,
        visibility: 1,
        vibration: true
      })
      .catch(() => {})
    _kanalSiap = true
  }
  const rencana = rencanaAdzan({ hari, setelan, sekarangMs: Date.now(), tempat })
  if (!rencana.length) return
  await p.schedule({
    notifications: rencana.map((r) => ({
      id: r.id,
      title: r.judul,
      body: r.isi,
      channelId: KANAL,
      schedule: { at: new Date(r.at), allowWhileIdle: true }
    }))
  })
  localStorage.setItem(KUNCI_ID, JSON.stringify(rencana.map((r) => r.id)))
}

/** Nyalakan/matikan; menyalakan meminta izin notifikasi (sekali, dari ketukan pengguna). */
async function setNyala(v) {
  if (v) {
    const p = plugin()
    const r = await p?.requestPermissions?.().catch(() => null)
    if (r?.display !== 'granted') {
      setelan.nyala = false
      simpan()
      return false
    }
    await cekIzinTepat()
  }
  setelan.nyala = !!v
  simpan()
  return true
}

function setWaktu(kunci, v) {
  setelan.aktif[kunci] = !!v
  simpan()
}
function setSebelum(n) {
  setelan.sebelum = Number(n) || 0
  simpan()
}

export function useAdzan() {
  return {
    setelan,
    izinTepat,
    setNyala,
    setWaktu,
    setSebelum,
    cekIzinTepat,
    bukaIzinTepat,
    jadwalkanAdzan
  }
}
