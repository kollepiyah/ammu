<template>
  <div class="p-4 max-w-5xl mx-auto pb-32">
    <!-- ============================================================
         HEADER: tombol back + judul + indikator unsaved
         ============================================================ -->
    <header class="mb-4 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <UiButton variant="ghost" size="sm" @click="goBack">
          <ArrowLeftIcon class="w-4 h-4" />
        </UiButton>
        <div>
          <h1 class="text-xl font-bold">Pengaturan Web</h1>
          <p class="text-xs text-[var(--text-secondary)]">
            Setting global aplikasi (match legacy)
            <span
              v-if="dirty"
              class="ml-1 px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700 text-[10px] font-bold"
              >UNSAVED</span
            >
          </p>
        </div>
      </div>
    </header>

    <!-- ============================================================
         TAB BAR: grid kartu gradient untuk pilih section
         ============================================================ -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
      <button
        v-for="t in tabs"
        :key="t.id"
        @click="section = t.id"
        :class="[
          'group relative overflow-hidden bg-gradient-to-br rounded-xl p-2.5 md:p-3 text-left text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer flex items-center gap-2',
          t.gradient,
          section === t.id ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-cyan-50' : ''
        ]"
      >
        <i :class="['fas', t.icon, 'text-base md:text-lg drop-shadow flex-shrink-0']"></i>
        <h3 class="text-[11px] md:text-xs font-black leading-tight drop-shadow-sm">
          {{ t.label }}
        </h3>
      </button>
    </div>

    <!-- ============================================================
         SECTION: Identitas Aplikasi
         ============================================================ -->
    <UiCard
      v-show="section === 'identitas'"
      title="Identitas Aplikasi"
      subtitle="Nama, deskripsi, header bar, periode"
      class="mb-4"
    >
      <div class="grid md:grid-cols-2 gap-3">
        <UiInput v-model="form.txtAppName" label="Nama Aplikasi" required />
        <UiInput v-model="form.txtAppDesc" label="Deskripsi / Sub-Title" />
        <UiInput v-model="form.txtSidebarTitle" label="Nama Sidebar / Lembaga" />
        <UiInput v-model="form.txtHeaderBar" label="Teks Header Bar" placeholder="Ammu Online" />
        <UiInput v-model="form.txtPeriode" label="Periode Aktif" />
        <UiInput v-model="form.txtWelcome" label="Sapaan Ahlan" placeholder="Ahlan" />
        <UiInput v-model="form.alamat" label="Alamat Pondok" />
        <UiInput v-model="form.noTelp" label="No. Telepon" />
        <UiInput v-model="form.namaChannel" label="Nama Channel Pesan" />
      </div>
    </UiCard>

    <!-- ============================================================
         SECTION: KOP Surat (4 baris)
         ============================================================ -->
    <UiCard
      v-show="section === 'kop'"
      title="KOP Surat"
      subtitle="4 baris header untuk PDF/Excel cetak"
      class="mb-4"
    >
      <div class="grid gap-3">
        <UiInput v-model="form.kopLine1" label="Baris 1 (KAPITAL, contoh: PONDOK PESANTREN...)" />
        <UiInput
          v-model="form.kopLine2"
          label="Baris 2 (BOLD BESAR, contoh: PORTAL PRESTASI QIRAATI)"
        />
        <UiInput v-model="form.kopLine3" label="Baris 3 (alamat / opsional)" />
        <UiInput v-model="form.kopLine4" label="Baris 4 (telp / opsional)" />
      </div>
      <div class="mt-4 p-3 bg-[var(--bg-card-elevated)] border border-[var(--border-subtle)] rounded-lg text-center">
        <p class="text-xs uppercase tracking-widest font-black text-[var(--text-primary)]">
          {{ form.kopLine1 || '— Baris 1 —' }}
        </p>
        <p class="text-lg font-black text-[var(--text-primary)]">{{ form.kopLine2 || '— Baris 2 —' }}</p>
        <p v-if="form.kopLine3" class="text-xs text-[var(--text-secondary)]">{{ form.kopLine3 }}</p>
        <p v-if="form.kopLine4" class="text-xs text-[var(--text-secondary)]">{{ form.kopLine4 }}</p>
      </div>
    </UiCard>

    <!-- ============================================================
         SECTION: Logo & Background (6 slot upload)
         ============================================================ -->
    <UiCard
      v-show="section === 'logo'"
      title="Logo & Background"
      subtitle="4 jenis logo + background layar"
      class="mb-4"
    >
      <div class="grid md:grid-cols-2 gap-4">
        <!-- Logo Aplikasi utama -->
        <div class="border-2 border-dashed border-emerald-300 p-4 rounded-2xl bg-emerald-50">
          <label class="block text-xs font-black text-emerald-900 mb-2 uppercase"
            >Logo Aplikasi (utama)</label
          >
          <div class="flex items-center gap-3 mb-2">
            <img
              :src="form.logoUrl || '/logo.png'"
              class="w-16 h-16 rounded object-contain bg-[var(--bg-card)] p-1 border"
            />
            <input
              type="file"
              accept="image/*"
              :disabled="uploading === 'logoUrl'"
              @change="handleUpload($event, 'logoUrl', 'app_logos')"
              class="text-xs flex-1"
            />
          </div>
          <p class="text-[10px] text-emerald-700 italic">Tampil di sidebar + login.</p>
        </div>

        <!-- Logo KOP Surat -->
        <div class="border-2 border-dashed border-cyan-300 p-4 rounded-2xl bg-cyan-50">
          <label class="block text-xs font-black text-[var(--text-on-accent)] mb-2 uppercase"
            >Logo KOP Surat</label
          >
          <div class="flex items-center gap-3 mb-2">
            <img
              :src="form.logoKop || form.logoUrl || '/logo.png'"
              class="w-16 h-16 rounded object-contain bg-[var(--bg-card)] p-1 border"
            />
            <input
              type="file"
              accept="image/*"
              :disabled="uploading === 'logoKop'"
              @change="handleUpload($event, 'logoKop', 'app_logos')"
              class="text-xs flex-1"
            />
          </div>
          <p class="text-[10px] text-cyan-700 italic">
            Untuk header PDF/Excel cetak. Kosong = pakai Logo Aplikasi.
          </p>
        </div>

        <!-- Logo Qiraati -->
        <div class="border-2 border-dashed border-emerald-300 p-4 rounded-2xl bg-emerald-50">
          <label class="block text-xs font-black text-emerald-900 mb-2 uppercase"
            >Logo Qiraati (bintang 8)</label
          >
          <div class="flex items-center gap-3 mb-2">
            <img
              :src="form.logoQiraati || '/logo.png'"
              class="w-16 h-16 rounded object-contain bg-[var(--bg-card)] p-1 border"
            />
            <input
              type="file"
              accept="image/*"
              :disabled="uploading === 'logoQiraati'"
              @change="handleUpload($event, 'logoQiraati', 'app_logos')"
              class="text-xs flex-1"
            />
          </div>
          <p class="text-[10px] text-emerald-700 italic">Untuk header rapor + rekap Qiraati.</p>
        </div>

        <!-- Background Layar -->
        <div class="border-2 border-dashed border-[var(--border-default)] p-4 rounded-2xl bg-[var(--bg-card-elevated)]">
          <label class="block text-xs font-black text-[var(--text-primary)] mb-2 uppercase"
            >Background Layar</label
          >
          <div class="flex items-center gap-3 mb-2">
            <div
              class="w-16 h-16 rounded bg-[var(--bg-card)] border flex items-center justify-center overflow-hidden"
            >
              <img v-if="form.bgImage" :src="form.bgImage" class="w-full h-full object-cover" />
              <ImageIcon v-else class="w-6 h-6 text-[var(--text-tertiary)]" />
            </div>
            <input
              type="file"
              accept="image/*"
              :disabled="uploading === 'bgImage'"
              @change="handleUpload($event, 'bgImage', 'app_bg')"
              class="text-xs flex-1"
            />
          </div>
          <button
            v-if="form.bgImage"
            @click="form.bgImage = ''"
            class="text-[10px] text-rose-600 font-bold underline"
          >
            <Trash2Icon class="w-3 h-3 inline" /> Hapus BG
          </button>
        </div>

        <!-- BG Rapor TPQ -->
        <div class="border-2 border-dashed border-teal-300 p-4 rounded-2xl bg-teal-50">
          <label class="block text-xs font-black text-teal-900 mb-2 uppercase"
            >BG Rapor TPQ/Qiraati</label
          >
          <div class="flex items-center gap-3 mb-2">
            <div
              class="w-16 h-16 rounded bg-[var(--bg-card)] border flex items-center justify-center overflow-hidden"
            >
              <img
                v-if="form.bgRaporTPQ"
                :src="form.bgRaporTPQ"
                class="w-full h-full object-cover"
              />
              <ImageIcon v-else class="w-6 h-6 text-teal-400" />
            </div>
            <input
              type="file"
              accept="image/*"
              :disabled="uploading === 'bgRaporTPQ'"
              @change="handleUpload($event, 'bgRaporTPQ', 'app_bg')"
              class="text-xs flex-1"
            />
          </div>
          <p class="text-[10px] text-teal-700 italic">
            Watermark 10% di tengah rapor Qiraati cetak.
          </p>
          <button
            v-if="form.bgRaporTPQ"
            @click="form.bgRaporTPQ = ''"
            class="text-[10px] text-rose-600 font-bold underline mt-1"
          >
            <Trash2Icon class="w-3 h-3 inline" /> Hapus
          </button>
        </div>

        <!-- BG Rapor Diniyah -->
        <div class="border-2 border-dashed border-teal-300 p-4 rounded-2xl bg-teal-50">
          <label class="block text-xs font-black text-teal-900 mb-2 uppercase"
            >BG Rapor Diniyah</label
          >
          <div class="flex items-center gap-3 mb-2">
            <div
              class="w-16 h-16 rounded bg-[var(--bg-card)] border flex items-center justify-center overflow-hidden"
            >
              <img
                v-if="form.bgRaporDiniyah"
                :src="form.bgRaporDiniyah"
                class="w-full h-full object-cover"
              />
              <ImageIcon v-else class="w-6 h-6 text-teal-400" />
            </div>
            <input
              type="file"
              accept="image/*"
              :disabled="uploading === 'bgRaporDiniyah'"
              @change="handleUpload($event, 'bgRaporDiniyah', 'app_bg')"
              class="text-xs flex-1"
            />
          </div>
          <p class="text-[10px] text-teal-700 italic">
            Watermark 10% di tengah rapor Diniyah cetak.
          </p>
          <button
            v-if="form.bgRaporDiniyah"
            @click="form.bgRaporDiniyah = ''"
            class="text-[10px] text-rose-600 font-bold underline mt-1"
          >
            <Trash2Icon class="w-3 h-3 inline" /> Hapus
          </button>
        </div>
      </div>
      <p class="text-[10px] text-[var(--text-tertiary)] italic mt-3">
        <i class="fas fa-info-circle mr-1"></i>TTD (tanda tangan) guru/kepala diatur PERSONAL di
        Pengaturan Profil &rarr; setiap guru upload TTD-nya sendiri.
      </p>
    </UiCard>

    <!-- ============================================================
         SECTION: Kalibrasi Hijriyah
         ============================================================ -->
    <UiCard
      v-show="section === 'hijri'"
      title="Kalibrasi Hijriyah"
      subtitle="Offset ±5 hari untuk match hilal lokal"
      class="mb-4"
    >
      <div class="flex items-center gap-4">
        <input
          v-model.number="form.kalibrasiHijri"
          type="range"
          min="-5"
          max="5"
          step="1"
          class="flex-1 accent-teal-600"
        />
        <div
          class="bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-lg text-center min-w-[80px]"
        >
          <p class="text-[10px] text-teal-700 font-bold uppercase">Offset</p>
          <p class="text-xl font-black text-teal-800">
            {{ form.kalibrasiHijri >= 0 ? '+' : '' }}{{ form.kalibrasiHijri }}
          </p>
        </div>
      </div>
      <div class="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p class="text-[10px] font-bold text-emerald-700 uppercase">Preview Hari Ini</p>
        <p class="text-lg font-black text-emerald-800">{{ hijriPreview }}</p>
      </div>
    </UiCard>


    <!-- ============================================================
         SECTION: Default Admin Built-in
         ============================================================ -->
    <UiCard
      v-show="section === 'admin'"
      title="Default Admin Built-in"
      subtitle="Username & ganti password admin"
      class="mb-4"
    >
      <div class="grid md:grid-cols-2 gap-3">
        <UiInput
          v-model="form.adminUsername"
          label="Username Admin Built-in"
          placeholder="adminmu"
        />
      </div>
      <form
        @submit.prevent="changeAdminPassword"
        class="mt-4 p-3 bg-cyan-50 border border-cyan-200 rounded-lg"
      >
        <p class="text-xs font-black text-cyan-800 mb-2 uppercase">Ganti Password Admin</p>
        <input
          type="text"
          name="username"
          autocomplete="username"
          :value="form.adminUsername"
          class="hidden"
          readonly
        />
        <div class="grid md:grid-cols-3 gap-2">
          <UiInput
            v-model="pwdNew"
            type="password"
            label="Password Baru"
            autocomplete="new-password"
          />
          <UiInput
            v-model="pwdConfirm"
            type="password"
            label="Konfirmasi"
            autocomplete="new-password"
          />
          <div class="flex items-end">
            <UiButton size="sm" variant="primary" type="submit" :disabled="!pwdNew">Apply</UiButton>
          </div>
        </div>
        <p class="text-[10px] text-cyan-700 italic mt-2">
          Password disimpan di settings/general saat klik Simpan.
        </p>
      </form>
    </UiCard>

    <!-- ============================================================
         SECTION: Tema Warna
         ============================================================ -->
    <UiCard
      v-show="section === 'theme'"
      title="Tema Warna"
      subtitle="Color picker untuk accent, teks, sidebar"
      class="mb-4"
    >
      <div class="grid md:grid-cols-3 gap-4">
        <div>
          <label class="text-xs font-bold text-[var(--text-primary)] mb-2 block">Warna Accent</label>
          <div class="flex items-center gap-2">
            <input
              v-model="form.themeColor"
              type="color"
              class="w-12 h-10 border border-[var(--border-default)] rounded cursor-pointer"
            />
            <input
              v-model="form.themeColor"
              type="text"
              class="flex-1 px-2 py-1.5 text-xs border border-[var(--border-default)] rounded font-mono"
            />
          </div>
        </div>
        <div>
          <label class="text-xs font-bold text-[var(--text-primary)] mb-2 block">Warna Teks</label>
          <div class="flex items-center gap-2">
            <input
              v-model="form.themeTextColor"
              type="color"
              class="w-12 h-10 border border-[var(--border-default)] rounded cursor-pointer"
            />
            <input
              v-model="form.themeTextColor"
              type="text"
              class="flex-1 px-2 py-1.5 text-xs border border-[var(--border-default)] rounded font-mono"
            />
          </div>
        </div>
        <div>
          <label class="text-xs font-bold text-[var(--text-primary)] mb-2 block">Sidebar BG (legacy)</label>
          <div class="flex items-center gap-2">
            <input
              v-model="form.sidebarBgColor"
              type="color"
              class="w-12 h-10 border border-[var(--border-default)] rounded cursor-pointer"
            />
            <input
              v-model="form.sidebarBgColor"
              type="text"
              class="flex-1 px-2 py-1.5 text-xs border border-[var(--border-default)] rounded font-mono"
            />
          </div>
        </div>
      </div>
      <p class="text-[10px] text-[var(--text-secondary)] italic mt-3">
        Note: Vue sidebar sekarang pakai cream/mint preset. Color picker disimpan untuk kompat
        legacy.
      </p>
    </UiCard>



    <!-- ============================================================
         SECTION: Fitur & Mode Aplikasi
         ============================================================ -->
    <UiCard
      v-show="section === 'fitur'"
      title="Fitur & Mode Aplikasi"
      subtitle="Toggle modul + Capacitor mode"
      class="mb-4"
    >
      <div class="grid md:grid-cols-2 gap-2">
        <label class="flex items-center gap-2 cursor-pointer p-2 hover:bg-[var(--bg-card-elevated)] rounded">
          <input v-model="form.fiturBeranda" type="checkbox" class="w-4 h-4 accent-teal-600" />
          Beranda (Mading + Quick Action)
        </label>
        <label class="flex items-center gap-2 cursor-pointer p-2 hover:bg-[var(--bg-card-elevated)] rounded">
          <input v-model="form.fiturKalender" type="checkbox" class="w-4 h-4 accent-teal-600" />
          Kalender Pendidikan
        </label>
        <label class="flex items-center gap-2 cursor-pointer p-2 hover:bg-[var(--bg-card-elevated)] rounded">
          <input v-model="form.fiturKritikSaran" type="checkbox" class="w-4 h-4 accent-teal-600" />
          Kritik &amp; Saran
        </label>
        <label class="flex items-center gap-2 cursor-pointer p-2 hover:bg-[var(--bg-card-elevated)] rounded">
          <input v-model="form.fiturNotifikasi" type="checkbox" class="w-4 h-4 accent-teal-600" />
          Notifikasi FCM <span class="text-[10px] text-[var(--text-tertiary)] italic">(belum aktif — perlu setup FCM)</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer p-2 hover:bg-[var(--bg-card-elevated)] rounded">
          <input
            v-model="form.autoNotifPostingan"
            type="checkbox"
            class="w-4 h-4 accent-teal-600"
          />
          Auto-Notif setiap Postingan <span class="text-[10px] text-[var(--text-tertiary)] italic">(belum aktif — depend FCM)</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer p-2 hover:bg-[var(--bg-card-elevated)] rounded">
          <input v-model="form.softDelete" type="checkbox" class="w-4 h-4 accent-rose-600" />
          Soft Delete (recoverable) <span class="text-[10px] text-[var(--text-tertiary)] italic">(belum aktif — placeholder)</span>
        </label>
      </div>
      <div class="p-3 bg-teal-50 border border-teal-200 rounded-lg mt-3">
        <p class="text-xs font-black text-teal-800 mb-2 uppercase">Mode Capacitor / PWA <span class="text-[9px] text-teal-600 font-normal italic normal-case ml-1">(hanya untuk build desktop/mobile)</span></p>
        <div class="flex gap-3 flex-wrap">
          <label class="flex items-center gap-2 cursor-pointer text-sm">
            <input
              v-model="form.capacitorMode"
              type="radio"
              value="remote"
              class="w-4 h-4 accent-teal-600"
            />
            <span><b>Remote (Opsi B)</b> &mdash; server.url ke Firebase Hosting</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer text-sm">
            <input
              v-model="form.capacitorMode"
              type="radio"
              value="local"
              class="w-4 h-4 accent-teal-600"
            />
            <span>Local (bundled)</span>
          </label>
        </div>
      </div>
    </UiCard>

    <!-- ============================================================
         SECTION: Jam Shift (Pagi · Sore · Sekolah)
         ============================================================ -->
    <UiCard
      v-show="section === 'shift'"
      title="Pengaturan Jam Shift"
      subtitle="Jam mulai / selesai / batas terlambat — Pagi · Sore · Sekolah"
      class="mb-4"
    >
      <div class="grid md:grid-cols-3 gap-4">
        <!-- Shift Pagi -->
        <div class="p-3 bg-cyan-50 border border-cyan-200 rounded-xl">
          <p class="text-xs font-black text-cyan-800 uppercase mb-2">
            <i class="fas fa-sun mr-1"></i>SHIFT PAGI
          </p>
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1">Mulai</label>
              <input
                v-model="form.shiftPagiMulai"
                type="time"
                class="w-full px-2 py-1.5 text-sm border border-cyan-300 rounded bg-[var(--bg-card)]"
              />
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
                >Terlambat</label
              >
              <input
                v-model="form.shiftPagiTerlambat"
                type="time"
                class="w-full px-2 py-1.5 text-sm border border-rose-300 rounded bg-[var(--bg-card)]"
              />
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
                >Selesai</label
              >
              <input
                v-model="form.shiftPagiSelesai"
                type="time"
                class="w-full px-2 py-1.5 text-sm border border-cyan-300 rounded bg-[var(--bg-card)]"
              />
            </div>
          </div>
        </div>

        <!-- Shift Sore -->
        <div class="p-3 bg-cyan-50 border border-cyan-200 rounded-xl">
          <p class="text-xs font-black text-cyan-800 uppercase mb-2">
            <i class="fas fa-moon mr-1"></i>SHIFT SORE
          </p>
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1">Mulai</label>
              <input
                v-model="form.shiftSoreMulai"
                type="time"
                class="w-full px-2 py-1.5 text-sm border border-cyan-300 rounded bg-[var(--bg-card)]"
              />
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
                >Terlambat</label
              >
              <input
                v-model="form.shiftSoreTerlambat"
                type="time"
                class="w-full px-2 py-1.5 text-sm border border-rose-300 rounded bg-[var(--bg-card)]"
              />
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
                >Selesai</label
              >
              <input
                v-model="form.shiftSoreSelesai"
                type="time"
                class="w-full px-2 py-1.5 text-sm border border-cyan-300 rounded bg-[var(--bg-card)]"
              />
            </div>
          </div>
        </div>

        <!-- Shift Sekolah -->
        <div class="p-3 bg-teal-50 border border-teal-200 rounded-xl">
          <p class="text-xs font-black text-teal-800 uppercase mb-2">
            <i class="fas fa-school mr-1"></i>SHIFT SEKOLAH
          </p>
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1">Mulai</label>
              <input
                v-model="form.shiftSekolahMulai"
                type="time"
                class="w-full px-2 py-1.5 text-sm border border-teal-300 rounded bg-[var(--bg-card)]"
              />
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
                >Terlambat</label
              >
              <input
                v-model="form.shiftSekolahTerlambat"
                type="time"
                class="w-full px-2 py-1.5 text-sm border border-rose-300 rounded bg-[var(--bg-card)]"
              />
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
                >Selesai</label
              >
              <input
                v-model="form.shiftSekolahSelesai"
                type="time"
                class="w-full px-2 py-1.5 text-sm border border-teal-300 rounded bg-[var(--bg-card)]"
              />
            </div>
          </div>
        </div>
      </div>
      <p class="text-[10px] text-[var(--text-secondary)] italic mt-3">
        <i class="fas fa-info-circle mr-1"></i>Jam <b>Terlambat</b> = batas waktu kehadiran masih
        dianggap "Hadir"; lewat dari ini &rarr; status auto "Terlambat" saat impor fingerprint.
      </p>
    </UiCard>


    <!-- ============================================================
         SECTION: Schema Rekap Diniyah (default + override per kelas)
         ============================================================ -->
    <UiCard
      v-show="section === 'rekapDiniyah'"
      title="Schema Rekap Diniyah"
      subtitle="Daftar mata pelajaran Diniyah yang muncul sebagai kolom di Rekap Diniyah"
      class="mb-4"
    >
      <div class="space-y-2 mb-3">
        <div
          v-for="(mapel, idx) in form.rekapSchemaDiniyah"
          :key="idx"
          class="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-lg p-2"
        >
          <input
            v-model="form.rekapSchemaDiniyah[idx]"
            type="text"
            class="flex-1 bg-transparent text-sm font-bold text-[var(--text-primary)] outline-none"
          />
          <button
            @click="form.rekapSchemaDiniyah.splice(idx, 1)"
            class="text-rose-600 hover:bg-rose-50 px-2 py-1 rounded text-xs cursor-pointer"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <p
          v-if="form.rekapSchemaDiniyah.length === 0"
          class="text-xs text-[var(--text-tertiary)] italic text-center py-2"
        >
          Belum ada mata pelajaran. Tambah di bawah.
        </p>
      </div>
      <div class="flex gap-2">
        <input
          v-model="newMapel"
          @keyup.enter="addMapel"
          type="text"
          placeholder="Nama mata pelajaran baru..."
          class="flex-1 px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)]"
        />
        <button
          @click="addMapel"
          class="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-lg text-xs whitespace-nowrap cursor-pointer"
        >
          <i class="fas fa-plus mr-1"></i>Tambah
        </button>
      </div>
      <div
        class="mt-3 p-3 bg-teal-50 border border-teal-200 rounded-xl text-[11px] text-teal-800"
      >
        <i class="fas fa-info-circle mr-1"></i>Mata pelajaran <b>default</b> (semua kelas). Untuk
        override per-kelas, edit di bawah.
      </div>

      <!-- Override per kelas -->
      <div class="mt-5 border-t border-teal-200 pt-4">
        <h4 class="text-xs font-black text-teal-900 uppercase mb-2">
          <i class="fas fa-layer-group mr-1"></i>Override Mapel per Kelas
        </h4>
        <p class="text-[11px] text-[var(--text-secondary)] italic mb-3">
          Kalau kelas tertentu butuh daftar mapel berbeda dari default. Kalau kelas tidak di-set,
          pakai default di atas.
        </p>
        <div class="space-y-3">
          <div
            v-for="(mapelList, kelas) in form.rekapSchemaDiniyahPerKelas"
            :key="kelas"
            class="bg-[var(--bg-card)] border border-teal-200 rounded-xl p-3"
          >
            <div class="flex items-center justify-between mb-2">
              <p class="text-xs font-black text-teal-800 uppercase">
                &#x1F4DA; Kelas {{ kelas }}
              </p>
              <button
                @click="delete form.rekapSchemaDiniyahPerKelas[kelas]"
                class="text-rose-600 text-xs font-bold hover:bg-rose-50 px-2 py-0.5 rounded"
              >
                <i class="fas fa-trash mr-1"></i>Hapus kelas
              </button>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="(mapel, mi) in mapelList"
                :key="mi"
                class="inline-flex items-center gap-1 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded text-[11px]"
              >
                <input
                  v-model="form.rekapSchemaDiniyahPerKelas[kelas][mi]"
                  class="bg-transparent w-24 outline-none text-[11px]"
                />
                <button
                  @click="form.rekapSchemaDiniyahPerKelas[kelas].splice(mi, 1)"
                  class="text-rose-400 text-[10px]"
                >
                  <i class="fas fa-times"></i>
                </button>
              </span>
              <button
                @click="form.rekapSchemaDiniyahPerKelas[kelas].push('Mapel Baru')"
                class="bg-teal-200 hover:bg-teal-300 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded"
              >
                + Mapel
              </button>
            </div>
          </div>
        </div>
        <div class="flex gap-2 mt-3">
          <input
            v-model="newKelas"
            type="text"
            placeholder="Nama kelas (mis: TK A, I, II, III)"
            class="flex-1 px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)]"
          />
          <button
            @click="addKelasOverride"
            class="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-lg text-xs cursor-pointer"
          >
            <i class="fas fa-plus mr-1"></i>Tambah Kelas
          </button>
        </div>
      </div>
    </UiCard>

    <!-- ============================================================
         SECTION: Pengaturan Postingan / Ammu Channel
         ============================================================ -->
    <UiCard
      v-show="section === 'postingan'"
      title="Pengaturan Postingan / Ammu Channel"
      subtitle="Hak akses + limit upload"
      class="mb-4"
    >
      <div class="space-y-3">
        <label
          class="flex items-start gap-3 p-3 bg-teal-50 border border-teal-200 rounded-lg cursor-pointer"
        >
          <input
            v-model="form.postinganHanyaAdmin"
            type="checkbox"
            class="w-5 h-5 accent-teal-600 mt-0.5"
          />
          <div>
            <p class="text-sm font-bold text-[var(--text-primary)]">
              Hanya Admin &amp; Super Admin yang bisa buat post
            </p>
            <p class="text-[11px] text-[var(--text-secondary)]">
              Kalau off: guru juga bisa buat post. Santri tidak pernah bisa post.
            </p>
          </div>
        </label>
        <label
          class="flex items-start gap-3 p-3 bg-teal-50 border border-teal-200 rounded-lg cursor-pointer"
        >
          <input
            v-model="form.postinganAutoApprove"
            type="checkbox"
            class="w-5 h-5 accent-teal-600 mt-0.5"
          />
          <div>
            <p class="text-sm font-bold text-[var(--text-primary)]">Auto-approve post baru</p>
            <p class="text-[11px] text-[var(--text-secondary)]">
              Kalau off: post baru moderation queue dulu sampai admin approve.
            </p>
          </div>
        </label>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Max Gambar per Post</label
            >
            <input
              v-model.number="form.postinganMaxImages"
              type="number"
              min="1"
              max="10"
              class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)]"
            />
          </div>
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Max Size per Gambar (KB)</label
            >
            <input
              v-model.number="form.postinganMaxSizeKb"
              type="number"
              min="50"
              max="5000"
              step="50"
              class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)]"
            />
          </div>
        </div>
      </div>
    </UiCard>

    <!-- ============================================================
         SECTION: Schema Rapor per-Lembaga (sections / perLevel / perKelas)
         ============================================================ -->
    <UiCard
      v-show="section === 'raporSchema'"
      title="Schema Rapor per-Lembaga"
      subtitle="Edit field nilai + struktur untuk rapor cetak per lembaga"
      class="mb-4"
    >
      <div class="space-y-3">
        <div>
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1 tracking-wider"
            >Pilih Lembaga</label
          >
          <select
            v-model="raporLembaga"
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)]"
          >
            <option value="">-- Pilih lembaga --</option>
            <option v-for="l in lembagaRaw" :key="l.lembaga" :value="l.lembaga">
              {{ l.lembaga }} ({{ l.tipe || 'Qiraati' }})
            </option>
            <option value="Diniyah">Diniyah (perKelas mapel)</option>
          </select>
        </div>

        <div
          v-if="raporLembaga"
          class="bg-teal-50 border border-teal-200 rounded-xl p-4 space-y-3"
        >
          <p class="text-xs font-black text-teal-900 uppercase">
            Schema untuk: {{ raporLembaga }}
          </p>

          <div class="bg-cyan-50 border border-cyan-300 rounded-lg p-3 text-[11px] text-cyan-900">
            <p class="font-black uppercase tracking-wider mb-1 text-cyan-700">
              <i class="fas fa-info-circle mr-1"></i>Bagaimana Rapor Tampil?
            </p>
            <p class="leading-relaxed">
              Rapor otomatis pakai template bawaan berdasar tipe lembaga &mdash; tidak perlu setup
              manual:<br />
              <b>&bull; Pra PTPT/PTPT/PPPH</b> &rarr; matrix Level &times; Khotam (&frac12; Juz, 1
              Juz, ..., 3 Juz)<br />
              <b>&bull; TPQ Sore/Pagi</b> &rarr; matrix Jilid (Pra-TK/A/B/C/D/E/Tahsin/Tahfidz) +
              nilai fashohah/tartil/adab<br />
              <b>&bull; Diniyah (sekolah formal)</b> &rarr; mata pelajaran per kelas + KKM<br /><br />
              <b>Customize hanya bila perlu:</b> ubah field nilai, tambah level, hapus jilid, dll.
              Setelah custom, template default tidak dipakai lagi untuk lembaga ini.
            </p>
            <button
              @click="resetSchemaTemplate"
              class="mt-2 text-[10px] font-black px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-700 text-white cursor-pointer"
            >
              <i class="fas fa-undo mr-1"></i>Reset Ke Template Default
            </button>
          </div>

          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
              >Tipe Schema (Customize)</label
            >
            <select
              :value="schemaType()"
              @change="(ev) => initSchemaType(ev.target.value)"
              class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)]"
            >
              <option value="sections">
                TPQ — Matrix Jilid (Pra-TK, A/B/C/D/E, Tahsin, Tahfidz)
              </option>
              <option value="perLevel">
                Pra PTPT/PTPT/PPPH — Level Baca &times; Khotam Matrix
              </option>
              <option value="perKelas">Diniyah/Sekolah Formal — Mapel KKM per Kelas</option>
              <option value="kosong">Tidak Punya Rapor (mis. TPQ Pagi)</option>
            </select>
          </div>

          <!-- perLevel: Level x Khotam matrix -->
          <div v-if="schemaType() === 'perLevel'" class="space-y-2">
            <p class="text-[11px] font-bold text-teal-800">Field Nilai (kolom angka):</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(f, fi) in form.raporSchemas[raporLembaga]?.fieldsNilai || []"
                :key="fi"
                class="bg-[var(--bg-card)] border border-teal-200 px-2 py-1 rounded text-xs flex items-center gap-1"
              >
                {{ f.label }}
                <button @click="removeFieldNilai(fi)" class="text-rose-500 hover:text-rose-700">
                  <i class="fas fa-times text-[10px]"></i>
                </button>
              </span>
            </div>
            <div class="flex gap-2">
              <input
                v-model="newField"
                @keyup.enter="addFieldNilai"
                type="text"
                placeholder="Tambah field nilai (Fashohah, Tartil, ...)"
                class="flex-1 px-2 py-1 text-xs border border-[var(--border-default)] rounded bg-[var(--bg-card)]"
              />
              <button
                @click="addFieldNilai"
                class="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-3 py-1 rounded cursor-pointer"
              >
                + Tambah
              </button>
            </div>

            <p class="text-[11px] font-bold text-teal-800 mt-3">Level x Khotam:</p>
            <div class="space-y-2">
              <div
                v-for="(level, li) in form.raporSchemas[raporLembaga]?.levels || []"
                :key="level.id"
                class="bg-[var(--bg-card)] p-2 rounded border border-teal-100"
              >
                <div class="grid grid-cols-3 gap-2 mb-2">
                  <input
                    v-model="level.label"
                    placeholder="Label (Level 1)"
                    class="text-xs px-2 py-1 border border-[var(--border-default)] rounded"
                  />
                  <input
                    v-model="level.levelBaca"
                    placeholder="Baca (½ Juz)"
                    class="text-xs px-2 py-1 border border-[var(--border-default)] rounded"
                  />
                  <button
                    @click="form.raporSchemas[raporLembaga].levels.splice(li, 1)"
                    class="text-rose-500 text-xs hover:bg-rose-50 px-2 rounded"
                  >
                    <i class="fas fa-trash mr-1"></i>Hapus Level
                  </button>
                </div>
                <div class="space-y-1">
                  <p class="text-[10px] font-black text-teal-700 uppercase tracking-wider">
                    Khotam:
                  </p>
                  <div
                    v-for="(kh, ki) in level.khotamList || []"
                    :key="kh.id"
                    class="grid grid-cols-[1fr_60px_30px] gap-1 items-center bg-teal-50/60 rounded px-2 py-1"
                  >
                    <input
                      v-model="kh.labelKhotam"
                      placeholder="Khotam I"
                      class="text-[11px] px-1.5 py-0.5 border border-[var(--border-default)] rounded bg-[var(--bg-card)]"
                    />
                    <input
                      v-model.number="kh.multiplier"
                      type="number"
                      min="1"
                      max="10"
                      class="text-[11px] px-1.5 py-0.5 border border-[var(--border-default)] rounded bg-[var(--bg-card)] text-center"
                      title="Multiplier (2x/3x/...)"
                    />
                    <button
                      @click="level.khotamList.splice(ki, 1)"
                      class="text-rose-500 text-[11px] hover:bg-rose-100 rounded"
                      title="Hapus khotam"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                  <button
                    @click="addKhotam(level)"
                    class="text-[10px] bg-teal-200 hover:bg-teal-300 text-teal-800 font-bold px-2 py-0.5 rounded"
                  >
                    <i class="fas fa-plus mr-0.5"></i>Tambah Khotam
                  </button>
                </div>
              </div>
              <button
                @click="addLevel"
                class="text-xs bg-teal-100 hover:bg-teal-200 text-teal-700 font-bold px-3 py-1 rounded"
              >
                + Tambah Level
              </button>
            </div>
          </div>

          <!-- perKelas: Jenjang x Mapel -->
          <div v-else-if="schemaType() === 'perKelas'" class="space-y-2">
            <p class="text-[11px] font-bold text-teal-800">Jenjang Kelas x Mata Pelajaran:</p>
            <div
              v-for="(jen, ji) in form.raporSchemas[raporLembaga]?.jenjang || []"
              :key="jen.kelas"
              class="bg-[var(--bg-card)] p-2 rounded border border-teal-100"
            >
              <div class="flex items-center justify-between mb-1">
                <input
                  v-model="jen.kelas"
                  class="text-xs font-bold px-2 py-1 border border-[var(--border-default)] rounded w-32"
                  placeholder="Kelas (TK A)"
                />
                <button
                  @click="form.raporSchemas[raporLembaga].jenjang.splice(ji, 1)"
                  class="text-rose-500 text-xs"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-1 mt-1">
                <div
                  v-for="(m, mi) in jen.mapel || []"
                  :key="mi"
                  class="flex items-center gap-1 bg-[var(--bg-card-elevated)] p-1 rounded"
                >
                  <input
                    v-model="m.nama"
                    class="flex-1 text-[11px] px-1 py-0.5 border-0 bg-transparent"
                    placeholder="Mapel"
                  />
                  <input
                    v-model.number="m.kkm"
                    type="number"
                    min="0"
                    max="100"
                    class="w-12 text-[11px] px-1 py-0.5 border border-[var(--border-default)] rounded bg-[var(--bg-card)]"
                    title="KKM"
                  />
                  <button @click="jen.mapel.splice(mi, 1)" class="text-rose-400 text-[10px]">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <button
                @click="() => {; jen.mapel = jen.mapel || []; jen.mapel.push({ id: 'mapel_' + Date.now(), nama: '', kkm: 80 }); }"
                class="text-[10px] text-teal-700 font-bold mt-1"
              >
                + Tambah Mapel
              </button>
            </div>
            <button
              @click="addJenjang"
              class="text-xs bg-teal-100 hover:bg-teal-200 text-teal-700 font-bold px-3 py-1 rounded"
            >
              + Tambah Jenjang
            </button>
          </div>

          <!-- sections: Matrix Jilid -->
          <div v-else-if="schemaType() === 'sections'" class="space-y-2">
            <p class="text-[11px] font-bold text-teal-800">Sections (per kelas/jilid):</p>
            <div
              v-for="(sec, si) in form.raporSchemas[raporLembaga]?.sections || []"
              :key="sec.id"
              class="bg-[var(--bg-card)] p-2 rounded border border-teal-100 space-y-2"
            >
              <div class="flex items-center justify-between gap-2">
                <input
                  v-model="sec.title"
                  class="text-xs font-bold px-2 py-1 border border-[var(--border-default)] rounded flex-1"
                  placeholder="Title section (Jilid)"
                />
                <button
                  @click="form.raporSchemas[raporLembaga].sections.splice(si, 1)"
                  class="text-rose-500 text-xs hover:bg-rose-50 px-2 rounded"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              <div class="space-y-1">
                <p class="text-[10px] font-black text-teal-700 uppercase tracking-wider">
                  Rows (Jilid/Kelas):
                </p>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="(row, ri) in sec.rows || []"
                    :key="ri"
                    class="bg-teal-50 border border-teal-200 px-2 py-0.5 rounded text-[11px] flex items-center gap-1"
                  >
                    <input
                      v-model="sec.rows[ri]"
                      class="bg-transparent border-0 outline-none text-[11px] w-16"
                    />
                    <button @click="sec.rows.splice(ri, 1)" class="text-rose-400 text-[10px]">
                      <i class="fas fa-times"></i>
                    </button>
                  </span>
                  <button
                    @click="() => {; sec.rows = sec.rows || []; sec.rows.push('Baru'); }"
                    class="bg-teal-200 hover:bg-teal-300 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded"
                  >
                    + Row
                  </button>
                </div>
              </div>
              <div class="space-y-1">
                <p class="text-[10px] font-black text-teal-700 uppercase tracking-wider">
                  Fields (Kolom Nilai):
                </p>
                <div
                  v-for="(field, fi) in sec.fields || []"
                  :key="fi"
                  class="grid grid-cols-[1fr_90px_30px] gap-1 items-center bg-teal-50/60 rounded px-2 py-1"
                >
                  <input
                    v-model="field.label"
                    placeholder="Label"
                    class="text-[11px] px-1.5 py-0.5 border border-[var(--border-default)] rounded bg-[var(--bg-card)]"
                  />
                  <select
                    v-model="field.type"
                    class="text-[11px] px-1 py-0.5 border border-[var(--border-default)] rounded bg-[var(--bg-card)]"
                  >
                    <option value="number">Angka</option>
                    <option value="text">Teks</option>
                    <option value="date">Tanggal</option>
                    <option value="auto_predikat">Predikat (auto)</option>
                  </select>
                  <button @click="sec.fields.splice(fi, 1)" class="text-rose-500 text-[11px]">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <button
                  @click="() => {; sec.fields = sec.fields || []; sec.fields.push({ id: 'f_' + Date.now(), label: 'Baru', type: 'number' }); }"
                  class="bg-teal-200 hover:bg-teal-300 text-[10px] font-bold px-2 py-0.5 rounded"
                >
                  + Field
                </button>
              </div>
            </div>
          </div>
        </div>

        <p class="text-[11px] text-[var(--text-secondary)] italic">
          <i class="fas fa-info-circle mr-1"></i>Schema ini dipakai di Rapor Semester
          (perLevel/perKelas/sections) + Predikat auto-compute. Save semua via tombol Simpan di
          bawah.
        </p>
      </div>
    </UiCard>

    <!-- ============================================================
         FOOTER FLOATING: Reset + Simpan Semua
         ============================================================ -->
    <div
      class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-3 flex gap-2 z-20"
    >
      <UiButton variant="secondary" size="sm" @click="resetForm">
        <i class="fas fa-undo mr-1"></i>Reset
      </UiButton>
      <UiButton variant="primary" size="sm" :loading="saving" @click="simpanSemua">
        <i class="fas fa-save mr-1"></i>Simpan Semua
      </UiButton>
    </div>
  </div>
</template>

<script setup>
// ============================================================
// PengaturanView.vue
// Deminified dari backup-live/PengaturanView-Dp5SYlyr.js
// Setting global app: identitas, KOP, logo/BG, kalibrasi Hijri,
// master kegiatan, admin password, tema warna, submenu Formal/Qiraati,
// fitur+capacitor mode, jam shift, printer, rekap diniyah, postingan,
// schema rapor per-lembaga (perLevel/perKelas/sections).
// ============================================================
import { ref, computed, reactive, watch, watchEffect, onMounted, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useLembaga } from '@/composables/useLembaga'
import { uploadBase64 } from '@/services/storage'
import {
  ArrowLeft as ArrowLeftIcon,
  Image as ImageIcon,
  Plus as PlusIcon,
  Trash2 as Trash2Icon
} from 'lucide-vue-next'
import UiCard from '@/components/ui/UiCard.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiButton from '@/components/ui/UiButton.vue'
// v.21.105.0527: pakai shared masehiToHijri supaya preview match dgn kalender + widget
import { masehiToHijri } from '@/utils/hijri'

// ============================================================
// Setup: stores, composables, route
// ============================================================
const router = useRouter()
const route = useRoute()
const settingsStore = useSettingsStore()
const toast = useToast()
const confirm = useConfirm()
const { lembagaRaw } = useLembaga()

// ============================================================
// State: form (shape default), dirty flag, password inputs
// ============================================================
function defaultForm() {
  return {
    txtAppName: '',
    txtAppDesc: '',
    txtSidebarTitle: '',
    txtHeaderBar: 'Ammu Online',
    txtPeriode: '',
    txtWelcome: 'Ahlan',
    alamat: '',
    noTelp: '',
    namaChannel: 'Al Manshur Channel',
    kopLine1: '',
    kopLine2: '',
    kopLine3: '',
    kopLine4: '',
    logoUrl: '',
    logoKop: '',
    logoQiraati: '',
    bgImage: '',
    bgRaporTPQ: '',
    bgRaporDiniyah: '',
    namaPengasuh: '',
    rekapSchemaDiniyah: ['Aqidah Akhlak', 'Fiqh', 'Tarikh', 'Bahasa Arab'],
    rekapSchemaDiniyahPerKelas: {},
    postinganHanyaAdmin: false,
    postinganAutoApprove: true,
    postinganMaxImages: 5,
    postinganMaxSizeKb: 500,
    raporSchemas: {},
    predikatRules: [
      { min: 85, max: 100, label: 'A' },
      { min: 70, max: 84, label: 'B' },
      { min: 55, max: 69, label: 'C' },
      { min: 0, max: 54, label: 'D' }
    ],
    themeColor: '#0f766e',
    themeTextColor: '#1e293b',
    sidebarBgColor: '#0f172a',
    kalibrasiHijri: 0,
    adminUsername: 'adminmu',
    adminPassword: '1234',
    fiturBeranda: true,
    fiturKalender: true,
    fiturKritikSaran: true,
    fiturNotifikasi: true,
    autoNotifPostingan: true,
    softDelete: false,
    capacitorMode: 'remote',
    shiftPagiMulai: '06:00',
    shiftPagiSelesai: '12:00',
    shiftPagiTerlambat: '06:15',
    shiftSoreMulai: '14:00',
    shiftSoreSelesai: '17:00',
    shiftSoreTerlambat: '14:15',
    shiftSekolahMulai: '07:00',
    shiftSekolahSelesai: '13:00',
    shiftSekolahTerlambat: '07:15'
  }
}

const form = ref(defaultForm())
const dirty = ref(false)
const pwdNew = ref('')
const pwdConfirm = ref('')
const saving = ref(false)

// ============================================================
// Section tabs (state + definitions)
// ============================================================
const section = ref('identitas')
const tabs = [
  {
    id: 'identitas',
    label: 'Identitas',
    icon: 'fa-id-card',
    gradient: 'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900'
  },
  { id: 'kop', label: 'KOP Surat', icon: 'fa-file-alt', gradient: 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900' },
  { id: 'logo', label: 'Logo & BG', icon: 'fa-image', gradient: 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900' },
  {
    id: 'hijri',
    label: 'Kalibrasi Hijri',
    icon: 'fa-moon',
    gradient: 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900'
  },
  { id: 'admin', label: 'Admin Password', icon: 'fa-lock', gradient: 'from-rose-500 dark:from-rose-700 to-rose-700 dark:to-rose-900' },
  {
    id: 'theme',
    label: 'Tema Warna',
    icon: 'fa-palette',
    gradient: 'from-rose-500 dark:from-rose-700 to-teal-700 dark:to-teal-900'
  },
  {
    id: 'fitur',
    label: 'Fitur & Mode',
    icon: 'fa-toggle-on',
    gradient: 'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900'
  },
  { id: 'shift', label: 'Jam Shift', icon: 'fa-clock', gradient: 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900' },
  {
    id: 'postingan',
    label: 'Pengaturan Postingan',
    icon: 'fa-bullhorn',
    gradient: 'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900'
  }
  // Note: section "rekapDiniyah" & "raporSchema" tetap render dari kartu di template
  // (akses via routing /pengaturan?section=rekapDiniyah / ?section=raporSchema)
]

// ============================================================
// Hydrate form from settings store + watch external changes
// ============================================================
function hydrateForm() {
  const s = settingsStore.settings || {}
  form.value = {
    ...defaultForm(),
    ...Object.fromEntries(Object.keys(defaultForm()).map((k) => [k, s[k] ?? defaultForm()[k]]))
  }
  dirty.value = false
}

onMounted(async () => {
  await settingsStore.load()
  settingsStore.subscribe()
  hydrateForm()
  // Restore active section dari query string
  const qSec = route.query.section
  if (qSec && typeof qSec === 'string') section.value = qSec
  const qLem = route.query.lembaga
  if (qLem && typeof qLem === 'string') raporLembaga.value = qLem
})

// Re-hydrate kalau store berubah dari sumber lain (subscribe push)
watch(
  () => settingsStore.settings,
  () => {
    if (!dirty.value) hydrateForm()
  },
  { deep: true }
)

// Mark dirty kalau form berubah
let firstRun = true
watchEffect(() => {
  JSON.stringify(form.value) // touch deep
  if (firstRun) {
    firstRun = false
    return
  }
  dirty.value = true
})

// ============================================================
// Hijriyah converter (Kuwaiti algorithm) + preview
// ============================================================
const hijriMonths = [
  'Muharram',
  'Shafar',
  'Rabiul Awal',
  'Rabiul Akhir',
  'Jumadil Awal',
  'Jumadil Akhir',
  'Rajab',
  "Sya'ban",
  'Ramadhan',
  'Syawal',
  'Dzulqaidah',
  'Dzulhijjah'
]

// v.21.105.0527: hijriPreview pakai masehiToHijri (Intl islamic) — match
// dgn kalender + widget. Sebelumnya pakai Julian-date manual yg hasilnya beda.
const hijriPreview = computed(() => {
  try {
    const h = masehiToHijri(new Date(), Number(form.value.kalibrasiHijri || 0))
    if (!h.day || !h.month || !h.year) return '—'
    return `${h.day} ${hijriMonths[h.month - 1] || '?'} ${h.year} H`
  } catch {
    return '—'
  }
})

// ============================================================
// Upload handler (logo, bg, lembaga-logo) via Firebase Storage
// ============================================================
const uploading = ref('')

async function handleUpload(ev, path, folder = 'app_logos') {
  const file = ev.target.files?.[0]
  if (!file) return
  if (file.size > 5 * 1024 * 1024) {
    toast.error('File terlalu besar (maks 5MB)')
    return
  }
  uploading.value = path
  try {
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const url = await uploadBase64(
          `${folder}/${Date.now()}_${file.name}`,
          reader.result,
          file.type
        )
        setNested(form.value, path, url)
        toast.success('Upload berhasil')
        dirty.value = true
      } catch (err) {
        toast.error('Upload gagal: ' + (err.message || err))
      } finally {
        uploading.value = ''
      }
    }
    reader.onerror = () => {
      toast.error('Gagal baca file')
      uploading.value = ''
    }
    reader.readAsDataURL(file)
  } catch (err) {
    toast.error('Error: ' + (err.message || err))
    uploading.value = ''
  }
  ev.target.value = ''
}

function setNested(obj, path, value) {
  const parts = path.split('.')
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]]) cur[parts[i]] = {}
    cur = cur[parts[i]]
  }
  cur[parts[parts.length - 1]] = value
}

// ============================================================
// Ganti password admin built-in
// ============================================================
async function changeAdminPassword() {
  if (!pwdNew.value || pwdNew.value.length < 4) {
    toast.error('Password minimal 4 karakter')
    return
  }
  if (pwdNew.value !== pwdConfirm.value) {
    toast.error('Konfirmasi password tidak cocok')
    return
  }
  const ok = await confirm({
    title: 'Ganti password admin?',
    message: 'Password admin built-in akan diganti permanen.',
    danger: true
  })
  if (ok) {
    form.value.adminPassword = pwdNew.value
    pwdNew.value = ''
    pwdConfirm.value = ''
    toast.info('Password siap disimpan — klik Simpan untuk apply')
    dirty.value = true
  }
}

// ============================================================
// Navigasi back (guard kalau ada unsaved changes)
// ============================================================
async function goBack() {
  if (dirty.value) {
    const ok = await confirm({
      title: 'Tinggalkan halaman?',
      message: 'Ada perubahan yang belum disimpan. Yakin keluar?',
      confirmText: 'Keluar',
      danger: true
    })
    if (!ok) return
  }
  router.push('/dashboard')
}

// ============================================================
// Schema Rapor: pilih lembaga + tipe + helpers
// ============================================================
const raporLembaga = ref('')
const newField = ref('')

function schemaType() {
  const lem = raporLembaga.value
  if (!lem) return 'sections'
  const sch = form.value.raporSchemas[lem]
  if (!sch || Object.keys(sch).length === 0) return 'sections'
  if (sch.perLevel) return 'perLevel'
  if (sch.perKelas) return 'perKelas'
  if (Array.isArray(sch.sections)) return 'sections'
  return 'kosong'
}

function initSchemaType(type) {
  const lem = raporLembaga.value
  if (!lem) return
  if (!form.value.raporSchemas[lem]) form.value.raporSchemas[lem] = {}
  if (type === 'perLevel') {
    form.value.raporSchemas[lem] = {
      perLevel: true,
      fieldsNilai: [
        { id: 'fashohah', label: 'Fashohah' },
        { id: 'tartil', label: 'Tartil' },
        { id: 'adab', label: 'Adab' }
      ],
      levels: [
        {
          id: 'lvl_1',
          label: 'Level 1',
          levelBaca: '½ Juz',
          targetKhotam: '½ Juz',
          khotamList: [
            { id: 'khotam_I', labelKhotam: 'Khotam I', multiplier: 2 },
            { id: 'khotam_II', labelKhotam: 'Khotam II', multiplier: 2 },
            { id: 'khotam_III', labelKhotam: 'Khotam III', multiplier: 2 }
          ]
        }
      ]
    }
  } else if (type === 'perKelas') {
    form.value.raporSchemas[lem] = {
      perKelas: true,
      jenjang: [
        {
          kelas: 'I',
          mapel: [
            { id: 'tauhid', nama: 'TAUHID', kkm: 80 },
            { id: 'fiqih', nama: 'FIQIH', kkm: 80 },
            { id: 'akhlaq', nama: 'AKHLAQ', kkm: 80 }
          ]
        }
      ]
    }
  } else if (type === 'sections') {
    form.value.raporSchemas[lem] = {
      sections: [
        {
          id: 'jilid',
          title: 'Jilid',
          rows: ['1A', '1B', '2A', '2B'],
          fields: [
            { id: 'adab', label: 'Adab', type: 'number' },
            { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'adab' }
          ]
        }
      ]
    }
  } else {
    form.value.raporSchemas[lem] = { sections: [] }
  }
}

function addFieldNilai() {
  const lem = raporLembaga.value
  const label = newField.value.trim()
  if (!lem || !label) return
  const sch = form.value.raporSchemas[lem]
  if (!sch || !sch.perLevel) return
  if (!Array.isArray(sch.fieldsNilai)) sch.fieldsNilai = []
  const id = label
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
  if (sch.fieldsNilai.find((f) => f.id === id)) {
    toast.warning('Field sudah ada')
    return
  }
  sch.fieldsNilai.push({ id, label })
  newField.value = ''
}

function removeFieldNilai(idx) {
  const sch = form.value.raporSchemas[raporLembaga.value]
  if (sch?.fieldsNilai) sch.fieldsNilai.splice(idx, 1)
}

function addKhotam(level) {
  if (!Array.isArray(level.khotamList)) level.khotamList = []
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
  const n = level.khotamList.length
  const label = n < roman.length ? `Khotam ${roman[n]}` : `Khotam ${n + 1}`
  const id = `kh_${roman[n] || n + 1}`
  const mult =
    (level.khotamList.length > 0 && level.khotamList[level.khotamList.length - 1].multiplier) || 2
  level.khotamList.push({ id, labelKhotam: label, multiplier: mult })
}

function addLevel() {
  const lem = raporLembaga.value
  const sch = form.value.raporSchemas[lem]
  if (!sch || !sch.perLevel) return
  if (!Array.isArray(sch.levels)) sch.levels = []
  const n = sch.levels.length + 1
  sch.levels.push({
    id: `lvl_${n}`,
    label: `Level ${n}`,
    levelBaca: `${n} Juz`,
    targetKhotam: `${n} Juz`,
    khotamList: [
      { id: `khotam_I_${n}`, labelKhotam: 'Khotam I', multiplier: 2 },
      { id: `khotam_II_${n}`, labelKhotam: 'Khotam II', multiplier: 2 },
      { id: `khotam_III_${n}`, labelKhotam: 'Khotam III', multiplier: 2 }
    ]
  })
}

function addJenjang() {
  const lem = raporLembaga.value
  const sch = form.value.raporSchemas[lem]
  if (!sch || !sch.perKelas) return
  if (!Array.isArray(sch.jenjang)) sch.jenjang = []
  sch.jenjang.push({
    kelas: 'Kelas Baru',
    mapel: [{ id: 'mapel_' + Date.now(), nama: '', kkm: 80 }]
  })
}

// ============================================================
// Rekap Diniyah: tambah mapel default + override per kelas
// ============================================================
const newMapel = ref('')
const newKelas = ref('')

function addMapel() {
  const v = newMapel.value.trim()
  if (!v) return
  if (form.value.rekapSchemaDiniyah.includes(v)) {
    toast.warning('Mata pelajaran sudah ada')
    newMapel.value = ''
    return
  }
  form.value.rekapSchemaDiniyah.push(v)
  newMapel.value = ''
}

function addKelasOverride() {
  const k = newKelas.value.trim()
  if (!k) return
  if (!form.value.rekapSchemaDiniyahPerKelas) form.value.rekapSchemaDiniyahPerKelas = {}
  if (form.value.rekapSchemaDiniyahPerKelas[k]) {
    toast.warning(`Kelas ${k} sudah ada`)
    return
  }
  form.value.rekapSchemaDiniyahPerKelas[k] = [...(form.value.rekapSchemaDiniyah || [])]
  newKelas.value = ''
  dirty.value = true
}

// ============================================================
// Reset Schema ke template default berdasarkan tipe lembaga
// ============================================================
function resetSchemaTemplate() {
  const lem = raporLembaga.value
  if (!lem) return
  const key = String(lem || '')
    .toLowerCase()
    .trim()
  let template = {}

  if (key === 'pra ptpt' || key === 'ptpt' || key === 'ppph' || key === 'p3h') {
    // perLevel matrix khusus PTPT/PPPH (5 level)
    template = {
      perLevel: true,
      fieldsNilai: [
        { id: 'fashohah', label: 'Fashohah' },
        { id: 'tartil', label: 'Tartil' },
        { id: 'tahfizh_juz_30', label: 'Tahfizh Juz 30' },
        { id: 'ghorib', label: 'Ghorib' },
        { id: 'tajwid', label: 'Tajwid' },
        { id: 'doa_harian', label: 'Doa Harian' },
        { id: 'adab', label: 'Adab' }
      ],
      levels: [
        buildLevel('lvl_1', 'Level 1', '½ Juz', 3, 2),
        buildLevel('lvl_2', 'Level 2', '1 Juz', 3, 2),
        buildLevel('lvl_3', 'Level 3', '1½ Juz', 3, 2),
        buildLevel('lvl_4', 'Level 4', '2 Juz', 3, 3),
        buildLevel('lvl_5', 'Level 5', '3 Juz', 11, 3)
      ]
    }
  } else if (key === 'tpq' || key.startsWith('tpq ')) {
    // sections matrix Jilid untuk TPQ Sore
    template = {
      sections: [
        {
          id: 'jilid',
          title: 'Jilid',
          rows: ['Pra-TK', 'A', 'B', 'C', 'D', 'E', 'F', 'Tahsin', 'Tahfidz'],
          fields: [
            { id: 'tgl_naik', label: 'Tgl Naik', type: 'date' },
            { id: 'fashohah', label: 'Fashohah', type: 'number' },
            { id: 'tartil', label: 'Tartil', type: 'number' },
            { id: 'adab', label: 'Adab', type: 'number' },
            { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
          ]
        }
      ]
    }
  } else {
    // Diniyah / sekolah formal — perKelas mapel KKM
    template = {
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

  form.value.raporSchemas[lem] = template
  dirty.value = true
  toast.success(`Schema ${lem} di-reset ke template default. Klik Simpan untuk apply.`)
}

// Helper builder untuk perLevel khotam list
function buildLevel(id, label, baca, khotamCount, multiplier) {
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']
  const khotamList = []
  for (let i = 0; i < khotamCount; i++) {
    khotamList.push({
      id: `kh_${roman[i] || i + 1}`,
      labelKhotam: `Khotam ${roman[i] || i + 1}`,
      multiplier
    })
  }
  return { id, label, levelBaca: baca, targetKhotam: baca, khotamList }
}

// ============================================================
// Save all + Reset form
// ============================================================
function resetForm() {
  hydrateForm()
  toast.info('Form di-reset dari state tersimpan')
}

async function simpanSemua() {
  if (saving.value) return
  saving.value = true
  try {
    await settingsStore.save({ ...form.value })
    dirty.value = false
    toast.success('Pengaturan tersimpan')
  } catch (e) {
    toast.error('Gagal simpan: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}
</script>
