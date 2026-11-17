package app.ammu.id.widgets;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.view.View;
import android.widget.RemoteViews;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

import app.ammu.id.MainActivity;
import app.ammu.id.R;

/**
 * v.1.5.0 gelombang 3 — Widget home screen "Tugas Saya" (Kyai 16 Nov 2026).
 *
 * Cermin kartu beranda (DashboardTugasSaya.vue). Isinya DIDORONG dari app lewat
 * WidgetBridge -> SharedPreferences "ammu_widget" key "tugas", berupa JSON array
 * [{t: tanggal, j: jam, h: judul, d: detail, n: jenis}] yang disusun utils/tugasSaya.js.
 * Widget TIDAK menyusun daftarnya sendiri — kalau ia menghitung sendiri, isinya pasti
 * berpisah dari kartu beranda.
 *
 * Yang DIPUTUSKAN di sini hanya satu: membuang baris bertanggal yang sudah LEWAT. Itu
 * penting karena data hanya segar saat app dibuka; tanpa saringan ini, guru yang tiga hari
 * tak membuka Ammu akan melihat piket kemarin seolah hari ini. Dengan saringan ini widget
 * paling buruk jadi KOSONG — bukan salah.
 */
public class TugasWidget extends AppWidgetProvider {

    private static final String PREFS = "ammu_widget";
    private static final int MAX = 3;

    private static final String[] HARI = {
        "Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
    };
    private static final String[] BULAN_SHORT = {
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Agt", "Sep", "Okt", "Nov", "Des"
    };

    public static void updateAll(Context context) {
        AppWidgetManager mgr = AppWidgetManager.getInstance(context);
        int[] ids = mgr.getAppWidgetIds(new ComponentName(context, TugasWidget.class));
        for (int id : ids) updateWidget(context, mgr, id);
    }

    /** Warna titik per jenis — disamakan dengan JENIS_TUGAS di utils/tugasSaya.js. */
    private static int warnaJenis(String jenis) {
        if (jenis == null) return 0xFF0EA5E9;
        switch (jenis) {
            case "piket_laju": return 0xFF10B981;   // emerald
            case "seremonial": return 0xFF8B5CF6;   // violet
            case "capaian_laju": return 0xFFF59E0B; // amber
            case "glondongan": return 0xFF0EA5E9;   // sky
            case "tes_sekolah": return 0xFF06B6D4;  // cyan
            case "input_bulanan": return 0xFFF43F5E; // rose
            case "izin_guru": return 0xFFF97316;    // orange
            default: return 0xFF0EA5E9;
        }
    }

    /**
     * Tanggal hari ini di Asia/Jakarta sebagai "YYYY-MM-DD".
     * Sengaja TIDAK memakai zona waktu perangkat: guru bisa saja memakai HP yang zonanya
     * meleset, dan tanggal piket di Ammu selalu tanggal Jakarta.
     */
    private static Calendar jakartaNow() {
        return Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"), new Locale("id", "ID"));
    }

    private static String hariIniJakarta(Calendar c) {
        return String.format(
            Locale.US, "%04d-%02d-%02d",
            c.get(Calendar.YEAR), c.get(Calendar.MONTH) + 1, c.get(Calendar.DAY_OF_MONTH)
        );
    }

    private static String labelTanggal(Calendar c) {
        int dow = c.get(Calendar.DAY_OF_WEEK) - 1; // Calendar.SUNDAY = 1
        String hari = (dow >= 0 && dow < 7) ? HARI[dow] : "";
        return hari + ", " + c.get(Calendar.DAY_OF_MONTH) + " " + BULAN_SHORT[c.get(Calendar.MONTH)];
    }

    private static void updateWidget(Context context, AppWidgetManager manager, int widgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_tugas);

        SharedPreferences sp = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        String json = sp.getString("tugas", "[]");

        Calendar now = jakartaNow();
        String hariIni = hariIniJakarta(now);
        views.setTextViewText(R.id.tugas_tanggal, labelTanggal(now));

        int[] slotRoot = { R.id.tugas_slot1, R.id.tugas_slot2, R.id.tugas_slot3 };
        int[] slotDot = { R.id.tugas_dot1, R.id.tugas_dot2, R.id.tugas_dot3 };
        int[] slotJudul = { R.id.tugas_judul1, R.id.tugas_judul2, R.id.tugas_judul3 };
        int[] slotDetail = { R.id.tugas_detail1, R.id.tugas_detail2, R.id.tugas_detail3 };
        int[] slotJam = { R.id.tugas_jam1, R.id.tugas_jam2, R.id.tugas_jam3 };

        int shown = 0;
        try {
            JSONArray arr = new JSONArray(json);
            for (int i = 0; i < arr.length() && shown < MAX; i++) {
                JSONObject o = arr.optJSONObject(i);
                if (o == null) continue;
                String tgl = o.optString("t", "");
                // Bertanggal dan sudah lewat -> buang. Tanpa tanggal (penugasan) selalu tampil.
                if (tgl.length() == 10 && tgl.compareTo(hariIni) < 0) continue;
                String judul = o.optString("h", "");
                if (judul.isEmpty()) continue;
                String detail = o.optString("d", "");
                String jam = o.optString("j", "");

                views.setTextViewText(slotJudul[shown], judul);
                views.setTextViewText(slotDetail[shown], detail);
                views.setViewVisibility(slotDetail[shown], detail.isEmpty() ? View.GONE : View.VISIBLE);
                views.setTextViewText(slotJam[shown], jam);
                views.setViewVisibility(slotJam[shown], jam.isEmpty() ? View.GONE : View.VISIBLE);
                views.setTextColor(slotDot[shown], warnaJenis(o.optString("n", "")));
                views.setViewVisibility(slotRoot[shown], View.VISIBLE);
                shown++;
            }
        } catch (Exception e) { /* abaikan -> keadaan kosong */ }

        for (int i = shown; i < MAX; i++) views.setViewVisibility(slotRoot[i], View.GONE);
        views.setViewVisibility(R.id.tugas_empty, shown == 0 ? View.VISIBLE : View.GONE);

        Intent intent = new Intent(context, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
            ? (PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT)
            : PendingIntent.FLAG_UPDATE_CURRENT;
        PendingIntent pi = PendingIntent.getActivity(context, 3, intent, flags);
        views.setOnClickPendingIntent(R.id.widget_tugas_root, pi);

        manager.updateAppWidget(widgetId, views);
    }

    /**
     * Tarik daftar tugas langsung dari server (Kyai 17 Nov 2026).
     *
     * Dulu widget hanya segar saat aplikasi dibuka; jadwal yang berubah sesudah itu tak
     * pernah sampai. Sekarang tiap kali Android menyegarkan widget (updatePeriodMillis 30
     * menit), widget menukar TOKEN SEMPIT miliknya dengan daftar tugas lewat edge function
     * `widget-tugas`. Tokennya hanya bisa membaca daftar tugas satu guru — bukan sesi penuh.
     *
     * Dijalankan di utas terpisah: onUpdate berjalan di utas utama dan Android membunuh
     * BroadcastReceiver yang berlama-lama. Gagal menarik SENGAJA tak mengubah apa pun —
     * widget tetap menggambar data terakhir yang tersimpan, dan saringan tanggal membuatnya
     * kosong (bukan salah) kalau datanya sudah basi.
     */
    private static void tarikDariServer(final Context context) {
        final SharedPreferences sp = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        final String token = sp.getString("tugasToken", "");
        final String url = sp.getString("tugasUrl", "");
        if (token == null || token.length() < 32 || url == null || !url.startsWith("https://")) return;

        new Thread(new Runnable() {
            @Override
            public void run() {
                HttpURLConnection c = null;
                try {
                    c = (HttpURLConnection) new URL(url).openConnection();
                    c.setRequestMethod("GET");
                    c.setRequestProperty("x-ammu-widget-token", token);
                    c.setConnectTimeout(10000);
                    c.setReadTimeout(10000);
                    if (c.getResponseCode() != 200) return;

                    BufferedReader r = new BufferedReader(
                        new InputStreamReader(c.getInputStream(), StandardCharsets.UTF_8));
                    StringBuilder sb = new StringBuilder();
                    String baris;
                    while ((baris = r.readLine()) != null) sb.append(baris);
                    r.close();

                    JSONObject o = new JSONObject(sb.toString());
                    JSONArray arr = o.optJSONArray("tugas");
                    if (arr == null) return;
                    sp.edit().putString("tugas", arr.toString()).apply();

                    // Gambar ulang dengan data baru. updateAll aman dipanggil dari utas ini.
                    updateAll(context);
                } catch (Exception e) {
                    /* jaringan mati / server sibuk → biarkan data lama, jangan kosongkan */
                } finally {
                    if (c != null) c.disconnect();
                }
            }
        }).start();
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // Gambar dulu dari data tersimpan supaya widget tak pernah kosong menunggu jaringan,
        // baru tarik yang baru di latar.
        for (int id : appWidgetIds) updateWidget(context, appWidgetManager, id);
        tarikDariServer(context);
    }
}
