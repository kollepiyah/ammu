// hiview-absen — terima PUSH event absensi mesin HiView/Hikvision (HIK-FRT24-FW)
// lewat HTTP Listening (ISAPI event notification) -> tulis absensi_shift_guru.
//
// Mesin di lokasi TANPA PC: tiap scan, mesin POST AccessControllerEvent (multipart
// atau JSON) ke fungsi ini via HTTPS. Fungsi PUBLIC (--no-verify-jwt) karena
// pemanggilnya MESIN (bukan sesi user); auth = secret di query `?k=` (utama) ATAU
// Basic-auth password (fallback). Tulis pakai service-role (bypass RLS, server-side).
//
// Alur per event: filter major=5 + ada employeeNoString -> map employeeNo =
// guru.id_fingerprint -> deriveShift (settings AMMU; cermin shiftDerive.js + fp_sync.py)
// -> tulis absensi_shift_guru (source 'hiview'). GUARD: jangan timpa izin/sakit;
// scan TERAWAL menang (idempoten: scan ulang shift sama yg jam >= tersimpan -> skip).
//
// BALASAN: mesin Hikvision MENILAI ISI body (ResponseStatus dgn statusCode=1=OK),
// bukan cuma HTTP 200. Tiap jalur "sukses/diabaikan" WAJIB balas isapiOk(); kalau
// balas JSON biasa, layar mesin tampil "Gagal melaporkan kedatangan" walau event
// sudah diterima & ditulis. Hanya 401/405/500 yg sengaja "gagal" (biar mesin retry).
//
// DEPLOY: supabase functions deploy hiview-absen --no-verify-jwt
// SECRET: supabase secrets set HIVIEW_PUSH_SECRET="<8-16 char>"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders, handlePreflight, json } from '../_shared/cors.ts'
import { deriveShift, statusFor, pilihShiftPulang, shiftsForGuru } from './shiftDerive.ts'

const SECRET = Deno.env.get('HIVIEW_PUSH_SECRET') || ''

// Authorized bila secret cocok di query `?k=` ATAU password Basic-auth. Mesin
// kirim salah satunya (lihat doc setel mesin). Tanpa SECRET ter-set -> tolak.
function authorized(req: Request): boolean {
  if (!SECRET) return false
  try {
    if (new URL(req.url).searchParams.get('k') === SECRET) return true
  } catch {
    /* ignore */
  }
  const h = req.headers.get('authorization') || ''
  if (h.toLowerCase().startsWith('basic ')) {
    try {
      const dec = atob(h.slice(6).trim())
      const pass = dec.includes(':') ? dec.slice(dec.indexOf(':') + 1) : dec
      if (pass === SECRET) return true
    } catch {
      /* ignore */
    }
  }
  return false
}

// Balasan SUKSES untuk mesin: ISAPI ResponseStatus dgn statusCode 1 (OK). Hikvision
// MENILAI ISI body (bukan cuma HTTP 200) -> tanpa statusCode 1 mesin anggap GAGAL.
// Cerminkan format request: JSON_ResponseStatus bila request JSON, selain itu
// XML_ResponseStatus (paling kompatibel utk POST multipart/form-data atau teks).
function isapiOk(req: Request): Response {
  let path = '/'
  try {
    path = new URL(req.url).pathname
  } catch {
    /* ignore */
  }
  const ct = (req.headers.get('content-type') || '').toLowerCase()
  if (ct.includes('application/json')) {
    return new Response(
      JSON.stringify({ requestURL: path, statusCode: 1, statusString: 'OK', subStatusCode: 'ok' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<ResponseStatus version="2.0" xmlns="http://www.std-cgi.org/ver20/XMLSchema">\n` +
    `  <requestURL>${path}</requestURL>\n` +
    `  <statusCode>1</statusCode>\n` +
    `  <statusString>OK</statusString>\n` +
    `  <subStatusCode>ok</subStatusCode>\n` +
    `</ResponseStatus>`
  return new Response(xml, {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/xml' }
  })
}

// Ambil JSON event dari body (multipart/form-data, application/json, atau teks).
// deno-lint-ignore no-explicit-any
async function readEventJson(req: Request): Promise<any | null> {
  const ct = (req.headers.get('content-type') || '').toLowerCase()
  try {
    if (ct.includes('application/json')) return await req.json()
    if (ct.includes('multipart/form-data')) {
      const form = await req.formData()
      for (const [, v] of form.entries()) {
        let text: string | null = null
        if (typeof v === 'string') text = v
        else if (v instanceof File) text = await v.text()
        if (text && text.trim().startsWith('{')) {
          try {
            return JSON.parse(text)
          } catch {
            /* part lain mungkin JSON-nya */
          }
        }
      }
      return null
    }
    const t = await req.text()
    return t && t.trim().startsWith('{') ? JSON.parse(t) : null
  } catch {
    return null
  }
}

// dateTime ISO ber-offset (mis. '2026-06-24T16:24:55+07:00') -> jam dinding WIB.
// Konversi via Asia/Jakarta (robust thd offset mesin apa pun); fallback regex.
function toWib(dt: string): { date: string; hhmm: string } | null {
  if (!dt) return null
  const d = new Date(dt)
  if (!isNaN(d.getTime())) {
    const wib = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))
    const p = (n: number) => String(n).padStart(2, '0')
    return {
      date: `${wib.getFullYear()}-${p(wib.getMonth() + 1)}-${p(wib.getDate())}`,
      hhmm: `${p(wib.getHours())}:${p(wib.getMinutes())}`
    }
  }
  const m = dt.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})/)
  return m ? { date: m[1], hhmm: `${m[2]}:${m[3]}` } : null
}

// ── JEJAK SCAN (Kyai, 6 Agu 2026) ────────────────────────────────────────────
// "Guru sudah scan tapi datanya tidak terkirim" tak bisa ditelusuri selama setiap
// pembuangan event hanya jadi console.log yang tak bisa dibuka siapa pun di pesantren.
// Tiap event yang membawa AccessControllerEvent karena itu ditulis apa adanya ke
// hiview_scan_log — termasuk, dan terutama, yang DITOLAK.
//
// Menulis jejak TIDAK BOLEH mengubah nasib absennya: seluruh badan fungsi ini
// dibungkus try/catch dan pemanggilnya tak pernah menunggu hasilnya untuk memutuskan
// balasan ke mesin. Log rusak lebih baik daripada absen hilang.
type HasilScan =
  | 'diterima' // jadi baris absen masuk
  | 'pulang' // ditempel sbg jam_pulang
  | 'luar_window' // di luar jam shift & tak ada baris masuk utk ditempeli
  | 'pin_tak_dikenal' // employeeNo tak ada di guru.id_fingerprint
  | 'izin_sakit' // baris hari itu izin/sakit, sengaja tak ditimpa
  | 'duplikat' // scan ulang di window yang sama, jam tak lebih awal
  | 'bukan_absen' // event orang tapi tanpa employeeNo / bukan autentikasi
  | 'waktu_tak_terbaca'

// Id idempoten: mesin yang me-retry event yang sama menimpa barisnya sendiri,
// bukan menambah baris baru. Detik ikut dibawa supaya dua scan dalam satu menit
// tak saling menimpa.
function idJejak(empNo: string, dt: string): string {
  const digit = String(dt || '').replace(/\D/g, '')
  const kunci = digit ? digit.slice(0, 14) : new Date().toISOString().replace(/\D/g, '')
  return `hv_${empNo || 'x'}_${kunci}`
}

// deno-lint-ignore no-explicit-any
async function catatJejak(
  db: any,
  j: {
    empNo: string
    dateTime: string
    hasil: HasilScan
    tanggal?: string
    jam?: string
    guruId?: string
    guruNama?: string
    shift?: string
    status?: string
    catatan?: string
  }
) {
  try {
    await db.from('hiview_scan_log').upsert(
      {
        id: idJejak(j.empNo, j.dateTime),
        tanggal: j.tanggal || '',
        employee_no: j.empNo || '',
        guru_id: j.guruId || null,
        hasil: j.hasil,
        data: {
          jam: j.jam || '',
          guru_nama: j.guruNama || '',
          shift: j.shift || '',
          status: j.status || '',
          catatan: j.catatan || '',
          dateTime_mesin: j.dateTime || ''
        }
      },
      { onConflict: 'id' }
    )
  } catch (e) {
    console.error('[hiview] gagal catat jejak:', (e as Error)?.message || e)
  }
}

// Baris guru -> bentuk flat (kolom riil + ekor `data` jsonb), cermin db.js _flatten.
// deno-lint-ignore no-explicit-any
function flattenGuru(row: any): any {
  if (!row) return null
  const { data, ...cols } = row
  return { ...(data || {}), ...cols }
}

// Settings shift: gabung settings/web < settings/general (general = sumber kebenaran),
// cermin stores/settings.js.
// deno-lint-ignore no-explicit-any
async function fetchSettings(db: any): Promise<Record<string, unknown>> {
  const [g, w] = await Promise.all([
    db.from('settings').select('value').eq('key', 'general').maybeSingle(),
    db.from('settings').select('value').eq('key', 'web').maybeSingle()
  ])
  return { ...(w.data?.value || {}), ...(g.data?.value || {}) }
}

// Scan ke-2 dst = ABSEN PULANG. Tempel jam_pulang ke baris masuk (hadir/terlambat) hari
// ini milik guru, pada shift yang PALING BELAKANGAN dimasuki (shiftDerive.pilihShiftPulang).
// Berlaku SEMUA shift (ngaji pagi/sore-saja jg scan 2×) dan tak lagi mensyaratkan shift-nya
// sudah bubar — pulang lebih awal pun tercatat. jam_pulang = MAX (idempoten). HANYA MENCATAT
// — tak mengubah status/hadir. Gagal = log saja (jangan bikin mesin retry-storm); pemanggil
// tetap balas isapiOk.
// Mengembalikan daftar shift yang benar-benar menerima jam_pulang — dipakai pemanggil
// untuk membedakan "tercatat sebagai pulang" dari "hilang begitu saja" di jejak scan.
// deno-lint-ignore no-explicit-any
async function catatPulang(
  db: any,
  // deno-lint-ignore no-explicit-any
  guru: any,
  // deno-lint-ignore no-explicit-any
  settings: any,
  t: { date: string; hhmm: string }
): Promise<string[]> {
  const tercatat: string[] = []
  try {
    const milik = shiftsForGuru(guru, settings)
    if (!milik || milik.size === 0) return tercatat
    const { data: rows } = await db
      .from('absensi_shift_guru')
      .select('*')
      .eq('guru_id', String(guru.id))
      .eq('periode', t.date.slice(0, 7))
    // baris masuk hari ini milik shift si guru → kandidat sasaran pulang
    // deno-lint-ignore no-explicit-any
    const rowByShift: Record<string, any> = {}
    const barisMasuk: { shift: string; jam: string; status: string }[] = []
    for (const r of rows || []) {
      const d = { ...(r.data || {}), ...r }
      if (String(d.tanggal || '') !== t.date) continue
      const sh = String(d.shift || '').toLowerCase()
      if (!sh || !milik.has(sh)) continue
      rowByShift[sh] = r
      barisMasuk.push({ shift: sh, jam: String(d.jam || ''), status: String(d.status || '') })
    }
    const targets = pilihShiftPulang(t.hhmm, barisMasuk, settings)
    if (!targets.length) {
      console.log(`[hiview] pulang: tak ada shift cocok ${guru.nama} jam=${t.hhmm}`)
      return tercatat
    }
    for (const sh of targets) {
      const target = rowByShift[sh]
      if (!target) continue
      const cur = { ...(target.data || {}) }
      const exPulang = String(cur.jam_pulang || '')
      if (exPulang && exPulang >= t.hhmm) continue // sudah ada pulang lebih akhir → MAX
      const { error } = await db
        .from('absensi_shift_guru')
        .update({ data: { ...cur, jam_pulang: t.hhmm } })
        .eq('id', target.id)
      if (error) throw error
      tercatat.push(sh)
      console.log(`[hiview] PULANG ${guru.nama} ${t.date} ${t.hhmm} → ${sh}`)
    }
  } catch (e) {
    console.error('[hiview] pulang error:', (e as Error)?.message || e)
  }
  return tercatat
}

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre

  // Health/handshake (GET, tanpa auth) — biar "uji koneksi" mesin tampil OK.
  if (req.method === 'GET') return json({ ok: true, service: 'hiview-absen' })
  if (req.method !== 'POST') return json({ ok: false, error: 'method' }, 405)
  if (!authorized(req)) {
    // Diagnostik 401 (TANPA bocorkan nilai secret — hanya panjang/keberadaan).
    try {
      const u = new URL(req.url)
      const k = u.searchParams.get('k')
      const hasBasic = (req.headers.get('authorization') || '').toLowerCase().startsWith('basic ')
      console.log(
        `[hiview] 401 path=${u.pathname} k=${k === null ? 'ABSENT' : 'len' + k.length} ` +
          `secretLen=${SECRET.length} kMatch=${k === SECRET} basicAuth=${hasBasic}`
      )
    } catch {
      /* ignore */
    }
    return json({ ok: false, error: 'unauthorized' }, 401)
  }

  const ev = await readEventJson(req)
  const ace = ev?.AccessControllerEvent || ev?.accessControllerEvent || null
  const major = Number(ace?.majorEventType)
  const empNo = String(ace?.employeeNoString ?? ace?.employeeNo ?? '').trim()
  const dateTime = String(ev?.dateTime || ace?.time || ace?.dateTime || '').trim()

  // Client dibuat SEBELUM cabang-cabang penolakan: pencatat jejak memerlukannya, dan
  // justru event yang ditolak itulah yang paling perlu meninggalkan jejak.
  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

  // Hanya event autentikasi orang (major 5 + ada employeeNo). Sisanya diabaikan
  // (isapiOk: balas statusCode 1 supaya mesin tak retry-storm & tak tampil "gagal").
  if (!ace || major !== 5 || !empNo) {
    const reason = !ace ? 'no-event' : major !== 5 ? `major=${major}` : 'no-employee'
    console.log(`[hiview] diabaikan reason=${reason}`)
    // Event TANPA AccessControllerEvent (heartbeat mesin, keep-alive) sengaja tak
    // dicatat — jumlahnya jauh melebihi scan orang dan akan menenggelamkan jejaknya.
    if (ace) {
      await catatJejak(db, { empNo, dateTime, hasil: 'bukan_absen', catatan: reason })
    }
    return isapiOk(req)
  }
  const t = toWib(dateTime)
  if (!t) {
    console.log(`[hiview] bad-datetime: ${dateTime}`)
    await catatJejak(db, {
      empNo,
      dateTime,
      hasil: 'waktu_tak_terbaca',
      catatan: `dateTime mesin: ${dateTime || '(kosong)'}`
    })
    return isapiOk(req)
  }

  try {
    const { data: gRow } = await db
      .from('guru')
      .select('*')
      .eq('id_fingerprint', empNo)
      .maybeSingle()
    const guru = flattenGuru(gRow)
    if (!guru) {
      console.log(`[hiview] employeeNo ${empNo} tak terdaftar (guru.id_fingerprint)`)
      await catatJejak(db, {
        empNo,
        dateTime,
        tanggal: t.date,
        jam: t.hhmm,
        hasil: 'pin_tak_dikenal',
        catatan: 'tak ada guru dengan id_fingerprint ini'
      })
      return isapiOk(req)
    }
    const jejakGuru = { guruId: String(guru.id), guruNama: String(guru.nama || '') }

    const settings = await fetchSettings(db)
    const shift = deriveShift(t.hhmm, guru, settings)
    if (!shift) {
      // Di luar window masuk → coba catat sebagai absen pulang (scan ke-2).
      const pulang = await catatPulang(db, guru, settings, t)
      await catatJejak(db, {
        empNo,
        dateTime,
        tanggal: t.date,
        jam: t.hhmm,
        ...jejakGuru,
        hasil: pulang.length ? 'pulang' : 'luar_window',
        shift: pulang.join(', '),
        catatan: pulang.length
          ? 'dicatat sebagai jam pulang'
          : 'jam scan di luar window shift & tak ada baris masuk hari ini — ' +
            'cek shift guru, atau setel toleransi scan di Master Shift'
      })
      return isapiOk(req)
    }
    const status = statusFor(t.hhmm, shift, settings)

    const docId = `shift_${guru.id}_${t.date}_${shift}`
    const { data: exRow } = await db
      .from('absensi_shift_guru')
      .select('*')
      .eq('id', docId)
      .maybeSingle()
    if (exRow) {
      const ex = { ...(exRow.data || {}), ...exRow }
      const exst = String(ex.status || '').toLowerCase()
      if (exst === 'izin' || exst === 'sakit') {
        console.log(`[hiview] skip izin/sakit ${docId}`)
        await catatJejak(db, {
          empNo,
          dateTime,
          tanggal: t.date,
          jam: t.hhmm,
          ...jejakGuru,
          hasil: 'izin_sakit',
          shift,
          status: exst,
          catatan: 'baris hari ini berstatus izin/sakit — sengaja tak ditimpa scan'
        })
        return isapiOk(req)
      }
      const exjam = String(ex.jam || '')
      // scan terdahulu (<=) menang sbg jam MASUK: idempoten + tak tertimpa jam belakangan.
      // Scan belakangan itu sendiri = kandidat PULANG — window masuk membentang sampai
      // shift bubar, jadi ceklok pulang sebelum bubar jatuh di window ini juga. Dulu
      // langsung dibuang → baris tetap "belum pulang". (Kyai, 22 Jul 2026)
      if (exjam && exjam <= t.hhmm) {
        console.log(`[hiview] scan-ke-2 dalam window ${docId} existing=${exjam} → coba pulang`)
        const pulang = await catatPulang(db, guru, settings, t)
        await catatJejak(db, {
          empNo,
          dateTime,
          tanggal: t.date,
          jam: t.hhmm,
          ...jejakGuru,
          hasil: pulang.length ? 'pulang' : 'duplikat',
          shift: pulang.length ? pulang.join(', ') : shift,
          catatan: pulang.length
            ? 'dicatat sebagai jam pulang'
            : `sudah ada jam masuk ${exjam} & jeda belum cukup untuk dihitung pulang`
        })
        return isapiOk(req)
      }
    }

    const rowData = {
      guru_nama: guru.nama || '',
      tanggal: t.date,
      jam: t.hhmm,
      shift,
      status,
      source: 'hiview',
      synced_at: new Date().toISOString()
    }
    const cols = { guru_id: String(guru.id), periode: t.date.slice(0, 7), data: rowData }
    if (exRow) {
      const { error } = await db.from('absensi_shift_guru').update(cols).eq('id', docId)
      if (error) throw error
    } else {
      const { error } = await db.from('absensi_shift_guru').insert({ id: docId, ...cols })
      if (error) throw error
    }
    console.log(`[hiview] ${guru.nama} ${t.date} ${t.hhmm} ${shift}/${status}`)
    await catatJejak(db, {
      empNo,
      dateTime,
      tanggal: t.date,
      jam: t.hhmm,
      ...jejakGuru,
      hasil: 'diterima',
      shift,
      status
    })
    return isapiOk(req)
  } catch (e) {
    // 500 -> beri kesempatan mesin retry (error transien DB/jaringan).
    console.error('[hiview] error:', (e as Error)?.message || e)
    return json({ ok: false, error: (e as Error)?.message || 'server' }, 500)
  }
})
