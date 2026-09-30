// Bản chụp nội dung tĩnh cũ của website, chỉ dùng cho scripts/seed.ts để nạp dữ liệu ban đầu vào CMS.
// Website đang chạy KHÔNG import file này.
import type { useTranslations } from "next-intl";

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

type TuyenDungT = ReturnType<typeof useTranslations<"TuyenDung">>;

export function getJobs(t: TuyenDungT): Job[] {
  return [
    {
      id: "ky-su-hoa-hoc-cong-nghe-ma",
      title: t("jobs.0.title"),
      departmentLabel: t("jobs.0.departmentLabel"),
      department: "engineering",
      typeLabel: t("jobs.0.typeLabel"),
      type: "fulltime",
      locationLabel: t("jobs.0.locationLabel"),
      location: "factory",
      salary: t("jobs.0.salary"),
      tags: [t("jobs.0.tags.0"), t("jobs.0.tags.1"), t("jobs.0.tags.2")],
      deadline: t("jobs.0.deadline"),
      badgeClassName: "bg-orange-100 text-orange-700",
    },
    {
      id: "truong-nhom-qa-qc",
      title: t("jobs.1.title"),
      departmentLabel: t("jobs.1.departmentLabel"),
      department: "qc",
      typeLabel: t("jobs.1.typeLabel"),
      type: "fulltime",
      locationLabel: t("jobs.1.locationLabel"),
      location: "factory",
      salary: t("jobs.1.salary"),
      tags: [t("jobs.1.tags.0"), t("jobs.1.tags.1"), t("jobs.1.tags.2")],
      deadline: t("jobs.1.deadline"),
      badgeClassName: "bg-slate-200 text-slate-700",
    },
    {
      id: "ky-thuat-vien-van-hanh-day-chuyen",
      title: t("jobs.2.title"),
      departmentLabel: t("jobs.2.departmentLabel"),
      department: "production",
      typeLabel: t("jobs.2.typeLabel"),
      type: "shift",
      locationLabel: t("jobs.2.locationLabel"),
      location: "factory",
      salary: t("jobs.2.salary"),
      tags: [t("jobs.2.tags.0"), t("jobs.2.tags.1")],
      deadline: t("jobs.2.deadline"),
      badgeClassName: "bg-orange-100 text-orange-700",
    },
    {
      id: "ky-su-bao-tri-co-dien-plc",
      title: t("jobs.3.title"),
      departmentLabel: t("jobs.3.departmentLabel"),
      department: "maintenance",
      typeLabel: t("jobs.3.typeLabel"),
      type: "fulltime",
      locationLabel: t("jobs.3.locationLabel"),
      location: "factory",
      salary: t("jobs.3.salary"),
      tags: [t("jobs.3.tags.0"), t("jobs.3.tags.1")],
      deadline: t("jobs.3.deadline"),
      badgeClassName: "bg-slate-100 text-slate-600",
    },
    {
      id: "chuyen-vien-kinh-doanh-b2b",
      title: t("jobs.4.title"),
      departmentLabel: t("jobs.4.departmentLabel"),
      department: "sales",
      typeLabel: t("jobs.4.typeLabel"),
      type: "fulltime",
      locationLabel: t("jobs.4.locationLabel"),
      location: "office",
      salary: t("jobs.4.salary"),
      tags: [t("jobs.4.tags.0"), t("jobs.4.tags.1")],
      deadline: t("jobs.4.deadline"),
      badgeClassName: "bg-orange-100 text-orange-700",
    },
    {
      id: "thuc-tap-sinh-ky-thuat-co-khi-luyen-kim",
      title: t("jobs.5.title"),
      departmentLabel: t("jobs.5.departmentLabel"),
      department: "engineering",
      typeLabel: t("jobs.5.typeLabel"),
      type: "intern",
      locationLabel: t("jobs.5.locationLabel"),
      location: "factory",
      salary: t("jobs.5.salary"),
      tags: [t("jobs.5.tags.0"), t("jobs.5.tags.1")],
      deadline: t("jobs.5.deadline"),
      badgeClassName: "bg-slate-200 text-slate-700",
    },
  ];
}

export function getDepartmentOptions(t: TuyenDungT): { value: "all" | JobDepartment; label: string }[] {
  return [
    { value: "all", label: t("departmentOptions.all") },
    { value: "engineering", label: t("departmentOptions.engineering") },
    { value: "production", label: t("departmentOptions.production") },
    { value: "qc", label: t("departmentOptions.qc") },
    { value: "maintenance", label: t("departmentOptions.maintenance") },
    { value: "sales", label: t("departmentOptions.sales") },
  ];
}

export function getTypeOptions(t: TuyenDungT): { value: "all" | JobType; label: string }[] {
  return [
    { value: "all", label: t("typeOptions.all") },
    { value: "fulltime", label: t("typeOptions.fulltime") },
    { value: "shift", label: t("typeOptions.shift") },
    { value: "intern", label: t("typeOptions.intern") },
  ];
}

export function getLocationOptions(t: TuyenDungT): { value: "all" | JobLocation; label: string }[] {
  return [
    { value: "all", label: t("locationOptions.all") },
    { value: "factory", label: t("locationOptions.factory") },
    { value: "office", label: t("locationOptions.office") },
  ];
}
