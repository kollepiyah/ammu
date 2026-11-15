// Kyai 16 Nov 2026: label shift Pagi-Sore / Pagi / Sore untuk santri (dulu hanya "Pagi saja"/
// "Sore saja"; kartu guru tetap memakai chip "Shift:" dari Master Shift), dan penyaring jenis guru
// Qiraati-Sekolah/Qiraati/Sekolah/Pegawai.
import { describe, it, expect } from 'vitest'
import { labelShiftPagiSore } from '@/utils/labelShift'
import { jenisGuru, isPengajar, normStatusInduk, labelStatusInduk } from '@/utils/jenisGuru'
import { shiftNgajiOf } from '@/utils/kelasHitung'

describe('label shift Pagi-Sore / Pagi / Sore', () => {
  it('santri: semua shift berlabel, termasuk pagi-sore', () => {
    const lbl = (s) => labelShiftPagiSore(shiftNgajiOf(s))
    expect(lbl({ shift_ngaji: 'pagi_sore' })).toBe('Pagi-Sore')
    expect(lbl({ shift_ngaji: 'pagi' })).toBe('Pagi')
    expect(lbl({ guru_sore: 'Ust. A' })).toBe('Sore')
    expect(lbl({ guru_pagi: 'A', guru_sore: 'B' })).toBe('Pagi-Sore')
    expect(lbl({})).toBe('')
  })
})

describe('jenis guru', () => {
  const L = [
    { lembaga: 'PTPT', tipe: 'Qiraati' },
    { lembaga: 'SDI', tipe: 'Formal' },
    { lembaga: 'Sekolah Alam', tipe: 'Formal' }
  ]
  it('Qiraati-Sekolah / Qiraati / Sekolah dari lembaga ngaji & sekolah', () => {
    expect(jenisGuru({ tipe_pegawai: 'guru', lembaga: 'PTPT', lembaga_sekolah: 'SDI' }, L)).toBe(
      'qiraati_sekolah'
    )
    expect(jenisGuru({ tipe_pegawai: 'guru', lembaga: 'PTPT' }, L)).toBe('qiraati')
    expect(jenisGuru({ tipe_pegawai: 'guru', lembaga_sekolah: 'Sekolah Alam' }, L)).toBe('sekolah')
    // data lama: lembaga sekolah tersimpan di kolom `lembaga`
    expect(jenisGuru({ tipe_pegawai: 'guru', lembaga: 'SDI' }, L)).toBe('sekolah')
  })
  it('pegawai non-pengajar → Pegawai; pegawai_guru tetap pengajar', () => {
    expect(jenisGuru({ tipe_pegawai: 'pegawai', lembaga: 'PTPT' }, L)).toBe('pegawai')
    expect(isPengajar({ tipe_pegawai: 'pegawai_guru' })).toBe(true)
    expect(isPengajar({ jabatan: 'Ustadzah' })).toBe(true)
    expect(isPengajar({ jabatan: 'Bendahara' })).toBe(false)
  })
  it('tanpa master lembaga tetap jalan lewat cadangan', () => {
    expect(
      jenisGuru({ tipe_pegawai: 'guru', lembaga: 'TPQ Pagi', lembaga_sekolah: 'SDI' }, [])
    ).toBe('qiraati_sekolah')
  })
})

describe('Induk / Non-Induk (isian manual)', () => {
  it('teks form/Excel dibakukan; kosong/asing = belum diisi', () => {
    expect(normStatusInduk('Induk')).toBe('induk')
    expect(normStatusInduk(' non induk ')).toBe('non_induk')
    expect(normStatusInduk('Non-Induk')).toBe('non_induk')
    expect(normStatusInduk('non_induk')).toBe('non_induk')
    expect(normStatusInduk('')).toBe('')
    expect(normStatusInduk('tetap')).toBe('')
    expect(labelStatusInduk('non_induk')).toBe('Non-Induk')
    expect(labelStatusInduk(undefined)).toBe('')
  })
})
