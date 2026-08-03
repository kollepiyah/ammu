import { describe, it, expect } from 'vitest'
import {
  ddmmyyDari,
  nomorStrukBerikutnya,
  kunciTransaksi,
  buatTrxUid
} from '../../vue-app/src/utils/trxStruk.js'

describe('ddmmyyDari — ekor nomor struk', () => {
  it('YYYY-MM-DD -> ddmmyy', () => {
    expect(ddmmyyDari('2026-08-01')).toBe('010826')
  })

  it('tanggal kosong -> string kosong (jangan lempar)', () => {
    expect(ddmmyyDari('')).toBe('')
    expect(ddmmyyDari(null)).toBe('')
  })
})

describe('nomorStrukBerikutnya — anti nomor kembar', () => {
  it('hari kosong -> mulai dari 001', () => {
    expect(nomorStrukBerikutnya('2026-08-01', [])).toBe('MU-001010826')
  })

  it('lanjut dari nomor TERBESAR, bukan dari jumlah baris', () => {
    // 3 nomor tapi tertinggi 007 -> berikutnya 008 (bukan 004)
    const dipakai = ['MU-001010826', 'MU-005010826', 'MU-007010826']
    expect(nomorStrukBerikutnya('2026-08-01', dipakai)).toBe('MU-008010826')
  })

  it('BUG YANG DIPERBAIKI: daftar tak lengkap tak boleh dipakai — nomor yang sudah ada dilewati', () => {
    // Skenario lama: counter mundur ke 8 padahal 009 sudah terpakai. Kalau pemanggil
    // menyodorkan daftar yang memuat 009, fungsi ini WAJIB lompat ke 010.
    const dipakai = ['MU-009010826']
    expect(nomorStrukBerikutnya('2026-08-01', dipakai)).toBe('MU-010010826')
  })

  it('nomor hari LAIN tidak menaikkan seq hari ini', () => {
    const dipakai = ['MU-050310726', 'MU-002010826']
    expect(nomorStrukBerikutnya('2026-08-01', dipakai)).toBe('MU-003010826')
  })

  it('seq >999 tetap jalan (tanpa padding paksa)', () => {
    expect(nomorStrukBerikutnya('2026-08-01', ['MU-999010826'])).toBe('MU-1000010826')
  })

  it('abaikan trx_id kosong/null dari baris lama', () => {
    expect(nomorStrukBerikutnya('2026-08-01', ['', null, undefined, 'MU-004010826'])).toBe(
      'MU-005010826'
    )
  })
})

describe('kunciTransaksi — satu struk = satu transaksi', () => {
  it('pakai trx_uid bila ada (baris baru)', () => {
    expect(
      kunciTransaksi({ trx_uid: 'MU-001010826#abc', trx_id: 'MU-001010826', santri_id: '7' })
    ).toBe('MU-001010826#abc')
  })

  it('BARIS LAMA: nomor struk KEMBAR antar santri -> kunci BERBEDA', () => {
    // Inti bug lapor Kyai 3 Agu 2026: transaksi santri TK & santri SD sama-sama
    // MU-009010826 lalu menyatu jadi satu struk 7 item.
    const tk = { trx_id: 'MU-009010826', santri_id: '101' }
    const sd = { trx_id: 'MU-009010826', santri_id: '202' }
    expect(kunciTransaksi(tk)).not.toBe(kunciTransaksi(sd))
  })

  it('baris dari transaksi yang SAMA tetap satu kunci', () => {
    const a = { trx_id: 'MU-009010826', santri_id: '101', kategori: 'Syahriyah' }
    const b = { trx_id: 'MU-009010826', santri_id: '101', kategori: 'Fullday' }
    expect(kunciTransaksi(a)).toBe(kunciTransaksi(b))
  })

  it('santri_id numerik vs string dianggap sama (adapter Supabase bisa dua-duanya)', () => {
    expect(kunciTransaksi({ trx_id: 'MU-001010826', santri_id: 101 })).toBe(
      kunciTransaksi({ trx_id: 'MU-001010826', santri_id: '101' })
    )
  })

  it('tanpa trx_id -> fallback santri+tanggal+operator', () => {
    const r = { santri_id: '101', tanggal: '2026-08-01', operator: 'Isa' }
    expect(kunciTransaksi(r)).toBe('101__2026-08-01__Isa')
  })

  it('baris kosong/null -> string kosong (jangan lempar)', () => {
    expect(kunciTransaksi(null)).toBe('')
  })
})

describe('buatTrxUid', () => {
  it('membawa nomor struk + selalu berbeda tiap panggilan', () => {
    const a = buatTrxUid('MU-001010826')
    const b = buatTrxUid('MU-001010826')
    expect(a.startsWith('MU-001010826#')).toBe(true)
    expect(a).not.toBe(b)
  })
})
