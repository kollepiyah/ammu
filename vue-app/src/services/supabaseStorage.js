// supabaseStorage.js — F3: Supabase Storage (paralel storage.js Firebase).
// Bucket SUDAH dibuat di Dashboard Supabase (set photo/branding PUBLIC):
//   'photo'    -> foto santri/guru
//   'branding' -> logo/kop aplikasi
//   'psb'      -> dokumen pendaftaran
// Belum dipakai view operasional sampai cutover (F6). migrateUrl = pindah file
// dari Firebase Storage URL -> Supabase.
import { supabase } from './supabase'

// Sumber tunggal nama bucket (hindari salah ketik di pemanggil).
export const BUCKET = { photo: 'photo', branding: 'branding', psb: 'psb' }

function _ensure() {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi (.env.local).')
}

/** Upload File/Blob ke bucket/path (upsert). Return public URL. */
export async function uploadFile(bucket, path, file, opts = {}) {
  _ensure()
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true, cacheControl: '3600', ...opts })
  if (error) throw error
  return getPublicUrl(bucket, path)
}

export function getPublicUrl(bucket, path) {
  if (!supabase) return ''
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
}

/** Hapus file. Diam jika tidak ada. */
export async function deleteFile(bucket, path) {
  if (!supabase) return
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error && String(error.statusCode) !== '404') throw error
}

/** Pindah 1 file dari URL (mis. Firebase Storage) -> Supabase Storage. Return URL baru. */
export async function migrateUrl(url, bucket, path) {
  _ensure()
  if (!url) return ''
  const resp = await fetch(url)
  if (!resp.ok) throw new Error('fetch gagal: ' + resp.status)
  const blob = await resp.blob()
  return uploadFile(bucket, path, blob, { contentType: blob.type || 'image/jpeg' })
}
