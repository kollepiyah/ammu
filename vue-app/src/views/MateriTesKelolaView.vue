<script setup>
// Kelola Materi Tes Sekolah — sub-menu Master Data > Lembaga > Materi Tes.
// Model master/materi_tes: { items: [{ id, nama, aktif, lembaga_sekolah, kelas[],
//   penguji[guru_id], nilai_maks, nilai_min_lulus }] }
//
// SENGAJA TANPA seed default (beda dengan JabatanKelolaView): materi tes itu isi
//   pesantren, bukan kerangka sistem — tak ada nilai bawaan yang masuk akal. Daftarnya
//   memang mulai kosong sampai Kyai mengisi sendiri, sama seperti Jenis Bisyaroh.
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { subscribeDoc, mergeOne } from '@/services/db'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useGuru } from '@/composables/useGuru'
import { useLembaga, isSekolahLembaga } from '@/composables/useLembaga'
import { namaLembaga } from '@/utils/jabatanUnit'
import { guruAktifSaja } from '@/utils/guruScope'
import { bacaMateriTes, NILAI_MAKS_DEFAULT, NILAI_MIN_LULUS_DEFAULT } from '@/utils/tesSekolah'

const toast = useToast()
const confirmDlg = useConfirm()
const { guruRaw } = useGuru()
const { lembagaRaw } = useLembaga()

const items = ref([])
let _unsub = null

onMounted(() => {
  _unsub = subscribeDoc('master', 'materi_tes', (data) => {
    // `data === null` di sini benar-benar berarti "baris belum ada" — master_sel =
    //   using(true), jadi bukan penolakan RLS yang menyamar. Tak ada seed: biarkan kosong.
    items.value = data === null ? [] : bacaMateriTes(data)
  })
})
onUnmounted(() => {
  if (_unsub) {
    try {
      _unsub()
    } catch (e) {
      /* noop */
    }
  }
})

// Hanya lembaga SEKOLAH formal yang boleh punya materi tes — sumber tunggal
//   isSekolahLembaga() (bukan daftar nama hardcoded, lihat useLembaga.js).
const sekolahOptions = computed(() =>
  (lembagaRaw.value || [])
    .map((l) => namaLembaga(l))
    .filter((n) => n && isSekolahLembaga(n, lembagaRaw.value))
)

// Kelas yang tersedia untuk lembaga yang sedang dipilih di form.
const kelasOptions = computed(() => {
  const l = (lembagaRaw.value || []).find((x) => namaLembaga(x) === form.lembaga_sekolah)
  return Array.isArray(l?.kelas) ? l.kelas.filter(Boolean) : []
})

// Kandidat penguji: guru AKTIF saja. Guru lama yang sudah tak bertugas tak boleh
//   muncul di pemilih — cacat yang sama pernah kena TesKenaikanView & NaikKelasView.
const guruOptions = computed(() =>
  guruAktifSaja(guruRaw.value || [])
    .slice()
    .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || '')))
)

function namaGuru(id) {
  return guruOptions.value.find((g) => String(g.id) === String(id))?.nama || id
}

const form = reactive({
  nama: '',
  lembaga_sekolah: '',
  kelas: [],
  penguji: [],
  nilai_maks: NILAI_MAKS_DEFAULT,
  nilai_min_lulus: NILAI_MIN_LULUS_DEFAULT,
  aktif: true,
  idx: null
})
const saving = ref(false)

function resetForm() {
  form.nama = ''
  form.lembaga_sekolah = ''
  form.kelas = []
  form.penguji = []
  form.nilai_maks = NILAI_MAKS_DEFAULT
  form.nilai_min_lulus = NILAI_MIN_LULUS_DEFAULT
  form.aktif = true
  form.idx = null
}

function editItem(idx) {
  const it = items.value[idx]
  if (!it) return
  form.nama = it.nama
  form.lembaga_sekolah = it.lembaga_sekolah
  form.kelas = [...(it.kelas || [])]
  form.penguji = [...(it.penguji || [])]
  form.nilai_maks = it.nilai_maks
  form.nilai_min_lulus = it.nilai_min_lulus
  form.aktif = it.aktif !== false
  form.idx = idx
}

function toggleDalam(arrName, nilai) {
  const cur = [...form[arrName]]
  const i = cur.findIndex((x) => String(x).toLowerCase() === String(nilai).toLowerCase())
  if (i >= 0) cur.splice(i, 1)
  else cur.push(nilai)
  form[arrName] = cur
}
function terpilih(arrName, nilai) {
  return form[arrName].some((x) => String(x).toLowerCase() === String(nilai).toLowerCase())
}

// Ganti lembaga -> kelas yang sudah dipilih jadi tak relevan. Dibersihkan supaya
//   materi tak diam-diam menyimpan kelas milik lembaga lain (yang lalu tak pernah cocok).
function onGantiLembaga() {
  form.kelas = []
}

async function persist(arr) {
  await mergeOne('master', 'materi_tes', { items: arr })
}

function idBaru(nama) {
  const dasar =
    String(nama)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'materi'
  let id = dasar
  let n = 2
  while (items.value.some((it) => it.id === id)) id = `${dasar}_${n++}`
  return id
}

async function simpan() {
  const nama = form.nama.trim()
  if (!nama) return toast.warning('Nama materi wajib diisi')
  if (!form.lembaga_sekolah) return toast.warning('Pilih lembaga sekolah dulu')
  if (form.penguji.length === 0)
    return toast.warning(
      'Pilih minimal 1 guru penguji — tanpa itu tesnya tak bisa dinilai siapa pun'
    )
  const maks = Number(form.nilai_maks)
  const minLulus = Number(form.nilai_min_lulus)
  if (!Number.isFinite(maks) || maks <= 0) return toast.warning('Nilai maksimal harus lebih dari 0')
  if (!Number.isFinite(minLulus) || minLulus < 0 || minLulus > maks)
    return toast.warning('Batas lulus harus antara 0 dan nilai maksimal')

  // Duplikat dinilai per (nama + lembaga): materi bernama sama di dua sekolah itu WAJAR.
  const dupIdx = items.value.findIndex(
    (it) =>
      it.nama.toLowerCase() === nama.toLowerCase() &&
      it.lembaga_sekolah.toLowerCase() === form.lembaga_sekolah.toLowerCase()
  )
  if (dupIdx !== -1 && dupIdx !== form.idx)
    return toast.warning(`Materi "${nama}" sudah ada di ${form.lembaga_sekolah}`)

  saving.value = true
  try {
    const arr = [...items.value]
    const entry = {
      // id DIPERTAHANKAN saat edit — ia kunci yang dirujuk baris tes_sekolah.materi_id
      //   DAN dipakai RLS auth_is_penguji_materi. Menggantinya memutus tes yang sudah ada.
      id: form.idx !== null ? arr[form.idx].id : idBaru(nama),
      nama,
      aktif: form.aktif,
      lembaga_sekolah: form.lembaga_sekolah,
      kelas: [...form.kelas],
      penguji: [...form.penguji],
      nilai_maks: maks,
      nilai_min_lulus: minLulus
    }
    if (form.idx !== null) arr[form.idx] = entry
    else arr.push(entry)
    await persist(arr)
    toast.success(form.idx !== null ? 'Materi diperbarui' : 'Materi ditambahkan')
    resetForm()
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

async function hapus(idx) {
  const it = items.value[idx]
  if (!it) return
  const ok = await confirmDlg({
    title: 'Hapus Materi Tes?',
    message: `Hapus materi "${it.nama}" (${it.lembaga_sekolah})? Riwayat tes yang sudah tercatat TIDAK ikut terhapus, tapi materinya tak bisa diajukan lagi. Kalau cuma ingin menghentikan sementara, matikan saja saklar Aktif.`,
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    const arr = items.value.filter((_, i) => i !== idx)
    await persist(arr)
    if (form.idx === idx) resetForm()
    toast.success('Materi dihapus')
  } catch (e) {
    toast.error('Gagal menghapus: ' + (e.message || e))
  }
}
</script>

<template>
  <div class="p-4 md:p-6 space-y-4">
    <div>
      <h3 class="text-lg md:text-xl font-bold text-[var(--text-primary)]">Materi Tes Sekolah</h3>
      <p class="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
        Materi sekolah yang perlu diuji oleh <b>guru tertentu</b>, bukan kepala sekolah. Wali kelas
        mengajukan santrinya, guru penguji yang menilai. Nilainya <b>tidak masuk rapor</b> — hanya
        jadi catatan di akun santri dan guru kelasnya.
      </p>
    </div>

    <!-- FORM -->
    <div class="bg-[var(--bg-card-elevated)] rounded-xl p-4 space-y-3">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label for="mt-nama" class="block text-[10px] font-bold uppercase tracking-wider mb-1">
            Nama Materi
          </label>
          <input
            id="mt-nama"
            v-model="form.nama"
            type="text"
            placeholder="mis. Imla, Baca Kitab, Praktik Ibadah"
            class="w-full px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)] text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition"
          />
        </div>
        <div>
          <label for="mt-lembaga" class="block text-[10px] font-bold uppercase tracking-wider mb-1">
            Lembaga Sekolah
          </label>
          <select
            id="mt-lembaga"
            v-model="form.lembaga_sekolah"
            class="w-full px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)] text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition"
            @change="onGantiLembaga"
          >
            <option value="">— pilih —</option>
            <option v-for="l in sekolahOptions" :key="l" :value="l">{{ l }}</option>
          </select>
        </div>
      </div>

      <!-- Kelas -->
      <div>
        <span class="block text-[10px] font-bold uppercase tracking-wider mb-1">
          Kelas
          <span class="normal-case font-normal">(kosongkan = semua kelas di lembaga ini)</span>
        </span>
        <p v-if="!form.lembaga_sekolah" class="text-xs text-[var(--text-tertiary)] italic">
          Pilih lembaga dulu.
        </p>
        <p v-else-if="kelasOptions.length === 0" class="text-xs text-[var(--text-tertiary)] italic">
          Lembaga ini belum punya daftar kelas — materi akan berlaku untuk semua santrinya.
        </p>
        <div v-else class="flex flex-wrap gap-1.5">
          <button
            v-for="k in kelasOptions"
            :key="k"
            type="button"
            :aria-pressed="terpilih('kelas', k)"
            :class="[
              'px-2.5 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer',
              terpilih('kelas', k)
                ? 'bg-teal-600 text-white border-teal-700'
                : 'bg-[var(--bg-card)] border-[var(--border-default)] hover:bg-teal-50 dark:hover:bg-teal-950'
            ]"
            @click="toggleDalam('kelas', k)"
          >
            {{ k }}
          </button>
        </div>
      </div>

      <!-- Penguji -->
      <div>
        <span class="block text-[10px] font-bold uppercase tracking-wider mb-1">
          Guru Penguji <span class="normal-case font-normal">(boleh lebih dari satu)</span>
        </span>
        <div class="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
          <button
            v-for="g in guruOptions"
            :key="g.id"
            type="button"
            :aria-pressed="terpilih('penguji', g.id)"
            :class="[
              'px-2.5 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer',
              terpilih('penguji', g.id)
                ? 'bg-indigo-600 text-white border-indigo-700'
                : 'bg-[var(--bg-card)] border-[var(--border-default)] hover:bg-indigo-50 dark:hover:bg-indigo-950'
            ]"
            @click="toggleDalam('penguji', g.id)"
          >
            {{ g.nama }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div>
          <label for="mt-maks" class="block text-[10px] font-bold uppercase tracking-wider mb-1">
            Nilai Maksimal
          </label>
          <input
            id="mt-maks"
            v-model.number="form.nilai_maks"
            type="number"
            min="1"
            class="w-full px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)] text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition"
          />
        </div>
        <div>
          <label for="mt-min" class="block text-[10px] font-bold uppercase tracking-wider mb-1">
            Batas Lulus
          </label>
          <input
            id="mt-min"
            v-model.number="form.nilai_min_lulus"
            type="number"
            min="0"
            class="w-full px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)] text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition"
          />
        </div>
        <div class="flex items-end">
          <label class="flex items-center gap-2 text-sm font-bold cursor-pointer py-2">
            <input v-model="form.aktif" type="checkbox" class="w-4 h-4 accent-teal-600" />
            Aktif
          </label>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          :disabled="saving"
          class="bg-teal-600 hover:bg-teal-700 active:bg-teal-800 active:scale-[0.98] focus:ring-2 focus:ring-teal-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-150 cursor-pointer"
          @click="simpan"
        >
          <i class="fas fa-save mr-1.5" aria-hidden="true"></i>
          {{ form.idx !== null ? 'Perbarui' : 'Tambah' }}
        </button>
        <button
          v-if="form.idx !== null"
          type="button"
          class="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-[0.98] focus:ring-2 focus:ring-slate-400 focus:outline-none text-[var(--text-primary)] font-bold px-5 py-2.5 rounded-xl border border-[var(--border-default)] text-sm transition-all duration-150 cursor-pointer"
          @click="resetForm"
        >
          Batal
        </button>
      </div>
    </div>

    <!-- DAFTAR -->
    <div
      v-if="items.length === 0"
      class="text-center py-10 text-[var(--text-tertiary)] border border-dashed border-[var(--border-default)] rounded-xl"
    >
      <i class="fas fa-clipboard-list text-3xl mb-2 block opacity-40" aria-hidden="true"></i>
      <p class="text-sm font-bold">Belum ada materi tes</p>
      <p class="text-xs mt-1">
        Tambahkan materi pertama di atas. Selama daftar ini kosong, halaman Tes Sekolah belum bisa
        dipakai siapa pun.
      </p>
    </div>

    <div
      v-else
      class="border border-[var(--border-subtle)] rounded-xl overflow-hidden overflow-x-auto"
    >
      <table class="w-full text-sm min-w-[720px]">
        <thead>
          <tr
            class="bg-[var(--bg-card-elevated)] text-[10px] uppercase tracking-wider text-[var(--text-secondary)]"
          >
            <th class="text-left px-3 py-2.5 font-black w-10">No</th>
            <th class="text-left px-3 py-2.5 font-black">Materi</th>
            <th class="text-left px-3 py-2.5 font-black">Lembaga / Kelas</th>
            <th class="text-left px-3 py-2.5 font-black">Penguji</th>
            <th class="text-left px-3 py-2.5 font-black w-24">Nilai</th>
            <th class="text-center px-3 py-2.5 font-black w-24">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--border-subtle)]">
          <tr v-for="(it, i) in items" :key="it.id" class="hover:bg-[var(--bg-card-elevated)]">
            <td class="px-3 py-2.5 text-[var(--text-tertiary)]">{{ i + 1 }}</td>
            <td class="px-3 py-2.5">
              <span class="font-bold">{{ it.nama }}</span>
              <span
                v-if="!it.aktif"
                class="ml-1.5 text-[10px] uppercase tracking-wider text-amber-700 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 px-1.5 py-0.5 rounded"
              >
                <i class="fas fa-pause mr-0.5" aria-hidden="true"></i>Nonaktif
              </span>
            </td>
            <td class="px-3 py-2.5 text-xs">
              {{ it.lembaga_sekolah }}
              <span class="text-[var(--text-tertiary)]">
                · {{ it.kelas.length ? it.kelas.join(', ') : 'semua kelas' }}
              </span>
            </td>
            <td class="px-3 py-2.5 text-xs">
              {{ it.penguji.map(namaGuru).join(', ') || '—' }}
            </td>
            <td class="px-3 py-2.5 text-xs whitespace-nowrap">
              maks {{ it.nilai_maks }} · lulus &ge;{{ it.nilai_min_lulus }}
            </td>
            <td class="px-3 py-2.5">
              <div class="flex items-center justify-center gap-1">
                <button
                  type="button"
                  aria-label="Ubah materi"
                  class="p-2 rounded-lg text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950 focus:ring-2 focus:ring-teal-400 focus:outline-none transition cursor-pointer"
                  @click="editItem(i)"
                >
                  <i class="fas fa-pen" aria-hidden="true"></i>
                </button>
                <button
                  type="button"
                  aria-label="Hapus materi"
                  class="p-2 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 focus:ring-2 focus:ring-rose-400 focus:outline-none transition cursor-pointer"
                  @click="hapus(i)"
                >
                  <i class="fas fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
