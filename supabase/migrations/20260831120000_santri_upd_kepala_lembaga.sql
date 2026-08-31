-- ============================================================================
-- v.1.3.7 — "Yang kelihatan = yang boleh disimpan" untuk akun guru di Input Bulanan.
--
-- LAPORAN KYAI (31 Agu 2026): akun guru memunculkan PESAN GALAT (bukan daftar
--   kosong) saat menekan Simpan di Input Bulanan. Bunyinya berasal dari
--   services/db.js -> updateOne():
--     "Gagal menyimpan santri/<id>: tak ada baris yang berubah
--      (kemungkinan ditolak RLS / hak akses kurang)."
--
-- AKAR. Perbaikan sebelumnya di rilis yang sama melebarkan APA YANG TERLIHAT
--   (InputBulananView kini memakai utils/guruScope: ownsNgaji | ownsSekolah |
--   headsLembaga), tetapi TIDAK melebarkan APA YANG BOLEH DISIMPAN. Input Bulanan
--   menulis LANGSUNG ke tabel santri (updateOne('santri', …)), dan UPDATE-nya cuma
--   punya empat kebijakan:
--     santri_upd_manage   = auth_can_manage()      -> super_admin | admin
--     santri_upd_self     = profiles.santri_id = id
--     santri_upd_pengampu = auth_is_pengampu(data) -> guru_pagi | guru_sore | guru |
--                                                     guru_sekolah **berbentuk larik**
--     santri_upd_pj_ptpt  = auth_is_pj_ptpt(data)  -> label pj_ptpt
--   Dua celah yang tersisa, dan dua-duanya berakhir sebagai galat di layar guru:
--     1. KEPALA/PJ LEMBAGA. headsLembaga() membuat mereka melihat santri lembaganya;
--        auth_is_pengampu tak mengenal jabatan sama sekali.
--     2. `guru_sekolah` yang tersimpan sebagai TEKS TUNGGAL (baris lama). ownsSekolah()
--        menerimanya (`Array.isArray(...) ? ... : [x]`), auth_is_pengampu membuangnya
--        (`jsonb_typeof <> 'array'` -> '[]'). Ini murni bug: aturannya memang sama,
--        SQL-nya saja yang gagal pada data lama. Bentuk teks itu nyata — ia pula yang
--        menghilangkan santri dari Absensi Santri sebelum rilis ini.
--
-- KEPUTUSAN KYAI (31 Agu 2026, ditanyakan eksplisit): **lebarkan izin DB** supaya sama
--   dengan yang tampil di layar — bukan menyembunyikan lagi daftarnya dari kepala/PJ
--   lembaga. Pola yang diikuti sama persis dengan 20260804120000 (santri_upd_pj_ptpt):
--   kebijakan baru MENCERMINKAN gerbang UI yang menyetir tombolnya.
--
-- ⚠️ GRAIN = BARIS, bukan kolom — sama seperti seluruh kebijakan santri lain dan
--   sesuai keputusan Kyai di 20260719140100. Artinya kepala/PJ lembaga secara teknis
--   bisa menyunting field santri lembaganya yang LAIN (mis. lewat Kenaikan), bukan
--   cuma kolom Input Bulanan. Menutup itu butuh trigger BEFORE UPDATE per-kolom;
--   sengaja TIDAK dikerjakan sekarang. Kebijakan PERMISSIVE = OR, jadi migrasi ini
--   murni MENAMBAH hak — tak ada satu pun alur lama yang bisa jadi tertolak.
--
-- CERMIN JS: vue-app/src/utils/guruScope.js -> headsLembaga()
--            vue-app/src/composables/useLembaga.js -> lembagaScopeMatches()
--   Bila salah satu diubah, SINKRONKAN fungsi di bawah. Peta lembaga -> kelompok di
--   bawah dikunci tes `tests/unit/lembagaKelompokCermin.test.js`, jadi menambah/
--   mengubah LEMBAGA_GROUPS di JS akan MEMBUAT TES MERAH sampai file ini ikut disunting.
--
-- Migrasi ini TIDAK mengubah skema (tanpa tabel/kolom baru) dan tidak menyentuh satu
--   baris data pun.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1) auth_is_pengampu: terima `guru_sekolah` berbentuk TEKS, bukan hanya larik.
--    Cermin ownsSekolah() di utils/guruScope.js. Selain cabang baru itu, isinya
--    IDENTIK dengan versi 20260719120000 — tak ada hak lain yang bergeser.
-- ---------------------------------------------------------------------------
create or replace function public.auth_is_pengampu(p_data jsonb)
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(
    lower(public.auth_guru_nama()) in (
      lower(nullif(btrim(p_data->>'guru_pagi'), '')),
      lower(nullif(btrim(p_data->>'guru_sore'), '')),
      lower(nullif(btrim(p_data->>'guru'), ''))
    )
    or exists (
      select 1
      from jsonb_array_elements_text(
        case
          when jsonb_typeof(p_data->'guru_sekolah') = 'array' then p_data->'guru_sekolah'
          -- BARU: baris lama menyimpan satu nama sebagai string biasa.
          when jsonb_typeof(p_data->'guru_sekolah') = 'string'
               and btrim(coalesce(p_data->>'guru_sekolah', '')) <> ''
            then jsonb_build_array(p_data->>'guru_sekolah')
          else '[]'::jsonb
        end
      ) as gs(nama)
      where btrim(gs.nama) <> ''
        and lower(btrim(gs.nama)) = lower(public.auth_guru_nama())
    ),
    false
  )
$$;

-- ---------------------------------------------------------------------------
-- 2) auth_heads_lembaga(): guru yang login = KEPALA/PJ/PENGASUH lembaga ini?
--
--    Cermin headsLembaga() + lembagaScopeMatches(). Hanya DUA cabang yang bisa
--    bernilai benar di JS, dan hanya dua itu yang ditiru di sini:
--
--      (a) NAMA PERSIS. Jabatan 'Kepala <X>' / 'PJ <X>' / 'Pengasuh <X>' dengan
--          X = nama lembaga yang ditanyakan (tak peduli besar-kecil huruf).
--          Ini mencakup seluruh jabatan kanonik app: 'Kepala SDI', 'PJ PTPT',
--          'Kepala TK', 'Kepala PKBM', 'PJ PPPH', dst.
--
--      (b) LABEL KELOMPOK. X = 'qiraati' | 'sekolah' | 'mahad' | 'non-lembaga'
--          -> mengenai SEMUA lembaga di kelompok itu (mis. 'Kepala Sekolah'
--          menjangkau TK, SDI, PKBM).
--
--    Yang SENGAJA tidak ditiru: pencocokan se-FAMILY ('Kepala TPQ' -> 'TPQ Pagi').
--    Di JS cabang itu MATI karena headsLembaga() sudah me-lowercase nama lembaga
--    sebelum mencarinya di VARIANT_TO_GROUP yang kuncinya peka huruf besar
--    ('TPQ Pagi'), jadi getLembagaGroup('tpq') selalu null. Menghidupkannya di SQL
--    saja akan memberi hak yang TIDAK terlihat di layar — kebalikan dari tujuan
--    migrasi ini. Kalau kelak cabang itu diperbaiki di JS, tambahkan di sini juga.
--
--    Perbandingan memakai kesetaraan STRING (bukan regex ber-konkatenasi) supaya
--    nama lembaga yang mengandung karakter regex tak pernah bisa mengubah arti pola —
--    alasan yang sama dengan 20260722120000.
-- ---------------------------------------------------------------------------
create or replace function public.auth_heads_lembaga(p_lembaga text)
returns boolean language sql stable security definer set search_path = public as $$
  with target as (
    select lower(btrim(coalesce(p_lembaga, ''))) as nama
  ),
  -- Cermin LEMBAGA_GROUPS (vue-app/src/composables/useLembaga.js). Nama variant
  -- ditulis huruf kecil karena pembandingnya sudah di-lower.
  grup(nama, broad) as (
    values ('tpq pagi', 'qiraati'),
           ('tpq sore', 'qiraati'),
           ('pra ptpt', 'qiraati'),
           ('ptpt', 'qiraati'),
           ('ppph', 'qiraati'),
           ('tk', 'sekolah'),
           ('sdi', 'sekolah'),
           ('pkbm', 'sekolah'),
           ('ma''had', 'mahad'),
           ('yayasan', 'non-lembaga'),
           ('sarana prasarana', 'non-lembaga')
  ),
  jab as (
    -- Kedua field jabatan diperiksa TERPISAH — menggabungnya dengan spasi bisa
    -- memunculkan kecocokan palsu yang melintasi batas kedua field.
    select lower(btrim(regexp_replace(coalesce(g.jabatan, ''), '\s+', ' ', 'g'))) as j
    from public.profiles p join public.guru g on g.id = p.guru_id
    where p.id = auth.uid()
    union all
    select lower(btrim(regexp_replace(coalesce(g.jabatan_tambahan, ''), '\s+', ' ', 'g')))
    from public.profiles p join public.guru g on g.id = p.guru_id
    where p.id = auth.uid()
  ),
  suffix as (
    select substring(j from '^(?:kepala|pj|pengasuh)\s+(.+)$') as nama from jab
  )
  select (select nama from target) <> ''
     and exists (
       select 1
       from suffix s
       where s.nama is not null
         and (
           s.nama = (select nama from target)                                   -- (a)
           or (
             s.nama in ('qiraati', 'sekolah', 'mahad', 'non-lembaga')           -- (b)
             and s.nama = (select broad from grup where grup.nama = (select nama from target))
           )
         )
     )
$$;
grant execute on function public.auth_heads_lembaga(text) to authenticated;

-- ---------------------------------------------------------------------------
-- 3) Kebijakan: kepala/PJ lembaga boleh UPDATE santri lembaganya.
--    `lembaga` (ngaji) & `lembaga_sekolah` adalah KOLOM RIIL di tabel santri
--    (lihat peta COLS di services/db.js), bukan isi ekor jsonb — jadi dibaca
--    langsung, tidak lewat `data`.
--
--    WITH CHECK = predikat yang SAMA dengan USING (pola santri_upd_pengampu &
--    santri_upd_pj_ptpt): kepala lembaga tak bisa memindahkan santri ke lembaga
--    lain, sebab ia kehilangan hak atas baris hasilnya. Aman untuk Input Bulanan —
--    payload-nya hanya prestasi/kelas/juz/catatan_bulanan, tak pernah menyentuh
--    kolom lembaga. ⚠️ Kalau kelak ada alur kepala lembaga yang memang perlu
--    MEMINDAHKAN santri keluar, longgarkan WITH CHECK bersamaan dengan alur itu,
--    jangan setelah Kyai melapor.
-- ---------------------------------------------------------------------------
drop policy if exists santri_upd_kepala_lembaga on public.santri;
create policy santri_upd_kepala_lembaga on public.santri
  for update using (
    public.auth_heads_lembaga(lembaga) or public.auth_heads_lembaga(lembaga_sekolah)
  ) with check (
    public.auth_heads_lembaga(lembaga) or public.auth_heads_lembaga(lembaga_sekolah)
  );
