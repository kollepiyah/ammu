// Kyai (3 Nov 2026): "santri yg diajukan tes harusnya gk bisa diajukan jika tes sebelumnya
// belum lulus/dibatalkan. coba cek"
//
// Dulu hanya ajuan berstatus 'diajukan' yang mengunci. Santri yang baru dinyatakan BELUM
// LULUS bisa langsung diajukan lagi sebagai ajuan baru — glondongannya pun dibuat ulang.
// Keputusan Kyai: ajuan berakhir hanya bila Lulus / Dibatalkan / Ditolak; "Belum lulus"
// diuji ulang PJ di ajuan yang sama.
import { describe, it, expect } from 'vitest'
import { ajuanPengunci, STATUS_TUNTAS } from '@/utils/tesKenaikan'

const santri = { id: 's1', lembaga: 'PTPT', kelas: '3', juz: 'Juz 12' }
const ajuan = (status, ts, extra = {}) => ({
  id: `a${ts}`,
  santri_id: 's1',
  lembaga: 'PTPT',
  kelas_asal: '3',
  juz_asal: 'Juz 12',
  status,
  _ts: ts,
  ...extra
})

describe('ajuanPengunci', () => {
  it('tanpa ajuan → bebas', () => {
    expect(ajuanPengunci([], santri)).toBeNull()
  })

  it('menunggu tes → terkunci', () => {
    expect(ajuanPengunci([ajuan('diajukan', 1)], santri)?.id).toBe('a1')
  })

  it('belum lulus → TERKUNCI (inti perbaikan)', () => {
    expect(ajuanPengunci([ajuan('tidak_lulus', 1)], santri)?.status).toBe('tidak_lulus')
  })

  it.each(STATUS_TUNTAS)('ajuan terakhir %s → bebas', (st) => {
    expect(ajuanPengunci([ajuan('tidak_lulus', 1), ajuan(st, 2)], santri)).toBeNull()
  })

  it('yang menentukan adalah ajuan TERAKHIR, bukan urutan larik', () => {
    expect(ajuanPengunci([ajuan('tidak_lulus', 5), ajuan('lulus', 2)], santri)?.id).toBe('a5')
  })

  it('ajuan "diajukan" mana pun tetap mengunci walau ada yang lebih baru', () => {
    expect(ajuanPengunci([ajuan('diajukan', 1), ajuan('lulus', 9)], santri)?.id).toBe('a1')
  })

  it('status kosong (data lama) dianggap menunggu', () => {
    expect(ajuanPengunci([ajuan('', 1)], santri)).not.toBeNull()
  })

  it('belum lulus untuk jenjang yang SUDAH ditinggalkan tak lagi mengunci', () => {
    const naikManual = { ...santri, kelas: '4', juz: 'Juz 16' }
    expect(ajuanPengunci([ajuan('tidak_lulus', 1)], naikManual)).toBeNull()
  })

  it('santri lain tak terpengaruh', () => {
    expect(ajuanPengunci([ajuan('diajukan', 1)], { id: 's2' })).toBeNull()
  })
})
