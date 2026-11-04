// Batas "sudah dibaca" per jenis notifikasi sesudah pengguna menekan "Tandai dibaca".
//
// Notif dianggap belum dibaca bila ts-nya > batas jenisnya (useNotifications). Dua hal yang
// dulu membuat notif tersisa sesudah tombol ditekan:
//   1. Daftar jenis ditulis tangan dan lupa 'glondongan' → notif glondongan tak pernah
//      bisa dibaca. Kini setiap jenis yang MUNCUL di daftar ikut ditandai.
//   2. ts bisa di depan jam perangkat (tanggal hasil tes yang diatur ke hari depan, jam HP
//      terlambat dari server) → batas = max(sekarang, ts terbaru jenis itu).

export const JENIS_NOTIF = [
  'supervisi',
  'kritik',
  'post',
  'pembayaran',
  'bisyaroh',
  'tagihan',
  'libur',
  'kegiatan',
  'kenaikan',
  'prestasi',
  'tes',
  'glondongan'
]

export function batasTerbaca(items, now) {
  const out = {}
  for (const j of JENIS_NOTIF) out[j] = now
  for (const it of items || []) {
    if (!it || !it.jenis) continue
    out[it.jenis] = Math.max(Number(out[it.jenis]) || 0, now, Number(it.ts) || 0)
  }
  return out
}
