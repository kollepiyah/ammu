# supabase/migrations

Berkas `*.sql` di folder ini = skema Postgres Ammu Online, **auto-apply** lewat
integrasi GitHub saat `git push` (urut berdasarkan prefix timestamp nama file).

- **F2** akan mengisi: tabel + index + RLS (peran) + realtime publication.
- Konvensi nama: `YYYYMMDDHHMMSS_deskripsi.sql` (mis. `20260622090000_init_core.sql`).
- SINGLE-TENANT: **tanpa `tenant_id`**. RLS hanya untuk peran
  (super_admin / admin / admin_keuangan / guru / santri).
- Uang = `bigint`; tanggal = `text 'YYYY-MM-DD'`; field dinamis (ayah/ibu/custom_fields) = `jsonb`.

Belum ada migration sampai F2 (folder ini sengaja kosong dulu).
