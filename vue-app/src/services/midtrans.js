// midtrans.js — v.1.4.9 gel. 2: pintu layar ke fungsi server `midtrans-charge`.
// Server Key Midtrans hanya ada di fungsi server; dari sini cuma meminta kode bayar.
import { supabase } from '@/services/supabase'

async function panggil(body) {
  if (!supabase) throw new Error('Supabase belum siap.')
  const { data, error } = await supabase.functions.invoke('midtrans-charge', { body })
  if (error) {
    // Non-2xx: pesan yang bisa dibaca wali ada di badan respons.
    let msg = error.message || 'Gagal menghubungi server pembayaran.'
    try {
      const j = await error.context?.json?.()
      if (j?.error) msg = j.error
    } catch {
      /* biarkan pesan bawaan */
    }
    throw new Error(msg)
  }
  if (!data?.ok) throw new Error(data?.error || 'Server pembayaran menolak permintaan.')
  return data
}

/** Buat kode bayar. items = [{tipe:'tagihan', tagihan_id, nominal} | {tipe:'uang_saku', nominal}]. */
export function buatKodeBayar({ santriId, kanal, items }) {
  return panggil({ aksi: 'buat', santri_id: String(santriId), kanal, items })
}

/** Batalkan kode bayar yang belum dibayar (juga dibatalkan di Midtrans). */
export function batalKodeBayar(intentId) {
  return panggil({ aksi: 'batal', intent_id: String(intentId) })
}

/** Buka halaman bayar Midtrans. Capacitor & Electron meneruskannya ke browser sistem. */
export function bukaHalamanBayar(url) {
  if (!/^https:\/\/app(\.sandbox)?\.midtrans\.com\//.test(String(url || ''))) return false
  try {
    window.open(url, '_blank')
  } catch {
    window.location.href = url
  }
  return true
}
