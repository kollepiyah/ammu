<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="flex items-center justify-between gap-2">
        <div>
          <h2
            class="text-lg md:text-xl font-black text-slate-800 dark:text-white flex items-center gap-2"
          >
            <i class="fas fa-graduation-cap text-amber-600"></i>Naik Kelas / Kenaikan Jilid
          </h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Kontrol Kartu Kenaikan per santri — pilih lembaga lalu santri untuk mulai
          </p>
        </div>
      </div>
    </div>

    <!-- Santri role view: langsung tampilkan kartu kenaikan miliknya -->
    <div
      v-if="isSantriRole"
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div v-if="loadingSantri" class="text-center py-10">
        <i class="fas fa-spinner fa-spin text-2xl text-teal-500"></i>
        <p class="text-xs text-slate-500 mt-2">Memuat kartu kenaikan...</p>
      </div>
      <div v-else-if="mySantri">
        <p class="text-xs text-slate-500 mb-3">Kartu Kenaikan untuk:</p>
        <button
          @click="openKartu(mySantri)"
          class="w-full bg-gradient-to-br from-emerald-500 to-teal-700 hover:from-emerald-600 hover:to-teal-800 text-white rounded-xl p-4 flex items-center justify-between gap-3 cursor-pointer shadow-md hover:shadow-lg transition"
        >
          <div class="text-left flex-1 min-w-0">
            <p class="text-base font-black truncate">{{ mySantri.nama }}</p>
            <p class="text-[11px] opacity-90 mt-0.5">
              {{ mySantri.lembaga }}{{ mySantri.kelas ? ' · Kelas ' + mySantri.kelas : ''
              }}{{ mySantri.juz && mySantri.juz !== '-' ? ' · Juz ' + mySantri.juz : '' }}
            </p>
          </div>
          <span
            class="text-xs font-black bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1 flex-shrink-0"
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

    <!-- Tab Switcher (admin/guru) -->
    <div
      v-if="isAdmin || isGuru"
      class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-2"
    >
      <div class="flex gap-1.5 overflow-x-auto custom-scrollbar">
        <button
          @click="activeTab = 'form'"
          :class="[
            'flex-1 whitespace-nowrap px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-black transition cursor-pointer rounded-xl flex items-center justify-center gap-1.5',
            activeTab === 'form'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-blue-50 hover:text-blue-700'
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
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-purple-50 hover:text-purple-700'
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
              : 'text-slate-600 dark:text-slate-400 hover:bg-emerald-50 hover:text-emerald-700'
          ]"
        >
          <i class="fas fa-cog text-sm"></i>Pengaturan
        </button>
      </div>
    </div>

    <!-- Filter Lembaga (admin/form tab) -->
    <div
      v-if="isAdmin && activeTab === 'form'"
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <p
        class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2"
      >
        Filter Lembaga
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
        <button
          v-for="l in LEMBAGA_KENAIKAN_LIST"
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
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="relative mb-3">
        <i
          class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
        ></i>
        <input
          v-model="searchFormSantri"
          type="search"
          placeholder="Cari nama santri..."
          class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
        />
      </div>
      <div v-if="loadingSantri" class="text-center py-10">
        <i class="fas fa-spinner fa-spin text-2xl text-amber-600 mb-2"></i>
        <p class="text-sm text-slate-500">Memuat data santri...</p>
      </div>
      <p
        v-else-if="filteredFormSantri.length === 0"
        class="text-center text-slate-400 py-6 text-sm"
      >
        Tidak ada santri yang cocok di lembaga {{ filterLembaga }}.
      </p>
      <div v-else class="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
        <div
          v-for="s in filteredFormSantri"
          :key="s.id"
          class="flex items-center justify-between gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition"
        >
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 dark:text-white truncate">{{ s.nama }}</p>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {{ s.lembaga }}{{ s.kelas ? ' · ' + s.kelas : ''
              }}{{ s.juz && s.juz !== '-' ? ' · Juz ' + s.juz : '' }}
            </p>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <button
              @click="openFormKenaikan(s)"
              class="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-3 py-2 rounded-lg text-xs cursor-pointer flex items-center gap-1.5 uppercase tracking-wider shadow-sm hover:shadow-md transition"
              title="Proses Naik (form sederhana)"
            >
              <i class="fas fa-arrow-up"></i>PROSES NAIK
            </button>
            <button
              @click="openKartu(s)"
              class="bg-blue-600 hover:bg-blue-700 text-white font-black px-2.5 py-2 rounded-lg text-xs cursor-pointer flex items-center gap-1 shadow-sm hover:shadow-md transition"
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
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <label class="text-xs font-bold text-slate-600 dark:text-slate-300">
          Lembaga Qiraati:
        </label>
        <select
          v-model="riwayatLembaga"
          class="text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
        >
          <option value="">— Pilih Lembaga —</option>
          <option value="TPQ Pagi">TPQ Pagi</option>
          <option value="TPQ Sore">TPQ Sore</option>
          <option value="Pra PTPT">Pra PTPT</option>
          <option value="PTPT">PTPT</option>
          <option value="PPPH">PPPH</option>
        </select>
        <input
          v-model="riwayatSearch"
          type="text"
          placeholder="Cari nama santri..."
          class="flex-1 min-w-[180px] text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
        />
        <button
          v-if="riwayatLembaga && riwayatList.length > 0"
          @click="exportRiwayatExcel"
          :disabled="exportingExcel"
          class="text-xs font-black px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 flex items-center gap-1.5"
        >
          <i class="fas fa-file-excel"></i>
          {{ exportingExcel ? 'Mengeksport…' : 'Excel' }}
        </button>
        <button
          v-if="riwayatLembaga && riwayatList.length > 0"
          @click="exportRiwayatPdf"
          :disabled="exportingPdf"
          class="text-xs font-black px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50 flex items-center gap-1.5"
          title="Cetak PDF Daftar Riwayat"
        >
          <i class="fas fa-file-pdf"></i>
          {{ exportingPdf ? 'Mencetak…' : 'PDF' }}
        </button>
      </div>
      <template v-if="riwayatLembaga">
        <p v-if="riwayatList.length === 0" class="text-center text-slate-400 italic text-xs py-8">
          Tidak ada santri di lembaga {{ riwayatLembaga }}.
        </p>
        <div v-else class="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
          <div
            v-for="s in riwayatList"
            :key="s.id"
            class="rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition"
          >
            <div class="flex items-center justify-between gap-2 p-3">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-slate-800 dark:text-white truncate">
                  {{ s.nama }}
                </p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {{ s.lembaga }}{{ s.kelas ? ' · ' + s.kelas : '' }}
                  <span class="ml-1 text-emerald-600 font-bold">
                    · {{ countTanggalTerisi(s, riwayatLembaga) }} tanggal terisi
                  </span>
                  <button
                    v-if="countCatatan(s, riwayatLembaga) > 0"
                    @click="toggleExpand(s.id)"
                    class="ml-2 inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 cursor-pointer transition"
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
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer flex items-center gap-1 flex-shrink-0"
              >
                <i class="fas fa-eye"></i>Lihat
              </button>
            </div>
            <div
              v-if="expanded.has(s.id)"
              class="px-3 pb-3 space-y-1.5 border-t border-slate-100 dark:border-slate-700 pt-2"
            >
              <div
                v-for="(c, ci) in latestCatatan(s, riwayatLembaga, 5)"
                :key="ci"
                :class="[
                  'border-l-4 px-2.5 py-1.5 rounded-r-md',
                  c.tipe === 'rekomendasi'
                    ? 'bg-emerald-50 border-emerald-500'
                    : 'bg-blue-50 border-blue-500'
                ]"
              >
                <p
                  :class="[
                    'text-[9px] font-black uppercase tracking-wider mb-0.5',
                    c.tipe === 'rekomendasi' ? 'text-emerald-700' : 'text-blue-700'
                  ]"
                >
                  <i
                    :class="[
                      'fas mr-1',
                      c.tipe === 'rekomendasi' ? 'fa-lightbulb' : 'fa-comment-dots'
                    ]"
                  ></i>
                  {{ c.tipe === 'rekomendasi' ? 'Rekomendasi' : 'Catatan' }}
                  <span class="font-medium normal-case text-slate-500 ml-1">
                    · {{ c.tanggal || '—' }}{{ c.kelasId ? ' · ' + c.kelasId : '' }}
                  </span>
                </p>
                <p class="text-[11px] text-slate-700 whitespace-pre-line">{{ c.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <p v-else class="text-center text-slate-400 italic text-xs py-8">
        <i class="fas fa-id-card text-3xl text-slate-300 dark:text-slate-600 block mb-2"></i>
        Pilih lembaga untuk melihat riwayat kenaikan santri.
      </p>
    </div>

    <!-- Tab: Pengaturan (admin only) -->
    <div
      v-if="isAdmin && activeTab === 'pengaturan'"
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4"
    >
      <p class="text-xs text-slate-500 dark:text-slate-400 italic flex items-start gap-1.5">
        <i class="fas fa-info-circle mt-0.5"></i>
        Klik card lembaga di bawah untuk atur KOP Kartu Kenaikan khusus lembaga tersebut.
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        <button
          v-for="l in LEMBAGA_KENAIKAN_LIST"
          :key="l"
          @click="selectPengaturanLembaga(l)"
          :class="[
            'bg-white dark:bg-slate-900 border-2 rounded-xl p-3 md:p-4 text-center font-black transition cursor-pointer shadow-sm',
            pengaturanLembaga === l
              ? 'border-blue-500 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-200'
              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300 hover:bg-blue-50/50'
          ]"
        >
          <p class="text-sm md:text-base">{{ l }}</p>
        </button>
      </div>

      <div
        v-if="pengaturanLembaga"
        class="border border-slate-300 dark:border-slate-600 rounded-xl overflow-hidden"
      >
        <div
          class="bg-slate-100 dark:bg-slate-700 px-4 py-2 text-xs md:text-sm font-black text-slate-700 dark:text-slate-200"
        >
          <i class="fas fa-folder-open mr-1"></i>Pengaturan Kartu — {{ pengaturanLembaga }}
        </div>
        <div class="p-4 bg-white dark:bg-slate-800 space-y-3">
          <!-- KOP Section -->
          <div
            class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-3 md:p-4"
          >
            <h4 class="text-sm font-black text-blue-800 dark:text-blue-300 mb-1">
              <i class="fas fa-flag mr-1"></i>KOP Kartu Kenaikan (Per Lembaga)
            </h4>
            <p class="text-[11px] text-slate-600 dark:text-slate-400 mb-3">
              Atur judul, subjudul, alamat khusus untuk lembaga ini. Mis: PTPT pakai "PASCA TPQ
              PROGRAM TAHFIZH", TPQ pakai "TAMAN PENDIDIKAN AL-QURAN".
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label
                  class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1"
                  >Judul Utama</label
                >
                <input
                  v-model="kopForm.judul"
                  type="text"
                  placeholder="KONTROL KENAIKAN KELAS"
                  class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label
                  class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1"
                  >Subjudul</label
                >
                <input
                  v-model="kopForm.subjudul"
                  type="text"
                  placeholder="PTPT MAMBAUL ULUM"
                  class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                />
              </div>
              <div class="md:col-span-2">
                <label
                  class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1"
                  >Alamat</label
                >
                <input
                  v-model="kopForm.alamat"
                  type="text"
                  placeholder="Jl. Kolonel Sugiono No. 112 Panjunan - Waru - Sidoarjo"
                  class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                />
              </div>
            </div>
            <div class="flex justify-end mt-3">
              <button
                @click="saveKop"
                :disabled="savingKop"
                class="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-lg text-xs cursor-pointer disabled:opacity-50"
              >
                <i :class="['fas', savingKop ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>
                {{ savingKop ? 'Menyimpan...' : 'Simpan KOP' }}
              </button>
            </div>
          </div>

          <!-- Schema Section -->
          <div
            class="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-3 md:p-4 space-y-3"
          >
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h4 class="text-sm font-black text-purple-800 dark:text-purple-300">
                <i class="fas fa-list-alt mr-1"></i>Schema Kartu Kenaikan — {{ pengaturanLembaga }}
              </h4>
              <div class="flex gap-1">
                <button
                  @click="resetSchema"
                  class="text-[10px] font-bold px-2 py-1 rounded bg-amber-100 text-amber-800 hover:bg-amber-200"
                >
                  <i class="fas fa-undo mr-0.5"></i>Reset Default
                </button>
                <button
                  @click="saveSchema"
                  :disabled="savingSchema"
                  class="text-[10px] font-black px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                >
                  <i :class="['fas', savingSchema ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>
                  Simpan Schema
                </button>
              </div>
            </div>
            <div>
              <label
                class="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block mb-1"
              >
                Header Item (mis: Juz / Jilid / Khotam / Tahap)
              </label>
              <input
                v-model="schemaDraft.itemHeader"
                placeholder="Item"
                class="w-full px-2 py-1.5 text-sm border border-purple-300 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
              />
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <p
                  class="text-[11px] font-black text-purple-800 dark:text-purple-300 uppercase tracking-wider"
                >
                  Daftar Kelas/Level/Jilid:
                </p>
                <button
                  @click="addKelas"
                  class="text-[10px] bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold px-2 py-0.5 rounded"
                >
                  <i class="fas fa-plus mr-0.5"></i>Tambah Kelas
                </button>
              </div>
              <div
                v-if="(schemaDraft.kelasList || []).length === 0"
                class="text-center text-xs text-slate-400 italic py-3"
              >
                Belum ada kelas. Klik "Tambah Kelas" untuk mulai.
              </div>
              <div
                v-for="(k, ki) in schemaDraft.kelasList || []"
                :key="k.id"
                class="bg-white dark:bg-slate-800 border border-purple-100 dark:border-purple-700 rounded-lg p-2 space-y-2"
              >
                <div class="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                  <input
                    v-model="k.label"
                    placeholder="Label (Kelas 1)"
                    class="text-xs font-bold px-2 py-1 border border-slate-300 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                  />
                  <label
                    class="text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1"
                  >
                    <input
                      v-model="k.ceremonial"
                      type="checkbox"
                      class="w-3 h-3 accent-purple-600"
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
                <div class="space-y-1 pl-3 border-l-2 border-purple-200 dark:border-purple-700">
                  <p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                    Items ({{ schemaDraft.itemHeader || 'Item' }}):
                  </p>
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="(it, ii) in k.items || []"
                      :key="ii"
                      class="bg-purple-50 border border-purple-200 px-2 py-0.5 rounded text-[11px] flex items-center gap-1"
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
                      class="bg-purple-200 hover:bg-purple-300 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded"
                    >
                      + Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 italic">
              <i class="fas fa-info-circle mr-1"></i>
              Schema ini dipakai di modal Kartu Kenaikan (matrix kelas × items × tanggal
              khotam/naik).
            </p>
          </div>
        </div>
      </div>
      <p v-else class="text-center text-slate-400 italic text-xs py-6">
        <i class="fas fa-hand-pointer text-2xl text-slate-300 dark:text-slate-600 block mb-2"></i>
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
            class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full my-4 max-h-[90vh] flex flex-col"
          >
            <!-- KOP -->
            <div
              class="px-4 md:px-6 pt-5 pb-3 border-b-2 border-slate-700 dark:border-slate-600 text-center"
            >
              <p class="text-sm md:text-base font-black uppercase text-slate-800 dark:text-white">
                {{ kopHeader.judul }}
              </p>
              <p
                class="text-base md:text-lg font-black uppercase text-slate-800 dark:text-white mt-0.5"
              >
                {{ kopHeader.subjudul }}
              </p>
              <p
                v-if="kopHeader.alamat"
                class="text-[10px] text-slate-600 dark:text-slate-400 mt-1"
              >
                {{ kopHeader.alamat }}
              </p>
            </div>

            <div class="flex-1 overflow-y-auto p-4 md:p-6">
              <!-- Identitas -->
              <div
                class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 mb-3 border border-slate-200 dark:border-slate-700 text-xs"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  <div>
                    <span class="font-bold text-slate-500 inline-block w-32">No. Induk</span>
                    : {{ kartuSantri?.nis || '-' }}
                  </div>
                  <div>
                    <span class="font-bold text-slate-500 inline-block w-32">Tanggal Masuk</span>
                    : {{ kartuSantri?.tgl_masuk || '-' }}
                  </div>
                  <div>
                    <span class="font-bold text-slate-500 inline-block w-32">Nama</span>
                    : {{ kartuSantri?.nama || '-' }}
                  </div>
                  <div>
                    <span class="font-bold text-slate-500 inline-block w-32">Alamat</span>
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
                    class="border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden"
                  >
                    <div
                      class="bg-slate-200 dark:bg-slate-700 text-center font-black text-xs py-1.5 border-b border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white"
                    >
                      {{ k.label }}
                    </div>
                    <div
                      class="bg-slate-50 dark:bg-slate-900/50 text-center text-[10px] font-bold border-b border-slate-300 dark:border-slate-600 py-1 text-slate-700 dark:text-slate-300"
                    >
                      {{ schema.itemHeader || 'Item' }}
                    </div>
                    <table class="w-full text-[10px]">
                      <thead>
                        <tr class="bg-white dark:bg-slate-800">
                          <th
                            v-for="it in k.items"
                            :key="it.id"
                            class="border border-slate-300 dark:border-slate-600 px-1 py-1 font-bold text-center text-slate-700 dark:text-slate-200"
                          >
                            {{ it.label }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white dark:bg-slate-800">
                          <td
                            v-for="it in k.items"
                            :key="it.id"
                            class="border border-slate-300 dark:border-slate-600 px-1 py-1"
                          >
                            <input
                              type="date"
                              :value="getCell(k.id, it.id)"
                              @input="(e) => setCell(k.id, it.id, e.target.value)"
                              class="w-full text-[9px] py-0.5 px-1 border-0 outline-none bg-transparent text-slate-800 dark:text-white"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- Ceremonial -->
                    <div
                      v-if="k.ceremonial"
                      class="bg-amber-50 dark:bg-amber-900/20 border-t border-slate-300 dark:border-slate-600 px-2 py-1.5 flex items-center gap-2 text-[10px]"
                    >
                      <span class="font-bold text-amber-800 dark:text-amber-300">Ceremonial:</span>
                      <input
                        type="date"
                        :value="getCeremonial(k.id)"
                        @input="(e) => setCeremonial(k.id, e.target.value)"
                        class="flex-1 py-0.5 px-1 text-[10px] border border-amber-200 dark:border-amber-700 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                      />
                    </div>
                    <!-- Catatan & Rekomendasi per kelas -->
                    <div
                      class="bg-slate-50 dark:bg-slate-900/30 border-t border-slate-300 dark:border-slate-600 px-2 py-2 space-y-2"
                    >
                      <div class="flex items-center justify-between gap-2">
                        <p
                          class="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-wide"
                        >
                          <i class="fas fa-comment-dots mr-1 text-blue-600"></i>Catatan &
                          Rekomendasi
                        </p>
                        <button
                          type="button"
                          @click="() => toggleNoteForm(k.id)"
                          class="text-[9px] font-bold px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                        >
                          <i class="fas fa-plus mr-0.5"></i>Tambah
                        </button>
                      </div>
                      <div
                        v-if="noteFormOpen[k.id]"
                        class="bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-700 rounded p-2 space-y-1.5"
                      >
                        <div class="grid grid-cols-3 gap-1.5">
                          <input
                            v-model="noteDraft[k.id].tanggal"
                            type="date"
                            class="text-[10px] px-1.5 py-1 border border-slate-300 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                          />
                          <select
                            v-model="noteDraft[k.id].itemId"
                            class="text-[10px] px-1.5 py-1 border border-slate-300 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                          >
                            <option v-for="it in k.items" :key="it.id" :value="it.id">
                              {{ schema.itemHeader }} {{ it.label }}
                            </option>
                            <option v-if="k.ceremonial" value="ceremonial">Ceremonial</option>
                          </select>
                          <select
                            v-model="noteDraft[k.id].tipe"
                            class="text-[10px] px-1.5 py-1 border border-slate-300 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                          >
                            <option value="catatan">Catatan</option>
                            <option value="rekomendasi">Rekomendasi</option>
                          </select>
                        </div>
                        <textarea
                          v-model="noteDraft[k.id].text"
                          rows="2"
                          placeholder="Tulis catatan/rekomendasi..."
                          class="w-full px-2 py-1 text-[10px] border border-slate-300 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white resize-none"
                        ></textarea>
                        <div class="flex justify-end gap-1">
                          <button
                            type="button"
                            @click="() => toggleNoteForm(k.id)"
                            class="text-[9px] font-bold px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            @click="() => saveNoteEntry(k.id)"
                            class="text-[9px] font-bold px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white"
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
                              : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                          ]"
                        >
                          <div class="flex-1 min-w-0">
                            <p
                              :class="[
                                'font-bold',
                                c.tipe === 'rekomendasi' ? 'text-emerald-700' : 'text-blue-700'
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
                              class="text-slate-700 dark:text-slate-200 mt-0.5 whitespace-pre-line"
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
                      <p v-else class="text-[9px] text-slate-400 italic text-center py-1">
                        Belum ada catatan/rekomendasi untuk kelas ini.
                      </p>
                    </div>
                  </div>
                </div>
                <p
                  v-if="schema.kelasList.length === 0"
                  class="text-center text-slate-400 py-6 text-sm italic"
                >
                  Schema untuk lembaga {{ kartuLembaga }} belum dikonfigurasi.
                </p>
              </div>
            </div>

            <div
              class="px-4 md:px-6 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-end gap-2 rounded-b-2xl"
            >
              <button
                @click="closeKartu"
                class="px-4 py-2 text-sm font-bold rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer"
              >
                Batal
              </button>
              <button
                @click="printKartu"
                class="px-4 py-2 text-sm font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white cursor-pointer flex items-center gap-1.5 no-print"
                title="Print via browser (window.print)"
              >
                <i class="fas fa-print"></i>Cetak
              </button>
              <button
                @click="eksporKartuPdf"
                :disabled="exportingKartuPdf"
                class="px-4 py-2 text-sm font-bold rounded-xl bg-teal-600 hover:bg-teal-700 text-white cursor-pointer flex items-center gap-1.5 no-print disabled:opacity-50"
                title="Download Kartu Kenaikan sebagai PDF (A4 portrait)"
              >
                <i :class="['fas', exportingKartuPdf ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i>
                {{ exportingKartuPdf ? 'Mengekspor…' : 'Ekspor PDF' }}
              </button>
              <button
                @click="saveKartu"
                :disabled="savingKartu"
                class="px-4 py-2 text-sm font-black rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 cursor-pointer flex items-center gap-1.5 no-print"
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
            class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full my-4 border-t-8 border-teal-600 flex flex-col max-h-[90vh]"
          >
            <header
              class="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 px-5 py-4"
            >
              <h3 class="text-lg md:text-xl font-black text-slate-800 dark:text-white">
                <i class="fas fa-arrow-up mr-2 text-blue-600"></i>Form Kenaikan
              </h3>
              <button
                @click="formOpen = false"
                class="text-slate-400 hover:text-red-500 text-2xl font-bold w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center cursor-pointer"
              >
                ×
              </button>
            </header>
            <div class="overflow-y-auto p-5 space-y-4">
              <div
                class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800"
              >
                <p
                  class="text-[10px] text-blue-600 dark:text-blue-300 font-black uppercase tracking-widest mb-1"
                >
                  Identitas Santri
                </p>
                <strong class="text-slate-800 dark:text-white text-lg font-black leading-tight">
                  {{ formSantri?.nama || '-' }}
                </strong>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Saat ini: {{ formSantri?.lembaga || '-'
                  }}{{ formSantri?.kelas ? ' · ' + formSantri.kelas : '' }}
                </p>
              </div>

              <div>
                <label
                  class="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide"
                >
                  Kelas Sekolah (Perbarui Jika Naik)
                </label>
                <select
                  v-model="formData.kelas_sekolah"
                  class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white cursor-pointer"
                >
                  <option value="">-- Pilih / Kosong --</option>
                  <option v-for="ks in KELAS_SEKOLAH_LIST" :key="ks" :value="ks">{{ ks }}</option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label
                    class="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide"
                  >
                    Lembaga Baru
                  </label>
                  <select
                    v-model="formData.lembaga"
                    class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white cursor-pointer"
                  >
                    <option value="">-- Pilih Lembaga --</option>
                    <option v-for="l in lembagaOptions" :key="l" :value="l">{{ l }}</option>
                  </select>
                </div>
                <div>
                  <label
                    class="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide"
                  >
                    Kelas/Jilid Baru
                  </label>
                  <select
                    v-model="formData.kelas"
                    class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white cursor-pointer"
                  >
                    <option value="">-- Pilih --</option>
                    <option v-for="kl in kelasOptions" :key="kl" :value="kl">{{ kl }}</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  class="block text-xs font-black text-blue-800 dark:text-blue-300 mb-1 uppercase tracking-wide"
                >
                  Guru Kelas Baru (Perbarui Jika Pindah Kelas)
                </label>
                <select
                  v-model="formData.guru"
                  class="w-full px-3 py-2 text-sm border border-blue-300 dark:border-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 cursor-pointer"
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
                  <option v-for="n in 30" :key="n" :value="n">JUZ {{ n }}</option>
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
                  class="block text-xs font-black text-purple-600 mb-1 uppercase tracking-wide"
                >
                  Khotam Ke? (Pra PTPT)
                </label>
                <select
                  v-model="formData.khotam_ke"
                  class="w-full px-3 py-2 text-sm border border-purple-300 dark:border-purple-700 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100 cursor-pointer"
                >
                  <option value="">-- Pilih Khotam --</option>
                  <option v-for="kh in khotamOptions" :key="kh" :value="kh">Khotam {{ kh }}</option>
                </select>
              </div>

              <div>
                <label
                  class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 uppercase tracking-wide"
                >
                  <i class="fas fa-comment-dots mr-1 text-blue-500"></i>Catatan / Rekomendasi
                  (Opsional)
                </label>
                <textarea
                  v-model="formData.catatan"
                  rows="3"
                  placeholder="Tulis catatan atau rekomendasi guru saat kenaikan ini..."
                  class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white resize-none"
                ></textarea>
              </div>
            </div>
            <footer
              class="flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 rounded-b-2xl"
            >
              <button
                type="button"
                @click="formOpen = false"
                class="text-xs font-bold px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                @click="saveFormKenaikan"
                :disabled="savingForm"
                class="text-xs font-black px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
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
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useGuru } from '@/composables/useGuru'
import { useExcel } from '@/composables/useExcel'
import { useLembaga } from '@/composables/useLembaga'
import { LEMBAGA_KENAIKAN_LIST, getKartuKenaikanSchema, getKopKartuLembaga } from '@/utils/kenaikan'
import { buildListPdf } from '@/utils/pdfBuilder'

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
const activeTab = ref('form')

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
    active: 'bg-blue-600 text-white border border-blue-700 ring-2 ring-blue-200',
    inactive: 'bg-white dark:bg-slate-900 text-blue-700 border border-blue-300 hover:bg-blue-50'
  },
  PTPT: {
    active: 'bg-purple-600 text-white border border-purple-700 ring-2 ring-purple-200',
    inactive:
      'bg-white dark:bg-slate-900 text-purple-700 border border-purple-300 hover:bg-purple-50'
  },
  PPPH: {
    active: 'bg-amber-600 text-white border border-amber-700 ring-2 ring-amber-200',
    inactive: 'bg-white dark:bg-slate-900 text-amber-700 border border-amber-300 hover:bg-amber-50'
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
    return list.sort((a, b) => (a.nama || '').localeCompare(b.nama || ''))
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
  return list.sort((a, b) => (a.nama || '').localeCompare(b.nama || ''))
})

// ────────── Riwayat tab ──────────
const riwayatLembaga = ref('')
const riwayatSearch = ref('')
const riwayatList = computed(() => {
  if (!riwayatLembaga.value) return []
  let list
  if (riwayatLembaga.value === 'TPQ') {
    list = santriList.value.filter(
      (s) =>
        (s.lembaga === 'TPQ Pagi' || s.lembaga === 'TPQ Sore' || s.lembaga === 'TPQ') &&
        s.aktif !== false
    )
  } else if (riwayatLembaga.value === 'PPPH') {
    list = santriList.value.filter(
      (s) => (s.lembaga === 'PPPH' || s.lembaga === 'P3H') && s.aktif !== false
    )
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
  return list.sort((a, b) => (a.nama || '').localeCompare(b.nama || ''))
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

function printKartu() {
  window.print()
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
  const lmb = String(formData.value.lembaga || '')
    .toLowerCase()
    .trim()
  if (!lmb) return []
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
  if (lmb === 'pra ptpt') return ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']
  if (lmb === 'ptpt') return ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6']
  if (lmb === 'ppph' || lmb === 'p3h') return ['Tahap 1', 'Tahap 2', 'Tahap 3']
  if (lmb === 'tpq' || lmb === 'tpq pagi' || lmb === 'tpq sore') {
    return ['Pra-TK', 'A', 'B', 'C', 'D', 'E', 'F', 'Tahsin', 'Tahfidz']
  }
  return []
})

const guruOptions = computed(() => {
  const lmb = formData.value.lembaga
  if (!lmb) return []
  return (guruRaw.value || [])
    .filter((g) => g.lembaga === lmb || g.lembaga_sekolah === lmb)
    .map((g) => g.nama)
    .filter(Boolean)
})

function openFormKenaikan(s) {
  formSantri.value = s
  // Normalize lembaga: try match case-insensitively against available options
  const opts = lembagaOptions.value
  const target = String(s.lembaga || '')
    .toLowerCase()
    .trim()
  const matched = opts.find((o) => String(o).toLowerCase().trim() === target)
  formData.value = {
    tanggal: new Date().toISOString().slice(0, 10),
    kelas_sekolah: s.kelas_sekolah || '',
    lembaga: matched || s.lembaga || '',
    kelas: s.kelas || '',
    guru: Array.isArray(s.guru) ? s.guru[0] || '' : s.guru || '',
    juz: s.juz ? String(s.juz).replace(/\D/g, '') : '',
    khotam_ke: '',
    catatan: ''
  }
  formOpen.value = true
}

async function saveFormKenaikan() {
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

    // Update kartu_kenaikan dengan ceremonial + entry catatan
    const kk = { ...(s.kartu_kenaikan || {}) }
    const lmb = formData.value.lembaga
    const kls = formData.value.kelas
    if (lmb && kls) {
      if (!kk[lmb]) kk[lmb] = {}
      if (!kk[lmb][kls]) kk[lmb][kls] = {}
      const block = kk[lmb][kls]
      if (!Array.isArray(block.entries)) block.entries = []
      const itemKey =
        formData.value.khotam_ke || (formData.value.juz ? `JUZ_${formData.value.juz}` : 'kenaikan')
      block.ceremonial = today
      block[itemKey] = today
      if (formData.value.catatan && formData.value.catatan.trim()) {
        block.entries.push({
          tanggal: today,
          itemId: itemKey,
          tipe: 'catatan',
          text: formData.value.catatan.trim()
        })
      }
      payload.kartu_kenaikan = kk
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
    // KOP untuk PDF: pakai KOP kartu kenaikan lembaga + fallback ke kopLine global
    const kop = {
      logoUrl: settingsObj.kop_logo || settingsObj.kopLogo || settingsObj.logoKop || '',
      line1: _kop.judul || 'KONTROL KENAIKAN KELAS',
      line2: _kop.subjudul || settingsObj.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM',
      line3: _kop.alamat || settingsObj.kopLine3 || '',
      line4: '',
      line5: ''
    }
    // Identitas (sebagai 4 rows tabel pertama, atau gabung di title)
    const identitas =
      `No. Induk: ${s.nis || '-'}   |   Nama: ${(s.nama || '').toUpperCase()}` +
      `   |   Tgl Masuk: ${s.tgl_masuk || '-'}   |   Alamat: ${(s.alamat || '').toUpperCase()}`
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
          item: `${sch.itemHeader || 'Item'} ${it.label || ''}`,
          tanggal: tgl ? formatDate(tgl) : '-'
        })
      }
      if (k.ceremonial) {
        const cv = dataKelas.ceremonial
        rows.push({
          kelas: k.label || '',
          item: 'Ceremonial',
          tanggal: cv ? formatDate(cv) : '-'
        })
      }
    }
    if (rows.length === 0) {
      toast.warning('Schema kartu kosong, tidak ada data untuk dicetak')
      return
    }
    await buildListPdf({
      kind: 'umum',
      orientation: 'p',
      format: 'a4',
      kop,
      title: `KARTU KENAIKAN — ${(s.nama || '').toUpperCase()}\n${identitas}`,
      columns: [
        { key: 'kelas', header: 'Kelas/Level', width: 60 },
        { key: 'item', header: sch.itemHeader || 'Item', width: 55 },
        { key: 'tanggal', header: 'Tanggal', width: 50 }
      ],
      rows,
      filename: `KartuKenaikan_${String(s.nama || 'santri').replace(/\s+/g, '_')}_${kartuLembaga.value.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`
    })
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
