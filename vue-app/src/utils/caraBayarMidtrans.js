// caraBayarMidtrans.js — v.1.4.9 gel. 2: langkah bayar yang ditampilkan di layar Kode Bayar Ammu
// (Kyai: "tetap di Ammu, seperti Shopee/Tokopedia"). Menu tiap aplikasi bisa sedikit berbeda,
// jadi langkahnya umum; angka penting (nomor VA, kode perusahaan, nominal) diambil dari kode bayar.

const DARI_BANK_LAIN = {
  judul: 'Dari bank lain',
  langkah: [
    'Pilih transfer antarbank / transfer online.',
    'Pilih bank tujuan sesuai kode bayar ini, lalu masukkan nomor Virtual Account sebagai nomor rekening.',
    'Transfer TEPAT sejumlah total yang tertera (biaya transfer antarbank ditanggung pengirim).'
  ]
}

const LANGKAH = {
  bri: [
    {
      judul: 'BRImo',
      langkah: [
        'Buka BRImo, pilih Pembayaran → BRIVA.',
        'Masukkan nomor Virtual Account.',
        'Periksa nama dan nominal, lalu bayar dengan PIN.'
      ]
    },
    {
      judul: 'ATM BRI',
      langkah: [
        'Pilih Transaksi Lain → Pembayaran → Lainnya → BRIVA.',
        'Masukkan nomor Virtual Account, periksa nominal, lalu konfirmasi.'
      ]
    },
    DARI_BANK_LAIN
  ],
  bni: [
    {
      judul: 'BNI Mobile Banking (wondr)',
      langkah: [
        'Pilih Transfer → Virtual Account Billing.',
        'Masukkan nomor Virtual Account.',
        'Periksa nama dan nominal, lalu bayar.'
      ]
    },
    {
      judul: 'ATM BNI',
      langkah: [
        'Pilih Menu Lain → Transfer → Virtual Account Billing.',
        'Masukkan nomor Virtual Account, periksa nominal, lalu konfirmasi.'
      ]
    },
    DARI_BANK_LAIN
  ],
  bca: [
    {
      judul: 'BCA mobile / myBCA',
      langkah: [
        'Pilih m-Transfer (BCA mobile) atau Transfer (myBCA) → BCA Virtual Account.',
        'Masukkan nomor Virtual Account.',
        'Periksa nama dan nominal, lalu bayar.'
      ]
    },
    {
      judul: 'ATM BCA',
      langkah: [
        'Pilih Transaksi Lainnya → Transfer → ke Rek BCA Virtual Account.',
        'Masukkan nomor Virtual Account, periksa nominal, lalu konfirmasi.'
      ]
    },
    DARI_BANK_LAIN
  ],
  mandiri: [
    {
      judul: "Livin' by Mandiri",
      langkah: [
        'Pilih Bayar → E-Commerce / Multipayment.',
        'Masukkan Kode Perusahaan yang tertera (nama penyedia yang muncul: Midtrans).',
        'Masukkan Kode Bayar, periksa nominal, lalu bayar.'
      ]
    },
    {
      judul: 'ATM Mandiri',
      langkah: [
        'Pilih Bayar/Beli → Lainnya → Multi Payment.',
        'Masukkan Kode Perusahaan, lalu Kode Bayar.',
        'Periksa nominal, lalu konfirmasi.'
      ]
    }
  ],
  qris: [
    {
      judul: 'Aplikasi bank / e-wallet',
      langkah: [
        'Buka aplikasi yang mendukung QRIS (m-banking, GoPay, OVO, DANA, ShopeePay, dll.).',
        'Pilih Bayar / Scan QR, lalu arahkan ke kode QR. Bila membayar dari HP yang sama, simpan gambar QR lalu unggah dari galeri.',
        'Periksa nominal, lalu bayar.'
      ]
    }
  ]
}

/** Label kanal untuk wali — kode bayar lama tersimpan berakhiran "(Midtrans)". */
export function labelKanal(i) {
  return String(i?.kanal_label || 'VA BMT')
    .replace(/\s*\(Midtrans\)\s*$/i, '')
    .trim()
}

/** Daftar cara bayar untuk kanal online ('bri' | 'bni' | 'bca' | 'mandiri' | 'qris'). */
export function caraBayar(kanalId) {
  return LANGKAH[String(kanalId || '')] || []
}

/**
 * Sisa waktu sampai `expiryAt` (ISO) → { habis, teks } — mis. "23:59:12" atau "3 hari 02:00:00".
 */
export function sisaWaktu(expiryAt, nowMs = Date.now()) {
  const t = Date.parse(String(expiryAt || ''))
  if (!Number.isFinite(t)) return { habis: false, teks: '' }
  let d = Math.floor((t - nowMs) / 1000)
  if (d <= 0) return { habis: true, teks: '00:00:00' }
  const hari = Math.floor(d / 86400)
  d %= 86400
  const pad = (n) => String(n).padStart(2, '0')
  const jam = `${pad(Math.floor(d / 3600))}:${pad(Math.floor((d % 3600) / 60))}:${pad(d % 60)}`
  return { habis: false, teks: hari ? `${hari} hari ${jam}` : jam }
}

/**
 * Batas waktu kode bayar online (ms) — `expiry_at` dari Core API; kode Snap (BSI) & kode lama
 * tak menyimpannya, jadi diturunkan dari `created_at` dengan masa berlaku yang sama dengan
 * server (_shared/midtrans.ts: VA sehari, QR sejam). NaN bila tak bisa ditentukan.
 */
export function batasKode(i) {
  const t = Date.parse(String(i?.expiry_at || ''))
  if (Number.isFinite(t)) return t
  if (i?.sumber !== 'midtrans') return NaN
  const dibuat = Date.parse(String(i?.created_at || ''))
  if (!Number.isFinite(dibuat)) return NaN
  const qris = i?.jenis === 'qris' || i?.kanal === 'qris'
  return dibuat + (qris ? 60 : 24 * 60) * 60_000
}

/**
 * Status kode bayar seperti yang dilihat wali: kode online yang masih `pending` tetapi sudah lewat
 * batas waktunya = 'kadaluarsa'. (9 Nov 2026: sesudah pindah ke kunci production, kode sandbox
 * lama tak pernah menerima notifikasi kedaluwarsa — dulu tampil "Menunggu Bayar" selamanya.)
 */
export function statusKode(i, nowMs = Date.now()) {
  const s = String(i?.status || 'pending')
  if (s !== 'pending') return s
  const t = batasKode(i)
  return Number.isFinite(t) && t <= nowMs ? 'kadaluarsa' : 'pending'
}

/** Kode dibuat dengan kunci uji (sandbox) — tak bisa dibayar dengan uang sungguhan. */
export function kodeUji(i) {
  // Hanya kode online yang menyimpan `sandbox` (midtrans-charge); VA BMT tak pernah punya.
  return i?.sandbox === true || i?.sandbox === 'true'
}

/**
 * Server Key Midtrans (`Mid-server-…` / `SB-Mid-server-…`) RAHASIA — hanya boleh di secret fungsi
 * server. 9 Nov 2026: Server Key production sempat tertempel di kolom Client Key Pengaturan
 * Keuangan, yang tersimpan di settings general/web (terbaca tanpa login). Pagar untuk itu.
 */
export function kunciServerMidtrans(v) {
  return /^\s*(SB-)?Mid-server-/i.test(String(v || ''))
}
