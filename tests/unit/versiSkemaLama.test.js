import { describe, it, expect } from 'vitest'

// Kyai (5 Agu 2026): "di electron update otomatis langsung dari app, di beberapa PC tidak
// bisa."
//
// Dua sebab yang terbukti, keduanya membuat updater DIAM (bukan error yang kelihatan):
//
//  1. `win.publisherName` ada di config padahal installer tak bersertifikat.
//     electron-builder menuliskannya ke app-update.yml; NsisUpdater lalu menjalankan
//     PowerShell Get-AuthenticodeSignature atas installer yang baru diunduh dan menolak
//     berkas yang statusnya NotSigned. Di PC yang PowerShell-nya diblok/bermasalah,
//     verifikasi itu DILEWATI dan update justru jalan — itulah kenapa gagalnya tampak
//     acak "di beberapa PC". Sudah ditambal di vue-app/electron/package.json.
//
//  2. PC yang masih memakai penomoran LAMA (110.0.626, rilis sebelum skema turun ke
//     1.1.x). electron-updater membandingkan dengan semver: 110 > 1.2.x, jadi versi
//     terbaru dianggap LEBIH TUA dan tak pernah ditawarkan. Updater melaporkannya
//     sebagai "sudah versi terbaru" — laporan yang menyesatkan, sebab PC itu justru
//     tertinggal jauh. Satu-satunya jalan keluar = pasang manual sekali.
//
// Tes ini menjaga deteksi kasus (2): kalau ambangnya salah, PC lama kembali diberi kabar
// "sudah terbaru" dan tak pernah ada yang tahu ia tertinggal.
import { versiSkemaLama } from '@/composables/useUpdater'

describe('versiSkemaLama — deteksi PC berversi skema lama (110.x)', () => {
  it('110.0.626 (versi yang benar-benar pernah rilis) dikenali', () => {
    expect(versiSkemaLama('110.0.626')).toBe(true)
  })

  it('versi skema baru TIDAK dianggap lama', () => {
    expect(versiSkemaLama('1.2.7')).toBe(false)
    expect(versiSkemaLama('1.2.8')).toBe(false)
    expect(versiSkemaLama('1.1.4')).toBe(false)
    expect(versiSkemaLama('2.0.0')).toBe(false)
  })

  it('ambang 100: 99.x bukan skema lama, 100.x sudah', () => {
    expect(versiSkemaLama('99.9.9')).toBe(false)
    expect(versiSkemaLama('100.0.0')).toBe(true)
  })

  it('nilai kosong/aneh tak memicu peringatan palsu', () => {
    expect(versiSkemaLama('')).toBe(false)
    expect(versiSkemaLama(null)).toBe(false)
    expect(versiSkemaLama(undefined)).toBe(false)
    expect(versiSkemaLama('bukan-versi')).toBe(false)
  })

  it('berhitung sebagai ANGKA, bukan teks (perbandingan teks akan salah)', () => {
    // Sebagai teks, '9' > '110' — persis kesalahan yang membuat bug ini lolos dulu.
    expect(versiSkemaLama('9.0.0')).toBe(false)
    expect(versiSkemaLama('110.0.0')).toBe(true)
  })
})
