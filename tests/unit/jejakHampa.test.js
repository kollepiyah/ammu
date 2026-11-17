// Kyai 17 Nov 2026, sesudah kueri denyut mesin (CEK-JAM-SCAN.sql no. 5) dijalankan: 22.317 dari
// 31.129 baris `hiview_scan_log` adalah event hampa — major=5 tanpa employeeNo, tanpa cardNo,
// tanpa minorEventType — ±227/hari sejak 6 Agu 2026, tanggalnya kosong sehingga tak pernah
// tampil di panel mana pun. Disaring, TAPI tidak dibuang habis: spanduk "mesin HiView diam"
// membaca satu baris terbaru menurut `created_at` tanpa menyaring hasil, jadi event hampa itulah
// denyut yang membuktikan mesin masih hidup (insiden 24 Sep 2026).
//
// Aturannya edge-only (mesin yang memutuskan, bukan layar), jadi TAK ada cermin di `utils/` —
// yang diuji di sini modul fungsinya langsung, ditambah pagar sumber supaya pelipatan & denyutnya
// tak hilang diam-diam saat index.ts dirapikan.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  hampaTanpaKeterangan,
  idDenyutJam
} from '../../supabase/functions/hiview-absen/jejakHampa.ts'

const baca = (rel) => readFileSync(resolve(process.cwd(), rel), 'utf8')

describe('hampaTanpaKeterangan — mana yang layak baris sendiri', () => {
  it('tanpa kartu & tanpa minor = hampa (bentuk nyata 22.317 baris itu)', () => {
    expect(hampaTanpaKeterangan('', null)).toBe(true)
    expect(hampaTanpaKeterangan('', undefined)).toBe(true)
    expect(hampaTanpaKeterangan('   ', '  ')).toBe(true)
  })

  it('ADA nomor kartu → bukan hampa; inilah satu-satunya jalan tahu nomor kartu versi mesin', () => {
    expect(hampaTanpaKeterangan('3910201836', null)).toBe(false)
    expect(hampaTanpaKeterangan(' 3910201836 ', undefined)).toBe(false)
  })

  it('ADA kode minor → bukan hampa, termasuk minor 0 (jangan tertipu falsy)', () => {
    expect(hampaTanpaKeterangan('', 1)).toBe(false) // kartu
    expect(hampaTanpaKeterangan('', 38)).toBe(false) // sidik jari
    expect(hampaTanpaKeterangan('', 75)).toBe(false) // wajah
    expect(hampaTanpaKeterangan('', 0)).toBe(false)
  })
})

describe('idDenyutJam — melipat per jam mesin', () => {
  it('semua event hampa dalam satu jam memakai id yang SAMA (upsert menimpa, tak menumpuk)', () => {
    const a = idDenyutJam('2026-11-17T10:37:17+07:00')
    const b = idDenyutJam('2026-11-17T10:46:12+07:00')
    expect(a).toBe('hv_denyut_2026111710')
    expect(b).toBe(a)
  })

  it('jam berganti → baris baru, jadi denyutnya tetap terbarui', () => {
    expect(idDenyutJam('2026-11-17T11:00:03+07:00')).toBe('hv_denyut_2026111711')
    expect(idDenyutJam('2026-11-18T10:01:00+07:00')).toBe('hv_denyut_2026111810')
  })

  it('tak bertabrakan dengan id baris lama (`hv_x_<14 digit>`)', () => {
    expect(idDenyutJam('2026-11-17T10:46:12+07:00')).not.toBe('hv_x_20261117104612')
  })

  it('cap waktu tak terbaca → "" supaya pemanggil pakai id biasa; denyut tak boleh hilang', () => {
    expect(idDenyutJam('')).toBe('')
    expect(idDenyutJam(null)).toBe('')
    expect(idDenyutJam('2026-11')).toBe('') // 6 digit, belum menentukan jam
  })
})

describe('pagar sumber: hiview-absen masih melipat yang hampa & mencatat yang berisi', () => {
  it('cabang event diabaikan memakai jejakHampa, lewat idPaksa', () => {
    const src = baca('supabase/functions/hiview-absen/index.ts')
    expect(src).toMatch(/import \{ hampaTanpaKeterangan, idDenyutJam \} from '\.\/jejakHampa\.ts'/)
    expect(src).toMatch(/hampaTanpaKeterangan\(kartu, ace\.minorEventType\)/)
    expect(src).toMatch(/idPaksa: denyut/)
    // Id per event tetap jadi bawaan — hanya yang hampa yang dilipat.
    expect(src).toMatch(/id: j\.idPaksa \|\| idJejak\(j\.empNo, j\.dateTime\)/)
  })

  it('spanduk "mesin diam" masih membaca baris terbaru tanpa menyaring hasil', () => {
    // Kalau kelak disaring ke hasil tertentu, denyut jam ini tak lagi terbaca dan alarm
    // palsu kembali — itulah sebab pelipatan dipilih, bukan pembuangan.
    expect(baca('vue-app/src/views/AbsensiGuruView.vue')).toMatch(
      /queryColl\('hiview_scan_log', \[\], \[\['created_at', 'desc'\]\], 1\)/
    )
  })
})
