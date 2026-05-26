// vue-app/src/services/bukuInduk.js
// Port pushKeBukuInduk dari legacy (line 29970).
// Buku induk = mirror semua arus kas (auto-generated dari transaksi).
// Collection: keuangan_buku_induk

import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebase'

/**
 * Push record arus kas ke collection keuangan_buku_induk.
 * Match legacy shape:
 *   { id, tanggal, tipe ('masuk'|'keluar'), kategori, nominal, keterangan,
 *     sumber, ref_id, operator }
 *
 * @param {Object} record - lihat shape di atas; field `id` wajib (string)
 * @returns {Promise<void>}
 */
export async function pushKeBukuInduk(record) {
  if (!record || !record.id) throw new Error('pushKeBukuInduk: record.id wajib')
  await setDoc(doc(db, 'keuangan_buku_induk', String(record.id)), record)
}

/**
 * Hapus record buku induk by ref_id (untuk rollback transaksi).
 * Tidak pakai — disediakan kalau ada delete cascade.
 */
export async function hapusBukuIndukByRefId(refId) {
  // Note: tanpa query langsung, caller harus kasih ID buku induk yang tepat.
  // Kalau pakai pattern legacy bi_tabs_<tabs_id>, sequencing predictable.
  await deleteDoc(doc(db, 'keuangan_buku_induk', String(refId)))
}
