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

import { metodeTransaksi } from './metodeBayar'
import { terbilangRupiah } from './terbilang'
import { BULAN_ID } from './format'

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

// ── Cetak ULANG struk dari baris buku induk ──────────────────────────────────
//
// Kyai, 14 Sep 2026: "di uang saku dan POS dan yg lain, saya ingin admin keu bisa print
//   ulang struk."
//
// Sebelum ini struk cetak-ulang dirakit di TIGA tempat (Riwayat POS, Buku Induk, kwitansi
// wali) dengan hasil yang berbeda untuk transaksi yang sama: dari Riwayat POS lengkap
// dengan NIS, kelas, periode, dan tanda tangan; dari Buku Induk tanpa satu pun dari
// keempatnya. Dan setiap perakit baru yang lupa membawa `metode` mencetak "TUNAI" untuk
// uang transfer — sudah tiga kali terjadi (v.1.4.1). Tombol cetak ulang yang kini
// ditambahkan ke layar POS dan Uang Kegiatan/Buku akan jadi perakit keempat dan kelima,
// maka semuanya dirakit di SINI.

/** '2026-07' → 'Juli 2026' · 'TA2026' → 'TA 2026/2027' · selain itu ''. */
function _labelKodePeriode(kode) {
  const k = String(kode || '').trim()
  let m = /^(\d{4})-(\d{2})$/.exec(k)
  if (m && Number(m[2]) >= 1 && Number(m[2]) <= 12) return `${BULAN_ID[Number(m[2]) - 1]} ${m[1]}`
  m = /^TA\s*(\d{4})$/i.exec(k)
  if (m) return `TA ${m[1]}/${Number(m[1]) + 1}`
  return ''
}

/**
 * Periode dari keterangan baris POS:
 *   "<jenis> — <nama> (<nis>) — <periode> [— bagian dari <induk>] [— potongan <label> Rp …]"
 *
 * Dua ekor opsional itu DILEWATI. Pembaca lama (RiwayatPosView.extractPeriode) mengambil
 * potongan TERAKHIR apa adanya, sehingga baris pecahan tagihan gabungan tercetak "bagian
 * dari Syahriyah" di kolom periode struk cetak ulang.
 */
export function periodeDariKeterangan(ket) {
  const parts = String(ket || '')
    .split(' — ')
    .map((s) => s.trim())
  if (parts.length < 3) return ''
  const ekor = parts
    .slice(2)
    .filter((p) => p && !/^bagian dari\s/i.test(p) && !/^potongan\s/i.test(p))
  const bulan = ekor.find((p) => /^[A-Za-z]+\s+\d{4}$/.test(p) || /^TA\s*\d{4}/i.test(p))
  if (bulan) return bulan
  const akhir = ekor[ekor.length - 1]
  return akhir && akhir.length <= 22 ? akhir : ''
}

/** Periode yang tercetak di samping jenis pembayaran: `periode_kode` yang ditulis POS
 *  lebih dulu (pasti), ekor keterangan sebagai cadangan untuk baris lama. */
export function periodeDariBaris(b) {
  return _labelKodePeriode(b?.periode_kode) || periodeDariKeterangan(b?.keterangan)
}

/**
 * Objek `trx` untuk SEMUA pencetak struk (PDF, slip, ESC/P, HTML) dari baris-baris SATU
 * transaksi. Bentuknya sama dengan yang dirakit PosSantriView saat menyimpan.
 *
 * `metode` disimpulkan dari baris pertama lewat utils/metodeBayar: satu transaksi POS
 * ditulis dengan satu cara bayar untuk semua barisnya, dan baris transfer/VA yang tak
 * membawa field itu tetap terbaca Transfer dari `sumber`-nya.
 *
 * @param {object[]} rows baris buku induk ber-kunciTransaksi sama
 * @param {object} [ctx]
 * @param {object|null} [ctx.santri] baris santri — NIS, lembaga, kelas, wali, status
 * @param {string} [ctx.ttdUrl] tanda tangan petugas
 * @returns {object|null} null bila tak ada baris
 */
export function trxDariBaris(rows, { santri = null, ttdUrl = '' } = {}) {
  const list = (Array.isArray(rows) ? rows : [])
    .filter(Boolean)
    .slice()
    // id baris POS = pos_<struk>_<item>_<komponen>_<acak> → urut item seperti di keranjang.
    .sort((a, b) =>
      String(a.id ?? '').localeCompare(String(b.id ?? ''), undefined, { numeric: true })
    )
  if (!list.length) return null
  const first = list[0]
  const s = santri || {}
  const total = list.reduce((n, r) => n + (Number(r.nominal) || 0), 0)
  const waliSantri =
    s.wali ||
    s.nama_wali ||
    s.nama_ayah ||
    (s.ayah && typeof s.ayah === 'object' && s.ayah.nama) ||
    ''
  return {
    no_struk: first.no_struk || first.trx_id || first.id || '-',
    tanggal: first.tanggal || '',
    santri_nama: first.santri_nama || s.nama || '-',
    santri_nis: s.nis || '',
    lembaga: s.lembaga || '',
    kelas: s.kelas || '',
    lembaga_sekolah: s.lembaga_sekolah || '',
    kelas_sekolah: s.kelas_sekolah || '',
    operator: first.operator || '-',
    metode: metodeTransaksi(first).toUpperCase(),
    penyetor: first.wali || waliSantri,
    status_siswa: s.aktif === false ? 'Tidak Aktif' : 'Aktif',
    terbilang: terbilangRupiah(total),
    operator_ttd_url: ttdUrl || '',
    items: list.map((r) => ({
      jenis: r.kategori || 'Pembayaran',
      nominal: Number(r.nominal || 0),
      keterangan: periodeDariBaris(r)
    })),
    total,
    bayar: total,
    kembali: 0
  }
}

/**
 * Baris milik transaksi yang sama dengan `b`, diambil dari ledger yang sudah termuat —
 * dasar cetak ulang dari Buku Induk dan Uang Kegiatan/Buku.
 *
 * Hanya baris BERNOMOR STRUK yang dikelompokkan (lewat kunciTransaksi, karena nomor lama
 * bisa kembar antar santri). Baris transfer/VA tak punya nomor struk; kuncinya jatuh ke
 * santri+tanggal+petugas, yang akan menyatukan dua transfer santri yang sama di hari yang
 * sama menjadi satu struk — jadi baris seperti itu dicetak sendiri.
 */
export function barisSeTransaksi(b, semua) {
  if (!b) return []
  if (!String(b.trx_id || '').trim()) return [b]
  const kunci = kunciTransaksi(b)
  const rows = (Array.isArray(semua) ? semua : []).filter(
    (e) => e && String(e.trx_id || '').trim() && kunciTransaksi(e) === kunci
  )
  return rows.length ? rows : [b]
}
