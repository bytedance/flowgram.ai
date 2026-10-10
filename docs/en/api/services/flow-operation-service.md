# FlowOperationService

Node operation service, currently used for fixed layout, free layout can currently be operated directly through WorkflowDocument, and will be abstracted out as operation in the future

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
   * Execute operation
   * @param operation Serializable operation
   * @returns Operation return
   */
  apply(operation: FlowOperation): any;

  /**
   * Add node, if the node already exists, it will not be created repeatedly
   * @param nodeJSON Node data
   * @param config Configuration
   * @returns Successfully added node
   */
  addNode(nodeJSON: FlowNodeJSON, config?: AddNodeConfig): FlowNodeEntity;

  /**
   * Add node based on a starting node
   * @param fromNode Starting node
   * @param nodeJSON Added node JSON
   */
  addFromNode(fromNode: FlowNodeEntityOrId, nodeJSON: FlowNodeJSON): FlowNodeEntity;

  /**
   * Delete node
   * @param node Node
   * @returns
   */
  deleteNode(node: FlowNodeEntityOrId): void;

  /**
   * Batch delete nodes
   * @param nodes
   */
  deleteNodes(nodes: FlowNodeEntityOrId[]): void;

  /**
   * Add block (branch)
   * @param target Target
   * @param blockJSON Block data
   * @param config Configuration
   * @returns
   */
  addBlock(
    target: FlowNodeEntityOrId,
    blockJSON: FlowNodeJSON,
    config?: AddBlockConfig,
  ): FlowNodeEntity;

  /**
   * Move node
   * @param node The node to be moved
   * @param config Move node configuration
   */
  moveNode(node: FlowNodeEntityOrId, config?: MoveNodeConfig): void;

  /**
   * Drag node
   * @param param0
   * @returns
   */
  dragNodes({ dropNode, nodes }: { dropNode: FlowNodeEntity; nodes: FlowNodeEntity[] }): void;

  /**
   * Add node callback
   */
  onNodeAdd: Event<OnNodeAddEvent>;
}

export interface FlowOperationService extends FlowOperationBaseService {
  /**
   * Create group
   * @param nodes Node list
   */
  createGroup(nodes: FlowNodeEntity[]): FlowNodeEntity | undefined;
  /**
   * Ungroup
   * @param groupNode
   */
  ungroup(groupNode: FlowNodeEntity): void;
  /**
   * Start transaction
   */
  startTransaction(): void;
  /**
   * End transaction
   */
  endTransaction(): void;
  /**
   * Modify form data
   * @param node Node
   * @param path Property path
   * @param value Value
   */
  setFormValue(node: FlowNodeEntityOrId, path: string, value: unknown): void;
}
```
