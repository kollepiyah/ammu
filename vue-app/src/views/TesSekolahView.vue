<script setup>
// Tes Sekolah — sisi "Sekolah" dari menu Tes Kenaikan.
//
// Materi sekolah yang perlu diuji GURU TERTENTU (ditunjuk admin per materi), bukan
//   kepala sekolah. Wali kelas mengajukan, penguji menilai.
//
// TIDAK MASUK RAPOR — sengaja tak ada satu pun sentuhan ke `rapor_semester` di sini
//   maupun di useTesSekolah. Hasilnya tampil sebagai CATATAN di akun santri
//   (CapaianPrestasiView) dan di tab Riwayat halaman ini untuk guru kelasnya.
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
  adaAjuanTerbuka,
  ajukan,
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
const pilihSantriId = ref('')
const pilihMateriId = ref('')
const pilihPengujiId = ref('')
const mengajukan = ref(false)

const santriTerpilih = computed(
  () => santriBisaDiajukan.value.find((x) => String(x.santri.id) === pilihSantriId.value) || null
)
const materiTersedia = computed(() => santriTerpilih.value?.materi || [])
const materiTerpilih = computed(
  () => materiTersedia.value.find((m) => String(m.id) === pilihMateriId.value) || null
)
const pengujiTersedia = computed(() => materiTerpilih.value?.penguji || [])

function namaPenguji(id) {
  return scope.value.gid === String(id) ? 'Saya' : id
}

// Ganti santri -> materi & penguji yang sudah dipilih jadi tak relevan (materi terikat
//   lembaga/kelas santri). Fungsi tersendiri, bukan dua pernyataan di dalam @change:
//   ekspresi template Vue tak menerima pernyataan berbaris-baris.
function onGantiSantri() {
  pilihMateriId.value = ''
  pilihPengujiId.value = ''
}

async function kirimAjuan() {
  if (!santriTerpilih.value || !materiTerpilih.value) {
    toast.warning('Pilih santri & materi dulu')
    return
  }
  mengajukan.value = true
  try {
    await ajukan(santriTerpilih.value.santri, materiTerpilih.value, pilihPengujiId.value)
    toast.success(`Ajuan "${materiTerpilih.value.nama}" terkirim`)
    pilihMateriId.value = ''
    pilihPengujiId.value = ''
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
        Wali kelas mengajukan, <b>guru penguji</b> yang menilai. Hasilnya <b>tidak masuk rapor</b> —
        hanya catatan di akun santri dan guru kelasnya.
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
    <div
      v-if="tabAktif === 'ajukan'"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm space-y-3"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label for="ts-santri" class="block text-[10px] font-bold uppercase tracking-wider mb-1">
            Santri
          </label>
          <select
            id="ts-santri"
            v-model="pilihSantriId"
            class="w-full px-3 py-2 rounded-lg bg-[var(--bg-card-elevated)] border border-[var(--border-default)] text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition"
            @change="onGantiSantri"
          >
            <option value="">— pilih santri —</option>
            <option v-for="x in santriBisaDiajukan" :key="x.santri.id" :value="String(x.santri.id)">
              {{ x.santri.nama }} · {{ x.santri.kelas_sekolah || '-' }}
            </option>
          </select>
        </div>
        <div>
          <label for="ts-materi" class="block text-[10px] font-bold uppercase tracking-wider mb-1">
            Materi
          </label>
          <select
            id="ts-materi"
            v-model="pilihMateriId"
            :disabled="!santriTerpilih"
            class="w-full px-3 py-2 rounded-lg bg-[var(--bg-card-elevated)] border border-[var(--border-default)] text-sm disabled:opacity-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition"
            @change="pilihPengujiId = ''"
          >
            <option value="">— pilih materi —</option>
            <option
              v-for="m in materiTersedia"
              :key="m.id"
              :value="String(m.id)"
              :disabled="adaAjuanTerbuka(pilihSantriId, m.id)"
            >
              {{ m.nama }}
              {{ adaAjuanTerbuka(pilihSantriId, m.id) ? '(sudah diajukan)' : '' }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="pengujiTersedia.length > 1">
        <label for="ts-penguji" class="block text-[10px] font-bold uppercase tracking-wider mb-1">
          Guru Penguji
        </label>
        <select
          id="ts-penguji"
          v-model="pilihPengujiId"
          class="w-full px-3 py-2 rounded-lg bg-[var(--bg-card-elevated)] border border-[var(--border-default)] text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition"
        >
          <option value="">— pilih penguji —</option>
          <option v-for="p in pengujiTersedia" :key="p" :value="String(p)">
            {{ namaPenguji(p) }}
          </option>
        </select>
      </div>

      <p v-if="materiTerpilih" class="text-xs text-[var(--text-secondary)]">
        Nilai maksimal <b>{{ materiTerpilih.nilai_maks }}</b
        >, lulus bila &ge; <b>{{ materiTerpilih.nilai_min_lulus }}</b
        >.
      </p>

      <button
        type="button"
        :disabled="mengajukan || !materiTerpilih"
        class="bg-teal-600 hover:bg-teal-700 active:bg-teal-800 active:scale-[0.98] focus:ring-2 focus:ring-teal-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-150 cursor-pointer"
        @click="kirimAjuan"
      >
        <i class="fas fa-paper-plane mr-1.5" aria-hidden="true"></i>Ajukan Tes
      </button>
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
