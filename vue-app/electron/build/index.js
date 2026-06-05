"use strict";
// v.75.0526 — Electron main process untuk Ammu Online Desktop.
//
// Tugas:
//   1. Bikin BrowserWindow load Vue app dari folder app/ (yang di-copy dari public/vue saat build)
//   2. IPC handler untuk native print struk (silent, 80mm thermal or A4 portrait)
//   3. Auto-update via electron-updater + GitHub Releases
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const child_process_1 = require("child_process");
const electron_updater_1 = require("electron-updater");
const electron_unhandled_1 = __importDefault(require("electron-unhandled"));
(0, electron_unhandled_1.default)();
// v.80.0526: deteksi dev mode berdasarkan file existence (bukan electron-is-dev yang false-positive
//   saat jalanin `electron .` tanpa packaging). Kalau app/index.html ADA → production load file://.
//   Kalau gak ada → assume dev mode (vite dev server di port 5174).
const APP_HTML_PATH = path.join(__dirname, '..', 'app', 'index.html');
const APP_HTML_EXISTS = fs.existsSync(APP_HTML_PATH);
const isDev = !APP_HTML_EXISTS || process.env.ELECTRON_IS_DEV === '1';
let mainWindow = null;
let splashWindow = null;
// v.80.0526: brand color (teal Mambaul Ulum) untuk title bar overlay
const BRAND_TEAL = '#0F766E'; // primary (teal-700)
const BRAND_TEAL_DARK = '#134E4A'; // dark mode (teal-900)
// v.83.0526: Title bar theme palette — match Vue app light/dark mode
//   Light: cream bg + slate symbol (mirip Claude desktop light mode)
//   Dark: slate-800 bg + white symbol
const TITLEBAR_LIGHT = { color: '#F2FEF9', symbolColor: '#475569' }; // cream + slate-600
const TITLEBAR_DARK = { color: '#1E293B', symbolColor: '#FFFFFF' }; // slate-800 + white
/**
 * Splash window — frameless transparent yang tampil saat startup
 * sambil Vue app load di background. Auto-close saat main window 'ready-to-show'.
 */
function createSplashWindow() {
    // v.85.0526: Splash 800x450 (16:9) match landscape design Bakafrawi
    splashWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 450,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: false,
        movable: false,
        skipTaskbar: true,
        show: false,
        webPreferences: { nodeIntegration: false, contextIsolation: true }
    });
    // v.85.0526: Splash pakai design Bakafrawi (landscape 1920x1080) sebagai full bg-image.
    //   Logo + Powered by sudah inline di image, tidak perlu DOM element terpisah.
    //   Theme-aware via @prefers-color-scheme (auto switch light/dark).
    // v.86.0526 FIX: splash di-load via data:text/html (opaque origin) → Chromium BLOKIR
    //   subresource file:// (webSecurity) → dulu gambar gagal load, hanya tampil bg-color gelap.
    //   Solusi: baca PNG → embed sebagai base64 data-URI langsung di CSS (tak perlu akses file://).
    const splashLightFs = path.join(__dirname, '..', 'assets', 'splash-light.png');
    const splashDarkFs = path.join(__dirname, '..', 'assets', 'splash-dark.png');
    let lightBgRule = '';
    let darkBgRule = '';
    try {
        const b64 = fs.readFileSync(splashLightFs).toString('base64');
        lightBgRule = `background-image: url('data:image/png;base64,${b64}');`;
    }
    catch (e) {
        console.error('[splash] gagal baca splash-light.png:', splashLightFs, e);
    }
    try {
        const b64 = fs.readFileSync(splashDarkFs).toString('base64');
        darkBgRule = `background-image: url('data:image/png;base64,${b64}');`;
    }
    catch (e) {
        console.error('[splash] gagal baca splash-dark.png:', splashDarkFs, e);
    }
    // v.87.0526: splash ikut TEMA APP (bukan OS). Tema terakhir dipersist ke userData/ammu-theme.json
    //   oleh IPC theme:set. savedDark null = belum pernah di-set -> fallback prefers-color-scheme (OS).
    let savedDark = null;
    try {
        const themeFile = path.join(electron_1.app.getPath('userData'), 'ammu-theme.json');
        if (fs.existsSync(themeFile)) {
            savedDark = JSON.parse(fs.readFileSync(themeFile, 'utf8'))?.isDark === true;
        }
    }
    catch (e) {
        console.warn('[splash] gagal baca tema tersimpan:', e);
    }
    const useDark = savedDark === true;
    const bodyBgColor = useDark ? '#0F172A' : '#F2FEF9';
    const bodyBgImage = useDark ? darkBgRule : lightBgRule;
    // fallback OS HANYA kalau tema belum pernah di-set (savedDark === null)
    const osFallback = savedDark === null
        ? `@media (prefers-color-scheme: dark) { body { background-color: #0F172A; ${darkBgRule} } }`
        : '';
    const splashHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100vw; height: 100vh;
      overflow: hidden;
      border-radius: 16px;
    }
    body {
      background-color: ${bodyBgColor};
      ${bodyBgImage}
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      animation: bodyIn 0.4s ease-out;
    }
    ${osFallback}
    @keyframes bodyIn { from { opacity: 0; } to { opacity: 1; } }
  </style></head><body></body></html>`;
    splashWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(splashHtml)}`);
    splashWindow.once('ready-to-show', () => splashWindow?.show());
    splashWindow.on('closed', () => { splashWindow = null; });
}
function createMainWindow() {
    // v.83.0526: Title bar UTUH + overlay color ikut app theme (light/dark).
    //   User: 'pakai title bar utuh tapi overlay mengikuti mode app light/dark'.
    //   Pakai titleBarStyle: 'hidden' + titleBarOverlay (Windows 10/11):
    //   - Title bar tetap muncul utuh (height 32px standard)
    //   - Windows controls (min/max/close) di kanan dengan symbolColor adaptive
    //   - Background color sync ke Vue dark mode via IPC theme:set
    const isWin = process.platform === 'win32';
    mainWindow = new electron_1.BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1024,
        minHeight: 600,
        backgroundColor: TITLEBAR_LIGHT.color, // cream default (match light mode)
        title: 'Ammu Online',
        icon: path.join(__dirname, '..', 'assets', isWin ? 'appIcon.ico' : 'appIcon.png'),
        // v.86.0526: native titlebar + menu bar (kyai req — header lengkap, hilangkan overlay
        //   yang menutupi ikon header app). Title bar + window controls digambar OS sendiri.
        titleBarStyle: 'default',
        autoHideMenuBar: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
            // v.80.0526: performance tuning untuk kurangi lag.
            backgroundThrottling: false, // jangan throttle waktu window blur/background
            spellcheck: false, // disable spellcheck (save CPU di typing)
            webSecurity: true,
            enableWebSQL: false
        },
        paintWhenInitiallyHidden: true, // pre-render saat hidden supaya pop instan
        show: false
    });
    mainWindow.once('ready-to-show', () => {
        // v.86.0526 FIX "splash dobel": JANGAN tampilkan main window dulu. Splash bawaan web app
        //   (Powered by Bakafrawi) ikut ke-render di main window → muncul bareng splash native = dobel.
        //   Tahan main HIDDEN selama splash native tampil, tutup splash dulu, baru show main
        //   (web app sudah lewat splash internal-nya karena ready-to-show = sudah render).
        const SPLASH_MIN_MS = 1800;
        setTimeout(() => {
            if (splashWindow && !splashWindow.isDestroyed()) {
                splashWindow.close();
            }
            mainWindow?.show();
            mainWindow?.focus();
        }, SPLASH_MIN_MS);
    });
    // v.85.0526: Load Vue app — pakai loadFile() di production (handle asar archive otomatis).
    //   loadURL('file://...') tidak work untuk path dalam asar → ERR_FILE_NOT_FOUND.
    if (isDev) {
        const devUrl = 'http://localhost:5174';
        console.log('[Electron] Loading dev:', devUrl);
        mainWindow.loadURL(devUrl).catch((err) => {
            console.error('[Electron] gagal load URL:', devUrl, err);
            electron_1.dialog.showErrorBox('Gagal Load App', `URL: ${devUrl}\nError: ${err.message}`);
        });
    }
    else {
        console.log('[Electron] Loading file:', APP_HTML_PATH);
        mainWindow.loadFile(APP_HTML_PATH).catch((err) => {
            console.error('[Electron] gagal load file:', APP_HTML_PATH, err);
            electron_1.dialog.showErrorBox('Gagal Load App', `Path: ${APP_HTML_PATH}\nError: ${err.message}`);
        });
    }
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
// ─── IPC: Theme — title bar overlay color follow app light/dark mode ─────────
// v.83.0526: Vue useUiStore call electronAPI.setTheme(isDark) saat dark toggle.
//   v.86.0526: native titlebar — Main cukup update setBackgroundColor() window
//   (warna title bar digambar OS, ikut tema sistem).
electron_1.ipcMain.handle('theme:set', async (_event, payload) => {
    try {
        const palette = payload?.isDark ? TITLEBAR_DARK : TITLEBAR_LIGHT;
        // v.86.0526: native titlebar — tidak ada overlay yang perlu di-sync (digambar OS).
        //   Cukup update background color window supaya transisi tema mulus.
        if (mainWindow) {
            mainWindow.setBackgroundColor(palette.color);
        }
        // v.87.0526: persist tema supaya splash window di launch berikutnya ikut tema app (bukan OS)
        try {
            fs.writeFileSync(path.join(electron_1.app.getPath('userData'), 'ammu-theme.json'), JSON.stringify({ isDark: !!payload?.isDark }));
        }
        catch (e) {
            console.warn('[theme:set] gagal simpan tema:', e);
        }
        return { ok: true, theme: payload?.isDark ? 'dark' : 'light' };
    }
    catch (e) {
        console.error('[theme:set] error:', e);
        return { ok: false, error: e?.message || String(e) };
    }
});
// ─── IPC: Native Print ─────────────────────────────────────────────────────────
//
// Renderer panggil window.electronAPI.printSilent({ html, options }).
// Main process render HTML ke offscreen window → silent print ke printer default.
electron_1.ipcMain.handle('print:silent', async (event, payload) => {
    try {
        const printWindow = new electron_1.BrowserWindow({
            width: 800,
            height: 1200,
            show: false,
            webPreferences: { nodeIntegration: false, contextIsolation: true }
        });
        const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(payload.html)}`;
        await printWindow.loadURL(dataUrl);
        await new Promise((resolve) => setTimeout(resolve, 200));
        const options = {
            silent: true,
            printBackground: false,
            deviceName: payload.options?.deviceName || '',
            copies: payload.options?.copies || 1,
            pageSize: payload.options?.pageSize || 'A4',
            margins: payload.options?.margins || { marginType: 'default' },
            ...payload.options
        };
        return new Promise((resolve, reject) => {
            printWindow.webContents.print(options, (success, errorType) => {
                printWindow.close();
                if (success)
                    resolve({ ok: true });
                else
                    reject(new Error(errorType || 'Print gagal'));
            });
        });
    }
    catch (e) {
        return { ok: false, error: e?.message || String(e) };
    }
});
// IPC: Print struk (Epson dot-matrix 9.5"/8.5" continuous, atau thermal 80mm/58mm)
// v.80.0526: pageSize sekarang di-pass dari renderer (sesuai settings.posStrukPaper).
//   Default: 9.5" × 11" continuous form (Epson LQ/FX-series default).
electron_1.ipcMain.handle('print:struk', async (_event, payload) => {
    try {
        const printWindow = new electron_1.BrowserWindow({
            width: 600,
            height: 900,
            show: false,
            webPreferences: { nodeIntegration: false, contextIsolation: true }
        });
        const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(payload.html)}`;
        await printWindow.loadURL(dataUrl);
        await new Promise((resolve) => setTimeout(resolve, 200));
        return new Promise((resolve, reject) => {
            printWindow.webContents.print({
                silent: true,
                printBackground: false,
                deviceName: payload.deviceName || '',
                margins: { marginType: 'none' },
                // v.95.0626: Default 9.5" × 5.5" = 1 slip (microns). Override dari payload.
                //   width 241300 (9.5") = lebar carriage (orientasi landscape/melebar, teks tegak melintang);
                //   height 139700 (5.5") = tinggi 1 slip → cegah printer feed 11" = 2 lembar.
                pageSize: payload.pageSize || { width: 241300, height: 139700 }
            }, (success, errorType) => {
                printWindow.close();
                if (success)
                    resolve({ ok: true });
                else
                    reject(new Error(errorType || 'Print struk gagal'));
            });
        });
    }
    catch (e) {
        return { ok: false, error: e?.message || String(e) };
    }
});
// v.95.0626: Script PowerShell raw print via winspool.drv (RAW datatype). Win7+ (PS 2.0, .NET 3.5).
const RAW_PRINT_PS1 = [
    'param([string]$PrinterName, [string]$FilePath)',
    '$ErrorActionPreference = "Stop"',
    '$code = @"',
    'using System;',
    'using System.Runtime.InteropServices;',
    'public class AmmuRawPrint {',
    '  [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Unicode)]',
    '  public struct DOCINFO { [MarshalAs(UnmanagedType.LPWStr)] public string pDocName; [MarshalAs(UnmanagedType.LPWStr)] public string pOutputFile; [MarshalAs(UnmanagedType.LPWStr)] public string pDataType; }',
    '  [DllImport("winspool.drv", CharSet=CharSet.Unicode, SetLastError=true)] public static extern bool OpenPrinter(string pPrinterName, out IntPtr hPrinter, IntPtr pDefault);',
    '  [DllImport("winspool.drv", SetLastError=true)] public static extern bool ClosePrinter(IntPtr hPrinter);',
    '  [DllImport("winspool.drv", CharSet=CharSet.Unicode, SetLastError=true)] public static extern bool StartDocPrinter(IntPtr hPrinter, int level, ref DOCINFO di);',
    '  [DllImport("winspool.drv", SetLastError=true)] public static extern bool EndDocPrinter(IntPtr hPrinter);',
    '  [DllImport("winspool.drv", SetLastError=true)] public static extern bool StartPagePrinter(IntPtr hPrinter);',
    '  [DllImport("winspool.drv", SetLastError=true)] public static extern bool EndPagePrinter(IntPtr hPrinter);',
    '  [DllImport("winspool.drv", SetLastError=true)] public static extern bool WritePrinter(IntPtr hPrinter, byte[] pBytes, int dwCount, out int dwWritten);',
    '  public static string Send(string printer, byte[] bytes) {',
    '    IntPtr h;',
    '    if (!OpenPrinter(printer, out h, IntPtr.Zero)) return "OpenPrinter:" + Marshal.GetLastWin32Error();',
    '    DOCINFO di = new DOCINFO(); di.pDocName = "Struk Ammu"; di.pDataType = "RAW";',
    '    string err = null;',
    '    if (StartDocPrinter(h, 1, ref di)) {',
    '      if (StartPagePrinter(h)) {',
    '        int written; if (!WritePrinter(h, bytes, bytes.Length, out written)) err = "WritePrinter:" + Marshal.GetLastWin32Error();',
    '        EndPagePrinter(h);',
    '      } else err = "StartPagePrinter:" + Marshal.GetLastWin32Error();',
    '      EndDocPrinter(h);',
    '    } else err = "StartDocPrinter:" + Marshal.GetLastWin32Error();',
    '    ClosePrinter(h);',
    '    return err;',
    '  }',
    '}',
    '"@',
    'Add-Type -TypeDefinition $code -Language CSharp',
    'if (-not $PrinterName) { $d = Get-WmiObject -Query "SELECT Name FROM Win32_Printer WHERE Default = TRUE"; if ($d) { $PrinterName = $d.Name } }',
    'if (-not $PrinterName) { Write-Error "Tidak ada printer default"; exit 1 }',
    '$bytes = [System.IO.File]::ReadAllBytes($FilePath)',
    '$res = [AmmuRawPrint]::Send($PrinterName, $bytes)',
    'if ($res) { Write-Error $res; exit 1 }',
    'Write-Output "OK"'
].join('\r\n');
// v.95.0626: IPC raw ESC/P print (dot-matrix) — kirim byte mentah ke printer (bukan render gambar).
electron_1.ipcMain.handle('print:raw', async (_event, payload) => {
    try {
        if (process.platform !== 'win32') {
            return { ok: false, error: 'Raw print hanya didukung di Windows' };
        }
        const buf = Buffer.from((payload && payload.base64) || '', 'base64');
        if (!buf.length)
            return { ok: false, error: 'Data struk kosong' };
        const stamp = Date.now() + '_' + Math.floor(Math.random() * 1e6);
        const tmpPrn = path.join(os.tmpdir(), 'ammu_struk_' + stamp + '.prn');
        const tmpPs1 = path.join(os.tmpdir(), 'ammu_rawprint_' + stamp + '.ps1');
        fs.writeFileSync(tmpPrn, buf);
        fs.writeFileSync(tmpPs1, RAW_PRINT_PS1, 'utf8');
        return await new Promise((resolve) => {
            (0, child_process_1.execFile)('powershell.exe', [
                '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass',
                '-File', tmpPs1, '-PrinterName', (payload && payload.deviceName) || '', '-FilePath', tmpPrn
            ], { windowsHide: true, timeout: 30000 }, (err, _stdout, stderr) => {
                try {
                    fs.unlinkSync(tmpPrn);
                }
                catch (e) { /* ignore */ }
                try {
                    fs.unlinkSync(tmpPs1);
                }
                catch (e) { /* ignore */ }
                if (err)
                    resolve({ ok: false, error: String(stderr || (err && err.message) || '').trim() || 'Print gagal' });
                else
                    resolve({ ok: true });
            });
        });
    }
    catch (e) {
        return { ok: false, error: e?.message || String(e) };
    }
});
// IPC: List printer yang available di sistem
electron_1.ipcMain.handle('print:list-printers', async () => {
    if (!mainWindow)
        return [];
    try {
        const printers = await mainWindow.webContents.getPrintersAsync();
        return printers.map((p) => ({
            name: p.name,
            displayName: p.displayName,
            isDefault: p.isDefault,
            status: p.status
        }));
    }
    catch (e) {
        console.error('[Electron] list-printers gagal:', e);
        return [];
    }
});
// v.80.0526 — IPC: Silent print PDF blob (untuk batch print rapor)
//
// Renderer kirim base64 PDF + deviceName → main process load PDF di hidden BrowserWindow,
// tunggu PDF.js Chrome built-in selesai render, lalu webContents.print({ silent: true }).
//
// Payload: { pdfBase64: string, deviceName?: string, copies?: number, color?: boolean, landscape?: boolean }
electron_1.ipcMain.handle('print:pdf', async (_event, payload) => {
    let printWindow = null;
    try {
        printWindow = new electron_1.BrowserWindow({
            width: 850,
            height: 1100,
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                plugins: true // enable Chrome PDF viewer
            }
        });
        const pdfDataUrl = `data:application/pdf;base64,${payload.pdfBase64}`;
        await printWindow.loadURL(pdfDataUrl);
        // Tunggu render PDF (Chrome PDF viewer butuh waktu untuk parse + render thumbnail)
        await new Promise((resolve) => setTimeout(resolve, 800));
        const options = {
            silent: true,
            printBackground: false,
            deviceName: payload.deviceName || '',
            copies: payload.copies || 1,
            color: payload.color !== false,
            landscape: payload.landscape === true,
            pageSize: payload.pageSize || 'A4',
            margins: { marginType: 'default' }
        };
        return await new Promise((resolve, reject) => {
            printWindow.webContents.print(options, (success, errorType) => {
                if (printWindow) {
                    try {
                        printWindow.close();
                    }
                    catch { }
                    printWindow = null;
                }
                if (success)
                    resolve({ ok: true });
                else
                    reject(new Error(errorType || 'Print PDF gagal'));
            });
        });
    }
    catch (e) {
        if (printWindow) {
            try {
                printWindow.close();
            }
            catch { }
        }
        return { ok: false, error: e?.message || String(e) };
    }
});
// v.80.0526 — IPC: Preview print (show print dialog instead of silent)
//   Sama dengan print:pdf tapi silent:false → user lihat preview & adjust options dulu.
electron_1.ipcMain.handle('print:pdf-preview', async (_event, payload) => {
    let win = null;
    try {
        win = new electron_1.BrowserWindow({
            width: 1000,
            height: 1200,
            show: true, // user lihat preview
            title: 'Print Preview — Ammu Online',
            webPreferences: { nodeIntegration: false, contextIsolation: true, plugins: true }
        });
        const pdfDataUrl = `data:application/pdf;base64,${payload.pdfBase64}`;
        await win.loadURL(pdfDataUrl);
        return { ok: true };
    }
    catch (e) {
        if (win)
            try {
                win.close();
            }
            catch { }
        return { ok: false, error: e?.message || String(e) };
    }
});
// ─── Native Menu Bar ────────────────────────────────────────────────────────────
// v.86.0526: Menu bar native (Berkas/Edit/Tampilan/Bantuan) — kyai req "header lengkap".
function buildAppMenu() {
    const template = [
        {
            label: 'Berkas',
            submenu: [
                { role: 'reload', label: 'Muat Ulang' },
                { role: 'forceReload', label: 'Paksa Muat Ulang' },
                { type: 'separator' },
                { role: 'quit', label: 'Keluar' }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo', label: 'Urungkan' },
                { role: 'redo', label: 'Ulangi' },
                { type: 'separator' },
                { role: 'cut', label: 'Potong' },
                { role: 'copy', label: 'Salin' },
                { role: 'paste', label: 'Tempel' },
                { role: 'selectAll', label: 'Pilih Semua' }
            ]
        },
        {
            label: 'Tampilan',
            submenu: [
                { role: 'zoomIn', label: 'Perbesar' },
                { role: 'zoomOut', label: 'Perkecil' },
                { role: 'resetZoom', label: 'Ukuran Normal' },
                { type: 'separator' },
                { role: 'togglefullscreen', label: 'Layar Penuh' },
                { role: 'toggleDevTools', label: 'Developer Tools' }
            ]
        },
        {
            label: 'Printer',
            submenu: [
                {
                    label: 'Pengaturan Printer',
                    click: () => { mainWindow?.webContents.send('open-printer-settings'); }
                }
            ]
        },
        {
            label: 'Bantuan',
            submenu: [
                {
                    label: 'Tentang Ammu Online',
                    click: () => {
                        electron_1.dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'Tentang Ammu Online',
                            message: 'Ammu Online — Pondok Pesantren Mambaul Ulum',
                            detail: 'Versi ' + electron_1.app.getVersion() + '\nYayasan Al Manshur, Sidoarjo.'
                        });
                    }
                }
            ]
        }
    ];
    electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(template));
}
// ─── App lifecycle ─────────────────────────────────────────────────────────────
// v.80.0526: tuning startup performance — disable GPU validation overhead.
//   Untuk Electron 27 di Windows, kombinasi ini biasanya kurangi blank-screen lag 200-500ms.
electron_1.app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion');
electron_1.app.commandLine.appendSwitch('disable-renderer-backgrounding');
electron_1.app.whenReady().then(() => {
    // v.86.0526: pasang native menu bar dulu
    buildAppMenu();
    // v.80.0526: tampilkan splash window dulu (instant, sebelum main window load)
    createSplashWindow();
    // v.80.0526: intercept file:// supaya absolute paths di Vue (`/logo.png`, `/favicon.svg`,
    //   `/bakafrawi-logo.png`, dll) yang di-resolve browser ke `file:///D:/logo.png` (drive root)
    //   bisa di-redirect ke `electron/app/logo.png`.
    //
    //   Tanpa intercept ini, semua reference absolute path = ERR_FILE_NOT_FOUND (7000+ errors).
    //   Daripada ubah 12+ file Vue source, lebih bijak handle di sini.
    const APP_ROOT = path.join(__dirname, '..', 'app');
    electron_1.protocol.interceptFileProtocol('file', (request, callback) => {
        try {
            // v.86.0526 FIX: strip scheme + query/hash, decode %20.
            let urlPath = decodeURIComponent(request.url.split('?')[0].split('#')[0]).replace(/^file:\/\//, '');
            // Windows: "/D:/..." → "D:/..."
            if (process.platform === 'win32' && /^\/[A-Za-z]:[/\\]/.test(urlPath))
                urlPath = urlPath.slice(1);
            // 1) File yang MEMANG ada di disk (index.html, ./assets/*, dll) → serve apa adanya.
            //    ROOT-CAUSE fix blank screen: dulu SEMUA file:// drive-rooted di-redirect ke APP_ROOT,
            //    sehingga index.html sendiri → path ganda → ERR_FILE_NOT_FOUND → app blank.
            if (fs.existsSync(urlPath)) {
                callback({ path: urlPath });
                return;
            }
            // 2) Absolute-path ref Vue (mis. /logo.png → file:///D:/logo.png di drive root) → cari di APP_ROOT.
            const driveRooted = urlPath.match(/^[A-Za-z]:[/\\](.+)$/);
            if (driveRooted) {
                const rel = driveRooted[1].replace(/\//g, path.sep);
                const resolved = path.join(APP_ROOT, rel);
                if (fs.existsSync(resolved)) {
                    callback({ path: resolved });
                    return;
                }
                // fallback: nama file saja → APP_ROOT/<basename>
                callback({ path: path.join(APP_ROOT, path.basename(urlPath)) });
                return;
            }
            // Default: pass through
            callback({ path: urlPath });
        }
        catch (e) {
            console.error('[interceptFileProtocol] error:', e);
            callback({ error: -2 }); // -2 = FAILED
        }
    });
    createMainWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
    // v.86.0526: Auto-update HANYA di app terpaket (skip dev). Tetap di-catch supaya 404
    //   (belum ada GitHub release) tidak nge-crash app.
    if (electron_1.app.isPackaged) {
        electron_updater_1.autoUpdater.autoDownload = false;
        electron_updater_1.autoUpdater.checkForUpdatesAndNotify().catch((err) => {
            console.warn('[AutoUpdate] check skip/gagal (abaikan kalau belum publish release):', err?.message || err);
        });
    }
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
