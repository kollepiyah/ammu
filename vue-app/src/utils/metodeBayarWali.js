// metodeBayarWali.js — v.1.4.9: satu sumber "cara bayar apa yang ditawarkan ke wali santri".
//
// Kyai, 4 Nov 2026: transfer manual (upload bukti) DIHAPUS; VA BMT PETA disembunyikan
// selama `bmt_aktif` mati; pembayaran online lewat Midtrans (VA bank + QRIS), aktif bila
// `midtrans_aktif` dan kanalnya dibuka di Pengaturan Keuangan — sebelum itu "Segera hadir".
// Dipakai PembayaranView (daftar metode) dan TagihanView (tombol Setoran Lain).
import { isBmtAktif } from './bmtVa'
import { midtransAktif, kanalAktif } from './biayaMidtrans'

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
  const online = midtransAktif(s)
  const kanal = online ? kanalAktif(s) : []
  const bank = kanal.filter((k) => k.jenis === 'va')
  out.push(
    {
      id: 'midtrans_va',
      label: 'Virtual Account Bank',
      icon: 'fa-building-columns',
      // v.1.4.9: cukup daftar banknya (Kyai: "— nominal muncul otomatis" dihapus).
      desc: bank.length ? bank.map((k) => k.label).join(' · ') : 'Segera hadir',
      active: bank.length > 0
    },
    {
      id: 'qris',
      label: 'QRIS',
      icon: 'fa-qrcode',
      desc: 'Scan dari aplikasi bank / e-wallet mana pun',
      active: kanal.some((k) => k.jenis === 'qris')
    }
  )
  return out
}

/** Ada setidaknya satu cara bayar online yang benar-benar bisa dipakai wali. */
export function adaMetodeBayarAktif(settings) {
  return metodeBayarWali(settings).some((m) => m.active)
}
