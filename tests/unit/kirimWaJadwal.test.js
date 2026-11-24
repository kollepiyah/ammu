// Pesan WA jadwal piket Pondok Laju. Sejak 24 Nov 2026 dikirim lewat tautan wa.me (nomor Fonnte
// Kyai keblokir), tapi isi pesannya tetap: satu pesan per guru, bertanggal, berkelas.
import { describe, it, expect } from 'vitest'
import { fmtTanggal, piketPerGuru, susunPesanJadwal } from '@/utils/waJadwalLaju'
import { waLink } from '@/utils/format'

const HARI = '2026-11-19'
const baris = (tanggal, sesi, guru_id, kelas = 'Ust. Fulan') => ({
  id: `${tanggal}|${sesi}|${kelas}`,
  tanggal,
  sesi,
  guru_id,
  data: { kelas_guru: kelas, kelas_key: kelas.toLowerCase() }
})

describe('fmtTanggal', () => {
  it('nama hari & bulan Indonesia, tanpa geser zona', () => {
    expect(fmtTanggal('2026-11-24')).toBe('Selasa, 24 Nov 2026')
    expect(fmtTanggal('2026-11-30')).toBe('Senin, 30 Nov 2026')
  })
})

describe('piketPerGuru', () => {
  it('per guru, urut tanggal lalu sesi; tanggal lewat & tanpa guru dibuang', () => {
    const per = piketPerGuru(
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

  it('hari ini masih ikut', () => {
    expect(piketPerGuru([baris(HARI, 'laju1', 'g1')], { hariIni: HARI }).size).toBe(1)
  })

  it('baris rata (tanpa `data`) juga terbaca', () => {
    const per = piketPerGuru(
      [{ id: 'x', tanggal: '2026-11-20', sesi: 'laju1', guru_id: 'g1', kelas_guru: 'Bu Ani' }],
      { hariIni: HARI }
    )
    expect(per.get('g1')[0].kelas).toBe('Bu Ani')
  })
})

describe('susunPesanJadwal', () => {
  it('salam, nama, daftar bertanggal, dan tanda tangan pondok', () => {
    const per = piketPerGuru(
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

  it('masuk utuh ke tautan wa.me', () => {
    const teks = susunPesanJadwal({ nama: 'A', baris: [] })
    const url = waLink('0812-3456-7890', teks)
    expect(url.startsWith('https://wa.me/6281234567890?text=')).toBe(true)
    expect(decodeURIComponent(url.split('?text=')[1])).toBe(teks)
  })
})
