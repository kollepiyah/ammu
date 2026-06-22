// v.96.0626 (audit 08Jun2026): PDF libs di-BUNDLE lokal (npm) via dynamic import ->
// lazy/code-split TAPI tersedia OFFLINE (native/Electron/PWA), tak lagi tergantung CDN.
// Nama `jsPDFFromCDN`/`jsPDFWithAutoTable` dipertahankan agar pemanggil tak berubah (kini bukan CDN).
// html2pdf & pdfmake DIHAPUS (dead - tak ada pemakai). imageToDataURL tetap.

let _jsPDFLoaded = null
export async function jsPDFFromCDN() {
  if (!_jsPDFLoaded) {
    _jsPDFLoaded = (async () => {
      const mod = await import('jspdf')
      await import('jspdf-autotable') // side-effect: daftarkan doc.autoTable
      return mod.jsPDF || (mod.default && mod.default.jsPDF) || mod.default
    })()
  }
  return _jsPDFLoaded
}

export async function jsPDFWithAutoTable() {
  return jsPDFFromCDN()
}

export async function imageToDataURL(url, fallbackUrl = null) {
  if (!url) return null
  try {
    let resp
    try { resp = await fetch(url, { mode: 'cors' }) } catch { resp = await fetch(url) }
    if (!resp || !resp.ok) throw new Error('fetch fail')
    const blob = await resp.blob()
    return await new Promise((resolve, reject) => {
      const r = new FileReader()
      r.onloadend = () => resolve(r.result)
      r.onerror = reject
      r.readAsDataURL(blob)
    })
  } catch {
    if (fallbackUrl && url !== fallbackUrl) {
      try {
        const resp2 = await fetch(fallbackUrl)
        const blob2 = await resp2.blob()
        return await new Promise((resolve) => {
          const r = new FileReader()
          r.onloadend = () => resolve(r.result)
          r.readAsDataURL(blob2)
        })
      } catch { return null }
    }
    return null
  }
}
