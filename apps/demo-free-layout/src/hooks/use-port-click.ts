/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useCallback, useState } from 'react';

import {
  WorkflowNodePanelService,
  WorkflowNodePanelUtils,
  type CallNodePanelParams,
  type NodePanelResult,
} from '@flowgram.ai/free-node-panel-plugin';
import {
  delay,
  usePlayground,
  useService,
  WorkflowDocument,
  WorkflowDragService,
  WorkflowLinesManager,
  WorkflowNodeEntity,
  WorkflowNodeJSON,
  WorkflowPortEntity,
} from '@flowgram.ai/free-layout-editor';

/**
 * click port to trigger node select panel
 * 点击端口后唤起节点选择面板
 */
export const usePortClick = () => {
  const playground = usePlayground();
  const nodePanelService = useService(WorkflowNodePanelService);
  const document = useService(WorkflowDocument);
  const dragService = useService(WorkflowDragService);
  const linesManager = useService(WorkflowLinesManager);
  const [active, setActive] = useState(false);

  const singleSelectNodePanel = useCallback(
    async (
      params: Omit<CallNodePanelParams, 'onSelect' | 'onClose' | 'enableMultiAdd'>
    ): Promise<NodePanelResult | undefined> => {
      if (active) {
        return;
      }
      setActive(true);
      return new Promise((resolve) => {
        nodePanelService.callNodePanel({
          ...params,
          enableMultiAdd: false,
          onSelect: async (panelParams?: NodePanelResult) => {
            setActive(false);
            resolve(panelParams);
          },
          onClose: () => {
            setActive(false);
            resolve(undefined);
          },
        });
      });
    },
    [active]
  );

  const onPortClick = useCallback(
    async (e: React.MouseEvent, port: WorkflowPortEntity) => {
      if (port.portType === 'input') return;
      const mousePos = playground.config.getPosFromMouseEvent(e);
      const containerNode = port.node.parent;
      // open node selection panel - 打开节点选择面板
      const result = await singleSelectNodePanel({
        position: mousePos,
        containerNode,
        panelProps: {
          enableScrollClose: true,
          fromPort: port,
        },
      });

      // return if no node selected - 如果没有选择节点则返回
      if (!result) {
        return;
      }

      // get selected node type and data - 获取选择的节点类型和数据
      const { nodeType, nodeJSON } = result;

      // calculate position for the new node - 计算新节点的位置
      const nodePosition = WorkflowNodePanelUtils.adjustNodePosition({
        nodeType,
        position:
          port.location === 'bottom'
            ? {
                x: mousePos.x,
                y: mousePos.y + 100,
              }
            : {
                x: mousePos.x + 100,
                y: mousePos.y,
              },
        fromPort: port,
        containerNode,
        document,
        dragService,
      });

      // create new workflow node - 创建新的工作流节点
      const node: WorkflowNodeEntity = document.createWorkflowNodeByType(
        nodeType,
        nodePosition,
        nodeJSON ?? ({} as WorkflowNodeJSON),
        containerNode?.id
      );

      // wait for node render - 等待节点渲染
      await delay(20);

      // build connection line - 构建连接线
      WorkflowNodePanelUtils.buildLine({
        fromPort: port,
        node,
        linesManager,
      });
    },
    [singleSelectNodePanel]
  );

  return onPortClick;
};
