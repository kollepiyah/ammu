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

/**
 * Gerbang PJ PTPT: PJ tak boleh mengetes (Lulus/Belum Lulus) sebelum SEMUA glondongan
 * + berjalan yang seharusnya ada sudah 'selesai' (disimak & dinilai).
 * ROBUST: dihitung dari RUMUS (splitGlondongan) — baris yang seharusnya ada tapi belum
 * dibuat/selesai tetap membuat terkunci (spawn gagal / santri lama tak bocor).
 * @param {number} juzTes - juz santri saat ini (juz_asal / tes_kenaikan.juz_asal).
 * @param {Array} barisAjuan - baris tes_glondongan milik ajuan ini.
 * @returns {{terkunci:boolean, pending:Array, adaBarisHilang:boolean}}
 *   pending[] = potongan (berjalan/glondongan blok) yang belum 'selesai', dg juz & status
 *   ('menunggu'|'ditugaskan'|'belum_ada'). adaBarisHilang = ada potongan tanpa baris sama sekali.
 */
export function gerbangGlondongan(juzTes, barisAjuan) {
  const split = splitGlondongan(juzTes)
  const rows = Array.isArray(barisAjuan) ? barisAjuan : []
  const pending = []
  let adaBarisHilang = false
  if (!split.ok) return { terkunci: false, pending, adaBarisHilang }

  const isSelesai = (r) => r && String(r.status || '').toLowerCase() === 'selesai'

  // Juz kelas berjalan (guru kelas) — bila ada juz di bawah target.
  if (split.berjalan.juz.length) {
    const r = rows.find((x) => String(x.tipe) === 'berjalan')
    if (!isSelesai(r)) {
      if (!r) adaBarisHilang = true
      pending.push({
        tipe: 'berjalan',
        kelas_asal: split.kelas,
        juz_dari: split.berjalan.juz[0],
        juz_sampai: split.berjalan.juz[split.berjalan.juz.length - 1],
        juz: split.berjalan.juz,
        status: r ? String(r.status || '') : 'belum_ada'
      })
    }
  }
  // Glondongan blok per kelas asal (kelas lampau).
  for (const blk of split.glondongan) {
    const r = rows.find(
      (x) => String(x.tipe) === 'glondongan' && Number(x.kelas_asal) === blk.kelas_asal
    )
    if (!isSelesai(r)) {
      if (!r) adaBarisHilang = true
      pending.push({
        tipe: 'glondongan',
        kelas_asal: blk.kelas_asal,
        juz_dari: blk.juz_dari,
        juz_sampai: blk.juz_sampai,
        juz: blk.juz,
        status: r ? String(r.status || '') : 'belum_ada'
      })
    }
  }
  return { terkunci: pending.length > 0, pending, adaBarisHilang }
}

// Periode bulan 'YYYY-MM' (default now) — dipakai rekap bisyaroh bulanan. Cermin useKeuangan.
export function periodeBulan(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

// ─────────────────────────────────────────────────────────────────────────────
// Koordinator glondongan — per KATEGORI santri (bukan lagi per kelas asal 1..6).
//   Disimpan di master/lembaga PTPT:
//     koordinator_glondongan = { mahad: [<guruId>,…], nonmahad: [<guruId>,…] }
//   Kategori dari santri.is_mukim: mukim -> 'mahad', selain -> 'nonmahad'.
//   Tiap kategori boleh diisi BEBERAPA guru koordinator (multi). Diatur super_admin.
//   Nilai = guru id (sesi.id) supaya stabil (bukan nama).
// ─────────────────────────────────────────────────────────────────────────────
export const PTPT_LEMBAGA = 'PTPT'
export const KATEGORI_GLONDONGAN = ['mahad', 'nonmahad']
export const KATEGORI_LABEL = { mahad: 'Ma’had', nonmahad: 'Selain Ma’had' }

function _ptptObj(lembagaList) {
  return (lembagaList || []).find((l) => (l.lembaga || l.nama) === PTPT_LEMBAGA) || null
}

// Kategori 'mahad' | 'nonmahad' dari flag mukim (santri.is_mukim / baris.mukim).
export function kategoriMukim(mukim) {
  return mukim ? 'mahad' : 'nonmahad'
}

// Map koordinator { mahad:[guruId], nonmahad:[guruId] } — selalu objek dg array (mungkin kosong).
export function getKoordinatorGlondongan(lembagaList) {
  const o = _ptptObj(lembagaList)
  const m = (o && o.koordinator_glondongan) || {}
  const norm = (v) => (Array.isArray(v) ? v.map((x) => String(x)).filter(Boolean) : [])
  return { mahad: norm(m.mahad), nonmahad: norm(m.nonmahad) }
}

// Kategori yang dikoordinatori guru ini (sesiId) — subset dari KATEGORI_GLONDONGAN.
export function kategoriKoordinatori(sesiId, lembagaList) {
  const me = String(sesiId || '')
  if (!me) return []
  const m = getKoordinatorGlondongan(lembagaList)
  return KATEGORI_GLONDONGAN.filter((k) => m[k].includes(me))
}

// Apakah guru ini koordinator kategori tsb ('mahad' | 'nonmahad')?
export function isKoordinatorKategori(sesiId, kategori, lembagaList) {
  const me = String(sesiId || '')
  if (!me) return false
  const m = getKoordinatorGlondongan(lembagaList)
  return (m[kategori] || []).includes(me)
}
