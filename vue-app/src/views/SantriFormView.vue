<template>
  <div class="p-3 md:p-5 max-w-4xl mx-auto space-y-4 page-narrow">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm flex items-center justify-between gap-3">
      <div>
        <h1 class="text-lg md:text-xl font-black text-[var(--text-primary)]">
          <i :class="editingId ? 'fas fa-edit text-cyan-500' : 'fas fa-user-plus text-teal-500'" class="mr-2"></i>
          {{ editingId ? `Edit Santri: ${form.nama}` : 'Tambah Santri Baru' }}
        </h1>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">Form lengkap CRUD santri</p>
      </div>
      <router-link to="/santri" class="px-3 py-2 text-sm bg-[var(--bg-muted)] hover:bg-slate-200 text-slate-700 dark:text-[var(--text-tertiary)] font-bold rounded-xl transition">
        <i class="fas fa-arrow-left mr-1"></i>Kembali
      </router-link>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
      <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
      <p class="text-sm text-[var(--text-secondary)] font-bold">Memuat data santri...</p>
    </div>

    <form v-else @submit.prevent="onSubmit" class="space-y-4">
      <!-- Identitas Section -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3">
          <i class="fas fa-id-card text-teal-500 mr-1"></i>Identitas Santri
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">NIS</label>
            <input v-model="form.nis" type="text" placeholder="Opsional" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <!-- v.95.0626d: NISN (Nomor Induk Siswa Nasional) -->
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">NISN</label>
            <input v-model="form.nisn" type="text" placeholder="No. Induk Siswa Nasional" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <!-- v.21.109.0527: tambah NIK santri -->
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">NIK</label>
            <input v-model="form.nik" type="text" maxlength="16" placeholder="16 digit KTP (opsional)" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Nama Lengkap *</label>
            <input v-model="form.nama" type="text" required placeholder="Nama santri lengkap" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Jenis Kelamin *</label>
            <select v-model="form.jk" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none">
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Tanggal Lahir *</label>
            <input v-model="form.tgl_lahir" type="date" required class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Usia (auto)</label>
            <input :value="usia" type="text" readonly class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-muted)] text-[var(--text-secondary)] font-bold" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Tanggal Masuk</label>
            <input v-model="form.tgl_masuk" type="date" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Usia Masuk (auto)</label>
            <input :value="usiaMasuk" type="text" readonly class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-muted)] text-[var(--text-secondary)] font-bold" />
          </div>
          <!-- v.21.13.0526: Status Tinggal — Pulang Pergi / Fullday / Ma'had (kyai req) -->
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Status Tinggal *</label>
            <select v-model="statusTinggal" class="w-full px-3 py-2 text-sm rounded-xl border border-teal-300 bg-teal-50 cursor-pointer focus:ring-2 focus:ring-teal-500 outline-none">
              <option value="pp">Pulang Pergi</option>
              <option value="fullday">Fullday</option>
              <option value="mahad">Ma'had (Mukim)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Nama Panggilan</label>
            <input v-model="form.nama_panggilan" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Tempat Lahir</label>
            <input v-model="form.tempat_lahir" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">No. KK</label>
            <input v-model="form.no_kk" type="text" maxlength="16" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
        </div>
        <!-- v.21.109.0527: alamat lengkap santri -->
        <div class="mt-3">
          <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Alamat Lengkap</label>
          <textarea v-model="form.alamat" rows="2" placeholder="Alamat sesuai KTP/KK" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none resize-none"></textarea>
        </div>
        <div class="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Dusun / Jalan</label>
            <input v-model="form.alamat_dusun" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">RT</label>
            <input v-model="form.alamat_rt" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">RW</label>
            <input v-model="form.alamat_rw" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Desa / Kelurahan</label>
            <input v-model="form.alamat_desa" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Kecamatan</label>
            <input v-model="form.alamat_kecamatan" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Kabupaten</label>
            <input v-model="form.alamat_kabupaten" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Provinsi</label>
            <input v-model="form.alamat_provinsi" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
        </div>

        <!-- Catatan Riwayat Pribadi — hanya untuk Ma'had -->
        <div v-if="form.is_mukim" class="mt-3">
          <label class="block text-xs font-bold text-teal-700 mb-1 uppercase">
            <i class="fas fa-mosque mr-1"></i>Catatan Riwayat Pribadi (Ma'had) <span class="text-[9px] text-[var(--text-tertiary)] normal-case">(opsional)</span>
          </label>
          <textarea v-model="form.catatan_riwayat_pribadi" rows="2" placeholder="Cth: latar belakang keluarga, kesehatan khusus, kebiasaan, dll." class="w-full px-3 py-2 text-sm rounded-xl border border-teal-300 bg-teal-50/30 focus:ring-2 focus:ring-teal-500 outline-none resize-none"></textarea>
        </div>
      </div>

      <!-- v.89 (N4): Data Orang Tua + asal sekolah + penghasilan (match PSB) -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3"><i class="fas fa-people-roof text-teal-500 mr-1"></i>Data Orang Tua &amp; Asal Sekolah</h3>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div class="md:col-span-5 text-[11px] font-black text-teal-700 dark:text-teal-300">Ayah</div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Nama Ayah</label>
            <input v-model="form.nama_ayah" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">NIK Ayah</label>
            <input v-model="form.nik_ayah" type="text" maxlength="16" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Pendidikan</label>
            <input v-model="form.pendidikan_ayah" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Pekerjaan</label>
            <input v-model="form.pekerjaan_ayah" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">HP / WA</label>
            <input v-model="form.hp_ayah" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div class="md:col-span-5 text-[11px] font-black text-rose-700 dark:text-rose-300">Ibu</div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Nama Ibu</label>
            <input v-model="form.nama_ibu" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">NIK Ibu</label>
            <input v-model="form.nik_ibu" type="text" maxlength="16" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Pendidikan</label>
            <input v-model="form.pendidikan_ibu" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Pekerjaan</label>
            <input v-model="form.pekerjaan_ibu" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">HP / WA</label>
            <input v-model="form.hp_ibu" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div class="md:col-span-5 text-[11px] font-black text-slate-600 dark:text-[var(--text-tertiary)]">Lainnya</div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Asal Sekolah</label>
            <input v-model="form.asal_sekolah" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Penghasilan Ortu</label>
            <input v-model="form.penghasilan_ortu" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
        </div>
      </div>

      <!-- Sekolah Section -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3">
          <i class="fas fa-school text-cyan-500 mr-1"></i>Pendidikan Sekolah
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Lembaga Sekolah</label>
            <select v-model="form.lembaga_sekolah" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] cursor-pointer focus:ring-2 focus:ring-cyan-500 outline-none">
              <option value="">-- Tidak Sekolah --</option>
              <option v-for="l in lembagaSekolahOptions" :key="l" :value="l">{{ l }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Kelas Sekolah</label>
            <select v-model="form.kelas_sekolah" :disabled="!form.lembaga_sekolah" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] cursor-pointer disabled:opacity-50 focus:ring-2 focus:ring-cyan-500 outline-none">
              <option value="">-- Pilih --</option>
              <option v-for="k in kelasSekolahOptions" :key="k" :value="k">{{ k }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">
              Guru Sekolah <span class="text-[9px] text-[var(--text-tertiary)] normal-case">(max 2)</span>
            </label>
            <MultiSelectGuruSekolah v-model="form.guru_sekolah" :guruList="guruByLembagaSekolah" />
          </div>
        </div>
      </div>

      <!-- Qiraati Pondok Section -->
      <div class="bg-teal-50/40 dark:bg-teal-900/20 rounded-2xl p-4 md:p-5 border-2 border-teal-300 dark:border-teal-700 shadow-sm">
        <h3 class="text-xs font-black text-teal-800 dark:text-teal-300 uppercase tracking-wide mb-3">
          <i class="fas fa-book-quran text-teal-600 mr-1"></i>Pondok Qiraati *
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-bold text-teal-700 mb-1 uppercase">Lembaga Qiraati *</label>
            <select v-model="form.lembaga" required class="w-full px-3 py-2 text-sm rounded-xl border-2 border-teal-400 bg-teal-50 cursor-pointer focus:ring-2 focus:ring-teal-500 outline-none">
              <option value="">-- Pilih --</option>
              <option v-for="l in lembagaPondokOptions" :key="l" :value="l">{{ l }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-teal-700 mb-1 uppercase">Kelas / Jilid *</label>
            <select v-model="form.kelas" required :disabled="!form.lembaga" class="w-full px-3 py-2 text-sm rounded-xl border-2 border-teal-400 bg-teal-50 cursor-pointer disabled:opacity-50 focus:ring-2 focus:ring-teal-500 outline-none">
              <option value="">-- Pilih --</option>
              <option v-for="k in kelasOptions" :key="k" :value="k">{{ k }}</option>
            </select>
          </div>
          <div v-if="form.lembaga === 'PTPT'">
            <label class="block text-xs font-bold text-rose-600 mb-1 uppercase">Juz (PTPT only)</label>
            <input v-model="form.juz" type="text" placeholder="Nomor" class="w-full px-3 py-2 text-sm rounded-xl border-2 border-rose-300 bg-rose-50 text-rose-800 focus:ring-2 focus:ring-rose-500 outline-none" />
          </div>
        </div>
        <div class="mt-3">
          <label class="block text-xs font-black text-teal-700 mb-1 uppercase">Guru Pengajar * <span class="text-[9px] text-[var(--text-tertiary)] normal-case">(max 2 guru + shift)</span></label>
          <MultiSelectGuruPengajar
            v-model:guruPagi="form.guru_pagi"
            v-model:guruSore="form.guru_sore"
            :guruList="guruByLembaga"
          />
        </div>
      </div>

      <!-- Wali Section -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3">
          <i class="fas fa-user-friends text-teal-500 mr-1"></i>Data Wali
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Nama Wali *</label>
            <input v-model="form.nama_wali" type="text" required class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">No WA Wali *</label>
            <input v-model="form.wa_wali" type="tel" required placeholder="08..." class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
        </div>
      </div>

      <!-- v.21.13.0526: Status Section + Alasan Keluar -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3">
          <i class="fas fa-toggle-on text-emerald-500 mr-1"></i>Status Santri
        </h3>
        <div class="flex gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input v-model="form.aktif" :value="true" type="radio" class="w-4 h-4 accent-emerald-600" />
            <span class="text-sm font-bold text-emerald-700">Aktif</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input v-model="form.aktif" :value="false" type="radio" class="w-4 h-4 accent-rose-600" />
            <span class="text-sm font-bold text-rose-700">Tidak Aktif / Keluar</span>
          </label>
        </div>
        <!-- Alasan keluar + tanggal — muncul kalau aktif=false -->
        <div v-if="form.aktif === false" class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-rose-700 mb-1 uppercase">Tanggal Keluar</label>
            <input v-model="form.tgl_keluar" type="date" class="w-full px-3 py-2 text-sm rounded-xl border border-rose-300 bg-rose-50/40 focus:ring-2 focus:ring-rose-500 outline-none cursor-pointer" />
          </div>
          <div>
            <label class="block text-xs font-bold text-rose-700 mb-1 uppercase">Alasan Keluar</label>
            <input v-model="form.alasan_keluar" type="text" placeholder="Keterangan" class="w-full px-3 py-2 text-sm rounded-xl border border-rose-300 bg-rose-50/40 focus:ring-2 focus:ring-rose-500 outline-none" />
          </div>
        </div>
      </div>

      <!-- Actions sticky -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm sticky bottom-3 flex gap-2">
        <!-- v.21.23.0526: Batal pakai cancelTarget biar konsisten dgn redirect setelah Update -->
        <router-link :to="cancelTarget" class="flex-1 text-center px-4 py-3 bg-[var(--bg-muted)] hover:bg-slate-200 text-slate-700 dark:text-[var(--text-tertiary)] font-bold rounded-xl text-sm shadow-md transition">
          <i class="fas fa-times mr-1"></i>Batal
        </router-link>
        <button type="submit" :disabled="isSaving" class="flex-1 px-4 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white font-bold transition">
          <i class="fas fa-save mr-1"></i>{{ isSaving ? 'Menyimpan...' : (editingId ? 'Update Santri' : 'Simpan Santri') }}
        </button>
      </div>
    </form>

    <p class="text-center text-[10px] text-[var(--text-tertiary)] pt-2">
      <i class="fas fa-circle-info mr-1"></i>Vue 3 · v.21.13.0526 — Full CRUD Santri + PSB sync
    </p>
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSantriForm } from '@/composables/useSantriForm'
import { definePageSave } from '@/composables/useRibbonContext'
import MultiSelectGuruPengajar from '@/components/form/MultiSelectGuruPengajar.vue'
import MultiSelectGuruSekolah from '@/components/form/MultiSelectGuruSekolah.vue'

const route = useRoute()
const router = useRouter()

const {
  form,
  isLoading,
  isSaving,
  editingId,
  usia,
  usiaMasuk,
  kelasOptions,
  kelasSekolahOptions,
  lembagaPondokOptions,
  lembagaSekolahOptions,
  guruByLembaga,
  guruByLembagaSekolah,
  loadSantri,
  resetForm,
  save
} = useSantriForm()

// v.21.23.0526: kelas sekolah pakai kelasSekolahOptions (filter per lembaga_sekolah dari master/lembaga)
// TK A/TK B/SDI/PKBM masing-masing punya kelas sendiri di master/lembaga

// v.21.13.0526: 3-way status tinggal (pp/fullday/mahad) wrapping is_mukim + is_fullday
const statusTinggal = computed({
  get() {
    if (form.value.is_mukim) return 'mahad'
    if (form.value.is_fullday) return 'fullday'
    return 'pp'
  },
  set(v) {
    if (v === 'mahad') {
      form.value.is_mukim = true
      form.value.is_fullday = false
    } else if (v === 'fullday') {
      form.value.is_mukim = false
      form.value.is_fullday = true
    } else {
      form.value.is_mukim = false
      form.value.is_fullday = false
    }
  }
})

onMounted(async () => {
  const id = route.params.id
  if (id && id !== 'new') {
    await loadSantri(id)
  } else {
    resetForm()
  }
})

watch(() => route.params.id, async (newId) => {
  if (newId && newId !== 'new') await loadSantri(newId)
  else resetForm()
})

watch(() => form.value.lembaga, (newL, oldL) => {
  if (newL !== oldL && oldL) {
    form.value.kelas = ''
    form.value.guru_pagi = ''
    form.value.guru_sore = ''
  }
})

// v.21.23.0526: cancelTarget computed — snapshot saat mount (sebelum query terhapus)
// Pakai object form router.push agar query reliable di hash mode
const fromMaster = computed(() => route.query.from === 'master')
const cancelTarget = computed(() => fromMaster.value ? { path: '/master-data', query: { tab: 'santri' } } : '/santri')

async function onSubmit() {
  const ok = await save()
  if (ok) {
    // v.21.23.0526: object form lebih reliable untuk hash mode + query
    if (fromMaster.value) router.push({ path: '/master-data', query: { tab: 'santri' } })
    else router.push('/santri')
  }
}

// v.100 T13: tombol Simpan title bar Electron jalankan submit form santri ini (no-op di web/HP)
definePageSave(onSubmit)
</script>
