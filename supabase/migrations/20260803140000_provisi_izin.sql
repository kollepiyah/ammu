-- ============================================================================
-- AUDIT AGU 2026 · K1-b tambalan — gerbang akun pengurus dipindah dari
-- app_metadata ke TABEL IZIN berumur pendek.
--
-- APA YANG TERJADI (terukur 3 Agu 2026, sesudah tombol "Buat akun yang belum
-- ada" dipakai): 534 akun berhasil dibuat, 3 GAGAL — dan ketiganya persis guru
-- BERPERAN (2 super_admin + 1 admin), yaitu satu-satunya kelompok yang disaring
-- gerbang K1-a di handle_new_user (20260803120000). Baris auth.users untuk
-- ketiganya TIDAK ada sesudahnya => insert-nya di-rollback oleh `raise` gerbang.
--
-- AKARNYA: gerbang itu memeriksa `new.raw_app_meta_data->>'ammu_provisioned'`,
-- yang dikirim Edge Function lewat Admin API `createUser({ app_metadata })`.
-- Ternyata GoTrue menuliskan app_metadata di LANGKAH TERPISAH sesudah INSERT:
-- baris akhirnya memang punya penanda itu (dibuktikan: 534 dari 534 akun hasil
-- sweep punya kunci `ammu_provisioned`), tetapi trigger yang berjalan PADA insert
-- belum melihatnya. Jadi jalur sah pun tertolak.
--
-- PERBAIKAN: penanda pindah ke tabel `akun_provisi_izin` yang ditulis Edge
-- Function (service-role) SEBELUM createUser dan dihapus sesudahnya. Trigger
-- membacanya — tak lagi bergantung pada urutan internal GoTrue.
--
-- Sifat keamanannya SAMA KUATNYA: tabel ini RLS-on TANPA satu pun policy dan
-- hak anon/authenticated dicabut, jadi hanya service-role (Edge Function) yang
-- bisa menyentuhnya. Klien tak punya jalan mengizinkan dirinya sendiri.
-- Ditambah batas umur 10 menit supaya baris yatim (fungsi mati di tengah jalan)
-- tak meninggalkan izin yang menganga.
--
-- `app_metadata.ammu_provisioned` TETAP dikirim, tapi kini perannya cuma PENANDA
-- AUDIT ("akun ini dibuat sistem, bukan lahir dari login pertama") — bukan
-- gerbang. Berguna: `select ... where raw_app_meta_data ? 'ammu_provisioned'`.
-- ============================================================================

create table if not exists public.akun_provisi_izin (
  email       text primary key,
  dibuat_pada timestamptz not null default now()
);
comment on table public.akun_provisi_izin is
  'Izin sesaat (10 menit) bagi Edge Function provision-akun untuk membuat akun BERPERAN. Server-only: RLS aktif tanpa policy.';

alter table public.akun_provisi_izin enable row level security;
-- Sengaja TANPA policy: service_role melewati RLS, peran lain tertutup penuh.
revoke all on table public.akun_provisi_izin from anon, authenticated;

-- Batas umur izin. Dipakai trigger; Edge Function juga menyapu baris kedaluwarsa.
create or replace function public._provisi_diizinkan(p_email text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.akun_provisi_izin z
    where z.email = p_email
      and z.dibuat_pada > now() - interval '10 minutes'
  )
$$;

-- ---- handle_new_user: gerbang K1-a memakai tabel izin -----------------------
-- Selain sumber penandanya, isinya IDENTIK dengan 20260803120000.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_key text := split_part(coalesce(new.email, ''), '@', 1);
  m record;
  v_rs text;
  v_role text;
  v_provisioned boolean := public._provisi_diizinkan(new.email);
begin
  select * into m from public._resolve_authkey(v_key) limit 1;

  -- K1-a: akun pengurus tak boleh lahir dari pendaftaran mandiri. Jalur sah =
  -- Edge Function provision-akun, yang mendaftarkan email-nya lebih dulu ke
  -- akun_provisi_izin (server-only) sehingga _provisi_diizinkan() = true.
  if not v_provisioned
     and (
       m.source = 'admin'
       or (m.source = 'guru' and m.role_sistem in ('super_admin', 'admin', 'admin_keuangan'))
     )
  then
    raise exception
      'akun pengurus tidak boleh dibuat lewat pendaftaran mandiri — minta super admin membuatkannya'
      using errcode = '42501';
  end if;

  if m.source = 'admin' then
    insert into public.profiles (id, login_key, role, role_sistem, supervisi)
    values (new.id, v_key, 'admin', 'super_admin', true)
    on conflict (id) do nothing;

  elsif m.source = 'guru' then
    v_rs := case m.role_sistem
              when 'super_admin' then 'super_admin'
              when 'admin' then 'admin'
              when 'admin_keuangan' then 'admin_keuangan'
              else 'guru'
            end;
    v_role := case when v_rs in ('admin', 'admin_keuangan', 'super_admin') then 'admin' else 'guru' end;
    insert into public.profiles (id, login_key, role, role_sistem, supervisi, guru_id)
    values (new.id, v_key, v_role, v_rs, coalesce(m.supervisi, false), m.ref_id)
    on conflict (id) do nothing;

  elsif m.source = 'santri' then
    insert into public.profiles (id, login_key, role, role_sistem, santri_id)
    values (new.id, v_key, 'santri', 'santri', m.ref_id)
    on conflict (id) do nothing;

  else
    -- tak match (mis. akun manual / Google belum tertaut) -> default santri tanpa
    -- tautan; buildSesi mengembalikan null sehingga sesi app tak terbentuk.
    insert into public.profiles (id, login_key, role, role_sistem)
    values (new.id, v_key, 'santri', 'santri')
    on conflict (id) do nothing;
  end if;

  return new;
end;
$$;
