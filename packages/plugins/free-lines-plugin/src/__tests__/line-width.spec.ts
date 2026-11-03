/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';
import { interfaces } from 'inversify';
import { ConstantKeys, FlowDocumentContainerModule } from '@flowgram.ai/document';
import { createPlaygroundContainer, loadPlugins, Playground, PluginContext } from '@flowgram.ai/core';
import {
  WorkflowDocument,
  WorkflowDocumentContainerModule,
  WorkflowDocumentOptions,
  WorkflowLinesManager,
} from '@flowgram.ai/free-layout-core';
import { FlowRendererContainerModule } from '@flowgram.ai/renderer';

import { createFreeLinesPlugin } from '../create-free-lines-plugin';
import { FreeLinesPluginOptions } from '../type';
import { createFreeStackPlugin } from '@flowgram.ai/free-stack-plugin';

/**
 * 走真实的插件流程：loadPlugins -> playground.init()，插件的 onInit 会执行
 */
function createLinesManager(
  constants: Record<string, any> | undefined,
  pluginOptions: FreeLinesPluginOptions = {}
): WorkflowLinesManager {
  const container: interfaces.Container = createPlaygroundContainer();
  container.load(FlowDocumentContainerModule);
  container.load(WorkflowDocumentContainerModule);
  container.load(FlowRendererContainerModule);
  if (constants) {
    container.rebind(WorkflowDocumentOptions).toConstantValue({ constants });
  }

  const playground = container.get(Playground);
  loadPlugins([createFreeStackPlugin({}), createFreeLinesPlugin(pluginOptions)], container);
  playground.init();

  const document = container.get(WorkflowDocument);
  document.init();
  return container.get(WorkflowLinesManager);
}

function createLine(linesManager: WorkflowLinesManager) {
  const document = linesManager.document;
  document.createWorkflowNode({
    id: 'start_0',
    type: 'start',
    meta: { position: { x: 0, y: 0 } },
  });
  document.createWorkflowNode({
    id: 'end_0',
    type: 'end',
    meta: { position: { x: 400, y: 0 } },
  });
  return linesManager.createLine({ from: 'start_0', to: 'end_0' })!;
}

describe('createFreeLinesPlugin - LINE_WIDTH constant', () => {
  it('leaves new lines untouched when the constant is absent', () => {
    const linesManager = createLinesManager(undefined);
    const line = createLine(linesManager);
    expect(line.uiState.strokeWidth).toBeUndefined();
  });

  it('applies constants.LINE_WIDTH to new lines', () => {
    const linesManager = createLinesManager({ [ConstantKeys.LINE_WIDTH]: 5 });
    const line = createLine(linesManager);
    expect(line.uiState.strokeWidth).toBe(5);
  });

  it('accepts a value with a css unit', () => {
    const linesManager = createLinesManager({ [ConstantKeys.LINE_WIDTH]: '2px' });
    const line = createLine(linesManager);
    expect(line.uiState.strokeWidth).toBe('2px');
  });

  it('lets defaultLineUIState override the constant', () => {
    const linesManager = createLinesManager(
      { [ConstantKeys.LINE_WIDTH]: 5 },
      { defaultLineUIState: { strokeWidth: 1 } }
    );
    const line = createLine(linesManager);
    expect(line.uiState.strokeWidth).toBe(1);
  });
});
