// periodeTagihan — gerbang "Mulai Tagih di AMMU".
//
// Kyai (5 Agu 2026): "ada santri yg dapat tagihan bulan juli, padahal saya mulanya
// agustus". Setelan `keuMulaiTagih` sudah ada, tapi dulu HANYA dibaca POS untuk mewarnai
// sel — dan bahkan di sana ia cuma menetralkan sel yang belum punya tagihan nyata. Empat
// jalur bisa menerbitkan tagihan (Generate, Generate Khusus, tambah manual, cron) dan tak
// satu pun memeriksanya, jadi tagihan bulan sebelum pesantren mulai memakai AMMU tetap
// bisa lahir dan langsung tampak sebagai tunggakan wali.
//
// MURNI supaya bisa diuji dan dicerminkan ke edge function Deno.

/** Nama bulan Indonesia -> nomor (1-12). */
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

/**
 * Ubah periode tagihan jadi kode 'YYYY-MM' yang bisa dibandingkan sebagai teks.
 *
 * Menerima bentuk yang benar-benar dipakai di data: 'Juli 2026' (generate bulanan),
 * '2026-07' / '2026_07' (kode), dan 'Juli' + tahun terpisah tak didukung — kembalikan ''
 * kalau ragu. '' berarti "tak bisa dinilai", dan pemanggil WAJIB memperlakukannya sebagai
 * BOLEH: lebih baik meloloskan periode aneh daripada diam-diam menolak tagihan yang sah.
 *
 * Periode TAHUNAN ('TA 2026/2027') sengaja tak dikenali — gerbang ini soal bulan.
 */
export function periodeKode(periode) {
  const p = String(periode ?? '').trim()
  if (!p) return ''
  if (/^TA\s/i.test(p)) return '' // periode tahun ajaran, bukan bulan
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

/**
 * Kode bulan 'Mulai Tagih' dari settings. '' = belum disetel → gerbang TIDAK aktif.
 *
 * Sengaja TIDAK jatuh ke awal Tahun Ajaran seperti tampilan POS: di sini yang dijaga
 * adalah penulisan data. Menebak batas lalu menolak tagihan atas tebakan itu jauh lebih
 * berbahaya daripada membiarkan gerbang tertutup sampai Kyai mengisinya.
 */
export function mulaiTagihKode(settings) {
  const m = String(settings?.keuMulaiTagih ?? '').match(/^(\d{4})-(\d{2})$/)
  return m ? `${m[1]}-${m[2]}` : ''
}

/**
 * Periode ini boleh diterbitkan?
 * Belum disetel / periode tak terbaca / periode tahunan -> selalu boleh.
 */
export function bolehTerbitPeriode(periode, mulaiKode) {
  const batas = String(mulaiKode ?? '').trim()
  if (!batas) return true
  const kode = periodeKode(periode)
  if (!kode) return true
  return kode >= batas
}

/** Pesan seragam untuk semua jalur yang menolak. */
export function pesanTolakPeriode(periode, mulaiKode) {
  return (
    `Periode "${periode}" lebih awal daripada "Mulai Tagih di AMMU" (${mulaiKode}). ` +
    `Tagihan tidak diterbitkan. Ubah setelannya di Pengaturan Keuangan bila memang ingin menagih bulan itu.`
  )
}
