-- ============================================================================
-- Push multi-perangkat — satu akun boleh punya BANYAK token FCM.
--
-- Masalah (Kyai 21 Jul 2026, "di PWA/web saya ingin muncul notif juga"):
-- `save_push_token` menyimpan SATU `data.fcm_token`, jadi login di HP lalu di PWA
-- membuat token PWA MENIMPA token HP — hanya perangkat yang mendaftar terakhir
-- yang menerima push, yang lain diam tanpa jejak.
--
-- Sesudah migrasi ini:
--   data.fcm_tokens : jsonb array — SEMUA token yang masih hidup (urut lama->baru)
--   data.fcm_token  : token TERBARU yang masih hidup (dipertahankan supaya
--                     dispatch-push versi lama & filter `data->>fcm_token is not null`
--                     tetap benar; itu invarian yang dijaga fungsi ini & cleanup)
--
-- Dibatasi 10 token/akun supaya tak tumbuh tanpa batas (HP ganti, browser beda,
-- reinstall). Yang terbuang = yang paling lama.
-- ============================================================================

create or replace function public.save_push_token(p_coll text, p_id text, p_token text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tok text := nullif(btrim(coalesce(p_token, '')), '');
  v_tbl text;
  v_arr jsonb;
  v_max int := 10;
begin
  if auth.uid() is null then
    raise exception 'unauthenticated';
  end if;

  -- Nama tabel diinterpolasi ke SQL di bawah -> WAJIB lewat whitelist, bukan
  -- langsung dari argumen (p_coll datang dari klien).
  if p_coll = 'santri' then
    v_tbl := 'public.santri';
  elsif p_coll = 'guru' then
    v_tbl := 'public.guru';
  else
    raise exception 'invalid coll: %', p_coll;
  end if;

  -- Token kosong/null = cabut SEMUA perangkat akun ini (perilaku lama saat logout).
  if v_tok is null then
    execute format(
      'update %s set data = coalesce(data, ''{}''::jsonb)
         || jsonb_build_object(''fcm_token'', null, ''fcm_tokens'', ''[]''::jsonb,
                               ''fcm_token_at'', now()::text)
       where id = $1', v_tbl)
      using p_id;
    return;
  end if;

  execute format('select coalesce(data->''fcm_tokens'', ''[]''::jsonb) from %s where id = $1', v_tbl)
    into v_arr using p_id;

  -- Buang token yang sama (daftar-ulang perangkat lama), lalu taruh di paling belakang.
  select coalesce(jsonb_agg(x order by ord), '[]'::jsonb)
    into v_arr
  from jsonb_array_elements_text(coalesce(v_arr, '[]'::jsonb)) with ordinality as t(x, ord)
  where x is not null and x <> '' and x <> v_tok;

  v_arr := coalesce(v_arr, '[]'::jsonb) || to_jsonb(v_tok);

  -- Potong ke v_max TERBARU. Sub-query ambil ord terbesar, agregat luar
  -- mengembalikan urutan aslinya (lama -> baru).
  if jsonb_array_length(v_arr) > v_max then
    select coalesce(jsonb_agg(s.x order by s.ord), '[]'::jsonb)
      into v_arr
    from (
      select x, ord
      from jsonb_array_elements_text(v_arr) with ordinality as t(x, ord)
      order by ord desc
      limit v_max
    ) s;
  end if;

  execute format(
    'update %s set data = coalesce(data, ''{}''::jsonb)
       || jsonb_build_object(''fcm_token'', $2, ''fcm_tokens'', $3,
                             ''fcm_token_at'', now()::text)
     where id = $1', v_tbl)
    using p_id, v_tok, v_arr;
end $$;

revoke all on function public.save_push_token(text, text, text) from public, anon;
grant execute on function public.save_push_token(text, text, text) to authenticated;

-- ---- Backfill: token tunggal yang sudah ada masuk ke daftar -----------------
-- Tanpa ini perangkat yang terlanjur terdaftar hilang dari daftar baru.
update public.guru
set data = data || jsonb_build_object('fcm_tokens', jsonb_build_array(data->>'fcm_token'))
where nullif(btrim(coalesce(data->>'fcm_token', '')), '') is not null
  and (data->'fcm_tokens') is null;

update public.santri
set data = data || jsonb_build_object('fcm_tokens', jsonb_build_array(data->>'fcm_token'))
where nullif(btrim(coalesce(data->>'fcm_token', '')), '') is not null
  and (data->'fcm_tokens') is null;
