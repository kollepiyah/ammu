// v.100 Batch14: Auto-generate No. Induk santri (field Firestore tetap `nis` — jangan rename,
//   dipakai login santri/VA BMT/dedupe). Label UI = "No. Induk". NIS & NISN Dinas (santri sekolah
//   TK/SDI/PKBM) = field TERPISAH `nis_sekolah` + `nisn`, diinput MANUAL, tidak disentuh util ini.
//   Format No. Induk = NNNN + DDMMYY (10 digit). Contoh 0001120399 = urutan 0001, lahir 12-03-99.
//     - NNNN  : nomor urut GLOBAL berdasar tgl lahir TERTUA→termuda; seri (tgl sama) → nama A–Z.
//     - DDMMYY: tgl lahir santri itu sendiri (dari tgl_lahir 'YYYY-MM-DD').
//   MODE IMPOR : re-sort & assign ulang SEMUA santri (reshuffle NNNN menyesuaikan tgl lahir tertua).
//   MODE PSB   : APPEND — santri baru meneruskan NNNN berikutnya (max+1), TANPA reshuffle (kyai:
//                "kalau dari PSB tetap meneruskan, walau lebih tua").
//   Santri tanpa tgl lahir valid → DILEWATI (NIS lama dibiarkan apa adanya).
//   CATATAN: NIS = field, BUKAN doc id. Referensi lintas-koleksi (pembayaran/tabungan/POS/notif)
//   pakai santri_id (doc id) → regenerate NIS aman, tak merusak riwayat. (VA BMT turunan NIS bila
//   va_bmt belum diterbitkan — kyai aktifkan VA setelah data lengkap & NIS stabil.)
import { updateOne, setOne } from '@/services/db'

// Normalisasi tgl_lahir ke 'YYYY-MM-DD'. Toleran 'DD/MM/YYYY' / 'YYYY-M-D' / Date. '' bila tak valid.
export function normDob(v) {
  if (!v) return ''
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  const s = String(v).trim()
  let m = s.match(/^(\d{4})[/\-.](\d{1,2})[/\-.](\d{1,2})/)
  if (m) return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`
  m = s.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/)
  if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`
  return ''
}

// 'YYYY-MM-DD' → 'DDMMYY'. '' bila tak valid.
export function ddmmyy(dobIso) {
  const m = String(dobIso || '').match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return ''
  return m[3] + m[2] + m[1].slice(2)
}

// NNNN tertinggi di antara NIS valid (10 digit) yang ada — basis APPEND mode PSB.
export function maxRankOf(santriList) {
  let mx = 0
  for (const s of santriList || []) {
    const nis = String(s && s.nis != null ? s.nis : '')
    if (/^\d{10}$/.test(nis)) {
      const r = parseInt(nis.slice(0, 4), 10)
      if (r > mx) mx = r
    }
  }
  return mx
}

// MODE PSB: NIS santri baru = (maxRank+1) + DDMMYY-nya. '' kalau tgl lahir kosong/invalid.
export function nextNisForNew(santriList, dobRaw) {
  const d = ddmmyy(normDob(dobRaw))
  if (!d) return ''
  return String(maxRankOf(santriList) + 1).padStart(4, '0') + d
}

// MODE IMPOR: rencana re-generate SEMUA (tanpa menulis).
//   Return { changes:[{id,nama,oldNis,newNis,dob,changed}], skipped:[{id,nama}], total, max }
export function planRegenerateNis(santriList) {
  const withDob = []
  const skipped = []
  for (const s of santriList || []) {
    if (!s || s.id == null) continue
    const dob = normDob(s.tgl_lahir)
    if (!dob) {
      skipped.push({ id: String(s.id), nama: s.nama || '-' })
      continue
    }
    withDob.push({ id: String(s.id), nama: String(s.nama || ''), dob, oldNis: String(s.nis || '') })
  }
  withDob.sort((a, b) => {
    if (a.dob !== b.dob) return a.dob < b.dob ? -1 : 1 // tertua dulu
    const na = a.nama.toLowerCase(),
      nb = b.nama.toLowerCase()
    return na < nb ? -1 : na > nb ? 1 : 0 // seri → nama A–Z
  })
  const changes = []
  let rank = 0
  for (const it of withDob) {
    rank++
    const newNis = String(rank).padStart(4, '0') + ddmmyy(it.dob)
    changes.push({
      id: it.id,
      nama: it.nama,
      oldNis: it.oldNis,
      newNis,
      dob: it.dob,
      changed: newNis !== it.oldNis
    })
  }
  return { changes, skipped, total: withDob.length, max: rank }
}

// Tulis NIS yang berubah saja + 1 entri audit_log ringkasan (best-effort).
//   opts: { onProgress?(i,total), sesi?, mode? }  → { ok, fail, errors, changed }
export async function applyNisChanges(changes, opts = {}) {
  const { onProgress, sesi, mode = 'impor' } = opts
  const todo = (changes || []).filter((c) => c.changed && c.newNis)
  let ok = 0,
    fail = 0,
    i = 0
  const errors = []
  for (const c of todo) {
    try {
      await updateOne('santri', String(c.id), { nis: c.newNis })
      ok++
    } catch (e) {
      fail++
      errors.push(`santri/${c.id}: ${e.message || e}`)
    }
    i++
    onProgress && onProgress(i, todo.length)
  }
  if (ok > 0) {
    try {
      const auditId = `gennis_${Date.now()}`
      await setOne('audit_log', auditId, {
        id: auditId,
        aksi: 'generate_nis',
        collection: 'santri',
        doc_id: '(batch)',
        data_snapshot: JSON.stringify({
          mode,
          diubah: todo.map((c) => ({ id: c.id, nama: c.nama, dari: c.oldNis, ke: c.newNis }))
        }).slice(0, 50000),
        alasan: `Generate No. Induk otomatis (${mode}): ${ok} No. Induk diperbarui`,
        user_id: String(sesi && sesi.id != null ? sesi.id : 'unknown'),
        user_nama: (sesi && (sesi.nama || sesi.guru)) || 'unknown',
        timestamp: new Date().toISOString()
      })
    } catch (e) {
      /* audit best-effort — jangan blokir */
    }
  }
  return { ok, fail, errors, changed: todo.length }
}
