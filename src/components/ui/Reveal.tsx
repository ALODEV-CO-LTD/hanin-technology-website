"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealDirection = "up" | "left" | "right";

export default function Reveal({
  children,
  delayMs = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delayMs?: number;
  direction?: RevealDirection;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const timer = setTimeout(() => setInView(true), delayMs);
            observer.disconnect();
            return () => clearTimeout(timer);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delayMs]);

  const directionClass = direction === "left" ? "reveal-dir-left" : direction === "right" ? "reveal-dir-right" : "";

  return (
    <div ref={ref} className={`reveal ${directionClass} ${inView ? "reveal-in" : ""} ${className}`}>
      {children}
    </div>
  );
}
