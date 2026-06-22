#!/usr/bin/env node
/**
 * F6 prasyarat — SEED tabel CONFIG dari Firestore -> Supabase.
 * Koleksi config/fondasi yang dibutuhkan view sebelum cutover (lihat db.js peta skema).
 * Idempoten: upsert by primary key (re-run aman).
 *
 * SUMBER  : Firestore project portal-mambaul-ulum (ADC akun hallo@bakafrawi.com).
 * TUJUAN  : Supabase (PostgREST) — sesi super_admin `adminmu` (RLS auth_can_manage).
 *
 * MODE:
 *   node functions/scripts/seed-config-supabase.cjs            -> DRY-RUN (hitung saja)
 *   node functions/scripts/seed-config-supabase.cjs --confirm  -> EKSEKUSI upsert
 *
 * PRASYARAT: gcloud auth application-default login  (refresh ADC) — kalau token basi.
 * Sandi admin: env ADMIN_SANDI (default '1234') -> dipad jadi 'mu_auth_<sandi>'.
 */
'use strict'
const admin = require('firebase-admin')
const fs = require('fs')
const path = require('path')

const PROJECT = 'portal-mambaul-ulum'
const CONFIRM = process.argv.includes('--confirm')
const SANDI = process.env.ADMIN_SANDI || '1234'

// cfg per tabel (cermin db.js SPECIAL/COLS): { pk, json, cols }
const CFG = {
  // -- config / fondasi --
  lembaga: { pk: 'id', json: 'data', cols: ['nama', 'urutan'] },
  master: { pk: 'key', json: 'value', cols: [] },
  settings: { pk: 'key', json: 'value', cols: [] },
  profil_pesantren: { pk: 'id', json: 'data', cols: [] },
  pengaturan_keuangan: { pk: 'id', json: 'data', cols: [] },
  kegiatan_master: { pk: 'id', json: 'data', cols: [] },
  // -- konten / sosial --
  beranda_post: { pk: 'id', json: 'data', cols: ['judul', 'isi'] },
  posts: { pk: 'id', json: 'data', cols: ['judul', 'isi'] },
  kegiatan: { pk: 'id', json: 'data', cols: ['judul', 'tgl_mulai'] },
  kegiatan_pesantren: { pk: 'id', json: 'data', cols: ['judul'] },
  kritik_saran: { pk: 'id', json: 'data', cols: ['pesan'] },
  post_reactions: { pk: 'id', json: 'data', cols: [] },
  user_notif_state: { pk: 'id', json: 'data', cols: [] }
}
const GROUPS = {
  config: ['lembaga', 'master', 'settings', 'profil_pesantren', 'pengaturan_keuangan', 'kegiatan_master'],
  content: ['beranda_post', 'posts', 'kegiatan', 'kegiatan_pesantren', 'kritik_saran', 'post_reactions', 'user_notif_state']
}
const GROUP = (process.argv.find((a) => a.startsWith('--group=')) || '--group=config').split('=')[1]
const COLLECTIONS = GROUPS[GROUP] || GROUPS.config

// ---- baca kredensial Supabase dari vue-app/.env.local ----------------------
function loadEnvLocal() {
  const candidates = [
    path.resolve(process.cwd(), 'vue-app/.env.local'),
    path.resolve(__dirname, '../../vue-app/.env.local')
  ]
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      const out = {}
      for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
        const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
        if (m) out[m[1]] = m[2].trim()
      }
      return out
    }
  }
  throw new Error('vue-app/.env.local tak ketemu')
}

// ---- Firestore Timestamp / tipe khusus -> JSON-aman -----------------------
function sanitize(v) {
  if (v === null || v === undefined) return v
  if (typeof v === 'object') {
    if (typeof v.toDate === 'function') return v.toDate().toISOString() // Timestamp
    if (Array.isArray(v)) return v.map(sanitize)
    if (v.constructor && v.constructor.name === 'GeoPoint')
      return { lat: v.latitude, lng: v.longitude }
    const o = {}
    for (const [k, val] of Object.entries(v)) o[k] = sanitize(val)
    return o
  }
  return v
}

// ---- doc Firestore -> baris Supabase (cermin db.js _split) -----------------
function toRow(table, id, data) {
  const { pk, json, cols } = CFG[table]
  const row = {}
  const tail = {}
  for (const [k, v] of Object.entries(data)) {
    if (k === 'id' || k === pk || k === 'createdAt' || k === 'updatedAt') continue
    if (cols.includes(k)) row[k] = v
    else tail[k] = v
  }
  row[pk] = id
  if (json) row[json] = tail
  return row
}

async function supaToken(env) {
  const r = await fetch(`${env.VITE_SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: env.VITE_SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'adminmu@ammu.local', password: 'mu_auth_' + SANDI })
  })
  const d = await r.json()
  if (!d.access_token) throw new Error('login adminmu gagal: ' + JSON.stringify(d).slice(0, 200))
  return d.access_token
}

async function upsert(env, tok, table, rows) {
  const { pk } = CFG[table]
  const r = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/${table}?on_conflict=${pk}`, {
    method: 'POST',
    headers: {
      apikey: env.VITE_SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + tok,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify(rows)
  })
  if (!r.ok) throw new Error(`upsert ${table} HTTP ${r.status}: ${(await r.text()).slice(0, 300)}`)
}

async function main() {
  const env = loadEnvLocal()
  admin.initializeApp({ credential: admin.credential.applicationDefault(), projectId: PROJECT })
  const fsdb = admin.firestore()

  console.log(`MODE: ${CONFIRM ? 'EKSEKUSI (--confirm)' : 'DRY-RUN'}  | grup ${GROUP}  | project ${PROJECT}`)
  const tok = CONFIRM ? await supaToken(env) : null
  let grand = 0
  for (const table of COLLECTIONS) {
    const snap = await fsdb.collection(table).get()
    // settings/admin di-SKIP: RLS settings_sel (key<>'admin') memblok upsert baris ini,
    // dan auth kini via resolve_login (bukan settings/admin legacy).
    const docs = snap.docs.filter((d) => !(table === 'settings' && d.id === 'admin'))
    const rows = docs.map((d) => toRow(table, d.id, sanitize(d.data())))
    grand += rows.length
    console.log(`  ${table.padEnd(22)} : ${String(rows.length).padStart(4)} doc` +
      (rows.length ? `  (contoh id: ${rows.slice(0, 3).map((r) => r[CFG[table].pk]).join(', ')})` : ''))
    if (CONFIRM && rows.length) {
      for (let i = 0; i < rows.length; i += 500) await upsert(env, tok, table, rows.slice(i, i + 500))
    }
  }
  console.log(`\nTOTAL ${grand} doc dari ${COLLECTIONS.length} koleksi.` +
    (CONFIRM ? ' -> ter-upsert ke Supabase ✓' : ' (DRY-RUN — jalankan ulang dgn --confirm utk tulis)'))
}
main().then(() => process.exit(0)).catch((e) => { console.error('GAGAL:', e.message || e); process.exit(1) })
