package app.ammu.id;

import android.content.Context;
import android.content.SharedPreferences;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import app.ammu.id.widgets.JamHijriWidget;
import app.ammu.id.widgets.KalenderWidget;

/**
 * v.94.0626 — Jembatan app (web) -> widget home screen Android.
 *
 * JS memanggil WidgetBridge.update({ hijri, hijriKey, kalibrasi, events }) saat beranda terbuka.
 * Nilai disimpan ke SharedPreferences "ammu_widget" lalu kedua widget di-refresh, sehingga widget
 * menampilkan PERSIS data yang sama dengan kartu beranda (Hijri & agenda kalender).
 */
@CapacitorPlugin(name = "WidgetBridge")
public class WidgetBridgePlugin extends Plugin {

    private static final String PREFS = "ammu_widget";

    @PluginMethod
    public void update(PluginCall call) {
        Context ctx = getContext();
        SharedPreferences sp = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        SharedPreferences.Editor ed = sp.edit();
        JSObject data = call.getData();
        if (data.has("hijri")) ed.putString("hijri", call.getString("hijri", ""));
        if (data.has("hijriKey")) ed.putString("hijriKey", call.getString("hijriKey", ""));
        if (data.has("kalibrasi")) ed.putString("kalibrasi", call.getString("kalibrasi", "0"));
        if (data.has("events")) ed.putString("events", call.getString("events", "[]"));
        ed.apply();

        try { JamHijriWidget.updateAll(ctx); } catch (Exception e) { /* ignore */ }
        try { KalenderWidget.updateAll(ctx); } catch (Exception e) { /* ignore */ }

        JSObject ret = new JSObject();
        ret.put("ok", true);
        call.resolve(ret);
    }
}
