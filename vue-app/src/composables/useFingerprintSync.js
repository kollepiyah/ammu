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
import { deriveShift, statusFor, shiftsForGuru, pilihShiftPulang } from '@/utils/shiftDerive'

// timestamp att_log 'YYYY-MM-DD HH:MM:SS' (WIB lokal, tanpa 'Z') → { date, hhmm, full }.
function splitTs(ts) {
  const m = String(ts || '')
    .trim()
    .match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}):(\d{2})/)
  if (!m) return null
  return { date: m[1], hhmm: m[2] + ':' + m[3], full: String(ts).trim() }
}

/**
 * Diagnosa "absen guru X tidak masuk" (Kyai, 5 Agu 2026).
 *
 * Scan yang tak jatuh di window shift mana pun dibuang dari pass MASUK. Selama itu
 * cuma dihitung sebagai angka `luar`, tak ada cara tahu guru mana yang absennya
 * hilang. Fungsi ini menyaring kasus yang BENAR-BENAR bermasalah: (pin, tanggal)
 * yang punya scan di luar window TAPI nol baris masuk — sebab tanpa baris masuk,
 * jam_pulang pun tak punya tempat menempel, jadi harinya kosong sama sekali.
 *
 * (pin, tanggal) yang punya baris masuk TIDAK dilaporkan: di sana scan "di luar
 * window" itu normal — itu ceklok pulang.
 *
 * @param {object} luarPer  pin|date -> { nama, guru, date, times[] }
 * @param {string[]} aggKeys kunci pass masuk, bentuk 'pin|date|shift'
 * @param {(guru:object)=>string[]} shiftsOf resolver shift milik guru
 * @param {number} batas maksimal baris yang dikembalikan
 * @returns {{ daftar: object[], lebih: number }}
 */
export function hitungScanTanpaAbsen(luarPer, aggKeys, shiftsOf, batas = 100) {
  const adaMasuk = new Set()
  for (const key of aggKeys || []) {
    const p = String(key).split('|')
    if (p.length >= 2) adaMasuk.add(p[0] + '|' + p[1])
  }
  const daftar = Object.keys(luarPer || {})
    .filter((lk) => !adaMasuk.has(lk))
    .map((lk) => {
      const v = luarPer[lk]
      const shiftGuru = [...(shiftsOf(v.guru) || [])]
      return {
        nama: v.nama,
        tanggal: v.date,
        jam: [...v.times].sort(),
        shiftGuru,
        // Shift kosong = sebabnya PASTI konfigurasi guru, bukan jam mesin.
        sebab: shiftGuru.length ? 'jam di luar window shift' : 'guru belum punya shift'
      }
    })
    .sort(
      (a, b) => String(a.tanggal).localeCompare(String(b.tanggal)) || a.nama.localeCompare(b.nama)
    )
  return { daftar: daftar.slice(0, batas), lebih: Math.max(0, daftar.length - batas) }
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
    // SEMUA scan lain hari itu jadi kandidat PULANG per (pin, tanggal) — baik yang
    // di luar window masuk MAUPUN yang masih di dalam window shift-nya sendiri
    // (pulang sebelum shift bubar). Dulu yang kedua dibuang diam-diam, itulah asal
    // baris "belum pulang" padahal gurunya sudah ceklok pulang. (Kyai, 22 Jul 2026)
    const agg = {}
    const pulangScans = {} // pin|date -> { g, date, times:[hhmm] }
    const takKenal = new Set()
    let luar = 0
    // Diagnosa "absen guru X tidak masuk" (Kyai, 5 Agu 2026): scan yang tak jatuh di
    //   window shift mana pun dulu cuma jadi ANGKA `luar`, jadi tak ada cara tahu guru
    //   mana yang absennya hilang & kenapa. Sekarang dicatat per (pin, tanggal).
    const luarPer = {} // pin|date -> { nama, guru, date, times:[hhmm] }
    const catatKandidatPulang = (pin, g, date, hhmm) => {
      const pk = pin + '|' + date
      if (!pulangScans[pk]) pulangScans[pk] = { g, date, times: [] }
      pulangScans[pk].times.push(hhmm)
    }
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
        const lk = pin + '|' + parts.date
        if (!luarPer[lk])
          luarPer[lk] = { nama: g.nama || pin, guru: g, date: parts.date, times: [] }
        luarPer[lk].times.push(parts.hhmm)
        catatKandidatPulang(pin, g, parts.date, parts.hhmm)
        continue
      }
      const key = pin + '|' + parts.date + '|' + sh
      if (!(key in agg)) {
        agg[key] = { g, sh, date: parts.date, hhmm: parts.hhmm, full: parts.full }
        continue
      }
      if (parts.full < agg[key].full) {
        // scan ini lebih awal → jadi jam masuk; yang lama turun jadi kandidat pulang.
        catatKandidatPulang(pin, g, parts.date, agg[key].hhmm)
        agg[key] = { g, sh, date: parts.date, hhmm: parts.hhmm, full: parts.full }
      } else {
        catatKandidatPulang(pin, g, parts.date, parts.hhmm)
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
