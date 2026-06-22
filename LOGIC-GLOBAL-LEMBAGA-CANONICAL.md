# Portal MU — Logic Global Lembaga (Canonical Spec)

> Tanggal: 26 Mei 2026
> Sumber: konfirmasi langsung kyai
> Status: WAJIB DIPATUHI untuk semua fitur baru terkait lembaga, jenjang, kepala, rapor
> Memory ref: supersede `portal_mu_lembaga_schema_canonical.md`, `portal_mu_tpq_shift_spec.md`, `portal_mu_lembaga_spec.md`

---

## 1. Hirarki Lembaga

### 🕌 Lembaga Qiraati (group: `qiraati`)

#### **TPQ** (payung, kepala: **Kepala TPQ**)
Variants (sub-lembaga di Firestore):
- **TPQ Pagi** (shift: `pagi`)
- **TPQ Sore** (shift: `sore`)
- **Pra PTPT** (no shift, satu kelas saja)

Jenjang TPQ Pagi & Sore: `Jilid 1 (A, B, C)`, `Jilid 2 (A, B)`, `Jilid 3 (A, B)`, `Jilid 4 (A, B)`, `Jilid 5 (A, B)`, `KPI` (Kelas Persiapan IMTAS), `PK` (Persiapan Khotaman)

Jenjang Pra PTPT: `Level 1 (½ Juz)`, `Level 2 (1 Juz)`, `Level 3 (1½ Juz)`, `Level 4 (2 Juz)`, `Level 5 (3 Juz)`

Rapor Qiraati:
- **TPQ Pagi**: ❌ TIDAK punya
- **TPQ Sore**: ✅ PUNYA
- **Pra PTPT**: ✅ PUNYA

#### **PTPT** (Pasca TPQ Program Tahfizh, kepala: **PJ PTPT**)
- Variants: hanya `PTPT`
- Shift guru: Pagi & Sore / Pagi / Sore
- Shift santri: Pagi & Sore / Pagi / Sore
- Jenjang (range juz tiap kelas):
  - Kelas 1: Juz 1-5
  - Kelas 2: Juz 6-10
  - Kelas 3: Juz 11-15
  - Kelas 4: Juz 16-20
  - Kelas 5: Juz 21-25
  - Kelas 6: Juz 26-30
- **PUNYA rapor Qiraati**

#### **PPPH** (Pasca PTPT Program Hadits, kepala: **PJ PPPH**)
- Variants: hanya `PPPH`
- Shift guru: **HANYA Pagi & Sore** (tidak ada Pagi-only atau Sore-only)
- Shift santri: Pagi & Sore (1 mode saja)
- Jenjang (per kitab):
  - Level 1: Arba'in Nawawi
  - Level 2: Riyadhus Sholihin
  - Level 3: Shahih Bukhari
  - Level 4: Shahih Muslim
- **PUNYA rapor Qiraati**

### 🏫 Lembaga Formal (group: `sekolah`)

#### **TK** (Taman Kanak-Kanak, kepala: **Kepala TK**)
- 1 lembaga (BUKAN dipecah TK A + TK B sebagai lembaga terpisah)
- Jenjang: `TK A`, `TK B` ← analog Kelas I-VI di SDI
- **TIDAK punya rapor Diniyah**

#### **SDI** (Sekolah Dasar Islam, kepala: **Kepala SDI**)
- 1 lembaga
- Jenjang: `Kelas I`, `Kelas II`, `Kelas III`, `Kelas IV`, `Kelas V`, `Kelas VI`
- **PUNYA rapor Diniyah**

#### **PKBM** (Pusat Kegiatan Belajar Masyarakat, kepala: **Kepala PKBM**)
- 1 lembaga dengan **2 sub-tier internal**:
  - **SMP**: Kelas VII, VIII, IX
  - **SMA**: Kelas X, XI, XII
- **PUNYA rapor Diniyah**

### 🛏️ Non-utama
- **Ma'had** (group: `mahad`, kepala: Kepala Ma'had) — asrama
- **Yayasan** (group: `non-lembaga`, kepala: PJ Administrasi)
- **Sarana Prasarana** (group: `non-lembaga`, kepala: Koordinator Sarana)


---

## 2. Matrix Rapor (FINAL)

| Lembaga | Rapor Qiraati | Rapor Diniyah |
|---|:---:|:---:|
| TPQ Pagi | ❌ | — |
| TPQ Sore | ✅ | — |
| Pra PTPT | ✅ | — |
| PTPT | ✅ | — |
| PPPH | ✅ | — |
| TK | — | ❌ |
| SDI | — | ✅ |
| PKBM | — | ✅ |

**Aturan:** Lembaga Qiraati TIDAK punya rapor Diniyah (rapor Diniyah eksklusif Formal). Lembaga Formal TIDAK punya rapor Qiraati.

---

## 3. Rules Operasional

- **Jumlah kelas di statistik** = jumlah GURU yang sudah ada santrinya (BUKAN dihitung jenjangnya)
- **Guru Qiraati shift fleksibel**: ada yang ngajar Pagi & Sore, ada yang Pagi saja, ada yang Sore saja
- **Guru double-role**: guru Qiraati bisa double sebagai guru sekolah formal (TK/SDI/PKBM), bisa juga tidak
- **Santri, guru Qiraati, guru sekolah bisa BEDA ORANG**: 1 santri bisa belajar Qiraati dengan guru X + sekolah dengan guru Y

---

## 4. Status Codebase vs Spec (per 26 Mei 2026)

✅ **Sudah match** di `vue-app/src/composables/useLembaga.js` (v.21.10.0526):
- TPQ payung dengan variants `['TPQ Pagi', 'TPQ Sore', 'Pra PTPT']` + `tpq_group: 'TPQ'`
- Kepala TPQ, PJ PTPT, PJ PPPH, Kepala TK/SDI/PKBM (bukan typo)
- PTPT Kelas 1-6
- Pra PTPT Level 1-5
- SDI Kelas I-VI
- Ma'had, Yayasan, Sarana Prasarana

⚠️ **MIGRATION NEEDED** (gap vs spec hari ini):

| # | Item | Gap | Severity |
|---|---|---|---|
| 1 | TK A & TK B | Saat ini 2 LEMBAGA terpisah (`'TK A'`, `'TK B'` di `master/lembaga`). Harus REFACTOR jadi 1 lembaga `TK` dengan `kelas: ['TK A', 'TK B']`. Plus data migration santri `lembaga: 'TK A'` → `lembaga: 'TK', kelas: 'TK A'` | 🔴 Tinggi |
| 2 | PKBM SMP/SMA sub-tier | Saat ini kelas flat `['VII', 'VIII', ..., 'XII']`. Tambah konsep sub-tier `SMP: ['VII', 'VIII', 'IX']` + `SMA: ['X', 'XI', 'XII']` di seed/UI | 🟡 Sedang |
| 3 | TPQ Jilid sub-tier | Saat ini `['Jilid 1', 'Jilid 2', ...]` flat. Tambah sub-tier per Jilid: `Jilid 1 (A, B, C)`, `Jilid 2-5 (A, B)` | 🟡 Sedang |
| 4 | PPPH kelas seed | Saat ini `kelas: []` kosong. Seed dengan `['Level 1', 'Level 2', 'Level 3', 'Level 4']` + label kitab | 🟢 Ringan |
| 5 | PTPT range juz | Label sudah ada, range juz cuma di `utils/kenaikan.js` `DEFAULT_KARTU_KENAIKAN_PTPT`. Pastikan UI input nilai PTPT pakai range juz ini juga | 🟢 Info |

---

## 5. Action Items (untuk session berikutnya)

1. **Migration TK A/B** — paling kritikal, ada data Firestore yang perlu refactor
2. **PKBM SMP/SMA** — update UI dengan label sub-tier
3. **TPQ Jilid sub-tier** — update seed + UI input
4. **PPPH kelas seed** — quick win

---

> Save juga ke memory dir Claude (kalau perlu): `spaces/.../memory/portal_mu_lembaga_schema_canonical_v2.md` (supersede yang lama).
