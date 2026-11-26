// midtrans.js — v.1.4.9 gel. 2: pintu layar ke fungsi server `midtrans-charge`.
// Server Key Midtrans hanya ada di fungsi server; dari sini cuma meminta kode bayar.
// v.1.5.5: gerbang kedua DOKU (fungsi doku-charge) — dipilih lewat `gerbang` (utils/biayaMidtrans).
import { supabase } from '@/services/supabase'

const FUNGSI = { midtrans: 'midtrans-charge', doku: 'doku-charge' }

async function panggil(body, gerbang = 'midtrans') {
  if (!supabase) throw new Error('Supabase belum siap.')
  const { data, error } = await supabase.functions.invoke(FUNGSI[gerbang] || FUNGSI.midtrans, {
    body
  })
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

// Jawaban server dititip di memori sampai baris realtime keuangan_va_intent tiba di halaman
//   Kode Bayar — history.state tak bisa diandalkan di semua mode riwayat router.
const _titipan = new Map()
export function titipKode(kode) {
  if (kode?.id) _titipan.set(String(kode.id), kode)
}
export function ambilTitipan(id) {
  return _titipan.get(String(id)) || null
}

/** Buat kode bayar. items = [{tipe:'tagihan', tagihan_id, nominal} | {tipe:'uang_saku', nominal}]. */
export function buatKodeBayar({ santriId, kanal, items, gerbang = 'midtrans' }) {
  return panggil({ aksi: 'buat', santri_id: String(santriId), kanal, items }, gerbang)
}

/** Batalkan kode bayar yang belum dibayar (Midtrans: dibatalkan juga di sana; DOKU: di Ammu saja). */
export function batalKodeBayar(intentId, gerbang = 'midtrans') {
  return panggil({ aksi: 'batal', intent_id: String(intentId) }, gerbang)
}

// ── BSI (Snap): jendela Midtrans DI DALAM Ammu lewat snap.js — butuh Client Key (publik,
//   diisi di Pengaturan Keuangan). Tanpa Client Key / gagal dimuat → halaman Midtrans di browser.
let _muatSnap = null
function muatSnap(clientKey) {
  if (typeof window !== 'undefined' && window.snap) return Promise.resolve(window.snap)
  if (!_muatSnap) {
    _muatSnap = new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = /^SB-/i.test(clientKey)
        ? 'https://app.sandbox.midtrans.com/snap/snap.js'
        : 'https://app.midtrans.com/snap/snap.js'
      s.setAttribute('data-client-key', clientKey)
      s.onload = () => (window.snap ? resolve(window.snap) : reject(new Error('snap.js kosong')))
      s.onerror = () => {
        _muatSnap = null
        reject(new Error('snap.js gagal dimuat'))
      }
      document.head.appendChild(s)
    })
  }
  return _muatSnap
}

/** Bayar lewat Snap: jendela di dalam Ammu bila bisa, selain itu browser. Return 'jendela' | 'browser' | ''. */
export async function bayarLewatSnap({ token, redirectUrl, clientKey }) {
  if (token && clientKey) {
    try {
      const snap = await muatSnap(String(clientKey))
      // Callback cukup kosong: status dicatat lewat webhook → realtime keuangan_va_intent.
      snap.pay(token, { onSuccess() {}, onPending() {}, onError() {}, onClose() {} })
      return 'jendela'
    } catch {
      /* jatuh ke browser */
    }
  }
  return bukaHalamanBayar(redirectUrl) ? 'browser' : ''
}

/** Buka halaman bayar Midtrans / DOKU. Capacitor & Electron meneruskannya ke browser sistem.
 *  Hanya domain penyedia — tautan lain dari data tak pernah dibuka. */
export function bukaHalamanBayar(url) {
  const u = String(url || '')
  const sah =
    /^https:\/\/app(\.sandbox)?\.midtrans\.com\//.test(u) ||
    /^https:\/\/([a-z0-9-]+\.)*doku\.com\//.test(u)
  if (!sah) return false
  try {
    window.open(url, '_blank')
  } catch {
    window.location.href = url
  }
  return true
}
