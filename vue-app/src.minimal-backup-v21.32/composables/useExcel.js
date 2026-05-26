// v.21.25.0526 — useExcel composable
// CDN-first loading (cdnjs) untuk hindari Firebase Hosting rewrite "**" -> /index.html
// yang bikin /exceljs.min.js return text/html (MIME error).

let _loadedPromise = null

/**
 * v.21.25.0526: CDN-first. Local /vue/exceljs.min.js sebagai fallback (kalau offline/blocked).
 * Sebelumnya local-first → MIME 'text/html' karena rewrite rule.
 */
function loadExcelJS() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'))
  if (window.ExcelJS) return Promise.resolve(window.ExcelJS)
  if (_loadedPromise) return _loadedPromise

  const CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js'
  const LOCAL_URL = '/vue/exceljs.min.js'

  function tryLoad(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.onload = () => {
        if (window.ExcelJS) resolve(window.ExcelJS)
        else reject(new Error('ExcelJS not exposed after ' + src))
      }
      s.onerror = () => reject(new Error('Script error: ' + src))
      document.head.appendChild(s)
    })
  }

  _loadedPromise = tryLoad(CDN_URL).catch((err) => {
    console.warn('[useExcel] CDN load failed, fallback to local:', err.message)
    return tryLoad(LOCAL_URL)
  })
  return _loadedPromise
}

/** Util: trigger download blob. */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }, 100)
}

export function useExcel() {
  /**
   * Export ringan: list of row objects → 1 sheet.
   * @param {object[]} rows
   * @param {object} opts { filename, sheetName, columns: [{key,header,width}], title }
   */
  async function exportSimple(rows, opts = {}) {
    const ExcelJS = await loadExcelJS()
    const wb = new ExcelJS.Workbook()
    wb.creator = 'Ammu Online'
    wb.created = new Date()
    const ws = wb.addWorksheet(opts.sheetName || 'Data')

    const columns =
      opts.columns || Object.keys(rows[0] || {}).map((k) => ({ key: k, header: k, width: 16 }))

    let titleRowOffset = 0
    if (opts.title) {
      ws.mergeCells(1, 1, 1, columns.length)
      const titleCell = ws.getCell(1, 1)
      titleCell.value = opts.title
      titleCell.font = { bold: true, size: 14 }
      titleCell.alignment = { horizontal: 'center', vertical: 'middle' }
      ws.getRow(1).height = 26
      titleRowOffset = 1
    }

    // Header row
    const headerRow = ws.getRow(titleRowOffset + 1)
    columns.forEach((c, i) => {
      const cell = headerRow.getCell(i + 1)
      cell.value = c.header
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F766E' } }
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    })
    headerRow.height = 22

    // Set column widths
    columns.forEach((c, i) => {
      ws.getColumn(i + 1).width = c.width || 16
    })

    // Data rows
    rows.forEach((r, idx) => {
      const row = ws.getRow(titleRowOffset + 2 + idx)
      columns.forEach((c, i) => {
        const cell = row.getCell(i + 1)
        cell.value = r[c.key] ?? ''
        cell.alignment = { vertical: 'middle', wrapText: true }
        cell.border = {
          top: { style: 'hair' },
          bottom: { style: 'hair' },
          left: { style: 'hair' },
          right: { style: 'hair' }
        }
      })
    })

    const buffer = await wb.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    downloadBlob(blob, opts.filename || `export_${Date.now()}.xlsx`)
  }

  /**
   * Export styled dengan KOP header (4 baris) — match legacy exportToExcelStyled output.
   */
  async function exportStyled(rows, opts = {}) {
    const ExcelJS = await loadExcelJS()
    const wb = new ExcelJS.Workbook()
    const ws = wb.addWorksheet(opts.sheetName || 'Data')
    const columns =
      opts.columns || Object.keys(rows[0] || {}).map((k) => ({ key: k, header: k, width: 16 }))

    const kop = opts.kop || []
    let rowIdx = 1
    kop.forEach((line, i) => {
      if (!line) return
      ws.mergeCells(rowIdx, 1, rowIdx, columns.length)
      const c = ws.getCell(rowIdx, 1)
      c.value = line
      c.alignment = { horizontal: 'center', vertical: 'middle' }
      c.font = {
        bold: i === 1, // Baris ke-2 biasanya nama besar bold
        size: i === 1 ? 14 : i === 0 ? 11 : 10,
        color: { argb: 'FF1E293B' }
      }
      ws.getRow(rowIdx).height = i === 1 ? 22 : 16
      rowIdx++
    })

    if (opts.subtitle) {
      ws.mergeCells(rowIdx, 1, rowIdx, columns.length)
      const c = ws.getCell(rowIdx, 1)
      c.value = opts.subtitle
      c.alignment = { horizontal: 'center' }
      c.font = { italic: true, size: 11, color: { argb: 'FF475569' } }
      rowIdx++
    }

    rowIdx++ // spacer

    // Header
    const headerRow = ws.getRow(rowIdx)
    columns.forEach((col, i) => {
      const cell = headerRow.getCell(i + 1)
      cell.value = col.header
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F766E' } }
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    })
    headerRow.height = 24
    rowIdx++

    // Data
    rows.forEach((r) => {
      const row = ws.getRow(rowIdx)
      columns.forEach((col, i) => {
        const cell = row.getCell(i + 1)
        cell.value = r[col.key] ?? ''
        cell.alignment = { vertical: 'middle', wrapText: true }
        cell.border = {
          top: { style: 'hair' },
          bottom: { style: 'hair' },
          left: { style: 'hair' },
          right: { style: 'hair' }
        }
      })
      rowIdx++
    })

    columns.forEach((c, i) => {
      ws.getColumn(i + 1).width = c.width || 16
    })

    const buffer = await wb.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    downloadBlob(blob, opts.filename || `export_${Date.now()}.xlsx`)
  }

  /**
   * v.21.13b.0526: Smart-detect header row.
   * Template kita pakai KOP di row 1-3, jadi header sebenarnya di row 4.
   * Scan row 1-10, ambil row dengan paling banyak cell text non-kosong sebagai header.
   */
  async function importFile(file) {
    const ExcelJS = await loadExcelJS()
    const wb = new ExcelJS.Workbook()
    const buf = await file.arrayBuffer()
    await wb.xlsx.load(buf)
    const ws = wb.worksheets[0]
    if (!ws) return []

    // Step 1: Find header row — pick row in first 10 with most non-empty cells
    let bestHeaderRow = 1
    let bestCount = 0
    for (let i = 1; i <= Math.min(10, ws.rowCount); i++) {
      let count = 0
      ws.getRow(i).eachCell((cell) => {
        const v = String(cell.value || '').trim()
        if (v && v.length > 0 && v.length < 60) count++
      })
      if (count > bestCount) {
        bestCount = count
        bestHeaderRow = i
      }
    }

    // Step 2: Read headers from detected row
    const headers = []
    ws.getRow(bestHeaderRow).eachCell((cell, colNumber) => {
      headers[colNumber - 1] = String(cell.value || `col${colNumber}`).trim()
    })

    // Step 3: Read data from rows AFTER header row
    const rows = []
    ws.eachRow((row, rowNumber) => {
      if (rowNumber <= bestHeaderRow) return
      const obj = {}
      row.eachCell((cell, colNumber) => {
        let v = cell.value
        if (v && typeof v === 'object' && 'text' in v) v = v.text
        if (v && typeof v === 'object' && 'result' in v) v = v.result
        obj[headers[colNumber - 1]] = v
      })
      if (
        Object.values(obj).some((v) => v !== undefined && v !== null && String(v).trim() !== '')
      ) {
        rows.push(obj)
      }
    })
    return rows
  }

  return { exportSimple, exportStyled, importFile }
}
