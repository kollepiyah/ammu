// v.100 Batch8: Audit Kesehatan Data (data-health) — deteksi masalah integritas data
//   santri/guru/lembaga + kandidat duplikat fuzzy (nama mirip). REPORT-ONLY (tidak mengubah data).
//   Dipakai di MasterDataView tab "Audit Data".
import { computed } from 'vue'

function norm(v) {
  return String(v == null ? '' : v).trim().toLowerCase().replace(/\s+/g, ' ')
}
function isEmptyStr(v) {
  return v == null || String(v).trim() === ''
}
// Validitas nomor HP Indonesia (kanonik 62XXXX, minimal ~10 digit).
function canonPhone(v) {
  let d = String(v == null ? '' : v).replace(/\D/g, '')
  if (!d) return ''
  d = d.replace(/^0+/, '')
  if (d.startsWith('62')) d = d.slice(2)
  d = d.replace(/^0+/, '')
  return d ? '62' + d : ''
}
function isPhoneValid(v) {
  if (isEmptyStr(v)) return false
  return canonPhone(v).length >= 10 && canonPhone(v).length <= 15
}
function isGuruAktif(status) {
  return !status || ['aktif', 'tetap', 'kontrak'].includes(String(status).toLowerCase())
}
// Kunci agresif untuk deteksi nama mirip: buang semua non-alfanumerik + gelar umum.
function fuzzyKey(nama) {
  return norm(nama)
    .replace(/\b(m|moh|moch|muh|mhd|h|hj|kh|ust|ustadz|ustadzah|drs|s\.?pd|s\.?ag|a\.?ma)\b/g, '')
    .replace(/[^a-z0-9]/g, '')
}

/**
 * @param {import('vue').Ref<Array>} santriRef
 * @param {import('vue').Ref<Array>} guruRef
 * @param {import('vue').Ref<Array>} lembagaRef
 */
export function useDataAudit(santriRef, guruRef, lembagaRef) {
  const santriAktif = computed(() => (santriRef.value || []).filter((s) => s.aktif !== false))
  const guruAktif = computed(() => (guruRef.value || []).filter((g) => isGuruAktif(g.status)))

  // Set nama guru aktif (untuk deteksi referensi guru "yatim")
  const guruNamaSet = computed(() => {
    const set = new Set()
    for (const g of guruAktif.value) {
      const n = norm(g.nama)
      if (n) set.add(n)
    }
    return set
  })

  function santriGuruRefs(s) {
    const ngaji = [s.guru, s.guru_pagi, s.guru_sore]
    const sek = Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []
    return [...ngaji, ...sek].map((x) => String(x || '').trim()).filter(Boolean)
  }

  function sLabel(s) {
    const lmb = s.lembaga || s.lembaga_sekolah || '-'
    return { id: String(s.id), nama: s.nama || '(tanpa nama)', detail: `NIS ${s.nis || '-'} · ${lmb}` }
  }
  function gLabel(g) {
    return {
      id: String(g.id),
      nama: g.nama || '(tanpa nama)',
      detail: `${g.jabatan || '-'} · ${g.lembaga || g.lembaga_sekolah || '-'}`
    }
  }

  const auditGroups = computed(() => {
    const out = []
    const sList = santriAktif.value
    const gList = guruAktif.value

    // ── SANTRI ────────────────────────────────────────────────
    const sTanpaNis = sList.filter((s) => isEmptyStr(s.nis))
    out.push({ key: 's_nis', label: 'Santri tanpa NIS', icon: 'fa-id-badge', sev: 'warn', items: sTanpaNis.map(sLabel) })

    const sTanpaLembaga = sList.filter((s) => isEmptyStr(s.lembaga) && isEmptyStr(s.lembaga_sekolah))
    out.push({ key: 's_lembaga', label: 'Santri tanpa lembaga', icon: 'fa-building-circle-xmark', sev: 'danger', items: sTanpaLembaga.map(sLabel) })

    const sTanpaGuru = sList.filter((s) => {
      const ngajiLmb = !isEmptyStr(s.lembaga)
      const sekLmb = !isEmptyStr(s.lembaga_sekolah)
      const adaGuruNgaji = !isEmptyStr(s.guru) || !isEmptyStr(s.guru_pagi) || !isEmptyStr(s.guru_sore)
      const adaGuruSek = Array.isArray(s.guru_sekolah) && s.guru_sekolah.filter(Boolean).length > 0
      // bermasalah bila punya lembaga tapi sama sekali belum punya guru
      return (ngajiLmb || sekLmb) && !adaGuruNgaji && !adaGuruSek
    })
    out.push({ key: 's_guru', label: 'Santri belum punya guru', icon: 'fa-user-slash', sev: 'warn', items: sTanpaGuru.map(sLabel) })

    const sWaKosong = sList.filter((s) => isEmptyStr(s.wa))
    out.push({ key: 's_wa_kosong', label: 'Santri tanpa No. WA wali', icon: 'fa-mobile-screen', sev: 'info', items: sWaKosong.map(sLabel) })

    const sWaInvalid = sList.filter((s) => !isEmptyStr(s.wa) && !isPhoneValid(s.wa))
    out.push({ key: 's_wa_invalid', label: 'Santri: No. WA tidak valid', icon: 'fa-triangle-exclamation', sev: 'warn', items: sWaInvalid.map((s) => ({ ...sLabel(s), detail: `WA "${s.wa}"` })) })

    // Referensi guru "yatim": santri menunjuk guru yang tak ada di daftar guru aktif
    const sGuruYatim = []
    for (const s of sList) {
      const refs = santriGuruRefs(s).filter((r) => {
        // abaikan nilai sampah boolean
        if (r === 'true' || r === 'false') return false
        return !guruNamaSet.value.has(norm(r))
      })
      if (refs.length) sGuruYatim.push({ ...sLabel(s), detail: `guru tak dikenal: ${refs.join(', ')}` })
    }
    out.push({ key: 's_guru_yatim', label: 'Santri merujuk guru tak terdaftar', icon: 'fa-user-xmark', sev: 'danger', items: sGuruYatim })

    // Field guru sampah (boolean true/false) — kandidat dibersihkan
    const sGuruSampah = sList.filter((s) => {
      const bad = (v) => v === true || v === false || v === 'true' || v === 'false'
      if (bad(s.guru) || bad(s.guru_pagi) || bad(s.guru_sore)) return true
      if (Array.isArray(s.guru_sekolah) && s.guru_sekolah.some(bad)) return true
      return false
    })
    out.push({ key: 's_guru_sampah', label: 'Santri: field guru berisi nilai sampah (true/false)', icon: 'fa-broom', sev: 'warn', items: sGuruSampah.map(sLabel) })

    // ── GURU ──────────────────────────────────────────────────
    const gTanpaJabatan = gList.filter((g) => isEmptyStr(g.jabatan))
    out.push({ key: 'g_jabatan', label: 'Guru/pegawai tanpa jabatan', icon: 'fa-user-tag', sev: 'info', items: gTanpaJabatan.map(gLabel) })

    const gTanpaLembaga = gList.filter((g) => isEmptyStr(g.lembaga) && isEmptyStr(g.lembaga_sekolah))
    out.push({ key: 'g_lembaga', label: 'Guru/pegawai tanpa lembaga', icon: 'fa-building-circle-xmark', sev: 'warn', items: gTanpaLembaga.map(gLabel) })

    const gWaInvalid = gList.filter((g) => !isEmptyStr(g.wa) && !isPhoneValid(g.wa))
    out.push({ key: 'g_wa_invalid', label: 'Guru: No. WA tidak valid', icon: 'fa-triangle-exclamation', sev: 'warn', items: gWaInvalid.map((g) => ({ ...gLabel(g), detail: `WA "${g.wa}"` })) })

    // ── LEMBAGA ───────────────────────────────────────────────
    const lemList = lembagaRef.value || []
    const lembTanpaKelas = lemList.filter((l) => !Array.isArray(l.kelas) || l.kelas.length === 0)
    out.push({ key: 'l_kelas', label: 'Lembaga tanpa daftar kelas', icon: 'fa-layer-group', sev: 'info', items: lembTanpaKelas.map((l) => ({ id: String(l.id || l.lembaga), nama: l.lembaga || l.nama || '-', detail: 'kelas: kosong' })) })

    const lembTanpaSantri = lemList.filter((l) => {
      const nm = norm(l.lembaga || l.nama)
      if (!nm) return false
      return !sList.some((s) => norm(s.lembaga) === nm || norm(s.lembaga_sekolah) === nm)
    })
    out.push({ key: 'l_santri', label: 'Lembaga tanpa santri aktif', icon: 'fa-school-circle-xmark', sev: 'info', items: lembTanpaSantri.map((l) => ({ id: String(l.id || l.lembaga), nama: l.lembaga || l.nama || '-', detail: '0 santri aktif' })) })

    return out
  })

  // ── KANDIDAT DUPLIKAT FUZZY (nama mirip, report-only) ───────
  const fuzzyDup = computed(() => {
    const build = (list, kind) => {
      const map = new Map()
      for (const it of list) {
        const fk = fuzzyKey(it.nama)
        if (!fk || fk.length < 3) continue
        if (!map.has(fk)) map.set(fk, [])
        map.get(fk).push(it)
      }
      const groups = []
      for (const [, arr] of map) {
        if (arr.length < 2) continue
        // hanya tampilkan bila bentuk NAMA-nya beda (yang persis-sama sudah ditangani Migrate)
        const distinct = new Set(arr.map((x) => norm(x.nama)))
        if (distinct.size < 2) continue
        groups.push({
          kind,
          items: arr.map((x) => ({ id: String(x.id), nama: x.nama || '-', detail: kind === 'santri' ? `NIS ${x.nis || '-'}` : (x.jabatan || '-') }))
        })
      }
      return groups
    }
    return [...build(santriAktif.value, 'santri'), ...build(guruAktif.value, 'guru')]
  })

  const totalIssues = computed(() => auditGroups.value.reduce((n, g) => n + g.items.length, 0))
  const totalFuzzy = computed(() => fuzzyDup.value.length)

  return { auditGroups, fuzzyDup, totalIssues, totalFuzzy }
}
