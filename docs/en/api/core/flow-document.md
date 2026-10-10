# FlowDocument

Flow document (fixed layout), stores all node data of the process

[> API Detail](https://flowgram.ai/auto-docs/document/classes/FlowDocument.html)

```ts pure
import { useClientContext } from '@flowgram.ai/fixed-layout-editor'

const ctx = useClientContext();
console.log(ctx.document)
```

:::danger
The best way to operate nodes is through [ctx.operation](/en/api/services/flow-operation-service.md), so that it can be bound to redo/undo
:::

## root

Get the root node of the canvas, all nodes are attached to the root node

```ts pure
console.log(ctx.document.root);
```

## getAllNodes

Get all node data

```ts pure
const nodes = ctx.document.getAllNodes();
```

## getNode

Get node by specified id

```ts pure
ctx.document.getNode('start')
```

## getNodeRegistry

Get node definition, node definition can be extended according to business

```ts pure
const startNodeRegistry = ctx.document.getNodeRegistry<FlowNodeRegistry>('start')
```

## fromJSON/toJSON

Import and export data

```ts pure
const json = ctx.document.toJSON();
ctx.document.fromJSON(json);
```

## registerFlowNodes

Register node configuration items, supports inheritance

```ts pure
const node1: FlowNodeRegistry = {
  type: 'node1',
  meta: {}
}

const node2: FlowNodeRegistry = {
  type: 'node2',
  extend: 'node1' // Inherit the configuration of node1
}
ctx.document.registerFlowNodes(node1, node2)
```

## addNode

Add node

```ts pure
ctx.document.addNode({
  id: 'node1',
  type: 'start',
  meta: {},
  data: {},
  parent: ctx.document.root // Can specify a parent node
});

```

## addFromNode

Add to the node after the specified node

```ts pure
ctx.document.addFromNode(
 ctx.document.getNode('start'),
 { id: 'node1', type: 'custom', data: {} }
);

```

## addBlock

Add a branch node to the specified node

```ts pure

ctx.document.addBlock(ctx.document.getNode('condition'), { id: 'if_1', type: 'block', data: {} })
```

## removeNode

Delete node

```ts pure
ctx.document.removeNode('node1');
```

## onNodeCreate/onNodeUpdate/onNodeDispose

Node creation/update/destruction event, returns the event's disposal function

```tsx pure

useEffect(() => {
  const toDispose1 = ctx.document.onNodeCreate((node) => {
    console.log('onNodeCreate', node);
  });
  const toDispose2 = ctx.document.onNodeUpdate((node) => {
    console.log('onNodeUpdate', node);
  });
  const toDispose3 = ctx.document.onNodeDispose((node) => {
    console.log('onNodeDispose', node);
  });
  return () => {
    toDispose1.dispose()
    toDispose2.dispose()
    toDispose3.dispose()
  }
}, []);
```

## traverse

Traverse all child nodes from the specified node, default root node

```ts pure
/**
 *
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
 */
ctx.document.traverse((node, depth, index) => {
  console.log(node.id);
}, ctx.document.root);
```

## toString

Return a string snapshot of the node structure

```ts pure
console.log(ctx.document.toString())
```
