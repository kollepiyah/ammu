<template>
  <div class="p-5 md:p-7 max-w-3xl mx-auto space-y-4">
    <div>
      <h1 class="text-xl md:text-2xl font-black text-[var(--text-primary)] flex items-center gap-2">
        <i class="fas fa-file-import text-[var(--color-primary)]"></i> Impor Kalender Kegiatan
      </h1>
      <p class="text-sm text-[var(--text-secondary)] mt-1">
        Unggah Excel untuk menambah banyak kegiatan sekaligus ke kalender pendidikan.
      </p>
    </div>

    <div
      class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 shadow-sm space-y-4"
    >
      <div class="flex flex-wrap items-center gap-3">
        <button
          class="h-10 px-4 inline-flex items-center gap-2 rounded-xl bg-slate-600 hover:bg-slate-700 text-white text-sm font-bold"
          @click="unduhTemplate"
        >
          <i class="fas fa-download"></i> Unduh Template
        </button>
        <label
          class="h-10 px-4 inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] hover:opacity-90 text-white text-sm font-bold cursor-pointer"
        >
          <i :class="['fas', parsing ? 'fa-spinner fa-spin' : 'fa-file-excel']"></i>
          {{ parsing ? 'Membaca...' : 'Pilih File Excel' }}
          <input
            type="file"
            accept=".xlsx,.xls"
            class="hidden"
            @change="onFile"
            :disabled="parsing || importing"
          />
        </label>
        <span class="text-xs text-[var(--text-secondary)]"
          >Kolom: Judul · Tanggal Mulai · Tanggal Akhir · Audience · Tipe · Deskripsi</span
        >
      </div>

      <div
        v-if="rows.length"
        class="border border-[var(--border-subtle)] rounded-lg overflow-hidden"
      >
        <div
          class="px-3 py-2 bg-[var(--bg-card-elevated)] text-xs font-bold text-[var(--text-secondary)] flex justify-between"
        >
          <span
            >{{ validRows.length }} baris valid ·
            {{ rows.length - validRows.length }} dilewati</span
          >
          <span>Pratinjau {{ Math.min(rows.length, 30) }} baris pertama</span>
        </div>
        <div class="max-h-80 overflow-auto">
          <table class="w-full text-xs">
            <thead class="bg-[var(--bg-card-elevated)] sticky top-0">
              <tr>
                <th class="text-left px-3 py-1.5 font-bold">Judul</th>
                <th class="text-left px-3 py-1.5 font-bold">Mulai</th>
                <th class="text-left px-3 py-1.5 font-bold">Akhir</th>
                <th class="text-left px-3 py-1.5 font-bold">Audience</th>
                <th class="text-left px-3 py-1.5 font-bold">Tipe</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(r, i) in rows.slice(0, 30)"
                :key="i"
                class="border-t border-[var(--border-subtle)]"
                :class="r._valid ? '' : 'opacity-50'"
              >
                <td class="px-3 py-1.5">{{ r.judul || '—' }}</td>
                <td class="px-3 py-1.5">{{ r.tgl_mulai || '—' }}</td>
                <td class="px-3 py-1.5">{{ r.tgl_akhir || '—' }}</td>
                <td class="px-3 py-1.5">{{ r.audience }}</td>
                <td class="px-3 py-1.5">{{ r.tipe }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="rows.length" class="flex items-center justify-end gap-2">
        <button
          class="h-10 px-4 rounded-xl border border-[var(--border-subtle)] text-sm font-bold"
          @click="reset"
        >
          Bersihkan
        </button>
        <button
          class="h-10 px-5 rounded-xl bg-[var(--color-primary)] hover:opacity-90 disabled:opacity-50 text-white text-sm font-bold"
          :disabled="importing || validRows.length === 0"
          @click="doImport"
        >
          <i :class="['fas', importing ? 'fa-spinner fa-spin' : 'fa-cloud-arrow-up', 'mr-1.5']"></i
          >{{ importing ? 'Mengimpor...' : `Impor ${validRows.length} Kegiatan` }}
        </button>
      </div>

      <div v-if="!rows.length" class="text-center py-8 text-sm text-[var(--text-tertiary)] italic">
        Belum ada file. Unduh template, isi, lalu unggah di sini.
      </div>
    </div>
  </div>
</template>

<script setup>
// Halaman impor kegiatan kalender via Excel -> koleksi 'kegiatan' (backend sama dgn Kalender Kegiatan).
import { ref, computed } from 'vue'
import { useExcel } from '@/composables/useExcel'
import { useKegiatan } from '@/composables/useKegiatan'
import { useToast } from '@/composables/useToast'

const { exportStyled, importFile } = useExcel()
const { simpanKegiatan } = useKegiatan()
const toast = useToast()

const rows = ref([])
const parsing = ref(false)
const importing = ref(false)
const validRows = computed(() => rows.value.filter((r) => r._valid))

function _pick(row, ...aliases) {
  for (const a of aliases) {
    if (row[a] !== undefined && row[a] !== null && row[a] !== '') return row[a]
  }
  const low = {}
  for (const k of Object.keys(row)) low[k.toLowerCase().trim()] = row[k]
  for (const a of aliases) {
    const v = low[String(a).toLowerCase().trim()]
    if (v !== undefined && v !== null && v !== '') return v
  }
  return ''
}
function normalizeDate(v) {
  if (!v) return ''
  if (v instanceof Date && !isNaN(v)) return v.toISOString().slice(0, 10)
  const s = String(v).trim()
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
  if (m) return `${m[1]}-${String(+m[2]).padStart(2, '0')}-${String(+m[3]).padStart(2, '0')}`
  m = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/)
  if (m) return `${m[3]}-${String(+m[2]).padStart(2, '0')}-${String(+m[1]).padStart(2, '0')}`
  const d = new Date(s)
  return isNaN(d) ? '' : d.toISOString().slice(0, 10)
}

async function unduhTemplate() {
  try {
    await exportStyled(
      [
        {
          Judul: 'Contoh: Ujian Akhir Semester',
          'Tanggal Mulai': '2026-12-15',
          'Tanggal Akhir': '2026-12-20',
          Audience: 'semua',
          Tipe: 'kegiatan',
          Deskripsi: 'Keterangan opsional'
        },
        {
          Judul: 'Contoh: Libur Maulid',
          'Tanggal Mulai': '2026-09-05',
          'Tanggal Akhir': '2026-09-05',
          Audience: 'semua',
          Tipe: 'libur',
          Deskripsi: ''
        }
      ],
      { filename: 'template_kalender_kegiatan.xlsx', sheetName: 'Kegiatan' }
    )
  } catch (e) {
    toast.error('Gagal membuat template: ' + (e.message || e))
  }
}

async function onFile(e) {
  const file = e.target?.files?.[0]
  if (!file) return
  parsing.value = true
  try {
    const raw = await importFile(file)
    rows.value = (raw || []).map((r) => {
      const judul = String(_pick(r, 'Judul', 'judul', 'Kegiatan', 'Nama') || '').trim()
      const tgl_mulai = normalizeDate(
        _pick(r, 'Tanggal Mulai', 'Tgl Mulai', 'tgl_mulai', 'Tanggal', 'tanggal')
      )
      const tgl_akhir =
        normalizeDate(_pick(r, 'Tanggal Akhir', 'Tgl Akhir', 'tgl_akhir')) || tgl_mulai
      const audience = String(_pick(r, 'Audience', 'audience') || 'semua')
        .toLowerCase()
        .trim()
      const tipe = String(_pick(r, 'Tipe', 'tipe', 'Jenis') || 'kegiatan')
        .toLowerCase()
        .trim()
      const deskripsi = String(_pick(r, 'Deskripsi', 'deskripsi', 'Keterangan') || '').trim()
      return {
        judul,
        tgl_mulai,
        tgl_akhir,
        audience: ['semua', 'guru', 'santri'].includes(audience) ? audience : 'semua',
        tipe,
        deskripsi,
        _valid: !!(judul && tgl_mulai)
      }
    })
    if (rows.value.length === 0) toast.warning('File kosong atau format tidak sesuai')
  } catch (err) {
    toast.error('Gagal membaca file: ' + (err.message || err))
  } finally {
    parsing.value = false
    e.target.value = ''
  }
}

async function doImport() {
  importing.value = true
  let ok = 0
  let fail = 0
  try {
    // v.110.0626: id deterministik (tgl_mulai + judul) → re-impor file SAMA menimpa
    //   (idempoten, tak dobel) + cegah tabrakan `kg_${Date.now()}` yg bisa menimpa/
    //   menghilangkan event saat 2 baris masuk di milidetik sama. Fallback index bila judul kosong.
    for (let i = 0; i < validRows.value.length; i++) {
      const r = validRows.value[i]
      try {
        const _slug = String(r.judul || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 40)
        const _id = `kg_${r.tgl_mulai || 'x'}_${_slug || i}`
        await simpanKegiatan({
          id: _id,
          judul: r.judul,
          tgl_mulai: r.tgl_mulai,
          tgl_akhir: r.tgl_akhir,
          audience: r.audience,
          deskripsi: r.deskripsi,
          tipe: r.tipe
        })
        ok++
      } catch (e) {
        fail++
      }
    }
    toast.success(`Impor selesai: ${ok} kegiatan masuk${fail ? `, ${fail} gagal` : ''}`)
    rows.value = []
  } finally {
    importing.value = false
  }
}

function reset() {
  rows.value = []
}
</script>
