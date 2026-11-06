import { LucideIcon, CustomStrokeIcon } from "./LucideIcon";

/* Lucide v1 đã bỏ icon thương hiệu → vẽ lại cùng bộ nét (24x24, stroke) để đồng bộ với phần còn lại. */
const Facebook: [string, Record<string, string>][] = [
  ["path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" }],
];
const Youtube: [string, Record<string, string>][] = [
  ["path", { d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" }],
  ["path", { d: "m10 15 5-3-5-3z" }],
];
const Linkedin: [string, Record<string, string>][] = [
  ["path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }],
  ["rect", { width: "4", height: "12", x: "2", y: "9" }],
  ["circle", { cx: "4", cy: "4", r: "2" }],
];
const Instagram: [string, Record<string, string>][] = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5" }],
];

/* WeChat: hai bong bóng thoại chồng nhau; KakaoTalk: bong bóng thoại tròn có đuôi. Vẽ tay cùng bộ nét. */
const Wechat: [string, Record<string, string>][] = [
  ["path", { d: "M9.5 3C5.4 3 2 5.7 2 9.2c0 2 1.1 3.7 2.8 4.9L4 16.5l2.8-1.4c.9.3 1.8.4 2.7.4" }],
  ["path", { d: "M15.5 8.5c-3.6 0-6.5 2.3-6.5 5.2s2.9 5.3 6.5 5.3c.8 0 1.6-.1 2.3-.4L20.5 20l-.7-2.4c1.3-1 2.2-2.4 2.2-4 0-2.9-2.9-5.1-6.5-5.1z" }],
];
const Kakao: [string, Record<string, string>][] = [
  ["path", { d: "M12 3C6.5 3 2 6.4 2 10.6c0 2.7 1.8 5.1 4.5 6.4L5.6 21l4.4-2.7c.7.1 1.3.2 2 .2 5.5 0 10-3.4 10-7.6S17.5 3 12 3z" }],
];

/**
 * Bộ icon duy nhất của website: file SVG Lucide (src/assets/lucide) nhúng qua LucideIcon, nét 1.75, bo tròn.
 * Giữ nguyên tên Material cũ làm khoá để dữ liệu CMS/seed đã lưu `icon: "science"`… vẫn chạy.
 * Thêm icon: tải SVG Lucide vào src/assets/lucide, chạy `node scripts/build-lucide.mjs`, khai một dòng trong MAP.
 */
const MAP: Record<string, string> = {
  arrow_back: "arrow-left",
  arrow_downward: "arrow-down",
  arrow_forward: "arrow-right",
  east: "arrow-right",
  attach_file: "paperclip",
  biotech: "microscope",
  calendar_month: "calendar-days",
  calendar_today: "calendar-days",
  call: "phone",
  card_giftcard: "hand-coins",
  chat: "message-circle",
  check_circle: "circle-check",
  chevron_left: "chevron-left",
  chevron_right: "chevron-right",
  cleaning_services: "spray-can",
  close: "x",
  cloud_upload: "upload",
  construction: "construction",
  cyclone: "wind",
  directions_boat: "ship",
  directions_car: "car",
  domain_verification: "search-check",
  download: "download",
  eco: "leaf",
  electric_meter: "zap",
  engineering: "hard-hat",
  error: "circle-alert",
  expand_more: "chevron-down",
  fact_check: "clipboard-check",
  factory: "factory",
  file_present: "file-check",
  filter_alt: "funnel",
  flight_takeoff: "plane-takeoff",
  forward_to_inbox: "mail-plus",
  fullscreen: "maximize",
  handshake: "handshake",
  health_and_safety: "shield-plus",
  image: "image",
  inventory_2: "package",
  keyboard_arrow_up: "chevron-up",
  language: "globe",
  layers: "layers",
  library_books: "library-big",
  local_fire_department: "flame",
  location_on: "map-pin",
  location_city: "building-2",
  lock: "lock",
  mail: "mail",
  mark_email_read: "mail-check",
  mark_email_unread: "inbox",
  memory: "cpu",
  menu: "menu",
  menu_book: "book-open",
  model_training: "graduation-cap",
  newspaper: "newspaper",
  open_in_new: "external-link",
  person: "user",
  phone_in_talk: "phone-call",
  precision_manufacturing: "cog",
  progress_activity: "loader-circle",
  request_quote: "file-text",
  rule: "list-checks",
  schedule: "clock",
  science: "flask-conical",
  search: "search",
  security: "shield",
  send: "send",
  sensors: "radar",
  shield: "shield",
  shield_with_heart: "shield-check",
  straighten: "ruler",
  support_agent: "headset",
  terminal: "terminal",
  trending_up: "trending-up",
  tune: "sliders-horizontal",
  upload_file: "file-up",
  valve: "cylinder",
  verified: "badge-check",
  verified_user: "shield-check",
  water: "waves",
  water_drop: "droplet",
  water_ec: "droplets",
  work: "briefcase",
  workspace_premium: "award",
  zoom_in: "zoom-in",
  // Mạng xã hội / kênh liên hệ (khoá = tên kênh trong CMS)
  zalo: "message-circle",
  wechat: "brand:wechat",
  kakao: "brand:kakao",
  facebook: "brand:facebook",
  youtube: "brand:youtube",
  linkedin: "brand:linkedin",
  instagram: "brand:instagram",
};

const BRAND: Record<string, [string, Record<string, string>][]> = {
  "brand:facebook": Facebook,
  "brand:youtube": Youtube,
  "brand:linkedin": Linkedin,
  "brand:instagram": Instagram,
  "brand:wechat": Wechat,
  "brand:kakao": Kakao,
};

const HAS_SIZE = /(^|\s)text-(\[\d|xs\b|sm\b|base\b|lg\b|xl\b|\dxl\b)/;

export default function Icon({ name, className = "" }: { name: string; className?: string }) {
  const file = MAP[name] ?? "circle-question-mark";
  const common = {
    width: "1.3em",
    height: "1.3em",
    strokeWidth: 1.75,
    // Giữ nét 1.75px cố định theo mọi kích thước.
    className: `inline-block shrink-0 align-middle [&_*]:[vector-effect:non-scaling-stroke] ${className}`.trim(),
    style: HAS_SIZE.test(className) ? undefined : { fontSize: 24 },
  };
  const brand = BRAND[file];
  return brand ? <CustomStrokeIcon nodes={brand} {...common} /> : <LucideIcon name={file} {...common} />;
}
