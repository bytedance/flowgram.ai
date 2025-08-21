/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowNodeEntity, WorkflowNodeLinesData } from '@flowgram.ai/free-layout-editor';

export function toggleLoopExpanded(
  node: WorkflowNodeEntity,
  expanded: boolean = node.transform.collapsed,
  heightCollapsed = 54
) {
  const bounds = node.bounds.clone();
  const prePosition = {
    x: node.transform.position.x,
    y: node.transform.position.y,
  };
  node.transform.collapsed = !expanded;
  if (!expanded) {
    node.transform.transform.clearChildren();
    node.transform.transform.update({
      position: {
        x: prePosition.x - node.transform.padding.left,
        y: prePosition.y - node.transform.padding.top,
      },
      origin: {
        x: 0,
        y: 0,
      },
    });
    // When folded, the width and height no longer change according to the child nodes, and need to be set manually
    // 折叠起来，宽高不再根据子节点变化，需要手动设置
    node.transform.size = {
      width: bounds.width,
      height: heightCollapsed,
    };
  } else {
    node.transform.transform.update({
      position: {
        x: prePosition.x + node.transform.padding.left,
        y: prePosition.y + node.transform.padding.top,
      },
      origin: {
        x: 0,
        y: 0,
      },
    });
  }

  // 隐藏子节点线条
  // Hide the child node lines
  node.blocks.forEach((block) => {
    block.getData(WorkflowNodeLinesData).allLines.forEach((line) => {
      line.updateUIState({
        style: !expanded ? { display: 'none' } : {},
      });
    });
  });
}
