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
          <h2 class="text-lg md:text-xl font-black text-slate-800 dark:text-white leading-tight">
            Rapor Semester
          </h2>
          <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Pilih lembaga untuk mengelola data rapor santri.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-4">
        <select
          v-model="tahunAjaran"
          class="px-4 py-3 text-sm font-bold border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
        >
          <option v-for="t in TAHUN_AJARAN_OPTS" :key="t" :value="t">{{ t }}</option>
        </select>
        <select
          v-model="semester"
          class="px-4 py-3 text-sm font-bold border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
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
          gradient="from-emerald-500 to-emerald-700"
          @click="pilihKategori('qiraati')"
        />
        <UiActionCard
          icon="fas fa-book-open"
          title="Rapor Diniyah"
          subtitle="Mata pelajaran agama"
          gradient="from-blue-500 to-indigo-700"
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
          class="text-xs font-bold px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition cursor-pointer"
          title="Kembali"
        >
          <i class="fas fa-arrow-left"></i>
        </button>
        <div>
          <h2 class="text-lg md:text-xl font-black text-slate-800 dark:text-white leading-tight">
            <i
              :class="[
                'fas mr-2',
                kategori === 'qiraati' ? 'fa-mosque text-emerald-700' : 'fa-book-open text-blue-700'
              ]"
            ></i>
            Rapor {{ kategori === 'qiraati' ? 'Qiraati' : 'Diniyah' }}
          </h2>
          <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Pilih {{ kategori === 'qiraati' ? 'lembaga Qiraati' : 'sekolah formal' }}.
          </p>
        </div>
      </div>

      <!-- Qiraati: 5 lembaga fixed (TPQ Pagi+Sore split shift, Pra PTPT, PTPT, PPPH) -->
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
          class="text-center py-8 text-xs text-slate-400 italic"
        >
          <i class="fas fa-school text-3xl text-slate-300 dark:text-slate-600 block mb-2"></i>
          Belum ada sekolah formal terdaftar. Tambah lembaga tipe "Formal" di Master Data &gt;
          Lembaga.
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          <button
            v-for="l in diniyahLembaga"
            :key="l.id"
            @click="pilihLembaga(l.id)"
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
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <div class="flex items-center justify-between gap-3 flex-wrap mb-3">
          <div class="flex items-center gap-2">
            <button
              @click="view = 'lembaga'"
              class="text-xs font-bold px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition cursor-pointer"
              title="Kembali"
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <h2 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
              <i
                :class="[
                  'fas',
                  kategori === 'qiraati'
                    ? 'fa-mosque text-emerald-600'
                    : 'fa-book-open text-blue-600',
                  'mr-1'
                ]"
              ></i>
              {{ lembaga }} · {{ tahunAjaran }} {{ semester }}
            </h2>
          </div>
          <span class="text-[10px] text-slate-400 font-bold">{{ santriList.length }} santri</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input
            v-model="search"
            type="search"
            placeholder="Cari nama santri..."
            class="text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white"
          />
          <select
            v-model="filterKelas"
            class="text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
          >
            <option value="">Semua Kelas</option>
            <option v-for="k in kelasOptions" :key="k" :value="k">Kelas {{ k }}</option>
          </select>
        </div>
      </div>

      <div
        v-if="santriList.length === 0"
        class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center"
      >
        <i class="fas fa-users-slash text-slate-300 text-4xl block mb-2"></i>
        <p class="text-sm font-bold text-slate-700 dark:text-slate-300">
          Belum ada santri di {{ lembaga }}
        </p>
        <p class="text-xs text-slate-500 mt-1">
          Tambah santri lewat Master Data &gt; Data Santri dengan lembaga "{{ lembaga }}".
        </p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
        <button
          v-for="s in santriList"
          :key="s.id"
          @click="pilihSantri(s)"
          class="bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-slate-200 dark:border-slate-700 rounded-xl p-3 md:p-4 text-left transition cursor-pointer flex items-center gap-3"
        >
          <div
            class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm"
          >
            {{ (s.nama || '?').charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 dark:text-white truncate">
              {{ s.nama }}
              <span
                v-if="getRapors(s).length > 1"
                class="ml-1 text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold align-middle"
                :title="`Santri ini punya ${getRapors(s).length} rapor`"
              >
                <i class="fas fa-layer-group mr-0.5"></i>
                {{ getRapors(s).length }} rapor
              </span>
            </p>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              <span class="font-bold">{{ s.lembaga || '-' }}</span>
              · Kelas {{ s.kelas || '-' }}
              <span v-if="s.nis" class="ml-1">· NIS {{ s.nis }}</span>
              <span v-if="s.is_mukim" class="ml-1 text-purple-600 font-bold">· MUKIM</span>
            </p>
          </div>
          <i class="fas fa-chevron-right text-slate-400 text-xs"></i>
        </button>
      </div>
    </div>

    <!-- ===== STEP 4: Detail Rapor (printable) ===== -->
    <div v-else-if="view === 'detail'" class="space-y-4">
      <div
        class="no-print bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-2">
            <button
              @click="kembaliSantri"
              class="text-xs font-bold px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition cursor-pointer"
              title="Kembali"
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <h2 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
              <i
                :class="[
                  'fas',
                  kategori === 'qiraati'
                    ? 'fa-mosque text-emerald-600'
                    : 'fa-book-open text-blue-600',
                  'mr-1'
                ]"
              ></i>
              {{ santriAktif?.nama }} · {{ lembaga }} · {{ tahunAjaran }} {{ semester }}
            </h2>
          </div>
          <button
            v-if="santriAktif && !isSantri"
            @click="cetak"
            class="text-xs font-bold px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition cursor-pointer"
          >
            <i class="fas fa-print mr-1"></i>Cetak / Simpan PDF
          </button>
        </div>

        <!-- Rapor lain (kumulatif lintas lembaga) -->
        <div
          v-if="santriAktif && raporLain.length > 0"
          class="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2 flex-wrap"
        >
          <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <i class="fas fa-layer-group mr-1 text-amber-600"></i>Rapor lain:
          </span>
          <button
            v-for="r in raporLain"
            :key="r.lembaga"
            @click="switchRapor(r)"
            class="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition cursor-pointer"
          >
            <i :class="['fas', r.jenis === 'qiraati' ? 'fa-mosque' : 'fa-book-open', 'mr-1']"></i>
            {{ r.lembaga }} ({{ r.jenis === 'qiraati' ? 'Qiraati' : 'Diniyah' }})
          </button>
        </div>
      </div>

      <!-- ===== Print Area ===== -->
      <div
        v-if="santriAktif"
        id="rapor-print-area"
        class="bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-sm p-8 print:shadow-none print:border-0 print:rounded-none print:p-6 relative overflow-hidden"
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
                <div v-if="kop.line3" class="text-[12px] font-normal leading-tight text-slate-700">
                  {{ titleCase(kop.line3) }}
                </div>
                <div v-if="kop.line4" class="text-[12px] font-normal leading-tight text-slate-700">
                  {{ titleCase(kop.line4) }}
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
            {{
              kategori === 'diniyah'
                ? 'LAPORAN HASIL BELAJAR DINIYAH PESERTA DIDIK'
                : 'SURAT KETERANGAN HASIL PENDIDIKAN'
            }}
            <template v-if="kategori === 'diniyah'">
              <br />TAHUN PELAJARAN {{ tahunAjaran }}
            </template>
          </h2>

          <!-- Identitas -->
          <table class="w-full text-[11px] mb-2">
            <tbody v-if="kategori === 'diniyah'">
              <tr>
                <td class="w-[120px] py-0.5">No. Induk</td>
                <td class="w-[10px]">:</td>
                <td class="py-0.5">{{ santriAktif.nis || '-' }}</td>
                <td class="w-[120px]">Kelas</td>
                <td class="w-[10px]">:</td>
                <td>{{ santriAktif.kelas_sekolah || '-' }}</td>
              </tr>
              <tr>
                <td class="py-0.5">Nama</td>
                <td>:</td>
                <td class="py-0.5">{{ santriAktif.nama }}</td>
                <td>Semester</td>
                <td>:</td>
                <td>{{ semester }}</td>
              </tr>
              <tr>
                <td class="py-0.5">Lembaga</td>
                <td>:</td>
                <td class="py-0.5" colspan="4">
                  {{ santriAktif.lembaga_sekolah || santriAktif.lembaga || '-' }}
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td class="w-[120px] py-0.5">Nama Santri</td>
                <td class="w-[10px]">:</td>
                <td class="py-0.5">{{ santriAktif.nama }}</td>
                <td class="w-[120px]">Tahun Pelajaran</td>
                <td class="w-[10px]">:</td>
                <td>{{ tahunAjaran }}</td>
              </tr>
              <tr>
                <td class="py-0.5">Lembaga</td>
                <td>:</td>
                <td class="py-0.5">{{ santriAktif.lembaga || '-' }}</td>
                <td>Semester</td>
                <td>:</td>
                <td>{{ semester }}</td>
              </tr>
              <tr>
                <td class="py-0.5">Kelas</td>
                <td>:</td>
                <td class="py-0.5" colspan="4">
                  {{ santriAktif.kelas_sekolah || santriAktif.kelas || '-' }}
                </td>
              </tr>
            </tbody>
          </table>

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
                <tr class="bg-slate-100">
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
                <tr class="bg-amber-50">
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
              class="text-[11px] italic text-slate-500 border border-dashed border-slate-300 rounded p-3 text-center"
            >
              Jenjang "{{ santriAktif.kelas_sekolah || '-' }}" belum dikonfigurasi schema-nya.
            </div>
            <table v-else class="w-full border-collapse text-[11px]">
              <thead class="bg-blue-100">
                <tr>
                  <th class="border border-black px-2 py-1.5 w-[40px]">NO</th>
                  <th class="border border-black px-2 py-1.5 text-left">MATA PELAJARAN</th>
                  <th class="border border-black px-2 py-1.5 w-[50px]">KKM</th>
                  <th class="border border-black px-2 py-1.5">NILAI RATA-RATA SUMATIF</th>
                  <th class="border border-black px-2 py-1.5">NILAI SUMATIF AKHIR SEMESTER</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(mp, idx) in jenjangAktif.mapel || []" :key="mp.id || idx">
                  <td class="border border-black px-2 py-1.5 text-center font-bold">
                    {{ idx + 1 }}
                  </td>
                  <td class="border border-black px-2 py-1.5">{{ mp.nama }}</td>
                  <td class="border border-black px-2 py-1.5 text-center">{{ mp.kkm || 80 }}</td>
                  <td class="border border-black px-2 py-1.5 text-center">
                    {{
                      getNilai(
                        `dn__${santriAktif.kelas_sekolah}__${mp.id || slug(mp.nama)}__sumatif`
                      ) || '-'
                    }}
                  </td>
                  <td class="border border-black px-2 py-1.5 text-center">
                    {{
                      getNilai(
                        `dn__${santriAktif.kelas_sekolah}__${mp.id || slug(mp.nama)}__akhir`
                      ) || '-'
                    }}
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
            <div class="text-[11px] font-bold text-slate-600 mb-1 px-1">
              <i class="fas fa-info-circle text-blue-500 mr-1"></i>
              <span class="text-emerald-700">KUMULATIF</span>
              — {{ kelasJuzRows.length }} baris (Kelas 1 s/d {{ santriAktif?.kelas || '—' }})
            </div>
            <table
              class="border-collapse text-[10px] md:text-[11px] w-full min-w-[600px] table-fixed"
            >
              <thead class="bg-slate-100">
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
                    class="border border-slate-500 px-1.5 py-1 text-center font-black bg-slate-50 align-middle"
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
                  >
                    {{ getNilaiKelasJuz(row, f) }}
                  </td>
                </tr>
                <tr v-if="kelasJuzRows.length === 0">
                  <td
                    :colspan="2 + (schema.fields || []).length"
                    class="border border-slate-300 px-2 py-3 text-center text-slate-400 italic text-[11px]"
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
                class="text-center font-bold bg-slate-100 border border-slate-500 px-2 py-1 text-[11px] uppercase"
              >
                {{ sec.title }}
              </div>
              <table
                v-if="sec.rows && sec.rows.length > 0"
                class="w-full border-collapse text-[10px]"
              >
                <thead class="bg-slate-100">
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
                    >
                      {{ getSectionValue(sec.id, row, f) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table v-else class="w-full border-collapse text-[10px]">
                <thead class="bg-slate-100">
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
            class="text-[11px] italic text-slate-500 my-3 border border-dashed border-slate-300 rounded p-3 text-center"
          >
            Schema rapor untuk lembaga "{{ santriAktif.lembaga }}" belum dikonfigurasi. Setup di
            Pengaturan Web &gt; Schema Rapor.
          </div>

          <!-- Rata-rata Nilai -->
          <table class="w-full border-collapse text-[11px] mt-3">
            <tr>
              <td
                class="border border-slate-500 px-1.5 py-1 bg-slate-100 font-bold text-center"
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
                <p class="my-0.5">1. Sakit : {{ absensi.sakit || 0 }}</p>
                <p class="my-0.5">2. Izin : {{ absensi.izin || 0 }}</p>
                <p class="my-0.5">3. Alpa : {{ absensi.alpa || 0 }}</p>
              </td>
              <td class="align-top w-1/2">
                <p class="font-bold mb-1">NILAI KEPRIBADIAN</p>
                <p class="my-0.5">Kelakuan : {{ kepribadian.kelakuan || 'Baik' }}</p>
                <p class="my-0.5">Kerajinan : {{ kepribadian.kerajinan || 'Baik' }}</p>
                <p class="my-0.5">Kebersihan : {{ kepribadian.kebersihan || 'Baik' }}</p>
              </td>
            </tr>
          </table>

          <!-- Catatan -->
          <div class="border border-slate-500 p-1.5 mt-2 text-[10px] min-h-[18mm]">
            <p class="font-bold mb-1">Catatan untuk santri / orang tua :</p>
            <p class="m-0 whitespace-pre-line">{{ catatanRapor }}</p>
          </div>

          <!-- Tanda Tangan -->
          <div class="mt-8 text-[10px]">
            <table class="w-full text-center">
              <tr>
                <td class="w-1/3"></td>
                <td class="w-1/3"></td>
                <td class="w-1/3">Sidoarjo, {{ tglCetak }}</td>
              </tr>
              <tr>
                <td>Wali Santri</td>
                <td>Guru Kelas</td>
                <td>{{ jabatanKepala }}</td>
              </tr>
              <tr style="height: 60px; vertical-align: bottom">
                <td></td>
                <td>
                  <img
                    v-if="ttdGuru"
                    :src="ttdGuru"
                    alt="TTD Guru"
                    style="
                      display: inline-block;
                      max-width: 120px;
                      max-height: 60px;
                      object-fit: contain;
                    "
                  />
                </td>
                <td>
                  <img
                    v-if="ttdKepala"
                    :src="ttdKepala"
                    alt="TTD Kepala"
                    style="
                      display: inline-block;
                      max-width: 120px;
                      max-height: 60px;
                      object-fit: contain;
                    "
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span class="underline font-bold">{{
                    santriAktif?.wali || '..............................'
                  }}</span>
                </td>
                <td>
                  <span class="underline font-bold">{{ namaGuru || '..........' }}</span>
                </td>
                <td>
                  <span class="underline font-bold">{{
                    namaKepala || '..............................'
                  }}</span>
                </td>
              </tr>
              <tr class="text-[9px] text-slate-600">
                <td></td>
                <td>{{ ekgqGuru ? 'EKGQ: ' + ekgqGuru : '' }}</td>
                <td>{{ ekgqKepala ? 'EKGQ: ' + ekgqKepala : '' }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, unref } from 'vue'
import { useRoute } from 'vue-router'
import { subscribeColl } from '@/services/firestore'
import { useSantri } from '@/composables/useSantri'
import { useLembaga } from '@/composables/useLembaga'
import { useGuru } from '@/composables/useGuru'
import { useToast } from '@/composables/useToast'
import { useSettingsStore } from '@/stores/settings'
import { useAuthStore } from '@/stores/auth'
import UiActionCard from '@/components/ui/UiActionCard.vue'

const toast = useToast()
const route = useRoute()

// Real-time rapor docs (1 doc per santri+lembaga+periode)
const raporDocs = ref([])
let unsubRapor = null
onMounted(() => {
  unsubRapor = subscribeColl('rapor_semester', (docs) => {
    raporDocs.value = docs || []
  })
})
onUnmounted(() => {
  if (unsubRapor) {
    try {
      unsubRapor()
    } catch (e) {}
  }
})

const { santriRaw, getRapors } = useSantri()
const { lembagaRaw } = useLembaga()
const { guruRaw } = useGuru()
const settingsStore = useSettingsStore()
const authStore = useAuthStore()

// Role-based view restrictions
const isGuruOnly = computed(() => {
  const s = authStore.sesiAktif
  return (
    s?.role === 'guru' &&
    s?.role_sistem !== 'super_admin' &&
    s?.role_sistem !== 'admin' &&
    s?.role_sistem !== 'admin_keuangan'
  )
})
const isSantri = computed(() => authStore.sesiAktif?.role === 'santri')

// Navigation state machine: picker -> lembaga -> santri -> detail
const view = ref('picker')
const kategori = ref('') // 'qiraati' | 'diniyah'
const lembaga = ref('') // 'TPQ Pagi' | 'TPQ Sore' | 'Pra PTPT' | 'PTPT' | 'PPPH' | 'SDI' | 'PKBM' | ...
const santriId = ref(isSantri.value ? String(authStore.sesiAktif?.id || '') : '')
const filterKelas = ref('')
const search = ref('')

// Qiraati: 5 lembaga (TPQ Pagi+Sore SPLIT untuk picker tapi same shift-variant data)
const QIRAATI_LEMBAGA = [
  {
    id: 'TPQ Pagi',
    label: 'TPQ Pagi',
    subtitle: "Taman Pendidikan Al-Qur'an",
    icon: 'fa-mosque',
    gradient: 'from-emerald-500 to-emerald-700'
  },
  {
    id: 'TPQ Sore',
    label: 'TPQ Sore',
    subtitle: "Taman Pendidikan Al-Qur'an",
    icon: 'fa-mosque',
    gradient: 'from-teal-500 to-teal-700'
  },
  {
    id: 'Pra PTPT',
    label: 'Pra PTPT',
    subtitle: 'Pra Tahfizh',
    icon: 'fa-book-quran',
    gradient: 'from-blue-500 to-blue-700'
  },
  {
    id: 'PTPT',
    label: 'PTPT',
    subtitle: 'Pasca TPQ Program Tahfizh',
    icon: 'fa-book-quran',
    gradient: 'from-purple-500 to-purple-700'
  },
  {
    id: 'PPPH',
    label: 'PPPH',
    subtitle: 'Pasca PTPT Program Hadits',
    icon: 'fa-book-bookmark',
    gradient: 'from-amber-500 to-amber-700'
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
  const lmb = String(lembaga.value || '')
    .toLowerCase()
    .trim()
  if (!lmb) return []
  let list = santriRaw.value.filter((s) => s.aktif !== false)

  if (kategori.value === 'qiraati') {
    if (lmb === 'tpq pagi' || lmb === 'tpq sore') {
      // TPQ Pagi/Sore = same lembaga "TPQ" with shift variant
      const shift = lmb === 'tpq pagi' ? 'pagi' : 'sore'
      list = list.filter((s) => {
        const l = String(s.lembaga || '')
          .toLowerCase()
          .trim()
        const sh = String(s.shift || '')
          .toLowerCase()
          .trim()
        return (l === 'tpq' && sh === shift) || l === lmb
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

  if (filterKelas.value) list = list.filter((s) => String(s.kelas || '') === filterKelas.value)
  if (search.value.trim()) {
    const kw = search.value.trim().toLowerCase()
    list = list.filter((s) =>
      String(s.nama || '')
        .toLowerCase()
        .includes(kw)
    )
  }

  return list.sort(
    (a, b) =>
      String(a.kelas || '').localeCompare(String(b.kelas || '')) ||
      String(a.nama || '').localeCompare(String(b.nama || ''))
  )
})

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
    if (match && s.kelas) set.add(String(s.kelas))
  })
  return [...set].sort()
})

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
    const lnorm = String(santriAktif.value.lembaga || '')
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
  return lmbObj.kop_logo || settingsStore.settings?.logoUrl || ''
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
  const g = (guruRaw.value || []).find((x) => {
    const r = String(x.role_sistem || '').toLowerCase()
    const j = String(x.jabatan || '').toLowerCase()
    return r === 'super_admin' || r === 'admin' || j.includes('kepala') || j.includes('pengasuh')
  })
  return g?.tanda_tangan || g?.ttd_url || g?.ttd || ''
})

// ===== Schema fields untuk Pra PTPT =====
const FIELDS_NILAI_DEFAULT = [
  { id: 'fashohah', label: 'Fashohah' },
  { id: 'tartil', label: 'Tartil' },
  { id: 'tahfizh_juz_30', label: 'Tahfizh Juz 30' },
  { id: 'ghorib', label: 'Ghorib' },
  { id: 'tajwid', label: 'Tajwid' },
  { id: 'doa_harian', label: 'Doa Harian' },
  { id: 'adab', label: 'Adab' }
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

  // PTPT / PPPH: tableLayout kelasJuz, KUMULATIF up to santri kelas
  if (lmb === 'ptpt' || lmb === 'ppph') {
    const fields = [
      { id: 'istimror', label: 'Istimror', type: 'number', group: 'Kualitas Hafalan' },
      { id: 'kelancaran', label: 'Kelancaran', type: 'number', group: 'Kualitas Hafalan' },
      { id: 'fashohah', label: 'Fashohah', type: 'number', group: 'Kualitas Bacaan' },
      { id: 'tajwid', label: 'Tajwid', type: 'number', group: 'Kualitas Bacaan' },
      { id: 'adab', label: 'Adab', type: 'number' },
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
            { id: 'adab', label: 'Adab', type: 'number' },
            { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'adab' }
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
            { id: 'adab', label: 'Adab', type: 'number' },
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
            { id: 'adab', label: 'Adab', type: 'number' },
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

// schema = override dari settings.raporSchemas kalau ada, else default builder
const schema = computed(() => {
  if (!santriAktif.value) return {}
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
    return isTahfizh && overrideHasJuzMapel ? buildSchema(lmb) : found
  }
  return buildSchema(kategori.value === 'diniyah' ? 'diniyah' : lmb)
})

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

const absensi = computed(() => raporDoc.value?.absensi || { sakit: 0, izin: 0, alpa: 0 })
const kepribadian = computed(
  () => raporDoc.value?.kepribadian || { kelakuan: 'Baik', kerajinan: 'Baik', kebersihan: 'Baik' }
)
const catatanRapor = computed(() => raporDoc.value?.catatan || '')

// ===== Rata-rata =====
const rataRata = computed(() => {
  const fromDoc = raporDoc.value?.rata_rata
  if (fromDoc && Number(fromDoc) > 0) return fromDoc
  if (schema.value.perKelas && jenjangAktif.value) {
    const nilai = raporDoc.value?.data_nilai || {}
    const kls = santriAktif.value?.kelas_sekolah || ''
    let sum = 0
    let n = 0
    ;(jenjangAktif.value.mapel || []).forEach((mp) => {
      const mid = mp.id || slug(mp.nama)
      const v = Number(nilai[`dn__${kls}__${mid}__akhir`])
      if (!isNaN(v) && v > 0) {
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

function getNilai(key) {
  // tgl_khotam fallback chain ke kartu kenaikan
  if (key && key.endsWith('__tgl_khotam')) {
    const parts = key.split('__')
    if (parts.length === 4) {
      const fromKk = tglKhotamFromKenaikan(parts[1], parts[2])
      if (fromKk) return fromKk
    }
  }
  return raporDoc.value?.data_nilai?.[key]
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

// ===== Predikat rules =====
const DEFAULT_PREDIKAT = [
  { min: 85, max: 100, label: 'A' },
  { min: 70, max: 84, label: 'B' },
  { min: 55, max: 69, label: 'C' },
  { min: 0, max: 54, label: 'D' }
]
function predikat(n) {
  const rules =
    settingsStore.settings?.predikatRules && settingsStore.settings.predikatRules.length > 0
      ? settingsStore.settings.predikatRules
      : DEFAULT_PREDIKAT
  const v = Number(n)
  if (isNaN(v)) return '-'
  const r = rules.find((rr) => v >= Number(rr.min) && v <= Number(rr.max))
  return r ? r.label : '-'
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
  const key = `${flatKey(row)}__${field.id}`
  const nilai = raporDoc.value?.data_nilai || {}
  const v = nilai[key]
  if (field.type === 'auto_predikat') {
    if (field.source === 'avg') {
      const numFields = (schema.value.fields || []).filter((f) => f.type === 'number')
      let sum = 0
      let n = 0
      numFields.forEach((nf) => {
        const vv = Number(nilai[`${flatKey(row)}__${nf.id}`] || 0)
        if (!isNaN(vv) && vv > 0) {
          sum += vv
          n++
        }
      })
      return n > 0 ? predikat(sum / n) : '-'
    }
    if (field.source) {
      const vv = Number(nilai[`${flatKey(row)}__${field.source}`] || 0)
      return vv > 0 ? predikat(vv) : '-'
    }
    return '-'
  }
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
  return 'Kepala Sekolah'
})

const namaGuru = computed(() => {
  const s = santriAktif.value
  return (s && (Array.isArray(s.guru) ? s.guru.join(', ') : s.guru)) || '-'
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

// EKGQ fallback chain: nrg -> ekgq -> no_ekgq -> nip
const ekgqGuru = computed(() => {
  const s = santriAktif.value
  if (!s) return ''
  const guruArr = Array.isArray(s.guru) ? s.guru : s.guru ? [s.guru] : []
  for (const g of guruArr) {
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
  view.value = 'lembaga'
  filterKelas.value = ''
  search.value = ''
  santriId.value = ''
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
  const gradients = [
    'from-blue-500 to-blue-700',
    'from-indigo-500 to-indigo-700',
    'from-violet-500 to-violet-700',
    'from-purple-500 to-purple-700',
    'from-pink-500 to-fuchsia-700',
    'from-rose-500 to-rose-700',
    'from-cyan-500 to-cyan-700'
  ]
  return all.map((l, idx) => ({
    id: l.lembaga || l.nama,
    label: l.lembaga || l.nama,
    subtitle: l.jenjang || l.deskripsi || 'Sekolah Formal',
    icon: 'fa-school',
    gradient: gradients[idx % gradients.length]
  }))
})

function pilihLembaga(id) {
  lembaga.value = id
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

async function cetak() {
  if (!santriAktif.value) return
  try {
    await new Promise((r) => setTimeout(r, 50))
    window.print()
    toast?.success?.('Dialog cetak dibuka — pilih "Save as PDF" untuk simpan PDF')
  } catch (e) {
    toast?.error?.('Gagal cetak: ' + (e.message || e))
  }
}

// ===== Auto-route from query (?kategori=...) + role-based shortcut =====
onMounted(() => {
  const q = String(route.query.kategori || '').toLowerCase()
  if ((q === 'qiraati' || q === 'diniyah') && isSantri.value) {
    kategori.value = q
    const lmb = String(authStore.sesiAktif?.lembaga || '').trim()
    if (q === 'qiraati') {
      const match = QIRAATI_LEMBAGA.find((l) => l.id.toLowerCase() === lmb.toLowerCase())
      if (match) {
        lembaga.value = match.id
        view.value = 'detail'
      } else {
        view.value = 'lembaga'
      }
    } else {
      lembaga.value = 'Diniyah'
      view.value = 'detail'
    }
  }
  // Guru-only: auto-jump to their lembaga's santri list
  if (isGuruOnly.value && view.value === 'picker') {
    const lmb = String(authStore.sesiAktif?.lembaga || '').trim()
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
