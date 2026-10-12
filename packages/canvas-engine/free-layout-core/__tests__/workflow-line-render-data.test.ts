/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { interfaces } from 'inversify';
import { FlowDocumentContainerModule } from '@flowgram.ai/document';
import { PlaygroundMockTools } from '@flowgram.ai/core';

import {
  WorkflowDocument,
  WorkflowDocumentContainerModule,
  WorkflowLinesManager,
  WorkflowLineRenderData,
} from '../src';
import { WorkflowSimpleLineContribution } from './simple-line';

/**
 * Build a container whose line contribution is NOT registered yet, so that a line can
 * be created before its contribution becomes available. This mirrors the real timing
 * issue where a line entity is created (e.g. during fromJSON) before free-lines-plugin
 * onReady registers the bezier/fold/straight contributions.
 */
function createContainerWithoutLineContribution(): {
  container: interfaces.Container;
  document: WorkflowDocument;
  linesManager: WorkflowLinesManager;
} {
  const container = PlaygroundMockTools.createContainer([
    FlowDocumentContainerModule,
    WorkflowDocumentContainerModule,
  ]);
  const document = container.get(WorkflowDocument);
  const linesManager = container.get(WorkflowLinesManager);
  linesManager.init(document);
  // Select SimpleLine as the active line type, but intentionally do NOT register its
  // contribution yet.
  linesManager.switchLineType(WorkflowSimpleLineContribution.type);
  return { container, document, linesManager };
}

describe('workflow-line-render-data', () => {
  it('recomputes an empty path when the contribution registers after the version is set', () => {
    const { document, linesManager } = createContainerWithoutLineContribution();
    document.createWorkflowNode({
      id: 'start_0',
      type: 'start',
      meta: { position: { x: 0, y: 0 } },
    });
    document.createWorkflowNode({
      id: 'end_0',
      type: 'end',
      meta: { position: { x: 800, y: 0 } },
    });

    const line = linesManager.createLine({ from: 'start_0', to: 'end_0' })!;
    const renderData = line.getData(WorkflowLineRenderData);

    // First update runs while no contribution is available: the version is set to the
    // real coordinates, but currentLine is undefined so the path stays empty.
    renderData.update();
    const versionAfterFirstUpdate = renderData.renderVersion;
    expect(versionAfterFirstUpdate).not.toBe('');
    expect(renderData.path).toBe('');

    // The contribution becomes available later (free-lines-plugin onReady).
    linesManager.registerContribution(WorkflowSimpleLineContribution);

    // The position has not changed, so the version stays identical. Without the fix the
    // version guard would permanently skip recomputation and the path would remain empty;
    // with the fix the still-empty path is recomputed once the contribution exists.
    renderData.update();
    expect(renderData.renderVersion).toBe(versionAfterFirstUpdate);
    expect(renderData.path).not.toBe('');
    expect(renderData.path).toMatch(/^M .+ L .+$/);
  });

  it('keeps skipping recomputation once a non-empty path has been computed', () => {
    const { document, linesManager } = createContainerWithoutLineContribution();
    linesManager.registerContribution(WorkflowSimpleLineContribution);
    document.createWorkflowNode({
      id: 'start_0',
      type: 'start',
      meta: { position: { x: 0, y: 0 } },
    });
    document.createWorkflowNode({
      id: 'end_0',
      type: 'end',
      meta: { position: { x: 800, y: 0 } },
    });

    const line = linesManager.createLine({ from: 'start_0', to: 'end_0' })!;
    const renderData = line.getData(WorkflowLineRenderData);

    renderData.update();
    const path = renderData.path;
    expect(path).not.toBe('');

    // A redundant update with an unchanged position must be a no-op for a line that
    // already has a path, preserving the original performance optimization.
    renderData.update();
    expect(renderData.path).toBe(path);
  });
});
