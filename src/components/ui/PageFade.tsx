"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export const PAGE_FADE_REPLAY_EVENT = "hanin:page-fade-replay";

export default function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [replayTick, setReplayTick] = useState(0);

  useEffect(() => {
    const onReplay = () => setReplayTick((tick) => tick + 1);
    window.addEventListener(PAGE_FADE_REPLAY_EVENT, onReplay);
    return () => window.removeEventListener(PAGE_FADE_REPLAY_EVENT, onReplay);
  }, []);

  return (
    <div key={`${pathname}-${replayTick}`} className="page-fade-in">
      {children}
    </div>
  );
}
