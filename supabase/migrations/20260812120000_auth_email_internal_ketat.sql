-- ============================================================================
-- KEAMANAN — pencocokan identitas di handle_new_user DIBATASI ke email internal.
--
-- CELAHNYA (ditemukan 12 Agu 2026 saat menelusuri "login Google gagal"):
--   handle_new_user mengambil LOCAL-PART email lalu mencocokkannya lewat
--   _resolve_authkey ke guru.username / digits(guru.wa) / santri.nis /
--   digits(santri.wa). Untuk akun internal itu benar — emailnya memang dibuat
--   sendiri oleh sistem sebagai `<auth_key>@ammu.local`.
--
--   Tapi pada login Google, local-part itu DIKENDALIKAN PENYERANG. Siapa pun
--   yang bisa mendaftarkan `<username-guru>@gmail.com` lalu menekan "Login
--   dengan Google" akan LANGSUNG mendapat baris profiles ber-guru_id milik guru
--   tersebut (cabang 'guru') — pengambilalihan akun, tanpa perlu tahu sandinya.
--   Nomor WA juga jadi kunci: local-part berisi digit yang sama dengan guru.wa
--   atau santri.nis/wa ikut cocok.
--
--   Untuk guru berperan (super_admin/admin/admin_keuangan) akibatnya beda tapi
--   sama buruknya: gerbang K1-a memanggil `raise`, sehingga GoTrue membalas
--   500 "Database error saving new user" dan OAuth gagal keras.
--
-- PERBAIKAN: pencocokan hanya berjalan bila emailnya berdomain @ammu.local.
--   Email luar (Google dst) melewati _resolve_authkey dengan kunci NULL, yang
--   tak pernah cocok apa pun, sehingga selalu mendarat di cabang `else` =
--   profil TANPA tautan. Menautkan Google tetap bisa, tapi HANYA lewat
--   supabase.auth.linkIdentity() dari halaman Profil oleh pemilik akun yang
--   sudah login — jalur yang memang sudah dipakai app.
--
--   `_resolve_authkey(null)` memang mengembalikan nol baris: _norm_key(null) dan
--   _digits(null) sama-sama '' sehingga cabang admin ('' tak ada di daftar),
--   guru (nullif(username,'') = '' tak pernah true; k.dig <> '' false), dan
--   santri (dua-duanya menuntut k.dig <> '') semuanya gugur. SELECT INTO tanpa
--   baris mengisi `m` dengan NULL — bukan galat "record not assigned".
--
-- login_key UNTUK EMAIL LUAR = alamat email penuh, bukan local-part.
--   profiles.login_key punya batasan UNIQUE (20260622090500_profiles_rls.sql:9).
--   Kalau local-part yang ditulis, akun Google `ahmad@gmail.com` akan bentrok
--   dengan login_key 'ahmad' milik guru dan INSERT-nya gagal -> trigger meledak
--   -> OAuth balas 500. Alamat penuh dijamin unik (auth.users.email unik) dan
--   tak mungkin bentrok dengan login_key internal, sebab username/WA/NIS tak
--   pernah memuat '@'.
--
-- Selain dua hal itu, isi fungsinya IDENTIK dengan 20260803140000_provisi_izin.
-- Jalur login biasa (username/WA/NIS -> <key>@ammu.local) TIDAK tersentuh.
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_internal boolean := lower(coalesce(new.email, '')) like '%@ammu.local';
  v_local text := split_part(coalesce(new.email, ''), '@', 1);
  -- Kunci pencocokan: local-part HANYA untuk email internal, selain itu NULL.
  v_key text := case when v_internal then v_local else null end;
  -- Nilai yang disimpan di profiles.login_key (lihat catatan UNIQUE di atas).
  v_login_key text := case when v_internal then v_local else lower(nullif(btrim(new.email), '')) end;
  m record;
  v_rs text;
  v_role text;
  v_provisioned boolean := public._provisi_diizinkan(new.email);
begin
  select * into m from public._resolve_authkey(v_key) limit 1;

  -- K1-a: akun pengurus tak boleh lahir dari pendaftaran mandiri. Jalur sah =
  -- Edge Function provision-akun, yang mendaftarkan email-nya lebih dulu ke
  -- akun_provisi_izin (server-only) sehingga _provisi_diizinkan() = true.
  -- Untuk email luar m.* selalu NULL, jadi gerbang ini tak pernah kena — dan
  -- memang tak perlu: email luar tak bisa lagi memetakan diri ke akun pengurus.
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
    values (new.id, v_login_key, 'admin', 'super_admin', true)
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
    values (new.id, v_login_key, v_role, v_rs, coalesce(m.supervisi, false), m.ref_id)
    on conflict (id) do nothing;

  elsif m.source = 'santri' then
    insert into public.profiles (id, login_key, role, role_sistem, santri_id)
    values (new.id, v_login_key, 'santri', 'santri', m.ref_id)
    on conflict (id) do nothing;

  else
    -- Tak match: akun manual, ATAU email luar (Google) yang belum tertaut.
    -- Profil dibuat tanpa tautan -> buildSesi() mengembalikan null sehingga sesi
    -- app tak terbentuk. Penautan dilakukan pemilik akun dari Profil › Pengaturan
    -- (supabase.auth.linkIdentity), bukan ditebak dari alamat emailnya.
    insert into public.profiles (id, login_key, role, role_sistem)
    values (new.id, v_login_key, 'santri', 'santri')
    on conflict (id) do nothing;
  end if;

  return new;
end;
$$;

-- ---- PEMERIKSAAN SUSULAN (jalankan manual, migrasi ini sengaja tak mengubah data) ----
-- Migrasi ini menutup celahnya ke depan, tapi TIDAK membatalkan tautan yang
-- terlanjur terbentuk sebelum hari ini. Jalankan ini di SQL Editor untuk melihat
-- apakah ada akun ber-email LUAR yang sudah terlanjur tertaut ke guru/santri:
--
--   select p.id, u.email, p.login_key, p.role_sistem, p.guru_id, p.santri_id
--   from public.profiles p
--   join auth.users u on u.id = p.id
--   where lower(coalesce(u.email,'')) not like '%@ammu.local'
--     and (p.guru_id is not null or p.santri_id is not null);
--
-- Penautan yang SAH tidak akan muncul di situ: linkIdentity() hanya menambah
-- baris di auth.identities dan membiarkan auth.users.email tetap @ammu.local.
-- Jadi baris yang muncul = akun yang LAHIR dari email luar lalu terpetakan
-- sendiri — entah lewat celah ini, entah peninggalan sebelum konvensi
-- @ammu.local dipakai. Cocokkan emailnya dengan pemilik akun sebelum
-- memutuskan apa pun. Hasil kosong = celah ini tak pernah terpakai.
