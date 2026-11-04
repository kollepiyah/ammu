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
