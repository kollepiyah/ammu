// v.1.5.0 (Kyai 16 Nov 2026): SATU aturan "ID mesin (guru.id_fingerprint) → guru" untuk semua
//   jalur absen — webhook HiView (cermin hiview-absen/idMesin.ts), sinkron Fingerspot, tambal log,
//   formulir & Data Guru. Dulu ID yang dipegang dua guru membuat scan HiView ditolak diam-diam.
import { isGuruAktif } from '@/utils/guruScope'

/** ID mesin dibandingkan apa adanya sesudah dipangkas spasinya. */
export function normIdMesin(v) {
  return String(v ?? '').trim()
}

/**
 * Pemilik satu ID dari guru-guru yang memegangnya. Lebih dari satu: yang Aktif menang (ID lama
 * guru yang sudah keluar tak boleh merebut scan guru baru); Aktif pun lebih dari satu → jangan
 * menebak orang.
 * @returns {{ guru: object|null, ganda: object[] }} `ganda` = guru yang bertabrakan
 */
export function pilihGuruDariId(kandidat) {
  const list = (kandidat || []).filter(Boolean)
  if (list.length <= 1) return { guru: list[0] || null, ganda: [] }
  const aktif = list.filter(isGuruAktif)
  if (aktif.length === 1) return { guru: aktif[0], ganda: [] }
  return { guru: null, ganda: aktif.length ? aktif : list }
}

/** Kelompok guru per ID (yang berisi saja). */
function kelompokPerId(guruList) {
  const per = new Map()
  for (const g of guruList || []) {
    const id = normIdMesin(g?.id_fingerprint)
    if (!id) continue
    if (!per.has(id)) per.set(id, [])
    per.get(id).push(g)
  }
  return per
}

/**
 * Peta pemilik untuk banyak scan sekaligus (sinkron Fingerspot / tambal log).
 * @returns {{ pemilik: Map<string, object>, ganda: Map<string, object[]> }}
 */
export function petaPemilikId(guruList) {
  const pemilik = new Map()
  const ganda = new Map()
  for (const [id, list] of kelompokPerId(guruList)) {
    const p = pilihGuruDariId(list)
    if (p.guru) pemilik.set(id, p.guru)
    else ganda.set(id, p.ganda)
  }
  return { pemilik, ganda }
}

/** ID yang dipegang lebih dari satu guru, status apa pun — bahan saringan Data Guru. */
export function idGanda(guruList) {
  const out = new Map()
  for (const [id, list] of kelompokPerId(guruList)) if (list.length > 1) out.set(id, list)
  return out
}

/**
 * Guru LAIN yang sudah memegang ID ini — penjaga formulir guru.
 * @returns {{ aktif: object[], nonaktif: object[] }}
 */
export function pemakaiLainId(guruList, id, kecualiId) {
  const want = normIdMesin(id)
  const aktif = []
  const nonaktif = []
  if (!want) return { aktif, nonaktif }
  for (const g of guruList || []) {
    if (String(g?.id) === String(kecualiId)) continue
    if (normIdMesin(g?.id_fingerprint) !== want) continue
    ;(isGuruAktif(g) ? aktif : nonaktif).push(g)
  }
  return { aktif, nonaktif }
}
