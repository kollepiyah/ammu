// Tes utils/pesanGalatDb — penerjemah galat penyimpanan ke bahasa penggunanya.
//
// Yang dijaga di sini bukan gaya bahasa, melainkan satu janji: penolakan RLS
// TIDAK BOLEH lagi sampai ke layar sebagai kalimat Postgres. Keluhan 12 Sep 2026
// ("izin selalu gagal") menempuh perjalanan sia-sia justru karena toast-nya
// berbunyi `new row violates row-level security policy for table "izin_guru"` —
// benar, tapi tak memberi tahu siapa pun bahwa sebabnya peran akun.
import { describe, it, expect } from 'vitest'
import { pesanGalatDb } from '@/utils/pesanGalatDb'

describe('pesanGalatDb — penolakan RLS', () => {
  const galatRls = {
    code: '42501',
    message: 'new row violates row-level security policy for table "izin_guru"'
  }

  it('menerjemahkan galat RLS jadi "akses ditolak", bukan kalimat Postgres', () => {
    const s = pesanGalatDb(galatRls, { aksi: 'mengirim pengajuan izin' })
    expect(s).toContain('Akses ditolak')
    expect(s).toContain('mengirim pengajuan izin')
    expect(s.toLowerCase()).not.toContain('row-level security policy for table')
  })

  it('menyebut peran akun supaya satu tangkapan layar cukup untuk mendiagnosis', () => {
    const s = pesanGalatDb(galatRls, { aksi: 'mengirim pengajuan izin', peran: 'admin_keuangan' })
    expect(s).toContain('admin_keuangan')
  })

  it('membawa nama tabel sebagai jejak teknis di ujung kalimat', () => {
    expect(pesanGalatDb(galatRls, { aksi: 'x' })).toContain('[izin_guru]')
  })

  it('mengenali penolakan RLS Storage, yang kalimatnya TANPA nama tabel', () => {
    // storage-api membalas bentuk lain: statusCode string + pesan terpotong.
    const s = pesanGalatDb(
      { statusCode: '403', message: 'new row violates row-level security policy' },
      { aksi: 'mengunggah lampiran' }
    )
    expect(s).toContain('Akses ditolak')
    expect(s).not.toContain('[')
  })

  it('meneruskan kalimat trigger penjaga kita sendiri, bukan menimpanya', () => {
    // guard_supervisi_respon_target memakai errcode 42501 yang sama, tapi pesannya
    // sudah berbahasa Indonesia DAN menjelaskan batasnya.
    const s = pesanGalatDb(
      {
        code: '42501',
        message: 'forbidden: penerima catatan supervisi hanya boleh mengisi tanggapan & status'
      },
      { aksi: 'menyunting catatan', peran: 'guru' }
    )
    expect(s).toContain('hanya boleh mengisi tanggapan & status')
    expect(s).toContain('Akses ditolak')
    expect(s).not.toContain('forbidden')
  })

  it('mengenali penolakan yang datang lewat pesan buatan db.js (tanpa kode)', () => {
    // updateOne/_putRow melempar Error biasa saat UPDATE menghasilkan 0 baris.
    const s = pesanGalatDb(
      new Error(
        'Gagal menyimpan supervisi_catatan/s1: tak ada baris yang berubah (kemungkinan ditolak RLS / hak akses kurang).'
      ),
      { aksi: 'mengirim tanggapan' }
    )
    // Tak ada kode maupun frasa "row-level security" -> jatuh ke cabang terakhir,
    // dan itu memang benar: pesannya sudah berbahasa Indonesia dan sudah menyebut
    // RLS. Yang penting ia TIDAK hilang.
    expect(s).toContain('tak ada baris yang berubah')
    expect(s).toContain('mengirim tanggapan')
  })
})

describe('pesanGalatDb — sebab lain', () => {
  it('sesi kedaluwarsa disuruh login ulang, bukan disuruh menghubungi admin', () => {
    const s = pesanGalatDb({ code: '401', message: 'JWT expired' }, { aksi: 'menyimpan' })
    expect(s).toContain('Sesi login sudah kedaluwarsa')
    expect(s).not.toContain('admin')
  })

  it('gagal jaringan tidak disalahartikan sebagai soal hak akses', () => {
    const s = pesanGalatDb(new TypeError('Failed to fetch'), { aksi: 'mengirim pengajuan' })
    expect(s).toContain('sambungan ke server terputus')
    expect(s).not.toContain('Akses ditolak')
  })

  it('bentrok kunci unik menyuruh memeriksa dulu, bukan mengulang membabi buta', () => {
    const s = pesanGalatDb({ code: '23505', message: 'duplicate key value' }, { aksi: 'menyimpan' })
    expect(s).toContain('sudah terkirim sebelumnya')
  })

  it('galat yang tak dikenali diteruskan APA ADANYA — menyembunyikannya = membuat buta', () => {
    const s = pesanGalatDb(new Error('kolom "periode" tidak ditemukan'), { aksi: 'menyimpan' })
    expect(s).toContain('kolom "periode" tidak ditemukan')
  })

  it('galat kosong/aneh tetap menghasilkan kalimat, bukan "undefined"', () => {
    expect(pesanGalatDb(null)).not.toContain('undefined')
    expect(pesanGalatDb(undefined, { aksi: 'menyimpan data' })).toContain('menyimpan data')
    expect(pesanGalatDb('boom')).toContain('boom')
  })
})
