/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { WorkflowNodeEntity } from '@flowgram.ai/free-layout-editor';

const HeightCollapsed = 54;
const HeightExpanded = 225;

function setLoopBlocksVisible(node: WorkflowNodeEntity, visible: boolean): void {
  node.blocks.forEach((block) => {
    const element = block.renderData?.node;
    if (element) {
      element.style.display = visible ? '' : 'none';
    }
    block.lines.allLines.forEach((line) => {
      line.updateUIState({
        style: {
          ...line.uiState.style,
          display: visible ? 'block' : 'none',
        },
      });
    });
    setLoopBlocksVisible(block, visible && !block.transform.collapsed);
  });
}

export function toggleLoopExpanded(
  node: WorkflowNodeEntity,
  expanded: boolean = node.transform.collapsed
) {
  if (node.transform.collapsed === !expanded) {
    // Refresh the whole subtree when blocks are added while the loop is collapsed.
    setLoopBlocksVisible(node, expanded);
    if (!node.getNodeMeta().isContainer && node.blocks.length !== 0) {
      return;
    }
    const bounds = node.bounds.clone();
    node.transform.size = {
      width: bounds.width,
      height: node.transform.collapsed === expanded ? HeightCollapsed : HeightExpanded,
    };
    node.transform.transform.fireChange();
    return;
  }
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
      height: HeightCollapsed,
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

  setLoopBlocksVisible(node, expanded);
}
