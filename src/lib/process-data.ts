/**
 * Cấu trúc dữ liệu cho mục "Quy trình công đoạn" (trang Năng lực sản xuất).
 * Chỉ chứa KHOÁ và trình tự công đoạn; toàn bộ chữ nằm trong messages/{vi,zh,ko}/quy-trinh.json
 * (sửa được trong CMS → "Nội dung trang"). Thông số nội bộ (nồng độ, nhiệt độ, mã hoá chất, tên khách)
 * CỐ Ý không đưa lên website công khai.
 */
export type ProcessFamily = "quay" | "treo";
export type StepStage = "prep" | "plate" | "finish" | "qc";

export const STEP_STAGE: Record<string, StepStage> = {
  receive: "prep", vibroDegrease: "prep", ultrasonicDegrease: "prep", degrease: "prep", rinse: "prep", hcl: "prep",
  acid: "prep", activate: "prep", nickelStrike: "plate", whitening: "prep", copperStrike: "plate",
  nickelBright: "plate", nickelElectro: "plate", nickelChem: "plate", copperRed: "plate", phosphate: "plate",
  rustOil: "finish", oilSpin: "finish", protect: "finish", spinDry: "finish", dry: "finish",
  thickness: "qc", saltSpray: "qc", inspect: "qc", pack: "qc",
  // mạ treo (nhựa ABS)
  rackLoad: "prep", swell: "prep", etch: "prep", recovery: "prep", ultrasonicTank: "prep", neutralize: "prep",
  hclActivate: "prep", catalyst: "prep", colorCompare: "prep", accelerate: "prep", copperMatte: "plate",
  copperAcid: "plate", activateTank: "prep", nickelSemi: "plate", nickelSeal: "plate", preChrome: "prep",
  chrome: "plate", chrome3: "plate", satinNickel: "plate", regulator: "prep", hotRinse: "finish", unrack: "finish",
};

/** Công đoạn "rửa" hiển thị gọn một dòng. */
export const COMPACT_STEPS = new Set(["rinse", "recovery", "hotRinse"]);

export interface ProcessDef {
  id: string;
  family: ProcessFamily;
  steps: string[];
}

const R = "rinse";

export const PROCESSES: ProcessDef[] = [
  { id: "nikenHoaNenSat", family: "quay", steps: ["receive", "ultrasonicDegrease", R, "hcl", R, "acid", R, "nickelStrike", R, "activate", "nickelChem", R, "protect", R, "spinDry", "dry", "thickness", "saltSpray", "inspect", "pack"] },
  { id: "nikenDienNenSat", family: "quay", steps: ["receive", "ultrasonicDegrease", R, "hcl", R, "activate", R, "hcl", R, "nickelElectro", R, "protect", R, "spinDry", "dry", "thickness", "saltSpray", "inspect", "pack"] },
  { id: "nikenDienNenKem", family: "quay", steps: ["receive", "degrease", R, "spinDry", "acid", R, "whitening", R, "activate", R, "copperStrike", R, "activate", R, "nickelBright", R, "protect", R, "spinDry", "dry", "thickness", "saltSpray", "inspect", "pack"] },
  { id: "nikenDienNenDong", family: "quay", steps: ["receive", "ultrasonicDegrease", R, "hcl", R, "activate", R, "acid", R, "nickelElectro", R, "protect", R, "spinDry", "dry", "thickness", "saltSpray", "inspect", "pack"] },
  { id: "nikenHoaNenInox", family: "quay", steps: ["receive", "ultrasonicDegrease", R, "hcl", R, "activate", R, "acid", R, "nickelStrike", R, "activate", "nickelChem", R, "protect", R, "spinDry", "dry", "thickness", "saltSpray", "inspect", "pack"] },
  { id: "nikenDenNenInox", family: "quay", steps: ["receive", "ultrasonicDegrease", R, "hcl", R, "activate", R, "acid", R, "nickelStrike", R, "activate", "nickelChem", R, "protect", R, "spinDry", "dry", "thickness", "saltSpray", "inspect", "pack"] },
  { id: "dongDo", family: "quay", steps: ["receive", "vibroDegrease", "ultrasonicDegrease", R, "hcl", R, "acid", R, "copperRed", R, "protect", R, "spinDry", "dry", "thickness", "saltSpray", "inspect", "pack"] },
  { id: "photPhatDen", family: "quay", steps: ["receive", "vibroDegrease", "ultrasonicDegrease", R, "hcl", R, "phosphate", R, "spinDry", "dry", "rustOil", "oilSpin", "thickness", "saltSpray", "inspect", "pack"] },
  { id: "treoNikenCrom", family: "treo", steps: ["rackLoad", "degrease", R, "swell", "etch", "recovery", R, "ultrasonicTank", "neutralize", R, "hclActivate", "catalyst", R, "accelerate", R, "nickelChem", R, "copperMatte", "copperAcid", R, "activateTank", R, "nickelSemi", "nickelBright", "recovery", "nickelSeal", "recovery", R, "preChrome", "chrome", "recovery", R, "ultrasonicTank", R, "hotRinse", "dry", "unrack", "thickness", "saltSpray", "inspect", "pack"] },
  { id: "treoSatin", family: "treo", steps: ["rackLoad", "degrease", R, "swell", "etch", "recovery", R, "ultrasonicTank", "neutralize", R, "hclActivate", "catalyst", R, "accelerate", R, "nickelChem", R, "copperMatte", "copperAcid", R, "activateTank", R, "nickelSemi", "nickelBright", "recovery", "nickelSeal", "recovery", R, "activateTank", R, "satinNickel", "recovery", R, "preChrome", "chrome", "recovery", R, "ultrasonicTank", R, "hotRinse", "dry", "unrack", "thickness", "saltSpray", "inspect", "pack"] },
  { id: "treoCr3Den", family: "treo", steps: ["rackLoad", "degrease", R, "etch", "recovery", R, "regulator", R, "ultrasonicTank", "neutralize", R, "hclActivate", "catalyst", "colorCompare", R, "accelerate", R, "nickelChem", R, "copperMatte", "copperAcid", R, "nickelSemi", "nickelBright", "recovery", "nickelSeal", "recovery", R, "activateTank", R, "chrome3", R, "protect", R, "ultrasonicTank", R, "dry", "unrack", "thickness", "saltSpray", "inspect", "pack"] },
];

