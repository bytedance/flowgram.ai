/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import ReactDOM from 'react-dom';
import React from 'react';

import { inject, injectable } from 'inversify';
import { Rectangle, Xor } from '@flowgram.ai/utils';
import {
  FlowDocument,
  FlowNodeBaseType,
  FlowNodeEntity,
  FlowNodeRenderData,
  FlowNodeTransformData,
  FlowNodeTransitionData,
  FlowRendererStateEntity,
  type LABEL_SIDE_TYPE,
  FlowDragService,
  FlowNodeJSON,
} from '@flowgram.ai/document';
import {
  EditorState,
  EditorStateConfigEntity,
  Layer,
  observeEntity,
  observeEntityDatas,
  PlaygroundConfigEntity,
} from '@flowgram.ai/core';
import { PlaygroundDrag } from '@flowgram.ai/core';

import {
  type FlowRendererComponent,
  FlowRendererKey,
  FlowRendererRegistry,
} from '../flow-renderer-registry';
import { type CollisionRetType, FlowDragEntity } from '../entities/flow-drag-entity';
import { FlowSelectConfigEntity } from '../entities';

// 移动超过一定距离后触发拖拽生效
const DRAG_OFFSET = 10;

const DEFAULT_DRAG_OFFSET_X = 8;
const DEFAULT_DRAG_OFFSET_Y = 8;

interface Position {
  x: number;
  y: number;
}

type StartDragProps = {
  dragEntities?: FlowNodeEntity[];
} & Xor<
  {
    dragStartEntity: FlowNodeEntity;
  },
  {
    dragJSON: FlowNodeJSON;
    isBranch?: boolean;
    onCreateNode: (json: FlowNodeJSON, dropEntity: FlowNodeEntity) => Promise<FlowNodeEntity>;
  }
>;

export interface FlowDragOptions {
  onDrop?: (opts: { dragNodes: FlowNodeEntity[]; dropNode: FlowNodeEntity }) => void;
  canDrop?: (
    opts: {
      dropNode: FlowNodeEntity;
      isBranch?: boolean;
    } & Xor<
      {
        dragNodes: FlowNodeEntity[];
      },
      {
        dragJSON: FlowNodeJSON;
      }
    >
  ) => boolean;
}
/**
 * 监听节点的激活状态
 */
@injectable()
export class FlowDragLayer extends Layer<FlowDragOptions> {
  @inject(FlowDocument) readonly document: FlowDocument;

  @inject(FlowDragService) readonly flowDragService: FlowDragService;

  @observeEntityDatas(FlowNodeEntity, FlowNodeTransformData) transforms: FlowNodeTransformData[];

  @observeEntity(EditorStateConfigEntity)
  protected editorStateConfig: EditorStateConfigEntity;

  @observeEntity(PlaygroundConfigEntity)
  protected playgroundConfigEntity: PlaygroundConfigEntity;

  @observeEntity(FlowDragEntity)
  protected flowDragConfigEntity: FlowDragEntity;

  @observeEntity(FlowRendererStateEntity)
  protected flowRenderStateEntity: FlowRendererStateEntity;

  @observeEntity(FlowSelectConfigEntity)
  protected selectConfigEntity: FlowSelectConfigEntity;

  private initialPosition: Position;

  private disableDragScroll: Boolean = false;

  private dragJSON?: FlowNodeJSON;

  private onCreateNode?: (
    json: FlowNodeJSON,
    dropEntity: FlowNodeEntity
  ) => Promise<FlowNodeEntity>;

  dragOffset = {
    x: DEFAULT_DRAG_OFFSET_X,
    y: DEFAULT_DRAG_OFFSET_Y,
  };

  get transitions(): FlowNodeTransitionData[] {
    const result: FlowNodeTransitionData[] = [];
    this.document.traverse((entity) => {
      result.push(entity.getData<FlowNodeTransitionData>(FlowNodeTransitionData)!);
    });
    return result;
  }

  @inject(FlowRendererRegistry) readonly rendererRegistry: FlowRendererRegistry;

  get dragStartEntity() {
    return this.flowRenderStateEntity.getDragStartEntity()!;
  }

  set dragStartEntity(entity: FlowNodeEntity | undefined) {
    this.flowRenderStateEntity.setDragStartEntity(entity);
  }

  get dragEntities() {
    return this.flowRenderStateEntity.getDragEntities()!;
  }

  set dragEntities(entities: FlowNodeEntity[]) {
    this.flowRenderStateEntity.setDragEntities(entities);
  }

  private dragNodeComp: FlowRendererComponent;

  containerRef = React.createRef<HTMLDivElement>();

  draggingNodeMask = document.createElement('div');

  protected isGrab(): boolean {
    const currentState = this.editorStateConfig.getCurrentState();
    return currentState === EditorState.STATE_GRAB;
  }

  setDraggingStatus(status: boolean): void {
    if (this.flowDragService.nodeDragIdsWithChildren.length) {
      this.flowDragService.nodeDragIdsWithChildren.forEach((_id) => {
        const node = this.entityManager.getEntityById(_id);
        const data = node?.getData<FlowNodeRenderData>(FlowNodeRenderData)!;
        data.dragging = status;
      });
    }
    this.flowRenderStateEntity.setDragging(status);
  }

  dragEnable(e: MouseEvent) {
    return (
      Math.abs(e.clientX - this.initialPosition.x) > DRAG_OFFSET ||
      Math.abs(e.clientY - this.initialPosition.y) > DRAG_OFFSET
    );
  }

  handleMouseMove(event: MouseEvent) {
    if ((this.dragJSON || this.dragStartEntity) && this.dragEnable(event)) {
      // 变更拖拽节点的位置
      this.setDraggingStatus(true);
      const scale = this.playgroundConfigEntity.finalScale;

      if (this.containerRef.current) {
        const dragNode = this.containerRef.current.children?.[0];
        if (!dragNode) {
          return;
        }
        const clientBounds = this.playgroundConfigEntity.getClientBounds();
        const dragBlockX =
          event.clientX -
          (this.pipelineNode.offsetLeft || 0) -
          clientBounds.x -
          (dragNode.clientWidth - this.dragOffset.x) * scale;
        const dragBlockY =
          event.clientY -
          (this.pipelineNode.offsetTop || 0) -
          clientBounds.y -
          (dragNode.clientHeight - this.dragOffset.y) * scale;

        // 获取节点状态是节点类型还是分支类型
        const isBranch = this.flowDragService.isDragBranch;

        // 节点类型拖拽碰撞检测
        const draggingRect = new Rectangle(
          dragBlockX,
          dragBlockY,
          dragNode.clientWidth * scale,
          dragNode.clientHeight * scale
        );
        let side: LABEL_SIDE_TYPE | undefined;
        const collisionTransition = this.transitions.find((transition) => {
          // 过滤已被折叠 label
          if (transition?.entity?.parent?.collapsed) {
            return false;
          }
          const { hasCollision, labelOffsetType } = this.flowDragConfigEntity.isCollision(
            transition,
            draggingRect,
            isBranch
          ) as CollisionRetType;
          side = labelOffsetType;
          return hasCollision;
        });
        if (
          collisionTransition &&
          (isBranch
            ? this.flowDragService.isDroppableBranch(collisionTransition.entity, side)
            : this.flowDragService.isDroppableNode(collisionTransition.entity)) &&
          (!this.options.canDrop ||
            this.options.canDrop({
              dragNodes: this.dragEntities,
              dropNode: collisionTransition.entity,
              isBranch,
            }))
        ) {
          // 设置碰撞的 label id
          this.flowRenderStateEntity.setNodeDroppingId(collisionTransition.entity.id);
        } else {
          // 没有碰撞清空 highlight
          this.flowRenderStateEntity.setNodeDroppingId('');
        }

        // 判断拖拽种类是节点类型还是分支类型
        this.flowRenderStateEntity.setDragLabelSide(side);

        this.containerRef.current.style.visibility = 'visible';
        this.pipelineNode.parentElement!.appendChild(this.draggingNodeMask);

        this.containerRef.current.style.left = `${
          dragBlockX + this.pipelineNode.offsetLeft + clientBounds.x + window.scrollX
        }px`;
        this.containerRef.current.style.top = `${
          dragBlockY + this.pipelineNode.offsetTop + clientBounds.y + window.scrollY
        }px`;
        this.containerRef.current.style.transformOrigin = 'top left';
        this.containerRef.current.style.transform = `scale(${scale})`;

        if (!this.disableDragScroll) {
          this.flowDragConfigEntity.scrollDirection(event, dragBlockX, dragBlockY);
        }
      }
    }
  }

  async handleMouseUp() {
    this.setDraggingStatus(false);
    if (this.dragStartEntity || this.dragJSON) {
      const activatedNodeId = this.flowDragService.dropNodeId;

      if (activatedNodeId) {
        if (this.flowDragService.isDragBranch) {
          if (this.dragJSON) {
            await this.flowDragService.dropCreateNode(this.dragJSON, this.onCreateNode);
          } else {
            this.flowDragService.dropBranch();
          }
        } else {
          if (this.dragJSON) {
            await this.flowDragService.dropCreateNode(this.dragJSON, this.onCreateNode);
          } else {
            this.flowDragService.dropNode();
          }
          this.selectConfigEntity.clearSelectedNodes();
        }
      }

      // 清空碰撞 id
      this.flowRenderStateEntity.setNodeDroppingId('');
      this.flowRenderStateEntity.setDragLabelSide();
      this.flowRenderStateEntity.setIsBranch(false);
      this.dragStartEntity = undefined;
      this.dragEntities = [];

      // 滚动停止
      this.flowDragConfigEntity.stopAllScroll();
    }

    this.disableDragScroll = false;
    this.dragJSON = undefined;
    if (this.containerRef.current) {
      this.containerRef.current.style.visibility = 'hidden';
      if (this.pipelineNode.parentElement!.contains(this.draggingNodeMask)) {
        this.pipelineNode.parentElement!.removeChild(this.draggingNodeMask);
      }
    }
  }

  protected _dragger = new PlaygroundDrag({
    onDrag: (e) => {
      this.handleMouseMove(e);
    },
    onDragEnd: () => {
      this.handleMouseUp();
    },
    stopGlobalEventNames: ['contextmenu'],
  });

  /**
   * 开始拖拽事件
   * @param e
   */
  async startDrag(
    e: { clientX: number; clientY: number },
    {
      dragStartEntity: startEntityFromProps,
      dragEntities,
      dragJSON,
      isBranch,
      onCreateNode,
    }: StartDragProps,
    options?: {
      dragOffsetX?: number;
      dragOffsetY?: number;
      disableDragScroll?: boolean;
    }
  ) {
    // 1. 避免按住空格拖动滚动场景覆盖，context disabled 会出现在画布编辑被抢锁时候触发
    if (this.isGrab() || this.config.disabled || this.config.readonly) {
      return;
    }

    this.disableDragScroll = Boolean(options?.disableDragScroll);
    this.dragJSON = dragJSON;
    this.onCreateNode = onCreateNode;
    this.flowRenderStateEntity.setIsBranch(Boolean(isBranch));

    this.dragOffset.x = options?.dragOffsetX || DEFAULT_DRAG_OFFSET_X;
    this.dragOffset.y = options?.dragOffsetY || DEFAULT_DRAG_OFFSET_Y;

    const type = startEntityFromProps?.flowNodeType || dragJSON?.type;

    const isIcon = type === FlowNodeBaseType.BLOCK_ICON;
    const isOrderIcon = type === FlowNodeBaseType.BLOCK_ORDER_ICON;

    const dragStartEntity =
      isIcon || isOrderIcon ? startEntityFromProps!.parent! : startEntityFromProps;

    // 部分节点不支持拖拽
    if (dragStartEntity && !dragStartEntity!.getData(FlowNodeRenderData).draggable) {
      return;
    }

    this.initialPosition = {
      x: e.clientX,
      y: e.clientY,
    };

    this.dragStartEntity = dragStartEntity;
    this.dragEntities = dragEntities || (this.dragStartEntity ? [this.dragStartEntity!] : []);

    return this._dragger.start(e.clientX, e.clientY);
  }

  onReady() {
    this.draggingNodeMask.style.width = '100%';
    this.draggingNodeMask.style.height = '100%';
    this.draggingNodeMask.style.position = 'absolute';
    this.draggingNodeMask.classList.add('dragging-node');
    this.draggingNodeMask.style.zIndex = '99';
    this.draggingNodeMask.style.cursor = 'pointer';

    this.dragNodeComp = this.rendererRegistry.getRendererComponent(FlowRendererKey.DRAG_NODE);
    // 监听拖入事件
    if (this.options.onDrop) {
      this.toDispose.push(this.flowDragService.onDrop(this.options.onDrop));
    }
  }

  dispose(): void {
    this._dragger.dispose();
    super.dispose();
  }

  render() {
    // styled-component component type 为 any
    const DragComp: any = this.dragNodeComp.renderer;

    return ReactDOM.createPortal(
      <div
        ref={this.containerRef}
        style={{ position: 'absolute', zIndex: 99999, visibility: 'hidden' }}
        onMouseEnter={(e) => e.stopPropagation()}
      >
        <DragComp
          dragJSON={this.dragJSON}
          dragStart={this.dragStartEntity}
          dragNodes={this.dragEntities}
        />
      </div>,
      document.body
    );
  }
}
