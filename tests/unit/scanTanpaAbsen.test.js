import { describe, it, expect } from 'vitest'
import { hitungScanTanpaAbsen } from '@/composables/useFingerprintSync'

// Keluhan Kyai (5 Agu 2026): "ada beberapa guru yg absennya tidak masuk".
// Sinkron fingerprint membuang scan yang tak jatuh di window shift mana pun, dan
// selama ini itu hanya jadi ANGKA `luar` — jadi tak ada cara tahu guru mana yang
// hilang, apalagi kenapa. hitungScanTanpaAbsen menyaring kasus yang benar-benar
// bermasalah: (pin, tanggal) dengan scan di luar window TAPI nol baris masuk.
//
// Yang TIDAK boleh dilaporkan: (pin, tanggal) yang punya baris masuk — di sana scan
// di luar window itu wajar, itu ceklok pulang. Kalau ini salah, tabel diagnosa akan
// penuh derau harian dan Kyai berhenti mempercayainya.

const shiftsOf = (g) => g.shift_ids || []

describe('hitungScanTanpaAbsen (diagnosa absen guru tak masuk)', () => {
  it('guru dengan shift KOSONG dilaporkan + sebabnya konfigurasi', () => {
    const luarPer = {
      '7|2026-08-04': {
        nama: 'Ust. Fulan',
        guru: { shift_ids: [] },
        date: '2026-08-04',
        times: ['06:12']
      }
    }
    const { daftar, lebih } = hitungScanTanpaAbsen(luarPer, [], shiftsOf)
    expect(lebih).toBe(0)
    expect(daftar).toHaveLength(1)
    expect(daftar[0]).toMatchObject({
      nama: 'Ust. Fulan',
      tanggal: '2026-08-04',
      shiftGuru: [],
      sebab: 'guru belum punya shift'
    })
  })

  it('guru PUNYA shift tapi jam melenceng → sebabnya jam, bukan konfigurasi', () => {
    const luarPer = {
      '9|2026-08-04': {
        nama: 'Ust. Ahmad',
        guru: { shift_ids: ['pagi', 'sore'] },
        date: '2026-08-04',
        times: ['04:40']
      }
    }
    const { daftar } = hitungScanTanpaAbsen(luarPer, [], shiftsOf)
    expect(daftar[0].sebab).toBe('jam di luar window shift')
    expect(daftar[0].shiftGuru).toEqual(['pagi', 'sore'])
  })

  it('TIDAK melaporkan hari yang sudah punya baris masuk (itu ceklok pulang)', () => {
    const luarPer = {
      '9|2026-08-04': {
        nama: 'Ust. Ahmad',
        guru: { shift_ids: ['pagi'] },
        date: '2026-08-04',
        times: ['16:30']
      }
    }
    // Pass masuk sudah menghasilkan baris untuk pin 9 tanggal 4 shift pagi.
    const { daftar } = hitungScanTanpaAbsen(luarPer, ['9|2026-08-04|pagi'], shiftsOf)
    expect(daftar).toEqual([])
  })

  it('baris masuk di shift lain pada tanggal yang sama tetap menutup laporan', () => {
    const luarPer = {
      '9|2026-08-04': {
        nama: 'Ust. Ahmad',
        guru: { shift_ids: ['pagi', 'pra_ptpt_ptpt_sore'] },
        date: '2026-08-04',
        times: ['21:10']
      }
    }
    const { daftar } = hitungScanTanpaAbsen(luarPer, ['9|2026-08-04|pra_ptpt_ptpt_sore'], shiftsOf)
    expect(daftar).toEqual([])
  })

  it('baris masuk di TANGGAL LAIN tidak menutup laporan hari yang bermasalah', () => {
    const luarPer = {
      '9|2026-08-04': {
        nama: 'Ust. Ahmad',
        guru: { shift_ids: ['pagi'] },
        date: '2026-08-04',
        times: ['06:00']
      }
    }
    const { daftar } = hitungScanTanpaAbsen(luarPer, ['9|2026-08-03|pagi'], shiftsOf)
    expect(daftar).toHaveLength(1)
    expect(daftar[0].tanggal).toBe('2026-08-04')
  })

  it('jam scan diurutkan naik supaya mudah dibaca', () => {
    const luarPer = {
      '5|2026-08-04': {
        nama: 'Ust. Zaid',
        guru: { shift_ids: [] },
        date: '2026-08-04',
        times: ['21:05', '04:30', '13:15']
      }
    }
    const { daftar } = hitungScanTanpaAbsen(luarPer, [], shiftsOf)
    expect(daftar[0].jam).toEqual(['04:30', '13:15', '21:05'])
  })

  it('urut tanggal lalu nama', () => {
    const mk = (nama, date) => ({ nama, guru: { shift_ids: [] }, date, times: ['06:00'] })
    const luarPer = {
      'a|2026-08-05': mk('Zulkifli', '2026-08-05'),
      'b|2026-08-04': mk('Yusuf', '2026-08-04'),
      'c|2026-08-04': mk('Ali', '2026-08-04')
    }
    const { daftar } = hitungScanTanpaAbsen(luarPer, [], shiftsOf)
    expect(daftar.map((d) => `${d.tanggal} ${d.nama}`)).toEqual([
      '2026-08-04 Ali',
      '2026-08-04 Yusuf',
      '2026-08-05 Zulkifli'
    ])
  })

  it('batas memotong dan melaporkan sisanya', () => {
    const luarPer = {}
    for (let i = 1; i <= 7; i++) {
      luarPer[`${i}|2026-08-0${i}`] = {
        nama: 'Guru ' + i,
        guru: { shift_ids: [] },
        date: `2026-08-0${i}`,
        times: ['06:00']
      }
    }
    const { daftar, lebih } = hitungScanTanpaAbsen(luarPer, [], shiftsOf, 5)
    expect(daftar).toHaveLength(5)
    expect(lebih).toBe(2)
  })

  it('input kosong / null aman', () => {
    expect(hitungScanTanpaAbsen(null, null, shiftsOf)).toEqual({ daftar: [], lebih: 0 })
    expect(hitungScanTanpaAbsen({}, [], shiftsOf)).toEqual({ daftar: [], lebih: 0 })
  })

  it('resolver shift yang mengembalikan undefined tak bikin meledak', () => {
    const luarPer = {
      '1|2026-08-04': { nama: 'X', guru: {}, date: '2026-08-04', times: ['06:00'] }
    }
    const { daftar } = hitungScanTanpaAbsen(luarPer, [], () => undefined)
    expect(daftar[0].shiftGuru).toEqual([])
    expect(daftar[0].sebab).toBe('guru belum punya shift')
  })
})
