/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { inject, injectable } from 'inversify';
import { domUtils } from '@flowgram.ai/utils';
import {
  CommandRegistry,
  ContextMenuService,
  EditorState,
  EditorStateConfigEntity,
  Layer,
  observeEntity,
  PipelineLayerPriority,
  PlaygroundConfigEntity,
  SelectionService,
} from '@flowgram.ai/core';

import {
  FlowRendererCommandCategory,
  FlowRendererKey,
  FlowRendererRegistry,
} from '../flow-renderer-registry';
import { SelectorBoxConfigEntity } from '../entities/selector-box-config-entity';
import { FlowSelectConfigEntity } from '../entities/flow-select-config-entity';

/**
 * 流程右键菜单
 */
@injectable()
export class FlowContextMenuLayer extends Layer {
  @inject(CommandRegistry) readonly commandRegistry: CommandRegistry;

  @inject(FlowRendererRegistry) readonly rendererRegistry: FlowRendererRegistry;

  @inject(ContextMenuService) readonly contextMenuService: ContextMenuService;

  @observeEntity(FlowSelectConfigEntity) protected flowSelectConfigEntity: FlowSelectConfigEntity;

  @inject(SelectionService) readonly selectionService: SelectionService;

  @observeEntity(PlaygroundConfigEntity)
  protected playgroundConfigEntity: PlaygroundConfigEntity;

  @observeEntity(EditorStateConfigEntity)
  protected editorStateConfig: EditorStateConfigEntity;

  @observeEntity(SelectorBoxConfigEntity)
  protected selectorBoxConfigEntity: SelectorBoxConfigEntity;

  readonly node = domUtils.createDivWithClass('gedit-context-menu-layer');

  readonly nodeRef = React.createRef<{
    setVisible: (v: boolean) => void;
  }>();

  isEnabled(): boolean {
    const currentState = this.editorStateConfig.getCurrentState();
    return (
      !this.config.disabled &&
      !this.config.readonly &&
      currentState === EditorState.STATE_SELECT &&
      !this.selectorBoxConfigEntity.disabled
    );
  }

  onReady(): void {
    // 这个是覆盖到节点上边的，所以要比 flow-nodes-content-layer 大
    this.node!.style.zIndex = '30';
    this.node!.style.display = 'block';
    // 监听鼠标右键
    this.toDispose.pushAll([
      this.listenPlaygroundEvent(
        'contextmenu',
        (e: MouseEvent): boolean | undefined => {
          if (!this.isEnabled()) return;
          this.contextMenuService.rightPanelVisible = true;
          const bounds = this.flowSelectConfigEntity.getSelectedBounds();
          if (bounds.width === 0 || bounds.height === 0) {
            return;
          }
          e.stopPropagation();
          e.preventDefault();

          this.nodeRef.current?.setVisible(true);
          const clientBounds = this.playgroundConfigEntity.getClientBounds();
          // 画布平移已改用 transform，offsetLeft/offsetTop 不再反映滚动偏移，
          // 用 config.scrollX/scrollY 代替（原 offsetLeft = -scrollX，故此处为 + scrollX）
          const dragBlockX = e.clientX + this.playgroundConfigEntity.config.scrollX - clientBounds.x;
          const dragBlockY = e.clientY + this.playgroundConfigEntity.config.scrollY - clientBounds.y;
          this.node.style.left = `${dragBlockX}px`;
          this.node.style.top = `${dragBlockY}px`;
        },
        PipelineLayerPriority.BASE_LAYER
      ),
      this.listenPlaygroundEvent('mousedown', () => {
        this.nodeRef.current?.setVisible(false);
        this.contextMenuService.rightPanelVisible = false;
      }),
    ]);
  }

  onScroll() {
    this.nodeRef.current?.setVisible(false);
  }

  onZoom() {
    this.nodeRef.current?.setVisible(false);
  }

  /**
   * Destroy
   */
  dispose(): void {
    super.dispose();
  }

  /**
   * 渲染工具栏
   */
  renderCommandMenus(): JSX.Element[] {
    return this.commandRegistry.commands
      .filter((cmd) => cmd.category === FlowRendererCommandCategory.SELECTOR_BOX)
      .map((cmd) => {
        const CommandRenderer = this.rendererRegistry.getRendererComponent(
          (cmd.icon as string) || cmd.id
        )?.renderer;
        return (
          <CommandRenderer
            key={cmd.id}
            command={cmd}
            isContextMenu
            disabled={!this.commandRegistry.isEnabled(cmd.id)}
            onClick={(e: any) => this.commandRegistry.executeCommand(cmd.id, e)}
          />
        );
      })
      .filter((c) => c);
  }

  render(): JSX.Element {
    const SelectorBoxPopover = this.rendererRegistry.getRendererComponent(
      FlowRendererKey.CONTEXT_MENU_POPOVER
    ).renderer;
    return <SelectorBoxPopover ref={this.nodeRef} content={this.renderCommandMenus()} />;
  }
}
