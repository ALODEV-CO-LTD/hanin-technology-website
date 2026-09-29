export type JobDepartment = "engineering" | "production" | "qc" | "maintenance" | "sales";
export type JobType = "fulltime" | "shift" | "intern";
export type JobLocation = "factory" | "office";

export interface Job {
  id: string;
  title: string;
  departmentLabel: string;
  department: JobDepartment;
  typeLabel: string;
  type: JobType;
  locationLabel: string;
  location: JobLocation;
  salary: string;
  tags: string[];
  deadline: string;
  badgeClassName: string;
}

export const JOBS: Job[] = [
  {
    id: "ky-su-hoa-hoc-cong-nghe-ma",
    title: "Kỹ sư Hóa học / Công nghệ mạ kim loại",
    departmentLabel: "Khối Kỹ thuật & R&D",
    department: "engineering",
    typeLabel: "Toàn thời gian",
    type: "fulltime",
    locationLabel: "KCN Quang Minh, Hà Nội",
    location: "factory",
    salary: "Lương: 18 - 25 Triệu",
    tags: [
      "Kinh nghiệm: 2+ năm",
      "Bể mạ tự động PLC & Hóa học ENP",
      "Phân tích nồng độ dung dịch Hull Cell",
    ],
    deadline: "30/04/2026",
    badgeClassName: "bg-orange-100 text-orange-700",
  },
  {
    id: "truong-nhom-qa-qc",
    title: "Trưởng nhóm Quản lý chất lượng (QA/QC Leader)",
    departmentLabel: "Quản lý chất lượng (QA/QC)",
    department: "qc",
    typeLabel: "Toàn thời gian",
    type: "fulltime",
    locationLabel: "KCN Quang Minh, Hà Nội",
    location: "factory",
    salary: "Lương: 20 - 30 Triệu",
    tags: [
      "Chứng chỉ ISO 9001 / IATF 16949",
      "Đo kiểm XRF & Thử nghiệm Phun muối (Salt Spray)",
      "Kinh nghiệm: 3-5 năm",
    ],
    deadline: "15/05/2026",
    badgeClassName: "bg-slate-200 text-slate-700",
  },
  {
    id: "ky-thuat-vien-van-hanh-day-chuyen",
    title: "Kỹ thuật viên vận hành dây chuyền mạ tự động",
    departmentLabel: "Khối Sản xuất & Vận hành",
    department: "production",
    typeLabel: "Theo ca sản xuất (Xoay ca)",
    type: "shift",
    locationLabel: "KCN Quang Minh, Hà Nội",
    location: "factory",
    salary: "Lương: 10 - 15 Triệu + Phụ cấp ca",
    tags: [
      "Tốt nghiệp Trung cấp/Cao đẳng Cơ khí/Điện",
      "Giám sát hệ thống SCADA & cẩu chuyển tự động",
    ],
    deadline: "Tuyển liên tục",
    badgeClassName: "bg-orange-100 text-orange-700",
  },
  {
    id: "ky-su-bao-tri-co-dien-plc",
    title: "Kỹ sư Bảo trì cơ điện & hệ thống PLC",
    departmentLabel: "Bảo trì & Cơ điện (Maintenance)",
    department: "maintenance",
    typeLabel: "Toàn thời gian",
    type: "fulltime",
    locationLabel: "KCN Quang Minh, Hà Nội",
    location: "factory",
    salary: "Lương: 15 - 22 Triệu",
    tags: [
      "PLC Siemens S7-1200 / Mitsubishi",
      "Bảo trì nguồn Rectifier & Hệ thống lọc tuần hoàn",
    ],
    deadline: "25/04/2026",
    badgeClassName: "bg-slate-100 text-slate-600",
  },
  {
    id: "chuyen-vien-kinh-doanh-b2b",
    title: "Chuyên viên Kinh doanh dự án B2B (Cơ khí & gia công phụ trợ)",
    departmentLabel: "Kinh doanh & Phát triển thị trường",
    department: "sales",
    typeLabel: "Toàn thời gian",
    type: "fulltime",
    locationLabel: "Văn phòng & Nhà máy Hà Nội",
    location: "office",
    salary: "Lương cứng + Thưởng hoa hồng dự án",
    tags: [
      "Tiếng Anh hoặc Tiếng Hàn/Nhật giao tiếp",
      "Phát triển mạng lưới khách hàng FDI / OEM",
    ],
    deadline: "10/05/2026",
    badgeClassName: "bg-orange-100 text-orange-700",
  },
  {
    id: "thuc-tap-sinh-ky-thuat-co-khi-luyen-kim",
    title: "Thực tập sinh Kỹ thuật Cơ khí / Luyện kim",
    departmentLabel: "Khối Kỹ thuật & Công nghệ",
    department: "engineering",
    typeLabel: "Thực tập sinh (3 - 6 tháng)",
    type: "intern",
    locationLabel: "KCN Quang Minh, Hà Nội",
    location: "factory",
    salary: "Trợ cấp thực tập + Phụ cấp ăn trưa & đi lại",
    tags: [
      "Được đào tạo 1:1 cùng Kỹ sư trưởng nhà máy",
      "Cơ hội tiếp nhận nhân viên chính thức sau kỳ",
    ],
    deadline: "Tuyển thường xuyên",
    badgeClassName: "bg-slate-200 text-slate-700",
  },
];

export const DEPARTMENT_OPTIONS: { value: "all" | JobDepartment; label: string }[] = [
  { value: "all", label: "Tất cả phòng ban" },
  { value: "engineering", label: "Kỹ thuật & Công nghệ (R&D)" },
  { value: "production", label: "Sản xuất & Vận hành" },
  { value: "qc", label: "Quản lý chất lượng (QC/QA)" },
  { value: "maintenance", label: "Bảo trì & Cơ điện" },
  { value: "sales", label: "Kinh doanh B2B & Dự án" },
];

export const TYPE_OPTIONS: { value: "all" | JobType; label: string }[] = [
  { value: "all", label: "Tất cả hình thức" },
  { value: "fulltime", label: "Toàn thời gian (Full-time)" },
  { value: "shift", label: "Theo ca sản xuất (Xoay ca)" },
  { value: "intern", label: "Thực tập sinh kỹ thuật" },
];

export const LOCATION_OPTIONS: { value: "all" | JobLocation; label: string }[] = [
  { value: "all", label: "Tất cả địa điểm" },
  { value: "factory", label: "Nhà máy KCN Quang Minh, Hà Nội" },
  { value: "office", label: "Văn phòng & Nhà máy Hà Nội" },
];
