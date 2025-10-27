/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { delay, FreeLayoutPluginContext, startTween } from '@flowgram.ai/free-layout-editor';

import { PositionGroup, positionGroups } from './position-groups';

const updateNodePosition = async (params: {
  ctx: FreeLayoutPluginContext;
  positionGroup: PositionGroup;
}) => {
  const { ctx, positionGroup } = params;
  return new Promise<void>((resolve) => {
    startTween({
      from: { d: 0 },
      to: { d: 100 },
      duration: 1000,
      onUpdate: (v) => {
        ctx.document.getAllNodes().forEach((node) => {
          const { transform } = node.transform;
          const targetPosition = positionGroup[node.id] ?? {
            x: transform.position.x,
            y: transform.position.y,
          };
          transform.update({
            position: {
              x: transform.position.x + ((targetPosition.x - transform.position.x) * v.d) / 100,
              y: transform.position.y + ((targetPosition.y - transform.position.y) * v.d) / 100,
            },
          });
        });
      },
      onComplete: () => {
        resolve();
      },
    });
  });
};

export const updatePosition = async (ctx: FreeLayoutPluginContext) => {
  // Cycle through position groups every 2 seconds
  let currentGroupIndex = 0;

  // Use while loop instead of recursion to avoid stack overflow
  while (true) {
    // Wait for 2 seconds before next update
    await delay(2000);

    // Update to current position group
    await updateNodePosition({
      ctx,
      positionGroup: positionGroups[currentGroupIndex],
    });

    // Move to next position group (cycle back to 0 when reaching the end)
    currentGroupIndex = (currentGroupIndex + 1) % positionGroups.length;
  }
};
