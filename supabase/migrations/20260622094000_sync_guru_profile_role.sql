-- Sinkron profiles.role_sistem/role saat guru.role_sistem berubah.
-- MASALAH: form admin (useGuruForm) menulis role ke kolom guru.role_sistem, TAPI sesi
-- (buildSesi) & RLS (auth_role_sistem) baca dari profiles.role_sistem. handle_new_user cuma
-- set profiles SEKALI saat signup → ubah role lewat app TAK berefek. Trigger ini menutup gap.
-- Mapping IDENTIK handle_new_user: super_admin/admin/admin_keuangan tetap; selain itu -> 'guru'.

create or replace function public.sync_guru_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare v_rs text; v_role text;
begin
  v_rs := case new.role_sistem
            when 'super_admin' then 'super_admin'
            when 'admin' then 'admin'
            when 'admin_keuangan' then 'admin_keuangan'
            else 'guru'
          end;
  v_role := case when v_rs in ('admin','admin_keuangan','super_admin') then 'admin' else 'guru' end;
  update public.profiles
    set role_sistem = v_rs, role = v_role
    where guru_id = new.id;
  return new;
end $$;

drop trigger if exists trg_sync_guru_profile_role on public.guru;
create trigger trg_sync_guru_profile_role
  after update on public.guru
  for each row
  when (new.role_sistem is distinct from old.role_sistem)
  execute function public.sync_guru_profile_role();

-- Backfill: samakan profiles yang sudah ada dgn guru.role_sistem saat ini (sekali jalan).
update public.profiles p
set role_sistem = m.rs, role = m.role
from (
  select g.id,
    case g.role_sistem
      when 'super_admin' then 'super_admin'
      when 'admin' then 'admin'
      when 'admin_keuangan' then 'admin_keuangan'
      else 'guru'
    end as rs,
    case when g.role_sistem in ('admin','admin_keuangan','super_admin') then 'admin' else 'guru' end as role
  from public.guru g
) m
where p.guru_id = m.id
  and (p.role_sistem is distinct from m.rs or p.role is distinct from m.role);
