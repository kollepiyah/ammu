-- RPC save_push_token — simpan FCM token ke `data` jsonb santri/guru.
-- Pengganti mergeOne (upsert) yang DITOLAK RLS untuk santri/wali:
--   - arm INSERT: santri_ins/guru_ins = auth_can_manage() → santri bukan manager
--   - arm UPDATE: santri_upd_self = (profile.santri_id = santri.id) → GAGAL utk anak
--     yang di-switch wali (profil wali terikat anak pertama, target = anak lain)
-- SECURITY DEFINER + KOLOM-SCOPED (hanya fcm_token/fcm_token_at) → aman dari abuse.

create or replace function public.save_push_token(p_coll text, p_id text, p_token text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'unauthenticated';
  end if;
  if p_coll = 'santri' then
    update public.santri
      set data = coalesce(data, '{}'::jsonb)
        || jsonb_build_object('fcm_token', p_token, 'fcm_token_at', now()::text)
      where id = p_id;
  elsif p_coll = 'guru' then
    update public.guru
      set data = coalesce(data, '{}'::jsonb)
        || jsonb_build_object('fcm_token', p_token, 'fcm_token_at', now()::text)
      where id = p_id;
  else
    raise exception 'invalid coll: %', p_coll;
  end if;
end $$;

revoke all on function public.save_push_token(text, text, text) from public, anon;
grant execute on function public.save_push_token(text, text, text) to authenticated;
