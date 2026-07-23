<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
    @click.self="$emit('close')"
  >
    <div
      class="bg-[var(--bg-card)] rounded-2xl w-full max-w-md shadow-xl border border-[var(--border-subtle)] max-h-[90vh] overflow-y-auto"
    >
      <div
        class="flex items-center justify-between px-5 py-3 border-b border-[var(--border-subtle)] sticky top-0 bg-[var(--bg-card)]"
      >
        <h3 class="text-sm font-black text-[var(--text-primary)] truncate">
          <i class="fas fa-graduation-cap text-teal-600 mr-1.5"></i>Edit Kelas —
          {{ santri?.nama || '' }}
        </h3>
        <button
          type="button"
          aria-label="Tutup"
          class="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] shrink-0"
          @click="$emit('close')"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="p-5 space-y-3">
        <p class="text-[11px] text-[var(--text-secondary)]">
          Perbaiki data kelas santri (mis. bila hasil impor keliru). Hanya field di bawah yang
          berubah — biodata & guru pengampu tak tersentuh.
        </p>

        <div v-if="isLoading" class="text-center py-6 text-xs text-[var(--text-tertiary)] italic">
          <i class="fas fa-spinner fa-spin mr-1"></i>Memuat…
        </div>

        <template v-else>
          <!-- Pondok Qiraati -->
          <div class="rounded-xl border border-teal-200 dark:border-teal-800 p-3 space-y-2.5">
            <p
              class="text-[10px] font-black text-teal-700 dark:text-teal-300 uppercase tracking-wide"
            >
              <i class="fas fa-book-quran mr-1"></i>Pondok Qiraati
            </p>
            <div>
              <label :class="labelCls">Lembaga Qiraati</label>
              <select v-model="form.lembaga" :class="inputCls">
                <option value="">— pilih —</option>
                <option v-for="l in lembagaPondokOptions" :key="l" :value="l">{{ l }}</option>
              </select>
            </div>
            <div>
              <label :class="labelCls">Kelas / Jilid</label>
              <select v-model="form.kelas" :class="inputCls">
                <option value="">— pilih —</option>
                <option v-for="k in kelasOptions" :key="k" :value="k">{{ k }}</option>
              </select>
            </div>
            <div v-if="isPtpt">
              <label :class="labelCls">Juz (khusus PTPT)</label>
              <input v-model="form.juz" type="text" placeholder="mis. 1" :class="inputCls" />
            </div>
          </div>

          <!-- Pendidikan Sekolah -->
          <div class="rounded-xl border border-cyan-200 dark:border-cyan-800 p-3 space-y-2.5">
            <p
              class="text-[10px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wide"
            >
              <i class="fas fa-school mr-1"></i>Pendidikan Sekolah
            </p>
            <div>
              <label :class="labelCls">Lembaga Sekolah</label>
              <select v-model="form.lembaga_sekolah" :class="inputCls">
                <option value="">— tidak ada —</option>
                <option v-for="l in lembagaSekolahOptions" :key="l" :value="l">{{ l }}</option>
              </select>
            </div>
            <div>
              <label :class="labelCls">Kelas Sekolah</label>
              <select v-model="form.kelas_sekolah" :class="inputCls">
                <option value="">— tidak ada —</option>
                <option v-for="k in kelasSekolahOptions" :key="k" :value="k">{{ k }}</option>
              </select>
            </div>
          </div>
        </template>
      </div>

      <div
        class="flex justify-end gap-2 px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-card-elevated)] rounded-b-2xl sticky bottom-0"
      >
        <button
          type="button"
          class="px-4 py-2 text-xs font-bold rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)]"
          @click="$emit('close')"
        >
          Batal
        </button>
        <button
          type="button"
          :disabled="saving || isLoading"
          class="px-4 py-2 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 flex items-center gap-1.5"
          @click="simpan"
        >
          <i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-floppy-disk']"></i>
          {{ saving ? 'Menyimpan…' : 'Simpan' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// v.1.2.1 (Kyai 22 Jul 2026): guru boleh memperbaiki data KELAS santri ampuannya
//   (Lembaga/Kelas Qiraati, Lembaga/Kelas Sekolah, Juz PTPT) langsung dari Data Santri —
//   mis. bila impor salah. Izinnya sudah ada: RLS `santri_upd_pengampu` (migrasi
//   20260719120000) mengizinkan UPDATE baris santri yang guru-nya = yang login.
//
//   Opsi dropdown DIPAKAI ULANG dari useSantriForm (satu sumber, ikut TK-umbrella &
//   kelas-per-lembaga). TAPI save-nya FOKUS: hanya 5 field lewat mergeOne — TIDAK
//   memanggil useSantriForm.save() yang menulis payload penuh (nama/wa/guru_pagi/…),
//   supaya field pengampu tak tersentuh (kalau tersentuh, WITH CHECK RLS bisa gagal).
import { computed, ref, watch } from 'vue'
import { useSantriForm } from '@/composables/useSantriForm'
import { mergeOne } from '@/services/db'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  open: { type: Boolean, default: false },
  santri: { type: Object, default: null }
})
const emit = defineEmits(['close', 'saved'])

const toast = useToast()
const {
  form,
  isLoading,
  kelasOptions,
  kelasSekolahOptions,
  lembagaPondokOptions,
  lembagaSekolahOptions,
  loadSantri
} = useSantriForm()
const saving = ref(false)

const isPtpt = computed(() => String(form.value.lembaga || '').toUpperCase() === 'PTPT')

const labelCls = 'block text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1'
const inputCls =
  'w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] cursor-pointer'

// Muat data santri tiap dialog dibuka (form berisi data terkini dari DB).
watch(
  () => props.open,
  (o) => {
    if (o && props.santri?.id) loadSantri(String(props.santri.id))
  },
  { immediate: true }
)

async function simpan() {
  if (saving.value || !props.santri?.id) return
  saving.value = true
  try {
    const f = form.value
    const lembaga = String(f.lembaga || '').trim()
    // FOKUS: hanya field kelas. mergeOne membaca baris penuh lalu deep-merge, jadi
    //   guru_pagi/sore/guru_sekolah (di data jsonb, dicek RLS) tetap utuh.
    await mergeOne('santri', String(props.santri.id), {
      lembaga,
      kelas: String(f.kelas || '').trim(),
      lembaga_sekolah: String(f.lembaga_sekolah || '').trim(),
      // '-' = konvensi "tak ada" (sama dengan useSantriForm.save).
      kelas_sekolah: String(f.kelas_sekolah || '').trim() || '-',
      juz: lembaga.toUpperCase() === 'PTPT' ? String(f.juz || '').toUpperCase() : '-'
    })
    toast.success('Data kelas santri diperbarui')
    emit('saved')
    emit('close')
  } catch (e) {
    toast.error('Gagal simpan: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}
</script>
