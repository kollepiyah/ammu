// storage.js — F6e: shim KOMPAT-Firebase di atas Supabase Storage (supabaseStorage.js).
// Signature LAMA dipertahankan — uploadFile(path,file) / uploadBase64(path,dataUrl,ct) /
// deleteFile(pathOrUrl) — supaya 6 pemanggil tak berubah; Firebase Storage DICOPOT.
// Bucket dirutekan dari prefix path (3 bucket Supabase: photo/branding/psb, semua Public).
// CATATAN Kyai: bila bikin bucket baru (mis. bukti transfer privat), sesuaikan _bucketFor.
import { BUCKET, uploadFile as sbUploadFile, deleteFile as sbDeleteFile } from './supabaseStorage'

/** Rute prefix path -> bucket Supabase. */
function _bucketFor(path) {
  const p = String(path || '')
  if (/^(profil_foto|tanda_tangan|beranda_post|posts?|foto)\b/.test(p)) return BUCKET.photo
  if (/^(pembayaran_transfer|psb|lembaga\/|dokumen)\b/.test(p)) return BUCKET.psb
  // lembaga_logos, app_logos, bg_rapor, branding, logo, kop, dll -> branding (default)
  return BUCKET.branding
}

/** dataURL/base64 -> Blob (contentType eksplisit). */
function _dataUrlToBlob(dataUrl, contentType) {
  const b64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
  return new Blob([bytes], { type: contentType })
}

/** Upload File/Blob ke path. Return public URL. */
export async function uploadFile(path, file) {
  return sbUploadFile(_bucketFor(path), path, file)
}

/** Upload base64 data URL ke path. Return public URL. */
export async function uploadBase64(path, dataUrl, contentType = 'image/png') {
  const blob = _dataUrlToBlob(dataUrl, contentType)
  return sbUploadFile(_bucketFor(path), path, blob, { contentType })
}

/** Hapus file by path ATAU public/sign URL Supabase. Diam jika tidak ada. */
export async function deleteFile(pathOrUrl) {
  const s = String(pathOrUrl || '')
  if (!s) return
  // Public/sign URL Supabase: .../storage/v1/object/public/<bucket>/<path>
  const m = s.match(/\/storage\/v1\/object\/(?:public|sign)\/([^/]+)\/(.+?)(?:\?|$)/)
  if (m) {
    await sbDeleteFile(m[1], decodeURIComponent(m[2]))
    return
  }
  // Bare path -> rute via prefix
  await sbDeleteFile(_bucketFor(s), s)
}
