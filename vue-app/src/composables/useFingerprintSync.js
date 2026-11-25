// useFingerprintSync — sinkron scan mesin Fingerspot → absensi_shift_guru (Supabase).
//
// HANYA di Ammu Desktop (Electron). Alur:
//   1) Main process baca att_log Personnel (IPC electronAPI.readAttLog) → [{device_pin, timestamp}]
//   2) match device_pin → guru.id_fingerprint, derivasi shift (utils/shiftDerive, setelan AMMU)
//   3) scan TERAWAL in-window = jam masuk → tulis absensi_shift_guru via db.js (sesi login → RLS)
//
// GUARD: tak menimpa baris existing berstatus izin/sakit; skip baris identik (status+jam sama).
// Tulis pakai source 'fingerprint' (auto) — beda dari 'fingerprint_import' (impor xlsx manual).
// Logika = CERMIN AbsensiGuruView.importFingerprint + fp_sync.py (jembatan sementara).

import { getAll, setOne, mergeOne, queryColl } from '@/services/db'
import { useSettingsStore } from '@/stores/settings'
import { useCollectionsStore } from '@/stores/collections'
import { statusFor, shiftsForGuru, pilihShiftPulang } from '@/utils/shiftDerive'
// v.1.4.6 gel. 3: pengelompokan scan (+ diagnosa scan tanpa absen) pindah ke utils/scanMesin,
//   dipakai bersama tambal log HiView. Perilaku sinkron ini TIDAK berubah.
import {
  kelompokkanScan,
  hitungScanTanpaAbsen,
  shiftMilikHari,
  saringScan,
  idBarisShift,
  tandaAttLog,
  tanggalAwalSinkron
} from '@/utils/scanMesin'
// v.1.5.0: shift Pondok Laju yang aktif per tanggal (jadwal piket Laju 1/2).
import { idShiftLaju, penentuShiftLaju } from '@/utils/shiftLaju'
import { todayJakarta } from '@/utils/format'

/** 'YYYY-MM-DD' mundur n hari (kalender, UTC — tanggalnya sudah tanggal WIB). */
function mundurHari(iso, n) {
  const d = new Date(iso + 'T00:00:00Z')
  d.setUTCDate(d.getUTCDate() - n)
  return d.toISOString().slice(0, 10)
}

// Tetap diekspor dari sini — pemanggil & tes lama mengimpornya dari composable ini.
export { hitungScanTanpaAbsen }

export function useFingerprintSync() {
  const settingsStore = useSettingsStore()
  const collections = useCollectionsStore()

  // sync tersedia? (Electron desktop dgn bridge readAttLog)
  function available() {
    return !!(typeof window !== 'undefined' && window.electronAPI && window.electronAPI.readAttLog)
  }

  /**
   * Jalankan sinkron.
   * @param {object} opts
   * @param {string} [opts.personnelDir] folder install Fingerspot Personnel (kosong = default)
   * @param {boolean} [opts.commit=true] false = dry-run (hitung saja, tak menulis)
   * @param {number} [opts.hariMundur=14] v.1.5.0: hanya scan N hari terakhir yang diproses
   *   (0 = semua riwayat). Dulu SELURUH att_log sejak mesin dipasang dibaca ulang & dicek satu
   *   per satu ke database tiap sinkron — boros kuota bila sinkron otomatis tiap 30 menit.
   * @param {string} [opts.tandaLewati] v.1.5.5: tanda att_log sinkron sukses terakhir — bila
   *   sama (tak ada scan baru, hari sama), sinkron berhenti sebelum menyentuh server.
   * @returns ringkasan { scan, kandidat, written, skipIzin, skipSame, takKenal[], luar, rows[],
   *   tanda } — atau { dilewati: true, tanda } bila tandaLewati cocok.
   */
  async function sync({
    personnelDir = '',
    commit = true,
    hariMundur = 14,
    tandaLewati = ''
  } = {}) {
    if (!available()) {
      throw new Error('Sinkron mesin hanya tersedia di Ammu Desktop (Electron).')
    }
    const res = await window.electronAPI.readAttLog(personnelDir ? { personnelDir } : {})
    if (!res || !res.ok) throw new Error((res && res.error) || 'Gagal baca att_log mesin')
    const semuaScan = res.rows || []
    const hariIni = todayJakarta()
    const dari = Number(hariMundur) > 0 ? mundurHari(hariIni, Number(hariMundur)) : ''
    const { dipakai: scans } = saringScan(semuaScan, { dari, hariIni })
    // Scan terbaru di Personnel — tanda apakah unduh otomatis Personnel dari mesin berjalan.
    const scanTerbaru = semuaScan.length ? String(semuaScan[semuaScan.length - 1].timestamp) : ''
    const tanda = tandaAttLog({
      jumlah: semuaScan.length,
      terbaru: scanTerbaru,
      hariIni,
      hariMundur
    })
    // Audit egress 25 Nov 2026: PC kantor dulu menjalankan ±760 permintaan tiap 5 menit walau
    //   mesin diam. att_log dibaca lokal (tanpa jaringan), jadi pemeriksaan ini gratis.
    if (tandaLewati && tandaLewati === tanda) return { dilewati: true, tanda, scanTerbaru }

    const settings = settingsStore.settings || {}
    // Guru dari langganan bersama (shell desktop sudah memasangnya, realtime) — bukan getAll
    //   tiap putaran. Belum termuat → tarik sekali seperti dulu.
    const guru = collections.isLoaded('guru') ? collections.guru : await getAll('guru')

    // v.1.5.0: shift Pondok Laju per tanggal — dibaca hanya bila Kyai sudah memilih shift sesi.
    let shiftHarian
    if (idShiftLaju(settings).size) {
      try {
        const jadwal = await queryColl('pondok_laju_jadwal', dari ? [['tanggal', '>=', dari]] : [])
        shiftHarian = penentuShiftLaju({ settings, jadwal })
      } catch (e) {
        console.warn('[fp-sync] jadwal Pondok Laju tak terbaca:', e?.message || e)
      }
    }

    // agregasi per (pin, tanggal, shift) → scan TERAWAL = jam masuk; scan lain hari itu =
    //   kandidat PULANG. Aturannya di utils/scanMesin (murni + tes), dipakai juga tambal HiView.
    const { agg, pulangScans, takKenal, luar, luarPer, ganda } = kelompokkanScan(
      scans,
      guru,
      settings,
      shiftHarian
    )

    // Audit egress 25 Nov 2026: baris yang sudah ada ditarik SEKALI untuk seluruh rentang
    //   (dulu getOne per baris, dua kali — ±760 permintaan per sinkron, 1,14 juta sejak 21 Sep).
    //   RLS-nya sama dengan getOne: baris yang tak boleh dibaca tetap tak terlihat.
    const awal = tanggalAwalSinkron(agg, pulangScans)
    const ada = new Map()
    if (awal) {
      const barisAda = await queryColl('absensi_shift_guru', [['tanggal', '>=', awal]])
      for (const r of barisAda) ada.set(String(r.id), r)
    }

    const nowIso = new Date().toISOString()
    let written = 0
    let skipIzin = 0
    let skipSame = 0
    const rows = []
    for (const key of Object.keys(agg)) {
      const a = agg[key]
      const status = statusFor(a.hhmm, a.sh, settings)
      const docId = idBarisShift(a.g.id, a.date, a.sh)
      const existing = ada.get(docId) || null
      if (existing) {
        const exst = String(existing.status || '').toLowerCase()
        if (exst === 'izin' || exst === 'sakit') {
          skipIzin++
          continue
        }
        if (exst === status && String(existing.jam || '') === a.hhmm) {
          skipSame++
          continue
        }
      }
      if (commit) {
        const baris = {
          id: docId,
          guru_id: a.g.id,
          periode: a.date.slice(0, 7),
          guru_nama: a.g.nama,
          tanggal: a.date,
          jam: a.hhmm,
          shift: a.sh,
          status,
          source: 'fingerprint',
          synced_at: nowIso
        }
        await setOne('absensi_shift_guru', docId, baris)
        // Tahap pulang di bawah harus melihat baris yang baru ditulis ini (dulu lewat getOne).
        //   setOne menimpa penuh, jadi jam_pulang lama ikut hilang — cermin perilaku server.
        ada.set(docId, baris)
      }
      written++
      rows.push({ nama: a.g.nama, tanggal: a.date, shift: a.sh, jam: a.hhmm, status })
    }

    // ── Pass PULANG: kandidat pulang → tempel ke baris masuk (hadir/terlambat) pada shift
    // yang PALING BELAKANGAN dimasuki (utils/shiftDerive.pilihShiftPulang). Berlaku semua
    // shift (ngaji pagi/sore-saja jg scan 2×). HANYA MENCATAT jam_pulang (MAX, mergeOne —
    // jaga jam/status masuk). Jalan SESUDAH tulis masuk agar baris terbaru terbaca.
    let pulangWritten = 0
    for (const pk of Object.keys(pulangScans)) {
      const { g, date, times } = pulangScans[pk]
      const shiftRows = {}
      const barisMasuk = []
      for (const sh of shiftMilikHari(g, date, settings, shiftHarian)) {
        const docId = idBarisShift(g.id, date, sh)
        const row = ada.get(docId)
        if (!row) continue
        shiftRows[sh] = { docId, exPulang: String(row.jam_pulang || '') }
        barisMasuk.push({ shift: sh, jam: String(row.jam || ''), status: row.status })
      }
      const perShiftMax = {} // shift → jam pulang MAX
      for (const hhmm of times) {
        for (const sh of pilihShiftPulang(hhmm, barisMasuk, settings)) {
          if (!shiftRows[sh]) continue
          if (!perShiftMax[sh] || hhmm > perShiftMax[sh]) perShiftMax[sh] = hhmm
        }
      }
      for (const sh of Object.keys(perShiftMax)) {
        const { docId, exPulang } = shiftRows[sh]
        const jamPulang = perShiftMax[sh]
        if (exPulang && exPulang >= jamPulang) continue // sudah ada pulang lebih akhir
        if (commit) await mergeOne('absensi_shift_guru', docId, { jam_pulang: jamPulang })
        pulangWritten++
      }
    }

    // Diagnosa: guru yang PUNYA scan tapi NOL baris masuk pada tanggal itu — sebab
    // tersering shift guru kosong/salah ("Perbaiki Shift") atau jam mesin melenceng
    // dari window shift. Logikanya di hitungScanTanpaAbsen (murni, ada tesnya).
    const { daftar: luarGuru, lebih: luarGuruLebih } = hitungScanTanpaAbsen(
      luarPer,
      Object.keys(agg),
      (g) => shiftsForGuru(g, settings)
    )

    return {
      scan: scans.length,
      scanSemua: semuaScan.length,
      scanTerbaru,
      dari,
      kandidat: Object.keys(agg).length,
      written,
      pulangWritten,
      skipIzin,
      skipSame,
      takKenal: [...takKenal],
      // v.1.5.0: PIN yang dipegang >1 guru Aktif (ikut takKenal) — sebut nama-namanya.
      idGanda: [...(ganda || new Map())].map(([pin, list]) => ({
        pin,
        nama: list.map((g) => g.nama || g.id).join(', ')
      })),
      luar,
      luarGuru,
      luarGuruLebih,
      rows,
      tanda
    }
  }

  return { sync, available }
}
