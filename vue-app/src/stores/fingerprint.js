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
// v.1.5.0: rentang sinkron (hari ke belakang). 0 = seluruh riwayat att_log.
const DEFAULT_HARI_MUNDUR = 14
// v.1.5.0: jeda sinkron pertama sesudah Ammu Desktop dibuka (login & data awal sempat siap).
const JEDA_SINKRON_AWAL_MS = 20000

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
  const hariMundur = ref(
    Number.isFinite(parseInt(cfg.hariMundur, 10))
      ? Math.max(0, parseInt(cfg.hariMundur, 10))
      : DEFAULT_HARI_MUNDUR
  )

  // Status (lastSyncAt persist; result/error hanya sesi ini)
  const running = ref(false)
  const lastSyncAt = ref(cfg.lastSyncAt || null) // ISO string
  const lastResult = ref(null) // ringkasan sync terakhir { written, skipIzin, takKenal[], luar, ... }
  const lastError = ref(null) // pesan error sync terakhir
  const lastTrigger = ref(null) // 'manual' | 'auto'
  // v.1.5.5 (audit egress): tanda att_log sinkron SUKSES terakhir — sinkron otomatis dilewati
  //   bila att_log tak berubah. Per PC, ikut tersimpan.
  const lastTanda = ref(String(cfg.lastTanda || ''))
  const lastDilewatiAt = ref(null) // ISO pemeriksaan terakhir yang dilewati (sesi ini saja)

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
          hariMundur: hariMundur.value,
          lastSyncAt: lastSyncAt.value,
          lastTanda: lastTanda.value
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
      const res = await fp.sync({
        personnelDir: personnelDir.value,
        commit: true,
        hariMundur: hariMundur.value,
        // Tombol manual selalu sinkron penuh; hanya penjadwal yang boleh melewati.
        tandaLewati: trigger === 'auto' ? lastTanda.value : ''
      })
      if (res && res.dilewati) {
        // Mesin diam sejak sinkron terakhir: hasil terakhir tetap ditampilkan apa adanya.
        lastDilewatiAt.value = new Date().toISOString()
        return res
      }
      lastResult.value = res
      lastTanda.value = (res && res.tanda) || ''
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

  // v.1.4.3 (Kyai 14 Sep 2026): `hapusHasilScan` — reset UJI COBA yang menghapus SELURUH absensi
  //   hasil sinkron sidik jari (dasar hitung bisyaroh) — dicabut bersama tombolnya di Mesin
  //   Absensi. Sinkron Fingerspot sudah dipakai sungguhan sejak Juli 2026.

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
    lastTanda.value = '' // folder lain = att_log lain; sinkron berikutnya wajib penuh
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
  function setHariMundur(v) {
    const n = parseInt(v, 10)
    hariMundur.value = Number.isFinite(n) ? Math.max(0, n) : DEFAULT_HARI_MUNDUR
    persist()
  }

  // v.1.5.0 (Kyai 16 Nov 2026): Ammu Desktop ikut menyala saat Windows login — per PC, lewat
  //   jembatan Electron. null = belum terbaca / bukan desktop.
  const bukaSaatWindows = ref(null)
  async function muatBukaSaatWindows() {
    try {
      const r = await window.electronAPI?.getOpenAtLogin?.()
      bukaSaatWindows.value = r && r.ok ? !!r.open : null
    } catch (e) {
      bukaSaatWindows.value = null
    }
  }
  async function setBukaSaatWindows(v) {
    const r = await window.electronAPI?.setOpenAtLogin?.(!!v)
    if (!r || !r.ok) throw new Error((r && r.error) || 'Versi Ammu Desktop ini belum mendukung.')
    bukaSaatWindows.value = !!r.open
  }

  // Dipanggil 1× saat shell desktop mount → resume auto-sync pasca-restart.
  // v.1.5.0: sinkron PERTAMA kini berjalan sendiri sesudah jeda singkat (dulu menunggu satu
  //   interval penuh, 30 menit) — "jika komputer nyala maka otomatis langsung sinkron".
  //   Shell ini hanya ter-mount sesudah login, jadi sesinya sudah ada.
  function init() {
    if (_inited) return
    _inited = true
    if (available()) muatBukaSaatWindows()
    if (autoSync.value && available()) {
      startScheduler()
      setTimeout(() => runNow('auto'), JEDA_SINKRON_AWAL_MS)
    }
  }

  return {
    personnelDir,
    autoSync,
    intervalMin,
    hariMundur,
    bukaSaatWindows,
    running,
    lastSyncAt,
    lastResult,
    lastError,
    lastTrigger,
    lastDilewatiAt,
    available,
    runNow,
    startScheduler,
    stopScheduler,
    setPersonnelDir,
    setAutoSync,
    setIntervalMin,
    setHariMundur,
    setBukaSaatWindows,
    muatBukaSaatWindows,
    init,
    MIN_INTERVAL
  }
})
