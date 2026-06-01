// v.80.0526 — useDesktopPrint
//
// Helper untuk panggil native print di Electron Desktop.
// Akses lewat window.electronAPI yang di-expose preload.ts.
//
// Usage:
//   import { isElectron, printSilent, printStruk, printPdf, printPdfPreview, listPrinters } from '@/composables/useDesktopPrint'
//
//   if (isElectron()) {
//     // Silent print PDF blob ke printer default
//     await printPdf(blob, { deviceName: 'EPSON L3110' })
//   }

function getAPI() {
  try {
    return window.electronAPI || null
  } catch {
    return null
  }
}

export function isElectron() {
  return !!getAPI()
}

/**
 * Silent print HTML ke printer default sistem (A4 default).
 * @param {object} payload { html: string, options: object }
 */
export async function printSilent(payload) {
  const api = getAPI()
  if (!api?.printSilent) throw new Error('Electron print API tidak tersedia (bukan di Desktop)')
  return api.printSilent(payload)
}

/**
 * Print struk thermal 80mm (POS dot-matrix friendly).
 * @param {object} payload { html: string, deviceName?: string }
 */
export async function printStruk(payload) {
  const api = getAPI()
  if (!api?.printStruk) throw new Error('Electron print API tidak tersedia')
  return api.printStruk(payload)
}

/**
 * v.80.0526: Silent print PDF blob langsung ke printer (tanpa download dialog).
 * @param {Blob} blob — PDF blob (e.g. dari jsPDF doc.output('blob'))
 * @param {object} opts — { deviceName, copies, color, landscape, pageSize }
 *   - deviceName: nama printer (kosong = default)
 *   - copies: jumlah salinan
 *   - color: true (default) | false (grayscale)
 *   - landscape: true | false (default portrait)
 *   - pageSize: 'A4' | 'A3' | 'Letter' | { width, height } (microns)
 */
export async function printPdf(blob, opts = {}) {
  const api = getAPI()
  if (!api?.printPdf) throw new Error('Electron print PDF API tidak tersedia (bukan di Desktop)')
  const pdfBase64 = await blobToBase64(blob)
  return api.printPdf({ pdfBase64, ...opts })
}

/**
 * v.80.0526: Buka PDF di window preview Electron (user lihat sebelum klik Print sendiri).
 * @param {Blob} blob — PDF blob
 */
export async function printPdfPreview(blob) {
  const api = getAPI()
  if (!api?.printPdfPreview) throw new Error('Electron preview API tidak tersedia')
  const pdfBase64 = await blobToBase64(blob)
  return api.printPdfPreview({ pdfBase64 })
}

/**
 * List printer terdeteksi di sistem.
 * @returns {Promise<Array<{name, displayName, isDefault, status}>>}
 */
export async function listPrinters() {
  const api = getAPI()
  if (!api?.listPrinters) return []
  return api.listPrinters()
}

// ─── Helpers ─────────────────────────────────────────────────────────────

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result || '')
      // strip data:application/pdf;base64, prefix
      const base64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export default {
  isElectron,
  printSilent,
  printStruk,
  printPdf,
  printPdfPreview,
  listPrinters
}

// v.07.0626: printer default (localStorage) + listener menu electron 'Pengaturan Printer'
const _PRINTER_KEY = 'ammu_default_printer'
export function getDefaultPrinter() { try { return localStorage.getItem(_PRINTER_KEY) || '' } catch (e) { return '' } }
export function setDefaultPrinter(name) { try { localStorage.setItem(_PRINTER_KEY, name || '') } catch (e) {} }
export function onOpenPrinterSettings(cb) {
  const api = getAPI()
  if (api && api.onOpenPrinterSettings) api.onOpenPrinterSettings(cb)
}
