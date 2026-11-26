<script setup>
// Edit Kitab & Wirid di halaman sendiri (Kyai 26 Nov 2026, contoh editor SIAKAD): tiap kata bisa
// ditebalkan/dimiringkan/diwarnai, tiap baris diatur rata & gayanya (Arab/Latin/Arti/Judul/
// Syair). Satu bab = satu dokumen HTML; disaring utils/isiAmalan sebelum disimpan & ditampilkan.
// Bacaan bentuk lama (blok) dikonversi otomatis saat dibuka (htmlBab).
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { GayaBaris, WarnaKata, UkuranTeks } from '@/components/amalan/ekstensiAmalan'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useAuthStore } from '@/stores/auth'
import { ambilAmalan, simpanAmalan, hapusAmalan } from '@/services/amalan'
import { KATEGORI_AMALAN, WARNA_TEKS, babAmalan, bersihkanAmalan, kelasWarna } from '@/utils/amalan'
import {
  GAYA_BARIS,
  WARNA_KATA,
  UKURAN_TEKS,
  htmlBab,
  rapikanTampilan,
  saringHtmlAmalan
} from '@/utils/isiAmalan'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const confirmDlg = useConfirm()
const auth = useAuthStore()

const idAwal = String(route.params.id || 'baru')
const baru = idAwal === 'baru'
const memuat = ref(!baru)
const menyimpan = ref(false)
const infoBuka = ref(baru)
const babAktif = ref(0)
const menuWarna = ref(false)

const form = reactive({
  id: baru ? '' : idAwal,
  judul: '',
  kategori: 'wirid',
  urutan: 0,
  aktif: true,
  keterangan: '',
  bentuk: 'tunggal',
  bab: [{ judul: '', warna: '', html: '' }]
})
const berbab = computed(() => form.bentuk === 'berbab')
const satuan = computed(() => (berbab.value ? 'Bab' : 'Halaman'))
const babKini = computed(() => form.bab[babAktif.value] || form.bab[0])

// Naik tiap transaksi editor → toolbar (tebal aktif, gaya baris) ikut diperbarui.
const versi = ref(0)
const editor = useEditor({
  onTransaction: () => {
    versi.value++
  },
  extensions: [
    StarterKit.configure({
      heading: false,
      code: false,
      codeBlock: false,
      blockquote: false,
      bulletList: false,
      orderedList: false,
      listItem: false,
      listKeymap: false,
      link: false
    }),
    TextAlign.configure({ types: ['paragraph'] }),
    GayaBaris,
    WarnaKata,
    UkuranTeks
  ],
  content: '',
  editorProps: {
    attributes: { class: 'isi-amalan editor-amalan px-4 py-3' },
    // Tempelan Word/WhatsApp: gambar hiasan & gaya asing dibuang, baris Arab langsung bergaya Arab.
    transformPastedHTML: (html) => rapikanTampilan(saringHtmlAmalan(html))
  }
})
onBeforeUnmount(() => editor.value?.destroy())

// Isi bab aktif disimpan ke form sebelum pindah bab / menyimpan.
function simpanBabKini() {
  if (editor.value && form.bab[babAktif.value])
    form.bab[babAktif.value].html = editor.value.getHTML()
}
function muatBab(i) {
  babAktif.value = i
  editor.value?.commands.setContent(form.bab[i]?.html || '', { emitUpdate: false })
}
function pilihBab(i) {
  if (i === babAktif.value) return
  simpanBabKini()
  muatBab(i)
}
function tambahBab() {
  simpanBabKini()
  form.bab.push({ judul: '', warna: '', html: '' })
  muatBab(form.bab.length - 1)
}
async function hapusBab() {
  const ok = await confirmDlg({
    title: `Hapus ${satuan.value.toLowerCase()} ${babAktif.value + 1}?`,
    message: 'Isinya ikut terhapus saat disimpan.',
    confirmText: 'Hapus',
    cancelText: 'Batal',
    danger: true
  })
  if (!ok) return
  if (form.bab.length <= 1) form.bab = [{ judul: '', warna: '', html: '' }]
  else form.bab.splice(babAktif.value, 1)
  muatBab(Math.min(babAktif.value, form.bab.length - 1))
}
function geserBab(arah) {
  const i = babAktif.value
  const j = i + arah
  if (j < 0 || j >= form.bab.length) return
  simpanBabKini()
  const [b] = form.bab.splice(i, 1)
  form.bab.splice(j, 0, b)
  babAktif.value = j
}

// Muat bacaan yang ada (bentuk lama dikonversi ke HTML).
async function muat() {
  if (baru) return
  try {
    const a = await ambilAmalan(idAwal)
    if (!a) {
      toast.error('Bacaan tidak ditemukan.')
      router.replace({ path: '/master-data', query: { tab: 'amalan' } })
      return
    }
    Object.assign(form, {
      judul: a.judul || '',
      kategori: a.kategori || 'wirid',
      urutan: a.urutan || 0,
      aktif: a.aktif !== false,
      keterangan: a.keterangan || '',
      bentuk: a.bentuk === 'berbab' ? 'berbab' : 'tunggal'
    })
    const bab = babAmalan(a).map((x) => ({
      judul: x.judul || '',
      warna: x.warna || '',
      html: htmlBab(x)
    }))
    form.bab = bab.length ? bab : [{ judul: '', warna: '', html: '' }]
  } catch (e) {
    toast.error('Gagal memuat: ' + (e?.message || e))
  } finally {
    memuat.value = false
  }
}
// Editor baru siap sesudah dipasang — isi bab pertama dimuat begitu keduanya siap.
watch(
  () => [editor.value, memuat.value],
  ([ed, m]) => {
    if (ed && !m) muatBab(0)
  },
  { immediate: true }
)
muat()

async function simpan() {
  simpanBabKini()
  const r = bersihkanAmalan(form)
  if (!r.ok) {
    toast.error(r.galat)
    return
  }
  menyimpan.value = true
  try {
    await simpanAmalan(form.id, r.nilai)
    toast.success(form.id ? 'Diperbarui' : 'Tersimpan')
    router.push({ path: '/master-data', query: { tab: 'amalan' } })
  } catch (e) {
    toast.error('Gagal menyimpan: ' + (e?.message || e))
  } finally {
    menyimpan.value = false
  }
}
async function hapus() {
  if (!form.id) return
  const ok = await confirmDlg({
    title: `Hapus "${form.judul}"?`,
    message: 'Bacaan ini hilang dari aplikasi semua pengguna. Salinannya tetap tercatat di audit.',
    confirmText: 'Hapus',
    cancelText: 'Batal',
    danger: true
  })
  if (!ok) return
  try {
    await hapusAmalan(form.id, auth.sesiAktif)
    toast.success('Dihapus')
    router.push({ path: '/master-data', query: { tab: 'amalan' } })
  } catch (e) {
    toast.error('Gagal menghapus: ' + (e?.message || e))
  }
}
function kembali() {
  router.push({ path: '/master-data', query: { tab: 'amalan' } })
}

// ── Toolbar ──
// Fungsi (bukan computed): dibaca ulang tiap render yang dipicu transaksi editor.
const gayaKini = () => (versi.value, editor.value?.getAttributes('paragraph')?.gaya || '')
const ukuranKini = () => (versi.value, editor.value?.getAttributes('ukuranTeks')?.ukuran || '')
const aktif = (nama, attr) => (versi.value, !!editor.value?.isActive(nama, attr))
const rataAktif = (r) => (versi.value, !!editor.value?.isActive({ textAlign: r }))
function aturGaya(e) {
  editor.value?.chain().focus().aturGaya(e.target.value).run()
}
function aturUkuran(e) {
  editor.value?.chain().focus().aturUkuran(e.target.value).run()
}
function aturWarna(w) {
  editor.value?.chain().focus().aturWarna(w).run()
  menuWarna.value = false
}
const RATA = [
  { kunci: 'left', ikon: 'fa-align-left', label: 'Rata kiri' },
  { kunci: 'center', ikon: 'fa-align-center', label: 'Rata tengah' },
  { kunci: 'right', ikon: 'fa-align-right', label: 'Rata kanan' },
  { kunci: 'justify', ikon: 'fa-align-justify', label: 'Rata kanan-kiri' }
]
const kelasIsian =
  'w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]'
const kelasTombol =
  'w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-sm text-[var(--text-primary)] hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer'
const kelasTombolAktif = 'bg-teal-100 text-teal-900 dark:bg-teal-900/50 dark:text-teal-100'
</script>

<template>
  <div class="max-w-4xl mx-auto p-3 md:p-5 space-y-3">
    <!-- Kepala -->
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="judul-ganda w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-primary)] hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        aria-label="Kembali ke daftar"
        @click="kembali"
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <h2 class="flex-1 min-w-0 text-base font-black text-[var(--text-primary)] truncate">
        {{ baru ? 'Bacaan baru' : 'Ubah bacaan' }}{{ form.judul ? ' · ' + form.judul : '' }}
      </h2>
      <button
        v-if="form.id"
        type="button"
        class="px-3 py-2 rounded-xl text-xs font-bold border border-rose-200 text-rose-700 dark:border-rose-800 dark:text-rose-300 cursor-pointer"
        @click="hapus"
      >
        Hapus
      </button>
      <button
        type="button"
        class="px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white cursor-pointer disabled:opacity-60"
        :disabled="menyimpan || memuat"
        @click="simpan"
      >
        <i :class="['fas mr-1', menyimpan ? 'fa-spinner fa-spin' : 'fa-floppy-disk']"></i>Simpan
      </button>
    </div>

    <p v-if="memuat" class="text-center text-sm text-[var(--text-secondary)] py-10">
      <i class="fas fa-spinner fa-spin mr-1.5"></i>Memuat bacaan…
    </p>

    <template v-else>
      <!-- Info bacaan (lipat) -->
      <div class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)]">
        <button
          type="button"
          class="w-full flex items-center justify-between px-4 py-3 text-sm font-black text-[var(--text-primary)] cursor-pointer"
          @click="infoBuka = !infoBuka"
        >
          Info bacaan
          <i :class="['fas text-xs', infoBuka ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </button>
        <div v-show="infoBuka" class="px-4 pb-4 space-y-3">
          <label class="block">
            <span class="block text-xs font-bold text-[var(--text-secondary)] mb-1">Judul</span>
            <input
              v-model="form.judul"
              type="text"
              placeholder="Ratib al-Haddad"
              :class="kelasIsian"
            />
          </label>
          <div class="grid grid-cols-3 gap-2">
            <label class="block col-span-2">
              <span class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                >Kategori (pilih atau ketik sendiri)</span
              >
              <input
                v-model="form.kategori"
                type="text"
                list="opsi-kategori-amalan"
                placeholder="Wirid, Maulid, Ratib, Sholawat…"
                :class="kelasIsian"
              />
              <datalist id="opsi-kategori-amalan">
                <option v-for="k in KATEGORI_AMALAN" :key="k.kunci" :value="k.label"></option>
              </datalist>
            </label>
            <label class="block">
              <span class="block text-xs font-bold text-[var(--text-secondary)] mb-1">Urutan</span>
              <input v-model.number="form.urutan" type="number" min="0" :class="kelasIsian" />
            </label>
          </div>
          <label class="block">
            <span class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
              >Keterangan (opsional)</span
            >
            <textarea
              v-model="form.keterangan"
              rows="2"
              placeholder="Dibaca setiap ba'da Isya"
              :class="kelasIsian"
            ></textarea>
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="opsi in [
                { kunci: 'tunggal', label: 'Satu bacaan', ket: 'Langsung dibaca, halaman digeser' },
                { kunci: 'berbab', label: 'Berbab', ket: 'Ada daftar bab lebih dulu' }
              ]"
              :key="opsi.kunci"
              type="button"
              class="rounded-xl border p-2.5 text-left cursor-pointer"
              :class="
                form.bentuk === opsi.kunci
                  ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/30'
                  : 'border-slate-200 dark:border-slate-700'
              "
              @click="form.bentuk = opsi.kunci"
            >
              <span class="block text-xs font-black text-[var(--text-primary)]">{{
                opsi.label
              }}</span>
              <span class="block text-[11px] text-[var(--text-secondary)]">{{ opsi.ket }}</span>
            </button>
          </div>
          <label class="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)]">
            <input v-model="form.aktif" type="checkbox" class="w-4 h-4 accent-teal-600" />
            Tampilkan di aplikasi (matikan = simpan sebagai draf)
          </label>
        </div>
      </div>

      <!-- Bab / halaman -->
      <div class="flex gap-1.5 overflow-x-auto pb-1">
        <button
          v-for="(b, i) in form.bab"
          :key="i"
          type="button"
          class="shrink-0 max-w-[12rem] truncate px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer"
          :class="
            babAktif === i
              ? 'bg-teal-600 border-teal-600 text-white'
              : 'border-slate-200 dark:border-slate-700 text-[var(--text-primary)]'
          "
          @click="pilihBab(i)"
        >
          {{ berbab && b.judul ? `${i + 1}. ${b.judul}` : `${satuan} ${i + 1}` }}
        </button>
        <button
          type="button"
          class="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border border-dashed border-slate-300 dark:border-slate-600 text-[var(--text-secondary)] cursor-pointer"
          @click="tambahBab"
        >
          <i class="fas fa-plus mr-1"></i>{{ satuan }}
        </button>
      </div>
      <div class="flex items-center gap-2">
        <input
          v-if="berbab"
          v-model="babKini.judul"
          type="text"
          :placeholder="`Judul bab ${babAktif + 1}`"
          :class="[kelasIsian, 'flex-1 min-w-0']"
        />
        <select
          v-if="berbab"
          v-model="babKini.warna"
          title="Warna judul bab"
          class="px-2 py-2 text-xs border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900"
          :class="kelasWarna(babKini.warna, 'text-teal-700 dark:text-teal-300')"
        >
          <option value="">Hijau</option>
          <option v-for="w in WARNA_TEKS.slice(1)" :key="w.kunci" :value="w.kunci">
            {{ w.label }}
          </option>
        </select>
        <span v-else class="flex-1 text-xs font-black text-[var(--text-secondary)]"
          >{{ satuan }} {{ babAktif + 1 }} dari {{ form.bab.length }}</span
        >
        <button
          type="button"
          :class="kelasTombol"
          :aria-label="`Geser ${satuan} ke kiri`"
          @click="geserBab(-1)"
        >
          <i class="fas fa-arrow-left text-xs"></i>
        </button>
        <button
          type="button"
          :class="kelasTombol"
          :aria-label="`Geser ${satuan} ke kanan`"
          @click="geserBab(1)"
        >
          <i class="fas fa-arrow-right text-xs"></i>
        </button>
        <button
          type="button"
          :class="[kelasTombol, 'text-rose-500']"
          :aria-label="`Hapus ${satuan}`"
          @click="hapusBab"
        >
          <i class="fas fa-trash text-xs"></i>
        </button>
      </div>

      <!-- Editor -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] overflow-visible"
      >
        <div
          v-if="editor"
          class="sticky top-0 z-10 flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-[var(--border-subtle)] bg-[var(--bg-card)] rounded-t-2xl"
        >
          <select
            :value="gayaKini()"
            title="Gaya baris"
            class="h-8 px-2 text-xs font-bold border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
            @change="aturGaya"
          >
            <option v-for="g in GAYA_BARIS" :key="g.kunci" :value="g.kunci">
              {{ g.label }}
            </option>
          </select>
          <select
            :value="ukuranKini()"
            title="Ukuran huruf"
            class="h-8 px-2 text-xs font-bold border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
            @change="aturUkuran"
          >
            <option v-for="u in UKURAN_TEKS" :key="u.kunci" :value="u.kunci">
              {{ u.label }}
            </option>
          </select>
          <span class="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1"></span>
          <button
            type="button"
            :class="kelasTombol"
            title="Urungkan"
            @click="editor.chain().focus().undo().run()"
          >
            <i class="fas fa-rotate-left"></i>
          </button>
          <button
            type="button"
            :class="kelasTombol"
            title="Ulangi"
            @click="editor.chain().focus().redo().run()"
          >
            <i class="fas fa-rotate-right"></i>
          </button>
          <span class="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1"></span>
          <button
            type="button"
            :class="[kelasTombol, aktif('bold') && kelasTombolAktif]"
            title="Tebal"
            @click="editor.chain().focus().toggleBold().run()"
          >
            <i class="fas fa-bold"></i>
          </button>
          <button
            type="button"
            :class="[kelasTombol, aktif('italic') && kelasTombolAktif]"
            title="Miring"
            @click="editor.chain().focus().toggleItalic().run()"
          >
            <i class="fas fa-italic"></i>
          </button>
          <button
            type="button"
            :class="[kelasTombol, aktif('underline') && kelasTombolAktif]"
            title="Garis bawah"
            @click="editor.chain().focus().toggleUnderline().run()"
          >
            <i class="fas fa-underline"></i>
          </button>
          <button
            type="button"
            :class="[kelasTombol, aktif('strike') && kelasTombolAktif]"
            title="Coret"
            @click="editor.chain().focus().toggleStrike().run()"
          >
            <i class="fas fa-strikethrough"></i>
          </button>
          <div class="relative">
            <button
              type="button"
              :class="[kelasTombol, aktif('warnaKata') && kelasTombolAktif]"
              title="Warna kata"
              @click="menuWarna = !menuWarna"
            >
              <i class="fas fa-palette"></i>
            </button>
            <div
              v-if="menuWarna"
              class="absolute left-0 top-full mt-1 z-20 flex gap-1.5 p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-lg"
            >
              <button
                v-for="w in WARNA_KATA"
                :key="w.kunci"
                type="button"
                class="w-7 h-7 rounded-full border-2 border-white dark:border-slate-800 cursor-pointer"
                :style="{ background: w.contoh }"
                :title="w.label"
                @click="aturWarna(w.kunci)"
              ></button>
              <button
                type="button"
                class="w-7 h-7 rounded-full border border-slate-300 text-xs text-slate-500 cursor-pointer"
                title="Tanpa warna"
                @click="aturWarna('')"
              >
                <i class="fas fa-xmark"></i>
              </button>
            </div>
          </div>
          <span class="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1"></span>
          <button
            v-for="r in RATA"
            :key="r.kunci"
            type="button"
            :class="[kelasTombol, rataAktif(r.kunci) && kelasTombolAktif]"
            :title="r.label"
            @click="editor.chain().focus().setTextAlign(r.kunci).run()"
          >
            <i :class="['fas', r.ikon]"></i>
          </button>
          <span class="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1"></span>
          <button
            type="button"
            :class="kelasTombol"
            title="Garis pemisah ***"
            @click="editor.chain().focus().setHorizontalRule().run()"
          >
            <i class="fas fa-asterisk"></i>
          </button>
        </div>
        <EditorContent :editor="editor" />
        <p
          class="px-4 py-2 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]"
        >
          Blok kata lalu pilih tebal / miring / warna. Taruh kursor di sebuah baris untuk mengatur
          rata atau gayanya. Tempel dari Word/WhatsApp: gambar hiasan otomatis dibuang.
        </p>
      </div>
    </template>
  </div>
</template>
