// rujukanSantri — muat riwayat keuangan santri untuk penjaga hapus/gabung santri.
// Aturannya (apa yang dihitung "masih punya riwayat") ada di utils/rujukanKeuanganSantri;
// berkas ini hanya membaca tabelnya.
//
// v.1.4.3 (Kyai 14 Sep 2026, audit): hapus santri dan gabung duplikat dulu meninggalkan
// tabungan/tagihan/riwayat bayar tanpa pemilik, lalu "Hapus Mutasi Orphan" di Tabungan bisa
// menghapus tabungan itu permanen. Lihat kepala utils/rujukanKeuanganSantri.js.

import { queryColl, getAll } from '@/services/db'
import { ringkasRujukanKeuangan } from '@/utils/rujukanKeuanganSantri'

/** santri_id tersimpan sebagai teks ATAU angka di data lama — query keduanya, seperti POS. */
export function variasiIdSantri(sid) {
  const s = String(sid ?? '').trim()
  if (!s) return []
  const n = Number(s)
  return !Number.isNaN(n) && String(n) === s ? [s, n] : [s]
}

// kunci ringkasan → tabel + nama field id santri yang benar-benar dipakai penulisnya.
//   Tabungan & uang saku lama menulis `santriId` (camelCase) — TabunganView sendiri membaca
//   keduanya; penjaga yang hanya melihat `santri_id` akan meloloskan santri yang bertabungan.
const SUMBER = [
  { kunci: 'tabungan', tabel: 'keuangan_tabungan_santri', field: ['santri_id', 'santriId'] },
  { kunci: 'uangSaku', tabel: 'keuangan_uang_saku_santri', field: ['santri_id', 'santriId'] },
  { kunci: 'tagihan', tabel: 'keuangan_tagihan', field: ['santri_id'] },
  { kunci: 'bukuInduk', tabel: 'keuangan_buku_induk', field: ['santri_id'] }
]

const _idBaris = (r) => String(r?.santri_id ?? r?.santriId ?? '').trim()

/**
 * Riwayat keuangan beberapa santri sekaligus → Map<santriId, ringkasan>.
 *
 * Sedikit santri: query per santri (murah). Banyak (hapus terpilih, gabung massal): baca
 * keempat tabel SEKALI lalu kelompokkan — 50 santri × belasan query jauh lebih lambat
 * daripada empat tarikan penuh.
 *
 * Galat baca DILEMPAR, tidak ditelan: penjaga yang gagal membaca lalu menjawab "tak ada
 * riwayat" akan meloloskan persis penghapusan yang hendak dicegahnya.
 */
export async function muatRujukanKeuangan(santriIds) {
  const ids = [...new Set((santriIds || []).map((x) => String(x ?? '').trim()).filter(Boolean))]
  const kumpulan = new Map(
    ids.map((id) => [id, { tabungan: [], uangSaku: [], tagihan: [], bukuInduk: [] }])
  )
  if (ids.length && ids.length <= 5) {
    for (const id of ids) {
      for (const { kunci, tabel, field } of SUMBER) {
        const seen = new Map()
        for (const f of field) {
          for (const v of variasiIdSantri(id)) {
            for (const r of await queryColl(tabel, [[f, '==', v]])) seen.set(String(r.id), r)
          }
        }
        kumpulan.get(id)[kunci] = [...seen.values()]
      }
    }
  } else if (ids.length) {
    for (const { kunci, tabel } of SUMBER) {
      for (const r of await getAll(tabel)) {
        const sid = _idBaris(r)
        if (kumpulan.has(sid)) kumpulan.get(sid)[kunci].push(r)
      }
    }
  }
  const hasil = new Map()
  for (const [id, isi] of kumpulan) hasil.set(id, ringkasRujukanKeuangan(isi))
  return hasil
}
