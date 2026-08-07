// bisyarohScope — master Jenis Bisyaroh (settings.keuBisyarohJenis[]) + pencocokan scope.
//
// Menggantikan dua model lama sekaligus:
//   - keu_bisyaroh_pokok / keu_bisyaroh_sekolah : map {guru_id: nominal} — 75 baris diisi tangan.
//   - keu_bisyaroh_pagi/sore/sekolah_shift/pegawai_pagi/pegawai_sore : 5 tarif GLOBAL,
//     tak bisa beda per lembaga/jabatan.
//
// Model baru (pola sama dgn keuTagihanJenis fase 1): satu daftar jenis, tiap jenis punya
// nominal + cara hitung + scope. Nominal ditentukan LEMBAGA & TUGAS, bukan per orang.
//
//   { id, label, hitungan: 'flat'|'per_hadir', nominal,
//     scope: { jabatan: [], lembaga: [], shift: [] }, aktif }
//
// ATURAN SCOPE: kriteria KOSONG = tidak menyaring (berlaku semua). Kriteria yang diisi
// harus cocok (AND antar kriteria). `jabatan` + `lembaga` wajib cocok pada SATU tempat
// tugas yang sama — "Guru di PTPT" tak kena ke orang yang jabatannya Guru di TK.
//
// TIDAK ADA aturan "yang lebih spesifik menimpa": tiap jenis yang cocok = 1 baris sendiri
// dan semuanya DIJUMLAHKAN. Jadi isi tabelnya = persis yang muncul di slip, tak ada aturan
// tersembunyi. Konsekuensinya jenis global + jenis khusus utk shift yang sama akan
// DIJUMLAHKAN (bukan saling menimpa) — pakai cekTumpangTindih() untuk memperingatkan.

import { canonLembaga } from '@/composables/useLembaga'

export const HITUNGAN_OPTIONS = [
  { value: 'flat', label: 'Flat / bulan', hint: 'Sekali per bulan bila cocok scope' },
  {
    value: 'per_hadir',
    label: '× kehadiran',
    hint: 'Dikali jumlah hadir shift dari absensi (hadir + terlambat)'
  },
  {
    value: 'per_tepat',
    label: '× tepat waktu',
    hint: 'Dikali jumlah hadir TEPAT WAKTU saja (status hadir, BUKAN terlambat) — utk bonus tepat waktu'
  },
  {
    value: 'per_jp',
    label: '× JP diajar',
    hint: 'Tarif × JP yang BENAR-BENAR diajar bulan itu (JP/minggu disebar ke hari aktif × kehadiran). Tarif = per JP per PERTEMUAN.'
  },
  {
    value: 'per_jp_bulanan',
    label: '× JP/minggu (bulanan)',
    hint: 'Tarif = per JP per BULAN. Nominal = JP/minggu × tarif, lalu dipotong prorata kehadiran (hadir 90% → 90% nominal).'
  },
  {
    value: 'per_shift',
    label: '× Shift',
    hint: 'Nominal × jumlah shift guru yang cocok (mengajar pagi+sore = 2×)'
  }
]

const _key = (v) =>
  String(v == null ? '' : v)
    .trim()
    .toLowerCase()

export function slugJenisId(v) {
  return String(v || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

const _arr = (v) => (Array.isArray(v) ? v.map((x) => String(x || '').trim()).filter(Boolean) : [])

export function normalizeJenisBisyaroh(raw) {
  const r = raw || {}
  const s = r.scope || {}
  const id = slugJenisId(r.id || r.label || '')
  return {
    id,
    label: String(r.label || '').trim() || id,
    hitungan: ['per_hadir', 'per_tepat', 'per_jp', 'per_jp_bulanan', 'per_shift'].includes(
      r.hitungan
    )
      ? r.hitungan
      : 'flat',
    nominal: Number(r.nominal) > 0 ? Number(r.nominal) : 0,
    scope: {
      jabatan: _arr(s.jabatan),
      lembaga: _arr(s.lembaga),
      shift: _arr(s.shift),
      // guru_ids: batasi ke orang tertentu (kosong = semua). Filter AND dgn scope lain.
      guru_ids: _arr(s.guru_ids)
    },
    aktif: r.aktif !== false
  }
}

// Daftar jenis dari settings. Belum ada → [] (Kyai yang isi; sengaja TIDAK di-seed
// dari tarif lama supaya tak ada nominal siluman yang tak pernah Kyai setujui).
export function jenisBisyarohList(settings) {
  const raw = (settings || {}).keuBisyarohJenis
  return (Array.isArray(raw) ? raw : []).map(normalizeJenisBisyaroh).filter((j) => j.id)
}

// Kriteria cocok? [] = tak menyaring.
function cocokKriteria(list, nilai) {
  if (!list || list.length === 0) return true
  const k = _key(nilai)
  return list.some((x) => _key(x) === k)
}

// Tempat tugas guru — dipakai mencocokkan jabatan+lembaga. refs dari
// useGuru.deriveGuruLembagaRefs. Guru tanpa tempat tugas tetap dapat 1 ref kosong
// supaya jenis global (scope kosong) tetap mengenainya.
export function refsUntukScope(refs, guru) {
  const list = (Array.isArray(refs) ? refs : []).filter(
    (r) => r && (r.lembaga || r.jabatan_di_sini)
  )
  if (list.length > 0) return list
  return [{ lembaga: '', jabatan_di_sini: String(guru?.jabatan || ''), group: '' }]
}

// Apakah jenis ini kena ke guru? shiftIds = Set shift milik guru (shiftsForGuru).
export function jenisKenaGuru(j, ctx) {
  if (!j || j.aktif === false) return false
  const s = j.scope || {}
  // guru_ids diisi → hanya orang itu (kosong = semua). Filter paling spesifik, cek dulu.
  if (s.guru_ids && s.guru_ids.length > 0) {
    if (!s.guru_ids.map(String).includes(String(ctx?.guruId ?? ''))) return false
  }
  const refs = ctx?.refs || []
  // jabatan & lembaga harus cocok pada SATU tempat tugas yang sama.
  const adaRef = refs.some(
    (r) => cocokKriteria(s.jabatan, r.jabatan_di_sini) && cocokKriteria(s.lembaga, r.lembaga)
  )
  if (!adaRef) return false
  // shift diisi → guru harus menjalani salah satunya.
  if (s.shift && s.shift.length > 0) {
    const punya = ctx?.shiftIds || new Set()
    if (!s.shift.some((sh) => punya.has(String(sh)))) return false
  }
  return true
}

// Tempat tugas pertama yang membuat jenis ini cocok — dipakai sbg label baris slip.
function refPencocok(j, refs) {
  const s = j.scope || {}
  return (
    refs.find(
      (r) => cocokKriteria(s.jabatan, r.jabatan_di_sini) && cocokKriteria(s.lembaga, r.lembaga)
    ) || null
  )
}

// Jumlah hadir yang dihitung utk 1 jenis per_hadir.
//   scope.shift kosong → SEMUA shift guru dijumlahkan.
//   scope.shift diisi  → hanya shift itu.
function hadirUntuk(j, hadirPerShift) {
  let n = 0
  for (const [sh, cnt] of Object.entries(hadirPerShift || {})) {
    if (cocokKriteria(j.scope?.shift, sh)) n += Number(cnt) || 0
  }
  return n
}

// Jumlah SHIFT guru yang cocok scope.shift (kosong = semua shift guru). Utk hitungan per_shift.
//   Guru mengajar pagi+sore, jenis scope [pagi,sore] → 2. Pokok jadi dikali jumlah shift.
function jumlahShiftCocok(j, shiftIds) {
  let n = 0
  for (const sh of shiftIds || []) {
    if (cocokKriteria(j.scope?.shift, sh)) n++
  }
  return n
}

/**
 * Hitung qty/tarif/nominal untuk cara hitung DASAR (flat, per_hadir, per_tepat, per_jp,
 * per_shift). Dipakai bersama oleh `barisBisyaroh` dan `barisTunjangan` — satu rumus, dua
 * daftar. Jangan disalin: cermin yang berpisah diam-diam adalah kelas bug yang sudah
 * berkali-kali menggigit di repo ini.
 */
function hitungDasar(j, ctx, ref) {
  if (j.hitungan === 'per_hadir' || j.hitungan === 'per_tepat') {
    // per_tepat = hanya hadir TEPAT WAKTU (buang terlambat) → sumber hadir berbeda.
    const src = j.hitungan === 'per_tepat' ? ctx?.hadirTepatPerShift : ctx?.hadirPerShift
    const qty = hadirUntuk(j, src)
    return { hitungan: j.hitungan, qty, tarif: j.nominal, nominal: qty * j.nominal }
  }
  if (j.hitungan === 'per_jp') {
    // Bayar per JP yang BENAR-BENAR diajar bulan itu = JP mingguan (Beban Mengajar)
    //   disebar rata ke hari aktif lembaga × kehadiran harian. Hari di luar hari
    //   aktif tak menghukum.
    const lem = canonLembaga(ref?.lembaga || '')
    const info = ctx?.jpDiajarByLembaga?.[lem] || {}
    const qty = Number(info.diajar) || 0
    return {
      hitungan: 'per_jp',
      qty,
      terjadwal: Number(info.terjadwal) || 0,
      tarif: j.nominal,
      // v.1.2.1: JP kini hasil pembagian (jp_minggu ÷ hari aktif) sehingga kerap
      //   pecahan — pembulatan ditahan sampai UJUNG, ke rupiah utuh. Hanya cabang
      //   per_jp yang bisa pecahan; per_hadir & per_shift qty-nya selalu bulat.
      nominal: Math.round(qty * j.nominal)
    }
  }
  if (j.hitungan === 'per_jp_bulanan') {
    // Kyai 7 Agu 2026: "rumus JPnya kok gak sesuai ya" — tarifnya memang dimaksudkan
    //   PER JP PER BULAN, bukan per pertemuan. Dengan `per_jp`, 30 JP/minggu × Rp 20.000
    //   jadi Rp 2.400.000 sebulan (JP disebar ke hari aktif lalu dikali tiap hari masuk);
    //   yang dimaksud Rp 600.000. Pengalinya karena itu JP MINGGUAN apa adanya.
    //
    //   Kehadiran tetap memotong — lewat PRORATA (JP diajar ÷ JP terjadwal), bukan dengan
    //   mengalikan hari, supaya guru yang masuk penuh dapat utuh dan yang bolong dipotong
    //   sesuai porsinya. Terjadwal 0 (tak ada beban di lembaga itu) → 0, bukan utuh:
    //   membayar penuh atas jadwal yang tak ada = uang keluar tanpa dasar.
    const lem = canonLembaga(ref?.lembaga || '')
    const jpm = Number(ctx?.bebanJPByLembaga?.[lem]) || 0
    const info = ctx?.jpDiajarByLembaga?.[lem] || {}
    const terjadwal = Number(info.terjadwal) || 0
    const diajar = Number(info.diajar) || 0
    const prorata = terjadwal > 0 ? diajar / terjadwal : 0
    return {
      hitungan: 'per_jp_bulanan',
      qty: jpm,
      terjadwal,
      diajar,
      prorata: Math.round(prorata * 1000) / 1000,
      tarif: j.nominal,
      nominal: Math.round(jpm * j.nominal * prorata)
    }
  }
  if (j.hitungan === 'per_shift') {
    // Pokok per shift: nominal × jumlah shift guru yg cocok (pagi+sore = 2×).
    const qty = jumlahShiftCocok(j, ctx?.shiftIds)
    return { hitungan: 'per_shift', qty, tarif: j.nominal, nominal: qty * j.nominal }
  }
  return { hitungan: 'flat', qty: 1, tarif: j.nominal, nominal: j.nominal }
}

// Baris slip bisyaroh utk 1 guru. Tiap jenis yang cocok = 1 baris.
//   ctx = { refs, shiftIds, hadirPerShift: { pagi: 20, ... } }
// return [{ jenis_id, kategori, lembaga, label, nominal, hitungan, qty, tarif }]
/**
 * Baris jenis ber-hitungan per JP (`per_jp` & `per_jp_bulanan`) — jalur TERSENDIRI.
 *
 * Kyai (7 Agu 2026): "ada Kepala SDI yg juga punya jam mengajar di PKBM, gimana caranya
 *   biar sesuai". Dulu lembaga tempat mengajar hanya bisa datang dari `refs`, yang
 *   diturunkan dari Lembaga utama + Lembaga sekolah (SATU slot) + Jabatan Tambahan. Kepala
 *   SDI yang juga mengajar di PKBM karena itu tak punya ref PKBM, sehingga jenis ber-scope
 *   PKBM tak mengenainya — jam mengajarnya tak terbayar, dan satu-satunya jalan keluar
 *   adalah MENGARANG jabatan tambahan hanya supaya lembaganya muncul.
 *
 * Untuk bayaran per JP, bukti mengajar yang sebenarnya ada di menu **Beban Mengajar**:
 * kalau ada baris (guru, lembaga, jp_minggu), ia memang mengajar di sana. Jadi lembaga
 * di sini diambil dari situ, bukan dari jabatan.
 *
 * Konsekuensi lain yang disengaja (pilihan Kyai): SATU BARIS PER LEMBAGA. Jenis ber-scope
 * lembaga kosong yang mengenai guru dua sekolah kini menerbitkan dua baris — masing-masing
 * memakai JP lembaganya sendiri. Dulu hanya lembaga pertama yang terbayar dan sisanya
 * hilang tanpa jejak.
 *
 * `jabatan` tetap menyaring, tapi dicocokkan ke ref MANA PUN — bukan lagi harus satu ref
 * dengan lembaganya, sebab lembaganya kini memang tak berasal dari ref.
 */
function barisPerJp(j, ctx, refs) {
  const s = j.scope || {}
  if (s.guru_ids && s.guru_ids.length > 0) {
    if (!s.guru_ids.map(String).includes(String(ctx?.guruId ?? ''))) return []
  }
  if (s.shift && s.shift.length > 0) {
    const punya = ctx?.shiftIds || new Set()
    if (!s.shift.some((sh) => punya.has(String(sh)))) return []
  }
  if (s.jabatan && s.jabatan.length > 0) {
    if (!refs.some((r) => cocokKriteria(s.jabatan, r.jabatan_di_sini))) return []
  }
  const out = []
  for (const [lem, jpm] of Object.entries(ctx?.bebanJPByLembaga || {})) {
    if (!(Number(jpm) > 0)) continue
    if (!cocokKriteria(s.lembaga, lem)) continue
    out.push({
      jenis_id: j.id,
      kategori: 'sekolah',
      lembaga: lem,
      label: j.label,
      ...hitungDasar(j, ctx, { lembaga: lem })
    })
  }
  return out
}

export function barisBisyaroh(jenisList, ctx) {
  const out = []
  const refs = ctx?.refs || []
  for (const j of jenisList || []) {
    // Jenis per-JP punya jalur sendiri: lembaganya dari Beban Mengajar, dan boleh
    //   menerbitkan lebih dari satu baris (satu per lembaga yang diajar).
    if (j && j.aktif !== false && (j.hitungan === 'per_jp' || j.hitungan === 'per_jp_bulanan')) {
      out.push(...barisPerJp(j, ctx, refs))
      continue
    }
    if (!jenisKenaGuru(j, ctx)) continue
    const ref = refPencocok(j, refs)
    const lembaga = ref?.lembaga || '-'
    // kategori dipakai slip lama utk memisah pokok / sekolah / tambahan.
    const kategori =
      j.hitungan === 'per_hadir' || j.hitungan === 'per_tepat'
        ? 'bonus'
        : j.hitungan === 'per_jp' || j.hitungan === 'per_jp_bulanan'
          ? 'sekolah'
          : ref?.group === 'sekolah'
            ? 'sekolah'
            : ref?.group === 'mahad'
              ? 'mahad'
              : ref?.group === 'non-lembaga'
                ? 'admin'
                : 'ngaji'
    out.push({
      jenis_id: j.id,
      kategori,
      lembaga,
      label: j.label,
      ...hitungDasar(j, ctx, ref)
    })
  }
  return out
}

// ═══ JENIS TUNJANGAN (settings.keuTunjanganJenis) ════════════════════════════
//
// PERMINTAAN KYAI (7 Agu 2026): tunjangan perlu KATEGORI seperti bisyaroh —
//   "tunjangan Kepala Lembaga", "tunjangan pengabdian (per tahun, kelipatan)",
//   "tunjangan khusus yang mengabdi di atas 5 tahun", "tunjangan berprestasi
//   (100% tepat waktu)" — "intinya dimiripkan pengaturan bisyaroh".
//
// Model lamanya `master_tunjangan` = {nama, nominal, guru_ids} saja: tak bisa menyasar
// jabatan/lembaga, tak kenal masa kerja, tak kenal kedisiplinan. Jadi tiap kategori harus
// ditulis tangan per orang dan diperbarui manual tiap tahun bertambah.
//
// Daftar ini memakai MESIN YANG SAMA dengan Jenis Bisyaroh (scope + `hitungDasar`), plus:
//   - `syarat.masa_min_tahun`  gerbang masa pengabdian (dipakai SEMUA cara hitung)
//   - `per_tahun_pengabdian`   nominal × tahun mengabdi (kelipatan), terbit tiap bulan
//   - `flat_prestasi`          flat, hanya bila persen tepat waktu ≥ ambang
// Semua barisnya berkategori 'tunjangan' — termasuk yang `per_tepat`, sebab Kyai memutuskan
// bonus tepat waktu memang masuk tunjangan, bukan pos bonus tersendiri.
export const HITUNGAN_TUNJANGAN_OPTIONS = [
  { value: 'flat', label: 'Flat / bulan', hint: 'Sekali per bulan bila cocok scope & syarat' },
  {
    value: 'per_tahun_pengabdian',
    label: '× tahun pengabdian',
    hint: 'Nominal × jumlah tahun penuh sejak Tanggal Tugas — terbit tiap bulan, naik sendiri saat tahunnya bertambah'
  },
  {
    value: 'flat_prestasi',
    label: 'Bila tepat waktu ≥ ambang',
    hint: 'Flat, hanya bila persen hadir TEPAT WAKTU terhadap hari efektif mencapai ambang (default 100%)'
  },
  {
    value: 'per_tepat',
    label: '× tepat waktu',
    hint: 'Dikali jumlah hadir TEPAT WAKTU saja (status hadir, BUKAN terlambat)'
  },
  {
    value: 'per_hadir',
    label: '× kehadiran',
    hint: 'Dikali jumlah hadir shift dari absensi (hadir + terlambat)'
  },
  {
    value: 'per_shift',
    label: '× Shift',
    hint: 'Nominal × jumlah shift guru yang cocok (mengajar pagi+sore = 2×)'
  }
]
const _HITUNGAN_TUNJANGAN = HITUNGAN_TUNJANGAN_OPTIONS.map((o) => o.value)

/** Bilangan bulat 0..batas; selain itu `fallback`. */
function _int(v, fallback, batas = Infinity) {
  const n = Math.floor(Number(v))
  if (!Number.isFinite(n) || n < 0) return fallback
  return Math.min(n, batas)
}

export function normalizeJenisTunjangan(raw) {
  const r = raw || {}
  const s = r.scope || {}
  const y = r.syarat || {}
  const id = slugJenisId(r.id || r.label || '')
  return {
    id,
    label: String(r.label || '').trim() || id,
    hitungan: _HITUNGAN_TUNJANGAN.includes(r.hitungan) ? r.hitungan : 'flat',
    nominal: Number(r.nominal) > 0 ? Number(r.nominal) : 0,
    scope: {
      jabatan: _arr(s.jabatan),
      lembaga: _arr(s.lembaga),
      shift: _arr(s.shift),
      guru_ids: _arr(s.guru_ids)
    },
    syarat: {
      // 0 = tanpa syarat masa kerja. Untuk "khusus yang mengabdi di atas 5 tahun" → 5.
      masa_min_tahun: _int(y.masa_min_tahun, 0, 60),
      // Ambang tunjangan berprestasi. Default 100 = harus sempurna sebulan itu.
      persen_tepat_min: _int(y.persen_tepat_min, 100, 100)
    },
    aktif: r.aktif !== false
  }
}

/**
 * Daftar Jenis Tunjangan dari settings.
 *
 * Selama kunci baru BELUM pernah disimpan, isinya diturunkan dari `master_tunjangan` lama
 * (nama → label, guru_ids → scope, flat) supaya slip tak berubah sedikit pun sebelum Kyai
 * menyentuh Pengaturan. Kunci baru yang ADA tapi kosong `[]` dihormati apa adanya — itu
 * berarti Kyai memang menghapus semuanya, bukan belum bermigrasi.
 */
export function jenisTunjanganList(settings) {
  const s = settings || {}
  const raw = s.keuTunjanganJenis
  if (Array.isArray(raw)) return raw.map(normalizeJenisTunjangan).filter((j) => j.id)
  const lama = Array.isArray(s.master_tunjangan) ? s.master_tunjangan : []
  return lama
    .map((t) =>
      normalizeJenisTunjangan({
        label: t?.nama,
        nominal: t?.nominal,
        hitungan: 'flat',
        scope: { guru_ids: t?.guru_ids }
      })
    )
    .filter((j) => j.id)
}

/**
 * Tahun PENUH pengabdian pada akhir periode slip. `null` = tak bisa dinilai.
 *
 * Sengaja dihitung dari komponen tanggal, bukan selisih milidetik: `new Date('YYYY-MM-DD')`
 * itu tengah malam UTC, dan di WIB pembandingannya bisa mundur sehari — kelas bug yang
 * sudah pernah membuat perizinan "tidak masuk". Guru tanpa Tanggal Tugas mengembalikan
 * `null`, dan pemanggil WAJIB memperlakukannya sebagai TIDAK memenuhi syarat: menebak masa
 * kerja berarti menerbitkan uang atas data yang tak ada.
 *
 * @param {string} tanggalTugas 'YYYY-MM-DD' (boleh berekor jam, diabaikan)
 * @param {string} sampai       'YYYY-MM-DD' — biasanya akhir bulan periode slip
 */
export function tahunPengabdian(tanggalTugas, sampai) {
  const a = String(tanggalTugas || '').match(/^(\d{4})-(\d{2})-(\d{2})/)
  const b = String(sampai || '').match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!a || !b) return null
  const [, ay, am, ad] = a.map(Number)
  const [, by, bm, bd] = b.map(Number)
  let th = by - ay
  if (bm < am || (bm === am && bd < ad)) th-- // ulang tahun tugas belum lewat
  return th < 0 ? null : th // tanggal tugas di masa depan = data keliru, jangan dibayar
}

/**
 * Persen hadir TEPAT WAKTU terhadap hari efektif, untuk shift yang cocok scope jenis ini.
 * `null` = tak bisa dinilai (tak ada hari efektif) → pemanggil WAJIB menganggap tak lolos.
 */
export function persenTepatWaktu(j, ctx) {
  let tepat = 0
  let efektif = 0
  for (const [sh, cnt] of Object.entries(ctx?.efektifPerShift || {})) {
    if (!cocokKriteria(j?.scope?.shift, sh)) continue
    efektif += Number(cnt) || 0
    tepat += Number((ctx?.hadirTepatPerShift || {})[sh]) || 0
  }
  if (efektif <= 0) return null
  return Math.min(100, (tepat / efektif) * 100)
}

/**
 * Baris TUNJANGAN untuk 1 guru. Bentuk kembaliannya sama dengan `barisBisyaroh`
 * (siap jadi line item slip), hanya `kategori`-nya selalu 'tunjangan'.
 *
 * ctx = ctx `barisBisyaroh` + { tahunPengabdian: number|null, efektifPerShift: {shift: n} }
 */
export function barisTunjangan(jenisList, ctx) {
  const out = []
  const refs = ctx?.refs || []
  const th = Number.isFinite(ctx?.tahunPengabdian) ? ctx.tahunPengabdian : null
  for (const j of jenisList || []) {
    if (!jenisKenaGuru(j, ctx)) continue
    // Gerbang masa pengabdian — berlaku untuk SEMUA cara hitung, jadi "khusus di atas
    //   5 tahun" bisa dipasang pada tunjangan bentuk apa pun, bukan cuma yang kelipatan.
    const min = Number(j.syarat?.masa_min_tahun) || 0
    if (min > 0 && (th === null || th < min)) continue

    const ref = refPencocok(j, refs)
    const lembaga = ref?.lembaga || '-'
    const dasar = { jenis_id: j.id, kategori: 'tunjangan', lembaga, label: j.label }

    if (j.hitungan === 'per_tahun_pengabdian') {
      if (th === null) continue // tanpa Tanggal Tugas → tak dibayar, jangan menebak
      out.push({
        ...dasar,
        hitungan: j.hitungan,
        qty: th,
        tarif: j.nominal,
        nominal: th * j.nominal
      })
      continue
    }
    if (j.hitungan === 'flat_prestasi') {
      const persen = persenTepatWaktu(j, ctx)
      const ambang = Number(j.syarat?.persen_tepat_min) || 100
      if (persen === null || persen + 1e-9 < ambang) continue
      out.push({
        ...dasar,
        hitungan: j.hitungan,
        qty: 1,
        persen: Math.round(persen * 10) / 10,
        ambang,
        tarif: j.nominal,
        nominal: j.nominal
      })
      continue
    }
    out.push({ ...dasar, ...hitungDasar(j, ctx, ref) })
  }
  return out
}

// Ringkasan slip dari line_items. Field ringkas (bisyaroh_pokok/sekolah/tambahan,
// bonus_kehadiran, tunjangan_list) tetap ditulis utk konsumen lama: slip PDF, rekap PDF,
// dasbor keuangan. Tiap baris masuk TEPAT SATU ember supaya penjumlahan di rekap
// (pokok + bonus + tunjangan) tak dobel.
export function ringkasSlip(lineItems) {
  const li = Array.isArray(lineItems) ? lineItems : []
  const sum = (f) => li.filter(f).reduce((a, x) => a + (Number(x.nominal) || 0), 0)
  const pokok = sum((x) => x.kategori === 'ngaji' || x.kategori === 'mahad')
  const sekolah = sum((x) => x.kategori === 'sekolah')
  const tambahan = sum((x) => x.kategori === 'tambahan' || x.kategori === 'admin')
  const bonusTotal = sum((x) => x.kategori === 'bonus')
  const tunjanganList = li
    .filter((x) => x.kategori === 'tunjangan')
    .map((x) => ({ label: x.label || 'Tunjangan', nominal: Number(x.nominal) || 0 }))
  const tunjanganTotal = tunjanganList.reduce((a, t) => a + t.nominal, 0)
  return {
    pokok,
    sekolah,
    tambahan,
    bonusTotal,
    tunjanganList,
    tunjanganTotal,
    totalIn: pokok + sekolah + tambahan + bonusTotal + tunjanganTotal,
    // rincian bonus utk slip/laporan: "Pagi 20× Rp10.000"
    bonusRincian: li
      .filter((x) => x.kategori === 'bonus')
      .map((x) => ({
        label: x.label || 'Bonus Kehadiran',
        qty: Number(x.qty) || 0,
        tarif: Number(x.tarif) || 0,
        nominal: Number(x.nominal) || 0
      }))
  }
}

// Peringatan tumpang-tindih: >1 jenis per_hadir mengenai shift yang SAMA. Nominalnya
// dijumlahkan (tak saling menimpa) — hampir selalu bukan yang dimaksud saat Kyai membuat
// jenis global lalu jenis khusus utk shift yang sama.
export function cekTumpangTindih(jenisList, shiftIds) {
  const perShift = {}
  for (const j of jenisList || []) {
    if (j.aktif === false || j.hitungan !== 'per_hadir') continue
    const shifts = j.scope?.shift?.length ? j.scope.shift : [...(shiftIds || [])]
    for (const sh of shifts) {
      const k = String(sh)
      if (!perShift[k]) perShift[k] = []
      perShift[k].push(j.label)
    }
  }
  return Object.entries(perShift)
    .filter(([, labels]) => labels.length > 1)
    .map(([shift, labels]) => ({ shift, labels }))
}
