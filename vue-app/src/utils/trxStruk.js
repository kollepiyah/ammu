// trxStruk.js — penomoran & pengelompokan transaksi POS Santri.
//
// LATAR (bug lapor Kyai 3 Agu 2026): nomor struk `MU-NNNddmmyy` dulu dihitung dari
// counter lokal `todayTrxCount` yang diisi sekali saat halaman POS dimuat, dari 80
// BARIS terakhir buku induk. Sekali hari itu lewat ~80 baris (≈12 transaksi), atau
// halaman di-remount, atau ada kasir ke-2 di device lain, hitungannya MUNDUR → seq
// terpakai ulang → dua transaksi berbeda memakai `trx_id` yang SAMA. Baris buku induk
// ber-id acak sehingga tak ada tabrakan PK yang bikin gagal — tersimpan diam-diam.
// Akibatnya di Riwayat POS (group by trx_id) dua transaksi menyatu jadi satu struk:
// item dobel, item milik santri lain (lembaga/status beda), total membengkak — padahal
// struk yang dicetak saat kasir menyimpan sudah benar.
//
// MURNI (tanpa I/O) supaya gampang diuji — pemanggil yang menyediakan daftar nomor
// terpakai (hasil query) dan menyimpan hasilnya.

/** "2026-08-01" -> "010826" (ekor nomor struk). */
export function ddmmyyDari(tanggal) {
  const p = String(tanggal || '').split('-')
  return (p[2] || '') + (p[1] || '') + String(p[0] || '').slice(-2)
}

// "MU-<seq><ddmmyy>" tanpa pemisah — seq = semua digit KECUALI 6 digit tanggal di ekor.
// (`\d+` rakus, jadi grup ke-2 pasti tepat 6 digit terakhir.)
const RE_NOMOR = /^MU-(\d+)(\d{6})$/

/** Nomor struk berikutnya untuk `tanggal`, dijamin belum ada di `terpakai`.
 *
 *  Seq = (nomor TERBESAR hari itu) + 1 — bukan (jumlah transaksi) + 1: transaksi yang
 *  dihapus tak boleh bikin nomor lama dipakai lagi. Lalu tetap dicek satu per satu
 *  kalau-kalau ada nomor non-berurutan dari klien lama.
 *
 *  @param {string} tanggal - "YYYY-MM-DD" (tanggal transaksi, WIB).
 *  @param {Iterable<string>} terpakai - trx_id yang sudah ada (boleh lintas tanggal).
 */
export function nomorStrukBerikutnya(tanggal, terpakai = []) {
  const ddmmyy = ddmmyyDari(tanggal)
  const used = new Set()
  for (const t of terpakai) {
    const s = String(t == null ? '' : t).trim()
    if (s) used.add(s)
  }
  let seq = 0
  for (const id of used) {
    const m = RE_NOMOR.exec(id)
    if (!m) continue
    // nomor hari lain tak boleh menaikkan seq hari ini (ddmmyy kosong = jangan saring)
    if (ddmmyy && m[2] !== ddmmyy) continue
    seq = Math.max(seq, Number(m[1]))
  }
  let cand
  do {
    seq += 1
    cand = 'MU-' + String(seq).padStart(3, '0') + ddmmyy
  } while (used.has(cand))
  return cand
}

/** Penanda unik satu transaksi POS, ditulis ke SETIAP baris buku induk transaksi itu.
 *  Nomor struk (`trx_id`) tetap nomor cantik untuk dilihat manusia; `trx_uid` yang
 *  dipakai mesin untuk mengelompokkan, jadi nomor kembar (data lama / race dua kasir)
 *  tak pernah lagi menyatukan dua transaksi. */
export function buatTrxUid(trxId) {
  return (
    String(trxId || 'MU') + '#' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
  )
}

/** Kunci pengelompokan baris buku induk -> satu transaksi/struk.
 *
 *  Urutan: `trx_uid` (baris baru, pasti unik) → `trx_id + santri_id` (baris lama: satu
 *  transaksi POS SELALU satu santri, jadi nomor kembar antar-santri terpisah kembali)
 *  → santri+tanggal+operator (baris tanpa trx_id sama sekali).
 */
export function kunciTransaksi(row) {
  if (!row) return ''
  const uid = String(row.trx_uid || '').trim()
  if (uid) return uid
  const sid = String(row.santri_id ?? row.santriId ?? '')
  const trx = String(row.trx_id || '').trim()
  if (trx) return trx + '__' + sid
  return sid + '__' + String(row.tanggal || '') + '__' + String(row.operator || '')
}
