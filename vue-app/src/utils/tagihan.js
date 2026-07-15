// tagihan.js — sumber TUNGGAL untuk "berapa yang sudah terbayar" pada keuangan_tagihan.
//
// LATAR: kolom riil `terbayar` (DDL keuangan.sql:12, terdaftar di db.js COLS) dulu TAK PERNAH
// diisi siapa pun — app menulis `bayar`/`dibayar` yang tak terdaftar sehingga jatuh ke ekor
// jsonb `data`, dan RPC apply_bmt_payment pun menulis ke data->>'bayar'. Akibatnya kolomnya
// selamanya 0: query SQL/laporan yang percaya `terbayar` diam-diam salah (semua tampak nunggak
// penuh). Sekarang `terbayar` dijadikan sumber kebenaran supaya bisa difilter/di-index di SQL.
//
// JANGAN campur dengan `trx.bayar` di strukBuilder/receiptHtml/escpImage/ModalPOS — itu UANG
// TUNAI YANG DISERAHKAN pembeli (buat hitung kembalian), konsep yang beda sama sekali.

/** Jumlah yang SUDAH terbayar dari sebuah baris keuangan_tagihan.
 *
 *  Sumber kebenaran = kolom riil `terbayar`. Fallback ke ekor jsonb (`bayar`/`dibayar`) adalah
 *  JARING PENGAMAN TRANSISI untuk baris yang belum kena migrasi backfill
 *  (20260715120000_tagihan_terbayar_backfill.sql) — mis. kalau web ter-deploy sebelum
 *  `supabase db push`, atau Electron masih memuat snapshot bundle lama yang menulis jsonb.
 *  Tanpa fallback, baris lama akan tampak "belum bayar" sama sekali.
 *
 *  HAPUS fallback ini setelah backfill dipastikan jalan DAN semua klien lama sudah diperbarui.
 *  Sengaja `> 0` (bukan `??`): baris yang belum backfill punya terbayar = 0 (default DDL), jadi
 *  0 tak bisa dibedakan dari "memang belum bayar" — mengambil jsonb saat 0 selalu lebih aman.
 */
export function terbayarDari(t) {
  const kolom = Number(t?.terbayar || 0)
  if (kolom > 0) return kolom
  const ekor = Number(t?.bayar ?? t?.dibayar ?? 0)
  return Number.isFinite(ekor) && ekor > 0 ? ekor : 0
}

/** Sisa yang belum dibayar (tak pernah negatif). */
export function sisaTagihan(t) {
  return Math.max(0, Number(t?.nominal || 0) - terbayarDari(t))
}

/** Status tagihan dari nominal vs terbayar. Toleransi 0.5 = cermin ambang lama di
 *  PosSantriView/PembayaranPendingView (nominal bigint, tapi input bisa pecahan). */
export function statusTagihan(nominal, terbayar) {
  const penuh = Number(nominal) || 0
  const byr = Number(terbayar) || 0
  if (penuh > 0 && byr >= penuh - 0.5) return 'lunas'
  return byr > 0 ? 'partial' : 'belum'
}
