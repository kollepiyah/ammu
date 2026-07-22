// jenjangQiraati — rantai lembaga qiraati + deteksi "sudah di jenjang terakhir".
//
// Kyai (22 Jul 2026): "jika santri diajukan tes di jenjang/level/jilid/kelas paling
//   akhir di lembaga tersebut maka naiknya adalah ke lembaga selanjutnya."
//   Urutan: TPQ Pagi/Sore → Pra PTPT → PTPT → PPPH (ujung).
//
// DUA SYARAT harus terpenuhi, bukan satu:
//   1. kelas asalnya = jenjang TERAKHIR lembaga itu, DAN
//   2. target tesnya = item TERAKHIR di jenjang itu.
// Contoh Kyai: 'Pra PTPT · Level 3 Juz' (jenjang terakhir) + 'Khotam IX' (khotam
// terakhir level itu) → naik ke PTPT. Kalau ia baru Khotam V, ia TETAP di Level 3 Juz.
//
// Dua sumber nama jenjang sengaja dipisah karena bentuk labelnya memang beda:
//   master/lembaga.kelas_list  : 'Level ½ Juz' … 'Level 3 Juz'   (dipakai santri.kelas)
//   settings.kartuKenaikanSchema: 'Level 1 (½ Juz)' … 'Level 5 (3 Juz)' (kartu)
// URUTANNYA sama, jadi keduanya dijodohkan lewat INDEX, bukan lewat label.
//
// Semua fungsi PURE — `lembagaList` & `settings` di-pass eksplisit.
import { getKartuKenaikanSchema } from './kenaikan'

const _norm = (v) =>
  String(v ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')

// Buang awalan penanda supaya 'Khotam IX' ≡ 'IX' dan 'Kelas 3' ≡ '3'.
const _inti = (v) => _norm(v).replace(/^(khotam|juz|kelas|level|jilid)\s+/, '')

// Rantai lembaga qiraati. master/lembaga TIDAK punya field urutan (sudah diperiksa
// di data: semua `urutan` kosong), jadi urutan ini ditulis di sini sesuai keputusan
// Kyai. PPPH = ujung rantai → tak punya lembaga berikutnya.
export const RANTAI_QIRAATI = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH']

const _BERIKUTNYA = {
  tpq: 'Pra PTPT',
  'tpq pagi': 'Pra PTPT',
  'tpq sore': 'Pra PTPT',
  'pra ptpt': 'PTPT',
  ptpt: 'PPPH',
  ppph: '',
  p3h: ''
}

/** Lembaga sesudah `lembaga` dalam rantai qiraati. '' = ujung rantai / bukan qiraati. */
export function lembagaBerikutnya(lembaga) {
  return _BERIKUTNYA[_norm(lembaga)] || ''
}

// Cadangan bila master/lembaga belum punya kelas_list. SENGAJA daftar lama yang
// dipakai TesKenaikanView/NaikKelasView, supaya tanpa master perilakunya tak berubah.
export const JENJANG_CADANGAN = {
  tpq: [
    'Jilid 1A',
    'Jilid 1B',
    'Jilid 1C',
    'Jilid 2A',
    'Jilid 2B',
    'Jilid 3A',
    'Jilid 3B',
    'Jilid 4A',
    'Jilid 4B',
    'Jilid 5A',
    'Jilid 5B',
    'KPI',
    'Persiapan Khotaman'
  ],
  'pra ptpt': ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'],
  ptpt: ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'],
  ppph: [
    "Level 1 (Arba'in Nawawi)",
    'Level 2 (Riyadhus Sholihin)',
    'Level 3 (Shahih Bukhari)',
    'Level 4 (Shahih Muslim)'
  ]
}
JENJANG_CADANGAN['tpq pagi'] = JENJANG_CADANGAN.tpq
JENJANG_CADANGAN['tpq sore'] = JENJANG_CADANGAN.tpq
JENJANG_CADANGAN.p3h = JENJANG_CADANGAN.ppph

/**
 * Daftar jenjang (jilid/level/kelas) sebuah lembaga, berurutan.
 * SUMBER UTAMA `master/lembaga.kelas_list` — di sanalah Kyai menata jenjang yang
 * sungguhan dipakai santri ('Level ½ Juz', PTPT '1'..'6'). Daftar hardcoded lama
 * hanya cadangan bila master kosong.
 */
export function jenjangLembaga(lembaga, lembagaList) {
  const key = _norm(lembaga)
  if (!key) return []
  const row = (lembagaList || []).find((l) => _norm(l?.lembaga || l?.nama) === key)
  const dariMaster = Array.isArray(row?.kelas_list)
    ? row.kelas_list
    : Array.isArray(row?.kelas)
      ? row.kelas
      : []
  const bersih = dariMaster.map((x) => String(x ?? '').trim()).filter(Boolean)
  if (bersih.length) return bersih
  return JENJANG_CADANGAN[key] ? [...JENJANG_CADANGAN[key]] : []
}

/**
 * Posisi sebuah kelas di daftar jenjang; -1 bila tak ketemu.
 * Toleran pada bentuk lama: 'Kelas 3' ≡ '3' (data PTPT memuat dua-duanya).
 */
export function indexJenjang(list, kelas) {
  const arr = Array.isArray(list) ? list : []
  const k = _norm(kelas)
  if (!k) return -1
  let i = arr.findIndex((x) => _norm(x) === k)
  if (i >= 0) return i
  const ki = _inti(kelas)
  i = arr.findIndex((x) => _inti(x) === ki)
  return i
}

/** Kelas ini jenjang PALING AKHIR lembaganya? */
export function isJenjangTerakhir(lembaga, kelas, lembagaList) {
  const list = jenjangLembaga(lembaga, lembagaList)
  if (!list.length) return false
  const i = indexJenjang(list, kelas)
  return i >= 0 && i === list.length - 1
}

/**
 * Label item (juz/khotam/khatam) sebuah jenjang menurut kartu kenaikan.
 * Blok kartu dicocokkan ke jenjang lewat label dulu, lalu lewat INDEX — label master
 * ('Level 3 Juz') dan label kartu ('Level 5 (3 Juz)') memang beda bentuk tapi
 * urutannya sama. Index hanya dipakai bila JUMLAHNYA sama (kalau tidak, tak ada
 * dasar menjodohkan). [] = jenjang tanpa rincian item, mis. TPQ.
 */
export function itemJenjang(lembaga, kelas, ctx = {}) {
  const schema = getKartuKenaikanSchema(lembaga, ctx.settings)
  const blocks = Array.isArray(schema?.kelasList) ? schema.kelasList : []
  if (!blocks.length) return []
  let blk = blocks.find((b) => _norm(b?.label) === _norm(kelas))
  if (!blk) {
    const list = jenjangLembaga(lembaga, ctx.lembagaList)
    const i = indexJenjang(list, kelas)
    if (i >= 0 && list.length === blocks.length) blk = blocks[i]
  }
  return Array.isArray(blk?.items)
    ? blk.items.map((it) => String(it?.label ?? '').trim()).filter(Boolean)
    : []
}

/**
 * Target tes ini menuntaskan jenjangnya (item terakhir)?
 * Jenjang tanpa rincian item (TPQ) → true, karena kelasnya sendiri yang jadi penentu.
 */
export function isItemTerakhir(lembaga, kelas, target, ctx = {}) {
  const items = itemJenjang(lembaga, kelas, ctx)
  if (!items.length) return true
  const t = _inti(target)
  return !!t && t === _inti(items[items.length - 1])
}

/** Ajuan tes ini, bila lulus, MENAMATKAN lembaganya? */
export function menamatkanLembaga(ajuan, ctx = {}) {
  if (!ajuan) return false
  if (!lembagaBerikutnya(ajuan.lembaga)) return false // ujung rantai / bukan qiraati
  if (!isJenjangTerakhir(ajuan.lembaga, ajuan.kelas_asal, ctx.lembagaList)) return false
  return isItemTerakhir(ajuan.lembaga, ajuan.kelas_asal, ajuan.target, ctx)
}

/**
 * Tujuan kenaikan LINTAS LEMBAGA untuk ajuan ini, atau null bila ia masih naik di
 * dalam lembaganya sendiri. Kelasnya = jenjang PERTAMA lembaga berikutnya.
 */
export function tujuanNaikLembaga(ajuan, ctx = {}) {
  if (!menamatkanLembaga(ajuan, ctx)) return null
  const lembaga = lembagaBerikutnya(ajuan.lembaga)
  const list = jenjangLembaga(lembaga, ctx.lembagaList)
  return { lembaga, kelas: list[0] || '' }
}
