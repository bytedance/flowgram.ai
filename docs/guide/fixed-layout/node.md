# 节点

节点通过 [FlowNodeEntity](/api/core/flow-node-entity.md) 定义

## 节点核心 API

* id: `string` 节点 id
* flowNodeType: `string` | `number` 节点类型
* bounds: `Rectangle` 获取节点的 x，y，width，height, 等价于 `transform.bounds`
* blocks: `FlowNodeEntity[]` 获取子节点 (如 Loop)
* collapsedChildren: `FlowNodeEntity[]` 获取子节点, 包含折叠的子节点
* allCollapsedChildren: `FlowNodeEntity[]` 获取所有子节点，包括所有折叠的子节点
* children: `FlowNodeEntity[]` 获取子节点, 不包含折叠的子节点
* pre: `FlowNodeEntity | undefined` 获取上一个节点
* next: `FlowNodeEntity | undefined` 获取下一个节点
* parent: `FlowNodeEntity | undefined` 获取父节点
* originParent: `FlowNodeEntity | undefined` 获取原始父节点, 这个用于固定布局分支的第一个节点(orderIcon) 找到整个虚拟分支
* allChildren: `FlowNodeEntity[]` 获取所有子节点, 不包含折叠的子节点
* document: [FlowDocument](/api/core/flow-document.md) 文档链接
* transform: [FlowNodeTransformData](https://flowgram.ai/auto-docs/document/classes/FlowNodeTransformData.html) 获取节点的 transform 矩阵数据
* renderData: [FlowNodeRenderData](https://flowgram.ai/auto-docs/document/classes/FlowNodeRenderData.html) 获取节点的渲染数据, 包含渲染状态等
* form: [NodeFormProps](https://flowgram.ai/auto-docs/editor/interfaces/NodeFormProps.html) 获取节点的表单数据, 等价于 [getNodeForm](/api/utils/get-node-form.md)
* scope: [FlowNodeScope](https://flowgram.ai/auto-docs/editor/interfaces/FlowNodeScope) 变量作用域
* privateScope: [FlowNodeScope](https://flowgram.ai/auto-docs/editor/interfaces/FlowNodeScope) 变量私有作用域
* getNodeRegistry(): [FlowNodeRegistry](https://flowgram.ai/auto-docs/document/interfaces/FlowNodeRegistry-1) 获取节点注册器
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
* blocks: `array` 节点的分支, 采用 `block` 更贴近 `Gramming`

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

声明节点可以用于确定节点的类型及渲染方式

```tsx pure
import { FlowNodeRegistry, ValidateTrigger } from '@flowgram.ai/fixed-layout-editor';

/**
 * 自定义节点注册
 */
export const nodeRegistries: FlowNodeRegistry[] = [
  {
    /**
     * 自定义节点类型
     */
    type: 'condition',
    /**
     * 自定义节点扩展:
     *  - loop: 扩展为循环节点
     *  - start: 扩展为开始节点
     *  - dynamicSplit: 扩展为分支节点
     *  - end: 扩展为结束节点
     *  - tryCatch: 扩展为 tryCatch 节点
     *  - default: 扩展为普通节点 (默认)
     */
    extend: 'dynamicSplit',
    /**
     * 节点配置信息
     */
    meta: {
      // isStart: false, // 是否为开始节点
      // isNodeEnd: false, // 是否为结束节点，结束节点后边无法再添加节点
      // draggable: false, // 是否可拖拽，如开始节点和结束节点无法拖拽
      // selectable: false, // 触发器等开始节点不能被框选
      // deleteDisable: true, // 禁止删除
      // copyDisable: true, // 禁止copy
      // addDisable: true, // 禁止添加
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
];
```

## 当前渲染节点获取

通过 [useNodeRender](/api/hooks/use-node-render.md) 获取节点相关方法

```tsx pure
function BaseNode() {
  const { id, type, data, updateData, node } = useNodeRender()
}
```

## 创建节点

通过 [FlowOperationService](/api/services/flow-operation-service.md) 创建

* 添加节点

```ts pure
const ctx = useClientContext()

ctx.operation.addNode({
  id: 'xxx', // 要保证画布内唯一
  type: 'custom',
  meta: {},
  data: {}, // 表单相关数据
  blocks: [], // 子节点
  parent: someParent // 父亲节点，分支会用到
})

```

* 在指定节点之后添加

```ts pure
const ctx = useClientContext()

ctx.operation.addFromNode(targetNode, {
  id: 'xxx', // 要保证画布内唯一
  type: 'custom',
  meta: {},
  data: {}, // 表单相关数据
  blocks: [], // 子节点
})

```

* 添加分支节点 （用于条件分支）

```ts pure
const ctx = useClientContext()

ctx.operation.addBlock(parentNode, {
  id: 'xxx', // 要保证画布内唯一
  type: 'block',
  meta: {},
  data: {}, // 表单相关数据
  blocks: [], // 子节点
})
```

## 删除节点

```tsx pure
function BaseNode({ node }) {
  const ctx = useClientContext()
  function onClick() {
    ctx.operation.deleteNode(node)
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
