// v.95.0626: Sumber data statistik ter-scope untuk Dashboard Statistik.
//   - admin / super_admin (full): lihat SEMUA santri.
//   - Kepala / PJ / Pengasuh: hanya se-lembaga-nya (via lembagaScopeMatches).
//   Dipakai oleh StatistikView + GuruBelumInputView (+ kartu Kelas Overload).
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSantri } from '@/composables/useSantri'
import { lembagaScopeMatches } from '@/composables/useLembaga'
import { isFullFilterRole } from '@/utils/roleScope'

// Rasio Guru:Santri per lembaga (1 guru mengampu N santri). Lembaga sekolah = tanpa rasio.
export const RASIO_GURU_SANTRI = {
  'tpq pagi': 5,
  'tpq sore': 10,
  'pra ptpt': 5,
  'ptpt': 10,
  'ppph': 10
}

// Ambang status PPPH/PTPT dari selisih (akhir - awal).
export function statusFromSelisih(diff, lembaga) {
  const d = Number(diff) || 0
  if (d <= 0) return null
  const isPPPH = String(lembaga || '').trim().toLowerCase() === 'ppph'
  if (isPPPH) {
    // v.95.0626 (kyai): PPPH hadits — Kurang <5, Cukup 5-20, Bagus >20
    if (d < 5) return 'kurang'
    if (d <= 20) return 'cukup'
    return 'bagus'
  }
  // PTPT (halaman) — Kurang <5, Cukup 5-9, Bagus >=10
  if (d < 5) return 'kurang'
  if (d < 10) return 'cukup'
  return 'bagus'
}

export function useStatistikScope() {
  const auth = useAuthStore()
  const { santriRaw } = useSantri()

  // admin/super_admin/kepala-PJ boleh lihat dashboard statistik
  const isAdminMode = computed(() => isFullFilterRole(auth.sesiAktif))
  // full = lihat SEMUA (bukan kepala yang ke-scope)
  const isFullAdmin = computed(() => {
    const s = auth.sesiAktif
    if (!s) return false
    return s.id === 'admin' || ['super_admin', 'admin'].includes(s.role_sistem)
  })

  // santri aktif sesuai scope role
  const scopedSantriAktif = computed(() => {
    const all = (santriRaw.value || []).filter((s) => s && s.aktif !== false)
    if (isFullAdmin.value) return all
    // Kepala / PJ: se-lembaga-nya (ngaji atau sekolah)
    const ul = auth.sesiAktif?.lembaga
    if (!ul) return []
    return all.filter(
      (s) => lembagaScopeMatches(ul, s.lembaga) || lembagaScopeMatches(ul, s.lembaga_sekolah)
    )
  })

  // periode bulan berjalan — format match InputBulananView (`YYYY_MM`)
  const periodeKeyNow = computed(() => {
    const d = new Date()
    return `${d.getFullYear()}_${String(d.getMonth() + 1).padStart(2, '0')}`
  })

  const _guruNgaji = (s) => [
    ...new Set([s.guru_pagi, s.guru_sore, s.guru].map((g) => String(g || '').trim()).filter(Boolean))
  ]

  // Guru yang BELUM input data santri bulan ini (per rekap = catatan_bulanan[periodeKey]).
  //   Hanya santri ngaji (punya lembaga ngaji + guru ngaji). 1 guru -> daftar santri belum diinput.
  const guruBelumInput = computed(() => {
    const pk = periodeKeyNow.value
    const m = new Map()
    for (const s of scopedSantriAktif.value) {
      if (!s.lembaga) continue // hanya ngaji (Input Bulanan = data ngaji)
      const gurus = _guruNgaji(s)
      if (gurus.length === 0) continue
      const sudah =
        s.catatan_bulanan &&
        typeof s.catatan_bulanan === 'object' &&
        Object.prototype.hasOwnProperty.call(s.catatan_bulanan, pk)
      if (sudah) continue
      for (const g of gurus) {
        if (!m.has(g)) m.set(g, { guru: g, santri: [] })
        m.get(g).santri.push({
          id: String(s.id),
          nama: s.nama || '(tanpa nama)',
          lembaga: s.lembaga || '',
          kelas: s.kelas || ''
        })
      }
    }
    return [...m.values()]
      .filter((x) => x.santri.length > 0)
      .map((x) => ({ ...x, jml: x.santri.length }))
      .sort((a, b) => b.jml - a.jml || a.guru.localeCompare(b.guru))
  })

  // Kelas Overload — per (guru x lembaga x kelas) ngaji; overload bila jml santri > rasio lembaga.
  const kelasOverload = computed(() => {
    const m = new Map()
    for (const s of scopedSantriAktif.value) {
      const lemb = String(s.lembaga || '').trim()
      const kelas = String(s.kelas || '').trim()
      const ratio = RASIO_GURU_SANTRI[lemb.toLowerCase()]
      if (!ratio || !lemb || !kelas) continue // sekolah / lembaga tanpa rasio -> skip
      for (const g of _guruNgaji(s)) {
        const key = `${g.toLowerCase()}|${lemb.toLowerCase()}|${kelas.toLowerCase()}`
        if (!m.has(key)) m.set(key, { guru: g, lembaga: lemb, kelas, ratio, jml: 0 })
        m.get(key).jml++
      }
    }
    return [...m.values()]
      .filter((x) => x.jml > x.ratio)
      .map((x) => ({ ...x, lebih: x.jml - x.ratio }))
      .sort((a, b) => b.lebih - a.lebih || (a.lembaga + a.kelas).localeCompare(b.lembaga + b.kelas))
  })

  return {
    isAdminMode,
    isFullAdmin,
    scopedSantriAktif,
    periodeKeyNow,
    guruBelumInput,
    kelasOverload
  }
}
