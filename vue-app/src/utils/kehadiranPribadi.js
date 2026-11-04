// kehadiranPribadi.js — v.1.4.9: rekap kehadiran SATU guru untuk SATU bulan (kartu Personal).
//
// Dulu hitungan ini tertanam di PersonalView dan terkunci ke bulan berjalan. Kyai, 4 Nov 2026:
// guru perlu melihat riwayat absensinya bulan-bulan sebelumnya — jadi bulannya kini parameter.
// Aturan alpa TIDAK berubah dan tetap meminjam util bersama (libur per lembaga, jadwal masuk,
// jam mulai shift) supaya kartu guru tak berselisih dengan layar admin.
import { shiftsForGuru } from './shiftDerive'
import { buildLiburScope, liburKenaLembaga } from './liburScope'
import { guruMasukPada } from './jadwalGuru'
import { jamMulaiShift, slotBolehAlpa } from './shiftBerjalan'
import { lembagaKalenderShift } from './lembagaShift'

const pad = (n) => String(n).padStart(2, '0')

/**
 * @param {object} p
 * @param {Array}  p.rows      baris absensi_shift_guru (boleh campur bulan/guru — disaring di sini)
 * @param {string} p.guruId
 * @param {object|null} p.guru dokumen guru (shift, jadwal, lembaga); null → alpa tak dihitung
 * @param {object} p.settings  settings app (shift master, hariLibur)
 * @param {Array}  p.kegiatan  koleksi kegiatan (libur kalender per lembaga)
 * @param {number} p.tahun
 * @param {number} p.bulan     1–12
 * @param {string} p.todayIso  'YYYY-MM-DD' WIB
 * @param {string} p.jamKini   'HH:MM' WIB
 */
export function rekapKehadiranBulan({
  rows = [],
  guruId = '',
  guru = null,
  settings = {},
  kegiatan = [],
  tahun,
  bulan,
  todayIso,
  jamKini = ''
}) {
  const id = String(guruId || '')
  const prefix = `${tahun}-${pad(bulan)}-`
  let tepat = 0,
    terlambat = 0,
    sakit = 0,
    izin = 0,
    cuti = 0,
    belumPulang = 0
  // Alpa TAK disimpan sebagai baris (= tak ada baris di hari kerja). `filled` = slot
  //   (tanggal|shift) yang punya baris apa pun.
  const filled = new Set()
  for (const row of rows || []) {
    if (!String(row.tanggal || '').startsWith(prefix)) continue
    if (String(row.guru_id || row.guruId || '') !== id) continue
    const st = String(row.status || '').toLowerCase()
    const sh = String(row.shift || '').toLowerCase()
    filled.add(String(row.tanggal).slice(0, 10) + '|' + sh)
    if (st === 'hadir' || st === 'masuk') tepat++
    else if (st === 'terlambat') terlambat++
    else if (st === 'sakit') sakit++
    else if (st === 'izin') izin++
    else if (st === 'cuti') cuti++
    if (
      (st === 'hadir' || st === 'masuk' || st === 'terlambat') &&
      !String(row.jam_pulang || '').trim()
    )
      belumPulang++
  }

  // Alpa = slot hari kerja (Sen–Sab, non-libur, s/d hari ini) milik shift guru tanpa baris.
  let alpa = 0
  if (guru) {
    const s = settings || {}
    const shifts = [...shiftsForGuru(guru, s)]
    const liburGlobal = new Set(Array.isArray(s.hariLibur) ? s.hariLibur.map(String) : [])
    const liburMap = buildLiburScope(kegiatan || [])
    // Jam mulai tiap shift diturunkan SEKALI, bukan per (hari × shift).
    const jamMulai = new Map(shifts.map((sh) => [String(sh).toLowerCase(), jamMulaiShift(sh, s)]))
    const days = new Date(tahun, bulan, 0).getDate()
    for (let d = 1; d <= days; d++) {
      const iso = `${tahun}-${pad(bulan)}-${pad(d)}`
      if (iso > todayIso) break // hari depan belum terjadi
      if (new Date(tahun, bulan - 1, d).getDay() === 0) continue // Ahad libur mingguan
      if (liburGlobal.has(iso)) continue // libur manual pondok
      for (const sh of shifts) {
        const key = String(sh).toLowerCase()
        if (liburKenaLembaga(liburMap, iso, lembagaKalenderShift(guru, key, s))) continue
        if (!guruMasukPada(guru, key, iso)) continue // bukan jadwal mengajarnya
        if (!slotBolehAlpa(iso, todayIso, jamKini, jamMulai.get(key) || '')) continue
        if (!filled.has(iso + '|' + key)) alpa++
      }
    }
  }
  const hadir = tepat + terlambat
  const total = hadir + sakit + izin + cuti + alpa
  return {
    tepat,
    terlambat,
    hadir,
    sakit,
    izin,
    cuti,
    alpa,
    belumPulang,
    total,
    persenTepat: hadir > 0 ? Math.round((tepat / hadir) * 100) : 0,
    persenHadir: total > 0 ? Math.round((hadir / total) * 100) : 0
  }
}

/**
 * Bulan ('YYYY-MM', terbaru dulu) yang bisa dipilih di kartu Personal: bulan berjalan +
 * setiap bulan yang punya baris absensi guru itu (termasuk cuti yang sudah disetujui
 * untuk bulan depan).
 */
export function bulanKehadiranTersedia(rows, guruId, todayIso) {
  const id = String(guruId || '')
  const set = new Set()
  const kini = String(todayIso || '').slice(0, 7)
  if (/^\d{4}-\d{2}$/.test(kini)) set.add(kini)
  for (const r of rows || []) {
    if (String(r.guru_id || r.guruId || '') !== id) continue
    const p = String(r.tanggal || '').slice(0, 7)
    if (/^\d{4}-\d{2}$/.test(p)) set.add(p)
  }
  return [...set].sort((a, b) => b.localeCompare(a))
}
