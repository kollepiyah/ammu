// v.21.90.0527: Terbilang — bilangan ke kata Indonesia (untuk struk pembayaran dll).
// Mendukung sampai miliar. Case-Title default. Aturan: "Sepuluh", "Sebelas", "Belas",
// "Seratus", "Seribu", "Juta", "Miliar".

const SATUAN = [
  '',
  'Satu',
  'Dua',
  'Tiga',
  'Empat',
  'Lima',
  'Enam',
  'Tujuh',
  'Delapan',
  'Sembilan'
]

function _ter(n) {
  n = Math.floor(Math.abs(Number(n) || 0))
  if (n === 0) return ''
  if (n < 10) return SATUAN[n]
  if (n < 20) {
    if (n === 10) return 'Sepuluh'
    if (n === 11) return 'Sebelas'
    return SATUAN[n - 10] + ' Belas'
  }
  if (n < 100) {
    const t = Math.floor(n / 10)
    const s = n % 10
    return SATUAN[t] + ' Puluh' + (s ? ' ' + SATUAN[s] : '')
  }
  if (n < 200) {
    return 'Seratus' + (n % 100 ? ' ' + _ter(n % 100) : '')
  }
  if (n < 1000) {
    const r = Math.floor(n / 100)
    return SATUAN[r] + ' Ratus' + (n % 100 ? ' ' + _ter(n % 100) : '')
  }
  if (n < 2000) {
    return 'Seribu' + (n % 1000 ? ' ' + _ter(n % 1000) : '')
  }
  if (n < 1e6) {
    const r = Math.floor(n / 1000)
    return _ter(r) + ' Ribu' + (n % 1000 ? ' ' + _ter(n % 1000) : '')
  }
  if (n < 1e9) {
    const r = Math.floor(n / 1e6)
    return _ter(r) + ' Juta' + (n % 1e6 ? ' ' + _ter(n % 1e6) : '')
  }
  const r = Math.floor(n / 1e9)
  return _ter(r) + ' Miliar' + (n % 1e9 ? ' ' + _ter(n % 1e9) : '')
}

export function terbilang(n) {
  const v = _ter(n)
  return v || 'Nol'
}

export function terbilangRupiah(n) {
  return terbilang(n) + ' Rupiah'
}
