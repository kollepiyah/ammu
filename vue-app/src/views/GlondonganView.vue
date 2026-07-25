<script setup>
// v.111: Glondongan PTPT — 1 layar, tab per-peran (scope halus di dalam view).
//   - Penugasan   : koordinator kelas asal / PJ PTPT / super_admin tunjuk guru penguji blok 'menunggu'.
//   - Tugas Menilai: guru yang ditugaskan input nilai per juz + catatan (Task #5).
//   - Catatan     : guru kelas + PJ lihat catatan evaluasi (Task #6).
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { subscribeColl } from '@/services/db'
import { useGlondongan } from '@/composables/useGlondongan'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
// Aspek nilai PTPT (sama persis dg tes PJ): Tahfizh, Istimror, Fashohah, Tajwid (0..90).
import { tesAspekFlat, clampNilaiTes, TES_NILAI_MAX } from '@/utils/tesKenaikan'
import { waLink, BULAN_ID } from '@/utils/format' // v.1.1.9: tautan kontak penyimak / guru kelas
import { jsPDFFromCDN } from '@/services/pdf' // v.1.2.1: ekspor PDF rekap
import { isGuruAktif } from '@/utils/guruScope' // v.1.2.0: sumber tunggal penyaring status guru
import {
  KATEGORI_LABEL,
  CAKUPAN_OPTS,
  peranKeBaris,
  barisKePeran,
  periodeBulan,
  buatPetaPjSantri,
  isPjLembaga,
  PTPT_LEMBAGA,
  hitungTugasAktif,
  jumlahTugasAktif,
  agregatPenyimakGlondongan,
  totalPenyimakGlondongan
} from '@/utils/glondongan'
import { useSettingsStore } from '@/stores/settings'

const {
  loaded,
  rows, // v.1.1.9: baris glondongan TANPA yang yatim (ajuannya sudah dihapus)
  barisYatim,
  bersihkanYatim,
  sesi,
  myNama,
  antrianTugas,
  antrianTertunda, // v.1.1.9: blok belum giliran (keterangan di tab Penugasan)
  tugasMenunggu,
  sudahDitugaskan, // v.1.1.9: blok ber-penyimak (kontak WA)
  canAssignAny,
  myKategori,
  koordinatorGlondongan,
  penyimakGlondongan, // v.1.1.9: daftar penyimak per kategori
  pjGuru, // v.1.2.1: peta pembagian santri per PJ
  bolehMenyimak,
  isPjPtpt,
  isAmpuanSaya, // v.1.1.9: scope PJ — hanya santri ampuannya
  isSuper,
  tugaskan,
  batalTugas,
  tugasNilaiSaya,
  simpanNilai,
  savePeran,
  // v.1.1.9: hapus baris (super_admin). Sudah ada di composable sejak v.111 tapi
  //   tak pernah dipasang ke UI — jadi data uji glondongan tak bisa dibersihkan.
  canCrud,
  hapus
} = useGlondongan()
const toast = useToast()
const confirmDlg = useConfirm()

// Hapus 1 baris tes glondongan (koreksi / bersihkan data uji).
// ConfirmDialog merender message pakai v-html → escape nilai dari data, pisah baris dgn <br>.
const _esc = (v) =>
  String(v == null ? '' : v).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  )
const hapusId = ref('')
async function hapusRow(r) {
  if (!canCrud.value || !r) return
  const ok = await confirmDlg({
    title: 'Hapus baris glondongan?',
    message:
      `<b>${_esc(r.nama_cache || 'Santri')}</b> — ${_esc(tipeLabel(r))} · Kelas ${_esc(r.kelas_asal)} · ${_esc(juzLabel(r))}` +
      (r.status === 'selesai'
        ? '<br><br>Baris ini <b>sudah dinilai</b>. Bisyaroh glondongan pengujinya ikut berkurang di slip yang belum digenerate.'
        : '') +
      '<br><br>Tidak bisa di-undo.',
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  hapusId.value = String(r.id)
  try {
    await hapus(r.id)
    toast.success('Baris glondongan dihapus')
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  } finally {
    hapusId.value = ''
  }
}
const settingsStore = useSettingsStore()

// Tab awal: koordinator/PJ/super -> Penugasan; selain itu -> Tugas Menilai.
const tab = ref(canAssignAny.value ? 'penugasan' : 'nilai')

// ── Guru PTPT aktif (kandidat penguji) + santri (map guru kelas utk tab Catatan) ──
const guruRaw = ref([])
const santriRaw = ref([])
let unsubG = null
let unsubS = null
onMounted(() => {
  unsubG = subscribeColl('guru', (docs) => (guruRaw.value = docs || []))
  unsubS = subscribeColl('santri', (docs) => (santriRaw.value = docs || []))
  settingsStore.subscribe() // idempotent — untuk tarif bisyaroh glondongan (tab Rekap)
})
onUnmounted(() => {
  if (unsubG) unsubG()
  if (unsubS) unsubS()
})
const guruPtpt = computed(() =>
  (guruRaw.value || [])
    .filter(
      (g) =>
        isGuruAktif(g) &&
        String(g.lembaga || '')
          .trim()
          .toUpperCase() === 'PTPT'
    )
    .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
)

// v.1.1.9: kandidat penguji disaring ke PENYIMAK kategori baris ini (Kyai 21 Jul).
//   Sebelumnya SIAPA PUN guru PTPT aktif bisa ditunjuk — tanpa pembatas sama sekali.
//   `bukaSemua` = jalan keluar kalau daftar penyimak belum diisi / butuh guru lain
//   mendadak, supaya penugasan tak pernah macet total.
const bukaSemuaGuru = ref({}) // { [rowId]: true }

// v.1.2.0 (Kyai): guru kelas santri itu sendiri BOLEH menyimak glondongan santrinya.
//   Dibatasi ke guru PTPT aktif — RLS `tes_glondongan_upd` mensyaratkan penguji
//   terpasang juga `auth_guru_di_lembaga('PTPT')`, jadi menawarkan guru non-PTPT
//   hanya akan berujung 403 saat dia menyimpan nilai.
function guruKelasPtptSantri(santriId) {
  const nama = new Set(guruKelasSantri(santriId).map((g) => g.nama.toLowerCase()))
  return guruPtpt.value.filter((g) =>
    nama.has(
      String(g.nama || '')
        .trim()
        .toLowerCase()
    )
  )
}

// Pilihan penguji, dikelompokkan supaya koordinator paham asal-usul tiap nama.
// DASAR = sebelum saringan "sedang bertugas" (aturan asal-usul, v.1.1.9).
function pengujiGroupsDasar(row) {
  if (bukaSemuaGuru.value[row.id]) return [{ label: 'Semua guru PTPT', guru: guruPtpt.value }]
  const kelas = guruKelasPtptSantri(row.santri_id)
  const idKelas = new Set(kelas.map((g) => String(g.id)))
  const terdaftar = guruPtpt.value.filter(
    (g) => bolehMenyimak(g.id, row) && !idKelas.has(String(g.id))
  )
  const groups = []
  if (terdaftar.length) groups.push({ label: `Penyimak ${kategoriLabel(row)}`, guru: terdaftar })
  if (kelas.length) groups.push({ label: 'Guru kelas santri ini', guru: kelas })
  // Belum ada penyimak terdaftar & santri tanpa guru kelas -> jangan buntu.
  return groups.length ? groups : [{ label: 'Semua guru PTPT', guru: guruPtpt.value }]
}

// v.1.2.1 (Kyai 22 Jul): guru yang masih memegang blok glondongan BELUM SELESAI
//   tak ditawarkan lagi. Dihitung dari SELURUH baris (RLS select = semua staf),
//   jadi blok di luar scope koordinator ini pun ikut membuat gurunya "sibuk".
const tugasAktifPeta = computed(() => hitungTugasAktif(rows.value))
function tugasAktif(g) {
  return jumlahTugasAktif(g, tugasAktifPeta.value)
}
function labelPenguji(g) {
  const n = tugasAktif(g)
  return n ? `${g.nama} · sedang menyimak ${n} blok` : g.nama
}

function pengujiGroups(row) {
  // `bukaSemua` = jalan keluar sadar: tampilkan juga yang sedang bertugas, tapi
  // dengan label jumlah bloknya supaya dobel-tugas tak pernah terjadi diam-diam.
  if (bukaSemuaGuru.value[row.id]) return pengujiGroupsDasar(row)
  return pengujiGroupsDasar(row)
    .map((grp) => ({ ...grp, guru: grp.guru.filter((g) => !tugasAktif(g)) }))
    .filter((grp) => grp.guru.length)
}

// Berapa kandidat yang disembunyikan karena sedang bertugas (keterangan di UI).
function sibukTersembunyi(row) {
  if (bukaSemuaGuru.value[row.id]) return 0
  const ids = new Set()
  for (const grp of pengujiGroupsDasar(row)) {
    for (const g of grp.guru) if (tugasAktif(g)) ids.add(String(g.id))
  }
  return ids.size
}
// Daftar penyimak kategori ini memang kosong? (bedakan dari "sengaja dibuka semua")
function penyimakKosong(row) {
  return !guruPtpt.value.some((g) => bolehMenyimak(g.id, row))
}

// ── v.1.1.9: kontak (Kyai 21 Jul) — "tugas menyimak glondongan saya ingin tertera
//    no WA penyimak, guru kelas, dan santri."
//    Kartu Penugasan  -> penyimak + WA-nya (koordinator gampang menghubungi).
//    Kartu Tugas Menilai -> guru kelas santri + WA-nya (penyimak koordinasi ke sana).
const guruByNama = computed(() => {
  const m = new Map()
  for (const g of guruRaw.value || []) {
    const n = String(g.nama || '')
      .trim()
      .toLowerCase()
    if (n) m.set(n, g)
  }
  return m
})
const santriById = computed(() => {
  const m = new Map()
  for (const s of santriRaw.value || []) m.set(String(s.id), s)
  return m
})
function guruDariNama(nama) {
  return (
    guruByNama.value.get(
      String(nama || '')
        .trim()
        .toLowerCase()
    ) || null
  )
}
/**
 * v.1.2.1 (Kyai 22 Jul): NAMA PJ PTPT santri baris ini. Ada >1 PJ, jadi koordinator
 *   perlu tahu blok ini di bawah PJ siapa sebelum menunjuk penyimak.
 *   PJ diturunkan dari guru pengajar santri via peta pj_guru (label pj_ptpt cadangan) —
 *   satu sumber dengan scope isAmpuanSaya, jadi label & scope tak mungkin beda.
 */
const petaPjSantri = computed(() => buatPetaPjSantri(santriRaw.value, guruRaw.value, pjGuru.value))
function pjSantri(row) {
  return String(petaPjSantri.value.get(String(row?.santri_id)) || '').trim()
}
/** Guru kelas (pagi & sore) santri baris ini -> [{ nama, wa }]. */
function guruKelasSantri(santriId) {
  const s = santriById.value.get(String(santriId))
  if (!s) return []
  const nama = [s.guru_pagi, s.guru_sore, s.guru].map((x) => String(x || '').trim()).filter(Boolean)
  const unik = [...new Set(nama)]
  return unik.map((n) => ({ nama: n, wa: guruDariNama(n)?.wa || '' }))
}
/** Penyimak baris ini -> { nama, wa }. Cari guru by id dulu, jatuh ke nama. */
function penyimakBaris(row) {
  const byId = (guruRaw.value || []).find((g) => String(g.id) === String(row?.penguji_id || ''))
  const g = byId || guruDariNama(row?.penguji_nama)
  return { nama: row?.penguji_nama || g?.nama || '—', wa: g?.wa || '' }
}

// v.1.1.9: baris yatim = ajuan tesnya sudah dihapus. Sejak cascade dipasang tak akan
//   ada yang baru; tombol ini untuk membersihkan sisa penghapusan LAMA. Baris yatim
//   sudah otomatis tak tampil & tak ikut Rekap Bisyaroh — ini sekadar merapikan DB.
const bersihBusy = ref(false)
async function bersihkanYatimKlik() {
  const n = barisYatim.value.length
  if (!n) return
  const ok = await confirmDlg({
    title: 'Bersihkan baris glondongan yatim?',
    message:
      `<b>${n} baris</b> glondongan tak lagi punya ajuan tes (tesnya sudah dihapus).` +
      '<br><br>Baris ini sudah tidak tampil & tidak ikut dihitung bisyaroh. Menghapusnya hanya merapikan data.' +
      '<br><br>Tidak bisa di-undo.',
    confirmText: 'Bersihkan',
    danger: true
  })
  if (!ok) return
  bersihBusy.value = true
  try {
    const n2 = await bersihkanYatim()
    toast.success(`${n2} baris yatim dibersihkan`)
  } catch (e) {
    toast.error('Gagal membersihkan: ' + (e.message || e))
  } finally {
    bersihBusy.value = false
  }
}

// Konteks peran (ditampilkan di header Penugasan).
const scopeLabel = computed(() => {
  if (isSuper.value) return 'Super Admin — semua kategori'
  const ks = myKategori.value
  const bagian = []
  // v.1.1.9: PJ tak lagi "semua kategori" — dibatasi ke santri ampuannya (pj_ptpt).
  if (isPjPtpt.value) bagian.push('PJ PTPT — santri ampuan')
  if (ks.length) bagian.push('Koordinator ' + ks.map((k) => KATEGORI_LABEL[k]).join(' & '))
  return bagian.length ? bagian.join(' · ') : 'Tanpa scope penugasan'
})

// Label kategori ('Ma’had'/'Selain Ma’had') dari baris glondongan (baris.mukim).
function kategoriLabel(row) {
  return KATEGORI_LABEL[row && row.mukim ? 'mahad' : 'nonmahad']
}

// ── Aksi tugaskan ──
const pick = ref({}) // { [rowId]: guruId }
const savingId = ref('')
async function assign(row) {
  const guruId = pick.value[row.id]
  if (!guruId) {
    toast.warning('Pilih guru penguji dulu')
    return
  }
  const g = guruPtpt.value.find((x) => String(x.id) === String(guruId))
  if (!g) {
    toast.warning('Guru tidak ditemukan')
    return
  }
  // v.1.2.1: guru bisa baru kebagian blok lain (realtime) SESUDAH dipilih — namanya
  //   lenyap dari dropdown tapi pilihannya masih tersimpan di `pick`. Tahan di sini.
  if (!bukaSemuaGuru.value[row.id] && tugasAktif(g)) {
    toast.warning(`${g.nama} sedang menyimak blok lain — pilih guru lain`)
    delete pick.value[row.id]
    return
  }
  savingId.value = row.id
  try {
    await tugaskan(row.id, { id: g.id, nama: g.nama })
    toast.success(`Blok ${juzLabel(row)} ditugaskan ke ${g.nama}`)
    delete pick.value[row.id]
  } catch (e) {
    toast.error('Gagal menugaskan: ' + (e.message || e))
  } finally {
    savingId.value = ''
  }
}

function juzLabel(row) {
  return row.juz_dari === row.juz_sampai
    ? `Juz ${row.juz_dari}`
    : `Juz ${row.juz_dari}–${row.juz_sampai}`
}

// v.1.1.9: lepas penugasan → blok kembali ke antrian 'menunggu'.
const batalId = ref('')
async function batalTugasRow(row) {
  batalId.value = String(row.id)
  try {
    await batalTugas(row.id)
    toast.success('Penugasan dibatalkan — blok kembali ke antrian')
  } catch (e) {
    toast.error('Gagal membatalkan: ' + (e.message || e))
  } finally {
    batalId.value = ''
  }
}

// ── Tab Tugas Menilai: input nilai per juz + catatan ──
const PTPT_ASPEK = tesAspekFlat({ lembaga: 'PTPT' }) // [{ key, label }]
const NILAI_MAX = TES_NILAI_MAX
const openId = ref('') // baris yang terbuka (accordion)
const drafts = ref({}) // { [rowId]: { nilai: {<juz>:{aspek:val}}, catatan } }
const savingNilaiId = ref('')

function tipeLabel(row) {
  return row.tipe === 'berjalan' ? 'Review juz berjalan' : 'Glondongan'
}

function toggleNilai(row) {
  if (openId.value === row.id) {
    openId.value = ''
    return
  }
  openId.value = row.id
  if (!drafts.value[row.id]) {
    const nilai = {}
    for (const j of row.juz || []) {
      nilai[j] = {}
      for (const a of PTPT_ASPEK) {
        const cur = row.nilai && row.nilai[j] ? row.nilai[j][a.key] : undefined
        nilai[j][a.key] = cur === undefined || cur === null ? '' : cur
      }
    }
    drafts.value[row.id] = { nilai, catatan: row.catatan || '' }
  }
}

async function saveNilai(row) {
  const d = drafts.value[row.id]
  if (!d) return
  const nilai = {}
  for (const j of row.juz || []) {
    const per = {}
    for (const a of PTPT_ASPEK) {
      const v = clampNilaiTes(d.nilai?.[j]?.[a.key])
      if (v !== null) per[a.key] = v
    }
    if (Object.keys(per).length) nilai[j] = per
  }
  savingNilaiId.value = row.id
  try {
    await simpanNilai(row.id, nilai, d.catatan)
    toast.success('Nilai tersimpan — blok selesai')
    openId.value = ''
  } catch (e) {
    toast.error('Gagal simpan nilai: ' + (e.message || e))
  } finally {
    savingNilaiId.value = ''
  }
}

// ── Tab Catatan: evaluasi per santri ──
//   super_admin : semua santri.
//   PJ PTPT     : santri AMPUANNYA saja (pj_ptpt = namanya) — v.1.1.9, dulu semua.
//   Guru kelas  : santri kelasnya.
//   PJ yang juga pegang kelas dapat gabungan keduanya.
const canSeeAllCatatan = computed(() => isSuper.value)
const catatanSearch = ref('')

// santri.id yang guru kelasnya = saya (match nama guru_pagi/sore/guru).
const mySantriIds = computed(() => {
  const me = myNama.value.toLowerCase()
  const ids = new Set()
  if (!me) return ids
  for (const s of santriRaw.value || []) {
    const guru = [s.guru_pagi, s.guru_sore, s.guru].map((x) =>
      String(x || '')
        .toLowerCase()
        .trim()
    )
    if (guru.includes(me)) ids.add(String(s.id))
  }
  return ids
})

// Boleh lihat catatan santri ini? (gabungan hak guru kelas + hak PJ atas ampuannya)
function bolehLihatCatatan(santriId) {
  if (canSeeAllCatatan.value) return true
  if (mySantriIds.value.has(String(santriId))) return true
  return isPjPtpt.value && isAmpuanSaya.value(santriId)
}

const catatanGroups = computed(() => {
  const daftar = (rows.value || []).filter((r) => bolehLihatCatatan(r.santri_id))
  const map = {}
  for (const r of daftar) {
    const sid = String(r.santri_id)
    if (!map[sid]) map[sid] = { santri_id: sid, nama: r.nama_cache || '—', rows: [] }
    map[sid].rows.push(r)
  }
  let groups = Object.values(map).map((g) => ({
    ...g,
    rows: g.rows.slice().sort((a, b) => (a.kelas_asal || 0) - (b.kelas_asal || 0))
  }))
  const kw = catatanSearch.value.trim().toLowerCase()
  if (kw) groups = groups.filter((g) => g.nama.toLowerCase().includes(kw))
  return groups.sort((a, b) => String(a.nama).localeCompare(String(b.nama), 'id'))
})

const STATUS_BADGE = {
  menunggu: {
    label: 'Menunggu penugasan',
    cls: 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
  },
  ditugaskan: {
    label: 'Belum dinilai',
    cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
  },
  selesai: {
    label: 'Selesai',
    cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
  }
}
function statusBadge(s) {
  return STATUS_BADGE[s] || STATUS_BADGE.menunggu
}
function nilaiJuzText(nilaiJuz) {
  if (!nilaiJuz) return ''
  return PTPT_ASPEK.map((a) => `${a.label} ${nilaiJuz[a.key] ?? '–'}`).join(' · ')
}

// ── Tab Peran (super_admin): KOORDINATOR & PENYIMAK, masing-masing baris
//    [pilih guru ▾] [cakupan ▾]. Kyai 21 Jul 2026: "Pemilihan kordinator glondongan
//    pakai dropdown saja" + "yg menyimak glondongan juga harus dipilih, untuk ma'had
//    atau selainnya. jadi bukan hanya kordinator."
//    Bentuk SIMPAN di DB tetap map per kategori → data koordinator lama tetap terbaca.
const koorRows = ref([]) // [{ guru_id, cakupan }]
const penyimakRows = ref([])
const savingKoor = ref(false)

// Sinkronkan draft tiap map dari master/lembaga berubah (realtime / muat awal).
watch(
  koordinatorGlondongan,
  (m) => {
    koorRows.value = peranKeBaris(m)
  },
  { immediate: true, deep: true }
)
watch(
  penyimakGlondongan,
  (m) => {
    penyimakRows.value = peranKeBaris(m)
  },
  { immediate: true, deep: true }
)

function tambahBaris(rows) {
  rows.push({ guru_id: '', cakupan: 'both' })
}
function hapusBaris(rows, i) {
  rows.splice(i, 1)
}
// Guru yang sudah dipakai baris LAIN — disembunyikan supaya tak ada baris kembar.
function guruTersedia(rows, i) {
  const dipakai = new Set(rows.filter((_, idx) => idx !== i).map((r) => String(r.guru_id || '')))
  return guruPtpt.value.filter((g) => !dipakai.has(String(g.id)))
}

// ── v.1.2.1: Pembagian Santri per PJ (Kyai 22 Jul) — tiap PJ punya daftar GURU;
//    santri ikut PJ dari gurunya. Draft { [pjId]: [guruId] } disinkronkan dari peta.
const pjGuruDraft = ref({})
watch(
  pjGuru,
  (m) => {
    const out = {}
    for (const [k, v] of Object.entries(m || {})) out[k] = (Array.isArray(v) ? v : []).map(String)
    pjGuruDraft.value = out
  },
  { immediate: true, deep: true }
)
// Kandidat PJ = guru PTPT aktif yang jabatannya MENYEBUT PTPT ('PJ PTPT'/'Kepala PTPT').
// v.1.2.2 (Kyai 22 Jul): dulu cukup ada kata 'kepala|pj|pengasuh', sehingga Kepala
//   lembaga LAIN yang ditempatkan di PTPT ikut terdaftar sebagai PJ PTPT.
const pjPtptList = computed(() => guruPtpt.value.filter((g) => isPjLembaga(g, PTPT_LEMBAGA)))
function guruDiPj(pjId, guruId) {
  return (pjGuruDraft.value[String(pjId)] || []).map(String).includes(String(guruId))
}
// PJ lain (nama) yang sedang memegang guru ini — untuk keterangan "pindah".
function pjLainDariGuru(pjId, guruId) {
  for (const [k, gids] of Object.entries(pjGuruDraft.value)) {
    if (String(k) === String(pjId)) continue
    if ((gids || []).map(String).includes(String(guruId))) {
      return guruPtpt.value.find((g) => String(g.id) === String(k))?.nama || 'PJ lain'
    }
  }
  return ''
}
// Centang/lepas — satu guru cuma boleh di bawah SATU PJ, jadi mencentang di sini
//   otomatis melepasnya dari PJ mana pun sebelumnya.
function toggleGuruPj(pjId, guruId) {
  const gid = String(guruId)
  const wasHere = guruDiPj(pjId, gid)
  const draft = {}
  for (const [k, gids] of Object.entries(pjGuruDraft.value)) {
    draft[k] = (gids || []).map(String).filter((x) => x !== gid)
  }
  if (!wasHere) {
    const key = String(pjId)
    draft[key] = [...(draft[key] || []), gid]
  }
  pjGuruDraft.value = draft
}

async function savePeranSemua() {
  savingKoor.value = true
  try {
    await savePeran({
      koordinator: barisKePeran(koorRows.value),
      penyimak: barisKePeran(penyimakRows.value),
      pjGuru: pjGuruDraft.value
    })
    toast.success('Peran glondongan tersimpan')
  } catch (e) {
    toast.error('Gagal simpan peran: ' + (e.message || e))
  } finally {
    savingKoor.value = false
  }
}

// ── Tab Rekap Bisyaroh (admin_keuangan / super_admin): Σ juz selesai × tarif per guru/bulan ──
const canRekap = computed(
  () => isSuper.value || String(sesi.value?.role_sistem || '') === 'admin_keuangan'
)
const tarifPerJuz = computed(() => Number(settingsStore.settings?.keu_glondongan_per_juz) || 0)
const rekapBulan = ref(periodeBulan()) // 'YYYY-MM'

function fmtRp(n) {
  return 'Rp ' + (Number(n) || 0).toLocaleString('id-ID')
}

// Label bulan 'YYYY-MM' → 'Juli 2026' (judul PDF & keterangan layar).
function labelBulan(ym) {
  const [y, m] = String(ym || '').split('-')
  const i = Number(m) - 1
  return BULAN_ID[i] ? `${BULAN_ID[i]} ${y}` : String(ym || '-')
}

// Agregasi per penguji untuk bulan terpilih — util murni (utils/glondongan), dipakai
//   BERSAMA oleh Rekap Bisyaroh & Rekap Penyimak supaya angkanya tak mungkin beda.
const agregatPenyimak = computed(() => agregatPenyimakGlondongan(rows.value, rekapBulan.value))
const byNamaId = (a, b) => String(a.nama).localeCompare(String(b.nama), 'id')

const rekapRows = computed(() =>
  agregatPenyimak.value
    .map((g) => ({ ...g, total: g.juz * tarifPerJuz.value }))
    .sort((a, b) => b.total - a.total || byNamaId(a, b))
)
const rekapTotal = computed(() => rekapRows.value.reduce((s, g) => s + g.total, 0))

// ── Tab Rekap Penyimak (koordinator/PJ/super + admin_keuangan): TANPA nominal ──
// v.1.2.1 (Kyai 22 Jul): koordinator perlu melihat capaian penyimak, tapi tarif
//   bisyaroh bukan urusannya — jadi tabel yang sama tanpa kolom rupiah.
const canRekapPenyimak = computed(() => canAssignAny.value || canRekap.value)
const rekapPenyimakRows = computed(() =>
  [...agregatPenyimak.value].sort((a, b) => b.juz - a.juz || b.blok - a.blok || byNamaId(a, b))
)
const rekapPenyimakTotal = computed(() => totalPenyimakGlondongan(agregatPenyimak.value))

// ── Ekspor PDF (pola sama dg Rekap Absensi Guru: judul + autoTable + saveBlob) ──
async function cetakPdf({ judul, subjudul, columns, body, foot, namaFile }) {
  const jsPDF = await jsPDFFromCDN()
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
  doc.setFontSize(11)
  doc.text(judul, 40, 28)
  doc.setFontSize(8)
  doc.text(subjudul, 40, 42)
  doc.autoTable({
    head: [columns.map((c) => c.header)],
    body,
    foot: foot ? [foot] : undefined,
    startY: 54,
    styles: { fontSize: 8, cellPadding: 3 },
    columnStyles: Object.fromEntries(
      columns.map((c, i) => [i, { halign: c.align || 'left', cellWidth: c.width || 'auto' }])
    ),
    headStyles: { fillColor: [13, 148, 136], textColor: 255, fontStyle: 'bold' },
    footStyles: { fillColor: [241, 245, 249], textColor: 30, fontStyle: 'bold' }
  })
  const { saveBlob } = await import('@/composables/useNativeDownload')
  await saveBlob(doc.output('blob'), namaFile)
}

const KOLOM_PENYIMAK = [
  { key: 'no', header: 'No', align: 'center', width: 28 },
  { key: 'nama', header: 'Guru Penyimak' },
  { key: 'blok', header: 'Blok', align: 'center', width: 45 },
  { key: 'juz', header: 'Juz', align: 'center', width: 45 },
  { key: 'santri', header: 'Santri', align: 'center', width: 45 }
]

async function exportRekapPenyimakPdf() {
  if (!rekapPenyimakRows.value.length) {
    toast.warning('Tidak ada data untuk diekspor')
    return
  }
  try {
    const t = rekapPenyimakTotal.value
    await cetakPdf({
      judul: `REKAP PENYIMAK GLONDONGAN PTPT — ${labelBulan(rekapBulan.value).toUpperCase()}`,
      subjudul: `${rekapPenyimakRows.value.length} penyimak · ${t.blok} blok · ${t.juz} juz · ${t.santri} santri`,
      columns: KOLOM_PENYIMAK,
      body: rekapPenyimakRows.value.map((g, i) => [i + 1, g.nama, g.blok, g.juz, g.santri]),
      foot: ['', 'Total', t.blok, t.juz, t.santri],
      namaFile: `Rekap_Penyimak_Glondongan_${rekapBulan.value}.pdf`
    })
    toast.success('PDF berhasil di-ekspor')
  } catch (e) {
    toast.error('Gagal ekspor PDF: ' + (e.message || e))
  }
}

async function exportRekapBisyarohPdf() {
  if (!rekapRows.value.length) {
    toast.warning('Tidak ada data untuk diekspor')
    return
  }
  try {
    await cetakPdf({
      judul: `REKAP BISYAROH GLONDONGAN PTPT — ${labelBulan(rekapBulan.value).toUpperCase()}`,
      subjudul: `Tarif ${fmtRp(tarifPerJuz.value)} / juz disimak · ${rekapRows.value.length} penguji`,
      // header kolom nama disamakan dengan tabel layarnya sendiri ("Guru Penguji")
      columns: [
        ...KOLOM_PENYIMAK.map((c) => (c.key === 'nama' ? { ...c, header: 'Guru Penguji' } : c)),
        { key: 'total', header: 'Bisyaroh', align: 'right', width: 80 }
      ],
      body: rekapRows.value.map((g, i) => [i + 1, g.nama, g.blok, g.juz, g.santri, fmtRp(g.total)]),
      foot: [
        '',
        'Total',
        rekapPenyimakTotal.value.blok,
        rekapPenyimakTotal.value.juz,
        rekapPenyimakTotal.value.santri,
        fmtRp(rekapTotal.value)
      ],
      namaFile: `Rekap_Bisyaroh_Glondongan_${rekapBulan.value}.pdf`
    })
    toast.success('PDF berhasil di-ekspor')
  } catch (e) {
    toast.error('Gagal ekspor PDF: ' + (e.message || e))
  }
}
</script>

<template>
  <div class="p-3 md:p-5 space-y-4">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <h1 class="text-lg md:text-xl font-black text-[var(--text-primary)]">
        <i class="fas fa-people-arrows text-teal-500 mr-2"></i>Glondongan PTPT
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        Muroja'ah kumulatif sebelum tes kenaikan juz. Nilai di sini
        <b>tidak masuk rapor</b> — catatan evaluasi saja.
      </p>
    </div>

    <!-- Tab bar -->
    <div class="flex gap-2 flex-wrap">
      <button
        v-if="canAssignAny"
        type="button"
        :class="[
          'px-3 py-2 text-xs font-bold rounded-lg border transition',
          tab === 'penugasan'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-default)]'
        ]"
        @click="tab = 'penugasan'"
      >
        <i class="fas fa-user-plus mr-1"></i>Penugasan
        <span
          v-if="antrianTugas.length"
          class="ml-1 px-1.5 rounded-full bg-amber-500 text-white text-[10px]"
          >{{ antrianTugas.length }}</span
        >
      </button>
      <button
        type="button"
        :class="[
          'px-3 py-2 text-xs font-bold rounded-lg border transition',
          tab === 'nilai'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-default)]'
        ]"
        @click="tab = 'nilai'"
      >
        <i class="fas fa-pen-to-square mr-1"></i>Tugas Menilai
      </button>
      <button
        type="button"
        :class="[
          'px-3 py-2 text-xs font-bold rounded-lg border transition',
          tab === 'catatan'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-default)]'
        ]"
        @click="tab = 'catatan'"
      >
        <i class="fas fa-clipboard-list mr-1"></i>Catatan
      </button>
      <button
        v-if="isSuper"
        type="button"
        :class="[
          'px-3 py-2 text-xs font-bold rounded-lg border transition',
          tab === 'koordinator'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-default)]'
        ]"
        @click="tab = 'koordinator'"
      >
        <i class="fas fa-user-gear mr-1"></i>Peran
      </button>
      <!-- v.1.2.1 (Kyai): rekap capaian penyimak — koordinator/PJ ikut boleh lihat -->
      <button
        v-if="canRekapPenyimak"
        type="button"
        :class="[
          'px-3 py-2 text-xs font-bold rounded-lg border transition',
          tab === 'rekappenyimak'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-default)]'
        ]"
        @click="tab = 'rekappenyimak'"
      >
        <i class="fas fa-chart-simple mr-1"></i>Rekap Penyimak
      </button>
      <button
        v-if="canRekap"
        type="button"
        :class="[
          'px-3 py-2 text-xs font-bold rounded-lg border transition',
          tab === 'rekap'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-default)]'
        ]"
        @click="tab = 'rekap'"
      >
        <i class="fas fa-money-bill-wave mr-1"></i>Rekap Bisyaroh
      </button>
    </div>

    <!-- ── TAB: PENUGASAN ── -->
    <div
      v-if="tab === 'penugasan'"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-list-check text-teal-600 mr-1"></i>Antrian Penugasan
        </h3>
        <span class="text-[11px] font-bold text-teal-700 dark:text-teal-300">{{ scopeLabel }}</span>
      </div>

      <div v-if="!loaded" class="text-xs italic text-[var(--text-tertiary)] py-6 text-center">
        <i class="fas fa-spinner fa-spin mr-1"></i>Memuat…
      </div>
      <div
        v-else-if="!canAssignAny"
        class="text-xs italic text-[var(--text-tertiary)] py-6 text-center"
      >
        <i class="fas fa-lock text-2xl block mb-2 text-[var(--border-default)]"></i>
        Anda bukan koordinator kelas / PJ PTPT.
      </div>
      <div
        v-else-if="antrianTugas.length === 0"
        class="text-xs italic text-[var(--text-tertiary)] py-6 text-center"
      >
        <i class="fas fa-inbox text-2xl block mb-2 text-[var(--border-default)]"></i>
        Tidak ada blok yang menunggu penugasan.
      </div>

      <ul v-else class="space-y-2">
        <li
          v-for="row in antrianTugas"
          :key="row.id"
          class="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)]"
        >
          <div class="flex items-start justify-between gap-2 flex-wrap">
            <div class="min-w-0">
              <p
                class="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5 flex-wrap"
              >
                <span class="truncate">{{ row.nama_cache || '—' }}</span>
                <span
                  :class="[
                    'px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0',
                    row.mukim
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  ]"
                  >{{ kategoriLabel(row) }}</span
                >
                <!-- v.1.2.1 (Kyai): label PJ PTPT — ada >1 PJ, koordinator perlu tahu blok ini
                     milik PJ siapa. Sembunyi bila santri belum berlabel PJ. -->
                <span
                  v-if="pjSantri(row)"
                  class="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
                  >PJ: {{ pjSantri(row) }}</span
                >
              </p>
              <p class="text-[11px] text-[var(--text-secondary)]">
                Blok <b class="text-teal-700 dark:text-teal-300">Kelas {{ row.kelas_asal }}</b> ·
                {{ juzLabel(row) }}
                <span class="text-[var(--text-tertiary)]">· utk tes Juz {{ row.juz_target }}</span>
              </p>
              <!-- v.1.2.0 (Kyai): guru kelas ditampilkan sejak di ANTRIAN, supaya
                   koordinator tahu siapa pengampunya sebelum menunjuk penyimak. -->
              <p class="text-[10px] mt-0.5 flex items-center gap-1 flex-wrap">
                <span class="text-[var(--text-tertiary)]">Guru kelas:</span>
                <template v-if="guruKelasSantri(row.santri_id).length">
                  <span
                    v-for="g in guruKelasSantri(row.santri_id)"
                    :key="g.nama"
                    class="inline-flex items-center gap-1"
                  >
                    <b class="text-[var(--text-secondary)]">{{ g.nama }}</b>
                    <a
                      v-if="waLink(g.wa)"
                      :href="waLink(g.wa)"
                      target="_blank"
                      rel="noopener"
                      class="px-1 py-0.5 rounded font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300"
                      :aria-label="`WhatsApp ${g.nama}`"
                    >
                      <i class="fab fa-whatsapp"></i>
                    </a>
                  </span>
                </template>
                <span v-else class="italic text-[var(--text-tertiary)]">—</span>
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <select
              v-model="pick[row.id]"
              class="flex-1 min-w-0 px-2.5 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)] cursor-pointer"
            >
              <option value="">
                {{
                  pengujiGroups(row).length
                    ? '— pilih guru penguji —'
                    : '— tak ada penyimak yang senggang —'
                }}
              </option>
              <optgroup v-for="grp in pengujiGroups(row)" :key="grp.label" :label="grp.label">
                <option v-for="g in grp.guru" :key="g.id" :value="g.id">
                  {{ labelPenguji(g) }}
                </option>
              </optgroup>
            </select>
            <button
              type="button"
              :disabled="savingId === row.id || !pick[row.id]"
              class="px-3 py-2 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 whitespace-nowrap"
              @click="assign(row)"
            >
              <i :class="['fas mr-1', savingId === row.id ? 'fa-spinner fa-spin' : 'fa-check']"></i
              >Tugaskan
            </button>
            <!-- v.1.1.9: hapus blok yang salah terbentuk (super_admin) -->
            <button
              v-if="canCrud"
              type="button"
              :disabled="hapusId === String(row.id)"
              title="Hapus blok ini (super admin)"
              aria-label="Hapus blok glondongan"
              class="shrink-0 px-2.5 py-2 text-xs font-bold rounded-lg border border-[var(--border-default)] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 disabled:opacity-40"
              @click="hapusRow(row)"
            >
              <i
                :class="['fas', hapusId === String(row.id) ? 'fa-spinner fa-spin' : 'fa-trash']"
              ></i>
            </button>
          </div>
          <!-- v.1.2.1 (Kyai): guru yang masih memegang blok belum selesai disembunyikan.
               Disebutkan JUMLAHNYA supaya hilangnya nama tidak terasa misterius. -->
          <p
            v-if="sibukTersembunyi(row)"
            class="text-[10px] mt-1 text-[var(--text-tertiary)] italic"
          >
            <i class="fas fa-user-clock mr-1"></i><b>{{ sibukTersembunyi(row) }} guru</b> tak
            ditampilkan — masih menyimak blok yang belum selesai.
          </p>
          <!-- v.1.1.9: keterangan saringan penyimak -->
          <p v-if="penyimakKosong(row)" class="text-[10px] mt-1 text-amber-600 dark:text-amber-400">
            <i class="fas fa-triangle-exclamation mr-1"></i>Belum ada penyimak
            {{ kategoriLabel(row) }} terdaftar — semua guru PTPT ditampilkan. Atur di tab
            <b>Peran</b>.
          </p>
          <!-- Jalan keluar: SELALU tersedia (dulu tersembunyi saat belum ada penyimak
               terdaftar) — kalau tidak, penugasan bisa buntu total ketika semua kandidat
               sedang bertugas. -->
          <p class="text-[10px] mt-1">
            <button
              v-if="!bukaSemuaGuru[row.id]"
              type="button"
              class="text-[var(--text-tertiary)] hover:underline"
              @click="bukaSemuaGuru[row.id] = true"
            >
              <template v-if="penyimakKosong(row)">
                Tampilkan juga guru yang sedang bertugas
              </template>
              <template v-else>
                Hanya penyimak {{ kategoriLabel(row) }} yang senggang · tampilkan semua guru PTPT
              </template>
            </button>
            <button
              v-else
              type="button"
              class="text-[var(--text-tertiary)] hover:underline"
              @click="bukaSemuaGuru[row.id] = false"
            >
              Menampilkan semua guru PTPT (termasuk yang sedang bertugas) · kembali ke penyimak
              {{ kategoriLabel(row) }} yang senggang
            </button>
          </p>
        </li>
      </ul>
      <p
        v-if="guruPtpt.length === 0 && canAssignAny"
        class="text-[10px] text-amber-600 dark:text-amber-400 mt-3"
      >
        <i class="fas fa-triangle-exclamation mr-1"></i>Belum ada guru PTPT aktif untuk dipilih.
      </p>

      <!-- v.1.1.9: blok yang belum gilirannya sengaja DISEMBUNYIKAN (Kyai: kelas 1 dulu,
           setelah lulus baru kelas 2). Tanpa keterangan ini blok terasa hilang. -->
      <p
        v-if="antrianTertunda.length"
        class="mt-3 text-[10px] text-[var(--text-tertiary)] italic border-t border-[var(--border-subtle)] pt-2"
      >
        <i class="fas fa-lock mr-1"></i><b>{{ antrianTertunda.length }} blok</b> belum ditampilkan —
        menunggu blok kelas sebelumnya selesai disimak. Glondongan dikerjakan berurutan dari kelas
        terkecil.
      </p>

      <!-- v.1.1.9: blok yang sudah punya penyimak — beserta kontaknya. Dulu tab ini
           hanya menampilkan yang 'menunggu', jadi tak ada tempat melihat siapa
           penyimaknya, apalagi menghubunginya. -->
      <div v-if="sudahDitugaskan.length" class="mt-5 pt-4 border-t border-[var(--border-subtle)]">
        <h4 class="text-xs font-black text-[var(--text-primary)] mb-2">
          <i class="fas fa-user-check text-teal-600 mr-1"></i>Sudah Ditugaskan ({{
            sudahDitugaskan.length
          }})
        </h4>
        <ul class="space-y-2">
          <li
            v-for="row in sudahDitugaskan"
            :key="row.id"
            class="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)]"
          >
            <p
              class="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5 flex-wrap"
            >
              <span class="truncate">{{ row.nama_cache || '—' }}</span>
              <!-- v.1.2.1 (Kyai): label PJ PTPT juga di daftar sudah-ditugaskan, biar konsisten. -->
              <span
                v-if="pjSantri(row)"
                class="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
                >PJ: {{ pjSantri(row) }}</span
              >
            </p>
            <p class="text-[11px] text-[var(--text-secondary)]">
              Blok <b class="text-teal-700 dark:text-teal-300">Kelas {{ row.kelas_asal }}</b> ·
              {{ juzLabel(row) }} · {{ kategoriLabel(row) }}
            </p>

            <!-- Penyimak + WA -->
            <p class="text-[11px] mt-1.5 flex items-center gap-1.5 flex-wrap">
              <span class="text-[var(--text-tertiary)]">Penyimak:</span>
              <b class="text-[var(--text-primary)]">{{ penyimakBaris(row).nama }}</b>
              <a
                v-if="waLink(penyimakBaris(row).wa)"
                :href="waLink(penyimakBaris(row).wa)"
                target="_blank"
                rel="noopener"
                class="px-1.5 py-0.5 rounded font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300"
              >
                <i class="fab fa-whatsapp mr-1"></i>{{ penyimakBaris(row).wa }}
              </a>
              <span v-else class="text-[10px] italic text-[var(--text-tertiary)]"
                >(no WA belum diisi)</span
              >
            </p>

            <!-- Guru kelas santri + WA -->
            <p class="text-[11px] mt-1 flex items-center gap-1.5 flex-wrap">
              <span class="text-[var(--text-tertiary)]">Guru kelas:</span>
              <template v-if="guruKelasSantri(row.santri_id).length">
                <span
                  v-for="g in guruKelasSantri(row.santri_id)"
                  :key="g.nama"
                  class="inline-flex items-center gap-1"
                >
                  <b class="text-[var(--text-primary)]">{{ g.nama }}</b>
                  <a
                    v-if="waLink(g.wa)"
                    :href="waLink(g.wa)"
                    target="_blank"
                    rel="noopener"
                    class="px-1.5 py-0.5 rounded font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300"
                  >
                    <i class="fab fa-whatsapp"></i>
                  </a>
                </span>
              </template>
              <span v-else class="text-[10px] italic text-[var(--text-tertiary)]">—</span>
            </p>

            <button
              type="button"
              :disabled="batalId === String(row.id)"
              class="mt-2 text-[10px] font-bold text-rose-600 hover:underline disabled:opacity-40"
              @click="batalTugasRow(row)"
            >
              <i
                :class="['fas mr-1', batalId === String(row.id) ? 'fa-spinner fa-spin' : 'fa-undo']"
              ></i
              >Batalkan penugasan
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- ── TAB: TUGAS MENILAI ── -->
    <div
      v-else-if="tab === 'nilai'"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3 class="text-sm font-black text-[var(--text-primary)] mb-3">
        <i class="fas fa-pen-to-square text-teal-600 mr-1"></i>Tugas Menilai Saya
      </h3>

      <div v-if="!loaded" class="text-xs italic text-[var(--text-tertiary)] py-6 text-center">
        <i class="fas fa-spinner fa-spin mr-1"></i>Memuat…
      </div>
      <div
        v-else-if="tugasNilaiSaya.length === 0 && tugasMenunggu.length === 0"
        class="text-xs italic text-[var(--text-tertiary)] py-6 text-center"
      >
        <i class="fas fa-clipboard-check text-2xl block mb-2 text-[var(--border-default)]"></i>
        Belum ada tugas menilai untuk Anda.
      </div>

      <!-- v.1.1.9: tugas yang sudah ditugaskan tapi belum gilirannya. Ditampilkan sebagai
           keterangan (bukan disembunyikan diam-diam) supaya penyimak / guru kelas tahu
           tugasnya ADA, cuma belum waktunya. -->
      <div
        v-if="tugasMenunggu.length"
        class="mt-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] p-3"
      >
        <p class="text-[11px] font-bold text-[var(--text-secondary)] mb-1.5">
          <i class="fas fa-hourglass-half mr-1"></i>Menunggu giliran ({{ tugasMenunggu.length }})
        </p>
        <p
          v-for="row in tugasMenunggu"
          :key="row.id"
          class="text-[11px] text-[var(--text-tertiary)]"
        >
          {{ row.nama_cache || '—' }} · {{ tipeLabel(row) }} · {{ juzLabel(row) }}
          <span class="italic">
            —
            {{
              row.tipe === 'berjalan'
                ? 'menunggu semua glondongan selesai'
                : 'menunggu blok kelas sebelumnya selesai'
            }}
          </span>
        </p>
      </div>

      <!-- v.1.2.4 FIX: kartu isi-nilai kini v-if MANDIRI (dulu v-else ke blok "Menunggu
           giliran") — dulu bila ada 1 tugas belum-giliran, SEMUA kartu terbuka ikut hilang
           walau notifnya muncul. -->
      <ul v-if="tugasNilaiSaya.length" class="space-y-2">
        <li
          v-for="row in tugasNilaiSaya"
          :key="row.id"
          class="rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] overflow-hidden"
        >
          <button
            type="button"
            class="w-full flex items-center justify-between gap-2 p-3 text-left"
            @click="toggleNilai(row)"
          >
            <div class="min-w-0">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">
                {{ row.nama_cache || '—' }}
              </p>
              <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
                <span
                  :class="[
                    'px-1.5 py-0.5 rounded text-[10px] font-bold mr-1',
                    row.tipe === 'berjalan'
                      ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
                      : 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300'
                  ]"
                  >{{ tipeLabel(row) }}</span
                >
                Kelas {{ row.kelas_asal }} · {{ juzLabel(row) }}
                <span class="text-[var(--text-tertiary)]">· tes Juz {{ row.juz_target }}</span>
              </p>
              <!-- v.1.1.9: guru kelas santri + WA, supaya penyimak bisa koordinasi -->
              <p
                v-if="guruKelasSantri(row.santri_id).length"
                class="text-[10px] mt-0.5 flex items-center gap-1 flex-wrap"
                @click.stop
              >
                <span class="text-[var(--text-tertiary)]">Guru kelas:</span>
                <span
                  v-for="g in guruKelasSantri(row.santri_id)"
                  :key="g.nama"
                  class="inline-flex items-center gap-1"
                >
                  <b class="text-[var(--text-secondary)]">{{ g.nama }}</b>
                  <a
                    v-if="waLink(g.wa)"
                    :href="waLink(g.wa)"
                    target="_blank"
                    rel="noopener"
                    class="px-1 py-0.5 rounded font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300"
                    :aria-label="`WhatsApp ${g.nama}`"
                  >
                    <i class="fab fa-whatsapp"></i>
                  </a>
                </span>
              </p>
            </div>
            <i
              :class="[
                'fas text-[var(--text-tertiary)]',
                openId === row.id ? 'fa-chevron-up' : 'fa-chevron-down'
              ]"
            ></i>
          </button>

          <div v-if="openId === row.id && drafts[row.id]" class="px-3 pb-3">
            <div class="overflow-x-auto -mx-1 px-1">
              <table class="w-full text-xs border-collapse">
                <thead>
                  <tr class="text-[var(--text-secondary)]">
                    <th class="text-left font-bold py-1 pr-2">Juz</th>
                    <th
                      v-for="a in PTPT_ASPEK"
                      :key="a.key"
                      class="font-bold py-1 px-1 text-center"
                    >
                      {{ a.label }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="j in row.juz" :key="j" class="border-t border-[var(--border-subtle)]">
                    <td class="py-1 pr-2 font-bold text-[var(--text-primary)] whitespace-nowrap">
                      Juz {{ j }}
                    </td>
                    <td v-for="a in PTPT_ASPEK" :key="a.key" class="py-1 px-1 text-center">
                      <input
                        v-model.number="drafts[row.id].nilai[j][a.key]"
                        type="number"
                        min="0"
                        :max="NILAI_MAX"
                        class="w-14 px-1.5 py-1 text-center rounded-md border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)]"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="text-[10px] text-[var(--text-tertiary)] mt-1">
              Skala 0–{{ NILAI_MAX }} per aspek. Kosongkan bila belum dinilai.
            </p>

            <textarea
              v-model="drafts[row.id].catatan"
              rows="2"
              placeholder="Catatan evaluasi (opsional)…"
              class="w-full mt-2 px-2.5 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)]"
            ></textarea>

            <button
              type="button"
              :disabled="savingNilaiId === row.id"
              class="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
              @click="saveNilai(row)"
            >
              <i :class="['fas', savingNilaiId === row.id ? 'fa-spinner fa-spin' : 'fa-check']"></i>
              {{ savingNilaiId === row.id ? 'Menyimpan…' : 'Simpan & Selesai' }}
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- ── TAB: CATATAN ── -->
    <div
      v-else-if="tab === 'catatan'"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-clipboard-list text-teal-600 mr-1"></i>Catatan Evaluasi
        </h3>
        <span class="text-[11px] text-[var(--text-secondary)]">{{
          canSeeAllCatatan ? 'Semua santri PTPT' : 'Santri ampuan Anda'
        }}</span>
      </div>

      <input
        v-if="catatanGroups.length || catatanSearch"
        v-model="catatanSearch"
        type="search"
        placeholder="Cari nama santri…"
        class="w-full mb-3 px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)]"
      />

      <div v-if="!loaded" class="text-xs italic text-[var(--text-tertiary)] py-6 text-center">
        <i class="fas fa-spinner fa-spin mr-1"></i>Memuat…
      </div>
      <div
        v-else-if="catatanGroups.length === 0"
        class="text-xs italic text-[var(--text-tertiary)] py-6 text-center"
      >
        <i class="fas fa-inbox text-2xl block mb-2 text-[var(--border-default)]"></i>
        Belum ada catatan glondongan.
      </div>

      <ul v-else class="space-y-3">
        <li
          v-for="g in catatanGroups"
          :key="g.santri_id"
          class="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)]"
        >
          <p class="text-sm font-bold text-[var(--text-primary)] mb-2">{{ g.nama }}</p>
          <div class="space-y-2">
            <div
              v-for="r in g.rows"
              :key="r.id"
              class="text-[11px] border-l-2 pl-2 border-[var(--border-default)]"
            >
              <p class="flex items-center gap-1 flex-wrap">
                <span class="font-bold text-[var(--text-primary)]"
                  >{{ tipeLabel(r) }} · Kelas {{ r.kelas_asal }} · {{ juzLabel(r) }}</span
                >
                <span
                  :class="[
                    'px-1.5 py-0.5 rounded text-[10px] font-bold',
                    statusBadge(r.status).cls
                  ]"
                  >{{ statusBadge(r.status).label }}</span
                >
                <!-- v.1.1.9: hapus baris (super_admin) — koreksi / bersihkan data uji -->
                <button
                  v-if="canCrud"
                  type="button"
                  :disabled="hapusId === String(r.id)"
                  title="Hapus baris ini (super admin)"
                  aria-label="Hapus baris glondongan"
                  class="ml-auto shrink-0 w-6 h-6 rounded-lg border border-[var(--border-default)] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 flex items-center justify-center disabled:opacity-40"
                  @click="hapusRow(r)"
                >
                  <i
                    :class="[
                      'fas text-[10px]',
                      hapusId === String(r.id) ? 'fa-spinner fa-spin' : 'fa-trash'
                    ]"
                  ></i>
                </button>
              </p>
              <div v-if="r.status === 'selesai'" class="mt-1 space-y-0.5">
                <p v-for="j in r.juz" :key="j" class="text-[var(--text-tertiary)]">
                  <span class="font-bold text-[var(--text-secondary)]">Juz {{ j }}:</span>
                  {{ nilaiJuzText(r.nilai && r.nilai[j]) || '—' }}
                </p>
              </div>
              <p v-if="r.catatan" class="mt-1 text-[var(--text-primary)] italic">
                <i class="fas fa-quote-left text-[9px] mr-1 text-[var(--text-tertiary)]"></i
                >{{ r.catatan }}
              </p>
              <p v-if="r.penilai_nama" class="mt-0.5 text-[10px] text-[var(--text-tertiary)]">
                oleh {{ r.penilai_nama }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- ── TAB: PERAN (super_admin) — koordinator & penyimak glondongan ── -->
    <div
      v-else-if="tab === 'koordinator' && isSuper"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3 class="text-sm font-black text-[var(--text-primary)] mb-1">
        <i class="fas fa-user-gear text-teal-600 mr-1"></i>Peran Glondongan PTPT
      </h3>
      <p class="text-xs text-[var(--text-secondary)] mb-3">
        Dua daftar terpisah. Satu guru boleh masuk keduanya.
      </p>

      <!-- v.1.1.9: sisa baris yatim dari penghapusan tes sebelum cascade dipasang -->
      <div
        v-if="barisYatim.length"
        class="mb-3 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 px-3 py-2 flex items-center justify-between gap-2 flex-wrap"
      >
        <span class="text-[11px] text-amber-800 dark:text-amber-200">
          <i class="fas fa-broom mr-1"></i><b>{{ barisYatim.length }} baris</b> glondongan tak punya
          ajuan tes lagi (tesnya sudah dihapus). Sudah disembunyikan &amp; tak dihitung bisyaroh.
        </span>
        <button
          type="button"
          :disabled="bersihBusy"
          class="shrink-0 px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50"
          @click="bersihkanYatimKlik"
        >
          <i :class="['fas mr-1', bersihBusy ? 'fa-spinner fa-spin' : 'fa-broom']"></i>Bersihkan
        </button>
      </div>

      <div
        v-if="guruPtpt.length === 0"
        class="text-xs italic text-amber-600 dark:text-amber-400 py-4 text-center"
      >
        <i class="fas fa-triangle-exclamation mr-1"></i>Belum ada guru PTPT aktif untuk dipilih.
      </div>

      <div v-else class="space-y-4">
        <!-- Baris peran dipakai dua kali: koordinator & penyimak -->
        <div
          v-for="blok in [
            {
              rows: koorRows,
              judul: 'Koordinator',
              ket: 'Berhak MENUGASKAN penguji glondongan.',
              ikon: 'fa-user-gear'
            },
            {
              rows: penyimakRows,
              judul: 'Penyimak',
              ket: 'Boleh DITUGASKAN menyimak glondongan.',
              ikon: 'fa-headphones'
            }
          ]"
          :key="blok.judul"
          class="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)]"
        >
          <div class="flex items-center justify-between gap-2 mb-1">
            <span class="text-sm font-bold text-teal-700 dark:text-teal-300">
              <i :class="['fas mr-1', blok.ikon]"></i>{{ blok.judul }}
            </span>
            <span class="text-[10px] text-[var(--text-tertiary)]">{{ blok.rows.length }} guru</span>
          </div>
          <p class="text-[10px] text-[var(--text-tertiary)] mb-2">{{ blok.ket }}</p>

          <div
            v-if="blok.rows.length === 0"
            class="text-[11px] italic text-[var(--text-tertiary)] py-2"
          >
            Belum ada. Klik "Tambah" di bawah.
          </div>

          <div v-for="(r, i) in blok.rows" :key="i" class="flex items-center gap-2 mb-1.5">
            <select
              v-model="r.guru_id"
              class="flex-1 min-w-0 px-2.5 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)] cursor-pointer"
            >
              <option value="">— pilih guru —</option>
              <option v-for="g in guruTersedia(blok.rows, i)" :key="g.id" :value="String(g.id)">
                {{ g.nama }}
              </option>
            </select>
            <select
              v-model="r.cakupan"
              class="w-36 shrink-0 px-2 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)] cursor-pointer"
            >
              <option v-for="c in CAKUPAN_OPTS" :key="c.value" :value="c.value">
                {{ c.label }}
              </option>
            </select>
            <button
              type="button"
              :aria-label="`Hapus baris ${blok.judul}`"
              class="shrink-0 px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30"
              @click="hapusBaris(blok.rows, i)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>

          <button
            type="button"
            class="mt-1 text-xs font-bold text-teal-700 dark:text-teal-300 hover:underline"
            @click="tambahBaris(blok.rows)"
          >
            <i class="fas fa-plus mr-1"></i>Tambah {{ blok.judul.toLowerCase() }}
          </button>
        </div>

        <!-- v.1.2.1: Pembagian Santri per PJ — tiap PJ punya daftar GURU; santri ikut
             PJ dari gurunya (guru pengajar). Kyai: "pilih PJ, gurunya ini ini ini." -->
        <div
          class="p-3 rounded-xl border border-violet-300 dark:border-violet-700 bg-violet-50/60 dark:bg-violet-900/20"
        >
          <div class="flex items-center justify-between gap-2 mb-1">
            <span class="text-sm font-bold text-violet-700 dark:text-violet-300">
              <i class="fas fa-people-arrows mr-1"></i>Pembagian Santri per PJ
            </span>
          </div>
          <p class="text-[10px] text-[var(--text-tertiary)] mb-2">
            Centang guru di bawah tiap PJ. Santri otomatis ikut PJ dari guru pengajarnya (Pagi/Sore)
            — tak perlu diisi satu-satu. Satu guru hanya boleh di bawah satu PJ.
          </p>

          <div
            v-if="pjPtptList.length === 0"
            class="text-[11px] italic text-amber-600 dark:text-amber-400 py-2"
          >
            <i class="fas fa-triangle-exclamation mr-1"></i>Belum ada guru PTPT berjabatan
            Kepala/PJ/Pengasuh. Atur jabatannya dulu di Data Guru.
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="pj in pjPtptList"
              :key="'pj-' + pj.id"
              class="rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] p-2.5"
            >
              <div class="flex items-center gap-1.5 mb-1.5">
                <span
                  class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
                  >PJ</span
                >
                <span class="text-sm font-bold text-[var(--text-primary)]">{{ pj.nama }}</span>
                <span class="text-[10px] text-[var(--text-tertiary)] ml-auto"
                  >{{ (pjGuruDraft[String(pj.id)] || []).length }} guru</span
                >
              </div>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="g in guruPtpt"
                  :key="'pjg-' + pj.id + '-' + g.id"
                  type="button"
                  :title="
                    pjLainDariGuru(pj.id, g.id)
                      ? `Sekarang di bawah ${pjLainDariGuru(pj.id, g.id)} — klik untuk pindah ke sini`
                      : ''
                  "
                  :class="[
                    'px-2 py-1 rounded-lg text-[11px] font-bold border transition',
                    guruDiPj(pj.id, g.id)
                      ? 'bg-violet-600 text-white border-violet-600'
                      : pjLainDariGuru(pj.id, g.id)
                        ? 'border-[var(--border-default)] text-[var(--text-tertiary)] opacity-60 hover:opacity-100'
                        : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]'
                  ]"
                  @click="toggleGuruPj(pj.id, g.id)"
                >
                  <i v-if="guruDiPj(pj.id, g.id)" class="fas fa-check mr-1"></i>{{ g.nama }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          :disabled="savingKoor"
          class="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
          @click="savePeranSemua"
        >
          <i :class="['fas', savingKoor ? 'fa-spinner fa-spin' : 'fa-floppy-disk']"></i>
          {{ savingKoor ? 'Menyimpan…' : 'Simpan Peran' }}
        </button>
        <p class="text-[10px] text-[var(--text-tertiary)] italic">
          Cakupan diambil dari data <b>Mukim/Ma'had</b> santri. Santri yang belum diset mukim
          dihitung <b>Selain Ma'had</b>. Baris tanpa guru terpilih diabaikan saat menyimpan.
        </p>
      </div>
    </div>

    <!-- ── TAB: REKAP PENYIMAK (koordinator/PJ/super + admin_keuangan) — TANPA nominal ── -->
    <div
      v-else-if="tab === 'rekappenyimak' && canRekapPenyimak"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-chart-simple text-teal-600 mr-1"></i>Rekap Penyimak Glondongan
        </h3>
        <div class="flex items-center gap-2">
          <input
            v-model="rekapBulan"
            type="month"
            aria-label="Filter bulan rekap penyimak"
            class="px-2.5 py-1.5 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)]"
          />
          <button
            type="button"
            :disabled="!rekapPenyimakRows.length"
            aria-label="Ekspor rekap penyimak glondongan ke PDF"
            title="Ekspor PDF rekap penyimak bulan ini"
            class="px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-40 whitespace-nowrap"
            @click="exportRekapPenyimakPdf"
          >
            <i class="fas fa-file-pdf mr-1"></i>PDF
          </button>
        </div>
      </div>

      <p class="text-[11px] text-[var(--text-secondary)] mb-2">
        Blok yang <b>selesai disimak</b> pada {{ labelBulan(rekapBulan) }}. Tanpa nominal — untuk
        pemantauan capaian penyimak.
      </p>

      <div v-if="!loaded" class="text-xs italic text-[var(--text-tertiary)] py-6 text-center">
        <i class="fas fa-spinner fa-spin mr-1"></i>Memuat…
      </div>
      <div
        v-else-if="rekapPenyimakRows.length === 0"
        class="text-xs italic text-[var(--text-tertiary)] py-6 text-center"
      >
        <i class="fas fa-inbox text-2xl block mb-2 text-[var(--border-default)]"></i>
        Belum ada penilaian selesai pada bulan ini.
      </div>

      <div v-else class="overflow-x-auto -mx-1 px-1">
        <table class="w-full text-xs border-collapse">
          <thead>
            <tr class="text-[var(--text-secondary)] border-b border-[var(--border-subtle)]">
              <th class="text-left font-bold py-1.5 pr-2">Guru Penyimak</th>
              <th class="text-center font-bold py-1.5 px-2">Blok</th>
              <th class="text-center font-bold py-1.5 px-2">Juz</th>
              <th class="text-center font-bold py-1.5 pl-2">Santri</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="g in rekapPenyimakRows"
              :key="g.key"
              class="border-b border-[var(--border-subtle)]"
            >
              <td class="py-1.5 pr-2 font-bold text-[var(--text-primary)]">{{ g.nama }}</td>
              <td class="py-1.5 px-2 text-center text-[var(--text-secondary)]">{{ g.blok }}</td>
              <td class="py-1.5 px-2 text-center font-bold text-teal-700 dark:text-teal-300">
                {{ g.juz }}
              </td>
              <td class="py-1.5 pl-2 text-center text-[var(--text-secondary)]">{{ g.santri }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="border-t-2 border-[var(--border-default)]">
              <td class="py-1.5 pr-2 font-black text-[var(--text-primary)]">Total</td>
              <td class="py-1.5 px-2 text-center font-black text-[var(--text-primary)]">
                {{ rekapPenyimakTotal.blok }}
              </td>
              <td class="py-1.5 px-2 text-center font-black text-[var(--text-primary)]">
                {{ rekapPenyimakTotal.juz }}
              </td>
              <td class="py-1.5 pl-2 text-center font-black text-[var(--text-primary)]">
                {{ rekapPenyimakTotal.santri }}
              </td>
            </tr>
          </tfoot>
        </table>
        <p class="text-[10px] text-[var(--text-tertiary)] italic mt-2">
          Total santri dihitung unik — santri yang disimak dua penyimak tak terhitung dua kali.
        </p>
      </div>
    </div>

    <!-- ── TAB: REKAP BISYAROH (admin_keuangan / super_admin) ── -->
    <div
      v-else-if="tab === 'rekap' && canRekap"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-money-bill-wave text-teal-600 mr-1"></i>Rekap Bisyaroh Glondongan
        </h3>
        <div class="flex items-center gap-2">
          <input
            v-model="rekapBulan"
            type="month"
            aria-label="Filter bulan rekap bisyaroh"
            class="px-2.5 py-1.5 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)]"
          />
          <!-- v.1.2.1 (Kyai): ekspor PDF rekap bisyaroh -->
          <button
            type="button"
            :disabled="!rekapRows.length"
            aria-label="Ekspor rekap bisyaroh glondongan ke PDF"
            title="Ekspor PDF rekap bisyaroh bulan ini"
            class="px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-40 whitespace-nowrap"
            @click="exportRekapBisyarohPdf"
          >
            <i class="fas fa-file-pdf mr-1"></i>PDF
          </button>
        </div>
      </div>

      <p v-if="tarifPerJuz === 0" class="text-[11px] text-amber-600 dark:text-amber-400 mb-2">
        <i class="fas fa-triangle-exclamation mr-1"></i>Tarif per juz belum diatur — set di
        Pengaturan Keuangan → Bisyaroh.
      </p>
      <p v-else class="text-[11px] text-[var(--text-secondary)] mb-2">
        Tarif: <b>{{ fmtRp(tarifPerJuz) }}</b> / juz disimak.
      </p>

      <div v-if="!loaded" class="text-xs italic text-[var(--text-tertiary)] py-6 text-center">
        <i class="fas fa-spinner fa-spin mr-1"></i>Memuat…
      </div>
      <div
        v-else-if="rekapRows.length === 0"
        class="text-xs italic text-[var(--text-tertiary)] py-6 text-center"
      >
        <i class="fas fa-inbox text-2xl block mb-2 text-[var(--border-default)]"></i>
        Belum ada penilaian selesai pada bulan ini.
      </div>

      <div v-else class="overflow-x-auto -mx-1 px-1">
        <table class="w-full text-xs border-collapse">
          <thead>
            <tr class="text-[var(--text-secondary)] border-b border-[var(--border-subtle)]">
              <th class="text-left font-bold py-1.5 pr-2">Guru Penguji</th>
              <th class="text-center font-bold py-1.5 px-2">Blok</th>
              <th class="text-center font-bold py-1.5 px-2">Juz</th>
              <!-- v.1.2.1: kolom Santri disamakan dengan Rekap Penyimak & PDF -->
              <th class="text-center font-bold py-1.5 px-2">Santri</th>
              <th class="text-right font-bold py-1.5 pl-2">Bisyaroh</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in rekapRows" :key="g.key" class="border-b border-[var(--border-subtle)]">
              <td class="py-1.5 pr-2 font-bold text-[var(--text-primary)]">{{ g.nama }}</td>
              <td class="py-1.5 px-2 text-center text-[var(--text-secondary)]">{{ g.blok }}</td>
              <td class="py-1.5 px-2 text-center text-[var(--text-secondary)]">{{ g.juz }}</td>
              <td class="py-1.5 px-2 text-center text-[var(--text-secondary)]">{{ g.santri }}</td>
              <td class="py-1.5 pl-2 text-right font-bold text-teal-700 dark:text-teal-300">
                {{ fmtRp(g.total) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="border-t-2 border-[var(--border-default)]">
              <td class="py-1.5 pr-2 font-black text-[var(--text-primary)]" colspan="4">Total</td>
              <td class="py-1.5 pl-2 text-right font-black text-[var(--text-primary)]">
                {{ fmtRp(rekapTotal) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
