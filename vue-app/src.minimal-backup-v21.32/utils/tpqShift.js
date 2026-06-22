// v.20.80.0526 M16: TPQ Shift Helper
// TPQ Pagi + TPQ Sore = SATU lembaga TPQ dengan 2 shift (kyai spec 20 Mei 2026).
// Tujuan: dropdown PSB, statistik roll-up, master lembaga = 1 entry "TPQ".
// Backward-compat: data lama "TPQ Pagi"/"TPQ Sore" tetap diterima via helper berikut.

import { updateOne } from '@/services/firestore'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebase'

/** Cek apakah string lembaga adalah variasi TPQ shift ("TPQ Pagi" / "TPQ Sore"). */
export function isTpqShift(lembaga) {
  const v = String(lembaga || '')
    .trim()
    .toLowerCase()
  return v === 'tpq pagi' || v === 'tpq sore'
}

/** Normalisasi nama lembaga: "TPQ Pagi"/"TPQ Sore" → "TPQ". Sisanya pass-through. */
export function normalizeTpqName(lembaga) {
  if (isTpqShift(lembaga)) return 'TPQ'
  return lembaga
}

/** Ekstrak shift dari nama lembaga: "TPQ Pagi" → "Pagi", "TPQ Sore" → "Sore", lainnya → null. */
export function getTpqShift(lembaga) {
  const v = String(lembaga || '')
    .trim()
    .toLowerCase()
  if (v === 'tpq pagi') return 'Pagi'
  if (v === 'tpq sore') return 'Sore'
  return null
}

/**
 * Dry-run scan: count santri yang akan dimigrasi + ambil sample examples.
 * Tidak ubah data apapun.
 *
 * @param {Array} santriArr - array santri dari collection
 * @returns {{ totalToMigrate: number, pagi: number, sore: number, examples: Array, alreadyMigrated: number }}
 */
export function scanTpqShiftMigration(santriArr) {
  const result = {
    totalToMigrate: 0,
    pagi: 0,
    sore: 0,
    examples: [],
    alreadyMigrated: 0
  }
  for (const s of santriArr || []) {
    const lmb = String(s.lembaga || '').trim()
    if (isTpqShift(lmb)) {
      result.totalToMigrate++
      const shift = getTpqShift(lmb)
      if (shift === 'Pagi') result.pagi++
      else if (shift === 'Sore') result.sore++
      if (result.examples.length < 5) {
        result.examples.push({
          id: s.id,
          nama: s.nama,
          before: { lembaga: lmb, shift: s.shift || null },
          after: { lembaga: 'TPQ', shift }
        })
      }
    } else if (lmb === 'TPQ' && s.shift) {
      result.alreadyMigrated++
    }
  }
  return result
}

/**
 * Execute migration: untuk setiap santri "TPQ Pagi"/"TPQ Sore" → update lembaga="TPQ" + shift.
 * Batch dengan delay untuk hindari Firestore rate limit.
 *
 * @param {Array} santriArr - array santri yang ada
 * @param {Object} opts - { onProgress?: (i, total) => void, dryRun?: boolean }
 * @returns {Promise<{ ok: number, fail: number, errors: Array }>}
 */
export async function runTpqShiftMigration(santriArr, opts = {}) {
  const { onProgress, dryRun = false } = opts
  const targets = (santriArr || []).filter((s) => isTpqShift(s.lembaga))
  const result = { ok: 0, fail: 0, errors: [], total: targets.length, dryRun }
  for (let i = 0; i < targets.length; i++) {
    const s = targets[i]
    const shift = getTpqShift(s.lembaga)
    if (!dryRun) {
      try {
        // v.21.23.0526: include id + nama untuk lolos Firestore rules check (rules merge old+new resource).
        // Beberapa doc santri lama tidak punya field `id` → rule require `id is number||string` gagal silent.
        const idNum = Number(s.id)
        const payload = {
          id: Number.isFinite(idNum) ? idNum : String(s.id),
          nama: String(s.nama || '').trim() || 'Tanpa Nama',
          lembaga: 'TPQ',
          shift,
          _migrated_tpq_shift_at: new Date().toISOString()
        }
        // v.21.23.0526: setDoc merge:true lebih reliable utk migrasi (request.resource.data deterministic)
        await setDoc(doc(db, 'santri', String(s.id)), payload, { merge: true })
        result.ok++
      } catch (e) {
        result.fail++
        result.errors.push({ id: s.id, nama: s.nama, err: e.message })
        console.error(
          `[tpqMigrate] FAIL santri.id=${s.id} nama=${s.nama} lembaga=${s.lembaga} →`,
          e.message,
          e
        )
      }
    } else {
      result.ok++
    }
    if (typeof onProgress === 'function') onProgress(i + 1, targets.length)
    if (!dryRun && i > 0 && i % 50 === 0) await new Promise((r) => setTimeout(r, 200))
  }
  if (result.errors.length > 0) {
    console.error(`[tpqMigrate] Selesai dgn ${result.errors.length} errors:`)
    console.table(result.errors)
  }
  return result
}
