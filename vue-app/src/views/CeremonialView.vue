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
  setStatus,
  hapusSesi
} = useCeremonial()
const { ajuanRaw } = useTesKenaikan()
const { guruRaw } = useGuru()
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
  return [...guruRaw.value]
    .filter((g) => g.status !== 'Non-Aktif')
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
  let dasar = kandidatPeserta(ajuanRaw.value)
  // v.1.1.9: PJ menjadwal hanya untuk santri AMPUANNYA. super_admin & koordinator
  //   tetap melihat semua kandidat.
  if (!isSuper.value && !isKoordinator.value && isPjPtpt.value) {
    dasar = dasar.filter((k) => isAmpuanSaya.value(k.santri_id))
  }
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
        @click="bukaBaru"
        class="mt-3 inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-teal-700 text-[11px] font-black px-3 py-1.5 rounded-lg shadow-sm transition"
      >
        <i class="fas fa-plus"></i>Jadwalkan Sesi
      </button>
    </div>

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
        @click="filterStatus = f.v"
        :class="[
          'px-3 py-1.5 rounded-xl text-xs font-black border transition cursor-pointer whitespace-nowrap',
          filterStatus === f.v
            ? 'bg-teal-600 text-white border-teal-700'
            : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-teal-50 dark:hover:bg-teal-900/30'
        ]"
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
            @click="bukaUbah(s)"
            class="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white"
          >
            <i class="fas fa-pen mr-1"></i>Ubah
          </button>
          <button
            v-if="canKelola && s.status !== 'selesai'"
            @click="ubahStatus(s, 'selesai')"
            class="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-600 hover:bg-slate-700 text-white"
          >
            <i class="fas fa-check mr-1"></i>Selesai
          </button>
          <button
            v-if="isSuper"
            @click="hapus(s)"
            class="text-[11px] font-bold px-2 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white"
            aria-label="Hapus sesi"
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
            <p class="text-xs font-bold text-[var(--text-primary)] mt-0.5">
              {{ (s.penyimak_guru || []).map((g) => g.nama).join(', ') || '—' }}
            </p>
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
            @click="dlgOpen = false"
            class="text-[var(--text-secondary)] hover:text-rose-500 p-1"
            aria-label="Tutup"
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
              Belum ada santri PTPT yang lulus tes PJ dan belum dijadwalkan.
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
                  @change="togglePeserta(k)"
                  class="w-4 h-4 accent-teal-600 flex-shrink-0"
                />
                <span class="flex-1 min-w-0">
                  <span class="block text-xs font-bold text-[var(--text-primary)] truncate">{{
                    k.nama
                  }}</span>
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
                  @change="toggleOrang(form.penyimak_guru, g)"
                  class="w-4 h-4 accent-teal-600 flex-shrink-0"
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
                  @change="toggleOrang(form.penyimak_santri, s)"
                  class="w-4 h-4 accent-teal-600 flex-shrink-0"
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
            @click="dlgOpen = false"
            class="text-xs font-bold px-3 py-2 rounded-xl border border-[var(--border-default)] text-[var(--text-secondary)]"
          >
            Batal
          </button>
          <button
            @click="simpan"
            :disabled="saving"
            class="text-xs font-black px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white"
          >
            <i :class="['fas mr-1', saving ? 'fa-spinner fa-spin' : 'fa-save']"></i>Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
