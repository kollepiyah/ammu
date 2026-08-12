// ============================================================================
// Tes Sekolah — logika murni (tanpa DB, tanpa Vue) supaya bisa diuji sendiri.
//
// Bedanya dengan Tes Kenaikan (Qiraati): pengujinya GURU TERTENTU yang ditunjuk
// admin per materi — bukan kepala sekolah. Hasilnya jadi catatan di Ammu; nilai rapor
// SEKOLAH diinput wali kelas di luar aplikasi (Ammu hanya punya rapor Qiraati & Diniyah).
//
// Materi tes disimpan di master key='materi_tes':
//   { items: [{ id, nama, aktif, lembaga_sekolah, kelas[], penguji[], nilai_maks,
//               nilai_min_lulus }] }
// `kelas: []` berarti BERLAKU UNTUK SEMUA KELAS di lembaga itu.
// ============================================================================
import { ownsSekolah } from '@/utils/guruScope'

export const NILAI_MAKS_DEFAULT = 100
export const NILAI_MIN_LULUS_DEFAULT = 70

function teks(v) {
  return String(v ?? '').trim()
}

/**
 * Bandingkan nama lembaga/kelas: case-insensitive DI KEDUA SISI.
 *
 * Bukan kerapian belaka — lembaga sekolah kustom ditulis Kyai sendiri dengan
 * kapitalisasi bebas ("Kelas Baca", "kelas baca"), dan penyaring yang membandingkan
 * mentah-mentah pernah membuat daftar KOSONG tanpa pesan galat apa pun. Kalau ada
 * laporan "filter lembaga kosong padahal santrinya ada", curigai ini lebih dulu.
 */
function samaTeks(a, b) {
  return teks(a).toLowerCase() === teks(b).toLowerCase()
}

/** Baca daftar materi dari dokumen master, tahan bentuk lama/rusak. */
export function bacaMateriTes(doc) {
  const raw = Array.isArray(doc?.items) ? doc.items : []
  return raw
    .filter((it) => it && teks(it.nama))
    .map((it) => ({
      id: teks(it.id) || teks(it.nama).toLowerCase().replace(/\s+/g, '_'),
      nama: teks(it.nama),
      aktif: it.aktif !== false,
      lembaga_sekolah: teks(it.lembaga_sekolah),
      kelas: Array.isArray(it.kelas) ? it.kelas.map(teks).filter(Boolean) : [],
      penguji: Array.isArray(it.penguji) ? it.penguji.map(teks).filter(Boolean) : [],
      nilai_maks: Number(it.nilai_maks) > 0 ? Number(it.nilai_maks) : NILAI_MAKS_DEFAULT,
      nilai_min_lulus:
        Number(it.nilai_min_lulus) >= 0 ? Number(it.nilai_min_lulus) : NILAI_MIN_LULUS_DEFAULT
    }))
}

/** Materi ini berlaku untuk santri ini? (lembaga sekolah + kelas) */
export function materiBerlakuUntuk(materi, santri) {
  if (!materi || !santri) return false
  if (materi.aktif === false) return false
  if (!samaTeks(materi.lembaga_sekolah, santri.lembaga_sekolah)) return false
  // Daftar kelas kosong = seluruh kelas di lembaga itu.
  const kelas = Array.isArray(materi.kelas) ? materi.kelas.filter(Boolean) : []
  if (kelas.length === 0) return true
  return kelas.some((k) => samaTeks(k, santri.kelas_sekolah))
}

/** Semua materi yang bisa diajukan untuk santri ini. */
export function materiUntukSantri(materiList, santri) {
  return (materiList || []).filter((m) => materiBerlakuUntuk(m, santri))
}

/** Guru ini ditunjuk sebagai penguji di materi mana saja? */
export function materiSayaSebagaiPenguji(materiList, guruId) {
  const gid = teks(guruId)
  if (!gid) return []
  return (materiList || []).filter(
    (m) => m.aktif !== false && (m.penguji || []).some((p) => teks(p) === gid)
  )
}

/**
 * Angka dari input, atau null kalau bukan angka.
 *
 * JANGAN ganti dengan Number() telanjang: `Number('')` dan `Number('   ')` sama-sama
 * bernilai 0 — yang finite — sehingga kolom nilai yang DIBIARKAN KOSONG lolos
 * validasi dan tersimpan sebagai 0. Lebih buruk lagi, pada materi ber-ambang 0 itu
 * berarti santri LULUS tanpa pernah dinilai. Ditemukan oleh tes, bukan di produksi.
 */
function angka(v) {
  if (v === null || v === undefined) return null
  if (typeof v === 'string' && v.trim() === '') return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

/**
 * Lulus atau tidak. Ambang diambil dari materi; `nilai` kosong/bukan angka = TIDAK
 * lulus (bukan lulus-diam-diam) supaya salah ketik tak pernah meluluskan orang.
 */
export function hitungLulus(nilai, materi) {
  const n = angka(nilai)
  if (n === null) return false
  const min = angka(materi?.nilai_min_lulus)
  return n >= (min === null ? NILAI_MIN_LULUS_DEFAULT : min)
}

/** Nilai masih di rentang yang wajar untuk materi ini? */
export function nilaiValid(nilai, materi) {
  const n = angka(nilai)
  if (n === null) return false
  const maks = angka(materi?.nilai_maks)
  return n >= 0 && n <= (maks !== null && maks > 0 ? maks : NILAI_MAKS_DEFAULT)
}

/**
 * Boleh melihat sisi "Sekolah" dari Tes Kenaikan?
 *
 * Inilah "hanya muncul di guru sekolah yang ada fitur tersebut" — tiga pintu:
 *   1. admin penuh (super_admin/admin) — selalu;
 *   2. guru yang DITUNJUK sebagai penguji di suatu materi aktif;
 *   3. wali kelas sekolah — dideteksi dari assignment santri (guru_sekolah[]),
 *      bukan dari field baru di data guru.
 * Guru ngaji murni tak lolos satu pun, jadi saklarnya tak muncul untuknya.
 *
 * CATATAN: ini gerbang TAMPILAN. Wewenang sebenarnya ditegakkan RLS
 * (auth_is_wali_sekolah_santri & auth_is_penguji_materi) — keduanya sengaja
 * dibentuk sepasang dengan fungsi ini.
 */
export function bolehTesSekolah(sesi, materiList, santriList) {
  if (!sesi) return false
  if (sesi.id === 'admin' || ['super_admin', 'admin'].includes(sesi.role_sistem)) return true
  const gid = teks(sesi.guru_id || sesi.id)
  if (materiSayaSebagaiPenguji(materiList, gid).length > 0) return true
  const nama = sesi.guru || sesi.nama || ''
  if (!teks(nama)) return false
  return (santriList || []).some((s) => ownsSekolah(s, nama))
}

/**
 * Scope layar Tes Sekolah untuk satu sesi.
 * Padanan scopeQiraati (utils/guruScope.js) tapi bertumpu pada guru_sekolah[].
 *   - adminPenuh : super_admin/admin — lihat & nilai semuanya
 *   - lihat(s)   : wali kelas sekolah santri itu, ATAU penguji yang menilainya
 *   - ajukan(s)  : HANYA wali kelas sekolah santri itu
 */
export function scopeSekolah(sesi, materiList) {
  const nama = sesi?.guru || sesi?.nama || ''
  const gid = teks(sesi?.guru_id || sesi?.id)
  const adminPenuh =
    !!sesi && (sesi.id === 'admin' || ['super_admin', 'admin'].includes(sesi.role_sistem))
  const penguji = materiSayaSebagaiPenguji(materiList, gid)
  return {
    adminPenuh,
    gid,
    nama,
    isPenguji: penguji.length > 0,
    materiPenguji: penguji,
    ajukan(s) {
      if (adminPenuh) return true
      return ownsSekolah(s, nama)
    },
    lihat(s) {
      if (adminPenuh) return true
      if (ownsSekolah(s, nama)) return true
      return penguji.length > 0
    }
  }
}
