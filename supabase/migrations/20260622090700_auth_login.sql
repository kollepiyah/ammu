-- ============================================================================
-- F5 · 07 AUTH LOGIN — resolve_login (RPC anon, pengganti Cloud Function
-- findUserByLogin) + handle_new_user disempurnakan (map peran dari guru/santri
-- by login_key saat lazy-create akun login pertama).
--
-- Alur (single-tenant, tanpa hashing/token sendiri):
--   1. Client kirim input (username/WA/NIS) -> resolve_login (SECURITY DEFINER,
--      baca guru/santri bypass RLS) balikin { source, auth_key, active } SAJA
--      (TANPA PII). auth_key = kanonik dari RECORD (bukan input) -> 1 email per
--      orang walau ketik username atau WA.
--   2. Client bangun email `<auth_key>@ammu.local`, signIn; bila belum ada ->
--      signUp (lazy-create) sandi default. Trigger handle_new_user mapping peran.
--   3. Client baca profiles (RLS: id=auth.uid()) + guru/santri (signedIn) -> sesi.
--
-- CATATAN APPLY (Dashboard Supabase): Auth > Providers > Email = AKTIF, dan
--   "Confirm email" = OFF (domain @ammu.local tak terkirim) supaya signUp auto-
--   confirm. Min password length default 6 -> sandi user dipad client jadi
--   'mu_auth_'+sandi (mirror Firebase).
-- ============================================================================

-- ---- util normalisasi (IMMUTABLE) -----------------------------------------
-- digits-only: samakan WA/NIS lintas format ketik ('0812-3456' = '08123456').
create or replace function public._digits(t text)
returns text language sql immutable as $$
  select regexp_replace(coalesce(t, ''), '[^0-9]', '', 'g')
$$;

-- lokal-part email: lowercase + buang selain [a-z0-9._-] (samakan dgn client
-- sanitizeAuthLocalPart di auth.js / authSupabase.js).
create or replace function public._norm_key(t text)
returns text language sql immutable as $$
  select regexp_replace(lower(coalesce(t, '')), '[^a-z0-9._-]', '', 'g')
$$;

-- ---- resolver inti (dipakai resolve_login + handle_new_user) ----------------
-- Terima input apa pun (username/WA/NIS, mentah atau kanonik) -> balikin match +
-- auth_key KANONIK. admin > guru > santri; limit 1. Guru/santri boleh login via
-- username/WA/NIS tapi SELALU dipetakan ke auth_key kanonik yang sama.
create or replace function public._resolve_authkey(p_input text)
returns table(source text, ref_id text, role_sistem text, supervisi boolean, active boolean, auth_key text)
language sql stable security definer set search_path = public as $$
  with k as (select public._norm_key(p_input) as key, public._digits(p_input) as dig)
  select * from (
    -- admin built-in (adminmu) -> super_admin
    select 'admin'::text, 'admin'::text, 'super_admin'::text, true, true, 'adminmu'::text
    from k where k.key in ('adminmu', 'admin')
    union all
    -- guru: cocok via username ATAU WA; kanonik = username (jika ada) else digits(wa)
    select 'guru', g.id, g.role_sistem,
           (lower(coalesce(g.jabatan, '')) ~ 'direktur|supervisor'
            or lower(coalesce(g.jabatan_tambahan, '')) ~ 'direktur|supervisor'),
           (g.status is distinct from 'Tidak Aktif'),
           coalesce(nullif(public._norm_key(g.username), ''), public._digits(g.wa))
    from public.guru g, k
    where nullif(public._norm_key(g.username), '') = k.key
       or (k.dig <> '' and public._digits(g.wa) = k.dig)
    union all
    -- santri: cocok via NIS ATAU WA wali; kanonik = NIS (jika ada) else digits(wa)
    select 'santri', s.id, 'santri', false,
           coalesce(s.aktif, true),
           coalesce(nullif(public._digits(s.nis), ''), public._digits(s.wa))
    from public.santri s, k
    where (k.dig <> '' and public._digits(s.nis) = k.dig)
       or (k.dig <> '' and public._digits(s.wa) = k.dig)
  ) t
  limit 1
$$;

-- ---- resolve_login: RPC anon yang dipanggil client SEBELUM auth ------------
-- Balikin HANYA { source, auth_key, active } (tanpa nama/PII). NULL = tak ketemu.
create or replace function public.resolve_login(p_input text)
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object('source', m.source, 'auth_key', m.auth_key, 'active', m.active)
  from public._resolve_authkey(p_input) m
$$;

-- anon WAJIB bisa panggil (dipakai di layar login sebelum sesi ada).
grant execute on function public.resolve_login(text) to anon, authenticated;
grant execute on function public._digits(text) to anon, authenticated;
grant execute on function public._norm_key(text) to anon, authenticated;

-- ---- handle_new_user (REPLACE file 05): mapping peran saat lazy-create ------
-- Email lokal-part = auth_key kanonik (dibangun client dari resolve_login) ->
-- _resolve_authkey balikin record yg sama -> set role/role_sistem/guru_id/
-- santri_id/supervisi. role_sistem dipetakan ke kosakata helper RLS:
--   guru.role_sistem 'user'/'guru_biasa' -> 'guru' (supaya auth_can_akademik lolos);
--   'admin'/'admin_keuangan'/'super_admin' tetap; santri -> 'santri'; default santri.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_key text := split_part(coalesce(new.email, ''), '@', 1);
  m record;
  v_rs text;
  v_role text;
begin
  select * into m from public._resolve_authkey(v_key) limit 1;

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
    -- tak match (mis. akun manual) -> default santri (boleh disempurnakan admin)
    insert into public.profiles (id, login_key, role, role_sistem)
    values (new.id, v_key, 'santri', 'santri')
    on conflict (id) do nothing;
  end if;

  return new;
end;
$$;
