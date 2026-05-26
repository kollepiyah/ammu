// vue-app/src/composables/usePrinter.js
/**
 * Composable for high-quality HTML printing, matching legacy 'cetakHtmlSebagaiPDF' logic.
 * Uses window.print() to ensure vector-sharp PDF output.
 */

import { useSettingsStore } from '@/stores/settings'

export function usePrinter() {
  const settings = useSettingsStore()

  /**
   * Generates a standard header (KOP) in HTML format.
   * @param {Object} opts - { pakaiLogoQiraati: boolean, lembaga: string }
   */
  const buildKopHTML = (opts = {}) => {
    const set = settings.settings || {}
    const isQiraatiKop = opts.pakaiLogoQiraati !== false

    // v.108.14: Support per-lembaga logo if provided
    let logoKop = set.logoUrl || set.logoKop || ''

    // In Vue app, these might be served from assets or firebase storage
    // We assume they are available in settings
    const logoQiraati = set.logoQiraati || ''

    const kopLines = [
      set.kopLine1 || 'PONDOK PESANTREN',
      set.kopLine2 || set.txtAppName || 'MAMBAUL ULUM',
      set.kopLine3 || '',
      set.kopLine4 || ''
    ]

    const _toTitleCase = (s) =>
      String(s)
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase())

    return `
      <table style="width:100%; border-bottom:2px solid #000; padding-bottom:6px; margin-bottom:12px; border-collapse:collapse;">
        <tr>
          <td style="width:85px; text-align:center; vertical-align:middle;">
            ${isQiraatiKop && logoQiraati ? `<img src="${logoQiraati}" style="width:75px; height:75px; object-fit:contain;">` : logoKop ? `<img src="${logoKop}" style="width:75px; height:75px; object-fit:contain;">` : ''}
          </td>
          <td style="text-align:center; vertical-align:middle; font-family:'Times New Roman', Times, serif; padding:0 10px;">
            <div style="font-size:14px; font-weight:normal; text-transform:uppercase; line-height:1.2; margin:0;">${kopLines[0]}</div>
            <div style="font-size:22px; font-weight:bold; text-transform:uppercase; line-height:1.2; margin:2px 0;">${kopLines[1]}</div>
            <div style="font-size:12px; font-weight:normal; line-height:1.2; margin:0;">${_toTitleCase(kopLines[2])}</div>
            <div style="font-size:12px; font-weight:normal; line-height:1.2; margin:0;">${_toTitleCase(kopLines[3])}</div>
          </td>
          <td style="width:85px; text-align:center; vertical-align:middle;">
            ${isQiraatiKop && logoKop ? `<img src="${logoKop}" style="width:75px; height:75px; object-fit:contain;">` : ''}
          </td>
        </tr>
      </table>
    `
  }

  /**
   * Opens a new window and triggers print.
   * @param {string} html - The content body (without <html> tags is fine)
   * @param {Object} opts - { filename: string, orientation: 'p'|'l', styles: string }
   */
  const printHTML = async (html, opts = {}) => {
    const filename = opts.filename || `cetak_${Date.now()}.pdf`
    const orientation = opts.orientation === 'l' ? 'landscape' : 'portrait'
    const customStyles = opts.styles || ''

    let fullHtml = html.trim()
    if (!/^<!DOCTYPE|^<html/i.test(fullHtml)) {
      fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${filename}</title>
          <style>
            @page { size: A4 ${orientation}; margin: 12mm; }
            @media print {
              body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .no-print { display: none !important; }
            }
            body {
              font-family: Arial, sans-serif; padding: 0; margin: 0;
              -webkit-print-color-adjust: exact; print-color-adjust: exact;
              color: #333;
            }
            table { border-collapse: collapse; }
            ${customStyles}
          </style>
        </head>
        <body>
          ${html}
          <script>
            setTimeout(() => {
              try {
                window.focus();
                window.print();
                // Close window after print dialog is dismissed (some browsers support this)
                window.onafterprint = () => window.close();
              } catch(e) { console.error(e); }
            }, 500);
          </script>
        </body>
        </html>
      `
    }

    const printWin = window.open('', '_blank', 'width=900,height=1100')
    if (!printWin) {
      alert('Pop-up diblokir browser. Izinkan pop-up untuk mencetak.')
      return
    }

    printWin.document.write(fullHtml)
    printWin.document.close()
  }

  return {
    buildKopHTML,
    printHTML
  }
}
