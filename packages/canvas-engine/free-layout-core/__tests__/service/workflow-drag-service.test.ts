/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { interfaces } from 'inversify';
import { fireEvent, waitFor } from '@testing-library/react';
import { IPoint } from '@flowgram.ai/utils';
import { FlowNodeBaseType } from '@flowgram.ai/document';
import { PlaygroundConfigEntity, PositionData } from '@flowgram.ai/core';
import { TransformData } from '@flowgram.ai/core';

import { createWorkflowContainer, baseJSON, nestJSON } from '../mocks';
import {
  WorkflowDragService,
  WorkflowDocument,
  WorkflowNodePortsData,
  WorkflowLineEntity,
  WorkflowSelectService,
  WorkflowNodeEntity,
  WorkflowLinesManager,
  WorkflowPortEntity,
} from '../../src';

async function fireMouseEvent(type: string, point: IPoint): Promise<void> {
  fireEvent(
    document,
    new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      clientX: point.x,
      clientY: point.y,
    })
  );
  await waitFor(() => {}, { timeout: 100 });
}

describe('workflow-drag-service', () => {
  let dragService: WorkflowDragService;
  let container: interfaces.Container;
  let document: WorkflowDocument;
  let startNode: WorkflowNodeEntity;
  let endNode: WorkflowNodeEntity;
  let startPorts: WorkflowNodePortsData;
  let endPorts: WorkflowNodePortsData;
  let conditionPorts: WorkflowNodePortsData;

  async function drawingLine(
    point: IPoint,
    originLine?: WorkflowLineEntity
  ): Promise<{
    dragSuccess?: boolean; // 是否拖拽成功，不成功则为选择节点
    newLine?: WorkflowLineEntity; // 新的线条
  }> {
    const promise = dragService.startDrawingLine(
      startPorts.outputPorts[0]!,
      { clientX: 0, clientY: 0 },
      originLine
    );
    await fireMouseEvent('mousemove', point);
    await fireMouseEvent('mouseup', point);
    return promise;
  }

  async function drawingLineBetweenNodes(params: {
    from?: WorkflowNodeEntity;
    to?: WorkflowNodeEntity;
    fromPort?: WorkflowPortEntity;
    toPoint?: IPoint;
    middlePoints?: IPoint[];
  }): Promise<{
    dragSuccess?: boolean; // 是否拖拽成功，不成功则为选择节点
    newLine?: WorkflowLineEntity; // 新的线条
  }> {
    const { from, to, middlePoints } = params;
    const fromPortsData = from?.ports!;
    const toPortsData = to?.ports!;
    const fromPort = fromPortsData?.outputPorts?.[0] ?? params.fromPort;
    const fromPoint = fromPortsData?.getOutputPoint();
    const toPoint = toPortsData?.getInputPoint() ?? params.toPoint;
    if (!fromPort || !toPoint || !fromPoint) {
      return {
        dragSuccess: false,
      };
    }
    const promise = dragService.startDrawingLine(fromPortsData.outputPorts[0]!, {
      clientX: 0,
      clientY: 0,
    });
    const middlePoint: IPoint = {
      x: (fromPoint.x + toPoint.x) / 2,
      y: (fromPoint.y + toPoint.y) / 2,
    };
    // 开始拖拽
    await fireMouseEvent('mousemove', fromPoint);

    // 经过中间节点
    if (middlePoints?.length) {
      for (const point of middlePoints) {
        await fireMouseEvent('mousemove', point);
      }
    } else {
      await fireMouseEvent('mousemove', middlePoint);
    }

    // 结束拖拽
    await fireMouseEvent('mousemove', toPoint);
    await fireMouseEvent('mouseup', toPoint);
    return promise;
  }

  async function dragNodes(
    nodes: WorkflowNodeEntity[],
    point: IPoint,
    mouseConfig?: any,
    holdMs = 0
  ): Promise<boolean> {
    // Coordinate assertions should not depend on edge-scroll timer ticks.
    document.playgroundConfig.updateConfig({ width: 1000, height: 1000 });
    container.get(WorkflowSelectService).selection = nodes;
    const promise = dragService.startDragSelectedNodes({
      clientX: 0,
      clientY: 0,
      ...mouseConfig,
    });
    await fireMouseEvent('mousemove', point);
    if (holdMs) await vi.advanceTimersByTimeAsync(holdMs);
    await fireMouseEvent('mouseup', point);
    return promise;
  }

  beforeEach(async () => {
    container = createWorkflowContainer();
    dragService = container.get(WorkflowDragService);
    document = container.get(WorkflowDocument);
    await document.fromJSON({
      nodes: baseJSON.nodes,
      edges: [],
    });
    startNode = document.getNode('start_0')!;
    endNode = document.getNode('end_0')!;
    startPorts = startNode.ports!;
    endPorts = endNode.ports!;
    conditionPorts = document.getNode('condition_0')!.ports!;
  });
  it('startDrawingLine', async () => {
    // 连接到 end 节点
    const drawToEnd = await drawingLine(endPorts.getInputPoint());
    expect(drawToEnd.newLine!.id).toMatch('end_0');
    expect(document.linesManager.getAllLines().length).toEqual(1);
    // 连接到已有的线
    const drawToSame = await drawingLine(endPorts.getInputPoint());
    expect(drawToSame.newLine).toEqual(drawToEnd.newLine);
    // 连接到未知节点
    const drawUnknown = await drawingLine({ x: 9999, y: 9999 });
    expect(drawUnknown.newLine).toEqual(undefined);
    // 连接到输出点 (不能连接)
    // 该 case 下等同于拖拽到节点连线，注释 case
    // const drawToOutputPoint = await drawingLine(endPorts.getOutputPoint());
    // expect(drawToOutputPoint.newLine).toEqual(undefined);
  });
  it('startDrawingLine when readonly', async () => {
    container.get(PlaygroundConfigEntity).readonly = true;
    const drawToEnd = await drawingLine(endPorts.getInputPoint());
    expect(drawToEnd.dragSuccess).toEqual(false);
    expect(drawToEnd.newLine).toEqual(undefined);
  });
  it('startDrawingLine with originLine', async () => {
    const onDragLineEndCaller = vi.fn();
    dragService.onDragLineEnd(async () => {
      onDragLineEndCaller();
    });
    const startToEndLine = (await drawingLine(endPorts.getInputPoint())).newLine!;
    // 鼠标没有偏移
    const drawToZero = await drawingLine({ x: 0, y: 0 }, startToEndLine);
    expect(drawToZero.dragSuccess).toEqual(false);
    // 连到同一个点
    const drawToEnd = await drawingLine(endPorts.getInputPoint(), startToEndLine);
    expect(drawToEnd.dragSuccess).toEqual(true);
    expect(drawToEnd.newLine).toEqual(undefined);
    // 连到空白未知时候会把原来线条删除
    const drawUnknown = await drawingLine({ x: 999, y: 999 }, startToEndLine);
    expect(drawUnknown.dragSuccess).toEqual(true);
    expect(drawUnknown.newLine).toEqual(undefined);
    expect(startToEndLine.disposed).toEqual(true);
    expect(document.linesManager.getAllLines().length).toEqual(0);
    // 创建新的线条
    const newStartToEndLine = (await drawingLine(endPorts.getInputPoint())).newLine!;
    expect(document.linesManager.getAllLines().length).toEqual(1);
    expect(newStartToEndLine.id).toEqual(newStartToEndLine.id);
    expect(startToEndLine !== newStartToEndLine).toEqual(true);
    // 将线条重连到另外的未知
    const drawToOther = await drawingLine(conditionPorts.getInputPoint(), newStartToEndLine);
    expect(drawToOther.dragSuccess).toEqual(true);
    expect(drawToOther.newLine!.id).toMatch('condition_0');
    expect(newStartToEndLine.disposed).toEqual(true);
    expect(document.linesManager.getAllLines().length).toEqual(1);
    expect(onDragLineEndCaller).toHaveBeenCalledTimes(6);
  });
  it('startDrawingLine inside sub canvas', async () => {
    const linesManager = container.get(WorkflowLinesManager);
    vi.spyOn(linesManager, 'canAddLine').mockImplementation(
      (fromPort: WorkflowPortEntity, toPort: WorkflowPortEntity, silent?: boolean) => {
        if (toPort?.node.flowNodeType === FlowNodeBaseType.SUB_CANVAS) {
          return false;
        }
        return true;
      }
    );
    await document.fromJSON({
      nodes: [
        {
          id: 'sub_canvas_0',
          type: FlowNodeBaseType.SUB_CANVAS,
          meta: {
            isContainer: true,
            position: {
              x: 0,
              y: 0,
            },
            size: {
              width: 1000,
              height: 1000,
            },
          },
          blocks: [
            {
              id: 'from_0',
              type: 'from',
              meta: {
                position: {
                  x: 100,
                  y: 100,
                },
                size: {
                  width: 50,
                  height: 50,
                },
              },
            },
            {
              id: 'to_0',
              type: 'to',
              meta: {
                position: {
                  x: 700,
                  y: 700,
                },
                size: {
                  width: 50,
                  height: 50,
                },
              },
            },
          ],
          edges: [],
        },
      ],
      edges: [],
    });
    const fromNodeId = 'from_0';
    const toNodeId = 'to_0';
    const fromNode = document.getNode(fromNodeId)!;
    const toNode = document.getNode(toNodeId)!;
    expect(linesManager.getAllLines().length).toBe(0);
    const { dragSuccess, newLine } = await drawingLineBetweenNodes({
      from: fromNode,
      to: toNode,
    });
    const line = newLine as WorkflowLineEntity;
    expect(linesManager.getAllLines().length).toBe(1);
    expect(line.inContainer).toBeTruthy();
    expect(line.from?.id).toBe(fromNodeId);
    expect(line.to?.id).toBe(toNodeId);
    expect(dragSuccess).toBeTruthy();
    expect(line.id).toBe(`${fromNodeId}_-${toNodeId}_`);
  });
  it('resetLine', async () => {
    const selectService = container.get(WorkflowSelectService);
    const startToEndLine = (await drawingLine(endPorts.getInputPoint())).newLine!;
    // 点到同一个位置则选中线条
    dragService.resetLine(startToEndLine, {
      clientX: 0,
      clientY: 0,
    } as MouseEvent);
    await fireMouseEvent('mousemove', { x: 0, y: 0 });
    await fireMouseEvent('mouseup', { x: 0, y: 0 });
    expect(startToEndLine.isDrawing).toBeFalsy();
    expect(selectService.selection).toEqual([startToEndLine]);
    selectService.selection = [];
    // 点到不同位置
    dragService.resetLine(startToEndLine, {
      clientX: conditionPorts.getInputPoint().x,
      clientY: conditionPorts.getInputPoint().y,
    } as MouseEvent);
    await fireMouseEvent('mousemove', { x: 0, y: 0 });
    await fireMouseEvent('mouseup', { x: 0, y: 0 });
    // 交互定义，如果本来已经连线，拖拽的目标点不可连线，则重置连线位置。
    expect(startToEndLine.disposed).toEqual(false);
    expect(selectService.selection).toEqual([]);
  });
  it('canResetLine', async () => {
    document.options.canResetLine = () => false;
    const startToEndLine = (await drawingLine(endPorts.getInputPoint())).newLine!;
    const drawToOther = await drawingLine(conditionPorts.getInputPoint(), startToEndLine);
    expect(startToEndLine.disposed).toEqual(false);
    expect(drawToOther.newLine).toEqual(undefined);
  });
  it('canDeleteLine', async () => {
    document.options.canDeleteLine = () => false;
    const startToEndLine = (await drawingLine(endPorts.getInputPoint())).newLine!;
    await drawingLine({ x: 999, y: 999 }, startToEndLine);
    expect(startToEndLine.disposed).toEqual(false);
    document.options.canDeleteLine = () => true;
    await drawingLine({ x: 999, y: 999 }, startToEndLine);
    expect(startToEndLine.disposed).toEqual(true);
  });
  it('startDragSelectedNodes empty', async () => {
    const dragEmpty = await dragNodes([], { x: 0, y: 0 });
    expect(dragEmpty).toEqual(false);
  });
  it('startDragSelectedNodes', async () => {
    const dragResult = await dragNodes([startNode, endNode], {
      x: 100,
      y: 100,
    });
    expect(dragResult).toEqual(true);
    expect(startNode.getData(PositionData).toJSON()).toEqual({
      x: 100,
      y: 100,
    });
    expect(endNode.getData(PositionData).toJSON()).toEqual({ x: 900, y: 100 });
  });
  it('startDragSelectedNodes with same parent', async () => {
    await document.fromJSON({
      nodes: nestJSON.nodes,
      edges: [],
    });
    const loopNode = document.getNode('loop_0')!;
    const breakNode = document.getNode('break_0')!;
    const variableNode = document.getNode('variable_0')!;
    const dragResult = await dragNodes([breakNode, variableNode], {
      x: 100,
      y: 100,
    });
    expect(dragResult).toEqual(true);
    expect(breakNode.getData(PositionData).toJSON()).toEqual({
      x: 140,
      y: 0,
    });
    expect(variableNode.getData(PositionData).toJSON()).toEqual({
      x: 540,
      y: 0,
    });
    expect(loopNode.getData(PositionData).toJSON()).toEqual({
      x: 1160,
      y: 100,
    });
  });
  it.each([0, 40, 200])(
    'startDragSelectedNodes with different parent (%d ms hold)',
    async (holdMs) => {
      await document.fromJSON({
        nodes: nestJSON.nodes,
        edges: [],
      });
      const breakNode = document.getNode('break_0')!;
      vi.useFakeTimers();
      try {
        const dragResult = await dragNodes(
          [breakNode, startNode],
          {
            x: 100,
            y: 100,
          },
          undefined,
          holdMs
        );
        expect(dragResult).toEqual(true);
        expect(breakNode.getData(PositionData).toJSON()).toEqual({
          x: 100,
          y: 100,
        });
        expect(startNode.getData(PositionData).toJSON()).toEqual({ x: 100, y: 100 });
        expect(document.playgroundConfig.config.scrollX).toBe(0);
        expect(document.playgroundConfig.config.scrollY).toBe(0);
      } finally {
        vi.useRealTimers();
      }
    }
  );
  it('startDragCard', async () => {
    // 需要在 viewport 区域
    document.playgroundConfig.updateConfig({
      width: 1000,
      height: 1000,
    });
    const domNode = global.document.createElement('div');
    const promise = dragService.startDragCard(
      'mockType',
      { clientX: 0, clientY: 0, currentTarget: domNode } as any,
      {}
    );
    await fireMouseEvent('mousemove', { x: 100, y: 100 });
    await fireMouseEvent('mouseup', { x: 100, y: 100 });
    const result = await promise;
    expect(result!.flowNodeType).toEqual('mockType');
    expect(result!.getData(PositionData).toJSON()).toEqual({ x: 100, y: 100 });
  });
  it('startDragCard with cloneNode', async () => {
    // 需要在 viewport 区域
    document.playgroundConfig.updateConfig({
      width: 1000,
      height: 1000,
    });
    const domNode = global.document.createElement('div');
    const promise = dragService.startDragCard(
      'mockType',
      { clientX: 0, clientY: 0, currentTarget: domNode } as any,
      {},
      (e) => domNode.cloneNode(true) as HTMLDivElement
    );
    await fireMouseEvent('mousemove', { x: 100, y: 100 });
    await fireMouseEvent('mouseup', { x: 100, y: 100 });
    const result = await promise;
    expect(result!.flowNodeType).toEqual('mockType');
    expect(result!.getData(PositionData).toJSON()).toEqual({ x: 100, y: 100 });
  });
  it('startDragCard fail', async () => {
    document.playgroundConfig.updateConfig({
      width: 1000,
      height: 1000,
    });
    const domNode = global.document.createElement('div');
    const promise = dragService.startDragCard(
      'mockType',
      { clientX: 0, clientY: 0, currentTarget: domNode } as any,
      {}
    );
    await fireMouseEvent('mousemove', { x: -100, y: -100 });
    await fireMouseEvent('mouseup', { x: -100, y: -100 });
    const result = await promise;
    expect(result).toEqual(undefined);
  });
  it('dropCard', async () => {
    await document.fromJSON({
      nodes: nestJSON.nodes,
      edges: [],
    });
    // 需要在 viewport 区域
    document.playgroundConfig.updateConfig({
      width: 1000,
      height: 1000,
    });
    const domNode = global.document.createElement('div');
    const node = await dragService.dropCard(
      'loop',
      { clientX: 0, clientY: 0, currentTarget: domNode } as any,
      {}
    );
    expect(node!.flowNodeType).toEqual('loop');
    expect(node!.getData(PositionData).toJSON()).toEqual({ x: 0, y: 0 });
  });
  it('dropCard to parent node', async () => {
    await document.fromJSON({
      nodes: nestJSON.nodes,
      edges: [],
    });
    // 需要在 viewport 区域
    document.playgroundConfig.updateConfig({
      width: 1000,
      height: 1000,
    });
    const domNode = global.document.createElement('div');
    const node = await dragService.dropCard(
      'break',
      { clientX: 0, clientY: 0, currentTarget: domNode } as any,
      {},
      document.getNode('loop_0')!
    );
    expect(node!.flowNodeType).toEqual('break');
    expect(node!.getData(PositionData).toJSON()).toEqual({ x: -1200, y: 0 });
  });
  it('startDragCard and drop to container node', async () => {
    await document.fromJSON({
      nodes: [
        {
          id: 'loop_0',
          type: 'loop',
          meta: {
            position: { x: 0, y: 500 },
            size: { width: 100, height: 100 },
            selectable: () => true,
          },
          data: undefined,
        },
        {
          id: 'sub_canvas_0',
          type: FlowNodeBaseType.SUB_CANVAS,
          meta: {
            isContainer: true,
            position: { x: 0, y: -500 },
            size: { width: 1000, height: 1000 },
            selectable: true,
          },
          data: undefined,
        },
      ],
      edges: [],
    });
    const loopNode = document.getNode('loop_0')!;
    const subCanvas = document.getNode('sub_canvas_0')!;
    subCanvas.originParent = loopNode;
    const subCanvasTrans = subCanvas.getData(TransformData);
    subCanvasTrans.update({
      position: { x: 0, y: -500 },
      size: { width: 1000, height: 1000 },
    });
    subCanvasTrans.fireChange();
    // 需要在 viewport 区域
    document.playgroundConfig.updateConfig({
      width: 5000,
      height: 5000,
    });
    const domNode = global.document.createElement('div');
    const promise = dragService.startDragCard(
      'variable',
      { clientX: 0, clientY: 0, currentTarget: domNode } as any,
      {}
    );
    await fireMouseEvent('mousemove', { x: 0, y: 0 });
    expect((dragService as any)._droppableTransforms.length).toEqual(1);
    expect((dragService as any)._dropNode?.id).toEqual('sub_canvas_0');
    await fireMouseEvent('mousemove', { x: -2000, y: 0 });
    expect((dragService as any)._dropNode?.id).toBeUndefined();
    await fireMouseEvent('mousemove', { x: 10, y: 10 });
    await fireMouseEvent('mousemove', { x: 0, y: 0 });
    await fireMouseEvent('mouseup', { x: 0, y: 0 });
    const node = (await promise) as WorkflowNodeEntity;
    expect(node.parent?.id).toEqual('sub_canvas_0');
    expect(node.flowNodeType).toEqual('variable');
    expect(node.getData(PositionData).toJSON()).toEqual({ x: 0, y: 0 });
  });
  it('dispose', () => {
    dragService.dispose();
  });
  it('adjustSubNodePosition failed', () => {
    const pos = dragService.adjustSubNodePosition('variable', document.root);
    expect(pos).toStrictEqual({ x: 0, y: 0 });
  });
});
