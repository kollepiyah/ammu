<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2">
        <div>
          <h2
            class="text-lg md:text-xl font-black text-[var(--text-primary)] flex items-center gap-2"
          >
            <i class="fas fa-graduation-cap text-cyan-700"></i>Naik Kelas / Kenaikan Jilid
          </h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">
            Kontrol Kartu Kenaikan per santri — pilih lembaga lalu santri untuk mulai
          </p>
        </div>
      </div>
    </div>

    <!-- Santri role view: langsung tampilkan kartu kenaikan miliknya -->
    <div
      v-if="isSantriRole"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div v-if="loadingSantri" class="text-center py-10">
        <i class="fas fa-spinner fa-spin text-2xl text-teal-500"></i>
        <p class="text-xs text-[var(--text-secondary)] mt-2">Memuat kartu kenaikan...</p>
      </div>
      <div v-else-if="mySantri">
        <p class="text-xs text-[var(--text-secondary)] mb-3">Kartu Kenaikan untuk:</p>
        <button
          @click="openKartu(mySantri)"
          class="w-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] hover:from-emerald-600 dark:from-emerald-800 hover:to-teal-800 text-white rounded-xl p-4 flex items-center justify-between gap-3 cursor-pointer shadow-md hover:shadow-lg transition"
        >
          <div class="text-left flex-1 min-w-0">
            <p class="text-base font-black truncate">{{ mySantri.nama }}</p>
            <p class="text-[11px] opacity-90 mt-0.5">
              {{ mySantri.lembaga }}{{ mySantri.kelas ? ' · Kelas ' + mySantri.kelas : ''
              }}{{ mySantri.juz && mySantri.juz !== '-' ? ' · Juz ' + mySantri.juz : '' }}
            </p>
          </div>
          <span
            class="text-xs font-black bg-[var(--bg-card)]/20 px-3 py-1.5 rounded-lg flex items-center gap-1 flex-shrink-0"
          >
            <i class="fas fa-id-card"></i>LIHAT KARTU
          </span>
        </button>
      </div>
      <div v-else class="text-center py-10">
        <i class="fas fa-exclamation-triangle text-rose-400 text-2xl mb-2"></i>
        <p class="text-sm font-bold text-rose-700">Data santri tidak ditemukan</p>
      </div>
    </div>

    <!-- Access denied untuk non-admin/non-guru/non-santri -->
    <div
      v-else-if="!isAdmin && !isGuru"
      class="bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700 rounded-2xl p-5 text-center"
    >
      <i class="fas fa-lock text-3xl text-rose-600 mb-2"></i>
      <p class="text-sm font-bold text-rose-700 dark:text-rose-300">Akses Ditolak</p>
    </div>

    <!-- Tab Switcher (admin/guru) — v.98: di Electron sub-menu (Form/Riwayat/Pengaturan) ada di pita -->
    <div
      v-if="(isAdmin || isGuru) && !isDesktop"
      class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm p-2"
    >
      <div class="flex gap-1.5 overflow-x-auto custom-scrollbar">
        <button
          @click="activeTab = 'form'"
          :class="[
            'flex-1 whitespace-nowrap px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-black transition cursor-pointer rounded-xl flex items-center justify-center gap-1.5',
            activeTab === 'form'
              ? 'bg-teal-600 text-white shadow-md'
              : 'text-[var(--text-secondary)] hover:bg-teal-50 hover:text-teal-700'
          ]"
        >
          <i class="fas fa-edit text-sm"></i>Form Kenaikan
        </button>
        <button
          v-if="isAdmin || isGuru"
          @click="activeTab = 'riwayat'"
          :class="[
            'flex-1 whitespace-nowrap px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-black transition cursor-pointer rounded-xl flex items-center justify-center gap-1.5',
            activeTab === 'riwayat'
              ? 'bg-cyan-600 text-white shadow-md'
              : 'text-[var(--text-secondary)] hover:bg-cyan-50 hover:text-cyan-700'
          ]"
        >
          <i class="fas fa-id-card text-sm"></i>Riwayat Kenaikan
        </button>
        <button
          v-if="isAdmin"
          @click="activeTab = 'pengaturan'"
          :class="[
            'flex-1 whitespace-nowrap px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-black transition cursor-pointer rounded-xl flex items-center justify-center gap-1.5',
            activeTab === 'pengaturan'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-[var(--text-secondary)] hover:bg-emerald-50 hover:text-emerald-700'
          ]"
        >
          <i class="fas fa-cog text-sm"></i>Pengaturan
        </button>
        <button
          v-if="isAdmin"
          @click="activeTab = 'mutasi'"
          :class="[
            'flex-1 whitespace-nowrap px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-black transition cursor-pointer rounded-xl flex items-center justify-center gap-1.5',
            activeTab === 'mutasi'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-[var(--text-secondary)] hover:bg-amber-50 hover:text-amber-700'
          ]"
        >
          <i class="fas fa-right-from-bracket text-sm"></i>Mutasi
        </button>
      </div>
    </div>

    <!-- v.99: SUB-MENU MUTASI (keluar) — kategori → filter lembaga → list santri → keluarkan -->
    <div v-if="isAdmin && activeTab === 'mutasi'" class="space-y-3">
      <div class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm p-4">
        <h3 class="text-sm font-black text-[var(--text-primary)] mb-3"><i class="fas fa-right-from-bracket text-amber-600 mr-1"></i>Mutasi / Keluar Santri</h3>
        <div class="grid grid-cols-2 gap-2">
          <button @click="mutasiKategori = 'qiraati'; mutasiLembaga = ''" :class="['px-3 py-3 rounded-xl text-sm font-black border transition cursor-pointer', mutasiKategori === 'qiraati' ? 'bg-teal-600 text-white border-teal-700' : 'bg-[var(--bg-muted)] text-[var(--text-primary)] border-[var(--border-default)] hover:bg-teal-50 dark:hover:bg-teal-900/30']"><i class="fas fa-book-quran mr-1"></i>Lembaga Qiraati</button>
          <button @click="mutasiKategori = 'sekolah'; mutasiLembaga = ''" :class="['px-3 py-3 rounded-xl text-sm font-black border transition cursor-pointer', mutasiKategori === 'sekolah' ? 'bg-cyan-600 text-white border-cyan-700' : 'bg-[var(--bg-muted)] text-[var(--text-primary)] border-[var(--border-default)] hover:bg-cyan-50 dark:hover:bg-cyan-900/30']"><i class="fas fa-school mr-1"></i>Lembaga Sekolah</button>
        </div>
        <div v-if="mutasiKategori" class="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-1">Filter Lembaga</label>
            <select v-model="mutasiLembaga" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer">
              <option value="">— pilih lembaga —</option>
              <option v-for="l in mutasiLembagaOptions" :key="l" :value="l">{{ l }}</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-1">Tanggal Keluar</label>
            <input v-model="mutasiTgl" type="date" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none" />
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-1">Alasan Keluar</label>
            <select v-model="mutasiAlasan" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer">
              <option value="">— pilih —</option>
              <option value="Lulus">Lulus</option>
              <option value="Pindah">Pindah</option>
              <option value="Mengundurkan diri">Mengundurkan diri</option>
              <option value="Wafat">Wafat</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>
        <input v-if="mutasiKategori && mutasiAlasan === 'Lainnya'" v-model="mutasiAlasanLain" type="text" placeholder="Keterangan alasan keluar" class="mt-2 w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none" />
      </div>

      <div v-if="mutasiLembaga" class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm p-4">
        <div class="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <p class="text-[11px] text-[var(--text-secondary)]"><b class="text-[var(--text-primary)]">{{ mutasiCandidates.length }}</b> santri {{ mutasiShowKeluar ? 'sudah keluar' : 'aktif' }} di {{ mutasiLembaga }}.</p>
          <label class="inline-flex items-center gap-2 text-[11px] font-bold text-[var(--text-secondary)] cursor-pointer">
            <input type="checkbox" v-model="mutasiShowKeluar" class="w-4 h-4 accent-amber-600" />Tampilkan yang sudah keluar
          </label>
        </div>
        <input v-model="mutasiSearch" type="search" placeholder="Cari nama / NIS..." class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none mb-2" />
        <ul class="space-y-1 max-h-[50vh] overflow-y-auto">
          <li v-for="s in mutasiCandidates" :key="s.id" class="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-muted)]">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</p>
              <p class="text-[10px] text-[var(--text-tertiary)] truncate">NIS {{ s.nis || '-' }} · {{ mutasiKelasLabel(s) }}<span v-if="mutasiShowKeluar && s.tgl_keluar"> · keluar {{ s.tgl_keluar }} ({{ s.alasan_keluar || '-' }})</span></p>
            </div>
            <button v-if="!mutasiShowKeluar" @click="keluarkanSantri(s)" :disabled="mutasiSaving" class="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50 flex-shrink-0"><i class="fas fa-right-from-bracket mr-1"></i>Keluarkan</button>
            <button v-else @click="reaktifSantri(s)" :disabled="mutasiSaving" class="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 flex-shrink-0"><i class="fas fa-rotate-left mr-1"></i>Aktifkan</button>
          </li>
          <li v-if="mutasiCandidates.length === 0" class="text-xs italic text-[var(--text-tertiary)] text-center py-4">Tidak ada santri.</li>
        </ul>
      </div>
    </div>

    <!-- Filter Lembaga (admin/form tab) -->
    <div
      v-if="isAdmin && activeTab === 'form'"
      class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <!-- v.99: kategori Qiraati / Sekolah -->
      <div class="flex gap-2 mb-3">
        <button
          @click="kenaikanKategori = 'qiraati'; filterLembaga = ''"
          :class="['flex-1 px-3 py-2 rounded-xl text-xs font-black border transition cursor-pointer', kenaikanKategori === 'qiraati' ? 'bg-teal-600 text-white border-teal-700' : 'bg-[var(--bg-muted)] text-[var(--text-primary)] border-[var(--border-default)] hover:bg-teal-50 dark:hover:bg-teal-900/30']"
        ><i class="fas fa-book-quran mr-1"></i>Lembaga Qiraati</button>
        <button
          @click="kenaikanKategori = 'sekolah'; filterLembaga = ''"
          :class="['flex-1 px-3 py-2 rounded-xl text-xs font-black border transition cursor-pointer', kenaikanKategori === 'sekolah' ? 'bg-cyan-600 text-white border-cyan-700' : 'bg-[var(--bg-muted)] text-[var(--text-primary)] border-[var(--border-default)] hover:bg-cyan-50 dark:hover:bg-cyan-900/30']"
        ><i class="fas fa-school mr-1"></i>Lembaga Sekolah</button>
      </div>
      <p
        class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-2"
      >
        Filter Lembaga
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
        <button
          v-for="l in kenaikanLembagaOptions"
          :key="l"
          @click="filterLembaga = l"
          :class="[
            'px-3 py-2.5 text-sm font-black rounded-xl transition cursor-pointer shadow-sm',
            filterLembaga === l ? lembagaColor(l, true) : lembagaColor(l, false)
          ]"
        >
          {{ l }}
        </button>
      </div>
    </div>

    <!-- Form Kenaikan: list santri filter + search -->
    <div
      v-if="(isAdmin && activeTab === 'form' && filterLembaga) || (isGuru && activeTab === 'form')"
      class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="relative mb-3">
        <i
          class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"
        ></i>
        <input
          v-model="searchFormSantri"
          type="search"
          placeholder="Cari nama santri..."
          class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
        />
      </div>
      <div v-if="loadingSantri" class="text-center py-10">
        <i class="fas fa-spinner fa-spin text-2xl text-cyan-700 mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)]">Memuat data santri...</p>
      </div>
      <p
        v-else-if="filteredFormSantri.length === 0"
        class="text-center text-[var(--text-tertiary)] py-6 text-sm"
      >
        Tidak ada santri yang cocok di lembaga {{ filterLembaga }}.
      </p>
      <div v-else class="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
        <div
          v-for="s in filteredFormSantri"
          :key="s.id"
          class="flex items-center justify-between gap-2 p-3 rounded-xl border border-[var(--border-subtle)] hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition"
        >
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</p>
            <p class="text-[11px] text-[var(--text-secondary)] truncate">
              {{ s.lembaga }}{{ s.kelas ? ' · ' + s.kelas : ''
              }}{{ s.juz && s.juz !== '-' ? ' · Juz ' + s.juz : '' }}
            </p>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <button
              @click="openFormKenaikan(s)"
              class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-black px-3 py-2 rounded-lg text-xs cursor-pointer flex items-center gap-1.5 uppercase tracking-wider shadow-sm hover:shadow-md transition"
              title="Proses Naik (form sederhana)"
            >
              <i class="fas fa-arrow-up"></i>PROSES NAIK
            </button>
            <button
              @click="openKartu(s)"
              class="bg-cyan-600 hover:bg-cyan-700 text-white font-black px-2.5 py-2 rounded-lg text-xs cursor-pointer flex items-center gap-1 shadow-sm hover:shadow-md transition"
              title="Lihat Kartu Kenaikan (matrix lengkap)"
            >
              <i class="fas fa-id-card"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Riwayat Kenaikan -->
    <div
      v-if="(isAdmin || isGuru) && activeTab === 'riwayat'"
      class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <label class="text-xs font-bold text-[var(--text-secondary)]">
          Lembaga:
        </label>
        <select
          v-model="riwayatLembaga"
          class="text-xs px-3 py-1.5 border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
        >
          <option value="">— Pilih Lembaga —</option>
          <optgroup label="Qiraati">
            <option value="TPQ Pagi">TPQ Pagi</option>
            <option value="TPQ Sore">TPQ Sore</option>
            <option value="Pra PTPT">Pra PTPT</option>
            <option value="PTPT">PTPT</option>
            <option value="PPPH">PPPH</option>
          </optgroup>
          <optgroup label="Sekolah">
            <option value="TK">TK</option>
            <option value="SDI">SDI</option>
            <option value="SMP">SMP</option>
            <option value="SMA">SMA</option>
          </optgroup>
        </select>
        <input
          v-model="riwayatSearch"
          type="text"
          placeholder="Cari nama santri..."
          class="flex-1 min-w-[180px] text-xs px-3 py-1.5 border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
        />
        <!-- v.21.115.0528: standardize per design-tokens — Excel emerald, PDF cyan -->
        <button
          v-if="riwayatLembaga && riwayatList.length > 0"
          @click="exportRiwayatExcel"
          :disabled="exportingExcel"
          aria-label="Ekspor riwayat naik kelas ke Excel"
          class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold disabled:opacity-50 transition cursor-pointer"
        >
          <i :class="['fas', exportingExcel ? 'fa-spinner fa-spin' : 'fa-file-excel']"></i>
          {{ exportingExcel ? 'Mengeksport…' : 'Excel' }}
        </button>
        <button
          v-if="riwayatLembaga && riwayatList.length > 0"
          @click="exportRiwayatPdf"
          :disabled="exportingPdf"
          aria-label="Cetak riwayat naik kelas PDF"
          title="Cetak PDF Daftar Riwayat"
          class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold disabled:opacity-50 transition cursor-pointer"
        >
          <i :class="['fas', exportingPdf ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i>
          {{ exportingPdf ? 'Mencetak…' : 'PDF' }}
        </button>
      </div>
      <template v-if="riwayatLembaga">
        <p v-if="riwayatList.length === 0" class="text-center text-[var(--text-tertiary)] italic text-xs py-8">
          Tidak ada santri di lembaga {{ riwayatLembaga }}.
        </p>
        <div v-else class="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
          <div
            v-for="s in riwayatList"
            :key="s.id"
            class="rounded-xl border border-[var(--border-subtle)] hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition"
          >
            <div class="flex items-center justify-between gap-2 p-3">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-[var(--text-primary)] truncate">
                  {{ s.nama }}
                </p>
                <p class="text-[11px] text-[var(--text-secondary)] truncate">
                  {{ s.lembaga }}{{ s.kelas ? ' · ' + s.kelas : '' }}
                  <span class="ml-1 text-emerald-600 font-bold">
                    · {{ countTanggalTerisi(s, riwayatLembaga) }} tanggal terisi
                  </span>
                  <button
                    v-if="countCatatan(s, riwayatLembaga) > 0"
                    @click="toggleExpand(s.id)"
                    class="ml-2 inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-cyan-100 hover:bg-cyan-200 text-cyan-700 cursor-pointer transition"
                    :title="expanded.has(s.id) ? 'Sembunyikan catatan' : 'Lihat catatan'"
                  >
                    <i
                      :class="['fas', expanded.has(s.id) ? 'fa-chevron-up' : 'fa-comment-dots']"
                    ></i>
                    {{ countCatatan(s, riwayatLembaga) }} catatan
                  </button>
                </p>
              </div>
              <button
                @click="() => {; filterLembaga = riwayatLembaga; openKartu(s); }"
                class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer flex items-center gap-1 flex-shrink-0"
              >
                <i class="fas fa-eye"></i>Lihat
              </button>
            </div>
            <div
              v-if="expanded.has(s.id)"
              class="px-3 pb-3 space-y-1.5 border-t border-[var(--border-subtle)] pt-2"
            >
              <div
                v-for="(c, ci) in latestCatatan(s, riwayatLembaga, 5)"
                :key="ci"
                :class="[
                  'border-l-4 px-2.5 py-1.5 rounded-r-md',
                  c.tipe === 'rekomendasi'
                    ? 'bg-emerald-50 border-emerald-500'
                    : 'bg-cyan-50 border-cyan-500'
                ]"
              >
                <p
                  :class="[
                    'text-[9px] font-black uppercase tracking-wider mb-0.5',
                    c.tipe === 'rekomendasi' ? 'text-emerald-700' : 'text-cyan-700'
                  ]"
                >
                  <i
                    :class="[
                      'fas mr-1',
                      c.tipe === 'rekomendasi' ? 'fa-lightbulb' : 'fa-comment-dots'
                    ]"
                  ></i>
                  {{ c.tipe === 'rekomendasi' ? 'Rekomendasi' : 'Catatan' }}
                  <span class="font-medium normal-case text-[var(--text-secondary)] ml-1">
                    · {{ c.tanggal || '—' }}{{ c.kelasId ? ' · ' + c.kelasId : '' }}
                  </span>
                </p>
                <p class="text-[11px] text-[var(--text-primary)] whitespace-pre-line">{{ c.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <p v-else class="text-center text-[var(--text-tertiary)] italic text-xs py-8">
        <i class="fas fa-id-card text-3xl text-slate-300 dark:text-[var(--text-secondary)] block mb-2"></i>
        Pilih lembaga untuk melihat riwayat kenaikan santri.
      </p>
    </div>

    <!-- Tab: Pengaturan (admin only) -->
    <div
      v-if="isAdmin && activeTab === 'pengaturan'"
      class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm space-y-4"
    >
      <p class="text-xs text-[var(--text-secondary)] italic flex items-start gap-1.5">
        <i class="fas fa-info-circle mt-0.5"></i>
        Klik card lembaga di bawah untuk atur KOP Kartu Kenaikan khusus lembaga tersebut.
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        <button
          v-for="l in pengaturanLembagaList"
          :key="l"
          @click="selectPengaturanLembaga(l)"
          :class="[
            'bg-white dark:bg-slate-900 border-2 rounded-xl p-3 md:p-4 text-center font-black transition cursor-pointer shadow-sm',
            pengaturanLembaga === l
              ? 'border-cyan-500 text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 ring-2 ring-cyan-200'
              : 'border-[var(--border-subtle)] text-slate-700 dark:text-[var(--text-tertiary)] hover:border-cyan-300 hover:bg-cyan-50/50'
          ]"
        >
          <p class="text-sm md:text-base">{{ l }}</p>
        </button>
      </div>

      <div
        v-if="pengaturanLembaga"
        class="border border-[var(--border-default)] rounded-xl overflow-hidden"
      >
        <div
          class="bg-[var(--bg-muted)] px-4 py-2 text-xs md:text-sm font-black text-[var(--text-primary)]"
        >
          <i class="fas fa-folder-open mr-1"></i>Pengaturan Kartu — {{ pengaturanLembaga }}
        </div>
        <div class="p-4 bg-[var(--bg-card)] space-y-3">
          <!-- KOP Section -->
          <div
            class="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-700 rounded-xl p-3 md:p-4"
          >
            <h4 class="text-sm font-black text-cyan-800 dark:text-cyan-300 mb-1">
              <i class="fas fa-flag mr-1"></i>KOP Kartu Kenaikan (Per Lembaga)
            </h4>
            <p class="text-[11px] text-[var(--text-secondary)] mb-3">
              Atur judul, subjudul, alamat khusus untuk lembaga ini. Mis: PTPT pakai "PASCA TPQ
              PROGRAM TAHFIZH", TPQ pakai "TAMAN PENDIDIKAN AL-QURAN".
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label
                  class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
                  >Judul Utama</label
                >
                <input
                  v-model="kopForm.judul"
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
                  v-model="kopForm.subjudul"
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
                  v-model="kopForm.alamat"
                  type="text"
                  placeholder="Jl. Kolonel Sugiono No. 112 Panjunan - Waru - Sidoarjo"
                  class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                />
              </div>
            </div>
            <div class="flex justify-end mt-3">
              <button
                @click="saveKop"
                :disabled="savingKop"
                class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-4 py-2 rounded-lg text-xs cursor-pointer disabled:opacity-50"
              >
                <i :class="['fas', savingKop ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>
                {{ savingKop ? 'Menyimpan...' : 'Simpan KOP' }}
              </button>
            </div>
          </div>

          <!-- Schema Section -->
          <div
            class="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-700 rounded-xl p-3 md:p-4 space-y-3"
          >
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h4 class="text-sm font-black text-teal-800 dark:text-teal-300">
                <i class="fas fa-list-alt mr-1"></i>Schema Kartu Kenaikan — {{ pengaturanLembaga }}
              </h4>
              <div class="flex gap-1">
                <button
                  @click="resetSchema"
                  class="text-[10px] font-bold px-2 py-1 rounded bg-cyan-100 text-cyan-800 hover:bg-cyan-200"
                >
                  <i class="fas fa-undo mr-0.5"></i>Reset Default
                </button>
                <button
                  @click="saveSchema"
                  :disabled="savingSchema"
                  class="text-[10px] font-black px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50"
                >
                  <i :class="['fas', savingSchema ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>
                  Simpan Schema
                </button>
              </div>
            </div>
            <div>
              <label
                class="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block mb-1"
              >
                Header Item (mis: Juz / Jilid / Khotam / Tahap)
              </label>
              <input
                v-model="schemaDraft.itemHeader"
                placeholder="Item"
                class="w-full px-2 py-1.5 text-sm border border-teal-300 rounded bg-white dark:bg-slate-900 text-[var(--text-primary)]"
              />
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <p
                  class="text-[11px] font-black text-teal-800 dark:text-teal-300 uppercase tracking-wider"
                >
                  Daftar Kelas/Level/Jilid:
                </p>
                <button
                  @click="addKelas"
                  class="text-[10px] bg-teal-200 hover:bg-teal-300 text-teal-800 font-bold px-2 py-0.5 rounded"
                >
                  <i class="fas fa-plus mr-0.5"></i>Tambah Kelas
                </button>
              </div>
              <div
                v-if="(schemaDraft.kelasList || []).length === 0"
                class="text-center text-xs text-[var(--text-tertiary)] italic py-3"
              >
                Belum ada kelas. Klik "Tambah Kelas" untuk mulai.
              </div>
              <div
                v-for="(k, ki) in schemaDraft.kelasList || []"
                :key="k.id"
                class="bg-[var(--bg-card)] border border-teal-100 dark:border-teal-700 rounded-lg p-2 space-y-2"
              >
                <div class="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                  <input
                    v-model="k.label"
                    placeholder="Label (Kelas 1)"
                    class="text-xs font-bold px-2 py-1 border border-[var(--border-default)] rounded bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                  />
                  <label
                    class="text-[10px] font-bold text-[var(--text-secondary)] flex items-center gap-1"
                  >
                    <input
                      v-model="k.ceremonial"
                      type="checkbox"
                      class="w-3 h-3 accent-cyan-600"
                    />
                    Ceremonial
                  </label>
                  <button
                    @click="schemaDraft.kelasList.splice(ki, 1)"
                    class="text-rose-500 hover:bg-rose-50 text-xs px-1.5 rounded"
                    title="Hapus kelas"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="space-y-1 pl-3 border-l-2 border-teal-200 dark:border-teal-700">
                  <p class="text-[10px] font-bold text-[var(--text-secondary)] uppercase">
                    Items ({{ schemaDraft.itemHeader || 'Item' }}):
                  </p>
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="(it, ii) in k.items || []"
                      :key="ii"
                      class="bg-teal-50 border border-teal-200 px-2 py-0.5 rounded text-[11px] flex items-center gap-1"
                    >
                      <input
                        v-model="it.label"
                        class="bg-transparent border-0 outline-none text-[11px] w-14"
                      />
                      <button @click="k.items.splice(ii, 1)" class="text-rose-400 text-[10px]">
                        <i class="fas fa-times"></i>
                      </button>
                    </span>
                    <button
                      @click="(k.items = k.items || []) && k.items.push({ id: 'it_' + Date.now(), label: '' })"
                      class="bg-teal-200 hover:bg-teal-300 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded"
                    >
                      + Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-[10px] text-[var(--text-secondary)] italic">
              <i class="fas fa-info-circle mr-1"></i>
              Schema ini dipakai di modal Kartu Kenaikan (matrix kelas × items × tanggal
              khotam/naik).
            </p>
          </div>
        </div>
      </div>
      <p v-else class="text-center text-[var(--text-tertiary)] italic text-xs py-6">
        <i class="fas fa-hand-pointer text-2xl text-slate-300 dark:text-[var(--text-secondary)] block mb-2"></i>
        Pilih lembaga di atas untuk mulai atur KOP.
      </p>
    </div>

    <!-- Modal Kartu Kenaikan (matrix full) -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="kartuOpen"
          class="fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto"
          @click.self="closeKartu"
        >
          <div
            class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-4xl w-full my-4 max-h-[90vh] flex flex-col"
          >
            <!-- KOP -->
            <div
              class="px-4 md:px-6 pt-5 pb-3 border-b-2 border-slate-700 dark:border-slate-600 text-center"
            >
              <p class="text-sm md:text-base font-black uppercase text-[var(--text-primary)]">
                {{ kopHeader.judul }}
              </p>
              <p
                class="text-base md:text-lg font-black uppercase text-[var(--text-primary)] mt-0.5"
              >
                {{ kopHeader.subjudul }}
              </p>
              <p
                v-if="kopHeader.alamat"
                class="text-[10px] text-[var(--text-secondary)] mt-1"
              >
                {{ kopHeader.alamat }}
              </p>
            </div>

            <div class="flex-1 overflow-y-auto p-4 md:p-6">
              <!-- Identitas -->
              <div
                class="bg-[var(--bg-card-elevated)] rounded-xl p-3 mb-3 border border-[var(--border-subtle)] text-xs"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  <div>
                    <span class="font-bold text-[var(--text-secondary)] inline-block w-32">No. Induk</span>
                    : {{ kartuSantri?.nis || '-' }}
                  </div>
                  <div>
                    <span class="font-bold text-[var(--text-secondary)] inline-block w-32">Tanggal Masuk</span>
                    : {{ kartuSantri?.tgl_masuk || '-' }}
                  </div>
                  <div>
                    <span class="font-bold text-[var(--text-secondary)] inline-block w-32">Nama</span>
                    : {{ kartuSantri?.nama || '-' }}
                  </div>
                  <div>
                    <span class="font-bold text-[var(--text-secondary)] inline-block w-32">Alamat</span>
                    : {{ kartuSantri?.alamat || '-' }}
                  </div>
                </div>
              </div>

              <!-- Matrix Kelas × Items -->
              <div class="space-y-3">
                <div
                  v-for="row in Math.ceil(schema.kelasList.length / 2)"
                  :key="row"
                  class="grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  <div
                    v-for="k in schema.kelasList.slice((row - 1) * 2, (row - 1) * 2 + 2)"
                    :key="k.id"
                    class="border border-[var(--border-default)] rounded-lg overflow-hidden"
                  >
                    <div
                      class="bg-slate-200 dark:bg-slate-700 text-center font-black text-xs py-1.5 border-b border-[var(--border-default)] text-[var(--text-primary)]"
                    >
                      {{ k.label }}
                    </div>
                    <div
                      class="bg-[var(--bg-card-elevated)] text-center text-[10px] font-bold border-b border-[var(--border-default)] py-1 text-slate-700 dark:text-[var(--text-tertiary)]"
                    >
                      {{ schema.itemHeader || 'Item' }}
                    </div>
                    <table class="w-full text-[10px]">
                      <thead>
                        <tr class="bg-[var(--bg-card)]">
                          <th
                            v-for="it in k.items"
                            :key="it.id"
                            class="border border-[var(--border-default)] px-1 py-1 font-bold text-center text-[var(--text-primary)]"
                          >
                            {{ it.label }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-[var(--bg-card)]">
                          <td
                            v-for="it in k.items"
                            :key="it.id"
                            class="border border-[var(--border-default)] px-1 py-1"
                          >
                            <input
                              type="date"
                              :value="getCell(k.id, it.id)"
                              @input="(e) => setCell(k.id, it.id, e.target.value)"
                              class="w-full text-[9px] py-0.5 px-1 border-0 outline-none bg-transparent text-[var(--text-primary)]"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- Ceremonial -->
                    <div
                      v-if="k.ceremonial"
                      class="bg-cyan-50 dark:bg-cyan-900/20 border-t border-[var(--border-default)] px-2 py-1.5 flex items-center gap-2 text-[10px]"
                    >
                      <span class="font-bold text-cyan-800 dark:text-cyan-300">{{ kartuCeremonialLabel }}:</span>
                      <input
                        type="date"
                        :value="getCeremonial(k.id)"
                        @input="(e) => setCeremonial(k.id, e.target.value)"
                        class="flex-1 py-0.5 px-1 text-[10px] border border-cyan-200 dark:border-cyan-700 rounded bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                      />
                    </div>
                    <!-- Catatan & Rekomendasi per kelas -->
                    <div
                      class="bg-[var(--bg-card-elevated)] border-t border-[var(--border-default)] px-2 py-2 space-y-2"
                    >
                      <div class="flex items-center justify-between gap-2">
                        <p
                          class="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-wide"
                        >
                          <i class="fas fa-comment-dots mr-1 text-cyan-600"></i>Catatan &
                          Rekomendasi
                        </p>
                        <button
                          type="button"
                          @click="() => toggleNoteForm(k.id)"
                          class="text-[9px] font-bold px-2 py-1 rounded bg-cyan-600 hover:bg-cyan-700 text-white cursor-pointer"
                        >
                          <i class="fas fa-plus mr-0.5"></i>Tambah
                        </button>
                      </div>
                      <div
                        v-if="noteFormOpen[k.id]"
                        class="bg-[var(--bg-card)] border border-cyan-300 dark:border-cyan-700 rounded p-2 space-y-1.5"
                      >
                        <div class="grid grid-cols-3 gap-1.5">
                          <input
                            v-model="noteDraft[k.id].tanggal"
                            type="date"
                            class="text-[10px] px-1.5 py-1 border border-[var(--border-default)] rounded bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                          />
                          <select
                            v-model="noteDraft[k.id].itemId"
                            class="text-[10px] px-1.5 py-1 border border-[var(--border-default)] rounded bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                          >
                            <option v-for="it in k.items" :key="it.id" :value="it.id">
                              {{ schema.itemHeader }} {{ it.label }}
                            </option>
                            <option v-if="k.ceremonial" value="ceremonial">{{ kartuCeremonialLabel }}</option>
                          </select>
                          <select
                            v-model="noteDraft[k.id].tipe"
                            class="text-[10px] px-1.5 py-1 border border-[var(--border-default)] rounded bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                          >
                            <option value="catatan">Catatan</option>
                            <option value="rekomendasi">Rekomendasi</option>
                          </select>
                        </div>
                        <textarea
                          v-model="noteDraft[k.id].text"
                          rows="2"
                          placeholder="Tulis catatan/rekomendasi..."
                          class="w-full px-2 py-1 text-[10px] border border-[var(--border-default)] rounded bg-white dark:bg-slate-900 text-[var(--text-primary)] resize-none"
                        ></textarea>
                        <div class="flex justify-end gap-1">
                          <button
                            type="button"
                            @click="() => toggleNoteForm(k.id)"
                            class="text-[9px] font-bold px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-[var(--text-primary)]"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            @click="() => saveNoteEntry(k.id)"
                            class="text-[9px] font-bold px-2 py-1 rounded bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
                          >
                            <i class="fas fa-check mr-0.5"></i>Simpan Entry
                          </button>
                        </div>
                      </div>
                      <div v-if="getEntries(k.id).length > 0" class="space-y-1">
                        <div
                          v-for="(c, ci) in getEntries(k.id)"
                          :key="ci"
                          :class="[
                            'border-l-4 px-2 py-1.5 rounded-r text-[10px] flex items-start gap-2',
                            c.tipe === 'rekomendasi'
                              ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500'
                              : 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-500'
                          ]"
                        >
                          <div class="flex-1 min-w-0">
                            <p
                              :class="[
                                'font-bold',
                                c.tipe === 'rekomendasi' ? 'text-emerald-700' : 'text-cyan-700'
                              ]"
                            >
                              <i
                                :class="[
                                  'fas mr-0.5',
                                  c.tipe === 'rekomendasi' ? 'fa-lightbulb' : 'fa-comment-dots'
                                ]"
                              ></i>
                              {{ c.tipe === 'rekomendasi' ? 'Rekomendasi' : 'Catatan' }} —
                              {{ formatDate(c.tanggal) }} · {{ labelItem(k, c.itemId) }}
                            </p>
                            <p
                              class="text-[var(--text-primary)] mt-0.5 whitespace-pre-line"
                            >
                              {{ c.text }}
                            </p>
                          </div>
                          <button
                            type="button"
                            @click="() => removeEntry(k.id, ci)"
                            class="text-rose-500 hover:text-rose-700 text-[10px] flex-shrink-0"
                            title="Hapus entry"
                          >
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                      <p v-else class="text-[9px] text-[var(--text-tertiary)] italic text-center py-1">
                        Belum ada catatan/rekomendasi untuk kelas ini.
                      </p>
                    </div>
                  </div>
                </div>
                <p
                  v-if="schema.kelasList.length === 0"
                  class="text-center text-[var(--text-tertiary)] py-6 text-sm italic"
                >
                  Schema untuk lembaga {{ kartuLembaga }} belum dikonfigurasi.
                </p>
              </div>
            </div>

            <div
              class="px-4 md:px-6 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-card-elevated)] flex items-center justify-end gap-2 rounded-b-2xl"
            >
              <button
                @click="closeKartu"
                class="px-4 py-2 text-sm font-bold rounded-xl bg-slate-200 dark:bg-slate-700 text-[var(--text-primary)] hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer"
              >
                Batal
              </button>
              <!-- v.21.115.0528: standardize per design-tokens — Ekspor PDF cyan -->
              <button
                @click="eksporKartuPdf"
                :disabled="exportingKartuPdf"
                aria-label="Ekspor kartu kenaikan PDF A4"
                title="Download Kartu Kenaikan sebagai PDF (A4 portrait)"
                class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer no-print"
              >
                <i :class="['fas', exportingKartuPdf ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i>
                {{ exportingKartuPdf ? 'Mengekspor…' : 'Ekspor PDF' }}
              </button>
              <button
                @click="saveKartu"
                :disabled="savingKartu"
                class="px-4 py-2 text-sm font-black rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:opacity-50 cursor-pointer flex items-center gap-1.5 no-print"
              >
                <i :class="['fas', savingKartu ? 'fa-spinner fa-spin' : 'fa-save']"></i>
                {{ savingKartu ? 'Menyimpan...' : 'Simpan Kartu' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Modal Form Kenaikan (simple) -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="formOpen"
          class="fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto"
          @click.self="formOpen = false"
        >
          <div
            class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-lg w-full my-4 border-t-8 border-teal-600 flex flex-col max-h-[90vh]"
          >
            <header
              class="flex justify-between items-center border-b border-[var(--border-subtle)] px-5 py-4"
            >
              <h3 class="text-lg md:text-xl font-black text-[var(--text-primary)]">
                <i class="fas fa-arrow-up mr-2 text-cyan-600"></i>Form Kenaikan
              </h3>
              <button
                @click="formOpen = false"
                class="text-[var(--text-tertiary)] hover:text-rose-500 text-2xl font-bold w-8 h-8 rounded-full bg-[var(--bg-muted)] flex items-center justify-center cursor-pointer"
              >
                ×
              </button>
            </header>
            <div class="overflow-y-auto p-5 space-y-4">
              <div
                class="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl border border-cyan-100 dark:border-cyan-800"
              >
                <p
                  class="text-[10px] text-cyan-600 dark:text-cyan-300 font-black uppercase tracking-widest mb-1"
                >
                  Identitas Santri
                </p>
                <strong class="text-[var(--text-primary)] text-lg font-black leading-tight">
                  {{ formSantri?.nama || '-' }}
                </strong>
                <p class="text-[11px] text-[var(--text-secondary)] mt-1">
                  Saat ini: {{ formSantri?.lembaga || '-'
                  }}{{ formSantri?.kelas ? ' · ' + formSantri.kelas : '' }}
                </p>
              </div>

              <div v-if="!formIsSekolah">
                <label
                  class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase tracking-wide"
                >
                  Kelas Sekolah (Perbarui Jika Naik)
                </label>
                <select
                  v-model="formData.kelas_sekolah"
                  class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)] cursor-pointer"
                >
                  <option value="">-- Pilih / Kosong --</option>
                  <option v-for="ks in KELAS_SEKOLAH_LIST" :key="ks" :value="ks">{{ ks }}</option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label
                    class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase tracking-wide"
                  >
                    {{ formIsSekolah ? 'Lembaga Sekolah' : 'Lembaga Baru' }}
                  </label>
                  <select
                    v-model="formData.lembaga"
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)] cursor-pointer"
                  >
                    <option value="">-- Pilih Lembaga --</option>
                    <option v-for="l in formLembagaOptions" :key="l" :value="l">{{ l }}</option>
                  </select>
                </div>
                <div>
                  <label
                    class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase tracking-wide"
                  >
                    Kelas/Jilid Baru
                  </label>
                  <select
                    v-model="formData.kelas"
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)] cursor-pointer"
                  >
                    <option value="">-- Pilih --</option>
                    <option v-for="kl in kelasOptions" :key="kl" :value="kl">{{ kl }}</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  class="block text-xs font-black text-cyan-800 dark:text-cyan-300 mb-1 uppercase tracking-wide"
                >
                  Guru Kelas Baru (Perbarui Jika Pindah Kelas)
                </label>
                <select
                  v-model="formData.guru"
                  class="w-full px-3 py-2 text-sm border border-cyan-300 dark:border-cyan-700 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 text-cyan-900 dark:text-cyan-100 cursor-pointer"
                >
                  <option value="">-- Pilih Guru --</option>
                  <option v-for="g in guruOptions" :key="g" :value="g">{{ g }}</option>
                </select>
              </div>

              <div
                v-if="
                  String(formData.lembaga || '')
                    .toLowerCase()
                    .trim() === 'ptpt'
                "
              >
                <label class="block text-xs font-black text-rose-600 mb-1 uppercase tracking-wide">
                  Naik Juz Berapa? (PTPT)
                </label>
                <select
                  v-model="formData.juz"
                  class="w-full px-3 py-2 text-sm border border-rose-300 dark:border-rose-700 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-900 dark:text-rose-100 cursor-pointer"
                >
                  <option value="">-- Pilih Juz --</option>
                  <option v-for="n in juzRangeForKelas" :key="n" :value="n">JUZ {{ n }}</option>
                </select>
              </div>

              <div
                v-if="
                  String(formData.lembaga || '')
                    .toLowerCase()
                    .trim() === 'pra ptpt'
                "
              >
                <label
                  class="block text-xs font-black text-teal-600 mb-1 uppercase tracking-wide"
                >
                  Khotam Ke? (Pra PTPT)
                </label>
                <select
                  v-model="formData.khotam_ke"
                  class="w-full px-3 py-2 text-sm border border-teal-300 dark:border-teal-700 rounded-lg bg-teal-50 dark:bg-teal-900/20 text-teal-900 dark:text-teal-100 cursor-pointer"
                >
                  <option value="">-- Pilih Khotam --</option>
                  <option v-for="kh in khotamOptions" :key="kh" :value="kh">Khotam {{ kh }}</option>
                </select>
              </div>

              <div>
                <label
                  class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase tracking-wide"
                >
                  <i class="fas fa-comment-dots mr-1 text-cyan-500"></i>Catatan / Rekomendasi
                  (Opsional)
                </label>
                <textarea
                  v-model="formData.catatan"
                  rows="3"
                  placeholder="Tulis catatan atau rekomendasi guru saat kenaikan ini..."
                  class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)] resize-none"
                ></textarea>
              </div>
            </div>
            <footer
              class="flex items-center justify-end gap-2 px-5 py-4 border-t border-[var(--border-subtle)] bg-slate-50 dark:bg-slate-700/30 rounded-b-2xl"
            >
              <button
                type="button"
                @click="formOpen = false"
                class="text-xs font-bold px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-[var(--text-primary)] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                @click="saveFormKenaikan"
                :disabled="savingForm"
                class="text-xs font-black px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
              >
                <i v-if="savingForm" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-check"></i>
                {{ savingForm ? 'Menyimpan…' : 'Simpan Kenaikan' }}
              </button>
            </footer>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { definePageActions } from '@/composables/useRibbonContext'
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useGuru } from '@/composables/useGuru'
import { useExcel } from '@/composables/useExcel'
import { useLembaga, getPkbmSubTier } from '@/composables/useLembaga'
import { sortSantri } from '@/utils/santriSort'
import { LEMBAGA_KENAIKAN_LIST, LEMBAGA_KENAIKAN_SEKOLAH, getKartuKenaikanSchema, getKopKartuLembaga } from '@/utils/kenaikan'
import { buildListPdf, createPdf, drawTable, savePdf } from '@/utils/pdfBuilder'
import { imageToDataURL } from '@/services/pdf'

const authStore = useAuthStore()
const settingsStore = useSettingsStore()
const toast = useToast()
const { guruRaw } = useGuru()
const { exportStyled } = useExcel()
const { lembagaRaw } = useLembaga()

// ────────── ROLE FLAGS ──────────
const isAdmin = computed(() => {
  const sa = authStore.sesiAktif
  const rs = sa?.role_sistem || ''
  return sa?.role === 'admin' || ['admin', 'super_admin'].includes(rs)
})
const isGuru = computed(() => {
  const sa = authStore.sesiAktif
  return sa?.role === 'guru' && sa?.role_sistem !== 'super_admin' && sa?.id !== 'admin'
})
const isSantriRole = computed(() => authStore.sesiAktif?.role === 'santri')

// ────────── STATE: santri list ──────────
const santriList = ref([])
const loadingSantri = ref(true)
const searchFormSantri = ref('')
const filterLembaga = ref('')
// v.99: kenaikan kategori (Qiraati / Sekolah) — sekolah pakai lembaga_sekolah (SMP/SMA = sub-tier PKBM)
const kenaikanKategori = ref('qiraati')
const SEKOLAH_KENAIKAN = ['TK', 'SDI', 'SMP', 'SMA']
const kenaikanLembagaOptions = computed(() =>
  kenaikanKategori.value === 'sekolah' ? SEKOLAH_KENAIKAN : LEMBAGA_KENAIKAN_LIST
)
// v.100 Batch6: Pengaturan KOP/Schema kini mencakup lembaga Qiraati + Sekolah
const pengaturanLembagaList = computed(() => [...LEMBAGA_KENAIKAN_LIST, ...LEMBAGA_KENAIKAN_SEKOLAH])
const activeTab = ref('form')

// v.98 full-native (Electron): sub-menu Naik Kelas -> grup pita "Aksi Halaman"; tab switcher in-page disembunyikan
const { isElectron: isDesktop } = useDesktopShell()
definePageActions(() => {
  if (!(isAdmin.value || isGuru.value)) return []
  const acts = [
    { label: 'Form Kenaikan', icon: 'edit', primary: activeTab.value === 'form', on: () => { activeTab.value = 'form' } },
    { label: 'Riwayat Kenaikan', icon: 'refresh', primary: activeTab.value === 'riwayat', on: () => { activeTab.value = 'riwayat' } }
  ]
  if (isAdmin.value) acts.push({ label: 'Pengaturan', icon: 'gear', primary: activeTab.value === 'pengaturan', on: () => { activeTab.value = 'pengaturan' } })
  if (isAdmin.value) acts.push({ label: 'Mutasi', icon: 'logout', primary: activeTab.value === 'mutasi', on: () => { activeTab.value = 'mutasi' } })
  return acts
})

// ────────── v.99: MUTASI (keluar) santri — sub-menu Kenaikan/Mutasi. Pola: kategori → lembaga → list → keluarkan ──────────
const mutasiKategori = ref('') // '' | 'qiraati' | 'sekolah'
const mutasiLembaga = ref('')
const mutasiTgl = ref(new Date().toISOString().slice(0, 10))
const mutasiAlasan = ref('')
const mutasiAlasanLain = ref('')
const mutasiSearch = ref('')
const mutasiShowKeluar = ref(false)
const mutasiSaving = ref(false)
const QIRAATI_MUT = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH']
const SEKOLAH_MUT = ['TK', 'SDI', 'SMP', 'SMA']
const mutasiLembagaOptions = computed(() => {
  if (mutasiKategori.value === 'qiraati') {
    const fromM = (lembagaRaw.value || []).filter((l) => QIRAATI_MUT.includes(l.lembaga)).map((l) => l.lembaga)
    return fromM.length ? [...new Set(fromM)] : QIRAATI_MUT
  }
  if (mutasiKategori.value === 'sekolah') return SEKOLAH_MUT
  return []
})
function mutasiMatch(s) {
  const lmb = mutasiLembaga.value
  if (!lmb) return false
  if (mutasiKategori.value === 'qiraati') {
    return String(s.lembaga || '').trim().toLowerCase() === lmb.toLowerCase()
  }
  if (lmb === 'SMP' || lmb === 'SMA') {
    const isPk = String(s.lembaga_sekolah || '').trim().toUpperCase() === 'PKBM'
    return isPk && getPkbmSubTier(s.kelas_sekolah || s.kelas) === lmb
  }
  return String(s.lembaga_sekolah || '').trim().toLowerCase() === lmb.toLowerCase()
}
const mutasiCandidates = computed(() => {
  if (!mutasiLembaga.value) return []
  const kw = mutasiSearch.value.trim().toLowerCase()
  let list = (santriList.value || []).filter((s) => {
    const stateOk = mutasiShowKeluar.value ? s.aktif === false : s.aktif !== false
    return stateOk && mutasiMatch(s)
  })
  if (kw) list = list.filter((s) => String(s.nama || '').toLowerCase().includes(kw) || String(s.nis || '').toLowerCase().includes(kw))
  return sortSantri(list)
})
function mutasiKelasLabel(s) {
  return mutasiKategori.value === 'qiraati' ? (s.kelas || '-') : (s.kelas_sekolah || s.kelas || '-')
}
async function keluarkanSantri(s) {
  const alasan = mutasiAlasan.value === 'Lainnya' ? (mutasiAlasanLain.value.trim() || 'Lainnya') : mutasiAlasan.value
  if (!alasan) { toast.warning('Pilih alasan keluar dulu'); return }
  mutasiSaving.value = true
  try {
    await setDoc(doc(db, 'santri', String(s.id)), {
      aktif: false, tgl_keluar: mutasiTgl.value || new Date().toISOString().slice(0, 10), alasan_keluar: alasan
    }, { merge: true })
    s.aktif = false; s.tgl_keluar = mutasiTgl.value; s.alasan_keluar = alasan
    santriList.value = [...santriList.value]
    toast.success(`${s.nama} ditandai keluar (${alasan})`)
  } catch (e) { toast.error('Gagal: ' + (e.message || e)) } finally { mutasiSaving.value = false }
}
async function reaktifSantri(s) {
  mutasiSaving.value = true
  try {
    await setDoc(doc(db, 'santri', String(s.id)), { aktif: true, tgl_keluar: '', alasan_keluar: '' }, { merge: true })
    s.aktif = true; s.tgl_keluar = ''; s.alasan_keluar = ''
    santriList.value = [...santriList.value]
    toast.success(`${s.nama} diaktifkan kembali`)
  } catch (e) { toast.error('Gagal: ' + (e.message || e)) } finally { mutasiSaving.value = false }
}

// Color helper per lembaga (active/inactive)
const LEMBAGA_COLOR_MAP = {
  'TPQ Pagi': {
    active: 'bg-emerald-600 text-white border border-emerald-700 ring-2 ring-emerald-200',
    inactive:
      'bg-white dark:bg-slate-900 text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
  },
  'TPQ Sore': {
    active: 'bg-teal-600 text-white border border-teal-700 ring-2 ring-teal-200',
    inactive: 'bg-white dark:bg-slate-900 text-teal-700 border border-teal-300 hover:bg-teal-50'
  },
  'Pra PTPT': {
    active: 'bg-teal-700 text-white border border-teal-800 ring-2 ring-teal-200',
    inactive: 'bg-white dark:bg-slate-900 text-teal-700 border border-teal-300 hover:bg-teal-50'
  },
  PTPT: {
    active: 'bg-cyan-600 text-white border border-cyan-700 ring-2 ring-cyan-200',
    inactive:
      'bg-white dark:bg-slate-900 text-cyan-700 border border-cyan-300 hover:bg-cyan-50'
  },
  PPPH: {
    active: 'bg-cyan-600 text-white border border-cyan-700 ring-2 ring-cyan-200',
    inactive: 'bg-white dark:bg-slate-900 text-cyan-700 border border-cyan-300 hover:bg-cyan-50'
  }
}
function lembagaColor(l, active) {
  const c = LEMBAGA_COLOR_MAP[l] || LEMBAGA_COLOR_MAP.PTPT
  return active ? c.active : c.inactive
}

// ────────── Santri (untuk role santri) ──────────
const mySantri = computed(() => {
  const sa = authStore.sesiAktif
  if (!sa || sa.role !== 'santri') return null
  const sid = String(sa.id || '')
  return santriList.value.find((s) => String(s.id) === sid) || null
})

// ────────── Filtered santri for form tab (shift-aware) ──────────
const filteredFormSantri = computed(() => {
  // Guru-only mode: show only santri owned by guru (guru / guru_pagi / guru_sore)
  if (isGuru.value) {
    let list = santriList.value.filter((s) => s.aktif !== false)
    const sa = authStore.sesiAktif
    const gname = sa?.guru || sa?.nama
    list = list.filter((s) => s.guru === gname || s.guru_pagi === gname || s.guru_sore === gname)
    if (searchFormSantri.value) {
      const kw = searchFormSantri.value.toLowerCase()
      list = list.filter((s) =>
        String(s.nama || '')
          .toLowerCase()
          .includes(kw)
      )
    }
    return sortSantri(list, { lembagaField: 'lembaga', kelasField: 'kelas' })
  }
  if (!filterLembaga.value) return []
  let list
  const fl = String(filterLembaga.value).toUpperCase().trim()
  if (fl === 'TPQ PAGI' || fl === 'TPQ SORE') {
    const wantShift = fl === 'TPQ PAGI' ? 'pagi' : 'sore'
    list = santriList.value.filter((s) => {
      if (s.aktif === false) return false
      const lmb = String(s.lembaga || '')
        .toUpperCase()
        .trim()
      const sh = String(s.shift || '')
        .toLowerCase()
        .trim()
      return (
        (lmb === 'TPQ' && sh === wantShift) ||
        lmb === fl ||
        (lmb === 'TPQ' && !sh && wantShift === 'pagi')
      )
    })
  } else if (fl === 'TPQ') {
    list = santriList.value.filter((s) => {
      const lmb = String(s.lembaga || '')
        .toUpperCase()
        .trim()
      return (lmb === 'TPQ PAGI' || lmb === 'TPQ SORE' || lmb === 'TPQ') && s.aktif !== false
    })
  } else if (fl === 'PRA PTPT') {
    list = santriList.value.filter((s) => {
      const lmb = String(s.lembaga || '')
        .toUpperCase()
        .trim()
      return (lmb === 'PRA PTPT' || lmb === 'PRA-PTPT' || lmb === 'PRA_PTPT') && s.aktif !== false
    })
  } else if (fl === 'PPPH') {
    list = santriList.value.filter((s) => {
      const lmb = String(s.lembaga || '')
        .toUpperCase()
        .trim()
      return (lmb === 'PPPH' || lmb === 'P3H') && s.aktif !== false
    })
  } else if (['TK', 'SDI', 'SMP', 'SMA', 'PKBM'].includes(fl)) {
    // v.99: kenaikan lembaga SEKOLAH — match lembaga_sekolah (SMP/SMA = sub-tier PKBM dari kelas)
    list = santriList.value.filter((s) => {
      if (s.aktif === false) return false
      if (fl === 'SMP' || fl === 'SMA') {
        return String(s.lembaga_sekolah || '').toUpperCase().trim() === 'PKBM' &&
          getPkbmSubTier(s.kelas_sekolah || s.kelas) === fl
      }
      return String(s.lembaga_sekolah || '').toUpperCase().trim() === fl
    })
  } else {
    list = santriList.value.filter(
      (s) =>
        String(s.lembaga || '')
          .toUpperCase()
          .trim() === fl && s.aktif !== false
    )
  }
  if (isGuru.value) {
    const sa = authStore.sesiAktif
    const gname = sa?.guru || sa?.nama
    list = list.filter((s) => s.guru === gname || s.guru_pagi === gname || s.guru_sore === gname)
  }
  if (searchFormSantri.value) {
    const kw = searchFormSantri.value.toLowerCase()
    list = list.filter((s) =>
      String(s.nama || '')
        .toLowerCase()
        .includes(kw)
    )
  }
  return sortSantri(list, { lembagaField: 'lembaga', kelasField: 'kelas' })
})

// ────────── Riwayat tab ──────────
const riwayatLembaga = ref('')
const riwayatSearch = ref('')
const riwayatList = computed(() => {
  if (!riwayatLembaga.value) return []
  let list
  // v.21.74: shift-aware untuk TPQ Pagi/Sore (santri.lembaga = 'TPQ' + shift, atau langsung 'TPQ Pagi'/'TPQ Sore')
  if (riwayatLembaga.value === 'TPQ Pagi') {
    list = santriList.value.filter(
      (s) =>
        s.aktif !== false &&
        (s.lembaga === 'TPQ Pagi' ||
          (s.lembaga === 'TPQ' && String(s.shift || '').toLowerCase().trim() === 'pagi'))
    )
  } else if (riwayatLembaga.value === 'TPQ Sore') {
    list = santriList.value.filter(
      (s) =>
        s.aktif !== false &&
        (s.lembaga === 'TPQ Sore' ||
          (s.lembaga === 'TPQ' && String(s.shift || '').toLowerCase().trim() === 'sore'))
    )
  } else if (riwayatLembaga.value === 'TPQ') {
    list = santriList.value.filter(
      (s) =>
        (s.lembaga === 'TPQ Pagi' || s.lembaga === 'TPQ Sore' || s.lembaga === 'TPQ') &&
        s.aktif !== false
    )
  } else if (riwayatLembaga.value === 'PPPH') {
    list = santriList.value.filter(
      (s) => (s.lembaga === 'PPPH' || s.lembaga === 'P3H') && s.aktif !== false
    )
  } else if (LEMBAGA_KENAIKAN_SEKOLAH.includes(riwayatLembaga.value)) {
    // v.100 Batch6: riwayat lembaga SEKOLAH — match lembaga_sekolah (SMP/SMA = sub-tier PKBM dari kelas)
    const rl = riwayatLembaga.value
    list = santriList.value.filter((s) => {
      if (s.aktif === false) return false
      if (rl === 'SMP' || rl === 'SMA') {
        return (
          String(s.lembaga_sekolah || '').toUpperCase().trim() === 'PKBM' &&
          getPkbmSubTier(s.kelas_sekolah || s.kelas) === rl
        )
      }
      return String(s.lembaga_sekolah || '').toUpperCase().trim() === rl
    })
  } else {
    list = santriList.value.filter((s) => s.lembaga === riwayatLembaga.value && s.aktif !== false)
  }
  if (riwayatSearch.value) {
    const kw = riwayatSearch.value.toLowerCase()
    list = list.filter((s) =>
      String(s.nama || '')
        .toLowerCase()
        .includes(kw)
    )
  }
  return sortSantri(list, { lembagaField: 'lembaga', kelasField: 'kelas' })
})

function countTanggalTerisi(s, lembaga) {
  const block = s.kartu_kenaikan?.[lembaga]
  if (!block) return 0
  let n = 0
  for (const kls of Object.values(block)) {
    if (!kls || typeof kls !== 'object') continue
    for (const v of Object.values(kls)) {
      if (v) n++
    }
  }
  return n
}

function countCatatan(s, lembaga) {
  const block = s.kartu_kenaikan?.[lembaga]
  if (!block) return 0
  let n = 0
  for (const kls of Object.values(block)) {
    if (!kls || typeof kls !== 'object') continue
    if (Array.isArray(kls.entries)) {
      n += kls.entries.filter((e) => e && e.text).length
    }
    if (typeof kls.catatan === 'string' && kls.catatan.trim()) n++
    if (typeof kls.rekomendasi === 'string' && kls.rekomendasi.trim()) n++
  }
  return n
}

function latestCatatan(s, lembaga, max = 3) {
  const block = s.kartu_kenaikan?.[lembaga]
  if (!block) return []
  const arr = []
  for (const [kelasId, kls] of Object.entries(block)) {
    if (!kls || typeof kls !== 'object') continue
    if (Array.isArray(kls.entries)) {
      for (const e of kls.entries) {
        if (!e || !e.text) continue
        arr.push({
          kelasId,
          tanggal: e.tanggal || '',
          tipe: e.tipe || 'catatan',
          text: e.text
        })
      }
    }
    if (typeof kls.catatan === 'string' && kls.catatan.trim()) {
      arr.push({ kelasId, tanggal: '', tipe: 'catatan', text: kls.catatan.trim() })
    }
    if (typeof kls.rekomendasi === 'string' && kls.rekomendasi.trim()) {
      arr.push({ kelasId, tanggal: '', tipe: 'rekomendasi', text: kls.rekomendasi.trim() })
    }
  }
  arr.sort((a, b) => (b.tanggal || '').localeCompare(a.tanggal || ''))
  return arr.slice(0, max)
}

const expanded = ref(new Set())
function toggleExpand(id) {
  if (expanded.value.has(id)) expanded.value.delete(id)
  else expanded.value.add(id)
  expanded.value = new Set(expanded.value)
}

// ────────── Excel export Riwayat ──────────
const exportingExcel = ref(false)
async function exportRiwayatExcel() {
  if (!riwayatLembaga.value || !riwayatList.value.length) return
  exportingExcel.value = true
  try {
    const rows = []
    const target = riwayatLembaga.value
    const lembagaKeys =
      target === 'TPQ'
        ? ['TPQ Pagi', 'TPQ Sore', 'TPQ']
        : target === 'PPPH'
          ? ['PPPH', 'P3H']
          : [target]
    for (const s of riwayatList.value) {
      const block = s.kartu_kenaikan || {}
      let any = false
      for (const lk of lembagaKeys) {
        const lblock = block[lk]
        if (!lblock || typeof lblock !== 'object') continue
        for (const [klsLbl, kls] of Object.entries(lblock)) {
          if (!kls || typeof kls !== 'object') continue
          for (const [itemKey, val] of Object.entries(kls)) {
            if (!val) continue
            const data = typeof val === 'object' ? val : { tanggal: String(val) }
            rows.push({
              Nama: s.nama || '',
              Lembaga: lk,
              Kelas: klsLbl,
              Khotam: itemKey,
              Tanggal: data.tanggal || data.tgl || '',
              Guru: data.guru || data.guru_penilai || '',
              Juz: data.juz || '',
              Catatan: data.catatan || data.rekomendasi || ''
            })
            any = true
          }
        }
      }
      if (!any) {
        rows.push({
          Nama: s.nama || '',
          Lembaga: target,
          Kelas: s.kelas || '',
          Khotam: '-',
          Tanggal: '-',
          Guru: '-',
          Juz: '-',
          Catatan: 'Belum ada riwayat'
        })
      }
    }
    rows.sort(
      (a, b) =>
        String(a.Nama).localeCompare(String(b.Nama)) ||
        String(a.Tanggal).localeCompare(String(b.Tanggal))
    )
    await exportStyled({
      filename: `Riwayat_Kenaikan_${target.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.xlsx`,
      sheetName: `Riwayat ${target}`,
      title: `RIWAYAT KENAIKAN — ${target}`,
      subtitle: `Per ${new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}`,
      columns: [
        { header: 'Nama Santri', key: 'Nama', width: 28 },
        { header: 'Lembaga', key: 'Lembaga', width: 14 },
        { header: 'Kelas/Level', key: 'Kelas', width: 14 },
        { header: 'Khotam', key: 'Khotam', width: 10 },
        { header: 'Tanggal', key: 'Tanggal', width: 14 },
        { header: 'Guru Penilai', key: 'Guru', width: 22 },
        { header: 'Juz', key: 'Juz', width: 8 },
        { header: 'Catatan', key: 'Catatan', width: 36 }
      ],
      rows
    })
    toast.success(`${rows.length} baris Riwayat ${target} ter-eksport`)
  } catch (e) {
    toast.error('Gagal eksport: ' + (e.message || e))
  } finally {
    exportingExcel.value = false
  }
}

// ────────── Pengaturan: KOP + Schema editor ──────────
const pengaturanLembaga = ref('')
const kopForm = reactive({ judul: '', subjudul: '', alamat: '' })
const savingKop = ref(false)
const schemaDraft = ref({ itemHeader: 'Item', kelasList: [] })
const savingSchema = ref(false)

function loadSchemaForLembaga(lembaga) {
  if (!lembaga) {
    schemaDraft.value = { itemHeader: 'Item', kelasList: [] }
    return
  }
  schemaDraft.value = JSON.parse(
    JSON.stringify(getKartuKenaikanSchema(lembaga, settingsStore.settings))
  )
}

function addKelas() {
  if (!Array.isArray(schemaDraft.value.kelasList)) schemaDraft.value.kelasList = []
  const idx = schemaDraft.value.kelasList.length + 1
  schemaDraft.value.kelasList.push({
    id: 'kls_' + Date.now(),
    label: 'Kelas ' + idx,
    items: [{ id: 'it_' + Date.now(), label: '1' }],
    ceremonial: false
  })
}

function resetSchema() {
  if (!pengaturanLembaga.value) return
  const all = { ...(settingsStore.settings?.kartuKenaikanSchema || {}) }
  delete all[pengaturanLembaga.value]
  schemaDraft.value = JSON.parse(
    JSON.stringify(
      getKartuKenaikanSchema(pengaturanLembaga.value, {
        ...settingsStore.settings,
        kartuKenaikanSchema: all
      })
    )
  )
  toast.info('Schema di-reset ke default. Klik Simpan untuk apply.')
}

async function saveSchema() {
  if (!pengaturanLembaga.value) return
  savingSchema.value = true
  try {
    const all = { ...(settingsStore.settings?.kartuKenaikanSchema || {}) }
    all[pengaturanLembaga.value] = JSON.parse(JSON.stringify(schemaDraft.value))
    await setDoc(doc(db, 'settings', 'general'), { kartuKenaikanSchema: all }, { merge: true })
    await setDoc(doc(db, 'settings', 'web'), { kartuKenaikanSchema: all }, { merge: true })
    settingsStore.settings.kartuKenaikanSchema = all
    toast.success('Schema kartu kenaikan tersimpan')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    savingSchema.value = false
  }
}

function selectPengaturanLembaga(lembaga) {
  loadSchemaForLembaga(lembaga)
  pengaturanLembaga.value = lembaga
  const kopAll =
    settingsStore.settings?.kopKartuKenaikan || settingsStore.settings?.kartuKenaikanKop || {}
  const cur = kopAll[lembaga] || {}
  kopForm.judul = cur.judul || ''
  kopForm.subjudul = cur.subjudul || ''
  kopForm.alamat = cur.alamat || ''
}

async function saveKop() {
  if (!pengaturanLembaga.value) {
    toast.warning('Pilih lembaga dulu')
    return
  }
  savingKop.value = true
  try {
    const all1 = { ...(settingsStore.settings?.kopKartuKenaikan || {}) }
    const all2 = { ...(settingsStore.settings?.kartuKenaikanKop || {}) }
    const payload = {
      judul: kopForm.judul.trim(),
      subjudul: kopForm.subjudul.trim(),
      alamat: kopForm.alamat.trim()
    }
    all1[pengaturanLembaga.value] = payload
    all2[pengaturanLembaga.value] = payload
    await setDoc(
      doc(db, 'settings', 'general'),
      { kopKartuKenaikan: all1, kartuKenaikanKop: all2 },
      { merge: true }
    )
    await setDoc(
      doc(db, 'settings', 'web'),
      { kopKartuKenaikan: all1, kartuKenaikanKop: all2 },
      { merge: true }
    )
    settingsStore.settings.kopKartuKenaikan = all1
    settingsStore.settings.kartuKenaikanKop = all2
    toast.success(`KOP ${pengaturanLembaga.value} tersimpan`)
  } catch (e) {
    toast.error('Gagal simpan: ' + (e.message || e))
  } finally {
    savingKop.value = false
  }
}

// ────────── Modal Kartu Kenaikan (matrix) ──────────
const kartuOpen = ref(false)
const kartuSantri = ref(null)
const kartuLembaga = ref('')
const schema = ref({ itemHeader: 'Item', kelasList: [] })
const cellData = ref({})
const savingKartu = ref(false)

const kopHeader = computed(() => getKopKartuLembaga(kartuLembaga.value, settingsStore.settings))
// v.100 Batch6: kartu lembaga sekolah → ceremonial ditampilkan sebagai "Kelulusan"
const kartuCeremonialLabel = computed(() =>
  LEMBAGA_KENAIKAN_SEKOLAH.includes(kartuLembaga.value) ? 'Kelulusan' : 'Ceremonial'
)

function openKartu(s) {
  kartuSantri.value = s
  const lemb = filterLembaga.value || s.lembaga
  kartuLembaga.value = lemb
  schema.value = getKartuKenaikanSchema(lemb, settingsStore.settings)
  cellData.value =
    s.kartu_kenaikan && s.kartu_kenaikan[lemb]
      ? JSON.parse(JSON.stringify(s.kartu_kenaikan[lemb]))
      : {}
  kartuOpen.value = true
}

function closeKartu() {
  kartuOpen.value = false
  kartuSantri.value = null
  cellData.value = {}
}

async function saveKartu() {
  if (!kartuSantri.value) return
  savingKartu.value = true
  try {
    const sid = kartuSantri.value.id
    const merged = {
      ...(kartuSantri.value.kartu_kenaikan || {}),
      [kartuLembaga.value]: cellData.value
    }
    await updateDoc(doc(db, 'santri', String(sid)), { kartu_kenaikan: merged })
    kartuSantri.value.kartu_kenaikan = merged
    const idx = santriList.value.findIndex((x) => x.id === sid)
    if (idx >= 0) santriList.value[idx].kartu_kenaikan = merged
    toast.success(`Tersimpan untuk ${kartuSantri.value.nama}`)
    closeKartu()
  } catch (e) {
    toast.error('Gagal simpan: ' + (e.message || e))
  } finally {
    savingKartu.value = false
  }
}

function getCell(kelasId, itemId) {
  return cellData.value[kelasId]?.[itemId] || ''
}

function setCell(kelasId, itemId, val) {
  if (!cellData.value[kelasId]) cellData.value[kelasId] = {}
  if (val) cellData.value[kelasId][itemId] = val
  else delete cellData.value[kelasId][itemId]
}

function getCeremonial(kelasId) {
  return cellData.value[kelasId]?.ceremonial || ''
}

function setCeremonial(kelasId, val) {
  if (!cellData.value[kelasId]) cellData.value[kelasId] = {}
  if (val) cellData.value[kelasId].ceremonial = val
  else delete cellData.value[kelasId].ceremonial
}

// ────────── Catatan & Rekomendasi per kelas (inside matrix modal) ──────────
const noteFormOpen = ref({})
const noteDraft = ref({})

function getEntries(kelasId) {
  const block = cellData.value[kelasId]
  const entries = block?.entries
  if (!Array.isArray(entries)) {
    const arr = []
    const cat = block?.catatan
    const rek = block?.rekomendasi
    if (typeof cat === 'string' && cat.trim()) {
      arr.push({ tanggal: '', itemId: '', tipe: 'catatan', text: cat })
    }
    if (typeof rek === 'string' && rek.trim()) {
      arr.push({ tanggal: '', itemId: '', tipe: 'rekomendasi', text: rek })
    }
    return arr
  }
  return entries.slice().sort((a, b) => (b.tanggal || '').localeCompare(a.tanggal || ''))
}

function toggleNoteForm(kelasId) {
  if (noteFormOpen.value[kelasId]) {
    noteFormOpen.value[kelasId] = false
    return
  }
  noteFormOpen.value = { ...noteFormOpen.value, [kelasId]: true }
  const k = schema.value.kelasList.find((x) => x.id === kelasId)
  const defaultItemId = k?.items?.[0]?.id || 'ceremonial'
  noteDraft.value = {
    ...noteDraft.value,
    [kelasId]: {
      tanggal: new Date().toISOString().slice(0, 10),
      itemId: defaultItemId,
      tipe: 'catatan',
      text: ''
    }
  }
}

function saveNoteEntry(kelasId) {
  const d = noteDraft.value[kelasId]
  if (!d || !d.text.trim()) {
    toast.warning('Tulis text catatan/rekomendasi dulu')
    return
  }
  if (!cellData.value[kelasId]) cellData.value[kelasId] = {}
  const block = cellData.value[kelasId]
  if (!Array.isArray(block.entries)) {
    const arr = []
    if (typeof block.catatan === 'string' && block.catatan.trim()) {
      arr.push({ tanggal: '', itemId: '', tipe: 'catatan', text: block.catatan })
    }
    if (typeof block.rekomendasi === 'string' && block.rekomendasi.trim()) {
      arr.push({ tanggal: '', itemId: '', tipe: 'rekomendasi', text: block.rekomendasi })
    }
    block.entries = arr
    delete block.catatan
    delete block.rekomendasi
  }
  block.entries.push({
    tanggal: d.tanggal,
    itemId: d.itemId,
    tipe: d.tipe,
    text: d.text.trim()
  })
  d.text = ''
  noteFormOpen.value[kelasId] = false
  toast.success('Entry ditambahkan (jangan lupa Simpan Kartu)')
}

function removeEntry(kelasId, displayIdx) {
  if (!confirm('Hapus entry ini?')) return
  const block = cellData.value[kelasId]
  const list = block?.entries
  if (!Array.isArray(list)) return
  const target = getEntries(kelasId)[displayIdx]
  const realIdx = list.findIndex(
    (e) =>
      e.tanggal === target.tanggal &&
      e.itemId === target.itemId &&
      e.tipe === target.tipe &&
      e.text === target.text
  )
  if (realIdx >= 0) list.splice(realIdx, 1)
}

function labelItem(kelas, itemId) {
  if (itemId === 'ceremonial') return 'Ceremonial'
  if (!itemId) return '—'
  const it = kelas.items?.find((x) => x.id === itemId)
  return it ? it.label : itemId
}

function formatDate(s) {
  if (!s) return '-'
  try {
    return new Date(s).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    })
  } catch {
    return s
  }
}

// ────────── Modal Form Kenaikan (simple — quick promote) ──────────
const formOpen = ref(false)
const formSantri = ref(null)
const formData = ref({
  kelas_sekolah: '',
  lembaga: '',
  kelas: '',
  guru: '',
  juz: '',
  khotam_ke: '',
  catatan: '',
  tanggal: ''
})
const savingForm = ref(false)
// v.100 Batch6: mode form sekolah (kenaikan kelas sekolah, bukan jilid/juz Qiraati)
const formIsSekolah = ref(false)
const formLembagaOptions = computed(() =>
  formIsSekolah.value ? LEMBAGA_KENAIKAN_SEKOLAH : LEMBAGA_KENAIKAN_LIST
)
const SEKOLAH_KELAS_MAP = {
  TK: ['TK A', 'TK B'],
  SDI: ['I', 'II', 'III', 'IV', 'V', 'VI'],
  SMP: ['VII', 'VIII', 'IX'],
  SMA: ['X', 'XI', 'XII']
}
const KELAS_SEKOLAH_LIST = [
  'TPQ Pagi',
  'TK A',
  'TK B',
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII',
  'Lulus Sekolah'
]

const lembagaOptions = computed(() => {
  const arr = (lembagaRaw.value || []).map((l) => l.lembaga).filter(Boolean)
  if (arr.length === 0) {
    return ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH', 'SDI', 'PKBM']
  }
  return arr
})

const _KHOTAM_BASE = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']
const khotamOptions = computed(() => {
  // Pra PTPT: Level 1-2 (½, 1 juz) = 3 khotam; Level 3+ (1½ juz+) = up to 11 (variable per spec)
  const raw = String(formData.value.kelas || '').toLowerCase()
  let lv = 0
  if (raw.includes('½') || raw.includes('1/2')) {
    const m = raw.match(/(\d+)\s*[½]|(\d+)\s*1\/2/)
    if (m) lv = parseFloat(m[1] || m[2]) + 0.5
    else lv = 0.5
  } else {
    const m = raw.match(/(\d+)\s*juz/) || raw.match(/level\s*(\d+)/) || raw.match(/(\d+)/)
    lv = m ? parseFloat(m[1]) : 0
  }
  return lv >= 3 ? _KHOTAM_BASE : _KHOTAM_BASE.slice(0, 3)
})

const kelasOptions = computed(() => {
  // v.100 Batch6: mode sekolah — kelas dari peta lembaga sekolah
  if (formIsSekolah.value) {
    return SEKOLAH_KELAS_MAP[String(formData.value.lembaga || '').toUpperCase().trim()] || []
  }
  const lmb = String(formData.value.lembaga || '')
    .toLowerCase()
    .trim()
  if (!lmb) return []
  // v.21.71: CANONICAL FIRST per spec kyai 26 Mei 2026 — override Firestore (master/lembaga doc bisa stale)
  if (lmb === 'tpq' || lmb === 'tpq pagi' || lmb === 'tpq sore') {
    return ['Jilid 1A', 'Jilid 1B', 'Jilid 1C', 'Jilid 2A', 'Jilid 2B', 'Jilid 3A', 'Jilid 3B', 'Jilid 4A', 'Jilid 4B', 'Jilid 5A', 'Jilid 5B', 'KPI', 'Persiapan Khotaman']
  }
  if (lmb === 'pra ptpt') return ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']
  if (lmb === 'ptpt') return ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6']
  if (lmb === 'ppph' || lmb === 'p3h') return ["Level 1 (Arba'in Nawawi)", 'Level 2 (Riyadhus Sholihin)', 'Level 3 (Shahih Bukhari)', 'Level 4 (Shahih Muslim)']
  // Fallback ke Firestore master/lembaga untuk lembaga lain
  const lemRow = (lembagaRaw.value || []).find(
    (l) =>
      String(l.lembaga || '')
        .toLowerCase()
        .trim() === lmb
  )
  if (lemRow) {
    if (Array.isArray(lemRow.kelas_list) && lemRow.kelas_list.length > 0) return lemRow.kelas_list
    if (Array.isArray(lemRow.kelas) && lemRow.kelas.length > 0) return lemRow.kelas
  }
  return []
})

// v.21.73: Range juz per kelas PTPT (Kelas 1 → 1-5, Kelas 2 → 6-10, ..., Kelas 6 → 26-30)
const juzRangeForKelas = computed(() => {
  const lmb = String(formData.value.lembaga || '').toLowerCase().trim()
  if (lmb !== 'ptpt') return Array.from({ length: 30 }, (_, i) => i + 1)
  const m = String(formData.value.kelas || '').match(/(\d+)/)
  if (!m) return Array.from({ length: 30 }, (_, i) => i + 1)
  const k = parseInt(m[1], 10)
  if (k < 1 || k > 6) return Array.from({ length: 30 }, (_, i) => i + 1)
  const start = (k - 1) * 5 + 1
  return Array.from({ length: 5 }, (_, i) => start + i)
})

const guruOptions = computed(() => {
  const lmb = formData.value.lembaga
  if (!lmb) return []
  // v.100 Batch6: mode sekolah — guru by lembaga_sekolah (SMP/SMA → PKBM)
  if (formIsSekolah.value) {
    const m = String(lmb).toUpperCase().trim()
    const target = m === 'SMP' || m === 'SMA' ? 'PKBM' : m
    return (guruRaw.value || [])
      .filter(
        (g) =>
          String(g.lembaga_sekolah || '').toUpperCase().trim() === target ||
          String(g.lembaga || '').toUpperCase().trim() === target
      )
      .map((g) => g.nama)
      .filter(Boolean)
  }
  return (guruRaw.value || [])
    .filter((g) => g.lembaga === lmb || g.lembaga_sekolah === lmb)
    .map((g) => g.nama)
    .filter(Boolean)
})

function openFormKenaikan(s) {
  formSantri.value = s
  // v.100 Batch6: mode SEKOLAH — admin di kategori sekolah (filterLembaga = TK/SDI/SMP/SMA)
  formIsSekolah.value = isAdmin.value && kenaikanKategori.value === 'sekolah'
  if (formIsSekolah.value) {
    const lmbSek = String(filterLembaga.value || '').toUpperCase().trim()
    formData.value = {
      tanggal: new Date().toISOString().slice(0, 10),
      kelas_sekolah: s.kelas_sekolah || '',
      lembaga: lmbSek, // TK/SDI/SMP/SMA (kunci kartu_kenaikan sekolah)
      kelas: s.kelas_sekolah || '', // kelas sekolah saat ini (pilih kelas baru utk naik)
      guru: Array.isArray(s.guru_sekolah) ? s.guru_sekolah[0] || '' : s.guru_sekolah || '',
      juz: '',
      khotam_ke: '',
      catatan: ''
    }
    formOpen.value = true
    return
  }
  // v.21.71: Resolve current lembaga ke canonical Qiraati only
  // Santri lembaga = "TPQ" (single) → resolve ke "TPQ Pagi"/"TPQ Sore" via shift
  let matched = ''
  const raw = String(s.lembaga || '').toLowerCase().trim()
  if (raw === 'tpq') {
    const shift = String(s.shift || '').toLowerCase().trim()
    matched = shift === 'sore' ? 'TPQ Sore' : 'TPQ Pagi'
  } else {
    // Case-insensitive match terhadap LEMBAGA_KENAIKAN_LIST (Qiraati only)
    matched = LEMBAGA_KENAIKAN_LIST.find((o) => o.toLowerCase().trim() === raw) || ''
  }
  // v.21.73: Auto-resolve kelas current untuk Pra PTPT & PTPT
  let resolvedKelas = s.kelas || ''
  if (matched === 'PTPT' || matched === 'Pra PTPT') {
    const num = String(s.kelas || '').match(/(\d+)/)
    if (num) {
      const label = matched === 'PTPT' ? 'Kelas' : 'Level'
      // Pra PTPT format pakai range juz suffix
      if (matched === 'Pra PTPT') {
        const labels = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']
        resolvedKelas = labels[parseInt(num[1], 10) - 1] || s.kelas || ''
      } else {
        resolvedKelas = `${label} ${num[1]}`
      }
    }
  }
  formData.value = {
    tanggal: new Date().toISOString().slice(0, 10),
    kelas_sekolah: s.kelas_sekolah || '',
    lembaga: matched, // auto-fill current lembaga
    kelas: resolvedKelas, // auto-fill current kelas (PTPT/Pra PTPT normalized)
    guru: Array.isArray(s.guru) ? s.guru[0] || '' : s.guru || '',
    juz: s.juz ? String(s.juz).replace(/\D/g, '') : '',
    khotam_ke: '',
    catatan: ''
  }
  formOpen.value = true
}

// v.21.75: Resolve kelas label dari Form Kenaikan ke schema {kelasId, itemId}
// PTPT: {kelas: "Kelas 1", juz: "5"} → {kelasId: "kelas_1", itemId: "juz_5"}
// Pra PTPT: {kelas: "Level 1", khotam_ke: "I"} → {kelasId: "lvl_1", itemId: "kh_I"}
// TPQ: {kelas: "Jilid 1A"} → {kelasId: "jilid_1", itemId: "1A"}
// PPPH: {kelas: "Level 1 (Arba'in Nawawi)"} → {kelasId: "lvl_1", itemId: "arb_done"}
function resolveKenaikanSchemaPath(lembaga, kelasLabel, juzNum, khotamKe) {
  if (!lembaga || !kelasLabel) return { kelasId: null, itemId: null }
  const schema = getKartuKenaikanSchema(lembaga, settingsStore.settings)
  if (!schema || !Array.isArray(schema.kelasList)) return { kelasId: null, itemId: null }

  // 1) Direct match: kelasLabel === parent.label (PTPT/Pra PTPT/PPPH/single-item TPQ)
  let kelasEntry = schema.kelasList.find((k) => k.label === kelasLabel)
  if (kelasEntry) {
    let itemId = null
    if (juzNum) {
      const it = kelasEntry.items.find((i) => i.label === `Juz ${juzNum}` || i.id === `juz_${juzNum}`)
      itemId = it?.id || null
    } else if (khotamKe) {
      const it = kelasEntry.items.find((i) => i.label === khotamKe || i.label === String(khotamKe).toUpperCase())
      itemId = it?.id || null
    } else if (kelasEntry.items.length === 1) {
      itemId = kelasEntry.items[0].id
    }
    return { kelasId: kelasEntry.id, itemId }
  }

  // 2) TPQ combined: "Jilid 1A" → parent "Jilid 1" + item "1A"
  // Strategi: untuk setiap (parent, item) pair, cek apakah parent.label.replace(trailing digit) + item.label match
  for (const parent of schema.kelasList) {
    for (const it of parent.items) {
      // Format candidates: "Jilid 1A" = parent.label[without trailing num] + item.label, atau gabung
      const stripped = parent.label.replace(/\s+\d+$/, '') // "Jilid 1" → "Jilid"
      const cand1 = `${stripped} ${it.label}`  // "Jilid 1A"
      const cand2 = `${parent.label}${it.label}`  // "Jilid 11A"
      const cand3 = `${parent.label} ${it.label}`  // "Jilid 1 1A"
      if (kelasLabel === cand1 || kelasLabel === cand2 || kelasLabel === cand3) {
        return { kelasId: parent.id, itemId: it.id }
      }
    }
  }

  return { kelasId: null, itemId: null }
}

// v.100 Batch6: simpan kenaikan kelas SEKOLAH (jalur terpisah, tak menyentuh logika Qiraati)
async function saveFormKenaikanSekolah() {
  const s = formSantri.value
  if (!s) return
  const lmb = String(formData.value.lembaga || '').toUpperCase().trim() // TK/SDI/SMP/SMA
  const kls = formData.value.kelas || ''
  if (!lmb || !kls) {
    toast.warning('Pilih lembaga & kelas sekolah dulu')
    return
  }
  savingForm.value = true
  try {
    const today = new Date().toISOString().slice(0, 10)
    const todayId = new Date().toLocaleDateString('id-ID')
    const payload = { kelas_sekolah: kls }
    // Guru wali kelas baru (non-destruktif: taruh di depan, pertahankan guru sekolah lain)
    if (formData.value.guru) {
      const existing = Array.isArray(s.guru_sekolah)
        ? s.guru_sekolah.filter(Boolean)
        : s.guru_sekolah
          ? [s.guru_sekolah]
          : []
      payload.guru_sekolah = Array.from(new Set([formData.value.guru, ...existing]))
    }
    // Kartu kenaikan: tanggal naik + kelulusan (ceremonial) di kelas akhir
    const kk = { ...(s.kartu_kenaikan || {}) }
    const resolved = resolveKenaikanSchemaPath(lmb, kls)
    if (resolved.kelasId) {
      if (!kk[lmb]) kk[lmb] = {}
      if (!kk[lmb][resolved.kelasId]) kk[lmb][resolved.kelasId] = {}
      const block = kk[lmb][resolved.kelasId]
      if (!Array.isArray(block.entries)) block.entries = []
      if (resolved.itemId) block[resolved.itemId] = today
      const schema = getKartuKenaikanSchema(lmb, settingsStore.settings)
      const lastKelas = (schema.kelasList || [])[(schema.kelasList || []).length - 1]
      if (lastKelas && lastKelas.id === resolved.kelasId) block.ceremonial = today
      if (formData.value.catatan && formData.value.catatan.trim()) {
        block.entries.push({
          tanggal: today,
          itemId: resolved.itemId || 'naik',
          tipe: 'catatan',
          text: formData.value.catatan.trim()
        })
      }
      payload.kartu_kenaikan = kk
    }
    // Riwayat (text)
    const riwayat = Array.isArray(s.riwayat) ? [...s.riwayat] : []
    let ket = `Naik ke ${lmb} Kelas ${kls}`
    if (formData.value.guru) ket += ` | Guru: ${formData.value.guru}`
    riwayat.push({
      tgl_naik: today,
      tanggal: todayId,
      keterangan: ket,
      lembaga: lmb,
      kelas_from: s.kelas_sekolah || '',
      kelas_to: kls,
      catatan: formData.value.catatan || '',
      guru: formData.value.guru || ''
    })
    payload.riwayat = riwayat
    // Riwayat kenaikan terstruktur
    const rkEntry = {
      tanggal: today,
      tanggal_display: todayId,
      dari_lembaga: lmb,
      dari_kelas: s.kelas_sekolah || '',
      ke_lembaga: lmb,
      ke_kelas: kls,
      khotam_ke: '',
      juz: ''
    }
    payload.riwayat_kenaikan = Array.isArray(s.riwayat_kenaikan)
      ? [...s.riwayat_kenaikan, rkEntry]
      : [rkEntry]
    await updateDoc(doc(db, 'santri', String(s.id)), payload)
    // Event kenaikan (sumber notif wali). Best-effort.
    try {
      const evId = `rk_${s.id}_${Date.now()}`
      await setDoc(doc(db, 'riwayat_kenaikan', evId), {
        id: evId,
        santri_id: String(s.id),
        santri_nama: s.nama || '',
        dari_lembaga: rkEntry.dari_lembaga,
        dari_kelas: rkEntry.dari_kelas,
        ke_lembaga: rkEntry.ke_lembaga,
        ke_kelas: rkEntry.ke_kelas,
        khotam_ke: '',
        tanggal: today,
        createdAt: new Date().toISOString()
      })
    } catch (e) {
      console.warn('[kenaikan-event] gagal tulis riwayat_kenaikan:', e?.message || e)
    }
    Object.assign(s, payload)
    const idx = santriList.value.findIndex((x) => String(x.id) === String(s.id))
    if (idx >= 0) Object.assign(santriList.value[idx], payload)
    toast.success(`Kenaikan ${s.nama} tersimpan`)
    formOpen.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    savingForm.value = false
  }
}

async function saveFormKenaikan() {
  // v.100 Batch6: alihkan ke jalur sekolah bila mode sekolah aktif
  if (formIsSekolah.value) return saveFormKenaikanSekolah()
  const s = formSantri.value
  if (!s) return

  // PATCH v.21.50 — Duplicate khotam check (Pra PTPT)
  const lmbBaru = formData.value.lembaga || ''
  const klsBaru = formData.value.kelas || ''
  const khotamKe = lmbBaru.toLowerCase().trim() === 'pra ptpt' ? formData.value.khotam_ke || '' : ''
  if (khotamKe && Array.isArray(s.riwayat_kenaikan)) {
    const existing = s.riwayat_kenaikan.find(
      (r) =>
        String(r.khotam_ke || '').toUpperCase() === khotamKe.toUpperCase() &&
        String(r.ke_lembaga || '')
          .toLowerCase()
          .includes('pra ptpt') &&
        String(r.ke_kelas || '').toLowerCase() === klsBaru.toLowerCase()
    )
    if (existing) {
      const ok = confirm(
        `Santri sudah punya entry "Khotam ${khotamKe}" di "${klsBaru}" (tgl ${existing.tanggal_display || existing.tanggal}). Tetap simpan?`
      )
      if (!ok) return
    }
  }

  savingForm.value = true
  try {
    const payload = {
      kelas_sekolah: formData.value.kelas_sekolah || '',
      lembaga: formData.value.lembaga || '',
      kelas: formData.value.kelas || '',
      guru: formData.value.guru || ''
    }
    if (formData.value.lembaga === 'PTPT' && formData.value.juz) {
      payload.juz = `JUZ ${formData.value.juz}`
    }
    const today = new Date().toISOString().slice(0, 10)
    const todayId = new Date().toLocaleDateString('id-ID')

    // v.21.75: Update kartu_kenaikan via schema-aware path (kelasId.itemId = tanggal)
    const kk = { ...(s.kartu_kenaikan || {}) }
    const lmb = formData.value.lembaga
    const kls = formData.value.kelas
    if (lmb && kls) {
      const resolved = resolveKenaikanSchemaPath(lmb, kls, formData.value.juz, formData.value.khotam_ke)
      if (resolved.kelasId) {
        if (!kk[lmb]) kk[lmb] = {}
        if (!kk[lmb][resolved.kelasId]) kk[lmb][resolved.kelasId] = {}
        const block = kk[lmb][resolved.kelasId]
        if (!Array.isArray(block.entries)) block.entries = []
        // Set tanggal lulus untuk item-specific (juz/khotam/sub-tier)
        if (resolved.itemId) {
          block[resolved.itemId] = today
        }
        // Ceremonial = tanggal khataman/penyerahan untuk SELURUH kelas
        block.ceremonial = today
        if (formData.value.catatan && formData.value.catatan.trim()) {
          block.entries.push({
            tanggal: today,
            itemId: resolved.itemId || 'kenaikan',
            tipe: 'catatan',
            text: formData.value.catatan.trim()
          })
        }
        payload.kartu_kenaikan = kk
      } else {
        // Fallback: schema tidak ke-resolve, save dengan label (legacy compat)
        if (!kk[lmb]) kk[lmb] = {}
        if (!kk[lmb][kls]) kk[lmb][kls] = {}
        kk[lmb][kls].ceremonial = today
        payload.kartu_kenaikan = kk
      }
    }

    // Append riwayat (text) — backward compatibility
    const riwayat = Array.isArray(s.riwayat) ? [...s.riwayat] : []
    const last = riwayat.length > 0 ? riwayat[riwayat.length - 1] : null
    const fromKls = last?.kelas_to || s.kelas || ''
    const toKls = formData.value.kelas || ''
    const sameLembaga = (s.lembaga || '') === lmbBaru
    const aksi = sameLembaga ? 'Naik' : 'Dipindah'
    let ket = `${aksi} ke ${lmbBaru} Kelas ${klsBaru}`
    if (lmbBaru === 'PTPT' && formData.value.juz) ket += ` (Juz ${formData.value.juz})`
    if (lmbBaru === 'Pra PTPT' && khotamKe) ket += ` (Khotam ${khotamKe})`
    if (formData.value.guru) ket += ` | Guru: ${formData.value.guru}`

    if (fromKls !== toKls || formData.value.juz || khotamKe) {
      riwayat.push({
        tgl_naik: today,
        tanggal: todayId,
        keterangan: ket,
        lembaga: lmbBaru || s.lembaga || '',
        kelas_from: fromKls,
        kelas_to: toKls,
        juz: formData.value.juz ? `JUZ ${formData.value.juz}` : null,
        catatan: formData.value.catatan || '',
        guru: formData.value.guru || ''
      })

      // PATCH v.21.50 — Auto-catatan transisi penting (Poin 13 legacy)
      const lmbgL = (s.lembaga || '').toUpperCase()
      const klsL = (s.kelas || '').toLowerCase()
      const lmbgB = (lmbBaru || '').toUpperCase()
      const klsB = (klsBaru || '').toLowerCase()
      // 1) Persiapan Khotaman → Pra PTPT (level 1)
      if (
        klsL.includes('persiapan khotaman') &&
        lmbgB.includes('PRA PTPT') &&
        klsB.includes('level 1')
      ) {
        riwayat.push({
          tanggal: todayId,
          tgl_naik: today,
          keterangan: `Telah LULUS IMTAS pada tanggal ${todayId}`
        })
      }
      // 2) Pra PTPT level 5 → PTPT kelas 1
      else if (
        lmbgL.includes('PRA PTPT') &&
        klsL.includes('level 5') &&
        lmbgB === 'PTPT' &&
        klsB.includes('kelas 1')
      ) {
        riwayat.push({
          tanggal: todayId,
          tgl_naik: today,
          keterangan: `Telah Khotam Al-Qur'an bil Nazhor 60x pada tanggal ${todayId}`
        })
      }
      // 3) PTPT (kelas terakhir) → lembaga lain
      else if (lmbgL === 'PTPT' && lmbgB !== 'PTPT' && lmbgB !== '') {
        const lembagaPTPT = (lembagaRaw.value || []).find(
          (l) => String(l.lembaga || '').toUpperCase() === 'PTPT'
        )
        const klsListPTPT =
          (lembagaPTPT && (lembagaPTPT.kelas_list || lembagaPTPT.kelas)) || ['Kelas 6']
        const kelasTerakhirPTPT = klsListPTPT[klsListPTPT.length - 1] || 'Kelas 6'
        if ((s.kelas || '').toLowerCase() === String(kelasTerakhirPTPT).toLowerCase()) {
          riwayat.push({
            tanggal: todayId,
            tgl_naik: today,
            keterangan: `Alhamdulillah, ananda ${s.nama} telah khotam Al-Qur'an 30 juz bil Ghoib pada tanggal ${todayId}`
          })
        }
      }

      payload.riwayat = riwayat
    }

    // PATCH v.21.50 — riwayat_kenaikan structured (legacy compat)
    const rkEntry = {
      tanggal: today,
      tanggal_display: todayId,
      dari_lembaga: s.lembaga || '',
      dari_kelas: s.kelas || '',
      ke_lembaga: lmbBaru,
      ke_kelas: klsBaru,
      khotam_ke: khotamKe || '',
      juz: lmbBaru === 'PTPT' ? `JUZ ${formData.value.juz}` : ''
    }
    const newRk = Array.isArray(s.riwayat_kenaikan) ? [...s.riwayat_kenaikan, rkEntry] : [rkEntry]
    payload.riwayat_kenaikan = newRk

    await updateDoc(doc(db, 'santri', String(s.id)), payload)
    // v.87.0526: tulis event kenaikan ke koleksi `riwayat_kenaikan` (sumber notif untuk wali). Best-effort.
    try {
      const evId = `rk_${s.id}_${Date.now()}`
      await setDoc(doc(db, 'riwayat_kenaikan', evId), {
        id: evId,
        santri_id: String(s.id),
        santri_nama: s.nama || '',
        dari_lembaga: rkEntry.dari_lembaga || '',
        dari_kelas: rkEntry.dari_kelas || '',
        ke_lembaga: rkEntry.ke_lembaga || '',
        ke_kelas: rkEntry.ke_kelas || '',
        khotam_ke: rkEntry.khotam_ke || '',
        tanggal: rkEntry.tanggal || '',
        createdAt: new Date().toISOString()
      })
    } catch (e) {
      console.warn('[kenaikan-event] gagal tulis riwayat_kenaikan:', e?.message || e)
    }
    Object.assign(s, payload)
    const idx = santriList.value.findIndex((x) => String(x.id) === String(s.id))
    if (idx >= 0) Object.assign(santriList.value[idx], payload)
    toast.success(`Kenaikan ${s.nama} tersimpan`)
    formOpen.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    savingForm.value = false
  }
}

// ────────── PDF Export Riwayat Kenaikan ──────────
const exportingPdf = ref(false)
async function exportRiwayatPdf() {
  if (!riwayatLembaga.value || !riwayatList.value.length) return
  exportingPdf.value = true
  try {
    const target = riwayatLembaga.value
    const lembagaKeys =
      target === 'TPQ'
        ? ['TPQ Pagi', 'TPQ Sore', 'TPQ']
        : target === 'PPPH'
          ? ['PPPH', 'P3H']
          : [target]
    const rows = riwayatList.value.map((s, i) => {
      // Prefer structured riwayat_kenaikan if present; else derive from kartu_kenaikan
      const rk = Array.isArray(s.riwayat_kenaikan) ? s.riwayat_kenaikan.slice() : []
      rk.sort((a, b) => String(a.tanggal || '').localeCompare(String(b.tanggal || '')))
      let teks = ''
      if (rk.length > 0) {
        teks = rk
          .map((r) => {
            const tgl = r.tanggal_display || r.tanggal || ''
            const ke = `${r.ke_lembaga || ''} ${r.ke_kelas || ''}`.trim()
            const kh = r.khotam_ke ? ` (Khotam ${r.khotam_ke})` : ''
            const juz = r.juz ? ` (${r.juz})` : ''
            return `${tgl}: ${ke}${kh}${juz}`
          })
          .join(' | ')
      } else {
        // Fallback: derive from kartu_kenaikan dates
        const block = s.kartu_kenaikan || {}
        const parts = []
        for (const lk of lembagaKeys) {
          const lblock = block[lk]
          if (!lblock || typeof lblock !== 'object') continue
          for (const [klsLbl, kls] of Object.entries(lblock)) {
            if (!kls || typeof kls !== 'object') continue
            for (const [itemKey, val] of Object.entries(kls)) {
              if (!val) continue
              const tglStr = typeof val === 'object' ? val.tanggal || val.tgl || '' : String(val)
              if (tglStr && itemKey !== 'entries') {
                parts.push(`${tglStr}: ${klsLbl}/${itemKey}`)
              }
            }
          }
        }
        teks = parts.join(' | ') || 'Belum ada riwayat'
      }
      return {
        no: i + 1,
        nama: s.nama || '',
        kelas: `${s.lembaga || ''} - ${s.kelas || '-'}`.trim(),
        riwayat: teks
      }
    })
    const settingsObj = settingsStore.settings || {}
    const kop = {
      logoUrl: settingsObj.kop_logo || settingsObj.kopLogo || settingsObj.logoKop || '',
      line1: settingsObj.kopLine1 || 'YAYASAN MAMBAUL ULUM',
      line2: settingsObj.kopLine2 || '',
      line3: settingsObj.kopLine3 || '',
      line4: settingsObj.kopLine4 || '',
      line5: settingsObj.kopLine5 || ''
    }
    await buildListPdf({
      kind: 'umum',
      orientation: 'l',
      format: 'a4',
      kop,
      title: `RIWAYAT KENAIKAN — ${target}`,
      columns: [
        { key: 'no', header: 'No', width: 12 },
        { key: 'nama', header: 'Nama Santri', width: 50 },
        { key: 'kelas', header: 'Kelas Sekarang', width: 40 },
        { key: 'riwayat', header: 'Riwayat Kenaikan', width: 165 }
      ],
      rows,
      filename: `Riwayat_Kenaikan_${String(target).replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`
    })
    toast.success(`PDF Riwayat ${target} ter-generate (${rows.length} santri)`)
  } catch (e) {
    toast.error('Gagal cetak PDF: ' + (e?.message || e))
  } finally {
    exportingPdf.value = false
  }
}

// ────────── PDF Export Kartu Kenaikan per-santri ──────────
const exportingKartuPdf = ref(false)
async function eksporKartuPdf() {
  if (!kartuSantri.value || !schema.value) {
    toast.warning('Buka modal Kartu Kenaikan dulu')
    return
  }
  exportingKartuPdf.value = true
  try {
    const s = kartuSantri.value
    const sch = schema.value
    const data = cellData.value || {}
    const _kop = kopHeader.value
    const settingsObj = settingsStore.settings || {}
    // v.100 Batch6: kartu lembaga SEKOLAH — identitas pakai kelas_sekolah + guru sekolah, ceremonial = Kelulusan
    const isSekolahKartu = LEMBAGA_KENAIKAN_SEKOLAH.includes(kartuLembaga.value)
    // Build rows: one row per (kelas, item) combo so the matrix is flattened
    const rows = []
    for (const k of sch.kelasList || []) {
      const dataKelas = data[k.id] || {}
      const items = k.items || []
      for (const it of items) {
        const v = dataKelas[it.id]
        const tgl = typeof v === 'object' ? v?.tanggal || v?.tgl || '' : v || ''
        rows.push({
          kelas: k.label || '',
          item: it.label || '',
          tanggal: tgl ? formatDate(tgl) : '-'
        })
      }
      if (k.ceremonial) {
        const cv = dataKelas.ceremonial
        rows.push({
          kelas: k.label || '',
          item: isSekolahKartu
            ? 'Kelulusan'
            : (sch.itemHeader || '').toLowerCase() === 'jilid'
              ? 'Khotaman'
              : 'Ceremonial',
          tanggal: cv ? formatDate(cv) : '-'
        })
      }
    }
    if (rows.length === 0) {
      toast.warning('Schema kartu kosong, tidak ada data untuk dicetak')
      return
    }
    // v.21.72: Custom PDF dengan dual logo + Times New Roman (match rapor pattern)
    // v.21.74: helvetica (closest built-in font ke Calibri sans-serif)
    const doc = await createPdf({ kind: 'umum', orientation: 'p', format: 'a4' })
    const pageW = doc.internal.pageSize.getWidth()
    const startY = 10

    // Logo kiri (Qiraati) + logo kanan (Pondok)
    const leftLogo = settingsObj.logoQiraati || ''
    const rightLogo = settingsObj.logoKop || settingsObj.logoUrl || ''
    if (leftLogo) {
      try {
        const dataUrl = leftLogo.startsWith('data:') ? leftLogo : await imageToDataURL(leftLogo)
        if (dataUrl) doc.addImage(dataUrl, 'PNG', 14, startY, 18, 18, undefined, 'FAST')
      } catch (_e) {}
    }
    if (rightLogo) {
      try {
        const dataUrl = rightLogo.startsWith('data:') ? rightLogo : await imageToDataURL(rightLogo)
        if (dataUrl) doc.addImage(dataUrl, 'PNG', pageW - 32, startY, 18, 18, undefined, 'FAST')
      } catch (_e) {}
    }

    // KOP center lines (Times New Roman, bold)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    const kopLine1 = (_kop.judul || `KARTU KONTROL KENAIKAN ${(kartuLembaga.value || 'KELAS').toUpperCase()}`).toUpperCase()
    doc.text(kopLine1, pageW / 2, startY + 5, { align: 'center' })
    doc.setFontSize(15)
    const kopLine2 = (_kop.subjudul || settingsObj.kopLine1 || 'PONDOK PESANTREN MAMBAUL ULUM').toUpperCase()
    doc.text(kopLine2, pageW / 2, startY + 12, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const kopLine3 = _kop.alamat || settingsObj.kopLine3 || settingsObj.alamat || 'Jl. Kol. Sugiono 112 Panjunan-Kepuh Kiriman Waru Sidoarjo'
    doc.text(kopLine3, pageW / 2, startY + 18, { align: 'center' })
    // Divider 2-line
    const dividerY = startY + 22
    doc.setLineWidth(0.6)
    doc.line(12, dividerY, pageW - 12, dividerY)
    doc.setLineWidth(0.2)
    doc.line(12, dividerY + 1.2, pageW - 12, dividerY + 1.2)

    // Identitas block (helvetica, gap dari KOP divider)
    let yId = dividerY + 12
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    const guruSekolahNama = Array.isArray(s.guru_sekolah)
      ? s.guru_sekolah.filter(Boolean).join(', ')
      : s.guru_sekolah || '-'
    const identitasRows = isSekolahKartu
      ? [
          ['NAMA', (s.nama || '-').toUpperCase()],
          ['NO. INDUK', s.nis || '-'],
          ['LEMBAGA', kartuLembaga.value || s.lembaga_sekolah || '-'],
          ['KELAS', s.kelas_sekolah || '-'],
          ['GURU KELAS', guruSekolahNama || '-'],
          ['TGL MASUK', s.tgl_masuk || '-'],
          ['ALAMAT', (s.alamat || '-').toUpperCase()]
        ]
      : [
          ['NAMA', (s.nama || '-').toUpperCase()],
          ['NO. INDUK', s.nis || '-'],
          ['LEMBAGA', kartuLembaga.value || s.lembaga || '-'],
          ['KELAS', s.kelas || '-'],
          ['TGL MASUK', s.tgl_masuk || '-'],
          ['ALAMAT', (s.alamat || '-').toUpperCase()]
        ]
    for (const [k, v] of identitasRows) {
      doc.text(k, 14, yId)
      doc.text(':', 38, yId)
      doc.text(String(v), 41, yId)
      yId += 4.8
    }

    // v.21.73: Conditional layout — PTPT pakai MATRIX 3 kelas/blok (match kartu fisik PTPT MU)
    const tableStartY = yId + 4

    if (kartuLembaga.value === 'PTPT') {
      // Matrix PTPT: 6 kelas dibagi 2 blok (Kelas 1-3 + Kelas 4-6), masing-masing 15 juz
      const buildBlok = (kelasStart) => {
        const headers = []
        const subHeaders = []
        const juzRow = []
        const tanggalRow = []
        for (let k = kelasStart; k < kelasStart + 3; k++) {
          headers.push({ content: `Kelas ${k}`, colSpan: 5, styles: { halign: 'center', fontStyle: 'bold', fontSize: 11 } })
          subHeaders.push({ content: 'Juz', colSpan: 5, styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 } })
          const start = (k - 1) * 5 + 1
          for (let j = start; j <= start + 4; j++) {
            juzRow.push({ content: String(j), styles: { halign: 'center', fontStyle: 'bold' } })
            const kData = data[`kelas_${k}`] || {}
            const v = kData[`juz_${j}`]
            const tgl = typeof v === 'object' ? v?.tanggal || v?.tgl || '' : v || ''
            tanggalRow.push(tgl ? formatDate(tgl) : '')
          }
        }
        const cerRow = []
        for (let k = kelasStart; k < kelasStart + 3; k++) {
          const kData = data[`kelas_${k}`] || {}
          const cer = kData.ceremonial
          const cerTgl = typeof cer === 'object' ? cer?.tanggal || cer?.tgl || '' : cer || ''
          cerRow.push({
            content: `Ceremonial: ${cerTgl ? formatDate(cerTgl) : ''}`,
            colSpan: 5,
            styles: { halign: 'left', fontStyle: 'normal', fontSize: 9 }
          })
        }
        return { head: [headers, subHeaders, juzRow], body: [tanggalRow, cerRow] }
      }

      const cellW = 182 / 15
      const colStyles = {}
      for (let i = 0; i < 15; i++) colStyles[i] = { cellWidth: cellW }

      const commonOpts = {
        theme: 'grid',
        styles: { font: 'helvetica', fontSize: 10, cellPadding: 1.5, lineColor: [80, 80, 80], lineWidth: 0.2, textColor: [0, 0, 0], valign: 'middle' },
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], font: 'helvetica', fontStyle: 'bold', halign: 'center', lineColor: [80, 80, 80], lineWidth: 0.25 },
        bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
        columnStyles: colStyles,
        margin: { left: 14, right: 14 }
      }

      // v.21.74: hitung body row height supaya 2 blok fit ke halaman
      const pageH = doc.internal.pageSize.getHeight()
      const bottomMargin = 14
      const availableH = pageH - tableStartY - bottomMargin
      // Per blok struktur: 3 header rows (~7mm each = 21) + 1 body row + 1 ceremonial row (~6mm) + gap (4mm) = ~31mm + body
      // 2 blok: 2 × (31mm + body) + 4mm gap-between = 62 + 2×body + 4 = 66 + 2body
      // Solve: 66 + 2body = availableH → body = (availableH - 66) / 2
      const bodyRowH = Math.max(25, Math.min(60, (availableH - 70) / 2))

      const blokA = buildBlok(1)
      drawTable(doc, {
        ...commonOpts,
        startY: tableStartY,
        head: blokA.head,
        body: blokA.body,
        didParseCell: (data) => {
          if (data.section === 'body' && data.row.index === 0) {
            data.cell.styles.minCellHeight = bodyRowH
            data.cell.styles.halign = 'center'
          }
        }
      })

      const lastY = doc.lastAutoTable.finalY
      const blokB = buildBlok(4)
      drawTable(doc, {
        ...commonOpts,
        startY: lastY + 4,
        head: blokB.head,
        body: blokB.body,
        didParseCell: (data) => {
          if (data.section === 'body' && data.row.index === 0) {
            data.cell.styles.minCellHeight = bodyRowH
            data.cell.styles.halign = 'center'
          }
        }
      })
    } else {
      // Flat layout dengan rowspan kelas (TPQ, Pra PTPT, PPPH)
      const pageH = doc.internal.pageSize.getHeight()
      const bottomMargin = 12
      const availableH = pageH - tableStartY - bottomMargin
      const rowCount = rows.length
      const headerH = 7
      const targetRowH = rowCount > 0 ? Math.max(4, Math.min(9, (availableH - headerH) / rowCount)) : 6
      const fs = Math.max(8, Math.min(10, Math.round(targetRowH * 1.15)))
      const cp = Math.max(1.0, (targetRowH - fs * 0.36) / 2)

      const groupedBody = []
      let i = 0
      while (i < rows.length) {
        const kelasName = rows[i].kelas
        let j = i
        while (j < rows.length && rows[j].kelas === kelasName) j++
        const span = j - i
        groupedBody.push([
          { content: kelasName, rowSpan: span, styles: { valign: 'middle', halign: 'left' } },
          rows[i].item,
          rows[i].tanggal
        ])
        for (let k = i + 1; k < j; k++) {
          groupedBody.push([rows[k].item, rows[k].tanggal])
        }
        i = j
      }

      drawTable(doc, {
        startY: tableStartY,
        head: [['Kelas / Level', sch.itemHeader || 'Item', 'Tanggal Lulus']],
        body: groupedBody,
        theme: 'grid',
        styles: { font: 'helvetica', fontSize: fs, cellPadding: cp, lineColor: [80, 80, 80], lineWidth: 0.2, textColor: [0, 0, 0], minCellHeight: targetRowH, valign: 'middle' },
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], font: 'helvetica', fontStyle: 'bold', halign: 'center', fontSize: Math.max(9, fs), cellPadding: Math.max(1.5, cp), lineColor: [80, 80, 80], lineWidth: 0.3 },
        bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
        columnStyles: {
          0: { cellWidth: 55, halign: 'center' },
          1: { cellWidth: 75, halign: 'center' },
          2: { cellWidth: 52, halign: 'center' }
        },
        margin: { left: 14, right: 14 },
        pageBreak: 'auto',
        rowPageBreak: 'avoid'
      })
    }

    savePdf(doc, `KartuKenaikan_${String(s.nama || 'santri').replace(/\s+/g, '_')}_${kartuLembaga.value.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`)
    toast.success(`PDF Kartu Kenaikan ${s.nama} ter-download`)
  } catch (e) {
    toast.error('Gagal export kartu PDF: ' + (e?.message || e))
  } finally {
    exportingKartuPdf.value = false
  }
}

// ────────── Lifecycle: load santri ──────────
onMounted(async () => {
  if (!isAdmin.value && !isGuru.value && !isSantriRole.value) {
    loadingSantri.value = false
    return
  }
  try {
    const snap = await getDocs(collection(db, 'santri'))
    santriList.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  } catch (e) {
    toast.error('Gagal load santri: ' + e.message)
  } finally {
    loadingSantri.value = false
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.4);
  border-radius: 3px;
}
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
