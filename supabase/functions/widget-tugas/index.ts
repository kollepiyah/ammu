// widget-tugas — daftar "Tugas Saya" untuk widget layar utama Android (Kyai, 17 Nov 2026).
//
// Widget bukan WebView: ia tak punya sesi Supabase, dan menaruh refresh token asli di sisi
// Java berarti menaruh kunci SELURUH akun di perangkat. Maka fungsi ini PUBLIC
// (--no-verify-jwt) dan auth-nya memakai TOKEN SEMPIT per perangkat (tabel widget_token,
// migrasi 20261117110000): satu string acak yang hanya bisa ditukar dengan daftar tugas SATU
// guru — tak bisa membaca apa pun yang lain, tak bisa menulis, dan bisa dicabut.
//
// Daftarnya disusun `tugasSaya.ts` — CERMIN dari vue-app/src/utils/tugasSaya.js, dijaga
// tests/unit/tugasSayaMirrorEdge.test.js. Jangan menambah aturan di sini; tambahkan di kedua
// cermin supaya widget tak pernah menampilkan daftar yang berbeda dari kartu beranda.
//
// DEPLOY: supabase functions deploy widget-tugas --no-verify-jwt
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handlePreflight, json } from '../_shared/cors.ts'
import { susunTugasSaya, ringkasUntukWidget, geserHari } from './tugasSaya.ts'

const HORIZON = 7
const MAKS = 12

const admin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  { auth: { persistSession: false } }
)

/** 'YYYY-MM-DD' hari ini di Asia/Jakarta — bukan zona server, yang UTC. */
function hariIniJakarta(): string {
  return new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10)
}

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre

  const token = (req.headers.get('x-ammu-widget-token') || '').trim()
  // Panjang minimum sama dengan yang dipaksakan RPC penerbitnya — tak ada gunanya
  // menanyakan string pendek ke basis data.
  if (token.length < 32) return json({ error: 'token tak sah' }, 401)

  try {
    const { data: baris } = await admin
      .from('widget_token')
      .select('guru_id')
      .eq('token', token)
      .maybeSingle()

    const guruId = String(baris?.guru_id || '')
    // Balasan yang SAMA untuk token tak dikenal dan token sah tanpa guru — jangan beri tahu
    // penebak bahwa tokennya "hampir benar".
    if (!guruId) return json({ error: 'token tak sah' }, 401)

    const hariIni = hariIniJakarta()
    const mundur = geserHari(hariIni, -HORIZON)

    const [jadwal, capaian, serem, glond, tesSek] = await Promise.all([
      admin.from('pondok_laju_jadwal').select('*').eq('guru_id', guruId).gte('tanggal', mundur),
      admin.from('pondok_laju_capaian').select('*').eq('guru_id', guruId).gte('tanggal', mundur),
      admin.from('ceremonial_ptpt').select('*').gte('tanggal', hariIni),
      admin.from('tes_glondongan').select('*').eq('penguji_id', guruId),
      admin.from('tes_sekolah').select('*').eq('penguji_id', guruId)
    ])

    const hasil = susunTugasSaya({
      guruId,
      hariIni,
      horizonHari: HORIZON,
      jadwalLaju: jadwal.data || [],
      capaianLaju: capaian.data || [],
      seremonial: serem.data || [],
      glondongan: glond.data || [],
      tesSekolah: tesSek.data || []
    })

    // Jejak pemakaian, supaya token yang tak pernah dipakai lagi bisa dibersihkan Kyai.
    // Gagal mencatat tak boleh menggagalkan balasan — ini catatan, bukan inti.
    admin
      .from('widget_token')
      .update({ dipakai_terakhir: new Date().toISOString() })
      .eq('token', token)
      .then(() => {})

    return json({ tugas: ringkasUntukWidget(hasil, MAKS), tanggal: hariIni }, 200)
  } catch (e) {
    console.error('widget-tugas gagal:', e)
    return json({ error: 'gagal' }, 500)
  }
})
