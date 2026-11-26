<script setup>
// Kelola Kitab & Wirid — Master Data > Kitab & Wirid (Kyai 25 Nov 2026: data induk di Master
// Data, bukan menu pita baru). Isi berupa TEKS (Arab + Latin + arti); tambah bacaan tanpa rilis
// aplikasi. Sejak 26 Nov: bacaan dipecah jadi bab/halaman, blok punya jenis (teks, judul, syair,
// pemisah). Aturan bersih-bersih & pemecah teks di utils/amalan (murni + tes).
import { computed, onMounted, reactive, ref } from 'vue'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useAuthStore } from '@/stores/auth'
import { ambilSemuaAmalan, simpanAmalan, hapusAmalan } from '@/services/amalan'
import {
  KATEGORI_AMALAN,
  JENIS_BLOK,
  RATA_TEKS,
  WARNA_TEKS,
  kelasWarna,
  labelKategori,
  susunDaftarAmalan,
  bersihkanAmalan,
  babAmalan,
  pecahTeksBab
} from '@/utils/amalan'

const toast = useToast()
const confirmDlg = useConfirm()
const auth = useAuthStore()

const daftar = ref([])
const memuat = ref(true)
const menyimpan = ref(false)
const terbuka = ref(false)
const teksTempel = ref('')
const babAktif = ref(0)
const form = reactive(kosong())

const blokKosong = () => ({
  jenis: 'teks',
  judul: '',
  arab: '',
  latin: '',
  arti: '',
  ulang: '',
  rata: '',
  warna: ''
})
const babKosong = () => ({ judul: '', warna: '', bagian: [blokKosong()] })
function kosong() {
  return {
    id: '',
    judul: '',
    kategori: 'wirid',
    urutan: 0,
    aktif: true,
    keterangan: '',
    bentuk: 'tunggal',
    bab: [babKosong()]
  }
}

const terurut = computed(() => susunDaftarAmalan(daftar.value, 'semua'))
const berbab = computed(() => form.bentuk === 'berbab')
const satuan = computed(() => (berbab.value ? 'Bab' : 'Halaman'))
const babKini = computed(() => form.bab[babAktif.value] || form.bab[0])

async function muat() {
  memuat.value = true
  try {
    daftar.value = await ambilSemuaAmalan()
  } catch (e) {
    toast.error('Gagal memuat: ' + (e?.message || e))
  } finally {
    memuat.value = false
  }
}
onMounted(muat)

function buka(a = null) {
  Object.assign(form, kosong())
  if (a) {
    const bab = babAmalan(a).map((x) => ({
      judul: x.judul || '',
      warna: x.warna || '',
      bagian: (x.bagian || []).map((b) => ({ ...blokKosong(), ...b }))
    }))
    Object.assign(form, {
      id: a.id,
      judul: a.judul || '',
      kategori: a.kategori || 'wirid',
      urutan: a.urutan || 0,
      aktif: a.aktif !== false,
      keterangan: a.keterangan || '',
      bentuk: a.bentuk === 'berbab' ? 'berbab' : 'tunggal',
      bab: bab.length ? bab : [babKosong()]
    })
  }
  babAktif.value = 0
  teksTempel.value = ''
  terbuka.value = true
}

// --- bab / halaman ---
function tambahBab() {
  form.bab.push(babKosong())
  babAktif.value = form.bab.length - 1
}
function hapusBab() {
  if (form.bab.length <= 1) {
    form.bab = [babKosong()]
    babAktif.value = 0
    return
  }
  form.bab.splice(babAktif.value, 1)
  babAktif.value = Math.min(babAktif.value, form.bab.length - 1)
}
function geserBab(arah) {
  const i = babAktif.value
  const j = i + arah
  if (j < 0 || j >= form.bab.length) return
  const [b] = form.bab.splice(i, 1)
  form.bab.splice(j, 0, b)
  babAktif.value = j
}

// --- blok di bab yang sedang dibuka ---
function tambahBagian() {
  babKini.value.bagian.push(blokKosong())
}
function hapusBagian(i) {
  babKini.value.bagian.splice(i, 1)
  if (!babKini.value.bagian.length) tambahBagian()
}
function geserBagian(i, arah) {
  const daftarBlok = babKini.value.bagian
  const j = i + arah
  if (j < 0 || j >= daftarBlok.length) return
  const [b] = daftarBlok.splice(i, 1)
  daftarBlok.splice(j, 0, b)
}

const berisi = (bab) => bab.bagian.some((b) => String(b.arab || '').trim())
function terapkanTempel() {
  const hasil = pecahTeksBab(teksTempel.value)
  if (!hasil.length) {
    toast.error('Tak ada teks Arab yang terbaca. Pisahkan tiap bagian dengan satu baris kosong.')
    return
  }
  const lengkapi = (x) => ({
    judul: x.judul,
    bagian: x.bagian.map((b) => ({ ...blokKosong(), ...b }))
  })
  if (hasil.length === 1 && !hasil[0].judul) {
    // Tanpa penanda "===": tambahkan ke bab/halaman yang sedang dibuka.
    const kini = babKini.value
    kini.bagian = [
      ...kini.bagian.filter((b) => String(b.arab || '').trim()),
      ...lengkapi(hasil[0]).bagian
    ]
    toast.success(`${hasil[0].bagian.length} bagian ditambahkan`)
  } else {
    // Bab kosong bawaan form diganti, bukan ditambah di belakangnya.
    form.bab = [...form.bab.filter(berisi), ...hasil.map(lengkapi)]
    babAktif.value = 0
    toast.success(`${hasil.length} ${satuan.value.toLowerCase()} ditambahkan`)
  }
  teksTempel.value = ''
}

async function simpan() {
  const r = bersihkanAmalan(form)
  if (!r.ok) {
    toast.error(r.galat)
    return
  }
  menyimpan.value = true
  try {
    await simpanAmalan(form.id, r.nilai)
    toast.success(form.id ? 'Diperbarui' : 'Tersimpan')
    terbuka.value = false
    await muat()
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
    terbuka.value = false
    await muat()
  } catch (e) {
    toast.error('Gagal menghapus: ' + (e?.message || e))
  }
}

const kelasPilihKecil =
  'px-2 py-1 text-xs border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900'
const kelasIsian =
  'w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]'
</script>

<template>
  <div class="space-y-4">
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="flex items-center justify-between gap-3 mb-3">
        <div>
          <h3 class="text-sm font-black text-[var(--text-primary)]">
            <i class="fas fa-book-open text-teal-600 mr-1.5"></i>Kitab & Wirid
          </h3>
          <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
            Bacaan yang tampil di menu Wirid aplikasi (Beranda & Portal). Draf tak terlihat
            pengguna.
          </p>
        </div>
        <button
          type="button"
          class="shrink-0 px-3 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white cursor-pointer"
          @click="buka()"
        >
          <i class="fas fa-plus mr-1"></i>Tambah
        </button>
      </div>

      <p v-if="memuat" class="text-xs text-[var(--text-secondary)] py-4 text-center">
        <i class="fas fa-spinner fa-spin mr-1"></i>Memuat…
      </p>
      <p v-else-if="!terurut.length" class="text-xs text-[var(--text-secondary)] py-4 text-center">
        Belum ada bacaan. Tekan <b>Tambah</b> untuk mengisi yang pertama.
      </p>
      <button
        v-for="a in terurut"
        :key="a.id"
        type="button"
        class="w-full flex items-center gap-3 py-2.5 border-b last:border-b-0 border-slate-100 dark:border-slate-800 text-left cursor-pointer"
        @click="buka(a)"
      >
        <span class="min-w-0 flex-1">
          <span class="block text-sm font-bold text-[var(--text-primary)] truncate">{{
            a.judul
          }}</span>
          <span class="block text-[11px] text-[var(--text-secondary)]">
            {{ labelKategori(a.kategori) }} · urutan {{ a.urutan || 0 }} · {{ babAmalan(a).length }}
            {{ a.bentuk === 'berbab' ? 'bab' : 'halaman' }}
          </span>
        </span>
        <span
          v-if="a.aktif === false"
          class="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >Draf</span
        >
        <i class="fas fa-pen text-xs text-[var(--text-secondary)]"></i>
      </button>
    </div>

    <!-- Form tambah / ubah -->
    <div
      v-if="terbuka"
      class="fixed inset-0 z-[150] bg-black/40 flex items-end md:items-center justify-center"
      @click.self="terbuka = false"
    >
      <div
        class="w-full md:max-w-2xl max-h-[92vh] overflow-y-auto bg-[var(--bg-card)] rounded-t-2xl md:rounded-2xl p-4 space-y-3"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-black text-[var(--text-primary)]">
            {{ form.id ? 'Ubah bacaan' : 'Bacaan baru' }}
          </h3>
          <button
            type="button"
            class="w-8 h-8 rounded-full cursor-pointer text-[var(--text-secondary)]"
            aria-label="Tutup"
            @click="terbuka = false"
          >
            <i class="fas fa-xmark"></i>
          </button>
        </div>

        <label class="block">
          <span class="block text-xs font-bold text-[var(--text-secondary)] mb-1">Judul</span>
          <input
            v-model="form.judul"
            type="text"
            placeholder="Wirid ba'da sholat fardhu"
            :class="kelasIsian"
          />
        </label>
        <div class="grid grid-cols-3 gap-2">
          <label class="block col-span-2">
            <span class="block text-xs font-bold text-[var(--text-secondary)] mb-1">Kategori</span>
            <select v-model="form.kategori" :class="kelasIsian">
              <option v-for="k in KATEGORI_AMALAN" :key="k.kunci" :value="k.kunci">
                {{ k.label }}
              </option>
            </select>
          </label>
          <label class="block">
            <span class="block text-xs font-bold text-[var(--text-secondary)] mb-1">Urutan</span>
            <input v-model.number="form.urutan" type="number" min="0" :class="kelasIsian" />
          </label>
        </div>
        <label class="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)]">
          <input v-model="form.aktif" type="checkbox" class="w-4 h-4 accent-teal-600" />
          Tampilkan di aplikasi (matikan = simpan sebagai draf)
        </label>
        <label class="block">
          <span class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
            >Keterangan (opsional)</span
          >
          <textarea
            v-model="form.keterangan"
            rows="2"
            placeholder="Dibaca setiap selesai sholat fardhu"
            :class="kelasIsian"
          ></textarea>
        </label>

        <div>
          <span class="block text-xs font-bold text-[var(--text-secondary)] mb-1">Bentuk</span>
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
        </div>

        <details class="rounded-lg border border-dashed border-teal-300 dark:border-teal-700 p-3">
          <summary class="text-xs font-bold text-teal-700 dark:text-teal-300 cursor-pointer">
            <i class="fas fa-paste mr-1"></i>Tempel teks panjang sekaligus
          </summary>
          <p class="text-[11px] text-[var(--text-secondary)] mt-2 leading-relaxed">
            Tempel dari Word/WhatsApp. Pisahkan tiap bagian dengan <b>satu baris kosong</b>. Dalam
            satu bagian: baris Arab → teks Arab; baris Latin pertama → bacaan Latin; sisanya → arti.
            Baris <b>=== Judul</b> memulai {{ satuan.toLowerCase() }} baru; blok berisi
            <b>***</b> menjadi garis pemisah.
          </p>
          <textarea v-model="teksTempel" rows="5" :class="[kelasIsian, 'mt-2']"></textarea>
          <button
            type="button"
            class="mt-2 px-3 py-1.5 rounded-lg text-xs font-bold border border-teal-600 text-teal-700 dark:text-teal-300 cursor-pointer"
            @click="terapkanTempel"
          >
            Pecah jadi bagian
          </button>
        </details>

        <!-- Pemilih bab / halaman -->
        <div class="flex gap-1.5 overflow-x-auto pb-1">
          <button
            v-for="(b, i) in form.bab"
            :key="i"
            type="button"
            class="shrink-0 max-w-[10rem] truncate px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer"
            :class="
              babAktif === i
                ? 'bg-teal-600 border-teal-600 text-white'
                : 'border-slate-200 dark:border-slate-700 text-[var(--text-primary)]'
            "
            @click="babAktif = i"
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
            :class="[
              kelasPilihKecil,
              kelasWarna(babKini.warna, 'text-teal-700 dark:text-teal-300')
            ]"
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
            class="w-8 h-8 rounded cursor-pointer text-[var(--text-secondary)]"
            :aria-label="`Geser ${satuan} ke kiri`"
            @click="geserBab(-1)"
          >
            <i class="fas fa-arrow-left text-xs"></i>
          </button>
          <button
            type="button"
            class="w-8 h-8 rounded cursor-pointer text-[var(--text-secondary)]"
            :aria-label="`Geser ${satuan} ke kanan`"
            @click="geserBab(1)"
          >
            <i class="fas fa-arrow-right text-xs"></i>
          </button>
          <button
            type="button"
            class="w-8 h-8 rounded cursor-pointer text-rose-500"
            :aria-label="`Hapus ${satuan}`"
            @click="hapusBab"
          >
            <i class="fas fa-trash text-xs"></i>
          </button>
        </div>

        <div
          v-for="(b, i) in babKini.bagian"
          :key="`${babAktif}-${i}`"
          class="rounded-xl border border-slate-200 dark:border-slate-700 p-3 space-y-2"
        >
          <div class="flex items-center gap-2">
            <span class="text-xs font-black text-[var(--text-secondary)]">{{ i + 1 }}</span>
            <select
              v-model="b.jenis"
              class="px-2 py-1 text-xs border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
            >
              <option v-for="j in JENIS_BLOK" :key="j.kunci" :value="j.kunci">
                {{ j.label }}
              </option>
            </select>
            <input
              v-if="b.jenis === 'teks' || b.jenis === 'syair'"
              v-model="b.judul"
              type="text"
              placeholder="Subjudul (opsional)"
              class="flex-1 min-w-0 px-2 py-1 text-xs border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
            />
            <span v-else class="flex-1"></span>
            <input
              v-if="b.jenis === 'teks' || b.jenis === 'syair'"
              v-model="b.ulang"
              type="number"
              min="1"
              placeholder="×"
              title="Dibaca berapa kali"
              class="w-14 px-2 py-1 text-xs border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
            />
            <button
              type="button"
              class="w-7 h-7 rounded cursor-pointer text-[var(--text-secondary)]"
              aria-label="Naikkan"
              @click="geserBagian(i, -1)"
            >
              <i class="fas fa-arrow-up text-xs"></i>
            </button>
            <button
              type="button"
              class="w-7 h-7 rounded cursor-pointer text-[var(--text-secondary)]"
              aria-label="Turunkan"
              @click="geserBagian(i, 1)"
            >
              <i class="fas fa-arrow-down text-xs"></i>
            </button>
            <button
              type="button"
              class="w-7 h-7 rounded cursor-pointer text-rose-500"
              aria-label="Hapus bagian"
              @click="hapusBagian(i)"
            >
              <i class="fas fa-trash text-xs"></i>
            </button>
          </div>
          <p v-if="b.jenis === 'pemisah'" class="text-center text-slate-400 tracking-[0.5em]">
            ***
          </p>
          <template v-else>
            <!-- Kyai 26 Nov 2026: rata & warna teks per bagian (syair selalu kanan–kiri). -->
            <div class="flex flex-wrap items-center gap-2 text-[11px] font-bold">
              <label v-if="b.jenis !== 'syair'" class="flex items-center gap-1">
                <span class="text-[var(--text-secondary)]">Rata</span>
                <select v-model="b.rata" :class="kelasPilihKecil">
                  <option value="">Bawaan</option>
                  <option v-for="r in RATA_TEKS" :key="r.kunci" :value="r.kunci">
                    {{ r.label }}
                  </option>
                </select>
              </label>
              <label class="flex items-center gap-1">
                <span class="text-[var(--text-secondary)]">Warna</span>
                <select v-model="b.warna" :class="[kelasPilihKecil, kelasWarna(b.warna)]">
                  <option value="">Bawaan</option>
                  <option v-for="w in WARNA_TEKS" :key="w.kunci" :value="w.kunci">
                    {{ w.label }}
                  </option>
                </select>
              </label>
            </div>
            <textarea
              v-model="b.arab"
              dir="rtl"
              lang="ar"
              rows="3"
              :placeholder="
                b.jenis === 'syair'
                  ? 'Satu baris syair per baris (bergantian kanan–kiri)'
                  : b.jenis === 'judul'
                    ? 'Judul berbahasa Arab'
                    : 'Teks Arab berharakat'
              "
              class="font-arabic w-full px-3 py-2 text-2xl leading-loose border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
            ></textarea>
            <textarea
              v-model="b.latin"
              rows="2"
              :placeholder="
                b.jenis === 'judul'
                  ? 'Judul Latin di bawahnya (opsional)'
                  : 'Bacaan Latin (opsional)'
              "
              :class="[kelasIsian, b.jenis === 'judul' ? '' : 'italic']"
            ></textarea>
            <textarea
              v-if="b.jenis !== 'judul'"
              v-model="b.arti"
              rows="2"
              placeholder="Arti / terjemahan (opsional)"
              :class="kelasIsian"
            ></textarea>
          </template>
        </div>
        <button
          type="button"
          class="w-full py-2 rounded-xl text-xs font-bold border border-dashed border-slate-300 dark:border-slate-600 text-[var(--text-secondary)] cursor-pointer"
          @click="tambahBagian"
        >
          <i class="fas fa-plus mr-1"></i>Tambah bagian di {{ satuan.toLowerCase() }} ini
        </button>

        <div class="flex gap-2 pt-1">
          <button
            v-if="form.id"
            type="button"
            class="px-4 py-2.5 rounded-xl text-xs font-bold border border-rose-200 text-rose-700 dark:border-rose-800 dark:text-rose-300 cursor-pointer"
            @click="hapus"
          >
            Hapus
          </button>
          <button
            type="button"
            class="flex-1 py-2.5 rounded-xl text-xs font-bold bg-teal-600 text-white cursor-pointer disabled:opacity-60"
            :disabled="menyimpan"
            @click="simpan"
          >
            <i :class="['fas mr-1', menyimpan ? 'fa-spinner fa-spin' : 'fa-floppy-disk']"></i>Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
