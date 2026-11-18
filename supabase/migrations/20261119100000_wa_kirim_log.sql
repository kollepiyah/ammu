-- v.1.5.1 (Kyai 19 Nov 2026): pengingat WA jadwal piket Pondok Laju lewat Fonnte, dikirim
-- begitu admin menyimpan jadwal (edge function kirim-wa-jadwal).
--
-- 1. wa_kirim_log — satu baris per penugasan yang sudah diberitahukan
--    (id = 'laju|<jadwal_id>|<guru_id>', lihat kirim-wa-jadwal/pesan.ts kunciLog). Menyimpan
--    ulang jadwal yang sama tak membuat pesan dobel; status 'gagal' boleh dicoba lagi.
--    HANYA service role (edge function) yang menulis & membaca — tanpa policy untuk klien.
-- 2. auth_boleh_susun_jadwal_laju() — siapa boleh memicu pengiriman: SAMA dengan policy
--    INSERT pondok_laju_jadwal (admin/super, PJ PTPT, Admin Pondok Laju).

create table if not exists public.wa_kirim_log (
  id          text primary key,
  jenis       text not null default 'jadwal_laju',
  ref_id      text,
  guru_id     text,
  nomor       text,
  status      text not null default 'terkirim', -- 'terkirim' | 'gagal'
  detail      text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists wa_kirim_log_guru_idx on public.wa_kirim_log (guru_id);

drop trigger if exists trg_set_updated_at on public.wa_kirim_log;
create trigger trg_set_updated_at before update on public.wa_kirim_log
  for each row execute function public.set_updated_at();

alter table public.wa_kirim_log enable row level security;
revoke all on public.wa_kirim_log from anon, authenticated;
grant all on public.wa_kirim_log to service_role;

create or replace function public.auth_boleh_susun_jadwal_laju()
returns boolean language sql stable security definer set search_path = public as $$
  select public.auth_can_manage()
      or public.auth_is_pj_lembaga('PTPT')
      or public.auth_is_admin_pondok_laju()
$$;
revoke all on function public.auth_boleh_susun_jadwal_laju() from public, anon;
grant execute on function public.auth_boleh_susun_jadwal_laju() to authenticated;
