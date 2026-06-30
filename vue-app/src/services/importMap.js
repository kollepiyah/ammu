// importMap.js — F3: mapper MURNI Excel master -> baris tabel Supabase.
// Tanpa dependensi vue/firebase/supabase/node -> bisa diuji langsung di node atas
// file Excel asli, dan dipakai di app (browser) lewat useSupabaseImport.
//
// Sumber Excel (READ-ONLY) di "D:/Aplikasi Project/Ammu Data/":
//   - DATA SANTRI AUTO NEW.xlsx  -> sheet "DATA UTAMA" (52 kol)  -> santri
//   - DATA GURU AUTO.xlsx        -> sheet "DATA GURU"  (20 kol)  -> guru
//   - PRESTASI PTPT AUTO.xlsx    -> sheet "Rekap Prestasi"       -> rekap_prestasi
// NIS sering KOSONG (auto-formula) -> id deterministik dari Nama(+Wali+TglLahir)
// supaya re-impor idempoten (upsert baris yang sama).

// ---- util sel -------------------------------------------------------------
/** Ekstrak teks dari nilai sel (sudah/ belum di-unwrap ExcelJS): primitif,
 *  {text}, {result}, atau objek formula tanpa hasil -> ''. */
export function cellText(v) {
  if (v === null || v === undefined) return ''
  if (typeof v === 'object') {
    if (v instanceof Date) return v.toISOString()
    if ('text' in v) return cellText(v.text)
    if ('result' in v) return cellText(v.result)
    if ('richText' in v && Array.isArray(v.richText)) return v.richText.map((r) => r.text).join('')
    return '' // formula tanpa result / objek lain
  }
  return String(v).trim()
}

/** Ambil nilai pertama yang tak kosong dari beberapa kandidat header. */
export function pick(row, ...keys) {
  for (const k of keys) {
    if (k in row) {
      const t = cellText(row[k])
      if (t !== '') return t
    }
  }
  return ''
}

const _TRUE = new Set(['true', 'ya', 'y', '1', 'aktif', 'mukim', 'fullday', 'iya', 'benar'])
export function parseBool(v, def = false) {
  const s = cellText(v).toLowerCase()
  if (s === '') return def
  if (_TRUE.has(s)) return true
  if (['false', '0', 'tidak', 'nonaktif', 'no', 'n'].includes(s)) return false
  return def
}

/** Tanggal -> 'YYYY-MM-DD'. Terima Date, 'DD/MM/YYYY', ISO, atau '' -> ''. */
export function parseDate(v) {
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  const s = cellText(v)
  if (!s) return ''
  // ISO 'YYYY-MM-DD...' (termasuk yang ber-quote)
  let m = s.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (m) return `${m[1]}-${m[2]}-${m[3]}`
  // 'DD/MM/YYYY' atau 'D/M/YYYY' (opsional jam)
  m = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/)
  if (m) {
    const d = m[1].padStart(2, '0'),
      mo = m[2].padStart(2, '0')
    return `${m[3]}-${mo}-${d}`
  }
  return ''
}

/** Normalisasi nomor WA: ambil digit; +62/62 di depan -> 0. */
export function normWa(v) {
  let s = cellText(v).replace(/[^\d]/g, '')
  if (!s) return ''
  if (s.startsWith('62')) s = '0' + s.slice(2)
  return s
}

export function titleCase(v) {
  const s = cellText(v)
  if (!s) return ''
  return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
}

const _low = (v) => cellText(v).toLowerCase().replace(/\s+/g, ' ').trim()

/** Hash deterministik (djb2) -> base36 utk id stabil tanpa NIS. */
export function hashKey(str) {
  let h = 5381
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0
  return h.toString(36)
}

// ---- mapper santri --------------------------------------------------------
export function mapSantriRow(r) {
  const nama = titleCase(pick(r, 'Nama Santri', 'Nama Lengkap Santri', 'nama'))
  if (!nama) return null
  const wali = titleCase(pick(r, 'Nama Wali', 'Nama Wali (Lengkap dengan gelar)', 'wali'))
  const tglLahir = parseDate(pick(r, 'Tgl Lahir (DD/MM/YYYY)', 'Tanggal Lahir', 'Tgl Lahir'))
  const nis = pick(r, 'NIS', 'No. Induk', 'No Induk')
  const id = nis || 's_' + hashKey(_low(nama) + '|' + _low(wali) + '|' + tglLahir)

  const guruPagi = titleCase(pick(r, 'Guru Pagi'))
  const guruSore = titleCase(pick(r, 'Guru Sore'))
  const guruSekolahRaw = pick(r, 'Guru Sekolah (pisah |)', 'Guru Sekolah')
  const guruSekolah = guruSekolahRaw
    ? guruSekolahRaw
        .split('|')
        .map((x) => titleCase(x))
        .filter(Boolean)
    : []

  const ayah = {
    nama: titleCase(pick(r, 'Nama Ayah')),
    nik: pick(r, 'NIK Ayah'),
    pendidikan: pick(r, 'Pendidikan Ayah'),
    pekerjaan: pick(r, 'Pekerjaan Ayah'),
    telp: normWa(pick(r, 'HP Ayah'))
  }
  const ibu = {
    nama: titleCase(pick(r, 'Nama Ibu')),
    nik: pick(r, 'NIK Ibu'),
    pendidikan: pick(r, 'Pendidikan Ibu'),
    pekerjaan: pick(r, 'Pekerjaan Ibu'),
    telp: normWa(pick(r, 'HP Ibu'))
  }

  return {
    id,
    nis,
    nisn: pick(r, 'NISN'),
    nik: pick(r, 'NIK'),
    nama,
    jk: (pick(r, 'L/P', 'Jenis Kelamin', 'jk') || '').toUpperCase().slice(0, 1) || null,
    lembaga: pick(r, 'Lembaga Qiraati', 'Lembaga', 'lembaga'),
    kelas: pick(r, 'Kelas Qiraati', 'Kelas/Jilid', 'kelas'),
    lembaga_sekolah: pick(r, 'Lembaga Sekolah'),
    kelas_sekolah: pick(r, 'Kelas Sekolah'),
    juz: pick(r, 'Juz (PTPT)', 'Juz'),
    wali,
    wa: normWa(pick(r, 'No WA Wali', 'No Whatsapp Wali', 'wa')),
    aktif: parseBool(pick(r, 'Status Aktif (true/false)', 'Status Aktif'), true),
    is_mukim: parseBool(pick(r, 'Mukim (true/false)', 'Mukim', 'Status Domisili Pesantren')),
    is_fullday: parseBool(pick(r, 'Fullday (true/false)', 'Fullday')),
    data: {
      // flat + nested (cocok dgn bentuk yang dibaca SantriView/export)
      nama_panggilan: titleCase(pick(r, 'Nama Panggilan')),
      tempat_lahir: titleCase(pick(r, 'Tempat Lahir')),
      tgl_lahir: tglLahir,
      tgl_masuk: parseDate(pick(r, 'Tgl Masuk (DD/MM/YYYY)', 'Tgl Masuk')),
      no_kk: pick(r, 'No KK'),
      guru_pagi: guruPagi,
      guru_sore: guruSore,
      guru: guruPagi || guruSore, // kompat field tunggal
      guru_sekolah: guruSekolah,
      // v.111: penataan administrasi — gedung (scope keuangan+akademik) & PJ PTPT
      gedung: pick(r, 'Gedung'),
      pj_ptpt: pick(r, 'PJ PTPT', 'PJ Ptpt', 'PJ_PTPT'),
      asal_sekolah: titleCase(pick(r, 'Asal Sekolah')),
      penghasilan_ortu: pick(r, 'Penghasilan Ortu', 'Penghasilan Ortu / Wali'),
      nama_ayah: ayah.nama,
      nik_ayah: ayah.nik,
      pendidikan_ayah: ayah.pendidikan,
      pekerjaan_ayah: ayah.pekerjaan,
      hp_ayah: ayah.telp,
      nama_ibu: ibu.nama,
      nik_ibu: ibu.nik,
      pendidikan_ibu: ibu.pendidikan,
      pekerjaan_ibu: ibu.pekerjaan,
      hp_ibu: ibu.telp,
      ayah,
      ibu,
      alamat: cellText(pick(r, 'Alamat')),
      alamat_detail: {
        dusun: cellText(pick(r, 'Dusun/Jalan')),
        rt: cellText(pick(r, 'RT')),
        rw: cellText(pick(r, 'RW')),
        desa: titleCase(pick(r, 'Desa')),
        kecamatan: titleCase(pick(r, 'Kecamatan')),
        kabupaten: titleCase(pick(r, 'Kabupaten')),
        provinsi: titleCase(pick(r, 'Provinsi'))
      },
      catatan_riwayat_pribadi: cellText(pick(r, 'Catatan Riwayat Pribadi (Mukim)')),
      tgl_keluar: parseDate(pick(r, 'Tgl Keluar (DD/MM/YYYY)')),
      alasan_keluar: cellText(pick(r, 'Alasan Keluar')),
      custom_fields: {}
    }
  }
}

// ---- mapper guru ----------------------------------------------------------
const _ROLE_SISTEM = new Set(['user', 'guru_biasa', 'admin', 'admin_keuangan', 'super_admin'])
export function mapGuruRow(r) {
  const nama = titleCase(
    pick(r, 'Nama Guru (Dengan Gelar)', 'Nama Lengkap (Dengan Gelar)', 'Nama Guru', 'nama')
  )
  if (!nama) return null
  const nik = pick(r, 'NIK')
  const id = nik || 'g_' + hashKey(_low(nama))
  let roleSistem = pick(
    r,
    'Role Sistem (user/admin/admin_keuangan/super_admin)',
    'Role Sistem'
  ).toLowerCase()
  if (!_ROLE_SISTEM.has(roleSistem)) roleSistem = 'user'

  return {
    id,
    nama,
    nik,
    jk: (pick(r, 'L/P', 'Jenis Kelamin') || '').toUpperCase().slice(0, 1) || null,
    jabatan: titleCase(pick(r, 'Jabatan')) || 'Guru',
    jabatan_tambahan: titleCase(pick(r, 'Jabatan Tambahan')),
    lembaga: pick(r, 'Lembaga', 'Lembaga Qiraati'),
    lembaga_sekolah: pick(r, 'Lembaga Sekolah'),
    tipe_pegawai: (
      pick(r, 'Tipe Pegawai (guru/pegawai/pegawai_guru)', 'Tipe Pegawai', 'Tipe') || 'guru'
    ).toLowerCase(),
    shift: (pick(r, 'Shift (pagi/sore/pagi_sore)', 'Shift') || '').toLowerCase(),
    status:
      (pick(r, 'Status') || 'aktif').toLowerCase() === 'tidak aktif' ? 'Tidak Aktif' : 'aktif',
    username: pick(r, 'Username (opsional)', 'Username').toLowerCase(),
    wa: normWa(pick(r, 'WA', 'No WhatsApp', 'WhatsApp')),
    role_sistem: roleSistem,
    id_fingerprint: pick(r, 'ID Fingerprint'),
    data: {
      tgl_lahir: parseDate(pick(r, 'Tgl Lahir (DD/MM/YYYY)', 'Tgl Lahir')),
      tanggal_tugas: parseDate(pick(r, 'Tanggal Tugas (DD/MM/YYYY)', 'Tanggal Tugas')),
      nig: pick(r, 'NIG'),
      no_rek_bmt: pick(r, 'No Rek BMT'),
      pendidikan: pick(r, 'Pendidikan Terakhir'),
      alamat: cellText(pick(r, 'Alamat')),
      akses: {}
    }
  }
}

// ---- mapper rekap prestasi (di-link ke santri by NAMA saat commit) --------
export function mapPrestasiRow(r) {
  const nama = titleCase(pick(r, 'Nama Santri', 'Nama Lengkap Santri (Jangan Disingkat)'))
  if (!nama) return null
  const lembaga = pick(r, 'Lembaga Qiraati', 'Lembaga')
  const kelas = pick(r, 'Kelas', 'Kelas Qiraati')
  const id = 'rp_' + hashKey(_low(nama) + '|' + _low(lembaga) + '|' + _low(kelas))
  return {
    id,
    santri_id: null, // di-resolve by nama saat commit (lihat useSupabaseImport)
    lembaga,
    kelas,
    data: {
      santri_nama: nama,
      juz: pick(r, 'Juz (PTPT, angka)', 'Juz'),
      prestasi_awal: pick(r, 'Prestasi Awal', 'Awal'),
      prestasi_akhir: pick(r, 'Prestasi Akhir', 'Akhir'),
      prestasi_total: pick(r, 'Prestasi Total (TPQ/PPPH manual)', 'Total Pencapaian')
    }
  }
}

const _MAPPERS = { santri: mapSantriRow, guru: mapGuruRow, prestasi: mapPrestasiRow }

/**
 * parseRows — map seluruh baris mentah -> baris tabel + dedup by id + kumpulkan
 * peringatan (baris tanpa nama). type: 'santri' | 'guru' | 'prestasi'.
 * @returns {{ rows: object[], skipped: number, duplicates: number, total: number }}
 */
export function parseRows(rawRows, type) {
  const mapper = _MAPPERS[type]
  if (!mapper) throw new Error('importMap: type tak dikenal: ' + type)
  const seen = new Map()
  let skipped = 0,
    duplicates = 0
  for (const raw of rawRows) {
    const mapped = mapper(raw)
    if (!mapped) {
      skipped++
      continue
    }
    if (seen.has(mapped.id)) {
      duplicates++
      seen.set(mapped.id, mapped)
      continue
    } // last-wins
    seen.set(mapped.id, mapped)
  }
  return { rows: [...seen.values()], skipped, duplicates, total: rawRows.length }
}
