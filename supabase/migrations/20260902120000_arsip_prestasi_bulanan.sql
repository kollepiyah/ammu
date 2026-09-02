-- ============================================================================
-- ARSIP & KOSONGKAN PRESTASI BULANAN — tanggal 25 tiap bulan, KHUSUS REKAP PRESTASI.
--
-- Kyai (2 Sep 2026): "untuk top rangking prestasi santri setiap tgl 25 setiap bulan
-- dikosongi bisa ya, tapi riwayat yg bulan lalu tetap ada" — lalu, saat memilih cara
-- kerjanya: "otomatis dari server saja yg penting data bulan lalu masuk riwayat. ini
-- khusus rekap prestasi ya."
--
-- KENAPA DI SERVER, BUKAN DI APLIKASI. Kalau pengosongan dijalankan aplikasi, ia hanya
-- terjadi kalau ada yang KEBETULAN membuka aplikasi pada tanggal 25 — dan siapa pun yang
-- membukanya bisa memicu penghapusan massal. Di sini ia jalan sekali, terjadwal, dengan
-- hak yang jelas.
--
-- URUTANNYA TAK BOLEH DIBALIK, dan itulah inti keamanannya:
--   1. ARSIP  — salin angka baris santri ke `riwayat_prestasi` bulan lalu, HANYA bila
--               bulan itu belum punya riwayat berangka. Riwayat yang sudah berisi TIDAK
--               PERNAH ditimpa (guru yang mengisi lebih rinci selalu menang).
--   2. KOSONGKAN — dan hanya untuk santri yang bulan lalunya SUDAH ADA di riwayat.
--
-- Syarat pada langkah 2 itu yang membuat janji "riwayat bulan lalu tetap ada" bukan
-- sekadar harapan: santri yang gagal terarsip TIDAK ikut dikosongkan, jadi angkanya tetap
-- ada di data santri untuk dibereskan manusia. Tak ada jalan di fungsi ini yang menghapus
-- angka tanpa salinannya lebih dulu tersimpan.
--
-- CAKUPAN: hanya lembaga **PTPT & PPPH** (itulah arti "khusus rekap prestasi" — lihat
-- LEMBAGA_PRESTASI_BULANAN di vue-app/src/utils/prestasiBulanan.js) dan hanya santri
-- AKTIF. Santri non-aktif sengaja tak disentuh: angka mereka adalah catatan sejarah
-- alumni, bukan papan peringkat yang perlu direset.
--
-- BATAS YANG JUJUR: baris santri tak menyimpan bulan, jadi bulan sasaran DITURUNKAN
-- (= bulan lalu). Untuk angka yang memang baru diisi siklus kemarin, itu benar. Untuk
-- angka basi yang tak tersentuh berbulan-bulan, bulannya bisa meleset — karena itu baris
-- hasil fungsi ini ditandai `"sumber": "arsip_otomatis"` supaya bisa dikenali dan
-- dibetulkan, dan tak pernah menyamar sebagai isian guru.
--
-- MEMATIKAN: `select cron.unschedule('arsip-prestasi-bulanan');`
-- MENJALANKAN MANUAL: `select public.arsip_prestasi_bulanan(true);`  (true = paksa,
--   abaikan syarat tanggal 25 — untuk uji coba / menyusul bulan yang terlewat)
-- ============================================================================

create or replace function public.arsip_prestasi_bulanan(p_paksa boolean default false)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hari_ini   date := (now() at time zone 'Asia/Jakarta')::date;
  v_bulan_lalu date := (date_trunc('month', v_hari_ini) - interval '1 month')::date;
  v_periode    text := to_char(v_bulan_lalu, 'YYYY-MM');
  v_label      text;
  v_arsip      integer := 0;
  v_kosong     integer := 0;
  v_sisa       integer := 0;
begin
  -- Dijadwalkan HARIAN lalu menyaring sendiri di sini, bukan dijadwalkan `25 * *`.
  -- Alasannya waktu: cron Supabase berjalan UTC, sedangkan "tanggal 25" yang Kyai
  -- maksud adalah tanggal WIB. Menaruh syaratnya di dalam fungsi membuat perbedaan
  -- 7 jam itu tak pernah jadi salah-hari yang senyap.
  if not p_paksa and extract(day from v_hari_ini) <> 25 then
    return jsonb_build_object(
      'dijalankan', false,
      'alasan', 'bukan tanggal 25 WIB',
      'tanggal_wib', v_hari_ini
    );
  end if;

  v_label := (array['Januari','Februari','Maret','April','Mei','Juni',
                    'Juli','Agustus','September','Oktober','November','Desember'])
             [extract(month from v_bulan_lalu)::int]
             || ' ' || extract(year from v_bulan_lalu)::text;

  -- ---- 1) ARSIP ------------------------------------------------------------
  -- Bentuk `data` mengikuti payloadRiwayatPrestasi() di utils/prestasiBulanan.js —
  -- satu bentuk untuk semua penulis, supaya baris arsip tak berbeda dari baris guru.
  insert into public.riwayat_prestasi as tgt (id, santri_id, periode, data)
  select
    'rp_' || s.id || '_' || v_periode,
    s.id,
    v_periode,
    -- `santri_id` & `periode` sengaja TIDAK diikutkan di sini: keduanya kolom RIIL
    -- (lihat COLS di services/db.js), dan payloadRiwayatPrestasi() pun menaruhnya di
    -- sana. Menduplikasinya ke dalam `data` membuat baris arsip beda bentuk dari baris
    -- buatan aplikasi.
    jsonb_build_object(
      'santri_nama', coalesce(s.nama, ''),
      'lembaga',     coalesce(s.lembaga, ''),
      'kelas',       coalesce(s.kelas, ''),
      'bulan_label', v_label,
      'awal',        coalesce(s.data->>'prestasi_awal', ''),
      'akhir',       coalesce(s.data->>'prestasi_akhir', ''),
      'total',       coalesce(s.data->>'prestasi_total', ''),
      'juz',         coalesce(s.juz, ''),
      'updatedAt',   to_char(now() at time zone 'utc', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
      -- Penanda asal. Bulan sasaran adalah turunan, bukan pernyataan guru — jejak ini
      -- yang memungkinkan koreksi kalau suatu saat ada yang meleset.
      'sumber',      'arsip_otomatis'
    )
  from public.santri s
  where lower(btrim(coalesce(s.lembaga, ''))) in ('ptpt', 'ppph')
    and s.aktif is distinct from false
    and (
      coalesce(s.data->>'prestasi_awal', '')  <> '' or
      coalesce(s.data->>'prestasi_akhir', '') <> '' or
      coalesce(s.data->>'prestasi_total', '') <> ''
    )
  on conflict (id) do update
    set data = excluded.data,
        updated_at = now()
    -- HANYA menimpa baris yang kosong melompong. Riwayat yang sudah berangka —
    -- apa pun isinya — selalu menang atas turunan otomatis ini.
    where coalesce(tgt.data->>'awal', '')  = ''
      and coalesce(tgt.data->>'akhir', '') = ''
      and coalesce(tgt.data->>'total', '') = '';
  get diagnostics v_arsip = row_count;

  -- ---- 2) KOSONGKAN --------------------------------------------------------
  -- Syarat `exists(...)` inilah janji "riwayat bulan lalu tetap ada". Tanpa baris ini,
  -- kegagalan arsip apa pun berubah jadi kehilangan data yang senyap.
  update public.santri s
     set data = s.data - 'prestasi_awal' - 'prestasi_akhir' - 'prestasi_total',
         updated_at = now()
   where lower(btrim(coalesce(s.lembaga, ''))) in ('ptpt', 'ppph')
     and s.aktif is distinct from false
     and (
       coalesce(s.data->>'prestasi_awal', '')  <> '' or
       coalesce(s.data->>'prestasi_akhir', '') <> '' or
       coalesce(s.data->>'prestasi_total', '') <> ''
     )
     and exists (
       select 1
         from public.riwayat_prestasi r
        where r.santri_id = s.id
          and r.periode = v_periode
          and (
            coalesce(r.data->>'awal', '')  <> '' or
            coalesce(r.data->>'akhir', '') <> '' or
            coalesce(r.data->>'total', '') <> ''
          )
     );
  get diagnostics v_kosong = row_count;

  -- Yang TERSISA = punya angka tapi gagal terarsip. Sengaja tidak dikosongkan, dan
  -- sengaja dilaporkan: angka mereka satu-satunya salinan yang ada.
  select count(*) into v_sisa
    from public.santri s
   where lower(btrim(coalesce(s.lembaga, ''))) in ('ptpt', 'ppph')
     and s.aktif is distinct from false
     and (
       coalesce(s.data->>'prestasi_awal', '')  <> '' or
       coalesce(s.data->>'prestasi_akhir', '') <> '' or
       coalesce(s.data->>'prestasi_total', '') <> ''
     );

  -- Jejak untuk ditengok kalau suatu saat ada yang bertanya "angkanya ke mana".
  insert into public.audit_log (id, aksi, collection, doc_id, user_id, data)
  values (
    'aud_' || replace(gen_random_uuid()::text, '-', ''),
    'arsip_prestasi_bulanan',
    'santri',
    v_periode,
    'sistem',
    jsonb_build_object(
      'periode', v_periode,
      'bulan_label', v_label,
      'diarsip', v_arsip,
      'dikosongkan', v_kosong,
      'tersisa_tak_dikosongkan', v_sisa,
      'tanggal_wib', v_hari_ini,
      'dipaksa', p_paksa
    )
  );

  return jsonb_build_object(
    'dijalankan', true,
    'periode', v_periode,
    'bulan_label', v_label,
    'diarsip', v_arsip,
    'dikosongkan', v_kosong,
    'tersisa_tak_dikosongkan', v_sisa,
    'tanggal_wib', v_hari_ini
  );
end $$;

comment on function public.arsip_prestasi_bulanan(boolean) is
  'Tanggal 25 WIB: arsipkan angka prestasi PTPT & PPPH ke riwayat bulan lalu, lalu '
  'kosongkan baris santri. Hanya mengosongkan yang riwayatnya SUDAH tersimpan. '
  'Jadwal: lihat docs/SUPABASE-EDGE-FUNCTIONS-DEPLOY.md. Paksa: arsip_prestasi_bulanan(true).';

-- Hanya boleh dipanggil dari server (pg_cron) & service role. Peran anon/authenticated
-- TIDAK diberi hak: fungsi ini menghapus data, dan SECURITY DEFINER membuatnya melewati
-- RLS — dua hal yang tak boleh bisa dipicu dari browser siapa pun.
revoke all on function public.arsip_prestasi_bulanan(boolean) from public;
revoke all on function public.arsip_prestasi_bulanan(boolean) from anon, authenticated;
