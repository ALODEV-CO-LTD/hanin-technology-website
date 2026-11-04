"""
Cân chỉnh nhẹ ảnh web theo chuẩn tự nhiên (Natural Industrial Look): Color 1.10, Brightness 1.05, Contrast 1.03, sRGB.
  python3 scripts/enhance-site-images.py
- profile-lib: luôn xử lý từ bản gốc data/profile-lib-original (chưa qua realify làm giảm bão hòa ~56%), xuất JPEG q92.
- factory: ảnh chụp thật; chỉ cân chỉnh ảnh tối (độ sáng trung vị < 0.55). Bản gốc lưu một lần ở data/factory-original.
Cần: pillow, numpy. Sau khi chạy phải tăng IMAGE_VERSION trong src/lib/photo.ts.
"""
import os, shutil
import numpy as np
from PIL import Image, ImageCms, ImageEnhance

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COLOR, BRIGHT, CONTRAST = 1.10, 1.05, 1.03


def to_srgb(im):
    icc = im.info.get("icc_profile")
    if icc:
        try:
            import io
            src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            return ImageCms.profileToProfile(im, src, ImageCms.createProfile("sRGB"), outputMode="RGB")
        except Exception:
            pass
    return im.convert("RGB")


def enhance(im):
    im = to_srgb(im)
    im = ImageEnhance.Color(im).enhance(COLOR)
    im = ImageEnhance.Brightness(im).enhance(BRIGHT)
    return ImageEnhance.Contrast(im).enhance(CONTRAST)


def median_luma(im):
    t = im.copy(); t.thumbnail((200, 200))
    a = np.asarray(t.convert("RGB"), dtype=np.float32) / 255
    return float(np.median(0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]))


n = 0
src, dst = os.path.join(root, "data/profile-lib-original"), os.path.join(root, "public/images/profile-lib")
for f in sorted(os.listdir(src)):
    if not f.endswith(".jpg") or f == "chung-chi-iso-9001-2015.jpg":
        continue
    enhance(Image.open(os.path.join(src, f))).save(os.path.join(dst, f), quality=92, subsampling=0, optimize=True)
    n += 1
print("profile-lib:", n, "ảnh từ bản gốc")

fdir = os.path.join(root, "public/images/factory")
orig = os.path.join(root, "data/factory-original")
os.makedirs(orig, exist_ok=True)
done = []
for dp, _, fs in os.walk(fdir):
    for f in sorted(fs):
        if not f.lower().endswith(".jpg"):
            continue
        p = os.path.join(dp, f)
        rel = os.path.relpath(p, fdir)
        bak = os.path.join(orig, rel)
        os.makedirs(os.path.dirname(bak), exist_ok=True)
        if not os.path.exists(bak):
            shutil.copy2(p, bak)
        base = Image.open(bak)
        if median_luma(base) < 0.55:
            enhance(base).save(p, quality=92, subsampling=0, optimize=True)
            done.append(rel)
print("factory:", len(done), "ảnh tối đã cân chỉnh:", ", ".join(done))
