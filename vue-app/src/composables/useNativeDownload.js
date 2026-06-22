// v.71.0526 — useNativeDownload
//
// Universal file-save helper untuk web (browser) + Capacitor native (Android/iOS).
//
// Problem: di Capacitor Android WebView, mekanisme standar `<a download>` atau
// `jsPDF.save()` / `XLSX.writeFile()` sering gagal silent — file ter-download
// tapi user tidak tahu di mana, atau WebView mem-block download blob URL.
//
// Solusi: detect Capacitor.isNativePlatform() → simpan via @capacitor/filesystem
// ke folder Documents/AmmuOnline + buka share dialog via @capacitor/share supaya
// user bisa pilih app pembuka (PDF viewer, WhatsApp, Email, Files app, dst).
//
// Penggunaan:
//   import { saveBlob, saveDataUrl } from '@/composables/useNativeDownload'
//
//   // Dari Blob (jsPDF doc.output('blob'), XLSX.write blob, dll):
//   await saveBlob(pdfBlob, 'Rapor-Ahmad-Ganjil-2025.pdf')
//
//   // Dari base64 / data URL:
//   await saveDataUrl(dataUrl, 'image.png')

// v.103b: toast lokasi simpan (ganti dialog Share yg dinilai "ribet" oleh kyai)
import { useToast } from '@/composables/useToast'

/**
 * Cek apakah running di native Capacitor (Android/iOS).
 */
function isNative() {
  try {
    return !!(
      window.Capacitor &&
      window.Capacitor.isNativePlatform &&
      window.Capacitor.isNativePlatform()
    )
  } catch {
    return false
  }
}

/**
 * Sanitize filename — buang karakter ilegal di Android/iOS filesystem.
 */
function sanitizeFilename(name) {
  return String(name || 'file')
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100)
}

/**
 * Convert Blob ke base64 (untuk Capacitor Filesystem.writeFile).
 */
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result || ''
      // data URL format: "data:<mime>;base64,XXXXX..."
      const base64 = String(result).split(',')[1] || ''
      resolve(base64)
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

/**
 * Save via Capacitor Filesystem + share dialog (Android/iOS).
 * v.85.0526: Multi-tier fallback — Documents → ExternalStorage → Cache. Android 13+ scoped storage.
 */
async function saveNative(blob, filename) {
  const safeFilename = sanitizeFilename(filename)
  const { Filesystem, Directory } = await import('@capacitor/filesystem')
  const base64 = await blobToBase64(blob)

  // v.103b: simpan ke subfolder "AmmuOnline" di folder publik supaya rapi & mudah ditemukan.
  // Multi-tier fallback krn scoped storage (Android 13+): Documents → Penyimpanan App → Cache.
  const SUBFOLDER = 'AmmuOnline'
  const path = `${SUBFOLDER}/${safeFilename}`
  const directories = [
    { dir: Directory.Documents, label: 'Documents' },
    { dir: Directory.External, label: 'Penyimpanan App' },
    { dir: Directory.Cache, label: 'Cache' }
  ]

  let result = null
  let savedLabel = null
  let lastError = null
  for (const { dir, label } of directories) {
    try {
      result = await Filesystem.writeFile({
        path,
        data: base64,
        directory: dir,
        recursive: true
      })
      savedLabel = label
      console.info(`[saveNative] saved to ${label}/${SUBFOLDER}:`, result.uri)
      break
    } catch (e) {
      lastError = e
      console.warn(`[saveNative] ${label} fail:`, e?.message || e)
    }
  }

  if (!result) {
    throw new Error(`Gagal simpan file: ${lastError?.message || 'unknown'}`)
  }

  // v.103b: TIDAK lagi paksa dialog Share tiap ekspor (kyai: ribet). File tersimpan otomatis,
  // cukup tampilkan TOAST lokasi simpan. Folder publik (Documents/Penyimpanan App) = user-visible.
  const userVisible = savedLabel === 'Documents' || savedLabel === 'Penyimpanan App'
  let toast = null
  try {
    toast = useToast()
  } catch (_e) {
    /* di luar konteks Pinia — abaikan */
  }

  if (userVisible) {
    try {
      toast?.success?.(`Tersimpan di ${savedLabel}/${SUBFOLDER} — ${safeFilename}`)
    } catch (_e) {
      /* ignore */
    }
  } else {
    // Hanya Cache yg berhasil (tak terlihat user) -> buka Share supaya file tak "hilang".
    try {
      toast?.info?.('File siap — pilih tujuan simpan/bagikan')
    } catch (_e) {
      /* ignore */
    }
    try {
      const { Share } = await import('@capacitor/share')
      const canShare = await Share.canShare()
      if (canShare && canShare.value) {
        await Share.share({
          title: safeFilename,
          url: result.uri,
          dialogTitle: 'Simpan atau bagikan file'
        })
      }
    } catch (e) {
      console.warn('[saveNative] share fallback gagal:', e?.message || e)
    }
  }
  return result.uri
}

/**
 * Save via standar browser (<a download>).
 */
function saveWeb(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = sanitizeFilename(filename)
  document.body.appendChild(a)
  a.click()
  // Cleanup
  setTimeout(() => {
    URL.revokeObjectURL(url)
    if (a.parentNode) a.remove()
  }, 100)
}

/**
 * Save Blob — auto pilih native atau web.
 * @param {Blob} blob
 * @param {string} filename
 * @returns {Promise<string|undefined>} URI file (native only) atau undefined (web)
 */
export async function saveBlob(blob, filename) {
  if (!blob) throw new Error('saveBlob: blob kosong')
  if (isNative()) {
    try {
      return await saveNative(blob, filename)
    } catch (e) {
      console.warn('[saveBlob] native fail, fallback ke web:', e?.message || e)
      // Fallback ke web kalau Capacitor plugin tidak tersedia
    }
  }
  saveWeb(blob, filename)
}

/**
 * Save Data URL (e.g. base64 image) — auto pilih native atau web.
 * @param {string} dataUrl  e.g. "data:image/png;base64,AAAA..."
 * @param {string} filename
 */
export async function saveDataUrl(dataUrl, filename) {
  if (!dataUrl) throw new Error('saveDataUrl: dataUrl kosong')
  // Convert data URL ke Blob
  const res = await fetch(dataUrl)
  const blob = await res.blob()
  return saveBlob(blob, filename)
}

/**
 * Helper: cek apakah Capacitor native — expose untuk komponen yang perlu UI conditional.
 */
export function isNativePlatform() {
  return isNative()
}

export default {
  saveBlob,
  saveDataUrl,
  isNativePlatform
}
