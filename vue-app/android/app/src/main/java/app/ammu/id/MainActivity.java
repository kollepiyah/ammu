package app.ammu.id;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ObjectAnimator;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.animation.AccelerateInterpolator;

import androidx.core.splashscreen.SplashScreen;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  // v.91.0626 ANIM NATIVE: tahan splash sistem ~1300ms supaya animasi ikon (zoom/pop ~840ms)
  //   sempat MAIN PENUH + sedikit hold, baru fade-out. (500ms dulu bikin animasi keburu putus = cepat.)
  private boolean keepSplash = true;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    // Android SplashScreen API — WAJIB install SEBELUM super.onCreate()
    SplashScreen splashScreen = SplashScreen.installSplashScreen(this);
    super.onCreate(savedInstanceState);

    splashScreen.setKeepOnScreenCondition(() -> keepSplash);
    new Handler(Looper.getMainLooper()).postDelayed(() -> keepSplash = false, 1300L);

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
}
