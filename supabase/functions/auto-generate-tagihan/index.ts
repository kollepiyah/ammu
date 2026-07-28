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
  const jenisAuto = (Array.isArray(s.keuTagihanJenis) ? s.keuTagihanJenis : []).filter(
    // deno-lint-ignore no-explicit-any
    (j: any) => j && j.auto_generate && String(j.label || '').trim()
  )
  if (jenisAuto.length === 0) return json({ ok: true, skipped: 'tidak ada jenis auto_generate' })
  const jtDay = String(s.keu_jatuh_tempo || 10).padStart(2, '0')

  // 2) Santri aktif (v.1.2.6: + is_mukim/is_fullday utk whitelist status)
  const { data: santriRows } = await db.from('santri').select('id, nama, lembaga, kelas, lembaga_sekolah, kelas_sekolah, is_mukim, is_fullday, jk, aktif')
  const santriAktif = (santriRows || []).filter((x) => x.aktif !== false)

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
    const wl = Array.isArray(j.lembaga_only) ? (j.lembaga_only as string[]).filter(Boolean) : []
    // v.1.2.6: whitelist STATUS santri (cermin utils/statusSantri.matchStatusOnly).
    const wlStatus = Array.isArray(j.status_only) ? (j.status_only as string[]).filter(Boolean) : []
    // v.1.2.x: whitelist JENIS KELAMIN (cermin utils/statusSantri.matchJenisKelamin). L=Putra, P=Putri.
    const wlJk = Array.isArray(j.jk_only) ? (j.jk_only as string[]).filter(Boolean) : []
    for (const sx of santriAktif) {
      if (wl.length > 0 && !(wl.includes(sx.lembaga) || wl.includes(sx.lembaga_sekolah))) continue
      // status: kosong = semua; antar-status OR. mahad=is_mukim, fullday=is_fullday,
      //   non_mukim = bukan mukim & bukan fullday.
      if (wlStatus.length > 0) {
        const mukim = !!sx.is_mukim, fullday = !!sx.is_fullday
        const ok = wlStatus.some((st) =>
          st === 'mahad' ? mukim : st === 'fullday' ? fullday : st === 'non_mukim' ? !mukim && !fullday : false
        )
        if (!ok) continue
      }
      // v.1.2.x: jenis kelamin — kosong = semua; cocokkan ke sx.jk (L/P)
      if (
        wlJk.length > 0 &&
        !wlJk.map((x) => String(x).toUpperCase()).includes(String(sx.jk || '').toUpperCase())
      )
        continue
      const dupKey = `${String(sx.id)}__${String(j.label || '').toLowerCase()}`
      if (existing.has(dupKey)) { skipped++; continue }

      // 4-lapis: per-santri -> per-kelas -> per-lembaga -> default
      let nominal = Number((j.nominal_per_santri as Record<string, unknown>)?.[String(sx.id)] || 0)
      if (nominal === 0) {
        const perK = (j.nominal_per_kelas || {}) as Record<string, Record<string, unknown>>
        for (const [lemb, ks] of [[sx.lembaga, sx.kelas], [sx.lembaga_sekolah, sx.kelas_sekolah]]) {
          if (!lemb) continue
          const v = Number((perK[lemb] || {})[ks as string] || 0)
          if (v > 0) { nominal = v; break }
        }
      }
      if (nominal === 0) {
        const perL = (j.nominal_per_lembaga || {}) as Record<string, unknown>
        nominal = Number(perL[sx.lembaga] || perL[sx.lembaga_sekolah] || 0) || Number(j.nominal_default || 0)
      }
      if (nominal <= 0) { skipped++; continue }

      const id = `tagihan_${sx.id}_${j.id}_${ym}`
      rowsToInsert.push({
        id,
        santri_id: String(sx.id),
        kategori: j.label || j.id || 'Tagihan',
        periode,
        nominal,
        status: 'belum',
        // santri_nama/bayar/jatuh_tempo/sumber -> data jsonb (mirror split db.js)
        data: { santri_nama: sx.nama || '', bayar: 0, jatuh_tempo: jt, sumber: 'auto_generate' }
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
