<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <RouterLink to="/psb" class="text-[11px] text-teal-600 hover:underline font-bold">
            <i class="fas fa-arrow-left mr-1"></i>Kembali ke Daftar PSB
          </RouterLink>
          <h1 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white mt-1">
            <i class="fas fa-user-graduate text-teal-500 mr-2"></i>{{ data.nama || '...' }}
          </h1>
          <p class="text-xs text-slate-500 mt-0.5">
            No. Pendaftaran: <span class="font-bold text-slate-700">{{ data.no_pendaftaran || '—' }}</span>
            · Tgl Daftar: <span class="font-bold text-slate-700">{{ fmtDate(data.tanggal_daftar || data.tgl_daftar) }}</span>
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span :class="['text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-wider', statusBadge(data.status)]">
            {{ data.status || 'pending' }}
          </span>
          <button v-if="data.status !== 'approved'" @click="updateStatus('approved')" class="text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition">
            <i class="fas fa-check mr-1"></i>Approve
          </button>
          <button v-if="data.status !== 'rejected'" @click="updateStatus('rejected')" class="text-xs px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition">
            <i class="fas fa-times mr-1"></i>Reject
          </button>
          <button v-if="data.status === 'approved' && data.status !== 'enrolled'" @click="updateStatus('enrolled')" class="text-xs px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition">
            <i class="fas fa-user-plus mr-1"></i>Tandai Enrolled
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center">
      <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
      <p class="text-sm text-slate-500 font-bold">Memuat data pendaftar…</p>
    </div>

    <template v-else>
      <!-- Section: Identitas Santri -->
      <SectionCard title="Identitas Santri" icon="fas fa-id-card">
        <FieldRow label="Lembaga Tujuan" :value="data.lembaga_tujuan" />
        <FieldRow label="Nama Lengkap" :value="data.nama" />
        <FieldRow label="Nama Panggilan" :value="data.nama_panggilan" />
        <FieldRow label="NIK" :value="data.nik" />
        <FieldRow label="No. KK" :value="data.no_kk" />
        <FieldRow label="Jenis Kelamin" :value="data.jk === 'L' ? 'Laki-laki' : data.jk === 'P' ? 'Perempuan' : '-'" />
        <FieldRow label="Tempat Lahir" :value="data.tempat_lahir" />
        <FieldRow label="Tanggal Lahir" :value="fmtDate(data.tgl_lahir)" />
        <FieldRow label="Jalan / Dusun" :value="data.alamat_jalan || data.alamat" />
        <FieldRow label="Desa" :value="data.alamat_desa" />
        <FieldRow label="Kecamatan" :value="data.alamat_kecamatan" />
        <FieldRow label="Kabupaten" :value="data.alamat_kabupaten" />
        <FieldRow label="Provinsi" :value="data.alamat_provinsi" />
      </SectionCard>

      <!-- Section: Identitas Ayah -->
      <SectionCard title="Identitas Ayah" icon="fas fa-male">
        <FieldRow label="Nama" :value="ayah.nama" />
        <FieldRow label="NIK" :value="ayah.nik" />
        <FieldRow label="Tempat Lahir" :value="ayah.tempat_lahir" />
        <FieldRow label="Tanggal Lahir" :value="fmtDate(ayah.tgl_lahir)" />
        <FieldRow label="Pendidikan" :value="ayah.pendidikan" />
        <FieldRow label="Pekerjaan" :value="ayah.pekerjaan" />
        <FieldRow label="Telp / HP" :value="ayah.telp" />
      </SectionCard>

      <!-- Section: Identitas Ibu -->
      <SectionCard title="Identitas Ibu" icon="fas fa-female">
        <FieldRow label="Nama" :value="ibu.nama" />
        <FieldRow label="NIK" :value="ibu.nik" />
        <FieldRow label="Tempat Lahir" :value="ibu.tempat_lahir" />
        <FieldRow label="Tanggal Lahir" :value="fmtDate(ibu.tgl_lahir)" />
        <FieldRow label="Pendidikan" :value="ibu.pendidikan" />
        <FieldRow label="Pekerjaan" :value="ibu.pekerjaan" />
        <FieldRow label="Telp / HP" :value="ibu.telp" />
      </SectionCard>

      <!-- Section: Yang Mendaftarkan -->
      <SectionCard title="Yang Mendaftarkan" icon="fas fa-pen-to-square">
        <FieldRow label="Nama" :value="data.yang_mendaftarkan || data.nama_wali" />
        <FieldRow label="WhatsApp" :value="data.wa_wali" />
        <FieldRow label="Catatan" :value="data.catatan" />
      </SectionCard>

      <!-- Section: Dokumen -->
      <SectionCard title="Dokumen" icon="fas fa-file-image">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <DocPreview label="Akta Kelahiran" :url="dokAkta" />
          <DocPreview label="Kartu Keluarga" :url="dokKk" />
        </div>
      </SectionCard>

      <!-- Section: Field Tambahan (ACF) -->
      <SectionCard title="Field Tambahan (ACF)" icon="fas fa-list-check">
        <div v-if="acfList.length === 0" class="text-center py-4">
          <i class="fas fa-circle-info text-slate-300 text-2xl mb-2"></i>
          <p class="text-xs text-slate-500 italic">Belum ada field tambahan</p>
        </div>
        <div v-else class="space-y-2">
          <div v-for="f in acfList" :key="f.key" class="bg-slate-50 dark:bg-slate-900/40 rounded-lg p-2.5 flex items-start gap-2">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5 mb-0.5">
                <span class="text-[9px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-700 font-bold uppercase">{{ f.type || 'text' }}</span>
                <p class="text-[11px] font-bold text-slate-600 uppercase tracking-wide">{{ f.label || f.key }}</p>
              </div>
              <p class="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap">{{ f.value || '—' }}</p>
            </div>
            <div class="flex flex-col gap-1">
              <button @click="editAcf(f)" class="text-[10px] px-2 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-700 font-bold rounded transition">
                <i class="fas fa-pen"></i>
              </button>
              <button @click="deleteAcf(f.key)" class="text-[10px] px-2 py-0.5 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold rounded transition">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-dashed border-slate-200">
          <button @click="openAddAcf" class="w-full text-xs px-3 py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold rounded-lg border border-dashed border-teal-300 transition">
            <i class="fas fa-plus mr-1"></i>Tambah Field
          </button>
        </div>
      </SectionCard>

      <!-- Convert ke Santri (Approved only) -->
      <div v-if="data.status === 'approved' || data.status === 'enrolled'" class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-teal-200 shadow-sm">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 class="text-sm font-black text-teal-700"><i class="fas fa-user-plus mr-1"></i>Konversi ke Santri</h3>
            <p class="text-[11px] text-slate-500 mt-0.5">Buat dokumen santri/ baru dari data pendaftaran ini.</p>
          </div>
          <button @click="convertToSantri" :disabled="converting" class="text-xs px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold rounded-lg transition">
            <i class="fas fa-arrow-right-to-bracket mr-1"></i>{{ converting ? 'Memproses…' : 'Buat Santri' }}
          </button>
        </div>
      </div>
    </template>

    <!-- ACF Modal -->
    <div v-if="acfModal.open" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" @click.self="acfModal.open = false">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 max-w-md w-full space-y-3">
        <h3 class="text-base font-black text-slate-800">{{ acfModal.editing ? 'Edit Field' : 'Tambah Field' }}</h3>
        <div>
          <label class="text-[11px] font-bold uppercase text-slate-500">Type</label>
          <select v-model="acfModal.type" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 mt-1">
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div>
          <label class="text-[11px] font-bold uppercase text-slate-500">Label</label>
          <input v-model="acfModal.label" type="text" placeholder="Misal: Hafalan Saat Ini" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 mt-1" />
        </div>
        <div>
          <label class="text-[11px] font-bold uppercase text-slate-500">Key (auto kalau kosong)</label>
          <input v-model="acfModal.key" type="text" :disabled="acfModal.editing" placeholder="kebab_case_key" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 mt-1 disabled:bg-slate-100" />
        </div>
        <div>
          <label class="text-[11px] font-bold uppercase text-slate-500">Value</label>
          <textarea v-if="acfModal.type === 'textarea'" v-model="acfModal.value" rows="3" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 mt-1"></textarea>
          <input v-else :type="acfModal.type === 'number' ? 'number' : acfModal.type === 'date' ? 'date' : 'text'" v-model="acfModal.value" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 mt-1" />
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button @click="acfModal.open = false" class="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg">Batal</button>
          <button @click="saveAcf" class="text-xs px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, h, defineComponent } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { doc, onSnapshot, updateDoc, setDoc, deleteField } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { addOne, updateOne } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'

const route = useRoute()
const auth = useAuthStore()
const toast = useToast()
const confirm = useConfirm()

const id = computed(() => String(route.params.id || ''))
const data = ref({})
const loading = ref(true)
const converting = ref(false)
let unsub = null

// Inline helper components (defined within script to keep single file)
const SectionCard = defineComponent({
  props: ['title', 'icon'],
  setup(props, { slots }) {
    return () => h('div', { class: 'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm' }, [
      h('h3', { class: 'text-xs font-black text-teal-700 uppercase tracking-wide mb-3' }, [
        h('i', { class: (props.icon || '') + ' mr-1' }),
        ' ',
        props.title
      ]),
      h('div', { class: 'grid grid-cols-1 md:grid-cols-2 gap-1.5' }, slots.default?.())
    ])
  }
})
const FieldRow = defineComponent({
  props: ['label', 'value'],
  setup(props) {
    return () => h('div', { class: 'flex items-baseline gap-2 py-1 border-b border-slate-100 dark:border-slate-700' }, [
      h('span', { class: 'text-[11px] font-bold text-slate-500 uppercase tracking-wide min-w-[120px]' }, props.label + ':'),
      h('span', { class: 'text-sm text-slate-800 dark:text-slate-200 flex-1 break-words' }, props.value || '—')
    ])
  }
})
const DocPreview = defineComponent({
  props: ['label', 'url'],
  setup(props) {
    return () => {
      const isImg = props.url && /\.(png|jpe?g|webp|gif)$/i.test(props.url)
      return h('div', { class: 'bg-slate-50 rounded-xl p-3 border border-slate-200' }, [
        h('p', { class: 'text-[11px] font-bold uppercase text-slate-500 mb-2' }, props.label),
        props.url
          ? h('a', { href: props.url, target: '_blank', class: 'block' }, [
              isImg
                ? h('img', { src: props.url, class: 'w-full h-40 object-contain bg-white rounded-lg' })
                : h('div', { class: 'w-full h-40 flex items-center justify-center bg-white rounded-lg text-teal-600' }, [
                    h('i', { class: 'fas fa-file-pdf text-4xl' })
                  ]),
              h('p', { class: 'text-[10px] text-teal-600 text-center mt-1 hover:underline' }, 'Klik untuk lihat full')
            ])
          : h('p', { class: 'text-xs text-slate-400 italic text-center py-8' }, 'Tidak ada file')
      ])
    }
  }
})

// Computed sub-sections
const ayah = computed(() => data.value.ayah || {
  nama: data.value.nama_ayah,
  pekerjaan: data.value.pekerjaan_ayah,
  telp: data.value.telp_ayah
})
const ibu = computed(() => data.value.ibu || {
  nama: data.value.nama_ibu,
  pekerjaan: data.value.pekerjaan_ibu,
  telp: data.value.telp_ibu
})
const dokAkta = computed(() => data.value.dokumen?.akta_url || data.value.akta_url || '')
const dokKk = computed(() => data.value.dokumen?.kk_url || data.value.kk_url || '')

// ACF list
const acfList = computed(() => {
  const acf = data.value.acf || {}
  return Object.entries(acf).map(([key, raw]) => {
    if (raw && typeof raw === 'object' && 'value' in raw) {
      return { key, label: raw.label || key, type: raw.type || 'text', value: raw.value }
    }
    return { key, label: key, type: 'text', value: String(raw ?? '') }
  })
})

// ACF Modal state
const acfModal = ref({ open: false, editing: false, key: '', label: '', type: 'text', value: '' })
function openAddAcf() {
  acfModal.value = { open: true, editing: false, key: '', label: '', type: 'text', value: '' }
}
function editAcf(f) {
  acfModal.value = { open: true, editing: true, key: f.key, label: f.label, type: f.type, value: f.value }
}
function slugifyKey(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '') || ('field_' + Date.now())
}
async function saveAcf() {
  let key = acfModal.value.key || slugifyKey(acfModal.value.label)
  key = slugifyKey(key)
  if (!key || !acfModal.value.label) { toast.error('Label & Key wajib'); return }
  const payload = { label: acfModal.value.label, type: acfModal.value.type, value: acfModal.value.value }
  try {
    const acf = { ...(data.value.acf || {}) }
    acf[key] = payload
    await updateOne('psb_pendaftaran', id.value, { acf })
    acfModal.value.open = false
    toast.success('Field disimpan')
  } catch (e) {
    toast.error('Gagal simpan: ' + (e.message || e))
  }
}
async function deleteAcf(key) {
  const ok = await confirm({ title: 'Hapus field ini?', confirmText: 'Hapus', danger: true })
  if (!ok) return
  try {
    const acf = { ...(data.value.acf || {}) }
    delete acf[key]
    await updateOne('psb_pendaftaran', id.value, { acf })
    toast.success('Field dihapus')
  } catch (e) { toast.error('Gagal hapus: ' + (e.message || e)) }
}

async function updateStatus(status) {
  try {
    await updateOne('psb_pendaftaran', id.value, {
      status,
      processed_at: new Date().toISOString(),
      processed_by: auth.sesiAktif?.nama || 'Admin'
    })
    toast.success(`Status: ${status}`)
  } catch (e) { toast.error('Gagal: ' + (e.message || e)) }
}

async function convertToSantri() {
  if (converting.value) return
  const ok = await confirm({
    title: 'Convert ke Santri?',
    text: 'Akan dibuat dokumen baru di koleksi santri/. Pastikan data sudah lengkap.',
    confirmText: 'Lanjut'
  })
  if (!ok) return
  converting.value = true
  try {
    const santriDoc = {
      nama: data.value.nama || '',
      nis: data.value.nis || '',
      nik: data.value.nik || '',
      jk: data.value.jk || '',
      tempat_lahir: data.value.tempat_lahir || '',
      tgl_lahir: data.value.tgl_lahir || '',
      alamat: [data.value.alamat_jalan, data.value.alamat_desa, data.value.alamat_kecamatan].filter(Boolean).join(', '),
      lembaga: data.value.lembaga_tujuan || '',
      wali: data.value.nama_wali || ayah.value?.nama || '',
      wa_wali: data.value.wa_wali || ayah.value?.telp || '',
      psb_id: id.value,
      audit: { created_at: new Date().toISOString(), created_by: auth.sesiAktif?.nama || 'Admin' }
    }
    await addOne('santri', santriDoc)
    await updateOne('psb_pendaftaran', id.value, { status: 'enrolled', enrolled_at: new Date().toISOString() })
    toast.success('Santri dibuat — status PSB → enrolled')
  } catch (e) {
    toast.error('Gagal convert: ' + (e.message || e))
  } finally {
    converting.value = false
  }
}

function statusBadge(status) {
  const st = status || 'pending'
  if (st === 'approved') return 'bg-emerald-100 text-emerald-700'
  if (st === 'rejected') return 'bg-rose-100 text-rose-700'
  if (st === 'enrolled') return 'bg-teal-100 text-teal-700'
  return 'bg-amber-100 text-amber-700'
}
function fmtDate(d) {
  if (!d) return '—'
  const dt = (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}/.test(d)) ? new Date(d) : (d?.toDate ? d.toDate() : new Date(d))
  if (isNaN(dt.getTime())) return String(d)
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(dt)
}

onMounted(() => {
  if (!id.value) return
  unsub = onSnapshot(doc(db, 'psb_pendaftaran', id.value), (snap) => {
    if (snap.exists()) {
      data.value = { id: snap.id, ...snap.data() }
    } else {
      data.value = {}
      toast.error('Pendaftar tidak ditemukan')
    }
    loading.value = false
  }, (err) => {
    toast.error('Gagal load: ' + (err.message || err))
    loading.value = false
  })
})
onUnmounted(() => { if (unsub) { try { unsub() } catch {} } })
</script>
