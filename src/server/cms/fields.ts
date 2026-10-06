import type { I18nText } from "../i18n";

export type FieldType =
  | "text"
  | "textarea"
  | "i18n-text"
  | "i18n-textarea"
  | "image"
  | "select"
  | "boolean"
  | "number"
  | "date"
  | "list";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  maxLength?: number;
  options?: SelectOption[];
  /** Với type "list": các trường con của mỗi phần tử. */
  itemFields?: FieldDef[];
  /** Với type "list": giới hạn số phần tử (mặc định 30). */
  maxItems?: number;
  /** Với type "number": giá trị nhỏ nhất (mặc định 0, không cho số âm) và lớn nhất. */
  min?: number;
  max?: number;
  /** Giá trị mặc định khi tạo mới. */
  defaultValue?: unknown;
  /** true: nhập tự sinh slug từ tiêu đề nếu để trống. */
  slugOf?: string;
}

export interface ResourceDef {
  key: string;
  table: string;
  label: string;
  singular: string;
  icon: string;
  description?: string;
  fields: FieldDef[];
  /** Cột hiển thị ở danh sách. */
  listColumns: string[];
  /** Cột dùng cho ô tìm kiếm (chỉ cột text/i18n). */
  searchFields?: string[];
  orderBy: string;
  /** Trường dùng làm tiêu đề bản ghi trong danh sách. */
  titleField: string;
  /** Có trường `active`/`status` để ẩn hiện không. */
  publishField?: string;
}

export type RecordValue = string | number | boolean | I18nText | Record<string, unknown>[] | null;
export interface CmsRecord {
  id: number;
  [field: string]: RecordValue | undefined;
}
