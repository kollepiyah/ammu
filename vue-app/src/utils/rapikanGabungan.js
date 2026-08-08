// rapikanGabungan — memilah tagihan ngaji yang KINI sudah menempel ke jenis lain.
//
// PERSOALAN (Kyai, 8 Agu 2026): "tagihan qiraati pagi yg sudah digabung dengan syahriyah
//   TK-SDI-PKBM ... kenapa tadi saya cek akun santri, tagihannya masih muncul sebagai belum
//   bayar? harusnya kan sudah lunas."
//
// Penggabungan hanya mengatur tagihan yang AKAN terbit: sejak `gabung_ke` disetel, jenis
// ngaji tak diterbitkan lagi sendiri karena nominalnya sudah masuk ke syahriyah sekolah.
// Tapi tagihan yang TERLANJUR terbit sebelum itu tetap duduk di database sebagai tunggakan,
// dan wali melihatnya sebagai utang yang tak pernah bisa ia bayar dua kali.
//
// ⚠️ "Tandai lunas" SALAH: uangnya tak pernah masuk lewat baris itu, dan menandainya lunas
// akan memunculkan pemasukan hantu di Buku Induk. Yang benar tagihannya DIHAPUS — ia memang
// tak seharusnya pernah ada.
//
// ⚠️ Tapi tak semuanya boleh dihapus. Dua jebakan yang membuat util ini memilah, bukan
// menyapu rata:
//   1. Tagihan ngaji yang SUDAH ADA PEMBAYARANNYA — menghapusnya menghilangkan jejak uang
//      yang benar-benar diterima.
//   2. Tagihan sekolah pasangannya belum memuat komponen ngaji (terbit sebelum gabungan
//      disetel, nominalnya masih tarif lama). Menghapus tagihan ngajinya di situ =
//      menghapus pemasukan yang SAH; yang benar tagihan sekolahnya diperbarui dulu.
//
// MURNI (tanpa I/O) supaya bisa diuji: keputusan yang menyentuh ratusan baris uang tak boleh
// hanya diverifikasi lewat klik.
import { gabungTargetFor } from './syahriyah'

const teks = (v) => String(v ?? '').trim()
const kunci = (v) => teks(v).toLowerCase()

/** Nama jenis pada satu baris tagihan (kategori → jenis_label → jenis_id). */
export function labelTagihan(t) {
  return kunci(t?.kategori || t?.jenis_label || t?.jenis_id)
}

/** Sudah ada uang masuk di tagihan ini? Kolom `terbayar` = sumber kebenaran (v.1.1.8). */
export function sudahAdaBayar(t) {
  const nyata = Number(t?.terbayar)
  if (Number.isFinite(nyata) && nyata > 0) return true
  // Cadangan utk baris lawas yang `terbayar`-nya belum ter-backfill.
  const jsonb = t?.data?.bayar ?? t?.bayar
  if (Array.isArray(jsonb)) return jsonb.length > 0
  return Number(jsonb) > 0
}

/** Cocokkan jenis (dari settings) ke satu baris tagihan, lewat id ATAU label. */
function jenisDariTagihan(t, jenisList) {
  const k = labelTagihan(t)
  if (!k) return null
  return (jenisList || []).find((j) => kunci(j?.id) === k || kunci(j?.label) === k) || null
}

/**
 * Pilah tagihan yang jenisnya KINI menempel ke jenis lain.
 *
 * @param {Array} tagihanList baris `keuangan_tagihan` (idealnya sudah disaring per periode)
 * @param {Array} santriList  daftar santri (untuk menilai syarat gabungan per orang)
 * @param {Array} jenisList   daftar jenis pembayaran LENGKAP
 * @returns {{
 *   aman: Array,            // boleh dihapus: belum dibayar & tagihan tujuannya sudah memuat komponennya
 *   adaBayar: Array,        // JANGAN disentuh: sudah ada uang masuk
 *   targetBelumSiap: Array  // tagihan tujuannya belum memuat komponen ngaji (atau belum ada)
 * }} tiap entri: { tagihan, santri, jenis, target, alasan }
 */
export function pilahTagihanGabungan(tagihanList, santriList, jenisList) {
  const santriById = new Map((santriList || []).map((s) => [String(s?.id ?? ''), s]))
  const jenis = Array.isArray(jenisList) ? jenisList : []
  const out = { aman: [], adaBayar: [], targetBelumSiap: [] }

  // Indeks tagihan per (santri, periode) supaya pasangan targetnya bisa dicari cepat.
  const perSantriPeriode = new Map()
  for (const t of tagihanList || []) {
    const k = String(t?.santri_id ?? '') + '|' + teks(t?.periode)
    if (!perSantriPeriode.has(k)) perSantriPeriode.set(k, [])
    perSantriPeriode.get(k).push(t)
  }

  for (const t of tagihanList || []) {
    const s = santriById.get(String(t?.santri_id ?? ''))
    if (!s) continue // santri tak ditemukan → jangan sentuh apa pun
    const j = jenisDariTagihan(t, jenis)
    if (!j) continue // jenisnya tak dikenal → di luar urusan gabungan
    const target = gabungTargetFor(j, s, jenis)
    if (!target) continue // jenis ini memang berdiri sendiri untuk santri ini

    const entri = { tagihan: t, santri: s, jenis: j, target }
    if (sudahAdaBayar(t)) {
      out.adaBayar.push({ ...entri, alasan: 'Sudah ada pembayaran — jangan dihapus' })
      continue
    }

    // Tagihan tujuan di periode yang sama, dan apakah ia SUDAH memuat komponen jenis ini.
    const sekelompok =
      perSantriPeriode.get(String(t?.santri_id ?? '') + '|' + teks(t?.periode)) || []
    const barisTarget = sekelompok.find(
      (x) => labelTagihan(x) === kunci(target.label) || labelTagihan(x) === kunci(target.id)
    )
    const komponen = Array.isArray(barisTarget?.komponen)
      ? barisTarget.komponen
      : Array.isArray(barisTarget?.data?.komponen)
        ? barisTarget.data.komponen
        : []
    const termuat = komponen.some(
      (c) => kunci(c?.jenis_id) === kunci(j.id) || kunci(c?.label) === kunci(j.label)
    )
    if (!barisTarget) {
      out.targetBelumSiap.push({
        ...entri,
        alasan: `Tagihan "${target.label}" periode itu belum ada`
      })
    } else if (!termuat) {
      out.targetBelumSiap.push({
        ...entri,
        alasan: `Tagihan "${target.label}" belum memuat komponen ini (terbit sebelum digabung)`
      })
    } else {
      out.aman.push({ ...entri, alasan: `Sudah termasuk di "${target.label}"` })
    }
  }
  return out
}

/** Total nominal satu kelompok — dipakai ringkasan sebelum Kyai memutuskan. */
export function totalNominal(daftar) {
  return (daftar || []).reduce((a, e) => a + (Number(e?.tagihan?.nominal) || 0), 0)
}
