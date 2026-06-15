<script setup>
// v.72.8.0526 Master Data restructure ke 7 tabs match legacy
import { ref, computed, reactive, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
// v.21.12.0526: + subscribeDoc untuk master/jabatan
import { subscribeColl, subscribeDoc } from '@/services/firestore'
import { useToast } from '@/composables/useToast'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useDesktopShell } from '@/composables/useDesktopShell'
import LembagaView from './LembagaView.vue'
// v.21.85.0527: KelasView read-only diganti KelasGuruView (assign santri↔guru) + JabatanKelolaView (ACF)
import KelasGuruView from './KelasGuruView.vue'
import JabatanKelolaView from './JabatanKelolaView.vue'
import FieldSchemaView from './FieldSchemaView.vue'
import GuruView from './GuruView.vue'
import SantriView from './SantriView.vue'
import { useLembaga } from '@/composables/useLembaga'
import { useSantri } from '@/composables/useSantri'
import { useConfirm } from '@/composables/useConfirm'
// v.100: migrasi gabung duplikat (dedupe). Migrasi lama satu-kali (v.21.10/v.21.70/v.88) dihapus — sudah selesai.
import { scanDedupe, runDedupe, mergeGroupManual } from '@/utils/v100_dedupe'
import { planRegenerateNis, applyNisChanges } from '@/utils/nisGenerator' // v.100 Batch14: auto-generate NIS (manual + preview)
import { planRegenerateNig, applyNigChanges } from '@/utils/nigGenerator' // v.100 Batch16: auto-generate NIG (manual + preview)
import { scanLembagaFix, applyLembagaFix, LEMBAGA_QIRAATI_OPSI } from '@/utils/v100_lembagaFix'
import { useAuthStore } from '@/stores/auth'
// v.100 Batch8: audit kesehatan data (integritas + kandidat duplikat fuzzy)
import { useDataAudit } from '@/composables/useDataAudit'
import { useGuru } from '@/composables/useGuru'

const route = useRoute()
const router = useRouter()
const settings = useSettingsStore()

// v.20.79: M6 — Audit Log subscribe (50 latest)
const auditLogs = ref([])
let _unsubAudit = null
onMounted(() => {
  _unsubAudit = subscribeColl('audit_log', (rows) => {
    // v.100e: 2 penulis pakai format timestamp beda (Firestore Timestamp vs string ISO) →
    //   sort lama `tb - ta` jadi NaN utk entri ISO → urutan kacau → entri hapus terbaru
    //   terlempar dari 50 teratas ("tidak update"). auditTsMs() normalkan ke epoch ms.
    const sorted = [...(rows || [])]
      .sort((a, b) => auditTsMs(b.timestamp) - auditTsMs(a.timestamp))
      .slice(0, 50)
    auditLogs.value = sorted
  })
})
// v.98: cleanup listener audit_log (cegah leak tiap mount Master Data)
const { isElectron: isDesktop } = useDesktopShell()
onUnmounted(() => { if (_unsubAudit) _unsubAudit() })
function formatTanggal(ts) {
  if (!ts) return '-'
  try {
    const d = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts)
    return d.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return String(ts).slice(0, 16)
  }
}
// v.100e: timestamp audit_log campur (Firestore Timestamp .seconds | string ISO | ms) → epoch ms.
function auditTsMs(ts) {
  if (!ts) return 0
  if (typeof ts === 'object' && ts.seconds != null) return ts.seconds * 1000
  if (typeof ts === 'number') return ts < 1e12 ? ts * 1000 : ts
  const t = Date.parse(ts)
  return isNaN(t) ? 0 : t
}
// v.100e: nama operator — penulis backup hapus pakai user_nama, writeAuditLog pakai operator.
function auditUser(log) {
  return log.user_nama || log.operator || log.user || '-'
}
// v.100e: detail ringkas dari 2 format (gabung target/collection/alasan/jumlah/objek detail).
function auditDetail(log) {
  if (log.keterangan) return String(log.keterangan)
  const parts = []
  if (log.target) parts.push(log.target)
  if (log.collection) parts.push(log.collection)
  if (log.alasan) parts.push(log.alasan)
  if (log.ids_count) parts.push(`${log.ids_count} item`)
  if (log.detail != null)
    parts.push(typeof log.detail === 'object' ? JSON.stringify(log.detail) : String(log.detail))
  return parts.join(' · ') || '-'
}

const toast = useToast()
const { lembagaRaw } = useLembaga()
// v.20.80.0526 M16: TPQ shift migration state
const { santriRaw: santriRawForMigration } = useSantri()
// v.21.10.0526: Guru data untuk migration
const { guruRaw: guruRawForMigration } = useGuru()

// v.99: Analisis Data Duplikat (audit) — santri (Nama/NIS/NISN) + guru (Nama/WA)
function _normDup(v) { return String(v || '').trim().toLowerCase() }
function _findDup(list, keyFn, labelFn) {
  const map = new Map()
  for (const it of list) { const k = keyFn(it); if (!k) continue; if (!map.has(k)) map.set(k, []); map.get(k).push(it) }
  const groups = []
  // v.100 Batch9: bawa records mentah utk tombol "Gabung Grup Ini" (merge manual per-grup)
  for (const [key, arr] of map) if (arr.length > 1) groups.push({ key, count: arr.length, items: arr.map(labelFn), records: arr })
  return groups
}
const dupSantriNama = computed(() => _findDup(santriRawForMigration.value || [], (s) => _normDup(s.nama), (s) => `${s.nama} · No. Induk ${s.nis || '-'} · ${s.lembaga || s.lembaga_sekolah || '-'}`))
const dupSantriNis = computed(() => _findDup((santriRawForMigration.value || []).filter((s) => _normDup(s.nis)), (s) => _normDup(s.nis), (s) => `${s.nama} · No. Induk ${s.nis}`))
const dupSantriNisn = computed(() => _findDup((santriRawForMigration.value || []).filter((s) => _normDup(s.nisn)), (s) => _normDup(s.nisn), (s) => `${s.nama} · NISN ${s.nisn}`))
const dupGuruNama = computed(() => _findDup(guruRawForMigration.value || [], (g) => _normDup(g.nama), (g) => `${g.nama} · ${g.jabatan || '-'}`))
const dupGuruWa = computed(() => _findDup((guruRawForMigration.value || []).filter((g) => _normDup(g.wa)), (g) => String(g.wa || '').replace(/\D/g, ''), (g) => `${g.nama} · WA ${g.wa}`))
const dupKategori = computed(() => [
  { label: 'Santri — Nama sama', kind: 'santri', groups: dupSantriNama.value },
  { label: 'Santri — No. Induk sama', kind: 'santri', groups: dupSantriNis.value },
  { label: 'Santri — NISN sama', kind: 'santri', groups: dupSantriNisn.value },
  { label: 'Guru — Nama sama', kind: 'guru', groups: dupGuruNama.value },
  { label: 'Guru — WA sama', kind: 'guru', groups: dupGuruWa.value }
])
const totalDupGroups = computed(() => dupKategori.value.reduce((n, k) => n + k.groups.length, 0))
const showDupDetail = ref(false)
const confirmDlg = useConfirm()

// v.100 Batch8: Kesehatan Data (data-health) — integritas + kandidat duplikat fuzzy (report-only)
const { auditGroups, fuzzyDup, totalIssues, totalFuzzy } = useDataAudit(
  santriRawForMigration,
  guruRawForMigration,
  lembagaRaw
)
const healthOpen = reactive({})
function toggleHealth(key) { healthOpen[key] = !healthOpen[key] }
const showFuzzy = ref(false)

// v.100 Batch14: Generate NIS otomatis (MANUAL + preview). Format NNNN+DDMMYY, urut tgl lahir
//   TERTUA→termuda lalu nama A–Z. (Pasca impor santri, regenerate ini juga jalan otomatis di SantriView.)
const nisPlan = ref(null) // { changes, skipped, total, max } | null
const nisGenerating = ref(false)
const nisProgress = ref({ i: 0, total: 0 })
const nisResult = ref(null)
const nisChangedCount = computed(() => (nisPlan.value?.changes || []).filter((c) => c.changed).length)
function scanNis() {
  nisResult.value = null
  nisPlan.value = planRegenerateNis(santriRawForMigration.value || [])
}
async function applyNis() {
  if (!nisPlan.value || nisGenerating.value) return
  const n = nisChangedCount.value
  if (n === 0) { toast.success('Tidak ada No. Induk yang perlu diubah — semua sudah sesuai.'); return }
  const ok = await confirmDlg({
    title: 'Terapkan Generate No. Induk?',
    message: `${n} No. Induk santri akan diperbarui (urut tgl lahir TERTUA → nama A–Z). ${nisPlan.value.skipped.length} santri tanpa tgl lahir DILEWATI (No. Induk lama dibiarkan). No. Induk = field; riwayat keuangan/rapor pakai ID santri → TIDAK terpengaruh. NIS & NISN Dinas (santri sekolah) TIDAK disentuh. Lanjutkan?`,
    confirmText: 'Terapkan',
    danger: false
  })
  if (!ok) return
  nisGenerating.value = true
  nisProgress.value = { i: 0, total: n }
  try {
    const res = await applyNisChanges(nisPlan.value.changes, {
      sesi: authStore?.sesiAktif,
      mode: 'manual',
      onProgress: (i, total) => { nisProgress.value = { i, total } }
    })
    nisResult.value = res
    if (res.fail) toast.warning(`Generate No. Induk: ${res.ok} OK, ${res.fail} gagal — ${res.errors.join('; ')}`)
    else toast.success(`Generate No. Induk selesai: ${res.changed} No. Induk diperbarui.`)
    nisPlan.value = null
  } catch (e) {
    toast.error('Gagal generate No. Induk: ' + (e.message || e))
  } finally {
    nisGenerating.value = false
  }
}

// v.100 Batch16: Generate NIG otomatis (MANUAL + preview). NNN+DDMMYY, urut tgl TUGAS terlama→terbaru → nama A–Z.
//   (Pasca impor guru, regenerate ini juga jalan otomatis di GuruView; guru baru via form = append.)
const nigPlan = ref(null)
const nigGenerating = ref(false)
const nigProgress = ref({ i: 0, total: 0 })
const nigResult = ref(null)
const nigChangedCount = computed(() => (nigPlan.value?.changes || []).filter((c) => c.changed).length)
function scanNig() {
  nigResult.value = null
  nigPlan.value = planRegenerateNig(guruRawForMigration.value || [])
}
async function applyNig() {
  if (!nigPlan.value || nigGenerating.value) return
  const n = nigChangedCount.value
  if (n === 0) { toast.success('Tidak ada NIG yang perlu diubah — semua sudah sesuai.'); return }
  const ok = await confirmDlg({
    title: 'Terapkan Generate NIG?',
    message: `${n} NIG guru akan diperbarui (urut tgl TUGAS terlama → nama A–Z). ${nigPlan.value.skipped.length} guru tanpa tgl tugas DILEWATI (NIG lama dibiarkan). NIG = field, tak dipakai kunci lintas-koleksi → aman. Lanjutkan?`,
    confirmText: 'Terapkan',
    danger: false
  })
  if (!ok) return
  nigGenerating.value = true
  nigProgress.value = { i: 0, total: n }
  try {
    const res = await applyNigChanges(nigPlan.value.changes, {
      sesi: authStore?.sesiAktif,
      onProgress: (i, total) => { nigProgress.value = { i, total } }
    })
    nigResult.value = res
    if (res.fail) toast.warning(`Generate NIG: ${res.ok} OK, ${res.fail} gagal — ${res.errors.join('; ')}`)
    else toast.success(`Generate NIG selesai: ${res.changed} NIG diperbarui.`)
    nigPlan.value = null
  } catch (e) {
    toast.error('Gagal generate NIG: ' + (e.message || e))
  } finally {
    nigGenerating.value = false
  }
}

// v.100 Batch13: Gabung manual dari panel "Kandidat Nama Mirip" (checkbox per record).
//   Fuzzy group bisa CAMPUR (sebagian orang sama, sebagian beda) → user centang hanya yang SAMA,
//   lalu gabung ke record terlengkap (reuse mergeGroupManual: backup audit_log, guard identitas dilewati sadar).
const _santriById = computed(() => {
  const m = new Map()
  for (const s of (santriRawForMigration.value || [])) m.set(String(s.id), s)
  return m
})
const _guruById = computed(() => {
  const m = new Map()
  for (const g of (guruRawForMigration.value || [])) m.set(String(g.id), g)
  return m
})
const fuzzyChecked = reactive({}) // id → bool (undefined = tercentang/ikut gabung)
const fuzzyMerging = ref('')
function fuzzyGrpKey(grp) { return grp.items.map((i) => i.id).sort().join('|') }
async function gabungFuzzy(grp) {
  if (fuzzyMerging.value) return
  const picked = grp.items.filter((it) => fuzzyChecked[it.id] !== false)
  if (picked.length < 2) {
    toast.warning('Centang minimal 2 record yang benar-benar ORANG SAMA.')
    return
  }
  const lookup = grp.kind === 'guru' ? _guruById.value : _santriById.value
  const recs = picked.map((it) => lookup.get(String(it.id))).filter(Boolean)
  if (recs.length < 2) {
    toast.warning('Record mentah tidak ditemukan — coba muat ulang halaman.')
    return
  }
  const lines = picked.map((it) => `• ${it.nama} — ${it.detail}`).join('\n')
  const ok = await confirmDlg({
    title: 'Gabung Record Tercentang?',
    message: `${recs.length} record berikut digabung ke yang TERLENGKAP, sisanya DIHAPUS (ter-backup audit_log → bisa di-recover):\n${lines}\n\nFuzzy bisa keliru — pastikan benar-benar ORANG YANG SAMA (cek No. Induk & tgl lahir). Lanjutkan?`,
    confirmText: 'Gabung & Hapus',
    danger: true
  })
  if (!ok) return
  fuzzyMerging.value = fuzzyGrpKey(grp)
  try {
    const result = await mergeGroupManual(grp.kind, recs)
    if (result.fail > 0) toast.warning(`Gabung: ${result.ok} OK, ${result.fail} gagal — ${result.errors.join('; ')}`)
    else toast.success(`Digabung (${result.removedIds.length} duplikat dihapus, backup di audit_log).`)
  } catch (e) {
    toast.error('Gagal gabung: ' + (e.message || e))
  } finally {
    fuzzyMerging.value = ''
  }
}
const HEALTH_SEV = {
  danger: { dot: 'bg-rose-500', badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200' },
  warn: { dot: 'bg-amber-500', badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' },
  info: { dot: 'bg-cyan-500', badge: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200' }
}

// v.100: Migrate (Gabung Duplikat) — gabung duplikat identitas (NIS/NISN santri, WA guru).
const dedupeScan = ref(null)
const dedupeRunning = ref(false)
const dedupeProgress = ref({ i: 0, total: 0 })
const dedupeResult = ref(null)

function dedupeDryRun() {
  dedupeScan.value = scanDedupe({
    santriList: santriRawForMigration.value || [],
    guruList: guruRawForMigration.value || []
  })
  dedupeResult.value = null
}

async function dedupeExecute() {
  if (!dedupeScan.value || dedupeScan.value.total === 0) {
    toast.warning('Jalankan Dry-Run dulu, atau tidak ada duplikat identitas untuk digabung.')
    return
  }
  const s = dedupeScan.value
  const ok = await confirmDlg({
    title: 'Gabung Duplikat Identitas?',
    message: `${s.santriToRemove} santri + ${s.guruToRemove} guru akan DIGABUNG ke record terlengkap (identitas unik No. Induk/NISN/WA, plus nama-sama yang punya sinyal penguat & tanpa konflik identitas); field kosong diisi dari duplikat, sisanya DIHAPUS (ter-backup ke audit_log → bisa di-recover). Lanjutkan?`,
    confirmText: 'Gabung & Hapus',
    danger: true
  })
  if (!ok) return
  dedupeRunning.value = true
  dedupeProgress.value = { i: 0, total: s.total }
  try {
    const result = await runDedupe(
      { santriList: santriRawForMigration.value || [], guruList: guruRawForMigration.value || [] },
      { onProgress: (i, total) => { dedupeProgress.value = { i, total } } }
    )
    dedupeResult.value = result
    if (result.fail > 0) toast.warning(`Selesai: ${result.ok} operasi OK, ${result.fail} gagal. Cek errors.`)
    else toast.success(`Gabung duplikat sukses: ${result.ok} operasi.`)
    dedupeScan.value = scanDedupe({
      santriList: santriRawForMigration.value || [],
      guruList: guruRawForMigration.value || []
    })
  } catch (e) {
    toast.error('Gagal gabung duplikat: ' + (e.message || e))
  } finally {
    dedupeRunning.value = false
  }
}

// v.100 Batch9: gabung MANUAL per-grup (keputusan admin) — utk grup yang auto-Migrate tolak
//   (mis. nama sama tapi NIS beda hasil impor berulang). Guard identitas DILEWATI dgn sadar.
const manualMerging = ref('')
async function gabungGrupManual(kat, g) {
  if (manualMerging.value) return
  const recs = g.records || []
  if (recs.length < 2) {
    toast.warning('Grup tidak valid untuk digabung.')
    return
  }
  const nama = recs[0]?.nama || '-'
  const ok = await confirmDlg({
    title: 'Gabung Grup Ini (Manual)?',
    message: `${g.count} record "${nama}" akan digabung ke record TERLENGKAP: field kosong diisi dari duplikat, ${g.count - 1} record lain DIHAPUS (ter-backup audit_log → bisa di-recover). Guard konflik identitas DILEWATI karena ini keputusan manual — pastikan benar-benar ORANG YANG SAMA. Lanjutkan?`,
    confirmText: 'Gabung & Hapus',
    danger: true
  })
  if (!ok) return
  manualMerging.value = kat.label + '|' + g.key
  try {
    const result = await mergeGroupManual(kat.kind, recs)
    if (result.fail > 0) toast.warning(`Gabung "${nama}": ${result.ok} OK, ${result.fail} gagal — ${result.errors.join('; ')}`)
    else toast.success(`Grup "${nama}" digabung (${result.removedIds.length} duplikat dihapus, backup di audit_log).`)
  } catch (e) {
    toast.error('Gagal gabung grup: ' + (e.message || e))
  } finally {
    manualMerging.value = ''
  }
}

// v.100 Batch10: Migrasi Lembaga — perbaiki salah impor penempatan lembaga (scan → centang → terapkan)
const authStore = useAuthStore()
const lfixFindings = ref(null) // null = belum scan
const lfixChecked = reactive({})
const lfixRunning = ref(false)
const lfixProgress = ref({ i: 0, total: 0 })
const lfixResult = ref(null)
function lfixKey(f) { return f.type + '|' + f.id }
function lfixScan() {
  const found = scanLembagaFix(santriRawForMigration.value || [])
  lfixFindings.value = found
  for (const k of Object.keys(lfixChecked)) delete lfixChecked[k]
  for (const f of found) lfixChecked[lfixKey(f)] = !!f.defaultOn
  lfixResult.value = null
}
const lfixSelectedCount = computed(() =>
  (lfixFindings.value || []).filter((f) => lfixChecked[lfixKey(f)]).length
)
async function lfixApply() {
  const items = (lfixFindings.value || []).filter((f) => lfixChecked[lfixKey(f)])
  if (!items.length) { toast.warning('Tidak ada temuan yang dicentang.'); return }
  const ok = await confirmDlg({
    title: 'Terapkan Migrasi Lembaga?',
    message: `${items.length} santri akan diperbarui sesuai saran (lembaga diganti / lembaga sekolah dikosongkan). Nilai LAMA di-backup ke audit_log. Lanjutkan?`,
    confirmText: 'Terapkan',
    danger: true
  })
  if (!ok) return
  lfixRunning.value = true
  lfixProgress.value = { i: 0, total: items.length }
  try {
    const res = await applyLembagaFix(items, {
      sesi: authStore.sesiAktif,
      onProgress: (i, total) => { lfixProgress.value = { i, total } }
    })
    lfixResult.value = res
    if (res.fail > 0) toast.warning(`Selesai: ${res.ok} OK, ${res.fail} gagal — ${res.errors.join('; ')}`)
    else toast.success(`Migrasi lembaga: ${res.ok} santri diperbarui (backup di audit_log).`)
    lfixScan()
  } catch (e) {
    toast.error('Gagal migrasi lembaga: ' + (e.message || e))
  } finally {
    lfixRunning.value = false
  }
}

const TABS = [
  { id: 'lembaga', label: 'Lembaga/Divisi', icon: 'fa-sitemap', color: 'blue' },
  { id: 'tp', label: 'Tahun Pelajaran', icon: 'fa-calendar', color: 'orange' },
  { id: 'guru', label: 'Guru/Pegawai', icon: 'fa-user-tie', color: 'purple' },
  { id: 'santri', label: 'Data Santri', icon: 'fa-user-graduate', color: 'teal' },
  { id: 'audit', label: 'Audit Data', icon: 'fa-stethoscope', color: 'rose' }
]

const COLOR_CLASSES = {
  blue: {
    active: 'bg-cyan-600 text-white shadow-md',
    inactive: 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-700'
  },
  cyan: {
    active: 'bg-cyan-600 text-white shadow-md',
    inactive: 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-700'
  },
  purple: {
    active: 'bg-teal-600 text-white shadow-md',
    inactive: 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'
  },
  teal: {
    active: 'bg-teal-600 text-white shadow-md',
    inactive: 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'
  },
  emerald: {
    active: 'bg-emerald-600 text-white shadow-md',
    inactive: 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
  },
  amber: {
    active: 'bg-cyan-600 text-white shadow-md',
    inactive: 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-700'
  },
  rose: {
    active: 'bg-rose-600 text-white shadow-md',
    inactive: 'text-slate-600 hover:bg-rose-50 hover:text-rose-700'
  }
}
function tabClass(tab) {
  const c = COLOR_CLASSES[tab.color] || COLOR_CLASSES.teal
  return activeTab.value === tab.id ? c.active : c.inactive
}

const activeTab = ref('lembaga')
const lembagaSubTab = ref('lembaga')

onMounted(() => {
  const t = route.query.tab
  if (t && TABS.find((x) => x.id === t)) activeTab.value = t
  const sub = route.query.sub
  if (sub) lembagaSubTab.value = sub
  loadRaporSettings()
  loadRekapSettings()
})

// v.21.21.0526: Watch route query tab — handle Edit/Tambah → balik ke Master Data dengan tab benar
watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab && TABS.find((x) => x.id === newTab)) activeTab.value = newTab
  }
)

function switchTab(id) {
  activeTab.value = id
  router.replace({ query: { ...route.query, tab: id } })
}

// v.20.79: TAHUN PELAJARAN CRUD (M4)
const tpList = computed(() => {
  const arr = settings.settings?.master_tp
  return Array.isArray(arr) ? arr : []
})
const tpAktif = computed(() => settings.settings?.tp_aktif || '')
const tpForm = reactive({ value: '', idx: null })
const savingTp = ref(false)
function editTp(idx) {
  tpForm.value = tpList.value[idx] || ''
  tpForm.idx = idx
}
function resetTp() {
  tpForm.value = ''
  tpForm.idx = null
}
async function simpanTp() {
  if (!tpForm.value.trim()) {
    toast.warning('Tahun Pelajaran wajib diisi')
    return
  }
  savingTp.value = true
  try {
    const arr = [...tpList.value]
    if (tpForm.idx !== null) {
      arr[tpForm.idx] = tpForm.value.trim()
    } else {
      if (arr.includes(tpForm.value.trim())) {
        toast.warning('TP sudah ada')
        return
      }
      arr.push(tpForm.value.trim())
    }
    await setDoc(doc(db, 'settings', 'general'), { master_tp: arr }, { merge: true })
    await setDoc(doc(db, 'settings', 'web'), { master_tp: arr }, { merge: true })
    settings.settings.master_tp = arr
    toast.success(tpForm.idx !== null ? 'Diperbarui' : 'Tersimpan')
    resetTp()
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    savingTp.value = false
  }
}
async function hapusTp(idx) {
  // v.21.115.0528: useConfirm API = function call, bukan .ask()
  const ok = await confirmDlg({
    title: 'Hapus Tahun Pelajaran?',
    message: `TP "${tpList.value[idx]}" akan dihapus permanen.`,
    confirmText: 'Hapus',
    cancelText: 'Batal',
    danger: true
  })
  if (!ok) return
  try {
    const arr = [...tpList.value]
    arr.splice(idx, 1)
    await setDoc(doc(db, 'settings', 'general'), { master_tp: arr }, { merge: true })
    await setDoc(doc(db, 'settings', 'web'), { master_tp: arr }, { merge: true })
    settings.settings.master_tp = arr
    toast.success('Dihapus')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}
async function setTpAktif(tp) {
  try {
    await setDoc(doc(db, 'settings', 'general'), { tp_aktif: tp }, { merge: true })
    await setDoc(doc(db, 'settings', 'web'), { tp_aktif: tp }, { merge: true })
    settings.settings.tp_aktif = tp
    toast.success(`TP Aktif: ${tp}`)
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}

// v.21.85.0527: Jabatan CRUD dipindah ke JabatanKelolaView (sub-menu Lembaga > Jabatan)

// PENGATURAN RAPOR
const DEFAULT_PREDIKAT = [
  { min: 90, max: 100, label: 'A', desc: 'Mumtaz (Istimewa)' },
  { min: 80, max: 89, label: 'B', desc: 'Jayyid Jiddan (Sangat Baik)' },
  { min: 70, max: 79, label: 'C', desc: 'Jayyid (Baik)' },
  { min: 60, max: 69, label: 'D', desc: 'Maqbul (Cukup)' },
  { min: 0, max: 59, label: 'E', desc: 'Rasib (Belum Mencapai)' }
]
const predikatRules = ref([])
const savingRapor = ref(false)
const bgRaporTPQ = ref('')
const bgRaporDiniyah = ref('')

function loadRaporSettings() {
  const s = settings.settings || {}
  const stored = s.raporPredikat
  predikatRules.value =
    Array.isArray(stored) && stored.length > 0
      ? JSON.parse(JSON.stringify(stored))
      : JSON.parse(JSON.stringify(DEFAULT_PREDIKAT))
  bgRaporTPQ.value = s.bgRaporTPQ || ''
  bgRaporDiniyah.value = s.bgRaporDiniyah || ''
}

function tambahPredikat() {
  predikatRules.value.push({ min: 0, max: 0, label: '', desc: '' })
}
function hapusPredikat(idx) {
  predikatRules.value.splice(idx, 1)
}

async function uploadBgRapor(event, target) {
  const file = event.target.files?.[0]
  if (!file) return
  if (file.size > 4 * 1024 * 1024) {
    toast.warning('Max 4 MB')
    return
  }
  try {
    const { uploadBase64 } = await import('@/services/storage')
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const url = await uploadBase64(
          `bg_rapor/${target}_${Date.now()}.${file.name.split('.').pop()}`,
          reader.result,
          file.type
        )
        if (target === 'tpq') {
          bgRaporTPQ.value = url
          await setDoc(doc(db, 'settings', 'general'), { bgRaporTPQ: url }, { merge: true })
          await setDoc(doc(db, 'settings', 'web'), { bgRaporTPQ: url }, { merge: true })
          settings.settings.bgRaporTPQ = url
        } else {
          bgRaporDiniyah.value = url
          await setDoc(doc(db, 'settings', 'general'), { bgRaporDiniyah: url }, { merge: true })
          await setDoc(doc(db, 'settings', 'web'), { bgRaporDiniyah: url }, { merge: true })
          settings.settings.bgRaporDiniyah = url
        }
        toast.success(`BG Rapor ${target.toUpperCase()} terupload`)
      } catch (e) {
        toast.error('Upload gagal: ' + e.message)
      }
    }
    reader.readAsDataURL(file)
  } catch (e) {
    toast.error('Error: ' + e.message)
  }
}

async function hapusBgRapor(target) {
  if (!confirm(`Hapus BG Rapor ${target.toUpperCase()}?`)) return
  try {
    if (target === 'tpq') {
      bgRaporTPQ.value = ''
      await setDoc(doc(db, 'settings', 'general'), { bgRaporTPQ: '' }, { merge: true })
      await setDoc(doc(db, 'settings', 'web'), { bgRaporTPQ: '' }, { merge: true })
      settings.settings.bgRaporTPQ = ''
    } else {
      bgRaporDiniyah.value = ''
      await setDoc(doc(db, 'settings', 'general'), { bgRaporDiniyah: '' }, { merge: true })
      await setDoc(doc(db, 'settings', 'web'), { bgRaporDiniyah: '' }, { merge: true })
      settings.settings.bgRaporDiniyah = ''
    }
    toast.success('Dihapus')
  } catch (e) {
    toast.error('Gagal: ' + e.message)
  }
}

async function simpanPengaturanRapor() {
  savingRapor.value = true
  try {
    await setDoc(
      doc(db, 'settings', 'general'),
      { raporPredikat: predikatRules.value },
      { merge: true }
    )
    await setDoc(
      doc(db, 'settings', 'web'),
      { raporPredikat: predikatRules.value },
      { merge: true }
    )
    settings.settings.raporPredikat = predikatRules.value
    toast.success('Pengaturan rapor tersimpan')
  } catch (e) {
    toast.error('Gagal: ' + e.message)
  } finally {
    savingRapor.value = false
  }
}

// PENGATURAN REKAP PRESTASI per-lembaga Diniyah
const DEFAULT_MAPEL_DINIYAH = 'Aqidah Akhlak, Fiqh, Tarikh, Bahasa Arab'
const rekapMapelPerLembaga = ref({})
const savingRekap = ref(false)

const lembagaDiniyah = computed(() => {
  const QIRAATI = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH', 'TPQ', 'P3H']
  return (lembagaRaw.value || [])
    .map((l) => l.lembaga || l.nama)
    .filter((n) => n && !QIRAATI.includes(n))
})

function loadRekapSettings() {
  const stored = settings.settings?.rekapDiniyahMapel
  rekapMapelPerLembaga.value = stored && typeof stored === 'object' ? { ...stored } : {}
}

function getMapelDiniyah(lemb) {
  return rekapMapelPerLembaga.value[lemb] || ''
}

function setMapelDiniyah(lemb, val) {
  rekapMapelPerLembaga.value[lemb] = val
}

async function simpanPengaturanRekap() {
  savingRekap.value = true
  try {
    await setDoc(
      doc(db, 'settings', 'general'),
      { rekapDiniyahMapel: rekapMapelPerLembaga.value },
      { merge: true }
    )
    await setDoc(
      doc(db, 'settings', 'web'),
      { rekapDiniyahMapel: rekapMapelPerLembaga.value },
      { merge: true }
    )
    settings.settings.rekapDiniyahMapel = { ...rekapMapelPerLembaga.value }
    toast.success('Pengaturan rekap prestasi tersimpan')
  } catch (e) {
    toast.error('Gagal: ' + e.message)
  } finally {
    savingRekap.value = false
  }
}
</script>

<template>
  <!-- v.72.8.0526: Master Data 7 tabs match legacy "Pusat Master Data" -->
  <div class="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
    <!-- v.21.14.0526: Tighter header — v.100: sembunyikan di Electron (aksi → pita) -->
    <header
      v-if="!isDesktop"
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="flex items-baseline gap-2 flex-wrap">
        <h1
          class="text-base md:text-lg font-black text-slate-800 dark:text-white whitespace-nowrap"
        >
          <i class="fas fa-database text-teal-600 mr-1"></i>Pusat Master Data
        </h1>
        <p class="text-[11px] text-slate-500 dark:text-slate-400">
          — Pilih kategori untuk mengelola data.
        </p>
      </div>
    </header>

    <!-- v.21.14.0526: tabs flex-wrap — v.100: sembunyikan di Electron (navigasi via pita) -->
    <div
      v-if="!isDesktop"
      class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-2"
    >
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="tab in TABS"
          :key="tab.id"
          @click="switchTab(tab.id)"
          :class="[
            'whitespace-nowrap h-10 px-3 text-xs font-bold transition cursor-pointer rounded-xl inline-flex items-center gap-1.5',
            tabClass(tab)
          ]"
        >
          <i :class="['fas', tab.icon, 'text-sm']"></i>
          <span>{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <!-- TAB 1: LEMBAGA -->
    <div v-if="activeTab === 'lembaga'" class="space-y-3">
      <div
        class="bg-white dark:bg-slate-800 rounded-xl p-2 md:p-3 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap gap-2"
      >
        <button
          @click="lembagaSubTab = 'lembaga'"
          :class="[
            'px-3 py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer',
            lembagaSubTab === 'lembaga'
              ? 'bg-cyan-500 text-white border-cyan-600'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-cyan-50'
          ]"
        >
          <i class="fas fa-building mr-1"></i>Daftar Lembaga
        </button>
        <!-- v.21.85.0527: Kelas & Guru -->
        <button
          @click="lembagaSubTab = 'kelas-guru'"
          :class="[
            'px-3 py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer',
            lembagaSubTab === 'kelas-guru'
              ? 'bg-cyan-500 text-white border-cyan-600'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-cyan-50'
          ]"
        >
          <i class="fas fa-user-friends mr-1"></i>Kelas &amp; Guru
        </button>
        <!-- v.21.85.0527: Jabatan ACF -->
        <button
          @click="lembagaSubTab = 'jabatan'"
          :class="[
            'px-3 py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer',
            lembagaSubTab === 'jabatan'
              ? 'bg-cyan-500 text-white border-cyan-600'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-cyan-50'
          ]"
        >
          <i class="fas fa-id-badge mr-1"></i>Jabatan
        </button>
      </div>
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
      >
        <component
          :is="
            lembagaSubTab === 'kelas-guru'
              ? KelasGuruView
              : lembagaSubTab === 'jabatan'
                ? JabatanKelolaView
                : LembagaView
          "
          :key="lembagaSubTab"
        />
      </div>
    </div>

    <!-- v.21.85.0527: TAB Jabatan dihapus — kini sub-menu Lembaga > Jabatan -->

    <!-- TAB 3: GURU/PEGAWAI — v.21.17c.0526: mode=master untuk CRUD lengkap -->
    <div
      v-else-if="activeTab === 'guru'"
      class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
    >
      <GuruView mode="master" />
    </div>

    <!-- TAB 4: DATA SANTRI -->
    <div
      v-else-if="activeTab === 'santri'"
      class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
    >
      <SantriView mode="master" />
    </div>

    <!-- TAB 5: RAPOR -->
    <div v-else-if="activeTab === 'rapor'" class="space-y-4">
      <header
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <h3 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
          <i class="fas fa-graduation-cap text-emerald-600 mr-2"></i>Pengaturan Rapor Semester
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Konfigurasi KOP, predikat, schema field & background per lembaga.
        </p>
      </header>

      <div
        class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700"
      >
        <h5 class="text-xs font-black text-slate-700 dark:text-slate-200 uppercase mb-2">
          <i class="fas fa-heading mr-1 text-emerald-600"></i>Sistem Kop Rapor (Otomatis)
        </h5>
        <ul
          class="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed list-disc ml-5 space-y-1"
        >
          <li>
            <strong>Rapor Qiraati</strong> (TPQ/Pra PTPT/PTPT/PPPH): kiri = Logo Qiraati, tengah =
            Kop Utama Aplikasi, kanan = Logo Sekolah Santri
          </li>
          <li>
            <strong>Rapor Diniyah</strong>: kiri = Logo Aplikasi, tengah = Kop Sekolah Santri, kanan
            = Logo Sekolah Santri
          </li>
        </ul>
        <p class="text-[11px] text-slate-600 dark:text-slate-400 mt-2">
          Setup logo &amp; KOP dilakukan di
          <router-link to="/pengaturan-web" class="underline font-bold text-emerald-700"
            >Pengaturan Web</router-link
          >.
        </p>
      </div>

      <div
        class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4 border border-cyan-200 dark:border-cyan-700"
      >
        <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h5 class="text-xs font-black text-slate-700 dark:text-slate-200 uppercase">
            <i class="fas fa-star mr-1 text-cyan-600"></i>Aturan Predikat Nilai
          </h5>
          <button
            @click="tambahPredikat"
            class="text-[11px] font-bold text-cyan-600 hover:text-cyan-800 cursor-pointer"
          >
            <i class="fas fa-plus mr-1"></i>Tambah Aturan
          </button>
        </div>
        <div class="space-y-2">
          <div
            v-for="(p, idx) in predikatRules"
            :key="idx"
            class="bg-white dark:bg-slate-800 rounded-lg p-2 md:p-3 border border-cyan-100 dark:border-cyan-700/50 grid grid-cols-12 gap-2 items-center"
          >
            <input
              v-model.number="p.min"
              type="number"
              class="col-span-2 px-2 py-1.5 text-xs text-center border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            />
            <span class="col-span-1 text-center text-xs text-slate-500">-</span>
            <input
              v-model.number="p.max"
              type="number"
              class="col-span-2 px-2 py-1.5 text-xs text-center border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            />
            <input
              v-model="p.label"
              type="text"
              maxlength="3"
              class="col-span-2 px-2 py-1.5 text-xs text-center font-black border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            />
            <input
              v-model="p.desc"
              type="text"
              class="col-span-4 px-2 py-1.5 text-xs border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            />
            <button
              @click="hapusPredikat(idx)"
              class="col-span-1 text-rose-500 hover:text-rose-700 text-sm cursor-pointer"
              title="Hapus"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <div
        class="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-200 dark:border-teal-700"
      >
        <h5 class="text-xs font-black text-slate-700 dark:text-slate-200 uppercase mb-2">
          <i class="fas fa-list-alt mr-1 text-teal-600"></i>Struktur Field Rapor (Per Lembaga)
        </h5>
        <p class="text-[11px] text-slate-600 dark:text-slate-400 mb-3">
          Editor schema per lembaga (TPQ/Pra PTPT/PTPT/PPPH).
        </p>
        <div class="flex gap-2 flex-wrap">
          <!-- v.20.39.0526: Schema editor per-lembaga akan ada di Lembaga > [lembaga] > Pengaturan (sedang build, kyai req) -->
          <router-link
            v-for="lemb in ['TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH']"
            :key="lemb"
            :to="{ path: '/lembaga' }"
            class="bg-white hover:bg-teal-100 dark:bg-slate-800 border border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300 font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer inline-flex items-center"
          >
            <i class="fas fa-edit mr-1"></i>Edit {{ lemb }}
          </router-link>
        </div>
        <p class="text-[10px] text-slate-500 italic mt-2">
          <i class="fas fa-info-circle mr-1"></i>Buka lembaga di Master Data &gt; Lembaga untuk
          akses Pengaturan per-lembaga (Kelas, Rapor, Rekap, dll).
        </p>
      </div>

      <div
        class="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border border-teal-200 dark:border-teal-700"
      >
        <h5 class="text-xs font-black text-slate-700 dark:text-slate-200 uppercase mb-2">
          <i class="fas fa-puzzle-piece mr-1 text-teal-600"></i>Field Tambahan (ACF - Tanpa
          Koding)
        </h5>
        <p class="text-[11px] text-slate-600 dark:text-slate-400 mb-3">
          Tambah field custom di form Santri/Guru/Lembaga.
        </p>
        <button
          @click="activeTab = 'lembaga'; lembagaSubTab = 'field-schema'"
          class="bg-teal-600 hover:bg-teal-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
        >
          <i class="fas fa-external-link-alt mr-1"></i>Buka Field Schema Editor
        </button>
      </div>

      <div
        class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4 border border-cyan-200 dark:border-cyan-700"
      >
        <h5 class="text-xs font-black text-slate-700 dark:text-slate-200 uppercase mb-2">
          <i class="fas fa-image mr-1 text-cyan-600"></i>Background Rapor (Watermark)
        </h5>
        <p class="text-[11px] text-slate-600 dark:text-slate-400 mb-3">
          PNG transparent direkomendasikan, max 4 MB. Tampil di belakang konten rapor saat cetak
          (opacity 10%).
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            class="bg-white dark:bg-slate-800 rounded-lg p-3 border border-cyan-100 dark:border-cyan-700/50"
          >
            <label class="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 block"
              >BG Rapor Qiraati (TPQ / PTPT / PPPH)</label
            >
            <input
              type="file"
              accept="image/png,image/jpeg"
              @change="uploadBgRapor($event, 'tpq')"
              class="block w-full text-xs text-slate-600 dark:text-slate-400"
            />
            <img
              v-if="bgRaporTPQ"
              :src="bgRaporTPQ"
              class="h-20 w-auto rounded object-contain mt-2 border border-slate-200 bg-white"
            />
            <button
              v-if="bgRaporTPQ"
              @click="hapusBgRapor('tpq')"
              class="text-[10px] text-rose-600 hover:text-rose-800 mt-1 cursor-pointer font-bold"
            >
              <i class="fas fa-trash mr-1"></i>Hapus
            </button>
          </div>
          <div
            class="bg-white dark:bg-slate-800 rounded-lg p-3 border border-cyan-100 dark:border-cyan-700/50"
          >
            <label class="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 block"
              >BG Rapor Diniyah</label
            >
            <input
              type="file"
              accept="image/png,image/jpeg"
              @change="uploadBgRapor($event, 'diniyah')"
              class="block w-full text-xs text-slate-600 dark:text-slate-400"
            />
            <img
              v-if="bgRaporDiniyah"
              :src="bgRaporDiniyah"
              class="h-20 w-auto rounded object-contain mt-2 border border-slate-200 bg-white"
            />
            <button
              v-if="bgRaporDiniyah"
              @click="hapusBgRapor('diniyah')"
              class="text-[10px] text-rose-600 hover:text-rose-800 mt-1 cursor-pointer font-bold"
            >
              <i class="fas fa-trash mr-1"></i>Hapus
            </button>
          </div>
        </div>
      </div>

      <button
        @click="simpanPengaturanRapor"
        :disabled="savingRapor"
        class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
      >
        <i :class="['fas', savingRapor ? 'fa-spinner fa-spin' : 'fa-save']"></i>
        {{ savingRapor ? 'Menyimpan...' : 'SIMPAN PENGATURAN RAPOR' }}
      </button>

      <p class="text-[11px] text-slate-500 italic text-center pt-2">
        <i class="fas fa-info-circle mr-1"></i>Halaman Rapor Semester untuk input nilai per santri
        tersedia di
        <router-link to="/rapor" class="underline font-bold text-emerald-700"
          >menu Rapor</router-link
        >.
      </p>
    </div>

    <!-- TAB 6: REKAP PRESTASI -->
    <div v-else-if="activeTab === 'rekap'" class="space-y-4">
      <header
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <h3 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
          <i class="fas fa-book-open text-cyan-600 mr-2"></i>Pengaturan Rekap Prestasi
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Atur struktur kolom rekap prestasi per lembaga.
        </p>
      </header>

      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <h4
          class="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest mb-2 flex items-center gap-2"
        >
          <i class="fas fa-list-ul text-cyan-600"></i>Mata Pelajaran Rekap Diniyah (Per Lembaga)
        </h4>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-4 italic">
          Daftar kolom mata pelajaran yang tampil di Rekap Prestasi Diniyah untuk tiap lembaga
          formal. Pisah dengan koma.
        </p>

        <div
          v-if="lembagaDiniyah.length === 0"
          class="text-center py-8 text-xs text-slate-400 italic"
        >
          <i class="fas fa-school text-3xl text-slate-300 dark:text-slate-600 block mb-2"></i>
          Belum ada lembaga formal terdaftar.
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="lemb in lembagaDiniyah"
            :key="lemb"
            class="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-3 md:p-4 border border-slate-200 dark:border-slate-700"
          >
            <label
              class="flex items-center gap-2 text-sm font-black text-slate-700 dark:text-slate-200 mb-2"
            >
              <i class="fas fa-school text-cyan-500"></i>{{ lemb }}
            </label>
            <textarea
              :value="getMapelDiniyah(lemb)"
              @input="setMapelDiniyah(lemb, $event.target.value)"
              rows="2"
              :placeholder="`Default: ${DEFAULT_MAPEL_DINIYAH} (kalau kosong)`"
              class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white resize-none"
            ></textarea>
            <p class="text-[10px] text-slate-400 italic mt-1">
              <i class="fas fa-info-circle mr-1"></i>Contoh: Nahwu, Fiqh, Tafsir, Akhlaq
            </p>
          </div>
        </div>
      </div>

      <div
        class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700"
      >
        <h4
          class="text-sm font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-widest mb-2 flex items-center gap-2"
        >
          <i class="fas fa-info-circle"></i>Rekap Qiraati
        </h4>
        <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          Untuk Rekap Qiraati, struktur kolom (Awal Bulan, Akhir Bulan, Total) sudah ditentukan
          otomatis sesuai jenis lembaga (TPQ Pagi, TPQ Sore, Pra PTPT, PTPT, PPPH).
        </p>
      </div>

      <button
        @click="simpanPengaturanRekap"
        :disabled="savingRekap || lembagaDiniyah.length === 0"
        class="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black py-3 rounded-xl shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
      >
        <i :class="['fas', savingRekap ? 'fa-spinner fa-spin' : 'fa-save']"></i>
        {{ savingRekap ? 'Menyimpan...' : 'SIMPAN PENGATURAN REKAP' }}
      </button>

      <p class="text-[11px] text-slate-500 italic text-center pt-2">
        <i class="fas fa-info-circle mr-1"></i>Input nilai per santri tersedia di
        <router-link to="/rekap-prestasi" class="underline font-bold text-teal-700"
          >menu Rekap Prestasi</router-link
        >.
      </p>
    </div>

    <!-- TAB: TAHUN PELAJARAN (M4 v.20.79) -->
    <div
      v-else-if="activeTab === 'tp'"
      class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <p class="text-sm font-black text-cyan-700 dark:text-cyan-300 mb-1">
        <i class="fas fa-plus-circle text-cyan-600 mr-1"></i>Kelola Tahun Pelajaran
      </p>
      <p class="text-xs text-slate-700 dark:text-slate-300 mb-3">
        Daftar TP untuk dropdown Rapor / Naik Kelas / Statistik. Pilih satu sebagai TP Aktif.
      </p>
      <div class="flex gap-2 mb-3">
        <input
          v-model="tpForm.value"
          type="text"
          class="flex-1 px-3 py-2 text-sm rounded-lg border border-cyan-300 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
        />
        <button
          @click="simpanTp"
          :disabled="savingTp"
          class="bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold px-4 py-2 rounded-lg disabled:opacity-50"
        >
          <i class="fas fa-save mr-1"></i>{{ tpForm.idx !== null ? 'Update' : 'Tambah' }}
        </button>
        <button
          v-if="tpForm.idx !== null"
          @click="resetTp"
          class="bg-slate-300 hover:bg-slate-400 text-slate-700 text-sm font-bold px-3 py-2 rounded-lg"
        >
          Batal
        </button>
      </div>
      <div
        v-if="tpList.length === 0"
        class="text-center text-slate-400 italic text-xs py-8 bg-slate-50 dark:bg-slate-900 rounded-lg"
      >
        Belum ada TP. Tambahkan via form di atas.
      </div>
      <ul v-else class="space-y-2">
        <li
          v-for="(tp, idx) in tpList"
          :key="idx"
          class="flex justify-between items-center bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700"
        >
          <span class="text-sm font-bold text-slate-800 dark:text-white">
            <i class="fas fa-calendar text-cyan-500 mr-2"></i>{{ tp }}
            <span
              v-if="tp === tpAktif"
              class="ml-2 text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase font-black"
              >Aktif</span
            >
          </span>
          <div class="flex gap-1">
            <button
              v-if="tp !== tpAktif"
              @click="setTpAktif(tp)"
              aria-label="Set sebagai TP Aktif"
              title="Set sebagai TP Aktif"
              class="text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 px-2 py-1 rounded text-xs font-bold"
            >
              <i class="fas fa-check"></i>
            </button>
            <button
              @click="editTp(idx)"
              aria-label="Edit Tahun Pelajaran"
              title="Edit Tahun Pelajaran"
              class="text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 px-2 py-1 rounded text-xs"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              @click="hapusTp(idx)"
              aria-label="Hapus Tahun Pelajaran"
              title="Hapus Tahun Pelajaran"
              class="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 px-2 py-1 rounded text-xs"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- TAB 7: AUDIT LOG (M6 v.20.79 — replace placeholder) -->
    <div v-else-if="activeTab === 'audit'" class="space-y-4">
      <!-- v.100 Batch14: Generate No. Induk Otomatis (field nis) -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border-2 border-teal-300 dark:border-teal-700 shadow-sm">
        <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div class="min-w-0">
            <p class="text-sm font-black text-teal-700 dark:text-teal-300"><i class="fas fa-hashtag mr-1"></i>Generate No. Induk Otomatis</p>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">Format <b>NNNN+DDMMYY</b> (mis. <code class="bg-slate-100 dark:bg-slate-700 px-1 rounded">0001120399</code>): nomor urut global dari <b>tgl lahir TERTUA → termuda</b>, seri tgl sama → <b>nama A–Z</b>. Santri tanpa tgl lahir dilewati (No. Induk lama dibiarkan). No. Induk = field; riwayat keuangan/rapor pakai ID santri → tidak terpengaruh. <b>NIS &amp; NISN dari Dinas (santri TK/SDI/PKBM) diinput manual &amp; tidak disentuh.</b> <i>(Pasca impor santri, regenerate ini juga jalan otomatis.)</i></p>
          </div>
          <button @click="scanNis" :disabled="nisGenerating" class="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-black rounded-lg whitespace-nowrap"><i class="fas fa-magnifying-glass mr-1"></i>Pratinjau</button>
        </div>
        <div v-if="nisPlan" class="space-y-2">
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="px-2 py-1 rounded-lg bg-teal-50 text-teal-800 dark:bg-teal-900/30 dark:text-teal-200 font-bold">{{ nisChangedCount }} berubah</span>
            <span class="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-bold">{{ nisPlan.total - nisChangedCount }} tetap</span>
            <span class="px-2 py-1 rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 font-bold">{{ nisPlan.skipped.length }} tanpa tgl lahir</span>
          </div>
          <div v-if="nisChangedCount" class="max-h-64 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-lg">
            <table class="w-full text-[11px]">
              <thead class="sticky top-0 bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th class="p-1.5 text-left font-black">#</th>
                  <th class="p-1.5 text-left font-black">Nama</th>
                  <th class="p-1.5 text-left font-black">No. Induk Lama</th>
                  <th class="p-1.5 text-left font-black">No. Induk Baru</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(c, ci) in nisPlan.changes.filter((x) => x.changed)" :key="c.id" class="border-t border-slate-100 dark:border-slate-700">
                  <td class="p-1.5 text-slate-400">{{ ci + 1 }}</td>
                  <td class="p-1.5 font-bold text-slate-800 dark:text-white">{{ c.nama }}</td>
                  <td class="p-1.5 font-mono text-slate-400 line-through">{{ c.oldNis || '—' }}</td>
                  <td class="p-1.5 font-mono font-black text-teal-700 dark:text-teal-300">{{ c.newNis }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <button @click="applyNis" :disabled="nisGenerating || !nisChangedCount" class="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-black rounded-lg">
              <i :class="['fas', nisGenerating ? 'fa-spinner fa-spin' : 'fa-check', 'mr-1']"></i>{{ nisGenerating ? `Menulis ${nisProgress.i}/${nisProgress.total}…` : `Terapkan (${nisChangedCount})` }}
            </button>
            <button @click="nisPlan = null" :disabled="nisGenerating" class="px-3 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg">Batal</button>
          </div>
        </div>
        <p v-if="nisResult" class="text-xs font-bold text-emerald-700 dark:text-emerald-300 mt-2"><i class="fas fa-circle-check mr-1"></i>{{ nisResult.changed }} No. Induk diperbarui{{ nisResult.fail ? `, ${nisResult.fail} gagal` : '' }}.</p>
      </div>

      <!-- v.100 Batch16: Generate NIG Otomatis -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border-2 border-indigo-300 dark:border-indigo-700 shadow-sm">
        <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div class="min-w-0">
            <p class="text-sm font-black text-indigo-700 dark:text-indigo-300"><i class="fas fa-id-badge mr-1"></i>Generate NIG Otomatis</p>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">Nomor Induk Guru. Format <b>NNN+DDMMYY</b> (9 digit): nomor urut dari <b>tgl TUGAS terlama → terbaru</b>, seri → <b>nama A–Z</b>; DDMMYY = tgl tugas. Guru tanpa tgl tugas dilewati. <i>(Pasca impor guru jalan otomatis; guru baru via form = lanjut nomor.)</i></p>
          </div>
          <button @click="scanNig" :disabled="nigGenerating" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-black rounded-lg whitespace-nowrap"><i class="fas fa-magnifying-glass mr-1"></i>Pratinjau</button>
        </div>
        <div v-if="nigPlan" class="space-y-2">
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200 font-bold">{{ nigChangedCount }} berubah</span>
            <span class="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-bold">{{ nigPlan.total - nigChangedCount }} tetap</span>
            <span class="px-2 py-1 rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 font-bold">{{ nigPlan.skipped.length }} tanpa tgl tugas</span>
          </div>
          <div v-if="nigChangedCount" class="max-h-64 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-lg">
            <table class="w-full text-[11px]">
              <thead class="sticky top-0 bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th class="p-1.5 text-left font-black">#</th>
                  <th class="p-1.5 text-left font-black">Nama</th>
                  <th class="p-1.5 text-left font-black">NIG Lama</th>
                  <th class="p-1.5 text-left font-black">NIG Baru</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(c, ci) in nigPlan.changes.filter((x) => x.changed)" :key="c.id" class="border-t border-slate-100 dark:border-slate-700">
                  <td class="p-1.5 text-slate-400">{{ ci + 1 }}</td>
                  <td class="p-1.5 font-bold text-slate-800 dark:text-white">{{ c.nama }}</td>
                  <td class="p-1.5 font-mono text-slate-400 line-through">{{ c.oldNig || '—' }}</td>
                  <td class="p-1.5 font-mono font-black text-indigo-700 dark:text-indigo-300">{{ c.newNig }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <button @click="applyNig" :disabled="nigGenerating || !nigChangedCount" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-black rounded-lg">
              <i :class="['fas', nigGenerating ? 'fa-spinner fa-spin' : 'fa-check', 'mr-1']"></i>{{ nigGenerating ? `Menulis ${nigProgress.i}/${nigProgress.total}…` : `Terapkan (${nigChangedCount})` }}
            </button>
            <button @click="nigPlan = null" :disabled="nigGenerating" class="px-3 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg">Batal</button>
          </div>
        </div>
        <p v-if="nigResult" class="text-xs font-bold text-emerald-700 dark:text-emerald-300 mt-2"><i class="fas fa-circle-check mr-1"></i>{{ nigResult.changed }} NIG diperbarui{{ nigResult.fail ? `, ${nigResult.fail} gagal` : '' }}.</p>
      </div>

      <!-- v.99: Analisis Data Duplikat -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border-2 border-rose-300 dark:border-rose-700 shadow-sm">
        <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div>
            <p class="text-sm font-black text-rose-700 dark:text-rose-300"><i class="fas fa-clone mr-1"></i>Analisis Data Duplikat</p>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">Deteksi santri (Nama / No. Induk / NISN sama) &amp; guru (Nama / WA sama). <b>Migrate</b> menggabung: (1) identitas unik (No. Induk/NISN/WA sama) + (2) nama sama yang punya sinyal penguat (NIK/tgl lahir/lembaga+kelas sama). Nama sama tanpa sinyal / yang konflik identitas TIDAK digabung otomatis — buka <b>Lihat Detail</b> lalu pakai tombol <b>Gabung Grup Ini</b> (keputusan manual per grup), atau rapikan via Edit/Hapus.</p>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded uppercase" :class="totalDupGroups > 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'">{{ totalDupGroups }} grup duplikat</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button @click="showDupDetail = !showDupDetail" class="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-lg">
            <i class="fas fa-search mr-1"></i>{{ showDupDetail ? 'Sembunyikan Detail' : 'Lihat Detail' }}
          </button>
          <button @click="dedupeDryRun" class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black rounded-lg">
            <i class="fas fa-vial mr-1"></i>Dry-Run Migrate
          </button>
          <button @click="dedupeExecute" :disabled="dedupeRunning || !dedupeScan || dedupeScan.total === 0" class="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white text-xs font-black rounded-lg">
            <i class="fas fa-code-merge mr-1"></i>{{ dedupeRunning ? `Menggabung… ${dedupeProgress.i}/${dedupeProgress.total}` : 'Migrate (Gabung Duplikat)' }}
          </button>
        </div>
        <div v-if="dedupeScan" class="mt-2 text-xs rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-2 text-amber-800 dark:text-amber-200">
          <p class="font-bold"><i class="fas fa-circle-info mr-1"></i>Rencana Migrate: {{ dedupeScan.santriToRemove }} santri + {{ dedupeScan.guruToRemove }} guru akan digabung (identitas unik + nama-sama bersinyal penguat). Nama sama tanpa sinyal / konflik identitas diabaikan (manual).</p>
          <ul v-if="dedupeScan.examples.length" class="list-disc ml-5 mt-1">
            <li v-for="(ex, ei) in dedupeScan.examples" :key="ei">Simpan {{ ex.keep }} · hapus {{ ex.remove.join(', ') }}<span v-if="ex.fill.length"> · isi: {{ ex.fill.join(', ') }}</span></li>
          </ul>
          <p v-if="dedupeResult" class="mt-1 font-bold">Hasil: {{ dedupeResult.ok }} OK, {{ dedupeResult.fail }} gagal.</p>
        </div>
        <div v-if="showDupDetail" class="mt-3 space-y-3">
          <p v-if="totalDupGroups === 0" class="text-xs text-emerald-700 dark:text-emerald-300 font-bold"><i class="fas fa-circle-check mr-1"></i>Tidak ada duplikat terdeteksi.</p>
          <div v-for="kat in dupKategori" :key="kat.label" v-show="kat.groups.length">
            <p class="text-xs font-black text-slate-800 dark:text-white mb-1">{{ kat.label }} ({{ kat.groups.length }})</p>
            <div v-for="(g, gi) in kat.groups" :key="gi" class="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-lg p-2 mb-1.5 text-xs">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <p class="font-bold text-rose-700 dark:text-rose-300">{{ g.count }}× sama:</p>
                <!-- v.100 Batch9: gabung manual per-grup (utk grup yang auto-Migrate tolak, mis. NIS beda) -->
                <button
                  @click="gabungGrupManual(kat, g)"
                  :disabled="manualMerging !== ''"
                  class="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-[11px] font-black rounded-lg"
                  title="Gabung grup ini ke record terlengkap (lewati guard identitas — keputusan manual)"
                >
                  <i class="fas fa-code-merge mr-1"></i>{{ manualMerging === kat.label + '|' + g.key ? 'Menggabung…' : 'Gabung Grup Ini' }}
                </button>
              </div>
              <ul class="list-disc ml-5 text-slate-700 dark:text-slate-200">
                <li v-for="(it, ii) in g.items" :key="ii">{{ it }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- v.100 Batch10: Migrasi Lembaga — perbaiki salah impor penempatan lembaga -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border-2 border-amber-300 dark:border-amber-700 shadow-sm">
        <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div>
            <p class="text-sm font-black text-amber-700 dark:text-amber-300"><i class="fas fa-route mr-1"></i>Migrasi Lembaga (Salah Impor)</p>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">Deteksi penempatan lembaga yang salah dari impor: (A) kelas pola <b>Level → Pra PTPT</b>, <b>Juz (utuh) → PTPT</b>, <b>Pra PTPT → Pra PTPT</b>, <b>Jilid/KPI → TPQ</b> tapi lembaga tak cocok — saran bisa DIUBAH per baris; (B) <b>Lembaga Sekolah berisi nilai ngaji</b> (mis. "TPQ Pagi") → dikosongkan; (C) lembaga TPQ <b>Pagi</b> tapi sekolah TK (bentrok jam pagi) → cek manual (default tidak dicentang). Nilai lama di-backup ke audit_log.</p>
          </div>
          <span v-if="lfixFindings" class="text-[10px] font-bold px-2 py-0.5 rounded uppercase" :class="lfixFindings.length ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'">{{ lfixFindings.length }} temuan</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button @click="lfixScan" class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black rounded-lg">
            <i class="fas fa-magnifying-glass mr-1"></i>Scan Salah Impor
          </button>
          <button @click="lfixApply" :disabled="lfixRunning || !lfixFindings || lfixSelectedCount === 0" class="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white text-xs font-black rounded-lg">
            <i class="fas fa-wand-magic-sparkles mr-1"></i>{{ lfixRunning ? `Memproses… ${lfixProgress.i}/${lfixProgress.total}` : `Terapkan (${lfixSelectedCount})` }}
          </button>
        </div>
        <div v-if="lfixFindings && lfixFindings.length === 0" class="mt-2 text-xs text-emerald-700 dark:text-emerald-300 font-bold">
          <i class="fas fa-circle-check mr-1"></i>Tidak ada salah penempatan lembaga terdeteksi.
        </div>
        <div v-if="lfixFindings && lfixFindings.length" class="mt-3 space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
          <label v-for="f in lfixFindings" :key="lfixKey(f)" class="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-2 text-xs cursor-pointer">
            <input type="checkbox" v-model="lfixChecked[lfixKey(f)]" class="mt-0.5 accent-amber-600" />
            <span class="flex-1 min-w-0">
              <b class="text-slate-800 dark:text-white">{{ f.nama }}</b>
              <span class="text-slate-500 dark:text-slate-400"> · No. Induk {{ f.nis }}</span>
              <span class="block text-slate-600 dark:text-slate-300 mt-0.5">{{ f.alasan }}</span>
            </span>
            <select
              v-if="f.type === 'kelas_lembaga'"
              v-model="f.saranLembaga"
              @click.stop
              class="text-[11px] px-2 py-1 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white flex-shrink-0"
              title="Lembaga tujuan (bisa diubah)"
            >
              <option v-for="o in LEMBAGA_QIRAATI_OPSI" :key="o" :value="o">{{ o }}</option>
            </select>
            <span v-else class="text-[10px] font-bold text-amber-700 dark:text-amber-300 flex-shrink-0">kosongkan sekolah</span>
          </label>
          <p v-if="lfixResult" class="text-xs font-bold text-slate-700 dark:text-slate-200">Hasil: {{ lfixResult.ok }} OK, {{ lfixResult.fail }} gagal.</p>
        </div>
      </div>

      <!-- v.100 Batch8: Kesehatan Data (pro audit) — integritas + kandidat duplikat fuzzy -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border-2 border-cyan-300 dark:border-cyan-700 shadow-sm">
        <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div>
            <p class="text-sm font-black text-cyan-700 dark:text-cyan-300"><i class="fas fa-heart-pulse mr-1"></i>Kesehatan Data</p>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">Audit integritas data santri / guru / lembaga (read-only). Klik baris bermasalah untuk lihat detail.</p>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded uppercase" :class="totalIssues > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'">{{ totalIssues }} temuan</span>
        </div>
        <div class="space-y-1.5">
          <div v-for="g in auditGroups" :key="g.key" class="rounded-lg border" :class="g.items.length ? 'border-slate-200 dark:border-slate-700' : 'border-emerald-100 dark:border-emerald-800/40'">
            <button type="button" @click="g.items.length && toggleHealth(g.key)" :class="['w-full flex items-center gap-2 px-3 py-2 text-left', g.items.length ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/30' : 'cursor-default']">
              <span v-if="g.items.length" class="w-2 h-2 rounded-full flex-shrink-0" :class="HEALTH_SEV[g.sev].dot"></span>
              <i v-else class="fas fa-circle-check text-emerald-500 text-xs flex-shrink-0"></i>
              <i :class="['fas', g.icon, 'text-slate-400 text-xs flex-shrink-0 w-4 text-center']"></i>
              <span class="flex-1 text-xs font-bold text-slate-700 dark:text-slate-200">{{ g.label }}</span>
              <span class="text-[10px] font-black px-2 py-0.5 rounded" :class="g.items.length ? HEALTH_SEV[g.sev].badge : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'">{{ g.items.length }}</span>
              <i v-if="g.items.length" :class="['fas text-[10px] text-slate-400', healthOpen[g.key] ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
            </button>
            <div v-if="g.items.length && healthOpen[g.key]" class="px-3 pb-2 border-t border-slate-100 dark:border-slate-700/50 pt-1.5 max-h-60 overflow-y-auto">
              <ul class="space-y-0.5">
                <li v-for="it in g.items" :key="it.id" class="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  <span class="font-bold text-slate-800 dark:text-white truncate">{{ it.nama }}</span>
                  <span class="text-slate-400 truncate">· {{ it.detail }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Kandidat duplikat fuzzy (nama mirip) -->
        <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <p class="text-xs font-black text-slate-700 dark:text-slate-200">
              <i class="fas fa-clone text-amber-500 mr-1"></i>Kandidat Nama Mirip
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ml-1" :class="totalFuzzy ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700'">{{ totalFuzzy }}</span>
            </p>
            <button v-if="totalFuzzy" @click="showFuzzy = !showFuzzy" class="text-[11px] font-bold text-amber-700 dark:text-amber-300 hover:underline">{{ showFuzzy ? 'Sembunyikan' : 'Lihat' }}</button>
          </div>
          <p class="text-[11px] text-slate-500 mt-1">Nama yang ditulis beda tapi mirip (gelar / spasi / ejaan, jarak edit), atau <b>tgl lahir sama</b>. <b>Tidak</b> memakai No. WA (wali bisa punya banyak anak). Auto-Migrate TIDAK menggabung ini — <b>centang record yang ORANG SAMA</b> lalu <b>Gabung yang dicentang</b> (sisanya rapikan via Edit/Hapus). Cek No. Induk &amp; tgl lahir dulu — pasangan bisa ternyata beda orang.</p>
          <div v-if="showFuzzy" class="mt-2 space-y-1.5">
            <div v-for="(grp, gi) in fuzzyDup" :key="gi" class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-2 text-[11px]">
              <div class="flex items-center justify-between gap-2 flex-wrap mb-1">
                <p class="font-bold text-amber-700 dark:text-amber-300 uppercase text-[9px]">{{ grp.kind }}<span v-if="grp.reason" class="normal-case text-amber-600 dark:text-amber-400"> · {{ grp.reason }}</span></p>
                <button
                  @click="gabungFuzzy(grp)"
                  :disabled="fuzzyMerging !== ''"
                  class="px-2 py-0.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-[10px] font-black rounded-md"
                  title="Gabung record yang dicentang ke yang terlengkap (keputusan manual, lewati guard identitas)"
                >
                  <i class="fas fa-code-merge mr-1"></i>{{ fuzzyMerging === fuzzyGrpKey(grp) ? 'Menggabung…' : 'Gabung yang dicentang' }}
                </button>
              </div>
              <ul class="space-y-0.5">
                <li v-for="it in grp.items" :key="it.id" class="flex items-start gap-1.5 text-slate-700 dark:text-slate-200">
                  <input type="checkbox" :checked="fuzzyChecked[it.id] !== false" @change="fuzzyChecked[it.id] = $event.target.checked" class="mt-0.5 accent-rose-600 cursor-pointer" />
                  <span><span class="font-bold">{{ it.nama }}</span> <span class="text-slate-400">· {{ it.detail }}</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Audit Log table -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <p class="text-sm font-black text-rose-700 dark:text-rose-300 mb-1">
          <i class="fas fa-stethoscope mr-1"></i>Audit Log &mdash; Aktivitas Sistem
        </p>
        <p class="text-xs text-slate-700 dark:text-slate-300 mb-3">
          Catatan perubahan data terbaru (50 terbaru). Read-only.
        </p>
        <div
          v-if="auditLogs.length === 0"
          class="text-center text-slate-400 italic text-xs py-10 bg-slate-50 dark:bg-slate-900 rounded-lg"
        >
          Belum ada log audit.
        </div>
        <div v-else class="max-h-[60vh] overflow-y-auto">
          <table class="w-full text-xs">
            <thead class="sticky top-0 bg-slate-100 dark:bg-slate-700">
              <tr>
                <th class="p-2 text-left font-black uppercase tracking-wider">Waktu</th>
                <th class="p-2 text-left font-black uppercase tracking-wider">User</th>
                <th class="p-2 text-left font-black uppercase tracking-wider">Aksi</th>
                <th class="p-2 text-left font-black uppercase tracking-wider">Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="log in auditLogs"
                :key="log.id"
                class="border-b border-slate-100 dark:border-slate-700"
              >
                <td class="p-2 font-mono text-[10px] text-slate-700 dark:text-slate-300">
                  {{ formatTanggal(log.timestamp) }}
                </td>
                <td class="p-2 font-bold text-slate-800 dark:text-white">
                  {{ auditUser(log) }}
                </td>
                <td class="p-2">
                  <span
                    class="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-200 px-2 py-0.5 rounded font-bold text-[10px]"
                    >{{ log.aksi || log.action || '-' }}</span
                  >
                </td>
                <td class="p-2 text-slate-600 dark:text-slate-300 text-[11px] max-w-md truncate">
                  {{ auditDetail(log) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
