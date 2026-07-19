-- ============================================================================
-- v.1.1.9 — Kunci hak akses `ceremonial_ptpt` sampai level DATABASE.
--
-- SEBELUM (Archetype B, 20260719130000):
--   select = siapa pun yang login; insert/update = SEMUA guru.
--   Gerbang penjadwal hanya di UI (useCeremonial.canKelola).
--
-- SESUDAH (keputusan Kyai 19 Jul):
--   baca      : auth_is_staff() — santri & wali tertolak. Tak ada halaman
--               santri/wali yang membaca tabel ini (sudah ditelusuri).
--   buat/ubah : super_admin, PJ PTPT, atau koordinator glondongan — cermin
--               PERSIS canKelola di useCeremonial.js.
--   hapus     : tetap auth_is_super() — cermin tombol hapus (v-if="isSuper").
--
-- CATATAN: admin biasa (role_sistem='admin', bukan super) TIDAK diberi hak
--   tulis — memang tak pernah punya tombolnya di UI (canKelola tak memuat
--   admin). Menunya tetap terlihat & terbaca, hanya view-only.
--
-- Aturan "guru hanya melihat sesi yang memuat santri ampuannya" TETAP di UI
--   (CeremonialView.sesiTampil) — keputusan Kyai. Menegakkannya di DB berarti
--   memindai array data->'peserta' lawan santri ampuan: mahal (tak ter-indeks)
--   dan kaitannya berbasis NAMA guru, jadi ganti nama = sesi hilang senyap.
-- ============================================================================

-- ---- baca: staf saja ---------------------------------------------------------
drop policy if exists ceremonial_ptpt_sel on public.ceremonial_ptpt;
create policy ceremonial_ptpt_sel on public.ceremonial_ptpt
  for select using (public.auth_is_staff());

-- ---- buat --------------------------------------------------------------------
drop policy if exists ceremonial_ptpt_ins on public.ceremonial_ptpt;
create policy ceremonial_ptpt_ins on public.ceremonial_ptpt
  for insert with check (
    public.auth_is_super()
    or public.auth_is_pj_lembaga('PTPT')
    or public.auth_is_koordinator_glondongan()
  );

-- ---- ubah --------------------------------------------------------------------
drop policy if exists ceremonial_ptpt_upd on public.ceremonial_ptpt;
create policy ceremonial_ptpt_upd on public.ceremonial_ptpt
  for update using (
    public.auth_is_super()
    or public.auth_is_pj_lembaga('PTPT')
    or public.auth_is_koordinator_glondongan()
  ) with check (
    public.auth_is_super()
    or public.auth_is_pj_lembaga('PTPT')
    or public.auth_is_koordinator_glondongan()
  );

-- ceremonial_ptpt_del (auth_is_super) sengaja TIDAK disentuh.
