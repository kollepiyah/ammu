// v.1.1.9 — Masa tempuh juz PTPT: berapa HARI EFEKTIF dilalui santri antara lulus
//   juz sebelumnya dan lulus juz yang baru dites.
//
// Keputusan Kyai (21 Jul 2026, direvisi 22 Jul):
//   - "hari aktif" = HARI EFEKTIF LEMBAGA: hari kalender dikurangi libur mingguan
//     (AHAD/Minggu — dulu Jumat) dan tanggal libur di Kalender Kegiatan.
//     BUKAN hari hadir santri — absensi ngaji cuma tersimpan per BULAN
//     (absensi_santri_ngaji_bulanan), jadi angka per-santri hanya bisa ditaksir
//     prorata. Hari efektif persis per-hari dan sama untuk semua santri.
//   - Rentang: tgl lulus juz LAMA → tgl lulus juz INI (tes_kenaikan.tgl_hasil).
//   - Juz PERTAMA (belum ada lulus sebelumnya) → null, ditampilkan "—".
//     Sengaja tidak jatuh ke tgl_masuk: untuk santri pindahan angkanya menyesatkan.
//
// Angkanya DIHITUNG SAAT DITAMPILKAN, tidak disimpan di baris tes_kenaikan —
// supaya langsung berlaku untuk data tes lama. Konsekuensinya: menyunting libur di
// Kalender Kegiatan menggeser sedikit masa tempuh lama. Itu diterima.
//
// MURNI (tanpa I/O) supaya gampang diuji.

const norm = (v) =>
  String(v ?? '')
    .trim()
    .toLowerCase()

// Guard data ngawur (tgl_hasil salah ketik) supaya loop tak jalan bertahun-tahun.
export const MAX_HARI = 366 * 5

function toParts(iso) {
  const m = String(iso ?? '')
    .slice(0, 10)
    .match(/^(\d{4})-(\d{2})-(\d{2})$/)
  return m ? { y: +m[1], mo: +m[2], d: +m[3] } : null
}

function isoOf(dt) {
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(
    dt.getDate()
  ).padStart(2, '0')}`
}

/**
 * Jumlah hari efektif antara dua tanggal. Hari `tglAwal` TIDAK dihitung (eksklusif,
 * itu hari lulus juz sebelumnya); `tglAkhir` dihitung (inklusif).
 *
 * @param {string} tglAwal  - 'YYYY-MM-DD' (boleh ISO penuh, di-slice).
 * @param {string} tglAkhir - 'YYYY-MM-DD'.
 * @param {Object} opts - { libur: Set<'YYYY-MM-DD'>, liburMingguan: boolean }.
 *   v.1.2.1: libur mingguan = AHAD/Minggu (dulu Jumat). liburMingguan default TRUE.
 * @returns {number|null} null bila tanggal tak terbaca.
 */
export function hariEfektif(tglAwal, tglAkhir, opts = {}) {
  const a = toParts(tglAwal)
  const b = toParts(tglAkhir)
  if (!a || !b) return null
  const libur = opts.libur instanceof Set ? opts.libur : new Set(opts.libur || [])
  const liburMingguan = opts.liburMingguan !== false
  const cur = new Date(a.y, a.mo - 1, a.d)
  const end = new Date(b.y, b.mo - 1, b.d)
  if (end <= cur) return 0
  cur.setDate(cur.getDate() + 1) // eksklusif hari lulus juz sebelumnya
  let n = 0
  let guard = 0
  while (cur <= end && guard++ < MAX_HARI) {
    const ahad = cur.getDay() === 0 // v.1.2.1: Ahad/Minggu libur mingguan (dulu Jumat)
    if (!(liburMingguan && ahad) && !libur.has(isoOf(cur))) n++
    cur.setDate(cur.getDate() + 1)
  }
  return n
}

/** Riwayat ajuan LULUS jenis juz milik 1 santri PTPT, urut tgl_hasil menaik. */
export function riwayatLulusJuz(ajuanList, santriId) {
  const sid = String(santriId ?? '')
  if (!sid) return []
  return (ajuanList || [])
    .filter(
      (a) =>
        String(a?.santri_id ?? '') === sid &&
        norm(a?.status) === 'lulus' &&
        norm(a?.lembaga) === 'ptpt' &&
        norm(a?.jenis) === 'juz' &&
        toParts(a?.tgl_hasil)
    )
    .sort((x, y) => String(x.tgl_hasil).localeCompare(String(y.tgl_hasil)))
}

/**
 * Masa tempuh 1 ajuan tes juz yang SUDAH lulus.
 * @returns {{hari,dari,sampai,juz_dari,juz_sampai}|null} null = juz pertama /
 *          belum lulus / tanggal tak terbaca → UI menampilkan "—".
 */
export function masaTempuhJuz(ajuanList, ajuan, opts = {}) {
  if (!ajuan || norm(ajuan.status) !== 'lulus') return null
  const sampai = String(ajuan.tgl_hasil ?? '').slice(0, 10)
  if (!toParts(sampai)) return null
  const sebelum = riwayatLulusJuz(ajuanList, ajuan.santri_id).filter(
    (a) => String(a.id) !== String(ajuan.id) && String(a.tgl_hasil).slice(0, 10) < sampai
  )
  const prev = sebelum[sebelum.length - 1]
  if (!prev) return null // juz pertama — tak ada pembanding
  const dari = String(prev.tgl_hasil).slice(0, 10)
  return {
    hari: hariEfektif(dari, sampai, opts),
    dari,
    sampai,
    juz_dari: prev.target || prev.juz_asal || '',
    juz_sampai: ajuan.target || ajuan.juz_asal || ''
  }
}

/** Teks siap tampil, mis. "87 hari aktif". '—' bila tak ada pembanding. */
export function labelMasaTempuh(mt) {
  return mt && Number.isFinite(mt.hari) ? `${mt.hari} hari aktif` : '—'
}
