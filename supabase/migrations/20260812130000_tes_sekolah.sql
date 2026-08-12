-- ============================================================================
-- Tes Sekolah — materi sekolah yang perlu diuji oleh GURU TERTENTU, bukan kepala
-- sekolah. Nilainya TAK MASUK RAPOR: murni catatan di akun santri dan guru kelas
-- sekolahnya (preseden: tes_glondongan & ceremonial_ptpt yang juga di luar rapor).
--
-- Alurnya: wali kelas sekolah MENGAJUKAN santrinya -> guru penguji MENILAI antrean.
--   1 baris = 1 ajuan tes untuk (santri, materi).
--
-- MATERI-nya sendiri BUKAN tabel: ia baris master key='materi_tes' berbentuk
--   { items: [{ id, nama, aktif, lembaga_sekolah, kelas[], penguji[guru_id],
--               nilai_maks, nilai_min_lulus }] }
--   RLS master (Archetype A: baca publik, tulis auth_can_manage) sudah pas apa
--   adanya, jadi tak ada yang perlu ditambah untuk sisi master.
--
-- Pola HYBRID (lihat services/db.js): kolom riil = yang difilter/di-index/dipakai
--   RLS; sisanya -> `data` jsonb:
--   { nama_cache, kelas_sekolah, materi_nama_cache, pengaju_id, pengaju_nama,
--     penguji_nama, tgl_ajuan, tgl_hasil, nilai, lulus, catatan }
-- ============================================================================

create table if not exists public.tes_sekolah (
  id              text primary key,
  santri_id       text,
  materi_id       text,             -- -> master('materi_tes').value->'items'[].id
  lembaga_sekolah text,
  status          text,             -- 'diajukan' | 'selesai'
  penguji_id      text,             -- guru penilai (dipilih dari penguji materi)
  periode         text,             -- 'YYYY-MM' (rekap bulanan)
  data            jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists tes_sekolah_santri_idx  on public.tes_sekolah (santri_id);
create index if not exists tes_sekolah_penguji_idx on public.tes_sekolah (penguji_id, status);
create index if not exists tes_sekolah_materi_idx  on public.tes_sekolah (materi_id);
create index if not exists tes_sekolah_queue_idx   on public.tes_sekolah (lembaga_sekolah, status);
create index if not exists tes_sekolah_periode_idx on public.tes_sekolah (periode);

-- updated_at auto — trigger loop F2 hanya kena tabel lama, tabel baru pasang manual.
drop trigger if exists trg_set_updated_at on public.tes_sekolah;
create trigger trg_set_updated_at before update on public.tes_sekolah
  for each row execute function public.set_updated_at();

-- Grant ke role PostgREST (RLS tetap gerbang sebenarnya). Mirror grant F2.
grant all on public.tes_sekolah to anon, authenticated, service_role;

-- ---- Helper RLS -------------------------------------------------------------
-- Keduanya SECURITY DEFINER + search_path: fungsi ini membaca public.santri /
--   public.master dari DALAM policy, dan tanpa definer ia kena RLS tabel itu
--   sendiri -> hasilnya bisa "kosong diam-diam" tergantung peran pemanggil.
-- Keduanya CERMIN gerbang UI (utils/tesSekolah.js) supaya tak ada tombol yang
--   tampak lalu berbuah 403 — aturan rumah di 20260719140000_rls_helpers_ptpt.sql.

-- Guru yang login = WALI KELAS SEKOLAH santri ini?
--   Sengaja lebih sempit dari auth_is_pengampu (20260719120000) yang juga
--   menerima guru ngaji (guru_pagi/guru_sore/guru): tes ini urusan sekolah, dan
--   guru ngaji tak berhak mengajukan santri yang bukan kelas sekolahnya.
--   Bentuk lama `guru_sekolah` berupa STRING tunggal ikut diterima — persis
--   seperti ownsSekolah() di utils/guruScope.js.
create or replace function public.auth_is_wali_sekolah_santri(p_santri_id text)
returns boolean language sql stable security definer set search_path = public as $$
  select public.auth_guru_nama() is not null and exists (
    select 1
    from public.santri s
    cross join lateral jsonb_array_elements_text(
      case
        when jsonb_typeof(s.data->'guru_sekolah') = 'array'  then s.data->'guru_sekolah'
        when jsonb_typeof(s.data->'guru_sekolah') = 'string' then jsonb_build_array(s.data->'guru_sekolah')
        else '[]'::jsonb
      end
    ) as gs(nama)
    where s.id = p_santri_id
      and btrim(gs.nama) <> ''
      and lower(btrim(gs.nama)) = lower(public.auth_guru_nama())
  )
$$;

-- Guru yang login = penguji YANG DITUNJUK untuk materi ini?
--   Sumber: master (key='materi_tes') -> value->'items' -> item ber-id itu ->
--           penguji = [guruId, ...]. Pola sama dgn auth_is_koordinator_glondongan.
--   Tanpa penjaga ini, pengaju bisa menaruh dirinya sendiri di penguji_id lalu
--   menilai ajuannya sendiri — sebab kolom itu ditulis dari klien.
create or replace function public.auth_is_penguji_materi(p_materi_id text)
returns boolean language sql stable security definer set search_path = public as $$
  select public.auth_guru_id() is not null and exists (
    select 1
    from public.master m
    cross join lateral jsonb_array_elements(
      case when jsonb_typeof(m.value->'items') = 'array' then m.value->'items' else '[]'::jsonb end
    ) as it(obj)
    cross join lateral jsonb_array_elements_text(
      case when jsonb_typeof(it.obj->'penguji') = 'array' then it.obj->'penguji' else '[]'::jsonb end
    ) as g(guru_id)
    where m.key = 'materi_tes'
      and btrim(coalesce(it.obj->>'id', '')) = btrim(coalesce(p_materi_id, ''))
      and btrim(g.guru_id) = public.auth_guru_id()
  )
$$;

grant execute on function public.auth_is_wali_sekolah_santri(text) to authenticated;
grant execute on function public.auth_is_penguji_materi(text) to authenticated;

-- ---- RLS --------------------------------------------------------------------
alter table public.tes_sekolah enable row level security;

-- SELECT: staff melihat semua; wali/santri HANYA keluarganya sendiri.
--   Bentuknya sengaja sama dengan tabel per-santri lain di 20260706120000
--   (wali_pii_scope) — tanpa auth_owns_santri, catatan tes tak akan pernah
--   tampil di Capaian Prestasi milik santri yang bersangkutan.
drop policy if exists tes_sekolah_sel on public.tes_sekolah;
create policy tes_sekolah_sel on public.tes_sekolah
  for select using (public.auth_is_staff() or public.auth_owns_santri(santri_id));

-- INSERT: admin/super, atau wali kelas sekolah santri itu — dan HANYA sebagai
--   ajuan (status <> 'selesai'), supaya tak ada yang bisa menyisipkan hasil jadi.
drop policy if exists tes_sekolah_ins on public.tes_sekolah;
create policy tes_sekolah_ins on public.tes_sekolah
  for insert with check (
    public.auth_can_manage()
    or (
      coalesce(btrim(status), '') <> 'selesai'
      and public.auth_is_wali_sekolah_santri(santri_id)
    )
  );

-- UPDATE (= menilai): admin/super, atau guru yang BENAR-BENAR penguji materi itu
--   DAN tercatat sebagai penguji_id barisnya. Dua syarat, bukan satu: penguji_id
--   ditulis klien, jadi ia sendiri bukan bukti wewenang.
drop policy if exists tes_sekolah_upd on public.tes_sekolah;
create policy tes_sekolah_upd on public.tes_sekolah
  for update using (
    public.auth_can_manage()
    or (
      btrim(coalesce(penguji_id, '')) = public.auth_guru_id()
      and public.auth_is_penguji_materi(materi_id)
    )
  ) with check (
    public.auth_can_manage()
    or (
      btrim(coalesce(penguji_id, '')) = public.auth_guru_id()
      and public.auth_is_penguji_materi(materi_id)
    )
  );

drop policy if exists tes_sekolah_del on public.tes_sekolah;
create policy tes_sekolah_del on public.tes_sekolah
  for delete using (public.auth_is_super());

-- ---- Realtime (idempoten) — status flip tampil tanpa refresh ----------------
-- WAJIB cermin set REALTIME di services/db.js. Kalau salah satunya lupa, channel
-- tetap subscribe tapi DB tak pernah mengirim event: live-nya diam tanpa galat.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public'
      and tablename = 'tes_sekolah'
  ) then
    execute 'alter publication supabase_realtime add table public.tes_sekolah';
  end if;
end $$;
