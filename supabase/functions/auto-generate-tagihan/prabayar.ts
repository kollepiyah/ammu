// prabayar.ts — CERMIN Deno dari pencocok "pembayaran di muka" yang dipakai tombol Generate:
//   `vue-app/src/utils/cocokBayarTagihan.js` (petaBayarPerSel, petaPrabayarPeriode,
//   terapkanPrabayar, kodePeriodeBaris, jenisBarisBuku, alokasiEksplisit, kunciSel)
//   + `vue-app/src/utils/periodeTagihan.js` (periodeKode)
//   + `vue-app/src/utils/tagihan.js` (statusTagihan).
//
// KENAPA ADA (Kyai, 14 Sep 2026 — "sekaligus audit yg lain"): sejak v.1.4.1 tombol Generate
// di Pengaturan Keuangan membuka tiap tagihan baru dengan uang yang SUDAH masuk untuk
// (santri × jenis × periode) itu. Cron harian tidak — ia tetap menerbitkan `terbayar: 0`.
// Jadi santri yang membayar bulan depan di muka menerima tagihannya kembali sebagai
// tunggakan begitu cron jalan di awal bulan, wali ditagih untuk uang yang sudah diterima,
// dan "Cek Riwayat vs Tagihan" menemukan "kurang tercatat" baru SETIAP bulan: pabrik selisih
// yang tak pernah berhenti, persis di alat yang sedang dijalankan admin keuangan.
//
// ⚠️ KALAU SALAH SATU DIUBAH, SINKRONKAN KEDUANYA. Pagarnya tes, bukan ingatan:
// `tests/unit/prabayarMirrorEdge.test.js` menjalankan kasus yang sama pada kedua berkas dan
// menuntut hasilnya identik. Murni TypeScript (tanpa API Deno, tanpa impor remote) supaya
// bisa diimpor vitest — pola yang sama dengan `syahriyah.ts`.

// deno-lint-ignore no-explicit-any
type Any = any

export interface BayarSel {
  total: number
  baris: Any[]
}

/** Sumber baris buku induk yang BERARTI "santri membayar" (cermin SUMBER_BAYAR_SANTRI). */
export const SUMBER_BAYAR_SANTRI: string[] = ['pos_santri', 'transfer_verified', 'bmt_va']

const BULAN = [
  'januari',
  'februari',
  'maret',
  'april',
  'mei',
  'juni',
  'juli',
  'agustus',
  'september',
  'oktober',
  'november',
  'desember'
]

/** Cermin periodeTagihan.periodeKode — 'Juli 2026' / '2026-07' → '2026-07'; ragu → ''. */
export function periodeKode(periode: unknown): string {
  const p = String(periode ?? '').trim()
  if (!p) return ''
  if (/^TA\s/i.test(p)) return ''
  let m = p.match(/^(\d{4})[-_](\d{1,2})$/)
  if (m) {
    const bl = Number(m[2])
    if (bl < 1 || bl > 12) return ''
    return `${m[1]}-${String(bl).padStart(2, '0')}`
  }
  m = p.match(/^([A-Za-z]+)\s+(\d{4})$/)
  if (m) {
    const idx = BULAN.indexOf(m[1].toLowerCase())
    if (idx < 0) return ''
    return `${m[2]}-${String(idx + 1).padStart(2, '0')}`
  }
  return ''
}

/** Cermin tagihan.statusTagihan. */
export function statusTagihan(nominal: unknown, terbayar: unknown): string {
  const penuh = Number(nominal) || 0
  const byr = Number(terbayar) || 0
  if (penuh > 0 && byr >= penuh - 0.5) return 'lunas'
  return byr > 0 ? 'partial' : 'belum'
}

export function jenisKunci(v: unknown): string {
  return String(v ?? '')
    .toLowerCase()
    .trim()
}

export function kodePeriodeBaris(row: Any): string {
  if (!row) return ''
  const langsung = periodeKode(row.periode_kode)
  if (langsung) return langsung
  const teks = periodeKode(row.periode)
  if (teks) return teks
  const ta = String(row.periode_kode || row.periode || '').match(/^TA\s*(\d{4})/i)
  if (ta) return `TA${ta[1]}`
  const jt = String(row.jatuh_tempo || '').match(/^(\d{4})-(\d{2})/)
  return jt ? `${jt[1]}-${jt[2]}` : ''
}

export function jenisTagihan(t: Any): string {
  return jenisKunci(t?.kategori || t?.jenis_label || t?.jenis || t?.jenis_id)
}

export function jenisBarisBuku(b: Any): string {
  const induk = jenisKunci(b?.induk_jenis)
  if (induk) return induk
  const m = String(b?.keterangan || '').match(/bagian dari\s+([^—|]+)/i)
  if (m) return jenisKunci(m[1])
  return jenisKunci(b?.kategori || b?.jenis)
}

export function alokasiEksplisit(b: Any): Array<{ tagihanId: string; nominal: number }> {
  const out: Array<{ tagihanId: string; nominal: number }> = []
  const langsung = String(b?.tagihan_id || '').trim()
  if (langsung) out.push({ tagihanId: langsung, nominal: Number(b?.nominal || 0) })
  const rinci = Array.isArray(b?.alokasi) ? b.alokasi : b?.data?.alokasi
  for (const a of Array.isArray(rinci) ? rinci : []) {
    const id = String(a?.tagihan_id || '').trim()
    const nom = Number(a?.nominal || 0)
    if (id && nom > 0) out.push({ tagihanId: id, nominal: nom })
  }
  return out
}

export function kunciSel(santriId: unknown, jenis: unknown, kode: unknown): string {
  return `${String(santriId ?? '')}|${jenisKunci(jenis)}|${String(kode ?? '')}`
}

export function petaBayarPerSel(
  bukuInduk: Any[],
  sumberSah: string[] = SUMBER_BAYAR_SANTRI
): Map<string, BayarSel> {
  const sah = new Set(sumberSah.map(String))
  const peta = new Map<string, BayarSel>()
  for (const b of bukuInduk || []) {
    if (!b) continue
    if (!sah.has(String(b.sumber || ''))) continue
    if (String(b.tipe || 'masuk') !== 'masuk') continue
    if (alokasiEksplisit(b).length) continue
    const sid = String(b.santri_id ?? b?.data?.santri_id ?? '')
    if (!sid) continue
    const kode = kodePeriodeBaris(b)
    if (!kode) continue
    const k = kunciSel(sid, jenisBarisBuku(b), kode)
    const ada = peta.get(k) || { total: 0, baris: [] }
    ada.total += Number(b.nominal || 0)
    ada.baris.push(b)
    peta.set(k, ada)
  }
  return peta
}

export function petaPrabayarPeriode(bukuInduk: Any[], kodePeriode: string[]): Map<string, BayarSel> {
  const kodes = new Set((kodePeriode || []).filter(Boolean))
  if (!kodes.size) return new Map()
  return petaBayarPerSel((bukuInduk || []).filter((b) => kodes.has(kodePeriodeBaris(b))))
}

export function terapkanPrabayar(payload: Any, peta: Map<string, BayarSel>): Any {
  if (!payload || !peta || !peta.size) return payload
  const kode = kodePeriodeBaris(payload)
  if (!kode) return payload
  const bayar = peta.get(kunciSel(payload.santri_id, jenisTagihan(payload), kode))
  if (!bayar || bayar.total <= 0) return payload
  payload.terbayar = Math.min(bayar.total, payload.nominal || bayar.total)
  payload.status = statusTagihan(payload.nominal, payload.terbayar)
  payload.prabayar_dari = bayar.baris.map((b: Any) => b.id).filter(Boolean)
  return payload
}
