<script setup>
// v.1.1.9: Ceremonial PTPT — santri PTPT yang lulus tes PJ dijadwalkan ceremonial.
//   1 baris = 1 SESI: waktu + tempat + PESERTA + PENYIMAK GURU + PENYIMAK SANTRI.
//   Kelas 1 cukup 1 sesi (1 guru + beberapa santri); kelas 2 dipecah 2 sesi.
//   Penjadwal = super_admin + PJ PTPT (canKelola); selain itu view-only.
//   Tiap peserta menampilkan TANGGAL LULUS TES PJ (permintaan Kyai poin 2).
import { ref, computed } from 'vue'
import { useCeremonial } from '@/composables/useCeremonial'
import { useTesKenaikan } from '@/composables/useTesKenaikan'
import { useGuru } from '@/composables/useGuru'
import { useSantri } from '@/composables/useSantri'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { PTPT_LEMBAGA } from '@/utils/glondongan'
import { guruAktifSaja } from '@/utils/guruScope' // v.1.2.0: buang guru nonaktif
import { waLink } from '@/utils/format' // v.1.2.6: tautan WA penyimak
import { pesanCeremonial } from '@/utils/pesanWa' // v.1.2.6: teks WA otomatis
import { useSettingsStore } from '@/stores/settings'

const {
  loaded,
  sesiList,
  sesi: sesiAkun, // sesi AKUN (bukan sesi ceremonial) — dinamai ulang agar tak rancu
  canKelola,
  isSuper,
  isPjPtpt, // v.1.1.9: PJ dibatasi ke santri ampuannya
  isKoordinator,
  isAmpuanSaya,
  sesiMenyangkutAmpuan,
  kandidatPeserta,
  simpanSesi,
  kirimUlangNotif, // v.1.1.9
  setStatus,
  hapusSesi
} = useCeremonial()
const { ajuanRaw } = useTesKenaikan()
const { guruRaw } = useGuru()
const settingsStore = useSettingsStore()
// v.1.2.6: nama pondok utk tanda tangan pesan WA + cari no WA guru penyimak
//   (penyimak_guru hanya menyimpan nama, nomornya diambil dari daftar guru).
const pondokWa = computed(() => settingsStore.settings?.kopLine2 || 'Pondok Pesantren Mambaul Ulum')
function guruWaCeremonial(nama) {
  const g = (guruRaw.value || []).find(
    (x) =>
      String(x.nama || '')
        .trim()
        .toLowerCase() ===
      String(nama || '')
        .trim()
        .toLowerCase()
  )
  return g?.wa || ''
}
const { santriRaw } = useSantri()
const toast = useToast()
const confirmDlg = useConfirm()

const STATUS_LABEL = { terjadwal: 'Terjadwal', selesai: 'Selesai', batal: 'Batal' }
const STATUS_CLS = {
  terjadwal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  selesai: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  batal: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
}

// Nama santri ampuan SAYA (cermin scoping guru di useSantri: guru_pagi/guru_sore/
//   guru lama/guru_sekolah). Dipakai membatasi jadwal yang tampil untuk guru biasa.
const santriAmpuanIds = computed(() => {
  const nama = String(sesiAkun.value.guru || sesiAkun.value.nama || '')
    .trim()
    .toLowerCase()
  const set = new Set()
  if (!nama) return set
  for (const s of santriRaw.value) {
    if (s.aktif === false) continue
    const cocokTunggal = [s.guru_pagi, s.guru_sore, s.guru].some(
      (g) =>
        String(g || '')
          .trim()
          .toLowerCase() === nama
    )
    const cocokSekolah = (Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []).some(
      (g) =>
        String(g || '')
          .trim()
          .toLowerCase() === nama
    )
    if (cocokTunggal || cocokSekolah) set.add(String(s.id))
  }
  return set
})

// Siapa lihat sesi apa:
//   super_admin & koordinator : SEMUA sesi.
//   PJ PTPT                   : hanya sesi yang memuat santri AMPUANNYA (pj_ptpt =
//                               namanya) — v.1.1.9, dulu ikut lihat semua.
//   Guru biasa                : hanya sesi yang memuat santri kelas ampuannya.
//   Peran menumpuk → gabungan (mis. PJ yang juga pegang kelas).
const sesiTerlihat = computed(() => {
  if (isSuper.value || isKoordinator.value) return sesiList.value
  const mine = santriAmpuanIds.value
  const punyaKelas = (s) =>
    (Array.isArray(s.peserta) ? s.peserta : []).some((p) => mine.has(String(p.santri_id)))
  return sesiList.value.filter((s) => punyaKelas(s) || (isPjPtpt.value && sesiMenyangkutAmpuan(s)))
})

// ── v.1.2.0 (Kyai 21 Jul): daftar KANDIDAT otomatis + pisah sudah/belum dijadwalkan,
//    supaya penjadwalan tak lagi manual satu per satu. ──────────────────────────
const tab = ref('kandidat') // 'kandidat' | 'sesi' — mulai dari yang perlu ditindak
const kandidatTab = ref('belum') // 'belum' | 'sudah'
// Kandidat penuh (tak terpengaruh isi dialog) — dasar kedua sub-tab & badge.
const kandidatSemua = computed(() => {
  let list = kandidatPeserta(ajuanRaw.value)
  if (!isSuper.value && !isKoordinator.value && isPjPtpt.value) {
    list = list.filter((k) => isAmpuanSaya.value(k.santri_id))
  }
  return list
})
const kandidatBelum = computed(() => kandidatSemua.value.filter((k) => !k.sesi_terjadwal))
const kandidatSudah = computed(() => kandidatSemua.value.filter((k) => k.sesi_terjadwal))
const kandidatAktif = computed(() =>
  kandidatTab.value === 'belum' ? kandidatBelum.value : kandidatSudah.value
)

// Pilihan borongan (hanya di sub-tab "Belum").
const pilihMassal = ref([])
const adaPilih = (id) => pilihMassal.value.includes(String(id))
function togglePilih(id) {
  const s = String(id)
  const i = pilihMassal.value.indexOf(s)
  if (i >= 0) pilihMassal.value.splice(i, 1)
  else pilihMassal.value.push(s)
}
const semuaTerpilih = computed(
  () => kandidatBelum.value.length > 0 && pilihMassal.value.length === kandidatBelum.value.length
)
function toggleSemua() {
  pilihMassal.value = semuaTerpilih.value ? [] : kandidatBelum.value.map((k) => String(k.santri_id))
}
// Buka dialog sesi baru dengan peserta SUDAH TERISI — inti "tidak manual satu-satu".
function jadwalkanTerpilih() {
  const pilih = new Set(pilihMassal.value)
  const peserta = kandidatBelum.value.filter((k) => pilih.has(String(k.santri_id)))
  if (!peserta.length) return
  bukaBaru()
  form.value.peserta = peserta.map((k) => ({ ...k }))
  pilihMassal.value = []
}

const filterStatus = ref('')
const sesiTampil = computed(() =>
  filterStatus.value
    ? sesiTerlihat.value.filter((s) => s.status === filterStatus.value)
    : sesiTerlihat.value
)

// Guru PTPT dulu (paling sering jadi penyimak), sisanya tetap bisa dipilih.
const guruOptions = computed(() => {
  const isPtpt = (g) =>
    String(g.lembaga || '')
      .trim()
      .toUpperCase() === PTPT_LEMBAGA
  // v.1.2.0: dulu `status !== 'Non-Aktif'` — string itu TAK PERNAH ditulis siapa pun
  //   (nilai asli: 'Aktif'/'aktif'/'Tidak Aktif'), jadi penyaringnya tak pernah bekerja.
  return guruAktifSaja(guruRaw.value)
    .slice()
    .sort(
      (a, b) =>
        Number(isPtpt(b)) - Number(isPtpt(a)) ||
        String(a.nama || '').localeCompare(String(b.nama || ''), 'id')
    )
})
// Penyimak santri: santri PTPT aktif (mis. santri senior menyimak juniornya).
const santriPtpt = computed(() =>
  santriRaw.value
    .filter(
      (s) =>
        s.aktif !== false &&
        String(s.lembaga || '')
          .trim()
          .toUpperCase() === PTPT_LEMBAGA
    )
    .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
)

// ── Dialog sesi ──
const dlgOpen = ref(false)
const saving = ref(false)
const cariPeserta = ref('')
const cariGuru = ref('')
const cariSantri = ref('')
const formKosong = () => ({
  id: '',
  judul: '',
  tanggal: '',
  jam_mulai: '',
  jam_selesai: '',
  tempat: '',
  catatan: '',
  status: 'terjadwal',
  peserta: [],
  penyimak_guru: [],
  penyimak_santri: []
})
const form = ref(formKosong())

// Kandidat = lulus tes PJ & belum dijadwalkan. Saat MENGUBAH sesi, peserta sesi itu
//   sendiri harus tetap muncul supaya bisa dicentang/dilepas.
const kandidat = computed(() => {
  // v.1.2.0: satu sumber dengan daftar kandidat di layar (kandidatSemua) — scope PJ
  //   & saringan "juz terakhir kelas" sudah diterapkan di sana.
  const dasar = kandidatSemua.value
  const sudah = new Set(dasar.map((k) => k.santri_id))
  const tambahan = (form.value.peserta || []).filter((p) => !sudah.has(String(p.santri_id)))
  return [...tambahan, ...dasar].sort((a, b) => String(a.nama).localeCompare(String(b.nama), 'id'))
})

function bukaBaru() {
  form.value = formKosong()
  cariPeserta.value = cariGuru.value = cariSantri.value = ''
  dlgOpen.value = true
}
function bukaUbah(s) {
  form.value = {
    id: String(s.id),
    judul: s.judul || '',
    tanggal: s.tanggal || '',
    jam_mulai: s.jam_mulai || '',
    jam_selesai: s.jam_selesai || '',
    tempat: s.tempat || '',
    catatan: s.catatan || '',
    status: s.status || 'terjadwal',
    peserta: Array.isArray(s.peserta) ? s.peserta.map((p) => ({ ...p })) : [],
    penyimak_guru: Array.isArray(s.penyimak_guru) ? s.penyimak_guru.map((g) => ({ ...g })) : [],
    penyimak_santri: Array.isArray(s.penyimak_santri)
      ? s.penyimak_santri.map((g) => ({ ...g }))
      : []
  }
  cariPeserta.value = cariGuru.value = cariSantri.value = ''
  dlgOpen.value = true
}

const cocok = (teks, kw) =>
  !kw ||
  String(teks || '')
    .toLowerCase()
    .includes(kw.trim().toLowerCase())
const kandidatTampil = computed(() =>
  kandidat.value.filter((k) => cocok(k.nama, cariPeserta.value))
)
const guruTampil = computed(() => guruOptions.value.filter((g) => cocok(g.nama, cariGuru.value)))
const santriTampil = computed(() => santriPtpt.value.filter((s) => cocok(s.nama, cariSantri.value)))

const adaPeserta = (id) => form.value.peserta.some((p) => String(p.santri_id) === String(id))
function togglePeserta(k) {
  const i = form.value.peserta.findIndex((p) => String(p.santri_id) === String(k.santri_id))
  if (i >= 0) form.value.peserta.splice(i, 1)
  else form.value.peserta.push({ ...k })
}
const adaOrang = (list, id) => list.some((x) => String(x.id) === String(id))
function toggleOrang(list, o) {
  const i = list.findIndex((x) => String(x.id) === String(o.id))
  if (i >= 0) list.splice(i, 1)
  else list.push({ id: String(o.id), nama: o.nama || '' })
}

async function simpan() {
  if (!form.value.tanggal) return toast.warning('Tanggal sesi wajib diisi.')
  if (!form.value.peserta.length) return toast.warning('Pilih minimal 1 santri peserta.')
  if (!form.value.penyimak_guru.length && !form.value.penyimak_santri.length)
    return toast.warning('Pilih minimal 1 penyimak (guru atau santri).')
  saving.value = true
  try {
    await simpanSesi(form.value)
    toast.success(form.value.id ? 'Sesi ceremonial diperbarui.' : 'Sesi ceremonial dijadwalkan.')
    dlgOpen.value = false
  } catch (e) {
    toast.error(`Gagal menyimpan: ${e?.message || e}`)
  } finally {
    saving.value = false
  }
}

async function ubahStatus(s, status) {
  try {
    await setStatus(s.id, status)
    toast.success(`Sesi ditandai ${STATUS_LABEL[status] || status}.`)
  } catch (e) {
    toast.error(`Gagal: ${e?.message || e}`)
  }
}

// v.1.1.9: kirim ulang notifikasi sesi (dipakai kalau jadwal/tempat berubah —
//   menyunting sesi sengaja TIDAK mengirim ulang otomatis).
const kirimId = ref('')
async function kirimUlang(s) {
  kirimId.value = String(s.id)
  try {
    const n = await kirimUlangNotif(s.id)
    if (n) toast.success(`Notifikasi dikirim ke ${n} penerima.`)
    else toast.warning('Tidak ada penerima — sesi belum punya penyimak/peserta.')
  } catch (e) {
    toast.error(`Gagal kirim notifikasi: ${e?.message || e}`)
  } finally {
    kirimId.value = ''
  }
}
async function hapus(s) {
  const ok = await confirmDlg({
    title: 'Hapus sesi ceremonial?',
    message: `Sesi <b>${escapeHtml(judulSesi(s))}</b> beserta daftar peserta &amp; penyimaknya akan dihapus.<br>Tindakan ini tidak bisa dibatalkan.`,
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    await hapusSesi(s.id)
    toast.success('Sesi dihapus.')
  } catch (e) {
    toast.error(`Gagal menghapus: ${e?.message || e}`)
  }
}

// ConfirmDialog merender `message` dengan v-html -> escape nilai data.
function escapeHtml(v) {
  return String(v ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  )
}
function judulSesi(s) {
  return s.judul || `Ceremonial ${fmtTgl(s.tanggal)}`
}
function fmtTgl(t) {
  if (!t) return '-'
  const d = new Date(`${String(t).slice(0, 10)}T00:00:00`)
  if (Number.isNaN(d.getTime())) return String(t)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}
// tgl_hasil = timestamp ISO keputusan PJ.
function fmtTglLulus(iso) {
  if (!iso) return 'belum tercatat'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return String(iso)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}
function jamRange(s) {
  if (!s.jam_mulai) return ''
  return s.jam_selesai ? `${s.jam_mulai}–${s.jam_selesai}` : s.jam_mulai
}
</script>

<template>
  <div class="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
    <!-- Header -->
    <div
      class="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl p-5 md:p-6 text-white shadow-lg"
    >
      <p class="text-[10px] font-black uppercase tracking-widest opacity-90">
        <i class="fas fa-award mr-1"></i>PTPT
      </p>
      <h2 class="text-xl md:text-2xl font-black mt-1">Ceremonial PTPT</h2>
      <p class="text-[11px] opacity-90 mt-1">
        <template v-if="canKelola">
          Jadwal sesi ceremonial santri yang sudah lulus tes PJ — atur waktu, penyimak guru, dan
          penyimak santri.
        </template>
        <template v-else>
          Jadwal &amp; riwayat ceremonial santri kelas ampuan. Sesi yang tak memuat santri kelas
          ampuan tidak ditampilkan.
        </template>
      </p>
      <button
        v-if="canKelola"
        class="mt-3 inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-teal-700 text-[11px] font-black px-3 py-1.5 rounded-lg shadow-sm transition"
        @click="bukaBaru"
      >
        <i class="fas fa-plus"></i>Jadwalkan Sesi
      </button>
    </div>

    <!-- v.1.2.0: tab utama — Kandidat (perlu ditindak) vs Sesi (jadwal yang sudah ada) -->
    <div class="flex gap-1.5">
      <button
        v-for="t in [
          { v: 'kandidat', l: 'Kandidat', n: kandidatBelum.length },
          { v: 'sesi', l: 'Sesi Terjadwal', n: 0 }
        ]"
        :key="t.v"
        :class="[
          'px-3.5 py-2 rounded-xl text-xs font-black border transition cursor-pointer',
          tab === t.v
            ? 'bg-teal-600 text-white border-teal-700'
            : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-teal-50 dark:hover:bg-teal-900/30'
        ]"
        @click="tab = t.v"
      >
        {{ t.l }}
        <span v-if="t.n" class="ml-1 px-1.5 rounded-full bg-amber-500 text-white text-[10px]">{{
          t.n
        }}</span>
      </button>
    </div>

    <!-- ══════════ TAB KANDIDAT ══════════ -->
    <div v-if="tab === 'kandidat'" class="space-y-3">
      <div class="flex gap-1.5">
        <button
          v-for="t in [
            { v: 'belum', l: 'Belum Dijadwalkan', n: kandidatBelum.length },
            { v: 'sudah', l: 'Sudah Dijadwalkan', n: kandidatSudah.length }
          ]"
          :key="t.v"
          :class="[
            'px-3 py-1.5 rounded-lg text-[11px] font-bold border transition cursor-pointer',
            kandidatTab === t.v
              ? 'bg-[var(--bg-card-elevated)] text-[var(--text-primary)] border-teal-500'
              : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-default)]'
          ]"
          @click="kandidatTab = t.v"
        >
          {{ t.l }} ({{ t.n }})
        </button>
      </div>

      <p class="text-[11px] text-[var(--text-secondary)] px-1">
        Santri yang <b>lulus tes juz terakhir kelasnya</b> di PJ otomatis masuk daftar ini —
        merekalah yang akan naik kelas sesudah ceremonial.
      </p>

      <div
        v-if="kandidatAktif.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-8 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-user-check text-[var(--text-tertiary)] text-2xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">
          {{
            kandidatTab === 'belum'
              ? 'Tidak ada santri yang menunggu dijadwalkan.'
              : 'Belum ada kandidat yang masuk sesi.'
          }}
        </p>
      </div>

      <div v-else class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] p-3">
        <label
          v-if="canKelola && kandidatTab === 'belum'"
          class="flex items-center gap-2 pb-2 mb-2 border-b border-[var(--border-subtle)] cursor-pointer"
        >
          <input
            type="checkbox"
            :checked="semuaTerpilih"
            class="w-4 h-4 accent-teal-600"
            @change="toggleSemua"
          />
          <span class="text-[11px] font-bold text-[var(--text-secondary)]">Pilih semua</span>
        </label>

        <div
          v-for="k in kandidatAktif"
          :key="k.santri_id"
          class="flex items-center gap-2 py-1.5 border-b border-[var(--border-subtle)] last:border-0"
        >
          <input
            v-if="canKelola && kandidatTab === 'belum'"
            type="checkbox"
            :checked="adaPilih(k.santri_id)"
            class="w-4 h-4 accent-teal-600 flex-shrink-0"
            @change="togglePilih(k.santri_id)"
          />
          <span class="flex-1 min-w-0">
            <span class="block text-xs font-bold text-[var(--text-primary)] truncate">{{
              k.nama
            }}</span>
            <span class="block text-[10px] text-[var(--text-secondary)]">
              <template v-if="k.juz_lulus">Lulus Juz {{ k.juz_lulus }} &middot; </template>
              <template v-if="k.kelas_tujuan">menuju {{ k.kelas_tujuan }} &middot; </template>
              Lulus PJ: {{ fmtTglLulus(k.tgl_lulus_pj) }}
            </span>
          </span>
          <span
            v-if="k.sesi_terjadwal"
            class="shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
            >{{ k.sesi_terjadwal }} sesi</span
          >
        </div>
      </div>

      <!-- Jadwalkan borongan -->
      <div v-if="canKelola && pilihMassal.length" class="sticky bottom-3 flex justify-end">
        <button
          class="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg"
          @click="jadwalkanTerpilih"
        >
          <i class="fas fa-calendar-plus"></i>Jadwalkan {{ pilihMassal.length }} santri sekaligus
        </button>
      </div>
    </div>

    <!-- ══════════ TAB SESI ══════════ -->
    <template v-else>
      <!-- Filter status -->
      <div class="flex gap-1.5 overflow-x-auto custom-scrollbar">
        <button
          v-for="f in [
            { v: '', l: 'Semua' },
            { v: 'terjadwal', l: 'Terjadwal' },
            { v: 'selesai', l: 'Selesai' },
            { v: 'batal', l: 'Batal' }
          ]"
          :key="f.v"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-black border transition cursor-pointer whitespace-nowrap',
            filterStatus === f.v
              ? 'bg-teal-600 text-white border-teal-700'
              : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-teal-50 dark:hover:bg-teal-900/30'
          ]"
          @click="filterStatus = f.v"
        >
          {{ f.l }}
        </button>
      </div>

      <!-- Empty -->
      <div
        v-if="loaded && sesiTampil.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 text-center border border-dashed border-[var(--border-default)]"
      >
        <i class="fas fa-calendar-day text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">
          {{
            filterStatus
              ? 'Tidak ada sesi dengan status ini.'
              : canKelola
                ? 'Belum ada sesi ceremonial.'
                : 'Belum ada sesi ceremonial yang memuat santri kelas ampuan.'
          }}
        </p>
      </div>

      <!-- Daftar sesi -->
      <div
        v-for="s in sesiTampil"
        :key="s.id"
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <div
          class="flex items-start justify-between gap-2 flex-wrap p-3 md:p-4 bg-[var(--bg-muted)] border-b border-[var(--border-subtle)]"
        >
          <div class="min-w-0">
            <h3 class="text-sm md:text-base font-black text-[var(--text-primary)]">
              <i class="fas fa-calendar-day text-teal-600 mr-1.5"></i>{{ judulSesi(s) }}
            </h3>
            <p class="text-[11px] font-bold text-[var(--text-secondary)] mt-0.5">
              {{ fmtTgl(s.tanggal) }}<span v-if="jamRange(s)"> &middot; {{ jamRange(s) }}</span
              ><span v-if="s.tempat"> &middot; {{ s.tempat }}</span>
            </p>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <span
              :class="[
                'text-[10px] font-black px-2.5 py-1 rounded-full',
                STATUS_CLS[s.status] || STATUS_CLS.terjadwal
              ]"
              >{{ STATUS_LABEL[s.status] || s.status }}</span
            >
            <button
              v-if="canKelola"
              class="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white"
              @click="bukaUbah(s)"
            >
              <i class="fas fa-pen mr-1"></i>Ubah
            </button>
            <!-- v.1.1.9: notif dikirim otomatis saat sesi DIBUAT. Menyunting sesi tidak
               mengirim ulang (biar tak membanjiri); kalau jadwal berubah, pakai ini. -->
            <button
              v-if="canKelola && s.status === 'terjadwal'"
              :disabled="kirimId === String(s.id)"
              title="Kirim ulang notifikasi ke penyimak & peserta"
              class="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
              @click="kirimUlang(s)"
            >
              <i
                :class="['fas mr-1', kirimId === String(s.id) ? 'fa-spinner fa-spin' : 'fa-bell']"
              ></i
              >Notif
            </button>
            <button
              v-if="canKelola && s.status !== 'selesai'"
              class="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-600 hover:bg-slate-700 text-white"
              @click="ubahStatus(s, 'selesai')"
            >
              <i class="fas fa-check mr-1"></i>Selesai
            </button>
            <button
              v-if="isSuper"
              class="text-[11px] font-bold px-2 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white"
              aria-label="Hapus sesi"
              @click="hapus(s)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="p-3 md:p-4 space-y-3">
          <!-- Penyimak -->
          <div class="grid md:grid-cols-2 gap-2">
            <div class="rounded-xl bg-[var(--bg-muted)] px-3 py-2">
              <p class="text-[10px] font-black uppercase text-[var(--text-tertiary)]">
                <i class="fas fa-chalkboard-teacher mr-1"></i>Penyimak Guru
              </p>
              <!-- v.1.2.6: tiap penyimak guru + tombol WA (teks jadwal seremonial otomatis) -->
              <div
                class="text-xs font-bold text-[var(--text-primary)] mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1"
              >
                <span v-if="!(s.penyimak_guru || []).length">—</span>
                <span
                  v-for="(g, gi) in s.penyimak_guru || []"
                  :key="gi"
                  class="inline-flex items-center gap-1"
                >
                  <span>{{ g.nama }}</span>
                  <a
                    v-if="waLink(guruWaCeremonial(g.nama))"
                    :href="
                      waLink(
                        guruWaCeremonial(g.nama),
                        pesanCeremonial({
                          guru: g.nama,
                          tanggal: fmtTgl(s.tanggal),
                          jam: jamRange(s),
                          tempat: s.tempat,
                          jumlah: (s.peserta || []).length,
                          pondok: pondokWa
                        })
                      )
                    "
                    target="_blank"
                    rel="noopener"
                    class="px-1.5 py-0.5 rounded font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300"
                    :aria-label="`WhatsApp ${g.nama}`"
                  >
                    <i class="fab fa-whatsapp"></i>
                  </a>
                </span>
              </div>
            </div>
            <div class="rounded-xl bg-[var(--bg-muted)] px-3 py-2">
              <p class="text-[10px] font-black uppercase text-[var(--text-tertiary)]">
                <i class="fas fa-user-graduate mr-1"></i>Penyimak Santri
              </p>
              <p class="text-xs font-bold text-[var(--text-primary)] mt-0.5">
                {{ (s.penyimak_santri || []).map((g) => g.nama).join(', ') || '—' }}
              </p>
            </div>
          </div>

          <!-- Peserta + TGL LULUS PJ -->
          <div>
            <p class="text-[10px] font-black uppercase text-[var(--text-tertiary)] mb-1">
              <i class="fas fa-users mr-1"></i>Peserta ({{ (s.peserta || []).length }})
            </p>
            <ul class="space-y-1">
              <li
                v-for="(p, i) in s.peserta || []"
                :key="p.santri_id"
                class="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800"
              >
                <span class="text-[10px] font-black text-[var(--text-tertiary)] w-5 flex-shrink-0"
                  >{{ i + 1 }}.</span
                >
                <span class="flex-1 min-w-0">
                  <span class="block font-bold text-[var(--text-primary)] truncate">{{
                    p.nama
                  }}</span>
                  <span class="block text-[10px] text-[var(--text-secondary)]">
                    <template v-if="p.kelas">Kelas {{ p.kelas }} &middot; </template>
                    <template v-if="p.juz">Juz {{ p.juz }} &middot; </template>
                    Lulus PJ: <b>{{ fmtTglLulus(p.tgl_lulus_pj) }}</b>
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <p v-if="s.catatan" class="text-[11px] text-[var(--text-secondary)] italic">
            <i class="fas fa-note-sticky mr-1"></i>{{ s.catatan }}
          </p>
        </div>
      </div>
    </template>

    <!-- Dialog jadwal sesi -->
    <div
      v-if="dlgOpen"
      class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
      @click.self="dlgOpen = false"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col"
      >
        <div
          class="flex items-center justify-between px-5 py-4 border-b border-[var(--border-subtle)] shrink-0"
        >
          <h3 class="text-base font-black">
            <i class="fas fa-award text-teal-500 mr-1.5"></i
            >{{ form.id ? 'Ubah' : 'Jadwalkan' }} Sesi Ceremonial
          </h3>
          <button
            class="text-[var(--text-secondary)] hover:text-rose-500 p-1"
            aria-label="Tutup"
            @click="dlgOpen = false"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="p-5 space-y-3 overflow-y-auto flex-1 min-h-0">
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Nama Sesi (opsional)</label
            >
            <input
              v-model="form.judul"
              type="text"
              placeholder="mis. Sesi 1 — Kelas 2"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
                >Tanggal</label
              >
              <input
                v-model="form.tanggal"
                type="date"
                class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
                >Mulai</label
              >
              <input
                v-model="form.jam_mulai"
                type="time"
                class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
                >Selesai</label
              >
              <input
                v-model="form.jam_selesai"
                type="time"
                class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Tempat</label
            >
            <input
              v-model="form.tempat"
              type="text"
              placeholder="mis. Aula PTPT"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <!-- Peserta -->
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Peserta — santri lulus tes PJ ({{ form.peserta.length }} dipilih)</label
            >
            <input
              v-model="cariPeserta"
              type="search"
              placeholder="Cari nama santri..."
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none mb-1.5"
            />
            <p
              v-if="!kandidatTampil.length"
              class="text-[11px] text-[var(--text-tertiary)] italic px-1 py-2"
            >
              Belum ada santri PTPT yang lulus tes PJ.
            </p>
            <div v-else class="max-h-40 overflow-y-auto space-y-1">
              <label
                v-for="k in kandidatTampil"
                :key="k.santri_id"
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-muted)] cursor-pointer"
              >
                <input
                  type="checkbox"
                  :checked="adaPeserta(k.santri_id)"
                  class="w-4 h-4 accent-teal-600 flex-shrink-0"
                  @change="togglePeserta(k)"
                />
                <span class="flex-1 min-w-0">
                  <span class="flex items-center gap-1.5">
                    <span class="text-xs font-bold text-[var(--text-primary)] truncate">{{
                      k.nama
                    }}</span>
                    <!-- v.1.1.9: santri boleh masuk beberapa sesi — tandai supaya
                         penjadwal sadar, bukan disembunyikan seperti dulu. -->
                    <span
                      v-if="k.sesi_terjadwal"
                      class="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                      :title="`Sudah masuk ${k.sesi_terjadwal} sesi ceremonial lain`"
                      >sudah di {{ k.sesi_terjadwal }} sesi</span
                    >
                  </span>
                  <span class="block text-[10px] text-[var(--text-secondary)]">
                    <template v-if="k.kelas">Kelas {{ k.kelas }} &middot; </template>
                    <template v-if="k.juz">Juz {{ k.juz }} &middot; </template>
                    Lulus PJ: {{ fmtTglLulus(k.tgl_lulus_pj) }}
                  </span>
                </span>
              </label>
            </div>
          </div>

          <!-- Penyimak guru -->
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Penyimak Guru ({{ form.penyimak_guru.length }} dipilih)</label
            >
            <input
              v-model="cariGuru"
              type="search"
              placeholder="Cari nama guru..."
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none mb-1.5"
            />
            <div class="max-h-36 overflow-y-auto space-y-1">
              <label
                v-for="g in guruTampil"
                :key="g.id"
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-muted)] cursor-pointer"
              >
                <input
                  type="checkbox"
                  :checked="adaOrang(form.penyimak_guru, g.id)"
                  class="w-4 h-4 accent-teal-600 flex-shrink-0"
                  @change="toggleOrang(form.penyimak_guru, g)"
                />
                <span class="text-xs font-bold text-[var(--text-primary)] truncate">{{
                  g.nama
                }}</span>
              </label>
            </div>
          </div>

          <!-- Penyimak santri -->
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Penyimak Santri ({{ form.penyimak_santri.length }} dipilih)</label
            >
            <input
              v-model="cariSantri"
              type="search"
              placeholder="Cari nama santri..."
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none mb-1.5"
            />
            <div class="max-h-36 overflow-y-auto space-y-1">
              <label
                v-for="s in santriTampil"
                :key="s.id"
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-muted)] cursor-pointer"
              >
                <input
                  type="checkbox"
                  :checked="adaOrang(form.penyimak_santri, s.id)"
                  class="w-4 h-4 accent-teal-600 flex-shrink-0"
                  @change="toggleOrang(form.penyimak_santri, s)"
                />
                <span class="text-xs font-bold text-[var(--text-primary)] truncate"
                  >{{ s.nama
                  }}<span v-if="s.kelas" class="text-[var(--text-tertiary)] font-normal">
                    · Kelas {{ s.kelas }}</span
                  ></span
                >
              </label>
            </div>
          </div>

          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Catatan</label
            >
            <textarea
              v-model="form.catatan"
              rows="2"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
            ></textarea>
          </div>
        </div>

        <div
          class="flex items-center justify-end gap-2 px-5 py-4 border-t border-[var(--border-subtle)] shrink-0"
        >
          <button
            class="text-xs font-bold px-3 py-2 rounded-xl border border-[var(--border-default)] text-[var(--text-secondary)]"
            @click="dlgOpen = false"
          >
            Batal
          </button>
          <button
            :disabled="saving"
            class="text-xs font-black px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white"
            @click="simpan"
          >
            <i :class="['fas mr-1', saving ? 'fa-spinner fa-spin' : 'fa-save']"></i>Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
