// v.100 Batch11: Kirim laporan ke Google Sheet via Apps Script Web App (HYBRID — Excel tetap).
//   Tujuan kyai: layout rapi mirip PDF. App hanya KIRIM data (JSON) ke endpoint Apps Script
//   milik kyai (akun Google kyai); Apps Script yang membuat + memformat Sheet & balas link.
//   Endpoint URL + token rahasia disimpan di settings (Pengaturan → Google Sheet).
//
// Kontrak payload (lihat kode Apps Script di docs/APPSCRIPT-GSHEET.md):
//   { token, title, sheetName, kop:[], subtitle, columns:[{header,width}], rows:[[...]] }
// Balasan sukses: { ok:true, url:'https://docs.google.com/...' }
import { useSettingsStore } from '@/stores/settings'

export function useGoogleSheet() {
  const settings = useSettingsStore()

  function isConfigured() {
    const s = settings.settings || {}
    return !!(s.gsheetUrl && String(s.gsheetUrl).trim())
  }

  /**
   * Kirim 1 laporan ke Google Sheet.
   * @param {object} opts { title, sheetName, kop:[], subtitle, columns:[{key,header,width}], rows:[obj] }
   * @returns {Promise<{url:string}>}
   */
  async function sendToSheet(opts = {}) {
    const s = settings.settings || {}
    const url = String(s.gsheetUrl || '').trim()
    const token = String(s.gsheetToken || '').trim()
    if (!url) {
      throw new Error('Google Sheet belum diatur. Buka Pengaturan → Google Sheet, tempel URL Web App + token dulu.')
    }
    const columns = opts.columns || []
    // map rows (array of objects) → 2D array selaras urutan kolom (sama spt useExcel)
    const rows = (opts.rows || []).map((r) =>
      columns.map((c) => {
        const v = r[c.key]
        return v == null ? '' : v
      })
    )
    const payload = {
      token,
      title: opts.title || 'Laporan',
      sheetName: opts.sheetName || (opts.title || 'Data'),
      kop: opts.kop || [],
      subtitle: opts.subtitle || '',
      columns: columns.map((c) => ({ header: c.header, width: c.width || 16 })),
      rows
    }

    let res
    try {
      // text/plain → hindari CORS preflight (Apps Script web app baca e.postData.contents)
      res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        redirect: 'follow'
      })
    } catch (e) {
      throw new Error('Tidak bisa menghubungi Google (cek koneksi / URL Web App). ' + (e.message || e))
    }
    let data
    const text = await res.text()
    try {
      data = JSON.parse(text)
    } catch (e) {
      throw new Error('Balasan Google tidak valid. Pastikan Web App di-deploy "Anyone" & kode benar.')
    }
    if (!data || data.ok !== true) {
      throw new Error(data?.error || 'Gagal membuat Google Sheet.')
    }
    return { url: data.url }
  }

  return { isConfigured, sendToSheet }
}
