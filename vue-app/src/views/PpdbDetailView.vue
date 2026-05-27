<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header + Status / Actions -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <RouterLink to="/psb" class="text-[11px] text-teal-600 hover:underline font-bold">
            <i class="fas fa-arrow-left mr-1"></i>Kembali ke Daftar PSB
          </RouterLink>
          <h1 class="text-xl md:text-2xl font-black text-[var(--text-primary)] mt-1">
            <i class="fas fa-user-graduate text-teal-500 mr-2"></i>{{ pendaftar.nama || '...' }}
          </h1>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">
            No. Pendaftaran:
            <span class="font-bold text-[var(--text-primary)]">{{ pendaftar.no_pendaftaran || '—' }}</span>
            &middot; Tgl Daftar:
            <span class="font-bold text-[var(--text-primary)]">{{
              fmtTgl(pendaftar.tanggal_daftar || pendaftar.tgl_daftar)
            }}</span>
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            :class="[
              'text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-wider',
              statusBg(pendaftar.status)
            ]"
          >
            {{ pendaftar.status || 'pending' }}
          </span>
          <button
            v-if="pendaftar.status !== 'approved'"
            @click="updateStatus('approved')"
            class="text-xs px-3 py-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-lg transition"
          >
            <i class="fas fa-check mr-1"></i>Approve
          </button>
          <button
            v-if="pendaftar.status !== 'rejected'"
            @click="updateStatus('rejected')"
            class="text-xs px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition"
          >
            <i class="fas fa-times mr-1"></i>Reject
          </button>
          <button
            v-if="pendaftar.status === 'approved' && pendaftar.status !== 'enrolled'"
            @click="updateStatus('enrolled')"
            class="text-xs px-3 py-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-lg transition"
          >
            <i class="fas fa-user-plus mr-1"></i>Tandai Enrolled
          </button>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
      <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
      <p class="text-sm text-[var(--text-secondary)] font-bold">Memuat data pendaftar…</p>
    </div>

    <template v-else>
      <!-- Identitas Santri -->
      <Section title="Identitas Santri" icon="fas fa-id-card">
        <InfoRow label="Lembaga Tujuan" :value="pendaftar.lembaga_tujuan" />
        <InfoRow label="Nama Lengkap" :value="pendaftar.nama" />
        <InfoRow label="Nama Panggilan" :value="pendaftar.nama_panggilan" />
        <InfoRow label="NIK" :value="pendaftar.nik" />
        <InfoRow label="No. KK" :value="pendaftar.no_kk" />
        <InfoRow
          label="Jenis Kelamin"
          :value="pendaftar.jk === 'L' ? 'Laki-laki' : pendaftar.jk === 'P' ? 'Perempuan' : '-'"
        />
        <InfoRow label="Tempat Lahir" :value="pendaftar.tempat_lahir" />
        <InfoRow label="Tanggal Lahir" :value="fmtTgl(pendaftar.tgl_lahir)" />
        <InfoRow label="Jalan / Dusun" :value="pendaftar.alamat_jalan || pendaftar.alamat" />
        <InfoRow label="Desa" :value="pendaftar.alamat_desa" />
        <InfoRow label="Kecamatan" :value="pendaftar.alamat_kecamatan" />
        <InfoRow label="Kabupaten" :value="pendaftar.alamat_kabupaten" />
        <InfoRow label="Provinsi" :value="pendaftar.alamat_provinsi" />
      </Section>

      <!-- Identitas Ayah -->
      <Section title="Identitas Ayah" icon="fas fa-male">
        <InfoRow label="Nama" :value="ayah.nama" />
        <InfoRow label="NIK" :value="ayah.nik" />
        <InfoRow label="Tempat Lahir" :value="ayah.tempat_lahir" />
        <InfoRow label="Tanggal Lahir" :value="fmtTgl(ayah.tgl_lahir)" />
        <InfoRow label="Pendidikan" :value="ayah.pendidikan" />
        <InfoRow label="Pekerjaan" :value="ayah.pekerjaan" />
        <InfoRow label="Telp / HP" :value="ayah.telp" />
      </Section>

      <!-- Identitas Ibu -->
      <Section title="Identitas Ibu" icon="fas fa-female">
        <InfoRow label="Nama" :value="ibu.nama" />
        <InfoRow label="NIK" :value="ibu.nik" />
        <InfoRow label="Tempat Lahir" :value="ibu.tempat_lahir" />
        <InfoRow label="Tanggal Lahir" :value="fmtTgl(ibu.tgl_lahir)" />
        <InfoRow label="Pendidikan" :value="ibu.pendidikan" />
        <InfoRow label="Pekerjaan" :value="ibu.pekerjaan" />
        <InfoRow label="Telp / HP" :value="ibu.telp" />
      </Section>

      <!-- Yang Mendaftarkan -->
      <Section title="Yang Mendaftarkan" icon="fas fa-pen-to-square">
        <InfoRow label="Nama" :value="pendaftar.yang_mendaftarkan || pendaftar.nama_wali" />
        <InfoRow label="WhatsApp" :value="pendaftar.wa_wali" />
        <InfoRow label="Catatan" :value="pendaftar.catatan" />
      </Section>

      <!-- Dokumen -->
      <Section title="Dokumen" icon="fas fa-file-image">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <DocPreview label="Akta Kelahiran" :url="aktaUrl" />
          <DocPreview label="Kartu Keluarga" :url="kkUrl" />
        </div>
      </Section>

      <!-- Field Tambahan (ACF) -->
      <Section title="Field Tambahan (ACF)" icon="fas fa-list-check">
        <div v-if="acfList.length === 0" class="text-center py-4">
          <i class="fas fa-circle-info text-[var(--text-tertiary)] text-2xl mb-2"></i>
          <p class="text-xs text-[var(--text-secondary)] italic">Belum ada field tambahan</p>
        </div>
        <div v-else class="space-y-2">
          <div
            v-for="item in acfList"
            :key="item.key"
            class="bg-[var(--bg-card-elevated)] rounded-lg p-2.5 flex items-start gap-2"
          >
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5 mb-0.5">
                <span
                  class="text-[9px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-700 font-bold uppercase"
                >
                  {{ item.type || 'text' }}
                </span>
                <p class="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wide">
                  {{ item.label || item.key }}
                </p>
              </div>
              <p class="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                {{ item.value || '—' }}
              </p>
            </div>
            <div class="flex flex-col gap-1">
              <button
                @click="openEditAcf(item)"
                class="text-[10px] px-2 py-0.5 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 font-bold rounded transition"
              >
                <i class="fas fa-pen"></i>
              </button>
              <button
                @click="deleteAcf(item.key)"
                class="text-[10px] px-2 py-0.5 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold rounded transition"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-dashed border-[var(--border-subtle)]">
          <button
            @click="openAddAcf"
            class="w-full text-xs px-3 py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold rounded-lg border border-dashed border-teal-300 transition"
          >
            <i class="fas fa-plus mr-1"></i>Tambah Field
          </button>
        </div>
      </Section>

      <!-- Convert ke Santri -->
      <div
        v-if="pendaftar.status === 'approved' || pendaftar.status === 'enrolled'"
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-teal-200 shadow-sm"
      >
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 class="text-sm font-black text-teal-700">
              <i class="fas fa-user-plus mr-1"></i>Konversi ke Santri
            </h3>
            <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
              Buat dokumen santri/ baru dari data pendaftaran ini.
            </p>
          </div>
          <button
            @click="convertToSantri"
            :disabled="converting"
            class="text-xs px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:bg-slate-300 text-white font-bold rounded-lg transition"
          >
            <i class="fas fa-arrow-right-to-bracket mr-1"></i
            >{{ converting ? 'Memproses…' : 'Buat Santri' }}
          </button>
        </div>
      </div>
    </template>

    <!-- Modal ACF -->
    <div
      v-if="acfModal.open"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      @click.self="acfModal.open = false"
    >
      <div class="bg-[var(--bg-card)] rounded-2xl p-5 max-w-md w-full space-y-3">
        <h3 class="text-base font-black text-[var(--text-primary)]">
          {{ acfModal.editing ? 'Edit Field' : 'Tambah Field' }}
        </h3>
        <div>
          <label class="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Type</label>
          <select
            v-model="acfModal.type"
            class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] mt-1"
          >
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div>
          <label class="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Label</label>
          <input
            v-model="acfModal.label"
            type="text"
            placeholder="Misal: Hafalan Saat Ini"
            class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] mt-1"
          />
        </div>
        <div>
          <label class="text-[11px] font-bold uppercase text-[var(--text-secondary)]"
            >Key (auto kalau kosong)</label
          >
          <input
            v-model="acfModal.key"
            type="text"
            :disabled="acfModal.editing"
            placeholder="kebab_case_key"
            class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] mt-1 disabled:bg-[var(--bg-muted)]"
          />
        </div>
        <div>
          <label class="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Value</label>
          <textarea
            v-if="acfModal.type === 'textarea'"
            v-model="acfModal.value"
            rows="3"
            class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] mt-1"
          ></textarea>
          <input
            v-else
            v-model="acfModal.value"
            :type="
              acfModal.type === 'number' ? 'number' : acfModal.type === 'date' ? 'date' : 'text'
            "
            class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] mt-1"
          />
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button
            @click="acfModal.open = false"
            class="text-xs px-3 py-1.5 bg-[var(--bg-muted)] hover:bg-slate-200 text-[var(--text-primary)] font-bold rounded-lg"
          >
            Batal
          </button>
          <button
            @click="saveAcf"
            class="text-xs px-3 py-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-lg"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineComponent, h, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { updateOne, addOne } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'

const route = useRoute()
const auth = useAuthStore()
const toast = useToast()
const confirmDlg = useConfirm()

const docId = computed(() => String(route.params.id || ''))
const pendaftar = ref({})
const loading = ref(true)
const converting = ref(false)
let unsubDoc = null

// Inline Section component (label/value form)
const Section = defineComponent({
  props: ['title', 'icon'],
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class:
            'bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm'
        },
        [
          h('h3', { class: 'text-xs font-black text-teal-700 uppercase tracking-wide mb-3' }, [
            h('i', { class: (props.icon || '') + ' mr-1' }),
            ' ',
            props.title
          ]),
          h('div', { class: 'grid grid-cols-1 md:grid-cols-2 gap-1.5' }, slots.default?.())
        ]
      )
  }
})

const InfoRow = defineComponent({
  props: ['label', 'value'],
  setup(props) {
    return () =>
      h(
        'div',
        { class: 'flex items-baseline gap-2 py-1 border-b border-[var(--border-subtle)]' },
        [
          h(
            'span',
            {
              class: 'text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wide min-w-[120px]'
            },
            props.label + ':'
          ),
          h(
            'span',
            { class: 'text-sm text-slate-800 dark:text-slate-200 flex-1 break-words' },
            props.value || '—'
          )
        ]
      )
  }
})

const DocPreview = defineComponent({
  props: ['label', 'url'],
  setup(props) {
    return () => {
      const isImg = props.url && /\.(png|jpe?g|webp|gif)$/i.test(props.url)
      return h('div', { class: 'bg-[var(--bg-card-elevated)] rounded-xl p-3 border border-[var(--border-subtle)]' }, [
        h('p', { class: 'text-[11px] font-bold uppercase text-[var(--text-secondary)] mb-2' }, props.label),
        props.url
          ? h('a', { href: props.url, target: '_blank', class: 'block' }, [
              isImg
                ? h('img', {
                    src: props.url,
                    class: 'w-full h-40 object-contain bg-[var(--bg-card)] rounded-lg'
                  })
                : h(
                    'div',
                    {
                      class:
                        'w-full h-40 flex items-center justify-center bg-[var(--bg-card)] rounded-lg text-teal-600'
                    },
                    [h('i', { class: 'fas fa-file-pdf text-4xl' })]
                  ),
              h(
                'p',
                { class: 'text-[10px] text-teal-600 text-center mt-1 hover:underline' },
                'Klik untuk lihat full'
              )
            ])
          : h('p', { class: 'text-xs text-[var(--text-tertiary)] italic text-center py-8' }, 'Tidak ada file')
      ])
    }
  }
})

// Computed parent shortcuts (back-compat: ayah/ibu can be nested object or flat fields)
const ayah = computed(
  () =>
    pendaftar.value.ayah || {
      nama: pendaftar.value.nama_ayah,
      pekerjaan: pendaftar.value.pekerjaan_ayah,
      telp: pendaftar.value.telp_ayah
    }
)
const ibu = computed(
  () =>
    pendaftar.value.ibu || {
      nama: pendaftar.value.nama_ibu,
      pekerjaan: pendaftar.value.pekerjaan_ibu,
      telp: pendaftar.value.telp_ibu
    }
)
const aktaUrl = computed(() => pendaftar.value.dokumen?.akta_url || pendaftar.value.akta_url || '')
const kkUrl = computed(() => pendaftar.value.dokumen?.kk_url || pendaftar.value.kk_url || '')

// ACF normalization: support {value, label, type} OR primitive
const acfList = computed(() => {
  const acf = pendaftar.value.acf || {}
  return Object.entries(acf).map(([key, val]) => {
    if (val && typeof val === 'object' && 'value' in val) {
      return { key, label: val.label || key, type: val.type || 'text', value: val.value }
    }
    return { key, label: key, type: 'text', value: String(val ?? '') }
  })
})

// ACF modal state
const acfModal = ref({
  open: false,
  editing: false,
  key: '',
  label: '',
  type: 'text',
  value: ''
})

function openAddAcf() {
  acfModal.value = { open: true, editing: false, key: '', label: '', type: 'text', value: '' }
}
function openEditAcf(item) {
  acfModal.value = {
    open: true,
    editing: true,
    key: item.key,
    label: item.label,
    type: item.type,
    value: item.value
  }
}

function slugifyKey(s) {
  return (
    String(s || '')
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'field_' + Date.now()
  )
}

async function saveAcf() {
  let key = acfModal.value.key || slugifyKey(acfModal.value.label)
  key = slugifyKey(key)
  if (!key || !acfModal.value.label) {
    toast.error('Label & Key wajib')
    return
  }
  const entry = {
    label: acfModal.value.label,
    type: acfModal.value.type,
    value: acfModal.value.value
  }
  try {
    const next = { ...(pendaftar.value.acf || {}) }
    next[key] = entry
    await updateOne('psb_pendaftaran', docId.value, { acf: next })
    acfModal.value.open = false
    toast.success('Field disimpan')
  } catch (e) {
    toast.error('Gagal simpan: ' + (e.message || e))
  }
}

async function deleteAcf(key) {
  const ok = await confirmDlg({ title: 'Hapus field ini?', confirmText: 'Hapus', danger: true })
  if (!ok) return
  try {
    const next = { ...(pendaftar.value.acf || {}) }
    delete next[key]
    await updateOne('psb_pendaftaran', docId.value, { acf: next })
    toast.success('Field dihapus')
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}

async function updateStatus(status) {
  try {
    await updateOne('psb_pendaftaran', docId.value, {
      status,
      processed_at: new Date().toISOString(),
      processed_by: auth.sesiAktif?.nama || 'Admin'
    })
    toast.success(`Status: ${status}`)
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}

async function convertToSantri() {
  if (converting.value) return
  const ok = await confirmDlg({
    title: 'Convert ke Santri?',
    text: 'Akan dibuat dokumen baru di koleksi santri/. Pastikan data sudah lengkap.',
    confirmText: 'Lanjut'
  })
  if (!ok) return
  converting.value = true
  try {
    const payload = {
      nama: pendaftar.value.nama || '',
      nis: pendaftar.value.nis || '',
      nik: pendaftar.value.nik || '',
      jk: pendaftar.value.jk || '',
      tempat_lahir: pendaftar.value.tempat_lahir || '',
      tgl_lahir: pendaftar.value.tgl_lahir || '',
      alamat: [
        pendaftar.value.alamat_jalan,
        pendaftar.value.alamat_desa,
        pendaftar.value.alamat_kecamatan
      ]
        .filter(Boolean)
        .join(', '),
      lembaga: pendaftar.value.lembaga_tujuan || '',
      wali: pendaftar.value.nama_wali || ayah.value?.nama || '',
      wa_wali: pendaftar.value.wa_wali || ayah.value?.telp || '',
      psb_id: docId.value,
      audit: {
        created_at: new Date().toISOString(),
        created_by: auth.sesiAktif?.nama || 'Admin'
      }
    }
    await addOne('santri', payload)
    await updateOne('psb_pendaftaran', docId.value, {
      status: 'enrolled',
      enrolled_at: new Date().toISOString()
    })
    toast.success('Santri dibuat — status PSB → enrolled')
  } catch (e) {
    toast.error('Gagal convert: ' + (e.message || e))
  } finally {
    converting.value = false
  }
}

function statusBg(s) {
  const st = s || 'pending'
  if (st === 'approved') return 'bg-emerald-100 text-emerald-700'
  if (st === 'rejected') return 'bg-rose-100 text-rose-700'
  if (st === 'enrolled') return 'bg-teal-100 text-teal-700'
  return 'bg-cyan-100 text-cyan-700'
}

function fmtTgl(v) {
  if (!v) return '—'
  const d =
    typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)
      ? new Date(v)
      : v?.toDate
        ? v.toDate()
        : new Date(v)
  if (isNaN(d.getTime())) return String(v)
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(d)
}

onMounted(() => {
  if (!docId.value) return
  unsubDoc = onSnapshot(
    doc(db, 'psb_pendaftaran', docId.value),
    (snap) => {
      if (snap.exists()) {
        pendaftar.value = { id: snap.id, ...snap.data() }
      } else {
        pendaftar.value = {}
        toast.error('Pendaftar tidak ditemukan')
      }
      loading.value = false
    },
    (e) => {
      toast.error('Gagal load: ' + (e.message || e))
      loading.value = false
    }
  )
})

onUnmounted(() => {
  if (unsubDoc) {
    try {
      unsubDoc()
    } catch {}
  }
})
</script>
