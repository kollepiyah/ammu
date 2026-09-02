// v.95.0626: Sumber data statistik ter-scope untuk Dashboard Statistik.
//   - admin / super_admin (full): lihat SEMUA santri.
//   - Kepala / PJ / Pengasuh: hanya se-lembaga-nya (via lembagaScopeMatches).
//   Dipakai oleh StatistikView + GuruBelumInputView (+ kartu Kelas Overload).
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSantri } from '@/composables/useSantri'
import { useCollectionsStore } from '@/stores/collections'
import { storeToRefs } from 'pinia'
import { lembagaScopeMatches } from '@/composables/useLembaga'
import { isFullFilterRole } from '@/utils/roleScope'
import { todayJakarta } from '@/utils/format'
// v.1.3.8: siklus & cakupan rekap prestasi — sumber tunggal, dipakai juga RekapPrestasiView.
import {
  periodeRekapBerjalan,
  batasRekap,
  rekapTerlambat,
  punyaPrestasiBulanan,
  petaPrestasiPeriode,
  sudahDinilaiBulan
} from '@/utils/prestasiBulanan'
// v.1.3.8 (Kyai, 2 Sep 2026): "untuk guru yg sepasang jangan dipisah daftarnya."
import { pasanganSantri, kunciPasangan, labelPasanganRingkas } from '@/utils/pasanganGuru'

// Rasio Guru:Santri per lembaga (1 guru mengampu N santri). Lembaga sekolah = tanpa rasio.
export const RASIO_GURU_SANTRI = {
  'tpq pagi': 5,
  'tpq sore': 10,
  'pra ptpt': 5,
  ptpt: 10,
  ppph: 10
}

// Ambang status PPPH/PTPT dari selisih (akhir - awal).
export function statusFromSelisih(diff, lembaga) {
  const d = Number(diff) || 0
  if (d <= 0) return null
  const isPPPH =
    String(lembaga || '')
      .trim()
      .toLowerCase() === 'ppph'
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
  // v.1.3.8: snapshot prestasi bulanan lewat store terpusat (idempotent — beberapa
  //   komponen memanggil composable ini, tapi langganannya tetap satu per sesi).
  const _coll = useCollectionsStore()
  const { riwayatPrestasi } = storeToRefs(_coll)
  onMounted(() => _coll.ensure('riwayat_prestasi'))

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

  // v.96.0626: scoped TERMASUK non-aktif (utk KPI total/aktif/non di StatistikView).
  const scopedSantriAll = computed(() => {
    const all = santriRaw.value || []
    if (isFullAdmin.value) return all
    const ul = auth.sesiAktif?.lembaga
    if (!ul) return []
    return all.filter(
      (s) => s && (lembagaScopeMatches(ul, s.lembaga) || lembagaScopeMatches(ul, s.lembaga_sekolah))
    )
  })

  // v.1.3.8 (Kyai, 1 Sep 2026): periode yang SEDANG dikerjakan = bulan LALU, batas tgl 5.
  //   Dulu di sini bulan BERJALAN — tiap tanggal 1 seluruh guru serentak dinyatakan "belum
  //   input" untuk bulan yang memang belum boleh diisi siapa pun, sementara pekerjaan yang
  //   sungguh jatuh tempo (bulan lalu) tak terpantau. Aturannya di utils/prestasiBulanan.
  const periodeRekap = computed(() => periodeRekapBerjalan(todayJakarta())) // 'YYYY-MM'
  const batasRekapNow = computed(() => batasRekap(periodeRekap.value)) // 'YYYY-MM-DD'
  const rekapSudahTerlambat = computed(() => rekapTerlambat(periodeRekap.value, todayJakarta()))

  const _guruNgaji = (s) => [
    ...new Set(
      [s.guru_pagi, s.guru_sore, s.guru].map((g) => String(g || '').trim()).filter(Boolean)
    )
  ]

  // Guru yang BELUM mengisi rekap prestasi untuk periode yang jatuh tempo.
  //
  // v.1.3.8, tiga koreksi sekaligus (Kyai, 1 Sep 2026):
  //   · periodenya bulan LALU, bukan bulan berjalan (lihat periodeRekap di atas);
  //   · hanya PTPT & PPPH — rekap prestasi bulanan memang cuma milik keduanya sejak
  //     v.1.2.3, jadi menagih guru TPQ/Pra PTPT tak pernah ada dasarnya;
  //   · penandanya SNAPSHOT `riwayat_prestasi`, bukan lagi `catatan_bulanan` semata.
  //     Ini yang paling menyesatkan: RekapPrestasiView — layar yang justru dipakai PTPT
  //     & PPPH — tak pernah menulis `catatan_bulanan`, sehingga guru yang sudah rapi
  //     mengisi di sana tetap tercantum "belum input" selamanya.
  //
  // `catatan_bulanan` tetap diterima sebagai penanda KEDUA, bukan karena setara, tapi
  // karena Input Bulanan baru mulai menulis snapshot di v.1.3.8: bulan-bulan yang diisi
  // sebelum itu hanya punya jejak `catatan_bulanan`, dan menagih ulang pekerjaan yang
  // sudah dikerjakan lebih buruk daripada melewatkan satu-dua yang belum.
  const guruBelumInput = computed(() => {
    const periode = periodeRekap.value
    if (!periode) return []
    const pk = periode.replace('-', '_') // `catatan_bulanan` memakai 'YYYY_MM'
    const snap = petaPrestasiPeriode(riwayatPrestasi.value, periode)
    const m = new Map()
    for (const s of scopedSantriAktif.value) {
      if (!punyaPrestasiBulanan(s.lembaga)) continue
      // v.1.3.8: SATU baris per PASANGAN, bukan per nama guru. Dulu satu kelas
      //   berpasangan muncul dua kali dengan daftar santri yang sama persis — terbaca
      //   seolah dua guru berbeda yang lalai, dan jumlah "guru belum input" dobel.
      const pasangan = pasanganSantri(s)
      const key = kunciPasangan(pasangan)
      if (!key) continue // santri tanpa guru sama sekali — tak ada yang bisa ditagih
      const sudah =
        sudahDinilaiBulan(snap.get(String(s.id))) ||
        (s.catatan_bulanan &&
          typeof s.catatan_bulanan === 'object' &&
          Object.prototype.hasOwnProperty.call(s.catatan_bulanan, pk))
      if (sudah) continue
      if (!m.has(key)) m.set(key, { guru: labelPasanganRingkas(pasangan), santri: [] })
      m.get(key).santri.push({
        id: String(s.id),
        nama: s.nama || '(tanpa nama)',
        lembaga: s.lembaga || '',
        kelas: s.kelas || ''
      })
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
    scopedSantriAll,
    periodeRekap,
    batasRekapNow,
    rekapSudahTerlambat,
    guruBelumInput,
    kelasOverload
  }
}
