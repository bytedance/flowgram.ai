/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { type Disposable } from '@flowgram.ai/utils';

type Subscriber = () => void;

let currentTracking: Set<Signal<any>> | undefined;
let batchDepth = 0;
const pendingEffects = new Set<ReactiveEffect>();

/**
 * Lightweight signal primitive for fine-grained reactivity.
 * When read inside a tracked scope, automatically registers dependency.
 */
export class Signal<T> {
  private _value: T;

  private _version = 0;

  private _subscribers = new Set<ReactiveEffect>();

  constructor(value: T) {
    this._value = value;
  }

  get value(): T {
    if (currentTracking) {
      currentTracking.add(this);
    }
    return this._value;
  }

  set value(newValue: T) {
    if (Object.is(this._value, newValue)) return;
    this._value = newValue;
    this._version++;
    this._notify();
  }

  get version(): number {
    return this._version;
  }

  peek(): T {
    return this._value;
  }

  subscribe(effect: ReactiveEffect): void {
    this._subscribers.add(effect);
  }

  unsubscribe(effect: ReactiveEffect): void {
    this._subscribers.delete(effect);
  }

  private _notify(): void {
    for (const effect of this._subscribers) {
      if (batchDepth > 0) {
        pendingEffects.add(effect);
      } else {
        effect.run();
      }
    }
  }
}

/**
 * Computed signal - lazily derives value from other signals.
 */
export class Computed<T> {
  private _value: T | undefined;

  private _dirty = true;

  private _deps = new Set<Signal<any>>();

  private _effect: ReactiveEffect;

  constructor(private _fn: () => T) {
    this._effect = new ReactiveEffect(() => {
      this._dirty = true;
    });
  }

  get value(): T {
    if (currentTracking) {
      // Propagate tracking
      for (const dep of this._deps) {
        currentTracking.add(dep);
      }
    }
    if (this._dirty) {
      this._recompute();
    }
    return this._value!;
  }

  private _recompute(): void {
    // Unsubscribe from old deps
    for (const dep of this._deps) {
      dep.unsubscribe(this._effect);
    }
    this._deps.clear();

    // Track new deps
    const prevTracking = currentTracking;
    currentTracking = new Set();
    try {
      this._value = this._fn();
    } finally {
      this._deps = currentTracking;
      currentTracking = prevTracking;
    }

    // Subscribe to new deps
    for (const dep of this._deps) {
      dep.subscribe(this._effect);
    }
    this._dirty = false;
  }

  dispose(): void {
    for (const dep of this._deps) {
      dep.unsubscribe(this._effect);
    }
    this._deps.clear();
  }
}

/**
 * Reactive effect - re-runs when its tracked signals change.
 */
export class ReactiveEffect implements Disposable {
  private _fn: Subscriber;

  private _deps = new Set<Signal<any>>();

  private _active = true;

  private _scheduled = false;

  constructor(fn: Subscriber) {
    this._fn = fn;
  }

  run(): void {
    if (!this._active) return;
    if (this._scheduled) return;
    this._scheduled = true;
    queueMicrotask(() => {
      this._scheduled = false;
      if (!this._active) return;
      this._execute();
    });
  }

  runSync(): void {
    if (!this._active) return;
    this._execute();
  }

  private _execute(): void {
    // Cleanup old deps
    for (const dep of this._deps) {
      dep.unsubscribe(this);
    }
    this._deps.clear();

    // Track new deps
    const prevTracking = currentTracking;
    currentTracking = new Set();
    try {
      this._fn();
    } finally {
      this._deps = currentTracking;
      currentTracking = prevTracking;
    }

    // Subscribe to new deps
    for (const dep of this._deps) {
      dep.subscribe(this);
    }
  }

  dispose(): void {
    this._active = false;
    for (const dep of this._deps) {
      dep.unsubscribe(this);
    }
    this._deps.clear();
  }
}

/**
 * Batch multiple signal updates into a single flush.
 */
export function batch(fn: () => void): void {
  batchDepth++;
  try {
    fn();
  } finally {
    batchDepth--;
    if (batchDepth === 0) {
      const effects = Array.from(pendingEffects);
      pendingEffects.clear();
      for (const effect of effects) {
        effect.run();
      }
    }
  }
}

/**
 * Create a signal.
 */
export function signal<T>(value: T): Signal<T> {
  return new Signal(value);
}

/**
 * Create a computed signal.
 */
export function computed<T>(fn: () => T): Computed<T> {
  return new Computed(fn);
}

/**
 * Create an effect that auto-tracks signal dependencies.
 */
export function effect(fn: () => void): Disposable {
  const e = new ReactiveEffect(fn);
  e.runSync();
  return e;
}
