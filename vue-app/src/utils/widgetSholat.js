// Muatan widget Android "Jadwal Sholat" (Kyai 25 Nov 2026, menggantikan widget Kalender).
// Fungsi murni + tes. Jadwal 7 hari dihitung di sini lalu dikirim sekali; widget native cukup
// memilih hari ini & waktu berikutnya — tetap benar walau aplikasi tak dibuka berhari-hari.
import { hitungWaktuSholat, WAKTU_WAJIB, namaTempatPendek } from '@/utils/waktuSholat'
import { formatHijriLatin } from '@/utils/hijri'
import { susunAgenda } from '@/utils/agenda'

export const HARI_WIDGET = 7
const HARI = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu']
const BLN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const p2 = (n) => String(n).padStart(2, '0')
const iso = (d) => `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`

/** Jadwal N hari mulai `mulai` (Date lokal) — dipakai widget & penjadwal adzan. */
export function jadwalBeberapaHari({ lokasi, metode, mulai, hari = HARI_WIDGET }) {
  const out = []
  for (let i = 0; i < hari; i++) {
    const d = new Date(mulai.getFullYear(), mulai.getMonth(), mulai.getDate() + i, 12)
    const tanggal = iso(d)
    out.push({
      tanggal,
      tgl: d,
      ...hitungWaktuSholat({
        tanggal,
        lat: lokasi.lat,
        lon: lokasi.lon,
        tz: -d.getTimezoneOffset() / 60,
        metode
      })
    })
  }
  return out
}

/**
 * @param {{lokasi:object, metode:string, mulai:Date, kalibrasi?:number, agenda?:object[]}} o
 *   agenda = baris kegiatan publik (sudah tersaring); diambil 2 terdekat yang belum lewat.
 * @returns {object} bentuk yang dibaca JadwalSholatWidget.java (key `sholat` di SharedPreferences).
 */
export function muatanWidgetSholat({ lokasi, metode, mulai, kalibrasi = 0, agenda = [] }) {
  const hari = jadwalBeberapaHari({ lokasi, metode, mulai }).map((h) => ({
    t: h.tanggal,
    label: `${HARI[h.tgl.getDay()]}, ${h.tgl.getDate()} ${BLN[h.tgl.getMonth()]}`,
    hijri: formatHijriLatin(h.tgl, kalibrasi),
    w: WAKTU_WAJIB.map((k) => h.menit[k])
  }))
  const terdekat = susunAgenda(agenda, { saring: 'akan', hariIni: iso(mulai) })
    .flatMap((g) => g.item)
    .slice(0, 2)
    .map((a) => ({
      tgl: `${a.hari} ${a.bulanPendek.charAt(0)}${a.bulanPendek.slice(1).toLowerCase()}`,
      judul: a.judul,
      libur: a.jenis === 'libur'
    }))
  return {
    v: 1,
    tempat: namaTempatPendek(lokasi),
    nama: ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'],
    hari,
    agenda: terdekat
  }
}
