"use client";

/**
 * KHO HOP THOAI TOAN CUC - thay cho confirm() / alert() / prompt() cua trinh duyet.
 *
 * VI SAO BO POPUP MAC DINH: hop thoai cua trinh duyet do HE DIEU HANH ve, nen no
 * (1) khong theo duoc mau/chu/bo goc cua toa soan - moi he mot kieu, xau va la;
 * (2) KHOA CUNG ca tab (modal dong bo) - dang chay viec gi cung dung het;
 * (3) khong dat lai duoc chu nut (luon "OK"/"Cancel", khong noi duoc "Xoa bai"
 *     hay "Giu lai"), nen nguoi dung phai doan hanh dong;
 * (4) hien nguyen URL localhost o tren dinh - lo ky thuat, thieu chuyen nghiep;
 * (5) trinh duyet CHAN neu goi nhieu lan hoac ngoai cu chi nguoi dung - thao tac
 *     im lang khong chay ma khong bao gi.
 *
 * Cach dung - GIONG HET ban goc, chi them `await`:
 *   if (!(await ask.confirm({ title: "Xoa bai nay?" }))) return;
 *   await ask.alert({ title: "Chua chon bai nao" });
 *   const ten = await ask.prompt({ title: "Ten chuyen muc" });   // null = bam Huy
 *
 * Bat chuoc y nguyen mo hinh cua `components/toast/store.ts`: singleton cap module
 * + useSyncExternalStore, nen goi duoc tu BAT KY dau trong client (ke ca ngoai cay
 * React, trong handler async), khong can bocValue Provider.
 */

export type DialogKind = "confirm" | "alert" | "prompt";

export type DialogRequest = {
  id: number;
  kind: DialogKind;
  /** Cau hoi chinh - in dam, ngan gon. */
  title: string;
  /** Giai thich them (hau qua, so luong bi anh huong). Khong bat buoc. */
  message?: string;
  /** Chu tren nut dong y. Mac dinh doi theo `kind`. */
  confirmLabel?: string;
  /** Chu tren nut huy. Mac dinh "Huy". */
  cancelLabel?: string;
  /**
   * Viec KHONG DAO NGUOC duoc (xoa han, go khoi site) -> nut do canh bao.
   * Viec thuong (luu, gui duyet) de mac dinh.
   */
  danger?: boolean;
  /** Rieng `prompt`: gia tri dien san + goi y trong o nhap. */
  defaultValue?: string;
  placeholder?: string;
  /** Rieng `prompt`: bat buoc nhap (nut dong y mo cho toi khi co chu). */
  required?: boolean;
  /** Rieng `prompt`: o nhap nhieu dong (ly do bien tap, ghi chu...). */
  multiline?: boolean;
};

/** confirm -> boolean | alert -> true | prompt -> chuoi da nhap, hoac null neu Huy. */
export type DialogResult = boolean | string | null;

type Pending = DialogRequest & { resolve: (v: DialogResult) => void };

let current: Pending | null = null;
let seq = 1;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getSnapshot(): Pending | null {
  return current;
}

/** Server render: chua co hop thoai nao - tra cung mot tham chieu de khong lap vo han. */
export function getServerSnapshot(): Pending | null {
  return null;
}

/** <DialogHost/> goi khi nguoi dung chot hoac huy. */
export function closeDialog(value: DialogResult) {
  const c = current;
  current = null;
  emit();
  c?.resolve(value);
}

function open(req: Omit<DialogRequest, "id">): Promise<DialogResult> {
  return new Promise((resolve) => {
    /**
     * Dang mo mot hop thoai khac ma lai goi tiep: dong cai cu theo huong AN TOAN
     * (coi nhu Huy) roi mo cai moi. Khong xep hang - hoi don nguoi dung hai cau
     * chong len nhau thi ho khong the biet dang tra loi cau nao.
     */
    if (current) closeDialog(current.kind === "prompt" ? null : false);
    current = { ...req, id: seq++, resolve };
    emit();
  });
}

/**
 * API menh lenh - thay thang cho popup trinh duyet.
 *
 * LUU Y KIEU DU LIEU: moi ham tra ve dung mot kieu (boolean / string|null) nen noi
 * goi khong phai ep kieu. `confirm` tra `false` khi bam Huy hoac nhan Esc.
 */
export const ask = {
  /** Hoi co/khong. Tra `true` neu nguoi dung dong y. */
  confirm: (req: Omit<DialogRequest, "id" | "kind">): Promise<boolean> =>
    open({ ...req, kind: "confirm" }) as Promise<boolean>,

  /** Bao mot tin - chi co nut "Da hieu". Luon tra `true` khi dong. */
  alert: (req: Omit<DialogRequest, "id" | "kind">): Promise<boolean> =>
    open({ ...req, kind: "alert" }) as Promise<boolean>,

  /** Xin mot dong chu. Tra chuoi da nhap, hoac `null` neu nguoi dung huy. */
  prompt: (req: Omit<DialogRequest, "id" | "kind">): Promise<string | null> =>
    open({ ...req, kind: "prompt" }) as Promise<string | null>,
};
