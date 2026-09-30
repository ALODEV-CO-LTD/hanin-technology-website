import { revalidatePath } from "next/cache";

/** Làm mới toàn bộ trang public sau khi nội dung CMS thay đổi. */
export function revalidateSite() {
  revalidatePath("/", "layout");
}
