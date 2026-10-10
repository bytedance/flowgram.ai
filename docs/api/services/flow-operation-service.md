# FlowOperationService

节点操作服务, 目前用于固定布局，自由布局现阶段可通过 WorkflowDocument 直接操作, 后续也会抽象出 operation

[> API Detail](https://flowgram.ai/auto-docs/fixed-layout-editor/interfaces/FlowOperationService.html)

```typescript pure
const operationService = useService<FlowOperationService>(FlowOperationService)
operationService.addNode({ id: 'xxx', type: 'custom', data: {} })

// or
const ctx = useClientContext();
ctx.operation.addNode({ id: 'xxx', type: 'custom', data: {} })


```

## Interface

```typescript pure

export interface FlowOperationBaseService extends Disposable {
  /**
   * 执行操作
   * @param operation 可序列化的操作
   * @returns 操作返回
   */
  apply(operation: FlowOperation): any;

  /**
   * 添加节点，如果节点已经存在则不会重复创建
   * @param nodeJSON 节点数据
   * @param config 配置
   * @returns 成功添加的节点
   */
  addNode(nodeJSON: FlowNodeJSON, config?: AddNodeConfig): FlowNodeEntity;

  /**
   * 基于某一个起始节点往后面添加
   * @param fromNode 起始节点
   * @param nodeJSON 添加的节点JSON
   */
  addFromNode(fromNode: FlowNodeEntityOrId, nodeJSON: FlowNodeJSON): FlowNodeEntity;

  /**
   * 删除节点
   * @param node 节点
   * @returns
   */
  deleteNode(node: FlowNodeEntityOrId): void;

  /**
   * 批量删除节点
   * @param nodes
   */
  deleteNodes(nodes: FlowNodeEntityOrId[]): void;

  /**
   * 添加块（分支）
   * @param target 目标
   * @param blockJSON 块数据
   * @param config 配置
   * @returns
   */
  addBlock(
    target: FlowNodeEntityOrId,
    blockJSON: FlowNodeJSON,
    config?: AddBlockConfig,
  ): FlowNodeEntity;

  /**
   * 移动节点
   * @param node 被移动的节点
   * @param config 移动节点配置
   */
  moveNode(node: FlowNodeEntityOrId, config?: MoveNodeConfig): void;

  /**
   * 拖拽节点
   * @param param0
   * @returns
   */
  dragNodes({ dropNode, nodes }: { dropNode: FlowNodeEntity; nodes: FlowNodeEntity[] }): void;

  /**
   * 添加节点的回调
   */
  onNodeAdd: Event<OnNodeAddEvent>;
}

export interface FlowOperationService extends FlowOperationBaseService {
  /**
   * 创建分组
   * @param nodes 节点列表
   */
  createGroup(nodes: FlowNodeEntity[]): FlowNodeEntity | undefined;
  /**
   * 取消分组
   * @param groupNode
   */
  ungroup(groupNode: FlowNodeEntity): void;
  /**
   * 开始事务
   */
  startTransaction(): void;
  /**
   * 结束事务
   */
  endTransaction(): void;
  /**
   * 修改表单数据
   * @param node 节点
   * @param path 属性路径
   * @param value 值
   */
  setFormValue(node: FlowNodeEntityOrId, path: string, value: unknown): void;
}
```
