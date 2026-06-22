// v.100d: Promosi kenaikan QIRAATI — SUMBER TUNGGAL logika "naik" (dipakai NaikKelasView + Tes Kenaikan).
//   Diekstrak apa-adanya dari NaikKelasView.saveFormKenaikan + resolveKenaikanSchemaPath (perilaku TAK berubah);
//   `settings` & `lembagaList` yang dulu ref view, kini parameter.
import { getKartuKenaikanSchema } from './kenaikan'
import { setOne, updateOne } from '@/services/db'

// v.21.75: Resolve kelas label dari Form Kenaikan ke schema {kelasId, itemId}
// PTPT: {kelas: "Kelas 1", juz: "5"} → {kelasId: "kelas_1", itemId: "juz_5"}
// Pra PTPT: {kelas: "Level 1", khotam_ke: "I"} → {kelasId: "lvl_1", itemId: "kh_I"}
// TPQ: {kelas: "Jilid 1A"} → {kelasId: "jilid_1", itemId: "1A"}
// PPPH: {kelas: "Level 1 (Arba'in Nawawi)"} → {kelasId: "lvl_1", itemId: "arb_done"}
export function resolveKenaikanSchemaPath(lembaga, kelasLabel, juzNum, khotamKe, settings) {
  if (!lembaga || !kelasLabel) return { kelasId: null, itemId: null }
  const schema = getKartuKenaikanSchema(lembaga, settings)
  if (!schema || !Array.isArray(schema.kelasList)) return { kelasId: null, itemId: null }

  // 1) Direct match: kelasLabel === parent.label (PTPT/Pra PTPT/PPPH/single-item TPQ)
  let kelasEntry = schema.kelasList.find((k) => k.label === kelasLabel)
  if (kelasEntry) {
    let itemId = null
    if (juzNum) {
      const it = kelasEntry.items.find(
        (i) => i.label === `Juz ${juzNum}` || i.id === `juz_${juzNum}`
      )
      itemId = it?.id || null
    } else if (khotamKe) {
      const it = kelasEntry.items.find(
        (i) => i.label === khotamKe || i.label === String(khotamKe).toUpperCase()
      )
      itemId = it?.id || null
    } else if (kelasEntry.items.length === 1) {
      itemId = kelasEntry.items[0].id
    }
    return { kelasId: kelasEntry.id, itemId }
  }

  // 2) TPQ combined: "Jilid 1A" → parent "Jilid 1" + item "1A"
  for (const parent of schema.kelasList) {
    for (const it of parent.items) {
      const stripped = parent.label.replace(/\s+\d+$/, '') // "Jilid 1" → "Jilid"
      const cand1 = `${stripped} ${it.label}` // "Jilid 1A"
      const cand2 = `${parent.label}${it.label}` // "Jilid 11A"
      const cand3 = `${parent.label} ${it.label}` // "Jilid 1 1A"
      if (kelasLabel === cand1 || kelasLabel === cand2 || kelasLabel === cand3) {
        return { kelasId: parent.id, itemId: it.id }
      }
    }
  }

  return { kelasId: null, itemId: null }
}

/**
 * Bangun payload kenaikan Qiraati (PURE — tak menulis Firestore).
 * @param {Object} s - dokumen santri (sumber kelas/lembaga/riwayat lama).
 * @param {Object} opts - { lembaga, kelas, juz, khotam_ke, guru, kelas_sekolah, catatan }.
 * @param {Object} ctx - { settings, lembagaList }.
 * @returns {{ payload: Object, rkEntry: Object }}
 */
export function buildKenaikanQiraatiPayload(s, opts = {}, ctx = {}) {
  const settings = ctx.settings
  const lembagaList = ctx.lembagaList || []
  const lmbBaru = opts.lembaga || ''
  const klsBaru = opts.kelas || ''
  const khotamKe = lmbBaru.toLowerCase().trim() === 'pra ptpt' ? opts.khotam_ke || '' : ''

  const payload = {
    kelas_sekolah: opts.kelas_sekolah || '',
    lembaga: opts.lembaga || '',
    kelas: opts.kelas || '',
    guru: opts.guru || ''
  }
  if (opts.lembaga === 'PTPT' && opts.juz) {
    payload.juz = `JUZ ${opts.juz}`
  }
  const today = new Date().toISOString().slice(0, 10)
  const todayId = new Date().toLocaleDateString('id-ID')

  // v.21.75: Update kartu_kenaikan via schema-aware path (kelasId.itemId = tanggal)
  const kk = { ...(s.kartu_kenaikan || {}) }
  const lmb = opts.lembaga
  const kls = opts.kelas
  if (lmb && kls) {
    const resolved = resolveKenaikanSchemaPath(lmb, kls, opts.juz, opts.khotam_ke, settings)
    if (resolved.kelasId) {
      if (!kk[lmb]) kk[lmb] = {}
      if (!kk[lmb][resolved.kelasId]) kk[lmb][resolved.kelasId] = {}
      const block = kk[lmb][resolved.kelasId]
      if (!Array.isArray(block.entries)) block.entries = []
      if (resolved.itemId) {
        block[resolved.itemId] = today
      }
      // v.100e: ceremonial TIDAK auto-isi. Tgl ceremonial/khotaman (PTPT/PPPH/PK) diisi MANUAL
      //   lewat editor kartu (NaikKelasView setCeremonial) saat acara benar-benar digelar.
      if (opts.catatan && opts.catatan.trim()) {
        block.entries.push({
          tanggal: today,
          itemId: resolved.itemId || 'kenaikan',
          tipe: 'catatan',
          text: opts.catatan.trim()
        })
      }
      payload.kartu_kenaikan = kk
    } else {
      if (!kk[lmb]) kk[lmb] = {}
      if (!kk[lmb][kls]) kk[lmb][kls] = {}
      // v.100e: ceremonial diisi MANUAL (tidak auto-stamp di sini).
      payload.kartu_kenaikan = kk
    }
  }

  // Append riwayat (text) — backward compatibility
  const riwayat = Array.isArray(s.riwayat) ? [...s.riwayat] : []
  const last = riwayat.length > 0 ? riwayat[riwayat.length - 1] : null
  const fromKls = last?.kelas_to || s.kelas || ''
  const toKls = opts.kelas || ''
  const sameLembaga = (s.lembaga || '') === lmbBaru
  const aksi = sameLembaga ? 'Naik' : 'Dipindah'
  let ket = `${aksi} ke ${lmbBaru} Kelas ${klsBaru}`
  if (lmbBaru === 'PTPT' && opts.juz) ket += ` (Juz ${opts.juz})`
  if (lmbBaru === 'Pra PTPT' && khotamKe) ket += ` (Khotam ${khotamKe})`
  if (opts.guru) ket += ` | Guru: ${opts.guru}`

  if (fromKls !== toKls || opts.juz || khotamKe) {
    riwayat.push({
      tgl_naik: today,
      tanggal: todayId,
      keterangan: ket,
      lembaga: lmbBaru || s.lembaga || '',
      kelas_from: fromKls,
      kelas_to: toKls,
      juz: opts.juz ? `JUZ ${opts.juz}` : null,
      catatan: opts.catatan || '',
      guru: opts.guru || ''
    })

    // PATCH v.21.50 — Auto-catatan transisi penting (Poin 13 legacy)
    const lmbgL = (s.lembaga || '').toUpperCase()
    const klsL = (s.kelas || '').toLowerCase()
    const lmbgB = (lmbBaru || '').toUpperCase()
    const klsB = (klsBaru || '').toLowerCase()
    // 1) Persiapan Khotaman → Pra PTPT (level 1)
    if (
      klsL.includes('persiapan khotaman') &&
      lmbgB.includes('PRA PTPT') &&
      klsB.includes('level 1')
    ) {
      riwayat.push({
        tanggal: todayId,
        tgl_naik: today,
        keterangan: `Telah LULUS IMTAS pada tanggal ${todayId}`
      })
    }
    // 2) Pra PTPT level 5 → PTPT kelas 1
    else if (
      lmbgL.includes('PRA PTPT') &&
      klsL.includes('level 5') &&
      lmbgB === 'PTPT' &&
      klsB.includes('kelas 1')
    ) {
      riwayat.push({
        tanggal: todayId,
        tgl_naik: today,
        keterangan: `Telah Khotam Al-Qur'an bil Nazhor 60x pada tanggal ${todayId}`
      })
    }
    // 3) PTPT (kelas terakhir) → lembaga lain
    else if (lmbgL === 'PTPT' && lmbgB !== 'PTPT' && lmbgB !== '') {
      const lembagaPTPT = (lembagaList || []).find(
        (l) => String(l.lembaga || '').toUpperCase() === 'PTPT'
      )
      const klsListPTPT = (lembagaPTPT && (lembagaPTPT.kelas_list || lembagaPTPT.kelas)) || [
        'Kelas 6'
      ]
      const kelasTerakhirPTPT = klsListPTPT[klsListPTPT.length - 1] || 'Kelas 6'
      if ((s.kelas || '').toLowerCase() === String(kelasTerakhirPTPT).toLowerCase()) {
        riwayat.push({
          tanggal: todayId,
          tgl_naik: today,
          keterangan: `Alhamdulillah, ananda ${s.nama} telah khotam Al-Qur'an 30 juz bil Ghoib pada tanggal ${todayId}`
        })
      }
    }

    payload.riwayat = riwayat
  }

  // PATCH v.21.50 — riwayat_kenaikan structured (legacy compat)
  const rkEntry = {
    tanggal: today,
    tanggal_display: todayId,
    dari_lembaga: s.lembaga || '',
    dari_kelas: s.kelas || '',
    ke_lembaga: lmbBaru,
    ke_kelas: klsBaru,
    khotam_ke: khotamKe || '',
    juz: lmbBaru === 'PTPT' ? `JUZ ${opts.juz}` : ''
  }
  payload.riwayat_kenaikan = Array.isArray(s.riwayat_kenaikan)
    ? [...s.riwayat_kenaikan, rkEntry]
    : [rkEntry]

  return { payload, rkEntry }
}

/**
 * Tulis kenaikan ke Firestore: update dokumen santri + event koleksi `riwayat_kenaikan`
 * (sumber notif untuk wali; best-effort — kegagalan event tak menggagalkan kenaikan).
 */
export async function writeKenaikan(s, payload, rkEntry) {
  await updateOne('santri', String(s.id), payload)
  try {
    const evId = `rk_${s.id}_${Date.now()}`
    await setOne('riwayat_kenaikan', evId, {
      id: evId,
      santri_id: String(s.id),
      santri_nama: s.nama || '',
      dari_lembaga: rkEntry.dari_lembaga || '',
      dari_kelas: rkEntry.dari_kelas || '',
      ke_lembaga: rkEntry.ke_lembaga || '',
      ke_kelas: rkEntry.ke_kelas || '',
      khotam_ke: rkEntry.khotam_ke || '',
      tanggal: rkEntry.tanggal || '',
      createdAt: new Date().toISOString()
    })
  } catch (e) {
    console.warn('[kenaikan-event] gagal tulis riwayat_kenaikan:', e?.message || e)
  }
}
