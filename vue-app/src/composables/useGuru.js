// useGuru — list guru/pegawai real-time + role-based filter + search
// Phase 5.6 (v.35.0526) — mirror pattern dari useSantri.js
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCollectionsStore } from '@/stores/collections'
import { useAuthStore } from '@/stores/auth'
// v.21.10.0526: Import lembaga helpers
import { getLembagaGroup, LEMBAGA_GROUPS } from './useLembaga'
// v.1.1.9: unit tugas per jabatan (master/jabatan) — ganti tebakan regex lama
import { unitsOfJabatan, namaLembaga, pecahJabatan, jabatanUntukUnit } from '@/utils/jabatanUnit'
// v.110: sortGuru — urutan Qiraati→Sekolah→Pegawai→nama A–Z (sumber tunggal)
import { sortGuru } from '@/utils/santriSort'

// Group tempat tugas ('qiraati' | 'sekolah' | 'mahad' | 'non-lembaga') dari nama lembaga.
// v.1.1.9: baca master/lembaga `tipe` DULU (data — kenal lembaga yang Kyai tambah sendiri),
//   baru fallback konstanta LEMBAGA_GROUPS.
// BUG LAMA: dulu ditulis `getLembagaGroup(nama) || 'sekolah'` — getLembagaGroup mengembalikan
//   KUNCI GRUP ('SDI'), bukan group ('sekolah'), sehingga cek `r.group === 'sekolah'` di
//   BisyarohView selalu meleset → baris sekolah dilabeli "Bisyaroh Ngaji (SDI)" & masuk pos
//   pokok, bukan pos sekolah.
function groupOfLembaga(nama, lembagaList) {
  const k = String(nama || '')
    .trim()
    .toLowerCase()
  if (!k) return 'non-lembaga'
  const l = (Array.isArray(lembagaList) ? lembagaList : []).find(
    (x) => namaLembaga(x).toLowerCase() === k
  )
  const t = String(l?.tipe || '')
    .trim()
    .toLowerCase()
  if (t === 'formal') return 'sekolah'
  if (t === 'qiraati') return 'qiraati'
  if (t === 'non lembaga') return 'non-lembaga'
  const gk = getLembagaGroup(nama)
  return (gk && LEMBAGA_GROUPS[gk]?.group) || 'non-lembaga'
}

// Helper: derive guru.lembaga_refs dari legacy fields + jabatan_tambahan.
// 1 guru bisa multi-lembaga (mis: Admin Yayasan + Guru TPQ) → tiap ref = 1 tempat tugas
// = 1 baris pokok di slip bisyaroh.
// opts.jabatanItems = master/jabatan items[] (unit per jabatan); opts.lembagaList = master/lembaga.list.
// Diekspor supaya bisa diuji langsung: penurunan tempat tugas ini menyetir SIAPA yang
//   kena jenis bisyaroh & tunjangan mana — salah di sini berarti salah uang.
export function deriveGuruLembagaRefs(g, opts = {}) {
  if (Array.isArray(g.lembaga_refs) && g.lembaga_refs.length > 0) return g.lembaga_refs
  const jabatanItems = opts.jabatanItems || []
  const lembagaList = opts.lembagaList || []
  const refs = []
  const semuaJabatan = [String(g.jabatan || '').trim(), ...pecahJabatan(g.jabatan_tambahan)].filter(
    Boolean
  )

  // Kyai 7 Agu 2026 — PELAJARAN MAHAL: bacaan jabatan di sebuah lembaga hanya boleh
  //   DITAMBAH, tak pernah DIGANTI. Percobaan sebelumnya mengganti bacaan lembaga sekolah
  //   dari 'Guru' menjadi "Kepala SDI", dan seketika "Bisyaroh Pokok Guru SDI" (flat) lenyap
  //   dari kepala yang selama ini menerimanya. Di master jabatan Kyai, 14 dari 15 jabatan
  //   terikat unit — jadi mengganti bacaan berarti memutus banyak jenis sekaligus.
  //   Menambah aman: satu jenis menerbitkan PALING BANYAK SATU baris betapa pun banyak ref
  //   yang cocok (jenisKenaGuru boolean + refPencocok ambil yang pertama), jadi ref
  //   tambahan tak pernah bisa membayar dobel.
  const tambah = (lembaga, jabatan, extra = {}) => {
    const nama = String(jabatan || '').trim()
    const lem = String(lembaga || '')
    if (!nama) return
    if (refs.some((r) => r.lembaga === lem && r.jabatan_di_sini === nama)) return
    refs.push({
      group: groupOfLembaga(lem, lembagaList),
      lembaga: lem,
      jabatan_di_sini: nama,
      ...extra
    })
  }

  // Lembaga utama (ngaji).
  if (g.lembaga) {
    const extra = {
      shift: g.shift || null,
      kelas_diajar: Array.isArray(g.kelas_diajar) ? g.kelas_diajar : []
    }
    tambah(g.lembaga, g.jabatan || 'Guru', extra) // bacaan LAMA — jangan diambil
    // "kepala yg juga guru ngaji, bisyaroh ngajinya tidak terbaca": gelar yang unitnya di
    //   tempat LAIN (mis. "Kepala PKBM" di lembaga ngaji PTPT) membuat jenis ngaji ber-scope
    //   jabatan "Guru" meleset. Bacaan 'Guru' ditambahkan HANYA bila memang tak ada
    //   jabatannya yang memangku lembaga ini — kepala DI lembaganya sendiri tak ikut
    //   ditambahi, supaya pokok kepala & pokok guru tak sama-sama terbit.
    if (!jabatanUntukUnit(jabatanItems, semuaJabatan, g.lembaga)) tambah(g.lembaga, 'Guru', extra)
  }

  // Lembaga sekolah (kalau beda dari lembaga utama).
  if (g.lembaga_sekolah && g.lembaga_sekolah !== g.lembaga) {
    const extra = {
      kelas_diajar: Array.isArray(g.kelas_diajar_sekolah) ? g.kelas_diajar_sekolah : []
    }
    tambah(g.lembaga_sekolah, g.jabatan_sekolah || 'Guru', extra) // bacaan LAMA
    // "Kepala PKBM tapi terbacanya sebagai guru": `jabatan_sekolah` tak pernah diisi di mana
    //   pun, jadi bacaan di atas selalu 'Guru'. Gelar yang MEMANGKU unit ini ditambahkan
    //   sebagai bacaan kedua supaya jenis/tunjangan ber-scope Kepala ikut mengenainya.
    tambah(
      g.lembaga_sekolah,
      jabatanUntukUnit(jabatanItems, semuaJabatan, g.lembaga_sekolah),
      extra
    )
  }

  // Tiap jabatan berjangkar di unitnya sendiri (master/jabatan units[]).
  // v.1.1.9: unit tak lagi ditebak regex (/admin|supervisi|pj/→Yayasan dst) tapi diambil
  //   dari units[] jabatan yang Kyai atur sendiri.
  // Kyai 7 Agu 2026: jabatan UTAMA ikut dijangkarkan (dulu hanya tambahan), supaya kepala
  //   yang lembaga sekolahnya kosong tetap diakui kepala di unitnya.
  for (const nama of semuaJabatan) {
    for (const unit of unitsOfJabatan(jabatanItems, nama)) tambah(unit, nama)
  }
  return refs
}

// Helper: cek apakah guru adalah Kepala Lembaga (untuk visibility scoping)
function isKepalaLembaga(g, namaLembaga = null) {
  const refs = deriveGuruLembagaRefs(g)
  if (namaLembaga) {
    return refs.some((r) => r.lembaga === namaLembaga && /kepala/i.test(r.jabatan_di_sini || ''))
  }
  return refs.some((r) => /kepala/i.test(r.jabatan_di_sini || ''))
}

export function useGuru() {
  const auth = useAuthStore()
  const collections = useCollectionsStore()
  collections.ensure('guru')
  const { guru: guruRaw } = storeToRefs(collections)
  const loading = computed(() => !collections.isLoaded('guru'))
  const error = ref(null)

  // Search & filter state
  const search = ref('')
  const filterLembaga = ref('')
  const filterJabatan = ref('')
  const filterStatus = ref('aktif') // default tampilkan yg aktif saja

  // Role-based access — admin/super_admin only
  const isFullAccess = computed(() => {
    const s = auth.sesiAktif
    if (!s) return false
    return (
      s.role === 'admin' ||
      s.id === 'admin' ||
      ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
    )
  })

  // Filtered + sorted list
  const guru = computed(() => {
    let list = guruRaw.value.filter(Boolean)

    // Non-admin: tidak boleh lihat data guru
    if (!isFullAccess.value) return []

    // Status filter
    if (filterStatus.value === 'aktif') {
      list = list.filter((g) => {
        const st = String(g.status || 'Aktif')
          .toLowerCase()
          .trim()
        return st === 'aktif'
      })
    } else if (filterStatus.value === 'tidak_aktif') {
      list = list.filter((g) => {
        const st = String(g.status || 'Aktif')
          .toLowerCase()
          .trim()
        return st !== 'aktif'
      })
    }

    // Search filter
    const kw = search.value.trim().toLowerCase()
    if (kw) {
      list = list.filter(
        (g) =>
          String(g.nama || '')
            .toLowerCase()
            .includes(kw) ||
          String(g.wa || '')
            .toLowerCase()
            .includes(kw) ||
          String(g.jabatan || '')
            .toLowerCase()
            .includes(kw) ||
          String(g.username || '')
            .toLowerCase()
            .includes(kw)
      )
    }

    // v.21.24d.0526: Lembaga filter case-insensitive (dedupe varian "TPQ Pagi" vs "TPQ PAGI")
    if (filterLembaga.value) {
      const target = String(filterLembaga.value).toLowerCase()
      // v.97.0626: cocokkan lembaga NGAJI ATAU lembaga SEKOLAH (formal)
      list = list.filter(
        (g) =>
          String(g.lembaga || '').toLowerCase() === target ||
          String(g.lembaga_sekolah || '').toLowerCase() === target
      )
    }

    // Jabatan filter
    if (filterJabatan.value) {
      list = list.filter((g) => g.jabatan === filterJabatan.value)
    }

    // v.110: Sort canonical — Qiraati (TPQ Pagi→PPPH) → Sekolah (TK→PKBM) → Pegawai → nama A–Z
    return sortGuru(list)
  })

  // Stats berbasis seluruh data (bukan filter)
  const stats = computed(() => {
    const all = guruRaw.value.filter(Boolean)
    const aktif = all.filter((g) => {
      const st = String(g.status || 'Aktif')
        .toLowerCase()
        .trim()
      return st === 'aktif'
    })
    const perLembaga = aktif.reduce((acc, g) => {
      const k = g.lembaga || '—'
      acc[k] = (acc[k] || 0) + 1
      return acc
    }, {})
    return {
      total: all.length,
      aktif: aktif.length,
      tidakAktif: all.length - aktif.length,
      perLembaga
    }
  })

  return {
    guru,
    guruRaw,
    loading,
    search,
    filterLembaga,
    filterJabatan,
    filterStatus,
    stats,
    isFullAccess,
    deriveGuruLembagaRefs,
    isKepalaLembaga
  }
}
