import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { getSettings } from "@/server/settings";

/** Nút tải hồ sơ năng lực: dùng link PDF cấu hình trong CMS, chưa có thì chuyển tới form liên hệ. */
export default function ProfileLink({ className, children }: { className?: string; children: ReactNode }) {
  const { profileUrl } = getSettings();
  if (profileUrl) {
    return (
      <a href={profileUrl} className={className} target="_blank" rel="noopener noreferrer" download>
        {children}
      </a>
    );
  }
  return (
    <Link href="/lien-he#rfq-form" className={className}>
      {children}
    </Link>
  );
}
