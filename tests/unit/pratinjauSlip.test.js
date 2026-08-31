// v.1.3.7 (Kyai, 31 Agu 2026): "untuk bisyaroh saya ingin ada simulasi/review per bulan,
// misal bulan ini dan sudah tertera potongannya dll. sebelum generate slip agar bisa koreksi."
//
// Pratinjau ini TIDAK menghitung apa pun sendiri — ia membaca payload dari
// `buildSlipPayload`, fungsi yang sama yang dipakai tombol Generate. Yang diuji di sini
// adalah pekerjaannya yang sebenarnya: memilah angkanya dan MENANDAI yang perlu dilihat
// manusia sebelum uang terbit.
import { describe, it, expect } from 'vitest'
import {
  barisPratinjau,
  ringkasPratinjau,
  rekapPotongan,
  penyesuaianTersimpan
} from '@/utils/pratinjauSlip'

// Payload seperti keluaran buildSlipPayload: bisyaroh 800rb + tunjangan 200rb +
// glondongan 150rb = 1.15jt, potongan 50rb → take home 1.1jt.
const payload = (o = {}) => ({
  guru_id: 'g1',
  guru_nama: 'Ust. Fulan',
  lembaga: 'PTPT',
  jabatan: 'Guru',
  line_items: [
    { kategori: 'ngaji', label: 'Bisyaroh Pagi', nominal: 800000 },
    { kategori: 'tunjangan', label: 'Tunjangan Jabatan', nominal: 200000 }
  ],
  bonus_glondongan: { total: 150000 },
  potongan_list: [{ label: 'Kas Guru', nominal: 50000 }],
  total_pemasukan: 1150000,
  total_potongan: 50000,
  take_home: 1100000,
  ...o
})

describe('barisPratinjau — pemilahan angka', () => {
  it('memisah bisyaroh, tunjangan, dan glondongan dari satu payload', () => {
    const b = barisPratinjau(payload(), null)
    expect(b).toMatchObject({
      nama: 'Ust. Fulan',
      tunjangan: 200000,
      glondongan: 150000,
      bisyaroh: 800000, // pemasukan − tunjangan − glondongan
      potongan: 50000,
      takeHome: 1100000
    })
  })

  it('slip baru yang wajar tidak memunculkan peringatan apa pun', () => {
    expect(barisPratinjau(payload(), null).peringatan).toEqual([])
  })
})

describe('barisPratinjau — penanda yang harus dilihat sebelum generate', () => {
  it('slip yang SUDAH CAIR ditandai — generate ulang mengubah nominal yang sudah dibayar', () => {
    const lama = { take_home: 1100000, status_cair: 'cair' }
    expect(barisPratinjau(payload(), lama).peringatan).toContain('cair')
  })

  it('potongan yang menghabiskan bisyaroh ditandai', () => {
    const b = barisPratinjau(payload({ total_potongan: 1200000, take_home: -50000 }), null)
    expect(b.peringatan).toContain('potongan_melebihi')
  })

  it('guru yang tak kena satu pun jenis ditandai (biasanya scope belum cocok)', () => {
    const b = barisPratinjau(
      payload({
        line_items: [],
        bonus_glondongan: { total: 0 },
        potongan_list: [],
        total_pemasukan: 0,
        total_potongan: 0,
        take_home: 0
      }),
      null
    )
    expect(b.peringatan).toContain('tanpa_pemasukan')
    expect(b.peringatan).not.toContain('potongan_melebihi') // tak ada potongan utk disalahkan
  })

  it('nominal yang berubah dari slip tersimpan ditandai beserta selisihnya', () => {
    const b = barisPratinjau(payload(), { take_home: 1000000 })
    expect(b.peringatan).toContain('berubah')
    expect(b.selisih).toBe(100000)
    expect(b.adaSlipLama).toBe(true)
  })

  it('slip tersimpan dengan nominal SAMA tidak ditandai berubah', () => {
    const b = barisPratinjau(payload(), { take_home: 1100000 })
    expect(b.peringatan).not.toContain('berubah')
    expect(b.selisih).toBe(0)
  })

  it('peringatan terurut: yang menyangkut uang sudah keluar lebih dulu', () => {
    const b = barisPratinjau(payload({ total_potongan: 1200000, take_home: -50000 }), {
      take_home: 900000,
      status_cair: 'cair'
    })
    expect(b.peringatan[0]).toBe('cair')
    expect(b.peringatan).toContain('potongan_melebihi')
    expect(b.peringatan).toContain('berubah')
  })
})

describe('ringkasPratinjau', () => {
  it('menjumlah lintas guru & menghitung yang perlu dilihat', () => {
    const rows = [
      barisPratinjau(payload(), null),
      barisPratinjau(payload({ guru_id: 'g2', guru_nama: 'Ust. B' }), {
        take_home: 900000,
        status_cair: 'cair'
      }),
      barisPratinjau(
        payload({
          guru_id: 'g3',
          guru_nama: 'Ust. C',
          line_items: [],
          bonus_glondongan: { total: 0 },
          potongan_list: [],
          total_pemasukan: 0,
          total_potongan: 0,
          take_home: 0
        }),
        null
      )
    ]
    const r = ringkasPratinjau(rows)
    expect(r).toMatchObject({
      guru: 3,
      pemasukan: 2300000,
      potongan: 100000,
      takeHome: 2200000,
      kenaPotongan: 2,
      perluDilihat: 2, // g2 (cair + berubah) & g3 (tanpa pemasukan)
      akanDitimpa: 1,
      sudahCair: 1
    })
  })

  it('daftar kosong tidak melempar', () => {
    expect(ringkasPratinjau([]).guru).toBe(0)
    expect(ringkasPratinjau(null).takeHome).toBe(0)
  })
})

describe('rekapPotongan — bentuk tercepat melihat scope yang meleset', () => {
  it('mengelompokkan per label, terurut dari nominal terbesar', () => {
    const rows = [
      barisPratinjau(payload(), null),
      barisPratinjau(
        payload({
          guru_id: 'g2',
          guru_nama: 'Ust. B',
          potongan_list: [
            { label: 'Kas Guru', nominal: 50000 },
            { label: 'Seragam Putri', nominal: 300000 }
          ],
          total_potongan: 350000,
          take_home: 800000
        }),
        null
      )
    ]
    const rek = rekapPotongan(rows)
    expect(rek[0]).toMatchObject({ label: 'Seragam Putri', guru: 1, total: 300000 })
    expect(rek[1]).toMatchObject({ label: 'Kas Guru', guru: 2, total: 100000 })
    // Nama ikut supaya "kenapa dia kena?" bisa dijawab tanpa membuka satu per satu.
    expect(rek[0].nama).toEqual(['Ust. B'])
  })
})

// ---------------------------------------------------------------------------
// v.1.3.7 (Kyai, 31 Agu 2026): "saya input potongan tapi dihitung tunjangan."
//
// Angkanya sendiri membuktikan potongannya SUDAH dikurangkan dengan benar: slip yang
// tersimpan lebih KECIL persis sebesar nominal impor. Yang salah pratinjaunya -- ia
// menghitung ulang TANPA penyesuaian bulanan lalu melaporkan bedanya sebagai
// "Nominal berubah +Rp360.000". Tanda plus itulah yang terbaca "potongan jadi tambahan".
//
// Angka di bawah diambil apa adanya dari layar yang Kyai kirim.
// ---------------------------------------------------------------------------
const SCOPE = {
  potongan: new Set(['Kerudung Maulid', 'Sambang Bayi Bu Alfiz']),
  tunjangan: new Set(['Tunjangan Jabatan'])
}

// Pratinjau Hj. Nujumun Nada: bisyaroh 1.060.000 + tunjangan 386.000 - potongan 43.000
const payloadNada = () => ({
  guru_id: 'g9',
  guru_nama: 'Hj. Nujumun Nada',
  lembaga: 'PTPT',
  line_items: [
    { kategori: 'ngaji', label: 'Bisyaroh Pagi', nominal: 1060000 },
    { kategori: 'tunjangan', label: 'Tunjangan Jabatan', nominal: 386000 }
  ],
  bonus_glondongan: { total: 0 },
  potongan_list: [
    { label: 'Kerudung Maulid', nominal: 28000 },
    { label: 'Sambang Bayi Bu Alfiz', nominal: 15000 }
  ],
  total_pemasukan: 1446000,
  total_potongan: 43000,
  take_home: 1403000
})

// Slip tersimpan hasil Impor Excel: potongan bulanan 360.000 -> take home 1.043.000
const slipNadaTersimpan = () => ({
  take_home: 1043000,
  line_items: [
    { kategori: 'ngaji', label: 'Bisyaroh Pagi', nominal: 1060000 },
    { kategori: 'tunjangan', label: 'Tunjangan Jabatan', nominal: 386000 }
  ],
  potongan_list: [
    { label: 'Kerudung Maulid', nominal: 28000 },
    { label: 'Sambang Bayi Bu Alfiz', nominal: 15000 },
    { label: 'Kas', nominal: 360000, sumber: 'bulanan' }
  ]
})

describe('penyesuaianTersimpan', () => {
  it('mengenali potongan bulanan & tidak ikut menghitung potongan ber-scope', () => {
    const p = penyesuaianTersimpan(slipNadaTersimpan(), SCOPE)
    expect(p.potongan).toEqual([{ label: 'Kas', nominal: 360000 }])
    expect(p.totalPotongan).toBe(360000)
    expect(p.totalTunjangan).toBe(0)
    expect(p.netto).toBe(-360000) // menurunkan take home slip tersimpan
  })

  it('baris lama tanpa tanda `sumber` tetap dikenali lewat label', () => {
    const slip = slipNadaTersimpan()
    delete slip.potongan_list[2].sumber
    expect(penyesuaianTersimpan(slip, SCOPE).totalPotongan).toBe(360000)
  })

  it('tanda `sumber` menang walau labelnya kebetulan sama dengan jenis ber-scope', () => {
    const slip = slipNadaTersimpan()
    slip.potongan_list[2] = { label: 'Kerudung Maulid', nominal: 50000, sumber: 'bulanan' }
    expect(penyesuaianTersimpan(slip, SCOPE).totalPotongan).toBe(50000)
  })

  it('tanpa slip lama = tak ada penyesuaian', () => {
    expect(penyesuaianTersimpan(null, SCOPE).netto).toBe(0)
  })
})

describe('regresi Kyai 31 Agu 2026 - potongan impor bukan "nominal berubah +"', () => {
  it('ditandai "penyesuaian_hilang", BUKAN "berubah"', () => {
    const lama = slipNadaTersimpan()
    const b = barisPratinjau(payloadNada(), lama, penyesuaianTersimpan(lama, SCOPE))
    expect(b.peringatan).toContain('penyesuaian_hilang')
    expect(b.peringatan).not.toContain('berubah')
    // Seluruh selisih terjelaskan oleh penyesuaian -> tak ada sisa yang perlu dinamai.
    expect(b.selisih).toBe(360000)
    expect(b.selisihLain).toBe(0)
    // Yang ditampilkan ke Kyai: potongan 360.000 yang akan LENYAP, bukan "+Rp360.000".
    expect(b.penyesuaian.totalPotongan).toBe(360000)
  })

  it('perubahan tarif di luar penyesuaian tetap dinamai "berubah", sisa selisihnya saja', () => {
    const lama = slipNadaTersimpan()
    lama.take_home = 1003000 // 40.000 lebih rendah krn tarif bulan lalu memang beda
    const b = barisPratinjau(payloadNada(), lama, penyesuaianTersimpan(lama, SCOPE))
    expect(b.peringatan).toContain('penyesuaian_hilang')
    expect(b.peringatan).toContain('berubah')
    expect(b.selisih).toBe(400000)
    expect(b.selisihLain).toBe(40000) // 400.000 - 360.000 penyesuaian
  })

  it('slip tanpa penyesuaian bulanan tak pernah kena penanda itu', () => {
    const b = barisPratinjau(
      payloadNada(),
      { take_home: 1403000 },
      penyesuaianTersimpan({ take_home: 1403000 }, SCOPE)
    )
    expect(b.peringatan).not.toContain('penyesuaian_hilang')
    expect(b.selisihLain).toBe(0)
  })

  it('ringkasan menghitung berapa slip & berapa rupiah penyesuaian yang akan lenyap', () => {
    const lama = slipNadaTersimpan()
    const rows = [
      barisPratinjau(payloadNada(), lama, penyesuaianTersimpan(lama, SCOPE)),
      barisPratinjau(payloadNada(), null, penyesuaianTersimpan(null, SCOPE))
    ]
    const r = ringkasPratinjau(rows)
    expect(r.penyesuaianHilang).toBe(1)
    expect(r.penyesuaianPotongan).toBe(360000)
    expect(r.penyesuaianTunjangan).toBe(0)
  })
})
