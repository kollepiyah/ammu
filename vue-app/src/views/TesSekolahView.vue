<script setup>
// Tes Sekolah — sisi "Sekolah" dari menu Tes Kenaikan.
//
// Materi sekolah yang perlu diuji GURU TERTENTU (ditunjuk admin per materi), bukan
//   kepala sekolah. Wali kelas mengajukan, penguji menilai.
//
// TAK ADA rapor sekolah di Ammu — fitur rapor di sini hanya Qiraati & Diniyah. Nilai
//   tes ini memang masuk rapor SEKOLAH, tapi diinput wali kelas di luar aplikasi.
//   Karena itu tak ada satu pun sentuhan ke `rapor_semester`: hasilnya tampil sebagai
//   CATATAN di akun santri (CapaianPrestasiView) dan di tab Riwayat halaman ini.
import { ref, computed } from 'vue'
import { useTesSekolah } from '@/composables/useTesSekolah'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useDesktopShell } from '@/composables/useDesktopShell'
import TesModeSwitch from '@/components/TesModeSwitch.vue'

const toast = useToast()
const confirmDlg = useConfirm()
const { isElectron } = useDesktopShell()
const {
  loaded,
  materiRaw,
  scope,
  isPenguji,
  isAdmin,
  antrian,
  ajuanSaya,
  riwayat,
  santriBisaDiajukan,
  materiSaya,
  santriUntukMateri,
  adaAjuanTerbuka,
  ajukanBatch,
  beriNilai,
  hapus
} = useTesSekolah()

const bisaAjukan = computed(() => santriBisaDiajukan.value.length > 0)

const tabs = computed(() => {
  const out = []
  if (bisaAjukan.value) out.push({ id: 'ajukan', label: 'Ajukan', icon: 'fa-paper-plane' })
  if (ajuanSaya.value.length > 0)
    out.push({
      id: 'status',
      label: 'Ajuan Saya',
      icon: 'fa-hourglass-half',
      badge: ajuanSaya.value.length
    })
  if (isPenguji.value || isAdmin.value)
    out.push({
      id: 'antrian',
      label: 'Antrean Nilai',
      icon: 'fa-pen-to-square',
      badge: antrian.value.length
    })
  out.push({ id: 'riwayat', label: 'Riwayat', icon: 'fa-clock-rotate-left' })
  return out
})
const activeTab = ref(isPenguji.value ? 'antrian' : 'ajukan')
// Kalau tab awal ternyata tak tersedia untuk peran ini, jatuhkan ke tab pertama.
const tabAktif = computed(() =>
  tabs.value.some((t) => t.id === activeTab.value) ? activeTab.value : tabs.value[0]?.id
)

// ---- Ajukan ---------------------------------------------------------------------
// Bentuknya sengaja MENIRU tab Ajukan Qiraati (Kyai, 12 Agu): daftar santri bercentang
//   + kotak cari, bukan dropdown satu-satu. Materi dipilih SEKALI di atas sebagai
//   KONTEKS — sama peran dengan pemilih lembaga di Qiraati — supaya tak perlu memilih
//   "santri ini tesnya apa" berulang kali. Kalau cuma ada satu materi, ia terpilih
//   sendiri dan pemilihnya tak pernah mengganggu.
const search = ref('')
const pilihMateriId = ref('')
const pilihPengujiId = ref('')
const dicentang = ref({}) // { [santriId]: true }
const mengajukan = ref(false)

const materiTerpilih = computed(() => {
  const list = materiSaya.value
  if (list.length === 0) return null
  return list.find((m) => String(m.id) === pilihMateriId.value) || list[0]
})
const pengujiTersedia = computed(() => materiTerpilih.value?.penguji || [])

// Penguji tunggal dipakai apa adanya; daftar ajukan() yang memvalidasi ulang.
const pengujiDipakai = computed(
  () => pilihPengujiId.value || (pengujiTersedia.value.length === 1 ? pengujiTersedia.value[0] : '')
)

function namaPenguji(id) {
  return scope.value.gid === String(id) ? 'Saya' : id
}

const santriEligible = computed(() => {
  const q = search.value.trim().toLowerCase()
  return santriUntukMateri(materiTerpilih.value).filter((s) => {
    if (!q) return true
    return (
      String(s.nama || '')
        .toLowerCase()
        .includes(q) ||
      String(s.nis || '')
        .toLowerCase()
        .includes(q)
    )
  })
})

const jumlahCentang = computed(
  () => santriEligible.value.filter((s) => dicentang.value[s.id]).length
)

function sudahDiajukan(s) {
  return materiTerpilih.value ? adaAjuanTerbuka(s.id, materiTerpilih.value.id) : false
}
function toggle(s) {
  if (sudahDiajukan(s)) return
  dicentang.value = { ...dicentang.value, [s.id]: !dicentang.value[s.id] }
}

// Ganti materi -> centangan lama tak relevan (daftar santrinya berubah). Fungsi
//   tersendiri, bukan dua pernyataan di dalam @change: ekspresi template Vue tak
//   menerima pernyataan berbaris-baris.
function onGantiMateri() {
  dicentang.value = {}
  pilihPengujiId.value = ''
}

async function kirimAjuan() {
  const materi = materiTerpilih.value
  if (!materi) return toast.warning('Belum ada materi tes yang berlaku')
  if (!pengujiDipakai.value) return toast.warning('Pilih guru penguji dulu')
  const daftar = santriEligible.value.filter((s) => dicentang.value[s.id] && !sudahDiajukan(s))
  if (daftar.length === 0) return toast.warning('Centang santri dulu')

  mengajukan.value = true
  try {
    const { ok, gagal } = await ajukanBatch(daftar, materi, pengujiDipakai.value)
    if (ok > 0) toast.success(`${ok} ajuan "${materi.nama}" terkirim`)
    // Kegagalan sebagian dilaporkan apa adanya — jangan diam-diam ditelan.
    if (gagal.length > 0) toast.error(`${gagal.length} gagal — ${gagal[0]}`)
    dicentang.value = {}
  } catch (e) {
    toast.error(e?.message || 'Gagal mengajukan')
  } finally {
    mengajukan.value = false
  }
}

// ---- Menilai --------------------------------------------------------------------
const nilaiDraft = ref({}) // { [barisId]: { nilai, catatan } }
const menilaiId = ref('')

function draft(id) {
  if (!nilaiDraft.value[id]) nilaiDraft.value[id] = { nilai: '', catatan: '' }
  return nilaiDraft.value[id]
}

async function simpanNilai(b) {
  const d = draft(b.id)
  menilaiId.value = b.id
  try {
    await beriNilai(b, d.nilai, d.catatan)
    toast.success('Nilai tersimpan')
    delete nilaiDraft.value[b.id]
  } catch (e) {
    toast.error(e?.message || 'Gagal menyimpan nilai')
  } finally {
    menilaiId.value = ''
  }
}

async function hapusBaris(b) {
  const ok = await confirmDlg({
    title: 'Hapus catatan tes?',
    message: `Hapus catatan tes "${b.materi_nama_cache || '-'}" milik ${b.nama_cache || '-'}? Tidak bisa di-undo.`,
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    await hapus(b.id)
    toast.success('Catatan dihapus')
  } catch (e) {
    toast.error(e?.message || 'Gagal menghapus')
  }
}
</script>

<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div
      v-if="!isElectron"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <h1 class="text-base md:text-lg font-black">
        <i class="fas fa-school text-teal-500 mr-2" aria-hidden="true"></i>Tes Sekolah
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        Wali kelas mengajukan, <b>guru penguji</b> yang menilai. Hasilnya jadi <b>catatan</b> di
        akun santri dan guru kelasnya — nilai rapor sekolah tetap diinput wali kelas di luar
        aplikasi ini.
      </p>
    </div>

    <TesModeSwitch aktif="sekolah" />

    <!-- Materi belum diisi: jelaskan, jangan biarkan halaman tampak rusak -->
    <div
      v-if="loaded && materiRaw.length === 0"
      class="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100 rounded-2xl p-4 text-sm"
    >
      <p class="font-bold">
        <i class="fas fa-triangle-exclamation mr-1.5" aria-hidden="true"></i>Belum ada materi tes
      </p>
      <p class="text-xs mt-1 leading-relaxed">
        Materi tes ditambahkan super admin di <b>Master Data › Lembaga › Materi Tes</b>. Selama
        daftarnya kosong, belum ada yang bisa diajukan.
      </p>
    </div>

    <!-- Tabs -->
    <div v-if="tabs.length > 0" class="flex gap-1.5 flex-wrap">
      <button
        v-for="t in tabs"
        :key="t.id"
        type="button"
        :class="[
          'px-3.5 py-2 rounded-xl text-xs font-black transition-all duration-150 cursor-pointer focus:ring-2 focus:ring-teal-400 focus:outline-none',
          tabAktif === t.id
            ? 'bg-teal-600 text-white shadow-sm'
            : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-muted)]'
        ]"
        @click="activeTab = t.id"
      >
        <i :class="['fas', t.icon, 'mr-1']" aria-hidden="true"></i>{{ t.label }}
        <span
          v-if="t.badge"
          class="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-white text-[10px]"
          >{{ t.badge }}</span
        >
      </button>
    </div>

    <!-- ============ TAB: AJUKAN ============ -->
    <div v-if="tabAktif === 'ajukan'" class="space-y-3">
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm space-y-3"
      >
        <div class="flex gap-2">
          <div class="relative flex-1">
            <i
              class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"
              aria-hidden="true"
            ></i>
            <input
              v-model="search"
              type="text"
              aria-label="Cari santri"
              placeholder="Cari nama / No. Induk santri..."
              class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <select
            v-if="materiSaya.length > 1"
            v-model="pilihMateriId"
            aria-label="Materi tes"
            class="px-2.5 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
            @change="onGantiMateri"
          >
            <option v-for="m in materiSaya" :key="m.id" :value="String(m.id)">{{ m.nama }}</option>
          </select>
        </div>

        <!-- Penguji: tetap dropdown (Kyai). Disembunyikan kalau materinya cuma punya
             satu penguji — pilihan tunggal yang tak pernah diganti hanya menambah langkah. -->
        <div v-if="pengujiTersedia.length > 1" class="flex items-center gap-2">
          <label for="ts-penguji" class="text-[10px] font-black uppercase tracking-wider shrink-0">
            Penguji
          </label>
          <select
            id="ts-penguji"
            v-model="pilihPengujiId"
            class="flex-1 px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">— pilih penguji —</option>
            <option v-for="p in pengujiTersedia" :key="p" :value="String(p)">
              {{ namaPenguji(p) }}
            </option>
          </select>
        </div>

        <p class="text-[11px] text-[var(--text-tertiary)] font-bold">
          <template v-if="materiTerpilih">
            <b class="text-teal-600">{{ materiTerpilih.nama }}</b> — nilai maks
            {{ materiTerpilih.nilai_maks }}, lulus &ge; {{ materiTerpilih.nilai_min_lulus }}.
          </template>
          {{ santriEligible.length }} santri bisa diajukan. Tercentang:
          <b class="text-teal-600">{{ jumlahCentang }}</b>
        </p>
      </div>

      <div
        v-if="santriEligible.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i
          class="fas fa-user-slash text-[var(--text-tertiary)] text-3xl mb-2"
          aria-hidden="true"
        ></i>
        <p class="text-sm text-[var(--text-secondary)] italic">
          Tidak ada santri kelas Anda yang cocok dengan materi ini.
        </p>
      </div>

      <div
        v-else
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <div class="max-h-[55vh] overflow-y-auto divide-y divide-[var(--border-subtle)]">
          <label
            v-for="s in santriEligible"
            :key="s.id"
            class="flex items-start gap-3 p-3 md:p-3.5 cursor-pointer hover:bg-[var(--bg-card-elevated)] transition-colors duration-150"
          >
            <input
              type="checkbox"
              :checked="!!dicentang[s.id]"
              :disabled="sudahDiajukan(s)"
              class="mt-1 w-4 h-4 accent-teal-600 flex-shrink-0 disabled:opacity-40"
              @change="toggle(s)"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</p>
              <p class="text-[11px] text-[var(--text-secondary)]">
                {{ s.lembaga_sekolah || '-'
                }}<span v-if="s.kelas_sekolah"> · {{ s.kelas_sekolah }}</span>
              </p>
              <p v-if="sudahDiajukan(s)" class="text-[10px] text-amber-600 font-bold mt-0.5">
                <i class="fas fa-hourglass-half mr-1" aria-hidden="true"></i>Sudah ada ajuan
                menunggu tes
              </p>
            </div>
          </label>
        </div>
      </div>

      <div v-if="jumlahCentang > 0" class="sticky bottom-3 flex justify-end">
        <button
          type="button"
          :disabled="mengajukan"
          class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 active:scale-[0.98] focus:ring-2 focus:ring-teal-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-black shadow-lg transition-all duration-150 cursor-pointer"
          @click="kirimAjuan"
        >
          <i
            :class="['fas', mengajukan ? 'fa-spinner fa-spin' : 'fa-paper-plane', 'mr-1.5']"
            aria-hidden="true"
          ></i>
          Ajukan Tes ({{ jumlahCentang }})
        </button>
      </div>
    </div>

    <!-- ============ TAB: AJUAN SAYA ============ -->
    <div v-else-if="tabAktif === 'status'" class="space-y-2">
      <div
        v-for="b in ajuanSaya"
        :key="b.id"
        class="bg-[var(--bg-card)] rounded-xl p-3 border border-[var(--border-subtle)] flex items-center justify-between gap-3"
      >
        <div class="min-w-0">
          <p class="font-bold text-sm truncate">{{ b.nama_cache }}</p>
          <p class="text-xs text-[var(--text-secondary)]">
            {{ b.materi_nama_cache }} · diajukan {{ b.tgl_ajuan }}
          </p>
        </div>
        <span
          class="text-[10px] uppercase tracking-wider font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 px-2 py-1 rounded whitespace-nowrap"
        >
          <i class="fas fa-hourglass-half mr-0.5" aria-hidden="true"></i>Menunggu
        </span>
      </div>
    </div>

    <!-- ============ TAB: ANTREAN NILAI ============ -->
    <div v-else-if="tabAktif === 'antrian'" class="space-y-2">
      <div
        v-if="antrian.length === 0"
        class="text-center py-10 text-[var(--text-tertiary)] border border-dashed border-[var(--border-default)] rounded-xl"
      >
        <i class="fas fa-mug-hot text-3xl mb-2 block opacity-40" aria-hidden="true"></i>
        <p class="text-sm font-bold">Tidak ada antrean</p>
      </div>
      <div
        v-for="b in antrian"
        :key="b.id"
        class="bg-[var(--bg-card)] rounded-xl p-3 border border-[var(--border-subtle)] space-y-2"
      >
        <div>
          <p class="font-bold text-sm">{{ b.nama_cache }}</p>
          <p class="text-xs text-[var(--text-secondary)]">
            {{ b.materi_nama_cache }} · {{ b.lembaga_sekolah }} {{ b.kelas_sekolah }} · diajukan
            {{ b.pengaju_nama || '-' }} ({{ b.tgl_ajuan }})
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-[7rem_1fr_auto] gap-2 items-end">
          <div>
            <label
              :for="`nilai-${b.id}`"
              class="block text-[10px] font-bold uppercase tracking-wider mb-1"
            >
              Nilai<span v-if="b._materi"> (0–{{ b._materi.nilai_maks }})</span>
            </label>
            <input
              :id="`nilai-${b.id}`"
              v-model="draft(b.id).nilai"
              type="number"
              min="0"
              :max="b._materi?.nilai_maks"
              class="w-full px-3 py-2 rounded-lg bg-[var(--bg-card-elevated)] border border-[var(--border-default)] text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              :for="`catatan-${b.id}`"
              class="block text-[10px] font-bold uppercase tracking-wider mb-1"
            >
              Catatan
            </label>
            <input
              :id="`catatan-${b.id}`"
              v-model="draft(b.id).catatan"
              type="text"
              placeholder="opsional"
              class="w-full px-3 py-2 rounded-lg bg-[var(--bg-card-elevated)] border border-[var(--border-default)] text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition"
            />
          </div>
          <button
            type="button"
            :disabled="menilaiId === b.id"
            class="bg-teal-600 hover:bg-teal-700 active:bg-teal-800 active:scale-[0.98] focus:ring-2 focus:ring-teal-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all duration-150 cursor-pointer whitespace-nowrap"
            @click="simpanNilai(b)"
          >
            <i class="fas fa-check mr-1.5" aria-hidden="true"></i>Simpan
          </button>
        </div>
      </div>
    </div>

    <!-- ============ TAB: RIWAYAT ============ -->
    <div v-else-if="tabAktif === 'riwayat'" class="space-y-2">
      <div
        v-if="riwayat.length === 0"
        class="text-center py-10 text-[var(--text-tertiary)] border border-dashed border-[var(--border-default)] rounded-xl"
      >
        <i class="fas fa-folder-open text-3xl mb-2 block opacity-40" aria-hidden="true"></i>
        <p class="text-sm font-bold">Belum ada hasil tes</p>
      </div>
      <div
        v-for="b in riwayat"
        :key="b.id"
        class="bg-[var(--bg-card)] rounded-xl p-3 border border-[var(--border-subtle)] flex items-start justify-between gap-3"
      >
        <div class="min-w-0">
          <p class="font-bold text-sm truncate">{{ b.nama_cache }}</p>
          <p class="text-xs text-[var(--text-secondary)]">
            {{ b.materi_nama_cache }} · {{ b.tgl_hasil }} · penguji {{ b.penguji_nama || '-' }}
          </p>
          <p v-if="b.catatan" class="text-xs mt-1 italic text-[var(--text-secondary)]">
            "{{ b.catatan }}"
          </p>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-sm font-black">{{ b.nilai }}</span>
          <span
            :class="[
              'text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded border whitespace-nowrap',
              b.lulus
                ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800'
                : 'text-rose-700 bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800'
            ]"
          >
            <i :class="['fas', b.lulus ? 'fa-check' : 'fa-xmark', 'mr-0.5']" aria-hidden="true"></i>
            {{ b.lulus ? 'Lulus' : 'Belum' }}
          </span>
          <button
            v-if="isAdmin"
            type="button"
            aria-label="Hapus catatan tes"
            class="p-2 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 focus:ring-2 focus:ring-rose-400 focus:outline-none transition cursor-pointer"
            @click="hapusBaris(b)"
          >
            <i class="fas fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
