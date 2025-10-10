/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Rectangle, IPoint } from '@flowgram.ai/utils';

import { WorkflowPort } from '../entities';

export function locationConfigToPoint(
  bounds: Rectangle,
  config: Required<WorkflowPort>['locationConfig'],
  _offset: IPoint = { x: 0, y: 0 }
): IPoint {
  const offset = { ..._offset };
  if (config.left !== undefined) {
    offset.x +=
      typeof config.left === 'string' ? parseFloat(config.left) * 0.01 * bounds.width : config.left;
  } else if (config.right !== undefined) {
    offset.x +=
      bounds.width -
      (typeof config.right === 'string'
        ? parseFloat(config.right) * 0.01 * bounds.width
        : config.right);
  }
  if (config.top !== undefined) {
    offset.y +=
      typeof config.top === 'string' ? parseFloat(config.top) * 0.01 * bounds.height : config.top;
  } else if (config.bottom !== undefined) {
    offset.y +=
      bounds.height -
      (typeof config.bottom === 'string'
        ? parseFloat(config.bottom) * 0.01 * bounds.height
        : config.bottom);
  }
  return {
    x: bounds.x + offset.x,
    y: bounds.y + offset.y,
  };
}
