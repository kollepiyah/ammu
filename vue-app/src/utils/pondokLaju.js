// Pondok Laju (Kyai, 15–16 Nov 2026) — aturan MURNI tes & glondongan per kelas.
//   Santri Pondok Laju satu kelas berjuz sama, dites bersama, dan glondongannya langsung
//   disimak guru kelas (tanpa penugasan koordinator), satu kartu per blok per kelas.
//   Semua santri Pondok Laju NAIK — tak ada hasil "Belum Lulus", hanya nilai & catatan.
//   Bisyaroh glondongan Pondok Laju dihitung PER BLOK kelas, bukan per anak.
import { juzNum } from './format'

const _norm = (v) =>
  String(v ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')

/** Santri ikut Pondok Laju? (penanda `is_pondok_laju`; Ma'had tak pernah Pondok Laju) */
export function isSantriPondokLaju(s) {
  return s?.is_pondok_laju === true && !s?.is_mukim
}

/** Guru kelas santri Pondok Laju (guru pagi = guru sore di Pondok Laju; cadangan `guru`). */
export function guruKelasLaju(s) {
  return String(s?.guru_pagi || s?.guru || s?.guru_sore || '').trim()
}

/**
 * Kunci SATU KELAS dalam satu pengajuan: batch + guru kelas + juz. Santri sekelas Pondok Laju
 * berjuz sama (Kyai menyamakan datanya), jadi juz ikut kunci supaya santri yang juznya belum
 * disamakan tak tergabung ke kartu yang salah.
 */
export function kunciKelompokLaju(batchId, s) {
  return `${batchId}|${_norm(guruKelasLaju(s))}|${juzNum(s?.juz) || '-'}`
}

/** PJ boleh memberi hasil "Belum Lulus"? Tidak untuk ajuan Pondok Laju. */
export function bolehBelumLulus(ajuan) {
  return ajuan?.pondok_laju !== true
}

/**
 * Kelas Pondok Laju di tab Status Ajuan untuk tombol "Siap Tes satu kelas" (Kyai 16 Nov).
 * Hanya ajuan 'diajukan' yang bergerbang. `siap` = semua simakannya selesai tapi belum ditandai;
 * `menunggu` = masih ada blok glondongan/berjalan; `sudah` = sudah ditandai siap.
 * @param {Array} ajuanList ajuan milik guru ini.
 * @param {Object} gerbang peta { [ajuanId]: { berlaku, glondonganTerkunci, siapTes } }.
 * @returns {Array<{key, juz, siap: Array, menunggu: number, sudah: number}>}
 */
export function kelasSiapTesLaju(ajuanList, gerbang) {
  const peta = new Map()
  for (const a of ajuanList || []) {
    if (!a?.kelompok_laju || a.status !== 'diajukan') continue
    const g = gerbang?.[a.id]
    if (!g?.berlaku) continue
    let k = peta.get(a.kelompok_laju)
    if (!k) {
      k = { key: a.kelompok_laju, juz: juzNum(a.juz_asal), siap: [], menunggu: 0, sudah: 0 }
      peta.set(a.kelompok_laju, k)
    }
    if (g.glondonganTerkunci) k.menunggu++
    else if (g.siapTes) k.sudah++
    else k.siap.push(a)
  }
  return [...peta.values()].filter((k) => k.siap.length || k.menunggu)
}

/**
 * Kelas Pondok Laju di antara kandidat seremonial (Tahap 3, Kyai 16 Nov): santri yang lulus
 * bersama dalam satu pengajuan kelas → satu tombol "satu kelas". Seremonial tetap boleh per santri.
 * @returns {Array<{key, juz_lulus, kelas_tujuan, santri: Array}>}
 */
export function kelasSeremonialLaju(kandidatList) {
  const peta = new Map()
  for (const k of kandidatList || []) {
    if (!k?.kelompok_laju) continue
    let g = peta.get(k.kelompok_laju)
    if (!g) {
      g = {
        key: k.kelompok_laju,
        juz_lulus: k.juz_lulus ?? null,
        kelas_tujuan: k.kelas_tujuan || '',
        santri: []
      }
      peta.set(k.kelompok_laju, g)
    }
    g.santri.push(k)
  }
  return [...peta.values()].sort((a, b) => Number(a.juz_lulus || 0) - Number(b.juz_lulus || 0))
}

/**
 * Kelompokkan santri Pondok Laju yang bisa diajukan per kelas (guru kelas + juz) —
 * dasar tombol "Centang satu kelas" di layar Ajukan DAN isian prestasi bulanan sekali per kelas.
 * @returns {Array<{key, guru, juz, santri: Array}>} urut guru lalu juz.
 */
export function kelasLajuDiajukan(santriList) {
  const peta = new Map()
  for (const s of santriList || []) {
    if (!isSantriPondokLaju(s)) continue
    const guru = guruKelasLaju(s)
    const juz = juzNum(s?.juz)
    const key = `${_norm(guru)}|${juz || '-'}`
    let g = peta.get(key)
    if (!g) peta.set(key, (g = { key, guru, juz, santri: [] }))
    g.santri.push(s)
  }
  return [...peta.values()].sort(
    (a, b) => a.guru.localeCompare(b.guru, 'id') || Number(a.juz || 0) - Number(b.juz || 0)
  )
}

/**
 * Pisahkan baris tes_glondongan menjadi kartu: baris biasa tetap satu-satu, baris Pondok Laju
 * digabung per (kelompok, tipe, kelas asal) — satu kartu per blok per kelas.
 * @returns {{ tunggal: Array, kelompok: Array<{key, tipe, kelas_asal, rows}> }}
 */
export function kartuGlondongan(rows) {
  const tunggal = []
  const peta = new Map()
  for (const r of rows || []) {
    if (!r) continue
    if (!r.kelompok_laju) {
      tunggal.push(r)
      continue
    }
    const key = `${r.kelompok_laju}|${r.tipe}|${r.kelas_asal}`
    let g = peta.get(key)
    if (!g) peta.set(key, (g = { key, tipe: r.tipe, kelas_asal: r.kelas_asal, rows: [] }))
    g.rows.push(r)
  }
  const kelompok = [...peta.values()]
  for (const g of kelompok)
    g.rows.sort((a, b) =>
      String(a.nama_cache || '').localeCompare(String(b.nama_cache || ''), 'id')
    )
  return { tunggal, kelompok }
}

/**
 * Prestasi bulanan Pondok Laju diisi SEKALI per kelas (Kyai, 15 Nov 2026): kotak isian kelas
 * menampilkan angka bersama bila semua santrinya sama, selain itu kosong + `beragam`.
 * @returns {{ nilai: string, beragam: boolean }}
 */
export function nilaiSeragam(values) {
  const isi = [...new Set((values || []).map((v) => String(v ?? '').trim()))]
  if (isi.length === 1) return { nilai: isi[0], beragam: false }
  return { nilai: '', beragam: isi.length > 1 }
}
