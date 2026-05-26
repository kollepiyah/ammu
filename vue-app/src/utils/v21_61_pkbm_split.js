// v.21.61.0526: Migration — split lembaga PKBM → SMP + SMA
// Pattern mengikuti utils/v21_10_migration.js (scan + run + idempotent + audit timestamp)
//
// Scope:
//   1. master/lembaga document: replace entry { lembaga: 'PKBM', ... } dengan
//      [{ lembaga: 'SMP', pkbm_group: 'PKBM', kelas: ['VII','VIII','IX'] },
//       { lembaga: 'SMA', pkbm_group: 'PKBM', kelas: ['X','XI','XII'] }]
//   2. santri document: yang lembaga_sekolah='PKBM' + kelas_sekolah ∈ {VII,VIII,IX} → 'SMP'
//      yang kelas_sekolah ∈ {X,XI,XII} → 'SMA'
//      yang kelas invalid/kosong → skip + log warning (kyai fix manual)
//   3. guru document: yang lembaga_sekolah='PKBM' + kelas_diajar_sekolah → derive SMP/SMA
//      (kalau guru ngajar mix VII-XII, tetap 'PKBM' / kyai pilih manual)
//   4. lembaga_refs[] di santri & guru — replace ref.lembaga='PKBM' dengan SMP/SMA matching
//   5. Audit timestamp _migrated_v21_61_pkbm_split_at
//
// Logika idempotent: skip kalau sudah ada _migrated_v21_61_pkbm_split_at
import { doc, setDoc, writeBatch } from 'firebase/firestore'
import { db } from '@/services/firebase'

// === Constants ===
const PKBM_KELAS_SMP = ['VII', 'VIII', 'IX']
const PKBM_KELAS_SMA = ['X', 'XI', 'XII']

// === Helpers ===
function _normKelas(k) {
  return String(k || '')
    .trim()
    .toUpperCase()
}

export function mapPkbmKelasToLembaga(kelas) {
  const k = _normKelas(kelas)
  if (PKBM_KELAS_SMP.includes(k)) return 'SMP'
  if (PKBM_KELAS_SMA.includes(k)) return 'SMA'
  return null // invalid/empty
}

// === Derive target untuk SANTRI ===
export function deriveSantriV21_61(s) {
  // Skip kalau sudah migrated
  if (s._migrated_v21_61_pkbm_split_at) return null
  // Hanya proses santri yang lembaga_sekolah='PKBM'
  if (s.lembaga_sekolah !== 'PKBM') return null
  const target = mapPkbmKelasToLembaga(s.kelas_sekolah)
  if (!target)
    return {
      id: s.id,
      invalid: true,
      reason: `kelas_sekolah="${s.kelas_sekolah}" tidak match VII-XII`
    }
  // Update lembaga_refs: ganti yang lembaga='PKBM' jadi target
  const newRefs = Array.isArray(s.lembaga_refs)
    ? s.lembaga_refs.map((r) => (r && r.lembaga === 'PKBM' ? { ...r, lembaga: target } : r))
    : null
  return {
    id: s.id,
    nama: s.nama,
    from: 'PKBM',
    to: target,
    kelas: s.kelas_sekolah,
    update: {
      lembaga_sekolah: target,
      ...(newRefs ? { lembaga_refs: newRefs } : {})
    }
  }
}

// === Derive target untuk GURU ===
// Guru bisa ngajar mix kelas. Logic:
// - Kalau kelas_diajar_sekolah semua di SMP range → target = 'SMP'
// - Kalau semua di SMA range → target = 'SMA'
// - Kalau mix → return { mixed: true } (kyai handle manual)
// - Kalau kosong → default SMP (asumsi guru baru, kyai re-assign nanti)
export function deriveGuruV21_61(g) {
  if (g._migrated_v21_61_pkbm_split_at) return null
  if (g.lembaga_sekolah !== 'PKBM') return null
  const kelasList = Array.isArray(g.kelas_diajar_sekolah)
    ? g.kelas_diajar_sekolah.map(_normKelas)
    : []
  const inSmp = kelasList.filter((k) => PKBM_KELAS_SMP.includes(k))
  const inSma = kelasList.filter((k) => PKBM_KELAS_SMA.includes(k))
  let target = null
  let mixed = false
  if (kelasList.length === 0) {
    target = 'SMP' // default, kyai re-assign
  } else if (inSmp.length > 0 && inSma.length === 0) {
    target = 'SMP'
  } else if (inSma.length > 0 && inSmp.length === 0) {
    target = 'SMA'
  } else if (inSmp.length > 0 && inSma.length > 0) {
    target = 'SMP' // default kalau mix, log warning
    mixed = true
  } else {
    return {
      id: g.id,
      invalid: true,
      reason: `kelas_diajar_sekolah=${JSON.stringify(g.kelas_diajar_sekolah)} tidak match VII-XII`
    }
  }
  const newRefs = Array.isArray(g.lembaga_refs)
    ? g.lembaga_refs.map((r) => (r && r.lembaga === 'PKBM' ? { ...r, lembaga: target } : r))
    : null
  return {
    id: g.id,
    nama: g.nama,
    from: 'PKBM',
    to: target,
    kelas: kelasList,
    mixed,
    update: {
      lembaga_sekolah: target,
      ...(newRefs ? { lembaga_refs: newRefs } : {})
    }
  }
}

// === Derive target untuk LEMBAGA MASTER ===
// Replace { lembaga: 'PKBM', ... } dengan 2 entries SMP + SMA
export function deriveLembagaListV21_61(lembagaList) {
  if (!Array.isArray(lembagaList)) return null
  const hasPkbm = lembagaList.some((l) => l.lembaga === 'PKBM')
  const hasSmp = lembagaList.some((l) => l.lembaga === 'SMP')
  const hasSma = lembagaList.some((l) => l.lembaga === 'SMA')
  if (!hasPkbm && hasSmp && hasSma) return null // sudah migrated
  if (!hasPkbm) return null // tidak ada PKBM (nothing to split)
  // Build new list: keep semua kecuali PKBM, lalu add SMP & SMA
  const pkbmEntry = lembagaList.find((l) => l.lembaga === 'PKBM') || {}
  const others = lembagaList.filter((l) => l.lembaga !== 'PKBM')
  const newSmp = hasSmp
    ? null
    : {
        lembaga: 'SMP',
        group: 'sekolah',
        pkbm_group: 'PKBM',
        kelas: PKBM_KELAS_SMP,
        // Inherit kop & psb dari PKBM kalau ada (back-compat)
        ...(pkbmEntry.kop_line1 ? { kop_line1: pkbmEntry.kop_line1 } : {}),
        ...(pkbmEntry.kop_line2 ? { kop_line2: pkbmEntry.kop_line2 } : {}),
        ...(pkbmEntry.kop_line3 ? { kop_line3: pkbmEntry.kop_line3 } : {}),
        ...(pkbmEntry.kop_line4 ? { kop_line4: pkbmEntry.kop_line4 } : {}),
        ...(pkbmEntry.kop_logo ? { kop_logo: pkbmEntry.kop_logo } : {})
      }
  const newSma = hasSma
    ? null
    : {
        lembaga: 'SMA',
        group: 'sekolah',
        pkbm_group: 'PKBM',
        kelas: PKBM_KELAS_SMA,
        ...(pkbmEntry.kop_line1 ? { kop_line1: pkbmEntry.kop_line1 } : {}),
        ...(pkbmEntry.kop_line2 ? { kop_line2: pkbmEntry.kop_line2 } : {}),
        ...(pkbmEntry.kop_line3 ? { kop_line3: pkbmEntry.kop_line3 } : {}),
        ...(pkbmEntry.kop_line4 ? { kop_line4: pkbmEntry.kop_line4 } : {}),
        ...(pkbmEntry.kop_logo ? { kop_logo: pkbmEntry.kop_logo } : {})
      }
  const newList = others.slice()
  if (newSmp) newList.push(newSmp)
  if (newSma) newList.push(newSma)
  return {
    newList,
    removed: ['PKBM'],
    added: [newSmp, newSma].filter(Boolean).map((x) => x.lembaga)
  }
}

// === SCAN: dry-run hitung dampak ===
export function scanV21_61PkbmSplit({ santriList, guruList, lembagaList }) {
  const santriOk = []
  const santriInvalid = []
  const santriSkipped = []
  for (const s of santriList || []) {
    const res = deriveSantriV21_61(s)
    if (!res) {
      santriSkipped.push(s.id)
      continue
    }
    if (res.invalid) santriInvalid.push(res)
    else santriOk.push(res)
  }
  const guruOk = []
  const guruInvalid = []
  const guruMixed = []
  const guruSkipped = []
  for (const g of guruList || []) {
    const res = deriveGuruV21_61(g)
    if (!res) {
      guruSkipped.push(g.id)
      continue
    }
    if (res.invalid) guruInvalid.push(res)
    else if (res.mixed) guruMixed.push(res)
    else guruOk.push(res)
  }
  const lembagaDerive = deriveLembagaListV21_61(lembagaList)
  return {
    santri: {
      total: (santriList || []).length,
      toMigrate: santriOk.length,
      invalid: santriInvalid.length,
      skipped: santriSkipped.length,
      examples: santriOk.slice(0, 5),
      invalidExamples: santriInvalid.slice(0, 10)
    },
    guru: {
      total: (guruList || []).length,
      toMigrate: guruOk.length,
      mixed: guruMixed.length,
      invalid: guruInvalid.length,
      skipped: guruSkipped.length,
      examples: guruOk.slice(0, 5),
      mixedExamples: guruMixed.slice(0, 5),
      invalidExamples: guruInvalid.slice(0, 10)
    },
    lembaga: {
      total: (lembagaList || []).length,
      needsUpdate: !!lembagaDerive,
      action: lembagaDerive
        ? `Remove PKBM, add ${lembagaDerive.added.join(' + ')}`
        : 'Already split'
    },
    totalWrites: santriOk.length + guruOk.length + guruMixed.length + (lembagaDerive ? 1 : 0)
  }
}

// === EXECUTE: tulis ke Firestore ===
export async function runV21_61PkbmSplit({ santriList, guruList, lembagaList, onProgress } = {}) {
  const result = {
    santri: { ok: 0, fail: 0, invalid: 0 },
    guru: { ok: 0, fail: 0, invalid: 0, mixed: 0 },
    lembaga: { ok: 0, fail: 0 },
    errors: []
  }
  const stamp = new Date().toISOString()

  // 1. Santri — batch 400 (Firestore limit 500)
  const santriQueue = []
  for (const s of santriList || []) {
    const res = deriveSantriV21_61(s)
    if (!res) continue
    if (res.invalid) {
      result.santri.invalid++
      continue
    }
    santriQueue.push(res)
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
            ...item.update,
            _migrated_v21_61_pkbm_split_at: stamp
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

  // 2. Guru — same pattern (include mixed sebagai 'ok' tapi mark count)
  const guruQueue = []
  for (const g of guruList || []) {
    const res = deriveGuruV21_61(g)
    if (!res) continue
    if (res.invalid) {
      result.guru.invalid++
      continue
    }
    if (res.mixed) result.guru.mixed++
    guruQueue.push(res)
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
            ...item.update,
            _migrated_v21_61_pkbm_split_at: stamp
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

  // 3. Lembaga master — single doc update
  const lembagaDerive = deriveLembagaListV21_61(lembagaList)
  if (lembagaDerive) {
    try {
      await setDoc(
        doc(db, 'master', 'lembaga'),
        {
          list: lembagaDerive.newList,
          _migrated_v21_61_pkbm_split_at: stamp
        },
        { merge: true }
      )
      result.lembaga.ok = 1
    } catch (e) {
      result.lembaga.fail = 1
      result.errors.push(`lembaga master: ${e.message}`)
    }
    if (onProgress) onProgress({ phase: 'lembaga', i: 1, total: 1 })
  }

  return result
}
