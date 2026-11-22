-- ============================================================================
-- Al Manshur Channel — Lindungi key `instagram` di public.settings agar token
-- Instagram Graph API HANYA bisa dibaca admin/super_admin (auth_can_manage),
-- bukan anon/santri/guru. Edge Function `get-link-preview` membacanya lewat
-- service-role.
-- ============================================================================

drop policy if exists settings_sel on public.settings;
create policy settings_sel on public.settings for select using (
  case
    when key = 'admin'     then false
    when key = 'keuangan'  then (public.auth_can_manage() or public.auth_can_keuangan())
    when key = 'instagram' then public.auth_can_manage()
    else true
  end
);
