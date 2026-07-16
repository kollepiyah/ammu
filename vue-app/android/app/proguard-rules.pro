# ============================================================================
# Portal MU (Ammu Online) — R8 keep rules  (v.1.1.x, minifyEnabled true)
# Mencegah R8 membuang class/method yang dipanggil lewat REFLEKSI (JS bridge
# Capacitor, plugin, custom plugin). Kalau terbuang → CRASH runtime (bukan
# error build), jadi WAJIB uji AAB di HP setelah mengubah aturan ini.
# ============================================================================

# --- Stack trace crash tetap terbaca di Play Console (petakan nomor baris) ---
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
# Anotasi & signature dibutuhkan refleksi plugin / (de)serialisasi.
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod

# --- Capacitor core & bridge (dipanggil via refleksi dari WebView) ---
-keep class com.getcapacitor.** { *; }
-keep interface com.getcapacitor.** { *; }
-dontwarn com.getcapacitor.**

# --- Plugin Capacitor: class ber-@CapacitorPlugin + method callback/JS ---
-keep @com.getcapacitor.annotation.CapacitorPlugin public class * { *; }
-keepclassmembers class * {
    @com.getcapacitor.annotation.PermissionCallback <methods>;
    @com.getcapacitor.annotation.ActivityCallback <methods>;
    @com.getcapacitor.annotation.Permission <methods>;
    @com.getcapacitor.PluginMethod <methods>;
}

# --- Plugin Cordova legacy (capacitor-cordova-android-plugins) ---
-keep class org.apache.cordova.** { *; }
-keep public class * extends org.apache.cordova.CordovaPlugin
-dontwarn org.apache.cordova.**

# --- Plugin CUSTOM kita: WidgetBridgePlugin di-registerPlugin lewat refleksi ---
-keep class app.ammu.id.** { *; }

# --- WebView @JavascriptInterface (jembatan JS → native) ---
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# --- Enum values()/valueOf() (kadang dipanggil refleksi oleh plugin) ---
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# --- Firebase / Google Play Services pakai consumer-rules bawaan library-nya
#     (di-maintain Google) → TIDAK di-keep penuh (biar R8 tetap mengecilkan).
#     Cukup redam warning referensi opsional agar build tak gagal. ---
-dontwarn com.google.firebase.**
-dontwarn com.google.android.gms.**
-dontwarn javax.annotation.**
