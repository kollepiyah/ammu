// hapusBarisKas — SATU pintu untuk menghapus baris uang di keuangan_buku_induk.
//
// Kyai, 14 Sep 2026, meneruskan laporan admin keuangan: transaksi yang dihapus karena
//   salah input tetap terbaca LUNAS di POS santri. Aturan angkanya — tagihan mana, berapa,
//   dan kapan TIDAK boleh dikurangi — ada di utils/batalBayarTagihan (murni, ber-tes).
//   Berkas ini hanya urutan tulisnya.
//
// URUTANNYA, dan kenapa:
//   1. Muat tagihan + baris buku induk santri yang terlibat, susun rencana, lalu minta
//      konfirmasi yang menyebut tagihan mana yang akan kembali menagih.
//   2. Susun ULANG rencana dari data segar. Dialog konfirmasi bisa terbuka lama, dan
//      kasir lain bisa membayar tagihan yang sama selama itu.
//   3. KEMBALIKAN TAGIHAN DULU, baru hapus barisnya. Dibalik, pengembalian yang gagal
//      meninggalkan tagihan lunas tanpa jejak — barisnya sudah hilang dari layar, jadi tak
//      bisa diulang dari mana pun. Dengan urutan ini, baris yang tagihannya gagal
//      dikembalikan TIDAK dihapus (bisa diulang), dan baris yang gagal dihapus sesudah
//      tagihannya kembali aman diulang: `batal_baris` mencegah pengurangan kedua.
//   4. Catat ke audit_log. deleteOne sendiri tetap menyalin tiap baris lebih dulu.
//
// Semua jalur hapus baris uang WAJIB lewat sini — Riwayat POS, Buku Induk, Uang
// Kegiatan/Buku/Tabungan Wajib, penolakan transfer, dan kas keluar milik slip bisyaroh yang
// sudah cair (gelombang 2, audit 14 Sep 2026). Jalur yang memanggil deleteOne langsung akan
// menghidupkan kembali bug yang dilaporkan Kyai.

import { getOne, queryColl, updateOne, deleteOne } from '@/services/db'
import { writeAuditLog } from '@/utils/auditLog'
import { alokasiEksplisit } from '@/utils/cocokBayarTagihan'
import { rencanaBatalBayar, barisBayarSantri } from '@/utils/batalBayarTagihan'

/** santri_id bisa tersimpan sebagai teks atau angka — query keduanya, seperti POS. */
function _variasiId(sid) {
  const s = String(sid ?? '').trim()
  if (!s) return []
  const n = Number(s)
  return !Number.isNaN(n) && String(n) === s ? [s, n] : [s]
}

/** Tagihan + seluruh baris buku induk milik santri yang barisnya hendak dihapus. */
async function _muatKonteks(rows) {
  const bayar = rows.filter(barisBayarSantri)
  const tagihan = new Map()
  const buku = new Map()
  const santriIds = [...new Set(bayar.map((b) => String(b.santri_id ?? '').trim()).filter(Boolean))]
  for (const sid of santriIds) {
    const variasi = _variasiId(sid)
    const [tgs, bks] = await Promise.all([
      Promise.all(variasi.map((v) => queryColl('keuangan_tagihan', [['santri_id', '==', v]]))),
      Promise.all(variasi.map((v) => queryColl('keuangan_buku_induk', [['santri_id', '==', v]])))
    ])
    for (const list of tgs) for (const t of list) tagihan.set(String(t.id), t)
    for (const list of bks) for (const b of list) buku.set(String(b.id), b)
  }
  // Tagihan yang disebut LANGSUNG oleh barisnya tapi tak ikut termuat (santri_id berbeda
  //   atau kosong) tetap diambil, supaya tautan pastinya tak jatuh sebagai "tagihan hilang".
  for (const b of bayar) {
    for (const a of alokasiEksplisit(b)) {
      if (tagihan.has(a.tagihanId)) continue
      try {
        const t = await getOne('keuangan_tagihan', a.tagihanId)
        if (t) tagihan.set(String(t.id), t)
      } catch (e) {
        // Tak terbaca = diperlakukan hilang; rencananya melaporkan sendiri.
      }
    }
  }
  return { tagihan: [...tagihan.values()], buku: [...buku.values()] }
}

/** Susun rencana tanpa menulis apa pun — dasar dialog konfirmasi. */
export async function rencanakanHapus(rows, { operator = '' } = {}) {
  const daftar = (Array.isArray(rows) ? rows : []).filter((b) => b && b.id != null)
  const { tagihan, buku } = await _muatKonteks(daftar)
  const idHapus = new Set(daftar.map((b) => String(b.id)))
  return rencanaBatalBayar({
    dihapus: daftar,
    tersisa: buku.filter((b) => !idHapus.has(String(b.id))),
    tagihan,
    stamp: new Date().toISOString(),
    operator
  })
}

/**
 * Hapus baris buku induk, dan kembalikan tagihan yang pernah dinaikkan olehnya.
 *
 * @param {Array} rows baris keuangan_buku_induk UTUH (bukan sekadar id) — tautan ke
 *   tagihannya dibaca dari isi baris
 * @param {object} [opts]
 * @param {object} [opts.sesi] auth.sesiAktif — atribusi salinan audit_log
 * @param {string} [opts.operator] nama untuk jejak di tagihan & audit
 * @param {string} [opts.alasan]
 * @param {(rencana:object)=>boolean|Promise<boolean>} [opts.konfirmasi] false = batal;
 *   tak ada satu pun yang ditulis
 * @returns {Promise<null|{rencana, barisOk, barisGagal, barisTertahan, tagihanOk,
 *   tagihanGagal, idTerhapus:Set<string>}>} null bila dibatalkan / tak ada baris
 */
export async function hapusBarisKas(
  rows,
  { sesi = null, operator = '', alasan = '', konfirmasi = null } = {}
) {
  const daftar = (Array.isArray(rows) ? rows : []).filter((b) => b && b.id != null)
  if (!daftar.length) return null
  const nama = operator || sesi?.nama || sesi?.guru || 'Admin'
  if (typeof konfirmasi === 'function') {
    const awal = await rencanakanHapus(daftar, { operator: nama })
    if (!(await konfirmasi(awal))) return null
  }
  const rencana = await rencanakanHapus(daftar, { operator: nama })

  let tagihanOk = 0
  const tagihanGagal = []
  const gagal = new Set()
  for (const r of rencana.rencana) {
    try {
      await updateOne('keuangan_tagihan', r.tagihanId, r.payload)
      tagihanOk++
    } catch (e) {
      tagihanGagal.push({ tagihanId: r.tagihanId, pesan: e?.message || String(e) })
      gagal.add(r.tagihanId)
    }
  }
  const barisTertahan = new Set()
  for (const r of rencana.rencana) {
    if (!gagal.has(r.tagihanId)) continue
    for (const id of r.baris) barisTertahan.add(String(id))
  }

  let barisOk = 0
  const barisGagal = []
  const idTerhapus = new Set()
  for (const b of daftar) {
    const id = String(b.id)
    if (barisTertahan.has(id)) continue
    try {
      await deleteOne('keuangan_buku_induk', id, { sesi, alasan })
      barisOk++
      idTerhapus.add(id)
    } catch (e) {
      barisGagal.push({ id, pesan: e?.message || String(e) })
    }
  }

  await writeAuditLog({
    operator: nama,
    action: 'hapus_baris_kas',
    target: 'keuangan_buku_induk',
    ids: daftar.map((b) => String(b.id)),
    detail: {
      alasan: alasan || '',
      baris_ok: barisOk,
      baris_gagal: barisGagal,
      baris_tertahan: [...barisTertahan],
      tagihan_dikembalikan: rencana.rencana
        .filter((r) => !gagal.has(r.tagihanId))
        .map((r) => ({
          id: r.tagihanId,
          dari: r.terbayarLama,
          ke: r.terbayarBaru,
          status: r.statusBaru,
          baris: r.baris
        })),
      tagihan_gagal: tagihanGagal,
      ambigu: rencana.ambigu.map((b) => String(b.id))
    }
  })

  return {
    rencana,
    barisOk,
    barisGagal,
    barisTertahan: [...barisTertahan],
    tagihanOk,
    tagihanGagal,
    idTerhapus
  }
}
