package app.ammu.id;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ObjectAnimator;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.Window;
import android.view.animation.AccelerateInterpolator;
import android.webkit.WebSettings;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import androidx.core.splashscreen.SplashScreen;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  // v.91.0626 IN-APP ANIM (final): splash sistem = LATAR mint SINGKAT (tanpa logo). Tahan ~450ms
  //   lalu fade-out; logo (animasi Netflix 2 detik) + footer muncul beranimasi di DALAM app.
  private boolean keepSplash = true;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    // Android SplashScreen API — WAJIB install SEBELUM super.onCreate()
    SplashScreen splashScreen = SplashScreen.installSplashScreen(this);
    // v.94.0626: daftarkan plugin bridge widget (push data Hijri + agenda ke widget home screen)
    registerPlugin(WidgetBridgePlugin.class);
    super.onCreate(savedInstanceState);

    batasiSkalaTeks();
    statusBarPadatBilaInsetTakTerbaca();

    splashScreen.setKeepOnScreenCondition(() -> keepSplash);
    new Handler(Looper.getMainLooper()).postDelayed(() -> keepSplash = false, 450L);

    // Fade-out halus splash -> MainActivity
    splashScreen.setOnExitAnimationListener(provider -> {
      final View splashView = provider.getView();
      ObjectAnimator fade = ObjectAnimator.ofFloat(splashView, View.ALPHA, 1f, 0f);
      fade.setInterpolator(new AccelerateInterpolator());
      fade.setDuration(500L);
      fade.addListener(new AnimatorListenerAdapter() {
        @Override
        public void onAnimationEnd(Animator animation) {
          provider.remove();
        }
      });
      fade.start();
    });
  }

  /**
   * Versi Android System WebView pertama yang meneruskan inset area aman ke halaman —
   * angka yang sama dengan WEBVIEW_VERSION_WITH_SAFE_AREA_FIX di SystemBars Capacitor.
   */
  private static final int WEBVIEW_INSET_TERBACA = 140;

  /**
   * v.1.4.8 — Status bar PADAT (tidak menimpa halaman) di HP yang tak bisa melaporkan
   * tingginya ke halaman.
   *
   * GEJALA (Kyai, 3 Nov 2026): "tampilan di android tidak compatible di beberapa layar" —
   * di sebagian HP header "Ammu Online" setengahnya tertutup status bar.
   *
   * SEBAB: plugin StatusBar v8 secara bawaan menggambar WebView DI BELAKANG status bar
   * (overlaysWebView = true), dan halaman mendorong dirinya turun dengan
   * env(safe-area-inset-top). Nilai itu hanya diisi bila WebView >= 140 (SystemBars
   * meneruskan inset); di bawahnya SystemBars justru MENOLKAN inset. Di Android 15+ itu tak
   * masalah karena SystemBars memberi padding sendiri pada wadah WebView — tapi di Android
   * 14 ke bawah tak ada yang memberi padding, sehingga header naik ke balik status bar.
   * HP low-end yang Android System WebView-nya jarang diperbarui kena semua.
   *
   * Di HP itu saja tata letak dikembalikan ke biasa (WebView di BAWAH status bar). Warna
   * bar mengikuti tema dari App.vue (StatusBar.getInfo().overlays === false). HP lain tetap
   * edge-to-edge seperti sekarang. Diperiksa tiap app dibuka, jadi begitu WebView-nya
   * diperbarui ke 140+, tampilan tembus kembali dengan sendirinya.
   */
  private void statusBarPadatBilaInsetTakTerbaca() {
    try {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.VANILLA_ICE_CREAM) return;
      if (versiUtamaWebView() >= WEBVIEW_INSET_TERBACA) return;
      Window w = getWindow();
      View decor = w.getDecorView();
      int ui = decor.getSystemUiVisibility();
      ui &= ~(View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
      decor.setSystemUiVisibility(ui);
      w.setStatusBarColor(Color.WHITE);
    } catch (Exception e) {
      // Kosmetik — jangan sampai menggagalkan start-up app.
    }
  }

  /**
   * Versi utama Chromium dari user agent WebView ("Chrome/139.0…" → 139). 0 bila tak terbaca.
   * Dibaca dari user agent, bukan androidx.webkit.WebViewCompat, karena pustaka itu hanya
   * dependensi `implementation` Capacitor — tak tersedia untuk modul app.
   */
  private int versiUtamaWebView() {
    if (getBridge() == null || getBridge().getWebView() == null) return 0;
    String ua = getBridge().getWebView().getSettings().getUserAgentString();
    Matcher m = Pattern.compile("Chrome/(\\d+)").matcher(ua == null ? "" : ua);
    return m.find() ? Integer.parseInt(m.group(1)) : 0;
  }

  /** Batas atas skala teks. Di atas ini tata letak Ammu mulai pecah. */
  private static final int TEXT_ZOOM_MAKS = 115;

  /**
   * v.1.2.8 — Batasi skala teks WebView, bukan mengunci mati.
   *
   * GEJALA (Kyai, 5 Agu 2026): "di beberapa HP low end ... tampilannya seperti terlalu
   * zoom". HP itu memang disetel Ukuran Font besar — lazim di HP low-end supaya layar
   * kecil lebih terbaca.
   *
   * SEBAB: Android WebView menurunkan fontScale sistem ke halaman lewat textZoom, jadi
   * "Ukuran Font: Besar" (fontScale 1.15-1.30) memperbesar SETIAP teks di dalam app.
   * Karena tata letak Ammu berbasis teks (kartu, tabel, pita), pembesaran itu ikut
   * mendorong tinggi baris & memaksa pembungkusan — hasilnya terbaca sebagai "ke-zoom",
   * bukan sebagai "font lebih besar".
   *
   * KENAPA DIBATASI, BUKAN DIKUNCI 100%: mengunci berarti membuang preferensi ukuran
   * font sistem sepenuhnya — dan yang menaikkannya sering justru orang yang MEMBUTUHKAN
   * teks besar (mata lelah, penglihatan menurun). Ammu jadi satu-satunya app yang tak
   * mau membesar di HP itu. Batas 115% menahan tata letak tetap utuh sambil tetap
   * memberi sebagian pembesaran yang diminta pengguna; di bawah 100% tak diutak-atik
   * sama sekali (pengguna yang mengecilkan font memang ingin muat lebih banyak).
   *
   * Ini tetap TIDAK menyentuh Ukuran Tampilan (density): itu preferensi seluruh
   * perangkat dan memang seharusnya dihormati apa adanya.
   *
   * Bukan refleksi (API langsung), jadi tak perlu keep-rule R8.
   */
  private void batasiSkalaTeks() {
    try {
      if (getBridge() == null || getBridge().getWebView() == null) return;
      WebSettings ws = getBridge().getWebView().getSettings();
      if (ws == null) return;
      // fontScale sistem: 1.0 = normal, 1.15-1.30 = "Besar"/"Sangat besar".
      float skala = getResources().getConfiguration().fontScale;
      int persen = Math.round(skala * 100f);
      if (persen > TEXT_ZOOM_MAKS) ws.setTextZoom(TEXT_ZOOM_MAKS);
    } catch (Exception e) {
      // Jangan sampai penyesuaian kosmetik menggagalkan start-up app.
    }
  }
}
