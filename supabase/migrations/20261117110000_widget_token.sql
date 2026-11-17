-- ============================================================================
-- v.1.5.0 — Token widget per perangkat (Kyai, 17 Nov 2026).
--
-- Widget "Tugas Saya" di layar utama Android hanya segar saat aplikasi dibuka. Kyai minta
-- widget bisa MENARIK SENDIRI secara berkala, supaya jadwal yang berubah sesudah app
-- terakhir dibuka tetap terlihat.
--
-- Widget Android tak punya sesi Supabase: ia bukan WebView, dan menaruh refresh token
-- aslinya di sisi Java berarti menaruh kunci SELURUH akun di perangkat. Maka dipakai token
-- SEMPIT: satu string acak per perangkat yang hanya bisa menukar dirinya dengan DAFTAR
-- TUGAS satu guru — tak bisa membaca apa pun yang lain, tak bisa menulis.
--
-- Karena itu tabel ini TERTUTUP RAPAT: tak ada satu pun kebijakan RLS untuk anon maupun
-- authenticated. Yang boleh menyentuhnya hanya edge function `widget-tugas` lewat service
-- role (service role melewati RLS). Jadi walau tokennya bocor, yang bisa dibaca hanya judul
-- tugas satu guru — bukan data santri, bukan keuangan — dan tokennya bisa dicabut.
--
-- Idempoten: aman dijalankan ulang.
-- ============================================================================

create table if not exists public.widget_token (
  token              text primary key,      -- acak 32 byte (hex) dibuat di aplikasi
  guru_id            text not null,
  perangkat          text,                  -- keterangan ringkas, untuk Kyai mencabut yang asing
  dibuat_at          timestamptz not null default now(),
  dipakai_terakhir   timestamptz
);

create index if not exists widget_token_guru_idx on public.widget_token (guru_id);

-- RLS menyala TANPA kebijakan apa pun = tertutup untuk semua klien. Ini disengaja;
-- jangan menambahkan policy select di sini "supaya gampang diuji".
alter table public.widget_token enable row level security;

-- Penerbitan token dilakukan aplikasi (sudah login) lewat RPC ini, bukan INSERT langsung —
-- supaya guru hanya bisa menerbitkan token untuk DIRINYA SENDIRI, tak bisa untuk orang lain.
create or replace function public.terbitkan_widget_token(p_token text, p_perangkat text default '')
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_guru_id text;
begin
  -- Guru pemilik sesi ini. Tak ada guru = tak ada token.
  select p.guru_id into v_guru_id
  from public.profiles p
  where p.id = auth.uid();

  if v_guru_id is null or btrim(v_guru_id) = '' then
    raise exception 'hanya guru yang bisa menerbitkan token widget';
  end if;

  if p_token is null or length(p_token) < 32 then
    raise exception 'token terlalu pendek';
  end if;

  -- Satu perangkat satu baris; menerbitkan ulang token yang sama tak melahirkan duplikat.
  insert into public.widget_token (token, guru_id, perangkat)
  values (p_token, v_guru_id, coalesce(p_perangkat, ''))
  on conflict (token) do update
    set guru_id = excluded.guru_id,
        perangkat = excluded.perangkat;
end;
$$;

revoke all on function public.terbitkan_widget_token(text, text) from public;
grant execute on function public.terbitkan_widget_token(text, text) to authenticated;

-- Mencabut token miliknya sendiri (dipakai saat logout).
create or replace function public.cabut_widget_token(p_token text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_guru_id text;
begin
  select p.guru_id into v_guru_id from public.profiles p where p.id = auth.uid();
  if v_guru_id is null then
    return;
  end if;
  delete from public.widget_token where token = p_token and guru_id = v_guru_id;
end;
$$;

revoke all on function public.cabut_widget_token(text) from public;
grant execute on function public.cabut_widget_token(text) to authenticated;
