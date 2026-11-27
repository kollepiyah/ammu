// useModeBaca — mode baca layar penuh, SATU untuk Kitab & Wirid dan Al-Qur'an (blueprint §3.6,
// §4.10; otomatis penuh Kyai 27 Nov 2026). Pasang `meta: { layarBacaPenuh: true }` pada route
// supaya AppLayout / PublikLayout menyembunyikan top bar master & menu bawah secara otomatis,
// lalu panggil `useModeBaca({ otomatis: true })` di layar baca.
//   · Android  : status bar + navigasi sistem disembunyikan (plugin LayarBaca), muncul sementara
//                bila tepi digeser; layar tetap menyala (FLAG_KEEP_SCREEN_ON).
//   · PWA/web  : header & menu bawah master disembunyikan otomatis + Wake Lock (Fullscreen API
//                opsional saat ada interaksi klik).
//   · Ketuk tengah layar: menyembunyikan/menampilkan bilah bacaan tipis (kepala + pager).
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
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

export function useModeBaca({ otomatis = false } = {}) {
  const aktif = ref(otomatis)
  const kontrol = ref(true)
  const android = isNativeAndroid()
  let kunciLayar = null
  let sudahMasukNative = false

  async function mintaWakeLock() {
    if (android || !setelanBaca.tetapMenyala) return
    try {
      kunciLayar = await navigator.wakeLock?.request?.('screen')
    } catch {
      kunciLayar = null
    }
  }

  async function lepasWakeLock() {
    try {
      await kunciLayar?.release?.()
    } catch {
      /* noop */
    }
    kunciLayar = null
  }

  async function terapkanNative(nyala) {
    if (!android) return
    if (nyala) {
      sudahMasukNative = true
      await layarBaca()
        .masuk()
        .catch(() => {})
      await layarBaca()
        .tetapMenyala({ nyala: !!setelanBaca.tetapMenyala })
        .catch(() => {})
    } else if (sudahMasukNative) {
      sudahMasukNative = false
      await layarBaca()
        .keluar()
        .catch(() => {})
      await layarBaca()
        .tetapMenyala({ nyala: false })
        .catch(() => {})
      // Kembalikan warna/kontras ikon StatusBar (App.vue) setelah keluar mode imersif.
      try {
        window.dispatchEvent(new Event('ammu:reapply-statusbar'))
      } catch {
        /* noop */
      }
    }
  }

  function setKelasRoot(nyala) {
    try {
      document.documentElement.classList.toggle('layar-baca-penuh', !!nyala)
    } catch {
      /* noop */
    }
  }

  async function masuk({ mintaBrowserFullscreen = !otomatis } = {}) {
    aktif.value = true
    kontrol.value = true
    setKelasRoot(true)
    if (android) {
      await terapkanNative(true)
      return
    }
    if (mintaBrowserFullscreen) {
      try {
        if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.()
      } catch {
        /* iPhone/PWA tanpa Fullscreen API atau tanpa gestur klik: layout penuh sudah aktif */
      }
    }
    await mintaWakeLock()
  }

  async function keluar() {
    setKelasRoot(false)
    if (!aktif.value && !sudahMasukNative) return
    aktif.value = false
    kontrol.value = true
    if (android) {
      await terapkanNative(false)
      return
    }
    try {
      if (document.fullscreenElement) await document.exitFullscreen?.()
    } catch {
      /* noop */
    }
    await lepasWakeLock()
  }

  function alihkan() {
    return aktif.value ? keluar() : masuk({ mintaBrowserFullscreen: true })
  }

  /** Klik pada isi: ketukan di tengah layar menyembunyikan/menampilkan kontrol. */
  function ketuk(e) {
    if (!aktif.value) return
    if (ketukDiTengah(e?.clientY, window.innerHeight)) kontrol.value = !kontrol.value
  }

  // Perubahan setelan "layar tetap menyala" langsung diterapkan saat sedang membaca.
  watch(
    () => setelanBaca.tetapMenyala,
    (v) => {
      if (!aktif.value) return
      if (android) {
        layarBaca()
          .tetapMenyala({ nyala: !!v })
          .catch(() => {})
      } else if (v) {
        mintaWakeLock()
      } else {
        lepasWakeLock()
      }
    }
  )

  const kembali = (ev) => {
    // Pada mode otomatis, tombol kembali langsung menavigasi keluar/mundur (bukan mencabut
    // layar penuh lalu tertahan di layar yang sama).
    if (otomatis || !aktif.value) return
    ev.preventDefault()
    keluar()
  }
  // Wake Lock dilepas browser & system bar Android bisa muncul lagi saat kembali dari latar.
  const tampilLagi = () => {
    if (document.hidden || !aktif.value) return
    if (android) {
      layarBaca()
        .masuk()
        .catch(() => {})
    } else {
      mintaWakeLock()
    }
  }
  onMounted(() => {
    window.addEventListener('android-back', kembali)
    document.addEventListener('visibilitychange', tampilLagi)
    if (otomatis) masuk({ mintaBrowserFullscreen: false })
  })
  onUnmounted(() => {
    window.removeEventListener('android-back', kembali)
    document.removeEventListener('visibilitychange', tampilLagi)
    keluar()
  })

  return { aktif, kontrol, masuk, keluar, alihkan, ketuk }
}
