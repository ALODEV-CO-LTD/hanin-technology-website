"""
Làm ảnh Company Profile (public/images/profile-lib) bớt "chất AI": nén bão hòa (nhất là xanh dương, cam), sáng nhẹ,
thêm clarity để không bị đục, trung hòa ám xanh, thêm hạt phim/nhiễu cảm biến. Luôn xử lý từ bản gốc ở data/profile-lib-original (không đưa lên web),
nên chạy lại an toàn. Sau khi chạy phải tăng IMAGE_VERSION trong src/lib/photo.ts.
  python3 scripts/realify-profile-lib.py [mức giảm bão hòa, mặc định 0.48]
Cần: pillow, numpy.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from PIL import Image
from realify_lib import realify

strength = float(sys.argv[1]) if len(sys.argv) > 1 else 0.48
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(root, "data/profile-lib-original")
dst = os.path.join(root, "public/images/profile-lib")
SKIP = {"chung-chi-iso-9001-2015.jpg"}  # bản scan giấy chứng nhận, không phải ảnh AI: giữ nguyên
n = 0
for i, f in enumerate(sorted(os.listdir(src))):
    if not f.endswith(".jpg") or f in SKIP:
        continue
    im = Image.open(os.path.join(src, f)).convert("RGB")
    realify(im, seed=i, sat=strength).save(os.path.join(dst, f), quality=88, subsampling=1, optimize=True)
    n += 1
print("đã xử lý", n, "ảnh, cường độ", strength)
