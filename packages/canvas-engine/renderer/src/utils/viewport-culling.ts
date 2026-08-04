/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Rectangle } from '@flowgram.ai/utils';
import type { FlowDocument, FlowNodeTransformData } from '@flowgram.ai/document';
import { PlaygroundConfigEntity } from '@flowgram.ai/core';

export interface ViewportCullingConfig {
  enabled: boolean;
  lineEnabled: boolean;
  overscan: number;
}

type ViewportCullingConfigData = {
  viewportCulling?: boolean;
  lineViewportCulling?: boolean;
  viewportCullingOverscan?: number;
};

export function getViewportCullingConfig(config: PlaygroundConfigEntity): ViewportCullingConfig {
  const cullingConfig = config.config as typeof config.config & ViewportCullingConfigData;
  return {
    enabled: cullingConfig.viewportCulling !== false,
    lineEnabled: cullingConfig.lineViewportCulling !== false,
    overscan: cullingConfig.viewportCullingOverscan ?? 300,
  };
}

export function getExpandedViewport(config: PlaygroundConfigEntity, overscan?: number): Rectangle {
  const viewport = config.getViewport();
  const padding = overscan ?? getViewportCullingConfig(config).overscan;
  return new Rectangle(
    viewport.x - padding,
    viewport.y - padding,
    viewport.width + padding * 2,
    viewport.height + padding * 2
  );
}

export function isBoundsVisible(bounds: Rectangle, viewport: Rectangle): boolean {
  if (!bounds || (bounds.width === 0 && bounds.height === 0)) {
    return true;
  }
  return Rectangle.isViewportVisible(bounds, viewport);
}

export function shouldKeepNodeMounted(
  transform: FlowNodeTransformData,
  document: FlowDocument
): boolean {
  const { renderState } = transform;
  return Boolean(
    renderState.activated ||
      renderState.hovered ||
      renderState.dragging ||
      transform.entity === document.renderState.getNodeHovered() ||
      transform.entity === document.renderState.getDragStartEntity() ||
      document.renderState.getDragEntities().includes(transform.entity)
  );
}
