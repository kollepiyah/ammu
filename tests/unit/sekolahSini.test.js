// Saringan "sekolah di sini" (Kyai, 8 Agu 2026):
//   "untuk generate tagihan khusus ataupun jenis pembayaran bisa ndak kalau dibuat filter
//    untuk semua santri ngaji yg tidak sekolah disini?"
//
// Kosong = TIDAK menyaring — itu janji utamanya: semua jenis yang sudah ada berperilaku
// persis seperti sebelumnya tanpa perlu disunting satu pun.
import { describe, it, expect } from 'vitest'
import { matchSekolahSini } from '../../vue-app/src/utils/statusSantri.js'
import { jenisBerlakuUntuk, gabungTargetFor } from '../../vue-app/src/utils/syahriyah.js'
import { matchSekolahSini as matchDeno } from '../../supabase/functions/auto-generate-tagihan/syahriyah.ts'

const ngajiSaja = { id: 'a', lembaga: 'TPQ Pagi' }
const ngajiSekolah = { id: 'b', lembaga: 'TPQ Pagi', lembaga_sekolah: 'SDI' }

describe('matchSekolahSini', () => {
  it('kosong / nilai asing = tidak menyaring', () => {
    for (const v of ['', null, undefined, 'entah', '   ']) {
      expect(matchSekolahSini(ngajiSaja, v)).toBe(true)
      expect(matchSekolahSini(ngajiSekolah, v)).toBe(true)
    }
  })

  it("'tanpa' = hanya yang TIDAK bersekolah di sini", () => {
    expect(matchSekolahSini(ngajiSaja, 'tanpa')).toBe(true)
    expect(matchSekolahSini(ngajiSekolah, 'tanpa')).toBe(false)
  })

  it("'punya' = hanya yang bersekolah di sini", () => {
    expect(matchSekolahSini(ngajiSekolah, 'punya')).toBe(true)
    expect(matchSekolahSini(ngajiSaja, 'punya')).toBe(false)
  })

  it('lembaga_sekolah berisi spasi saja dianggap KOSONG', () => {
    expect(matchSekolahSini({ lembaga_sekolah: '   ' }, 'tanpa')).toBe(true)
  })

  it('cermin Deno menjawab identik — cabang baru wajib diuji eksplisit', () => {
    for (const s of [ngajiSaja, ngajiSekolah, {}, { lembaga_sekolah: ' ' }]) {
      for (const v of ['', 'punya', 'tanpa', 'ngawur', null]) {
        expect(matchDeno(s, v)).toBe(matchSekolahSini(s, v))
      }
    }
  })
})

describe('jenisBerlakuUntuk ikut menyaring', () => {
  const jenis = (o) => ({ id: 'x', label: 'X', nominal_default: 90000, ...o })

  it('jenis LAMA (tanpa field ini) tak berubah perilakunya', () => {
    expect(jenisBerlakuUntuk(jenis({}), ngajiSaja)).toBe(true)
    expect(jenisBerlakuUntuk(jenis({}), ngajiSekolah)).toBe(true)
  })

  it("sekolah_only 'tanpa' menutup santri yang bersekolah di sini", () => {
    const j = jenis({ sekolah_only: 'tanpa' })
    expect(jenisBerlakuUntuk(j, ngajiSaja)).toBe(true)
    expect(jenisBerlakuUntuk(j, ngajiSekolah)).toBe(false)
  })

  it('⚠️ dipasang bersama gabung_ke MEMATIKAN pelipatan — inilah jebakan yang diperingatkan', () => {
    // Bukan bug: `gabungTargetFor` memang menuntut jenisnya BERLAKU untuk santri itu.
    // Tes ini mengunci perilakunya supaya tak ada yang "membetulkannya" tanpa sadar.
    const daftar = [
      { id: 'sd', label: 'Syahriyah Sekolah SD', nominal_default: 200000, lembaga_only: ['SDI'] },
      {
        id: 'pagi',
        label: 'Qiraati Pagi',
        nominal_default: 90000,
        gabung_ke: ['sd'],
        gabung_syarat: 'punya_sekolah'
      }
    ]
    expect(gabungTargetFor(daftar[1], ngajiSekolah, daftar)?.id).toBe('sd')

    const disaring = [daftar[0], { ...daftar[1], sekolah_only: 'tanpa' }]
    expect(gabungTargetFor(disaring[1], ngajiSekolah, disaring)).toBeNull()
  })
})
