// v.21.10.0526: Migration utility — derive lembaga_refs untuk santri & guru,
// derive group/kepala_jabatan untuk entry master/lembaga.
// Pattern mengikuti utils/tpqShift.js (scan + run + idempotent + audit timestamp).
import { doc, setDoc, writeBatch } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { LEMBAGA_GROUPS, getLembagaGroup } from '@/composables/useLembaga'

// === SANTRI: derive lembaga_refs ===
export function deriveSantriRefs(s) {
  if (Array.isArray(s.lembaga_refs) && s.lembaga_refs.length > 0) return s.lembaga_refs
  const refs = []
  if (s.lembaga) {
    refs.push({
      group: getLembagaGroup(s.lembaga) || 'qiraati',
      lembaga: s.lembaga,
      shift: s.shift_qiraati || null,
      kelas: s.kelas || null
    })
  }
  if (s.lembaga_sekolah && s.lembaga_sekolah !== s.lembaga) {
    refs.push({
      group: getLembagaGroup(s.lembaga_sekolah) || 'sekolah',
      lembaga: s.lembaga_sekolah,
      kelas: s.kelas_sekolah || null
    })
  }
  if (s.is_mukim) {
    refs.unshift({ group: 'mahad', lembaga: "Ma'had" })
  }
  return refs
}

// === GURU: derive lembaga_refs ===
export function deriveGuruRefs(g) {
  if (Array.isArray(g.lembaga_refs) && g.lembaga_refs.length > 0) return g.lembaga_refs
  const refs = []
  if (g.lembaga) {
    refs.push({
      group: getLembagaGroup(g.lembaga) || 'qiraati',
      lembaga: g.lembaga,
      shift: g.shift || null,
      jabatan_di_sini: g.jabatan || 'Guru',
      kelas_diajar: Array.isArray(g.kelas_diajar) ? g.kelas_diajar : []
    })
  }
  if (g.lembaga_sekolah && g.lembaga_sekolah !== g.lembaga) {
    refs.push({
      group: getLembagaGroup(g.lembaga_sekolah) || 'sekolah',
      lembaga: g.lembaga_sekolah,
      jabatan_di_sini: g.jabatan_sekolah || 'Guru',
      kelas_diajar: Array.isArray(g.kelas_diajar_sekolah) ? g.kelas_diajar_sekolah : []
    })
  }
  if (Array.isArray(g.jabatan_tambahan) && g.jabatan_tambahan.length > 0) {
    for (const jt of g.jabatan_tambahan) {
      if (typeof jt === 'string' && jt && !refs.some((r) => r.jabatan_di_sini === jt)) {
        const lembagaTambahan = /admin|supervisi|pj/i.test(jt)
          ? 'Yayasan'
          : /keamanan|kebersihan/i.test(jt)
            ? 'Sarana Prasarana'
            : null
        if (lembagaTambahan) {
          refs.push({ group: 'non-lembaga', lembaga: lembagaTambahan, jabatan_di_sini: jt })
        }
      }
    }
  }
  return refs
}

// === LEMBAGA: derive group + kepala_jabatan untuk entry ===
export function deriveLembagaMeta(l) {
  const out = {}
  const name = String(l.lembaga || '').trim()
  // Find group key (mis: "TPQ Pagi" → key "TPQ")
  let groupKey = null
  for (const [k, info] of Object.entries(LEMBAGA_GROUPS)) {
    if ((info.variants || []).includes(name)) {
      groupKey = k
      break
    }
  }
  if (groupKey) {
    const info = LEMBAGA_GROUPS[groupKey]
    if (!l.group) out.group = info.group
    if (!l.group_key) out.group_key = groupKey
    if (!l.kepala_jabatan) out.kepala_jabatan = info.kepala_jabatan
  }
  return out
}

// === SCAN: dry-run hitung dampak ===
export function scanV21_10Migration({ santriList, guruList, lembagaList }) {
  const santriToMigrate = []
  const santriSkipped = []
  for (const s of santriList || []) {
    if (Array.isArray(s.lembaga_refs) && s.lembaga_refs.length > 0) {
      santriSkipped.push(s.id)
    } else {
      const refs = deriveSantriRefs(s)
      if (refs.length > 0) santriToMigrate.push({ id: s.id, nama: s.nama, refs })
    }
  }
  const guruToMigrate = []
  const guruSkipped = []
  for (const g of guruList || []) {
    if (Array.isArray(g.lembaga_refs) && g.lembaga_refs.length > 0) {
      guruSkipped.push(g.id)
    } else {
      const refs = deriveGuruRefs(g)
      if (refs.length > 0) guruToMigrate.push({ id: g.id, nama: g.nama, refs })
    }
  }
  const lembagaToMigrate = []
  for (const l of lembagaList || []) {
    const meta = deriveLembagaMeta(l)
    if (Object.keys(meta).length > 0) {
      lembagaToMigrate.push({ lembaga: l.lembaga, meta })
    }
  }
  return {
    santri: {
      total: (santriList || []).length,
      toMigrate: santriToMigrate.length,
      skipped: santriSkipped.length,
      examples: santriToMigrate.slice(0, 5)
    },
    guru: {
      total: (guruList || []).length,
      toMigrate: guruToMigrate.length,
      skipped: guruSkipped.length,
      examples: guruToMigrate.slice(0, 5)
    },
    lembaga: {
      total: (lembagaList || []).length,
      toMigrate: lembagaToMigrate.length,
      examples: lembagaToMigrate.slice(0, 5)
    },
    totalDocs: santriToMigrate.length + guruToMigrate.length + (lembagaToMigrate.length > 0 ? 1 : 0)
  }
}

// === EXECUTE: tulis lembaga_refs ke Firestore ===
export async function runV21_10Migration({ santriList, guruList, lembagaList, onProgress } = {}) {
  const result = {
    santri: { ok: 0, fail: 0 },
    guru: { ok: 0, fail: 0 },
    lembaga: { ok: 0, fail: 0 },
    errors: []
  }
  const stamp = new Date().toISOString()

  // 1. Santri — batch write per 400 (Firestore limit 500)
  const santriQueue = []
  for (const s of santriList || []) {
    if (Array.isArray(s.lembaga_refs) && s.lembaga_refs.length > 0) continue
    const refs = deriveSantriRefs(s)
    if (refs.length === 0) continue
    santriQueue.push({ id: s.id, refs })
  }
  let i = 0
  while (i < santriQueue.length) {
    const batch = writeBatch(db)
    const chunk = santriQueue.slice(i, i + 400)
    for (const item of chunk) {
      try {
        batch.set(
          doc(db, 'santri', String(item.id)),
          {
            lembaga_refs: item.refs,
            _migrated_v21_10_at: stamp
          },
          { merge: true }
        )
      } catch (e) {
        result.errors.push(`santri ${item.id}: ${e.message}`)
      }
    }
    try {
      await batch.commit()
      result.santri.ok += chunk.length
    } catch (e) {
      result.santri.fail += chunk.length
      result.errors.push(`santri batch ${i}-${i + chunk.length}: ${e.message}`)
    }
    i += chunk.length
    if (onProgress)
      onProgress({
        phase: 'santri',
        i: result.santri.ok + result.santri.fail,
        total: santriQueue.length
      })
  }

  // 2. Guru — same batch pattern
  const guruQueue = []
  for (const g of guruList || []) {
    if (Array.isArray(g.lembaga_refs) && g.lembaga_refs.length > 0) continue
    const refs = deriveGuruRefs(g)
    if (refs.length === 0) continue
    guruQueue.push({ id: g.id, refs })
  }
  i = 0
  while (i < guruQueue.length) {
    const batch = writeBatch(db)
    const chunk = guruQueue.slice(i, i + 400)
    for (const item of chunk) {
      try {
        batch.set(
          doc(db, 'guru', String(item.id)),
          {
            lembaga_refs: item.refs,
            _migrated_v21_10_at: stamp
          },
          { merge: true }
        )
      } catch (e) {
        result.errors.push(`guru ${item.id}: ${e.message}`)
      }
    }
    try {
      await batch.commit()
      result.guru.ok += chunk.length
    } catch (e) {
      result.guru.fail += chunk.length
      result.errors.push(`guru batch ${i}-${i + chunk.length}: ${e.message}`)
    }
    i += chunk.length
    if (onProgress)
      onProgress({ phase: 'guru', i: result.guru.ok + result.guru.fail, total: guruQueue.length })
  }

  // 3. Lembaga — single doc master/lembaga, update inline
  if (lembagaList && lembagaList.length > 0) {
    try {
      const updated = lembagaList.map((l) => {
        const meta = deriveLembagaMeta(l)
        return Object.keys(meta).length > 0 ? { ...l, ...meta } : l
      })
      await setDoc(
        doc(db, 'master', 'lembaga'),
        {
          list: updated,
          _migrated_v21_10_at: stamp
        },
        { merge: true }
      )
      result.lembaga.ok = lembagaList.length
    } catch (e) {
      result.lembaga.fail = lembagaList.length
      result.errors.push(`lembaga master: ${e.message}`)
    }
    if (onProgress)
      onProgress({ phase: 'lembaga', i: lembagaList.length, total: lembagaList.length })
  }

  return result
}
