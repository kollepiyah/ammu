// useFingerprintSync — sinkron scan mesin Fingerspot → absensi_shift_guru (Supabase).
//
// HANYA di Ammu Desktop (Electron). Alur:
//   1) Main process baca att_log Personnel (IPC electronAPI.readAttLog) → [{device_pin, timestamp}]
//   2) match device_pin → guru.id_fingerprint, derivasi shift (utils/shiftDerive, setelan AMMU)
//   3) scan TERAWAL in-window = jam masuk → tulis absensi_shift_guru via db.js (sesi login → RLS)
//
// GUARD: tak menimpa baris existing berstatus izin/sakit; skip baris identik (status+jam sama).
// Tulis pakai source 'fingerprint' (auto) — beda dari 'fingerprint_import' (impor xlsx manual).
// Logika = CERMIN AbsensiGuruView.importFingerprint + fp_sync.py (jembatan sementara).

import { getAll, getOne, setOne, mergeOne } from '@/services/db'
import { useSettingsStore } from '@/stores/settings'
import { deriveShift, statusFor, shiftsForGuru, shiftWindow } from '@/utils/shiftDerive'

// timestamp att_log 'YYYY-MM-DD HH:MM:SS' (WIB lokal, tanpa 'Z') → { date, hhmm, full }.
function splitTs(ts) {
  const m = String(ts || '')
    .trim()
    .match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}):(\d{2})/)
  if (!m) return null
  return { date: m[1], hhmm: m[2] + ':' + m[3], full: String(ts).trim() }
}

export function useFingerprintSync() {
  const settingsStore = useSettingsStore()

  // sync tersedia? (Electron desktop dgn bridge readAttLog)
  function available() {
    return !!(typeof window !== 'undefined' && window.electronAPI && window.electronAPI.readAttLog)
  }

  /**
   * Jalankan sinkron.
   * @param {object} opts
   * @param {string} [opts.personnelDir] folder install Fingerspot Personnel (kosong = default)
   * @param {boolean} [opts.commit=true] false = dry-run (hitung saja, tak menulis)
   * @returns ringkasan { scan, kandidat, written, skipIzin, skipSame, takKenal[], luar, rows[] }
   */
  async function sync({ personnelDir = '', commit = true } = {}) {
    if (!available()) {
      throw new Error('Sinkron mesin hanya tersedia di Ammu Desktop (Electron).')
    }
    const res = await window.electronAPI.readAttLog(personnelDir ? { personnelDir } : {})
    if (!res || !res.ok) throw new Error((res && res.error) || 'Gagal baca att_log mesin')
    const scans = res.rows || []

    const settings = settingsStore.settings || {}
    const guru = await getAll('guru')
    const byPin = {}
    for (const g of guru) {
      const pin = String(g.id_fingerprint || '').trim()
      if (pin) byPin[pin] = g
    }

    // agregasi per (pin, tanggal, shift) → scan TERAWAL = jam masuk.
    // Scan DI LUAR window masuk dikumpulkan sbg kandidat PULANG per (pin, tanggal).
    const agg = {}
    const pulangScans = {} // pin|date -> { g, date, times:[hhmm] }
    const takKenal = new Set()
    let luar = 0
    for (const r of scans) {
      const pin = String(r.device_pin || '').trim()
      const parts = splitTs(r.timestamp)
      if (!pin || !parts) continue
      const g = byPin[pin]
      if (!g) {
        takKenal.add(pin)
        continue
      }
      const sh = deriveShift(parts.hhmm, g, settings)
      if (!sh) {
        luar++
        const pk = pin + '|' + parts.date
        if (!pulangScans[pk]) pulangScans[pk] = { g, date: parts.date, times: [] }
        pulangScans[pk].times.push(parts.hhmm)
        continue
      }
      const key = pin + '|' + parts.date + '|' + sh
      if (!(key in agg) || parts.full < agg[key].full) {
        agg[key] = { g, sh, date: parts.date, hhmm: parts.hhmm, full: parts.full }
      }
    }

    const nowIso = new Date().toISOString()
    let written = 0
    let skipIzin = 0
    let skipSame = 0
    const rows = []
    for (const key of Object.keys(agg)) {
      const a = agg[key]
      const status = statusFor(a.hhmm, a.sh, settings)
      const docId = 'shift_' + a.g.id + '_' + a.date + '_' + a.sh
      const existing = await getOne('absensi_shift_guru', docId)
      if (existing) {
        const exst = String(existing.status || '').toLowerCase()
        if (exst === 'izin' || exst === 'sakit') {
          skipIzin++
          continue
        }
        if (exst === status && String(existing.jam || '') === a.hhmm) {
          skipSame++
          continue
        }
      }
      if (commit) {
        await setOne('absensi_shift_guru', docId, {
          id: docId,
          guru_id: a.g.id,
          periode: a.date.slice(0, 7),
          guru_nama: a.g.nama,
          tanggal: a.date,
          jam: a.hhmm,
          shift: a.sh,
          status,
          source: 'fingerprint',
          synced_at: nowIso
        })
      }
      written++
      rows.push({ nama: a.g.nama, tanggal: a.date, shift: a.sh, jam: a.hhmm, status })
    }

    // ── Pass PULANG: scan di luar window = pulang → tempel ke baris masuk (hadir/terlambat)
    // pada shift dgn `selesai` TERBESAR yang ≤ jam scan (shift yg ditinggalkan). Berlaku semua
    // shift (ngaji pagi/sore-saja jg scan 2×). HANYA MENCATAT jam_pulang (MAX, mergeOne — jaga
    // jam/status masuk). Jalan SESUDAH tulis masuk agar baris terbaru terbaca.
    let pulangWritten = 0
    for (const pk of Object.keys(pulangScans)) {
      const { g, date, times } = pulangScans[pk]
      const shiftRows = {}
      for (const sh of shiftsForGuru(g, settings)) {
        const docId = 'shift_' + g.id + '_' + date + '_' + sh
        const row = await getOne('absensi_shift_guru', docId)
        if (!row) continue
        const st = String(row.status || '').toLowerCase()
        if (st !== 'hadir' && st !== 'terlambat') continue
        const selesai = String(shiftWindow(sh, settings)?.selesai || '')
        if (!selesai) continue
        shiftRows[sh] = { docId, selesai, exPulang: String(row.jam_pulang || '') }
      }
      const perShiftMax = {} // shift → jam pulang MAX
      for (const hhmm of times) {
        let target = ''
        let bestSelesai = ''
        for (const sh of Object.keys(shiftRows)) {
          const selesai = shiftRows[sh].selesai
          if (selesai > hhmm) continue // pulang harus SETELAH shift bubar
          if (selesai > bestSelesai) {
            bestSelesai = selesai
            target = sh
          }
        }
        if (!target) continue
        if (!perShiftMax[target] || hhmm > perShiftMax[target]) perShiftMax[target] = hhmm
      }
      for (const sh of Object.keys(perShiftMax)) {
        const { docId, exPulang } = shiftRows[sh]
        const jamPulang = perShiftMax[sh]
        if (exPulang && exPulang >= jamPulang) continue // sudah ada pulang lebih akhir
        if (commit) await mergeOne('absensi_shift_guru', docId, { jam_pulang: jamPulang })
        pulangWritten++
      }
    }

    return {
      scan: scans.length,
      kandidat: Object.keys(agg).length,
      written,
      pulangWritten,
      skipIzin,
      skipSame,
      takKenal: [...takKenal],
      luar,
      rows
    }
  }

  return { sync, available }
}
