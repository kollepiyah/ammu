<script setup>
// v.71.0526 — Pengaturan Web full match legacy
// Sections: Identitas, KOP, Logo (4 jenis), BG, Hijri, Master Kegiatan, Admin pwd,
// Theme, Submenu Formal & Qiraati per-lembaga, Mode Capacitor, Channel, Notif
// Save dual-doc: settings/general (legacy source of truth) + settings/web (Vue PoC)
import { ref, computed, onMounted, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useLembaga } from '@/composables/useLembaga'
import { setOne } from '@/services/firestore'
import { uploadBase64 } from '@/services/storage'
import UiCard from '@/components/ui/UiCard.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { ArrowLeft, Save, RotateCcw, Plus, Trash2, Image as ImageIcon } from 'lucide-vue-next'

const router = useRouter()
const settings = useSettingsStore()
const toast = useToast()
const confirm = useConfirm()
const { lembagaRaw } = useLembaga()

// ===== Form state (mirror legacy savedSettings shape) =====
const form = ref(buildDefaultForm())

function buildDefaultForm() {
  return {
    // Identitas
    txtAppName: '',
    txtAppDesc: '',
    txtSidebarTitle: '',
    txtHeaderBar: 'Ammu Online',
    txtPeriode: '',
    txtWelcome: 'Ahlan',
    alamat: '',
    noTelp: '',
    namaChannel: 'Al Manshur Channel',
    // KOP
    kopLine1: '',
    kopLine2: '',
    kopLine3: '',
    kopLine4: '',
    // Logo
    logoUrl: '',
    logoKop: '',
    logoQiraati: '',
    bgImage: '',
    // v.20.21.0526: BG rapor TPQ/Diniyah (watermark) match legacy
    bgRaporTPQ: '',
    bgRaporDiniyah: '',
    // v.20.24.0526: TTD pindah ke Pengaturan Profil per-guru (kyai req). namaPengasuh tetap di sini sebagai global label.
    namaPengasuh: '',
    // v.20.24.0526: Schema rekap Diniyah (array mapel) + Pengaturan Postingan
    rekapSchemaDiniyah: ['Aqidah Akhlak', 'Fiqh', 'Tarikh', 'Bahasa Arab'],
    // v.20.73.0526: per-kelas override (kalau kelas tidak ada di map, fallback ke rekapSchemaDiniyah)
    rekapSchemaDiniyahPerKelas: {},
    postinganHanyaAdmin: false,
    postinganAutoApprove: true,
    postinganMaxImages: 5,
    postinganMaxSizeKb: 500,
    // v.20.27.0526: Schema rapor per-lembaga (perLevel/perKelas/sections) — JSON-stored
    raporSchemas: {},
    predikatRules: [
      { min: 85, max: 100, label: 'A' },
      { min: 70, max: 84, label: 'B' },
      { min: 55, max: 69, label: 'C' },
      { min: 0, max: 54, label: 'D' }
    ],
    // Theme
    themeColor: '#0f766e',
    themeTextColor: '#1e293b',
    sidebarBgColor: '#0f172a',
    // Kalibrasi
    kalibrasiHijri: 0,
    // Master Kegiatan
    masterKegiatan: [],
    // Admin
    adminUsername: 'adminmu',
    adminPassword: '1234',
    // Feature toggles
    fiturBeranda: true,
    fiturKalender: true,
    fiturKritikSaran: true,
    fiturNotifikasi: true,
    autoNotifPostingan: true,
    softDelete: false,
    capacitorMode: 'remote',
    // Submenu per-lembaga
    submenuFormal: {},
    submenuQiraati: {},
    // v.20.62.0526: Jam Shift Pagi/Sore/Sekolah + cutoff terlambat
    shiftPagiMulai: '06:00',
    shiftPagiSelesai: '12:00',
    shiftPagiTerlambat: '06:15',
    shiftSoreMulai: '14:00',
    shiftSoreSelesai: '17:00',
    shiftSoreTerlambat: '14:15',
    shiftSekolahMulai: '07:00',
    shiftSekolahSelesai: '13:00',
    shiftSekolahTerlambat: '07:15',
    printerNama: '',
    printerKertas: 'A4',
    printerOrientasi: 'portrait',
    printerMarginMM: 10,
    printerAutoPrint: false
  }
}

const isDirty = ref(false)
const isSaving = ref(false)
const adminPwdNew = ref('')
const adminPwdConfirm = ref('')

function syncFormFromStore() {
  const s = settings.settings || {}
  form.value = {
    ...buildDefaultForm(),
    ...Object.fromEntries(
      Object.keys(buildDefaultForm()).map((k) => [k, s[k] ?? buildDefaultForm()[k]])
    )
  }
  if (!Array.isArray(form.value.masterKegiatan)) form.value.masterKegiatan = []
  if (!form.value.submenuFormal || typeof form.value.submenuFormal !== 'object') form.value.submenuFormal = {}
  if (!form.value.submenuQiraati || typeof form.value.submenuQiraati !== 'object') form.value.submenuQiraati = {}
  isDirty.value = false
}

// v.20.36.0526: import useRoute biar bisa auto-activate section dari query
import { useRoute as _useRouteForRapor } from 'vue-router'
const _routeRapor = _useRouteForRapor()

onMounted(async () => {
  // v.20.74.5.0526: BUGFIX — SELALU reload dari Firestore (sebelumnya skip karena DEFAULT.txtAppName='Ammu Online'
  // jadi truthy → load() gak dipanggil → form pakai DEFAULT kosong → logo upload terlihat 'hilang' saat refresh)
  await settings.load()
  // Subscribe live update supaya kalau admin lain edit, ke-sync otomatis
  settings.subscribe()
  syncFormFromStore()
  // v.20.36.0526: auto-activate section + lembaga dari query (?section=raporSchema&lembaga=Pra PTPT)
  const qs = _routeRapor.query.section
  if (qs && typeof qs === 'string') activeSection.value = qs
  const ql = _routeRapor.query.lembaga
  if (ql && typeof ql === 'string') raporSchemaLembaga.value = ql
})

watch(
  () => settings.settings,
  () => {
    if (!isDirty.value) syncFormFromStore()
  },
  { deep: true }
)

let firstRun = true
watchEffect(() => {
  const _ = JSON.stringify(form.value)
  if (firstRun) {
    firstRun = false
    return
  }
  isDirty.value = true
})

// ===== Hijri preview =====
const NAMA_BULAN_HIJRI = [
  'Muharram','Shafar','Rabiul Awal','Rabiul Akhir','Jumadil Awal','Jumadil Akhir',
  'Rajab','Sya\'ban','Ramadhan','Syawal','Dzulqaidah','Dzulhijjah'
]

function masehiKeHijri(date, offset = 0) {
  const d = new Date(date.getTime() + offset * 86400000)
  const jd = Math.floor(d.getTime() / 86400000) + 2440588
  const l = jd - 1948440 + 10632
  const n = Math.floor((l - 1) / 10631)
  const l2 = l - 10631 * n + 354
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
    Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238)
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29
  const month = Math.floor((24 * l3) / 709)
  const day = l3 - Math.floor((709 * month) / 24)
  const year = 30 * n + j - 30
  return { day, month, year }
}

const hijriPreview = computed(() => {
  try {
    const h = masehiKeHijri(new Date(), Number(form.value.kalibrasiHijri || 0))
    return `${h.day} ${NAMA_BULAN_HIJRI[h.month - 1] || '?'} ${h.year} H`
  } catch {
    return '—'
  }
})

// ===== Master Kegiatan handlers =====
function addKegiatan() {
  form.value.masterKegiatan.push({
    id: 'keg_' + Date.now(),
    nama: '',
    jam_mulai: '06:00',
    jam_terlambat: '06:15',
    range_start: '04:00',
    range_end: '08:00',
    skor: 10,
    hari: [0, 1, 2, 3, 4, 5, 6]
  })
}

async function removeKegiatan(idx) {
  const ok = await confirm({
    title: 'Hapus kegiatan?',
    message: `Hapus "${form.value.masterKegiatan[idx]?.nama || 'item'}" dari master?`,
    danger: true
  })
  if (!ok) return
  form.value.masterKegiatan.splice(idx, 1)
}

// ===== Per-lembaga submenu helpers =====
// v.20.54.0526: kyai bug — pakai l.lembaga (Vue field) + cek tipe + tipe_lembaga, supaya filter match real data
function _lembagaName(l) { return String(l?.lembaga || l?.nama || '').trim() }
function _lembagaTipe(l) { return String(l?.tipe || l?.tipe_lembaga || '').toLowerCase().trim() }
const QIRAATI_NAMES = ['tpq', 'tpq pagi', 'tpq sore', 'pra ptpt', 'ptpt', 'ppph', 'p3h']
// v.20.77.0526: NON_LEMBAGA exclusion (Yayasan, SARANA & PRASARANA, dll) — jangan tampil di section per-lembaga
const NON_LEMBAGA_TIPE_EXCLUDE = ['non-lembaga', 'non_lembaga', 'non lembaga', 'yayasan', 'pondok', 'kantor', 'admin', 'divisi', 'unit']
const NON_LEMBAGA_NAMA_REGEX = /^(yayasan|pondok pesantren|pondok|kantor|admin|sarana|sarana\s*&\s*prasarana|prasarana)/i

const lembagaFormalList = computed(() =>
  lembagaRaw.value
    .filter((l) => {
      const nm = _lembagaName(l)
      const tp = _lembagaTipe(l)
      // v.20.77: exclude non-lembaga (Yayasan/SARANA/dll) — bukan tempat KBM
      if (NON_LEMBAGA_TIPE_EXCLUDE.includes(tp)) return false
      if (NON_LEMBAGA_NAMA_REGEX.test(nm)) return false
      // Eksplisit formal / sekolah / diniyah
      if (['formal', 'sekolah', 'diniyah', 'sd', 'smp', 'sma', 'mi', 'mts', 'ma', 'pkbm'].includes(tp)) return true
      if (/formal|MI|MTs|MA|SD|SMP|SMA|PKBM/i.test(nm)) return true
      // Fallback: kalau tipe kosong & bukan Qiraati, anggap formal
      if (!tp && !QIRAATI_NAMES.includes(nm.toLowerCase())) return true
      return false
    })
    .map((l) => ({ id: l.id || _lembagaName(l), nama: _lembagaName(l) }))
)
const lembagaQiraatiList = computed(() =>
  lembagaRaw.value
    .filter((l) => {
      const nm = _lembagaName(l).toLowerCase()
      const tp = _lembagaTipe(l)
      return tp === 'qiraati' || tp === 'tahfizh' || QIRAATI_NAMES.includes(nm)
    })
    .map((l) => ({ id: l.id || _lembagaName(l), nama: _lembagaName(l) }))
)

function ensureSubmenuFormal(namaLembaga) {
  if (!form.value.submenuFormal[namaLembaga]) {
    form.value.submenuFormal[namaLembaga] = {
      kopLine1: '', kopLine2: '', kopLine3: '', kopLine4: '',
      logoSekolah: '', tarifSPP: 0
    }
  }
  return form.value.submenuFormal[namaLembaga]
}
function ensureSubmenuQiraati(namaLembaga) {
  if (!form.value.submenuQiraati[namaLembaga]) {
    form.value.submenuQiraati[namaLembaga] = {
      targetKelas: '', formatRekap: 'standard'
    }
  }
  return form.value.submenuQiraati[namaLembaga]
}

// ===== Upload handlers =====
const uploadingField = ref('')

async function handleFileUpload(event, fieldName, folder = 'app_logos') {
  const file = event.target.files?.[0]
  if (!file) return
  if (file.size > 5 * 1024 * 1024) {
    toast.error('File terlalu besar (maks 5MB)')
    return
  }
  uploadingField.value = fieldName
  try {
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const url = await uploadBase64(`${folder}/${Date.now()}_${file.name}`, reader.result, file.type)
        setNested(form.value, fieldName, url)
        toast.success('Upload berhasil')
        isDirty.value = true
      } catch (e) {
        toast.error('Upload gagal: ' + (e.message || e))
      } finally {
        uploadingField.value = ''
      }
    }
    reader.onerror = () => {
      toast.error('Gagal baca file')
      uploadingField.value = ''
    }
    reader.readAsDataURL(file)
  } catch (e) {
    toast.error('Error: ' + (e.message || e))
    uploadingField.value = ''
  }
  event.target.value = ''
}

function setNested(obj, path, value) {
  const parts = path.split('.')
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]]) cur[parts[i]] = {}
    cur = cur[parts[i]]
  }
  cur[parts[parts.length - 1]] = value
}

// ===== Admin password change =====
async function changeAdminPassword() {
  if (!adminPwdNew.value || adminPwdNew.value.length < 4) {
    toast.error('Password minimal 4 karakter')
    return
  }
  if (adminPwdNew.value !== adminPwdConfirm.value) {
    toast.error('Konfirmasi password tidak cocok')
    return
  }
  const ok = await confirm({
    title: 'Ganti password admin?',
    message: 'Password admin built-in akan diganti permanen.',
    danger: true
  })
  if (!ok) return
  form.value.adminPassword = adminPwdNew.value
  adminPwdNew.value = ''
  adminPwdConfirm.value = ''
  toast.info('Password siap disimpan — klik Simpan untuk apply')
  isDirty.value = true
}

// ===== Save (dual-doc) =====
async function handleSave() {
  if (!form.value.txtAppName.trim()) {
    toast.error('Nama aplikasi wajib diisi')
    return
  }
  isSaving.value = true
  try {
    const payload = { ...form.value }
    await Promise.all([
      setOne('settings', 'general', payload),
      setOne('settings', 'web', payload)
    ])
    Object.assign(settings.settings, payload)
    toast.success('Pengaturan tersimpan ke kedua doc')
    isDirty.value = false
  } catch (e) {
    toast.error('Gagal simpan: ' + (e.message || String(e)))
  } finally {
    isSaving.value = false
  }
}

async function handleReset() {
  const ok = await confirm({
    title: 'Reset perubahan?',
    message: 'Semua perubahan yang belum disimpan akan hilang.',
    confirmText: 'Reset'
  })
  if (!ok) return
  syncFormFromStore()
  toast.info('Form direset')
}

async function handleBack() {
  if (isDirty.value) {
    const ok = await confirm({
      title: 'Tinggalkan halaman?',
      message: 'Ada perubahan yang belum disimpan. Yakin keluar?',
      confirmText: 'Keluar',
      danger: true
    })
    if (!ok) return
  }
  router.push('/dashboard')
}

// v.20.27.0526: Schema Rapor per-lembaga editor state + helpers
const raporSchemaLembaga = ref('')
const fieldNilaiBaru = ref('')

function getSchemaType() {
  const lname = raporSchemaLembaga.value
  if (!lname) return 'sections'
  const sch = form.value.raporSchemas[lname]
  if (!sch || Object.keys(sch).length === 0) return 'sections'
  if (sch.perLevel) return 'perLevel'
  if (sch.perKelas) return 'perKelas'
  if (Array.isArray(sch.sections)) return 'sections'
  return 'kosong'
}

function changeSchemaType(newType) {
  const lname = raporSchemaLembaga.value
  if (!lname) return
  if (!form.value.raporSchemas[lname]) form.value.raporSchemas[lname] = {}
  if (newType === 'perLevel') {
    form.value.raporSchemas[lname] = {
      perLevel: true,
      fieldsNilai: [
        { id: 'fashohah', label: 'Fashohah' },
        { id: 'tartil', label: 'Tartil' },
        { id: 'adab', label: 'Adab' }
      ],
      levels: [
        { id: 'lvl_1', label: 'Level 1', levelBaca: '½ Juz', targetKhotam: '½ Juz', khotamList: [
          { id: 'khotam_I', labelKhotam: 'Khotam I', multiplier: 2 },
          { id: 'khotam_II', labelKhotam: 'Khotam II', multiplier: 2 },
          { id: 'khotam_III', labelKhotam: 'Khotam III', multiplier: 2 }
        ]}
      ]
    }
  } else if (newType === 'perKelas') {
    form.value.raporSchemas[lname] = {
      perKelas: true,
      jenjang: [
        { kelas: 'I', mapel: [
          { id: 'tauhid', nama: 'TAUHID', kkm: 80 },
          { id: 'fiqih', nama: 'FIQIH', kkm: 80 },
          { id: 'akhlaq', nama: 'AKHLAQ', kkm: 80 }
        ]}
      ]
    }
  } else if (newType === 'sections') {
    form.value.raporSchemas[lname] = {
      sections: [
        { id: 'jilid', title: 'Jilid', rows: ['1A', '1B', '2A', '2B'], fields: [
          { id: 'adab', label: 'Adab', type: 'number' },
          { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'adab' }
        ]}
      ]
    }
  } else {
    form.value.raporSchemas[lname] = { sections: [] }
  }
}

function addFieldNilai() {
  const lname = raporSchemaLembaga.value
  const v = fieldNilaiBaru.value.trim()
  if (!lname || !v) return
  const sch = form.value.raporSchemas[lname]
  if (!sch || !sch.perLevel) return
  if (!Array.isArray(sch.fieldsNilai)) sch.fieldsNilai = []
  const id = v.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
  if (sch.fieldsNilai.find((f) => f.id === id)) {
    toast.warning('Field sudah ada')
    return
  }
  sch.fieldsNilai.push({ id, label: v })
  fieldNilaiBaru.value = ''
}
function removeFieldNilai(idx) {
  const lname = raporSchemaLembaga.value
  const sch = form.value.raporSchemas[lname]
  if (!sch?.fieldsNilai) return
  sch.fieldsNilai.splice(idx, 1)
}

// v.20.34.0526: Tambah khotam ke level tertentu (detail editor kyai req)
function addKhotamToLevel(lvl) {
  if (!Array.isArray(lvl.khotamList)) lvl.khotamList = []
  const RM = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII']
  const next = lvl.khotamList.length
  const label = next < RM.length ? `Khotam ${RM[next]}` : `Khotam ${next + 1}`
  const id = `kh_${RM[next] || (next + 1)}`
  // Inherit multiplier dari khotam terakhir, default 2
  const lastMult = lvl.khotamList.length > 0 ? (lvl.khotamList[lvl.khotamList.length - 1].multiplier || 2) : 2
  lvl.khotamList.push({ id, labelKhotam: label, multiplier: lastMult })
}

function addPraLevel() {
  const lname = raporSchemaLembaga.value
  const sch = form.value.raporSchemas[lname]
  if (!sch || !sch.perLevel) return
  if (!Array.isArray(sch.levels)) sch.levels = []
  const next = sch.levels.length + 1
  sch.levels.push({
    id: `lvl_${next}`,
    label: `Level ${next}`,
    levelBaca: `${next} Juz`,
    targetKhotam: `${next} Juz`,
    khotamList: [
      { id: `khotam_I_${next}`, labelKhotam: 'Khotam I', multiplier: 2 },
      { id: `khotam_II_${next}`, labelKhotam: 'Khotam II', multiplier: 2 },
      { id: `khotam_III_${next}`, labelKhotam: 'Khotam III', multiplier: 2 }
    ]
  })
}

function addDiniyahJenjang() {
  const lname = raporSchemaLembaga.value
  const sch = form.value.raporSchemas[lname]
  if (!sch || !sch.perKelas) return
  if (!Array.isArray(sch.jenjang)) sch.jenjang = []
  sch.jenjang.push({
    kelas: 'Kelas Baru',
    mapel: [
      { id: 'mapel_' + Date.now(), nama: '', kkm: 80 }
    ]
  })
}

function addSection() {
  const lname = raporSchemaLembaga.value
  const sch = form.value.raporSchemas[lname]
  if (!sch || !Array.isArray(sch.sections)) {
    if (!form.value.raporSchemas[lname]) form.value.raporSchemas[lname] = {}
    form.value.raporSchemas[lname].sections = []
  }
  form.value.raporSchemas[lname].sections.push({
    id: 'sec_' + Date.now(),
    title: 'Section Baru',
    rows: [],
    fields: [
      { id: 'adab', label: 'Adab', type: 'number' }
    ]
  })
}

// v.20.24.0526: Rekap Diniyah mapel input baru
// v.20.73.0526: editor per-kelas
const kelasBaruRekap = ref('')
function tambahKelasRekap() {
  const v = kelasBaruRekap.value.trim()
  if (!v) return
  if (!form.value.rekapSchemaDiniyahPerKelas) form.value.rekapSchemaDiniyahPerKelas = {}
  if (form.value.rekapSchemaDiniyahPerKelas[v]) {
    toast.warning(`Kelas ${v} sudah ada`)
    return
  }
  // Init dengan copy default mapel
  form.value.rekapSchemaDiniyahPerKelas[v] = [...(form.value.rekapSchemaDiniyah || [])]
  kelasBaruRekap.value = ''
  isDirty.value = true
}

const rekapMapelBaru = ref('')
function tambahRekapMapel() {
  const v = rekapMapelBaru.value.trim()
  if (!v) return
  if (form.value.rekapSchemaDiniyah.includes(v)) {
    toast.warning('Mata pelajaran sudah ada')
    rekapMapelBaru.value = ''
    return
  }
  form.value.rekapSchemaDiniyah.push(v)
  rekapMapelBaru.value = ''
}

// v.20.33.0526: Reset schema rapor ke factory default per tipe lembaga (kyai req simplify)
function resetSchemaToDefault() {
  const lname = raporSchemaLembaga.value
  if (!lname) return
  const k = String(lname || '').toLowerCase().trim()
  let defaultSchema = {}
  if (k === 'pra ptpt' || k === 'ptpt' || k === 'ppph' || k === 'p3h') {
    const isPra = k === 'pra ptpt'
    defaultSchema = {
      perLevel: true,
      fieldsNilai: [
        { id: 'fashohah', label: 'Fashohah' },
        { id: 'tartil', label: 'Tartil' },
        { id: 'tahfizh_juz_30', label: 'Tahfizh Juz 30' },
        { id: 'ghorib', label: 'Ghorib' },
        { id: 'tajwid', label: 'Tajwid' },
        { id: 'doa_harian', label: 'Doa Harian' },
        { id: 'adab', label: 'Adab' }
      ],
      // v.20.34.0526: Pra PTPT 5-level spec kyai: Lvl 1-3 (½/1/1½ Juz) khotam I-III ×2, Lvl 4 (2 Juz) khotam I-III ×3, Lvl 5 (3 Juz) khotam I-XI ×3
      levels: [
        { id: 'lvl_1', label: 'Level 1', levelBaca: '½ Juz', targetKhotam: '½ Juz', khotamList: [{ id: 'kh_I', labelKhotam: 'Khotam I', multiplier: 2 }, { id: 'kh_II', labelKhotam: 'Khotam II', multiplier: 2 }, { id: 'kh_III', labelKhotam: 'Khotam III', multiplier: 2 }] },
        { id: 'lvl_2', label: 'Level 2', levelBaca: '1 Juz', targetKhotam: '1 Juz', khotamList: [{ id: 'kh_I', labelKhotam: 'Khotam I', multiplier: 2 }, { id: 'kh_II', labelKhotam: 'Khotam II', multiplier: 2 }, { id: 'kh_III', labelKhotam: 'Khotam III', multiplier: 2 }] },
        { id: 'lvl_3', label: 'Level 3', levelBaca: '1½ Juz', targetKhotam: '1½ Juz', khotamList: [{ id: 'kh_I', labelKhotam: 'Khotam I', multiplier: 2 }, { id: 'kh_II', labelKhotam: 'Khotam II', multiplier: 2 }, { id: 'kh_III', labelKhotam: 'Khotam III', multiplier: 2 }] },
        { id: 'lvl_4', label: 'Level 4', levelBaca: '2 Juz', targetKhotam: '2 Juz', khotamList: [{ id: 'kh_I', labelKhotam: 'Khotam I', multiplier: 3 }, { id: 'kh_II', labelKhotam: 'Khotam II', multiplier: 3 }, { id: 'kh_III', labelKhotam: 'Khotam III', multiplier: 3 }] },
        { id: 'lvl_5', label: 'Level 5', levelBaca: '3 Juz', targetKhotam: '3 Juz', khotamList: [{ id: 'kh_I', labelKhotam: 'Khotam I', multiplier: 3 }, { id: 'kh_II', labelKhotam: 'Khotam II', multiplier: 3 }, { id: 'kh_III', labelKhotam: 'Khotam III', multiplier: 3 }, { id: 'kh_IV', labelKhotam: 'Khotam IV', multiplier: 3 }, { id: 'kh_V', labelKhotam: 'Khotam V', multiplier: 3 }, { id: 'kh_VI', labelKhotam: 'Khotam VI', multiplier: 3 }, { id: 'kh_VII', labelKhotam: 'Khotam VII', multiplier: 3 }, { id: 'kh_VIII', labelKhotam: 'Khotam VIII', multiplier: 3 }, { id: 'kh_IX', labelKhotam: 'Khotam IX', multiplier: 3 }, { id: 'kh_X', labelKhotam: 'Khotam X', multiplier: 3 }, { id: 'kh_XI', labelKhotam: 'Khotam XI', multiplier: 3 }] }
      ]
    }
  } else if (k === 'tpq' || k.startsWith('tpq ')) {
    defaultSchema = {
      sections: [
        { id: 'jilid', title: 'Jilid', rows: ['Pra-TK', 'A', 'B', 'C', 'D', 'E', 'F', 'Tahsin', 'Tahfidz'], fields: [
          { id: 'tgl_naik', label: 'Tgl Naik', type: 'date' },
          { id: 'fashohah', label: 'Fashohah', type: 'number' },
          { id: 'tartil', label: 'Tartil', type: 'number' },
          { id: 'adab', label: 'Adab', type: 'number' },
          { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
        ] }
      ]
    }
  } else {
    // Default = Diniyah perKelas
    defaultSchema = {
      perKelas: true,
      jenjang: [
        { kelas: 'I', mapel: [{ id: 'tauhid', nama: 'TAUHID', kkm: 80 }, { id: 'fiqih', nama: 'FIQIH', kkm: 80 }, { id: 'akhlaq', nama: 'AKHLAQ', kkm: 80 }] },
        { kelas: 'II', mapel: [{ id: 'tauhid', nama: 'TAUHID', kkm: 80 }, { id: 'fiqih', nama: 'FIQIH', kkm: 80 }, { id: 'akhlaq', nama: 'AKHLAQ', kkm: 80 }, { id: 'tarikh', nama: 'TARIKH', kkm: 80 }] }
      ]
    }
  }
  form.value.raporSchemas[lname] = defaultSchema
  isDirty.value = true
  toast.success(`Schema ${lname} di-reset ke template default. Klik Simpan untuk apply.`)
}

// Active section state for navigation
const activeSection = ref('identitas')
const sections = [
  { id: 'identitas', label: 'Identitas', icon: 'fa-id-card', gradient: 'from-teal-500 to-teal-700' },
  { id: 'kop', label: 'KOP Surat', icon: 'fa-file-alt', gradient: 'from-blue-500 to-blue-700' },
  { id: 'logo', label: 'Logo & BG', icon: 'fa-image', gradient: 'from-cyan-500 to-cyan-700' },
  { id: 'hijri', label: 'Kalibrasi Hijri', icon: 'fa-moon', gradient: 'from-indigo-500 to-indigo-700' },
  { id: 'kegiatan', label: 'Master Kegiatan', icon: 'fa-tasks', gradient: 'from-emerald-500 to-emerald-700' },
  { id: 'admin', label: 'Admin Password', icon: 'fa-lock', gradient: 'from-rose-500 to-rose-700' },
  { id: 'theme', label: 'Tema Warna', icon: 'fa-palette', gradient: 'from-pink-500 to-fuchsia-700' },
  { id: 'formal', label: 'Submenu Formal', icon: 'fa-school', gradient: 'from-amber-500 to-amber-700' },
  { id: 'qiraati', label: 'Submenu Qiraati', icon: 'fa-star', gradient: 'from-orange-500 to-orange-700' },
  { id: 'fitur', label: 'Fitur & Mode', icon: 'fa-toggle-on', gradient: 'from-purple-500 to-purple-700' },
  { id: 'shift', label: 'Jam Shift', icon: 'fa-clock', gradient: 'from-yellow-500 to-yellow-700' },
  { id: 'printer', label: 'Printer', icon: 'fa-print', gradient: 'from-slate-500 to-slate-700' },
  // v.20.39.0526: Schema Rekap Diniyah dipindah ke Master Data > Lembaga > [lembaga] > Pengaturan
  { id: 'postingan', label: 'Pengaturan Postingan', icon: 'fa-bullhorn', gradient: 'from-fuchsia-500 to-fuchsia-700' },
  // v.20.39.0526: Schema Rapor dipindah ke Master Data > Lembaga > [lembaga] > Pengaturan (kyai req — bikin bingung di sini)
]
</script>

<template>
  <div class="p-4 max-w-5xl mx-auto pb-32">
    <header class="mb-4 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <UiButton variant="ghost" size="sm" @click="handleBack">
          <ArrowLeft class="w-4 h-4" />
        </UiButton>
        <div>
          <h1 class="text-xl font-bold">Pengaturan Web</h1>
          <p class="text-xs text-slate-500">
            Setting global aplikasi (match legacy)
            <span v-if="isDirty" class="ml-1 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px] font-bold">UNSAVED</span>
          </p>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
      <button
        v-for="sec in sections"
        :key="sec.id"
        @click="activeSection = sec.id"
        :class="[
          'group relative overflow-hidden bg-gradient-to-br rounded-xl p-2.5 md:p-3 text-left text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer flex items-center gap-2',
          sec.gradient,
          activeSection === sec.id ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-amber-50' : ''
        ]"
      >
        <i :class="['fas', sec.icon, 'text-base md:text-lg drop-shadow flex-shrink-0']"></i>
        <h3 class="text-[11px] md:text-xs font-black leading-tight drop-shadow-sm">{{ sec.label }}</h3>
      </button>
    </div>

    <UiCard v-show="activeSection === 'identitas'" title="Identitas Aplikasi" subtitle="Nama, deskripsi, header bar, periode" class="mb-4">
      <div class="grid md:grid-cols-2 gap-3">
        <UiInput v-model="form.txtAppName" label="Nama Aplikasi" required />
        <UiInput v-model="form.txtAppDesc" label="Deskripsi / Sub-Title" />
        <UiInput v-model="form.txtSidebarTitle" label="Nama Sidebar / Lembaga" />
        <UiInput v-model="form.txtHeaderBar" label="Teks Header Bar" placeholder="Ammu Online" />
        <UiInput v-model="form.txtPeriode" label="Periode Aktif" />
        <UiInput v-model="form.txtWelcome" label="Sapaan Ahlan" placeholder="Ahlan" />
        <UiInput v-model="form.alamat" label="Alamat Pondok" />
        <UiInput v-model="form.noTelp" label="No. Telepon" />
        <UiInput v-model="form.namaChannel" label="Nama Channel Pesan" />
      </div>
    </UiCard>

    <UiCard v-show="activeSection === 'kop'" title="KOP Surat" subtitle="4 baris header untuk PDF/Excel cetak" class="mb-4">
      <div class="grid gap-3">
        <UiInput v-model="form.kopLine1" label="Baris 1 (KAPITAL, contoh: PONDOK PESANTREN...)" />
        <UiInput v-model="form.kopLine2" label="Baris 2 (BOLD BESAR, contoh: PORTAL PRESTASI QIRAATI)" />
        <UiInput v-model="form.kopLine3" label="Baris 3 (alamat / opsional)" />
        <UiInput v-model="form.kopLine4" label="Baris 4 (telp / opsional)" />
      </div>
      <div class="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
        <p class="text-xs uppercase tracking-widest font-black text-slate-700">{{ form.kopLine1 || '— Baris 1 —' }}</p>
        <p class="text-lg font-black text-slate-800">{{ form.kopLine2 || '— Baris 2 —' }}</p>
        <p v-if="form.kopLine3" class="text-xs text-slate-600">{{ form.kopLine3 }}</p>
        <p v-if="form.kopLine4" class="text-xs text-slate-600">{{ form.kopLine4 }}</p>
      </div>
    </UiCard>

    <UiCard v-show="activeSection === 'logo'" title="Logo & Background" subtitle="4 jenis logo + background layar" class="mb-4">
      <div class="grid md:grid-cols-2 gap-4">
        <div class="border-2 border-dashed border-emerald-300 p-4 rounded-2xl bg-emerald-50">
          <label class="block text-xs font-black text-emerald-900 mb-2 uppercase">Logo Aplikasi (utama)</label>
          <div class="flex items-center gap-3 mb-2">
            <img :src="form.logoUrl || '/logo.png'" class="w-16 h-16 rounded object-contain bg-white p-1 border" />
            <input type="file" accept="image/*" @change="(e) => handleFileUpload(e, 'logoUrl', 'app_logos')"
              :disabled="uploadingField === 'logoUrl'"
              class="text-xs flex-1" />
          </div>
          <p class="text-[10px] text-emerald-700 italic">Tampil di sidebar + login.</p>
        </div>

        <div class="border-2 border-dashed border-amber-300 p-4 rounded-2xl bg-amber-50">
          <label class="block text-xs font-black text-amber-900 mb-2 uppercase">Logo KOP Surat</label>
          <div class="flex items-center gap-3 mb-2">
            <img :src="form.logoKop || form.logoUrl || '/logo.png'" class="w-16 h-16 rounded object-contain bg-white p-1 border" />
            <input type="file" accept="image/*" @change="(e) => handleFileUpload(e, 'logoKop', 'app_logos')"
              :disabled="uploadingField === 'logoKop'"
              class="text-xs flex-1" />
          </div>
          <p class="text-[10px] text-amber-700 italic">Untuk header PDF/Excel cetak. Kosong = pakai Logo Aplikasi.</p>
        </div>

        <div class="border-2 border-dashed border-emerald-300 p-4 rounded-2xl bg-emerald-50">
          <label class="block text-xs font-black text-emerald-900 mb-2 uppercase">Logo Qiraati (bintang 8)</label>
          <div class="flex items-center gap-3 mb-2">
            <img :src="form.logoQiraati || '/logo.png'" class="w-16 h-16 rounded object-contain bg-white p-1 border" />
            <input type="file" accept="image/*" @change="(e) => handleFileUpload(e, 'logoQiraati', 'app_logos')"
              :disabled="uploadingField === 'logoQiraati'"
              class="text-xs flex-1" />
          </div>
          <p class="text-[10px] text-emerald-700 italic">Untuk header rapor + rekap Qiraati.</p>
        </div>

        <div class="border-2 border-dashed border-slate-300 p-4 rounded-2xl bg-slate-50">
          <label class="block text-xs font-black text-slate-700 mb-2 uppercase">Background Layar</label>
          <div class="flex items-center gap-3 mb-2">
            <div class="w-16 h-16 rounded bg-white border flex items-center justify-center overflow-hidden">
              <img v-if="form.bgImage" :src="form.bgImage" class="w-full h-full object-cover" />
              <ImageIcon v-else class="w-6 h-6 text-slate-400" />
            </div>
            <input type="file" accept="image/*" @change="(e) => handleFileUpload(e, 'bgImage', 'app_bg')"
              :disabled="uploadingField === 'bgImage'"
              class="text-xs flex-1" />
          </div>
          <button v-if="form.bgImage" @click="form.bgImage = ''" class="text-[10px] text-rose-600 font-bold underline">
            <Trash2 class="w-3 h-3 inline" /> Hapus BG
          </button>
        </div>

        <div class="border-2 border-dashed border-teal-300 p-4 rounded-2xl bg-teal-50">
          <label class="block text-xs font-black text-teal-900 mb-2 uppercase">BG Rapor TPQ/Qiraati</label>
          <div class="flex items-center gap-3 mb-2">
            <div class="w-16 h-16 rounded bg-white border flex items-center justify-center overflow-hidden">
              <img v-if="form.bgRaporTPQ" :src="form.bgRaporTPQ" class="w-full h-full object-cover" />
              <ImageIcon v-else class="w-6 h-6 text-teal-400" />
            </div>
            <input type="file" accept="image/*" @change="(e) => handleFileUpload(e, 'bgRaporTPQ', 'app_bg')"
              :disabled="uploadingField === 'bgRaporTPQ'"
              class="text-xs flex-1" />
          </div>
          <p class="text-[10px] text-teal-700 italic">Watermark 10% di tengah rapor Qiraati cetak.</p>
          <button v-if="form.bgRaporTPQ" @click="form.bgRaporTPQ = ''" class="text-[10px] text-rose-600 font-bold underline mt-1">
            <Trash2 class="w-3 h-3 inline" /> Hapus
          </button>
        </div>

        <div class="border-2 border-dashed border-purple-300 p-4 rounded-2xl bg-purple-50">
          <label class="block text-xs font-black text-purple-900 mb-2 uppercase">BG Rapor Diniyah</label>
          <div class="flex items-center gap-3 mb-2">
            <div class="w-16 h-16 rounded bg-white border flex items-center justify-center overflow-hidden">
              <img v-if="form.bgRaporDiniyah" :src="form.bgRaporDiniyah" class="w-full h-full object-cover" />
              <ImageIcon v-else class="w-6 h-6 text-purple-400" />
            </div>
            <input type="file" accept="image/*" @change="(e) => handleFileUpload(e, 'bgRaporDiniyah', 'app_bg')"
              :disabled="uploadingField === 'bgRaporDiniyah'"
              class="text-xs flex-1" />
          </div>
          <p class="text-[10px] text-purple-700 italic">Watermark 10% di tengah rapor Diniyah cetak.</p>
          <button v-if="form.bgRaporDiniyah" @click="form.bgRaporDiniyah = ''" class="text-[10px] text-rose-600 font-bold underline mt-1">
            <Trash2 class="w-3 h-3 inline" /> Hapus
          </button>
        </div>
      </div>
      <p class="text-[10px] text-slate-400 italic mt-3">
        <i class="fas fa-info-circle mr-1"></i>TTD (tanda tangan) guru/kepala diatur PERSONAL di Pengaturan Profil → setiap guru upload TTD-nya sendiri.
      </p>
    </UiCard>

    <UiCard v-show="activeSection === 'hijri'" title="Kalibrasi Hijriyah" subtitle="Offset ±5 hari untuk match hilal lokal" class="mb-4">
      <div class="flex items-center gap-4">
        <input type="range" v-model.number="form.kalibrasiHijri" min="-5" max="5" step="1" class="flex-1 accent-teal-600" />
        <div class="bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-lg text-center min-w-[80px]">
          <p class="text-[10px] text-teal-700 font-bold uppercase">Offset</p>
          <p class="text-xl font-black text-teal-800">{{ form.kalibrasiHijri >= 0 ? '+' : '' }}{{ form.kalibrasiHijri }}</p>
        </div>
      </div>
      <div class="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p class="text-[10px] font-bold text-emerald-700 uppercase">Preview Hari Ini</p>
        <p class="text-lg font-black text-emerald-800">{{ hijriPreview }}</p>
      </div>
    </UiCard>

    <UiCard v-show="activeSection === 'kegiatan'" title="Master Kegiatan Pondok" subtitle="Kegiatan untuk absensi mukim santri (nama + skor + jam)" class="mb-4">
      <div class="mb-3 flex justify-between items-center">
        <p class="text-xs text-slate-500">{{ form.masterKegiatan.length }} kegiatan terdaftar</p>
        <UiButton size="sm" variant="primary" @click="addKegiatan">
          <Plus class="w-3.5 h-3.5" />Tambah
        </UiButton>
      </div>
      <div v-if="form.masterKegiatan.length === 0" class="text-center text-xs text-slate-400 italic py-6 border-2 border-dashed border-slate-200 rounded-lg">
        Belum ada kegiatan. Klik <b>Tambah</b> untuk mulai.
      </div>
      <div v-else class="space-y-2">
        <div v-for="(k, idx) in form.masterKegiatan" :key="k.id" class="bg-slate-50 border border-slate-200 rounded-lg p-3">
          <div class="grid md:grid-cols-6 gap-2">
            <UiInput v-model="k.nama" label="Nama Kegiatan" class="md:col-span-2" />
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Jam Mulai</label>
              <input v-model="k.jam_mulai" type="time" class="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Terlambat</label>
              <input v-model="k.jam_terlambat" type="time" class="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Skor</label>
              <input v-model.number="k.skor" type="number" min="0" max="100" class="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
            </div>
            <div class="flex items-end">
              <button @click="removeKegiatan(idx)" class="text-rose-600 hover:text-rose-800 p-1.5">
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </UiCard>

    <UiCard v-show="activeSection === 'admin'" title="Default Admin Built-in" subtitle="Username & ganti password admin" class="mb-4">
      <div class="grid md:grid-cols-2 gap-3">
        <UiInput v-model="form.adminUsername" label="Username Admin Built-in" placeholder="adminmu" />
      </div>
      <!-- v.21.24b.0526: Wrap password inputs dengan <form> untuk fix DOM warning + autocomplete hints -->
      <form @submit.prevent="changeAdminPassword" class="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p class="text-xs font-black text-amber-800 mb-2 uppercase">Ganti Password Admin</p>
        <input type="text" name="username" autocomplete="username" :value="form.adminUsername" class="hidden" readonly />
        <div class="grid md:grid-cols-3 gap-2">
          <UiInput v-model="adminPwdNew" type="password" label="Password Baru" autocomplete="new-password" />
          <UiInput v-model="adminPwdConfirm" type="password" label="Konfirmasi" autocomplete="new-password" />
          <div class="flex items-end">
            <UiButton size="sm" variant="primary" type="submit" :disabled="!adminPwdNew">
              Apply
            </UiButton>
          </div>
        </div>
        <p class="text-[10px] text-amber-700 italic mt-2">Password disimpan di settings/general saat klik Simpan.</p>
      </form>
    </UiCard>

    <UiCard v-show="activeSection === 'theme'" title="Tema Warna" subtitle="Color picker untuk accent, teks, sidebar" class="mb-4">
      <div class="grid md:grid-cols-3 gap-4">
        <div>
          <label class="text-xs font-bold text-slate-700 mb-2 block">Warna Accent</label>
          <div class="flex items-center gap-2">
            <input v-model="form.themeColor" type="color" class="w-12 h-10 border border-slate-300 rounded cursor-pointer" />
            <input v-model="form.themeColor" type="text" class="flex-1 px-2 py-1.5 text-xs border border-slate-300 rounded font-mono" />
          </div>
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 mb-2 block">Warna Teks</label>
          <div class="flex items-center gap-2">
            <input v-model="form.themeTextColor" type="color" class="w-12 h-10 border border-slate-300 rounded cursor-pointer" />
            <input v-model="form.themeTextColor" type="text" class="flex-1 px-2 py-1.5 text-xs border border-slate-300 rounded font-mono" />
          </div>
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 mb-2 block">Sidebar BG (legacy)</label>
          <div class="flex items-center gap-2">
            <input v-model="form.sidebarBgColor" type="color" class="w-12 h-10 border border-slate-300 rounded cursor-pointer" />
            <input v-model="form.sidebarBgColor" type="text" class="flex-1 px-2 py-1.5 text-xs border border-slate-300 rounded font-mono" />
          </div>
        </div>
      </div>
      <p class="text-[10px] text-slate-500 italic mt-3">Note: Vue sidebar sekarang pakai cream/mint preset. Color picker disimpan untuk kompat legacy.</p>
    </UiCard>

    <UiCard v-show="activeSection === 'formal'" title="Submenu Formal per-Lembaga" subtitle="KOP sekolah, logo, tarif SPP" class="mb-4">
      <div v-if="lembagaFormalList.length === 0" class="text-xs text-slate-400 italic text-center py-6 border-2 border-dashed border-slate-200 rounded">
        Belum ada lembaga formal terdaftar. Tambah di Master Data → Lembaga.
      </div>
      <div v-else class="space-y-3">
        <details v-for="lem in lembagaFormalList" :key="lem.id" class="bg-slate-50 border border-slate-200 rounded-lg">
          <summary class="cursor-pointer p-3 font-black text-sm text-slate-700 flex justify-between items-center">
            <span><i class="fas fa-school mr-2 text-blue-600"></i>{{ lem.nama }}</span>
            <i class="fas fa-chevron-down text-xs"></i>
          </summary>
          <div class="p-3 border-t border-slate-200 grid gap-2">
            <UiInput :model-value="ensureSubmenuFormal(lem.nama).kopLine1" @update:modelValue="(v) => form.submenuFormal[lem.nama].kopLine1 = v" label="KOP Baris 1 (Yayasan/Kementerian)" />
            <UiInput :model-value="ensureSubmenuFormal(lem.nama).kopLine2" @update:modelValue="(v) => form.submenuFormal[lem.nama].kopLine2 = v" label="KOP Baris 2 (Nama Sekolah)" />
            <UiInput :model-value="ensureSubmenuFormal(lem.nama).kopLine3" @update:modelValue="(v) => form.submenuFormal[lem.nama].kopLine3 = v" label="KOP Baris 3 (Alamat)" />
            <UiInput :model-value="ensureSubmenuFormal(lem.nama).kopLine4" @update:modelValue="(v) => form.submenuFormal[lem.nama].kopLine4 = v" label="KOP Baris 4 (Telp/NSS)" />
            <div class="flex items-center gap-3">
              <img :src="form.submenuFormal[lem.nama]?.logoSekolah || '/logo.png'" class="w-12 h-12 rounded object-contain bg-white p-1 border" />
              <input type="file" accept="image/*"
                @change="(e) => handleFileUpload(e, `submenuFormal.${lem.nama}.logoSekolah`, 'lembaga_logos')"
                class="text-xs flex-1" />
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Tarif SPP Default (Rp)</label>
              <input :value="form.submenuFormal[lem.nama]?.tarifSPP || 0"
                @input="(e) => { ensureSubmenuFormal(lem.nama); form.submenuFormal[lem.nama].tarifSPP = Number(e.target.value) }"
                type="number" min="0" class="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
            </div>
          </div>
        </details>
      </div>
      <p class="text-[10px] text-slate-400 italic mt-3">
        <i class="fas fa-info-circle mr-1"></i>TTD (tanda tangan) guru/kepala diatur PERSONAL di Pengaturan Profil → setiap guru upload TTD-nya sendiri.
      </p>
    </UiCard>

    <UiCard v-show="activeSection === 'qiraati'" title="Submenu Qiraati per-Lembaga" subtitle="Target kelas + format rekap" class="mb-4">
      <div v-if="lembagaQiraatiList.length === 0" class="text-xs text-slate-400 italic text-center py-6 border-2 border-dashed border-slate-200 rounded">
        Belum ada lembaga Qiraati/PTPT terdaftar.
      </div>
      <div v-else class="space-y-3">
        <details v-for="lem in lembagaQiraatiList" :key="lem.id" class="bg-emerald-50 border border-emerald-200 rounded-lg">
          <summary class="cursor-pointer p-3 font-black text-sm text-emerald-800 flex justify-between items-center">
            <span><i class="fas fa-star mr-2 text-emerald-600"></i>{{ lem.nama }}</span>
            <i class="fas fa-chevron-down text-xs"></i>
          </summary>
          <div class="p-3 border-t border-emerald-200 grid gap-2">
            <UiInput :model-value="ensureSubmenuQiraati(lem.nama).targetKelas" @update:modelValue="(v) => form.submenuQiraati[lem.nama].targetKelas = v" label="Target Kelas (contoh: Pra-TK, A, B, C, D, E, Tahsin, Tahfidz)" />
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Format Rekap</label>
              <select
                :value="form.submenuQiraati[lem.nama]?.formatRekap || 'standard'"
                @change="(e) => { ensureSubmenuQiraati(lem.nama); form.submenuQiraati[lem.nama].formatRekap = e.target.value }"
                class="w-full px-2 py-1.5 text-xs border border-slate-300 rounded">
                <option value="standard">Standard (per-kelas)</option>
                <option value="khotam">Per-Khotam (Pra PTPT style)</option>
              </select>
            </div>
          </div>
        </details>
      </div>
    </UiCard>

    <UiCard v-show="activeSection === 'fitur'" title="Fitur & Mode Aplikasi" subtitle="Toggle modul + Capacitor mode" class="mb-4">
      <div class="grid md:grid-cols-2 gap-2">
        <label class="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded">
          <input v-model="form.fiturBeranda" type="checkbox" class="w-4 h-4 accent-teal-600" />
          Beranda (Mading + Quick Action)
        </label>
        <label class="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded">
          <input v-model="form.fiturKalender" type="checkbox" class="w-4 h-4 accent-teal-600" />
          Kalender Pendidikan
        </label>
        <label class="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded">
          <input v-model="form.fiturKritikSaran" type="checkbox" class="w-4 h-4 accent-teal-600" />
          Kritik &amp; Saran
        </label>
        <label class="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded">
          <input v-model="form.fiturNotifikasi" type="checkbox" class="w-4 h-4 accent-teal-600" />
          Notifikasi FCM
        </label>
        <label class="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded">
          <input v-model="form.autoNotifPostingan" type="checkbox" class="w-4 h-4 accent-teal-600" />
          Auto-Notif setiap Postingan
        </label>
        <label class="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded">
          <input v-model="form.softDelete" type="checkbox" class="w-4 h-4 accent-rose-600" />
          Soft Delete (recoverable)
        </label>
      </div>
      <div class="p-3 bg-purple-50 border border-purple-200 rounded-lg mt-3">
        <p class="text-xs font-black text-purple-800 mb-2 uppercase">Mode Capacitor / PWA</p>
        <div class="flex gap-3 flex-wrap">
          <label class="flex items-center gap-2 cursor-pointer text-sm">
            <input v-model="form.capacitorMode" type="radio" value="remote" class="w-4 h-4 accent-purple-600" />
            <span><b>Remote (Opsi B)</b> — server.url ke Firebase Hosting</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer text-sm">
            <input v-model="form.capacitorMode" type="radio" value="local" class="w-4 h-4 accent-purple-600" />
            <span>Local (bundled)</span>
          </label>
        </div>
      </div>
    </UiCard>

    <UiCard v-show="activeSection === 'shift'" title="Pengaturan Jam Shift" subtitle="Jam mulai / selesai / batas terlambat — Pagi · Sore · Sekolah" class="mb-4">
      <div class="grid md:grid-cols-3 gap-4">
        <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl">
          <p class="text-xs font-black text-amber-800 uppercase mb-2"><i class="fas fa-sun mr-1"></i>SHIFT PAGI</p>
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Mulai</label>
              <input v-model="form.shiftPagiMulai" type="time" class="w-full px-2 py-1.5 text-sm border border-amber-300 rounded bg-white" />
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Terlambat</label>
              <input v-model="form.shiftPagiTerlambat" type="time" class="w-full px-2 py-1.5 text-sm border border-rose-300 rounded bg-white" />
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Selesai</label>
              <input v-model="form.shiftPagiSelesai" type="time" class="w-full px-2 py-1.5 text-sm border border-amber-300 rounded bg-white" />
            </div>
          </div>
        </div>
        <div class="p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
          <p class="text-xs font-black text-indigo-800 uppercase mb-2"><i class="fas fa-moon mr-1"></i>SHIFT SORE</p>
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Mulai</label>
              <input v-model="form.shiftSoreMulai" type="time" class="w-full px-2 py-1.5 text-sm border border-indigo-300 rounded bg-white" />
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Terlambat</label>
              <input v-model="form.shiftSoreTerlambat" type="time" class="w-full px-2 py-1.5 text-sm border border-rose-300 rounded bg-white" />
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Selesai</label>
              <input v-model="form.shiftSoreSelesai" type="time" class="w-full px-2 py-1.5 text-sm border border-indigo-300 rounded bg-white" />
            </div>
          </div>
        </div>
        <div class="p-3 bg-teal-50 border border-teal-200 rounded-xl">
          <p class="text-xs font-black text-teal-800 uppercase mb-2"><i class="fas fa-school mr-1"></i>SHIFT SEKOLAH</p>
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Mulai</label>
              <input v-model="form.shiftSekolahMulai" type="time" class="w-full px-2 py-1.5 text-sm border border-teal-300 rounded bg-white" />
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Terlambat</label>
              <input v-model="form.shiftSekolahTerlambat" type="time" class="w-full px-2 py-1.5 text-sm border border-rose-300 rounded bg-white" />
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Selesai</label>
              <input v-model="form.shiftSekolahSelesai" type="time" class="w-full px-2 py-1.5 text-sm border border-teal-300 rounded bg-white" />
            </div>
          </div>
        </div>
      </div>
      <p class="text-[10px] text-slate-500 italic mt-3"><i class="fas fa-info-circle mr-1"></i>Jam <b>Terlambat</b> = batas waktu kehadiran masih dianggap "Hadir"; lewat dari ini → status auto "Terlambat" saat impor fingerprint.</p>
    </UiCard>

    <UiCard v-show="activeSection === 'printer'" title="Pengaturan Printer" subtitle="Default printer + ukuran kertas + orientasi untuk cetak rapor/slip" class="mb-4">
      <div class="grid md:grid-cols-2 gap-3">
        <div class="md:col-span-2">
          <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Nama Printer Default</label>
          <input v-model="form.printerNama" type="text" placeholder="Mis: EPSON L3110 / TM-T82II" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800" />
        </div>
        <div>
          <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Ukuran Kertas</label>
          <select v-model="form.printerKertas" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800">
            <option value="A4">A4 (210x297mm)</option>
            <option value="F4">F4 / Folio (210x330mm)</option>
            <option value="Legal">Legal (216x356mm)</option>
            <option value="Letter">Letter (216x279mm)</option>
            <option value="Struk58">Struk 58mm</option>
            <option value="Struk80">Struk 80mm</option>
          </select>
        </div>
        <div>
          <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Orientasi</label>
          <select v-model="form.printerOrientasi" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800">
            <option value="portrait">Portrait (Tegak)</option>
            <option value="landscape">Landscape (Lebar)</option>
          </select>
        </div>
        <div>
          <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Margin (mm)</label>
          <input v-model.number="form.printerMarginMM" type="number" min="0" max="50" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800" />
        </div>
        <label class="md:col-span-2 flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer border border-slate-200">
          <input v-model="form.printerAutoPrint" type="checkbox" class="w-5 h-5 accent-teal-600" />
          <div>
            <p class="text-sm font-bold">Auto-Print (Tauri Desktop)</p>
            <p class="text-[11px] text-slate-500">Langsung kirim ke printer tanpa preview dialog. Hanya aktif di Tauri Desktop.</p>
          </div>
        </label>
      </div>
    </UiCard>

    <UiCard v-show="activeSection === 'rekapDiniyah'" title="Schema Rekap Diniyah" subtitle="Daftar mata pelajaran Diniyah yang muncul sebagai kolom di Rekap Diniyah" class="mb-4">
      <div class="space-y-2 mb-3">
        <div v-for="(m, idx) in form.rekapSchemaDiniyah" :key="idx" class="flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-lg p-2">
          <input v-model="form.rekapSchemaDiniyah[idx]" type="text" class="flex-1 bg-transparent text-sm font-bold text-slate-800 outline-none" />
          <button @click="form.rekapSchemaDiniyah.splice(idx, 1)" class="text-rose-600 hover:bg-rose-50 px-2 py-1 rounded text-xs cursor-pointer">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <p v-if="form.rekapSchemaDiniyah.length === 0" class="text-xs text-slate-400 italic text-center py-2">Belum ada mata pelajaran. Tambah di bawah.</p>
      </div>
      <div class="flex gap-2">
        <input v-model="rekapMapelBaru" @keyup.enter="tambahRekapMapel" type="text" placeholder="Nama mata pelajaran baru..." class="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50" />
        <button @click="tambahRekapMapel" class="bg-violet-600 hover:bg-violet-700 text-white font-bold px-4 py-2 rounded-lg text-xs whitespace-nowrap cursor-pointer">
          <i class="fas fa-plus mr-1"></i>Tambah
        </button>
      </div>
      <div class="mt-3 p-3 bg-violet-50 border border-violet-200 rounded-xl text-[11px] text-violet-800">
        <i class="fas fa-info-circle mr-1"></i>Mata pelajaran <b>default</b> (semua kelas). Untuk override per-kelas, edit di bawah.
      </div>

      <!-- v.20.73.0526: Per-kelas mapel override -->
      <div class="mt-5 border-t border-violet-200 pt-4">
        <h4 class="text-xs font-black text-violet-900 uppercase mb-2"><i class="fas fa-layer-group mr-1"></i>Override Mapel per Kelas</h4>
        <p class="text-[11px] text-slate-500 italic mb-3">Kalau kelas tertentu butuh daftar mapel berbeda dari default. Kalau kelas tidak di-set, pakai default di atas.</p>
        <div class="space-y-3">
          <div v-for="(mapels, kelas) in form.rekapSchemaDiniyahPerKelas" :key="kelas" class="bg-white border border-violet-200 rounded-xl p-3">
            <div class="flex items-center justify-between mb-2">
              <p class="text-xs font-black text-violet-800 uppercase">📚 Kelas {{ kelas }}</p>
              <button @click="delete form.rekapSchemaDiniyahPerKelas[kelas]" class="text-rose-600 text-xs font-bold hover:bg-rose-50 px-2 py-0.5 rounded">
                <i class="fas fa-trash mr-1"></i>Hapus kelas
              </button>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="(m, idx) in mapels" :key="idx" class="inline-flex items-center gap-1 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded text-[11px]">
                <input v-model="form.rekapSchemaDiniyahPerKelas[kelas][idx]" class="bg-transparent w-24 outline-none text-[11px]" />
                <button @click="form.rekapSchemaDiniyahPerKelas[kelas].splice(idx, 1)" class="text-rose-400 text-[10px]"><i class="fas fa-times"></i></button>
              </span>
              <button @click="form.rekapSchemaDiniyahPerKelas[kelas].push('Mapel Baru')" class="bg-violet-200 hover:bg-violet-300 text-violet-800 text-[10px] font-bold px-2 py-0.5 rounded">+ Mapel</button>
            </div>
          </div>
        </div>
        <div class="flex gap-2 mt-3">
          <input v-model="kelasBaruRekap" type="text" placeholder="Nama kelas (mis: TK A, I, II, III)" class="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50" />
          <button @click="tambahKelasRekap" class="bg-violet-600 hover:bg-violet-700 text-white font-bold px-4 py-2 rounded-lg text-xs cursor-pointer">
            <i class="fas fa-plus mr-1"></i>Tambah Kelas
          </button>
        </div>
      </div>
    </UiCard>

    <UiCard v-show="activeSection === 'postingan'" title="Pengaturan Postingan / Ammu Channel" subtitle="Hak akses + limit upload" class="mb-4">
      <div class="space-y-3">
        <label class="flex items-start gap-3 p-3 bg-fuchsia-50 border border-fuchsia-200 rounded-lg cursor-pointer">
          <input v-model="form.postinganHanyaAdmin" type="checkbox" class="w-5 h-5 accent-fuchsia-600 mt-0.5" />
          <div>
            <p class="text-sm font-bold text-slate-800">Hanya Admin & Super Admin yang bisa buat post</p>
            <p class="text-[11px] text-slate-500">Kalau off: guru juga bisa buat post. Santri tidak pernah bisa post.</p>
          </div>
        </label>
        <label class="flex items-start gap-3 p-3 bg-fuchsia-50 border border-fuchsia-200 rounded-lg cursor-pointer">
          <input v-model="form.postinganAutoApprove" type="checkbox" class="w-5 h-5 accent-fuchsia-600 mt-0.5" />
          <div>
            <p class="text-sm font-bold text-slate-800">Auto-approve post baru</p>
            <p class="text-[11px] text-slate-500">Kalau off: post baru moderation queue dulu sampai admin approve.</p>
          </div>
        </label>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Max Gambar per Post</label>
            <input v-model.number="form.postinganMaxImages" type="number" min="1" max="10" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50" />
          </div>
          <div>
            <label class="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Max Size per Gambar (KB)</label>
            <input v-model.number="form.postinganMaxSizeKb" type="number" min="50" max="5000" step="50" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50" />
          </div>
        </div>
      </div>
    </UiCard>

    <UiCard v-show="activeSection === 'raporSchema'" title="Schema Rapor per-Lembaga" subtitle="Edit field nilai + struktur untuk rapor cetak per lembaga" class="mb-4">
      <div class="space-y-3">
        <div>
          <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1 tracking-wider">Pilih Lembaga</label>
          <select v-model="raporSchemaLembaga" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50">
            <option value="">-- Pilih lembaga --</option>
            <option v-for="l in lembagaRaw" :key="l.lembaga" :value="l.lembaga">{{ l.lembaga }} ({{ l.tipe || 'Qiraati' }})</option>
            <option value="Diniyah">Diniyah (perKelas mapel)</option>
          </select>
        </div>

        <div v-if="raporSchemaLembaga" class="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-3">
          <p class="text-xs font-black text-purple-900 uppercase">Schema untuk: {{ raporSchemaLembaga }}</p>

          <!-- v.20.33.0526: Info banner — kyai bingung, simplified -->
          <div class="bg-blue-50 border border-blue-300 rounded-lg p-3 text-[11px] text-blue-900">
            <p class="font-black uppercase tracking-wider mb-1 text-blue-700"><i class="fas fa-info-circle mr-1"></i>Bagaimana Rapor Tampil?</p>
            <p class="leading-relaxed">
              Rapor otomatis pakai template bawaan berdasar tipe lembaga &mdash; tidak perlu setup manual:
              <br /><b>&bull; Pra PTPT/PTPT/PPPH</b> &rarr; matrix Level &times; Khotam (½ Juz, 1 Juz, ..., 3 Juz)
              <br /><b>&bull; TPQ Sore/Pagi</b> &rarr; matrix Jilid (Pra-TK/A/B/C/D/E/Tahsin/Tahfidz) + nilai fashohah/tartil/adab
              <br /><b>&bull; Diniyah (sekolah formal)</b> &rarr; mata pelajaran per kelas + KKM
              <br /><br />
              <b>Customize hanya bila perlu:</b> ubah field nilai, tambah level, hapus jilid, dll. Setelah custom, template default tidak dipakai lagi untuk lembaga ini.
            </p>
            <button @click="resetSchemaToDefault" class="mt-2 text-[10px] font-black px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
              <i class="fas fa-undo mr-1"></i>Reset Ke Template Default
            </button>
          </div>

          <div>
            <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Tipe Schema (Customize)</label>
            <select :value="getSchemaType()" @change="changeSchemaType($event.target.value)" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white">
              <option value="sections">TPQ &mdash; Matrix Jilid (Pra-TK, A/B/C/D/E, Tahsin, Tahfidz)</option>
              <option value="perLevel">Pra PTPT/PTPT/PPPH &mdash; Level Baca &times; Khotam Matrix</option>
              <option value="perKelas">Diniyah/Sekolah Formal &mdash; Mapel KKM per Kelas</option>
              <option value="kosong">Tidak Punya Rapor (mis. TPQ Pagi)</option>
            </select>
          </div>

          <div v-if="getSchemaType() === 'perLevel'" class="space-y-2">
            <p class="text-[11px] font-bold text-purple-800">Field Nilai (kolom angka):</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="(f, idx) in form.raporSchemas[raporSchemaLembaga]?.fieldsNilai || []" :key="idx" class="bg-white border border-purple-200 px-2 py-1 rounded text-xs flex items-center gap-1">
                {{ f.label }}
                <button @click="removeFieldNilai(idx)" class="text-rose-500 hover:text-rose-700"><i class="fas fa-times text-[10px]"></i></button>
              </span>
            </div>
            <div class="flex gap-2">
              <input v-model="fieldNilaiBaru" @keyup.enter="addFieldNilai" type="text" placeholder="Tambah field nilai (Fashohah, Tartil, ...)" class="flex-1 px-2 py-1 text-xs border border-slate-300 rounded bg-white" />
              <button @click="addFieldNilai" class="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3 py-1 rounded cursor-pointer">+ Tambah</button>
            </div>
            <p class="text-[11px] font-bold text-purple-800 mt-3">Level x Khotam:</p>
            <div class="space-y-2">
              <div v-for="(lvl, lIdx) in form.raporSchemas[raporSchemaLembaga]?.levels || []" :key="lvl.id" class="bg-white p-2 rounded border border-purple-100">
                <div class="grid grid-cols-3 gap-2 mb-2">
                  <input v-model="lvl.label" placeholder="Label (Level 1)" class="text-xs px-2 py-1 border border-slate-300 rounded" />
                  <input v-model="lvl.levelBaca" placeholder="Baca (½ Juz)" class="text-xs px-2 py-1 border border-slate-300 rounded" />
                  <button @click="form.raporSchemas[raporSchemaLembaga].levels.splice(lIdx, 1)" class="text-rose-500 text-xs hover:bg-rose-50 px-2 rounded"><i class="fas fa-trash mr-1"></i>Hapus Level</button>
                </div>
                <!-- v.20.34.0526: Editor khotam per level (kyai req detail editor) -->
                <div class="space-y-1">
                  <p class="text-[10px] font-black text-purple-700 uppercase tracking-wider">Khotam:</p>
                  <div v-for="(kh, kIdx) in (lvl.khotamList || [])" :key="kh.id" class="grid grid-cols-[1fr_60px_30px] gap-1 items-center bg-purple-50/60 rounded px-2 py-1">
                    <input v-model="kh.labelKhotam" placeholder="Khotam I" class="text-[11px] px-1.5 py-0.5 border border-slate-300 rounded bg-white" />
                    <input v-model.number="kh.multiplier" type="number" min="1" max="10" class="text-[11px] px-1.5 py-0.5 border border-slate-300 rounded bg-white text-center" title="Multiplier (2x/3x/...)" />
                    <button @click="lvl.khotamList.splice(kIdx, 1)" class="text-rose-500 text-[11px] hover:bg-rose-100 rounded" title="Hapus khotam"><i class="fas fa-times"></i></button>
                  </div>
                  <button @click="addKhotamToLevel(lvl)" class="text-[10px] bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold px-2 py-0.5 rounded">
                    <i class="fas fa-plus mr-0.5"></i>Tambah Khotam
                  </button>
                </div>
              </div>
              <button @click="addPraLevel" class="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold px-3 py-1 rounded">+ Tambah Level</button>
            </div>
          </div>

          <div v-else-if="getSchemaType() === 'perKelas'" class="space-y-2">
            <p class="text-[11px] font-bold text-purple-800">Jenjang Kelas x Mata Pelajaran:</p>
            <div v-for="(j, jIdx) in form.raporSchemas[raporSchemaLembaga]?.jenjang || []" :key="j.kelas" class="bg-white p-2 rounded border border-purple-100">
              <div class="flex items-center justify-between mb-1">
                <input v-model="j.kelas" class="text-xs font-bold px-2 py-1 border border-slate-300 rounded w-32" placeholder="Kelas (TK A)" />
                <button @click="form.raporSchemas[raporSchemaLembaga].jenjang.splice(jIdx, 1)" class="text-rose-500 text-xs"><i class="fas fa-trash"></i></button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-1 mt-1">
                <div v-for="(m, mIdx) in j.mapel || []" :key="mIdx" class="flex items-center gap-1 bg-slate-50 p-1 rounded">
                  <input v-model="m.nama" class="flex-1 text-[11px] px-1 py-0.5 border-0 bg-transparent" placeholder="Mapel" />
                  <input v-model.number="m.kkm" type="number" min="0" max="100" class="w-12 text-[11px] px-1 py-0.5 border border-slate-300 rounded bg-white" title="KKM" />
                  <button @click="j.mapel.splice(mIdx, 1)" class="text-rose-400 text-[10px]"><i class="fas fa-times"></i></button>
                </div>
              </div>
              <button @click="j.mapel = j.mapel || []; j.mapel.push({ id: 'mapel_' + Date.now(), nama: '', kkm: 80 })" class="text-[10px] text-purple-700 font-bold mt-1">+ Tambah Mapel</button>
            </div>
            <button @click="addDiniyahJenjang" class="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold px-3 py-1 rounded">+ Tambah Jenjang</button>
          </div>

          <div v-else-if="getSchemaType() === 'sections'" class="space-y-2">
            <p class="text-[11px] font-bold text-purple-800">Sections (per kelas/jilid):</p>
            <div v-for="(sec, sIdx) in form.raporSchemas[raporSchemaLembaga]?.sections || []" :key="sec.id" class="bg-white p-2 rounded border border-purple-100 space-y-2">
              <div class="flex items-center justify-between gap-2">
                <input v-model="sec.title" class="text-xs font-bold px-2 py-1 border border-slate-300 rounded flex-1" placeholder="Title section (Jilid)" />
                <button @click="form.raporSchemas[raporSchemaLembaga].sections.splice(sIdx, 1)" class="text-rose-500 text-xs hover:bg-rose-50 px-2 rounded"><i class="fas fa-trash"></i></button>
              </div>
              <!-- v.20.34.0526: Editor rows (jilid list) -->
              <div class="space-y-1">
                <p class="text-[10px] font-black text-purple-700 uppercase tracking-wider">Rows (Jilid/Kelas):</p>
                <div class="flex flex-wrap gap-1">
                  <span v-for="(r, rIdx) in (sec.rows || [])" :key="rIdx" class="bg-purple-50 border border-purple-200 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                    <input v-model="sec.rows[rIdx]" class="bg-transparent border-0 outline-none text-[11px] w-16" />
                    <button @click="sec.rows.splice(rIdx, 1)" class="text-rose-400 text-[10px]"><i class="fas fa-times"></i></button>
                  </span>
                  <button @click="(sec.rows = sec.rows || []) && sec.rows.push('Baru')" class="bg-purple-200 hover:bg-purple-300 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded">+ Row</button>
                </div>
              </div>
              <div class="space-y-1">
                <p class="text-[10px] font-black text-purple-700 uppercase tracking-wider">Fields (Kolom Nilai):</p>
                <div v-for="(fl, fIdx) in (sec.fields || [])" :key="fIdx" class="grid grid-cols-[1fr_90px_30px] gap-1 items-center bg-purple-50/60 rounded px-2 py-1">
                  <input v-model="fl.label" placeholder="Label" class="text-[11px] px-1.5 py-0.5 border border-slate-300 rounded bg-white" />
                  <select v-model="fl.type" class="text-[11px] px-1 py-0.5 border border-slate-300 rounded bg-white">
                    <option value="number">Angka</option>
                    <option value="text">Teks</option>
                    <option value="date">Tanggal</option>
                    <option value="auto_predikat">Predikat (auto)</option>
                  </select>
                  <button @click="sec.fields.splice(fIdx, 1)" class="text-rose-500 text-[11px]"><i class="fas fa-times"></i></button>
                </div>
                <button @click="(sec.fields = sec.fields || []) && sec.fields.push({ id: 'f_' + Date.now(), label: 'Baru', type: 'number' })" class="bg-purple-200 hover:bg-purple-300 text-[10px] font-bold px-2 py-0.5 rounded">+ Field</button>
              </div>
            </div>
          </div>
        </div>

        <p class="text-[11px] text-slate-500 italic">
          <i class="fas fa-info-circle mr-1"></i>Schema ini dipakai di Rapor Semester (perLevel/perKelas/sections) + Predikat auto-compute. Save semua via tombol Simpan di bawah.
        </p>
      </div>
    </UiCard>

    <div class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 flex gap-2 z-20">
      <UiButton variant="secondary" size="sm" @click="resetForm">
        <i class="fas fa-undo mr-1"></i>Reset
      </UiButton>
      <UiButton variant="primary" size="sm" @click="simpanSemua" :loading="saving">
        <i class="fas fa-save mr-1"></i>Simpan Semua
      </UiButton>
    </div>
  </div>
</template>
