// rujukanKeuanganSantri — "santri ini masih punya uang / riwayat uang?" Semua PURE.
//
// Kyai, 14 Sep 2026: "sekaligus audit yg lain, dan tombol2 yg digunakan untuk merapikan,
//   jika sudah selesai dihapus aja bisa?"
//
// Audit menemukan satu rantai yang bisa MENGHAPUS TABUNGAN SANTRI tanpa satu pun galat:
//
//   1. Santri dihapus (Data Santri, satu atau terpilih) atau digabung sebagai duplikat
//      (Master Data › Analisis Data Duplikat). Keduanya hanya menghapus baris `santri` —
//      tabungan, uang saku, tagihan, dan riwayat bayarnya tetap memakai id yang sudah tak
//      ada di mana pun.
//   2. Tabungan lalu menampilkan "N mutasi orphan" dengan tombol "Hapus Mutasi Orphan", yang
//      menghapus seluruh mutasi itu PERMANEN — termasuk saldo uang titipan yang masih harus
//      dikembalikan kepada santrinya.
//
// Berkas ini menutup rantai itu dari kedua ujungnya: santri yang masih punya riwayat keuangan
// tak bisa dihapus (cukup dinon-aktifkan, riwayatnya tetap utuh), dan orphan yang masih
// BERSALDO tak pernah ditawarkan untuk dihapus.

import { mutasiSetor } from './kasLembaga'
import { terbayarDari } from './tagihan'

const _nom = (v) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

// Konvensi yang SAMA dengan buku besar & slip Tabungan: 'setor' = masuk, selain itu keluar.
function _saldo(list) {
  let s = 0
  for (const m of list) s += mutasiSetor(m) ? _nom(m.nominal) : -_nom(m.nominal)
  return s
}

const _daftar = (v) => (Array.isArray(v) ? v : []).filter(Boolean)

/**
 * Ringkasan riwayat keuangan SATU santri.
 *
 * `ada` = ada SATU saja baris di salah satu tabel — bukan hanya yang bersaldo. Riwayat yang
 * sudah lunas pun tetap bukti uang: menghapus santrinya membuat baris-baris itu tak bisa lagi
 * ditelusuri ke orang mana pun, dan tabungannya muncul sebagai "orphan".
 */
export function ringkasRujukanKeuangan({
  tabungan = [],
  uangSaku = [],
  tagihan = [],
  bukuInduk = []
} = {}) {
  const tab = _daftar(tabungan)
  const us = _daftar(uangSaku)
  const tg = _daftar(tagihan)
  const bi = _daftar(bukuInduk)
  return {
    mutasiTabungan: tab.length,
    saldoTabungan: _saldo(tab),
    mutasiUangSaku: us.length,
    saldoUangSaku: _saldo(us),
    tagihan: tg.length,
    tagihanTerbayar: tg.filter((t) => terbayarDari(t) > 0.5).length,
    barisKas: bi.length,
    ada: tab.length + us.length + tg.length + bi.length > 0
  }
}

const _rp = (n) => 'Rp ' + Math.round(_nom(n)).toLocaleString('id-ID')

/**
 * Alasan penolakan hapus, menyebut APA yang masih menempel — supaya admin tahu apa yang harus
 * diperiksa, bukan sekadar "tidak bisa". '' bila tak ada rujukan.
 */
export function pesanRujukanKeuangan(nama, r) {
  if (!r?.ada) return ''
  const bagian = []
  if (r.mutasiTabungan) {
    bagian.push(`tabungan ${_rp(r.saldoTabungan)} (${r.mutasiTabungan} mutasi)`)
  }
  if (r.mutasiUangSaku) {
    bagian.push(`uang saku ${_rp(r.saldoUangSaku)} (${r.mutasiUangSaku} mutasi)`)
  }
  if (r.tagihan) {
    const bayar = r.tagihanTerbayar ? ` (${r.tagihanTerbayar} sudah dibayar)` : ''
    bagian.push(`${r.tagihan} tagihan${bayar}`)
  }
  if (r.barisKas) bagian.push(`${r.barisKas} transaksi di Buku Induk`)
  return `${nama || 'Santri ini'} masih punya riwayat keuangan: ${bagian.join(', ')}.`
}

/**
 * Pilah santri orphan di Tabungan/Uang Saku (santri_id tak ada lagi di data santri).
 *
 * Yang saldonya NOL boleh dibersihkan — tak ada uang yang ikut hilang. Yang masih BERSALDO
 * (positif maupun negatif) adalah uang titipan yang harus dikembalikan atau dipindahkan ke
 * santri yang benar lewat Edit mutasi, jadi TAK PERNAH ditawarkan untuk dihapus.
 *
 * @param {Array<{santri_id, saldo}>} orphans baris agregat per santri
 * @returns {{ idsNol: string[], bersaldo: Array, saldoBersaldo: number }}
 */
export function pilahOrphanTabungan(orphans) {
  const nol = []
  const bersaldo = []
  for (const o of _daftar(orphans)) {
    if (Math.abs(_nom(o.saldo)) < 0.5) nol.push(o)
    else bersaldo.push(o)
  }
  return {
    idsNol: nol.map((o) => String(o.santri_id)),
    bersaldo,
    saldoBersaldo: bersaldo.reduce((s, o) => s + _nom(o.saldo), 0)
  }
}
