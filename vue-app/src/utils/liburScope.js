// liburScope — libur kalender ber-scope LEMBAGA.
//
// Kegiatan tipe 'libur'/'libur_nasional' punya field `lembaga[]`:
//   KOSONG  = libur SEMUA lembaga (perilaku lama, kompatibel mundur).
//   terisi  = libur HANYA lembaga tsb (mis. ['SDI','PKBM'] = sekolah libur, ngaji masuk).
//
// Dipakai rekap absen guru (AbsensiGuruView) & bisyaroh per_jp (BisyarohView).
// Pencocokan pakai lembagaScopeMatches supaya label broad ('Qiraati'/'Sekolah') & varian
// keluarga (TPQ Pagi/Sore …) ikut terkena. `settings.hariLibur` (libur manual pondok)
// TETAP global — hanya event kalender yang ber-scope.
import { lembagaScopeMatches } from '@/composables/useLembaga'

function _expand(start, end) {
  const out = []
  if (!start) return out
  const sd = new Date(start)
  const ed = new Date(end || start)
  if (isNaN(sd.getTime()) || isNaN(ed.getTime())) return out
  const cur = new Date(sd)
  let guard = 0
  while (cur <= ed && guard++ < 500) {
    const y = cur.getFullYear()
    const m = String(cur.getMonth() + 1).padStart(2, '0')
    const d = String(cur.getDate()).padStart(2, '0')
    out.push(`${y}-${m}-${d}`)
    cur.setDate(cur.getDate() + 1)
  }
  return out
}

// Index: Map<iso, Array<lembagaScope>> — tiap lembagaScope = array nama lembaga
//   (kosong = SEMUA). Satu tanggal bisa punya >1 event/scope.
export function buildLiburScope(kegiatanList) {
  const map = new Map()
  for (const k of kegiatanList || []) {
    if (k?.tipe !== 'libur' && k?.tipe !== 'libur_nasional') continue
    const scope = Array.isArray(k.lembaga)
      ? k.lembaga.map((x) => String(x || '').trim()).filter(Boolean)
      : []
    for (const iso of _expand(k.tgl_mulai, k.tgl_akhir || k.tgl_mulai)) {
      if (!map.has(iso)) map.set(iso, [])
      map.get(iso).push(scope)
    }
  }
  return map
}

// Apakah `iso` libur untuk `lembagaName`? scope kosong = semua lembaga.
//   lembagaName kosong/null → HANYA libur global (scope kosong) yang mengenai.
export function liburKenaLembaga(scopeMap, iso, lembagaName) {
  const scopes = scopeMap && scopeMap.get(iso)
  if (!scopes || !scopes.length) return false
  return scopes.some((sc) => {
    if (sc.length === 0) return true // libur semua lembaga
    if (!lembagaName) return false
    return sc.some((x) => lembagaScopeMatches(x, lembagaName))
  })
}

// Set tanggal libur (dalam daftar tanggal `tanggalList`) untuk 1 lembaga — utk konsumen
// yang butuh Set (mis. jpDiajarPeriode di bisyaroh).
export function liburSetLembaga(scopeMap, tanggalList, lembagaName) {
  const out = new Set()
  for (const iso of tanggalList || []) {
    if (liburKenaLembaga(scopeMap, iso, lembagaName)) out.add(iso)
  }
  return out
}
