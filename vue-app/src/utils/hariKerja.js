// hariKerja — hitung jumlah hari kerja (non-libur) dalam rentang tanggal.
// Dipakai untuk prorata bisyaroh sekolah (faktor kehadiran) & rekap.
// PURE — "today" & sumber libur di-inject (deterministik/testable).
import { tanggalRentang } from './absensiRekap'

function dow(iso) {
  const [y, m, d] = String(iso).split('-').map(Number)
  return new Date(y, m - 1, d).getDay() // 0=Minggu..6=Sabtu
}

// Jumlah hari kerja dari startIso s/d min(endIso, todayIso bila diberikan).
// Libur = Jumat (bila liburJumat!==false) ∪ hariLiburList ∪ liburEventSet.
export function hariKerjaCount(startIso, endIso, opts = {}) {
  const { liburJumat = true, hariLiburList = [], liburEventSet = null, todayIso = null } = opts
  const manual = new Set((hariLiburList || []).map(String))
  const events = liburEventSet instanceof Set ? liburEventSet : new Set(liburEventSet || [])
  const batas = todayIso && String(todayIso) < String(endIso) ? String(todayIso) : endIso
  let n = 0
  for (const iso of tanggalRentang(startIso, batas)) {
    if (liburJumat !== false && dow(iso) === 5) continue
    if (manual.has(iso)) continue
    if (events.has(iso)) continue
    n++
  }
  return n
}
