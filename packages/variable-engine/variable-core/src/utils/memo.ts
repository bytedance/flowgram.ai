/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

type KeyType = string | symbol;

/**
 * Create memo manager
 * @returns
 */
export const createMemo = (): {
  <T>(key: KeyType, fn: () => T): T;
  clear: (key?: KeyType) => void;
} => {
  const _memoCache = new Map<KeyType, any>();

  const memo = <T>(key: KeyType, fn: () => T): T => {
    if (_memoCache.has(key)) {
      return _memoCache.get(key) as T;
    }
    const data = fn();
    _memoCache.set(key, data);
    return data as T;
  };

  const clear = (key?: KeyType) => {
    if (key) {
      _memoCache.delete(key);
    } else {
      _memoCache.clear();
    }
  };

  memo.clear = clear;

  return memo;
};
