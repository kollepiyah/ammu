// v.21.84.0527: Sorting santri konsisten — urut per lembaga lalu kelas lalu nama.
// Dipakai di semua halaman (SantriView, Rekap, Rapor, Absensi, dll).

// Urutan canonical lembaga (ngaji dulu, lalu formal). Lowercase keys.
const LEMBAGA_RANK = {
  'tpq pagi': 10,
  tpq: 11, // single (anggap setara TPQ Pagi)
  'tpq sore': 12,
  'pra ptpt': 20,
  ptpt: 30,
  ppph: 40,
  p3h: 40, // legacy = PPPH
  'tk a': 50,
  'tk b': 51,
  tk: 52,
  sdi: 60,
  smp: 70,
  pkbm: 75,
  sma: 80
}

function lembagaRank(lmb) {
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
 * @param {Object} opts { lembagaField, kelasField } default auto (lembaga/kelas; fallback lembaga_sekolah/kelas_sekolah)
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
    const kr = kelasRank(getKelas(a)) - kelasRank(getKelas(b))
    if (kr !== 0) return kr
    return String(a.nama || '').localeCompare(String(b.nama || ''))
  })
}
