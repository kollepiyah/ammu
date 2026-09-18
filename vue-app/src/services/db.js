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
  // Tes Sekolah — 1 baris = 1 ajuan tes (santri × materi). Tak menyentuh rapor_semester
  //   (Ammu tak punya rapor sekolah; nilainya diinput wali kelas di luar aplikasi).
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

/** Baris MENTAH (bentuk DB, belum di-flatten). Jalur baca queryColl, dan juga salinan
 *  lokal subscribeColl — yang butuh bentuk DB untuk menilai payload realtime. */
async function _tarikMentah(collectionName, filters = [], orders = [], limitN = 0) {
  const build = () => {
    let q = supabase.from(collectionName).select('*')
    q = _applyFilters(q, collectionName, filters)
    q = _applyOrders(q, collectionName, orders)
    return q
  }
  if (limitN > 0) {
    const { data, error } = await build().limit(limitN)
    if (error) throw error
    return data || []
  }
  return _pageAll(build)
}

/** Query: filter + order + limit.
 *  Contoh: queryColl('santri', [['lembaga','==','PTPT']], [['nama','asc']], 50) */
export async function queryColl(collectionName, filters = [], orders = [], limitN = 0) {
  _ensure()
  const rows = await _tarikMentah(collectionName, filters, orders, limitN)
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
 *  <0,5 detik; angka uang tak tersentuh (ini murni jalur BACA).
 *
 *  v.1.4.4: event subscribeColl tak lagi memicu tarikan penuh sama sekali (lihat
 *  "event realtime DITERAPKAN" di bawah). Jeda yang sama kini menggabungkan
 *  PENERAPAN-nya — satu keranjang POS tetap satu kali callback, satu kali hitung
 *  ulang layar — dan tetap menggabungkan tarikan penuh jalur pemulihan. */
const RT_DEBOUNCE_MS = 400

// ---- v.1.4.2 · langganan realtime yang MENYEMBUHKAN DIRI --------------------
//
// AUDIT 12 Sep 2026, menjawab laporan Kyai "banyak beberapa kurang stabil dalam
// pemakaian". Ini temuan yang paling menjelaskan rasa itu, dan diam-diam:
//
//   `subscribeColl` menarik data SEKALI, lalu bersandar sepenuhnya pada channel
//   realtime untuk pembaruan berikutnya. Channel itu dipasang dengan `.subscribe()`
//   TANPA callback status — jadi ketika ia mati, tak ada satu pun yang tahu.
//
// Channel realtime MEMANG mati secara rutin, bukan karena kerusakan:
//   · HP/laptop tidur atau aplikasi ditinggal di latar (WebView Android & Electron
//     memutus WebSocket yang menganggur),
//   · jaringan berpindah (WiFi pondok ↔ data seluler),
//   · token Supabase diperbarui, dan
//   · server memutus channel yang menganggur terlalu lama.
//
// Akibatnya bagi pemakai: daftar tampak NORMAL tapi isinya beku di keadaan terakhir
// sebelum perangkatnya tidur. Pembayaran yang baru masuk tak muncul, absensi yang
// baru disimpan operator lain tak kelihatan, dan satu-satunya obat adalah memuat
// ulang aplikasi. Tak ada pesan galat — persis bentuk "kurang stabil" yang sulit
// dilaporkan karena tak ada yang bisa ditunjuk.
//
// PERBAIKANNYA dua lapis:
//   1. Status channel dipantau. `CHANNEL_ERROR` / `TIMED_OUT` / `CLOSED` -> pasang
//      ulang dengan jeda menaik (1s, 3s, 8s, 20s, 60s) supaya jaringan yang sedang
//      buruk tidak dihujani percobaan. Begitu tersambung LAGI, data ditarik sekali:
//      event yang terjadi selagi channel mati tak pernah dikirim ulang oleh server.
//   2. Perangkat kembali dipakai -> data disegarkan. Satu pendengar global untuk
//      SELURUH langganan (`visibilitychange` + `online`), bukan satu per langganan.
//
// Kedua lapis memakai `fetchGabung` yang sama, jadi penggabungan 400 ms hasil audit
// Agu 2026 tetap berlaku: badai event maupun badai bangun-tidur sama-sama menjadi
// SATU tarikan per koleksi.
//
// INSIDEN 14–17 Sep 2026 — egress 19,42 GB dari kuota 5 GB, proyek dibatasi Supabase,
// tak seorang pun bisa login. Lapis 1 di atas membuat perulangan tanpa ujung:
// `removeChannel(ch)` di realtime-js MENGABARKAN `CLOSED` ke callback channel yang kita
// buang sendiri, dan kabar itu terbaca "putus lagi" -> pasang ulang -> SUBSCRIBED ->
// tarik tabel PENUH -> buang -> CLOSED -> ... tiap ±1 detik, selamanya, untuk setiap
// langganan di setiap perangkat yang pernah sekali saja putus. Penjaganya ada tiga:
//   · kabar dari channel yang BUKAN channel aktif diabaikan (`ch !== kanal`),
//   · jeda menaik baru kembali ke nol sesudah sambungan bertahan RT_STABIL_MS, jadi
//     channel yang diterima lalu diputus server berulang-ulang tetap melambat, dan
//   · lapis 2 hanya menyegarkan sesudah jendela benar-benar lama tersembunyi.
const RT_ULANG_MS = [1000, 3000, 8000, 20000, 60000]
const RT_STABIL_MS = 30000
// Jangan menarik ulang koleksi yang BARU SAJA ditarik.
const RT_JEDA_SEGAR_MS = 30000
// Kembali ke jendela hanya menyegarkan bila jendela itu tersembunyi SELAMA ini. Minimize
// dan pindah aplikasi di HP dilaporkan `hidden`, begitu pula (Chromium di Windows) jendela
// yang tertutup penuh jendela lain — berpindah ke Excel dan kembali saat menyalin data
// tak boleh menarik ulang setiap tabel. Perangkat yang tidur sungguhan melewati ini.
const RT_SEGAR_SESUDAH_SEMBUNYI_MS = 60000

const _penyegar = new Set()
let _pendengarTerpasang = false
let _tersembunyiSejak = 0
function _pasangPendengarGlobal() {
  if (_pendengarTerpasang) return
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  _pendengarTerpasang = true
  const segarkan = () => {
    for (const f of [..._penyegar]) {
      try {
        f()
      } catch {
        /* satu langganan gagal tak boleh menghentikan yang lain */
      }
    }
  }
  window.addEventListener('online', segarkan)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (!_tersembunyiSejak) _tersembunyiSejak = Date.now()
      return
    }
    const lama = _tersembunyiSejak ? Date.now() - _tersembunyiSejak : 0
    _tersembunyiSejak = 0
    if (lama >= RT_SEGAR_SESUDAH_SEMBUNYI_MS) segarkan()
  })
}

/** Pasang channel realtime yang memasang ulang dirinya saat putus.
 *  @param {string} namaDasar prefix nama channel (keunikan ditambahkan di sini).
 *  @param {(ch:any)=>any} daftarkan pasang `.on(...)` yang sesuai, kembalikan channel.
 *  @param {()=>void} fetchGabung penarik data ber-debounce milik langganan itu.
 *  @returns {()=>void} pelepas. */
function _pasangChannelTahanPutus(namaDasar, daftarkan, fetchGabung) {
  let ch = null
  let lepas = false
  let percobaan = 0
  let timerUlang = null
  let pernahTersambung = false
  let tersambungSejak = 0

  const buang = () => {
    // `ch` dikosongkan SEBELUM removeChannel: CLOSED milik channel yang dibuang bisa
    // datang SINKRON (soket sedang putus -> phoenix membalas `leave` seketika), dan saat
    // itu ia sudah harus terbaca sebagai channel lama.
    const lama = ch
    ch = null
    if (!lama) return
    try {
      supabase.removeChannel(lama)
    } catch {
      /* noop */
    }
  }
  const jadwalUlang = () => {
    if (lepas || timerUlang) return
    const jeda = RT_ULANG_MS[Math.min(percobaan, RT_ULANG_MS.length - 1)]
    percobaan++
    timerUlang = setTimeout(() => {
      timerUlang = null
      if (lepas) return
      buang()
      pasang()
    }, jeda)
  }
  const pasang = () => {
    if (lepas) return
    const kanal = daftarkan(
      supabase.channel(`${namaDasar}-${Math.random().toString(36).slice(2, 8)}`)
    )
    ch = kanal
    kanal.subscribe((status) => {
      // Kabar dari channel yang sudah kita buang (removeChannel -> CLOSED) BUKAN tanda
      // putus. Tanpa penjaga ini: insiden egress 14–17 Sep 2026.
      if (lepas || ch !== kanal) return
      if (status === 'SUBSCRIBED') {
        tersambungSejak = Date.now()
        // Pulih sendiri (rejoin bawaan phoenix) -> pemasangan ulang tak perlu lagi.
        if (timerUlang) {
          clearTimeout(timerUlang)
          timerUlang = null
        }
        // Hanya pada sambungan ULANG — tarikan pertama sudah dilakukan pemanggil.
        if (pernahTersambung) fetchGabung()
        pernahTersambung = true
        return
      }
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
        if (tersambungSejak && Date.now() - tersambungSejak >= RT_STABIL_MS) percobaan = 0
        tersambungSejak = 0
        jadwalUlang()
      }
    })
  }
  pasang()
  return () => {
    lepas = true
    if (timerUlang) clearTimeout(timerUlang)
    buang()
  }
}

// ---- v.1.4.4 · event realtime DITERAPKAN, bukan ditarik ulang ----------------
//
// Sampai v.1.4.3, SETIAP event postgres_changes berakhir di tarikan tabel PENUH: satu
// INSERT di keuangan_buku_induk membuat setiap perangkat yang berlangganan mengunduh
// ulang seluruh buku induk — sekali per LANGGANAN, dan satu perangkat bisa punya
// beberapa (store koleksi, Buku Induk, Laporan, Pembayaran, grafik dasbor). Penggabungan
// 400 ms hanya memadatkan badai; satu baris baru tetap = N tabel utuh. Dengan egress
// Free Plan 5 GB per siklus dan pemakaian normal ±0,05–0,2 GB/hari sebelum insiden
// 14–17 Sep 2026, tak ada ruang untuk itu.
//
// Padahal payload event sudah MEMBAWA barisnya, dan bentuknya sama dengan jawaban
// PostgREST: server Realtime membentuk `record` lewat `to_jsonb(nilai::tipe)`
// (realtime.apply_rls), jadi timestamptz sama-sama "…T…+00:00" dan jsonb sama-sama objek.
// Kini payload itu diterapkan langsung ke salinan lokal langganan, lewat `_flatten` yang
// sama dengan jalur baca. Tarikan penuh TETAP dipakai untuk tarikan awal dan untuk
// tarikan susulan sesudah tersambung ulang / perangkat dipakai lagi — event selagi putus
// tak pernah dikirim ulang server, jadi di situ memang tak ada jalan lain.
//
// Payload TIDAK dipercaya begitu saja. Baris yang tak bisa dipastikan ditanyakan ke
// server BERDASARKAN ID (`id=in.(…)` + penyaring pemanggil: satu permintaan kecil per
// gelombang, bukan satu tabel):
//   · UPDATE tanpa REPLICA IDENTITY FULL (tak satu tabel pun di sini memakainya)
//     MEMBUANG kolom ber-TOAST yang tak ikut berubah — `data` jsonb yang besar, `foto`,
//     `isi` pos. Menerapkannya apa adanya = field lenyap dari layar. Maka baris yang
//     kolomnya kurang dibanding baris hasil tarikan -> ditanyakan.
//   · `errors` terisi (mis. 413: baris > 1 MB, dikirim terpotong) -> ditanyakan.
//   · Penyaring pemanggil dinilai di klien HANYA bila jawabannya pasti sama dengan
//     jawaban Postgres (lihat `_cocokFilter`); selebihnya server yang memutuskan.
// Tarikan penuh hanya untuk yang tak terbaca sama sekali: payload tanpa primary key
// (post_reactions ber-PK gabungan), bentuk event yang tak dikenal, atau lebih dari
// RT_TARIK_ID_MAKS baris yang harus ditanyakan dalam satu gelombang.
//
// RLS: untuk INSERT/UPDATE server Realtime hanya mengirim baris yang boleh DIBACA
// pelanggan itu, jadi jalur ini tak membocorkan apa pun. DELETE tak bisa dinilai RLS
// (barisnya sudah tiada), jadi dikirim ke semua pelanggan dengan primary key saja —
// cukup untuk membuang barisnya bila ada, dan tak berbuat apa-apa bila tidak.
// Batas yang TERSISA: baris yang berubah sampai pelanggan tak lagi boleh membacanya
// tak mengirim event apa pun ke pelanggan itu. Dulu pun begitu, tapi tarikan penuh
// dari event baris LAIN ikut menyapunya; kini ia bertahan sampai tarikan penuh
// berikutnya (sambung ulang, `online`, kembali sesudah tersembunyi ≥ 60 detik, atau
// layar dibuka lagi). RLS baca di skema ini bergantung pada peran dan kepemilikan
// (santri_id, guru_id, pengirim) yang tak pernah berpindah, jadi ini jarang sekali.
//
// CELAH AWAL: tarikan awal berangkat bersamaan dengan pemasangan channel, dan perubahan
// yang jatuh di antara snapshot tarikan itu dan aktifnya langganan di server tak pernah
// menjadi event. Dulu celah ini tertambal oleh tarikan penuh event berikutnya. Supaya
// tetap begitu, gelombang event PERTAMA sesudah tarikan awal ikut menarik baris yang
// `updated_at`-nya sejak tarikan awal dimulai (trigger set_updated_at, migrasi F2 06) —
// dihitung dengan jam SERVER dari `commit_timestamp`, bukan jam perangkat yang bisa
// meleset. Sekali per langganan, dan hanya bila memang ada event. (keuangan_va_intent
// tak dipasangi trigger itu: INSERT-nya tertambal karena default kolom now(), UPDATE-nya
// di celah ini tidak.)

/** Lebih dari ini baris yang harus ditanyakan dalam satu gelombang -> tarik penuh saja. */
const RT_TARIK_ID_MAKS = 200
/** Id per permintaan `id=in.(…)` — menjaga panjang URL tetap aman. */
const RT_TARIK_ID_PER_PERMINTAAN = 100
/** Kelonggaran penambal celah awal: updated_at = awal TRANSAKSI, bukan saat commit. */
const RT_SUSUL_AWAL_MARGIN_MS = 120000

async function _tarikMentahById(collectionName, filters, ids) {
  const { pk } = _cfg(collectionName)
  const out = []
  for (let i = 0; i < ids.length; i += RT_TARIK_ID_PER_PERMINTAAN) {
    const q = _applyFilters(supabase.from(collectionName).select('*'), collectionName, filters)
    const { data, error } = await q.in(pk, ids.slice(i, i + RT_TARIK_ID_PER_PERMINTAAN))
    if (error) throw error
    if (data) out.push(...data)
  }
  return out
}

// ---- penilaian penyaring & urutan DI KLIEN (v.1.4.4) ---------------------------
// Aturannya satu: menjawab HANYA bila jawabannya pasti sama dengan jawaban Postgres.
// Selebihnya `undefined`, dan pemanggilnya bertanya ke server.

const _WAKTU_RE =
  /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?(Z|[+-]\d{2}(?::?\d{2})?)$/i
// Teks yang urutannya sama di collation APA PUN yang mungkin dipakai DB: angka dan tanda
// baca tanggal ('YYYY-MM-DD', 'YYYY-MM', 'HH:MM'). Teks bebas (nama, keterangan) tidak —
// collation linguistik mengurutkannya lain dari urutan titik-kode.
const _TEKS_AMAN_RE = /^[0-9:.T -]*$/

/** Timestamp BER-ZONA -> mikrodetik sejak epoch (bilangan bulat, presisi timestamptz).
 *  Tanpa zona -> NaN: artinya bergantung TimeZone sesi, tak bisa dipastikan di sini. */
function _mikrodetik(s) {
  const m = typeof s === 'string' ? _WAKTU_RE.exec(s.trim()) : null
  if (!m) return NaN
  const [, th, bl, tg, jam, mnt, dtk, pecahan, zona] = m
  let geserMenit = 0
  if (zona.toUpperCase() !== 'Z') {
    const angka = zona.slice(1).replace(':', '')
    geserMenit =
      (zona[0] === '-' ? -1 : 1) * (Number(angka.slice(0, 2)) * 60 + Number(angka.slice(2) || 0))
  }
  const ms = Date.UTC(+th, +bl - 1, +tg, +jam, +mnt, +(dtk || 0)) - geserMenit * 60000
  return ms * 1000 + Number(((pecahan || '') + '000000').slice(0, 6))
}

function _punya(o, k) {
  return o !== null && typeof o === 'object' && Object.prototype.hasOwnProperty.call(o, k)
}
function _ada(v) {
  return v !== null && v !== undefined
}

/** Nilai `field` sebagaimana DILIHAT Postgres saat menyaring baris mentah `raw`.
 *  j: 'teks' | 'angka' | 'bool' | 'waktu' | 'null' | 'x' (tak bisa dipastikan). */
function _nilaiSaring(table, raw, field) {
  const { json } = _cfg(table)
  const ref = _colRef(table, field)
  if (json && ref === `${json}->>${field}`) {
    // `->>` selalu TEKS: angka & boolean JSON dibandingkan Postgres sebagai teks.
    const v = _punya(raw[json], field) ? raw[json][field] : null
    if (v === null) return { j: 'null' }
    if (typeof v === 'string') return { j: 'teks', v }
    if (typeof v === 'boolean') return { j: 'teks', v: String(v) }
    if (Number.isSafeInteger(v)) return { j: 'teks', v: String(v) }
    return { j: 'x' } // pecahan (1.50 vs 1.5) & objek: bentuk teksnya tak pasti
  }
  if (!_punya(raw, ref)) return { j: 'x' }
  const v = raw[ref]
  if (v === null) return { j: 'null' }
  if (ref === 'created_at' || ref === 'updated_at') {
    const us = _mikrodetik(v)
    return Number.isNaN(us) ? { j: 'x' } : { j: 'waktu', v: us }
  }
  if (typeof v === 'string') return _WAKTU_RE.test(v) ? { j: 'x' } : { j: 'teks', v }
  if (typeof v === 'number') return Number.isFinite(v) ? { j: 'angka', v } : { j: 'x' }
  if (typeof v === 'boolean') return { j: 'bool', v }
  return { j: 'x' }
}

// Nilai penyaring dikirim postgrest-js sebagai `${val}` lalu di-cast Postgres ke tipe
// kolomnya. Tiga penerjemah ini hanya menerima bentuk yang cast-nya pasti.
function _teksPenyaring(val) {
  if (typeof val === 'string') return val
  if (typeof val === 'boolean' || Number.isFinite(val)) return String(val)
  return undefined
}
function _angkaPenyaring(val) {
  if (Number.isFinite(val)) return val
  if (typeof val === 'string' && /^\s*[+-]?\d+\s*$/.test(val) && Number.isSafeInteger(+val))
    return +val
  return undefined
}
function _boolPenyaring(val) {
  if (typeof val === 'boolean') return val
  const s = String(val).trim().toLowerCase()
  if (['t', 'true', 'y', 'yes', 'on', '1'].includes(s)) return true
  if (['f', 'false', 'n', 'no', 'off', '0'].includes(s)) return false
  return undefined
}

/** -1 / 0 / 1 membandingkan nilai baris dengan nilai penyaring; undefined = tak pasti.
 *  `samaSaja` = cukup tahu sama/tidak (==, !=, in) — teks bebas pun boleh. */
function _bandingPenyaring(n, val, samaSaja) {
  if (n.j === 'teks') {
    const t = _teksPenyaring(val)
    if (t === undefined) return undefined
    if (n.v === t) return 0
    if (samaSaja) return 1
    if (!_TEKS_AMAN_RE.test(n.v) || !_TEKS_AMAN_RE.test(t)) return undefined
    return n.v < t ? -1 : 1
  }
  let t
  if (n.j === 'angka') t = _angkaPenyaring(val)
  else if (n.j === 'bool') t = _boolPenyaring(val)
  else if (n.j === 'waktu') t = _mikrodetik(val)
  if (t === undefined || Number.isNaN(t)) return undefined
  return n.v === t ? 0 : n.v < t ? -1 : 1
}

function _cocokSatu(n, op, val) {
  if (n.j === 'x' || op === 'array-contains' || op === 'array-contains-any') return undefined
  if (op === 'in' || op === 'not-in') {
    if (!Array.isArray(val)) return undefined
    // `x IN ()` = false dan `x NOT IN ()` = true — termasuk untuk NULL.
    if (!val.length) return op === 'not-in'
    if (n.j === 'null') return false
    let ada = false
    for (const x of val) {
      if (x === null || x === undefined) return undefined
      const c = _bandingPenyaring(n, x, true)
      if (c === undefined) return undefined
      if (c === 0) ada = true
    }
    return op === 'in' ? ada : !ada
  }
  // NULL tak pernah memenuhi =, <>, <, <=, >, >= (hasilnya NULL, dianggap tidak).
  if (n.j === 'null') return false
  const rentang = op === '<' || op === '<=' || op === '>' || op === '>='
  const c = _bandingPenyaring(n, val, !rentang)
  if (c === undefined) return undefined
  if (op === '!=') return c !== 0
  if (op === '<') return c < 0
  if (op === '<=') return c <= 0
  if (op === '>') return c > 0
  if (op === '>=') return c >= 0
  return c === 0 // '==' dan op tak dikenal (dijadikan eq oleh _applyFilters)
}

/** Apakah baris mentah `raw` lolos `filters`? true / false / undefined (tanya server). */
function _cocokFilter(table, raw, filters) {
  let pasti = true
  for (const [field, op, val] of filters) {
    const hasil = _cocokSatu(_nilaiSaring(table, raw, field), op, val)
    if (hasil === false) return false
    if (hasil === undefined) pasti = false
  }
  return pasti ? true : undefined
}

function _kunciUrut(table, raw, field) {
  const { json } = _cfg(table)
  const ref = _colRef(table, field)
  if (json && ref === `${json}->>${field}`) {
    const v = _punya(raw[json], field) ? raw[json][field] : null
    if (v === null) return null
    return typeof v === 'string' ? v : JSON.stringify(v) // `->>` = teks
  }
  const v = raw[ref]
  if (v === null || v === undefined) return null
  if (ref === 'created_at' || ref === 'updated_at') {
    const us = _mikrodetik(v)
    return Number.isNaN(us) ? String(v) : us
  }
  return typeof v === 'object' ? JSON.stringify(v) : v
}

/** Pembanding cermin ORDER BY Postgres untuk baris mentah. NULL = nilai terbesar
 *  (default Postgres: ASC -> NULLS LAST, DESC -> NULLS FIRST). Teks: urutan titik-kode
 *  (collation "C"); di collation linguistik, baris yang BERUBAH bisa mendarat sedikit
 *  lain daripada tarikan penuh — baris lainnya tetap di urutan server. */
function _bandingUrutan(table, orders, a, b) {
  for (const [field, dir] of orders) {
    const x = _kunciUrut(table, a, field)
    const y = _kunciUrut(table, b, field)
    let c = 0
    if (x === null || y === null) c = x === y ? 0 : x === null ? 1 : -1
    else if (typeof x === typeof y) c = x < y ? -1 : x > y ? 1 : 0
    else c = String(x) < String(y) ? -1 : String(x) > String(y) ? 1 : 0
    if (String(dir).toLowerCase() === 'desc') c = -c
    if (c !== 0) return c
  }
  return 0
}

/** Sama isi, tak peduli urutan kunci (jsonb event & PostgREST berbeda urutan kolom). */
function _samaNilai(a, b) {
  if (a === b) return true
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false
  if (Array.isArray(a) !== Array.isArray(b)) return false
  const ka = Object.keys(a)
  if (ka.length !== Object.keys(b).length) return false
  return ka.every((k) => _punya(b, k) && _samaNilai(a[k], b[k]))
}

function _eventDikenal(p) {
  return (
    !!p &&
    typeof p === 'object' &&
    (p.eventType === 'INSERT' || p.eventType === 'UPDATE' || p.eventType === 'DELETE')
  )
}

/** Subscribe collection — return unsubscribe function. Callback SELALU menerima array
 *  penuh berbentuk Firestore (cermin onSnapshot), array baru tiap kali.
 *  Whitelist realtime -> tarikan penuh di awal & sesudah sambung ulang; event di
 *  antaranya DITERAPKAN ke salinan lokal (v.1.4.4), digabung lewat RT_DEBOUNCE_MS.
 *  Non-whitelist -> fetch sekali + no-op. */
export function subscribeColl(collectionName, callback, filters = [], orders = []) {
  _ensure()
  if (!REALTIME.has(collectionName)) {
    queryColl(collectionName, filters, orders)
      .then(callback)
      .catch((err) => console.error(`[subscribeColl] ${collectionName} error:`, err))
    return () => {} // non-whitelist: tak ada channel
  }

  const { pk } = _cfg(collectionName)
  const PENUH = 'penuh'
  let lepas = false
  let timer = null
  let terakhirTarik = 0
  let perluPenuh = false // flush berikutnya = tarikan penuh (jalur pemulihan)
  let antre = [] // event yang menunggu diterapkan: { p, tiba }
  let sibuk = false // ada tarikan (penuh / per-id) yang sedang berjalan
  let generasi = 0 // naik tiap tarikan penuh; hasil tarikan yang lebih tua dibuang
  let salinan = null // { urutan: id[], baris: Map<id, {raw, doc}>, berkunci }
  let templat = null // nama kolom baris hasil tarikan (urutan PostgREST)
  let susulAwal = null // { mulai } selama celah awal belum ditambal

  const kirim = () => {
    try {
      callback(salinan.urutan.map((id) => salinan.baris.get(id).doc))
    } catch (err) {
      console.error(`[subscribeColl] ${collectionName} error:`, err)
    }
  }

  const keluarkan = (id) => {
    const i = salinan.urutan.indexOf(id)
    if (i >= 0) salinan.urutan.splice(i, 1)
  }
  const sisipkan = (id, raw) => {
    const u = salinan.urutan
    if (!orders.length) {
      u.push(id) // tanpa urutan: baris baru di belakang, seperti urutan fisik tabel
      return
    }
    // Sesudah baris terakhir yang tak lebih besar: yang setara tetap di urutan lamanya.
    let lo = 0
    let hi = u.length
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (_bandingUrutan(collectionName, orders, salinan.baris.get(u[mid]).raw, raw) <= 0)
        lo = mid + 1
      else hi = mid
    }
    u.splice(lo, 0, id)
  }
  const pasangBaris = (id, mentah) => {
    // Urutan kolom disamakan dengan PostgREST supaya dokumen dari event tak berbeda
    // sedikit pun dari dokumen hasil tarikan (termasuk urutan Object.keys-nya).
    let raw = mentah
    if (templat) {
      raw = {}
      for (const k of templat) if (_punya(mentah, k)) raw[k] = mentah[k]
      for (const k of Object.keys(mentah)) if (!_punya(raw, k)) raw[k] = mentah[k]
    }
    const lama = salinan.baris.get(id)
    if (lama && _samaNilai(lama.raw, raw)) return false
    salinan.baris.set(id, { raw, doc: _flatten(collectionName, raw) })
    if (!lama) sisipkan(id, raw)
    else if (orders.length && _bandingUrutan(collectionName, orders, lama.raw, raw) !== 0) {
      keluarkan(id)
      sisipkan(id, raw)
    }
    return true
  }
  const hapusBaris = (id) => {
    if (!salinan.baris.delete(id)) return false
    keluarkan(id)
    return true
  }
  const lengkap = (raw) => {
    const { json, cols } = _cfg(collectionName)
    const wajib = templat || [pk, ...(json ? [json] : []), ...cols]
    return wajib.every((k) => _punya(raw, k))
  }

  /** Satu event ke salinan. Hasil: berubah? (boolean) atau PENUH. `tanya` = id yang
   *  harus ditanyakan ke server; event yang lebih baru untuk id yang sama menggantikannya. */
  const terapkan = (p, tanya) => {
    if (p.eventType === 'DELETE') {
      if (!_ada(p.old?.[pk])) return PENUH
      const id = String(p.old[pk])
      tanya.delete(id)
      return hapusBaris(id)
    }
    const raw = p.new
    if (!_ada(raw?.[pk])) return PENUH
    const id = String(raw[pk])
    let berubah = false
    const idLama = p.old?.[pk]
    if (_ada(idLama) && String(idLama) !== id) {
      // primary key berganti (nyaris tak pernah): baris ber-kunci lama ikut hilang
      tanya.delete(String(idLama))
      berubah = hapusBaris(String(idLama))
    }
    tanya.delete(id)
    const galat = Array.isArray(p.errors) && p.errors.length > 0
    const lolos = galat || !lengkap(raw) ? undefined : _cocokFilter(collectionName, raw, filters)
    if (lolos === undefined) tanya.add(id)
    else if (lolos ? pasangBaris(id, raw) : hapusBaris(id)) berubah = true
    return berubah
  }

  const tarikPenuh = async (awal) => {
    terakhirTarik = Date.now()
    const gen = ++generasi
    const mulai = Date.now()
    antre = [] // event yang tiba sebelum saat ini sudah tercakup tarikan ini
    sibuk = true
    try {
      const rows = await _tarikMentah(collectionName, filters, orders)
      if (lepas || gen !== generasi) return
      const baris = new Map()
      const urutan = []
      // Tanpa primary key (PK gabungan): event tak bisa diterapkan, selalu tarik penuh.
      const berkunci = rows.every((raw) => _ada(raw?.[pk]))
      rows.forEach((raw, i) => {
        // Kunci ganda (baris bergeser antarhalaman _pageAll) dirapatkan jadi satu.
        const id = berkunci ? String(raw[pk]) : `#${i}`
        if (!baris.has(id)) urutan.push(id)
        baris.set(id, { raw, doc: _flatten(collectionName, raw) })
      })
      salinan = { urutan, baris, berkunci }
      if (rows.length) templat = Object.keys(rows[0])
      susulAwal = awal ? { mulai } : null
      kirim()
    } catch (err) {
      console.error(`[subscribeColl] ${collectionName} error:`, err)
    } finally {
      if (gen === generasi) {
        sibuk = false
        if (!lepas) proses()
      }
    }
  }

  const tarikPerId = async (ids, batasSusul, berubahAwal) => {
    const gen = generasi
    sibuk = true
    let berubah = berubahAwal
    try {
      const [hasilId, hasilSusul] = await Promise.all([
        ids.length ? _tarikMentahById(collectionName, filters, ids) : [],
        batasSusul
          ? _tarikMentah(collectionName, [...filters, ['updated_at', '>=', batasSusul]])
          : []
      ])
      if (lepas || gen !== generasi) return
      const dapat = new Map()
      for (const raw of hasilId) if (_ada(raw?.[pk])) dapat.set(String(raw[pk]), raw)
      // Id yang TAK kembali: terhapus, tak lolos penyaring lagi, atau tak terbaca RLS —
      // ketiganya sama dengan jawaban tarikan penuh: tak ada di daftar.
      for (const id of ids) {
        if (dapat.has(id) ? pasangBaris(id, dapat.get(id)) : hapusBaris(id)) berubah = true
      }
      for (const raw of hasilSusul) {
        if (_ada(raw?.[pk]) && pasangBaris(String(raw[pk]), raw)) berubah = true
      }
      if (berubah) kirim()
    } catch (err) {
      console.error(`[subscribeColl] ${collectionName} error:`, err)
      if (lepas || gen !== generasi) return
      if (berubah) kirim()
      fetchGabung() // jaring pengaman: tarikan penuh sesudah jeda gabung
    } finally {
      if (gen === generasi) {
        sibuk = false
        if (!lepas) proses()
      }
    }
  }

  const proses = () => {
    if (lepas || sibuk || perluPenuh || !antre.length) return
    if (!salinan || !salinan.berkunci) {
      tarikPenuh(false)
      return
    }
    const gelombang = antre
    antre = []
    const tanya = new Set()
    let berubah = false
    for (const { p } of gelombang) {
      const hasil = terapkan(p, tanya)
      if (hasil === PENUH) {
        tarikPenuh(false)
        return
      }
      if (hasil) berubah = true
    }
    let batasSusul = null
    if (susulAwal && (!templat || templat.includes('updated_at'))) {
      // Jam SERVER saat tarikan awal dimulai = commit event pertama dikurangi selang (jam
      // perangkat) antara mulai tarikan dan tibanya event itu. Jam perangkat yang meleset
      // berjam-jam tak ikut terbawa; yang terpakai hanya selisihnya.
      const [{ p, tiba }] = gelombang
      const server = Date.parse(p.commit_timestamp)
      const kini = Number.isNaN(server) ? tiba : server
      const batas = kini - (tiba - susulAwal.mulai) - RT_SUSUL_AWAL_MARGIN_MS
      batasSusul = new Date(batas).toISOString()
    }
    susulAwal = null
    if (tanya.size > RT_TARIK_ID_MAKS) tarikPenuh(false)
    else if (tanya.size || batasSusul) tarikPerId([...tanya], batasSusul, berubah)
    else if (berubah) kirim()
  }

  const jadwal = () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      if (lepas) return
      if (perluPenuh) {
        perluPenuh = false
        tarikPenuh(false)
      } else proses()
    }, RT_DEBOUNCE_MS)
  }
  // Tarikan penuh ber-debounce: jalur pemulihan (sambung ulang, online, jendela kembali).
  const fetchGabung = () => {
    if (lepas) return
    perluPenuh = true
    jadwal()
  }
  const terimaEvent = (payload) => {
    if (lepas) return
    if (_eventDikenal(payload)) antre.push({ p: payload, tiba: Date.now() })
    else perluPenuh = true // bentuk tak dikenal: perilaku lama, tarik penuh
    jadwal()
  }

  tarikPenuh(true)
  // Dipakai pendengar global (kembali online / jendela dipakai lagi).
  const segarkanBilaPerlu = () => {
    if (lepas) return
    if (Date.now() - terakhirTarik < RT_JEDA_SEGAR_MS) return
    fetchGabung()
  }
  _pasangPendengarGlobal()
  _penyegar.add(segarkanBilaPerlu)
  const lepasChannel = _pasangChannelTahanPutus(
    `rt-${collectionName}`,
    (ch) =>
      ch.on(
        'postgres_changes',
        { event: '*', schema: 'public', table: collectionName },
        terimaEvent
      ),
    fetchGabung
  )
  return () => {
    lepas = true
    _penyegar.delete(segarkanBilaPerlu)
    if (timer) clearTimeout(timer) // jangan tarik data untuk komponen yang sudah dilepas
    lepasChannel()
  }
}

/** Subscribe satu dokumen. Whitelist -> channel filter id; else fetch sekali. */
export function subscribeDoc(collectionName, id, callback) {
  _ensure()
  const { pk } = _cfg(collectionName)
  let terakhirTarik = 0
  const fetchOne = () => {
    terakhirTarik = Date.now()
    return getOne(collectionName, id)
      .then(callback)
      .catch((err) => console.error(`[subscribeDoc] ${collectionName}/${id} error:`, err))
  }

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
  // v.1.4.2: sama seperti subscribeColl — `settings` yang beku sesudah perangkat tidur
  //   ikut membekukan kop, shift, jenis bisyaroh, dan kategori cuti di seluruh layar.
  const segarkanBilaPerlu = () => {
    if (lepas) return
    if (Date.now() - terakhirTarik < RT_JEDA_SEGAR_MS) return
    fetchGabung()
  }
  _pasangPendengarGlobal()
  _penyegar.add(segarkanBilaPerlu)
  const lepasChannel = _pasangChannelTahanPutus(
    `rt-${collectionName}-${id}`,
    (ch) =>
      ch.on(
        'postgres_changes',
        { event: '*', schema: 'public', table: collectionName, filter: `${pk}=eq.${id}` },
        fetchGabung
      ),
    fetchGabung
  )
  return () => {
    lepas = true
    _penyegar.delete(segarkanBilaPerlu)
    if (timer) clearTimeout(timer)
    lepasChannel()
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
  REALTIME,
  // v.1.4.2: knob pemulihan realtime — dibaca tes regresi, bukan API aplikasi.
  RT_DEBOUNCE_MS,
  RT_ULANG_MS,
  RT_STABIL_MS,
  RT_JEDA_SEGAR_MS,
  RT_SEGAR_SESUDAH_SEMBUNYI_MS,
  // v.1.4.4: penerapan event realtime di klien.
  RT_TARIK_ID_MAKS,
  RT_TARIK_ID_PER_PERMINTAAN,
  RT_SUSUL_AWAL_MARGIN_MS,
  cocokFilter: _cocokFilter,
  bandingUrutan: _bandingUrutan,
  mikrodetik: _mikrodetik
}
