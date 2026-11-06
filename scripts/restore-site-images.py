"""
Phục hồi chất lượng ảnh chụp trên website (nhà xưởng, máy móc, sản phẩm mạ) theo từng ảnh.
  python3 scripts/restore-site-images.py            (xử lý tất cả; chạy lại an toàn vì luôn đọc từ _backup_originals/)
  python3 scripts/restore-site-images.py --report   (chỉ đo chỉ số, không ghi ảnh)
Cần: opencv-python(-headless), numpy, pillow. Sau khi chạy phải tăng IMAGE_VERSION trong src/lib/photo.ts.

Phạm vi: public/images/{factory,profile-lib,hanin,process}. Bỏ qua .svg, ảnh rộng < 150 px và tên/đường dẫn chứa
logo, icon, qr, flag, badge (cùng chung-nhan, certificate: giấy tờ, không phải ảnh chụp). Không đụng public/images/clients (logo),
public/images/certificates, public/images/profile (ảnh slide thô, site không dùng).

Bản gốc: _backup_originals/<đường dẫn như trong dự án>. Lần đầu tự tạo từ: data/profile-lib-original (profile-lib, bản trước khi
làm giảm bão hòa), data/factory-original (ảnh nhà máy đã từng chỉnh), còn lại từ chính file hiện tại. Riêng public/images/hanin do bước
cắt ảnh từ pptx tạo sẵn (bản gốc nguyên kích thước, lossless).
Chuỗi xử lý (thích ứng theo chỉ số đo): khử nhiễu giữ cạnh -> phóng 2x nếu rộng < 1200 -> cứu vùng cháy sáng + CLAHE nhẹ (LAB)
-> chuẩn hoá màu (HSV) -> làm nét chỉ trên kênh L.
"""
import json, os, shutil, sys
import cv2
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "public", "images")
BACKUP = os.path.join(ROOT, "_backup_originals")
DIRS = ["factory", "profile-lib", "hanin", "process"]
SKIP_WORDS = ("logo", "icon", "qr", "flag", "badge", "chung-nhan", "chung-chi", "certificate", "bieu-tuong")
EXTS = (".jpg", ".jpeg", ".png", ".webp")
REPORT_ONLY = "--report" in sys.argv


def in_scope(rel):
    low = rel.lower()
    return low.endswith(EXTS) and not any(w in low for w in SKIP_WORDS)


def list_files():
    out = []
    for d in DIRS:
        for dp, _, fs in os.walk(os.path.join(IMG, d)):
            for f in sorted(fs):
                full = os.path.join(dp, f)
                rel = os.path.relpath(full, ROOT)
                if in_scope(rel):
                    out.append(rel)
    return out


def ensure_backup(rel):
    dst = os.path.join(BACKUP, rel)
    if os.path.exists(dst):
        return dst
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    name = os.path.basename(rel)
    src = os.path.join(ROOT, rel)
    if rel.startswith("public/images/profile-lib/") and os.path.exists(os.path.join(ROOT, "data/profile-lib-original", name)):
        src = os.path.join(ROOT, "data/profile-lib-original", name)
    elif rel.startswith("public/images/factory/"):
        alt = os.path.join(ROOT, "data/factory-original", os.path.relpath(rel, "public/images/factory"))
        if os.path.exists(alt):
            src = alt
    shutil.copy2(src, dst)
    return dst


def load(path):
    im = Image.open(path)
    im.load()
    if im.mode not in ("RGB",):
        im = im.convert("RGB")
    return cv2.cvtColor(np.asarray(im), cv2.COLOR_RGB2BGR)


def metrics(bgr):
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
    lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB)
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
    L = lab[..., 0].astype(np.float32) * 100.0 / 255.0  # LAB của OpenCV: L 0..255 -> 0..100
    L255 = lab[..., 0]
    s = hsv[..., 1]
    return {
        "width": int(bgr.shape[1]),
        "sharp": float(cv2.Laplacian(gray, cv2.CV_64F).var()),
        # Ngưỡng 235 và 40 trên thang L 0..255 (kênh L của OpenCV 8 bit)
        "clip": float((L255 > 235).mean() * 100),
        "dark": float((L255 < 40).mean() * 100),
        "sat_mean": float(s.mean()),
        "sat_p95": float(np.percentile(s, 95)),
    }


def restore(bgr, m):
    steps = []
    # 1. Khử nhiễu hạt và bệt màu JPEG, giữ cạnh
    img = cv2.bilateralFilter(bgr, d=7, sigmaColor=35, sigmaSpace=35)
    steps.append("khử nhiễu")
    # 2. Phóng 2x nếu ảnh nhỏ
    if img.shape[1] < 1200:
        img = cv2.resize(img, (img.shape[1] * 2, img.shape[0] * 2), interpolation=cv2.INTER_LANCZOS4)
        steps.append("phóng 2x")
    # 3. Dải sáng tối trên LAB
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    L = lab[..., 0].astype(np.float32)
    if m["clip"] > 1.0:  # cháy sáng đáng kể: nén mềm vùng L > 210 (soft-knee)
        k = 45.0
        over = L > 210
        L[over] = 210 + k * np.tanh((L[over] - 210) / k)
        steps.append("giảm cháy sáng")
    L8 = np.clip(L, 0, 255).astype(np.uint8)
    clahe = cv2.createCLAHE(clipLimit=1.4, tileGridSize=(8, 8)).apply(L8)
    L = 0.6 * clahe.astype(np.float32) + 0.4 * L8.astype(np.float32)
    steps.append("CLAHE 60/40")
    lab[..., 0] = np.clip(L, 0, 255).astype(np.uint8)
    img = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)
    # 4. Chuẩn hoá màu trên HSV
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV).astype(np.float32)
    S = hsv[..., 1]
    if m["sat_p95"] > 215:  # màu rực gắt: nén 13% các điểm bão hòa cao
        w = np.clip((S - 150.0) / 105.0, 0, 1)
        hsv[..., 1] = S * (1 - 0.13 * w)
        steps.append("nén bão hòa")
    elif m["sat_mean"] < 60:  # nhợt nhạt: tăng 10%
        hsv[..., 1] = np.clip(S * 1.10, 0, 255)
        steps.append("tăng bão hòa")
    img = cv2.cvtColor(np.clip(hsv, 0, 255).astype(np.uint8), cv2.COLOR_HSV2BGR)
    # 5. Làm nét chỉ trên kênh L (Unsharp Mask)
    blurry = m["sharp"] < 150
    amount, radius, thr = (1.5, 1.0, 3) if blurry else (1.2, 0.8, 5)
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    L = lab[..., 0].astype(np.float32)
    blur = cv2.GaussianBlur(L, (0, 0), radius)
    diff = L - blur
    L = L + amount * diff * (np.abs(diff) > thr)
    lab[..., 0] = np.clip(L, 0, 255).astype(np.uint8)
    img = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)
    steps.append("làm nét L " + ("mạnh" if blurry else "nhẹ"))
    return img, steps


def save(bgr, path):
    rgb = Image.fromarray(cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB))
    low = path.lower()
    if low.endswith(".webp"):
        rgb.save(path, "WEBP", quality=92, method=6)
    elif low.endswith((".jpg", ".jpeg")):
        rgb.save(path, "JPEG", quality=95, subsampling=0, optimize=True)
    else:
        rgb.save(path, "PNG", optimize=True)


def main():
    files = list_files()
    rows, skipped_small = [], 0
    for rel in files:
        bak = ensure_backup(rel)
        try:
            src = load(bak)
        except Exception as e:
            print("bỏ qua (không đọc được):", rel, e)
            continue
        if src.shape[1] < 150:
            skipped_small += 1
            continue
        before = metrics(src)
        if REPORT_ONLY:
            rows.append({"file": rel, "before": before, "after": before, "steps": []})
            continue
        out, steps = restore(src, before)
        save(out, os.path.join(ROOT, rel))
        rows.append({"file": rel, "before": before, "after": metrics(out), "steps": steps})
    with open(os.path.join(BACKUP, "restore-report.json"), "w") as f:
        json.dump(rows, f, ensure_ascii=False, indent=1)
    print(f"Đã quét {len(files)} ảnh, xử lý {len(rows)} (bỏ qua {skipped_small} ảnh nhỏ < 150px).")
    return rows


if __name__ == "__main__":
    main()
