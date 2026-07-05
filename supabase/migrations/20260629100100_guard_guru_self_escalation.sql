-- ============================================================================
-- HARDENING (29 Jun 2026) — anti-eskalasi peran SENDIRI (checklist R1 §2).
-- Celah: kebijakan `guru_upd_self` mengizinkan guru meng-update BARIS-NYA sendiri
--   tanpa batasan kolom; trigger `sync_guru_profile_role` lalu menyalin
--   `guru.role_sistem` → `profiles.role_sistem` (sumber kebenaran helper RLS).
--   UI memblok (field role_sistem hanya tampil utk super_admin + dipaksa 'user'),
--   TAPI PATCH REST langsung bisa menaikkan peran sendiri ke super_admin.
-- Perbaikan: trigger BEFORE UPDATE menolak kenaikan peran pada baris MILIK SENDIRI
--   kecuali pelaku super_admin. Hanya blok ESKALASI (rank naik) → tak mengganggu
--   super (kelola siapa pun), admin (kelola guru lain), penurunan, atau edit profil
--   sendiri yang tak menyentuh role_sistem.
-- ============================================================================

-- Peringkat privilese (besar = lebih tinggi). guru/user/santri = 1.
create or replace function public._role_rank(rs text)
returns int language sql immutable as $$
  select case rs
    when 'super_admin'     then 4
    when 'admin'           then 3
    when 'admin_keuangan'  then 2
    else 1
  end
$$;

create or replace function public.guard_guru_self_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role_sistem is distinct from old.role_sistem
     and public._role_rank(new.role_sistem) > public._role_rank(old.role_sistem)
     and not public.auth_is_super()
     and exists (
       select 1 from public.profiles p
       where p.id = auth.uid() and p.guru_id = new.id
     )
  then
    raise exception 'forbidden: tidak boleh menaikkan peran sendiri'
      using errcode = '42501';
  end if;
  return new;
end $$;

drop trigger if exists trg_guard_guru_self_escalation on public.guru;
create trigger trg_guard_guru_self_escalation
  before update on public.guru
  for each row
  execute function public.guard_guru_self_escalation();
