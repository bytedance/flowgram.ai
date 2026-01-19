/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { SelectBoxPluginOptions } from '@flowgram.ai/select-box-plugin';
import { HistoryService } from '@flowgram.ai/history';
import {
  LineColor,
  LineRenderType,
  onDragLineEndParams,
  WorkflowContentChangeEvent,
  WorkflowDocument,
  WorkflowJSON,
  WorkflowLineEntity,
  WorkflowLinePortInfo,
  type WorkflowLinesManager,
  WorkflowNodeEntity,
  WorkflowNodeRegistry,
  WorkflowPortEntity,
} from '@flowgram.ai/free-layout-core';
import { FreeHistoryPluginOptions } from '@flowgram.ai/free-history-plugin';
import {
  ClipboardService,
  EditorPluginContext,
  EditorProps,
  SelectionService,
  PluginContext,
  FlowNodeType,
} from '@flowgram.ai/editor';

import { WorkflowOperationService } from '../types';
import { AutoLayoutResetFn, AutoLayoutToolOptions } from '../tools';

export const FreeLayoutPluginContext = PluginContext;

export interface FreeLayoutPluginTools {
  autoLayout: (options?: AutoLayoutToolOptions) => Promise<AutoLayoutResetFn>;
  fitView: (easing?: boolean) => Promise<void>;
}

export interface FreeLayoutPluginContext extends EditorPluginContext {
  /**
   * 文档
   */
  document: WorkflowDocument;
  clipboard: ClipboardService;
  selection: SelectionService;
  /**
   * 提供对画布节点相关操作方法, 并 支持 redo/undo
   */
  operation: WorkflowOperationService;
  history: HistoryService;
  tools: FreeLayoutPluginTools;
}

/**
 * Free layout configuration
 * 自由布局配置
 */
export interface FreeLayoutProps extends EditorProps<FreeLayoutPluginContext, WorkflowJSON> {
  /**
   * SelectBox config
   * 选择框定义
   */
  selectBox?: SelectBoxPluginOptions;
  /**
   * Node registries
   * 节点注册
   */
  nodeRegistries?: WorkflowNodeRegistry[];
  /**
   * By default, all nodes are expanded
   * 默认是否展开所有节点
   */
  allNodesDefaultExpanded?: boolean;
  /*
   * Cursor configuration, support svg
   * 光标图片, 支持 svg
   */
  cursors?: {
    grab?: string;
    grabbing?: string;
  };
  /**
   * Line support both-way connection (default true)
   * 线条支持双向连接
   */
  twoWayConnection?: boolean;
  /**
   * Enable dragging of read-only nodes (default false)
   * 允许拖拽只读节点
   */
  enableReadonlyNodeDragging?: boolean;
  /**
   * History configuration
   */
  history?: FreeHistoryPluginOptions<FreeLayoutPluginContext> & { disableShortcuts?: boolean };
  /**
   * Line color configuration
   * 线条颜色
   */
  lineColor?: LineColor;
  /**
   * Listen for content change
   * 监听画布内容更新
   */
  onContentChange?: (ctx: FreeLayoutPluginContext, event: WorkflowContentChangeEvent) => void;
  /**
   * Determine whether the line is marked as error
   * 判断线条是否标红
   * @param ctx
   * @param fromPort
   * @param toPort
   * @param lines
   */
  isErrorLine?: (
    ctx: FreeLayoutPluginContext,
    fromPort: WorkflowPortEntity,
    toPort: WorkflowPortEntity | undefined,
    lines: WorkflowLinesManager
  ) => boolean;
  /**
   * Determine whether the port is marked as error
   * 判断端口是否标红
   * @param ctx
   * @param port
   */
  isErrorPort?: (ctx: FreeLayoutPluginContext, port: WorkflowPortEntity) => boolean;
  /**
   * Determine if the port is disabled
   * 判断端口是否禁用
   * @param ctx
   * @param port
   */
  isDisabledPort?: (ctx: FreeLayoutPluginContext, port: WorkflowPortEntity) => boolean;
  /**
   * Determine whether the line arrow is reversed
   * 判断线条箭头是否反转
   * @param ctx
   * @param line
   */
  isReverseLine?: (ctx: FreeLayoutPluginContext, line: WorkflowLineEntity) => boolean;
  /**
   * Determine if the line hides the arrow
   * 判断线条是否隐藏箭头
   * @param ctx
   * @param line
   */
  isHideArrowLine?: (ctx: FreeLayoutPluginContext, line: WorkflowLineEntity) => boolean;
  /**
   * Determine whether the line shows a flow effect
   * 判断线条是否展示流动效果
   * @param ctx
   * @param line
   */
  isFlowingLine?: (ctx: FreeLayoutPluginContext, line: WorkflowLineEntity) => boolean;
  /**
   * Determine if a line is disabled
   * 判断线条是否禁用
   * @param ctx
   * @param line
   */
  isDisabledLine?: (ctx: FreeLayoutPluginContext, line: WorkflowLineEntity) => boolean;
  /**
   * Listen for dragging the line to end
   * 拖拽线条结束
   * @param ctx
   * @param params
   */
  onDragLineEnd?: (ctx: FreeLayoutPluginContext, params: onDragLineEndParams) => Promise<void>;
  /**
   * Set the line renderer type
   * 设置线条渲染器类型
   * @param ctx
   * @param line
   */
  setLineRenderType?: (
    ctx: FreeLayoutPluginContext,
    line: WorkflowLineEntity
  ) => LineRenderType | undefined;
  /**
   * Set the line className
   * 设置线条样式
   * @param ctx
   * @param line
   */
  setLineClassName?: (ctx: FreeLayoutPluginContext, line: WorkflowLineEntity) => string | undefined;
  /**
   * Whether to create lines or not
   * 是否允许创建线条
   * @param ctx
   * @param fromPort - Source port
   * @param toPort - Target port
   */
  canAddLine?: (
    ctx: FreeLayoutPluginContext,
    fromPort: WorkflowPortEntity,
    toPort: WorkflowPortEntity,
    lines: WorkflowLinesManager,
    silent?: boolean
  ) => boolean;
  /**
   * Whether to allow the deletion of nodes
   * 是否允许删除节点
   * @param ctx
   * @param node - 目标节点
   * @param silent - 如果为false，可以加 toast 弹窗
   */
  canDeleteNode?: (
    ctx: FreeLayoutPluginContext,
    node: WorkflowNodeEntity,
    silent?: boolean
  ) => boolean;
  /**
   *
   * Whether to delete lines or not
   * 是否允许删除线条
   * @param ctx
   * @param line - target line
   * @param newLineInfo - new line info
   * @param silent - If false, you can add a toast pop-up
   */
  canDeleteLine?: (
    ctx: FreeLayoutPluginContext,
    line: WorkflowLineEntity,
    newLineInfo?: Required<WorkflowLinePortInfo>,
    silent?: boolean
  ) => boolean;
  /**
   * Whether to allow lines to be reset
   * 是否允许重置线条
   * @param ctx
   * @param oldLine - old line
   * @param newLineInfo - new line info
   * @param lines - lines manager
   */
  canResetLine?: (
    ctx: FreeLayoutPluginContext,
    oldLine: WorkflowLineEntity,
    newLineInfo: Required<WorkflowLinePortInfo>,
    lines: WorkflowLinesManager
  ) => boolean;
  /**
   * Whether to allow dragging into the sub-canvas (loop or group)
   * 是否允许拖入子画布 (loop or group)
   * @param params
   */
  canDropToNode?: (
    ctx: FreeLayoutPluginContext,
    params: {
      dragNodeType?: FlowNodeType;
      dragNode?: WorkflowNodeEntity;
      dropNode?: WorkflowNodeEntity;
      dropNodeType?: FlowNodeType;
    }
  ) => boolean;
}

export namespace FreeLayoutProps {
  /**
   * 默认配置
   */
  export const DEFAULT: FreeLayoutProps = {
    ...EditorProps.DEFAULT,
  } as FreeLayoutProps;
}
