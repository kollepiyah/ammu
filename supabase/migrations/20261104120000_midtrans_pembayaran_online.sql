-- ============================================================================
-- v.1.4.9 gel. 2 — Pembayaran online wali lewat Midtrans (VA BRI/BNI/BCA/BSI/Mandiri + QRIS).
--
-- Kyai, 4 Nov 2026: transfer manual dihapus, BMT PETA dimatikan sementara, pembayaran online
-- lewat Midtrans; biaya layanan ditanggung wali. Uangnya dicatat lewat RPC yang SAMA dengan VA
-- BMT — alokasi keranjang/waterfall, sisa ke uang saku, idempoten per ref — bukan salinan baru.
--
-- Yang berubah pada apply_bmt_payment (tiga parameter baru, semuanya ber-default sehingga
-- panggilan bmt-webhook yang lama tetap persis sama hasilnya):
--   p_intent_id — Midtrans menyebut order-nya. Dulu intent dicari lewat (santri + total), dan
--                 dua keranjang bernominal sama milik satu santri bisa tertukar.
--   p_sumber    — kolom `sumber` buku induk & uang saku ('midtrans'). Awalan id baris ikut
--                 ('bi_midtrans_…'); BMT tetap 'bi_bmt_…'.
--   p_label     — teks keterangan ('Pembayaran VA BRI (Midtrans) - Nama').
-- Nominal yang dikirim fungsi midtrans-webhook sudah BERSIH dari biaya layanan.
--
-- Signature berubah → fungsi lama di-DROP dulu (create or replace tak bisa menambah parameter;
-- tanpa drop, Postgres menyimpan dua overload dan panggilan bernama jadi ambigu).
--
-- ⚠️ URUTAN DEPLOY: migrasi ini dulu (supabase db push), baru deploy fungsi midtrans-*.
--   bmt-webhook tak perlu di-deploy ulang.
-- ============================================================================

drop function if exists public.apply_bmt_payment(text, bigint, text, jsonb);

create or replace function public.apply_bmt_payment(
  p_santri_id text,
  p_nominal   bigint,
  p_ref       text,
  p_payload   jsonb default '{}'::jsonb,
  p_intent_id text  default null,      -- v.1.4.9: Midtrans tahu persis order-nya
  p_sumber    text  default 'bmt_va',  -- v.1.4.9: 'midtrans' untuk VA bank / QRIS
  p_label     text  default 'VA BMT'   -- v.1.4.9: teks di buku induk, mis. 'VA BRI (Midtrans)'
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
  -- v.1.4.9: awalan id baris. BMT tetap 'bmt' supaya id lama (bi_bmt_/us_bmt_) tak berubah.
  v_sumber     text := coalesce(nullif(trim(p_sumber), ''), 'bmt_va');
  v_label      text := coalesce(nullif(trim(p_label), ''), 'VA BMT');
  v_pfx        text := case when coalesce(nullif(trim(p_sumber), ''), 'bmt_va') = 'bmt_va' then 'bmt'
                            else regexp_replace(lower(p_sumber), '[^a-z0-9]', '', 'g') end;
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

  -- (2) cari intent. Midtrans menyebut order-nya sendiri (p_intent_id) — itu yang dipakai,
  --   asal milik santri ini & masih pending; BMT tak tahu order, jadi tetap dicocokkan lewat
  --   (santri + pending + total == nominal). Kunci baris.
  if p_intent_id is not null then
    select * into v_intent
    from public.keuangan_va_intent
    where id = p_intent_id and santri_id = p_santri_id and status = 'pending'
    for update;
  else
    select * into v_intent
    from public.keuangan_va_intent
    where santri_id = p_santri_id and status = 'pending' and total = p_nominal
    order by created_at asc
    limit 1
    for update;
  end if;

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
              'last_payment_ref', 'bi_' || v_pfx || '_' || p_ref,
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
        values ('us_' || v_pfx || '_' || p_ref || '_' || v_idx, p_santri_id, 'setor', v_amt, v_tgl,
                jsonb_build_object('sumber', v_sumber, 'ref', p_ref, 'catatan', 'Top-up Uang Saku via ' || v_label))
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
            'last_payment_ref', 'bi_' || v_pfx || '_' || p_ref, 'last_payment_at', now(),
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
    values ('us_' || v_pfx || '_' || p_ref || '_' || v_idx, p_santri_id, 'setor', v_sisa, v_tgl,
            jsonb_build_object('sumber', v_sumber, 'ref', p_ref,
                               'catatan', 'Sisa pembayaran ' || v_label || ' -> Uang Saku'))
    on conflict (id) do nothing;
    v_us_total := v_us_total + v_sisa;
  end if;

  -- (3) buku induk (pemasukan). nominal > 0 wajib (check constraint).
  --   `alokasi` + dua subtotalnya ikut ditulis: tanpa itu satu baris VA yang melunasi
  --   tiga tagihan tak bisa ditelusuri per tagihan, dan pemeriksaan Riwayat vs Tagihan
  --   hanya bisa menebak.
  if p_nominal > 0 then
    insert into public.keuangan_buku_induk (id, tipe, sumber, nominal, tanggal, keterangan, data)
    values ('bi_' || v_pfx || '_' || p_ref, 'masuk', v_sumber, p_nominal, v_tgl,
            'Pembayaran ' || v_label || ' - ' || coalesce(v_santri_nama, p_santri_id),
            jsonb_build_object('santri_id', p_santri_id, 'santri_nama', coalesce(v_santri_nama, ''),
                               'va_ref', p_ref,
                               'intent_id', case when v_intent.id is not null then v_intent.id else null end,
                               'alokasi', v_alokasi,
                               'alokasi_tagihan', v_tag_total,
                               'alokasi_uang_saku', v_us_total,
                               'kanal', v_label))
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

comment on function public.apply_bmt_payment(text, bigint, text, jsonb, text, text, text) is
  'Terapkan 1 pembayaran VA (BMT / Midtrans). Idempoten via keuangan_va_inbox.ref. JAMINAN: tagihan + uang_saku SELALU berjumlah tepat p_nominal (sisa tak tersalur jatuh ke uang saku).';

-- Hanya server (service_role) boleh eksekusi — cegah user (santri) kredit diri sendiri.
revoke all on function public.apply_bmt_payment(text, bigint, text, jsonb, text, text, text) from public;
revoke all on function public.apply_bmt_payment(text, bigint, text, jsonb, text, text, text) from anon, authenticated;
grant execute on function public.apply_bmt_payment(text, bigint, text, jsonb, text, text, text) to service_role;
