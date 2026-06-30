// stores/collections.js — listener data TERPUSAT (fix duplicate full-collection listeners).
// santri/guru/keuangan_buku_induk dulu di-subscribe di banyak composable → boros read.
// Store ini subscribe 1x per collection (idempotent, hidup se-sesi); composable baca ref shared.
//
// v.111 FIX (race auth ↔ data — "data santri/guru kosong sampai hard refresh"):
//   subscribeColl pertama bisa jalan SEBELUM token Supabase menempel — mis. shell
//   (GlobalSearch/RibbonStatusBar/DashboardGreeting) mount saat sesi di-restore dari
//   localStorage, padahal sesi Supabase belum ter-attach. RLS `auth.uid() is not null`
//   lalu memfilter SEMUA baris → hasil KOSONG; guard `_started` cegah refetch; realtime
//   cuma refire saat ada perubahan baris → data tetap kosong sampai HARD REFRESH.
//   Solusi: `reloadActive()` (refetch koleksi aktif dgn token yang sudah siap) + `clear()`
//   (logout) DIPANGGIL dari stores/auth.js saat auth state berubah (login/restore/logout).
//   Logika listener ditaruh di auth.js, BUKAN di sini, agar store ini tetap bebas import
//   client Supabase (cegah error binding rollup pada modul yang di-import sangat awal).
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { subscribeColl } from '@/services/db'

export const useCollectionsStore = defineStore('collections', () => {
  const santri = ref([])
  const guru = ref([])
  const bukuInduk = ref([])
  const loaded = ref({})
  const _refByName = { santri, guru, keuangan_buku_induk: bukuInduk }
  const _started = {}

  function _subscribe(name) {
    const target = _refByName[name]
    if (!target) return
    _started[name] = subscribeColl(name, (docs) => {
      target.value = docs
      if (!loaded.value[name]) loaded.value = { ...loaded.value, [name]: true }
    })
  }

  function ensure(...names) {
    for (const name of names) {
      if (_started[name]) continue
      if (!_refByName[name]) continue
      _subscribe(name)
    }
  }

  // Refetch koleksi yang SUDAH aktif: teardown channel lama + subscribe ulang dengan
  // client yang token-nya sudah menempel. TIDAK meng-clear ref dulu → data lama tetap
  // tampil sampai data baru tiba (tanpa flash). No-op bila belum ada yang aktif.
  function reloadActive() {
    const names = Object.keys(_started)
    if (!names.length) return
    for (const name of names) {
      try {
        _started[name] && _started[name]()
      } catch (e) {
        /* noop */
      }
      delete _started[name]
    }
    ensure(...names)
  }

  // Kosongkan + unsubscribe semua (logout / ganti user di perangkat yang sama).
  function clear() {
    for (const name of Object.keys(_started)) {
      try {
        _started[name] && _started[name]()
      } catch (e) {
        /* noop */
      }
      delete _started[name]
    }
    santri.value = []
    guru.value = []
    bukuInduk.value = []
    loaded.value = {}
  }

  function isLoaded(name) {
    return !!loaded.value[name]
  }

  return { santri, guru, bukuInduk, loaded, ensure, reloadActive, clear, isLoaded }
})
