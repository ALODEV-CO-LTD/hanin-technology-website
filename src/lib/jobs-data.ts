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
