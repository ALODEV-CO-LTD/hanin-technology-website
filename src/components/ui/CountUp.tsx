"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function formatNumber(
  current: number,
  decimals: number,
  padStart: number,
  thousandsSeparator: string
): string {
  const fixed = current.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  let paddedInt = intPart.padStart(padStart, "0");

  if (thousandsSeparator) {
    paddedInt = paddedInt.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  }

  return decPart ? `${paddedInt}.${decPart}` : paddedInt;
}

export default function CountUp({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  padStart = 0,
  thousandsSeparator = "",
  duration = 1600,
  className = "",
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  padStart?: number;
  thousandsSeparator?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [animated, setAnimated] = useState(() => formatNumber(0, decimals, padStart, thousandsSeparator));
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
  // Người dùng giảm chuyển động: hiện thẳng giá trị cuối, không chạy hiệu ứng.
  const display = reducedMotion ? formatNumber(end, decimals, padStart, thousandsSeparator) : animated;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reducedMotion) return;

    let rafId = 0;

    const animate = () => {
      const start = performance.now();
      const from = 0;

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = from + (end - from) * eased;
        setAnimated(formatNumber(current, decimals, padStart, thousandsSeparator));
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    // Đang nằm trong màn hình ngay khi tải (ví dụ dải số liệu ở đáy banner): chạy luôn.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animate();
      return () => cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
            return;
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [end, decimals, padStart, thousandsSeparator, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
