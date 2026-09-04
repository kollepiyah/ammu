-- ============================================================================
-- v.1.4.1 · ARSIP PRESTASI TGL 25 — periode mengikuti BULAN LAPORAN
--
-- Kyai (4 Sep 2026): "rekap prestasi bulanan, Bulan September. Isinya adalah rekapan dari
-- awal agustus sampai akhir agustus … di filter saya membukanya di September, bukan di
-- agustus. di agustus harusnya data bulan lalu (bulan agustus, rekap dari Juli)."
--
-- Jadi penamaannya:  periode = BULAN LAPORAN, isinya capaian bulan SEBELUMNYA.
--
-- Fungsi versi 20260902 memakai penamaan kebalikannya: ia mengarsipkan ke
-- `v_bulan_lalu`. Padahal angka yang ada di baris santri pada tanggal 25 September adalah
-- angka yang baru saja diisi guru pada jendela 29 Agu–5 Sep — yaitu isi REKAP SEPTEMBER
-- ('2026-09'), bukan rekap Agustus. Dua akibatnya, dua-duanya senyap:
--
--   1. Arsipnya mendarat di bucket '2026-08', yang menurut penamaan sekarang berarti
--      "rekap Agustus = capaian Juli". Angka Agustus tercatat sebagai angka Juli.
--   2. Langkah KOSONGKAN mensyaratkan riwayat periode itu sudah ada. Baris yang gurunya
--      sudah rapi mengisi lewat layar (tersimpan di '2026-09') tak punya baris '2026-08',
--      jadi syaratnya dipenuhi oleh baris arsip yang baru saja salah bucket tadi —
--      papan peringkat tetap dikosongkan, tapi jejaknya ada di bulan yang keliru.
--
-- Yang diubah HANYA bulan sasarannya (3 baris di blok declare + label). Seluruh
-- pengamannya tak tersentuh: tetap tanggal 25 WIB, tetap hanya menimpa riwayat yang kosong
-- melompong, tetap hanya mengosongkan santri yang riwayatnya sudah tersimpan.
--
-- TIDAK ada data yang dipindah. Baris riwayat lama dibiarkan apa adanya: memindahkannya
-- berarti menebak bulan mana yang dimaksud penulisnya, dan tebakan itu tak bisa dibatalkan.
-- Yang lama tetap terbaca di submenu Riwayat; hanya baris BARU yang mendarat di bucket
-- yang benar.
--
-- ⚠ DEPLOY: rilis ini TIDAK lagi frontend-murni — `npx supabase db push` wajib duluan.
-- Jadwal pg_cron `arsip-prestasi-bulanan` TIDAK ikut migrasi (lihat
-- docs/SUPABASE-EDGE-FUNCTIONS-DEPLOY.md); kalau belum pernah dipasang, fungsi ini ada
-- tapi tak pernah jalan. Cek:
--   select jobname, schedule, active from cron.job where jobname = 'arsip-prestasi-bulanan';
-- ============================================================================

create or replace function public.arsip_prestasi_bulanan(p_paksa boolean default false)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hari_ini      date := (now() at time zone 'Asia/Jakarta')::date;
  -- v.1.4.1: BULAN LAPORAN = bulan berjalan. Pada 25 September, angka yang menempel di
  -- baris santri adalah isi rekap September (capaian Agustus) yang diisi 29 Agu–5 Sep.
  v_bulan_laporan date := date_trunc('month', v_hari_ini)::date;
  v_periode       text := to_char(v_bulan_laporan, 'YYYY-MM');
  v_label         text;
  v_arsip         integer := 0;
  v_kosong        integer := 0;
  v_sisa          integer := 0;
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
             [extract(month from v_bulan_laporan)::int]
             || ' ' || extract(year from v_bulan_laporan)::text;

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
  'Tanggal 25 WIB: arsipkan angka prestasi PTPT & PPPH ke riwayat BULAN LAPORAN berjalan '
  '(v.1.4.1 — periode = bulan laporan, isinya capaian bulan sebelumnya), lalu kosongkan '
  'baris santri. Hanya mengosongkan yang riwayatnya SUDAH tersimpan. '
  'Jadwal: lihat docs/SUPABASE-EDGE-FUNCTIONS-DEPLOY.md. Paksa: arsip_prestasi_bulanan(true).';

-- Hanya boleh dipanggil dari server (pg_cron) & service role. Peran anon/authenticated
-- TIDAK diberi hak: fungsi ini menghapus data, dan SECURITY DEFINER membuatnya melewati
-- RLS — dua hal yang tak boleh bisa dipicu dari browser siapa pun.
revoke all on function public.arsip_prestasi_bulanan(boolean) from public;
revoke all on function public.arsip_prestasi_bulanan(boolean) from anon, authenticated;
