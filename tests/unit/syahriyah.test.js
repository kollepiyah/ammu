// Pagar untuk perhitungan syahriyah gabungan (ngaji nempel ke sekolah/fullday), paket
// nominal, dan diskon anak guru. Modul ini MENGHITUNG UANG dan hasilnya dipakai 4 tempat
// (generate manual, cron, generate khusus, POS) — tesnya yang menjaga keempatnya sepakat.
//
// Kasus acuan dari Kyai (3 Agu 2026): dua santri sama-sama SDI dan sama-sama bayar 200.000,
// tapi komponen ngajinya beda — Ahmad TPQ 90.000 (porsi sekolah 110.000), Zaidun PTPT
// 100.000 (porsi sekolah 100.000).
import { describe, it, expect } from 'vitest'
import {
  hitungTagihan,
  jenisBerlakuUntuk,
  jenisTergabung,
  nominalDasar,
  nominalGabungan,
  paketNominal,
  pecahProporsional,
  syaratGabungTerpenuhi
} from '../../vue-app/src/utils/syahriyah.js'

const jSekolah = () => ({
  id: 'syahriyah_sekolah',
  label: 'Syahriyah Sekolah',
  nominal_default: 0,
  nominal_per_lembaga: { SDI: 200000 },
  frekuensi: 'bulanan',
  pos: ''
})
const jNgaji = () => ({
  id: 'syahriyah_ngaji',
  label: 'Syahriyah Ngaji',
  nominal_default: 0,
  nominal_per_lembaga: { 'TPQ Pagi': 90000, PTPT: 100000 },
  gabung_ke: 'syahriyah_sekolah',
  gabung_syarat: 'sekolah_pagi',
  frekuensi: 'bulanan',
  pos: ''
})
const ahmad = (extra = {}) => ({
  id: 'A',
  nama: 'Ahmad',
  lembaga: 'TPQ Pagi',
  kelas: 'Jilid 5',
  lembaga_sekolah: 'SDI',
  kelas_sekolah: 'I',
  shift_ngaji: 'pagi',
  ...extra
})
const zaidun = (extra = {}) => ({
  id: 'Z',
  nama: 'Zaidun',
  lembaga: 'PTPT',
  kelas: 'Kelas 3',
  lembaga_sekolah: 'SDI',
  kelas_sekolah: 'II',
  shift_ngaji: 'pagi',
  ...extra
})
/** Jumlah komponen WAJIB tepat sama dengan nominal tagihan — invarian paling penting. */
function jumlahKomponen(r) {
  return r.komponen.reduce((a, k) => a + k.nominal, 0)
}

describe('kasus acuan Kyai — ngaji digabung ke syahriyah sekolah', () => {
  it('Ahmad (TPQ 90rb + SDI): total 200.000, komponen 110.000 + 90.000', () => {
    const list = [jSekolah(), jNgaji()]
    const r = hitungTagihan(list[0], ahmad(), list)
    expect(r.nominal).toBe(200000)
    expect(r.gabungan).toBe(true)
    expect(r.komponen.map((k) => [k.label, k.nominal])).toEqual([
      ['Syahriyah Sekolah', 110000],
      ['Syahriyah Ngaji', 90000]
    ])
    expect(jumlahKomponen(r)).toBe(r.nominal)
  })

  it('Zaidun (PTPT 100rb + SDI): total 200.000, komponen 100.000 + 100.000', () => {
    const list = [jSekolah(), jNgaji()]
    const r = hitungTagihan(list[0], zaidun(), list)
    expect(r.nominal).toBe(200000)
    expect(r.komponen.map((k) => k.nominal)).toEqual([100000, 100000])
    expect(jumlahKomponen(r)).toBe(r.nominal)
  })

  it('jenis ngaji TIDAK menghasilkan tagihan sendiri (tak ditagih dua kali)', () => {
    const list = [jSekolah(), jNgaji()]
    expect(hitungTagihan(list[1], ahmad(), list)).toBeNull()
    expect(jenisTergabung(list, ahmad())).toEqual(new Set(['syahriyah_ngaji']))
  })
})

describe('urutan lapis nominal', () => {
  it('tarif kombinasi (K5) menang atas per-lembaga', () => {
    const s = jSekolah()
    s.nominal_gabungan = { SDI: { PTPT: 225000 } }
    const list = [s, jNgaji()]
    expect(hitungTagihan(s, zaidun(), list).nominal).toBe(225000)
    // Ahmad tak punya baris SDI x TPQ Pagi -> tetap 200.000 dari per-lembaga
    expect(hitungTagihan(s, ahmad(), list).nominal).toBe(200000)
  })

  it('joker * pada tarif kombinasi', () => {
    const s = jSekolah()
    s.nominal_gabungan = { '*': { PTPT: 220000 }, SDI: { '*': 210000 } }
    const list = [s, jNgaji()]
    expect(hitungTagihan(s, zaidun(), list).nominal).toBe(220000) // baris spesifik kolom > joker baris
    expect(hitungTagihan(s, ahmad(), list).nominal).toBe(210000) // jatuh ke SDI x *
    expect(nominalGabungan(s, { lembaga_sekolah: 'PKBM' }, 'PPPH')).toBe(0)
  })

  it('paket (K3) menang atas tarif kombinasi', () => {
    const s = jSekolah()
    s.nominal_gabungan = { SDI: { PTPT: 225000 } }
    s.paket = [
      { id: 'standar', label: 'Standar', nominal: 200000 },
      { id: 'peduli', label: 'Peduli', nominal: 250000 }
    ]
    const list = [s, jNgaji()]
    expect(hitungTagihan(s, zaidun({ paket_syahriyah: 'peduli' }), list).nominal).toBe(250000)
    // cocok lewat LABEL juga (nilai dari impor Excel diketik manusia)
    expect(hitungTagihan(s, zaidun({ paket_syahriyah: 'Peduli' }), list).nominal).toBe(250000)
    // paket tak dikenal -> diabaikan, jatuh ke lapis berikutnya
    expect(hitungTagihan(s, zaidun({ paket_syahriyah: 'entah' }), list).nominal).toBe(225000)
    expect(paketNominal(s, { paket_syahriyah: '' })).toBe(0)
  })

  it('nominal_per_santri (bebas) menang atas paket', () => {
    const s = jSekolah()
    s.paket = [{ id: 'peduli', label: 'Peduli', nominal: 250000 }]
    s.nominal_per_santri = { Z: 175000 }
    const list = [s, jNgaji()]
    expect(hitungTagihan(s, zaidun({ paket_syahriyah: 'peduli' }), list).nominal).toBe(175000)
  })

  it('nominalDasar mencerminkan urutan lama: per santri > per kelas > per lembaga > default', () => {
    const j = {
      nominal_default: 10,
      nominal_per_lembaga: { SDI: 100, 'TPQ Pagi': 200 },
      nominal_per_kelas: { SDI: { I: 1000 } },
      nominal_per_santri: { A: 5000 }
    }
    expect(nominalDasar(j, ahmad())).toBe(5000)
    expect(nominalDasar(j, ahmad({ id: 'X' }))).toBe(1000) // per kelas sisi SEKOLAH
    expect(nominalDasar(j, { id: 'X', lembaga: 'TPQ Pagi' })).toBe(200) // per lembaga sisi ngaji
    expect(nominalDasar(j, { id: 'X' })).toBe(10) // default
    expect(nominalDasar({ nominal: 77 }, { id: 'X' })).toBe(77) // alias legacy `nominal`
  })
})

describe('diskon anak guru (K4) dihitung dari TOTAL (K6)', () => {
  it('50% pada 200rb: total 100.000 dan komponen tetap berjumlah tepat 100.000', () => {
    const s = jSekolah()
    s.diskon_anak_guru = 50
    const list = [s, jNgaji()]
    const r = hitungTagihan(s, ahmad({ anak_guru: true }), list)
    expect(r.nominal).toBe(100000)
    expect(r.nominal_bruto).toBe(200000)
    expect(r.diskon_nominal).toBe(100000)
    expect(r.komponen.map((k) => k.nominal)).toEqual([55000, 45000])
    expect(jumlahKomponen(r)).toBe(100000)
  })

  it('tanpa penanda anak_guru -> tak ada diskon (penanda MANUAL, bukan tebakan)', () => {
    const s = jSekolah()
    s.diskon_anak_guru = 50
    const list = [s, jNgaji()]
    expect(hitungTagihan(s, ahmad(), list).nominal).toBe(200000)
    expect(hitungTagihan(s, ahmad({ anak_guru: 'ya' }), list).nominal).toBe(200000) // harus true
  })

  it('angka ganjil: jumlah komponen tetap PERSIS sama dengan nominal (uji pembulatan)', () => {
    const s = jSekolah()
    s.nominal_per_lembaga = { SDI: 199999 }
    s.diskon_anak_guru = 33
    const n = jNgaji()
    n.nominal_per_lembaga = { 'TPQ Pagi': 89999 }
    const list = [s, n]
    const r = hitungTagihan(s, ahmad({ anak_guru: true }), list)
    expect(jumlahKomponen(r)).toBe(r.nominal)
    expect(r.komponen.every((k) => k.nominal >= 0)).toBe(true)
    expect(r.nominal).toBeLessThan(r.nominal_bruto)
  })

  it('diskon 100% -> nominal 0 tapi komponen tetap konsisten', () => {
    const s = jSekolah()
    s.diskon_anak_guru = 100
    const list = [s, jNgaji()]
    const r = hitungTagihan(s, ahmad({ anak_guru: true }), list)
    expect(r.nominal).toBe(0)
    expect(jumlahKomponen(r)).toBe(0)
  })
})

describe('penentu gabungan (K2) — otomatis + pengecualian manual', () => {
  it("'pisah' -> dua tagihan terpisah", () => {
    const list = [jSekolah(), jNgaji()]
    const s = ahmad({ syahriyah_gabung: 'pisah' })
    expect(hitungTagihan(list[0], s, list).gabungan).toBe(false)
    expect(hitungTagihan(list[1], s, list).nominal).toBe(90000)
    expect(jenisTergabung(list, s).size).toBe(0)
  })

  it("'gabung' memaksa walau syarat otomatis tak terpenuhi", () => {
    const list = [jSekolah(), jNgaji()]
    // tanpa sekolah & tanpa shift pagi -> auto TIDAK gabung...
    const tanpaSekolah = { id: 'B', lembaga: 'PTPT', shift_ngaji: 'sore' }
    expect(syaratGabungTerpenuhi(list[1], tanpaSekolah)).toBe(false)
    // ...tapi dipaksa gabung -> target tetap harus punya nominal, di sini tidak -> tak menempel
    expect(syaratGabungTerpenuhi(list[1], { ...tanpaSekolah, syahriyah_gabung: 'gabung' })).toBe(
      true
    )
  })

  it('shift_ngaji kosong + nama lembaga tanpa "pagi" -> TIDAK gabung (aman)', () => {
    const list = [jSekolah(), jNgaji()]
    const s = zaidun({ shift_ngaji: '' }) // PTPT, tak ada petunjuk pagi
    expect(hitungTagihan(list[0], s, list).gabungan).toBe(false)
    expect(hitungTagihan(list[1], s, list).nominal).toBe(100000)
  })

  it('shift_ngaji kosong TAPI lembaga "TPQ Pagi" -> gabung (cadangan nama lembaga)', () => {
    const list = [jSekolah(), jNgaji()]
    const r = hitungTagihan(list[0], ahmad({ shift_ngaji: '' }), list)
    expect(r.gabungan).toBe(true)
    expect(r.komponen.map((k) => k.nominal)).toEqual([110000, 90000])
  })

  it('fullday_sore: fullday + ngaji sore', () => {
    const fd = { id: 'syahriyah_fullday', label: 'Syahriyah Fullday', nominal_default: 350000 }
    const n = jNgaji()
    n.gabung_ke = 'syahriyah_fullday'
    n.gabung_syarat = 'fullday_sore'
    n.nominal_per_lembaga = { 'TPQ Sore': 80000 }
    const list = [fd, n]
    const s = { id: 'F', lembaga: 'TPQ Sore', is_fullday: true, shift_ngaji: 'sore' }
    const r = hitungTagihan(fd, s, list)
    expect(r.komponen.map((k) => k.nominal)).toEqual([270000, 80000])
    // non-fullday dgn ngaji sore -> tak gabung
    expect(hitungTagihan(fd, { ...s, is_fullday: false }, list).gabungan).toBe(false)
  })
})

// Bentuk NYATA di DB (dibaca 3 Agu 2026): jenis ngaji sudah terpisah "Qiraati Pagi" vs
// "Qiraati Sore", dan sisi sekolahnya ada EMPAT jenis (SD/TK/PKBM/Kelas Baca). Karena itu
// `gabung_ke` harus bisa berisi beberapa kandidat, dan syaratnya tak boleh bergantung
// `shift_ngaji` (hanya 30% terisi) maupun `gedung` (isinya "wetan"/"kulon", bukan waktu).
describe('bentuk nyata: gabung_ke banyak kandidat + syarat tanpa shift', () => {
  // Jenis sekolah WAJIB tersasar per lembaga (nominal per-lembaga atau lembaga_only) —
  // kalau semuanya `nominal_default` datar, keempatnya berlaku untuk semua santri dan
  // kandidat pertama yang menang, bukan yang benar. Bentuk di bawah = bentuk nyata
  // (448 tagihan SD vs 72 TK menunjukkan keduanya memang tersasar berbeda).
  const sekolahSD = () => ({
    id: 'sy_sd',
    label: 'Syahriyah Sekolah SD',
    nominal_per_lembaga: { SDI: 200000 }
  })
  const sekolahTK = () => ({
    id: 'sy_tk',
    label: 'Syahriyah Sekolah TK',
    nominal_per_lembaga: { TK: 140000 }
  })
  const qiraatiPagi = () => ({
    id: 'q_pagi',
    label: 'Syahriyah Qiraati Pagi',
    nominal_per_lembaga: { 'TPQ Pagi': 90000, PTPT: 100000, 'Pra PTPT': 90000 },
    gabung_ke: ['Syahriyah Sekolah SD', 'Syahriyah Sekolah TK', 'Syahriyah PKBM'],
    gabung_syarat: 'punya_sekolah'
  })

  it('memilih target sesuai sekolah santri (SD vs TK) dari daftar kandidat', () => {
    const list = [sekolahSD(), sekolahTK(), qiraatiPagi()]
    const anakSD = { id: 'S1', lembaga: 'PTPT', lembaga_sekolah: 'SDI', shift_ngaji: '' }
    const anakTK = { id: 'S2', lembaga: 'Pra PTPT', lembaga_sekolah: 'TK', shift_ngaji: '' }
    // SDI -> hanya jenis SD yang bernominal; TK -> hanya jenis TK
    const rSD = hitungTagihan(list[0], anakSD, list)
    expect(rSD.nominal).toBe(200000)
    expect(rSD.komponen.map((k) => k.nominal)).toEqual([100000, 100000]) // PTPT 100rb
    const rTK = hitungTagihan(list[1], anakTK, list)
    expect(rTK.nominal).toBe(140000)
    expect(rTK.komponen.map((k) => k.nominal)).toEqual([50000, 90000]) // Pra PTPT 90rb
    // jenis ngaji tak jadi tagihan sendiri untuk keduanya
    expect(hitungTagihan(list[2], anakSD, list)).toBeNull()
    expect(hitungTagihan(list[2], anakTK, list)).toBeNull()
  })

  it("syarat 'punya_sekolah' jalan walau shift_ngaji KOSONG (kasus 70% data)", () => {
    const list = [sekolahSD(), qiraatiPagi()]
    const s = { id: 'S3', lembaga: 'PTPT', lembaga_sekolah: 'SDI' } // tanpa shift_ngaji
    expect(syaratGabungTerpenuhi(list[1], s)).toBe(true)
    expect(hitungTagihan(list[0], s, list).gabungan).toBe(true)
    // tanpa sekolah -> tak digabung, ngaji ditagih sendiri
    const tanpaSekolah = { id: 'S4', lembaga: 'PTPT' }
    expect(hitungTagihan(list[1], tanpaSekolah, list).nominal).toBe(100000)
  })

  it("syarat 'fullday' jalan tanpa shift (Qiraati Sore -> Fullday)", () => {
    const fullday = { id: 'fd', label: 'Fullday', nominal_default: 530000 }
    const qiraatiSore = {
      id: 'q_sore',
      label: 'Syahriyah Qiraati Sore',
      nominal_per_lembaga: { 'Pra PTPT': 90000 },
      gabung_ke: 'Fullday',
      gabung_syarat: 'fullday'
    }
    const list = [fullday, qiraatiSore]
    const anakFullday = { id: 'F1', lembaga: 'Pra PTPT', lembaga_sekolah: 'TK', is_fullday: true }
    const r = hitungTagihan(fullday, anakFullday, list)
    expect(r.komponen.map((k) => k.nominal)).toEqual([440000, 90000])
    // BUKAN fullday (mis. Zein: sekolah TK + ngaji sore) -> ngaji tetap ditagih SENDIRI
    const zein = { id: 'Z1', lembaga: 'Pra PTPT', lembaga_sekolah: 'TK' }
    expect(hitungTagihan(qiraatiSore, zein, list).nominal).toBe(90000)
  })

  it('tanpa gabung_syarat -> default punya_sekolah', () => {
    const q = qiraatiPagi()
    delete q.gabung_syarat
    const list = [sekolahSD(), q]
    expect(syaratGabungTerpenuhi(q, { id: 'X', lembaga_sekolah: 'SDI' })).toBe(true)
    expect(syaratGabungTerpenuhi(q, { id: 'X' })).toBe(false)
  })

  it('whitelist lembaga pada jenis ngaji tetap gerbang pertama (cegah salah sasaran)', () => {
    // Akar 427 tagihan kembar Agustus 2026: "Qiraati Pagi" terbit ke santri yang ngajinya
    // SORE. Whitelist lembaga di jenis itu yang menutupnya — bukan aturan gabungan.
    const q = qiraatiPagi()
    q.lembaga_only = ['TPQ Pagi']
    const list = [sekolahSD(), q]
    const anakSore = { id: 'S5', lembaga: 'PTPT', lembaga_sekolah: 'SDI' }
    expect(jenisBerlakuUntuk(q, anakSore)).toBe(false)
    expect(hitungTagihan(q, anakSore, list)).toBeNull() // tak ditagih ngaji pagi sama sekali
    expect(hitungTagihan(list[0], anakSore, list).gabungan).toBe(false) // sekolah utuh 200rb
    expect(hitungTagihan(list[0], anakSore, list).nominal).toBe(200000)
  })
})

describe('pagar keamanan', () => {
  it('komponen lebih besar dari total -> di-clamp, tak pernah negatif', () => {
    const s = jSekolah()
    const n = jNgaji()
    n.nominal_per_lembaga = { 'TPQ Pagi': 300000 } // ngaji > total sekolah
    const list = [s, n]
    const r = hitungTagihan(s, ahmad(), list)
    expect(r.nominal).toBe(200000)
    expect(jumlahKomponen(r)).toBe(200000)
    expect(r.komponen.every((k) => k.nominal >= 0)).toBe(true)
  })

  it('jenis target tak berlaku untuk santri -> ngaji TIDAK hilang, ditagih sendiri', () => {
    const s = jSekolah()
    s.status_only = ['mahad'] // Ahmad non-mukim -> target tak berlaku
    const list = [s, jNgaji()]
    expect(jenisBerlakuUntuk(s, ahmad())).toBe(false)
    expect(hitungTagihan(s, ahmad(), list)).toBeNull()
    expect(hitungTagihan(list[1], ahmad(), list).nominal).toBe(90000) // tetap tertagih
  })

  it('gabung_ke menunjuk jenis yang tak ada -> abaikan, tagih sendiri', () => {
    const n = jNgaji()
    n.gabung_ke = 'jenis_hantu'
    const list = [jSekolah(), n]
    expect(hitungTagihan(n, ahmad(), list).nominal).toBe(90000)
  })

  it('gabung_ke menunjuk diri sendiri -> diabaikan (cegah loop)', () => {
    const n = jNgaji()
    n.gabung_ke = n.id
    const list = [n]
    expect(hitungTagihan(n, ahmad(), list).nominal).toBe(90000)
  })

  it('nominal 0 -> santri tak ditagih (cermin perilaku lama)', () => {
    const s = jSekolah()
    s.nominal_per_lembaga = {}
    expect(hitungTagihan(s, ahmad(), [s])).toBeNull()
  })

  it('jenis NON-gabungan: komponen kosong (jalur lama tak berubah)', () => {
    const s = jSekolah()
    const r = hitungTagihan(s, ahmad(), [s])
    expect(r.nominal).toBe(200000)
    expect(r.gabungan).toBe(false)
    expect(r.komponen).toEqual([])
  })

  it('whitelist SHIFT ikut ditegakkan — jenis ngaji beda shift tak boleh jadi komponen', () => {
    // Kalau shift tak diperiksa di jenisBerlakuUntuk, "Qiraati Pagi" (shift pagi) akan
    // dilipat ke tagihan sekolah milik anak yang ngajinya SORE → nominal ngaji nyasar.
    const s = jSekolah()
    const n = jNgaji()
    n.shift_only = ['pagi']
    n.gabung_syarat = 'punya_sekolah'
    const list = [s, n]
    const anakSore = ahmad({ shift_ngaji: 'sore' })
    expect(jenisBerlakuUntuk(n, anakSore)).toBe(false)
    expect(hitungTagihan(s, anakSore, list).gabungan).toBe(false)
    expect(hitungTagihan(s, anakSore, list).nominal).toBe(200000)
    expect(hitungTagihan(n, anakSore, list)).toBeNull()
    // shift KOSONG = ikut keduanya -> tetap dilipat (jangan sampai komponen hilang)
    expect(hitungTagihan(s, ahmad({ shift_ngaji: '' }), list).gabungan).toBe(true)
  })

  it('whitelist lembaga & status tetap ditegakkan', () => {
    const s = jSekolah()
    s.lembaga_only = ['PKBM']
    expect(jenisBerlakuUntuk(s, ahmad())).toBe(false)
    s.lembaga_only = ['SDI'] // cocok lewat sisi sekolah
    expect(jenisBerlakuUntuk(s, ahmad())).toBe(true)
    s.jk_only = ['P']
    expect(jenisBerlakuUntuk(s, ahmad({ jk: 'L' }))).toBe(false)
  })

  it('masukan kosong/aneh tak melempar', () => {
    expect(hitungTagihan(null, ahmad(), [])).toBeNull()
    expect(hitungTagihan(jSekolah(), null, [])).toBeNull()
    expect(nominalDasar(null, null)).toBe(0)
    expect(jenisTergabung(null, null).size).toBe(0)
  })
})

// ---------------------------------------------------------------------------------------
// pecahProporsional — dipakai POS saat menulis baris Buku Induk (K1). Invarian TUNGGAL yang
// dijaga di sini: JUMLAH BARIS = UANG YANG DITERIMA, tepat sampai rupiah terakhir. Kalau ini
// bocor, buku kas per lembaga melenceng tiap transaksi — uang riil sejak 1 Agu 2026.
// ---------------------------------------------------------------------------------------
describe('pecahProporsional (pemecahan Buku Induk)', () => {
  const komp = [
    { jenis_id: 'sekolah', label: 'Syahriyah Sekolah', nominal: 110000, pos: '' },
    { jenis_id: 'ngaji', label: 'Syahriyah Ngaji', nominal: 90000, pos: '' }
  ]

  it('bayar penuh → komponen apa adanya', () => {
    const r = pecahProporsional(komp, 200000)
    expect(r.map((x) => x.nominal)).toEqual([110000, 90000])
    expect(r[1].label).toBe('Syahriyah Ngaji')
  })

  it('bayar sebagian → proporsional, jumlah TEPAT sama dengan yang dibayar', () => {
    const r = pecahProporsional(komp, 50000)
    expect(r.reduce((s, x) => s + x.nominal, 0)).toBe(50000)
    expect(r[1].nominal).toBe(22500) // 90/200 dari 50.000
    expect(r[0].nominal).toBe(27500)
  })

  it('angka ganjil apa pun tetap berjumlah tepat (uji pembulatan menyeluruh)', () => {
    const aneh = [
      { label: 'A', nominal: 33333 },
      { label: 'B', nominal: 33333 },
      { label: 'C', nominal: 33334 }
    ]
    for (const bayar of [1, 7, 99, 12345, 99999, 100000, 199999]) {
      const r = pecahProporsional(aneh, bayar)
      expect(r.reduce((s, x) => s + x.nominal, 0)).toBe(bayar)
      expect(r.every((x) => x.nominal >= 0)).toBe(true)
    }
  })

  it('tanpa pemecahan (0/1 komponen) atau nominal <= 0 → [] (pemanggil pakai jalur lama)', () => {
    expect(pecahProporsional([], 200000)).toEqual([])
    expect(pecahProporsional([komp[0]], 200000)).toEqual([])
    expect(pecahProporsional(komp, 0)).toEqual([])
    expect(pecahProporsional(komp, -5)).toEqual([])
    expect(pecahProporsional(null, 200000)).toEqual([])
    expect(pecahProporsional(undefined, undefined)).toEqual([])
  })

  it('komponen bernominal 0 semua → [] (jangan bagi nol)', () => {
    expect(
      pecahProporsional(
        [
          { label: 'A', nominal: 0 },
          { label: 'B', nominal: 0 }
        ],
        5000
      )
    ).toEqual([])
  })

  it('tak mengubah objek komponen asli', () => {
    const asli = JSON.parse(JSON.stringify(komp))
    pecahProporsional(komp, 12345)
    expect(komp).toEqual(asli)
  })

  it('rantai nyata: hitungTagihan → pecahProporsional selalu seimbang', () => {
    // Diskon anak guru + pembulatan ganjil = kombinasi paling rawan.
    const s = jSekolah()
    s.diskon_anak_guru = 37
    s.nominal_per_lembaga = { SDI: 199999 }
    const n = jNgaji()
    n.gabung_ke = ['syahriyah_sekolah']
    n.gabung_syarat = 'punya_sekolah'
    n.nominal_per_lembaga = { TPQ: 89999 }
    const h = hitungTagihan(s, ahmad(), [s, n])
    expect(h.komponen.reduce((a, k) => a + k.nominal, 0)).toBe(h.nominal)
    for (const bayar of [1, h.nominal - 1, h.nominal]) {
      const r = pecahProporsional(h.komponen, bayar)
      expect(r.reduce((a, k) => a + k.nominal, 0)).toBe(bayar)
    }
  })
})
