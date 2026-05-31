// stores/collections.js — listener Firestore TERPUSAT (fix duplicate full-collection listeners).
// santri/guru/keuangan_buku_induk dulu di-subscribe di banyak composable → boros read.
// Store ini subscribe 1x per collection (idempotent, hidup se-sesi); composable baca ref shared.
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { subscribeColl } from '@/services/firestore'

export const useCollectionsStore = defineStore('collections', () => {
  const santri = ref([])
  const guru = ref([])
  const bukuInduk = ref([])
  const loaded = ref({})
  const _refByName = { santri, guru, keuangan_buku_induk: bukuInduk }
  const _started = {}

  function ensure(...names) {
    for (const name of names) {
      if (_started[name]) continue
      const target = _refByName[name]
      if (!target) continue
      _started[name] = subscribeColl(name, (docs) => {
        target.value = docs
        if (!loaded.value[name]) loaded.value = { ...loaded.value, [name]: true }
      })
    }
  }

  function isLoaded(name) {
    return !!loaded.value[name]
  }

  return { santri, guru, bukuInduk, loaded, ensure, isLoaded }
})
