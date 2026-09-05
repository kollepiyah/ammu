-- ============================================================================
-- apply_bmt_payment — TIDAK BOLEH ADA RUPIAH YANG HILANG (Kyai, 5 Sep 2026).
--
-- LATAR. Versi sebelumnya (20260715120000) sudah benar soal yang paling besar: angka
-- pembayaran ditulis ke kolom riil `terbayar`, bukan lagi ke ekor jsonb. Yang tersisa
-- adalah tiga lubang yang sama-sama berakhir pada satu akibat — uang MASUK ke buku induk
-- tapi TIDAK diterima siapa pun:
--
--   (A) Item keranjang menunjuk tagihan yang SUDAH TIDAK ADA. Keranjang VA dibuat wali,
--       lalu tagihannya dihapus/di-generate ulang (id berubah) sebelum uangnya datang.
--       UPDATE-nya cocok 0 baris, tapi `v_tag_total` tetap ditambah seolah berhasil.
--       Uangnya tak masuk tagihan mana pun, tak masuk uang saku, dan hasil RPC-nya
--       berbohong. Ini bukan kemungkinan teoretis: keranjang bisa menunggu berhari-hari
--       di rekening BMT sementara admin merapikan tagihan.
--
--   (B) Jumlah item < total intent. Cabang keranjang TIDAK punya penadah sisa seperti
--       cabang waterfall punya. Selisih berapa pun langsung lenyap. `total` dan `items`
--       dikirim KLIEN sebagai dua field terpisah — RPC ini tak boleh mempercayai
--       aritmetika klien untuk urusan uang.
--
--   (C) Waterfall menyaring lewat LABEL `status`, bukan angka. Tagihan yang labelnya
--       terlanjur 'lunas' padahal `terbayar < nominal` (kelas bug "status meleset" yang
--       ditemukan 5 Sep 2026) akan DILEWATI, dan uangnya lari ke uang saku — padahal
--       tunggakannya masih berdiri. Uang harus mengikuti ANGKA, bukan label.
--
-- ISI MIGRASI: satu penulisan ulang `apply_bmt_payment` dengan tiga jaminan —
--   1. Setiap rupiah `p_nominal` berakhir di salah satu dari: tagihan, uang saku. Sisa
--      yang tak tersalur ke mana pun SELALU jatuh ke uang saku (bisa ditarik/dipakai
--      kemudian), bukan menguap. Berlaku untuk KEDUA cabang.
--   2. Tak pernah mengkredit LEBIH dari yang diterima: tiap item dijepit ke sisa yang
--      belum teralokasi, jadi keranjang cacat (items > total) tak bisa menciptakan uang.
--   3. Hasilnya JUJUR: `tagihan`/`uang_saku` di return value & `keuangan_va_inbox.result`
--      hanya menghitung baris yang BENAR-BENAR berubah (GET DIAGNOSTICS), dan rincian
--      alokasinya ikut disimpan di baris buku induk supaya bisa ditelusuri per tagihan.
--
-- Idempotensi TIDAK berubah: guard `keuangan_va_inbox.ref` (PK) di langkah (1) dan
-- `applied_transfer_refs` per tagihan tetap seperti semula.
--
-- ⚠️ URUTAN DEPLOY: migrasi ini FRONTEND-AGNOSTIK — tak ada kode app yang bergantung
--   padanya, jadi boleh dijalankan kapan saja (sebelum atau sesudah deploy web).
--   `create or replace function` mempertahankan hak akses, tapi grant-nya tetap ditulis
--   ulang di bawah supaya migrasi ini utuh bila dijalankan di database baru.
-- ============================================================================

create or replace function public.apply_bmt_payment(
  p_santri_id text,
  p_nominal   bigint,
  p_ref       text,
  p_payload   jsonb default '{}'::jsonb
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_existing   public.keuangan_va_inbox%rowtype;
  v_intent     public.keuangan_va_intent%rowtype;
  v_item       jsonb;
  v_tgl        text := to_char(now() at time zone 'Asia/Jakarta', 'YYYY-MM-DD');
  v_santri_nama text;
  v_remaining  bigint;
  v_pay        bigint;
  v_amt        bigint;
  v_idx        int := 0;
  v_cnt        int := 0;
  v_us_total   bigint := 0;
  v_tag_total  bigint := 0;
  v_tag        record;
  v_newbayar   bigint;
  v_status     text;
  v_sisa       bigint;
  v_alokasi    jsonb := '[]'::jsonb;   -- rincian per tagihan, utk audit di buku induk
  v_result     jsonb;
begin
  if p_ref is null or length(trim(p_ref)) = 0 then
    raise exception 'ref wajib (idempotency key)';
  end if;

  -- (1) idempoten: ref sudah diproses -> kembalikan hasil lama
  select * into v_existing from public.keuangan_va_inbox where ref = p_ref;
  if found then
    return jsonb_build_object('ok', true, 'dup', true, 'result', v_existing.result);
  end if;

  select nama into v_santri_nama from public.santri where id = p_santri_id;

  -- (2) cari intent cocok (santri + pending + total == nominal). Kunci baris.
  select * into v_intent
  from public.keuangan_va_intent
  where santri_id = p_santri_id and status = 'pending' and total = p_nominal
  order by created_at asc
  limit 1
  for update;

  if found then
    -- (2a) alokasi per item keranjang
    for v_item in select * from jsonb_array_elements(coalesce(v_intent.data->'items', '[]'::jsonb))
    loop
      v_idx := v_idx + 1;
      v_amt := coalesce((v_item->>'nominal')::bigint, 0);
      -- JEPIT ke sisa yang belum teralokasi. Tanpa ini, keranjang yang jumlah itemnya
      --   melebihi `total` (dua field terpisah dari klien) akan mengkredit lebih banyak
      --   daripada uang yang benar-benar diterima BMT.
      v_amt := least(v_amt, greatest(p_nominal - v_tag_total - v_us_total, 0));
      if v_amt <= 0 then continue; end if;

      if (v_item->>'tipe') = 'tagihan' and (v_item->>'tagihan_id') is not null then
        -- t.terbayar di sisi kanan = nilai LAMA (semantik UPDATE Postgres) -> aman menambah.
        update public.keuangan_tagihan t
        set terbayar = coalesce(t.terbayar, 0) + v_amt,
            data = coalesce(t.data, '{}'::jsonb) || jsonb_build_object(
              'last_payment_ref', 'bi_bmt_' || p_ref,
              'last_payment_at',  now(),
              'applied_transfer_refs',
                coalesce(t.data->'applied_transfer_refs', '[]'::jsonb) || to_jsonb(array[p_ref])
            ),
            status = case
              when coalesce(t.terbayar, 0) + v_amt >= t.nominal and t.nominal > 0 then 'lunas'
              when coalesce(t.terbayar, 0) + v_amt > 0 then 'partial'
              else 'belum' end,
            updated_at = now()
        where t.id = (v_item->>'tagihan_id')
          and not coalesce(t.data->'applied_transfer_refs', '[]'::jsonb) ? p_ref;
        -- LUBANG (A): dulu v_tag_total ditambah tanpa peduli baris itu ada atau tidak.
        --   Sekarang hanya yang benar-benar berubah yang dihitung; yang tak ketemu
        --   dibiarkan jadi sisa dan ditadah uang saku di bawah.
        get diagnostics v_cnt = row_count;
        if v_cnt > 0 then
          v_tag_total := v_tag_total + v_amt;
          v_alokasi := v_alokasi || jsonb_build_array(jsonb_build_object(
            'tagihan_id', v_item->>'tagihan_id', 'nominal', v_amt));
        end if;
      elsif (v_item->>'tipe') = 'uang_saku' then
        insert into public.keuangan_uang_saku_santri (id, santri_id, jenis, nominal, tanggal, data)
        values ('us_bmt_' || p_ref || '_' || v_idx, p_santri_id, 'setor', v_amt, v_tgl,
                jsonb_build_object('sumber', 'bmt_va', 'ref', p_ref, 'catatan', 'Top-up Uang Saku via VA BMT'))
        on conflict (id) do nothing;
        v_us_total := v_us_total + v_amt;
      end if;
      -- `tipe` tak dikenal sengaja tak ditangani di sini: uangnya tetap terhitung sisa
      --   dan ditadah uang saku, bukan dibuang diam-diam.
    end loop;

    update public.keuangan_va_intent
    set status = 'terbayar',
        data = data || jsonb_build_object('paid_ref', p_ref, 'paid_at', now()),
        updated_at = now()
    where id = v_intent.id;

  else
    -- (2b) WATERFALL: tak ada intent -> lunasi tagihan tertua dulu, sisa -> uang saku
    v_remaining := p_nominal;
    for v_tag in
      select id, nominal, terbayar, data from public.keuangan_tagihan
      -- LUBANG (C): dulu `coalesce(status,'belum') <> 'lunas'`. Label itu bisa meleset
      --   dari angkanya (lihat alat "Cek Riwayat vs Tagihan"), dan tagihan yang salah
      --   berlabel lunas akan dilewati padahal tunggakannya nyata. Uang mengikuti ANGKA.
      where santri_id = p_santri_id
        and nominal > 0
        and coalesce(terbayar, 0) < nominal
      order by coalesce(data->>'jatuh_tempo', tanggal, ''), created_at
    loop
      exit when v_remaining <= 0;
      v_newbayar := coalesce(v_tag.terbayar, 0);
      v_pay := least(v_remaining, greatest(v_tag.nominal - v_newbayar, 0));
      if v_pay <= 0 then continue; end if;
      v_newbayar := v_newbayar + v_pay;
      v_status := case
        when v_newbayar >= v_tag.nominal and v_tag.nominal > 0 then 'lunas'
        when v_newbayar > 0 then 'partial' else 'belum' end;
      update public.keuangan_tagihan t
      set terbayar = v_newbayar,
          data = coalesce(t.data, '{}'::jsonb) || jsonb_build_object(
            'last_payment_ref', 'bi_bmt_' || p_ref, 'last_payment_at', now(),
            'applied_transfer_refs',
              coalesce(t.data->'applied_transfer_refs', '[]'::jsonb) || to_jsonb(array[p_ref])),
          status = v_status, updated_at = now()
      where t.id = v_tag.id;
      get diagnostics v_cnt = row_count;
      if v_cnt > 0 then
        v_remaining := v_remaining - v_pay;
        v_tag_total := v_tag_total + v_pay;
        v_alokasi := v_alokasi || jsonb_build_array(jsonb_build_object(
          'tagihan_id', v_tag.id, 'nominal', v_pay));
      end if;
    end loop;
  end if;

  -- (2c) PENADAH SISA — berlaku untuk KEDUA cabang (lubang B).
  --   Apa pun yang tak berhasil disalurkan ke tagihan mendarat di uang saku. Uang saku
  --   dipilih karena ia satu-satunya kantong santri yang bisa ditarik atau dipakai
  --   membayar kemudian; membiarkan sisanya menguap berarti wali membayar sesuatu yang
  --   tak pernah diterima siapa pun, dan tak ada satu layar pun yang akan menunjukkannya.
  v_sisa := p_nominal - v_tag_total - v_us_total;
  if v_sisa > 0 then
    v_idx := v_idx + 1;
    insert into public.keuangan_uang_saku_santri (id, santri_id, jenis, nominal, tanggal, data)
    values ('us_bmt_' || p_ref || '_' || v_idx, p_santri_id, 'setor', v_sisa, v_tgl,
            jsonb_build_object('sumber', 'bmt_va', 'ref', p_ref,
                               'catatan', 'Sisa transfer VA -> Uang Saku'))
    on conflict (id) do nothing;
    v_us_total := v_us_total + v_sisa;
  end if;

  -- (3) buku induk (pemasukan). nominal > 0 wajib (check constraint).
  --   `alokasi` + dua subtotalnya ikut ditulis: tanpa itu satu baris VA yang melunasi
  --   tiga tagihan tak bisa ditelusuri per tagihan, dan pemeriksaan Riwayat vs Tagihan
  --   hanya bisa menebak.
  if p_nominal > 0 then
    insert into public.keuangan_buku_induk (id, tipe, sumber, nominal, tanggal, keterangan, data)
    values ('bi_bmt_' || p_ref, 'masuk', 'bmt_va', p_nominal, v_tgl,
            'Pembayaran VA BMT - ' || coalesce(v_santri_nama, p_santri_id),
            jsonb_build_object('santri_id', p_santri_id, 'santri_nama', coalesce(v_santri_nama, ''),
                               'va_ref', p_ref,
                               'intent_id', case when v_intent.id is not null then v_intent.id else null end,
                               'alokasi', v_alokasi,
                               'alokasi_tagihan', v_tag_total,
                               'alokasi_uang_saku', v_us_total))
    on conflict (id) do nothing;
  end if;

  v_result := jsonb_build_object(
    'ok', true, 'dup', false,
    'intent_id', case when v_intent.id is not null then v_intent.id else null end,
    'allocated', p_nominal, 'tagihan', v_tag_total, 'uang_saku', v_us_total,
    'alokasi', v_alokasi);

  -- (4) tandai ref diproses (PK ref = guard anti-dobel saat balapan)
  insert into public.keuangan_va_inbox (ref, santri_id, nominal, intent_id, payload, result)
  values (p_ref, p_santri_id, p_nominal,
          case when v_intent.id is not null then v_intent.id else null end, coalesce(p_payload, '{}'::jsonb), v_result);

  return v_result;
end;
$$;

comment on function public.apply_bmt_payment(text, bigint, text, jsonb) is
  'Terapkan 1 laporan pembayaran VA BMT. Idempoten via keuangan_va_inbox.ref. JAMINAN: tagihan + uang_saku SELALU berjumlah tepat p_nominal (sisa tak tersalur jatuh ke uang saku).';

-- Hanya server (service_role) boleh eksekusi — cegah user (santri) kredit diri sendiri.
revoke all on function public.apply_bmt_payment(text, bigint, text, jsonb) from public;
revoke all on function public.apply_bmt_payment(text, bigint, text, jsonb) from anon, authenticated;
grant execute on function public.apply_bmt_payment(text, bigint, text, jsonb) to service_role;
