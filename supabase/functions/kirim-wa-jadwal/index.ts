// kirim-wa-jadwal — pengingat WA jadwal piket Pondok Laju lewat Fonnte (Kyai 19 Nov 2026:
// "jam kirim setelah dijadwalkan oleh admin, cukup pengingat saja").
//
// Dipanggil app sesudah "Simpan Jadwal" dengan id sel yang baru diisi. Isi jadwal TIDAK
// dipercaya dari app: fungsi membaca ulang barisnya sendiri. Satu pesan per guru; tiap
// penugasan dicatat di wa_kirim_log, jadi menyimpan ulang tak membuat pesan dobel. Aturan
// isi & pemilihan baris ada di pesan.ts (pure + diuji).
//
// Nomor Fonnte = nomor biasa (bukan WA resmi) — Kyai siap mengganti nomor bila diblokir.
// Karena itu pesannya dikirim satu per satu berjeda, dan dibatasi MAKS_GURU per panggilan
// (batas waktu edge function); app memanggil lagi selama `sisa` > 0.
//
// SECRET: FONNTE_TOKEN (token perangkat dari dasbor Fonnte).
// DEPLOY: supabase functions deploy kirim-wa-jadwal
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handlePreflight, json } from '../_shared/cors.ts'
import { kunciLog, nomorWa, pilihUntukDikirim, susunPesanJadwal } from './pesan.ts'

const FONNTE_URL = 'https://api.fonnte.com/send'
const MAKS_ID = 500
const MAKS_GURU = 25
const JEDA_MS = 1500
const PER_KUERI = 100

const tidur = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** 'YYYY-MM-DD' hari ini di WIB — jadwal yang sudah lewat tak diingatkan. */
function hariIniWib(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(new Date())
}

async function kirimFonnte(token: string, nomor: string, pesan: string) {
  const form = new FormData()
  form.append('target', nomor)
  form.append('message', pesan)
  form.append('countryCode', '0') // nomor sudah 62… (pesan.ts nomorWa)
  const res = await fetch(FONNTE_URL, { method: 'POST', headers: { Authorization: token }, body: form })
  const body = await res.json().catch(() => ({}))
  // Dokumen Fonnte tak konsisten: `status` kadang `Status`.
  const ok = res.ok && (body?.status === true || body?.Status === true)
  return { ok, alasan: ok ? '' : String(body?.reason || body?.detail || `HTTP ${res.status}`) }
}

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre
  if (req.method !== 'POST') return json({ ok: false, error: 'method' }, 405)

  try {
    const authHeader = req.headers.get('Authorization') || ''
    if (!/^Bearer\s+.+/i.test(authHeader)) return json({ ok: false, error: 'no-token' }, 401)

    const token = Deno.env.get('FONNTE_TOKEN') || ''
    // Belum dipasang = fitur belum aktif, bukan kerusakan: app cukup memberi tahu.
    if (!token) return json({ ok: false, error: 'belum-dikonfigurasi' }, 200)

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const asCaller = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } }
    })
    const admin = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

    // Hanya penyusun jadwal (cermin policy INSERT pondok_laju_jadwal) yang boleh memicu WA.
    const { data: boleh, error: errBoleh } = await asCaller.rpc('auth_boleh_susun_jadwal_laju')
    if (errBoleh) return json({ ok: false, error: 'cek-peran: ' + errBoleh.message }, 500)
    if (boleh !== true) return json({ ok: false, error: 'forbidden' }, 403)

    const body = await req.json().catch(() => ({}))
    const ids = [...new Set((Array.isArray(body?.ids) ? body.ids : []).map((x: unknown) => String(x)))]
      .filter(Boolean)
      .slice(0, MAKS_ID)
    // Guru yang sudah diproses panggilan sebelumnya (tanpa nomor / gagal) — tanpa ini panggilan
    //   ulang berputar pada guru yang sama, sebab keduanya tak tercatat 'terkirim'.
    const lewatiGuru = new Set(
      (Array.isArray(body?.lewatiGuru) ? body.lewatiGuru : []).map((x: unknown) => String(x))
    )
    const kosong = { ok: true, terkirim: 0, sisa: 0, diproses: [], tanpaNomor: [], gagal: [] }
    if (!ids.length) return json(kosong)

    // 1. Baris jadwal dari DB (bukan dari app).
    const rows: Record<string, unknown>[] = []
    for (let i = 0; i < ids.length; i += PER_KUERI) {
      const { data, error } = await admin
        .from('pondok_laju_jadwal')
        .select('id, tanggal, sesi, guru_id, data')
        .in('id', ids.slice(i, i + PER_KUERI))
      if (error) throw error
      rows.push(...(data || []))
    }

    // 2. Penugasan yang sudah terkirim.
    const kunci = rows.map((r) => kunciLog(String(r.id), String(r.guru_id ?? '')))
    const sudah = new Set<string>()
    for (let i = 0; i < kunci.length; i += PER_KUERI) {
      const { data, error } = await admin
        .from('wa_kirim_log')
        .select('id')
        .eq('status', 'terkirim')
        .in('id', kunci.slice(i, i + PER_KUERI))
      if (error) throw error
      for (const r of data || []) sudah.add(String(r.id))
    }

    const per = pilihUntukDikirim(rows, { hariIni: hariIniWib(), sudahTerkirim: sudah })
    const guruIds = [...per.keys()].filter((g) => !lewatiGuru.has(g))
    const giliran = guruIds.slice(0, MAKS_GURU)

    const { data: guruRows, error: errGuru } = giliran.length
      ? await admin.from('guru').select('id, nama, wa').in('id', giliran)
      : { data: [], error: null }
    if (errGuru) throw errGuru
    const petaGuru = new Map((guruRows || []).map((g) => [String(g.id), g]))

    const { data: setGeneral } = await admin.from('settings').select('value').eq('key', 'general').maybeSingle()
    const pondok = String(setGeneral?.value?.kopLine2 || 'Pondok Pesantren Mambaul Ulum')

    let terkirim = 0
    let berhenti = false
    const diproses: string[] = []
    const tanpaNomor: string[] = []
    const gagal: { nama: string; alasan: string }[] = []
    for (let i = 0; i < giliran.length; i++) {
      const gid = giliran[i]
      const g = petaGuru.get(gid)
      const nama = String(g?.nama || gid)
      const nomor = nomorWa(g?.wa)
      const baris = per.get(gid) || []
      diproses.push(gid)
      if (!nomor) {
        tanpaNomor.push(nama) // tak dicatat: begitu nomornya diisi, simpan ulang akan mengirim
        continue
      }
      if (i > 0) await tidur(JEDA_MS)
      const hasil = await kirimFonnte(token, nomor, susunPesanJadwal({ nama, baris, pondok }))
      if (hasil.ok) terkirim++
      else gagal.push({ nama, alasan: hasil.alasan })
      const { error: errLog } = await admin.from('wa_kirim_log').upsert(
        baris.map((b) => ({
          id: kunciLog(b.id, gid),
          jenis: 'jadwal_laju',
          ref_id: b.id,
          guru_id: gid,
          nomor,
          status: hasil.ok ? 'terkirim' : 'gagal',
          detail: hasil.alasan || null
        }))
      )
      if (errLog) console.error('[kirim-wa-jadwal] log gagal:', errLog.message)
      // Token salah / kuota habis berlaku untuk semua guru — berhenti, jangan diulang 25 kali.
      if (!hasil.ok && /token|quota|kuota|device/i.test(hasil.alasan)) {
        berhenti = true
        break
      }
    }

    return json({
      ok: true,
      terkirim,
      sisa: berhenti ? 0 : Math.max(0, guruIds.length - giliran.length),
      berhenti,
      diproses,
      tanpaNomor,
      gagal
    })
  } catch (e) {
    console.error('[kirim-wa-jadwal]', e)
    return json({ ok: false, error: String((e as Error)?.message || e) }, 500)
  }
})
