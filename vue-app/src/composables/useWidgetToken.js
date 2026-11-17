// Token widget per perangkat (Kyai, 17 Nov 2026) — supaya widget Android bisa MENARIK
// SENDIRI daftar tugas secara berkala, bukan hanya segar saat aplikasi dibuka.
//
// Yang disimpan di perangkat SENGAJA bukan sesi Supabase: itu kunci seluruh akun. Yang
// dipakai cuma satu string acak yang hanya bisa ditukar dengan daftar tugas SATU guru lewat
// edge function `widget-tugas` — tak bisa membaca apa pun yang lain, tak bisa menulis, dan
// bisa dicabut Kyai kapan saja (tabel widget_token).
//
// Hanya berjalan di Android native. Di web/Electron seluruh berkas ini tak melakukan apa-apa.
import { supabase } from '@/services/supabase'
import { isNativeAndroid, pushWidgetData } from '@/composables/useWidgetSync'

const KUNCI_LOKAL = 'ammu_widget_token'

/** 32 byte acak sebagai hex — dibuat di perangkat, tak pernah ditebak server. */
function tokenBaru() {
  const b = new Uint8Array(32)
  crypto.getRandomValues(b)
  return Array.from(b)
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')
}

function tokenTersimpan() {
  try {
    return localStorage.getItem(KUNCI_LOKAL) || ''
  } catch (e) {
    return ''
  }
}

/**
 * Pastikan perangkat ini punya token, lalu kirimkan ke widget bersama alamat fungsinya.
 *
 * Idempoten: token yang sama diterbitkan ulang tiap kali beranda dibuka — RPC-nya memakai
 * ON CONFLICT, jadi tak melahirkan baris baru. Itu disengaja supaya token yang terlanjur
 * terhapus di server (mis. Kyai mencabut semuanya) lahir lagi dengan sendirinya.
 *
 * Gagal di mana pun TIDAK dianggap gawat: widget tetap jalan dengan data yang didorong
 * aplikasi seperti sebelumnya, cuma tak bisa menarik sendiri.
 */
export async function pastikanTokenWidget() {
  if (!isNativeAndroid() || !supabase) return ''
  try {
    let token = tokenTersimpan()
    if (!token) token = tokenBaru()
    const { error } = await supabase.rpc('terbitkan_widget_token', {
      p_token: token,
      p_perangkat: 'Android'
    })
    if (error) return ''
    try {
      localStorage.setItem(KUNCI_LOKAL, token)
    } catch (e) {
      /* penyimpanan penuh/diblokir → token tetap dipakai sesi ini */
    }
    // Alamat fungsinya ikut dikirim supaya sisi Java tak perlu menyimpan URL proyek sendiri.
    pushWidgetData({
      tugasToken: token,
      tugasUrl: `${import.meta.env.VITE_SUPABASE_URL || ''}/functions/v1/widget-tugas`
    })
    return token
  } catch (e) {
    return ''
  }
}

/** Dipanggil saat logout: cabut token perangkat ini supaya widget berhenti menarik data. */
export async function cabutTokenWidget() {
  const token = tokenTersimpan()
  try {
    localStorage.removeItem(KUNCI_LOKAL)
  } catch (e) {
    /* abaikan */
  }
  // Kosongkan dulu di perangkat — kalau RPC-nya gagal, widget sudah berhenti menarik.
  try {
    pushWidgetData({ tugasToken: '', tugas: '[]' })
  } catch (e) {
    /* abaikan */
  }
  if (!token || !supabase) return
  try {
    await supabase.rpc('cabut_widget_token', { p_token: token })
  } catch (e) {
    /* abaikan — tokennya sudah tak dipakai perangkat ini */
  }
}
