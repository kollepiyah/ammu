// metodeBayar.js — menyimpulkan CARA BAYAR (Tunai / Transfer) sebuah baris buku induk.
//
// Latar: kasir butuh laporan HARIAN yang memisahkan uang fisik di laci dari uang yang
// masuk rekening. Field `metode` baru ditulis oleh POS Santri ('Tunai'|'Transfer') dan
// kas manual; baris dari sumber lain (verifikasi transfer, bisyaroh, pos dana) tak
// punya field itu, jadi disimpulkan dari `sumber`.
//
// MURNI (tanpa I/O) supaya gampang diuji.

export const METODE_OPTS = ['Tunai', 'Transfer']

// sumber yang PASTI non-tunai walau field `metode` kosong (baris lama)
const SUMBER_TRANSFER = ['transfer_verified', 'bmt', 'va_bmt', 'va']

/** 'Tunai' | 'Transfer' untuk satu baris keuangan_buku_induk.
 *
 *  Urutan: field `metode` eksplisit → tebak dari `sumber` → default 'Tunai'.
 *  Default tunai disengaja: kas manual & pembayaran kasir memang uang fisik, dan
 *  laporan harian lebih berguna kalau kolomnya terisi daripada '—'. Baris yang
 *  sebenarnya transfer bisa dikoreksi lewat Edit (super_admin).
 */
export function metodeTransaksi(row) {
  const m = String(row?.metode || '')
    .trim()
    .toLowerCase()
  if (m) {
    if (m.startsWith('transfer') || m === 'tf' || m === 'bank' || m === 'va') return 'Transfer'
    if (m.startsWith('tunai') || m === 'cash') return 'Tunai'
  }
  const sumber = String(row?.sumber || '')
    .trim()
    .toLowerCase()
  if (SUMBER_TRANSFER.includes(sumber)) return 'Transfer'
  return 'Tunai'
}

/** Ringkas satu daftar baris jadi subtotal per cara bayar — dasar laporan harian kas.
 *  Bentuk: { Tunai: {masuk, keluar}, Transfer: {masuk, keluar} }. */
export function ringkasMetode(rows = []) {
  const out = {
    Tunai: { masuk: 0, keluar: 0 },
    Transfer: { masuk: 0, keluar: 0 }
  }
  for (const b of rows) {
    const k = metodeTransaksi(b)
    const nom = Number(b?.nominal || 0)
    const masuk = Number(b?.masuk || (b?.tipe === 'masuk' ? nom : 0)) || 0
    const keluar = Number(b?.keluar || (b?.tipe === 'keluar' ? nom : 0)) || 0
    out[k].masuk += masuk
    out[k].keluar += keluar
  }
  return out
}
