"use client";

import { useEffect, useRef, useState } from "react";

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
  const [display, setDisplay] = useState(() => formatNumber(0, decimals, padStart, thousandsSeparator));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplay(formatNumber(end, decimals, padStart, thousandsSeparator));
      return;
    }

    let rafId = 0;

    const animate = () => {
      const start = performance.now();
      const from = 0;

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = from + (end - from) * eased;
        setDisplay(formatNumber(current, decimals, padStart, thousandsSeparator));
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };

      rafId = requestAnimationFrame(tick);
    };

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
      { threshold: 0.3, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, decimals, padStart, thousandsSeparator, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
