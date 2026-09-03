/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowNodeEntity } from '@flowgram.ai/free-layout-editor';

const HeightCollapsed = 54;
const HeightExpanded = 225;

function setLoopBlocksVisible(node: WorkflowNodeEntity, visible: boolean): void {
  node.blocks.forEach((block) => {
    const el = block.renderData?.node;
    if (el) {
      el.style.display = visible ? '' : 'none';
    }
    block.lines.allLines.forEach((line) => {
      line.updateUIState({
        style: {
          ...line.uiState.style,
          display: visible ? 'block' : 'none',
        },
      });
    });
  });
}

export function toggleLoopExpanded(
  node: WorkflowNodeEntity,
  expanded: boolean = node.transform.collapsed
) {
  // Already in the requested collapsed/expanded transform state: still refresh
  // child visibility so nodes added while collapsed stay hidden (#928).
  if (node.transform.collapsed === !expanded) {
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