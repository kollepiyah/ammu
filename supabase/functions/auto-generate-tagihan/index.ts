// auto-generate-tagihan — pengganti Cloud Function `autoGenerateTagihanBulanan`.
// Generate tagihan bulanan utk santri aktif dari jenis ber-flag auto_generate.
// Logika & bentuk row IDENTIK tombol manual PengaturanKeuanganView.autoGenerate
// (periode "Bulan Tahun", id `tagihan_<sid>_<jid>_<YYYYMM>`, 4-lapis nominal,
// dedup per santri+kategori+periode). Idempoten (skip duplikat).
//
// Dipicu pg_cron harian 01:00 WIB (lihat migration push_and_cron) via net.http_post.
// Kill-switch: settings/general.keu_auto_generate_cron === false -> skip.
// DEPLOY: supabase functions deploy auto-generate-tagihan --no-verify-jwt
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handlePreflight, json } from '../_shared/cors.ts'
// Kyai 3-4 Agu: rumus nominal TIDAK lagi disalin di sini. `syahriyah.ts` adalah cermin
//   `vue-app/src/utils/syahriyah.js`, dan `tests/unit/syahriyahMirrorEdge.test.js`
//   memaksa keduanya menghasilkan angka yang sama. Sebelum ini cron punya rumus 4-lapis
//   sendiri → cron dan tombol Generate bisa menerbitkan nominal berbeda.
import { hitungTagihan } from './syahriyah.ts'

const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

// G1 (audit 29 Jul): fungsi ini --no-verify-jwt (dipanggil pg_cron), jadi PUBLIK.
// Secret OPSIONAL: bila CRON_SECRET di-set, WAJIB cocok (query ?k= / Authorization
// Bearer / x-cron-secret). Bila BELUM di-set → izinkan (jangan patahkan cron lama saat
// deploy). Set secret + tambahkan header di job pg_cron untuk mengaktifkan gerbang.
const CRON_SECRET = Deno.env.get('CRON_SECRET') || ''
function cronAuthorized(req: Request): boolean {
  if (!CRON_SECRET) return true
  try {
    if (new URL(req.url).searchParams.get('k') === CRON_SECRET) return true
  } catch { /* ignore */ }
  const h = req.headers.get('authorization') || ''
  if (h === `Bearer ${CRON_SECRET}` || h === CRON_SECRET) return true
  return (req.headers.get('x-cron-secret') || '') === CRON_SECRET
}

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre
  if (!cronAuthorized(req)) return json({ ok: false, error: 'unauthorized' }, 401)

  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

  // 1) Settings — A1 (audit 29 Jul): jenis tagihan SENSITIF kini di key 'keuangan'
  //    (finance-only RLS); flag cron/jatuh-tempo tetap di 'general'. Service-role
  //    bypass RLS → gabung keduanya (keuangan menang utk kuncinya).
  const [gRes, kRes] = await Promise.all([
    db.from('settings').select('value').eq('key', 'general').maybeSingle(),
    db.from('settings').select('value').eq('key', 'keuangan').maybeSingle()
  ])
  const s = { ...(gRes.data?.value || {}), ...(kRes.data?.value || {}) } as Record<string, unknown>
  if (s.keu_auto_generate_cron === false) {
    return json({ ok: true, skipped: 'kill-switch OFF' })
  }
  const jenisSemua = Array.isArray(s.keuTagihanJenis) ? s.keuTagihanJenis : []
  // KONTEKS resolver: jenis bulanan + tahunan — SAMA dengan daftar yang dipakai tombol
  //   Generate manual (`jenisAuto` di PengaturanKeuanganView). Keputusan "menempel ke jenis
  //   lain" HARUS memakai daftar yang sama, kalau tidak cron & tombol bisa melipat berbeda.
  // deno-lint-ignore no-explicit-any
  const jenisKonteks = jenisSemua.filter((j: any) =>
    j && String(j.label || '').trim() && (j.frekuensi === 'bulanan' || j.frekuensi === 'tahunan')
  )
  // Yang DITERBITKAN cron tetap hanya jenis ber-`auto_generate` (= frekuensi bulanan).
  //   Jenis tahunan sengaja TIDAK diterbitkan otomatis — itu keputusan Kyai lewat tombol.
  // deno-lint-ignore no-explicit-any
  const jenisAuto = jenisSemua.filter((j: any) => j && j.auto_generate && String(j.label || '').trim())
  if (jenisAuto.length === 0) return json({ ok: true, skipped: 'tidak ada jenis auto_generate' })
  const jtDay = String(s.keu_jatuh_tempo || 10).padStart(2, '0')

  // 2) Santri aktif (v.1.2.6: + is_mukim/is_fullday utk whitelist status)
  // Kyai 4 Agu: `data` (ekor jsonb) ikut di-select karena `shift_ngaji` tinggal di situ.
  //   SENGAJA kolom penuh, bukan alias `data->>shift_ngaji`: sintaks alias itu tak bisa diuji
  //   dari luar, dan kalau salah SELURUH query santri gagal -> cron tak menerbitkan tagihan
  //   sama sekali. Muatannya ~600 kB sekali sehari di sisi server — murah untuk kepastian.
  const { data: santriRows } = await db.from('santri').select('id, nama, lembaga, kelas, lembaga_sekolah, kelas_sekolah, is_mukim, is_fullday, jk, aktif, data')
  // Ratakan ekor jsonb ke atas — CERMIN `_flatten()` di services/db.js (`{...tail, ...cols}`,
  // kolom riil menang). Resolver menerima santri bentuk-app, jadi `shift_ngaji`, `anak_guru`,
  // `paket_syahriyah`, dan `syahriyah_gabung` (semuanya tinggal di `data`) terbaca apa adanya
  // tanpa gerbang whitelist salinan tangan seperti dulu.
  const santriAktif = (santriRows || [])
    .filter((x) => x.aktif !== false)
    // deno-lint-ignore no-explicit-any
    .map((x: any) => ({ ...(x.data || {}), ...x }))

  // 3) Periode bulan berjalan (Asia/Jakarta)
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))
  const periode = `${BULAN[now.getMonth()]} ${now.getFullYear()}`
  const ym = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`
  const jt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${jtDay}`

  // 4) Dedup: baca tagihan periode ini (key santri_id__kategori_lower)
  const existing = new Set<string>()
  const { data: tagPeriode } = await db.from('keuangan_tagihan').select('santri_id, kategori').eq('periode', periode)
  ;(tagPeriode || []).forEach((t) => existing.add(`${String(t.santri_id)}__${String(t.kategori || '').toLowerCase()}`))

  let created = 0, skipped = 0, errCount = 0
  // deno-lint-ignore no-explicit-any
  const rowsToInsert: any[] = []

  for (const j of jenisAuto as Array<Record<string, unknown>>) {
    for (const sx of santriAktif) {
      const dupKey = `${String(sx.id)}__${String(j.label || '').toLowerCase()}`
      if (existing.has(dupKey)) { skipped++; continue }

      // SATU rumus dengan tombol Generate: whitelist (lembaga/status/JK/shift), lapis nominal
      //   (per santri -> paket -> tarif kombinasi -> per kelas -> per lembaga -> default),
      //   dan pelipatan jenis ngaji ke tagihan sekolah/fullday. TANPA diskon: sejak 5 Agu 2026
      //   potongan dipilih kasir di POS, tagihan selalu terbit penuh.
      //   null = santri tak ditagih jenis ini (tak berlaku / nominal 0 / jadi komponen jenis lain).
      const h = hitungTagihan(j, sx, jenisKonteks)
      if (!h) { skipped++; continue }

      const id = `tagihan_${sx.id}_${j.id}_${ym}`
      // Ekor jsonb: `bayar` dipertahankan (dibaca utils/tagihan.terbayarDari untuk baris lama).
      //   Jejak gabungan hanya ditulis bila memang ada — supaya baris tagihan biasa bentuknya
      //   TIDAK berubah sedikit pun dibanding sebelum resolver ini ada.
      // deno-lint-ignore no-explicit-any
      const tail: Record<string, any> = { santri_nama: sx.nama || '', bayar: 0, jatuh_tempo: jt, sumber: 'auto_generate' }
      if (h.komponen.length) tail.komponen = h.komponen
      rowsToInsert.push({
        id,
        santri_id: String(sx.id),
        kategori: j.label || j.id || 'Tagihan',
        periode,
        nominal: h.nominal,
        status: 'belum',
        // terbayar = kolom RIIL (audit 29 Jul); `bayar` di ekor hanya utk pembaca legacy
        terbayar: 0,
        data: tail
      })
      existing.add(dupKey)
      created++
    }
  }

  // Upsert batch (idempoten via PK id; on_conflict do nothing-equivalent = ignoreDuplicates)
  if (rowsToInsert.length > 0) {
    const { error } = await db.from('keuangan_tagihan').upsert(rowsToInsert, { onConflict: 'id', ignoreDuplicates: true })
    if (error) { errCount = rowsToInsert.length; console.error('[auto-gen-tagihan] upsert:', error.message) }
  }

  // Broadcast 1 notif (onTagihanCreated skip sumber=auto_generate -> tak flood)
  if (created > 0 && errCount === 0) {
    await db.from('notif_queue').insert({
      id: `autogen_tagihan_${ym}_${Date.now()}`,
      judul: 'Tagihan Bulan Ini Terbit',
      pesan: `Tagihan ${periode} sudah terbit. Cek menu Tagihan & Pembayaran.`,
      data: { target: 'santri_semua', link: '/tagihan', sender: 'Sistem', status: 'pending', timestamp: new Date().toISOString() }
    }).then(undefined, (e) => console.warn('[auto-gen-tagihan] enqueue notif:', e?.message))
  }

  return json({ ok: true, periode, jt, created, skipped, err: errCount })
})
