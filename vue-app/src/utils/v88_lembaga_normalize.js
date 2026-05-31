// v.88.0526: Normalisasi lembaga santri ke nama canonical (kyai 31 Mei 2026).
//   - lembaga 'TPQ' (+ field shift) -> 'TPQ Pagi' / 'TPQ Sore'
//       (kyai: TPQ Pagi & TPQ Sore = lembaga TERPISAH, group TPQ; BUKAN shift).
//       Santri 'TPQ' TANPA shift TIDAK dimigrasi (perlu assign manual) -> dilaporkan terpisah.
//   - 'P3H'      -> 'PPPH' (nama lama).
//   - 'PRA PTPT' -> 'Pra PTPT' (casing canonical; menyatu dgn yg sudah benar).
//   Idempotent. setDoc merge sertakan id + nama agar lolos firestore rules /santri.
import { setDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebase'

const RENAME = [
  { from: ['p3h'], to: 'PPPH' },
  { from: ['pra ptpt'], to: 'Pra PTPT' } // mencakup 'PRA PTPT' uppercase
]

function shiftToLembaga(shift) {
  const v = String(shift || '').trim().toLowerCase()
  if (v === 'pagi') return 'TPQ Pagi'
  if (v === 'sore') return 'TPQ Sore'
  return null
}

// Target lembaga canonical utk 1 santri; null = tidak perlu migrasi.
export function targetLembaga(s) {
  const cur = String(s.lembaga || '').trim()
  const low = cur.toLowerCase()
  if (low === 'tpq') {
    const t = shiftToLembaga(s.shift)
    return t && t !== cur ? t : null // tanpa shift -> null (manual)
  }
  for (const r of RENAME) {
    if (r.from.includes(low) && cur !== r.to) return r.to
  }
  return null
}

// Dry-run: hitung yg akan dimigrasi + santri TPQ tanpa shift (perlu manual).
export function scanLembagaNormalize(santriArr) {
  const res = { total: 0, byTarget: {}, tpqNoShift: 0, examples: [] }
  for (const s of santriArr || []) {
    const cur = String(s.lembaga || '').trim()
    if (cur.toLowerCase() === 'tpq' && !shiftToLembaga(s.shift)) {
      res.tpqNoShift++
      continue
    }
    const t = targetLembaga(s)
    if (!t) continue
    res.total++
    res.byTarget[t] = (res.byTarget[t] || 0) + 1
    if (res.examples.length < 8) {
      res.examples.push({ id: s.id, nama: s.nama, before: cur, after: t })
    }
  }
  return res
}

// Execute migrasi. opts: { onProgress?(i,total), dryRun? }
export async function runLembagaNormalize(santriArr, opts = {}) {
  const { onProgress, dryRun = false } = opts
  const targets = []
  for (const s of santriArr || []) {
    const t = targetLembaga(s)
    if (t) targets.push({ s, t })
  }
  const result = { ok: 0, fail: 0, errors: [], total: targets.length, dryRun }
  for (let i = 0; i < targets.length; i++) {
    const { s, t } = targets[i]
    if (!dryRun) {
      try {
        const idNum = Number(s.id)
        const payload = {
          id: Number.isFinite(idNum) ? idNum : String(s.id),
          nama: String(s.nama || '').trim() || 'Tanpa Nama',
          lembaga: t,
          _migrated_lembaga_v88_at: new Date().toISOString()
        }
        await setDoc(doc(db, 'santri', String(s.id)), payload, { merge: true })
        result.ok++
      } catch (e) {
        result.fail++
        result.errors.push({ id: s.id, nama: s.nama, err: e.message })
      }
    } else {
      result.ok++
    }
    if (typeof onProgress === 'function') onProgress(i + 1, targets.length)
    if (!dryRun && i > 0 && i % 50 === 0) await new Promise((r) => setTimeout(r, 200))
  }
  return result
}
