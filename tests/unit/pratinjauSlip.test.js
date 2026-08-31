// v.1.3.7 (Kyai, 31 Agu 2026): "untuk bisyaroh saya ingin ada simulasi/review per bulan,
// misal bulan ini dan sudah tertera potongannya dll. sebelum generate slip agar bisa koreksi."
//
// Pratinjau ini TIDAK menghitung apa pun sendiri — ia membaca payload dari
// `buildSlipPayload`, fungsi yang sama yang dipakai tombol Generate. Yang diuji di sini
// adalah pekerjaannya yang sebenarnya: memilah angkanya dan MENANDAI yang perlu dilihat
// manusia sebelum uang terbit.
import { describe, it, expect } from 'vitest'
import { barisPratinjau, ringkasPratinjau, rekapPotongan } from '@/utils/pratinjauSlip'

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
