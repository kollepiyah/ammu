// absenHarian — aturan Input Absensi Harian untuk TANGGAL yang dipilih.
//
// LAPORAN KYAI (6 Agu 2026): "di aplikasi belum bisa input absen manual hari yang
//   sudah terlewat". Benar — `saveHarian` dulu memakai todayJakarta() mati, tanpa
//   pilihan tanggal, sehingga satu-satunya jalan mengoreksi hari lampau adalah
//   memutar lewat tab Impor Fingerprint dengan berkas Excel. Tak wajar untuk
//   pekerjaan sesering ini.
//
// Dua aturan di bawah sengaja dipisah dari view supaya bisa diuji tanpa DOM. Yang
// dijaga bukan kerapian, tapi UANG: baris absensi memberi makan bisyaroh, dan
// simpanan harian memakai setOne = TIMPA PENUH. Menimpa baris 'izin'/'sakit' tanpa
// bertanya = menghapus keterangan yang sudah disetujui, senyap.

/** Tanggal masa depan tak boleh: absen belum terjadi. */
export function alasanTolakTanggal(tgl, hariIni, bolehMundur) {
  const t = String(tgl || '').trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) return 'Tanggal belum dipilih.'
  if (t > String(hariIni)) return 'Tanggal belum terjadi — tak bisa mengisi absen masa depan.'
  if (t < String(hariIni) && !bolehMundur)
    return 'Hanya super admin yang boleh mengisi absen tanggal yang sudah lewat.'
  return null
}

/**
 * Baris yang AKAN TERTIMPA bila simpanan diteruskan.
 *
 * Dipakai untuk bertanya lebih dulu, bukan untuk memblokir — kadang menimpa memang
 * yang diinginkan (mis. membetulkan jam yang salah ketik). Yang tak boleh adalah
 * menimpa tanpa Kyai tahu.
 *
 * `existing` = baris apa adanya dari DB (punya id). Pencocokan lewat `id` karena
 * id-nya deterministik: shift_<guru>_<tanggal>_<shift>.
 */
export function deteksiTimpa(writes, existing) {
  const byId = new Map((existing || []).filter((r) => r && r.id).map((r) => [String(r.id), r]))
  const out = []
  for (const w of writes || []) {
    const lama = byId.get(String(w.id))
    if (!lama) continue
    out.push({
      id: w.id,
      nama: w.guru_nama || lama.guru_nama || '',
      shift: w.shift,
      statusLama: String(lama.status || 'hadir'),
      sourceLama: String(lama.source || ''),
      jamLama: String(lama.jam || '')
    })
  }
  return out
}

/** Status yang membawa keterangan manusia — menimpanya paling merugikan. */
const STATUS_BERKETERANGAN = new Set(['izin', 'sakit', 'cuti'])

/** true bila di antara yang tertimpa ada izin/sakit/cuti (perlu peringatan lebih keras). */
export function adaKeteranganTertimpa(timpa) {
  return (timpa || []).some((t) => STATUS_BERKETERANGAN.has(String(t.statusLama).toLowerCase()))
}
