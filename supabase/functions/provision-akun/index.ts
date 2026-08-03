// provision-akun — buat akun login untuk guru/santri yang BELUM punya.
//
// Permintaan Kyai (3 Agu 2026): akun lahir bersama datanya. Dipanggil otomatis
// sesudah impor Excel / simpan form / konversi PSB, dan bisa dipanggil manual
// ("Buat akun yang belum ada") sebagai jaring pengaman + backfill sekali jalan.
// Dengan begitu pendaftaran mandiri Supabase Auth boleh dimatikan (K1-c) tanpa
// ada yang terkunci — lihat migration 20260803120000 (gerbang handle_new_user).
//
// ⚠️ ATURAN KERAS: fungsi ini HANYA MEMBUAT akun yang belum ada. Ia tak pernah
//    menyentuh sandi akun yang sudah ada — sebagian guru SUDAH mengganti
//    sandinya sendiri, dan mengembalikannya ke '1234' = regresi keamanan.
//    Dijaga dua lapis: (1) RPC admin_akun_belum_ada mengecualikan siapa pun yang
//    sudah punya baris auth.users, (2) createUser (bukan updateUserById) gagal
//    dengan "already registered" bila ternyata ada -> dihitung `dilewati`.
//
// Alur: JWT pemanggil -> RPC admin_akun_belum_ada (GUARD auth_can_manage; guru
//   BERPERAN hanya untuk super_admin) -> daftar {email, nama} -> Admin API
//   createUser sandi awal '1234' + app_metadata.ammu_provisioned.
//   Peran/penautan profil TIDAK diurus di sini: trigger handle_new_user yang
//   memetakan email -> record guru/santri berikut perannya.
//
// app_metadata (BUKAN user_metadata) dipakai sebagai penanda karena klien tak
//   bisa mengisinya lewat signUp — jadi gerbang anti-rebut akun pengurus di
//   handle_new_user tak bisa dipalsukan dari luar.
//
// DEPLOY: supabase functions deploy provision-akun
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handlePreflight, json } from '../_shared/cors.ts'

// = toAuthPassword('1234') di client. Sengaja SAMA dengan reset-user-password.
const SANDI_AWAL = 'mu_auth_1234'
// Batas per panggilan: 508 akun x ~1 permintaan Admin API tak akan selesai dalam
// satu request. Pemanggil mengulang selama `sisa` > 0 (UI tombol sweep begitu).
const MAKS_PER_PANGGILAN = 100
const PARALEL = 5

type Kandidat = { sumber: string; ref_id: string; nama: string; auth_key: string; email: string }

// Jalankan fn untuk tiap item, maksimal `n` bersamaan: backfill memanggil Admin API
// ratusan kali — sekuensial murni terlalu lambat, paralel penuh berisiko rate-limit.
async function batchJalan<T>(items: T[], n: number, fn: (it: T) => Promise<void>) {
  for (let i = 0; i < items.length; i += n) {
    await Promise.all(items.slice(i, i + n).map(fn))
  }
}

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre
  if (req.method !== 'POST') return json({ ok: false, error: 'method' }, 405)

  try {
    const authHeader = req.headers.get('Authorization') || ''
    if (!/^Bearer\s+.+/i.test(authHeader)) return json({ ok: false, error: 'no-token' }, 401)

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    // Ber-konteks JWT pemanggil -> auth.uid() = pemanggil (untuk guard di RPC).
    const asCaller = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } }
    })
    const admin = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

    const body = await req.json().catch(() => ({}))
    const mode = body?.mode === 'one' ? 'one' : 'sweep'
    let collection: string | null = null
    let docId: string | null = null
    if (mode === 'one') {
      collection = String(body?.collection || '')
      docId = String(body?.docId || '')
      if (!['guru', 'santri'].includes(collection) || !docId) {
        return json({ ok: false, error: 'bad-input' }, 400)
      }
    }

    const { data: kurang, error: rpcErr } = await asCaller.rpc('admin_akun_belum_ada', {
      p_collection: collection,
      p_doc_id: docId
    })
    if (rpcErr) {
      const msg = String(rpcErr.message || '')
      if (/forbidden/i.test(msg)) return json({ ok: false, error: 'forbidden' }, 403)
      if (/bad-input/i.test(msg)) return json({ ok: false, error: 'bad-input' }, 400)
      return json({ ok: false, error: msg }, 400)
    }

    const semua: Kandidat[] = Array.isArray(kurang) ? (kurang as Kandidat[]) : []
    const batch = semua.slice(0, MAKS_PER_PANGGILAN)
    let dibuat = 0
    let dilewati = 0
    const gagal: { id: string; nama: string; sumber: string; alasan: string }[] = []

    // IZIN membuat akun BERPERAN. Trigger handle_new_user membacanya lewat
    // _provisi_diizinkan(email) — lihat migration 20260803140000. Dulu penandanya
    // dikirim via app_metadata, TAPI GoTrue menuliskan app_metadata di langkah
    // TERPISAH sesudah INSERT, jadi trigger belum melihatnya dan 3 akun pengurus
    // tertolak (terbukti 3 Agu 2026). Tabel izin tak bergantung urutan itu.
    // Tabelnya server-only (RLS aktif tanpa policy), izinnya kedaluwarsa 10 menit.
    await admin.from('akun_provisi_izin').delete().lt(
      'dibuat_pada',
      new Date(Date.now() - 10 * 60_000).toISOString()
    )
    if (batch.length) {
      const { error: izinErr } = await admin
        .from('akun_provisi_izin')
        .upsert(batch.map((r) => ({ email: r.email })), { onConflict: 'email' })
      if (izinErr) return json({ ok: false, error: 'izin-gagal: ' + izinErr.message }, 500)
    }

    await batchJalan(batch, PARALEL, async (row: Kandidat) => {
      const { error } = await admin.auth.admin.createUser({
        email: row.email,
        password: SANDI_AWAL,
        // domain @ammu.local tak bisa menerima surel -> WAJIB dikonfirmasi langsung,
        // kalau tidak akunnya lahir "unconfirmed" dan login gagal.
        email_confirm: true,
        // Sejak 3 Agu 2026 ini PENANDA AUDIT saja ("dibuat sistem"), bukan gerbang —
        // gerbangnya tabel akun_provisi_izin di atas.
        app_metadata: { ammu_provisioned: true }
      })
      if (!error) {
        dibuat++
        return
      }
      // Sudah ada (mis. lahir dari login pertama beberapa detik lalu) -> BUKAN galat.
      if (/already|registered|exists/i.test(error.message || '')) {
        dilewati++
        return
      }
      gagal.push({ id: row.ref_id, nama: row.nama, sumber: row.sumber, alasan: error.message })
      console.warn(`[provision-akun] gagal ${row.email}: ${error.message}`)
    })

    // Izin dicabut segera — jangan tinggalkan jendela terbuka lebih lama dari perlu.
    if (batch.length) {
      await admin
        .from('akun_provisi_izin')
        .delete()
        .in('email', batch.map((r) => r.email))
    }

    const sisa = Math.max(0, semua.length - batch.length)
    console.log(
      `[provision-akun] mode=${mode} kandidat=${semua.length} dibuat=${dibuat} ` +
        `dilewati=${dilewati} gagal=${gagal.length} sisa=${sisa}`
    )
    return json({ ok: true, mode, kandidat: semua.length, dibuat, dilewati, gagal, sisa })
  } catch (e) {
    console.error('[provision-akun]', e)
    return json({ ok: false, error: String((e as Error)?.message || e) }, 500)
  }
})
