// v.21.84.0527: Sorting santri konsisten — urut per lembaga lalu kelas lalu nama.
// Dipakai di semua halaman (SantriView, Rekap, Rapor, Absensi, dll).

// Urutan canonical lembaga (Qiraati dulu, lalu Sekolah, lalu non-utama). Lowercase keys.
// v.100: SUMBER TUNGGAL urutan lembaga (dipakai useLembaga + useGuru via lembagaRank).
//   Qiraati: TPQ Pagi → TPQ Sore → Pra PTPT → PTPT → PPPH
//   Sekolah: TK → SDI → PKBM (SMP/SMA = sub-tier PKBM)
const LEMBAGA_RANK = {
  // Qiraati
  'tpq pagi': 10,
  tpq: 11, // single (anggap setara TPQ Pagi)
  'tpq sore': 12,
  'pra ptpt': 20,
  ptpt: 30,
  ppph: 40,
  p3h: 40, // legacy = PPPH
  // Sekolah
  tk: 50,
  'tk a': 51,
  'tk b': 52,
  sdi: 60,
  pkbm: 70,
  smp: 70, // PKBM sub-tier SMP
  sma: 70, // PKBM sub-tier SMA
  // Non-utama (paling akhir)
  "ma'had": 80,
  mahad: 80,
  yayasan: 90,
  'sarana prasarana': 91
}

export function lembagaRank(lmb) {
  const k = String(lmb || '').toLowerCase().trim()
  return LEMBAGA_RANK[k] ?? 999
}

// Romawi → angka (I..XII)
const ROMAWI = {
  i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6,
  vii: 7, viii: 8, ix: 9, x: 10, xi: 11, xii: 12
}

// Ekstrak rank kelas (natural). Mendukung: Jilid 1-5, Level ½/1/1½/2/3 Juz,
// angka 1-6, Romawi I-XII, TK A/B, dll.
export function kelasRank(kelas) {
  const raw = String(kelas || '').toLowerCase().trim()
  if (!raw || raw === '-') return 9999
  // TK A/B
  if (raw === 'tk a' || raw === 'a') return 1
  if (raw === 'tk b' || raw === 'b') return 2
  // Romawi murni
  if (ROMAWI[raw] != null) return ROMAWI[raw]
  // Level ½ Juz / 1½ Juz → handle pecahan
  if (raw.includes('½') || raw.includes('1/2')) {
    if (raw.includes('1½') || raw.includes('1.5')) return 15 // 1.5 juz
    return 5 // ½ juz
  }
  // Angka pertama yang muncul
  const m = raw.match(/(\d+)/)
  if (m) return parseInt(m[1], 10) * 10 // *10 supaya tidak bentrok dgn level pecahan
  // fallback alfabetis
  return 5000 + raw.charCodeAt(0)
}

/**
 * Sort list santri: lembaga → kelas → nama.
 * @param {Array} list
 * @param {Object} opts { lembagaField, kelasField, byNama } default auto (lembaga/kelas; fallback lembaga_sekolah/kelas_sekolah).
 *   byNama=true (v.100 Batch10, permintaan kyai utk Data Santri): lembaga → nama A–Z (lewati tier kelas —
 *   kelas impor sering tidak seragam sehingga urutan tampak acak).
 */
export function sortSantri(list, opts = {}) {
  const lf = opts.lembagaField
  const kf = opts.kelasField
  const getLembaga = (s) => (lf ? s[lf] : (s.lembaga || s.lembaga_sekolah || ''))
  const getKelas = (s) => (kf ? s[kf] : (s.kelas || s.kelas_sekolah || ''))
  return [...(list || [])].sort((a, b) => {
    const lr = lembagaRank(getLembaga(a)) - lembagaRank(getLembaga(b))
    if (lr !== 0) return lr
    // kalau lembaga rank sama tapi string beda, urut alfabet lembaga
    const ls = String(getLembaga(a) || '').localeCompare(String(getLembaga(b) || ''))
    if (ls !== 0) return ls
    if (!opts.byNama) {
      const kr = kelasRank(getKelas(a)) - kelasRank(getKelas(b))
      if (kr !== 0) return kr
    }
    return String(a.nama || '').localeCompare(String(b.nama || ''), 'id')
  })
}

/**
 * v.100 Batch10: sort array NAMA lembaga (string) sesuai urutan canonical → dipakai
 * dropdown/filter lembaga di semua halaman (sebelumnya `.sort()` alfabetis = salah urut).
 */
export function sortLembagaNames(names) {
  return [...(names || [])].sort((a, b) => {
    const r = lembagaRank(a) - lembagaRank(b)
    if (r !== 0) return r
    return String(a || '').localeCompare(String(b || ''), 'id')
  })
}

/**
 * Sort list guru/pegawai: lembaga (Qiraati dulu) → nama A–Z.
 * Lembaga guru bisa dari `lembaga` (ngaji) atau `lembaga_sekolah` (formal).
 * @param {Array} list
 */
export function sortGuru(list) {
  const getLembaga = (g) => g.lembaga || g.lembaga_sekolah || ''
  return [...(list || [])].sort((a, b) => {
    const lr = lembagaRank(getLembaga(a)) - lembagaRank(getLembaga(b))
    if (lr !== 0) return lr
    const ls = String(getLembaga(a) || '').localeCompare(String(getLembaga(b) || ''))
    if (ls !== 0) return ls
    return String(a.nama || '').localeCompare(String(b.nama || ''), 'id')
  })
}
