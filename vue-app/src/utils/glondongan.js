// v.111: Tes Glondongan PTPT — rumus pembagian penguji + helper koordinator kelas.
//   Domain (kyai): santri PTPT tes juz T (K = ceil(T/5)). Muroja'ah KUMULATIF:
//     - PJ PTPT    -> uji juz T (target) -> nilai MASUK RAPOR (= tes_kenaikan existing).
//     - Guru kelas -> uji juz kelas berjalan di bawah target ((K-1)*5+1 .. T-1) -> catatan.
//     - Glondongan -> uji SEMUA juz kelas lampau (1 .. (K-1)*5), DIPECAH blok 5-juz per
//                     kelas asal; tiap blok ditugaskan koordinator kelas asal -> guru kelas asal.
//   Glondongan + berjalan TAK masuk rapor (murni catatan evaluasi). Mulai dari Kelas 2.
//   Rumus ini fungsi MURNI (tanpa I/O) supaya gampang diuji & dipakai ulang.
import { juzNum } from './tesKenaikan'

export const PTPT_JUZ_PER_KELAS = 5
export const PTPT_TOTAL_JUZ = 30
export const PTPT_TOTAL_KELAS = PTPT_TOTAL_JUZ / PTPT_JUZ_PER_KELAS // 6

// Kelas (1..6) dari nomor juz. NaN kalau juz di luar 1..30.
export function kelasFromJuz(juz) {
  const j = Number(juz)
  if (!Number.isFinite(j) || j < 1 || j > PTPT_TOTAL_JUZ) return NaN
  return Math.ceil(j / PTPT_JUZ_PER_KELAS)
}

// Rentang juz { juz_dari, juz_sampai } untuk kelas C (1..6).
export function juzRangeKelas(c) {
  const from = (c - 1) * PTPT_JUZ_PER_KELAS + 1
  return { juz_dari: from, juz_sampai: c * PTPT_JUZ_PER_KELAS }
}

function _range(a, b) {
  const out = []
  for (let i = a; i <= b; i++) out.push(i)
  return out
}

/**
 * Pembagian penguji untuk santri PTPT yang tes juz T.
 * @param {number} T - juz yang dites (juz target).
 * @returns {{ ok:boolean, kelas:number, pj:number, berjalan:{juz:number[]}, glondongan:Array }}
 *   pj         = T (juz target, diuji PJ PTPT -> rapor).
 *   berjalan   = { juz:[...] } juz kelas berjalan di bawah target (guru kelas santri).
 *                [] bila T = juz pertama kelasnya.
 *   glondongan = [{ kelas_asal, juz_dari, juz_sampai, juz:[...] }] per kelas lampau.
 *                [] bila Kelas 1 (belum ada glondongan).
 */
export function splitGlondongan(T) {
  const t = Number(T)
  const K = kelasFromJuz(t)
  if (!Number.isFinite(K)) {
    return { ok: false, kelas: NaN, pj: NaN, berjalan: { juz: [] }, glondongan: [] }
  }
  const kelasStart = (K - 1) * PTPT_JUZ_PER_KELAS + 1
  const berjalan = { juz: _range(kelasStart, t - 1) } // kosong bila t = kelasStart
  const glondongan = []
  for (let c = 1; c < K; c++) {
    const { juz_dari, juz_sampai } = juzRangeKelas(c)
    glondongan.push({ kelas_asal: c, juz_dari, juz_sampai, juz: _range(juz_dari, juz_sampai) })
  }
  return { ok: true, kelas: K, pj: t, berjalan, glondongan }
}

// Juz T yang dites dari objek santri (juz santri saat ini). NaN bila tak terbaca.
export function testedJuz(santri) {
  return juzNum(santri)
}

// Periode bulan 'YYYY-MM' (default now) — dipakai rekap bisyaroh bulanan. Cermin useKeuangan.
export function periodeBulan(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

// ─────────────────────────────────────────────────────────────────────────────
// Koordinator kelas — disimpan di master/lembaga PTPT:
//   koordinator_kelas = { "1": <guruId>, "2": <guruId>, ... }  (key = nomor kelas 1..6)
//   Nilai = guru id (sesi.id) supaya stabil (bukan nama). Diatur super_admin (Task #7).
// ─────────────────────────────────────────────────────────────────────────────
export const PTPT_LEMBAGA = 'PTPT'

function _ptptObj(lembagaList) {
  return (lembagaList || []).find((l) => (l.lembaga || l.nama) === PTPT_LEMBAGA) || null
}

// Map koordinator { [kelasNo]: guruId }. Selalu objek (mungkin kosong).
export function getKoordinatorMap(lembagaList) {
  const o = _ptptObj(lembagaList)
  const m = o && o.koordinator_kelas
  return m && typeof m === 'object' ? m : {}
}

// guruId koordinator kelas C (1..6). '' bila belum diset.
export function koordinatorOf(kelasNo, lembagaList) {
  const m = getKoordinatorMap(lembagaList)
  return String(m[String(kelasNo)] || '')
}

// Daftar nomor kelas yang dikoordinatori guru ini (sesiId = sesi.id / guru id).
export function kelasKoordinatori(sesiId, lembagaList) {
  const me = String(sesiId || '')
  if (!me) return []
  const m = getKoordinatorMap(lembagaList)
  const out = []
  for (let c = 1; c <= PTPT_TOTAL_KELAS; c++) if (String(m[String(c)] || '') === me) out.push(c)
  return out
}

// Apakah guru ini koordinator kelas C?
export function isKoordinatorKelas(sesiId, kelasNo, lembagaList) {
  return !!sesiId && koordinatorOf(kelasNo, lembagaList) === String(sesiId)
}
