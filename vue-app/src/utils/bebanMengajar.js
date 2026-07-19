// bebanMengajar — master beban mengajar SEKOLAH per guru (settings.bebanMengajar[]).
// Baris: { guru_id, lembaga, mapel, jp }. Dasar bisyaroh sekolah hitungan `per_jp`:
//   bisyaroh_sekolah(guru,lembaga) = Σ(jp mapel di lembaga) × tarif/JP × faktor kehadiran.
// Mapel = TEKS BEBAS (BUKAN dari rapor; rapor sekolah hanya memuat mapel Diniyah).
// SEMUA fungsi PURE — `settings` di-pass eksplisit.
import { canonLembaga } from '@/composables/useLembaga'

export function normalizeBeban(row) {
  const r = row || {}
  const jp = Number(r.jp)
  // hari = weekday getDay 0=Ahad..6=Sabtu tempat mapel ini diajar. jp = JP PER PERTEMUAN
  //   (per hari), jadi beban mingguan mapel = jp × jumlah hari.
  const hari = Array.isArray(r.hari)
    ? [...new Set(r.hari.map(Number).filter((n) => Number.isInteger(n) && n >= 0 && n <= 6))].sort(
        (a, b) => a - b
      )
    : []
  return {
    guru_id: String(r.guru_id ?? r.guruId ?? '').trim(),
    lembaga: canonLembaga(r.lembaga || ''),
    mapel: String(r.mapel || '').trim(),
    hari,
    jp: Number.isFinite(jp) && jp > 0 ? jp : 0
  }
}

// Daftar beban ternormalisasi & valid (punya guru_id & jp>0).
export function bebanList(settings) {
  const raw = (settings || {}).bebanMengajar
  return (Array.isArray(raw) ? raw : []).map(normalizeBeban).filter((b) => b.guru_id && b.jp > 0)
}

// Total JP MINGGUAN per lembaga untuk 1 guru → { [lembaga]: jpMingguan }.
//   jpMingguan = Σ (jp per pertemuan × jumlah hari mapel itu diajar). Utk tampilan/ringkasan.
export function jpByLembagaForGuru(settings, guruId) {
  const gid = String(guruId)
  const out = {}
  for (const b of bebanList(settings)) {
    if (b.guru_id !== gid) continue
    const key = b.lembaga || '-'
    out[key] = (out[key] || 0) + b.jp * (b.hari.length || 0)
  }
  return out
}

// Jadwal JP per HARI (weekday) utk 1 guru di 1 lembaga → { [weekday 0..6]: totalJP }.
//   Dijumlah lintas mapel yang diajar di hari itu.
export function jpPerHariForGuru(settings, guruId, lembaga) {
  const gid = String(guruId)
  const lem = canonLembaga(lembaga || '')
  const out = {}
  for (const b of bebanList(settings)) {
    if (b.guru_id !== gid || b.lembaga !== lem) continue
    for (const h of b.hari) out[h] = (out[h] || 0) + b.jp
  }
  return out
}

function _dow(iso) {
  const [y, m, d] = String(iso).split('-').map(Number)
  return new Date(y, m - 1, d).getDay()
}

/**
 * JP yang BENAR-BENAR diajar dalam satu periode (opsi C — bayar per JP per pertemuan).
 * Tiap tanggal: lewati bila libur; ambil JP terjadwal di weekday itu (0 = guru tak mengajar
 * hari itu → dilewati, TIDAK dianggap absen); bila guru HADIR pada tanggal itu → JP dihitung.
 * @returns {{diajar:number, terjadwal:number}} JP diajar & JP seharusnya (utk info).
 */
export function jpDiajarPeriode({ jpPerHari, tanggalList, hadirSet, liburSet } = {}) {
  const jph = jpPerHari || {}
  const hadir = hadirSet instanceof Set ? hadirSet : new Set(hadirSet || [])
  const libur = liburSet instanceof Set ? liburSet : new Set(liburSet || [])
  let diajar = 0
  let terjadwal = 0
  for (const iso of tanggalList || []) {
    if (libur.has(iso)) continue
    const jp = Number(jph[_dow(iso)] || 0)
    if (!jp) continue // tak terjadwal hari itu → bukan absen
    terjadwal += jp
    if (hadir.has(iso)) diajar += jp
  }
  return { diajar, terjadwal }
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
