-- ============================================================================
-- F2 · 06 GRANTS + updated_at triggers + REALTIME publication.
-- ============================================================================

-- Grants ke role PostgREST (RLS tetap gerbang sebenarnya). service_role bypass RLS.
grant usage on schema public to anon, authenticated;
grant all on all tables in schema public to anon, authenticated, service_role;

-- Pasang trigger set_updated_at ke SEMUA tabel ber-kolom updated_at.
do $$
declare r record;
begin
  for r in
    select table_name from information_schema.columns
    where table_schema = 'public' and column_name = 'updated_at'
  loop
    execute format('drop trigger if exists trg_set_updated_at on public.%I', r.table_name);
    execute format('create trigger trg_set_updated_at before update on public.%I for each row execute function public.set_updated_at()', r.table_name);
  end loop;
end $$;

-- ---- REALTIME — HANYA whitelist (keputusan final): notifikasi, angka dashboard,
-- pengumuman/posts, rekap prestasi, kenaikan. Layar lain = fetch-on-open (no channel).
-- Publication `supabase_realtime` sudah ada bawaan Supabase; tambah tabel whitelist.
-- (Bisa di-ALTER lagi di F6 saat useNotifications difinalkan.)
alter publication supabase_realtime add table
  public.beranda_post,
  public.posts,
  public.post_reactions,
  public.rekap_prestasi,
  public.riwayat_prestasi,
  public.notif_prestasi,
  public.riwayat_kenaikan,
  public.tes_kenaikan,
  public.user_notif_state,
  public.kritik_saran,
  public.supervisi_catatan,
  public.absensi_guru,
  public.keuangan_buku_induk;
