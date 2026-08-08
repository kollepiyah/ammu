// simulasiPemasukan — perkiraan PEMASUKAN SEBULAN dari syahriyah santri.
//
// PERMINTAAN KYAI (7 Agu 2026): "simulasi pemasukan bulanan syahriyah santri, yg non
//   bulanan jangan dihitung."
//
// Pasangan dari simulasi plafon bisyaroh: yang satu memperkirakan uang KELUAR sebulan,
// yang ini uang MASUK sebulan. Dipakai berdampingan saat menimbang tarif.
//
// HANYA jenis ber-frekuensi 'bulanan'. Yang tahunan (Daftar Ulang, Seragam) dan manual
// (infaq insidental) SENGAJA tak dihitung — memasukkannya akan membuat angka bulanan
// tampak jauh lebih besar dari yang benar-benar masuk tiap bulan, dan itu jenis kekeliruan
// yang baru ketahuan saat kas tekor.
//
// Memakai `hitungTagihan` — mesin yang SAMA dengan generate tagihan & POS. Jadi paket,
// tarif per santri/kelas/lembaga, dan pelipatan (jenis yang MENEMPEL ke jenis lain) ikut
// terhitung persis seperti nanti saat tagihannya benar-benar terbit. Jangan menyalin
// rumusnya ke sini.
import { hitungTagihan } from './syahriyah'

/** Frekuensi jenis, membaca bentuk lama (`auto_generate`) sebagai cadangan. */
export function frekuensiJenis(j) {
  return String(j?.frekuensi || (j?.auto_generate ? 'bulanan' : 'manual'))
}

/** Hanya jenis yang ditagih BULANAN. */
export function jenisBulanan(jenisList) {
  return (Array.isArray(jenisList) ? jenisList : []).filter((j) => frekuensiJenis(j) === 'bulanan')
}

/** Santri yang ikut dihitung: aktif saja (`aktif !== false`, sejalan dengan Generate). */
export function santriAktifSaja(santriList) {
  return (Array.isArray(santriList) ? santriList : []).filter((s) => s && s.aktif !== false)
}

/**
 * Perkiraan pemasukan sebulan dari jenis BULANAN.
 *
 * `jenisList` harus daftar LENGKAP (termasuk yang tahunan/manual): `hitungTagihan` perlu
 * melihat semuanya untuk tahu jenis mana yang menempel ke mana. Yang DIJUMLAHKAN tetap
 * hanya jenis bulanan — jenis yang menempel tak pernah dihitung sendiri (nominalnya sudah
 * termasuk di jenis tujuannya), jadi tak ada yang terhitung dua kali.
 *
 * @returns {{ perJenis: Array<{jenis_id,label,santri,subtotal,rata}>, total:number,
 *             santriKena:number, santriTotal:number }}
 */
export function simulasiPemasukan(jenisList, santriList) {
  const semua = Array.isArray(jenisList) ? jenisList : []
  const bulanan = jenisBulanan(semua)
  const santri = santriAktifSaja(santriList)
  const perJenis = new Map()
  const kena = new Set()

  for (const s of santri) {
    for (const j of bulanan) {
      const h = hitungTagihan(j, s, semua)
      if (!h) continue // tak berlaku untuk santri ini, atau menempel ke jenis lain
      const nominal = Number(h.nominal) || 0
      if (nominal <= 0) continue
      const k = String(j.id || j.label || '')
      if (!perJenis.has(k)) {
        perJenis.set(k, { jenis_id: k, label: j.label || k, santri: 0, subtotal: 0, rata: 0 })
      }
      const r = perJenis.get(k)
      r.santri++
      r.subtotal += nominal
      kena.add(String(s.id ?? ''))
    }
  }

  const baris = [...perJenis.values()]
    .map((r) => ({ ...r, rata: r.santri > 0 ? Math.round(r.subtotal / r.santri) : 0 }))
    .sort((a, b) => b.subtotal - a.subtotal)

  return {
    perJenis: baris,
    total: baris.reduce((a, r) => a + r.subtotal, 0),
    santriKena: kena.size,
    santriTotal: santri.length
  }
}
