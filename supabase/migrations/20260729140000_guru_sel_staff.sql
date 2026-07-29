-- ============================================================================
-- A5 (audit 29 Jul 2026) — Ketatkan guru_sel dari signedIn → staff-only.
--
-- MASALAH: guru_sel = `auth.uid() is not null` (signedIn) → SETIAP user login,
-- termasuk WALI/SANTRI (saat onboard nanti), bisa `GET /rest/v1/guru?select=*`
-- dan membaca PII pegawai: WA, NIK, id_fingerprint, alamat (di ekor jsonb).
--
-- AMAN: seluruh pembaca tabel guru = surface STAFF (form santri, POS, rekap
-- prestasi, supervisi, glondongan, kelas-guru, direktori/picker). PSB publik
-- (vue-app-psb) & surface wali/santri (rapor/capaian/tagihan/tabungan) TIDAK
-- membaca guru — mereka pakai nama ter-cache di baris santri/rapor. Diverifikasi
-- via grep 29 Jul: tak ada subscribeColl/getAll('guru') di jalur non-staff.
--
-- Guru tetap mengedit barisnya sendiri (guru_upd_self, tak terpengaruh) dan tetap
-- membaca direktori guru (auth_is_staff MEMUAT guru).
-- ============================================================================
drop policy if exists guru_sel on public.guru;
create policy guru_sel on public.guru for select using (public.auth_is_staff());
