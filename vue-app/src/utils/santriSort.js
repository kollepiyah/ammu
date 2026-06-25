// v.110.0625: Pengurutan santri & guru — SUMBER TUNGGAL (dipakai semua halaman).
//   Santri : lembaga → kelas → USIA (muda→tua, lahir terbaru di atas) → nama (fallback).
//   Guru   : Qiraati (TPQ Pagi→PPPH) → Sekolah (TK→PKBM) → Pegawai → nama A–Z.
//
// Urutan canonical lembaga (Qiraati dulu, lalu Sekolah, lalu non-utama). Lowercase keys.
// v.100: SUMBER TUNGGAL urutan lembaga (dipakai useLembaga + useGuru via lembagaRank).
//   Qiraati: TPQ Pagi → TPQ Sore → Pra PTPT → PTPT → PPPH
//   Sekolah: TK → SDI → PKBM (SMP/SMA = sub-tier PKBM) → Lulus Sekolah
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
  // v.110: Lulus Sekolah (tamat formal) — paling akhir tier Sekolah
  'lulus sekolah': 75,
  lulus: 75,
  'tamat sekolah': 75,
  alumni: 75,
  // Non-utama (paling akhir)
  "ma'had": 80,
  mahad: 80,
  yayasan: 90,
  'sarana prasarana': 91
}

export function lembagaRank(lmb) {
  const k = String(lmb || '')
    .toLowerCase()
    .trim()
  return LEMBAGA_RANK[k] ?? 999
}

// Romawi → angka (I..XII) — SDI I-VI, PKBM VII-XII
const ROMAWI = {
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
  viii: 8,
  ix: 9,
  x: 10,
  xi: 11,
  xii: 12
}

// Ekstrak rank kelas (natural) — DIPAKAI DI DALAM satu lembaga (lembagaRank sudah pisahkan grup).
// Urutan yang dijamin per lembaga:
//   TPQ      : Jilid 1..5 (10..50) → KPI (60) → PK/Khotaman (70)
//   Pra PTPT : Level 1..5 (1..5)   — by NOMOR level (abaikan teks "½ Juz" dst)
//   PTPT     : Kelas 1..6 (10..60) — Juz mengikuti kelas
//   PPPH     : Level 1..4 (1..4)   — by NOMOR level (abaikan nama kitab)
//   TK       : TK A (1) → TK B (2)
//   SDI      : I..VI (1..6)        PKBM: VII..XII (7..12)
//   Lulus    : paling akhir (9000)
export function kelasRank(kelas) {
  const raw = String(kelas || '')
    .toLowerCase()
    .trim()
  if (!raw || raw === '-') return 9999

  // --- Sekolah TK ---
  if (raw === 'tk a' || raw === 'a') return 1
  if (raw === 'tk b' || raw === 'b') return 2

  // --- Lulus / tamat / alumni → paling akhir (sebelum unknown) ---
  if (raw.includes('lulus') || raw.includes('tamat') || raw.includes('alumni')) return 9000

  // --- Qiraati TPQ ceremonial (setelah Jilid 1-5): KPI lalu PK/Khotaman ---
  if (raw === 'kpi' || raw.includes('imtas')) return 60
  if (raw === 'pk' || raw.includes('khotam') || raw.includes('persiapan')) return 70

  // --- Level N (Pra PTPT & PPPH): urut by NOMOR Level, abaikan teks Juz/Kitab/pecahan ½ ---
  const lvl = raw.match(/level\s*(\d+)/)
  if (lvl) return parseInt(lvl[1], 10)

  // --- Romawi murni (SDI I-VI, PKBM VII-XII) ---
  if (ROMAWI[raw] != null) return ROMAWI[raw]

  // --- "Kelas N" / "Jilid N" / "NA/NB/NC" / angka pertama ---
  const m = raw.match(/(\d+)/)
  if (m) {
    const n = parseInt(m[1], 10)
    // suffix huruf A/B/C (mis. 1A/1B/5B) → sub-urut di dalam jilid yang sama
    const suf = raw.match(/(\d+)\s*([a-c])\b/)
    const sub = suf ? suf[2].charCodeAt(0) - 96 : 0 // a→1 b→2 c→3
    return n * 10 + sub
  }

  // fallback alfabetis (sebelum 'lulus' & unknown)
  return 8000 + raw.charCodeAt(0)
}

// v.110: kunci urut USIA — angka YYYYMMDD dari tgl_lahir. 0 bila invalid (ditaruh paling akhir).
// Toleran 'YYYY-MM-DD' (internal) & 'DD/MM/YYYY' (data lama). Tidak parse string usia ("Xth Ybln").
function birthKey(s) {
  const t = String((s && s.tgl_lahir) || '').trim()
  let y, m, d
  let mt = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
  if (mt) {
    y = +mt[1]
    m = +mt[2]
    d = +mt[3]
  } else {
    mt = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/)
    if (mt) {
      d = +mt[1]
      m = +mt[2]
      y = +mt[3]
    }
  }
  if (!y || !m || !d || y < 1901) return 0
  return y * 10000 + m * 100 + d
}

// Pembanding USIA: muda → tua (lahir TERBARU di atas). tgl_lahir invalid → paling akhir.
function cmpUsia(a, b) {
  const ba = birthKey(a)
  const bb = birthKey(b)
  if (ba === bb) return 0
  if (ba === 0) return 1 // a tanpa tgl lahir → setelah b
  if (bb === 0) return -1 // b tanpa tgl lahir → setelah a
  return bb - ba // lebih besar (lahir lebih baru = lebih muda) dulu
}

/**
 * Sort list santri: lembaga → kelas → USIA (muda→tua) → nama.
 * @param {Array} list
 * @param {Object} opts { lembagaField, kelasField } default auto (lembaga/kelas; fallback lembaga_sekolah/kelas_sekolah).
 *   v.110: tier akhir = USIA (permintaan kyai "semua santri urut sesuai usia"), nama hanya fallback
 *   bila usia sama / tgl_lahir kosong. (Opsi byNama lama dihapus — Data Santri ikut aturan usia.)
 */
export function sortSantri(list, opts = {}) {
  const lf = opts.lembagaField
  const kf = opts.kelasField
  const getLembaga = (s) => (lf ? s[lf] : s.lembaga || s.lembaga_sekolah || '')
  const getKelas = (s) => (kf ? s[kf] : s.kelas || s.kelas_sekolah || '')
  return [...(list || [])].sort((a, b) => {
    const lr = lembagaRank(getLembaga(a)) - lembagaRank(getLembaga(b))
    if (lr !== 0) return lr
    // lembaga rank sama tapi string beda → urut alfabet lembaga
    const ls = String(getLembaga(a) || '').localeCompare(String(getLembaga(b) || ''))
    if (ls !== 0) return ls
    const kr = kelasRank(getKelas(a)) - kelasRank(getKelas(b))
    if (kr !== 0) return kr
    // v.110: di dalam kelas → urut USIA (muda→tua)
    const ur = cmpUsia(a, b)
    if (ur !== 0) return ur
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
 * v.110: Rank urut GURU/PEGAWAI.
 *   Pengajar (guru / dual-role / jabatan tambahan guru) → ikut lembaga ngaji/sekolah (Qiraati dulu).
 *   Pegawai MURNI (tipe_pegawai='pegawai', bukan pengajar) → grup terakhir (900), setelah semua guru.
 */
export function guruRank(g) {
  const tipe = String((g && (g.tipe_pegawai || g.tipe)) || 'guru').toLowerCase()
  const isPurePegawai = tipe.includes('pegawai') && !tipe.includes('guru')
  if (isPurePegawai) return 900
  return lembagaRank((g && (g.lembaga || g.lembaga_sekolah)) || '')
}

/**
 * Sort list guru/pegawai: Qiraati (TPQ Pagi→PPPH) → Sekolah (TK→PKBM) → Pegawai → nama A–Z.
 * @param {Array} list
 */
export function sortGuru(list) {
  return [...(list || [])].sort((a, b) => {
    const r = guruRank(a) - guruRank(b)
    if (r !== 0) return r
    return String(a.nama || '').localeCompare(String(b.nama || ''), 'id')
  })
}
