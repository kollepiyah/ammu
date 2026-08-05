import { describe, it, expect } from 'vitest'
import { putusanPembaruan } from '@/composables/useAndroidUpdate'

// Kyai (5 Agu 2026): "di web ada tautan link download android (apk). jika ada update
// baru, supaya tidak nunggu lama dari playstore ... bisa langsung ada notif unduh
// pembaruan untuk android (seperti di electron)".
//
// Di sinilah kesalahan paling mahal bersembunyi: salah arah perbandingan = dialog muncul
// terus-terusan di HP semua guru, atau tak pernah muncul sama sekali — dan dua-duanya
// baru terasa SETELAH rilis. Karena itu keputusannya dipisah jadi fungsi murni.
//
// versionCode Android = angka yang WAJIB naik; itulah pembanding yang sah (bukan
// versionName yang boleh direset, mis. "v.1.2.7" -> "v.07").

const baru = (versionCode, extra = {}) => ({
  versionCode,
  versionName: 'v.1.2.8',
  apkUrl: 'https://example.test/AmmuOnline.apk',
  ...extra
})

describe('putusanPembaruan', () => {
  it('versi lebih baru -> tawarkan', () => {
    expect(putusanPembaruan({ kiniCode: 127, baru: baru(128) })).toBe('tawarkan')
  })

  it('versi sama -> terbaru (JANGAN menawarkan)', () => {
    expect(putusanPembaruan({ kiniCode: 128, baru: baru(128) })).toBe('terbaru')
  })

  it('app lebih baru dari berkas (web belum ikut deploy) -> terbaru, bukan tawaran turun-versi', () => {
    expect(putusanPembaruan({ kiniCode: 129, baru: baru(128) })).toBe('terbaru')
  })

  it('apkUrl kosong -> belum-siap (jangan tawarkan tautan hampa)', () => {
    expect(putusanPembaruan({ kiniCode: 127, baru: baru(128, { apkUrl: '' }) })).toBe('belum-siap')
  })

  it('versionCode kosong/0 -> belum-siap', () => {
    expect(putusanPembaruan({ kiniCode: 127, baru: baru(0) })).toBe('belum-siap')
    expect(putusanPembaruan({ kiniCode: 127, baru: {} })).toBe('belum-siap')
  })

  it('versionCode berbentuk teks tetap dibandingkan sebagai ANGKA', () => {
    // App.getInfo().build mengembalikan string; '99' vs '128' sebagai teks akan salah urut.
    expect(putusanPembaruan({ kiniCode: '99', baru: baru('128') })).toBe('tawarkan')
    expect(putusanPembaruan({ kiniCode: '128', baru: baru('99') })).toBe('terbaru')
  })

  it('versi yang pernah dilewati: diam pada cek OTOMATIS', () => {
    expect(putusanPembaruan({ kiniCode: 127, baru: baru(128), dilewatiCode: '128' })).toBe(
      'dilewati'
    )
  })

  it('versi yang pernah dilewati: tetap ditawarkan kalau pengguna menekan tombolnya sendiri', () => {
    expect(
      putusanPembaruan({ kiniCode: 127, baru: baru(128), dilewatiCode: '128', manual: true })
    ).toBe('tawarkan')
  })

  it('melewati versi 128 TIDAK membungkam versi 129', () => {
    expect(putusanPembaruan({ kiniCode: 127, baru: baru(129), dilewatiCode: '128' })).toBe(
      'tawarkan'
    )
  })

  it('pembaruan wajib tak bisa dibungkam meski pernah dilewati', () => {
    expect(
      putusanPembaruan({ kiniCode: 127, baru: baru(128, { wajib: true }), dilewatiCode: '128' })
    ).toBe('tawarkan')
  })

  it('menerima bentuk {code} maupun {versionCode}', () => {
    const b = { code: 128, apkUrl: 'https://example.test/a.apk' }
    expect(putusanPembaruan({ kiniCode: 127, baru: b })).toBe('tawarkan')
  })

  it('kiniCode tak dikenal (0) tetap menawarkan — lebih baik ditawari daripada tertinggal', () => {
    expect(putusanPembaruan({ kiniCode: 0, baru: baru(128) })).toBe('tawarkan')
  })
})
