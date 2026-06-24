// supabasePsb.js — F6 (cutover PSB): tulis pendaftaran + baca master/settings ke SUPABASE,
//   pengganti Firestore. Form PSB publik (anon): RLS psb_ins (anon, cek panjang nama) +
//   SELECT publik master/settings. Pakai REST PostgREST LANGSUNG (tanpa @supabase/supabase-js)
//   supaya sub-app tetap ringan & TANPA dependency/instalasi baru.
//
//   ENV WAJIB di build PSB (sama nilai dgn app utama): VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY.
//   Anon key PUBLIK (aman di klien; RLS yang menjaga). Bila env kosong -> error eksplisit.
const SB_URL = import.meta.env.VITE_SUPABASE_URL
const SB_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

function _ensure() {
  if (!SB_URL || !SB_KEY) {
    throw new Error('Supabase belum dikonfigurasi (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).')
  }
}
function _headers(extra = {}) {
  return {
    apikey: SB_KEY,
    Authorization: `Bearer ${SB_KEY}`,
    'Content-Type': 'application/json',
    ...extra
  }
}

/** id text acak (mirror auto-id db.js). */
export function genId(prefix = 'psb') {
  return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

/** Baca kolom `value` jsonb dari tabel key-value (master/settings) by key. Return obj|null. */
export async function sbSelectValue(table, key) {
  _ensure()
  const url = `${SB_URL}/rest/v1/${table}?key=eq.${encodeURIComponent(key)}&select=value&limit=1`
  const r = await fetch(url, { headers: _headers() })
  if (!r.ok) throw new Error(`select ${table} gagal: ${r.status}`)
  const j = await r.json()
  return Array.isArray(j) && j[0] ? j[0].value : null
}

/** Insert 1 baris (bentuk hybrid: kolom riil + `data` jsonb). Lempar error bila gagal. */
export async function sbInsert(table, row) {
  _ensure()
  const r = await fetch(`${SB_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: _headers({ Prefer: 'return=minimal' }),
    body: JSON.stringify(row)
  })
  if (!r.ok) {
    const t = await r.text().catch(() => '')
    const e = new Error(`insert ${table} gagal: ${r.status} ${t}`)
    e.status = r.status
    throw e
  }
}
