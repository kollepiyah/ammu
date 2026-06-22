// shellOverride — override shell utk DEV/preview & uji tampilan mobile di browser.
// Pakai: buka URL dengan `?shell=mobile` (paksa UI Android: AppLayout + bottom nav),
//   `?shell=desktop` (paksa Ribbon), atau `?shell=auto` (kembali deteksi otomatis).
// Pilihan DIPERSIST di localStorage supaya bertahan lintas navigasi/reload.
// Bersifat OPT-IN: tanpa query param, tak ada efek (user normal tak terpengaruh).
function readOverride() {
  try {
    // query bisa di search (?shell=) ATAU di dalam hash (#/route?shell=) krn hash-router
    let v = new URLSearchParams(location.search).get('shell')
    if (!v && location.hash.includes('?')) {
      v = new URLSearchParams(location.hash.split('?')[1]).get('shell')
    }
    if (v) {
      if (v === 'auto') localStorage.removeItem('__forceShell')
      else localStorage.setItem('__forceShell', v)
    }
    return localStorage.getItem('__forceShell') || ''
  } catch {
    return ''
  }
}

export const forcedShell = readOverride()
export const forceMobileShell = forcedShell === 'mobile'
export const forceDesktopRibbon = forcedShell === 'desktop'
