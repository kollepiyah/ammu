-- ============================================================================
-- v.1.2.2 — Perketat auth_is_pj_lembaga(): jabatan WAJIB menyebut lembaganya.
--
-- LAPORAN KYAI (22 Jul 2026): "ada 1 guru yg bukan PJ tapi di peran glondongan
--   terdeteksi PJ". Terbukti di data: guru berjabatan **'Kepala SDI'** dengan
--   field `lembaga = 'PTPT'` (ia kepala SDI yang juga mengajar di PTPT) ikut
--   lolos sebagai PJ PTPT.
--
-- SEBELUM (20260719140000): cukup ADA KATA 'kepala|pj|pengasuh' di jabatan/
--   jabatan_tambahan + field lembaga cocok. Yang ikut lolos secara salah:
--   'Kepala SDI', 'Kepala TK', 'Kepala TPQ', 'PJ PPPH', 'PJ Administrasi',
--   'Pengasuh' — semuanya kepala/PJ lembaga LAIN atau tanpa lembaga sama sekali.
--
-- SESUDAH: jabatan (atau jabatan_tambahan) harus PERSIS 'PJ <lembaga>' atau
--   'Kepala <lembaga>'. Gerbang lama (field g.lembaga = p_lembaga) DIPERTAHANKAN,
--   jadi aturan ini murni MEMPERSEMPIT — mustahil memberi hak baru ke siapa pun.
--
-- Cermin JS: vue-app/src/utils/glondongan.js -> isPjLembaga()
--   (dipakai useGlondongan/useCeremonial/useSantri/GlondonganView). Bila salah
--   satu diubah, SINKRONKAN keduanya.
--
-- DAMPAK TERUKUR pada data saat migrasi ditulis (auth_is_pj_lembaga hanya pernah
--   dipanggil dengan 'PTPT' — tes_glondongan & ceremonial_ptpt):
--     TETAP PJ PTPT : 'PJ PTPT' @PTPT  (2 guru)
--     TIDAK LAGI    : 'Kepala SDI' @PTPT  (1 guru)  <- persis yang dilaporkan
--   Tak ada PJ sah yang kehilangan akses.
--
-- Perbandingan pakai kesetaraan STRING (bukan regex ber-konkatenasi) supaya nama
--   lembaga yang mengandung karakter regex tak pernah bisa mengubah arti pola.
--   `regexp_replace(...,'\s+',' ','g')` menyeragamkan spasi ganda.
-- ============================================================================

create or replace function public.auth_is_pj_lembaga(p_lembaga text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.profiles p
    join public.guru g on g.id = p.guru_id
    where p.id = auth.uid()
      and upper(btrim(coalesce(g.lembaga, ''))) = upper(btrim(coalesce(p_lembaga, '')))
      and (
        lower(btrim(regexp_replace(coalesce(g.jabatan, ''), '\s+', ' ', 'g'))) in (
          'pj ' || lower(btrim(coalesce(p_lembaga, ''))),
          'kepala ' || lower(btrim(coalesce(p_lembaga, '')))
        )
        or lower(btrim(regexp_replace(coalesce(g.jabatan_tambahan, ''), '\s+', ' ', 'g'))) in (
          'pj ' || lower(btrim(coalesce(p_lembaga, ''))),
          'kepala ' || lower(btrim(coalesce(p_lembaga, '')))
        )
      )
  )
$$;
