/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * @jest-environment jsdom
 */
import { describe, beforeEach, test, expect } from 'vitest';

import { delay } from './promise-util';
import { Cache, type CacheOriginItem } from './cache';

interface Item extends CacheOriginItem {
  key: string | number;
}

let _uid = 0;
function itemFactory(): Cache<Item> {
  const item: Item = {
    key: `${_uid++}`,
  };
  return item;
}

function dispose() {}

function itemWithDisposeFactory(): Cache<Item> {
  const item: Item = {
    key: `${_uid++}`,
  };
  Cache.assign(item, { dispose });
  return item;
}

describe('cache', () => {
  beforeEach(() => {
    _uid = 0;
  });

  test('Cache/getFromCache', async () => {
    const cache = Cache.create<Item>(itemFactory);
    expect(cache.getFromCache()).toEqual([]);
  });

  test('Cache/get', async () => {
    const cache = Cache.create<Item>(itemFactory);
    expect(cache.get()).toEqual({ key: '0' });
    expect(cache.get()).toEqual({ key: '0' });
  });

  test('Cache/getMore', async () => {
    const cache = Cache.create<Item>(itemFactory);
    expect(cache.get()).toEqual({ key: '0' });
    expect(cache.getMore(1)).toEqual([{ key: '0' }]);
    expect(cache.getMore(2)).toEqual([{ key: '0' }, { key: '1' }]);
    expect(cache.getMore(1)).toEqual([{ key: '0' }]);
    expect(cache.getMore(2)).toEqual([{ key: '0' }, { key: '2' }]);
    expect(cache.getMore(1, false)).toEqual([{ key: '0' }]);
    expect(cache.getMore(3)).toEqual([{ key: '0' }, { key: '2' }, { key: '3' }]);
  });

  test('Cache/getMore/deleteLimit', async () => {
    const cache = Cache.create<Item>(itemFactory, { deleteLimit: 2 });
    expect(cache.getMore(4)).toEqual([{ key: '0' }, { key: '1' }, { key: '2' }, { key: '3' }]);
    expect(cache.getMore(1)).toEqual([{ key: '0' }]);
    expect(cache.getMore(2)).toEqual([{ key: '0' }, { key: '4' }]);
  });

  test('Cache/getFromCacheByKey', async () => {
    const cache = Cache.create<Item>(itemFactory);
    expect(cache.get()).toEqual({ key: '0' });
    expect(cache.getFromCacheByKey('0')).toEqual({ key: '0' });
    expect(cache.getFromCacheByKey('1')).toEqual(undefined);
  });

  test('Cache/getMoreByItemKeys', async () => {
    const cache = Cache.create<Item>(itemFactory);
    const items = cache.getMoreByItemKeys([{ key: '0' }, { key: '1' }]);
    expect(items).toEqual([{ key: '0' }, { key: '1' }]);
    // cache.clear()
    items[0].key = undefined as any;
    (items[0] as any).dispose = dispose;
    expect(cache.getMoreByItemKeys([{ key: '1' }])).toEqual([{ key: '1' }]);
  });

  test('Cache/getMoreByItems', async () => {
    const cache = Cache.create<Item>(itemFactory);
    const item1 = { key: '1' };
    const items = cache.getMoreByItems([{ key: '0' }, item1]);
    expect(items).toEqual([{ key: { key: '0' } }, { key: { key: '1' } }]);
    expect(cache.getMoreByItems([item1])).toEqual([{ key: { key: '1' } }]);

    expect(cache.getMoreByItems([{ key: '1' }])).toEqual([{ key: { key: '1' } }]);
    // // cache.clear()
    items[0].key = undefined as any;
    (items[0] as any).dispose = dispose;
    expect(cache.getMoreByItems([{ key: '1' }])).toEqual([{ key: { key: '1' } }]);
    // expect(cache.getMoreByItems([{ key: '2' }])).toEqual([{ key: { key: '2' } }]);
  });

  test('Cache/clear', async () => {
    const cache = Cache.create<Item>(itemFactory);
    expect(cache.getMore(2)).toEqual([{ key: '0' }, { key: '1' }]);
    expect(cache.get()).toEqual({ key: '0' });
    cache.clear();
    expect(cache.get()).toEqual({ key: '2' });
  });

  test('Cache/disposes', async () => {
    const cache = Cache.create<Item>(itemWithDisposeFactory);
    expect(cache.getMore(2)).toEqual([
      { key: '0', dispose },
      { key: '1', dispose },
    ]);
    expect(cache.getMore(1)).toEqual([{ key: '0', dispose }]);

    cache.dispose();
    expect(cache.getMore(2)).toEqual([
      { key: '2', dispose },
      { key: '3', dispose },
    ]);
    expect(cache.getMoreByItemKeys([{ key: '2' }])).toEqual([{ key: '2', dispose }]);
  });

  test('createShortCache', async () => {
    const cache = Cache.createShortCache(10);
    let id = 0;
    const getValue = () => ++id;
    expect(cache.get(getValue)).toEqual(1);
    expect(cache.get(getValue)).toEqual(1);
    await delay(20);
    expect(cache.get(getValue)).toEqual(2);

    const cache1 = Cache.createShortCache();
    expect(cache1.get(getValue)).toEqual(3);
  });

  test('createShortCache falsy values and dispose', async () => {
    const cache = Cache.createShortCache<boolean>(500);
    let computeCount = 0;
    const getFalse = () => {
      computeCount++;
      return false;
    };
    expect(cache.get(getFalse)).toBe(false);
    expect(cache.get(getFalse)).toBe(false);
    expect(computeCount).toBe(1);

    const zeroCache = Cache.createShortCache<number>(500);
    let zeroCount = 0;
    expect(zeroCache.get(() => { zeroCount++; return 0; })).toBe(0);
    expect(zeroCache.get(() => { zeroCount++; return 0; })).toBe(0);
    expect(zeroCount).toBe(1);

    const emptyCache = Cache.createShortCache<string>(500);
    let emptyCount = 0;
    expect(emptyCache.get(() => { emptyCount++; return ''; })).toBe('');
    expect(emptyCache.get(() => { emptyCount++; return ''; })).toBe('');
    expect(emptyCount).toBe(1);

    cache.dispose();
    zeroCache.dispose();
    emptyCache.dispose();
  });

  test('createWeakCache', async () => {
    const cache = Cache.createWeakCache();
    const el = document.createElement('div');
    cache.save(el, 1);
    expect(cache.get(el)).toEqual(1);
    expect(cache.isChanged(el, 1)).toEqual(false);
  });
});
