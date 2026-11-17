/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { it, expect, beforeEach, describe } from 'vitest';
import { interfaces } from 'inversify';
import {
  WorkflowDocument,
  WorkflowHoverService,
  WorkflowLineEntity,
  WorkflowLinesManager,
  WorkflowSelectService,
} from '@flowgram.ai/free-layout-core';
import { EntityManager } from '@flowgram.ai/core';

import { StackingComputing } from '../src/stacking-computing';
import { StackingContextManager } from '../src/manager';
import { createWorkflowContainer, workflowJSON } from './utils.mock';
import { IStackingComputing, IStackingContextManager } from './type.mock';

let container: interfaces.Container;
let document: WorkflowDocument;
let stackingContextManager: IStackingContextManager;
let stackingComputing: IStackingComputing;

beforeEach(() => {
  container = createWorkflowContainer();
  container.bind(StackingContextManager).to(StackingContextManager);
  document = container.get<WorkflowDocument>(WorkflowDocument);
  stackingContextManager = container.get<StackingContextManager>(
    StackingContextManager
  ) as unknown as IStackingContextManager;
  document.fromJSON(workflowJSON);
  stackingContextManager.init();
  stackingComputing = new StackingComputing() as unknown as IStackingComputing;
});

describe('StackingComputing compute', () => {
  it('should create instance', () => {
    const computing = new StackingComputing();
    expect(computing).not.toBeUndefined();
  });
  it('should execute compute', () => {
    const { nodeLevel, lineLevel, topLevel, maxLevel } = stackingComputing.compute({
      root: document.root,
      nodes: stackingContextManager.nodes,
      context: stackingContextManager.context,
    });
    expect(topLevel).toBe(8);
    expect(maxLevel).toBe(16);
    expect(Object.fromEntries(nodeLevel)).toEqual({
      start_0: 1,
      condition_0: 2,
      end_0: 3,
      loop_0: 4,
      break_0: 4,
      variable_0: 4,
    });
    expect(Object.fromEntries(lineLevel)).toEqual({
      'start_0_-condition_0_': 0,
      'start_0_-loop_0_': 0,
      'condition_0_if-end_0_': 0,
      'condition_0_else-end_0_': 0,
      'loop_0_-end_0_': 0,
      'break_0_-variable_0_': 4,
    });
  });
  it('should put hovered line on max level', () => {
    const hoverService = container.get<WorkflowHoverService>(WorkflowHoverService);
    const hoveredLineId = 'start_0_-loop_0_';
    hoverService.updateHoveredKey(hoveredLineId);
    const { lineLevel, maxLevel } = stackingComputing.compute({
      root: document.root,
      nodes: stackingContextManager.nodes,
      context: stackingContextManager.context,
    });
    const hoveredLineLevel = lineLevel.get(hoveredLineId);
    expect(hoveredLineLevel).toBe(maxLevel);
  });
  it('should put selected line on max level', () => {
    const entityManager = container.get<EntityManager>(EntityManager);
    const selectService = container.get<WorkflowSelectService>(WorkflowSelectService);
    const selectedLineId = 'start_0_-loop_0_';
    const selectedLine = entityManager.getEntityById<WorkflowLineEntity>(selectedLineId)!;
    selectService.selection = [selectedLine];
    const { lineLevel, maxLevel } = stackingComputing.compute({
      root: document.root,
      nodes: stackingContextManager.nodes,
      context: stackingContextManager.context,
    });
    const selectedLineLevel = lineLevel.get(selectedLineId);
    expect(selectedLineLevel).toBe(maxLevel);
  });
  it('should put drawing line on max level', () => {
    const linesManager = container.get<WorkflowLinesManager>(WorkflowLinesManager);
    const drawingLine = linesManager.createLine({
      from: 'start_0',
      drawingTo: { x: 100, y: 100, location: 'left' },
    })!;
    const { lineLevel, maxLevel } = stackingComputing.compute({
      root: document.root,
      nodes: stackingContextManager.nodes,
      context: stackingContextManager.context,
    });
    const drawingLineLevel = lineLevel.get(drawingLine.id);
    expect(drawingLineLevel).toBe(maxLevel);
  });
  it('should put selected nodes on top level', () => {
    const selectService = container.get<WorkflowSelectService>(WorkflowSelectService);
    const selectedNodeId = 'start_0';
    const selectedNode = document.getNode(selectedNodeId)!;
    selectService.selectNode(selectedNode);
    const { nodeLevel, topLevel } = stackingComputing.compute({
      root: document.root,
      nodes: stackingContextManager.nodes,
      context: stackingContextManager.context,
    });
    const selectedNodeLevel = nodeLevel.get(selectedNodeId);
    expect(selectedNodeLevel).toBe(topLevel);
  });
});

describe('StackingComputing builtin methods', () => {
  it('computeNodeIndexesMap', () => {
    stackingComputing.compute({
      root: document.root,
      nodes: stackingContextManager.nodes,
      context: stackingContextManager.context,
    });
    const nodeIndexes = stackingComputing.computeNodeIndexesMap(stackingContextManager.nodes);
    expect(Object.fromEntries(nodeIndexes)).toEqual({
      root: 0,
      start_0: 1,
      condition_0: 2,
      end_0: 3,
      loop_0: 4,
      break_0: 5,
      variable_0: 6,
    });
  });
  it('computeTopLevel', () => {
    const topLevel = stackingComputing.computeTopLevel(stackingContextManager.nodes);
    expect(topLevel).toEqual(8);
  });
});
