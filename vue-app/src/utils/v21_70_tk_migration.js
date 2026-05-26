// v.21.70.0526: TK Refactor — TK A / TK B sebagai LEMBAGA terpisah → 1 lembaga "TK" dengan jenjang ['TK A', 'TK B']
//
// Per spec kyai 26 Mei 2026:
//   "TK itu satu lembaga, jenjangnya ada 2 (TK A dan TK B) jadi TK A itu JENJANG KELAS seperti Kelas I-VI di SDI"
//
// Migration scope:
//   - santri.lembaga = 'TK A' atau 'TK B' → lembaga = 'TK', kelas = 'TK A'/'TK B'
//   - guru.lembaga_sekolah = 'TK A' atau 'TK B' → 'TK' (kelas_diajar_sekolah retain)
//   - guru.lembaga_refs[].lembaga = 'TK A' atau 'TK B' → 'TK'
//   - master/lembaga delete docs 'TK A' + 'TK B', upsert doc 'TK'
//
// Idempotent — aman dipanggil multiple times (skip kalau sudah migrated).

import { db } from '@/services/firebase'
import { doc, deleteDoc, setDoc, updateDoc, writeBatch, collection } from 'firebase/firestore'

const TK_LEGACY_VARIANTS = ['TK A', 'TK B']
const TK_CANONICAL = 'TK'

// Derive santri migration plan
export function deriveSantriV21_70(s) {
  if (!s || !s.lembaga) return { changed: false, ref: s }
  if (!TK_LEGACY_VARIANTS.includes(s.lembaga)) return { changed: false, ref: s }
  return {
    changed: true,
    ref: {
      ...s,
      lembaga: TK_CANONICAL,
      kelas: s.lembaga, // 'TK A' atau 'TK B' jadi kelas
      _migrated_v21_70_tk: true
    }
  }
}

// Derive guru migration plan (handle lembaga_sekolah + lembaga_refs)
export function deriveGuruV21_70(g) {
  if (!g) return { changed: false, ref: g }
  let changed = false
  const out = { ...g }

  if (TK_LEGACY_VARIANTS.includes(g.lembaga_sekolah)) {
    out.lembaga_sekolah = TK_CANONICAL
    // Pindahkan TK A/B ke kelas_diajar_sekolah kalau belum ada
    const ks = Array.isArray(g.kelas_diajar_sekolah) ? [...g.kelas_diajar_sekolah] : []
    if (!ks.includes(g.lembaga_sekolah)) ks.push(g.lembaga_sekolah)
    out.kelas_diajar_sekolah = ks
    changed = true
  }

  if (Array.isArray(g.lembaga_refs)) {
    out.lembaga_refs = g.lembaga_refs.map((r) => {
      if (TK_LEGACY_VARIANTS.includes(r.lembaga)) {
        changed = true
        const kelas = Array.isArray(r.kelas_diajar) ? [...r.kelas_diajar] : []
        if (!kelas.includes(r.lembaga)) kelas.push(r.lembaga)
        return { ...r, lembaga: TK_CANONICAL, kelas_diajar: kelas }
      }
      return r
    })
    // Dedupe: kalau ada multiple TK refs setelah migrate, merge jadi 1
    const tkRefs = out.lembaga_refs.filter((r) => r.lembaga === TK_CANONICAL)
    if (tkRefs.length > 1) {
      const merged = tkRefs[0]
      const allKelas = new Set(tkRefs.flatMap((r) => r.kelas_diajar || []))
      merged.kelas_diajar = Array.from(allKelas)
      out.lembaga_refs = out.lembaga_refs.filter((r) => r.lembaga !== TK_CANONICAL)
      out.lembaga_refs.push(merged)
    }
  }

  if (changed) out._migrated_v21_70_tk = true
  return { changed, ref: out }
}

// Derive lembaga list — remove TK A + TK B docs, add canonical TK
export function deriveLembagaListV21_70(lembagaList) {
  const list = (lembagaList || []).filter((l) => !TK_LEGACY_VARIANTS.includes(l.lembaga))
  const hasTk = list.some((l) => l.lembaga === TK_CANONICAL)
  if (!hasTk) {
    list.push({
      lembaga: TK_CANONICAL,
      group: 'sekolah',
      kelas: ['TK A', 'TK B']
    })
  } else {
    // Pastikan kelas berisi TK A + TK B
    const tk = list.find((l) => l.lembaga === TK_CANONICAL)
    const k = new Set(tk.kelas || [])
    k.add('TK A')
    k.add('TK B')
    tk.kelas = Array.from(k)
  }
  return list
}

// Scan candidate (dry-run) — return summary without writing
export function scanV21_70TkMigration({ santriList, guruList, lembagaList }) {
  const santriToMigrate = []
  for (const s of santriList || []) {
    const r = deriveSantriV21_70(s)
    if (r.changed) santriToMigrate.push({ before: s, after: r.ref })
  }
  const guruToMigrate = []
  for (const g of guruList || []) {
    const r = deriveGuruV21_70(g)
    if (r.changed) guruToMigrate.push({ before: g, after: r.ref })
  }
  const lembagaLegacyDocs = (lembagaList || []).filter((l) =>
    TK_LEGACY_VARIANTS.includes(l.lembaga)
  )
  const hasCanonicalTk = (lembagaList || []).some((l) => l.lembaga === TK_CANONICAL)
  return {
    santriCount: santriToMigrate.length,
    guruCount: guruToMigrate.length,
    legacyLembagaDocs: lembagaLegacyDocs.map((l) => l.lembaga),
    needCreateCanonical: !hasCanonicalTk,
    santriPreview: santriToMigrate.slice(0, 5),
    guruPreview: guruToMigrate.slice(0, 5)
  }
}

// Run migration — writes to Firestore (batched, idempotent)
// onProgress: ({phase, current, total, msg}) callback
export async function runV21_70TkMigration({ santriList, guruList, lembagaList, onProgress } = {}) {
  const log = []
  const emit = (phase, current, total, msg) => {
    log.push(`[${phase} ${current}/${total}] ${msg}`)
    if (onProgress) onProgress({ phase, current, total, msg })
  }

  // 1. Santri
  let i = 0
  const santriPlan = (santriList || [])
    .map((s) => ({ id: s.id, ...deriveSantriV21_70(s) }))
    .filter((p) => p.changed)
  for (let start = 0; start < santriPlan.length; start += 400) {
    const batch = writeBatch(db)
    const slice = santriPlan.slice(start, start + 400)
    for (const p of slice) {
      batch.update(doc(db, 'santri', String(p.id)), {
        lembaga: p.ref.lembaga,
        kelas: p.ref.kelas,
        _migrated_v21_70_tk: true
      })
    }
    await batch.commit()
    i += slice.length
    emit('santri', i, santriPlan.length, `commit batch (${slice.length})`)
  }

  // 2. Guru (db_guru — biasanya integer id)
  i = 0
  const guruPlan = (guruList || [])
    .map((g) => ({ id: g.id, ...deriveGuruV21_70(g) }))
    .filter((p) => p.changed)
  for (let start = 0; start < guruPlan.length; start += 400) {
    const batch = writeBatch(db)
    const slice = guruPlan.slice(start, start + 400)
    for (const p of slice) {
      const updateData = { _migrated_v21_70_tk: true }
      if (p.ref.lembaga_sekolah !== undefined) updateData.lembaga_sekolah = p.ref.lembaga_sekolah
      if (p.ref.kelas_diajar_sekolah !== undefined)
        updateData.kelas_diajar_sekolah = p.ref.kelas_diajar_sekolah
      if (p.ref.lembaga_refs !== undefined) updateData.lembaga_refs = p.ref.lembaga_refs
      batch.update(doc(db, 'db_guru', String(p.id)), updateData)
    }
    await batch.commit()
    i += slice.length
    emit('guru', i, guruPlan.length, `commit batch (${slice.length})`)
  }

  // 3. master/lembaga doc — assume legacy stored as `master/lembaga.list` array
  // Update via deriveLembagaListV21_70 + setDoc merge
  const newList = deriveLembagaListV21_70(lembagaList)
  await setDoc(
    doc(db, 'master', 'lembaga'),
    { list: newList, _migrated_v21_70_tk: true },
    { merge: true }
  )
  emit('lembaga', 1, 1, 'master/lembaga.list updated')

  return { log, santriMigrated: santriPlan.length, guruMigrated: guruPlan.length }
}
