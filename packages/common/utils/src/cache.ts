/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { type Disposable } from './disposable';
import { Compare } from './compare';

export interface CacheManager<T, ITEM extends CacheOriginItem = CacheOriginItem>
  extends Disposable {
  get(): T;
  getMore(count: number, autoDelete?: boolean): T[];
  getMoreByItemKeys(item: ITEM[]): T[];
  getMoreByItems(item: ITEM[]): T[];
  /**
   * 从缓存中获取
   * @param key
   */
  getFromCacheByKey(key: string): T | undefined;
  /**
   * 获取所有缓存
   */
  getFromCache(): Cache<T>[];
  /**
   * 清空缓存数据
   */
  clear(): void;
}

export interface ShortCache<T> {
  get(fn: () => T): T;
  clear(): void;
  dispose(): void;
}

export interface WeakCache {
  get(key: any): any;
  save(key: any, value: any): void;
  isChanged(key: any, value: any): boolean;
}

export type Cache<T> = {
  [P in keyof T]: T[P];
} & { dispose?: () => void; key?: any };

export interface CacheOpts {
  deleteLimit?: number; // 限制数目，只有超过这个数目，才会自动删除
}

export interface CacheOriginItem {
  key?: any;
}

/**
 * 缓存工具：
 *  1. 可延迟按需创建，提升性能
 *  2. 可支持多个或单个，有些动态创建多个的场景可以共享已有的实例，提升性能
 *  3. 自动删除，超过一定的数目会自动做清空回收
 *
 * @example
 *  function htmlFactory<HTMLElement>(): Cache<HTMLElement> {
 *    const el = document.createElement('div')
 *    return Cache.assign(el, { dispose: () => el.remove() })
 *  }
 *  const htmlCache = Cache.create<HTMLElement>(htmlFactory)
 *  console.log(htmlCache.get() === htmlCache.get()) // true
 *  console.log(htmlCache.getMore(3)) // [HTMLElement, HTMLElement, HTMLElement]
 *  console.log(htmlCache.getMore(2)) // [HTMLElement, HTMLElement] 自动删除第三个
 */
export namespace Cache {
  export function create<T, ITEM extends CacheOriginItem = CacheOriginItem>(
    cacheFactory: (item?: ITEM) => Cache<T>,
    opts: CacheOpts = {},
  ): CacheManager<T, ITEM> {
    let cache: Cache<T>[] = [];
    return {
      getFromCache(): Cache<T>[] {
        return cache;
      },
      getMore(count: number, autoDelete = true): T[] {
        if (count === cache.length) {
          // 强调互斥，统一 return cache.slice()
        } else if (count > cache.length) {
          let added = count - cache.length;
          while (added > 0) {
            cache.push(cacheFactory());
            added--;
          }
        } else if (autoDelete) {
          const deleteLimit = opts.deleteLimit ?? 0;
          // 只有剩余个数超过 deleteLimit，才会自动删除
          if (cache.length - count > deleteLimit) {
            const deleted = cache.splice(count);
            deleted.forEach(el => el.dispose && el.dispose());
          }
        }

        return cache.slice(0, count);
      },
      /**
       * 通过 key 去创建缓存
       * @param items
       */
      getMoreByItemKeys(items: ITEM[]): T[] {
        const newCache: Cache<T>[] = [];
        const findedMap: Map<any, any> = new Map();
        cache.forEach(item => {
          const finded = items.find(i => i.key === item.key);
          if (finded) {
            findedMap.set(item.key, item);
          } else {
            item.dispose?.();
          }
        });
        items.forEach(item => {
          if (!item.key) throw new Error('getMoreByItemKeys need a key');
          const finded = findedMap.get(item.key);
          if (finded) {
            newCache.push(finded);
          } else {
            newCache.push(cacheFactory(item));
          }
        });
        cache = newCache;
        return cache;
      },
      /**
       * 通过 item 引用取拿缓存数据
       */
      getMoreByItems(items: any[]): T[] {
        const newCache: Cache<T>[] = [];
        const findedMap: Map<any, any> = new Map();
        cache.forEach(cacheItem => {
          // 这里 key 存的是 item 的引用
          const finded = items.find(ref => ref === cacheItem.key);
          if (finded) {
            findedMap.set(cacheItem.key, cacheItem);
          } else {
            cacheItem.dispose?.();
          }
        });
        items.forEach(item => {
          const finded = findedMap.get(item);
          if (finded) {
            newCache.push(finded);
          } else {
            newCache.push({
              ...cacheFactory(item),
              key: item,
            });
          }
        });
        cache = newCache;
        return cache;
      },
      get(): T {
        if (cache.length > 0) return cache[0];
        cache.push(cacheFactory());
        return cache[0];
      },
      getFromCacheByKey(key: string): T | undefined {
        return cache.find(item => item.key === key);
      },
      dispose(): void {
        cache.forEach(item => item.dispose && item.dispose());
        cache.length = 0;
      },
      clear(): void {
        this.dispose();
      },
    };
  }

  export function assign<T = any>(target: T, fn: Disposable): Cache<T> {
    return Object.assign(target as any, fn) as any;
  }

  /**
   * 短存储
   * @param timeout
   */
  export function createShortCache<T>(timeout = 1000): ShortCache<T> {
    let cache: T | undefined;
    let hasCache = false;
    let timeoutId: number | undefined;

    function updateTimeout(): void {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        hasCache = false;
        cache = undefined;
        // 这里加 any 是因为在 nodejs 场景 setTimeout 返回的格式定义的不是 number, yarn dev 会报错
      }, timeout) as any;
    }

    function clear(): void {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = undefined;
      hasCache = false;
      cache = undefined;
    }

    return {
      get(getValue: () => T): T {
        if (hasCache) {
          updateTimeout();
          return cache as T;
        }
        cache = getValue();
        hasCache = true;
        updateTimeout();
        return cache;
      },
      clear,
      dispose: clear,
    };
  }

  export function createWeakCache(): WeakCache {
    const weakCache: WeakMap<any, any> = new WeakMap();
    return {
      get: key => weakCache.get(key),
      save: (key: any, value: any) => weakCache.set(key, value),
      isChanged: (key: any, value: any) => Compare.isChanged(weakCache.get(key), value),
    };
  }
}
