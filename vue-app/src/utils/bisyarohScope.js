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

export const HITUNGAN_OPTIONS = [
  { value: 'flat', label: 'Flat / bulan', hint: 'Sekali per bulan bila cocok scope' },
  { value: 'per_hadir', label: '× kehadiran', hint: 'Dikali jumlah hadir shift dari absensi' }
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
    hitungan: r.hitungan === 'per_hadir' ? 'per_hadir' : 'flat',
    nominal: Number(r.nominal) > 0 ? Number(r.nominal) : 0,
    scope: {
      jabatan: _arr(s.jabatan),
      lembaga: _arr(s.lembaga),
      shift: _arr(s.shift)
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

// Baris slip bisyaroh utk 1 guru. Tiap jenis yang cocok = 1 baris.
//   ctx = { refs, shiftIds, hadirPerShift: { pagi: 20, ... } }
// return [{ jenis_id, kategori, lembaga, label, nominal, hitungan, qty, tarif }]
export function barisBisyaroh(jenisList, ctx) {
  const out = []
  const refs = ctx?.refs || []
  for (const j of jenisList || []) {
    if (!jenisKenaGuru(j, ctx)) continue
    const ref = refPencocok(j, refs)
    const lembaga = ref?.lembaga || '-'
    // kategori dipakai slip lama utk memisah pokok / sekolah / tambahan.
    const kategori =
      j.hitungan === 'per_hadir'
        ? 'bonus'
        : ref?.group === 'sekolah'
          ? 'sekolah'
          : ref?.group === 'mahad'
            ? 'mahad'
            : ref?.group === 'non-lembaga'
              ? 'admin'
              : 'ngaji'
    if (j.hitungan === 'per_hadir') {
      const qty = hadirUntuk(j, ctx?.hadirPerShift)
      out.push({
        jenis_id: j.id,
        kategori,
        lembaga,
        label: j.label,
        hitungan: 'per_hadir',
        qty,
        tarif: j.nominal,
        nominal: qty * j.nominal
      })
    } else {
      out.push({
        jenis_id: j.id,
        kategori,
        lembaga,
        label: j.label,
        hitungan: 'flat',
        qty: 1,
        tarif: j.nominal,
        nominal: j.nominal
      })
    }
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
