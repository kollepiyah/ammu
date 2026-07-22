// usePjGuru — peta pembagian santri per PJ PTPT ({ [pjGuruId]: [guruId] }), SHARED.
//
// v.1.2.1 (Kyai 22 Jul 2026): "ada 2 PJ … bisakah saya pilih PJ, gurunya ini ini."
//   Peta disimpan di master/lembaga PTPT (diatur super_admin di tab Peran Glondongan).
//   Dipakai useSantri untuk membatasi Data Santri PJ ke ampuannya, dan GlondonganView
//   untuk label PJ. Karena useSantri dipakai 20 komponen, langganan dibuat SINGKATAN
//   modul (satu listener se-sesi) — bukan per-pemanggil — supaya tak ada 20 channel.
import { ref, computed } from 'vue'
import { subscribeDoc } from '@/services/db'
import { getPjGuru } from '@/utils/glondongan'

const _lembagaList = ref([])
let _started = false

function _ensure() {
  if (_started) return
  _started = true
  // Doc kecil & sudah realtime (dilangganani juga oleh useLembaga/useGlondongan).
  subscribeDoc('master', 'lembaga', (doc) => {
    _lembagaList.value = Array.isArray(doc?.list) ? doc.list : []
  })
}

export function usePjGuru() {
  _ensure()
  const pjGuru = computed(() => getPjGuru(_lembagaList.value))
  return { pjGuru }
}
