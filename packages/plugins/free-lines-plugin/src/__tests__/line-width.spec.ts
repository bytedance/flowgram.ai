/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';
import { interfaces } from 'inversify';
import { ConstantKeys, FlowDocumentContainerModule } from '@flowgram.ai/document';
import { createPlaygroundContainer, loadPlugins, Playground } from '@flowgram.ai/core';
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
): { linesManager: WorkflowLinesManager; document: WorkflowDocument } {
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
  return { linesManager: container.get(WorkflowLinesManager), document };
}

function createLine({ linesManager, document }: { linesManager: WorkflowLinesManager; document: WorkflowDocument }) {
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
    const env = createLinesManager(undefined);
    const line = createLine(env);
    expect(line.uiState.strokeWidth).toBeUndefined();
  });

  it('applies constants.LINE_WIDTH to new lines', () => {
    const env = createLinesManager({ [ConstantKeys.LINE_WIDTH]: 5 });
    const line = createLine(env);
    expect(line.uiState.strokeWidth).toBe(5);
  });

  it('accepts a value with a css unit and stores it as a number', () => {
    // WorkflowLineUIState.strokeWidth is a number and LineSVG passes it on to the arrow
    // renderer, where consumers do numeric geometry with it. A string would give them NaN.
    const env = createLinesManager({ [ConstantKeys.LINE_WIDTH]: '2px' });
    const line = createLine(env);
    expect(line.uiState.strokeWidth).toBe(2);
    expect(typeof line.uiState.strokeWidth).toBe('number');
  });

  it('ignores a width it cannot express in user units', () => {
    for (const value of ['2em', 'auto', '-2px', Number.NaN, '']) {
      const env = createLinesManager({ [ConstantKeys.LINE_WIDTH]: value });
      const line = createLine(env);
      expect(line.uiState.strokeWidth).toBeUndefined();
    }
  });

  it('lets defaultLineUIState override the constant', () => {
    const env = createLinesManager(
      { [ConstantKeys.LINE_WIDTH]: 5 },
      { defaultLineUIState: { strokeWidth: 1 } }
    );
    const line = createLine(env);
    expect(line.uiState.strokeWidth).toBe(1);
  });
});
