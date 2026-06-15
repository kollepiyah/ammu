<script setup>
// v.99: Kelas & Guru — ALUR KELAS (class-centric, pilihan kyai opsi B):
//   kategori (ngaji/sekolah) → lembaga → KELAS (+ tambah kelas) → pilih 1-2 GURU → assign santri.
// Penyimpanan:
//   - Default guru per kelas disimpan di master/lembaga.list[i].kelas_guru[kelas]
//       ngaji  : { guru_pagi, guru_sore }
//       sekolah: { guru_sekolah: [..] }
//     → dipakai prefill di sini + diselaraskan dgn form edit santri (useSantriForm prefill).
//   - Penugasan ditulis ke SANTRI tercentang (kompat downstream rapor/absensi/scoping):
//       ngaji  → guru_pagi / guru_sore (+ guru utk backward-compat)
//       sekolah→ guru_sekolah[]
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, subscribeDoc, updateOne } from '@/services/firestore'
import { useToast } from '@/composables/useToast'
import { sortSantri, sortLembagaNames } from '@/utils/santriSort'
import { useExcel } from '@/composables/useExcel'
import { toTitleCase } from '@/utils/format'
import { bestNameMatch } from '@/utils/fuzzyMatch' // v.100 Batch12: cocokkan nama mirip saat impor

const toast = useToast()
const { exportStyled, importFile } = useExcel()

const santriRaw = ref([])
const guruRaw = ref([])
const lembagaRaw = ref([])
let _unsubS = null
let _unsubG = null
let _unsubL = null

onMounted(() => {
  _unsubS = subscribeColl('santri', (docs) => (santriRaw.value = docs))
  _unsubG = subscribeColl('guru', (docs) => (guruRaw.value = docs))
  _unsubL = subscribeDoc('master', 'lembaga', (d) => {
    lembagaRaw.value = Array.isArray(d?.list) ? d.list : []
  })
})
onUnmounted(() => {
  for (const u of [_unsubS, _unsubG, _unsubL]) {
    if (u) try { u() } catch (e) {}
  }
})

// ── State machine ──
const kategori = ref('') // '' | 'ngaji' | 'sekolah'
const selectedLembaga = ref('')
const selectedKelas = ref('')
// ngaji: guru per shift; sekolah: 2 slot guru sekolah
const guruPagi = ref('')
const guruSore = ref('')
const guruSekolah1 = ref('')
const guruSekolah2 = ref('')
const guruSearch = ref('')
const santriSearch = ref('')
const checked = ref(new Set())
const saving = ref(false)
const newKelas = ref('')
const addingKelas = ref(false)

function reset() {
  kategori.value = ''
  backToLembaga()
}
function backToLembaga() {
  selectedLembaga.value = ''
  selectedKelas.value = ''
  _resetGuru()
}
function backToKelas() {
  selectedKelas.value = ''
  _resetGuru()
}
function _resetGuru() {
  guruPagi.value = ''
  guruSore.value = ''
  guruSekolah1.value = ''
  guruSekolah2.value = ''
  guruSearch.value = ''
  santriSearch.value = ''
  checked.value = new Set()
}

// ── Lembaga options ──
const QIRAATI = ['TPQ Pagi', 'TPQ Sore', 'TPQ', 'Pra PTPT', 'PTPT', 'PPPH', 'P3H']
const SEKOLAH = ['TK', 'SDI', 'PKBM']

const lembagaOptions = computed(() => {
  const names = (lembagaRaw.value || []).map((l) => l.lembaga || l.nama).filter(Boolean)
  if (kategori.value === 'ngaji') {
    const list = names.filter((n) => {
      const g = (lembagaRaw.value.find((l) => (l.lembaga || l.nama) === n) || {}).group
      if (g) return g === 'qiraati'
      return QIRAATI.includes(n)
    })
    return sortLembagaNames(list.length ? [...new Set(list)] : QIRAATI.filter((n) => n !== 'P3H' && n !== 'TPQ'))
  }
  if (kategori.value === 'sekolah') {
    const list = names.filter((n) => {
      const g = (lembagaRaw.value.find((l) => (l.lembaga || l.nama) === n) || {}).group
      if (g) return g === 'sekolah'
      return SEKOLAH.includes(n)
    })
    return sortLembagaNames(list.length ? [...new Set(list)] : SEKOLAH)
  }
  return []
})

// Objek lembaga terpilih (dari master/lembaga.list)
const lembagaObj = computed(() =>
  (lembagaRaw.value || []).find((l) => (l.lembaga || l.nama) === selectedLembaga.value) || null
)

// ── Kelas options (dari master/lembaga; fallback hardcode) ──
const kelasOptions = computed(() => {
  const k = lembagaObj.value && Array.isArray(lembagaObj.value.kelas) ? lembagaObj.value.kelas : []
  if (k.length) return k
  // fallback umum
  const up = String(selectedLembaga.value || '').toUpperCase()
  if (up === 'SDI') return ['I', 'II', 'III', 'IV', 'V', 'VI']
  if (up === 'PKBM') return ['VII', 'VIII', 'IX', 'X', 'XI', 'XII']
  if (up === 'TK') return ['TK A', 'TK B']
  return []
})

// Default guru kelas tersimpan (master/lembaga.kelas_guru[kelas])
const kelasGuruDefault = computed(() => {
  const map = lembagaObj.value && lembagaObj.value.kelas_guru ? lembagaObj.value.kelas_guru : {}
  return (map && map[selectedKelas.value]) || {}
})

// ── Matchers ──
function matchNgaji(s, lembaga) {
  const sl = String(s.lembaga || '').toLowerCase().trim()
  const target = String(lembaga || '').toLowerCase().trim()
  if (!sl || !target) return false
  if ((target === 'ppph' || target === 'p3h') && (sl === 'ppph' || sl === 'p3h')) return true
  if (target.startsWith('tpq')) return sl.startsWith('tpq')
  return sl === target
}
function matchSekolah(s, lembaga) {
  const target = String(lembaga || '').toLowerCase().trim()
  const ls = String(s.lembaga_sekolah || '').toLowerCase().trim()
  const l = String(s.lembaga || '').toLowerCase().trim()
  return ls === target || l === target
}

// ── Guru list (aktif, sesuai lembaga; tipe-agnostic spt halaman ini sebelumnya) ──
const guruForLembaga = computed(() => {
  const target = String(selectedLembaga.value || '').toLowerCase().trim()
  let list = (guruRaw.value || []).filter((g) => {
    const aktif = String(g.status || 'Aktif').toLowerCase().trim() === 'aktif'
    if (!aktif) return false
    const gl = String(g.lembaga || '').toLowerCase().trim()
    const gls = String(g.lembaga_sekolah || '').toLowerCase().trim()
    if (kategori.value === 'ngaji') return gl === target
    return gls === target || gl === target
  })
  const kw = guruSearch.value.trim().toLowerCase()
  if (kw) list = list.filter((g) => String(g.nama || '').toLowerCase().includes(kw))
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
})

// ── Santri kandidat (lembaga + kelas) ──
const santriKandidat = computed(() => {
  if (!selectedKelas.value) return []
  let list = (santriRaw.value || []).filter((s) => s && s.aktif !== false)
  if (kategori.value === 'ngaji') {
    list = list.filter((s) => matchNgaji(s, selectedLembaga.value) && String(s.kelas || '') === selectedKelas.value)
    return sortSantri(list, { lembagaField: 'lembaga', kelasField: 'kelas' })
  }
  list = list.filter((s) => matchSekolah(s, selectedLembaga.value) && String(s.kelas_sekolah || s.kelas || '') === selectedKelas.value)
  return sortSantri(list, { lembagaField: 'lembaga_sekolah', kelasField: 'kelas_sekolah' })
})
const santriKandidatTampil = computed(() => {
  const kw = santriSearch.value.trim().toLowerCase()
  if (!kw) return santriKandidat.value
  return santriKandidat.value.filter((s) => String(s.nama || '').toLowerCase().includes(kw))
})
const jumlahDipilih = computed(() => santriKandidat.value.filter((s) => checked.value.has(s.id)).length)
const adaGuruDipilih = computed(() =>
  kategori.value === 'ngaji'
    ? !!(guruPagi.value || guruSore.value)
    : !!(guruSekolah1.value || guruSekolah2.value)
)

// Pilih kelas → prefill guru dari default + centang semua kandidat (umum: assign ke semua)
function pilihKelas(k) {
  selectedKelas.value = k
  const def = kelasGuruDefault.value || {}
  if (kategori.value === 'ngaji') {
    guruPagi.value = def.guru_pagi || ''
    guruSore.value = def.guru_sore || ''
  } else {
    const arr = Array.isArray(def.guru_sekolah) ? def.guru_sekolah : []
    guruSekolah1.value = arr[0] || ''
    guruSekolah2.value = arr[1] || ''
  }
  checked.value = new Set(santriKandidat.value.map((s) => s.id))
}

function toggle(id) {
  const set = new Set(checked.value)
  if (set.has(id)) set.delete(id)
  else set.add(id)
  checked.value = set
}
function selectAll() { checked.value = new Set(santriKandidat.value.map((s) => s.id)) }
function selectNone() { checked.value = new Set() }

// Tambah kelas baru ke master/lembaga.list[i].kelas
async function tambahKelas() {
  const nama = String(newKelas.value || '').trim()
  if (!nama) return
  if (!lembagaObj.value) { toast.warning('Lembaga tidak ditemukan di master'); return }
  if ((kelasOptions.value || []).includes(nama)) { toast.warning('Kelas sudah ada'); return }
  addingKelas.value = true
  try {
    const newList = (lembagaRaw.value || []).map((l) => {
      if ((l.lembaga || l.nama) !== selectedLembaga.value) return l
      const kelas = Array.isArray(l.kelas) ? [...l.kelas, nama] : [nama]
      return { ...l, kelas }
    })
    await updateOne('master', 'lembaga', { list: newList })
    toast.success(`Kelas "${nama}" ditambahkan`)
    newKelas.value = ''
  } catch (e) {
    toast.error('Gagal tambah kelas: ' + (e.message || e))
  } finally {
    addingKelas.value = false
  }
}

// Simpan default kelas_guru ke master/lembaga
async function _persistKelasGuru() {
  if (!lembagaObj.value) return
  const payload = kategori.value === 'ngaji'
    ? { guru_pagi: guruPagi.value || '', guru_sore: guruSore.value || '' }
    : { guru_sekolah: [guruSekolah1.value, guruSekolah2.value].filter(Boolean) }
  const newList = (lembagaRaw.value || []).map((l) => {
    if ((l.lembaga || l.nama) !== selectedLembaga.value) return l
    const kg = { ...(l.kelas_guru || {}) }
    kg[selectedKelas.value] = payload
    return { ...l, kelas_guru: kg }
  })
  await updateOne('master', 'lembaga', { list: newList })
}

async function simpan() {
  if (!selectedKelas.value) { toast.warning('Pilih kelas dulu'); return }
  if (!adaGuruDipilih.value) { toast.warning('Pilih minimal 1 guru'); return }
  saving.value = true
  let changed = 0
  try {
    // 1) Simpan default guru kelas (master/lembaga) → prefill + selaras form santri
    await _persistKelasGuru()
    // 2) Tulis penugasan ke santri tercentang (non-destruktif: hanya set yg dipilih)
    for (const s of santriKandidat.value) {
      if (!checked.value.has(s.id)) continue
      const patch = {}
      if (kategori.value === 'ngaji') {
        if (guruPagi.value) patch.guru_pagi = guruPagi.value
        if (guruSore.value) patch.guru_sore = guruSore.value
        const g = guruPagi.value || guruSore.value
        if (g) patch.guru = g // backward-compat
      } else {
        const arr = [guruSekolah1.value, guruSekolah2.value].filter(Boolean)
        if (arr.length) patch.guru_sekolah = arr
      }
      if (Object.keys(patch).length) {
        await updateOne('santri', String(s.id), patch)
        changed++
      }
    }
    toast.success(`Tersimpan — ${changed} santri diperbarui`)
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

function kelasLabel(s) {
  return kategori.value === 'ngaji' ? s.kelas || '-' : s.kelas_sekolah || s.kelas || '-'
}

// ── v.100 Batch10: impor massal assign guru→santri via XLSX (data baru & banyak — kyai) ──
const exportingTpl = ref(false)
const importingAssign = ref(false)
const importAssignProgress = ref({ i: 0, total: 0 })

// Template berisi DAFTAR SANTRI (prefilled) → kyai tinggal isi/koreksi kolom guru lalu impor.
async function downloadTemplateAssign() {
  if (exportingTpl.value) return
  exportingTpl.value = true
  try {
    const list = sortSantri((santriRaw.value || []).filter((s) => s && s.aktif !== false))
    const rows = list.map((s) => ({
      nis: s.nis || '', nama: s.nama || '',
      lembaga: s.lembaga || '', kelas: s.kelas || '',
      guru_pagi: s.guru_pagi || '', guru_sore: s.guru_sore || '',
      lembaga_sekolah: s.lembaga_sekolah || '', kelas_sekolah: s.kelas_sekolah || '',
      guru_sekolah_1: Array.isArray(s.guru_sekolah) ? s.guru_sekolah[0] || '' : s.guru_sekolah || '',
      guru_sekolah_2: Array.isArray(s.guru_sekolah) ? s.guru_sekolah[1] || '' : ''
    }))
    await exportStyled(rows, {
      filename: 'Template_Assign_Guru_Santri.xlsx',
      sheetName: 'Assign Guru',
      // tanpa KOP — header di row 1 supaya importFile auto-detect
      columns: [
        { key: 'nis', header: 'No. Induk', width: 12 },
        { key: 'nama', header: 'Nama Santri', width: 26 },
        { key: 'lembaga', header: 'Lembaga Qiraati', width: 14 },
        { key: 'kelas', header: 'Kelas Qiraati', width: 14 },
        { key: 'guru_pagi', header: 'Guru Pagi', width: 20 },
        { key: 'guru_sore', header: 'Guru Sore', width: 20 },
        { key: 'lembaga_sekolah', header: 'Lembaga Sekolah', width: 14 },
        { key: 'kelas_sekolah', header: 'Kelas Sekolah', width: 12 },
        { key: 'guru_sekolah_1', header: 'Guru Sekolah 1', width: 20 },
        { key: 'guru_sekolah_2', header: 'Guru Sekolah 2', width: 20 }
      ]
    })
    toast.success(`Template berisi ${rows.length} santri. Isi kolom guru lalu impor. Tanda "-" = kosongkan guru.`)
  } catch (e) {
    toast.error('Gagal buat template: ' + (e.message || e))
  } finally {
    exportingTpl.value = false
  }
}

function _pickCell(row, ...aliases) {
  for (const a of aliases) {
    if (row[a] !== undefined && row[a] !== null && row[a] !== '') return row[a]
  }
  const lower = {}
  for (const k of Object.keys(row)) lower[k.toLowerCase().trim()] = row[k]
  for (const a of aliases) {
    const v = lower[String(a).toLowerCase().trim()]
    if (v !== undefined && v !== null && v !== '') return v
  }
  return ''
}
// '' = lewati (jangan ubah), '-' = KOSONGKAN, selain itu = set nama guru (Title Case)
function _guruCell(v) {
  const s = String(v == null ? '' : v).trim()
  if (!s) return undefined
  if (s === '-') return ''
  return toTitleCase(s)
}

// v.100 Batch14: pisah guru pagi/sore (kyai). Dukung 1 sel "Guru A/Guru B" → pagi=A, sore=B;
//   1 nama tanpa "/" → pagi & sore SAMA (guru yang sama dua sesi).
//   Prioritas: kolom kombinasi ('Guru'/'Guru Ngaji'/'Guru Pagi/Sore') > kolom terpisah (Guru Pagi & Guru Sore).
function _splitGuruPair(gpCol, gsCol, gCombined) {
  const comb = String(gCombined == null ? '' : gCombined).trim()
  if (comb) {
    if (comb.includes('/')) { const [a, b] = comb.split('/'); return { pagi: a, sore: b } }
    return { pagi: comb, sore: comb } // 1 nama → pagi & sore sama
  }
  let p = String(gpCol == null ? '' : gpCol).trim()
  let s = String(gsCol == null ? '' : gsCol).trim()
  if (p.includes('/')) { const [a, b] = p.split('/'); p = a; s = s || b } // "A/B" nyasar di kolom Guru Pagi
  return { pagi: p, sore: s }
}

async function onImportAssign(e) {
  const file = e.target?.files?.[0]
  if (!file) return
  importingAssign.value = true
  try {
    const rows = await importFile(file)
    if (!rows.length) { toast.warning('File kosong / format tidak sesuai'); return }
    const list = santriRaw.value || []
    const byNis = new Map()
    const byNama = new Map()
    for (const s of list) {
      const nis = String(s.nis || '').trim()
      if (nis && !byNis.has(nis)) byNis.set(nis, s)
      const nm = String(s.nama || '').trim().toLowerCase()
      if (nm && !byNama.has(nm)) byNama.set(nm, s)
    }
    let updated = 0, skipped = 0, notFound = 0, fuzzyMatched = 0
    importAssignProgress.value = { i: 0, total: rows.length }
    for (const r of rows) {
      importAssignProgress.value = { i: importAssignProgress.value.i + 1, total: rows.length }
      const nis = String(_pickCell(r, 'No. Induk', 'No Induk', 'no_induk', 'NIS', 'nis') || '').trim() // v.100: terima header baru + template lama
      const nama = String(_pickCell(r, 'Nama Santri', 'Nama', 'nama') || '').trim().toLowerCase()
      let s = (nis && byNis.get(nis)) || (nama && byNama.get(nama)) || null
      // v.100 Batch12: fallback nama MIRIP (fuzzy) — NIS/nama persis tak ketemu, coba kemiripan tinggi & tak ambigu
      if (!s && nama) {
        const m = bestNameMatch(nama, list, { getName: (x) => x.nama })
        if (m) { s = m.item; fuzzyMatched++ }
      }
      if (!s) { if (nis || nama) notFound++; continue }
      const patch = {}
      // v.100 Batch14: dukung "Guru A/Guru B" (1 sel) → pagi/sore; 1 nama → pagi & sore sama
      const { pagi: _gpRaw, sore: _gsRaw } = _splitGuruPair(
        _pickCell(r, 'Guru Pagi', 'guru_pagi'),
        _pickCell(r, 'Guru Sore', 'guru_sore'),
        _pickCell(r, 'Guru Pagi/Sore', 'Guru Pagi & Sore', 'Guru Ngaji', 'Guru')
      )
      const gp = _guruCell(_gpRaw)
      const gs = _guruCell(_gsRaw)
      if (gp !== undefined) patch.guru_pagi = gp
      if (gs !== undefined) patch.guru_sore = gs
      const gMain = (gp !== undefined && gp) || (gs !== undefined && gs)
      if (gMain) patch.guru = gMain // backward-compat (spt simpan() alur kelas)
      const g1 = _guruCell(_pickCell(r, 'Guru Sekolah 1', 'guru_sekolah_1', 'Guru Sekolah'))
      const g2 = _guruCell(_pickCell(r, 'Guru Sekolah 2', 'guru_sekolah_2'))
      if (g1 !== undefined || g2 !== undefined) {
        const cur = Array.isArray(s.guru_sekolah) ? s.guru_sekolah : (s.guru_sekolah ? [s.guru_sekolah] : [])
        const a1 = g1 !== undefined ? g1 : (cur[0] || '')
        const a2 = g2 !== undefined ? g2 : (cur[1] || '')
        patch.guru_sekolah = [a1, a2].filter(Boolean)
      }
      if (!Object.keys(patch).length) { skipped++; continue }
      await updateOne('santri', String(s.id), patch)
      updated++
    }
    toast.success(`Impor assign selesai: ${updated} santri diperbarui${fuzzyMatched ? ` (${fuzzyMatched} via nama mirip — cek bila ragu)` : ''}, ${skipped} dilewati (kolom guru kosong), ${notFound} tak ditemukan (No. Induk/nama).`)
  } catch (e2) {
    toast.error('Gagal impor: ' + (e2.message || e2))
  } finally {
    importingAssign.value = false
    if (e.target) e.target.value = ''
  }
}
</script>

<template>
  <div class="p-3 md:p-5 space-y-4">
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <div class="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h1 class="text-lg md:text-xl font-black text-[var(--text-primary)]">
            <i class="fas fa-user-friends text-teal-500 mr-2"></i>Kelas &amp; Guru
          </h1>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">
            Pilih lembaga &rarr; kelas &rarr; tetapkan 1&ndash;2 guru &rarr; assign santri.
          </p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <!-- v.100 Batch10: impor massal assign guru (data baru & banyak) -->
          <button
            type="button"
            @click="downloadTemplateAssign"
            :disabled="exportingTpl"
            class="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 px-3 py-1.5 rounded-lg"
          >
            <i :class="['fas mr-1', exportingTpl ? 'fa-spinner fa-spin' : 'fa-file-arrow-down']"></i>Template Assign
          </button>
          <label
            class="text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 px-3 py-1.5 rounded-lg cursor-pointer"
            :class="importingAssign ? 'opacity-50 pointer-events-none' : ''"
          >
            <i :class="['fas mr-1', importingAssign ? 'fa-spinner fa-spin' : 'fa-file-arrow-up']"></i>
            {{ importingAssign ? `Impor… ${importAssignProgress.i}/${importAssignProgress.total}` : 'Impor Assign' }}
            <input type="file" accept=".xlsx,.xls" class="hidden" @change="onImportAssign" :disabled="importingAssign" />
          </label>
          <button
            v-if="kategori"
            type="button"
            @click="reset"
            class="text-xs font-bold text-[var(--text-secondary)] bg-[var(--bg-muted)] hover:bg-slate-300 dark:hover:bg-slate-600 px-3 py-1.5 rounded-lg"
          >
            <i class="fas fa-rotate-left mr-1"></i>Mulai Ulang
          </button>
        </div>
      </div>
    </div>

    <!-- STEP 1: kategori -->
    <div v-if="!kategori" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        type="button"
        @click="kategori = 'ngaji'"
        class="bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-2xl p-5 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer"
      >
        <i class="fas fa-book-quran text-2xl mb-2 drop-shadow"></i>
        <h3 class="text-base font-black">Ngaji (Qiraati)</h3>
        <p class="text-xs text-white/85 mt-1">TPQ, Pra PTPT, PTPT, PPPH — guru pagi/sore (1-2).</p>
      </button>
      <button
        type="button"
        @click="kategori = 'sekolah'"
        class="bg-gradient-to-br from-cyan-500 to-cyan-700 text-white rounded-2xl p-5 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer"
      >
        <i class="fas fa-school text-2xl mb-2 drop-shadow"></i>
        <h3 class="text-base font-black">Sekolah (Formal)</h3>
        <p class="text-xs text-white/85 mt-1">TK, SDI, PKBM — guru sekolah (maks 2).</p>
      </button>
    </div>

    <!-- STEP 2: pilih lembaga -->
    <div
      v-else-if="!selectedLembaga"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-building text-teal-600 mr-1"></i>Pilih Lembaga
          <span class="text-[10px] uppercase font-bold text-[var(--text-tertiary)] ml-1"
            >({{ kategori === 'ngaji' ? 'Ngaji' : 'Sekolah' }})</span
          >
        </h3>
        <button type="button" @click="kategori = ''" class="text-[11px] font-bold text-[var(--text-secondary)] hover:underline">
          <i class="fas fa-arrow-left mr-1"></i>Kembali
        </button>
      </div>
      <div v-if="lembagaOptions.length === 0" class="text-xs italic text-[var(--text-tertiary)] py-4 text-center">
        Tidak ada lembaga.
      </div>
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <button
          v-for="l in lembagaOptions"
          :key="l"
          type="button"
          @click="selectedLembaga = l"
          class="px-3 py-3 text-sm font-bold rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] text-[var(--text-primary)] hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:border-teal-400 transition cursor-pointer"
        >
          {{ l }}
        </button>
      </div>
    </div>

    <!-- STEP 3: pilih kelas (+ tambah kelas) -->
    <div
      v-else-if="!selectedKelas"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-layer-group text-teal-600 mr-1"></i>Pilih Kelas —
          <span class="text-teal-600">{{ selectedLembaga }}</span>
        </h3>
        <button type="button" @click="backToLembaga" class="text-[11px] font-bold text-[var(--text-secondary)] hover:underline">
          <i class="fas fa-arrow-left mr-1"></i>Ganti Lembaga
        </button>
      </div>
      <div v-if="kelasOptions.length === 0" class="text-xs italic text-[var(--text-tertiary)] py-3 text-center">
        Belum ada kelas. Tambahkan di bawah.
      </div>
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
        <button
          v-for="k in kelasOptions"
          :key="k"
          type="button"
          @click="pilihKelas(k)"
          class="px-3 py-3 text-sm font-bold rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] text-[var(--text-primary)] hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:border-teal-400 transition cursor-pointer"
        >
          {{ k }}
        </button>
      </div>
      <div class="flex gap-2 pt-2 border-t border-[var(--border-subtle)]">
        <input
          v-model="newKelas"
          type="text"
          class="flex-1 px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-input)] text-[var(--text-primary)]"
          @keyup.enter="tambahKelas"
        />
        <button
          type="button"
          @click="tambahKelas"
          :disabled="addingKelas || !newKelas.trim()"
          class="px-3 py-2 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50"
        >
          <i :class="['fas', addingKelas ? 'fa-spinner fa-spin' : 'fa-plus']" class="mr-1"></i>Tambah
        </button>
      </div>
    </div>

    <!-- STEP 4: pilih guru (1-2) + checklist santri -->
    <div v-else class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <div class="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-chalkboard-teacher text-teal-600 mr-1"></i>{{ selectedLembaga }}
          <span class="text-teal-600">· {{ selectedKelas }}</span>
        </h3>
        <button type="button" @click="backToKelas" class="text-[11px] font-bold text-[var(--text-secondary)] hover:underline">
          <i class="fas fa-arrow-left mr-1"></i>Ganti Kelas
        </button>
      </div>

      <!-- Guru cari -->
      <input
        v-model="guruSearch"
        type="text"
        placeholder="Cari nama guru untuk memfilter pilihan..."
        class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-input)] text-[var(--text-primary)] mb-3"
      />

      <!-- Guru selectors -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <template v-if="kategori === 'ngaji'">
          <div>
            <label class="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-1">Guru Pagi</label>
            <select v-model="guruPagi" class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)] cursor-pointer">
              <option value="">— tidak ada —</option>
              <option v-for="g in guruForLembaga" :key="'p-' + g.id" :value="g.nama">{{ g.nama }}</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-1">Guru Sore</label>
            <select v-model="guruSore" class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)] cursor-pointer">
              <option value="">— tidak ada —</option>
              <option v-for="g in guruForLembaga" :key="'s-' + g.id" :value="g.nama">{{ g.nama }}</option>
            </select>
          </div>
        </template>
        <template v-else>
          <div>
            <label class="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-1">Guru Sekolah 1</label>
            <select v-model="guruSekolah1" class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)] cursor-pointer">
              <option value="">— tidak ada —</option>
              <option v-for="g in guruForLembaga" :key="'a-' + g.id" :value="g.nama">{{ g.nama }}</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-1">Guru Sekolah 2</label>
            <select v-model="guruSekolah2" class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)] cursor-pointer">
              <option value="">— tidak ada —</option>
              <option v-for="g in guruForLembaga" :key="'b-' + g.id" :value="g.nama">{{ g.nama }}</option>
            </select>
          </div>
        </template>
      </div>

      <!-- Checklist santri -->
      <div class="flex items-center justify-between mb-2">
        <p class="text-[11px] text-[var(--text-secondary)]">
          Centang santri kelas ini. <span class="text-teal-600 font-bold">{{ jumlahDipilih }}</span> / {{ santriKandidat.length }} dipilih.
        </p>
        <div class="flex gap-2">
          <button type="button" @click="selectAll" class="text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-2.5 py-1 rounded-lg">
            <i class="fas fa-check-double mr-1"></i>Semua
          </button>
          <button type="button" @click="selectNone" class="text-[11px] font-bold text-[var(--text-secondary)] bg-[var(--bg-muted)] px-2.5 py-1 rounded-lg">
            <i class="fas fa-xmark mr-1"></i>Kosong
          </button>
        </div>
      </div>

      <input
        v-if="santriKandidat.length > 0"
        v-model="santriSearch"
        type="search"
        placeholder="Cari nama santri..."
        class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-input)] text-[var(--text-primary)] mb-2"
      />

      <div v-if="santriKandidat.length === 0" class="text-xs italic text-[var(--text-tertiary)] py-6 text-center">
        <i class="fas fa-inbox text-3xl text-[var(--border-default)] block mb-2"></i>
        Tidak ada santri di kelas ini.
      </div>
      <p v-else-if="santriKandidatTampil.length === 0" class="text-xs italic text-[var(--text-tertiary)] py-4 text-center">
        Tidak ada santri cocok pencarian "{{ santriSearch }}".
      </p>
      <ul v-else class="space-y-1 max-h-[45vh] overflow-y-auto">
        <li
          v-for="s in santriKandidatTampil"
          :key="s.id"
          @click="toggle(s.id)"
          :class="[
            'flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition',
            checked.has(s.id)
              ? 'bg-teal-50 dark:bg-teal-900/30 border-teal-300'
              : 'bg-[var(--bg-muted)] border-transparent hover:border-[var(--border-default)]'
          ]"
        >
          <i :class="['fas', checked.has(s.id) ? 'fa-square-check text-teal-600' : 'fa-square text-[var(--text-tertiary)]']"></i>
          <span class="flex-1 text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</span>
          <span class="text-[10px] font-bold text-[var(--text-tertiary)]">{{ kelasLabel(s) }}</span>
        </li>
      </ul>

      <button
        type="button"
        @click="simpan"
        :disabled="saving || !adaGuruDipilih"
        class="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-black py-3 rounded-xl shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-save']"></i>
        {{ saving ? 'Menyimpan...' : 'SIMPAN PENUGASAN' }}
      </button>
      <p class="text-[10px] text-[var(--text-tertiary)] text-center mt-2">
        Guru kelas disimpan sbg default (dipakai prefill form santri). Penugasan menulis guru ke santri tercentang.
      </p>
    </div>
  </div>
</template>
