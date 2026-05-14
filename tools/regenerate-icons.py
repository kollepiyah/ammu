#!/usr/bin/env python3
"""
Portal MU — Regenerate Icon App dari Logo Source
================================================
Usage:
    python3 tools/regenerate-icons.py [path-to-source-logo]

Default source: ./logo-baru.png (di root project)

Output ke ./public/:
    favicon.ico            (multi-resolution 16+32+48)
    favicon-32.png         32x32
    favicon-192.png        192x192
    icon-192.png           192x192   (PWA any)
    icon-512.png           512x512   (PWA any)
    icon-192-maskable.png  192x192   (PWA maskable, 80% safe zone)
    icon-512-maskable.png  512x512   (PWA maskable, 80% safe zone)
    icon-twa-192.png       192x192   (Android TWA)
    icon-twa-512.png       512x512   (Android TWA)
    apple-touch-icon-180.png 180x180 (iOS)
    logo.png               original res (or 512 max) — splash + inline
    icon-512-transparent.png 512x512 transparent

Requirements:
    pip install Pillow
"""
import sys, os
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("[ERROR] Pillow not installed. Run: pip install Pillow")
    sys.exit(1)

ROOT = Path(__file__).parent.parent
DEFAULT_SRC = ROOT / "logo-baru.png"
PUBLIC = ROOT / "public"

# Maskable safe zone: icon harus fit dalam circle 80% center. Pad 12% setiap sisi.
MASKABLE_PADDING_PCT = 0.25  # v.109.19 — padding besar untuk elegant look

# Theme color (selaras manifest.json) untuk maskable background
THEME_BG = (15, 118, 110, 255)  # #0f766e teal (v.109.19 — gradient elegant via make_maskable)

def load_source(src_path):
    if not src_path.exists():
        print(f"[ERROR] Source logo not found: {src_path}")
        print(f"[HINT]  Taruh file di: {src_path}")
        sys.exit(1)
    img = Image.open(src_path).convert("RGBA")
    w, h = img.size
    print(f"[SRC] {src_path.name} — {w}x{h}, mode {img.mode}")
    if min(w, h) < 512:
        print(f"[WARN] Source kecil ({w}x{h}). Idealnya >=1024x1024 untuk kualitas optimal.")
    return img

def make_square(img):
    """Crop/pad ke square supaya semua output proporsional."""
    w, h = img.size
    if w == h:
        return img
    side = max(w, h)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(img, ((side - w) // 2, (side - h) // 2), img if img.mode == "RGBA" else None)
    return canvas

def resize(img, size):
    return img.resize((size, size), Image.LANCZOS)

def recolor_to_white(img):
    """v.109.20 — Ubah semua pixel non-transparent menjadi putih (preserve alpha).
    Berguna untuk maskable icon: logo aslinya teal, di-overlay BG teal gradient,
    butuh kaligrafi putih supaya kontras tinggi."""
    import numpy as np
    arr = np.array(img.convert("RGBA"))
    # Set RGB jadi 255 untuk semua pixel (alpha tetap)
    arr[..., 0] = 255
    arr[..., 1] = 255
    arr[..., 2] = 255
    return Image.fromarray(arr, "RGBA")

def make_maskable(img, size):
    """v.109.20 — Maskable icon: gradient elegant teal + logo recolor PUTIH + padding besar.
    Linear gradient dari teal cerah (top-left) ke teal gelap (bottom-right).
    Logo kaligrafi di-recolor putih untuk kontras tinggi terhadap BG teal."""
    import numpy as np
    c_light = np.array([20, 184, 166])    # #14b8a6 teal cerah
    c_dark  = np.array([12, 78, 73])      # #0c4e49 teal gelap
    arr = np.zeros((size, size, 4), dtype=np.uint8)
    x, y = np.meshgrid(np.arange(size), np.arange(size))
    t = (x + y) / (2 * (size - 1))
    for i in range(3):
        arr[..., i] = (c_light[i] * (1 - t) + c_dark[i] * t).astype(np.uint8)
    arr[..., 3] = 255
    canvas = Image.fromarray(arr, "RGBA")
    # Recolor logo ke putih DULU sebelum resize+paste
    img_white = recolor_to_white(img)
    pad_px = int(size * MASKABLE_PADDING_PCT)
    inner = size - (2 * pad_px)
    logo_resized = img_white.resize((inner, inner), Image.LANCZOS)
    canvas.paste(logo_resized, (pad_px, pad_px), logo_resized)
    return canvas

def save_png(img, name, optimize=True):
    out = PUBLIC / name
    img.save(out, "PNG", optimize=optimize)
    size_kb = out.stat().st_size / 1024
    print(f"[OUT] {name:32s} {img.size[0]}x{img.size[1]:<4} {size_kb:6.1f} KB")

def main():
    src_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SRC
    img = load_source(src_path)
    img = make_square(img)

    # Backup public/ icons lama ke public/icon-backup-{timestamp}/
    import time
    backup_dir = PUBLIC / f"icon-backup-{int(time.time())}"
    backup_dir.mkdir(exist_ok=True)
    backup_targets = [
        "favicon.ico", "favicon-32.png", "favicon-192.png",
        "icon-192.png", "icon-512.png",
        "icon-192-maskable.png", "icon-512-maskable.png",
        "icon-twa-192.png", "icon-twa-512.png",
        "apple-touch-icon-180.png",
        "logo.png", "icon-512-transparent.png"
    ]
    import shutil
    for fn in backup_targets:
        src_f = PUBLIC / fn
        if src_f.exists():
            shutil.copy2(src_f, backup_dir / fn)
    print(f"[BACKUP] Icon lama di-backup ke: {backup_dir.name}/")
    print()

    # === Generate semua icon ===
    save_png(resize(img, 32),  "favicon-32.png")
    save_png(resize(img, 192), "favicon-192.png")
    save_png(resize(img, 192), "icon-192.png")
    save_png(resize(img, 512), "icon-512.png")
    save_png(make_maskable(img, 192), "icon-192-maskable.png")
    save_png(make_maskable(img, 512), "icon-512-maskable.png")
    save_png(resize(img, 192), "icon-twa-192.png")
    save_png(resize(img, 512), "icon-twa-512.png")
    save_png(resize(img, 180), "apple-touch-icon-180.png")
    save_png(resize(img, 512), "icon-512-transparent.png")
    save_png(resize(img, 512), "logo.png")

    # favicon.ico multi-resolution (16, 32, 48)
    ico_path = PUBLIC / "favicon.ico"
    img.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    size_kb = ico_path.stat().st_size / 1024
    print(f"[OUT] {'favicon.ico':32s} multi-res         {size_kb:6.1f} KB")

    print()
    print("[DONE] Semua icon ter-generate.")
    print()
    print("Next steps:")
    print("  1. Cek visual di public/ — buka file untuk verifikasi")
    print("  2. Bump SW_VERSION (force browser refresh cache lama)")
    print("  3. Run .\\auto-deploy.ps1 untuk push + deploy")
    print("  4. Hard refresh Ctrl+Shift+R di browser")
    print("  5. (Optional) Upload logo ke Pengaturan -> Logo Pondok untuk Firestore dinamis")
    print()
    print(f"[BACKUP] Kalau hasil tidak puas, restore dari: public/{backup_dir.name}/")

if __name__ == "__main__":
    main()
