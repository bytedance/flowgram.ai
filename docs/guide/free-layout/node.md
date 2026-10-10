# 节点

节点通过 [FlowNodeEntity](/api/core/flow-node-entity.md) 定义

## 节点核心 API

* id: `string` 节点 id
* flowNodeType: `string` | `number` 节点类型
* bounds: `Rectangle` 获取节点的 x，y，width，height, 等价于 `transform.bounds`
* blocks: `FlowNodeEntity[]` 获取子节点 (如 Loop)
* parent: `FlowNodeEntity | undefined` 获取父节点
* document: [WorkflowDocument](/api/core/workflow-document.md) 文档链接
* transform: [FlowNodeTransformData](https://flowgram.ai/auto-docs/document/classes/FlowNodeTransformData.html) 获取节点的 transform 矩阵数据
* renderData: [FlowNodeRenderData](https://flowgram.ai/auto-docs/document/classes/FlowNodeRenderData.html) 获取节点的渲染数据, 包含渲染状态等
* form: [NodeFormProps](https://flowgram.ai/auto-docs/editor/interfaces/NodeFormProps.html) 获取节点的表单数据, 等价于 [getNodeForm](/api/utils/get-node-form.md)
* scope: [FlowNodeScope](https://flowgram.ai/auto-docs/editor/interfaces/FlowNodeScope) 变量作用域
* privateScope: [FlowNodeScope](https://flowgram.ai/auto-docs/editor/interfaces/FlowNodeScope) 变量私有作用域
* lines: [WorkflowNodeLinesData](https://flowgram.ai/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.html) 自由布局线条数据
* ports: [WorkflowNodePortsData](https://flowgram.ai/auto-docs/free-layout-core/classes/WorkflowNodePortsData.html) 自由布局端口数据
* getNodeRegistry(): [WorkflowNodeRegistry](https://flowgram.ai/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry) 获取节点注册器
* getService(): 获取 [IOC](/guide/concepts/ioc.md) 服务，如 `node.getService(HistoryService)`
* getExtInfo(): 获取节点扩展数据, 如 `node.getExtInfo<{ test: string }>()`
* updateExtInfo(): 更新节点扩展数据, 如 `node.updateExtInfo<{ test: string }>({ test: 'test' })`
* dispose(): 销毁节点
* toJSON(): json 序列化

## 节点数据

通过 `node.toJSON()` 可以获取

:::note 基本结构:

* id: `string` 节点唯一标识, 必须保证唯一
* meta: `object` 节点的 ui 配置信息，如自由布局的 `position` 信息放这里
* type: `string | number` 节点类型，会和 `nodeRegistries` 中的 `type` 对应
* data: `object` 节点表单数据, 业务可自定义
* blocks: `array` 节点的分支, 采用 `block` 更贴近 `Gramming` 自由布局布局场景会用在子画布的子节点
* edges: `array` 子画布的边数据

:::

```ts pure
const nodeData: FlowNodeJSON = {
  id: 'xxxx',
  type: 'condition',
  data: {
    title: 'MyCondition',
    desc: 'xxxxx'
  },
}
```

## 节点定义

在自由布局场景，节点定义用于声明节点的初始化位置/大小，端口，表单渲染等。

```tsx pure title="node-registries.tsx"
import { WorkflowNodeRegistry, ValidateTrigger } from '@flowgram.ai/free-layout-editor';

/**
 * You can customize your own node registry
 * 你可以自定义节点的注册器
 */
export const nodeRegistries: WorkflowNodeRegistry[] = [
  {
    type: 'start',
    meta: {
      isStart: true, // 标记为开始节点
      deleteDisable: true, // 开始节点不能删除
      copyDisable: true, // 开始节点不能复制
      defaultPorts: [{ type: 'output' }], // 用于定义节点的输入和输出端口, 开始节点只有输出端口
      // useDynamicPort: true, // 用于动态端口，会寻找 data-port-id 和 data-port-type 属性的 dom 作为端口
    },
    /**
     * 配置节点表单的校验及渲染,
     * 注：validate 采用数据和渲染分离，保证节点即使不渲染也能对数据做校验
     */
    formMeta: {
      validateTrigger: ValidateTrigger.onChange,
      validate: {
        title: ({ value }) => (value ? undefined : 'Title is required'),
      },
      /**
       * Render form
       */
      render: () => (
       <>
          <Field name="title">
            {({ field }) => <div className="demo-free-node-title">{field.value}</div>}
          </Field>
          <Field name="content">
            {({ field }) => <input onChange={field.onChange} value={field.value}/>}
          </Field>
        </>
      )
    },
  },
  {
    type: 'end',
    meta: {
      deleteDisable: true,
      copyDisable: true,
      defaultPorts: [{ type: 'input' }],
    },
    formMeta: {
      // ...
    }
  },
  {
    type: 'custom',
    meta: {
    },
    formMeta: {
      // ...
    },
    defaultPorts: [{ type: 'output' }, { type: 'input' }], // 普通节点有两个端口
  },
];

```

## 当前渲染节点获取

通过 [useNodeRender](/api/hooks/use-node-render.md) 获取节点相关方法

```tsx pure
function BaseNode() {
  const { id, type, data, updateData, node } = useNodeRender()
}
```

## 获取当前节点的输入/输出节点或线条

```ts pure
// 获取当前节点的输入节点（通过连接线计算）
node.lines.inputNodes
// 获取所有输入节点 （会往上递归获取所有）
node.lines.allInputNodes
// 获取输出节点
node.lines.outputNodes
// 获取所有输出节点
node.lines.allOutputNodes
// 输入线条 (包含 isDrawing 或 isHidden 的线条)
node.lines.inputLines
// 输出线条 (包含 isDrawing 或 isHidden 的线条)
node.lines.outputLines
// 所有线条 (不包含 isDrawing 或 isHidden 的线条)
node.lines.availableLines

```

## 创建节点

* 通过 [WorkflowDocument](/api/core/workflow-document.md) 创建

```ts pure
const ctx = useClientContext()

ctx.document.createWorkflowNode({
  id: 'xxx', // 要保证画布内唯一
  type: 'custom',
  meta: {
    /**
     * 如果不传入，则默认在画布中间创建
     * 如果要通过鼠标位置获取 position (如点击画布任意位置创建节点)，可通过 `ctx.playground.config.getPosFromMouseEvent(mouseEvent)` 转换
     */
    position: { x: 100, y: 100 } //
  },
  data: {}, // 表单相关数据
  blocks: [], // 子画布的节点
  edges: [] // 子画布的边
})

```

* 通过 WorkflowDragService 创建, 见[自由布局基础用法](/examples/free-layout/free-layout-simple.md)

```ts pure
const dragService = useService<WorkflowDragService>(WorkflowDragService);

// 这里的 mouseEvent 会自动转成 画布的 position
dragService.startDragCard(nodeType, mouseEvent, {
  id: 'xxxx',
  data: {}, // 表单相关数据
  blocks: [], // 子画布的节点
  edges: [] // 子画布的边
})

```

## 删除节点

通过 `node.dispose` 删除节点

```tsx pure
function BaseNode({ node }) {
  function onClick() {
    node.dispose()
  }
  return (
    <button onClick={onClick}>Delete</button>
  )
}
```

## 更新节点 data 数据

* 通过 [useNodeRender](/api/hooks/use-node-render.md) 或 [node.form](https://flowgram.ai/auto-docs/editor/interfaces/NodeFormProps.html) 获取节点的 data 数据

```tsx pure
function BaseNode() {
  const { node, form } = useNodeRender();
  // 1. form.values 对应节点的 data 数据
  // 2. form.setValueIn('title', 'xxxx') 修改 data.title
  // 3. form.getValueIn('title') 获取 data.title
  // 4. form.updateFormValues({ ... }) 更新表单所有数据

  function onChange(e) {
    form.setValueIn('title', e.target.value)
  }
  return <input value={form.values.title} onChange={onChange}/>
}
```

* 通过 Field 更新表单数据, 详细见 [表单的使用](/guide/form/form.md)

```tsx pure

function FormRender() {
  return (
    <Field name="title">
      <Input />
    </Field>
  )
}
```

## 更新节点的 extInfo 数据

extInfo 用于存储 一些 ui 状态, 如果未开启节点引擎，节点的 data 数据会默认存到 extInfo 里

```tsx pure
function BaseNode({ node }) {
  const times = node.getExtInfo()?.times || 0
  function onClick() {
    node.updateExtInfo({ times: times ++ })
  }
  return (
    <div>
      <span>Click Times: {times}</span>
      <button onClick={onClick}>Click</button>
    </div>
  )
}
```
