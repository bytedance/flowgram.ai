/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { customAlphabet } from 'nanoid';
import { inject, injectable, optional, postConstruct } from 'inversify';
import { Emitter, type IPoint } from '@flowgram.ai/utils';
import { NodeEngineContext } from '@flowgram.ai/form-core';
import {
  AddNodeData,
  FlowDocument,
  FlowNodeBaseType,
  FlowNodeTransformData,
} from '@flowgram.ai/document';
import {
  injectPlaygroundContext,
  PlaygroundConfigEntity,
  PlaygroundContext,
  PositionData,
  TransformData,
} from '@flowgram.ai/core';

import { WorkflowLinesManager } from './workflow-lines-manager';
import {
  WorkflowDocumentOptions,
  WorkflowDocumentOptionsDefault,
} from './workflow-document-option';
import { getFlowNodeFormData } from './utils/flow-node-form-data';
import { buildGroupJSON, delay, fitView, getAntiOverlapPosition } from './utils';
import {
  type WorkflowContentChangeEvent,
  WorkflowContentChangeType,
  WorkflowEdgeJSON,
  type WorkflowJSON,
  type WorkflowNodeJSON,
  type WorkflowNodeMeta,
  type WorkflowNodeRegistry,
  WorkflowSubCanvas,
} from './typings';
import { WorkflowSelectService } from './service/workflow-select-service';
import { FREE_LAYOUT_KEY, type FreeLayout } from './layout';
import { WorkflowNodeLinesData, WorkflowNodePortsData } from './entity-datas';
import {
  WorkflowLineEntity,
  WorkflowLinePortInfo,
  WorkflowNodeEntity,
  WorkflowPortEntity,
} from './entities';

const nanoid = customAlphabet('1234567890', 5);

export const WorkflowDocumentProvider = Symbol('WorkflowDocumentProvider');
export type WorkflowDocumentProvider = () => WorkflowDocument;

@injectable()
export class WorkflowDocument extends FlowDocument {
  private _onContentChangeEmitter = new Emitter<WorkflowContentChangeEvent>();

  protected readonly onLoadedEmitter = new Emitter<void>();

  readonly onContentChange = this._onContentChangeEmitter.event;

  private _onReloadEmitter = new Emitter<WorkflowDocument>();

  readonly onReload = this._onReloadEmitter.event;

  /**
   * 数据加载完成
   */
  readonly onLoaded = this.onLoadedEmitter.event;

  protected _loading = false;

  @inject(WorkflowLinesManager) linesManager: WorkflowLinesManager;

  @inject(PlaygroundConfigEntity) playgroundConfig: PlaygroundConfigEntity;

  @injectPlaygroundContext() playgroundContext: PlaygroundContext;

  @inject(WorkflowDocumentOptions)
  options: WorkflowDocumentOptions = {};

  @inject(NodeEngineContext) @optional() nodeEngineContext: NodeEngineContext;

  @inject(WorkflowSelectService) selectServices: WorkflowSelectService;

  get loading(): boolean {
    return this._loading;
  }

  /**
   * use `ctx.tools.fitView()` instead
   * @deprecated
   * @param easing
   */
  async fitView(easing?: boolean): Promise<void> {
    return fitView(this, this.playgroundConfig, easing).then(() => {
      this.linesManager.forceUpdate();
    });
  }

  @postConstruct()
  init(): void {
    super.init();
    this.currentLayoutKey = this.options.defaultLayout || FREE_LAYOUT_KEY;
    this.linesManager.init(this);
    this.playgroundConfig.getCursors = () => this.options.cursors;
    this.linesManager.onAvailableLinesChange((e) => this.fireContentChange(e));
    this.playgroundConfig.onReadonlyOrDisabledChange(({ readonly }) => {
      if (this.nodeEngineContext) {
        this.nodeEngineContext.readonly = readonly;
      }
    });
  }

  async load(): Promise<void> {
    if (this.disposed) return;
    this._loading = true;
    await super.load();
    this._loading = false;
    this.onLoadedEmitter.fire();
  }

  /**
   * @deprecated use `ctx.operation.fromJSON` instead
   */
  async reload(json: WorkflowJSON, delayTime = 0): Promise<void> {
    if (this.disposed) return;
    this._loading = true;
    this.clear();
    this.fromJSON(json);
    // loading添加delay，避免reload时触发fireContentChange的副作用
    await delay(delayTime);
    this._loading = false;
    this._onReloadEmitter.fire(this);
  }

  /**
   * 从数据加载
   * @param json
   */
  fromJSON(json: Partial<WorkflowJSON>, fireRender = true): void {
    if (this.disposed) return;
    const workflowJSON: WorkflowJSON = {
      nodes: json.nodes ?? [],
      edges: json.edges ?? [],
    };
    // 触发画布更新
    this.entityManager.changeEntityLocked = true;

    // 逐层渲染
    this.batchAddFromJSON(workflowJSON);

    this.entityManager.changeEntityLocked = false;
    this.transformer.loading = false;
    // 批量触发画布更新
    if (fireRender) {
      this.fireRender();
      // Ports may not have their final DOM measurements during the initial
      // render. Re-render lines on the next frame after layout has settled.
      window.requestAnimationFrame(() => {
        if (!this.disposed) {
          this.linesManager.forceUpdate();
        }
      });
    }
  }

  /**
   * 清空画布
   */
  clear(): void {
    this.getAllNodes().map((node) => node.dispose()); // 清空节点
    this.linesManager.getAllLines().map((line) => line.dispose()); // 清空线条
    this.getAllPorts().map((port) => port.dispose()); // 清空端口
    this.selectServices.clear(); // 清空选择
  }

  /**
   * 创建流程节点
   * @param json
   */
  createWorkflowNode(
    json: WorkflowNodeJSON,
    /** @deprecated */
    isClone: boolean = false,
    parentID?: string
  ): WorkflowNodeEntity {
    return this._createWorkflowNode(json, { parentID });
  }

  /**
   * 创建流程节点
   * @param json
   */
  private _createWorkflowNode(
    json: WorkflowNodeJSON,
    options?: {
      parentID?: string;
      onNodeCreated?: (node: WorkflowNodeEntity) => void;
      onEdgeCreated?: (edge: WorkflowLineEntity) => void;
    }
  ): WorkflowNodeEntity {
    const { parentID, onNodeCreated, onEdgeCreated } = options ?? {};
    // 是否是一个已经存在的节点
    const existedNode = this.getNode(json.id);
    const isExistedNode = existedNode && existedNode.flowNodeType === json.type;
    const parent = this.getNode(parentID ?? this.root.id) ?? this.root;
    const node = this.addNode(
      {
        ...json,
        parent,
      },
      undefined,
      true
    ) as WorkflowNodeEntity;

    const registry = node.getNodeRegistry() as WorkflowNodeRegistry;
    const { formMeta } = registry;
    const meta = node.getNodeMeta<WorkflowNodeMeta>();
    const formData = getFlowNodeFormData(node);

    const transform = node.getData<FlowNodeTransformData>(FlowNodeTransformData)!;
    const freeLayout = this.layout as FreeLayout;
    if (!isExistedNode) {
      transform.onDataChange(() => {
        // TODO 这个有点难以理解，其实是为了同步size 数据
        freeLayout.syncTransform(node);
      });
    }
    let { position } = meta;
    if (!position) {
      // 获取默认的位置
      position = this.getNodeDefaultPosition(json.type);
    }

    // 更新节点位置信息
    node.getData(TransformData)!.update({
      position,
    });

    // 初始化表单数据
    if (formMeta && formData) {
      if (!formData.formModel.initialized) {
        // 如果表单数据在前置步骤（fromJSON）内已定义，则跳过表单初始化逻辑
        formData.createForm(formMeta, json.data);

        formData.onDataChange(() => {
          this.fireContentChange({
            type: WorkflowContentChangeType.NODE_DATA_CHANGE,
            toJSON: () => formData.toJSON(),
            entity: node,
          });
        });
      } else {
        formData.updateFormValues(json.data);
      }
    }
    // 位置变更
    const positionData = node.getData<PositionData>(PositionData)!;
    if (!isExistedNode) {
      positionData.onDataChange(() => {
        this.fireContentChange({
          type: WorkflowContentChangeType.MOVE_NODE,
          toJSON: () => positionData.toJSON(),
          entity: node,
        });
      });
    }

    const subCanvas = this.getNodeSubCanvas(node);

    if (!isExistedNode && !subCanvas?.isCanvas) {
      this.fireContentChange({
        type: WorkflowContentChangeType.ADD_NODE,
        entity: node,
        toJSON: () => this.toNodeJSON(node),
      });
      node.onDispose(() => {
        if (!node.parent || node.parent.flowNodeType === FlowNodeBaseType.ROOT) {
          return;
        }
        const parentTransform = node.parent.getData(FlowNodeTransformData);
        parentTransform.fireChange();
      });
      let lastDeleteNodeData: WorkflowNodeJSON | undefined;
      node.preDispose.onDispose(() => {
        lastDeleteNodeData = this.toNodeJSON(node);
      });
      node.onDispose(() => {
        this.fireContentChange({
          type: WorkflowContentChangeType.DELETE_NODE,
          entity: node,
          toJSON: () => lastDeleteNodeData,
        });
      });
    }

    // 若存在子节点，则创建子节点
    if (json.blocks) {
      this.batchAddFromJSON(
        { nodes: json.blocks, edges: json.edges ?? [] },
        {
          parent: node,
          onNodeCreated,
          onEdgeCreated,
        }
      );
    }
    // 子画布联动
    if (subCanvas) {
      const canvasTransform = subCanvas.canvasNode.getData<TransformData>(TransformData);
      canvasTransform.update({
        position: subCanvas.parentNode.getNodeMeta()?.canvasPosition,
      });
      if (!isExistedNode) {
        subCanvas.parentNode.onDispose(() => {
          subCanvas.canvasNode.dispose();
        });
        subCanvas.canvasNode.onDispose(() => {
          subCanvas.parentNode.dispose();
        });
      }
    }
    if (!isExistedNode) {
      this.onNodeCreateEmitter.fire({
        node,
        data: json,
        json,
      });
    } else {
      this.onNodeUpdateEmitter.fire({
        node,
        data: json,
        json,
      });
    }

    return node;
  }

  /**
   * 添加节点，如果节点已经存在则不会重复创建
   * @param data
   * @param addedNodes
   */
  addNode(
    data: AddNodeData,
    addedNodes?: WorkflowNodeEntity[],
    ignoreCreateAndUpdateEvent?: boolean
  ): WorkflowNodeEntity {
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
      node = this.entityManager.createEntity<WorkflowNodeEntity>(WorkflowNodeEntity, {
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
      node.ports = node.getData(WorkflowNodePortsData);
      node.lines = node.getData(WorkflowNodeLinesData);
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
    addedNodes?.push(node);
    // 自定义创建逻辑
    if (register.onCreate) {
      const extendNodes = register.onCreate(node, data);
      if (extendNodes && addedNodes) {
        addedNodes.push(...extendNodes);
      }
    }

    if (!ignoreCreateAndUpdateEvent) {
      if (isNew) {
        this.onNodeCreateEmitter.fire({
          node,
          data,
          json: data,
        });
      } else {
        this.onNodeUpdateEmitter.fire({ node, data, json: data });
      }
    }

    return node;
  }

  get layout(): FreeLayout {
    const layout = this.layouts.find((layout) => layout.name == this.currentLayoutKey);
    if (!layout) {
      throw new Error(`Unknown flow layout: ${this.currentLayoutKey}`);
    }
    return layout as FreeLayout;
  }

  /**
   * 获取默认的 x y 坐标, 默认为当前画布可视区域中心
   * @param type
   * @protected
   */
  getNodeDefaultPosition(type: string | number): IPoint {
    const { size } = this.getNodeRegistry(type).meta || {};
    // 当前可视区域的中心位置
    let position = this.playgroundConfig.getViewport(true).center;
    if (size) {
      position = {
        x: position.x,
        y: position.y - size.height / 2,
      };
    }
    // 去掉叠加的
    return getAntiOverlapPosition(this, position);
  }

  /**
   * 通过类型创建节点, 如果没有提供position 则直接放在画布中间
   * @param type
   */
  createWorkflowNodeByType(
    type: string | number,
    position?: IPoint,
    json: Partial<WorkflowNodeJSON> = {},
    parentID?: string
  ): WorkflowNodeEntity {
    let id: string = json.id as string;
    if (id === undefined) {
      // 保证 id 不要重复
      do {
        id = `1${nanoid()}`;
      } while (this.entityManager.getEntityById(id));
    } else {
      if (this.entityManager.getEntityById(id)) {
        throw new Error(`[WorkflowDocument.createWorkflowNodeByType] Node Id "${id}" duplicated.`);
      }
    }
    return this._createWorkflowNode(
      {
        ...json,
        id,
        type,
        meta: { position, ...json?.meta }, // TODO title 和 meta 要从注册数据去拿
        data: json?.data,
        blocks: json?.blocks,
        edges: json?.edges,
      },
      { parentID }
    );
  }

  getAllNodes(): WorkflowNodeEntity[] {
    return this.entityManager
      .getEntities<WorkflowNodeEntity>(WorkflowNodeEntity)
      .filter((n) => n.id !== FlowNodeBaseType.ROOT);
  }

  getAllEdges(): WorkflowLineEntity[] {
    return this.entityManager.getEntities<WorkflowLineEntity>(WorkflowLineEntity);
  }

  getAllPorts(): WorkflowPortEntity[] {
    return this.entityManager
      .getEntities<WorkflowPortEntity>(WorkflowPortEntity)
      .filter((p) => p.node.id !== FlowNodeBaseType.ROOT);
  }

  /**
   * 获取画布中的非游离节点
   * 1. 开始节点
   * 2. 从开始节点出发能走到的节点
   * 3. 结束节点
   * 4. 默认所有子画布内节点为游离节点
   */
  getAssociatedNodes(): WorkflowNodeEntity[] {
    const allNode = this.getAllNodes();

    const allLines = this.linesManager
      .getAllLines()
      .filter((line) => line.from && line.to)
      .map((line) => ({
        from: line.from!.id,
        to: line.to!.id,
      }));

    const startNodeId = allNode.find((node) => node.isStart)?.id;
    const endNodeId = allNode.find((node) => node.isNodeEnd)?.id;

    // 子画布内节点无需开始/结束
    const nodeInContainer = allNode
      .filter((node) => node.parent?.getNodeMeta<WorkflowNodeMeta>().isContainer)
      .map((node) => node.id);

    const associatedCache = new Set(nodeInContainer);
    if (endNodeId) {
      associatedCache.add(endNodeId);
    }
    const bfs = (nodeId: string) => {
      if (associatedCache.has(nodeId)) {
        return;
      }
      associatedCache.add(nodeId);
      const nextNodes = allLines.reduce((ids, { from, to }) => {
        if (from === nodeId && !associatedCache.has(to)) {
          ids.push(to);
        }
        return ids;
      }, [] as string[]);

      nextNodes.forEach(bfs);
    };

    if (startNodeId) {
      bfs(startNodeId);
    }

    const associatedNodes = allNode.filter((node) => associatedCache.has(node.id));

    return associatedNodes;
  }

  /**
   * 触发渲染
   */
  fireRender() {
    this.entityManager.fireEntityChanged(WorkflowNodeEntity.type);
    this.entityManager.fireEntityChanged(WorkflowLineEntity.type);
    this.entityManager.fireEntityChanged(WorkflowPortEntity.type);
  }

  fireContentChange(event: WorkflowContentChangeEvent): void {
    if (this._loading || this.disposed || this.entityManager.changeEntityLocked) {
      return;
    }
    this._onContentChangeEmitter.fire(event);
  }

  toNodeJSON(node: WorkflowNodeEntity): WorkflowNodeJSON {
    // 如果是子画布，返回其父节点的JSON
    const subCanvas = this.getNodeSubCanvas(node);
    if (subCanvas?.isCanvas === true) {
      return this.toNodeJSON(subCanvas.parentNode);
    }

    const json = this.toNodeJSONFromOptions(node);
    const children = this.getNodeChildren(node);

    // 计算子节点 JSON
    const blocks = children.map((child) => this.toNodeJSON(child));

    // 计算子线条 JSON
    const linesMap = new Map<string, WorkflowEdgeJSON>();
    children.forEach((child) => {
      const childLinesData = child.getData<WorkflowNodeLinesData>(WorkflowNodeLinesData);
      [...childLinesData.inputLines, ...childLinesData.outputLines]
        .filter(Boolean)
        .forEach((line) => {
          const lineJSON = this.toLineJSON(line);
          if (!lineJSON || linesMap.has(line.id)) {
            return;
          }
          linesMap.set(line.id, lineJSON);
        });
    });
    const edges = Array.from(linesMap.values()); // 使用 Map 防止线条重复

    // 拼接 JSON
    if (blocks.length > 0) json.blocks = blocks;
    if (edges.length > 0) json.edges = edges;

    return json;
  }

  /**
   * 节点转换为JSON， 没有format的过程
   * @param node
   * @returns
   */
  private toNodeJSONFromOptions(node: WorkflowNodeEntity): WorkflowNodeJSON {
    if (this.options.toNodeJSON) {
      return this.options.toNodeJSON(node) as WorkflowNodeJSON;
    }
    return WorkflowDocumentOptionsDefault.toNodeJSON!(node) as WorkflowNodeJSON;
  }

  copyNode(
    node: WorkflowNodeEntity,
    newNodeId?: string | undefined,
    format?: (json: WorkflowNodeJSON) => WorkflowNodeJSON,
    position?: IPoint
  ): WorkflowNodeEntity {
    let json = this.toNodeJSON(node);
    if (format) {
      json = format(json);
    }
    position = position || {
      x: json.meta!.position!.x + 30,
      y: json.meta!.position!.y + 30,
    };
    return this._createWorkflowNode(
      {
        id: newNodeId || `1${nanoid()}`,
        type: node.flowNodeType,
        meta: {
          ...json.meta,
          position,
        },
        data: json.data,
        blocks: json.blocks,
        edges: json.edges,
      },
      {
        parentID: node.parent?.id,
      }
    );
  }

  copyNodeFromJSON(
    flowNodeType: string,
    nodeJSON: WorkflowNodeJSON,
    newNodeId?: string | undefined,
    position?: IPoint,
    parentID?: string
  ): WorkflowNodeEntity {
    position = position || {
      x: nodeJSON.meta!.position!.x + 30,
      y: nodeJSON.meta!.position!.y + 30,
    };
    return this._createWorkflowNode(
      {
        id: newNodeId || `1${nanoid()}`,
        type: flowNodeType,
        meta: {
          ...nodeJSON.meta,
          position,
        },
        data: nodeJSON.data,
        blocks: nodeJSON.blocks,
        edges: nodeJSON.edges,
      },
      {
        parentID,
      }
    );
  }

  canRemove(node: WorkflowNodeEntity, silent?: boolean): boolean {
    const meta = node.getNodeMeta<WorkflowNodeMeta>();
    if (meta.deleteDisable) {
      return false;
    }
    if (this.options.canDeleteNode && !this.options.canDeleteNode(node, silent)) {
      return false;
    }
    return true;
  }

  /**
   * 判断端口是否为错误态
   */
  isErrorPort(port: WorkflowPortEntity, defaultValue = false) {
    if (typeof this.options.isErrorPort === 'function') {
      return this.options.isErrorPort(port);
    }

    return defaultValue;
  }

  /**
   * 导出数据
   */
  toJSON(): WorkflowJSON {
    if (this.disposed) {
      throw new Error(
        'The WorkflowDocument has been disposed and it is no longer possible to call toJSON.'
      );
    }
    const rootJSON = this.toNodeJSON(this.root);
    const json = {
      nodes: rootJSON.blocks ?? [],
      edges: rootJSON.edges ?? [],
    };
    return json;
  }

  dispose() {
    super.dispose();
    this._onReloadEmitter.dispose();
  }

  /**
   * 批量添加节点
   * @deprecated use 'batchAddFromJSON' instead
   * @param json
   * @param options
   */
  public renderJSON(
    json: WorkflowJSON,
    options?: {
      parent?: WorkflowNodeEntity;
      /** @deprecated useless api */
      isClone?: boolean;
    }
  ): {
    nodes: WorkflowNodeEntity[];
    edges: WorkflowLineEntity[];
  } {
    return this.batchAddFromJSON(json, options);
  }

  /**
   * 批量添加节点
   */
  public batchAddFromJSON(
    json: WorkflowJSON,
    options?: {
      parent?: WorkflowNodeEntity;
      onNodeCreated?: (node: WorkflowNodeEntity) => void;
      onEdgeCreated?: (edge: WorkflowLineEntity) => void;
    }
  ): {
    nodes: WorkflowNodeEntity[];
    edges: WorkflowLineEntity[];
  } {
    const { parent = this.root, onNodeCreated, onEdgeCreated } = options ?? {};
    // 创建节点
    const parentID = this.getNodeSubCanvas(parent)?.canvasNode.id ?? parent.id;
    const processedJSON = buildGroupJSON(json);
    const nodes = processedJSON.nodes.map((nodeJSON: WorkflowNodeJSON) =>
      this._createWorkflowNode(nodeJSON, {
        parentID,
        onNodeCreated,
        onEdgeCreated,
      })
    );
    // 创建线条
    const edges = processedJSON.edges
      .map((edge) => this.createWorkflowLine(edge, parentID))
      .filter(Boolean) as WorkflowLineEntity[];
    // 触发回调
    nodes.forEach((node) => options?.onNodeCreated?.(node));
    edges.forEach((edge) => options?.onEdgeCreated?.(edge));
    return { nodes, edges };
  }

  private getNodeSubCanvas(node: WorkflowNodeEntity): WorkflowSubCanvas | undefined {
    if (!node) return;
    const nodeMeta = node.getNodeMeta<WorkflowNodeMeta>();
    const subCanvas = nodeMeta.subCanvas?.(node);
    return subCanvas;
  }

  private getNodeChildren(node: WorkflowNodeEntity): WorkflowNodeEntity[] {
    if (!node || node.flowNodeType === FlowNodeBaseType.GROUP) return [];
    const subCanvas = this.getNodeSubCanvas(node);
    // get real children
    const realChildren = subCanvas ? subCanvas.canvasNode.blocks : node.blocks;
    // filter sub canvas node
    const childrenWithoutSubCanvas = realChildren
      .filter((child) => {
        const childMeta = child.getNodeMeta<WorkflowNodeMeta>();
        return !childMeta.subCanvas?.(node)?.isCanvas;
      })
      .filter(Boolean);
    // flat group nodes
    const children = childrenWithoutSubCanvas
      .map((child) => {
        if (child.flowNodeType === FlowNodeBaseType.GROUP) {
          return [child, ...child.blocks];
        }
        return child;
      })
      .flat();
    return children;
  }

  private toLineJSON(line: WorkflowLineEntity): WorkflowEdgeJSON | undefined {
    const lineJSON = line.toJSON();
    if (
      !line.from ||
      !line.info.from ||
      !line.fromPort ||
      !line.to ||
      !line.info.to ||
      !line.toPort
    ) {
      return;
    }
    // 父子节点之间连线，需替换子画布为父节点
    const fromSubCanvas = this.getNodeSubCanvas(line.from);
    const toSubCanvas = this.getNodeSubCanvas(line.to);
    if (fromSubCanvas && !fromSubCanvas.isCanvas && toSubCanvas && toSubCanvas.isCanvas) {
      // 忽略子画布与父节点的连线
      return;
    }
    if (line.from === line.to.parent && fromSubCanvas) {
      return {
        ...lineJSON,
        sourceNodeID: fromSubCanvas.parentNode.id,
      };
    }
    if (line.to === line.from.parent && toSubCanvas) {
      return {
        ...lineJSON,
        targetNodeID: toSubCanvas.parentNode.id,
      };
    }
    return lineJSON;
  }

  private createWorkflowLine(
    json: WorkflowEdgeJSON,
    parentID?: string
  ): WorkflowLineEntity | undefined {
    const fromNode = this.getNode(json.sourceNodeID);
    const toNode = this.getNode(json.targetNodeID);
    // 脏数据清除
    if (!fromNode || !toNode) {
      return;
    }
    const lineInfo: WorkflowLinePortInfo = {
      from: json.sourceNodeID,
      fromPort: json.sourcePortID,
      to: json.targetNodeID,
      toPort: json.targetPortID,
      data: json.data,
    };
    if (!parentID) {
      return this.linesManager.createLine(lineInfo);
    }
    // 父子节点之间连线，需替换父节点为子画布
    const canvasNode = this.getNode(parentID);
    if (!canvasNode) {
      return this.linesManager.createLine(lineInfo);
    }
    const parentSubCanvas = this.getNodeSubCanvas(canvasNode);
    if (!parentSubCanvas) {
      return this.linesManager.createLine(lineInfo);
    }
    if (lineInfo.from === parentSubCanvas.parentNode.id) {
      return this.linesManager.createLine({
        ...lineInfo,
        from: parentSubCanvas.canvasNode.id,
      });
    }
    if (lineInfo.to === parentSubCanvas.parentNode.id) {
      return this.linesManager.createLine({
        ...lineInfo,
        to: parentSubCanvas.canvasNode.id,
      });
    }
    return this.linesManager.createLine(lineInfo);
  }
}
