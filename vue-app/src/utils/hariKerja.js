// hariKerja — hitung jumlah hari kerja (non-libur) dalam rentang tanggal.
// Dipakai untuk prorata bisyaroh sekolah (faktor kehadiran) & rekap.
// PURE — "today" & sumber libur di-inject (deterministik/testable).
import { tanggalRentang } from './absensiRekap'

function dow(iso) {
  const [y, m, d] = String(iso).split('-').map(Number)
  return new Date(y, m - 1, d).getDay() // 0=Minggu..6=Sabtu
}

// Jumlah hari kerja dari startIso s/d min(endIso, todayIso bila diberikan).
// hariAktif (array getDay 0=Ahad..6=Sabtu) = jadwal mingguan lembaga; bila diberikan,
//   HANYA hari-hari itu yang dihitung (mis. lembaga 5-hari) — menggantikan aturan Jumat.
// Bila hariAktif null/kosong → default: semua hari KECUALI Jumat (bila liburJumat!==false).
// Libur kalender (hariLiburList ∪ liburEventSet) SELALU dikurangi.
export function hariKerjaCount(startIso, endIso, opts = {}) {
  const {
    liburJumat = true,
    hariLiburList = [],
    liburEventSet = null,
    todayIso = null,
    hariAktif = null
  } = opts
  const aktifSet =
    Array.isArray(hariAktif) && hariAktif.length ? new Set(hariAktif.map(Number)) : null
  const manual = new Set((hariLiburList || []).map(String))
  const events = liburEventSet instanceof Set ? liburEventSet : new Set(liburEventSet || [])
  const batas = todayIso && String(todayIso) < String(endIso) ? String(todayIso) : endIso
  let n = 0
  for (const iso of tanggalRentang(startIso, batas)) {
    const d = dow(iso)
    if (aktifSet) {
      if (!aktifSet.has(d)) continue // jadwal lembaga eksplisit
    } else if (liburJumat !== false && d === 5) {
      continue // default: Jumat libur
    }
    if (manual.has(iso)) continue
    if (events.has(iso)) continue
    n++
  }
  return n
}
