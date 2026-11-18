// Kyai 19 Nov 2026: jadwal piket Pondok Laju dikirim otomatis lewat WA (Fonnte) begitu admin
// menyimpan jadwal — cukup pengingat, satu pesan per guru, tak boleh dobel saat disimpan ulang.
import { describe, it, expect } from 'vitest'
import {
  nomorWa,
  kunciLog,
  fmtTanggal,
  labelSesi,
  pilihUntukDikirim,
  susunPesanJadwal
} from '../../supabase/functions/kirim-wa-jadwal/pesan.ts'
import { SESI_LAJU, labelSesi as labelSesiApp } from '../../vue-app/src/utils/pondokLajuSesi.js'

const HARI = '2026-11-19'
const baris = (tanggal, sesi, guru_id, kelas = 'Ust. Fulan') => ({
  id: `${tanggal}|${sesi}|${kelas}`,
  tanggal,
  sesi,
  guru_id,
  data: { kelas_guru: kelas, kelas_key: kelas.toLowerCase() }
})

describe('nomorWa', () => {
  it('menerima bentuk umum dan menjadikannya 62…', () => {
    expect(nomorWa('0812-3456-7890')).toBe('6281234567890')
    expect(nomorWa('+62 812 3456 7890')).toBe('6281234567890')
    expect(nomorWa('812345678')).toBe('62812345678')
    expect(nomorWa('6281234567890')).toBe('6281234567890')
  })
  it('kosong / terlalu pendek / bukan Indonesia → ""', () => {
    expect(nomorWa('')).toBe('')
    expect(nomorWa(null)).toBe('')
    expect(nomorWa('0812')).toBe('')
    expect(nomorWa('+1 415 555 0100')).toBe('')
  })
})

describe('label sesi sama dengan app', () => {
  it('setiap sesi app berlabel sama di pesan WA', () => {
    for (const s of SESI_LAJU) expect(labelSesi(s.key)).toBe(labelSesiApp(s.key))
    expect(labelSesi('entah')).toBe(labelSesiApp('entah'))
  })
})

describe('fmtTanggal', () => {
  it('nama hari & bulan Indonesia, tanpa geser zona', () => {
    expect(fmtTanggal('2026-11-24')).toBe('Selasa, 24 Nov 2026')
    expect(fmtTanggal('2026-11-30')).toBe('Senin, 30 Nov 2026')
  })
})

describe('pilihUntukDikirim', () => {
  it('per guru, urut tanggal lalu sesi; tanggal lewat & tanpa guru dibuang', () => {
    const per = pilihUntukDikirim(
      [
        baris('2026-11-21', 'laju2', 'g1'),
        baris('2026-11-21', 'laju1', 'g1'),
        baris('2026-11-20', 'laju2', 'g1'),
        baris('2026-11-18', 'laju1', 'g1'), // kemarin
        baris('2026-11-20', 'laju1', 'g2'),
        baris('2026-11-20', 'laju1', '') // sel kosong
      ],
      { hariIni: HARI }
    )
    expect([...per.keys()]).toEqual(['g1', 'g2'])
    expect(per.get('g1').map((b) => `${b.tanggal}|${b.sesi}`)).toEqual([
      '2026-11-20|laju2',
      '2026-11-21|laju1',
      '2026-11-21|laju2'
    ])
    expect(per.get('g2')[0].kelas).toBe('Ust. Fulan')
  })

  it('hari ini masih dikirim', () => {
    expect(pilihUntukDikirim([baris(HARI, 'laju1', 'g1')], { hariIni: HARI }).size).toBe(1)
  })

  it('penugasan yang sudah terkirim dilewati — guru baru di sel yang sama tetap dikirimi', () => {
    const r = baris('2026-11-20', 'laju1', 'g1')
    const sudah = new Set([kunciLog(r.id, 'g1')])
    expect(pilihUntukDikirim([r], { hariIni: HARI, sudahTerkirim: sudah }).size).toBe(0)
    const diganti = { ...r, guru_id: 'g9' }
    expect([
      ...pilihUntukDikirim([diganti], { hariIni: HARI, sudahTerkirim: sudah }).keys()
    ]).toEqual(['g9'])
  })

  it('baris rata (tanpa `data`) juga terbaca', () => {
    const per = pilihUntukDikirim(
      [{ id: 'x', tanggal: '2026-11-20', sesi: 'laju1', guru_id: 'g1', kelas_guru: 'Bu Ani' }],
      { hariIni: HARI }
    )
    expect(per.get('g1')[0].kelas).toBe('Bu Ani')
  })
})

describe('susunPesanJadwal', () => {
  it('salam, nama, daftar bertanggal, dan tanda tangan pondok', () => {
    const per = pilihUntukDikirim(
      [baris('2026-11-24', 'laju1', 'g1'), baris('2026-11-24', 'laju2', 'g1', 'Bu Ani')],
      { hariIni: HARI }
    )
    const teks = susunPesanJadwal({
      nama: 'Ahmad, S.Pd.',
      baris: per.get('g1'),
      pondok: 'Pondok Pesantren Mambaul Ulum'
    })
    expect(teks).toContain("Assalamu'alaikum")
    expect(teks).toContain('*Ahmad, S.Pd.*')
    expect(teks).toContain('• Selasa, 24 Nov 2026 — *Laju 1* · Kelas Ust. Fulan')
    expect(teks).toContain('• Selasa, 24 Nov 2026 — *Laju 2* · Kelas Bu Ani')
    expect(teks.endsWith('— Pondok Pesantren Mambaul Ulum')).toBe(true)
  })
})
