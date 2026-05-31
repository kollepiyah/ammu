<script setup>
// v.72.8.0526 Master Data restructure ke 7 tabs match legacy
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
// v.21.12.0526: + subscribeDoc untuk master/jabatan
import { subscribeColl, subscribeDoc } from '@/services/firestore'
import { useToast } from '@/composables/useToast'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
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
// v.20.80.0526 M16: TPQ shift migration helper
import { scanTpqShiftMigration, runTpqShiftMigration } from '@/utils/tpqShift'
// v.21.10.0526: Migration utility — lembaga_refs + group hierarchy
import { scanV21_10Migration, runV21_10Migration } from '@/utils/v21_10_migration'
// v.21.70.0526: TK refactor migration (2 lembaga TK A/B → 1 lembaga TK + jenjang)
import { scanV21_70TkMigration, runV21_70TkMigration } from '@/utils/v21_70_tk_migration'
import { scanLembagaNormalize, runLembagaNormalize } from '@/utils/v88_lembaga_normalize'
import { useGuru } from '@/composables/useGuru'

const route = useRoute()
const router = useRouter()
const settings = useSettingsStore()

// v.20.79: M6 — Audit Log subscribe (50 latest)
const auditLogs = ref([])
let _unsubAudit = null
onMounted(() => {
  _unsubAudit = subscribeColl('audit_log', (rows) => {
    const sorted = [...(rows || [])]
      .sort((a, b) => {
        const ta = a.timestamp?.seconds || a.timestamp || 0
        const tb = b.timestamp?.seconds || b.timestamp || 0
        return tb - ta
      })
      .slice(0, 50)
    auditLogs.value = sorted
  })
})
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

const toast = useToast()
const { lembagaRaw } = useLembaga()
// v.20.80.0526 M16: TPQ shift migration state
const { santriRaw: santriRawForMigration } = useSantri()
// v.21.10.0526: Guru data untuk migration
const { guruRaw: guruRawForMigration } = useGuru()
const confirmDlg = useConfirm()

// v.21.10.0526: V21.10 Migration state (lembaga_refs + group hierarchy)
const v21MigScan = ref(null)
const v21MigRunning = ref(false)
const v21MigProgress = ref({ phase: '', i: 0, total: 0 })
const v21MigResult = ref(null)

function v21MigDryRun() {
  v21MigScan.value = scanV21_10Migration({
    santriList: santriRawForMigration.value || [],
    guruList: guruRawForMigration.value || [],
    lembagaList: lembagaRaw.value || []
  })
  v21MigResult.value = null
}

async function v21MigExecute() {
  if (!v21MigScan.value || v21MigScan.value.totalDocs === 0) {
    toast.warning('Jalankan Dry-Run dulu, atau tidak ada data untuk migrasi.')
    return
  }
  const ok = await confirmDlg({
    title: 'Migrasi v.21.10 Schema?',
    message: `${v21MigScan.value.santri.toMigrate} santri + ${v21MigScan.value.guru.toMigrate} guru + ${v21MigScan.value.lembaga.toMigrate} lembaga akan di-update dgn lembaga_refs[] + group/kepala_jabatan. Idempotent (skip kalau sudah punya). Field _migrated_v21_10_at akan ditambahkan.`,
    confirmText: 'Lanjutkan',
    danger: true
  })
  if (!ok) return
  v21MigRunning.value = true
  v21MigProgress.value = { phase: 'start', i: 0, total: v21MigScan.value.totalDocs }
  try {
    const result = await runV21_10Migration({
      santriList: santriRawForMigration.value || [],
      guruList: guruRawForMigration.value || [],
      lembagaList: lembagaRaw.value || [],
      onProgress: (p) => {
        v21MigProgress.value = p
      }
    })
    v21MigResult.value = result
    const totalOk = result.santri.ok + result.guru.ok + result.lembaga.ok
    const totalFail = result.santri.fail + result.guru.fail + result.lembaga.fail
    if (totalFail > 0) {
      toast.warning(`Migrasi selesai: ${totalOk} OK, ${totalFail} gagal. Cek errors.`)
    } else {
      toast.success(`Migrasi v.21.10 sukses: ${totalOk} dokumen ter-update`)
    }
    v21MigScan.value = scanV21_10Migration({
      santriList: santriRawForMigration.value || [],
      guruList: guruRawForMigration.value || [],
      lembagaList: lembagaRaw.value || []
    })
  } catch (e) {
    toast.error('Gagal migrasi: ' + (e.message || e))
  } finally {
    v21MigRunning.value = false
  }
}
// v.21.70.0526: TK Migration state (2 lembaga TK A/B → 1 lembaga TK)
const v21_70MigScan = ref(null)
const v21_70MigRunning = ref(false)
const v21_70MigProgress = ref({ phase: '', current: 0, total: 0, msg: '' })
const v21_70MigResult = ref(null)

function v21_70MigDryRun() {
  v21_70MigScan.value = scanV21_70TkMigration({
    santriList: santriRawForMigration.value || [],
    guruList: guruRawForMigration.value || [],
    lembagaList: lembagaRaw.value || []
  })
  v21_70MigResult.value = null
}

async function v21_70MigExecute() {
  if (!v21_70MigScan.value) {
    toast.warning('Jalankan Dry-Run dulu')
    return
  }
  const s = v21_70MigScan.value
  if (
    s.santriCount === 0 &&
    s.guruCount === 0 &&
    s.legacyLembagaDocs.length === 0 &&
    !s.needCreateCanonical
  ) {
    toast.info('Tidak ada data untuk dimigrasi (sudah migrated atau tidak ada TK A/B legacy)')
    return
  }
  const ok = await confirmDlg({
    title: 'Migrasi TK v.21.70?',
    message: `${s.santriCount} santri + ${s.guruCount} guru akan di-update: lembaga "TK A"/"TK B" → "TK" + kelas "TK A"/"TK B" sebagai jenjang. Legacy lembaga docs (${s.legacyLembagaDocs.join(', ') || 'none'}) akan dihapus. Idempotent. Field _migrated_v21_70_tk akan ditambahkan.`,
    confirmText: 'Lanjutkan',
    danger: true
  })
  if (!ok) return
  v21_70MigRunning.value = true
  v21_70MigProgress.value = {
    phase: 'start',
    current: 0,
    total: s.santriCount + s.guruCount + 1,
    msg: ''
  }
  try {
    const result = await runV21_70TkMigration({
      santriList: santriRawForMigration.value || [],
      guruList: guruRawForMigration.value || [],
      lembagaList: lembagaRaw.value || [],
      onProgress: (p) => {
        v21_70MigProgress.value = p
      }
    })
    v21_70MigResult.value = result
    toast.success(
      `Migrasi TK v.21.70 sukses: ${result.santriMigrated} santri + ${result.guruMigrated} guru ter-update`
    )
    v21_70MigScan.value = scanV21_70TkMigration({
      santriList: santriRawForMigration.value || [],
      guruList: guruRawForMigration.value || [],
      lembagaList: lembagaRaw.value || []
    })
  } catch (e) {
    toast.error('Gagal migrasi: ' + (e.message || e))
  } finally {
    v21_70MigRunning.value = false
  }
}

const tpqMigScan = ref(null) // { totalToMigrate, pagi, sore, examples, alreadyMigrated }
const tpqMigRunning = ref(false)
const tpqMigProgress = ref({ i: 0, total: 0 })
const tpqMigResult = ref(null)

function tpqMigDryRun() {
  tpqMigScan.value = scanTpqShiftMigration(santriRawForMigration.value || [])
  tpqMigResult.value = null
}

async function tpqMigExecute() {
  if (!tpqMigScan.value || tpqMigScan.value.totalToMigrate === 0) {
    toast.warning('Jalankan Dry-Run dulu, atau tidak ada data untuk migrasi.')
    return
  }
  const ok = await confirmDlg({
    title: 'Migrasi TPQ Shift?',
    message: `${tpqMigScan.value.totalToMigrate} santri akan di-update: lembaga "TPQ Pagi"/"TPQ Sore" → "TPQ" + field shift. Tidak bisa di-undo otomatis (data lama disimpan _migrated_tpq_shift_at).`,
    confirmText: 'Lanjutkan',
    danger: true
  })
  if (!ok) return
  tpqMigRunning.value = true
  tpqMigProgress.value = { i: 0, total: tpqMigScan.value.totalToMigrate }
  try {
    const result = await runTpqShiftMigration(santriRawForMigration.value || [], {
      onProgress: (i, total) => {
        tpqMigProgress.value = { i, total }
      }
    })
    tpqMigResult.value = result
    if (result.fail > 0) {
      toast.warning(`Migrasi selesai: ${result.ok} OK, ${result.fail} gagal`)
    } else {
      toast.success(`Migrasi sukses: ${result.ok} santri ter-update`)
    }
    // Refresh scan setelah execute
    tpqMigScan.value = scanTpqShiftMigration(santriRawForMigration.value || [])
  } catch (e) {
    toast.error('Gagal migrasi: ' + (e.message || e))
  } finally {
    tpqMigRunning.value = false
  }
}

// v.21.24.0526: Drop "Jabatan" tab — kyai req, pindah ke Kelola Lembaga (jabatan per-lembaga)
// v.88.0526: Normalisasi lembaga santri (TPQ+shift->Pagi/Sore, P3H->PPPH, PRA PTPT->Pra PTPT)
const lmbNormScan = ref(null)
const lmbNormRunning = ref(false)
const lmbNormProgress = ref({ i: 0, total: 0 })
const lmbNormResult = ref(null)

function lmbNormDryRun() {
  lmbNormScan.value = scanLembagaNormalize(santriRawForMigration.value || [])
  lmbNormResult.value = null
}

async function lmbNormExecute() {
  if (!lmbNormScan.value || lmbNormScan.value.total === 0) {
    toast.warning('Jalankan Dry-Run dulu, atau tidak ada data untuk migrasi.')
    return
  }
  const byT = Object.entries(lmbNormScan.value.byTarget).map(([k, v]) => `${v} -> ${k}`).join(', ')
  const ok = await confirmDlg({
    title: 'Normalisasi Lembaga Santri?',
    message: `${lmbNormScan.value.total} santri di-update: ${byT}. ${lmbNormScan.value.tpqNoShift} santri "TPQ" TANPA shift TIDAK diubah (assign manual). Idempotent (_migrated_lembaga_v88_at).`,
    confirmText: 'Lanjutkan',
    danger: true
  })
  if (!ok) return
  lmbNormRunning.value = true
  lmbNormProgress.value = { i: 0, total: lmbNormScan.value.total }
  try {
    const result = await runLembagaNormalize(santriRawForMigration.value || [], {
      onProgress: (i, total) => { lmbNormProgress.value = { i, total } }
    })
    lmbNormResult.value = result
    if (result.fail > 0) toast.warning(`Selesai: ${result.ok} OK, ${result.fail} gagal`)
    else toast.success(`Normalisasi sukses: ${result.ok} santri ter-update`)
    lmbNormScan.value = scanLembagaNormalize(santriRawForMigration.value || [])
  } catch (e) {
    toast.error('Gagal migrasi: ' + (e.message || e))
  } finally {
    lmbNormRunning.value = false
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
    <!-- v.21.14.0526: Tighter header -->
    <header
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

    <!-- v.21.14.0526: tabs flex-wrap (replace overflow-x-auto) supaya semua tab kelihatan, tidak cropped -->
    <div
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
              placeholder="Min"
              class="col-span-2 px-2 py-1.5 text-xs text-center border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            />
            <span class="col-span-1 text-center text-xs text-slate-500">-</span>
            <input
              v-model.number="p.max"
              type="number"
              placeholder="Max"
              class="col-span-2 px-2 py-1.5 text-xs text-center border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            />
            <input
              v-model="p.label"
              type="text"
              placeholder="Label"
              maxlength="3"
              class="col-span-2 px-2 py-1.5 text-xs text-center font-black border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            />
            <input
              v-model="p.desc"
              type="text"
              placeholder="Deskripsi (Mumtaz, Jayyid, dll)"
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
          placeholder="cth: 2025/2026"
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
      <!-- v.21.10.0526: Tools Migrasi v.21.10 Schema (lembaga_refs + group hierarchy) -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border-2 border-teal-300 dark:border-teal-700 shadow-sm"
      >
        <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div>
            <p class="text-sm font-black text-teal-700 dark:text-teal-300">
              <i class="fas fa-layer-group mr-1"></i>Migrasi v.21.10 Schema
            </p>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Derive <code class="bg-slate-100 px-1 rounded">lembaga_refs[]</code> untuk santri &
              guru, + <code class="bg-slate-100 px-1 rounded">group</code> &
              <code class="bg-slate-100 px-1 rounded">kepala_jabatan</code> per lembaga. Idempotent
              (skip kalau sudah ada).
            </p>
          </div>
          <span
            class="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded uppercase"
            >v.21.10</span
          >
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            @click="v21MigDryRun"
            :disabled="v21MigRunning"
            class="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black rounded-lg disabled:opacity-50"
          >
            <i class="fas fa-search mr-1"></i>Dry-Run (Scan)
          </button>
          <button
            @click="v21MigExecute"
            :disabled="v21MigRunning || !v21MigScan || v21MigScan.totalDocs === 0"
            class="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-database mr-1"></i>Execute Migrasi
          </button>
        </div>
        <div v-if="v21MigRunning" class="mt-3 text-xs font-bold text-teal-700">
          <i class="fas fa-spinner fa-spin mr-1"></i>{{ v21MigProgress.phase || 'Migrasi' }}...
          {{ v21MigProgress.i }}/{{ v21MigProgress.total }}
        </div>
        <div v-if="v21MigScan" class="mt-3 bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-xs">
          <p class="font-black text-slate-800 dark:text-white mb-2">
            <i class="fas fa-clipboard-list mr-1"></i>Hasil Scan:
          </p>
          <div class="grid grid-cols-3 gap-2">
            <div
              class="bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700"
            >
              <p class="text-[10px] text-slate-500 uppercase font-bold">Santri</p>
              <p class="text-xl font-black text-teal-700">
                {{ v21MigScan.santri.toMigrate }}/{{ v21MigScan.santri.total }}
              </p>
              <p class="text-[9px] text-slate-400">skip: {{ v21MigScan.santri.skipped }}</p>
            </div>
            <div
              class="bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700"
            >
              <p class="text-[10px] text-slate-500 uppercase font-bold">Guru</p>
              <p class="text-xl font-black text-cyan-700">
                {{ v21MigScan.guru.toMigrate }}/{{ v21MigScan.guru.total }}
              </p>
              <p class="text-[9px] text-slate-400">skip: {{ v21MigScan.guru.skipped }}</p>
            </div>
            <div
              class="bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700"
            >
              <p class="text-[10px] text-slate-500 uppercase font-bold">Lembaga</p>
              <p class="text-xl font-black text-emerald-700">
                {{ v21MigScan.lembaga.toMigrate }}/{{ v21MigScan.lembaga.total }}
              </p>
              <p class="text-[9px] text-slate-400">add group/kepala</p>
            </div>
          </div>
          <div v-if="v21MigScan.santri.examples.length > 0" class="mt-3">
            <p class="text-[10px] font-bold text-slate-600 uppercase">
              Santri sample ({{ v21MigScan.santri.examples.length }}):
            </p>
            <ul class="mt-1 space-y-1">
              <li
                v-for="ex in v21MigScan.santri.examples"
                :key="'s-' + ex.id"
                class="font-mono text-[10px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded px-2 py-1 border border-slate-200 dark:border-slate-700"
              >
                <span class="font-bold">{{ ex.nama }}</span
                >: <span class="text-emerald-600">{{ ex.refs.length }} refs</span> →
                <span class="text-slate-500">{{ ex.refs.map((r) => r.lembaga).join(' + ') }}</span>
              </li>
            </ul>
          </div>
          <div v-if="v21MigScan.guru.examples.length > 0" class="mt-2">
            <p class="text-[10px] font-bold text-slate-600 uppercase">
              Guru sample ({{ v21MigScan.guru.examples.length }}):
            </p>
            <ul class="mt-1 space-y-1">
              <li
                v-for="ex in v21MigScan.guru.examples"
                :key="'g-' + ex.id"
                class="font-mono text-[10px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded px-2 py-1 border border-slate-200 dark:border-slate-700"
              >
                <span class="font-bold">{{ ex.nama }}</span
                >: <span class="text-emerald-600">{{ ex.refs.length }} refs</span> →
                <span class="text-slate-500">{{
                  ex.refs
                    .map((r) => r.lembaga + ' (' + (r.jabatan_di_sini || '-') + ')')
                    .join(' + ')
                }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          v-if="v21MigResult"
          class="mt-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3 text-xs"
        >
          <p class="font-black text-emerald-800 dark:text-emerald-200">
            <i class="fas fa-check-circle mr-1"></i>Migrasi v.21.10 selesai
          </p>
          <div class="grid grid-cols-3 gap-2 mt-2">
            <div class="bg-white rounded p-2">
              <p class="text-[10px] text-slate-500 uppercase font-bold">Santri</p>
              <p class="font-black text-emerald-700">
                OK: {{ v21MigResult.santri.ok }}
                <span class="text-rose-600 text-[10px]">FAIL: {{ v21MigResult.santri.fail }}</span>
              </p>
            </div>
            <div class="bg-white rounded p-2">
              <p class="text-[10px] text-slate-500 uppercase font-bold">Guru</p>
              <p class="font-black text-emerald-700">
                OK: {{ v21MigResult.guru.ok }}
                <span class="text-rose-600 text-[10px]">FAIL: {{ v21MigResult.guru.fail }}</span>
              </p>
            </div>
            <div class="bg-white rounded p-2">
              <p class="text-[10px] text-slate-500 uppercase font-bold">Lembaga</p>
              <p class="font-black text-emerald-700">
                OK: {{ v21MigResult.lembaga.ok }}
                <span class="text-rose-600 text-[10px]">FAIL: {{ v21MigResult.lembaga.fail }}</span>
              </p>
            </div>
          </div>
          <div
            v-if="v21MigResult.errors.length > 0"
            class="mt-2 bg-rose-50 border border-rose-200 rounded p-2"
          >
            <p class="text-[10px] font-bold text-rose-800">
              Errors ({{ v21MigResult.errors.length }}):
            </p>
            <ul class="mt-1 space-y-0.5 max-h-32 overflow-y-auto">
              <li
                v-for="(e, i) in v21MigResult.errors.slice(0, 10)"
                :key="i"
                class="text-[9px] font-mono text-rose-700"
              >
                {{ e }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- v.21.70.0526: Tools Migrasi TK Refactor (2 lembaga TK A/B → 1 lembaga TK) -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border-2 border-cyan-300 dark:border-cyan-700 shadow-sm"
      >
        <div class="flex items-center justify-between mb-3">
          <div>
            <p class="text-sm font-black text-cyan-700 dark:text-cyan-300">
              <i class="fas fa-school mr-1"></i>Migrasi TK Refactor
            </p>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Gabung lembaga <b>TK A</b> + <b>TK B</b> jadi 1 lembaga <b>TK</b> dengan
              <code class="bg-slate-100 px-1 rounded">kelas: ['TK A', 'TK B']</code> sebagai jenjang
              (analog Kelas I-VI di SDI). Idempotent.
            </p>
          </div>
          <span
            class="text-[10px] bg-cyan-100 text-cyan-800 font-bold px-2 py-0.5 rounded uppercase"
            >v.21.70</span
          >
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            @click="v21_70MigDryRun"
            :disabled="v21_70MigRunning"
            class="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black rounded-lg disabled:opacity-50"
          >
            <i class="fas fa-search mr-1"></i>Dry-Run (Scan)
          </button>
          <button
            @click="v21_70MigExecute"
            :disabled="v21_70MigRunning || !v21_70MigScan"
            class="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-database mr-1"></i>Execute Migrasi
          </button>
        </div>
        <div v-if="v21_70MigRunning" class="mt-3 text-xs font-bold text-cyan-700">
          <i class="fas fa-spinner fa-spin mr-1"></i>{{ v21_70MigProgress.phase }}...
          {{ v21_70MigProgress.current }}/{{ v21_70MigProgress.total }}
        </div>
        <div v-if="v21_70MigScan" class="mt-3 bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-xs">
          <p class="font-black text-slate-800 dark:text-white mb-2">
            <i class="fas fa-clipboard-list mr-1"></i>Hasil Scan:
          </p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div
              class="bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700"
            >
              <p class="text-[10px] text-slate-500 uppercase font-bold">Santri TK A/B</p>
              <p class="text-xl font-black text-cyan-700">{{ v21_70MigScan.santriCount }}</p>
            </div>
            <div
              class="bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700"
            >
              <p class="text-[10px] text-slate-500 uppercase font-bold">Guru TK A/B</p>
              <p class="text-xl font-black text-cyan-700">{{ v21_70MigScan.guruCount }}</p>
            </div>
            <div
              class="bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700"
            >
              <p class="text-[10px] text-slate-500 uppercase font-bold">Legacy Docs</p>
              <p class="text-xl font-black text-rose-700">
                {{ v21_70MigScan.legacyLembagaDocs.length }}
              </p>
              <p class="text-[9px] text-slate-400">
                {{ v21_70MigScan.legacyLembagaDocs.join(', ') || '-' }}
              </p>
            </div>
            <div
              class="bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700"
            >
              <p class="text-[10px] text-slate-500 uppercase font-bold">Create Canonical</p>
              <p class="text-xl font-black text-emerald-700">
                {{ v21_70MigScan.needCreateCanonical ? 'YA' : 'tidak' }}
              </p>
            </div>
          </div>
          <div
            v-if="v21_70MigScan.santriPreview && v21_70MigScan.santriPreview.length > 0"
            class="mt-3"
          >
            <p class="text-[10px] font-bold text-slate-600 uppercase">
              Santri sample ({{ v21_70MigScan.santriPreview.length }}):
            </p>
            <ul class="mt-1 space-y-1">
              <li
                v-for="(ex, i) in v21_70MigScan.santriPreview"
                :key="'tk-s-' + i"
                class="font-mono text-[10px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded px-2 py-1 border border-slate-200 dark:border-slate-700"
              >
                <span class="font-bold">{{ ex.before.nama }}</span
                >:
                <span class="text-rose-600">{{ ex.before.lembaga }}</span>
                →
                <span class="text-emerald-600"
                  >{{ ex.after.lembaga }} (kelas: {{ ex.after.kelas }})</span
                >
              </li>
            </ul>
          </div>
        </div>
        <div
          v-if="v21_70MigResult"
          class="mt-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3 text-xs"
        >
          <p class="font-black text-emerald-800 dark:text-emerald-200">
            <i class="fas fa-check-circle mr-1"></i>Migrasi TK v.21.70 selesai
          </p>
          <div class="grid grid-cols-2 gap-2 mt-2">
            <div class="bg-white rounded p-2">
              <p class="text-[10px] text-slate-500 uppercase font-bold">Santri Migrated</p>
              <p class="font-black text-emerald-700">{{ v21_70MigResult.santriMigrated }}</p>
            </div>
            <div class="bg-white rounded p-2">
              <p class="text-[10px] text-slate-500 uppercase font-bold">Guru Migrated</p>
              <p class="font-black text-emerald-700">{{ v21_70MigResult.guruMigrated }}</p>
            </div>
          </div>
          <details v-if="v21_70MigResult.log && v21_70MigResult.log.length > 0" class="mt-2">
            <summary class="text-[10px] cursor-pointer text-slate-600">
              Log ({{ v21_70MigResult.log.length }})
            </summary>
            <ul class="mt-1 space-y-0.5 max-h-32 overflow-y-auto">
              <li
                v-for="(l, i) in v21_70MigResult.log"
                :key="i"
                class="text-[9px] font-mono text-slate-700"
              >
                {{ l }}
              </li>
            </ul>
          </details>
        </div>
      </div>

      <!-- v.88.0526: Normalisasi Lembaga Santri -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border-2 border-emerald-300 dark:border-emerald-700 shadow-sm"
      >
        <div class="flex items-center justify-between mb-3">
          <div>
            <p class="text-sm font-black text-emerald-700 dark:text-emerald-300">
              <i class="fas fa-wand-magic-sparkles mr-1"></i>Normalisasi Lembaga Santri
            </p>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Samakan label lama ke canonical: <b>TPQ</b>+shift &rarr; <b>TPQ Pagi/Sore</b>,
              <b>P3H</b> &rarr; <b>PPPH</b>, <b>PRA PTPT</b> &rarr; <b>Pra PTPT</b>.
              Santri "TPQ" tanpa shift dilewati (assign manual). Idempotent.
            </p>
          </div>
          <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">v.88</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            @click="lmbNormDryRun"
            :disabled="lmbNormRunning"
            class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-lg disabled:opacity-50"
          >
            <i class="fas fa-search mr-1"></i>Dry-Run (Scan)
          </button>
          <button
            @click="lmbNormExecute"
            :disabled="lmbNormRunning || !lmbNormScan || lmbNormScan.total === 0"
            class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-database mr-1"></i>Execute Migrasi
          </button>
        </div>
        <div v-if="lmbNormRunning" class="mt-3 text-xs font-bold text-emerald-700">
          <i class="fas fa-spinner fa-spin mr-1"></i>{{ lmbNormProgress.i }}/{{ lmbNormProgress.total }}
        </div>
        <div v-if="lmbNormScan" class="mt-3 bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-xs">
          <p class="font-black text-slate-800 dark:text-white mb-2">
            <i class="fas fa-clipboard-list mr-1"></i>Scan: {{ lmbNormScan.total }} akan dimigrasi
            <span v-if="lmbNormScan.tpqNoShift > 0" class="text-rose-600">&middot; {{ lmbNormScan.tpqNoShift }} TPQ tanpa shift (manual)</span>
          </p>
          <ul class="space-y-1">
            <li
              v-for="(ex, i) in lmbNormScan.examples"
              :key="'ln-' + i"
              class="font-mono text-[10px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded px-2 py-1 border border-slate-200 dark:border-slate-700"
            >
              <span class="font-bold">{{ ex.nama }}</span>: <span class="text-rose-600">{{ ex.before }}</span> &rarr; <span class="text-emerald-600">{{ ex.after }}</span>
            </li>
          </ul>
        </div>
        <div
          v-if="lmbNormResult"
          class="mt-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 rounded-lg p-3 text-xs font-bold text-emerald-800 dark:text-emerald-200"
        >
          <i class="fas fa-check-circle mr-1"></i>Selesai: {{ lmbNormResult.ok }} OK, {{ lmbNormResult.fail }} gagal
        </div>
      </div>

      <!-- v.20.80.0526 M16: Tools Migrasi TPQ Shift -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border-2 border-cyan-300 dark:border-cyan-700 shadow-sm"
      >
        <div class="flex items-center justify-between mb-3">
          <div>
            <p class="text-sm font-black text-cyan-700 dark:text-cyan-300">
              <i class="fas fa-tools mr-1"></i>Migrasi TPQ Shift
            </p>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Gabung santri <b>TPQ Pagi</b> + <b>TPQ Sore</b> jadi 1 lembaga <b>TPQ</b> dengan field
              <code class="bg-slate-100 px-1 rounded">shift: 'Pagi'/'Sore'</code>.
            </p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            @click="tpqMigDryRun"
            :disabled="tpqMigRunning"
            class="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black rounded-lg disabled:opacity-50"
          >
            <i class="fas fa-search mr-1"></i>Dry-Run (Scan)
          </button>
          <button
            @click="tpqMigExecute"
            :disabled="tpqMigRunning || !tpqMigScan || tpqMigScan.totalToMigrate === 0"
            class="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-database mr-1"></i>Execute Migrasi
          </button>
        </div>
        <div v-if="tpqMigRunning" class="mt-3 text-xs font-bold text-cyan-700">
          <i class="fas fa-spinner fa-spin mr-1"></i>Migrasi berjalan... {{ tpqMigProgress.i }}/{{
            tpqMigProgress.total
          }}
        </div>
        <div v-if="tpqMigScan" class="mt-3 bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-xs">
          <p class="font-black text-slate-800 dark:text-white mb-2">
            <i class="fas fa-clipboard-list mr-1"></i>Hasil Scan:
          </p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div
              class="bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700"
            >
              <p class="text-[10px] text-slate-500 uppercase font-bold">Akan Dimigrasi</p>
              <p class="text-xl font-black text-rose-700">{{ tpqMigScan.totalToMigrate }}</p>
            </div>
            <div
              class="bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700"
            >
              <p class="text-[10px] text-slate-500 uppercase font-bold">TPQ Pagi</p>
              <p class="text-xl font-black text-cyan-700">{{ tpqMigScan.pagi }}</p>
            </div>
            <div
              class="bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700"
            >
              <p class="text-[10px] text-slate-500 uppercase font-bold">TPQ Sore</p>
              <p class="text-xl font-black text-teal-700">{{ tpqMigScan.sore }}</p>
            </div>
            <div
              class="bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700"
            >
              <p class="text-[10px] text-slate-500 uppercase font-bold">Sudah Migrate</p>
              <p class="text-xl font-black text-emerald-700">{{ tpqMigScan.alreadyMigrated }}</p>
            </div>
          </div>
          <div v-if="tpqMigScan.examples.length > 0" class="mt-3">
            <p class="text-[10px] font-bold text-slate-600 uppercase">
              Contoh ({{ tpqMigScan.examples.length }}):
            </p>
            <ul class="mt-1 space-y-1">
              <li
                v-for="ex in tpqMigScan.examples"
                :key="ex.id"
                class="font-mono text-[10px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded px-2 py-1 border border-slate-200 dark:border-slate-700"
              >
                <span class="font-bold">{{ ex.nama }}</span
                >:
                <span class="text-rose-600">{{ ex.before.lembaga }}</span>
                &rarr; <span class="text-emerald-600">{{ ex.after.lembaga }}</span> + shift=<b>{{
                  ex.after.shift
                }}</b>
              </li>
            </ul>
          </div>
        </div>
        <div
          v-if="tpqMigResult"
          class="mt-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3 text-xs"
        >
          <p class="font-black text-emerald-800 dark:text-emerald-200">
            <i class="fas fa-check-circle mr-1"></i>Selesai: {{ tpqMigResult.ok }} OK,
            {{ tpqMigResult.fail }} gagal (total {{ tpqMigResult.total }})
          </p>
          <p
            v-if="tpqMigResult.errors && tpqMigResult.errors.length > 0"
            class="text-rose-700 mt-1 text-[10px]"
          >
            Errors: {{ tpqMigResult.errors.length }} (cek console untuk detail)
          </p>
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
                  {{ log.user_nama || log.user || '-' }}
                </td>
                <td class="p-2">
                  <span
                    class="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-200 px-2 py-0.5 rounded font-bold text-[10px]"
                    >{{ log.aksi || log.action || '-' }}</span
                  >
                </td>
                <td class="p-2 text-slate-600 dark:text-slate-300 text-[11px] max-w-md truncate">
                  {{ log.detail || log.keterangan || '-' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
