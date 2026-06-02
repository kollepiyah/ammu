"use strict";
// v.80.0526 — Preload script: expose IPC API ke renderer (Vue app) lewat contextBridge.
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    // Print silent HTML (A4 atau custom size)
    printSilent: (payload) => electron_1.ipcRenderer.invoke('print:silent', payload),
    // Print struk 80mm thermal (dot-matrix friendly)
    printStruk: (payload) => electron_1.ipcRenderer.invoke('print:struk', payload),
    // v.80.0526: Silent print PDF langsung (untuk batch print rapor tanpa dialog download)
    printPdf: (payload) => electron_1.ipcRenderer.invoke('print:pdf', payload),
    // v.80.0526: Print preview PDF (show window dengan PDF, user adjust print options manual)
    printPdfPreview: (payload) => electron_1.ipcRenderer.invoke('print:pdf-preview', payload),
    // List printer available
    listPrinters: () => electron_1.ipcRenderer.invoke('print:list-printers'),
    // v.07.0626: listener menu electron 'Pengaturan Printer' -> renderer buka modal
    onOpenPrinterSettings: (cb) => electron_1.ipcRenderer.on('open-printer-settings', () => cb()),
    // v.83.0526: Set title bar overlay color — Vue panggil saat dark mode toggle
    setTheme: (isDark) => electron_1.ipcRenderer.invoke('theme:set', { isDark }),
    // Platform info
    platform: process.platform,
    isElectron: true,
    version: process.env.npm_package_version || ''
});
