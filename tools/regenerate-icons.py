#!/usr/bin/env python3
"""
Portal MU — Regenerate Icon App dari Logo Source (v.109.26)
============================================================
Usage:
    python3 tools/regenerate-icons.py [path-to-source-logo]

Default source: ./logo-baru.png (di root project)
v.109.26: PWA icons pakai padding 18%, maskable transparent BG padding 32%.
"""
import sys, os, time, shutil
from pathlib import Path

try:
    from PIL import Image
    import numpy as np
except ImportError:
    print("[ERROR] Pillow + numpy needed. Run: pip install Pillow numpy")
    sys.exit(1)

ROOT = Path(__file__).parent.parent
DEFAULT_SRC = ROOT / "logo-baru.png"
PUBLIC = ROOT / "public"

# v.109.26 — padding lebih besar (kaligrafi kecil + transparent BG)
MASKABLE_PADDING_PCT = 0.32

def load_source(src_path):
    if not src_path.exists():
        print(f"[ERROR] Source logo not found: {src_path}")
        sys.exit(1)
    img = Image.open(src_path).convert("RGBA")
    print(f"[SRC] {src_path.name} - {img.size[0]}x{img.size[1]}, mode {img.mode}")
    return img

def make_square(img):
    w, h = img.size
    if w == h: return img
    side = max(w, h)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(img, ((side - w) // 2, (side - h) // 2), img if img.mode == "RGBA" else None)
    return canvas

def resize(img, size):
    return img.resize((size, size), Image.LANCZOS)

def recolor_to_white(img):
    arr = np.array(img.convert("RGBA"))
    arr[..., 0] = 255; arr[..., 1] = 255; arr[..., 2] = 255
    return Image.fromarray(arr, "RGBA")

def make_maskable(img, size):
    """v.109.26 - Maskable: transparent BG + padding besar (32%), kaligrafi asli."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    pad_px = int(size * MASKABLE_PADDING_PCT)
    inner = size - (2 * pad_px)
    logo_resized = img.resize((inner, inner), Image.LANCZOS)
    canvas.paste(logo_resized, (pad_px, pad_px), logo_resized)
    return canvas

def make_padded(img, size, pad_pct=0.18):
    """v.109.26 - PWA icon dengan padding (kaligrafi tidak terlalu besar)."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    pad_px = int(size * pad_pct)
    inner = size - (2 * pad_px)
    logo_resized = img.resize((inner, inner), Image.LANCZOS)
    canvas.paste(logo_resized, (pad_px, pad_px), logo_resized)
    return canvas

def save_png(img, name):
    out = PUBLIC / name
    img.save(out, "PNG", optimize=True)
    size_kb = out.stat().st_size / 1024
    print(f"[OUT] {name:32s} {img.size[0]}x{img.size[1]:<4} {size_kb:6.1f} KB")

def main():
    src_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SRC
    img = load_source(src_path)
    img = make_square(img)

    backup_dir = PUBLIC / f"icon-backup-{int(time.time())}"
    backup_dir.mkdir(exist_ok=True)
    backup_targets = [
        "favicon.ico", "favicon-32.png", "favicon-192.png",
        "icon-192.png", "icon-512.png",
        "icon-192-maskable.png", "icon-512-maskable.png",
        "icon-twa-192.png", "icon-twa-512.png",
        "apple-touch-icon-180.png", "logo.png", "icon-512-transparent.png"
    ]
    for fn in backup_targets:
        src_f = PUBLIC / fn
        if src_f.exists():
            shutil.copy2(src_f, backup_dir / fn)
    print(f"[BACKUP] Icon lama ke {backup_dir.name}/")
    print()

    save_png(resize(img, 32),                       "favicon-32.png")
    save_png(make_padded(img, 192, 0.10),           "favicon-192.png")
    save_png(make_padded(img, 192, 0.18),           "icon-192.png")
    save_png(make_padded(img, 512, 0.18),           "icon-512.png")
    save_png(make_maskable(img, 192),               "icon-192-maskable.png")
    save_png(make_maskable(img, 512),               "icon-512-maskable.png")
    save_png(make_padded(img, 192, 0.18),           "icon-twa-192.png")
    save_png(make_padded(img, 512, 0.18),           "icon-twa-512.png")
    save_png(make_padded(img, 180, 0.15),           "apple-touch-icon-180.png")
    save_png(make_padded(img, 512, 0.18),           "icon-512-transparent.png")
    save_png(resize(img, 512),                      "logo.png")

    ico_path = PUBLIC / "favicon.ico"
    img.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"[OUT] {'favicon.ico':32s} multi-res       {ico_path.stat().st_size/1024:6.1f} KB")
    print()
    print("[DONE] Icon regenerated v.109.26")

if __name__ == "__main__":
    main()
