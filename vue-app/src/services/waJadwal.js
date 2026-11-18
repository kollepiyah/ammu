// waJadwal.js — pemicu pengingat WA jadwal piket Pondok Laju (Kyai 19 Nov 2026).
// Isi & pengiriman ada di edge function kirim-wa-jadwal; di sini cuma memanggilnya sampai
// habis (fungsi melayani maks 25 guru per panggilan) dan merangkum hasilnya untuk toast.
import { supabase } from './supabase'

const MAKS_PANGGILAN = 6 // 6 × 25 guru — jauh di atas jumlah guru pondok

const _invokeAsli = (body) => supabase.functions.invoke('kirim-wa-jadwal', { body })

/**
 * @param {string[]} ids  id sel jadwal yang baru diisi/diganti gurunya.
 * @returns {Promise<{aktif:boolean, terkirim:number, tanpaNomor:string[], gagal:{nama,alasan}[], galat:string}>}
 */
export async function kirimPengingatJadwal(ids, { invoke = _invokeAsli } = {}) {
  const hasil = { aktif: true, terkirim: 0, tanpaNomor: [], gagal: [], galat: '' }
  const unik = [...new Set((ids || []).map(String).filter(Boolean))]
  if (!unik.length) return hasil
  const lewatiGuru = []
  for (let i = 0; i < MAKS_PANGGILAN; i++) {
    const { data, error } = await invoke({ ids: unik, lewatiGuru })
    if (error || !data) {
      hasil.galat = String(error?.message || error || 'tak ada jawaban')
      break
    }
    if (data.error === 'belum-dikonfigurasi') {
      hasil.aktif = false
      break
    }
    if (!data.ok) {
      hasil.galat = String(data.error || 'gagal')
      break
    }
    hasil.terkirim += Number(data.terkirim) || 0
    hasil.tanpaNomor.push(...(data.tanpaNomor || []))
    hasil.gagal.push(...(data.gagal || []))
    lewatiGuru.push(...(data.diproses || []))
    if (!data.sisa || data.berhenti || !(data.diproses || []).length) break
  }
  return hasil
}

/** Kalimat toast dari hasil kirimPengingatJadwal — `null` bila tak ada yang perlu dikatakan. */
export function ringkasPengingat(h) {
  if (!h) return null
  if (!h.aktif)
    return { jenis: 'info', teks: 'Pengingat WA belum aktif (token Fonnte belum dipasang).' }
  if (h.galat) return { jenis: 'warning', teks: 'Pengingat WA gagal dikirim: ' + h.galat }
  const bagian = []
  if (h.terkirim) bagian.push(`Pengingat WA terkirim ke ${h.terkirim} guru`)
  if (h.tanpaNomor.length) bagian.push(`tanpa nomor WA: ${h.tanpaNomor.join(', ')}`)
  if (h.gagal.length)
    bagian.push(`gagal: ${h.gagal.map((g) => `${g.nama} (${g.alasan})`).join(', ')}`)
  if (!bagian.length) return null // semua penugasan sudah pernah diberitahukan
  return {
    jenis: h.gagal.length || h.tanpaNomor.length ? 'warning' : 'success',
    teks: bagian.join(' · ') + '.'
  }
}
