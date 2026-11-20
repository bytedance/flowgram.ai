/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export type MotionDuration = "snap" | "control" | "panel";
const fallback = { snap: 120, control: 200, panel: 300 };

export function motionDuration(kind: MotionDuration): number {
  if (typeof document === "undefined") return 0;
  const root = document.documentElement;
  if (
    root.dataset.motion === "reduced" ||
    (root.dataset.motion !== "full" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  )
    return 0;
  const value = getComputedStyle(root)
    .getPropertyValue(`--motion-${kind}`)
    .trim();
  const duration = Number.parseFloat(value);
  return Number.isFinite(duration)
    ? Math.max(0, duration * (value.endsWith("ms") ? 1 : 1000))
    : fallback[kind];
}

export function motionEasing(): string {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--ease-surface")
      .trim() || "ease-out"
  );
}

export function observeMotionPreference(listener: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const observer = new MutationObserver(listener);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  media.addEventListener("change", listener);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", listener);
  };
}
