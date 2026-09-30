/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { vi } from 'vitest';
import { interfaces } from 'inversify';
import { FlowNodeBaseType, FlowNodeRegistry, FlowNodeTransformData } from '@flowgram.ai/document';
import { PlaygroundConfigEntity } from '@flowgram.ai/core';

import {
  delay,
  WorkflowContentChangeEvent,
  WorkflowContentChangeType,
  WorkflowDocument,
  WorkflowJSON,
  WorkflowLinesManager,
  WorkflowNodeJSON,
  WorkflowSubCanvas,
} from '../src';
import { baseJSON, createSubCanvasNodes, createWorkflowContainer, nestJSON } from './mocks';

let container: interfaces.Container;
let document: WorkflowDocument;
beforeEach(() => {
  container = createWorkflowContainer();
  document = container.get(WorkflowDocument);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('workflow-document', () => {
  it('load', async () => {
    const fn = vi.fn();
    document.onLoaded(fn);
    await document.load();
    expect(fn.mock.calls.length).toEqual(1);
  });

  it('base fromJSON and toJSON', () => {
    document.fromJSON(baseJSON);
    expect(document.toJSON()).toEqual(baseJSON);
  });

  it('refreshes lines after the initial fromJSON layout frame', () => {
    const callbacks: FrameRequestCallback[] = [];
    const requestAnimationFrameSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        callbacks.push(callback);
        return callbacks.length;
      });
    const linesManager = container.get(WorkflowLinesManager);
    const forceUpdateSpy = vi.spyOn(linesManager, 'forceUpdate');

    document.fromJSON(baseJSON);

    expect(requestAnimationFrameSpy).toHaveBeenCalledOnce();
    expect(forceUpdateSpy).not.toHaveBeenCalled();

    callbacks[0](0);
    expect(forceUpdateSpy).toHaveBeenCalledOnce();
  });

  it('does not schedule a line refresh when rendering is disabled', () => {
    const requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame');

    document.fromJSON(baseJSON, false);

    expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
  });

  it('keeps only the latest line refresh across repeated fromJSON calls', () => {
    const callbacks: FrameRequestCallback[] = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callbacks.push(callback);
      return callbacks.length;
    });
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const linesManager = container.get(WorkflowLinesManager);
    const forceUpdateSpy = vi.spyOn(linesManager, 'forceUpdate');

    document.fromJSON(baseJSON);
    document.fromJSON(baseJSON);

    expect(cancelAnimationFrameSpy).toHaveBeenCalledOnce();
    expect(cancelAnimationFrameSpy).toHaveBeenCalledWith(1);

    callbacks[1](0);
    expect(forceUpdateSpy).toHaveBeenCalledOnce();
  });

  it('cancels a pending line refresh when rendering is disabled', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(1);
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');

    document.fromJSON(baseJSON);
    document.fromJSON(baseJSON, false);

    expect(cancelAnimationFrameSpy).toHaveBeenCalledOnce();
    expect(cancelAnimationFrameSpy).toHaveBeenCalledWith(1);
  });

  it('nested fromJSON and toJSON', () => {
    document.fromJSON(nestJSON);
    expect(document.toJSON()).toEqual(nestJSON);
  });

  it('reload json', async () => {
    document.fromJSON(baseJSON);
    const newJSON = {
      nodes: [
        {
          id: 'start_0',
          type: 'start',
          data: undefined,
          meta: {
            position: { x: 10, y: 10 },
          },
        },
      ],
      edges: [],
    };
    await document.reload(newJSON);
    expect(document.toJSON()).toEqual(newJSON);
  });

  it('dispose', () => {
    document.dispose();
    expect((document as any).disposed).toEqual(true);
    document.dispose();
    expect((document as any).disposed).toEqual(true);
  });

  it('fitView', async () => {
    const config = container.get<PlaygroundConfigEntity>(PlaygroundConfigEntity);
    config.updateConfig({
      width: 1000,
      height: 800,
    });
    document.addNode({
      id: 'start_0',
      type: 'start',
      meta: {
        position: { x: -1000, y: -1000 },
      },
    });
    await document.fitView(false);
    expect(config.scrollData).toEqual({
      scrollX: -500,
      scrollY: -400,
    });
  });

  it('getNodeDefaultPosition', () => {
    const variableNodeType = 'variable';
    const variableNodeRegister: FlowNodeRegistry = {
      type: variableNodeType,
      meta: {
        position: { x: 10, y: 10 },
        size: { width: 100, height: 100 },
      },
    };
    document.registerFlowNodes<any>(variableNodeRegister);
    expect(document.getNodeDefaultPosition(variableNodeType)).toEqual({
      x: 0,
      y: -50,
    });
  });

  it('createWorkflowNodeByType', () => {
    const node = document.createWorkflowNodeByType('start', {
      x: 10,
      y: 10,
    });
    const nodeTransData = node.getData(FlowNodeTransformData);
    expect(nodeTransData.position).toEqual({ x: 10, y: 10 });
    expect(node.flowNodeType).toEqual('start');
  });
  it('createWorkflowNodeByType with id', () => {
    const node = document.createWorkflowNodeByType(
      'start',
      {
        x: 10,
        y: 10,
      },
      { id: 'start_0' }
    );
    expect(node.id).toEqual('start_0');
    const nodeTransData = node.getData(FlowNodeTransformData);
    expect(nodeTransData.position).toEqual({ x: 10, y: 10 });
    expect(node.flowNodeType).toEqual('start');

    let error: string = '';
    try {
      document.createWorkflowNodeByType(
        'start',
        {
          x: 10,
          y: 10,
        },
        { id: 'start_0' }
      );
    } catch (e: any) {
      error = e.message;
    }
    expect(error).toMatch('duplicated');
  });

  it('getAllNodes', () => {
    document.fromJSON(nestJSON);
    const allNodeIds = document.getAllNodes().map((n) => n.id);
    expect(allNodeIds).toEqual([
      'start_0',
      'condition_0',
      'end_0',
      'loop_0',
      'break_0',
      'variable_0',
    ]);
  });

  it('getAssociatedNodes', () => {
    const startNodeRegister: FlowNodeRegistry = {
      type: 'start',
      meta: {
        isStart: true,
      },
    };
    const endNodeRegister: FlowNodeRegistry = {
      type: 'end',
      meta: {
        isNodeEnd: true,
      },
    };
    document.registerFlowNodes<any>(startNodeRegister, endNodeRegister);
    document.fromJSON({
      nodes: [
        ...baseJSON.nodes,
        {
          id: 'sun_canvas_0',
          type: FlowNodeBaseType.SUB_CANVAS,
          meta: {
            isContainer: true,
            position: { x: 10, y: 10 },
          },
          blocks: [
            {
              id: 'variable_0',
              type: 'variable',
              meta: {
                position: { x: -10, y: 0 },
              },
            },
            {
              id: 'variable_1',
              type: 'variable',
              meta: {
                position: { x: 10, y: 0 },
              },
            },
          ],
          edges: [],
        },
      ],
      edges: [],
    });
    const endNode = document.getNode('end_0')!;
    (endNode as any)._metaCache['isNodeEnd'] = true;
    const associatedNodeIds = document.getAssociatedNodes().map((n) => n.id);
    expect(associatedNodeIds).toEqual(['start_0', 'end_0', 'variable_0', 'variable_1']);
  });

  it('fireRender', () => {
    expect(document.fireRender()).toBeUndefined();
  });

  it('fireContentChange', () => {
    document.fromJSON(nestJSON);
    const loopNode = document.getNode('loop_0')!;
    const event: WorkflowContentChangeEvent = {
      type: WorkflowContentChangeType.MOVE_NODE,
      toJSON: () => document.toNodeJSON(loopNode),
      entity: loopNode,
    };
    const fn = vi.fn();
    document.onContentChange(fn);
    document.fireContentChange(event);
    expect(fn.mock.calls.length).toEqual(1);
  });

  it('toNodeJSON', () => {
    const variableJSON = {
      id: 'variable_0',
      type: 'variable',
      meta: { position: { x: 0, y: 0 } },
    };
    const variableNode = document.createWorkflowNode(variableJSON);
    const variableToJSON = document.toNodeJSON(variableNode);
    expect(variableToJSON).toEqual(variableJSON);
  });

  it('copyNode', () => {
    document.fromJSON(nestJSON);
    const loopNode = document.getNode('loop_0')!;
    const copyFormat = (json: WorkflowNodeJSON) => ({
      ...json,
      meta: { ...json.meta, testFormat: true },
    });
    const newLoopNode = document.copyNode(loopNode, 'loop_1', copyFormat, {
      x: -100,
      y: -100,
    });
    const newLoopTransData = newLoopNode.getData(FlowNodeTransformData);
    expect(newLoopNode.id).toEqual('loop_1');
    expect(newLoopNode.flowNodeType).toEqual('loop');
    expect(newLoopTransData.position).toEqual({ x: -100, y: -100 });
    expect(newLoopNode.getNodeMeta().testFormat).toEqual(true);
  });

  it('copyNodeFromJSON', () => {
    document.fromJSON(nestJSON);
    const variableNode = document.copyNodeFromJSON(
      'variable',
      {
        id: 'variable_0',
        type: 'variable',
        meta: { position: { x: 10, y: 10 } },
      },
      'variable_1',
      { x: -50, y: -50 },
      'loop_0'
    );
    const variableTransData = variableNode.getData(FlowNodeTransformData);
    expect(variableTransData.position).toEqual({ x: -50, y: -50 });
    expect(variableNode.id).toEqual('variable_1');
    expect(variableNode.flowNodeType).toEqual('variable');
    expect(variableNode.parent?.id).toEqual('loop_0');
  });

  it('copyNodeFromJSON with default position', () => {
    document.fromJSON(nestJSON);
    const variableNode = document.copyNodeFromJSON(
      'variable',
      {
        id: 'variable_0',
        type: 'variable',
        meta: { position: { x: 0, y: 0 } },
      },
      'variable_1'
    );
    const variableTransData = variableNode.getData(FlowNodeTransformData);
    expect(variableTransData.position).toEqual({ x: 30, y: 30 });
    expect(variableNode.id).toEqual('variable_1');
    expect(variableNode.flowNodeType).toEqual('variable');
    expect(variableNode.parent?.id).toEqual('root');
  });

  it('canRemove', () => {
    document.fromJSON(baseJSON);
    const startNode = document.getNode('end_0')!;
    (startNode as any)._metaCache['deleteDisable'] = true;
    expect(document.canRemove(startNode)).toEqual(false);
  });

  it('fromJSON with empty json parameter', () => {
    const expectedEmptyJSON: WorkflowJSON = {
      nodes: [],
      edges: [],
    };
    // no nodes or edges
    document.fromJSON({});
    expect(document.toJSON()).toEqual(expectedEmptyJSON);
    // no edges
    document.fromJSON({ nodes: [] });
    expect(document.toJSON()).toEqual(expectedEmptyJSON);
    // no nodes
    document.fromJSON({ edges: [] });
    expect(document.toJSON()).toEqual(expectedEmptyJSON);
  });
});

describe('workflow-document createWorkflowNode', () => {
  it('createWorkflowNode basic function', () => {
    const node = document.createWorkflowNode({
      id: 'start_0',
      type: 'start',
      meta: {
        position: { x: 10, y: 10 },
      },
    });
    const nodeTransData = node.getData(FlowNodeTransformData);
    expect(nodeTransData.position).toEqual({ x: 10, y: 10 });
    expect(node.id).toEqual('start_0');
    expect(node.flowNodeType).toEqual('start');
  });
  it('createWorkflowNode without position', () => {
    const node = document.createWorkflowNode({
      id: 'start_0',
      type: 'start',
      meta: {},
    });
    const nodeTrans = node.getData(FlowNodeTransformData);
    expect(nodeTrans.position).toEqual({ x: 0, y: -30 });
    expect(node.id).toEqual('start_0');
    expect(node.flowNodeType).toEqual('start');
  });
  it('createWorkflowNode with form', () => {
    const variableNodeType = 'variable';
    const variableNodeRegister: FlowNodeRegistry = {
      type: variableNodeType,
      meta: {
        position: { x: 10, y: 10 },
      },
      formMeta: {
        root: {
          name: 'root',
          type: 'object',
          children: [
            {
              name: 'nodeDescription',
              type: 'form-void',
              title: '',
              abilities: [
                {
                  type: 'setter',
                  options: {
                    key: 'Text',
                    text: '我是Variable节点',
                  },
                },
              ],
            },
          ],
        },
      },
    };
    document.registerFlowNodes<any>(variableNodeRegister);
    const node = document.createWorkflowNode({
      id: 'variable_0',
      type: variableNodeType,
      meta: {
        position: { x: 10, y: 10 },
      },
    });
    const nodeTransData = node.getData(FlowNodeTransformData);
    expect(nodeTransData.position).toEqual({ x: 10, y: 10 });
    expect(node.id).toEqual('variable_0');
    expect(node.flowNodeType).toEqual(variableNodeType);
  });
});

describe('workflow-document with nestedJSON & subCanvas', () => {
  it('subCanvas parentNode dispose', () => {
    const { loopNode, subCanvasNode } = createSubCanvasNodes(document);
    loopNode.dispose();
    expect(loopNode.disposed).toEqual(true);
    expect(subCanvasNode.disposed).toEqual(true);
  });
  it('subCanvas canvasNode dispose', () => {
    const { loopNode, subCanvasNode } = createSubCanvasNodes(document);
    subCanvasNode.dispose();
    expect(loopNode.disposed).toEqual(true);
    expect(subCanvasNode.disposed).toEqual(true);
  });
  it('createWorkflowNode with subCanvas', () => {
    const variableSchema = {
      id: 'variable_0',
      type: 'variable',
      meta: { position: { x: 0, y: 0 } },
    };
    const loopSchema = {
      id: 'loop_0',
      type: 'loop',
      meta: {
        position: { x: -100, y: 0 },
        canvasPosition: { x: 100, y: 0 },
      },
      blocks: [variableSchema],
    };
    const { loopNode, subCanvasNode, variableNode } = createSubCanvasNodes(document);
    expect(document.toNodeJSON(variableNode)).toEqual(variableSchema);
    expect(document.toNodeJSON(loopNode)).toEqual(loopSchema);
    expect(document.toNodeJSON(subCanvasNode)).toEqual(loopSchema);
    expect(document.toJSON()).toEqual({
      nodes: [loopSchema],
      edges: [],
    });
  });
  const subCanvasInlinePortSchema = {
    nodes: [
      {
        id: 'loop_0',
        type: 'loop',
        meta: {
          position: { x: -100, y: 0 },
          canvasPosition: { x: 100, y: 0 },
        },
        blocks: [
          {
            id: 'variable_0',
            type: 'variable',
            meta: { position: { x: 0, y: 0 } },
          },
          {
            id: 'variable_1',
            type: 'variable',
            meta: { position: { x: 0, y: 0 } },
          },
        ],
        edges: [
          { sourceNodeID: 'loop_0', targetNodeID: 'variable_0' },
          { sourceNodeID: 'variable_0', targetNodeID: 'variable_1' },
          { sourceNodeID: 'variable_0', targetNodeID: 'loop_0' },
          { sourceNodeID: 'loop_0', targetNodeID: 'variable_1' },
          { sourceNodeID: 'variable_1', targetNodeID: 'loop_0' },
        ],
      },
    ],
    edges: [],
  };
  it('toJSON with subCanvas inline port', () => {
    const linesManager = container.get(WorkflowLinesManager);
    const { subCanvasNode, variableNode: variableANode } = createSubCanvasNodes(document);
    const variableBNode = document.createWorkflowNode(
      {
        id: 'variable_1',
        type: 'variable',
        meta: {
          position: { x: 0, y: 0 },
        },
      },
      false,
      subCanvasNode.id
    );
    linesManager.createLine({
      from: subCanvasNode.id,
      to: variableANode.id,
    });
    linesManager.createLine({
      from: subCanvasNode.id,
      to: variableBNode.id,
    });
    linesManager.createLine({
      from: variableANode.id,
      to: variableBNode.id,
    });
    linesManager.createLine({
      from: variableANode.id,
      to: subCanvasNode.id,
    });
    linesManager.createLine({
      from: variableBNode.id,
      to: subCanvasNode.id,
    });
    const json = document.toJSON();
    expect(json).toEqual(subCanvasInlinePortSchema);
  });
  it('fromJSON with subCanvas inline port', async () => {
    const createCall = vi.fn();
    const createCanvas = () => {
      createCall();
      document.createWorkflowNode({
        id: 'subCanvas_0',
        type: FlowNodeBaseType.SUB_CANVAS,
        meta: {
          isContainer: true,
          position: { x: 100, y: 0 },
          subCanvas: () => ({
            isCanvas: true,
            parentNode: document.getNode('loop_0')!,
            canvasNode: document.getNode('subCanvas_0')!,
          }),
        },
      });
    };
    const loopNodeRegister: FlowNodeRegistry = {
      type: 'loop',
      meta: {
        subCanvas: () => {
          const parentNode = document.getNode('loop_0');
          const canvasNode = document.getNode('subCanvas_0');
          if (!parentNode || !canvasNode) {
            return;
          }
          return {
            isCanvas: false,
            parentNode,
            canvasNode,
          };
        },
      },
      onCreate: (node, json) => {
        createCanvas();
      },
    };
    document.registerFlowNodes<any>(loopNodeRegister);
    document.fromJSON(subCanvasInlinePortSchema);
    await delay(10);
    expect(createCall).toHaveBeenCalledTimes(1);
    const loopNode = document.getNode('loop_0')!;
    const subCanvas: WorkflowSubCanvas = loopNode?.getNodeMeta().subCanvas(loopNode);
    expect(subCanvas).toBeDefined();
    const canvasNode = subCanvas.canvasNode;
    expect(canvasNode.id).toEqual('subCanvas_0');
    expect(canvasNode.collapsedChildren.length).toEqual(2);
    expect(document.toJSON()).toEqual(subCanvasInlinePortSchema);
  });
  it('document is disposed and call toJSON should throw error', () => {
    document.dispose();
    expect(() => document.toJSON()).toThrowError(/disposed/);
  });
  it('lineData change trigger onContentChange', () => {
    document.fromJSON(baseJSON);
    let contentChangeEvent: WorkflowContentChangeEvent;
    document.onContentChange((e) => {
      contentChangeEvent = e;
    });
    const line = document.linesManager.getLine({
      from: 'start_0',
      to: 'condition_0',
    })!;
    line.lineData = { b: 33 };
    expect(document.toJSON().edges[0].data).toEqual({ b: 33 });
    expect(contentChangeEvent!.type).toEqual(WorkflowContentChangeType.LINE_DATA_CHANGE);
    expect(contentChangeEvent!.toJSON()).toEqual({
      sourceNodeID: 'start_0',
      targetNodeID: 'condition_0',
      data: { b: 33 },
    });
  });
});
