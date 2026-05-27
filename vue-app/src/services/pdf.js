// v.20.74.0526: PDF service — lazy load jsPDF + pdfmake on-demand (saves ~250KB initial load)

function _injectScript(src) {
  return new Promise((resolve, reject) => {
    if ([...document.scripts].some(s => s.src === src)) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Failed to load: ' + src))
    document.head.appendChild(s)
  })
}

function _waitFor(check, timeoutMs = 6000) {
  return new Promise((resolve, reject) => {
    const t0 = Date.now()
    const tick = () => {
      const v = check()
      if (v) return resolve(v)
      if (Date.now() - t0 > timeoutMs) return reject(new Error('CDN timeout'))
      setTimeout(tick, 80)
    }
    tick()
  })
}

let _jsPDFLoaded = null
export async function jsPDFFromCDN(timeoutMs = 6000) {
  if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF
  if (!_jsPDFLoaded) {
    _jsPDFLoaded = (async () => {
      await _injectScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
      await _injectScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js')
    })()
  }
  await _jsPDFLoaded
  return _waitFor(() => window.jspdf && window.jspdf.jsPDF, timeoutMs)
}

export async function jsPDFWithAutoTable() {
  const jsPDF = await jsPDFFromCDN()
  return jsPDF
}

// v.21.86: html2pdf.bundle untuk capture HTML view → PDF (zero drift dengan render Vue)
let _html2pdfLoaded = null
export async function html2pdfFromCDN(timeoutMs = 8000) {
  if (window.html2pdf) return window.html2pdf
  if (!_html2pdfLoaded) {
    _html2pdfLoaded = _injectScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js')
  }
  await _html2pdfLoaded
  return _waitFor(() => window.html2pdf, timeoutMs)
}

let _pdfMakeLoaded = null
export async function pdfMakeFromCDN(timeoutMs = 8000) {
  if (window.pdfMake && window.pdfMake.createPdf) return window.pdfMake
  if (!_pdfMakeLoaded) {
    _pdfMakeLoaded = (async () => {
      await _injectScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.10/pdfmake.min.js')
      await _injectScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.10/vfs_fonts.js')
    })()
  }
  await _pdfMakeLoaded
  return _waitFor(() => window.pdfMake && window.pdfMake.createPdf, timeoutMs)
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
