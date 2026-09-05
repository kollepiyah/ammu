// shiftBerjalan — "shift ini sudah dimulai belum?" untuk HARI INI.
//
// KYAI, 5 Sep 2026: "shift yg belum dimulai jangan dihitung alpa."
//
// SEBABNYA. Sampai v.1.4.1 alpa disimpulkan dari perbandingan TANGGAL saja
// (`iso <= hariIni`). Tanggal tak punya jam, jadi begitu hari ini dimulai, SELURUH shift
// hari ini langsung dianggap "sudah lewat" — termasuk shift Sore yang baru buka pukul
// 15:00. Akibatnya tiap pagi rekap absen menampilkan sebaris 'A' merah untuk shift yang
// belum sempat dijalani siapa pun, dan angkanya baru betul sesudah maghrib. Itu bukan
// sekadar salah tampil: kolom A yang sama dibaca Excel, PDF, dan kartu "kehadiran saya"
// milik guru — jadi guru melihat dirinya alpa atas shift yang belum dimulai.
//
// ATURANNYA, dan kenapa persis begini:
//   · tanggal LAMPAU        → boleh alpa (tak berubah)
//   · tanggal DEPAN         → tak pernah alpa (tak berubah)
//   · HARI INI              → boleh alpa hanya bila jam sekarang ≥ jam MULAI shift
//
// Batasnya sengaja `mulai`, BUKAN `selesai`: yang Kyai keluhkan adalah shift yang belum
// dimulai. Sesudah shift berjalan, sel kosong memang pantas merah — guru yang datang
// terlambat akan menghapusnya sendiri begitu scan-nya masuk, dan menunda alpa sampai
// shift bubar justru menyembunyikan yang benar-benar tidak datang sampai malam hari.
//
// Shift yang jam mulainya BELUM DIATUR ('') berlaku seperti dulu (boleh alpa sejak
// tengah malam). Menebak jam untuknya berarti membebaskan alpa yang seharusnya ada, dan
// "tak diketahui" tak boleh diam-diam berarti "belum mulai" — lihat pola yang sama di
// utils/lembagaShift.
//
// Semua fungsi PURE; `settings` & jam di-suntik eksplisit supaya bisa diuji tanpa jam
// dinding sungguhan.

import { normHHMM, shiftList } from './shiftMaster'
import { shiftWindow } from './shiftDerive'

/**
 * Jam dinding Asia/Jakarta 'HH:MM'.
 *
 * Padanan `todayJakarta` untuk sisi JAM, dan ada alasannya berdampingan: memakai jam
 * lokal perangkat berarti laptop yang zonanya WITA menilai shift sudah mulai satu jam
 * lebih awal. Absensi pesantren ini seluruhnya WIB.
 */
export function jamJakarta(d = new Date()) {
  const dt = d instanceof Date ? d : new Date(d)
  if (isNaN(dt.getTime())) return ''
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(dt)
  const p = Object.fromEntries(parts.map((x) => [x.type, x.value]))
  return normHHMM(`${p.hour}:${p.minute}`) || ''
}

/** Jam mulai EFEKTIF sebuah shift ('HH:MM'), '' bila belum diatur.
 *  Lewat `shiftWindow` supaya shift pegawai yang jamnya dikosongkan tetap menumpang
 *  jam shift guru pasangannya — persis seperti saat menurunkan shift dari jam scan. */
export function jamMulaiShift(shiftId, settings) {
  return normHHMM(shiftWindow(shiftId, settings)?.mulai) || ''
}

/**
 * Sudah bolehkah slot (tanggal × shift) dinilai ALPA saat kosong?
 *
 * @param {string} iso      tanggal slot 'YYYY-MM-DD'
 * @param {string} hariIni  tanggal hari ini WIB 'YYYY-MM-DD'
 * @param {string} jamKini  jam sekarang WIB 'HH:MM'
 * @param {string} jamMulai jam mulai shift 'HH:MM' ('' = belum diatur → perilaku lama)
 */
export function slotBolehAlpa(iso, hariIni, jamKini, jamMulai) {
  const t = String(iso || '').slice(0, 10)
  const h = String(hariIni || '').slice(0, 10)
  if (t.length !== 10 || h.length !== 10) return false
  if (t < h) return true
  if (t > h) return false
  const mulai = normHHMM(jamMulai)
  if (!mulai) return true // jam shift belum diatur → seperti sebelum v.1.4.2
  const kini = normHHMM(jamKini)
  if (!kini) return true // jam tak terbaca → jangan menghapus alpa yang sah
  return kini >= mulai
}

/** Id shift yang BELUM dimulai pada `jamKini` — TERURUT, jadi bisa dibandingkan. */
export function shiftBelumMulai(settings, jamKini) {
  const kini = normHHMM(jamKini)
  if (!kini) return []
  return shiftList(settings)
    .filter((sh) => {
      const mulai = jamMulaiShift(sh.id, settings)
      return !!mulai && kini < mulai
    })
    .map((sh) => String(sh.id))
    .sort()
}

/**
 * Kunci STRING dari daftar shift yang belum dimulai, mis. 'pegawai_sore|sore'.
 *
 * Dipakai sebagai isi sebuah `ref` yang didenyutkan semenit sekali di AbsensiGuruView.
 * Kenapa string dan bukan Set: menetapkan nilai yang SAMA ke ref tidak memicu apa pun di
 * Vue, sedangkan Set baru selalu dianggap berubah. Dengan kunci ini denyut menit hanya
 * benar-benar merakit ulang matriks pada saat sebuah shift memang dibuka — beberapa kali
 * sehari, bukan 1.440 kali. (Matriks 120 guru × 30 hari = 6.000 sel; lihat catatan
 * kinerja v.1.4.0 di utils/absensiMatriks.)
 */
export function kunciBelumMulai(settings, jamKini) {
  return shiftBelumMulai(settings, jamKini).join('|')
}

/** Kebalikan `kunciBelumMulai` — kunci string → Set id shift. */
export function setDariKunci(kunci) {
  const s = String(kunci || '')
  return new Set(s ? s.split('|').filter(Boolean) : [])
}
