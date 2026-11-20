/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import type { WorkflowNode } from './types';
import { previewRowCount } from './node-preview';
import geometry from '../../../desktop-backend/catalog/node-layout.json';

export const NODE_LAYOUT = geometry;
export function nodeFamily(type: string) {
  if (['loop', 'control.repeat'].includes(type)) return 'container';
  if (
    [
      'control.switch',
      'condition',
      'control.parallel',
      'control.join',
      'control.merge-branches',
    ].includes(type)
  )
    return 'route';
  if (['block-start', 'block-end', 'control.break', 'control.continue'].includes(type))
    return 'control';
  if (['start', 'end'].includes(type)) return 'boundary';
  return 'step';
}
export function nodeLayout(node: Pick<WorkflowNode, 'type'>, inputs: number, outputs: number) {
  const family = nodeFamily(node.type);
  const height =
    family === 'route'
      ? NODE_LAYOUT.rowTop +
        Math.max(1, inputs, outputs) * NODE_LAYOUT.rowHeight +
        NODE_LAYOUT.rowBottom
      : family === 'control'
      ? NODE_LAYOUT.controlHeight
      : family === 'boundary'
      ? NODE_LAYOUT.boundaryHeight
      : family === 'container'
      ? NODE_LAYOUT.containerHeight
      : 48 + previewRowCount(node.type) * 26 + 10;
  const width =
    family === 'route'
      ? NODE_LAYOUT.routeWidth
      : family === 'control'
      ? NODE_LAYOUT.controlWidth
      : family === 'boundary'
      ? NODE_LAYOUT.boundaryWidth
      : family === 'container'
      ? NODE_LAYOUT.containerWidth
      : NODE_LAYOUT.width;
  return { family, width, height };
}
