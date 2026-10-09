"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

export const PAGE_FADE_REPLAY_EVENT = "hanin:page-fade-replay";

export default function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [replayTick, setReplayTick] = useState(0);
  const previous = useRef(pathname);

  useEffect(() => {
    const onReplay = () => setReplayTick((tick) => tick + 1);
    window.addEventListener(PAGE_FADE_REPLAY_EVENT, onReplay);
    return () => window.removeEventListener(PAGE_FADE_REPLAY_EVENT, onReplay);
  }, []);

  // Chuyển trang: về đầu trang ngay (không cuộn mượt từ vị trí cũ) trừ khi đường dẫn có #neo.
  useLayoutEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    if (window.location.hash) return;
    const html = document.documentElement;
    const behavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = behavior;
  }, [pathname]);

  return (
    <div key={`${pathname}-${replayTick}`} className="page-fade-in">
      {children}
    </div>
  );
}
