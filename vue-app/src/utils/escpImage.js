// v.96.0626: CETAK SLIP SEBAGAI GRAFIS RASTER via ESC/P bit-image (bypass driver Windows).
//
// Masalah: cetak grafis lewat driver Windows di EPSON LX-310 SELALU feed ~5cm (top-of-form)
//   sebelum mencetak — tak bisa dimatikan (tes Windows pun kena). Aplikasi LAMA tidak begitu
//   karena cetak LANGSUNG ke printer (tanpa driver).
// Solusi: render slip ke <canvas> pakai font Arial (tampilan tetap grafis), ubah jadi 1-bit,
//   encode ESC/P bit-image (ESC * mode 1 = 120dpi horizontal, 8 dot vertikal = 72dpi), lalu
//   kirim byte mentah via IPC print:raw (winspool RAW). Mulai cetak SEKETIKA -> TANPA feed 5cm.
//
// Aspek: dpiH=120, dpiV=72 (pin pitch 9-pin). Canvas digambar dgn ctx.setTransform(120/72,0,0,1)
//   sehingga 1 unit logis = 1 titik (pt = 1/72") -> 1px vertikal, di-stretch horizontal otomatis.
//   Hasil cetak TIDAK gepeng (aspect benar).
import { buildKopFromSettings } from './strukBuilder'
import { terbilangRupiah } from './terbilang'

const mm2pt = (mm) => (mm * 72) / 25.4

function fmtNum(n) {
  return new Intl.NumberFormat('id-ID').format(Math.round(Number(n) || 0))
}
function fmtTgl(t) {
  if (!t) return '-'
  const m = String(t).match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (m) return m[3] + '-' + m[2] + '-' + m[1]
  try {
    const d = new Date(t)
    if (!isNaN(d)) {
      return String(d.getDate()).padStart(2, '0') + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + d.getFullYear()
    }
  } catch (e) { /* ignore */ }
  return String(t)
}
function kelasFull(trx) {
  const ng = [trx.lembaga, trx.kelas].filter(Boolean).join(' ')
  const sk = [trx.lembaga_sekolah, trx.kelas_sekolah].filter(Boolean).join(' ')
  return [sk, ng].filter(Boolean).join('/') || '-'
}
function num(v, lo, hi, def) {
  const n = parseFloat(v)
  return Number.isFinite(n) && n >= lo && n <= hi ? n : def
}

// Gambar slip ke ctx (koordinat dalam pt = 1/72"). Return Y terbawah (pt) yg terpakai.
function drawSlip(ctx, p) {
  const L = mm2pt(6)
  const R = p.Wpt - mm2pt(6)
  ctx.fillStyle = '#000'
  ctx.strokeStyle = '#000'
  ctx.textBaseline = 'alphabetic'
  const text = (t, x, yy, px, bold, align) => {
    ctx.font = (bold ? 'bold ' : '') + px + 'px Arial'
    let xx = x
    const w = ctx.measureText(String(t)).width
    if (align === 'right') xx = x - w
    else if (align === 'center') xx = x - w / 2
    ctx.fillText(String(t), xx, yy)
  }
  const hr = (yy) => { ctx.fillRect(L, yy, R - L, 1.4) }

  let y = mm2pt(2)
  // ── KOP kiri-atas ──
  y += 13; text(p.kop.line1 || '', L, y, 15, true)
  if (p.kop.line2) { y += 12; text(p.kop.line2, L, y, 11, true) }
  for (const ln of [p.kop.line3, p.kop.line4, p.kop.line5].filter(Boolean)) { y += 9.5; text(ln, L, y, 8.5, false) }
  // ── Kotak BUKTI kanan-atas ──
  ctx.font = 'bold 10px Arial'
  const bw = ctx.measureText(p.boxLabel).width + mm2pt(4)
  const bx = R - bw
  const by = mm2pt(2) + 1
  const bh = mm2pt(5)
  ctx.lineWidth = 1.4
  ctx.strokeRect(bx, by, bw, bh)
  text(p.boxLabel, bx + bw / 2, by + bh / 2 + 3.5, 10, true, 'center')

  y += mm2pt(2.2); hr(y); y += mm2pt(1)
  // ── Info 2 kolom ──
  const colMid = p.Wpt / 2 + mm2pt(4)
  const labW = mm2pt(23)
  const labWr = mm2pt(17)
  const rows = Math.max(p.infoLeft.length, p.infoRight.length)
  const rh = mm2pt(4.6)
  let iy = y + 11
  for (let i = 0; i < rows; i++) {
    const ry = iy + i * rh
    if (p.infoLeft[i]) {
      text(p.infoLeft[i][0], L, ry, 11, false)
      text(':', L + labW, ry, 11, false)
      text(p.infoLeft[i][1], L + labW + mm2pt(1.8), ry, 11, false)
    }
    if (p.infoRight[i]) {
      text(p.infoRight[i][0], colMid, ry, 11, false)
      text(':', colMid + labWr, ry, 11, false)
      text(p.infoRight[i][1], colMid + labWr + mm2pt(1.8), ry, 11, false)
    }
  }
  y = iy + rows * rh
  y += mm2pt(0.5); hr(y); y += mm2pt(1)
  // ── Rincian ──
  y += 11; if (p.midHeader) text(p.midHeader, L, y, 11, false)
  for (const it of p.items) {
    y += mm2pt(4.6)
    text(it.name, L + mm2pt(2), y, 11, false)
    if (it.amount) text(it.amount, R, y, 11, false, 'right')
  }
  y += mm2pt(1.6); hr(y); y += mm2pt(1)
  // ── Footer: ttd kiri + total kanan ──
  const c1 = L + mm2pt(20)
  const c2 = p.Wpt / 2 - mm2pt(6)
  let fy = y + 11
  text(p.signLeftLabel, c1, fy, 10, false, 'center')
  text(p.signRightLabel, c2, fy, 10, false, 'center')
  // total kanan
  let ty = fy
  const totX = p.Wpt / 2 + mm2pt(12)
  for (const [lbl, val, big] of p.totals) {
    text(lbl, totX, ty, big ? 13 : 11, !!big)
    text(val, R, ty, big ? 13 : 11, !!big, 'right')
    ty += mm2pt(big ? 5 : 4.6)
  }
  // nama ttd
  const sy = fy + mm2pt(14)
  text(p.signLeftName || '( .......... )', c1, sy, 10, false, 'center')
  text(p.signRightName || '( .......... )', c2, sy, 10, false, 'center')
  return Math.max(ty, sy) + mm2pt(2)
}

// Canvas 1-bit -> byte ESC/P bit-image (mode 1, 120dpi) -> base64.
function encodeEscpBase64(ctx, w, usedH, slipHmm) {
  const img = ctx.getImageData(0, 0, w, usedH).data
  const mono = new Uint8Array(w * usedH)
  for (let i = 0, p = 0; p < mono.length; i += 4, p++) {
    const lum = 0.299 * img[i] + 0.587 * img[i + 1] + 0.114 * img[i + 2]
    mono[p] = lum < 140 ? 1 : 0
  }
  const ESC = 0x1B
  const bytes = []
  bytes.push(ESC, 0x40)                 // ESC @ : init
  bytes.push(ESC, 0x33, 24)             // ESC 3 24 : line spacing 24/216" = 8/72"
  const nL = w & 0xFF
  const nH = (w >> 8) & 0xFF
  let lines = 0
  for (let y = 0; y < usedH; y += 8) {
    bytes.push(ESC, 0x2A, 0x01, nL, nH) // ESC * 1 nL nH : bit-image 120dpi
    for (let x = 0; x < w; x++) {
      let b = 0
      for (let k = 0; k < 8; k++) {
        const yy = y + k
        if (yy < usedH && mono[yy * w + x]) b |= (0x80 >> k)
      }
      bytes.push(b)
    }
    bytes.push(0x0D, 0x0A)              // CR LF : maju 1 strip (8/72")
    lines++
  }
  // maju ke batas slip berikutnya (tanpa form-feed driver) supaya slip tdk nyambung
  const slipLines = Math.round((slipHmm / 25.4) * 9) // 9 baris/inch @ 8/72"
  for (let i = lines; i < slipLines; i++) bytes.push(0x0A)
  bytes.push(ESC, 0x40)                 // reset

  // bytes -> binary string -> base64 (chunked, hindari stack overflow)
  let bin = ''
  const CH = 0x8000
  for (let i = 0; i < bytes.length; i += CH) {
    bin += String.fromCharCode.apply(null, bytes.slice(i, i + CH))
  }
  return typeof btoa === 'function' ? btoa(bin) : Buffer.from(bin, 'latin1').toString('base64')
}

function renderEscp(data, settings) {
  const slipW = Math.min(num(settings.posStrukSlipW, 120, 260, 220), 203) // batas lebar cetak 9-pin (~8")
  const slipH = num(settings.posStrukSlipH, 60, 230, 140)
  const dpiH = 120
  const Wpt = mm2pt(slipW)
  const canvasW = Math.round((Wpt * dpiH) / 72)
  const canvasH = Math.round(mm2pt(Math.max(slipH, 160))) // ruang cukup; di-crop ke konten
  const cv = document.createElement('canvas')
  cv.width = canvasW
  cv.height = canvasH
  const ctx = cv.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvasW, canvasH)
  ctx.setTransform(dpiH / 72, 0, 0, 1, 0, 0) // 1 unit = 1pt (1/72"); horizontal di-stretch ke 120dpi
  data.Wpt = Wpt
  const maxYpt = drawSlip(ctx, data)
  let usedH = Math.min(canvasH, Math.ceil(maxYpt))
  usedH = Math.ceil(usedH / 8) * 8
  return encodeEscpBase64(ctx, canvasW, usedH, slipH)
}

// ── Builder data slip ──
function posData(trx, settings) {
  const kop = buildKopFromSettings(settings)
  const items = (Array.isArray(trx.items) ? trx.items : []).map((it, i) => ({
    name: (i + 1) + '. ' + ((it.jenis || '-') + (it.keterangan ? ' (' + it.keterangan + ')' : '')),
    amount: 'Rp. ' + fmtNum(it.nominal)
  }))
  if (!items.length) items.push({ name: '-', amount: '' })
  const totals = [['Jumlah Rp.', fmtNum(trx.total), true]]
  if (trx.bayar != null) totals.push(['Pembayaran Rp.', fmtNum(trx.bayar), false])
  if (trx.kembali != null) totals.push(['Kembali Rp.', fmtNum(trx.kembali), false])
  return {
    kop,
    boxLabel: 'BUKTI PEMBAYARAN',
    infoLeft: [['Diterima dari', trx.santri_nama || '-'], ['NIS', trx.santri_nis || '-'], ['Kelas', kelasFull(trx)], ['Terbilang', trx.terbilang || terbilangRupiah(trx.total)]],
    infoRight: [['Tgl. Bayar', fmtTgl(trx.tanggal)], ['No. Bukti', trx.no_struk || '-'], ['Metode', trx.metode || 'TUNAI']],
    midHeader: 'Dengan rincian pembayaran sebagai berikut :',
    items,
    totals,
    signLeftLabel: 'Penyetor,',
    signLeftName: '( ' + String(trx.penyetor || '').trim() + ' )',
    signRightLabel: 'Penerima,',
    signRightName: '( ' + (trx.operator || '') + ' )'
  }
}
function tabData(mut, settings, { saldo = null, santri = {}, label = 'TABUNGAN' } = {}) {
  const kop = buildKopFromSettings(settings)
  const isSetor = String(mut.jenis || 'setor').toLowerCase() === 'setor'
  const isUS = String(label).toUpperCase().includes('SAKU')
  const nama = mut.nama_cache || santri.nama || '-'
  const nis = santri.nis || mut.santri_nis || '-'
  const kelas = [santri.lembaga_sekolah, santri.kelas_sekolah].filter(Boolean).join(' ') || [santri.lembaga, santri.kelas].filter(Boolean).join(' ') || '-'
  const petugas = mut.operator || mut.petugas || '-'
  const ket = (isSetor ? 'Setoran ' : 'Penarikan ') + (isUS ? 'uang saku' : 'tabungan') + (mut.catatan ? ' (' + mut.catatan + ')' : '')
  const totals = [['Jumlah Rp.', fmtNum(mut.nominal), true]]
  if (saldo != null) totals.push(['Saldo Akhir Rp.', fmtNum(saldo), false])
  return {
    kop,
    boxLabel: 'BUKTI ' + (isSetor ? 'SETOR ' : 'TARIK ') + label,
    infoLeft: [['Diterima dari', nama], ['NIS', nis], ['Kelas', kelas], ['Terbilang', terbilangRupiah(mut.nominal)]],
    infoRight: [['Tanggal', fmtTgl(mut.tanggal)], ['No. Bukti', mut.id || '-'], ['Metode', 'TUNAI']],
    midHeader: 'Dengan rincian sebagai berikut :',
    items: [{ name: '1. ' + ket, amount: 'Rp. ' + fmtNum(mut.nominal) }],
    totals,
    signLeftLabel: isSetor ? 'Penyetor,' : 'Pengambil,',
    signLeftName: '( .......... )',
    signRightLabel: 'Penerima,',
    signRightName: '( ' + (petugas && petugas !== '-' ? petugas : '') + ' )'
  }
}

// Slip PEMBAYARAN POS -> base64 ESC/P grafis
export function buildStrukSlipEscpBase64(trx = {}, settings = {}) {
  return renderEscp(posData(trx, settings), settings)
}
// Slip TABUNGAN / UANG SAKU -> base64 ESC/P grafis
export function buildSlipTabunganEscpBase64(mut = {}, settings = {}, opts = {}) {
  return renderEscp(tabData(mut, settings, opts), settings)
}
