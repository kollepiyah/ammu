// syahriyah.ts — CERMIN Deno dari `vue-app/src/utils/syahriyah.js` (+ tiga pencocok
// whitelist dari `vue-app/src/utils/statusSantri.js`).
//
// KENAPA ADA DUA BERKAS: cron pg_cron memanggil edge function (Deno) yang TIDAK bisa
// mengimpor modul dari `vue-app/`. Pola cermin ini sudah dipakai sebelumnya:
// `hiview-absen/shiftDerive.ts` mencerminkan `utils/shiftDerive.js`.
//
// ⚠️ KALAU SALAH SATU DIUBAH, SINKRONKAN KEDUANYA. Pagarnya bukan kedisiplinan tapi TES:
// `tests/unit/syahriyahMirrorEdge.test.js` menjalankan kasus uang yang SAMA pada kedua
// berkas dan menuntut hasilnya identik. Berkas ini SENGAJA murni TypeScript (tanpa API
// Deno, tanpa impor remote) supaya bisa diimpor vitest.
//
// Alasan keberadaan cermin ini (Kyai, 3-4 Agu 2026): dulu rumus nominal disalin sendiri di
// cron, jadi cron dan tombol Generate bisa menerbitkan nominal BERBEDA untuk santri yang
// sama. Sekarang keduanya menjalankan aturan yang sama: paket, diskon anak guru, tarif
// kombinasi, dan pelipatan syahriyah ngaji ke syahriyah sekolah/fullday.

// deno-lint-ignore no-explicit-any
type Any = any

export interface Komponen {
  jenis_id: string
  label: string
  nominal: number
  pos: string
}
export interface HasilTagihan {
  nominal: number
  nominal_bruto: number
  diskon_persen: number
  diskon_nominal: number
  gabungan: boolean
  komponen: Komponen[]
}

function num(v: unknown): number {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? n : 0
}
function teks(v: unknown): string {
  return String(v ?? '').trim()
}
function lower(v: unknown): string {
  return teks(v).toLowerCase().replace(/\s+/g, ' ')
}

// ---- cermin utils/statusSantri.js ----------------------------------------------------
export function matchJenisKelamin(s: Any, jkOnly: unknown): boolean {
  const wl = Array.isArray(jkOnly) ? jkOnly.filter(Boolean) : []
  if (wl.length === 0) return true
  const jk = String((s && s.jk) || '').toUpperCase()
  return wl.map((x) => String(x).toUpperCase()).includes(jk)
}

/** `shift_ngaji` KOSONG/ambigu = ikut KEDUANYA (baru ~30% terisi; lihat catatan di .js). */
export function matchShiftNgaji(s: Any, shiftOnly: unknown): boolean {
  const wl = Array.isArray(shiftOnly) ? shiftOnly.filter(Boolean) : []
  if (wl.length === 0) return true
  const raw = String((s && s.shift_ngaji) || '').toLowerCase()
  const pagi = raw.includes('pagi')
  const sore = raw.includes('sore')
  if (!pagi && !sore) return true
  return wl.some((x) => {
    const k = String(x).toLowerCase()
    return (k === 'pagi' && pagi) || (k === 'sore' && sore)
  })
}

export function matchStatusOnly(s: Any, statusOnly: unknown): boolean {
  const wl = Array.isArray(statusOnly) ? statusOnly.filter(Boolean) : []
  if (wl.length === 0) return true
  const mukim = !!(s && s.is_mukim)
  const fullday = !!(s && s.is_fullday)
  return wl.some((st) =>
    st === 'mahad' ? mukim : st === 'fullday' ? fullday : st === 'non_mukim' ? !mukim && !fullday : false
  )
}

// ---- cermin utils/syahriyah.js -------------------------------------------------------
export function jenisBerlakuUntuk(jenis: Any, santri: Any): boolean {
  if (!jenis || !santri) return false
  const wl = Array.isArray(jenis.lembaga_only) ? jenis.lembaga_only.filter(Boolean) : []
  if (wl.length > 0 && !(wl.includes(santri.lembaga) || wl.includes(santri.lembaga_sekolah)))
    return false
  return (
    matchStatusOnly(santri, jenis.status_only) &&
    matchJenisKelamin(santri, jenis.jk_only) &&
    matchShiftNgaji(santri, jenis.shift_only)
  )
}

export function nominalDasar(jenis: Any, santri: Any): number {
  if (!jenis || !santri) return 0
  const perSantri = num((jenis.nominal_per_santri || {})[teks(santri.id)])
  if (perSantri) return perSantri
  const perK = jenis.nominal_per_kelas || {}
  for (const [lemb, kls] of [
    [santri.lembaga, santri.kelas],
    [santri.lembaga_sekolah, santri.kelas_sekolah]
  ]) {
    if (!lemb) continue
    const v = num((perK[lemb] || {})[kls])
    if (v) return v
  }
  const perL = jenis.nominal_per_lembaga || {}
  const v3 = num(perL[santri.lembaga]) || num(perL[santri.lembaga_sekolah])
  if (v3) return v3
  return num(jenis.nominal_default) || num(jenis.nominal)
}

export function paketNominal(jenis: Any, santri: Any): number {
  const pilih = lower(santri?.paket_syahriyah)
  if (!pilih) return 0
  const daftar = Array.isArray(jenis?.paket) ? jenis.paket : []
  const found = daftar.find((p: Any) => lower(p?.id) === pilih || lower(p?.label) === pilih)
  return num(found?.nominal)
}

export function nominalGabungan(jenisTarget: Any, santri: Any, lembagaNgaji: unknown): number {
  const tab = jenisTarget?.nominal_gabungan
  if (!tab || typeof tab !== 'object') return 0
  const cariBaris = (key: unknown): Any => {
    const k = lower(key)
    if (!k) return null
    for (const [rk, rv] of Object.entries(tab)) if (lower(rk) === k) return rv || null
    return null
  }
  const cariKolom = (baris: Any, key: unknown): number => {
    if (!baris || typeof baris !== 'object') return 0
    const k = lower(key)
    if (!k) return 0
    for (const [ck, cv] of Object.entries(baris)) if (lower(ck) === k) return num(cv)
    return 0
  }
  const barisSekolah = cariBaris(santri?.lembaga_sekolah)
  const barisJoker = cariBaris('*')
  return (
    cariKolom(barisSekolah, lembagaNgaji) ||
    cariKolom(barisJoker, lembagaNgaji) ||
    cariKolom(barisSekolah, '*') ||
    cariKolom(barisJoker, '*')
  )
}

export function syaratGabungTerpenuhi(jenisNgaji: Any, santri: Any): boolean {
  const mode = lower(santri?.syahriyah_gabung) || 'auto'
  if (mode === 'pisah') return false
  if (mode === 'gabung') return true
  const shift = lower(santri?.shift_ngaji)
  const lembagaNgaji = lower(santri?.lembaga)
  const punyaSekolah = !!teks(santri?.lembaga_sekolah)
  const fullday = santri?.is_fullday === true
  switch (teks(jenisNgaji?.gabung_syarat) || 'punya_sekolah') {
    case 'fullday':
      return fullday
    case 'fullday_sore':
      return fullday && (shift.includes('sore') || lembagaNgaji.includes('sore'))
    case 'sekolah_pagi':
      return punyaSekolah && (shift.includes('pagi') || lembagaNgaji.includes('pagi'))
    default:
      return punyaSekolah
  }
}

export function gabungTargetFor(jenis: Any, santri: Any, jenisList: Any): Any {
  const kandidat = Array.isArray(jenis?.gabung_ke)
    ? jenis.gabung_ke.map(teks).filter(Boolean)
    : teks(jenis?.gabung_ke)
      ? [teks(jenis.gabung_ke)]
      : []
  if (!kandidat.length) return null
  if (!jenisBerlakuUntuk(jenis, santri)) return null
  if (!syaratGabungTerpenuhi(jenis, santri)) return null
  const daftar = Array.isArray(jenisList) ? jenisList : []
  for (const ke of kandidat) {
    const target = daftar.find((j: Any) => teks(j?.id) === ke || lower(j?.label) === lower(ke))
    if (!target || teks(target.id) === teks(jenis.id)) continue
    if (!jenisBerlakuUntuk(target, santri)) continue
    if (!nominalDasar(target, santri) && !nominalGabungan(target, santri, santri?.lembaga)) continue
    return target
  }
  return null
}

export function diskonPersen(jenisTarget: Any, santri: Any): number {
  if (santri?.anak_guru !== true) return 0
  const p = Number(jenisTarget?.diskon_anak_guru)
  if (!Number.isFinite(p) || p <= 0) return 0
  return Math.min(100, p)
}

/** Porsi jenis target = SISA (bukan dihitung ulang) supaya jumlah komponen SELALU = nominal. */
export function hitungTagihan(jenis: Any, santri: Any, jenisList: Any): HasilTagihan | null {
  if (!jenisBerlakuUntuk(jenis, santri)) return null
  if (gabungTargetFor(jenis, santri, jenisList)) return null

  const daftar = Array.isArray(jenisList) ? jenisList : []
  const nempel = daftar.filter((j: Any) => {
    const t = gabungTargetFor(j, santri, jenisList)
    return t && teks(t.id) === teks(jenis.id)
  })

  let bruto = num((jenis.nominal_per_santri || {})[teks(santri.id)]) || paketNominal(jenis, santri)
  if (!bruto && nempel.length) bruto = nominalGabungan(jenis, santri, santri?.lembaga)
  if (!bruto) bruto = nominalDasar(jenis, santri)
  if (bruto <= 0) return null

  const persen = diskonPersen(jenis, santri)
  const neto = persen ? Math.round((bruto * (100 - persen)) / 100) : bruto

  const hasil: HasilTagihan = {
    nominal: neto,
    nominal_bruto: bruto,
    diskon_persen: persen,
    diskon_nominal: bruto - neto,
    gabungan: nempel.length > 0,
    komponen: []
  }
  if (!nempel.length) return hasil

  let sisa = neto
  const bagian: Komponen[] = []
  for (const j of nempel) {
    const kBruto = Math.min(num(nominalDasar(j, santri)), bruto)
    const kNeto = Math.max(0, Math.min(sisa, Math.round((kBruto * neto) / bruto)))
    sisa -= kNeto
    bagian.push({ jenis_id: teks(j.id), label: teks(j.label), nominal: kNeto, pos: teks(j.pos) })
  }
  hasil.komponen = [
    { jenis_id: teks(jenis.id), label: teks(jenis.label), nominal: sisa, pos: teks(jenis.pos) },
    ...bagian
  ]
  return hasil
}

export function jenisTergabung(jenisList: Any, santri: Any): Set<string> {
  const out = new Set<string>()
  for (const j of Array.isArray(jenisList) ? jenisList : []) {
    if (gabungTargetFor(j, santri, jenisList)) out.add(teks(j.id))
  }
  return out
}
