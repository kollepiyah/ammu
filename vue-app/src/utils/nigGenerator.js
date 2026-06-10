// v.100 Batch16: Auto-generate NIG (Nomor Induk Guru) — analog NIS, untuk koleksi `guru`.
//   Format NIG = NNN + DDMMYY (9 digit). NNN = nomor urut GLOBAL dari tgl TUGAS (tanggal_tugas)
//   TERLAMA→terbaru; seri (tgl sama) → nama A–Z. DDMMYY = tanggal_tugas guru itu.
//   IMPOR guru = re-sort & assign ulang SEMUA (reshuffle). Guru baru via form = APPEND (NNN max+1,
//   TANPA reshuffle). Guru tanpa tanggal_tugas valid → DILEWATI (NIG lama dibiarkan).
//   NIG = field; tak dipakai sbg foreign key lintas-koleksi → regenerate aman.
import { updateDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { normDob, ddmmyy } from '@/utils/nisGenerator' // reuse parser tgl → 'YYYY-MM-DD' / 'DDMMYY'

// NNN tertinggi di antara NIG valid (9 digit) — basis APPEND guru baru.
export function maxRankNig(guruList) {
  let mx = 0
  for (const g of (guruList || [])) {
    const nig = String(g && g.nig != null ? g.nig : '')
    if (/^\d{9}$/.test(nig)) {
      const r = parseInt(nig.slice(0, 3), 10)
      if (r > mx) mx = r
    }
  }
  return mx
}

// APPEND (guru baru): NIG = (maxRank+1) + DDMMYY tanggal tugasnya. '' bila tgl tugas kosong/invalid.
export function nextNigForNew(guruList, tglTugasRaw) {
  const d = ddmmyy(normDob(tglTugasRaw))
  if (!d) return ''
  return String(maxRankNig(guruList) + 1).padStart(3, '0') + d
}

// IMPOR: rencana re-generate SEMUA (tanpa menulis).
//   Return { changes:[{id,nama,oldNig,newNig,changed}], skipped:[{id,nama}], total, max }
export function planRegenerateNig(guruList) {
  const withT = []
  const skipped = []
  for (const g of (guruList || [])) {
    if (!g || g.id == null) continue
    const t = normDob(g.tanggal_tugas)
    if (!t) { skipped.push({ id: String(g.id), nama: g.nama || '-' }); continue }
    withT.push({ id: String(g.id), nama: String(g.nama || ''), t, oldNig: String(g.nig || '') })
  }
  withT.sort((a, b) => {
    if (a.t !== b.t) return a.t < b.t ? -1 : 1 // tugas terlama dulu
    const na = a.nama.toLowerCase(), nb = b.nama.toLowerCase()
    return na < nb ? -1 : na > nb ? 1 : 0 // seri → nama A–Z
  })
  const changes = []
  let rank = 0
  for (const it of withT) {
    rank++
    const newNig = String(rank).padStart(3, '0') + ddmmyy(it.t)
    changes.push({ id: it.id, nama: it.nama, oldNig: it.oldNig, newNig, changed: newNig !== it.oldNig })
  }
  return { changes, skipped, total: withT.length, max: rank }
}

// Tulis NIG yang berubah saja + 1 entri audit_log ringkasan (best-effort).
//   opts: { onProgress?(i,total), sesi? } → { ok, fail, errors, changed }
export async function applyNigChanges(changes, opts = {}) {
  const { onProgress, sesi } = opts
  const todo = (changes || []).filter((c) => c.changed && c.newNig)
  let ok = 0, fail = 0, i = 0
  const errors = []
  for (const c of todo) {
    try {
      await updateDoc(doc(db, 'guru', String(c.id)), { nig: c.newNig })
      ok++
    } catch (e) {
      fail++
      errors.push(`guru/${c.id}: ${e.message || e}`)
    }
    i++
    onProgress && onProgress(i, todo.length)
  }
  if (ok > 0) {
    try {
      const auditId = `gennig_${Date.now()}`
      await setDoc(doc(db, 'audit_log', auditId), {
        id: auditId,
        aksi: 'generate_nig',
        collection: 'guru',
        doc_id: '(batch)',
        data_snapshot: JSON.stringify({ diubah: todo.map((c) => ({ id: c.id, nama: c.nama, dari: c.oldNig, ke: c.newNig })) }).slice(0, 50000),
        alasan: `Generate NIG otomatis: ${ok} NIG diperbarui`,
        user_id: String(sesi && sesi.id != null ? sesi.id : 'unknown'),
        user_nama: (sesi && (sesi.nama || sesi.guru)) || 'unknown',
        timestamp: new Date().toISOString()
      })
    } catch (e) { /* audit best-effort */ }
  }
  return { ok, fail, errors, changed: todo.length }
}
