-- ============================================================================
-- v.1.1.9 — Kunci hak akses `tes_glondongan` sampai level DATABASE.
--
-- SEBELUM (Archetype B, 20260701100000):
--   select = siapa pun yang login (termasuk santri & wali)
--   insert/update = auth_can_akademik() = super_admin | admin | SEMUA guru
--   -> guru mana pun bisa menugaskan DIRINYA sendiri ke blok 'menunggu' lewat
--      REST/URL langsung lalu mengklaim bisyaroh glondongan. Gerbangnya selama
--      ini hanya di UI (useGlondongan.canAssign).
--
-- SESUDAH (keputusan Kyai 19 Jul):
--   baca  : auth_is_staff() — super_admin | admin | admin_keuangan | guru.
--           admin_keuangan WAJIB ikut: BisyarohView menghitung bisyaroh
--           glondongan dari SELURUH baris (auth_can_akademik TIDAK memuatnya).
--   buat  : admin/super, ATAU PJ PTPT / koordinator / pengampu santri baris itu.
--           Guru kelas HARUS tetap bisa: spawnGlondongan() dipanggil saat guru
--           mengajukan tes kenaikan (useTesKenaikan.ajukanBatch). Syarat
--           status <> 'selesai' menutup jalan pintas "buat baris selesai
--           ber-penguji diri sendiri" utk memancing bisyaroh; baris 'berjalan'
--           yang lahir sbg 'ditugaskan' ke guru kelas sendiri tetap sah.
--   ubah  : super, PJ PTPT, koordinator KATEGORI baris itu (mahad/nonmahad),
--           atau penguji yang memang terpasang di baris ini DAN dia guru PTPT
--           (keputusan Kyai: penguji glondongan hanya guru PTPT).
--   hapus : tetap auth_is_super() — tak disentuh (sudah benar & cermin canCrud).
--
-- GRAIN = BARIS, bukan kolom (keputusan Kyai). Artinya koordinator secara
--   teknis masih bisa mengisi kolom nilai, dan penguji masih bisa mengubah
--   penguji_id barisnya sendiri. Menutup itu butuh trigger BEFORE UPDATE —
--   sengaja TIDAK dikerjakan sekarang.
--
-- Kategori koordinator dibaca dari data->>'mukim' (bool JSON, ditulis
--   useTesKenaikan._buildGlondonganRows sbg `mukim: !!s.is_mukim`) — cermin
--   kategoriMukim() di utils/glondongan.js.
-- ============================================================================

-- ---- baca: staf saja (santri & wali tertolak) --------------------------------
drop policy if exists tes_glondongan_sel on public.tes_glondongan;
create policy tes_glondongan_sel on public.tes_glondongan
  for select using (public.auth_is_staff());

-- ---- buat --------------------------------------------------------------------
drop policy if exists tes_glondongan_ins on public.tes_glondongan;
create policy tes_glondongan_ins on public.tes_glondongan
  for insert with check (
    public.auth_can_manage()
    or (
      coalesce(btrim(status), '') <> 'selesai'
      and (
        public.auth_is_pj_lembaga('PTPT')
        or public.auth_is_koordinator_glondongan()
        or public.auth_is_pengampu_santri(santri_id)
      )
    )
  );

-- ---- ubah --------------------------------------------------------------------
drop policy if exists tes_glondongan_upd on public.tes_glondongan;
create policy tes_glondongan_upd on public.tes_glondongan
  for update using (
    public.auth_is_super()
    or public.auth_is_pj_lembaga('PTPT')
    or public.auth_is_koordinator_glondongan(
         case when data->>'mukim' in ('true', 't', '1') then 'mahad' else 'nonmahad' end
       )
    or (
      nullif(btrim(penguji_id), '') is not null
      and btrim(penguji_id) = public.auth_guru_id()
      and public.auth_guru_di_lembaga('PTPT')
    )
  ) with check (
    public.auth_is_super()
    or public.auth_is_pj_lembaga('PTPT')
    or public.auth_is_koordinator_glondongan(
         case when data->>'mukim' in ('true', 't', '1') then 'mahad' else 'nonmahad' end
       )
    or (
      nullif(btrim(penguji_id), '') is not null
      and btrim(penguji_id) = public.auth_guru_id()
      and public.auth_guru_di_lembaga('PTPT')
    )
  );

-- tes_glondongan_del (auth_is_super) sengaja TIDAK disentuh.
