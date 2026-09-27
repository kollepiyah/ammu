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
import { statusFor, shiftsForGuru, pilihShiftPulang } from '@/utils/shiftDerive'
// v.1.4.6 gel. 3: pengelompokan scan (+ diagnosa scan tanpa absen) pindah ke utils/scanMesin,
//   dipakai bersama tambal log HiView. Perilaku sinkron ini TIDAK berubah.
import { kelompokkanScan, hitungScanTanpaAbsen } from '@/utils/scanMesin'

// Tetap diekspor dari sini — pemanggil & tes lama mengimpornya dari composable ini.
export { hitungScanTanpaAbsen }

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

    // agregasi per (pin, tanggal, shift) → scan TERAWAL = jam masuk; scan lain hari itu =
    //   kandidat PULANG. Aturannya di utils/scanMesin (murni + tes), dipakai juga tambal HiView.
    const { agg, pulangScans, takKenal, luar, luarPer } = kelompokkanScan(scans, guru, settings)

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

    // ── Pass PULANG: kandidat pulang → tempel ke baris masuk (hadir/terlambat) pada shift
    // yang PALING BELAKANGAN dimasuki (utils/shiftDerive.pilihShiftPulang). Berlaku semua
    // shift (ngaji pagi/sore-saja jg scan 2×). HANYA MENCATAT jam_pulang (MAX, mergeOne —
    // jaga jam/status masuk). Jalan SESUDAH tulis masuk agar baris terbaru terbaca.
    let pulangWritten = 0
    for (const pk of Object.keys(pulangScans)) {
      const { g, date, times } = pulangScans[pk]
      const shiftRows = {}
      const barisMasuk = []
      for (const sh of shiftsForGuru(g, settings)) {
        const docId = 'shift_' + g.id + '_' + date + '_' + sh
        const row = await getOne('absensi_shift_guru', docId)
        if (!row) continue
        shiftRows[sh] = { docId, exPulang: String(row.jam_pulang || '') }
        barisMasuk.push({ shift: sh, jam: String(row.jam || ''), status: row.status })
      }
      const perShiftMax = {} // shift → jam pulang MAX
      for (const hhmm of times) {
        for (const sh of pilihShiftPulang(hhmm, barisMasuk, settings)) {
          if (!shiftRows[sh]) continue
          if (!perShiftMax[sh] || hhmm > perShiftMax[sh]) perShiftMax[sh] = hhmm
        }
      }
      for (const sh of Object.keys(perShiftMax)) {
        const { docId, exPulang } = shiftRows[sh]
        const jamPulang = perShiftMax[sh]
        if (exPulang && exPulang >= jamPulang) continue // sudah ada pulang lebih akhir
        if (commit) await mergeOne('absensi_shift_guru', docId, { jam_pulang: jamPulang })
        pulangWritten++
      }
    }

    // Diagnosa: guru yang PUNYA scan tapi NOL baris masuk pada tanggal itu — sebab
    // tersering shift guru kosong/salah ("Perbaiki Shift") atau jam mesin melenceng
    // dari window shift. Logikanya di hitungScanTanpaAbsen (murni, ada tesnya).
    const { daftar: luarGuru, lebih: luarGuruLebih } = hitungScanTanpaAbsen(
      luarPer,
      Object.keys(agg),
      (g) => shiftsForGuru(g, settings)
    )

    return {
      scan: scans.length,
      kandidat: Object.keys(agg).length,
      written,
      pulangWritten,
      skipIzin,
      skipSame,
      takKenal: [...takKenal],
      luar,
      luarGuru,
      luarGuruLebih,
      rows
    }
  }

  return { sync, available }
}
