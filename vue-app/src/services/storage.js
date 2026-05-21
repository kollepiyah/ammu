// Firebase Storage service — upload, delete file
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './firebase'

/** Upload file ke path. Return download URL. */
export async function uploadFile(path, file) {
  const r = storageRef(storage, path)
  await uploadBytes(r, file)
  return getDownloadURL(r)
}

/** Upload base64 data URL. */
export async function uploadBase64(path, dataUrl, contentType = 'image/png') {
  const r = storageRef(storage, path)
  const b64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
  await uploadBytes(r, bytes, { contentType })
  return getDownloadURL(r)
}

/** Delete file. Silent jika tidak ada (404 dianggap success). */
export async function deleteFile(path) {
  try {
    await deleteObject(storageRef(storage, path))
  } catch (err) {
    if (err?.code !== 'storage/object-not-found') throw err
  }
}
