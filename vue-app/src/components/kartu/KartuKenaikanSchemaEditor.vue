<template>
  <!-- Tab Pengaturan: KOP editor + Schema editor (kelas + items + ceremonial) -->
  <div class="space-y-4">
    <!-- Info -->
    <p class="text-xs text-[var(--text-secondary)] italic flex items-start gap-1.5">
      <i class="fas fa-info-circle mt-0.5"></i>
      <span
        >Klik card lembaga di bawah untuk atur KOP dan Schema Kartu Kenaikan khusus lembaga
        tersebut.</span
      >
    </p>

    <!-- Grid card lembaga -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <button
        v-for="l in LEMBAGA_LIST"
        :key="l"
        type="button"
        @click="kk.bukaEditor(l)"
        :class="[
          'bg-white dark:bg-slate-900 border-2 rounded-xl p-3 md:p-4 text-center font-black transition cursor-pointer shadow-sm',
          kk.editorLembaga.value === l
            ? 'border-cyan-500 text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 ring-2 ring-cyan-200'
            : 'border-[var(--border-subtle)] text-slate-700 dark:text-[var(--text-tertiary)] hover:border-cyan-300 hover:bg-cyan-50/50'
        ]"
      >
        <p class="text-sm md:text-base">{{ l }}</p>
      </button>
    </div>

    <!-- Editor (visible when lembaga dipilih) -->
    <div
      v-if="kk.editorLembaga.value && kk.editorSchema.value"
      class="border border-[var(--border-default)] rounded-xl overflow-hidden"
    >
      <div class="bg-[var(--bg-muted)] px-4 py-2 flex items-center justify-between">
        <p class="text-xs md:text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-folder-open mr-1"></i>Pengaturan Kartu — {{ kk.editorLembaga.value }}
        </p>
        <button
          @click="kk.tutupEditor()"
          class="text-xs text-[var(--text-secondary)] hover:text-slate-700 dark:text-[var(--text-tertiary)] cursor-pointer"
        >
          <i class="fas fa-times"></i> Tutup
        </button>
      </div>

      <div class="p-4 bg-[var(--bg-card)] space-y-4">
        <!-- KOP Editor -->
        <div
          class="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-700 rounded-xl p-3 md:p-4"
        >
          <h4 class="text-sm font-black text-cyan-800 dark:text-cyan-300 mb-1">
            <i class="fas fa-flag mr-1"></i>KOP Kartu Kenaikan (Per Lembaga)
          </h4>
          <p class="text-[11px] text-[var(--text-secondary)] mb-3">
            Atur judul, subjudul, alamat khusus untuk lembaga ini. Contoh: PTPT pakai "PASCA TPQ
            PROGRAM TAHFIZH", TPQ pakai "TAMAN PENDIDIKAN AL-QURAN".
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label
                class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
                >Judul Utama</label
              >
              <input
                v-model="kk.editorKop.value.judul"
                type="text"
                placeholder="KONTROL KENAIKAN KELAS"
                class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
              />
            </div>
            <div>
              <label
                class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
                >Subjudul</label
              >
              <input
                v-model="kk.editorKop.value.subjudul"
                type="text"
                placeholder="PTPT MAMBAUL ULUM"
                class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
              />
            </div>
            <div class="md:col-span-2">
              <label
                class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
                >Alamat</label
              >
              <input
                v-model="kk.editorKop.value.alamat"
                type="text"
                placeholder="Jl. Kolonel Sugiono No. 112 Panjunan - Waru - Sidoarjo"
                class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
              />
            </div>
          </div>
        </div>

        <!-- Schema Editor -->
        <div
          class="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-700 rounded-xl p-3 md:p-4 space-y-3"
        >
          <div class="flex items-center justify-between flex-wrap gap-2">
            <h4 class="text-sm font-black text-teal-800 dark:text-teal-300">
              <i class="fas fa-list-alt mr-1"></i>Schema Kartu — {{ kk.editorLembaga.value }}
            </h4>
            <div class="flex gap-1">
              <button
                @click="kk.resetSchema()"
                class="text-[10px] font-bold px-2 py-1 rounded bg-cyan-100 hover:bg-cyan-200 text-cyan-800 cursor-pointer"
              >
                <i class="fas fa-undo mr-0.5"></i>Reset Default
              </button>
            </div>
          </div>

          <!-- Item Header label input -->
          <div>
            <label
              class="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block mb-1"
            >
              Header Item (mis: Juz / Jilid / Khotam / Tahap)
            </label>
            <input
              v-model="kk.editorSchema.value.itemHeader"
              placeholder="Item"
              class="w-full px-2 py-1.5 text-sm border border-teal-300 dark:border-teal-700 rounded bg-white dark:bg-slate-900 text-[var(--text-primary)]"
            />
          </div>

          <!-- Daftar Kelas -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <p
                class="text-[11px] font-black text-teal-800 dark:text-teal-300 uppercase tracking-wider"
              >
                Daftar Kelas/Level/Jilid:
              </p>
              <button
                @click="kk.addKelas()"
                class="text-[10px] bg-teal-200 hover:bg-teal-300 text-teal-800 font-bold px-2 py-0.5 rounded cursor-pointer"
              >
                <i class="fas fa-plus mr-0.5"></i>Tambah Kelas
              </button>
            </div>

            <div
              v-if="(kk.editorSchema.value.kelasList || []).length === 0"
              class="text-center text-xs text-[var(--text-tertiary)] italic py-3"
            >
              Belum ada kelas. Klik "Tambah Kelas" untuk mulai.
            </div>

            <div
              v-for="(kelas, ki) in kk.editorSchema.value.kelasList || []"
              :key="kelas.id"
              class="bg-[var(--bg-card)] border border-teal-100 dark:border-teal-700 rounded-lg p-2 space-y-2"
            >
              <!-- Row 1: label + ceremonial toggle + delete -->
              <div class="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                <input
                  v-model="kelas.label"
                  placeholder="Label (Kelas 1)"
                  class="text-xs font-bold px-2 py-1 border border-[var(--border-default)] rounded bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                />
                <label
                  class="text-[10px] font-bold text-[var(--text-secondary)] flex items-center gap-1"
                >
                  <input
                    v-model="kelas.ceremonial"
                    type="checkbox"
                    class="w-3 h-3 accent-teal-600"
                  />
                  Ceremonial
                </label>
                <button
                  @click="kk.removeKelas(ki)"
                  class="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-xs px-1.5 rounded cursor-pointer"
                  title="Hapus kelas"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              <!-- Row 2: items list -->
              <div class="space-y-1 pl-3 border-l-2 border-teal-200 dark:border-teal-700">
                <p class="text-[10px] font-bold text-[var(--text-secondary)] uppercase">
                  Items ({{ kk.editorSchema.value.itemHeader || 'Item' }}):
                </p>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="(item, ii) in kelas.items || []"
                    :key="item.id"
                    class="bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 px-2 py-0.5 rounded text-[11px] flex items-center gap-1"
                  >
                    <input
                      v-model="item.label"
                      class="bg-transparent border-0 outline-none text-[11px] w-14 text-slate-800 dark:text-slate-100"
                    />
                    <button
                      @click="kk.removeItem(ki, ii)"
                      class="text-rose-400 text-[10px] cursor-pointer"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </span>
                  <button
                    @click="kk.addItem(ki)"
                    class="bg-teal-200 hover:bg-teal-300 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer"
                  >
                    + Item
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p class="text-[10px] text-[var(--text-secondary)] italic">
            <i class="fas fa-info-circle mr-1"></i>
            Schema ini dipakai di modal Kartu Kenaikan (matrix kelas × items × ceremonial).
          </p>
        </div>

        <!-- Save button (full width) -->
        <div class="flex justify-end gap-2">
          <button
            @click="kk.simpanEditor()"
            :disabled="kk.savingEditor.value"
            class="px-4 py-2 text-sm font-black rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
          >
            <i :class="['fas', kk.savingEditor.value ? 'fa-spinner fa-spin' : 'fa-save']"></i>
            {{ kk.savingEditor.value ? 'Menyimpan...' : 'Simpan Pengaturan' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Empty state when no lembaga selected -->
    <div v-else class="text-center text-[var(--text-tertiary)] italic text-sm py-8">
      <i class="fas fa-hand-pointer text-2xl block mb-2"></i>
      Pilih lembaga di atas untuk mulai atur KOP & Schema.
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  kk: { type: Object, required: true }
})

// Daftar lembaga yang punya kartu kenaikan
// Note: TPQ Pagi & TPQ Sore share schema 'TPQ' (umbrella)
const LEMBAGA_LIST = ['TPQ', 'Pra PTPT', 'PTPT', 'PPPH']
</script>
