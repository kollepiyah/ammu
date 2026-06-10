// v.100: Migrasi Gabung Duplikat (dedupe) — untuk tombol "Migrate" di panel Analisis Data Duplikat.
//   AMAN & REVERSIBLE: hanya menggabung duplikat berdasarkan KUNCI IDENTITAS yang benar-benar unik:
//     - santri: NIS sama, atau NISN sama
//     - guru:   WA (nomor sendiri) sama
//   Duplikat "Nama sama" SENGAJA TIDAK di-auto-merge (rawan false-positive 2 orang beda
//   berbnama sama) → tetap dirapikan manual via Edit/Hapus.
//   Strategi: per grup, pilih 1 record PRIMER (paling lengkap) → isi field kosong primer dari
//   duplikat lain (non-destruktif terhadap data yang sudah ada) → HAPUS duplikat lain
//   (deleteOne sudah mem-backup ke audit_log → bisa di-recover). Idempotent.
import { setDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { deleteOne } from '@/services/firestore'

function norm(v) {
  return String(v == null ? '' : v).trim().toLowerCase()
}
function digits(v) {
  return String(v == null ? '' : v).replace(/\D/g, '')
}
function isEmpty(v) {
  if (v == null) return true
  if (typeof v === 'string') return v.trim() === ''
  if (Array.isArray(v)) return v.length === 0
  if (typeof v === 'object') return Object.keys(v).length === 0
  return false
}
// "kelengkapan" record = jumlah field non-kosong (untuk memilih primer)
function completeness(rec) {
  let n = 0
  for (const k of Object.keys(rec || {})) {
    if (k === 'id') continue
    if (!isEmpty(rec[k])) n++
  }
  return n
}

// Bangun grup duplikat berbasis kunci unik. keyFn(rec) → string kunci ('' = skip).
function groupBy(list, keyFn) {
  const map = new Map()
  for (const it of list || []) {
    const k = keyFn(it)
    if (!k) continue
    if (!map.has(k)) map.set(k, [])
    map.get(k).push(it)
  }
  const groups = []
  for (const [key, arr] of map) if (arr.length > 1) groups.push({ key, items: arr })
  return groups
}

// Pilih primer (paling lengkap; tiebreak: punya NIS, lalu id terkecil) + susun patch isi field kosong.
function planGroup(items) {
  const sorted = [...items].sort((a, b) => {
    const c = completeness(b) - completeness(a)
    if (c !== 0) return c
    const na = isEmpty(a.nis) ? 1 : 0
    const nb = isEmpty(b.nis) ? 1 : 0
    if (na !== nb) return na - nb
    return String(a.id || '').localeCompare(String(b.id || ''))
  })
  const primary = sorted[0]
  const dups = sorted.slice(1)
  const patch = {}
  for (const d of dups) {
    for (const k of Object.keys(d || {})) {
      if (k === 'id') continue
      if (isEmpty(primary[k]) && isEmpty(patch[k]) && !isEmpty(d[k])) patch[k] = d[k]
    }
  }
  return { primary, dups, patch }
}

// Kumpulkan rencana untuk santri (NIS + NISN) & guru (WA). Dedup id yang sama antar-kunci.
function buildPlan({ santriList = [], guruList = [] }) {
  const plan = { santri: [], guru: [] }
  const seenSantriDup = new Set()
  const seenGuruDup = new Set()

  function addSantriGroups(groups) {
    for (const g of groups) {
      const { primary, dups, patch } = planGroup(g.items)
      const realDups = dups.filter((d) => d.id && d.id !== primary.id && !seenSantriDup.has(d.id))
      if (!realDups.length) continue
      for (const d of realDups) seenSantriDup.add(d.id)
      plan.santri.push({ primary, dups: realDups, patch })
    }
  }
  addSantriGroups(groupBy(santriList.filter((s) => norm(s.nis)), (s) => 'nis:' + norm(s.nis)))
  addSantriGroups(groupBy(santriList.filter((s) => norm(s.nisn)), (s) => 'nisn:' + norm(s.nisn)))

  for (const g of groupBy(guruList.filter((x) => digits(x.wa).length >= 8), (x) => 'wa:' + digits(x.wa))) {
    const { primary, dups, patch } = planGroup(g.items)
    const realDups = dups.filter((d) => d.id && d.id !== primary.id && !seenGuruDup.has(d.id))
    if (!realDups.length) continue
    for (const d of realDups) seenGuruDup.add(d.id)
    plan.guru.push({ primary, dups: realDups, patch })
  }
  return plan
}

// Dry-run: hitung grup + dokumen yang akan dihapus + contoh.
export function scanDedupe({ santriList = [], guruList = [] } = {}) {
  const plan = buildPlan({ santriList, guruList })
  const examples = []
  for (const p of [...plan.santri, ...plan.guru]) {
    if (examples.length >= 8) break
    examples.push({
      keep: `${p.primary.nama || '-'} (id ${p.primary.id})`,
      remove: p.dups.map((d) => `${d.nama || '-'} (id ${d.id})`),
      fill: Object.keys(p.patch)
    })
  }
  const santriDel = plan.santri.reduce((n, p) => n + p.dups.length, 0)
  const guruDel = plan.guru.reduce((n, p) => n + p.dups.length, 0)
  return {
    santriGroups: plan.santri.length,
    guruGroups: plan.guru.length,
    santriToRemove: santriDel,
    guruToRemove: guruDel,
    total: santriDel + guruDel,
    examples
  }
}

// Execute. opts: { onProgress?(i,total), dryRun? }
export async function runDedupe({ santriList = [], guruList = [] } = {}, opts = {}) {
  const { onProgress, dryRun = false } = opts
  const plan = buildPlan({ santriList, guruList })
  const all = [
    ...plan.santri.map((p) => ({ coll: 'santri', ...p })),
    ...plan.guru.map((p) => ({ coll: 'guru', ...p }))
  ]
  const total = all.reduce((n, p) => n + p.dups.length + (Object.keys(p.patch).length ? 1 : 0), 0)
  let i = 0
  let ok = 0
  let fail = 0
  const errors = []
  if (dryRun) return { dryRun: true, ok: 0, fail: 0, total, errors }

  for (const p of all) {
    // 1) isi field kosong primer dari duplikat (merge non-destruktif)
    if (Object.keys(p.patch).length) {
      try {
        await setDoc(
          doc(db, p.coll, String(p.primary.id)),
          { ...p.patch, id: p.primary.id, nama: p.primary.nama },
          { merge: true }
        )
        ok++
      } catch (e) {
        fail++
        errors.push(`${p.coll}/${p.primary.id} merge: ${e.message || e}`)
      }
      i++
      onProgress && onProgress(i, total)
    }
    // 2) hapus duplikat (deleteOne → backup audit_log)
    for (const d of p.dups) {
      try {
        await deleteOne(p.coll, String(d.id))
        ok++
      } catch (e) {
        fail++
        errors.push(`${p.coll}/${d.id} delete: ${e.message || e}`)
      }
      i++
      onProgress && onProgress(i, total)
    }
  }
  return { dryRun: false, ok, fail, total, errors }
}
