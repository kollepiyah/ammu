-- ============================================================================
-- v.1.2.6 — PJ PTPT boleh MELULUSKAN santri ampuannya (menu Tes Kenaikan).
--
-- LAPORAN KYAI (4 Agu 2026): "akun PJ PTPT tidak bisa memproses kelulusan santri
--   tes", galatnya menyebut RLS menolak.
--
-- AKAR (bukan tes_kenaikan-nya). Yang gagal langkah PERTAMA tombol LULUS:
--   TesKenaikanView.submitLulus -> promosiKenaikan.writeKenaikan
--     -> updateOne('santri', …)   <- DI SINI 403 / 0 baris
--   `putuskan()` (menulis tes_kenaikan) baru dipanggil SESUDAHNYA, dan itu memang
--   lolos karena tes_kenaikan_upd = auth_can_akademik() yang mencakup 'guru'.
--   Itu sebabnya Tolak/Belum Lulus tetap jalan — hanya LULUS yang mati.
--
--   UPDATE public.santri cuma punya tiga kebijakan:
--     santri_upd_manage   = auth_can_manage()          -> super_admin|admin
--     santri_upd_self     = profiles.santri_id = id     -> santri ybs
--     santri_upd_pengampu = auth_is_pengampu(data)      -> guru_pagi | guru_sore |
--                                                          guru | guru_sekolah[]
--   Sementara hak PJ di UI diturunkan dari field LAIN: `santri.data->>'pj_ptpt'`
--   (utils/glondongan.js -> buatScopePj, dipakai useTesKenaikan.inScope). Relasi
--   itu tak pernah dilihat auth_is_pengampu, jadi tombolnya tampak tapi DB menolak.
--
-- CERMIN GERBANG UI — sengaja memakai penyaring UI yang MENYETIR tombol ini, yaitu
--   `isKepalaLembaga()` (utils/roleScope.js: kata kepala|pj|pengasuh di jabatan ATAU
--   jabatan_tambahan) + nama = `santri.pj_ptpt`. BUKAN auth_is_pj_lembaga() yang
--   ketat ('PJ PTPT' persis, 20260722120000): kalau memakai yang ketat, jabatan
--   seperti 'PJ PTPT Putri' akan melihat tombolnya lalu kena 403 — kelas bug yang
--   justru dihindari 20260719140000. Kalau gerbang UI-nya diperketat kelak,
--   SINKRONKAN fungsi di bawah.
--
-- LINGKUP: hanya santri yang label `pj_ptpt`-nya = nama guru yang login. Tak ada
--   hak baru untuk siapa pun di luar itu; kebijakan lain tak disentuh (policy
--   PERMISSIVE = OR). Kaitannya berbasis NAMA (skema lama, sama seperti
--   auth_is_pengampu) — kalau nama guru diganti, hak putus sampai label di baris
--   santri ikut diperbarui.
--
-- WITH CHECK = predikat yang SAMA dengan USING (pola santri_upd_pengampu), jadi PJ
--   tak bisa mengalihkan santri ke PJ lain: dia kehilangan hak begitu labelnya
--   diganti. Aman untuk alur nyata karena writeKenaikan hanya MENULIS `pj_ptpt`
--   bila nilainya tak kosong (promosiKenaikan.js: `if (String(opts.pj_ptpt ?? '')
--   .trim()) payload.pj_ptpt = …`) — jadi saat santri lulus KELUAR dari PTPT,
--   kuncinya tetap ada dan tulisannya lolos. ⚠️ Kalau kelak payload dibuat
--   mengosongkan `pj_ptpt`, tulisan itu akan ditolak di sini — longgarkan WITH
--   CHECK bersamaan dengan perubahan itu, jangan setelah Kyai melapor.
--
-- Migrasi ini TIDAK mengubah skema (tanpa tabel/kolom baru) dan tidak menyentuh
--   satu baris data pun.
-- ============================================================================

-- Guru yang login = PJ PTPT untuk santri dengan `data` ini?
--   Dua syarat, cermin gerbang UI:
--     1. jabatan/jabatan_tambahan mengandung kata kepala|pj|pengasuh (isKepalaLembaga)
--     2. nama guru = data->>'pj_ptpt' (buatScopePj)
--   Normalisasi nama = cermin _normNama() di utils/glondongan.js:
--   trim + lowercase + rapatkan spasi ganda.
create or replace function public.auth_is_pj_ptpt(p_data jsonb)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.profiles p
    join public.guru g on g.id = p.guru_id
    where p.id = auth.uid()
      and (
        lower(btrim(regexp_replace(coalesce(g.jabatan, ''), '\s+', ' ', 'g')))
          ~ '(^|\s)(kepala|pj|pengasuh)(\s|$)'
        or lower(btrim(regexp_replace(coalesce(g.jabatan_tambahan, ''), '\s+', ' ', 'g')))
          ~ '(^|\s)(kepala|pj|pengasuh)(\s|$)'
      )
      and lower(btrim(regexp_replace(coalesce(g.nama, ''), '\s+', ' ', 'g'))) <> ''
      and lower(btrim(regexp_replace(coalesce(g.nama, ''), '\s+', ' ', 'g')))
          = lower(btrim(regexp_replace(coalesce(p_data->>'pj_ptpt', ''), '\s+', ' ', 'g')))
  )
$$;

drop policy if exists santri_upd_pj_ptpt on public.santri;
create policy santri_upd_pj_ptpt on public.santri
  for update using (public.auth_is_pj_ptpt(data))
  with check (public.auth_is_pj_ptpt(data));
