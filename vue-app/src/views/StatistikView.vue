<template>
  <div class="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
    <!-- ============================================================
         HEADER BANNER — admin/guru: purple gradient
         ============================================================ -->
    <div
      v-if="role !== 'santri'"
      class="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl p-5 md:p-6 text-white shadow-lg"
    >
      <p class="text-[10px] font-black uppercase tracking-widest opacity-90">
        <i class="fas fa-chart-pie mr-1"></i>Dashboard Statistik
      </p>
      <h2 class="text-xl md:text-2xl font-black mt-1">{{ headerTitle }}</h2>
      <p class="text-xs md:text-sm font-medium mt-1 opacity-90">{{ headerSubtitle }}</p>
    </div>

    <!-- ============================================================
         SANTRI: Greeting hero (emerald gradient + logo watermark)
         ============================================================ -->
    <div
      v-if="role === 'santri' && santriProfile"
      class="bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-hover)] to-[var(--color-primary-hover)] rounded-2xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden"
    >
      <img
        :src="logoSrc"
        alt=""
        aria-hidden="true"
        class="absolute -right-4 -top-4 w-44 h-44 object-contain opacity-10 pointer-events-none"
      />
      <div class="relative">
        <h2 class="text-2xl md:text-3xl font-black drop-shadow">
          Ahlan, {{ santriProfile.nama }}!
        </h2>
        <p class="text-xs md:text-sm text-emerald-50/90 mt-1">
          Selamat datang di Portal Santri Qiraati
        </p>
        <span
          v-if="santriProfile.nis"
          class="inline-block mt-3 bg-[var(--bg-card)]/20 backdrop-blur-sm text-white text-xs font-black px-3 py-1 rounded-full"
          >No. Induk: {{ santriProfile.nis }}</span
        >
        <button
          @click="gotoProfil"
          class="ml-2 mt-3 inline-flex items-center gap-1.5 bg-[var(--bg-card)]/15 hover:bg-[var(--bg-card)]/25 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
        >
          <i class="fas fa-id-card"></i>Lihat Data Diri
        </button>
      </div>
    </div>

    <!-- ============================================================
         SANTRI: Data Saat Ini + Capaian Prestasi (2-col)
         ============================================================ -->
    <div v-if="role === 'santri' && santriProfile" class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <!-- Data Saat Ini -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3
          class="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 pb-2 border-b border-[var(--border-subtle)] flex items-center gap-2"
        >
          <i class="fas fa-id-card text-teal-600"></i>Data Saat Ini
        </h3>
        <div class="space-y-3">
          <div>
            <p
              class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest"
            >
              Kelas Sekolah
            </p>
            <p class="text-sm font-black text-[var(--text-primary)] mt-0.5">
              {{
                santriProfile.kelas_sekolah
                  ? formatKelasLabel(santriProfile.lembaga_sekolah, santriProfile.kelas_sekolah)
                  : '-'
              }}
            </p>
          </div>
          <div>
            <p
              class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest"
            >
              Lembaga Qiraati
            </p>
            <p class="text-sm font-black text-teal-700 dark:text-teal-300 mt-0.5">
              {{ santriProfile.lembaga || '-' }}
            </p>
          </div>
          <div>
            <p
              class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest"
            >
              Jilid / Kelas
            </p>
            <p class="text-sm font-black text-[var(--text-primary)] mt-0.5">
              {{ santriProfile.kelas || '-'
              }}{{
                santriProfile.juz && santriProfile.juz !== '-'
                  ? ' (Juz ' + juzNum(santriProfile.juz) + ')'
                  : ''
              }}
            </p>
          </div>
          <div>
            <p
              class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest"
            >
              Guru Kelas
            </p>
            <p class="text-sm font-black text-[var(--text-primary)] mt-0.5">
              {{ santriProfile.guru || santriProfile.guru_pagi || santriProfile.guru_sore || '-' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Capaian Prestasi -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div
          class="flex items-center justify-between mb-3 pb-2 border-b border-[var(--border-subtle)]"
        >
          <h3
            class="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-2"
          >
            <i class="fas fa-trophy text-cyan-700"></i>Capaian Prestasi
          </h3>
          <span
            class="text-[10px] font-black bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 px-2 py-0.5 rounded-full uppercase tracking-wider"
          >
            Periode: {{ periodeAktif }}
          </span>
        </div>
        <div class="grid grid-cols-3 gap-2 md:gap-3">
          <div
            class="bg-teal-50 dark:bg-teal-900/20 rounded-xl py-3 px-2 text-center border border-teal-100 dark:border-teal-700"
          >
            <p
              class="text-[9px] font-black text-teal-700 dark:text-teal-300 uppercase tracking-wider"
            >
              Awal Bulan
            </p>
            <p class="text-lg md:text-xl font-black text-[var(--text-primary)] mt-1">
              {{ santriProfile.prestasi_awal || '-' }}
            </p>
          </div>
          <div
            class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl py-3 px-2 text-center border border-emerald-100 dark:border-emerald-700"
          >
            <p
              class="text-[9px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider"
            >
              Akhir Bulan
            </p>
            <p class="text-lg md:text-xl font-black text-[var(--text-primary)] mt-1">
              {{ santriProfile.prestasi_akhir || '-' }}
            </p>
          </div>
          <div
            class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl py-3 px-2 text-center border border-cyan-100 dark:border-cyan-700"
          >
            <p
              class="text-[9px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wider"
            >
              Total Prestasi
            </p>
            <p class="text-lg md:text-xl font-black text-[var(--text-primary)] mt-1">
              {{ santriProfile.prestasi_total || '-' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         SANTRI: Catatan Bulan Ini (jika ada)
         ============================================================ -->
    <div
      v-if="role === 'santri' && santriProfile && catatanBulanIni"
      class="bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl p-4 md:p-5 border border-cyan-200 dark:border-cyan-700 shadow-sm"
    >
      <div class="flex items-start gap-3">
        <i class="fas fa-comment-dots text-cyan-700 text-xl mt-1 flex-shrink-0"></i>
        <div class="flex-1 min-w-0">
          <p
            class="text-xs font-black text-cyan-800 dark:text-cyan-300 uppercase tracking-wider mb-1"
          >
            Catatan Bulan Ini ({{ namaBulan[bulanIdx] }} {{ tahunIni }})
          </p>
          <p class="text-sm text-[var(--text-primary)] whitespace-pre-line leading-relaxed">
            {{ catatanBulanIni }}
          </p>
        </div>
      </div>
    </div>

    <!-- ============================================================
         SANTRI: 4 Collapsible Cards (Rekap / Statistik / Kartu / Rapor)
         ============================================================ -->
    <div v-if="role === 'santri' && santriProfile" class="space-y-3">
      <!-- Rekap Prestasi Bulanan -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <button
          @click="toggleSection('rekap')"
          class="w-full px-4 md:px-5 py-3 md:py-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition cursor-pointer"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div
              class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900 flex items-center justify-center shadow-md flex-shrink-0"
            >
              <i class="fas fa-book-open text-white"></i>
            </div>
            <div class="text-left min-w-0">
              <p class="text-sm md:text-base font-black text-[var(--text-primary)]">
                Rekap Prestasi Bulanan
              </p>
              <p class="text-[11px] text-[var(--text-secondary)]">
                Nilai Qiraati &amp; Diniyah per bulan
              </p>
            </div>
          </div>
          <i
            :class="[
              'fas text-[var(--text-tertiary)] transition-transform',
              sections.rekap ? 'fa-chevron-up' : 'fa-chevron-down'
            ]"
          ></i>
        </button>
        <div
          v-if="sections.rekap"
          class="border-t border-[var(--border-subtle)] p-4 md:p-5 bg-[var(--bg-card-elevated)]/50 dark:bg-slate-900/20"
        >
          <p class="text-xs text-[var(--text-secondary)] italic mb-3">
            <i class="fas fa-info-circle mr-1"></i>Detail nilai bulanan &amp; history capaian.
          </p>
          <router-link
            to="/rekap-prestasi"
            class="inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold px-4 py-2 rounded-lg transition cursor-pointer shadow-sm"
          >
            <i class="fas fa-external-link-alt"></i>Buka Rekap Lengkap
          </router-link>
        </div>
      </div>

      <!-- Statistik Prestasi -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <button
          @click="toggleSection('statistik')"
          class="w-full px-4 md:px-5 py-3 md:py-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition cursor-pointer"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div
              class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 flex items-center justify-center shadow-md flex-shrink-0"
            >
              <i class="fas fa-chart-line text-white"></i>
            </div>
            <div class="text-left min-w-0">
              <p class="text-sm md:text-base font-black text-[var(--text-primary)]">
                Statistik Prestasi
              </p>
              <p class="text-[11px] text-[var(--text-secondary)]">
                Selisih, total halaman, mutasi, status
              </p>
            </div>
          </div>
          <i
            :class="[
              'fas text-[var(--text-tertiary)] transition-transform',
              sections.statistik ? 'fa-chevron-up' : 'fa-chevron-down'
            ]"
          ></i>
        </button>
        <div
          v-if="sections.statistik"
          class="border-t border-[var(--border-subtle)] p-4 md:p-5 bg-[var(--bg-card-elevated)]/50 dark:bg-slate-900/20"
        >
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
            <div
              class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center border border-emerald-100 dark:border-emerald-700"
            >
              <p
                class="text-[9px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider"
              >
                Selisih Capaian
              </p>
              <p
                class="text-2xl md:text-3xl font-black text-emerald-800 dark:text-emerald-200 mt-1"
              >
                {{ selisihCapaian }}
              </p>
              <p class="text-[8px] text-[var(--text-secondary)] mt-0.5">halaman</p>
            </div>
            <div
              class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-3 text-center border border-cyan-100 dark:border-cyan-700"
            >
              <p
                class="text-[9px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wider"
              >
                Total Hal/Bulan
              </p>
              <p class="text-2xl md:text-3xl font-black text-cyan-800 dark:text-cyan-200 mt-1">
                {{ santriProfile.prestasi_total || '-' }}
              </p>
              <p class="text-[8px] text-[var(--text-secondary)] mt-0.5">{{ statusPrestasi }}</p>
            </div>
            <div
              class="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-3 text-center border border-teal-100 dark:border-teal-700"
            >
              <p
                class="text-[9px] font-black text-teal-700 dark:text-teal-300 uppercase tracking-wider"
              >
                Riwayat Mutasi
              </p>
              <p class="text-2xl md:text-3xl font-black text-teal-800 dark:text-teal-200 mt-1">
                {{ totalKartuKenaikan }}
              </p>
            </div>
            <div
              class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-3 text-center border border-cyan-100 dark:border-cyan-700"
            >
              <p
                class="text-[9px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wider"
              >
                Lembaga/Kelas
              </p>
              <p
                class="text-sm md:text-base font-black text-cyan-800 dark:text-cyan-200 mt-1 truncate"
              >
                {{ santriProfile.lembaga || '-' }}
              </p>
              <p class="text-[10px] font-bold text-[var(--text-secondary)] mt-0.5">
                {{ santriProfile.kelas || '-' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Kartu Kenaikan -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <button
          @click="toggleSection('kartu')"
          class="w-full px-4 md:px-5 py-3 md:py-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition cursor-pointer"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div
              class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900 flex items-center justify-center shadow-md flex-shrink-0"
            >
              <i class="fas fa-id-card text-white"></i>
            </div>
            <div class="text-left min-w-0">
              <p class="text-sm md:text-base font-black text-[var(--text-primary)]">
                Kartu Kenaikan
              </p>
              <p class="text-[11px] text-[var(--text-secondary)]">
                Tanggal naik jilid &amp; catatan guru
              </p>
            </div>
          </div>
          <i
            :class="[
              'fas text-[var(--text-tertiary)] transition-transform',
              sections.kartu ? 'fa-chevron-up' : 'fa-chevron-down'
            ]"
          ></i>
        </button>
        <div
          v-if="sections.kartu"
          class="border-t border-[var(--border-subtle)] p-4 md:p-5 bg-[var(--bg-card-elevated)]/50 dark:bg-slate-900/20"
        >
          <div v-if="totalKartuKenaikan === 0" class="text-center py-6">
            <i class="fas fa-inbox text-[var(--text-tertiary)] text-2xl mb-2"></i>
            <p class="text-xs text-[var(--text-secondary)] italic">Belum ada riwayat kenaikan jilid.</p>
          </div>
          <div v-else class="space-y-2">
            <div class="text-xs text-slate-700 dark:text-[var(--text-tertiary)]">
              <p class="mb-2"><strong>Total Riwayat:</strong> {{ totalKartuKenaikan }} entry</p>
              <p class="text-[var(--text-secondary)]">
                Klik tombol di bawah untuk lihat kartu kenaikan lengkap dengan catatan &amp;
                rekomendasi guru.
              </p>
            </div>
          </div>
          <router-link
            to="/naik-kelas"
            class="mt-3 inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold px-4 py-2 rounded-lg transition cursor-pointer shadow-sm"
          >
            <i class="fas fa-external-link-alt"></i>Buka Kartu Kenaikan
          </router-link>
        </div>
      </div>

      <!-- Rapor Semester -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <button
          @click="toggleSection('rapor')"
          class="w-full px-4 md:px-5 py-3 md:py-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition cursor-pointer"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div
              class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] flex items-center justify-center shadow-md flex-shrink-0"
            >
              <i class="fas fa-graduation-cap text-white"></i>
            </div>
            <div class="text-left min-w-0">
              <p class="text-sm md:text-base font-black text-[var(--text-primary)]">
                Rapor Semester
              </p>
              <p class="text-[11px] text-[var(--text-secondary)]">
                Nilai rapor lengkap (PDF print)
              </p>
            </div>
          </div>
          <i
            :class="[
              'fas text-[var(--text-tertiary)] transition-transform',
              sections.rapor ? 'fa-chevron-up' : 'fa-chevron-down'
            ]"
          ></i>
        </button>
        <div
          v-if="sections.rapor"
          class="border-t border-[var(--border-subtle)] p-4 md:p-5 bg-[var(--bg-card-elevated)]/50 dark:bg-slate-900/20"
        >
          <p class="text-xs text-[var(--text-secondary)] italic mb-3">
            <i class="fas fa-info-circle mr-1"></i>Rapor semester (Qiraati &amp; Diniyah) dengan
            opsi cetak / Save as PDF.
          </p>
          <router-link
            to="/rapor"
            class="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition cursor-pointer shadow-sm"
          >
            <i class="fas fa-external-link-alt"></i>Buka Rapor Semester
          </router-link>
        </div>
      </div>
    </div>

    <!-- ============================================================
         ADMIN: Top Stats Grid (Santri / Guru / Lembaga / Kelas)
         v.21.114.0528: hide 2 gradient cards (Santri Saya/Guru) untuk guru — kyai req,
         guru sudah lihat angka real di Statistik Santri Saya breakdown bawah
         ============================================================ -->
    <div v-if="isAdminMode" class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div
        class="bg-gradient-to-br from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900 rounded-xl p-3 md:p-4 shadow-sm text-white"
      >
        <i class="fas fa-users text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ totalSantriDisplay }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">
          {{ labelSantri }}
        </p>
      </div>
      <div
        class="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] rounded-xl p-3 md:p-4 shadow-sm text-white"
      >
        <i class="fas fa-chalkboard-teacher text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ totalGuruDisplay }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">
          {{ labelGuru }}
        </p>
      </div>
      <div
        v-if="isAdminMode"
        class="bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 rounded-xl p-3 md:p-4 shadow-sm text-white"
      >
        <i class="fas fa-building text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ lembagaCount }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">
          Lembaga Aktif
        </p>
      </div>
      <div
        v-if="isAdminMode"
        class="bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 rounded-xl p-3 md:p-4 shadow-sm text-white cursor-pointer hover:brightness-95 transition"
        @click="showKelasDetail = !showKelasDetail"
        title="Klik untuk rincian kelas"
      >
        <i class="fas fa-door-open text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ kelasCount }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">
          Kelas Total
        </p>
      </div>
    </div>

    <!-- v.07.0626: Diagnostik Kelas Total (klik kartu KELAS TOTAL) -->
    <div v-if="isAdminMode && showKelasDetail" class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <h4 class="text-sm font-black text-[var(--text-primary)]"><i class="fas fa-door-open text-cyan-600 mr-1"></i>Rincian Kelas Total ({{ kelasCount }})</h4>
        <div class="flex items-center gap-2">
          <button type="button" @click="bersihkanGuruInvalid" :disabled="bersihRunning" class="text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 px-3 py-1.5 rounded-lg"><i class="fas fa-broom mr-1"></i>Bersihkan guru invalid</button>
          <button type="button" @click="showKelasDetail = false" class="text-[var(--text-tertiary)] hover:text-rose-600"><i class="fas fa-times"></i></button>
        </div>
      </div>
      <p class="text-[11px] text-[var(--text-secondary)] mb-2">1 baris = kombinasi <b>guru x lembaga x kelas</b> (santri aktif yg punya guru). <span class="text-rose-600 font-bold">guru yatim</span> = guru tak ada di daftar guru aktif, kemungkinan SAMPAH (santri masih nyantol ke guru lama/terhapus). Perbaiki: edit santri tsb ganti gurunya, atau hapus santri sampah.</p>
      <div class="space-y-1 max-h-72 overflow-auto">
        <div v-for="(k, i) in kelasDetail" :key="i" :class="['flex items-center justify-between gap-2 text-xs px-3 py-1.5 rounded-lg', k.orphan ? 'bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700' : 'bg-slate-50 dark:bg-slate-800']">
          <span class="truncate"><b>{{ k.lembaga }}</b> &middot; {{ k.kelas }} &middot; {{ k.guru }} <span class="text-[var(--text-tertiary)]">({{ k.jml }} santri &middot; {{ k.jenis }})</span></span>
          <span v-if="k.orphan" class="text-[10px] font-bold text-rose-700 dark:text-rose-300 whitespace-nowrap"><i class="fas fa-triangle-exclamation mr-0.5"></i>yatim</span>
        </div>
      </div>
    </div>

    <!-- ============================================================
         v.95.0626 ADMIN/KEPALA: Guru Belum Input + Kelas Overload
         ============================================================ -->
    <div v-if="isAdminMode" class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <!-- Guru belum input bulan ini (klik -> halaman detail) -->
      <button
        type="button"
        @click="goGuruBelumInput"
        class="text-left bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer flex items-center gap-4"
      >
        <div class="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
          <i class="fas fa-user-clock text-amber-600 dark:text-amber-300 text-xl"></i>
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">
            Guru Belum Input &middot; {{ periodeLabel }}
          </p>
          <p class="text-2xl font-black text-[var(--text-primary)] mt-0.5">
            {{ guruBelumInput.length }}
            <span class="text-sm font-bold text-[var(--text-secondary)]">guru</span>
          </p>
          <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
            {{ totalSantriBelumInput }} santri belum diinput &middot; klik untuk detail
          </p>
        </div>
        <i class="fas fa-chevron-right text-[var(--text-tertiary)]"></i>
      </button>

      <!-- Kelas Overload (rasio guru:santri) -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center flex-shrink-0">
            <i class="fas fa-triangle-exclamation text-rose-600 dark:text-rose-300"></i>
          </div>
          <div class="min-w-0">
            <p class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Kelas Overload</p>
            <p class="text-xs font-bold text-[var(--text-primary)]">
              {{ kelasOverload.length }} kelas melebihi rasio guru:santri
            </p>
          </div>
        </div>
        <div v-if="kelasOverload.length === 0" class="text-xs text-[var(--text-tertiary)] italic py-3 text-center">
          Semua kelas dalam rasio ideal.
        </div>
        <div v-else class="space-y-1 max-h-52 overflow-auto">
          <div
            v-for="(k, i) in kelasOverload"
            :key="i"
            class="flex items-center justify-between gap-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-700 rounded-lg px-3 py-1.5"
          >
            <span class="text-xs truncate">
              <b class="text-[var(--text-primary)]">{{ k.lembaga }}</b> &middot; {{ k.kelas }} &middot; {{ k.guru }}
            </span>
            <span class="text-[10px] font-black text-rose-700 dark:text-rose-300 whitespace-nowrap">
              {{ k.jml }}/{{ k.ratio }} <span class="opacity-70">(+{{ k.lebih }})</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         ADMIN: Lembaga Prestasi Cards (Top 5 — PTPT &amp; PPPH)
         ============================================================ -->
    <!-- v.102: header + ekspor distribusi (detail santri + status + guru ampuan) -->
    <div
      v-if="isAdminMode && lembagaPrestasi.length > 0"
      class="flex items-center justify-between flex-wrap gap-2"
    >
      <h3 class="text-sm md:text-base font-black text-[var(--text-primary)]">
        <i class="fas fa-chart-simple text-teal-600 mr-1"></i>Distribusi Capaian Prestasi (PTPT &amp; PPPH)
      </h3>
      <div class="flex gap-2">
        <button
          @click="exportDistribusi('xlsx')"
          class="h-8 px-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
        >
          <i class="fas fa-file-excel"></i>Excel
        </button>
        <button
          @click="exportDistribusi('pdf')"
          class="h-8 px-3 inline-flex items-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition"
        >
          <i class="fas fa-file-pdf"></i>PDF
        </button>
      </div>
    </div>
    <div
      v-if="isAdminMode && lembagaPrestasi.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 gap-3"
    >
      <div
        v-for="lem in lembagaPrestasi"
        :key="lem.nama"
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div
          class="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 mb-3"
        >
          <h3
            class="text-sm md:text-base font-black text-[var(--text-primary)] uppercase tracking-wider"
          >
            {{ lem.nama }}
          </h3>
          <p class="text-[10px] text-[var(--text-secondary)] font-bold">
            {{ lem.dinilai }}/{{ lem.total }} dinilai
          </p>
        </div>

        <!-- v.95.0626: distribusi Kurang / Cukup / Bagus (PTPT & PPPH) -->
        <div v-if="lem.total > 0" class="grid grid-cols-3 gap-2 mb-3">
          <div
            class="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-700 rounded-lg p-2 text-center"
          >
            <p
              class="text-[10px] font-black text-rose-700 dark:text-rose-300 uppercase tracking-wider"
            >
              Kurang
            </p>
            <p class="text-xl font-black text-rose-700 dark:text-rose-300 mt-0.5">
              {{ lem.kurang }}
            </p>
            <p class="text-[8px] text-rose-600 dark:text-rose-400 mt-0.5">{{ lem.bandLabels[0] }}</p>
          </div>
          <div
            class="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-700 rounded-lg p-2 text-center"
          >
            <p
              class="text-[10px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wider"
            >
              Cukup
            </p>
            <p class="text-xl font-black text-cyan-700 dark:text-cyan-300 mt-0.5">
              {{ lem.cukup }}
            </p>
            <p class="text-[8px] text-cyan-700 dark:text-cyan-400 mt-0.5">{{ lem.bandLabels[1] }}</p>
          </div>
          <div
            class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-2 text-center"
          >
            <p
              class="text-[10px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider"
            >
              Bagus
            </p>
            <p class="text-xl font-black text-emerald-700 dark:text-emerald-300 mt-0.5">
              {{ lem.bagus }}
            </p>
            <p class="text-[8px] text-emerald-600 dark:text-emerald-400 mt-0.5">{{ lem.bandLabels[2] }}</p>
          </div>
        </div>

        <p
          class="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider mb-2"
        >
          <i class="fas fa-trophy text-cyan-600 mr-1"></i>Top 5 Santri Prestasi Tertinggi
        </p>
        <div v-if="lem.top5.length === 0" class="text-xs text-[var(--text-tertiary)] italic text-center py-3">
          Belum ada data prestasi pada periode ini.
        </div>
        <ol v-else class="space-y-1.5">
          <li
            v-for="(s, idx) in lem.top5"
            :key="s.id"
            @click="goSantriDetail(s.id)"
            class="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/30 hover:bg-teal-50 dark:hover:bg-teal-900/20 px-2 py-1.5 rounded-lg cursor-pointer transition"
          >
            <span
              :class="[
                'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0',
                idx === 0
                  ? 'bg-[var(--color-accent)] text-[var(--text-on-accent)]'
                  : idx === 1
                    ? 'bg-slate-300 text-[var(--text-primary)]'
                    : idx === 2
                      ? 'bg-emerald-500 text-emerald-900'
                      : 'bg-slate-200 text-[var(--text-secondary)]'
              ]"
              >{{ idx + 1 }}</span
            >
            <p class="flex-1 text-xs font-bold text-[var(--text-primary)] truncate">
              {{ s.nama }}
            </p>
            <p class="text-xs font-black text-cyan-700 dark:text-cyan-300">{{ s.totalDisplay }}</p>
            <i class="fas fa-chevron-right text-[10px] text-[var(--text-tertiary)]"></i>
          </li>
        </ol>
      </div>
    </div>

    <!-- ============================================================
         ADMIN: Statistik Lembaga grid (per-lembaga kelas/santri/guru)
         ============================================================ -->
    <div
      v-if="isAdminMode && statistikLembaga.length > 0"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3 class="text-sm md:text-base font-black text-[var(--text-primary)] mb-3">
        <i class="fas fa-chart-pie text-teal-600 mr-2"></i>Statistik Lembaga
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div
          v-for="lem in statistikLembaga"
          :key="lem.nama"
          @click="goLembagaDetail(lem.nama)"
          class="bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-subtle)] shadow-sm border-l-4 border-l-teal-500 hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer"
          title="Klik untuk buka data kelas (guru + santri)"
        >
          <h4
            class="font-black text-[var(--text-primary)] text-sm uppercase tracking-wider mb-3 flex items-center justify-between gap-2"
          >
            <span class="truncate">{{ lem.nama }}</span>
            <i class="fas fa-chevron-right text-[10px] text-[var(--text-tertiary)] flex-shrink-0"></i>
          </h4>
          <div class="grid grid-cols-3 gap-2 text-center">
            <div
              class="bg-teal-50 dark:bg-teal-900/20 rounded-lg py-2 border border-teal-100 dark:border-teal-800"
            >
              <p class="text-[9px] text-teal-700 dark:text-teal-300 font-bold uppercase">Kelas</p>
              <p class="text-lg font-black text-teal-800 dark:text-teal-200">{{ lem.kelas }}</p>
            </div>
            <div
              class="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg py-2 border border-cyan-100 dark:border-cyan-800"
            >
              <p class="text-[9px] text-cyan-700 dark:text-cyan-300 font-bold uppercase">Santri</p>
              <p class="text-lg font-black text-cyan-800 dark:text-cyan-200">{{ lem.santri }}</p>
            </div>
            <div
              class="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg py-2 border border-cyan-100 dark:border-cyan-800"
            >
              <p class="text-[9px] text-cyan-700 dark:text-cyan-300 font-bold uppercase">Guru</p>
              <p class="text-lg font-black text-cyan-800 dark:text-cyan-200">{{ lem.guru }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         ADMIN: Distribusi Santri per Lembaga (bar chart)
         ============================================================ -->
    <div
      v-if="isAdminMode && distribusiLembaga.length > 0"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3
        class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <i class="fas fa-chart-bar text-emerald-600 mr-2"></i>Distribusi Santri per Lembaga
      </h3>
      <div class="space-y-2">
        <div v-for="dist in distribusiLembaga" :key="dist.nama" class="flex items-center gap-3">
          <p
            class="text-xs font-bold text-[var(--text-primary)] w-32 truncate flex-shrink-0"
          >
            {{ dist.nama }}
          </p>
          <div class="flex-1 bg-[var(--bg-muted)] rounded-full h-5 overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-emerald-400 dark:from-emerald-700 to-emerald-600 dark:to-emerald-800 flex items-center justify-end px-2 text-[10px] font-black text-white transition-all"
              :style="{ width: dist.pct + '%' }"
            >
              {{ dist.count }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         ADMIN: AdminStatsCharts (chart.js 12-bulan)
         ============================================================ -->
    <AdminStatsCharts v-if="isAdminMode" :santri-list="scopedSantriAll" />

    <!-- ============================================================
         GURU: Statistik Pengajaran + Kehadiran + Kelas Saya
         ============================================================ -->
    <template v-if="role === 'guru'">
      <!-- Statistik Santri Saya (agregat santri yang diampu) -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2">
          <i class="fas fa-user-graduate text-teal-600 mr-2"></i>Statistik Santri Saya
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div class="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-teal-700 dark:text-teal-300 uppercase">Total Santri Diampu</p>
            <p class="text-2xl font-black text-[var(--text-primary)]">{{ totalSantriDisplay }}</p>
          </div>
          <div v-if="adaQiraati" class="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">Santri Ngaji (Qiraati)</p>
            <p class="text-2xl font-black text-[var(--text-primary)]">{{ santriQiraatiSaya.length }}</p>
          </div>
          <div v-if="adaSekolah" class="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-cyan-700 dark:text-cyan-300 uppercase">Santri Sekolah</p>
            <p class="text-2xl font-black text-[var(--text-primary)]">{{ santriSekolahSaya.length }}</p>
          </div>
          <div class="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-cyan-700 dark:text-cyan-300 uppercase">Kelas Diampu</p>
            <p class="text-2xl font-black text-[var(--text-primary)]">{{ kelasSaya.length }}</p>
          </div>
        </div>
      </div>

      <!-- v.100c: Tren perkembangan capaian Qiraati (Opsi A) — Kepala=lembaga, Guru=kelasnya (dipisah) -->
      <TrenCapaianChart
        v-if="isKepalaMode"
        :santri-ids="lembagaSantriIds"
        :title="`Tren Capaian — ${namaLembagaSaya}`"
        subtitle="Rata-rata halaman bertambah per bulan, se-lembaga Anda."
      />
      <template v-else>
        <TrenCapaianChart
          v-if="adaQiraati"
          :santri-ids="qiraatiSantriIds"
          title="Tren Capaian — Santri Ngaji Saya"
          subtitle="Rata-rata halaman bertambah per bulan (Qiraati)."
        />
        <TrenCapaianChart
          v-if="adaSekolah"
          :santri-ids="sekolahSantriIds"
          title="Tren Capaian Qiraati — Santri Sekolah Saya"
          subtitle="Capaian Qiraati dari santri kelas sekolah yang Anda ampu."
        />
      </template>

      <!-- Breakdown Qiraati (kalau guru ngaji) -->
      <div v-if="adaQiraati && qiraatiPrestasi.length > 0" class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2">
          <i class="fas fa-trophy text-teal-600 mr-2"></i>Santri Ngaji Berprestasi
        </h3>
        <ol class="space-y-2">
          <li v-for="(s, i) in qiraatiPrestasi" :key="s.id" class="flex items-center gap-3 bg-[var(--bg-card-elevated)] rounded-xl p-2.5 border border-[var(--border-subtle)]">
            <span :class="['w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0', i === 0 ? 'bg-teal-600 text-white' : i === 1 ? 'bg-slate-300 text-slate-700' : i === 2 ? 'bg-emerald-500 text-emerald-900' : 'bg-slate-200 text-slate-600']">{{ i + 1 }}</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</p>
              <p class="text-[10px] text-[var(--text-secondary)]">{{ s.lembaga }} · Kelas {{ s.kelas || '-' }}</p>
            </div>
            <p class="text-sm font-black text-teal-700 dark:text-teal-300">{{ prestasiNum(s) }}</p>
          </li>
        </ol>
      </div>

      <!-- Breakdown Sekolah (kalau guru sekolah) -->
      <div v-if="adaSekolah && sekolahPrestasi.length > 0" class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2">
          <i class="fas fa-trophy text-cyan-600 mr-2"></i>Santri Sekolah Berprestasi
        </h3>
        <ol class="space-y-2">
          <li v-for="(s, i) in sekolahPrestasi" :key="s.id" class="flex items-center gap-3 bg-[var(--bg-card-elevated)] rounded-xl p-2.5 border border-[var(--border-subtle)]">
            <span :class="['w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0', i === 0 ? 'bg-cyan-600 text-white' : i === 1 ? 'bg-slate-300 text-slate-700' : i === 2 ? 'bg-emerald-500 text-emerald-900' : 'bg-slate-200 text-slate-600']">{{ i + 1 }}</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</p>
              <p class="text-[10px] text-[var(--text-secondary)]">{{ s.lembaga_sekolah || s.lembaga }} · Kelas {{ s.kelas_sekolah || s.kelas || '-' }}</p>
            </div>
            <p class="text-sm font-black text-cyan-700 dark:text-cyan-300">{{ prestasiNum(s) }}</p>
          </li>
        </ol>
      </div>

      <!-- Kelas Saya -->
      <div v-if="kelasSaya.length > 0" class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2">
          <i class="fas fa-chalkboard-teacher text-cyan-600 mr-2"></i>Kelas Saya
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div v-for="k in kelasSaya" :key="k.lembaga + '_' + k.kelas" class="flex items-center justify-between gap-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-3 border border-cyan-100 dark:border-cyan-800">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-black text-[var(--text-primary)] truncate">{{ k.lembaga }} · Kelas {{ k.kelas }}</p>
              <p class="text-[10px] text-[var(--text-secondary)]"><i class="fas fa-users mr-1"></i>{{ k.santriCount }} santri</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Info: kehadiran & bisyaroh pribadi pindah ke menu Personal -->
      <div class="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-3 border border-teal-100 dark:border-teal-800 text-center">
        <p class="text-[11px] text-teal-700 dark:text-teal-300">
          <i class="fas fa-info-circle mr-1"></i>Data kehadiran &amp; slip bisyaroh pribadi Anda ada di menu
          <button @click="$router.push('/personal')" class="font-black underline cursor-pointer">Personal</button>.
        </p>
      </div>
    </template>

    <!-- ============================================================
         SANTRI: Riwayat Mondok (tanggal masuk)
         ============================================================ -->
    <div
      v-if="role === 'santri' && santriProfile?.tanggal_masuk"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3
        class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <i class="fas fa-history text-emerald-600 mr-2"></i>Riwayat Mondok
      </h3>
      <p class="text-sm text-[var(--text-secondary)]">
        <i class="fas fa-calendar-day text-emerald-500 mr-1.5"></i>
        <span class="text-[var(--text-secondary)] font-bold">Mondok sejak:</span>
        <span class="font-black text-[var(--text-primary)] ml-1.5">{{
          santriProfile.tanggal_masuk
        }}</span>
      </p>
    </div>

    <!-- ============================================================
         Loading state
         ============================================================ -->
    <div
      v-if="loadingAny"
      class="bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border-subtle)] shadow-sm text-center"
    >
      <i class="fas fa-spinner fa-spin text-2xl text-slate-300 dark:text-[var(--text-secondary)]"></i>
      <p class="text-xs text-[var(--text-tertiary)] mt-2">Memuat data statistik...</p>
    </div>
  </div>
</template>

<script setup>
// ============================================================================
// StatistikView.vue — Dashboard Statistik (admin / guru / santri 3-role)
// Recovered from minified chunk StatistikView-DppFnKCD.js
// ----------------------------------------------------------------------------
// Role-aware:
//   - admin: top stats (santri/guru/lembaga/kelas), per-lembaga prestasi
//            (top5 + PTPT distribusi Kurang/Cukup/Bagus), statistik lembaga
//            grid, distribusi bar chart, AdminStatsCharts (12-bulan chart.js)
//   - guru : top stats (santri saya/guru), statistik pengajaran, kehadiran
//            bulan ini, kelas yang diampu
//   - santri: greeting hero, data saat ini, capaian prestasi, catatan bulan,
//             4 collapsible action cards (rekap/statistik/kartu/rapor),
//             riwayat mondok
// ============================================================================

import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useSantri } from '@/composables/useSantri'
import { useGuru } from '@/composables/useGuru'
import { useLembaga, formatKelasLabel, getPkbmSubTier } from '@/composables/useLembaga'
import { subscribeColl } from '@/services/firestore'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import AdminStatsCharts from '@/components/charts/AdminStatsCharts.vue'
import TrenCapaianChart from '@/components/charts/TrenCapaianChart.vue' // v.100c: Opsi A — tren capaian
// v.21.107.0527: gating role konsisten (admin/super_admin/admin_keuangan)
import { isFullFilterRole, isKepalaLembaga } from '@/utils/roleScope'
import { juzNum } from '@/utils/format' // v.100e: normalisasi tampilan juz (anti dobel "Juz JUZ n")
import { useExcel } from '@/composables/useExcel' // v.102: ekspor distribusi (Excel)
import { buildListPdf, buildKopFromSettings } from '@/utils/pdfBuilder' // v.102: ekspor distribusi (PDF)
// v.95.0626: sumber data ter-scope (admin=semua, kepala/PJ=lembaganya) + guru belum input + overload
import { useStatistikScope, statusFromSelisih } from '@/composables/useStatistikScope'

// Logo dipakai sebagai watermark di greeting santri (dari public/)
const logoSrc = '/logo.png'

// ---- Stores & composables --------------------------------------------------
const router = useRouter()
const settings = useSettingsStore()
const auth = useAuthStore()

const sections = reactive({
  rekap: false,
  statistik: true,
  kartu: false,
  rapor: false
})
function toggleSection(name) {
  sections[name] = !sections[name]
}

const { santriRaw, loading: loadingSantri } = useSantri()
const { guruRaw, loading: loadingGuru } = useGuru()
const { lembagaRaw } = useLembaga()
const toast = useToast()
const confirmDlg = useConfirm()
const { exportStyled } = useExcel()
const bersihRunning = ref(false)

// ---- Role / loading --------------------------------------------------------
const role = computed(() => auth.sesiAktif?.role || 'guest')
// v.21.107.0527: isAdminMode true utk admin, super_admin, admin_keuangan
const isAdminMode = computed(() => isFullFilterRole(auth.sesiAktif))
const loadingAny = computed(() => loadingSantri.value || loadingGuru.value)

// v.95.0626: data ter-scope (kepala/PJ = se-lembaga) + kartu Guru Belum Input + Kelas Overload
const { scopedSantriAktif, scopedSantriAll, guruBelumInput, kelasOverload, periodeKeyNow } = useStatistikScope()
const _NAMA_BULAN_STAT = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const periodeLabel = computed(() => {
  const m = String(periodeKeyNow.value).match(/^(\d{4})_(\d{2})$/)
  return m ? `${_NAMA_BULAN_STAT[parseInt(m[2]) - 1]} ${m[1]}` : periodeKeyNow.value
})
const totalSantriBelumInput = computed(() =>
  guruBelumInput.value.reduce((sum, g) => sum + g.jml, 0)
)
function goSantriDetail(id) {
  if (id) router.push(`/statistik/santri/${id}`)
}
function goGuruBelumInput() {
  router.push('/statistik/guru-belum-input')
}

const isGuruAktif = (status) =>
  !status || ['aktif', 'tetap', 'kontrak'].includes(String(status).toLowerCase())

// ---- Aggregate counters ----------------------------------------------------
const totalSantri = computed(() => scopedSantriAll.value.length)
const santriAktif = computed(() => scopedSantriAll.value.filter((s) => s.aktif !== false).length)
const santriNonAktif = computed(() => totalSantri.value - santriAktif.value)

const totalGuru = computed(() => guruRaw.value.length)
const guruAktif = computed(() => guruRaw.value.filter((g) => isGuruAktif(g.status)).length)
const guruNonAktif = computed(() => totalGuru.value - guruAktif.value)

const lembagaCount = computed(() => {
  if (lembagaRaw.value.length > 0) return lembagaRaw.value.length
  const set = new Set()
  for (const s of scopedSantriAll.value) {
    if (s.aktif !== false && s.lembaga) set.add(String(s.lembaga).toUpperCase().trim())
  }
  return set.size
})

// v.21.108.0527: kelas dihitung dari assignment Kelas & Guru
// (jumlah unique kombinasi lembaga + guru pengampu yg punya santri ter-assign).
// Sebelumnya pakai master kelas_list (statis), tidak match realita.
// v.73.0526: Kelas count = unique kombinasi (lembaga+kelas) yang ada santri-nya.
// Sebelumnya hitung (lembaga+shift+guru) yang menghasilkan jumlah aneh (mirror jumlah lembaga).
// Sekarang lebih intuitif: 1 lembaga × N kelas yang ada santri-nya.
const kelasCount = computed(() => {
  const set = new Set()
  for (const s of scopedSantriAll.value) {
    if (s.aktif === false) continue
    // v.87.0526: Jumlah Kelas = DISTINCT (guru × lembaga × kelas) dari santri yang SUDAH punya guru.
    //   Aturan kyai (canonical): kelas dihitung dari GURU yang punya santri — 2 guru di lembaga+kelas
    //   sama = 2 kelas. Sebelumnya key cuma `lembaga|kelas` -> dua guru ke-collapse jadi 1 (SALAH).
    const lembNgaji = String(s.lembaga || '').trim().toLowerCase()
    const kelasNgaji = String(s.kelas || '').trim().toLowerCase()
    if (lembNgaji && kelasNgaji) {
      const guruNgaji = [s.guru_pagi, s.guru_sore, s.guru]
        .map((g) => String(g || '').trim().toLowerCase())
        .filter(Boolean)
      for (const g of guruNgaji) set.add(`${g}|${lembNgaji}|${kelasNgaji}`)
    }
    const lembSek = String(s.lembaga_sekolah || '').trim().toLowerCase()
    const kelasSek = String(s.kelas_sekolah || '').trim().toLowerCase()
    if (lembSek && kelasSek) {
      const guruSek = (Array.isArray(s.guru_sekolah) ? s.guru_sekolah : [])
        .map((g) => String(g || '').trim().toLowerCase())
        .filter(Boolean)
      for (const g of guruSek) set.add(`${g}|${lembSek}|${kelasSek}`)
    }
  }
  return set.size
})

// v.07.0626: diagnostik rincian Kelas Total + flag guru yatim (sampah data lama)
const showKelasDetail = ref(false)
const kelasDetail = computed(() => {
  const m = new Map()
  for (const s of scopedSantriAll.value) {
    if (s.aktif === false) continue
    const sid = String(s.id)
    const addK = (guru, lemb, kelas, jenis) => {
      const g = String(guru || '').trim(), l = String(lemb || '').trim(), k = String(kelas || '').trim()
      if (!g || !l || !k) return
      const key = g.toLowerCase() + '|' + l.toLowerCase() + '|' + k.toLowerCase()
      if (!m.has(key)) m.set(key, { guru: g, lembaga: l, kelas: k, jenis, ids: new Set() })
      m.get(key).ids.add(sid)
    }
    new Set([s.guru_pagi, s.guru_sore, s.guru].map((x) => String(x || '').trim()).filter(Boolean)).forEach((g) => addK(g, s.lembaga, s.kelas, 'Ngaji'))
    new Set((Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []).map((x) => String(x || '').trim()).filter(Boolean)).forEach((g) => addK(g, s.lembaga_sekolah, s.kelas_sekolah, 'Sekolah'))
  }
  const aktif = new Set(guruRaw.value.filter((g) => isGuruAktif(g.status)).map((g) => String(g.nama || '').trim().toLowerCase()))
  return [...m.values()]
    .map((x) => ({ guru: x.guru, lembaga: x.lembaga, kelas: x.kelas, jenis: x.jenis, jml: x.ids.size, orphan: !aktif.has(x.guru.toLowerCase()) }))
    .sort((a, b) => Number(b.orphan) - Number(a.orphan) || (a.lembaga + a.kelas).localeCompare(b.lembaga + b.kelas))
})

// v.07.0626: bersihkan field guru invalid (boolean true/false / 'true' / kosong) dari santri.
//   Santri TIDAK dihapus, cuma nilai sampah di guru_pagi/sore/guru/guru_sekolah dibuang. Idempotent.
async function bersihkanGuruInvalid() {
  const targets = []
  for (const s of santriRaw.value) {
    const upd = {}
    let changed = false
    if (Array.isArray(s.guru_sekolah)) {
      const cleaned = s.guru_sekolah.filter((g) => typeof g === 'string' && g.trim() !== '' && g !== 'true' && g !== 'false')
      if (cleaned.length !== s.guru_sekolah.length) { upd.guru_sekolah = cleaned; changed = true }
    } else if (s.guru_sekolah !== undefined && (typeof s.guru_sekolah !== 'string' || s.guru_sekolah === 'true' || s.guru_sekolah === 'false')) {
      upd.guru_sekolah = []; changed = true
    }
    for (const f of ['guru_pagi', 'guru_sore', 'guru']) {
      if (s[f] === true || s[f] === false || s[f] === 'true' || s[f] === 'false') { upd[f] = ''; changed = true }
    }
    if (changed) targets.push({ id: s.id, upd })
  }
  if (targets.length === 0) { toast.success('Tidak ada guru invalid. Data sudah bersih.'); return }
  const ok = await confirmDlg({
    title: 'Bersihkan guru invalid?',
    message: targets.length + ' santri akan dibersihkan field gurunya dari nilai sampah (true/false/kosong). Santri TIDAK dihapus, hanya field guru sampah yang dibuang. Idempotent.',
    confirmText: 'Bersihkan',
    danger: true
  })
  if (!ok) return
  bersihRunning.value = true
  let okc = 0, fail = 0
  try {
    for (const t of targets) {
      try { await setDoc(doc(db, 'santri', String(t.id)), t.upd, { merge: true }); okc++ } catch (e) { fail++ }
    }
    toast.success('Bersih: ' + okc + ' santri diperbaiki' + (fail ? (', ' + fail + ' gagal') : ''))
  } finally { bersihRunning.value = false }
}

// ---- Helpers ---------------------------------------------------------------
function parseNum(value) {
  const m = String(value || '').match(/\d+/)
  return m ? parseInt(m[0]) : 0
}

function totalDisplay(s) {
  if (s.lembaga === 'PTPT') {
    const diff = parseNum(s.prestasi_akhir) - parseNum(s.prestasi_awal)
    return diff > 0 ? `${diff} Hal` : '-'
  }
  return s.prestasi_total || parseNum(s.prestasi_akhir) || '-'
}

// ---- ADMIN: Per-lembaga prestasi (top5 + PTPT distribusi) ------------------
// v.21.107.0527: pakai isAdminMode + URUTAN_LEMBAGA expanded
// v.95.0626: Top 5 HANYA PTPT & PPPH. Nilai = selisih (akhir - awal): PTPT "Hal",
//   PPPH "Hadits". Band per lembaga (PPPH <5/5-20/>20). Data ter-scope (kepala/PJ
//   = se-lembaganya). Kartu kosong (total 0) disembunyikan.
const PRESTASI_LEMBAGA = ['PTPT', 'PPPH']
const lembagaPrestasi = computed(() => {
  if (!isAdminMode.value) return []
  const src = scopedSantriAktif.value
  return PRESTASI_LEMBAGA.map((nama) => {
    const low = nama.toLowerCase()
    const list = src.filter((s) => String(s.lembaga || '').trim().toLowerCase() === low)
    const dinilai = list.filter((s) => parseNum(s.prestasi_akhir) > 0).length
    const unit = nama === 'PPPH' ? 'Hadits' : 'Hal'
    const top5 = list
      .map((s) => ({ s, val: parseNum(s.prestasi_akhir) - parseNum(s.prestasi_awal) }))
      .filter((x) => x.val > 0)
      .sort((a, b) => b.val - a.val)
      .slice(0, 5)
      .map((x) => ({ id: x.s.id, nama: x.s.nama, totalDisplay: `${x.val} ${unit}` }))
    let kurang = 0,
      cukup = 0,
      bagus = 0
    for (const s of list) {
      const st = statusFromSelisih(parseNum(s.prestasi_akhir) - parseNum(s.prestasi_awal), nama)
      if (st === 'kurang') kurang++
      else if (st === 'cukup') cukup++
      else if (st === 'bagus') bagus++
    }
    const bandLabels =
      nama === 'PPPH' ? ['<5 hadits', '5-20 hadits', '>20 hadits'] : ['<5 hal', '5-9 hal', '>=10 hal']
    return { nama, total: list.length, dinilai, top5, kurang, cukup, bagus, bandLabels }
  }).filter((x) => x.total > 0)
})

// v.102: ekspor distribusi capaian (PTPT & PPPH) — DETAIL per santri + status + guru ampuan
function _distribusiRows() {
  const out = []
  const src = scopedSantriAktif.value || []
  let no = 0
  for (const nama of PRESTASI_LEMBAGA) {
    const low = nama.toLowerCase()
    const list = src.filter((s) => String(s.lembaga || '').trim().toLowerCase() === low)
    for (const s of list) {
      const awal = parseNum(s.prestasi_awal)
      const akhir = parseNum(s.prestasi_akhir)
      const selisih = akhir - awal
      const st = statusFromSelisih(selisih, nama)
      const gSek = Array.isArray(s.guru_sekolah) ? s.guru_sekolah.filter(Boolean).join(' | ') : (s.guru_sekolah || '')
      out.push({
        no: ++no,
        nama: s.nama || '',
        lembaga: nama,
        kelas: s.kelas || '',
        awal,
        akhir,
        selisih,
        status: st === 'bagus' ? 'Bagus' : st === 'cukup' ? 'Cukup' : st === 'kurang' ? 'Kurang' : '-',
        guru_pagi: s.guru_pagi || s.guru || '',
        guru_sore: s.guru_sore || '',
        guru_sekolah: gSek
      })
    }
  }
  return out
}
const _DIST_COLS = [
  { key: 'no', header: 'No', width: 5 },
  { key: 'nama', header: 'Nama Santri', width: 26 },
  { key: 'lembaga', header: 'Lembaga', width: 10 },
  { key: 'kelas', header: 'Kelas', width: 10 },
  { key: 'awal', header: 'Awal', width: 8 },
  { key: 'akhir', header: 'Akhir', width: 8 },
  { key: 'selisih', header: 'Selisih', width: 8 },
  { key: 'status', header: 'Status', width: 10 },
  { key: 'guru_pagi', header: 'Guru Pagi', width: 18 },
  { key: 'guru_sore', header: 'Guru Sore', width: 18 },
  { key: 'guru_sekolah', header: 'Guru Sekolah', width: 20 }
]
async function exportDistribusi(fmt) {
  const rows = _distribusiRows()
  if (!rows.length) {
    toast.error('Belum ada data distribusi untuk diekspor')
    return
  }
  const ss = settings.settings || {}
  const stamp = new Date().toISOString().slice(0, 10)
  try {
    if (fmt === 'pdf') {
      await buildListPdf({
        kind: 'umum',
        orientation: 'l',
        format: 'F4',
        kop: buildKopFromSettings(ss),
        title: 'DISTRIBUSI CAPAIAN PRESTASI (PTPT & PPPH)',
        columns: _DIST_COLS,
        rows,
        filename: `distribusi_prestasi_${stamp}.pdf`
      })
    } else {
      await exportStyled(rows, {
        filename: `distribusi_prestasi_${stamp}.xlsx`,
        sheetName: 'Distribusi Prestasi',
        kop: [ss.kopLine1 || '', ss.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM', ss.kopLine3 || '', ss.kopLine4 || ''],
        subtitle: `Distribusi Capaian Prestasi — ${rows.length} santri (${new Date().toLocaleDateString('id-ID')})`,
        columns: _DIST_COLS
      })
    }
    toast.success('Ekspor distribusi berhasil')
  } catch (e) {
    toast.error('Gagal ekspor: ' + (e.message || e))
  }
}

// ---- ADMIN: Distribusi santri per lembaga (bar) ----------------------------
const distribusiLembaga = computed(() => {
  if (role.value !== 'admin') return []
  const map = {}
  const add = (k) => { const key = String(k || '').trim(); if (key) map[key] = (map[key] || 0) + 1 }
  scopedSantriAll.value
    .filter((s) => s.aktif !== false)
    .forEach((s) => {
      // v.98.0626: hitung lembaga ngaji + lembaga FORMAL (sekolah). PKBM dipecah SMP/SMA.
      let any = false
      if (String(s.lembaga || '').trim()) { add(s.lembaga); any = true }
      const ls = String(s.lembaga_sekolah || '').trim()
      if (ls) {
        add(ls.toUpperCase() === 'PKBM' ? (getPkbmSubTier(s.kelas_sekolah) || 'PKBM') : ls)
        any = true
      }
      if (!any) add('(Tanpa Lembaga)')
    })
  const max = Math.max(...Object.values(map), 1)
  return Object.entries(map)
    .map(([nama, count]) => ({
      nama,
      count,
      pct: Math.max(8, Math.round((count / max) * 100))
    }))
    .sort((a, b) => b.count - a.count)
})

// ---- ADMIN: Statistik per lembaga (kelas + santri + guru) ------------------
// v.21.107.0527:
// - Role gating pakai isAdminMode (admin/super_admin/admin_keuangan).
// - kelasSet di-hitung dari master kelas (l.kelas length), fallback unique
//   kelas santri (s.kelas || s.kelas_sekolah). Sebelumnya s.guru (BUG).
// - URUTAN diperluas (TK, MI, MTs, MA, SDI, SMP, SMA, PKBM, Yayasan)
const URUTAN_LEMBAGA = [
  'TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH',
  'TK', 'SDI', 'SMP', 'SMA', 'PKBM'
]
// v.21.108.0527: Kelas dihitung dari assignment santri ↔ guru di "Kelas & Guru"
// (Master Data). Untuk tiap lembaga:
//   - ngaji (TPQ Pagi/Sore, Pra PTPT, PTPT, PPPH): unique guru_pagi+guru_sore
//     dari santri yg lembaga match
//   - sekolah (TK, SDI, MI, MTs, MA, SMP, SMA, PKBM): unique guru di
//     guru_sekolah[] dari santri yg lembaga_sekolah match
// Santri yg belum di-assign ke guru → tidak menambah hitungan kelas.
function isSekolahLembaga(nama) {
  const n = String(nama || '').toUpperCase()
  return ['TK', 'SDI', 'MI', 'MTS', 'MA', 'SMP', 'SMA', 'PKBM'].some((s) => n.includes(s))
}
const statistikLembaga = computed(() => {
  if (!isAdminMode.value) return []
  const lembList = (lembagaRaw.value || []).filter((l) => Array.isArray(l.kelas) && l.kelas.length > 0)
  // v.98.0626: PKBM dipecah jadi SMP (VII-IX) & SMA (X-XII). Guru per sub-tier
  //   diturunkan dari assignment guru_sekolah santri (master guru PKBM tak ber-sub-tier).
  // v.99: guru PKBM TIDAK displit SMP/SMA — guru tetap di unit PKBM (master). Hitung sekali, tampil sama di SMP & SMA.
  const guruPkbmTotal = guruRaw.value.filter((g) =>
    isGuruAktif(g.status) &&
    (String(g.lembaga_sekolah || '').trim().toUpperCase() === 'PKBM' ||
      String(g.lembaga || '').trim().toUpperCase() === 'PKBM')
  ).length
  const buildPkbmTier = (tier) => {
    const sl = scopedSantriAll.value.filter((s) => {
      if (s.aktif === false) return false
      const isPk = String(s.lembaga_sekolah || '').trim().toUpperCase() === 'PKBM' ||
        String(s.lembaga || '').trim().toUpperCase() === 'PKBM'
      // v.99: kelas_sekolah fallback ke kelas; getPkbmSubTier robust (Romawi/Arab/prefix)
      return isPk && getPkbmSubTier(s.kelas_sekolah || s.kelas) === tier
    })
    const kg = new Set()
    for (const s of sl) {
      const kls = String(s.kelas_sekolah || '').trim().toLowerCase()
      for (const g of (Array.isArray(s.guru_sekolah) ? s.guru_sekolah : [])) {
        const t = String(g || '').trim().toLowerCase()
        if (t && kls) kg.add(t + '|' + kls)
      }
    }
    return { nama: tier, kelas: kg.size, santri: sl.length, guru: guruPkbmTotal }
  }
  return lembList
    .map((l) => {
      const nama = l.lembaga || l.nama
      const namaNorm = String(nama || '').trim().toLowerCase()
      const isSekolah = isSekolahLembaga(nama)
      // v.88.0526: normalize match (trim/lowercase) — fix lembaga (mis. TPQ Pagi/Sore) terhitung 0 krn beda casing/spasi.
      const matchLemb = (val) => String(val || '').trim().toLowerCase() === namaNorm
      const santriList = scopedSantriAll.value.filter(
        (s) => (matchLemb(s.lembaga) || matchLemb(s.lembaga_sekolah)) && s.aktif !== false
      )
      // v.88.0526: kelas = DISTINCT (guru x kelas) — konsisten dgn kelasCount (guru x lembaga x kelas).
      //   Sebelumnya cuma distinct guru sehingga tidak sesuai aturan canonical & beda dari KELAS TOTAL.
      const kelasGuruSet = new Set()
      for (const s of santriList) {
        if (isSekolah) {
          const kls = String(s.kelas_sekolah || '').trim().toLowerCase()
          const arr = Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []
          for (const g of arr) {
            const t = String(g || '').trim().toLowerCase()
            if (t && kls) kelasGuruSet.add(t + '|' + kls)
          }
        } else {
          const kls = String(s.kelas || '').trim().toLowerCase()
          const gp = String(s.guru_pagi || '').trim().toLowerCase()
          const gs = String(s.guru_sore || '').trim().toLowerCase()
          if (gp && kls) kelasGuruSet.add(gp + '|' + kls)
          if (gs && kls) kelasGuruSet.add(gs + '|' + kls)
        }
      }
      const santriCount = santriList.length
      const guruCount = guruRaw.value.filter(
        (g) =>
          (matchLemb(g.lembaga) || matchLemb(g.lembaga_sekolah)) && isGuruAktif(g.status)
      ).length
      return { nama, kelas: kelasGuruSet.size, santri: santriCount, guru: guruCount }
    })
    // v.98.0626: ganti kartu PKBM jadi 2 kartu SMP & SMA
    .flatMap((row) =>
      String(row.nama).trim().toLowerCase() === 'pkbm'
        ? [buildPkbmTier('SMP'), buildPkbmTier('SMA')]
        : [row]
    )
    .sort((a, b) => {
      const ia = URUTAN_LEMBAGA.indexOf(a.nama)
      const ib = URUTAN_LEMBAGA.indexOf(b.nama)
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    })
})

// v.99: Detail kelas per lembaga (drill-down dari kartu Statistik Lembaga) — kelas → guru + daftar santri
// v.100 Batch7 (T21): klik kartu Statistik Lembaga → halaman data kelas (guru + santri)
function goLembagaDetail(nama) {
  if (nama) router.push(`/statistik/lembaga/${encodeURIComponent(nama)}`)
}

// ---- Header label (role-aware) --------------------------------------------
// v.21.107.0527: admin/super_admin/admin_keuangan semua dapat label "Lengkap"
const headerTitle = computed(() => {
  if (isAdminMode.value) return 'Statistik Lengkap'
  if (role.value === 'guru') return 'Statistik Kelas Saya'
  if (role.value === 'santri') return 'Statistik Saya'
  return 'Statistik'
})
const headerSubtitle = computed(() => {
  if (isAdminMode.value) return 'Data ringkas seluruh pondok.'
  if (role.value === 'guru') return 'Santri yang Anda ajar & data kehadiran Anda.'
  if (role.value === 'santri') return 'Pencapaian & prestasi Anda di pondok.'
  return ''
})

// ---- Display counters per role --------------------------------------------
// v.21.107.0527: admin display = santri AKTIF (selaras dgn labelSantri yg
// breakdown aktif/non). Sebelumnya totalSantri menghitung semua, bisa
// menyesatkan.
const totalSantriDisplay = computed(() => {
  if (isAdminMode.value) return santriAktif.value
  if (role.value === 'guru') {
    const guruName = String(auth.sesiAktif?.guru || auth.sesiAktif?.nama || '')
      .toLowerCase()
      .trim()
    if (!guruName) return 0
    return santriRaw.value.filter((s) => {
      if (s.aktif === false) return false
      const gp = String(s.guru_pagi || '')
        .toLowerCase()
        .trim()
      const gs = String(s.guru_sore || '')
        .toLowerCase()
        .trim()
      const g = String(s.guru || '')
        .toLowerCase()
        .trim()
      const gsek = Array.isArray(s.guru_sekolah)
        ? s.guru_sekolah.map((x) =>
            String(x || '')
              .toLowerCase()
              .trim()
          )
        : []
      return gp === guruName || gs === guruName || g === guruName || gsek.includes(guruName)
    }).length
  }
  return 0
})

const labelSantri = computed(() => {
  if (isAdminMode.value) {
    return santriNonAktif.value > 0
      ? `Total (${santriAktif.value} aktif / ${santriNonAktif.value} non)`
      : 'Total Santri'
  }
  if (role.value === 'guru') return 'Santri Saya'
  return 'Santri'
})

// v.21.107.0527: tampilkan guru AKTIF, label sudah pisah aktif/non
const totalGuruDisplay = computed(() => (isAdminMode.value ? guruAktif.value : 0))

const labelGuru = computed(() => {
  if (isAdminMode.value) {
    return guruNonAktif.value > 0
      ? `Total (${guruAktif.value} aktif / ${guruNonAktif.value} non)`
      : 'Total Guru/Pegawai'
  }
  return 'Guru'
})

// ============================================================================
// SANTRI ROLE
// ============================================================================
const santriProfile = computed(() => {
  if (role.value !== 'santri') return null
  const id = auth.sesiAktif?.id
  return santriRaw.value.find((s) => String(s.id) === String(id)) || null
})

const namaBulan = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]
const now = new Date()
const bulanIdx = now.getMonth()
const tahunIni = now.getFullYear()

const catatanBulanIni = computed(() => {
  const p = santriProfile.value
  if (!p || !p.catatan_bulanan || typeof p.catatan_bulanan !== 'object') return ''
  const key = `${tahunIni}_${String(bulanIdx + 1).padStart(2, '0')}`
  return p.catatan_bulanan[key] || ''
})

const selisihCapaian = computed(() => {
  if (!santriProfile.value) return 0
  const akhir = parseNum(santriProfile.value.prestasi_akhir)
  const awal = parseNum(santriProfile.value.prestasi_awal)
  return Math.max(0, akhir - awal)
})

const statusPrestasi = computed(() => {
  if (!santriProfile.value) return ''
  const total = parseNum(santriProfile.value.prestasi_total)
  if (total === 0) return 'BELUM DINILAI'
  if (total < 5) return 'KURANG'
  if (total <= 9) return 'CUKUP'
  return 'BAGUS'
})

const totalKartuKenaikan = computed(() => {
  const kk = santriProfile.value?.kartu_kenaikan
  if (!kk || typeof kk !== 'object') return 0
  let count = 0
  for (const tahun in kk) {
    for (const bulan in kk[tahun] || {}) {
      const entries = kk[tahun][bulan]?.entries || []
      count += Array.isArray(entries) ? entries.length : 0
    }
  }
  return count
})

// v.21.107.0527: jangan hardcode periode Hijriah (cepat kadaluarsa)
const periodeAktif = computed(() => settings.settings?.periodeAktif || settings.settings?.txtPeriode || '-')

function gotoProfil() {
  router.push('/profil')
}

// ============================================================================
// GURU ROLE
// ============================================================================
const guruProfile = computed(() => {
  if (role.value !== 'guru') return null
  const id = auth.sesiAktif?.id
  return guruRaw.value.find((g) => String(g.id) === String(id)) || null
})

const guruLembaga = computed(() => guruProfile.value?.lembaga || '-')
const guruJabatan = computed(() => guruProfile.value?.jabatan || 'Guru')

const kelasSaya = computed(() => {
  if (role.value !== 'guru') return []
  const guruName = String(auth.sesiAktif?.guru || auth.sesiAktif?.nama || '')
    .toLowerCase()
    .trim()
  if (!guruName) return []
  const map = new Map()
  for (const s of santriRaw.value) {
    if (s.aktif === false) continue
    const gp = String(s.guru_pagi || '')
      .toLowerCase()
      .trim()
    const gs = String(s.guru_sore || '')
      .toLowerCase()
      .trim()
    const g = String(s.guru || '')
      .toLowerCase()
      .trim()
    const gsek = Array.isArray(s.guru_sekolah)
      ? s.guru_sekolah.map((x) =>
          String(x || '')
            .toLowerCase()
            .trim()
        )
      : []
    if (gp !== guruName && gs !== guruName && g !== guruName && !gsek.includes(guruName)) continue
    const key = `${s.lembaga || '-'}_${s.kelas || '-'}`
    if (!map.has(key)) {
      map.set(key, { lembaga: s.lembaga || '-', kelas: s.kelas || '-', santriCount: 0 })
    }
    map.get(key).santriCount++
  }
  return [...map.values()].sort(
    (a, b) =>
      String(a.lembaga).localeCompare(String(b.lembaga)) ||
      String(a.kelas).localeCompare(String(b.kelas))
  )
})

// v.21.84.0527: Breakdown Qiraati vs Sekolah santri yang diampu guru
function _guruNameLower() {
  return String(auth.sesiAktif?.guru || auth.sesiAktif?.nama || '').toLowerCase().trim()
}
function prestasiNum(s) {
  const v = s.prestasi_total ?? s.prestasi_akhir ?? 0
  const n = parseFloat(String(v).replace(/[^0-9.]/g, ''))
  return isNaN(n) ? 0 : n
}

// Santri diampu via guru_pagi/guru_sore = Qiraati (ngaji)
const santriQiraatiSaya = computed(() => {
  if (role.value !== 'guru') return []
  const gn = _guruNameLower()
  if (!gn) return []
  return santriRaw.value.filter((s) => {
    if (s.aktif === false) return false
    const gp = String(s.guru_pagi || '').toLowerCase().trim()
    const gs = String(s.guru_sore || '').toLowerCase().trim()
    const g = String(s.guru || '').toLowerCase().trim()
    return gp === gn || gs === gn || g === gn
  })
})

// Santri diampu via guru_sekolah[] = Sekolah
const santriSekolahSaya = computed(() => {
  if (role.value !== 'guru') return []
  const gn = _guruNameLower()
  if (!gn) return []
  return santriRaw.value.filter((s) => {
    if (s.aktif === false) return false
    const gsek = Array.isArray(s.guru_sekolah)
      ? s.guru_sekolah.map((x) => String(x || '').toLowerCase().trim())
      : []
    return gsek.includes(gn)
  })
})

const adaQiraati = computed(() => santriQiraatiSaya.value.length > 0)
const adaSekolah = computed(() => santriSekolahSaya.value.length > 0)

// Santri berprestasi (top 5 by prestasi_total) — Qiraati & Sekolah terpisah
const qiraatiPrestasi = computed(() =>
  [...santriQiraatiSaya.value]
    .filter((s) => prestasiNum(s) > 0)
    .sort((a, b) => prestasiNum(b) - prestasiNum(a))
    .slice(0, 5)
)
const sekolahPrestasi = computed(() =>
  [...santriSekolahSaya.value]
    .filter((s) => prestasiNum(s) > 0)
    .sort((a, b) => prestasiNum(b) - prestasiNum(a))
    .slice(0, 5)
)

// v.100c: Tren perkembangan capaian (Opsi A) — id santri per scope untuk TrenCapaianChart.
//   Kepala/PJ -> se-lembaga (scopedSantriAktif). Guru -> kelasnya (ngaji & sekolah, DIPISAH).
const isKepalaMode = computed(() => isKepalaLembaga(auth.sesiAktif))
const namaLembagaSaya = computed(() => auth.sesiAktif?.lembaga || 'Lembaga')
const lembagaSantriIds = computed(() => scopedSantriAktif.value.map((s) => String(s.id)))
const qiraatiSantriIds = computed(() => santriQiraatiSaya.value.map((s) => String(s.id)))
const sekolahSantriIds = computed(() => santriSekolahSaya.value.map((s) => String(s.id)))

// Kehadiran guru bulan ini (subscribe absensi_shift_guru)
const absensiShiftGuru = ref([])
let unsubAbsensi = null
onMounted(() => {
  // v.21.107.0527: hemat reads — subscribe hanya kalau role 'guru'
  if (role.value !== 'guru') return
  unsubAbsensi = subscribeColl('absensi_shift_guru', (docs) => {
    absensiShiftGuru.value = docs || []
  })
})
onUnmounted(() => {
  if (unsubAbsensi) {
    try {
      unsubAbsensi()
    } catch {}
  }
})

// v.21.107.0527:
// - 'terlambat' dianggap hadir (selaras Bisyaroh bonus + AbsensiGuruView)
// - hitung UNIQUE tanggal (jangan double-count 3 shift dlm 1 hari)
const kehadiranGuru = computed(() => {
  const g = guruProfile.value
  if (!g) return { hadir: 0, sakit: 0, izin: 0, alpa: 0 }
  const d = new Date()
  const prefix = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-`
  const hadirSet = new Set()
  const sakitSet = new Set()
  const izinSet = new Set()
  const alpaSet = new Set()
  for (const row of absensiShiftGuru.value) {
    const tgl = String(row.tanggal || '')
    if (!tgl.startsWith(prefix)) continue
    if (String(row.guru_id || row.guruId || '') !== String(g.id)) continue
    const st = String(row.status || '').toLowerCase()
    if (st === 'hadir' || st === 'masuk' || st === 'terlambat') hadirSet.add(tgl)
    else if (st === 'sakit') sakitSet.add(tgl)
    else if (st === 'izin') izinSet.add(tgl)
    else if (st === 'alpa' || st === 'alpha') alpaSet.add(tgl)
  }
  return {
    hadir: hadirSet.size,
    sakit: sakitSet.size,
    izin: izinSet.size,
    alpa: alpaSet.size
  }
})
</script>
