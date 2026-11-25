// Notifikasi waktu sholat / adzan (Kyai 25 Nov 2026, Android) — rencana jadwal, fungsi murni + tes.
// Penjadwalan nyata lewat @capacitor/local-notifications (composables/useSinkronIbadah).
import { NAMA_WAKTU, formatMenit } from '@/utils/waktuSholat'

export const WAKTU_ADZAN = Object.freeze(['imsak', 'subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'])
export const PILIHAN_SEBELUM = Object.freeze([0, 5, 10, 15])

export const SETELAN_ADZAN_BAWAAN = Object.freeze({
  aktif: { imsak: false, subuh: true, dzuhur: true, ashar: true, maghrib: true, isya: true },
  sebelum: 0
})

/** Gabung setelan tersimpan dengan bawaan (kunci asing dibuang, nilai salah dirapikan). */
export function rapikanSetelanAdzan(s) {
  const aktif = {}
  for (const k of WAKTU_ADZAN) {
    const v = s?.aktif?.[k]
    aktif[k] = typeof v === 'boolean' ? v : SETELAN_ADZAN_BAWAAN.aktif[k]
  }
  const sebelum = PILIHAN_SEBELUM.includes(Number(s?.sebelum)) ? Number(s.sebelum) : 0
  return { aktif, sebelum }
}

/** Id notifikasi stabil (int32): hari sejak 1970 × 10 + urutan waktu. */
export function idAdzan(tanggal, kunci) {
  const [y, m, d] = String(tanggal).split('-').map(Number)
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000) * 10 + WAKTU_ADZAN.indexOf(kunci)
}

/**
 * @param {{hari:{tanggal:string, menit:object}[], setelan:object, sekarangMs:number, tempat?:string}} o
 * @returns {{id:number, at:number, judul:string, isi:string}[]} hanya yang masih di depan, urut waktu.
 */
export function rencanaAdzan({ hari, setelan, sekarangMs, tempat = '' }) {
  const s = rapikanSetelanAdzan(setelan)
  const out = []
  for (const h of hari || []) {
    const [y, m, d] = String(h.tanggal).split('-').map(Number)
    const tengahMalam = new Date(y, m - 1, d, 0, 0, 0, 0).getTime()
    for (const k of WAKTU_ADZAN) {
      if (!s.aktif[k] || !Number.isFinite(h.menit?.[k])) continue
      const at = tengahMalam + (h.menit[k] - s.sebelum) * 60000
      if (at <= sekarangMs + 30000) continue
      const nama = NAMA_WAKTU[k]
      out.push({
        id: idAdzan(h.tanggal, k),
        at,
        judul: s.sebelum ? `${s.sebelum} menit lagi waktu ${nama}` : `Waktu ${nama} telah tiba`,
        isi: `${nama} ${formatMenit(h.menit[k])}${tempat ? ` · ${tempat}` : ''}`
      })
    }
  }
  return out.sort((a, b) => a.at - b.at)
}
