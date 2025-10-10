/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable no-console */
import { useMemo } from 'react';

import { debounce } from 'lodash-es';
import { createPanelManagerPlugin } from '@flowgram.ai/panel-manager-plugin';
import { createMinimapPlugin } from '@flowgram.ai/minimap-plugin';
import { createFreeStackPlugin } from '@flowgram.ai/free-stack-plugin';
import { createFreeSnapPlugin } from '@flowgram.ai/free-snap-plugin';
import { createFreeNodePanelPlugin } from '@flowgram.ai/free-node-panel-plugin';
import { createFreeLinesPlugin } from '@flowgram.ai/free-lines-plugin';
import {
  FlowNodeBaseType,
  FreeLayoutPluginContext,
  FreeLayoutProps,
  WorkflowNodeEntity,
} from '@flowgram.ai/free-layout-editor';
import { createFreeGroupPlugin } from '@flowgram.ai/free-group-plugin';
import { createContainerNodePlugin } from '@flowgram.ai/free-container-plugin';

import { canContainNode, onDragLineEnd } from '../utils';
import { FlowNodeRegistry, FlowDocumentJSON } from '../typings';
import { shortcuts } from '../shortcuts';
import { CustomService } from '../services';
import { GetGlobalVariableSchema } from '../plugins/variable-panel-plugin';
import { WorkflowRuntimeService } from '../plugins/runtime-plugin/runtime-service';
import {
  createRuntimePlugin,
  createContextMenuPlugin,
  createVariablePanelPlugin,
} from '../plugins';
import { defaultFormMeta } from '../nodes/default-form-meta';
import { WorkflowNodeType } from '../nodes';
import { testRunPanelFactory } from '../components/testrun/testrun-panel';
import { nodeFormPanelFactory } from '../components/sidebar';
import { SelectorBoxPopover } from '../components/selector-box-popover';
import { problemPanelFactory } from '../components/problem-panel';
import { BaseNode, CommentRender, GroupNodeRender, LineAddButton, NodePanel } from '../components';

export function useEditorProps(
  initialData: FlowDocumentJSON,
  nodeRegistries: FlowNodeRegistry[]
): FreeLayoutProps {
  return useMemo<FreeLayoutProps>(
    () => ({
      /**
       * Whether to enable the background
       */
      background: true,
      /**
       * 画布相关配置
       * Canvas-related configurations
       */
      playground: {
        /**
         * Prevent Mac browser gestures from turning pages
         * 阻止 mac 浏览器手势翻页
         */
        preventGlobalGesture: true,
      },
      /**
       * Whether it is read-only or not, the node cannot be dragged in read-only mode
       */
      readonly: false,
      /**
       * Line support both-way connection (default true)
       * 线条支持双向连接
       */
      twoWayConnection: true,
      /**
       * Initial data
       * 初始化数据
       */
      initialData,
      /**
       * Node registries
       * 节点注册
       */
      nodeRegistries,
      /**
       * Get the default node registry, which will be merged with the 'nodeRegistries'
       * 提供默认的节点注册，这个会和 nodeRegistries 做合并
       */
      getNodeDefaultRegistry(type) {
        return {
          type,
          meta: {
            defaultExpanded: true,
          },
          formMeta: defaultFormMeta,
        };
      },
      /**
       * 节点数据转换, 由 ctx.document.fromJSON 调用
       * Node data transformation, called by ctx.document.fromJSON
       * @param node
       * @param json
       */
      fromNodeJSON(node, json) {
        return json;
      },
      /**
       * 节点数据转换, 由 ctx.document.toJSON 调用
       * Node data transformation, called by ctx.document.toJSON
       * @param node
       * @param json
       */
      toNodeJSON(node, json) {
        return json;
      },
      lineColor: {
        hidden: 'var(--g-workflow-line-color-hidden,transparent)',
        default: 'var(--g-workflow-line-color-default,#4d53e8)',
        drawing: 'var(--g-workflow-line-color-drawing, #5DD6E3)',
        hovered: 'var(--g-workflow-line-color-hover,#37d0ff)',
        selected: 'var(--g-workflow-line-color-selected,#37d0ff)',
        error: 'var(--g-workflow-line-color-error,red)',
        flowing: 'var(--g-workflow-line-color-flowing,#4d53e8)',
      },
      /*
       * Check whether the line can be added
       * 判断是否连线
       */
      canAddLine(ctx, fromPort, toPort) {
        // Cannot be a self-loop on the same node / 不能是同一节点自循环
        if (fromPort.node === toPort.node) {
          return false;
        }
        // Cannot be in different containers - 不能在不同容器
        if (
          fromPort.node.parent?.id !== toPort.node.parent?.id &&
          ![fromPort.node.parent?.flowNodeType, toPort.node.parent?.flowNodeType].includes(
            FlowNodeBaseType.GROUP
          )
        ) {
          return false;
        }
        /**
         * 线条环检测，不允许连接到前面的节点
         * Line loop detection, which is not allowed to connect to the node in front of it
         */
        return !fromPort.node.lines.allInputNodes.includes(toPort.node);
      },
      /**
       * Check whether the line can be deleted, this triggers on the default shortcut `Bakspace` or `Delete`
       * 判断是否能删除连线, 这个会在默认快捷键 (Backspace or Delete) 触发
       */
      canDeleteLine(ctx, line, newLineInfo, silent) {
        return true;
      },
      /**
       * Check whether the node can be deleted, this triggers on the default shortcut `Bakspace` or `Delete`
       * 判断是否能删除节点, 这个会在默认快捷键 (Backspace or Delete) 触发
       */
      canDeleteNode(ctx, node) {
        return true;
      },
      /**
       * 是否允许拖入子画布 (loop or group)
       * Whether to allow dragging into the sub-canvas (loop or group)
       */
      canDropToNode: (ctx, params) => canContainNode(params.dragNodeType!, params.dropNodeType!),
      /**
       * Whether to reset line
       * 是否允许重连
       * @param ctx
       * @param oldLine
       * @param newLineInfo
       */
      canResetLine: (ctx, oldLine, newLineInfo) => true,
      /**
       * Drag the end of the line to create an add panel (feature optional)
       * 拖拽线条结束需要创建一个添加面板 （功能可选）
       * 希望提供控制线条粗细的配置项
       */
      onDragLineEnd,
      /**
       * SelectBox config
       */
      selectBox: {
        SelectorBoxPopover,
      },
      scroll: {
        /**
         * Whether to restrict the node from rolling out of the canvas needs to be closed because there is a running results pane
         * 是否限制节点不能滚出画布，由于有运行结果面板，所以需要关闭
         */
        enableScrollLimit: false,
      },
      materials: {
        components: {},
        /**
         * Render Node
         */
        renderDefaultNode: BaseNode,
        renderNodes: {
          [WorkflowNodeType.Comment]: CommentRender,
        },
      },
      /**
       * Node engine enable, you can configure formMeta in the FlowNodeRegistry
       */
      nodeEngine: {
        enable: true,
      },
      /**
       * Variable engine enable
       */
      variableEngine: {
        enable: true,
      },
      /**
       * Redo/Undo enable
       */
      history: {
        enable: true,
        /**
         * Listen form data change, default true
         */
        enableChangeNode: true,
      },
      /**
       * Content change
       */
      onContentChange: debounce((ctx: FreeLayoutPluginContext, event) => {
        if (ctx.document.disposed) return;

        console.log('Auto Save: ', event, {
          ...ctx.document.toJSON(),
          globalVariable: ctx.get<GetGlobalVariableSchema>(GetGlobalVariableSchema)(),
        });
      }, 1000),
      /**
       * Running line
       */
      isFlowingLine: (ctx, line) => ctx.get(WorkflowRuntimeService).isFlowingLine(line),
      /**
       * Shortcuts
       */
      shortcuts,
      /**
       * Bind custom service
       */
      onBind: ({ bind }) => {
        bind(CustomService).toSelf().inSingletonScope();
      },
      /**
       * Playground init
       */
      onInit(ctx) {
        console.log('--- Playground init ---');
      },
      /**
       * Playground render
       */
      onAllLayersRendered(ctx) {
        // ctx.tools.autoLayout(); // init auto layout
        ctx.tools.fitView(false);
        console.log('--- Playground rendered ---');
      },
      /**
       * Playground dispose
       */
      onDispose() {
        console.log('---- Playground Dispose ----');
      },
      i18n: {
        locale: navigator.language,
        languages: {
          'zh-CN': {
            'Never Remind': '不再提示',
            'Hold {{key}} to drag node out': '按住 {{key}} 可以将节点拖出',
          },
          'en-US': {},
        },
      },
      plugins: () => [
        /**
         * Custom node sorting, the code below will make the comment nodes always below the normal nodes
         * 自定义节点排序，下边的代码会让 comment 节点永远在普通节点下边
         */
        createFreeStackPlugin({
          sortNodes: (nodes: WorkflowNodeEntity[]) => {
            const commentNodes: WorkflowNodeEntity[] = [];
            const otherNodes: WorkflowNodeEntity[] = [];
            nodes.forEach((node) => {
              if (node.flowNodeType === WorkflowNodeType.Comment) {
                commentNodes.push(node);
              } else {
                otherNodes.push(node);
              }
            });
            return [...commentNodes, ...otherNodes];
          },
        }),
        /**
         * Line render plugin
         * 连线渲染插件
         */
        createFreeLinesPlugin({
          renderInsideLine: LineAddButton,
        }),
        /**
         * Minimap plugin
         * 缩略图插件
         */
        createMinimapPlugin({
          disableLayer: true,
          canvasStyle: {
            canvasWidth: 182,
            canvasHeight: 102,
            canvasPadding: 50,
            canvasBackground: 'rgba(242, 243, 245, 1)',
            canvasBorderRadius: 10,
            viewportBackground: 'rgba(255, 255, 255, 1)',
            viewportBorderRadius: 4,
            viewportBorderColor: 'rgba(6, 7, 9, 0.10)',
            viewportBorderWidth: 1,
            viewportBorderDashLength: undefined,
            nodeColor: 'rgba(0, 0, 0, 0.10)',
            nodeBorderRadius: 2,
            nodeBorderWidth: 0.145,
            nodeBorderColor: 'rgba(6, 7, 9, 0.10)',
            overlayColor: 'rgba(255, 255, 255, 0.55)',
          },
        }),

        /**
         * Snap plugin
         * 自动对齐及辅助线插件
         */
        createFreeSnapPlugin({
          edgeColor: '#00B2B2',
          alignColor: '#00B2B2',
          edgeLineWidth: 1,
          alignLineWidth: 1,
          alignCrossWidth: 8,
        }),
        /**
         * NodeAddPanel render plugin
         * 节点添加面板渲染插件
         */
        createFreeNodePanelPlugin({
          renderer: NodePanel,
        }),
        /**
         * This is used for the rendering of the loop node sub-canvas
         * 这个用于 loop 节点子画布的渲染
         */
        createContainerNodePlugin({}),
        /**
         * Group plugin
         */
        createFreeGroupPlugin({
          groupNodeRender: GroupNodeRender,
        }),
        /**
         * ContextMenu plugin
         */
        createContextMenuPlugin({}),
        /**
         * Runtime plugin
         * ⚠️ Browser mode is for demo only; for production, please deploy the server-side runtime
         * https://flowgram.ai/guide/runtime/introduction.html
         */
        createRuntimePlugin({
          mode: 'browser', // browser mode is for demo only!
          // mode: 'server',
          // serverConfig: {
          //   domain: 'localhost',
          //   port: 4000,
          //   protocol: 'http',
          // },
        }),

        /**
         * Variable panel plugin
         * 变量面板插件
         */
        createVariablePanelPlugin({
          initialData: initialData.globalVariable,
        }),
        /** Float layout plugin */
        createPanelManagerPlugin({
          factories: [nodeFormPanelFactory, testRunPanelFactory, problemPanelFactory],
        }),
      ],
    }),
    []
  );
}
