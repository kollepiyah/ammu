// v.100: Migrasi Gabung Duplikat (dedupe) — untuk tombol "Migrate" di panel Analisis Data Duplikat.
//   AMAN & REVERSIBLE. Menggabung duplikat lewat 2 jalur:
//     1) IDENTITAS UNIK (selalu digabung): santri NIS sama / NISN sama; guru WA sama.
//     2) NAMA SAMA + SINYAL PENGUAT (v.100, atas keputusan kyai): hanya digabung bila nama
//        sama DAN ada minimal 1 sinyal yang menguatkan "orang yang sama" DAN tidak ada
//        konflik identitas keras. Sinyal santri: NIS/NISN/NIK/tgl_lahir/WA-wali sama, atau
//        (lembaga+kelas) / (lembaga_sekolah+kelas_sekolah) sama. Sinyal guru: WA/NIK sama, atau
//        (lembaga+jabatan) sama. KONFLIK KERAS (blokir merge walau nama sama): NIS/NISN/NIK/
//        tgl_lahir berbeda (santri); WA/NIK berbeda (guru) → dianggap 2 orang berbeda.
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

// ---- v.100: sinyal penguat & konflik identitas untuk merge berbasis NAMA ----
function eqText(a, b) {
  return !isEmpty(a) && !isEmpty(b) && norm(a) === norm(b)
}
function diffText(a, b) {
  return !isEmpty(a) && !isEmpty(b) && norm(a) !== norm(b)
}
function eqPhone(a, b) {
  const da = digits(a)
  const db = digits(b)
  return da.length >= 8 && da === db
}
function diffPhone(a, b) {
  const da = digits(a)
  const db = digits(b)
  return da.length >= 8 && db.length >= 8 && da !== db
}
// Apakah d & primary kemungkinan ORANG YANG SAMA (nama sudah sama di grup ini)?
function santriSamePerson(p, d) {
  // konflik keras → pasti beda orang
  if (diffText(p.nis, d.nis) || diffText(p.nisn, d.nisn) || diffText(p.nik, d.nik) || diffText(p.tgl_lahir, d.tgl_lahir)) return false
  // butuh ≥1 sinyal penguat
  if (eqText(p.nis, d.nis) || eqText(p.nisn, d.nisn) || eqText(p.nik, d.nik) || eqText(p.tgl_lahir, d.tgl_lahir)) return true
  if (eqPhone(p.wa, d.wa)) return true
  if (eqText(p.lembaga, d.lembaga) && eqText(p.kelas, d.kelas)) return true
  if (eqText(p.lembaga_sekolah, d.lembaga_sekolah) && eqText(p.kelas_sekolah, d.kelas_sekolah)) return true
  return false
}
function guruSamePerson(p, d) {
  if (diffPhone(p.wa, d.wa) || diffText(p.nik, d.nik)) return false
  if (eqPhone(p.wa, d.wa) || eqText(p.nik, d.nik)) return true
  if (eqText(p.lembaga, d.lembaga) && eqText(p.jabatan, d.jabatan)) return true
  return false
}

// Pilih primer (paling lengkap; tiebreak: punya NIS, lalu id terkecil) + susun patch isi field kosong.
// filterFn(primary, dup) opsional → hanya merge dup yang lolos (dipakai jalur NAMA-sama).
function planGroup(items, filterFn = null) {
  const sorted = [...items].sort((a, b) => {
    const c = completeness(b) - completeness(a)
    if (c !== 0) return c
    const na = isEmpty(a.nis) ? 1 : 0
    const nb = isEmpty(b.nis) ? 1 : 0
    if (na !== nb) return na - nb
    return String(a.id || '').localeCompare(String(b.id || ''))
  })
  const primary = sorted[0]
  let dups = sorted.slice(1)
  if (filterFn) dups = dups.filter((d) => filterFn(primary, d))
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

  function addSantriGroups(groups, filterFn = null) {
    for (const g of groups) {
      // jangan ikutkan record yang sudah dijadwalkan dihapus di pass sebelumnya
      const items = g.items.filter((s) => !seenSantriDup.has(s.id))
      if (items.length < 2) continue
      const { primary, dups, patch } = planGroup(items, filterFn)
      const realDups = dups.filter((d) => d.id && d.id !== primary.id && !seenSantriDup.has(d.id))
      if (!realDups.length) continue
      for (const d of realDups) seenSantriDup.add(d.id)
      plan.santri.push({ primary, dups: realDups, patch })
    }
  }
  // pass 1-2: identitas unik (selalu gabung)
  addSantriGroups(groupBy(santriList.filter((s) => norm(s.nis)), (s) => 'nis:' + norm(s.nis)))
  addSantriGroups(groupBy(santriList.filter((s) => norm(s.nisn)), (s) => 'nisn:' + norm(s.nisn)))
  // pass 3 (v.100): NAMA sama + sinyal penguat
  addSantriGroups(groupBy(santriList.filter((s) => norm(s.nama)), (s) => 'nama:' + norm(s.nama)), santriSamePerson)

  function addGuruGroups(groups, filterFn = null) {
    for (const g of groups) {
      const items = g.items.filter((x) => !seenGuruDup.has(x.id))
      if (items.length < 2) continue
      const { primary, dups, patch } = planGroup(items, filterFn)
      const realDups = dups.filter((d) => d.id && d.id !== primary.id && !seenGuruDup.has(d.id))
      if (!realDups.length) continue
      for (const d of realDups) seenGuruDup.add(d.id)
      plan.guru.push({ primary, dups: realDups, patch })
    }
  }
  // pass 1: WA sama (identitas). pass 2 (v.100): NAMA sama + sinyal penguat.
  addGuruGroups(groupBy(guruList.filter((x) => digits(x.wa).length >= 8), (x) => 'wa:' + digits(x.wa)))
  addGuruGroups(groupBy(guruList.filter((x) => norm(x.nama)), (x) => 'nama:' + norm(x.nama)), guruSamePerson)
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
