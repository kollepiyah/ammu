// metodeBayarWali.js — v.1.4.9: satu sumber "cara bayar apa yang ditawarkan ke wali santri".
//
// Kyai, 4 Nov 2026: transfer manual (upload bukti) DIHAPUS; VA BMT PETA disembunyikan
// selama `bmt_aktif` mati; pembayaran online akan lewat Midtrans (VA tetap per santri +
// QRIS dinamis). Sampai Midtrans tersambung, keduanya tampil "Segera hadir".
// Dipakai PembayaranView (daftar metode) dan TagihanView (tombol Setoran Lain).
import { isBmtAktif } from './bmtVa'

export function metodeBayarWali(settings) {
  const s = settings || {}
  const out = []
  if (isBmtAktif(s)) {
    out.push({
      id: 'va',
      label: 'Virtual Account',
      icon: 'fa-credit-card',
      desc: 'Bayar via VA ' + (s.bmt_nama || 'BMT PETA'),
      active: true
    })
  }
  out.push(
    {
      id: 'midtrans_va',
      label: 'Virtual Account Bank',
      icon: 'fa-building-columns',
      desc: 'Nomor VA tetap per santri, nominal muncul otomatis',
      active: false
    },
    {
      id: 'qris',
      label: 'QRIS',
      icon: 'fa-qrcode',
      desc: 'Scan dari aplikasi bank / e-wallet mana pun',
      active: false
    }
  )
  return out
}

/** Ada setidaknya satu cara bayar online yang benar-benar bisa dipakai wali. */
export function adaMetodeBayarAktif(settings) {
  return metodeBayarWali(settings).some((m) => m.active)
}
