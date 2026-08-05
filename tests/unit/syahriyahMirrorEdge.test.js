// PAGAR ANTI-MENYIMPANG: `supabase/functions/auto-generate-tagihan/syahriyah.ts` adalah
// cermin Deno dari `vue-app/src/utils/syahriyah.js`. Dua berkas menghitung UANG yang sama —
// cron memakai yang .ts, tombol Generate & POS memakai yang .js. Kalau keduanya menyimpang,
// cron dan tombol bisa menerbitkan nominal BERBEDA untuk santri yang sama dan tak seorang
// pun tahu sampai wali mengeluh.
//
// Berkas ini menjalankan kasus yang sama pada KEDUA implementasi dan menuntut hasilnya
// identik (deepEqual), termasuk sapuan acak semi-deterministik supaya cabang yang tak
// terpikir pun ikut terbandingkan. Karena itu `syahriyah.ts` WAJIB murni TypeScript —
// begitu ia menyentuh API Deno, impor di bawah gagal dan tes ini merah lebih dulu.
import { describe, it, expect } from 'vitest'
import * as js from '../../vue-app/src/utils/syahriyah.js'
import * as ts from '../../supabase/functions/auto-generate-tagihan/syahriyah.ts'

const jSekolah = () => ({
  id: 'syahriyah_sekolah',
  label: 'Syahriyah Sekolah',
  nominal_per_lembaga: { SDI: 200000, MI: 175000 },
  frekuensi: 'bulanan',
  pos: ''
})
const jNgaji = () => ({
  id: 'syahriyah_ngaji',
  label: 'Syahriyah Ngaji',
  nominal_per_lembaga: { 'TPQ Pagi': 90000, PTPT: 100000 },
  gabung_ke: 'syahriyah_sekolah',
  gabung_syarat: 'punya_sekolah',
  frekuensi: 'bulanan',
  pos: ''
})
const santri = (extra = {}) => ({
  id: 'A',
  nama: 'Ahmad',
  lembaga: 'TPQ Pagi',
  kelas: 'Jilid 5',
  lembaga_sekolah: 'SDI',
  kelas_sekolah: 'I',
  shift_ngaji: 'pagi',
  ...extra
})

/** Bandingkan hitungTagihan kedua implementasi untuk (jenis, santri, daftar). */
function sama(jenisIdx, s, daftar) {
  const a = js.hitungTagihan(daftar[jenisIdx], s, daftar)
  const b = ts.hitungTagihan(daftar[jenisIdx], s, daftar)
  expect(b).toEqual(a)
  return a
}

describe('cermin edge (Deno) sepakat dengan utils/syahriyah.js', () => {
  it('kasus acuan Kyai: 200.000 = 110.000 sekolah + 90.000 ngaji', () => {
    const daftar = [jSekolah(), jNgaji()]
    const r = sama(0, santri(), daftar)
    expect(r.nominal).toBe(200000)
    expect(r.komponen.map((k) => k.nominal)).toEqual([110000, 90000])
    // jenis ngaji tak ditagih sendiri di KEDUA implementasi
    expect(ts.hitungTagihan(daftar[1], santri(), daftar)).toBeNull()
    expect(js.hitungTagihan(daftar[1], santri(), daftar)).toBeNull()
  })

  it('daftar id tergabung sama', () => {
    const daftar = [jSekolah(), jNgaji()]
    expect([...ts.jenisTergabung(daftar, santri())]).toEqual([
      ...js.jenisTergabung(daftar, santri())
    ])
  })

  // `diskon_anak_guru` + `anak_guru` sengaja tetap diuji meski sudah DICABUT (5 Agu 2026):
  //   yang dijaga sekarang adalah KEDUA sisi sama-sama mengabaikannya. Kalau salah satu
  //   sisi menghidupkannya lagi, cron dan tombol Generate akan menagih angka berbeda.
  it('paket, tarif kombinasi, penanda diskon lama: angka identik', () => {
    const s = jSekolah()
    s.paket = [{ id: 'peduli', label: 'Peduli', nominal: 250000 }]
    s.nominal_gabungan = { SDI: { PTPT: 225000 }, '*': { '*': 205000 } }
    s.diskon_anak_guru = 37
    const daftar = [s, jNgaji()]
    for (const extra of [
      {},
      { paket_syahriyah: 'peduli' },
      { paket_syahriyah: 'PEDULI', anak_guru: true },
      { lembaga: 'PTPT' },
      { lembaga: 'PTPT', anak_guru: true },
      { anak_guru: true, syahriyah_gabung: 'pisah' },
      { anak_guru: true, syahriyah_gabung: 'gabung', lembaga_sekolah: '' },
      { lembaga_sekolah: 'MI' },
      { lembaga_sekolah: 'entah' } // tak ada tarif -> jatuh ke joker kombinasi
    ]) {
      sama(0, santri(extra), daftar)
      // jenis ngaji juga: null vs tagihan sendiri harus sama di kedua sisi
      expect(ts.hitungTagihan(daftar[1], santri(extra), daftar)).toEqual(
        js.hitungTagihan(daftar[1], santri(extra), daftar)
      )
    }
  })

  it('whitelist (lembaga/status/JK/shift) ditegakkan sama', () => {
    const s = jSekolah()
    const n = jNgaji()
    n.shift_only = ['pagi']
    s.status_only = ['non_mukim']
    s.jk_only = ['L']
    const daftar = [s, n]
    for (const extra of [
      { jk: 'L' },
      { jk: 'P' },
      { jk: 'L', is_mukim: true },
      { jk: 'L', is_fullday: true },
      { jk: 'L', shift_ngaji: 'sore' },
      { jk: 'L', shift_ngaji: '' }, // kosong = ikut keduanya
      { jk: 'L', shift_ngaji: 'pagi_sore' }
    ]) {
      const sx = santri(extra)
      expect(ts.jenisBerlakuUntuk(s, sx)).toBe(js.jenisBerlakuUntuk(s, sx))
      expect(ts.jenisBerlakuUntuk(n, sx)).toBe(js.jenisBerlakuUntuk(n, sx))
      sama(0, sx, daftar)
    }
  })

  // Kisi PEMBULATAN — dibuat setelah uji mutasi membuktikan sapuan acak di bawah masih
  // meloloskan `Math.round` yang diganti `Math.floor` di cermin (selisih hanya muncul saat
  // pecahannya tepat >= 0,5; nominal acak jarang mengenainya). Kisi ini menyapu SEMUA persen
  // 1..100 pada nominal ganjil, jadi setiap pembulatan yang berbeda pasti tertangkap.
  it('kisi pembulatan: tiap persen 1..100 x nominal ganjil identik (uji mutasi round/floor)', () => {
    for (const bruto of [199999, 200001, 175001, 89999, 123457, 1]) {
      for (let persen = 1; persen <= 100; persen++) {
        const s = { id: 'x', label: 'X', nominal_default: bruto, diskon_anak_guru: persen }
        const sx = { id: 'A', lembaga_sekolah: 'SDI', anak_guru: true }
        const a = js.hitungTagihan(s, sx, [s])
        const b = ts.hitungTagihan(s, sx, [s])
        expect(b, `bruto ${bruto} persen ${persen}`).toEqual(a)
      }
    }
  })

  it('kisi pembulatan pada PEMECAHAN komponen: porsi sekolah = sisa, identik di kedua sisi', () => {
    for (const [brutoTotal, brutoNgaji] of [
      [199999, 89999],
      [200001, 100001],
      [175001, 90000],
      [123457, 65432],
      [3, 2]
    ]) {
      for (let persen = 0; persen <= 100; persen += 7) {
        const s = { id: 'sek', label: 'Sekolah', nominal_default: brutoTotal }
        if (persen) s.diskon_anak_guru = persen
        const n = {
          id: 'ngj',
          label: 'Ngaji',
          nominal_default: brutoNgaji,
          gabung_ke: 'sek',
          gabung_syarat: 'punya_sekolah'
        }
        const daftar = [s, n]
        const sx = { id: 'A', lembaga: 'TPQ', lembaga_sekolah: 'SDI', anak_guru: persen > 0 }
        const a = js.hitungTagihan(s, sx, daftar)
        const b = ts.hitungTagihan(s, sx, daftar)
        expect(b, `total ${brutoTotal} ngaji ${brutoNgaji} persen ${persen}`).toEqual(a)
        expect(a.komponen.reduce((x, k) => x + k.nominal, 0)).toBe(a.nominal)
      }
    }
  })

  // Kyai 4 Agu 2026: "syahriyah pondok itu sudah include Syahriyah Qiraati Pagi & Sore".
  // Dua syarat gabung BARU wajib punya kasus EKSPLISIT di sini. Sapuan semi-acak di bawah
  // TERBUKTI tak menyentuh keduanya: cabang 'mahad' di cermin sengaja dibalik jadi
  // `!mukim`, sapuan 400 kombinasi tetap HIJAU — kombinasi yang dibutuhkannya (mahad +
  // mode auto + nominal target > 0 + status_only lolos) tak pernah muncul di seed itu.
  // Jadi jangan pernah menganggap "ada sapuan acak" = cabang baru sudah terjaga.
  it("syarat 'mahad': syahriyah pondok menyerap ngaji untuk santri MUKIM", () => {
    const pondok = {
      id: 'syahriyah_pondok',
      label: 'Syahriyah Pondok',
      nominal_per_lembaga: { 'TPQ Pagi': 300000 },
      status_only: ['mahad'],
      frekuensi: 'bulanan'
    }
    const ngaji = { ...jNgaji(), gabung_ke: ['syahriyah_pondok'], gabung_syarat: 'mahad' }
    const daftar = [pondok, ngaji]

    const mukim = santri({ is_mukim: true, lembaga_sekolah: '' })
    const a = sama(0, mukim, daftar)
    expect(a.gabungan).toBe(true)
    expect(a.komponen.reduce((n, k) => n + k.nominal, 0)).toBe(a.nominal)
    expect(sama(1, mukim, daftar)).toBeNull() // ngaji tak ditagih sendiri lagi

    // Bukan mukim → pondok tak berlaku, ngaji tetap ditagih SENDIRI (bukan hilang).
    const bukanMukim = santri({ is_mukim: false, lembaga_sekolah: '' })
    expect(sama(0, bukanMukim, daftar)).toBeNull()
    expect(sama(1, bukanMukim, daftar).nominal).toBe(90000)
  })

  it("syarat 'target': satu jenis ngaji menempel ke PONDOK atau SEKOLAH, tergantung santri", () => {
    // Inilah alasan 'target' ada: `gabung_syarat` cuma SATU nilai, jadi "mukim → pondok"
    // dan "punya sekolah → sekolah" mustahil dinyatakan lewat syarat. Penyaringnya
    // diserahkan ke jenis tujuan (status_only / lembaga_only masing-masing).
    const pondok = {
      id: 'syahriyah_pondok',
      label: 'Syahriyah Pondok',
      nominal_per_lembaga: { 'TPQ Pagi': 300000 },
      status_only: ['mahad'],
      frekuensi: 'bulanan'
    }
    const sekolah = { ...jSekolah(), status_only: ['non_mukim'] }
    const ngaji = {
      ...jNgaji(),
      gabung_ke: ['syahriyah_pondok', 'syahriyah_sekolah'], // pondok lebih dulu = prioritas
      gabung_syarat: 'target'
    }
    const daftar = [pondok, sekolah, ngaji]

    const mukim = santri({ is_mukim: true })
    expect(sama(0, mukim, daftar).gabungan).toBe(true) // masuk pondok
    expect(sama(2, mukim, daftar)).toBeNull()

    const nonMukim = santri({ is_mukim: false })
    expect(sama(0, nonMukim, daftar)).toBeNull() // pondok tak berlaku
    expect(sama(1, nonMukim, daftar).gabungan).toBe(true) // jatuh ke sekolah
    expect(sama(2, nonMukim, daftar)).toBeNull()

    // Tak punya sekolah & tak mukim → tak ada tujuan yang berlaku → ngaji berdiri sendiri.
    const sendiri = santri({ is_mukim: false, lembaga_sekolah: '' })
    expect(sama(2, sendiri, daftar).nominal).toBe(90000)
  })

  it('sapuan semi-acak: 400 kombinasi harus identik (termasuk jumlah komponen = nominal)', () => {
    // PRNG deterministik (jangan Math.random: tes harus bisa diulang persis).
    let seed = 20260804
    const rnd = (n) => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      return seed % n
    }
    const LEMB = ['SDI', 'MI', 'PKBM', '', 'entah']
    const NGJ = ['TPQ Pagi', 'PTPT', 'Pra PTPT', '']
    const SHIFT = ['pagi', 'sore', 'pagi_sore', '']
    // Kyai 4 Agu: + 'mahad' (syahriyah pondok sudah termasuk ngaji) & 'target'
    //   (penyaringan diserahkan ke jenis tujuan). Wajib ikut disapu — kalau tidak,
    //   cabang baru di kedua berkas tak pernah dibandingkan sama sekali.
    const SYARAT = ['punya_sekolah', 'fullday', 'mahad', 'target', 'sekolah_pagi', 'fullday_sore']
    const MODE = ['auto', 'gabung', 'pisah']
    for (let i = 0; i < 400; i++) {
      const s = jSekolah()
      s.nominal_per_lembaga = { SDI: 199999 + rnd(3), MI: 175001 }
      if (rnd(2)) s.diskon_anak_guru = 1 + rnd(100)
      if (rnd(3) === 0) s.paket = [{ id: 'p', label: 'P', nominal: 150001 + rnd(5) }]
      if (rnd(3) === 0) s.nominal_gabungan = { '*': { '*': 210003 } }
      if (rnd(4) === 0) s.status_only = ['non_mukim']
      const n = jNgaji()
      n.nominal_per_lembaga = { 'TPQ Pagi': 89999, PTPT: 100001, 'Pra PTPT': 70000 }
      n.gabung_syarat = SYARAT[rnd(SYARAT.length)]
      if (rnd(3) === 0) n.shift_only = [SHIFT[rnd(2)]]
      const daftar = [s, n]
      const sx = santri({
        id: 'S' + i,
        lembaga: NGJ[rnd(NGJ.length)],
        lembaga_sekolah: LEMB[rnd(LEMB.length)],
        shift_ngaji: SHIFT[rnd(SHIFT.length)],
        anak_guru: rnd(2) === 0,
        is_fullday: rnd(3) === 0,
        is_mukim: rnd(4) === 0,
        syahriyah_gabung: MODE[rnd(MODE.length)],
        paket_syahriyah: rnd(4) === 0 ? 'p' : ''
      })
      for (const idx of [0, 1]) {
        const a = js.hitungTagihan(daftar[idx], sx, daftar)
        const b = ts.hitungTagihan(daftar[idx], sx, daftar)
        expect(b).toEqual(a)
        if (a) {
          // invarian uang: jumlah komponen TEPAT = nominal (kalau ada pemecahan)
          if (a.komponen.length)
            expect(a.komponen.reduce((x, k) => x + k.nominal, 0)).toBe(a.nominal)
          expect(a.nominal).toBeGreaterThanOrEqual(0)
        }
      }
      expect([...ts.jenisTergabung(daftar, sx)]).toEqual([...js.jenisTergabung(daftar, sx)])
    }
  })

  it('pencocok whitelist tingkat rendah juga dicermin (statusSantri)', async () => {
    const st = await import('../../vue-app/src/utils/statusSantri.js')
    const kasus = [
      [{ jk: 'L' }, ['L']],
      [{ jk: 'p' }, ['P']],
      [{}, []],
      [{ jk: '' }, ['L', 'P']]
    ]
    for (const [s, wl] of kasus)
      expect(ts.matchJenisKelamin(s, wl)).toBe(st.matchJenisKelamin(s, wl))
    const kasusShift = [
      [{ shift_ngaji: 'pagi' }, ['pagi']],
      [{ shift_ngaji: 'sore' }, ['pagi']],
      [{ shift_ngaji: '' }, ['pagi']],
      [{ shift_ngaji: 'pagi_sore' }, ['sore']],
      [{}, []]
    ]
    for (const [s, wl] of kasusShift)
      expect(ts.matchShiftNgaji(s, wl)).toBe(st.matchShiftNgaji(s, wl))
    const kasusStatus = [
      [{ is_mukim: true }, ['mahad']],
      [{ is_fullday: true }, ['mahad']],
      [{}, ['non_mukim']],
      [{ is_mukim: true }, ['non_mukim', 'fullday']],
      [{}, []]
    ]
    for (const [s, wl] of kasusStatus)
      expect(ts.matchStatusOnly(s, wl)).toBe(st.matchStatusOnly(s, wl))
  })
})
