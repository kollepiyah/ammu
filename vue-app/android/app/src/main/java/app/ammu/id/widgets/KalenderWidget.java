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

import app.ammu.id.MainActivity;
import app.ammu.id.R;

/**
 * v.94.0626 — Widget home screen "Kalender Pendidikan" (Java).
 *
 * Mirror dari kartu beranda (DashboardKalender.vue): menampilkan max 2 agenda terdekat
 *   (chip tanggal merah + judul + rentang tanggal). Data agenda di-PUSH dari app
 *   (WidgetBridge -> SharedPreferences "ammu_widget" key "events" = JSON array
 *   [{judul, tgl_mulai, tgl_selesai}]) karena widget native tidak bisa query Firestore.
 *
 * Refresh saat app mendorong data (WidgetBridge.updateAll) + periodik (updatePeriodMillis).
 * Tap -> buka app.
 */
public class KalenderWidget extends AppWidgetProvider {

    private static final String PREFS = "ammu_widget";

    private static final String[] BULAN_SHORT = {
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Agt", "Sep", "Okt", "Nov", "Des"
    };

    public static void updateAll(Context context) {
        AppWidgetManager mgr = AppWidgetManager.getInstance(context);
        int[] ids = mgr.getAppWidgetIds(new ComponentName(context, KalenderWidget.class));
        for (int id : ids) updateWidget(context, mgr, id);
    }

    /** Parse "YYYY-MM-DD" (atau ISO datetime) -> {year, month(1-12), day}. null kalau gagal. */
    private static int[] parseYmd(String s) {
        if (s == null) return null;
        String t = s.trim();
        if (t.length() < 10) return null;
        int tIdx = t.indexOf('T');
        if (tIdx >= 10) t = t.substring(0, tIdx);
        else t = t.substring(0, 10);
        String[] p = t.split("-");
        if (p.length < 3) return null;
        try {
            return new int[]{ Integer.parseInt(p[0]), Integer.parseInt(p[1]), Integer.parseInt(p[2]) };
        } catch (Exception e) { return null; }
    }

    private static String monthShort(int month1) {
        if (month1 < 1 || month1 > 12) return "-";
        return BULAN_SHORT[month1 - 1];
    }

    private static String rangeText(int[] start, int[] end) {
        if (start == null) return "-";
        String s = start[2] + " " + monthShort(start[1]) + " " + start[0];
        if (end == null || (end[0] == start[0] && end[1] == start[1] && end[2] == start[2])) return s;
        if (end[0] == start[0] && end[1] == start[1]) {
            return start[2] + "-" + end[2] + " " + monthShort(start[1]) + " " + start[0];
        }
        return start[2] + " " + monthShort(start[1]) + " - " + end[2] + " " + monthShort(end[1]);
    }

    private static void updateWidget(Context context, AppWidgetManager manager, int widgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_kalender);

        SharedPreferences sp = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        String json = sp.getString("events", "[]");

        int shown = 0;
        int[] slotRoot = { R.id.kal_slot1, R.id.kal_slot2, R.id.kal_slot3, R.id.kal_slot4 };
        int[] slotBln = { R.id.kal_bln1, R.id.kal_bln2, R.id.kal_bln3, R.id.kal_bln4 };
        int[] slotTgl = { R.id.kal_tgl1, R.id.kal_tgl2, R.id.kal_tgl3, R.id.kal_tgl4 };
        int[] slotJudul = { R.id.kal_judul1, R.id.kal_judul2, R.id.kal_judul3, R.id.kal_judul4 };
        int[] slotRange = { R.id.kal_range1, R.id.kal_range2, R.id.kal_range3, R.id.kal_range4 };
        int MAX = 4;

        try {
            JSONArray arr = new JSONArray(json);
            for (int i = 0; i < arr.length() && shown < MAX; i++) {
                JSONObject o = arr.optJSONObject(i);
                if (o == null) continue;
                int[] start = parseYmd(o.optString("tgl_mulai", ""));
                if (start == null) continue;
                String selesai = o.optString("tgl_selesai", "");
                int[] end = (selesai == null || selesai.isEmpty()) ? null : parseYmd(selesai);
                String judul = o.optString("judul", "");

                views.setTextViewText(slotBln[shown], monthShort(start[1]).toUpperCase());
                views.setTextViewText(slotTgl[shown], String.valueOf(start[2]));
                views.setTextViewText(slotJudul[shown], judul);
                views.setTextViewText(slotRange[shown], rangeText(start, end));
                views.setViewVisibility(slotRoot[shown], View.VISIBLE);
                shown++;
            }
        } catch (Exception e) { /* ignore -> empty state */ }

        // Sembunyikan slot kosong
        for (int i = shown; i < MAX; i++) views.setViewVisibility(slotRoot[i], View.GONE);
        // Empty state
        views.setViewVisibility(R.id.kal_empty, shown == 0 ? View.VISIBLE : View.GONE);

        // Tap -> buka app
        Intent intent = new Intent(context, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
            ? (PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT)
            : PendingIntent.FLAG_UPDATE_CURRENT;
        PendingIntent pi = PendingIntent.getActivity(context, 2, intent, flags);
        views.setOnClickPendingIntent(R.id.widget_kalender_root, pi);

        manager.updateAppWidget(widgetId, views);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int id : appWidgetIds) updateWidget(context, appWidgetManager, id);
    }
}
