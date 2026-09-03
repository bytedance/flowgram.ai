/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowDocument, FlowNodeEntity } from '@flowgram.ai/document';

const getNodesRect = (nodes: FlowNodeEntity[]) => {
  const rects = nodes
    .map((node) => {
      const bounds = node.bounds;
      if (!bounds) {
        return null;
      }
      // Transform bounds follow meta.size; runtime UI (e.g. node logs) can
      // grow taller/wider in the DOM and would otherwise be clipped on export.
      const el = node.renderData?.node;
      const mounted = Boolean(el?.parentElement);
      const width = mounted ? Math.max(bounds.width, el!.offsetWidth) : bounds.width;
      const height = mounted ? Math.max(bounds.height, el!.offsetHeight) : bounds.height;
      return {
        x: bounds.x,
        y: bounds.y,
        width,
        height,
      };
    })
    .filter(Boolean) as Array<{ x: number; y: number; width: number; height: number }>;

  if (rects.length === 0) {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
  }

  const x1 = Math.min(...rects.map((rect) => rect.x));
  const x2 = Math.max(...rects.map((rect) => rect.x + rect.width));
  const y1 = Math.min(...rects.map((rect) => rect.y));
  const y2 = Math.max(...rects.map((rect) => rect.y + rect.height));

  const width = x2 - x1;
  const height = y2 - y1;

  return {
    width,
    height,
    x: x1,
    y: y1,
  };
};

/**
 * 获取流程所有节点矩形坐标
 */
export const getWorkflowRect = (document: FlowDocument) => getNodesRect(document.getAllNodes());
