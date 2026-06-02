# -*- coding: utf-8 -*-
# v.90.0626 patch: (1) Rapor Diniyah picker SDI/SMP/SMA + PKBM jenjang split,
# (2) kelas filter pakai kelas_sekolah (fix "filter diniyah tidak fungsi sesuai lembaga"),
# (3) notif dropdown centered + drop-down (anti overlap/clip di device sempit).
# EOL-safe: baca/tulis dengan newline='' supaya CRLF dipertahankan.

import sys, io

RAPOR = "/sessions/pensive-confident-mendel/mnt/Portal MU/vue-app/src/views/RaporView.vue"
NOTIF = "/sessions/pensive-confident-mendel/mnt/Portal MU/vue-app/src/components/layout/AppNotifBell.vue"

def read(path):
    with io.open(path, "r", encoding="utf-8", newline="") as f:
        return f.read()

def write(path, txt):
    with io.open(path, "w", encoding="utf-8", newline="") as f:
        f.write(txt)

edits = []  # (path, label, old, new)

# ---------- RaporView.vue ----------

# E1: tambahkan ref jenjangFilter
edits.append((RAPOR, "E1 ref jenjangFilter",
    "const filterKelas = ref('')\r\nconst search = ref('')",
    "const filterKelas = ref('')\r\n"
    "const jenjangFilter = ref('') // '' | 'SMP' | 'SMA' - split PKBM, samakan picker dg Rekap Diniyah\r\n"
    "const search = ref('')"))

# E2: reset jenjangFilter di pilihKategori
edits.append((RAPOR, "E2 pilihKategori reset",
    "function pilihKategori(k) {\r\n  kategori.value = k\r\n  filterKelas.value = ''",
    "function pilihKategori(k) {\r\n  kategori.value = k\r\n  jenjangFilter.value = ''\r\n  filterKelas.value = ''"))

# E3: pilihLembaga terima arg jenjang
edits.append((RAPOR, "E3 pilihLembaga sig",
    "function pilihLembaga(id) {\r\n"
    "  lembaga.value = id\r\n"
    "  view.value = 'santri'\r\n"
    "  santriId.value = ''\r\n"
    "  search.value = ''\r\n"
    "  filterKelas.value = ''\r\n"
    "}",
    "function pilihLembaga(id, jenjang = '') {\r\n"
    "  lembaga.value = id\r\n"
    "  jenjangFilter.value = jenjang || ''\r\n"
    "  view.value = 'santri'\r\n"
    "  santriId.value = ''\r\n"
    "  search.value = ''\r\n"
    "  filterKelas.value = ''\r\n"
    "}"))

# E4: diniyahLembaga -> SDI / SMP / SMA (PKBM split)
edits.append((RAPOR, "E4 diniyahLembaga cards",
    "  const gradients = [\r\n"
    "    'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900',\r\n"
    "    'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900',\r\n"
    "    'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900',\r\n"
    "    'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900',\r\n"
    "    'from-rose-500 dark:from-rose-700 to-teal-700 dark:to-teal-900',\r\n"
    "    'from-rose-500 dark:from-rose-700 to-rose-700 dark:to-rose-900',\r\n"
    "    'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900'\r\n"
    "  ]\r\n"
    "  return all.map((l, idx) => ({\r\n"
    "    id: l.lembaga || l.nama,\r\n"
    "    label: l.lembaga || l.nama,\r\n"
    "    subtitle: l.jenjang || l.deskripsi || 'Sekolah Formal',\r\n"
    "    icon: 'fa-school',\r\n"
    "    gradient: gradients[idx % gradients.length]\r\n"
    "  }))\r\n"
    "})",
    "  // v.90.0626: SDI satu kartu; PKBM dipecah jadi SMP (VII-IX) & SMA (X-XII) - samakan dg Rekap Diniyah\r\n"
    "  const has = (name) => all.some((l) => String(l.lembaga || l.nama || '').toLowerCase().trim() === name)\r\n"
    "  const cards = []\r\n"
    "  if (has('sdi')) {\r\n"
    "    cards.push({ id: 'SDI', label: 'SDI', subtitle: 'Sekolah Dasar Islam (Kelas I-VI)', icon: 'fa-school', lembaga: 'SDI', jenjang: '', gradient: 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900' })\r\n"
    "  }\r\n"
    "  if (has('pkbm')) {\r\n"
    "    cards.push({ id: 'PKBM-SMP', label: 'SMP', subtitle: 'PKBM · Kelas VII–IX', icon: 'fa-school-flag', lembaga: 'PKBM', jenjang: 'SMP', gradient: 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900' })\r\n"
    "    cards.push({ id: 'PKBM-SMA', label: 'SMA', subtitle: 'PKBM · Kelas X–XII', icon: 'fa-graduation-cap', lembaga: 'PKBM', jenjang: 'SMA', gradient: 'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900' })\r\n"
    "  }\r\n"
    "  return cards\r\n"
    "})"))

# E5: picker click kirim lembaga + jenjang
edits.append((RAPOR, "E5 picker click",
    '            v-for="l in diniyahLembaga"\r\n'
    '            :key="l.id"\r\n'
    '            @click="pilihLembaga(l.id)"',
    '            v-for="l in diniyahLembaga"\r\n'
    '            :key="l.id"\r\n'
    '            @click="pilihLembaga(l.lembaga || l.id, l.jenjang)"'))

# E6: scope jenjang di santriList (diniyah branch)
edits.append((RAPOR, "E6 santriList jenjang scope",
    "      return ls === lmb || (!ls && lb === lmb)\r\n"
    "    })\r\n"
    "  }\r\n",
    "      return ls === lmb || (!ls && lb === lmb)\r\n"
    "    })\r\n"
    "    // v.90.0626: PKBM dipisah jenjang SMP (VII-IX) / SMA (X-XII)\r\n"
    "    if (jenjangFilter.value) {\r\n"
    "      list = list.filter((s) => kelasJenjang(s.kelas_sekolah || s.kelas) === jenjangFilter.value)\r\n"
    "    }\r\n"
    "  }\r\n"))

# E7: kelas filter pakai field sesuai kategori (diniyah -> kelas_sekolah)
edits.append((RAPOR, "E7 kelas filter field",
    "  if (filterKelas.value) list = list.filter((s) => String(s.kelas || '') === filterKelas.value)",
    "  if (filterKelas.value) {\r\n"
    "    list = list.filter((s) => {\r\n"
    "      const kv = kategori.value === 'qiraati' ? s.kelas : (s.kelas_sekolah || s.kelas)\r\n"
    "      return String(kv || '') === filterKelas.value\r\n"
    "    })\r\n"
    "  }"))

# E8 + E9: helper kelasJenjang + kelasOptions pakai kelas_sekolah & scope jenjang
edits.append((RAPOR, "E8 kelasOptions + kelasJenjang",
    "const kelasOptions = computed(() => {\r\n"
    "  const lmb = String(lembaga.value || '')\r\n"
    "    .toLowerCase()\r\n"
    "    .trim()\r\n"
    "  const set = new Set()\r\n"
    "  santriRaw.value.forEach((s) => {\r\n"
    "    const lb = String(s.lembaga || '')\r\n"
    "      .toLowerCase()\r\n"
    "      .trim()\r\n"
    "    const ls = String(s.lembaga_sekolah || '')\r\n"
    "      .toLowerCase()\r\n"
    "      .trim()\r\n"
    "    const match = kategori.value === 'qiraati' ? lb === lmb : ls === lmb || (!ls && lb === lmb)\r\n"
    "    if (match && s.kelas) set.add(String(s.kelas))\r\n"
    "  })\r\n"
    "  return [...set].sort()\r\n"
    "})",
    "// v.90.0626: klasifikasi kelas sekolah -> jenjang PKBM (toleran roman & angka, suffix A/B diabaikan)\r\n"
    "function kelasJenjang(kelasRaw) {\r\n"
    + r"  const k = String(kelasRaw || '').toUpperCase().replace(/KELAS/g, '').trim()" + "\r\n"
    + r"  const t = (k.split(/[\s_-]/)[0] || '').replace(/[^A-Z0-9]/g, '')" + "\r\n"
    + r"  if (/^(VII|VIII|IX|7|8|9)$/.test(t)) return 'SMP'" + "\r\n"
    + r"  if (/^(X|XI|XII|10|11|12)$/.test(t)) return 'SMA'" + "\r\n"
    "  return ''\r\n"
    "}\r\n"
    "\r\n"
    "const kelasOptions = computed(() => {\r\n"
    "  const lmb = String(lembaga.value || '')\r\n"
    "    .toLowerCase()\r\n"
    "    .trim()\r\n"
    "  const set = new Set()\r\n"
    "  santriRaw.value.forEach((s) => {\r\n"
    "    const lb = String(s.lembaga || '')\r\n"
    "      .toLowerCase()\r\n"
    "      .trim()\r\n"
    "    const ls = String(s.lembaga_sekolah || '')\r\n"
    "      .toLowerCase()\r\n"
    "      .trim()\r\n"
    "    const match = kategori.value === 'qiraati' ? lb === lmb : ls === lmb || (!ls && lb === lmb)\r\n"
    "    // v.90.0626: diniyah pakai kelas_sekolah (samakan dg Rekap); PKBM dibatasi jenjang aktif\r\n"
    "    const kls = kategori.value === 'qiraati' ? s.kelas : (s.kelas_sekolah || s.kelas)\r\n"
    "    if (match && kls && (!jenjangFilter.value || kelasJenjang(kls) === jenjangFilter.value)) set.add(String(kls))\r\n"
    "  })\r\n"
    "  return [...set].sort()\r\n"
    "})"))

# ---------- AppNotifBell.vue ----------
# E10: dropdown centered + drop-down di mobile, tetap right-anchored di desktop (md:)
edits.append((NOTIF, "E10 notif dropdown center",
    '        class="absolute right-0 mt-2 w-80 md:w-96 bg-[var(--bg-card)] rounded-2xl shadow-2xl border border-[var(--border-subtle)] z-50 overflow-hidden origin-top-right"',
    '        class="fixed left-1/2 -translate-x-1/2 top-[4.5rem] w-[calc(100vw-1.5rem)] max-w-sm md:absolute md:left-auto md:right-0 md:translate-x-0 md:top-full md:mt-2 md:w-96 bg-[var(--bg-card)] rounded-2xl shadow-2xl border border-[var(--border-subtle)] z-50 overflow-hidden origin-top md:origin-top-right"'))

# ---------- apply ----------
from collections import defaultdict
by_file = defaultdict(list)
for path, label, old, new in edits:
    by_file[path].append((label, old, new))

errors = []
results = []
new_text_by_file = {}
for path, lst in by_file.items():
    txt = read(path)
    for label, old, new in lst:
        c = txt.count(old)
        if c != 1:
            errors.append("%s [%s]: expected 1 match, found %d" % (path.split('/')[-1], label, c))
            continue
        txt = txt.replace(old, new, 1)
        results.append("OK  %s [%s]" % (path.split('/')[-1], label))
    new_text_by_file[path] = txt

if errors:
    print("ABORT - no files written:")
    for e in errors:
        print("  FAIL", e)
    for r in results:
        print("  ", r)
    sys.exit(1)

for path, txt in new_text_by_file.items():
    write(path, txt)
    # sanity: pastikan tidak ada lone \n (semua harus \r\n)
    raw = open(path, 'rb').read()
    lone = raw.replace(b'\r\n', b'').count(b'\n')
    print("WROTE", path.split('/')[-1], "lone_LF=", lone)

for r in results:
    print(r)
print("DONE", len(results), "edits applied")
