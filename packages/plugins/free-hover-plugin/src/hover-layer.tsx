/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, injectable } from 'inversify';
import { type IPoint } from '@flowgram.ai/utils';
import { SelectorBoxConfigEntity } from '@flowgram.ai/renderer';
import {
  WorkflowDocument,
  WorkflowDragService,
  WorkflowHoverService,
  WorkflowLineEntity,
  WorkflowLinesManager,
  WorkflowNodeEntity,
  WorkflowSelectService,
} from '@flowgram.ai/free-layout-core';
import { WorkflowPortEntity } from '@flowgram.ai/free-layout-core';
import {
  EditorState,
  EditorStateConfigEntity,
  Layer,
  PlaygroundConfigEntity,
  observeEntity,
  type LayerOptions,
} from '@flowgram.ai/core';

import { getSelectionBounds } from './selection-utils';
const PORT_BG_CLASS_NAME = 'workflow-port-bg';

export interface HoverLayerOptions extends LayerOptions {
  canHovered?: (e: MouseEvent, service: WorkflowHoverService) => boolean;
}

export namespace HoverLayerOptions {
  export const DEFAULT: HoverLayerOptions = {
    canHovered: () => true,
  };
}

const LINE_CLASS_NAME = '.gedit-flow-activity-line';
const NODE_CLASS_NAME = '.gedit-flow-activity-node';

@injectable()
export class HoverLayer extends Layer<HoverLayerOptions> {
  static type = 'HoverLayer';

  @inject(WorkflowDocument) document: WorkflowDocument;

  @inject(WorkflowSelectService) selectionService: WorkflowSelectService;

  @inject(WorkflowDragService) dragService: WorkflowDragService;

  @inject(WorkflowHoverService) hoverService: WorkflowHoverService;

  @inject(WorkflowLinesManager)
  linesManager: WorkflowLinesManager;

  @observeEntity(EditorStateConfigEntity)
  protected editorStateConfig: EditorStateConfigEntity;

  @observeEntity(SelectorBoxConfigEntity)
  protected selectorBoxConfigEntity: SelectorBoxConfigEntity;

  @inject(PlaygroundConfigEntity) configEntity: PlaygroundConfigEntity;

  /**
   * 是否正在调整线条
   * @protected
   */
  get isDrawing(): boolean {
    return this.linesManager.isDrawing;
  }

  onReady(): void {
    this.options = {
      ...HoverLayerOptions.DEFAULT,
      ...this.options,
    };
    this.toDispose.pushAll([
      // 监听主动触发的 hover 事件
      this.hoverService.onUpdateHoverPosition((hoverPosition) => {
        const { position, target } = hoverPosition;
        const canvasPosition = this.config.getPosFromMouseEvent({
          clientX: position.x,
          clientY: position.y,
        });
        this.updateHoveredState(canvasPosition, target);
      }),
      // 监听画布鼠标移动事件
      this.listenPlaygroundEvent('mousemove', (e: MouseEvent) => {
        this.hoverService.hoveredPos = this.config.getPosFromMouseEvent(e);
        if (!this.isEnabled()) {
          return;
        }
        if (!this.options.canHovered!(e, this.hoverService)) {
          return;
        }
        const mousePos = this.config.getPosFromMouseEvent(e);
        // 更新 hover 状态
        this.updateHoveredState(mousePos, e?.target as HTMLElement);
      }),
      // 控制触控
      this.listenPlaygroundEvent('touchstart', (e: MouseEvent): boolean | undefined => {
        if (!this.isEnabled() || this.isDrawing) {
          return undefined;
        }
        return this.handleDragLine(e);
      }),
      // 控制选中逻辑
      this.listenPlaygroundEvent('mousedown', (e: MouseEvent): boolean | undefined => {
        if (!this.isEnabled() || this.isDrawing) {
          return undefined;
        }
        const { hoveredNode } = this.hoverService;
        const lineDrag = this.handleDragLine(e);
        if (lineDrag) {
          return true;
        }
        const mousePos = this.config.getPosFromMouseEvent(e);
        const selectionBounds = getSelectionBounds(
          this.selectionService.selection,
          // 这里只考虑多选模式，单选模式已经下沉到 use-node-render 中
          true
        );
        if (selectionBounds.width > 0 && selectionBounds.contains(mousePos.x, mousePos.y)) {
          /**
           * 拖拽选择框
           */
          this.dragService.startDragSelectedNodes(e)?.then((dragSuccess) => {
            if (!dragSuccess) {
              // 拖拽没有成功触发了点击
              if (hoveredNode && hoveredNode instanceof WorkflowNodeEntity) {
                // 追加选择
                if (e.shiftKey) {
                  this.selectionService.toggleSelect(hoveredNode);
                } else {
                  this.selectionService.selectNode(hoveredNode);
                }
              } else {
                this.selectionService.clear();
              }
            }
          });
          // 这里会组织触发 selector box
          return true;
        } else {
          if (!hoveredNode) {
            this.selectionService.clear();
          }
        }
        return undefined;
      }),
    ]);
  }

  /**
   * 更新 hoverd
   * @param mousePos
   */
  updateHoveredState(mousePos: IPoint, target?: HTMLElement): void {
    const { hoverService } = this;
    const { output: outputPortHovered, input: inputPortHovered } =
      this.linesManager.getPortsFromMousePos(mousePos);
    const nodeHovered = this.linesManager.getHoverNodeFromMousePos(mousePos);
    // 在两个端口叠加情况，优先使用 outputPort
    const portHovered = outputPortHovered || inputPortHovered;

    const checkTargetFromLine = Boolean(target?.closest?.(LINE_CLASS_NAME));
    if (portHovered) {
      if (this.document.options.twoWayConnection) {
        hoverService.updateHoveredKey(portHovered.id);
      } else {
        // 默认 只有 output 点位可以 hover
        if (portHovered.portType === 'output') {
          hoverService.updateHoveredKey(portHovered.id);
        } else if (checkTargetFromLine || target?.className?.includes?.(PORT_BG_CLASS_NAME)) {
          // 输入点采用获取最接近的线条
          const lineHovered = this.linesManager.getCloseInLineFromMousePos(mousePos);
          if (lineHovered) {
            this.updateHoveredKey(lineHovered.id);
          }
        }
      }
      return;
    }

    // Drawing 情况，不能选中节点和线条
    if (this.isDrawing) {
      return;
    }

    // 判断当前鼠标位置所在元素是否在节点内部
    const checkTargetFromNode = Boolean(target?.closest?.(NODE_CLASS_NAME));

    if (nodeHovered || checkTargetFromNode) {
      if (nodeHovered?.id) {
        this.updateHoveredKey(nodeHovered.id);
      }
    }

    // 获取最接近的线条
    // 线条会相交需要获取最接近点位的线条，不能删除的线条不能被选中
    const lineHovered = checkTargetFromLine
      ? this.linesManager.getCloseInLineFromMousePos(mousePos)
      : undefined;

    if (nodeHovered && lineHovered) {
      const nodeStackIndex = nodeHovered.renderData.stackIndex;
      const lineStackIndex = lineHovered.stackIndex;
      if (nodeStackIndex > lineStackIndex) {
        return this.updateHoveredKey(nodeHovered.id);
      } else {
        return this.updateHoveredKey(lineHovered.id);
      }
    }

    // 判断节点是否 hover
    if (nodeHovered) {
      return this.updateHoveredKey(nodeHovered.id);
    }
    // 判断线条是否 hover
    if (lineHovered) {
      return this.updateHoveredKey(lineHovered.id);
    }

    // 上述逻辑都未命中 则清空 hovered
    hoverService.clearHovered();

    const currentState = this.editorStateConfig.getCurrentState();
    const isMouseFriendly = currentState === EditorState.STATE_MOUSE_FRIENDLY_SELECT;

    // 鼠标优先，并且不是按住 shift 键，更新为小手
    if (isMouseFriendly && !this.editorStateConfig.isPressingShift) {
      this.configEntity.updateCursor('grab');
    }
  }

  updateHoveredKey(key: string): void {
    // 鼠标优先交互模式，如果是 hover，需要将鼠标的小手去掉，还原鼠标原有样式
    this.configEntity.updateCursor('default');
    this.hoverService.updateHoveredKey(key);
  }

  /**
   * 判断是否能够 hover
   * @returns 是否能 hover
   */
  isEnabled(): boolean {
    const currentState = this.editorStateConfig.getCurrentState();
    // 选择框情况禁止 hover
    return (
      // 鼠标友好模式下，也需要支持 hover 效果，不然线条选择不到
      // Coze 中没有使用该插件，需要在 workflow/render 包相应位置改动
      (currentState === EditorState.STATE_SELECT ||
        currentState === EditorState.STATE_MOUSE_FRIENDLY_SELECT) &&
      !this.selectorBoxConfigEntity.isStart &&
      !this.dragService.isDragging
    );
  }

  private handleDragLine(e: MouseEvent): boolean | undefined {
    const { someHovered } = this.hoverService;
    // 重置线条
    if (someHovered && someHovered instanceof WorkflowLineEntity) {
      this.dragService.resetLine(someHovered, e);
      return true;
    }
    if (
      someHovered &&
      someHovered instanceof WorkflowPortEntity &&
      !someHovered.disabled &&
      e.button !== 1
    ) {
      e.stopPropagation();
      e.preventDefault();
      this.dragService.startDrawingLine(someHovered, e);
      return true;
    }
  }
}
