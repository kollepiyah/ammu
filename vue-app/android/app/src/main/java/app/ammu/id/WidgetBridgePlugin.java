package app.ammu.id;

import android.content.Context;
import android.content.SharedPreferences;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import app.ammu.id.widgets.JamHijriWidget;
import app.ammu.id.widgets.JadwalSholatWidget;
import app.ammu.id.widgets.TugasWidget;

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
        // v.1.5.5: jadwal sholat 7 hari + agenda terdekat (utils/widgetSholat.js) untuk
        //   JadwalSholatWidget — menggantikan `events` milik widget Kalender yang dihapus.
        if (data.has("sholat")) ed.putString("sholat", call.getString("sholat", "{}"));
        // v.1.5.0 gelombang 3: daftar "Tugas Saya" — disusun utils/tugasSaya.js, widget cuma
        //   menggambar. Hanya ditimpa kalau JS memang mengirimnya.
        if (data.has("tugas")) ed.putString("tugas", call.getString("tugas", "[]"));
        // v.1.5.0: token sempit + alamat fungsinya, supaya widget bisa MENARIK SENDIRI daftar
        //   tugas di antara dua kali aplikasi dibuka. Token kosong = berhenti menarik (logout).
        if (data.has("tugasToken")) ed.putString("tugasToken", call.getString("tugasToken", ""));
        if (data.has("tugasUrl")) ed.putString("tugasUrl", call.getString("tugasUrl", ""));
        ed.apply();

        try { JamHijriWidget.updateAll(ctx); } catch (Exception e) { /* ignore */ }
        try { JadwalSholatWidget.updateAll(ctx); } catch (Exception e) { /* ignore */ }
        try { TugasWidget.updateAll(ctx); } catch (Exception e) { /* ignore */ }

        JSObject ret = new JSObject();
        ret.put("ok", true);
        call.resolve(ret);
    }
}
