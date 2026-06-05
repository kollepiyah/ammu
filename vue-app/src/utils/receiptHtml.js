// v.95.0626: HTML receipt (view-only) — meniru desain PDF (cetakStrukPdf) untuk
//   preview di dalam app (ReceiptModal). Bukan untuk cetak; tombol cetak tidak ada.
//   buildReceiptStrukHtml -> bukti pembayaran santri. buildSlipBisyarohHtml -> slip gaji guru.
import { terbilangRupiah } from './terbilang'

const BULAN_NM = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

function esc(t) {
  return String(t == null ? '' : t).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))
}
function fmtNum(n) {
  return new Intl.NumberFormat('id-ID').format(Math.round(Number(n) || 0))
}
function fmtRp(n) {
  return 'Rp ' + fmtNum(n)
}
function fmtTgl(t) {
  if (!t) return '-'
  const m = String(t).match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (m) return m[3] + '-' + m[2] + '-' + m[1]
  return String(t)
}
// "2026-06" | "2026_06" -> "Juni 2026"; biarkan apa adanya kalau sudah teks
function fmtPeriode(p) {
  const m = String(p || '').match(/^(\d{4})[-_](\d{1,2})$/)
  if (m) {
    const idx = parseInt(m[2], 10) - 1
    return (BULAN_NM[idx] || m[2]) + ' ' + m[1]
  }
  return String(p || '-')
}

function kopHtml(s = {}) {
  const logo = s.logoKop || s.kop_logo || s.kopLogo || s.logoUrl || ''
  const l1 = esc(s.kopLine1 || 'YAYASAN MAMBAUL ULUM')
  const l2 = esc(s.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM')
  const addr = [s.kopLine3, s.kopLine4, s.kopLine5].filter(Boolean).map((a) => esc(a))
  return (
    '<div style="text-align:center;border-bottom:2px solid #0f766e;padding-bottom:9px;margin-bottom:11px;">' +
    (logo ? '<img src="' + esc(logo) + '" alt="logo" style="height:46px;margin-bottom:5px;object-fit:contain;" />' : '') +
    '<div style="font-weight:800;font-size:16px;color:#0f766e;line-height:1.2;">' + l1 + '</div>' +
    '<div style="font-weight:700;font-size:13px;line-height:1.2;">' + l2 + '</div>' +
    addr.map((a) => '<div style="font-size:10.5px;color:#555;line-height:1.3;">' + a + '</div>').join('') +
    '</div>'
  )
}

function titleHtml(txt) {
  return (
    '<div style="text-align:center;margin:2px 0 12px;">' +
    '<span style="display:inline-block;border:1.5px solid #334155;border-radius:5px;padding:3px 18px;font-weight:800;letter-spacing:1px;font-size:12.5px;">' +
    esc(txt) + '</span></div>'
  )
}

function infoRow(label, val) {
  return (
    '<tr><td style="padding:1.5px 0;white-space:nowrap;vertical-align:top;color:#475569;">' + esc(label) + '</td>' +
    '<td style="padding:1.5px 0 1.5px 6px;vertical-align:top;">: ' + esc(val) + '</td></tr>'
  )
}

function wrap(inner) {
  return (
    '<div style="background:#fff;color:#1a1a1a;font-family:Arial,Helvetica,sans-serif;' +
    'max-width:480px;margin:0 auto;padding:18px 20px;font-size:12.5px;line-height:1.45;">' +
    inner + '</div>'
  )
}

// ── Bukti Pembayaran (santri) — layout meniru struk Yayasan (gambar) ────────
// v.95.0626: KOP rata-kiri + kotak dashed "BUKTI PEMBAYARAN" kanan-atas;
//   Status Siswa inline di baris Kelas; rincian = daftar bernomor + leader titik;
//   total band (Jumlah/Pembayaran/Kembali) di kanan sejajar ttd Penyetor/Penerima.
function fmtRpDot(n) {
  return 'Rp. ' + fmtNum(n)
}

// Header: KOP kiri (line1 besar, tanpa logo) + kotak dashed kanan-atas + garis bawah
function receiptHeaderHtml(s = {}, boxLabel = 'BUKTI PEMBAYARAN') {
  const l1 = esc(s.kopLine1 || 'YAYASAN MAMBAUL ULUM')
  const l2 = esc(s.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM')
  const addr = [s.kopLine3, s.kopLine4, s.kopLine5].filter(Boolean).map((a) => esc(a))
  return (
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;' +
    'border-bottom:1.5px solid #1a1a1a;padding-bottom:8px;margin-bottom:11px;">' +
      '<div style="min-width:0;">' +
        '<div style="font-weight:800;font-size:17px;letter-spacing:.3px;line-height:1.15;">' + l1 + '</div>' +
        '<div style="font-weight:700;font-size:12.5px;line-height:1.25;">' + l2 + '</div>' +
        addr.map((a) => '<div style="font-size:10px;color:#333;line-height:1.4;">' + a + '</div>').join('') +
      '</div>' +
      '<div style="flex:none;border:1.4px dashed #475569;border-radius:2px;padding:4px 11px;' +
      'font-weight:800;font-size:11px;letter-spacing:.5px;white-space:nowrap;">' + esc(boxLabel) + '</div>' +
    '</div>'
  )
}

// Baris info "Label : value" (colon sejajar via label cell nowrap)
function lineRow(label, val, valBold) {
  return (
    '<tr><td style="padding:1.5px 0;white-space:nowrap;vertical-align:top;color:#333;">' + esc(label) + '</td>' +
    '<td style="padding:1.5px 0 1.5px 6px;vertical-align:top;' + (valBold ? 'font-weight:700;' : '') + '">: ' + val + '</td></tr>'
  )
}

// Baris rincian bernomor dgn leader titik-titik
function itemLeaderRow(no, name, amount) {
  return (
    '<div style="display:flex;align-items:flex-end;gap:6px;margin:4px 0;font-size:12px;">' +
      '<span style="flex:none;width:16px;">' + no + '.</span>' +
      '<span style="flex:none;">' + esc(name) + '</span>' +
      '<span style="flex:1 1 auto;border-bottom:1px dotted #94a3b8;transform:translateY(-3px);min-width:18px;"></span>' +
      '<span style="flex:none;white-space:nowrap;">' + esc(amount) + '</span>' +
    '</div>'
  )
}

export function buildReceiptStrukHtml(trx = {}, s = {}) {
  const terb = trx.terbilang || terbilangRupiah(trx.total)
  const _ng = [trx.lembaga, trx.kelas].filter(Boolean).join(' ')
  const _sk = [trx.lembaga_sekolah, trx.kelas_sekolah].filter(Boolean).join(' ')
  const kelas = [_ng, _sk].filter(Boolean).join('/') || '-'
  const status = esc(trx.status_siswa || 'Aktif')
  const kelasVal =
    '<b>' + esc(kelas) + '</b>&nbsp;&nbsp;&nbsp;Status Siswa : ' + status
  const items = (trx.items || [])
    .map((it, i) =>
      itemLeaderRow(
        i + 1,
        String(it.jenis || '-') + (it.keterangan ? ' (' + it.keterangan + ')' : ''),
        fmtRpDot(it.nominal)
      )
    )
    .join('')
  const penyetor = String(trx.penyetor || '').trim()

  const inner =
    receiptHeaderHtml(s, 'BUKTI PEMBAYARAN') +
    '<table style="width:100%;font-size:12px;border-collapse:collapse;"><tr>' +
      '<td style="vertical-align:top;width:56%;"><table style="border-collapse:collapse;">' +
        lineRow('Diterima dari', esc(trx.santri_nama || '-')) +
        lineRow('NIS', esc(trx.santri_nis || '-')) +
        lineRow('Kelas', kelasVal) +
        lineRow('Terbilang', esc(terb)) +
      '</table></td>' +
      '<td style="vertical-align:top;"><table style="border-collapse:collapse;">' +
        lineRow('Tgl. Bayar', esc(fmtTgl(trx.tanggal))) +
        lineRow('No. Bukti', esc(trx.no_struk || '-')) +
        lineRow('Metode', esc(trx.metode || 'TUNAI')) +
      '</table></td>' +
    '</tr></table>' +
    '<div style="margin:11px 0 3px;">Dengan rincian pembayaran sebagai berikut :</div>' +
    (items || '<div style="text-align:center;color:#94a3b8;margin:6px 0;">—</div>') +
    '<div style="border-top:1px solid #1a1a1a;margin-top:8px;"></div>' +
    '<table style="width:100%;margin-top:12px;font-size:12px;border-collapse:collapse;"><tr>' +
      '<td style="width:30%;text-align:center;vertical-align:top;">Penyetor,<div style="height:46px;"></div>( ' + (penyetor ? esc(penyetor) : '..........') + ' )</td>' +
      '<td style="width:30%;text-align:center;vertical-align:top;">Penerima,<div style="height:46px;"></div>( ' + esc(trx.operator || '') + ' )</td>' +
      '<td style="width:40%;vertical-align:top;padding-left:6px;"><table style="width:100%;border-collapse:collapse;font-size:12.5px;">' +
        '<tr><td style="font-weight:800;padding:1.5px 0;white-space:nowrap;">Jumlah Rp.</td><td style="text-align:right;font-weight:800;white-space:nowrap;padding:1.5px 0;">' + fmtNum(trx.total) + '</td></tr>' +
        '<tr><td style="padding:1.5px 0;white-space:nowrap;">Pembayaran Rp.</td><td style="text-align:right;white-space:nowrap;padding:1.5px 0;">' + fmtNum(trx.bayar) + '</td></tr>' +
        '<tr><td style="padding:1.5px 0;white-space:nowrap;">Kembali Rp.</td><td style="text-align:right;white-space:nowrap;padding:1.5px 0;">' + fmtNum(trx.kembali) + '</td></tr>' +
      '</table></td>' +
    '</tr></table>'

  return wrap(inner)
}

// ── Slip Bisyaroh (guru) ──────────────────────────────────────────────────
export function buildSlipBisyarohHtml(slip = {}, s = {}) {
  const li = Array.isArray(slip.line_items) ? slip.line_items : []
  const bonus = slip.bonus_kehadiran || {}
  const bonusTotal = Number(bonus.total || 0)
  const pemasukan = Number(slip.total_pemasukan || 0) ||
    (Number(slip.bisyaroh_pokok || 0) + Number(slip.bisyaroh_sekolah || 0) + Number(slip.bisyaroh_tambahan || 0) + bonusTotal)
  const potongan = Number(slip.total_potongan || 0)
  const take = Number(slip.take_home || 0) || (pemasukan - potongan)

  const rows = []
  for (const it of li) {
    rows.push(
      '<tr>' +
      '<td style="border:1px solid #cbd5e1;padding:4px 6px;">' + esc(it.label || 'Bisyaroh') + (it.lembaga && it.lembaga !== '-' ? ' <span style="color:#64748b;">(' + esc(it.lembaga) + ')</span>' : '') + '</td>' +
      '<td style="border:1px solid #cbd5e1;padding:4px 6px;text-align:right;white-space:nowrap;">' + fmtRp(it.nominal) + '</td>' +
      '</tr>'
    )
  }
  if (bonusTotal > 0) {
    rows.push(
      '<tr><td style="border:1px solid #cbd5e1;padding:4px 6px;">Bonus Kehadiran</td>' +
      '<td style="border:1px solid #cbd5e1;padding:4px 6px;text-align:right;white-space:nowrap;">' + fmtRp(bonusTotal) + '</td></tr>'
    )
  }
  const body = rows.join('') || '<tr><td colspan="2" style="border:1px solid #cbd5e1;padding:6px;text-align:center;color:#94a3b8;">—</td></tr>'

  const inner =
    kopHtml(s) +
    titleHtml('SLIP BISYAROH') +
    '<table style="width:100%;font-size:12px;border-collapse:collapse;margin-bottom:4px;"><tr>' +
      '<td style="vertical-align:top;width:54%;"><table style="border-collapse:collapse;">' +
        infoRow('Nama', slip.guru_nama || '-') +
        infoRow('Lembaga', slip.lembaga || '-') +
        infoRow('Jabatan', slip.jabatan || 'Guru') +
      '</table></td>' +
      '<td style="vertical-align:top;"><table style="border-collapse:collapse;">' +
        infoRow('Periode', fmtPeriode(slip.periode)) +
        infoRow('No. Slip', slip.id || '-') +
      '</table></td>' +
    '</tr></table>' +
    '<div style="margin:10px 0 5px;">Rincian bisyaroh :</div>' +
    '<table style="width:100%;border-collapse:collapse;font-size:12px;">' +
      '<thead><tr style="background:#f0fdfa;">' +
        '<th style="border:1px solid #cbd5e1;padding:4px 6px;text-align:left;">Keterangan</th>' +
        '<th style="border:1px solid #cbd5e1;padding:4px 6px;width:110px;">Nominal</th>' +
      '</tr></thead><tbody>' + body + '</tbody>' +
    '</table>' +
    '<table style="width:100%;margin-top:10px;font-size:12.5px;"><tr><td style="width:45%;"></td><td><table style="width:100%;border-collapse:collapse;">' +
      '<tr><td style="text-align:right;padding:1.5px 0;">Total Pemasukan</td><td style="text-align:right;white-space:nowrap;padding:1.5px 0 1.5px 10px;">' + fmtRp(pemasukan) + '</td></tr>' +
      '<tr><td style="text-align:right;padding:1.5px 0;">Potongan</td><td style="text-align:right;white-space:nowrap;padding:1.5px 0 1.5px 10px;">' + (potongan > 0 ? '- ' : '') + fmtRp(potongan) + '</td></tr>' +
      '<tr><td style="text-align:right;font-weight:800;border-top:1.5px solid #334155;padding:3px 0 1.5px;">Take Home</td><td style="text-align:right;font-weight:800;white-space:nowrap;border-top:1.5px solid #334155;padding:3px 0 1.5px 10px;color:#0f766e;">' + fmtRp(take) + '</td></tr>' +
    '</table></td></tr></table>' +
    '<table style="width:100%;margin-top:14px;text-align:center;font-size:12px;"><tr>' +
      '<td style="width:50%;">Penerima,<div style="height:42px;"></div>( ' + esc(slip.guru_nama || '') + ' )</td>' +
      '<td style="width:50%;">Bendahara,<div style="height:42px;"></div>( .......................... )</td>' +
    '</tr></table>'

  return wrap(inner)
}
