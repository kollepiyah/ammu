// mesinDiam — kapan mesin HiView dianggap "diam" (tak mengirim apa pun ke server).
//
// v.1.4.6 gel. 3 (27 Sep 2026): mesin berhenti mengirim sejak Kamis 24 Sep 17:44 WIB dan baru
// ketahuan dua hari kemudian, lewat keluhan "guru sudah absen tapi terhitung alpa". Selama
// mesin diam, matriks tak bisa membedakan "guru tak datang" dari "mesin tak mengirim" —
// keduanya sel kosong. Jejak scan (hiview_scan_log) mencatat SETIAP kiriman yang sampai,
// termasuk event non-absen (pintu, exception), jadi kiriman terakhirnya adalah denyut mesin.
//
// Aturannya sengaja sempit, supaya tak menjadi alarm palsu yang lalu diabaikan:
//   · hanya di HARI KERJA — Ahad & libur memang sepi;
//   · hanya sesudah jam mulai shift paling awal + tenggang (bawaan 2 jam) — pagi buta sebelum
//     guru datang, "belum ada kiriman hari ini" itu wajar;
//   · dan kiriman terakhirnya terjadi SEBELUM hari ini.
// Mesin yang belum pernah mengirim sama sekali (jejak kosong) tak dianggap diam — mungkin memang
// tak dipakai. Jejak yang tak terbaca (tak berhak, tabel belum ada) juga tidak.
//
// PURE: "sekarang" masuk sebagai tanggal & jam WIB, bukan dibaca dari jam perangkat.

import { todayJakarta } from './format'
import { jamJakarta } from './shiftBerjalan'

function menit(hhmm) {
  const m = String(hhmm || '').match(/^(\d{1,2}):(\d{2})/)
  return m ? Number(m[1]) * 60 + Number(m[2]) : null
}

/** Selisih hari kalender dua tanggal ISO ('YYYY-MM-DD'), b − a. */
function selisihHari(a, b) {
  const t = (iso) => {
    const [y, m, d] = String(iso).split('-').map(Number)
    return Date.UTC(y, m - 1, d)
  }
  return Math.round((t(b) - t(a)) / 86400000)
}

/**
 * @param {object} p
 * @param {string|null} p.terakhir cap waktu kiriman terakhir (ISO ber-zona, mis. `created_at`
 *   hiview_scan_log); null = belum pernah / tak terbaca
 * @param {string} p.hariIni tanggal WIB 'YYYY-MM-DD'
 * @param {string} p.jamKini jam WIB 'HH:MM'
 * @param {boolean} p.hariKerja hari ini bukan Ahad / libur global
 * @param {string} [p.jamMulai] jam mulai shift paling awal 'HH:MM' ('' → 07:00)
 * @param {number} [p.tenggangMenit=120]
 * @returns {{ diam: boolean, sejakTanggal: string, sejakJam: string, hari: number }}
 *   `sejak*` = waktu WIB kiriman terakhir ('' bila tak ada); `hari` = umurnya dalam hari kalender
 */
export function nilaiMesinDiam({
  terakhir,
  hariIni,
  jamKini,
  hariKerja,
  jamMulai = '',
  tenggangMenit = 120
}) {
  const kosong = { diam: false, sejakTanggal: '', sejakJam: '', hari: 0 }
  if (!terakhir) return kosong
  const t = new Date(terakhir)
  if (isNaN(t.getTime())) return kosong
  const sejakTanggal = todayJakarta(t)
  const sejakJam = jamJakarta(t)
  const hari = hariIni && sejakTanggal ? Math.max(0, selisihHari(sejakTanggal, hariIni)) : 0
  const info = { sejakTanggal, sejakJam, hari }
  const kini = menit(jamKini)
  const batas = (menit(jamMulai) ?? 7 * 60) + tenggangMenit
  const diam = !!hariKerja && kini !== null && kini >= batas && sejakTanggal < hariIni
  return { diam, ...info }
}
