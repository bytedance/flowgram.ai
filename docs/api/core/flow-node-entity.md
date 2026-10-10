# FlowNodeEntity/WorkflowNodeEntity

节点实体，`WorkflowNodeEntity` 为节点别名用于自由布局节点, 节点实体采用 [ECS](/guide/concepts/ecs.md) 架构, 为 `Entity`

[> API Detail](https://flowgram.ai/auto-docs/document/classes/FlowNodeEntity-1.html)

## Properties

* id: `string` 节点 id
* flowNodeType: `string` | `number` 节点类型
* version `number` 节点版本，可以用于判断节点状态是否更新

## Accessors

* document: `FlowDocument | WorkflowDocument` 文档链接
* bounds: `Rectangle` 获取节点的 x，y，width，height, 等价于 `transform.bounds`
* blocks: `FlowNodeEntity[]` 获取子节点, 包含折叠的子节点, 等价于 `collapsedChildren`
* collapsedChildren: `FlowNodeEntity[]` 获取子节点, 包含折叠的子节点
* allCollapsedChildren: `FlowNodeEntity[]` 获取所有子节点，包括所有折叠的子节点
* children: `FlowNodeEntity[]` 获取子节点, 不包含折叠的子节点
* pre: `FlowNodeEntity | undefined` 获取上一个节点
* next: `FlowNodeEntity | undefined` 获取下一个节点
* parent: `FlowNodeEntity | undefined` 获取父节点
* originParent: `FlowNodeEntity | undefined` 获取原始父节点, 这个用于固定布局分支的第一个节点(orderIcon) 找到整个虚拟分支
* allChildren: `FlowNodeEntity[]` 获取所有子节点, 不包含折叠的子节点
* transform: [FlowNodeTransformData](https://flowgram.ai/auto-docs/document/classes/FlowNodeTransformData.html) 获取节点的 transform 矩阵数据
* renderData: [FlowNodeRenderData](https://flowgram.ai/auto-docs/document/classes/FlowNodeRenderData.html) 获取节点的渲染数据, 包含渲染状态等
* form: [NodeFormProps](https://flowgram.ai/auto-docs/editor/interfaces/NodeFormProps.html) 获取节点的表单数据, 等价于 [getNodeForm](/api/utils/get-node-form.md)
* scope: [FlowNodeScope](https://flowgram.ai/auto-docs/editor/interfaces/FlowNodeScope) 变量作用域
* privateScope: [FlowNodeScope](https://flowgram.ai/auto-docs/editor/interfaces/FlowNodeScope) 变量私有作用域
* lines: [WorkflowNodeLinesData](https://flowgram.ai/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.html) 自由布局线条数据
* ports: [WorkflowNodePortsData](https://flowgram.ai/auto-docs/free-layout-core/classes/WorkflowNodePortsData.html) 自由布局端口数据

## Methods

### getExtInfo

获取节点的扩展信息, 可以通过 `updateExtInfo` 更新扩展信息

```
node.getExtInfo<{ test: string }>()
```

### updateExtInfo

更新扩展数据, 更新不会记录到 `redo/undo`, 如果需要记录，请实现 [history](/guide/advanced/history.md) 服务

```
node.updateExtInfo<{ test: string }>({
  test: 'test'
})
```

### getNodeRegistry

获取节点注册器, 等价于 `ctx.document.getNodeRegistry(node.flowNodeType)`

```ts pure
const nodeRegistry = node.getNodeRegistry<FlowNodeRegistry>()
```

### getData

等价于 [ECS](/guide/concepts/ecs.md) 架构 里获取 Entity 的 Component

```ts pure
node.getData(FlowNodeTransformData) // transform 矩阵数据, 包含节点的 x，y，width，height 等信息
node.getData(FlowNodeRenderData) // 节点的渲染数据, 包含渲染状态等数据
node.lines // 自由布局的线条数据

```

### addData

等价于 [ECS](/guide/concepts/ecs.md) 架构 里添加 Entity 的 Component

```ts pure

// 自定义 EntityData
class CustomEntityData extends EntityData<{ key0: string }> {
  static type = 'CustomEntityData';
  getDefaultData() {
    return {
      key0: 'test'
    }
  }
}

// 添加 Enitty Component
node.addData(CustomEntityData)


// 更新 Entity Component 数据
node.getData(CustomEntityData).update({ key0: 'new value' })

```

### getService

节点访问 [IOC](/guide/concepts/ioc.md) 服务

```ts pure
node.getService(SelectionService)
```

### dispose

节点从画布中销毁

### onDispose

节点销毁事件

```ts pure
useEffect(() => {
  const toDispose = node.onDispose(() => {
    console.log('Dispose node')
  })
  return () => toDispose.dispose()
}, [node])
```

### toJSON

导出节点数据

:::note 节点数据基本结构:

* id: `string` 节点唯一标识, 必须保证唯一
* meta: `object` 节点的 ui 配置信息，如自由布局的 `position` 信息放这里
* type: `string | number` 节点类型，会和 `nodeRegistries` 中的 `type` 对应
* data: `object` 节点表单数据, 业务可自定义
* blocks: `array` 节点的分支, 采用 `block` 更贴近 `Gramming`

:::
