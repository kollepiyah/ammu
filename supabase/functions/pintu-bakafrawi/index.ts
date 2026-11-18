// =====================================================================
//  pintu-bakafrawi — pintu baca-saja untuk dasbor Bakafrawi Studio (18 Nov 2026).
//
//  Data aplikasi ini milik lembaga klien, jadi yang keluar HANYA angka TEKNIS untuk pengembang
//  memantau kesehatan aplikasi: jumlah akun, pengguna aktif, login terakhir, jumlah aktivitas,
//  dan ukuran database. Tanpa nama, data santri/murid, maupun angka keuangan.
//  Berkas yang sama dipakai Ammu Online dan Waseela.
//
//  Penjaga: header x-pintu-rahasia = secret PINTU_BAKAFRAWI_RAHASIA; transaksi read only.
//  Deploy: npx supabase functions deploy pintu-bakafrawi --no-verify-jwt
// =====================================================================
import postgres from 'https://deno.land/x/postgresjs@v3.4.4/mod.js'

let sqlKlien: ReturnType<typeof postgres> | null = null
function pg() {
  if (sqlKlien) return sqlKlien
  const url = Deno.env.get('SUPABASE_DB_URL')
  if (!url) throw new Error('SUPABASE_DB_URL tidak tersedia')
  sqlKlien = postgres(url, { prepare: false, max: 1, idle_timeout: 20 })
  return sqlKlien
}

function samaAman(a: string, b: string) {
  if (!a || !b || a.length !== b.length) return false
  let beda = 0
  for (let i = 0; i < a.length; i++) beda |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return beda === 0
}

// "Aktif" dari sesi yang diperbarui (token disegarkan saat aplikasi dipakai), bukan hanya login.
const SQL = `
select jsonb_build_object(
  'akun', (select count(*) from auth.users),
  'aktif_24j', (select count(distinct user_id) from auth.sessions where updated_at > now() - interval '24 hours'),
  'aktif_7h', (select count(distinct user_id) from auth.sessions where updated_at > now() - interval '7 days'),
  'login_terakhir', (select max(last_sign_in_at) from auth.users),
  'aktivitas_24j', (select count(*) from public.audit_log where created_at > now() - interval '24 hours'),
  'aktivitas_terakhir', (select max(created_at) from public.audit_log),
  'ukuran_db_mb', round(pg_database_size(current_database()) / 1048576.0)
) as r`

Deno.serve(async (req) => {
  if (req.method !== 'GET') return new Response('metode tidak didukung', { status: 405 })
  if (!samaAman(req.headers.get('x-pintu-rahasia') ?? '', Deno.env.get('PINTU_BAKAFRAWI_RAHASIA') ?? '')) {
    return new Response('forbidden', { status: 403 })
  }
  try {
    const [baris] = await pg().begin(async (tx) => {
      await tx.unsafe('set transaction read only')
      return await tx.unsafe(SQL)
    })
    return Response.json({ ok: true, jenis: 'teknis', data: baris.r })
  } catch (e) {
    console.error('pintu-bakafrawi', e)
    return Response.json({ ok: false, pesan: e instanceof Error ? e.message : 'gagal' }, { status: 500 })
  }
})
