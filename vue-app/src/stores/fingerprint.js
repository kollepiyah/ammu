// Fingerprint store (Fase 3) — config + status + scheduler sinkron mesin Fingerspot.
//
// HANYA berguna di Ammu Desktop (Electron). Memegang setelan PER-PC (localStorage):
// path Personnel + auto-sync + interval, plus status sync terakhir. Scheduler `setInterval`
// hidup di STORE (singleton, hidup selama app) — bukan di view — supaya auto-sync tetap
// jalan walau user pindah halaman. Engine sinkron tetap di composable useFingerprintSync.
//
// Default auto-sync OFF: hanya PC station (yg di-enable manual) yg menyinkron. init()
// dipanggil 1× dari RibbonLayout supaya auto-sync resume sendiri setelah app restart.

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFingerprintSync } from '@/composables/useFingerprintSync'

const LS_KEY = 'ammu_fp_sync_cfg'
const DEFAULT_INTERVAL = 30 // menit (selaras jembatan Task Scheduler lama)
const MIN_INTERVAL = 5

function loadCfg() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) return JSON.parse(raw) || {}
  } catch (e) {
    /* ignore */
  }
  return {}
}

export const useFingerprintStore = defineStore('fingerprint', () => {
  const cfg = loadCfg()

  // Config (persist)
  const personnelDir = ref(String(cfg.personnelDir || '').trim())
  const autoSync = ref(!!cfg.autoSync)
  const intervalMin = ref(Math.max(MIN_INTERVAL, parseInt(cfg.intervalMin, 10) || DEFAULT_INTERVAL))

  // Status (lastSyncAt persist; result/error hanya sesi ini)
  const running = ref(false)
  const lastSyncAt = ref(cfg.lastSyncAt || null) // ISO string
  const lastResult = ref(null) // ringkasan sync terakhir { written, skipIzin, takKenal[], luar, ... }
  const lastError = ref(null) // pesan error sync terakhir
  const lastTrigger = ref(null) // 'manual' | 'auto'

  let _timer = null
  let _inited = false

  const fp = useFingerprintSync() // engine sinkron (sync/available)

  // Tersedia hanya di Electron desktop dgn bridge readAttLog.
  function available() {
    return fp.available()
  }

  function persist() {
    try {
      localStorage.setItem(
        LS_KEY,
        JSON.stringify({
          personnelDir: personnelDir.value,
          autoSync: autoSync.value,
          intervalMin: intervalMin.value,
          lastSyncAt: lastSyncAt.value
        })
      )
    } catch (e) {
      /* ignore */
    }
  }

  // Jalankan satu siklus sinkron. trigger 'manual' (tombol) / 'auto' (scheduler).
  // Anti-tumpang-tindih: skip kalau sedang berjalan. Tak melempar — simpan error ke state.
  async function runNow(trigger = 'manual') {
    if (running.value) return null
    running.value = true
    lastError.value = null
    lastTrigger.value = trigger
    try {
      const res = await fp.sync({ personnelDir: personnelDir.value, commit: true })
      lastResult.value = res
      lastSyncAt.value = new Date().toISOString()
      persist()
      return res
    } catch (e) {
      lastResult.value = null
      lastError.value = (e && e.message) || String(e)
      lastSyncAt.value = new Date().toISOString()
      persist()
      return null
    } finally {
      running.value = false
    }
  }

  function stopScheduler() {
    if (_timer) {
      clearInterval(_timer)
      _timer = null
    }
  }

  // (Re)start interval kalau auto-sync aktif & bridge tersedia. Idempoten.
  function startScheduler() {
    stopScheduler()
    if (!autoSync.value || !available()) return
    const ms = Math.max(MIN_INTERVAL, intervalMin.value) * 60 * 1000
    _timer = setInterval(() => {
      runNow('auto')
    }, ms)
  }

  // Setters (persist + sinkronkan scheduler)
  function setPersonnelDir(v) {
    personnelDir.value = String(v || '').trim()
    persist()
  }
  function setAutoSync(v) {
    autoSync.value = !!v
    persist()
    startScheduler() // start bila ON, stop bila OFF
  }
  function setIntervalMin(v) {
    intervalMin.value = Math.max(MIN_INTERVAL, parseInt(v, 10) || DEFAULT_INTERVAL)
    persist()
    if (autoSync.value) startScheduler() // restart dgn interval baru
  }

  // Dipanggil 1× saat shell desktop mount → resume auto-sync pasca-restart.
  // TIDAK menjalankan sync langsung (hindari race dgn login/sesi); tunggu tick pertama.
  function init() {
    if (_inited) return
    _inited = true
    if (autoSync.value && available()) startScheduler()
  }

  return {
    personnelDir,
    autoSync,
    intervalMin,
    running,
    lastSyncAt,
    lastResult,
    lastError,
    lastTrigger,
    available,
    runNow,
    startScheduler,
    stopScheduler,
    setPersonnelDir,
    setAutoSync,
    setIntervalMin,
    init,
    MIN_INTERVAL
  }
})
