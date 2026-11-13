/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { afterEach, describe, expect, it, vi } from "vitest";

import { motionDuration, motionEasing } from "./motion";

afterEach(() => vi.unstubAllGlobals());
function environment(mode: string, systemReduced: boolean, duration = "300ms") {
  vi.stubGlobal("document", { documentElement: { dataset: { motion: mode } } });
  vi.stubGlobal("window", { matchMedia: () => ({ matches: systemReduced }) });
  vi.stubGlobal("getComputedStyle", () => ({
    getPropertyValue: () => duration,
  }));
}
describe("layout motion policy", () => {
  it("honors system reduction and explicit application preferences", () => {
    environment("system", true);
    expect(motionDuration("panel")).toBe(0);
    environment("full", true);
    expect(motionDuration("panel")).toBe(300);
    environment("reduced", false);
    expect(motionDuration("panel")).toBe(0);
  });
  it("uses the same CSS duration tokens for retention and size interpolation", () => {
    environment("system", false, "0.2s");
    expect(motionDuration("control")).toBe(200);
    environment("system", false, "120ms");
    expect(motionDuration("snap")).toBe(120);
    environment("system", false, "");
    expect(motionDuration("panel")).toBe(300);
    environment("system", false, "-1s");
    expect(motionDuration("panel")).toBe(0);
  });
  it("keeps the shared easing and supports non-browser rendering", () => {
    environment("system", false, "cubic-bezier(.19,1,.22,1)");
    expect(motionEasing()).toBe("cubic-bezier(.19,1,.22,1)");
    vi.stubGlobal("document", undefined);
    expect(motionDuration("panel")).toBe(0);
  });
});
