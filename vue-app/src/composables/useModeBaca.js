// useModeBaca — mode baca layar penuh, SATU untuk Kitab & Wirid dan Al-Qur'an (blueprint §3.6,
// §4.10). Layar pemakai cukup: pasang kelas `aktif` pada akarnya (overlay fixed menutupi header &
// menu bawah), tampilkan kontrol bila `kontrol`, dan teruskan klik isi ke `ketuk`.
//   · Android  : status bar + navigasi sistem disembunyikan (plugin LayarBaca), muncul sementara
//                bila tepi digeser; layar tetap menyala (FLAG_KEEP_SCREEN_ON).
//   · PWA/web  : Fullscreen API bila ada (iPhone tidak punya — cukup overlay) + Wake Lock.
//   · Tombol kembali Android: keluar dari layar penuh dulu, bukan meninggalkan layar.
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { registerPlugin } from '@capacitor/core'
import { isNativeAndroid } from '@/composables/useWidgetSync'
import { ketukDiTengah, rapikanSetelanBaca } from '@/utils/modeBaca'

const KUNCI = 'ammu_mode_baca'
let _plugin = null
function layarBaca() {
  if (!_plugin) _plugin = registerPlugin('LayarBaca')
  return _plugin
}

function muat() {
  try {
    return rapikanSetelanBaca(JSON.parse(localStorage.getItem(KUNCI) || '{}'))
  } catch {
    return rapikanSetelanBaca({})
  }
}
/** Setelan bersama (Pengaturan ibadah ikut mengubahnya). */
export const setelanBaca = reactive(muat())
export function setTetapMenyala(v) {
  setelanBaca.tetapMenyala = !!v
  try {
    localStorage.setItem(KUNCI, JSON.stringify(setelanBaca))
  } catch {
    /* noop */
  }
}

export function useModeBaca() {
  const aktif = ref(false)
  const kontrol = ref(true)
  const android = isNativeAndroid()
  let kunciLayar = null

  async function mintaWakeLock() {
    if (android || !setelanBaca.tetapMenyala) return
    try {
      kunciLayar = await navigator.wakeLock?.request?.('screen')
    } catch {
      kunciLayar = null
    }
  }

  async function masuk() {
    aktif.value = true
    kontrol.value = true
    if (android) {
      await layarBaca()
        .masuk()
        .catch(() => {})
      if (setelanBaca.tetapMenyala)
        await layarBaca()
          .tetapMenyala({ nyala: true })
          .catch(() => {})
      return
    }
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.()
    } catch {
      /* iPhone/PWA tanpa Fullscreen API: overlay saja sudah menutupi header & menu */
    }
    await mintaWakeLock()
  }

  async function keluar() {
    if (!aktif.value) return
    aktif.value = false
    kontrol.value = true
    if (android) {
      await layarBaca()
        .keluar()
        .catch(() => {})
      await layarBaca()
        .tetapMenyala({ nyala: false })
        .catch(() => {})
      return
    }
    try {
      if (document.fullscreenElement) await document.exitFullscreen?.()
    } catch {
      /* noop */
    }
    try {
      await kunciLayar?.release?.()
    } catch {
      /* noop */
    }
    kunciLayar = null
  }

  function alihkan() {
    return aktif.value ? keluar() : masuk()
  }

  /** Klik pada isi: ketukan di tengah layar menyembunyikan/menampilkan kontrol. */
  function ketuk(e) {
    if (!aktif.value) return
    if (ketukDiTengah(e?.clientY, window.innerHeight)) kontrol.value = !kontrol.value
  }

  const kembali = (ev) => {
    if (!aktif.value) return
    ev.preventDefault()
    keluar()
  }
  // Wake Lock dilepas browser saat tersembunyi — minta lagi saat kembali.
  const tampilLagi = () => {
    if (!document.hidden && aktif.value) mintaWakeLock()
  }
  onMounted(() => {
    window.addEventListener('android-back', kembali)
    document.addEventListener('visibilitychange', tampilLagi)
  })
  onUnmounted(() => {
    window.removeEventListener('android-back', kembali)
    document.removeEventListener('visibilitychange', tampilLagi)
    keluar()
  })

  return { aktif, kontrol, masuk, keluar, alihkan, ketuk }
}
