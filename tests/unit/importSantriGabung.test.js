// Regresi kelas bug: "impor file parsial MENGHAPUS kolom yang sudah terisi".
//
// Laporan Kyai (21 Jul 2026): file A lengkap (guru ngaji terisi, guru sekolah kosong),
// file B kebalikannya. Impor B menimpa hasil A sampai kosong. Sebabnya dua lapis:
//   1. `_pick` di SantriView mengembalikan '' untuk kolom yang TAK ADA di file, lalu
//      applyImportFields tetap menjalankan `imp` → menulis '' ke payload.
//   2. `mergeOne` (db.js `_deepMerge`) mengganti PRIMITIF — jadi '' menang atas nilai lama.
// Aturan sekarang: sel kosong → field dilewati; sel terisi → tetap menimpa.
import { describe, it, expect } from 'vitest'
import { applyImportFields, selKosong, petakanNomorIdentitas } from '@/services/santriFields'

// Cermin `_pick` milik SantriView.onImportSantri (alias + fallback lowercase).
function pick(row, ...aliases) {
  for (const a of aliases) {
    if (row[a] !== undefined && row[a] !== null && row[a] !== '') return row[a]
  }
  const lower = {}
  for (const k of Object.keys(row)) lower[k.toLowerCase().trim()] = row[k]
  for (const a of aliases) {
    const v = lower[String(a).toLowerCase().trim()]
    if (v !== undefined && v !== null && v !== '') return v
  }
  return ''
}

describe('selKosong', () => {
  it('null / undefined / spasi = kosong', () => {
    expect(selKosong(null)).toBe(true)
    expect(selKosong(undefined)).toBe(true)
    expect(selKosong('')).toBe(true)
    expect(selKosong('   ')).toBe(true)
  })

  it('`false` dan `0` BUKAN kosong — itu nilai sungguhan', () => {
    // "Status Aktif" diisi false harus tetap tertulis, bukan dianggap sel kosong.
    expect(selKosong(false)).toBe(false)
    expect(selKosong(0)).toBe(false)
  })

  it('teks biasa bukan kosong', () => {
    expect(selKosong('Bu Mazidatur')).toBe(false)
  })
})

describe('applyImportFields — sel kosong tidak menimpa', () => {
  it('SKENARIO KYAI: file B (guru sekolah saja) tak menghapus guru ngaji dari file A', () => {
    const fileB = { 'Guru Sekolah (pisah |)': 'Ust. Fulan' }
    const payload = applyImportFields({}, fileB, pick)
    // Kolom guru pagi/sore TIDAK ADA di file B → tak boleh muncul di payload sama
    // sekali, supaya mergeOne mempertahankan nilai dari file A.
    expect('guru_pagi' in payload).toBe(false)
    expect('guru_sore' in payload).toBe(false)
    expect(payload.guru_sekolah).toEqual(['Ust. Fulan'])
  })

  it('kebalikannya: file A (guru ngaji saja) tak menghapus guru sekolah', () => {
    const fileA = { 'Guru Pagi': 'Bu Mazidatur', 'Guru Sore': 'Bu Lilik Masudah' }
    const payload = applyImportFields({}, fileA, pick)
    expect('guru_sekolah' in payload).toBe(false)
    expect(payload.guru_pagi).toBe('Bu Mazidatur')
    expect(payload.guru_sore).toBe('Bu Lilik Masudah')
  })

  it('sel ADA tapi kosong tetap dilewati (bukan hanya kolom yang hilang)', () => {
    const row = { 'Guru Pagi': '   ', 'Guru Sore': 'Bu Lilik Masudah' }
    const payload = applyImportFields({}, row, pick)
    expect('guru_pagi' in payload).toBe(false)
    expect(payload.guru_sore).toBe('Bu Lilik Masudah')
  })

  it('sel terisi TETAP menimpa — aturannya gabung, bukan tolak-perubahan', () => {
    const row = { 'PJ PTPT': 'Ust. Baru', Gedung: 'Induk' }
    const payload = applyImportFields({}, row, pick)
    expect(payload.pj_ptpt).toBe('Ust. Baru')
    expect(payload.gedung).toBe('Induk')
  })

  it('L/P kosong TIDAK lagi diam-diam jadi "L"', () => {
    // Bug lama: imp L/P memakai `_s(v || 'L')` → impor tanpa kolom L/P mengubah
    // SEMUA santri jadi laki-laki. Sekarang field-nya dilewati.
    const payload = applyImportFields({}, { 'Nama Panggilan': 'Fulan' }, pick)
    expect('jk' in payload).toBe(false)
  })

  it('L/P terisi tetap terbaca', () => {
    expect(applyImportFields({}, { 'L/P': 'p' }, pick).jk).toBe('P')
  })

  it('Status Aktif kosong tidak memaksa aktif=true', () => {
    // Dulu parseAktif('') → true, jadi impor tanpa kolom status "menghidupkan"
    // kembali santri yang sudah di-nonaktifkan.
    const payload = applyImportFields({}, { 'Nama Panggilan': 'Fulan' }, pick)
    expect('aktif' in payload).toBe(false)
  })

  it('Status Aktif diisi false tetap tertulis false', () => {
    expect(applyImportFields({}, { 'Status Aktif (true/false)': 'false' }, pick).aktif).toBe(false)
  })

  it('baris kosong melompong menghasilkan payload kosong (tak menghapus apa pun)', () => {
    const payload = applyImportFields({}, { 'Guru Pagi': '', Gedung: null }, pick)
    expect(Object.keys(payload)).toHaveLength(0)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Laporan Kyai (21 Jul 2026): "data impor xlsx lama yg belum ada kolom no induk
// tapi sudah saya isi NIS, nis malah menimpa kolom no induk, padahal no induk itu
// di generate oleh aplikasi."
//
// Dulu ada heuristik: file tanpa kolom 'No. Induk' -> kolom 'NIS' dianggap nomor
// pondok dan ditulis ke `nis`. Meleset untuk file yang kolom NIS-nya berisi NIS
// DINAS -> menimpa No. Induk hasil generate aplikasi.
// ─────────────────────────────────────────────────────────────────────────────
describe('petakanNomorIdentitas', () => {
  it('SKENARIO KYAI: file lama tanpa kolom No. Induk → nis TIDAK diisi dari NIS', () => {
    const out = petakanNomorIdentitas({ NIS: '0060200412' }, pick)
    expect(out.nis).toBe('') // '' = jangan sentuh No. Induk hasil generate
    expect(out.nis_sekolah).toBe('0060200412')
  })

  it('template baru: tiap kolom ke fieldnya sendiri', () => {
    const out = petakanNomorIdentitas({ 'No. Induk': '03.00472', NIS: '0060200412' }, pick)
    expect(out.nis).toBe('03.00472')
    expect(out.nis_sekolah).toBe('0060200412')
  })

  it('alias No. Induk dikenali', () => {
    expect(petakanNomorIdentitas({ 'No Induk': '123' }, pick).nis).toBe('123')
    expect(petakanNomorIdentitas({ no_induk: '123' }, pick).nis).toBe('123')
  })

  it('alias NIS Dinas dikenali', () => {
    expect(petakanNomorIdentitas({ 'NIS Dinas': '999' }, pick).nis_sekolah).toBe('999')
    expect(petakanNomorIdentitas({ nis_sekolah: '999' }, pick).nis_sekolah).toBe('999')
  })

  it('"0" dari formula Excel dianggap kosong, bukan nomor', () => {
    // Sumber Excel ber-formula SORTBY atas sel kosong menghasilkan angka 0.
    const out = petakanNomorIdentitas({ 'No. Induk': 0, NIS: '0' }, pick)
    expect(out.nis).toBe('')
    expect(out.nis_sekolah).toBe('')
  })

  it('baris tanpa kolom nomor sama sekali → dua-duanya ""', () => {
    const out = petakanNomorIdentitas({ 'Nama Santri': 'Fulan' }, pick)
    expect(out).toEqual({ nis: '', nis_sekolah: '' })
  })

  it('No. Induk terisi TIDAK tertukar ke nis_sekolah', () => {
    // Penjaga arah pemetaan — kalau tertukar, nomor pondok jadi NIS Dinas.
    const out = petakanNomorIdentitas({ 'No. Induk': '03.00472' }, pick)
    expect(out.nis_sekolah).toBe('')
  })
})
