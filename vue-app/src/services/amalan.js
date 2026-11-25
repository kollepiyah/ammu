// Kitab & Wirid — akses data. Hemat egress (Free Plan): daftar menarik kolom RINGKAS saja (tanpa
// isi bacaan), isi satu bacaan ditarik saat dibuka; layar publik menyimpannya di HP (useDataTamu).
import { supabase } from './supabase'
import { getOne, queryColl, setOne, deleteOne } from './db'

/** Daftar bacaan aktif (id, judul, kategori, urutan) — untuk layar publik. */
export async function ambilDaftarAmalan() {
  const { data, error } = await supabase
    .from('amalan')
    .select('id, judul, kategori, urutan')
    .eq('aktif', true)
  if (error) throw error
  return data || []
}

/** Satu bacaan lengkap (bentuk datar: judul, kategori, …, bagian, keterangan). */
export function ambilAmalan(id) {
  return getOne('amalan', id)
}

/** Pengelola: semua bacaan termasuk draf (RLS memberi draf hanya ke pengelola). */
export function ambilSemuaAmalan() {
  return queryColl('amalan', [], [['urutan', 'asc']])
}

export async function simpanAmalan(id, nilai) {
  const docId = id || `am_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
  await setOne('amalan', docId, { id: docId, ...nilai })
  return docId
}

export function hapusAmalan(id, sesi) {
  return deleteOne('amalan', id, { sesi, alasan: 'Hapus bacaan Kitab & Wirid' })
}
