// v.100 Batch10: Migrasi Lembaga — perbaiki SALAH IMPOR penempatan lembaga santri.
//   Kasus nyata kyai: (A) kelas Qiraati berisi "Level ..." tapi lembaga masih TPQ Pagi
//   (harusnya PTPT; "Pra PTPT ..." → Pra PTPT); (B) lembaga_sekolah terisi nilai NGAJI
//   ("Sekolah: TPQ Pagi" — invalid, sekolah hanya TK/SDI/PKBM); (C) lembaga TPQ tapi
//   lembaga_sekolah TK (flag cek-manual, default TIDAK dicentang).
//   Scan = report-only. Apply = updateDoc parsial per santri + backup nilai LAMA ke
//   audit_log (aksi 'update', bisa dipulihkan manual). Saran lembaga (rule A) EDITABLE.
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'

export const LEMBAGA_QIRAATI_OPSI = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH']
const SEKOLAH_VALID = ['tk', 'sdi', 'pkbm', 'smp', 'sma']

function low(v) {
  return String(v == null ? '' : v).trim().toLowerCase()
}
function isTpqFamily(lmb) {
  return low(lmb).startsWith('tpq')
}

// Tebak lembaga Qiraati yang BENAR dari string kelas. '' = tidak bisa menebak.
export function inferLembagaFromKelas(kelas) {
  const k = low(kelas)
  if (!k || k === '-') return ''
  if (/pra\s*[-_]?\s*ptpt/.test(k)) return 'Pra PTPT'
  // keputusan kyai 10 Jun: kelas berisi "Level" (tanpa "Pra PTPT") = PTPT
  if (/\blevel\b/.test(k)) return 'PTPT'
  if (/\bjuz\b/.test(k)) return 'PTPT'
  if (/jilid|persiapan|khotam|kpi|finishing/.test(k)) return 'TPQ' // family (Pagi/Sore tak bisa ditebak)
  return ''
}

/**
 * Scan daftar santri → temuan salah penempatan lembaga.
 * @returns {Array<{id,nama,nis,lembaga,kelas,lembaga_sekolah,kelas_sekolah,type,alasan,saranLembaga,patch,defaultOn}>}
 */
export function scanLembagaFix(santriList = []) {
  const findings = []
  for (const s of santriList) {
    if (!s || !s.id || s.aktif === false) continue
    const base = {
      id: String(s.id),
      nama: s.nama || '(tanpa nama)',
      nis: s.nis || '-',
      lembaga: s.lembaga || '',
      kelas: s.kelas || '',
      lembaga_sekolah: s.lembaga_sekolah || '',
      kelas_sekolah: s.kelas_sekolah || ''
    }

    // ── Rule A: kelas Qiraati ↔ lembaga tidak cocok ──
    const inferred = inferLembagaFromKelas(s.kelas)
    if (inferred === 'TPQ') {
      if (s.lembaga && !isTpqFamily(s.lembaga)) {
        findings.push({
          ...base,
          type: 'kelas_lembaga',
          alasan: `Kelas "${s.kelas}" pola TPQ (Jilid/Persiapan/KPI) tapi lembaga "${s.lembaga}"`,
          saranLembaga: 'TPQ Pagi', // editable di UI (Pagi/Sore tak bisa ditebak dari kelas)
          defaultOn: true
        })
      }
    } else if (inferred && low(s.lembaga) !== low(inferred)) {
      findings.push({
        ...base,
        type: 'kelas_lembaga',
        alasan: `Kelas "${s.kelas}" pola ${inferred} tapi lembaga "${s.lembaga || '(kosong)'}"`,
        saranLembaga: inferred,
        defaultOn: true
      })
    }

    // ── Rule B: lembaga_sekolah berisi nilai BUKAN sekolah (mis. "TPQ Pagi") ──
    const ls = low(s.lembaga_sekolah)
    if (ls && !SEKOLAH_VALID.includes(ls)) {
      findings.push({
        ...base,
        type: 'sekolah_invalid',
        alasan: `Lembaga sekolah "${s.lembaga_sekolah}" bukan TK/SDI/PKBM → dikosongkan`,
        patch: { lembaga_sekolah: '', kelas_sekolah: '' },
        defaultOn: true
      })
    }

    // ── Rule C (cek manual): lembaga TPQ tapi sekolah TK ──
    if (isTpqFamily(s.lembaga) && ls === 'tk') {
      findings.push({
        ...base,
        type: 'tpq_tk',
        alasan: `Lembaga ${s.lembaga} tapi sekolah TK — cek manual (kyai: santri TPQ bukan TK)`,
        patch: { lembaga_sekolah: '', kelas_sekolah: '' },
        defaultOn: false
      })
    }
  }
  return findings
}

/**
 * Terapkan perbaikan. items = temuan TERPILIH; tiap item rule A pakai `saranLembaga`
 * (sudah bisa diedit user), rule B/C pakai `patch`.
 * Nilai LAMA di-backup ke audit_log (aksi 'update') sebelum tulis. Best-effort, tidak memblok.
 */
export async function applyLembagaFix(items = [], opts = {}) {
  const { onProgress, sesi } = opts
  let i = 0
  let ok = 0
  let fail = 0
  const errors = []
  for (const it of items) {
    const patch = it.type === 'kelas_lembaga' ? { lembaga: it.saranLembaga || '' } : { ...(it.patch || {}) }
    if (!Object.keys(patch).length) { i++; continue }
    try {
      const before = {}
      for (const k of Object.keys(patch)) {
        before[k] = k === 'lembaga' ? it.lembaga : it[k]
      }
      const auditId = `upd_santri_${it.id}_${Date.now()}`
      await setDoc(doc(db, 'audit_log', auditId), {
        id: auditId,
        aksi: 'update',
        collection: 'santri',
        doc_id: String(it.id),
        data_snapshot: JSON.stringify({ nama: it.nama, sebelum: before, sesudah: patch }).slice(0, 50000),
        alasan: 'Migrasi Lembaga (fix salah impor): ' + (it.alasan || it.type),
        user_id: String(sesi?.id || 'unknown'),
        user_nama: sesi?.nama || sesi?.guru || 'unknown',
        timestamp: new Date().toISOString()
      }).catch(() => {})
      await updateDoc(doc(db, 'santri', String(it.id)), patch)
      ok++
    } catch (e) {
      fail++
      errors.push(`santri/${it.id}: ${e.message || e}`)
    }
    i++
    onProgress && onProgress(i, items.length)
  }
  return { ok, fail, total: items.length, errors }
}
