// kirim-wa-jadwal/pesan.ts — aturan PURE pengingat WA jadwal piket Pondok Laju (Kyai 19 Nov 2026).
//
// Satu-satunya tempat menyusun isi pesan & memilih baris yang dikirim; index.ts hanya menarik
// data dan memanggil Fonnte. Diuji vitest (tests/unit/kirimWaJadwal.test.js) — label sesi
// dikunci sama dengan app (utils/pondokLajuSesi.labelSesi).

type Baris = Record<string, any>

export const SALAM = "Assalamu'alaikum Wr. Wb."

// Cermin utils/pondokLajuSesi.SESI_LAJU (tes menjaga keduanya sama).
const SESI = { tadarus: 'Tadarus Pagi', laju1: 'Laju 1', laju2: 'Laju 2' } as Record<string, string>
export function labelSesi(key: string): string {
  return SESI[String(key)] || String(key || '')
}
const URUT_SESI: Record<string, number> = { tadarus: 0, laju1: 1, laju2: 2 }

/** Nomor WA → '62…' atau '' bila tak terbaca. Menerima 08…, 8…, 62…, +62…, berspasi/strip. */
export function nomorWa(raw: unknown): string {
  let d = String(raw ?? '').replace(/\D/g, '')
  if (d.startsWith('0')) d = '62' + d.slice(1)
  else if (d.startsWith('8')) d = '62' + d
  if (!d.startsWith('62')) return ''
  return d.length >= 10 && d.length <= 15 ? d : ''
}

/** Kunci log: satu penugasan (sel jadwal × guru) hanya diberitahukan sekali. */
export function kunciLog(jadwalId: string, guruId: string): string {
  return `laju|${jadwalId}|${guruId}`
}

/** 'YYYY-MM-DD' → 'Senin, 24 Nov 2026' (tanpa zona: tanggal kalender apa adanya). */
export function fmtTanggal(iso: string): string {
  const p = String(iso || '').split('-').map(Number)
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
 * Baris jadwal yang layak diberitahukan, dikelompokkan per guru.
 * - hanya yang ber-guru dan tanggalnya belum lewat (hariIni WIB dari pemanggil);
 * - yang sudah TERKIRIM (ada di `sudahTerkirim`) dilewati — simpan ulang tak membuat dobel.
 * Baris boleh mentah (`data` jsonb) atau rata.
 */
export function pilihUntukDikirim(
  rows: Baris[],
  { hariIni, sudahTerkirim = new Set<string>() }: { hariIni: string; sudahTerkirim?: Set<string> }
): Map<string, Baris[]> {
  const per = new Map<string, Baris[]>()
  for (const r of rows || []) {
    const d = r?.data || r || {}
    const guruId = String(r?.guru_id ?? '').trim()
    const tanggal = String(r?.tanggal || '')
    if (!guruId || tanggal.length !== 10 || tanggal < hariIni) continue
    if (sudahTerkirim.has(kunciLog(String(r?.id ?? ''), guruId))) continue
    const isi = {
      id: String(r?.id ?? ''),
      tanggal,
      sesi: String(r?.sesi || ''),
      kelas: String(d.kelas_guru || d.kelas_key || '')
    }
    if (!per.has(guruId)) per.set(guruId, [])
    per.get(guruId)!.push(isi)
  }
  for (const daftar of per.values()) {
    daftar.sort(
      (a, b) =>
        a.tanggal.localeCompare(b.tanggal) || (URUT_SESI[a.sesi] ?? 9) - (URUT_SESI[b.sesi] ?? 9)
    )
  }
  return per
}

/** Isi pesan untuk SATU guru. `baris` sudah urut (pilihUntukDikirim). */
export function susunPesanJadwal({
  nama,
  baris,
  pondok
}: {
  nama: string
  baris: Baris[]
  pondok?: string
}): string {
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
