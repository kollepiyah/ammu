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
// DEPLOY: supabase functions deploy hiview-absen --no-verify-jwt
// SECRET: supabase secrets set HIVIEW_PUSH_SECRET="<8-16 char>"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handlePreflight, json } from '../_shared/cors.ts'
import { deriveShift, statusFor } from './shiftDerive.ts'

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

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre

  // Health/handshake (GET, tanpa auth) — biar "uji koneksi" mesin tampil OK.
  if (req.method === 'GET') return json({ ok: true, service: 'hiview-absen' })
  if (req.method !== 'POST') return json({ ok: false, error: 'method' }, 405)
  if (!authorized(req)) return json({ ok: false, error: 'unauthorized' }, 401)

  const ev = await readEventJson(req)
  const ace = ev?.AccessControllerEvent || ev?.accessControllerEvent || null
  const major = Number(ace?.majorEventType)
  const empNo = String(ace?.employeeNoString ?? ace?.employeeNo ?? '').trim()
  const dateTime = String(ev?.dateTime || ace?.time || ace?.dateTime || '').trim()

  // Hanya event autentikasi orang (major 5 + ada employeeNo). Sisanya diabaikan (200,
  // supaya mesin tak retry-storm & tak tampil "gagal").
  if (!ace || major !== 5 || !empNo) {
    const reason = !ace ? 'no-event' : major !== 5 ? `major=${major}` : 'no-employee'
    return json({ ok: true, ignored: true, reason })
  }
  const t = toWib(dateTime)
  if (!t) return json({ ok: true, ignored: true, reason: 'bad-datetime', dateTime })

  try {
    const db = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )
    const { data: gRow } = await db
      .from('guru')
      .select('*')
      .eq('id_fingerprint', empNo)
      .maybeSingle()
    const guru = flattenGuru(gRow)
    if (!guru) {
      console.log(`[hiview] employeeNo ${empNo} tak terdaftar (guru.id_fingerprint)`)
      return json({ ok: true, unknown: empNo })
    }

    const settings = await fetchSettings(db)
    const shift = deriveShift(t.hhmm, guru, settings)
    if (!shift) return json({ ok: true, outOfWindow: true, guru: guru.nama, jam: t.hhmm })
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
      if (exst === 'izin' || exst === 'sakit') return json({ ok: true, skip: 'izin/sakit', docId })
      const exjam = String(ex.jam || '')
      // scan terdahulu (<=) menang: idempoten + tak tertimpa jam belakangan.
      if (exjam && exjam <= t.hhmm)
        return json({ ok: true, skip: 'scan-terdahulu-menang', existing: exjam, docId })
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
    return json({ ok: true, written: true, guru: guru.nama, tanggal: t.date, jam: t.hhmm, shift, status })
  } catch (e) {
    // 500 -> beri kesempatan mesin retry (error transien DB/jaringan).
    console.error('[hiview] error:', (e as Error)?.message || e)
    return json({ ok: false, error: (e as Error)?.message || 'server' }, 500)
  }
})
