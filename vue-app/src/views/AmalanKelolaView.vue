<script setup>
// Kelola Kitab & Wirid — Master Data > Kitab & Wirid (Kyai 25 Nov 2026: data induk di Master
// Data, bukan menu pita baru). Isi berupa TEKS (Arab + Latin + arti); tambah bacaan tanpa rilis
// aplikasi. Aturan bersih-bersih & pemecah teks di utils/amalan (murni + tes).
import { computed, onMounted, reactive, ref } from 'vue'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useAuthStore } from '@/stores/auth'
import { ambilSemuaAmalan, simpanAmalan, hapusAmalan } from '@/services/amalan'
import {
  KATEGORI_AMALAN,
  labelKategori,
  susunDaftarAmalan,
  bersihkanAmalan,
  pecahTeksAmalan
} from '@/utils/amalan'

const toast = useToast()
const confirmDlg = useConfirm()
const auth = useAuthStore()

const daftar = ref([])
const memuat = ref(true)
const menyimpan = ref(false)
const terbuka = ref(false)
const teksTempel = ref('')
const form = reactive(kosong())

function kosong() {
  return {
    id: '',
    judul: '',
    kategori: 'wirid',
    urutan: 0,
    aktif: true,
    keterangan: '',
    bagian: [{ judul: '', arab: '', latin: '', arti: '', ulang: '' }]
  }
}

const terurut = computed(() => susunDaftarAmalan(daftar.value, 'semua'))

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
    Object.assign(form, {
      id: a.id,
      judul: a.judul || '',
      kategori: a.kategori || 'wirid',
      urutan: a.urutan || 0,
      aktif: a.aktif !== false,
      keterangan: a.keterangan || '',
      bagian: (a.bagian || []).map((b) => ({ judul: '', latin: '', arti: '', ulang: '', ...b }))
    })
    if (!form.bagian.length)
      form.bagian.push({ judul: '', arab: '', latin: '', arti: '', ulang: '' })
  }
  teksTempel.value = ''
  terbuka.value = true
}

function tambahBagian() {
  form.bagian.push({ judul: '', arab: '', latin: '', arti: '', ulang: '' })
}
function hapusBagian(i) {
  form.bagian.splice(i, 1)
  if (!form.bagian.length) tambahBagian()
}
function geserBagian(i, arah) {
  const j = i + arah
  if (j < 0 || j >= form.bagian.length) return
  const [b] = form.bagian.splice(i, 1)
  form.bagian.splice(j, 0, b)
}
function terapkanTempel() {
  const baru = pecahTeksAmalan(teksTempel.value)
  if (!baru.length) {
    toast.error('Tak ada teks Arab yang terbaca. Pisahkan tiap bagian dengan satu baris kosong.')
    return
  }
  // Baris kosong bawaan form diganti, bukan ditambah di belakangnya.
  const sudahAda = form.bagian.filter((b) => String(b.arab || '').trim())
  form.bagian = [
    ...sudahAda,
    ...baru.map((b) => ({ judul: '', latin: '', arti: '', ulang: '', ...b }))
  ]
  teksTempel.value = ''
  toast.success(`${baru.length} bagian ditambahkan`)
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
            {{ labelKategori(a.kategori) }} · urutan {{ a.urutan || 0 }} ·
            {{ (a.bagian || []).length }} bagian
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
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
          />
        </label>
        <div class="grid grid-cols-3 gap-2">
          <label class="block col-span-2">
            <span class="block text-xs font-bold text-[var(--text-secondary)] mb-1">Kategori</span>
            <select
              v-model="form.kategori"
              class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
            >
              <option v-for="k in KATEGORI_AMALAN" :key="k.kunci" :value="k.kunci">
                {{ k.label }}
              </option>
            </select>
          </label>
          <label class="block">
            <span class="block text-xs font-bold text-[var(--text-secondary)] mb-1">Urutan</span>
            <input
              v-model.number="form.urutan"
              type="number"
              min="0"
              class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
            />
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
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
          ></textarea>
        </label>

        <details class="rounded-lg border border-dashed border-teal-300 dark:border-teal-700 p-3">
          <summary class="text-xs font-bold text-teal-700 dark:text-teal-300 cursor-pointer">
            <i class="fas fa-paste mr-1"></i>Tempel teks panjang sekaligus
          </summary>
          <p class="text-[11px] text-[var(--text-secondary)] mt-2 leading-relaxed">
            Tempel dari Word/WhatsApp. Pisahkan tiap bagian dengan <b>satu baris kosong</b>. Dalam
            satu bagian: baris Arab → teks Arab; baris Latin pertama → bacaan Latin; sisanya → arti.
          </p>
          <textarea
            v-model="teksTempel"
            rows="5"
            class="w-full mt-2 px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
          ></textarea>
          <button
            type="button"
            class="mt-2 px-3 py-1.5 rounded-lg text-xs font-bold border border-teal-600 text-teal-700 dark:text-teal-300 cursor-pointer"
            @click="terapkanTempel"
          >
            Pecah jadi bagian
          </button>
        </details>

        <div
          v-for="(b, i) in form.bagian"
          :key="i"
          class="rounded-xl border border-slate-200 dark:border-slate-700 p-3 space-y-2"
        >
          <div class="flex items-center gap-2">
            <span class="text-xs font-black text-[var(--text-secondary)]">Bagian {{ i + 1 }}</span>
            <input
              v-model="b.judul"
              type="text"
              placeholder="Subjudul (opsional)"
              class="flex-1 min-w-0 px-2 py-1 text-xs border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
            />
            <input
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
          <textarea
            v-model="b.arab"
            dir="rtl"
            lang="ar"
            rows="3"
            placeholder="Teks Arab berharakat"
            class="font-arabic w-full px-3 py-2 text-2xl leading-loose border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
          ></textarea>
          <textarea
            v-model="b.latin"
            rows="2"
            placeholder="Bacaan Latin (opsional)"
            class="w-full px-3 py-2 text-sm italic border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
          ></textarea>
          <textarea
            v-model="b.arti"
            rows="2"
            placeholder="Arti / terjemahan (opsional)"
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
          ></textarea>
        </div>
        <button
          type="button"
          class="w-full py-2 rounded-xl text-xs font-bold border border-dashed border-slate-300 dark:border-slate-600 text-[var(--text-secondary)] cursor-pointer"
          @click="tambahBagian"
        >
          <i class="fas fa-plus mr-1"></i>Tambah bagian
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
