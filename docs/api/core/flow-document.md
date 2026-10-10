# FlowDocument

流程数据文档 (固定布局), 存储流程的所有节点数据

[> API Detail](https://flowgram.ai/auto-docs/document/classes/FlowDocument.html)

```ts pure
import { useClientContext } from '@flowgram.ai/fixed-layout-editor'

const ctx = useClientContext();
console.log(ctx.document)
```

:::danger
对节点的操作最好通过 [ctx.operation](/api/services/flow-operation-service.md) 进行操作, 这样才能绑定到 redo/undo
:::

## root

获取画布的根节点，所有节点都挂在根节点下边

```ts pure
console.log(ctx.document.root);
```

## originTree

画布真实的节点树

```ts pure
// 监听节点树的变化，如 节点添加/删除/移动
const refresh = useRefresh()
useEffect(() => {
  const toDispose = ctx.document.originTree.onTreeChange(() => {
    // Tree Change
    refresh()
  });
  return () => toDispose.dispose()
}, [])
```

## renderTree

画布渲染时的节点树，为了提升性能，渲染的树会随着节点分支折叠而变化，并非真实的树

## getAllNodes

获取所有节点数据

```ts pure
const nodes = ctx.document.getAllNodes();
```

## getNode

通过指定 id 获取节点

```ts pure
ctx.document.getNode('start')
```

## getNodeRegistry

获取节点的定义, 节点定义可以根据业务自己扩展配置项

```ts pure
const startNodeRegistry = ctx.document.getNodeRegistry<FlowNodeRegistry>('start')
```

## fromJSON/toJSON

导入和导出数据

```ts pure
const json = ctx.document.toJSON();
ctx.document.fromJSON(json);
```

## registerFlowNodes

注册节点的配置项目, 支持继承

```ts pure
const node1: FlowNodeRegistry = {
  type: 'node1',
  meta: {}
}

const node2: FlowNodeRegistry = {
  type: 'node2',
  extend: 'node1' // 继承 node1 的配置
}
ctx.document.registerFlowNodes(node1, node2)
```

## addNode

添加节点

```ts pure
ctx.document.addNode({
  id: 'node1',
  type: 'start',
  meta: {},
  data: {},
  parent: ctx.document.root // 可以指定父节点
});

```

## addFromNode

添加到指定节点的后边

```ts pure
ctx.document.addFromNode(
 ctx.document.getNode('start'),
 { id: 'node1', type: 'custom', data: {} }
);

```

## addBlock

为指定节点添加分支节点

```ts pure

ctx.document.addBlock(ctx.document.getNode('condition'), { id: 'if_1', type: 'block', data: {} })
```

## removeNode

删除节点

```ts pure
ctx.document.removeNode('node1');
```

## onNodeCreate/onNodeUpdate/onNodeDispose

节点创建/更新/销毁事件, 返回事件的注销函数

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

从指定节点遍历所有子节点, 默认根节点

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

返回节点结构的字符串快照

```ts pure
console.log(ctx.document.toString())
```
