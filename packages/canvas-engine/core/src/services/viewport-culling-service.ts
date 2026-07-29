/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, injectable } from 'inversify';
import { Disposable, DisposableCollection, Emitter, Rectangle } from '@flowgram.ai/utils';

import { PlaygroundConfigEntity } from '../core/layer/config';

export interface SpatialItem {
  id: string;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface RBushNode<T> {
  children?: RBushNode<T>[];
  leaf: boolean;
  height: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  data?: T;
}

/**
 * Minimal R-tree implementation (bulk-loaded, static) for viewport queries.
 * Optimized for the read-heavy, write-rare pattern of canvas node bounds.
 */
class RBush<T extends SpatialItem> {
  private _maxEntries: number;

  private _minEntries: number;

  private data: RBushNode<T>;

  constructor(maxEntries = 9) {
    this._maxEntries = Math.max(4, maxEntries);
    this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));
    this.data = this._createNode([]);
  }

  load(items: T[]): this {
    if (!items.length) return this;
    if (items.length < this._minEntries) {
      items.forEach((item) => this.insert(item));
      return this;
    }
    let node = this._build(items.slice(), 0, items.length - 1, 0);
    if (!this.data.children!.length) {
      this.data = node;
    } else if (this.data.height === node.height) {
      this._splitRoot(this.data, node);
    } else {
      if (this.data.height < node.height) {
        const tmpNode = this.data;
        this.data = node;
        node = tmpNode;
      }
      this._insert(node, this.data.height - node.height - 1, true);
    }
    return this;
  }

  insert(item: T): this {
    this._insert(item, this.data.height - 1, false);
    return this;
  }

  clear(): this {
    this.data = this._createNode([]);
    return this;
  }

  search(bbox: { minX: number; minY: number; maxX: number; maxY: number }): T[] {
    let node: RBushNode<T> | undefined = this.data;
    const result: T[] = [];
    if (!intersectsBBox(bbox, node)) return result;
    const nodesToSearch: RBushNode<T>[] = [];
    while (node) {
      if (node.leaf) {
        for (const child of node.children!) {
          if (intersectsBBox(bbox, child)) {
            result.push(child.data!);
          }
        }
      } else {
        for (const child of node.children!) {
          if (intersectsBBox(bbox, child)) {
            nodesToSearch.push(child);
          }
        }
      }
      node = nodesToSearch.pop();
    }
    return result;
  }

  all(): T[] {
    const result: T[] = [];
    const stack: RBushNode<T>[] = [this.data];
    while (stack.length) {
      const node = stack.pop()!;
      if (node.leaf) {
        for (const child of node.children!) {
          result.push(child.data!);
        }
      } else {
        stack.push(...node.children!);
      }
    }
    return result;
  }

  private _build(items: T[], left: number, right: number, height: number): RBushNode<T> {
    const N = right - left + 1;
    let M = this._maxEntries;
    if (N <= M) {
      const node = this._createNode(
        items.slice(left, right + 1).map((item) => ({
          ...this._createNode([]),
          minX: item.minX,
          minY: item.minY,
          maxX: item.maxX,
          maxY: item.maxY,
          data: item,
        }))
      );
      node.leaf = true;
      this._calcBBox(node);
      return node;
    }
    if (!height) {
      height = Math.ceil(Math.log(N) / Math.log(M));
      M = Math.ceil(N / Math.pow(M, height - 1));
    }
    const node = this._createNode([]);
    node.leaf = false;
    node.height = height;
    const N2 = Math.ceil(N / M);
    const N1 = N2 * Math.ceil(Math.sqrt(M));
    multiSelect(items, left, right, N1, this._compareMinX);
    for (let i = left; i <= right; i += N1) {
      const right2 = Math.min(i + N1 - 1, right);
      multiSelect(items, i, right2, N2, this._compareMinY);
      for (let j = i; j <= right2; j += N2) {
        const right3 = Math.min(j + N2 - 1, right2);
        node.children!.push(this._build(items, j, right3, height - 1));
      }
    }
    this._calcBBox(node);
    return node;
  }

  private _insert(item: any, level: number, isNode: boolean): void {
    const bbox = isNode
      ? item
      : { ...item, minX: item.minX, minY: item.minY, maxX: item.maxX, maxY: item.maxY, data: item };
    const insertPath: RBushNode<T>[] = [];
    const node = this._chooseSubtree(bbox, this.data, level, insertPath);
    node.children!.push(bbox);
    extend(node, bbox);
    while (level >= 0) {
      if (insertPath[level].children!.length > this._maxEntries) {
        this._split(insertPath, level);
        level--;
      } else break;
    }
    this._adjustParentBBoxes(bbox, insertPath, level);
  }

  private _split(insertPath: RBushNode<T>[], level: number): void {
    const node = insertPath[level];
    const M = node.children!.length;
    const m = this._minEntries;
    this._chooseSplitAxis(node, m, M);
    const splitIndex = this._chooseSplitIndex(node, m, M);
    const newNode = this._createNode(
      node.children!.splice(splitIndex, node.children!.length - splitIndex)
    );
    newNode.height = node.height;
    newNode.leaf = node.leaf;
    this._calcBBox(node);
    this._calcBBox(newNode);
    if (level) insertPath[level - 1].children!.push(newNode);
    else this._splitRoot(node, newNode);
  }

  private _splitRoot(node: RBushNode<T>, newNode: RBushNode<T>): void {
    this.data = this._createNode([node, newNode]);
    this.data.height = node.height + 1;
    this.data.leaf = false;
    this._calcBBox(this.data);
  }

  private _chooseSplitIndex(node: RBushNode<T>, m: number, M: number): number {
    let minOverlap = Infinity;
    let minArea = Infinity;
    let index = m;
    for (let i = m; i <= M - m; i++) {
      const bbox1 = this._distBBox(node, 0, i);
      const bbox2 = this._distBBox(node, i, M);
      const overlap = intersectionArea(bbox1, bbox2);
      const area = bboxArea(bbox1) + bboxArea(bbox2);
      if (overlap < minOverlap) {
        minOverlap = overlap;
        minArea = Math.min(area, minArea);
        index = i;
      } else if (overlap === minOverlap && area < minArea) {
        minArea = area;
        index = i;
      }
    }
    return index;
  }

  private _chooseSplitAxis(node: RBushNode<T>, m: number, M: number): void {
    const xMargin = this._allDistMargin(node, m, M, this._compareMinX);
    const yMargin = this._allDistMargin(node, m, M, this._compareMinY);
    if (xMargin < yMargin) node.children!.sort(this._compareMinX);
  }

  private _allDistMargin(
    node: RBushNode<T>,
    m: number,
    M: number,
    compare: (a: any, b: any) => number
  ): number {
    node.children!.sort(compare);
    const leftBBox = this._distBBox(node, 0, m);
    const rightBBox = this._distBBox(node, M - m, M);
    let margin = bboxMargin(leftBBox) + bboxMargin(rightBBox);
    for (let i = m; i < M - m; i++) {
      extend(leftBBox, node.children![i]);
      margin += bboxMargin(leftBBox);
    }
    for (let i = M - m - 1; i >= m; i--) {
      extend(rightBBox, node.children![i]);
      margin += bboxMargin(rightBBox);
    }
    return margin;
  }

  private _distBBox(node: RBushNode<T>, k: number, p: number): RBushNode<T> {
    const destNode = this._createNode([]);
    for (let i = k; i < p; i++) {
      extend(destNode, node.children![i]);
    }
    return destNode;
  }

  private _chooseSubtree(
    bbox: any,
    node: RBushNode<T>,
    level: number,
    path: RBushNode<T>[]
  ): RBushNode<T> {
    while (true) {
      path.push(node);
      if (node.leaf || path.length - 1 === level) break;
      let minArea = Infinity;
      let minEnlargement = Infinity;
      let targetNode: RBushNode<T> | undefined;
      for (const child of node.children!) {
        const area = bboxArea(child);
        const enlargement = enlargedArea(bbox, child) - area;
        if (enlargement < minEnlargement) {
          minEnlargement = enlargement;
          minArea = Math.min(area, minArea);
          targetNode = child;
        } else if (enlargement === minEnlargement && area < minArea) {
          minArea = area;
          targetNode = child;
        }
      }
      node = targetNode || node.children![0];
    }
    return node;
  }

  private _adjustParentBBoxes(bbox: any, path: RBushNode<T>[], level: number): void {
    for (let i = level; i >= 0; i--) {
      extend(path[i], bbox);
    }
  }

  private _calcBBox(node: RBushNode<T>): void {
    node.minX = Infinity;
    node.minY = Infinity;
    node.maxX = -Infinity;
    node.maxY = -Infinity;
    for (const child of node.children!) {
      extend(node, child);
    }
  }

  private _createNode(children: any[]): RBushNode<T> {
    return {
      children,
      leaf: true,
      height: 1,
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity,
    };
  }

  private _compareMinX(a: any, b: any): number {
    return a.minX - b.minX;
  }

  private _compareMinY(a: any, b: any): number {
    return a.minY - b.minY;
  }
}

function intersectsBBox(a: any, b: any): boolean {
  return b.minX <= a.maxX && b.minY <= a.maxY && b.maxX >= a.minX && b.maxY >= a.minY;
}

function extend(a: any, b: any): any {
  a.minX = Math.min(a.minX, b.minX);
  a.minY = Math.min(a.minY, b.minY);
  a.maxX = Math.max(a.maxX, b.maxX);
  a.maxY = Math.max(a.maxY, b.maxY);
  return a;
}

function bboxArea(a: any): number {
  return (a.maxX - a.minX) * (a.maxY - a.minY);
}

function bboxMargin(a: any): number {
  return a.maxX - a.minX + (a.maxY - a.minY);
}

function enlargedArea(a: any, b: any): number {
  return (
    (Math.max(b.maxX, a.maxX) - Math.min(b.minX, a.minX)) *
    (Math.max(b.maxY, a.maxY) - Math.min(b.minY, a.minY))
  );
}

function intersectionArea(a: any, b: any): number {
  const minX = Math.max(a.minX, b.minX);
  const minY = Math.max(a.minY, b.minY);
  const maxX = Math.min(a.maxX, b.maxX);
  const maxY = Math.min(a.maxY, b.maxY);
  return Math.max(0, maxX - minX) * Math.max(0, maxY - minY);
}

function multiSelect(
  arr: any[],
  left: number,
  right: number,
  n: number,
  compare: (a: any, b: any) => number
): void {
  const stack = [left, right];
  while (stack.length) {
    right = stack.pop()!;
    left = stack.pop()!;
    if (right - left <= n) continue;
    const mid = left + Math.ceil((right - left) / n / 2) * n;
    quickselect(arr, mid, left, right, compare);
    stack.push(left, mid, mid, right);
  }
}

function quickselect(
  arr: any[],
  k: number,
  left: number,
  right: number,
  compare: (a: any, b: any) => number
): void {
  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp((2 * z) / 3);
      const sd = 0.5 * Math.sqrt((z * s * (n - s)) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - (m * s) / n + sd));
      const newRight = Math.min(right, Math.floor(k + ((n - m) * s) / n + sd));
      quickselect(arr, k, newLeft, newRight, compare);
    }
    const t = arr[k];
    let i = left;
    let j = right;
    swap(arr, left, k);
    if (compare(arr[right], t) > 0) swap(arr, left, right);
    while (i < j) {
      swap(arr, i, j);
      i++;
      j--;
      while (compare(arr[i], t) < 0) i++;
      while (compare(arr[j], t) > 0) j--;
    }
    if (compare(arr[left], t) === 0) swap(arr, left, j);
    else {
      j++;
      swap(arr, j, right);
    }
    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }
}

function swap(arr: any[], i: number, j: number): void {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

export interface ViewportCullingOptions {
  preloadFactor?: number;
}

/**
 * Viewport culling service: maintains an R-tree spatial index of all entity bounds
 * and efficiently queries which items are visible in the current viewport.
 */
@injectable()
export class ViewportCullingService implements Disposable {
  @inject(PlaygroundConfigEntity) private config: PlaygroundConfigEntity;

  private tree = new RBush<SpatialItem>(16);

  private itemsMap = new Map<string, SpatialItem>();

  private _visibleIds = new Set<string>();

  private _dirty = true;

  private _preloadFactor = 1.5;

  private _rafId: number | undefined;

  private readonly toDispose = new DisposableCollection();

  private readonly _onVisibilityChange = new Emitter<Set<string>>();

  readonly onVisibilityChange = this._onVisibilityChange.event;

  configure(options: ViewportCullingOptions): void {
    if (options.preloadFactor !== undefined) this._preloadFactor = options.preloadFactor;
  }

  init(): void {
    this.toDispose.push(this._onVisibilityChange);
  }

  /**
   * Bulk update all items (rebuild tree).
   */
  updateAll(items: Array<{ id: string; bounds: Rectangle }>): void {
    this.tree.clear();
    this.itemsMap.clear();
    const spatialItems: SpatialItem[] = [];
    for (const item of items) {
      const si: SpatialItem = {
        id: item.id,
        minX: item.bounds.x,
        minY: item.bounds.y,
        maxX: item.bounds.x + item.bounds.width,
        maxY: item.bounds.y + item.bounds.height,
      };
      this.itemsMap.set(item.id, si);
      spatialItems.push(si);
    }
    this.tree.load(spatialItems);
    this._dirty = true;
  }

  /**
   * Update a single item's bounds.
   */
  updateItem(id: string, bounds: Rectangle): void {
    const si: SpatialItem = {
      id,
      minX: bounds.x,
      minY: bounds.y,
      maxX: bounds.x + bounds.width,
      maxY: bounds.y + bounds.height,
    };
    this.itemsMap.set(id, si);
    this._dirty = true;
  }

  /**
   * Remove an item.
   */
  removeItem(id: string): void {
    this.itemsMap.delete(id);
    this._dirty = true;
  }

  /**
   * Rebuild the tree from the current items map (call after batch updateItem calls).
   */
  rebuild(): void {
    this.tree.clear();
    const items = Array.from(this.itemsMap.values());
    this.tree.load(items);
    this._dirty = true;
  }

  /**
   * Query visible items for the current viewport (with preload area).
   * Returns a set of visible item IDs.
   */
  queryVisible(): Set<string> {
    const viewport = this.config.getViewport(true);
    const factor = this._preloadFactor;
    const expandX = (viewport.width * (factor - 1)) / 2;
    const expandY = (viewport.height * (factor - 1)) / 2;
    const queryBBox = {
      minX: viewport.x - expandX,
      minY: viewport.y - expandY,
      maxX: viewport.x + viewport.width + expandX,
      maxY: viewport.y + viewport.height + expandY,
    };

    const results = this.tree.search(queryBBox);
    const visibleIds = new Set<string>();
    for (const item of results) {
      visibleIds.add(item.id);
    }
    return visibleIds;
  }

  /**
   * Trigger a visibility update (debounced via rAF).
   */
  scheduleUpdate(): void {
    if (this._rafId !== undefined) return;
    this._rafId = requestAnimationFrame(() => {
      this._rafId = undefined;
      this._performUpdate();
    });
  }

  /**
   * Force an immediate visibility recalculation.
   */
  forceUpdate(): void {
    if (this._rafId !== undefined) {
      cancelAnimationFrame(this._rafId);
      this._rafId = undefined;
    }
    this._performUpdate();
  }

  /**
   * Check if a specific item is currently visible.
   */
  isVisible(id: string): boolean {
    return this._visibleIds.has(id);
  }

  /**
   * Get current set of visible IDs.
   */
  get visibleIds(): Set<string> {
    return this._visibleIds;
  }

  /**
   * Get total number of tracked items.
   */
  get totalItems(): number {
    return this.itemsMap.size;
  }

  private _performUpdate(): void {
    if (this._dirty) {
      this.rebuild();
      this._dirty = false;
    }
    const newVisible = this.queryVisible();
    if (!setsEqual(this._visibleIds, newVisible)) {
      this._visibleIds = newVisible;
      this._onVisibilityChange.fire(newVisible);
    }
  }

  dispose(): void {
    if (this._rafId !== undefined) {
      cancelAnimationFrame(this._rafId);
    }
    this.toDispose.dispose();
  }
}

function setsEqual(a: Set<string>, b: Set<string>): boolean {
  if (a.size !== b.size) return false;
  for (const id of a) {
    if (!b.has(id)) return false;
  }
  return true;
}
