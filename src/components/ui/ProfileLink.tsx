import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { getSettings } from "@/server/settings";
import ProfileUnavailable from "@/components/ui/ProfileUnavailable";

/** Nút tải hồ sơ năng lực: dùng link PDF cấu hình trong CMS; chưa có file thì chỉ hiện thông báo, không chuyển trang. */
export default function ProfileLink({ className, children }: { className?: string; children: ReactNode }) {
  const t = useTranslations("Common");
  const { profileUrl } = getSettings();
  if (profileUrl) {
    return (
      <a href={profileUrl} className={className} target="_blank" rel="noopener noreferrer" download>
        {children}
      </a>
    );
  }
  return (
    <ProfileUnavailable className={className} message={t("profileUnavailable")}>
      {children}
    </ProfileUnavailable>
  );
}
