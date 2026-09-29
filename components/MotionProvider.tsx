"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Hormati prefers-reduced-motion untuk semua animasi Motion.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
