/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { type Disposable } from '@flowgram.ai/utils';

export class PlaygroundSchedule implements Disposable {
  protected pendingExecMap: Map<any, () => void> = new Map();

  private animationFrame: number | undefined;

  private microtaskScheduled = false;

  push(key: any, fn: () => void): void {
    if (process.env.NODE_ENV === 'test') {
      fn();
      return;
    }
    this.pendingExecMap.set(key, fn);
    this.scheduleFlush();
  }

  private scheduleFlush(): void {
    if (typeof requestAnimationFrame === 'function') {
      if (this.animationFrame !== undefined) {
        return;
      }
      this.animationFrame = requestAnimationFrame(() => {
        this.animationFrame = undefined;
        this.flush();
      });
      return;
    }

    if (this.microtaskScheduled) {
      return;
    }
    this.microtaskScheduled = true;
    Promise.resolve().then(() => {
      this.microtaskScheduled = false;
      this.flush();
    });
  }

  private flush(): void {
    if (!this.pendingExecMap.size) {
      return;
    }
    const execList = Array.from(this.pendingExecMap.values());
    this.pendingExecMap.clear();
    execList.forEach((fn) => fn());
  }

  dispose(): void {
    this.pendingExecMap.clear();
    if (this.animationFrame !== undefined && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = undefined;
    }
    this.microtaskScheduled = false;
  }
}
