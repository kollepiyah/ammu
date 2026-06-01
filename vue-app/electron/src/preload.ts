// v.80.0526 — Preload script: expose IPC API ke renderer (Vue app) lewat contextBridge.

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  // Print silent HTML (A4 atau custom size)
  printSilent: (payload: { html: string; options?: any }) =>
    ipcRenderer.invoke('print:silent', payload),

  // Print struk 80mm thermal (dot-matrix friendly)
  printStruk: (payload: { html: string; deviceName?: string }) =>
    ipcRenderer.invoke('print:struk', payload),

  // v.80.0526: Silent print PDF langsung (untuk batch print rapor tanpa dialog download)
  printPdf: (payload: {
    pdfBase64: string
    deviceName?: string
    copies?: number
    color?: boolean
    landscape?: boolean
    pageSize?: any
  }) => ipcRenderer.invoke('print:pdf', payload),

  // v.80.0526: Print preview PDF (show window dengan PDF, user adjust print options manual)
  printPdfPreview: (payload: { pdfBase64: string }) =>
    ipcRenderer.invoke('print:pdf-preview', payload),

  // List printer available
  listPrinters: () => ipcRenderer.invoke('print:list-printers'),

  // v.07.0626: listener menu electron 'Pengaturan Printer' -> renderer buka modal
  onOpenPrinterSettings: (cb: () => void) => ipcRenderer.on('open-printer-settings', () => cb()),

  // v.83.0526: Set title bar overlay color — Vue panggil saat dark mode toggle
  setTheme: (isDark: boolean) => ipcRenderer.invoke('theme:set', { isDark }),

  // Platform info
  platform: process.platform,
  isElectron: true,
  version: process.env.npm_package_version || ''
})
