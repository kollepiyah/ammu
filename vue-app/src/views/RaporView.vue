<template>
  <div class="p-4 md:p-6 max-w-5xl mx-auto">
    <!-- ===== STEP 1: Picker Kategori (Qiraati / Diniyah) ===== -->
    <div
      v-if="view === 'picker'"
      class="bg-emerald-50/40 dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-emerald-100 dark:border-slate-700 shadow-sm"
    >
      <div class="flex items-start gap-3 mb-4">
        <i class="fas fa-graduation-cap text-emerald-700 dark:text-emerald-300 text-2xl"></i>
        <div>
          <h2 class="text-lg md:text-xl font-black text-[var(--text-primary)] leading-tight">
            Rapor Semester
          </h2>
          <p class="text-xs md:text-sm text-[var(--text-secondary)] mt-0.5">
            Pilih lembaga untuk mengelola data rapor santri.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-4">
        <select
          v-model="tahunAjaran"
          class="px-4 py-3 text-sm font-bold border border-[var(--border-default)] rounded-xl bg-white dark:bg-slate-900 text-[var(--text-primary)]"
        >
          <option v-for="t in TAHUN_AJARAN_OPTS" :key="t" :value="t">{{ t }}</option>
        </select>
        <select
          v-model="semester"
          class="px-4 py-3 text-sm font-bold border border-[var(--border-default)] rounded-xl bg-white dark:bg-slate-900 text-[var(--text-primary)]"
        >
          <option value="Ganjil">Ganjil</option>
          <option value="Genap">Genap</option>
        </select>
      </div>

      <div class="grid grid-cols-2 gap-2 md:gap-3">
        <UiActionCard
          icon="fas fa-mosque"
          title="Rapor Qiraati"
          subtitle="TPQ Sore · Pra PTPT · PTPT · PPPH"
          gradient="from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900"
          @click="pilihKategori('qiraati')"
        />
        <UiActionCard
          icon="fas fa-book-open"
          title="Rapor Diniyah"
          subtitle="Mata pelajaran agama"
          gradient="from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900"
          @click="pilihKategori('diniyah')"
        />
      </div>
    </div>

    <!-- ===== STEP 2: Pilih Lembaga (Qiraati variants / Diniyah formal) ===== -->
    <div
      v-else-if="view === 'lembaga'"
      class="bg-emerald-50/40 dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-emerald-100 dark:border-slate-700 shadow-sm"
    >
      <div class="flex items-center gap-3 mb-4">
        <button
          @click="view = 'picker'"
          class="text-xs font-bold px-2 py-1.5 rounded-lg bg-[var(--bg-muted)] hover:bg-slate-200 transition cursor-pointer"
          title="Kembali"
        >
          <i class="fas fa-arrow-left"></i>
        </button>
        <div>
          <h2 class="text-lg md:text-xl font-black text-[var(--text-primary)] leading-tight">
            <i
              :class="[
                'fas mr-2',
                kategori === 'qiraati' ? 'fa-mosque text-emerald-700' : 'fa-book-open text-cyan-700'
              ]"
            ></i>
            Rapor {{ kategori === 'qiraati' ? 'Qiraati' : 'Diniyah' }}
          </h2>
          <p class="text-xs md:text-sm text-[var(--text-secondary)] mt-0.5">
            Pilih {{ kategori === 'qiraati' ? 'lembaga Qiraati' : 'sekolah formal' }}.
          </p>
        </div>
      </div>

      <!-- Qiraati: 4 lembaga (TPQ Sore, Pra PTPT, PTPT, PPPH) — TPQ Pagi tidak menerbitkan rapor -->
      <div v-if="kategori === 'qiraati'" class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        <button
          v-for="l in QIRAATI_LEMBAGA"
          :key="l.id"
          @click="pilihLembaga(l.id)"
          :class="[
            'group relative overflow-hidden bg-gradient-to-br rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer flex flex-col gap-1',
            l.gradient
          ]"
        >
          <i :class="['fas', l.icon, 'text-base md:text-lg drop-shadow']"></i>
          <h3 class="text-sm md:text-base font-black leading-tight drop-shadow-sm">
            {{ l.label }}
          </h3>
          <p class="text-[10px] text-white/90 font-medium leading-snug">{{ l.subtitle }}</p>
        </button>
      </div>

      <!-- Diniyah: filter SDI / PKBM only -->
      <div v-else-if="kategori === 'diniyah'">
        <div
          v-if="diniyahLembaga.length === 0"
          class="text-center py-8 text-xs text-[var(--text-tertiary)] italic"
        >
          <i class="fas fa-school text-3xl text-slate-300 dark:text-[var(--text-secondary)] block mb-2"></i>
          Belum ada sekolah formal terdaftar. Tambah lembaga tipe "Formal" di Master Data &gt;
          Lembaga.
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          <button
            v-for="l in diniyahLembaga"
            :key="l.id"
            @click="pilihLembaga(l.lembaga || l.id, l.jenjang)"
            :class="[
              'group relative overflow-hidden bg-gradient-to-br rounded-xl p-3 md:p-4 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer flex flex-col gap-1',
              l.gradient
            ]"
          >
            <i :class="['fas', l.icon, 'text-base md:text-lg drop-shadow']"></i>
            <h3 class="text-sm md:text-base font-black leading-tight drop-shadow-sm">
              {{ l.label }}
            </h3>
            <p class="text-[10px] text-white/90 font-medium leading-snug">{{ l.subtitle }}</p>
          </button>
        </div>
      </div>
    </div>

    <!-- ===== STEP 3: List Santri ===== -->
    <div v-else-if="view === 'santri'" class="space-y-4">
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex items-center justify-between gap-3 flex-wrap mb-3">
          <div class="flex items-center gap-2">
            <button
              @click="view = isFullFilter ? 'lembaga' : 'picker'"
              class="text-xs font-bold px-2 py-1.5 rounded-lg bg-[var(--bg-muted)] hover:bg-slate-200 dark:hover:bg-slate-600 transition cursor-pointer"
              title="Kembali"
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <h2 class="text-base md:text-lg font-black text-[var(--text-primary)]">
              <i
                :class="[
                  'fas',
                  kategori === 'qiraati'
                    ? 'fa-mosque text-emerald-600'
                    : 'fa-book-open text-cyan-600',
                  'mr-1'
                ]"
              ></i>
              {{ lembaga || (kategori === 'qiraati' ? 'Ngaji Saya' : 'Sekolah Saya') }} · {{ tahunAjaran }} {{ semester }}
            </h2>
          </div>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">{{ santriList.length }} santri</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input
            v-model="search"
            type="search"
            placeholder="Cari nama santri..."
            class="text-xs px-3 py-2 border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          />
          <select
            v-model="filterKelas"
            class="text-xs px-3 py-2 border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
          >
            <option value="">Semua Kelas</option>
            <option v-for="k in kelasOptions" :key="k" :value="k">Kelas {{ k }}</option>
          </select>
        </div>
      </div>

      <div
        v-if="santriList.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-users-slash text-[var(--text-tertiary)] text-4xl block mb-2"></i>
        <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">
          Belum ada santri di {{ lembaga }}
        </p>
        <p class="text-xs text-[var(--text-secondary)] mt-1">
          Tambah santri lewat Master Data &gt; Data Santri dengan lembaga "{{ lembaga }}".
        </p>
      </div>
      <!-- v.21.85: Toolbar multi-select PDF batch -->
      <div
        v-if="!isSantri && santriList.length > 0"
        class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm flex items-center justify-between gap-2 flex-wrap"
      >
        <div class="flex items-center gap-2 flex-wrap">
          <button
            @click="toggleSelectAll"
            class="text-xs font-bold px-3 py-1.5 rounded-lg bg-[var(--bg-muted)] hover:bg-[var(--color-primary-soft)] transition cursor-pointer text-[var(--text-primary)]"
          >
            <i :class="['fas', selectedSantriIds.size === santriList.length && santriList.length > 0 ? 'fa-check-square' : 'fa-square', 'mr-1']"></i>
            {{ selectedSantriIds.size === santriList.length && santriList.length > 0 ? 'Hapus Semua Pilihan' : 'Pilih Semua' }}
          </button>
          <span v-if="selectedSantriIds.size > 0" class="text-xs text-[var(--text-secondary)]">
            <b class="text-[var(--color-primary)]">{{ selectedSantriIds.size }}</b> santri dipilih
          </span>
        </div>
        <button
          v-if="selectedSantriIds.size > 0"
          @click="exportPdfBatch"
          :disabled="exportingBatch"
          aria-label="Ekspor batch rapor PDF"
          class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
        >
          <i :class="['fas', exportingBatch ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i>
          {{ exportingBatch ? 'Mengekspor...' : `Ekspor PDF (${selectedSantriIds.size})` }}
        </button>
      </div>

      <div v-if="santriList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
        <div
          v-for="s in santriList"
          :key="s.id"
          :class="[
            'bg-[var(--bg-card)] border rounded-xl p-3 md:p-4 transition flex items-center gap-3',
            selectedSantriIds.has(String(s.id))
              ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-accent)]/30'
              : 'border-[var(--border-subtle)] hover:bg-[var(--color-primary-soft)]/30'
          ]"
        >
          <!-- Checkbox multi-select (admin/guru only) -->
          <input
            v-if="!isSantri"
            type="checkbox"
            :checked="selectedSantriIds.has(String(s.id))"
            @click.stop="toggleSelect(s)"
            class="w-5 h-5 accent-[var(--color-primary)] cursor-pointer flex-shrink-0"
            :title="`Pilih ${s.nama} untuk ekspor batch`"
          />
          <button
            @click="pilihSantri(s)"
            class="flex-1 min-w-0 text-left flex items-center gap-3 cursor-pointer"
          >
          <div
            class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 dark:from-emerald-700 to-emerald-600 dark:to-emerald-800 flex items-center justify-center text-white font-bold text-sm"
          >
            {{ (s.nama || '?').charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)] truncate">
              {{ s.nama }}
              <span
                v-if="getRapors(s).length > 1"
                class="ml-1 text-[9px] bg-cyan-100 text-cyan-800 px-1.5 py-0.5 rounded font-bold align-middle"
                :title="`Santri ini punya ${getRapors(s).length} rapor`"
              >
                <i class="fas fa-layer-group mr-0.5"></i>
                {{ getRapors(s).length }} rapor
              </span>
            </p>
            <p class="text-[10px] text-[var(--text-secondary)] truncate">
              <span class="font-bold">{{ (kategori === 'diniyah' ? s.lembaga_sekolah : s.lembaga) || '-' }}</span>
              · Kelas {{ (kategori === 'diniyah' ? s.kelas_sekolah : s.kelas) || '-' }}
              <span v-if="s.nis" class="ml-1">· NIS {{ s.nis }}</span>
              <span v-if="s.is_mukim" class="ml-1 text-teal-600 font-bold">· MUKIM</span>
            </p>
          </div>
          <i class="fas fa-chevron-right text-[var(--text-tertiary)] text-xs"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- ===== STEP 4: Detail Rapor (printable) ===== -->
    <div v-else-if="view === 'detail'" class="space-y-4">
      <div
        class="no-print bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-2">
            <button
              v-if="!isSantri"
              @click="kembaliSantri"
              class="text-xs font-bold px-2 py-1.5 rounded-lg bg-[var(--bg-muted)] hover:bg-slate-200 dark:hover:bg-slate-600 transition cursor-pointer"
              title="Kembali"
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <h2 class="text-base md:text-lg font-black text-[var(--text-primary)]">
              <i
                :class="[
                  'fas',
                  kategori === 'qiraati'
                    ? 'fa-mosque text-emerald-600'
                    : 'fa-book-open text-cyan-600',
                  'mr-1'
                ]"
              ></i>
              {{ santriAktif?.nama }} · {{ lembaga }} · {{ tahunAjaran }} {{ semester }}
            </h2>
          </div>
          <div v-if="santriAktif && !isSantri" class="flex items-center gap-2 flex-wrap">
            <button
              v-if="!editMode"
              @click="startEdit"
              class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition cursor-pointer"
            >
              <i class="fas fa-pen-to-square"></i>Isi / Edit Rapor
            </button>
            <template v-else>
              <button
                @click="simpanRapor"
                :disabled="savingRapor"
                class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
              >
                <i :class="['fas', savingRapor ? 'fa-spinner fa-spin' : 'fa-save']"></i>{{ savingRapor ? 'Menyimpan...' : 'Simpan' }}
              </button>
              <button
                @click="cancelEdit"
                class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                Batal
              </button>
            </template>
            <button
              @click="exportPdfSingle()"
              aria-label="Ekspor rapor PDF santri ini"
              class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer"
            >
              <i class="fas fa-file-pdf"></i>Ekspor PDF
            </button>
          </div>
          <!-- v.86.0526: santri = view-only (tanpa ekspor PDF) -->
          <span
            v-else-if="santriAktif && isSantri"
            class="h-9 px-3 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-tertiary)]"
          >
            <i class="fas fa-eye"></i>Hanya lihat
          </span>
        </div>

        <!-- Rapor lain (kumulatif lintas lembaga) -->
        <div
          v-if="santriAktif && raporLain.length > 0"
          class="mt-2 pt-2 border-t border-[var(--border-subtle)] flex items-center gap-2 flex-wrap"
        >
          <span class="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            <i class="fas fa-layer-group mr-1 text-cyan-600"></i>Rapor lain:
          </span>
          <button
            v-for="r in raporLain"
            :key="r.lembaga"
            @click="switchRapor(r)"
            class="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 transition cursor-pointer"
          >
            <i :class="['fas', r.jenis === 'qiraati' ? 'fa-mosque' : 'fa-book-open', 'mr-1']"></i>
            {{ r.lembaga }} ({{ r.jenis === 'qiraati' ? 'Qiraati' : 'Diniyah' }})
          </button>
        </div>
      </div>

      <!-- ===== Editor Nilai (no-print) ===== -->
      <div
        v-if="editMode && santriAktif"
        class="no-print bg-amber-50 dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-amber-200 dark:border-slate-700 shadow-sm space-y-4"
      >
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <h3 class="text-sm font-black text-amber-900 dark:text-amber-200">
            <i class="fas fa-pen-to-square mr-1"></i>Isi / Edit Nilai Rapor
          </h3>
          <span class="text-[11px] text-amber-700 dark:text-amber-300">
            Predikat &amp; rata-rata otomatis. Tgl khotam terisi dari menu Kenaikan (bisa diubah).
          </span>
        </div>

        <div v-for="g in editGroups" :key="g.title" class="space-y-2">
          <h4 class="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide border-b border-amber-200 dark:border-slate-600 pb-1">
            {{ g.title }}
          </h4>
          <div
            v-for="(row, ri) in g.rows"
            :key="ri"
            class="rounded-lg bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-700 p-2"
          >
            <div class="text-[11px] font-bold text-[var(--text-secondary)] mb-1">{{ row.label }}</div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <label v-for="f in row.fields" :key="f.key" class="flex flex-col gap-0.5">
                <span class="text-[10px] text-[var(--text-tertiary)]">{{ f.label }}</span>
                <input
                  v-if="f.type === 'auto'"
                  :value="f.autoVal == null ? '-' : f.autoVal"
                  readonly
                  title="Otomatis dari rekap bulanan"
                  class="text-xs px-2 py-1 border border-[var(--border-default)] rounded bg-[var(--bg-muted)] text-[var(--text-secondary)] cursor-not-allowed"
                />
                <input
                  v-else
                  :type="f.type === 'date' ? 'date' : f.type === 'number' ? 'number' : 'text'"
                  v-model="draft.data_nilai[f.key]"
                  :placeholder="f.placeholder || ''"
                  class="text-xs px-2 py-1 border border-[var(--border-default)] rounded bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
                />
              </label>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-lg bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-700 p-2">
            <div class="text-xs font-bold mb-1 text-[var(--text-primary)]">Absensi (Hari)</div>
            <div class="grid grid-cols-3 gap-2">
              <label class="flex flex-col gap-0.5">
                <span class="text-[10px] text-[var(--text-tertiary)]">Sakit</span>
                <input type="number" min="0" v-model="draft.absensi.sakit" class="text-xs px-2 py-1 border border-[var(--border-default)] rounded bg-[var(--bg-card-elevated)] text-[var(--text-primary)]" />
              </label>
              <label class="flex flex-col gap-0.5">
                <span class="text-[10px] text-[var(--text-tertiary)]">Izin</span>
                <input type="number" min="0" v-model="draft.absensi.izin" class="text-xs px-2 py-1 border border-[var(--border-default)] rounded bg-[var(--bg-card-elevated)] text-[var(--text-primary)]" />
              </label>
              <label class="flex flex-col gap-0.5">
                <span class="text-[10px] text-[var(--text-tertiary)]">Alpa</span>
                <input type="number" min="0" v-model="draft.absensi.alpa" class="text-xs px-2 py-1 border border-[var(--border-default)] rounded bg-[var(--bg-card-elevated)] text-[var(--text-primary)]" />
              </label>
            </div>
          </div>
          <div class="rounded-lg bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-700 p-2">
            <div class="text-xs font-bold mb-1 text-[var(--text-primary)]">Nilai Kepribadian</div>
            <div class="grid grid-cols-3 gap-2">
              <label v-for="k in ['kelakuan', 'kerajinan', 'kebersihan']" :key="k" class="flex flex-col gap-0.5">
                <span class="text-[10px] text-[var(--text-tertiary)] capitalize">{{ k }}</span>
                <select v-model="draft.kepribadian[k]" class="text-xs px-1 py-1 border border-[var(--border-default)] rounded bg-[var(--bg-card-elevated)] text-[var(--text-primary)]">
                  <option>Baik</option>
                  <option>Cukup</option>
                  <option>Perlu Perhatian</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-700 p-2">
          <div class="text-xs font-bold mb-1 text-[var(--text-primary)]">Catatan untuk Santri / Orang Tua</div>
          <textarea
            v-model="draft.catatan"
            rows="2"
            class="w-full text-xs px-2 py-1 border border-[var(--border-default)] rounded bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          ></textarea>
        </div>

        <div class="flex items-center gap-2 justify-end">
          <button @click="cancelEdit" class="h-9 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer">
            Batal
          </button>
          <button
            @click="simpanRapor"
            :disabled="savingRapor"
            class="h-9 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold cursor-pointer"
          >
            <i :class="['fas', savingRapor ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>{{ savingRapor ? 'Menyimpan...' : 'Simpan Rapor' }}
          </button>
        </div>
      </div>

      <!-- ===== Print Area ===== -->
      <div
        v-if="santriAktif"
        id="rapor-print-area"
        class="bg-[var(--bg-card)] text-slate-900 rounded-2xl border border-[var(--border-subtle)] shadow-sm p-8 print:shadow-none print:border-0 print:rounded-none print:p-6 relative overflow-hidden"
        style="font-family: 'Times New Roman', Times, serif"
      >
        <!-- Background watermark (per lembaga) -->
        <div
          v-if="bgRapor"
          aria-hidden="true"
          class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          style="z-index: 0"
        >
          <img
            :src="bgRapor"
            alt=""
            style="
              width: 50%;
              height: auto;
              opacity: 0.1;
              object-fit: contain;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            "
          />
        </div>

        <div class="relative" style="z-index: 1">
          <!-- KOP: per-lembaga uniform line 1, drop shift di line 2 untuk TPQ -->
          <table class="w-full border-b-2 border-black pb-1.5 mb-2">
            <tr>
              <td class="w-[95px] text-center align-middle">
                <img
                  v-if="logoKiri"
                  :src="logoKiri"
                  class="inline-block w-[85px] h-[85px] object-contain"
                  alt="Logo kiri"
                />
              </td>
              <td class="text-center align-middle px-2 py-0.5">
                <div v-if="kop.line1" class="text-[14px] font-normal uppercase leading-tight">
                  {{ kop.line1 }}
                </div>
                <div v-if="kop.line2" class="text-[22px] font-bold uppercase leading-tight">
                  {{ kop.line2 }}
                </div>
                <div v-if="kop.line3" class="text-[12px] font-normal leading-tight text-[var(--text-primary)]">
                  {{ titleCase(kop.line3) }}
                </div>
                <div v-if="kop.line4" class="text-[12px] font-normal leading-tight text-[var(--text-primary)]">
                  {{ (kop.line4 || '').toLowerCase() }}
                </div>
              </td>
              <td class="w-[95px] text-center align-middle">
                <img
                  v-if="logoKanan"
                  :src="logoKanan"
                  class="inline-block w-[85px] h-[85px] object-contain"
                  alt="Logo kanan"
                />
              </td>
            </tr>
          </table>

          <!-- Judul -->
          <h2 class="text-center text-[13px] font-bold underline my-2.5 leading-snug">
            SURAT KETERANGAN HASIL PENDIDIKAN
          </h2>

          <!-- Identitas: kiri rata kiri (Nama/NISN/NIS), kanan rata kanan (Kelas/Semester/Tahun) -->
          <div class="flex items-start text-[11px] mb-2">
            <table class="w-[55%]">
              <tbody>
                <tr><td class="w-[90px] py-0.5 align-top">Nama Santri</td><td class="w-[10px] py-0.5">:</td><td class="py-0.5 font-bold">{{ santriAktif.nama }}</td></tr>
                <tr><td class="py-0.5">NISN</td><td class="py-0.5">:</td><td class="py-0.5">{{ santriAktif.nisn || '-' }}</td></tr>
                <tr><td class="py-0.5">NIS</td><td class="py-0.5">:</td><td class="py-0.5">{{ santriAktif.nis || '-' }}</td></tr>
              </tbody>
            </table>
            <table class="w-[45%]">
              <tbody>
                <tr><td class="w-[100px] py-0.5 align-top">Kelas</td><td class="w-[10px] py-0.5">:</td><td class="py-0.5 font-bold">{{ kelasGabungan }}</td></tr>
                <tr><td class="py-0.5">Semester</td><td class="py-0.5">:</td><td class="py-0.5">{{ semester }}</td></tr>
                <tr><td class="py-0.5">Tahun Ajaran</td><td class="py-0.5">:</td><td class="py-0.5">{{ tahunAjaran }}</td></tr>
              </tbody>
            </table>
          </div>

          <!-- ===== Body Layout A: Pra PTPT (perLevel, 5 levels, Lvl 5 punya I-XI) ===== -->
          <div v-if="schema.perLevel" class="mt-3">
            <table class="w-full border-collapse text-[9px] leading-snug">
              <thead class="bg-slate-200">
                <tr>
                  <th class="border border-black px-1 py-1.5 w-[30px] align-middle">Kelas</th>
                  <th class="border border-black px-1 py-1.5 w-[55px] align-middle">Level Baca</th>
                  <th class="border border-black px-1 py-1.5 text-left align-middle">
                    Target Khotam
                  </th>
                  <th class="border border-black px-1 py-1.5 w-[65px] align-middle">Tgl Khotam</th>
                  <th
                    v-for="f in fieldsNilai"
                    :key="f.id"
                    class="border border-black px-1 py-1.5 align-middle"
                  >
                    {{ f.label }}
                  </th>
                  <th class="border border-black px-1 py-1.5 w-[55px] align-middle">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(lvl, lvlIdx) in schema.levels || []" :key="lvl.id">
                  <tr v-for="(kh, khIdx) in lvl.khotamList || []" :key="kh.id">
                    <td
                      v-if="khIdx === 0"
                      :rowspan="(lvl.khotamList || []).length"
                      class="border border-black px-1 py-1.5 text-center font-bold align-middle"
                    >
                      {{ lvlIdx + 1 }}
                    </td>
                    <td
                      v-if="khIdx === 0"
                      :rowspan="(lvl.khotamList || []).length"
                      class="border border-black px-1 py-1.5 text-center align-middle"
                    >
                      {{ lvl.levelBaca || lvl.label || '' }}
                    </td>
                    <td class="border border-black px-1 py-1.5 align-middle">
                      {{ kh.labelKhotam || kh.id }} ({{ kh.multiplier || 2 }}x)
                    </td>
                    <td class="border border-black px-1 py-1.5 text-center align-middle">
                      {{ fmtDate(getNilai(`pra__${lvl.id}__${kh.id}__tgl_khotam`)) }}
                    </td>
                    <td
                      v-for="f in fieldsNilai"
                      :key="f.id"
                      class="border border-black px-1 py-1.5 text-center align-middle"
                    >
                      {{ getNilai(`pra__${lvl.id}__${kh.id}__${f.id}`) || '' }}
                    </td>
                    <td class="border border-black px-1 py-1.5 text-center font-bold align-middle">
                      {{ fmtNumber(sumPra(lvl.id, kh.id)) }}
                    </td>
                  </tr>
                </template>
              </tbody>
              <tfoot>
                <tr class="bg-[var(--bg-muted)]">
                  <td colspan="3" class="border border-black px-1 py-1 font-bold text-left">
                    Jumlah Khotam
                  </td>
                  <td
                    :colspan="fieldsNilai.length + 2"
                    class="border border-black px-1 py-1 text-center font-bold"
                  >
                    {{ totalKhotam }} Khotam
                  </td>
                </tr>
                <tr class="bg-cyan-50">
                  <td
                    :colspan="fieldsNilai.length + 4"
                    class="border border-black px-1 py-1 font-bold text-left"
                  >
                    Total Jumlah
                  </td>
                  <td class="border border-black px-1 py-1 text-center font-bold">
                    {{ fmtNumber(totalJumlah) }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- ===== Body Layout B: Diniyah (perKelas, mapel by jenjang) ===== -->
          <div v-else-if="schema.perKelas" class="mt-3">
            <div
              v-if="!jenjangAktif"
              class="text-[11px] italic text-[var(--text-secondary)] border border-dashed border-[var(--border-default)] rounded p-3 text-center"
            >
              Jenjang "{{ santriAktif.kelas_sekolah || '-' }}" belum dikonfigurasi schema-nya.
            </div>
            <table v-else class="w-full border-collapse text-[11px]">
              <thead class="bg-cyan-100">
                <tr>
                  <th class="border border-black px-2 py-1.5 w-[32px]">NO</th>
                  <th class="border border-black px-2 py-1.5 text-left">MATA PELAJARAN</th>
                  <th class="border border-black px-2 py-1.5 w-[40px]">KKM</th>
                  <th class="border border-black px-1 py-1.5 w-[78px] leading-tight">RATA-RATA SUMATIF</th>
                  <th class="border border-black px-1 py-1.5 w-[78px] leading-tight">SUMATIF AKHIR SEMESTER</th>
                  <th class="border border-black px-2 py-1.5 w-[84px]">PREDIKAT</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(mp, idx) in jenjangAktif.mapel || []" :key="mp.id || idx" style="height: 34px">
                  <td class="border border-black px-2 py-2.5 text-center font-bold">{{ idx + 1 }}</td>
                  <td class="border border-black px-2 py-2.5 font-bold">{{ mp.nama }}</td>
                  <td class="border border-black px-2 py-2.5 text-center">{{ mp.kkm || 75 }}</td>
                  <td class="border border-black px-2 py-2.5 text-center">{{ fmtNumber(nilaiSumatif(mp)) }}</td>
                  <td class="border border-black px-2 py-2.5 text-center">
                    {{ getNilai(`dn__${santriAktif.kelas_sekolah}__${mp.id || slug(mp.nama)}__akhir`) || '-' }}
                  </td>
                  <td
                    class="border border-black px-2 py-2.5 text-center"
                    lang="ar"
                    dir="rtl"
                    :style="arStyleMd"
                  >
                    {{ predikatDiniyahMapel(mp) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ===== Body Layout C2: PPPH (perKitab, 4 level kitab Hadits) ===== -->
          <div v-else-if="schema.perKitab" class="mt-3">
            <table class="w-full border-collapse text-[10px] md:text-[11px]">
              <thead class="bg-[var(--bg-muted)]">
                <tr>
                  <th class="border border-slate-500 px-1.5 py-1 align-middle w-[44px]">Level</th>
                  <th class="border border-slate-500 px-1.5 py-1 text-left align-middle">Kitab</th>
                  <th class="border border-slate-500 px-1.5 py-1 align-middle w-[72px]">Tgl Khotam</th>
                  <th
                    v-for="f in fieldsNilai"
                    :key="f.id"
                    class="border border-slate-500 px-1.5 py-1 align-middle"
                  >
                    {{ f.label }}
                  </th>
                  <th class="border border-slate-500 px-1.5 py-1 align-middle w-[80px]">Predikat</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(lvl, i) in schema.levels || []" :key="lvl.id">
                  <td class="border border-slate-500 px-1.5 py-1 text-center font-bold">
                    {{ i + 1 }}
                  </td>
                  <td class="border border-slate-500 px-1.5 py-1 font-bold">
                    {{ lvl.kitab || lvl.label }}
                  </td>
                  <td class="border border-slate-500 px-1.5 py-1 text-center">
                    {{ fmtDate(getNilai(`ppph__${lvl.id}__tgl_khotam`)) }}
                  </td>
                  <td
                    v-for="f in fieldsNilai"
                    :key="f.id"
                    class="border border-slate-500 px-1.5 py-1 text-center"
                  >
                    {{ getNilai(`ppph__${lvl.id}__${f.id}`) || '' }}
                  </td>
                  <td
                    class="border border-slate-500 px-1.5 py-1 text-center"
                    lang="ar"
                    dir="rtl"
                    :style="arStyleMd"
                  >
                    {{ predikatPpph(lvl.id) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ===== Body Layout C: PTPT/PPPH (tableLayout=kelasJuz, auto-compact 5-step density) ===== -->
          <div
            v-else-if="schema.tableLayout === 'kelasJuz' && (schema.rows || []).length"
            class="overflow-x-auto"
          >
            <div class="text-[11px] font-bold text-[var(--text-secondary)] mb-1 px-1">
              <i class="fas fa-info-circle text-cyan-500 mr-1"></i>
              <span class="text-emerald-700">KUMULATIF</span>
              — {{ kelasJuzRows.length }} baris (Kelas 1 s/d {{ santriAktif?.kelas || '—' }})
            </div>
            <table
              class="border-collapse text-[10px] md:text-[11px] w-full min-w-[600px] table-fixed"
            >
              <thead class="bg-[var(--bg-muted)]">
                <tr>
                  <th rowspan="2" class="border border-slate-500 px-1.5 py-1 align-middle">
                    Kelas
                  </th>
                  <th rowspan="2" class="border border-slate-500 px-1.5 py-1 align-middle">Juz</th>
                  <template v-for="(h, idx) in flatHeaderRow1" :key="idx">
                    <th
                      v-if="h.group"
                      :colspan="h.span"
                      class="border border-slate-500 px-1.5 py-1"
                    >
                      {{ h.group }}
                    </th>
                    <th v-else rowspan="2" class="border border-slate-500 px-1.5 py-1 align-middle">
                      {{ h.label }}
                    </th>
                  </template>
                </tr>
                <tr>
                  <th
                    v-for="f in flatGroupedFields"
                    :key="f.id"
                    class="border border-slate-500 px-1.5 py-1"
                  >
                    {{ f.label }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rIdx) in kelasJuzRows" :key="rIdx">
                  <td
                    v-if="isKelasFirst(rIdx)"
                    :rowspan="kelasRowspan(rIdx)"
                    class="border border-slate-500 px-1.5 py-1 text-center font-black bg-[var(--bg-card-elevated)] align-middle"
                  >
                    {{ row.kelas }}
                  </td>
                  <td class="border border-slate-500 px-1.5 py-1 text-center font-bold">
                    {{ row.juz }}
                  </td>
                  <td
                    v-for="f in schema.fields || []"
                    :key="f.id"
                    class="border border-slate-500 px-1.5 py-1 text-center"
                    :lang="f.id === 'predikat' ? 'ar' : null"
                    :dir="f.id === 'predikat' ? 'rtl' : null"
                    :style="f.id === 'predikat' ? arStyleSm : null"
                  >
                    {{ getNilaiKelasJuz(row, f) }}
                  </td>
                </tr>
                <tr v-if="kelasJuzRows.length === 0">
                  <td
                    :colspan="2 + (schema.fields || []).length"
                    class="border border-[var(--border-default)] px-2 py-3 text-center text-[var(--text-tertiary)] italic text-[11px]"
                  >
                    Tidak ada baris untuk kelas santri ini. Cek field <code>kelas</code> di data
                    santri.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ===== Body Layout D: TPQ (sections: jilid/imtas/khotaman) ===== -->
          <div v-else-if="(schema.sections || []).length > 0">
            <div v-for="sec in schema.sections || []" :key="sec.id" class="mt-3">
              <div
                class="text-center font-bold bg-[var(--bg-muted)] border border-slate-500 px-2 py-1 text-[11px] uppercase"
              >
                {{ sec.title }}
              </div>
              <table
                v-if="sec.rows && sec.rows.length > 0"
                class="w-full border-collapse text-[10px]"
              >
                <thead class="bg-[var(--bg-muted)]">
                  <tr v-if="hasGroup(sec)">
                    <th rowspan="2" class="border border-slate-500 px-1 py-1 w-[50px] align-middle">
                      {{ rowLabel(sec) }}
                    </th>
                    <template v-for="(h, hIdx) in headerRow1(sec)" :key="hIdx">
                      <th
                        v-if="h.group"
                        :colspan="h.span"
                        class="border border-slate-500 px-1 py-1"
                      >
                        {{ h.group }}
                      </th>
                      <th v-else rowspan="2" class="border border-slate-500 px-1 py-1 align-middle">
                        {{ h.label }}
                      </th>
                    </template>
                  </tr>
                  <tr v-if="hasGroup(sec)">
                    <th
                      v-for="f in groupedFields(sec)"
                      :key="f.id"
                      class="border border-slate-500 px-1 py-1"
                    >
                      {{ f.label }}
                    </th>
                  </tr>
                  <tr v-else>
                    <th class="border border-slate-500 px-1 py-1 w-[50px]">{{ rowLabel(sec) }}</th>
                    <th
                      v-for="f in sec.fields"
                      :key="f.id"
                      class="border border-slate-500 px-1 py-1"
                    >
                      {{ f.label }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in sec.rows" :key="row">
                    <td class="border border-slate-500 px-1 py-1 w-[50px]">{{ row }}</td>
                    <td
                      v-for="f in sec.fields"
                      :key="f.id"
                      class="border border-slate-500 px-1 py-1 text-center"
                      :lang="f.id === 'predikat' ? 'ar' : null"
                      :dir="f.id === 'predikat' ? 'rtl' : null"
                      :style="f.id === 'predikat' ? arStyleSm : null"
                    >
                      {{ getSectionValue(sec.id, row, f) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table v-else class="w-full border-collapse text-[10px]">
                <thead class="bg-[var(--bg-muted)]">
                  <tr>
                    <th
                      v-for="f in sec.fields"
                      :key="f.id"
                      class="border border-slate-500 px-1 py-1"
                    >
                      {{ f.label }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      v-for="f in sec.fields"
                      :key="f.id"
                      class="border border-slate-500 px-1 py-1 text-center"
                      :lang="f.id === 'predikat' ? 'ar' : null"
                      :dir="f.id === 'predikat' ? 'rtl' : null"
                      :style="f.id === 'predikat' ? arStyleSm : null"
                    >
                      {{ getSectionValue(sec.id, null, f) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Fallback: schema belum dikonfigurasi -->
          <div
            v-else
            class="text-[11px] italic text-[var(--text-secondary)] my-3 border border-dashed border-[var(--border-default)] rounded p-3 text-center"
          >
            Schema rapor untuk lembaga "{{ santriAktif.lembaga }}" belum dikonfigurasi. Setup di
            Pengaturan Web &gt; Schema Rapor.
          </div>

          <!-- Rata-rata Nilai -->
          <table class="w-full border-collapse text-[11px] mt-3">
            <tr>
              <td
                class="border border-slate-500 px-1.5 py-1 bg-[var(--bg-muted)] font-bold text-center"
                style="width: 60%"
              >
                Rata-rata Nilai
              </td>
              <td class="border border-slate-500 px-1.5 py-1 text-center font-bold">
                {{ Number(rataRata).toFixed(2) }}
              </td>
            </tr>
          </table>

          <!-- Absensi + Kepribadian -->
          <table class="w-full text-[10px] mt-2">
            <tr>
              <td class="align-top w-1/2 pr-3">
                <p class="font-bold mb-1">ABSENSI :</p>
                <p class="my-0.5">1. Sakit : {{ absensi.sakit || 0 }} Hari</p>
                <p class="my-0.5">2. Izin : {{ absensi.izin || 0 }} Hari</p>
                <p class="my-0.5">3. Alpa : {{ absensi.alpa || 0 }} Hari</p>
              </td>
              <td class="align-top w-1/2 pl-10">
                <p class="font-bold mb-1">NILAI KEPRIBADIAN</p>
                <p v-for="kp in kepribadianRows" :key="kp.label" class="my-0.5">
                  {{ kp.label }} :
                  <span v-for="(opt, i) in KEPRIBADIAN_OPTS" :key="opt"
                    ><span :class="kp.val === opt ? 'font-bold' : 'line-through text-slate-400'">{{ opt }}</span
                    ><span v-if="i < KEPRIBADIAN_OPTS.length - 1"> / </span></span
                  >
                </p>
              </td>
            </tr>
          </table>

          <!-- Catatan -->
          <div class="border border-slate-500 p-1.5 mt-2 text-[10px] min-h-[18mm]">
            <p class="font-bold mb-1">Catatan untuk santri / orang tua :</p>
            <p class="m-0 whitespace-pre-line">{{ catatanRapor }}</p>
          </div>

          <!-- Tanda Tangan (samakan dengan PDF) -->
          <div class="mt-8 text-[10px]">
            <table class="ml-auto mb-5 text-[10px]" style="width: auto">
              <tr>
                <td class="pr-2 text-right">Dikeluarkan di</td>
                <td class="pr-1">:</td>
                <td class="text-left">{{ kotaRapor }}</td>
              </tr>
              <tr>
                <td class="pr-2 text-right">Pada Tanggal</td>
                <td class="pr-1">:</td>
                <td class="text-left">{{ tglCetak }}</td>
              </tr>
            </table>
            <table class="w-full text-center">
              <tr>
                <td class="w-1/3">Wali Santri</td>
                <td class="w-1/3">{{ kategori === 'diniyah' ? 'Wali Kelas' : 'Guru Kelas' }}</td>
                <td class="w-1/3">{{ jabatanKepala }}</td>
              </tr>
              <tr style="height: 56px; vertical-align: bottom">
                <td></td>
                <td>
                  <img
                    v-if="ttdGuru"
                    :src="ttdGuru"
                    alt=""
                    style="display: inline-block; max-width: 120px; max-height: 56px; object-fit: contain"
                  />
                </td>
                <td>
                  <img
                    v-if="ttdKepala"
                    :src="ttdKepala"
                    alt=""
                    style="display: inline-block; max-width: 120px; max-height: 56px; object-fit: contain"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span class="font-bold">{{
                    santriAktif?.wali || santriAktif?.nama_wali || '________________'
                  }}</span>
                </td>
                <td>
                  <span class="font-bold">{{
                    namaGuru && namaGuru !== '-' ? namaGuru : '________________'
                  }}</span>
                </td>
                <td>
                  <span class="font-bold">{{ namaKepala || '________________' }}</span>
                </td>
              </tr>
              <tr class="text-[9px] text-[var(--text-secondary)]">
                <td></td>
                <td>{{ ekgqGuru || '' }}</td>
                <td>{{ ekgqKepala || '' }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, unref, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { subscribeColl } from '@/services/firestore'
import { useSantri } from '@/composables/useSantri'
import { useLembaga, lembagaScopeMatches } from '@/composables/useLembaga'
import { useGuru } from '@/composables/useGuru'
import { useToast } from '@/composables/useToast'
import { useSettingsStore } from '@/stores/settings'
import { useAuthStore } from '@/stores/auth'
import UiActionCard from '@/components/ui/UiActionCard.vue'
import { generateRaporPdf } from '@/utils/raporPdf'
// v.90.0626: util jenjang Diniyah (SDI/SMP/SMA) — sumber tunggal, samakan dg Rekap Diniyah
import { kelasJenjang, mapelDiniyahFor, diniyahJenjang, jenjangFromKelas } from '@/utils/jenjang'
import { predikatQiraati, predikatDiniyah } from '@/utils/predikat'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'

const toast = useToast()
const route = useRoute()

// Real-time rapor docs (1 doc per santri+lembaga+periode)
const raporDocs = ref([])
const rekapDiniyahDocs = ref([])
const absNgajiDocs = ref([])
const absSekolahDocs = ref([])
const _unsubsRapor = []
onMounted(() => {
  _unsubsRapor.push(subscribeColl('rapor_semester', (docs) => { raporDocs.value = docs || [] }))
  _unsubsRapor.push(subscribeColl('rekap_diniyah', (docs) => { rekapDiniyahDocs.value = docs || [] }))
  _unsubsRapor.push(subscribeColl('absensi_santri_ngaji_bulanan', (docs) => { absNgajiDocs.value = docs || [] }))
  _unsubsRapor.push(subscribeColl('absensi_santri_sekolah_bulanan', (docs) => { absSekolahDocs.value = docs || [] }))
})
onUnmounted(() => {
  _unsubsRapor.forEach((u) => { try { u() } catch (e) {} })
})

const { santriRaw, getRapors } = useSantri()
const { lembagaRaw } = useLembaga()
const { guruRaw } = useGuru()
import { isFullFilterRole, isKepalaLembaga } from '@/utils/roleScope'
import { sortSantri } from '@/utils/santriSort'
const settingsStore = useSettingsStore()
const authStore = useAuthStore()

// Role-based view restrictions
// Full filter (pilih lembaga) = admin/super_admin. admin_keuangan + guru/user = guru mode.
const isFullFilter = computed(() => isFullFilterRole(authStore.sesiAktif))
// v.86.0526: Kepala/PJ (role guru, bukan admin) discope ke lembaganya di view rapor.
const kepalaScope = computed(() => {
  const s = authStore.sesiAktif
  if (!s || s.role === 'admin' || s.id === 'admin') return null
  return isKepalaLembaga(s) ? (s.lembaga || null) : null
})
const isGuruOnly = computed(() => {
  const s = authStore.sesiAktif
  if (!s || s.role === 'santri') return false
  return !isFullFilter.value
})
const isSantri = computed(() => authStore.sesiAktif?.role === 'santri')

// Navigation state machine: picker -> lembaga -> santri -> detail
const view = ref('picker')
const kategori = ref('') // 'qiraati' | 'diniyah'
const lembaga = ref('') // 'TPQ Pagi' | 'TPQ Sore' | 'Pra PTPT' | 'PTPT' | 'PPPH' | 'SDI' | 'PKBM' | ...
const santriId = ref(isSantri.value ? String(authStore.sesiAktif?.id || '') : '')
const filterKelas = ref('')
const jenjangFilter = ref('') // '' | 'SMP' | 'SMA' - split PKBM, samakan picker dg Rekap Diniyah
const search = ref('')

// N5: santri/wali — auto-buka rapor sendiri tanpa picker (langsung view 'detail')
watch(santriRaw, (list) => {
  if (!isSantri.value || view.value === 'detail') return
  const me = (list || []).find((s) => String(s.id) === String(authStore.sesiAktif?.id || ''))
  if (!me) return
  const raps = getRapors(me)
  if (!raps || raps.length === 0) return
  kategori.value = raps[0].jenis
  lembaga.value = raps[0].lembaga
  santriId.value = String(me.id)
  view.value = 'detail'
}, { immediate: true })

// v.21.109.0527: TPQ Pagi DIHAPUS dari rapor — kebijakan: TPQ Pagi tidak
// menerbitkan rapor. Sisa 4 lembaga Qiraati: TPQ Sore, Pra PTPT, PTPT, PPPH.
const QIRAATI_LEMBAGA = [
  {
    id: 'TPQ Sore',
    label: 'TPQ Sore',
    subtitle: "Taman Pendidikan Al-Qur'an",
    icon: 'fa-mosque',
    gradient: 'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900'
  },
  {
    id: 'Pra PTPT',
    label: 'Pra PTPT',
    subtitle: 'Pra Tahfizh',
    icon: 'fa-book-quran',
    gradient: 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900'
  },
  {
    id: 'PTPT',
    label: 'PTPT',
    subtitle: 'Pasca TPQ Program Tahfizh',
    icon: 'fa-book-quran',
    gradient: 'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900'
  },
  {
    id: 'PPPH',
    label: 'PPPH',
    subtitle: 'Pasca PTPT Program Hadits',
    icon: 'fa-book-bookmark',
    gradient: 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900'
  }
]

const now = new Date()
const tahunAjaran = ref(`${now.getFullYear()}-${now.getFullYear() + 1}`)
const semester = ref(now.getMonth() < 6 ? 'Genap' : 'Ganjil')

const TAHUN_AJARAN_OPTS = computed(() => {
  const y = now.getFullYear()
  return [`${y - 1}-${y}`, `${y}-${y + 1}`, `${y + 1}-${y + 2}`]
})

// ===== Santri filtered for current lembaga + shift =====
const santriList = computed(() => {
  // v.86.0526 FIX PRIVACY: role santri/wali HANYA boleh lihat dirinya sendiri.
  //   Sebelumnya santri melihat seluruh roster lembaga (bocor data semua santri).
  if (isSantri.value) {
    const myId = String(authStore.sesiAktif?.id || '')
    return santriRaw.value.filter((s) => String(s.id) === myId)
  }
  const lmb = String(lembaga.value || '')
    .toLowerCase()
    .trim()
  // Guru mode: tampilkan santri yang diampu (tanpa wajib pilih lembaga)
  const guruMode = isGuruOnly.value
  if (!lmb && !guruMode) return []
  let list = santriRaw.value.filter((s) => s.aktif !== false)
  // v.86.0526: guard Kepala/PJ — hanya santri lembaganya (lintas-lembaga di-block walau pilih lembaga lain).
  if (kepalaScope.value) {
    list = list.filter((s) => lembagaScopeMatches(kepalaScope.value, s.lembaga) || lembagaScopeMatches(kepalaScope.value, s.lembaga_sekolah))
  }
  if (guruMode && !lmb) {
    // filter berdasarkan kepemilikan sesuai kategori
    const sesiNama = String(authStore.sesiAktif?.nama || '').toLowerCase().trim()
    const sesiGuru = String(authStore.sesiAktif?.guru || '').toLowerCase().trim()
    list = list.filter((s) => {
      if (kategori.value === 'qiraati') {
        const names = [s.guru, s.guru_pagi, s.guru_sore].filter(Boolean).map((g) => String(g).toLowerCase().trim())
        return names.includes(sesiNama) || names.includes(sesiGuru)
      } else {
        const arr = Array.isArray(s.guru_sekolah) ? s.guru_sekolah.map((g) => String(g || '').toLowerCase().trim()) : []
        return arr.includes(sesiNama) || arr.includes(sesiGuru)
      }
    })
    if (filterKelas.value) list = list.filter((s) => String(s.kelas || s.kelas_sekolah || '') === filterKelas.value)
    if (search.value.trim()) {
      const kw = search.value.trim().toLowerCase()
      list = list.filter((s) => String(s.nama || '').toLowerCase().includes(kw))
    }
    const lf = kategori.value === 'qiraati' ? 'lembaga' : 'lembaga_sekolah'
    const kf = kategori.value === 'qiraati' ? 'kelas' : 'kelas_sekolah'
    return sortSantri(list, { lembagaField: lf, kelasField: kf })
  }

  if (kategori.value === 'qiraati') {
    // v.21.109.0527: TPQ Pagi tidak punya rapor — return kosong defensif
    if (lmb === 'tpq pagi') {
      return []
    }
    if (lmb === 'tpq sore') {
      list = list.filter((s) => {
        const l = String(s.lembaga || '').toLowerCase().trim()
        const sh = String(s.shift || '').toLowerCase().trim()
        return (l === 'tpq' && sh === 'sore') || l === lmb
      })
    } else if (lmb === 'pra ptpt') {
      list = list.filter((s) => {
        const l = String(s.lembaga || '')
          .toLowerCase()
          .trim()
        return l === 'pra ptpt' || l === 'pra-ptpt' || l === 'pra_ptpt'
      })
    } else if (lmb === 'ppph') {
      // P3H is alias for PPPH
      list = list.filter((s) => {
        const l = String(s.lembaga || '')
          .toLowerCase()
          .trim()
        return l === 'ppph' || l === 'p3h'
      })
    } else {
      list = list.filter(
        (s) =>
          String(s.lembaga || '')
            .toLowerCase()
            .trim() === lmb
      )
    }
  } else {
    // v.21.112.0527: TK tidak menerbitkan rapor (kebijakan kyai)
    if (lmb === 'tk') {
      return []
    }
    // diniyah: prefer lembaga_sekolah, fallback to lembaga
    list = list.filter((s) => {
      const ls = String(s.lembaga_sekolah || '')
        .toLowerCase()
        .trim()
      const lb = String(s.lembaga || '')
        .toLowerCase()
        .trim()
      return ls === lmb || (!ls && lb === lmb)
    })
    // v.90.0626: PKBM dipisah jenjang SMP (VII-IX) / SMA (X-XII)
    if (jenjangFilter.value) {
      list = list.filter((s) => kelasJenjang(s.kelas_sekolah || s.kelas) === jenjangFilter.value)
    }
  }

  // Guru-only: limit to santri yang guru-nya = sesi aktif
  if (isGuruOnly.value) {
    const sesiId = String(authStore.sesiAktif?.id || '').toLowerCase()
    const sesiNama = String(authStore.sesiAktif?.nama || '')
      .toLowerCase()
      .trim()
    list = list.filter((s) => {
      const guruNames = [s.guru, s.guru_pagi, s.guru_sore]
        .flat()
        .filter(Boolean)
        .map((g) => String(g).toLowerCase().trim())
      const guruIds = [s.guru_id, s.guru_pagi_id, s.guru_sore_id]
        .filter(Boolean)
        .map((g) => String(g).toLowerCase())
      return guruNames.includes(sesiNama) || guruIds.includes(sesiId)
    })
  }

  if (filterKelas.value) {
    list = list.filter((s) => {
      const kv = kategori.value === 'qiraati' ? s.kelas : (s.kelas_sekolah || s.kelas)
      return String(kv || '') === filterKelas.value
    })
  }
  if (search.value.trim()) {
    const kw = search.value.trim().toLowerCase()
    list = list.filter((s) =>
      String(s.nama || '')
        .toLowerCase()
        .includes(kw)
    )
  }

  const lf = kategori.value === 'qiraati' ? 'lembaga' : 'lembaga_sekolah'
  const kf = kategori.value === 'qiraati' ? 'kelas' : 'kelas_sekolah'
  return sortSantri(list, { lembagaField: lf, kelasField: kf })
})

// v.90.0626: kelasJenjang dipindah ke utils/jenjang.js (dipakai bareng Rekap Diniyah)

const kelasOptions = computed(() => {
  const lmb = String(lembaga.value || '')
    .toLowerCase()
    .trim()
  const set = new Set()
  santriRaw.value.forEach((s) => {
    const lb = String(s.lembaga || '')
      .toLowerCase()
      .trim()
    const ls = String(s.lembaga_sekolah || '')
      .toLowerCase()
      .trim()
    const match = kategori.value === 'qiraati' ? lb === lmb : ls === lmb || (!ls && lb === lmb)
    // v.90.0626: diniyah pakai kelas_sekolah (samakan dg Rekap); PKBM dibatasi jenjang aktif
    const kls = kategori.value === 'qiraati' ? s.kelas : (s.kelas_sekolah || s.kelas)
    if (match && kls && (!jenjangFilter.value || kelasJenjang(kls) === jenjangFilter.value)) set.add(String(kls))
  })
  return [...set].sort()
})

// v.21.85: Multi-select state untuk batch PDF
const selectedSantriIds = ref(new Set())
const exportingBatch = ref(false)

const santriAktif = computed(
  () => santriRaw.value.find((s) => String(s.id) === String(santriId.value)) || null
)

// Rapor lain (lintas lembaga) untuk santri yang sama
const raporLain = computed(() => {
  if (!santriAktif.value) return []
  const arr = getRapors(santriAktif.value) || []
  const lmb = String(lembaga.value || '')
    .toLowerCase()
    .trim()
  return arr.filter(
    (r) =>
      String(r.lembaga || '')
        .toLowerCase()
        .trim() !== lmb
  )
})

function switchRapor(r) {
  kategori.value = r.jenis
  lembaga.value = r.lembaga
  view.value = 'detail'
}

// ===== KOP per-lembaga (uniform line 1, TPQ drop shift di line 2) =====
const kop = computed(() => {
  const s = settingsStore.settings || {}
  let lmbObj = {}
  if (santriAktif.value) {
    // v.90.0626: Diniyah pakai KOP lembaga SEKOLAH (lembaga_sekolah), bukan lembaga ngaji
    const lnorm = String(
      kategori.value === 'diniyah'
        ? santriAktif.value.lembaga_sekolah || ''
        : santriAktif.value.lembaga || ''
    )
      .toLowerCase()
      .trim()
    lmbObj =
      (lembagaRaw.value || []).find(
        (l) =>
          String(l.lembaga || '')
            .toLowerCase()
            .trim() === lnorm
      ) || {}
  }
  return {
    line1: lmbObj.kop_line1 || s.kopLine1 || '',
    line2: lmbObj.kop_line2 || s.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM',
    line3: lmbObj.kop_line3 || s.kopLine3 || '',
    line4: lmbObj.kop_line4 || s.kopLine4 || '',
    pengasuh: s.namaPengasuh || ''
  }
})

const tglCetak = computed(() =>
  new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date()
  )
)

// Kelas gabungan: "Kelas Sekolah / Kelas Qiraati" (mis. "VII / PTPT 4", "TK A / Pra PTPT 3").
const kelasGabungan = computed(() => {
  const s = santriAktif.value
  if (!s) return '-'
  const sekolah = String(s.kelas_sekolah || '').trim()
  const _lembG = String(s.lembaga || '').trim()
  // v.98.0626: Pra PTPT -> level saja tanpa prefix "Pra PTPT" (parity dgn PDF)
  const ngaji = _lembG === 'Pra PTPT'
    ? String(s.kelas || '').trim()
    : [_lembG, String(s.kelas || '').trim()].filter(Boolean).join(' ').trim()
  const parts = [sekolah, ngaji].filter(Boolean)
  return parts.length ? parts.join(' / ') : '-'
})

// Style aksara Arab untuk kolom predikat (tampilan layar).
const arStyleSm = { fontFamily: "'Traditional Arabic','Amiri','Scheherazade New',serif", fontSize: '14px' }
const arStyleMd = { fontFamily: "'Traditional Arabic','Amiri','Scheherazade New',serif", fontSize: '15px' }

const logoKiri = computed(() => {
  const s = settingsStore.settings || {}
  return kategori.value === 'diniyah'
    ? s.logoKop || s.logoUrl || '/logo.png'
    : s.logoQiraati || '/logo.png'
})

const logoKanan = computed(() => {
  if (!santriAktif.value) return ''
  const lnorm = String(
    kategori.value === 'diniyah'
      ? santriAktif.value.lembaga_sekolah || ''
      : santriAktif.value.lembaga || ''
  )
    .toLowerCase()
    .trim()
  const lmbObj =
    (lembagaRaw.value || []).find(
      (l) =>
        String(l.lembaga || '')
          .toLowerCase()
          .trim() === lnorm
    ) || {}
  return lmbObj.kop_logo || settingsStore.settings?.logoKop || settingsStore.settings?.logoUrl || '/logo.png'
})

function titleCase(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

const bgRapor = computed(() => {
  const s = settingsStore.settings || {}
  return kategori.value === 'diniyah' ? s.bgRaporDiniyah || '' : s.bgRaporTPQ || ''
})

// ===== Tanda tangan (fallback chain: tanda_tangan -> ttd_url -> ttd) =====
const ttdGuru = computed(() => {
  const nama = namaGuru.value
  if (!nama || nama === '-') return ''
  const g = (guruRaw.value || []).find(
    (x) => String(x.nama || '').toLowerCase() === String(nama).toLowerCase()
  )
  return g?.tanda_tangan || g?.ttd_url || g?.ttd || ''
})

const ttdKepala = computed(() => {
  const nk = namaKepala.value
  const g = nk ? (guruRaw.value || []).find((x) => x.nama === nk) : null
  return g?.tanda_tangan || g?.ttd_url || g?.ttd || ''
})

// ===== Schema fields untuk Pra PTPT =====
const FIELDS_NILAI_DEFAULT = [
  { id: 'fashohah', label: 'Fashohah' },
  { id: 'tartil', label: 'Tartil' },
  { id: 'tahfizh_juz_30', label: 'Tahfizh Juz 30' },
  { id: 'ghorib', label: 'Ghorib' },
  { id: 'tajwid', label: 'Tajwid' },
  { id: 'doa_harian', label: 'Doa Harian' }
]

// ===== Schema builder per lembaga =====
function buildSchema(lembagaName) {
  const lmb = String(lembagaName || '')
    .toLowerCase()
    .trim()

  // Pra PTPT (P3H alias): 5 levels, level 5 has Khotam I-XI (multiplier 3)
  if (lmb === 'pra ptpt' || lmb === 'p3h') {
    const khotam2x = [
      { id: 'kh_I', labelKhotam: 'Khotam I', multiplier: 2 },
      { id: 'kh_II', labelKhotam: 'Khotam II', multiplier: 2 },
      { id: 'kh_III', labelKhotam: 'Khotam III', multiplier: 2 }
    ]
    const khotam3x = [
      { id: 'kh_I', labelKhotam: 'Khotam I', multiplier: 3 },
      { id: 'kh_II', labelKhotam: 'Khotam II', multiplier: 3 },
      { id: 'kh_III', labelKhotam: 'Khotam III', multiplier: 3 }
    ]
    const khotamLvl5 = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'].map(
      (rom) => ({
        id: `kh_${rom}`,
        labelKhotam: `Khotam ${rom}`,
        multiplier: 3
      })
    )
    return {
      perLevel: true,
      fieldsNilai: FIELDS_NILAI_DEFAULT,
      levels: [
        {
          id: 'lvl_1',
          label: 'Level 1',
          levelBaca: '½ Juz',
          targetKhotam: '½ Juz',
          khotamList: khotam2x
        },
        {
          id: 'lvl_2',
          label: 'Level 2',
          levelBaca: '1 Juz',
          targetKhotam: '1 Juz',
          khotamList: khotam2x
        },
        {
          id: 'lvl_3',
          label: 'Level 3',
          levelBaca: '1½ Juz',
          targetKhotam: '1½ Juz',
          khotamList: khotam2x
        },
        {
          id: 'lvl_4',
          label: 'Level 4',
          levelBaca: '2 Juz',
          targetKhotam: '2 Juz',
          khotamList: khotam3x
        },
        {
          id: 'lvl_5',
          label: 'Level 5',
          levelBaca: '3 Juz',
          targetKhotam: '3 Juz',
          khotamList: khotamLvl5
        }
      ]
    }
  }

  // PTPT: tableLayout kelasJuz, KUMULATIF up to santri kelas (Adab dihapus; Tgl Khotam auto).
  if (lmb === 'ptpt') {
    const fields = [
      { id: 'tgl_khotam', label: 'Tgl Khotam', type: 'date' },
      { id: 'istimror', label: 'Istimror', type: 'number', group: 'Kualitas Hafalan' },
      { id: 'kelancaran', label: 'Kelancaran', type: 'number', group: 'Kualitas Hafalan' },
      { id: 'fashohah', label: 'Fashohah', type: 'number', group: 'Kualitas Bacaan' },
      { id: 'tajwid', label: 'Tajwid', type: 'number', group: 'Kualitas Bacaan' },
      { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
    ]
    const rows = []
    for (let k = 1; k <= 6; k++) {
      const juzStart = (k - 1) * 5 + 1
      for (let j = juzStart; j <= juzStart + 4; j++)
        rows.push({ kelas: 'Kelas ' + k, juz: 'Juz ' + j })
    }
    return { tableLayout: 'kelasJuz', fields, rows }
  }

  // PPPH (Pasca PTPT Program Hadits): 4 level kitab. Tgl Khotam (auto) + aspek + Predikat.
  if (lmb === 'ppph' || lmb === 'p3h') {
    return {
      perKitab: true,
      fieldsNilai: [
        { id: 'hafalan', label: 'Hafalan' },
        { id: 'pemahaman', label: 'Pemahaman' },
        { id: 'kelancaran', label: 'Kelancaran' }
      ],
      levels: [
        { id: 'lvl_1', label: 'Level 1', kitab: "Arba'in Nawawi" },
        { id: 'lvl_2', label: 'Level 2', kitab: 'Riyadhus Shalihin' },
        { id: 'lvl_3', label: 'Level 3', kitab: 'Shahih Bukhari' },
        { id: 'lvl_4', label: 'Level 4', kitab: 'Shahih Muslim' }
      ]
    }
  }

  // TPQ (Pagi/Sore = same schema): sections jilid + IMTAS + Khotaman
  if (lmb === 'tpq' || lmb === 'tpq pagi' || lmb === 'tpq sore') {
    return {
      sections: [
        {
          id: 'jilid',
          title: 'Jilid',
          rows: ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B'],
          fields: [
            { id: 'tgl_khotam', label: 'Tanggal Khotam Jilid', type: 'date' },
            { id: 'doa_harian', label: 'Doa Harian', type: 'text', group: 'Materi Tambahan' },
            {
              id: 'surat_pendek',
              label: 'Surat-Surat Pendek',
              type: 'text',
              group: 'Materi Tambahan'
            },
            { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
          ]
        },
        {
          id: 'imtas',
          title: 'Kelas Persiapan IMTAS',
          rows: [],
          fields: [
            { id: 'fashohah', label: 'Fashohah', type: 'number' },
            { id: 'tartil', label: 'Tartil', type: 'number' },
            { id: 'ghorib', label: 'Ghorib', type: 'number' },
            { id: 'tajwid', label: 'Tajwid', type: 'number' },
            { id: 'doa_harian', label: 'Doa Harian', type: 'text', group: 'Materi Tambahan' },
            {
              id: 'surat_pendek',
              label: 'Surat-Surat Pendek',
              type: 'text',
              group: 'Materi Tambahan'
            },
            { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
          ]
        },
        {
          id: 'khotaman',
          title: 'Kelas Persiapan Khotaman',
          rows: [],
          fields: [
            { id: 'tgl_imtas', label: 'Tanggal IMTAS', type: 'date' },
            { id: 'fashohah', label: 'Fashohah', type: 'number' },
            { id: 'tartil', label: 'Tartil', type: 'number' },
            { id: 'ghorib', label: 'Ghorib', type: 'number' },
            { id: 'tajwid', label: 'Tajwid', type: 'number' },
            { id: 'doa_harian', label: 'Doa Harian', type: 'text', group: 'Materi Tambahan' },
            {
              id: 'surat_pendek',
              label: 'Surat-Surat Pendek',
              type: 'text',
              group: 'Materi Tambahan'
            },
            { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
          ]
        }
      ]
    }
  }

  // Diniyah default: perKelas with jenjang I/II
  return {
    perKelas: true,
    jenjang: [
      {
        kelas: 'I',
        mapel: [
          { id: 'tauhid', nama: 'TAUHID', kkm: 80 },
          { id: 'fiqih', nama: 'FIQIH', kkm: 80 },
          { id: 'akhlaq', nama: 'AKHLAQ', kkm: 80 }
        ]
      },
      {
        kelas: 'II',
        mapel: [
          { id: 'tauhid', nama: 'TAUHID', kkm: 80 },
          { id: 'fiqih', nama: 'FIQIH', kkm: 80 },
          { id: 'akhlaq', nama: 'AKHLAQ', kkm: 80 },
          { id: 'tarikh', nama: 'TARIKH', kkm: 80 }
        ]
      }
    ]
  }
}

// v.90.0626: Rapor Diniyah -> kolom mapel dibangun dari setting per-jenjang (SDI/SMP/SMA)
//   di settings.rekapDiniyahMapel. Sumber tunggal yang sama dengan Rekap Diniyah & Pengaturan.
// Default mapel Diniyah per jenjang (dipakai bila settings.rekapDiniyahMapel kosong).
const DINIYAH_MAPEL_DEFAULT = {
  SDI: ['Tauhid', 'Fiqh', 'Tarikh', 'Akhlaq', 'Bahasa Arab', 'Tahajji', 'Praktek Ibadah', 'ASWAJA & ke-NU-an'],
  SMP: ['Tauhid', 'Fiqh', 'Akhlaq', 'Nahwu', 'Shorof', 'Khot/Pego', 'Tasawwuf', 'ASWAJA & ke-NU-an'],
  SMA: ['Akhlaq/Ulumul Qur’an', 'Nahwu', 'Fiqh', 'Ushul Fiqh', 'Faroidl', 'Tasawwuf', 'Ilmu Falak', 'ASWAJA & ke-NU-an']
}
const DINIYAH_KKM_DEFAULT = 75

function _mapelDiniyahResolved(kelas, jenjang) {
  const all = settingsStore.settings?.rekapDiniyahMapel || {}
  const isEmpty = (v) => v == null || v === '' || (Array.isArray(v) && v.length === 0)
  let raw = all[String(kelas || '').trim()]
  if (isEmpty(raw) && jenjang) raw = all[jenjang]
  if (isEmpty(raw) && (jenjang === 'SMP' || jenjang === 'SMA')) raw = all['PKBM']
  const list = (Array.isArray(raw) ? raw : String(raw || '').split(','))
    .map((x) => String(x).trim())
    .filter(Boolean)
  if (list.length) return list
  return DINIYAH_MAPEL_DEFAULT[jenjang] || DINIYAH_MAPEL_DEFAULT.SDI
}

function buildDiniyahSchemaFromSetting(s) {
  const kelas = String(s?.kelas_sekolah || '')
  const jenjang = diniyahJenjang(s?.lembaga_sekolah, kelas) || jenjangFromKelas(kelas) || 'SDI'
  const names = _mapelDiniyahResolved(kelas, jenjang)
  const kkmArr = (settingsStore.settings?.rekapDiniyahKKM || {})[kelas] || []
  return {
    perKelas: true,
    jenjang: [
      {
        kelas,
        mapel: names.map((n, i) => ({
          id: slug(n),
          nama: String(n).toUpperCase(),
          kkm: Number(kkmArr[i]) || DINIYAH_KKM_DEFAULT
        }))
      }
    ]
  }
}

// Hapus paksa kolom Adab dari skema apa pun (override lama maupun default).
function stripAdabSchema(sc) {
  if (!sc || typeof sc !== 'object') return sc
  const out = JSON.parse(JSON.stringify(sc))
  const noAdab = (arr) => (Array.isArray(arr) ? arr.filter((f) => f && f.id !== 'adab') : arr)
  const fixPred = (arr) => {
    if (Array.isArray(arr))
      arr.forEach((f) => {
        if (f && f.type === 'auto_predikat' && f.source === 'adab') f.source = 'avg'
      })
  }
  if (Array.isArray(out.fields)) {
    out.fields = noAdab(out.fields)
    fixPred(out.fields)
  }
  if (Array.isArray(out.fieldsNilai)) out.fieldsNilai = noAdab(out.fieldsNilai)
  if (Array.isArray(out.sections)) {
    out.sections.forEach((sec) => {
      if (Array.isArray(sec.fields)) {
        sec.fields = noAdab(sec.fields)
        fixPred(sec.fields)
      }
    })
  }
  return out
}

// schema = override dari settings.raporSchemas kalau ada, else default builder (Adab di-strip)
const _schemaRaw = computed(() => {
  if (!santriAktif.value) return {}
  // Diniyah: pakai mapel per-jenjang dari setting (lepas dari schema lembaga ngaji)
  if (kategori.value === 'diniyah') {
    return buildDiniyahSchemaFromSetting(santriAktif.value)
  }
  const lmb = santriAktif.value.lembaga || ''
  const overrides = settingsStore.settings?.raporSchemas || {}
  const lnorm = String(lmb).toLowerCase().trim()
  let found = null
  const keys = Object.keys(overrides)

  // TPQ Pagi/Sore -> match "tpq" override
  if (lnorm === 'tpq pagi' || lnorm === 'tpq sore') {
    const k = keys.find((kk) => String(kk).toLowerCase().trim() === 'tpq')
    if (k) found = overrides[k]
  }
  if (!found) {
    const k = keys.find((kk) => String(kk).toLowerCase().trim() === lnorm)
    if (k) found = overrides[k]
  }

  if (found && Object.keys(found).length > 0) {
    // Special case: PTPT/PPPH override with perKelas+juz mapel -> rebuild kelasJuz
    const isTahfizh = lnorm === 'ptpt' || lnorm === 'ppph' || lnorm === 'p3h'
    const overrideHasJuzMapel =
      found.perKelas &&
      Array.isArray(found.jenjang) &&
      found.jenjang.some(
        (j) =>
          Array.isArray(j.mapel) && j.mapel.some((m) => /juz/i.test(String(m.id || m.nama || '')))
      )
    // Migrasi override LAMA: PTPT ber-Adab / tanpa Tgl Khotam, PPPH non-perKitab -> default baru.
    const ptptStale =
      lnorm === 'ptpt' &&
      found.tableLayout === 'kelasJuz' &&
      ((found.fields || []).some((f) => f.id === 'adab') ||
        !(found.fields || []).some((f) => f.id === 'tgl_khotam'))
    const ppphStale = (lnorm === 'ppph' || lnorm === 'p3h') && !found.perKitab
    if ((isTahfizh && overrideHasJuzMapel) || ptptStale || ppphStale) return buildSchema(lmb)
    return found
  }
  return buildSchema(kategori.value === 'diniyah' ? 'diniyah' : lmb)
})
const schema = computed(() => stripAdabSchema(_schemaRaw.value))

const sections = computed(() => (Array.isArray(schema.value.sections) ? schema.value.sections : []))
const fieldsNilai = computed(() =>
  Array.isArray(schema.value.fieldsNilai) && schema.value.fieldsNilai.length
    ? schema.value.fieldsNilai
    : FIELDS_NILAI_DEFAULT
)
const jenjangAktif = computed(() => {
  if (!schema.value.perKelas || !santriAktif.value) return null
  const k = santriAktif.value.kelas_sekolah || ''
  return (
    (schema.value.jenjang || []).find((j) => j.kelas === k) ||
    (schema.value.jenjang || [])[0] ||
    null
  )
})

// ===== Section helpers (TPQ tables) =====
function hasGroup(sec) {
  return Array.isArray(sec?.fields) && sec.fields.some((f) => f && f.group)
}
function headerRow1(sec) {
  const out = []
  const fields = sec?.fields || []
  let i = 0
  while (i < fields.length) {
    const f = fields[i]
    if (f.group) {
      let span = 1
      let j = i + 1
      while (j < fields.length && fields[j].group === f.group) {
        span++
        j++
      }
      out.push({ group: f.group, span })
      i = j
    } else {
      out.push({ label: f.label })
      i++
    }
  }
  return out
}
function rowLabel(sec) {
  const id = String(sec?.id || '').toLowerCase()
  if (id === 'jilid') return 'Jilid'
  if (id === 'imtas' || id === 'khotaman') return 'Periode'
  if (id.startsWith('kelas_')) return 'Kelas'
  return sec?.title || 'Item'
}
function groupedFields(sec) {
  return (sec?.fields || []).filter((f) => f && f.group)
}

// ===== Rapor doc lookup by santri+lembaga+periode =====
const raporDoc = computed(() => {
  if (!santriAktif.value) return null
  const periodKey = `${tahunAjaran.value}_${semester.value}`.replace(/[^a-zA-Z0-9_]/g, '_')
  const lmbKey = kategori.value === 'diniyah' ? 'Diniyah' : santriAktif.value.lembaga || ''
  const docId = `rapor_${santriAktif.value.id}_${lmbKey}_${periodKey}`
  return raporDocs.value.find((r) => r.id === docId) || null
})

const absensi = computed(() => {
  const a = raporDoc.value?.absensi
  if (a && (a.sakit || a.izin || a.alpa || a.hadir || a._generatedFrom)) return a
  return absensiBulananSum()
})
const kepribadian = computed(
  () => raporDoc.value?.kepribadian || { kelakuan: 'Baik', kerajinan: 'Baik', kebersihan: 'Baik' }
)
const catatanRapor = computed(() => raporDoc.value?.catatan || '')

// Samakan tampilan layar dengan PDF (kepribadian coret pilihan, kota TTD).
const KEPRIBADIAN_OPTS = ['Baik', 'Cukup', 'Perlu Perhatian']
const kotaRapor = computed(() => settingsStore.settings?.kota || 'Sidoarjo')
const kepribadianRows = computed(() => [
  { label: 'Kelakuan', val: kepribadian.value?.kelakuan || 'Baik' },
  { label: 'Kerajinan', val: kepribadian.value?.kerajinan || 'Baik' },
  { label: 'Kebersihan', val: kepribadian.value?.kebersihan || 'Baik' }
])

// ===== Rata-rata =====
const rataRata = computed(() => {
  const fromDoc = raporDoc.value?.rata_rata
  if (fromDoc && Number(fromDoc) > 0) return fromDoc
  if (schema.value.perKelas && jenjangAktif.value) {
    let sum = 0
    let n = 0
    ;(jenjangAktif.value.mapel || []).forEach((mp) => {
      const v = nilaiDiniyah(mp)
      if (v != null && v > 0) {
        sum += v
        n++
      }
    })
    return n > 0 ? sum / n : 0
  }
  return (schema.value.perLevel && rataPraTotal.value) || 0
})

// ===== Kartu kenaikan fallback for tgl_khotam =====
function tglKhotamFromKenaikan(lvlId, khId) {
  const s = santriAktif.value
  if (!s?.kartu_kenaikan) return ''
  const lmb = s.lembaga || ''
  const kk = s.kartu_kenaikan || {}
  let scope = kk[lmb]
  if (!scope) {
    const k = Object.keys(kk).find(
      (kk2) => String(kk2).toLowerCase().trim() === String(lmb).toLowerCase().trim()
    )
    scope = k ? kk[k] : null
  }
  if (!scope || typeof scope !== 'object') return ''
  const lvlObj = scope[lvlId] || scope[String(lvlId).toLowerCase()] || {}
  if (typeof lvlObj !== 'object') return ''
  if (lvlObj[khId]) return lvlObj[khId]
  if (lvlObj.ceremonial) return lvlObj.ceremonial
  const entries = Array.isArray(lvlObj.entries) ? lvlObj.entries : []
  const match = entries.find((e) => e?.itemId === khId && e?.tanggal)
  if (match) return match.tanggal
  const any = entries.find((e) => e?.tanggal)
  return any?.tanggal || ''
}

// PTPT: tgl khotam per Juz dari kartu kenaikan (kelas_K -> juz_N).
function getTglKhotamPtpt(juzNum) {
  const s = santriAktif.value
  if (!s?.kartu_kenaikan || !juzNum) return ''
  const kk = s.kartu_kenaikan
  let scope = kk['PTPT']
  if (!scope) {
    const k = Object.keys(kk).find((x) => String(x).toLowerCase().trim() === 'ptpt')
    scope = k ? kk[k] : null
  }
  if (!scope || typeof scope !== 'object') return ''
  const n = parseInt(juzNum, 10)
  const itemId = 'juz_' + n
  const tryObj = (o) => {
    if (!o || typeof o !== 'object') return ''
    if (o[itemId]) return o[itemId]
    const es = Array.isArray(o.entries) ? o.entries : []
    const m = es.find((e) => e?.itemId === itemId && e?.tanggal)
    return m ? m.tanggal : ''
  }
  const direct = tryObj(scope['kelas_' + Math.ceil(n / 5)])
  if (direct) return direct
  for (const kkey of Object.keys(scope)) {
    const v = tryObj(scope[kkey])
    if (v) return v
  }
  return ''
}

function getNilai(key) {
  const stored = raporDoc.value?.data_nilai?.[key]
  if (stored !== undefined && stored !== null && stored !== '') return stored
  // tgl_khotam auto-fill dari kartu kenaikan (kalau belum diisi manual di editor)
  if (key && key.endsWith('__tgl_khotam')) {
    const parts = key.split('__')
    if (parts[0] === 'kj' && parts.length === 3) {
      return getTglKhotamPtpt(String(parts[1]).match(/\d+/)?.[0])
    }
    if (parts.length === 4) return tglKhotamFromKenaikan(parts[1], parts[2])
    if (parts.length === 3) return tglKhotamFromKenaikan(parts[1], '')
  }
  return stored
}

function fmtDate(v) {
  if (!v) return ''
  try {
    return new Date(v).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } catch {
    return String(v)
  }
}

function slug(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
}

// ===== Auto-fill: Rata-rata Sumatif (rekap bulanan) + Absensi (absensi bulanan) =====
function mapelKeyRekap(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9]/g, '_')
}
// Bulan-bulan satu semester. Ganjil: Jul-Des (tahun awal); Genap: Jan-Jun (tahun akhir).
function semesterPeriodes(sep) {
  const yrs = String(tahunAjaran.value || '').split('-').map((x) => parseInt(x, 10))
  const startY = yrs[0] || new Date().getFullYear()
  const endY = yrs[1] || startY + 1
  const ganjil = String(semester.value).toLowerCase() === 'ganjil'
  const year = ganjil ? startY : endY
  const months = ganjil ? [7, 8, 9, 10, 11, 12] : [1, 2, 3, 4, 5, 6]
  return months.map((m) => `${year}${sep}${String(m).padStart(2, '0')}`)
}
// Rata-rata nilai bulanan satu mapel (koleksi rekap_diniyah) selama satu semester.
function rataSumatifBulananFor(s, mapelNama) {
  if (!s) return null
  const key = mapelKeyRekap(mapelNama)
  const vals = []
  for (const pk of semesterPeriodes('_')) {
    const d = rekapDiniyahDocs.value.find((r) => r.id === `diniyah_${s.id}_${pk}`)
    const v = Number(d?.data?.[key])
    if (!isNaN(v) && v > 0) vals.push(v)
  }
  if (!vals.length) return null
  return Math.round((vals.reduce((a, v) => a + v, 0) / vals.length) * 10) / 10
}
function rataSumatifBulanan(mp) {
  return rataSumatifBulananFor(santriAktif.value, mp.nama)
}
// Jumlah sakit/izin/alpa bulanan selama satu semester (ngaji utk Qiraati, sekolah utk Diniyah).
function absensiBulananSumFor(s, isDiniyah) {
  const out = { sakit: 0, izin: 0, alpa: 0 }
  if (!s) return out
  const src = isDiniyah ? absSekolahDocs.value : absNgajiDocs.value
  for (const pr of semesterPeriodes('-')) {
    const d = src.find((a) => a.id === `${s.id}_${pr}`)
    if (!d) continue
    out.sakit += Number(d.sakit) || 0
    out.izin += Number(d.izin) || 0
    out.alpa += Number(d.alpa) || 0
  }
  return out
}
function absensiBulananSum() {
  return absensiBulananSumFor(santriAktif.value, kategori.value === 'diniyah')
}

// ===== Predikat (skala kyai: Mumtaz/Jayyid/Maqbul/Rasib, aksara Arab) =====
// Qiraati (TPQ/Pra PTPT/PTPT/PPPH) band tetap; Diniyah relatif KKM (tabel Diniyah).
function predikat(n) {
  return predikatQiraati(n, settingsStore.settings?.predikatScale).ar || ''
}

// PPPH: predikat per level dari rata-rata aspek (hafalan/pemahaman/kelancaran).
function predikatPpph(lvlId) {
  const nilai = raporDoc.value?.data_nilai || {}
  let sum = 0
  let n = 0
  ;(schema.value.fieldsNilai || []).forEach((f) => {
    const v = Number(nilai[`ppph__${lvlId}__${f.id}`])
    if (!isNaN(v) && v > 0) {
      sum += v
      n++
    }
  })
  return n > 0 ? predikatQiraati(sum / n, settingsStore.settings?.predikatScale).ar : ''
}

// Rata-rata Sumatif: nilai tersimpan kalau ada, kalau tidak auto dari rekap bulanan.
function nilaiSumatif(mp) {
  const nilai = raporDoc.value?.data_nilai || {}
  const kls = santriAktif.value?.kelas_sekolah || ''
  const mid = mp.id || slug(mp.nama)
  const stored = nilai[`dn__${kls}__${mid}__sumatif`]
  if (stored !== undefined && stored !== null && stored !== '') return Number(stored)
  return rataSumatifBulanan(mp)
}
// Nilai akhir mapel = rata-rata (Rata-rata Sumatif & Sumatif Akhir Semester) -> dasar predikat.
function nilaiDiniyah(mp) {
  const nilai = raporDoc.value?.data_nilai || {}
  const kls = santriAktif.value?.kelas_sekolah || ''
  const mid = mp.id || slug(mp.nama)
  const sm = nilaiSumatif(mp)
  const ak = Number(nilai[`dn__${kls}__${mid}__akhir`])
  const arr = [sm, ak].filter((v) => v != null && !isNaN(v) && v > 0)
  if (!arr.length) return null
  return arr.reduce((a, v) => a + v, 0) / arr.length
}
function predikatDiniyahMapel(mp) {
  const v = nilaiDiniyah(mp)
  if (v == null) return ''
  return predikatDiniyah(v, Number(mp.kkm) || 75, settingsStore.settings?.predikatScale).ar
}

// ===== Pra PTPT helpers =====
function avgPra(lvlId, khId) {
  const nilai = raporDoc.value?.data_nilai || {}
  let sum = 0
  let n = 0
  fieldsNilai.value.forEach((f) => {
    const v = Number(nilai[`pra__${lvlId}__${khId}__${f.id}`])
    if (!isNaN(v) && v > 0) {
      sum += v
      n++
    }
  })
  return n > 0 ? sum / n : null
}
function sumPra(lvlId, khId) {
  const nilai = raporDoc.value?.data_nilai || {}
  let sum = 0
  let any = false
  fieldsNilai.value.forEach((f) => {
    const v = Number(nilai[`pra__${lvlId}__${khId}__${f.id}`])
    if (!isNaN(v) && v > 0) {
      sum += v
      any = true
    }
  })
  return any ? sum : null
}
function fmtNumber(v) {
  return v == null || isNaN(v) ? '-' : String(Math.round(Number(v)))
}

const rataPraTotal = computed(() => {
  const arr = []
  ;(schema.value.levels || []).forEach((lvl) => {
    ;(lvl.khotamList || []).forEach((kh) => {
      const a = avgPra(lvl.id, kh.id)
      if (a !== null) arr.push(a)
    })
  })
  return arr.length === 0 ? null : arr.reduce((s, v) => s + v, 0) / arr.length
})
const totalJumlah = computed(() => {
  let sum = 0
  let any = false
  ;(schema.value.levels || []).forEach((lvl) => {
    ;(lvl.khotamList || []).forEach((kh) => {
      const s = sumPra(lvl.id, kh.id)
      if (s !== null) {
        sum += s
        any = true
      }
    })
  })
  return any ? sum : null
})
const totalKhotam = computed(() => {
  let n = 0
  ;(schema.value.levels || []).forEach((lvl) => {
    ;(lvl.khotamList || []).forEach((kh) => {
      if (avgPra(lvl.id, kh.id) !== null) n++
    })
  })
  return n
})

// ===== Section value (TPQ) =====
function getSectionValue(sectionId, row, field) {
  const nilai = raporDoc.value?.data_nilai || {}
  const key = row ? `${sectionId}__${row}__${field.id}` : `${sectionId}__${field.id}`
  let v = nilai[key]

  if (field.type === 'auto_predikat') {
    if (field.source === 'avg') {
      const numFields = (sections.value.find((sec) => sec.id === sectionId)?.fields || []).filter(
        (f) => f.type === 'number'
      )
      let sum = 0
      let n = 0
      numFields.forEach((nf) => {
        const k = row ? `${sectionId}__${row}__${nf.id}` : `${sectionId}__${nf.id}`
        const vv = Number(nilai[k] || 0)
        if (!isNaN(vv) && vv > 0) {
          sum += vv
          n++
        }
      })
      return n > 0 ? predikat(sum / n) : '-'
    }
    if (field.source) {
      const k = row ? `${sectionId}__${row}__${field.source}` : `${sectionId}__${field.source}`
      const vv = Number(nilai[k] || 0)
      return vv > 0 ? predikat(vv) : '-'
    }
    return '-'
  }

  if (field.type === 'date') {
    if (!v && row) {
      const fromKk = tglKhotamFromKenaikan(row, field.id)
      if (fromKk) v = fromKk
    }
    if (v) {
      try {
        return new Date(v).toLocaleDateString('id-ID')
      } catch {
        return v
      }
    }
  }
  return v == null || v === '' ? '' : String(v)
}

// ===== KelasJuz (PTPT/PPPH) helpers =====
function flatKey(row) {
  return `flat__${slug(row.kelas)}__${slug(row.juz)}`
}
function getNilaiKelasJuz(row, field) {
  if (!row || !field) return '-'
  const juzNum = String(row.juz).match(/\d+/)?.[0]
  const base = `kj__juz_${juzNum}`
  const nilai = raporDoc.value?.data_nilai || {}
  if (field.type === 'auto_predikat') {
    const numFields = (schema.value.fields || []).filter((f) => f.type === 'number')
    let sum = 0
    let n = 0
    numFields.forEach((nf) => {
      const vv = Number(nilai[`${base}__${nf.id}`] || 0)
      if (!isNaN(vv) && vv > 0) {
        sum += vv
        n++
      }
    })
    return n > 0 ? predikatQiraati(sum / n, settingsStore.settings?.predikatScale).ar : ''
  }
  if (field.type === 'date' || field.id === 'tgl_khotam') {
    return fmtDate(getNilai(`${base}__tgl_khotam`))
  }
  const v = nilai[`${base}__${field.id}`]
  return v == null || v === '' ? '' : String(v)
}

const flatHeaderRow1 = computed(() => {
  const fields = schema.value.fields || []
  const out = []
  let i = 0
  while (i < fields.length) {
    const f = fields[i]
    if (f.group) {
      let span = 1
      let j = i + 1
      while (j < fields.length && fields[j].group === f.group) {
        span++
        j++
      }
      out.push({ group: f.group, span })
      i = j
    } else {
      out.push({ label: f.label })
      i++
    }
  }
  return out
})
const flatGroupedFields = computed(() => (schema.value.fields || []).filter((f) => f && f.group))

function kelasNum(v) {
  const m = String(v || '').match(/(\d+)/)
  return m ? parseInt(m[1], 10) : 0
}

// KUMULATIF: only show rows up to santri's kelas
const kelasJuzRows = computed(() => {
  if (schema.value.tableLayout !== 'kelasJuz') return []
  const rows = schema.value.rows || []
  const s = santriAktif.value
  if (!s) return rows
  const maxK = kelasNum(s.kelas) || kelasNum(s.kelas_sekolah)
  if (!maxK) return rows
  return rows.filter((r) => {
    const n = kelasNum(r.kelas)
    return n > 0 && n <= maxK
  })
})

// rowspan map for kelas merging
const kelasRowspanMap = computed(() => {
  const rows = kelasJuzRows.value || []
  const map = {}
  let i = 0
  while (i < rows.length) {
    let j = i
    while (j < rows.length && rows[j].kelas === rows[i].kelas) j++
    map[i] = { isFirst: true, rowspan: j - i }
    for (let k = i + 1; k < j; k++) map[k] = { isFirst: false, rowspan: 0 }
    i = j
  }
  return map
})

function isKelasFirst(idx) {
  return kelasRowspanMap.value[idx]?.isFirst === true
}
function kelasRowspan(idx) {
  return kelasRowspanMap.value[idx]?.rowspan || 1
}

// ===== Kepala/guru info for tanda tangan =====
const namaKepala = computed(() => {
  const s = santriAktif.value
  if (!s) return settingsStore.settings?.namaPengasuh || ''
  const lnorm = String(kategori.value === 'diniyah' ? s.lembaga_sekolah || '' : s.lembaga || '')
    .toLowerCase()
    .trim()
  const lmbObj =
    (lembagaRaw.value || []).find(
      (l) =>
        String(l.lembaga || '')
          .toLowerCase()
          .trim() === lnorm
    ) || {}
  return (
    lmbObj.kepala_lembaga ||
    lmbObj.kepala_sekolah ||
    lmbObj.kepala ||
    settingsStore.settings?.namaPengasuh ||
    ''
  )
})

const jabatanKepala = computed(() => {
  const s = santriAktif.value
  if (!s) return 'Kepala'
  const lnorm = String(kategori.value === 'diniyah' ? s.lembaga_sekolah || '' : s.lembaga || '')
    .toLowerCase()
    .trim()
  if (lnorm === 'tpq pagi' || lnorm === 'tpq sore' || lnorm === 'tpq' || lnorm === 'pra ptpt')
    return 'Kepala TPQ'
  if (lnorm === 'ptpt') return 'PJ PTPT'
  if (lnorm === 'ppph' || lnorm === 'p3h') return 'PJ PPPH'
  if (lnorm === 'sdi') return 'Kepala SDI'
  if (lnorm === 'pkbm') return 'Kepala PKBM'
  return 'Kepala Sekolah'
})

// v.95.0626: nama Guru Kelas — Diniyah = guru_sekolah; Qiraati/ngaji = guru, fallback
//   guru_pagi/guru_sore (TPQ shift / PTPT) supaya auto-isi (konsisten dgn raporPdf.js).
function guruKelasNames(s) {
  if (!s) return []
  const raw =
    kategori.value === 'diniyah'
      ? s.guru_sekolah
      : [s.guru, s.guru_pagi, s.guru_sore].find((v) =>
          Array.isArray(v) ? v.filter(Boolean).length > 0 : String(v || '').trim() !== ''
        )
  return (Array.isArray(raw) ? raw : raw ? [raw] : [])
    .map((g) => String(g || '').trim())
    .filter(Boolean)
}

const namaGuru = computed(() => {
  const names = guruKelasNames(santriAktif.value)
  return names.length ? names.join(', ') : '-'
})

function findGuruByName(nama) {
  if (!nama) return null
  const n = String(nama).toLowerCase().trim()
  return (
    (guruRaw.value || []).find(
      (g) =>
        String(g.nama || '')
          .toLowerCase()
          .trim() === n
    ) || null
  )
}

// EKGQ fallback chain: nrg -> ekgq -> no_ekgq -> nip. v.95.0626: pakai guru kelas sesuai
//   kategori (Diniyah=guru_sekolah; Qiraati=guru/pagi/sore) supaya kode cocok dengan namanya.
const ekgqGuru = computed(() => {
  for (const g of guruKelasNames(santriAktif.value)) {
    const obj = findGuruByName(g)
    const code = obj?.nrg || obj?.ekgq || obj?.no_ekgq || obj?.nip || ''
    if (code) return code
  }
  return ''
})

const ekgqKepala = computed(() => {
  const nk = namaKepala.value
  if (!nk) return ''
  const obj = findGuruByName(nk)
  return obj?.nrg || obj?.ekgq || obj?.no_ekgq || obj?.nip || ''
})

// ===== Navigation actions =====
function pilihKategori(k) {
  kategori.value = k
  jenjangFilter.value = ''
  filterKelas.value = ''
  search.value = ''
  santriId.value = ''
  // v.86.0526: santri/wali -> langsung ekspor PDF rapornya (tanpa list/preview di app)
  if (isSantri.value) {
    exportSantriRapor(k)
    return
  }
  // Guru mode: skip pilih lembaga, langsung list santri diampu
  view.value = isGuruOnly.value ? 'santri' : 'lembaga'
  if (isGuruOnly.value) lembaga.value = ''
}

// v.86.0526: Santri/wali — ekspor rapor sendiri jadi PDF langsung; kalau nilai belum
//   diinput, tampilkan notif "Rapor belum diinput" (kyai req: tanpa preview di app).
async function exportSantriRapor(k) {
  const myId = String(authStore.sesiAktif?.id || '')
  const s = santriRaw.value.find((x) => String(x.id) === myId)
  if (!s) {
    toast?.warning?.('Data santri tidak ditemukan')
    return
  }
  santriId.value = String(s.id)
  lembaga.value = k === 'diniyah' ? String(s.lembaga_sekolah || '') : String(s.lembaga || '')
  await nextTick()
  const doc = findRaporDocFor(s)
  const adaNilai = !!doc && doc.data_nilai && Object.keys(doc.data_nilai).length > 0
  if (!adaNilai) {
    toast?.info?.('Rapor belum diinput')
    return
  }
  await exportPdfSingle(s)
}

// Diniyah lembaga filter (SDI + PKBM only — formal sekolah)
const diniyahLembaga = computed(() => {
  const allowed = ['sdi', 'pkbm']
  const all = (lembagaRaw.value || []).filter((l) => {
    const n = String(l.lembaga || l.nama || '')
      .toLowerCase()
      .trim()
    return allowed.includes(n)
  })
  if (all.length === 0) {
    // Seed default if master kosong
    allowed.forEach((a) => all.push({ lembaga: a.toUpperCase(), id: a.toUpperCase() }))
  }
  // v.90.0626: SDI satu kartu; PKBM dipecah jadi SMP (VII-IX) & SMA (X-XII) - samakan dg Rekap Diniyah
  const has = (name) => all.some((l) => String(l.lembaga || l.nama || '').toLowerCase().trim() === name)
  const cards = []
  if (has('sdi')) {
    cards.push({ id: 'SDI', label: 'SDI', subtitle: 'Sekolah Dasar Islam (Kelas I-VI)', icon: 'fa-school', lembaga: 'SDI', jenjang: '', gradient: 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900' })
  }
  if (has('pkbm')) {
    cards.push({ id: 'PKBM-SMP', label: 'SMP', subtitle: 'PKBM · Kelas VII–IX', icon: 'fa-school-flag', lembaga: 'PKBM', jenjang: 'SMP', gradient: 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900' })
    cards.push({ id: 'PKBM-SMA', label: 'SMA', subtitle: 'PKBM · Kelas X–XII', icon: 'fa-graduation-cap', lembaga: 'PKBM', jenjang: 'SMA', gradient: 'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900' })
  }
  return cards
})

function pilihLembaga(id, jenjang = '') {
  lembaga.value = id
  jenjangFilter.value = jenjang || ''
  view.value = 'santri'
  santriId.value = ''
  search.value = ''
  filterKelas.value = ''
}

function pilihSantri(s) {
  santriId.value = String(s.id)
  view.value = 'detail'
}

function kembaliSantri() {
  view.value = 'santri'
  santriId.value = ''
}

// v.21.85: Build raporState object dari computed values utk pass ke generateRaporPdf
function buildRaporStateFor(s, raporDocObj) {
  const isDiniyah = kategori.value === 'diniyah'
  const dn = { ...(raporDocObj?.data_nilai || {}) }
  // Auto Rata-rata Sumatif (Diniyah) dari rekap bulanan bila belum tersimpan.
  if (isDiniyah) {
    const kls = s.kelas_sekolah || ''
    const jen = diniyahJenjang(s.lembaga_sekolah, kls) || jenjangFromKelas(kls) || 'SDI'
    _mapelDiniyahResolved(kls, jen).forEach((nm) => {
      const k = `dn__${kls}__${slug(nm)}__sumatif`
      if (dn[k] == null || dn[k] === '') {
        const auto = rataSumatifBulananFor(s, nm)
        if (auto != null) dn[k] = auto
      }
    })
  }
  // Auto absensi dari absensi bulanan bila belum tersimpan.
  let absensi = raporDocObj?.absensi
  if (!absensi || !(absensi.sakit || absensi.izin || absensi.alpa || absensi.hadir || absensi._generatedFrom)) {
    absensi = absensiBulananSumFor(s, isDiniyah)
  }
  return {
    lembaga: isDiniyah ? 'Diniyah' : (s.lembaga || ''),
    tahun_ajaran: tahunAjaran.value,
    semester: semester.value,
    data_nilai: dn,
    absensi: absensi || { sakit: 0, izin: 0, alpa: 0 },
    kepribadian: raporDocObj?.kepribadian || { kelakuan: 'Baik', kerajinan: 'Baik', kebersihan: 'Baik' },
    catatan: raporDocObj?.catatan || '',
    catatan_wali_kelas: raporDocObj?.catatan || '',
    rata_rata: raporDocObj?.rata_rata || rataRata.value || 0
  }
}

function findRaporDocFor(s) {
  const periodKey = `${tahunAjaran.value}_${semester.value}`.replace(/[^a-zA-Z0-9_]/g, '_')
  const lmbKey = kategori.value === 'diniyah' ? 'Diniyah' : (s.lembaga || '')
  const docId = `rapor_${s.id}_${lmbKey}_${periodKey}`
  return raporDocs.value.find((r) => r.id === docId) || null
}

// v.21.85: cari lembaga doc Firestore (untuk override KOP per-lembaga)
function findLembagaObjFor(s) {
  if (!s) return null
  // v.90.0626: Diniyah pakai lembaga SEKOLAH (KOP sekolah), selain itu lembaga ngaji
  const lnorm = String(
    (kategori.value === 'diniyah' ? s.lembaga_sekolah : s.lembaga) || ''
  )
    .toLowerCase()
    .trim()
  return (lembagaRaw.value || []).find(
    (l) => String(l.lembaga || '').toLowerCase().trim() === lnorm
  ) || null
}

async function exportPdfSingle(santri = null) {
  const s = santri || santriAktif.value
  if (!s) {
    toast?.warning?.('Pilih santri dulu')
    return
  }
  try {
    const raporDocObj = findRaporDocFor(s)
    const raporState = buildRaporStateFor(s, raporDocObj)
    const lembagaObj = findLembagaObjFor(s)
    const filename = `Rapor_${(s.nama || 'santri').replace(/\s+/g, '_')}_${kategori.value}_${tahunAjaran.value}_${semester.value}.pdf`
    await generateRaporPdf({
      santri: s,
      schema: schema.value,
      raporState,
      settings: settingsStore.settings || {},
      dbGuru: guruRaw.value || [],
      filename,
      lembagaOverride: lembagaObj
    })
    toast?.success?.(`PDF ${s.nama} berhasil diunduh`)
  } catch (e) {
    toast?.error?.('Gagal ekspor PDF: ' + (e.message || e))
  }
}

async function exportPdfBatch() {
  const ids = Array.from(selectedSantriIds.value)
  if (ids.length === 0) {
    toast?.warning?.('Pilih minimal 1 santri')
    return
  }
  exportingBatch.value = true
  let ok = 0, fail = 0
  for (const id of ids) {
    const s = santriRaw.value.find((x) => String(x.id) === String(id))
    if (!s) { fail++; continue }
    try {
      await exportPdfSingle(s)
      ok++
      await new Promise((r) => setTimeout(r, 200))
    } catch (e) {
      fail++
    }
  }
  exportingBatch.value = false
  selectedSantriIds.value = new Set()
  toast?.success?.(`Selesai ekspor: ${ok} sukses, ${fail} gagal`)
}

function toggleSelect(s) {
  const id = String(s.id)
  const set = new Set(selectedSantriIds.value)
  if (set.has(id)) set.delete(id)
  else set.add(id)
  selectedSantriIds.value = set
}

function toggleSelectAll() {
  if (selectedSantriIds.value.size === santriList.value.length) {
    selectedSantriIds.value = new Set()
  } else {
    selectedSantriIds.value = new Set(santriList.value.map((s) => String(s.id)))
  }
}

function clearSelection() {
  selectedSantriIds.value = new Set()
}

// ===== Editor nilai rapor (isi/edit + simpan) =====
const editMode = ref(false)
const savingRapor = ref(false)
const draft = ref({
  data_nilai: {},
  absensi: { sakit: 0, izin: 0, alpa: 0 },
  kepribadian: { kelakuan: 'Baik', kerajinan: 'Baik', kebersihan: 'Baik' },
  catatan: ''
})

// Daftar field input per skema (Diniyah / PPPH / PTPT / Pra PTPT / TPQ).
const editGroups = computed(() => {
  const sc = schema.value
  const s = santriAktif.value
  if (!s) return []
  const groups = []
  if (sc.perKelas && jenjangAktif.value) {
    const kls = s.kelas_sekolah || ''
    groups.push({
      title: 'Nilai Mata Pelajaran',
      rows: (jenjangAktif.value.mapel || []).map((mp) => {
        const mid = mp.id || slug(mp.nama)
        return {
          label: mp.nama,
          fields: [
            { key: `dn__${kls}__${mid}__sumatif`, label: 'Rata-rata Sumatif', type: 'number', placeholder: rataSumatifBulanan(mp) == null ? 'Auto (rekap bln)' : `Auto: ${rataSumatifBulanan(mp)}`, autoVal: rataSumatifBulanan(mp) },
            { key: `dn__${kls}__${mid}__akhir`, label: 'Sumatif Akhir Semester', type: 'number' }
          ]
        }
      })
    })
  } else if (sc.perKitab) {
    groups.push({
      title: 'Nilai per Kitab',
      rows: (sc.levels || []).map((lvl) => ({
        label: `${lvl.label} — ${lvl.kitab}`,
        fields: [
          { key: `ppph__${lvl.id}__tgl_khotam`, label: 'Tgl Khotam', type: 'date' },
          ...(sc.fieldsNilai || []).map((f) => ({ key: `ppph__${lvl.id}__${f.id}`, label: f.label, type: 'number' }))
        ]
      }))
    })
  } else if (sc.tableLayout === 'kelasJuz') {
    groups.push({
      title: 'Nilai per Juz',
      rows: kelasJuzRows.value.map((r) => {
        const jz = String(r.juz).match(/\d+/)?.[0]
        const base = `kj__juz_${jz}`
        return {
          label: `${r.kelas} · ${r.juz}`,
          fields: [
            { key: `${base}__tgl_khotam`, label: 'Tgl Khotam', type: 'date' },
            ...(sc.fields || []).filter((f) => f.type === 'number').map((f) => ({ key: `${base}__${f.id}`, label: f.label, type: 'number' }))
          ]
        }
      })
    })
  } else if (sc.perLevel) {
    const rows = []
    ;(sc.levels || []).forEach((lvl) => {
      ;(lvl.khotamList || []).forEach((kh) => {
        const base = `pra__${lvl.id}__${kh.id}`
        rows.push({
          label: `${lvl.label} · ${kh.labelKhotam}`,
          fields: [
            { key: `${base}__tgl_khotam`, label: 'Tgl Khotam', type: 'date' },
            ...(sc.fieldsNilai || []).map((f) => ({ key: `${base}__${f.id}`, label: f.label, type: 'number' }))
          ]
        })
      })
    })
    groups.push({ title: 'Nilai per Khotam', rows })
  } else if ((sc.sections || []).length) {
    ;(sc.sections || []).forEach((sec) => {
      const flds = (sec.fields || []).filter((f) => f.type !== 'auto_predikat')
      const mkFields = (row) =>
        flds.map((f) => ({
          key: row ? `${sec.id}__${row}__${f.id}` : `${sec.id}__${f.id}`,
          label: f.label,
          type: f.type === 'date' ? 'date' : f.type === 'number' ? 'number' : 'text'
        }))
      if (sec.rows && sec.rows.length) {
        groups.push({ title: sec.title, rows: sec.rows.map((row) => ({ label: String(row), fields: mkFields(row) })) })
      } else {
        groups.push({ title: sec.title, rows: [{ label: sec.title, fields: mkFields(null) }] })
      }
    })
  }
  return groups
})

function startEdit() {
  const d = raporDoc.value || {}
  const dn = { ...(d.data_nilai || {}) }
  // prefill tgl khotam dari kartu kenaikan bila belum diisi
  editGroups.value.forEach((g) =>
    g.rows.forEach((row) =>
      row.fields.forEach((f) => {
        if (f.type === 'date' && (dn[f.key] == null || dn[f.key] === '')) {
          const auto = getNilai(f.key)
          if (auto) dn[f.key] = auto
        }
      })
    )
  )
  draft.value = {
    data_nilai: dn,
    absensi: { sakit: 0, izin: 0, alpa: 0, ...(d.absensi || {}) },
    kepribadian: { kelakuan: 'Baik', kerajinan: 'Baik', kebersihan: 'Baik', ...(d.kepribadian || {}) },
    catatan: d.catatan || ''
  }
  editMode.value = true
}
function cancelEdit() {
  editMode.value = false
}

function computeRataFromDraft() {
  const dn = draft.value.data_nilai || {}
  const sc = schema.value
  const vals = []
  const avgOf = (keys) => {
    let sum = 0
    let n = 0
    keys.forEach((k) => {
      const v = Number(dn[k])
      if (!isNaN(v) && v > 0) {
        sum += v
        n++
      }
    })
    return n ? sum / n : null
  }
  if (sc.perKelas && jenjangAktif.value) {
    const kls = santriAktif.value?.kelas_sekolah || ''
    ;(jenjangAktif.value.mapel || []).forEach((mp) => {
      const mid = mp.id || slug(mp.nama)
      const smRaw = dn[`dn__${kls}__${mid}__sumatif`]
      const sm =
        smRaw !== undefined && smRaw !== null && smRaw !== ''
          ? Number(smRaw)
          : rataSumatifBulanan(mp)
      const ak = Number(dn[`dn__${kls}__${mid}__akhir`])
      const arr = [sm, ak].filter((v) => v != null && !isNaN(v) && v > 0)
      if (arr.length) vals.push(arr.reduce((a, v) => a + v, 0) / arr.length)
    })
  } else if (sc.perKitab) {
    ;(sc.levels || []).forEach((lvl) => {
      const a = avgOf((sc.fieldsNilai || []).map((f) => `ppph__${lvl.id}__${f.id}`))
      if (a != null) vals.push(a)
    })
  } else if (sc.tableLayout === 'kelasJuz') {
    kelasJuzRows.value.forEach((r) => {
      const jz = String(r.juz).match(/\d+/)?.[0]
      const a = avgOf((sc.fields || []).filter((f) => f.type === 'number').map((f) => `kj__juz_${jz}__${f.id}`))
      if (a != null) vals.push(a)
    })
  } else if (sc.perLevel) {
    ;(sc.levels || []).forEach((lvl) =>
      (lvl.khotamList || []).forEach((kh) => {
        const a = avgOf((sc.fieldsNilai || []).map((f) => `pra__${lvl.id}__${kh.id}__${f.id}`))
        if (a != null) vals.push(a)
      })
    )
  }
  return vals.length ? vals.reduce((a, v) => a + v, 0) / vals.length : 0
}

async function simpanRapor() {
  const s = santriAktif.value
  if (!s || savingRapor.value) return
  savingRapor.value = true
  try {
    const periodKey = `${tahunAjaran.value}_${semester.value}`.replace(/[^a-zA-Z0-9_]/g, '_')
    const lmbKey = kategori.value === 'diniyah' ? 'Diniyah' : s.lembaga || ''
    const docId = `rapor_${s.id}_${lmbKey}_${periodKey}`
    await setDoc(
      doc(db, 'rapor_semester', docId),
      {
        santri_id: String(s.id),
        santri_nama: s.nama || '',
        lembaga: lmbKey,
        tahunAjaran: tahunAjaran.value,
        semester: semester.value,
        data_nilai: { ...draft.value.data_nilai },
        absensi: {
          sakit: Number(draft.value.absensi.sakit) || 0,
          izin: Number(draft.value.absensi.izin) || 0,
          alpa: Number(draft.value.absensi.alpa) || 0
        },
        kepribadian: { ...draft.value.kepribadian },
        catatan: draft.value.catatan || '',
        rata_rata: Number(computeRataFromDraft().toFixed(2)) || 0,
        updated_at: serverTimestamp()
      },
      { merge: true }
    )
    toast?.success?.('Rapor tersimpan')
    editMode.value = false
  } catch (e) {
    toast?.error?.('Gagal simpan rapor: ' + (e?.message || e))
  } finally {
    savingRapor.value = false
  }
}

// ===== Auto-route from query (?kategori=...) + role-based shortcut =====
onMounted(() => {
  const q = String(route.query.kategori || '').toLowerCase()
  if ((q === 'qiraati' || q === 'diniyah') && isSantri.value) {
    kategori.value = q
    const lmb = String(authStore.sesiAktif?.lembaga || '').trim()
    if (q === 'qiraati') {
      // v.21.109.0527: TPQ Pagi tidak punya rapor — stay di picker
      if (lmb.toLowerCase() === 'tpq pagi') {
        view.value = 'picker'
      } else {
        const match = QIRAATI_LEMBAGA.find((l) => l.id.toLowerCase() === lmb.toLowerCase())
        if (match) {
          lembaga.value = match.id
          view.value = 'detail'
        } else {
          view.value = 'lembaga'
        }
      }
    } else {
      lembaga.value = 'Diniyah'
      view.value = 'detail'
    }
  }
  // Guru-only: auto-jump to their lembaga's santri list
  if (isGuruOnly.value && view.value === 'picker') {
    const lmb = String(authStore.sesiAktif?.lembaga || '').trim()
    // v.21.109.0527: guru TPQ Pagi tidak menerbitkan rapor — skip auto-route
    if (lmb.toLowerCase() === 'tpq pagi') {
      view.value = 'picker'
    } else {
      const match = QIRAATI_LEMBAGA.find((l) => l.id.toLowerCase() === lmb.toLowerCase())
      if (match) {
        kategori.value = 'qiraati'
        lembaga.value = match.id
        view.value = 'santri'
      } else if (lmb) {
        kategori.value = 'diniyah'
        lembaga.value = lmb
        view.value = 'santri'
      }
    }
  }
})
</script>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
  @page {
    size: F4;
    margin: 10mm;
  }
}
</style>
