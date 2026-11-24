// waJadwalLaju.js — isi pesan WA jadwal piket Pondok Laju, dikirim lewat tautan wa.me.
//
// Kyai 24 Nov 2026: nomor pengirim Fonnte keblokir → pengiriman otomatis (edge function
// kirim-wa-jadwal) dicabut. Kini penyusun jadwal menekan tombol WA per guru dan pesan
// terkirim dari WhatsApp-nya sendiri. Aturan isi pesan pindah ke sini (pure + diuji).
import { labelSesi } from './pondokLajuSesi'

export const SALAM = "Assalamu'alaikum Wr. Wb."
const URUT_SESI = { tadarus: 0, laju1: 1, laju2: 2 }

/** 'YYYY-MM-DD' → 'Senin, 24 Nov 2026' (tanggal kalender apa adanya, tanpa geser zona). */
export function fmtTanggal(iso) {
  const p = String(iso || '')
    .split('-')
    .map(Number)
  if (p.length !== 3 || p.some((n) => !Number.isFinite(n))) return String(iso || '')
  const d = new Date(Date.UTC(p[0], p[1] - 1, p[2]))
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  })
    .format(d)
    .replace(/\./g, '')
}

/**
 * Piket yang perlu dikabarkan, dikelompokkan per guru: ber-guru dan tanggalnya belum lewat.
 * Baris boleh mentah (`data` jsonb) atau rata.
 * @returns {Map<string, Array<{id, tanggal, sesi, kelas}>>}
 */
export function piketPerGuru(rows, { hariIni }) {
  const per = new Map()
  for (const r of rows || []) {
    const d = r?.data || r || {}
    const guruId = String(r?.guru_id ?? '').trim()
    const tanggal = String(r?.tanggal || '')
    if (!guruId || tanggal.length !== 10 || tanggal < hariIni) continue
    if (!per.has(guruId)) per.set(guruId, [])
    per.get(guruId).push({
      id: String(r?.id ?? ''),
      tanggal,
      sesi: String(r?.sesi || ''),
      kelas: String(r?.kelas_guru || d.kelas_guru || r?.kelas_key || d.kelas_key || '')
    })
  }
  for (const daftar of per.values())
    daftar.sort(
      (a, b) =>
        a.tanggal.localeCompare(b.tanggal) || (URUT_SESI[a.sesi] ?? 9) - (URUT_SESI[b.sesi] ?? 9)
    )
  return per
}

/** Isi pesan untuk SATU guru. `baris` sudah urut (piketPerGuru). */
export function susunPesanJadwal({ nama, baris, pondok }) {
  const daftar = (baris || [])
    .map((b) => {
      const kelas = b.kelas ? ` · Kelas ${b.kelas}` : ''
      return `• ${fmtTanggal(b.tanggal)} — *${labelSesi(b.sesi)}*${kelas}`
    })
    .join('\n')
  return (
    `${SALAM}\n` +
    `Ustadz/Ustadzah *${nama || ''}*, berikut jadwal piket *Pondok Laju* Anda:\n\n` +
    `${daftar}\n\n` +
    `Mohon hadir tepat waktu dan mengisi jurnal di Ammu Online (menu Pondok Laju). ` +
    `Terima kasih, semoga sehat selalu.` +
    (pondok ? `\n\n— ${pondok}` : '')
  )
}
