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

import { getAll, getOne, setOne, mergeOne, queryColl } from '@/services/db'
import { useSettingsStore } from '@/stores/settings'
import { statusFor, shiftsForGuru, pilihShiftPulang } from '@/utils/shiftDerive'
// v.1.4.6 gel. 3: pengelompokan scan (+ diagnosa scan tanpa absen) pindah ke utils/scanMesin,
//   dipakai bersama tambal log HiView. Perilaku sinkron ini TIDAK berubah.
import {
  kelompokkanScan,
  hitungScanTanpaAbsen,
  shiftMilikHari,
  saringScan
} from '@/utils/scanMesin'
// v.1.5.0: shift Pondok Laju yang aktif per tanggal (jadwal piket Laju 1/2).
import { idShiftLaju, penentuShiftLaju } from '@/utils/shiftLaju'
import { todayJakarta } from '@/utils/format'

/** 'YYYY-MM-DD' mundur n hari (kalender, UTC — tanggalnya sudah tanggal WIB). */
function mundurHari(iso, n) {
  const d = new Date(iso + 'T00:00:00Z')
  d.setUTCDate(d.getUTCDate() - n)
  return d.toISOString().slice(0, 10)
}

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
   * @param {number} [opts.hariMundur=14] v.1.5.0: hanya scan N hari terakhir yang diproses
   *   (0 = semua riwayat). Dulu SELURUH att_log sejak mesin dipasang dibaca ulang & dicek satu
   *   per satu ke database tiap sinkron — boros kuota bila sinkron otomatis tiap 30 menit.
   * @returns ringkasan { scan, kandidat, written, skipIzin, skipSame, takKenal[], luar, rows[] }
   */
  async function sync({ personnelDir = '', commit = true, hariMundur = 14 } = {}) {
    if (!available()) {
      throw new Error('Sinkron mesin hanya tersedia di Ammu Desktop (Electron).')
    }
    const res = await window.electronAPI.readAttLog(personnelDir ? { personnelDir } : {})
    if (!res || !res.ok) throw new Error((res && res.error) || 'Gagal baca att_log mesin')
    const semuaScan = res.rows || []
    const hariIni = todayJakarta()
    const dari = Number(hariMundur) > 0 ? mundurHari(hariIni, Number(hariMundur)) : ''
    const { dipakai: scans } = saringScan(semuaScan, { dari, hariIni })
    // Scan terbaru di Personnel — tanda apakah unduh otomatis Personnel dari mesin berjalan.
    const scanTerbaru = semuaScan.length ? String(semuaScan[semuaScan.length - 1].timestamp) : ''

    const settings = settingsStore.settings || {}
    const guru = await getAll('guru')

    // v.1.5.0: shift Pondok Laju per tanggal — dibaca hanya bila Kyai sudah memilih shift sesi.
    let shiftHarian
    if (idShiftLaju(settings).size) {
      try {
        const jadwal = await queryColl('pondok_laju_jadwal', dari ? [['tanggal', '>=', dari]] : [])
        shiftHarian = penentuShiftLaju({ settings, jadwal })
      } catch (e) {
        console.warn('[fp-sync] jadwal Pondok Laju tak terbaca:', e?.message || e)
      }
    }

    // agregasi per (pin, tanggal, shift) → scan TERAWAL = jam masuk; scan lain hari itu =
    //   kandidat PULANG. Aturannya di utils/scanMesin (murni + tes), dipakai juga tambal HiView.
    const { agg, pulangScans, takKenal, luar, luarPer } = kelompokkanScan(
      scans,
      guru,
      settings,
      shiftHarian
    )

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
      for (const sh of shiftMilikHari(g, date, settings, shiftHarian)) {
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
      scanSemua: semuaScan.length,
      scanTerbaru,
      dari,
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
