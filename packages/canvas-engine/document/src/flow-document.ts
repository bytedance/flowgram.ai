/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { omit } from 'lodash-es';
import { inject, injectable, multiInject, optional, postConstruct } from 'inversify';
import { type Disposable, type Event, Emitter } from '@flowgram.ai/utils';
import { type EntityData, type EntityDataRegistry, EntityManager } from '@flowgram.ai/core';

import {
  AddNodeData,
  DEFAULT_FLOW_NODE_META,
  type FlowDocumentJSON,
  FlowLayout,
  FlowLayoutDefault,
  FlowNodeBaseType,
  type FlowNodeJSON,
  FlowNodeRegistry,
  FlowNodeType,
} from './typings';
import { FlowVirtualTree } from './flow-virtual-tree';
import { FlowRenderTree } from './flow-render-tree';
import {
  ConstantKeys,
  FlowDocumentOptions,
  FlowDocumentOptionsDefault,
} from './flow-document-options';
import { FlowDocumentContribution } from './flow-document-contribution';
import { FlowDocumentConfig } from './flow-document-config';
import { FlowDocumentTransformerEntity, FlowNodeEntity, FlowRendererStateEntity } from './entities';

export type FlowDocumentProvider = () => FlowDocument;
export const FlowDocumentProvider = Symbol('FlowDocumentProvider');
/**
 * 流程整个文档数据
 */
@injectable()
export class FlowDocument<T = FlowDocumentJSON> implements Disposable {
  @inject(EntityManager) protected entityManager: EntityManager;

  @inject(FlowDocumentConfig) readonly config: FlowDocumentConfig;

  /**
   * 流程画布配置项
   */
  @inject(FlowDocumentOptions) @optional() public options: FlowDocumentOptions;

  @multiInject(FlowDocumentContribution)
  @optional()
  protected contributions: FlowDocumentContribution[] = [];

  protected registers = new Map<FlowNodeType, FlowNodeRegistry>();

  private nodeRegistryCache = new Map<string, any>();

  protected nodeDataRegistries: EntityDataRegistry[] = [];

  protected layouts: FlowLayout[] = [];

  protected currentLayoutKey: string = '';

  protected onNodeUpdateEmitter = new Emitter<{
    node: FlowNodeEntity;
    /**
     * use 'json' instead
     * @deprecated
     */
    data: FlowNodeJSON;
    json: FlowNodeJSON;
  }>();

  protected onNodeCreateEmitter = new Emitter<{
    node: FlowNodeEntity;
    /**
     * use 'json' instead
     * @deprecated
     */
    data: FlowNodeJSON;
    json: FlowNodeJSON;
  }>();

  protected onNodeDisposeEmitter = new Emitter<{
    node: FlowNodeEntity;
  }>();

  protected onLayoutChangeEmitter = new Emitter<FlowLayout>();

  readonly onNodeUpdate = this.onNodeUpdateEmitter.event;

  readonly onNodeCreate = this.onNodeCreateEmitter.event;

  readonly onNodeDispose = this.onNodeDisposeEmitter.event;

  readonly onLayoutChange = this.onLayoutChangeEmitter.event;

  /**
   * Fires after the render tree and layout reflect the latest origin-tree changes.
   * Read render-tree-backed node getters or serialize the document in this callback
   * when an operation has queued a refresh.
   */
  get onRefresh(): Event<void> {
    return this.transformer.onRefresh;
  }

  private _disposed = false;

  root: FlowNodeEntity;

  /**
   * 原始的 tree 结构
   */
  originTree: FlowVirtualTree<FlowNodeEntity>;

  transformer: FlowDocumentTransformerEntity;

  /**
   * 渲染相关的全局轧辊台
   */
  renderState: FlowRendererStateEntity;

  /**
   * 渲染后的 tree 结构
   */
  renderTree: FlowRenderTree<FlowNodeEntity>;

  /**
   *
   */
  get disposed(): boolean {
    return this._disposed;
  }

  @postConstruct()
  init(): void {
    if (!this.options) this.options = FlowDocumentOptionsDefault;
    this.currentLayoutKey = this.options.defaultLayout || FlowLayoutDefault.VERTICAL_FIXED_LAYOUT;
    this.contributions.forEach((contrib) => contrib.registerDocument?.(this));
    this.root = this.addNode({ id: 'root', type: FlowNodeBaseType.ROOT });
    this.originTree = new FlowVirtualTree<FlowNodeEntity>(this.root);
    this.transformer = this.entityManager.createEntity<FlowDocumentTransformerEntity>(
      FlowDocumentTransformerEntity,
      { document: this }
    );
    this.renderState =
      this.entityManager.createEntity<FlowRendererStateEntity>(FlowRendererStateEntity);
    this.renderTree = new FlowRenderTree<FlowNodeEntity>(this.root, this.originTree, this);
    // 布局第一次加载时候触发一次
    this.layout.reload?.();
  }

  /**
   * 从数据初始化 O(n)
   * @param json
   */
  /**
   * 加载数据，可以被重载
   * @param json 文档数据更新
   * @param fireRender 是否要触发渲染，默认 true
   */
  fromJSON(json: FlowDocumentJSON | any, fireRender = true): void {
    if (this._disposed) return;
    // 清空 tree 数据 重新计算
    this.originTree.clear();
    this.renderTree.clear();
    // 暂停触发画布更新
    this.entityManager.changeEntityLocked = true;
    // 添加前的节点
    const oldNodes = this.entityManager.getEntities<FlowNodeEntity>(FlowNodeEntity);
    // 添加后的节点
    const newNodes: FlowNodeEntity[] = [this.root];
    this.addBlocksAsChildren(this.root, json.nodes || [], newNodes);
    // 删除无效的节点
    oldNodes.forEach((node) => {
      if (!newNodes.includes(node)) {
        node.dispose();
      }
    });
    this.entityManager.changeEntityLocked = false;
    this.transformer.loading = false;
    if (fireRender) this.fireRender();
  }

  get layout(): FlowLayout {
    const layout = this.layouts.find((layout) => layout.name == this.currentLayoutKey);
    if (!layout) {
      throw new Error(`Unknown flow layout: ${this.currentLayoutKey}`);
    }
    return layout;
  }

  async load(): Promise<void> {
    await Promise.all(this.contributions.map((c) => c.loadDocument?.(this)));
  }

  get loading(): boolean {
    return this.transformer.loading;
  }

  /**
   * 触发 render
   */
  fireRender(): void {
    if (this.transformer.isTreeDirty()) {
      this.entityManager.fireEntityChanged(FlowNodeEntity.type);
      this.entityManager.fireEntityChanged(FlowDocumentTransformerEntity.type);
    }
  }

  /**
   * 从指定节点的下一个节点新增
   * @param fromNode
   * @param json
   */
  addFromNode(fromNode: FlowNodeEntity | string, json: FlowNodeJSON): FlowNodeEntity {
    const node = typeof fromNode === 'string' ? this.getNode(fromNode)! : fromNode;
    this.entityManager.changeEntityLocked = true;
    const { parent } = node;
    const result = this.addNode({
      ...json,
      parent,
      // originParent,
    });
    this.originTree.insertAfter(node, result);
    this.entityManager.changeEntityLocked = false;
    this.entityManager.fireEntityChanged(FlowNodeEntity.type);
    return result;
  }

  removeNode(node: FlowNodeEntity | string) {
    if (typeof node === 'string') {
      this.getNode(node)?.dispose();
    } else {
      node.dispose();
    }
  }

  /**
   * 添加节点，如果节点已经存在则不会重复创建
   * @param data
   * @param addedNodes
   */
  addNode(data: AddNodeData, addedNodes?: FlowNodeEntity[]): FlowNodeEntity {
    const { id, type = 'block', originParent, parent, meta, hidden, index } = data;
    let node = this.getNode(id);
    let isNew = false;
    const register = this.getNodeRegistry(type, data.originParent);
    // node 类型变化则全部删除重新来
    if (node && node.flowNodeType !== data.type) {
      node.dispose();
      node = undefined;
    }
    if (!node) {
      const { dataRegistries } = register;
      node = this.entityManager.createEntity<FlowNodeEntity>(FlowNodeEntity, {
        id,
        document: this,
        flowNodeType: type,
        originParent,
        meta,
      });
      this.options.preNodeCreate?.(node);
      const datas = dataRegistries
        ? this.nodeDataRegistries.concat(...dataRegistries)
        : this.nodeDataRegistries;
      node.addInitializeData(datas);
      node.onDispose(() => this.onNodeDisposeEmitter.fire({ node: node! }));
      this.options.fromNodeJSON?.(node, data, true);
      isNew = true;
    } else {
      this.options.fromNodeJSON?.(node, data, false);
    }
    // 初始化数据重制
    node.initData({
      originParent,
      parent,
      meta,
      hidden,
      index,
    });
    // 开始节点加到 root 里边
    if (node.isStart) {
      this.root.addChild(node);
    }
    addedNodes?.push(node);
    // 自定义创建逻辑
    if (register.onCreate) {
      const extendNodes = register.onCreate(node, data);
      if (extendNodes && addedNodes) {
        addedNodes.push(...extendNodes);
      }
    } else if (data.blocks && data.blocks.length > 0) {
      // 兼容老的写法
      if (!data.blocks[0].type) {
        this.addInlineBlocks(node, data.blocks, addedNodes);
      } else {
        this.addBlocksAsChildren(node, data.blocks as FlowNodeJSON[], addedNodes);
      }
    }

    if (isNew) {
      this.onNodeCreateEmitter.fire({
        node,
        data,
        json: data,
      });
    } else {
      this.onNodeUpdateEmitter.fire({ node, data, json: data });
    }

    return node;
  }

  addBlocksAsChildren(
    parent: FlowNodeEntity,
    blocks: FlowNodeJSON[],
    addedNodes?: FlowNodeEntity[]
  ): void {
    for (const block of blocks) {
      this.addNode(
        {
          ...block,
          parent,
        },
        addedNodes
      );
    }
  }

  /**
   * block 格式：
   * node:  (最原始的 id)
   *  blockIcon
   *  inlineBlocks
   *    block
   *      blockOrderIcon
   *    block
   *      blockOrderIcon
   * @param node
   * @param blocks
   * @param addedNodes
   */
  addInlineBlocks(
    node: FlowNodeEntity,
    blocks: FlowNodeJSON[],
    addedNodes: FlowNodeEntity[] = []
  ): FlowNodeEntity[] {
    // 块列表开始节点，用来展示块的按钮
    const blockIconNode = this.addNode({
      id: `$blockIcon$${node.id}`,
      type: FlowNodeBaseType.BLOCK_ICON,
      originParent: node,
      parent: node,
    });
    addedNodes.push(blockIconNode);
    // 水平布局
    const inlineBlocksNode = this.addNode({
      id: `$inlineBlocks$${node.id}`,
      type: FlowNodeBaseType.INLINE_BLOCKS,
      originParent: node,
      parent: node,
    });
    addedNodes.push(inlineBlocksNode);
    blocks.forEach((blockData) => {
      this.addBlock(node, blockData, addedNodes);
    });
    return addedNodes;
  }

  /**
   * 添加单个 block
   * @param target
   * @param blockData
   * @param addedNodes
   * @param parent 默认去找 $inlineBlocks$
   */
  addBlock(
    target: FlowNodeEntity | string,
    blockData: FlowNodeJSON,
    addedNodes?: FlowNodeEntity[],
    parent?: FlowNodeEntity,
    index?: number
  ): FlowNodeEntity {
    const node: FlowNodeEntity = typeof target === 'string' ? this.getNode(target)! : target;
    const { onBlockChildCreate } = node.getNodeRegistry();
    if (onBlockChildCreate) {
      return onBlockChildCreate(node, blockData, addedNodes);
    }
    parent = parent || this.getNode(`$inlineBlocks$${node.id}`);
    // 块节点会生成一个空的 Block 节点用来切割 Block
    const block = this.addNode({
      ...omit(blockData, 'blocks'),
      type: blockData.type || FlowNodeBaseType.BLOCK,
      originParent: node,
      parent,
      index,
    });

    if (blockData.meta?.defaultCollapsed) {
      block.collapsed = true;
    }

    // 块开始节点
    const blockOrderIcon = this.addNode({
      id: `$blockOrderIcon$${blockData.id}`,
      type: FlowNodeBaseType.BLOCK_ORDER_ICON,
      originParent: node,
      meta: blockData.meta,
      data: blockData.data,
      parent: block,
    });
    addedNodes?.push(block, blockOrderIcon);
    if (blockData.blocks) {
      this.addBlocksAsChildren(block, blockData.blocks as FlowNodeJSON[], addedNodes);
    }
    return block;
  }

  /**
   * 根据 id 获取节点
   * @param id
   */
  getNode(id: string): FlowNodeEntity | undefined {
    if (!id) return undefined;
    return this.entityManager.getEntityById<FlowNodeEntity>(id);
  }

  /**
   * 注册节点
   * @param registries
   */
  registerFlowNodes<T extends FlowNodeRegistry<any>>(...registries: T[]): void {
    registries.forEach((newRegistry) => {
      if (!newRegistry) {
        throw new Error('[FlowDocument] registerFlowNodes parameters get undefined registry.');
      }
      const preRegistry = this.registers.get(newRegistry.type);
      this.registers.set(newRegistry.type, {
        ...preRegistry,
        ...newRegistry,
        meta: {
          ...preRegistry?.meta,
          ...newRegistry?.meta,
        },
        extendChildRegistries: FlowNodeRegistry.mergeChildRegistries(
          preRegistry?.extendChildRegistries,
          newRegistry?.extendChildRegistries
        ),
      });
    });
  }

  /**
   * Check node extend
   * @param currentType
   * @param extendType
   */
  isExtend(currentType: FlowNodeType, extendType: FlowNodeType): boolean {
    return (this.getNodeRegistry(currentType).__extends__ || []).includes(extendType);
  }

  /**
   * Check node type
   * @param currentType
   * @param extendType
   */
  isTypeOrExtendType(currentType: FlowNodeType, extendType: FlowNodeType): boolean {
    return currentType === extendType || this.isExtend(currentType, extendType);
  }

  /**
   * 导出数据，可以重载
   */
  toJSON(): T | any {
    if (this.disposed) {
      throw new Error(
        'The FlowDocument has been disposed and it is no longer possible to call toJSON.'
      );
    }
    return {
      nodes: this.root.toJSON().blocks,
    };
  }

  /**
   * @deprecated
   * use `getNodeRegistry` instead
   */
  getNodeRegister<T extends FlowNodeRegistry = FlowNodeRegistry>(
    type: FlowNodeType,
    originParent?: FlowNodeEntity
  ): T {
    return this.getNodeRegistry<T>(type, originParent);
  }

  getNodeRegistry<T extends FlowNodeRegistry = FlowNodeRegistry>(
    type: FlowNodeType,
    originParent?: FlowNodeEntity
  ): T {
    const typeKey = `${type}_${originParent?.flowNodeType || ''}`;
    if (this.nodeRegistryCache.has(typeKey)) {
      return this.nodeRegistryCache.get(typeKey) as T;
    }
    const customDefaultRegistry = this.options.getNodeDefaultRegistry?.(type);
    let register = this.registers.get(type) || { type };
    const extendRegisters: FlowNodeRegistry[] = [];
    const extendKey = register.extend;
    // 继承重载
    if (register.extend && this.registers.has(register.extend)) {
      register = FlowNodeRegistry.merge(
        this.getNodeRegistry(register.extend),
        register,
        register.type
      );
    }
    // 父节点覆盖
    if (originParent) {
      const extendRegister = this.getNodeRegistry(
        originParent.flowNodeType
      ).extendChildRegistries?.find((r) => r.type === type);
      if (extendRegister) {
        if (extendRegister.extend && this.registers.has(extendRegister.extend)) {
          extendRegisters.push(this.registers.get(extendRegister.extend)!);
        }
        extendRegisters.push(extendRegister);
      }
    }
    register = FlowNodeRegistry.extend(register, extendRegisters);
    const defaultNodeMeta = DEFAULT_FLOW_NODE_META(type, this);
    defaultNodeMeta.spacing =
      this.options?.constants?.[ConstantKeys.NODE_SPACING] || defaultNodeMeta.spacing;

    const res = {
      ...customDefaultRegistry,
      ...register,
      meta: {
        ...defaultNodeMeta,
        ...customDefaultRegistry?.meta,
        ...register.meta,
      },
    } as T;
    // Save the "extend" attribute
    if (extendKey) {
      res.extend = extendKey;
    }
    this.nodeRegistryCache.set(typeKey, res);
    return res;
  }

  /**
   * 节点注入数据
   * @param nodeDatas
   */
  registerNodeDatas(...nodeDatas: EntityDataRegistry[]): void {
    this.nodeDataRegistries.push(...nodeDatas);
  }

  /**
   * traverse all nodes, O(n)
   *   R
   *   |
   *   +---1
   *   |   |
   *   |   +---1.1
   *   |   |
   *   |   +---1.2
   *   |   |
   *   |   +---1.3
   *   |   |    |
   *   |   |    +---1.3.1
   *   |   |    |
   *   |   |    +---1.3.2
   *   |   |
   *   |   +---1.4
   *   |
   *   +---2
   *       |
   *       +---2.1
   *
   *  sort: [1, 1.1, 1.2, 1.3, 1.3.1, 1.3.2, 1.4, 2, 2.1]
   * @param fn
   * @param node
   * @param depth
   * @return isBreak
   */
  traverse(
    fn: (node: FlowNodeEntity, depth: number, index: number) => boolean | void,
    node = this.root,
    depth = 0
  ): boolean | void {
    return this.originTree.traverse(fn, node, depth);
  }

  get size(): number {
    return this.getAllNodes().length;
  }

  hasNode(nodeId: string): boolean {
    return !!this.entityManager.getEntityById(nodeId);
  }

  getAllNodes(): FlowNodeEntity[] {
    return this.entityManager.getEntities(FlowNodeEntity);
  }

  toString(showType?: boolean): string {
    return this.originTree.toString(showType);
  }

  /**
   * 返回需要渲染的数据
   */
  getRenderDatas<T extends EntityData>(
    dataRegistry: EntityDataRegistry<T>,
    containHiddenNodes = true
  ): T[] {
    const result: T[] = [];
    this.renderTree.traverse((node) => {
      if (!containHiddenNodes && node.hidden) return;
      result.push(node.getData<T>(dataRegistry)!);
    });
    return result;
  }

  toNodeJSON(node: FlowNodeEntity): FlowNodeJSON {
    if (this.options.toNodeJSON) {
      return this.options.toNodeJSON(node);
    }
    const nodesMap: Record<string, FlowNodeJSON> = {};
    let startNodeJSON: FlowNodeJSON;
    this.traverse((node) => {
      const isSystemNode = node.id.startsWith('$');
      if (isSystemNode) return;
      const nodeJSONData = node.getJSONData();
      const nodeJSON: FlowNodeJSON = {
        id: node.id,
        type: node.flowNodeType,
      };
      if (nodeJSONData !== undefined) {
        nodeJSON.data = nodeJSONData;
      }
      if (!startNodeJSON) startNodeJSON = nodeJSON;
      let parent = this.originTree.getParent(node);
      if (parent && parent.id.startsWith('$')) {
        parent = parent.originParent;
      }
      const parentJSON = parent ? nodesMap[parent.id] : undefined;
      if (parentJSON) {
        if (!parentJSON.blocks) {
          parentJSON.blocks = [];
        }
        parentJSON.blocks.push(nodeJSON);
      }
      nodesMap[node.id] = nodeJSON;
    }, node);
    return startNodeJSON!;
  }

  /**
   * 移动节点
   * @param param0
   * @returns
   */
  moveNodes({
    dropNodeId,
    sortNodeIds,
    inside = false,
  }: {
    dropNodeId: string;
    sortNodeIds: string[];
    inside?: boolean;
  }) {
    const dropEntity = this.getNode(dropNodeId);
    if (!dropEntity) {
      return;
    }

    const sortNodes = sortNodeIds.map((id) => this.getNode(id)!);

    // 按照顺序一个个移动到目标节点下
    this.entityManager.changeEntityLocked = true;
    for (const node of sortNodes.reverse()) {
      if (inside) {
        this.originTree.addChild(dropEntity, node, 0);
      } else {
        this.originTree.insertAfter(dropEntity, node);
      }
    }

    this.entityManager.changeEntityLocked = false;
    this.fireRender();
  }

  /**
   * 移动子节点
   * @param param0
   * @returns
   */
  moveChildNodes({
    toParentId,
    toIndex,
    nodeIds,
  }: {
    toParentId: string;
    nodeIds: string[];
    toIndex: number;
  }) {
    if (nodeIds.length === 0) {
      return;
    }

    const toParent = this.getNode(toParentId);
    if (!toParent) {
      return;
    }

    this.entityManager.changeEntityLocked = true;

    this.originTree.moveChilds(
      toParent,
      nodeIds.map((nodeId) => this.getNode(nodeId) as FlowNodeEntity),
      toIndex
    );

    this.entityManager.changeEntityLocked = false;
    this.fireRender();
  }

  /**
   * 注册布局
   * @param layout
   */
  registerLayout(layout: FlowLayout) {
    this.layouts.push(layout);
  }

  /**
   * 更新布局
   * @param layoutKey
   */
  setLayout(layoutKey: string) {
    if (this.currentLayoutKey === layoutKey) return;
    const layout = this.layouts.find((layout) => layout.name === layoutKey);
    if (!layout) return;
    this.currentLayoutKey = layoutKey;
    this.transformer.clear();
    layout.reload?.();
    this.fireRender();
    this.onLayoutChangeEmitter.fire(this.layout);
  }

  /**
   * 切换垂直或水平布局
   */
  toggleFixedLayout() {
    this.setLayout(
      this.layout.name === FlowLayoutDefault.HORIZONTAL_FIXED_LAYOUT
        ? FlowLayoutDefault.VERTICAL_FIXED_LAYOUT
        : FlowLayoutDefault.HORIZONTAL_FIXED_LAYOUT
    );
  }

  dispose() {
    if (this._disposed) return;
    this.registers.clear();
    this.nodeRegistryCache.clear();
    this.originTree.dispose();
    this.renderTree.dispose();
    this.onNodeUpdateEmitter.dispose();
    this.onNodeCreateEmitter.dispose();
    this.onNodeDisposeEmitter.dispose();
    this.onLayoutChangeEmitter.dispose();
    this._disposed = true;
  }
}
