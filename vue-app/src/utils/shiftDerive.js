// shiftDerive — derivasi shift absensi guru/pegawai dari jam scan + master shift.
//
// SUMBER-KEBENARAN JS TUNGGAL untuk aturan shift. Dipakai AbsensiGuruView (UI) dan
// useFingerprintSync (sync mesin). Di-port ke Edge Function hiview-absen
// (supabase/functions/hiview-absen/shiftDerive.ts) + fp_sync.py (Python, luar repo) —
// bila file ini berubah, SINKRONKAN port-nya.
//
// Aturan shift = MILIK AMMU (master shift di settings, lihat shiftMaster.js); mesin
// cuma kirim timestamp. Scan TERAWAL in-window = jam masuk; jam > batas terlambat →
// 'terlambat' (tetap hadir). Semua fungsi PURE — `settings` di-pass eksplisit.

import { shiftList, normHHMM } from './shiftMaster'

export { normHHMM }

// Shift mana yang berlaku utk seorang guru/pegawai.
//   Sumber utama : g.shift_ids[] — pilihan EKSPLISIT, satu daftar untuk guru & pegawai.
//   Data lama    : tanpa shift_ids → diturunkan dari tipe_pegawai + shift/shift_pegawai.
// Shift yang sudah dihapus dari master otomatis gugur (di-filter ke daftar master).
export function shiftsForGuru(g, settings) {
  const list = shiftList(settings)
  const ids = Array.isArray(g?.shift_ids) ? g.shift_ids.map(String).filter(Boolean) : null
  if (ids && ids.length > 0) {
    return new Set(list.filter((sh) => ids.includes(sh.id)).map((sh) => sh.id))
  }
  return shiftsForGuruLegacy(g, list)
}

// Derivasi data LAMA (belum punya shift_ids). Meniru aturan v.99 PERSIS supaya
// absensi & bisyaroh guru yang belum disunting tidak berubah:
//   tipe guru    → g.shift (pagi/sore) + 'sekolah' bila punya lembaga_sekolah
//   tipe pegawai → g.shift dipakai sebagai shift KERJA
//   dual-role    → g.shift = shift ngaji, g.shift_pegawai = shift kerja
// Hanya mengenali 5 shift bawaan; shift buatan sendiri WAJIB lewat shift_ids.
function shiftsForGuruLegacy(g, list) {
  const punya = (id) => list.some((x) => x.id === id)
  const tipe = String(g?.tipe_pegawai || 'guru')
    .toLowerCase()
    .trim()
  const hasPegawai = tipe.includes('pegawai')
  const hasGuru = !hasPegawai || tipe.includes('guru')
  const shiftField = String(g?.shift || 'pagi_sore').toLowerCase()
  const hasSekolah = !!(g?.lembaga_sekolah && String(g.lembaga_sekolah).trim())
  const set = new Set()
  if (hasGuru && shiftField.includes('pagi') && punya('pagi')) set.add('pagi')
  if (hasGuru && shiftField.includes('sore') && punya('sore')) set.add('sore')
  if (hasGuru && hasSekolah && punya('sekolah')) set.add('sekolah')
  if (hasPegawai) {
    const sp = String((hasGuru ? g?.shift_pegawai : g?.shift) || 'pagi_sore').toLowerCase()
    if (sp.includes('pagi') && punya('pegawai_pagi')) set.add('pegawai_pagi')
    if (sp.includes('sore') && punya('pegawai_sore')) set.add('pegawai_sore')
  }
  return set
}

// Window jam 1 shift dari daftar master yang sudah dinormalisasi.
function windowFrom(id, list) {
  const sh = list.find((x) => x.id === String(id || ''))
  if (!sh) return { mulai: '', terlambat: '', selesai: '' }
  // Jam dikosongkan → ikut shift fallback (pegawai → jam guru pagi/sore).
  if (!sh.mulai && !sh.terlambat && sh.fallback) {
    const f = list.find((x) => x.id === sh.fallback)
    if (f) return { mulai: f.mulai, terlambat: f.terlambat, selesai: f.selesai }
  }
  return { mulai: sh.mulai, terlambat: sh.terlambat, selesai: sh.selesai }
}

// Window jam shift dari settings; jam pegawai kosong → fallback ke jam guru.
export function shiftWindow(shift, settings) {
  return windowFrom(shift, shiftList(settings))
}

// Batas terlambat ('HH:MM'): pakai 'terlambat', else 'mulai'. '' bila tak ada.
export function shiftBatas(shift, settings) {
  const w = shiftWindow(shift, settings)
  return w.terlambat || w.mulai || ''
}

// Derive shift utk jam scan 'HH:MM' + guru + settings. return id shift atau
// null (di luar semua window milik guru). Overlap → menang `urutan` terkecil.
export function deriveShift(hhmm, g, settings) {
  const t = normHHMM(hhmm)
  if (!t) return null
  const list = shiftList(settings) // sudah terurut `urutan`
  const milik = shiftsForGuru(g, settings)
  for (const sh of list) {
    if (!milik.has(sh.id)) continue
    const w = windowFrom(sh.id, list)
    if (w.mulai && w.selesai && w.mulai <= t && t <= w.selesai) return sh.id
  }
  return null
}

// Status hadir/terlambat dari jam scan vs batas shift.
export function statusFor(hhmm, shift, settings) {
  const t = normHHMM(hhmm)
  const batas = shiftBatas(shift, settings)
  return batas && t && t > batas ? 'terlambat' : 'hadir'
}

// ── ABSEN PULANG ─────────────────────────────────────────────────────────────
// Jeda minimum masuk → pulang (menit). Penjaga anti scan-dobel: mesin kerap
// merekam 2 verifikasi berdekatan saat masuk; tanpa jeda ini scan kedua langsung
// tercatat sebagai jam pulang. Tak ada shift AMMU yang lebih pendek dari ini.
export const MIN_JEDA_PULANG_MENIT = 30

// Baris hadir tanpa jam (input manual) — dianggap "sudah lama masuk" supaya tetap
// bisa menerima jam pulang, tapi kalah dari baris yang punya jam scan sungguhan.
const TANPA_JAM = -1

function menitOf(hhmm) {
  const t = normHHMM(hhmm)
  if (!t) return null
  return Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5))
}

/**
 * Shift mana yang DITINGGALKAN oleh sebuah scan pulang.
 *
 * Kenapa tidak cukup "scan di luar window masuk = pulang": window masuk sebuah
 * shift membentang `mulai`..`selesai` (supaya yang datang telat tetap tercatat
 * hadir), jadi scan pulang yang terjadi SEBELUM shift bubar masih jatuh di dalam
 * window-nya sendiri. Dulu scan seperti itu dibuang (kalah dari scan terawal) →
 * baris tetap "belum pulang" padahal gurunya sudah ceklok. (Kyai, 22 Jul 2026)
 *
 * Aturan sekarang: pulang menempel ke shift yang PALING BELAKANGAN dimasuki dan
 * jam masuknya sudah lewat ≥ MIN_JEDA_PULANG_MENIT. Jam `selesai` shift TIDAK
 * lagi jadi syarat — pulang lebih awal pun tercatat.
 *
 * @param {string} hhmm jam scan pulang ('HH:MM')
 * @param {Array<{shift:string,jam:string,status:string}>} barisMasuk baris absensi
 *   guru itu pada TANGGAL yang sama (semua shift miliknya).
 * @param {object} settings
 * @returns {string[]} id shift sasaran. Biasanya 1; lebih dari 1 hanya bila
 *   beberapa shift punya jam masuk identik — mis. baris gabungan yang menyalin
 *   jam scan ngaji pagi ke shift sekolah, yang memang ditinggalkan bersamaan.
 */
export function pilihShiftPulang(hhmm, barisMasuk, settings) {
  const t = menitOf(hhmm)
  if (t == null) return []
  const list = shiftList(settings)
  const kandidat = []
  for (const b of barisMasuk || []) {
    const sh = String(b?.shift || '').toLowerCase()
    if (!sh || !list.some((x) => x.id === sh)) continue
    const st = String(b?.status || 'hadir').toLowerCase()
    if (st !== 'hadir' && st !== 'terlambat') continue // izin/sakit/cuti/alpa tak punya pulang
    const jam = String(b?.jam || '').trim()
    const masuk = jam ? menitOf(jam) : TANPA_JAM
    if (masuk == null) continue
    if (t - masuk < MIN_JEDA_PULANG_MENIT) continue // scan dobel / scan sebelum masuk
    kandidat.push({ shift: sh, masuk })
  }
  if (!kandidat.length) return []
  const terakhir = Math.max(...kandidat.map((k) => k.masuk))
  return [...new Set(kandidat.filter((k) => k.masuk === terakhir).map((k) => k.shift))]
}
