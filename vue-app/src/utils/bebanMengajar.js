// bebanMengajar — master beban mengajar SEKOLAH per guru (settings.bebanMengajar[]).
// Baris: { guru_id, lembaga, mapel, jp }. Dasar bisyaroh sekolah hitungan `per_jp`:
//   bisyaroh_sekolah(guru,lembaga) = Σ(jp mapel di lembaga) × tarif/JP × faktor kehadiran.
// Mapel = TEKS BEBAS (BUKAN dari rapor; rapor sekolah hanya memuat mapel Diniyah).
// SEMUA fungsi PURE — `settings` di-pass eksplisit.
import { canonLembaga } from '@/composables/useLembaga'

export function normalizeBeban(row) {
  const r = row || {}
  const jp = Number(r.jp)
  return {
    guru_id: String(r.guru_id ?? r.guruId ?? '').trim(),
    lembaga: canonLembaga(r.lembaga || ''),
    mapel: String(r.mapel || '').trim(),
    jp: Number.isFinite(jp) && jp > 0 ? jp : 0
  }
}

// Daftar beban ternormalisasi & valid (punya guru_id & jp>0).
export function bebanList(settings) {
  const raw = (settings || {}).bebanMengajar
  return (Array.isArray(raw) ? raw : []).map(normalizeBeban).filter((b) => b.guru_id && b.jp > 0)
}

// Total JP per lembaga untuk 1 guru → { [lembaga]: totalJP }.
export function jpByLembagaForGuru(settings, guruId) {
  const gid = String(guruId)
  const out = {}
  for (const b of bebanList(settings)) {
    if (b.guru_id !== gid) continue
    const key = b.lembaga || '-'
    out[key] = (out[key] || 0) + b.jp
  }
  return out
}

// Hari aktif sekolah per lembaga (getDay 0=Ahad..6=Sabtu) → settings.hariAktifLembaga
//   = { [lembaga]: [0,1,2,3,4] }. Dipakai sbg PENYEBUT prorata per_jp (beda per lembaga,
//   mis. lembaga 5-hari). Tak diatur/kosong → null (pakai default global: semua kecuali Jumat).
export function hariAktifOf(settings, lembaga) {
  const map = (settings || {}).hariAktifLembaga || {}
  const canon = canonLembaga(lembaga || '')
  let arr = map[canon]
  if (!Array.isArray(arr)) {
    const lk = String(canon).toLowerCase()
    for (const [k, v] of Object.entries(map)) {
      if (canonLembaga(k).toLowerCase() === lk) {
        arr = v
        break
      }
    }
  }
  if (!Array.isArray(arr) || !arr.length) return null
  return [...new Set(arr.map(Number).filter((n) => n >= 0 && n <= 6))]
}
