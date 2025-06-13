import { inject, injectable, multiInject, optional } from 'inversify';
import { I18n } from '@flowgram.ai/i18n';
import { type Layer, type LayerRegistry, PipelineRegistry } from '@flowgram.ai/core';

import { FlowRendererContribution } from './flow-renderer-contribution';

export enum FlowRendererComponentType {
  REACT, // react 组件
  DOM, // dom 组件
  TEXT, // 文案
}

export enum FlowRendererKey {
  NODE_RENDER = 'node-render', // 节点渲染
  ADDER = 'adder', // 添加按钮渲染
  COLLAPSE = 'collapse', // 节点展开收起标签（包含展开态和收起态）
  BRANCH_ADDER = 'branch-adder', // 分支添加按钮
  TRY_CATCH_COLLAPSE = 'try-catch-collapse', // 错误处理分支整体收起
  DRAG_NODE = 'drag-node', // 拖拽节点
  DRAGGABLE_ADDER = 'draggable-adder', // 拖拽可被拖入
  DRAG_HIGHLIGHT_ADDER = 'drag-highlight-adder', // 拖拽高亮
  DRAG_BRANCH_HIGHLIGHT_ADDER = 'drag-branch-highlight-adder', // 分支拖拽添加高亮
  SELECTOR_BOX_POPOVER = 'selector-box-popover', // 选择框右上角菜单
  CONTEXT_MENU_POPOVER = 'context-menu-popover', // 右键菜单
  SUB_CANVAS = 'sub-canvas', // 子画布渲染

  // 工作流线条箭头自定义渲染
  ARROW_RENDERER = 'arrow-renderer', // 工作流线条箭头渲染器

  // 下边两个不一定存在
  MARKER_ARROW = 'marker-arrow', // loop 的默认箭头
  MARKER_ACTIVATE_ARROW = 'marker-active-arrow', // loop 的激活态箭头
}

export enum FlowTextKey {
  // 循环节点相关
  LOOP_END_TEXT = 'loop-end-text', // 文案：循环结束
  LOOP_TRAVERSE_TEXT = 'loop-traverse-text', // 文案：循环遍历
  LOOP_WHILE_TEXT = 'loop-while-text', // 文案：满足条件时
  // TryCatch 相关
  TRY_START_TEXT = 'try-start-text', // 文案：监控开始
  TRY_END_TEXT = 'try-end-text', // 文案：监控结束
  CATCH_TEXT = 'catch-text', // 发生错误
}

export interface FlowRendererComponent {
  type: FlowRendererComponentType;
  renderer: (props?: any) => any;
}

/**
 * 命令分类
 */
export enum FlowRendererCommandCategory {
  SELECTOR_BOX = 'SELECTOR_BOX', // 选择框
}

@injectable()
export class FlowRendererRegistry {
  private componentsMap = new Map<string, FlowRendererComponent>();

  private textMap = new Map<string, string>();

  @multiInject(FlowRendererContribution)
  @optional()
  private contribs: FlowRendererContribution[] = [];

  @inject(PipelineRegistry) readonly pipeline: PipelineRegistry;

  init() {
    this.contribs.forEach((contrib) => contrib.registerRenderer?.(this));
  }

  /**
   * 注册 组件数据
   */
  registerRendererComponents(
    renderKey: FlowRendererKey | string,
    comp: FlowRendererComponent
  ): void {
    this.componentsMap.set(renderKey, comp);
  }

  registerReactComponent(renderKey: FlowRendererKey | string, renderer: (props: any) => any): void {
    this.componentsMap.set(renderKey, {
      type: FlowRendererComponentType.REACT,
      renderer,
    });
  }

  /**
   * 注册文案
   */
  registerText(configs: Record<FlowTextKey | string, string>): void {
    Object.entries(configs).forEach(([key, value]) => {
      this.textMap.set(key, value);
    });
  }

  getText(textKey: string) {
    return I18n.t(textKey, { disableReturnKey: true }) || this.textMap.get(textKey);
  }

  /**
   * TODO: support memo
   */
  public getRendererComponent(renderKey: FlowRendererKey | string): FlowRendererComponent {
    const comp = this.componentsMap.get(renderKey);
    if (!comp) {
      throw new Error(`Unknown render key ${renderKey}`);
    }
    return comp;
  }

  tryToGetRendererComponent(
    renderKey: FlowRendererKey | string
  ): FlowRendererComponent | undefined {
    return this.componentsMap.get(renderKey);
  }

  /**
   * 注册画布层
   */
  registerLayers(...layerRegistries: LayerRegistry[]): void {
    layerRegistries.forEach((layer) => this.pipeline.registerLayer(layer));
  }

  /**
   * 根据配置注册画布
   * @param layerRegistry
   * @param options
   */
  registerLayer<P extends Layer = Layer>(
    layerRegistry: LayerRegistry<Layer>,
    options?: P['options']
  ): void {
    this.pipeline.registerLayer(layerRegistry, options);
  }
}
