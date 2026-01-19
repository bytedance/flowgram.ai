/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createSelectBoxPlugin } from '@flowgram.ai/select-box-plugin';
import { createFreeStackPlugin, StackingContextManager } from '@flowgram.ai/free-stack-plugin';
import { createFreeLinesPlugin } from '@flowgram.ai/free-lines-plugin';
import {
  WorkflowCommands,
  WorkflowNodeEntity,
  WorkflowLineEntity,
  WorkflowDocumentContainerModule,
  WorkflowHoverService,
  WorkflowDocumentOptions,
  WorkflowDocumentOptionsDefault,
  WorkflowNodeMeta,
} from '@flowgram.ai/free-layout-core';
import { createFreeHoverPlugin } from '@flowgram.ai/free-hover-plugin';
import { HistoryService, createFreeHistoryPlugin } from '@flowgram.ai/free-history-plugin';
import { createFreeAutoLayoutPlugin } from '@flowgram.ai/free-auto-layout-plugin';
import {
  PluginsProvider,
  Plugin,
  createDefaultPreset,
  SelectionService,
  createShortcutsPlugin,
  EditorProps,
  createVariablePlugin,
  createPlaygroundPlugin,
  Command,
  PluginContext,
  FlowNodesContentLayer,
  FlowNodesTransformLayer,
  FlowScrollBarLayer,
  FlowScrollLimitLayer,
  createPlaygroundReactPreset,
} from '@flowgram.ai/editor';

import { WorkflowAutoLayoutTool } from '../tools';
import { createOperationPlugin } from '../plugins/create-operation-plugin';
import { fromNodeJSON, toNodeJSON } from './node-serialize';
import { FreeLayoutProps, FreeLayoutPluginContext } from './free-layout-props';

const renderElement = (ctx: PluginContext) => {
  const stackingContextManager = ctx.get<StackingContextManager>(StackingContextManager);
  if (stackingContextManager.node) {
    return stackingContextManager.node;
  }
};

export function createFreeLayoutPreset(
  opts: FreeLayoutProps
): PluginsProvider<FreeLayoutPluginContext> {
  return (ctx: FreeLayoutPluginContext) => {
    opts = {
      ...FreeLayoutProps.DEFAULT,
      ...opts,
      playground: {
        ...opts.playground,
        // 这里要把自由布局的 hoverService 注入进去
        get hoverService() {
          return ctx.get<WorkflowHoverService>(WorkflowHoverService);
        },
      },
    };

    let plugins: Plugin[] = [];
    /**
     * 注册默认的快捷键
     */
    plugins.push(
      createShortcutsPlugin({
        registerShortcuts(registry) {
          const selection = ctx.get<SelectionService>(SelectionService);
          registry.addHandlers({
            commandId: WorkflowCommands.DELETE_NODES,
            shortcuts: ['backspace', 'delete'],
            isEnabled: () =>
              selection.selection.length > 0 && !ctx.playground.config.readonlyOrDisabled,
            execute: () => {
              selection.selection.forEach((entity) => {
                if (entity instanceof WorkflowNodeEntity) {
                  if (!ctx.document.canRemove(entity)) {
                    return;
                  }
                  const nodeMeta = entity.getNodeMeta<WorkflowNodeMeta>();
                  const subCanvas = nodeMeta.subCanvas?.(entity);
                  if (subCanvas?.isCanvas) {
                    subCanvas.parentNode.dispose();
                    return;
                  }
                  entity.dispose();
                } else if (entity instanceof WorkflowLineEntity) {
                  if (!ctx.document.linesManager.canRemove(entity)) {
                    return;
                  }
                  entity.dispose();
                }
              });
              selection.selection = selection.selection.filter((s) => !s.disposed);
            },
          });

          if (opts?.history?.enable) {
            const fixedHistoryService = ctx.get<HistoryService>(HistoryService);
            if (!opts.history.disableShortcuts) {
              registry.addHandlers({
                commandId: Command.Default.UNDO,
                shortcuts: ['meta z', 'ctrl z'],
                isEnabled: () => true,
                execute: () => {
                  fixedHistoryService.undo();
                },
              });
              registry.addHandlers({
                commandId: Command.Default.REDO,
                shortcuts: ['meta shift z', 'ctrl shift z'],
                isEnabled: () => true,
                execute: () => {
                  fixedHistoryService.redo();
                },
              });
            }
          }
        },
      })
    );
    /**
     * 加载默认编辑器配置
     */
    plugins = createDefaultPreset(opts as EditorProps, plugins)(ctx);
    /**
     * 注册变量系统
     */
    if (opts.variableEngine?.enable) {
      plugins.push(
        createVariablePlugin({
          ...opts.variableEngine,
          layout: 'free',
        })
      );
    }
    if (opts.history?.enable) {
      plugins.push(createFreeHistoryPlugin(opts.history as any));
    }

    /**
     * 注册自由布局模块
     */
    plugins.push(
      createPlaygroundPlugin<FreeLayoutPluginContext>({
        onBind: (bindConfig) => {
          bindConfig.bind(WorkflowAutoLayoutTool).toSelf().inSingletonScope();
          bindConfig.rebind(WorkflowDocumentOptions).toConstantValue({
            canAddLine: opts.canAddLine?.bind(null, ctx),
            canDeleteLine: opts.canDeleteLine?.bind(null, ctx),
            isErrorLine: opts.isErrorLine?.bind(null, ctx),
            isErrorPort: opts.isErrorPort?.bind(null, ctx),
            isDisabledPort: opts.isDisabledPort?.bind(null, ctx),
            isReverseLine: opts.isReverseLine?.bind(null, ctx),
            isHideArrowLine: opts.isHideArrowLine?.bind(null, ctx),
            isFlowingLine: opts.isFlowingLine?.bind(null, ctx),
            isDisabledLine: opts.isDisabledLine?.bind(null, ctx),
            onDragLineEnd: opts.onDragLineEnd?.bind(null, ctx),
            setLineRenderType: opts.setLineRenderType?.bind(null, ctx),
            setLineClassName: opts.setLineClassName?.bind(null, ctx),
            canDeleteNode: opts.canDeleteNode?.bind(null, ctx),
            canResetLine: opts.canResetLine?.bind(null, ctx),
            canDropToNode: opts.canDropToNode?.bind(null, ctx),
            cursors: opts.cursors ?? WorkflowDocumentOptionsDefault.cursors,
            lineColor: opts.lineColor ?? WorkflowDocumentOptionsDefault.lineColor,
            allNodesDefaultExpanded: opts.allNodesDefaultExpanded,
            twoWayConnection: opts.twoWayConnection ?? true,
            enableReadonlyNodeDragging: opts.enableReadonlyNodeDragging ?? false,
            toNodeJSON: (node) => toNodeJSON(opts, node),
            fromNodeJSON: (node, json, isFirstCreate) =>
              fromNodeJSON(opts, node, json, isFirstCreate),
          } as WorkflowDocumentOptions);
        },
        onInit: (ctx) => {
          // 节点内容渲染
          ctx.playground.registerLayer(FlowNodesContentLayer);
          // 节点位置偏移计算
          ctx.playground.registerLayer(FlowNodesTransformLayer, {
            renderElement: () => {
              if (typeof renderElement === 'function') {
                return renderElement(ctx);
              } else {
                return renderElement;
              }
            },
          });
          if (opts.scroll?.enableScrollLimit) {
            // 控制滚动范围
            ctx.playground.registerLayer(FlowScrollLimitLayer);
          }
          if (!opts.scroll?.disableScrollBar) {
            // 控制条
            ctx.playground.registerLayer(FlowScrollBarLayer);
          }
          if (opts.scroll?.disableScroll) {
            ctx.playground.config.scrollDisable = true;
          }
          if (opts.onContentChange) {
            ctx.document.onContentChange((event) => opts.onContentChange!(ctx, event));
          }
        },
        containerModules: [WorkflowDocumentContainerModule],
      }),
      createOperationPlugin(opts),
      /**
       * 渲染层级管理
       */
      createFreeStackPlugin({}),
      /**
       * 线条渲染插件
       */
      createFreeLinesPlugin({}),
      /**
       * 节点 hover 插件
       */
      createFreeHoverPlugin({}),
      /**
       * 自动布局插件
       */
      createFreeAutoLayoutPlugin({}),
      /**
       * 选择框插件
       */
      createSelectBoxPlugin({
        canSelect: (e) => {
          // 需满足以下条件：
          // 1. 鼠标左键
          if (e.button !== 0) {
            return false;
          }
          // 2. 如存在自定义配置，以配置为准
          const element = e.target as Element;
          if (element) {
            if (element.classList.contains('gedit-flow-background-layer')) {
              return true;
            }
            if (element.closest('[data-flow-editor-selectable="true"]')) {
              return true;
            }
            if (element.closest('[data-flow-editor-selectable="false"]')) {
              return false;
            }
          }
          // 3. hover 到节点或者线条不能触发框选
          const hoverService = ctx.get<WorkflowHoverService>(WorkflowHoverService);
          if (hoverService.isSomeHovered()) {
            return false;
          }
          return true;
        },
        ignoreOneSelect: true, // 自由布局不选择单个节点
        ignoreChildrenLength: true, // 自由布局忽略子节点数量
        ...(opts.selectBox || {}),
      })
    );

    return createPlaygroundReactPreset(opts, plugins)(ctx);
  };
}
