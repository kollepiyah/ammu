// bebanMengajar — master beban mengajar SEKOLAH per guru (settings.bebanMengajar[]).
// Baris: { guru_id, lembaga, jp_minggu }. Dasar bisyaroh sekolah hitungan `per_jp`:
//   bisyaroh_sekolah(guru,lembaga) = JP yang benar-benar diajar × tarif/JP.
// SEMUA fungsi PURE — `settings` di-pass eksplisit.
//
// v.1.2.1 (Kyai 22 Jul 2026): "saya ingin langsung per guru berapa jam pelajaran per
// minggu" — kolom `mapel` dan `hari[]` DIBUANG. Dulu 1 baris = 1 mapel + daftar hari
// diajar + JP per pertemuan, jadi satu guru bisa perlu 6-8 baris hanya untuk dirinya.
//
// Konsekuensinya jadwal per-weekday tak ada lagi, padahal itu yang dulu dipakai untuk
// memotong bayaran saat guru tak masuk. Penggantinya: JP disebar RATA ke hari aktif
// sekolah (settings.hariAktifLembaga → hariAktifOf), jadi
//     JP per hari = jp_minggu ÷ jumlah hari aktif lembaga
// dan pemotongan per hari tetap jalan tanpa Kyai perlu mengisi hari sama sekali.
import { canonLembaga } from '@/composables/useLembaga'

// Hari aktif sekolah bila settings.hariAktifLembaga belum diatur: semua KECUALI Jumat.
// (0=Ahad … 6=Sabtu)
export const HARI_AKTIF_DEFAULT = [0, 1, 2, 3, 4, 6]

export function normalizeBeban(row) {
  const r = row || {}
  // Bentuk BARU: { jp_minggu }.
  let jpm = Number(r.jp_minggu)
  if (!Number.isFinite(jpm) || jpm <= 0) {
    // Bentuk LAMA: { jp = JP per pertemuan, hari[] } → jp_minggu = jp × jumlah hari.
    //   Dibaca-mundur supaya baris lama (kalau ternyata masih ada di suatu lingkungan)
    //   menghasilkan angka yang SAMA PERSIS dengan hitungan sebelumnya, bukan 0.
    const jpLama = Number(r.jp)
    const hariLama = Array.isArray(r.hari)
      ? [...new Set(r.hari.map(Number).filter((n) => Number.isInteger(n) && n >= 0 && n <= 6))]
      : []
    jpm = Number.isFinite(jpLama) && jpLama > 0 ? jpLama * hariLama.length : 0
  }
  return {
    guru_id: String(r.guru_id ?? r.guruId ?? '').trim(),
    lembaga: canonLembaga(r.lembaga || ''),
    jp_minggu: Number.isFinite(jpm) && jpm > 0 ? jpm : 0
  }
}

// Daftar beban ternormalisasi & valid (punya guru_id & jp_minggu>0).
export function bebanList(settings) {
  const raw = (settings || {}).bebanMengajar
  return (Array.isArray(raw) ? raw : [])
    .map(normalizeBeban)
    .filter((b) => b.guru_id && b.jp_minggu > 0)
}

// Total JP MINGGUAN per lembaga untuk 1 guru → { [lembaga]: jpMingguan }.
//   Satu guru boleh punya lebih dari satu baris di lembaga yang sama → dijumlah.
export function jpByLembagaForGuru(settings, guruId) {
  const gid = String(guruId)
  const out = {}
  for (const b of bebanList(settings)) {
    if (b.guru_id !== gid) continue
    const key = b.lembaga || '-'
    out[key] = (out[key] || 0) + b.jp_minggu
  }
  return out
}

// Hari aktif sekolah per lembaga (getDay 0=Ahad..6=Sabtu) → settings.hariAktifLembaga
//   = { [lembaga]: [0,1,2,3,4] }. Dipakai sbg PENYEBUT prorata per_jp (beda per lembaga,
//   mis. lembaga 5-hari). Tak diatur/kosong → null (pemanggil pakai HARI_AKTIF_DEFAULT).
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
  const bersih = [
    ...new Set(arr.map(Number).filter((n) => Number.isInteger(n) && n >= 0 && n <= 6))
  ]
  return bersih.length ? bersih : null
}

/**
 * JP per HARI AKTIF untuk 1 guru di 1 lembaga → { [weekday 0..6]: jpPerHari }.
 *
 * v.1.2.1: diturunkan dari JP mingguan, BUKAN lagi dari jadwal mapel per hari:
 *   jpPerHari = jp_minggu ÷ jumlah hari aktif lembaga (rata untuk semua hari aktif).
 * Hari di luar hari aktif tidak masuk map → `jpDiajarPeriode` melewatinya dan guru
 * TIDAK dianggap absen di hari itu.
 *
 * Nilainya boleh PECAHAN (mis. 25 JP ÷ 6 hari = 4,1667). Pembulatan sengaja ditahan
 * sampai ujung (rupiah), supaya tak ada rugi/lebih yang menumpuk tiap hari.
 */
export function jpPerHariForGuru(settings, guruId, lembaga) {
  const lem = canonLembaga(lembaga || '')
  const jpm = jpByLembagaForGuru(settings, guruId)[lem || '-'] || 0
  const hari = hariAktifOf(settings, lem) || HARI_AKTIF_DEFAULT
  const out = {}
  if (!(jpm > 0) || !hari.length) return out
  const per = jpm / hari.length
  for (const h of hari) out[h] = per
  return out
}

function _dow(iso) {
  const [y, m, d] = String(iso).split('-').map(Number)
  return new Date(y, m - 1, d).getDay()
}

// Bulatkan 2 desimal — JP hasil pembagian kerap tak bulat; tanpa ini label slip
// menampilkan angka seperti "20.833333333333336 JP".
function _r2(n) {
  return Math.round((Number(n) || 0) * 100) / 100
}

/**
 * JP yang BENAR-BENAR diajar dalam satu periode (bayar per JP).
 * Tiap tanggal: lewati bila libur; ambil JP hari itu (0 = di luar hari aktif → dilewati,
 * TIDAK dianggap absen); bila guru HADIR pada tanggal itu → JP dihitung.
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
    if (!jp) continue // di luar hari aktif → bukan absen
    terjadwal += jp
    if (hadir.has(iso)) diajar += jp
  }
  return { diajar: _r2(diajar), terjadwal: _r2(terjadwal) }
}
