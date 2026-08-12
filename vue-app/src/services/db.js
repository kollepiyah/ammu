// db.js — F4 (migrasi Supabase): adapter CRUD generik API-IDENTIK dengan
// services/firestore.js, tapi target Supabase Postgres (PostgREST + Realtime).
//
// Tujuan: cutover per-koleksi (F6) cukup ganti import
//   `from '@/services/firestore'`  ->  `from '@/services/db'`
// tanpa ubah pemanggil. Bentuk objek yang dikembalikan SAMA dengan Firestore.
//
// Pola HYBRID (lihat supabase/migrations): tiap baris = kolom riil (yang
// difilter/sort/RLS) + 1 kolom jsonb "ekor" (`data`, atau `value`/`akses` utk
// tabel khusus) berisi sisanya. Adapter:
//   - BACA  : flatten -> { id, ...kolomRiil, ...ekorJsonb }  (bentuk Firestore)
//   - TULIS : split   -> { ...kolomRiil, <ekor>: { sisanya } }
//
// OCC (safeSaveDoc) & backup-hapus penuh = port terpisah (dbSafe.js, F6).
// File ini sengaja cermin 1:1 firestore.js: getOne/getAll/queryColl/setOne/
// mergeOne/updateOne/addOne/deleteOne/subscribeColl/subscribeDoc + setAuditSesi.
import { supabase } from './supabase'

function _ensure() {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi (.env.local).')
}

// ============================================================================
// PETA SKEMA (Opsi A) — kolom riil SKALAR per tabel (selain pk, ekor jsonb,
// created_at, updated_at). Sumber kebenaran: supabase/migrations F2.
// Field di luar daftar ini otomatis masuk ke kolom ekor jsonb saat TULIS.
// ============================================================================
const COLS = {
  // -- core --
  santri: [
    'nis',
    'nisn',
    'nik',
    'nama',
    'jk',
    'lembaga',
    'kelas',
    'lembaga_sekolah',
    'kelas_sekolah',
    'juz',
    'wali',
    'wa',
    'aktif',
    'is_mukim',
    'is_fullday',
    'foto'
  ],
  guru: [
    'nama',
    'nik',
    'jk',
    'jabatan',
    'jabatan_tambahan',
    'lembaga',
    'lembaga_sekolah',
    'tipe_pegawai',
    'shift',
    'status',
    'username',
    'wa',
    'foto',
    'role_sistem',
    'id_fingerprint'
  ],
  lembaga: ['nama', 'urutan'],
  // -- keuangan --
  keuangan_tagihan: [
    'santri_id',
    'periode',
    'kategori',
    'nominal',
    'terbayar',
    'status',
    'tanggal'
  ],
  keuangan_buku_induk: ['tipe', 'sumber', 'nominal', 'tanggal', 'keterangan'],
  keuangan_tabungan_santri: ['santri_id', 'jenis', 'nominal', 'tanggal'],
  keuangan_uang_saku_santri: ['santri_id', 'jenis', 'nominal', 'tanggal'],
  // keranjang/niat-bayar VA BMT (items+santri_nama -> data jsonb; created_by default DB)
  keuangan_va_intent: ['santri_id', 'va', 'total', 'status'],
  keuangan_gaji: [
    'guru_id',
    'periode',
    'bisyaroh_pokok',
    'total_pemasukan',
    'total_potongan',
    'tunjangan_list',
    'potongan_list'
  ],
  keuangan_hutang_piutang: ['nominal'],
  keuangan_pembayaran: ['santri_id', 'nominal', 'tanggal'],
  tabungan_mutasi: ['ref_id', 'nominal'],
  pembayaran_konfirmasi: ['santri_id', 'nominal', 'status', 'tanggal_transfer'],
  pembayaran_transfer_pending: ['santri_id', 'nominal', 'status'],
  pengaturan_keuangan: [],
  // -- akademik --
  absensi: ['santri_id', 'tanggal', 'lembaga', 'kelas', 'status'],
  absensi_guru: ['guru_id', 'tanggal'],
  absensi_shift_guru: ['guru_id', 'periode'],
  // Jejak scan mesin HiView — ditulis edge function (service-role), dibaca panel
  // diagnosa di Absensi Guru. Tanpa baris ini, `tanggal`/`hasil` akan dicari di
  // dalam jsonb dan filter per-hari tak akan pernah cocok.
  hiview_scan_log: ['tanggal', 'employee_no', 'guru_id', 'hasil'],
  absensi_kegiatan: [],
  absensi_santri_sekolah: ['santri_id', 'tanggal'],
  absensi_santri_sekolah_bulanan: ['santri_id', 'periode', 'sakit', 'izin', 'alpa', 'hadir'],
  absensi_santri_ngaji_bulanan: ['santri_id', 'periode', 'sakit', 'izin', 'alpa', 'hadir'],
  rapor_semester: ['santri_id', 'lembaga', 'semester', 'tahun_ajaran'],
  rekap_diniyah: ['santri_id'],
  rekap_prestasi: ['santri_id', 'lembaga', 'kelas'],
  riwayat_prestasi: ['santri_id', 'periode'],
  notif_prestasi: ['santri_id'],
  riwayat_kenaikan: ['santri_id', 'tanggal'],
  tes_kenaikan: ['santri_id', 'lembaga', 'status'],
  // Tes Glondongan PTPT (muroja'ah kumulatif) — 1 baris = 1 blok. data jsonb ekor:
  //   { nama_cache, juz_dari, juz_sampai, nilai:{<juz>:{tahfizh,istimror,fashohah,tajwid}}, catatan, penguji_nama, ditugaskan_oleh, tgl_* }
  tes_glondongan: [
    'santri_id',
    'ajuan_id',
    'tipe',
    'kelas_asal',
    'status',
    'penguji_id',
    'periode'
  ],
  // Tes Sekolah — 1 baris = 1 ajuan tes (santri × materi). Nilainya TAK ke rapor.
  //   data jsonb ekor: { nama_cache, kelas_sekolah, materi_nama_cache, pengaju_id,
  //   pengaju_nama, penguji_nama, tgl_ajuan, tgl_hasil, nilai, lulus, catatan }
  tes_sekolah: ['santri_id', 'materi_id', 'lembaga_sekolah', 'status', 'penguji_id', 'periode'],
  // Ceremonial PTPT — 1 baris = 1 SESI. data jsonb ekor:
  //   { judul, jam_selesai, tempat, catatan, peserta:[{santri_id,nama,kelas,juz,ajuan_id,tgl_lulus_pj}],
  //     penyimak_guru:[{id,nama}], penyimak_santri:[{id,nama}], dibuat_oleh, tgl_buat }
  ceremonial_ptpt: ['tanggal', 'jam_mulai', 'status', 'periode'],
  izin_guru: ['guru_id', 'status'],
  supervisi_catatan: ['target_type', 'target_id', 'judul', 'catatan'],
  // -- konten & sistem --
  posts: ['judul', 'isi'],
  beranda_post: ['judul', 'isi'],
  kegiatan: ['judul', 'tgl_mulai'],
  kegiatan_pesantren: ['judul'],
  kegiatan_master: [],
  profil_pesantren: [],
  kritik_saran: ['pesan'],
  pengaduan: ['pesan'],
  psb_pendaftaran: ['nama'],
  notif_queue: ['judul', 'pesan'],
  audit_log: ['aksi', 'collection', 'doc_id', 'user_id'],
  backup_hapus: [],
  scheduled_jobs: [],
  user_notif_state: [],
  link_preview_cache: []
}

// Tabel dgn pk / kolom ekor jsonb NON-standar (default: pk='id', ekor='data').
const SPECIAL = {
  master: { pk: 'key', json: 'value', cols: [] },
  settings: { pk: 'key', json: 'value', cols: [] },
  profiles: {
    pk: 'id',
    json: 'akses',
    cols: ['login_key', 'role', 'role_sistem', 'supervisi', 'pengaduan', 'santri_id', 'guru_id']
  }
}

// Realtime HANYA whitelist (mirror migrations/...realtime_grants). Selain ini:
// subscribe* = fetch sekali lalu unsubscribe no-op.
// WAJIB CERMIN DB: tiap entri HARUS juga ada di publication supabase_realtime (ALTER
// PUBLICATION) — kalau tidak, channel subscribe tapi DB tak pernah kirim event (live diam).
// v.110: +keuangan_tagihan, +pembayaran_transfer_pending, +absensi_shift_guru.
// v.110.0625: pulihkan perilaku onSnapshot lama (edit langsung tampil tanpa refresh) —
//   tambah master-data + transaksional yang di-subscribe (santri/guru/master/dst).
//   Skip audit_log (log append-heavy). Cermin migration ...realtime_add_master_data.sql.
const REALTIME = new Set([
  'beranda_post',
  'posts',
  'post_reactions',
  'rekap_prestasi',
  'riwayat_prestasi',
  'notif_prestasi',
  'riwayat_kenaikan',
  'tes_kenaikan',
  'tes_glondongan',
  'tes_sekolah',
  'ceremonial_ptpt',
  'user_notif_state',
  'kritik_saran',
  'pengaduan',
  'supervisi_catatan',
  'absensi_guru',
  'keuangan_buku_induk',
  'keuangan_tagihan',
  'pembayaran_transfer_pending',
  'absensi_shift_guru',
  // v.110.0625 — master data & config
  'santri',
  'guru',
  'master',
  'lembaga',
  'settings',
  // v.110.0625 — akademik & izin
  'izin_guru',
  'rapor_semester',
  'rekap_diniyah',
  // v.110.0625 — keuangan transaksional
  'keuangan_gaji',
  'keuangan_hutang_piutang',
  'keuangan_tabungan_santri',
  'keuangan_uang_saku_santri',
  'keuangan_va_intent',
  // v.110.0625 — konten & PSB
  'kegiatan',
  'psb_pendaftaran',
  // v.110.0625 — rekap absensi bulanan (bukan raw harian)
  'absensi_santri_ngaji_bulanan',
  'absensi_santri_sekolah_bulanan'
])

function _cfg(table) {
  if (SPECIAL[table]) return SPECIAL[table]
  const cols = COLS[table]
  if (!cols && import.meta.env.DEV) {
    console.warn(
      `[db] tabel "${table}" tak ada di peta skema — semua field non-id masuk ke data jsonb.`
    )
  }
  return { pk: 'id', json: 'data', cols: cols || [] }
}

// ---- flatten / split ------------------------------------------------------
/** Baris DB -> bentuk Firestore: { id, ...kolomRiil, ...ekorJsonb }.
 *  Kolom riil menimpa ekor bila bentrok (kolom = sumber kebenaran terindeks). */
function _flatten(table, row) {
  if (!row) return null
  const { pk, json } = _cfg(table)
  const rest = { ...row }
  const tail = json ? rest[json] || {} : {}
  if (json) delete rest[json]
  const out = { ...tail, ...rest }
  if (pk !== 'id') out.id = row[pk] // ekspos alias id utk pk non-standar (master/settings)
  return out
}

/** Objek app (bentuk Firestore) -> baris DB { ...kolomRiil, <ekor>: {...} }.
 *  id -> pk. created_at/updated_at DIBUANG (dikelola default + trigger DB). */
function _split(table, obj) {
  const { pk, json, cols } = _cfg(table)
  const row = {}
  const tail = {}
  for (const [k, v] of Object.entries(obj)) {
    if (k === 'id' || k === pk) {
      row[pk] = v
      continue
    }
    if (k === 'created_at' || k === 'updated_at') continue
    if (cols.includes(k)) row[k] = v
    else if (json) tail[k] = v
  }
  if (json) row[json] = tail
  return row
}

function _isPlainObj(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}
/** Deep-merge (cermin setDoc merge:true): map bersarang digabung, array/primitif diganti. */
function _deepMerge(base, patch) {
  const out = { ...base }
  for (const [k, v] of Object.entries(patch)) {
    out[k] = _isPlainObj(v) && _isPlainObj(out[k]) ? _deepMerge(out[k], v) : v
  }
  return out
}

/** Resolusi nama field -> referensi kolom PostgREST (kolom riil apa adanya;
 *  field ekor -> `<json>->>field`). Dipakai filter/order. */
function _colRef(table, field) {
  const { pk, json, cols } = _cfg(table)
  if (field === 'id') return pk
  if (field === pk || field === 'created_at' || field === 'updated_at' || cols.includes(field))
    return field
  return json ? `${json}->>${field}` : field
}

// ---- query builder helpers ------------------------------------------------
function _applyFilters(q, table, filters) {
  for (const [field, op, val] of filters) {
    const ref = _colRef(table, field)
    switch (op) {
      case '==':
        q = q.eq(ref, val)
        break
      case '!=':
        q = q.neq(ref, val)
        break
      case '<':
        q = q.lt(ref, val)
        break
      case '<=':
        q = q.lte(ref, val)
        break
      case '>':
        q = q.gt(ref, val)
        break
      case '>=':
        q = q.gte(ref, val)
        break
      case 'in':
        q = q.in(ref, val)
        break
      case 'not-in':
        q = q.not(ref, 'in', `(${val.join(',')})`)
        break
      case 'array-contains':
        q = q.contains(ref, [val])
        break
      case 'array-contains-any':
        q = q.overlaps(ref, val)
        break
      default:
        q = q.eq(ref, val)
    }
  }
  return q
}
function _applyOrders(q, table, orders) {
  for (const [field, dir] of orders) {
    q = q.order(_colRef(table, field), { ascending: String(dir).toLowerCase() !== 'desc' })
  }
  return q
}

/** Ambil SEMUA baris (page 1000) supaya cocok getAll Firestore (tanpa cap PostgREST). */
async function _pageAll(build) {
  const PAGE = 1000
  let from = 0
  const out = []

  while (true) {
    const { data, error } = await build().range(from, from + PAGE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    out.push(...data)
    if (data.length < PAGE) break
    from += PAGE
  }
  return out
}

function _genId() {
  // id text acak (mirror auto-id Firestore) — addOne tanpa id eksplisit.
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

// ============================================================================
// API publik — cermin firestore.js
// ============================================================================

/** Get satu dokumen by ID. Return null kalau tidak ada. */
export async function getOne(collectionName, id) {
  _ensure()
  const { pk } = _cfg(collectionName)
  const { data, error } = await supabase.from(collectionName).select('*').eq(pk, id).maybeSingle()
  if (error) throw error
  return _flatten(collectionName, data)
}

/** Get semua dokumen dari collection (tanpa filter). */
export async function getAll(collectionName) {
  _ensure()
  const rows = await _pageAll(() => supabase.from(collectionName).select('*'))
  return rows.map((r) => _flatten(collectionName, r))
}

/** Query: filter + order + limit.
 *  Contoh: queryColl('santri', [['lembaga','==','PTPT']], [['nama','asc']], 50) */
export async function queryColl(collectionName, filters = [], orders = [], limitN = 0) {
  _ensure()
  const build = () => {
    let q = supabase.from(collectionName).select('*')
    q = _applyFilters(q, collectionName, filters)
    q = _applyOrders(q, collectionName, orders)
    return q
  }
  let rows
  if (limitN > 0) {
    const { data, error } = await build().limit(limitN)
    if (error) throw error
    rows = data || []
  } else {
    rows = await _pageAll(build)
  }
  return rows.map((r) => _flatten(collectionName, r))
}

/** Tulis 1 baris penuh: UPDATE bila row SUDAH ADA, INSERT bila BELUM.
 *  Mengganti upsert(onConflict) tunggal yang SELALU memicu kebijakan RLS INSERT
 *  (mis. guru_ins = auth_can_manage, admin-only) walau cuma meng-update — itu
 *  bikin 403 "new row violates RLS" saat guru/santri edit BARIS-NYA SENDIRI
 *  (yang seharusnya lolos kebijakan *_upd_self UPDATE, bukan INSERT). */
async function _putRow(collectionName, id, fullDoc, exists) {
  const { pk } = _cfg(collectionName)
  const row = _split(collectionName, { ...fullDoc, id })
  if (exists) {
    const upd = { ...row }
    delete upd[pk] // jangan ubah pk
    // .select(pk) supaya baris yang BERUBAH ikut terbaca. UPDATE yang ditolak kebijakan RLS
    // TIDAK memberi error — PostgREST cuma balas 204/0 baris — jadi tanpa cek ini penolakan
    // lolos sebagai "sukses", UI bilang tersimpan, lalu data tampak "balik ke nilai lama"
    // sesudah refresh. Aman: _putRow(exists=true) hanya dicapai setelah getOne() berhasil,
    // jadi baris ini pasti lolos kebijakan SELECT.
    const { data, error } = await supabase
      .from(collectionName)
      .update(upd)
      .eq(pk, String(id))
      .select(pk)
    if (error) throw error
    if (!data || data.length === 0) {
      throw new Error(
        `Gagal menyimpan ${collectionName}/${id}: tak ada baris yang berubah (kemungkinan ditolak RLS / hak akses kurang).`
      )
    }
  } else {
    const { error } = await supabase.from(collectionName).insert(row)
    if (error) throw error
  }
}

/** Set (overwrite) dokumen. HATI-HATI: menimpa SELURUH dokumen. Untuk update
 *  sebagian field pakai mergeOne. Existence-aware (UPDATE/INSERT, lihat _putRow). */
export async function setOne(collectionName, id, data) {
  _ensure()
  const exists = !!(await getOne(collectionName, id))
  await _putRow(collectionName, id, data, exists)
}

/** Set/merge sebagian field (deep-merge, pertahankan field lain + buat bila belum
 *  ada). Cermin setDoc(merge:true). Read-modify-write (bukan atomik; OCC = dbSafe). */
export async function mergeOne(collectionName, id, data) {
  _ensure()
  const existing = await getOne(collectionName, id)
  const merged = existing ? _deepMerge(existing, data) : { ...data }
  await _putRow(collectionName, id, merged, !!existing)
}

/** Update partial fields (shallow, cermin updateDoc: ganti field top-level yang
 *  diberikan, sisanya tetap). Field kolom-riil murni -> UPDATE langsung (cepat,
 *  tanpa read); kalau menyentuh ekor jsonb -> read-modify-write.
 *
 *  TIDAK meng-UPSERT: baris yang tak ada -> throw (cermin updateDoc Firestore yang
 *  melempar NOT_FOUND). Dulu jalur jsonb diam-diam INSERT sehingga `updateOne` pada
 *  baris terhapus/salah-id membuat STUB row cacat (cuma field partial, tanpa kolom
 *  wajib) yang lalu gagal validasi di tempat lain. Semua pemanggil diaudit: tak ada
 *  yang memakai updateOne untuk MEMBUAT baris — yang perlu itu pakai setOne/mergeOne
 *  (mis. RekapDiniyahView `if (existing) updateOne else setOne`). */
export async function updateOne(collectionName, id, partial) {
  _ensure()
  const { pk, json, cols } = _cfg(collectionName)
  const allCols = Object.keys(partial).every((k) => k === 'id' || k === pk || cols.includes(k))
  if (allCols) {
    const row = _split(collectionName, partial)
    delete row[pk] // jangan ubah pk
    delete row[json]
    // .select(pk) supaya baris yang BERUBAH ikut terbaca — alasan sama dgn _putRow: UPDATE
    // yang ditolak kebijakan RLS TIDAK memberi error, PostgREST cuma balas 204/0 baris.
    const { data, error } = await supabase
      .from(collectionName)
      .update(row)
      .eq(pk, String(id))
      .select(pk)
    if (error) throw error
    if (data && data.length > 0) return
    // 0 baris DI SINI ambigu — beda dgn _putRow(exists=true) yang sudah lolos getOne dulu:
    // (a) baris memang tak ada, atau (b) ada tapi UPDATE ditolak RLS. Satu getOne memisahkan
    // keduanya supaya pesannya tidak menyesatkan. Keduanya WAJIB throw: diam-diam no-op =
    // pemanggil kira tersimpan, lalu data tampak "balik" sesudah refresh.
    const existing = await getOne(collectionName, id)
    throw new Error(
      existing
        ? `Gagal menyimpan ${collectionName}/${id}: tak ada baris yang berubah (kemungkinan ditolak RLS / hak akses kurang).`
        : `Gagal menyimpan ${collectionName}/${id}: baris tidak ditemukan (mungkin sudah dihapus, atau tak terbaca karena RLS).`
    )
  }
  const existing = await getOne(collectionName, id)
  if (!existing) {
    // Sengaja SAMA dgn pesan jalur cepat di atas: satu perilaku, tak peduli field-nya
    // kolom riil atau ekor jsonb. (getOne pakai maybeSingle -> null juga bila SELECT
    // ditolak RLS; pesannya sengaja menyebut dua kemungkinan itu.)
    throw new Error(
      `Gagal menyimpan ${collectionName}/${id}: baris tidak ditemukan (mungkin sudah dihapus, atau tak terbaca karena RLS).`
    )
  }
  const merged = { ...existing, ...partial } // shallow (semantik updateDoc)
  await _putRow(collectionName, id, merged, true)
}

/** Add dokumen baru. Pakai id dari data kalau ada, jika tidak generate. Return id. */
export async function addOne(collectionName, data) {
  _ensure()
  const { pk } = _cfg(collectionName)
  const id = data.id || _genId()
  const row = _split(collectionName, { ...data, id })
  const { error } = await supabase.from(collectionName).insert(row)
  if (error) throw error
  return row[pk]
}

// v.91.0626 (Firestore): sesi aktif utk atribusi audit_log saat hapus.
let _auditSesi = null
export function setAuditSesi(s) {
  _auditSesi = s || null
}

/** Backup snapshot ke audit_log SEBELUM hapus (best-effort; gagal TIDAK memblok).
 *  Bentuk payload mirror firestoreSafe.backupSebelumHapus. */
async function _backupHapus(collectionName, id, snapshot, alasan, sesi) {
  try {
    const auditId = `del_${collectionName}_${id}_${Date.now()}`
    await supabase.from('audit_log').insert(
      _split('audit_log', {
        id: auditId,
        aksi: 'delete',
        collection: collectionName,
        doc_id: String(id),
        user_id: String(sesi?.id || 'unknown'),
        data_snapshot: snapshot ? JSON.stringify(snapshot).slice(0, 50000) : '',
        alasan: alasan || '',
        user_nama: sesi?.nama || sesi?.guru || 'unknown',
        timestamp: new Date().toISOString()
      })
    )
    return auditId
  } catch (e) {
    console.warn('[db] backup audit_log gagal:', e?.message || e)
    return null
  }
}

/** Delete dokumen — backup snapshot ke audit_log DULU (recovery), lalu hapus.
 *  opts: { alasan?, sesi?, skipBackup? } (cermin firestore.deleteOne). */
export async function deleteOne(collectionName, id, opts = {}) {
  _ensure()
  const { pk } = _cfg(collectionName)
  if (!opts.skipBackup) {
    try {
      const snap = await getOne(collectionName, id)
      if (snap)
        await _backupHapus(collectionName, id, snap, opts.alasan || '', opts.sesi || _auditSesi)
    } catch (e) {
      /* backup best-effort — jangan blokir hapus */
    }
  }
  const { error } = await supabase.from(collectionName).delete().eq(pk, String(id))
  if (error) throw error
}

// ---- realtime / subscribe -------------------------------------------------
/** Jeda penggabungan event realtime (ms). AUDIT AGU 2026 (P4): tiap event
 *  postgres_changes dulu memicu tarikan tabel PENUH-nya sendiri. Satu keranjang POS
 *  3 item = 3 INSERT keuangan_buku_induk + 3 UPDATE keuangan_tagihan = 6 event ->
 *  6x tarik-ulang tabel penuh (tagihan 2.805 baris per 3 Agu), di SETIAP komponen
 *  yang berlangganan DAN setiap perangkat yang sedang online. Itu penyebab paling
 *  nyata "PC kasir terasa berat sesudah menyimpan". Kini event digabung: satu
 *  tarikan, sesaat sesudah event TERAKHIR. Efek ke pengguna cuma jeda tampil
 *  <0,5 detik; angka uang tak tersentuh (ini murni jalur BACA). */
const RT_DEBOUNCE_MS = 400

/** Subscribe collection — return unsubscribe function.
 *  Whitelist realtime -> channel postgres_changes (refetch penuh tiap perubahan,
 *  cermin onSnapshot kirim seluruh set) tapi DIGABUNG lewat RT_DEBOUNCE_MS.
 *  Non-whitelist -> fetch sekali + no-op. */
export function subscribeColl(collectionName, callback, filters = [], orders = []) {
  _ensure()
  const fetchAll = () =>
    queryColl(collectionName, filters, orders)
      .then(callback)
      .catch((err) => console.error(`[subscribeColl] ${collectionName} error:`, err))

  if (!REALTIME.has(collectionName)) {
    fetchAll()
    return () => {} // non-whitelist: tak ada channel
  }
  fetchAll()
  let timer = null
  let lepas = false
  const fetchGabung = () => {
    if (lepas) return
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      if (!lepas) fetchAll()
    }, RT_DEBOUNCE_MS)
  }
  const ch = supabase
    .channel(`rt-${collectionName}-${Math.random().toString(36).slice(2, 8)}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: collectionName }, fetchGabung)
    .subscribe()
  return () => {
    lepas = true
    if (timer) clearTimeout(timer) // jangan tarik data untuk komponen yang sudah dilepas
    try {
      supabase.removeChannel(ch)
    } catch {
      /* noop */
    }
  }
}

/** Subscribe satu dokumen. Whitelist -> channel filter id; else fetch sekali. */
export function subscribeDoc(collectionName, id, callback) {
  _ensure()
  const { pk } = _cfg(collectionName)
  const fetchOne = () =>
    getOne(collectionName, id)
      .then(callback)
      .catch((err) => console.error(`[subscribeDoc] ${collectionName}/${id} error:`, err))

  if (!REALTIME.has(collectionName)) {
    fetchOne()
    return () => {}
  }
  fetchOne()
  // Digabung sama seperti subscribeColl — 1 baris memang murah, tapi settings/master
  // disimpan per-field sehingga satu klik "Simpan" bisa memicu beberapa event.
  let timer = null
  let lepas = false
  const fetchGabung = () => {
    if (lepas) return
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      if (!lepas) fetchOne()
    }, RT_DEBOUNCE_MS)
  }
  const ch = supabase
    .channel(`rt-${collectionName}-${id}-${Math.random().toString(36).slice(2, 8)}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: collectionName, filter: `${pk}=eq.${id}` },
      fetchGabung
    )
    .subscribe()
  return () => {
    lepas = true
    if (timer) clearTimeout(timer)
    try {
      supabase.removeChannel(ch)
    } catch {
      /* noop */
    }
  }
}

// ---- shim Timestamp Firebase (agar pemanggil lama tak meledak saat cutover) -
/** Pengganti serverTimestamp(): ISO string (DB punya default/trigger sendiri). */
export function serverTimestamp() {
  return new Date().toISOString()
}
export const Timestamp = {
  now: () => new Date().toISOString(),
  fromDate: (d) => (d instanceof Date ? d : new Date(d)).toISOString()
}

// Helper murni di-ekspos utk sanity-test / dbSafe (F6). Bukan API utama.
export const _internal = {
  flatten: _flatten,
  split: _split,
  colRef: _colRef,
  deepMerge: _deepMerge,
  cfg: _cfg,
  COLS,
  SPECIAL,
  REALTIME
}
