/**
 * Phóng to + làm nét ảnh bằng AI siêu phân giải (Real-ESRGAN General x4v3, chạy cục bộ trên CPU).
 *
 *   node scripts/upscale-photo.cjs <ảnh-vào> <ảnh-ra.jpg> [cạnh-dài-px=3200] [--kho]
 *
 * Cài đặt một lần (KHÔNG thêm vào package.json của dự án):
 *   mkdir -p $TMPDIR/sr && cd $TMPDIR/sr && npm init -y && npm i onnxruntime-node
 *   curl -L -o model.onnx https://huggingface.co/tamnvcc/Real-ESRGAN-General-x4v3_float/resolve/main/onnx/model.onnx   (4,7MB)
 * Biến môi trường SR_DIR trỏ tới thư mục trên (mặc định $TMPDIR/sr).
 * Mô hình nhận ô cố định 128×128 → chia ô 96px + viền 16px chồng lấn, ghép lại ×4 rồi thu về kích thước đích bằng Lanczos.
 * Luôn dùng ảnh GỐC chưa phóng làm đầu vào; phóng ảnh đã phóng sẽ khuếch đại lỗi.
 */
const fs = require("node:fs");
const path = require("node:path");
const sharp = require(path.join(__dirname, "../node_modules/sharp"));
const SR_DIR = process.env.SR_DIR || path.join(process.env.TMPDIR || "/tmp", "sr");
const ort = require(path.join(SR_DIR, "node_modules/onnxruntime-node"));

const [input, output, edgeArg] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const kho = process.argv.includes("--kho");
const LONG_EDGE = Number(edgeArg) || 3200;
const T = 96, P = 16, IN = 128, OUT = IN * 4;

const reflect = (i, n) => { if (i < 0) i = -i; if (i >= n) i = 2 * n - 2 - i; return Math.min(Math.max(i, 0), n - 1); };

(async () => {
  const session = await ort.InferenceSession.create(path.join(SR_DIR, "model.onnx"), { intraOpNumThreads: 0 });
  let base = sharp(input).rotate().removeAlpha();
  if (kho) base = base.normalise({ lower: 1, upper: 99 }).modulate({ brightness: 1.03, saturation: 1.08 }); // ảnh kho thiếu sáng/xám
  const { data, info } = await base.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const W = w * 4, H = h * 4;
  const out = Buffer.alloc(W * H * 3);
  const tilesX = Math.ceil(w / T), tilesY = Math.ceil(h / T);
  const started = Date.now();
  for (let ty = 0; ty < tilesY; ty++) {
    for (let tx = 0; tx < tilesX; tx++) {
      const x0 = tx * T, y0 = ty * T;
      const tensor = new Float32Array(3 * IN * IN);
      for (let y = 0; y < IN; y++) {
        const sy = reflect(y0 - P + y, h);
        for (let x = 0; x < IN; x++) {
          const sx = reflect(x0 - P + x, w);
          const s = (sy * w + sx) * 3;
          const d = y * IN + x;
          tensor[d] = data[s] / 255;
          tensor[IN * IN + d] = data[s + 1] / 255;
          tensor[2 * IN * IN + d] = data[s + 2] / 255;
        }
      }
      const res = await session.run({ image: new ort.Tensor("float32", tensor, [1, 3, IN, IN]) });
      const o = res.upscaled_image.data;
      const cw = Math.min(T, w - x0), ch = Math.min(T, h - y0);
      for (let y = 0; y < ch * 4; y++) {
        for (let x = 0; x < cw * 4; x++) {
          const src = (P * 4 + y) * OUT + (P * 4 + x);
          const dst = ((y0 * 4 + y) * W + (x0 * 4 + x)) * 3;
          for (let c = 0; c < 3; c++) out[dst + c] = Math.max(0, Math.min(255, Math.round(o[c * OUT * OUT + src] * 255)));
        }
      }
    }
    if (ty % 2 === 1) process.stdout.write(`\r  ${Math.round(((ty + 1) / tilesY) * 100)}%  ${Math.round((Date.now() - started) / 1000)}s`);
  }
  const edge = w >= h ? { width: LONG_EDGE } : { height: LONG_EDGE };
  await sharp(out, { raw: { width: W, height: H, channels: 3 } })
    .resize({ ...edge, kernel: "lanczos3" })
    .sharpen({ sigma: 0.7, m1: 0.6, m2: 1.6 }) // làm nét nhẹ: mô hình đã tạo chi tiết, không cần làm nét mạnh
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(output);
  console.log(`\n${path.basename(input)} → ${path.basename(output)} (${LONG_EDGE}px) trong ${Math.round((Date.now() - started) / 1000)}s`);
})().catch((e) => { console.error("LỖI:", e.message); process.exit(1); });
